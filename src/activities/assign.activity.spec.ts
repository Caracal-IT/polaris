import { Context } from "../model/context.model";
import { WorkflowService } from "../services/workflow.service";
import { ModelService } from "../services/model.service";
import { AssignActivity } from "./assign.activity";

describe('activities/assign-activity', () => {
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
        expect(new AssignActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new AssignActivity().name).toBe('assign');
    });

    it('should have a assign activity type', () => {
        expect(new AssignActivity().type).toBe('assign-activity');
    });

    it('should go to the next activity after assigning a value to the model', async () => {
        const act = new AssignActivity();
        act.ctx = context;
        act.next = 'myNextAction';
        act.key = 'user.firstName';
        act.value = 'Kate';

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.model.getValue('user.firstName')).toBe('Kate');
        expect(context.wf.goto).toBeCalledWith('myNextAction');
    });
});