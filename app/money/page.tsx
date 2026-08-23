import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolsByCategory } from "@/data/tools";

export const metadata: Metadata = {
  title: "MONEY 생활도구 | 대출·예적금·세금·급여 계산기",
  description: "대출, 예금, 적금, 복리, 부가세, 급여, 퇴직금 등 돈과 금융에 필요한 무료 계산기를 한곳에서 이용하세요.",
  alternates: { canonical: "/money" },
};

export default function MoneyPage() {
  const tools = getToolsByCategory("MONEY");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero category-hero">
          <div className="container">
            <span className="eyebrow">MONEY · 돈과 금융</span>
            <h1>생활 속 돈 계산을 한곳에서</h1>
            <p>대출 상환부터 예적금, 복리, 부가세, 급여와 퇴직금까지 자주 필요한 금융 계산을 회원가입 없이 바로 사용할 수 있습니다.</p>
            <div className="trust-row">
              <span className="trust-chip">✓ 무료</span>
              <span className="trust-chip">✓ 회원가입 없음</span>
              <span className="trust-chip">✓ 계산 기준 설명</span>
              <span className="trust-chip">✓ 결과 저장·인쇄</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>MONEY 도구 {tools.length}개</h2>
            <p className="section-intro">필요한 계산을 선택하면 상세 기준과 결과 해석까지 함께 확인할 수 있습니다.</p>
            <div className="grid">
              {tools.map((tool) => (
                <Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}>
                  <span className="category-label">MONEY</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>어떤 도구부터 쓰면 좋을까요?</h2>
            <div className="grid">
              <article className="card"><span className="category-label">대출·이자</span><h3>빌리거나 모을 돈 계산</h3><p>대출 상환, 예금, 적금, 복리 계산기로 월 부담과 이자 차이를 비교해보세요.</p></article>
              <article className="card"><span className="category-label">세금·가격</span><h3>부가세와 할인 계산</h3><p>공급가액·부가세 역산과 할인 전후 가격을 빠르게 확인할 수 있습니다.</p></article>
              <article className="card"><span className="category-label">급여·직장</span><h3>월급과 연봉 계획</h3><p>실수령액, 연봉 환산, 시급 변환, 퇴직금 추정을 함께 이용하면 급여 흐름을 보기 쉽습니다.</p></article>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="container">MONEY · 생활에 필요한 돈과 금융 계산 도구</div></footer>
    </>
  );
}
