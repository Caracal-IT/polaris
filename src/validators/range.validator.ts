import { Context } from '../model/Context.model';
import { Validator } from './validator';
import { Control } from '../model/control.model';

export interface RangeValidatorConfig {
    name: string;
    message: string;
}

export class RangeValidator extends Validator {
    validate(context: Context, control: Control, config: RangeValidatorConfig): boolean {
        const value = context.model.getValue(control.id);
        const isEmpty = value === null || value === undefined || value.length === 0;
        super.setError(control, isEmpty, config.message);
              
        return !isEmpty;
    }
}