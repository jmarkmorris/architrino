import { createHash, randomUUID } from "node:crypto";
import { closeSync, constants, fstatSync, fsyncSync, openSync, readSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isMainThread, parentPort, Worker, workerData } from "node:worker_threads";

// Consumer of frozen reference mathematics, never a carrier author.
export const SUBFIELD_CIRCULAR_HISTORY_SCHEMA = "braid-program/subfield-circular-history-manifest.v1";
export const SUBFIELD_CIRCULAR_PROOF_SCHEMA = "braid-program/subfield-circular-history-conformance.v1";
export const SUBFIELD_CIRCULAR_FROZEN_BINDINGS = Object.freeze([
  { id: "circular-core", path: "src/prescribed-path-analysis/CircularHistoryConformance.mjs", sha256: "e06080cc2e7d62af546bb51e60b65e157905c7d765e9f2d5b8c44f71ce3f22f8" },
  { id: "integer-primitive", path: "scripts/eom/derive-subfield-circular-root-reference.mjs", sha256: "45f27a7aea84b110aa3cfa0583fb869782c2189af6b003aba4ab2215b40ac003" },
  { id: "root-reference", path: ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-root-reference-20260827-v1.json", sha256: "c5c7ae5e44e37c7a03ac916f2c406a657e9b90067c27a596302a2731a9ae066f" },
  { id: "budget-cli", path: "scripts/eom/derive-subfield-circular-history-budget.mjs", sha256: "5e4aff33e4a82444df5d29b29c2dbd509c935668e262816e1ec0c2128d6732bc" },
  { id: "construction-budget", path: ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-history-budget-20260827-v1.json", sha256: "6c380ecb86be8ca505ef7975cdd4d8fb844e2191762692a6b5e29134ee5bfebf" },
  { id: "pilot-predeclaration", path: "reference/priorities/braid-program/evidence/2026-08-27-subfield-circular-h3-pilot-predeclaration.md", sha256: "b1f0ac316d24637b8ad01f467d33c207e7ed728fa3bd3921824d51697daddc4d" },
].map(Object.freeze));
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SELF = "scripts/eom/verify-subfield-circular-history.mjs";
const SCALE = 10n ** 60n;
const SEGMENTS = 1000;
const DEADLINE_MS = 1800000;
const HEARTBEAT_MS = 15000;
const MAX_BYTES = 64 * 1024 * 1024;
const CANDIDATES = ["coincident-midpoint-common-frequency", "coincident-midpoint-equal-radius-common-frequency", "coincident-midpoint-3-2-1-frequency", "phase-compensated-equal-geometry", "axially-separated-common-frequency", "axially-separated-equal-radius-common-frequency", "axially-separated-3-2-1-frequency", "axial-transverse-coincident-axis-interior", "high-axial-coincident-axis-interior", "planar-common-center-three-binary", "coincident-center-two-component-circular-co-rotating", "coincident-center-two-component-circular-counter-rotating", "coaxial-separated-two-component-circular-co-rotating", "coaxial-separated-two-component-circular-counter-rotating", "coaxial-separated-two-planar-braid-co-rotating", "coaxial-separated-two-planar-braid-counter-rotating"];
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const reject = (message) => { throw new Error(`sub-field circular history rejected: ${message}`); };

// Open first without waiting for a FIFO peer, then validate and read the SAME
// descriptor. A path stat followed by readFileSync would leave a replacement
// race, and a size-only check does not exclude pipes or devices.
function readRegularBytes(filename) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd);
    if (!before.isFile()) reject("input must be a regular file");
    if (before.size > MAX_BYTES) reject("input exceeds 64 MiB resource bound");
    const chunks = [];
    let length = 0;
    for (;;) {
      const chunk = Buffer.allocUnsafe(Math.min(65536, MAX_BYTES + 1 - length));
      const count = readSync(fd, chunk, 0, chunk.length, length);
      if (count === 0) break;
      length += count;
      if (length > MAX_BYTES) reject("input grew beyond 64 MiB resource bound");
      chunks.push(chunk.subarray(0, count));
    }
    const after = fstatSync(fd);
    if (after.size !== before.size || length !== before.size ||
        after.mtimeMs !== before.mtimeMs || after.ctimeMs !== before.ctimeMs) reject("input changed during bounded read");
    return Buffer.concat(chunks, length);
  } finally { closeSync(fd); }
}

