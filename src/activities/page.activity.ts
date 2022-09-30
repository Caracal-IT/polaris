import { Activity } from "./activity";
import { Context } from "../model/context.model";
import { Control } from "../model/control.model";

export class PageActivity implements Activity {
    name: string = "start";
    "type": string = "page-activity";
    
    ctx: Context;
    controls: Control[];

    async execute(): Promise<boolean> {
        if (this.ctx.page.controls)
            this.ctx.page.controls = this.controls || [];
            
        return true;
    }
}
