<script setup lang="ts">
useHead({
  title: "Стоматология «Для Вас» | Запись онлайн",
  meta: [
    {
      name: "description",
      content:
        "Стоматологическая клиника «Для Вас» в Йошкар-Оле: терапия, хирургия, имплантация, протезирование, детская стоматология. Онлайн-запись, прозрачные цены, гарантия на лечение.",
    },
  ],
});
</script>

<template>
  <div class="home">
    <PagesIndexHero />
    <PagesIndexTrustStats />
    <PagesIndexServicesGrid />
    <PagesIndexSymptomHelper />
    <PagesIndexCostCalculator />
    <PagesIndexPromotions />
    <PagesIndexDoctorsPreview />
    <!-- <PagesIndexBeforeAfter /> -->
    <PagesIndexReviews />
    <PagesIndexFaqAccordion />
    <PagesIndexNews />
    <PagesIndexBookingSection />
    <PagesIndexMapContacts />
  </div>
</template>
