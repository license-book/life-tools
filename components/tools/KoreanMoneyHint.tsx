"use client";

import { formatKoreanMoneyCompact } from "@/lib/tools/koreanMoney";

export default function KoreanMoneyHint({ value, label = "한글 금액" }: { value: number; label?: string }) {
  return (
    <small className="field-help" aria-live="polite">
      {label}: {formatKoreanMoneyCompact(value)}
    </small>
  );
}
