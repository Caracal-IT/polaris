import { Context } from "../model/context.model";
import { Control } from "../model/control.model";
import { Message } from "../model/message.model";
import { RegexValidatorConfig, RegexValidator } from "./regex.validator";
import { ModelService } from "../services/model.service";

describe('validators/regex-validator', () => {
    let context: Context;
    let error: string;
    let ctrl: Control;
    let config: RegexValidatorConfig;
    let message: Message;

    beforeEach(() => {
        message = null;
        config = {name: 'regex', expression: '^\\d+$',  message:'Invalid Regex'};
        ctrl = {tag: 'control', id: 'user.firstName', ctx:context, error: false};
        
        const control: any = ctrl;
        control.el = {
            nextSibling: {
                attributes: {
                    'wf-error': null
                }
            },
            setAttribute: (key: string, val: string) => error = `${key}-${val}`
        }
        
        context = {
            page: {
                controls: [],
                sendMessage: (msg) => message = msg
            },
            http: null,
            model: new ModelService(null),
            wf: null,
            config: null,
            validator: null
        };  
    });
    
    it('builds', () => {
        expect(new RegexValidator('regex')).toBeTruthy();
    }); 

    it('should have a name', () => {
        const validator = new RegexValidator('regex');

        expect(validator.name).toBe('regex');
    });

    it('should return false if control has an empty value', () => {
        const validator = new RegexValidator('regex');

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeFalsy();
        expect(error).toBe('errorMessage-Invalid Regex');
    });

    it('should return false if control has an invalid value', () => {
        const validator = new RegexValidator('regex');
        context.model.setValue(ctrl.id, "3A");

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeFalsy();
        expect(message).not.toBe(null);
        expect(error).toBe('errorMessage-Invalid Regex');
    });
    it('should return true if control has a valid value', () => {
        const validator = new RegexValidator('required');
        context.model.setValue(ctrl.id, "3");

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeTruthy();
        expect(error).toBe('errorMessage-null');
    });
});