<script setup lang="ts">
defineProps<{
  subtitle: string;
  description: string;
}>();
</script>

<template>
  <div class="row-contacts">
    <p class="row-contacts__subtitle">{{ subtitle }}</p>
    <p class="row-contacts__description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.row-contacts {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 12px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}

.row-contacts__subtitle {
  font-weight: 700;
  color: var(--color-ink);
  font-size: 0.9rem;
}

.row-contacts__description {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
