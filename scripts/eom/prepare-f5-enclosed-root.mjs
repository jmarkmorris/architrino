// Subject-side orchestration only. Mathematical acceptance is delegated to the
// separately authored, byte-frozen F5 manifest oracle; this file is not an oracle.
import { spawn, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  closeSync, existsSync, mkdirSync, openSync, readFileSync, readdirSync,
  realpathSync, statSync, writeFileSync, writeSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const RUN_BASE = ".local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/";
const BUILD_BASE = ".tmp/";
const SELF = "scripts/eom/prepare-f5-enclosed-root.mjs";
const TARGET = "eom_f5_enclosed_root_cli";
const FROZEN = Object.freeze({
  "reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json": "e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb",
  "reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json": "bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344",
  "reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md": "1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5",
  "reference/priorities/braid-program/evidence/2026-08-26-f5-independent-interpolation-enclosure.md": "931f5d88a209648bde63dfbdd1f24303b7a33e101e11565e75fd608be347d496",
  ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/f5-independent-enclosure/accepted-enclosure-report.v1.json": "2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9",
  "scripts/eom/oracle/decimal_interval.py": "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a",
  "scripts/eom/oracle/f5_actual_cubic_conformance.py": "4a90227cd79a4acfe319c723a05b711df1947953cc229f87114c4bc7babf6e09",
  "scripts/eom/oracle/f5_history_manifest_conformance.py": "c34cd3f368398fd1ecd3a227c8026508efd319e9219b0ae8819eb4dfab646c74",
  "src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs": "1b5051928406482ffa3fecfaa60b1e94d3f1372ed87ea2ea5e7442523ddc8fd0",
  "scripts/eom/reduce-f5-enclosed-root-ledger.mjs": "9c4d5730613597d7931b59c37d77c405bcf928de2421d55d3c76f78b7228a73a",
});
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const binding = (relative) => ({ path: relative, sha256: sha(readFileSync(path.join(ROOT, relative))) });
const writeJson = (filename, value) => writeFileSync(filename, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });

export function scopedPath(value, prefix) {
  if (typeof value !== "string" || !value.startsWith(prefix) || value === prefix ||
      path.isAbsolute(value) || value.includes("\\") || value.split("/").some((part) => !part || part === "." || part === "..")) {
    throw new Error(`path must be a nonempty relative child of ${prefix}`);
  }
  const absolute = path.join(ROOT, value);
  let ancestor = absolute;
  while (!existsSync(ancestor)) ancestor = path.dirname(ancestor);
  if (realpathSync(ancestor) !== ancestor) throw new Error("symlinked output or build path is not allowed");
  return absolute;
}

export function verifyFrozenReferences() {
  const records = Object.entries(FROZEN).map(([relative, expected]) => {
    const actual = binding(relative);
    if (actual.sha256 !== expected) throw new Error(`frozen reference drift: ${relative}`);
    return actual;
  });
  return records;
}

export function validateProofReceipt(proof, manifestSha256, campaignId, runId) {
  if (proof.schema !== "braid-program/f5-actual-cubic-conformance.v1" ||
      proof.accepted !== true || proof.status !== "actual-cubic-conformance-passed" ||
      proof.historyManifestSha256 !== manifestSha256 || proof.h3EvidenceEligible !== false ||
      proof.campaignId !== campaignId || proof.runId !== runId || proof.resourceContact !== false ||
      proof.expectedMemberSegments !== 12384 || proof.processedMemberSegments !== 12384 ||
      proof.normalizedFieldSpeed !== "1" || proof.failure !== null) {
    throw new Error("independent nominal-history receipt has incomplete identity, census, or acceptance");
  }
  const all = Object.entries(FROZEN);
  const sources = all.slice(0, 5), instruments = all.slice(5, 8);
  for (const [field, expected] of [["sourceBindings", sources], ["instrumentBindings", instruments]]) {
    const rows = proof[field];
    if (!Array.isArray(rows) || rows.length !== expected.length ||
        new Set(rows.map((row) => row.path)).size !== expected.length ||
        expected.some(([relative, hash]) => !rows.some((row) => row.path === relative && row.sha256 === hash))) {
      throw new Error(`independent proof ${field} differs from frozen generation`);
    }
  }
}

