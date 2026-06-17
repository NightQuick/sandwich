<script setup lang="ts">
import Basket from './basket.vue';
import Header from './header.vue';
import Menu from './menu.vue';
import Order from './order.vue';
import SandwichBuilder from './sandwichBuilder.vue';
import Table from './table.vue';
</script>

<template>
  <Header></Header>
  <div id="main-sheet">
    <div id="active-panel">
      <Table></Table>
      <Basket></Basket>
    </div>
    <Menu></Menu>
  </div>
  <SandwichBuilder></SandwichBuilder>
  <Order></Order>
</template>

<style>
:root {
  --color-brand: #ffc000;
  --selected-card-bg: #fdd55c;
  --card-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  --unselected-card-bg: #ebeae8;
  --close-message-button: #ac8100;
  --basket-text: #545045;
  --order-text: #545045;
}
.no-scroll {
  overflow: hidden;
}

body {
  font-family: 'Roboto Condensed', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: #ebeae8;
  margin: 0;
}

header {
  width: 100%;
  text-align: center;
  background-color: #f1f1f1;
}

#heading {
  font-size: 32px;
  color: rgb(63, 63, 63);
  margin: 0;
  padding-top: 20px;
}

#main-sheet {
  display: flex;
  margin-left: 1vw;
  margin-right: 1vw;
}

/* Панель слева */
#active-panel {
  width: 250px;
}

/* Меню */
#menu-wrapper {
  display: grid;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 250px);
}
</style>
