import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";

export const metadata:Metadata={title:"WORK 생활도구 | 월급·퇴직금·연봉·수당·연차 계산기",description:"급여 실수령액, 퇴직금, 연봉·시급 환산, 2026 최저임금, 연장근로수당, 주휴수당, 연차수당, 근무시간과 업무일 계산 도구를 모았습니다.",alternates:{canonical:"/work"}};

const employeeCoreSlugs=["salary-net-calculator","severance-pay","annual-salary","wage-converter","minimum-wage-monthly","salary-raise","overtime-pay","weekly-holiday-pay","annual-leave-pay","annual-leave-balance","tenure-duration"];

export default function WorkPage(){
 const workTools=getToolsByCategory("WORK");
 const employeeCore=employeeCoreSlugs.map(getToolBySlug).filter(Boolean);
 const secondary=workTools.filter(tool=>!employeeCoreSlugs.includes(tool.slug));
 return <><SiteHeader/><main>
  <section className="hero"><div className="container"><span className="eyebrow">WORK · 직장인과 근로자</span><h1>월급부터 퇴직금·수당·연차까지 바로 계산하세요</h1><p>급여 실수령액, 퇴직금, 연봉·시급 환산, 최저임금, 각종 수당과 연차·근속기간을 먼저 확인하고 업무시간·일정 계산까지 이어서 사용할 수 있습니다.</p><div className="trust-row"><span className="trust-chip">✓ 무료</span><span className="trust-chip">✓ 회원가입 없음</span><span className="trust-chip">✓ 직장인 핵심 계산</span><span className="trust-chip">✓ 결과 저장·인쇄</span></div></div></section>

  <section className="section"><div className="container"><h2>직장인이 많이 찾는 핵심 계산기</h2><p className="section-intro">월급·퇴직·연봉·최저임금처럼 실제 근로자가 자주 확인하는 계산기를 가장 먼저 배치했습니다.</p><div className="grid">{employeeCore.map(tool=>tool?<Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-label">핵심</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>:null)}</div></div></section>

  <section className="section"><div className="container"><h2>근무시간·업무 일정 도구</h2><p className="section-intro">급여 계산 다음으로 필요한 근무시간, 영업일, 프리랜서 단가와 회의비용 도구입니다.</p><div className="grid">{secondary.map(tool=><Link className="card" href={`/tools/${tool.slug}`} key={tool.slug}><span className="category-label">WORK</span><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>)}</div></div></section>

  <section className="section"><div className="container"><h2>어떤 순서로 쓰면 좋을까요?</h2><div className="grid"><article className="card"><span className="category-label">급여</span><h3>월급·연봉부터 확인</h3><p>실수령액, 연봉 환산, 시급·월급 변환, 급여 인상률을 먼저 확인하세요.</p></article><article className="card"><span className="category-label">퇴직·수당</span><h3>퇴직금과 각종 수당</h3><p>퇴직금, 연장근로수당, 주휴수당, 연차수당은 실제 근로조건과 함께 참고 계산하세요.</p></article><article className="card"><span className="category-label">근무 관리</span><h3>연차·근속·업무일</h3><p>남은 연차, 근속기간, 근무시간과 영업일을 이어서 관리할 수 있습니다.</p></article></div></div></section>
 </main><footer className="footer"><div className="container">WORK · 직장인과 근로자를 위한 무료 급여·수당·근무 계산 도구</div></footer></>}
