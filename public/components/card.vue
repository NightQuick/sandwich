<script setup lang="ts">
import { useSandwichBuilderStore } from '@/stores/sandwichBuilderStore.js';
import { useBasketStore } from '@/stores/basketStore.js';
import Counter from './counter.vue';
import { logoPaths } from '@constants';
import { ref } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
const logo = logoPaths[props.data.market as keyof typeof logoPaths];
const value = ref(1);

const valueUpdateHandler = (newValue: number) => {
  value.value = newValue;
};

function addToBasket() {
  const basket = useBasketStore();
  basket.addProduct(props.data.name, value.value, props.data.price, props.data.image, props.data.description);
}

async function openModal() {
  const data = JSON.parse(JSON.stringify(props.data));
  const store = useSandwichBuilderStore();
  await store.initSandwichConfig(data);
  await store.loadIngredients();
  store.visible = true;
}
</script>

<template id="card-template">
  <div class="position-card">
    <img class="logo" :src="logo" alt="" />
    <div class="product-image-wrapper">
      <img class="product-image" :src="props.data.image" />
    </div>
    <span class="product-name">{{ props.data.name }}</span>
    <div
      :class="{ 'product-ingredients': true, 'ingredient-list-inactive': !props.data.components }"
      @click="
        {
          props.data.components ? openModal() : false;
        }
      "
    >
      <a>
        {{ props.data.description }}
      </a>
    </div>
    <span class="product-price">ЦЕНА: {{ props.data.price }} руб.</span>
    <span class="counter-description">КОЛИЧЕСТВО</span>
    <div class="counter">
      <Counter @value-update="valueUpdateHandler" :starts-from="1" />
    </div>
    <button class="product-add-to-basket" @click="addToBasket">В КОРЗИНУ</button>
  </div>
</template>

<style>
.position-card {
  margin: 20px;
  display: grid;
  place-items: center;
  width: calc(100% / 4);
  height: fit-content;
}

.logo {
  width: 50%;
}

.product-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 80%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 15px solid var(--color-brand);
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3));
  overflow: hidden;
}
.product-image {
  width: 100%;
}

.product-name {
  margin-top: 5px;
  color: #444444;
}

.product-ingredients {
  text-decoration-line: underline;
  cursor: pointer;
  color: #0000ee;
  text-align: center;
  height: 60px;
  width: 100%;
  padding-top: 7px;
  border-top: 3px solid #444444;
  border-bottom: 3px solid #444444;
}

.product-price {
  color: #e6614c;
  font-size: 20px;
}

.counter-description {
  font-size: 15px;
}

.product-add-to-basket {
  border: none;
  border-radius: 3px;
  width: 70%;
  height: 30px;
  background-color: var(--color-brand);
  color: white;
  font-size: 25px;
  font-weight: 800;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  box-shadow:
    0px 0px 5px rgba(0, 0, 0, 0.5),
    0px 2px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.ingredient-list-inactive {
  color: black;
  text-decoration: none;
  cursor: default;
}
</style>
