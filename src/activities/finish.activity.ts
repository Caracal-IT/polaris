import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class FinishActivity implements Activity {
    name: string = "finish";
    type: string = "finish-activity";
    next: string;

    ctx: Context;
       
    async execute(): Promise<boolean> {
        if(this.ctx.wf.stack.length === 0) {
            if(this.next)
                this.ctx.wf.goto(this.next);

            return true;
        }

        const ipc = this.ctx.wf.stack.pop();
        await this.ctx.wf.setProcess(ipc.process, ipc.activity);
            
        return true;
    }
}