import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolsByCategory } from "@/data/tools";

const categories = [
  ["MONEY", "돈과 금융", "대출·예적금·세금·목돈 계산", "/money"],
  ["HOME", "집과 주거", "면적·인테리어·이사·공과금 계산", "/home"],
  ["CAR", "자동차", "주유비·유지비·할부·충전비 계산", "/car"],
  ["BUY", "쇼핑", "할인·단가·할부·직구 비교", "/buy"],
  ["WORK", "직장", "근무시간·수당·연차·업무일 계산", "/work"],
  ["LIFE", "생활", "날짜·나이·수면·여행·기념일", "/life"],
] as const;

export default function HomePage() {
  const categoryTools = {
    MONEY: getToolsByCategory("MONEY"),
    HOME: getToolsByCategory("HOME"),
    CAR: getToolsByCategory("CAR"),
    BUY: getToolsByCategory("BUY"),
    WORK: getToolsByCategory("WORK"),
    LIFE: getToolsByCategory("LIFE"),
  };
  const readyTools = Object.values(categoryTools).flat();
  const featuredTools = Object.values(categoryTools).flatMap((items) => items.slice(0, 2));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container">
            <span className="eyebrow">무료 · 회원가입 없음 · 바로 사용</span>
            <h1>회원가입 없이 바로 쓰는 무료 생활도구</h1>
            <p>돈·집·자동차·쇼핑·직장·생활에 필요한 계산과 비교를 쉽고 빠르게. 결과표와 체크리스트도 필요한 도구에서는 무료로 제공합니다.</p>
            <div className="trust-row"><span className="trust-chip">✓ 회원가입 없음</span><span className="trust-chip">✓ 무료 이용</span><span className="trust-chip">✓ 바로 계산</span><span className="trust-chip">✓ 결과 저장·인쇄 지원</span></div>
          </div>
        </section>

        <section className="section"><div className="container"><h2>지금 바로 쓸 수 있는 생활도구 {readyTools.length}개</h2><p className="section-intro">MONEY·HOME·CAR·BUY·WORK·LIFE 6개 카테고리의 핵심 도구를 제공합니다. 자주 쓰는 계산과 비교부터 바로 시작하세요.</p><div className="grid">{featuredTools.map((tool) => (<Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-label">{tool.category}</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>))}</div></div></section>

        <section className="section"><div className="container"><h2>생활 전반을 6개 카테고리로</h2><p className="section-intro">각 카테고리에서 필요한 도구를 찾고, 개별 도구의 관련 도구 링크로 자연스럽게 이어서 사용할 수 있습니다.</p><div className="grid">{categories.map(([code, title, description, href]) => (<Link className="card" key={code} href={href}><span className="category-label">{code} · {categoryTools[code].length}개</span><h3>{title}</h3><p>{description}</p></Link>))}</div></div></section>
      </main>
      <footer className="footer"><div className="container">생활도구 · 로그인 없이 무료로 바로 사용하는 생활 계산·비교 서비스</div></footer>
    </>
  );
}
