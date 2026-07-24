import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { Pixels } from "@/components/analytics/Pixels";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nomorelab.wtf";

export const metadata: Metadata = {
  title: "NOMORE LAB — сайти для бізнесу",
  description:
    "Курс зі створення лендінгів і воронок для бізнесу: заявки, оплата, самостійні правки. Без залежності від агентства. nomorelab.wtf",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "NOMORE LAB — сайти для бізнесу",
    description:
      "Збери лендінг під TikTok за вечір — і приймай оплату. Курс сайтів і воронок для бізнесу.",
    url: siteUrl,
    siteName: "NOMORE LAB",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOMORE LAB — сайти для бізнесу",
    description:
      "Збери лендінг під TikTok за вечір — і приймай оплату. Курс сайтів і воронок для бізнесу.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${unbounded.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <AttributionCapture />
        <Pixels />
        {children}
      </body>
    </html>
  );
}
