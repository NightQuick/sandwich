import { useSandwichBuilderStore } from './stores/sandwichBuilderStore';
import { ordersApi } from './api';

import { CardData, Position } from '@constants';
import { useBasketStore } from './stores/basketStore';

interface PubSubEvent<T> {
  message: string;
  data: T;
}

export const addToBasketCallback = (
  data: PubSubEvent<{
    name: string;
    value: number;
    price: number;
    image: string;
    description: string;
  }>
) => {
  const basket = useBasketStore();
  basket.addProduct(data.data.name, data.data.value, data.data.price, data.data.image, data.data.description);
};

export const openBuilderCallback = async (data: PubSubEvent<CardData>) => {
  const store = useSandwichBuilderStore();
  await store.initSandwichConfig(data.data);
  await store.loadIngredients();
  store.visible = true;
};

export const confirmOrderCallback = (data: PubSubEvent<Position[]>) => {
  data.data.forEach((element) => {
    delete (element as Partial<Position>).image;
    delete (element as Partial<Position>).description;
  });
  ordersApi.create(data.data);
  const basket = useBasketStore();
  basket.clearBasket();
};

export const updateBasketValueCallback = (data: PubSubEvent<[string, number, string, number]>) => {
  const basket = useBasketStore();
  basket.changeValue(data.data[0], data.data[1], data.data[2], data.data[3]);
};

export const updateLocalStorageCallback = (data: PubSubEvent<unknown>) => {
  localStorage.setItem('basket', JSON.stringify(data.data));
};
