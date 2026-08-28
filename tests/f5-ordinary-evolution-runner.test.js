import test from 'node:test';
import assert from 'node:assert/strict';
import { closeSync, existsSync, mkdtempSync, mkdirSync, openSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, unlinkSync, writeFileSync, writeSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { acquireLock, admitInspection, assertBeforeDeadline, authenticateBindings, canonicalFreshOutput, capture,
  checkOutputBudget, classifyEvaluation, createEvaluationSchedule, makePreparedRequest, parseProcessTable, parseUniqueJson, publish, readJson,
  releaseLock, requiredSourcePaths, runWatched, sha256, validateLauncherEnvironment, validateOperationalSchedule, validateSourceInventory, writeAll } from '../scripts/eom/run-f5-ordinary-evolution.mjs';
import { assertScientificGeneration, STAGE_GATE } from '../scripts/eom/f5-batch-admission.mjs';
import { admitTargetStart, terminalCensus } from '../scripts/eom/run-f5-complete-evaluator-batch.mjs';

// Synthetic constant carriers exercise metadata only, never candidate dynamics.
function fixture() {
  const d = JSON.parse(readFileSync(new URL('../reference/priorities/braid-program/evidence/2026-08-27-f5-ordinary-evolution-declaration.v1.json', import.meta.url)));
  d.authorization = { approved: true, operatorMessage: 'synthetic metadata control only', effectiveStrength: '0.002', chargeMagnitude: '1', coupling: '0.002' };
  const bits = value => { const b = Buffer.alloc(8); b.writeDoubleBE(value); return b.toString('hex'); };
  const endpointState = Object.fromEntries(['position', 'velocity'].map(kind => [kind, Array.from({ length: 3 }, () => ({ lowerBits: bits(kind === 'position' ? 0.99 : -0.01), upperBits: bits(kind === 'position' ? 1.01 : 0.01) }))]));
  const h = { members: Array.from({ length: 12 }, (_, i) => ({ worldlineId: `synthetic-${i}`, restrictedHistoryId: `synthetic-history/${i}`,
    historyFingerprint: `synthetic-fingerprint-${i}`, polarity: i < 6 ? 1 : -1, release: { endpointState },
    segments: Array.from({ length: 51 }, (_, j) => ({ tStart: String(-1 + j / 51), tEnd: j === 50 ? '0' : String(-1 + (j + 1) / 51),
      coefficients: [['1', '0', '0', '0'], ['1', '0', '0', '0'], ['1', '0', '0', '0']], positionErrors: ['0.01', '0.01', '0.01'], velocityErrors: ['0.01', '0.01', '0.01'] })) })) };
  const prepared = makePreparedRequest(d, d.rungs[0], h);
  const actual = { schema: 'eom_borg_request_inspection/v1', status: 'parser-inspection-only', parserInspected: true, requestValidated: false, rootsEvaluated: false,
    eomExecuted: false, executionAuthorized: false, scienceApproved: false, runId: prepared.transportRequest.runId,
    fieldSpeed: '1', coupling: '0.002', startTime: '0', endTime: '0.5', runTokens: prepared.wire.utf8.split('\n')[1].split('\t'),
    resolvedParserControls: { useQuarterStepPublication: true, useFarFieldEnclosureInEvolution: false, useCertifiedTraversal: false,
      forceEventPrecisionEscalation: false, traversalExactTilePairLimit: 64, jointHistoryCount: 0, freshHistoryCache: true },
    paths: h.members.map((m, i) => ({ pathId: m.worldlineId, charge: i < 6 ? '1' : '-1', stateFlags: 0,
      historyId: `borg-eom-shadow/${m.worldlineId}`, historyFingerprint: m.historyFingerprint, segmentCount: 51,
      segments: structuredClone(prepared.transportRequest.histories[i].segments),
      endpointState: Object.fromEntries(['position', 'velocity'].map(kind => [kind, m.release.endpointState[kind].map(box => ({ ...box,
        lower: Buffer.from(box.lowerBits, 'hex').readDoubleBE(), upper: Buffer.from(box.upperBits, 'hex').readDoubleBE() }))])) })) };
  return { d, h, prepared, actual };
}

test('mapping refuses missing operator authority and preserves explicit sharp settings', () => {
  const { d, h, prepared } = fixture();
  assert.equal(prepared.eomExecuted, false);
  assert.equal(prepared.transportRequest.certifiedBudget.allocations.ordinary.chartPolicy, 'sharp');
  assert.equal(prepared.transportRequest.modelControls.fieldSpeed, '1');
  d.authorization.approved = false;
  assert.throws(() => makePreparedRequest(d, d.rungs[0], h), /authorization/);
});
test('inspection admission preserves all synthetic past tokens and known endpoint bits', () => {
  const { h, prepared, actual } = fixture();
  assert.equal(admitInspection(actual, prepared, h).dataConformanceEstablished, true);
  assert.equal(admitInspection(actual, prepared, h).fullEomRequestValidationEstablished, false);
});
test('inspection admission rejects token, wire, fingerprint, endpoint and authority mutations', () => {
  for (const mutate of [
    x => { x.actual.paths[0].segments[0].coefficients[0][0] = '2'; },
    x => { x.actual.paths[0].endpointState.position[0].lowerBits = '0000000000000000'; },
    x => { x.actual.paths[0].endpointState.position[0].lower = 0; },
    x => { x.actual.paths[0].historyFingerprint = 'wrong'; },
    x => { x.actual.runTokens[9] = '1'; },
    x => { x.prepared.wire.utf8 += 'EXTRA\n'; },
    x => { x.actual.eomExecuted = true; },
    x => { x.actual.resolvedParserControls.jointHistoryCount = 1; },
    x => { x.actual.paths.pop(); },
    x => { x.actual.coupling = '1'; },
    x => { x.actual.status = 'validated'; },
    x => { x.actual.paths[0].endpointState.position[0].lower = '0.99'; },
    x => { x.actual.paths[0].endpointState.position.push({ lower: 0, upper: 1 }); },
  ]) {
    const x = fixture(); mutate(x);
    assert.throws(() => admitInspection(x.actual, x.prepared, x.h));
  }
});

test('declaration rejects ignored scientific flags, unsafe IDs, and invalid limit shapes', () => {
  for (const mutate of [
    d => { d.scientificConditions.candidateId = 'f6c'; },
    d => { d.scientificConditions.releaseTime = '1'; },
    d => { d.scientificConditions.historyStart = '-2'; },
    d => { d.commonNumericalControls.quarterStepPublication = false; },
    d => { d.commonNumericalControls.useFarFieldEnclosureInEvolution = true; },
    d => { d.rungs[0].id = '../escape'; },
    d => { d.rungs[0].id = d.rungs[1].id; },
    d => { d.operationalLimits.aggregateOutputBytes = '10000'; },
    d => { d.operationalLimits.maximumRssSampleGapSeconds = NaN; },
  ]) { const { d, h } = fixture(); mutate(d); assert.throws(() => makePreparedRequest(d, d.rungs[0], h)); }
});

function temporary(t) {
  const retained=process.env.F5_CONTROL_OUTPUT_DIR;
  const dir=realpathSync(mkdtempSync(resolve(retained ? realpathSync(retained) : tmpdir(),'f5-runner-control-')));
  if(!retained)t.after(()=>rmSync(dir,{recursive:true,force:true}));
  return dir;
}

function scheduledFixture() {
  const f = fixture(), d = f.d;
  const stages = d.rungs.flatMap(r => [
    { id: `${r.id}-inspection`, wallSeconds: 600, preparationSeconds: 30 },
    { id: `${r.id}-evolution`, wallSeconds: 600, preparationSeconds: 30 },
    { id: `${r.id}-geometry-process`, wallSeconds: 300, preparationSeconds: 30 },
  ]);
  for (let i = 1; i < d.rungs.length; i++) stages.push({ id: `${d.rungs[i - 1].id}-${d.rungs[i].id}-sensitivity-process`, wallSeconds: 300, preparationSeconds: 30 });
  stages.push({ id: 'independent-dynamics-process', wallSeconds: 900, preparationSeconds: 30 });
  d.operationalSchedule = { schema: 'braid-program/f5-operational-schedule.v1', startupSeconds: 120, stages, finalizationSeconds: 120 };
  d.operationalLimits.evaluationWallSeconds = 6600;
  return f;
}
test('optional full-stage schedule preserves prepared scientific bytes and absent-field behavior', () => {
  const { d, h, prepared } = scheduledFixture();
  assert.equal(validateOperationalSchedule(d).totalSeconds, 6600);
  assert.equal(makePreparedRequest(d, d.rungs[0], h).wire.utf8, prepared.wire.utf8);
  delete d.operationalSchedule;
  assert.equal(createEvaluationSchedule(d, 0, 1), null);
  assert.equal(makePreparedRequest(d, d.rungs[0], h).wire.utf8, prepared.wire.utf8);
});
test('schedule rejects missing, repeated, reordered, oversized and unrecognized allocations', () => {
  for (const mutate of [
    s => s.stages.pop(), s => { s.stages[1] = { ...s.stages[0] }; },
    s => { [s.stages[0], s.stages[1]] = [s.stages[1], s.stages[0]]; },
    s => { s.stages[0].wallSeconds = 1801; }, s => { s.stages[0].preparationSeconds = -1; },
    s => { s.finalizationSeconds = 121; }, s => { s.stages[0].unreviewed = true; },
    s => { s.startupSeconds = NaN; }, s => { s.extraReserve = 1; },
  ]) { const { d } = scheduledFixture(); mutate(d.operationalSchedule); assert.throws(() => validateOperationalSchedule(d)); }
});
test('complete schedule rejects a clipped inclusive deadline before any stage', () => {
  const { d } = scheduledFixture();
  assert.throws(() => createEvaluationSchedule(d, 1000, 6600999, () => 1000), /does not fit/);
});
test('schedule suffix preserves all successor allowances and final reserve after each terminal stage', () => {
  const { d } = scheduledFixture(); let time = 1000;
  const guard = createEvaluationSchedule(d, time, time + 6600000, () => time);
  time += 120000;
  for (const stage of d.operationalSchedule.stages) {
    assert.equal(guard.begin(stage.id), stage.wallSeconds);
    time += 29000; guard.watchStarted(stage.id);
    time += 1000; guard.beforeSpawn(stage.id); guard.beforeSpawn(stage.id);
    assert.equal(guard.report().completedStages, d.operationalSchedule.stages.indexOf(stage));
    time += (stage.wallSeconds - 1) * 1000; guard.complete(stage.id);
  }
  guard.enterFinalization(); guard.assertFinalization();
  const report = guard.report();
  assert.equal(report.completedStages, 12); assert.equal(report.externalReviewCompleted, false);
  assert.equal(report.stages.at(-1).remainingRequiredSeconds, 120);
  assert.equal(report.stages.every(s => s.spawnChecks === 2), true);
  assert.equal(report.stages.every(s => s.watchedElapsedSeconds === s.wallSeconds), true);
  time += 120000; assert.throws(() => guard.assertFinalization(), /finalization reserve exhausted/);
});
test('schedule rejects exhausted startup, preparation, missing terminal stages and clock rollback', () => {
  for (const fault of ['startup', 'preparation', 'terminal', 'clock']) {
    const { d } = scheduledFixture(); let time = 1000;
    const guard = createEvaluationSchedule(d, time, time + 6600000, () => time), id = d.operationalSchedule.stages[0].id;
    if (fault === 'startup') { time += 120001; assert.throws(() => guard.begin(id), /startup reserve/); }
    if (fault === 'preparation') { guard.begin(id); time += 30001; assert.throws(() => guard.watchStarted(id), /preparation reserve/); }
    if (fault === 'terminal') { guard.begin(id); assert.throws(() => guard.complete(id), /terminal spawn/); assert.throws(() => guard.enterFinalization(), /mandatory/); }
    if (fault === 'clock') { guard.begin(id); time--; assert.throws(() => guard.beforeSpawn(id), /clock moved backwards/); }
  }
});
test('stage allowance includes asynchronous preflight and is not restarted at target spawn', () => {
  const { d } = scheduledFixture(); let time = 1000;
  const guard = createEvaluationSchedule(d, time, time + 6600000, () => time), id = d.operationalSchedule.stages[0].id;
  guard.begin(id); guard.watchStarted(id); time += 1000; guard.beforeSpawn(id);
  time += 600000; assert.throws(() => guard.complete(id), /watched stage allowance/);
});
const controlLimits = { wallSeconds: 8, heartbeatSeconds: 15, aggregateRssBytes: 2 * 1024 ** 3,
  rssSampleIntervalSeconds: 0.03, maximumRssSampleGapSeconds: 2, logBytes: 1024 ** 2, outputBytes: 1024 ** 2,
  aggregateOutputBytes: 8 * 1024 ** 2, diskMinimumBytes: 1, minimumHostMemoryFreePercent: 1 };
const healthyProbe = async () => 'System-wide memory free percentage: 99%';
const processControls = process.env.F5_RUN_PROCESS_CONTROLS === '1';
const realTable = async () => parseProcessTable(execFileSync('/bin/ps', ['-axo', 'pid=,ppid=,pgid=,rss=,time=,comm='], { encoding: 'utf8', timeout: 1500 }));
function isAlive(pid) { try { process.kill(pid, 0); return true; } catch (e) { if (e.code === 'ESRCH') return false; throw e; } }

test('duplicate and escaped duplicate JSON keys, malformed UTF-8, trailing values are rejected', () => {
  assert.deepEqual(parseUniqueJson(Buffer.from('{"a":[1,{"b":true}]}')), { a: [1, { b: true }] });
  for (const text of ['{"a":1,"a":2}', '{"a":1,"\\u0061":2}', '{"nested":{"x":1,"x":2}}', '{}{}', '[1,]', '{"a":NaN}'])
    assert.throws(() => parseUniqueJson(Buffer.from(text)));
  assert.throws(() => parseUniqueJson(Buffer.from([0xff])));
});
test('bounded nofollow capture rejects symlink and size overflow; changed checker fails authentication', t => {
  const dir = temporary(t), path = resolve(dir, 'checker.json'), link = resolve(dir, 'link.json');
  writeFileSync(path, '{"accepted":true}'); const original = readJson(path); symlinkSync(path, link);
  assert.throws(() => capture(link)); assert.throws(() => capture(path, 2));
  authenticateBindings([original]); writeFileSync(path, '{"accepted":false}'); assert.throws(() => authenticateBindings([original]));
});
test('runtime alias retarget cannot reuse a still-valid old binary binding', t => {
  const dir = temporary(t), original = resolve(dir, 'original'), other = resolve(dir, 'other'), alias = resolve(dir, 'runtime');
  writeFileSync(original, 'same bytes'); writeFileSync(other, 'same bytes'); symlinkSync(original, alias);
  const binding = { path: original, bytes: 10, sha256: sha256(Buffer.from('same bytes')), invokedPaths: [alias] };
  authenticateBindings([binding]); unlinkSync(alias); symlinkSync(other, alias);
  assert.throws(() => authenticateBindings([binding]), /runtime alias/);
});
test('short writes complete every byte; zero writes fail', t => {
  const path = resolve(temporary(t), 'short'), fd = openSync(path, 'wx'), data = Buffer.from('0123456789');
  try { writeAll(fd, data, (f, b, offset, length) => writeSync(f, b, offset, Math.min(2, length))); } finally { closeSync(fd); }
  assert.equal(readFileSync(path).toString(), data.toString()); assert.throws(() => writeAll(0, data, () => 0));
});
test('aggregate budget includes child --out files and final publications', t => {
  const dir = temporary(t), limits = { outputBytes: 16, aggregateOutputBytes: 20 };
  writeFileSync(resolve(dir, 'checker-output'), '123456789012');
  assert.throws(() => publish(resolve(dir, 'receipt'), { larger: true }, { root: dir, limits }), /limit/);
  writeFileSync(resolve(dir, 'second'), '123456789'); assert.throws(() => checkOutputBudget(dir, limits), /aggregate/);
  writeFileSync(resolve(dir, 'oversize'), '1'.repeat(17)); assert.throws(() => checkOutputBudget(dir, limits), /per-file/);
});
test('canonical output rejects symlink ancestor', t => {
  const dir = temporary(t), real = resolve(dir, 'real'); mkdirSync(real); symlinkSync(real, resolve(dir, 'alias'));
  assert.equal(canonicalFreshOutput(resolve(real, 'fresh'), dir), resolve(real, 'fresh'));
  assert.throws(() => canonicalFreshOutput(resolve(dir, 'alias/fresh'), dir));
});
test('required inventory cannot omit checker, current runtime or transitive encoder source', () => {
  const d = fixture().d; d.runtime.python = process.execPath; d.runtime.node = process.execPath; d.sourceBindings = [];
  const paths = requiredSourcePaths(d);
  for (const suffix of ['scripts/eom/run-f5-ordinary-evolution.mjs', 'scripts/eom/verify-f5-ordinary-evolution.py',
    'scripts/eom/BorgNativeEomProcessClient.mjs', 'src/apps/borg/BorgCausalHistoryRetention.js', 'src/eom/src/CoupledEvolution.cpp'])
    assert(paths.some(p => p.endsWith(suffix)), suffix);
  assert.throws(() => validateSourceInventory(d), /required source/);
});
test('undeclared injection and runtime options fail closed', () => {
  validateLauncherEnvironment({ PATH: '/bin', AAA_VENV: '/declared/venv' }, []);
  for (const key of ['NODE_OPTIONS', 'NODE_PATH', 'PYTHONPATH', 'PYTHONHOME', 'DYLD_INSERT_LIBRARIES', 'LD_PRELOAD'])
    assert.throws(() => validateLauncherEnvironment({ [key]: 'injection' }, []), /runtime environment/);
  assert.throws(() => validateLauncherEnvironment({}, ['--require', 'unbound.js']), /runtime options/);
});
test('lock replacement is never removed', t => {
  const dir = temporary(t), path = resolve(dir, '.lock'), lock = acquireLock(path, { owner: 'synthetic' });
  writeFileSync(resolve(dir, 'replacement'), '{"owner":"synthetic"}'); renameSync(resolve(dir, 'replacement'), path);
  assert.throws(() => releaseLock(lock), /identity changed/); assert(existsSync(path));
});
test('completed and unresolved evidence status depends on actual reference outputs', () => {
  const results = [{ response: { value: { acceptedEndTime: '0.1' } } }], comparison = [{ operation: { processSucceeded: true }, result: { value: { comparison: { passed: true } } } }];
  assert.match(classifyEvaluation(results, comparison, { processSucceeded: false }, { value: { accepted: false } }).status, /^unresolved/);
  assert.match(classifyEvaluation(results, comparison, { processSucceeded: true }, { value: { accepted: true } }).status, /^evidence-ready/);
  assert.throws(() => assertBeforeDeadline(Date.now() - 1));
});
test('prelaunch stop cannot execute a process even when preflight completes', async t => {
  const dir = temporary(t), marker = resolve(dir, 'must-not-exist'), abortState = { stopped: false };
  const result = await runWatched({ command: process.execPath, args: ['-e', `require('fs').writeFileSync(${JSON.stringify(marker)},'bad')`],
    output: resolve(dir, 'stage'), limits: controlLimits, abortState,
    testHooks: { processTable: async () => [], probe: healthyProbe }, beforeSpawn: () => { abortState.stopped = true; } });
  assert.equal(result.processSucceeded, false); assert.equal(result.pid, null); assert(!existsSync(marker));
});

for (const fault of ['sampler', 'logging']) test(`bounded process control: TERM-ignoring child closes after ${fault} failure`, { skip: !processControls, timeout: 15000 }, async t => {
  const dir = temporary(t), marker = resolve(dir, 'ready'), output = resolve(dir, 'stage'); let samplingReady = false;
  const source = `process.on('SIGTERM',()=>{});require('fs').writeFileSync(${JSON.stringify(marker)},String(process.pid));console.log('ready');setInterval(()=>{},1000);`;
  const result = await runWatched({ command: process.execPath, args: ['-e', source], output, limits: controlLimits,
    testHooks: { probe: healthyProbe, processTable: async () => { const rows = await realTable(); if (fault === 'sampler' && existsSync(marker)) { samplingReady = true; throw new Error('synthetic sampler lost'); } return rows; },
      write: (fd, bytes, offset, length) => { if (fault === 'logging' && existsSync(marker)) throw new Error('synthetic log failed'); return writeSync(fd, bytes, offset, length); } } });
  const pid = Number(readFileSync(marker)); assert(!isAlive(pid)); assert.equal(result.processSucceeded, false); assert.equal(result.processGroupClosed, true);
  assert.match(result.failure, fault === 'sampler' ? /sampler/ : /log/); if (fault === 'sampler') assert(samplingReady);
});
test('bounded process control: missing executable closes descriptors and reports spawn failure', { skip: !processControls, timeout: 5000 }, async t => {
  const dir = temporary(t), result = await runWatched({ command: resolve(dir, 'missing'), args: [], output: resolve(dir, 'stage'), limits: controlLimits,
    testHooks: { probe: healthyProbe, processTable: realTable } });
  assert.equal(result.processSucceeded, false); assert.equal(result.processGroupClosed, true); assert.match(result.exit.spawnError, /ENOENT/);
});
test('bounded process control: finalization after deadline is not successful', { skip: !processControls, timeout: 5000 }, async t => {
  const dir = temporary(t), deadline = Date.now() + 800;
  await assert.rejects(runWatched({ command: process.execPath, args: ['-e', 'process.stdout.write("{}")'], output: resolve(dir, 'stage'), limits: controlLimits, deadlineEpochMs: deadline,
    testHooks: { probe: healthyProbe, processTable: realTable, afterPublication: () => { while (Date.now() <= deadline) {} } } }), /finalization deadline/);
});
test('process table parser retains group and sampled memory without reading command arguments', () => {
  assert.deepEqual(parseProcessTable(' 42 1 42 100 0:00.12 /a program\n'), [{ pid: 42, ppid: 1, pgid: 42, rssBytes: 102400, cpuTime: '0:00.12', executable: '/a program' }]);
  assert.throws(() => parseProcessTable('malformed'));
});

test('operational successor cannot change science, deadline, reference or EOM generation', () => {
  const original=fixture().d, current=structuredClone(original);
  current.operationalAdmission={mode:'registered-batch-v1'};
  current.independentDeclarationReview='new-review.json';
  current.sourceBindings.find(b=>b.path.endsWith('run-f5-ordinary-evolution.mjs')).sha256='0'.repeat(64);
  assert.doesNotThrow(()=>assertScientificGeneration(original,current));
  for(const mutate of [
    d=>{d.authorization.effectiveStrength='0.003';},
    d=>{d.scientificConditions.endTime='1';},
    d=>{d.campaignDeadline='2027-01-01T00:00:00Z';},
    d=>{d.operationalLimits.wallSeconds++;},
    d=>{d.sourceBindings.find(b=>b.path.endsWith('CoupledEvolution.cpp')).sha256='1'.repeat(64);},
    d=>{d.sourceBindings.find(b=>b.path.endsWith('verify-f5-ordinary-evolution.py')).sha256='2'.repeat(64);},
  ]) { const changed=structuredClone(current);mutate(changed);assert.throws(()=>assertScientificGeneration(original,changed)); }
});
test('old historical declaration rejects the changed live operational caller', () => {
  const d=fixture().d;
  const caller=d.sourceBindings.find(b=>b.path.endsWith('run-f5-ordinary-evolution.mjs'));
  assert.notEqual(capture(caller.path).sha256,caller.sha256);
  assert.throws(()=>authenticateBindings([caller]),/changed binding|bounded regular input required/);
});
test('final census preserves failed and unstarted cases and rejects omission or running cases', () => {
  const cases=[{id:'serial-1',replicaId:'replica-1',expected:'complete-bounded-unresolved',output:'/one'},
    {id:'serial-2',replicaId:'replica-2',expected:'complete-bounded-unresolved',output:'/two'}];
  const states=new Map([['serial-1',{status:'failed',failure:'exit zero without terminal result',exit:{code:0,signal:null}}],['serial-2',{status:'not-started'}]]);
  assert.deepEqual(terminalCensus(cases,states).map(x=>x.status),['failed','not-started']);
  states.delete('serial-2');assert.throws(()=>terminalCensus(cases,states),/census/);
  states.set('serial-2',{status:'running'});assert.throws(()=>terminalCensus(cases,states),/nonterminal/);
});
test('fast target exit records absence without inventing a live birth identity',()=>{
  const gate={pid:100,ppid:90,pgid:100,started:'fixed-birth'};
  const absent=admitTargetStart([gate],gate,101);
  assert.equal(absent.independentlyObservedLive,false);assert.equal(absent.started,null);
  const target={pid:101,ppid:100,pgid:100,started:'target-birth'};
  assert.equal(admitTargetStart([gate,target],gate,101).independentlyObservedLive,true);
  assert.throws(()=>admitTargetStart([gate,{...target,ppid:999}],gate,101),/ownership/);
  assert.throws(()=>admitTargetStart([{...gate,started:'reused'}],gate,101),/gate identity/);
});

function syntheticDelegation(overrides={}) {
  return {
    describeStage({command,args,input,environment,stageId,deadlineEpochMs}) {
      return {id:stageId,stageId,command,args,inputSha256:sha256(input),inputBytes:Buffer.byteLength(input),
        workerPid:process.pid,cwd:process.cwd(),environment,deadlineEpochMs};
    },
    async registerGate(){}, async targetEvent(){}, ...overrides,
  };
}
test('bounded registered gate preserves input/output bytes and genuine target exit two', {skip:!processControls,timeout:10000}, async t=>{
  const dir=temporary(t), input='exact synthetic bytes\n\u0000tail';
  const source="const a=[];process.stdin.on('data',b=>a.push(b));process.stdin.on('end',()=>{process.stdout.write(Buffer.concat(a));process.stderr.write('synthetic error bytes');process.exitCode=2;});";
  const result=await runWatched({command:process.execPath,args:['-e',source],input,output:resolve(dir,'gated'),limits:controlLimits,
    delegation:syntheticDelegation(),testHooks:{probe:healthyProbe,processTable:realTable}});
  assert.equal(result.exit.code,2);assert.equal(result.processSucceeded,false);assert.equal(result.processGroupClosed,true);
  assert.equal(readFileSync(resolve(dir,'gated/stdout.json'),'utf8'),input);
  assert.equal(readFileSync(resolve(dir,'gated/stderr.log'),'utf8'),'synthetic error bytes');
  assert.deepEqual(result.gateEvents.map(x=>x.event),['target-started','target-closed']);
  for(const pid of result.observedOwnedPids)assert(!isAlive(pid));
});
test('bounded registered gate rechecks admission after ACK and never launches rejected target', {skip:!processControls,timeout:10000}, async t=>{
  const dir=temporary(t),marker=resolve(dir,'forbidden');let admissions=0;
  const result=await runWatched({command:process.execPath,args:['-e',`require('fs').writeFileSync(${JSON.stringify(marker)},'bad')`],
    output:resolve(dir,'gated'),limits:controlLimits,delegation:syntheticDelegation(),
    beforeSpawn:()=>{if(++admissions===2)throw Error('synthetic binding changed after registration');},
    testHooks:{probe:healthyProbe,processTable:realTable}});
  assert.equal(admissions,2);assert.equal(result.processSucceeded,false);assert(!existsSync(marker));
  assert.match(result.failure,/binding changed/);assert.equal(result.processGroupClosed,true);
});
test('schedule is rechecked after asynchronous host admission and rejects without target launch', {skip:!processControls,timeout:10000}, async t=>{
  const { d } = scheduledFixture(); let time = 1000;
  const guard = createEvaluationSchedule(d, time, time + 6600000, () => time), id = d.operationalSchedule.stages[0].id;
  guard.begin(id); guard.watchStarted(id);
  const dir = temporary(t), marker = resolve(dir, 'forbidden');
  const result = await runWatched({ command: process.execPath, args: ['-e', `require('fs').writeFileSync(${JSON.stringify(marker)},'bad')`],
    output: resolve(dir, id), limits: controlLimits, beforeSpawn: () => guard.beforeSpawn(id),
    testHooks: { probe: async () => { await Promise.resolve(); time += 600001; return healthyProbe(); }, processTable: realTable } });
  assert.equal(result.processSucceeded, false); assert.match(result.failure, /watched stage allowance/);
  assert.equal(result.processGroupClosed, true); assert(!existsSync(marker)); assert.equal(guard.report().completedStages, 0);
});
test('actual watched schedule includes nonzero preflight in the complete stage envelope', {skip:!processControls,timeout:10000}, async t=>{
  const { d } = scheduledFixture(); d.operationalSchedule.stages[0].wallSeconds = 2;
  const began = Date.now(), guard = createEvaluationSchedule(d, began, began + 6600000), id = d.operationalSchedule.stages[0].id;
  const allowance = guard.begin(id), dir = temporary(t);
  await new Promise(done => setTimeout(done, 100)); // Outside-watch preparation.
  guard.watchStarted(id);
  const record = await runWatched({ command: process.execPath, args: ['-e', 'setTimeout(()=>process.stdout.write("inert"),1200)'],
    output: resolve(dir, id), limits: { ...controlLimits, wallSeconds: allowance }, beforeSpawn: () => guard.beforeSpawn(id),
    testHooks: { probe: async () => { await new Promise(done => setTimeout(done, 150)); return healthyProbe(); }, processTable: realTable } });
  guard.complete(id);
  assert.equal(record.processSucceeded, true); assert.equal(record.processGroupClosed, true);
  const stage = guard.report().stages[0];
  assert(stage.watchBeganEpochMs - stage.enteredAt >= 90);
  assert(stage.watchedElapsedSeconds >= 1.3 && stage.watchedElapsedSeconds <= allowance);
  assert(stage.elapsedSeconds > stage.watchedElapsedSeconds);
});
test('bounded gate enforces its own deadline while controller remains alive', {skip:!processControls,timeout:8000}, async t=>{
  const dir=temporary(t),marker=resolve(dir,'target'),stageId='synthetic-deadline';
  const source=`process.on('SIGTERM',()=>{});require('fs').writeFileSync(${JSON.stringify(marker)},String(process.pid));setInterval(()=>{},1000);`;
  const spec={stageId,workerPid:process.pid,cwd:process.cwd(),command:process.execPath,args:['-e',source],environment:{PATH:'/usr/bin:/bin',LC_ALL:'C',LANG:'C'},
    inputBytes:0,inputSha256:sha256(''),deadlineEpochMs:Date.now()+800};
  const child=spawn(process.execPath,[STAGE_GATE,JSON.stringify(spec)],{detached:true,stdio:['pipe','pipe','pipe','ipc'],env:spec.environment});
  t.after(()=>{if(isAlive(-child.pid))try{process.kill(-child.pid,'SIGKILL');}catch{}});
  child.on('message',m=>{if(m.event==='gate-ready')child.send({event:'go',stageId});});child.stdin.end();
  const exit=await new Promise((done,fail)=>{child.once('error',fail);child.once('close',(code,signal)=>done({code,signal}));});
  assert.equal(exit.signal,'SIGKILL');assert(existsSync(marker));assert(!isAlive(Number(readFileSync(marker))));assert(!isAlive(-child.pid));
});
