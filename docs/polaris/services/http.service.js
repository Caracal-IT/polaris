export class HttpService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async fetch(endpoint) {
        try {
            this.ctx.page.sendMessage({ type: "START_LOADING" });
            const response = await fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint));
            if (response.status >= 400) {
                const error = await response.json();
                if (response.status >= 401)
                    this.ctx.page.sendMessage({ type: "UN_AUTHORIZED", metadata: { endpoint, error } });
                throw {
                    code: response.status,
                    message: response.statusText,
                    error: error
                };
            }
            return await response.json();
        }
        finally {
            setTimeout(() => this.ctx.page.sendMessage({ type: "END_LOADING" }));
        }
    }
    getConfig(endpoint) {
        return {
            method: endpoint.method,
            mode: 'cors',
            headers: Object.apply({ "Content-Type": "application/json" }, endpoint.headers),
            redirect: 'follow',
            referrer: 'no-referrer',
            body: endpoint.body ? JSON.stringify(endpoint.body) : null
        };
    }
    resolveSetting(val) {
        const matches = val.match(/\[[\w|_]+\]/g);
        if (!matches)
            return val;
        return matches.reduce((prev, next) => prev.replace(next, this.ctx.config.getSetting(next)), val);
    }
}
