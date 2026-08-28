import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, openSync, readFileSync, readSync, realpathSync } from "node:fs";
import path from "node:path";

export const ABC_PHASE_SCHEMA = "braid-program/abc-enclosed-root-phase-reduction.v1";
export const ABC_SUMMARY_SCHEMA = "braid-program/abc-enclosed-root-summary-reduction.v1";
export const ABC_REDUCER_PATH = "src/prescribed-path-analysis/ABCEnclosedRootLedgerReducer.mjs";
export const ABC_CLI_PATH = "scripts/eom/reduce-abc-enclosed-root-ledger.mjs";
export const ABC_CANDIDATES = Object.freeze(["a1-1", "a1-2", "a1-4", "a2", "a3-1", "a3-2", "a3-4", "b1-1", "b1-2", "b1-3", "c1", "c2", "c3", "c4", "c5", "c6"]);
export const ABC_REFERENCES = Object.freeze([
  ["circular-core", "src/prescribed-path-analysis/CircularHistoryConformance.mjs", "d5bf2aa286c28cc715d4903b35c85f5327966fd7a4fb5e7dd49e985298c600c9"],
  ["integer-primitive", "scripts/eom/derive-abc-subfield-root-reference.mjs", "2c0242d36ca47f5fc53077b0baa3db90aa5e37a97a4b6089bdaa4b86fcbfdbee"],
  ["root-reference", ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/abc-root-reference-20260827-v1.json", "c74bad1d7c5aeed4c9bb326ff711f87833ba43e39236bbc920afb2f375dc7e08"],
  ["budget-cli", "scripts/eom/derive-abc-circular-history-budget.mjs", "f20e16a1098706935df12be7e1b034fca16d64b927642f21b740465238ce0816"],
  ["construction-budget", ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/abc-circular-history-budget-20260827-v1.json", "df1b1254c867b928dac595eada4dc1f197fa2e23d2451efb114eb41de495c74a"],
  ["pilot-predeclaration", "reference/priorities/braid-program/evidence/2026-08-27-abc-h3-pilot-predeclaration.md", "886be366bf4051ecb0339930631ca81b0a85af016ed07a24f3bf0216854fef0c"],
  ["source-manifest", "reference/priorities/braid-program/campaigns/parallel-agent-braid-search.v1.json", "739eb4706ae1be9d427c1a643419c7e5d5455fe85a26ad5d6e490bb114d411ee"],
  ["whole-manifest-verifier", "scripts/eom/verify-abc-circular-history.mjs", "b213094bb38c73d291615042df27e8feac6711c8a7958b21688fc7414208630d"],
].map(([id, relative, sha256]) => Object.freeze({ id, path: relative, sha256 })));
const SUBJECT_PATH = "src/eom/native/eom_abc_enclosed_root_cli.cpp";
const SUBJECT_SHA = "58f62a47bde4688708e2e2c3b10de32a123aa24b69b9d563878e280191174f7e";
const CMAKE_SHA = "e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd";
const API_PINS = Object.freeze({
  "src/eom/src/History.cpp": "cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5",
  "src/eom/src/Interval.cpp": "5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5",
  "src/eom/include/architrino/eom/History.hpp": "0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3",
  "src/eom/include/architrino/eom/Interval.hpp": "880a98273244c65f85ebcce2e08026a177c4af633633b8e29078948b54143dd9",
});
const PX = "0.0000000000072759576141834259033203125", PV = "0.0000002384185791015625";
const Q = 10n ** 60n, U_DEN = 2n ** 53n;
const abs = (n) => n < 0n ? -n : n;
const min = (a, b) => a < b ? a : b, max = (a, b) => a > b ? a : b;
const fail = (message) => { throw new Error(`ABC ledger rejected: ${message}`); };
export const abcSha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const hashToken = (value) => typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function keys(value, fields, label) {
  if (!isObject(value) || Object.keys(value).length !== fields.length || fields.some((name) => !Object.hasOwn(value, name))) fail(`${label} fields differ`);
}
function finite(value, label) { if (typeof value !== "number" || !Number.isFinite(value) || value < 0) fail(`${label} must be finite and nonnegative`); }
function integer(value, label) { if (!Number.isSafeInteger(value) || value < 0) fail(`${label} must be a nonnegative integer`); }

export function abcExactDecimal(token) {
  if (typeof token !== "string" || token.length > 1024) fail("bounded exact decimal string required");
  const m = /^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/u.exec(token);
  if (!m) fail("invalid exact decimal token");
  const exponent = Number(m[4] ?? 0) - (m[3]?.length ?? 0);
  if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > 2000) fail("decimal exponent out of bounds");
  const n = (m[1] === "-" ? -1n : 1n) * BigInt(m[2] + (m[3] ?? ""));
  return exponent >= 0 ? { n: n * 10n ** BigInt(exponent), d: 1n } : { n, d: 10n ** BigInt(-exponent) };
}
const compare = (a, b) => (a.n * b.d < b.n * a.d ? -1 : a.n * b.d > b.n * a.d ? 1 : 0);
const ratSub = (a, b) => ({ n: a.n * b.d - b.n * a.d, d: a.d * b.d });
const ratAdd = (a, b) => ({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
const zero = { n: 0n, d: 1n }, one = { n: 1n, d: 1n };
const equalDecimal = (a, b) => compare(abcExactDecimal(a), abcExactDecimal(b)) === 0;
const floorDiv = (a, b) => a / b - (a < 0n && a % b !== 0n ? 1n : 0n);
const ceilDiv = (a, b) => -floorDiv(-a, b);
function fixed(token) { const r = abcExactDecimal(token); if ((r.n * Q) % r.d) fail("token is not an exact 60-decimal value"); return r.n * Q / r.d; }
function fixedText(value) { const digits = abs(value).toString().padStart(61, "0"); const body = `${digits.slice(0, -60)}.${digits.slice(-60)}`.replace(/0+$/u, "").replace(/\.$/u, ""); return `${value < 0n ? "-" : ""}${body}`; }

function bits(number) { const data = new DataView(new ArrayBuffer(8)); data.setFloat64(0, number); return data.getBigUint64(0); }
function fromBits(value) { const data = new DataView(new ArrayBuffer(8)); data.setBigUint64(0, value); return data.getFloat64(0); }
function adjacent(value, direction) {
  if (value === 0) return direction > 0 ? Number.MIN_VALUE : -Number.MIN_VALUE;
  const result = fromBits(bits(value) + BigInt(value > 0 ? direction : -direction));
  if (!Number.isFinite(result)) fail("binary64 endpoint overflow");
  return result;
}
function exactDouble(value) {
  if (!Number.isFinite(value)) fail("finite binary64 value required");
  const b = bits(value), e = Number((b >> 52n) & 2047n), sign = b >> 63n ? -1n : 1n;
  const mantissa = (b & ((1n << 52n) - 1n)) + (e === 0 ? 0n : 1n << 52n);
  const exponent = e === 0 ? -1074 : e - 1023 - 52;
  return exponent >= 0 ? { n: sign * (mantissa << BigInt(exponent)), d: 1n } : { n: sign * mantissa, d: 1n << BigInt(-exponent) };
}
function doubleBox(value) { const r = exactDouble(value); return [floorDiv(r.n * Q, r.d), ceilDiv(r.n * Q, r.d)]; }
function carrier(token) {
  const exact = abcExactDecimal(token), value = Number(token);
  if (!Number.isFinite(value) || (value === 0 && exact.n !== 0n)) fail("unrepresentable nonzero carrier token");
  // Verify nearest/ties-even parsing independently by exact midpoint tests.
  const before = exactDouble(adjacent(value, -1)), after = exactDouble(adjacent(value, 1));
  const center = exactDouble(value), lower = ratAdd(before, center), upper = ratAdd(center, after);
  lower.d *= 2n; upper.d *= 2n;
  const lo = compare(exact, lower), hi = compare(exact, upper);
  if (lo < 0 || hi > 0 || ((lo === 0 || hi === 0) && (bits(value) & 1n))) fail("carrier parser is not nearest/ties-even");
  return value;
}
const point = (n) => [n * Q, n * Q];
function carrierBox(token) { const value = carrier(token); return [doubleBox(adjacent(value, -1))[0], doubleBox(adjacent(value, 1))[1]]; }
function roundBox([lo, hi], multiplier = 4n) {
  const magnitude = max(abs(lo), abs(hi));
  if (magnitude > (1n << 900n) * Q) fail("API interval arithmetic exceeds finite proof domain");
  // For exact z, RN(z) plus one outward adjacent-double step differs by
  // <4u|z|+4*10^-60. Exact fixed-point operations already round outwards;
  // their at-most-one-quantum error is therefore not counted inward here.
  // The additive quantum dominates every binary64 subnormal rounding error.
  const guard = ceilDiv(multiplier * magnitude, U_DEN) + multiplier;
  return [lo - guard, hi + guard];
}
const addBox = (a, b) => roundBox([a[0] + b[0], a[1] + b[1]]);
const subBox = (a, b) => roundBox([a[0] - b[1], a[1] - b[0]]);
function mulBox(a, b) { const products = [a[0]*b[0], a[0]*b[1], a[1]*b[0], a[1]*b[1]]; return roundBox([floorDiv(products.reduce(min), Q), ceilDiv(products.reduce(max), Q)]); }
function ceilSqrt(n) {
  if (n < 0n) fail("nonnegative norm radicand required");
  if (n === 0n) return 0n;
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2));
  for (;;) { const next = (x + n / x) / 2n; if (next >= x) return x*x === n ? x : x + 1n; x = next; }
}

export function abcApiSpeedBox(segment) {
  const a = carrier(segment.tStart), b = carrier(segment.tEnd);
  if (!(a < b)) fail("ordered carrier segment required");
  const time = [doubleBox(adjacent(a, -1))[0], doubleBox(adjacent(b, 1))[1]];
  const local = subBox(time, carrierBox(segment.tStart));
  if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3) fail("three cubic axes required");
  const velocity = segment.coefficients.map((axis, index) => {
    if (!Array.isArray(axis) || axis.length !== 4 || segment.velocityErrors?.[index] !== PV) fail("wrong cubic/error schema");
    const derivative = addBox(mulBox(addBox(mulBox(mulBox(point(3n), carrierBox(axis[3])), local),
      mulBox(point(2n), carrierBox(axis[2]))), local), carrierBox(axis[1]));
    const error = fixed(PV);
    return roundBox([derivative[0] - error, derivative[1] + error]);
  });
  const squares = velocity.map((v) => { const magnitude = max(abs(v[0]), abs(v[1])); return roundBox([0n, ceilDiv(magnitude*magnitude, Q)]); });
  const squared = addBox(addBox(squares[0], squares[1]), squares[2])[1];
  const root = ceilSqrt(max(0n, squared) * Q);
  // RN sqrt followed by TWO nextafter steps, as in Interval.cpp. The wider
  // 8u relative guard and eight quanta also cover the integer sqrt enclosure.
  const normUpper = root + ceilDiv(8n * root, U_DEN) + 8n;
  return { strictlySubField: normUpper < Q, normUpper: fixedText(normUpper),
    velocityBoxes: velocity.map((v) => v.map(fixedText)), authority: "independent-actual-api-box-bound-only" };
}
export function inspectABCRoundingForTests(a,b,operation) {
  const left=carrierBox(a),right=carrierBox(b);
  const result=operation==="add"?addBox(left,right):operation==="subtract"?subBox(left,right):operation==="multiply"?mulBox(left,right):fail("unknown control operation");
  return {accepted:false,testOnly:true,interval:result.map(fixedText)};
}

