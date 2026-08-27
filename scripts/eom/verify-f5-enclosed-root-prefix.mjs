import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, openSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

// This bridge changes no frozen validator. Its sole module augmentation is the
// disclosed, fixed export-only appendix; it never constructs missing rungs.
export const PREFIX_SCHEMA = "braid-program/f5-enclosed-root-prefix-reduction.v1";
export const BRIDGE_PATH = "scripts/eom/verify-f5-enclosed-root-prefix.mjs";
export const REDUCER_PATH = "src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs";
export const REDUCER_SHA256 = "c41857a81ab0ba4e1f9a4f53e6608f097dea83a99f4a0fa002f5ed9590004fb6";
export const EXPORT_APPENDIX = "\nexport { validateConfigAndPilot, validateEnclosureReport, expectedMembersFromConfig, validateHistoryManifest, validateRungPacket, validateRepeatedReceptionRoots, repositoryReader };\n";
export const APPENDIX_SHA256 = "1399ee788e554642ac53a31635c2e91cc51de966089fa5a6e8ce85aaf458d786";
const HEARTBEAT_MS = 15000;
const DEADLINE_MS = 1800000;
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const moduleUrl = (bytes) => `data:text/javascript;base64,${Buffer.from(bytes).toString("base64")}`;
const reject = (message) => { throw new Error(`F5 prefix rejected: ${message}`); };

function readRegularBytes(filename) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd);
    if (!before.isFile()) reject("inputs and bindings must be regular files");
    const bytes = readFileSync(fd);
    const after = fstatSync(fd);
    if (bytes.length !== before.size || before.size !== after.size ||
        before.mtimeMs !== after.mtimeMs || before.ctimeMs !== after.ctimeMs) {
      reject("file changed during original-byte read");
    }
    return bytes;
  } finally { closeSync(fd); }
}

function parseObject(bytes, label) {
  const value = JSON.parse(bytes.toString("utf8"));
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    reject(`${label} must be a JSON object`);
  }
  return value;
}

// These two exported composition controls provide no acceptance authority.
// Production calls them only after each packet passes the frozen validators.
export function assertPrefixOrder(rungs) {
  if (!Array.isArray(rungs) || ![1, 2].includes(rungs.length) ||
      rungs.some((samples, index) => samples !== [8, 32][index])) {
    reject("only the genuine prefix [8] or [8,32] is supported; full three-rung reduction uses the original entrypoint");
  }
}

export function assertPrefixAgreement(summaries, manifest) {
  assertPrefixOrder(summaries.map((summary) => summary.rungSamples));
  for (const field of ["campaignId", "runId"]) {
    if (typeof manifest[field] !== "string" || manifest[field].length === 0 ||
        summaries.some((summary) => summary[field] !== manifest[field])) {
      reject(`prefix and history manifest must share ${field}`);
    }
  }
  for (const field of ["bindingSetSha256", "implementationBindingSetSha256",
    "memberSetSha256", "controlSetSha256"]) {
    if (summaries.some((summary) => typeof summary[field] !== "string" ||
        !/^[0-9a-f]{64}$/u.test(summary[field]) || summary[field] !== summaries[0][field])) {
      reject(`all prefix rungs must share one ${field}`);
    }
  }
}

