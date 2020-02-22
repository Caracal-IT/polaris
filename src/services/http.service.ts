import { Endpoint } from "../model/endpoint.model";
import { Context } from "../model/context.model";

export class HttpService {
    constructor(private ctx: Context) { }

    async fetch(endpoint: Endpoint) {
        try {
            this.ctx.page.sendMessage({type: "START_LOADING"}); 
            const response = await fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint));

            return response.json();
        }
        finally {
            this.ctx.page.sendMessage({type: "END_LOADING"});
        }
    }

    private getConfig(endpoint: Endpoint): object{
        return  {
            method: endpoint.method,
            mode: 'cors',
            headers: Object.apply({"Content-Type": "application/json"}, endpoint.headers),
            redirect: 'follow',
            referrer: 'no-referrer',
            body: endpoint.body ? JSON.stringify(endpoint.body) : null
        };
    }

    private resolveSetting(val: string) {
        const matches = val.match(/\[[\w|_]+\]/g);

        if(!matches)
            return val;

        return matches.reduce((prev, next) => prev.replace(next, this.ctx.config.getSetting(next)), val);
    }
}

