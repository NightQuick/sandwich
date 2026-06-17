<script setup>
import { onMounted } from 'vue';
import Card from './card.vue';
import { useMenuStore } from '@/stores/menuStore';
const menu = useMenuStore();
onMounted(() => {
  menu.init();
});
</script>

<template>
  <div id="menu-wrapper">
    <div id="menu">
      <Card v-for="value in menu.menuList" :data="value" />
    </div>
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
