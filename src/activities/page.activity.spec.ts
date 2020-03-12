import { Context } from "../model/context.model";
import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";
import { PageActivity } from "./page.activity";

describe('activities/page-activity', () => {
    let context: Context;

    beforeEach(() => {
        context = {
            page: {
                controls: [],
                sendMessage: null
            },
            http: null,
            model: new ModelService(null),
            wf: new WorkflowService(null),
            config: null,
            validator: null
        };      
    });

    it('builds', () => {
        expect(new PageActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new PageActivity().name).toBe('start');
    });

    it('should have a page activity type', () => {
        expect(new PageActivity().type).toBe('page-activity');
    });

    it('should map controls to the page', async () => {
        const act = new PageActivity();
        act.ctx = context;
        act.controls = [
            {tag: 'control1', ctx: context},
            {tag: 'control2', ctx: context}
        ];

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.page.controls.length).toBe(2);
        expect(context.page.controls[0].tag).toBe('control1');
        expect(context.page.controls[1].tag).toBe('control2');
    });
});