<script setup lang="ts">
import { basket } from '@script/elements/basket';
import BasketPosition from './basket-position.vue';

const handleRemove = (indexToRemove: number) => {
  const { price, value } = basket.orders.value[indexToRemove];
  basket.totalPrice.value -= price * value;
  basket.orders.value.splice(indexToRemove, 1);
};
</script>

<template>
  <BasketPosition
    v-for="(position, index) in basket.orders.value"
    :key="position.name"
    :position="position"
    :index="index"
    @remove:position="handleRemove"
  />
</template>
