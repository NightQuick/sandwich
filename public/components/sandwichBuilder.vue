<script setup lang="ts">
import { computed, Ref, ref, watch } from 'vue';
import ModalCard from './modalCard.vue';
import Counter from './counter.vue';
import { settings } from '@constants';
import { store, Category } from '@script/dataProcessing/store';
import { pubSub } from '@script/dataProcessing/pubSub';
const settingsKeys = Object.keys(settings);
const currentKey: Ref<string> = ref('size');
const currentIndex = ref(settingsKeys.indexOf(currentKey.value));
watch(currentIndex, () => {
  currentKey.value = settingsKeys[currentIndex.value];
});
const changeKey = (symb: string) => {
  if (currentIndex.value < settingsKeys.length - 1 && symb == '+') {
    currentIndex.value++;
  }
  if (currentIndex.value > 0 && symb == '-') {
    currentIndex.value--;
  }
  const totalValue = computed(() => {
    // store.state.sandwichConfig.basePrice
  });
};
const footerIdHandler = () => {
  if (currentKey.value == 'finish') {
    return 'modal-ready-footer';
  } else {
    return 'modal-footer';
  }
};
const components = { size: 'Размер', bread: 'Хлеб', filling: 'Начинка', sauce: 'Соус', vegetable: 'Овощи' };
const ingredientSwitcherHandler = (newKey: string) => {
  currentIndex.value = settingsKeys.indexOf(newKey);
};

const checkSandwichComponent = (component: string) => {
  let result = false;
  if (settings[currentKey.value as keyof typeof settings].multiple) {
    store.state.sandwichConfig?.components.value[currentKey.value].forEach((elem) => {
      if ((elem as Array<any>)[0] == component) {
        result = true;
      }
    });
  } else {
    if (store.state.sandwichConfig?.components.value[currentKey.value][0] == component) {
      result = true;
    } else {
    }
  }

  return result;
};
const componentListHandler = (key: string) => {
  if (!settings[key as keyof typeof settings].multiple) {
    return store.state.sandwichConfig?.components.value[key][1] ?? 'Не выбрано';
  } else {
    const list: Array<string> = [];
    store.state.sandwichConfig?.components.value[key].forEach((component) => {
      list.push((component as Array<any>)[1]);
    });
    return list;
  }
};
const value = ref(1);
const valueUpdate = (newValue: number) => {
  value.value = newValue;
};
function addToBasket() {
  const data = {
    name: store.state.sandwichConfig?.name,
    description: store.state.sandwichConfig?.description,
    image: store.state.sandwichConfig?.image,
    value: value.value ?? 1,
    price: store.state.sandwichConfig?.price.value
  };
  pubSub.publish('addToBasket', { message: 'User add product to basket', data });
  close();
}
function close() {
  store.visible.value = false;
  currentIndex.value = 0;
  currentKey.value = 'size';
}
</script>

<template>
  <div id="modal" :class="{ 'modal-visible': store.visible.value }">
    <div id="modal-window">
      <div id="modal-header">
        <span id="header-text">{{ settings[currentKey as keyof typeof settings].title }}</span>
        <button id="close-modal" @click="close">×</button>
      </div>
      <div id="modal-content">
        <div id="modal-switcher-wrapper">
          <table id="ingredients-switcher">
            <td
              :class="{ 'modal-switcher-active': currentKey == key }"
              v-for="(setting, key) in settings"
              @click="ingredientSwitcherHandler(key)"
            >
              {{ setting.name }}
            </td>
          </table>
        </div>

        <div id="modal-buttons">
          <button class="modal-switcher" id="previous-modal" @click="changeKey('-')">
            <span class="modal-button-arrow" id="previous-modal-arrow">&lt;</span>
            <span class="modal-button-text" id="previous-modal-text">НАЗАД</span>
          </button>
          <button class="modal-switcher" id="next-modal" @click="changeKey('+')">
            <span class="modal-button-text" id="next-modal-text">ВПЕРЕД</span>
            <span class="modal-button-arrow" id="next-modal-arrow">></span>
          </button>
        </div>
        <div id="modal-menu-wrapper">
          <div id="modal-menu" v-if="currentKey != 'finish'">
            <ModalCard
              @click="store.selectIngredient(currentKey as typeof Category, ingredient)"
              v-for="(ingredient, key) in store.state.ingredients[currentKey]"
              :ingredientId="key as string"
              :data="ingredient"
              :selected="checkSandwichComponent(ingredient.id)"
            />
          </div>

          <div id="modal-ready" v-if="currentKey == 'finish'">
            <div class="modal-card-img modal-ready">
              <img :src="store.state.sandwichConfig?.image" />
            </div>
            <div id="modal-ready-information">
              <span>Ваш сендвич готов!</span>
              <ul id="modal-ready-information-ingredients">
                <li v-for="(component, key) in components">
                  {{ component }}:{{ componentListHandler(key).toString() }}
                </li>
              </ul>
              <span id="modal-ready-name">{{ store.state.sandwichConfig?.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" :id="footerIdHandler()">
        <div v-if="currentKey != 'finish'">
          <span>Итого:{{ store.state.sandwichConfig?.price }} руб.</span>
        </div>
        <div v-if="currentKey == 'finish'">
          <span id="modal-counter-description">КОЛИЧЕСТВО</span>
          <div><Counter :starts-from="value ?? 1" @value-update="valueUpdate"></Counter></div>
          <div>
            Итого:{{ store.state.sandwichConfig?.price }} руб.
            <button id="modal-add-to-basket" class="product-add-to-basket" @click="addToBasket()">
              В КОРЗИНУ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#modal {
  opacity: 0;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  transition:
    opacity 0.3s,
    visibility 0.3s;
}

#modal.modal-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

#modal-window {
  width: 80%;
  height: 80%;
  background-color: #ebeae8;
  border-radius: 5px;
  position: relative;
}

