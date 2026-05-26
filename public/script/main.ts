import { subscribe } from '@script/subscribes';
import { setWidth } from '@elements/basketButton';
import { createApp } from 'vue';
import Table from '@components/table.vue';
import Menu from '@/components/menu.vue';
import Order from '@/components/order.vue';
import { createPinia } from 'pinia';
import SandwichBuilder from '@/components/sandwichBuilder.vue';
import Basket from '@/components/basket.vue';

setWidth();
subscribe();

const pinia = createPinia();

const app = createApp(Menu);
const table = createApp(Table);
const order = createApp(Order);
const sandwichBuilder = createApp(SandwichBuilder);
const basket = createApp(Basket);

app.use(pinia);
// table.use(pinia);
sandwichBuilder.use(pinia);
// order.use(pinia);
basket.use(pinia);

app.mount('#menu-wrapper');
table.mount('#menu-switcher');
order.mount('#order-app');
sandwichBuilder.mount('#modal-app');
basket.mount('#basket-app');

const firstMenu = document.getElementById('menu-switcher-pizza-button')!;
firstMenu.click();
