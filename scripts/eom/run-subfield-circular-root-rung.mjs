// Candidate/rung composition only. Frozen independent phase and summary CLIs
// retain mathematical authority; the repeated-reception guard only schedules.
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, mkdirSync, openSync, readSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

export const SUBFIELD_CIRCULAR_RUNG_PATH = "scripts/eom/run-subfield-circular-root-rung.mjs";
export const SUBFIELD_CIRCULAR_DISPATCH_PATH = "scripts/eom/dispatch-subfield-circular-root-ladder.mjs";
export const SUBFIELD_CIRCULAR_RUN_BASE = ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/";
export const SUBFIELD_CIRCULAR_BUILD_PATH = `${SUBFIELD_CIRCULAR_RUN_BASE}recorded-build-20260827-v2/preparation.json`;
export const SUBFIELD_CIRCULAR_BUILD_SHA = "be6f2e43cc2c608a568d128c79535eacc628ea80cfc62cfe273af7c434243866";
export const SUBFIELD_CIRCULAR_RUNTIME_PATHS = Object.freeze({
  pilot: "scripts/eom/run-subfield-circular-root-pilot.mjs", outer: "scripts/eom/launch-subfield-circular-root-pilot.mjs",
  helper: "src/prescribed-path-analysis/SubfieldCircularPhaseProcess.mjs", bridge: "src/prescribed-path-analysis/SubfieldCircularPhaseLedgerWorker.mjs",
  watch: "scripts/eom/prepare-f5-enclosed-root.mjs", reducer: "src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs",
  cli: "scripts/eom/reduce-subfield-circular-root-ledger.mjs", proof: "scripts/eom/verify-subfield-circular-history.mjs",
});
export const SUBFIELD_CIRCULAR_RUNTIME_HASHES = Object.freeze({
  pilot: "f35054fe1c2113427f4abd69fe8daca260a7478d6698f9d2dc140e9a7428d137",
  outer: "dcd4bb58b83489fe66093fa61104245aae7dbf914c6e756a2e7e0b5349908289",
  helper: "1b96160ceee1d9a98374d84e9f15b1823572486a6b53546d922294a51cd3d982",
  bridge: "00cd8290a9929e0e099c91aeff03c52cf06ec5d9cad329ffad00092c61815e02",
  watch: "8e32e1d289b46a7aa287a57602202046d99715daef92a291e1d353a741066d79",
  reducer: "1b146e7efbc05f000f37d313f8e5ee353e802ddf00738dbcdaa543165f001bb8",
  cli: "2b3eb236b561c1901e6dfc58603f97f1104fc045e79d2d7a10d8879da02fd60a",
  proof: "b2fc83aa828ac9f175d7c3ae7bf43b66fcda54a702de6f2f80812852aebd5f38",
});
export const SUBFIELD_CIRCULAR_IDS = Object.freeze(["coincident-midpoint-common-frequency", "coincident-midpoint-equal-radius-common-frequency", "coincident-midpoint-3-2-1-frequency", "phase-compensated-equal-geometry", "axially-separated-common-frequency", "axially-separated-equal-radius-common-frequency", "axially-separated-3-2-1-frequency", "axial-transverse-coincident-axis-interior", "high-axial-coincident-axis-interior", "planar-common-center-three-binary", "coincident-center-two-component-circular-co-rotating", "coincident-center-two-component-circular-counter-rotating", "coaxial-separated-two-component-circular-co-rotating", "coaxial-separated-two-component-circular-counter-rotating", "coaxial-separated-two-planar-braid-co-rotating", "coaxial-separated-two-planar-braid-counter-rotating"]);
export const SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION = Object.freeze({ cadenceSeconds: 15, commandTimeoutMs: 2000,
  memoryPressureCommand: "/usr/bin/memory_pressure", minimumSystemFreePercent: 20,
  planningMemoryBytesPerCandidate: 2147483648, planningSharedMemoryBytes: 1073741824,
  planningOutputBytes: 171798691840, minimumFreeDiskBytesAtLaunch: 171798691840,
  minimumFreeDiskBytesDuringRun: 17179869184,
  onContact: "stop-new-dispatch-cancel-owned-active-jobs-preserve-resource-interruption" });
export const rungSha = bytes => createHash("sha256").update(bytes).digest("hex");
const check = (ok, message, code = "CANDIDATE_LOCAL_FAILURE") => { if (!ok) throw Object.assign(new Error(message), { failureCode: code }); };
const writeJSON = (filename, value) => writeFileSync(filename, JSON.stringify(value) + "\n", { flag: "wx" });
const digestToken = value => typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);

