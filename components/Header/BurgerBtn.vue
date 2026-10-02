<script setup lang="ts">
import Angle from "./Angle.vue";
defineProps({
  isMenuOpen: Boolean,
  toggleFn: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true,
  },
});
</script>

<template>
  <button class="burger-btn" @click="toggleFn">
    <div class="burger-btn__angle">
      <Angle color="#fff" v-if="!isMenuOpen" direction="down" />
      <Angle color="#fff" v-else direction="up" />
    </div>
  </button>
</template>

<style scoped lang="scss">
.burger-btn {
  height: 3.2rem;
  width: 100%;
  background: none;
  border: none;
  display: none;

  @media (max-width: 1000px) {
    display: block;
  }
}

.burger-btn__angle {
  float: right;
  margin-right: 16px;
  width: 25px;
  height: 25px;
}
</style>
