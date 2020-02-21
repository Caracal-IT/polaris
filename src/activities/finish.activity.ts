import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class FinishActivity implements Activity {
    name = "finish";
    type = "finish-activity";

    ctx?: Context;
       
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.wf)
            return false;

        if(this.ctx.wf.stack.length === 0)
            return true;

        const ipc = this.ctx.wf.stack.pop();
        this.ctx.wf.setProcess(ipc.process, ipc.activity);
            
        return true;
    }
}