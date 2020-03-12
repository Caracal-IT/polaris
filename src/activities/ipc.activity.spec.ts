import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";
import { Context } from "../model/context.model";
import { IPCActivity } from "./ipc.activity";

describe('activities/ipc-activity', () => {
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

        context.wf.stack = [];
        context.wf.process = {name: 'process1', activities: []};
        context.wf.setProcess = jest.fn();     
    });
    
    it('builds', () => {
        expect(new IPCActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new IPCActivity().name).toBe('ipc');
    });

    it('should have a ipc activity type', () => {
        expect(new IPCActivity().type).toBe('ipc-activity');
    });

    it('should push state onto the stack', async () => {
        const act = new IPCActivity();
        act.ctx = context;
        act.process = 'myProcess';
        act.next = 'myNext';

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.stack.length).toBe(1);
        expect(context.wf.stack[0]).toStrictEqual({process: 'process1', activity: 'myNext'});
        
    });

    it('should navigate to new process', async () => {
        const act = new IPCActivity();
        act.ctx = context;
        act.process = 'myProcess';
        act.next = 'myNext';

        expect.assertions(2);  

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.setProcess).toBeCalledWith('myProcess', 'start', false);
    });

    it('should navigate to new process and clear stack if next is null', async () => {
        const act = new IPCActivity();
        act.ctx = context;
        act.process = 'myProcess';

        expect.assertions(2);  

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.setProcess).toBeCalledWith('myProcess', 'start', true);
    });
});