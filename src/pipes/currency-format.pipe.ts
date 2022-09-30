export function currencyFormat(value: number, [locale, currency]: [string, string]) {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });
      
    return formatter.format(+value);
}