<script setup lang="ts">
import { symptoms, urgencyLabels } from "~/data/symptoms";

const { data: serviceCategories } = await useServices();

const selectedId = ref<string | null>(null);

const selected = computed(() => symptoms.find((s) => s.id === selectedId.value) ?? null);

const selectedCategory = computed(() =>
  selected.value ? serviceCategories.value.find((c) => c.slug === selected.value!.categorySlug) : null
);

const select = (id: string) => {
  selectedId.value = selectedId.value === id ? null : id;
};
</script>

<template>
  <section class="section symptoms">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Полезный сервис</span>
        <h2>Что вас беспокоит?</h2>
        <!-- <p>Отметьте, что чувствуете — подскажем, к какому врачу лучше обратиться и что это может значить</p> -->
      </div>

      <div class="symptoms__grid">
        <button
          v-for="symptom in symptoms"
          :key="symptom.id"
          class="symptoms__chip"
          :class="{ 'symptoms__chip--active': selectedId === symptom.id }"
          @click="select(symptom.id)"
        >
          <span class="symptoms__chip-icon">{{ symptom.icon }}</span>
          {{ symptom.label }}
        </button>
      </div>

      <transition name="fade-up">
        <div v-if="selected" class="symptoms__result card">
          <div class="symptoms__result-head">
            <span class="badge" :class="urgencyLabels[selected.urgency].className">
              {{ urgencyLabels[selected.urgency].text }}
            </span>
          </div>
          <p class="symptoms__advice">{{ selected.advice }}</p>
          <div class="symptoms__result-footer">
            <div class="symptoms__category" v-if="selectedCategory">
              Рекомендуемое направление: <strong>{{ selectedCategory.icon }} {{ selectedCategory.title }}</strong>
            </div>
            <div class="symptoms__actions">
              <NuxtLink :to="`/price#${selected.categorySlug}`" class="btn btn-ghost btn-sm">Смотреть цены</NuxtLink>
              <NuxtLink to="/booking" class="btn btn-primary btn-sm">Записаться</NuxtLink>
            </div>
          </div>
          <p class="symptoms__disclaimer">
            Это не диагноз, а общая подсказка для навигации по сайту. Точную причину определит врач на очном осмотре.
          </p>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped lang="scss">
.symptoms__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 28px;
}

.symptoms__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.symptoms__chip:hover {
  border-color: var(--color-primary);
}

.symptoms__chip--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.symptoms__chip-icon {
  font-size: 1.05rem;
}

.symptoms__result {
  max-width: 720px;
  margin: 0 auto;
  padding: 28px 30px;
}

.symptoms__advice {
  font-size: 1.02rem;
  margin: 14px 0 20px;
  color: var(--color-ink);
}

.symptoms__result-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.symptoms__category {
  font-size: 0.92rem;
  color: var(--color-text-muted);
}

.symptoms__actions {
  display: flex;
  gap: 10px;
}

.symptoms__disclaimer {
  margin-top: 16px;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-style: italic;
}
</style>
