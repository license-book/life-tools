import fs from "node:fs";
const path = "components/tools/LoanCalculator.tsx";
let s = fs.readFileSync(path, "utf8");

const oldState = `  const [draft, setDraft] = useState<LoanFormState>(initialForm);\n  const [applied, setApplied] = useState<LoanFormState>(initialForm);\n  const [calculated, setCalculated] = useState({ equalPayment: initialEqualPayment, equalPrincipal: initialEqualPrincipal });`;
const newState = `  const [draft, setDraft] = useState<LoanFormState>(initialForm);\n  const [calculation, setCalculation] = useState({\n    inputs: initialForm,\n    equalPayment: initialEqualPayment,\n    equalPrincipal: initialEqualPrincipal,\n  });\n  const applied = calculation.inputs;`;
if (!s.includes(oldState)) throw new Error("Old split calculation state not found");
s = s.replace(oldState, newState);

s = s.replace(`  const { equalPayment, equalPrincipal } = calculated;`, `  const { equalPayment, equalPrincipal } = calculation;`);

const oldSet = `    setCalculated({ equalPayment: nextEqualPayment, equalPrincipal: nextEqualPrincipal });\n    setDraft(next);\n    setApplied(next);`;
const newSet = `    setCalculation({ inputs: next, equalPayment: nextEqualPayment, equalPrincipal: nextEqualPrincipal });\n    setDraft(next);`;
if (!s.includes(oldSet)) throw new Error("Old split setter block not found");
s = s.replace(oldSet, newSet);

const oldSelect = `  const selectResultMethod = (nextMethod: RepaymentMethod) => {\n    setDraft((current) => ({ ...current, method: nextMethod }));\n    setApplied((current) => ({ ...current, method: nextMethod }));\n  };`;
const newSelect = `  const selectResultMethod = (nextMethod: RepaymentMethod) => {\n    setDraft((current) => ({ ...current, method: nextMethod }));\n    setCalculation((current) => ({ ...current, inputs: { ...current.inputs, method: nextMethod } }));\n  };`;
if (!s.includes(oldSelect)) throw new Error("Old repayment method selector not found");
s = s.replace(oldSelect, newSelect);

fs.writeFileSync(path, s);
console.log("Loan inputs and computed results now commit atomically in one React state update.");
