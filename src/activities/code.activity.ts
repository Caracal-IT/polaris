import { Context } from "../model/context.model";
import { BaseActivity } from "./base.activity";

export class CodeActivity extends BaseActivity {
    name: string = "code";
    "type": string = "code-activity";
    expression: string;
       
    async execute(): Promise<boolean> {
        this.evaluate(this.expression, this.ctx); 
        this.gotoNext();
            
        return true;
    }

    evaluate(expression: string, ctx: Context) {
        const f =  new Function('ctx', expression);        
        return f(ctx);                
    }
}