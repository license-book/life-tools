const UNITS = [
  { value: 1_000_000_000_000, label: "조" },
  { value: 100_000_000, label: "억" },
  { value: 10_000, label: "만" },
] as const;

export function formatKoreanMoneyCompact(value: number): string {
  if (!Number.isFinite(value)) return "0원";

  const rounded = Math.max(0, Math.round(value));
  if (rounded === 0) return "0원";

  let rest = rounded;
  const parts: string[] = [];

  for (const unit of UNITS) {
    if (rest >= unit.value) {
      const amount = Math.floor(rest / unit.value);
      parts.push(`${amount.toLocaleString("ko-KR")}${unit.label}`);
      rest %= unit.value;
    }
  }

  if (rest > 0) {
    parts.push(`${rest.toLocaleString("ko-KR")}원`);
  } else if (parts.length > 0) {
    const last = parts[parts.length - 1];
    if (!last.endsWith("원")) parts[parts.length - 1] = `${last}원`;
  }

  return parts.join(" ");
}

export function formatWon(value: number): string {
  const safe = Number.isFinite(value) ? Math.round(value) : 0;
  return `${safe.toLocaleString("ko-KR")}원`;
}
