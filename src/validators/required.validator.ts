import { Context } from '../model/context.model';
import { Validator } from './validator';
import { Control } from '../model/control.model';

export interface RequiredValidatorConfig {
    name: string;
    message: string;
}

export class RequiredValidator extends Validator {
    validate(context: Context, control: Control, config: RequiredValidatorConfig): boolean {
        const value = context.model.getValue(control.id);
        const isEmpty = value === null || value === undefined || value.length === 0;
        super.setError(control, isEmpty, config.message);
              
        return !isEmpty;
    }
}