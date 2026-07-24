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
  title: "NOMORE LAB — курс зі створення сайтів",
  description:
    "Навчись збирати сучасні лендінги під TikTok, Instagram і Telegram. Цей сайт зібрано за 1 год 32 хв.",
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
