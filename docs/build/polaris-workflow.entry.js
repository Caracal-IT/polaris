import { r as registerInstance, c as createEvent, g as getElement } from './index-5186ebba.js';

class HttpService {
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
    resolveSetting(val, counter = 0) {
        if (counter > 2)
            return val;
        const matches = val.match(/\[[\w|_]+\]/g);
        if (!matches)
            return val;
        let result = matches.reduce(this.replace.bind(this), val);
        if (result.indexOf('[') > -1)
            result = this.resolveSetting(result, counter++);
        return result;
    }
    replace(prev, next) {
        let replacement = this.ctx.config.getSetting(next);
        if (replacement && replacement.indexOf('[SELF]') > -1)
            return replacement.replace('[SELF]', prev.replace(next, ''));
        return prev.replace(next, replacement);
    }
}

function currencyFormat(value, [locale, currency]) {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });
    return formatter.format(+value);
}

class PipeFactory {
    constructor() {
        this.currencyFormat = currencyFormat;
    }
}

class ModelService {
    constructor(config) {
        this.config = config;
        this.model = {};
        this.sessionId = this.UUID();
        this.pipes = new PipeFactory();
    }
    getValue(key, model = this.model) {
        if (key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1)
            return this.config.getSetting(key);
        const val = key.split(".").reduce((total, currentElement) => total ? total[currentElement] : undefined, Object.assign({}, model));
        if (!key.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g) && val === undefined)
            return key;
        return val;
    }
    getInterpolatedValue(value) {
        if (!value)
            return value;
        const myRegexp = /\{\{\[*(?:(\w|\.|\||-)+)\]*\}\}/g;
        const match = value.match(myRegexp);
        if (!match || match.length === 0)
            return value;
        return match.reduce((prev, curr) => this.replaceAll(prev, curr), value);
    }
    setValue(key, val) {
        if (key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1)
            this.config.addSetting(key, val);
        else
            this.model = this.merge(this.model, key, val);
    }
    save() {
        sessionStorage.setItem(this.sessionId, JSON.stringify(this.model));
    }
    load() {
        const value = sessionStorage.getItem(this.sessionId);
        this.clearCache();
        if (!value)
            return;
        this.model = JSON.parse(value);
    }
    clearCache() {
        sessionStorage.clear();
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
    UUID() {
        return 'xxxxxxxxRxxxxR4xxxRyxxxRxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    replaceAll(value, key) {
        const expr = key.substring(2, key.length - 2);
        const values = expr.split('|');
        const params = values.slice(2);
        let newValue = this.getValue(values[0]);
        if (values && values.length > 1 && this.pipes[values[1]])
            newValue = this.pipes[values[1]](newValue, params);
        return value.replace(key, newValue);
    }
}

class ConfigService {
    constructor() {
        this.settings = {};
    }
    getSetting(key) {
        return this.settings[key];
    }
    addSetting(key, setting) {
        if (key.indexOf('[') === -1)
            key = `[${key}]`;
        this.settings[key] = setting;
    }
}

class RedirectActivity {
    constructor() {
        this.name = "redirect";
        this.type = "redirect-activity";
    }
    async execute() {
        var _a;
        this.ctx.model.save();
        const params = `${(_a = this.ctx.wf.process) === null || _a === void 0 ? void 0 : _a.name}-${this.next}-${this.ctx.model.sessionId}`;
        window.location.href = `${this.location}?returnUrl=${params}`;
        return true;
    }
}

class FinishActivity {
    constructor() {
        this.name = "finish";
        this.type = "finish-activity";
    }
    async execute() {
        if (this.ctx.wf.stack.length === 0) {
            if (this.next)
                this.ctx.wf.goto(this.next);
            return true;
        }
        const ipc = this.ctx.wf.stack.pop();
        this.ctx.wf.setProcess(ipc.process, ipc.activity);
        return true;
    }
}

class IPCActivity {
    constructor() {
        this.name = "ipc";
        this.type = "ipc-activity";
    }
    async execute() {
        if (this.process && this.process.length > 0) {
            this.ctx.wf.stack.push({
                process: this.ctx.wf.process.name,
                activity: this.next
            });
            this.ctx.wf.setProcess(this.process, 'start', this.next ? false : true);
        }
        return true;
    }
}

