import { Endpoint } from "../model/endpoint.model";

export class HttpService {
     async fetch(endpoint: Endpoint) {
        const response = await fetch(endpoint.url, this.getConfig(endpoint));
        return response.json();
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
}

