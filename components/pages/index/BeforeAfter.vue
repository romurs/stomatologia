<script setup lang="ts">
// TODO(content): заменить плейсхолдеры на реальные фото "до/после" из портфолио клиники
// (с письменного согласия пациентов), подключить загрузку через админку/бэкенд.
interface Case {
  title: string;
  description: string;
}

const cases: Case[] = [
  { title: "Реставрация передних зубов", description: "Композитные виниры, 2 приёма" },
  { title: "Протезирование коронками", description: "Диоксид циркония, 3 зуба" },
  { title: "Профессиональная чистка + отбеливание", description: "Air Flow + Zoom 4" },
];

const activeIndex = ref(0);
const sliderValue = ref(50);
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Результаты</span>
        <h2>Наши работы «до / после»</h2>
        <p>Потяните ползунок, чтобы сравнить результат лечения</p>
      </div>

      <div class="before-after">
        <div class="before-after__tabs">
          <button
            v-for="(c, index) in cases"
            :key="c.title"
            class="before-after__tab"
            :class="{ 'before-after__tab--active': index === activeIndex }"
            @click="activeIndex = index"
          >
            {{ c.title }}
          </button>
        </div>

        <div class="before-after__viewer card">
          <div class="ba-compare">
            <div class="ba-compare__side ba-compare__side--before">
              <span class="ba-compare__label">До</span>
            </div>
            <div class="ba-compare__side ba-compare__side--after" :style="{ clipPath: `inset(0 0 0 ${sliderValue}%)` }">
              <span class="ba-compare__label ba-compare__label--after">После</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              v-model.number="sliderValue"
              class="ba-compare__slider"
              aria-label="Сравнить до и после"
            />
            <div class="ba-compare__handle" :style="{ left: `${sliderValue}%` }">↔</div>
          </div>
          <p class="before-after__desc">{{ cases[activeIndex].description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.before-after__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
}

.before-after__tab {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
}

.before-after__tab--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.before-after__viewer {
  max-width: 640px;
  margin: 0 auto;
  padding: 20px;
}

.ba-compare {
  position: relative;
  height: 320px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.ba-compare__side {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 14px;
}

.ba-compare__side--before {
  background: repeating-linear-gradient(135deg, #d8e7ec, #d8e7ec 14px, #cfe0e6 14px, #cfe0e6 28px);
}

.ba-compare__side--after {
  background: linear-gradient(135deg, var(--color-primary-100), #ffffff);
}

.ba-compare__label {
  background: rgba(16, 34, 44, 0.65);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
}

.ba-compare__label--after {
  background: var(--color-primary-700);
}

.ba-compare__slider {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ew-resize;
  margin: 0;
}

.ba-compare__handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #fff;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  font-size: 0.9rem;
}

.before-after__desc {
  text-align: center;
  margin-top: 14px;
  color: var(--color-text-muted);
  font-size: 0.88rem;
}
</style>
