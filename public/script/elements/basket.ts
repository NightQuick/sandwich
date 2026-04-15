import { pubSub } from '@dp/pubSub';

interface Order {
  description: string;
  image: string;
  name: string;
  price: number;
  value: number;
}
export class Basket {
  orderEvent: boolean;
  orders: Order[];
  totalPrice: number;
  basket: Element;
  template: HTMLTemplateElement;
  basketProducts: Element;
  listOrders: Node;
  constructor() {
    this.orderEvent = false;
    this.orders = [];
    this.totalPrice = 0;
    this.basket = <HTMLElement>document.getElementById('basket-content');
    this.template = document.getElementById('basket-content-template') as HTMLTemplateElement;
    this.basketProducts = <HTMLElement>document.getElementById('basket-products');
    this.listOrders = this.basketProducts.childNodes[1];
  }

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
        this.totalPrice += +value * price;
        this.orders[i].value = +this.orders[i].value + +value;
        i = this.orders.length;
      }
      if (!check && i == this.orders.length) {
        this.orders.push({ name, price, value, image, description });

        this.totalPrice += +value * price;
        i = this.orders.length;
      }
    }

    this.renderBasket();
  }
  renderBasket() {
    this.basket.innerHTML = '';
    this.orders.forEach((element) => {
      const newContent = this.template.content.cloneNode(true) as DocumentFragment;
      const td = newContent.querySelectorAll('td');
      td[0].textContent = element.name;
      td[1].textContent = element.price + ' р.';
      td[2].textContent = element.value.toString();
      td[3].textContent = 'x';
      td[3].classList.add('remove-from-basket-button');

      this.basket.appendChild(newContent);

      const removeButtons = document.querySelectorAll<HTMLElement>('.remove-from-basket-button');
      removeButtons.forEach((button) => {
        if (!button.onclick) {
          button.onclick = () => {
            button.parentElement?.remove();
            this.removeElement(element.name, element.price, element.value.toString());
          };
        }
      });
    });
    const basketPrice = document.getElementById('order-status');
    const orderButton = document.getElementsByClassName('place-an-order');
    basketPrice!.textContent = `Итого: ${this.totalPrice} руб.`;
    if (this.orders.length === 0) {
      orderButton[0].classList.remove('place-an-order-active');
      if (this.orderEvent) {
        orderButton[0].removeEventListener('click', this.createOrderCallback);
        this.orderEvent = false;
      }
    } else {
      if (!orderButton[0].classList.contains('place-an-order-active')) {
        orderButton[0].classList.add('place-an-order-active');
        if (!this.orderEvent) {
          orderButton[0].addEventListener('click', this.createOrderCallback);
          this.orderEvent = true;
        }
      }
    }
    pubSub.publish('updateBasket', { message: 'Basket was updated', data: this.getData() });
  }
  removeElement(name: string, price: number, value: string) {
    const lineToRemove = { name, price, value };
    for (let i = 0; i <= this.orders.length; i++) {
      let check = true;
      for (const elem in this.orders[i]) {
        if (!(elem == 'image' || elem == 'description'))
          if (!(this.orders[i][elem as keyof Order] == lineToRemove[elem as keyof typeof lineToRemove])) {
            check = false;
          }
      }
      if (check) {
        this.orders.splice(i, 1);
        i = this.orders.length;
        this.totalPrice -= +value * price;
        this.renderBasket();
      }
    }
  }
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
        this.totalPrice -= +value * price;
        this.totalPrice += +newValue * price;
        this.orders[i].value = newValue;
        i = this.orders.length;
        this.renderBasket();
      }
    }
  }

  setData(data: { orders: Order[]; totalPrice: number }) {
    this.orders = data.orders;
    this.totalPrice = data.totalPrice;
  }
  getData() {
    return {
      orders: this.orders,
      totalPrice: this.totalPrice
    };
  }
  createOrderCallback = () => {
    pubSub.publish('openOrder', { message: 'User confirm order', data: this.orders });
  };
  clearBasket() {
    this.orders = [];
    this.totalPrice = 0;
    this.basket.innerHTML = '';
    this.renderBasket();
  }
}
export let basket = new Basket();
if (localStorage.basket) {
  basket = new Basket();
  const data = JSON.parse(localStorage.getItem('basket')!);
  basket.setData(data);
  basket.renderBasket();
} else {
  basket = new Basket();
}
