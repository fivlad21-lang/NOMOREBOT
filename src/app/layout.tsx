import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LEV Estates Demo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
