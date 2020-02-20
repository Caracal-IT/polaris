import { Control } from './../model/control.model';
import { Validator } from "../validators/validator";
import { RequiredValidator } from "../validators/required.validator";
import { Context } from "../model/context.model";

export class ValidatorService {
    private validators: Array<Validator> = [
        new RequiredValidator("Required")
    ];
    
    constructor(private ctx: Context){}  
    
    validate(): boolean {        
        if(!this.ctx.page || !this.ctx.page.controls)          
            return true;
        
        let isValid = true;

        for(const ctrl of this.ctx.page.controls) 
            isValid = this.validateControl(ctrl) && isValid;
       
        return isValid;
    }  
    
    private validateControl(control: Control): boolean { 
        if(!control)
            return true;

        let isValid = true;
            
        for(const index in control.controls)
            isValid =  this.validateControl(control.controls[index]) && isValid;
       
        if(control.validators && control.validators.length > 0) {
            for(const config of control.validators) {
                const validator = this.validators.find(v => v.name === config.name);

                if(!validator)
                    continue;

                if(!validator.validate(this.ctx, control, config))                 
                    isValid =  false;                
            }            
        }
            
        return isValid;
    }
}