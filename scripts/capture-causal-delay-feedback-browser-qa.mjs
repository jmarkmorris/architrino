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
  "reference/priorities/causal-delay-feedback-app/browser-qa",
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
    id: "central-desktop",
    fileName: "central-pair-purple-1920x1080.png",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    query: "preset=accepted_tight_bright&canvas=architrinoPurple",
    replayTime: 0.26,
    wakeLabel: "blue 2 -> red 3",
    requiredDatasetSource: "central_solver_bridge_replay",
    settingsOpen: false,
  },
  {
    id: "central-retained-edit",
    fileName: "central-retained-edit-purple-1920x1080.png",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    query: "preset=accepted_tight_bright&canvas=architrinoPurple",
    replayTime: 0.26,
    wakeLabel: "blue 2 -> red 3",
    requiredDatasetSource: "central_solver_bridge_replay",
    requiredReplayStatus: "solver guided replay",
    requiredPathConstraintSolverStatus: "guided_constraint_path",
    settingsOpen: false,
    prepareAction: {
      type: "retained-point-drag",
      kind: "electrino",
      depth: 3,
      delta: { x: 46, y: -34 },
    },
  },
  {
    id: "central-initial-position-edit",
    fileName: "central-initial-position-edit-purple-1920x1080.png",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    query: "preset=accepted_tight_bright&canvas=architrinoPurple",
    replayTime: 0.26,
    wakeLabel: "blue 2 -> red 3",
    requiredDatasetSource: "central_solver_bridge_replay",
    requiredReplayStatus: "solver guided replay",
    requiredPathConstraintSolverStatus: "guided_constraint_path",
    settingsOpen: false,
    prepareAction: {
      type: "retained-point-drag",
      kind: "positrino",
      depth: 1,
      delta: { x: 34, y: -19 },
      requiredInitialConditionDelta: { x: 34, y: -19 },
    },
  },
  {
    id: "central-final-position-edit",
    fileName: "central-final-position-edit-purple-1920x1080.png",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    query: "preset=accepted_tight_bright&canvas=architrinoPurple",
    replayTime: 0.91,
    wakeLabel: "red 5 -> blue 6",
    requiredDatasetSource: "central_solver_bridge_replay",
    requiredReplayStatus: "solver guided replay",
    requiredPathConstraintSolverStatus: "guided_constraint_path",
    settingsOpen: false,
    prepareAction: {
      type: "retained-point-drag",
      kind: "electrino",
      depth: 6,
      delta: { x: -32, y: 23 },
      requiredHistoryPointDelta: { x: -32, y: 23 },
      requiredFinalHistoryDepth: true,
    },
  },
  {
    id: "central-initial-velocity-edit",
    fileName: "central-initial-velocity-edit-purple-1920x1080.png",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    query: "preset=accepted_tight_bright&canvas=architrinoPurple",
    replayTime: 0.26,
    wakeLabel: "blue 2 -> red 3",
    requiredDatasetSource: "central_solver_bridge_replay",
    requiredReplayStatus: "solver pair replay",
    settingsOpen: false,
    prepareAction: {
      type: "initial-velocity-drag",
      kind: "positrino",
      delta: { x: 34, y: -20 },
    },
  },
  {
    id: "desktop",
    fileName: "contrast-stress-purple-1920x1080.png",
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    query: "preset=contrast_stress&replay=mock&canvas=architrinoPurple",
    replayTime: 0.26,
    wakeLabel: "blue 2 -> red 3",
    settingsOpen: true,
  },
  {
    id: "portrait",
    fileName: "contrast-stress-purple-390x844.png",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    query: "preset=contrast_stress&replay=mock&canvas=architrinoPurple",
    replayTime: 0.075,
    wakeLabel: "red 1 -> blue 2",
    settingsOpen: true,
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
  console.log("  --proof=ID         Capture only desktop or portrait.");
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
  let nextId = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
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
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: proof.width,
    height: proof.height,
    deviceScaleFactor: proof.deviceScaleFactor,
    mobile: proof.id === "portrait",
  }, sessionId);
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
  const prepared = await evaluate(cdp, sessionId, createPrepareProofExpression(proof));
  if (!prepared.value?.ok) {
    throw new Error(`failed to prepare ${proof.id} proof: ${JSON.stringify(prepared.value)}`);
  }
  await cdp.send("Page.bringToFront", {}, sessionId);
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  }, sessionId);
  await writeFile(outputPath, Buffer.from(data, "base64"));
  await cdp.send("Target.closeTarget", { targetId });
}

function createPrepareProofExpression(proof) {
  return `(async () => {
    const runtime = window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__;
    if (!runtime) {
      return { ok: false, reason: "runtime_missing" };
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
    const link =
      runtime.dataset.wakeLinks.find((candidate) => candidate.label === ${JSON.stringify(proof.wakeLabel)}) ||
      runtime.dataset.wakeLinks[0];
    if (!link) {
      return { ok: false, reason: "wake_link_missing" };
    }
    runtime.selectedItem = { type: "wake", linkId: link.id };
    runtime.dom.settingsPanel.hidden = ${proof.settingsOpen === false ? "true" : "false"};
    runtime.dom.settingsButton.setAttribute(
      "aria-expanded",
      ${proof.settingsOpen === false ? JSON.stringify("false") : JSON.stringify("true")}
    );
    runtime.updateReadout(runtime.createWakeHit(link, 0));
    runtime.render(runtime.getCurrentReplayTime());
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
    const requiredReplayStatus = ${JSON.stringify(proof.requiredReplayStatus ?? "")};
    if (requiredReplayStatus && runtime.dom.replayStatus.textContent !== requiredReplayStatus) {
      return {
        ok: false,
        reason: "replay_status_mismatch",
        expected: requiredReplayStatus,
        actual: runtime.dom.replayStatus.textContent,
        source,
      };
    }
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
    return {
      ok: true,
      preset: runtime.dataset.preset?.id,
      source,
      selected: link.label,
      status: runtime.dom.replayStatus.textContent,
      pathConstraintSolverStatus,
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
