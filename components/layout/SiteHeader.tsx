"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  ["MONEY", "/money"],
  ["HOME", "/home"],
  ["CAR", "/car"],
  ["BUY", "/buy"],
  ["WORK", "/work"],
  ["LIFE", "/life"],
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
          className={`mobile-menu-button${menuOpen ? " is-open" : ""}`}
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
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="모바일 주요 카테고리"
      >
        <div className="container mobile-nav-inner">
          {nav.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              <strong>{label}</strong>
              <span>{label === "MONEY" ? "돈과 금융" : label === "HOME" ? "집과 주거" : label === "CAR" ? "자동차" : label === "BUY" ? "쇼핑" : label === "WORK" ? "직장과 업무" : "일상과 생활"}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
