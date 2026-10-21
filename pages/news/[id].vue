<script setup lang="ts">
import type { News } from "~/types/api";

const route = useRoute();
const router = useRouter();
const newsId = route.params.id;
const hasHistory = ref(false);
const apiUrl = useApiUrl();

const { data: news, status, error: fetchError } = await useAsyncData(`news-${newsId}`, () =>
  $fetch<News>(`${apiUrl}/news/${newsId}/`)
);

const loading = computed(() => status.value === "pending");
const error = computed(() => {
  if (!fetchError.value) return null;
  return fetchError.value.statusCode === 404 ? "Новость не найдена" : "Не удалось загрузить новость";
});

useHead(() => ({
  title: `${news.value?.title ?? "Новость"} | Стоматология «Для Вас»`,
  meta: news.value ? [{ name: "description", content: newsExcerpt(news.value.content) }] : [],
}));

onMounted(() => {
  hasHistory.value = window.history.length > 2;
});

const goBack = () => {
  if (hasHistory.value) {
    router.go(-1);
  } else {
    router.push("/allnews");
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
};
</script>

<template>
  <div class="news-detail-page">
    <div class="wrap">
      <div class="news-detail" v-if="!loading && news">
        <div class="news-header">
          <button class="back-link" @click="goBack">← Назад</button>
          <h1>{{ news.title }}</h1>
          <div class="news-date">{{ formatDate(news.created_at) }}</div>
          <div class="news-updatedDate">Обновлено: {{ formatDate(news.updated_at) }}</div>

          <div class="news-detail__image" v-if="news.image">
            <img :src="news.image" :alt="news.title" />
          </div>
        </div>

        <div class="news-detail__content">
          <p v-for="(paragraph, index) in news.content.split('\n')" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div v-else-if="loading" class="state-block">Загрузка...</div>

      <div v-else class="state-block">
        <p>{{ error || "Новость не найдена" }}</p>
        <NuxtLink to="/allnews" class="btn btn-secondary">К списку новостей</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-detail-page {
  padding: 48px 0 64px;
}

.news-detail {
  max-width: 760px;
  margin: 0 auto;
}

.news-header {
  background-color: var(--color-primary);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.back-link {
  color: var(--color-primary-700);
  margin-bottom: 20px;
  display: inline-block;
  background-color: #fff;
  transition: all 0.2s ease;
  border-radius: 999px;
  padding: 8px 16px;
  border: none;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}

.back-link:hover {
  transform: scale(1.03);
}

.news-header h1 {
  color: #fff;
  margin: 10px 0;
}

.news-date {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  margin-bottom: 6px;
}

.news-updatedDate {
  color: rgba(255, 255, 255, 0.65);
  font-weight: 300;
  font-style: italic;
  margin-bottom: 20px;
}

.news-detail__image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}

.news-detail__content {
  line-height: 1.6;
  font-size: 1.02rem;
  padding: 24px 4px;

  p {
    margin-bottom: 1.2rem;
    color: var(--color-text);
  }
}

.state-block {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
