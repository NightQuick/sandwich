import { setWidth } from '@elements/basketButton';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/components/App.vue';

setWidth();

createApp(App).use(createPinia()).mount('#app');
