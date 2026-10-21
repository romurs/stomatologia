// Типы ответов бэкенда (stomatologia-back, /api/...).

export interface PriceItem {
  id: number;
  title: string;
  price: number | null; // null — цена уточняется на приёме, тогда показываем note
  note: string;
}

export interface ServiceCategory {
  id: number;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  items: PriceItem[];
}

export interface Doctor {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  categories: string[]; // slug-и услуг
  experience: number | null; // лет стажа
  education: string;
  bio: string;
  certificates: string[];
  photo: string | null;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  badge: string;
  image: string | null;
  until: string | null;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  service: string;
  text: string;
  date: string;
}

export interface ReviewsResponse {
  average_rating: number | null;
  count: number;
  results: Review[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface DocumentItem {
  id: number;
  title: string;
  file: string;
}

export interface DocumentCategory {
  id: number;
  name: string;
  documents: DocumentItem[];
}
