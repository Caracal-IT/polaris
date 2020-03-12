import { Context } from "../model/context.model";
import { WorkflowService } from "../services/workflow.service";
import { ModelService } from "../services/model.service";
import { ApiActivity } from "./api.activity";
import { HttpService } from "../services/http.service";
import { ApiEndpoint } from "../model/api-endpoint.model";

describe('activities/api-activity', () => {
    let context: Context;

    beforeEach(() => {
        context = {
            page: null,
            http: new HttpService(context),
            model: new ModelService(null),
            wf: new WorkflowService(null),
            config: null,
            validator: null
        };

        context.wf.goto = jest.fn();   
        context.http.fetch = async (endpoint: ApiEndpoint) => {
            return {
                firstName: endpoint.body.firstName,
                url: endpoint.url,
                method: endpoint.method,
                surname2: endpoint.body.surname
            };
        };
    });

    it('builds', () => {
        expect(new ApiActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new ApiActivity().name).toBe('start');
    });

    it('should have a api activity type', () => {
        expect(new ApiActivity().type).toBe('api-activity');
    });

    it('should make an api call and set the model value and goto next activity', async () => {
        const act = new ApiActivity();
        act.ctx = context;
        act.next = 'myNextAction';
        act.endpoints = [
            {
                url:'mockUrl',
                method: 'POST',
                mappings: [
                    {client: 'user.firstName', remote: 'firstName', direction:'inout'},
                    {client: 'user.surname', remote: 'surname', direction:'out'},
                    {client: 'user.surname2', remote: 'surname2', direction:'in'},
                    {client: 'req.method', remote: 'method', direction:'in'},
                    {client: 'user.url', remote: 'url', direction:'in'}
                ],
            }
        ];

        context.model.setValue('user.firstName', 'Kate');
        context.model.setValue('user.surname', 'Mare');
        
        await expect(act.execute()).resolves.toEqual(true);
        expect(context.model.getValue('user.firstName')).toBe('Kate');
        expect(context.model.getValue('user.surname')).toBe('Mare');
        expect(context.model.getValue('user.surname2')).toBe('Mare');
        expect(context.model.getValue('req.method')).toBe('POST');
        expect(context.model.getValue('user.url')).toBe('mockUrl');
        expect(context.wf.goto).toBeCalledWith('myNextAction');
    });
});