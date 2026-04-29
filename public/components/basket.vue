<script setup lang="ts">
import { basket } from '@script/elements/basket';
import BasketPosition from './basket-position.vue';
import { order } from '@script/UI/order';

const handleRemove = (indexToRemove: number) => {
  const { price, value } = basket.orders.value[indexToRemove];
  basket.totalPrice.value -= price * value;
  basket.orders.value.splice(indexToRemove, 1);
};
const openOrderbox = () => {
  order.visible.value = true;
};
</script>

<template>
  <div id="basket-products-wrapper">
    <table id="basket-products">
      <thead>
        <tr id="basket-products-head">
          <td class="basket-products-columns" id="name">Название</td>
          <td class="basket-products-columns" id="price">Цена</td>
          <td class="basket-products-columns" id="count">Кол-во</td>
        </tr>
      </thead>
      <tbody>
        <BasketPosition
          v-for="(position, index) in basket.orders.value"
          :key="position.name"
          :position="position"
          :index="index"
          @remove:position="handleRemove"
        />
      </tbody>
    </table>
  </div>
  <div id="order-information">
    <span id="order-status">Итого: {{ basket.totalPrice }} руб.</span>
    <button
      :class="{ 'place-an-order-active': basket.orders.value.length > 0 }"
      class="place-an-order"
      @click="openOrderbox"
    >
      ОФОРМИТЬ ЗАКАЗ
    </button>
  </div>
</template>

<style>
#basket-products-wrapper {
  min-height: 50px;
  max-height: 190px;
  overflow-y: scroll;
}
#basket-products-wrapper::-webkit-scrollbar {
  width: 6px;
}
#basket-products-wrapper::-webkit-scrollbar-track {
  background: var(--selected-card-bg);
  border-radius: 3px;
}
#basket-products-wrapper::-webkit-scrollbar-thumb {
  background: var(--color-brand);
  border-radius: 3px;
  transition: background 0.5s cubic-bezier(0, 0, 1, 1);
}

#basket-products-wrapper::-webkit-scrollbar-thumb:hover {
  background: #e6ac01;
}
#basket-products {
  table-layout: fixed;
  border-collapse: collapse;
  margin-left: 3px;
  margin-right: 3px;
  color: var(--basket-text);
}

#basket-products-head {
  border-bottom: 3px solid var(--color-brand);
}

.basket-products-columns {
  font-size: 15px;
  color: var(--basket-text);
}

.basket-products-columns#name {
  width: 100px;
  margin-left: 0px;
  padding-right: 8px;
}
.basket-products-columns#price {
  margin-right: 0px;
  width: 70px;
  padding-right: 8px;
}

.basket-products-columns#count {
  float: right;
  margin-right: 0px;
}
.remove-from-basket-button {
  cursor: pointer;
}

#order-information {
  display: grid;
  place-items: center;
}

#order-status {
  font-size: 16px;
  color: var(--basket-text);
}

.place-an-order {
  font-size: 17px;
  border: 0px;
  background-color: #808080;
  color: white;
  border-radius: 2px;
  width: 70%;
  height: 22px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.7);
}

.place-an-order-active {
  background-color: var(--color-brand);
  cursor: pointer;
  color: var(--basket-text);
}
</style>
