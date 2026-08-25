"use client";

import { useState } from "react";
import type { ToolCategory } from "@/types/tool";

type Pair={label:string;value:string};
type Template={title:string;inputTitle:string;resultTitle:string;summaryTitle:string;summary:string;checks:string[];fileLabel:string};
type Props={toolName:string;slug:string;category:ToolCategory;resourceTitle?:string;};

function clean(text:string){return text.replace(/\s+/g," ").trim();}
function collectPairs(root:HTMLElement){
  const inputs:Pair[]=[];
  root.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>("input,select,textarea").forEach(control=>{
    if(control.type==="button"||control.type==="submit"||control.type==="hidden") return;
    const field=control.closest(".field");
    const label=clean(field?.querySelector("label")?.textContent||control.getAttribute("aria-label")||control.name||"입력값");
    let value="";
    if(control instanceof HTMLSelectElement) value=clean(control.selectedOptions[0]?.textContent||control.value); else value=clean(control.value);
    const unit=clean(field?.querySelector(".field-help")?.textContent?.replace(/^단위:\s*/,"")||"");
    if(label&&value) inputs.push({label,value:unit&&!value.includes(unit)?`${value} ${unit}`:value});
  });
  const results:Pair[]=[];
  root.querySelectorAll<HTMLElement>(".stat").forEach(stat=>{const label=clean(stat.querySelector("small")?.textContent||"");const value=clean(stat.querySelector("strong")?.textContent||"");if(label&&value) results.push({label,value});});
  root.querySelectorAll<HTMLElement>(".result-main").forEach(main=>{const label=clean(main.querySelector(".result-main-label")?.textContent||"");const value=clean(main.querySelector(".result-main-value")?.textContent||"");if(label&&value&&!results.some(r=>r.label===label&&r.value===value)) results.unshift({label,value});});
  return {inputs,results};
}
function csvCell(value:string){return `"${value.replace(/"/g,'""')}"`;}

