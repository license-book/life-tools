"use client";

export default function ToolResetButton() {
  return (
    <button
      type="button"
      className="secondary"
      onClick={() => window.location.reload()}
      aria-label="계산기 입력값 초기화"
    >
      초기화
    </button>
  );
}