class CodeActivity {
    constructor() {
        this.name = "code";
        this.type = "code-activity";
    }
    async execute() {
        this.eval(this.expression, this.ctx);
        if (this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
        return true;
    }
    eval(expression, ctx) {
        const f = new Function('ctx', expression);
        return f(ctx);
    }
}

class PageActivity {
    constructor() {
        this.name = "start";
        this.type = "page-activity";
    }
    async execute() {
        if (this.ctx.page.controls)
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
        return new Promise((_resolve, reject) => reject("NULL Activity"));
    }
}

class ApiActivity {
    constructor() {
        this.name = "start";
        this.type = "api-activity";
    }
    async execute() {
        await this.callEndpoints();
        this.gotoNext();
        return true;
    }
    async callEndpoints() {
        for (const endpoint of this.endpoints) {
            endpoint.body = this.getBody(endpoint);
            await this.callEndpoint(this.ctx.http, endpoint);
        }
        ;
        return true;
    }
    async callEndpoint(http, endpoint) {
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
            .forEach(m => Object.assign(body, { [m.remote]: model.getValue(m.client) }));
        return body;
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

class AssignActivity {
    constructor() {
        this.name = "assign";
        this.type = "assign-activity";
    }
    async execute() {
        const value = this.ctx.model.getInterpolatedValue(this.value);
        this.ctx.model.setValue(this.key, value);
        this.ctx.wf.goto(this.next);
        return true;
    }
}

class DecisionActivity extends CodeActivity {
    constructor() {
        super(...arguments);
        this.name = "decision";
        this.type = "decision-activity";
    }
    async execute() {
        const exp = `return ${this.ctx.model.getInterpolatedValue(this.expression)};`;
        if (this.eval(exp, this.ctx))
            this.ctx.wf.goto(this.trueAction);
        else
            this.ctx.wf.goto(this.falseAction);
        return true;
    }
}

class SwitchActivity extends CodeActivity {
    constructor() {
        super(...arguments);
        this.name = "switch";
        this.type = "switch-activity";
    }
    async execute() {
        for (let rule of this.rules || []) {
            const expression = `return ${this.ctx.model.getInterpolatedValue(rule.expression)};`;
            if (this.eval(expression, this.ctx)) {
                this.ctx.wf.goto(rule.next);
                return true;
            }
        }
        throw new Error(`No valid rule in ${this.name} found !!`);
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
    static add(activity) {
        let act = ActivityFactory.activities.find(a => a.type === activity.type);
        if (!act)
            ActivityFactory.activities.push(activity);
    }
}
ActivityFactory.activities = [
    new NullActivity(),
    new PageActivity(),
    new ApiActivity(),
    new AssignActivity(),
    new CodeActivity(),
    new DecisionActivity(),
    new IPCActivity(),
    new FinishActivity(),
    new RedirectActivity(),
    new SwitchActivity()
];

class WorkflowService {
    constructor(ctx) {
        this.ctx = ctx;
        this.stack = [];
    }
    async setProcess(process, next = "start", clearStack = true) {
        try {
            if (clearStack)
                this.stack = [];
            if (typeof process === "string" && this.loader)
                process = await this.loader.load(process);
            this.process = process;
            this.activity = null;
            this.goto(next);
            this.ctx.page.sendMessage({ type: "PROCESS_CHANGED", metadata: { stack: this.stack } });
        }
        catch (err) {
            if (err) {
                console.error(err);
                this.ctx.page.sendMessage({ type: "ERROR", description: err.message, metadata: err });
            }
        }
    }
    goto(name) {
        setTimeout(this.tryNext.bind(this, name));
    }
    async tryNext(name) {
        try {
            this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGING" });
            await this.next(name);
            this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGED" });
        }
        catch (err) {
            this.ctx.page.sendMessage({ type: "ERROR", description: err === null || err === void 0 ? void 0 : err.message, metadata: err });
        }
    }
    async next(name) {
        var _a;
        if (!this.process || !this.process.activities)
            return null;
        if (((_a = this.ctx.wf.activity) === null || _a === void 0 ? void 0 : _a.type) === "page-activity" && !this.ctx.validator.validate(this.ctx))
            return null;
        let newActivity = this.process
            .activities
            .find(a => a.name == name);
        if (!newActivity)
            throw new Error(`Activity ${name} not found`);
        this.activity = newActivity;
        return await ActivityFactory.create(this.activity, this.ctx)
            .execute();
    }
}

class Validator {
    constructor(name) {
        this.name = name;
    }
    setError(control, error, message) {
        control.error = error;
        control.errorMessage = error ? message : null;
        if (control.el) {
            control.el.setAttribute("error", control.error ? "true" : "false");
            control.el.setAttribute("errorMessage", control.errorMessage);
        }
        if (control.el.nextSibling["attributes"]["wf-error"])
            control.el.nextSibling.textContent = control.errorMessage;
    }
}

class RequiredValidator extends Validator {
    validate(context, control, config) {
        const value = context.model.getValue(control.id);
        const isEmpty = value === null || value === undefined || value.length === 0;
        super.setError(control, isEmpty, config.message);
        return !isEmpty;
    }
}

class RegexValidator extends Validator {
    validate(context, control, config) {
        const value = context.model.getValue(control.id);
        const regex = new RegExp(config.expression, 'g');
        const result = regex.exec(value);
        const isValid = result ? true : false;
        super.setError(control, !isValid, config.message);
        return isValid;
    }
}

class RangeValidator extends Validator {
    validate(context, control, config) {
        const value = +context.model.getValue(control.id);
        const isValid = value >= config.min && value <= config.max;
        super.setError(control, !isValid, config.message);
        return isValid;
    }
}

class ValidatorService {
    constructor() {
        this.validators = [
            new RequiredValidator("required"),
            new RegexValidator("regex"),
            new RangeValidator("range")
        ];
    }
    validate(ctx) {
        if (!ctx.page || !ctx.page.controls)
            return true;
        let isValid = true;
        for (const ctrl of ctx.page.controls)
            isValid = this.validateControl(ctx, ctrl) && isValid;
        return isValid;
    }
    addValidator(validator) {
        const val = this.validators.find(v => v.name === validator.name);
        if (!val)
            this.validators.push(validator);
    }
    validateControl(ctx, control) {
        if (!control)
            return true;
        let isValid = true;
        for (const index in control.controls)
            isValid = this.validateControl(ctx, control.controls[index]) && isValid;
        if (control.validators && control.validators.length > 0) {
            for (const config of control.validators) {
                const validator = this.validators.find(v => v.name === config.name);
                if (!validator)
                    continue;
                if (!validator.validate(ctx, control, config)) {
                    isValid = false;
                    this.sendErrorMsg(ctx, validator, control);
                    break;
                }
            }
        }
        return isValid;
    }
    sendErrorMsg(ctx, validator, control) {
        ctx.page.sendMessage({
            type: "VALIDATION_ERROR",
            description: control.errorMessage,
            metadata: {
                validator: validator.name,
                control: control.id
            }
        });
    }
}

class PageBuilder {
    constructor(ctx) {
        this.ctx = ctx;
    }
    build(parent, onInput) {
        this.onInput = onInput;
        this.clearPage(parent);
        this.ctx.controls.forEach(this.addComponent.bind(this, parent));
    }
    clearPage(parent) {
        for (let i = parent.childNodes.length - 1; i >= 0; i--)
            parent.removeChild(parent.childNodes[i]);
    }
    addComponent(parent, control) {
        let newEl;
        if (control.tag === "polaris-workflow")
            newEl = this.createWorkflowElement(control);
        else
            newEl = this.createElement(control);
        parent.appendChild(newEl);
        this.addErrorLabel(newEl);
    }
    createWorkflowElement(control) {
        const el = document.createElement(control.tag);
        const newEl = Object.assign(el, control);
        newEl.setServices(this.ctx);
        return newEl;
    }
    createElement(control) {
        var _a;
        const el = document.createElement(control.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this.ctx
        };
        const newEl = Object.assign(el, control, options);
        control.el = newEl;
        this.bind(newEl);
        this.bindCaption(newEl, control);
        (_a = control.controls) === null || _a === void 0 ? void 0 : _a.forEach(this.addComponent.bind(this, newEl));
        return newEl;
    }
    bind(newEl) {
        if (!newEl.id || newEl.value === undefined)
            return;
        const newValue = this.ctx.model.getValue(newEl.id);
        if (newValue !== undefined)
            newEl.value = newValue;
        this.ctx.model.setValue(newEl.id, newEl.value);
        newEl.oninput = this.onInput.bind(this, newEl);
    }
    bindCaption(newEl, control) {
        this.interpolate('caption', newEl, control);
        this.interpolate('textContent', newEl, control);
        this.interpolate('innerHTML', newEl, control);
    }
    interpolate(prop, newEl, control) {
        if (!newEl[prop])
            return;
        newEl[prop] = this.ctx.model.getInterpolatedValue(control[prop] || newEl[prop]);
    }
    addErrorLabel(newEl) {
        if (!newEl.validators)
            return;
        const errLabel = document.createElement("span");
        errLabel.setAttribute("wf-error", "error");
        newEl.parentNode.appendChild(errLabel);
    }
}

class HttpWorkflowLoader {
    constructor(http) {
        this.http = http;
    }
    async load(processName) {
        return await this.http.fetch({ url: `[WF]/${processName}`, method: 'get' });
    }
}

const PolarisWorkflow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.page = this;
        this._components = [];
        this.ctx = this;
        this.http = new HttpService(this.ctx);
        this.config = new ConfigService();
        this.model = new ModelService(this.ctx.config);
        this.wf = new WorkflowService(this.ctx);
        this.validator = new ValidatorService();
        this.wfMessage = createEvent(this, "wfMessage", 7);
    }
    processChangeHandler() {
        this.load(this.process, this.activity, this.sessionId);
    }
    get controls() { return this._components; }
    set controls(val) {
        this._components = val;
        this._render();
    }
    async setServices(ctx) {
        this.model = ctx.model;
        this.http = ctx.http;
        this.config = ctx.config;
        this.validator = ctx.validator;
    }
    async load(process, next = "start", sessionId = '') {
        if (sessionId && sessionId.length > 0) {
            this.ctx.model.sessionId = sessionId;
            this.ctx.model.load();
        }
        await this.wf.setProcess(process, next);
    }
    async addActivity(activity) {
        ActivityFactory.add(activity);
    }
    async addValidator(validator) {
        this.validator.addValidator(validator);
    }
    sendMessage(message) {
        var _a, _b, _c;
        const metaData = {
            process: (_a = this.wf.process) === null || _a === void 0 ? void 0 : _a.name,
            activity: (_b = this.wf.activity) === null || _b === void 0 ? void 0 : _b.name,
            activityType: (_c = this.wf.activity) === null || _c === void 0 ? void 0 : _c.type,
            timestamp: Date.now()
        };
        this.wfMessage.emit(Object.assign(Object.assign({}, message), metaData));
    }
    async componentWillLoad() {
        if (this.url) {
            this.config.addSetting("[settingsUrl]", this.url);
            const settings = await this.http.fetch({ method: "GET", url: this.url });
            Object.keys(settings).forEach(k => this.config.addSetting(k, settings[k]));
        }
        if (!this._loader) {
            this._loader = new HttpWorkflowLoader(this.http);
            this.wf.loader = this._loader;
        }
        if (this.parent)
            this.setServices(this.parent);
        if (this.process)
            this.load(this.process, this.activity, this.sessionId);
    }
    onInput(newEl) {
        this.model.setValue(newEl.id, newEl.value);
        if (newEl.hasAttribute('error'))
            this.validator.validate(this);
    }
    _render() {
        const builder = new PageBuilder(this);
        builder.build(this.el, this.onInput.bind(this));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "process": ["processChangeHandler"]
    }; }
};

export { PolarisWorkflow as polaris_workflow };
