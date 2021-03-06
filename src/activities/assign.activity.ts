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
        const value = this.ctx.model.getInterpolatedValue(this.value);            
                
        this.ctx.model.setValue(this.key, value);         
        this.ctx.wf.goto(this.next);
            
        return true;
    }
}