export async function verifyPrefixSnapshot(snapshot, progress = () => {}) {
  // Only the fresh worker's byte-loaded copy may emit an accepted receipt.
  // Importing this file normally cannot misidentify cached code as current.
  if (!snapshot || !(snapshot.bridgeBytes instanceof Uint8Array) ||
      import.meta.url !== moduleUrl(snapshot.bridgeBytes) ||
      sha(snapshot.bridgeBytes) !== snapshot.bridgeSha256) {
    reject("production verification requires the fresh captured bridge module");
  }
  const root = realpathSync(snapshot.repoRoot);
  if (realpathSync(path.join(root, BRIDGE_PATH)) !== realpathSync(snapshot.bridgeFile)) {
    reject("repository root differs from the executing bridge owner");
  }
  if (!Array.isArray(snapshot.rungFiles) || ![1, 2].includes(snapshot.rungFiles.length)) {
    reject("exactly one or two original rung files are required");
  }
  const captured = new Map();
  const read = (filename) => {
    const absolute = path.resolve(filename);
    if (!captured.has(absolute)) captured.set(absolute, readRegularBytes(absolute));
    return captured.get(absolute);
  };
  const readRepositoryBytes = (relative) => {
    if (typeof relative !== "string" || relative.length === 0 || path.isAbsolute(relative) ||
        relative.split(/[\\/]/u).includes("..")) reject("binding path must be repository-relative");
    return read(path.join(root, relative));
  };
  const bridgeBytes = readRepositoryBytes(BRIDGE_PATH);
  if (!bridgeBytes.equals(Buffer.from(snapshot.bridgeBytes))) reject("bridge changed after capture");
  const reducerBytes = readRepositoryBytes(REDUCER_PATH);
  if (sha(reducerBytes) !== REDUCER_SHA256 || sha(EXPORT_APPENDIX) !== APPENDIX_SHA256) {
    reject("frozen reducer or fixed export appendix changed");
  }
  const augmentedBytes = Buffer.concat([reducerBytes, Buffer.from(EXPORT_APPENDIX)]);
  const frozen = await import(moduleUrl(augmentedBytes));
  progress({ stage: "frozen-checks-loaded", completedRungs: 0 });
  const historyBytes = read(snapshot.historyManifest);
  const manifest = parseObject(historyBytes, "history manifest");
  const entries = snapshot.rungFiles.map((filename) => {
    const bytes = read(filename);
    return { filename: path.resolve(filename), bytes, packet: parseObject(bytes, "rung packet") };
  });
  assertPrefixOrder(entries.map(({ packet }) => packet.rungSamples));
  // These closed production options cannot be supplied or changed by callers.
  // Only the I/O cache is new; every mathematical/serialization check below is
  // the original frozen function, with file authority explicitly enabled.
  const options = { repoRoot: root, readRepositoryBytes,
    readBindingBytes: readRepositoryBytes, testOnly: false };
  const config = frozen.validateConfigAndPilot(options);
  frozen.validateEnclosureReport(options);
  const expectedMembers = frozen.expectedMembersFromConfig(config);
  const historySummary = frozen.validateHistoryManifest(
    { manifest, bytes: historyBytes }, options, expectedMembers,
  );
  progress({ stage: "history-checked", completedRungs: 0 });
  const summaries = entries.map((entry, rungIndex) => {
    // The checked object is constructed solely from these very bytes, never
    // a caller-supplied object or a synthetic completion of a partial packet.
    if (JSON.stringify(parseObject(entry.bytes, "rung packet")) !== JSON.stringify(entry.packet)) {
      reject("original rung bytes differ from the checked object");
    }
    const summary = frozen.validateRungPacket(entry.packet, {
      ...options, expectedMembers, historySummary, rawSha256: sha(entry.bytes), rungIndex,
    });
    progress({ stage: "rung-checked", completedRungs: rungIndex + 1, rungSamples: summary.rungSamples });
    return summary;
  });
  assertPrefixAgreement(summaries, historySummary.manifest);
  frozen.validateRepeatedReceptionRoots(entries.map(({ packet }) => packet));
  // The frozen reducer's normal public entrypoint checks import.meta's file
  // identity. A disclosed data-URL augmentation is not that file; the pinned
  // captured original bytes plus this separately bound appendix replace that
  // entrypoint-only identity guard, never any validation function.
  for (const [filename, original] of captured) {
    if (!readRegularBytes(filename).equals(original)) reject(`bound file changed during verification: ${filename}`);
  }
  return {
    schema: PREFIX_SCHEMA, accepted: true, h3EvidenceEligible: false,
    status: "genuine-prefix-ledger-checks-passed", completeLadder: false,
    resourceContact: false, heartbeatSeconds: 15, limitSeconds: 1800,
    authority: "source-and-byte-bound-frozen-validator-prefix-composition",
    campaignId: summaries[0].campaignId, runId: summaries[0].runId,
    rungOrder: summaries.map((summary) => summary.rungSamples),
    totalRows: summaries.reduce((sum, summary) => sum + summary.rowCount, 0),
    historyManifestSha256: historySummary.rawSha256,
    rawHistoryManifest: { path: path.resolve(snapshot.historyManifest), sha256: sha(historyBytes) },
    rawRungFiles: entries.map(({ filename, bytes, packet }) => ({ path: filename, sha256: sha(bytes), rungSamples: packet.rungSamples })),
    reducerSource: { path: REDUCER_PATH, sha256: REDUCER_SHA256 },
    exportAppendix: { sha256: APPENDIX_SHA256, utf8: EXPORT_APPENDIX },
    executedAugmentedReducerSha256: sha(augmentedBytes),
    bridgeSource: { path: BRIDGE_PATH, sha256: sha(bridgeBytes) },
    sourceBindings: entries[0].packet.bindings,
    implementationBindings: entries[0].packet.implementationBindings,
    rungSummaries: summaries,
    checks: { frozenBindings: "passed", implementationBindings: "passed", enclosureAuthority: "passed",
      exactHistoryManifest: "passed", exactCensus: "passed", selfRows: "passed", partnerRows: "passed",
      factorMargins: "passed", rootFreeComplements: "passed", resourceLimits: "passed",
      prefixIdentity: "passed", repeatedReceptionRoots: "passed" },
    claimBoundary: "Only the supplied genuine prefix passed the frozen ledger, serialization, identity and byte checks. The executing reducer module is the captured original source plus the disclosed export-only appendix. No missing rung is constructed or inferred. Independent actual-cubic/API-domain conformance and reviewed build provenance remain separate prerequisites; final three-rung reduction uses the original public entrypoint. No H3, evolution, retention, stability, binding, score, or physical claim.",
  };
}

