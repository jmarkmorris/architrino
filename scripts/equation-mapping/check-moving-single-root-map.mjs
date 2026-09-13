#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { decode } from './current-source-manifest.mjs';
import { controlledFixturePaths, loadControlledFixture, FIXTURE_SELECTION } from './controlled-fixture-records.mjs';
const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const CODE_PATHS = ['scripts/equation-mapping/dependency-map-reader.mjs', 'scripts/equation-mapping/check-moving-single-root-map.mjs', 'package.json', 'package-lock.json', 'scripts/equation-mapping/current-source-manifest.mjs', 'scripts/equation-mapping/fixtures/known-hash-answers.json', 'scripts/equation-mapping/fixtures/mathematical-acceptance-selection.json'];
export const ACCEPTANCE_PATH = 'reference/priorities/development-process-review/contracts/option-b-mathematical-map-acceptance.jsonld';
const MOVING_MAP = 'reference/priorities/master-equation-closure/contracts/moving-single-root-dependencies.jsonld';
const FINITE_MAP = 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependencies.jsonld';
const FINITE_CHECK = 'scripts/equation-mapping/verify-finite-ledger-superposition.mjs';
const REVIEW_PATHS = [FINITE_CHECK, 'reference/priorities/development-process-review/analysis/option-b-first-chain-baseline-review.md', 'tests/equation-dependency-map.test.mjs', 'tests/pr-validation-receipt.test.js', 'scripts/pr-validation-receipt.mjs', '.github/workflows/option-b-trial.yml', 'reference/priorities/master-equation-closure/contracts/moving-single-root-dependency-map.md', 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependency-map.md'];
const SCIENCE = 'scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs';
const TEST = 'tests/moving-single-root-scalar-gradient-verifier.test.mjs';
const PROSE = 'content/markdown/aaa/dynamics/master-equation.md';
const MAP_SCOPES = { [MOVING_MAP]: 'moving-single-root-only', [FINITE_MAP]: 'finite-ledger-superposition-only' };
const CHECK_LABELS = ['scientific-check', 'prose-check', 'existing-scientific-test', 'finite-ledger-polynomial-check'];
const requireValue = (value, message) => { if (!value) throw new Error(message); };
const digest = value => /^[a-f0-9]{64}$/u.test(value ?? '');
function safePath(name) {
  requireValue(typeof name === 'string' && !path.isAbsolute(name) && !name.includes('\\') && !name.includes('\0') &&
    name.split('/').every(part => part && part !== '.' && part !== '..'), 'Unsafe acceptance source path');
  return name;
}
function git(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'buffer', timeout: 10000, maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Baseline retrieval failed: ${args.join(' ')}`);
  return result.stdout;
}
function inputCapture(cwd) {
  const root = fs.realpathSync(cwd), originals = new Map();
  const read = name => {
    const filename = path.join(root, safePath(name));
    requireValue(fs.realpathSync(filename) === filename, 'Noncanonical comparison input');
    const fd = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
    try {
      const before = fs.fstatSync(fd), keys = ['dev','ino','size','mtimeMs','ctimeMs'];
      requireValue(before.isFile() && before.size <= 8 * 1024 ** 2, 'Bounded regular comparison input required');
      const raw = fs.readFileSync(fd), after = fs.fstatSync(fd), current = fs.lstatSync(filename);
      const identity = Object.fromEntries(keys.map(key => [key,before[key]]));
      requireValue(raw.length === before.size && current.isFile() && keys.every(key => before[key] === after[key] && before[key] === current[key]), 'Comparison input changed during capture');
      const prior = originals.get(name);
      requireValue(!prior || (isDeepStrictEqual(prior.identity,identity) && prior.raw.equals(raw)), `Input changed during trial: ${name}`);
      if (!prior) originals.set(name,{raw,identity});
      return raw;
    } finally { fs.closeSync(fd); }
  };
  return {read, recheck() { for (const name of originals.keys()) read(name); },
    inputs() { return Object.fromEntries([...originals].map(([name,row]) => [name,hash(row.raw)])); }};
}

// The external digest selects authority. Current map bytes cannot select or
// silently renew their own predecessor; all predecessor files come from Git.
export function loadAcceptedMathematicalMaps({cwd = ROOT, acceptanceSha256} = {}) {
  requireValue(digest(acceptanceSha256), 'Externally selected mathematical acceptance digest required');
  const capture = inputCapture(cwd);
  const bound = (name, expected) => {
    requireValue(digest(expected), 'Acceptance binding digest required');
    const raw = capture.read(name); requireValue(hash(raw) === expected, `Acceptance binding mismatch: ${name}`); return raw;
  };
  const acceptance = decode(bound(ACCEPTANCE_PATH,acceptanceSha256));
  requireValue(acceptance.schemaVersion === 'option-b-map-scope-acceptance/v1' && acceptance['@type'] === 'ScopeAcceptance' &&
    isDeepStrictEqual(acceptance['@context'],{'@vocab':'https://architrino.com/knowledge/acceptance/'}) &&
    acceptance.status === 'operator-accepted' && acceptance.scope === 'report-only change comparison for the two exact reviewed mathematical dependency maps' &&
    acceptance.repository === 'https://github.com/jmarkmorris/architrino.git' && /^[a-f0-9]{40}$/u.test(acceptance.reviewedCommit ?? ''), 'Accepted mathematical scope or commit required');
  requireValue(Array.isArray(acceptance.maps) && acceptance.maps.length === 2 && new Set(acceptance.maps.map(row=>row.path)).size === 2 &&
    acceptance.maps.every(row => MAP_SCOPES[row.path] === row.scope && digest(row.sha256)), 'Exact two-chain acceptance census required');
  requireValue(acceptance.reviewManifest?.path === 'reference/priorities/development-process-review/evidence/option-b-current-map-review-manifest.json' &&
    acceptance.executionReport?.path === 'reference/priorities/development-process-review/evidence/option-b-current-map-review-report.json', 'Exact copied review artifacts required');
  const manifest = decode(bound(acceptance.reviewManifest.path,acceptance.reviewManifest.sha256));
  const execution = decode(bound(acceptance.executionReport.path,acceptance.executionReport.sha256));
  requireValue(manifest.schema === 'option-b-review-manifest/v1' && manifest.approval === 'not-granted' && manifest.observedHead === acceptance.reviewedCommit &&
    execution.schema === 'option-b-trial-report/v1' && execution.approval === 'not-granted' && ['pass','review-required'].includes(execution.status) &&
    execution.authority === 'report-only; existing A checks unchanged' && execution.candidate?.head === acceptance.reviewedCommit &&
    execution.reviewManifest?.sha256 === acceptance.reviewManifest.sha256 && isDeepStrictEqual(execution.candidate.inputs,manifest.files), 'Copied review identity mismatch');
  requireValue(isDeepStrictEqual(execution.executedChecks?.map(row=>row.label),CHECK_LABELS) && execution.executedChecks.every(row=>row.status==='pass') &&
    execution.executedChecks.filter(row=>row.label!=='prose-check').every(row=>row.exitCode===0 && row.signal===null && row.error===null), 'Four passing reviewed checks required');
  const expectedMaps = Object.fromEntries(acceptance.maps.map(row=>[row.path===MOVING_MAP?'moving-single-root':'finite-ledger-superposition',{path:row.path,sha256:row.sha256}]));
  requireValue(isDeepStrictEqual(manifest.maps,expectedMaps) && execution.candidate.mapPath===MOVING_MAP &&
    execution.candidate.mapSha256===expectedMaps['moving-single-root'].sha256, 'Accepted maps differ from reviewed maps');
  requireValue(manifest.files && Object.keys(manifest.files).length > 0, 'Reviewed file census required');
  const files = new Map();
  for (const [name,expected] of Object.entries(manifest.files)) {
    safePath(name); requireValue(digest(expected), 'Reviewed file digest required');
    const raw = git(cwd,['show',`${acceptance.reviewedCommit}:${name}`]);
    requireValue(hash(raw)===expected,`Reviewed commit file mismatch: ${name}`); files.set(name,raw);
  }
  const maps = new Map();
  for (const row of acceptance.maps) {
    requireValue(files.has(row.path) && hash(files.get(row.path))===row.sha256,'Accepted predecessor map mismatch');
    const document = decode(files.get(row.path)); requireValue(document.scope===row.scope,'Accepted predecessor scope mismatch');
    maps.set(row.path,document);
  }
  capture.recheck();
  return {acceptance, files, maps, recheck:capture.recheck, inputs:capture.inputs(),
    selection:{path:ACCEPTANCE_PATH,sha256:acceptanceSha256,status:'operator-accepted',scope:acceptance.scope}};
}
function execute(cwd, args, outputDirectory, label) {
  const start = Date.now(); const result = spawnSync(process.execPath, args, { cwd, encoding: 'buffer', timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
  const stdout = result.stdout ?? Buffer.alloc(0), stderr = result.stderr ?? Buffer.alloc(0);
  fs.writeFileSync(path.join(outputDirectory, `${label}.stdout`), stdout); fs.writeFileSync(path.join(outputDirectory, `${label}.stderr`), stderr);
  return { label, argv: [process.execPath, ...args], exitCode: result.status, signal: result.signal, error: result.error?.message ?? null, status: result.status === 0 && !result.error ? 'pass' : 'error', elapsedMs: Date.now() - start, stdoutSha256: hash(stdout), stderrSha256: hash(stderr), stdout };
}
export async function runTrial({ cwd = ROOT, outputDirectory = path.join(cwd, '.local-data/option-b-trial'), mapPath, finiteMapPath = FINITE_MAP,
  acceptanceSha256 = process.env.OPTION_B_MATHEMATICAL_ACCEPTANCE_SHA256 } = {}) {
  fs.mkdirSync(outputDirectory, { recursive: true });
  // Remove a prior report before any work: old success cannot represent this run.
  fs.rmSync(path.join(outputDirectory, 'report.json'), { force: true });
  fs.rmSync(path.join(outputDirectory, 'review-manifest.json'), { force: true });
  const report = { schema: 'option-b-trial-report/v1', authority: 'report-only B-to-B comparison; unchanged scientific checks; no production or scientific approval', status: 'error', approval: 'not-granted', startedAt: new Date().toISOString(), environment: { node: process.version, platform: process.platform, architecture: process.arch }, executedChecks: [] };
  try {
    loadControlledFixture({root:cwd, selection:decode(fs.readFileSync(path.join(cwd,FIXTURE_SELECTION))), consumer:CODE_PATHS[0]});
    const fixturePaths = controlledFixturePaths(cwd);
    const reader = await import('./dependency-map-reader.mjs');
    report.preflight = await reader.preflight(); console.log(`[option-b-trial] known controls ${report.preflight}`);
    const accepted = loadAcceptedMathematicalMaps({cwd,acceptanceSha256}), capture = inputCapture(cwd);
    report.baseline = {commit:accepted.acceptance.reviewedCommit,scopeAcceptance:'operator-accepted; exact report-only predecessors',
      acceptance:accepted.selection,maps:accepted.acceptance.maps};
    const executing = inputCapture(ROOT);
    for (const name of [CODE_PATHS[0],CODE_PATHS[1],CODE_PATHS[4],CODE_PATHS[5],...fixturePaths]) requireValue(
      executing.read(name).equals(capture.read(name)), 'Executing comparison instrument differs from observed input');
    const baseline = accepted.maps.get(MOVING_MAP), finiteBaseline = accepted.maps.get(FINITE_MAP);
    const selectedMapPath = mapPath ?? reader.MAP_PATH; reader.safePath(selectedMapPath);
    reader.safePath(finiteMapPath);
    const mapRaw = capture.read(selectedMapPath), current = decode(mapRaw);
    const finiteRaw = capture.read(finiteMapPath), finite = decode(finiteRaw);
    if (current.scope !== 'moving-single-root-only' || finite.scope !== 'finite-ledger-superposition-only') throw new Error('Map does not match its assigned chain');
    report.candidate = { head: git(cwd, ['rev-parse', 'HEAD']).toString().trim(), mapPath: selectedMapPath, mapSha256: hash(mapRaw), inputs: {} };
    const baseFiles = new Map(reader.sourcePaths(baseline).map(name => [name, accepted.files.get(name)]));
    const finiteBaseFiles = new Map(reader.sourcePaths(finiteBaseline).map(name => [name, accepted.files.get(name)]));
    const paths = [...new Set([...reader.sourcePaths(baseline), ...reader.sourcePaths(finiteBaseline), ...reader.sourcePaths(current), ...reader.sourcePaths(finite), ...CODE_PATHS, ...fixturePaths, ...REVIEW_PATHS, selectedMapPath, finiteMapPath])];
    const before = new Map(paths.map(name => [name, capture.read(name)]));
    report.candidate.inputs = {...Object.fromEntries([...before].map(([name, raw]) => [name, hash(raw)])),...accepted.inputs};
    const currentFiles = new Map([...new Set([...reader.sourcePaths(baseline), ...reader.sourcePaths(current)])].map(name => [name, before.get(name)]));
    report.graph = await reader.compare(baseFiles, baseline, currentFiles, current);
    const finiteFiles = new Map([...new Set([...reader.sourcePaths(finiteBaseline),...reader.sourcePaths(finite)])].map(name => [name, before.get(name)]));
    report.chains = { 'moving-single-root': report.graph, 'finite-ledger-superposition': await reader.compare(finiteBaseFiles,finiteBaseline,finiteFiles,finite) };
    // Raw candidate bytes are recorded even when RDF/JSON semantics are unchanged.
    for (const [chain,name,raw] of [['moving-single-root',MOVING_MAP,mapRaw],['finite-ledger-superposition',FINITE_MAP,finiteRaw]]) {
      report.chains[chain].baseline='operator-accepted-exact-predecessor';
      report.chains[chain].rawMapDiffersFromAcceptedBaseline=!raw.equals(accepted.files.get(name));
      if (report.chains[chain].rawMapDiffersFromAcceptedBaseline) report.chains[chain].review='required';
    }
    accepted.recheck(); capture.recheck(); executing.recheck();
    for (const [label, args] of [['scientific-check', [SCIENCE]], ['existing-scientific-test', ['--test', TEST]], ['finite-ledger-polynomial-check', [FINITE_CHECK]]]) {
      const { stdout, ...record } = execute(cwd, args, outputDirectory, label); report.executedChecks.push(record);
      if (label === 'scientific-check' && record.status === 'pass') {
        const result = reader.compareDisplayedResult(currentFiles.get(PROSE).toString('utf8'), JSON.parse(stdout));
        report.executedChecks.push({ label: 'prose-check', ...result, inputOutputSha256: hash(stdout), instrumentSha256: report.candidate.inputs[CODE_PATHS[0]] });
      }
    }
    if (report.executedChecks.some(row => row.status !== 'pass')) throw new Error('One or more bounded checks failed');
    accepted.recheck(); capture.recheck(); executing.recheck();
    const reviewManifest = { schema: 'option-b-review-manifest/v1', approval: 'not-granted', observedHead: report.candidate.head,
      identityBoundary: 'Exact scoped working bytes compared with externally selected accepted B predecessors. New candidate bytes require separate acceptance; this run grants none.',
      baselineAcceptance:accepted.selection,
      maps: { 'moving-single-root': { path: selectedMapPath, sha256: hash(mapRaw) }, 'finite-ledger-superposition': { path: finiteMapPath, sha256: hash(finiteRaw) } },
      files: report.candidate.inputs };
    const manifestRaw = JSON.stringify(reviewManifest, null, 2) + '\n';
    fs.writeFileSync(path.join(outputDirectory, 'review-manifest.json'), manifestRaw);
    report.reviewManifest = { path: 'review-manifest.json', sha256: hash(manifestRaw), approval: 'not-granted' };
    report.status = Object.values(report.chains).some(chain => chain.review === 'required') ? 'review-required' : 'pass';
    report.coverage = 'Two bounded B-to-B comparisons against externally selected exact accepted predecessors, with existing scientific checks unchanged. Candidate approval remains not-granted, including byte-identical maps. Historical run/output records remain historical. No proof, dependency-completeness, production or scientific-run acceptance claim.';
    accepted.recheck(); capture.recheck(); executing.recheck();
  } catch (error) {
    report.status = 'error'; report.error = error.message; delete report.reviewManifest;
    fs.rmSync(path.join(outputDirectory, 'review-manifest.json'), {force:true});
  }
  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outputDirectory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`[option-b-trial] REPORT-ONLY ${report.status}: ${report.error ?? report.graph.review}; ${path.join(outputDirectory, 'report.json')}`);
  return report;
}
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2); const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = { '--repo': 'cwd', '--output-dir': 'outputDirectory', '--map': 'mapPath', '--finite-map':'finiteMapPath', '--acceptance-sha256':'acceptanceSha256' }[args[i]];
    if (!key || !args[i + 1] || options[key]) throw new Error('Usage: --repo path --output-dir path --map repository-relative-path --finite-map repository-relative-path --acceptance-sha256 external-digest'); options[key] = args[i + 1];
  }
  try { const result = await runTrial(options); process.exitCode = result.status === 'error' ? 1 : 0; }
  catch (error) { console.error(`[option-b-trial] REPORT-ONLY error: ${error.message}`); process.exitCode = 1; }
}
