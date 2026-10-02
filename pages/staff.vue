<script setup lang="ts">
import { doctors } from "~/data/doctors";

useHead({
  title: "Врачи | Стоматология «Для Вас»",
  meta: [
    { name: "description", content: "Сведения о медицинском персонале клиники: специализация, стаж, образование врачей." },
  ],
});
</script>

<template>
  <div class="staff-page">
    <div class="wrap">
      <div class="staff-hero">
        <h1>Наши врачи</h1>
        <p>
          В клинике ведут приём стоматологи разных специализаций — от терапевтов до хирургов-имплантологов.
          Все врачи имеют профильное образование и регулярно проходят курсы повышения квалификации.
        </p>
      </div>

      <div class="staff-grid">
        <PagesStaffDoctorCard v-for="doctor in doctors" :key="doctor.slug" :doctor="doctor" />
      </div>

      <p class="staff-note">
        Сведения о сертификатах и квалификации врачей доступны на приёме по запросу.
        Полный перечень дипломов и лицензий — на странице <NuxtLink to="/documents">«Документы»</NuxtLink>.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.staff-page {
  padding: 48px 0 64px;
}

.staff-hero {
  max-width: 640px;
  margin: 0 auto 36px;
  text-align: center;

  h1 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    margin-bottom: 12px;
  }
}

.staff-grid {
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

.staff-note {
  max-width: 720px;
  margin: 36px auto 0;
  text-align: center;
  font-size: 0.86rem;
  color: var(--color-text-muted);

  a {
    color: var(--color-primary);
    font-weight: 700;
  }
}
</style>
