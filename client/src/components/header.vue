<script setup lang="ts">
import { ref, watch } from 'vue';
import LoginModal from './loginModal.vue';
import { useBodyScrollLock } from '@script/composables/useBodyScrollLock.js';
import { useClickOutside } from '@script/composables/useClickOutside.js';
import { useAuthStore } from '@/stores/sessionStore.js';

const authStore = useAuthStore();
const openModal = ref(false);
function updateVisibility(newValue: boolean) {
  openModal.value = newValue;
}
const { lock, unlock } = useBodyScrollLock();
watch(openModal, () => {
  if (openModal.value) {
    lock();
  } else {
    unlock();
  }
});

const dropdownRef = ref<HTMLElement | null>(null);
useClickOutside(dropdownRef, () => {
  openModal.value = false;
});

const sessionStore = useAuthStore();
sessionStore.refreshToken();
</script>
<template>
  <header>
    <span id="heading"> СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА </span>
    <button id="login-button" @click="updateVisibility(true)" v-if="!authStore.user">Войти</button>
    <button id="logged-button" v-if="authStore.user" @click="authStore.logout">
      {{ authStore.user.email }}
    </button>
  </header>
  <div ref="dropdownRef">
    <LoginModal v-if="openModal" id="login-modal" @login="updateVisibility"></LoginModal>
  </div>
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

#login-modal {
  position: absolute;
  right: 10px;
  width: 400px;
  height: fit-content;
  padding-bottom: 50px;
  background-color: white;
  z-index: 10;
}
</style>
