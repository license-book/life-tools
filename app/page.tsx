import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolsByCategory } from "@/data/tools";

const categories = [
  ["MONEY", "돈과 금융", "대출·예적금·세금·목돈 계산", "/money"],
  ["HOME", "집과 주거", "전월세·중개보수·이사·면적 계산", "/home"],
  ["CAR", "자동차", "유지비·세금·할부·연료비 계산", "/car"],
  ["BUY", "쇼핑", "할인·단가·할부·직구 비교", "/buy"],
  ["WORK", "직장", "급여·연봉·퇴직금·연차 계산", "/work"],
  ["LIFE", "생활", "날짜·여행·생활비 계획", "/life"],
] as const;

export default function HomePage() {
  const moneyTools = getToolsByCategory("MONEY");

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
            <h2>지금 바로 쓸 수 있는 MONEY 도구</h2>
            <p className="section-intro">대출·예적금·세금·급여 계산까지 MONEY 도구 10개를 먼저 제공합니다.</p>
            <div className="grid">
              {moneyTools.slice(0, 6).map((tool) => (
                <Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}>
                  <span className="category-label">MONEY</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.shortDescription}</p>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 18 }}><Link className="text-button" href="/money">MONEY 전체 10개 도구 보기 →</Link></p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>생활 전반을 6개 카테고리로</h2>
            <p className="section-intro">MONEY부터 시작해 HOME·CAR·BUY·WORK·LIFE로 계속 확장합니다.</p>
            <div className="grid">
              {categories.map(([code, title, description, href]) => (
                <Link className="card" key={code} href={href}>
                  <span className="category-label">{code}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="container">생활도구 · 로그인 없이 무료로 바로 사용하는 생활 계산·비교 서비스</div></footer>
    </>
  );
}
