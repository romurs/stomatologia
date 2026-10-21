<script setup lang="ts">
import NewsItem from "@/components/pages/index/NewsItem.vue";
import type { News } from "~/types/api";

useHead({
  title: "Новости | Стоматология «Для Вас»",
  meta: [{ name: "allnews", content: "Все новости стоматологии «Для вас»" }],
});

const apiUrl = useApiUrl();

const { data: firstPage } = await useAsyncData("news-all", () =>
  fetchNewsPage(`${apiUrl}/news/`).catch((err) => {
    console.error("Новости: бэкенд недоступен", err);
    return null;
  })
);

const newsList = ref<News[]>(firstPage.value?.results ?? []);
const nextPage = ref<string | null>(firstPage.value?.next ?? null);
const loading = ref(false);

const loadMore = async () => {
  if (!nextPage.value) return;
  try {
    loading.value = true;
    const data = await fetchNewsPage(nextPage.value);
    newsList.value = [...newsList.value, ...data.results];
    nextPage.value = data.next;
  } catch (err) {
    console.error("Новости: не удалось загрузить следующую страницу", err);
  } finally {
    loading.value = false;
  }
};

const hasNextPage = computed(() => !!nextPage.value);
</script>

<template>
  <div class="allnews-page">
    <div class="wrap">
      <h1 class="allnews-page__title">Новости клиники</h1>

      <div class="allnews-grid" v-if="newsList.length">
        <NewsItem
          v-for="news in newsList"
          :key="news.id"
          :image="news.image || NEWS_PLACEHOLDER_IMAGE"
          :title="news.title"
          :discription="newsExcerpt(news.content)"
          :date="news.created_at"
          :id="news.id"
        />
      </div>

      <p v-else class="allnews-empty">Пока новостей нет — загляните позже.</p>

      <div class="allnews-more" v-if="hasNextPage">
        <button class="btn btn-secondary" @click="loadMore" :disabled="loading">
          {{ loading ? "Загрузка..." : "Загрузить ещё" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.allnews-page {
  padding: 48px 0 64px;
}

.allnews-page__title {
  text-align: center;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin-bottom: 32px;
}

.allnews-grid {
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

.allnews-empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 40px 0;
}

.allnews-more {
  text-align: center;
  margin-top: 32px;
}
</style>
