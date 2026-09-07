// Serial subject-side composition. Only the frozen, fresh ledger CLI supplies
// mathematical phase acceptance. This pilot never supplies H3 authorization.
import { createHash, randomUUID } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, mkdirSync, openSync, readSync,
  realpathSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Worker } from "node:worker_threads";

const SELF = "scripts/eom/run-subfield-circular-root-pilot.mjs";
const BASE = ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/";
const BUILD = `${BASE}recorded-build-20260827-v2/preparation.json`;
const BUILD_SHA = "be6f2e43cc2c608a568d128c79535eacc628ea80cfc62cfe273af7c434243866";
const HELPER = "src/prescribed-path-analysis/SubfieldCircularPhaseProcess.mjs";
const BRIDGE = "src/prescribed-path-analysis/SubfieldCircularPhaseLedgerWorker.mjs";
const WATCH = "scripts/eom/prepare-f5-enclosed-root.mjs";
const LEDGER = "src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs";
const LEDGER_CLI = "scripts/eom/reduce-subfield-circular-root-ledger.mjs";
const PROOF = "scripts/eom/verify-subfield-circular-history.mjs";
const PINS = Object.freeze({
  [HELPER]: "1b96160ceee1d9a98374d84e9f15b1823572486a6b53546d922294a51cd3d982",
  [BRIDGE]: "00cd8290a9929e0e099c91aeff03c52cf06ec5d9cad329ffad00092c61815e02",
  [WATCH]: "4380a302ec39f8307415a7f4340c1ef0f3bb4766c378a853133f89b45c34a3a9",
  [LEDGER]: "1b146e7efbc05f000f37d313f8e5ee353e802ddf00738dbcdaa543165f001bb8",
  [LEDGER_CLI]: "2b3eb236b561c1901e6dfc58603f97f1104fc045e79d2d7a10d8879da02fd60a",
  [PROOF]: "b2fc83aa828ac9f175d7c3ae7bf43b66fcda54a702de6f2f80812852aebd5f38",
});
export const PILOT_CANDIDATES = Object.freeze(["coincident-midpoint-common-frequency", "coincident-midpoint-equal-radius-common-frequency", "coincident-midpoint-3-2-1-frequency", "phase-compensated-equal-geometry", "axially-separated-common-frequency", "axially-separated-equal-radius-common-frequency", "axially-separated-3-2-1-frequency", "axial-transverse-coincident-axis-interior", "high-axial-coincident-axis-interior", "planar-common-center-three-binary", "coincident-center-two-component-circular-co-rotating", "coincident-center-two-component-circular-counter-rotating", "coaxial-separated-two-component-circular-co-rotating", "coaxial-separated-two-component-circular-counter-rotating", "coaxial-separated-two-planar-braid-co-rotating", "coaxial-separated-two-planar-braid-counter-rotating"]);
const LIMIT_MS = 1800000, HEARTBEAT_MS = 15000, MAX_FILE = 128 * 1024 * 1024;
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const demand = (condition, message) => { if (!condition) throw new Error(message); };
const jsonWrite = (filename, value) => writeFileSync(filename, JSON.stringify(value) + "\n", { flag: "wx" });
const absolute = (root, filename) => path.resolve(root, filename);

function regularBytes(filename, maximum = MAX_FILE) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd);
    demand(before.isFile() && before.size <= maximum, `bounded regular file required: ${filename}`);
    const chunks = []; let length = 0;
    for (;;) {
      const chunk = Buffer.allocUnsafe(Math.min(65536, maximum + 1 - length));
      const count = readSync(fd, chunk, 0, chunk.length, length);
      if (!count) break;
      length += count; demand(length <= maximum, `file grew beyond limit: ${filename}`);
      chunks.push(chunk.subarray(0, count));
    }
    const after = fstatSync(fd);
    demand(length === before.size && after.size === before.size && after.mtimeMs === before.mtimeMs &&
      after.ctimeMs === before.ctimeMs, `file changed while reading: ${filename}`);
    return Buffer.concat(chunks, length);
  } finally { closeSync(fd); }
}

function bind(root, record) {
  const filename = absolute(root, record.path), fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  let actual;
  try {
    const before = fstatSync(fd), digest = createHash("sha256"), buffer = Buffer.allocUnsafe(65536);
    demand(before.isFile() && before.size <= 2 * 1024 ** 3, `bounded regular binding file required: ${filename}`);
    let length = 0;
    for (;;) {
      const count = readSync(fd, buffer, 0, buffer.length, length);
      if (!count) break;
      length += count; demand(length <= 2 * 1024 ** 3, `binding grew beyond 2 GiB: ${filename}`);
      digest.update(buffer.subarray(0, count));
    }
    const after = fstatSync(fd);
    demand(length === before.size && after.size === before.size && after.mtimeMs === before.mtimeMs &&
      after.ctimeMs === before.ctimeMs, `binding changed while reading: ${filename}`);
    actual = { path: record.path, realPath: realpathSync(filename), sha256: digest.digest("hex"), bytes: length };
  } finally { closeSync(fd); }
  for (const field of ["sha256", "realPath", "bytes"]) {
    if (record[field] !== undefined) demand(actual[field] === record[field], `${field} changed: ${record.path}`);
  }
  return actual;
}

