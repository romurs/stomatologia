<script setup lang="ts">
import { reviews, averageRating } from "~/data/reviews";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
};
</script>

<template>
  <section class="section reviews">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Отзывы</span>
        <h2>Что говорят пациенты</h2>
        <p>
          Средняя оценка
          <strong>{{ averageRating }}</strong>
          из 5 на основе отзывов пациентов
        </p>
      </div>

      <div class="reviews__grid">
        <div class="reviews__card card" v-for="review in reviews" :key="review.name + review.date">
          <div class="reviews__stars" aria-hidden="true">
            <span v-for="n in 5" :key="n" :class="{ 'reviews__star--filled': n <= review.rating }">★</span>
          </div>
          <p class="reviews__text">«{{ review.text }}»</p>
          <div class="reviews__footer">
            <div>
              <div class="reviews__name">{{ review.name }}</div>
              <div class="reviews__service">{{ review.service }}</div>
            </div>
            <div class="reviews__date">{{ formatDate(review.date) }}</div>
          </div>
        </div>
      </div>

      <p class="reviews__note">
        Отзывы модерируются администрацией клиники.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.reviews__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.reviews__card {
  padding: 24px;
}

.reviews__stars {
  color: var(--color-border);
  font-size: 1.1rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.reviews__star--filled {
  color: var(--color-warning);
}

.reviews__text {
  color: var(--color-ink);
  margin-bottom: 18px;
}

.reviews__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid var(--color-border);
  padding-top: 14px;
}

.reviews__name {
  font-weight: 700;
  color: var(--color-ink);
  font-size: 0.92rem;
}

.reviews__service {
  font-size: 0.8rem;
  color: var(--color-primary-700);
}

.reviews__date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.reviews__note {
  text-align: center;
  margin-top: 20px;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-style: italic;
}
</style>