function parseArgs(argv) {
  const args = { repoRoot: process.cwd(), historyManifest: null, rungFiles: [], output: null };
  const singletons = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!["--repo-root", "--history-manifest", "--rung", "--out"].includes(flag) ||
        index + 1 >= argv.length || argv[index + 1].startsWith("--")) reject(`unknown or incomplete argument: ${flag}`);
    if (flag !== "--rung" && singletons.has(flag)) reject(`duplicate argument: ${flag}`);
    singletons.add(flag);
    const value = path.resolve(argv[++index]);
    if (flag === "--rung") args.rungFiles.push(value);
    else if (flag === "--repo-root") args.repoRoot = value;
    else if (flag === "--history-manifest") args.historyManifest = value;
    else args.output = value;
  }
  if (!args.historyManifest || !args.output || ![1, 2].includes(args.rungFiles.length)) {
    reject("usage: --repo-root ROOT --history-manifest FILE --rung FILE [--rung FILE] --out NEW");
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (existsSync(args.output)) reject("output already exists; choose a fresh evidence path");
  const bridgeFile = fileURLToPath(import.meta.url);
  const bridgeBytes = readRegularBytes(bridgeFile);
  const started = Date.now();
  let progress = { stage: "started", completedRungs: 0 };
  process.stdout.write(`${JSON.stringify({ ...progress, heartbeatSeconds: 15, limitSeconds: 1800 })}\n`);
  const snapshot = { ...args, bridgeFile, bridgeBytes, bridgeSha256: sha(bridgeBytes) };
  const worker = new Worker(`
    const { parentPort, workerData } = require("node:worker_threads");
    const { createHash } = require("node:crypto");
    (async () => {
      const bytes = Buffer.from(workerData.bridgeBytes);
      if (createHash("sha256").update(bytes).digest("hex") !== workerData.bridgeSha256) throw new Error("bridge snapshot hash mismatch");
      const bridge = await import("data:text/javascript;base64," + bytes.toString("base64"));
      const result = await bridge.verifyPrefixSnapshot(workerData, event => parentPort.postMessage({ event }));
      parentPort.postMessage({ result });
    })().catch(error => { parentPort.postMessage({ failure: String(error.message) }); process.exitCode = 1; });
  `, { eval: true, workerData: snapshot });
  const result = await new Promise((resolve) => {
    let done = false;
    const finish = (value) => {
      if (done) return;
      done = true;
      clearInterval(heartbeat);
      clearTimeout(deadline);
      resolve(value);
    };
    const failure = (message, resourceContact = false) => finish({ schema: PREFIX_SCHEMA,
      accepted: false, h3EvidenceEligible: false, completeLadder: false,
      status: "prefix-ledger-checks-rejected", failure: message, resourceContact });
    const heartbeat = setInterval(() => process.stdout.write(`${JSON.stringify({ ...progress,
      elapsedWallSeconds: (Date.now() - started) / 1000 })}\n`), HEARTBEAT_MS);
    const deadline = setTimeout(() => {
      failure("prefix verification deadline reached", true);
      void worker.terminate();
    }, DEADLINE_MS);
    worker.on("message", (message) => {
      if (message.event) progress = message.event;
      else if (message.result) finish(message.result);
      else if (message.failure) failure(message.failure);
    });
    worker.on("error", (error) => failure(error.message));
    worker.on("exit", (code) => { if (!done) failure(`worker exited without a result (${code})`); });
  });
  await worker.terminate();
  result.elapsedWallSeconds = (Date.now() - started) / 1000;
  if (result.elapsedWallSeconds >= 1800) {
    result.accepted = false;
    result.status = "prefix-ledger-checks-rejected";
    result.resourceContact = true;
    result.failure = "prefix verification deadline reached";
  }
  writeFileSync(args.output, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  process.stdout.write(`${JSON.stringify({ accepted: result.accepted, h3EvidenceEligible: false,
    rungOrder: result.rungOrder ?? [], output: args.output })}\n`);
  if (!result.accepted) process.exitCode = 1;
}

if (import.meta.url.startsWith("file:") && process.argv[1] &&
    realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}
