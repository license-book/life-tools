import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";

const categories = [
  ["MONEY", "돈과 금융", "대출·예적금·세금·목돈 계산"],
  ["HOME", "집과 주거", "전월세·중개보수·이사·면적 계산"],
  ["CAR", "자동차", "유지비·세금·할부·연료비 계산"],
  ["BUY", "쇼핑", "할인·단가·할부·직구 비교"],
  ["WORK", "직장", "급여·연봉·퇴직금·연차 계산"],
  ["LIFE", "생활", "날짜·여행·생활비 계획"],
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container">
            <span className="eyebrow">무료 · 회원가입 없음 · 바로 사용</span>
            <h1>회원가입 없이 바로 쓰는 무료 생활도구</h1>
            <p>돈·집·자동차·쇼핑·직장·생활에 필요한 계산과 비교를 쉽고 빠르게. 결과표와 체크리스트도 필요한 도구에서는 무료로 제공합니다.</p>
            <div className="trust-row">
              <span className="trust-chip">✓ 회원가입 없음</span>
              <span className="trust-chip">✓ 무료 이용</span>
              <span className="trust-chip">✓ 바로 계산</span>
              <span className="trust-chip">✓ 결과 저장·인쇄 지원</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>먼저 써볼 핵심 도구</h2>
            <p className="section-intro">V1 첫 번째 도구부터 실제 생활 판단에 도움이 되는 상세 결과를 제공합니다.</p>
            <div className="grid">
              <Link className="card" href="/tools/loan-calculator">
                <span className="category-label">MONEY</span>
                <h3>대출 이자·상환 계산기</h3>
                <p>월 상환액, 총이자, 상환방식 비교와 전체 상환계획표를 확인하세요.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>생활 전반을 6개 카테고리로</h2>
            <p className="section-intro">초기 30개에서 시작해 공통 TOOL 엔진으로 계속 확장합니다.</p>
            <div className="grid">
              {categories.map(([code, title, description]) => (
                <article className="card" key={code}>
                  <span className="category-label">{code}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="container">생활도구 · 로그인 없이 무료로 바로 사용하는 생활 계산·비교 서비스</div></footer>
    </>
  );
}
