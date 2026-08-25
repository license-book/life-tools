import Link from "next/link";
import type { ReactNode } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import AdSlot from "@/components/ads/AdSlot";
import ToolHeroIcon from "@/components/tools/ToolHeroIcon";
import ToolResetButton from "@/components/tools/ToolResetButton";
import ResultHierarchyEnhancer from "@/components/tools/ResultHierarchyEnhancer";
import PersonalizedResultEngine from "@/components/tools/PersonalizedResultEngine";
import type { ToolDefinition } from "@/types/tool";
import { createFaqJsonLd, createToolJsonLd } from "@/lib/tools/engine";
import { getToolBySlug } from "@/data/tools";

type ToolPageRendererProps = { tool: ToolDefinition; calculator: ReactNode; };

const heroTitleStyle = {
  background:"linear-gradient(90deg,#3B82F6 0%,#06D6D6 52%,#22E58B 100%)",
  WebkitBackgroundClip:"text",
  backgroundClip:"text",
  WebkitTextFillColor:"transparent",
  color:"transparent",
};

export default function ToolPageRenderer({ tool, calculator }: ToolPageRendererProps) {
  const jsonLd = createToolJsonLd(tool);
  const faqJsonLd = createFaqJsonLd(tool);
  const relatedTools = tool.relatedTools.map(getToolBySlug).filter((item): item is ToolDefinition => Boolean(item));
  const resourceTitle = tool.freeResources?.[0]?.title;

  return <>
    <SiteHeader />
    <ResultHierarchyEnhancer />
    <main>
      <section className="tool-hero"><div className="container"><ToolHeroIcon tool={tool} /><span className="eyebrow">{tool.category} · 무료 · 회원가입 없음</span><h1 style={heroTitleStyle}>{tool.name}</h1><p>{tool.heroDescription}</p><div className="trust-row">{tool.badges.map((badge)=><span className="trust-chip" key={badge}>✓ {badge}</span>)}</div></div></section>

      <section className="section"><div className="container"><div><h2>{tool.calculatorTitle}</h2><p className="section-intro">{tool.calculatorDescription}</p></div><div className="no-print" style={{display:"flex",justifyContent:"flex-end",margin:"-8px 0 14px"}}><ToolResetButton /></div><div id="calculator-workspace">{calculator}</div><PersonalizedResultEngine toolName={tool.name} slug={tool.slug} category={tool.category} resourceTitle={resourceTitle}/></div></section>

      <div className="container"><AdSlot placement="tool-after-calculator" className="ad-slot-wide" /></div>

      {tool.sections.map((section,index)=><section className="section" key={section.title}><div className="container"><h2>{section.title}</h2>{section.description?<p className="section-intro">{section.description}</p>:null}{section.cards?.length?<div className="grid">{section.cards.map((card)=><article className="card" key={card.title}>{card.label?<span className="category-label">{card.label}</span>:null}<h3>{card.title}</h3><p>{card.description}</p></article>)}</div>:null}{section.paragraphs?.length?<div className="card">{section.paragraphs.map((paragraph,i)=><p key={`${section.title}-${i}`} style={i>0?{marginTop:16}:undefined}>{paragraph}</p>)}</div>:null}{section.notice?<div className="notice">{section.notice}</div>:null}</div>{index===0?<div className="container"><AdSlot placement="tool-content-middle" className="ad-slot-wide ad-slot-section" /></div>:null}</section>)}

      {tool.freeResources?.length?<section className="section"><div className="container"><h2>무료 결과물</h2><p className="section-intro">계산 결과를 화면에서 확인하는 데서 끝내지 않고 실제 계획과 비교에 활용할 수 있습니다.</p><div className="grid">{tool.freeResources.map((resource)=><article className="card" key={resource.title}><span className="category-label">{resource.type}</span><h3>{resource.title}</h3><p>{resource.description}</p></article>)}</div></div></section>:null}

      <section className="section"><div className="container"><h2>자주 묻는 질문</h2><div className="grid">{tool.faq.map((item)=><article className="card" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></div></section>
      <div className="container"><AdSlot placement="tool-before-related" className="ad-slot-wide" /></div>

      {relatedTools.length?<section className="section"><div className="container"><h2>같이 쓰면 좋은 관련 도구</h2><p className="section-intro">현재 계산과 이어서 비교하거나 계획할 때 유용한 도구입니다.</p><div className="grid">{relatedTools.map((related)=><Link className="card" key={related.slug} href={`/tools/${related.slug}`}><span className="category-label">{related.category}</span><h3>{related.name}</h3><p>{related.shortDescription}</p></Link>)}</div><p style={{marginTop:18}}><Link href={`/${tool.category.toLowerCase()}`} className="text-button">{tool.category} 전체 도구 보기 →</Link></p></div></section>:null}
    </main>
    <footer className="footer"><div className="container">{tool.disclaimer}</div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJsonLd)}} />
  </>;
}
