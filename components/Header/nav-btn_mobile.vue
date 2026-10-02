<script setup lang="ts">
defineProps({
  value: String,
  link: String,
  toggleFn: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true,
  },
});
</script>

<template>
  <NuxtLink class="link" :to="link"  @click="toggleFn">
    <div class="nav-btn">
       {{ value }}
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.nav-btn {
  align-items: center;
  display: flex;
  padding-top: 10px;
  margin-left: 10px;
  width: 100%;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  a {
    color: #fff;
    scale: 1.05;
    transition: all 0.3s ease;
  }
}

.link {
  margin-left: 10px;
  color: #ffffff;
}

.nav_angle {
  height: 15px;
  width: 15px;
}
</style>
