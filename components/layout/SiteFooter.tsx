import Link from "next/link";

function FooterLogoIcon(){
  return <span className="site-footer-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M7 9.5h8M11 5.5v8M18 9.5h8M7 22.5h8M18 18.5l8 8M26 18.5l-8 8"/><circle cx="22" cy="15.5" r="1.7" fill="currentColor" stroke="none"/><circle cx="22" cy="29" r="1.7" fill="currentColor" stroke="none"/></svg></span>;
}

export default function SiteFooter(){
  return <footer className="site-footer">
    <div className="container site-footer-grid">
      <div className="site-footer-brand">
        <Link href="/" className="site-footer-logo"><FooterLogoIcon/><span>생활도구</span></Link>
        <p>돈, 집, 자동차, 쇼핑, 직장, 일상에 필요한 계산과 비교 도구를 회원가입 없이 바로 이용하세요.</p>
      </div>
      <div className="site-footer-column"><strong>생활도구</strong><Link href="/money">돈·금융</Link><Link href="/home">집·주거</Link><Link href="/car">자동차</Link><Link href="/buy">쇼핑</Link><Link href="/work">직장·업무</Link><Link href="/life">일상·생활</Link></div>
      <div className="site-footer-column"><strong>안내</strong><Link href="/about">서비스 소개</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link><Link href="/contact">문의</Link></div>
    </div>
    <div className="container site-footer-bottom"><p>© {new Date().getFullYear()} 생활도구. All rights reserved.</p><p>계산 결과는 입력값과 일반적인 기준에 따른 참고용 정보입니다.</p></div>
  </footer>;
}