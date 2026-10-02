<script setup lang="ts">
import { faqItems } from "~/data/faq";

const openIndex = ref<number | null>(0);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Вопросы и ответы</span>
        <h2>Часто спрашивают</h2>
      </div>

      <div class="faq">
        <div class="faq__item card" v-for="(item, index) in faqItems" :key="item.question">
          <button class="faq__question" @click="toggle(index)" :aria-expanded="openIndex === index">
            {{ item.question }}
            <span class="faq__icon">{{ openIndex === index ? "−" : "+" }}</span>
          </button>
          <transition name="faq-collapse">
            <p v-if="openIndex === index" class="faq__answer">{{ item.answer }}</p>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq__item {
  padding: 6px 22px;
}

.faq__question {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 18px 0;
  font-weight: 700;
  font-size: 0.98rem;
  color: var(--color-ink);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 12px;
}

.faq__icon {
  color: var(--color-primary);
  font-size: 1.3rem;
  flex-shrink: 0;
}

.faq__answer {
  padding-bottom: 18px;
  font-size: 0.92rem;
  color: var(--color-text-muted);
}

.faq-collapse-enter-active,
.faq-collapse-leave-active {
  transition: all 0.2s ease;
}
.faq-collapse-enter-from,
.faq-collapse-leave-to {
  opacity: 0;
}
</style>
