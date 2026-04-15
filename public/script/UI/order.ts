import { pubSub } from '@dp/pubSub';
import { counter } from '@elements/counter';

export interface Position {
  description: string;
  image: string;
  name: string;
  price: number;
  value: string;
}

export class Order {
  positionList: Position[];
  orderPrice: number;
  events: boolean;
  constructor(orders: Position[]) {
    this.positionList = orders;
    this.orderPrice = 0;
    this.events = false;
  }

  renderOrderbox() {
    document.body.classList.add('no-scroll');
    if (!this.events) {
      document.getElementById('close-orderbox')?.addEventListener('click', () => {
        this.closeOrderbox();
      });

      const confirmOrderButton = document.getElementById('order-confirm-button');
      confirmOrderButton?.addEventListener('click', () => {
        pubSub.publish('confirmOrder', { message: 'user send order', data: this.positionList });
        this.closeOrderbox();
        this.events = true;
      });
    }
    const modal = document.getElementById('order');
    modal!.classList.remove('order-hidden');

    const list = document.getElementById('order-box-content')!;
    this.positionList.forEach((position) => {
      const positionBox = document.createElement('div');
      positionBox.classList.add('order-position');

      const imageBox = document.createElement('div');

      const imageBorder = document.createElement('div');
      imageBorder.classList.add('order-position-image-wrapper');

      const img = document.createElement('img');
      img.src = position.image;

      const description = document.createElement('div');
      description.classList.add('order-position-description');

      const name = document.createElement('span');
      name.classList.add('order-position-name');
      name.textContent = position.name;

      const info = document.createElement('span');
      info.classList.add('order-position-info');
      info.textContent = position.description;

      const price = document.createElement('span');
      price.classList.add('order-position-price');
      price.textContent = `${position.price} руб. за шт.`;

      const positionCounter = counter(+position.value);
      positionCounter.classList.add('order-position-counter');
      const counterButtons = [positionCounter.children[0], positionCounter.children[2]];
      counterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          pubSub.publish('updateBasketValue', {
            message: `value of ${position.name} was updated`,
            data: [
              position.name,
              position.price,
              position.value,
              (positionCounter.children[1] as HTMLInputElement).value
            ]
          });
          position.value = (positionCounter.children[1] as HTMLInputElement).value;
          this.updatePrice();
        });
      });
      positionCounter.children[1].addEventListener('blur', () => {
        pubSub.publish('updateBasketValue', {
          message: `value of ${position.name} was updated`,
          data: [
            position.name,
            position.price,
            position.value,
            (positionCounter.children[1] as HTMLInputElement).value
          ]
        });
        position.value = (positionCounter.children[1] as HTMLInputElement).value;
        this.updatePrice();
      });

      const removeButton = document.createElement('button');
      removeButton.className = 'order-remove-button';
      removeButton.textContent = 'x';
      removeButton.classList.add('order-remove-button');

      removeButton.addEventListener('click', () => {
        pubSub.publish('removeBasketPosition', {
          message: `${position.name} was deleted`,
          data: [position.name, position.price, position.value]
        });
        this.removeElement(position.name, position.price, position.value);
        list.removeChild(positionBox);
        if (list.children.length <= 0) {
          this.closeOrderbox();
        }
      });

      imageBorder.appendChild(img);
      imageBox.appendChild(imageBorder);

      description.appendChild(name);
      description.appendChild(info);
      description.appendChild(price);
      description.appendChild(positionCounter);

      positionBox.appendChild(imageBox);
      positionBox.appendChild(description);
      positionBox.appendChild(removeButton);

      list.appendChild(positionBox);
    });

    this.updatePrice();
  }

  removeElement(name: string, price: number, value: string) {
    const lineToRemove = { name, price, value };
    for (let i = 0; i <= this.positionList.length; i++) {
      let check = true;
      for (const elem in this.positionList[i]) {
        if (!(elem == 'image' || elem == 'description'))
          if (
            !(this.positionList[i][elem as keyof Position] == lineToRemove[elem as keyof typeof lineToRemove])
          ) {
            check = false;
          }
      }
      if (check) {
        this.positionList.splice(i, 1);
        i = this.positionList.length;
        this.updatePrice();
      }
    }
  }

  updatePrice() {
    this.orderPrice = 0;
    this.positionList.forEach((position) => {
      this.orderPrice += +position.value * position.price;
    });
    const totalPrice = document.getElementById('order-total-price');
    totalPrice!.textContent = `Итого: ${this.orderPrice} руб.`;
  }
  closeOrderbox() {
    document.body.classList.remove('no-scroll');
    const modal = document.getElementById('order');
    modal!.classList.add('order-hidden');
    document.getElementById('order-box-content')!.innerHTML = '';
  }
}
export const order = new Order([]);
