import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AllToolsDirectory from "@/components/tools/AllToolsDirectory";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "전체 계산기·생활도구 | 생활도구",
  description: "돈·금융, 집·주거, 자동차, 쇼핑, 직장·업무, 일상·생활 계산기와 생활도구를 한 페이지에서 모두 찾아보세요.",
};

export default function ToolsPage(){
  return <>
    <SiteHeader />
    <main>
      <section className="category-hero all-tools-hero"><div className="container"><span className="eyebrow">ALL TOOLS · {tools.length}개</span><h1>전체 계산기·도구</h1><p>생활도구의 모든 계산기와 도구를 카테고리별로 한눈에 보고, 필요한 도구를 바로 검색할 수 있습니다.</p></div></section>
      <section className="section"><div className="container"><AllToolsDirectory tools={tools}/></div></section>
    </main>
    <SiteFooter />
  </>;
}
