"use client";

import { useEffect, useState } from "react";
import ToolSearch from "@/components/search/ToolSearch";
import styles from "@/app/page.module.css";

const slides = [
  { tone:"finance", icons:["calc","percent","wallet"] },
  { tone:"living", icons:["home","car","bag"] },
  { tone:"daily", icons:["calendar","clock","check"] },
] as const;

type IconName = typeof slides[number]["icons"][number];

function LineIcon({ name }: { name: IconName }) {
  const common = { viewBox:"0 0 96 96", fill:"none", stroke:"currentColor", strokeWidth:2.6, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
  if(name==="calc") return <svg {...common}><rect x="22" y="12" width="52" height="72" rx="10"/><path d="M32 25h32v12H32zM36 51h8M40 47v8M54 51h8M36 67h8M54 63l8 8M62 63l-8 8"/></svg>;
  if(name==="percent") return <svg {...common}><circle cx="31" cy="31" r="8"/><circle cx="65" cy="65" r="8"/><path d="M29 70 67 26"/></svg>;
  if(name==="wallet") return <svg {...common}><rect x="15" y="25" width="66" height="48" rx="10"/><path d="M15 37h66M58 45h23v14H58z"/><circle cx="65" cy="52" r="2"/></svg>;
  if(name==="home") return <svg {...common}><path d="M13 45 48 17l35 28"/><path d="M23 39v40h50V39M38 79V55h20v24"/></svg>;
  if(name==="car") return <svg {...common}><path d="M22 56l7-22c2-6 7-9 14-9h25c7 0 12 3 14 9l7 22"/><path d="M16 56h64v20H16z"/><circle cx="32" cy="76" r="7"/><circle cx="64" cy="76" r="7"/></svg>;
  if(name==="bag") return <svg {...common}><path d="M22 33h52l-5 48H27z"/><path d="M36 35V25c0-8 5-13 12-13s12 5 12 13v10"/></svg>;
  if(name==="calendar") return <svg {...common}><rect x="18" y="22" width="60" height="58" rx="9"/><path d="M18 38h60M32 14v16M64 14v16"/><path d="m35 59 9 9 19-20"/></svg>;
  if(name==="clock") return <svg {...common}><circle cx="48" cy="48" r="32"/><path d="M48 29v21l14 9"/></svg>;
  return <svg {...common}><circle cx="48" cy="48" r="32"/><path d="m31 49 11 11 24-26"/></svg>;
}

const trustChipStyle = { color:"#fff", background:"transparent", borderColor:"rgba(255,255,255,.58)" };

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((v)=>(v+1)%slides.length), 5200); return () => window.clearInterval(timer); }, []);
  const move=(dir:number)=>setActive((v)=>(v+dir+slides.length)%slides.length);

  return <div className={styles.heroSlider} style={{overflow:"visible",zIndex:1}}>
    <div className={styles.heroOverlay} style={{zIndex:30,overflow:"visible"}}><div className={`container ${styles.heroOverlayInner}`} style={{overflow:"visible"}}><div className={styles.heroCopy} style={{position:"relative",zIndex:40,overflow:"visible"}}>
      <h1 style={{color:"#fff",marginTop:0}}>필요한 계산을<br/><em>빠르고 정확하게</em></h1>
      <p className={styles.heroLead} style={{color:"#fff",whiteSpace:"nowrap"}}>생활에 필요한 계산과 비교 도구를 회원가입 없이 바로 사용하세요.</p>
      <ToolSearch hero />
      <div className="trust-row" aria-label="생활도구 주요 특징"><span className="trust-chip" style={trustChipStyle}>✓ 무료</span><span className="trust-chip" style={trustChipStyle}>✓ 회원가입 없음</span><span className="trust-chip" style={trustChipStyle}>✓ 계산 기준 설명</span><span className="trust-chip" style={trustChipStyle}>✓ 결과 저장·인쇄</span></div>
    </div></div></div>

    <div className={styles.heroMedia} style={{position:"relative",zIndex:1}}><div className={styles.heroTrack} style={{transform:`translateX(-${active*100}%)`}}>
      {slides.map((slide,index)=><div className={`${styles.heroSlide} ${styles[`heroTone${slide.tone[0].toUpperCase()}${slide.tone.slice(1)}`]}`} key={slide.tone}>
        <div className={styles.heroGlow}/><div className={styles.heroIconCluster}>{slide.icons.map((icon,i)=><div className={`${styles.heroLineIcon} ${styles[`heroLineIcon${i+1}`]}`} key={icon}><LineIcon name={icon}/></div>)}</div><span className={styles.heroOrbOne}/><span className={styles.heroOrbTwo}/>
      </div>)}
    </div>
    <button className={`${styles.sliderArrow} ${styles.sliderPrev}`} onClick={()=>move(-1)} aria-label="이전 배경">‹</button><button className={`${styles.sliderArrow} ${styles.sliderNext}`} onClick={()=>move(1)} aria-label="다음 배경">›</button>
    <div className={styles.sliderDots} aria-label="슬라이드 선택">{slides.map((slide,index)=><button key={slide.tone} className={index===active?styles.activeDot:""} onClick={()=>setActive(index)} aria-label={`${index+1}번째 배경`}/>)}</div>
    </div>
  </div>;
}
