import { BaseActivity } from "./base.activity";

export class MessageActivity extends BaseActivity {
    name = "message";
    type = "message-activity";

    messageType: string;
    description: string;
    message: string;
       
    async execute(): Promise<boolean> {
        this.ctx.page.sendMessage({
            type: this.messageType,
            description: this.description,
            metadata: {
                message: this.message
            }
        })

        this.gotoNext();
            
        return true;
    }
}