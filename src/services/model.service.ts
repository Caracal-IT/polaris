export class ModelService {
    model = {};
    sessionId = this.UUID();

    getValue(key: string, model: any = this.model) {
        const val = key.split(".").reduce((total, currentElement) => total ? total[currentElement]: undefined, {...model});
        return val;
    }

    setValue(key: string, val: any) {
        this.model = this.merge(this.model, key, val);
    }

    save() {        
      sessionStorage.setItem(this.sessionId, JSON.stringify(this.model));        
    }

    load(): object {        
      const value = sessionStorage.getItem(this.sessionId);  
      
      if(!value)
          return;
      
      this.model =  JSON.parse(value);
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
}