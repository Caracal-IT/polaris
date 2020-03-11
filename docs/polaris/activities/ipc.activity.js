export class IPCActivity {
    constructor() {
        this.name = "ipc";
        this.type = "ipc-activity";
    }
    async execute() {
        var _a;
        if (this.process && this.process.length > 0) {
            this.ctx.wf.stack.push({
                process: (_a = this.ctx.wf.process) === null || _a === void 0 ? void 0 : _a.name,
                activity: this.next
            });
            this.ctx.wf.setProcess(this.process, 'start', this.next ? false : true);
        }
        return true;
    }
}