function sourceSnapshot() {
  const paths = [SELF, "src/eom/CMakeLists.txt", "src/eom/native/eom_f5_enclosed_root_cli.cpp"];
  function visit(relative) {
    for (const item of readdirSync(path.join(ROOT, relative), { withFileTypes: true })) {
      const next = `${relative}/${item.name}`;
      if (item.isDirectory()) visit(next);
      else if (/\.(?:cpp|hpp|h)$/u.test(item.name)) paths.push(next);
    }
  }
  visit("src/eom/src"); visit("src/eom/include");
  return paths.sort().map(binding);
}

function checkSnapshot(records) {
  for (const record of records) {
    if (binding(record.path).sha256 !== record.sha256) throw new Error(`implementation drift: ${record.path}`);
  }
}

// The child has its own process group. Only this owned group can be signalled;
// an external timer remains active even when a solver call is synchronous.
export async function runWatched(command, args, {
  cwd = ROOT, logPath, stage, limitMs = 1_800_000, heartbeatMs = 15_000, terminationGraceMs = 5000,
} = {}) {
  if (!logPath || !stage || !(limitMs > 0) || !(heartbeatMs > 0) || !(terminationGraceMs > 0)) throw new Error("watched process requires log, stage, and positive timing limits");
  const log = openSync(logPath, "wx");
  const started = performance.now();
  let child, timedOut = false, interrupted = false, logBytes = 0, lastOutput = "", outputError = null;
  let heartbeat, deadline, forceStop, interruptHandler;
  try {
    child = spawn(command, args, { cwd, detached: true, stdio: ["ignore", "pipe", "pipe"] });
    const stop = () => {
      // A compiler driver can exit before descendants close inherited pipes.
      // The still-owned process group must remain terminable in that case.
      if (child.pid) {
        try { process.kill(-child.pid, "SIGTERM"); } catch (error) { if (error.code !== "ESRCH") throw error; }
        forceStop ??= setTimeout(() => {
          try { process.kill(-child.pid, "SIGKILL"); } catch (error) { if (error.code !== "ESRCH") throw error; }
        }, terminationGraceMs);
      }
    };
    interruptHandler = () => { interrupted = true; stop(); };
    process.on("SIGINT", interruptHandler); process.on("SIGTERM", interruptHandler);
    const consume = (chunk) => {
      if (outputError) return;
      try {
        let offset = 0;
        while (offset < chunk.length) {
          const written = writeSync(log, chunk, offset, chunk.length - offset);
          if (written === 0) throw new Error("output log made no write progress");
          offset += written;
        }
        logBytes += chunk.length;
        lastOutput = `${lastOutput}${chunk.toString()}`.slice(-1200);
      } catch (error) { outputError = error; stop(); }
    };
    child.stdout.on("data", consume); child.stderr.on("data", consume);
    const progress = () => console.error(JSON.stringify({ stage, pid: child.pid,
      elapsedWallSeconds: (performance.now() - started) / 1000, logBytes, lastOutput }));
    heartbeat = setInterval(progress, heartbeatMs);
    deadline = setTimeout(() => { timedOut = true; stop(); }, limitMs);
    const status = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", (code, signal) => resolve({ code, signal }));
    });
    const groupExists = () => {
      if (!child.pid) return false;
      try { process.kill(-child.pid, 0); return true; }
      catch (error) { if (error.code === "ESRCH") return false; throw error; }
    };
    const descendantsAfterClose = groupExists();
    if (descendantsAfterClose) {
      stop();
      const cleanupDeadline = performance.now() + terminationGraceMs + 2000;
      while (groupExists() && performance.now() < cleanupDeadline) await new Promise((resolve) => setTimeout(resolve, 25));
    }
    const processGroupClosed = !groupExists();
    const result = { stage, command, args, ...status, timedOut, interrupted, descendantsAfterClose, processGroupClosed,
      elapsedWallSeconds: (performance.now() - started) / 1000, logBytes };
    console.error(JSON.stringify(result));
    if (status.code !== 0 || timedOut || interrupted || outputError || descendantsAfterClose || !processGroupClosed) {
      if (outputError) result.outputError = outputError.message;
      throw Object.assign(new Error(`${stage} failed; raw output retained at ${logPath}`), { processResult: result });
    }
    return result;
  } finally {
    if (interruptHandler) { process.off("SIGINT", interruptHandler); process.off("SIGTERM", interruptHandler); }
    clearInterval(heartbeat); clearTimeout(deadline); clearTimeout(forceStop); closeSync(log);
  }
}

