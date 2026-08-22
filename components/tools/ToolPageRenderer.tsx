import type { ReactNode } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import type { ToolDefinition } from "@/types/tool";
import { createFaqJsonLd, createToolJsonLd } from "@/lib/tools/engine";

type ToolPageRendererProps = {
  tool: ToolDefinition;
  calculator: ReactNode;
};

export default function ToolPageRenderer({ tool, calculator }: ToolPageRendererProps) {
  const jsonLd = createToolJsonLd(tool);
  const faqJsonLd = createFaqJsonLd(tool);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="tool-hero">
          <div className="container">
            <span className="eyebrow">{tool.category} · 무료 · 회원가입 없음</span>
            <h1>{tool.name}</h1>
            <p>{tool.heroDescription}</p>
            <div className="trust-row">
              {tool.badges.map((badge) => (
                <span className="trust-chip" key={badge}>✓ {badge}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>{tool.calculatorTitle}</h2>
            <p className="section-intro">{tool.calculatorDescription}</p>
            {calculator}
          </div>
        </section>

        {tool.sections.map((section) => (
          <section className="section" key={section.title}>
            <div className="container">
              <h2>{section.title}</h2>
              {section.description ? <p className="section-intro">{section.description}</p> : null}

              {section.cards?.length ? (
                <div className="grid">
                  {section.cards.map((card) => (
                    <article className="card" key={card.title}>
                      {card.label ? <span className="category-label">{card.label}</span> : null}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </article>
                  ))}
                </div>
              ) : null}

              {section.paragraphs?.length ? (
                <div className="card">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`} style={index > 0 ? { marginTop: 16 } : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.notice ? <div className="notice">{section.notice}</div> : null}
            </div>
          </section>
        ))}

        {tool.freeResources?.length ? (
          <section className="section">
            <div className="container">
              <h2>무료 결과물</h2>
              <p className="section-intro">계산 결과를 화면에서 확인하는 데서 끝내지 않고 실제 계획과 비교에 활용할 수 있습니다.</p>
              <div className="grid">
                {tool.freeResources.map((resource) => (
                  <article className="card" key={resource.title}>
                    <span className="category-label">{resource.type}</span>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="container">
            <h2>자주 묻는 질문</h2>
            <div className="grid">
              {tool.faq.map((item) => (
                <article className="card" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">{tool.disclaimer}</div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
