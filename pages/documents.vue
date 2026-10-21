<script setup lang="ts">
useHead({
  title: "Документы и лицензии | Стоматология «Для Вас»",
  meta: [{ name: "description", content: "Лицензии, устав и другие документы стоматологической клиники «Для Вас»." }],
});

const { data: allCategories } = await useDocumentCategories();

// Разделы без загруженных файлов не показываем
const categories = computed(() => allCategories.value.filter((category) => category.documents.length > 0));
</script>

<template>
  <div class="documents-page">
    <div class="wrap">
      <h1 class="documents-page__title">Документы и лицензии</h1>
      <p class="documents-page__lead">
        Учредительные документы, лицензии и информация для пациентов, размещение которых на сайте обязательно
        по законодательству РФ.
      </p>

      <div v-if="!categories.length" class="documents-page__notice">
        Документы скоро появятся на этой странице. Ознакомиться с ними можно в клинике у администратора.
      </div>

      <div class="documents-groups" v-else>
        <div class="documents-group" v-for="category in categories" :key="category.id">
          <h2>{{ category.name }}</h2>
          <div class="documents-grid">
            <PagesDocumentsDocumentCard
              v-for="doc in category.documents"
              :key="doc.id"
              :title="doc.title"
              :file="doc.file"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.documents-page {
  padding: 48px 0 64px;
}

.documents-page__title {
  text-align: center;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin-bottom: 12px;
}

.documents-page__lead {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 24px;
  color: var(--color-text-muted);
}

.documents-page__notice {
  max-width: 640px;
  margin: 0 auto 32px;
  background: var(--color-primary-50);
  border: 1px dashed var(--color-primary);
  color: var(--color-primary-700);
  font-size: 0.85rem;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  text-align: center;
}

.documents-groups {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.documents-group h2 {
  font-size: 1.1rem;
  margin-bottom: 14px;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}
</style>
