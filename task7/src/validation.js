import validator from 'card-validator';

export function validateCardNumber(cardNumber) {
    return validator.number(cardNumber).isValid;
}

export function validateCVV(cvv) {
    return validator.cvv(cvv).isValid;
}
export function validateExpirationDate(expirationDate) {
    const month = parseInt(expirationDate.slice(0, 2));
    const year = parseInt(expirationDate.slice(3, 5));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < currentYear || year > currentYear + 20) {
        return false;
    }

    if (year === currentYear) {
        return month >= currentMonth;
    }

    return true;
}




