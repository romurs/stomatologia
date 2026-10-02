<script setup lang="ts">
type Direction = "up" | "right" | "down" | "left";

const props = defineProps<{
  direction: Direction,
  color?: string
}>();

const rotationDegrees: Record<Direction, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

// Вычисляем стиль для transform
const imageStyle = computed(() => ({
  transform: `rotate(${rotationDegrees[props.direction]}deg)`,
  color: `${props.color}`,
}));
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="32"
    viewBox="0 0 448 512"
    class="angle"
    :style="imageStyle"
  >
    <path
      fill="currentColor"
      d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3L86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
    />
  </svg>
</template>

<style scoped lang="scss">
.angle {
  width: 100%;
  height: 100%;
  display: block;
  color: var(--elements-bg-color);
}
</style>
