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

export const BRAND = "NOMORE LAB";
export const BUILD_TIME = "1 год 32 хв";
export const MENTOR_SEATS = 8;

export const contacts = {
  telegram: "https://t.me/notany",
  telegramHandle: "@notany",
  instagram: "https://instagram.com/nomorevlad",
  email: "fivlad.21@gmail.com",
};

/** Post-payment Telegram access by plan */
export const access = {
  courseChannel: "https://t.me/+b2AESFebi0szNmJi",
  communityGroup: "https://t.me/+ARjwuE-PnJo5ZWRi",
};

export const thanksCopy = {
  start: {
    title: "Ти в курсі",
    body: "Доступ до курсу в закритому Telegram-каналі. Натисни кнопку нижче і збережи канал.",
  },
  community: {
    title: "Курс + комʼюніті твої",
    body: "Курс — у каналі. Питання й розбори — у групі комʼюніті. Зайди в обидва.",
  },
  mentor: {
    title: "Менторство відкрито",
    body: "Курс і комʼюніті вже твої. Напиши мені в Telegram, щоб узгодити дзвінки та розбір лендінгу.",
  },
  fail: {
    title: "Оплата не пройшла",
    body: "WayForPay не підтвердив оплату. Спробуй ще раз або напиши @notany з номером замовлення — перевіримо вручну.",
  },
} as const;

export const expertPhoto = "/course/expert.png";

export const navItems = [
  { href: "#top", label: "Старт", id: "top" },
  { href: "#proof", label: "Результат", id: "proof" },
  { href: "#program", label: "Програма", id: "program" },
  { href: "#expert", label: "Експерт", id: "expert" },
  { href: "#reviews", label: "Відгуки", id: "reviews" },
  { href: "#faq", label: "FAQ", id: "faq" },
  { href: "#pricing", label: "Тарифи", id: "pricing" },
] as const;

export const plans: Plan[] = [
  {
    id: "start",
    name: "Start",
    priceUsd: 20,
    priceUah: 820,
    tone: "quiet",
    features: [
      "Повний відеокурс у закритому Telegram-каналі",
      "Готові структури лендінгів під офер",
      "Чеклісти: запуск, оплата, правки",
      "Оновлення уроків без доплати",
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
      "Усе з тарифу Start (канал з курсом)",
      "Закрита Telegram-група комʼюніті",
      "Питання по ходу збірки — відповіді від людей, хто вже запускав",
      "Розбори чужих лендінгів і робочі приклади",
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
      "Усе з тарифу Community (канал + група)",
      "14 днів особистого чату зі мною",
      "2 дзвінки 1:1",
      "1 повний розбір твого лендінгу під твій офер",
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
    label: "Контроль",
    pain: "Віддав сайт підряднику — і чекаєш тижнями на дрібну правку.",
    fix: "Ти сам ведеш процес: додаєш блоки, функції й тексти, коли треба, без черги в агентстві.",
  },
  {
    label: "Правки наживо",
    pain: "Знайшов баг або кривий блок — і знову писати програмісту.",
    fix: "Бачиш проблему — фіксиш сам у реальному часі. Без посередників і зайвих рахунків.",
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
    text: "Одразу після оплати — кнопки в Telegram: канал з курсом і (на вищих тарифах) група комʼюніті.",
  },
  {
    n: "03",
    title: "Збираєш лендінг",
    text: "Йдеш по сценарію курсу і запускаєш сторінку, яка продає.",
  },
];

export const expert = {
  name: "Владислав",
  role: "Роблю і навчаю робити сайти для бізнесу — лендінги й воронки, які приймають оплату",
  philosophy:
    "Сайт має продавати ще до того, як ти почав пояснювати, «як ти його зробив».",
  facts: [
    "Сайти й лендінги під бізнес-задачі: заявки, продажі, запис, оплата",
    "Структура під реальний трафік з соцмереж — не «красива картинка», а шлях клієнта до дії",
    "Повний цикл: від ідеї й текстів до запуску і правок без залежності від агентства",
    "Цей лендінг — робочий кейс під офер курсу; зібраний за 1 год 32 хв тим самим підходом",
  ],
};

export type Testimonial = {
  name: string;
  age: number;
  niche: string;
  pain: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Марк",
    age: 21,
    niche: "Фріланс",
    pain: "хотів продавати",
    quote:
      "Брав, бо хотів не просто «вчити html», а реально продавати сайти. Зібрав ленд за вечір, кинув другу — той скинув задаток. Це вже не теорія.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    name: "Оксана",
    age: 45,
    niche: "Свій бізнес",
    pain: "хотіла зекономити",
    quote:
      "Агентству ломить космос. Зробила сама під свій бізнес і досі кайфую, що не віддала пів зарплати за «шаблончик».",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    name: "Денис",
    age: 34,
    niche: "Запуск оферу",
    pain: "треба було швидко і доступно",
    quote:
      "Мені треба було вчора. Без води, без «модуль 40». Відкрив — зробив — залив. Найадекватніший шлях, який бачив.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    name: "Юля",
    age: 28,
    niche: "Онлайн-послуги",
    pain: "сайт виглядав дешево",
    quote:
      "Мій старий сайт виглядав як 2017. Після курсу люди перестали питати «це конструктор?», почали питати прайс.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    name: "Ігор",
    age: 31,
    niche: "SMM / TikTok",
    pain: "трафік був, продажів — нуль",
    quote:
      "Трафік був, сайту нормального — нуль. Підключив оплату по уроку і нарешті воронка закрилась у продаж, а не в «напишіть в дірект».",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    name: "Катя",
    age: 26,
    niche: "Mentor",
    pain: "боялась застрягнути",
    quote:
      "Сама б тиждень тикала. На розборі переписали hero — і заявки пішли. Якщо боїшся застрягнути — Mentor реально топ.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&h=160&q=80",
  },
];

