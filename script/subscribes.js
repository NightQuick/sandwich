import { addProduct } from '@script/basket.js';
import { Menu } from '@script/menu.js';
import { pubSub } from '@script/pubSub.js';

pubSub.subscribe('addToBasket', (data) => {
  console.log(data.message);
  addProduct(data.name, data.value, data.price);
});

let loadedMenus = {};
pubSub.subscribe('menuType', (data) => {
  console.log(data.message);
  if (!loadedMenus[data.category]) {
    console.log('Чтение JSON');
    let menu = new Menu(data.category);
    loadedMenus[data.category] = menu;
  }
  loadedMenus[data.category].render();
});
