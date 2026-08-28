import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, readdirSync, symlinkSync, openSync, ftruncateSync, closeSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createOrdinaryEvolutionTemplate, prepareOrdinaryEvolutionRequest, F5_HISTORY_EVIDENCE, SCHEMA } from '../scripts/eom/prepare-ordinary-evolution-request.mjs';
import { getBorgCertifiedBudgetPreset, canonicalStringify } from '../src/apps/borg/BorgCertifiedBudgets.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const script = resolve(root, 'scripts/eom/prepare-ordinary-evolution-request.mjs');
const clone = (value) => JSON.parse(JSON.stringify(value));
const hash = (value) => createHash('sha256').update(value).digest('hex');

// Explicit synthetic values only; no candidate strength/history is instantiated.
function fixture() {
  const value = createOrdinaryEvolutionTemplate('synthetic-two-path-control');
  value.releaseTime = '0'; value.historyCoverageStart = '-1';
  value.historyEvidence = [{ role: 'test-only-unverified', path: 'fixture-only.json', sha256: 'a'.repeat(64) }];
  const segment = { startTime: '-1', endTime: '0', coefficients: [['1.00', '-0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']], positionErrors: ['0.01', '0.01', '0.01'], velocityErrors: ['0.02', '0.02', '0.02'] };
  value.histories = [1, -1].map((polarity, i) => ({ pathId: `fixture-${i}`, sourceHistoryId: `fixture/past/${i}`, sourceFingerprint: `fixture-only-${i}`, polarity, segments: [clone(segment)] }));
  const preset = clone(getBorgCertifiedBudgetPreset('research-certified-v1'));
  const a = preset.allocations;
  value.settings = {
    runId: 'synthetic-not-a-run', endTime: '0.001',
    strength: { effectiveStrength: '12', chargeMagnitude: '2', coupling: '3' },
    numericalControls: { initialStep: a.controller.initialStep, minimumStep: a.controller.minimumStep, maximumStep: a.controller.maximumStep, useAdaptiveStepGrowth: a.controller.adaptiveGrowth, rootTolerance: a.ordinary.rootTimeEnclosure, accelerationTolerance: a.ordinary.accelerationEnclosure, farFieldEnclosureFraction: a.ordinary.farFieldEnclosureFraction, positionTolerance: a.ordinary.acceptedStepPosition, velocityTolerance: a.ordinary.acceptedStepVelocity, correctionTolerance: a.ordinary.correctionAccelerationResidual, threadCount: a.resources.workerThreads },
    coreScale: a.finiteWidth.coreScale,
    certifiedBudget: { presetId: preset.id, allocations: a, allocationCanonicalJson: preset.allocationCanonicalJson, allocationHash: preset.allocationHash },
    operationalLimits: { wallSeconds: 10, heartbeatSeconds: 1, aggregateRssBytes: 2 ** 30, rssSampleIntervalSeconds: 0.25, logBytes: 10000, outputBytes: 1000000, diskMinimumBytes: 10000000 },
  };
  return value;
}
function rehashBudget(value) {
  const b = value.settings.certifiedBudget; b.allocationCanonicalJson = canonicalStringify(b.allocations); b.allocationHash = hash(b.allocationCanonicalJson);
}
function noAuthority(value) {
  for (const key of ['accepted', 'executionAuthorized', 'eomExecuted', 'historyEvidenceAuthenticated', 'initialStateConformanceEstablished', 'physicalStrengthAuthorized', 'h3EvidenceEligible', 'scoreAuthorized']) assert.equal(value[key], false, key);
}

