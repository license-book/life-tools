"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./SiteHeader.module.css";

const nav = [
  ["MONEY", "/money", "돈과 금융"],
  ["HOME", "/home", "집과 주거"],
  ["CAR", "/car", "자동차"],
  ["BUY", "/buy", "쇼핑"],
  ["WORK", "/work", "직장과 업무"],
  ["LIFE", "/life", "일상과 생활"],
] as const;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="logo" href="/" onClick={() => setMenuOpen(false)}>생활도구</Link>

        <nav className="nav" aria-label="주요 카테고리">
          {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>

        <button
          className={`${styles.menuButton}${menuOpen ? ` ${styles.open}` : ""}`}
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="mobile-category-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-category-menu"
        className={`${styles.mobileNav}${menuOpen ? ` ${styles.open}` : ""}`}
        aria-label="모바일 주요 카테고리"
      >
        <div className={`container ${styles.mobileNavInner}`}>
          {nav.map(([label, href, description]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              <strong>{label}</strong>
              <span>{description}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
