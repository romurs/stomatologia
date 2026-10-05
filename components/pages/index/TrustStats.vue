<script setup lang="ts">
const stats = [
  { value: "15+", label: "лет на рынке Йошкар-Олы" },
  { value: "8 000+", label: "пациентов" },
  { value: "6", label: "врачей разных специализаций" },
  { value: "4.9", label: "средняя оценка пациентов" },
];
</script>

<template>
  <section class="stats">
    <div class="wrap stats__grid">
      <div class="stats__item" v-for="stat in stats" :key="stat.label">
        <div class="stats__value">{{ stat.value }}</div>
        <div class="stats__label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats {
  margin-top: -56px;
  position: relative;
  z-index: 2;

  @media (max-width: 720px) {
    margin-top: -32px;
  }
}

.stats__grid {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 28px 12px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 20px;
    padding: 24px 12px;
  }
}

.stats__item {
  text-align: center;
  padding: 0 12px;
  border-right: 1px solid var(--color-border);

  &:last-child {
    border-right: none;
  }

  @media (max-width: 720px) {
    &:nth-child(2n) {
      border-right: none;
    }
  }
}

.stats__value {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 800;
  color: var(--color-primary);
}

.stats__label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 4px;
}
</style>
