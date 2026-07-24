import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
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

export const metadata: Metadata = {
  title: "NOMORE LAB.wtf — сайти для бізнесу",
  description:
    "Курс зі створення лендінгів і воронок для бізнесу: заявки, оплата, самостійні правки. Без залежності від агентства. nomorelab.wtf",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nomorelab.wtf",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${unbounded.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
