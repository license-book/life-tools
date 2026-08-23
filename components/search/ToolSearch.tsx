"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tools } from "@/data/tools";
import styles from "./ToolSearch.module.css";

type Props = {
  compact?: boolean;
  hero?: boolean;
  onNavigate?: () => void;
  overlay?: boolean;
};

const popular = ["급여", "퇴직금", "대출", "평수", "연비", "할인"];

function normalize(value: string) {
  return value.toLocaleLowerCase("ko-KR").replace(/\s+/g, "");
}

function SearchIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>;
}

export default function ToolSearch({ compact = false, hero = false, onNavigate, overlay = false }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return tools
      .map((tool) => {
        const name = normalize(tool.name);
        const keywords = normalize([
          tool.name,
          tool.shortDescription,
          tool.heroDescription,
          tool.category,
          tool.slug,
          ...(tool.seo?.keywords ?? []),
        ].join(" "));
        let score = 0;
        if (name === q) score += 100;
        if (name.startsWith(q)) score += 50;
        if (name.includes(q)) score += 30;
        if (keywords.includes(q)) score += 12;
        return { tool, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name, "ko"))
      .slice(0, 7)
      .map((item) => item.tool);
  }, [query]);

  const choosePopular = (word:string) => {
    setQuery(word);
    setFocused(true);
  };

  const open = focused;
  return (
    <div className={`${styles.searchWrap} ${compact ? styles.compact : ""} ${hero ? styles.hero : ""} ${overlay ? styles.overlay : ""}`}>
      <div className={styles.inputWrap}>
        {!hero && <SearchIcon/>}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 140)}
          placeholder={hero ? "필요한 생활도구를 검색해보세요. 예: 퇴직금, 평수, 주유비" : "생활도구 검색"}
          aria-label="전체 생활도구 검색"
          autoComplete="off"
        />
        {query && !hero && <button className={styles.clearButton} type="button" onMouseDown={(e)=>e.preventDefault()} onClick={()=>setQuery("")} aria-label="검색어 지우기">×</button>}
        {hero && <button className={styles.searchButton} type="button" aria-label="검색" onMouseDown={(e)=>e.preventDefault()} onClick={()=>setFocused(true)}><SearchIcon/></button>}
      </div>

      {hero && <div className={styles.heroPopular}><span>인기 검색어</span><div>{popular.map((word)=><button key={word} type="button" onMouseDown={(e)=>e.preventDefault()} onClick={()=>choosePopular(word)}># {word}</button>)}</div></div>}

      {open && query.trim() && <div className={styles.dropdown}>
        {results.length ? <div className={styles.results}>{results.map((tool)=><Link key={tool.slug} href={`/tools/${tool.slug}`} onClick={onNavigate}><span className={styles.resultText}><strong>{tool.name}</strong><small>{tool.category} · {tool.shortDescription}</small></span><span className={styles.detailLink}>바로 사용 →</span></Link>)}</div> : <div className={styles.empty}><strong>일치하는 생활도구가 없습니다.</strong><span>다른 검색어를 입력해보세요.</span></div>}
      </div>}

      {open && !hero && !query.trim() && <div className={styles.dropdown}>
        <div className={styles.dropdownTitle}>많이 찾는 도구</div>
        <div className={styles.popular}>{popular.map((word)=><button key={word} type="button" onMouseDown={(e)=>e.preventDefault()} onClick={()=>choosePopular(word)}>{word}</button>)}</div>
        <div className={styles.hint}>도구 이름이나 필요한 계산을 입력해보세요.</div>
      </div>}
    </div>
  );
}
