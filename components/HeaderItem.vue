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

const { settings: a11y, panelOpen: a11yPanelOpen, enable: enableA11y } = useAccessibility();

// Первое нажатие включает версию для слабовидящих, повторные — показывают/скрывают панель настроек
const onA11yClick = () => {
  if (!a11y.value.enabled) {
    enableA11y();
  } else {
    a11yPanelOpen.value = !a11yPanelOpen.value;
  }
  if (isMenuOpen.value) toggleMenu();
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
        <a :href="CLINIC.phone.href" class="mobile-menu__phone">{{ CLINIC.phone.text }}</a>
        <NuxtLink to="/booking" class="btn btn-primary btn-block" @click="toggleMenu">Записаться на приём</NuxtLink>
      </div>
    </div>
  </transition>

  <header :class="{ 'header-scrolled': isScrolled }">
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
          <a :href="CLINIC.phone.href" class="header-cta__phone">{{ CLINIC.phone.text }}</a>
          <NuxtLink to="/booking" class="btn btn-primary btn-sm">Записаться</NuxtLink>
        </div>

        <BurgerBtn :isMenuOpen="isMenuOpen" :toggleFn="toggleMenu" />

        <button
          type="button"
          class="a11y-toggle"
          :aria-pressed="a11y.enabled"
          :title="a11y.enabled ? 'Настройки версии для слабовидящих' : 'Версия для слабовидящих'"
          :aria-label="a11y.enabled ? 'Настройки версии для слабовидящих' : 'Версия для слабовидящих'"
          @click="onA11yClick"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 5C6.5 5 2.7 9.4 1.5 11.4a1.2 1.2 0 0 0 0 1.2C2.7 14.6 6.5 19 12 19s9.3-4.4 10.5-6.4a1.2 1.2 0 0 0 0-1.2C21.3 9.4 17.5 5 12 5Zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9Zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
            />
          </svg>
          <span class="a11y-toggle__text">{{ a11y.enabled ? "Настройки" : "Для слабовидящих" }}</span>
        </button>
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

.a11y-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 16px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }

  @media (max-width: 1000px) {
    margin-left: 4px;
    padding: 6px;
    background: none;
    border: none;

    .a11y-toggle__text {
      display: none;
    }
  }
}

@media (max-width: 1280px) and (min-width: 1001px) {
  .a11y-toggle__text {
    display: none;
  }
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
