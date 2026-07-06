import { ordersApi } from '@api';
import { Order, Position, Component } from '@constants';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBasketStore = defineStore('basket', {
  state: () => {
    return {
      orders: [] as Order[],
      orderBoxVisible: false,
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
    },
  },
  actions: {
    addProduct(
      name: string,
      value: number,
      price: number,
      image: string = '',
      description: string = '',
      components?: Component,
    ) {
      const lineToChange: { name: string; price: number } = { name, price };
      for (let i = 0; i <= this.orders.length; i++) {
        let check = true;

        if (this.orders.length === 0) {
          check = false;
        }
        if (this.orders[i]) {
          for (const elem in this.orders[i]) {
            if (!(
              elem == 'image' ||
              elem == 'description' ||
              elem == 'value' ||
              elem == 'components'
            ))
              if (
                !(
                  this.orders[i][elem as keyof Order] ==
                  lineToChange[elem as keyof typeof lineToChange]
                )
              ) {
                check = false;
              }
          }
          if (components && this.orders[i].components) {
            for (const elem in this.orders[i].components) {
              if (
                this.orders[i].components![elem as keyof Component].length > 0 ||
                components[elem as keyof Component].length > 0
              ) {
                if (
                  !(
                    this.orders[i].components![elem as keyof Component] ==
                    components[elem as keyof Component]
                  )
                ) {
                  check = false;
                }
              }
            }
          }
        } else check = false;
        if (check) {
          this.orders[i].value = +this.orders[i].value + +value;
          i = this.orders.length;
        }
        if (!check && i == this.orders.length) {
          if (components) {
            this.orders.push({ name, price, value, image, description, components });
          } else this.orders.push({ name, price, value, image, description });
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
            if (
              !(
                this.orders[i][elem as keyof Order] ==
                lineToChange[elem as keyof typeof lineToChange]
              )
            ) {
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
        { deep: true },
      );
    },

    getData() {
      return {
        orders: this.orders,
        totalPrice: this.totalPrice,
      };
    },

    clearBasket() {
      this.orders = [];
    },

    sendOrder() {
      const data = JSON.parse(JSON.stringify(this.orders));
      if (Array.isArray(data)) {
        data.forEach((element) => {
          delete (element as Partial<Position>).image;
          delete (element as Partial<Position>).description;
        });
      }
      ordersApi.create(data);
      this.clearBasket();
    },
  },
});
