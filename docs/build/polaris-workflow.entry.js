import { r as registerInstance, c as getElement } from './core-f8096cc4.js';

class HttpService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async fetch(endpoint) {
        const response = await fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint));
        return response.json();
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

class ModelService {
    constructor() {
        this.model = {};
    }
    getValue(key, model = this.model) {
        const val = key.split(".").reduce((total, currentElement) => total ? total[currentElement] : undefined, Object.assign({}, model));
        return val;
    }
    setValue(key, val) {
        this.model = this.merge(this.model, key, val);
    }
    merge(model, name, value) {
        if (!name)
            return;
        let newModel = Object.assign({}, model);
        name
            .split(".")
            .reduce((total, current, index, arr) => {
            total[current] = index == arr.length - 1 ? value : Object.assign({}, total[current]);
            return total[current];
        }, newModel);
        return newModel;
    }
}

class ConfigService {
    constructor() {
        this.settings = {
            "[WF]": "wf"
        };
    }
    getSetting(setting) {
        return this.settings[setting];
    }
}

class PageActivity {
    constructor() {
        this.name = "start";
        this.type = "page-activity";
    }
    async execute() {
        if (this.ctx && this.ctx.page && this.ctx.page.controls)
            this.ctx.page.controls = this.controls || [];
        return true;
    }
}

class NullActivity {
    constructor() {
        this.name = "undefined";
        this.type = "null-activity";
    }
    execute() {
        return new Promise((_resolve, reject) => reject());
    }
}

class ApiActivity {
    constructor() {
        this.name = "start";
        this.type = "api-activity";
    }
    async execute() {
        if (this.endpoints && this.endpoints.length > 0)
            this.callEndpoints();
        else if (this.next && this.ctx)
            this.gotoNext();
        return true;
    }
    callEndpoints() {
        if (!this.ctx || !this.ctx.http || !this.endpoints)
            return;
        let counter = 0;
        const fetch = this.callEndpoint.bind(this, this.ctx.http);
        this.endpoints
            .forEach(e => {
            counter++;
            e.body = this.getBody(e);
            fetch(e).finally(() => {
                counter--;
                if (counter === 0)
                    this.gotoNext();
            });
        });
    }
    async callEndpoint(http, endpoint) {
        if (!this.ctx || !this.ctx.config)
            return;
        return http.fetch(endpoint)
            .then(data => this.setModel(endpoint, data));
    }
    gotoNext() {
        if (this.next && this.ctx)
            this.ctx.wf.goto(this.next);
    }
    getBody(endpoint) {
        if (!this.ctx || !this.ctx.model || endpoint.method.toUpperCase() === "GET" || endpoint.method.toUpperCase() === "DELETE")
            return null;
        const model = this.ctx.model;
        const mappings = endpoint.mappings;
        let body = {};
        mappings
            .filter(m => m.direction === 'out' || m.direction === 'inout')
            .forEach(m => Object.assign(body, { [m.client]: model.getValue(m.client) }));
        return JSON.stringify(body);
    }
    setModel(endpoint, data) {
        if (!this.ctx || !this.ctx.model)
            return;
        const model = this.ctx.model;
        const mappings = endpoint.mappings;
        if (!mappings || mappings.length === 0)
            return Object.keys(data).forEach(k => model.setValue(k, data[k]));
        mappings
            .filter(m => m.direction === 'in' || m.direction === 'inout')
            .forEach(m => model.setValue(m.client, model.getValue(m.remote, data)));
    }
}

class ActivityFactory {
    static create(config, ctx) {
        if (!config || !config.type)
            return new NullActivity();
        let act = ActivityFactory.activities.find(a => a.type === config.type);
        if (!act)
            return new NullActivity();
        return Object.assign(act, config, { ctx });
    }
}
ActivityFactory.activities = [
    new NullActivity(),
    new PageActivity(),
    new ApiActivity()
];

class WorkflowService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async setProcess(process, next = "start") {
        try {
            if (typeof process === "string")
                process = await this.ctx.http.fetch({ url: `[WF]/${process}`, method: 'get' });
            this.process = process;
            this.activity = null;
            await this.goto(next);
        }
        catch (ex) {
            console.error(ex);
        }
    }
    async goto(name) {
        var _a;
        if (!this.process || !this.process.activities)
            return;
        if (((_a = this.ctx.wf.activity) === null || _a === void 0 ? void 0 : _a.type) === "page-activity" && !this.ctx.validator.validate())
            return;
        this.activity = this.process
            .activities
            .find(a => a.name == name);
        return ActivityFactory.create(this.activity, this.ctx)
            .execute();
    }
}

class Validator {
    constructor(name) {
        this.name = name;
    }
}

class RequiredValidator extends Validator {
    validate(context, control, config) {
        const value = context.model.getValue(control.id);
        control.error = false;
        delete control.errorMessage;
        if (value === null || value === undefined || value.length === 0) {
            control.error = true;
            control.errorMessage = config.message;
        }
        if (control.el) {
            control.el.setAttribute("error", control.error ? "true" : "false");
            control.el.setAttribute("errorMessage", control.errorMessage);
        }
        console.dir(control);
        return !control.error;
    }
}

class ValidatorService {
    constructor(ctx) {
        this.ctx = ctx;
        this.validators = [
            new RequiredValidator("Required")
        ];
    }
    validate() {
        if (!this.ctx.page || !this.ctx.page.controls)
            return true;
        let isValid = true;
        for (const ctrl of this.ctx.page.controls)
            isValid = this.validateControl(ctrl) && isValid;
        return isValid;
    }
    validateControl(control) {
        if (!control)
            return true;
        for (const index in control.controls)
            return this.validateControl(control.controls[index]);
        if (control.validators && control.validators.length > 0) {
            for (const config of control.validators) {
                const validator = this.validators.find(v => v.name === config.name);
                if (!validator)
                    continue;
                if (!validator.validate(this.ctx, control, config))
                    return false;
            }
        }
        return true;
    }
}

const PolarisWorkflow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.page = this;
        this.model = new ModelService();
        this.http = new HttpService(this);
        this.config = new ConfigService();
        this.wf = new WorkflowService(this);
        this.validator = new ValidatorService(this);
        this._components = [];
        this.ctx = this;
    }
    processChangeHandler() {
        this._render();
    }
    get controls() { return this._components; }
    set controls(val) {
        this._components = val;
        this._render();
    }
    async load(process, next = "start") {
        await this.wf.setProcess(process, next);
    }
    componentWillLoad() {
        if (this.process)
            this.load(this.process);
    }
    _render() {
        for (let i = this.el.childNodes.length - 1; i >= 0; i--)
            this.el.removeChild(this.el.childNodes[i]);
        this.controls.forEach(this.renderComponent.bind(this, this.el));
    }
    renderComponent(parent, control) {
        const el = document.createElement(control.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this
        };
        const newEl = Object.assign(el, control, options);
        control.el = newEl;
        if (newEl.id && newEl.value !== undefined) {
            const newValue = this.model.getValue(newEl.id);
            if (newValue !== undefined)
                newEl.value = newValue;
            this.model.setValue(newEl.id, newEl.value);
            newEl.oninput = (event) => {
                this.model.setValue(event.target.id, event.target.value);
                if (control.error !== undefined) {
                    this.validator.validate();
                }
            };
        }
        if (control.controls)
            control.controls.forEach(this.renderComponent.bind(this, newEl));
        parent.appendChild(newEl);
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "process": ["processChangeHandler"]
    }; }
};

export { PolarisWorkflow as polaris_workflow };
