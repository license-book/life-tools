"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

const slides = [
  { src: "/hero-main-01.webp", alt: "노트북으로 생활도구를 이용하는 여성" },
  { src: "/hero-main-02.webp", alt: "거실에서 생활도구를 함께 이용하는 가족" },
  { src: "/hero-main-03.webp", alt: "노트북으로 생활 계획을 확인하는 커플" },
];

const trustChipStyle = {
  color: "#fff",
  background: "rgba(15,23,42,.28)",
  borderColor: "rgba(255,255,255,.58)",
  textShadow: "0 1px 3px rgba(15,23,42,.35)",
};

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const move = (dir: number) => setActive((v) => (v + dir + slides.length) % slides.length);

  return (
    <div className={styles.heroSlider}>
      <div className={styles.heroOverlay}>
        <div className={`container ${styles.heroOverlayInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>생활 계산을 더 간단하게</span>
            <h1 style={{ color: "#fff", textShadow: "0 2px 8px rgba(15,23,42,.28)" }}>필요한 계산을<br/><em>빠르고 정확하게</em></h1>
            <p className={styles.heroLead} style={{ color: "#fff", textShadow: "0 1px 5px rgba(15,23,42,.35)" }}>돈, 집, 자동차, 쇼핑, 직장, 일상까지. 자주 필요한 계산과 비교 도구를 회원가입 없이 바로 사용할 수 있습니다.</p>
            <div className="trust-row" aria-label="생활도구 주요 특징">
              <span className="trust-chip" style={trustChipStyle}>✓ 무료</span>
              <span className="trust-chip" style={trustChipStyle}>✓ 회원가입 없음</span>
              <span className="trust-chip" style={trustChipStyle}>✓ 계산 기준 설명</span>
              <span className="trust-chip" style={trustChipStyle}>✓ 결과 저장·인쇄</span>
            </div>
            <div className={styles.heroActions}>
              <Link className={styles.heroPrimary} href="#categories">카테고리 둘러보기 →</Link>
              <Link className={styles.heroSecondary} href="#popular">인기 도구 보기</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroMedia}>
        <div className={styles.heroTrack} style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((slide) => (
            <div className={styles.heroSlide} key={slide.src}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>
        <button className={`${styles.sliderArrow} ${styles.sliderPrev}`} onClick={() => move(-1)} aria-label="이전 이미지">‹</button>
        <button className={`${styles.sliderArrow} ${styles.sliderNext}`} onClick={() => move(1)} aria-label="다음 이미지">›</button>
        <div className={styles.sliderDots} aria-label="슬라이드 선택">
          {slides.map((slide, index) => (
            <button key={slide.src} className={index === active ? styles.activeDot : ""} onClick={() => setActive(index)} aria-label={`${index + 1}번째 이미지`} />
          ))}
        </div>
      </div>
    </div>
  );
}
