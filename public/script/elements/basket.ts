import { pubSub } from '@dp/pubSub';
import { createApp, ref, Ref, watch } from 'vue';
import basketComp from '@components/basket.vue';

interface Order {
  description: string;
  image: string;
  name: string;
  price: number;
  value: number;
}
export class Basket {
  orders: Ref<Order[]>;
  totalPrice: Ref<number>;
  constructor() {
    this.orders = ref([]);
    this.totalPrice = ref(0);
  }

  addProduct(name: string, value: number, price: number, image: string = '', description: string = '') {
    const lineToChange: { name: string; price: number } = { name, price };
    for (let i = 0; i <= this.orders.value.length; i++) {
      let check = true;
      if (this.orders.value.length === 0) {
        check = false;
      }
      if (this.orders.value[i]) {
        for (const elem in this.orders.value[i]) {
          if (!(elem == 'image' || elem == 'description' || elem == 'value'))
            if (
              !(this.orders.value[i][elem as keyof Order] == lineToChange[elem as keyof typeof lineToChange])
            ) {
              check = false;
            }
        }
      } else check = false;
      if (check) {
        this.totalPrice.value += +value * price;
        this.orders.value[i].value = +this.orders.value[i].value + +value;
        i = this.orders.value.length;
      }
      if (!check && i == this.orders.value.length) {
        this.orders.value.push({ name, price, value, image, description });

        this.totalPrice.value += +value * price;
        i = this.orders.value.length;
      }
    }
  }

  changeValue(name: string, price: number, value: string, newValue: number) {
    const lineToChange = { name, price, value };
    for (let i = 0; i <= this.orders.value.length; i++) {
      let check = true;
      for (const elem in this.orders.value[i]) {
        if (!(elem == 'image' || elem == 'description'))
          if (
            !(this.orders.value[i][elem as keyof Order] == lineToChange[elem as keyof typeof lineToChange])
          ) {
            check = false;
          }
      }
      if (check) {
        this.totalPrice.value -= +value * price;
        this.totalPrice.value += +newValue * price;
        this.orders.value[i].value = newValue;
        i = this.orders.value.length;
      }
    }
  }

  setData(data: { orders: Order[]; totalPrice: number }) {
    this.orders.value = data.orders;
    this.totalPrice.value = data.totalPrice;
  }
  getData() {
    return {
      orders: this.orders.value,
      totalPrice: this.totalPrice.value
    };
  }

  clearBasket() {
    this.orders.value = [];
    this.totalPrice.value = 0;
  }
}
export let basket = new Basket();
if (localStorage.basket) {
  const data = JSON.parse(localStorage.getItem('basket')!);
  basket.setData(data);
}
console.log(basket.totalPrice.value);

createApp(basketComp).mount('#basket-app');

const btn = document.querySelector('.place-an-order')!;
btn.addEventListener('click', () => {
  if (basket.orders.value.length === 0) return;
  pubSub.publish('openOrder', { message: 'User confirm order', data: basket.orders.value });
});
