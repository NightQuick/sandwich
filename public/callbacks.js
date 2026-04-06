import { Menu } from '@elements/menu.js';
import { SandwichBuilder } from '@elements/modal.js';
import { store } from '@dp/store.js';
import { basket } from '@elements/basket.js';
import { ordersApi } from './api';
import { order } from '@ui/order';

let loadedMenus = {};
export const menuSwitcherCallback = (data) => {
  if (!loadedMenus[data.category]) {
    let menu = new Menu(data.category);
    loadedMenus[data.category] = menu;
  }
  loadedMenus[data.category].render();
};
export const addToBasketCallback = (data) => {
  basket.addProduct(data.name, data.value, data.price, data.image, data.description);
};

export const openBuilderCallback = async (data) => {
  await store.initSandwichConfig(data.data);
  await store.loadIngredients();
  const builder = new SandwichBuilder(store.getSandwichConfig());
  builder.openBuilder();
};

export const openOrderCallback = (data) => {
  order.positionList = data.data;
  order.renderOrderbox();
};

export const confirmOrderCallback = (data) => {
  data.data.forEach((element) => {
    delete element.image;
    delete element.description;
  });
  delete data.data[0].image;
  ordersApi.create(data.data);
  basket.clearBasket();
};
export const updateBasketValueCallback = (data) => {
  basket.changeValue(data.data[0], data.data[1], data.data[2], data.data[3]);
};
export const removeBasketPositionCallback = (data) => {
  basket.removeElement(data.data[0], data.data[1], data.data[2]);
};

export const updateLocalStorageCallback = (data) => {
  localStorage.setItem('basket', JSON.stringify(data.data));
};
