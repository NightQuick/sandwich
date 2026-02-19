import { Menu } from './menu.js';
import { pubSub } from './pubSub.js';
//Создание эвентов для таблицы выбора категорий
let loadedMenus = {};
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

pubSub.subscribe('menuType', (data) => {
  if (!loadedMenus[data.category]) {
    console.log('Чтение JSON');
    let menu = new Menu(data.category);
    loadedMenus[data.category] = menu;
  }
  loadedMenus[data.category].render();
});

//При запуске страницы открывается меню с пиццей
document.getElementById('menu-swicher-pizza-button').click();
