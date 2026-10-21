<script setup lang="ts">
const { data: serviceCategories } = await useServices();
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Направления лечения</span>
        <h2>Все услуги в одной клинике</h2>
        <p>От профилактики до сложной имплантации — не нужно ездить по разным клиникам</p>
      </div>

      <div class="services-grid">
        <NuxtLink
          v-for="category in serviceCategories"
          :key="category.slug"
          :to="`/price#${category.slug}`"
          class="service-card"
        >
          <div class="service-card__icon">{{ category.icon }}</div>
          <h3>{{ category.title }}</h3>
          <p>{{ category.shortDescription }}</p>
          <span class="service-card__link">Смотреть цены →</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services-grid {
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

.service-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 26px 22px;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.service-card__icon {
  font-size: 2.1rem;
  margin-bottom: 12px;
}

.service-card h3 {
  font-size: 1.05rem;
  margin-bottom: 8px;
}

.service-card p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  flex: 1;
}

.service-card__link {
  margin-top: 14px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary);
}
</style>
