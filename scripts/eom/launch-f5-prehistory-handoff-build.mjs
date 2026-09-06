// Operational registered-child launch and build-byte admission, not mathematics.
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync,
  openSync, readSync, realpathSync, statfsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const ROOT = process.cwd();
const SELF = "scripts/eom/launch-f5-prehistory-handoff-build.mjs";
const ENTRY = "scripts/eom/prepare-f5-prehistory-handoff-build.mjs";
const OUTER = "scripts/eom/launch-subfield-circular-root-pilot.mjs";
const PINS = Object.freeze({
  [ENTRY]: "5caae83e0f48ba1bba762613e7083a7f7181aefafeba278d75e1add910b3f460",
  "scripts/eom/prepare-subfield-circular-root.mjs": "73fb903d1c5ac8df2337e75b7fed3044c1c5641177284c8a352b423872bab033",
  "scripts/eom/prepare-f5-enclosed-root.mjs": "ba154c0a8c63bd390ae1e16de005fd5d52000fedec352619b60b9465a2f813f5",
  [OUTER]: "cd5b892440cba141f6aeac72fbef07f7febdc8fe28b18e813cf0d73be0633a48",
  "/usr/bin/memory_pressure": "a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56",
});
const absolute = value => path.resolve(ROOT, value);
const sha = value => createHash("sha256").update(value).digest("hex");
const check = (ok, reason) => { if (!ok) throw new Error(reason); };
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const identity = s => [s.dev, s.ino, s.size, s.mtimeMs, s.ctimeMs];
export function readBound(filename, expected, collect = false) {
  filename = absolute(filename);
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK | (constants.O_NOFOLLOW ?? 0));
  try {
    const before = fstatSync(fd), hash = createHash("sha256"), chunks = [], buffer = Buffer.alloc(65536);
    check(before.isFile() && before.size <= (collect ? 8 : 256) * 1024 ** 2, "bounded regular build input required");
    let at = 0;
    while (at < before.size) {
      const n = readSync(fd, buffer, 0, Math.min(buffer.length, before.size - at), at);
      check(n > 0, "build input truncated"); at += n; hash.update(buffer.subarray(0, n));
      if (collect) chunks.push(Buffer.from(buffer.subarray(0, n)));
    }
    const digest = hash.digest("hex");
    check(same(identity(before), identity(fstatSync(fd))) && same(identity(before), identity(lstatSync(filename))) &&
      (!expected || digest === expected), "build input changed or differs");
    return { path: filename, sha256: digest, bytes: at, ...(collect ? { data: Buffer.concat(chunks) } : {}) };
  } finally { closeSync(fd); }
}
export function writeNew(filename, value) {
  const data = Buffer.from(JSON.stringify(value)+"\n"), fd = openSync(filename, "wx");
  try { writeFileSync(fd, data); fsyncSync(fd); } finally { closeSync(fd); }
  return readBound(filename, sha(data));
}
export function parseResource(stdout, disk, launch) {
  const rows = stdout.split(/\r?\n/u).filter(line => line.includes("System-wide memory free percentage:"));
  check(rows.length === 1 && /^System-wide memory free percentage: \d+%$/u.test(rows[0]), "malformed memory observation");
  const free = Number(rows[0].match(/(\d+)%$/u)[1]);
  check(Number.isInteger(free) && free >= (launch ? 40 : 20) && free <= 100 &&
    disk >= BigInt(launch ? 64 : 16) * 1024n ** 3n, "build memory/disk admission stop");
  return { freePercent: free, availableDiskBytes: String(disk), atLaunch: launch,
    accepted: true, notAggregateMemoryMeasurement: true };
}
export function startupAbortInspection(inspectProcesses, signal) {
  let consumed = false;
  const rejectOnce = () => {
    if (signal.aborted && !consumed) {
      consumed = true; // Later real inspections remain available to owned cleanup.
      throw signal.reason ?? new Error("build startup interrupted");
    }
  };
  return async () => {
    rejectOnce();
    const rows = await inspectProcesses();
    rejectOnce();
    return rows;
  };
}
export function admitBuild(job) {
  const stdout = readBound(job.stdout.path, job.stdout.sha256, true).data.toString("utf8").trim().split("\n");
  check(stdout.length === 1, "one fresh builder completion required");
  const completion = JSON.parse(stdout[0]);
  check(completion.completed === true && completion.accepted === false &&
    completion.status === "build-recorded-pending-independent-review" &&
    Number.isFinite(completion.elapsedSeconds) && completion.elapsedSeconds >= 0 && completion.elapsedSeconds < 1800,
    "builder completion differs");
  check(completion.receipt.path === path.join(job.buildOutput, "preparation.json"), "completion output differs");
  const bound = readBound(completion.receipt.path, completion.receipt.sha256, true);
  check(bound.bytes === completion.receipt.bytes, "receipt size differs");
  const receipt = JSON.parse(bound.data);
  check(receipt.schema === "braid-program/f5-prehistory-handoff-build.v1" &&
    receipt.status === completion.status && receipt.accepted === false && receipt.rootCalls === 0 &&
    receipt.dataLoaded === false && receipt.eomExecuted === false && receipt.evolutionAuthorized === false &&
    receipt.h3EvidenceEligible === false, "build authority differs");
  for (const key of ["sources", "tools", "headerDependencies", "externalLibraries"])
    check(same(receipt[key+"Before"], receipt[key+"After"]), "build generation differs: "+key);
  check(receipt.stages.length === job.gates.length && receipt.stages.length > 0, "build gate census differs");
  receipt.stages.forEach((stage, index) => {
    const gate = job.gates[index];
    check(stage.code === 0 && stage.signal === null && stage.timedOut === false && stage.interrupted === false &&
      stage.processGroupClosed === true && stage.descendantsAfterClose === false &&
      same(stage.args, gate.requestedArgs) && stage.command === gate.requestedCommand &&
      gate.acknowledged === true && gate.measurement.code === 0 && gate.measurement.signal === null,
      "stage/gate closure differs");
  });
  const records = [...receipt.sourcesAfter, ...receipt.toolsAfter, ...receipt.headerDependenciesAfter,
    ...receipt.externalLibrariesAfter, ...receipt.discoveryToolsBefore, ...Object.values(receipt.built),
    ...Object.values(receipt.producerSources), ...receipt.stages.map(x => x.log),
    ...receipt.dependencyUnits.flatMap(x => [x.beforeDependencyFile, x.actualDependencyFile]),
    ...receipt.runtimeDependencies.filter(x => x.status === "file-hashed")];
  for (const record of records) {
    // Tool invocation paths can intentionally be symlinks (for example ranlib).
    const observed = readBound(record.realPath ?? record.path, record.sha256);
    check(observed.bytes === record.bytes, "build binding size differs");
  }
  return { accepted: true, h3EvidenceEligible: false, authority: "build-byte-and-process-admission-only",
    buildReceipt: { path: bound.path, sha256: bound.sha256, bytes: bound.bytes },
    checkedBindings: records.length, gates: job.gates.length, rootCalls: 0, eomExecuted: false };
}
export function finalizeBuild(job) {
  const live = () => check(process.hrtime.bigint() < BigInt(job.deadlineNanoseconds), "final build publication deadline");
  live();
  for (const record of job.sources) readBound(record.path, record.sha256);
  for (const record of [job.receipt.stdoutLog, job.receipt.stderrLog]) readBound(record.path, record.sha256);
  live();
  const publication = writeNew(path.join(job.output, "outer-admission.json"), job.receipt);
  const directory = openSync(job.output, "r");
  try { fsyncSync(directory); } finally { closeSync(directory); }
  live(); return publication;
}
async function workerAdmission(job, bytes, limitMs, signal) {
  check(Number.isInteger(limitMs) && limitMs > 0 && limitMs <= 1800000, "positive remaining worker budget required");
  const worker = new Worker(`const {parentPort,workerData}=require('node:worker_threads');
    import('data:text/javascript;base64,'+Buffer.from(workerData.bytes).toString('base64')).then(m=>workerData.job.kind==='finalize'?m.finalizeBuild(workerData.job):m.admitBuild(workerData.job))
    .then(value=>parentPort.postMessage({value})).catch(e=>parentPort.postMessage({failure:e.message}));`,
  { eval: true, execArgv: [], workerData: { job, bytes } });
  let timer, listener;
  try { return await new Promise((resolve, reject) => {
    listener = () => reject(signal.reason ?? new Error("build admission interrupted"));
    signal.addEventListener("abort", listener, { once: true }); if (signal.aborted) listener();
    timer = setTimeout(() => reject(new Error("build admission deadline")), limitMs);
    worker.once("message", result => result.failure ? reject(new Error(result.failure)) : resolve(result.value));
    worker.once("error", reject); worker.once("exit", code => reject(new Error("admission closed without result: "+code)));
  }); } finally { await worker.terminate(); clearTimeout(timer); signal.removeEventListener("abort", listener); }
}
export async function launch(argv) {
  check(argv.length === 6 && argv[0] === "--out" && argv[2] === "--python" && argv[4] === "--launcher-sha256" &&
    /^[a-f0-9]{64}$/u.test(argv[5]) && path.isAbsolute(argv[3]), "expected --out NEW-RUN --python ABSOLUTE-PYTHON --launcher-sha256 SHA");
  const started = performance.now(), deadlineNanoseconds = process.hrtime.bigint()+1800000000000n, output = absolute(argv[1]);
  check(output.startsWith(absolute(".local-data/braid-analysis/f5-prehistory-handoff-build-20260827/")+path.sep) &&
    !argv[1].split("/").some(x => x === ".." || x === ".") && !existsSync(output) && !existsSync(output+"-outer"), "exclusive build lane required");
  let ancestor = path.dirname(output);
  while (!existsSync(ancestor)) ancestor = path.dirname(ancestor);
  check(realpathSync(ancestor) === ancestor, "symlinked build ancestor");
  const self = readBound(SELF, argv[5], true), captures = Object.entries(PINS).map(([p, h]) => readBound(p, h, p !== "/usr/bin/memory_pressure"));
  const outerBytes = captures.find(x => x.path === absolute(OUTER)).data;
  const outer = await import("data:text/javascript;base64,"+outerBytes.toString("base64"));
  const table = await outer.processTable();
  check(table.filter(x => path.basename(x.command) === "eom_subfield_circular_root_cli").length <= 2, "wait for at most two subfield-circular EOM workers");
  let resourceFailure, timer, inFlight, receipt, finalizing = false;
  const finalAbort = new AbortController();
  const interrupt = () => finalAbort.abort(new Error("build launch interrupted"));
  const observations = [];
  const observe = async launch => {
    const stamp = { elapsedSeconds: (performance.now()-started)/1000, atLaunch: launch, accepted: false };
    try {
      readBound("/usr/bin/memory_pressure", PINS["/usr/bin/memory_pressure"]);
      const stdout = await new Promise((resolve, reject) => execFile("/usr/bin/memory_pressure", [],
        { timeout: 2000, killSignal: "SIGKILL", maxBuffer: 1024*1024, encoding: "utf8" },
        (e, out) => e ? reject(e) : resolve(out)));
      const disk = statfsSync(ROOT, { bigint: true });
      Object.assign(stamp, parseResource(stdout, disk.bavail*disk.bsize, launch));
    } catch (error) { stamp.failure = error.message; resourceFailure ??= error; throw error; }
    finally { observations.push(stamp); console.error(JSON.stringify({ stage: "f5-handoff-build-resources", ...stamp })); }
  };
  await observe(true);
  const sources = captures.filter(x => [ENTRY, "scripts/eom/prepare-subfield-circular-root.mjs", "scripts/eom/prepare-f5-enclosed-root.mjs"].some(p => absolute(p) === x.path))
    .map(x => ({ path: path.relative(ROOT, x.path), sha256: x.sha256, bytes: x.data }));
  process.on("SIGINT", interrupt); process.on("SIGTERM", interrupt);
  try {
    const running = outer.superviseRegisteredPilot({ root: ROOT, entry: ENTRY,
      args: ["--out", argv[1], "--python", argv[3], "--builder-sha256", PINS[ENTRY]],
      sources, output: output+"-outer", startedAtMs: started, limitMs: 1800000, heartbeatMs: 15000,
      inspectProcesses: startupAbortInspection(outer.processTable, finalAbort.signal),
      admit: async ({ receipt, remainingMs, signal }) => {
        check(!resourceFailure, "resource supervision failed");
        const stdout = readBound(path.join(output+"-outer", "runner-stdout.log"));
        return workerAdmission({ buildOutput: output, stdout, gates: receipt.gates }, self.data, remainingMs, signal);
      } });
    timer = setInterval(() => {
      console.error(JSON.stringify({ stage: finalizing ? "f5-handoff-build-finalization" : "f5-handoff-build-running",
        elapsedSeconds: (performance.now()-started)/1000, resourceObservations: observations.length }));
      if (!inFlight) inFlight = observe(false).catch(() => { process.emit("SIGTERM"); }).finally(() => { inFlight = undefined; });
    }, 15000);
    receipt = await running;
    finalizing = true; if (inFlight) await inFlight;
    await observe(false); check(!resourceFailure, "resource supervision failed");
    receipt.buildLaunchScope = "captured-executing-builder-and-helpers; independently registered cancellable child groups; build only";
    receipt.operationalSourceBindings = [self, ...captures].map(({ path, sha256, bytes }) => ({ path, sha256, bytes }));
    receipt.resourceObservationsBeforePublication = [...observations];
    receipt.finalizationAdmission = "fresh successful launcher completion binds the full resource-observation sequence through final worker closure";
    check(performance.now()-started < 1800000, "inclusive publication deadline");
    const publication = await workerAdmission({ kind: "finalize", output: output+"-outer", receipt,
      sources: [self, ...captures].map(({ path, sha256 }) => ({ path, sha256 })),
      deadlineNanoseconds: String(deadlineNanoseconds) }, self.data,
      Math.floor(1800000-(performance.now()-started)), finalAbort.signal);
    if (inFlight) await inFlight;
    await observe(false);
    check(!resourceFailure && !finalAbort.signal.aborted, "final resource observation or interruption rejects build");
    check(performance.now()-started < 1800000, "inclusive final deadline");
    console.log(JSON.stringify({ completed: true, accepted: true, authority: "build-process-admission-only",
      receipt: publication, resourceObservations: [...observations], elapsedSeconds: (performance.now()-started)/1000,
      h3EvidenceEligible: false, eomExecuted: false }));
    check(performance.now()-started < 1800000, "post-completion deadline");
  } catch (error) {
    if (existsSync(output+"-outer")) writeNew(path.join(output+"-outer", "launch-failure.json"),
      { accepted: false, failure: error.message, outerReceipt: error.outerReceipt ?? receipt ?? null, resourceObservations: observations });
    throw error;
  } finally {
    clearInterval(timer); if (inFlight) await inFlight;
    process.off("SIGINT", interrupt); process.off("SIGTERM", interrupt);
  }
  check(performance.now()-started < 1800000 && !resourceFailure && !finalAbort.signal.aborted,
    "final watch teardown rejects build admission");
}
if (import.meta.url.startsWith("file:") && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  launch(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
