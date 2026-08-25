"use client";

export default function ToolResetButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      aria-label="계산기 입력값 초기화"
      style={{
        display:"inline-flex",
        alignItems:"center",
        justifyContent:"center",
        gap:8,
        minWidth:148,
        minHeight:48,
        padding:"0 18px",
        border:0,
        borderRadius:13,
        background:"linear-gradient(135deg,#f97316 0%,#fb923c 100%)",
        color:"#fff",
        fontWeight:850,
        fontSize:".92rem",
        boxShadow:"0 8px 20px rgba(249,115,22,.22)",
      }}
    >
      <span aria-hidden="true" style={{fontSize:"1.15rem",lineHeight:1}}>↻</span>
      입력값 초기화
    </button>
  );
}
