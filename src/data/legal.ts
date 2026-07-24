export const DOMAIN = "nomorelab.wtf";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${DOMAIN}`;

/** Seller / payee details for legal pages (not FOP yet — OK for soft launch). */
export const legalEntity = {
  name: "Фурман Владислав Іванович",
  ipn: "3752109313",
  iban: "UA713220010000026205360316289",
  email: "fivlad.21@gmail.com",
  telegram: "@notany",
  telegramUrl: "https://t.me/notany",
  note: "Оплата онлайн через WayForPay. Статус ФОП може бути уточнений пізніше без зміни умов доступу до курсу.",
} as const;

export const refundPolicy = {
  days: 7,
  materialsCapPercent: 20,
  summary:
    "Протягом 7 днів після оплати можна попросити повернення, якщо відкрито не більше 20% матеріалів курсу. Запит — на email або в Telegram з номером замовлення.",
} as const;
