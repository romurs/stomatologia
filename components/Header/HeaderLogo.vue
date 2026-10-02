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
        class="logo logo_white"
        :class="{ 'logo-scrolled': isScrolled }"
      ></div>
      <div
        class="logo logo_color"
        :class="{ 'logo-scrolled': isScrolled }"
      ></div>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@media (min-width: 1000px) {
  .header_logo {
    position: relative;
    align-items: center;
    width: 12rem;
  }

  .logo {
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
  }

  .logo_color {
    opacity: 0;
    &.logo-scrolled {
      background-image: url(/Short_Logo_Color.svg);
    }
    &:not(.logo-scrolled) {
      background-image: url(/Logo_Color.svg);
    }
  }

  .logo_white {
    &.logo-scrolled {
      background-image: url(/Short_Logo_White.svg);
    }
    &:not(.logo-scrolled) {
      background-image: url(/Logo_White.svg);
    }
  }

  .header_logo:hover {
    scale: 1.1;
    .logo_color {
      opacity: 1;
    }
    .logo {
      transform: rotate(-3deg);
    }
    transition: all 0.3s ease;
  }
}
@media (max-width: 1000px) {
  .header_logo {
    position: relative;
    align-items: center;
    width: 6rem;
  }

  .logo {
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
  }

  .logo_white {
    background-image: url(/Short_Logo_White.svg);
  }
}
</style>
