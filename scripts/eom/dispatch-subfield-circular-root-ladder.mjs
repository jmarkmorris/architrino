// Measured-plan composition, not a solver or independent mathematical oracle.
import { createHash } from "node:crypto";
import { appendFileSync, closeSync, constants, existsSync, fstatSync, mkdirSync, openSync, readSync, realpathSync, statfsSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const SELF = "scripts/eom/dispatch-subfield-circular-root-ladder.mjs", RUNG = "scripts/eom/run-subfield-circular-root-rung.mjs";
const BASE = ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/";
const OUTER = "scripts/eom/launch-subfield-circular-root-pilot.mjs", OUTER_SHA = "df1b7e1d800450afb4221db88e0aedf55d62de256f302e448caab05149badc18";
export const SUBFIELD_CIRCULAR_MEMORY_COMMAND_SHA = "a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const check = (ok, message, code = "SHARED_INPUT_REJECTED") => { if (!ok) throw Object.assign(new Error(message), { failureCode: code }); };
const writeJSON = (filename, value) => writeFileSync(filename, JSON.stringify(value) + "\n", { flag: "wx" });

function readBound(filename, expected, json = false) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd), digest = createHash("sha256"), chunks = [], buffer = Buffer.allocUnsafe(65536);
    check(before.isFile() && before.size <= (json ? 128 * 1024 ** 2 : 2 * 1024 ** 3), "bounded regular input required");
    let length = 0;
    for (;;) { const count = readSync(fd, buffer, 0, buffer.length, length); if (!count) break;
      length += count; check(length <= before.size, "input grew during read"); digest.update(buffer.subarray(0, count)); if (json) chunks.push(Buffer.from(buffer.subarray(0, count))); }
    const after = fstatSync(fd), hash = digest.digest("hex");
    check(length === before.size && after.size === before.size && after.mtimeMs === before.mtimeMs && after.ctimeMs === before.ctimeMs &&
      (!expected || hash === expected), `bound bytes changed: ${filename}`, "SHARED_BINDING_DRIFT");
    return { path: filename, sha256: hash, bytes: length, ...(json ? { value: JSON.parse(Buffer.concat(chunks).toString("utf8")) } : {}) };
  } finally { closeSync(fd); }
}

export function sourceBytes(filename, expected) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try { const before = fstatSync(fd);
    check(before.isFile() && before.size <= 2 * 1024 ** 2, "source capture requires a bounded regular file");
    const bytes = Buffer.alloc(before.size); let at = 0;
    while (at < bytes.length) { const count = readSync(fd, bytes, at, bytes.length - at, at); check(count > 0, "source truncated"); at += count; }
    const after = fstatSync(fd);
    check(after.isFile() && after.size === before.size && after.mtimeMs === before.mtimeMs && after.ctimeMs === before.ctimeMs &&
      sha(bytes) === expected, "source generation changed during capture", "SHARED_BINDING_DRIFT"); return bytes;
  } finally { closeSync(fd); }
}

export function parseSubfieldCircularDispatchArgs(argv) {
  const allowed = ["--plan", "--plan-sha256", "--out", "--dispatcher-sha256"], result = {};
  for (let index = 0; index < argv.length; index += 2) {
    check(allowed.includes(argv[index]) && argv[index + 1] && !result[argv[index]], "unknown/missing/duplicate dispatch argument");
    result[argv[index]] = argv[index + 1];
  }
  check(allowed.every(key => result[key]) && ["--plan-sha256", "--dispatcher-sha256"].every(key => /^[0-9a-f]{64}$/u.test(result[key])) &&
    result["--out"].startsWith(BASE) && result["--out"].length > BASE.length && !result["--out"].includes("\\") &&
    result["--out"].split("/").every(part => part && part !== "." && part !== ".."), "authenticated plan/code and fresh scoped output required");
  return result;
}

export function classifySubfieldCircularCandidateFailure(failureCode, sharedBytesMatch) {
  if (failureCode === "RESOURCE_OBSERVATION_STOP") return "resource-dispatch-stop";
  if (!sharedBytesMatch || failureCode?.startsWith("SHARED_") || failureCode === "PLAN_REJECTED") return "shared-dispatch-stop";
  return "candidate-stop";
}

