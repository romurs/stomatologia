<script setup lang="ts">
</script>

<template>
  <section id="contacts" class="section map-section">
    <div class="wrap map-section__layout">
      <div class="map-section__info card">
        <h2>Как нас найти</h2>

        <div class="map-section__row">
          <span class="map-section__icon">📍</span>
          <div>
            <strong>Адрес</strong>
            <p>{{ CLINIC.address }}</p>
          </div>
        </div>

        <div class="map-section__row">
          <span class="map-section__icon">🕒</span>
          <div>
            <strong>Режим работы</strong>
            <p>{{ clinicHoursText() }}</p>
          </div>
        </div>

        <div class="map-section__row">
          <span class="map-section__icon">📞</span>
          <div>
            <strong>Телефон</strong>
            <p><a :href="CLINIC.phone.href">{{ CLINIC.phone.text }}</a>, <a :href="CLINIC.phone2.href">{{ CLINIC.phone2.text }}</a></p>
          </div>
        </div>

        <NuxtLink to="/booking" class="btn btn-primary btn-block">Записаться на приём</NuxtLink>
      </div>

      <div class="map-section__map">
        <YandexMap />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.map-section__layout {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 24px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.map-section__info {
  padding: 28px;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 18px;
  }
}

.map-section__row {
  display: flex;
  gap: 14px;
  margin-bottom: 18px;

  strong {
    display: block;
    font-size: 0.88rem;
    color: var(--color-ink);
    margin-bottom: 2px;
  }

  p {
    font-size: 0.88rem;
    color: var(--color-text-muted);
  }

  a {
    color: var(--color-primary-700);
    font-weight: 600;
  }
}

.map-section__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.map-section__info .btn {
  margin-top: auto;
}

.map-section__map {
  min-height: 340px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}
</style>