export function parsePilotArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index], value = argv[index + 1];
    demand(["--out", "--runner-sha256"].includes(flag) && value && !value.startsWith("--") && !result[flag],
      "usage: --out NEW-SUBFIELD-CIRCULAR-DIRECTORY --runner-sha256 REVIEWED-SHA256");
    result[flag] = value;
  }
  demand(typeof result["--out"] === "string" && /^[0-9a-f]{64}$/u.test(result["--runner-sha256"] ?? ""),
    "new output directory and externally reviewed runner SHA-256 are required");
  const output = result["--out"];
  demand(output.startsWith(BASE) && output.length > BASE.length && !path.isAbsolute(output) && !output.includes("\\") &&
    output.split("/").every(part => part && part !== "." && part !== ".."), "output must be a new relative child of the sub-field circular run lane");
  return { output, runnerSha256: result["--runner-sha256"] };
}

export function pilotSchedule() {
  return PILOT_CANDIDATES.flatMap((candidateId, index) => [0, 1].map(phase => {
    const memberCount = index < 10 ? 6 : 12;
    return { candidateId, rung: 2, phase, receptionTime: String(4 + phase * 2), memberCount,
      rowCount: memberCount ** 2, ordinaryRootCount: memberCount * (memberCount - 1), selfEndpointCount: memberCount };
  }));
}

export function pilotProjection(phaseSeconds) {
  demand(Array.isArray(phaseSeconds) && phaseSeconds.length === 2 && phaseSeconds.every(value => Number.isFinite(value) && value >= 0),
    "both measured end-to-end phase times are required");
  const projected128PhaseSeconds = 128 * Math.max(...phaseSeconds);
  return { projected128PhaseSeconds, estimateOnly: true, resourcePlanRequired: projected128PhaseSeconds > 1800,
    laterLadderAuthorized: false };
}

export function parseMacProfile(text) {
  const clocks = [...text.matchAll(/^\s*(\d+(?:\.\d+)?)\s+real\s+(\d+(?:\.\d+)?)\s+user\s+(\d+(?:\.\d+)?)\s+sys\s*$/gmu)];
  const rss = [...text.matchAll(/^\s*(\d+)\s+maximum resident set size\s*$/gmu)];
  demand(clocks.length === 1 && rss.length === 1, "one complete /usr/bin/time -l profile is required; missing measurements are not zero");
  const result = { childWallSeconds: Number(clocks[0][1]), childUserSeconds: Number(clocks[0][2]),
    childSystemSeconds: Number(clocks[0][3]), maximumIndividualProcessResidentBytes: Number(rss[0][1]),
    instrument: "/usr/bin/time -l", rssScope: "maximum-observed-individual-process-high-water-not-aggregate-simultaneous-memory" };
  demand(Object.values(result).filter(value => typeof value === "number").every(Number.isFinite) &&
    Number.isSafeInteger(result.maximumIndividualProcessResidentBytes) && result.maximumIndividualProcessResidentBytes > 0,
    "invalid measured profiler values");
  return result;
}

export function rowDispositions(schedule, phases) {
  return schedule.map((expected, index) => {
    const phase = phases[index], completed = phase?.status === "phase-ledger-accepted";
    const dispatched = phase?.process?.dispatchedRows ?? 0;
    demand(Number.isSafeInteger(dispatched) && dispatched >= 0 && dispatched <= expected.rowCount, "invalid dispatched row census");
    const ranges = completed ? [{ from: 0, count: expected.rowCount, disposition: "passed" }] : [
      ...(dispatched ? [{ from: 0, count: dispatched, disposition: "failed", reason: "attempted-but-phase-not-independently-accepted; not-a-geometry-rejection" }] : []),
      ...(dispatched < expected.rowCount ? [{ from: dispatched, count: expected.rowCount - dispatched, disposition: "not-run" }] : []),
    ];
    return { candidateId: expected.candidateId, rung: 2, phase: expected.phase, pairOrder: "receiver-major-transmitter-minor", ranges };
  });
}

