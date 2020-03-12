import { Context } from "../model/context.model";
import { WorkflowService } from "../services/workflow.service";
import { ModelService } from "../services/model.service";
import { ApiActivity } from "./api.activity";

describe('activities/api-activity', () => {
    let context: Context;

    beforeEach(() => {
        context = {
            page: null,
            http: null,
            model: new ModelService(null),
            wf: new WorkflowService(null),
            config: null,
            validator: null
        };

        context.wf.goto = jest.fn();   
    });

    it('builds', () => {
        expect(new ApiActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new ApiActivity().name).toBe('start');
    });

    it('should have a api activity type', () => {
        expect(new ApiActivity().type).toBe('api-activity');
    });
});