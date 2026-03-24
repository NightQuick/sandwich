import { Card } from '@script/card.js';
import { loadJson } from '@api';

//Меню продуктов
export class Menu {
  constructor(category) {
    this.data = [];
    this.category = category;
    this.initialized = this.initialize();
  }

  async initialize() {
    await this.loadData();
  }
  //функция загрузки данных
  async loadData() {
    let jsonData = await loadJson();
    let data = [];

    //Отбор продуктов из нужной категории
    jsonData.menu.forEach((product) => {
      if (
        (product.category === this.category[0] || product.category === this.category[1]) &&
        product.image.includes(this.category)
      ) {
        data.push(product);
      }
    });

    //Создание карточек товаров и сохранение их информации
    data.forEach((product) => {
      let cardElement = new Card(product);
      this.data.push(cardElement);
    });
  }

  //Отрисовка меню
  async render() {
    await this.initialized;

    let menu = document.getElementById('menu');
    menu.innerHTML = '';

    this.data.forEach((card) => {
      let cardElement = card.render();
      menu.appendChild(cardElement);
    });
  }
}
