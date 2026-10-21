<script setup lang="ts">
useHead({
  title: "Прайс-лист | Стоматология «Для Вас»",
  meta: [
    {
      name: "description",
      content: "Цены на стоматологические услуги: терапия, хирургия, ортопедия, имплантация, гигиена, ортодонтия, детская стоматология.",
    },
  ],
});

const { data: serviceCategories } = await useServices();

const route = useRoute();
const search = ref("");

const openSlugs = ref<Set<string>>(new Set(serviceCategories.value.slice(0, 1).map((c) => c.slug)));

const isOpen = (slug: string) => openSlugs.value.has(slug);

const toggle = (slug: string) => {
  const next = new Set(openSlugs.value);
  if (next.has(slug)) {
    next.delete(slug);
  } else {
    next.add(slug);
  }
  openSlugs.value = next;
};

const normalizedSearch = computed(() => search.value.trim().toLowerCase());

const filteredCategories = computed(() => {
  if (!normalizedSearch.value) return serviceCategories.value;
  return serviceCategories.value
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.title.toLowerCase().includes(normalizedSearch.value)),
    }))
    .filter((category) => category.items.length > 0);
});

onMounted(() => {
  const hash = route.hash?.replace("#", "");
  if (hash && serviceCategories.value.some((c) => c.slug === hash)) {
    openSlugs.value = new Set([hash]);
    nextTick(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});
</script>

<template>
  <div class="price-page">
    <div class="wrap">
      <div class="price-hero">
        <h1>Прайс-лист</h1>
        <p>
          Ориентировочные цены на основные виды лечения. Финальная стоимость зависит от клинической ситуации и
          определяется врачом на консультации.
        </p>

        <div class="price-hero__actions">
          <input
            type="search"
            v-model="search"
            placeholder="Найти услугу, например «пломба»"
            class="price-search"
          />
          <NuxtLink to="/#calculator" class="btn btn-ghost btn-sm">Рассчитать стоимость лечения</NuxtLink>
        </div>
      </div>

      <div class="price-categories">
        <div
          v-for="category in filteredCategories"
          :id="category.slug"
          :key="category.slug"
          class="price-category card"
        >
          <button class="price-category__head" @click="toggle(category.slug)" :aria-expanded="isOpen(category.slug) || !!normalizedSearch">
            <span class="price-category__title">
              <span class="price-category__icon">{{ category.icon }}</span>
              {{ category.title }}
              <span class="price-category__count">{{ category.items.length }}</span>
            </span>
            <span class="price-category__toggle">{{ isOpen(category.slug) || normalizedSearch ? "−" : "+" }}</span>
          </button>

          <div class="price-category__body" v-if="isOpen(category.slug) || normalizedSearch">
            <PagesPriceTarifItem
              v-for="item in category.items"
              :key="item.title"
              :title="item.title"
              :price="item.price"
              :note="item.note"
            />
          </div>
        </div>

        <p v-if="filteredCategories.length === 0" class="price-empty">Ничего не найдено, попробуйте другой запрос</p>
      </div>

      <div class="price-footnote">
        <p>Прейскурант терапевтического отделения утверждён приказом №3 от 16.03.2021.</p>
        <p>Актуальность цен уточняйте у администратора: <a href="tel:+78362733333">+7 (8362) 73-33-33</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.price-page {
  padding: 48px 0 64px;
}

.price-hero {
  max-width: 720px;
  margin: 0 auto 32px;
  text-align: center;

  h1 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    margin-bottom: 12px;
  }
}

.price-hero__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.price-search {
  flex: 1;
  max-width: 320px;
  padding: 11px 16px;
  border-radius: 999px;
  border: 1.5px solid var(--color-border);
  font-size: 0.92rem;
  font-family: "Ubuntu", sans-serif;
}
.price-search:focus {
  outline: none;
  border-color: var(--color-primary);
}

.price-categories {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.price-category {
  scroll-margin-top: 130px;
  overflow: hidden;
}

.price-category__head {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
}

.price-category__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.02rem;
  color: var(--color-ink);
}

.price-category__icon {
  font-size: 1.2rem;
}

.price-category__count {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: 0.74rem;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
}

.price-category__toggle {
  font-size: 1.4rem;
  color: var(--color-primary);
}

.price-category__body {
  padding: 0 24px 20px;
}

.price-empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 32px 0;
}

.price-footnote {
  max-width: 820px;
  margin: 36px auto 0;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: center;

  a {
    color: var(--color-primary);
    font-weight: 700;
  }
}
</style>
