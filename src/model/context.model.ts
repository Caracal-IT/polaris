import { Page } from "./page.model";

import { WorkflowService } from "../services/workflow.service";

export interface Context {
    page: Page;
    wf: WorkflowService;
}
