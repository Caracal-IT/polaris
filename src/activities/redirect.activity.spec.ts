import { RedirectActivity } from "./redirect.activity";
import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";

describe('activities/redirect-activity', () => {
    const context = {
        page: null,
        http: null,
        model: new ModelService(null),
        wf: null,
        config: null,
        validator: null
    };
    
    it('builds', () => {
        expect(new RedirectActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new RedirectActivity().name).toBe('redirect');
    });

    it('should have a switch activity type', () => {
        expect(new RedirectActivity().type).toBe('redirect-activity');
    });

    it('should save state before redirect', async () => {
        const act = new RedirectActivity();  
        const wf = new WorkflowService(null);               
        act.ctx = { ...context, wf:wf };
        act.ctx.model.save = jest.fn(); 
                
        expect.assertions(2);        

        await expect(act.execute()).resolves.toEqual(true);
        expect(act.ctx.model.save).toHaveBeenCalled();                
    });
});