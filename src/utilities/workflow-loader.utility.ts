import { Process } from "../model/process.model";
import { HttpService } from "../services/http.service";

export interface WorkflowLoader {
    load(processName: string): Promise<Process>;
} 

export class HttpWorkflowLoader implements WorkflowLoader {
    constructor(private http: HttpService) { }
    
    async load(processName: string): Promise<Process> {
        return this.http.fetch({url: `[WF]/${processName}`, method: 'get'});
    }
}