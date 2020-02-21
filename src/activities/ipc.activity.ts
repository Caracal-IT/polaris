import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class IPCActivity implements Activity {
    name = "ipc";
    type = "ipc-activity";

    ctx?: Context;
    process?: string; 
    next?: string;
       
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.wf)
            return false;

        if(this.process && this.process.length > 0) {
            this.ctx.wf.stack.push({
                process: this.ctx.wf.process?.name,
                activity: this.next
            });
            
            this.ctx.wf.setProcess(this.process);
        }
            
        return true;
    }
}