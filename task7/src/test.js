
import { validateCardNumber, validateCVV , validateExpirationDate} from './validation';
import { createDOMTree } from './dom';

describe('Card Number Validation', () => {
    test('correct card number', () => {
        expect(validateCardNumber('4111111111111111')).toBe(true);
    });

    test('does not pass a string characters', () => {
        expect(validateCardNumber('abc123')).toBe(false);
        expect(validateCardNumber('1234-5678-9012-3456')).toBe(false);
    });
});

describe('CVV Validation', () => {
    test('valid CVV', () => {
        expect(validateCVV('123')).toBe(true);
    });

    test('invalid CVV', () => {
        expect(validateCVV('abc')).toBe(false);
        expect(validateCVV('35')).toBe(false);
        expect(validateCVV('124555')).toBe(false);
    });
});

describe('DOM Tree Creation', () => {
    test('returns DOM element with four input fields', () => {
        const element = createDOMTree();
        const inputFields = element.querySelectorAll('input');
        expect(inputFields.length).toBe(4);
    });
});
describe('Card Number Validation', () => {
    test('does not pass an empty string', () => {
        expect(validateCardNumber('')).toBe(false);
    });

    test('does not pass a string with less than 16 digits', () => {
        expect(validateCardNumber('41111111111111')).toBe(false);
    });

    test('does not pass a string with more than 16 digits', () => {
        expect(validateCardNumber('41111111111111111')).toBe(false);
    });
});

describe('Expiration Date Validation', () => {
    test(' valid expiration date', () => {
        expect(validateExpirationDate('11/25')).toBe(true);
    });

    test('does not pass an invalid expiration date', () => {
        expect(validateExpirationDate('13/25')).toBe(false); 
        expect(validateExpirationDate('12/99')).toBe(false); 
        expect(validateExpirationDate('12/22')).toBe(false); 
    });
});

