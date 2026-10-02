<script setup lang="ts">
defineProps<{
  title: string;
  file?: string;
}>();
</script>

<template>
  <a v-if="file" :href="file" target="_blank" rel="noopener" class="doc-card">
    <span class="doc-card__icon">📄</span>
    <span class="doc-card__title">{{ title }}</span>
    <span class="doc-card__action">Открыть →</span>
  </a>
  <div v-else class="doc-card doc-card--soon">
    <span class="doc-card__icon">📄</span>
    <span class="doc-card__title">{{ title }}</span>
    <span class="doc-card__action doc-card__action--muted">Скан появится позже</span>
  </div>
</template>

<style scoped lang="scss">
.doc-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  transition: all 0.2s ease;
}

a.doc-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.doc-card--soon {
  opacity: 0.7;
}

.doc-card__icon {
  font-size: 1.6rem;
}

.doc-card__title {
  font-weight: 600;
  color: var(--color-ink);
  font-size: 0.92rem;
}

.doc-card__action {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-primary);
}

.doc-card__action--muted {
  color: var(--color-text-muted);
  font-weight: 400;
}
</style>
