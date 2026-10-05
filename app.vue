<script setup lang="ts">
import FooterItem from "./components/FooterItem.vue";
import HeaderItem from "./components/HeaderItem.vue";
import StickyCallBar from "./components/StickyCallBar.vue";
</script>

<template>
  <div class="wrapper">
    <HeaderItem />
    <main>
      <NuxtPage />
    </main>
    <FooterItem />
    <StickyCallBar />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 1000px) {
    padding-bottom: 64px;
  }
}

main {
  flex: 1 0 auto;
  padding-top: 72px;

  @media (max-width: 1000px) {
    padding-top: 64px;
  }
}
</style>
