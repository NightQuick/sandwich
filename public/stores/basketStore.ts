import { Order } from '@/constants';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBasketStore = defineStore('basket', {
  state: () => {
    return {
      orders: [] as Order[],
      orderBoxVisible: false
    };
  },
  getters: {
    totalPrice: (state) => {
      let total = 0;
      if (state.orders.length > 0) {
        state.orders.forEach((order) => {
          total += order.price * order.value;
        });
        return total;
      } else return 0;
    }
  },
  actions: {
    addProduct(name: string, value: number, price: number, image: string = '', description: string = '') {
      const lineToChange: { name: string; price: number } = { name, price };
      for (let i = 0; i <= this.orders.length; i++) {
        let check = true;
        if (this.orders.length === 0) {
          check = false;
        }
        if (this.orders[i]) {
          for (const elem in this.orders[i]) {
            if (!(elem == 'image' || elem == 'description' || elem == 'value'))
              if (!(this.orders[i][elem as keyof Order] == lineToChange[elem as keyof typeof lineToChange])) {
                check = false;
              }
          }
        } else check = false;
        if (check) {
          this.orders[i].value = +this.orders[i].value + +value;
          i = this.orders.length;
        }
        if (!check && i == this.orders.length) {
          this.orders.push({ name, price, value, image, description });
          i = this.orders.length;
        }
      }
    },

    removeProduct(indexToRemove: number) {
      this.orders.splice(indexToRemove, 1);
    },

    changeValue(name: string, price: number, value: string, newValue: number) {
      const lineToChange = { name, price, value };
      for (let i = 0; i <= this.orders.length; i++) {
        let check = true;
        for (const elem in this.orders[i]) {
          if (!(elem == 'image' || elem == 'description'))
            if (!(this.orders[i][elem as keyof Order] == lineToChange[elem as keyof typeof lineToChange])) {
              check = false;
            }
        }
        if (check) {
          this.orders[i].value = newValue;
          i = this.orders.length;
        }
      }
    },

    setData() {
      if (localStorage.getItem('basket')) {
        this.orders = JSON.parse(localStorage.getItem('basket') as string).orders;
      }
      this.$subscribe(
        () => {
          localStorage.setItem('basket', JSON.stringify({ orders: this.orders }));
        },
        { deep: true }
      );
    },

    getData() {
      return {
        orders: this.orders,
        totalPrice: this.totalPrice
      };
    },

    clearBasket() {
      this.orders = [];
    }
  },
  hydrate(state) {
    const saved = localStorage.getItem('basket');
    if (saved) {
      state.orders = JSON.parse(saved);
    }
  }
});
