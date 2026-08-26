import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "./theme.css";
import "./tool-hero-gradient.css";
import "./category-landing.css";
import "./hero-title-size.css";
import "./main-hero-gradient.css";
import "./info-pages.css";
import "./footer-theme.css";
import "./v1-final-polish.css";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingActions from "@/components/layout/FloatingActions";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://life-tools-one.vercel.app"),
  title: {
    default: "생활도구 | 회원가입 없이 바로 쓰는 무료 생활 계산기·도구",
    template: "%s | 생활도구",
  },
  description: "돈·금융, 집·주거, 자동차, 쇼핑, 직장·업무, 일상·생활에 필요한 계산·비교·차트·맞춤 양식을 회원가입 없이 무료로 이용하세요.",
  applicationName: "생활도구",
  category: "utilities",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "생활도구",
    title: "생활도구 | 무료 생활 계산기·도구",
    description: "계산부터 비교, 차트, PDF·CSV 맞춤 양식까지 무료로 이용하세요.",
    url: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body>{children}<FloatingActions/><SiteFooter/></body>
    </html>
  );
}
