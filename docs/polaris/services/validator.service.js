import { RequiredValidator } from "../validators/required.validator";
import { RegexValidator } from '../validators/regex.validator';
import { RangeValidator } from '../validators/range.validator';
export class ValidatorService {
    constructor() {
        this.validators = [
            new RequiredValidator("required"),
            new RegexValidator("regex"),
            new RangeValidator("range")
        ];
    }
    validate(ctx) {
        if (!ctx.page || !ctx.page.controls)
            return true;
        let isValid = true;
        for (const ctrl of ctx.page.controls)
            isValid = this.validateControl(ctx, ctrl) && isValid;
        return isValid;
    }
    addValidator(validator) {
        const val = this.validators.find(v => v.name === validator.name);
        if (!val)
            this.validators.push(validator);
    }
    validateControl(ctx, control) {
        if (!control)
            return true;
        let isValid = true;
        for (const index in control.controls)
            isValid = this.validateControl(ctx, control.controls[index]) && isValid;
        if (control.validators && control.validators.length > 0) {
            for (const config of control.validators) {
                const validator = this.validators.find(v => v.name === config.name);
                if (!validator)
                    continue;
                if (!validator.validate(ctx, control, config)) {
                    isValid = false;
                    this.sendErrorMsg(ctx, validator, control);
                    break;
                }
            }
        }
        return isValid;
    }
    sendErrorMsg(ctx, validator, control) {
        ctx.page.sendMessage({
            type: "VALIDATION_ERROR",
            description: control.errorMessage,
            metadata: {
                validator: validator.name,
                control: control.id
            }
        });
    }
}