export function validatePilotProof(proof, expected, manifest) {
  demand(proof.schema === "braid-program/subfield-circular-history-conformance.v1" && proof.accepted === true &&
    proof.actualCarrierValidated === true && proof.h3EvidenceEligible === false &&
    proof.authority === "source-bound-whole-manifest-analytic-conformance-only" && proof.normalizedFieldSpeed === "1" &&
    proof.manifestPath === manifest.path && proof.manifestSha256 === manifest.sha256 &&
    proof.execution?.mode === "captured-source-worker", "whole-history proof authority or identity differs");
  for (const field of ["candidateId", "rung", "phase", "receptionTime", "memberCount"]) demand(proof[field] === expected[field], `proof ${field} differs`);
  demand(proof.segmentCount === expected.memberCount * 1000 && proof.members?.length === expected.memberCount,
    "whole-history proof census differs");
  for (const relative of [PROOF, "src/prescribed-path-analysis/CircularHistoryConformance.mjs", "scripts/eom/derive-subfield-circular-root-reference.mjs"]) {
    const bound = proof.bindings?.filter(record => record.path === relative);
    demand(bound?.length === 1 && (relative !== PROOF || bound[0].sha256 === PINS[PROOF]), "proof generation is incomplete");
    demand(proof.execution.sourceBindings?.some(record => record.path === relative && record.sha256 === bound[0].sha256), "proof executed generation differs");
  }
}

export function validatePilotPhase(receipt, expected, bindings) {
  demand(receipt.schema === "braid-program/subfield-circular-root-phase-reduction.v1" && receipt.accepted === true &&
    receipt.h3EvidenceEligible === false && receipt.rootExecutionAuthorized === false &&
    receipt.authority === "source-byte-build-bound-independent-phase-ledger-only", "phase ledger authority differs");
  for (const field of ["candidateId", "rung", "phase", "receptionTime", "memberCount", "rowCount", "ordinaryRootCount", "selfEndpointCount"])
    demand(receipt[field] === expected[field], `phase ledger ${field} differs`);
  for (const field of ["historyManifest", "conformance", "buildReceipt", "rawRows", "reducer", "cli"])
    demand(receipt[field]?.path === bindings[field].path && receipt[field]?.sha256 === bindings[field].sha256, `phase ledger ${field} binding differs`);
  demand(receipt.rawRows.rowCount === expected.rowCount && receipt.rawRows.bytes === bindings.rawRows.bytes &&
    receipt.manifestId === bindings.manifestId, "phase raw census or manifest ID differs");
}

export function validatePilotSummary(receipt, phaseReceipts) {
  demand(receipt.schema === "braid-program/subfield-circular-root-summary-reduction.v1" && receipt.accepted === true &&
    receipt.h3EvidenceEligible === false && receipt.rootExecutionAuthorized === false &&
    receipt.authority === "authenticated-phase-summary-chain-only" && receipt.scope === "pilot" &&
    receipt.phaseCount === 32 && receipt.rowCount === 2448 && receipt.ordinaryRootCount === 2184 && receipt.selfEndpointCount === 264 &&
    JSON.stringify(receipt.candidateIds) === JSON.stringify(PILOT_CANDIDATES), "pilot summary authority or complete census differs");
  demand(receipt.phaseReceipts?.length === 32 && phaseReceipts.length === 32, "pilot needs all 32 phase receipts");
  const schedule = pilotSchedule();
  receipt.phaseReceipts.forEach((record, index) => {
    demand(record.path === phaseReceipts[index].path && record.sha256 === phaseReceipts[index].sha256,
      "pilot phase receipt chain differs");
    for (const field of ["candidateId", "rung", "phase", "rowCount"]) demand(record[field] === schedule[index][field], "pilot phase order differs");
  });
  demand(receipt.phaseReceiptChainSha256 === sha(Buffer.from(phaseReceipts.map(record => record.sha256).join("\n") + "\n")), "pilot chain digest differs");
}

