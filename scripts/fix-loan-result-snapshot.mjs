import fs from "node:fs";
const path = "components/tools/LoanCalculator.tsx";
let s = fs.readFileSync(path, "utf8");

const initialMarker = `const initialForm: LoanFormState = {\n  principal: 300000000,\n  annualRate: 4.2,\n  years: 30,\n  method: \"equal-payment\",\n};`;
const initialReplacement = `${initialMarker}\n\nconst initialMonths = initialForm.years * 12;\nconst initialEqualPayment = calculateLoan({ principal: initialForm.principal, annualRate: initialForm.annualRate, months: initialMonths, method: \"equal-payment\" });\nconst initialEqualPrincipal = calculateLoan({ principal: initialForm.principal, annualRate: initialForm.annualRate, months: initialMonths, method: \"equal-principal\" });`;
if (!s.includes(initialMarker)) throw new Error("Initial form marker not found");
s = s.replace(initialMarker, initialReplacement);

const stateMarker = `  const [draft, setDraft] = useState<LoanFormState>(initialForm);\n  const [applied, setApplied] = useState<LoanFormState>(initialForm);`;
const stateReplacement = `${stateMarker}\n  const [calculated, setCalculated] = useState({ equalPayment: initialEqualPayment, equalPrincipal: initialEqualPrincipal });`;
if (!s.includes(stateMarker)) throw new Error("State marker not found");
s = s.replace(stateMarker, stateReplacement);

const derivedStart = `  const months = Math.max(1, Math.round(applied.years * 12));\n  // Recompute from the applied snapshot on every render. This avoids any stale memoized\n  // payment when the user changes only the interest rate and then presses Calculate.\n  const equalPayment = calculateLoan({\n    principal: applied.principal,\n    annualRate: applied.annualRate,\n    months,\n    method: \"equal-payment\",\n  });\n  const equalPrincipal = calculateLoan({\n    principal: applied.principal,\n    annualRate: applied.annualRate,\n    months,\n    method: \"equal-principal\",\n  });`;
const derivedReplacement = `  const months = Math.max(1, Math.round(applied.years * 12));\n  const { equalPayment, equalPrincipal } = calculated;`;
if (!s.includes(derivedStart)) throw new Error("Derived calculation block not found");
s = s.replace(derivedStart, derivedReplacement);

const calcMarker = `  const calculate = () => {\n    const next: LoanFormState = {\n      principal: Number(principalRef.current?.value ?? draft.principal),\n      annualRate: Number(rateRef.current?.value ?? draft.annualRate),\n      years: Number(yearsRef.current?.value ?? draft.years),\n      method: (methodRef.current?.value ?? draft.method) as RepaymentMethod,\n    };\n    if (!(next.principal > 0) || next.annualRate < 0 || !(next.years > 0)) return;\n    setDraft(next);\n    setApplied(next);\n  };`;
const calcReplacement = `  const calculate = () => {\n    const next: LoanFormState = {\n      principal: Number(principalRef.current?.value ?? draft.principal),\n      annualRate: Number(rateRef.current?.value ?? draft.annualRate),\n      years: Number(yearsRef.current?.value ?? draft.years),\n      method: (methodRef.current?.value ?? draft.method) as RepaymentMethod,\n    };\n    if (!(next.principal > 0) || next.annualRate < 0 || !(next.years > 0)) return;\n    const nextMonths = Math.max(1, Math.round(next.years * 12));\n    const nextEqualPayment = calculateLoan({ principal: next.principal, annualRate: next.annualRate, months: nextMonths, method: \"equal-payment\" });\n    const nextEqualPrincipal = calculateLoan({ principal: next.principal, annualRate: next.annualRate, months: nextMonths, method: \"equal-principal\" });\n    setCalculated({ equalPayment: nextEqualPayment, equalPrincipal: nextEqualPrincipal });\n    setDraft(next);\n    setApplied(next);\n  };`;
if (!s.includes(calcMarker)) throw new Error("Calculate handler marker not found");
s = s.replace(calcMarker, calcReplacement);

fs.writeFileSync(path, s);
console.log("Loan calculator now stores the exact calculation result snapshot produced at button click.");
