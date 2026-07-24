export type PlanId = "start" | "community" | "mentor";

export type Plan = {
  id: PlanId;
  name: string;
  priceUsd: number;
  priceUah: number;
  badge?: string;
  highlighted?: boolean;
  tone: "quiet" | "featured" | "accent";
  features: string[];
  cta: string;
};

export const BRAND = "SITE LAB";
export const BUILD_TIME = "1 год 32 хв";
export const MENTOR_SEATS = 8;

export const plans: Plan[] = [
  {
    id: "start",
    name: "Start",
    priceUsd: 20,
    priceUah: 820,
    tone: "quiet",
    features: [
      "Повний доступ до курсу",
      "Шаблони блоків лендінгу",
      "Чеклісти запуску",
      "Оновлення матеріалів",
    ],
    cta: "Взяти Start",
  },
  {
    id: "community",
    name: "Community",
    priceUsd: 49,
    priceUah: 2010,
    badge: "Найчастіший вибір",
    highlighted: true,
    tone: "featured",
    features: [
      "Усе з тарифу Start",
      "Доступ у Telegram-комʼюніті",
      "Розбори чужих лендінгів",
      "Підтримка однодумців",
    ],
    cta: "Взяти Community",
  },
  {
    id: "mentor",
    name: "Mentor",
    priceUsd: 100,
    priceUah: 4100,
    badge: `Лише ${MENTOR_SEATS} місць`,
    tone: "accent",
    features: [
      "Усе з тарифу Community",
      "14 днів чату зі мною",
      "2 созвонни 1:1",
      "1 повний розбір твого лендінгу",
    ],
    cta: "Взяти Mentor",
  },
];

export function getPlan(id: string | null | undefined): Plan | undefined {
  return plans.find((p) => p.id === id);
}

export const modules = [
  {
    title: "Ідея і офер під соцмережі",
    result: "Зрозумілий офер, на який люди клікають з TikTok / Reels.",
  },
  {
    title: "Структура лендінгу-воронки",
    result: "Блоки в правильному порядку: увага → довіра → оплата.",
  },
  {
    title: "Сучасний UI: glass, motion, типографіка",
    result: "Сайт виглядає дорого без агентства і шаблону 2018.",
  },
  {
    title: "Збірка: від макета до робочої сторінки",
    result: "Швидкий шлях від ідеї до запущеного лендінгу.",
  },
  {
    title: "Підключення оплати",
    result: "Приймаєш гроші з картки / Apple Pay / Google Pay.",
  },
  {
    title: "Запуск і трафік",
    result: "Креативи, UTM і звʼязка TikTok / IG / Telegram → сайт.",
  },
  {
    title: "Продаж сайтів клієнтам",
    result: "Пакуєш послугу і береш перші замовлення.",
  },
];

export const pains = [
  {
    label: "Дешево",
    pain: "Агентство просить ₴15–40k за лендінг.",
    fix: "Робиш сам або продаєш клієнтам — курс відбивається з одного замовлення.",
  },
  {
    label: "Швидко",
    pain: "Курси тягнуться місяцями теорії.",
    fix: "Практика + шаблони блоків. Перший сайт — за один вечір.",
  },
  {
    label: "Сучасно",
    pain: "Конструктор виглядає «як усі».",
    fix: "Glass UI, motion і композиція під 2026 — без шаблону №7.",
  },
];

export const forWhom = {
  yes: [
    "Хочеш сайт собі / бізнесу без агентства",
    "Хочеш фріланс і перші гроші на сайтах",
    "Вже пробував Tilda / AI, але «не виглядає дорого»",
    "Готовий робити руками, а не лише дивитись",
  ],
  no: [
    "Шукаєш «senior за 7 днів»",
    "Потрібен глибокий enterprise backend",
    "Не готовий запускати і тестувати",
  ],
};

