import { pubSub } from '@dp/pubSub.js';
export class Basket {
  constructor() {
    this.orderEvent = false;
    this.orders = [];
    this.totalPrice = 0;
    this.basket = document.getElementById('basket-content');
    this.template = document.getElementById('basket-content-template');
    this.listOrders = document.getElementById('basket-products').childNodes[1];
  }

  addProduct(name, value, price) {
    this.orders.push({ name, price, value });

    this.totalPrice += +value * price;

    this.renderBasket();
  }
  renderBasket() {
    this.orders.forEach((element) => {
      const newContent = this.template.content.cloneNode(true);
      const td = newContent.querySelectorAll('td');
      td[0].textContent = element.name;
      td[1].textContent = element.price + ' р.';
      td[2].textContent = element.value;
      td[3].textContent = 'x';
      td[3].classList.add('remove-from-basket-button');

      this.basket.appendChild(newContent);

      const removeButtons = document.querySelectorAll('.remove-from-basket-button');
      removeButtons.forEach((button) => {
        if (!button.onclick) {
          button.onclick = () => {
            button.parentElement.remove();
            const lineToRemove = { name: element.name, price: element.price, value: element.value };
            for (let i = 0; i <= this.orders.length; i++) {
              let check = true;
              for (const elem in this.orders[i]) {
                if (!(this.orders[i][elem] == lineToRemove[elem])) {
                  check = false;
                }
              }
              if (check) {
                this.orders.splice(i, 1);
              }
            }
            this.totalPrice -= +element.value * element.price;
            this.renderBasket();
          };
        }
      });
    });
    const basketPrice = document.getElementById('order-status');
    const orderButton = document.getElementsByClassName('place-an-order');
    basketPrice.textContent = `Итого: ${this.totalPrice} руб.`;
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

      // = confirmOrderCallback;
    }
    pubSub.publish('updateBasket', { message: 'Basket was updated', data: this.getData() });
  }
  confirmOrder() {
    console.log(`order sended \n order info:\n ${JSON.stringify(this.orders)}`);

    orderButton[0].onclick = '';
    // orderButton[0].classList.remove('place-an-order-active');
  }
  setData(data) {
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
    pubSub.publish('confirmOrder', { message: 'User confirm order', data: this.orders });
    this.orders = [];
    this.totalPrice = 0;
    this.basket.innerHTML = '';
    this.renderBasket();
  };
}
console.log(localStorage);
export let basket = new Basket();
if (localStorage.basket) {
  basket = new Basket();
  const data = JSON.parse(localStorage.getItem('basket'));
  basket.setData(data);
  basket.renderBasket();
} else {
  basket = new Basket();
}
