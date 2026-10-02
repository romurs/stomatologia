<script setup lang="ts">
import { serviceCategories } from "~/data/services";
import { doctors } from "~/data/doctors";

const props = withDefaults(
  defineProps<{
    presetService?: string;
    presetDoctor?: string;
  }>(),
  {
    presetService: "",
    presetDoctor: "",
  }
);

const name = ref("");
const phone = ref("");
const service = ref(props.presetService);
const doctorSlug = ref(props.presetDoctor);
const date = ref("");
const time = ref("");
const comment = ref("");
const agree = ref(false);

const errors = ref<Record<string, string>>({});
const isSubmitted = ref(false);
const isSubmitting = ref(false);

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

const minDate = computed(() => new Date().toISOString().split("T")[0]);

const formatPhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  phone.value = target.value;
};

const validate = (): boolean => {
  const nextErrors: Record<string, string> = {};

  if (name.value.trim().length < 2) {
    nextErrors.name = "Укажите, пожалуйста, ваше имя";
  }

  const digits = phone.value.replace(/\D/g, "");
  if (digits.length < 10) {
    nextErrors.phone = "Введите корректный номер телефона";
  }

  if (!agree.value) {
    nextErrors.agree = "Нужно согласие на обработку персональных данных";
  }

  errors.value = nextErrors;
  return Object.keys(nextErrors).length === 0;
};

const submit = async (event: Event) => {
  event.preventDefault();
  if (!validate()) return;

  isSubmitting.value = true;

  const payload = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    service: service.value,
    doctor: doctorSlug.value,
    date: date.value,
    time: time.value,
    comment: comment.value.trim(),
  };

  // TODO(backend): нет эндпоинта для записи на приём.
  // Когда появится API, заменить блок ниже на реальный запрос, например:
  // const config = useRuntimeConfig();
  // await $fetch(`${config.public.apiUrl}/appointments/`, { method: "POST", body: payload });
  console.log("Заявка на запись (заглушка, нужен бэкенд):", payload);
  await new Promise((resolve) => setTimeout(resolve, 500));

  isSubmitting.value = false;
  isSubmitted.value = true;
};

const resetForm = () => {
  isSubmitted.value = false;
  name.value = "";
  phone.value = "";
  service.value = "";
  doctorSlug.value = "";
  date.value = "";
  time.value = "";
  comment.value = "";
  agree.value = false;
};
</script>

<template>
  <div class="booking-form card">
    <div v-if="!isSubmitted">
      <form @submit="submit">
        <div class="booking-form__row">
          <div class="booking-form__field">
            <label>Ваше имя</label>
            <input type="text" v-model="name" placeholder="Как к вам обращаться" :class="{ 'field-error': errors.name }" />
            <span class="field-error-text" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <div class="booking-form__field">
            <label>Телефон</label>
            <input
              type="tel"
              v-model="phone"
              @input="formatPhoneInput"
              placeholder="+7 (___) ___-__-__"
              :class="{ 'field-error': errors.phone }"
            />
            <span class="field-error-text" v-if="errors.phone">{{ errors.phone }}</span>
          </div>
        </div>

        <div class="booking-form__row">
          <div class="booking-form__field">
            <label>Услуга</label>
            <select v-model="service">
              <option value="">Не выбрано / уточню на месте</option>
              <optgroup v-for="category in serviceCategories" :key="category.slug" :label="category.title">
                <option v-for="item in category.items" :key="item.title" :value="item.title">{{ item.title }}</option>
              </optgroup>
            </select>
          </div>
          <div class="booking-form__field">
            <label>Врач</label>
            <select v-model="doctorSlug">
              <option value="">Любой свободный врач</option>
              <option v-for="doctor in doctors" :key="doctor.slug" :value="doctor.slug">
                {{ doctor.name }} — {{ doctor.specialty }}
              </option>
            </select>
          </div>
        </div>

        <div class="booking-form__row">
          <div class="booking-form__field">
            <label>Удобная дата</label>
            <input type="date" v-model="date" :min="minDate" />
          </div>
          <div class="booking-form__field">
            <label>Удобное время</label>
            <select v-model="time">
              <option value="">Любое время</option>
              <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
            </select>
          </div>
        </div>

        <div class="booking-form__field">
          <label>Комментарий</label>
          <textarea v-model="comment" rows="3" placeholder="Например: болит зуб слева снизу"></textarea>
        </div>

        <label class="booking-form__agree" :class="{ 'field-error': errors.agree }">
          <input type="checkbox" v-model="agree" />
          <span>Согласен(а) на обработку персональных данных</span>
        </label>
        <span class="field-error-text" v-if="errors.agree">{{ errors.agree }}</span>

        <button type="submit" class="btn btn-primary btn-block" :disabled="isSubmitting">
          {{ isSubmitting ? "Отправляем..." : "Записаться на приём" }}
        </button>

        <p class="booking-form__hint">
          Мы перезвоним, чтобы подтвердить время визита. Заявка не является гарантией записи до подтверждения администратором.
        </p>
      </form>
    </div>

    <div v-else class="booking-form__success">
      <div class="booking-form__success-icon">✅</div>
      <h3>Заявка отправлена</h3>
      <p>
        Спасибо, {{ name }}! Мы свяжемся с вами по номеру {{ phone }} в ближайшее рабочее время, чтобы подтвердить запись.
        Если у вас срочный случай — позвоните нам: <a href="tel:+78362733333">+7 (8362) 73-33-33</a>.
      </p>
      <button class="btn btn-ghost" @click="resetForm">Оставить ещё одну заявку</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booking-form {
  padding: 28px;
  max-width: 640px;
  margin: 0 auto;
}

.booking-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.booking-form__field {
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: 6px;
  }
}

input[type="text"],
input[type="tel"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-family: "Ubuntu", sans-serif;
  color: var(--color-ink);
  background: #fff;
  transition: border-color 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

textarea {
  resize: vertical;
}

.field-error {
  border-color: var(--color-accent) !important;
}

.field-error-text {
  display: block;
  color: var(--color-accent);
  font-size: 0.78rem;
  margin-top: 4px;
}

.booking-form__agree {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.86rem;
  color: var(--color-text-muted);
  margin: 6px 0 20px;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    accent-color: var(--color-primary);
  }
}

.booking-form__hint {
  margin-top: 14px;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  text-align: center;
}

.booking-form__success {
  text-align: center;
  padding: 20px 0;

  .booking-form__success-icon {
    font-size: 2.6rem;
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;

    a {
      color: var(--color-primary);
      font-weight: 700;
    }
  }
}
</style>