export const steps = [
  {
    n: "01",
    title: "Обираєш тариф",
    text: "Start, Community або Mentor — під свій темп і рівень підтримки.",
  },
  {
    n: "02",
    title: "Отримуєш доступ",
    text: "Матеріали одразу на email. Community / Mentor — інвайт у Telegram.",
  },
  {
    n: "03",
    title: "Збираєш лендінг",
    text: "Йдеш по сценарію курсу і запускаєш сторінку, яка продає.",
  },
];

export const expert = {
  name: "Владислав",
  role: "Навчаю робити сайти, які виглядають дорого і продають",
  philosophy:
    "Лендінг має доводити вміння ще до того, як людина купила курс.",
  facts: [
    "Лендінги й воронки під трафік з TikTok / Instagram / Telegram",
    "Фокус на швидкому результаті, не на «році теорії»",
    "UI в стилі iOS glass — сучасний вигляд без агентства",
    "Цей лендінг зібраний за 1 год 32 хв як живий кейс",
  ],
};

export const testimonials = [
  {
    name: "Марина",
    niche: "Бʼюті-майстер",
    quote:
      "За вечір зібрала лендінг під Reels. Наступного дня була перша заявка — без агентства.",
  },
  {
    name: "Андрій",
    niche: "Фріланс",
    quote:
      "Брав Community. У чаті скинули структуру — і я нарешті зрозумів, чому мій старий сайт не продавав.",
  },
  {
    name: "Олена",
    niche: "Онлайн-школа",
    quote:
      "Виглядає дорого. Клієнти перестали питати «а це Tilda?» — почали питати ціну.",
  },
  {
    name: "Ігор",
    niche: "SMM",
    quote:
      "Після модуля з оплатою підключив LiqPay за годину. Воронка з TikTok закрилась у продаж.",
  },
  {
    name: "Катя",
    niche: "Mentor-тариф",
    quote:
      "Розбір лендінгу на созвоні зекономив тиждень тикання. Переписала hero — конверсія виросла.",
  },
  {
    name: "Тарас",
    niche: "Перший сайт",
    quote:
      "Думав, що код — це космос. Зібрав свій перший лендінг і вже взяв замовлення в друга.",
  },
];

export const faq = [
  {
    q: "Чи потрібен досвід у коді?",
    a: "Ні. Пояснюю простими кроками. Якщо вже щось пробував — підеш швидше.",
  },
  {
    q: "Скільки часу займає курс?",
    a: "Базовий лендінг реально зібрати за вечір. Далі — полірування, оплата й трафік.",
  },
  {
    q: "Чим відрізняються тарифи?",
    a: "Start — матеріали. Community — плюс Telegram. Mentor — плюс мій супровід і розбір.",
  },
  {
    q: "Як видається доступ?",
    a: "Одразу після оплати: лист на email + інструкція. Для Community/Mentor — інвайт у TG.",
  },
  {
    q: "Що входить у менторство?",
    a: "14 днів чату, 2 созвонни 1:1 і один повний розбір твого лендінгу. Місць обмежено.",
  },
  {
    q: "Чи є повернення?",
    a: "Протягом 7 днів, якщо ти не відкривав більше 20% матеріалів. Деталі — в оферті.",
  },
  {
    q: "Яка платіжка?",
    a: "Картки Visa/Mastercard, Apple Pay / Google Pay. Оплата одноразова.",
  },
];

export const sourceSubtitles: Record<string, string> = {
  tiktok: "Зайшов з TikTok? Ось лендінг, зібраний за вечір — і курс, як робити такі самі.",
  instagram:
    "Зайшов з Instagram? Нижче — воронка, glass UI і тарифи під швидкий запуск.",
  telegram:
    "Зайшов з Telegram? Курс + комʼюніті, щоб зібрати сайт і не робити це наодинці.",
  default:
    "Курс для тих, хто хоче робити сайти собі, клієнтам і під запуск з TikTok",
};

export function subtitleForSource(from: string | null | undefined) {
  if (!from) return sourceSubtitles.default;
  return sourceSubtitles[from.toLowerCase()] ?? sourceSubtitles.default;
}
