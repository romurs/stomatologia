<script setup lang="ts">
const { data: doctors } = await useDoctors();

const preview = computed(() => doctors.value.slice(0, 3));
</script>

<template>
  <section class="section" v-if="preview.length">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Команда</span>
        <h2>Наши врачи</h2>
        <p>Опытные специалисты с профильным образованием и постоянным повышением квалификации</p>
      </div>

      <div class="doctors-grid">
        <PagesStaffDoctorCard v-for="doctor in preview" :key="doctor.slug" :doctor="doctor" />
      </div>

      <div class="doctors-more">
        <NuxtLink to="/staff" class="btn btn-secondary">Все врачи клиники</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.doctors-more {
  text-align: center;
  margin-top: 32px;
}
</style>
