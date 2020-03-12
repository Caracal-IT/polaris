import { Context } from "../model/context.model";
import { WorkflowService } from "../services/workflow.service";
import { FinishActivity } from "./finish.activity";

describe('activities/finish-activity', () => {
    let context: Context;

    beforeEach(() => {
        context = {
            page: null,
            http: null,
            model: null,
            wf: new WorkflowService(null),
            config: null,
            validator: null
        };

        context.wf.stack = [];
        context.wf.goto = jest.fn();
        context.wf.setProcess = jest.fn();     
    });

    it('builds', () => {
        expect(new FinishActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new FinishActivity().name).toBe('finish');
    });

    it('should have a finish activity type', () => {
        expect(new FinishActivity().type).toBe('finish-activity');
    });

    it('should go to the next activity if the stack is empty', async () => {
        const act = new FinishActivity();
        act.ctx = context;
        act.next = 'myNext'

        expect.assertions(2);

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.goto).toBeCalledWith('myNext');
    });

    it('should go to the previous activity if the stack is not empty', async () => {
        const act = new FinishActivity();
        act.ctx = context;
        context.wf.stack.push({process: 'myProcess', activity: 'myAct'})

        expect.assertions(2);

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.setProcess).toBeCalledWith('myProcess', 'myAct');
    });
});