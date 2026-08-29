"use client";
import ManualCalculatorLayout from "@/components/tools/ManualCalculatorLayout";

import { useMemo, useState } from "react";
import { convertAll, convertUnit, getUnitGroup, unitGroups } from "@/lib/calculator/unitConverter";

const presets: Record<string,{group:string;from:string;to:string;value:number}> = {
  "unit-converter": { group:"length", from:"m", to:"cm", value:1 },
  "area-converter": { group:"area", from:"pyeong", to:"sqm", value:34 },
  "length-converter": { group:"length", from:"inch", to:"cm", value:10 },
  "weight-converter": { group:"weight", from:"lb", to:"kg", value:10 },
  "temperature-converter": { group:"temperature", from:"c", to:"f", value:25 },
  "speed-converter": { group:"speed", from:"kmh", to:"mph", value:100 },
  "fuel-economy-converter": { group:"fuel", from:"kml", to:"mpgus", value:12 },
};

function fmt(value:number){
  if (!Number.isFinite(value)) return "계산 불가";
  const abs=Math.abs(value);
  const digits=abs>=1000?2:abs>=1?4:6;
  return value.toLocaleString("ko-KR",{maximumFractionDigits:digits});
}

export default function UnitConverterCalculator({type}:{type:string}){
  const preset=presets[type] ?? presets["unit-converter"];
  const locked=type!=="unit-converter";
  const [groupKey,setGroupKey]=useState(preset.group);
  const [value,setValue]=useState(preset.value);
  const [fromKey,setFromKey]=useState(preset.from);
  const [toKey,setToKey]=useState(preset.to);
  const group=getUnitGroup(groupKey) ?? unitGroups[0];
  const from=group.units.find(u=>u.key===fromKey) ?? group.units[0];
  const to=group.units.find(u=>u.key===toKey) ?? group.units[1] ?? group.units[0];
  const result=useMemo(()=>convertUnit(group.key,value,from.key,to.key),[group.key,value,from.key,to.key]);
  const all=useMemo(()=>convertAll(group.key,value,from.key),[group.key,value,from.key]);

  const changeGroup=(next:string)=>{
    const nextGroup=getUnitGroup(next);
    if(!nextGroup)return;
    setGroupKey(next);
    setFromKey(nextGroup.units[0].key);
    setToKey(nextGroup.units[1]?.key ?? nextGroup.units[0].key);
  };
  const swap=()=>{setFromKey(to.key);setToKey(from.key)};

  return <ManualCalculatorLayout inputs={<>
      {!locked && <div className="field"><label>변환 종류</label><select value={group.key} onChange={e=>changeGroup(e.target.value)}>{unitGroups.map(g=><option key={g.key} value={g.key}>{g.label}</option>)}</select></div>}
      <div className="field"><label>변환할 값</label><input type="number" step="any" value={value} onChange={e=>setValue(Number(e.target.value))}/></div>
      <div className="field"><label>기준 단위</label><select value={from.key} onChange={e=>setFromKey(e.target.value)}>{group.units.map(u=><option key={u.key} value={u.key}>{u.label} ({u.symbol})</option>)}</select></div>
      <div className="action-row no-print"><button type="button" className="secondary" onClick={swap}>단위 서로 바꾸기</button></div>
      <div className="field"><label>변환 단위</label><select value={to.key} onChange={e=>setToKey(e.target.value)}>{group.units.map(u=><option key={u.key} value={u.key}>{u.label} ({u.symbol})</option>)}</select></div>
    </>} result={<section className="panel">
      <div className="result-main">{fmt(value)} {from.symbol} = {fmt(result)} {to.symbol}</div>
      <div className="stats">{all.filter(item=>item.key!==from.key).slice(0,8).map(item=><div className="stat" key={item.key}><small>{item.label}</small><strong>{fmt(item.value)} {item.symbol}</strong></div>)}</div>
      <div className="notice" style={{marginTop:16}}>입력값을 기준으로 같은 종류의 주요 단위를 한 번에 비교합니다. 소수점은 보기 좋게 반올림해 표시합니다.</div>
      <div className="action-row no-print"><button type="button" className="secondary" onClick={()=>window.print()}>인쇄 · PDF 저장</button></div>
    </section>}/>;
}