#modal-header {
  display: flex;
  width: 100%;
  height: fit-content;
  background-color: var(--color-brand);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

#header-text {
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  color: white;
  font-weight: 700;
}

#close-modal {
  position: relative;
  bottom: 10px;
  left: 6px;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: none;
  font-size: 35px;
  color: #b28600;
  cursor: pointer;
}

/* Таблица последовательности выбора ингридиентов */
#ingredients-switcher {
  border-collapse: separate;
  background-color: white;
  color: #454545;
  width: 95%;

  font-size: 20px;
  text-align: center;
  padding: 0px;
  margin: 10px;
  margin-left: 2.5%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  border-spacing: 0;
  border-radius: 5px;
  overflow: hidden;
}
#ingredients-switcher td {
  cursor: pointer;
}

/* Кнопки для переходов между этапами */
.modal-switcher {
  display: flex;
  justify-content: center;
  width: 15%;
  font-size: 20px;
  background-color: #e6614c;
  color: white;
  border: none;
  margin-right: 2.5%;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
}

#modal-buttons {
  width: 100%;
  height: 40px;
}

#next-modal {
  float: right;
}

#previous-modal {
  margin-left: 2.5%;
  float: left;
  text-align: right;
}

#previous-modal-arrow {
  margin-left: 0px;
  margin-right: 10px;
}

#previous-modal-text {
  margin-right: 10px;
}

.modal-button-text {
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 5px;
}

.modal-button-arrow {
  width: fit-content;
  display: block;
  font-size: 30px;
  margin-left: 10px;
  margin-right: 5px;
}

/* Меню выбора ингридиентов */
#modal-menu-wrapper {
  display: grid;
  margin: auto;
  margin-top: 20px;
  width: 90%;
  height: 100%;
}

#modal-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* Итоговая цена */
.modal-footer {
  display: grid;
  width: 100%;
  background-color: white;
  text-align: center;
  color: #e6614c;
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  position: absolute;
  left: auto;
  right: auto;
  bottom: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

#modal-ready {
  display: flex;
}

#modal-ready-information {
  float: right;
  color: #454545;
  margin-top: 20px;
  width: 60%;
  font-size: 25px;
  font-weight: 100;
}

#modal-ready-information-ingredients {
  width: 90%;
  border-top: #454545 solid 2px;
  border-bottom: #454545 solid 2px;
  font-size: 20px;
  list-style-type: none;
  padding-left: 0;
  padding-top: 15px;
  padding-bottom: 25px;
}

#modal-ready-name {
  position: relative;
  top: 40px;
}

#modal-counter-description {
  font-size: 15px;
  color: #454545;
}

#modal-add-to-basket {
  width: 20%;
}

#modal-ready-footer {
  top: 82.5%;
  padding: 0;
}

.modal-switcher-active {
  background-color: var(--color-brand);
}
.modal-card-active {
  background-color: var(--selected-card-bg);
  box-shadow: var(--card-shadow);
}
</style>
