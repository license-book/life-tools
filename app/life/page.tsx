import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolsByCategory } from "@/data/tools";

export const metadata: Metadata = {
  title: "LIFE 생활도구 | 날짜·시간·여행·수면·페이스 계산기",
  description: "날짜 기간, 만 나이, 시간 차이, 출발시간, 수면시간, 여행 준비물·여행비·수하물, 기념일, 걷기·달리기 페이스 도구를 모았습니다.",
  alternates: { canonical: "/life" },
};

export default function LifePage(){
  const tools=getToolsByCategory("LIFE");
  return <><SiteHeader/><main>
    <section className="hero"><div className="container"><span className="eyebrow">LIFE · 일상과 계획</span><h1>시간·일정·여행까지 일상에 필요한 계산을 한곳에서</h1><p>날짜와 시간 계산부터 수면 일정, 여행 준비와 경비, 수하물 무게, 기념일, 걷기·달리기 페이스까지 반복해서 확인하는 생활 정보를 빠르게 계산하고 정리하세요.</p><div className="trust-row"><span className="trust-chip">✓ 무료</span><span className="trust-chip">✓ 회원가입 없음</span><span className="trust-chip">✓ 즉시 계산</span><span className="trust-chip">✓ 결과 저장·인쇄</span></div></div></section>
    <section className="section"><div className="container"><h2>LIFE 도구 {tools.length}개</h2><p className="section-intro">날짜·시간·생활계획·여행처럼 일상에서 자주 반복되는 계산을 외부 가입 없이 바로 사용할 수 있습니다.</p><div className="grid">{tools.map(tool=><Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-label">LIFE</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>)}</div></div></section>
    <section className="section"><div className="container"><h2>상황별 추천</h2><div className="grid"><article className="card"><span className="category-label">시간·날짜</span><h3>기간과 출발시간 계획</h3><p>두 날짜·시각 사이의 차이를 계산하고 목표 도착시각에서 이동·여유시간을 빼 적절한 출발시각을 잡아보세요.</p></article><article className="card"><span className="category-label">생활</span><h3>수면·기념일·페이스</h3><p>수면 가능시간과 기념일 날짜를 확인하고 걷기·달리기 기록은 km당 페이스와 평균속도로 정리할 수 있습니다.</p></article><article className="card"><span className="category-label">여행</span><h3>준비물·경비·수하물</h3><p>맞춤 준비물을 체크한 뒤 공동 여행비의 1인당 부담액과 수하물 여유중량까지 이어서 계산하세요.</p></article></div></div></section>
  </main><footer className="footer"><div className="container">LIFE · 일상과 계획을 위한 무료 생활도구</div></footer></>;
}