function regularBytes(filename) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try { const before = fstatSync(fd); if (!before.isFile()) fail("regular file required"); const bytes = readFileSync(fd), after = fstatSync(fd);
    if (before.size !== bytes.length || before.size !== after.size || before.mtimeMs !== after.mtimeMs || before.ctimeMs !== after.ctimeMs) fail("file changed during read"); return bytes;
  } finally { closeSync(fd); }
}
function hashRegular(filename) {
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK);
  try { const before=fstatSync(fd);if(!before.isFile())fail("regular file required");const hash=createHash("sha256"),chunk=Buffer.allocUnsafe(65536);let size=0;
    for(;;){const count=readSync(fd,chunk,0,chunk.length,null);if(!count)break;size+=count;hash.update(chunk.subarray(0,count));}
    const after=fstatSync(fd);if(size!==before.size||before.size!==after.size||before.mtimeMs!==after.mtimeMs||before.ctimeMs!==after.ctimeMs)fail("binding changed during hash");
    return {sha256:hash.digest("hex"),bytes:size};
  }finally{closeSync(fd);}
}
export function abcOriginalJson(bytes) {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes), parsed = JSON.parse(text);
  let at = 0;
  const whitespace = () => { while (/\s/u.test(text[at] ?? "") && at < text.length) at++; };
  function string() { const begin = at++; while (at < text.length) { const c = text[at++]; if (c === "\\") at++; else if (c === '"') return JSON.parse(text.slice(begin, at)); } fail("unterminated JSON string"); }
  function value(depth = 0) { if (depth > 32) fail("JSON nesting exceeds contract"); whitespace();
    if (text[at] === '"') { string(); return; }
    if (text[at] === "{") { at++; whitespace(); const seen = new Set(); if (text[at] === "}") { at++; return; }
      for (;;) { whitespace(); const key = string(); if (seen.has(key)) fail(`duplicate JSON key ${key}`); seen.add(key); whitespace(); at++; value(depth+1); whitespace(); if (text[at++] === "}") return; } }
    if (text[at] === "[") { at++; whitespace(); if (text[at] === "]") { at++; return; } for (;;) { value(depth+1); whitespace(); if (text[at++] === "]") return; } }
    while (at < text.length && !/[\s,}\]]/u.test(text[at])) at++;
  }
  value(); return parsed;
}

