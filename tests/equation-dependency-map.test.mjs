import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import acceptanceSelection from '../scripts/equation-mapping/fixtures/mathematical-acceptance-selection.json' with {type:'json'};
import { preflight, validate, compare, compareDisplayedResult, sourcePaths, bindingsOf, select, sha256, MAP_PATH, NS } from '../scripts/equation-mapping/dependency-map-reader.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
// No real target is read before the hand-specified positive and negative controls.
await preflight();
const baseline = JSON.parse(fs.readFileSync(path.join(root, MAP_PATH)));
const files = new Map(sourcePaths(baseline).map(name => [name, fs.readFileSync(path.join(root, name))]));
const clone = () => structuredClone(baseline);
const row = (map, alias) => map['@graph'].find(r => r.alias === alias);
function refresh(map, inputs) {
  for (const item of map['@graph']) {
    const original = JSON.stringify(item);
    for (const binding of item.sourceBindings ?? item.justifications) binding.sha256 = sha256(select(inputs, binding));
    if (JSON.stringify(item) !== original) item.revisionId = 'changed-' + sha256(JSON.stringify(item));
  }
  for (const edge of map['@graph'].filter(r => r['@type'] === 'Relationship')) for (const side of ['from', 'to']) {
    const revision = map['@graph'].find(r => r['@id'] === edge[side + 'Object']).revisionId;
    if (revision !== edge[side + 'Revision']) { edge[side + 'Revision'] = revision; edge.revisionId = 'changed-' + sha256(JSON.stringify(edge)); }
  }
}
test('known controls precede retained map; unchanged selected set is empty', async () => {
  const report = await compare(files, baseline, files, baseline);
  assert.equal(report.objects, 22); assert.equal(report.relationships, 38); assert.deepEqual(report.selectedChecks, []);
});
test('stale sign rejects before query; refreshed sign keeps both obligations', async () => {
  const modified = new Map(files), b = row(baseline, 'sign').sourceBindings[0];
  const prior = select(files, b).toString(); assert.match(prior, /constant/u);
  modified.set(b.path, Buffer.from(files.get(b.path).toString().replace(prior, prior.replace('constant', 'variable'))));
  await assert.rejects(compare(files, baseline, modified, baseline), /Stale binding/u);
  const current = clone(); refresh(current, modified);
  assert.deepEqual((await compare(files, baseline, modified, current)).selectedChecks, ['prose-check', 'scientific-check']);
});
test('deleted sign dependency retains old downstream impact', async () => {
  const current = clone(); const from = row(current, 'proof')['@id'], to = row(current, 'sign')['@id'];
  current['@graph'] = current['@graph'].filter(r => !(r.fromObject === from && r.toObject === to));
  const report = await compare(files, baseline, files, current);
  assert.equal(report.removedRelations.length, 1); assert.equal(report.review, 'required');
  assert.deepEqual(report.selectedChecks, ['prose-check', 'scientific-check']);
  for (const alias of ['proof', 'identity', 'calculation', 'scientific-check', 'measured-prose']) assert.ok(report.affected.includes(alias));
});
test('deleted result coverage cannot remove its own review obligation', async () => {
  const current = clone(); const from = row(current, 'prose-check')['@id'], to = row(current, 'measured-prose')['@id'];
  current['@graph'] = current['@graph'].filter(r => !(r.kind === NS + 'checks' && r.fromObject === from && r.toObject === to));
  assert.deepEqual((await compare(files, baseline, files, current)).selectedChecks, ['prose-check']);
});
test('unsupported scalar dependency remains visible for human semantic review', async () => {
  const current = clone(); const edge = current['@graph'].find(r => r.fromObject === row(current, 'scalar')['@id'] && r.toObject === row(current, 'definitions')['@id']);
  edge.toObject = row(current, 'root-derivative')['@id']; edge.toRevision = row(current, 'root-derivative').revisionId; edge.revisionId = 'changed';
  const report = await compare(files, baseline, files, current); assert.equal(report.review, 'required'); assert.equal(report.changedRelations.length, 1);
});
test('outside-selector source edit retains conservative source review', async () => {
  const modified = new Map(files), name = row(baseline, 'sign').sourceBindings[0].path;
  modified.set(name, Buffer.concat([files.get(name), Buffer.from('\n<!-- unrelated control -->\n')]));
  const report = await compare(files, baseline, modified, baseline);
  assert.deepEqual(report.affected, []); assert.deepEqual(report.selectedChecks, ['prose-check', 'scientific-check']); assert.equal(report.review, 'required');
});
test('displayed match, wrong, missing and duplicate result controls', () => {
  const display = 'Across five step refinements, the largest component residual was $2.12\\times10^{-12}$';
  assert.equal(compareDisplayedResult(display, { maximumAbsoluteResidualAcrossRows: 2.1183055309847987e-12 }).status, 'pass');
  assert.equal(compareDisplayedResult(display.replace('2.12', '9.99'), { maximumAbsoluteResidualAcrossRows: 2.1183055309847987e-12 }).status, 'reject');
  assert.throws(() => compareDisplayedResult(display + display, {}), /exactly one/u); assert.throws(() => compareDisplayedResult('', {}), /exactly one/u);
});
test('unknown contexts, fields, duplicate IDs, paths, endpoints and revision reuse reject', async () => {
  const bad = [];
  let d = clone(); d['@context'] = 'https://example.invalid/remote'; bad.push(d);
  d = clone(); d.extra = true; bad.push(d);
  d = clone(); d['@graph'].push(d['@graph'][0]); bad.push(d);
  d = clone(); bindingsOf(d)[0].path = '../outside'; bad.push(d);
  d = clone(); d['@graph'].find(r => r['@type'] === 'Relationship').toRevision = 'wrong'; bad.push(d);
  for (const value of bad) await assert.rejects(validate(files, value));
  d = clone(); row(d, 'sign').scope = 'changed'; await assert.rejects(compare(files, baseline, files, d), /Version reuse/u);
});
test('actual CLI writes bounded execution evidence and replaces success on missing map', t => {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-entrypoint-')); t.after(() => fs.rmSync(output, { recursive: true, force: true }));
  const cli = path.join(root, 'scripts/equation-mapping/check-moving-single-root-map.mjs');
  const run = extra => spawnSync(process.execPath, [cli, '--repo', root, '--output-dir', output, '--acceptance-sha256', acceptanceSelection.acceptance.sha256, ...extra], { encoding: 'utf8', timeout: 120000 });
  const good = run([]); assert.equal(good.status, 0, good.stdout + good.stderr);
  let report = JSON.parse(fs.readFileSync(path.join(output, 'report.json'))); assert.equal(report.status, 'review-required');
  assert.deepEqual(report.executedChecks.map(r => r.label), ['scientific-check', 'prose-check', 'existing-scientific-test', 'finite-ledger-polynomial-check']);
  for (const item of report.executedChecks) assert.equal(item.status, 'pass');
  assert.equal(report.chains['finite-ledger-superposition'].baseline, 'operator-accepted-exact-predecessor');
  assert.equal(report.chains['finite-ledger-superposition'].review, 'unchanged-relative-to-selected-baseline');
  const manifestRaw = fs.readFileSync(path.join(output, 'review-manifest.json'));
  assert.equal(sha256(manifestRaw), report.reviewManifest.sha256);
  const manifest = JSON.parse(manifestRaw); assert.equal(manifest.approval, 'not-granted');
  assert.deepEqual(Object.keys(manifest.maps), ['moving-single-root', 'finite-ledger-superposition']);
  for (const [name, digest] of Object.entries(manifest.files)) assert.equal(sha256(fs.readFileSync(path.join(root, name))), digest);

  const bad = run(['--map', 'missing-map.jsonld']); assert.equal(bad.status, 1);
  report = JSON.parse(fs.readFileSync(path.join(output, 'report.json'))); assert.equal(report.status, 'error'); assert.equal(report.executedChecks.length, 0);
  assert.equal(fs.existsSync(path.join(output, 'review-manifest.json')), false);
});
test("actual publication command dispatcher executes B after unchanged repository validation commands", async t => {
  const { runValidationCommands } = await import('../scripts/pr-validation-receipt.mjs');
  const { spawnSync } = await import('node:child_process');
  const repo = path.resolve(import.meta.dirname, '..');
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-dispatch-'));
  t.after(() => fs.rmSync(output, { recursive: true, force: true }));
  let executed = false;
  // Other repository validation tools are not repeated here. B runs for real.
  const outcomes = runValidationCommands({ cwd: output, spawn: (node, args, options) => {
    if (!args[0].includes('check-moving-single-root-map')) return { status: 0 };
    executed = true;
    assert.deepEqual(args.slice(1),['--acceptance-sha256',acceptanceSelection.acceptance.sha256]);
    return spawnSync(node, [path.join(repo, args[0]), ...args.slice(1), '--repo', repo, '--output-dir', path.join(output, '.local-data/option-b-trial')], options);
  } });
  assert.equal(executed, true); assert.equal(outcomes[0].status, 'review-required'); assert.match(outcomes[0].reportSha256, /^[a-f0-9]{64}$/);
});

