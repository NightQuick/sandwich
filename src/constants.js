import { PubSub } from '@script/pubSub.js';

//basket.js
export const basket = document.getElementById('basket-content');
export const basketPrice = document.getElementById('order-status');

//menuSwicher.js
export const table = document.getElementById('menu-swicher');

//pubSub.js
export const pubSub = new PubSub();

//counter.js
export const counterWrapper = document.createElement('div');
export const buttonMinus = document.createElement('button');
export const buttonMinusContent = document.createElement('span');
export const input = document.createElement('input');
export const buttonPlus = document.createElement('button');
export const buttonPlusContent = document.createElement('span');

//modal.js
export const settings = {
  size: {
    name: 'Размер',
    object: 'sizes',
    title: 'Выберите размер сендвича'
  },
  bread: {
    name: 'Хлеб',
    object: 'breads',
    title: 'Хлеб для сендвича на выбор'
  },
  vegetable: {
    name: 'Овощи',
    object: 'vegetables',
    title: 'Дополнительные овощи бесплатно',
    multiple: true
  },
  sauce: {
    name: 'Соус',
    object: 'sauces',
    title: 'Выберите 3 бесплатных соуса по вкусу',
    multiple: true
  },
  filling: {
    name: 'Начинка',
    object: 'fillings',
    title: 'Добавьте начинку по вкусу',
    multiple: true
  },
  finish: {
    name: 'Готово!',
    object: 'ready',
    title: 'Проверьте и добавьте в корзину'
  }
};
