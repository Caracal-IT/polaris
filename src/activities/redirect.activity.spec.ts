import { RedirectActivity } from "./redirect.activity";
import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";
import { Context } from "../model/context.model";

describe('activities/redirect-activity', () => {
    let win: any = window;
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

        context.model.save = jest.fn(); 
        win.location = {};         
    });
    
    it('builds', () => {
        expect(new RedirectActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new RedirectActivity().name).toBe('redirect');
    });

    it('should have a redirect activity type', () => {
        expect(new RedirectActivity().type).toBe('redirect-activity');
    });

    it('should save state before redirect', async () => {
        const act = new RedirectActivity();                
        act.ctx = context;  

        await expect(act.execute()).resolves.toEqual(true);
        expect(act.ctx.model.save).toHaveBeenCalled();                
    });

    it('should redirect page', async () => {
        const act = new RedirectActivity();                 
        act.ctx = context;
        act.name = 'myAct';
        act.location = 'myLocation';
        act.next = 'myNextAct';

        act.ctx.model.sessionId = 'mySession';
        act.ctx.wf.process = {name: 'myProcess', activities: []};

        await expect(act.execute()).resolves.toEqual(true);
        expect(win.location.href).toBe('myLocation?returnUrl=myProcess-myNextAct-mySession');              
    });
});