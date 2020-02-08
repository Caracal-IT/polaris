export class ModelService {
    model = {};

    getValue(key: string, model: any = this.model) {
        const val = key.split(".").reduce((total, currentElement) => total ? total[currentElement]: undefined, {...model});
        return val;
    }

    setValue(key: string, val: any){
        this.model = this.merge(this.model, key, val);
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
}