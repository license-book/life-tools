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

// Some inputs are capped, rounded, or inactive until another field is non-zero.
// Use meaningful values that are guaranteed to exercise each calculation branch.
const specialNumericValues = new Map([
  ["/tools/cashback-price:1", "1"],
  ["/tools/wallpaper-quantity:2", "100"],
  ["/tools/weekly-holiday-pay:1", "20"],
  ["/tools/weekly-pay:4", "2.5"],
]);

async function resultText(page) {
  return normalize(await page.locator(".tool-layout").evaluate((root) => {
    const children = Array.from(root.children);
    return children.slice(1).map((el) => el.textContent || "").join(" ");
  }));
}

async function getAction(page) {
  const firstPanel = page.locator(".tool-layout").locator(":scope > *").first();
  const buttons = firstPanel.locator("button:not([disabled])");
  for (let i = 0; i < await buttons.count(); i += 1) {
    const text = normalize(await buttons.nth(i).innerText());
    if (isActionButton(text)) return buttons.nth(i);
  }
  return null;
}

function nextNumericValue(raw, minRaw, maxRaw) {
  const current = Number(raw || 0);
  const min = minRaw === null ? -Infinity : Number(minRaw);
  const max = maxRaw === null ? Infinity : Number(maxRaw);
  let next = !Number.isFinite(current) || current === 0 ? 7 : current * 1.73 + 3.7;
  if (Number.isFinite(max) && next > max) next = current > min ? Math.max(min, current * 0.41) : Math.min(max, current + 1);
  if (Number.isFinite(min) && next < min) next = min + Math.max(1, Math.abs(current - min) * 0.5);
  if (next === current) next = current + (Number.isFinite(max) && current + 1 > max ? -1 : 1);
  return String(next);
}

async function testOneMutation(page, route, mutation) {
  const response = await page.goto(baseUrl + route, { waitUntil: "domcontentloaded", timeout: 20000 });
  if (!response || response.status() >= 400) return { status: "FAIL", reason: `HTTP ${response?.status() ?? "no response"}`, mutation };
  const layout = page.locator(".tool-layout");
  if (!(await layout.count())) return { status: "SKIP", reason: "no .tool-layout", mutation };
  await page.waitForTimeout(60);
  let action = await getAction(page);
  if (!action) return { status: "FAIL", reason: "execution button missing", mutation };
  const firstPanel = layout.locator(":scope > *").first();
  let before = await resultText(page);

  // Weekly-pay multiplier has no mathematical effect while extra-hours is zero.
  // Activate extra-hours first, apply it, then independently verify the multiplier.
  if (route === "/tools/weekly-pay" && mutation.kind === "number" && mutation.index === 4) {
    const extraHours = firstPanel.locator('input[type="number"]:not([disabled])').nth(3);
    await extraHours.fill("5");
    await extraHours.blur();
    action = await getAction(page);
    await action.click();
    await page.waitForTimeout(120);
    before = await resultText(page);
  }

  if (mutation.kind === "number") {
    const input = firstPanel.locator('input[type="number"]:not([disabled])').nth(mutation.index);
    if (!(await input.count()) || !(await input.isVisible())) return { status: "SKIP", reason: "number input unavailable", mutation };
    const raw = await input.inputValue();
    const special = specialNumericValues.get(`${route}:${mutation.index}`);
    const next = special ?? nextNumericValue(raw, await input.getAttribute("min"), await input.getAttribute("max"));
    await input.fill(next);
    await input.blur();
    mutation = { ...mutation, before: raw, after: next };
  } else if (mutation.kind === "date") {
    const input = firstPanel.locator('input[type="date"]:not([disabled])').nth(mutation.index);
    if (!(await input.count()) || !(await input.isVisible())) return { status: "SKIP", reason: "date input unavailable", mutation };
    const raw = await input.inputValue();
    const d = raw ? new Date(`${raw}T00:00:00`) : new Date();
    d.setDate(d.getDate() + 17 + mutation.index);
    const next = d.toISOString().slice(0, 10);
    await input.fill(next);
    await input.blur();
    mutation = { ...mutation, before: raw, after: next };
  } else if (mutation.kind === "select") {
    const select = firstPanel.locator("select:not([disabled])").nth(mutation.index);
    if (!(await select.count()) || !(await select.isVisible())) return { status: "SKIP", reason: "select unavailable", mutation };
    const options = await select.locator("option").evaluateAll((nodes) => nodes.map((n) => n.value));
    const current = await select.inputValue();
    const next = options.find((v) => v !== current);
    if (next === undefined) return { status: "SKIP", reason: "no alternate select option", mutation };
    await select.selectOption(next);
    mutation = { ...mutation, before: current, after: next };
  }

  await page.waitForTimeout(60);
  const beforeClick = await resultText(page);
  if (beforeClick !== before) return { status: "FAIL", reason: "result changed before execution click", mutation };
  const freshAction = await getAction(page);
  if (!freshAction) return { status: "FAIL", reason: "execution button became unavailable", mutation };
  await freshAction.click();
  await page.waitForTimeout(120);
  const after = await resultText(page);
  if (after === before) return { status: "FAIL", reason: "result did not change after execution click", mutation };
  return { status: "PASS", mutation, button: normalize(await freshAction.innerText()) };
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
    const firstPanel = layout.locator(":scope > *").first();
    const numberCount = await firstPanel.locator('input[type="number"]:not([disabled])').count();
    const dateCount = await firstPanel.locator('input[type="date"]:not([disabled])').count();
    const selectCount = await firstPanel.locator("select:not([disabled])").count();
    const mutations = [
      ...Array.from({ length: numberCount }, (_, index) => ({ kind: "number", index })),
      ...Array.from({ length: dateCount }, (_, index) => ({ kind: "date", index })),
      ...Array.from({ length: selectCount }, (_, index) => ({ kind: "select", index })),
    ];
    if (!mutations.length) {
      results.push({ route, status: "SKIP", reason: "no mutable input" });
      continue;
    }
    for (const mutation of mutations) {
      const outcome = await testOneMutation(page, route, mutation);
      results.push({ route, ...outcome });
    }
  } catch (error) {
    results.push({ route, status: "FAIL", reason: error instanceof Error ? error.message : String(error) });
  }
}