export function validateSubfieldCircularResourcePlan(plan) {
  check(plan?.schema === "braid-program/subfield-circular-root-ladder-resource-plan.v1" && plan.resourceBudgetReviewed === true && plan.independentReviewStatus === "accepted" &&
    plan.h3EvidenceEligible === false && plan.wallLimitSecondsPerCandidateRung === 1800 &&
    JSON.stringify(plan.rungs) === "[8,32,128]" && plan.eomWorkersPerCandidate === 1 &&
    Number.isSafeInteger(plan.maximumConcurrentCandidates) && plan.maximumConcurrentCandidates > 0 && plan.maximumConcurrentCandidates <= 4 &&
    plan.totalEomWorkers === plan.maximumConcurrentCandidates, "reviewed fixed-1800-second resource plan required", "PLAN_REJECTED");
  check(Array.isArray(plan.candidates) && plan.candidates.length > 0 && new Set(plan.candidates).size === plan.candidates.length &&
    plan.candidates.every(id => SUBFIELD_CIRCULAR_IDS.includes(id)) && plan.candidates.every((id, index) => index === 0 || SUBFIELD_CIRCULAR_IDS.indexOf(id) > SUBFIELD_CIRCULAR_IDS.indexOf(plan.candidates[index - 1])),
    "resource plan candidate census/order differs", "PLAN_REJECTED");
  check(plan.buildReceipt?.sha256 === SUBFIELD_CIRCULAR_BUILD_SHA && plan.buildReceipt.path === SUBFIELD_CIRCULAR_BUILD_PATH && digestToken(plan.pilotAdmission?.sha256) &&
    typeof plan.pilotAdmission.path === "string" && digestToken(plan.runnerSha256) && digestToken(plan.dispatcherSha256),
    "plan lacks authenticated pilot/build/code bindings", "PLAN_REJECTED");
  check(Object.entries(SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION).every(([key, value]) => plan.resourceObservation?.[key] === value),
    "exact reviewed operational resource predicates required", "PLAN_REJECTED");
  check(Array.isArray(plan.resourceReturns) && plan.resourceReturns.every(id => SUBFIELD_CIRCULAR_IDS.includes(id) && !plan.candidates.includes(id)),
    "resource-return candidates must remain outside executable cohort", "PLAN_REJECTED");
  check(new Set(plan.resourceReturns).size === plan.resourceReturns.length && plan.candidates.length + plan.resourceReturns.length === SUBFIELD_CIRCULAR_IDS.length,
    "every canonical candidate needs an enabled or resource-return disposition", "PLAN_REJECTED");
  check(Array.isArray(plan.cohorts) && plan.cohorts.length > 0 && plan.cohorts.every(cohort => Array.isArray(cohort.candidates) &&
    cohort.candidates.length > 0 && [1800, 3600].includes(cohort.wallLimitSeconds) &&
    (cohort.wallLimitSeconds === 1800 || (cohort.resourceReturn?.independentReviewStatus === "accepted" &&
      typeof cohort.resourceReturn.path === "string" && digestToken(cohort.resourceReturn.sha256)))),
    "increased wall cap needs an explicitly bound accepted resource-return declaration", "PLAN_REJECTED");
  const covered = plan.cohorts.flatMap(cohort => cohort.candidates);
  check(covered.length === plan.candidates.length && new Set(covered).size === covered.length && plan.candidates.every(id => covered.includes(id)),
    "resource cohorts must partition enabled candidates exactly", "PLAN_REJECTED");
  return plan;
}

export function candidateWallLimit(plan, candidateId) {
  validateSubfieldCircularResourcePlan(plan);
  const cohort = plan.cohorts.find(row => row.candidates.includes(candidateId));
  check(cohort, "candidate has no reviewed resource cohort", "PLAN_REJECTED"); return cohort.wallLimitSeconds;
}

export function candidateRungSchedule(candidateId, rung) {
  check(SUBFIELD_CIRCULAR_IDS.includes(candidateId) && [8, 32, 128].includes(rung), "fixed candidate/rung required");
  const memberCount = SUBFIELD_CIRCULAR_IDS.indexOf(candidateId) < 10 ? 6 : 12;
  return Array.from({ length: rung }, (_, phase) => ({ candidateId, rung, phase,
    receptionTime: String(4 + 4 * phase / rung), memberCount, rowCount: memberCount ** 2,
    ordinaryRootCount: memberCount * (memberCount - 1), selfEndpointCount: memberCount }));
}

export function candidateRungDispositions(schedule, phases) {
  return schedule.map((row, index) => {
    const attempted = phases[index], dispatched = attempted?.process?.dispatchedRows ?? 0;
    check(Number.isSafeInteger(dispatched) && dispatched >= 0 && dispatched <= row.rowCount, "invalid dispatched census");
    return { candidateId: row.candidateId, rung: row.rung, phase: row.phase, pairOrder: "receiver-major-transmitter-minor",
      ranges: attempted?.accepted ? [{ from: 0, count: row.rowCount, disposition: "passed" }] : [
        ...(dispatched ? [{ from: 0, count: dispatched, disposition: "failed", reason: "attempted-not-phase-accepted; not-geometry-rejection" }] : []),
        ...(dispatched < row.rowCount ? [{ from: dispatched, count: row.rowCount - dispatched, disposition: "not-run" }] : [])] };
  });
}

