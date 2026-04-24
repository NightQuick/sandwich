import { dataApi } from '@/api';
import { CardData } from '@constants';
import { Ref, ref, watch } from 'vue';

interface MenuState {
  loadedMenus: { [key: string]: CardData[] };
  menuList: Ref;
  currentMenu: Ref<string>;
  getMenu: Function;
  setMenu: Function;
  loadData: Function;
}

export const menuState: MenuState = {
  loadedMenus: {},
  menuList: ref(),
  currentMenu: ref('pizza'),
  getMenu() {
    return this.currentMenu.value;
  },
  setMenu(newValue: string) {
    this.currentMenu.value = newValue;
  },
  async loadData() {
    let data = await dataApi.getAllPositions(this.currentMenu.value);
    this.loadedMenus[this.currentMenu.value] = data;
    this.menuList.value = data; // сразу обновляем здесь
  }
};
watch(
  menuState.currentMenu,
  async () => {
    if (!menuState.loadedMenus[menuState.currentMenu.value]) {
      await menuState.loadData();
    } else {
      menuState.menuList.value = menuState.loadedMenus[menuState.currentMenu.value];
    }
  },
  { immediate: true }
);
