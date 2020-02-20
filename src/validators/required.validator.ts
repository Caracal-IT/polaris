import { Context } from '../model/Context.model';
import { Validator } from './validator';
import { Control } from '../model/control.model';

export interface RequiredValidatorConfig {
    name: string;
    message: string;
}

export class RequiredValidator extends Validator {
    validate(context: Context, control: Control, config: RequiredValidatorConfig): boolean {
        const value = context.model.getValue(control.id);
        
        control.error = false;
        delete control.errorMessage;

        if (value === null || value === undefined || value.length === 0) {            
            control.error = true;
            control.errorMessage = config.message;
        }

        if(control.el) {
            control.el.setAttribute("error", control.error ? "true" : "false");
            control.el.setAttribute("errorMessage", control.errorMessage);
        }

        if(control.el.nextSibling["attributes"]["wf-error"])
            control.el.nextSibling.textContent = control.errorMessage;

              
        return !control.error;
    }
}