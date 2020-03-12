import { Context } from "../model/context.model";
import { WorkflowService } from "../services/workflow.service";
import { DecisionActivity } from "./decision.activity";
import { ModelService } from "../services/model.service";

describe('activities/decision-activity', () => {
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
        expect(new DecisionActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new DecisionActivity().name).toBe('decision');
    });

    it('should have a decision activity type', () => {
        expect(new DecisionActivity().type).toBe('decision-activity');
    });

    it('should go to the true activity if the expression is true', async () => {
        const act = new DecisionActivity();
        act.ctx = context;
        act.trueAction = 'myTrueAction';
        act.falseAction = 'myFalseAction';
        act.expression = '23 == 23';

        expect.assertions(2);

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.goto).toBeCalledWith('myTrueAction');
    });
    
    it('should go to the false activity if the expression is false', async () => {
        const act = new DecisionActivity();
        act.ctx = context;
        act.trueAction = 'myTrueAction';
        act.falseAction = 'myFalseAction';
        act.expression = '23 == 25';

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.goto).toBeCalledWith('myFalseAction');
    });
});