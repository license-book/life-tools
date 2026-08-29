"use client";

import { useMemo, useState } from "react";
import { calculateLoan, type RepaymentMethod } from "@/lib/calculator/loan";
import ToolOutputActions from "@/components/tools/ToolOutputActions";
import ToolChart from "@/components/tools/ToolChart";
import KoreanMoneyHint from "@/components/tools/KoreanMoneyHint";

const won = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
const wonText = (value:number) => `${won.format(value)}원`;

const methodLabel: Record<RepaymentMethod, string> = {
  "equal-payment": "원리금균등",
  "equal-principal": "원금균등",
};

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(300000000);
  const [annualRate, setAnnualRate] = useState(4.2);
  const [years, setYears] = useState(30);
  const [method, setMethod] = useState<RepaymentMethod>("equal-payment");

  const months = Math.max(1, Math.round(years * 12));
  const equalPayment = useMemo(() => calculateLoan({ principal, annualRate, months, method: "equal-payment" }), [principal, annualRate, months]);
  const equalPrincipal = useMemo(() => calculateLoan({ principal, annualRate, months, method: "equal-principal" }), [principal, annualRate, months]);
  const result = method === "equal-payment" ? equalPayment : equalPrincipal;
  const comparisonMaxInterest = Math.max(equalPayment.totalInterest, equalPrincipal.totalInterest, 1);
  const comparisonMaxFirstPayment = Math.max(equalPayment.monthlyFirstPayment, equalPrincipal.monthlyFirstPayment, 1);
  const interestSaving = Math.abs(equalPayment.totalInterest - equalPrincipal.totalInterest);
  const balanceTrend = useMemo(() => {
    const points = result.schedule.filter((row) => row.month === 1 || row.month % 12 === 0 || row.month === result.schedule.length).map((row) => ({label:row.month===1?"1개월":`${Math.ceil(row.month/12)}년`,value:row.balance}));
    return points.length > 14 ? points.filter((_,i)=>i===0||i===points.length-1||i%Math.ceil(points.length/12)===0) : points;
  }, [result]);

  const exportCsv = () => {
    const header = "회차,상환액,원금,이자,잔액\n";
    const rows = result.schedule.map((row) => [row.month, row.payment, row.principal, row.interest, row.balance].join(",")).join("\n");
    const summary = `대출금액,${principal}\n연이자율,${annualRate}%\n대출기간,${months}개월\n상환방식,${methodLabel[method]}\n총상환액,${result.totalPayment}\n총이자,${result.totalInterest}\n\n`;
    const blob = new Blob(["\uFEFF" + summary + header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `loan-repayment-plan-${method}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-layout">
      <section className="panel no-print" aria-labelledby="loan-input-title">
        <span className="category-label">STEP 1</span>
        <h2 id="loan-input-title">대출 조건 입력</h2>
        <div className="field">
          <label htmlFor="principal">대출금액</label>
          <input id="principal" type="number" min="0" step="1000000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          <KoreanMoneyHint value={principal} />
        </div>
        <div className="field">
          <label htmlFor="rate">연 이자율 (%)</label>
          <input id="rate" type="number" min="0" max="100" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="years">대출기간 (년)</label>
          <input id="years" type="number" min="1" max="50" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="method">상환계획표에 적용할 방식</label>
          <select id="method" value={method} onChange={(e) => setMethod(e.target.value as RepaymentMethod)}>
            <option value="equal-payment">원리금균등상환</option>
            <option value="equal-principal">원금균등상환</option>
          </select>
        </div>
        <div className="notice">두 상환방식은 아래에서 자동으로 함께 비교합니다. 선택한 방식은 상세 결과와 무료 상환계획표에 적용됩니다.</div>
      </section>

      <section className="panel print-summary" aria-live="polite">
        <span className="category-label">STEP 2 · 선택 결과</span>
        <div className="result-main">첫 달 {won.format(result.monthlyFirstPayment)}원</div>
        <div className="stats">
          <div className="stat"><small>총 상환액</small><strong>{won.format(result.totalPayment)}원</strong></div>
          <div className="stat"><small>총 이자</small><strong>{won.format(result.totalInterest)}원</strong></div>
          <div className="stat"><small>대출기간</small><strong>{months}개월</strong></div>
          <div className="stat"><small>상환방식</small><strong>{methodLabel[method]}</strong></div>
        </div>
        <div className="action-row no-print" style={{gridTemplateColumns:"repeat(3,minmax(0,1fr))"}}>
          <button className="primary" type="button" onClick={exportCsv}>CSV 상환계획표</button>
          <ToolOutputActions embedded targetSelector=".tool-layout" fileName={`대출상환계산-${methodLabel[method]}`} />
        </div>
        <p className="resource-note no-print">회원가입·이메일 입력 없이 무료입니다. 인쇄는 프린터 출력용, PDF 저장은 현재 계산 결과를 PDF 파일로 바로 저장합니다.</p>
      </section>

      <section className="full-width" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
        <ToolChart type="donut" title="원금과 이자 구성" description="선택한 상환방식의 총 상환액에서 원금과 이자가 차지하는 비중입니다." data={[{label:"대출 원금",value:principal},{label:"총 이자",value:result.totalInterest}]} centerLabel={wonText(result.totalPayment)} valueFormatter={wonText}/>
        <ToolChart type="bar" title="상환방식 총이자 비교" description="두 방식의 총이자를 같은 기준으로 비교합니다." data={[{label:"원리금균등",value:equalPayment.totalInterest},{label:"원금균등",value:equalPrincipal.totalInterest}]} valueFormatter={wonText}/>
        <ToolChart type="line" title="남은 원금 감소 추이" description="선택한 방식으로 상환할 때 남은 원금이 줄어드는 흐름입니다." data={balanceTrend} valueFormatter={wonText}/>
      </section>

      <section className="panel full-width comparison-panel">
        <div className="section-heading-row"><div><span className="category-label">STEP 3 · 자동 비교</span><h2>원리금균등 vs 원금균등</h2></div><span className="comparison-saving">총이자 차이 약 {won.format(interestSaving)}원</span></div>
        <div className="compare-grid">
          <article className={`compare-card ${method === "equal-payment" ? "is-selected" : ""}`}>
            <div className="compare-title-row"><h3>원리금균등</h3><button className="text-button no-print" type="button" onClick={() => setMethod("equal-payment")}>이 방식 선택</button></div>
            <dl className="compare-values"><div><dt>첫 달 상환액</dt><dd>{won.format(equalPayment.monthlyFirstPayment)}원</dd></div><div><dt>총이자</dt><dd>{won.format(equalPayment.totalInterest)}원</dd></div></dl>
            <div className="metric"><div className="metric-label"><span>총이자 규모</span><strong>{Math.round(equalPayment.totalInterest / comparisonMaxInterest * 100)}%</strong></div><div className="metric-track"><span style={{ width: `${equalPayment.totalInterest / comparisonMaxInterest * 100}%` }} /></div></div>
            <div className="metric"><div className="metric-label"><span>첫 달 부담</span><strong>{Math.round(equalPayment.monthlyFirstPayment / comparisonMaxFirstPayment * 100)}%</strong></div><div className="metric-track"><span style={{ width: `${equalPayment.monthlyFirstPayment / comparisonMaxFirstPayment * 100}%` }} /></div></div>
            <p>매월 상환액이 거의 일정해 월별 현금흐름을 관리하기 편한 방식입니다.</p>
          </article>
          <article className={`compare-card ${method === "equal-principal" ? "is-selected" : ""}`}>
            <div className="compare-title-row"><h3>원금균등</h3><button className="text-button no-print" type="button" onClick={() => setMethod("equal-principal")}>이 방식 선택</button></div>
            <dl className="compare-values"><div><dt>첫 달 상환액</dt><dd>{won.format(equalPrincipal.monthlyFirstPayment)}원</dd></div><div><dt>총이자</dt><dd>{won.format(equalPrincipal.totalInterest)}원</dd></div></dl>
            <div className="metric"><div className="metric-label"><span>총이자 규모</span><strong>{Math.round(equalPrincipal.totalInterest / comparisonMaxInterest * 100)}%</strong></div><div className="metric-track"><span style={{ width: `${equalPrincipal.totalInterest / comparisonMaxInterest * 100}%` }} /></div></div>
            <div className="metric"><div className="metric-label"><span>첫 달 부담</span><strong>{Math.round(equalPrincipal.monthlyFirstPayment / comparisonMaxFirstPayment * 100)}%</strong></div><div className="metric-track"><span style={{ width: `${equalPrincipal.monthlyFirstPayment / comparisonMaxFirstPayment * 100}%` }} /></div></div>
            <p>초기 상환액은 더 크지만 원금이 빠르게 줄어 총이자가 적어질 수 있습니다.</p>
          </article>
        </div>
        <div className="notice comparison-note">비율 막대는 두 방식 사이의 상대적 크기를 보여주는 시각화입니다. 낮다고 항상 더 좋은 조건이라는 뜻은 아니며, 월 부담과 총비용을 함께 판단하세요.</div>
      </section>

      <section className="panel full-width repayment-plan">
        <div className="section-heading-row"><div><span className="category-label">STEP 4 · 무료 결과물</span><h2>{methodLabel[method]} 월별 상환계획표</h2></div><span className="print-only print-meta">대출 {won.format(principal)}원 · 연 {annualRate}% · {months}개월</span></div>
        <p className="section-intro no-print">화면에는 초기 24개월을 먼저 보여드립니다. CSV에는 전체 기간이 포함되며, 인쇄/PDF에서는 전체 상환계획표를 출력합니다.</p>
        <div className="table-wrap screen-schedule"><table><thead><tr><th>회차</th><th>상환액</th><th>원금</th><th>이자</th><th>남은 원금</th></tr></thead><tbody>{result.schedule.slice(0, 24).map((row) => (<tr key={row.month}><td>{row.month}개월</td><td>{won.format(row.payment)}원</td><td>{won.format(row.principal)}원</td><td>{won.format(row.interest)}원</td><td>{won.format(row.balance)}원</td></tr>))}</tbody></table></div>
        <div className="table-wrap print-only print-schedule"><table><thead><tr><th>회차</th><th>상환액</th><th>원금</th><th>이자</th><th>남은 원금</th></tr></thead><tbody>{result.schedule.map((row) => (<tr key={row.month}><td>{row.month}</td><td>{won.format(row.payment)}</td><td>{won.format(row.principal)}</td><td>{won.format(row.interest)}</td><td>{won.format(row.balance)}</td></tr>))}</tbody></table></div>
      </section>
    </div>
  );
}