function fingerprint(segments) {
  let state = 14695981039346656037n;
  const append = (token) => { const bytes = Buffer.from(token); for (const byte of Buffer.concat([Buffer.from(`${bytes.length}:`), bytes])) state = ((state ^ BigInt(byte)) * 1099511628211n) & ((1n << 64n) - 1n); };
  append("eom_history_segment_chain/v1");
  for (const segment of segments) for (const token of [segment.tStart, segment.tEnd, ...segment.coefficients.flat(), ...segment.positionErrors, ...segment.velocityErrors]) append(token);
  return `fnv1a64-chain-v1:${state.toString(16).padStart(16, "0")}`;
}

function fileContext(repoRoot) {
  const root = realpathSync(repoRoot), captured = new Map();
  const capture=(filename,identity)=>{const absolute=path.resolve(filename);if(captured.has(absolute)&&!same(captured.get(absolute),identity))fail(`bound bytes changed: ${filename}`);captured.set(absolute,identity);};
  const read = (filename) => {const bytes=regularBytes(filename);capture(filename,{sha256:abcSha256(bytes),bytes:bytes.length});return bytes;};
  const inspect=(filename)=>{const identity=hashRegular(filename);capture(filename,identity);return identity;};
  const relative = (name) => { if (typeof name !== "string" || path.isAbsolute(name) || name.split(/[\\/]/u).includes("..")) fail("repository-relative path required"); return path.join(root, name); };
  const bound = (binding) => { if (!hashToken(binding.sha256)) fail("invalid binding hash"); const bytes = read(relative(binding.path)); if (abcSha256(bytes) !== binding.sha256) fail(`bound bytes changed: ${binding.path}`); return bytes; };
  const recheck = () => { for (const [filename, original] of captured) if (!same(hashRegular(filename),original)) fail(`input changed during ledger check: ${filename}`); };
  return { root, read, inspect, relative, bound, recheck, captured };
}

function verifyBuild(bytes, expectedHash, files) {
  if (!hashToken(expectedHash) || abcSha256(bytes) !== expectedHash) fail("build receipt original-byte hash mismatch");
  const build = abcOriginalJson(bytes);
  if (build.schema !== "braid-program/abc-enclosed-root-build.v1" || build.status !== "build-recorded-pending-independent-review" ||
      build.authority !== "recorded-build-identity-pending-independent-review" || build.rootExecutionAuthorized !== false ||
      build.h3EvidenceEligible !== false || build.historiesPrepared !== false || build.rootCalls !== 0) fail("build receipt authority differs");
  const all = new Map();
  function verify(binding) {
    if (!isObject(binding) || typeof binding.path !== "string" || !hashToken(binding.sha256) || !Number.isSafeInteger(binding.bytes) || binding.bytes < 0) fail("invalid build file binding");
    const filename = path.isAbsolute(binding.path) ? binding.path : files.relative(binding.path);
    const current = files.inspect(filename);
    if (realpathSync(filename) !== binding.realPath || current.bytes !== binding.bytes || current.sha256 !== binding.sha256) fail(`build file changed: ${binding.path}`);
    if (all.has(binding.realPath) && all.get(binding.realPath).sha256 !== binding.sha256) fail("conflicting build file bindings");
    all.set(binding.realPath, binding);
  }
  for (const group of ["sources", "references", "tools", "headerDependencies", "externalLibraries"]) {
    const before = build[`${group}Before`], after = build[`${group}After`];
    if (!Array.isArray(before) || before.length === 0 || !same(before, after)) fail(`build ${group} snapshot mismatch`);
    const seen = new Set(); for (const binding of before) { if (seen.has(binding.path)) fail(`duplicate build ${group} path`); seen.add(binding.path); verify(binding); }
  }
  for (const field of ["executable", "library", "cmakeCache", "compileCommands", "manualDependencyFile"]) verify(build.built?.[field]);
  if (!Array.isArray(build.stages) || build.stages.length < 3) fail("incomplete build stages");
  for(const required of ["configure","librarybuild","adapterlink"])if(build.stages.filter(stage=>stage.stage===required).length!==1)fail(`missing unique ${required} build stage`);
  for (const stage of build.stages) { if (stage.code !== 0 || stage.signal !== null || stage.timedOut !== false || stage.interrupted !== false || stage.descendantsAfterClose !== false || stage.processGroupClosed !== true) fail("build stage did not close successfully"); verify(stage.log); }
  for (const [relative, expected] of Object.entries({ [SUBJECT_PATH]: SUBJECT_SHA, "src/eom/CMakeLists.txt": CMAKE_SHA, ...API_PINS })) {
    const binding = all.get(realpathSync(files.relative(relative)));
    if (!binding || binding.sha256 !== expected) fail(`build misses frozen source ${relative}`);
  }
  for (const required of ["src/eom/include/architrino/eom/ExactPairBatch.hpp", "src/eom/src/ExactPairBatch.cpp"]) if (!all.has(realpathSync(files.relative(required)))) fail("build misses exact pair API");
  return build;
}

const MANIFEST_KEYS = ["schema", "manifestId", "candidateId", "sourceBinding", "normalizedFieldSpeed", "receptionTime", "retainedInterval", "members"];
const MEMBER_KEYS = ["index", "constituentId", "worldlineId", "polarity", "historyId", "historyFingerprint", "segments"];
const SEGMENT_KEYS = ["index", "tStart", "tEnd", "coefficients", "positionErrors", "velocityErrors", "parsedEndpointBits"];

