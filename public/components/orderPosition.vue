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
