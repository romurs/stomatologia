// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-svgo-loader'],
  css:['@/assets/main.scss'],
  runtimeConfig: {
    apiSecret: '', // приватные (только на сервере)
    public: {
      apiUrl: process.env.NUXT_API_URL || "https://localhost:8000/api"
    }
  }
})