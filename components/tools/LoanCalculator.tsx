"use client";

import { useMemo, useState } from "react";
import { calculateLoan, type RepaymentMethod } from "@/lib/calculator/loan";

const won = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(300000000);
  const [annualRate, setAnnualRate] = useState(4.2);
  const [years, setYears] = useState(30);
  const [method, setMethod] = useState<RepaymentMethod>("equal-payment");

  const result = useMemo(() => calculateLoan({
    principal,
    annualRate,
    months: years * 12,
    method,
  }), [principal, annualRate, years, method]);

  const exportCsv = () => {
    const header = "회차,상환액,원금,이자,잔액\n";
    const rows = result.schedule.map((row) => [row.month, row.payment, row.principal, row.interest, row.balance].join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "loan-repayment-plan.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-layout">
      <section className="panel" aria-labelledby="loan-input-title">
        <h2 id="loan-input-title">대출 조건 입력</h2>
        <div className="field">
          <label htmlFor="principal">대출금액</label>
          <input id="principal" type="number" min="0" step="1000000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="rate">연 이자율 (%)</label>
          <input id="rate" type="number" min="0" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="years">대출기간 (년)</label>
          <input id="years" type="number" min="1" max="50" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="method">상환방식</label>
          <select id="method" value={method} onChange={(e) => setMethod(e.target.value as RepaymentMethod)}>
            <option value="equal-payment">원리금균등상환</option>
            <option value="equal-principal">원금균등상환</option>
          </select>
        </div>
        <div className="notice">계산 결과는 입력한 고정금리를 기준으로 한 참고값이며 실제 금융기관의 일수 계산, 중도상환, 우대금리 등에 따라 달라질 수 있습니다.</div>
      </section>

      <section className="panel" aria-live="polite">
        <span className="category-label">계산 결과</span>
        <div className="result-main">첫 달 {won.format(result.monthlyFirstPayment)}원</div>
        <div className="stats">
          <div className="stat"><small>총 상환액</small><strong>{won.format(result.totalPayment)}원</strong></div>
          <div className="stat"><small>총 이자</small><strong>{won.format(result.totalInterest)}원</strong></div>
          <div className="stat"><small>대출기간</small><strong>{years * 12}개월</strong></div>
          <div className="stat"><small>상환방식</small><strong>{method === "equal-payment" ? "원리금균등" : "원금균등"}</strong></div>
        </div>
        <button className="primary" type="button" onClick={exportCsv} style={{ marginTop: 18 }}>무료 상환계획표 CSV 저장</button>
      </section>

      <section className="panel" style={{ gridColumn: "1 / -1" }}>
        <h2>월별 상환계획표</h2>
        <p className="section-intro">초기 24개월을 먼저 보여드립니다. CSV에는 전체 기간이 포함됩니다.</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>회차</th><th>상환액</th><th>원금</th><th>이자</th><th>남은 원금</th></tr></thead>
            <tbody>
              {result.schedule.slice(0, 24).map((row) => (
                <tr key={row.month}>
                  <td>{row.month}개월</td>
                  <td>{won.format(row.payment)}원</td>
                  <td>{won.format(row.principal)}원</td>
                  <td>{won.format(row.interest)}원</td>
                  <td>{won.format(row.balance)}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
