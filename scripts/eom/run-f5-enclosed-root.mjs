// Subject-side coordinator. Independent acceptance belongs to the frozen proof
// and ledger instruments, never to this packet assembler.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, realpathSync, writeFileSync, writeSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runWatched, scopedPath, validateProofReceipt, verifyFrozenReferences } from "./prepare-f5-enclosed-root.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BASE = ".local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/";
const SELF = "scripts/eom/run-f5-enclosed-root.mjs";
const API_PROOF = "scripts/eom/oracle/f5_api_domain_conformance.py";
const API_HASH = "d33d90d1b292466e03846c86017a2444e6228c45927ddd3bb49e28c3daf500d3";
const CPP = "src/eom/native/eom_f5_enclosed_root_cli.cpp";
const CPP_HASH = "9f7661f4000174d631d4c60f7078e124d77ae9b2ddba6af36197f13096095f81";
const REDUCER = "src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs";
const REDUCER_HASH = "1b5051928406482ffa3fecfaa60b1e94d3f1372ed87ea2ea5e7442523ddc8fd0";
const PREFIX = "scripts/eom/verify-f5-enclosed-root-prefix.mjs";
const PREFIX_HASH = "c5894a68aaad645a68b3d74d146c8f23ada96a4e28eb21721a33344aad09f6da";
const APPENDIX_HASH = "1399ee788e554642ac53a31635c2e91cc51de966089fa5a6e8ce85aaf458d786";
const REVIEWED_TOOLCHAIN_HASH = "977082a60a74aa6bda8aa4c8adbe9634936df82921c40a090a15317f5952ee38";
export const API_SUBJECT_BINDINGS = Object.freeze([
  [CPP, CPP_HASH],
  ["src/eom/CMakeLists.txt", "e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd"],
  ["src/eom/src/History.cpp", "cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5"],
  ["src/eom/src/Interval.cpp", "5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5"],
  ["src/eom/include/architrino/eom/History.hpp", "0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3"],
  ["src/eom/include/architrino/eom/Interval.hpp", "880a98273244c65f85ebcce2e08026a177c4af633633b8e29078948b54143dd9"],
].map(([path, sha256]) => Object.freeze({ path, sha256 })));
export const API_CONTROLS = Object.freeze({
  constantInterpretations: ["source-decimal", "frozen-binary64"], retainedInterval: ["-1", "19.63359163663986"],
  positionWidth: "1.528724905003159e-10", velocityWidth: "2.866983034112353e-7", precisionDecimalDigits: 96,
  limitSeconds: 1800, heartbeatSeconds: 15,
  positionRadiusExact: { numerator: "1443839850583", denominator: "9444732965739290427392" },
  velocityRadiusExact: { numerator: "5415577834899239", denominator: "18889465931478580854784" },
  velocityThresholdExact: { numerator: "439363871551533684579943688248028925841228056359", denominator: "1532495540865888858358347027150309183618739122183602176" },
  velocityRelativeReserveExact: { numerator: "81129638414606663681390495662081", denominator: "81129638414606681695789005144064" },
});
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const relative = (filename) => path.relative(ROOT, filename);
const writeJson = (filename, value) => {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
  writeFileSync(filename, bytes, { flag: "wx" });
  return { path: relative(filename), sha256: sha(bytes) };
};
const bind = (filename) => ({ path: relative(filename), sha256: sha(readFileSync(filename)) });
function readBoundJson(filename) {
  const bytes = readFileSync(filename);
  return { value: JSON.parse(bytes.toString("utf8")), binding: { path: relative(filename), sha256: sha(bytes) } };
}

// Preserve every field, but never construct the entire large rung as one JS
// string. The original root rows stay unchanged; only JSON whitespace differs.
export function writeCompactPacketOnce(filename, packet) {
  const fd = openSync(filename, "wx"), digest = createHash("sha256");
  const emit = (value) => {
    const bytes = Buffer.from(value);
    let offset = 0;
    while (offset < bytes.length) {
      const count = writeSync(fd, bytes, offset, bytes.length - offset);
      if (count === 0) throw new Error("packet output made no write progress");
      offset += count;
    }
    digest.update(bytes);
  };
  try {
    emit("{");
    Object.entries(packet).forEach(([key, value], index) => {
      emit(`${index ? "," : ""}${JSON.stringify(key)}:`);
      if (key === "rows") {
        if (!Array.isArray(value)) throw new Error("packet rows must be an array");
        emit("[");
        value.forEach((row, rowIndex) => { if (rowIndex) emit(","); emit(JSON.stringify(row)); });
        emit("]");
      } else emit(JSON.stringify(value));
    });
    emit("}\n");
    return { path: relative(filename), sha256: digest.digest("hex") };
  } finally { closeSync(fd); }
}
const equal = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  return value !== null && typeof value === "object"
    ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])])) : value;
}

