import { subscribe } from '@script/subscribes';
import { renderIngredientSwitcher } from '@elements/ingredientSwitcher';
import { setWidth } from '@elements/basketButton';
import { createApp } from 'vue';
import table from '@components/table.vue';
import Menu from '@/components/menu.vue';
setWidth();
subscribe();
const app = createApp(Menu);
app.mount('#menu-wrapper');
createApp(table).mount('#menu-switcher');
// renderSwitcherTable();
renderIngredientSwitcher();

const firstMenu = document.getElementById('menu-switcher-pizza-button')!;
firstMenu.click();
