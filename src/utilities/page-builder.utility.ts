import { Context } from "../model/context.model";
import { Page } from "../model/page.model";
import { Control } from "../model/control.model";

export class PageBuilder {
    onInput: (element: HTMLElement & Control) => void;
    
    constructor(private ctx: Context & Page){}

    build(parent: HTMLElement, onInput: (element: HTMLElement & Control) => void){
        this.onInput = onInput;

        this.clearPage(parent);
        
        this.ctx.controls.forEach(this.addComponent.bind(this, parent));
    }

    clearPage(parent: HTMLElement){
        for(let i = parent.childNodes.length - 1; i >= 0; i--) 
            parent.removeChild(parent.childNodes[i]);    
    }

    private addComponent(parent: HTMLElement, control: Control) {
        let newEl: HTMLElement & Control;

        if(control.tag === "polaris-workflow") 
            newEl = this.createWorkflowElement(control); 
        else 
            newEl = this.createElement(control); 
        
        parent.appendChild(newEl);
        this.addErrorLabel(newEl);
    }

    private createWorkflowElement(control: Control): HTMLElement & Control{
        const el = document.createElement(control.tag) as HTMLPolarisWorkflowElement;
        const newEl = Object.assign(el, control);               
        newEl.setServices(this.ctx);
        
        return newEl;
    }

    private createElement(control: Control): HTMLElement & Control {        
        const el = document.createElement(control.tag);
        const options = {
            "wf-Workflow": "",
            "ctx": this.ctx 
        };

        const newEl = Object.assign(el, control, options);
        control.el = newEl;
        
        this.bind(newEl);
        this.bindCaption(newEl, control);
        control.controls?.forEach(this.addComponent.bind(this, newEl));
        
        return newEl;
    }

    private bind(newEl: HTMLElement & Control){
        if(!newEl.id || newEl.value === undefined)
            return;

        const newValue = this.ctx.model.getValue(newEl.id);

        if(newValue !== undefined)
            newEl.value = newValue;
        
        this.ctx.model.setValue(newEl.id, newEl.value);
        newEl.oninput = this.onInput.bind(this, newEl);
    }

    private bindCaption(newEl: HTMLElement, control: Control) {
        this.interpolate('caption', newEl, control);
        this.interpolate('textContent', newEl, control);
        this.interpolate('innerHTML', newEl, control);
    }

    private interpolate(prop: string, newEl: HTMLElement, control: Control) {
        if(!newEl[prop])
            return;

        newEl[prop] = this.ctx.model.getInterpolatedValue(control[prop]||newEl[prop]);
    }

    private addErrorLabel(newEl: HTMLElement & Control) {
        if(!newEl.validators)
            return;

        const errLabel = document.createElement("span");
        errLabel.setAttribute("wf-error", "error");

        newEl.parentNode.appendChild(errLabel);
    }
}