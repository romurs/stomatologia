<script setup lang="ts">
// Виджет Яндекс Карт устанавливает сторонние cookie, поэтому загружается
// только после согласия пользователя на все cookie.
const { allowThirdParty, acceptAll } = useCookieConsent();
</script>

<template>
  <iframe
    v-if="allowThirdParty"
    :src="CLINIC.yandexMapEmbed"
    width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
    title="Карта: как добраться до клиники"
    class="ymap"
  ></iframe>
  <div v-else class="ymap-placeholder">
    <span class="ymap-placeholder__icon" aria-hidden="true">📍</span>
    <p><strong>{{ CLINIC.address }}</strong></p>
    <p class="ymap-placeholder__note">
      Карта от Яндекса использует сторонние cookie и показывается только с вашего согласия.
    </p>
    <div class="ymap-placeholder__actions">
      <button type="button" class="btn btn-ghost btn-sm" @click="acceptAll">Разрешить cookie и показать карту</button>
      <a :href="CLINIC.yandexMapLink" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
        Открыть в Яндекс Картах
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ymap {
  display: block;
  border: 0;
  min-height: 340px;
}

.ymap-placeholder {
  height: 100%;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
  background: var(--color-primary-50);
}

.ymap-placeholder__icon {
  font-size: 2rem;
}

.ymap-placeholder__note {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  max-width: 380px;
}

.ymap-placeholder__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 6px;

  .btn {
    white-space: normal;
  }
}
</style>
