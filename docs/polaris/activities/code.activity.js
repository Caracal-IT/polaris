export class CodeActivity {
    constructor() {
        this.name = "code";
        this.type = "code-activity";
    }
    async execute() {
        this.eval(this.expression, this.ctx);
        if (this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
        return true;
    }
    eval(expression, ctx) {
        const f = new Function('ctx', expression);
        return f(ctx);
    }
}
