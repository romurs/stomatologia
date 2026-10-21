# Сайт стоматологии «Для Вас» (Nuxt 3)

Все данные — услуги и цены, врачи, акции, новости, документы, отзывы, FAQ — приходят с бэкенда
`stomatologia-back` (Django) и редактируются в его админке. Заявки с форм записи и «Остались вопросы?»
уходят туда же.

## Запуск

Сначала запустите бэкенд (см. README в `stomatologia-back`), затем:

```bash
npm install
npm run dev
```

Сайт: http://localhost:3000. Адрес API по умолчанию — `http://localhost:8000/api`.

## Адрес бэкенда

- При сборке: переменная `NUXT_API_URL` (см. `.env.example`).
- Без пересборки, при запуске собранного сайта: `NUXT_PUBLIC_API_URL`.

```bash
npm run build
NUXT_PUBLIC_API_URL=https://api.example.ru/api node .output/server/index.mjs
```

## Где что лежит

| Путь | Что там |
|---|---|
| `composables/useApi.ts` | Загрузка данных с API (`useServices`, `useDoctors`, `usePromotions`, `useReviews`, `useFaq`, `useDocumentCategories`) и отправка заявок `submitLead` |
| `types/api.ts` | Типы ответов API |
| `data/symptoms.ts` | Подсказки «Что вас беспокоит?» — клиентская логика, не из админки |

Если бэкенд недоступен, страницы не падают: разделы без данных просто скрываются.
