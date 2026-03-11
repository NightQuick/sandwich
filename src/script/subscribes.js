import { pubSub } from '@script/pubSub.js';
import { menuSwitcherCallback, addToBasketCallback, openBuilderCallback } from '@callback';
export function subscribe() {
  pubSub.subscribe('addToBasket', addToBasketCallback);

  pubSub.subscribe('menuType', menuSwitcherCallback);

  pubSub.subscribe('openBuilder', openBuilderCallback);
}