// Potentially expensive filesystem work is isolated from the watchdog's event
// loop. The worker imports these exact captured runner bytes, not a disk module.
export function pilotFileOperation(job) {
  if (job.kind === "build") {
    const bytes = regularBytes(absolute(job.root, BUILD));
    demand(sha(bytes) === BUILD_SHA, "reviewed build receipt bytes differ");
    const build = JSON.parse(bytes);
    demand(build.schema === "braid-program/subfield-circular-root-build.v1" && build.status === "build-recorded-pending-independent-review" &&
      build.rootExecutionAuthorized === false && build.h3EvidenceEligible === false && build.rootCalls === 0,
      "build receipt authority differs");
    for (const field of ["sources", "references", "tools", "headerDependencies", "externalLibraries"])
      demand(JSON.stringify(build[`${field}Before`]) === JSON.stringify(build[`${field}After`]), `build ${field} changed`);
    demand(build.stages.every(stage => stage.code === 0 && stage.signal === null && !stage.timedOut && !stage.interrupted &&
      !stage.descendantsAfterClose && stage.processGroupClosed), "recorded build has unclosed or failed stages");
    const collected = new Map();
    function visit(value) {
      if (!value || typeof value !== "object") return;
      if (typeof value.path === "string" && /^[0-9a-f]{64}$/u.test(value.sha256 ?? "")) {
        const key = value.path;
        if (collected.has(key)) demand(collected.get(key).sha256 === value.sha256, "contradictory build binding");
        else collected.set(key, value);
      }
      for (const nested of Object.values(value)) visit(nested);
    }
    visit(build);
    const checked = [...collected.values()].map(record => bind(job.root, record));
    const fast = [...build.sourcesBefore, ...build.referencesBefore, ...build.toolsBefore,
      ...build.externalLibrariesBefore, ...Object.values(build.built),
      ...build.runtimeDependencies.filter(record => record.status === "file-hashed")];
    const result = { buildReceipt: { path: absolute(job.root, BUILD), sha256: BUILD_SHA },
      checkedBindingCount: checked.length, built: build.built, fastBindings: fast,
      platformDependencyBoundary: build.runtimeDependencies.filter(record => record.status !== "file-hashed") };
    if (job.out) jsonWrite(job.out, { ...result, checkedBindings: checked });
    return result;
  }
  if (job.kind === "files") {
    return job.files.map(record => {
      const binding = bind(job.root, record), result = { ...binding };
      if (record.json || record.profile) {
        const bytes = regularBytes(absolute(job.root, record.path), record.profile ? 64 * 1024 * 1024 : 2 * 1024 * 1024);
        demand(sha(bytes) === binding.sha256, "file changed after binding");
        if (record.json) result.value = JSON.parse(bytes);
        if (record.profile) result.profile = parseMacProfile(bytes.toString("utf8"));
      }
      return result;
    });
  }
  throw new Error("unknown pilot file operation");
}

export async function watchedPilotFileOperation(job, { runnerBytes, runnerSha256, limitMs, signal }) {
  demand(sha(runnerBytes) === runnerSha256 && Number.isSafeInteger(limitMs) && limitMs > 0, "captured worker source/deadline required");
  const worker = new Worker(`const {parentPort,workerData}=require('node:worker_threads');const {createHash}=require('node:crypto');
    (async()=>{const bytes=Buffer.from(workerData.bytes);if(createHash('sha256').update(bytes).digest('hex')!==workerData.hash)throw Error('worker source mismatch');
    const module=await import('data:text/javascript;base64,'+bytes.toString('base64'));parentPort.postMessage({result:module.pilotFileOperation(workerData.job)});
    })().catch(error=>parentPort.postMessage({failure:String(error.message)}));`,
  { eval: true, execArgv: [], workerData: { bytes: runnerBytes, hash: runnerSha256, job } });
  const started = performance.now(); let timer, abort;
  try {
    const result = await new Promise((resolve, reject) => {
      abort = () => reject(signal?.reason ?? new Error("pilot file operation interrupted"));
      timer = setTimeout(() => reject(new Error("pilot file operation deadline exceeded")), limitMs);
      signal?.addEventListener("abort", abort, { once: true });
      worker.once("message", message => message.failure ? reject(new Error(message.failure)) : resolve(message.result));
      worker.once("error", reject); worker.once("exit", code => reject(new Error(`pilot file worker exited without receipt (${code})`)));
      if (signal?.aborted) abort();
    });
    demand(performance.now() - started < limitMs && !signal?.aborted, "pilot file operation exceeded deadline");
    return result;
  } finally { await worker.terminate(); clearTimeout(timer); signal?.removeEventListener("abort", abort); }
}

// A small closed loader preserves file URLs needed by the frozen process watcher
// while making the actual module generation come from the captured byte buffer.
export function installPilotSnapshot(sources, root) {
  const marker = `?subfield-circular-pilot-snapshot=${randomUUID()}`;
  const entries = new Map(sources.map(record => [pathToFileURL(absolute(root, record.path)).href + marker, record]));
  for (const record of entries.values()) demand(sha(record.bytes) === record.sha256, "pilot snapshot hash differs");
  const hooks = registerHooks({
    resolve(specifier, context, next) {
      if (entries.has(specifier)) return { url: specifier, format: "module", shortCircuit: true };
      if (context.parentURL?.endsWith(marker) && !specifier.startsWith("node:")) throw new Error("uncaptured pilot module dependency");
      return next(specifier, context);
    },
    load(url, context, next) {
      const record = entries.get(url);
      return record ? { format: "module", source: record.bytes, shortCircuit: true } : next(url, context);
    },
  });
  return { import: relative => import(pathToFileURL(absolute(root, relative)).href + marker), close: () => hooks.deregister() };
}

