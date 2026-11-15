<script setup lang="ts">
import { NuxtLink } from "#components";

defineProps({
  isScrolled: Boolean,
});
</script>

<template>
  <div class="header_logo">
    <NuxtLink to="/">
      <div
        class="logo"
        :class="{ 'logo-scrolled': isScrolled }"
      > <img class="logo" src="/main_logo4.png" alt="Стоматология «Для Вас» — на главную"> </div>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@media (min-width: 1050px) {
  .header_logo {
    position: relative;
    align-items: center;
    width: 12rem;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .logo {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    max-height: 64px;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .header_logo:hover {
    scale: 1.1;
    transition: all 0.3s ease;
  }
}
@media (max-width: 1050px) {
  .header_logo {
    position: relative;
    align-items: center;
    width: 36rem;
    z-index: 1000;
  }

  .logo {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    max-height: 64px;
    height: 100%;
    width: auto;
    transition: all 0.3s ease;
  }
}
</style>
