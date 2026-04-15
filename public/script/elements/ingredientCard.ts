import { Category, store } from '@dp/store';
import { settings } from '@constants';
import { SandwichBuilder } from './modal';

interface Data {
  id: string;
  image: string;
  name: string;
  price: number;
}
export class IngredientCard {
  builder: SandwichBuilder;
  data: Data;
  multiple: boolean;
  constructor(data: Data, multiple: boolean, builder: SandwichBuilder) {
    this.builder = builder;
    this.data = data;
    this.multiple = multiple;
  }

  renderModalCard() {
    const card = document.createElement('div');
    card.className = 'modal-card';

    const cardImg = document.createElement('div');
    cardImg.className = 'modal-card-img';

    const img = document.createElement('img');
    img.src = this.data['image'];

    const cardDescription = document.createElement('span');
    cardDescription.className = 'modal-card-description';
    cardDescription.textContent = this.data['name'];

    const cardPrice = document.createElement('span');
    cardPrice.className = 'modal-card-price';
    cardPrice.textContent = 'Цена: ' + this.data['price'] + 'руб.';

    cardImg.appendChild(img);
    card.appendChild(cardImg);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);

    const modalMenu = document.getElementById('modal-menu');
    modalMenu!.appendChild(card);

    const sandwichConfig = store.getSandwichConfig();
    const currentStep = store.getCurrentStep();
    const components = sandwichConfig?.components?.[currentStep];

    let isChosen = false;

    if (components === undefined || components === null) {
      isChosen = false;
    } else if (Array.isArray(components)) {
      if (components.length === 0) {
        isChosen = false;
      } else if (typeof components[0] === 'string') {
        isChosen = components[0] === this.data.id;
      } else if (Array.isArray(components[0])) {
        isChosen = components.some((item) => Array.isArray(item) && item[0] === this.data.id);
      }
    }

    if (isChosen) {
      card.classList.add('modal-card-active');
    }

    card.addEventListener('click', () => {
      const result = store.selectIngredient(currentStep as Category, this.data);
      this.builder.updatePrice();
      if (settings[store.getCurrentStep() as keyof typeof settings]?.multiple) {
        if (!result) {
          card.classList.remove('modal-card-active');
          card.classList.add('modal-card-inactive');
        } else {
          card.classList.remove('modal-card-inactive');
          card.classList.add('modal-card-active');
        }
      } else {
        this.builder.renderBuilder();
      }
    });
  }
}
