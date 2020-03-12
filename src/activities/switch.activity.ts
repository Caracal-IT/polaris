import { CodeActivity } from "./code.activity";
import { Context } from "../model/context.model";
import { Rule } from "../model/rule.model";

export class SwitchActivity extends CodeActivity {
    name = "switch";
    type = "switch-activity";

    ctx: Context;
    rules: Array<Rule>;
    
    async execute(): Promise<boolean> {
       for(let rule of this.rules||[]) {
           const expression  = `return ${this.ctx.model.getInterpolatedValue(rule.expression)};`;
           
           if(this.eval(expression, this.ctx)) {
              this.ctx.wf.goto(rule.next);
              return true;
           }
       }

        throw new Error(`No valid rule in ${this.name} found !!`);
    }
}