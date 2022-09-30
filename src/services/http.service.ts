import { Endpoint } from "../model/endpoint.model";
import { Context } from "../model/context.model";

export class HttpService {
    private notFound: number = -1;
    private startIndex: number = 0;
    private settingOffset: number = 2;
    private clientError: number = 400;
    private unAuthorizedError: number = 401;

    constructor(private ctx: Context) { }

    async fetch(endpoint: Endpoint) {
        try {
            this.ctx.page.sendMessage({type: "START_LOADING"});
            const response = await fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint));
            
            if(response.status >= this.clientError) {
                const error = await response.json();

                if(response.status >= this.unAuthorizedError)
                    this.ctx.page.sendMessage({type: "UN_AUTHORIZED", metadata: { endpoint, error}});  

                throw {
                    code: response.status,
                    message: response.statusText,
                    error: error
                };
            }

            return await response.json();
        }
        finally {
            setTimeout(() => this.ctx.page.sendMessage({type: "END_LOADING"}));
        }
    }

    private getConfig(endpoint: Endpoint): object{
        const config =  {
            method: endpoint.method,
            mode: 'cors',
            headers: Object.apply({"Content-Type": "application/json"}, endpoint.headers),
            redirect: 'follow',
            referrer: 'no-referrer',
            body: endpoint.body ? JSON.stringify(endpoint.body) : null
        };
        
        return config;
    }

    private resolveSetting(val: string, counter: number = this.startIndex) {
        if(counter > this.settingOffset)
            return val;
            
        const matches = val.match(/\[[\w|_]+\]/g);

        if(matches === null)
            return val;

        let result = matches.reduce(this.replace.bind(this) , val);

        if(result.indexOf('[') > this.notFound) {
            counter++;
            result = this.resolveSetting(result, counter);
        }

        return result;
    }

    private replace(prev: string, next: string): string {
        let replacement:string = this.ctx.config.getSetting(next);
        
        if(replacement !== null && replacement.indexOf('[SELF]') > this.notFound) 
           return replacement.replace('[SELF]', prev.replace(next, ''));

        return prev.replace(next, replacement);
    }
}