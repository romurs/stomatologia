<script setup lang="ts">
const props = defineProps({
  logo: {
    type: String,
    required: false
  },
  value: String,
  color: {
    type: String,
    default: '#606060'
  },
  link: String
});

const textColor = computed(() => {
  return props.color.toLowerCase() === '#fff' || props.color.toLowerCase() === '#ffffff'
    ? '#000'
    : '#fff'
})
</script>

<template>
  <NuxtLink :to="link">
    <button class="link_btn" :style="{ backgroundColor: props.color , color:textColor}">
      <div class="link_logo" :style="{'--bg-image': `url(${props.logo})`}"></div>
      <div class="value">{{props.value}}</div>
    </button>
  </NuxtLink>
</template>

<style scoped lang="scss">
.link_btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 3rem;
  background-color: #606060;
  border: none;
  border-radius: 23px;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  margin-bottom: 5px;
}

.link_logo{
  background-image: var(--bg-image);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;

  width: 1.5rem;
  height: 1.5rem;
  margin: 10px;
}

.link_btn:hover {
  transform: scale(1.03);
  transition: all 0.3s ease;
}
</style>
