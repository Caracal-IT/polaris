import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class SwitchActivity implements Activity {
    name = "assign";
    type = "switch-activity";

    ctx: Context;
    next: string;

    key: string;
   
    cases: any;
    
    async execute(): Promise<boolean> {
       this.cases = [
           {"value":4, "next": "clientError" },
           {"value":5, "next": "serverError" }
       ];

       let value: any = this.ctx.model.getInterpolatedValue(this.key);

       value = Math.floor(parseInt(value) / 100);

       for(let expression of this.cases) {
           if(value === expression.value) {
               console.log('FOUND', expression);
           }
       }

       console.log('VALUE', value, this.cases);
                
        //this.ctx.model.setValue(this.key, value);         
        //this.ctx.wf.goto(this.next);
        this.ctx.wf.goto(this.next);

        return true;
    }
}