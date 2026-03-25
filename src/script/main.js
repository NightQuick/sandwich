import { renderSwitcherTable } from '@elements/table.js';
import { subscribe } from '@script/subscribes.js';
import { renderIngredientSwitcher } from '@elements/ingredientSwitcher.js';
import { setWidth } from '@elements/basketButton.js';

setWidth();

renderSwitcherTable();
renderIngredientSwitcher();
subscribe();

document.getElementById('menu-switcher-pizza-button').click();