function captureProofSnapshot() {
  const sources = [
    ...SUBFIELD_CIRCULAR_FROZEN_BINDINGS.filter((binding) => ["circular-core", "integer-primitive"].includes(binding.id)),
    { id: "whole-manifest-verifier", path: SELF },
  ].map((binding) => {
    const url = pathToFileURL(path.join(ROOT, binding.path)).href;
    const bytes = readRegularBytes(fileURLToPath(url));
    const digest = sha(bytes);
    if (binding.sha256 && digest !== binding.sha256) reject(`bound bytes changed: ${binding.id}`);
    return { ...binding, sha256: digest, url, bytes };
  });
  return { sources, nonce: randomUUID(), entryUrl: pathToFileURL(path.join(ROOT, SELF)).href };
}

// This function is also executed verbatim by the fresh worker's tiny loader.
// The original sources are neither rewritten nor imported from disk. Query
// identities prevent a previously cached module from supplying any generation.
function installSnapshotLoader(snapshot) {
  const entries = new Map(snapshot.sources.map((entry) => [entry.url, entry]));
  const marker = `?subfield-circular-proof-snapshot=${snapshot.nonce}`;
  for (const entry of entries.values()) {
    if (createHash("sha256").update(entry.bytes).digest("hex") !== entry.sha256) {
      throw new Error("captured proof snapshot hash mismatch");
    }
  }
  return registerHooks({
    resolve(specifier, context, nextResolve) {
      // Resolve this closed relative-import graph without consulting the
      // mutable filesystem again, including if a captured file was removed.
      let direct;
      try { direct = new URL(specifier, context.parentURL).href; } catch { /* Bare builtins use Node resolution. */ }
      const captured = direct && direct.split("?")[0];
      if (entries.has(captured)) return { url: captured + marker, format: "module", shortCircuit: true };
      if (direct?.startsWith("file:") && context.parentURL?.includes(marker)) {
        throw new Error("uncaptured proof dependency");
      }
      const result = nextResolve(specifier, context);
      const original = result.url.split("?")[0];
      if (entries.has(original)) return { ...result, url: original + marker, shortCircuit: true };
      if (result.url.startsWith("file:") && context.parentURL?.includes(marker)) {
        throw new Error("uncaptured proof dependency");
      }
      return result;
    },
    load(url, context, nextLoad) {
      const original = url.split("?")[0], entry = entries.get(original);
      if (entry && url === original + marker) {
        return { format: "module", source: Buffer.from(entry.bytes), shortCircuit: true };
      }
      return nextLoad(url, context);
    },
  });
}

function snapshotBindings(snapshot) {
  return snapshot.sources.map(({ id, path: relative, sha256 }) => ({ id, path: relative, sha256 }));
}

function validateSnapshot(snapshot) {
  if (!snapshot || !Array.isArray(snapshot.sources) || snapshot.sources.length !== 3 ||
      snapshot.entryUrl !== pathToFileURL(path.join(ROOT, SELF)).href ||
      typeof snapshot.nonce !== "string" || !/^[0-9a-f-]{36}$/u.test(snapshot.nonce)) reject("invalid proof source snapshot");
  const expected = [...SUBFIELD_CIRCULAR_FROZEN_BINDINGS.filter((binding) =>
    ["circular-core", "integer-primitive"].includes(binding.id)), { id: "whole-manifest-verifier", path: SELF }];
  for (const [index, entry] of snapshot.sources.entries()) {
    const binding = expected[index];
    if (entry.id !== binding.id || entry.path !== binding.path ||
        entry.url !== pathToFileURL(path.join(ROOT, binding.path)).href ||
        !(entry.bytes instanceof Uint8Array) || entry.bytes.byteLength > MAX_BYTES ||
        sha(entry.bytes) !== entry.sha256 || (binding.sha256 && entry.sha256 !== binding.sha256)) {
      reject("proof source snapshot differs from its declared frozen generation");
    }
  }
  return snapshot;
}

const PROOF_SNAPSHOT = validateSnapshot(!isMainThread && workerData?.task === "subfield-circular-whole-manifest-proof"
  ? workerData.snapshot : captureProofSnapshot());
const coreLoader = installSnapshotLoader(PROOF_SNAPSHOT);
let core;
try { core = await import(PROOF_SNAPSHOT.sources[0].url); }
finally { coreLoader.deregister(); }
const { CIRCULAR_ERROR_CONTRACT, certifyCircularSegment, circularCarrierDomain,
  formatCircularBound, parseCircularToken } = core;