function getTemplate(slug:string,category:ToolCategory,toolName:string,resourceTitle?:string):Template{
  const exact:Record<string,Partial<Template>>={
    "loan-calculator":{title:"나의 대출 상환계획표",inputTitle:"대출 조건",resultTitle:"상환 결과 요약",summaryTitle:"상환 계획 점검",summary:"월 상환액과 총이자, 상환기간을 한 번에 정리한 개인 대출 계획표입니다.",checks:["월 상환액이 월 소득 대비 과도하지 않은지 확인","중도상환수수료와 금리변동 조건 별도 확인","여유자금 발생 시 원금 조기상환 효과 비교"],fileLabel:"대출상환계획표"},
    "deposit-interest":{title:"예금 만기수령 계획표",inputTitle:"예치 조건",resultTitle:"만기 예상 결과",summaryTitle:"예금 계획 점검",summary:"예치금액과 금리, 기간을 기준으로 세전·세후 이자와 만기수령액을 정리합니다.",checks:["우대금리 적용 조건 확인","이자소득세 및 비과세 여부 확인","만기 자동연장 여부 확인"],fileLabel:"예금만기계획표"},
    "savings-interest":{title:"적금 만기 목표계획표",inputTitle:"납입 조건",resultTitle:"만기 예상 결과",summaryTitle:"적금 계획 점검",summary:"월 납입액과 기간을 기준으로 총 납입액과 예상 이자를 정리한 저축 계획표입니다.",checks:["월 납입 가능액을 생활비와 함께 점검","우대금리 조건 충족 가능 여부 확인","중도해지 시 적용금리 별도 확인"],fileLabel:"적금목표계획표"},
    "compound-interest":{title:"복리 자산성장 계획표",inputTitle:"투자·저축 조건",resultTitle:"미래 자산 예상",summaryTitle:"성장 계획 점검",summary:"원금과 수익률, 기간을 기준으로 복리 누적 효과를 정리합니다.",checks:["수익률은 확정값이 아니라 가정값인지 확인","세금·수수료 반영 여부 확인","낙관·기준·보수 시나리오로 추가 비교"],fileLabel:"복리자산계획표"},
    "moving-budget":{title:"나의 이사 예산·견적표",inputTitle:"이사 조건",resultTitle:"예상 이사비",summaryTitle:"이사 준비 점검",summary:"이사 조건과 예상 비용을 한 장에 정리해 업체 견적 비교에 활용할 수 있습니다.",checks:["포장이사·반포장·일반이사 범위 확인","사다리차·엘리베이터·주차비 추가 여부 확인","최소 2~3개 업체 견적 비교"],fileLabel:"이사예산견적표"},
    "ownership-cost":{title:"연간 자동차 유지비 계획표",inputTitle:"차량 이용 조건",resultTitle:"유지비 예상",summaryTitle:"차량비 점검",summary:"연료·보험·세금·정비비를 기준으로 연간 차량 보유비를 정리합니다.",checks:["보험료와 자동차세 실제 고지액 반영","주차·통행료 등 고정 지출 포함","정비·타이어 등 비정기 지출 예비비 반영"],fileLabel:"자동차유지비계획표"},
    "annual-car-total":{title:"자동차 연간 총비용표",inputTitle:"차량 비용 조건",resultTitle:"연간 비용 요약",summaryTitle:"총비용 점검",summary:"월 고정비와 연간 비용을 합쳐 실제 차량 보유 총비용을 정리합니다.",checks:["월 비용과 연 비용이 중복 입력되지 않았는지 확인","감가상각을 별도 비용으로 볼지 결정","차량 교체 계획과 함께 비교"],fileLabel:"자동차연간총비용표"},
    "ice-vs-ev-cost":{title:"내연기관 vs 전기차 유지비 비교표",inputTitle:"비교 조건",resultTitle:"차량별 비용 비교",summaryTitle:"구매 판단 점검",summary:"주행거리와 에너지 단가를 기준으로 두 차량 유형의 유지비 차이를 비교합니다.",checks:["차량 구매가격 차이 별도 반영","충전 환경과 충전단가 확인","보험·세금·정비비까지 포함해 최종 비교"],fileLabel:"차량유지비비교표"},
    "landed-cost":{title:"해외직구 총비용 비교표",inputTitle:"구매 조건",resultTitle:"최종 구매원가",summaryTitle:"직구 점검",summary:"상품가·배송비·세금·수수료를 합친 실제 해외구매 원가를 정리합니다.",checks:["관부가세 부과 기준 확인","해외결제 수수료 포함 여부 확인","국내 구매가와 최종 원가 비교"],fileLabel:"해외직구총비용표"},
    "project-quote":{title:"프리랜서 프로젝트 견적서",inputTitle:"프로젝트 조건",resultTitle:"견적 산출 결과",summaryTitle:"견적 점검",summary:"예상 작업시간·시간단가·직접비·여유율을 기준으로 제안 견적을 정리합니다.",checks:["수정 횟수와 작업 범위 명시","세금·플랫폼 수수료 반영 여부 확인","선금·중도금·잔금 조건 별도 합의"],fileLabel:"프로젝트견적서"},
    "trip-expense-split":{title:"여행경비 계획·정산표",inputTitle:"여행 공동경비",resultTitle:"1인당 분담 결과",summaryTitle:"여행 정산 점검",summary:"숙박·교통·식비 등 공동경비를 정리하고 인원별 분담액을 계산합니다.",checks:["개인경비와 공동경비 분리","선결제자와 정산대상 기록","환불·취소비 발생 시 재정산"],fileLabel:"여행경비정산표"},
    "group-dues":{title:"모임 회비 운영계획표",inputTitle:"모임 예산 조건",resultTitle:"회비 산정 결과",summaryTitle:"회비 운영 점검",summary:"목표예산과 인원, 기간을 기준으로 1인당 회비를 정리합니다.",checks:["예비비 비율 합의","납부 주기와 마감일 설정","지출내역 공개 기준 정하기"],fileLabel:"모임회비운영표"}
  };
  const categoryDefaults:Record<ToolCategory,Template>={
    MONEY:{title:`${toolName} 금융 계획표`,inputTitle:"계산 조건",resultTitle:"금융 결과 요약",summaryTitle:"금융 의사결정 점검",summary:"입력한 금융 조건과 계산 결과를 한 장에 정리한 맞춤 자료입니다.",checks:["실제 금융기관 조건과 비교","세금·수수료 포함 여부 확인","다른 조건으로 한 번 더 비교"],fileLabel:"금융계획표"},
    HOME:{title:`${toolName} 주거 계획표`,inputTitle:"주거·공사 조건",resultTitle:"예상 결과",summaryTitle:"주거 계획 점검",summary:"면적·수량·비용 등 입력값과 결과를 실제 견적 비교에 쓰기 쉽게 정리합니다.",checks:["현장 실측값과 차이 확인","여유분·부대비용 반영","업체 견적과 비교"],fileLabel:"주거계획표"},
    CAR:{title:`${toolName} 자동차 비용표`,inputTitle:"차량 조건",resultTitle:"자동차 계산 결과",summaryTitle:"자동차 비용 점검",summary:"차량 관련 입력 조건과 비용 결과를 비교·보관하기 쉽게 정리합니다.",checks:["실제 주행거리와 단가 반영","보험·세금·정비비 누락 확인","연간 총비용으로 환산해 비교"],fileLabel:"자동차비용표"},
    BUY:{title:`${toolName} 구매 비교표`,inputTitle:"구매 조건",resultTitle:"실질 구매 결과",summaryTitle:"구매 판단 점검",summary:"가격·할인·수수료 등 구매 조건을 실제 결제 기준으로 정리합니다.",checks:["배송비와 수수료 포함","적립금은 실제 사용가능 가치로 판단","최종 결제금액 기준으로 비교"],fileLabel:"구매비교표"},
    WORK:{title:`${toolName} 업무 정산표`,inputTitle:"근무·업무 조건",resultTitle:"정산 결과",summaryTitle:"업무 정산 점검",summary:"근로시간·수당·견적 등 업무 관련 입력과 결과를 기록용으로 정리합니다.",checks:["적용 기준과 계약조건 확인","시간·단가 입력값 재확인","법정 기준이 있는 경우 최신 기준 확인"],fileLabel:"업무정산표"},
    LIFE:{title:`${toolName} 생활 계획표`,inputTitle:"생활 조건",resultTitle:"계산·정산 결과",summaryTitle:"생활 계획 점검",summary:"일상에서 바로 활용할 수 있도록 입력값과 결과를 한 장에 정리합니다.",checks:["공동사용 시 기준을 함께 확인","필요하면 메모를 추가해 보관","변경된 조건으로 다시 계산"],fileLabel:"생활계획표"}
  };
  return {...categoryDefaults[category],...(exact[slug]||{}),title:resourceTitle||exact[slug]?.title||categoryDefaults[category].title} as Template;
}

