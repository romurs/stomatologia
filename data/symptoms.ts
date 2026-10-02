// Статическая логика подбора услуги по симптому для виджета "Что вас беспокоит?".
// TODO(backend): при появлении медицинского движка/базы знаний — вынести правила на сервер,
// сейчас это упрощённая клиентская эвристика для навигации пользователя по сайту, не диагноз.

export interface Symptom {
  id: string;
  label: string;
  icon: string;
  urgency: "low" | "medium" | "high";
  advice: string;
  categorySlug: string; // ссылка на serviceCategories[].slug
}

export const symptoms: Symptom[] = [
  {
    id: "toothache",
    label: "Острая боль в зубе",
    icon: "😖",
    urgency: "high",
    advice:
      "Похоже на воспаление или глубокий кариес — рекомендуем не откладывать визит к терапевту. Мы стараемся принимать такие случаи в день обращения.",
    categorySlug: "therapy",
  },
  {
    id: "sensitivity",
    label: "Реакция на горячее/холодное",
    icon: "🥶",
    urgency: "medium",
    advice: "Чаще всего это повышенная чувствительность эмали или начальный кариес — нужен осмотр терапевта и, возможно, реминерализация.",
    categorySlug: "therapy",
  },
  {
    id: "bleeding-gums",
    label: "Кровоточат дёсны",
    icon: "🩸",
    urgency: "medium",
    advice: "Частый признак зубного налёта/камня и воспаления дёсен. Обычно помогает профессиональная гигиена и наблюдение врача.",
    categorySlug: "hygiene",
  },
  {
    id: "broken-tooth",
    label: "Скол или трещина зуба",
    icon: "🦷",
    urgency: "high",
    advice: "Нужен очный осмотр — в зависимости от глубины скола поможет пломба, вкладка или коронка.",
    categorySlug: "orthopedics",
  },
  {
    id: "missing-tooth",
    label: "Отсутствует зуб",
    icon: "🕳️",
    urgency: "low",
    advice: "Рассмотрите имплантацию или протезирование — на консультации подберём вариант под ваш бюджет и клиническую ситуацию.",
    categorySlug: "implants",
  },
  {
    id: "crooked-teeth",
    label: "Неровные зубы / прикус",
    icon: "🙂",
    urgency: "low",
    advice: "Стоит проконсультироваться с ортодонтом — предложим варианты: брекеты или элайнеры.",
    categorySlug: "orthodontics",
  },
  {
    id: "whitening",
    label: "Хочу отбелить зубы",
    icon: "✨",
    urgency: "low",
    advice: "Профессиональная чистка и отбеливание безопаснее и эффективнее домашних средств — покажем разницу на консультации.",
    categorySlug: "hygiene",
  },
  {
    id: "kids-checkup",
    label: "Плановый осмотр ребёнка",
    icon: "🧒",
    urgency: "low",
    advice: "Отличная идея — регулярный профосмотр у детского стоматолога помогает не пропустить кариес на ранней стадии.",
    categorySlug: "kids",
  },
];

export const urgencyLabels: Record<Symptom["urgency"], { text: string; className: string }> = {
  high: { text: "Лучше не откладывать", className: "badge-accent" },
  medium: { text: "Стоит показаться врачу", className: "badge-primary" },
  low: { text: "Плановый визит", className: "badge-success" },
};
