#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 5173;
const DEFAULT_OUTPUT_DIR = path.join(
  REPO_ROOT,
  "reference/priorities/app-causal-delay-feedback/browser-qa",
);
const DEFAULT_BROWSER_PATHS = [
  process.env.CAUSAL_DELAY_BROWSER_PATH,
  process.env.PDF_BROWSER_PATH,
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "chromium",
  "chromium-browser",
  "google-chrome",
].filter(Boolean);
const PROOFS = Object.freeze([
  {
    id: "story-meet",
    fileName: "story-meet-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-electrino-to-positrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 0,
    expectedScene: "story:meet",
    expectedText: "Let's examine the transmitting positrino (red) and a receiving electrino (blue).",
  },
  {
    id: "story-emission",
    fileName: "story-emission-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-electrino-to-positrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 1,
    expectedScene: "story:emission",
    expectedText: "Dimmed architrinos keep both transmission locations visible",
  },
  {
    id: "story-travel",
    fileName: "story-travel-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-electrino-to-positrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 2,
    expectedScene: "story:travel",
    expectedText: "The two wakes cross the gap",
  },
  {
    id: "story-reception",
    fileName: "story-reception-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-electrino-to-positrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 3,
    expectedScene: "story:reception",
    expectedText: "the positrino wake intersects the electrino receiver",
  },
  {
    id: "story-desktop",
    fileName: "story-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-electrino-to-positrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 4,
    expectedScene: "story:meaning",
    expectedText: "Each dashed causal line connects a receiver",
  },
  {
    id: "prediction-desktop",
    fileName: "prediction-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=prediction&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "prediction",
    expectedScene: "prediction",
    expectedText: "Which earlier transmission position matters?",
  },
  {
    id: "story-portrait",
    fileName: "story-purple-390x844.png",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 4,
    expectedScene: "story:meaning",
  },
  {
    id: "prediction-portrait",
    fileName: "prediction-purple-390x844.png",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    query: "mode=prediction&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "prediction",
    expectedScene: "prediction",
  },
  {
    id: "keyboard-journey",
    fileName: "keyboard-sandbox-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    keyboardJourney: "sandbox",
    expectedScene: "sandbox",
    expectedText: "Sandbox",
  },
  {
    id: "story-reduced-motion",
    fileName: "story-reduced-motion-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 4,
    reducedMotion: true,
    expectedScene: "story:meaning",
    expectedText: "Each dashed causal line connects a receiver",
  },
  {
    id: "roots-reduced-motion",
    fileName: "roots-reduced-motion-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=roots&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "roots",
    reducedMotion: true,
    expectedScene: "roots",
    expectedText: "Finite accumulated ΔV",
  },
  {
    id: "self-hit",
    fileName: "self-hit-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=self-hit&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "self-hit",
    expectedScene: "self-hit",
    expectedText: "failed-floor",
  },
  {
    id: "branch-lab",
    fileName: "branch-lab-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=branch-lab&preset=contrast_stress&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "branch-lab",
    expectedScene: "branch-lab",
    branchFilters: {
      historyAgeLimit: 0.7,
      minimumContribution: 200,
      rootKind: "all",
      transversalityFloor: 0,
    },
    expectedText: "filtered",
    expectedSecondaryText: "rejected",
    expectedBranchFilterCount: 4,
  },
  {
    id: "high-contrast",
    fileName: "story-high-contrast-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&replay=mock&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "story",
    storyStep: 4,
    highContrast: true,
    expectedScene: "story:meaning",
    expectedText: "Each dashed causal line connects a receiver",
  },
  {
    id: "eom-unavailable",
    fileName: "eom-unavailable-story-purple-1440x900.png",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    query: "mode=story&canvas=architrinoPurple",
    replayTime: 0.62,
    wakeSeriesId: "live-positrino-to-electrino",
    settingsOpen: false,
    mode: "story",
    expectedScene: "story:meet",
    expectedReplayState: "fallback",
    expectedText: "Let's examine the transmitting positrino (red) and a receiving electrino (blue).",
  },
]);

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printUsage(0);
}
if (args.unknown.length > 0) {
  console.error(`Unknown argument(s): ${args.unknown.join(", ")}`);
  printUsage(2);
}
validateProofConfigurations(PROOFS);

const outputDir = path.resolve(REPO_ROOT, args.outputDir ?? DEFAULT_OUTPUT_DIR);
const host = args.host ?? DEFAULT_HOST;
const port = args.port ?? DEFAULT_PORT;
const baseUrl = args.baseUrl ?? `http://${host}:${port}`;
const browserPath = args.browserPath ?? findBrowserPath();

if (!browserPath) {
  console.error("No Chromium-family browser found. Pass --browser=/path/to/browser.");
  process.exit(2);
}

let serverProcess = null;
let browserProcess = null;

try {
  await ensureDevServer({ baseUrl, host, port });
  await mkdir(outputDir, { recursive: true });
  const browser = await launchBrowser({ browserPath });
  browserProcess = browser.process;
  const cdp = await connectCdp(browser.wsUrl);
  try {
    for (const proof of PROOFS) {
      if (args.proof && args.proof !== proof.id) {
        continue;
      }
      const outputPath = path.join(outputDir, proof.fileName);
      await captureProof(cdp, {
        proof,
        url: `${baseUrl}/causal-delay-feedback.html?${proof.query}`,
        outputPath,
      });
      console.log(`wrote ${path.relative(REPO_ROOT, outputPath)}`);
    }
  } finally {
    cdp.close();
  }
} finally {
  if (browserProcess) {
    browserProcess.kill("SIGTERM");
  }
  if (serverProcess) {
    serverProcess.kill("SIGTERM");
  }
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/capture-causal-delay-feedback-browser-qa.mjs [options]");
  console.log("  --output-dir=PATH  Directory for PNG proof files.");
  console.log("  --browser=PATH     Chromium, Chrome, or Edge executable.");
  console.log("  --base-url=URL     Existing dev server URL. Default: http://127.0.0.1:5173");
  console.log("  --host=HOST        Host used when starting the dev server. Default: 127.0.0.1");
  console.log("  --port=PORT        Port used when starting the dev server. Default: 5173");
  console.log("  --proof=ID         Capture only the named proof id.");
  process.exit(exitCode);
}

