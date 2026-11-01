<script setup lang="ts">
const { data: reviews } = await useReviews();

const years = new Date().getFullYear() - CLINIC.foundedYear;
const rating = computed(() => reviews.value.average_rating);
</script>

<template>
  <section class="hero">
    <div class="wrap hero__inner">
      <div class="hero__text">
        <div class="badge badge-accent hero__eyebrow">Стоматология «Для Вас» · с 2008 года</div>
        <h1>Лечим красиво, честно и без лишней боли</h1>
        <p class="hero__lead">
          Терапия, хирургия, имплантация и протезирование в Йошкар-Оле. Прозрачные цены,
          гарантия на работы и запись без очередей.
        </p>

        <div class="hero__actions">
          <NuxtLink to="/booking" class="btn btn-primary">Записаться на приём</NuxtLink>
          <a :href="CLINIC.phone.href" class="btn btn-outline">Позвонить: 73-33-33</a>
        </div>

        <ul class="hero__points">
          <li>✅ Бесплатная консультация при первом обращении</li>
          <li>✅ Гарантия на лечение и протезирование</li>
          <li>✅ Пн–Пт до 20:00, Сб до 16:00</li>
        </ul>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="hero__visual-card hero__visual-card--rating" v-if="rating">
          <span class="hero__visual-score">{{ rating.toFixed(1) }}</span>
          <span>средняя оценка пациентов</span>
        </div>
        <div class="hero__visual-card hero__visual-card--experience">
          <span class="hero__visual-score">{{ years }}</span>
          <span>{{ plural(years, ["год", "года", "лет"]) }} работы клиники</span>
        </div>
        <div class="hero__blob"></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-600) 55%, var(--color-primary-700) 100%);
  padding: 56px 0 88px;
  position: relative;
  overflow: hidden;

  @media (max-width: 720px) {
    padding: 32px 0 56px;
  }
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.hero__eyebrow {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  margin-bottom: 18px;
}

.hero__text h1 {
  color: #fff;
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  margin-bottom: 18px;
}

.hero__lead {
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.08rem;
  max-width: 520px;
  margin-bottom: 28px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 28px;
}

.hero__points {
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    color: rgba(255, 255, 255, 0.92);
    font-size: 0.94rem;
  }
}

.hero__visual {
  position: relative;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
}

.hero__blob {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 320px;
  height: 320px;
  border-radius: 45% 55% 60% 40% / 50% 45% 55% 50%;
  background: rgba(255, 255, 255, 0.12);
}

.hero__visual-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-lg);
  padding: 20px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
}

.hero__visual-card--rating {
  transform: translate(-70px, -40px);
}

.hero__visual-card--experience {
  transform: translate(70px, 60px);
}

.hero__visual-score {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 4px;
}
</style>