export async function prepareABCPhaseLedgerContext(options, progress = () => {}) {
  keys(options, ["repoRoot", "historyManifest", "conformance", "conformanceSha256", "buildReceipt", "buildReceiptSha256"], "phase options");
  options=Object.freeze({...options});
  const files = fileContext(options.repoRoot), refs = new Map(ABC_REFERENCES.map((binding) => [binding.id, files.bound(binding)]));
  const buildBytes = files.read(options.buildReceipt), build = verifyBuild(buildBytes, options.buildReceiptSha256, files);
  const manifestBytes = files.read(options.historyManifest), manifest = abcOriginalJson(manifestBytes);
  keys(manifest, MANIFEST_KEYS, "manifest");
  if (manifest.schema !== "braid-program/abc-circular-history-manifest.v1" || manifest.normalizedFieldSpeed !== "1") fail("manifest schema or field speed differs");
  const proofBytes = files.read(options.conformance);
  if (!hashToken(options.conformanceSha256) || abcSha256(proofBytes) !== options.conformanceSha256) fail("conformance original-byte hash mismatch");
  const proof = abcOriginalJson(proofBytes), root = abcOriginalJson(refs.get("root-reference"));
  if (root.accepted !== true || root.normalizedFieldSpeed !== "1" || !Array.isArray(root.results) || root.results.length !== 16 || root.results.some((row, i) => row.id !== ABC_CANDIDATES[i] || row.passed !== true)) fail("frozen source census differs");
  const sourceRow = root.results.find((row) => row.id === manifest.candidateId);
  if (!sourceRow || !same(manifest.sourceBinding, { path: sourceRow.sourcePath, sha256: sourceRow.sourceSha256 })) fail("candidate source binding differs");
  const sourceBinding = { id: "candidate-source", path: sourceRow.sourcePath, sha256: sourceRow.sourceSha256 };
  const source = abcOriginalJson(files.bound(sourceBinding));
  const rung = proof.rung, phase = proof.phase;
  if (![2, 8, 32, 128].includes(rung) || !Number.isSafeInteger(phase) || phase < 0 || phase >= rung) fail("invalid phase/rung");
  const reception = fixedText(4n*Q + 4n*Q*BigInt(phase)/BigInt(rung)), lower = fixedText(fixed(reception)-2n*Q);
  const manifestId = `abc-circular-history/v1:${manifest.candidateId}:T=${reception}`;
  if (manifest.manifestId !== manifestId || manifest.receptionTime !== reception || !same(manifest.retainedInterval, [lower, reception])) fail("manifest reception/window identity differs");
  if (proof.schema !== "braid-program/abc-circular-history-conformance.v1" || proof.accepted !== true || proof.actualCarrierValidated !== true || proof.h3EvidenceEligible !== false ||
      proof.authority !== "source-bound-whole-manifest-analytic-conformance-only" || proof.manifestSha256 !== abcSha256(manifestBytes) || proof.manifestId !== manifestId ||
      proof.candidateId !== manifest.candidateId || proof.receptionTime !== reception || proof.normalizedFieldSpeed !== "1" || !same(proof.retainedInterval, manifest.retainedInterval)) fail("conformance does not accept exact manifest");
  const bindings = [...ABC_REFERENCES.slice(0, 7), sourceBinding, ABC_REFERENCES[7]];
  if (!same(proof.bindings, bindings) || proof.execution?.mode !== "captured-source-worker" ||
      !same(proof.execution.sourceBindings, [ABC_REFERENCES[0], ABC_REFERENCES[1], ABC_REFERENCES[7]])) fail("conformance instrument bindings differ");
  const order = source.relationships?.sourceOrder;
  if (![6, 12].includes(sourceRow.memberCount) || !Array.isArray(order) || order.length !== sourceRow.memberCount || !Array.isArray(manifest.members) || manifest.members.length !== order.length ||
      proof.memberCount !== order.length || proof.segmentCount !== order.length*1000 || !Array.isArray(proof.members) || proof.members.length !== order.length) fail("incomplete member census");
  const speedBounds = [], ids = new Set(), histories = new Set();
  for (const [index, member] of manifest.members.entries()) {
    keys(member, MEMBER_KEYS, "manifest member");
    const constituent = source.constituents.find((row) => row.id === order[index]), worldline = source.worldlines.find((row) => row.constituentId === order[index]);
    if (!constituent || !worldline || member.index !== index || member.constituentId !== order[index] || member.worldlineId !== worldline.id || member.polarity !== constituent.polarity ||
        member.historyId !== `${manifestId}/${worldline.id}` || ids.has(member.constituentId) || histories.has(member.historyFingerprint)) fail("member identity differs");
    ids.add(member.constituentId); histories.add(member.historyFingerprint);
    if (!Array.isArray(member.segments) || member.segments.length !== 1000) fail("incomplete segment census");
    let speed = 0n; const speedDigest = createHash("sha256");
    for (const [segmentIndex, segment] of member.segments.entries()) {
      keys(segment, SEGMENT_KEYS, "manifest segment");
      const a = fixedText(fixed(lower)+BigInt(segmentIndex)*Q/500n), b = fixedText(fixed(lower)+BigInt(segmentIndex+1)*Q/500n);
      if (segment.index !== segmentIndex || segment.tStart !== a || segment.tEnd !== b || !same(segment.positionErrors, [PX,PX,PX]) || !same(segment.velocityErrors, [PV,PV,PV]) ||
          !same(segment.parsedEndpointBits, [bits(carrier(a)), bits(carrier(b))].map((v) => v.toString(16).padStart(16, "0")))) fail("exact segment grid/errors/bits differ");
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3 || segment.coefficients.some((axis) => !Array.isArray(axis) || axis.length !== 4)) fail("cubic shape differs");
      for (const token of segment.coefficients.flat()) { fixed(token); carrier(token); }
      const checked = abcApiSpeedBox(segment);
      if (!checked.strictlySubField) fail(`actual inflated API speed box is not sub-field: member ${index}, segment ${segmentIndex}`);
      speed = max(speed, fixed(checked.normUpper)); speedDigest.update(`${JSON.stringify(checked)}\n`);
    }
    if (fingerprint(member.segments) !== member.historyFingerprint) fail("actual history fingerprint mismatch");
    const memberProof = proof.members[index];
    for (const field of ["index", "constituentId", "worldlineId", "polarity", "historyId", "historyFingerprint"]) if (memberProof[field] !== member[field]) fail("proof member identity differs");
    if (memberProof.segmentCount !== 1000 || !hashToken(memberProof.segmentProofSha256)) fail("incomplete member proof");
    speedBounds.push({ index, normUpper: fixedText(speed), segmentCount: 1000, proofSha256: speedDigest.digest("hex") });
    progress({ stage: "independent-api-speed-box", candidateId: manifest.candidateId, completedMembers: index+1, memberCount: order.length });
  }
  const state = { files, options, manifestBytes, manifest, proofBytes, proof, sourceRow, buildBytes, build, speedBounds, rung, phase, reception, lower, manifestId, sourceBinding };
  const freeze=value=>{if(Array.isArray(value)||isObject(value)){for(const item of Object.values(value))freeze(item);Object.freeze(value);}return value;};
  for(const value of [manifest,proof,sourceRow,build,speedBounds,sourceBinding])freeze(value);
  let nextRow = 0, rejected=false;
  return { ...state, checkRowBytes(bytes) { if(rejected)fail("phase checker remains stopped after its first failed row");try{const checked = checkABCRow(abcOriginalJson(bytes), state, nextRow); nextRow++; return { accepted: false, rowConformant: true, h3EvidenceEligible: false, ...checked };}catch(error){rejected=true;throw error;} },
    checkedRows: () => nextRow, recheck: files.recheck };
}

