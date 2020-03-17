import { PolarisWorkflow } from "./polaris-workflow";

describe('components/polaris-workflow', () => {
    jest.useFakeTimers();

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
});