export async function runSubfieldCircularBoundedCandidatePool({ candidates, limit, shouldStop, onFatal, work }) {
  let next = 0;
  const jobs = Array.from({ length: Math.min(limit, candidates.length) }, async () => {
    try { while (!shouldStop() && next < candidates.length) await work(candidates[next++]); }
    catch (error) { onFatal(error); throw error; }
  });
  const settled = await Promise.allSettled(jobs);
  const failure = settled.find(value => value.status === "rejected"); if (failure) throw failure.reason;
}

export function subfieldCircularWholeRungClock(limitMs) {
  check(Number.isSafeInteger(limitMs) && limitMs > 0, "positive whole-rung deadline required");
  const began = performance.now(), deadlineNanoseconds = String(process.hrtime.bigint() + BigInt(limitMs) * 1000000n), abort = new AbortController();
  const failure = () => Object.assign(new Error("whole-rung preparation/execution/publication deadline"), { failureCode: "CANDIDATE_RESOURCE_LIMIT" });
  const timer = setTimeout(() => abort.abort(failure()), limitMs);
  const remaining = () => {
    const milliseconds = Math.floor(limitMs - (performance.now() - began));
    if (abort.signal.aborted) throw abort.signal.reason;
    if (milliseconds <= 0) { abort.abort(failure()); throw abort.signal.reason; }
    return milliseconds;
  };
  return { began, deadlineNanoseconds, signal: abort.signal, remaining,
    cancel: reason => abort.abort(reason ?? failure()), close: () => clearTimeout(timer),
    wait: async promise => {
      let listener;
      // The observation can be shared with another rung. Keep its eventual
      // failure handled even if this caller's clock has already expired.
      promise = Promise.resolve(promise); void promise.catch(() => {});
      try { remaining(); return await Promise.race([promise, new Promise((_,reject) => {
        listener = () => reject(abort.signal.reason); abort.signal.addEventListener("abort",listener,{once:true});
        if (abort.signal.aborted) listener();
      })]); } finally { if (listener) abort.signal.removeEventListener("abort",listener); }
    } };
}

export async function recordSubfieldCircularResourceObservation({ query, append, onFailure, atLaunch = false }) {
  const observation = { startedAt: new Date().toISOString(), atLaunch, accepted: false }; let failure;
  try { Object.assign(observation, await query()); }
  catch (error) { failure = error; Object.assign(observation, { failure: error.message, stdout: error.stdout, stderr: error.stderr }); }
  try { append(JSON.stringify(observation) + "\n"); }
  catch (error) { failure = Object.assign(new Error(`resource observation log failed: ${error.message}`), { cause: error }); }
  if (failure) { failure.failureCode = "RESOURCE_OBSERVATION_STOP"; onFailure(failure); throw failure; }
  return observation;
}

export function parseSubfieldCircularResourceObservation(stdout, diskBytes, policy, atLaunch = false) {
  const lines = stdout.split(/\r?\n/u).filter(line => line.includes("System-wide memory free percentage:"));
  check(lines.length === 1 && /^System-wide memory free percentage: \d+%$/u.test(lines[0]),
    "memory observation must contain exactly one valid percentage", "RESOURCE_OBSERVATION_STOP");
  const freePercent = Number(lines[0].slice("System-wide memory free percentage: ".length, -1));
  check(Number.isFinite(freePercent) && freePercent >= 0 && freePercent <= 100 && /^(0|[1-9]\d*)$/u.test(String(diskBytes)),
    "resource observation outside declared range", "RESOURCE_OBSERVATION_STOP");
  const minimumDisk = BigInt(atLaunch ? policy.minimumFreeDiskBytesAtLaunch : policy.minimumFreeDiskBytesDuringRun);
  check(freePercent >= policy.minimumSystemFreePercent && BigInt(diskBytes) >= minimumDisk,
    "observed free memory/disk below reviewed minimum", "RESOURCE_OBSERVATION_STOP");
  return { freePercent, availableDiskBytes: String(diskBytes), minimumDiskBytes: String(minimumDisk), atLaunch,
    accepted: true, h3EvidenceEligible: false, notAggregateMemoryMeasurement: true };
}

function queryMemoryPressure(timeout) {
  return new Promise((resolve, reject) => execFile("/usr/bin/memory_pressure", [],
    { timeout, killSignal: "SIGKILL", maxBuffer: 1024 * 1024, encoding: "utf8" },
    (error, stdout, stderr) => error ? reject(Object.assign(error, { stdout, stderr, failureCode: "RESOURCE_OBSERVATION_STOP" })) : resolve({ stdout, stderr })));
}

