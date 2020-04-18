import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class MessageActivity implements Activity {
    name = "message";
    type = "message-activity";

    ctx: Context;
    messageType: string;
    description: string;
    message: string;
    next: string;
       
    async execute(): Promise<boolean> {
        this.ctx.page.sendMessage({
            type: this.messageType,
            description: this.description,
            metadata: {
                message: this.message
            }
        })

        if(this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
            
        return true;
    }
}