const ROW_KEYS = ["schema", "candidateId", "rung", "phase", "manifestId", "historyManifestSha256", "conformanceSha256", "sourceBinding", "receiverIndex", "transmitterIndex", "receiverConstituentId", "transmitterConstituentId", "receiverWorldlineId", "transmitterWorldlineId", "receiverPolarity", "transmitterPolarity", "receiverInflatedSpeedUpper", "transmitterInflatedSpeedUpper", "request", "h3EvidenceEligible", "certificate", "pairWallSeconds", "adapterFailureCode", "rowPassed"];
const REQUEST_KEYS = ["rowId", "receiverHistoryId", "transmitterHistoryId", "receiverHistoryFingerprint", "transmitterHistoryFingerprint", "receiverPathId", "sourcePathId", "receptionTime", "searchLower", "searchUpper", "fieldSpeed", "rootTolerance", "maxDepth", "maxCells", "initialMpfrBits", "maximumMpfrBits", "forcePrecisionEscalation", "deferPrecisionEscalation", "warmStart", "jointHistory", "workerCount"];
const CERT_STRINGS = ["schema", "row_id", "receiver_history_id", "transmitter_history_id", "receiver_history_fingerprint", "transmitter_history_fingerprint", "reception_time", "searched_lower", "searched_upper", "field_speed", "root_tolerance", "status", "failure_code", "diagnostic_detail", "stable_negative_prefix_upper", "difficult_cell_lower", "difficult_cell_upper", "difficult_point", "difficult_point_residual_lower", "difficult_point_residual_upper", "difficult_transmitter_factor_lower", "difficult_transmitter_factor_upper", "difficult_receiver_factor_lower", "difficult_receiver_factor_upper"];
const CERT_BOOLEANS = ["root_free_complement", "memory_boundary_contact", "coincident_endpoint_excluded", "precision_escalated", "stable_negative_prefix_certified", "has_difficult_cell"];
const CERT_INTEGERS = ["achieved_precision_bits", "visited_cells", "excluded_cells", "difficult_cells", "mpfr_attempt_count", "mpfr_escalation_attempt_count", "warm_excluded_cells", "reevaluated_cells", "incremental_prefix_reuse_count", "difficult_source_segment_index"];
const CERT_TIMINGS = ["binary64_worker_wall_seconds", "binary64_setup_wall_seconds", "binary64_warm_start_wall_seconds", "binary64_cell_setup_wall_seconds", "binary64_cell_classification_wall_seconds", "binary64_finalization_wall_seconds", "mpfr_worker_wall_seconds", "mpfr_escalation_worker_wall_seconds", "warm_residual_drift_upper"];
const ROOT_KEYS = ["lower", "upper", "transmitter_factor_lower", "transmitter_factor_upper", "receiver_factor_lower", "receiver_factor_upper", "transmitter_factor_sign", "transmitter_segment_indices", "precision_route", "precision_bits"];
const CELL_KEYS = ["transmitter_segment_index", "lower", "upper", "residual_lower", "residual_upper", "receiver_factor_lower", "receiver_factor_upper", "lower_value", "upper_value", "residual_lower_value", "residual_upper_value", "numeric_values_valid"];
function boundaryCompare(a, b, binary64) { const result = compare(abcExactDecimal(a), abcExactDecimal(b)); return binary64 && Number.isFinite(Number(a)) && Number(a) === Number(b) ? 0 : result; }
function orderedInterval(lower, upper) { const a = abcExactDecimal(lower), b = abcExactDecimal(upper); if (compare(a, b) > 0) fail("reversed exact interval"); return [a, b]; }

