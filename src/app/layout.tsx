import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Survey Quest — Gamified Survey Experience",
  description:
    "Help us understand how to make surveys better — while having fun! Earn XP, level up, and answer 15 quick questions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
