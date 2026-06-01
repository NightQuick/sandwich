import { setWidth } from '@elements/basketButton';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/components/App.vue';

setWidth();

const pinia = createPinia();

createApp(App).use(pinia).mount('#app');
