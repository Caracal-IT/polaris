import { CodeActivity } from './code.activity';
export class DecisionActivity extends CodeActivity {
    constructor() {
        super(...arguments);
        this.name = "assign";
        this.type = "decision-activity";
    }
    async execute() {
        const exp = `return ${this.ctx.model.getInterpolatedValue(this.expression)};`;
        if (this.eval(exp, this.ctx))
            this.ctx.wf.goto(this.trueAction);
        else
            this.ctx.wf.goto(this.falseAction);
        return true;
    }
}
