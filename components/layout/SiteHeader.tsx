"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./SiteHeader.module.css";

const nav = [
  { label:"MONEY", href:"/money", description:"돈과 금융", tools:[["대출 이자·상환 계산기","/tools/loan-calculator"],["예금 이자 계산기","/tools/deposit-interest"],["급여 실수령액 계산기","/tools/salary-net-calculator"],["퇴직금 계산기","/tools/severance-pay"]] },
  { label:"HOME", href:"/home", description:"집과 주거", tools:[["평수·제곱미터 변환기","/tools/area-pyeong"],["방 면적 계산기","/tools/room-area"],["이사 예산 계산기","/tools/moving-budget"],["가전 전기요금 추정기","/tools/electricity-estimator"]] },
  { label:"CAR", href:"/car", description:"자동차", tools:[["주유비 계산기","/tools/fuel-cost"],["실연비 계산기","/tools/fuel-efficiency"],["자동차 할부 계산기","/tools/car-loan"],["자동차 유지비 계산기","/tools/ownership-cost"]] },
  { label:"BUY", href:"/buy", description:"쇼핑", tools:[["단가 비교 계산기","/tools/unit-price"],["1+1·2+1 묶음 할인","/tools/bundle-deal"],["할인·쿠폰·카드 중복","/tools/coupon-stack"],["해외직구 총비용 계산기","/tools/overseas-total-cost"]] },
  { label:"WORK", href:"/work", description:"직장과 업무", tools:[["근무시간 계산기","/tools/work-hours"],["연장근로수당 계산기","/tools/overtime-pay"],["연차 잔여일 계산기","/tools/annual-leave-balance"],["영업일 계산기","/tools/business-days"]] },
  { label:"LIFE", href:"/life", description:"일상과 생활", tools:[["날짜·기간 계산기","/tools/date-period"],["나이·만나이 계산기","/tools/age-calculator"],["수면시간 계산기","/tools/sleep-time"],["여행 준비물 체크리스트","/tools/travel-packing-checklist"]] },
] as const;

function CalculatorLogoIcon(){
  return <span className={styles.logoIcon} aria-hidden="true"><svg viewBox="0 0 32 32"><rect x="5" y="3" width="22" height="26" rx="5"/><path d="M10 8h12v5H10z"/><path d="M11 18h2M19 18h2M11 23h2M19 23h2"/></svg></span>;
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="header">
    <div className="container header-inner">
      <Link className={`logo ${styles.brandLogo}`} href="/" onClick={()=>setMenuOpen(false)}><CalculatorLogoIcon/><span>생활도구</span></Link>
      <nav className="nav" aria-label="주요 카테고리">{nav.map((item)=><div className={styles.desktopNavItem} key={item.label}><Link className={styles.desktopNavLink} href={item.href}>{item.label}<span className={styles.chevron} aria-hidden="true">⌄</span></Link><div className={styles.submenu}><div className={styles.submenuHeading}><strong>{item.label}</strong><span>{item.description}</span></div><div className={styles.submenuLinks}>{item.tools.map(([toolLabel,toolHref])=><Link key={toolHref} href={toolHref}>{toolLabel}</Link>)}</div><Link className={styles.viewAll} href={item.href}>{item.label} 전체 도구 보기 →</Link></div></div>)}</nav>
      <button className={`${styles.menuButton}${menuOpen?` ${styles.open}`:""}`} type="button" aria-label={menuOpen?"메뉴 닫기":"메뉴 열기"} aria-expanded={menuOpen} aria-controls="mobile-category-menu" onClick={()=>setMenuOpen(open=>!open)}><span/><span/><span/></button>
    </div>
    <nav id="mobile-category-menu" className={`${styles.mobileNav}${menuOpen?` ${styles.open}`:""}`} aria-label="모바일 주요 카테고리"><div className={`container ${styles.mobileNavInner}`}>{nav.map((item)=><Link key={item.label} href={item.href} onClick={()=>setMenuOpen(false)}><strong>{item.label}</strong><span>{item.description}</span></Link>)}</div></nav>
  </header>;
}
