import { Activity } from "./activity";
import { Context } from "../model/context.model";

export class CodeActivity implements Activity {
    name = "code";
    type = "code-activity";

    ctx: Context;
    expression: string;
    next: string;
       
    async execute(): Promise<boolean> {
        this.eval(this.expression, this.ctx); 
        
        if(this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
            
        return true;
    }

    eval(expression: string, ctx: Context) {
        const f =  new Function('ctx', expression);        
        return f(ctx);                
    }
}