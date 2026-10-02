// TODO(backend): вынести в API (GET /api/staff/) и подключить фото врачей из медиатеки.
// Ниже — демонстрационные карточки, ФИО и стаж примерные, заменить на реальные данные клиники.

export interface Doctor {
  slug: string;
  name: string;
  specialty: string;
  categories: string[]; // slug-и из services.ts, по каким услугам принимает
  experience: number; // лет стажа
  education: string;
  photo?: string; // если нет — используется аватар-заглушка с инициалами
}

export const doctors: Doctor[] = [
  {
    slug: "polushin-sergey",
    name: "Полушин Сергей Анатольевич",
    specialty: "Главный врач, стоматолог-терапевт",
    categories: ["therapy", "hygiene"],
    experience: 22,
    education: "Марийский государственный университет, стоматологический факультет",
  },
  {
    slug: "doctor-hirurg",
    name: "Смирнова Анна Викторовна",
    specialty: "Стоматолог-хирург, имплантолог",
    categories: ["surgery", "implants"],
    experience: 14,
    education: "Казанский ГМУ, специализация «Хирургическая стоматология»",
  },
  {
    slug: "doctor-ortoped",
    name: "Кузнецов Игорь Павлович",
    specialty: "Стоматолог-ортопед",
    categories: ["orthopedics", "implants"],
    experience: 17,
    education: "Нижегородская ГМА, ординатура по ортопедической стоматологии",
  },
  {
    slug: "doctor-ortodont",
    name: "Васильева Мария Сергеевна",
    specialty: "Стоматолог-ортодонт",
    categories: ["orthodontics"],
    experience: 9,
    education: "Приволжский исследовательский медицинский университет",
  },
  {
    slug: "doctor-detskiy",
    name: "Егорова Ольга Николаевна",
    specialty: "Детский стоматолог",
    categories: ["kids", "therapy"],
    experience: 11,
    education: "Марийский государственный университет, повышение квалификации по детской стоматологии",
  },
  {
    slug: "doctor-gigienist",
    name: "Фёдорова Дарья Андреевна",
    specialty: "Врач-гигиенист",
    categories: ["hygiene"],
    experience: 6,
    education: "Ижевская государственная медицинская академия",
  },
];
