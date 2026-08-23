"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

const slides = [
  { src: "/hero-main-01.webp", alt: "노트북으로 생활도구를 이용하는 여성" },
  { src: "/hero-main-02.webp", alt: "거실에서 생활도구를 함께 이용하는 가족" },
  { src: "/hero-main-03.webp", alt: "노트북으로 생활 계획을 확인하는 커플" },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const move = (dir: number) => setActive((v) => (v + dir + slides.length) % slides.length);

  return (
    <div className={styles.heroSlider}>
      <div className={styles.heroTrack} style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((slide) => <div className={styles.heroSlide} key={slide.src}><img src={slide.src} alt={slide.alt} /></div>)}
      </div>
      <button className={`${styles.sliderArrow} ${styles.sliderPrev}`} onClick={() => move(-1)} aria-label="이전 이미지">‹</button>
      <button className={`${styles.sliderArrow} ${styles.sliderNext}`} onClick={() => move(1)} aria-label="다음 이미지">›</button>
      <div className={styles.sliderDots} aria-label="슬라이드 선택">
        {slides.map((slide, index) => <button key={slide.src} className={index === active ? styles.activeDot : ""} onClick={() => setActive(index)} aria-label={`${index + 1}번째 이미지`} />)}
      </div>
    </div>
  );
}