const STEP = parseCircularToken(CIRCULAR_ERROR_CONTRACT.segmentStep);

const WORKER_LOADER = `
const { workerData } = await import("node:worker_threads");
const { createHash } = await import("node:crypto");
const { registerHooks } = await import("node:module");
(${installSnapshotLoader.toString()})(workerData.snapshot);
await import(workerData.snapshot.entryUrl);
`;

function keys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) ||
      Object.keys(value).length !== expected.length || expected.some((key) => !Object.hasOwn(value, key))) {
    reject(`${label} has missing or extra fields`);
  }
}

// JSON.parse owns syntax and escape validation. This scan separately rejects
// duplicate decoded keys, which different producer parsers could interpret differently.
function originalJson(bytes, exactNumbers = false) {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength > MAX_BYTES) reject("bounded original JSON bytes required");
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  const parsed = JSON.parse(text, exactNumbers
    ? (_key, value, context) => typeof value === "number" ? context.source : value
    : undefined);
  let at = 0;
  const whitespace = () => { while (at < text.length && /\s/u.test(text[at])) at++; };
  function string() {
    const begin = at++;
    while (at < text.length) {
      const c = text[at++];
      if (c === "\\") at++;
      else if (c === '"') return JSON.parse(text.slice(begin, at));
    }
    reject("unterminated JSON string");
  }
  function value(depth = 0) {
    if (depth > 24) reject("JSON nesting exceeds manifest contract");
    whitespace();
    if (text[at] === '"') { string(); return; }
    if (text[at] === "{") {
      at++; whitespace(); const seen = new Set();
      if (text[at] === "}") { at++; return; }
      for (;;) {
        whitespace(); const key = string();
        if (seen.has(key)) reject(`duplicate JSON key ${key}`);
        seen.add(key); whitespace(); at++; value(depth + 1); whitespace();
        if (text[at++] === "}") return;
      }
    }
    if (text[at] === "[") {
      at++; whitespace();
      if (text[at] === "]") { at++; return; }
      for (;;) { value(depth + 1); whitespace(); if (text[at++] === "]") return; }
    }
    while (at < text.length && !/[\s,}\]]/u.test(text[at])) at++;
  }
  value();
  return parsed;
}

function readBound(binding) {
  const bytes = readRegularBytes(path.join(ROOT, binding.path));
  if (sha(bytes) !== binding.sha256) reject(`bound bytes changed: ${binding.id ?? binding.path}`);
  return bytes;
}

function references() {
  const loaded = new Map(SUBFIELD_CIRCULAR_FROZEN_BINDINGS.map((binding) => [binding.id, readBound(binding)]));
  const root = originalJson(loaded.get("root-reference"));
  const budget = originalJson(loaded.get("construction-budget"));
  if (root.accepted !== true || root.normalizedFieldSpeed !== "1" ||
      root.eomInvoked !== false || root.h3ExecutionValidated !== false ||
      !Array.isArray(root.results) || root.results.length !== 16 ||
      root.results.some((row, index) => row.id !== CANDIDATES[index] || row.passed !== true)) {
    reject("frozen sixteen-candidate reference census is incomplete");
  }
  if (budget.accepted !== true || budget.actualCarrierValidated !== false || budget.h3EvidenceEligible !== false ||
      JSON.stringify(budget.contract) !== JSON.stringify(CIRCULAR_ERROR_CONTRACT) ||
      !Array.isArray(budget.results) || budget.results.length !== 16 ||
      budget.results.some((row, index) => row.id !== CANDIDATES[index] || row.accepted !== true ||
        row.sourceSha256 !== root.results[index].sourceSha256)) reject("frozen construction budget differs");
  return { root, budget };
}

function reception(rung, phase) {
  if (![2, 8, 32, 128].includes(rung) || !Number.isSafeInteger(phase) || phase < 0 || phase >= rung) {
    reject("rung must be 2/8/32/128 and phase must be an in-range integer");
  }
  return 4n * SCALE + 4n * SCALE * BigInt(phase) / BigInt(rung);
}