function checkABCRow(row, context, rowIndex) {
  keys(row, ROW_KEYS, "raw row");
  const { manifest, proof, sourceRow, speedBounds, rung, phase, reception, lower, manifestId } = context;
  const count = manifest.members.length, receiverIndex = Math.floor(rowIndex/count), transmitterIndex = rowIndex%count;
  if (rowIndex >= count*count) fail("extra ordered-pair row");
  const receiver = manifest.members[receiverIndex], transmitter = manifest.members[transmitterIndex];
  if (row.schema !== "braid-program/abc-enclosed-root-row.v1" || row.candidateId !== manifest.candidateId || row.rung !== rung || row.phase !== phase || row.manifestId !== manifestId ||
      row.historyManifestSha256 !== proof.manifestSha256 || row.conformanceSha256 !== context.options.conformanceSha256 || !same(row.sourceBinding, manifest.sourceBinding) ||
      row.receiverIndex !== receiverIndex || row.transmitterIndex !== transmitterIndex || row.h3EvidenceEligible !== false || row.rowPassed !== true || row.adapterFailureCode !== "") fail("row identity, order, authority or adapter result differs");
  for (const [side, member] of [["receiver", receiver], ["transmitter", transmitter]]) {
    for (const [suffix, field] of [["ConstituentId", "constituentId"], ["WorldlineId", "worldlineId"], ["Polarity", "polarity"]]) if (row[side+suffix] !== member[field]) fail("row member identity differs");
    finite(row[side+"InflatedSpeedUpper"], "subject speed diagnostic");
    // Subject diagnostics are deliberately not proof inputs.
    if (compare(abcExactDecimal(speedBounds[member.index].normUpper), one) >= 0) fail("independently bounded actual speed is not sub-field");
  }
  finite(row.pairWallSeconds, "pair wall time");
  const request = row.request; keys(request, REQUEST_KEYS, "request");
  const rowId = `${manifestId}/${receiverIndex}/${transmitterIndex}`;
  const expectedRequest = { rowId, receiverHistoryId: receiver.historyId, transmitterHistoryId: transmitter.historyId,
    receiverHistoryFingerprint: receiver.historyFingerprint, transmitterHistoryFingerprint: transmitter.historyFingerprint,
    receiverPathId: "", sourcePathId: "", receptionTime: reception, searchLower: lower, searchUpper: reception,
    fieldSpeed: "1", rootTolerance: "1e-8", maxDepth: 192, maxCells: 300000, initialMpfrBits: 128,
    maximumMpfrBits: 512, forcePrecisionEscalation: false, deferPrecisionEscalation: false, warmStart: false, jointHistory: false, workerCount: 1 };
  if (Object.entries(expectedRequest).some(([key, value]) => request[key] !== value)) fail("request differs from fixed one-worker controls");
  const c = row.certificate;
  keys(c, [...CERT_STRINGS, ...CERT_BOOLEANS, ...CERT_INTEGERS, ...CERT_TIMINGS, "difficult_lower_sign", "difficult_upper_sign", "roots", "root_free_cells"], "certificate");
  for (const field of CERT_STRINGS) if (typeof c[field] !== "string") fail(`certificate ${field} is not a string`);
  for (const field of CERT_BOOLEANS) if (typeof c[field] !== "boolean") fail(`certificate ${field} is not boolean`);
  for (const field of CERT_INTEGERS) integer(c[field], field);
  for (const field of CERT_TIMINGS) finite(c[field], field);
  if (c.schema !== "eom_native_exact_pair_certificate/v1" || c.row_id !== rowId || c.receiver_history_id !== receiver.historyId || c.transmitter_history_id !== transmitter.historyId ||
      c.receiver_history_fingerprint !== receiver.historyFingerprint || c.transmitter_history_fingerprint !== transmitter.historyFingerprint ||
      !equalDecimal(c.reception_time, reception) || !equalDecimal(c.searched_lower, lower) || !equalDecimal(c.searched_upper, reception) || !equalDecimal(c.field_speed, "1") || !equalDecimal(c.root_tolerance, "1e-8")) fail("certificate identity or exact controls differ");
  if (c.status !== "certified_complete" || c.failure_code !== "" || !c.root_free_complement || c.memory_boundary_contact || c.visited_cells > 300000 || c.difficult_cells !== 0 || c.has_difficult_cell) fail("certificate is incomplete or contacts a limit");
  if (![53,128,256,512].includes(c.achieved_precision_bits)) fail("invalid precision ladder");
  const attempts = c.achieved_precision_bits === 53 ? 0 : Math.log2(c.achieved_precision_bits/128)+1;
  if (c.precision_escalated !== (attempts>0) || c.mpfr_attempt_count !== attempts || c.mpfr_escalation_attempt_count !== Math.max(0,attempts-1)) fail("precision provenance differs");
  if (c.warm_excluded_cells !== 0 || c.incremental_prefix_reuse_count !== 0) fail("disabled warm-start route was used");
  if (c.difficult_source_segment_index !== 0 || c.difficult_lower_sign !== 0 || c.difficult_upper_sign !== 0 ||
      CERT_STRINGS.filter((field) => field.startsWith("difficult_")).some((field) => c[field] !== "")) fail("unresolved difficult-cell diagnostics");
  if (c.stable_negative_prefix_certified && (boundaryCompare(c.stable_negative_prefix_upper, lower, true)<0 || boundaryCompare(c.stable_negative_prefix_upper, reception, true)>0)) fail("stable prefix outside search window");
  if (!Array.isArray(c.roots) || !Array.isArray(c.root_free_cells)) fail("root inventory/cache must be arrays");
  const self = receiverIndex === transmitterIndex;
  if (self ? c.roots.length !== 0 || !c.coincident_endpoint_excluded : c.roots.length !== 1 || c.coincident_endpoint_excluded) fail("ordinary/self root inventory differs from theorem");
  if (self && (receiver.historyId !== transmitter.historyId || receiver.historyFingerprint !== transmitter.historyFingerprint)) fail("self history identity differs");
  const analyticLower = ratSub(one, abcExactDecimal(sourceRow.vUpper)), analyticUpper = ratAdd(one, abcExactDecimal(sourceRow.vUpper));
  const roots = c.roots.map((root) => {
    keys(root, ROOT_KEYS, "ordinary root"); const [a,b] = orderedInterval(root.lower, root.upper);
    if (compare(ratSub(b,a), abcExactDecimal("1e-8"))>0 || compare(a,abcExactDecimal(lower))<=0 || compare(b,abcExactDecimal(reception))>=0) fail("root bracket lacks positive interior delay or exceeds tolerance");
    for (const prefix of ["transmitter", "receiver"]) { const [lo,hi] = orderedInterval(root[`${prefix}_factor_lower`],root[`${prefix}_factor_upper`]);
      if (compare(lo,zero)<=0 || compare(hi,analyticLower)<0 || compare(lo,analyticUpper)>0) fail("root factor nonpositive or disjoint from analytic interval"); }
    if (root.transmitter_factor_sign !== 1 || root.precision_bits !== c.achieved_precision_bits || root.precision_route !== (c.achieved_precision_bits===53 ? "binary64_outward" : "mpfr_directed_interval")) fail("root factor sign or precision provenance differs");
    const indices = root.transmitter_segment_indices;
    if (!Array.isArray(indices) || indices.length === 0 || indices.some((index,i) => !Number.isSafeInteger(index) || index<0 || index>=1000 || (i>0 && index<=indices[i-1]))) fail("invalid root segment inventory");
    let cursor = root.lower;
    for (const index of indices) { const segment = transmitter.segments[index];
      if(!segment||boundaryCompare(segment.tEnd,root.lower,c.achieved_precision_bits===53)<0||boundaryCompare(segment.tStart,root.upper,c.achieved_precision_bits===53)>0)fail("root cites a nonintersecting segment");
      if (boundaryCompare(segment.tStart,cursor,c.achieved_precision_bits===53)>0) fail("root cited segments have a coverage gap");
      if (boundaryCompare(segment.tEnd,cursor,c.achieved_precision_bits===53)>0) cursor=segment.tEnd; }
    if (boundaryCompare(cursor,root.upper,c.achieved_precision_bits===53)<0) fail("root is not covered by cited segments");
    return { lower:root.lower, upper:root.upper, transmitterFactor:[root.transmitter_factor_lower,root.transmitter_factor_upper], receiverFactor:[root.receiver_factor_lower,root.receiver_factor_upper] };
  });
  // A legitimate generic-self/MPFR complement may have no cached cells. When
  // cells exist, validate every one; do not infer a missing explicit tiling.
  for (const cell of c.root_free_cells) {
    keys(cell,CELL_KEYS,"root-free cache cell"); integer(cell.transmitter_segment_index,"cache segment index");
    if (cell.transmitter_segment_index>=1000 || compare(abcExactDecimal(cell.lower),abcExactDecimal(cell.upper))>=0 || boundaryCompare(cell.lower,lower,true)<0 || boundaryCompare(cell.upper,reception,true)>0) fail("invalid root-free cache domain");
    const segment=transmitter.segments[cell.transmitter_segment_index];
    if(!segment)fail("cache cites a missing segment");
    if (boundaryCompare(cell.lower,segment.tStart,true)<0 || boundaryCompare(cell.upper,segment.tEnd,true)>0) fail("cache cell outside cited segment");
    const [lo,hi]=orderedInterval(cell.residual_lower,cell.residual_upper); if (compare(lo,zero)<=0 && compare(hi,zero)>=0) fail("cache residual contains zero");
    orderedInterval(cell.receiver_factor_lower,cell.receiver_factor_upper);
    if (typeof cell.numeric_values_valid!=="boolean") fail("cache mirror flag must be boolean");
    for (const [token, numeric] of [["lower","lower_value"],["upper","upper_value"],["residual_lower","residual_lower_value"],["residual_upper","residual_upper_value"]]) {
      if (typeof cell[numeric]!=="number" || !Number.isFinite(cell[numeric]) || (cell.numeric_values_valid && cell[numeric]!==Number(cell[token]))) fail("invalid cache numeric mirror"); }
  }
  return { receiverIndex,transmitterIndex,rowId,certificateCanonicalSha256:abcSha256(Buffer.from(JSON.stringify(c))), roots,
    achievedPrecisionBits:c.achieved_precision_bits,visitedCells:c.visited_cells,rootFreeCellCount:c.root_free_cells.length,pairWallSeconds:row.pairWallSeconds };
}