export function summarizeSubfieldCircularNamedOutputs(bindings, maximumPrecisionBits = null) {
  const unique = new Map();
  for (const binding of bindings.filter(Boolean)) {
    check(typeof binding.path === "string" && digestToken(binding.sha256) && Number.isSafeInteger(binding.bytes) && binding.bytes >= 0,
      "named output requires exact byte binding");
    const filename = path.resolve(binding.path), previous = unique.get(filename);
    check(!previous || (previous.sha256 === binding.sha256 && previous.bytes === binding.bytes), "conflicting named output identity");
    unique.set(filename, { path: filename, sha256: binding.sha256, bytes: binding.bytes });
  }
  check(maximumPrecisionBits === null || (Number.isSafeInteger(maximumPrecisionBits) && maximumPrecisionBits > 0), "invalid achieved precision census");
  const namedOutputs = [...unique.values()].sort((a,b) => a.path.localeCompare(b.path));
  const outputBytes = namedOutputs.reduce((sum, binding) => sum + binding.bytes, 0);
  check(Number.isSafeInteger(outputBytes), "named output byte total exceeded exact integer range");
  return { outputBytes, namedOutputCount: namedOutputs.length, namedOutputs, maximumPrecisionBits,
    outputBytesScope: "deduplicated-named-current-candidate-output-bindings; excludes shared-build-source-reference-pilot-resource-log and self-publication or unnamed-partial files" };
}

export function subfieldCircularRungNamedOutputBindings(record) {
  return [record.buildBefore, record.buildAfter, record.summary, record.ladderSummary,
    ...record.phases.flatMap(phase => [phase.historyManifest, phase.conformance, phase.phaseReceipt, phase.operationalReceipt,
      phase.process?.rawRows, phase.process?.stdoutLog, phase.process?.stderrLog]), ...record.stages.map(stage => stage.log)].filter(Boolean);
}

// This mechanical scheduling guard uses the frozen exact-decimal parser. Its
// agreement does NOT supply an independent partial ladder scope or H3 result.
export function checkRepeatedSubfieldCircularPhase(current, prior, exactDecimal) {
  check(current.candidateId === prior.candidateId && current.receptionTime === prior.receptionTime, "repeated-phase key differs");
  check(current.historyManifest.sha256 === prior.historyManifest.sha256 && JSON.stringify(current.members) === JSON.stringify(prior.members) &&
    JSON.stringify(current.sourceBinding) === JSON.stringify(prior.sourceBinding) && current.rows.length === prior.rows.length,
    "repeated reception manifest/member identity differs", "REPEATED_PHASE_MISMATCH");
  const greater = (a, b) => { const x = exactDecimal(a), y = exactDecimal(b); return x.n * y.d > y.n * x.d; };
  current.rows.forEach((row, index) => {
    const old = prior.rows[index];
    check(row.receiverIndex === old.receiverIndex && row.transmitterIndex === old.transmitterIndex && row.roots.length === old.roots.length,
      "repeated reception pair/root census differs", "REPEATED_PHASE_MISMATCH");
    row.roots.forEach((root, at) => check(!greater(root.lower, old.roots[at].upper) && !greater(old.roots[at].lower, root.upper),
      "repeated root intervals are disjoint", "REPEATED_PHASE_MISMATCH"));
  });
  return { schedulingConformant: true, accepted: false, h3EvidenceEligible: false };
}

export function authenticateSubfieldCircularPriorPhases({ candidateId, rung, prior, pilotSummary, admissions, phaseBindings, planBinding }) {
  check(pilotSummary?.accepted === true && pilotSummary.h3EvidenceEligible === false && pilotSummary.scope === "pilot" &&
    pilotSummary.phaseCount === 32 && pilotSummary.rowCount === 2448 && pilotSummary.phaseReceipts?.length === 32,
    "complete authenticated pilot summary required", "PLAN_REJECTED");
  const older = rung === 8 ? [] : rung === 32 ? [8] : [8, 32];
  check(admissions.length === older.length && prior.rungAdmissions?.length === older.length, "prior rung admission count differs", "PLAN_REJECTED");
  const expected = pilotSummary.phaseReceipts.filter(row => row.candidateId === candidateId);
  check(expected.length === 2 && expected.every((row, index) => row.rung === 2 && row.phase === index), "pilot candidate chain differs", "PLAN_REJECTED");
  admissions.forEach((record, index) => {
    const value = record.value, authority = value.admission;
    check(value.accepted === true && value.h3EvidenceEligible === false && value.processesClosed === true &&
      authority?.accepted === true && authority.h3EvidenceEligible === false && authority.candidateId === candidateId &&
      authority.rung === older[index] && authority.plan?.path === planBinding.path && authority.plan?.sha256 === planBinding.sha256 &&
      authority.phaseReceipts?.length === older[index], "prior rung lacks matching external admission", "PLAN_REJECTED");
    expected.push(...authority.phaseReceipts);
  });
  check(expected.length === phaseBindings.length && expected.every((binding, index) => binding.path === phaseBindings[index].path &&
    binding.sha256 === phaseBindings[index].sha256), "prior phase hashes are not the authenticated pilot/rung chain", "PLAN_REJECTED");
  return { schedulingAuthorized: true, h3EvidenceEligible: false };
}