function expectedSource(manifest, refs) {
  const row = refs.root.results.find((candidate) => candidate.id === manifest.candidateId);
  if (!row) reject("candidate is absent from the frozen reference census");
  keys(manifest.sourceBinding, ["path", "sha256"], "sourceBinding");
  if (manifest.sourceBinding.path !== row.sourcePath || manifest.sourceBinding.sha256 !== row.sourceSha256) {
    reject("source binding is not the candidate's frozen source");
  }
  const binding = { id: "candidate-source", path: row.sourcePath, sha256: row.sourceSha256 };
  const source = originalJson(readBound(binding), true);
  if (source.schema !== "prescribed-assembly-spec.v3" ||
      source.history.start !== "0" || source.history.end !== "8" || source.history.delayHorizon !== "2") reject("source history/schema differs");
  const constituents = new Map(source.constituents.map((member) => [member.id, member]));
  const worldlines = new Map(source.worldlines.map((member) => [member.constituentId, member]));
  const order = source.relationships.sourceOrder;
  if (constituents.size !== row.memberCount || worldlines.size !== row.memberCount ||
      source.constituents.length !== row.memberCount || source.worldlines.length !== row.memberCount ||
      order.length !== row.memberCount || new Set(order).size !== row.memberCount ||
      new Set(source.worldlines.map((member) => member.id)).size !== row.memberCount) reject("invalid source member census");
  const members = order.map((id) => {
    const constituent = constituents.get(id), worldline = worldlines.get(id);
    if (!constituent || !worldline || constituent.worldlineId !== worldline.id ||
        !["1", "-1"].includes(constituent.polarity)) reject("invalid source identity/polarity");
    return { constituentId: id, worldlineId: worldline.id, polarity: Number(constituent.polarity), operator: worldline.operator };
  });
  return { binding, members };
}

function fingerprint(segments) {
  let state = 14695981039346656037n;
  const append = (token) => {
    for (const byte of Buffer.from(`${Buffer.byteLength(token)}:${token}`, "utf8")) {
      state = BigInt.asUintN(64, (state ^ BigInt(byte)) * 1099511628211n);
    }
  };
  append("eom_history_segment_chain/v1");
  for (const segment of segments) {
    append(segment.tStart); append(segment.tEnd);
    for (const axis of segment.coefficients) for (const coefficient of axis) append(coefficient);
    for (const token of segment.positionErrors) append(token);
    for (const token of segment.velocityErrors) append(token);
  }
  return `fnv1a64-chain-v1:${state.toString(16).padStart(16, "0")}`;
}

function structure(bytes, rung, phase, refs, progress) {
  const manifest = originalJson(bytes);
  keys(manifest, ["schema", "manifestId", "candidateId", "sourceBinding", "normalizedFieldSpeed", "receptionTime", "retainedInterval", "members"], "manifest");
  if (manifest.schema !== SUBFIELD_CIRCULAR_HISTORY_SCHEMA || manifest.normalizedFieldSpeed !== "1") reject("wrong manifest schema or field speed");
  const time = reception(rung, phase), timeToken = formatCircularBound(time), lower = time - 2n * SCALE;
  const manifestId = `subfield-circular-history/v1:${manifest.candidateId}:T=${timeToken}`;
  if (manifest.receptionTime !== timeToken || manifest.manifestId !== manifestId ||
      !Array.isArray(manifest.retainedInterval) || manifest.retainedInterval.length !== 2 ||
      manifest.retainedInterval[0] !== formatCircularBound(lower) || manifest.retainedInterval[1] !== timeToken) reject("wrong exact reception/window/identity");
  const source = expectedSource(manifest, refs);
  if (!Array.isArray(manifest.members) || manifest.members.length !== source.members.length) reject("incomplete member coverage");
  const domains = Array.from({ length: SEGMENTS }, (_, index) => {
    const start = formatCircularBound(lower + BigInt(index) * STEP), end = formatCircularBound(lower + BigInt(index + 1) * STEP);
    return { start, end, bits: circularCarrierDomain(start, end).parsedEndpointBits };
  });
  manifest.members.forEach((member, memberIndex) => {
    keys(member, ["index", "constituentId", "worldlineId", "polarity", "historyId", "historyFingerprint", "segments"], `member ${memberIndex}`);
    const expected = source.members[memberIndex];
    if (member.index !== memberIndex || member.constituentId !== expected.constituentId ||
        member.worldlineId !== expected.worldlineId || member.polarity !== expected.polarity ||
        member.historyId !== `${manifestId}/${expected.worldlineId}`) reject(`member ${memberIndex} identity/order/polarity mismatch`);
    if (!Array.isArray(member.segments) || member.segments.length !== SEGMENTS) reject(`member ${memberIndex} needs exactly 1000 segments`);
    member.segments.forEach((segment, index) => {
      keys(segment, ["index", "tStart", "tEnd", "coefficients", "positionErrors", "velocityErrors", "parsedEndpointBits"], `member ${memberIndex} segment ${index}`);
      if (segment.index !== index || segment.tStart !== domains[index].start || segment.tEnd !== domains[index].end) reject(`member ${memberIndex} segment ${index} partition mismatch`);
      if (!Array.isArray(segment.parsedEndpointBits) || segment.parsedEndpointBits.length !== 2 ||
          segment.parsedEndpointBits.some((bits, side) => bits !== domains[index].bits[side])) reject(`member ${memberIndex} segment ${index} parsed endpoint bits mismatch`);
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3 ||
          segment.coefficients.some((axis) => !Array.isArray(axis) || axis.length !== 4)) reject("coefficient shape must be 3 by 4");
      for (const axis of segment.coefficients) for (const token of axis) parseCircularToken(token);
      for (const [field, value] of [["positionErrors", CIRCULAR_ERROR_CONTRACT.positionError], ["velocityErrors", CIRCULAR_ERROR_CONTRACT.velocityError]]) {
        if (!Array.isArray(segment[field]) || segment[field].length !== 3 || segment[field].some((token) => token !== value)) reject(`changed literal ${field}`);
      }
    });
    if (member.historyFingerprint !== fingerprint(member.segments)) reject(`member ${memberIndex} history fingerprint mismatch`);
    progress({ stage: "structure", completedMembers: memberIndex + 1, memberCount: source.members.length });
  });
  return { manifest, source, manifestSha256: sha(bytes) };
}

