#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const QA_DIR = path.join(REPO_ROOT, "reference/priorities/dormant-deferred/app-causal-delay-feedback/browser-qa");
const BASELINE_PATH = path.join(QA_DIR, "stage-0-golden-baseline.json");
const MATRIX_PATH = path.join(QA_DIR, "stage-0-transition-matrix.json");
const DEFAULT_OUTPUT_PATH = path.join(QA_DIR, "stage-0-browser-transition-matrix-result.json");
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 5173;
const BROWSER_CANDIDATES = [
  process.env.CAUSAL_DELAY_BROWSER_PATH,
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "chromium",
  "google-chrome",
].filter(Boolean);

const args = parseArgs(process.argv.slice(2));
const baseline = JSON.parse(await readFile(BASELINE_PATH, "utf8"));
const matrix = JSON.parse(await readFile(MATRIX_PATH, "utf8"));
const outputPath = path.resolve(args.output ?? DEFAULT_OUTPUT_PATH);
const host = args.host ?? DEFAULT_HOST;
const port = args.port ?? DEFAULT_PORT;
const baseUrl = args.baseUrl ?? `http://${host}:${port}`;
const browserPath = args.browser ?? findBrowserPath();

if (!browserPath) {
  throw new Error("No Chromium-family browser found; pass --browser=/path/to/browser.");
}

let serverProcess = null;
let browserProcess = null;
try {
  await ensureDevServer({ baseUrl, host, port });
  const browser = await launchBrowser(browserPath);
  browserProcess = browser.process;
  const cdp = await connectCdp(browser.wsUrl);
  const cases = args.case ? matrix.cases.filter(({ id }) => id === args.case) : matrix.cases;
  if (cases.length === 0) {
    throw new Error(`Unknown Stage 0 case: ${args.case}`);
  }
  const results = [];
  for (const testCase of cases) {
    results.push(await runCase(cdp, testCase, baseline, baseUrl));
    console.log(`passed ${testCase.id}`);
  }
  cdp.close();
  const result = {
    schemaVersion: "cdf-stage-0-browser-transition-matrix-result/v1",
    status: "passed",
    baseline: path.basename(BASELINE_PATH),
    matrix: path.basename(MATRIX_PATH),
    verifiedAt: new Date().toISOString(),
    instrument: "Chromium-family browser via CDP; pointer and keyboard input; read-only DOM assertions",
    claimBoundary: baseline.claimBoundary,
    cases: results,
  };
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`wrote ${path.relative(REPO_ROOT, outputPath)}`);
} finally {
  browserProcess?.kill("SIGTERM");
  serverProcess?.kill("SIGTERM");
}

function parseArgs(argv) {
  const parsed = { baseUrl: null, browser: null, case: null, host: null, output: null, port: null };
  for (const arg of argv) {
    if (arg.startsWith("--base-url=")) parsed.baseUrl = arg.slice(11).replace(/\/$/u, "");
    else if (arg.startsWith("--browser=")) parsed.browser = arg.slice(10);
    else if (arg.startsWith("--case=")) parsed.case = arg.slice(7);
    else if (arg.startsWith("--host=")) parsed.host = arg.slice(7);
    else if (arg.startsWith("--output=")) parsed.output = arg.slice(9);
    else if (arg.startsWith("--port=")) parsed.port = Number.parseInt(arg.slice(7), 10);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function findBrowserPath() {
  return BROWSER_CANDIDATES.find((candidate) =>
    candidate.includes("/") ? existsSync(candidate) : true,
  ) ?? null;
}

async function ensureDevServer({ baseUrl: url, host: serverHost, port: serverPort }) {
  if (await canFetch(`${url}/causal-delay-feedback.html`)) return;
  serverProcess = spawn(process.execPath, ["scripts/dev/start-local-dev.mjs"], {
    cwd: REPO_ROOT,
    env: { ...process.env, HOST: serverHost, PORT: String(serverPort) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  serverProcess.stdout.on("data", (chunk) => process.stdout.write(chunk));
  serverProcess.stderr.on("data", (chunk) => process.stderr.write(chunk));
  await waitFor(() => canFetch(`${url}/causal-delay-feedback.html`), 10000, "local dev server");
}

async function canFetch(url) {
  try { return (await fetch(url, { method: "HEAD" })).ok; } catch { return false; }
}

async function launchBrowser(executable) {
  const profileDir = path.join(REPO_ROOT, ".tmp/causal-delay-feedback-stage0-browser-profile");
  await rm(profileDir, { force: true, recursive: true });
  await mkdir(profileDir, { recursive: true });
  const child = spawn(executable, [
    "--headless=new", "--disable-gpu", "--disable-dev-shm-usage", "--hide-scrollbars",
    "--mute-audio", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`, "about:blank",
  ], { cwd: REPO_ROOT, stdio: ["ignore", "ignore", "pipe"] });
  return { process: child, wsUrl: await waitForDevToolsUrl(child) };
}

function waitForDevToolsUrl(child) {
  return new Promise((resolve, reject) => {
    let stderr = "";
    const timeout = setTimeout(() => reject(new Error(`browser did not expose DevTools endpoint: ${stderr}`)), 15000);
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/u);
      if (match) { clearTimeout(timeout); resolve(match[1]); }
    });
    child.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`browser exited before DevTools was ready: ${code}; ${stderr}`));
    });
  });
}

async function connectCdp(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  let nextId = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`));
    else request.resolve(message.result ?? {});
  });
  return {
    close: () => socket.close(),
    send(method, params = {}, sessionId = null) {
      const id = nextId++;
      const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify(payload));
      });
    },
  };
}

