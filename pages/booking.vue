<script setup lang="ts">
useHead({
  title: "Запись на приём | Стоматология «Для Вас»",
  meta: [{ name: "description", content: "Онлайн-запись на приём к стоматологу в клинике «Для Вас», Йошкар-Ола." }],
});

const route = useRoute();
</script>

<template>
  <div class="booking-page">
    <div class="wrap">
      <div class="booking-page__head">
        <span class="eyebrow">Запись онлайн</span>
        <h1>Записаться на приём</h1>
        <p>Заполните форму — администратор перезвонит для подтверждения удобного времени</p>
      </div>

      <div class="booking-page__layout">
        <PagesIndexBookingForm
          :preset-service="(route.query.services as string) || ''"
          :preset-doctor="(route.query.doctor as string) || ''"
        />

        <div class="booking-page__aside">
          <div class="card booking-page__card">
            <h3>Или свяжитесь напрямую</h3>
            <a href="tel:+78362733333" class="booking-page__contact">📞 +7 (8362) 73-33-33</a>
            <a href="https://wa.me/79027437080" target="_blank" rel="noopener" class="booking-page__contact">💬 WhatsApp</a>
            <p class="booking-page__hours">ПН–ПТ 09:00–20:00, СБ 09:00–16:00</p>
          </div>

          <div class="card booking-page__card">
            <h3>Первый визит бесплатный</h3>
            <p>Осмотр и консультация с составлением плана лечения не оплачиваются при первом обращении.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booking-page {
  padding: 48px 0 64px;
}

.booking-page__head {
  text-align: center;
  max-width: 560px;
  margin: 0 auto 36px;

  h1 {
    margin: 12px 0;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
  }
}

.booking-page__layout {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 24px;
  align-items: start;
  max-width: 980px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.booking-page__aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.booking-page__card {
  padding: 22px;

  h3 {
    margin-bottom: 12px;
    font-size: 1rem;
  }

  p {
    font-size: 0.88rem;
    color: var(--color-text-muted);
  }
}

.booking-page__contact {
  display: block;
  font-weight: 700;
  color: var(--color-primary-700);
  margin-bottom: 8px;
}

.booking-page__hours {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 10px;
}
</style>
