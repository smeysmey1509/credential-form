export const formatCurrency = (
    amount: number = 0,
    currency: string = "USD",
    locale: string = "en-US"
) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
};