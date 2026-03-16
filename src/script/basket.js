import { confirmOrderCallback } from '@callback';
export class Basket {
  constructor() {
    this.orders = [];
    this.totalPrice = 0;
    this.basket = document.getElementById('basket-content');
    this.template = document.getElementById('basket-content-template');
    this.listOrders = document.getElementById('basket-products').childNodes[1];
  }
  addProduct(name, value, price) {
    const newContent = this.template.content.cloneNode(true);
    this.orders.push({ name, price, value });
    const td = newContent.querySelectorAll('td');
    td[0].textContent = name;
    td[1].textContent = price + ' р.';
    td[2].textContent = value;
    td[3].textContent = 'x';
    td[3].classList.add('remove-from-basket-button');

    this.basket.appendChild(newContent);

    this.totalPrice += +value * price;

    const removeButtons = document.querySelectorAll('.remove-from-basket-button');
    for (const button of removeButtons) {
      if (!button.onclick) {
        button.onclick = () => {
          button.parentElement.remove();
          const lineToRemove = { name, price, value };
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
          this.totalPrice -= +value * price;
          this.renderBasket();
        };
      }
    }
    this.renderBasket();
  }
  renderBasket() {
    const basketPrice = document.getElementById('order-status');
    const orderButton = document.getElementsByClassName('place-an-order');
    basketPrice.textContent = `Итого: ${this.totalPrice} руб.`;
    if (this.orders.length === 0) {
      orderButton[0].classList.remove('place-an-order-active');
    } else {
      if (!orderButton[0].classList.contains('place-an-order-active')) {
        orderButton[0].classList.add('place-an-order-active');
      }
      orderButton[0].onclick = confirmOrderCallback;
    }
  }
  confirmOrder() {
    console.log(`order sended \n order info:\n ${JSON.stringify(this.orders)}`);
    this.orders = [];
    this.totalPrice = 0;
    const orderButton = document.getElementsByClassName('place-an-order');
    orderButton[0].onclick = '';
    // orderButton[0].classList.remove('place-an-order-active');
    this.basket.innerHTML = '';
    this.renderBasket();
  }
}
export const basket = new Basket();
