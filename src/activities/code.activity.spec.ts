import { Context } from "../model/context.model";
import { WorkflowService } from "../services/workflow.service";
import { ModelService } from "../services/model.service";
import { CodeActivity } from "./code.activity";

describe('activities/code-activity', () => {
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
        expect(new CodeActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new CodeActivity().name).toBe('code');
    });

    it('should have a code activity type', () => {
        expect(new CodeActivity().type).toBe('code-activity');
    });

    it('should go to the next activity after executing', async () => {
        const act = new CodeActivity();
        act.ctx = context;
        act.next = 'myNextAction';
        act.expression = 'ctx.model.setValue("user.firstName", "Ettiene");';

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.model.getValue('user.firstName')).toBe('Ettiene');
        expect(context.wf.goto).toBeCalledWith('myNextAction');
    });
});