import { onUnmounted } from 'vue';

export function useBodyScrollLock() {
  const lock = () => document.body.classList.add('no-scroll');
  const unlock = () => document.body.classList.remove('no-scroll');

  onUnmounted(() => unlock());

  return { lock, unlock };
}
