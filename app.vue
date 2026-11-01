<script setup lang="ts">
import FooterItem from "./components/FooterItem.vue";
import HeaderItem from "./components/HeaderItem.vue";
import StickyCallBar from "./components/StickyCallBar.vue";
import AccessibilityPanel from "./components/AccessibilityPanel.vue";
import CookieBanner from "./components/CookieBanner.vue";

const { htmlClass } = useAccessibility();

useHead({
  htmlAttrs: {
    lang: "ru",
    class: htmlClass,
  },
});
</script>

<template>
  <div class="wrapper">
    <a href="#main-content" class="skip-link">Перейти к основному содержанию</a>
    <HeaderItem />
    <main id="main-content">
      <AccessibilityPanel />
      <NuxtPage />
    </main>
    <FooterItem />
    <StickyCallBar />
    <CookieBanner />
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

.skip-link {
  position: absolute;
  left: 8px;
  top: -100px;
  z-index: 2000;
  background: #fff;
  color: #000;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;

  &:focus {
    top: 8px;
  }
}
</style>