async function runCase(cdp, testCase, expected, baseUrlValue) {
  const viewport = expected.viewports[testCase.viewport];
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send("Emulation.setDeviceMetricsOverride", { ...viewport, mobile: testCase.viewport === "portrait" }, sessionId);
  try {
    for (const action of testCase.actions) {
      await executeAction(cdp, sessionId, action, expected, baseUrlValue);
    }
    return { id: testCase.id, viewport: testCase.viewport, status: "passed" };
  } finally {
    await cdp.send("Target.closeTarget", { targetId });
  }
}

async function executeAction(cdp, sessionId, action, expected, baseUrlValue) {
  const [type, argument] = action.split(":");
  if (type === "reload") {
    await cdp.send("Page.navigate", { url: `${baseUrlValue}${expected.page.path}?${expected.page.query}` }, sessionId);
    await waitFor(async () => (await readDom(cdp, sessionId)).ready, 15000, "CDF page ready");
    return;
  }
  if (type === "clickLesson") {
    await clickSelector(cdp, sessionId, `[data-causal-lesson=\"${Number(argument) - 1}\"]`);
    return;
  }
  if (type === "clickAction") {
    const selectors = { next: expected.controls.next, play: expected.controls.play, first: expected.controls.first, last: expected.controls.last };
    await clickSelector(cdp, sessionId, selectors[argument]);
    return;
  }
  if (type === "keyboardNext") {
    await pressSelectorKey(cdp, sessionId, expected.controls.next, "Enter");
    return;
  }
  if (type === "pointerScrub") {
    await scrubWithPointer(cdp, sessionId, Number(argument));
    return;
  }
  if (type === "keyboardScrub") {
    const before = Number((await readDom(cdp, sessionId)).scrubber.value);
    await pressKey(cdp, sessionId, argument === "left" ? "ArrowLeft" : "ArrowRight");
    const after = Number((await readDom(cdp, sessionId)).scrubber.value);
    if (!(after !== before)) throw new Error(`keyboard scrub did not move the held frame (${before} -> ${after})`);
    return;
  }
  if (type === "wait") {
    await new Promise((resolve) => setTimeout(resolve, Number(argument)));
    return;
  }
  if (type === "assertLesson") return assertLesson(await readDom(cdp, sessionId), Number(argument), expected);
  if (type === "assertHandoff") return assertHandoff(await readDom(cdp, sessionId));
  if (type === "assertHeldFrame") return assertHeldFrame(await readDom(cdp, sessionId));
  if (type === "assertPlaying") return assertTransport(await readDom(cdp, sessionId), "Pause lesson", true);
  if (type === "assertPaused") return assertTransport(await readDom(cdp, sessionId), "Resume lesson", false);
  if (type === "assertFirstFrame") return assertSlider(await readDom(cdp, sessionId), "0");
  if (type === "assertLastFrame") return assertLast(await readDom(cdp, sessionId));
  if (type === "assertSharedPace") return assertSharedPace(await readDom(cdp, sessionId), expected);
  if (type === "assertLaboratory") return assertLaboratory(await readDom(cdp, sessionId), expected);
  throw new Error(`Unknown Stage 0 action ${action}`);
}

async function readDom(cdp, sessionId) {
  const result = await evaluate(cdp, sessionId, `(() => {
    const slider = document.querySelector("#causal-delay-feedback-now");
    const canvas = document.querySelector("#causal-delay-feedback-canvas");
    const title = document.querySelector("#causal-delay-feedback-lesson-title");
    const toolbarTitle = document.querySelector("#causal-delay-feedback-toolbar .causal-title strong");
    const play = document.querySelector("#causal-delay-feedback-guided-play");
    return {
      ready: document.readyState === "complete" && Boolean(window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__),
      heading: title?.textContent?.trim() ?? "",
      summary: document.querySelector("#causal-delay-feedback-canvas-summary")?.textContent?.trim() ?? "",
      toolbarTitle: toolbarTitle?.textContent?.trim() ?? "",
      slider: { value: slider?.value ?? "", valueText: slider?.getAttribute("aria-valuetext") ?? "" },
      play: { label: play?.getAttribute("aria-label") ?? "", pressed: play?.getAttribute("aria-pressed") ?? "" },
      canvas: {
        scene: canvas?.dataset?.causalScene ?? "",
        pace: canvas?.dataset?.storyWakeDisplayRateScale ?? "",
        duration: canvas?.dataset?.storyPlaybackDurationSeconds ?? "",
        replayTime: canvas?.dataset?.storyReplayTime ?? ""
      },
      nextDisabled: Boolean(document.querySelector("#nav-forward")?.disabled),
      previousDisabled: Boolean(document.querySelector("#nav-up")?.disabled),
      lessonButtons: document.querySelectorAll("[data-causal-lesson]").length,
      previewButtons: document.querySelectorAll("[data-causal-preview]").length,
      viewportOverflow: document.documentElement.scrollWidth > window.innerWidth + 1
    };
  })()`);
  return result.value;
}