test('F5 template binds only known past metadata; every scientific/runtime setting stays unset', () => {
  const template = createOrdinaryEvolutionTemplate('f5'); const p = prepareOrdinaryEvolutionRequest(template);
  assert.equal(template.releaseTime, '0'); assert.equal(template.historyCoverageStart, '-1');
  assert.deepEqual(template.historyEvidence, F5_HISTORY_EVIDENCE); assert.equal(template.histories, null);
  assert.equal(template.historyEvidence[1].path, '.local-data/braid-analysis/f5-prehistory-handoff-20260827-v1/handoff-conformance.json');
  assert.deepEqual(Object.values(template.settings.strength), [null, null, null]);
  assert.ok(Object.values(template.settings.numericalControls).every((v) => v === null));
  assert.ok(Object.values(template.settings.operationalLimits).every((v) => v === null));
  assert.equal(p.wire, null); assert.equal(p.transportRequest, null); noAuthority(p);
  assert.ok(p.missingRequiredSettings.includes('settings.strength.effectiveStrength'));
  assert.ok(p.missingRequiredSettings.includes('histories'));
});
test('ABC templates do not choose release, cadence, history, or strength', () => {
  for (const id of ['a1-1', 'a1-2', 'a1-4', 'a2', 'a3-1', 'a3-2', 'a3-4', 'b1-1', 'b1-2', 'b1-3', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
    const x = createOrdinaryEvolutionTemplate(id); const p = prepareOrdinaryEvolutionRequest(x);
    assert.equal(x.releaseTime, null); assert.equal(x.historyCoverageStart, null); assert.equal(x.historyEvidence, null); assert.equal(x.histories, null);
    assert.ok(p.missingRequiredSettings.includes('releaseTime')); noAuthority(p);
  }
});
test('explicit synthetic complete request uses existing wire format and never gains authority', () => {
  const input = fixture(); const before = JSON.stringify(input); const p = prepareOrdinaryEvolutionRequest(input);
  assert.equal(p.status, 'mechanically-prepared-not-authorized'); assert.equal(p.segmentCount, 2); noAuthority(p);
  assert.equal(JSON.stringify(input), before);
  assert.equal(p.transportRequest.modelControls.fieldSpeed, '1');
  assert.equal(p.transportRequest.histories[0].charge, '2'); assert.equal(p.transportRequest.histories[1].charge, '-2');
  // Hand-written protocol expectations, not an encoder-vs-itself scientific oracle.
  const lines = p.wire.utf8.trimEnd().split('\n');
  assert.equal(lines[0], 'EOM_BORG_NATIVE_V10'); assert.equal(lines.at(-1), 'END');
  assert.equal(lines[2], 'PATH\tfixture-0\t2\t0\t0\t1');
  assert.equal(lines[3], 'SEG\t-1\t0\t1.00\t-0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0.01\t0.01\t0.01\t0.02\t0.02\t0.02');
  assert.equal(lines[1].split('\t')[8], '1'); assert.equal(lines[1].split('\t')[9], '3');
  assert.equal(hash(p.wire.utf8), p.wire.sha256); assert.equal(Buffer.byteLength(p.wire.utf8), p.wire.bytes);
});
test('namespace change, endpoint-state policy and actual publication switch are explicit', () => {
  const p = prepareOrdinaryEvolutionRequest(fixture());
  assert.deepEqual(p.historyNamespaceMapping[0], { pathId: 'fixture-0', sourceHistoryId: 'fixture/past/0', sourceFingerprint: 'fixture-only-0', consumerHistoryId: 'borg-eom-shadow/fixture-0', consumerFingerprint: null });
  assert.match(p.initialStatePolicy, /endpoint_state_hull/); assert.equal(p.transport.useQuarterStepPublication, true);
  assert.equal(p.transport.useFarFieldEnclosureInEvolution, false); assert.equal(p.transport.freshHistoryCache, true);
  assert.ok(!Object.hasOwn(p.transportRequest, 'initialState'));
});
test('partial budget reports its exact missing leaf without filling it', () => {
  const x = fixture(); delete x.settings.certifiedBudget.allocations.ordinary.rootTimeEnclosure;
  const p = prepareOrdinaryEvolutionRequest(x); assert.ok(p.missingRequiredSettings.includes('settings.certifiedBudget.allocations.ordinary.rootTimeEnclosure')); assert.equal(p.wire, null);
});
test('no hidden default coupling, charge magnitude, effective strength, or horizon', () => {
  for (const key of ['effectiveStrength', 'chargeMagnitude', 'coupling']) {
    const x = fixture(); x.settings.strength[key] = null; const p = prepareOrdinaryEvolutionRequest(x); assert.equal(p.wire, null); noAuthority(p);
  }
  const x = fixture(); x.settings.endTime = null; assert.equal(prepareOrdinaryEvolutionRequest(x).wire, null);
});
test('strength factorization is exact decimal equality, not rounded Number agreement', () => {
  const x = fixture(); x.settings.strength.effectiveStrength = '12.00000000000000000000000000001'; assert.throws(() => prepareOrdinaryEvolutionRequest(x), /exactly/);
  for (const token of ['0', '-1', '1e-1000', 'Infinity', 'NaN', 12]) { const y = fixture(); y.settings.strength.effectiveStrength = token; assert.throws(() => prepareOrdinaryEvolutionRequest(y)); }
  x.settings.strength = { effectiveStrength: '1.2e1', chargeMagnitude: '+2.0', coupling: '3.00' };
  assert.equal(prepareOrdinaryEvolutionRequest(x).transportRequest.histories[1].charge, '-2.0');
});
test('forbids independent initial-state, future, display/cache and unrecognized overrides', () => {
  for (const patch of [x => { x.initialState = {}; }, x => { x.futurePath = []; }, x => { x.settings.chartPolicy = 'display'; }, x => { x.settings.numericalControls.useQuarterStepPublication = false; }, x => { x.histories[0].charge = '9'; }, x => { x.histories[0].segments[0].nominalRelease = [0, 0, 0]; }]) {
    const x = fixture(); patch(x); assert.throws(() => prepareOrdinaryEvolutionRequest(x), /unexpected field/);
  }
});
test('rejects future, endpoint substitution, gap, overlap, reversed and binary-collapsed domains', () => {
  for (const patch of [x => { x.histories[0].segments[0].endTime = '0.0001'; }, x => { x.histories[0].segments[0].endTime = '0.0'; }, x => { x.histories[0].segments[0].startTime = '-0.9'; }, x => { x.histories[0].segments.push(clone(x.histories[0].segments[0])); }, x => { x.histories[0].segments[0].endTime = '-2'; }, x => { x.settings.endTime = '0'; }]) {
    const x = fixture(); patch(x); assert.throws(() => prepareOrdinaryEvolutionRequest(x));
  }
  const x = fixture(); x.releaseTime = '1.0000000000000000001'; x.historyCoverageStart = '1';
  for (const h of x.histories) { h.segments[0].startTime = '1'; h.segments[0].endTime = x.releaseTime; }
  assert.throws(() => prepareOrdinaryEvolutionRequest(x), /degenerate/);
});
test('rejects malformed/negative errors, coefficients, numeric tokens and duplicate identities', () => {
  for (const patch of [x => { x.histories[0].segments[0].coefficients[0] = ['1']; }, x => { x.histories[0].segments[0].positionErrors[0] = '-1'; }, x => { x.histories[0].segments[0].velocityErrors = ['0']; }, x => { x.histories[0].segments[0].coefficients[0][0] = 1; }, x => { x.histories[0].segments[0].coefficients[0][0] = '1\t2'; }, x => { x.histories[1].pathId = x.histories[0].pathId; }, x => { x.histories[1].sourceHistoryId = x.histories[0].sourceHistoryId; }, x => { x.histories[0].polarity = 0; }]) {
    const x = fixture(); patch(x); assert.throws(() => prepareOrdinaryEvolutionRequest(x));
  }
});
test('canonical budget, metadata, exact tokens and actual transport switches are separate gates', () => {
  for (const patch of [x => { x.settings.certifiedBudget.allocationHash = 'b'.repeat(64); }, x => { x.settings.certifiedBudget.allocationCanonicalJson += ' '; }, x => { x.settings.certifiedBudget.allocations.precision.forceEventPrecisionEscalation = true; rehashBudget(x); }, x => { x.settings.numericalControls.rootTolerance = '0.00100000000000000000001'; }, x => { x.settings.certifiedBudget.allocations.ordinary.transmitterFactorFloor = '-1'; rehashBudget(x); }, x => { x.settings.certifiedBudget.allocations.resources.workerThreads = 0; rehashBudget(x); }, x => { x.settings.certifiedBudget.allocations.precision.roundingMode = 'nearest'; rehashBudget(x); }]) {
    const x = fixture(); patch(x); assert.throws(() => prepareOrdinaryEvolutionRequest(x));
  }
});
test('declared operational bounds are required and never claimed to be measured or enforced', () => {
  const x = fixture(); x.settings.operationalLimits.wallSeconds = null;
  const p = prepareOrdinaryEvolutionRequest(x); assert.equal(p.wire, null); assert.equal(p.input.settings.operationalLimits.wallSeconds, null);
  for (const patch of [y => { y.settings.operationalLimits.wallSeconds = 0; }, y => { y.settings.operationalLimits.aggregateRssBytes = 1; }, y => { y.settings.operationalLimits.heartbeatSeconds = 11; }, y => { y.settings.operationalLimits.outputBytes = 1.5; }]) {
    const y = fixture(); patch(y); assert.throws(() => prepareOrdinaryEvolutionRequest(y));
  }
});
test('F5 cut cannot silently change and caller objects are not mutated', () => {
  const x = createOrdinaryEvolutionTemplate('f5'); x.releaseTime = '4'; assert.throws(() => prepareOrdinaryEvolutionRequest(x), /F5/);
  const y = createOrdinaryEvolutionTemplate('f5'); y.historyEvidence[0].sha256 = 'b'.repeat(64); assert.equal(F5_HISTORY_EVIDENCE[0].sha256[0], '4');
});
test('module import and pure preparation cannot start processes or create files', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ordinary-import-'));
  const code = `import cp from 'node:child_process'; import fs from 'node:fs'; import {syncBuiltinESMExports} from 'node:module';
    for(const k of ['spawn','spawnSync','exec','execSync','execFile','execFileSync','fork']) cp[k]=()=>{throw Error('process launch forbidden')};
    for(const k of ['mkdirSync','mkdtempSync','writeFileSync','appendFileSync','rmSync']) fs[k]=()=>{throw Error('write forbidden')}; syncBuiltinESMExports();
    const m=await import(${JSON.stringify(pathToFileURL(script).href)}); const p=m.prepareOrdinaryEvolutionRequest(m.createOrdinaryEvolutionTemplate('c1')); if(p.accepted!==false||p.wire!==null)throw Error('authority');`;
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', code], { cwd: dir, encoding: 'utf8', timeout: 3000 });
  assert.equal(r.status, 0, r.stderr); assert.deepEqual(readdirSync(dir), []);
});
test('fresh CLI writes create-exclusive preparation only and reports exact bytes', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ordinary-prepare-')); const out = join(dir, 'prepared.json');
  const run = () => spawnSync(process.execPath, [script, '--template', 'c2', '--out', out], { encoding: 'utf8', timeout: 3000 });
  const a = run(); assert.equal(a.status, 0, a.stderr); const completion = JSON.parse(a.stdout); const bytes = readFileSync(out); const record = JSON.parse(bytes);
  assert.equal(completion.sha256, hash(bytes)); assert.equal(completion.bytes, bytes.length); assert.equal(record.schema, SCHEMA); noAuthority(record);
  assert.equal(record.input.releaseTime, null); const b = run(); assert.equal(b.status, 1); assert.equal(hash(readFileSync(out)), completion.sha256);
});
test('CLI binds input bytes; malformed args, symlink, directory and invalid data fail without output', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ordinary-input-')); const input = join(dir, 'input.json'); const output = join(dir, 'output.json');
  writeFileSync(input, JSON.stringify(fixture()));
  const r = spawnSync(process.execPath, [script, '--input', input, '--out', output], { encoding: 'utf8', timeout: 3000 });
  assert.equal(r.status, 0, r.stderr); const p = JSON.parse(readFileSync(output)); assert.equal(p.inputBytes.sha256, hash(readFileSync(input))); noAuthority(p);
  const link = join(dir, 'link.json'); symlinkSync(input, link);
  for (const args of [['--input', link], ['--input', dir], ['--execute', input]]) {
    const dest = join(dir, `failed-${args[0]}-${args[1]===dir ? 'dir' : 'other'}.json`);
    const bad = spawnSync(process.execPath, [script, ...args, '--out', dest], { encoding: 'utf8', timeout: 3000 }); assert.equal(bad.status, 1); assert.equal(existsSync(dest), false);
  }
});
test('CLI rejects a FIFO promptly and bounds regular-file capture before parsing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ordinary-bounded-')); const fifo = join(dir, 'input.fifo');
  const made = spawnSync('/usr/bin/mkfifo', [fifo], { encoding: 'utf8', timeout: 1000 }); assert.equal(made.status, 0, made.stderr);
  const sparse = join(dir, 'oversize.json'); const fd = openSync(sparse, 'wx'); try { ftruncateSync(fd, 16 * 1024 * 1024 + 1); } finally { closeSync(fd); }
  for (const input of [fifo, sparse]) {
    const out = join(dir, input === fifo ? 'fifo-output.json' : 'size-output.json');
    const r = spawnSync(process.execPath, [script, '--input', input, '--out', out], { encoding: 'utf8', timeout: 2000 });
    assert.equal(r.status, 1, r.stderr); assert.match(r.stderr, /bounded regular file/); assert.equal(existsSync(out), false);
  }
});
test('exact time comparison rejects a future tail invisible to Number at release', () => {
  const x = fixture(); x.releaseTime = '1'; x.historyCoverageStart = '0';
  for (const h of x.histories) { h.segments[0].startTime = '0'; h.segments[0].endTime = '1'; }
  x.histories[0].segments[0].endTime = '1.0000000000000000000000000000001';
  assert.throws(() => prepareOrdinaryEvolutionRequest(x), /supplied future/);
});
test('public API detached outputs cannot mutate supplied geometry or other templates', () => {
  const x = fixture(); const p = prepareOrdinaryEvolutionRequest(x); p.transportRequest.histories[0].segments[0].coefficients[0][0] = '999';
  assert.equal(x.histories[0].segments[0].coefficients[0][0], '1.00'); assert.equal(p.input.histories[0].segments[0].coefficients[0][0], '1.00');
  const a = createOrdinaryEvolutionTemplate('f5'); a.settings.numericalControls.initialStep = '1'; assert.equal(createOrdinaryEvolutionTemplate('f5').settings.numericalControls.initialStep, null);
});
