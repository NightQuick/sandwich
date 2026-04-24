import { Card, CardData } from '@elements/card';
import { dataApi } from '@api';
import { App, createApp } from 'vue';
import MenuElement from '@/components/menu.vue';
type Product = { description?: string; id: string; image: string; name: string; price: number };
//Меню продуктов
export class Menu {
  data: Card[];
  category: string;
  initialized: Promise<void>;
  constructor(category: string) {
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
    data.forEach((product: CardData) => {
      let cardElement = new Card(product);
      this.data.push(cardElement);
    });
  }

  //Отрисовка меню
  async render() {
    await this.initialized;

    // this.data.forEach((card) => {
    //   let cardElement = card.render();
    //   menu.appendChild(cardElement);
    // });
  }
}