export async function watchedSubfieldCircularRepeatedPhases({ current, prior, sources, limitMs, signal }) {
  const runner = sources.find(row => row.path === SUBFIELD_CIRCULAR_RUNG_PATH), reducer = sources.find(row => row.path === SUBFIELD_CIRCULAR_RUNTIME_PATHS.reducer);
  check(runner && reducer && rungSha(runner.bytes) === runner.sha256 && rungSha(reducer.bytes) === reducer.sha256,
    "captured scheduling guard generation required", "SHARED_BINDING_DRIFT");
  const worker = new Worker(`const{parentPort,workerData:d}=require('node:worker_threads');(async()=>{
    const r=await import('data:text/javascript;base64,'+Buffer.from(d.runner).toString('base64'));
    const x=await import('data:text/javascript;base64,'+Buffer.from(d.reducer).toString('base64'));
    for(const p of d.prior)r.checkRepeatedSubfieldCircularPhase(d.current,p,x.subfieldCircularExactDecimal);
    parentPort.postMessage({ok:true});})().catch(e=>parentPort.postMessage({error:e.message,failureCode:e.failureCode}));`,
  { eval: true, execArgv: [], workerData: { runner: runner.bytes, reducer: reducer.bytes, current, prior } });
  let timer, onAbort;
  try { await new Promise((resolve, reject) => {
    onAbort = () => reject(signal?.reason ?? new Error("repeat guard interrupted"));
    signal?.addEventListener("abort", onAbort, { once: true }); if (signal?.aborted) onAbort();
    timer = setTimeout(() => reject(Object.assign(new Error("repeat guard deadline"), { failureCode: "CANDIDATE_RESOURCE_LIMIT" })), limitMs);
    worker.once("message", m => m.ok ? resolve() : reject(Object.assign(new Error(m.error), { failureCode: m.failureCode })));
    worker.once("error", reject); worker.once("exit", code => reject(new Error(`repeat guard closed without result (${code})`)));
  }); } finally { await worker.terminate(); clearTimeout(timer); signal?.removeEventListener("abort", onAbort); }
}

export function validateSubfieldCircularRungSummary(summary, expected, phaseReceipts, scope) {
  check(summary?.schema === "braid-program/subfield-circular-root-summary-reduction.v1" && summary.accepted === true &&
    summary.h3EvidenceEligible === false && summary.rootExecutionAuthorized === false &&
    summary.authority === "authenticated-phase-summary-chain-only" && summary.scope === scope &&
    JSON.stringify(summary.candidateIds) === JSON.stringify([expected.candidateId]) && summary.phaseCount === phaseReceipts.length,
    "independent rung/ladder summary authority or census differs");
  const schedule = scope === "candidate-ladder" ? [8, 32, 128].flatMap(rung => candidateRungSchedule(expected.candidateId, rung)) : candidateRungSchedule(expected.candidateId, expected.rung);
  check(summary.rowCount === schedule.reduce((sum, row) => sum + row.rowCount, 0) &&
    summary.ordinaryRootCount === schedule.reduce((sum, row) => sum + row.ordinaryRootCount, 0) &&
    summary.selfEndpointCount === schedule.reduce((sum, row) => sum + row.selfEndpointCount, 0) && summary.phaseReceipts?.length === schedule.length,
    "independent summary row census differs");
  summary.phaseReceipts.forEach((row, index) => check(row.path === phaseReceipts[index].path && row.sha256 === phaseReceipts[index].sha256 &&
    row.candidateId === schedule[index].candidateId && row.rung === schedule[index].rung && row.phase === schedule[index].phase, "summary phase chain differs"));
  check(summary.phaseReceiptChainSha256 === rungSha(phaseReceipts.map(row => row.sha256).join("\n") + "\n"), "summary chain hash differs");
}

export function parseSubfieldCircularRungArgs(argv) {
  const names = ["--plan", "--plan-sha256", "--candidate", "--rung", "--prior-phase-receipts", "--prior-phase-receipts-sha256", "--out", "--runner-sha256"], result = {};
  for (let at = 0; at < argv.length; at += 2) {
    check(names.includes(argv[at]) && argv[at + 1] && !result[argv[at]], "unknown, missing or duplicate rung argument", "PLAN_REJECTED");
    result[argv[at]] = argv[at + 1];
  }
  check(names.every(name => result[name]) && [8, 32, 128].includes(Number(result["--rung"])) && SUBFIELD_CIRCULAR_IDS.includes(result["--candidate"]) &&
    ["--plan-sha256", "--prior-phase-receipts-sha256", "--runner-sha256"].every(name => digestToken(result[name])), "complete authenticated rung arguments required", "PLAN_REJECTED");
  const out = result["--out"];
  check(out.startsWith(SUBFIELD_CIRCULAR_RUN_BASE) && out.length > SUBFIELD_CIRCULAR_RUN_BASE.length && !out.includes("\\") && out.split("/").every(part => part && part !== "." && part !== ".."), "fresh scoped output required", "PLAN_REJECTED");
  return result;
}

