#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const CODE_PATHS = ['scripts/equation-mapping/dependency-map-reader.mjs', 'scripts/equation-mapping/check-moving-single-root-map.mjs', 'package.json', 'package-lock.json'];
const FINITE_MAP = 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependencies.jsonld';
const FINITE_CHECK = 'scripts/equation-mapping/verify-finite-ledger-superposition.mjs';
const REVIEW_PATHS = [FINITE_CHECK, 'reference/priorities/development-process-review/analysis/option-b-first-chain-baseline-review.md', 'tests/equation-dependency-map.test.mjs', 'tests/pr-validation-receipt.test.js', 'scripts/pr-validation-receipt.mjs', '.github/workflows/option-b-trial.yml', 'reference/priorities/master-equation-closure/contracts/moving-single-root-dependency-map.md', 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependency-map.md'];
const SCIENCE = 'scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs';
const TEST = 'tests/moving-single-root-scalar-gradient-verifier.test.mjs';
const PROSE = 'content/markdown/aaa/dynamics/master-equation.md';
const EXPECTED_PILOT_HASH = '01bc1c1c68c280c825361f6af93ae42711b4d460870c1c6e80111cd13aa2655d';
function git(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'buffer', maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Baseline retrieval failed: ${args.join(' ')}`);
  return result.stdout;
}
function local(cwd, name) {
  const resolved = fs.realpathSync(path.join(cwd, name));
  if (!resolved.startsWith(fs.realpathSync(cwd) + path.sep)) throw new Error('Source escapes repository');
  return fs.readFileSync(resolved);
}
function execute(cwd, args, outputDirectory, label) {
  const start = Date.now(); const result = spawnSync(process.execPath, args, { cwd, encoding: 'buffer', timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
  const stdout = result.stdout ?? Buffer.alloc(0), stderr = result.stderr ?? Buffer.alloc(0);
  fs.writeFileSync(path.join(outputDirectory, `${label}.stdout`), stdout); fs.writeFileSync(path.join(outputDirectory, `${label}.stderr`), stderr);
  return { label, argv: [process.execPath, ...args], exitCode: result.status, signal: result.signal, error: result.error?.message ?? null, status: result.status === 0 && !result.error ? 'pass' : 'error', elapsedMs: Date.now() - start, stdoutSha256: hash(stdout), stderrSha256: hash(stderr), stdout };
}
export async function runTrial({ cwd = ROOT, outputDirectory = path.join(cwd, '.local-data/option-b-trial'), mapPath } = {}) {
  fs.mkdirSync(outputDirectory, { recursive: true });
  // Remove a prior report before any work: old success cannot represent this run.
  fs.rmSync(path.join(outputDirectory, 'report.json'), { force: true });
  fs.rmSync(path.join(outputDirectory, 'review-manifest.json'), { force: true });
  const report = { schema: 'option-b-trial-report/v1', authority: 'report-only; existing A checks unchanged', status: 'error', approval: 'not-granted', startedAt: new Date().toISOString(), environment: { node: process.version, platform: process.platform, architecture: process.arch }, executedChecks: [] };
  try {
    const reader = await import('./dependency-map-reader.mjs');
    report.preflight = await reader.preflight(); console.log(`[option-b-trial] known controls ${report.preflight}`);
    const rawPilot = git(cwd, ['show', `${reader.BASELINE_COMMIT}:${reader.HISTORICAL}/candidate.jsonld`]);
    if (hash(rawPilot) !== EXPECTED_PILOT_HASH) throw new Error('Reviewed pilot identity mismatch');
    report.baseline = { commit: reader.BASELINE_COMMIT, review: 'https://github.com/jmarkmorris/architrino/pull/263', pilotSha256: hash(rawPilot), scopeAcceptance: 'not-granted; historical comparison only', migration: 'option-b-map/v1 fixed artifact-path resolution; original scientific IDs and bindings retained' };
    const baseline = reader.migrateReviewedPilot(JSON.parse(rawPilot));
    const selectedMapPath = mapPath ?? reader.MAP_PATH; reader.safePath(selectedMapPath);
    const mapRaw = local(cwd, selectedMapPath), current = JSON.parse(mapRaw);
    const finiteRaw = local(cwd, FINITE_MAP), finite = JSON.parse(finiteRaw);
    if (current.scope !== 'moving-single-root-only' || finite.scope !== 'finite-ledger-superposition-only') throw new Error('Map does not match its assigned chain');
    report.candidate = { head: git(cwd, ['rev-parse', 'HEAD']).toString().trim(), mapPath: selectedMapPath, mapSha256: hash(mapRaw), inputs: {} };
    const baseFiles = new Map(reader.sourcePaths(baseline).map(name => [name, git(cwd, ['show', `${reader.BASELINE_COMMIT}:${name}`])]));
    const paths = [...new Set([...reader.sourcePaths(baseline), ...reader.sourcePaths(current), ...reader.sourcePaths(finite), ...CODE_PATHS, ...REVIEW_PATHS, selectedMapPath, FINITE_MAP])];
    const before = new Map(paths.map(name => [name, local(cwd, name)]));
    report.candidate.inputs = Object.fromEntries([...before].map(([name, raw]) => [name, hash(raw)]));
    const currentFiles = new Map([...new Set([...reader.sourcePaths(baseline), ...reader.sourcePaths(current)])].map(name => [name, before.get(name)]));
    report.graph = await reader.compare(baseFiles, baseline, currentFiles, current);
    const finiteFiles = new Map(reader.sourcePaths(finite).map(name => [name, before.get(name)]));
    report.chains = { 'moving-single-root': report.graph, 'finite-ledger-superposition': await reader.inspectNewChain(finiteFiles, finite) };
    // Raw candidate bytes are recorded even when RDF/JSON semantics are unchanged.
    report.graph.rawMapDiffersFromMigratedBaseline = !mapRaw.equals(Buffer.from(JSON.stringify(baseline, null, 2) + '\n'));
    if (report.graph.rawMapDiffersFromMigratedBaseline) report.graph.review = 'required';
    for (const [label, args] of [['scientific-check', [SCIENCE]], ['existing-scientific-test', ['--test', TEST]], ['finite-ledger-polynomial-check', [FINITE_CHECK]]]) {
      const { stdout, ...record } = execute(cwd, args, outputDirectory, label); report.executedChecks.push(record);
      if (label === 'scientific-check' && record.status === 'pass') {
        const result = reader.compareDisplayedResult(currentFiles.get(PROSE).toString('utf8'), JSON.parse(stdout));
        report.executedChecks.push({ label: 'prose-check', ...result, inputOutputSha256: hash(stdout), instrumentSha256: report.candidate.inputs[CODE_PATHS[0]] });
      }
    }
    if (report.executedChecks.some(row => row.status !== 'pass')) throw new Error('One or more bounded checks failed');
    for (const [name, raw] of before) if (!raw.equals(local(cwd, name))) throw new Error(`Input changed during trial: ${name}`);
    const reviewManifest = { schema: 'option-b-review-manifest/v1', approval: 'not-granted', observedHead: report.candidate.head,
      identityBoundary: 'Exact scoped working bytes; an operator-accepted published head and verified merge are still required for baseline advancement.',
      maps: { 'moving-single-root': { path: selectedMapPath, sha256: hash(mapRaw) }, 'finite-ledger-superposition': { path: FINITE_MAP, sha256: hash(finiteRaw) } },
      files: report.candidate.inputs };
    const manifestRaw = JSON.stringify(reviewManifest, null, 2) + '\n';
    fs.writeFileSync(path.join(outputDirectory, 'review-manifest.json'), manifestRaw);
    report.reviewManifest = { path: 'review-manifest.json', sha256: hash(manifestRaw), approval: 'not-granted' };
    report.status = Object.values(report.chains).some(chain => chain.review === 'required') ? 'review-required' : 'pass';
    report.coverage = 'Two bounded chains: moving-single-root exact selectors, old/new dependency impact, existing numerical verifier/test and one displayed maximum; finite-ledger conditional theorem with three polynomial witnesses and omitted-row negatives. Second-chain baseline not established. Historical run/output records remain historical. No proof or dependency-completeness claim.';
  } catch (error) { report.error = error.message; }
  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outputDirectory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`[option-b-trial] REPORT-ONLY ${report.status}: ${report.error ?? report.graph.review}; ${path.join(outputDirectory, 'report.json')}`);
  return report;
}
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2); const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = { '--repo': 'cwd', '--output-dir': 'outputDirectory', '--map': 'mapPath' }[args[i]];
    if (!key || !args[i + 1]) throw new Error('Usage: --repo path --output-dir path --map repository-relative-path'); options[key] = args[i + 1];
  }
  try { const result = await runTrial(options); process.exitCode = result.status === 'error' ? 1 : 0; }
  catch (error) { console.error(`[option-b-trial] REPORT-ONLY error: ${error.message}`); process.exitCode = 1; }
}
