// https://nuxt.com/docs/api/configuration/nuxt-config 123
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "nuxt-svgo-loader"],
  css: ["@/assets/main.scss"],
  runtimeConfig: {
    apiSecret: "", // приватные (только на сервере)
    public: {
      apiUrl: env.NUXT_API_URL || "http://94.156.154.80:8000/api",
    },
  },
});
