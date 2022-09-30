import { RequiredValidator, RequiredValidatorConfig } from './required.validator';
import { Context } from '../model/Context.model';
import { Message } from '../model/message.model';
import { Control } from '../model/control.model';
import { ModelService } from '../services/model.service';

describe('validators/required-validator', () => {
    let context: Context;
    let error: string;
    let ctrl: Control;
    let config: RequiredValidatorConfig;
    let message: Message;

    beforeEach(() => {
        message = null;
        config = {name: 'required', message:'Required control'};
        ctrl = {tag: 'control', id: 'user.firstName', ctx:context, error: false, el: null};
        
        ctrl = Object.assign(ctrl, {el : {
            nextSibling: {
                attributes: {
                    'wf-error': null
                }
            },
            setAttribute: (key: string, val: string) => error = `${key}-${val}`
        }});

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
        expect(new RequiredValidator('required')).toBeTruthy();
    }); 

    it('should have a name', () => {
        const validator = new RequiredValidator('required');

        expect(validator.name).toBe('required');
    });

    it('should return false if control has no value', () => {
        const validator = new RequiredValidator('required');

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeFalsy();
        expect(message).toBe(null);
        expect(error).toBe('errorMessage-Required control');
    });


    it('should return true if control has a value', () => {
        const validator = new RequiredValidator('required');
        context.model.setValue(ctrl.id, "Mock Value");

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeTruthy();
        expect(error).toBe('errorMessage-null');
    });
});