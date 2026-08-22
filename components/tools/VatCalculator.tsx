"use client";

import { useMemo, useState } from "react";

type Mode = "supply" | "total";

function formatWon(value: number) {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export default function VatCalculator() {
  const [mode, setMode] = useState<Mode>("supply");
  const [amount, setAmount] = useState(100000);

  const result = useMemo(() => {
    const safeAmount = Math.max(0, amount || 0);

    if (mode === "supply") {
      const supply = safeAmount;
      const vat = Math.round(supply * 0.1);
      return { supply, vat, total: supply + vat };
    }

    const total = safeAmount;
    const supply = Math.round(total / 1.1);
    const vat = total - supply;
    return { supply, vat, total };
  }, [mode, amount]);

  const reset = () => {
    setMode("supply");
    setAmount(100000);
  };

  return (
    <div className="tool-layout">
      <section className="panel no-print" aria-labelledby="vat-input-title">
        <span className="category-label">STEP 1</span>
        <h2 id="vat-input-title">계산 조건 입력</h2>

        <div className="field">
          <label htmlFor="vat-mode">계산 방식</label>
          <select id="vat-mode" value={mode} onChange={(event) => setMode(event.target.value as Mode)}>
            <option value="supply">공급가액에서 부가세 계산</option>
            <option value="total">부가세 포함 합계금액에서 역산</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="vat-amount">{mode === "supply" ? "공급가액" : "부가세 포함 합계금액"}</label>
          <input
            id="vat-amount"
            type="number"
            min="0"
            step="1000"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
          <small className="field-help">예: 10만원 → 100000</small>
        </div>

        <div className="notice">일반적인 국내 과세 거래의 표준 부가가치세율 10%를 기준으로 계산합니다.</div>
        <div className="action-row">
          <button type="button" className="secondary" onClick={reset}>초기화</button>
          <button type="button" className="primary" onClick={() => window.print()}>인쇄 · PDF 저장</button>
        </div>
      </section>

      <section className="panel print-summary" aria-live="polite">
        <span className="category-label">STEP 2 · 계산 결과</span>
        <div className="result-main">합계 {formatWon(result.total)}</div>
        <div className="stats">
          <div className="stat"><small>공급가액</small><strong>{formatWon(result.supply)}</strong></div>
          <div className="stat"><small>부가가치세</small><strong>{formatWon(result.vat)}</strong></div>
          <div className="stat"><small>합계금액</small><strong>{formatWon(result.total)}</strong></div>
          <div className="stat"><small>적용 세율</small><strong>10%</strong></div>
        </div>
        <p className="resource-note no-print">회원가입이나 이메일 입력 없이 바로 계산하고 브라우저에서 PDF로 저장할 수 있습니다.</p>
      </section>

      <section className="panel full-width">
        <span className="category-label">STEP 3 · 결과 해석</span>
        <h2>세전 금액과 세액을 한눈에 확인하세요</h2>
        <div className="compare-grid">
          <article className="compare-card">
            <h3>공급가액</h3>
            <div className="result-main">{formatWon(result.supply)}</div>
            <p>부가가치세를 제외한 재화·용역의 거래금액입니다.</p>
          </article>
          <article className="compare-card">
            <h3>부가가치세</h3>
            <div className="result-main">{formatWon(result.vat)}</div>
            <p>표준세율 10%를 기준으로 계산한 세액입니다.</p>
          </article>
        </div>
        <div className="notice comparison-note">합계금액에서 역산하는 경우 반올림 방식에 따라 실제 세금계산서 금액과 1원 정도 차이가 생길 수 있습니다.</div>
      </section>
    </div>
  );
}
