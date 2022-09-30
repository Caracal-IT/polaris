import { CodeActivity } from "./code.activity";
import { Context } from "../model/context.model";
import { Rule } from "../model/rule.model";

export class SwitchActivity extends CodeActivity {
    name: string = "switch";
    "type": string = "switch-activity";

    ctx: Context;
    rules: Rule[];
    
    async execute(): Promise<boolean> {
       if(this.rules === null || this.rules === undefined)
            throw new Error(`No valid rule in ${this.name} found !!`);

       for(let rule of this.rules) {
           const expression  = `return ${this.ctx.model.getInterpolatedValue(rule.expression)};`;
           
           if(this.evaluate(expression, this.ctx)) {
              this.gotoNext();
              return true;
           }
       }

       throw new Error(`No valid rule in ${this.name} found !!`);
    }
}