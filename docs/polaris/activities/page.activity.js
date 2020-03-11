export class PageActivity {
    constructor() {
        this.name = "start";
        this.type = "page-activity";
    }
    async execute() {
        if (this.ctx.page.controls)
            this.ctx.page.controls = this.controls || [];
        return true;
    }
}
