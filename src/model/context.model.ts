import { Page } from "./page.model";

import { HttpService } from "../services/http.service";
import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";

export interface Context {
    page: Page;
    http: HttpService;
    model: ModelService;
    wf: WorkflowService;
}