// Abstract row controls have no source/file authority and cannot produce an
// accepted phase. The production context is built only by the function above.
export function inspectABCRowForTests(row, context, index) {
  return { accepted:false,h3EvidenceEligible:false,testOnly:true,...checkABCRow(row,context,index) };
}

async function streamRows(filename, consume) {
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK), before=fstatSync(fd);
  if (!before.isFile()) { closeSync(fd); fail("rows input must be a regular file"); }
  const hash=createHash("sha256");
  let pieces=[],length=0,bytes=0,rows=0;
  try { for (;;) {const buffer=Buffer.allocUnsafe(65536),count=readSync(fd,buffer,0,buffer.length,null);if(count===0)break;const chunk=buffer.subarray(0,count);hash.update(chunk);bytes+=chunk.length; let begin=0;
    for (let at=0;at<chunk.length;at++) if (chunk[at]===10) { pieces.push(chunk.subarray(begin,at+1));length+=at+1-begin;
      const line=Buffer.concat(pieces,length); if(line.length===1) fail("empty NDJSON row"); consume(line,rows++);pieces=[];length=0;begin=at+1; }
    if(begin<chunk.length) {pieces.push(chunk.subarray(begin));length+=chunk.length-begin;} }
    if(length!==0) fail("final raw row lacks flushed newline"); const after=fstatSync(fd);
    if(before.size!==bytes || after.size!==before.size || before.mtimeMs!==after.mtimeMs || before.ctimeMs!==after.ctimeMs) fail("rows file changed during streaming read");
    return {path:path.resolve(filename),sha256:hash.digest("hex"),bytes,rowCount:rows};
  } finally {closeSync(fd);}
}
export async function inspectABCNDJSONForTests(filename) {
  return {accepted:false,testOnly:true,raw:await streamRows(filename,bytes=>abcOriginalJson(bytes))};
}

export async function reduceABCPhaseSnapshot(snapshot,progress=()=>{}) {
  if (!snapshot || !(snapshot.reducerBytes instanceof Uint8Array) || import.meta.url!==`data:text/javascript;base64,${Buffer.from(snapshot.reducerBytes).toString("base64")}`) fail("accepted reduction requires captured executing reducer bytes");
  const {options,rowsFile}=snapshot, context=await prepareABCPhaseLedgerContext(options,progress);
  if (!context.files.read(context.files.relative(ABC_REDUCER_PATH)).equals(Buffer.from(snapshot.reducerBytes)) ||
      !context.files.read(context.files.relative(ABC_CLI_PATH)).equals(Buffer.from(snapshot.cliBytes))) fail("executed reducer/CLI snapshot changed");
  const rows=[];
  const rawRows=await streamRows(rowsFile,(bytes,index)=>{ const summary=context.checkRowBytes(bytes); delete summary.accepted;delete summary.rowConformant;delete summary.h3EvidenceEligible;
    summary.originalRowSha256=abcSha256(bytes);rows.push(summary); progress({stage:"row-checked",checkedRows:index+1,totalRows:context.manifest.members.length**2}); });
  if(rows.length!==context.manifest.members.length**2) fail("complete ordered-pair census required");
  context.recheck();
  // A second streaming hash binds the unchanged raw rows without materializing
  // an all-certificate string or discarding any root-free cache entries.
  const finalRows=await streamRows(rowsFile,()=>{}); if(!same(rawRows,finalRows)) fail("raw rows changed before publication");
  return {schema:ABC_PHASE_SCHEMA,accepted:true,h3EvidenceEligible:false,authority:"source-byte-build-bound-independent-phase-ledger-only",
    candidateId:context.manifest.candidateId,rung:context.rung,phase:context.phase,receptionTime:context.reception,manifestId:context.manifestId,
    historyManifest:{path:path.resolve(options.historyManifest),sha256:abcSha256(context.manifestBytes)},
    conformance:{path:path.resolve(options.conformance),sha256:options.conformanceSha256},
    buildReceipt:{path:path.resolve(options.buildReceipt),sha256:options.buildReceiptSha256},
    buildReview:"separate-independent-review-required",rootExecutionAuthorized:false,
    reducer:{path:ABC_REDUCER_PATH,sha256:abcSha256(snapshot.reducerBytes)},cli:{path:ABC_CLI_PATH,sha256:abcSha256(snapshot.cliBytes)},
    sourceBinding:context.manifest.sourceBinding,referenceBindings:ABC_REFERENCES,
    rawRows,memberCount:context.manifest.members.length,rowCount:rows.length,
    members:context.manifest.members.map(({segments,...member})=>member),independentApiSpeedBounds:context.speedBounds,
    ordinaryRootCount:rows.reduce((sum,row)=>sum+row.roots.length,0),selfEndpointCount:context.manifest.members.length,
    maximumPrecisionBits:Math.max(...rows.map(row=>row.achievedPrecisionBits)),rows,
    claimBoundary:"Only this exact complete phase ledger and its independently bounded API speed boxes pass. Accepted analytic conformance and recorded-build bytes are bound; build review and execution authorization remain external. No missing phases, H3, evolution, retention, stability, score or physical claim."};
}

