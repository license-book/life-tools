import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolsByCategory } from "@/data/tools";

export const metadata: Metadata = {
  title: "LIFE 생활도구 | 날짜·나이·수면·여행·기념일 도구",
  description: "날짜 기간, 만 나이, 수면시간, 여행 준비물, 기념일 계산 등 일상에서 자주 쓰는 LIFE 생활도구를 모았습니다.",
  alternates: { canonical: "/life" },
};

export default function LifePage(){
  const tools=getToolsByCategory("LIFE");
  return <><SiteHeader/><main>
    <section className="hero"><div className="container"><span className="eyebrow">LIFE · 일상과 계획</span><h1>날짜부터 여행 준비까지 일상 계산을 간단하게</h1><p>날짜·기간, 만 나이, 수면시간, 여행 준비물, 기념일처럼 생활에서 반복해서 확인하는 정보를 빠르게 계산하고 정리하세요.</p><div className="trust-row"><span className="trust-chip">✓ 무료</span><span className="trust-chip">✓ 회원가입 없음</span><span className="trust-chip">✓ 즉시 계산</span><span className="trust-chip">✓ 결과 저장·인쇄</span></div></div></section>
    <section className="section"><div className="container"><h2>LIFE 도구 {tools.length}개</h2><p className="section-intro">일정과 생활계획에 바로 쓸 수 있는 도구부터 시작해 향후 여행·시간·기념일 분야로 확장합니다.</p><div className="grid">{tools.map(tool=><Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-label">LIFE</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>)}</div></div></section>
    <section className="section"><div className="container"><h2>상황별 추천</h2><div className="grid"><article className="card"><span className="category-label">날짜</span><h3>기간·나이·기념일</h3><p>두 날짜 사이 기간을 계산하고, 생년월일 기준 만 나이와 100일·1주년 같은 기념일도 이어서 확인하세요.</p></article><article className="card"><span className="category-label">생활</span><h3>수면 일정 점검</h3><p>취침·기상 시각을 넣어 실제 확보 가능한 수면시간과 목표 수면시간 기준 취침 시각을 확인하세요.</p></article><article className="card"><span className="category-label">여행</span><h3>맞춤 준비물 체크</h3><p>국내·해외, 여행기간, 아이 동반 여부에 맞춰 준비물을 만들고 체크한 뒤 인쇄하거나 PDF로 저장하세요.</p></article></div></div></section>
  </main><footer className="footer"><div className="container">LIFE · 일상과 계획을 위한 무료 생활도구</div></footer></>;
}
