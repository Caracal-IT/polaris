export class HttpWorkflowLoader {
    constructor(http) {
        this.http = http;
    }
    async load(processName) {
        return await this.http.fetch({ url: `[WF]/${processName}`, method: 'get' });
    }
}
