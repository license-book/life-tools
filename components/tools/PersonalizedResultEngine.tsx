"use client";

import { useState } from "react";

type Pair={label:string;value:string};

type Props={
  toolName:string;
  slug:string;
  resourceTitle?:string;
};

function clean(text:string){return text.replace(/\s+/g," ").trim();}

function collectPairs(root:HTMLElement){
  const inputs:Pair[]=[];
  root.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>("input,select,textarea").forEach(control=>{
    if(control.type==="button"||control.type==="submit"||control.type==="hidden") return;
    const field=control.closest(".field");
    const label=clean(field?.querySelector("label")?.textContent||control.getAttribute("aria-label")||control.name||"입력값");
    let value="";
    if(control instanceof HTMLSelectElement) value=clean(control.selectedOptions[0]?.textContent||control.value);
    else value=clean(control.value);
    const unit=clean(field?.querySelector(".field-help")?.textContent?.replace(/^단위:\s*/,"")||"");
    if(label&&value) inputs.push({label,value:unit&&!value.includes(unit)?`${value} ${unit}`:value});
  });

  const results:Pair[]=[];
  root.querySelectorAll<HTMLElement>(".stat").forEach(stat=>{
    const label=clean(stat.querySelector("small")?.textContent||"");
    const value=clean(stat.querySelector("strong")?.textContent||"");
    if(label&&value) results.push({label,value});
  });
  root.querySelectorAll<HTMLElement>(".result-main").forEach(main=>{
    const label=clean(main.querySelector(".result-main-label")?.textContent||"");
    const value=clean(main.querySelector(".result-main-value")?.textContent||"");
    if(label&&value&&!results.some(r=>r.label===label&&r.value===value)) results.unshift({label,value});
  });
  return {inputs,results};
}

function csvCell(value:string){return `"${value.replace(/"/g,'""')}"`;}

export default function PersonalizedResultEngine({toolName,slug,resourceTitle}:Props){
  const [data,setData]=useState<{inputs:Pair[];results:Pair[];created:string}|null>(null);
  const [saving,setSaving]=useState(false);
  const title=resourceTitle||`${toolName} 맞춤 결과표`;

  const generate=()=>{
    const root=document.getElementById("calculator-workspace");
    if(!root) return;
    const collected=collectPairs(root);
    setData({...collected,created:new Date().toLocaleString("ko-KR")});
  };

  const saveCsv=()=>{
    if(!data) return;
    const rows=[["구분","항목","값"],...data.inputs.map(v=>["입력",v.label,v.value]),...data.results.map(v=>["결과",v.label,v.value])];
    const text="\ufeff"+rows.map(row=>row.map(csvCell).join(",")).join("\n");
    const blob=new Blob([text],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`생활도구-${slug}-맞춤결과.csv`;a.click();URL.revokeObjectURL(url);
  };

  const savePdf=async()=>{
    if(!data) return;
    const target=document.getElementById("personalized-result-sheet");
    if(!target) return;
    setSaving(true);
    try{
      const [{default:html2canvas},{jsPDF}]=await Promise.all([import("html2canvas"),import("jspdf")]);
      const canvas=await html2canvas(target,{scale:2,backgroundColor:"#ffffff",useCORS:true});
      const pdf=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
      const pageW=210,pageH=297,margin=12,usableW=pageW-margin*2;
      const imgH=canvas.height*usableW/canvas.width;
      const img=canvas.toDataURL("image/png",1);
      let y=margin,remaining=imgH;
      pdf.addImage(img,"PNG",margin,y,usableW,imgH);
      remaining-=pageH-margin*2;
      while(remaining>0){pdf.addPage();y=margin-(imgH-remaining);pdf.addImage(img,"PNG",margin,y,usableW,imgH);remaining-=pageH-margin*2;}
      pdf.save(`생활도구-${slug}-맞춤결과.pdf`);
    }finally{setSaving(false);}
  };

  return <section style={{marginTop:24}} aria-label="자동 맞춤 결과물">
    <div style={{border:"1px solid #dbe5f0",borderRadius:20,padding:20,background:"linear-gradient(135deg,#f8fbff,#f6fffb)",boxShadow:"0 10px 30px rgba(24,39,75,.06)"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div><span className="category-label">FREE RESULT</span><h3 style={{margin:"5px 0 3px",fontSize:"1.15rem"}}>내 입력값으로 맞춤 결과물 만들기</h3><p style={{margin:0,color:"#667085",fontSize:14}}>현재 입력값과 계산 결과를 자동으로 정리해 PDF·CSV 결과표로 저장합니다.</p></div>
        <button type="button" className="primary" onClick={generate} style={{padding:"0 18px",minWidth:170}}>맞춤 결과표 생성</button>
      </div>

      {data&&<div id="personalized-result-sheet" style={{marginTop:18,padding:22,border:"1px solid #e5eaf1",borderRadius:16,background:"#fff"}}>
        <div style={{borderBottom:"2px solid #315efb",paddingBottom:14,marginBottom:18}}><small style={{color:"#315efb",fontWeight:800}}>생활도구 자동 맞춤 결과물</small><h3 style={{margin:"4px 0 2px",fontSize:"1.5rem",color:"#172033"}}>{title}</h3><span style={{fontSize:12,color:"#98a2b3"}}>생성: {data.created}</span></div>
        <h4 style={{margin:"0 0 10px"}}>입력 조건</h4><div className="stats" style={{marginBottom:20}}>{data.inputs.length?data.inputs.map((v,i)=><div className="stat" key={`${v.label}-${i}`}><small>{v.label}</small><strong>{v.value}</strong></div>):<div className="notice">별도 입력값이 없는 도구입니다.</div>}</div>
        <h4 style={{margin:"0 0 10px"}}>계산 결과</h4><div className="stats">{data.results.length?data.results.map((v,i)=><div className="stat" key={`${v.label}-${i}`}><small>{v.label}</small><strong>{v.value}</strong></div>):<div className="notice">표시 가능한 계산 결과를 찾지 못했습니다.</div>}</div>
        <p style={{margin:"18px 0 0",fontSize:12,color:"#98a2b3"}}>이 결과물은 입력값과 일반적인 계산 기준에 따른 참고용 자료입니다.</p>
      </div>}

      {data&&<div className="action-row no-print" style={{marginTop:12}}><button type="button" className="primary" onClick={savePdf} disabled={saving}>{saving?"PDF 생성 중...":"PDF 결과표 저장"}</button><button type="button" className="secondary" onClick={saveCsv}>CSV 데이터 저장</button></div>}
    </div>
  </section>;
}
