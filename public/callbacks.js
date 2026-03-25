import { Menu } from '@elements/menu.js';
import { SandwichBuilder } from '@elements/modal.js';
import { store } from '@dp/store.js';
import { basket } from '@elements/basket.js';
import { renderOrder } from '@ui/order.js';
import { ordersApi } from './api';

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
  ordersApi.create(data.data);
  renderOrder(data.data);
};
export const updateLocalStorageCallback = (data) => {
  localStorage.setItem('basket', JSON.stringify(data.data));
};
