import { BaseActivity } from "./base.activity";

export class RedirectActivity extends BaseActivity {
    name = "redirect";
    "type" = "redirect-activity";
    location?: string;
       
    async execute(): Promise<boolean> {
        this.ctx.model.save();
        
        const params = `${this.ctx.wf.process?.name}-${this.next}-${this.ctx.model.sessionId}`;
        window.location.href = `${this.location}?returnUrl=${params}`;    
        return true;
    }
}