export function currencyFormat(value: any, [locale, currency]) {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });
      
    return formatter.format(+value);
}