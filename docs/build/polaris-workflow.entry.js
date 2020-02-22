import { r as registerInstance, d as createEvent, c as getElement } from './core-63e25ceb.js';

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

function currencyFormat(value, [locale, currency]) {
    var formatter = new Intl.NumberFormat(locale, {
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
    constructor() {
        this.model = {};
        this.sessionId = this.UUID();
        this.pipes = new PipeFactory();
    }
    getValue(key, model = this.model) {
        const val = key.split(".").reduce((total, currentElement) => total ? total[currentElement] : undefined, Object.assign({}, model));
        return val;
    }
    getInterpolatedValue(value) {
        if (!value)
            return value;
        const myRegexp = /\{\{(?:(\w|\.|\||-)+)\}\}/g;
        const match = value.match(myRegexp);
        if (!match || match.length === 0)
            return value;
        return match.reduce((prev, curr) => this.replaceAll(prev, curr), value);
    }
    setValue(key, val) {
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
        this.settings = {
            "[WF]": "wf"
        };
    }
    getSetting(setting) {
        return this.settings[setting];
    }
}

class RedirectActivity {
    constructor() {
        this.name = "redirect";
        this.type = "redirect-activity";
    }
    async execute() {
        var _a;
        if (!this.ctx || !this.ctx.wf)
            return false;
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
        if (!this.ctx || !this.ctx.wf)
            return false;
        if (this.ctx.wf.stack.length === 0)
            return true;
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
        var _a;
        if (!this.ctx || !this.ctx.wf)
            return false;
        if (this.process && this.process.length > 0) {
            this.ctx.wf.stack.push({
                process: (_a = this.ctx.wf.process) === null || _a === void 0 ? void 0 : _a.name,
                activity: this.next
            });
            this.ctx.wf.setProcess(this.process);
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
        if (!this.ctx || !this.ctx.model)
            return false;
        this.eval(this.expression, this.ctx);
        if (this.next && this.next.length > 0)
            this.ctx.wf.goto(this.next);
        return true;
    }
    eval(expression, ctx) {
        const f = new Function('ctx', 'model', expression);
        return f(ctx, ctx.model);
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

class AssignActivity {
    constructor() {
        this.name = "assign";
        this.type = "assign-activity";
    }
    async execute() {
        if (!this.ctx || !this.ctx.model)
            return false;
        let value = this.value || "";
        if (this.value && this.value.startsWith("{") && this.value.endsWith("}"))
            value = this.ctx.model.getValue(this.value.substring(1, this.value.length - 1));
        this.ctx.model.setValue(this.key, value);
        this.ctx.wf.goto(this.next);
        return true;
    }
}

class DecisionActivity extends CodeActivity {
    constructor() {
        super(...arguments);
        this.name = "assign";
        this.type = "decision-activity";
    }
    async execute() {
        if (!this.ctx || !this.ctx.model || !this.conditions)
            return false;
        let isValid = true;
        for (let condition of this.conditions) {
            if (condition.operator === 'or')
                isValid = isValid || this.validate(condition);
            else
                isValid = isValid && this.validate(condition);
        }
        if (isValid)
            this.ctx.wf.goto(this.trueAction);
        else
            this.ctx.wf.goto(this.falseAction);
        return true;
    }
    validate(condition) {
        try {
            let left = condition.left;
            if (condition.left && condition.left.startsWith('{') && condition.left.endsWith('}'))
                left = this.ctx.model.getValue(condition.left.substring(1, condition.left.length - 1));
            const expression = `return ${left} ${condition.equality} ${condition.right};`;
            return super.eval(expression, this.ctx);
        }
        catch (ex) {
            console.warn('Decision Activity', ex);
            return false;
        }
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
    new ApiActivity(),
    new AssignActivity(),
    new CodeActivity(),
    new DecisionActivity(),
    new IPCActivity(),
    new FinishActivity(),
    new RedirectActivity()
];

class WorkflowService {
    constructor(ctx) {
        this.ctx = ctx;
        this.stack = [];
    }
    async setProcess(process, next = "start") {
        try {
            if (typeof process === "string")
                process = await this.ctx.http.fetch({ url: `[WF]/${process}`, method: 'get' });
            this.process = process;
            this.activity = null;
            this.goto(next);
        }
        catch (err) {
            if (err)
                this.ctx.page.sendMessage({ type: "ERROR", description: err.message, metadata: err });
        }
    }
    goto(name) {
        setTimeout(this.tryNext.bind(this, name));
    }
    async tryNext(name) {
        var _a;
        try {
            this.ctx.page.sendMessage({ type: "START_LOADING" });
            this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGING" });
            await this.next(name);
            this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGED" });
        }
        catch (err) {
            this.ctx.page.sendMessage({ type: "ERROR", description: (_a = err) === null || _a === void 0 ? void 0 : _a.message, metadata: err });
        }
        finally {
            this.ctx.page.sendMessage({ type: "END_LOADING" });
        }
    }
    async next(name) {
        var _a;
        if (!this.process || !this.process.activities)
            return null;
        if (((_a = this.ctx.wf.activity) === null || _a === void 0 ? void 0 : _a.type) === "page-activity" && !this.ctx.validator.validate())
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
        let isValid = true;
        for (const index in control.controls)
            isValid = this.validateControl(control.controls[index]) && isValid;
        if (control.validators && control.validators.length > 0) {
            for (const config of control.validators) {
                const validator = this.validators.find(v => v.name === config.name);
                if (!validator)
                    continue;
                if (!validator.validate(this.ctx, control, config)) {
                    isValid = false;
                    this.sendErrorMsg(validator, control);
                }
            }
        }
        return isValid;
    }
    sendErrorMsg(validator, control) {
        this.ctx.page.sendMessage({
            type: "VALIDATION_ERROR",
            description: control.errorMessage,
            metadata: {
                validator: validator.name,
                control: control.id
            }
        });
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
        this.wfMessage = createEvent(this, "wfMessage", 7);
    }
    processChangeHandler() {
        this._render();
    }
    get controls() { return this._components; }
    set controls(val) {
        this._components = val;
        this._render();
    }
    async load(process, next = "start", sessionId = '') {
        if (sessionId && sessionId.length > 0) {
            this.ctx.model.sessionId = sessionId;
            this.ctx.model.load();
        }
        await this.wf.setProcess(process, next);
    }
    sendMessage(message) {
        var _a, _b, _c;
        const metaData = {
            process: (_a = this.wf.process) === null || _a === void 0 ? void 0 : _a.name,
            activity: (_b = this.wf.activity) === null || _b === void 0 ? void 0 : _b.name,
            activityType: (_c = this.wf.activity) === null || _c === void 0 ? void 0 : _c.type,
            timestamp: Date.now()
        };
        const msg = Object.assign(Object.assign({}, message), metaData);
        this.wfMessage.emit(msg);
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
        var _a;
        const el = document.createElement(control.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this
        };
        const newEl = Object.assign(el, control, options);
        control.el = newEl;
        this.bind(newEl);
        this.bindCaption(newEl, control);
        (_a = control.controls) === null || _a === void 0 ? void 0 : _a.forEach(this.renderComponent.bind(this, newEl));
        parent.appendChild(newEl);
        this.addErrorLabel(newEl);
    }
    bind(newEl) {
        if (!newEl.id || newEl.value === undefined)
            return;
        const newValue = this.model.getValue(newEl.id);
        if (newValue !== undefined)
            newEl.value = newValue;
        this.model.setValue(newEl.id, newEl.value);
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
        newEl[prop] = this.model.getInterpolatedValue(control[prop] || newEl[prop]);
    }
    onInput(newEl) {
        this.model.setValue(newEl.id, newEl.value);
        if (newEl.hasAttribute('error'))
            this.validator.validate();
    }
    addErrorLabel(newEl) {
        if (!newEl.validators)
            return;
        const errLabel = document.createElement("span");
        errLabel.setAttribute("wf-error", "error");
        newEl.parentNode.appendChild(errLabel);
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "process": ["processChangeHandler"]
    }; }
};

export { PolarisWorkflow as polaris_workflow };
