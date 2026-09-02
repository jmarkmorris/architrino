import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { SUBFIELD_CIRCULAR_GATE_SOURCE, classifyPilotGateRoles, currentOwnedGroup, descendantRecords, parseLauncherArgs, parseOwnedProcessTable, processTable,
  outerWorkerOperation, superviseRegisteredPilot } from "../scripts/eom/launch-subfield-circular-root-pilot.mjs";

// Every launched executable is a synthetic Node actor. No EOM, geometry,
// conformance instrument, or scientific root calculation is invoked here.
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
function fixture(mode = "normal", suppliedRoot) {
  const root = suppliedRoot ?? realpathSync(mkdtempSync(path.join(os.tmpdir(), "subfieldCircular-outer-control-")));
  const marker = path.join(root, "target.pid");
  const runnerMarker = path.join(root, "runner.pid");
  const target = `const fs=require('node:fs');fs.writeFileSync(${JSON.stringify(marker)},String(process.pid),{flag:'wx'});
    process.stdout.write('synthetic-target-ready\\n');process.stderr.write('synthetic-target-stderr\\n');
    ${mode === "normal" ? "setTimeout(()=>process.exit(0),40)" : "process.on('SIGTERM',()=>{});setInterval(()=>{},1000)"}`;
  const script = `import{spawn}from'node:child_process';import{writeFileSync}from'node:fs';
    writeFileSync(${JSON.stringify(runnerMarker)},String(process.pid),{flag:'wx'});
    const child=spawn(process.execPath,['-e',${JSON.stringify(target)}],{cwd:${JSON.stringify(root)},detached:true,stdio:['ignore','pipe','pipe']});
    child.stdout.on('data',bytes=>{process.stdout.write(bytes);${mode === "blocked-parent" ? "while(true){}" : mode === "exit-after-ack" ? "process.exit(3)" : ""}});
    child.stderr.pipe(process.stderr);
    child.on('close',(code)=>process.exit(code??1));
    ${mode === "exit-before-ack" ? "process.exit(4);" : ""}`;
  const bytes = Buffer.from(script), filename = path.join(root, "actor.mjs"); writeFileSync(filename, bytes, { flag: "wx" });
  return { root, marker, runnerMarker, options: { root, entry: "actor.mjs", args: [], sources: [{ path: "actor.mjs", bytes, sha256: sha(bytes) }],
    output: path.join(root, "run"), limitMs: 18000, heartbeatMs: 200, graceMs: 100,
    inspectProcesses: async () => processTable(),
    admit: async () => ({ accepted: true, h3EvidenceEligible: false, syntheticOnly: true }) } };
}
const gone = pid => assert.throws(() => process.kill(pid, 0), error => error.code === "ESRCH");
async function rejection(options) {
  try { await superviseRegisteredPilot(options); assert.fail("synthetic operation must reject"); }
  catch (error) { assert.ok(error.outerReceipt, error.stack); assert.equal(error.outerReceipt.accepted, false); return error.outerReceipt; }
}

const UNRESOLVED_ADMISSION_DRIVER = "--unresolved-admission-driver";
async function runUnresolvedAdmissionDriver(root) {
  const { options } = fixture("normal", realpathSync(root));
  options.limitMs = 15600; options.admit = async () => new Promise(() => {});
  const receipt = await rejection(options);
  writeFileSync(path.join(root, "unresolved-admission-receipt.json"), JSON.stringify(receipt) + "\n", { flag: "wx" });
  await new Promise(() => {});
}
if (process.argv[2] === UNRESOLVED_ADMISSION_DRIVER) await runUnresolvedAdmissionDriver(process.argv[3]);

async function isolatedUnresolvedAdmission() {
  const root = realpathSync(mkdtempSync(path.join(os.tmpdir(), "subfieldCircular-unresolved-admission-")));
  const started = performance.now();
  const driver = spawn(process.execPath, [fileURLToPath(import.meta.url), UNRESOLVED_ADMISSION_DRIVER, root], { stdio: "ignore" });
  const status = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("unresolved admission driver exceeded 20 seconds")), 20000);
    driver.once("error", error => { clearTimeout(timeout); reject(error); });
    driver.once("close", (code, signal) => { clearTimeout(timeout); resolve({ code, signal }); });
  });
  const elapsed = performance.now() - started;
  assert.deepEqual(status, { code: null, signal: "SIGKILL" });
  assert.ok(elapsed >= 14500 && elapsed < 20000, `guard boundary was ${elapsed} ms`);
  return JSON.parse(readFileSync(path.join(root, "unresolved-admission-receipt.json"), "utf8"));
}

