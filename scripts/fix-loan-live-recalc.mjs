import fs from "node:fs";
const path = "components/tools/LoanCalculator.tsx";
let s = fs.readFileSync(path, "utf8");
const oldBlock = `  const equalPayment = useMemo(\n    () => calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: \"equal-payment\" }),\n    [applied.principal, applied.annualRate, months],\n  );\n  const equalPrincipal = useMemo(\n    () => calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: \"equal-principal\" }),\n    [applied.principal, applied.annualRate, months],\n  );`;
const newBlock = `  // Recompute from the applied snapshot on every render. This avoids any stale memoized\n  // payment when the user changes only the interest rate and then presses Calculate.\n  const equalPayment = calculateLoan({\n    principal: applied.principal,\n    annualRate: applied.annualRate,\n    months,\n    method: \"equal-payment\",\n  });\n  const equalPrincipal = calculateLoan({\n    principal: applied.principal,\n    annualRate: applied.annualRate,\n    months,\n    method: \"equal-principal\",\n  });`;
if (!s.includes(oldBlock)) throw new Error("Expected memoized loan calculation block not found");
s = s.replace(oldBlock, newBlock);
fs.writeFileSync(path, s);
console.log("Removed stale memoization from loan payment calculations.");