function parseArgs(argv) {
  const parsed = {
    baseUrl: null,
    browserPath: null,
    help: false,
    host: null,
    outputDir: null,
    port: null,
    proof: null,
    unknown: [],
  };
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg.startsWith("--base-url=")) {
      parsed.baseUrl = arg.slice("--base-url=".length).replace(/\/$/u, "");
    } else if (arg.startsWith("--browser=")) {
      parsed.browserPath = arg.slice("--browser=".length);
    } else if (arg.startsWith("--host=")) {
      parsed.host = arg.slice("--host=".length);
    } else if (arg.startsWith("--output-dir=")) {
      parsed.outputDir = arg.slice("--output-dir=".length);
    } else if (arg.startsWith("--port=")) {
      parsed.port = Number.parseInt(arg.slice("--port=".length), 10);
    } else if (arg.startsWith("--proof=")) {
      parsed.proof = arg.slice("--proof=".length);
      if (!PROOFS.some((proof) => proof.id === parsed.proof)) {
        parsed.unknown.push(arg);
      }
    } else {
      parsed.unknown.push(arg);
    }
  }
  return parsed;
}

function validateProofConfigurations(proofs) {
  const errors = [];
  for (const proof of proofs) {
    const query = new URLSearchParams(proof.query);
    if (
      proof.requiredInitialVelocityEvidence === true &&
      !(
        query.has("pathConstraintInitialVelocityResidualTolerance") ||
        query.has("initialVelocityResidualTolerance")
      )
    ) {
      errors.push(`${proof.id} requires initial-velocity evidence without an initial-velocity tolerance query`);
    }
    if (
      proof.requiredBoundaryResidualEvidence === true &&
      !(query.has("pathConstraintBoundaryResidualTolerance") || query.has("boundaryResidualTolerance"))
    ) {
      errors.push(`${proof.id} requires boundary-residual evidence without a boundary-residual tolerance query`);
    }
  }
  if (errors.length > 0) {
    throw new Error(`Invalid proof configuration:\n- ${errors.join("\n- ")}`);
  }
}

function findBrowserPath() {
  for (const candidate of DEFAULT_BROWSER_PATHS) {
    if (candidate.includes("/") && existsSync(candidate)) {
      return candidate;
    }
    if (!candidate.includes("/")) {
      return candidate;
    }
  }
  return null;
}

async function ensureDevServer({ baseUrl, host, port }) {
  if (await canFetch(`${baseUrl}/causal-delay-feedback.html`)) {
    return;
  }
  serverProcess = spawn(process.execPath, ["scripts/dev/start-local-dev.mjs"], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      HOST: host,
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  serverProcess.stdout.on("data", (chunk) => process.stdout.write(chunk));
  serverProcess.stderr.on("data", (chunk) => process.stderr.write(chunk));
  await waitFor(async () => canFetch(`${baseUrl}/causal-delay-feedback.html`), {
    timeoutMs: 10000,
    label: `local dev server at ${baseUrl}`,
  });
}

async function canFetch(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

async function launchBrowser({ browserPath }) {
  const profileDir = path.join(REPO_ROOT, ".tmp/causal-delay-feedback-browser-qa-profile");
  await rm(profileDir, { force: true, recursive: true });
  await mkdir(profileDir, { recursive: true });
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--mute-audio",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ];
  const child = spawn(browserPath, args, {
    cwd: REPO_ROOT,
    stdio: ["ignore", "ignore", "pipe"],
  });
  const wsUrl = await waitForDevToolsUrl(child);
  return { process: child, wsUrl };
}

function waitForDevToolsUrl(child) {
  return new Promise((resolve, reject) => {
    let stderr = "";
    const timeout = setTimeout(() => {
      reject(new Error(`browser did not expose a DevTools endpoint: ${stderr.trim()}`));
    }, 15000);
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/u);
      if (match) {
        clearTimeout(timeout);
        resolve(match[1]);
      }
    });
    child.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`browser exited before DevTools was ready: ${code}; ${stderr.trim()}`));
    });
  });
}

