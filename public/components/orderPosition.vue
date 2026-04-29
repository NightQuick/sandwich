<script setup lang="ts">
import { basket } from '@script/elements/basket';
import Counter from './counter.vue';
const props = defineProps<{
  index: number;
  image: string;
  description: string;
  price: number;
  value: number;
  name: string;
}>();

const emit = defineEmits<{
  (e: 'remove:position', indexToRemove: number): void;
}>();
const updateValueHandler = (newValue: number) => {
  basket.orders.value[props.index].value = newValue;
};
</script>

<template>
  <div class="order-position">
    <div>
      <div class="order-position-image-wrapper">
        <img :src="props.image" />
      </div>
    </div>
    <div class="order-position-description">
      <span class="order-position-name">{{ props.name }}</span>
      <span class="order-position-info">{{ props.description }}</span>
      <span class="order-position-price">{{ props.price }} руб. за шт</span>
      <div class="order-position-counter">
        <Counter @value-update="updateValueHandler" :starts-from="props.value" />
      </div>
    </div>
    <button class="order-remove-button" @click="emit('remove:position', props.index)">x</button>
  </div>
</template>

<style>
.order-position {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 250px;
  margin-top: 10px;
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 30px;
  padding-right: 10px;
}

.order-position-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 50%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 10px solid var(--color-brand);
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3));
  overflow: hidden;
}
.order-position-image-wrapper img {
  margin: auto;
  width: 180px;
  object-position: center;
}

.order-position-description {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 20px;
  margin-left: 300px;
  font-size: 30px;
}

.order-position-info {
  margin-top: 30px;
  font-size: 20px;
}

.order-position-price {
  margin-top: auto;
  margin-bottom: 15px;
}

.order-remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: rgba(209, 209, 209, 0.6);
}
</style>
