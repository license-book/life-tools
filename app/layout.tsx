import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "생활도구 | 회원가입 없이 바로 쓰는 무료 생활도구",
  description: "돈, 집, 자동차, 쇼핑, 직장, 생활에 필요한 계산과 비교를 회원가입 없이 무료로 이용하세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