export function verifyBindings(records) {
  for (const record of records) {
    const filename = path.isAbsolute(record.path) ? record.path : path.join(ROOT, record.path);
    if (sha(readFileSync(filename)) !== record.sha256) throw new Error(`bound bytes changed: ${record.path}`);
    if (record.realPath && realpathSync(filename) !== record.realPath) throw new Error(`bound target changed: ${record.path}`);
  }
}

export function validateApiReceipt(receipt, preparation, expectedInstrumentHash = API_HASH) {
  if (receipt.schema !== "braid-program/f5-api-domain-conformance.v1" || receipt.accepted !== true ||
      receipt.status !== "api-domain-conformance-passed" || receipt.resourceContact !== false ||
      receipt.failure !== null || receipt.h3EvidenceEligible !== false ||
      receipt.processedMemberSegments !== 12384 || receipt.expectedMemberSegments !== 12384 ||
      receipt.campaignId !== preparation.campaignId || receipt.runId !== preparation.runId ||
      receipt.historyManifestSha256 !== preparation.historyManifest.sha256 ||
      receipt.nominalCertificateSha256 !== preparation.conformance.sha256 || receipt.normalizedFieldSpeed !== "1") {
    throw new Error("API-domain proof identity, census, or acceptance is incomplete");
  }
  const expectedInstruments = [...preparation.references.slice(5, 8), { path: API_PROOF, sha256: expectedInstrumentHash }];
  for (const [field, expected] of [["sourceBindings", preparation.references.slice(0, 5)], ["instrumentBindings", expectedInstruments]]) {
    if (!Array.isArray(receipt[field]) || receipt[field].length !== expected.length ||
        new Set(receipt[field].map((entry) => entry.path)).size !== expected.length ||
        expected.some((entry) => !receipt[field].some((actual) => actual.path === entry.path && actual.sha256 === entry.sha256))) {
      throw new Error(`API-domain proof ${field} does not match frozen generation`);
    }
  }
  if (!Array.isArray(receipt.subjectApiBindings) || receipt.subjectApiBindings.length !== 6 ||
      new Set(receipt.subjectApiBindings.map((entry) => entry.path)).size !== 6 ||
      API_SUBJECT_BINDINGS.some((expected) => !receipt.subjectApiBindings.some((actual) => equal(actual, expected)))) {
    throw new Error("API-domain proof lacks exact reviewed subject bindings");
  }
  for (const [field, expected] of Object.entries(API_CONTROLS)) {
    if (!equal(receipt[field], expected)) throw new Error(`API-domain proof changed control: ${field}`);
  }
}

