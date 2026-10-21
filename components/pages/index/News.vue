<script setup lang="ts">
import type { News, Paginated } from "~/types/api";

const apiUrl = useApiUrl();

const { data: newsList } = await useAsyncData(
  "news-preview",
  () =>
    $fetch<Paginated<News>>(`${apiUrl}/news/?page_size=3`)
      .then((data) => data.results)
      .catch((err) => {
        console.error("Новости: бэкенд недоступен", err);
        return [] as News[];
      }),
  { default: () => [] as News[] }
);
</script>

<template>
  <section class="section" v-if="newsList.length">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Клиника</span>
        <h2>Новости</h2>
      </div>

      <div class="news-grid">
        <PagesIndexNewsItem
          v-for="news in newsList"
          :key="news.id"
          :image="news.image || NEWS_PLACEHOLDER_IMAGE"
          :title="news.title"
          :discription="newsExcerpt(news.content)"
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
