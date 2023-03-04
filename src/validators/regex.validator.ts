import { Context } from '../model/context.model';
import { Validator } from './validator';
import { Control } from '../model/control.model';

export interface RegexValidatorConfig {
    name: string;
    message: string;
    expression: string;
}

export class RegexValidator extends Validator {
    validate(context: Context, control: Control, config: RegexValidatorConfig): boolean {
        const value = context.model.getValue(control.id);
        const regex = new RegExp(config.expression, 'g');       
        const result = regex.exec(value);       
        const isValid = result != null ? true : false;

        super.setError(control, !isValid, config.message);
              
        return isValid;
    }
}