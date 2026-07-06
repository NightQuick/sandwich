<script setup lang="ts">
function openLoginModal() {}
</script>

<template>
  <header>
    <span id="heading"> СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА </span>
    <button id="login-button" @click="openLoginModal()">Войти</button>
  </header>
</template>
<style>
#login-button {
  float: right;
  width: 200px;
  margin-right: 10px;
  margin-top: 5px;
  border: 0;
  border-radius: 3px;
  background-color: var(--color-brand);
  color: white;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  font-size: 22px;
  box-shadow:
    0px 0px 5px rgba(0, 0, 0, 0.5),
    0px 2px 0px rgba(0, 0, 0, 0.5);
}
</style>
