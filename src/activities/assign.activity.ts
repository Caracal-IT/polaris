import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class AssignActivity implements Activity {
    name = "assign";
    type = "assign-activity";

    ctx: Context;
    key: string;
    value: string;
    next: string;
    
    async execute(): Promise<boolean> {
        let value = this.value||"";

        if(this.value && this.value.startsWith("{") && this.value.endsWith("}"))            
            value = this.ctx.model.getValue(this.value.substring(1, this.value.length - 1));            
                
        this.ctx.model.setValue(this.key, value);         
        this.ctx.wf.goto(this.next);
            
        return true;
    }
}