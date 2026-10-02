<script setup lang="ts">
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

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

const newsList = ref<News[]>([]);

// TODO(backend): бэкенд новостей ещё не поднят на этом окружении — запрос ниже
// просто тихо падает в catch, и на странице остаётся только статичная демо-новость.
const loadNews = async () => {
  try {
    const data = await $fetch<ApiResponse>(`${apiUrl}/news/?page_size=3`);
    newsList.value = data.results;
  } catch (err) {
    console.error("Новости: бэкенд недоступен", err);
  }
};

await loadNews();

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
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Клиника</span>
        <h2>Новости</h2>
      </div>

      <div class="news-grid">
        <PagesIndexNewsItem
          image="/sl1.jpg"
          title="Стоматологическая клиника «Для Вас» открыла двери в 2008 году"
          :discription="
            shortDiscription(
              'Уже более 15 лет клиника работает над тем, чтобы лечение было максимально комфортным и безболезненным. Используем сертифицированные материалы и современное оборудование, а врачи регулярно проходят курсы повышения квалификации.'
            )
          "
          date="2026-05-16"
          :id="1"
        />
        <PagesIndexNewsItem
          v-for="news in newsList"
          :key="news.id"
          :image="news.image || '/placeholder-news.jpg'"
          :title="news.title"
          :discription="shortDiscription(news.content)"
          :date="news.created_at"
          :id="news.id"
        />
      </div>

      <div class="news-more">
        <NuxtLink to="/allnews" class="btn btn-secondary">Все новости</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-grid {
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

.news-more {
  text-align: center;
  margin-top: 32px;
}
</style>
