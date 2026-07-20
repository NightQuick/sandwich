import { onMounted, onUnmounted, type Ref } from 'vue';

export function useClickOutside(target: Ref<HTMLElement | null>, callback: () => void) {
  function handleClick(event: MouseEvent) {
    if (target.value && !target.value.contains(event.target as Node)) {
      callback();
    }
  }

  onMounted(() => document.addEventListener('mousedown', handleClick));
  onUnmounted(() => document.removeEventListener('mousedown', handleClick));
}
