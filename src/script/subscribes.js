import { addProduct } from '@script/basket.js';
import { Menu } from '@script/menu.js';
import { pubSub } from '@constant';

pubSub.subscribe('addToBasket', (data) => {
  addProduct(data.name, data.value, data.price);
});

let loadedMenus = {};
pubSub.subscribe('menuType', (data) => {
  if (!loadedMenus[data.category]) {
    let menu = new Menu(data.category);
    loadedMenus[data.category] = menu;
  }
  loadedMenus[data.category].render();
});
