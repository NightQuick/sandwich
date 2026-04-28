import { subscribe } from '@script/subscribes';
import { renderIngredientSwitcher } from '@elements/ingredientSwitcher';
import { setWidth } from '@elements/basketButton';
import { createApp } from 'vue';
import table from '@components/table.vue';
import Menu from '@/components/menu.vue';
import Order from '@/components/order.vue';
setWidth();
subscribe();
const app = createApp(Menu);
app.mount('#menu-wrapper');
createApp(table).mount('#menu-switcher');
createApp(Order).mount('#order-app');
renderIngredientSwitcher();

const firstMenu = document.getElementById('menu-switcher-pizza-button')!;
firstMenu.click();
