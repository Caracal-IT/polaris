import { currencyFormat } from "./currency-format.pipe";

describe('pipes/currency-format', () => {
    it('should format the currency', () => {
        const numberValue = 23.55;
        const locale = 'en-US';
        const currency = 'USD';

        const currencyString = currencyFormat(numberValue, [locale, currency]);
        expect(currencyString).toBe(`$${numberValue}`);
    }); 
});