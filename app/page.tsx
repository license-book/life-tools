import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import { getToolsByCategory } from "@/data/tools";
import styles from "./page.module.css";

const categories = [
  { code:"MONEY", title:"돈과 금융", description:"대출·예적금·세금·목돈 계산", href:"/money", icon:"wallet" },
  { code:"HOME", title:"집과 주거", description:"면적·인테리어·이사·공과금 계산", href:"/home", icon:"home" },
  { code:"CAR", title:"자동차", description:"주유비·유지비·할부·충전비 계산", href:"/car", icon:"car" },
  { code:"BUY", title:"쇼핑", description:"할인·단가·할부·직구 비교", href:"/buy", icon:"bag" },
  { code:"WORK", title:"직장", description:"근무시간·수당·연차·업무일 계산", href:"/work", icon:"briefcase" },
  { code:"LIFE", title:"생활", description:"날짜·나이·수면·여행·기념일", href:"/life", icon:"heart" },
] as const;

type IconName = (typeof categories)[number]["icon"];
function LineIcon({ name }: { name: IconName }) {
  const icons: Record<IconName, React.ReactNode> = {
    wallet:<><path d="M4 7.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h10"/><path d="M16 11h4v4h-4a2 2 0 0 1 0-4Z"/></>, home:<><path d="m3 11 9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9 20v-6h6v6"/></>, car:<><path d="M5 17h14l1-5-2-5H6l-2 5 1 5Z"/><path d="M7 17v2M17 17v2M7 13h.01M17 13h.01"/></>, bag:<><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>, briefcase:<><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V5h6v2M3 12h18M10 12v2h4v-2"/></>, heart:<><path d="M20.8 8.2c0 5-8.8 10.4-8.8 10.4S3.2 13.2 3.2 8.2A4.2 4.2 0 0 1 12 6.1a4.2 4.2 0 0 1 8.8 2.1Z"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

export default function HomePage() {
  const categoryTools={MONEY:getToolsByCategory("MONEY"),HOME:getToolsByCategory("HOME"),CAR:getToolsByCategory("CAR"),BUY:getToolsByCategory("BUY"),WORK:getToolsByCategory("WORK"),LIFE:getToolsByCategory("LIFE")};
  const featuredTools=Object.values(categoryTools).flatMap((items)=>items.slice(0,2));
  return <><SiteHeader/><main className={styles.main}>
    <section className={styles.hero} style={{ overflow: "visible", zIndex: 20 }}><HeroSlider/></section>
    <section id="categories" className={styles.sectionAlt} style={{ position: "relative", zIndex: 1 }}><div className="container"><div className={styles.headingRow}><div className={styles.headingBlock}><h2>카테고리별 생활도구</h2><p>필요한 분야부터 빠르게 찾아보세요.</p></div></div><div className={styles.categoryGrid}>{categories.map((item)=><Link className={styles.categoryCard} key={item.code} href={item.href}><span className={styles.iconWrap}><LineIcon name={item.icon}/></span><span className={styles.categoryCode}>{item.code} · {categoryTools[item.code].length}</span><h3>{item.title}</h3><p>{item.description}</p><span className={styles.categoryArrow}>→</span></Link>)}</div></div></section>
    <section id="popular" className={styles.section}><div className="container"><div className={styles.headingRow}><div className={styles.headingBlock}><h2>지금 많이 찾는 도구</h2><p>각 카테고리에서 바로 활용하기 좋은 핵심 도구입니다.</p></div></div><div className={styles.toolGrid}>{featuredTools.map((tool)=><Link className={styles.toolCard} href={`/tools/${tool.slug}`} key={tool.slug}><div className={styles.toolTop}><span className={styles.toolBadge}>{tool.category}</span><span className={styles.toolArrow}>→</span></div><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>)}</div></div></section>
  </main><footer className="footer"><div className={`container ${styles.footerNote}`}>생활도구 · 로그인 없이 무료로 바로 사용하는 생활 계산·비교 서비스</div></footer></>;
}
