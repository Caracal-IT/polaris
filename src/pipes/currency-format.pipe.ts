export function currencyFormat(value: any, [locale, currency]) {
    var formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      });
      
    return formatter.format(+value);
}