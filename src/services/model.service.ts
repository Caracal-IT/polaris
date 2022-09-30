import { PipeFactory } from "../pipes/factory.pipe";
import { ConfigService } from "./config.service";
import { v4 as uuidv4 } from "uuid";

export class ModelService {
    model: object = {};
    sessionId: string = uuidv4().replaceAll('-', 'R');
    pipes: PipeFactory = new PipeFactory();

    constructor(private config: ConfigService) {}

    getValue(key: string, model: object = this.model) {       
        if(key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1) 
          return this.config.getSetting(key);

        const val = key.split(".").reduce((total, currentElement) => total != null ? total[currentElement]: undefined, {...model});
        
       if(key.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g) === null && val === undefined) 
          return key;

        return val;
    }

    getInterpolatedValue(value: string) {   
      if(value === undefined || value === null)
        return value;
  
      const myRegexp = /\{\{\[*(?:(\w|\.|\||-)+)\]*\}\}/g;
      const match = value.match(myRegexp);
      
      if(match === null || match.length === 0)
        return value;
  
      return match.reduce((prev, curr) => this.replaceAll(prev, curr), value);
    }
  

    setValue(key: string, val: string | number | object) {   
        if(key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1) 
          this.config.addSetting(key, val);
        else
          this.model = this.merge(this.model, key, val);
    }

    save() {        
      sessionStorage.setItem(this.sessionId, JSON.stringify(this.model));        
    }

    load() {        
      const value = sessionStorage.getItem(this.sessionId);  
      this.clearCache();
      
      if(value === null)
          return;
      
      this.model =  JSON.parse(value);
    }

    clearCache() {
      sessionStorage.clear();
    }

    private merge(model: object, name: string, value: string | number | object) {
        if(name === null)
          return;
          
        let newModel = {...model};
      
        name
          .split(".")  
          .reduce((total, current, index, arr) =>{
            total[current] = index === arr.length - 1 ? value : {...total[current]};
            return total[current];
          }, newModel);
      
        return newModel;
    }

    private replaceAll(value: string, key: string) {
      const padding = 2;
      const startIndex = 2;
      const firstIndex = 0;
      const secondIndex = 1;

      const expr = key.substring(padding, key.length - padding);
      const values = expr.split('|');
      const params = values.slice(startIndex);
      let newValue = this.getValue(values[firstIndex]);

      if(values != null && values.length > 1 && this.pipes[values[secondIndex]] != null)
        newValue = this.pipes[values[secondIndex]](newValue, params);
      
      return value.replace(key, newValue);
    }
  
}