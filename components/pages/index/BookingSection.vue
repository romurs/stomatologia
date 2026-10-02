<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <section id="booking" class="section booking-section">
    <div class="wrap booking-section__layout">
      <div class="booking-section__info">
        <span class="eyebrow">Запись онлайн</span>
        <h2>Запишитесь на приём за 1 минуту</h2>
        <p>
          Оставьте заявку — администратор перезвонит и подберёт удобное время. Это быстрее, чем ждать ответа в
          мессенджере, и без очереди в телефонную линию.
        </p>
        <ul class="booking-section__list">
          <li>📞 Перезвоним в течение рабочего дня</li>
          <li>🕒 Подберём время под ваш график</li>
          <li>🔒 Не передаём данные третьим лицам</li>
        </ul>
        <p class="booking-section__alt">
          Или позвоните: <a href="tel:+78362733333">+7 (8362) 73-33-33</a>
        </p>
      </div>

      <PagesIndexBookingForm
        :preset-service="(route.query.services as string) || ''"
        :preset-doctor="(route.query.doctor as string) || ''"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.booking-section {
  background: var(--color-surface-alt);
  border-radius: var(--radius-xl);
  margin: 0 auto;
  max-width: calc(var(--container-width) + 48px);
}

.booking-section__layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.booking-section__info {
  h2 {
    margin: 12px 0 14px;
    font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  }

  p {
    margin-bottom: 18px;
  }
}

.booking-section__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  li {
    font-size: 0.92rem;
    color: var(--color-text);
  }
}

.booking-section__alt {
  font-size: 0.92rem;

  a {
    color: var(--color-primary);
    font-weight: 700;
  }
}
</style>
