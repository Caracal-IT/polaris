import { Validator } from './validator';
export class RangeValidator extends Validator {
    validate(context, control, config) {
        const value = +context.model.getValue(control.id);
        const isValid = value >= config.min && value <= config.max;
        super.setError(control, !isValid, config.message);
        return isValid;
    }
}
