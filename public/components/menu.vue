<script setup>
import { computed } from 'vue';
import Card from './card.vue';
import { menuState } from '@script/dataProcessing/menuState';
const cardList = computed(() => menuState.menuList.value);
</script>

<template>
  <div id="menu">
    <Card v-for="value in cardList" :data="value" />
  </div>
</template>

<style>
#menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
</style>
