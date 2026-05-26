<script setup>
import { computed } from 'vue';
import Card from './card.vue';
import { useMenuStore } from '@/stores/menuStore';
const cardList = computed(() => menuState.menuList.value);
const menu = useMenuStore();
menu.init();
</script>

<template>
  <div id="menu">
    <Card v-for="value in menu.menuList" :data="value" />
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
