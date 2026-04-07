import { pubSub } from '@dp/pubSub.js';
import { dataApi } from '@api';
import { settings } from '@constants';

export class Store {
  constructor() {
    this.state = {
      sandwichConfig: null,
      ingredients: {},
      currentStep: 'size',
      basket: []
    };
    this.isLoading = false;
  }

  subscribe(callback) {
    pubSub.subscribe('store:change', callback);
  }

  unsubscribe(callback) {
    pubSub.unsubscribe('store:change', callback);
  }

  notify(action, payload) {
    pubSub.publish('store:change', {
      action,
      payload,
      state: this.getState()
    });
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  async loadIngredients() {
    if (this.isLoading || Object.keys(this.state.ingredients).length > 0) {
      return this.state.ingredients;
    }

    this.isLoading = true;

    for (const key in settings) {
      if (key === 'finish') continue;
      const data = await dataApi.getAllIng(key);

      this.state.ingredients[key] = [data];
    }

    this.isLoading = false;
    this.notify('INGREDIENTS_LOADED', this.state.ingredients);
    return this.state.ingredients;
  }

  setStep(step) {
    this.state.currentStep = step;
    this.notify('STEP_CHANGED', step);
  }

  selectIngredient(category, ingredient) {
    const multiple = settings[category]?.multiple;

    if (!multiple) {
      this.state.sandwichConfig.components[category] = [
        ingredient.id,
        ingredient.name,
        ingredient.price || 0
      ];
    } else {
      const current = this.state.sandwichConfig.components[category];
      const exists = current.find((item) => item[0] === ingredient.id);

      if (exists) {
        this.state.sandwichConfig.components[category] = current.filter((item) => item[0] !== ingredient.id);
        return false;
      } else {
        if (category !== 'sauce') {
          current.push([ingredient.id, ingredient.name, ingredient.price || 0]);
          return true;
        } else {
          if (this.state.sandwichConfig.components[category].length < 3) {
            current.push([ingredient.id, ingredient.name, ingredient.price || 0]);
            return true;
          }
        }
      }
    }

    this.recalculatePrice();
    this.notify('INGREDIENT_SELECTED', { category, ingredient });
  }

  async initSandwichConfig(data) {
    await this.loadIngredients();
    this.loadIngredients();
    this.state.sandwichConfig = JSON.parse(JSON.stringify(data));
    this.state.sandwichConfig.basePrice = data.price;
    this.state.currentStep = 'size';

    for (const component in this.state.sandwichConfig.components) {
      if (typeof this.state.sandwichConfig.components[component] === 'string') {
        this.state.sandwichConfig.components[component] = [
          this.state.sandwichConfig.components[component],
          this.state.ingredients[component][0][this.state.sandwichConfig.components[component]].name,
          0
        ];
      } else {
        this.state.sandwichConfig.components[component] = this.state.sandwichConfig.components[component].map(
          (item) => [item, '', 0]
        );
      }
    }

    this.notify('SANDWICH_INIT', this.state.sandwichConfig);
  }

  addToBasket() {
    this.state.basket.push({
      ...this.state.sandwichConfig,
      timestamp: Date.now()
    });
    this.notify('ADDED_TO_BASKET', this.state.basket);
  }

  recalculatePrice() {
    const basePrice = this.state.sandwichConfig.basePrice || this.state.sandwichConfig.price;
    let finalPrice = basePrice;

    for (const category in this.state.sandwichConfig.components) {
      const comp = this.state.sandwichConfig.components[category];
      const isMultiple = settings[category]?.multiple;

      if (Array.isArray(comp)) {
        if (!isMultiple && comp.length === 3 && typeof comp[0] === 'string') {
          finalPrice += comp[2] || 0;
        } else if (isMultiple) {
          comp.forEach((item) => {
            if (Array.isArray(item) && item[2]) {
              finalPrice += item[2];
            }
          });
        }
      }
    }

    this.state.sandwichConfig.price = finalPrice;
  }

  getCurrentStep() {
    return this.state.currentStep;
  }

  getIngredientsForStep(step) {
    return this.state.ingredients[step];
  }

  getSandwichConfig() {
    return this.state.sandwichConfig;
  }
}

export const store = new Store();