export function assertABCPhaseSequence(receipts,scope) {
  if(!Array.isArray(receipts)||receipts.length===0)fail("nonempty actual phase receipts required");
  const expected=[];
  if(scope==="pilot")for(const candidate of ABC_CANDIDATES)for(let phase=0;phase<2;phase++)expected.push([candidate,2,phase]);
  else if(scope==="candidate-rung"||scope==="candidate-ladder") {
    const candidate=receipts[0].candidateId;if(!ABC_CANDIDATES.includes(candidate))fail("unknown candidate");
    const rungs=scope==="candidate-ladder"?[8,32,128]:[receipts[0].rung];
    if(rungs.some(rung=>![2,8,32,128].includes(rung)))fail("invalid rung scope");
    for(const rung of rungs)for(let phase=0;phase<rung;phase++)expected.push([candidate,rung,phase]);
  }else fail("scope must be pilot, candidate-rung or candidate-ladder");
  if(receipts.length!==expected.length||receipts.some((receipt,index)=>!same([receipt.candidateId,receipt.rung,receipt.phase],expected[index])))fail("summary phase census is missing, extra or reordered");
  const repeated=new Map();
  for(const receipt of receipts) {
    const key=`${receipt.candidateId}/${receipt.receptionTime}`,previous=repeated.get(key)??[];
    for(const prior of previous) {
      if(prior.historyManifest.sha256!==receipt.historyManifest.sha256||!same(prior.members,receipt.members)||!same(prior.sourceBinding,receipt.sourceBinding)||prior.rows.length!==receipt.rows.length)fail("repeated reception carrier identity differs");
      for(let index=0;index<prior.rows.length;index++) {
        const a=prior.rows[index],b=receipt.rows[index];
        if(a.receiverIndex!==b.receiverIndex||a.transmitterIndex!==b.transmitterIndex||a.roots.length!==b.roots.length)fail("repeated reception root census differs");
        for(let root=0;root<a.roots.length;root++)if(compare(abcExactDecimal(a.roots[root].lower),abcExactDecimal(b.roots[root].upper))>0||compare(abcExactDecimal(b.roots[root].lower),abcExactDecimal(a.roots[root].upper))>0)fail("repeated reception root brackets are disjoint");
      }
    }
    repeated.set(key,[...previous,receipt]);
  }
}

export async function reduceABCSummarySnapshot(snapshot,progress=()=>{}) {
  if(!snapshot||!(snapshot.reducerBytes instanceof Uint8Array)||import.meta.url!==`data:text/javascript;base64,${Buffer.from(snapshot.reducerBytes).toString("base64")}`)fail("accepted summary requires captured reducer bytes");
  const files=fileContext(snapshot.repoRoot),reducerSha=abcSha256(snapshot.reducerBytes),cliSha=abcSha256(snapshot.cliBytes);
  if(abcSha256(files.read(files.relative(ABC_REDUCER_PATH)))!==reducerSha||abcSha256(files.read(files.relative(ABC_CLI_PATH)))!==cliSha)fail("summary instrument changed");
  for(const binding of ABC_REFERENCES)files.bound(binding);
  if(!Array.isArray(snapshot.phaseReceipts)||snapshot.phaseReceipts.length===0)fail("phase receipts required");
  const receipts=[],inputIdentities=[];
  for(const binding of snapshot.phaseReceipts) {
    const bytes=files.read(binding.path);if(!hashToken(binding.sha256)||abcSha256(bytes)!==binding.sha256)fail("phase receipt original-byte hash mismatch");
    const receipt=abcOriginalJson(bytes);
    if(receipt.schema!==ABC_PHASE_SCHEMA||receipt.accepted!==true||receipt.h3EvidenceEligible!==false||receipt.authority!=="source-byte-build-bound-independent-phase-ledger-only"||
      receipt.reducer?.path!==ABC_REDUCER_PATH||receipt.reducer.sha256!==reducerSha||receipt.cli?.path!==ABC_CLI_PATH||receipt.cli.sha256!==cliSha||!same(receipt.referenceBindings,ABC_REFERENCES))fail("phase receipt has wrong instrument/authority");
    for(const input of [receipt.historyManifest,receipt.conformance,receipt.buildReceipt,receipt.rawRows]) {
      if(!input||typeof input.path!=="string"||!hashToken(input.sha256)||files.inspect(input.path).sha256!==input.sha256)fail("phase receipt input bytes changed");
    }
    if(!Array.isArray(receipt.rows)||![6,12].includes(receipt.memberCount)||receipt.rowCount!==receipt.memberCount**2||receipt.rows.length!==receipt.rowCount||
      !Array.isArray(receipt.members)||receipt.members.length!==receipt.memberCount)fail("phase summary row/member census differs");
    files.bound(receipt.sourceBinding);
    const manifest=abcOriginalJson(files.read(receipt.historyManifest.path));
    if(manifest.manifestId!==receipt.manifestId||manifest.candidateId!==receipt.candidateId||manifest.receptionTime!==receipt.receptionTime||!same(manifest.members.map(({segments,...member})=>member),receipt.members))fail("phase summary manifest identity differs");
    receipts.push(receipt);inputIdentities.push({path:path.resolve(binding.path),sha256:binding.sha256,candidateId:receipt.candidateId,rung:receipt.rung,phase:receipt.phase,rowCount:receipt.rowCount});
    progress({stage:"phase-summary-bound",completedPhases:receipts.length,totalPhases:snapshot.phaseReceipts.length});
  }
  assertABCPhaseSequence(receipts,snapshot.scope);
  if(new Set(receipts.map(receipt=>receipt.buildReceipt.sha256)).size!==1)fail("summary phases must share the same recorded build");
  verifyBuild(files.read(receipts[0].buildReceipt.path),receipts[0].buildReceipt.sha256,files);
  files.recheck();
  return {schema:ABC_SUMMARY_SCHEMA,accepted:true,h3EvidenceEligible:false,rootExecutionAuthorized:false,
    authority:"authenticated-phase-summary-chain-only",scope:snapshot.scope,phaseCount:receipts.length,
    candidateIds:[...new Set(receipts.map(receipt=>receipt.candidateId))],
    rowCount:receipts.reduce((sum,receipt)=>sum+receipt.rowCount,0),ordinaryRootCount:receipts.reduce((sum,receipt)=>sum+receipt.ordinaryRootCount,0),
    selfEndpointCount:receipts.reduce((sum,receipt)=>sum+receipt.selfEndpointCount,0),phaseReceipts:inputIdentities,
    phaseReceiptChainSha256:abcSha256(Buffer.from(inputIdentities.map(identity=>identity.sha256).join("\n")+"\n")),
    buildReceipt:receipts[0].buildReceipt,reducer:{path:ABC_REDUCER_PATH,sha256:reducerSha},cli:{path:ABC_CLI_PATH,sha256:cliSha},
    repeatedReceptions:"identical-original-carriers-and-overlapping-roots",claimBoundary:"Only the explicitly named complete phase scope and byte-bound summary chain are accepted. Raw certificates remain in their original NDJSON files. No H3 promotion, resource approval, evolution, retention, stability, score or physical claim."};
}
