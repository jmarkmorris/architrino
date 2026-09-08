// Explicit execution-root transport for the frozen F5 input generation.
// This copies bytes; it does not change any consumer or confer acceptance.
import { createHash } from 'node:crypto';
import { closeSync, constants, existsSync, fstatSync, mkdirSync, openSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
function sourceFiles(root) {
  const files = [...FILES];
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
export function prepareF5OriginalInputTree(output, root = ROOT) {
  root = realpathSync(root);
  const destination = path.resolve(output);
  const base = path.join(root, '.local-data/f5-original-input-trees');
  if (path.dirname(destination) !== base || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/u.test(path.basename(destination))) throw new Error('choose a fresh direct child of .local-data/f5-original-input-trees');
  if (existsSync(destination)) throw new Error('execution root already exists');
  const routeBytes = readF5RegularBytes(path.join(root, ROUTES));
  const inputs = captureF5OriginalInputs(root, JSON.parse(routeBytes));
  const files = sourceFiles(root).map(logicalPath => ({ logicalPath, physicalPath: logicalPath, bytes: readF5RegularBytes(path.join(root, logicalPath)) }));
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
  if (!readF5RegularBytes(path.join(root, ROUTES)).equals(routeBytes) || JSON.stringify(sourceFiles(root)) !== JSON.stringify(files.map(row => row.logicalPath))) throw new Error('input routes or source census changed');
  const record = { schema: 'braid-program/f5-original-input-tree.v1', originRoot: root, executionRoot: destination,
    accepted: false, scientificAcceptance: false, sourceCensus: files.map(row => row.logicalPath),
    routeManifest: { path: ROUTES, sha256: sha(routeBytes), bytes: routeBytes.length },
    files: captures.map(row => ({ logicalPath: row.logicalPath, physicalPath: row.physicalPath, sha256: row.sha256, bytes: row.bytes.length })),
    boundary: 'Explicit original data under original logical names; captured current source bytes are unchanged. This materialization record is not build review, runtime authentication, proof acceptance or a solver result. Consumers retain their own validation and source-authentication obligations.' };
  writeFileSync(path.join(destination, 'f5-original-input-tree.json'), `${JSON.stringify(record, null, 2)}\n`, { flag: 'wx' });
  return record;
}
export function verifyF5OriginalInputTree(output, root = ROOT) {
  root = realpathSync(root);
  const destination = path.resolve(output);
  if (path.dirname(destination) !== path.join(root, '.local-data/f5-original-input-trees')) throw new Error('execution root is outside the declared parent');
  const record = JSON.parse(readF5RegularBytes(path.join(destination, 'f5-original-input-tree.json')));
  const routeBytes = readF5RegularBytes(path.join(root, ROUTES));
  const inputs = captureF5OriginalInputs(root, JSON.parse(routeBytes));
  const sources = sourceFiles(root);
  const expected = [...sources.map(logicalPath => {
    const bytes = readF5RegularBytes(path.join(root, logicalPath));
    return { logicalPath, physicalPath: logicalPath, sha256: sha(bytes), bytes: bytes.length };
  }), ...inputs.map(row => ({ logicalPath: row.logicalPath, physicalPath: row.physicalPath, sha256: row.sha256, bytes: row.bytes.length }))];
  if (record.schema !== 'braid-program/f5-original-input-tree.v1' || record.originRoot !== root || record.executionRoot !== destination || record.accepted !== false || record.scientificAcceptance !== false ||
      record.routeManifest?.path !== ROUTES || record.routeManifest?.sha256 !== sha(routeBytes) || record.routeManifest?.bytes !== routeBytes.length ||
      JSON.stringify(record.sourceCensus) !== JSON.stringify(sources) || JSON.stringify(record.files) !== JSON.stringify(expected)) throw new Error('execution-tree record differs from the current captured source and original-input census');
  for (const row of expected) {
    const bytes = readF5RegularBytes(path.join(destination, row.logicalPath));
    if (bytes.length !== row.bytes || sha(bytes) !== row.sha256) throw new Error(`execution-tree file changed: ${row.logicalPath}`);
  }
  return record;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4 || !['--out-root', '--check-root'].includes(process.argv[2])) throw new Error('usage: prepare-f5-original-input-tree.mjs --out-root NEW | --check-root EXISTING');
    const record = process.argv[2] === '--out-root' ? prepareF5OriginalInputTree(process.argv[3]) : verifyF5OriginalInputTree(process.argv[3]);
    console.log(JSON.stringify({ executionRoot: record.executionRoot, files: record.files.length, inputTreeChecked: process.argv[2] === '--check-root', accepted: false, scientificAcceptance: false }));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
