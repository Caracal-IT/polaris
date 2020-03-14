import { HttpWorkflowLoader } from "./workflow-loader.utility";
import { HttpService } from "../services/http.service";

describe('utilities/workflow-loader', () => {
    it('builds', () => {
        expect(new HttpWorkflowLoader(null)).toBeTruthy();
    }); 

    it('should load from web', async () => {
        const http = new HttpService(null);
        http.fetch = jest.fn(async () => {return {name: 'Kate'};});

        const loader = new HttpWorkflowLoader(http);
        const result = await loader.load('login');

        expect(result).toStrictEqual({name: 'Kate'});
        expect(http.fetch).toBeCalledWith({method: 'get', url: '[WF]/login'});
    }); 
});