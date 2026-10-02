// Каталог услуг и прайс-лист клиники.
// Раздел "Терапия" — реальные позиции из действующего прайса (Приложение №1 к приказу №3 от 16.03.2021).
// Остальные разделы — ориентировочные позиции-заглушки для витрины услуг,
// TODO(backend): заменить на данные из бухгалтерского прайс-листа / админки, когда появится API вида GET /api/services/.

export interface PriceItem {
  title: string;
  price: number | null; // null — цена "от" уточняется на приёме
  note?: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  icon: string; // emoji-иконка, чтобы не тянуть лишний спрайт-набор
  shortDescription: string;
  items: PriceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "therapy",
    title: "Терапия",
    icon: "🦷",
    shortDescription: "Лечение кариеса, пломбирование, лечение каналов",
    items: [
      { title: "Осмотр и консультация", price: 300 },
      { title: "Снятие пломбы, препарирование", price: 200 },
      { title: "Трепанация коронки зуба", price: 200 },
      { title: "Наложение мышьяковистой (безмышьяковистой) пасты", price: 100 },
      { title: "Временная пломба", price: 200 },
      { title: "Пломба «Эконом» (химического/светового отверждения)", price: 800 },
      { title: "Пломба «Стандарт» (стеклоиномерная/светового отверждения)", price: 1100 },
      { title: "Пломба «Элит» (светового отверждения)", price: 1300 },
      { title: "Лечебная прокладка", price: 200 },
      { title: "Пломбирование канала (1 канал)", price: 400 },
      { title: "Штифт стекловолоконный", price: 450 },
    ],
  },
  {
    slug: "surgery",
    title: "Хирургия",
    icon: "🩹",
    shortDescription: "Удаление зубов, разрезы, операции при осложнениях",
    items: [
      { title: "Удаление зуба простое", price: 1200 },
      { title: "Удаление зуба сложное (с разъединением корней)", price: 2500 },
      { title: "Удаление зуба мудрости", price: 3000 },
      { title: "Разрез при периостите (вскрытие абсцесса)", price: 1000 },
      { title: "Наложение шва", price: 300 },
    ],
  },
  {
    slug: "orthopedics",
    title: "Ортопедия / протезирование",
    icon: "👑",
    shortDescription: "Коронки, мосты, съёмные и несъёмные протезы",
    items: [
      { title: "Коронка металлокерамическая", price: 9500 },
      { title: "Коронка цельнокерамическая (диоксид циркония)", price: 18000 },
      { title: "Вкладка культевая", price: 3500 },
      { title: "Съёмный протез частичный (акрил)", price: null, note: "от 15 000" },
      { title: "Съёмный протез нейлоновый", price: null, note: "от 22 000" },
    ],
  },
  {
    slug: "implants",
    title: "Имплантация",
    icon: "🔩",
    shortDescription: "Установка имплантов, костная пластика",
    items: [
      { title: "Установка импланта (без коронки)", price: null, note: "от 28 000" },
      { title: "Формирователь десны", price: 2500 },
      { title: "Костная пластика", price: null, note: "от 12 000" },
      { title: "Коронка на импланте", price: null, note: "от 16 000" },
    ],
  },
  {
    slug: "hygiene",
    title: "Гигиена и отбеливание",
    icon: "✨",
    shortDescription: "Чистка, снятие налёта, отбеливание",
    items: [
      { title: "Профессиональная гигиена полости рта (Air Flow + УЗ)", price: 3500 },
      { title: "Снятие зубного камня (1 зуб)", price: 150 },
      { title: "Отбеливание Zoom 4", price: 12000 },
      { title: "Реминерализация эмали", price: 1500 },
    ],
  },
  {
    slug: "orthodontics",
    title: "Ортодонтия",
    icon: "🦴",
    shortDescription: "Исправление прикуса: брекеты, каппы",
    items: [
      { title: "Консультация ортодонта + диагностика", price: 500 },
      { title: "Брекет-система металлическая (на 1 челюсть)", price: null, note: "от 35 000" },
      { title: "Элайнеры (капа для выравнивания)", price: null, note: "от 45 000" },
      { title: "Ретенционная каппа", price: 4000 },
    ],
  },
  {
    slug: "kids",
    title: "Детская стоматология",
    icon: "🧒",
    shortDescription: "Лечение молочных и постоянных зубов у детей",
    items: [
      { title: "Осмотр детского стоматолога", price: 300 },
      { title: "Лечение кариеса молочного зуба", price: 1500 },
      { title: "Герметизация фиссур (1 зуб)", price: 800 },
      { title: "Серебрение зубов", price: 300 },
    ],
  },
];

export const allServiceItems = serviceCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.title, categorySlug: category.slug }))
);
