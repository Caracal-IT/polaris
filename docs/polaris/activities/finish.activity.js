export class FinishActivity {
    constructor() {
        this.name = "finish";
        this.type = "finish-activity";
    }
    async execute() {
        if (this.ctx.wf.stack.length === 0) {
            if (this.next)
                this.ctx.wf.goto(this.next);
            return true;
        }
        const ipc = this.ctx.wf.stack.pop();
        this.ctx.wf.setProcess(ipc.process, ipc.activity);
        return true;
    }
}
