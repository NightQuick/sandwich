import { Menu } from '@elements/menu';
import { SandwichBuilder } from '@elements/modal';
import { store } from '@dp/store';
import { basket } from '@elements/basket';
import { ordersApi } from './api';
import { order, Position } from '@ui/order';
import { CardData } from '@elements/card';

interface PubSubEvent<T> {
  message: string;
  data: T;
}

let loadedMenus: { [key: string]: Menu } = {};

export const menuSwitcherCallback = (data: PubSubEvent<{ category: string }>) => {
  if (!loadedMenus[data.data.category]) {
    let menu = new Menu(data.data.category);
    loadedMenus[data.data.category] = menu;
  }
  loadedMenus[data.data.category].render();
};

export const addToBasketCallback = (
  data: PubSubEvent<{
    name: string;
    value: number;
    price: number;
    image: string;
    description: string;
  }>
) => {
  basket.addProduct(data.data.name, data.data.value, data.data.price, data.data.image, data.data.description);
};

export const openBuilderCallback = async (data: PubSubEvent<CardData>) => {
  await store.initSandwichConfig(data.data);
  await store.loadIngredients();
  const builder = new SandwichBuilder();
  builder.openBuilder();
};

export const openOrderCallback = (data: PubSubEvent<Position[]>) => {
  order.positionList = data.data;
  order.renderOrderbox();
};

export const confirmOrderCallback = (data: PubSubEvent<Position[]>) => {
  data.data.forEach((element) => {
    delete (element as Partial<Position>).image;
    delete (element as Partial<Position>).description;
  });
  ordersApi.create(data.data);
  basket.clearBasket();
};

export const updateBasketValueCallback = (data: PubSubEvent<[string, number, string, number]>) => {
  basket.changeValue(data.data[0], data.data[1], data.data[2], data.data[3]);
};

export const removeBasketPositionCallback = (data: PubSubEvent<[string, number, string]>) => {
  basket.removeElement(data.data[0], data.data[1], data.data[2]);
};

export const updateLocalStorageCallback = (data: PubSubEvent<unknown>) => {
  localStorage.setItem('basket', JSON.stringify(data.data));
};
