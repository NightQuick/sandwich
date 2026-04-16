import { pubSub } from '@dp/pubSub';
import { createApp, ref, Ref, watch } from 'vue';
import basketComp from '@components/basket.vue';
export const positionList = ref([{ name: 'adw', price: 100, value: 10 }]);

interface Order {
  description: string;
  image: string;
  name: string;
  price: number;
  value: number;
}
export class Basket {
  orderEvent: boolean;
  orders: Ref<Order[]>;
  totalPrice: Ref<number>;
  constructor() {
    this.orderEvent = false;
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
  // renderBasket() {
  //   this.basket.innerHTML = '';
  //   this.orders.value.forEach((element) => {
  //     const newContent = this.template.content.cloneNode(true) as DocumentFragment;
  //     const td = newContent.querySelectorAll('td');
  //     td[0].textContent = element.name;
  //     td[1].textContent = element.price + ' р.';
  //     td[2].textContent = element.value.toString();
  //     td[3].textContent = 'x';
  //     td[3].classList.add('remove-from-basket-button');

  //     this.basket.appendChild(newContent);

  //     const removeButtons = document.querySelectorAll<HTMLElement>('.remove-from-basket-button');
  //     removeButtons.forEach((button) => {
  //       if (!button.onclick) {
  //         button.onclick = () => {
  //           button.parentElement?.remove();
  //           this.removeElement(element.name, element.price, element.value.toString());
  //         };
  //       }
  //     });
  //   });
  //   const basketPrice = document.getElementById('order-status');
  //   const orderButton = document.getElementsByClassName('place-an-order');
  //   basketPrice!.textContent = `Итого: ${this.totalPrice.value} руб.`;
  //   if (this.orders.value.length === 0) {
  //     orderButton[0].classList.remove('place-an-order-active');
  //     if (this.orderEvent) {
  //       orderButton[0].removeEventListener('click', this.createOrderCallback);
  //       this.orderEvent = false;
  //     }
  //   } else {
  //     if (!orderButton[0].classList.contains('place-an-order-active')) {
  //       orderButton[0].classList.add('place-an-order-active');
  //       if (!this.orderEvent) {
  //         orderButton[0].addEventListener('click', this.createOrderCallback);
  //         this.orderEvent = true;
  //       }
  //     }
  //   }
  //   pubSub.publish('updateBasket', { message: 'Basket was updated', data: this.getData() });
  // }
  removeElement(price: number, value: number) {
    this.totalPrice.value -= price * value;
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
  createOrderCallback = () => {
    pubSub.publish('openOrder', { message: 'User confirm order', data: this.orders.value });
  };
  clearBasket() {
    this.orders.value = [];
    this.totalPrice.value = 0;
  }
}
export let basket = new Basket();
if (localStorage.basket) {
  basket = new Basket();
  const data = JSON.parse(localStorage.getItem('basket')!);
  basket.setData(data);
} else {
  basket = new Basket();
}

createApp(basketComp).mount('#basket-app');

const btn = document.querySelector('.place-an-order')!;
btn.addEventListener('click', () => {
  if (basket.orders.value.length === 0) return;
  basket.clearBasket();
});

watch(
  basket.orders,
  () => {
    const data = basket.getData();

    document.getElementById('total-price')!.textContent = String(data.totalPrice);

    if (data.orders.length > 0) {
      btn.classList.add('place-an-order-active');
    } else {
      btn.classList.remove('place-an-order-active');
    }

    pubSub.publish('updateBasket', { message: 'Basket was updated', data });
  },
  { deep: true }
);