// Dedicated regression: 3억원 / 30년 / 원리금균등에서 금리 4.2% -> 5.2% 변경 시 첫 달 상환액과 적용 금리가 반드시 바뀌어야 함.
try {
  await page.goto(baseUrl + "/tools/loan-calculator", { waitUntil: "domcontentloaded", timeout: 20000 });
  const rate = page.locator("#rate");
  const button = page.getByRole("button", { name: "대출 상환액 계산하기" });
  const payment = page.locator('[data-testid="loan-first-payment"]');
  const appliedRate = page.locator('[data-testid="loan-applied-rate"]');
  const before = normalize(await payment.innerText());
  await rate.fill("5.2");
  await rate.blur();
  const beforeClick = normalize(await payment.innerText());
  if (beforeClick !== before) throw new Error("loan result changed before click");
  await button.click();
  await page.waitForTimeout(120);
  const after = normalize(await payment.innerText());
  const applied = normalize(await appliedRate.innerText());
  if (after === before) throw new Error(`loan payment unchanged: ${before}`);
  if (!applied.includes("5.2")) throw new Error(`loan applied rate mismatch: ${applied}`);
  if (!after.includes("1,647,333")) throw new Error(`loan 5.2% expected 1,647,333원, got ${after}`);
  results.push({ route: "/tools/loan-calculator", status: "PASS", mutation: { kind: "loan-rate-regression", before: "4.2", after: "5.2" }, observed: after });
} catch (error) {
  results.push({ route: "/tools/loan-calculator", status: "FAIL", reason: error instanceof Error ? error.message : String(error), mutation: { kind: "loan-rate-regression" } });
}

await browser.close();

const counts = results.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});
const report = { generatedAt: new Date().toISOString(), totalRoutes: routes.length, totalChecks: results.length, counts, results };
fs.writeFileSync("calculator-execution-audit.json", JSON.stringify(report, null, 2));
console.log(`Calculator execution audit: ${routes.length} routes / ${results.length} checks`);
console.log(`PASS ${counts.PASS || 0} / FAIL ${counts.FAIL || 0} / SKIP ${counts.SKIP || 0}`);
for (const row of results.filter((r) => r.status !== "PASS")) console.log(`${row.status} ${row.route}: ${row.reason} ${JSON.stringify(row.mutation || {})}`);
if (counts.FAIL) process.exit(1);
