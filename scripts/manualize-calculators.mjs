import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolsDir = path.join(root, "components", "tools");
const skip = new Set([
  "LoanCalculator.tsx",
  "ManualCalculatorLayout.tsx",
  "AllToolsDirectory.tsx",
  "AutoKoreanMoneyHints.tsx",
  "ClearableNumberInputs.tsx",
  "DraftNumberInput.tsx",
  "KoreanMoneyHint.tsx",
  "LegacyOutputActionUpgrade.tsx",
  "PersonalizedResultEngine.tsx",
  "ResultHierarchyEnhancer.tsx",
  "ToolChart.tsx",
  "ToolHeroIcon.tsx",
  "ToolOutputActions.tsx",
  "ToolPageRenderer.tsx",
  "ToolResetButton.tsx",
]);

const importLine = 'import ManualCalculatorLayout from "@/components/tools/ManualCalculatorLayout";';
const changedFiles = [];
const leftovers = [];

function addImport(source) {
  if (source.includes(importLine)) return source;
  const marker = '"use client";';
  if (!source.includes(marker)) return source;
  return source.replace(marker, `${marker}\n${importLine}`);
}

function panelResult(line) {
  if (line.includes("ToolOutputActions")) {
    return '<section className="panel">{result}<ToolOutputActions /></section>';
  }
  if (line.includes("window.print()")) {
    return '<section className="panel">{result}<div className="action-row no-print"><button className="secondary" type="button" onClick={()=>window.print()}>인쇄 · PDF 저장</button></div></section>';
  }
  return '<section className="panel">{result}</section>';
}

for (const name of fs.readdirSync(toolsDir).filter((name) => name.endsWith(".tsx")).sort()) {
  if (skip.has(name)) continue;
  const file = path.join(toolsDir, name);
  const original = fs.readFileSync(file, "utf8");
  if (!original.includes('className="tool-layout"')) continue;

  let source = original;
  let changed = false;
  const lines = source.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.includes('className="tool-layout"')) continue;

    if (line.includes("const Layout=") && line.includes("=>")) {
      const usesInputs = line.includes("{inputs,result}");
      const inputName = usesInputs ? "inputs" : "children";
      const propType = usesInputs ? "inputs:ReactNode,result:ReactNode" : "children:ReactNode,result:ReactNode";
      lines[index] = `const Layout=({${inputName},result}:{${propType}})=><ManualCalculatorLayout inputs={${inputName}} result={${panelResult(line)}}/>;`;
      changed = true;
      continue;
    }

    if (line.includes("function Layout({inputs,result}")) {
      lines[index] = 'function Layout({inputs,result}:{inputs:ReactNode;result:ReactNode}){return <ManualCalculatorLayout inputs={inputs} result={result}/>;}';
      changed = true;
      continue;
    }

    if (line.includes("function L({children,result}")) {
      lines[index] = 'function L({children,result}:{children:ReactNode;result:ReactNode}){return <ManualCalculatorLayout inputs={children} result={result}/>;}';
      changed = true;
      continue;
    }

    const direct = /return <div className="tool-layout"><section className="panel">([\s\S]*?)<\/section><section className="panel">([\s\S]*?)<\/section><\/div>/;
    if (direct.test(line)) {
      lines[index] = line.replace(direct, 'return <ManualCalculatorLayout inputs={<>{$1</>} result={<section className="panel">$2</section>}/>');
      changed = true;
    }
  }

  if (changed) {
    source = addImport(lines.join("\n"));
    fs.writeFileSync(file, source);
    changedFiles.push(name);
  }

  const current = changed ? source : original;
  if (current.includes('className="tool-layout"')) leftovers.push(name);
}

if (leftovers.length) {
  console.error("Unconverted calculator layouts:", leftovers.join(", "));
  process.exit(2);
}

if (!changedFiles.length) {
  console.log("No calculator files required migration.");
} else {
  console.log(`Migrated ${changedFiles.length} calculator component files:`);
  for (const file of changedFiles) console.log(`- ${file}`);
}
