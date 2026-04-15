import { IngredientCard } from '@elements/ingredientCard';
import { settings } from '@constants';
import { renderBuilderReady } from '@elements/renderBuilderReady';
import { store } from '@dp/store';

export class SandwichBuilder {
  settings: { [key: string]: { name: string; object: string; title: string; multiple: boolean } };
  cardCollections: { [key: string]: IngredientCard[] };
  constructor() {
    this.settings = settings;
    this.cardCollections = {};
  }

  async initialize() {
    await store.loadIngredients();
  }

  updatePrice() {
    store.recalculatePrice();
    const footer = document.getElementById('modal-footer');
    footer!.textContent = 'Итого: ' + store.state.sandwichConfig!.price + ' руб.';
  }

  openBuilder() {
    document.body.classList.add('no-scroll');
    this.cardCollections = {};

    const modal = document.getElementById('modal');
    modal!.classList.add('modal-visible');

    document.getElementById('previous-modal')!.onclick = () => {
      this.getPrevKey();
      this.renderBuilder();
    };

    document.getElementById('next-modal')!.onclick = () => {
      this.getNextKey();
      this.renderBuilder();
    };
    document.getElementById('ingredients-switcher')!.onclick = (event) => {
      if ((event.target as Element).nodeName != 'TD') return;
      store.setStep((event.target as Element).id);
      this.renderBuilder();
    };
    document.addEventListener('keydown', this.escKeyHandler);

    if (!document.getElementById('close-modal')!.onclick) {
      document.getElementById('modal')!.addEventListener('click', (event) => {
        if ((event.target as Element).id != 'modal') return;
        this.closeBuilder();
      });
      document.getElementById('close-modal')!.onclick = () => this.closeBuilder();
    }

    this.renderBuilder();
  }

  async renderBuilder() {
    await this.initialize();
    const currentStep = store.getCurrentStep();
    const sandwichConfig = await store.getSandwichConfig();

    if (!sandwichConfig) return;

    if (this.settings[currentStep].object != 'ready') {
      document.getElementById('modal-menu-wrapper')!.innerHTML = '';
      const menu = document.createElement('div');
      menu.id = 'modal-menu';
      document.getElementById('modal-menu-wrapper')!.appendChild(menu);

      const header = document.getElementById('header-text');
      header!.textContent = this.settings[currentStep].title;
      const footer = document.getElementById('modal-footer');
      footer!.textContent = 'Итого: ' + sandwichConfig.price + ' руб.';

      this.renderIngredientSwitcher();

      const ingredients = store.getIngredientsForStep(currentStep);
      this.cardCollections[currentStep] = [];

      for (const id in ingredients) {
        let cardElement = new IngredientCard(ingredients[id], this.settings[currentStep].multiple, this);
        this.cardCollections[currentStep].push(cardElement);
      }

      this.cardCollections[currentStep].forEach((card) => {
        card.renderModalCard();
      });
    } else {
      renderBuilderReady(this.settings, sandwichConfig);
    }
  }

  renderIngredientSwitcher() {
    const currentStep = store.getCurrentStep();
    const row = document.getElementsByClassName('ingredients');
    for (const element of row) {
      if (element.classList.contains('modal-switcher-active')) {
        element.classList.remove('modal-switcher-active');
      }
      if (element.classList.contains('modal-switcher-inactive')) {
        element.classList.remove('modal-switcher-inactive');
      }
    }

    const currentElement = document.getElementById(currentStep);
    currentElement?.classList.add('modal-switcher-active');
    for (const element of row) {
      if (!element.classList.contains('modal-switcher-active')) {
        element.classList.add('modal-switcher-inactive');
      }
    }
  }

  getNextKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(store.getCurrentStep());

    if (currentIndex === -1) return null;
    if (currentIndex === keys.length - 1) return null;
    const nextKey = keys[currentIndex + 1];
    store.setStep(nextKey);
    return nextKey;
  }

  getPrevKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(store.getCurrentStep());

    if (currentIndex === -1) return null;
    if (currentIndex === 0) return null;
    const prevKey = keys[currentIndex - 1];
    store.setStep(prevKey);
    return prevKey;
  }

  closeBuilder() {
    document.removeEventListener('keydown', this.escKeyHandler);
    document.body.classList.remove('no-scroll');
    store.setStep('size');

    const modal = document.getElementById('modal');
    modal!.classList.remove('modal-visible');
  }

  escKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeBuilder();
    }
  };
}
