import { renderSwitcherTable } from '@script/table.js';
import { subscribe } from '@script/subscribes.js';
import { renderIngredientSwitcher } from '@script/ingredientSwitcher.js';
import { setWidth } from '@script/adaptive.js';

setWidth();

renderSwitcherTable();
renderIngredientSwitcher();
subscribe();

document.getElementById('menu-switcher-pizza-button').click();
