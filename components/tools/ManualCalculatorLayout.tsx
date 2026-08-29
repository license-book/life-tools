"use client";

import { Fragment, useCallback, useState, type ReactNode } from "react";

type Props = {
  inputs: ReactNode;
  result: ReactNode;
  buttonLabel?: string;
};

export default function ManualCalculatorLayout({
  inputs,
  result,
  buttonLabel = "계산하기",
}: Props) {
  const [appliedResult, setAppliedResult] = useState<ReactNode>(result);
  const [calculatedAt, setCalculatedAt] = useState(0);

  const runCalculation = useCallback(() => {
    setAppliedResult(<Fragment key={`calculated-${Date.now()}`}>{result}</Fragment>);
    setCalculatedAt((value) => value + 1);
  }, [result]);

  return (
    <div className="tool-layout" data-calculation-run={calculatedAt}>
      <section className="panel no-print">
        {inputs}
        <div className="action-row" style={{ marginTop: 18 }}>
          <button className="primary" type="button" onClick={runCalculation}>
            {buttonLabel}
          </button>
        </div>
        <p className="resource-note" style={{ marginTop: 10 }}>
          조건을 입력한 뒤 계산하기 버튼을 누르면 오른쪽 결과가 새 입력값으로 갱신됩니다.
        </p>
      </section>
      {appliedResult}
    </div>
  );
}
