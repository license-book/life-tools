"use client";

import { useState } from "react";

const iconBase = { width:20, height:20, flex:"0 0 auto" } as const;
const rowStyle = { display:"flex", flexWrap:"wrap" as const, gap:10, marginTop:18 } as const;
const baseButton = { minHeight:48, padding:"0 16px", borderRadius:14, border:"1px solid transparent", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:9, fontWeight:850, fontSize:".9rem", letterSpacing:"-.01em", boxShadow:"0 8px 20px rgba(31,41,55,.10)" } as const;

function PrintIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={iconBase} aria-hidden="true"><path d="M7 8V3h10v5"/><path d="M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/><path d="M17 11h.01"/></svg>}
function PdfIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={iconBase} aria-hidden="true"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M8 16v-5h1.8a1.7 1.7 0 1 1 0 3.4H8"/><path d="M13 16v-5h1.3c1.8 0 2.7.9 2.7 2.5S16.1 16 14.3 16z"/></svg>}

export default function ToolOutputActions({targetSelector=".tool-layout",fileName="생활도구-계산결과"}:{targetSelector?:string;fileName?:string}){
  const [saving,setSaving]=useState(false);
  const savePdf=async()=>{
    if(saving) return;
    const target=document.querySelector(targetSelector) as HTMLElement | null;
    if(!target) return;
    setSaving(true);
    try{
      const [{default:html2canvas},{jsPDF}]=await Promise.all([import("html2canvas"),import("jspdf")]);
      const canvas=await html2canvas(target,{scale:2,useCORS:true,backgroundColor:"#ffffff",logging:false});
      const img=canvas.toDataURL("image/png");
      const pdf=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
      const pageW=210,pageH=297,margin=10,usableW=pageW-margin*2;
      const imgH=canvas.height*usableW/canvas.width;
      let y=margin;
      if(imgH<=pageH-margin*2){pdf.addImage(img,"PNG",margin,y,usableW,imgH,"FAST");}
      else{
        const slicePx=Math.floor((pageH-margin*2)*canvas.width/usableW);
        let offset=0,page=0;
        while(offset<canvas.height){
          const h=Math.min(slicePx,canvas.height-offset);
          const slice=document.createElement("canvas");slice.width=canvas.width;slice.height=h;
          slice.getContext("2d")?.drawImage(canvas,0,offset,canvas.width,h,0,0,canvas.width,h);
          if(page>0) pdf.addPage();
          pdf.addImage(slice.toDataURL("image/png"),"PNG",margin,margin,usableW,h*usableW/canvas.width,"FAST");
          offset+=h;page++;
        }
      }
      pdf.save(`${fileName}.pdf`);
    } finally { setSaving(false); }
  };
  return <div className="no-print" style={rowStyle} aria-label="계산 결과 저장 및 인쇄">
    <button type="button" onClick={()=>window.print()} style={{...baseButton,background:"linear-gradient(135deg,#315efb 0%,#2786f5 100%)",color:"#fff",borderColor:"rgba(49,94,251,.3)"}}><PrintIcon/>인쇄하기</button>
    <button type="button" onClick={savePdf} disabled={saving} style={{...baseButton,background:"linear-gradient(135deg,#0f9f6e 0%,#16a3a5 100%)",color:"#fff",borderColor:"rgba(15,159,110,.3)",opacity:saving?.72:1}}><PdfIcon/>{saving?"PDF 생성 중...":"PDF 저장"}</button>
  </div>;
}
