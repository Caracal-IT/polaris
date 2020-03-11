import { Validator } from './validator';
export class RequiredValidator extends Validator {
    validate(context, control, config) {
        const value = context.model.getValue(control.id);
        const isEmpty = value === null || value === undefined || value.length === 0;
        super.setError(control, isEmpty, config.message);
        return !isEmpty;
    }
}
