import { HttpService } from "../services/http.service";

export interface WorkflowLoader {
    load(processName: string): Promise<string>;
} 

export class HttpWorkflowLoader implements WorkflowLoader {
    constructor(private http: HttpService) { }
    
    async load(processName: string): Promise<string> {
        return await this.http.fetch({url: `[WF]/${processName}`, method: 'get'});
    }
}

export * from "../components/polaris-wf/polaris-wf"; 