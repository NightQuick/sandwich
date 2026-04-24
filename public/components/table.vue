<script setup lang="ts">
import { pubSub } from '@script/dataProcessing/pubSub';
import { ref, watch } from 'vue';
import { switcherTable } from '@constants';
import { slider } from '@script/UI/tableAnimate';
import { menuState } from '@script/dataProcessing/menuState';
let currentMenu = menuState.currentMenu;
pubSub.publish('menuType', { message: 'User changed menu category', data: { category: 'pizza' } });
watch(currentMenu, () => {
  const category = currentMenu.value;
  pubSub.publish('menuType', { message: 'User changed menu category', data: { category } });
});

function switcherClickHandler(event: MouseEvent, key: string) {
  currentMenu.value = key;
}
slider.create();
</script>

<template>
  <tr
    v-for="(menuType, key) in switcherTable"
    @click="switcherClickHandler($event, key)"
    :class="{ 'menu-switcher-active': key == currentMenu }"
  >
    <td :id="menuType.id" class="menu-button">
      {{ menuType.content }}
    </td>
  </tr>
</template>

<style>
#menu-switcher {
  margin-top: 1em;
  background-color: white;
  border-radius: 0.2em;
  box-shadow: 0px 0px 4px black;
  width: 250px;
  font-size: 20px;
  position: relative;
  border-collapse: collapse;
}
.menu-button {
  display: flex;
  justify-content: center;
  margin: 0.5em;
  cursor: pointer;
  position: relative;
  z-index: 1;
  color: black;
  user-select: none;
}
.menu-switcher-active {
  background-color: var(--color-brand);
}

.menu-switcher-inactive {
  background-color: white;
}
</style>
