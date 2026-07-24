import type { PlanId } from "@/data/course";
import { access, contacts } from "@/data/course";

export type AccessGrant = {
  courseChannel: boolean;
  communityGroup: boolean;
  mentorDm: boolean;
};

export const accessMatrix: Record<PlanId, AccessGrant> = {
  start: {
    courseChannel: true,
    communityGroup: false,
    mentorDm: false,
  },
  community: {
    courseChannel: true,
    communityGroup: true,
    mentorDm: false,
  },
  mentor: {
    courseChannel: true,
    communityGroup: true,
    mentorDm: true,
  },
};

export function grantsForPlan(planId: PlanId): AccessGrant {
  return accessMatrix[planId];
}

export function mentorDmHref(orderId?: string | null) {
  const text = orderId
    ? `Привіт! Оплатив Mentor. Замовлення: ${orderId}`
    : "Привіт! Оплатив Mentor — готові узгодити дзвінки.";
  return `${contacts.telegram}?text=${encodeURIComponent(text)}`;
}

export function accessLinksForPlan(planId: PlanId) {
  const g = grantsForPlan(planId);
  const links: Array<{ href: string; label: string; primary?: boolean }> = [];
  if (g.courseChannel) {
    links.push({
      href: access.courseChannel,
      label: "Відкрити канал курсу",
      primary: true,
    });
  }
  if (g.communityGroup) {
    links.push({
      href: access.communityGroup,
      label: "Увійти в комʼюніті",
    });
  }
  if (g.mentorDm) {
    links.push({
      href: contacts.telegram,
      label: "Написати мені",
    });
  }
  return links;
}

export const nextStepsByPlan: Record<
  PlanId,
  Array<{ n: string; text: string }>
> = {
  start: [
    { n: "1", text: "Зайди в канал курсу і збережи його в Telegram." },
    { n: "2", text: "Прочитай закріп: як проходити і куди писати підтримку." },
    { n: "3", text: "Почни з Модуля 1 — без стрибків уперед." },
  ],
  community: [
    { n: "1", text: "Зайди в канал курсу (матеріали)." },
    { n: "2", text: "Зайди в групу комʼюніті (питання й розбори)." },
    { n: "3", text: "Представся коротко в групі: ніша + що збираєш." },
  ],
  mentor: [
    { n: "1", text: "Зайди в канал і групу комʼюніті." },
    {
      n: "2",
      text: "Натисни «Написати мені» — у повідомленні вже буде номер замовлення.",
    },
    {
      n: "3",
      text: "Узгодимо 2 дзвінки і розбір лендінгу в особистих.",
    },
  ],
};
