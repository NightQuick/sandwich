<script setup lang="ts">
import { useBodyScrollLock } from '@script/composables/useBodyScrollLock';
import { ref, watch } from 'vue';

const { lock, unlock } = useBodyScrollLock();

export const modalVisibility = ref(false);

watch(modalVisibility, () => {
  if (modalVisibility) {
    lock();
  } else {
    unlock();
  }
});
</script>

<template>
  <div v-if="modalVisibility"></div>
</template>

<style></style>
