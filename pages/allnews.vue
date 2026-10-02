<script setup lang="ts">
import NewsItem from "@/components/pages/index/NewsItem.vue";

useHead({
  title: "Новости | Стоматология «Для Вас»",
  meta: [{ name: "allnews", content: "Все новости стоматологии «Для вас»" }],
});

interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image?: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[];
}

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const newsList = ref<News[]>([]);
const nextPage = ref<string | null>(null);
const loading = ref(false);

const loadNews = async (url?: string) => {
  try {
    loading.value = true;

    const data = await $fetch<ApiResponse>(url || `${apiUrl}/news/`);

    newsList.value = [...newsList.value, ...data.results];
    nextPage.value = data.next;
  } catch (err) {
    // TODO(backend): бэкенд новостей ещё не поднят на этом окружении
    console.error("Новости: бэкенд недоступен", err);
  } finally {
    loading.value = false;
  }
};

await loadNews();

const loadMore = () => {
  if (nextPage.value) {
    loadNews(nextPage.value);
  }
};

const hasNextPage = computed(() => !!nextPage.value);

const shortDiscription = (content: string) => {
  if (!content) return "";

  const sentenceEnd = content.match(/[.!?…]/);

  if (sentenceEnd) {
    return content.substring(0, sentenceEnd.index! + 1);
  }

  return content.length > 100 ? content.substring(0, 100) + "..." : content;
};
</script>

<template>
  <div class="allnews-page">
    <div class="wrap">
      <h1 class="allnews-page__title">Новости клиники</h1>

      <div class="allnews-grid" v-if="newsList.length">
        <NewsItem
          v-for="news in newsList"
          :key="news.id"
          :image="news.image || '/placeholder-news.jpg'"
          :title="news.title"
          :discription="shortDiscription(news.content)"
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
