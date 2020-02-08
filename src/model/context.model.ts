import { Page } from "./page.model";

import { HttpService } from "../services/http.service";
import { WorkflowService } from "../services/workflow.service";

export interface Context {
    page: Page;
    http: HttpService;
    wf: WorkflowService;
}
