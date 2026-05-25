import { subscribe } from '@script/subscribes';
import { setWidth } from '@elements/basketButton';
import { createApp } from 'vue';
import Table from '@components/table.vue';
import Menu from '@/components/menu.vue';
import Order from '@/components/order.vue';
import { createPinia } from 'pinia';
import SandwichBuilder from '@/components/sandwichBuilder.vue';

setWidth();
subscribe();

const pinia = createPinia();

const app = createApp(Menu);
const table = createApp(Table);
const order = createApp(Order);
const sandwichBuilder = createApp(SandwichBuilder);

// app.use(pinia);
// table.use(pinia);
sandwichBuilder.use(pinia);
// order.use(pinia);

app.mount('#menu-wrapper');
table.mount('#menu-switcher');
order.mount('#order-app');
sandwichBuilder.mount('#modal-app');

const firstMenu = document.getElementById('menu-switcher-pizza-button')!;
firstMenu.click();
