import { ActivityFactory } from "../activities/activity-factory";
export class WorkflowService {
    constructor(ctx) {
        this.ctx = ctx;
        this.stack = [];
    }
    async setProcess(process, next = "start", clearStack = true) {
        try {
            if (clearStack)
                this.stack = [];
            if (typeof process === "string" && this.loader)
                process = await this.loader.load(process);
            this.process = process;
            this.activity = null;
            this.goto(next);
            this.ctx.page.sendMessage({ type: "PROCESS_CHANGED", metadata: { stack: this.stack } });
        }
        catch (err) {
            if (err) {
                console.error(err);
                this.ctx.page.sendMessage({ type: "ERROR", description: err.message, metadata: err });
            }
        }
    }
    goto(name) {
        setTimeout(this.tryNext.bind(this, name));
    }
    async tryNext(name) {
        try {
            this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGING" });
            await this.next(name);
            this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGED" });
        }
        catch (err) {
            this.ctx.page.sendMessage({ type: "ERROR", description: err === null || err === void 0 ? void 0 : err.message, metadata: err });
        }
    }
    async next(name) {
        var _a;
        if (!this.process || !this.process.activities)
            return null;
        if (((_a = this.ctx.wf.activity) === null || _a === void 0 ? void 0 : _a.type) === "page-activity" && !this.ctx.validator.validate(this.ctx))
            return null;
        let newActivity = this.process
            .activities
            .find(a => a.name == name);
        if (!newActivity)
            throw new Error(`Activity ${name} not found`);
        this.activity = newActivity;
        return await ActivityFactory.create(this.activity, this.ctx)
            .execute();
    }
}
