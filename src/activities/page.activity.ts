import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class PageActivity implements Activity {
    name = "start";
    type = "page-activity";
    
    ctx?: Context;
    controls?: Comment[];

    async execute(): Promise<boolean> {
        if (this.ctx && this.ctx.page && this.ctx.page.controls)
            this.ctx.page.controls = this.controls || [];
            
        return true;
    }
}
