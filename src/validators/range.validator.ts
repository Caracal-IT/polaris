import { Context } from '../model/context.model';
import { Validator } from './validator';
import { Control } from '../model/control.model';

export interface RangeValidatorConfig {
    name: string;
    message: string;
    min: number;
    max: number;
}

export class RangeValidator extends Validator {
    validate(context: Context, control: Control, config: RangeValidatorConfig): boolean {
        const value = +context.model.getValue(control.id);
        const isValid = value >= config.min && value <= config.max;

        super.setError(control, !isValid, config.message);
              
        return isValid;
    }
}