// Synthetic complete manifests exercise plumbing only. This exported control
// never invokes or replaces the frozen mathematical checker and cannot accept evidence.
export function inspectSubfieldCircularHistoryStructureForTests(bytes, rung, phase) {
  const checked = structure(bytes, rung, phase, references(), () => {});
  for (const binding of [...SUBFIELD_CIRCULAR_FROZEN_BINDINGS, checked.source.binding]) readBound(binding);
  return { accepted: false, plumbingValidated: true, actualCarrierValidated: false, h3EvidenceEligible: false,
    authority: "test-only-structural-plumbing-not-actual-evidence", manifestId: checked.manifest.manifestId,
    manifestSha256: checked.manifestSha256, memberCount: checked.manifest.members.length,
    segmentCount: checked.manifest.members.length * SEGMENTS };
}

function prove(manifestPath, rung, phase, progress) {
  const began = performance.now();
  const checkDeadline = () => { if (performance.now() - began >= DEADLINE_MS) reject("1800-second proof deadline exceeded"); };
  const bytes = readRegularBytes(manifestPath);
  progress({ stage: "read", manifestSha256: sha(bytes) });
  const selfBinding = snapshotBindings(PROOF_SNAPSHOT).find((binding) => binding.id === "whole-manifest-verifier");
  const checked = structure(bytes, rung, phase, references(), (event) => { checkDeadline(); progress(event); });
  const { manifest, source } = checked;
  const members = [];
  let completedSegments = 0, lastProgress = performance.now();
  for (const [index, member] of manifest.members.entries()) {
    const digest = createHash("sha256");
    const maxima = { endpointPositionErrorUpper: 0n, endpointVelocityErrorUpper: 0n, positionErrorUpper: 0n, velocityErrorUpper: 0n };
    for (const [segmentIndex, segment] of member.segments.entries()) {
      checkDeadline();
      const result = certifyCircularSegment(source.members[index].operator, segment);
      if (result.accepted !== true || result.authority !== "single-segment-only" || result.h3EvidenceEligible !== false ||
          result.parsedEndpointBits.some((bits, side) => bits !== segment.parsedEndpointBits[side])) reject(`actual segment conformance failed at member ${index}, segment ${segmentIndex}`);
      digest.update(`${JSON.stringify(result)}\n`);
      for (const check of result.checks) for (const field of Object.keys(maxima)) {
        const value = parseCircularToken(check[field]);
        if (value > maxima[field]) maxima[field] = value;
      }
      completedSegments++;
      if (performance.now() - lastProgress >= 500) {
        progress({ stage: "actual-segment-conformance", candidateId: manifest.candidateId, completedSegments,
          totalSegments: manifest.members.length * SEGMENTS, memberIndex: index, segmentIndex });
        lastProgress = performance.now();
      }
    }
    members.push({ index, constituentId: member.constituentId, worldlineId: member.worldlineId, polarity: member.polarity,
      historyId: member.historyId, historyFingerprint: member.historyFingerprint, segmentCount: SEGMENTS,
      segmentProofSha256: digest.digest("hex"),
      maxima: Object.fromEntries(Object.entries(maxima).map(([key, value]) => [key, formatCircularBound(value)])) });
  }
  const bindings = [...SUBFIELD_CIRCULAR_FROZEN_BINDINGS, source.binding, selfBinding];
  for (const binding of bindings) { checkDeadline(); readBound(binding); }
  if (sha(readRegularBytes(manifestPath)) !== checked.manifestSha256) reject("original manifest bytes changed during proof");
  checkDeadline();
  return { schema: SUBFIELD_CIRCULAR_PROOF_SCHEMA, accepted: true, actualCarrierValidated: true, h3EvidenceEligible: false,
    authority: "source-bound-whole-manifest-analytic-conformance-only", candidateId: manifest.candidateId,
    manifestId: manifest.manifestId, manifestPath, manifestSha256: checked.manifestSha256,
    rung, phase, receptionTime: manifest.receptionTime, retainedInterval: manifest.retainedInterval,
    normalizedFieldSpeed: "1", memberCount: members.length, segmentCount: completedSegments, bindings, members,
    execution: { mode: "captured-source-worker", sourceBindings: snapshotBindings(PROOF_SNAPSHOT) },
    proofWallSeconds: (performance.now() - began) / 1000,
    claimBoundary: "Only the original complete cubic manifest's continuous analytic position/velocity error bounds are checked. No EOM parsing/build, actual inflated EOM velocity intervals, root ledger, H3, evolution, retention, stability, score, or physical claim is accepted." };
}

