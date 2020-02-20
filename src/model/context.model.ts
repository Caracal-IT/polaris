import { Page } from "./page.model";

import { HttpService } from "../services/http.service";
import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";
import { ConfigService } from "../services/config.service";
import { ValidatorService } from "../services/validator.service";

export interface Context {
    page: Page;
    http: HttpService;
    model: ModelService;
    wf: WorkflowService;
    config: ConfigService;
    validator: ValidatorService;
}
