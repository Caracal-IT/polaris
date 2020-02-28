import { Activity } from "./activity";
import { Context } from "../model/context.model";
import { HttpService } from "../services/http.service";
import { ApiEndpoint } from "../model/api-endpoint.model";

export class ApiActivity implements Activity {
    name = "start";
    type = "api-activity";

    ctx?: Context;
    endpoints?: Array<ApiEndpoint>;
    next?:string;

    async execute(): Promise<boolean> {
        if(this.endpoints && this.endpoints.length > 0) 
            setTimeout(this.callEndpoints.bind(this));
        else if(this.next && this.ctx)
            this.gotoNext();

        return true;
    }

    private callEndpoints() {
        if(!this.ctx || !this.ctx.http || !this.endpoints)
            return;

        let counter = 0;

        const fetch = this.callEndpoint.bind(this, this.ctx.http)
        this.endpoints
            .forEach(e => {
                counter++;
                e.body = this.getBody(e);

                fetch(e).finally(() => {
                    counter--;

                    if(counter === 0)
                        this.gotoNext()
                });
            });
    }

    private async callEndpoint(http: HttpService, endpoint: ApiEndpoint) {
        if(!this.ctx || !this.ctx.config)
            return;
            
        return http.fetch(endpoint)
                   .then(data => this.setModel(endpoint, data));
    }

    private gotoNext() {
        if(this.next && this.ctx)
            this.ctx.wf.goto(this.next);
    }

    private getBody(endpoint: ApiEndpoint) {
        if(!this.ctx || !this.ctx.model || endpoint.method.toUpperCase() === "GET" || endpoint.method.toUpperCase() === "DELETE")
            return null;

        const model = this.ctx.model;
        const mappings = endpoint.mappings;

        let body = {};
        mappings
            .filter(m => m.direction === 'out' || m.direction === 'inout')
            .forEach(m => Object.assign(body, {[m.client]: model.getValue(m.client)}));

        return JSON.stringify(body);
    }

    private setModel(endpoint: ApiEndpoint, data: any) {
        if(!this.ctx || !this.ctx.model)
            return;

        const model = this.ctx.model;
        const mappings = endpoint.mappings;

        if(!mappings || mappings.length === 0)             
            return Object.keys(data).forEach(k => model.setValue(k, data[k]));  
        
        mappings
            .filter(m => m.direction === 'in' || m.direction === 'inout')
            .forEach(m => model.setValue(m.client, model.getValue(m.remote, data)));
    }
}


