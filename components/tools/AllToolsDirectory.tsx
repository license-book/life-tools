"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ToolDefinition } from "@/types/tool";

const categories = [
  { code:"ALL", label:"전체" },
  { code:"MONEY", label:"돈·금융" },
  { code:"HOME", label:"집·주거" },
  { code:"CAR", label:"자동차" },
  { code:"BUY", label:"쇼핑" },
  { code:"WORK", label:"직장·업무" },
  { code:"LIFE", label:"일상·생활" },
] as const;

const categoryLabel: Record<string,string> = {
  MONEY:"돈·금융", HOME:"집·주거", CAR:"자동차", BUY:"쇼핑", WORK:"직장·업무", LIFE:"일상·생활"
};

export default function AllToolsDirectory({ tools }: { tools: ToolDefinition[] }) {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("ALL");

  const filtered = useMemo(()=>{
    const q=query.trim().toLowerCase();
    return tools.filter(tool => {
      const categoryMatch=category==="ALL" || tool.category===category;
      const text=`${tool.name} ${tool.shortDescription} ${tool.heroDescription} ${tool.category}`.toLowerCase();
      return categoryMatch && (!q || text.includes(q));
    });
  },[tools,query,category]);

  const grouped = useMemo(()=>categories.filter(c=>c.code!=="ALL").map(c=>({
    ...c,
    tools: filtered.filter(tool=>tool.category===c.code)
  })).filter(group=>group.tools.length>0),[filtered]);

  return <>
    <div className="all-tools-controls">
      <label className="all-tools-search">
        <span className="sr-only">도구 검색</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="계산기·도구 이름 검색" />
      </label>
      <div className="all-tools-filters" aria-label="카테고리 필터">
        {categories.map(item=><button key={item.code} type="button" className={category===item.code?"is-active":""} onClick={()=>setCategory(item.code)}>{item.label}{item.code!=="ALL"?<span>{tools.filter(t=>t.category===item.code).length}</span>:<span>{tools.length}</span>}</button>)}
      </div>
    </div>

    <div className="all-tools-summary"><strong>{filtered.length}</strong>개의 도구가 표시되고 있습니다.</div>

    {grouped.length ? <div className="all-tools-groups">{grouped.map(group=><section className="all-tools-group" key={group.code} id={group.code.toLowerCase()}>
      <div className="all-tools-group-heading"><div><span className="category-label">{group.code}</span><h2>{group.label}</h2></div><strong>{group.tools.length}개</strong></div>
      <div className="all-tools-grid">{group.tools.map(tool=><Link className="all-tool-card" href={`/tools/${tool.slug}`} key={tool.slug}>
        <div className="all-tool-card-top"><span>{categoryLabel[tool.category]}</span><span aria-hidden="true">→</span></div>
        <h3>{tool.name}</h3><p>{tool.shortDescription}</p>
      </Link>)}</div>
    </section>)}</div> : <div className="all-tools-empty">검색 조건에 맞는 도구가 없습니다.</div>}
  </>;
}
