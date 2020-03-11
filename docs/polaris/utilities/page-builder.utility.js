export class PageBuilder {
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
