import { Context } from '../model/context.model';
import { Message } from '../model/message.model';
import { Control } from '../model/control.model';
import { ModelService } from '../services/model.service';
import { RangeValidatorConfig, RangeValidator } from './range.validator';

describe('validators/range-validator', () => {
    let context: Context;
    let error: string;
    let ctrl: Control;
    let config: RangeValidatorConfig;
    let message: Message;


    beforeEach(() => {
        message = null;
        config = {name: 'range', min: 5, max: 9, message: 'Outside Range'};
        ctrl = {tag: 'control', id: 'user.age', ctx:context, error: false};
        
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
        expect(new RangeValidator('range')).toBeTruthy();
    }); 

    it('should have a name', () => {
        const validator = new RangeValidator('range');

        expect(validator.name).toBe('range');
    });

    it('should return false if control has no value', () => {
        const validator = new RangeValidator('range');

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeFalsy();
        expect(message).toBe(null);
        expect(error).toBe('errorMessage-Outside Range');
    });

    it('should return false if control has value less than min', () => {
        const validator = new RangeValidator('range');
        context.model.setValue(ctrl.id, config.min - 1);

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeFalsy();
        expect(error).toBe('errorMessage-Outside Range');
    });

    it('should return false if control has value more than max', () => {
        const validator = new RangeValidator('range');
        context.model.setValue(ctrl.id, config.max + 1);

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeFalsy();
        expect(error).toBe('errorMessage-Outside Range');
    });

    it('should return true if control has a value', () => {
        const validator = new RangeValidator('range');
        context.model.setValue(ctrl.id, config.min);

        const result = validator.validate(context, ctrl, config);

        expect(result).toBeTruthy();
        expect(error).toBe('errorMessage-null');
    });
});