import { Activity } from "./activity";
import { Context } from "../model/context.model";
import { HttpService } from "../services/http.service";
import { ApiEndpoint } from "../model/api-endpoint.model";

export class ApiActivity implements Activity {
    name = "start";
    type = "api-activity";

    ctx: Context;
    endpoints: Array<ApiEndpoint>;
    next:string;

     async execute(): Promise<boolean> {  
        await this.callEndpoints();
        this.gotoNext();
        return true;
    }

    private async callEndpoints(): Promise<boolean> {
        for(const endpoint of this.endpoints) {
            endpoint.body = this.getBody(endpoint);
            
            await this.callEndpoint(this.ctx.http, endpoint);
        };

        return true;
    }

    private async callEndpoint(http: HttpService, endpoint: ApiEndpoint) {
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
            .forEach(m => Object.assign(body, {[m.remote]: model.getValue(m.client)}));
        
        return body;
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


