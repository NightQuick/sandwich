<script setup lang="ts">
import { ref, watch } from 'vue';
import OrderPosition from './orderPosition.vue';
import { order } from '@script/UI/order';
import { basket } from '@script/elements/basket';
import { pubSub } from '@script/dataProcessing/pubSub';

watch(basket.orders.value, () => {
  if (basket.orders.value.length === 0) {
    document.body.classList.remove('no-scroll');
    order.visible.value = false;
  }
});
watch(order.visible, () => {
  if (order.visible.value == true) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
const handleRemove = (indexToRemove: number) => {
  const { price, value } = basket.orders.value[indexToRemove];
  basket.totalPrice.value -= price * value;
  basket.orders.value.splice(indexToRemove, 1);
};
const sendOrder = () => {
  pubSub.publish('confirmOrder', { message: 'User confirm order ', data: basket.orders.value });
};
</script>

<template>
  <div id="order" :class="{ 'order-hidden': !order.visible.value }">
    <div id="order-box">
      <div id="order-box-header">
        <span>Проверьте и подтвердите заказ</span>
        <button id="close-orderbox">x</button>
      </div>
      <div id="order-box-content-wrapper">
        <div id="order-box-content">
          <OrderPosition
            @remove:position="handleRemove"
            v-for="(position, index) in basket.orders.value"
            :index="index"
            :image="position.image"
            :description="position.description"
            ,
            :value="position.value"
            :price="position.price"
            :name="position.name"
          />
        </div>
      </div>

      <div id="order-footer">
        <span id="order-total-price">Итого: {{ basket.totalPrice.value }} руб.</span>
        <button id="order-confirm-button" @click="sendOrder">Подтвердить заказ</button>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --color-brand: #ffc000;
  --selected-card-bg: #fdd55c;
  --card-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  --unselected-card-bg: #ebeae8;
  --close-message-button: #ac8100;
  --order-text: #545045;
}

#order {
  opacity: 1;
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
  pointer-events: all;
  transition:
    opacity 0.3s,
    visibility 0.3s;
}
.order-hidden {
  visibility: hidden;
}

#order-box {
  position: relative;
  width: 50%;
  height: 80%;
  background-color: #ebeae8;
  border-radius: 10px;
}

#order-box-header {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: var(--color-brand);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

#order-box-header span {
  font-size: 25px;
  color: white;
  font-weight: 700;
}

#close-orderbox {
  position: absolute;
  top: 5px;
  right: 6px;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: none;
  font-size: 30px;
  color: #b28600;
  cursor: pointer;
}

#order-box-content-wrapper {
  display: grid;
  margin: auto;
  margin-top: 20px;
  width: 90%;
  height: 75%;
}

#order-box-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

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

#order-box-content::-webkit-scrollbar {
  width: 6px;
}
#order-box-content::-webkit-scrollbar-track {
  border-radius: 3px;
}
#order-box-content::-webkit-scrollbar-thumb {
  background: var(--color-brand);
  border-radius: 3px;
  transition: background 0.5s cubic-bezier(0, 0, 1, 1);
}

#order-footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
#order-total-price {
  margin-top: 10px;
  color: #e6614c;
  font-size: 30px;
}

#order-confirm-button {
  width: 30%;
  margin-top: 5px;
  border: none;
  border-radius: 3px;
  background-color: var(--color-brand);
  color: white;
  font-size: 20px;
  font-weight: 800;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  box-shadow:
    0px 0px 5px rgba(0, 0, 0, 0.5),
    0px 2px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 35px;
}
.product-add-to-order {
}
</style>
