import { Context } from "../model/context.model";
import { Activity } from "./activity";

export abstract class BaseActivity implements Activity {
    name: string;
    "type": string;
    next:string;
    ctx: Context;

    abstract execute(): Promise<boolean>;

    gotoNext() {
        if(this.next && this.ctx)
            this.ctx.wf.goto(this.next);
    }
}