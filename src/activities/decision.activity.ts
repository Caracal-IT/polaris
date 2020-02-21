import { CodeActivity } from './code.activity';
import { Context } from "../model/context.model";

interface Condition {
    operator: 'and'|'or'|undefined|null;
    left: string;
    equality: string;
    right: string;
}

export class DecisionActivity extends CodeActivity {
    name = "assign";
    type = "decision-activity";

    ctx?: Context;
    trueAction: string;
    falseAction: string;    
    conditions: Array<Condition>;
    
    async execute(): Promise<boolean> {
        if(!this.ctx || !this.ctx.model || !this.conditions)
            return false;

        let isValid = true;

        for(let condition of this.conditions) {
            if(condition.operator === 'or')
                isValid = isValid || this.validate(condition);
            else
                isValid = isValid && this.validate(condition);            
        }

       
        if(isValid)
            this.ctx.wf.goto(this.trueAction);
        else
            this.ctx.wf.goto(this.falseAction);
            
        return true;
    }

    private validate(condition: Condition) {
        try {
            let left = condition.left;

            if(condition.left && condition.left.startsWith('{') && condition.left.endsWith('}'))
                left = this.ctx.model.getValue(condition.left.substring(1, condition.left.length - 1));

            const expression = `return ${left} ${condition.equality} ${condition.right};`
            
            return super.eval(expression, this.ctx);
        }
        catch(ex) {
            console.warn('Decision Activity', ex);
            return false;
        }
    }
}