export async function runSubfieldCircularCandidateRung({ root, args, sources, runtime, began = performance.now() }) {
  const candidateId = args["--candidate"], rung = Number(args["--rung"]), schedule = candidateRungSchedule(candidateId, rung);
  const output = path.resolve(root, args["--out"]), abort = new AbortController();
  let wallLimitSeconds = 1800;
  const elapsed = () => (performance.now() - began) / 1000;
  const remaining = () => { check(!abort.signal.aborted && elapsed() < wallLimitSeconds, "candidate/rung deadline or interruption", "CANDIDATE_RESOURCE_LIMIT"); return Math.max(1, Math.floor(wallLimitSeconds * 1000 - elapsed() * 1000)); };
  check(!existsSync(output), "rung output already exists"); mkdirSync(output);
  const receipt = { schema: "braid-program/subfield-circular-candidate-rung-process.v1", accepted: false, h3EvidenceEligible: false,
    rootExecutionAuthorized: false, candidateId, rung, wallLimitSeconds: 1800, startedAt: new Date().toISOString(),
    phases: [], phaseReceipts: [], stages: [], sourceBindings: sources.map(({ bytes, ...binding }) => binding),
    buildReceipt: { path: path.join(root, SUBFIELD_CIRCULAR_BUILD_PATH), sha256: SUBFIELD_CIRCULAR_BUILD_SHA }, plan: { path: path.resolve(args["--plan"]), sha256: args["--plan-sha256"] },
    priorReceipts: { path: path.resolve(args["--prior-phase-receipts"]), sha256: args["--prior-phase-receipts-sha256"] },
    terminalAdmissionRequired: true, claimBoundary: "Prescribed candidate/rung only; independent complete-scope ledger remains required. No H3 promotion, evolution, retention, stability, score, or physical claim." };
  const pilotSource = sources.find(row => row.path === SUBFIELD_CIRCULAR_RUNTIME_PATHS.pilot);
  const fileJob = job => runtime.pilot.watchedPilotFileOperation({ root, ...job }, { runnerBytes: pilotSource.bytes,
    runnerSha256: pilotSource.sha256, limitMs: remaining(), signal: abort.signal });
  const inspect = files => fileJob({ kind: "files", files });
  let shared = [], activeWorker, failure, stageName = "preflight";
  const stop = () => { abort.abort(new Error("candidate/rung interrupted")); if (activeWorker) void activeWorker.close(); };
  process.on("SIGINT", stop); process.on("SIGTERM", stop);
  let timer = setTimeout(stop, remaining()); const heartbeat = setInterval(() => console.error(JSON.stringify({ candidateId, rung, stage: stageName,
    acceptedPhases: receipt.phaseReceipts.length, elapsedWallSeconds: elapsed(), h3EvidenceEligible: false })), 15000);
  const recheckShared = async () => { try { await inspect(shared); } catch (error) { error.failureCode = "SHARED_BINDING_DRIFT"; throw error; } };
  const stage = async (name, command, commandArgs, directory) => {
    stageName = name; await recheckShared();
    const logPath = path.join(directory, `${name}.log`), record = { stage: name, logPath, startedAtSeconds: elapsed() }; receipt.stages.push(record);
    try { record.process = await runtime.watch.runWatched("/usr/bin/time", ["-l", command, ...commandArgs], { cwd: root,
      logPath, stage: `${candidateId}/${rung}/${name}`, limitMs: remaining(), heartbeatMs: 15000, terminationGraceMs: 5000 }); }
    catch (error) { record.process = error.processResult; record.failure = error.message; throw error; }
    finally { record.finishedAtSeconds = elapsed(); }
    [record.log] = await inspect([{ path: logPath, profile: true }]); remaining(); return record;
  };
  const summary = async (scope, phases, filename) => {
    await stage(scope, process.execPath, [path.join(root, SUBFIELD_CIRCULAR_RUNTIME_PATHS.cli), "--repo-root", root, "--scope", scope,
      ...phases.flatMap(record => ["--phase-receipt", record.path, "--phase-receipt-sha256", record.sha256]), "--out", filename], output);
    const [binding] = await inspect([{ path: filename, json: true }]); validateSubfieldCircularRungSummary(binding.value, { candidateId, rung }, phases, scope);
    delete binding.value; return binding;
  };
  const usageStart = process.resourceUsage();
  try {
    check(process.platform === "darwin" && !process.env.NODE_OPTIONS && !process.env.DYLD_INSERT_LIBRARIES && !process.env.DYLD_LIBRARY_PATH &&
      !process.env.LD_PRELOAD && !process.env.LD_LIBRARY_PATH, "measured clean macOS environment required", "SHARED_RUNTIME_REJECTED");
    const [planBinding, priorBinding] = await inspect([{ ...receipt.plan, json: true }, { ...receipt.priorReceipts, json: true }]);
    const plan = validateSubfieldCircularResourcePlan(planBinding.value), prior = priorBinding.value;
    check(plan.candidates.includes(candidateId) && plan.runnerSha256 === args["--runner-sha256"] &&
      prior.candidateId === candidateId && Array.isArray(prior.phaseReceipts), "candidate/runner/prior authorization differs", "PLAN_REJECTED");
    const cohort = plan.cohorts.find(row => row.candidates.includes(candidateId));
    if (cohort.resourceReturn) await inspect([cohort.resourceReturn]);
    wallLimitSeconds = candidateWallLimit(plan, candidateId); receipt.wallLimitSeconds = wallLimitSeconds;
    clearTimeout(timer); timer = setTimeout(stop, remaining());
    receipt.pilotAdmission = plan.pilotAdmission;
    const [pilotAdmission] = await inspect([{ ...plan.pilotAdmission, json: true }]);
    check(pilotAdmission.value.accepted === true && pilotAdmission.value.h3EvidenceEligible === false &&
      pilotAdmission.value.admission?.accepted === true, "reviewed pilot admission required", "PLAN_REJECTED");
    const [pilotSummary] = await inspect([{ ...pilotAdmission.value.admission.summary, json: true }]);
    check(Array.isArray(prior.rungAdmissions), "prior rung admissions required", "PLAN_REJECTED");
    const admissions = await inspect(prior.rungAdmissions.map(record => ({ ...record, json: true })));
    const priorReceipts = await inspect(prior.phaseReceipts.map(record => ({ ...record, json: true })));
    authenticateSubfieldCircularPriorPhases({ candidateId, rung, prior, pilotSummary: pilotSummary.value, admissions,
      phaseBindings: priorReceipts, planBinding: receipt.plan });
    const expectedPriorRungs = rung === 8 ? [2] : rung === 32 ? [2, 8] : [2, 8, 32];
    const expectedPrior = expectedPriorRungs.flatMap(value => Array.from({ length: value }, (_, phase) => [value, phase]));
    check(priorReceipts.length === expectedPrior.length && priorReceipts.every((record, index) => record.value.accepted === true &&
      record.value.candidateId === candidateId && record.value.rung === expectedPrior[index][0] && record.value.phase === expectedPrior[index][1]),
      "prior phase census differs", "PLAN_REJECTED");
    const build = await fileJob({ kind: "build", out: path.join(output, "build-before.json") });
    [receipt.buildBefore] = await inspect([{ path: path.join(output, "build-before.json") }]);
    const runtimeBindings = await inspect([{ path: process.execPath }, { path: "/usr/bin/time" }]);
    shared = [...build.fastBindings, ...receipt.sourceBindings, ...runtimeBindings, receipt.plan, receipt.priorReceipts, plan.pilotAdmission,
      ...prior.phaseReceipts, ...prior.rungAdmissions, pilotAdmission.value.admission.summary,
      { path: SUBFIELD_CIRCULAR_DISPATCH_PATH, sha256: plan.dispatcherSha256 }, ...(cohort.resourceReturn ? [cohort.resourceReturn] : [])];
    receipt.runtimeBindings = runtimeBindings;
    const executable = path.resolve(root, build.built.executable.path), reducerSource = sources.find(record => record.path === SUBFIELD_CIRCULAR_RUNTIME_PATHS.reducer);
    for (const expected of schedule) {
      const started = elapsed(), directory = path.join(output, `phase-${expected.phase}`); mkdirSync(directory);
      const phase = { ...expected, accepted: false, directory, startedAtSeconds: started }; receipt.phases.push(phase);
      const manifestPath = path.join(directory, "history-manifest.json"), proofPath = path.join(directory, "history-conformance.json"),
        rowsPath = path.join(directory, "rows.ndjson"), ledgerPath = path.join(directory, "phase-ledger.json");
      const common = ["--repo-root", root, "--candidate", candidateId, "--rung", String(rung), "--phase", String(expected.phase)];
      await stage("manifest", executable, ["manifest", ...common, "--out", manifestPath], directory);
      [phase.historyManifest] = await inspect([{ path: manifestPath }]);
      const repeated = priorReceipts.filter(record => record.value.receptionTime === expected.receptionTime);
      for (const old of repeated) check(old.value.historyManifest.sha256 === phase.historyManifest.sha256, "repeated actual manifest bytes differ", "REPEATED_PHASE_MISMATCH");
      await stage("conformance", process.execPath, [path.join(root, SUBFIELD_CIRCULAR_RUNTIME_PATHS.proof), "--manifest", manifestPath, "--rung", String(rung), "--phase", String(expected.phase), "--out", proofPath], directory);
      const [proof] = await inspect([{ path: proofPath, json: true }]); runtime.pilot.validatePilotProof(proof.value, expected, phase.historyManifest);
      const manifestId = proof.value.manifestId; delete proof.value; phase.conformance = proof;
      await recheckShared();
      activeWorker = await runtime.bridge.openSubfieldCircularPhaseLedgerWorker({ reducerBytes: reducerSource.bytes, reducerSha256: reducerSource.sha256,
        options: { repoRoot: root, historyManifest: manifestPath, conformance: proofPath, conformanceSha256: proof.sha256,
          buildReceipt: receipt.buildReceipt.path, buildReceiptSha256: SUBFIELD_CIRCULAR_BUILD_SHA }, limitMs: remaining(), signal: abort.signal,
        progress: event => { stageName = `ledger:${event.stage ?? "checking"}`; } });
      try {
        check(activeWorker.identity.candidateId === candidateId && activeWorker.identity.rung === rung && activeWorker.identity.phase === expected.phase &&
          activeWorker.identity.historyManifestSha256 === phase.historyManifest.sha256 && activeWorker.identity.conformanceSha256 === proof.sha256,
          "isolated phase identity differs");
        stageName = "root-rows"; await recheckShared();
        try { phase.process = await runtime.helper.runSubfieldCircularPhaseProcess({ command: "/usr/bin/time",
          args: ["-l", executable, "serve", ...common, "--history-manifest", manifestPath, "--conformance", proofPath, "--out", rowsPath],
          cwd: root, rawRowsPath: rowsPath, stdoutLogPath: path.join(directory, "root-stdout.log"), stderrLogPath: path.join(directory, "root-stderr.log"),
          identity: activeWorker.identity, pairs: Array.from({ length: expected.rowCount }, (_, index) => [Math.floor(index / expected.memberCount), index % expected.memberCount]),
          checkRowBytes: (bytes, context) => activeWorker.checkRowBytes(bytes, context), limitMs: remaining(), heartbeatMs: 15000, terminationGraceMs: 5000 }); }
        catch (error) { phase.process = error.phaseReceipt; throw error; }
        [phase.rootProfile] = await inspect([{ ...phase.process.stderrLog, profile: true }]);
        await activeWorker.recheck(expected.rowCount);
      } finally { await activeWorker.close(); activeWorker = undefined; }
      await stage("phase-ledger", process.execPath, [path.join(root, SUBFIELD_CIRCULAR_RUNTIME_PATHS.cli), "--repo-root", root, "--history-manifest", manifestPath,
        "--conformance", proofPath, "--conformance-sha256", proof.sha256, "--rows", rowsPath,
        "--build-receipt", receipt.buildReceipt.path, "--build-receipt-sha256", SUBFIELD_CIRCULAR_BUILD_SHA, "--out", ledgerPath], directory);
      const [ledger, raw] = await inspect([{ path: ledgerPath, json: true }, { ...phase.process.rawRows }]);
      runtime.pilot.validatePilotPhase(ledger.value, expected, { historyManifest: phase.historyManifest, conformance: proof,
        buildReceipt: receipt.buildReceipt, rawRows: raw, reducer: { path: SUBFIELD_CIRCULAR_RUNTIME_PATHS.reducer, sha256: SUBFIELD_CIRCULAR_RUNTIME_HASHES.reducer },
        cli: { path: SUBFIELD_CIRCULAR_RUNTIME_PATHS.cli, sha256: SUBFIELD_CIRCULAR_RUNTIME_HASHES.cli }, manifestId });
      await watchedSubfieldCircularRepeatedPhases({ current: ledger.value, prior: repeated.map(old => old.value), sources,
        limitMs: remaining(), signal: abort.signal });
      phase.maximumPrecisionBits = ledger.value.maximumPrecisionBits; delete ledger.value; phase.phaseReceipt = ledger;
      phase.accepted = true; writeJSON(path.join(directory, "phase-process.json"), phase);
      [phase.operationalReceipt] = await inspect([{ path: path.join(directory, "phase-process.json") }]);
      phase.phaseWallSeconds = elapsed() - started; receipt.phaseReceipts.push(ledger); remaining();
    }
    receipt.summary = await summary("candidate-rung", receipt.phaseReceipts, path.join(output, "rung-ledger.json"));
    if (rung === 128) receipt.ladderSummary = await summary("candidate-ladder", [
      ...priorReceipts.filter(record => record.value.rung !== 2).map(({ value, ...binding }) => binding), ...receipt.phaseReceipts], path.join(output, "ladder-ledger.json"));
    await fileJob({ kind: "build", out: path.join(output, "build-after.json") });
    [receipt.buildAfter] = await inspect([{ path: path.join(output, "build-after.json") }]); await recheckShared();
    await inspect([...receipt.phases.flatMap(phase => [phase.historyManifest, phase.conformance, phase.phaseReceipt, phase.operationalReceipt,
      phase.process.rawRows, phase.process.stdoutLog, phase.process.stderrLog]), ...receipt.stages.map(item => item.log), receipt.summary,
      ...(receipt.ladderSummary ? [receipt.ladderSummary] : []), receipt.buildBefore, receipt.buildAfter]);
    remaining(); receipt.accepted = true;
  } catch (error) {
    failure = error;
    if (!error.failureCode && shared.length && elapsed() < wallLimitSeconds && !abort.signal.aborted) {
      try { await recheckShared(); } catch (drift) { failure = drift; }
    }
    receipt.failure = failure.message; receipt.failureCode = failure.failureCode ?? "CANDIDATE_LOCAL_FAILURE";
  } finally {
    if (activeWorker) await activeWorker.close();
    const usage = process.resourceUsage(), profiles = [...receipt.stages.map(item => item.log?.profile), ...receipt.phases.map(phase => phase.rootProfile?.profile)].filter(Boolean);
    receipt.resources = { complete: receipt.accepted, measuredCPUSeconds: profiles.reduce((sum, profile) => sum + profile.childUserSeconds + profile.childSystemSeconds, 0) +
      (usage.userCPUTime + usage.systemCPUTime - usageStart.userCPUTime - usageStart.systemCPUTime) / 1e6,
      maximumIndividualProcessResidentBytes: Math.max(usage.maxRSS * 1024, ...profiles.map(profile => profile.maximumIndividualProcessResidentBytes)),
      rssScope: "individual-process-high-water-not-aggregate; gate/dispatcher-overhead-accounted-by-outer" };
    try { Object.assign(receipt.resources, summarizeSubfieldCircularNamedOutputs(subfieldCircularRungNamedOutputBindings(receipt),
      receipt.phases.some(phase => phase.maximumPrecisionBits) ? Math.max(...receipt.phases.map(phase => phase.maximumPrecisionBits ?? 0)) : null)); }
    catch (error) { receipt.accepted = false; receipt.resources.complete = false; receipt.resourceAccountingFailure = error.message;
      receipt.failure ??= error.message; receipt.failureCode ??= "CANDIDATE_LOCAL_FAILURE"; }
    receipt.rowDispositions = candidateRungDispositions(schedule, receipt.phases); receipt.elapsedWallSeconds = elapsed();
    if (elapsed() >= wallLimitSeconds || abort.signal.aborted) { receipt.accepted = false; receipt.failureCode ??= "CANDIDATE_RESOURCE_LIMIT"; receipt.failure ??= "deadline/interruption"; }
    try {
      writeJSON(path.join(output, "rung-process.json"), receipt);
      if (elapsed() >= wallLimitSeconds) { receipt.accepted = false; writeJSON(path.join(output, "rung-rejection.json"), { accepted: false, h3EvidenceEligible: false, failure: "final output exceeded deadline" }); }
    } finally { clearTimeout(timer); clearInterval(heartbeat); process.off("SIGINT", stop); process.off("SIGTERM", stop); }
  }
  if (!receipt.accepted) throw Object.assign(failure ?? new Error(receipt.failure), { rungReceipt: receipt });
  return receipt;
}

