"use client";

import { useMemo, useState } from "react";
import { convertUnit } from "@/lib/calculator/unitConverter";
import ToolOutputActions from "@/components/tools/ToolOutputActions";

type Mode = "speed" | "distance" | "time";
type DistanceUnit = "m" | "km" | "mile";
type SpeedUnit = "mps" | "kmh" | "mph";
type TimeUnit = "sec" | "min" | "hour";

const distanceLabels: Record<DistanceUnit,string> = { m:"m", km:"km", mile:"mile" };
const speedLabels: Record<SpeedUnit,string> = { mps:"m/s", kmh:"km/h", mph:"mph" };
const timeLabels: Record<TimeUnit,string> = { sec:"초", min:"분", hour:"시간" };

const toSeconds=(value:number,unit:TimeUnit)=>unit==="hour"?value*3600:unit==="min"?value*60:value;
const fromSeconds=(value:number,unit:TimeUnit)=>unit==="hour"?value/3600:unit==="min"?value/60:value;
const fmt=(n:number,d=2)=>Number.isFinite(n)?n.toLocaleString("ko-KR",{maximumFractionDigits:d}):"-";

export default function DistanceSpeedTimeCalculator(){
  const [mode,setMode]=useState<Mode>("speed");
  const [distance,setDistance]=useState(120);
  const [distanceUnit,setDistanceUnit]=useState<DistanceUnit>("km");
  const [speed,setSpeed]=useState(80);
  const [speedUnit,setSpeedUnit]=useState<SpeedUnit>("kmh");
  const [time,setTime]=useState(1.5);
  const [timeUnit,setTimeUnit]=useState<TimeUnit>("hour");

  const result=useMemo(()=>{
    const safeDistance=Math.max(0,distance||0);
    const safeSpeed=Math.max(0,speed||0);
    const safeTime=Math.max(0,time||0);
    if(mode==="speed"){
      const meters=convertUnit("length",safeDistance,distanceUnit,"m");
      const seconds=toSeconds(safeTime,timeUnit);
      const mps=seconds>0?meters/seconds:0;
      return {kind:"speed" as const,base:mps};
    }
    if(mode==="distance"){
      const mps=convertUnit("speed",safeSpeed,speedUnit,"mps");
      const seconds=toSeconds(safeTime,timeUnit);
      return {kind:"distance" as const,base:mps*seconds};
    }
    const meters=convertUnit("length",safeDistance,distanceUnit,"m");
    const mps=convertUnit("speed",safeSpeed,speedUnit,"mps");
    return {kind:"time" as const,base:mps>0?meters/mps:0};
  },[mode,distance,distanceUnit,speed,speedUnit,time,timeUnit]);

  const mainResult=mode==="speed"
    ? `${fmt(convertUnit("speed",result.base,"mps",speedUnit))} ${speedLabels[speedUnit]}`
    : mode==="distance"
      ? `${fmt(convertUnit("length",result.base,"m",distanceUnit))} ${distanceLabels[distanceUnit]}`
      : `${fmt(fromSeconds(result.base,timeUnit))} ${timeLabels[timeUnit]}`;

  return <div className="tool-layout">
    <section className="panel">
      <span className="category-label">계산할 항목</span>
      <div className="field"><label htmlFor="dst-mode">무엇을 계산할까요?</label><select id="dst-mode" value={mode} onChange={e=>setMode(e.target.value as Mode)}><option value="speed">속도 계산</option><option value="distance">거리 계산</option><option value="time">시간 계산</option></select></div>

      {mode!=="distance"?<div className="field"><label>거리</label><div style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:8}}><input type="number" min="0" step="0.1" value={distance} onChange={e=>setDistance(Number(e.target.value))}/><select value={distanceUnit} onChange={e=>setDistanceUnit(e.target.value as DistanceUnit)}><option value="m">m</option><option value="km">km</option><option value="mile">mile</option></select></div></div>:null}

      {mode!=="speed"?<div className="field"><label>속도</label><div style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:8}}><input type="number" min="0" step="0.1" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/><select value={speedUnit} onChange={e=>setSpeedUnit(e.target.value as SpeedUnit)}><option value="kmh">km/h</option><option value="mps">m/s</option><option value="mph">mph</option></select></div></div>:null}

      {mode!=="time"?<div className="field"><label>시간</label><div style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:8}}><input type="number" min="0" step="0.01" value={time} onChange={e=>setTime(Number(e.target.value))}/><select value={timeUnit} onChange={e=>setTimeUnit(e.target.value as TimeUnit)}><option value="hour">시간</option><option value="min">분</option><option value="sec">초</option></select></div></div>:null}

      <div className="notice">공식: 속도 = 거리 ÷ 시간 · 거리 = 속도 × 시간 · 시간 = 거리 ÷ 속도</div>
    </section>

    <section className="panel" aria-live="polite">
      <span className="category-label">계산 결과</span>
      <div className="result-main">{mainResult}</div>
      {mode==="speed"?<div className="stats"><div className="stat"><small>km/h</small><strong>{fmt(convertUnit("speed",result.base,"mps","kmh"))} km/h</strong></div><div className="stat"><small>mph</small><strong>{fmt(convertUnit("speed",result.base,"mps","mph"))} mph</strong></div><div className="stat"><small>m/s</small><strong>{fmt(result.base)} m/s</strong></div></div>:null}
      {mode==="distance"?<div className="stats"><div className="stat"><small>킬로미터</small><strong>{fmt(convertUnit("length",result.base,"m","km"))} km</strong></div><div className="stat"><small>마일</small><strong>{fmt(convertUnit("length",result.base,"m","mile"))} mile</strong></div><div className="stat"><small>미터</small><strong>{fmt(result.base)} m</strong></div></div>:null}
      {mode==="time"?<div className="stats"><div className="stat"><small>시간</small><strong>{fmt(fromSeconds(result.base,"hour"))}시간</strong></div><div className="stat"><small>분</small><strong>{fmt(fromSeconds(result.base,"min"))}분</strong></div><div className="stat"><small>초</small><strong>{fmt(result.base)}초</strong></div></div>:null}
      <ToolOutputActions />
    </section>
  </div>;
}