export async function runSerialSubfieldCircularPilot({ root, options, sources, runtime, startedAtMs = performance.now(), startedAt = new Date().toISOString() }) {
  const began = startedAtMs, abort = new AbortController();
  const elapsed = () => (performance.now() - began) / 1000;
  const remaining = () => {
    demand(!abort.signal.aborted, "pilot interrupted");
    const ms = Math.floor(LIMIT_MS - (performance.now() - began)); demand(ms > 0, "whole serial pilot deadline exceeded"); return ms;
  };
  const output = absolute(root, options.output), schedule = pilotSchedule();
  let ancestor = output; while (!existsSync(ancestor)) ancestor = path.dirname(ancestor);
  demand(realpathSync(ancestor) === ancestor && !existsSync(output), "pilot output must be new and not symlinked");
  mkdirSync(path.dirname(output), { recursive: true }); mkdirSync(output);
  const receipt = { schema: "braid-program/subfield-circular-serial-cost-pilot.v1", status: "incomplete", accepted: false,
    authority: "serial-pilot-operational-composition-only", h3EvidenceEligible: false, rootExecutionAuthorized: false,
    laterLadderAuthorized: false, startedAt, wallLimitSeconds: 1800, heartbeatSeconds: 15, workerCount: 1,
    sourceBindings: sources.map(({ bytes, ...record }) => record), buildReceipt: { path: absolute(root, BUILD), sha256: BUILD_SHA },
    buildReview: "external-independent-provenance-review-accepted; immutable-build-receipt-label-preserved",
    phases: [], candidates: [], stages: [], phaseReceipts: [], schedule,
    claimBoundary: "Two-phase prescribed-history pilot only. No H3, ordinary evolution, binding, retention, stability, score, or physical claim." };
  const self = sources.find(record => record.path === SELF);
  let activeWorker, currentStage = "initial-checks", currentPhase, failed;
  const signalHandler = () => { abort.abort(new Error("operator signal")); if (activeWorker) void activeWorker.close(); };
  process.on("SIGINT", signalHandler); process.on("SIGTERM", signalHandler);
  const heartbeat = setInterval(() => console.error(JSON.stringify({ schema: "braid-program/subfield-circular-serial-pilot-heartbeat.v1",
    stage: currentStage, candidateId: currentPhase?.candidateId, phase: currentPhase?.phase,
    elapsedWallSeconds: elapsed(), acceptedPhases: receipt.phaseReceipts.length, h3EvidenceEligible: false })), HEARTBEAT_MS);
  const deadline = setTimeout(() => { abort.abort(new Error("whole serial pilot deadline")); if (activeWorker) void activeWorker.close(); },
    Math.max(1, LIMIT_MS - (performance.now() - began)));
  const fileJob = job => watchedPilotFileOperation({ root, ...job }, { runnerBytes: self.bytes, runnerSha256: self.sha256,
    limitMs: remaining(), signal: abort.signal });
  const inspect = files => fileJob({ kind: "files", files });
  let fastBindings = [];
  const beforeStage = async stage => { currentStage = stage; remaining(); await inspect(fastBindings); remaining(); };
  const profiled = async (stage, command, args, directory) => {
    await beforeStage(stage);
    const logPath = path.join(directory, `${stage}.log`), started = elapsed();
    const item = { stage, startedAtSeconds: started, logPath }; receipt.stages.push(item);
    try { item.process = await runtime.runWatched("/usr/bin/time", ["-l", command, ...args],
      { cwd: root, logPath, stage, limitMs: remaining(), heartbeatMs: HEARTBEAT_MS, terminationGraceMs: 5000 }); }
    catch (error) { item.process = error.processResult; item.failure = error.message;
      // Profiling failure must not replace the original process failure. Retain
      // whatever the child actually emitted, and label absent measurements.
      try { const [log] = await inspect([{ path: logPath, profile: true }]); item.log = log; }
      catch (profileError) { item.measurementFailure = profileError.message; }
      throw error; }
    finally { item.finishedAtSeconds = elapsed(); }
    const [log] = await inspect([{ path: logPath, profile: true }]); item.log = log; remaining(); return item;
  };
  try {
    demand(process.platform === "darwin", "pilot requires measured macOS /usr/bin/time -l; no unmeasured fallback");
    demand(!process.env.NODE_OPTIONS && !process.env.DYLD_INSERT_LIBRARIES && !process.env.DYLD_LIBRARY_PATH &&
      !process.env.LD_PRELOAD && !process.env.LD_LIBRARY_PATH, "ambient runtime injection is not allowed");
    const build = await fileJob({ kind: "build", out: path.join(output, "build-bindings-before.json") });
    const observedRuntime = await inspect([{ path: process.execPath }, { path: "/usr/bin/time" },
      { path: "/System/Library/CoreServices/SystemVersion.plist" }]);
    const instruments = sources.map(({ bytes, ...record }) => record);
    fastBindings = [...build.fastBindings, ...instruments, ...observedRuntime,
      { path: BUILD, sha256: BUILD_SHA }];
    receipt.runtimeBindings = observedRuntime; receipt.nodeVersion = process.version; receipt.nodeVersions = process.versions;
    receipt.platformDependencyBoundary = build.platformDependencyBoundary;
    receipt.initialBindingCount = build.checkedBindingCount;
    receipt.sharedPreparationWallSeconds = elapsed();
    const executable = absolute(root, build.built.executable.path), node = process.execPath;
    const reducerBytes = sources.find(record => record.path === LEDGER).bytes;
    for (let candidateIndex = 0; candidateIndex < PILOT_CANDIDATES.length; candidateIndex++) {
      const candidateId = PILOT_CANDIDATES[candidateIndex], candidateStarted = elapsed(), usageStart = process.resourceUsage();
      const stageStart = receipt.stages.length, candidatePhases = [];
      const candidate = { candidateId, status: "incomplete", phases: candidatePhases }; receipt.candidates.push(candidate);
      try {
        for (const phase of [0, 1]) {
          const expected = schedule[candidateIndex * 2 + phase], phaseStarted = elapsed();
          const directory = path.join(output, `${candidateId}-T${expected.receptionTime}`); mkdirSync(directory);
          currentPhase = { ...expected, status: "incomplete", startedAtSeconds: phaseStarted, directory };
          receipt.phases.push(currentPhase); candidatePhases.push(currentPhase);
          const manifestPath = path.join(directory, "history-manifest.json"), conformancePath = path.join(directory, "history-conformance.json");
          const rawPath = path.join(directory, "rows.ndjson"), phaseReceiptPath = path.join(directory, "phase-ledger.json");
          const common = ["--repo-root", root, "--candidate", candidateId, "--rung", "2", "--phase", String(phase)];
          await profiled("manifest", executable, ["manifest", ...common, "--out", manifestPath], directory);
          const [manifest] = await inspect([{ path: manifestPath }]); currentPhase.historyManifest = manifest;
          await profiled("conformance", node, [absolute(root, PROOF), "--manifest", manifestPath, "--rung", "2", "--phase", String(phase), "--out", conformancePath], directory);
          const [conformance] = await inspect([{ path: conformancePath, json: true }]);
          validatePilotProof(conformance.value, expected, manifest);
          const proof = conformance.value; delete conformance.value; currentPhase.conformance = conformance;
          await beforeStage("isolated-ledger-context");
          activeWorker = await runtime.openSubfieldCircularPhaseLedgerWorker({ reducerBytes, reducerSha256: PINS[LEDGER],
            options: { repoRoot: root, historyManifest: manifestPath, conformance: conformancePath,
              conformanceSha256: conformance.sha256, buildReceipt: absolute(root, BUILD), buildReceiptSha256: BUILD_SHA },
            limitMs: remaining(), signal: abort.signal, progress: event => { currentStage = `ledger:${event.stage ?? "checking"}`; } });
          try {
            demand(activeWorker.identity.candidateId === candidateId && activeWorker.identity.phase === phase &&
              activeWorker.identity.rung === 2 && activeWorker.identity.manifestId === proof.manifestId &&
              activeWorker.identity.historyManifestSha256 === manifest.sha256 && activeWorker.identity.conformanceSha256 === conformance.sha256 &&
              activeWorker.identity.members.length === expected.memberCount, "isolated ledger identity differs");
            await beforeStage("root-rows");
            const stage = { stage: "root-rows", startedAtSeconds: elapsed() }; receipt.stages.push(stage);
            try {
              currentPhase.process = await runtime.runSubfieldCircularPhaseProcess({ command: "/usr/bin/time",
                args: ["-l", executable, "serve", ...common, "--history-manifest", manifestPath, "--conformance", conformancePath, "--out", rawPath],
                cwd: root, rawRowsPath: rawPath, stdoutLogPath: path.join(directory, "root-stdout.log"), stderrLogPath: path.join(directory, "root-stderr.log"),
                identity: activeWorker.identity, pairs: Array.from({ length: expected.rowCount }, (_, index) => [Math.floor(index / expected.memberCount), index % expected.memberCount]),
                checkRowBytes: (bytes, context) => activeWorker.checkRowBytes(bytes, context),
                limitMs: remaining(), heartbeatMs: HEARTBEAT_MS, terminationGraceMs: 5000 });
            } catch (error) { currentPhase.process = error.phaseReceipt; stage.failure = error.message;
              if (error.phaseReceipt?.stderrLog?.path) {
                try { const [log] = await inspect([{ path: error.phaseReceipt.stderrLog.path,
                  sha256: error.phaseReceipt.stderrLog.sha256, profile: true }]); stage.log = log; }
                catch (profileError) { stage.measurementFailure = profileError.message; }
              }
              throw error; }
            finally { stage.finishedAtSeconds = elapsed(); stage.process = currentPhase.process; }
            const [log] = await inspect([{ path: currentPhase.process.stderrLog.path, sha256: currentPhase.process.stderrLog.sha256, profile: true }]);
            stage.log = log;
            await activeWorker.recheck(expected.rowCount); remaining();
          } finally { await activeWorker.close(); activeWorker = undefined; }
          await profiled("phase-ledger", node, [absolute(root, LEDGER_CLI), "--repo-root", root,
            "--history-manifest", manifestPath, "--conformance", conformancePath, "--conformance-sha256", conformance.sha256,
            "--rows", rawPath, "--build-receipt", absolute(root, BUILD), "--build-receipt-sha256", BUILD_SHA, "--out", phaseReceiptPath], directory);
          const [phaseBinding, rawBinding] = await inspect([{ path: phaseReceiptPath, json: true },
            { path: rawPath, sha256: currentPhase.process.rawRows.sha256 }]);
          validatePilotPhase(phaseBinding.value, expected, { historyManifest: manifest, conformance,
            buildReceipt: { path: absolute(root, BUILD), sha256: BUILD_SHA }, rawRows: rawBinding,
            reducer: { path: LEDGER, sha256: PINS[LEDGER] }, cli: { path: LEDGER_CLI, sha256: PINS[LEDGER_CLI] }, manifestId: proof.manifestId });
          currentPhase.maximumPrecisionBits = phaseBinding.value.maximumPrecisionBits;
          delete phaseBinding.value; currentPhase.phaseReceipt = phaseBinding;
          currentPhase.status = "phase-ledger-accepted";
          jsonWrite(path.join(directory, "phase-process.json"), currentPhase);
          const [operational] = await inspect([{ path: path.join(directory, "phase-process.json") }]);
          currentPhase.operationalReceipt = operational; remaining();
          currentPhase.phaseWallSeconds = elapsed() - phaseStarted;
          receipt.phaseReceipts.push(phaseBinding);
        }
        Object.assign(candidate, pilotProjection(candidatePhases.map(phase => phase.phaseWallSeconds)));
        candidate.status = candidate.resourcePlanRequired ? "pilot-accepted-resource-plan-required" : "pilot-accepted-pending-resource-review";
      } finally {
        const usage = process.resourceUsage(), stages = receipt.stages.slice(stageStart);
        const profiles = stages.map(stage => stage.log?.profile).filter(Boolean);
        candidate.wallSeconds = elapsed() - candidateStarted;
        candidate.resources = { complete: profiles.length === stages.length && candidatePhases.length === 2 &&
            candidatePhases.every(phase => phase.status === "phase-ledger-accepted"),
          childUserSeconds: profiles.reduce((sum, item) => sum + item.childUserSeconds, 0),
          childSystemSeconds: profiles.reduce((sum, item) => sum + item.childSystemSeconds, 0),
          coordinatorUserSeconds: (usage.userCPUTime - usageStart.userCPUTime) / 1e6,
          coordinatorSystemSeconds: (usage.systemCPUTime - usageStart.systemCPUTime) / 1e6,
          coordinatorIncludesIsolatedLedgerWorker: true,
          maximumMeasuredIndividualProcessResidentBytes: Math.max(usage.maxRSS * 1024, ...profiles.map(item => item.maximumIndividualProcessResidentBytes)),
          rssScope: "maximum-individual-process-high-water-not-aggregate; coordinator-high-water-is-process-lifetime-not-reset-per-candidate",
          outputBytes: candidatePhases.reduce((sum, item) => sum + (item.historyManifest?.bytes ?? 0) + (item.conformance?.bytes ?? 0) +
            (item.process?.rawRows?.bytes ?? 0) + (item.process?.stdoutLog?.bytes ?? 0) + (item.phaseReceipt?.bytes ?? 0) + (item.operationalReceipt?.bytes ?? 0), 0) +
            stages.reduce((sum, stage) => sum + (stage.log?.bytes ?? 0), 0) };
        candidate.resources.totalMeasuredCPUSeconds = candidate.resources.childUserSeconds + candidate.resources.childSystemSeconds +
          candidate.resources.coordinatorUserSeconds + candidate.resources.coordinatorSystemSeconds;
      }
    }
    currentPhase = undefined; const finalizationStarted = elapsed();
    const summaryPath = path.join(output, "pilot-ledger.json");
    await profiled("pilot-ledger", node, [absolute(root, LEDGER_CLI), "--repo-root", root, "--scope", "pilot",
      ...receipt.phaseReceipts.flatMap(record => ["--phase-receipt", record.path, "--phase-receipt-sha256", record.sha256]), "--out", summaryPath], output);
    const [summary] = await inspect([{ path: summaryPath, json: true }]); validatePilotSummary(summary.value, receipt.phaseReceipts);
    delete summary.value; receipt.summary = summary;
    currentStage = "final-bindings";
    const after = await fileJob({ kind: "build", out: path.join(output, "build-bindings-after.json") });
    demand(after.checkedBindingCount === receipt.initialBindingCount, "final build binding census differs");
    await inspect(fastBindings);
    // Every accepted raw/proof/phase receipt is rehashed, in a worker, before the
    // pilot can publish success; final ledger does not stand for mutable files.
    await inspect([...receipt.phases.flatMap(phase => [phase.historyManifest, phase.conformance, phase.phaseReceipt,
      phase.operationalReceipt, phase.process.rawRows, phase.process.stdoutLog, phase.process.stderrLog]),
      ...receipt.stages.map(stage => stage.log), summary]);
    receipt.sharedFinalizationWallSeconds = elapsed() - finalizationStarted;
    remaining(); receipt.status = "serial-pilot-accepted-pending-resource-review"; receipt.accepted = true;
  } catch (error) {
    failed = error; receipt.status = "failed"; receipt.accepted = false; receipt.failure = error.message;
    if (currentPhase && currentPhase.status !== "phase-ledger-accepted") currentPhase.status = "failed";
  } finally {
    if (activeWorker) { await activeWorker.close(); activeWorker = undefined; }
    receipt.rowDispositions = rowDispositions(schedule, receipt.phases);
    receipt.finishedAt = new Date().toISOString(); receipt.elapsedWallSeconds = elapsed();
    if (receipt.elapsedWallSeconds >= 1800 || abort.signal.aborted) {
      receipt.accepted = false; receipt.status = "failed"; receipt.failure ??= "whole pilot deadline or interruption";
      failed ??= new Error(receipt.failure);
    }
    // Operational receipt is provisional until the separate, small terminal
    // admission file exists. An output write crossing the deadline cannot leave
    // a valid successful pilot: the terminal file explicitly rejects it.
    receipt.terminalAdmissionRequired = true;
    const receiptPath = path.join(output, "pilot-process.json");
    try {
      jsonWrite(receiptPath, receipt);
      const end = elapsed(), accepted = receipt.accepted && end < 1800 && !abort.signal.aborted;
      const terminal = { schema: "braid-program/subfield-circular-serial-pilot-terminal.v1", accepted, h3EvidenceEligible: false,
        operationalReceiptPath: receiptPath, elapsedWallSeconds: end, deadlineSeconds: 1800,
        admission: accepted ? "await-external-post-write-deadline-check" : "rejected",
        claimBoundary: "Operational pilot only; no H3 or later-ladder authorization." };
      jsonWrite(path.join(output, "terminal.json"), terminal);
      if (!accepted || elapsed() >= 1800 || abort.signal.aborted) {
        failed ??= new Error("pilot final output missed admission deadline");
        jsonWrite(path.join(output, "terminal-rejection.json"), { accepted: false, h3EvidenceEligible: false, failure: failed.message,
          elapsedWallSeconds: elapsed(), invalidates: "terminal.json and pilot-process.json" });
      }
    } catch (error) { failed ??= error; }
    clearInterval(heartbeat); clearTimeout(deadline); process.off("SIGINT", signalHandler); process.off("SIGTERM", signalHandler);
  }
  if (failed) throw Object.assign(failed, { pilotReceipt: receipt, outputDirectory: output });
  return { ...receipt, outputDirectory: output, elapsedThroughFinalOutputSeconds: elapsed() };
}

