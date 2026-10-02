<script setup lang="ts">
interface SubmenuItem {
  text: string
  link: string
}

const props = defineProps<{
  value: string
  link: string
  submenu?: SubmenuItem[]
}>()

const show = ref(false)
</script>

<template>
  <div class="nav-btn" @mouseenter="show = true" @mouseleave="show = false">
    <NuxtLink :to="props.link">{{ props.value }}</NuxtLink>

    <!-- popup -->
    <!-- <transition name="fade">
      <div v-if="show" class="popup">
        <ul>
          <li v-for="item in props.submenu" :key="item.text">
            <RouterLink :to="item.link">{{ item.text }}</RouterLink>
          </li>
        </ul>
      </div>
    </transition> -->
  </div>
</template>

<style scoped lang="scss">
.nav-btn {
  align-items: center;
  display: flex;
  padding: 7px;
  margin-right: 1rem;
  // max-width: 120px;
  transition: all 0.3s ease;
  color: var(--color-main-page);
  font-size: medium;
}

.nav-btn:hover {
  a {
    color: #fff;
    scale: 1.05;
    transition: all 0.3s ease;
  }
}

.popup {
    position: absolute;
    top: 100%;
    // left: 0;
    // background: var(--elements-bg-color, #222);
    border-radius: 6px;
    padding: 0.5rem 0;
    // box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    width: 200px;
    z-index: 2000;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 0.5rem 1rem;

        a {
          color: white;
          text-decoration: none;
          display: block;

          &:hover {
            background: rgba(255,255,255,0.1);
          }
        }
      }
    }
  }
</style>