function argumentsForCli(argv) {
  const options = {};
  for (let at = 0; at < argv.length; at += 2) {
    const key = argv[at];
    if (!["--manifest", "--rung", "--phase", "--out"].includes(key) || argv[at + 1] === undefined || Object.hasOwn(options, key)) {
      reject("Usage: node scripts/eom/verify-subfield-circular-history.mjs --manifest FILE --rung 2|8|32|128 --phase K --out NEW");
    }
    options[key] = argv[at + 1];
  }
  if (Object.keys(options).length !== 4 || !/^(2|8|32|128)$/u.test(options["--rung"]) ||
      !/^(0|[1-9][0-9]*)$/u.test(options["--phase"])) reject("all four exact CLI arguments are required");
  const rung = Number(options["--rung"]), phase = Number(options["--phase"]);
  reception(rung, phase);
  return { manifestPath: path.resolve(options["--manifest"]), output: path.resolve(options["--out"]), rung, phase };
}

async function cli() {
  const args = argumentsForCli(process.argv.slice(2));
  const began = performance.now();
  // Reserve the exact path before work. Only this supervisor writes the result;
  // a failed proof leaves a rejected receipt, never a reusable empty success.
  const fd = openSync(args.output, "wx");
  let latest = { stage: "starting" }, worker, heartbeat, deadline;
  const emit = () => process.stderr.write(`${JSON.stringify({ ...latest,
    event: "proof-heartbeat", elapsedSeconds: (performance.now() - began) / 1000,
    deadlineSeconds: DEADLINE_MS / 1000, h3EvidenceEligible: false })}\n`);
  let result;
  try {
    emit();
    // Only the worker's captured generation claims mathematical authority.
    // This supervisor reserves output, checks identity/deadline, and can only
    // preserve or reject that receipt, never synthesize an accepted proof.
    worker = new Worker(new URL(`data:text/javascript;base64,${Buffer.from(WORKER_LOADER).toString("base64")}`),
      { workerData: { task: "subfield-circular-whole-manifest-proof", ...args, snapshot: PROOF_SNAPSHOT } });
    result = await new Promise((resolve, rejectPromise) => {
      heartbeat = setInterval(emit, HEARTBEAT_MS);
      deadline = setTimeout(() => {
        latest = { ...latest, supervisionDeadlineExceeded: true };
        rejectPromise(new Error("1800-second supervised proof deadline exceeded"));
      }, DEADLINE_MS);
      worker.on("message", (message) => {
        if (message.type === "progress") latest = { ...latest, ...message.value };
        else if (message.type === "complete") resolve(message.value);
        else if (message.type === "failure") rejectPromise(new Error(message.message));
        else rejectPromise(new Error("invalid proof-worker response"));
      });
      worker.on("error", rejectPromise);
      worker.on("exit", (code) => rejectPromise(new Error(`proof worker exited before completion (${code})`)));
    });
    if (performance.now() - began >= DEADLINE_MS || result.accepted !== true ||
        result.actualCarrierValidated !== true || result.h3EvidenceEligible !== false) reject("invalid or late proof-worker result");
    if (result.schema !== SUBFIELD_CIRCULAR_PROOF_SCHEMA || result.authority !== "source-bound-whole-manifest-analytic-conformance-only" ||
        result.manifestPath !== args.manifestPath || result.rung !== args.rung || result.phase !== args.phase ||
        result.execution?.mode !== "captured-source-worker" ||
        JSON.stringify(result.execution.sourceBindings) !== JSON.stringify(snapshotBindings(PROOF_SNAPSHOT))) reject("proof-worker generation or request mismatch");
    const checked = structure(readRegularBytes(args.manifestPath), args.rung, args.phase, references(), () => {});
    if (result.manifestSha256 !== checked.manifestSha256 || result.manifestId !== checked.manifest.manifestId ||
        result.candidateId !== checked.manifest.candidateId || result.memberCount !== checked.manifest.members.length ||
        result.segmentCount !== checked.manifest.members.length * SEGMENTS || !Array.isArray(result.members) ||
        result.members.length !== checked.manifest.members.length || result.members.some((member, index) => {
          const expected = checked.manifest.members[index];
          return ["index", "constituentId", "worldlineId", "polarity", "historyId", "historyFingerprint"].some((key) =>
            member[key] !== expected[key]) || member.segmentCount !== SEGMENTS;
        })) reject("proof-worker census differs from the declared original manifest");
    const bindings = [...SUBFIELD_CIRCULAR_FROZEN_BINDINGS, checked.source.binding,
      snapshotBindings(PROOF_SNAPSHOT).find((binding) => binding.id === "whole-manifest-verifier")];
    if (JSON.stringify(result.bindings) !== JSON.stringify(bindings)) reject("proof-worker binding generation mismatch");
  } catch (error) {
    result = { schema: SUBFIELD_CIRCULAR_PROOF_SCHEMA, accepted: false, actualCarrierValidated: false, h3EvidenceEligible: false,
      authority: "rejected-no-evidence", manifestPath: args.manifestPath, rung: args.rung, phase: args.phase,
      error: error.message, lastProgress: latest };
    process.exitCode = 1;
  } finally {
    // Keep both monitoring timers active while termination is awaited. No
    // late worker/cleanup result can survive the publication deadline check.
    try { if (worker) await worker.terminate(); }
    finally { clearInterval(heartbeat); clearTimeout(deadline); }
  }
  if (result.accepted && performance.now() - began >= DEADLINE_MS) {
    result = { schema: SUBFIELD_CIRCULAR_PROOF_SCHEMA, accepted: false, actualCarrierValidated: false, h3EvidenceEligible: false,
      authority: "rejected-no-evidence", manifestPath: args.manifestPath, rung: args.rung, phase: args.phase,
      error: "1800-second supervised proof deadline exceeded before publication", lastProgress: latest };
    process.exitCode = 1;
  }
  try {
    result.supervisedWallSeconds = (performance.now() - began) / 1000;
    writeFileSync(fd, `${JSON.stringify(result, null, 2)}\n`);
    fsyncSync(fd);
  } finally { closeSync(fd); }
  process.stdout.write(`${JSON.stringify({ accepted: result.accepted, actualCarrierValidated: result.actualCarrierValidated,
    h3EvidenceEligible: false, output: args.output, error: result.error })}\n`);
}

if (!isMainThread && workerData?.task === "subfield-circular-whole-manifest-proof") {
  try {
    parentPort.postMessage({ type: "progress", value: { stage: "snapshot-loaded",
      execution: { mode: "captured-source-worker", sourceBindings: snapshotBindings(PROOF_SNAPSHOT) } } });
    const result = prove(workerData.manifestPath, workerData.rung, workerData.phase,
      (value) => parentPort.postMessage({ type: "progress", value }));
    parentPort.postMessage({ type: "complete", value: result });
  } catch (error) { parentPort.postMessage({ type: "failure", message: error.message }); }
} else if (isMainThread && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  cli().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}
