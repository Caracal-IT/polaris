import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class AssignActivity implements Activity {
    name = "assign";
    type = "switch-activity";

    ctx: Context;
    key: string;
   
    
    async execute(): Promise<boolean> {
       // let value = this.value||"";

                
        //this.ctx.model.setValue(this.key, value);         
        //this.ctx.wf.goto(this.next);
            
        return true;
    }
}