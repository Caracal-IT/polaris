import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class RedirectActivity implements Activity {
    name = "redirect";
    type = "redirect-activity";

    ctx?: Context;
    location?: string;
    next: string;
       
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.wf)
            return false;

        this.ctx.model.save();
        
        const params = `${this.ctx.wf.process?.name}-${this.next}-${this.ctx.model.sessionId}`;
        window.location.href = `${this.location}?returnUrl=${params}`;    
        return true;
    }
}