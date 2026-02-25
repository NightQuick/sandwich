import { pubSub } from '@script/pubSub.js';
import { menuSwitcherCallback, addToBasketCallback } from '@callback';
export function subscribe() {
  pubSub.subscribe('addToBasket', addToBasketCallback);

  pubSub.subscribe('menuType', menuSwitcherCallback);
}
