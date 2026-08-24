import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "사이트맵 | 생활도구",
  description: "생활도구의 카테고리, 계산기와 안내 페이지를 한눈에 확인하세요.",
};

const categories = [
  { key: "MONEY", name: "돈·금융", href: "/money" },
  { key: "HOME", name: "집·주거", href: "/home" },
  { key: "CAR", name: "자동차", href: "/car" },
  { key: "BUY", name: "쇼핑", href: "/buy" },
  { key: "WORK", name: "직장·업무", href: "/work" },
  { key: "LIFE", name: "일상·생활", href: "/life" },
] as const;

export default function SitemapPage() {
  return <>
    <SiteHeader />
    <main>
      <section className="info-hero">
        <div className="container">
          <span className="eyebrow">SITE MAP</span>
          <h1>사이트맵</h1>
          <p>생활도구의 카테고리와 계산기, 안내 페이지를 한곳에서 확인할 수 있습니다.</p>
        </div>
      </section>
      <section className="section">
        <div className="container sitemap-page-grid">
          <section className="panel sitemap-main-links">
            <h2>주요 페이지</h2>
            <div className="sitemap-link-grid">
              <Link href="/">생활도구 홈</Link>
              {categories.map((category) => <Link key={category.key} href={category.href}>{category.name}</Link>)}
            </div>
          </section>
          {categories.map((category) => {
            const categoryTools = tools.filter((tool) => tool.category === category.key);
            return <section className="panel sitemap-category" key={category.key}>
              <div className="sitemap-heading"><h2>{category.name}</h2><Link href={category.href}>전체 보기 →</Link></div>
              <div className="sitemap-tool-list">
                {categoryTools.map((tool) => <Link key={tool.slug} href={`/tools/${tool.slug}`}>{tool.title}</Link>)}
              </div>
            </section>;
          })}
          <section className="panel sitemap-category">
            <h2>안내</h2>
            <div className="sitemap-tool-list">
              <Link href="/about">서비스 소개</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link><Link href="/contact">문의</Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  </>;
}
