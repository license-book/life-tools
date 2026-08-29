import fs from "node:fs";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const manifestPath = ".next/prerender-manifest.json";
if (!fs.existsSync(manifestPath)) throw new Error(".next/prerender-manifest.json not found. Run npm run build first.");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const routes = Object.keys(manifest.routes || {})
  .filter((route) => route.startsWith("/tools/") && !route.includes("["))
  .sort();

const normalize = (text) => (text || "").replace(/\s+/g, " ").trim();
const isActionButton = (text) => /계산|변환|확인|실행/.test(text) && !/초기화|인쇄|PDF|CSV|저장|선택/.test(text);

async function resultText(page) {
  return normalize(await page.locator(".tool-layout").evaluate((root) => {
    const children = Array.from(root.children);
    return children.slice(1).map((el) => el.textContent || "").join(" ");
  }));
}

async function mutateInput(page) {
  const firstPanel = page.locator(".tool-layout").locator(":scope > *").first();
  const numbers = firstPanel.locator('input[type="number"]:not([disabled])');
  const numberCount = await numbers.count();
  for (let i = 0; i < Math.min(numberCount, 4); i += 1) {
    const input = numbers.nth(i);
    if (!(await input.isVisible())) continue;
    const raw = await input.inputValue();
    const current = Number(raw || 0);
    const min = Number(await input.getAttribute("min"));
    const maxRaw = await input.getAttribute("max");
    const max = maxRaw === null ? Infinity : Number(maxRaw);
    let next;
    if (!Number.isFinite(current) || current === 0) next = Number.isFinite(min) ? Math.max(min + 7, 7) : 7;
    else next = current > 1 ? current * 1.67 + 3 : current + 2.5;
    if (Number.isFinite(max) && next > max) next = Math.max(Number.isFinite(min) ? min : 0, current * 0.43);
    if (Number.isFinite(min) && next < min) next = min + 1;
    if (next === current) next = current + 1;
    await input.fill(String(next));
    await input.blur();
    return { kind: "number", index: i, before: raw, after: String(next) };
  }

  const dates = firstPanel.locator('input[type="date"]:not([disabled])');
  if (await dates.count()) {
    const input = dates.first();
    if (await input.isVisible()) {
      const raw = await input.inputValue();
      const d = raw ? new Date(`${raw}T00:00:00`) : new Date();
      d.setDate(d.getDate() + 17);
      const next = d.toISOString().slice(0, 10);
      await input.fill(next);
      await input.blur();
      return { kind: "date", index: 0, before: raw, after: next };
    }
  }

  const selects = firstPanel.locator("select:not([disabled])");
  const selectCount = await selects.count();
  for (let i = 0; i < selectCount; i += 1) {
    const select = selects.nth(i);
    if (!(await select.isVisible())) continue;
    const options = await select.locator("option").evaluateAll((nodes) => nodes.map((n) => n.value));
    const current = await select.inputValue();
    const next = options.find((v) => v !== current);
    if (next !== undefined) {
      await select.selectOption(next);
      return { kind: "select", index: i, before: current, after: next };
    }
  }
  return null;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await context.newPage();
const results = [];

for (const route of routes) {
  try {
    const response = await page.goto(baseUrl + route, { waitUntil: "domcontentloaded", timeout: 20000 });
    if (!response || response.status() >= 400) {
      results.push({ route, status: "FAIL", reason: `HTTP ${response?.status() ?? "no response"}` });
      continue;
    }
    const layout = page.locator(".tool-layout");
    if (!(await layout.count())) {
      results.push({ route, status: "SKIP", reason: "no .tool-layout" });
      continue;
    }
    await page.waitForTimeout(80);
    const firstPanel = layout.locator(":scope > *").first();
    const buttons = firstPanel.locator("button:not([disabled])");
    let action = null;
    for (let i = 0; i < await buttons.count(); i += 1) {
      const text = normalize(await buttons.nth(i).innerText());
      if (isActionButton(text)) { action = buttons.nth(i); break; }
    }
    if (!action) {
      results.push({ route, status: "FAIL", reason: "execution button missing" });
      continue;
    }

    const before = await resultText(page);
    const mutation = await mutateInput(page);
    if (!mutation) {
      results.push({ route, status: "SKIP", reason: "no mutable input", button: normalize(await action.innerText()) });
      continue;
    }
    await page.waitForTimeout(80);
    const beforeClick = await resultText(page);
    if (beforeClick !== before) {
      results.push({ route, status: "FAIL", reason: "result changed before execution click", mutation });
      continue;
    }

    await action.click();
    await page.waitForTimeout(120);
    const after = await resultText(page);
    if (after === before) {
      results.push({ route, status: "FAIL", reason: "result did not change after execution click", mutation });
      continue;
    }

    results.push({ route, status: "PASS", mutation, button: normalize(await action.innerText()) });
  } catch (error) {
    results.push({ route, status: "FAIL", reason: error instanceof Error ? error.message : String(error) });
  }
}

await browser.close();

const counts = results.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});
const report = { generatedAt: new Date().toISOString(), totalRoutes: routes.length, counts, results };
fs.writeFileSync("calculator-execution-audit.json", JSON.stringify(report, null, 2));

console.log(`Calculator execution audit: ${routes.length} routes`);
console.log(`PASS ${counts.PASS || 0} / FAIL ${counts.FAIL || 0} / SKIP ${counts.SKIP || 0}`);
for (const row of results.filter((r) => r.status !== "PASS")) console.log(`${row.status} ${row.route}: ${row.reason}`);

if (counts.FAIL) process.exit(1);
