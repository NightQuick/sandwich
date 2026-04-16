import { createApp, ref } from 'vue';

export const globalValue = ref('text');
export const changeGlobalValue = (newValue: string) => {
  globalValue.value = newValue;
};

export const app = createApp({
  setup() {
    return {
      value: globalValue,
      changeValue: changeGlobalValue
    };
  }
});

app.mount('#app');
