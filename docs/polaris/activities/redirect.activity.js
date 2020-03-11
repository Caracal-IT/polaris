export class RedirectActivity {
    constructor() {
        this.name = "redirect";
        this.type = "redirect-activity";
    }
    async execute() {
        var _a;
        this.ctx.model.save();
        const params = `${(_a = this.ctx.wf.process) === null || _a === void 0 ? void 0 : _a.name}-${this.next}-${this.ctx.model.sessionId}`;
        window.location.href = `${this.location}?returnUrl=${params}`;
        return true;
    }
}
