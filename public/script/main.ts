import { renderSwitcherTable } from '@elements/table';
import { subscribe } from '@script/subscribes';
import { renderIngredientSwitcher } from '@elements/ingredientSwitcher';
import { setWidth } from '@elements/basketButton';

setWidth();

renderSwitcherTable();
renderIngredientSwitcher();
subscribe();

const firstMenu = document.getElementById('menu-switcher-pizza-button')!;
firstMenu.click();
