import { pubSub } from '@script/pubSub.js';
import {
  menuSwitcherCallback,
  addToBasketCallback,
  openBuilderCallback,
  confirmOrderCallback,
  updateLocalStorageCallback
} from '@callback';
export function subscribe() {
  pubSub.subscribe('addToBasket', addToBasketCallback);

  pubSub.subscribe('menuType', menuSwitcherCallback);

  pubSub.subscribe('openBuilder', openBuilderCallback);

  pubSub.subscribe('confirmOrder', confirmOrderCallback);
  pubSub.subscribe('updateBasket', updateLocalStorageCallback);
}
