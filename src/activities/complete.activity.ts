import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class FinishActivity implements Activity {
    name = "finish";
    type = "finish-activity";

    ctx?: Context;
    next: string;
       
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.wf)
            return false;

        console.log("Finish Activity");

        if(this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
            
        return true;
    }
}