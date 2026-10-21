// Загрузка данных с бэкенда. Один ключ = один запрос: если услуги нужны в нескольких
// компонентах на странице, Nuxt сделает запрос один раз и отдаст всем общий результат.
// Если бэкенд недоступен — возвращаются пустые значения по умолчанию, страница не падает.

import type {
  Doctor,
  DocumentCategory,
  FaqItem,
  News,
  Paginated,
  Promotion,
  ReviewsResponse,
  ServiceCategory,
} from "~/types/api";

export const useApiUrl = () => useRuntimeConfig().public.apiUrl as string;

const useApiList = <T>(key: string, path: string) => {
  const apiUrl = useApiUrl();
  return useAsyncData<T[]>(
    key,
    () =>
      $fetch<T[]>(`${apiUrl}${path}`).catch((err) => {
        console.error(`API ${path}: бэкенд недоступен`, err);
        return [];
      }),
    { default: () => [] }
  );
};

export const useServices = () => useApiList<ServiceCategory>("services", "/services/");
export const useDoctors = () => useApiList<Doctor>("doctors", "/staff/");
export const usePromotions = () => useApiList<Promotion>("promotions", "/promotions/");
export const useFaq = () => useApiList<FaqItem>("faq", "/faq/");
export const useDocumentCategories = () => useApiList<DocumentCategory>("documents", "/categories/");

export const useReviews = () => {
  const apiUrl = useApiUrl();
  const empty: ReviewsResponse = { average_rating: null, count: 0, results: [] };
  return useAsyncData<ReviewsResponse>(
    "reviews",
    () =>
      $fetch<ReviewsResponse>(`${apiUrl}/reviews/`).catch((err) => {
        console.error("API /reviews/: бэкенд недоступен", err);
        return empty;
      }),
    { default: () => empty }
  );
};

export const fetchNewsPage = (url: string) => $fetch<Paginated<News>>(url);

/** Отправка формы. Возвращает текст ошибки для пользователя или null при успехе. */
export const submitLead = async (path: string, body: Record<string, unknown>) => {
  try {
    await $fetch(`${useApiUrl()}${path}`, { method: "POST", body });
    return { ok: true as const, fieldErrors: {} as Record<string, string> };
  } catch (err: any) {
    const status = err?.response?.status ?? err?.statusCode;
    const data = err?.data;
    if (status === 400 && data && typeof data === "object") {
      const fieldErrors: Record<string, string> = {};
      for (const [field, messages] of Object.entries(data)) {
        fieldErrors[field] = Array.isArray(messages) ? String(messages[0]) : String(messages);
      }
      return { ok: false as const, fieldErrors, message: "Проверьте правильность заполнения полей" };
    }
    if (status === 429) {
      return {
        ok: false as const,
        fieldErrors: {},
        message: "Слишком много заявок подряд. Попробуйте позже или позвоните нам.",
      };
    }
    console.error(`Отправка ${path} не удалась`, err);
    return {
      ok: false as const,
      fieldErrors: {},
      message: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.",
    };
  }
};