export const faq = [
  {
    q: "Чи треба вміти програмувати?",
    a: "Ні. Курс розрахований на людей без технічної бази. Якщо вже щось збирав на Tilda чи з AI — просто підеш швидше. Якщо ні — пройдеш той самий шлях, тільки з поясненнями «навіщо» кожен крок.",
  },
  {
    q: "Скільки часу треба, щоб був готовий сайт?",
    a: "Базовий лендінг під офер реально зібрати за один вечір, якщо сісти й робити. Далі — підключити оплату, підчистити тексти й залити домен. Це не «курс на пів року», а робочий сценарій запуску.",
  },
  {
    q: "Чим Start відрізняється від Community і Mentor?",
    a: "Start — лише матеріали в каналі з курсом, якщо любиш розбиратися сам. Community — канал + закрита група, де можна скинути екран і спитати людей, хто вже запускав. Mentor — усе попереднє плюс мій особистий супровід: 14 днів у чаті, 2 дзвінки і один повний розбір твого лендінгу.",
  },
  {
    q: "Як я отримаю доступ після оплати?",
    a: "На thank-you сторінці одразу зʼявляться кнопки. Start — закритий Telegram-канал з курсом. Community і Mentor — канал + закрита група комʼюніті. Mentor додатково пише мені в @notany для дзвінків і розбору. Якщо щось не відкрилось — напиши @notany з номером замовлення.",
  },
  {
    q: "Що саме входить у менторство?",
    a: "14 днів особистого чату, 2 дзвінки 1:1 і один глибокий розбір твого лендінгу: структура, тексти, візуал, шлях до оплати. Це не «буду писати тобі код замість тебе» — це фідбек і правки по твоєму запуску. Місць обмежено.",
  },
  {
    q: "А якщо не зайде — можна повернути гроші?",
    a: "Так, протягом 7 днів після покупки, якщо ти не відкрив більше 20% матеріалів. Пишеш на email або в Telegram з номером замовлення — повертаємо. Умови зафіксовані в публічній оферті: /legal/offer.",
  },
  {
    q: "Якими способами можна оплатити?",
    a: "Карткою Visa/Mastercard, Apple Pay або Google Pay через WayForPay. Оплата одноразова, без підписки. Після успішної оплати відкривається доступ на thank-you сторінці.",
  },
  {
    q: "Що якщо оплата не пройшла?",
    a: "На thank-you сторінці побачиш fail-стан без посилань на курс. Натисни «Спробувати ще раз» або напиши @notany з номером замовлення — перевіримо вручну. Доступ відкриваємо тільки після підтвердження WayForPay (Approved).",
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
