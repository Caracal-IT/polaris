import { Endpoint } from "../model/endpoint.model";
import { Context } from "../model/context.model";

export class HttpService {
    constructor(private ctx: Context) { }

    async fetch(endpoint: Endpoint) {
        try {
            this.ctx.page.sendMessage({type: "START_LOADING"});
            const response = await fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint));
            
            if(response.status >= 400) {
                const error = await response.json();

                if(response.status >= 401)
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

    private resolveSetting(val: string, counter = 0) {
        if(counter > 2)
            return val;
            
        const matches = val.match(/\[[\w|_]+\]/g);

        if(!matches)
            return val;

        let result = matches.reduce(this.replace.bind(this) , val);

        if(result.indexOf('[') > -1)
          result = this.resolveSetting(result, counter++);

        return result;
    }

    private replace(prev: string, next: string): string {
        let replacement:string = this.ctx.config.getSetting(next);
        
        if(replacement && replacement.indexOf('[SELF]') > -1) 
           return replacement.replace('[SELF]', prev.replace(next, ''));

        return prev.replace(next, replacement);
    }
}