async function connectCdp(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  const eventListeners = new Set();
  let nextId = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      eventListeners.forEach((listener) => listener(message));
      return;
    }
    const request = pending.get(message.id);
    if (!request) {
      return;
    }
    pending.delete(message.id);
    if (message.error) {
      request.reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`));
      return;
    }
    request.resolve(message.result ?? {});
  });
  return {
    close() {
      socket.close();
    },
    onEvent(listener) {
      eventListeners.add(listener);
      return () => eventListeners.delete(listener);
    },
    send(method, params = {}, sessionId = null) {
      const id = nextId;
      nextId += 1;
      const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify(payload));
      });
    },
  };
}

async function captureProof(cdp, { proof, url, outputPath }) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  const browserDiagnostics = [];
  const stopDiagnostics = cdp.onEvent((message) => {
    if (message.sessionId !== sessionId) {
      return;
    }
    if (message.method === "Runtime.exceptionThrown") {
      browserDiagnostics.push({
        type: "exception",
        text: message.params?.exceptionDetails?.text ?? "uncaught browser exception",
      });
    }
    if (
      message.method === "Runtime.consoleAPICalled" &&
      ["warning", "error"].includes(message.params?.type)
    ) {
      browserDiagnostics.push({
        type: message.params.type,
        text: (message.params.args ?? [])
          .map((arg) => arg.value ?? arg.description ?? "")
          .join(" "),
      });
    }
  });
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: proof.width,
    height: proof.height,
    deviceScaleFactor: proof.deviceScaleFactor,
    mobile: Boolean(proof.mobile),
  }, sessionId);
  if (proof.reducedMotion === true) {
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    }, sessionId);
  }
  if (proof.highContrast === true) {
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [
        { name: "forced-colors", value: "active" },
        { name: "prefers-contrast", value: "more" },
      ],
    }, sessionId);
  }
  await cdp.send("Page.navigate", { url }, sessionId);
  await waitFor(async () => {
    const requiredSource = JSON.stringify(proof.requiredDatasetSource ?? "");
    const result = await evaluate(cdp, sessionId, `
      (() => {
        const runtime = window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__;
        const requiredSource = ${requiredSource};
        if (document.readyState !== "complete" || !runtime) {
          return false;
        }
        if (requiredSource) {
          return runtime.dataset?.datasetSource === requiredSource ||
            runtime.replayLoadState === "fallback" ||
            runtime.replayLoadState === "draft-rejected";
        }
        return runtime.replayLoadState !== "loading";
      })()
    `);
    return result.value === true;
  }, {
    timeoutMs: 15000,
    label: `causal-delay page ready for ${proof.id}`,
  });
  if (proof.keyboardJourney) {
    await prepareKeyboardJourney(cdp, sessionId, proof.keyboardJourney);
  }
  const prepared = await evaluate(cdp, sessionId, createPrepareProofExpression(proof));
  if (!prepared.value?.ok) {
    throw new Error(`failed to prepare ${proof.id} proof: ${JSON.stringify(prepared.value)}`);
  }
  if (browserDiagnostics.length > 0) {
    throw new Error(`browser diagnostics for ${proof.id}: ${JSON.stringify(browserDiagnostics)}`);
  }
  await cdp.send("Page.bringToFront", {}, sessionId);
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  }, sessionId);
  await writeFile(outputPath, Buffer.from(data, "base64"));
  stopDiagnostics();
  await cdp.send("Target.closeTarget", { targetId });
}

async function prepareKeyboardJourney(cdp, sessionId, destination) {
  const pressFocusedButton = async (selector) => {
    const activated = await evaluate(cdp, sessionId, `
      (() => {
        const control = document.querySelector(${JSON.stringify(selector)});
        if (!control) {
          return { ok: false, reason: "missing" };
        }
        control.focus();
        if (document.activeElement !== control) {
          return { ok: false, reason: "focus" };
        }
        control.click();
        return { ok: true };
      })()
    `);
    if (!activated.value?.ok) {
      throw new Error(
        `keyboard journey could not activate focused ${selector}: ${activated.value?.reason ?? "unknown"}`,
      );
    }
  };
  for (let step = 0; step < 6; step += 1) {
    const mode = await evaluate(cdp, sessionId, `
      window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__?.learnerState?.mode
    `);
    if (mode.value === "prediction") {
      break;
    }
    await pressFocusedButton("#causal-delay-feedback-guided-next");
  }
  const predictionMode = await evaluate(cdp, sessionId, `
    window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__?.learnerState?.mode
  `);
  if (predictionMode.value !== "prediction") {
    throw new Error(`keyboard journey did not reach Prediction; got ${predictionMode.value ?? "unavailable"}`);
  }
  await pressFocusedButton(".causal-choice-button:nth-child(2)");
  await pressFocusedButton("#causal-delay-feedback-guided-next");
  const historyMode = await evaluate(cdp, sessionId, `
    window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__?.learnerState?.mode
  `);
  if (historyMode.value !== "history") {
    throw new Error(`keyboard journey did not reach Path History; got ${historyMode.value ?? "unavailable"}`);
  }
  if (destination === "sandbox") {
    await pressFocusedButton('[data-causal-mode="sandbox"]');
  }
  const state = await evaluate(cdp, sessionId, `
    (() => ({
      mode: window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__?.learnerState?.mode,
      focus: document.activeElement?.textContent?.trim(),
    }))()
  `);
  if (state.value?.mode !== destination) {
    throw new Error(`keyboard journey expected ${destination}, got ${state.value?.mode ?? "unavailable"}`);
  }
}

function createPrepareProofExpression(proof) {
  return `(async () => {
    const runtime = window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__;
    if (!runtime) {
      return { ok: false, reason: "runtime_missing" };
    }
    const requestedMode = ${JSON.stringify(proof.mode ?? "")};
    if (requestedMode && runtime.learnerState?.mode !== requestedMode) {
      runtime.setLearnerMode(requestedMode);
    }
    const requestedStoryStep =
      ${proof.storyStep == null ? "undefined" : JSON.stringify(proof.storyStep)};
    if (Number.isInteger(requestedStoryStep)) {
      runtime.learnerState.storyStep = requestedStoryStep;
      runtime.modeController?.render();
    }
    const requestedBranchFilters = ${JSON.stringify(proof.branchFilters ?? null)};
    if (requestedBranchFilters) {
      Object.assign(runtime.learnerState.branchFilters, requestedBranchFilters);
      runtime.modeController?.render();
    }
    const prepareAction = ${JSON.stringify(proof.prepareAction ?? null)};
    if (prepareAction?.type === "retained-point-drag") {
      const previousCondition = runtime.dataset.initialConditions?.[prepareAction.kind]
        ? { ...runtime.dataset.initialConditions[prepareAction.kind] }
        : null;
      const previousHistoryPoint = runtime.dataset.history?.[prepareAction.kind]?.find(
        (point) => Number(point.depth) === Number(prepareAction.depth)
      );
      const previousHistory = previousHistoryPoint ? { ...previousHistoryPoint } : null;
      const didEdit = runtime.applyRetainedPointDrag(
        prepareAction.kind,
        prepareAction.depth,
        prepareAction.delta
      );
      if (!didEdit) {
        return { ok: false, reason: "retained_point_drag_noop", action: prepareAction };
      }
      await runtime.rerunAfterDirectManipulationDrag();
      if (runtime.replayLoadState === "draft-rejected") {
        return {
          ok: false,
          reason: "solver_rejected_direct_edit",
          status: runtime.dom.replayStatus.textContent,
          error: runtime.getDraftSolverRejectionMessage(),
        };
      }
      if (prepareAction.requiredInitialConditionDelta) {
        const condition = runtime.dataset.initialConditions?.[prepareAction.kind];
        const expectedX = Number(previousCondition?.x) + Number(prepareAction.requiredInitialConditionDelta.x);
        const expectedY = Number(previousCondition?.y) + Number(prepareAction.requiredInitialConditionDelta.y);
        if (
          !condition ||
          Math.abs(Number(condition.x) - expectedX) > 1e-6 ||
          Math.abs(Number(condition.y) - expectedY) > 1e-6
        ) {
          return {
            ok: false,
            reason: "initial_position_not_preserved_after_central_replay",
            expected: { x: expectedX, y: expectedY },
            actual: condition ? { x: condition.x, y: condition.y } : null,
            status: runtime.dom.replayStatus.textContent,
          };
        }
      }
      if (prepareAction.requiredHistoryPointDelta) {
        const point = runtime.dataset.history?.[prepareAction.kind]?.find(
          (candidate) => Number(candidate.depth) === Number(prepareAction.depth)
        );
        const expectedX = Number(previousHistory?.x) + Number(prepareAction.requiredHistoryPointDelta.x);
        const expectedY = Number(previousHistory?.y) + Number(prepareAction.requiredHistoryPointDelta.y);
        const maxDepth = runtime.getMaxHistoryDepth(prepareAction.kind);
        if (
          !point ||
          Math.abs(Number(point.x) - expectedX) > 1e-6 ||
          Math.abs(Number(point.y) - expectedY) > 1e-6 ||
          (prepareAction.requiredFinalHistoryDepth && Number(point.depth) !== Number(maxDepth))
        ) {
          return {
            ok: false,
            reason: "history_point_not_preserved_after_central_replay",
            expected: { x: expectedX, y: expectedY, finalDepth: prepareAction.requiredFinalHistoryDepth },
            actual: point ? { x: point.x, y: point.y, depth: point.depth, maxDepth } : null,
            status: runtime.dom.replayStatus.textContent,
          };
        }
      }
    }
    if (prepareAction?.type === "initial-velocity-drag") {
      const condition = runtime.dataset.initialConditions?.[prepareAction.kind];
      if (!condition) {
        return { ok: false, reason: "initial_condition_missing", action: prepareAction };
      }
      const anchor = runtime.getInitialVelocityAnchorPoint(prepareAction.kind, condition);
      const velocityEnd = runtime.initialConditionVelocityEnd(condition, anchor);
      const didEdit = runtime.applyInitialVelocityDrag(prepareAction.kind, {
        x: velocityEnd.x + prepareAction.delta.x,
        y: velocityEnd.y + prepareAction.delta.y,
      });
      if (!didEdit) {
        return { ok: false, reason: "initial_velocity_drag_noop", action: prepareAction };
      }
      await runtime.rerunAfterDirectManipulationDrag();
      if (runtime.replayLoadState === "draft-rejected") {
        return {
          ok: false,
          reason: "solver_rejected_initial_velocity_edit",
          status: runtime.dom.replayStatus.textContent,
          error: runtime.getDraftSolverRejectionMessage(),
        };
      }
    }
    runtime.setPlaying(false);
    runtime.setCurrentReplayTime(${JSON.stringify(proof.replayTime)});
    runtime.updateNowControl(${JSON.stringify(proof.replayTime)});
    const liveWakeSeries = runtime.getVisibleWakeSeries(runtime.getCurrentReplayTime());
    const link =
      liveWakeSeries.find((candidate) => candidate.id === ${JSON.stringify(proof.wakeSeriesId ?? "")}) ||
      liveWakeSeries[0] ||
      runtime.dataset.wakeLinks.find((candidate) => candidate.label === ${JSON.stringify(proof.wakeLabel ?? "")}) ||
      runtime.dataset.wakeLinks[0];
    if (!link) {
      return { ok: false, reason: "wake_series_missing" };
    }
    runtime.selectedItem = { type: "wake", linkId: link.id };
    runtime.dom.settingsPanel.hidden = ${proof.settingsOpen === false ? "true" : "false"};
    runtime.dom.settingsButton.setAttribute(
      "aria-expanded",
      ${proof.settingsOpen === false ? JSON.stringify("false") : JSON.stringify("true")}
    );
    runtime.updateReadout(runtime.createWakeHit(link, 0));
    runtime.render(runtime.getCurrentReplayTime());
    runtime.modeController?.renderLiveState();
    window.scrollTo(0, 0);
    if (runtime.modeController?.dom?.panel) {
      runtime.modeController.dom.panel.scrollTop = 0;
    }
    const actualMode = runtime.learnerState?.mode;
    if (requestedMode && actualMode !== requestedMode) {
      return {
        ok: false,
        reason: "learner_mode_mismatch",
        expected: requestedMode,
        actual: actualMode,
      };
    }
    const expectedScene = ${JSON.stringify(proof.expectedScene ?? "")};
    const actualScene = runtime.dom.canvas.dataset.causalScene;
    if (expectedScene && actualScene !== expectedScene) {
      return {
        ok: false,
        reason: "canvas_scene_mismatch",
        expected: expectedScene,
        actual: actualScene,
      };
    }
    const expectedReplayState = ${JSON.stringify(proof.expectedReplayState ?? "")};
    if (expectedReplayState && runtime.replayLoadState !== expectedReplayState) {
      return {
        ok: false,
        reason: "replay_state_mismatch",
        expected: expectedReplayState,
        actual: runtime.replayLoadState,
      };
    }
    const expectedText = ${JSON.stringify(proof.expectedText ?? "")};
    if (expectedText && !document.body.textContent.includes(expectedText)) {
      return {
        ok: false,
        reason: "expected_text_missing",
        expected: expectedText,
        actualMode,
      };
    }
    const expectedSecondaryText = ${JSON.stringify(proof.expectedSecondaryText ?? "")};
    if (expectedSecondaryText && !document.body.textContent.includes(expectedSecondaryText)) {
      return {
        ok: false,
        reason: "secondary_expected_text_missing",
        expected: expectedSecondaryText,
        actualMode,
      };
    }
    const expectedBranchFilterCount =
      ${proof.expectedBranchFilterCount == null
        ? "undefined"
        : JSON.stringify(proof.expectedBranchFilterCount)};
    const actualBranchFilterCount = document.querySelectorAll("[data-branch-filter]").length;
    if (
      Number.isInteger(expectedBranchFilterCount) &&
      actualBranchFilterCount !== expectedBranchFilterCount
    ) {
      return {
        ok: false,
        reason: "branch_filter_count_mismatch",
        expected: expectedBranchFilterCount,
        actual: actualBranchFilterCount,
      };
    }
    if (document.documentElement.scrollWidth > window.innerWidth + 1) {
      return {
        ok: false,
        reason: "horizontal_viewport_overflow",
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    }
    if (
      ${proof.reducedMotion === true ? "true" : "false"} &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return { ok: false, reason: "reduced_motion_emulation_missing" };
    }
    if (
      ${proof.highContrast === true ? "true" : "false"} &&
      !window.matchMedia("(forced-colors: active)").matches
    ) {
      return { ok: false, reason: "high_contrast_emulation_missing" };
    }
    const source = runtime.dataset.datasetSource;
    const requiredSource = ${JSON.stringify(proof.requiredDatasetSource ?? "")};
    if (requiredSource && source !== requiredSource) {
      return {
        ok: false,
        reason: "dataset_source_mismatch",
        expected: requiredSource,
        actual: source,
        status: runtime.dom.replayStatus.textContent,
        error: runtime.replayLoadError && String(runtime.replayLoadError.message || runtime.replayLoadError),
      };
    }
    const requiredSolverIntegrationPath = ${JSON.stringify(proof.requiredSolverIntegrationPath ?? "")};
    const solverIntegrationPath =
      runtime.dataset?.solverIntegrationPath ??
        runtime.dataset?.solverSummary?.solverIntegrationPath;
    if (requiredSolverIntegrationPath && solverIntegrationPath !== requiredSolverIntegrationPath) {
      return {
        ok: false,
        reason: "solver_integration_path_mismatch",
        expected: requiredSolverIntegrationPath,
        actual: solverIntegrationPath,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredSolverReplayMode = ${JSON.stringify(proof.requiredSolverReplayMode ?? "")};
    const solverReplayMode =
      runtime.dataset?.solverReplayMode ??
        runtime.dataset?.solverSummary?.replayMode ??
        runtime.dataset?.solverSummary?.solverReplayMode;
    if (requiredSolverReplayMode && solverReplayMode !== requiredSolverReplayMode) {
      return {
        ok: false,
        reason: "solver_replay_mode_mismatch",
        expected: requiredSolverReplayMode,
        actual: solverReplayMode,
        solverIntegrationPath,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredExecutionPath = ${JSON.stringify(proof.requiredExecutionPath ?? "")};
    const executionPath =
      runtime.dataset?.executionPath ??
        runtime.dataset?.solverSummary?.executionPath;
    if (requiredExecutionPath && executionPath !== requiredExecutionPath) {
      return {
        ok: false,
        reason: "execution_path_mismatch",
        expected: requiredExecutionPath,
        actual: executionPath,
        solverReplayMode,
        solverIntegrationPath,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredSignalSpeed =
      ${proof.requiredSignalSpeed == null ? "undefined" : JSON.stringify(proof.requiredSignalSpeed)};
    const signalSpeed = Number(
      runtime.dataset?.signalSpeed ??
        runtime.dataset?.solverSummary?.signalSpeed
    );
    if (
      Number.isFinite(requiredSignalSpeed) &&
      (
        !Number.isFinite(signalSpeed) ||
        Math.abs(signalSpeed - requiredSignalSpeed) > 1e-9
      )
    ) {
      return {
        ok: false,
        reason: "signal_speed_mismatch",
        expected: requiredSignalSpeed,
        actual: signalSpeed,
        executionPath,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredBoundaryRelaxationResidualMode =
      ${JSON.stringify(proof.requiredBoundaryRelaxationResidualMode ?? "")};
    const boundaryRelaxationResidualMode =
      runtime.dataset?.pathConstraintBoundaryRelaxationResidualMode ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualMode;
    if (
      requiredBoundaryRelaxationResidualMode &&
      boundaryRelaxationResidualMode !== requiredBoundaryRelaxationResidualMode
    ) {
      return {
        ok: false,
        reason: "boundary_relaxation_residual_mode_mismatch",
        expected: requiredBoundaryRelaxationResidualMode,
        actual: boundaryRelaxationResidualMode,
        signalSpeed,
        executionPath,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredBoundaryResidualMode = ${JSON.stringify(proof.requiredBoundaryResidualMode ?? "")};
    const boundaryResidualMode =
      runtime.dataset?.pathConstraintBoundaryResidualMode ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryResidualMode;
    if (requiredBoundaryResidualMode && boundaryResidualMode !== requiredBoundaryResidualMode) {
      return {
        ok: false,
        reason: "boundary_residual_mode_mismatch",
        expected: requiredBoundaryResidualMode,
        actual: boundaryResidualMode,
        signalSpeed,
        executionPath,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredReplayStatus = ${JSON.stringify(proof.requiredReplayStatus ?? "")};
    if (requiredReplayStatus && runtime.dom.replayStatus.textContent !== requiredReplayStatus) {
      return {
        ok: false,
        reason: "replay_status_mismatch",
        expected: requiredReplayStatus,
        actual: runtime.dom.replayStatus.textContent,
        source,
        pathConstraintSolverStatus:
          runtime.dataset?.pathConstraintSolverStatus ??
          runtime.dataset?.solverSummary?.pathConstraintSolverStatus,
        pathConstraintBoundaryRelaxationStatus:
          runtime.dataset?.pathConstraintBoundaryRelaxationStatus ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationStatus,
        pathConstraintBoundaryRelaxationTolerance:
          runtime.dataset?.pathConstraintBoundaryRelaxationTolerance ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationTolerance,
        maxPathConstraintBoundaryRelaxationResidualAfter:
          runtime.dataset?.maxPathConstraintBoundaryRelaxationResidualAfter ??
          runtime.dataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualAfter,
        maxPathConstraintBoundaryRelaxationResidualBefore:
          runtime.dataset?.maxPathConstraintBoundaryRelaxationResidualBefore ??
          runtime.dataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualBefore,
        pathConstraintBoundaryRelaxationResidualRatio:
          runtime.dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualRatio,
      };
    }
    const sourceChipTitle = runtime.dom.replayStatus.getAttribute("title") || "";
    const requiredPathConstraintSolverStatus = ${JSON.stringify(proof.requiredPathConstraintSolverStatus ?? "")};
    const pathConstraintSolverStatus =
      runtime.dataset?.pathConstraintSolverStatus ??
      runtime.dataset?.solverSummary?.pathConstraintSolverStatus;
    if (
      requiredPathConstraintSolverStatus &&
      pathConstraintSolverStatus !== requiredPathConstraintSolverStatus
    ) {
      return {
        ok: false,
        reason: "path_constraint_solver_status_mismatch",
        expected: requiredPathConstraintSolverStatus,
        actual: pathConstraintSolverStatus,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredPathConstraintSolverClaim = ${JSON.stringify(proof.requiredPathConstraintSolverClaim ?? "")};
    const pathConstraintSolverClaim =
      runtime.dataset?.pathConstraintSolverClaim ??
      runtime.dataset?.solverSummary?.pathConstraintSolverClaim;
    if (
      requiredPathConstraintSolverClaim &&
      pathConstraintSolverClaim !== requiredPathConstraintSolverClaim
    ) {
      return {
        ok: false,
        reason: "path_constraint_solver_claim_mismatch",
        expected: requiredPathConstraintSolverClaim,
        actual: pathConstraintSolverClaim,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredPathConstraintPhysicalBoundarySolverStatus =
      ${JSON.stringify(proof.requiredPathConstraintPhysicalBoundarySolverStatus ?? "")};
    const pathConstraintPhysicalBoundarySolverStatus =
      runtime.dataset?.pathConstraintPhysicalBoundarySolverStatus ??
      runtime.dataset?.solverSummary?.pathConstraintPhysicalBoundarySolverStatus;
    if (
      requiredPathConstraintPhysicalBoundarySolverStatus &&
      pathConstraintPhysicalBoundarySolverStatus !== requiredPathConstraintPhysicalBoundarySolverStatus
    ) {
      return {
        ok: false,
        reason: "path_constraint_physical_boundary_solver_status_mismatch",
        expected: requiredPathConstraintPhysicalBoundarySolverStatus,
        actual: pathConstraintPhysicalBoundarySolverStatus,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredPathConstraintPhysicalBoundarySolverClaim =
      ${JSON.stringify(proof.requiredPathConstraintPhysicalBoundarySolverClaim ?? "")};
    const pathConstraintPhysicalBoundarySolverClaim =
      runtime.dataset?.pathConstraintPhysicalBoundarySolverClaim ??
      runtime.dataset?.solverSummary?.pathConstraintPhysicalBoundarySolverClaim;
    if (
      requiredPathConstraintPhysicalBoundarySolverClaim &&
      pathConstraintPhysicalBoundarySolverClaim !== requiredPathConstraintPhysicalBoundarySolverClaim
    ) {
      return {
        ok: false,
        reason: "path_constraint_physical_boundary_solver_claim_mismatch",
        expected: requiredPathConstraintPhysicalBoundarySolverClaim,
        actual: pathConstraintPhysicalBoundarySolverClaim,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredPathConstraintPhysicalBoundarySolverBlockingReason =
      ${JSON.stringify(proof.requiredPathConstraintPhysicalBoundarySolverBlockingReason ?? "")};
    const pathConstraintPhysicalBoundarySolverBlockingReason =
      runtime.dataset?.pathConstraintPhysicalBoundarySolverBlockingReason ??
      runtime.dataset?.solverSummary?.pathConstraintPhysicalBoundarySolverBlockingReason;
    if (
      requiredPathConstraintPhysicalBoundarySolverBlockingReason &&
      pathConstraintPhysicalBoundarySolverBlockingReason !==
        requiredPathConstraintPhysicalBoundarySolverBlockingReason
    ) {
      return {
        ok: false,
        reason: "path_constraint_physical_boundary_solver_blocking_reason_mismatch",
        expected: requiredPathConstraintPhysicalBoundarySolverBlockingReason,
        actual: pathConstraintPhysicalBoundarySolverBlockingReason,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredAdaptiveBoundaryRetry =
      ${proof.requiredAdaptiveBoundaryRetry == null ? "undefined" : JSON.stringify(proof.requiredAdaptiveBoundaryRetry)};
    const adaptiveBoundaryRetry = Boolean(
      runtime.dataset?.pathConstraintBoundaryRelaxationAdaptiveRetry ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationAdaptiveRetry
    );
    if (
      typeof requiredAdaptiveBoundaryRetry === "boolean" &&
      adaptiveBoundaryRetry !== requiredAdaptiveBoundaryRetry
    ) {
      return {
        ok: false,
        reason: "adaptive_boundary_retry_mismatch",
        expected: requiredAdaptiveBoundaryRetry,
        actual: adaptiveBoundaryRetry,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredBoundaryRelaxationIterationCount =
      ${proof.requiredBoundaryRelaxationIterationCount == null
        ? "undefined"
        : JSON.stringify(proof.requiredBoundaryRelaxationIterationCount)};
    const allowedBoundaryRelaxationIterationCounts = Array.isArray(requiredBoundaryRelaxationIterationCount)
      ? requiredBoundaryRelaxationIterationCount
      : Number.isFinite(requiredBoundaryRelaxationIterationCount)
        ? [requiredBoundaryRelaxationIterationCount]
        : [];
    const boundaryRelaxationIterationCount = Number(
      runtime.dataset?.pathConstraintBoundaryRelaxationIterationCount ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationIterationCount
    );
    if (
      allowedBoundaryRelaxationIterationCounts.length > 0 &&
      !allowedBoundaryRelaxationIterationCounts.includes(boundaryRelaxationIterationCount)
    ) {
      return {
        ok: false,
        reason: "boundary_relaxation_iteration_count_mismatch",
        expected: allowedBoundaryRelaxationIterationCounts,
        actual: boundaryRelaxationIterationCount,
        adaptiveBoundaryRetry,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredBoundaryRelaxationTolerance =
      ${proof.requiredBoundaryRelaxationTolerance == null
        ? "undefined"
        : JSON.stringify(proof.requiredBoundaryRelaxationTolerance)};
    const allowedBoundaryRelaxationTolerances = Array.isArray(requiredBoundaryRelaxationTolerance)
      ? requiredBoundaryRelaxationTolerance
      : Number.isFinite(requiredBoundaryRelaxationTolerance)
        ? [requiredBoundaryRelaxationTolerance]
        : [];
    const boundaryRelaxationTolerance = Number(
      runtime.dataset?.pathConstraintBoundaryRelaxationTolerance ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationTolerance
    );
    if (
      allowedBoundaryRelaxationTolerances.length > 0 &&
      !allowedBoundaryRelaxationTolerances.includes(boundaryRelaxationTolerance)
    ) {
      return {
        ok: false,
        reason: "boundary_relaxation_tolerance_mismatch",
        expected: allowedBoundaryRelaxationTolerances,
        actual: boundaryRelaxationTolerance,
        adaptiveBoundaryRetry,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredMaxBoundaryRelaxationResidualAfter =
      ${proof.requiredMaxBoundaryRelaxationResidualAfter == null
        ? "undefined"
        : JSON.stringify(proof.requiredMaxBoundaryRelaxationResidualAfter)};
    const maxBoundaryRelaxationResidualAfter = Number(
      runtime.dataset?.maxPathConstraintBoundaryRelaxationResidualAfter ??
        runtime.dataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualAfter
    );
    if (
      Number.isFinite(requiredMaxBoundaryRelaxationResidualAfter) &&
      (
        !Number.isFinite(maxBoundaryRelaxationResidualAfter) ||
        maxBoundaryRelaxationResidualAfter > requiredMaxBoundaryRelaxationResidualAfter
      )
    ) {
      return {
        ok: false,
        reason: "boundary_relaxation_residual_after_exceeded",
        expectedMax: requiredMaxBoundaryRelaxationResidualAfter,
        actual: maxBoundaryRelaxationResidualAfter,
        relaxationStatus:
          runtime.dataset?.pathConstraintBoundaryRelaxationStatus ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationStatus,
        relaxationTolerance:
          runtime.dataset?.pathConstraintBoundaryRelaxationTolerance ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationTolerance,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredMaxBoundaryRelaxationResidualRatio =
      ${proof.requiredMaxBoundaryRelaxationResidualRatio == null
        ? "undefined"
        : JSON.stringify(proof.requiredMaxBoundaryRelaxationResidualRatio)};
    const boundaryRelaxationResidualRatio = Number(
      runtime.dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualRatio
    );
    if (
      Number.isFinite(requiredMaxBoundaryRelaxationResidualRatio) &&
      (
        !Number.isFinite(boundaryRelaxationResidualRatio) ||
        boundaryRelaxationResidualRatio > requiredMaxBoundaryRelaxationResidualRatio
      )
    ) {
      return {
        ok: false,
        reason: "boundary_relaxation_residual_ratio_exceeded",
        expectedMax: requiredMaxBoundaryRelaxationResidualRatio,
        actual: boundaryRelaxationResidualRatio,
        maxBoundaryRelaxationResidualAfter,
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    const requiredBoundaryRelaxationResidualEvidenceStatus =
      ${proof.requiredBoundaryRelaxationResidualEvidenceStatus == null
        ? "undefined"
        : JSON.stringify(proof.requiredBoundaryRelaxationResidualEvidenceStatus)};
    const boundaryRelaxationResidualEvidenceStatus =
      runtime.dataset?.pathConstraintBoundaryRelaxationResidualEvidenceStatus ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualEvidenceStatus;
    if (
      requiredBoundaryRelaxationResidualEvidenceStatus &&
      (
        boundaryRelaxationResidualEvidenceStatus !== requiredBoundaryRelaxationResidualEvidenceStatus ||
        !sourceChipTitle.includes(\`relaxEvidence=\${requiredBoundaryRelaxationResidualEvidenceStatus}\`)
      )
    ) {
      return {
        ok: false,
        reason: "boundary_relaxation_residual_evidence_mismatch",
        expected: {
          status: requiredBoundaryRelaxationResidualEvidenceStatus,
          sourceChipEvidence: \`relaxEvidence=\${requiredBoundaryRelaxationResidualEvidenceStatus}\`,
        },
        actual: {
          boundaryRelaxationResidualEvidenceStatus,
          sourceChipTitle,
        },
        source,
        status: runtime.dom.replayStatus.textContent,
      };
    }
    if (${proof.requiredRetainedPositionEvidence === true ? "true" : "false"}) {
      const positionResidualSampleCount = Number(
        runtime.dataset?.pathConstraintPositionResidualSampleCount ??
          runtime.dataset?.solverSummary?.pathConstraintPositionResidualSampleCount
      );
      const positionResidualStatus =
        runtime.dataset?.pathConstraintPositionResidualStatus ??
        runtime.dataset?.solverSummary?.pathConstraintPositionResidualStatus;
      const positionResidualTolerance = Number(
        runtime.dataset?.pathConstraintPositionResidualTolerance ??
          runtime.dataset?.solverSummary?.pathConstraintPositionResidualTolerance
      );
      const maxPositionResidual = Number(
        runtime.dataset?.maxPathConstraintPositionResidual ??
          runtime.dataset?.solverSummary?.maxPathConstraintPositionResidual
      );
      const expectedPositionResidualSampleCount = ["positrino", "electrino"].reduce(
        (sum, kind) => sum + Number(runtime.dataset.history?.[kind]?.length ?? 0),
        0
      );
      const effectivePositionResidualTolerance = Number.isFinite(positionResidualTolerance)
        ? positionResidualTolerance
        : 1e-9;
      const sourceChipHasRows = sourceChipTitle.includes(\`posRows=\${positionResidualSampleCount}\`);
      const sourceChipHasAcceptedStatus = sourceChipTitle.includes("posStatus=within_tolerance");
      if (
        !Number.isFinite(positionResidualSampleCount) ||
        positionResidualSampleCount < expectedPositionResidualSampleCount ||
        positionResidualStatus !== "within_tolerance" ||
        !Number.isFinite(maxPositionResidual) ||
        maxPositionResidual > effectivePositionResidualTolerance ||
        !sourceChipHasRows ||
        !sourceChipHasAcceptedStatus ||
        sourceChipTitle.includes("posStatus=unchecked")
      ) {
        return {
          ok: false,
          reason: "retained_position_evidence_missing",
          expected: {
            minimumSampleCount: expectedPositionResidualSampleCount,
            status: "within_tolerance",
            maximumResidual: effectivePositionResidualTolerance,
            sourceChipRows: \`posRows=\${positionResidualSampleCount}\`,
            sourceChipStatus: "posStatus=within_tolerance",
          },
          actual: {
            positionResidualSampleCount,
            positionResidualStatus,
            positionResidualTolerance,
            maxPositionResidual,
            sourceChipTitle,
          },
          source,
          status: runtime.dom.replayStatus.textContent,
        };
      }
    }
    if (${proof.requiredInitialVelocityEvidence === true ? "true" : "false"}) {
      const initialVelocityResidualSampleCount = Number(
        runtime.dataset?.pathConstraintInitialVelocityResidualSampleCount ??
          runtime.dataset?.solverSummary?.pathConstraintInitialVelocityResidualSampleCount
      );
      const initialVelocityResidualStatus =
        runtime.dataset?.pathConstraintInitialVelocityResidualStatus ??
        runtime.dataset?.solverSummary?.pathConstraintInitialVelocityResidualStatus;
      const initialVelocityResidualTolerance = Number(
        runtime.dataset?.pathConstraintInitialVelocityResidualTolerance ??
          runtime.dataset?.solverSummary?.pathConstraintInitialVelocityResidualTolerance
      );
      const maxInitialVelocityResidual = Number(
        runtime.dataset?.maxPathConstraintInitialVelocityResidual ??
          runtime.dataset?.solverSummary?.maxPathConstraintInitialVelocityResidual
      );
      const effectiveInitialVelocityResidualTolerance = Number.isFinite(initialVelocityResidualTolerance)
        ? initialVelocityResidualTolerance
        : 1e-9;
      const sourceChipHasRows = sourceChipTitle.includes(
        \`initVelRows=\${initialVelocityResidualSampleCount}\`
      );
      const sourceChipHasAcceptedStatus = sourceChipTitle.includes("initVelStatus=within_tolerance");
      if (
        !Number.isFinite(initialVelocityResidualSampleCount) ||
        initialVelocityResidualSampleCount < 2 ||
        initialVelocityResidualStatus !== "within_tolerance" ||
        !Number.isFinite(maxInitialVelocityResidual) ||
        maxInitialVelocityResidual > effectiveInitialVelocityResidualTolerance ||
        !sourceChipHasRows ||
        !sourceChipHasAcceptedStatus ||
        sourceChipTitle.includes("initVelStatus=unchecked")
      ) {
        return {
          ok: false,
          reason: "initial_velocity_evidence_missing",
          expected: {
            minimumSampleCount: 2,
            status: "within_tolerance",
            maximumResidual: effectiveInitialVelocityResidualTolerance,
            sourceChipRows: \`initVelRows=\${initialVelocityResidualSampleCount}\`,
            sourceChipStatus: "initVelStatus=within_tolerance",
          },
          actual: {
            initialVelocityResidualSampleCount,
            initialVelocityResidualStatus,
            initialVelocityResidualTolerance,
            maxInitialVelocityResidual,
            sourceChipTitle,
          },
          source,
          status: runtime.dom.replayStatus.textContent,
        };
      }
    }
    if (${proof.requiredBoundaryResidualEvidence === true ? "true" : "false"}) {
      const boundaryResidualSampleCount = Number(
        runtime.dataset?.pathConstraintBoundaryResidualSampleCount ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryResidualSampleCount
      );
      const boundaryResidualStatus =
        runtime.dataset?.pathConstraintBoundaryResidualStatus ??
        runtime.dataset?.solverSummary?.pathConstraintBoundaryResidualStatus;
      const boundaryResidualTolerance = Number(
        runtime.dataset?.pathConstraintBoundaryResidualTolerance ??
          runtime.dataset?.solverSummary?.pathConstraintBoundaryResidualTolerance
      );
      const maxBoundaryResidual = Number(
        runtime.dataset?.maxPathConstraintBoundaryResidual ??
          runtime.dataset?.solverSummary?.maxPathConstraintBoundaryResidual
      );
      const effectiveBoundaryResidualTolerance = Number.isFinite(boundaryResidualTolerance)
        ? boundaryResidualTolerance
        : Number.POSITIVE_INFINITY;
      const sourceChipHasRows = sourceChipTitle.includes(\`boundary=\${boundaryResidualSampleCount}\`);
      const sourceChipHasAcceptedStatus = sourceChipTitle.includes("bStatus=within_tolerance");
      if (
        !Number.isFinite(boundaryResidualSampleCount) ||
        boundaryResidualSampleCount <= 0 ||
        boundaryResidualStatus !== "within_tolerance" ||
        !Number.isFinite(maxBoundaryResidual) ||
        maxBoundaryResidual > effectiveBoundaryResidualTolerance ||
        !Number.isFinite(boundaryResidualTolerance) ||
        !sourceChipHasRows ||
        !sourceChipHasAcceptedStatus ||
        sourceChipTitle.includes("bStatus=unchecked")
      ) {
        return {
          ok: false,
          reason: "boundary_residual_evidence_missing",
          expected: {
            minimumSampleCount: 1,
            status: "within_tolerance",
            maximumResidual: effectiveBoundaryResidualTolerance,
            finiteTolerance: true,
            sourceChipRows: \`boundary=\${boundaryResidualSampleCount}\`,
            sourceChipStatus: "bStatus=within_tolerance",
          },
          actual: {
            boundaryResidualSampleCount,
            boundaryResidualStatus,
            boundaryResidualTolerance,
            maxBoundaryResidual,
            sourceChipTitle,
          },
          source,
          status: runtime.dom.replayStatus.textContent,
        };
      }
    }
    if (${proof.requiredTurnbackPaths === true ? "true" : "false"}) {
      const getPoint = (kind, depth) => runtime.dataset.history?.[kind]?.find(
        (point) => Number(point.depth) === Number(depth)
      );
      const getFinalPoint = (kind) => {
        const rows = runtime.dataset.history?.[kind] ?? [];
        return rows.reduce((best, point) => {
          if (!best || Number(point.depth) > Number(best.depth)) {
            return point;
          }
          return best;
        }, null);
      };
      const red1 = getPoint("positrino", 1);
      const red4 = getPoint("positrino", 4);
      const redFinal = getFinalPoint("positrino");
      const blue1 = getPoint("electrino", 1);
      const blue4 = getPoint("electrino", 4);
      const blueFinal = getFinalPoint("electrino");
      const finalSeparation = redFinal && blueFinal
        ? Math.hypot(Number(redFinal.x) - Number(blueFinal.x), Number(redFinal.y) - Number(blueFinal.y))
        : Number.NaN;
      const turnSeparation = red4 && blue4
        ? Math.hypot(Number(red4.x) - Number(blue4.x), Number(red4.y) - Number(blue4.y))
        : Number.NaN;
      const minimumFinalSeparation = ${JSON.stringify(proof.minimumFinalSeparation ?? 0)};
      const ok =
        red1 &&
        red4 &&
        redFinal &&
        blue1 &&
        blue4 &&
        blueFinal &&
        Number(red1.y) < Number(blue1.y) &&
        Number(red4.y) > Number(blue4.y) &&
        Number(redFinal.y) < Number(red4.y) &&
        Number(blueFinal.y) > Number(blue4.y) &&
        Number(finalSeparation) < Number(turnSeparation) &&
        Number(finalSeparation) >= Number(minimumFinalSeparation);
      if (!ok) {
        return {
          ok: false,
          reason: "central_pair_paths_do_not_turn_back",
          red: { point1: red1, point4: red4, final: redFinal },
          blue: { point1: blue1, point4: blue4, final: blueFinal },
          finalSeparation,
          turnSeparation,
          minimumFinalSeparation,
          source,
          status: runtime.dom.replayStatus.textContent,
        };
      }
    }
    return {
      ok: true,
      preset: runtime.dataset.preset?.id,
      source,
      selected: link.label,
      status: runtime.dom.replayStatus.textContent,
      pathConstraintSolverStatus,
      pathConstraintSolverClaim,
      pathConstraintPhysicalBoundarySolverStatus,
      pathConstraintPhysicalBoundarySolverClaim,
      pathConstraintPhysicalBoundarySolverBlockingReason,
      maxBoundaryRelaxationResidualAfter,
      boundaryRelaxationResidualRatio,
      pathConstraintPositionResidualSampleCount:
        runtime.dataset?.pathConstraintPositionResidualSampleCount ??
        runtime.dataset?.solverSummary?.pathConstraintPositionResidualSampleCount,
      pathConstraintPositionResidualStatus:
        runtime.dataset?.pathConstraintPositionResidualStatus ??
        runtime.dataset?.solverSummary?.pathConstraintPositionResidualStatus,
      maxPathConstraintPositionResidual:
        runtime.dataset?.maxPathConstraintPositionResidual ??
        runtime.dataset?.solverSummary?.maxPathConstraintPositionResidual,
      readout: runtime.dom.readout.textContent,
    };
  })()`;
}

async function evaluate(cdp, sessionId, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(`evaluation failed: ${JSON.stringify(result.exceptionDetails)}`);
  }
  return result.result;
}

async function waitFor(callback, { timeoutMs, label }) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await callback()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for ${label}`);
}
