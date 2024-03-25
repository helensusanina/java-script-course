// dom.js
import { el, mount } from 'redom';

export function createDOMTree() {
    const paymentForm = el('form#paymentForm', [
        el('input#cardNumber', { type: 'text', placeholder: 'Номер карты', required: true }),
        el('input#expirationDate', { type: 'text', placeholder: 'Действительна до (ММ/ГГ)', required: true }),
        el('input#cvc', { type: 'text', placeholder: 'CVC/CVV', required: true }),
        el('input#email', { type: 'email', placeholder: 'Email', required: true }),
        el('button#payButton', { type: 'submit', disabled: true }, 'Оплатить')
    ]);

    mount(document.body, paymentForm);
    return paymentForm;
}
