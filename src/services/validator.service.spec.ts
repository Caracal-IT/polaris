import { Context } from "../model/context.model";
import { Message } from "../model/message.model";
import { ValidatorService } from "./validator.service";
import { Validator } from "../validators/validator";
import { Control } from "../model/control.model";

describe('services/validator-service', () => {
    let context: Context;
    let message: Message;

    beforeEach(() => {
        message = null;
        
        const validator = new ValidatorService();
        validator.addValidator(new AlwaysTrueValidator('always-true'));
        validator.addValidator(new AlwaysFalseValidator('always-false'));


        context = {
            page: {
                controls: [],
                sendMessage: (msg) => message = msg
            },
            http: null,
            model: null,
            wf: null,
            config: null,
            validator: validator
        };  
    });

    it('builds', () => {
        expect(new ValidatorService()).toBeTruthy();
    });

    it('should return i the page hasn\'t any controls', () => {
        const validator = new ValidatorService();
        
        const result = validator.validate(context);

        expect(result).toBeTruthy();
    });

    it('should return true if all the controls is valid', () =>{
        context.page
               .controls
               .push({tag: "my-control", ctx: context, validators: [{name: 'always-true'}]});

        context.page
               .controls
               .push({tag: "my-control2", ctx: context, validators: [{name: 'always-true'}]});

        const result = context.validator.validate(context);
        expect(message).toBe(null);
        expect(result).toBeTruthy();
    });

    it('shoult return false if one controls is invalid', () =>{
        context.page
               .controls
               .push({tag: "my-control", ctx: context, validators: [{name: 'always-false'}]});

        context.page
               .controls
               .push({tag: "my-control2", ctx: context, validators: [{name: 'always-true'}]});

        const result = context.validator.validate(context);
        expect(result).toBeFalsy();
    });
    

    class AlwaysTrueValidator extends Validator{
        validate(_ctx: Context, _ctrl: Control): boolean {
            return true;
        }

    }

    class AlwaysFalseValidator extends Validator{
        validate(_ctx: Context, _ctrl: Control): boolean {
            return false;
        }

    }

});
