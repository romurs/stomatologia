<script setup lang="ts">
useHead({
  title: "Документы и лицензии | Стоматология «Для Вас»",
  meta: [{ name: "description", content: "Лицензии, устав и другие документы стоматологической клиники «Для Вас»." }],
});

interface DocumentItem {
  id: number;
  title: string;
  file: string;
}

interface CategoryResponse {
  id: number;
  name: string;
  documents: DocumentItem[];
}

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const remoteCategories = ref<CategoryResponse[]>([]);
const isLoading = ref(true);
const hasBackend = ref(false);

// Список ниже отображается всегда — это то, что по закону обязано быть на сайте клиники.
// TODO(backend): подключить реальные сканы документов через GET /api/categories/ (см. попытку загрузки ниже)
// и загрузку файлов через админку; пока показываем структуру без самих сканов.
const fallbackCategories: CategoryResponse[] = [
  {
    id: 1,
    name: "Учредительные документы",
    documents: [
      { id: 1, title: "Устав ООО «Сто процентов»", file: "" },
      { id: 2, title: "Свидетельство ОГРН", file: "" },
      { id: 3, title: "Свидетельство ИНН/КПП", file: "" },
    ],
  },
  {
    id: 2,
    name: "Лицензии",
    documents: [
      { id: 4, title: "Лицензия на осуществление медицинской деятельности", file: "" },
      { id: 5, title: "Приложение к лицензии (перечень работ и услуг)", file: "" },
    ],
  },
  {
    id: 3,
    name: "Права пациента",
    documents: [
      { id: 6, title: "Прейскурант на платные медицинские услуги", file: "/documents" },
      { id: 7, title: "Правила предоставления платных медицинских услуг", file: "" },
      { id: 8, title: "Информация для потребителей (Закон «О защите прав потребителей»)", file: "" },
    ],
  },
];

onMounted(async () => {
  try {
    const data = await $fetch<CategoryResponse[]>(`${apiUrl}/categories/`);
    if (Array.isArray(data) && data.length > 0) {
      remoteCategories.value = data.filter((cat) => cat.documents?.length > 0);
      hasBackend.value = true;
    }
  } catch (err) {
    console.error("Документы: бэкенд недоступен, показываем список-заглушку", err);
  } finally {
    isLoading.value = false;
  }
});

const categories = computed(() => (hasBackend.value ? remoteCategories.value : fallbackCategories));
</script>

<template>
  <div class="documents-page">
    <div class="wrap">
      <h1 class="documents-page__title">Документы и лицензии</h1>
      <p class="documents-page__lead">
        Учредительные документы, лицензии и информация для пациентов, размещение которых на сайте обязательно
        по законодательству РФ.
      </p>

      <div v-if="!hasBackend" class="documents-page__notice">
        Сканы документов ещё не загружены в систему — сейчас показана структура разделов.
        <br />TODO: подключить файлы через бэкенд/админку.
      </div>

      <div class="documents-groups" v-if="!isLoading">
        <div class="documents-group" v-for="category in categories" :key="category.id">
          <h2>{{ category.name }}</h2>
          <div class="documents-grid">
            <PagesDocumentsDocumentCard
              v-for="doc in category.documents"
              :key="doc.id"
              :title="doc.title"
              :file="doc.file || undefined"
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