export function validateLedgerReceipt(checked, { manifestBinding, manifest, packetFiles, packets, bridgeHash = PREFIX_HASH }) {
  const order = packets.map((packet) => packet.rungSamples), final = order.length === 3;
  const expectedSchema = final ? "braid-program/f5-enclosed-root-ledger-reduction.v1" : "braid-program/f5-enclosed-root-prefix-reduction.v1";
  const expectedAuthority = final ? "source-and-byte-bound-independent-reduction" : "source-and-byte-bound-frozen-validator-prefix-composition";
  if (checked.schema !== expectedSchema || checked.authority !== expectedAuthority || checked.accepted !== true ||
      checked.h3EvidenceEligible !== false || checked.campaignId !== manifest.campaignId || checked.runId !== manifest.runId ||
      checked.historyManifestSha256 !== manifestBinding.sha256 || !equal(checked.rungOrder, order) ||
      checked.totalRows !== order.reduce((sum, count) => sum + count * 144, 0) ||
      checked.rawHistoryManifest?.path !== path.join(ROOT, manifestBinding.path) || checked.rawHistoryManifest.sha256 !== manifestBinding.sha256 ||
      checked.rawRungFiles?.length !== packetFiles.length || checked.rungSummaries?.length !== packetFiles.length) {
    throw new Error("independent ledger receipt identity or census mismatch");
  }
  packetFiles.forEach((file, index) => {
    const raw = checked.rawRungFiles[index], summary = checked.rungSummaries[index], packet = packets[index];
    if (raw.path !== path.join(ROOT, file.path) || raw.sha256 !== file.sha256 ||
        (!final && raw.rungSamples !== order[index]) || summary.rawSha256 !== file.sha256 ||
        summary.rungSamples !== order[index] || summary.rowCount !== order[index] * 144 ||
        summary.campaignId !== manifest.campaignId || summary.runId !== manifest.runId ||
        summary.bindingSetSha256 !== sha(Buffer.from(JSON.stringify(canonical(packet.bindings)))) ||
        summary.implementationBindingSetSha256 !== sha(Buffer.from(JSON.stringify(canonical(packet.implementationBindings))))) {
      throw new Error("independent ledger receipt refers to different packet bytes or bindings");
    }
  });
  const reducer = final ? checked.reducer : checked.reducerSource;
  if (reducer?.path !== REDUCER || reducer.sha256 !== REDUCER_HASH) throw new Error("ledger reducer generation differs");
  if (!final && (checked.status !== "genuine-prefix-ledger-checks-passed" || checked.completeLadder !== false ||
      checked.resourceContact !== false || checked.limitSeconds !== 1800 || checked.heartbeatSeconds !== 15 ||
      checked.bridgeSource?.path !== PREFIX || checked.bridgeSource.sha256 !== bridgeHash ||
      checked.exportAppendix?.sha256 !== APPENDIX_HASH || sha(Buffer.from(checked.exportAppendix.utf8 ?? "")) !== APPENDIX_HASH ||
      checked.executedAugmentedReducerSha256 !== sha(Buffer.concat([readFileSync(path.join(ROOT, REDUCER)), Buffer.from(checked.exportAppendix.utf8)])) ||
      !equal(checked.sourceBindings, packets[0].bindings) || !equal(checked.implementationBindings, packets[0].implementationBindings))) {
    throw new Error("prefix interface generation or checked binding census differs");
  }
}

export function parseRunArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!["--preparation", "--api-proof", "--out"].includes(argv[i]) || !argv[i + 1] || result[argv[i]]) {
      throw new Error("Usage: --preparation FILE --api-proof FILE --out NEW-RUN-DIRECTORY");
    }
    result[argv[i]] = argv[i + 1];
  }
  if (Object.keys(result).length !== 3) throw new Error("preparation, API proof, and fresh output directory are required");
  return result;
}

export function projectFinalRung(samples, elapsedSeconds, phaseTimes) {
  if (![8, 32, 128].includes(samples) || !(elapsedSeconds > 0) || !Number.isFinite(elapsedSeconds) ||
      phaseTimes.length !== samples || phaseTimes.some((time) => !(time > 0) || !Number.isFinite(time))) {
    throw new Error("complete measured rung and phase timings are required for projection");
  }
  // Includes construction/serialization overhead in the total and takes the
  // slower of full-rung scaling and the slowest measured phase repeated 128x.
  return Math.max(elapsedSeconds * 128 / samples, 128 * Math.max(...phaseTimes));
}

