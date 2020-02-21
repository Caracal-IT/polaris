import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class IPCActivity implements Activity {
    name = "ipc";
    type = "ipc-activity";

    ctx?: Context;
    next: string;
       
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.wf)
            return false;

        console.log("IPC Activity");

        if(this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
            
        return true;
    }
}