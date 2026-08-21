import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import LoanCalculator from "@/components/tools/LoanCalculator";
import { loanCalculatorTool } from "@/data/tools/loan-calculator";

export const metadata: Metadata = {
  title: loanCalculatorTool.seo.title,
  description: loanCalculatorTool.seo.description,
  keywords: loanCalculatorTool.seo.keywords,
  alternates: { canonical: "/tools/loan-calculator" },
};

const faq = [
  ["원리금균등상환은 무엇인가요?", "대출기간 동안 원금과 이자를 합친 월 상환액이 거의 일정하도록 계산하는 방식입니다. 초반에는 이자 비중이 높고 시간이 지날수록 원금 비중이 커집니다."],
  ["원금균등상환은 무엇인가요?", "매달 갚는 원금을 동일하게 나누고 남은 원금에 대한 이자를 더하는 방식입니다. 첫 상환액이 상대적으로 크지만 시간이 지날수록 월 부담이 줄고 총이자는 원리금균등보다 적어지는 경우가 많습니다."],
  ["실제 은행 상환액과 차이가 날 수 있나요?", "네. 금융기관의 이자 계산일수, 납입일, 금리변동, 우대금리, 거치기간, 중도상환 등에 따라 실제 금액은 달라질 수 있습니다."],
  ["상환계획표를 무료로 받을 수 있나요?", "네. 회원가입이나 이메일 입력 없이 전체 상환계획을 CSV 파일로 저장할 수 있습니다."],
] as const;

export default function LoanCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: loanCalculatorTool.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: loanCalculatorTool.seo.description,
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="tool-hero">
          <div className="container">
            <span className="eyebrow">MONEY · 무료 · 회원가입 없음</span>
            <h1>{loanCalculatorTool.name}</h1>
            <p>{loanCalculatorTool.heroDescription}</p>
            <div className="trust-row">
              {loanCalculatorTool.badges.map((badge) => <span className="trust-chip" key={badge}>✓ {badge}</span>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>내 대출 조건으로 바로 계산해보세요</h2>
            <p className="section-intro">대출금액, 연 이자율, 기간, 상환방식을 바꾸면 결과와 월별 상환계획이 즉시 다시 계산됩니다.</p>
            <LoanCalculator />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid">
              <article className="card"><span className="category-label">핵심 포인트 01</span><h3>월 상환액만 보지 마세요</h3><p>같은 대출금이라도 기간과 상환방식에 따라 총이자가 크게 달라질 수 있습니다. 월 부담과 전체 비용을 함께 비교하는 것이 중요합니다.</p></article>
              <article className="card"><span className="category-label">핵심 포인트 02</span><h3>상환방식의 차이</h3><p>원리금균등은 월 부담을 일정하게 관리하기 좋고, 원금균등은 초반 부담이 더 크지만 총이자를 줄이는 데 유리할 수 있습니다.</p></article>
              <article className="card"><span className="category-label">핵심 포인트 03</span><h3>금리 0.1%도 확인</h3><p>대출금이 크고 기간이 길수록 작은 금리 차이가 누적 이자에 미치는 영향이 커집니다. 여러 금리 조건을 바꿔 비교해보세요.</p></article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>대출 상환 방식은 어떻게 계산하나요?</h2>
            <div className="card">
              <h3>원리금균등상환</h3>
              <p>매월 비슷한 금액을 상환하도록 월 이자율과 남은 기간을 반영해 계산합니다. 초기에는 이자 비중이 높고 시간이 지나면서 원금 상환 비중이 커집니다.</p>
              <h3 style={{ marginTop: 24 }}>원금균등상환</h3>
              <p>대출원금을 전체 개월 수로 균등하게 나눈 뒤 매월 남은 원금에 대한 이자를 더합니다. 남은 원금이 줄어들기 때문에 월 상환액도 점차 감소합니다.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>계산 예시</h2>
            <p className="section-intro">예를 들어 3억원을 연 4.2%, 30년으로 대출받는 상황을 입력한 뒤 상환방식을 바꿔보면 월 상환 부담과 총이자 차이를 바로 비교할 수 있습니다.</p>
            <div className="notice">실제 대출 비교에서는 계산 결과와 함께 금융기관의 적용금리, 금리 유형(고정·변동·혼합), 중도상환수수료, 우대조건도 함께 확인하세요.</div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>자주 묻는 질문</h2>
            <div className="grid">
              {faq.map(([question, answer]) => <article className="card" key={question}><h3>{question}</h3><p>{answer}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>무료 상환계획표</h2>
            <div className="card">
              <h3>계산 결과를 내 파일로 저장하세요</h3>
              <p>계산 결과 영역의 ‘무료 상환계획표 CSV 저장’ 버튼을 누르면 전체 대출기간의 회차별 상환액·원금·이자·남은 원금을 회원가입 없이 저장할 수 있습니다.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="container">본 계산기는 일반적인 상환 공식을 이용한 참고용 도구이며 금융상품 계약 전 실제 금융기관의 조건을 확인해야 합니다.</div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
