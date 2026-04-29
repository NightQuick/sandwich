<script setup lang="ts">
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
</script>

<template id="basket-content-template">
  <tr>
    <td>{{ props.position.name }}</td>
    <td>{{ props.position.price }}</td>
    <td>{{ props.position.value }}</td>
    <td @click="removeCurrentPosition" class="remove-from-basket-button">x</td>
  </tr>
</template>

<style>
#remove-from-basket-button {
  cursor: pointer;
}
</style>
