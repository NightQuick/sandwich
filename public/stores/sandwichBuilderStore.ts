import { CardData } from '@constants';
import { dataApi } from '@api';
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export type Category = 'size' | 'bread' | 'vegetable' | 'sauce' | 'filling' | 'finish';

type multiComponent = [string, string, number][];
interface Ingredient {
  [id: string]: { description?: string; id: string; image: string; name: string; price: number };
}
export const useSandwichBuilderStore = defineStore('sandwichBuilder', {
  state: () => {
    return {
      visible: ref(false),
      isLoading: false,
      currentStep: 'size',
      ingredients: {
        size: {} as Ingredient,
        bread: {} as Ingredient,
        vegetable: {} as Ingredient,
        sauce: {} as Ingredient,
        filling: {} as Ingredient
      },
      sandwichConfig: {
        name: '',
        basePrice: 0,
        category: 'sandwich',
        components: {
          size: ['', '', 0] as [string, string, number],
          bread: ['', '', 0] as [string, string, number],
          vegetable: [] as multiComponent,
          sauce: [] as multiComponent,
          filling: [] as multiComponent
        },
        description: '',
        image: '',
        market: '',
        type: '',
        weight: 0
      }
    };
  },

  getters: {
    price(state) {
      let componentsPrice = 0;
      for (const component in state.sandwichConfig.components) {
        if (component == 'size' || component == 'bread') {
          componentsPrice +=
            +state.sandwichConfig.components[component as keyof typeof state.sandwichConfig.components][2];
        }
        if (component == 'vegetable' || component == 'sauce' || component == 'filling') {
          for (let comp of state.sandwichConfig.components[
            component as keyof typeof state.sandwichConfig.components
          ]) {
            if (typeof comp != 'string' || typeof comp != 'number') {
              comp = comp as [string, string, number];
              componentsPrice += comp[2];
            }
          }
        }
        state.sandwichConfig.components[component as keyof typeof state.sandwichConfig.components];
      }
      return state.sandwichConfig.basePrice + componentsPrice;
    }
  },

  actions: {
    selectIngredient(category: Category, ingredient: { id: string; name: string; price: number }) {
      if (category === 'size' || category === 'bread') {
        // Для size и bread — замена, а не добавление
        this.sandwichConfig.components[category] = [ingredient.id, ingredient.name, ingredient.price];
      }

      if (category === 'filling' || category === 'sauce' || category === 'vegetable') {
        const current = this.sandwichConfig.components[category];
        const exists = current.find((item) => item[0] === ingredient.id);

        if (exists) {
          // Удаляем если уже есть
          this.sandwichConfig.components[category] = current.filter((item) => item[0] !== ingredient.id);
        } else {
          // Добавляем
          if (category !== 'sauce') {
            current.push([ingredient.id, ingredient.name, ingredient.price]);
          } else {
            // Для соусов — ограничение на 3
            if (current.length < 3) {
              current.push([ingredient.id, ingredient.name, ingredient.price]);
            }
          }
        }
      }
    },
    async initSandwichConfig(data: CardData) {
      await this.loadIngredients();

      data = JSON.parse(JSON.stringify(data));
      this.sandwichConfig!.basePrice = data.price;
      this.sandwichConfig.category = data.category;
      this.sandwichConfig.description = data.description;
      this.sandwichConfig.image = data.image;
      this.sandwichConfig.market = data.market;
      this.sandwichConfig.name = data.name;
      this.sandwichConfig.type = data.type;
      this.sandwichConfig.weight = data.weight;

      this.currentStep = 'size';
      console.log(data);

      for (const component in this.sandwichConfig.components) {
        if (component === 'size' || component === 'bread') {
          this.sandwichConfig.components[component] = [
            data.components[component],
            this.ingredients[component][data.components[component]].name,
            this.ingredients[component][data.components[component]].price
          ];
        }
        if (component == 'vegetable' || component == 'sauce' || component == 'filling') {
          this.sandwichConfig!.components[component] = data.components[component].map((item) => {
            return [item, this.ingredients[component][item].name, 0];
          });
        }
      }
    },
    async loadIngredients() {
      if (this.isLoading) {
        return this.ingredients;
      }
      this.isLoading = true;

      for (const key in this.ingredients) {
        if (key === 'finish') continue;
        const data = await dataApi.getAllIng(key);

        this.ingredients[key as keyof typeof this.ingredients] = data;
      }

      this.isLoading = false;
      return this.ingredients;
    },

    setStep(step: string) {
      this.currentStep = step;
    }
  }
});
