import { el, mount } from 'redom';
import validator from 'card-validator';
import IMask from 'imask';
import visa from './assets/images/visa.png'
import mastercard from './assets/images/mastercard.png'
import mir from './assets/images/mir.png'
import { createDOMTree } from './dom';
import {validateCardNumber, validateCVV, validateExpirationDate} from "./validation";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

createDOMTree();

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

function getCardType(cardNumber) {
    const cardInfo = validator.number(cardNumber);
    return cardInfo.card ? cardInfo.card.type : null;
}

const cardLogos = {visa, mastercard, mir}

function setCardLogo(cardType) {
    const cardLogo = el('img', { src : cardLogos[cardType] , alt: "неверный путь", width: 55, height: 55 });
    mount(document.getElementById('cardLogoContainer'), cardLogo);
}

cardNumberInput.addEventListener('blur', () => {
    const cardNumber = cardNumberMask.unmaskedValue;
    const cardType = getCardType(cardNumber);

    if (!validator.number(cardNumber).isValid || !cardType) {
        cardNumberInput.classList.add('invalid');
    } else {
        cardNumberInput.classList.remove('invalid');
        setCardLogo(cardType);
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

    const validateFields = {
        cardNumber: validateCardNumber(cardNumber),
        expirationDate: validateExpirationDate(expirationDate),
        cvc: validateCVV(cvc),
        email: emailRegex.test(email)
    }
    payButton.disabled = Object.values(validateFields).includes(false);
}

[cardNumberInput, expirationDateInput, cvcInput, emailInput].forEach(input => {
    input.addEventListener('input', checkFormValidity);
})

