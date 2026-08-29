import fs from 'node:fs';
const path='components/tools/LoanCalculator.tsx';
let s=fs.readFileSync(path,'utf8');
const from='<div className="result-main" data-testid="loan-first-payment">첫 달 {won.format(result.monthlyFirstPayment)}원</div>';
const to='<div key={`${applied.principal}-${applied.annualRate}-${applied.years}-${applied.method}`} className="result-main" data-testid="loan-first-payment">첫 달 {won.format(result.monthlyFirstPayment)}원</div>';
if(!s.includes(from)) throw new Error('loan primary result line not found');
s=s.replace(from,to);
fs.writeFileSync(path,s);
console.log('Keyed loan primary result to applied calculation inputs.');