export function checkSubfieldCircularRungGateCensus(processReceipt, rungReceipt) {
  const expected = new Set(rungReceipt.phases.flatMap(phase => ["history-manifest.json", "history-conformance.json", "rows.ndjson", "phase-ledger.json"]
    .map(name => path.join(phase.directory, name))));
  expected.add(rungReceipt.summary.path); if (rungReceipt.ladderSummary) expected.add(rungReceipt.ladderSummary.path);
  const seen = new Set();
  for (const gate of processReceipt.gates) {
    const args = gate.requestedArgs;
    check(args.filter(value => value === "--out").length === 1, "gate output role is not unique");
    const output = args[args.indexOf("--out") + 1];
    check(expected.has(output) && !seen.has(output) && gate.acknowledged && gate.measurement?.code === 0 && !gate.measurement.signal,
      "rung gate role/measurement census differs"); seen.add(output);
  }
  check(seen.size === expected.size, "missing rung gate role");
  return { gateCount: seen.size, gateCPUSeconds: processReceipt.gates.reduce((sum, gate) => sum +
    (gate.measurement.resourceUsage.userCPUTime + gate.measurement.resourceUsage.systemCPUTime) / 1e6, 0),
    maximumGateResidentBytes: Math.max(0, ...processReceipt.gates.map(gate => gate.measurement.resourceUsage.maxRSS * 1024)),
    notAggregateSimultaneousMemory: true };
}

