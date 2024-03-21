import { el, mount } from 'redom';
import validator from 'card-validator';
import IMask from 'imask';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const paymentForm = el('form#paymentForm', [
    el('input#cardNumber', { type: 'text', placeholder: 'Номер карты', required: true }),
    el('input#expirationDate', { type: 'text', placeholder: 'Действительна до (ММ/ГГ)', required: true }),
    el('input#cvc', { type: 'text', placeholder: 'CVC/CVV', required: true }),
    el('input#email', { type: 'email', placeholder: 'Email', required: true }),
    el('button#payButton', { type: 'submit', disabled: true }, 'Оплатить')
]);

mount(document.getElementById('paymentFormContainer'), paymentForm);

const cardNumberInput = document.getElementById('cardNumber');
const expirationDateInput = document.getElementById('expirationDate');
const cvcInput = document.getElementById('cvc');
const emailInput = document.getElementById('email');
const payButton = document.getElementById('payButton');

const cardNumberMask = IMask(cardNumberInput, {
    mask: '0000 0000 0000 0000',
    blocks: {
        4: { mask: '0000' },
        8: { mask: '0000' },
        12: { mask: '0000' }
    }
});

const expirationDateMask = IMask(expirationDateInput, {
    mask: '00/00',
    blocks: {
        2: {mask : '00'},
        4: {mask : '00'}
    }
});
const CVCMask = IMask(cvcInput, {
    mask : '000'
});

cardNumberInput.addEventListener('blur', () => {
    const cardNumber = cardNumberMask.unmaskedValue;
    if (!validator.number(cardNumber).isValid) {
        cardNumberInput.classList.add('invalid');
    } else {
        cardNumberInput.classList.remove('invalid');
    }
});

expirationDateInput.addEventListener('blur', () => {
    const expirationDate = expirationDateMask.unmaskedValue;
    const month = parseInt(expirationDate.slice(0,2));
    const year = parseInt(expirationDate.slice(2,4));
    const currentYear = new Date().getFullYear()% 100;
    const currentMonth = new Date().getMonth() + 1;

    if ((currentYear <= year|| (currentYear === year && month >= currentMonth)) && month <= 12) {
        expirationDateInput.classList.remove('invalid');
    } else {
        expirationDateInput.classList.add('invalid');
    }
});

cvcInput.addEventListener('blur', () => {
    if (!validator.cvv(cvcInput.value).isValid) {
        cvcInput.classList.add('invalid');
    } else {
        cvcInput.classList.remove('invalid');
    }
});

emailInput.addEventListener('blur', () => {
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('invalid');
    } else {
        emailInput.classList.remove('invalid');
    }
});

cvcInput.addEventListener('input', () => {
    cvcInput.classList.remove('invalid');
});

emailInput.addEventListener('input', () => {
    emailInput.classList.remove('invalid');
});

function checkFormValidity(qualifiedName, value) {
    const cardNumber = cardNumberMask.unmaskedValue;
    const expirationDate = expirationDateMask.unmaskedValue;
    const cvc = cvcInput.value;
    const email = emailInput.value;

    const isCardNumberValid = validator.number(cardNumber).isValid;
    const isExpirationDateValid = (expirationDate.length === 4) && (parseInt(expirationDate.slice(0, 2)) <= 12);
    const isCvcValid = validator.cvv(cvc).isValid;
    const isEmailValid = emailRegex.test(email);

    if (isCardNumberValid && isExpirationDateValid && isCvcValid && isEmailValid) {
        payButton.removeAttribute('disabled');
    } 
    else {
        payButton.setAttribute("disabled");
    }
}

cardNumberInput.addEventListener('input', checkFormValidity);
expirationDateInput.addEventListener('input', checkFormValidity);
cvcInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