export function parsePrepareArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    if (!["--out", "--build-dir"].includes(argv[index]) || !argv[index + 1] || values[argv[index]]) {
      throw new Error("Usage: node scripts/eom/prepare-f5-enclosed-root.mjs --out <new-run-dir> --build-dir <owned-build-dir>");
    }
    values[argv[index]] = argv[index + 1];
  }
  if (!values["--out"] || !values["--build-dir"]) throw new Error("explicit output and build directories are required");
  return values;
}

export async function prepareF5(argv) {
  const values = parsePrepareArgs(argv);
  const output = scopedPath(values["--out"], RUN_BASE);
  const build = scopedPath(values["--build-dir"], BUILD_BASE);
  if (existsSync(output)) throw new Error("output already exists; choose a new run directory");
  if (existsSync(build)) throw new Error("build directory already exists; a fresh exclusive build is required");
  const references = verifyFrozenReferences(), sources = sourceSnapshot();
  mkdirSync(path.dirname(output), { recursive: true });
  mkdirSync(output);
  const campaignId = "f5-enclosed-root-restart-20260826-v1", runId = path.basename(output);
  const watched = (stage, command, args) => runWatched(command, args, { stage, logPath: path.join(output, `${stage}.log`) });
  const receipt = { schema: "braid-program/f5-enclosed-root-preparation.v1", campaignId, runId,
    startedAt: new Date().toISOString(), status: "incomplete", h3EvidenceEligible: false,
    rootExecutionAuthorized: false, references, sources, stages: [] };
  try {
    mkdirSync(path.dirname(build), { recursive: true });
    mkdirSync(build); // Exclusive reservation: never reconfigure a shared cache.
    receipt.stages.push(await watched("configure", "cmake", ["-S", path.join(ROOT, "src/eom"), "-B", build,
      "-DCMAKE_BUILD_TYPE=Release", "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON",
      ...(process.platform === "darwin" ? ["-DCMAKE_PREFIX_PATH=/opt/homebrew"] : [])]));
    receipt.stages.push(await watched("build", "cmake", ["--build", build, "--target", TARGET, "--parallel", "2"]));
    checkSnapshot(sources); verifyFrozenReferences();
    const cachePath = path.join(build, "CMakeCache.txt"), cache = readFileSync(cachePath, "utf8");
    const compiler = cache.match(/^CMAKE_CXX_COMPILER:(?:FILEPATH|STRING)=(.+)$/mu)?.[1];
    if (!compiler || !path.isAbsolute(compiler)) throw new Error("build cache has no absolute compiler identity");
    const compilerIdentity = { path: compiler, realPath: realpathSync(compiler), sha256: sha(readFileSync(compiler)),
      version: execFileSync(compiler, ["--version"], { encoding: "utf8", timeout: 10000 }),
      cmakeCacheSha256: sha(Buffer.from(cache)) };
    writeJson(path.join(output, "compiler-identity.json"), compilerIdentity);
    const executable = path.join(build, TARGET), library = path.join(build, "libeom_native.a");
    const built = [executable, library].map((filename) => ({ path: path.relative(ROOT, filename),
      sha256: sha(readFileSync(filename)), bytes: statSync(filename).size, modifiedAt: statSync(filename).mtime.toISOString() }));
    const externalLibraries = ["MPFR_LIBRARY", "GMP_LIBRARY"].map((name) => {
      const filename = cache.match(new RegExp(`^${name}:(?:FILEPATH|STRING)=(.+)$`, "mu"))?.[1];
      if (!filename || !path.isAbsolute(filename)) throw new Error(`build cache has no ${name} identity`);
      return { name, path: filename, realPath: realpathSync(filename), sha256: sha(readFileSync(filename)) };
    });
    const toolchain = { schema: "braid-program/f5-enclosed-root-build.v1", sources, built, externalLibraries,
      compiler: compilerIdentity, compileCommandsSha256: sha(readFileSync(path.join(build, "compile_commands.json"))),
      cmakeCacheSha256: compilerIdentity.cmakeCacheSha256, stages: receipt.stages, builtAt: new Date().toISOString(),
      authority: "recorded-build-identity-pending-independent-review" };
    writeJson(path.join(output, "toolchain.json"), toolchain);
    const manifest = path.join(output, "history-manifest.json");
    receipt.stages.push(await watched("manifest", executable, ["manifest", "--repo-root", ROOT,
      "--campaign-id", campaignId, "--run-id", runId, "--out", manifest]));
    receipt.historyManifest = { path: path.relative(ROOT, manifest), sha256: sha(readFileSync(manifest)) };
    checkSnapshot(sources); verifyFrozenReferences();
    for (const record of [compilerIdentity, ...externalLibraries]) {
      if (sha(readFileSync(record.path)) !== record.sha256) throw new Error("external toolchain changed during manifest generation");
    }
    for (const record of built) if (binding(record.path).sha256 !== record.sha256) throw new Error("built artifact changed after manifest generation");
    const venv = path.resolve(ROOT, process.env.AAA_VENV || "../.venv");
    const interpreter = path.join(venv, "bin/python");
    receipt.proofInterpreter = { path: interpreter, realPath: realpathSync(interpreter), sha256: sha(readFileSync(interpreter)) };
    const certificate = path.join(output, "nominal-history-conformance.json");
    receipt.stages.push(await watched("conformance", interpreter, ["-m", "scripts.eom.oracle.f5_history_manifest_conformance",
      "--history-manifest", manifest, "--out", certificate]));
    const proof = JSON.parse(readFileSync(certificate));
    validateProofReceipt(proof, receipt.historyManifest.sha256, campaignId, runId);
    receipt.conformance = { path: path.relative(ROOT, certificate), sha256: sha(readFileSync(certificate)) };
    checkSnapshot(sources); verifyFrozenReferences();
    for (const record of [compilerIdentity, ...externalLibraries, receipt.proofInterpreter]) {
      if (sha(readFileSync(record.path)) !== record.sha256) throw new Error("external toolchain changed during conformance");
    }
    for (const record of built) if (binding(record.path).sha256 !== record.sha256) throw new Error("built artifact drift during independent conformance");
    if (sha(readFileSync(manifest)) !== receipt.historyManifest.sha256) throw new Error("history manifest mutated during conformance");
    receipt.status = "nominal-actual-history-conformance-passed";
    receipt.apiDomainConformance = "separate-review-required";
    receipt.buildReview = "separate-review-required";
    return receipt;
  } catch (error) {
    receipt.status = "failed"; receipt.error = error.message;
    if (error.processResult) receipt.failedProcess = error.processResult;
    throw error;
  } finally {
    receipt.finishedAt = new Date().toISOString();
    writeJson(path.join(output, "preparation.json"), receipt);
    console.log(JSON.stringify({ status: receipt.status, output: values["--out"], h3EvidenceEligible: false,
      rootExecutionAuthorized: false }));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareF5(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
