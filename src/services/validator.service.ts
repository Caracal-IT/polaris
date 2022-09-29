import { Control } from './../model/control.model';
import { Validator } from "../validators/validator";
import { RequiredValidator } from "../validators/required.validator";
import { Context } from "../model/context.model";
import { RegexValidator } from '../validators/regex.validator';
import { RangeValidator } from '../validators/range.validator';

export class ValidatorService {
    private validators: Validator[] = [
        new RequiredValidator("required"),
        new RegexValidator("regex"),
        new RangeValidator("range")
    ];
    
    validate(ctx: Context): boolean {                                 
        if(ctx.page === undefined || ctx.page === null || ctx.page.controls === undefined || ctx.page.controls === null)          
            return true;
        
        let isValid = true;

        for(const ctrl of ctx.page.controls) 
            isValid = this.validateControl(ctx, ctrl) && isValid;
       
        return isValid;
    }  

    addValidator(validator: Validator) {
        const val = this.validators.find(v => v.name === validator.name);

        if(!val)
            this.validators.push(validator);
    }
    
    private validateControl(ctx: Context, control: Control): boolean {         
        if(control === undefined || control === null)
            return true;

        let isValid = true;
            
        for(const index in control.controls)
            isValid =  this.validateControl(ctx, control.controls[index]) && isValid;
       
        if(control.validators !== null && control.validators !== undefined && control.validators.length > 0) {
            for(const config of control.validators) {                
                const validator = this.validators.find(v => v.name === config.name);

                if(!validator)
                    continue;
                
                if(!validator.validate(ctx, control, config)) {                
                    isValid =  false;    
                    this.sendErrorMsg(ctx, validator, control);                    
                    break;
                }
            }            
        }
            
        return isValid;
    }

    private sendErrorMsg(ctx: Context, validator: Validator, control: Control) {
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