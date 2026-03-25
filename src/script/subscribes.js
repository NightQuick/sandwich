import { pubSub } from '@dp/pubSub.js';
import {
  menuSwitcherCallback,
  addToBasketCallback,
  openBuilderCallback,
  confirmOrderCallback,
  updateLocalStorageCallback
} from '@callbacks';
export function subscribe() {
  pubSub.subscribe('addToBasket', addToBasketCallback);

  pubSub.subscribe('menuType', menuSwitcherCallback);

  pubSub.subscribe('openBuilder', openBuilderCallback);

  pubSub.subscribe('confirmOrder', confirmOrderCallback);
  pubSub.subscribe('updateBasket', updateLocalStorageCallback);
}
