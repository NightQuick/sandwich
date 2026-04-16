<script setup lang="ts">
import { basket } from '@script/elements/basket';

// import { defineProps } from 'vue';
interface Position {
  name: string;
  price: number;
  value: number;
}

const props = defineProps<{
  position: Position;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'remove:position', indexToRemove: number): void;
}>();

const removeCurrentPosition = () => {
  emit('remove:position', props.index);
};
// props.positionList.splice(props.index, 1);
</script>

<template id="basket-content-template">
  <tr>
    <td>{{ props.position.name }}</td>
    <td>{{ props.position.price }}</td>
    <td>{{ props.position.value }}</td>
    <td @click="removeCurrentPosition" id="remove-from-basket-button">x</td>
  </tr>
</template>

<style>
#remove-from-basket-button {
  cursor: pointer;
}
</style>