// All sizeable JSON parsing, old/current receipt comparisons, final hashing and
// publication run off the dispatcher event loop. This is composition, not a new
// mathematical reference. The existing independent CLI owns both full scopes.
export async function subfieldCircularDispatchFileOperation(job) {
  if (job.kind === "read") return job.files.map(record => readBound(path.resolve(job.root, record.path), record.sha256, record.json));
  if (job.kind === "prior") { writeJSON(job.filename, job.value); return readBound(job.filename); }
  if (job.kind === "disk") { const disk = statfsSync(job.root, { bigint: true }); return String(disk.bavail * disk.bsize); }
  const rungBytes = Buffer.from(job.rungBytes);
  check(sha(rungBytes) === job.rungSha256, "captured rung source differs");
  const rung = await import("data:text/javascript;base64," + rungBytes.toString("base64"));
  if (job.kind === "shared") {
    for (const binding of job.bindings) readBound(path.resolve(job.root, binding.path), binding.sha256);
    const pilotBytes = sourceBytes(path.join(job.root, rung.SUBFIELD_CIRCULAR_RUNTIME_PATHS.pilot), rung.SUBFIELD_CIRCULAR_RUNTIME_HASHES.pilot);
    const pilot = await import("data:text/javascript;base64," + pilotBytes.toString("base64"));
    pilot.pilotFileOperation({ kind: "build", root: job.root }); return { sharedBytesMatch: true };
  }
  if (job.kind === "publish") {
    const bytes = sourceBytes(path.join(job.root, OUTER), OUTER_SHA);
    const outer = await import("data:text/javascript;base64," + bytes.toString("base64"));
    return outer.outerWorkerOperation({ kind: job.failed ? "failure-publication" : "publication", output: job.output,
      receipt: job.receipt, sources: job.bindings.map(binding => ({ ...binding, path: path.resolve(job.root, binding.path) })),
      deadlineNanoseconds: job.deadlineNanoseconds });
  }
  check(job.kind === "admit", "unknown dispatch file operation");
  check(!existsSync(path.join(job.runOutput, "rung-rejection.json")), "rung final output rejected");
  const bound = readBound(path.join(job.runOutput, "rung-process.json"), undefined, true), record = bound.value;
  check(record.schema === "braid-program/subfield-circular-candidate-rung-process.v1" && record.accepted === true && record.h3EvidenceEligible === false &&
    record.rootExecutionAuthorized === false && record.candidateId === job.candidateId && record.rung === job.rung &&
    record.wallLimitSeconds === job.wallLimitSeconds && record.elapsedWallSeconds < job.wallLimitSeconds && record.phases.length === job.rung &&
    record.resources.complete === true, "candidate/rung operational authority differs");
  check(record.plan?.path === job.plan.path && record.plan?.sha256 === job.plan.sha256,
    "rung process plan is not the dispatch's authenticated plan");
  check(record.buildReceipt?.sha256 === rung.SUBFIELD_CIRCULAR_BUILD_SHA && record.buildReceipt.path === path.join(job.root, rung.SUBFIELD_CIRCULAR_BUILD_PATH),
    "rung process build binding differs");
  const expected = rung.candidateRungSchedule(job.candidateId, job.rung);
  for (let index = 0; index < expected.length; index++) {
    const phase = record.phases[index];
    check(phase.accepted === true && phase.candidateId === job.candidateId && phase.rung === job.rung && phase.phase === index &&
      phase.process?.processGroupClosed === true, "rung phase process census differs");
  }
  const summary = readBound(record.summary.path, record.summary.sha256, true);
  rung.validateSubfieldCircularRungSummary(summary.value, { candidateId: job.candidateId, rung: job.rung }, record.phaseReceipts, "candidate-rung");
  const prior = readBound(record.priorReceipts.path, record.priorReceipts.sha256, true);
  if (job.rung === 128) {
    check(record.ladderSummary, "final rung lacks complete ladder summary");
    const ladder = readBound(record.ladderSummary.path, record.ladderSummary.sha256, true);
    const old = prior.value.phaseReceipts.map(binding => ({ ...binding, value: readBound(binding.path, binding.sha256, true).value }))
      .filter(binding => binding.value.rung !== 2).map(({ value, ...binding }) => binding);
    rung.validateSubfieldCircularRungSummary(ladder.value, { candidateId: job.candidateId, rung: job.rung }, [...old, ...record.phaseReceipts], "candidate-ladder");
  }
  const inputs = [...job.bindings, record.plan, record.priorReceipts, record.pilotAdmission, record.buildBefore, record.buildAfter,
    ...record.sourceBindings, ...record.runtimeBindings,
    ...record.phases.flatMap(phase => [phase.historyManifest, phase.conformance, phase.phaseReceipt, phase.operationalReceipt,
      phase.process.rawRows, phase.process.stdoutLog, phase.process.stderrLog]), ...record.stages.map(stage => stage.log)];
  const currentBindings = new Map();
  for (const input of inputs) { const current = readBound(path.resolve(job.root, input.path), input.sha256); currentBindings.set(current.path,current); }
  const gates = checkSubfieldCircularRungGateCensus(job.processReceipt, record);
  const precision = record.phaseReceipts.map(binding => readBound(binding.path, binding.sha256, true).value.maximumPrecisionBits);
  check(precision.every(value => Number.isSafeInteger(value) && value > 0), "phase precision census missing");
  const maximumPrecisionBits = Math.max(...precision);
  check(record.resources.maximumPrecisionBits === maximumPrecisionBits, "reported maximum precision differs from authenticated phase receipts");
  const named = rung.summarizeSubfieldCircularNamedOutputs([...rung.subfieldCircularRungNamedOutputBindings(record).map(binding =>
    currentBindings.get(path.resolve(job.root,binding.path)) ?? readBound(path.resolve(job.root,binding.path),binding.sha256)), bound,
    readBound(record.priorReceipts.path, record.priorReceipts.sha256), job.processReceipt.stdoutLog, job.processReceipt.stderrLog], maximumPrecisionBits);
  delete bound.value;
  return { accepted: true, h3EvidenceEligible: false, authority: "external-complete-rung-ledger-and-process-admission-only",
    candidateId: job.candidateId, rung: job.rung, plan: record.plan, rungProcess: bound, phaseReceipts: record.phaseReceipts,
    summary: record.summary, ...(record.ladderSummary ? { ladderSummary: record.ladderSummary } : {}),
    resources: { ...record.resources, ...gates, ...named, totalMeasuredCPUIncludingGates: record.resources.measuredCPUSeconds + gates.gateCPUSeconds },
    checkedEvidenceBindings: inputs.length };
}

export async function watchedSubfieldCircularDispatchOperation(job, { bytes, sha256, limitMs, signal }) {
  check(sha(bytes) === sha256 && Number.isSafeInteger(limitMs) && limitMs > 0, "captured dispatcher source and bounded operation required");
  const worker = new Worker(`const{parentPort,workerData}=require('node:worker_threads');(async()=>{
    const m=await import('data:text/javascript;base64,'+Buffer.from(workerData.bytes).toString('base64'));
    parentPort.postMessage({result:await m.subfieldCircularDispatchFileOperation(workerData.job)});
    })().catch(error=>parentPort.postMessage({failure:error.message,failureCode:error.failureCode}));`,
  { eval: true, execArgv: [], workerData: { bytes, job } });
  let timer, onAbort;
  try { return await new Promise((resolve, reject) => {
    onAbort = () => reject(signal?.reason ?? new Error("dispatch operation interrupted"));
    signal?.addEventListener("abort", onAbort, { once: true }); if (signal?.aborted) onAbort();
    timer = setTimeout(() => reject(Object.assign(new Error("dispatch file operation deadline"), { failureCode: "CANDIDATE_RESOURCE_LIMIT" })), limitMs);
    worker.once("message", message => message.failure ? reject(Object.assign(new Error(message.failure), { failureCode: message.failureCode })) : resolve(message.result));
    worker.once("error", reject); worker.once("exit", code => reject(new Error(`dispatch worker exited without result (${code})`)));
  }); } finally { await worker.terminate(); clearTimeout(timer); signal?.removeEventListener("abort", onAbort); }
}