async function main() {
  const startedAtMs = performance.now(), startedAt = new Date().toISOString();
  const options = parsePilotArgs(process.argv.slice(2)), root = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  const sources = [SELF, ...Object.keys(PINS)].map(relative => {
    const bytes = regularBytes(absolute(root, relative), 2 * 1024 * 1024), digest = sha(bytes);
    demand(digest === (relative === SELF ? options.runnerSha256 : PINS[relative]), `reviewed source differs: ${relative}`);
    return { path: relative, sha256: digest, bytes };
  });
  const snapshot = installPilotSnapshot(sources, root);
  try {
    const [runner, helper, bridge, watcher] = await Promise.all([SELF, HELPER, BRIDGE, WATCH].map(snapshot.import));
    const result = await runner.runSerialSubfieldCircularPilot({ root, options, sources, startedAtMs, startedAt,
      runtime: { runSubfieldCircularPhaseProcess: helper.runSubfieldCircularPhaseProcess, openSubfieldCircularPhaseLedgerWorker: bridge.openSubfieldCircularPhaseLedgerWorker, runWatched: watcher.runWatched } });
    console.log(JSON.stringify({ accepted: result.accepted, status: result.status, output: result.outputDirectory,
      elapsedThroughFinalOutputSeconds: result.elapsedThroughFinalOutputSeconds, h3EvidenceEligible: false, laterLadderAuthorized: false }));
  } finally { snapshot.close(); }
}
if (import.meta.url.startsWith("file:") && !new URL(import.meta.url).search && process.argv[1] &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.stack); process.exitCode = 1; });
