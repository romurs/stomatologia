<script setup lang="ts">
defineProps({
  isMenuOpen: Boolean,
  toggleFn: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true,
  },
});
</script>

<template>
  <transition name="overlay-fade">
    <div class="page-overlay" v-if="isMenuOpen" @click="toggleFn"></div>
  </transition>
</template>

<style scoped lang="scss">
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

.page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
