<script setup lang="ts">
// Галочка согласия на обработку ПДн для всех форм сайта.
// По 152-ФЗ согласие оформляется отдельным документом, галочка не может стоять заранее,
// рядом должны быть ссылки на текст согласия и на Политику.
const model = defineModel<boolean>({ default: false });

defineProps<{ error?: boolean }>();
</script>

<template>
  <label class="consent-checkbox" :class="{ 'field-error': error }">
    <input type="checkbox" v-model="model" />
    <span>
      Я даю
      <NuxtLink to="/consent" target="_blank">согласие на обработку персональных данных</NuxtLink>,
      в том числе сведений о состоянии здоровья, и подтверждаю, что ознакомлен(а) с
      <NuxtLink to="/privacy" target="_blank">Политикой обработки персональных данных</NuxtLink>
    </span>
  </label>
</template>

<style scoped lang="scss">
.consent-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.84rem;
  line-height: 1.45;
  color: var(--color-text-muted);
  margin: 6px 0 14px;
  cursor: pointer;

  input {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin: 1px 0 0;
    accent-color: var(--color-primary);
  }

  a {
    color: var(--color-primary-700);
    text-decoration: underline;
  }
}

.field-error {
  color: var(--color-accent);
}
</style>
