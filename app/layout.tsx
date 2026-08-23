import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "./theme.css";
import "./tool-hero-gradient.css";
import "./category-landing.css";
import "./hero-title-size.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "생활도구 | 회원가입 없이 바로 쓰는 무료 생활도구",
  description: "돈, 집, 자동차, 쇼핑, 직장, 생활에 필요한 계산과 비교를 회원가입 없이 무료로 이용하세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body>{children}</body>
    </html>
  );
}
