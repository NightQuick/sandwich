<script setup lang="ts">
interface Ingredient {
  name: string;
  description?: string;
  price: number;
  image: string;
  id: string;
}
const props = defineProps<{
  ingredientId: string;
  data: Ingredient;
  selected: boolean;
}>();
</script>

<template>
  <div :class="{ 'modal-card': true, 'modal-card-active': selected }">
    <div class="modal-card-img">
      <img :src="props.data.image" />
    </div>
    <span class="modal-card-description">{{ props.data.name }}</span>
    <span class="modal-card-price">Цена: {{ props.data.price }} руб.</span>
  </div>
</template>

<style>
.modal-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 20px;
  padding-top: 20px;
  width: calc(100% / 5);
  height: fit-content;
  border-radius: 5px;
  box-shadow: none;
  align-items: center;
  cursor: pointer;
}

.modal-card-img {
  display: flex;
  justify-content: center;
  width: 180px;
  height: 180px;
  background-color: white;
  background-position: center;
  background-size: 100%;
  margin-top: 10px;
  margin: auto;
  border: var(--color-brand) solid 10px;
  border-radius: 50%;
  overflow: hidden;
}

.modal-card-img img {
  margin: auto;
  object-fit: contain;
  object-position: center;
}

.modal-card-description {
  max-width: 100%;
  text-align: center;
  padding: 5px;
  padding-bottom: 10px;
  color: #454545;
  font-size: 20px;
  font-weight: 100;
}

.modal-card-price {
  border-top: #454545 solid 2px;
  width: 80%;
  margin: auto;
  text-align: center;
  color: #e6614c;
  font-size: 17px;
  font-weight: 300;
  padding-bottom: 20px;
}
</style>