export function assembleRung({ manifest, manifestSha256, samples, rows, events, implementationBindings, elapsedSeconds }) {
  const start = events.find((event) => event.status === "started");
  const terminal = events.at(-1);
  const expected = samples * 144;
  if (start?.detail?.mode !== "rung" || start.detail.campaignId !== manifest.campaignId ||
      start.detail.runId !== manifest.runId || start.detail.controls.rungSamples !== samples ||
      terminal?.status !== "complete" || terminal.completedRows !== expected || terminal.passingRows !== expected ||
      terminal.failureCount !== 0 || terminal.failureCode !== "" || terminal.historyManifestSha256 !== manifestSha256 ||
      rows.length !== expected || events.some((event) => ["failed", "row-failed", "row-exception"].includes(event.status))) {
    throw new Error("raw rung failed or has an incomplete terminal census");
  }
  const phases = events.filter((event) => event.status === "phase-complete");
  if (new Set(phases.map((event) => event.detail.phaseIndex)).size !== samples ||
      phases.some((event) => !Number.isInteger(event.detail.phaseIndex) || event.detail.phaseIndex < 0 || event.detail.phaseIndex >= samples)) {
    throw new Error("phase completion census is incomplete");
  }
  const projected = projectFinalRung(samples, elapsedSeconds, phases.map((event) => event.detail.phaseElapsedWallSeconds));
  if (projected > 1800 || elapsedSeconds > 1800) throw Object.assign(new Error("measured final-rung projection exceeds 1800 seconds"), { projectedFinalRungSeconds: projected });
  const controls = start.detail.controls;
  const packet = {
    schema: "braid-program/f5-enclosed-root-rung.v1", campaignId: manifest.campaignId, runId: manifest.runId,
    rungSamples: samples, bindings: start.detail.bindings, implementationBindings,
    normalizedFieldSpeed: controls.normalizedFieldSpeed, period: controls.period,
    retainedHistoryDepth: controls.retainedHistoryDepth, maximumSegmentStep: manifest.maximumSegmentStep,
    positionWidth: manifest.positionWidth, velocityWidth: manifest.velocityWidth,
    rootTolerance: controls.rootTolerance, rootMaxDepth: controls.rootMaxDepth, rootMaxCells: controls.rootMaxCells,
    initialMpfrBits: controls.initialMpfrBits, maximumMpfrBits: controls.maximumMpfrBits, workerCount: controls.workerCount,
    resourceControl: { limitSeconds: 1800, contact: false, projectedFinalRungSeconds: String(projected) },
    members: manifest.members.map(({ segments: _segments, ...member }) => member),
    rows: [...rows].sort((a, b) => a.phaseIndex - b.phaseIndex || a.receiverIndex - b.receiverIndex || a.transmitterIndex - b.transmitterIndex),
    terminalStatus: "passed", completedRows: expected, passingRows: expected, failureCount: 0,
    elapsedWallSeconds: elapsedSeconds, analyticInterpolationErrorBounded: true,
    receptionTokenRule: controls.receptionTokenRule, historyManifestSha256: manifestSha256,
  };
  return packet;
}

function readNdjson(filename) {
  const bytes = readFileSync(filename);
  return { binding: { path: relative(filename), sha256: sha(bytes) },
    entries: bytes.toString("utf8").split("\n").filter((line) => line.trim()).map((line) => JSON.parse(line)) };
}