export default function PersonalizedResultEngine({toolName,slug,category,resourceTitle}:Props){
  const [data,setData]=useState<{inputs:Pair[];results:Pair[];created:string}|null>(null);
  const [saving,setSaving]=useState(false);
  const template=getTemplate(slug,category,toolName,resourceTitle);
  const generate=()=>{const root=document.getElementById("calculator-workspace");if(!root)return;const collected=collectPairs(root);setData({...collected,created:new Date().toLocaleString("ko-KR")});};
  const saveCsv=()=>{if(!data)return;const rows=[["구분","항목","값"],...data.inputs.map(v=>[template.inputTitle,v.label,v.value]),...data.results.map(v=>[template.resultTitle,v.label,v.value]),[template.summaryTitle,"활용 메모",template.summary],...template.checks.map((v,i)=>[template.summaryTitle,`체크 ${i+1}`,v])];const text="\ufeff"+rows.map(row=>row.map(csvCell).join(",")).join("\n");const blob=new Blob([text],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`생활도구-${template.fileLabel}.csv`;a.click();URL.revokeObjectURL(url);};
  const savePdf=async()=>{if(!data)return;const target=document.getElementById("personalized-result-sheet");if(!target)return;setSaving(true);try{const [{default:html2canvas},{jsPDF}]=await Promise.all([import("html2canvas"),import("jspdf")]);const canvas=await html2canvas(target,{scale:2,backgroundColor:"#ffffff",useCORS:true});const pdf=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});const pageW=210,pageH=297,margin=12,usableW=pageW-margin*2;const imgH=canvas.height*usableW/canvas.width;const img=canvas.toDataURL("image/png",1);let y=margin,remaining=imgH;pdf.addImage(img,"PNG",margin,y,usableW,imgH);remaining-=pageH-margin*2;while(remaining>0){pdf.addPage();y=margin-(imgH-remaining);pdf.addImage(img,"PNG",margin,y,usableW,imgH);remaining-=pageH-margin*2;}pdf.save(`생활도구-${template.fileLabel}.pdf`);}finally{setSaving(false);}};
  return <section style={{marginTop:24}} aria-label="자동 맞춤 결과물"><div style={{border:"1px solid #dbe5f0",borderRadius:20,padding:20,background:"linear-gradient(135deg,#f8fbff,#f6fffb)",boxShadow:"0 10px 30px rgba(24,39,75,.06)"}}><div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",flexWrap:"wrap"}}><div><span className="category-label">FREE TEMPLATE</span><h3 style={{margin:"5px 0 3px",fontSize:"1.15rem"}}>{template.title} 만들기</h3><p style={{margin:0,color:"#667085",fontSize:14}}>{template.summary}</p></div><button type="button" className="primary" onClick={generate} style={{padding:"0 18px",minWidth:170}}>맞춤 양식 생성</button></div>{data&&<div id="personalized-result-sheet" style={{marginTop:18,padding:22,border:"1px solid #e5eaf1",borderRadius:16,background:"#fff"}}><div style={{borderBottom:"2px solid #315efb",paddingBottom:14,marginBottom:18}}><small style={{color:"#315efb",fontWeight:800}}>생활도구 · {category} 맞춤 양식</small><h3 style={{margin:"4px 0 2px",fontSize:"1.5rem",color:"#172033"}}>{template.title}</h3><span style={{fontSize:12,color:"#98a2b3"}}>생성: {data.created}</span></div><h4 style={{margin:"0 0 10px"}}>{template.inputTitle}</h4><div className="stats" style={{marginBottom:20}}>{data.inputs.length?data.inputs.map((v,i)=><div className="stat" key={`${v.label}-${i}`}><small>{v.label}</small><strong>{v.value}</strong></div>):<div className="notice">별도 입력값이 없는 도구입니다.</div>}</div><h4 style={{margin:"0 0 10px"}}>{template.resultTitle}</h4><div className="stats" style={{marginBottom:20}}>{data.results.length?data.results.map((v,i)=><div className="stat" key={`${v.label}-${i}`}><small>{v.label}</small><strong>{v.value}</strong></div>):<div className="notice">표시 가능한 계산 결과를 찾지 못했습니다.</div>}</div><div style={{padding:16,borderRadius:14,background:"#f8fafc",border:"1px solid #e8edf3"}}><h4 style={{margin:"0 0 8px"}}>{template.summaryTitle}</h4><p style={{margin:"0 0 10px",color:"#667085",fontSize:13}}>{template.summary}</p>{template.checks.map((item,i)=><div key={item} style={{display:"flex",gap:8,alignItems:"flex-start",marginTop:i?7:0,fontSize:13,color:"#344054"}}><span style={{color:"#16a34a",fontWeight:900}}>✓</span><span>{item}</span></div>)}</div><p style={{margin:"18px 0 0",fontSize:12,color:"#98a2b3"}}>이 양식은 입력값과 일반적인 계산 기준에 따른 참고용 자료입니다. 계약·세금·법정 기준은 최신 조건을 별도로 확인하세요.</p></div>}{data&&<div className="action-row no-print" style={{marginTop:12}}><button type="button" className="primary" onClick={savePdf} disabled={saving}>{saving?"PDF 생성 중...":"PDF 양식 저장"}</button><button type="button" className="secondary" onClick={saveCsv}>CSV 양식 저장</button></div>}</div></section>;
}
