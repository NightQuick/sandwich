import { pubSub } from '@script/pubSub.js';
//Создание эвентов для таблицы выбора категорий
let table = document.getElementById('menu-swicher');
table.firstElementChild.onclick = function (event) {
  if (event.target.nodeName != 'TD') return;

  for (let tr of table.firstElementChild.children) {
    tr.style.backgroundColor = 'white';
  }
  event.target.parentElement.style.backgroundColor = '#FFC000';

  let category = event.target.id.split('-')[2].split('&');
  pubSub.publish('menuType', { message: 'Пользователь нажал на один из элементов меню', category });
};

//При запуске страницы открывается меню с пиццей
document.getElementById('menu-swicher-pizza-button').click();
