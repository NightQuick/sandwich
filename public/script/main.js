import { renderSwitcherTable } from '@elements/table.js';
import { subscribe } from '@script/subscribes.js';
import { renderIngredientSwitcher } from '@elements/ingredientSwitcher.js';
import { setWidth } from '@elements/basketButton.js';
import { dataApi } from '../api';

setWidth();

renderSwitcherTable();
renderIngredientSwitcher();
subscribe();

document.getElementById('menu-switcher-pizza-button').click();
