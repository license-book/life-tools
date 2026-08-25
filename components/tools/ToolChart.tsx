"use client";

export type ChartDatum={label:string;value:number};
export type LineDatum={label:string;value:number};

type Common={title:string;description?:string;valueFormatter?:(value:number)=>string};
type DonutProps=Common&{type:"donut";data:ChartDatum[];centerLabel?:string};
type BarProps=Common&{type:"bar";data:ChartDatum[]};
type LineProps=Common&{type:"line";data:LineDatum[]};
type Props=DonutProps|BarProps|LineProps;

const colors=["#315efb","#16a3a5","#7c3aed","#f59e0b","#0f9f6e","#ef4444"];
const nf=new Intl.NumberFormat("ko-KR",{maximumFractionDigits:0});
const fmtDefault=(v:number)=>nf.format(Math.round(v));

function Donut({data,centerLabel,valueFormatter=fmtDefault}:{data:ChartDatum[];centerLabel?:string;valueFormatter?:(v:number)=>string}){
  const total=data.reduce((s,d)=>s+Math.max(0,d.value),0)||1;
  let offset=0;
  return <div style={{display:"grid",gridTemplateColumns:"minmax(160px,220px) 1fr",gap:22,alignItems:"center"}}>
    <div style={{position:"relative",width:"100%",aspectRatio:"1/1",maxWidth:220,margin:"0 auto"}}>
      <svg viewBox="0 0 120 120" style={{width:"100%",height:"100%",transform:"rotate(-90deg)"}} aria-hidden="true">
        <circle cx="60" cy="60" r="42" fill="none" stroke="#eef2f7" strokeWidth="18"/>
        {data.map((d,i)=>{const ratio=Math.max(0,d.value)/total;const dash=ratio*263.89;const el=<circle key={d.label} cx="60" cy="60" r="42" fill="none" stroke={colors[i%colors.length]} strokeWidth="18" strokeDasharray={`${dash} ${263.89-dash}`} strokeDashoffset={-offset} strokeLinecap="butt"/>;offset+=dash;return el;})}
      </svg>
      <div style={{position:"absolute",inset:0,display:"grid",placeItems:"center",textAlign:"center",pointerEvents:"none"}}><div><strong style={{display:"block",fontSize:"1.25rem",color:"#172033"}}>{centerLabel??valueFormatter(total)}</strong><span style={{fontSize:".78rem",color:"#667085"}}>합계</span></div></div>
    </div>
    <div style={{display:"grid",gap:10}}>{data.map((d,i)=><div key={d.label} style={{display:"grid",gridTemplateColumns:"12px 1fr auto",gap:9,alignItems:"center"}}><span style={{width:10,height:10,borderRadius:999,background:colors[i%colors.length]}}/><span style={{fontSize:".86rem",color:"#5f6b7c"}}>{d.label}</span><strong style={{fontSize:".88rem"}}>{valueFormatter(d.value)}</strong></div>)}</div>
  </div>;
}

function Bars({data,valueFormatter=fmtDefault}:{data:ChartDatum[];valueFormatter?:(v:number)=>string}){
  const max=Math.max(...data.map(d=>Math.max(0,d.value)),1);
  return <div style={{display:"grid",gap:14}}>{data.map((d,i)=><div key={d.label}><div style={{display:"flex",justifyContent:"space-between",gap:12,fontSize:".84rem",marginBottom:6}}><span style={{color:"#5f6b7c"}}>{d.label}</span><strong>{valueFormatter(d.value)}</strong></div><div style={{height:12,borderRadius:999,background:"#edf1f7",overflow:"hidden"}}><span style={{display:"block",height:"100%",width:`${Math.max(3,d.value/max*100)}%`,background:`linear-gradient(90deg,${colors[i%colors.length]},${colors[(i+1)%colors.length]})`,borderRadius:999}}/></div></div>)}</div>;
}

function Line({data,valueFormatter=fmtDefault}:{data:LineDatum[];valueFormatter?:(v:number)=>string}){
  const w=640,h=220,p=26;const max=Math.max(...data.map(d=>d.value),1),min=Math.min(...data.map(d=>d.value),0);const span=Math.max(1,max-min);
  const pts=data.map((d,i)=>{const x=p+(w-p*2)*(data.length===1?.5:i/(data.length-1));const y=h-p-(h-p*2)*(d.value-min)/span;return{x,y,d};});
  const path=pts.map((pt,i)=>`${i===0?"M":"L"}${pt.x},${pt.y}`).join(" ");
  return <div><svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",height:"auto",display:"block"}} role="img" aria-label="기간별 변화 그래프"><line x1={p} y1={h-p} x2={w-p} y2={h-p} stroke="#dfe5ee"/><line x1={p} y1={p} x2={p} y2={h-p} stroke="#dfe5ee"/><path d={path} fill="none" stroke="#315efb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>{pts.map((pt,i)=><g key={`${pt.d.label}-${i}`}><circle cx={pt.x} cy={pt.y} r="5" fill="#fff" stroke="#16a3a5" strokeWidth="3"/>{(i===0||i===pts.length-1||i%Math.max(1,Math.ceil(pts.length/6))===0)&&<text x={pt.x} y={h-6} textAnchor="middle" fontSize="11" fill="#667085">{pt.d.label}</text>}</g>)}</svg><div style={{display:"flex",justifyContent:"space-between",fontSize:".8rem",color:"#667085",marginTop:4}}><span>최대 {valueFormatter(max)}</span><span>최소 {valueFormatter(min)}</span></div></div>;
}

export default function ToolChart(props:Props){
  return <section className="chart-card" style={{background:"#fff",border:"1px solid #e5eaf1",borderRadius:20,padding:22,boxShadow:"0 8px 24px rgba(24,39,75,.06)"}}><div style={{marginBottom:18}}><span className="category-label">RESULT CHART</span><h3 style={{margin:"6px 0 4px",fontSize:"1.08rem"}}>{props.title}</h3>{props.description?<p style={{margin:0,color:"#667085",fontSize:".86rem"}}>{props.description}</p>:null}</div>{props.type==="donut"?<Donut data={props.data} centerLabel={props.centerLabel} valueFormatter={props.valueFormatter}/>:props.type==="bar"?<Bars data={props.data} valueFormatter={props.valueFormatter}/>:<Line data={props.data} valueFormatter={props.valueFormatter}/>}</section>;
}
