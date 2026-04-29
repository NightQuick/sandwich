import { dataApi } from '@api';
import { settings } from '@constants';
import { CardData } from '@constants';
import { Ref, ref, watch } from 'vue';

export type SandwichConfig = null | {
  basePrice: number;
  category: string;
  components: Ref<{
    [key: string]: [string, string, number] | [string, string, number][] | [];
  }>;
  description: string;
  image: string;
  market: string;
  name: string;
  price: Ref<number>;
  type: string;
  weight: number;
};

export type Category = 'size' | 'bread' | 'vegetable' | 'sauce' | 'filling' | 'finish';
export class Store {
  visible: Ref<boolean>;
  state: {
    sandwichConfig: SandwichConfig;
    ingredients: {
      [key: string]: {
        [id: string]: { description?: string; id: string; image: string; name: string; price: number };
      };
    };
    currentStep: Ref<string>;
  };
  isLoading: boolean;

  constructor() {
    this.visible = ref(false);
    this.state = {
      sandwichConfig: null,
      ingredients: {},
      currentStep: ref('size')
    };
    this.isLoading = false;
  }

  async loadIngredients() {
    if (this.isLoading || Object.keys(this.state.ingredients).length > 0) {
      return this.state.ingredients;
    }

    this.isLoading = true;

    for (const key in settings) {
      if (key === 'finish') continue;
      const data = await dataApi.getAllIng(key);

      this.state.ingredients[key] = data;
    }

    this.isLoading = false;
    return this.state.ingredients;
  }

  setStep(step: string) {
    this.state.currentStep.value = step;
  }

  selectIngredient(category: Category, ingredient: { id: string; name: string; price: number }) {
    const multiple = settings[category]?.multiple;

    if (!multiple) {
      this.state.sandwichConfig!.components.value[category] = [
        ingredient.id,
        ingredient.name,
        ingredient.price || 0
      ];
    } else {
      const current = this.state.sandwichConfig!.components.value[category] as [string, string, number][];
      const exists = current.find((item) => item[0] === ingredient.id);

      if (exists) {
        this.state.sandwichConfig!.components.value[category] = current.filter(
          (item) => item[0] !== ingredient.id
        ) as [string, string, number][];
      } else {
        if (category !== 'sauce') {
          current.push([ingredient.id, ingredient.name, ingredient.price || 0] as [string, string, number]);
        } else {
          if (this.state.sandwichConfig!.components.value[category].length < 3) {
            current.push([ingredient.id, ingredient.name, ingredient.price || 0]);
          }
        }
      }
    }

    this.recalculatePrice();
  }

  async initSandwichConfig(data: CardData) {
    await this.loadIngredients();

    const parsed = JSON.parse(JSON.stringify(data));

    this.state.sandwichConfig = {
      ...parsed,
      components: ref(parsed.components),
      price: ref(parsed.price)
    };

    this.state.sandwichConfig!.basePrice = data.price;
    this.state.currentStep.value = 'size';

    for (const component in this.state.sandwichConfig!.components.value) {
      if (typeof this.state.sandwichConfig!.components.value[component] === 'string') {
        this.state.sandwichConfig!.components.value[component] = [
          this.state.sandwichConfig!.components.value[component],
          this.state.ingredients[component][this.state.sandwichConfig!.components.value[component] as string]
            .name,
          0
        ];
      } else {
        this.state.sandwichConfig!.components.value[component] = this.state.sandwichConfig!.components.value[
          component
        ].map((item) => [item, '', 0]) as [string, string, number][];
      }
    }
  }

  recalculatePrice() {
    const basePrice = this.state.sandwichConfig!.basePrice;
    let finalPrice = basePrice;

    for (const category in this.state.sandwichConfig!.components.value) {
      const isMultiple = settings[category as keyof typeof settings]?.multiple;
      const comp = this.state.sandwichConfig!.components.value[category];

      if (Array.isArray(comp)) {
        if (!isMultiple && comp.length === 3 && typeof comp[0] === 'string') {
          finalPrice += (comp[2] as number) || 0;
        } else if (isMultiple) {
          comp.forEach((item) => {
            if (Array.isArray(item) && item[2]) {
              finalPrice += item[2];
            }
          });
        }
      }
    }

    this.state.sandwichConfig!.price.value = finalPrice;
  }

  getCurrentStep() {
    return this.state.currentStep;
  }

  getIngredientsForStep(step: string) {
    return this.state.ingredients[step];
  }

  getSandwichConfig() {
    return this.state.sandwichConfig;
  }
}

export const store = new Store();
