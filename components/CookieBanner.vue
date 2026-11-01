<script setup lang="ts">
const { hasChoice, settingsOpen, acceptAll, acceptNecessary } = useCookieConsent();

const visible = computed(() => !hasChoice.value || settingsOpen.value);
</script>

<template>
  <transition name="cookie-slide">
    <div v-if="visible" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Использование файлов cookie">
      <div class="cookie-banner__inner">
        <p class="cookie-banner__text">
          Мы используем файлы cookie: необходимые — для работы сайта, сторонние — для отображения
          Яндекс&nbsp;Карт. Нажимая «Принять все», вы соглашаетесь на обработку cookie в соответствии с
          <NuxtLink to="/cookies">Политикой использования cookie</NuxtLink> и
          <NuxtLink to="/privacy">Политикой обработки персональных данных</NuxtLink>.
          Вы можете отказаться от необязательных cookie.
        </p>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn-primary btn-sm" @click="acceptAll">Принять все</button>
          <button type="button" class="btn btn-ghost btn-sm" @click="acceptNecessary">Только необходимые</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.cookie-banner {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 1100;
  display: flex;
  justify-content: center;

  @media (max-width: 1000px) {
    left: 8px;
    right: 8px;
    bottom: 72px; // над мобильной панелью «Позвонить / Записаться»
  }
}

.cookie-banner__inner {
  max-width: 960px;
  width: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 14px 16px;
  }
}

.cookie-banner__text {
  font-size: 0.86rem;
  line-height: 1.5;

  a {
    color: var(--color-primary-700);
    text-decoration: underline;
  }
}

.cookie-banner__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 760px) {
    flex-direction: row;

    .btn {
      flex: 1;
      white-space: normal;
    }
  }
}

.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: all 0.3s ease;
}
.cookie-slide-enter-from,
.cookie-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