export async function captureSubfieldCircularRungSources(root, runnerSha256) {
  return [{ path: SUBFIELD_CIRCULAR_RUNG_PATH, sha256: runnerSha256 }, ...Object.entries(SUBFIELD_CIRCULAR_RUNTIME_PATHS).map(([key, relative]) => ({ path: relative, sha256: SUBFIELD_CIRCULAR_RUNTIME_HASHES[key] }))]
    .map(binding => ({ ...binding, bytes: captureSubfieldCircularRungSource(path.join(root, binding.path), binding.sha256) }));
}

export function captureSubfieldCircularRungSource(filename, expected, io = { read: readSync, stat: fstatSync }) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const before = io.stat(fd);
    check(before.isFile() && before.size <= 2 * 1024 ** 2, "source capture requires a bounded regular file", "SHARED_BINDING_DRIFT");
    const bytes = Buffer.alloc(before.size); let at = 0;
    while (at < bytes.length) { const count = io.read(fd, bytes, at, bytes.length - at, at);
      check(count > 0, "source truncated during capture", "SHARED_BINDING_DRIFT"); at += count; }
    const after = io.stat(fd);
    check(after.isFile() && after.size === before.size && after.mtimeMs === before.mtimeMs && after.ctimeMs === before.ctimeMs &&
      rungSha(bytes) === expected, "source generation changed during capture", "SHARED_BINDING_DRIFT");
    return bytes;
  } finally { closeSync(fd); }
}

async function main() {
  const began = performance.now(), args = parseSubfieldCircularRungArgs(process.argv.slice(2));
  const root = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  const sources = await captureSubfieldCircularRungSources(root, args["--runner-sha256"]), pilotSource = sources.find(row => row.path === SUBFIELD_CIRCULAR_RUNTIME_PATHS.pilot);
  const pilot = await import("data:text/javascript;base64," + pilotSource.bytes.toString("base64"));
  const snapshot = pilot.installPilotSnapshot(sources, root);
  try {
    const runner = await snapshot.import(SUBFIELD_CIRCULAR_RUNG_PATH), runtime = {};
    for (const key of ["pilot", "helper", "bridge", "watch", "reducer"]) runtime[key] = await snapshot.import(SUBFIELD_CIRCULAR_RUNTIME_PATHS[key]);
    const result = await runner.runSubfieldCircularCandidateRung({ root, args, sources, runtime, began });
    console.log(JSON.stringify({ accepted: result.accepted, candidateId: result.candidateId, rung: result.rung, h3EvidenceEligible: false }));
  } finally { snapshot.close(); }
}
if (import.meta.url.startsWith("file:") && !new URL(import.meta.url).search && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(error => { console.error(error.stack); process.exitCode = 1; });