async function evaluate(cdp, sessionId, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, returnByValue: true }, sessionId);
  if (result.exceptionDetails) throw new Error(`browser evaluation failed: ${JSON.stringify(result.exceptionDetails)}`);
  return result.result;
}

async function elementRect(cdp, sessionId, selector) {
  const result = await evaluate(cdp, sessionId, `(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, disabled: Boolean(element.disabled) };
  })()`);
  if (!result.value || result.value.disabled) throw new Error(`UI control unavailable: ${selector}`);
  return result.value;
}

async function clickSelector(cdp, sessionId, selector) {
  const rect = await elementRect(cdp, sessionId, selector);
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }, sessionId);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, x, y }, sessionId);
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, x, y }, sessionId);
}

async function scrubWithPointer(cdp, sessionId, fraction) {
  const rect = await elementRect(cdp, sessionId, "#causal-delay-feedback-now");
  const x = rect.x + Math.max(0, Math.min(1, fraction)) * rect.width;
  const y = rect.y + rect.height / 2;
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }, sessionId);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, x, y }, sessionId);
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, x, y }, sessionId);
  const dom = await readDom(cdp, sessionId);
  if (Math.abs(Number(dom.scrubber.value) - fraction * 1000) > 3) throw new Error(`pointer scrub missed target: ${dom.scrubber.value}`);
}

async function pressTabUntil(cdp, sessionId, selector) {
  for (let index = 0; index < 24; index += 1) {
    const active = await evaluate(cdp, sessionId, `document.activeElement?.matches?.(${JSON.stringify(selector)}) === true`);
    if (active.value === true) return;
    await pressKey(cdp, sessionId, "Tab");
  }
  throw new Error(`keyboard focus did not reach ${selector}`);
}

async function pressSelectorKey(cdp, sessionId, selector, key) {
  const rect = await elementRect(cdp, sessionId, selector);
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }, sessionId);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 0, x, y }, sessionId);
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 0, x, y }, sessionId);
  await pressKey(cdp, sessionId, key);
}

async function pressKey(cdp, sessionId, key) {
  await cdp.send("Input.dispatchKeyEvent", { type: "rawKeyDown", key, code: key, windowsVirtualKeyCode: key === "Enter" ? 13 : undefined }, sessionId);
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key, code: key }, sessionId);
}

function assertLesson(dom, index, expected) {
  const lesson = expected.lessons[index - 1];
  if (!lesson || dom.heading !== lesson.title) throw new Error(`expected Lesson ${index} heading ${JSON.stringify(lesson?.title)}, got ${JSON.stringify(dom.heading)}`);
  if (dom.lessonButtons !== expected.page.lessonCount || dom.previewButtons !== expected.page.previewCount) throw new Error("lesson table-of-contents count drifted");
  if (dom.viewportOverflow) throw new Error("viewport overflow detected");
}

function assertHandoff(dom) {
  if (!/^Replay time /u.test(dom.scrubber.valueText) || dom.canvas.scene !== "story:meaning") throw new Error(`Lesson Two -> Three handoff surface mismatch: ${JSON.stringify(dom)}`);
}

function assertHeldFrame(dom) {
  if (!/^Replay time /u.test(dom.scrubber.valueText) || !dom.canvas.replayTime) throw new Error(`scrubbed frame was not held: ${JSON.stringify(dom)}`);
}

function assertTransport(dom, label, pressed) {
  if (dom.play.label !== label || dom.play.pressed !== String(pressed)) throw new Error(`transport mismatch: ${JSON.stringify(dom.play)}`);
}

function assertSlider(dom, value) {
  if (dom.scrubber.value !== value) throw new Error(`expected scrubber ${value}, got ${dom.scrubber.value}`);
}

function assertLast(dom) {
  if (dom.scrubber.value !== "1000" || !dom.play.label.startsWith("Lesson complete;")) throw new Error(`last-frame contract failed: ${JSON.stringify(dom)}`);
}

function assertSharedPace(dom, expected) {
  if (dom.canvas.pace !== expected.sharedPace.value) throw new Error(`shared pace drifted: ${dom.canvas.pace}`);
}

function assertLaboratory(dom, expected) {
  if (!dom.summary.startsWith(`${expected.page.laboratoryLabel}.`) || dom.toolbarTitle !== expected.page.laboratoryTitle || dom.canvas.scene !== "sandbox") {
    throw new Error(`Laboratory entry mismatch: ${JSON.stringify(dom)}`);
  }
}

async function waitFor(callback, timeoutMs, label) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await callback()) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for ${label}`);
}
