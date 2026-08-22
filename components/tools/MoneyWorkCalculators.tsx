"use client";

import { useMemo, useState } from "react";

const won = (value: number) => `${Math.round(value).toLocaleString("ko-KR")}원`;

export function SeveranceCalculator() {
  const [monthlyWage, setMonthlyWage] = useState(3000000);
  const [years, setYears] = useState(3);
  const result = Math.max(0, monthlyWage) * Math.max(0, years);
  return <div className="tool-layout"><section className="panel"><div className="field"><label>최근 3개월 평균 월 임금</label><input type="number" min="0" value={monthlyWage} onChange={e=>setMonthlyWage(Number(e.target.value))}/></div><div className="field"><label>계속근로기간 (년)</label><input type="number" min="0" step="0.1" value={years} onChange={e=>setYears(Number(e.target.value))}/></div><div className="notice">간편 추정값입니다. 실제 법정 퇴직금은 평균임금과 계속근로일수 등을 기준으로 계산합니다.</div></section><section className="panel"><span className="category-label">예상 퇴직금</span><div className="result-main">{won(result)}</div><div className="stats"><div className="stat"><small>평균 월 임금</small><strong>{won(monthlyWage)}</strong></div><div className="stat"><small>근속기간</small><strong>{years}년</strong></div></div><div className="action-row no-print"><button className="secondary" type="button" onClick={()=>window.print()}>인쇄 · PDF 저장</button></div></section></div>;
}

export function AnnualSalaryCalculator() {
  const [monthly, setMonthly] = useState(3000000);
  const [bonus, setBonus] = useState(0);
  const annual = Math.max(0, monthly) * 12 + Math.max(0, bonus);
  return <div className="tool-layout"><section className="panel"><div className="field"><label>월 급여</label><input type="number" min="0" value={monthly} onChange={e=>setMonthly(Number(e.target.value))}/></div><div className="field"><label>연간 상여금</label><input type="number" min="0" value={bonus} onChange={e=>setBonus(Number(e.target.value))}/></div></section><section className="panel"><span className="category-label">연봉 환산</span><div className="result-main">{won(annual)}</div><div className="stats"><div className="stat"><small>월 급여 × 12</small><strong>{won(monthly*12)}</strong></div><div className="stat"><small>연간 상여</small><strong>{won(bonus)}</strong></div></div></section></div>;
}

export function WageConverter() {
  const [hourly, setHourly] = useState(10320);
  const [hours, setHours] = useState(40);
  const result = useMemo(()=>{ const weekly=Math.max(0,hourly)*Math.max(0,hours); return {weekly, monthly:weekly*365/7/12, annual:weekly*365/7}; },[hourly,hours]);
  return <div className="tool-layout"><section className="panel"><div className="field"><label>시급</label><input type="number" min="0" value={hourly} onChange={e=>setHourly(Number(e.target.value))}/></div><div className="field"><label>주당 근로시간</label><input type="number" min="0" max="168" value={hours} onChange={e=>setHours(Number(e.target.value))}/></div><div className="notice">단순 시간 환산값으로 주휴수당, 연장·야간·휴일수당 등은 별도입니다.</div></section><section className="panel"><span className="category-label">급여 환산</span><div className="result-main">월 약 {won(result.monthly)}</div><div className="stats"><div className="stat"><small>주급</small><strong>{won(result.weekly)}</strong></div><div className="stat"><small>연 환산</small><strong>{won(result.annual)}</strong></div></div></section></div>;
}