test('actual CLI rejects wrong display after science and stale or duplicate selectors before query', t => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-negative-cli-'));
  t.after(() => fs.rmSync(fixture, { recursive: true, force: true }));
  // Read-only Git object access to the reviewed snapshot; fixture writes stay in tmp.
  fs.symlinkSync(path.join(root, '.git'), path.join(fixture, '.git'));
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'));
  const extra = ['reference/priorities/development-process-review/analysis/option-b-first-chain-baseline-review.md', 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependencies.jsonld', 'reference/priorities/master-equation-closure/contracts/moving-single-root-dependency-map.md', 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependency-map.md', 'scripts/equation-mapping/verify-finite-ledger-superposition.mjs', 'tests/equation-dependency-map.test.mjs', 'tests/pr-validation-receipt.test.js', 'scripts/pr-validation-receipt.mjs', '.github/workflows/option-b-trial.yml', 'package.json', 'package-lock.json', 'scripts/equation-mapping/check-moving-single-root-map.mjs', 'scripts/equation-mapping/dependency-map-reader.mjs', 'reference/priorities/development-process-review/evidence/option-b-corrected-candidate/result_record_check.py'];
  extra.push(acceptanceSelection.acceptance.path,
    'reference/priorities/development-process-review/evidence/option-b-current-map-review-manifest.json',
    'reference/priorities/development-process-review/evidence/option-b-current-map-review-report.json',
    'scripts/equation-mapping/current-source-manifest.mjs',
    'scripts/equation-mapping/fixtures/known-hash-answers.json',
    'scripts/equation-mapping/fixtures/mathematical-acceptance-selection.json');
  for (const name of new Set([...sourcePaths(baseline), ...extra])) {
    fs.mkdirSync(path.dirname(path.join(fixture, name)), { recursive: true }); fs.copyFileSync(path.join(root, name), path.join(fixture, name));
  }
  const name = 'content/markdown/aaa/dynamics/master-equation.md', original = files.get(name).toString();
  const display = 'Across five step refinements, the largest component residual was $2.12\\times10^{-12}$';
  assert.equal(original.split(display).length, 2);
  fs.mkdirSync(path.dirname(path.join(fixture, MAP_PATH)), { recursive: true });
  for (const [label, changed] of [['wrong-display', original.replace(display, display.replace('2.12', '9.99'))], ['duplicate-display', original + '\n' + display + '\n'], ['finite-stale', original.replace('\\Phi_{\\mathcal B}\n=\n\\sum_{b\\in\\mathcal B}\\Phi_b.', '\\Phi_{\\mathcal B}\n=\nwrong_sum.')]]) {
    const inputs = new Map(files); inputs.set(name, Buffer.from(changed)); const map = clone();
    if (label === 'wrong-display') {
      for (const binding of bindingsOf(map)) if (binding.path === name && binding.selector.kind === 'literal') binding.selector.text = binding.selector.text.replace('2.12', '9.99');
      refresh(map, inputs);
    }
    fs.writeFileSync(path.join(fixture, name), changed); fs.writeFileSync(path.join(fixture, MAP_PATH), JSON.stringify(map, null, 2) + '\n');
    const output = path.join(fixture, 'outputs', label);
    const result = spawnSync(process.execPath, [path.join(fixture, 'scripts/equation-mapping/check-moving-single-root-map.mjs'), '--repo', fixture, '--output-dir', output, '--acceptance-sha256',acceptanceSelection.acceptance.sha256], { encoding: 'utf8', timeout: 120000 });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    const report = JSON.parse(fs.readFileSync(path.join(output, 'report.json'))); assert.equal(report.status, 'error');
    if (label === 'wrong-display') {
      assert.equal(report.executedChecks.find(x => x.label === 'scientific-check')?.status, 'pass');
      assert.equal(report.executedChecks.find(x => x.label === 'prose-check').status, 'reject');
    } else {
      assert.equal(report.executedChecks.length, 0);
      assert.match(report.error, /Missing or ambiguous literal/);
    }
  }
});


