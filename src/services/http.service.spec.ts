import { Context } from "../model/context.model";
import { Message } from "../model/message.model";
import { HttpService } from "./http.service";
import { ConfigService } from "./config.service";
import { Endpoint } from "../model/endpoint.model";

describe('services/http-service', () => {
    const clientError: number = 400;
    const okResult: number = 200;

    let win: NodeJS.Global = global;
    let request: object;
    let settings: object;

    let context: Context;
    let message: Message;

    let endpoint: Endpoint = {
        url:'[WF]/mockUrl',
        method: 'POST',
        body: {
            status: 200,
            response: {
                firstName: 'Ettiene',
                surname: 'Mare'
            }
        }
    };

    beforeEach(() => {
        jest.useFakeTimers();

        message = null;

        win["fetch"] = async (input: object, init: {body: string}) => {
            request = input;
            settings = {...init};
            const body = JSON.parse(init.body);

            return {
                status: body.status,
                json: async () => body.response
            }
        };

        context = {
            page: {
                controls: [],
                sendMessage: (msg) => message = msg
            },
            http: null,
            model: null,
            wf: null,
            config: new ConfigService(),
            validator: null
        }; 
        
        context.config.addSetting('[WF]', 'url://wf.com');
    });

    it('builds', () => {
        expect(new HttpService(context)).toBeTruthy();
    }); 
    
    it('should send http request', async () => {
        const http = new HttpService(context);
        
        jest.runOnlyPendingTimers();

        const response = await http.fetch(endpoint);

        expect(message).not.toBe(null);
        expect(response).toStrictEqual(endpoint.body.response);
        expect(request).toBe('url://wf.com/mockUrl');
        expect(settings).toStrictEqual({
            method: 'POST',
            mode: 'cors',
            headers: {},
            redirect: 'follow',
            referrer: 'no-referrer',
            body: '{"status":200,"response":{"firstName":"Ettiene","surname":"Mare"}}'
          });
    });

    it('should return error for 400', () => {
        endpoint.body.status = clientError;
        endpoint.body.response = 'Mock Error';

        const http = new HttpService(context);
        
        jest.runOnlyPendingTimers();
        const expected = {"code": clientError, "error": "Mock Error", "message": undefined };

        return expect(http.fetch(endpoint)).rejects.toStrictEqual(expected);
    });

    it('should resolve config templates', async () => {
        context.config.addSetting('[AUTH_KEY]', 'KEY_WEST');
        context.config.addSetting('[WF]', 'url://wf2.com[SELF].json?Auth=[AUTH_KEY]');
       
        endpoint.url = '[WF]/mockUrl';
        endpoint.body.status = okResult;

        const http = new HttpService(context);
        jest.runOnlyPendingTimers();
        await http.fetch(endpoint);

        expect(request).toBe('url://wf2.com/mockUrl.json?Auth=KEY_WEST');
    });
});