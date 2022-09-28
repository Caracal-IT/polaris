import { CodeActivity } from './code.activity';
import { Context } from "../model/context.model";

export class DecisionActivity extends CodeActivity {
    name = "decision";
    type = "decision-activity";

    ctx: Context;
    expression: string;
    trueAction: string;
    falseAction: string;    
    
    async execute(): Promise<boolean> {
        const exp  = `return ${this.ctx.model.getInterpolatedValue(this.expression)};`;
           
        if(this.evaluate(exp, this.ctx)) 
            this.ctx.wf.goto(this.trueAction);
        else
            this.ctx.wf.goto(this.falseAction);

        return true;
    }
}