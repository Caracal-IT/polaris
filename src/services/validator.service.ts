import { Validator } from "../validators/validator";
import { RequiredValidator } from "../validators/required.validator";
import { Context } from "../model/context.model";

export class ValidatorService {
    static Validators: Array<Validator> = [
        new RequiredValidator("Required")
    ];

    constructor(private ctx: Context){}  
    
    validate(): boolean {
        console.dir(this.ctx.page);
        
        return true;
    }
}