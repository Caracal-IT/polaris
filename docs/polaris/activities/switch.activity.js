import { CodeActivity } from "./code.activity";
export class SwitchActivity extends CodeActivity {
    constructor() {
        super(...arguments);
        this.name = "assign";
        this.type = "switch-activity";
    }
    async execute() {
        for (let rule of this.rules) {
            const expression = `return ${this.ctx.model.getInterpolatedValue(rule.expression)};`;
            if (this.eval(expression, this.ctx)) {
                this.ctx.wf.goto(rule.next);
                return true;
            }
        }
        throw new Error(`No valid rule in ${this.name} found !!`);
    }
}
