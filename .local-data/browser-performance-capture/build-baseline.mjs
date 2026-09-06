import fs from "node:fs";
import crypto from "node:crypto";
import { fingerprintSourceClosure } from "../../scripts/check-browser-performance-budget.mjs";
const ROOT = process.cwd();
const cap = ".local-data/browser-performance-capture/";
const fb = JSON.parse(fs.readFileSync(cap + "feedback-probe.json", "utf8"));
const ph = JSON.parse(fs.readFileSync(cap + "photon-probe.json", "utf8"));
const gate = JSON.parse(fs.readFileSync("reference/priorities/aaa-operations/evidence/feedback-webapp-release-gate-2026-09-06.json", "utf8"));
const sha = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const instrument = ["scripts/dev/browser-performance-probe.html", "scripts/dev/BrowserPerformanceProbe.js"].map((p) => ({ path: p, bytes: fs.statSync(p).size, sha256: sha(p) }));
const gateFiles = gate.sourceFiles.map((f) => f.path);
if (gateFiles[0] !== "feedback.html" || gateFiles.length !== 15) throw new Error("unexpected release-gate closure");
const fbPaths = [...gateFiles, "content/scenes/scenes_index.json", "content/markdown/markdown_index.json", "content/graph/scene_graph.json"];
const fbLoaded = new Set(fb.launch.cold.resources.map((r) => r.path.slice(1)));
for (const p of fbPaths.slice(1)) if (!fbLoaded.has(p)) throw new Error("feedback path not loaded: " + p);
if (fbLoaded.size !== 17) throw new Error("feedback loaded count " + fbLoaded.size);
const phPaths = ["photon.html", ...ph.launch.cold.resourcePaths.map((p) => p.slice(1))];
if (phPaths.length !== 38) throw new Error("photon path count " + phPaths.length);
const fp = (paths) => { const r = fingerprintSourceClosure(ROOT, paths); return { files: r.files, bytes: r.bytes, sha256: r.sha256, paths }; };
const processMethod = "macOS ps RSS samples of the measuring browser's identified GPU process before and during the foreground 4K profile";
const gpuBase = 141264 * 1024, gpuActive = 152224 * 1024;
const evidence = {
  schema: "architrino.browser-performance-evidence.v1",
  status: "passed_pre_release",
  productionMutation: false,
  measuredAtUtc: ph.measuredAtUtc,
  measurementBoundary: "Both profiles were re-captured in full on 2026-09-06 against the current sources; no figure is carried forward from the 2026-09-01 baseline. The public-feedback-interaction profile was re-measured because its load-time closure grew from four files to the fifteen accepted in the release gate on 2026-09-05 (the shared control strip and scene-search stack) and because two of its three shared content indexes were regenerated on 2026-09-05; its source closure now lists all fifteen release-gate files plus the three public manifests the page fetches, eighteen paths. The photon-4k-visual profile was re-measured because its source fingerprint drifted after shared runtime changes. The instrument was updated on 2026-09-06: BrowserPerformanceProbe.js previously waited for the status text 'Manifest ready', and the feedback page has said 'Diagnostic details ready' since 2026-09-05; the probe now accepts either wording. The instrument followed the page, not the reverse, and its current hashes are recorded below. Each cold profile used a loopback port the measuring browser had never opened; every cold resource transferred its full encoded size, and the warm reload shows 304 validations, which corroborates the fresh-origin claim. The GPU-process envelope was sampled from the measuring browser's own GPU process, so it is a shared-process envelope across every page that browser had open, not a per-page figure; the active sample was taken during a second foreground load of /photon.html on the same origin, viewport, and DPR immediately after the recorded probe run, because the recorded run completed before the sample could be taken.",
  environment: {
    browser: "Google Chrome 152.0.7977.76 on macOS (operator's browser), DevTools device toolbar in Responsive mode with device type Desktop and device pixel ratio forced to 1; the built-in Cowork browser pane and the Codex in-app browser were rejected as capture surfaces because the former does not fire requestAnimationFrame and the latter cannot set device pixel ratio",
    platform: "macOS",
    server: "scripts/dev/start-local-dev.mjs with EOM_BORG_SHADOW=0 and one fresh loopback port per cold profile (127.0.0.1:59378 for feedback, 127.0.0.1:59379 for photon)",
    cacheBoundary: "Cold values use the first app load on a fresh loopback origin. Warm values use an identical same-origin reload with the development server's HTTP validation behavior retained.",
    claimBoundary: "These are local pre-release measurements on one Chromium 152 browser and one host. They establish current regression budgets, not global user latency, network transfer, exact per-page GPU allocation, production performance, or hosting cost.",
    captureRecords: "Raw probe outputs and ps samples were kept in the untracked .local-data/browser-performance-capture/ directory at capture time.",
  },
  instrumentSources: instrument,
  profiles: {
    "public-feedback-interaction": {
      status: "passed", route: fb.route, measuredAtUtc: fb.measuredAtUtc, userAgent: fb.userAgent, viewport: fb.viewport,
      launch: {
        cold: { originWasFresh: true, loadEventEndMs: fb.launch.cold.loadEventEndMs, transferBytes: fb.launch.cold.transferBytes, encodedBytes: fb.launch.cold.encodedBytes, resourceCount: fb.launch.cold.resourceCount },
        warm: { sameOriginReload: true, loadEventEndMs: fb.launch.warm.loadEventEndMs, transferBytes: fb.launch.warm.transferBytes, encodedBytes: fb.launch.warm.encodedBytes, resourceCount: fb.launch.warm.resourceCount },
      },
      interaction: { id: fb.interaction.id, status: fb.interaction.status, nextPaintMs: fb.interaction.nextPaintMs },
      frameTiming: { samples: fb.frameTiming.samples, p95Ms: fb.frameTiming.p95Ms, medianFps: fb.frameTiming.medianFps, intervalsOver33_34Ms: fb.frameTiming.intervalsOver33_34Ms },
      heap: { supported: true, warmAfterFramesUsedBytes: fb.heap.warmAfterFrames.usedBytes, frameWindowGrowthBytes: fb.heap.frameWindowGrowthBytes },
      storage: fb.storage,
      resourceCountNote: "The 17 load-time resources are the fourteen code files after the HTML navigation (ten JavaScript modules, three stylesheets, ui-tokens.css) plus the three public manifests fetched by the runtime.",
    },
    "photon-4k-visual": {
      status: "passed", route: ph.route, measuredAtUtc: ph.measuredAtUtc, userAgent: ph.userAgent, viewport: ph.viewport,
      launch: {
        cold: { originWasFresh: true, loadEventEndMs: ph.launch.cold.loadEventEndMs, transferBytes: ph.launch.cold.transferBytes, encodedBytes: ph.launch.cold.encodedBytes, resourceCount: ph.launch.cold.resourceCount },
        warm: { sameOriginReload: true, loadEventEndMs: ph.launch.warm.loadEventEndMs, transferBytes: ph.launch.warm.transferBytes, encodedBytes: ph.launch.warm.encodedBytes, resourceCount: ph.launch.warm.resourceCount },
      },
      frameTiming: { samples: ph.frameTiming.samples, p95Ms: ph.frameTiming.p95Ms, medianFps: ph.frameTiming.medianFps, intervalsOver33_34Ms: ph.frameTiming.intervalsOver33_34Ms },
      heap: { supported: true, warmAfterFramesUsedBytes: ph.heap.warmAfterFrames.usedBytes, frameWindowGrowthBytes: ph.heap.frameWindowGrowthBytes, note: "Negative frame-window growth is a garbage collection during the sample window; used heap fell from 54354345 to 40220575 bytes." },
      gpuSurfaceProxy: { method: ph.gpuSurfaceProxy.method, surfaceCount: ph.gpuSurfaceProxy.surfaceCount, minimumSurfaceBytes: ph.gpuSurfaceProxy.minimumSurfaceBytes },
      storage: ph.storage,
    },
  },
  gpuProcess: {
    method: processMethod,
    sharedProcessBoundaryAcknowledged: true,
    browser: "Google Chrome Helper --type=gpu-process, Chrome 152.0.7977.76",
    processIdAtMeasurement: 44833,
    samples: 2,
    baselineResidentBytes: gpuBase,
    activeResidentBytes: [gpuActive],
    peakResidentBytes: gpuActive,
    peakGrowthBytes: gpuActive - gpuBase,
    sampleNote: "ps reports RSS in KiB; 141264 and 152224 KiB multiplied by 1024.",
  },
  sourceClosures: { "public-feedback-interaction": fp(fbPaths), "photon-4k-visual": fp(phPaths) },
};
const out = "reference/priorities/aaa-operations/evidence/browser-performance-baseline-2026-09-06.json";
fs.writeFileSync(out, JSON.stringify(evidence, null, 2) + "\n");
console.log(JSON.stringify({ instrument, fb: { files: evidence.sourceClosures["public-feedback-interaction"].files, bytes: evidence.sourceClosures["public-feedback-interaction"].bytes }, ph: { files: evidence.sourceClosures["photon-4k-visual"].files, bytes: evidence.sourceClosures["photon-4k-visual"].bytes }, gpu: evidence.gpuProcess }, null, 1));
