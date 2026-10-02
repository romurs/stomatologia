<script setup lang="ts">
import HeaderLogo from "./Header/HeaderLogo.vue";
import NavBtn from "./Header/nav-btn.vue";
import NavBtn_mobile from "./Header/nav-btn_mobile.vue";
import PageOverlay from "./Header/PageOverlay.vue";
import BurgerBtn from "./Header/BurgerBtn.vue";

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <PageOverlay :isMenuOpen="isMenuOpen" :toggle-fn="toggleMenu" />
  <transition name="menu-slide">
    <div class="mobile-menu" v-if="isMenuOpen" @click.stop>
      <NavBtn_mobile value="Услуги и цены" link="/price" :toggleFn="toggleMenu" />
      <NavBtn_mobile value="Врачи" link="/staff" :toggleFn="toggleMenu" />
      <NavBtn_mobile value="Акции" link="/#promotions" :toggleFn="toggleMenu" />
      <NavBtn_mobile value="Документы" link="/documents" :toggleFn="toggleMenu" />
      <NavBtn_mobile value="Контакты" link="/contacts" :toggleFn="toggleMenu" />
      <div class="mobile-menu__cta">
        <a href="tel:+78362733333" class="mobile-menu__phone">+7 (8362) 73-33-33</a>
        <NuxtLink to="/booking" class="btn btn-primary btn-block" @click="toggleMenu">Записаться на приём</NuxtLink>
      </div>
    </div>
  </transition>

  <header :class="{ 'header-scrolled': isScrolled }">
    <div class="topbar">
      <div class="wrap topbar__inner">
        <div class="topbar__info">
          <span>ПН–ПТ 09:00–20:00, СБ 09:00–16:00</span>
          <span class="dot">•</span>
          <span>Йошкар-Ола, ул. Строителей, 1Б</span>
        </div>
        <div class="topbar__actions">
          <a href="tel:+78362733333">+7 (8362) 73-33-33</a>
          <NuxtLink to="/booking" class="topbar__cta">Записаться онлайн</NuxtLink>
        </div>
      </div>
    </div>

    <div class="mainbar">
      <div class="wrap header-container">
        <HeaderLogo :isScrolled="false" />

        <nav class="nav-btns">
          <NavBtn value="Услуги и цены" link="/price" />
          <NavBtn value="Врачи" link="/staff" />
          <NavBtn value="Акции" link="/#promotions" />
          <NavBtn value="Документы" link="/documents" />
          <NavBtn value="Контакты" link="/contacts" />
        </nav>

        <div class="header-cta">
          <a href="tel:+78362733333" class="header-cta__phone">+7 (8362) 73-33-33</a>
          <NuxtLink to="/booking" class="btn btn-primary btn-sm">Записаться</NuxtLink>
        </div>

        <BurgerBtn :isMenuOpen="isMenuOpen" :toggleFn="toggleMenu" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  font-weight: 700;
  transition: box-shadow 0.25s ease;
}

.header-scrolled {
  box-shadow: var(--shadow-md);
}

.topbar {
  background: var(--color-primary-700);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.82rem;
  font-weight: 400;

  @media (max-width: 1000px) {
    display: none;
  }
}

.topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}

.topbar__info {
  display: flex;
  align-items: center;
  gap: 8px;

  .dot {
    opacity: 0.6;
  }
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 18px;

  a {
    color: #fff;
  }
  a:hover {
    opacity: 0.85;
  }
}

.topbar__cta {
  text-decoration: underline;
}

.mainbar {
  background: var(--color-primary);
  height: 72px;

  @media (max-width: 1000px) {
    height: 64px;
  }
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-btns {
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 32px;

  @media (max-width: 1080px) {
    display: none;
  }
}

.header-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;

  @media (max-width: 1080px) {
    margin-left: auto;
  }

  @media (max-width: 1000px) {
    display: none;
  }
}

.header-cta__phone {
  color: #fff;
  font-weight: 700;
}
.header-cta__phone:hover {
  opacity: 0.85;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.menu-slide-enter-to,
.menu-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-primary-700);
  z-index: 999;
  padding: 76px 20px 24px;
  font-weight: 700;
}

.mobile-menu__cta {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-menu__phone {
  color: #fff;
  text-align: center;
  font-size: 1.05rem;
}
</style>
