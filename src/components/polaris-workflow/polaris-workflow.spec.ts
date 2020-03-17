import { PolarisWorkflow } from "./polaris-workflow";
import { Context } from "../../model/context.model";
import { ModelService } from "../../services/model.service";
import { HttpService } from "../../services/http.service";
import { ConfigService } from "../../services/config.service";
import { ValidatorService } from "../../services/validator.service";
import { ActivityFactory } from "../../activities/activity-factory";
import { RangeValidator } from "../../validators/range.validator";

describe('components/polaris-workflow', () => {
    jest.useFakeTimers();

    let context: Context = {
            page: null,
            http: new HttpService(null),
            model: new ModelService(null),
            wf: null,
            config: new ConfigService(),
            validator: new ValidatorService()
    };    

    const process = {
        name : "demo",
        activities: [
          {
            name: "start",
            type: "page-activity",            
            controls: [
                {tag : "h1", innerHTML: "Polaris" },
                {tag : "span", innerHTML: "Welcome to polaris workflow" },
                {tag : "polaris-workflow", id: "wf" }                 
            ]        
          },
          {
            name: "start2",
            type: "page-activity",            
            controls: [
                {tag : "h1", innerHTML: "Polaris 2" }                  
            ]        
          }
        ]
      };

    it('builds', () => {
        expect(new PolarisWorkflow()).toBeTruthy();
    }); 

    it('should set process', async () => {
        const polaris = new PolarisWorkflow();
        await polaris.load(process);

        expect(polaris.wf.process.name).toBe('demo');
    }); 

    it('should set process, act and session', async () => {
        const polaris = new PolarisWorkflow();

        await polaris.load(process, 'start2', 'mockSession');
        jest.runOnlyPendingTimers();

        await polaris.componentWillLoad();
        polaris._render();

        expect(polaris.wf.process.name).toBe('demo');
        expect(polaris.wf.activity.name).toBe('start2');
        expect(polaris.model.sessionId).toBe('mockSession');
        expect(polaris.controls.length).toBe(1);
    }); 

    it('should set services', async () => {
        const polaris = new PolarisWorkflow();
      
        await polaris.setServices(context);

        expect(polaris.ctx.model).toBe(context.model);      
        expect(polaris.ctx.http).toBe(context.http);      
        expect(polaris.ctx.config).toBe(context.config);      
        expect(polaris.ctx.validator).toBe(context.validator);            
    }); 

    it('should add activities', async () => {
        const polaris = new PolarisWorkflow();
        let actCount = ActivityFactory.activities.length;
        polaris.addActivity({name: 'myAct', type:'my-act', execute: null});

        expect(ActivityFactory.activities.length).toBe(actCount + 1);
    });

    it('should add validators', async () => {
      const polaris = new PolarisWorkflow();
      polaris.validator.addValidator = jest.fn();
      
      polaris.addValidator(new RangeValidator("test"));

      expect(polaris.validator.addValidator).toBeCalledTimes(1);
  });
});