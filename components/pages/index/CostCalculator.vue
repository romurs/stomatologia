<script setup lang="ts">
import type { PriceItem } from "~/types/api";

const { data: serviceCategories } = await useServices();

const activeCategorySlug = ref(serviceCategories.value[0]?.slug ?? "");
const activeCategory = computed(
  () => serviceCategories.value.find((c) => c.slug === activeCategorySlug.value) ?? serviceCategories.value[0]
);

const selectedTitles = ref<Set<string>>(new Set());

const itemKey = (categorySlug: string, title: string) => `${categorySlug}::${title}`;

const isSelected = (title: string) => selectedTitles.value.has(itemKey(activeCategorySlug.value, title));

const toggle = (title: string) => {
  const key = itemKey(activeCategorySlug.value, title);
  const next = new Set(selectedTitles.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  selectedTitles.value = next;
};

const estimateFromNote = (note?: string): number => {
  if (!note) return 0;
  const match = note.replace(/\s/g, "").match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};

const selectedItems = computed(() => {
  const result: (PriceItem & { category: string })[] = [];
  for (const category of serviceCategories.value) {
    for (const item of category.items) {
      if (selectedTitles.value.has(itemKey(category.slug, item.title))) {
        result.push({ ...item, category: category.title });
      }
    }
  }
  return result;
});

const total = computed(() =>
  selectedItems.value.reduce((sum, item) => sum + (item.price ?? estimateFromNote(item.note)), 0)
);

const hasApproximate = computed(() => selectedItems.value.some((item) => item.price === null));

const formatMoney = (value: number) => new Intl.NumberFormat("ru-RU").format(value);

const bookingHref = computed(() => {
  if (selectedItems.value.length === 0) return "/booking";
  const services = selectedItems.value.map((item) => item.title).join(", ");
  return `/booking?services=${encodeURIComponent(services)}`;
});
</script>

<template>
  <section id="calculator" class="section calculator" v-if="activeCategory">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Полезный сервис</span>
        <h2>Рассчитайте примерную стоимость лечения</h2>
        <p>Отметьте нужные услуги — покажем ориентировочную сумму. Точную цену подтвердит врач на осмотре</p>
      </div>

      <div class="calculator__layout card">
        <div class="calculator__tabs">
          <button
            v-for="category in serviceCategories"
            :key="category.slug"
            class="calculator__tab"
            :class="{ 'calculator__tab--active': category.slug === activeCategorySlug }"
            @click="activeCategorySlug = category.slug"
          >
            <span>{{ category.icon }}</span> {{ category.title }}
          </button>
        </div>

        <div class="calculator__body">
          <div class="calculator__items">
            <label v-for="item in activeCategory.items" :key="item.title" class="calculator__item">
              <input type="checkbox" :checked="isSelected(item.title)" @change="toggle(item.title)" />
              <span class="calculator__item-title">{{ item.title }}</span>
              <span class="calculator__item-price">
                {{ item.price !== null ? `${formatMoney(item.price)} ₽` : item.note }}
              </span>
            </label>
          </div>

          <div class="calculator__summary">
            <h4>Ваш расчёт</h4>
            <p v-if="selectedItems.length === 0" class="calculator__empty">
              Отметьте одну или несколько услуг слева
            </p>
            <ul v-else class="calculator__selected">
              <li v-for="item in selectedItems" :key="item.title">{{ item.title }}</li>
            </ul>

            <div class="calculator__total">
              <span>Итого{{ hasApproximate ? " от" : "" }}</span>
              <strong>{{ formatMoney(total) }} ₽</strong>
            </div>
            <p class="calculator__note" v-if="hasApproximate">
              Часть услуг посчитана по нижней границе цены — итоговую стоимость уточнит врач
            </p>

            <NuxtLink :to="bookingHref" class="btn btn-primary btn-block">Записаться с этим расчётом</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.calculator__layout {
  padding: 8px;
}

.calculator__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 14px;
  border-bottom: 1px solid var(--color-border);
}

.calculator__tab {
  background: transparent;
  border: none;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.calculator__tab:hover {
  background: var(--color-primary-50);
}

.calculator__tab--active {
  background: var(--color-primary);
  color: #fff;
}

.calculator__body {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 0;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.calculator__items {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 420px;
  overflow-y: auto;
}

.calculator__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover {
    background: var(--color-primary-50);
  }

  input {
    width: 18px;
    height: 18px;
    accent-color: var(--color-primary);
    flex-shrink: 0;
  }
}

.calculator__item-title {
  flex: 1;
  font-size: 0.92rem;
  color: var(--color-ink);
}

.calculator__item-price {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-primary-700);
  white-space: nowrap;
}

.calculator__summary {
  background: var(--color-primary-50);
  border-left: 1px solid var(--color-border);
  padding: 24px;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;

  @media (max-width: 800px) {
    border-left: none;
    border-top: 1px solid var(--color-border);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }

  h4 {
    margin-bottom: 12px;
  }
}

.calculator__empty {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.calculator__selected {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  li {
    font-size: 0.85rem;
    color: var(--color-text);
    padding-left: 14px;
    position: relative;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: var(--color-primary);
    }
  }
}

.calculator__total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 14px 0;
  border-top: 1px dashed var(--color-border);
  margin-bottom: 8px;

  span {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  strong {
    font-size: 1.5rem;
    color: var(--color-primary-700);
  }
}

.calculator__note {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}
</style>
