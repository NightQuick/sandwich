<script setup lang="ts">
import { watch } from 'vue';
import OrderPosition from './orderPosition.vue';
import { useBasketStore } from '@/stores/basketStore';
import type { Position } from '@constants';
import { ordersApi } from '@/api.js';

const basket = useBasketStore();
watch(
  basket,
  () => {
    if (basket.orders.length <= 0) {
      basket.orderBoxVisible = false;
    }
  },
  { deep: true }
);
watch(basket, () => {
  if (basket.orderBoxVisible == true) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
const sendOrder = () => {
  basket.orderBoxVisible = false;
  const data = JSON.parse(JSON.stringify(basket.orders));
  if (Array.isArray(data)) {
    data.forEach((element) => {
      delete (element as Partial<Position>).image;
      delete (element as Partial<Position>).description;
    });
  }
  ordersApi.create(data);
  basket.clearBasket();
};
</script>

<template>
  <Teleport to="body">
    <div id="order" :class="{ 'order-hidden': !basket.orderBoxVisible }">
      <div id="order-box">
        <div id="order-box-header">
          <span>Проверьте и подтвердите заказ</span>
          <button id="close-orderbox" @click="basket.orderBoxVisible = false">x</button>
        </div>
        <div id="order-box-content-wrapper">
          <div id="order-box-content">
            <OrderPosition
              @remove:position="basket.removeProduct(index)"
              v-for="(position, index) in basket.orders"
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
          <span id="order-total-price">Итого: {{ basket.totalPrice }} руб.</span>
          <button id="order-confirm-button" @click="sendOrder">Подтвердить заказ</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
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
</style>