export async function runSubfieldCircularMeasuredDispatch({ root, args, selfBytes, rungBytes, runtime }) {
  const output = path.join(root, args["--out"]), started = performance.now();
  let ancestor = output; while (!existsSync(ancestor)) ancestor = path.dirname(ancestor);
  check(realpathSync(ancestor) === ancestor && !existsSync(output), "new nonsymlinked dispatch directory required");
  mkdirSync(output);
  // Reserve this required sink before any ref'ed timer or signal listener.
  // A failed reservation must be a prompt startup error with no owned job.
  const resourceLog = path.join(output, "resource-observations.ndjson"); writeFileSync(resourceLog, "", { flag: "wx" });
  const receipt = { schema: "braid-program/subfield-circular-candidate-ladder-dispatch.v1", accepted: false, h3EvidenceEligible: false,
    rootExecutionAuthorized: false, startedAt: new Date().toISOString(), candidates: [], sharedStopped: false,
    plan: { path: path.resolve(args["--plan"]), sha256: args["--plan-sha256"] }, dispatcher: { path: SELF, sha256: args["--dispatcher-sha256"] } };
  let sharedStop = false;
  const activeClocks = new Set();
  const stopNew = () => { sharedStop = true; receipt.sharedStopped = true;
    for (const clock of activeClocks) clock.cancel(Object.assign(new Error("shared dispatch interruption"),
      { failureCode: receipt.failureCode ?? "SHARED_CANCELLED" })); };
  process.on("SIGTERM", stopNew); process.on("SIGINT", stopNew);
  const heartbeat = setInterval(() => console.error(JSON.stringify({ stage: "candidate-ladder-dispatch", elapsedWallSeconds: (performance.now() - started) / 1000,
    candidates: receipt.candidates.map(row => ({ id: row.candidateId, status: row.status, completedRungs: row.rungs.filter(item => item.status === "accepted").length })),
    sharedStopped: sharedStop, h3EvidenceEligible: false })), 15000);
  const operation = (job, limitMs = 1800000, signal) => watchedSubfieldCircularDispatchOperation({ root, rungBytes, rungSha256: sha(rungBytes), ...job },
    { bytes: selfBytes, sha256: sha(selfBytes), limitMs, signal });
  let bindings = [], resourceTimer, resourceInFlight, pool = [];
  const observe = (policy, atLaunch = false) => {
    if (resourceInFlight) return resourceInFlight;
    resourceInFlight = (async () => {
      try { return await recordSubfieldCircularResourceObservation({ atLaunch,
        append: line => appendFileSync(resourceLog, line),
        onFailure: error => { receipt.failureCode = "RESOURCE_OBSERVATION_STOP"; receipt.failure = error.message; stopNew(); process.emit("SIGTERM"); },
        query: async () => {
        await operation({ kind: "read", files: [{ path: "/usr/bin/memory_pressure", sha256: SUBFIELD_CIRCULAR_MEMORY_COMMAND_SHA }] }, 2000);
        const queries = await Promise.allSettled([queryMemoryPressure(policy.commandTimeoutMs), operation({ kind: "disk" }, policy.commandTimeoutMs)]);
        const failed = queries.find(row => row.status === "rejected"); if (failed) throw failed.reason;
        const [memory, diskBytes] = queries.map(row => row.value);
        return { ...memory, ...parseSubfieldCircularResourceObservation(memory.stdout, diskBytes, policy, atLaunch) };
      } }); } finally { resourceInFlight = undefined; }
    })(); return resourceInFlight;
  };
  try {
    check(process.platform === "darwin" && !process.env.NODE_OPTIONS && !process.env.DYLD_INSERT_LIBRARIES && !process.env.DYLD_LIBRARY_PATH &&
      !process.env.LD_PRELOAD && !process.env.LD_LIBRARY_PATH, "measured clean macOS dispatch environment required", "SHARED_RUNTIME_REJECTED");
    const [planBinding] = await operation({ kind: "read", files: [{ ...receipt.plan, json: true }] });
    const plan = runtime.rung.validateSubfieldCircularResourcePlan(planBinding.value);
    check(plan.dispatcherSha256 === sha(selfBytes) && plan.runnerSha256 === sha(rungBytes), "reviewed dispatch/rung generation differs");
    const [pilot] = await operation({ kind: "read", files: [{ ...plan.pilotAdmission, json: true }] });
    check(pilot.value.accepted === true && pilot.value.h3EvidenceEligible === false && pilot.value.admission?.accepted === true &&
      pilot.value.processesClosed === true, "accepted closed pilot outer receipt required");
    const [pilotSummary] = await operation({ kind: "read", files: [{ ...pilot.value.admission.summary, json: true }] });
    check(pilotSummary.value.scope === "pilot" && pilotSummary.value.phaseCount === 32 && pilotSummary.value.rowCount === 2448 &&
      pilotSummary.value.accepted === true, "complete pilot phase chain required");
    bindings = [receipt.plan, plan.pilotAdmission, { path: SELF, sha256: sha(selfBytes) }, { path: RUNG, sha256: sha(rungBytes) },
      ...Object.entries(runtime.rung.SUBFIELD_CIRCULAR_RUNTIME_PATHS).map(([key, relative]) => ({ path: relative, sha256: runtime.rung.SUBFIELD_CIRCULAR_RUNTIME_HASHES[key] })),
      { path: "/usr/bin/memory_pressure", sha256: SUBFIELD_CIRCULAR_MEMORY_COMMAND_SHA },
      ...plan.cohorts.filter(cohort => cohort.resourceReturn).map(cohort => cohort.resourceReturn)];
    receipt.runtimeBindings = await operation({ kind: "read", files: [{ path: process.execPath }, { path: "/bin/ps" }] });
    bindings.push(...receipt.runtimeBindings);
    await operation({ kind: "shared", bindings });
    await observe(plan.resourceObservation, true);
    resourceTimer = setInterval(() => { if (!sharedStop) void observe(plan.resourceObservation).catch(() => {}); }, plan.resourceObservation.cadenceSeconds * 1000);
    receipt.maximumConcurrentCandidates = plan.maximumConcurrentCandidates; receipt.totalEomWorkers = plan.totalEomWorkers;
    receipt.resourceReturns = plan.resourceReturns;
    receipt.resourceReturnDispositions = plan.resourceReturns.map(candidateId => ({ candidateId, status: "resource-return-not-run",
      rungs: [8,32,128].map(rung => ({ rung, phases: runtime.rung.candidateRungDispositions(runtime.rung.candidateRungSchedule(candidateId,rung),[]) })) }));
    receipt.candidates = plan.candidates.map(candidateId => ({ candidateId, status: "not-run", rungs: [8, 32, 128].map(rung => ({ rung, status: "not-run" })) }));
    const work = async candidate => {
      const candidateId = candidate.candidateId, directory = path.join(output, candidateId); mkdirSync(directory);
      const priorPhases = pilotSummary.value.phaseReceipts.filter(row => row.candidateId === candidateId).map(({ path: filename, sha256 }) => ({ path: filename, sha256 }));
      const rungAdmissions = []; candidate.status = "running";
      for (const item of candidate.rungs) {
        if (sharedStop) break;
        const rung = item.rung, outerOutput = path.join(directory, `rung-${rung}`), runOutput = path.join(outerOutput, "run"),
          priorPath = path.join(directory, `prior-${rung}.json`), wallLimitSeconds = runtime.rung.candidateWallLimit(plan, candidateId);
        // This clock precedes every rung-specific file, observation and worker.
        const clock = subfieldCircularWholeRungClock(wallLimitSeconds * 1000), { began, deadlineNanoseconds } = clock;
        activeClocks.add(clock);
        const rungOperation = job => operation(job, clock.remaining(), clock.signal);
        item.status = "running"; let processReceipt;
        try {
          const prior = await rungOperation({ kind: "prior", filename: priorPath, value: { candidateId, phaseReceipts: priorPhases, rungAdmissions } });
          // A shared observation has its own two-second child bounds; this
          // caller's abortable wait cannot extend its rung's admission clock.
          await clock.wait(observe(plan.resourceObservation));
          await rungOperation({ kind: "shared", bindings }); clock.remaining();
          check(!sharedStop, "dispatch stopped before bootstrap", "SHARED_CANCELLED");
          let firstInspection = true, cancellationDelivered = false;
          processReceipt = await runtime.outer.superviseRegisteredPilot({ root, entry: RUNG,
            args: ["--plan", receipt.plan.path, "--plan-sha256", receipt.plan.sha256, "--candidate", candidateId, "--rung", String(rung),
              "--prior-phase-receipts", prior.path, "--prior-phase-receipts-sha256", prior.sha256,
              "--out", path.relative(root, runOutput), "--runner-sha256", plan.runnerSha256],
            sources: [{ path: RUNG, bytes: rungBytes, sha256: plan.runnerSha256 }], output: outerOutput,
            limitMs: wallLimitSeconds * 1000, startedAtMs: began,
            inspectProcesses: async () => {
              const first = firstInspection; firstInspection = false;
              check(!first || !sharedStop, "dispatch stopped before bootstrap", "SHARED_CANCELLED");
              const table = await runtime.outer.processTable();
              if (sharedStop && first) throw Object.assign(new Error("dispatch stopped during first preflight"), { failureCode: "SHARED_CANCELLED" });
              if (sharedStop && !cancellationDelivered) { cancellationDelivered = true; process.emit("SIGTERM"); }
              return table;
            },
            admit: ({ receipt: processState, remainingMs, signal }) => operation({ kind: "admit", runOutput, candidateId, rung, wallLimitSeconds,
              processReceipt: processState, bindings, plan: receipt.plan }, Math.min(remainingMs, clock.remaining()), AbortSignal.any([signal, clock.signal])) });
          const publication = await rungOperation({ kind: "publish", output: outerOutput, receipt: processReceipt, bindings, deadlineNanoseconds });
          clock.remaining();
          check(publication.accepted && process.hrtime.bigint() < BigInt(deadlineNanoseconds), "rung publication rejected", "CANDIDATE_RESOURCE_LIMIT");
          item.outerAdmission = publication.receipt; item.wallSeconds = (performance.now() - began) / 1000;
          item.resources = { ...processReceipt.admission.resources, ...runtime.rung.summarizeSubfieldCircularNamedOutputs(
            [...processReceipt.admission.resources.namedOutputs, publication.receipt], processReceipt.admission.resources.maximumPrecisionBits) };
          item.summary = processReceipt.admission.summary;
          if (processReceipt.admission.ladderSummary) candidate.ladderSummary = processReceipt.admission.ladderSummary;
          priorPhases.push(...processReceipt.admission.phaseReceipts); rungAdmissions.push(publication.receipt);
          clock.remaining(); item.status = "accepted";
        } catch (error) {
          item.status = "failed"; item.failure = error.message; let failureCode = error.failureCode;
          processReceipt ??= error.outerReceipt;
          try {
            const [failedRung] = await operation({ kind: "read", files: [{ path: path.join(runOutput, "rung-process.json"), json: true }] }, 10000);
            failureCode ??= failedRung.value.failureCode; item.rowDispositions = failedRung.value.rowDispositions;
            item.resources = failedRung.value.resources;
          } catch { /* Failed startup may legitimately have no rung receipt. */ }
          let sharedBytesMatch = false;
          try { await operation({ kind: "shared", bindings }, 30000); sharedBytesMatch = true; } catch { /* Fail closed for shared drift or uninspectable state. */ }
          item.failureCode = failureCode ?? "CANDIDATE_LOCAL_FAILURE";
          const disposition = classifySubfieldCircularCandidateFailure(item.failureCode, sharedBytesMatch);
          if (disposition !== "candidate-stop") {
            stopNew(); process.emit("SIGTERM"); item.failureCode = receipt.failureCode === "RESOURCE_OBSERVATION_STOP" ? receipt.failureCode : "SHARED_DISPATCH_STOP";
          }
          if (processReceipt?.outputReserved) {
            try { await operation({ kind: "publish", output: outerOutput, receipt: { ...processReceipt, accepted: false }, bindings,
              failed: true, deadlineNanoseconds }, 10000); } catch (publicationError) { item.failurePublicationError = publicationError.message; }
          }
          candidate.status = "failed"; break;
        } finally { item.wallSeconds = (performance.now() - began) / 1000;
          item.wallScope = "whole-rung-starts-before-prior-preparation; rejected-run-time-includes-bounded-failure-cleanup";
          clock.close(); activeClocks.delete(clock); }
      }
      if (candidate.rungs.every(item => item.status === "accepted")) candidate.status = "accepted-ladder-pending-independent-integration";
      else if (candidate.status !== "failed") candidate.status = "shared-stop-not-run";
      candidate.rowDispositions = candidate.rungs.map(item => ({ rung: item.rung, status: item.status,
        phases: item.rowDispositions ?? runtime.rung.candidateRungDispositions(runtime.rung.candidateRungSchedule(candidateId, item.rung),
          item.status === "accepted" ? runtime.rung.candidateRungSchedule(candidateId, item.rung).map(() => ({ accepted: true })) : []) }));
      const precisions = candidate.rungs.map(item => item.resources?.maximumPrecisionBits).filter(value => Number.isSafeInteger(value) && value > 0);
      candidate.resources = runtime.rung.summarizeSubfieldCircularNamedOutputs(candidate.rungs.flatMap(item => item.resources?.namedOutputs ?? []),
        precisions.length ? Math.max(...precisions) : null);
      candidate.resources.measuredCPUSeconds = candidate.rungs.reduce((sum,item) => sum + (item.resources?.totalMeasuredCPUIncludingGates ?? item.resources?.measuredCPUSeconds ?? 0),0);
      candidate.resources.maximumIndividualProcessResidentBytes = Math.max(0,...candidate.rungs.map(item => Math.max(
        item.resources?.maximumIndividualProcessResidentBytes ?? 0,item.resources?.maximumGateResidentBytes ?? 0)));
      candidate.resources.measurementScope = "sum-of-recorded-rung-CPU; maximum-individual-process-RSS-not-aggregate; missing-failed-stage-measurements-not-zero-cost";
      writeJSON(path.join(directory, "candidate-disposition.json"), candidate);
    };
    pool = [runSubfieldCircularBoundedCandidatePool({ candidates: receipt.candidates, limit: plan.maximumConcurrentCandidates,
      shouldStop: () => sharedStop, onFatal: () => { stopNew(); process.emit("SIGTERM"); }, work })];
    await pool[0];
    await operation({ kind: "shared", bindings });
    receipt.accepted = !sharedStop && receipt.candidates.every(candidate => candidate.status === "accepted-ladder-pending-independent-integration");
  } catch (error) { stopNew(); process.emit("SIGTERM"); receipt.failure = error.message; receipt.accepted = false; }
  finally {
    await Promise.allSettled(pool); clearInterval(resourceTimer);
    if (resourceInFlight) await resourceInFlight.catch(() => {});
    for (const candidate of receipt.candidates) candidate.rowDispositions ??= candidate.rungs.map(item => ({ rung: item.rung, status: item.status,
      phases: runtime.rung.candidateRungDispositions(runtime.rung.candidateRungSchedule(candidate.candidateId, item.rung), []) }));
    receipt.elapsedWallSeconds = (performance.now() - started) / 1000; receipt.dispatcherResourceUsage = process.resourceUsage();
    if (sharedStop) receipt.accepted = false;
    try { receipt.resourceObservations = readBound(resourceLog); writeJSON(path.join(output, "dispatch.json"), receipt); }
    finally { clearInterval(heartbeat); process.off("SIGTERM", stopNew); process.off("SIGINT", stopNew); }
  }
  return receipt;
}

async function main() {
  const args = parseSubfieldCircularDispatchArgs(process.argv.slice(2)), root = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  const selfBytes = sourceBytes(path.join(root, SELF), args["--dispatcher-sha256"]);
  const plan = readBound(path.resolve(args["--plan"]), args["--plan-sha256"], true).value;
  const rungBytes = sourceBytes(path.join(root, RUNG), plan.runnerSha256), outerBytes = sourceBytes(path.join(root, OUTER), OUTER_SHA);
  const dispatcher = await import("data:text/javascript;base64," + selfBytes.toString("base64"));
  const runtime = { rung: await import("data:text/javascript;base64," + rungBytes.toString("base64")), outer: await import("data:text/javascript;base64," + outerBytes.toString("base64")) };
  const result = await dispatcher.runSubfieldCircularMeasuredDispatch({ root, args, selfBytes, rungBytes, runtime });
  console.log(JSON.stringify({ accepted: result.accepted, h3EvidenceEligible: false, output: args["--out"], sharedStopped: result.sharedStopped }));
  if (!result.accepted) process.exitCode = 1;
}
if (import.meta.url.startsWith("file:") && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(error => { console.error(error.stack); process.exitCode = 1; });
