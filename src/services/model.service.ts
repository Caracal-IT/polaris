import { PipeFactory } from "../pipes/factory.pipe";

export class ModelService {
    model = {};
    sessionId = this.UUID();
    pipes = new PipeFactory();

    getValue(key: string, model: any = this.model) {
        const val = key.split(".").reduce((total, currentElement) => total ? total[currentElement]: undefined, {...model});
        return val;
    }

    getInterpolatedValue(value: string) {   
      if(!value)
        return value;
  
      const myRegexp = /\{\{(?:(\w|\.|\||-)+)\}\}/g;
      const match = value.match(myRegexp);
      
      if(!match || match.length === 0)
        return value;
  
      return match.reduce((prev, curr) => this.replaceAll(prev, curr), value);
    }
  

    setValue(key: string, val: any) {
        this.model = this.merge(this.model, key, val);
    }

    save() {        
      sessionStorage.setItem(this.sessionId, JSON.stringify(this.model));        
    }

    load(): object {        
      const value = sessionStorage.getItem(this.sessionId);  
      this.clearCache();
      
      if(!value)
          return;
      
      this.model =  JSON.parse(value);
    }

    clearCache() {
      sessionStorage.clear();
    }

    private merge(model: any, name: string, value: any) {
        if(!name)
          return;
          
        let newModel = {...model};
      
        name
          .split(".")  
          .reduce((total, current, index, arr) =>{
            total[current] = index == arr.length - 1 ? value : {...total[current]};
            return total[current];
          }, newModel);
      
        return newModel;
    }

    private UUID() {
      return 'xxxxxxxxRxxxxR4xxxRyxxxRxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    private replaceAll(value: string, key: string) {
      const expr = key.substring(2, key.length - 2);
      const values = expr.split('|');
      const params = values.slice(2);
      let newValue = this.getValue(values[0]);

      if(values && values.length > 1 && this.pipes[values[1]])
        newValue = this.pipes[values[1]](newValue, params);
      
      return value.replace(key, newValue);
    }
  
}