<script setup lang="ts">
import { promotions } from "~/data/promotions";
</script>

<template>
  <section id="promotions" class="section promotions">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Выгода</span>
        <h2>Актуальные акции</h2>
        <p>Уточняйте детали и срок действия у администратора при записи</p>
      </div>

      <div class="promotions__grid">
        <div class="promotions__card card" v-for="promo in promotions" :key="promo.title">
          <div class="promotions__badge">{{ promo.badge }}</div>
          <h3>{{ promo.title }}</h3>
          <p>{{ promo.description }}</p>
          <span class="promotions__until" v-if="promo.until">{{ promo.until }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.promotions {
  background: var(--color-surface-alt);
  border-radius: var(--radius-xl);
  margin: 0 auto;
  max-width: calc(var(--container-width) + 48px);
}

.promotions__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.promotions__card {
  padding: 26px 22px;
  position: relative;
}

.promotions__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  background: var(--color-accent-100);
  color: var(--color-accent-600);
  font-weight: 800;
  margin-bottom: 14px;
}

.promotions__card h3 {
  font-size: 1rem;
  margin-bottom: 8px;
}

.promotions__card p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.promotions__until {
  display: inline-block;
  margin-top: 12px;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  font-style: italic;
}
</style>