export async function runF5(argv) {
  const args = parseRunArgs(argv);
  const preparationPath = scopedPath(args["--preparation"], BASE);
  const apiPath = scopedPath(args["--api-proof"], BASE);
  const output = scopedPath(args["--out"], BASE);
  if (existsSync(output)) throw new Error("output already exists; no overwrite or implicit resume");
  const preparationInput = readBoundJson(preparationPath), apiInput = readBoundJson(apiPath);
  const preparation = preparationInput.value, apiProof = apiInput.value;
  if (preparation.schema !== "braid-program/f5-enclosed-root-preparation.v1" ||
      preparation.status !== "nominal-actual-history-conformance-passed") throw new Error("accepted preparation required");
  const references = verifyFrozenReferences();
  if (JSON.stringify(references) !== JSON.stringify(preparation.references)) throw new Error("preparation reference census differs");
  verifyBindings([...preparation.references, ...preparation.sources, preparation.historyManifest, preparation.conformance]);
  const nominalInput = readBoundJson(path.join(ROOT, preparation.conformance.path));
  if (!equal(nominalInput.binding, preparation.conformance)) throw new Error("nominal certificate bytes differ from preparation");
  validateProofReceipt(nominalInput.value, preparation.historyManifest.sha256, preparation.campaignId, preparation.runId);
  validateApiReceipt(apiProof, preparation);
  verifyBindings([...apiProof.instrumentBindings, ...apiProof.subjectApiBindings]);
  const toolchainPath = path.join(path.dirname(preparationPath), "toolchain.json"), toolchainInput = readBoundJson(toolchainPath);
  const toolchain = toolchainInput.value;
  if (toolchainInput.binding.sha256 !== REVIEWED_TOOLCHAIN_HASH) throw new Error("toolchain is not the independently reviewed build generation");
  if (JSON.stringify(toolchain.sources) !== JSON.stringify(preparation.sources)) throw new Error("build/source binding mismatch");
  const buildDir = path.dirname(path.join(ROOT, toolchain.built[0].path));
  if (sha(readFileSync(path.join(buildDir, "CMakeCache.txt"))) !== toolchain.cmakeCacheSha256 ||
      sha(readFileSync(path.join(buildDir, "compile_commands.json"))) !== toolchain.compileCommandsSha256) throw new Error("build metadata drift");
  const resolvedCompiler = process.platform === "darwin"
    ? execFileSync("xcrun", ["--find", "clang++"], { encoding: "utf8", timeout: 10000 }).trim()
    : toolchain.compiler.realPath;
  const compilerVersion = execFileSync(resolvedCompiler, ["--version"], { encoding: "utf8", timeout: 10000 });
  if (compilerVersion !== toolchain.compiler.version) throw new Error("resolved compiler version differs from recorded driver");
  const actualCompiler = { path: resolvedCompiler, realPath: realpathSync(resolvedCompiler), sha256: sha(readFileSync(resolvedCompiler)), version: compilerVersion };
  const dependencies = [...preparation.sources, ...toolchain.built, ...toolchain.externalLibraries, toolchain.compiler,
    actualCompiler, preparation.proofInterpreter, preparation.historyManifest, preparation.conformance,
    ...apiProof.instrumentBindings, ...apiProof.subjectApiBindings, preparationInput.binding, apiInput.binding,
    toolchainInput.binding, bind(path.join(ROOT, SELF))];
  if (process.platform === "darwin") dependencies.push({ path: "/usr/bin/time", sha256: sha(readFileSync("/usr/bin/time")) });
  verifyBindings(dependencies);
  // The independently reviewed per-rung entrypoint is installed separately;
  // never fake later rungs to make the all-rung reducer accept a prefix.
  const prefixChecker = path.join(ROOT, PREFIX);
  if (!existsSync(prefixChecker)) throw new Error("independent per-rung checker not yet installed");
  if (sha(readFileSync(prefixChecker)) !== PREFIX_HASH) throw new Error("per-rung checker is not the independently reviewed generation");
  dependencies.push({ path: PREFIX, sha256: PREFIX_HASH });
  mkdirSync(path.dirname(output), { recursive: true }); mkdirSync(output);
  const receipt = { schema: "braid-program/f5-enclosed-root-run.v1", campaignId: preparation.campaignId,
    runId: preparation.runId, startedAt: new Date().toISOString(), status: "incomplete", h3EvidenceEligible: false,
    dependencies, stages: [], rungs: [], runtimePremises: ["finite IEEE binary64 nearest rounding", "gradual underflow"],
    authority: "prescribed-root evidence only; independent final review required; no ordinary evolution or physical claim" };
  const watched = (stage, command, commandArgs, limitMs = 1800000) => runWatched(command, commandArgs,
    { stage, logPath: path.join(output, `${stage}.log`), limitMs });
  try {
    const compilerPath = path.join(output, "resolved-compiler.json"), compilerBinding = writeJson(compilerPath, actualCompiler);
    const reviewedBuildPath = path.join(output, "reviewed-build.json");
    const reviewedBuildBinding = writeJson(reviewedBuildPath, { schema: "braid-program/f5-reviewed-build.v1", toolchain: toolchainInput.binding,
      preparation: preparationInput.binding, nominalConformance: preparation.conformance, apiConformance: apiInput.binding,
      resolvedCompiler: compilerBinding, adapterSourceSha256: CPP_HASH,
      review: "separate read-only source/algebra/token/build review; no source defect found",
      runtimePremises: receipt.runtimePremises, dependencies });
    const bySuffix = (suffix) => {
      const found = toolchain.built.find((entry) => entry.path.endsWith(suffix));
      if (!found) throw new Error(`missing built artifact ${suffix}`); return path.join(ROOT, found.path);
    };
    const executable = bySuffix("/eom_f5_enclosed_root_cli");
    const implementationBindings = [
      ["adapter-source", path.join(ROOT, CPP)], ["adapter-executable", executable],
      ["exact-pair-header", path.join(ROOT, "src/eom/include/architrino/eom/ExactPairBatch.hpp")],
      ["exact-pair-source", path.join(ROOT, "src/eom/src/ExactPairBatch.cpp")],
      ["eom-library", bySuffix("/libeom_native.a")], ["reducer-source", path.join(ROOT, REDUCER)],
      ["compiler", compilerPath], ["toolchain", reviewedBuildPath],
    ].map(([id, filename]) => ({ id, ...bind(filename), descriptor: `reviewed F5 ${id}` }));
    dependencies.push(compilerBinding, reviewedBuildBinding, ...implementationBindings);
    const manifestPath = path.join(ROOT, preparation.historyManifest.path), manifestInput = readBoundJson(manifestPath);
    if (!equal(manifestInput.binding, preparation.historyManifest)) throw new Error("history manifest bytes differ from preparation");
    const manifest = manifestInput.value, packets = [], packetBindings = [], packetObjects = [];
    for (const samples of [8, 32, 128]) {
      verifyFrozenReferences(); verifyBindings(dependencies);
      const started = performance.now(), rawPath = path.join(output, `rung-${samples}.ndjson`);
      receipt.stages.push(await watched(`root-${samples}`, executable, ["rung", "--repo-root", ROOT,
        "--campaign-id", preparation.campaignId, "--run-id", preparation.runId,
        "--history-manifest", manifestPath, "--samples", String(samples), "--out", rawPath]));
      const raw = readNdjson(rawPath), log = readNdjson(path.join(output, `root-${samples}.log`));
      const rows = raw.entries, events = log.entries;
      dependencies.push(raw.binding, log.binding);
      const packet = assembleRung({ manifest, manifestSha256: preparation.historyManifest.sha256, samples, rows, events,
        implementationBindings, elapsedSeconds: (performance.now() - started) / 1000 });
      const packetPath = path.join(output, `rung-${samples}.json`), packetBinding = writeCompactPacketOnce(packetPath, packet); packets.push(packetPath);
      packetBindings.push(packetBinding);
      // The independent child reads complete original packets. The parent only
      // needs their small identity summaries after publication.
      packetObjects.push({ rungSamples: packet.rungSamples, bindings: packet.bindings, implementationBindings: packet.implementationBindings });
      dependencies.push(packetBinding);
      const prefixPath = path.join(output, samples === 128 ? "ledger-reduction.json" : `prefix-${samples}.json`);
      const checker = samples === 128 ? path.join(ROOT, "scripts/eom/reduce-f5-enclosed-root-ledger.mjs") : prefixChecker;
      const checkerArgs = [...(samples === 128 ? ["--max-old-space-size=8192"] : []), checker, "--repo-root", ROOT,
        "--history-manifest", manifestPath, ...packets.flatMap((filename) => ["--rung", filename]), "--out", prefixPath];
      const profile = samples === 128 && process.platform === "darwin";
      receipt.stages.push(await watched(`check-${samples}`, profile ? "/usr/bin/time" : process.execPath,
        profile ? ["-l", process.execPath, ...checkerArgs] : checkerArgs,
        Math.max(1, 1800000 - (performance.now() - started))));
      const checkedInput = readBoundJson(prefixPath);
      validateLedgerReceipt(checkedInput.value, { manifestBinding: preparation.historyManifest, manifest, packetFiles: packetBindings, packets: packetObjects });
      dependencies.push(checkedInput.binding);
      const elapsed = (performance.now() - started) / 1000;
      const projected = projectFinalRung(samples, elapsed, events.filter((event) => event.status === "phase-complete").map((event) => event.detail.phaseElapsedWallSeconds));
      if (elapsed > 1800 || projected > 1800) throw Object.assign(new Error("end-to-end projection exceeds 1800 seconds"), { projectedFinalRungSeconds: projected });
      verifyFrozenReferences(); verifyBindings(dependencies);
      const files = [raw.binding, log.binding, packetBinding, checkedInput.binding];
      receipt.rungs.push({ samples, elapsedWallSeconds: elapsed, projectedFinalRungSeconds: projected, files });
      if (samples === 128) receipt.finalReduction = checkedInput.binding;
      writeJson(path.join(output, `checkpoint-${samples}.json`), { ...receipt, status: "prefix-passed" });
    }
    verifyBindings(dependencies); verifyFrozenReferences();
    receipt.status = "prescribed-root-ladder-passed-pending-review";
    return receipt;
  } catch (error) {
    receipt.status = "stopped"; receipt.error = error.message;
    if (error.processResult) receipt.failedProcess = error.processResult;
    if (error.projectedFinalRungSeconds) receipt.projectedFinalRungSeconds = error.projectedFinalRungSeconds;
    throw error;
  } finally {
    receipt.finishedAt = new Date().toISOString(); writeJson(path.join(output, "run.json"), receipt);
    console.log(JSON.stringify({ status: receipt.status, output: relative(output), h3EvidenceEligible: false }));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runF5(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
