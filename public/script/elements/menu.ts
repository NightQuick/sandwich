import { Card } from '@elements/card';
import { dataApi } from '@api';

//Меню продуктов
export class Menu {
  data: Card[];
  category: string;
  initialized: Promise<void>;
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
    let data = await dataApi.getAllPositions(this.category);

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
