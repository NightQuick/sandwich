import { Menu } from '@script/menu.js';
import { addProduct } from '@script/basket.js';
import { SandwichBuilder } from '@script/modal.js';

let loadedMenus = {};
export const menuSwitcherCallback = (data) => {
  if (!loadedMenus[data.category]) {
    let menu = new Menu(data.category);
    loadedMenus[data.category] = menu;
  }
  loadedMenus[data.category].render();
};
export const addToBasketCallback = (data) => {
  addProduct(data.name, data.value, data.price);
};

export const openBuilderCallback = (data) => {
  const builder = new SandwichBuilder(data.data);
  builder.openBuilder();
};
