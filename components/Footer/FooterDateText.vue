<script setup lang="ts">
defineProps({
  text: String,
  link: {
    type: String,
    default: "none"
  }
})
</script>

<template>
  <div class="footer_texts">
    <slot name="icon">
      <div class="icon"></div>
    </slot>
    <a v-if="link!= `none`"  :href="link">
      <p class="footer_link">{{text}}</p>
    </a>

    <p v-else class="footer_text">{{text}}</p>
  </div>
</template>

<style scoped lang="scss">
.footer_texts{
  display: flex;
  align-items: center;
}

.footer_text{
  margin: 0.2rem;
  font-weight: 500;
  color: #fff;
}

.footer_link{
  margin: 0.2rem;
  font-weight: 500;
  color: var(--subtitle100);
  text-decoration: underline;
}

.footer_link:hover{
  opacity: 0.7;
}

.icon{
  width: 13px;
  height: 13px;
}
</style>