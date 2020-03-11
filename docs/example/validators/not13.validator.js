import {Validator} from '../../polaris/validators/validator.js';

export class Not13Validator extends Validator {
    validate(context, control, config) {
        const value = +context.model.getValue(control.id);
        const isValid = value !== 13;

        this.setError(control, !isValid, config.message);
              
        return isValid;
    }
}   