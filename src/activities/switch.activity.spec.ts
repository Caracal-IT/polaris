import { WorkflowService } from './../services/workflow.service';
import { SwitchActivity } from "./switch.activity";
import { ModelService } from "../services/model.service";


describe('activities/switch-activity', () => {
    const context = {
        page: null,
        http: null,
        model: new ModelService(null),
        wf: null,
        config: null,
        validator: null
    };

    it('builds', () => {
      expect(new SwitchActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new SwitchActivity().name).toBe('switch');
    });

    it('should have a switch activity type', () => {
        expect(new SwitchActivity().type).toBe('switch-activity');
    });

    it('should throw exception if no rule was not specified', async () => {
        const act = new SwitchActivity();    
        
        expect.assertions(1);        

        await expect(act.execute()).rejects.toEqual(new Error('No valid rule in switch found !!'));
    });

    it('should throw exception if no rule was evaluated', async () => {
        const act = new SwitchActivity();  
        act.ctx = {...context};

        act.rules = [{expression:"3 === 4", next: "next1"}];
        
        expect.assertions(1);        

        await expect(act.execute()).rejects.toEqual(new Error('No valid rule in switch found !!'));
    });

    it('should navigate to the correct path', async () => {
        const act = new SwitchActivity();  
        const wf = new WorkflowService(null)        
        act.ctx = { ...context, wf: wf};

        act.rules = [{expression:"3 === 4", next: "next1"}];
        act.rules = [{expression:"4 === 4", next: "next2"}];
        
        expect.assertions(2);        

        wf["goto"] = (next) => {expect(next).toBe("next2")};
        await expect(act.execute()).resolves.toEqual(true);
    });
});