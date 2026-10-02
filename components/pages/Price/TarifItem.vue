<script setup lang="ts">
defineProps<{
  title: string;
  price: number | null;
  note?: string;
}>();

const formatMoney = (value: number) => new Intl.NumberFormat("ru-RU").format(value);
</script>

<template>
  <div class="tarif-item">
    <p class="tarif-item__title">{{ title }}</p>
    <p class="tarif-item__price">{{ price !== null ? `${formatMoney(price)} ₽` : note }}</p>
  </div>
</template>

<style scoped lang="scss">
.tarif-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.tarif-item__title {
  color: var(--color-ink);
  font-size: 0.94rem;
}

.tarif-item__price {
  color: var(--color-primary-700);
  font-weight: 700;
  font-size: 0.94rem;
  white-space: nowrap;
}
</style>
