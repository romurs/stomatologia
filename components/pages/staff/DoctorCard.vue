<script setup lang="ts">
import type { Doctor } from "~/data/doctors";

const props = defineProps<{ doctor: Doctor }>();

const initials = computed(() =>
  props.doctor.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
);
</script>

<template>
  <div class="doctor-card card">
    <div class="doctor-card__photo">
      <img v-if="doctor.photo" :src="doctor.photo" :alt="doctor.name" />
      <span v-else>{{ initials }}</span>
    </div>
    <div class="doctor-card__body">
      <h3>{{ doctor.name }}</h3>
      <p class="doctor-card__specialty">{{ doctor.specialty }}</p>
      <ul class="doctor-card__meta">
        <li>Стаж: {{ doctor.experience }} лет</li>
        <li>{{ doctor.education }}</li>
      </ul>
      <NuxtLink :to="`/booking?doctor=${doctor.slug}`" class="btn btn-ghost btn-sm btn-block">
        Записаться к врачу
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.doctor-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.25s ease;
}

.doctor-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.doctor-card__photo {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.doctor-card__body h3 {
  font-size: 1.02rem;
  margin-bottom: 4px;
}

.doctor-card__specialty {
  color: var(--color-primary-700);
  font-weight: 600;
  font-size: 0.88rem;
  margin-bottom: 10px;
}

.doctor-card__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;

  li {
    font-size: 0.82rem;
    color: var(--color-text-muted);
  }
}
</style>
