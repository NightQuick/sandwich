import { IngredientCard } from '@script/ingredientCard.js';
import { settings, secondaryColour } from '@constant';
import { renderBuilderReady } from '@script/renderBuilderReady.js';
import { loadJson } from '@api';
export class SandwichBuilder {
  constructor(data) {
    this.settings = settings;
    this.cardData = JSON.parse(JSON.stringify(data));
    for (let component in this.cardData.components) {
      if (typeof this.cardData.components[component] === 'string') {
        this.cardData.components[component] = [this.cardData.components[component], '', 0];
      } else {
        this.cardData.components[component] = this.cardData.components[component].map((item) => [
          item,
          '',
          0
        ]);
      }
    }
    this.cardCollections = {};
    this.currentKey = 'size';
    this.ingridients = {};
  }
  async loadData() {
    if (!(this.currentKey in this.ingridients)) {
      let jsonData = await loadJson();
      for (const key in settings) {
        if (key == 'finish') return;
        const clonedData = JSON.parse(JSON.stringify(jsonData[settings[key].object]));
        const data = [];
        data.push(clonedData);

        this.ingridients[key] = data;
      }
    }

    for (let comp in this.ingridients[this.currentKey][0]) {
      this.ingridients[this.currentKey][0][comp].id = comp;
      this.ingridients[this.currentKey][0][comp].choosed = false;
    }

    if (typeof this.cardData['components'][this.currentKey][0] === 'string') {
      const compId = this.cardData.components[this.currentKey][0];
      if (this.ingridients[this.currentKey][0][compId]) {
        this.ingridients[this.currentKey][0][compId].choosed = true;
        this.cardData.components[this.currentKey] = [
          this.ingridients[this.currentKey][0][compId].id,
          this.ingridients[this.currentKey][0][compId].name,
          this.ingridients[this.currentKey][0][compId].price
        ];
      }
    } else {
      for (let component of this.cardData['components'][this.currentKey]) {
        const compId = component[0];
        if (this.ingridients[this.currentKey][0][compId]) {
          this.ingridients[this.currentKey][0][compId].choosed = true;
          component[0] = this.ingridients[this.currentKey][0][compId].id;
          component[1] = this.ingridients[this.currentKey][0][compId].name;
          component[2] = this.ingridients[this.currentKey][0][compId].price;
        }
      }
    }

    this.cardCollections[this.currentKey] = [];
    for (let element of this.ingridients[this.currentKey]) {
      for (let product in element) {
        let cardElement = new IngredientCard(element[product], this.settings[this.currentKey].multiple, this);
        this.cardCollections[this.currentKey].push(cardElement);
      }
    }
    return this.ingridients[this.currentKey];
  }
  async initialize() {
    await this.loadData();
  }

  openBuilder() {
    document.body.classList.add('no-scroll');
    this.cardCollections = {};
    this.currentKey = 'size';

    const modal = document.getElementById('modal');
    modal.classList.add('modal-visible');

    document.getElementById('previous-modal').onclick = () => {
      this.renderBuilder(this.settings[this.getPrevKey()]);
    };

    document.getElementById('next-modal').onclick = () => {
      this.renderBuilder(this.settings[this.getNextKey()]);
    };
    document.addEventListener('keydown', this.escKeyHandler);

    if (!document.getElementById('close-modal').onclick) {
      document.getElementById('modal').addEventListener('click', (event) => {
        if (event.target.id != 'modal') return;
        this.closeBuilder();
      });
      document.getElementById('close-modal').onclick = () => this.closeBuilder();
    }

    this.renderBuilder();
  }

  async renderBuilder() {
    if (this.settings[this.currentKey].object != 'ready') {
      document.getElementById('modal-menu-wrapper').innerHTML = '';
      const menu = document.createElement('div');
      menu.id = 'modal-menu';
      document.getElementById('modal-menu-wrapper').appendChild(menu);

      await this.initialize();

      const header = document.getElementById('header-text');
      header.textContent = this.settings[this.currentKey].title;
      const footer = document.getElementById('modal-footer');
      footer.textContent = 'Итого: ' + this.cardData.price + ' руб.';

      this.renderIngredientSwitcher();

      for (let card of this.cardCollections[this.currentKey]) {
        card.renderModalCard();
      }
    } else {
      renderBuilderReady(this.settings, this.cardData);
    }
  }

  renderIngredientSwitcher() {
    const row = document.getElementsByClassName('ingredients');
    for (let element of row) {
      if (element.classList.contains('modal-switcher-active')) {
        element.classList.remove('modal-switcher-active');
      }
      if (element.classList.contains('modal-switcher-inactive')) {
        element.classList.remove('modal-switcher-inactive');
      }
    }

    const currentElement = document.getElementById(this.currentKey);
    currentElement.classList.add('modal-switcher-active');
    for (let element of row) {
      if (!element.classList.contains('modal-switcher-active')) {
        element.classList.add('modal-switcher-inactive');
      }
    }
  }

  getNextKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(this.currentKey);

    if (currentIndex === -1) return null;
    if (currentIndex === keys.length - 1) return null;
    this.currentKey = keys[currentIndex + 1];
    return this.currentKey;
  }

  getPrevKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(this.currentKey);

    if (currentIndex === -1) return null;
    if (currentIndex === 0) return null;
    this.currentKey = keys[currentIndex - 1];
    return this.currentKey;
  }
  closeBuilder() {
    document.removeEventListener('keydown', this.escKeyHandler);
    document.body.classList.remove('no-scroll');
    this.currentKey = 'size';

    const modal = document.getElementById('modal');
    modal.classList.remove('modal-visible');
  }
  escKeyHandler = (event) => {
    if (event.key === 'Escape') {
      this.closeBuilder();
    }
  };
}
