"use client";

import { useEffect } from "react";

const printIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8V3h10v5"/><path d="M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/><path d="M17 11h.01"/></svg>`;
const pdfIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M8 16v-5h1.8a1.7 1.7 0 1 1 0 3.4H8"/><path d="M13 16v-5h1.3c1.8 0 2.7.9 2.7 2.5S16.1 16 14.3 16z"/></svg>`;

function styleButton(button: HTMLButtonElement, kind: "print" | "pdf") {
  Object.assign(button.style, {
    minHeight: "48px",
    padding: "0 16px",
    borderRadius: "14px",
    border: kind === "print" ? "1px solid rgba(49,94,251,.3)" : "1px solid rgba(15,159,110,.3)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    fontWeight: "850",
    fontSize: ".9rem",
    letterSpacing: "-.01em",
    boxShadow: "0 8px 20px rgba(31,41,55,.10)",
    color: "#fff",
    cursor: "pointer",
    flex: "1 1 150px",
    background: kind === "print" ? "linear-gradient(135deg,#315efb 0%,#2786f5 100%)" : "linear-gradient(135deg,#0f9f6e 0%,#16a3a5 100%)",
  });
}

async function savePdf(target: HTMLElement, button: HTMLButtonElement) {
  if (button.dataset.saving === "1") return;
  button.dataset.saving = "1";
  const original = button.innerHTML;
  button.innerHTML = `${pdfIcon}<span>PDF 생성 중...</span>`;
  button.style.opacity = ".72";
  button.disabled = true;
  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
    const canvas = await html2canvas(target, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false });
    const pageW = 210, pageH = 297, margin = 10, usableW = pageW - margin * 2;
    const slicePx = Math.max(1, Math.floor((pageH - margin * 2) * canvas.width / usableW));
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    let offset = 0, page = 0;
    while (offset < canvas.height) {
      const h = Math.min(slicePx, canvas.height - offset);
      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = h;
      slice.getContext("2d")?.drawImage(canvas, 0, offset, canvas.width, h, 0, 0, canvas.width, h);
      if (page > 0) pdf.addPage();
      pdf.addImage(slice.toDataURL("image/png"), "PNG", margin, margin, usableW, h * usableW / canvas.width, "FAST");
      offset += h;
      page += 1;
    }
    pdf.save("생활도구-계산결과.pdf");
  } finally {
    button.dataset.saving = "0";
    button.innerHTML = original;
    button.style.opacity = "1";
    button.disabled = false;
  }
}

function upgradeLegacyButtons() {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("button"));
  for (const oldButton of buttons) {
    const label = oldButton.textContent?.replace(/\s+/g, " ").trim() ?? "";
    if (!(label.includes("인쇄") && label.includes("PDF 저장"))) continue;
    if (oldButton.dataset.outputAction === "modern") continue;
    const row = oldButton.closest<HTMLElement>(".action-row") ?? oldButton.parentElement;
    if (!row || row.dataset.outputUpgraded === "1") continue;

    row.dataset.outputUpgraded = "1";
    row.innerHTML = "";
    Object.assign(row.style, { display: "flex", flexWrap: "wrap", gap: "10px", gridTemplateColumns: "none" });

    const printButton = document.createElement("button");
    printButton.type = "button";
    printButton.dataset.outputAction = "modern";
    printButton.setAttribute("aria-label", "계산 결과 인쇄하기");
    printButton.innerHTML = `${printIcon}<span>인쇄하기</span>`;
    styleButton(printButton, "print");
    printButton.addEventListener("click", () => window.print());

    const pdfButton = document.createElement("button");
    pdfButton.type = "button";
    pdfButton.dataset.outputAction = "modern";
    pdfButton.setAttribute("aria-label", "계산 결과 PDF로 저장하기");
    pdfButton.innerHTML = `${pdfIcon}<span>PDF 저장</span>`;
    styleButton(pdfButton, "pdf");
    const target = oldButton.closest<HTMLElement>(".tool-layout") ?? document.querySelector<HTMLElement>(".tool-layout");
    pdfButton.addEventListener("click", () => { if (target) void savePdf(target, pdfButton); });

    row.append(printButton, pdfButton);
  }
}

export default function LegacyOutputActionUpgrade() {
  useEffect(() => {
    upgradeLegacyButtons();
    const observer = new MutationObserver(() => upgradeLegacyButtons());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
