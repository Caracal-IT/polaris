export class AssignActivity {
    constructor() {
        this.name = "assign";
        this.type = "assign-activity";
    }
    async execute() {
        const value = this.ctx.model.getInterpolatedValue(this.value);
        this.ctx.model.setValue(this.key, value);
        this.ctx.wf.goto(this.next);
        return true;
    }
}
