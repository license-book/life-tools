import Link from "next/link";
import type { ToolDefinition } from "@/types/tool";

type QuickLink = { label: string; title: string; description: string; slug: string };
type Guide = { label: string; title: string; description: string };

type Props = {
  category: ToolDefinition["category"];
  tools: ToolDefinition[];
  quickLinks: QuickLink[];
  guides: Guide[];
  intro: string;
};

export default function CategoryLandingBody({ category, tools, quickLinks, guides, intro }: Props) {
  return <>
    <section className="category-quick-section">
      <div className="container">
        <div className="category-section-head"><span className="category-kicker">QUICK START</span><h2>자주 찾는 도구부터 바로 시작하세요</h2><p>가장 많이 쓰는 기능을 먼저 골라 빠르게 계산할 수 있습니다.</p></div>
        <div className="category-quick-grid">{quickLinks.map((item, index)=><Link className="category-quick-card" href={`/tools/${item.slug}`} key={item.slug}><span className="category-quick-number">0{index+1}</span><span className="category-quick-label">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><strong>바로 사용하기 <span aria-hidden="true">→</span></strong></Link>)}</div>
      </div>
    </section>
    <section className="category-tools-section">
      <div className="container">
        <div className="category-section-head category-section-head-row"><div><span className="category-kicker">ALL TOOLS</span><h2>{category} 도구 {tools.length}개</h2><p>{intro}</p></div><span className="category-count">{tools.length} TOOLS</span></div>
        <div className="category-tool-grid">{tools.map(tool=><Link className="category-tool-card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-tool-dot"/><div><span className="category-tool-label">{category}</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></div><span className="category-tool-arrow" aria-hidden="true">↗</span></Link>)}</div>
      </div>
    </section>
    <section className="category-guide-section">
      <div className="container"><div className="category-guide-wrap"><div className="category-guide-title"><span className="category-kicker">HOW TO USE</span><h2>이런 순서로 활용해보세요</h2><p>한 가지 계산에서 끝내지 않고 관련 도구를 이어서 사용하면 실제 생활 계획을 세우기 더 쉽습니다.</p></div><div className="category-guide-grid">{guides.map((guide,index)=><article className="category-guide-card" key={guide.title}><span className="category-guide-step">STEP {index+1}</span><span className="category-quick-label">{guide.label}</span><h3>{guide.title}</h3><p>{guide.description}</p></article>)}</div></div></div>
    </section>
  </>;
}
