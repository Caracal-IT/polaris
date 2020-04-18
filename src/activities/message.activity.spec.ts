import { ModelService } from "../services/model.service";
import { WorkflowService } from "../services/workflow.service";
import { Context } from "../model/context.model";

import { MessageActivity } from "./message.activity";
import { Message } from "../model/message.model";

describe('activities/ipc-activity', () => {
    let context: Context;
    let message: Message

    beforeEach(() => {
        context = {
            page: {controls: null, sendMessage: (msg) => message = msg},
            http: null,
            model: new ModelService(null),
            wf: new WorkflowService(null),
            config: null,
            validator: null
        };

        context.wf.goto = jest.fn();     
    });
    
    it('builds', () => {
        expect(new MessageActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new MessageActivity().name).toBe('message');
    });

    it('should have an ipc activity type', () => {
        expect(new MessageActivity().type).toBe('message-activity');
    });

    it('should send a message to the page', async () => {
        const act = new MessageActivity();
        act.ctx = context;
        act.messageType = "ALERT-USER";
        act.description = 'Kate';
        act.message = "This is a message to Kate";

        await expect(act.execute()).resolves.toEqual(true);
        expect(message.type).toBe("ALERT-USER");
        expect(message.description).toBe("Kate");
        expect(message.metadata.message).toBe("This is a message to Kate");
    });

    it('should go to the next activity after executing', async () => {
        const act = new MessageActivity();
        act.ctx = context;
        act.next = 'myNextAction';

        await expect(act.execute()).resolves.toEqual(true);
        expect(context.wf.goto).toBeCalledWith('myNextAction');
    });

    
});