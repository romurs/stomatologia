<script setup lang="ts">
// Плавающая панель быстрых действий для мобильных — звонок, WhatsApp, запись.
// TODO: уточнить актуальную ссылку WhatsApp/Telegram клиники у заказчика.
</script>

<template>
  <div class="sticky-bar">
    <a href="tel:+78362733333" class="sticky-bar__item">
      <span class="sticky-bar__icon">📞</span>
      <span>Позвонить</span>
    </a>
    <a href="https://wa.me/79027437080" target="_blank" rel="noopener" class="sticky-bar__item">
      <span class="sticky-bar__icon">💬</span>
      <span>WhatsApp</span>
    </a>
    <NuxtLink to="/booking" class="sticky-bar__item sticky-bar__item--accent">
      <span class="sticky-bar__icon">🗓️</span>
      <span>Записаться</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.sticky-bar {
  display: none;

  @media (max-width: 1000px) {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    background: var(--color-surface);
    box-shadow: 0 -6px 20px rgba(16, 34, 44, 0.12);
    padding: 8px calc(env(safe-area-inset-bottom, 0px)) calc(6px + env(safe-area-inset-bottom, 0px));
  }
}

.sticky-bar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 4px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-text);
  border-radius: var(--radius-sm);
}

.sticky-bar__icon {
  font-size: 1.15rem;
}

.sticky-bar__item--accent {
  color: var(--color-accent);
}
</style>
