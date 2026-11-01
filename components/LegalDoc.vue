<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="legal-page">
    <div class="wrap">
      <article class="page-content legal-doc">
        <h1>{{ title }}</h1>
        <p class="legal-doc__meta">Редакция от {{ CLINIC.legalDocsDate }}</p>
        <slot />
      </article>
    </div>
  </div>
</template>

<style lang="scss">
.legal-page {
  padding: 48px 0 64px;
}

.legal-doc {
  h1 {
    font-size: clamp(1.4rem, 2.6vw, 1.9rem);
    margin-bottom: 8px;
  }

  h2 {
    font-size: 1.1rem;
    margin: 28px 0 10px;
  }

  p,
  li {
    font-size: 0.95rem;
    line-height: 1.65;
    margin-bottom: 8px;
  }

  ul,
  ol {
    list-style: disc;
    padding-left: 22px;
    margin: 0 0 10px;
  }

  a {
    color: var(--color-primary-700);
    text-decoration: underline;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 16px;
    font-size: 0.9rem;
  }

  th,
  td {
    border: 1px solid var(--color-border);
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }
}

.legal-doc__meta {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-bottom: 20px;
}
</style>
