import { pubSub } from '@dp/pubSub';
import {
  addToBasketCallback,
  openBuilderCallback,
  confirmOrderCallback,
  updateLocalStorageCallback,
  openOrderCallback,
  updateBasketValueCallback
} from '@callbacks';
export function subscribe() {
  pubSub.subscribe('addToBasket', addToBasketCallback);

  pubSub.subscribe('openBuilder', openBuilderCallback);

  pubSub.subscribe('confirmOrder', confirmOrderCallback);

  pubSub.subscribe('updateBasket', updateLocalStorageCallback);

  pubSub.subscribe('openOrder', openOrderCallback);

  pubSub.subscribe('updateBasketValue', updateBasketValueCallback);
}
