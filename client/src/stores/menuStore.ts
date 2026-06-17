import { dataApi } from '@/api';
import { CardData } from '@constants';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      loadedMenus: {
        pizza: [] as CardData[],
        shaurma: [] as CardData[],
        sandwiches: [] as CardData[],
        burgers: [] as CardData[],
        chicken: [] as CardData[],
        salads: [] as CardData[],
        drinks: [] as CardData[]
      },
      currentMenu: 'pizza'
    };
  },
  getters: {
    menuList(): CardData[] {
      if (this.loadedMenus[this.currentMenu as keyof typeof this.loadedMenus]) {
        return this.loadedMenus[this.currentMenu as keyof typeof this.loadedMenus];
      } else {
        return this.loadedMenus.pizza;
      }
    }
  },
  actions: {
    async init() {
      await this.loadData(this.currentMenu);
      this.$subscribe(
        (state) => {
          if (this.loadedMenus[this.currentMenu as keyof typeof this.loadedMenus].length <= 0) {
            this.loadData(this.currentMenu);
          }
        },
        { deep: true }
      );
    },

    async loadData(currentMenu: string) {
      let data = await dataApi.getAllPositions(currentMenu);
      this.loadedMenus[currentMenu as keyof typeof this.loadedMenus] = data;
    }
  }
});
