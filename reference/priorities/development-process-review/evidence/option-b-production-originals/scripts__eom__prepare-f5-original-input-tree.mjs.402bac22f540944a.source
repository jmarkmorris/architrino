// Explicit execution-root transport for the frozen F5 input generation.
// This copies bytes; it does not change any consumer or confer acceptance.
import { createHash } from 'node:crypto';
import { closeSync, constants, existsSync, fstatSync, mkdirSync, openSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as f5Fs from 'node:fs';
import * as f5Crypto from 'node:crypto';
// Bootstrap uses Node builtins only; no repository module runs before selection.
export async function bootstrapF5(root, sourceMapSha256, originalIdentities = {}) {
  if (!/^[a-f0-9]{64}$/u.test(sourceMapSha256 ?? "")) throw Error("externally selected F5 source-map digest required");
  const capture = (filename, expected) => {
    if (f5Fs.realpathSync(filename) !== filename) throw Error("canonical F5 bootstrap source required");
    const fd = f5Fs.openSync(filename, f5Fs.constants.O_RDONLY | f5Fs.constants.O_NOFOLLOW | f5Fs.constants.O_NONBLOCK);
    try {
      const before = f5Fs.fstatSync(fd, {bigint:true});
      const identity = s => [s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(":");
      if (!before.isFile() || before.size <= 0n || before.size > 1024n**2n) throw Error("bounded F5 bootstrap source");
      const data = f5Fs.readFileSync(fd), sha256 = f5Crypto.createHash("sha256").update(data).digest("hex");
      if (sha256 !== expected || identity(before) !== identity(f5Fs.fstatSync(fd,{bigint:true})) || identity(before) !== identity(f5Fs.lstatSync(filename,{bigint:true}))) throw Error("F5 bootstrap source digest/original identity changed");
      if (Object.hasOwn(originalIdentities,filename) && originalIdentities[filename] !== identity(before)) throw Error("F5 original bootstrap identity changed");
      return {data,identity:identity(before),path:filename};
    } finally {f5Fs.closeSync(fd);}
  };
  const mapPath = path.join(root,"reference/priorities/development-process-review/contracts/option-b-f5-operational-sources.jsonld");
  const map = capture(mapPath,sourceMapSha256), admissionPath = "scripts/eom/f5-current-source-admission.mjs";
  const rows = JSON.parse(map.data)["@graph"]?.filter(r=>r.role==="admission"&&r.binding?.path===admissionPath);
  if (rows?.length !== 1 || !/^[a-f0-9]{64}$/u.test(rows[0].binding.sha256)) throw Error("exact F5 admission module selection required");
  const helper = capture(path.join(root,admissionPath),rows[0].binding.sha256);
  const module = await import("data:text/javascript;base64,"+helper.data.toString("base64"));
  return module.admitF5Sources(root,sourceMapSha256,{...originalIdentities,[map.path]:map.identity,[helper.path]:helper.identity});
}


const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SELF = 'scripts/eom/prepare-f5-original-input-tree.mjs';
const ROUTES = 'reference/priorities/development-process-review/evidence/final-validation/f5-original-input-availability.json';
const INPUTS = Object.freeze([
  ['reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json', 'e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb'],
  ['reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json', 'bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344'],
  ['reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md', '1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5'],
  ['reference/priorities/braid-program/evidence/2026-08-26-f5-independent-interpolation-enclosure.md', '931f5d88a209648bde63dfbdd1f24303b7a33e101e11565e75fd608be347d496'],
  ['.local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/f5-independent-enclosure/accepted-enclosure-report.v1.json', '2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9'],
]);
export const F5_INPUT_TREE_TESTS = Object.freeze([
  'tests/f5-enclosed-root-preparation.test.js',
  'tests/f5-enclosed-root-prefix.test.js',
  'tests/f5-enclosed-root-ledger-reducer.test.js',
  'tests/test_f5_api_domain_conformance.py',
  'tests/test_f5_history_manifest_conformance.py',
]);
const FILES = [SELF,
  'scripts/dev/materialize-source-replay.mjs',
  'tests/helpers/f5-source-replay.mjs',
  'tests/source_replay_support.py',
  'reference/priorities/braid-program/evidence/source-replay/f5-source-replay.v1.json',
  'reference/priorities/braid-program/evidence/source-replay/f5-approved-config.json.source',
  'reference/priorities/braid-program/evidence/source-replay/f5-pilot-fixture.json.source',
  'reference/priorities/braid-program/evidence/source-replay/f5-restart-predeclaration.md.source',
  'reference/priorities/braid-program/evidence/source-replay/f5-enclosure-evidence.md.source',
  'reference/priorities/braid-program/evidence/source-replay/f5-accepted-enclosure-report.json.source',
  'scripts/eom/prepare-f5-enclosed-root.mjs',
  'scripts/eom/verify-f5-enclosed-root-prefix.mjs',
  'scripts/eom/reduce-f5-enclosed-root-ledger.mjs',
  'scripts/eom/derive-f5-independent-interpolation-enclosure.mjs',
  'scripts/eom/analyze-f5-phase-varying-guard-margin.mjs',
  'src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs',
  'scripts/eom/oracle/decimal_interval.py',
  'scripts/eom/oracle/f5_actual_cubic_conformance.py',
  'scripts/eom/oracle/f5_api_domain_conformance.py',
  'scripts/eom/oracle/f5_history_manifest_conformance.py', ...F5_INPUT_TREE_TESTS];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');

function relativeName(value) {
  if (typeof value !== 'string' || path.isAbsolute(value) || value.includes('\\') ||
      value.split('/').some(part => !part || part === '.' || part === '..')) throw new Error('noncanonical relative path');
  return value;
}
export function readF5RegularBytes(filename) {
  if (realpathSync(filename) !== path.resolve(filename)) throw new Error(`symlinked input: ${filename}`);
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd);
    if (!before.isFile()) throw new Error(`input is not a regular file: ${filename}`);
    const bytes = readFileSync(fd), after = fstatSync(fd);
    if (before.size !== bytes.length || after.size !== before.size || after.mtimeMs !== before.mtimeMs || after.ctimeMs !== before.ctimeMs) throw new Error(`input changed during read: ${filename}`);
    return bytes;
  } finally { closeSync(fd); }
}
export function captureF5OriginalInputs(root, routes) {
  if (!Array.isArray(routes) || routes.length !== INPUTS.length || new Set(routes.map(row => row.originalPath)).size !== INPUTS.length) throw new Error('original route census differs');
  return INPUTS.map(([logicalPath, digest]) => {
    const route = routes.find(row => row.originalPath === logicalPath);
    if (!route || route.expected !== digest) throw new Error(`original route identity differs: ${logicalPath}`);
    const physicalPath = relativeName(route.physicalPath);
    const bytes = readF5RegularBytes(path.join(root, physicalPath));
    if (sha(bytes) !== digest || bytes.length !== route.bytes) throw new Error(`original bytes differ: ${logicalPath}`);
    return { logicalPath, physicalPath, sha256: digest, bytes };
  });
}
function sourceFiles(root, operational) {
  const files = [...FILES, ...operational.sources.map(b=>path.relative(root,b.path))];
  function visit(relative) {
    for (const row of readdirSync(path.join(root, relative), { withFileTypes: true })) {
      const next = `${relative}/${row.name}`;
      if (row.isSymbolicLink()) throw new Error(`symlinked source: ${next}`);
      if (row.isDirectory()) visit(next);
      else if (row.isFile() && /\.(?:mjs|cpp|hpp|h)$|(?:^|\/)CMakeLists\.txt$/u.test(next)) files.push(next);
    }
  }
  visit('src/prescribed-geometry'); visit('src/eom');
  return [...new Set(files)].sort();
}
export async function prepareF5OriginalInputTree(output, root = ROOT, sourceMapSha256) {
  root = realpathSync(root);
  const operational = await bootstrapF5(root,sourceMapSha256);
  const destination = path.resolve(output);
  const base = path.join(root, '.local-data/f5-original-input-trees');
  if (path.dirname(destination) !== base || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/u.test(path.basename(destination))) throw new Error('choose a fresh direct child of .local-data/f5-original-input-trees');
  if (existsSync(destination)) throw new Error('execution root already exists');
  const routeBytes = readF5RegularBytes(path.join(root, ROUTES));
  const inputs = captureF5OriginalInputs(root, JSON.parse(routeBytes));
  const files = sourceFiles(root, operational).map(logicalPath => ({ logicalPath, physicalPath: logicalPath, bytes: readF5RegularBytes(path.join(root, logicalPath)) }));
  for (const row of files) row.sha256 = sha(row.bytes);
  const captures = [...files, ...inputs];
  mkdirSync(base, { recursive: true });
  if (realpathSync(base) !== base) throw new Error('symlinked execution-root parent');
  mkdirSync(destination);
  for (const row of captures) {
    const target = path.join(destination, row.logicalPath);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, row.bytes, { flag: 'wx' });
  }
  mkdirSync(path.join(destination, '.tmp'));
  // Publication is last. A partial directory without this record is unusable.
  for (const row of captures) {
    if (!readF5RegularBytes(path.join(root, row.physicalPath)).equals(row.bytes) ||
        !readF5RegularBytes(path.join(destination, row.logicalPath)).equals(row.bytes)) throw new Error(`captured file changed: ${row.logicalPath}`);
  }
  if (!readF5RegularBytes(path.join(root, ROUTES)).equals(routeBytes) || JSON.stringify(sourceFiles(root, operational)) !== JSON.stringify(files.map(row => row.logicalPath))) throw new Error('input routes or source census changed');
  operational.recheck();
  const record = { sourceMap:operational.sourceMap, schema: 'braid-program/f5-original-input-tree.v2', originRoot: root, executionRoot: destination,
    accepted: false, scientificAcceptance: false, sourceCensus: files.map(row => row.logicalPath),
    routeManifest: { path: ROUTES, sha256: sha(routeBytes), bytes: routeBytes.length },
    files: captures.map(row => ({ logicalPath: row.logicalPath, physicalPath: row.physicalPath, sha256: row.sha256, bytes: row.bytes.length })),
    boundary: 'Explicit original data under original logical names; captured current source bytes are unchanged. This materialization record is not build review, runtime authentication, proof acceptance or a solver result. Consumers retain their own validation and source-authentication obligations.' };
  writeFileSync(path.join(destination, 'f5-original-input-tree.json'), `${JSON.stringify(record, null, 2)}\n`, { flag: 'wx' });
  operational.recheck();
  return record;
}
export async function verifyF5OriginalInputTree(output, root = ROOT, sourceMapSha256) {
  root = realpathSync(root);
  const operational = await bootstrapF5(root,sourceMapSha256);
  const destination = path.resolve(output);
  if (path.dirname(destination) !== path.join(root, '.local-data/f5-original-input-trees')) throw new Error('execution root is outside the declared parent');
  const record = JSON.parse(readF5RegularBytes(path.join(destination, 'f5-original-input-tree.json')));
  const routeBytes = readF5RegularBytes(path.join(root, ROUTES));
  const inputs = captureF5OriginalInputs(root, JSON.parse(routeBytes));
  const sources = sourceFiles(root, operational);
  const expected = [...sources.map(logicalPath => {
    const bytes = readF5RegularBytes(path.join(root, logicalPath));
    return { logicalPath, physicalPath: logicalPath, sha256: sha(bytes), bytes: bytes.length };
  }), ...inputs.map(row => ({ logicalPath: row.logicalPath, physicalPath: row.physicalPath, sha256: row.sha256, bytes: row.bytes.length }))];
  if (record.schema !== 'braid-program/f5-original-input-tree.v2' || record.originRoot !== root || record.executionRoot !== destination || record.accepted !== false || record.scientificAcceptance !== false ||
      record.sourceMap?.sha256 !== sourceMapSha256 || record.sourceMap?.path !== operational.sourceMap.path || record.sourceMap?.bytes !== operational.sourceMap.bytes || record.routeManifest?.path !== ROUTES || record.routeManifest?.sha256 !== sha(routeBytes) || record.routeManifest?.bytes !== routeBytes.length ||
      JSON.stringify(record.sourceCensus) !== JSON.stringify(sources) || JSON.stringify(record.files) !== JSON.stringify(expected)) throw new Error('execution-tree record differs from the current captured source and original-input census');
  for (const row of expected) {
    const bytes = readF5RegularBytes(path.join(destination, row.logicalPath));
    if (bytes.length !== row.bytes || sha(bytes) !== row.sha256) throw new Error(`execution-tree file changed: ${row.logicalPath}`);
  }
  return record;
}
if (import.meta.url.startsWith('file:') && !new URL(import.meta.url).search && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 6 || process.argv[4] !== '--source-map-sha256' || !['--out-root', '--check-root'].includes(process.argv[2])) throw new Error('usage: prepare-f5-original-input-tree.mjs --out-root NEW | --check-root EXISTING');
    const record = process.argv[2] === '--out-root' ? await prepareF5OriginalInputTree(process.argv[3],ROOT,process.argv[5]) : await verifyF5OriginalInputTree(process.argv[3],ROOT,process.argv[5]);
    console.log(JSON.stringify({ executionRoot: record.executionRoot, files: record.files.length, inputTreeChecked: process.argv[2] === '--check-root', accepted: false, scientificAcceptance: false }));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
