import type { ToolDefinition } from "@/types/tool";

export type CatalogAuditIssue={
  level:"error"|"warning";
  slug:string;
  message:string;
};

export function auditToolCatalog(tools:ToolDefinition[]):CatalogAuditIssue[]{
  const issues:CatalogAuditIssue[]=[];
  const slugs=new Set<string>();
  const ids=new Set<string>();
  const knownSlugs=new Set(tools.map(tool=>tool.slug));

  for(const tool of tools){
    if(slugs.has(tool.slug)) issues.push({level:"error",slug:tool.slug,message:"중복 slug"});
    slugs.add(tool.slug);
    if(ids.has(tool.id)) issues.push({level:"error",slug:tool.slug,message:"중복 id"});
    ids.add(tool.id);

    if(!tool.name.trim()) issues.push({level:"error",slug:tool.slug,message:"도구 이름 누락"});
    if(!tool.shortDescription.trim()||!tool.heroDescription.trim()) issues.push({level:"error",slug:tool.slug,message:"도구 설명 누락"});
    if(!tool.calculatorTitle.trim()||!tool.calculatorDescription.trim()) issues.push({level:"error",slug:tool.slug,message:"계산기 제목/설명 누락"});
    if(!tool.seo.title.trim()||!tool.seo.description.trim()||tool.seo.keywords.length===0) issues.push({level:"error",slug:tool.slug,message:"SEO 메타데이터 누락"});
    if(tool.faq.length<2) issues.push({level:"warning",slug:tool.slug,message:"FAQ가 2개 미만"});
    if(tool.sections.length<2) issues.push({level:"warning",slug:tool.slug,message:"정보 섹션이 2개 미만"});
    if(tool.badges.length===0) issues.push({level:"warning",slug:tool.slug,message:"신뢰 배지 누락"});
    if(!tool.disclaimer.trim()) issues.push({level:"error",slug:tool.slug,message:"면책 안내 누락"});

    for(const related of tool.relatedTools){
      if(related===tool.slug) issues.push({level:"warning",slug:tool.slug,message:"자기 자신을 관련 도구로 연결"});
      else if(!knownSlugs.has(related)) issues.push({level:"error",slug:tool.slug,message:`존재하지 않는 관련 도구: ${related}`});
    }
  }
  return issues;
}

export function assertToolCatalog(tools:ToolDefinition[]){
  const issues=auditToolCatalog(tools);
  const errors=issues.filter(issue=>issue.level==="error");
  if(errors.length){
    throw new Error(`생활도구 카탈로그 검증 실패\n${errors.map(issue=>`- ${issue.slug}: ${issue.message}`).join("\n")}`);
  }
  return issues;
}
