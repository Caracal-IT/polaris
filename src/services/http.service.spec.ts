import { Context } from "../model/context.model";
import { Message } from "../model/message.model";
import { HttpService } from "./http.service";

describe('services/http-service', () => {
    let context: Context;
    
    beforeEach(() => {
        context = {
            page: null,
            http: null,
            model: null,
            wf: null,
            config: null,
            validator: null
        };  
    });

    it('builds', () => {
        expect(new HttpService(context)).toBeTruthy();
    });    
});