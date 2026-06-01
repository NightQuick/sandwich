<script setup lang="ts">
import { switcherTable } from '@constants';
import { slider } from '@script/UI/tableAnimate';
import { useMenuStore } from '@/stores/menuStore';
const menu = useMenuStore();

function switcherClickHandler(event: MouseEvent, key: string) {
  menu.currentMenu = key;
}
// slider.create();
</script>

<template>
  <table id="menu-switcher">
    <tr
      v-for="(menuType, key) in switcherTable"
      @click="switcherClickHandler($event, key)"
      :class="{ 'menu-switcher-active': key == menu.currentMenu }"
    >
      <td :id="menuType.id" class="menu-button">
        {{ menuType.content }}
      </td>
    </tr>
  </table>
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

.menu-slider {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: rgba(255, 191, 0, 0.49);
  border-radius: 0.2em;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 0;
}

.menu-slider--visible {
  opacity: 1;
}
</style>
