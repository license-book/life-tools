"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ToolSearch from "@/components/search/ToolSearch";
import { getToolBySlug } from "@/data/tools";
import styles from "./SiteHeader.module.css";

const nav = [
  { code:"MONEY", label:"돈·금융", href:"/money", description:"대출·예적금·세금", tools:[["대출 이자·상환 계산기","/tools/loan-calculator"],["예금 이자 계산기","/tools/deposit-interest"],["급여 실수령액 계산기","/tools/salary-net-calculator"],["퇴직금 계산기","/tools/severance-pay"]] },
  { code:"HOME", label:"집·주거", href:"/home", description:"면적·이사·인테리어", tools:[["평수·제곱미터 변환기","/tools/area-pyeong"],["방 면적 계산기","/tools/room-area"],["이사 예산 계산기","/tools/moving-budget"],["가전 전기요금 추정기","/tools/electricity-estimator"]] },
  { code:"CAR", label:"자동차", href:"/car", description:"주유·유지비·할부", tools:[["주유비 계산기","/tools/fuel-cost"],["실연비 계산기","/tools/fuel-efficiency"],["자동차 할부 계산기","/tools/car-loan"],["자동차 유지비 계산기","/tools/ownership-cost"]] },
  { code:"BUY", label:"쇼핑", href:"/buy", description:"할인·단가·직구", tools:[["단가 비교 계산기","/tools/unit-price"],["1+1·2+1 묶음 할인","/tools/bundle-deal"],["할인·쿠폰·카드 중복","/tools/coupon-stack"],["해외직구 총비용 계산기","/tools/overseas-total-cost"]] },
  { code:"WORK", label:"직장·업무", href:"/work", description:"급여·수당·연차", tools:[["근무시간 계산기","/tools/work-hours"],["연장근로수당 계산기","/tools/overtime-pay"],["연차 잔여일 계산기","/tools/annual-leave-balance"],["영업일 계산기","/tools/business-days"]] },
  { code:"LIFE", label:"일상·생활", href:"/life", description:"날짜·수면·여행", tools:[["날짜·기간 계산기","/tools/date-period"],["나이·만나이 계산기","/tools/age-calculator"],["수면시간 계산기","/tools/sleep-time"],["여행 준비물 체크리스트","/tools/travel-packing-checklist"]] },
] as const;

const overlayPaths = new Set(["/", "/money", "/home", "/car", "/buy", "/work", "/life"]);

function CalculatorLogoIcon(){
  return <span className={styles.logoIcon} aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M10 10h5M12.5 7.5v5M19 10h5M10 22h5M19 19l5 5M24 19l-5 5"/><circle cx="22" cy="16" r="1.2" fill="currentColor" stroke="none"/><circle cx="22" cy="26" r="1.2" fill="currentColor" stroke="none"/></svg></span>;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const supportsOverlay = overlayPaths.has(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = supportsOverlay && !scrolled && !menuOpen && !hovered;
  const toolSlug = pathname.startsWith("/tools/") ? pathname.split("/")[2] : "";
  const activeToolCategory = toolSlug ? getToolBySlug(toolSlug)?.category : undefined;
  const isActive = (item: typeof nav[number]) => pathname === item.href || activeToolCategory === item.code;

  return <header
    className={`header ${supportsOverlay ? styles.homeHeader : ""} ${overlay ? styles.overlayHeader : styles.solidHeader}`}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
  >
    <div className="container header-inner">
      <Link className={`logo ${styles.brandLogo}`} href="/" onClick={()=>setMenuOpen(false)}><CalculatorLogoIcon/><span>생활도구</span></Link>
      <nav className="nav" aria-label="주요 카테고리">{nav.map((item)=>{const active=isActive(item);return <div className={styles.desktopNavItem} key={item.code}><Link className={`${styles.desktopNavLink}${active?` ${styles.activeNavLink}`:""}`} href={item.href} aria-current={active?"page":undefined}>{item.label}<span className={styles.chevron} aria-hidden="true">⌄</span></Link><div className={styles.submenu}><div className={styles.submenuHeading}><strong>{item.label}</strong><span>{item.description}</span></div><div className={styles.submenuLinks}>{item.tools.map(([toolLabel,toolHref])=><Link key={toolHref} href={toolHref}>{toolLabel}</Link>)}</div><Link className={styles.viewAll} href={item.href}>{item.label} 전체 도구 보기 →</Link></div></div>})}</nav>
      <ToolSearch overlay={overlay}/>
      <button className={`${styles.menuButton}${menuOpen?` ${styles.open}`:""}`} type="button" aria-label={menuOpen?"메뉴 닫기":"메뉴 열기"} aria-expanded={menuOpen} aria-controls="mobile-category-menu" onClick={()=>setMenuOpen(open=>!open)}><span/><span/><span/></button>
    </div>
    <nav id="mobile-category-menu" className={`${styles.mobileNav}${menuOpen?` ${styles.open}`:""}`} aria-label="모바일 주요 카테고리"><div className={`container ${styles.mobileNavInner}`}><div className={styles.mobileSearch}><ToolSearch compact onNavigate={()=>setMenuOpen(false)}/></div>{nav.map((item)=>{const active=isActive(item);return <Link key={item.code} className={active?styles.activeMobileLink:undefined} href={item.href} aria-current={active?"page":undefined} onClick={()=>setMenuOpen(false)}><strong>{item.label}</strong><span>{item.description}</span></Link>})}</div></nav>
  </header>;
}
