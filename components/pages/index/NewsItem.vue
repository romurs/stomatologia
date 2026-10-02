<script setup lang="ts">
interface Props {
  image: string;
  title: string;
  discription: string;
  date?: string;
  id: number;
}

const props = defineProps<Props>();

const formatDate = (dateString?: string) => {
  if (!dateString) return { day: "", month: "", year: "" };

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("ru", { month: "short" });
  const year = date.getFullYear();

  return { day, month, year: year.toString() };
};

const dateParts = formatDate(props.date);
</script>

<template>
  <NuxtLink :to="`/news/${id}`" class="news-card">
    <div class="news-card__img" :style="{ '--bg-image': `url(${image})` }">
      <img :src="image" :alt="title" />
      <span class="news-card__date" v-if="date">{{ dateParts.day }} {{ dateParts.month }} {{ dateParts.year }}</span>
    </div>
    <div class="news-card__body">
      <h3>{{ title }}</h3>
      <p>{{ discription }}</p>
      <span class="news-card__link">Читать далее →</span>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.news-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.25s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.news-card__img {
  position: relative;
  height: 12rem;
  overflow: hidden;
}

.news-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__date {
  position: absolute;
  left: 12px;
  bottom: 12px;
  background: rgba(16, 34, 44, 0.7);
  color: #fff;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
}

.news-card__body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;

  h3 {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.86rem;
    color: var(--color-text-muted);
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.news-card__link {
  margin-top: 14px;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--color-primary);
}
</style>
