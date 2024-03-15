import {el, setChildren} from 'redom';

const h1 = el('h1', 'Каталог товаров');

setChildren(window.document.body, h1);