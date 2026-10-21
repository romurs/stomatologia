<script setup lang="ts">
const name = ref("");
const contact = ref("");
const message = ref("");
const agree = ref(false);
const website = ref(""); // поле-ловушка для ботов
const isSubmitted = ref(false);
const isSubmitting = ref(false);
const error = ref("");

const submit = async (event: Event) => {
  event.preventDefault();
  error.value = "";

  if (!name.value.trim() || !contact.value.trim() || !message.value.trim()) {
    error.value = "Заполните, пожалуйста, все поля";
    return;
  }
  if (!agree.value) {
    error.value = "Нужно согласие на обработку персональных данных";
    return;
  }

  isSubmitting.value = true;
  const result = await submitLead("/feedback/", {
    name: name.value.trim(),
    contact: contact.value.trim(),
    message: message.value.trim(),
    website: website.value,
  });
  isSubmitting.value = false;

  if (result.ok) {
    isSubmitted.value = true;
  } else {
    error.value = result.message;
  }
};
</script>

<template>
  <div class="contact-form card">
    <div v-if="!isSubmitted">
      <h3>Остались вопросы?</h3>
      <p class="contact-form__lead">Напишите нам — ответим в рабочее время</p>
      <form @submit="submit">
        <input type="text" v-model="name" placeholder="Ваше имя" />
        <input type="text" v-model="contact" placeholder="Телефон или email для ответа" />
        <textarea v-model="message" rows="4" placeholder="Ваш вопрос"></textarea>
        <label class="contact-form__agree">
          <input type="checkbox" v-model="agree" />
          <span>Согласен(а) на обработку персональных данных</span>
        </label>
        <input v-model="website" type="text" name="website" class="contact-form__trap" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <p class="contact-form__error" v-if="error">{{ error }}</p>
        <button type="submit" class="btn btn-primary btn-block" :disabled="isSubmitting">
          {{ isSubmitting ? "Отправляем..." : "Отправить" }}
        </button>
      </form>
    </div>
    <div v-else class="contact-form__success">
      <div class="contact-form__success-icon">✅</div>
      <p>Спасибо! Мы получили ваше обращение и ответим в ближайшее время.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-form__agree {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.84rem;
  color: var(--color-text-muted);
  margin-bottom: 14px;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: var(--color-primary);
  }
}

.contact-form__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.contact-form {
  padding: 28px;

  h3 {
    margin-bottom: 6px;
  }
}

.contact-form__lead {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin-bottom: 18px;
}

input,
textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-family: "Ubuntu", sans-serif;
  color: var(--color-ink);
  margin-bottom: 14px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

textarea {
  resize: vertical;
}

.contact-form__error {
  color: var(--color-accent);
  font-size: 0.82rem;
  margin: -6px 0 14px;
}

.contact-form__success {
  text-align: center;
  padding: 20px 0;

  .contact-form__success-icon {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
}
</style>
