import { Message } from './../model/message.model';
import { Context } from "../model/context.model";
import { WorkflowService } from "./workflow.service";

describe('services/workflow-service', () => {
    let context: Context;
    let message: Message;

    beforeEach(() => {
        jest.useFakeTimers();

        message = null;

        context = {
            page: {
                controls: [],
                sendMessage: (msg) => message = msg
            },
            http: null,
            model: null,
            wf: null,
            config: null,
            validator: null
        };  
    });

    it('builds', () => {
        expect(new WorkflowService(context)).toBeTruthy();
    });

    it('should set process', async () => {
        const wf = new WorkflowService(context);
        wf.stack.push({ process: 'process', activity: 'act1' });
        const process = 'myProcess';
        wf.goto = jest.fn();

        await wf.setProcess(process);
        expect(wf.process).toBe(process);
        expect(wf.activity).toBeNull();
        expect(wf.goto).toBeCalledWith("start");
        expect(message).toStrictEqual({type: 'PROCESS_CHANGED', metadata:{"stack": []}});
    });

    it('should set process and next activity', async () => {
        const wf = new WorkflowService(context);
        wf.stack.push({ process: 'process', activity: 'act1' });
        const process = 'myProcess';
        const next = 'myNextActivity';

        wf.goto = jest.fn();

        await wf.setProcess(process, next);
        expect(wf.process).toBe(process);
        expect(wf.activity).toBeNull();
        expect(wf.goto).toBeCalledWith(next);
        expect(message).toStrictEqual({type: 'PROCESS_CHANGED', metadata:{"stack": []}});
    });

    it('should set process and next activity and not clear stack', async () => {
        const wf = new WorkflowService(context);
        wf.stack.push({ process: 'process', activity: 'act1' });
        const process = 'myProcess';
        const next = 'myNextActivity';

        wf.goto = jest.fn();

        await wf.setProcess(process, next, false);        
        expect(message).toStrictEqual({type: 'PROCESS_CHANGED', metadata:{"stack": [{process: "process", activity: 'act1' }]}});
    });

    it('should go to next activity', () => {
        const wf = new WorkflowService(context);   
        context.wf = wf;  
           
        const process = 'myProcess';
        const activity = 'myNextActivity';
        const execute = jest.fn(async () => true);

        wf.process = {
            name: process,
            activities: [
                { name: 'mock1', type: 'mock-type', execute: null },
                { name: activity, type: 'api-activity', execute },
            ]
        };

        wf.goto(activity);
        jest.runOnlyPendingTimers();

        expect(execute).toBeCalledTimes(1);
        expect(wf.activity.name).toBe(activity);
    });

});