import fs from "node:fs";

const file = "components/tools/LoanCalculator.tsx";
let source = fs.readFileSync(file, "utf8");

const oldCalculate = `  const calculate = () => {\n    if (!isValid) return;\n    setApplied({ principal, annualRate, years, method });\n  };`;

const newCalculate = `  const calculate = () => {\n    const principalInput = document.getElementById("principal") as HTMLInputElement | null;\n    const rateInput = document.getElementById("rate") as HTMLInputElement | null;\n    const yearsInput = document.getElementById("years") as HTMLInputElement | null;\n    const methodInput = document.getElementById("method") as HTMLSelectElement | null;\n\n    const nextPrincipal = Number(principalInput?.value ?? principal);\n    const nextAnnualRate = Number(rateInput?.value ?? annualRate);\n    const nextYears = Number(yearsInput?.value ?? years);\n    const nextMethod = (methodInput?.value ?? method) as RepaymentMethod;\n\n    if (!(nextPrincipal > 0) || nextAnnualRate < 0 || !(nextYears > 0)) return;\n\n    setPrincipal(nextPrincipal);\n    setAnnualRate(nextAnnualRate);\n    setYears(nextYears);\n    setMethod(nextMethod);\n    setApplied({\n      principal: nextPrincipal,\n      annualRate: nextAnnualRate,\n      years: nextYears,\n      method: nextMethod,\n    });\n  };`;

if (!source.includes(oldCalculate)) {
  throw new Error("Loan calculate handler pattern not found");
}
source = source.replace(oldCalculate, newCalculate);

const oldStats = `<div className="stat"><small>대출기간</small><strong>{months}개월</strong></div>\n          <div className="stat"><small>상환방식</small><strong>{methodLabel[applied.method]}</strong></div>`;
const newStats = `<div className="stat"><small>대출기간</small><strong>{months}개월</strong></div>\n          <div className="stat"><small>적용 이자율</small><strong>연 {applied.annualRate}%</strong></div>\n          <div className="stat"><small>상환방식</small><strong>{methodLabel[applied.method]}</strong></div>`;
if (!source.includes(oldStats)) {
  throw new Error("Loan result stats pattern not found");
}
source = source.replace(oldStats, newStats);

fs.writeFileSync(file, source);
console.log("Patched LoanCalculator to submit exact visible form values and show applied rate.");
