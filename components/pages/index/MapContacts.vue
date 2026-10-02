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
            <p>Республика Марий Эл, г. Йошкар-Ола, ул. Строителей, 1Б, 2 этаж</p>
          </div>
        </div>

        <div class="map-section__row">
          <span class="map-section__icon">🕒</span>
          <div>
            <strong>Режим работы</strong>
            <p>ПН–ПТ 09:00–20:00, СБ 09:00–16:00, ВС — выходной</p>
          </div>
        </div>

        <div class="map-section__row">
          <span class="map-section__icon">📞</span>
          <div>
            <strong>Телефон</strong>
            <p><a href="tel:+78362733333">+7 (8362) 73-33-33</a>, <a href="tel:+79027437080">+7 902 743-70-80</a></p>
          </div>
        </div>

        <div class="map-section__row">
          <span class="map-section__icon">✉️</span>
          <div>
            <strong>Email</strong>
            <p><a href="mailto:stoprots@yandex.ru">stoprots@yandex.ru</a></p>
          </div>
        </div>

        <NuxtLink to="/booking" class="btn btn-primary btn-block">Записаться на приём</NuxtLink>
      </div>

      <div class="map-section__map">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=47.832581%2C56.639343&mode=poi&poi%5Bpoint%5D=47.832481%2C56.639388&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1331474234&z=17"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
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