test('corrected prose coverage names fresh output and binds actual Node source', () => {
  assert.equal(baseline['@graph'].some(r => r['@id'] === NS + 'checks-prose-check-output'), false);
  const edge = baseline['@graph'].find(r => r['@id'] === NS + 'checks-prose-check-fresh-output');
  assert.equal(edge.toObject, row(baseline, 'fresh-output-contract')['@id']);
  assert.ok(edge.justifications.every(b => b.path.endsWith('.mjs')));
});

test('finite-ledger scope has no fabricated baseline; old/new controls retain review', async () => {
  const { inspectNewChain } = await import('../scripts/equation-mapping/dependency-map-reader.mjs');
  const finite = JSON.parse(fs.readFileSync(path.join(root, 'reference/priorities/master-equation-closure/contracts/finite-ledger-dependencies.jsonld')));
  const inputs = new Map(sourcePaths(finite).map(name => [name, fs.readFileSync(path.join(root, name))]));
  const pending = await inspectNewChain(inputs, finite);
  assert.equal(pending.baseline, 'not-established'); assert.equal(pending.review, 'required'); assert.equal(pending.approval, 'not-granted');
  assert.equal(pending.objects, 6); assert.equal(pending.relationships, 7);
  const quiet = await compare(inputs, finite, inputs, finite);
  assert.deepEqual(quiet.selectedChecks, []); assert.deepEqual(quiet.changedRelations, []);
  assert.equal(quiet.review, 'unchanged-relative-to-selected-baseline'); assert.equal(quiet.approval, 'not-granted');
  const ns = 'https://architrino.com/knowledge/finite-ledger/';
  for (const id of ['dependsOn-gradient-linearity-proof-per-row-gradient-premise', 'checks-finite-ledger-polynomial-check-finite-ledger-identity']) {
    const removed = structuredClone(finite); removed['@graph'] = removed['@graph'].filter(r => r['@id'] !== ns + id);
    const result = await compare(inputs, finite, inputs, removed);
    assert.equal(result.review, 'required'); assert.deepEqual(result.selectedChecks, ['finite-ledger-polynomial-check']); assert.equal(result.removedRelations.length, 1);
  }
  const changed = structuredClone(finite), edge = changed['@graph'].find(r => r['@id'] === ns + 'dependsOn-gradient-linearity-proof-finite-common-chart');
  edge.meaning = 'known unsupported infinite-sum extension'; edge.revisionId = 'negative/v1';
  assert.deepEqual((await compare(inputs, finite, inputs, changed)).selectedChecks, ['finite-ledger-polynomial-check']);
  const stale = new Map(inputs); stale.set('content/markdown/aaa/dynamics/master-equation.md', Buffer.from('removed source'));
  await assert.rejects(validate(stale, finite), /Missing or ambiguous literal/);
  await assert.rejects(compare(files, baseline, inputs, finite), /Cross-scope comparison/);
});
