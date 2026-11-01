<script setup lang="ts">
import type { A11ySettings } from "~/composables/useAccessibility";

const { settings, panelOpen, set, disable, reset } = useAccessibility();

const s = computed(() => settings.value);

const fontSizes: { value: A11ySettings["fontSize"]; label: string; title: string }[] = [
  { value: 1, label: "А", title: "Обычный размер шрифта" },
  { value: 2, label: "А", title: "Увеличенный размер шрифта" },
  { value: 3, label: "А", title: "Крупный размер шрифта" },
];

const schemes: { value: A11ySettings["scheme"]; label: string; title: string }[] = [
  { value: "bw", label: "Ц", title: "Чёрным по белому" },
  { value: "wb", label: "Ц", title: "Белым по чёрному" },
  { value: "blue", label: "Ц", title: "Тёмно-синим по голубому" },
  { value: "beige", label: "Ц", title: "Коричневым по бежевому" },
  { value: "default", label: "Ц", title: "Цвета сайта" },
];

const images: { value: A11ySettings["images"]; label: string }[] = [
  { value: "on", label: "Вкл." },
  { value: "gray", label: "Ч/б" },
  { value: "off", label: "Выкл." },
];

const spacings: { value: A11ySettings["spacing"]; label: string }[] = [
  { value: 1, label: "Обычный" },
  { value: 2, label: "Средний" },
  { value: 3, label: "Большой" },
];

const fonts: { value: A11ySettings["font"]; label: string }[] = [
  { value: "sans", label: "Без засечек" },
  { value: "serif", label: "С засечками" },
];
</script>

<template>
  <div v-if="s.enabled && panelOpen" class="a11y-panel" role="region" aria-label="Настройки версии для слабовидящих">
    <div class="wrap a11y-panel__inner">
      <div class="a11y-panel__group">
        <span class="a11y-panel__label">Размер шрифта</span>
        <div class="a11y-panel__buttons">
          <button
            v-for="(f, i) in fontSizes"
            :key="f.value"
            type="button"
            class="a11y-btn"
            :class="{ 'a11y-btn--active': s.fontSize === f.value }"
            :style="{ fontSize: `${1 + i * 0.25}em` }"
            :title="f.title"
            :aria-label="f.title"
            :aria-pressed="s.fontSize === f.value"
            @click="set('fontSize', f.value)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <div class="a11y-panel__group">
        <span class="a11y-panel__label">Цвет сайта</span>
        <div class="a11y-panel__buttons">
          <button
            v-for="c in schemes"
            :key="c.value"
            type="button"
            class="a11y-btn a11y-btn--scheme"
            :class="[`a11y-btn--${c.value}`, { 'a11y-btn--active': s.scheme === c.value }]"
            :title="c.title"
            :aria-label="c.title"
            :aria-pressed="s.scheme === c.value"
            @click="set('scheme', c.value)"
          >
            {{ c.label }}
          </button>
        </div>
      </div>

      <div class="a11y-panel__group">
        <span class="a11y-panel__label">Изображения</span>
        <div class="a11y-panel__buttons">
          <button
            v-for="im in images"
            :key="im.value"
            type="button"
            class="a11y-btn a11y-btn--text"
            :class="{ 'a11y-btn--active': s.images === im.value }"
            :aria-pressed="s.images === im.value"
            @click="set('images', im.value)"
          >
            {{ im.label }}
          </button>
        </div>
      </div>

      <div class="a11y-panel__group">
        <span class="a11y-panel__label">Интервал между буквами</span>
        <div class="a11y-panel__buttons">
          <button
            v-for="sp in spacings"
            :key="sp.value"
            type="button"
            class="a11y-btn a11y-btn--text"
            :class="{ 'a11y-btn--active': s.spacing === sp.value }"
            :aria-pressed="s.spacing === sp.value"
            @click="set('spacing', sp.value)"
          >
            {{ sp.label }}
          </button>
        </div>
      </div>

      <div class="a11y-panel__group">
        <span class="a11y-panel__label">Шрифт</span>
        <div class="a11y-panel__buttons">
          <button
            v-for="f in fonts"
            :key="f.value"
            type="button"
            class="a11y-btn a11y-btn--text"
            :class="{ 'a11y-btn--active': s.font === f.value }"
            :aria-pressed="s.font === f.value"
            @click="set('font', f.value)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <div class="a11y-panel__group a11y-panel__group--actions">
        <button type="button" class="a11y-btn a11y-btn--text" @click="reset">Сбросить настройки</button>
        <button type="button" class="a11y-btn a11y-btn--text" @click="panelOpen = false">Скрыть панель</button>
        <button type="button" class="a11y-btn a11y-btn--text a11y-btn--strong" @click="disable">Обычная версия сайта</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Стили панели не scoped: она должна одинаково выглядеть при любой цветовой схеме */
.a11y-panel {
  background: #fff !important;
  color: #000 !important;
  border-bottom: 2px solid #000 !important;
  font-size: 16px; // панель не масштабируется вместе с сайтом, чтобы не «уезжала»
  letter-spacing: normal !important;
  font-family: Arial, sans-serif !important;
}

.a11y-panel__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 28px;
  padding-top: 14px;
  padding-bottom: 14px;
}

.a11y-panel__group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.a11y-panel__group--actions {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px;
  margin-left: auto;
}

.a11y-panel__label {
  font-size: 14px;
  font-weight: 700;
  color: #000 !important;
}

.a11y-panel__buttons {
  display: flex;
  gap: 6px;
}

.a11y-btn {
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  border: 2px solid #000 !important;
  border-radius: 6px;
  background: #fff !important;
  color: #000 !important;
  font-family: Arial, sans-serif !important;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: normal !important;
}

.a11y-btn--text {
  font-size: 14px;
}

.a11y-btn--active {
  outline: 3px solid #e6312e;
  outline-offset: 2px;
}

.a11y-btn--strong {
  background: #000 !important;
  color: #fff !important;
}

.a11y-btn--bw {
  background: #fff !important;
  color: #000 !important;
}
.a11y-btn--wb {
  background: #000 !important;
  color: #fff !important;
}
.a11y-btn--blue {
  background: #9dd1ff !important;
  color: #063462 !important;
}
.a11y-btn--beige {
  background: #f7f3d6 !important;
  color: #4d4b43 !important;
}
.a11y-btn--default {
  background: #009ed6 !important;
  color: #fff !important;
}

.a11y-btn:focus-visible {
  outline: 3px solid #e6312e;
  outline-offset: 2px;
}
</style>
