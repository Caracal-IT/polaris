import { Validator } from './validator';
export class RegexValidator extends Validator {
    validate(context, control, config) {
        const value = context.model.getValue(control.id);
        const regex = new RegExp(config.expression, 'g');
        const result = regex.exec(value);
        const isValid = result ? true : false;
        super.setError(control, !isValid, config.message);
        return isValid;
    }
}
