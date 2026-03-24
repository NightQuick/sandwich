import { Menu } from '@script/menu.js';
import { SandwichBuilder } from '@script/modal.js';
import { store } from '@script/store.js';
import { basket } from '@script/basket.js';
import { renderOrder } from '@script/order.js';

let loadedMenus = {};
export const menuSwitcherCallback = (data) => {
  if (!loadedMenus[data.category]) {
    let menu = new Menu(data.category);
    loadedMenus[data.category] = menu;
  }
  loadedMenus[data.category].render();
};
export const addToBasketCallback = (data) => {
  basket.addProduct(data.name, data.value, data.price);
};

export const openBuilderCallback = async (data) => {
  await store.initSandwichConfig(data.data);
  await store.loadIngredients();
  const builder = new SandwichBuilder(store.getSandwichConfig());
  builder.openBuilder();
};
export const confirmOrderCallback = (data) => {
  renderOrder(data.data);
};
export const updateLocalStorageCallback = (data) => {
  localStorage.setItem('basket', JSON.stringify(data.data));
  console.log(JSON.parse(localStorage.getItem('basket')));
};