test("launcher arguments require reviewed bytes and fresh scoped output", () => {
  const good = ["--out", ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/new", "--launcher-sha256", "a".repeat(64)];
  assert.equal(parseLauncherArgs(good).launcherSha256, "a".repeat(64));
  for (const args of [[], good.slice(0, 2), [...good, "--out", "duplicate"], ["--out", "/tmp/x", ...good.slice(2)],
    ["--out", good[1] + "/../x", ...good.slice(2)]]) assert.throws(() => parseLauncherArgs(args));
});

test("identity table parsing and transitive owned-group closure exclude unrelated rows", () => {
  const table = parseOwnedProcessTable(" 100 1 100 Thu Aug 27 02:03:04 2026 Ss /node\n 101 100 101 Thu Aug 27 02:03:05 2026 S /node\n 102 101 101 Thu Aug 27 02:03:06 2026 S /target\n 103 1 103 Thu Aug 27 02:03:04 2026 S /unrelated\n");
  assert.deepEqual(descendantRecords(table, 100).map(row => row.pid), [100, 101, 102]);
  assert.deepEqual(descendantRecords(table.map(row => row.pid === 101 ? { ...row, ppid: 1 } : row), 100, [101]).map(row => row.pid), [100, 101, 102]);
  assert.throws(() => parseOwnedProcessTable("unparseable"));
});

test("completed or reused historical group identities are permanently retired from signal authority", () => {
  const identity = { pid: 100, ppid: 1, pgid: 100, started: "old", command: "/node" };
  const owner = { identity };
  assert.deepEqual(currentOwnedGroup([{ ...identity, started: "new" }], owner), []);
  assert.equal(owner.retired, true); assert.deepEqual(currentOwnedGroup([identity], owner), []);
  const completed = { identity }; assert.deepEqual(currentOwnedGroup([], completed), []);
  assert.deepEqual(currentOwnedGroup([{ ...identity, started: "new" }], completed), []);
  const continuing = { identity, knownMembers: [{ pid: 101, pgid: 100, started: "child" }] };
  assert.equal(currentOwnedGroup([{ pid: 101, pgid: 100, started: "child" }], continuing).length, 1);
  assert.throws(
    () => currentOwnedGroup([
      { ...identity, started: "new" },
      { pid: 101, pgid: 100, started: "child" },
    ], continuing),
    /original leader birth changed/u
  );
});

test("shared summary mentioning every phase receipt is charged only to its exact summary output role", () => {
  const phases = ["a", "b"].flatMap(candidateId => [0, 1].map(phase => ({ candidateId, phase, directory: `/synthetic/${candidateId}/${phase}` })));
  const pilot = { phases, summary: { path: "/synthetic/pilot-ledger.json" } };
  const gates = phases.flatMap(phase => ["history-manifest.json", "history-conformance.json", "rows.ndjson", "phase-ledger.json"]
    .map(name => ({ requestedArgs: ["--out", `${phase.directory}/${name}`] })));
  gates.push({ requestedArgs: ["--scope", "pilot", ...phases.flatMap(phase => ["--phase-receipt", `${phase.directory}/phase-ledger.json`]), "--out", pilot.summary.path] });
  const roles = classifyPilotGateRoles(pilot, gates);
  assert.equal(roles.filter(role => role.candidateId === "a").length, 8);
  assert.equal(roles.filter(role => role.candidateId === "b").length, 8);
  assert.equal(roles.filter(role => role.role === "shared-pilot-summary").length, 1);
  assert.throws(() => classifyPilotGateRoles(pilot, [...gates, gates[0]]), /census/u);
});

test("registered normal child preserves output, original arguments, clean exit and measured gate overhead", async () => {
  const { marker, options } = fixture(); const receipt = await superviseRegisteredPilot(options);
  assert.equal(receipt.accepted, true); assert.equal(receipt.processesClosed, true); assert.equal(receipt.gates.length, 1);
  const gate = receipt.gates[0]; assert.equal(gate.acknowledged, true); assert.equal(gate.identity.pid, gate.identity.pgid);
  assert.equal(gate.actualGateSourceSha256, sha(SUBFIELD_CIRCULAR_GATE_SOURCE)); assert.equal(gate.requestedCommand, process.execPath);
  assert.ok(gate.measurement.resourceUsage.maxRSS > 0); assert.equal(gate.measurement.code, 0);
  assert.match(readFileSync(receipt.stdoutLog.path, "utf8"), /synthetic-target-ready/u);
  assert.match(readFileSync(receipt.stderrLog.path, "utf8"), /synthetic-target-stderr/u);
  assert.equal(sha(readFileSync(receipt.stdoutLog.path)), receipt.stdoutLog.sha256);
  gone(Number(readFileSync(marker, "utf8"))); gone(receipt.runner.pid); gone(gate.identity.pid);
});

test("blocked runner and detached target are stopped, while an unrelated process survives", async () => {
  const unrelated = spawn(process.execPath, ["-e", "setInterval(()=>{},1000)"], { stdio: "ignore" });
  const { marker, options } = fixture("blocked-parent"); options.limitMs = 15700; options.heartbeatMs = 150;
  try {
    const receipt = await rejection(options); assert.match(receipt.failure, /deadline|allowance/u);
    assert.equal(receipt.processesClosed, true); assert.equal(receipt.gates.length, 1);
    gone(Number(readFileSync(marker, "utf8"))); gone(receipt.runner.pid);
    assert.ok(receipt.signals.some(record => record.signal === "SIGSTOP"));
    assert.ok(receipt.signals.some(record => record.signal === "SIGTERM"));
    assert.doesNotThrow(() => process.kill(unrelated.pid, 0));
    assert.ok(receipt.signals.every(record => record.pgid !== unrelated.pid));
  } finally { unrelated.kill("SIGTERM"); await new Promise(resolve => unrelated.once("close", resolve)); }
});

test("parent exit before registration never starts its target", async () => {
  const { marker, options } = fixture("exit-before-ack"); const receipt = await rejection(options);
  assert.equal(existsSync(marker), false); assert.equal(receipt.processesClosed, true);
  gone(receipt.runner.pid);
});

test("inspection failure after STOP uses self-owned cancellation and returns bounded unverified closure", async () => {
  const { marker, options } = fixture("blocked-parent"); options.limitMs = 15700; options.heartbeatMs = 150;
  let injected = false;
  options.inspectProcesses = async () => {
    if (injected) throw new Error("synthetic inspection failed after STOP");
    const rows = await processTable();
    if (rows.some(row => row.ppid === process.pid && row.state.includes("T") && row.pgid === row.pid)) {
      injected = true; throw new Error("synthetic inspection failed after STOP");
    }
    return rows;
  };
  const started = performance.now(), receipt = await rejection(options);
  assert.equal(injected, true); assert.ok(performance.now() - started < 2500);
  assert.equal(receipt.processesClosed, false); assert.match(receipt.cleanupFailure, /inspection failed/u);
  assert.equal(receipt.cancellationObservedPidsAbsent, true, JSON.stringify({ finalizationFailure: receipt.finalizationFailure,
    fallbackFinalizationFailure: receipt.fallbackFinalizationFailure, unresolved: receipt.unresolved,
    guardRetainedForOriginalCompletion: receipt.guardRetainedForOriginalCompletion }));
  assert.match(receipt.cancellationPidObservationAuthority, /never acceptance/u);
  assert.equal(receipt.rootGuard.selfGroupCancellationRequested, true);
  assert.equal(receipt.gates[0].selfGroupCancellationRequested, true);
  assert.equal(receipt.guardClosed, true); assert.equal(receipt.guardRetainedForOriginalCompletion, false);
  gone(receipt.runner.pid); gone(Number(readFileSync(marker, "utf8")));
});

test("inspection failure after CONT uses self-owned cancellation and preserves an unrelated process", async () => {
  const unrelated = spawn(process.execPath, ["-e", "setInterval(()=>{},1000)"], { stdio: "ignore" });
  const { marker, options } = fixture("blocked-parent"); options.limitMs = 15700; options.heartbeatMs = 150;
  let sawStopped = false, injected = false;
  options.inspectProcesses = async () => {
    if (injected) throw new Error("synthetic inspection failed after CONT");
    const rows = await processTable();
    const targetPid = existsSync(marker) ? Number(readFileSync(marker, "utf8")) : null;
    const target = rows.find(row => row.pid === targetPid);
    if (target?.state.includes("T")) sawStopped = true;
    else if (sawStopped) { injected = true; throw new Error("synthetic inspection failed after CONT"); }
    return rows;
  };
  try {
    const started = performance.now(), receipt = await rejection(options);
    assert.equal(sawStopped, true); assert.equal(injected, true); assert.ok(performance.now() - started < 2500);
    assert.equal(receipt.processesClosed, false); assert.match(receipt.cleanupFailure, /after CONT/u);
    assert.equal(receipt.cancellationObservedPidsAbsent, true);
    gone(receipt.runner.pid); gone(Number(readFileSync(marker, "utf8")));
    assert.doesNotThrow(() => process.kill(unrelated.pid, 0));
    assert.ok(receipt.signals.every(record => record.pgid !== unrelated.pid));
  } finally { unrelated.kill("SIGTERM"); await new Promise(resolve => unrelated.once("close", resolve)); }
});

test("inspection failure before STOP uses self-owned cancellation without stale signal authority", async () => {
  const { marker, options } = fixture("blocked-parent"); options.limitMs = 15700; options.heartbeatMs = 150;
  let injected = false;
  options.inspectProcesses = async () => {
    if (existsSync(marker)) { injected = true; throw new Error("synthetic inspection failed before STOP"); }
    return processTable();
  };
  const receipt = await rejection(options);
  assert.equal(injected, true); assert.equal(receipt.processesClosed, false);
  assert.match(receipt.cleanupFailure, /before STOP/u);
  assert.equal(receipt.cancellationObservedPidsAbsent, true, JSON.stringify({ finalizationFailure: receipt.finalizationFailure,
    fallbackFinalizationFailure: receipt.fallbackFinalizationFailure, unresolved: receipt.unresolved,
    guardRetainedForOriginalCompletion: receipt.guardRetainedForOriginalCompletion }));
  assert.equal(receipt.signals.some(record => record.signal === "SIGKILL"), false);
  assert.equal(receipt.rootGuard.selfGroupCancellationRequested, true);
  gone(receipt.runner.pid); gone(Number(readFileSync(marker, "utf8")));
});

test("parent exit after acknowledgement retains and cleans the detached target group", async () => {
  const { marker, options } = fixture("exit-after-ack"); const receipt = await rejection(options);
  assert.equal(receipt.processesClosed, true, JSON.stringify({ cleanupFailure: receipt.cleanupFailure,
    finalizationFailure: receipt.finalizationFailure, firstOwnershipFailure: receipt.firstOwnershipFailure,
    unresolved: receipt.unresolved, snapshots: receipt.snapshots })); assert.equal(receipt.gates.length, 1);
  assert.equal(receipt.gates[0].acknowledged, true); gone(Number(readFileSync(marker, "utf8"))); gone(receipt.runner.pid);
});

test("deadline guard terminates a host with an unresolved final admission callback after child exit", async () => {
  const receipt = await isolatedUnresolvedAdmission();
  assert.match(receipt.failure, /deadline|allowance/u); assert.equal(receipt.processesClosed, true);
  assert.equal(receipt.guardRetainedForOriginalCompletion, true);
  assert.equal(receipt.unresolved.pendingCallbacks > 0, true);
});

test("existing output is never overwritten and does not launch a bootstrap", async () => {
  const { options } = fixture(); writeFileSync(options.output, "preserved", { flag: "wx" });
  const receipt = await rejection(options); assert.match(receipt.failure, /already exists/u);
  assert.equal(receipt.runner, undefined); assert.equal(readFileSync(options.output, "utf8"), "preserved");
});

test("final publication rechecks actual log bytes and refuses an already expired deadline", async () => {
  const root = realpathSync(mkdtempSync(path.join(os.tmpdir(), "subfieldCircular-outer-publication-")));
  const log = path.join(root, "log"); writeFileSync(log, "synthetic", { flag: "wx" });
  const binding = { path: log, sha256: sha("synthetic") };
  const receipt = { accepted: true, h3EvidenceEligible: false, stdoutLog: binding, stderrLog: binding };
  await assert.rejects(outerWorkerOperation({ kind: "publication", receipt, output: root, sources: [],
    deadlineNanoseconds: String(process.hrtime.bigint() - 1n) }), /deadline/u);
  assert.equal(existsSync(path.join(root, "outer-admission.json")), false);
  writeFileSync(log, "changed");
  await assert.rejects(outerWorkerOperation({ kind: "publication", receipt, output: root, sources: [],
    deadlineNanoseconds: String(process.hrtime.bigint() + 1000000000n) }), /hash differs/u);
});

test("failure publication preserves rejected operational evidence without granting acceptance", async () => {
  const root = realpathSync(mkdtempSync(path.join(os.tmpdir(), "subfieldCircular-outer-failure-")));
  const result = await outerWorkerOperation({ kind: "failure-publication", output: root,
    receipt: { accepted: true, failure: "synthetic deadline" } });
  assert.equal(result.accepted, false);
  const written = JSON.parse(readFileSync(result.receipt.path));
  assert.equal(written.accepted, false); assert.equal(written.h3EvidenceEligible, false);
  assert.match(written.publicationScope, /never-acceptance/u);
  await assert.rejects(outerWorkerOperation({ kind: "failure-publication", output: root, receipt: {} }), /exist/u);
});
