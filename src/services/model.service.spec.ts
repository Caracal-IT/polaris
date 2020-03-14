import { ModelService } from "./model.service";
import { ConfigService } from "./config.service";

describe('services/validator-service', () => {
    let config: ConfigService;

    beforeEach(() => {
        config = new ConfigService();  
        config.addSetting('[NAME]', 'Kate');
    });

    it('builds', () => {
        expect(new ModelService(null)).toBeTruthy();
    });

    it('should interpolate values', () => {
        const model = new ModelService(config);
        model.setValue('banking.deposit', '300');

        const result = model.getInterpolatedValue("I owe {{[NAME]}} {{banking.deposit|currencyFormat|en-US|USD}}");

        expect(result).toBe('I owe Kate $300.00');
    });
});