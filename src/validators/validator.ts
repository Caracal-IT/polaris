import { Context } from "../model/context.model";
import { Control } from "../model/control.model";

export abstract class Validator {
    constructor(public name: string) { }
    abstract validate(context: Context, control: Control, config: any): boolean;

    setError(control: Control, error: boolean, message?: string) {
        control.error = error;
        control.errorMessage = error ? message : null;

        if(control.el) {
            control.el.setAttribute("error", control.error ? "true" : "false");
            control.el.setAttribute("errorMessage", control.errorMessage);
        }

        if(control.el.nextSibling["attributes"]["wf-error"])
            control.el.nextSibling.textContent = control.errorMessage;
    }
}