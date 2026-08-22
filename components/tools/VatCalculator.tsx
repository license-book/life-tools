"use client";

import { useMemo, useState } from "react";

type Mode = "supply" | "total";

function formatWon(value: number) {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export default function VatCalculator() {
  const [mode, setMode] = useState<Mode>("supply");
  const [amount, setAmount] = useState("100000");

  const numericAmount = Math.max(0, Number(amount.replace(/,/g, "")) || 0);

  const result = useMemo(() => {
    if (mode === "supply") {
      const supply = numericAmount;
      const vat = Math.round(supply * 0.1);
      return { supply, vat, total: supply + vat };
    }

    const total = numericAmount;
    const supply = Math.round(total / 1.1);
    const vat = total - supply;
    return { supply, vat, total };
  }, [mode, numericAmount]);

  const reset = () => {
    setMode("supply");
    setAmount("100000");
  };

  return (
    <div className="calculator-shell">
      <div className="calculator-panel">
        <div className="form-row">
          <label className="form-label">계산 방식</label>
          <div className="segmented-control" role="group" aria-label="부가세 계산 방식">
            <button
              type="button"
              className={mode === "supply" ? "active" : ""}
              onClick={() => setMode("supply")}
            >
              공급가액에서 계산
            </button>
            <button
              type="button"
              className={mode === "total" ? "active" : ""}
              onClick={() => setMode("total")}
            >
              합계금액에서 역산
            </button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="vat-amount">
            {mode === "supply" ? "공급가액" : "부가세 포함 합계금액"}
          </label>
          <div className="input-with-unit">
            <input
              id="vat-amount"
              inputMode="numeric"
              value={Number(amount.replace(/,/g, "") || 0).toLocaleString("ko-KR")}
              onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ""))}
              aria-describedby="vat-help"
            />
            <span>원</span>
          </div>
          <p id="vat-help" className="helper-text">
            일반과세자의 표준 부가가치세율 10%를 기준으로 계산합니다.
          </p>
        </div>

        <button type="button" className="secondary-button" onClick={reset}>초기화</button>
      </div>

      <div className="result-panel" aria-live="polite">
        <div className="result-summary">
          <span>공급가액</span>
          <strong>{formatWon(result.supply)}</strong>
        </div>
        <div className="result-summary">
          <span>부가가치세</span>
          <strong>{formatWon(result.vat)}</strong>
        </div>
        <div className="result-summary result-primary">
          <span>합계금액</span>
          <strong>{formatWon(result.total)}</strong>
        </div>
      </div>
    </div>
  );
}
