import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolsByCategory } from "@/data/tools";

export const metadata: Metadata = {
  title: "LIFE 생활도구 | 날짜·나이·수면·여행·기념일 도구",
  description: "날짜 기간, 만 나이, 수면시간, 여행 준비물, 기념일 계산 등 일상에서 자주 필요한 LIFE 도구를 모았습니다.",
  alternates: { canonical: "/life" },
};

export default function LifePage() {
  const tools = getToolsByCategory("LIFE");
  return <><SiteHeader/><main>
    <section className="hero"><div className="container"><span className="eyebrow">LIFE · 일상과 생활</span><h1>날짜부터 여행 준비까지 일상 계산을 간단하게</h1><p>날짜·기간, 만 나이, 수면시간, 여행 준비물, 기념일처럼 자주 확인하는 생활 정보를 빠르게 계산하고 정리하세요.</p><div className="trust-row"><span className="trust-chip">✓ 무료</span><span className="trust-chip">✓ 회원가입 없음</span><span className="trust-chip">✓ 즉시 계산</span><span className="trust-chip">✓ 인쇄·PDF 저장</span></div></div></section>
    <section className="section"><div className="container"><h2>LIFE 도구 {tools.length}개</h2><p className="section-intro">복잡한 가입이나 저장 없이 바로 쓰고, 필요한 결과는 인쇄하거나 PDF로 보관할 수 있습니다.</p><div className="grid">{tools.map(tool=><Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-label">LIFE</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>)}</div></div></section>
    <section className="section"><div className="container"><h2>상황별 추천</h2><div className="grid"><article className="card"><span className="category-label">날짜</span><h3>기간과 기념일</h3><p>날짜·기간 계산기와 기념일 계산기를 이어서 사용하면 일정과 D-day를 함께 정리할 수 있습니다.</p></article><article className="card"><span className="category-label">일상</span><h3>나이와 수면시간</h3><p>기준일 현재 만 나이와 취침·기상 시각 사이의 수면 가능 시간을 빠르게 확인합니다.</p></article><article className="card"><span className="category-label">여행</span><h3>출발 전 준비</h3><p>여행 기간을 날짜 계산기로 확인하고 준비물 체크리스트까지 이어서 정리하세요.</p></article></div></div></section>
  </main><footer className="footer"><div className="container">LIFE · 일상과 생활을 위한 무료 계산·체크 도구</div></footer></>;
}
