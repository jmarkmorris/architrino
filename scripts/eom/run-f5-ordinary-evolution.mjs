#!/usr/bin/env node
// Scientific settings belong to the frozen declaration. This module only maps
// accepted past tokens and supervises the existing certified EOM transport.
import { spawn, execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync, mkdirSync, openSync,
  readdirSync, readSync, realpathSync, statfsSync, unlinkSync, writeSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { prepareOrdinaryEvolutionRequest } from './prepare-ordinary-evolution-request.mjs';
import { canonicalStringify } from '../../src/apps/borg/BorgCertifiedBudgets.js';
import { connectBatchWorker, STAGE_GATE } from './f5-batch-admission.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const check = (condition, message) => { if (!condition) throw new Error(message); };
export const PYTHON_FLAGS = Object.freeze(['-I', '-S', '-B']);
export function childEnvironment() {
  return { PATH: '/usr/bin:/bin', LANG: 'C', LC_ALL: 'C', PYTHONDONTWRITEBYTECODE: '1', PYTHONNOUSERSITE: '1' };
}
export function validateLauncherEnvironment(env = process.env, execArgv = process.execArgv) {
  for (const [key, value] of Object.entries(env)) if (value && (/^(NODE_OPTIONS|NODE_PATH|PYTHONPATH|PYTHONHOME|PYTHONSTARTUP|PYTHONUSERBASE|LD_PRELOAD|LD_LIBRARY_PATH)$/u.test(key) || key.startsWith('DYLD_')))
    throw new Error(`undeclared runtime environment: ${key}`);
  check(execArgv.length === 0, 'undeclared Node runtime options');
}
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
// Reject duplicate object keys before JSON.parse can silently discard one.
// The scanner only establishes JSON structure; JSON.parse owns scalar decoding.
export function parseUniqueJson(bytes) {
  const source = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  let i = 0;
  const ws = () => { while (/\s/u.test(source[i] ?? '') && i < source.length) i++; };
  const string = () => {
    const start = i++; check(source[start] === '"', 'JSON string required');
    while (i < source.length) { if (source[i++] === '"') return JSON.parse(source.slice(start, i)); if (source[i - 1] === '\\') i++; }
    throw new Error('unterminated JSON string');
  };
  const value = depth => {
    check(depth <= 128, 'JSON nesting limit'); ws();
    if (source[i] === '{') {
      i++; ws(); const keys = new Set();
      if (source[i] === '}') { i++; return; }
      for (;;) { ws(); const key = string(); check(!keys.has(key), `duplicate JSON key: ${key}`); keys.add(key);
        ws(); check(source[i++] === ':', 'JSON colon required'); value(depth + 1); ws();
        if (source[i] === '}') { i++; return; } check(source[i++] === ',', 'JSON comma required'); }
    }
    if (source[i] === '[') {
      i++; ws(); if (source[i] === ']') { i++; return; }
      for (;;) { value(depth + 1); ws(); if (source[i] === ']') { i++; return; } check(source[i++] === ',', 'JSON comma required'); }
    }
    if (source[i] === '"') { string(); return; }
    const start = i; while (i < source.length && !/[\s,}\]]/u.test(source[i])) i++;
    check(i > start, 'JSON value required'); JSON.parse(source.slice(start, i));
  };
  value(0); ws(); check(i === source.length, 'trailing JSON data'); return JSON.parse(source);
}
export function capture(path, maximumBytes = 256 * 1024 ** 2) {
  check(Number.isSafeInteger(maximumBytes) && maximumBytes > 0, 'bounded capture limit required');
  path = resolve(path);
  const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd);
    check(before.isFile() && before.size <= maximumBytes, 'bounded regular input required');
    const bytes = Buffer.alloc(before.size); let offset = 0;
    while (offset < bytes.length) { const count = readSync(fd, bytes, offset, bytes.length - offset, offset); check(count > 0, 'short input capture'); offset += count; }
    const extra = Buffer.alloc(1); check(readSync(fd, extra, 0, 1, offset) === 0, 'input grew during capture');
    const after = fstatSync(fd), current = lstatSync(path);
    check(current.isFile() && !current.isSymbolicLink() && before.dev === current.dev && before.ino === current.ino &&
      before.size === after.size && before.mtimeMs === after.mtimeMs && before.ctimeMs === after.ctimeMs, 'input changed during capture');
    return { data: bytes, path, sha256: sha256(bytes), bytes: bytes.length, dev: before.dev, ino: before.ino };
  } finally { closeSync(fd); }
}
export function readJson(path, maximumBytes) {
  const { data, dev, ino, ...binding } = capture(path, maximumBytes);
  return { ...binding, value: parseUniqueJson(data) };
}
export function writeAll(fd, bytes, writer = writeSync) {
  let offset = 0;
  while (offset < bytes.length) {
    const count = writer(fd, bytes, offset, bytes.length - offset);
    check(Number.isInteger(count) && count > 0 && count <= bytes.length - offset, 'invalid or zero-length write'); offset += count;
  }
}
export function checkOutputBudget(root, limits, additionalBytes = 0) {
  let total = additionalBytes;
  const walk = path => {
    const st = lstatSync(path); check(!st.isSymbolicLink(), 'symlink in owned output');
    if (st.isDirectory()) { for (const name of readdirSync(path)) walk(resolve(path, name)); }
    else { check(st.isFile(), 'nonregular owned output'); check(st.size <= limits.outputBytes, `per-file output limit: ${path}`); total += st.size; }
  };
  walk(root); check(total <= limits.aggregateOutputBytes, 'aggregate output limit'); return total;
}
export function publish(path, value, budget = null) {
  const bytes = Buffer.from(JSON.stringify(value, null, 2) + '\n');
  if (budget) { check(bytes.length <= budget.limits.outputBytes, 'per-file publication limit'); checkOutputBudget(budget.root, budget.limits, bytes.length); }
  const fd = openSync(path, 'wx', 0o600);
  try { writeAll(fd, bytes); fsyncSync(fd); } finally { closeSync(fd); }
  const result = capture(path, bytes.length);
  check(result.sha256 === sha256(bytes), 'publication reread differs');
  return { path: result.path, sha256: result.sha256, bytes: result.bytes };
}
export function authenticateBindings(bindings) {
  check(Array.isArray(bindings), 'binding array required');
  for (const b of bindings) {
    check(typeof b.path === 'string' && Number.isSafeInteger(b.bytes) && b.bytes > 0 && /^[a-f0-9]{64}$/u.test(b.sha256), 'malformed binding');
    const aliases = b.invokedPaths ?? (b.invokedPath == null ? [] : [b.invokedPath]);
    check(Array.isArray(aliases) && aliases.every(p => typeof p === 'string'), 'malformed invoked path binding');
    for (const alias of aliases) check(realpathSync(resolve(ROOT, alias)) === resolve(ROOT, b.path), `changed runtime alias: ${alias}`);
    const actual = capture(resolve(ROOT, b.path), b.bytes);
    check(actual.bytes === b.bytes && actual.sha256 === b.sha256, `changed binding: ${b.path}`);
  }
}
export function canonicalFreshOutput(path, allowedRoot = resolve(ROOT, '.local-data/braid-analysis')) {
  path = resolve(path); allowedRoot = realpathSync(allowedRoot);
  check(path.startsWith(allowedRoot + '/') && basename(path) !== '.' && !existsSync(path) &&
    realpathSync(dirname(path)) === dirname(path), 'fresh canonical scoped output required'); return path;
}
export function requiredSourcePaths(d) {
  const paths = new Set();
  const addModule = path => {
    path = resolve(ROOT, path); if (paths.has(path)) return; paths.add(path);
    const source = capture(path).data.toString('utf8');
    for (const match of source.matchAll(/\bfrom\s+['"]([^'"]+)['"]/gu))
      if (match[1].startsWith('.')) addModule(resolve(dirname(path), match[1]));
  };
  addModule('scripts/eom/run-f5-ordinary-evolution.mjs');
  if (d.operationalAdmission) paths.add(STAGE_GATE);
  for (const file of ['verify-f5-ordinary-evolution.py', 'check-f5-evolution-dynamics.py',
    'oracle/certified_evolution.py', 'oracle/certified_acceleration.py', 'oracle/certified_history.py', 'oracle/decimal_interval.py']) paths.add(resolve(ROOT, 'scripts/eom', file));
  const walk = path => { for (const entry of readdirSync(path, { withFileTypes: true })) {
    check(!entry.isSymbolicLink(), 'symlink in EOM source inventory'); const child = resolve(path, entry.name);
    if (entry.isDirectory()) walk(child); else paths.add(child);
  } };
  walk(resolve(ROOT, 'src/eom/src')); walk(resolve(ROOT, 'src/eom/include'));
  paths.add(resolve(ROOT, 'src/eom/CMakeLists.txt')); paths.add(resolve(ROOT, 'src/eom/native/eom_borg_shadow_cli.cpp'));
  check(typeof d.runtime?.python === 'string', 'declared shared-venv runtime required');
  paths.add(realpathSync(d.runtime.python)); paths.add(realpathSync(process.execPath));
  return [...paths].sort();
}
export function validateSourceInventory(d) {
  check(realpathSync(d.runtime.node) === realpathSync(process.execPath), 'declared Node runtime differs');
  check(canonicalStringify(d.runtime.pythonArguments) === canonicalStringify(PYTHON_FLAGS) &&
    canonicalStringify(d.runtime.childEnvironment) === canonicalStringify(childEnvironment()), 'declared child runtime settings differ');
  const paths = new Set(d.sourceBindings.map(b => resolve(ROOT, b.path)));
  check(paths.size === d.sourceBindings.length, 'duplicate source binding');
  for (const path of requiredSourcePaths(d)) check(paths.has(path), `required source/runtime binding missing: ${path}`);
  check(d.sourceBindings.some(b => resolve(ROOT, b.path) === realpathSync(d.runtime.python)), 'Python runtime binding missing');
  authenticateBindings([...d.sourceBindings, d.executable]);
}
export function validateDeclarationShape(d) {
  const s = d.scientificConditions, c = d.commonNumericalControls, limits = d.operationalLimits;
  check(s.candidateId === 'f5' && s.releaseTime === '0' && s.historyStart === '-1' && s.fieldSpeed === '1' && s.chartPolicy === 'sharp', 'fixed scientific chart/units/history required');
  check(s.geometryChange === false && s.historyRefinement === false && s.strengthSearch === false, 'unapproved scientific search');
  check(c.quarterStepPublication === true && c.useFarFieldEnclosureInEvolution === false && c.farFieldEnclosureFraction === '0' &&
    c.workerThreads === 1 && c.useAdaptiveStepGrowth === false, 'fixed consumer controls differ');
  check(Array.isArray(d.rungs) && d.rungs.length >= 2 && d.rungs.length <= 8 && new Set(d.rungs.map(r => r.id)).size === d.rungs.length, 'distinct bounded rungs required');
  for (const r of d.rungs) {
    check(typeof r.id === 'string' && /^[a-z][a-z0-9]{0,23}$/u.test(r.id), 'unsafe rung ID');
    for (const key of ['initialStep', 'minimumStep', 'maximumStep', 'rootTolerance', 'accelerationTolerance', 'positionTolerance', 'velocityTolerance', 'correctionTolerance'])
      check(typeof r[key] === 'string' && Number.isFinite(Number(r[key])) && Number(r[key]) > 0, `positive decimal token required: ${key}`);
  }
  for (const key of ['wallSeconds', 'oracleWallSeconds', 'geometryWallSeconds', 'evaluationWallSeconds', 'heartbeatSeconds', 'aggregateRssBytes',
    'rssSampleIntervalSeconds', 'maximumRssSampleGapSeconds', 'logBytes', 'outputBytes', 'aggregateOutputBytes', 'diskMinimumBytes', 'minimumHostMemoryFreePercent'])
    check(typeof limits[key] === 'number' && Number.isFinite(limits[key]) && limits[key] > 0, `positive numeric limit required: ${key}`);
  for (const key of ['aggregateRssBytes', 'logBytes', 'outputBytes', 'aggregateOutputBytes', 'diskMinimumBytes']) check(Number.isSafeInteger(limits[key]), `integer byte limit required: ${key}`);
  check(limits.simultaneousScientificProcesses === 1 && limits.heartbeatSeconds === 15, 'fixed concurrency/heartbeat required');
  check(Number.isFinite(Date.parse(d.campaignDeadline)), 'campaign deadline required');
  validateOperationalSchedule(d);
}

// Optional operational accounting only: no schedule field enters a scientific
// request. The ordered IDs follow the public caller's existing stage sequence.
export function validateOperationalSchedule(d) {
  if (d.operationalSchedule === undefined) return null;
  const s = d.operationalSchedule, l = d.operationalLimits;
  check(s?.schema === 'braid-program/f5-operational-schedule.v1', 'invalid operational schedule');
  const exact = (o, keys) => check(o && Object.keys(o).sort().join(',') === [...keys].sort().join(','), 'unknown or missing schedule field');
  exact(s, ['schema', 'startupSeconds', 'stages', 'finalizationSeconds']);
  const seconds = n => Number.isSafeInteger(n) && n >= 0;
  check(seconds(s.startupSeconds) && seconds(s.finalizationSeconds) && s.finalizationSeconds > 0, 'invalid schedule reserve');
  const expected = d.rungs.flatMap(r => [
    { id: `${r.id}-inspection`, ceiling: l.wallSeconds },
    { id: `${r.id}-evolution`, ceiling: l.wallSeconds },
    { id: `${r.id}-geometry-process`, ceiling: l.geometryWallSeconds },
  ]);
  for (let i = 1; i < d.rungs.length; i++) expected.push({ id: `${d.rungs[i - 1].id}-${d.rungs[i].id}-sensitivity-process`, ceiling: l.geometryWallSeconds });
  expected.push({ id: 'independent-dynamics-process', ceiling: l.oracleWallSeconds });
  check(Array.isArray(s.stages) && s.stages.length === expected.length, 'complete ordered schedule required');
  for (let i = 0; i < expected.length; i++) {
    const stage = s.stages[i]; exact(stage, ['id', 'wallSeconds', 'preparationSeconds']);
    check(stage.id === expected[i].id, 'schedule stage order differs');
    check(seconds(stage.wallSeconds) && stage.wallSeconds > 0 && stage.wallSeconds <= expected[i].ceiling && seconds(stage.preparationSeconds), 'invalid stage allowance');
  }
  const totalSeconds = s.startupSeconds + s.finalizationSeconds + s.stages.reduce((n, x) => n + x.wallSeconds + x.preparationSeconds, 0);
  check(Number.isSafeInteger(totalSeconds) && totalSeconds <= l.evaluationWallSeconds, 'infeasible complete operational schedule');
  return { ...structuredClone(s), totalSeconds };
}

export function createEvaluationSchedule(d, beganEpoch, deadlineEpochMs, clock = Date.now) {
  const schedule = validateOperationalSchedule(d); if (!schedule) return null;
  check(beganEpoch + schedule.totalSeconds * 1000 <= deadlineEpochMs, 'full operational schedule does not fit inclusive deadline');
  let index = 0, active = null, lastTerminal = null, finalizationBegan = null, lastClock = beganEpoch;
  const events = [];
  const now = () => { const t = clock(); check(Number.isFinite(t) && t >= lastClock, 'schedule clock moved backwards'); lastClock = t; return t; };
  const suffixSeconds = from => schedule.stages.slice(from).reduce((n, x) => n + x.wallSeconds + x.preparationSeconds, 0) + schedule.finalizationSeconds;
  const fits = (t, seconds) => check(t + seconds * 1000 <= deadlineEpochMs, 'full remaining schedule and closure reserve do not fit');
  const assertFinalization = () => {
    if (finalizationBegan !== null) check(now() < Math.min(deadlineEpochMs, finalizationBegan + schedule.finalizationSeconds * 1000), 'caller finalization reserve exhausted');
  };
  return {
    begin(id) {
      const t = now(), stage = schedule.stages[index];
      check(!active && finalizationBegan === null && stage?.id === id, 'unexpected scheduled stage');
      if (index === 0) check(t - beganEpoch <= schedule.startupSeconds * 1000, 'startup reserve exhausted');
      const preparationBegan = lastTerminal ?? t;
      const preparationDeadline = preparationBegan + stage.preparationSeconds * 1000;
      check(t <= preparationDeadline, 'interstage preparation reserve exhausted');
      fits(t, stage.wallSeconds + (preparationDeadline - t) / 1000 + suffixSeconds(index + 1));
      active = { id, enteredAt: t, preparationBegan, preparationDeadline, spawnChecks: 0 };
      return stage.wallSeconds;
    },
    watchStarted(id) {
      const t = now(); check(active?.id === id && active.watchBeganEpochMs === undefined, 'unexpected watched-stage entry');
      check(t <= active.preparationDeadline, 'stage preparation reserve exhausted before watch');
      active.watchBeganEpochMs = t;
    },
    beforeSpawn(id) {
      const t = now(), stage = schedule.stages[index];
      check(active?.id === id && active.watchBeganEpochMs !== undefined, 'unregistered scheduled spawn');
      check(t < active.watchBeganEpochMs + stage.wallSeconds * 1000, 'watched stage allowance exhausted before spawn');
      // Repeated after asynchronous admission and registration: the entire
      // current watched allowance and every mandatory successor still fit.
      // Preparation seconds cover work outside runWatched; its asynchronous
      // preflight is already charged to the complete watched-stage allowance.
      fits(t, stage.wallSeconds + suffixSeconds(index + 1));
      active.spawnChecks++; active.lastSpawnCheckEpochMs = t;
    },
    complete(id) {
      const t = now(), stage = schedule.stages[index];
      check(active?.id === id && active.spawnChecks > 0, 'scheduled stage lacks terminal spawn accounting');
      check(t <= active.watchBeganEpochMs + stage.wallSeconds * 1000, 'complete watched stage allowance exhausted');
      fits(t, suffixSeconds(index + 1));
      events.push({ ...active, terminalEpochMs: t, wallSeconds: stage.wallSeconds, preparationSeconds: stage.preparationSeconds,
        elapsedSeconds: (t - active.enteredAt) / 1000, watchedElapsedSeconds: (t - active.watchBeganEpochMs) / 1000,
        remainingRequiredSeconds: suffixSeconds(index + 1) });
      index++; lastTerminal = t; active = null;
    },
    enterFinalization() {
      const t = now(); check(index === schedule.stages.length && !active && finalizationBegan === null, 'mandatory scheduled stage missing');
      // Output decoding after the last terminal stage already consumes this
      // reserve; entering finalization cannot reset that clock.
      finalizationBegan = lastTerminal; assertFinalization();
    },
    assertFinalization,
    report() { return { schema: schedule.schema, totalAllocatedSeconds: schedule.totalSeconds, startupSeconds: schedule.startupSeconds,
      completedStages: index, stages: structuredClone(events), finalizationSeconds: schedule.finalizationSeconds,
      finalizationBeganEpochMs: finalizationBegan, inclusiveDeadlineEpochMs: deadlineEpochMs, externalReviewCompleted: false }; },
  };
}
export function makePreparedRequest(d, rung, handoff) {
  validateDeclarationShape(d);
  const a = d.authorization, c = d.commonNumericalControls, f = c.dormantFiniteWidth;
  check(a.approved === true && typeof a.operatorMessage === 'string' && a.operatorMessage.length > 0,
    'explicit operator strength authorization is indispensable');
  check(d.scientificConditions.fieldSpeed === '1' && d.scientificConditions.chartPolicy === 'sharp', 'fixed scientific chart/units required');
  check(handoff.members.length === 12 && handoff.members.every(m => m.segments.length === 51), 'accepted F5 census required');
  const id = `f5-ordinary-evolution-20260827-${rung.id}`;
  const allocations = {
    schema: 'borg_certified_budget/v1', presetId: id,
    topLevel: { positionIncrement: c.positionIncrementBudget, velocityIncrement: c.velocityIncrementBudget },
    controller: { initialStep: rung.initialStep, minimumStep: rung.minimumStep, maximumStep: rung.maximumStep, adaptiveGrowth: c.useAdaptiveStepGrowth },
    ordinary: { rootTimeEnclosure: rung.rootTolerance, accelerationEnclosure: rung.accelerationTolerance,
      farFieldEnclosureFraction: c.farFieldEnclosureFraction, acceptedStepPosition: rung.positionTolerance,
      acceptedStepVelocity: rung.velocityTolerance, correctionAccelerationResidual: rung.correctionTolerance,
      transmitterFactorFloor: c.transmitterFactorFloor, chartPolicy: 'sharp', quadratureTolerance: f.quadratureTolerance },
    finiteWidth: { causalWidth: f.causalWidth, coreScale: f.coreScale, receiverImpulseTotal: f.receiverImpulseTotal,
      receiverPositionMomentTotal: f.receiverPositionMomentTotal, independentOverlap: f.independentOverlap,
      rowFractions: f.rowFractions, finiteWidthStateNumericalFractions: f.finiteWidthStateNumericalFractions,
      regulatorRefinementRatio: f.regulatorRefinementRatio, regulatorLevels: f.regulatorLevels,
      receiverAllocationRule: f.receiverAllocationRule },
    precision: { bulk: 'binary64-outward', difficultRowInitialBits: c.initialMpfrBits, difficultRowMaximumBits: c.maximumMpfrBits,
      forceEventPrecisionEscalation: false, deterministicReduction: c.deterministicReduction, roundingMode: c.roundingMode },
    resources: { rootMaximumDepth: c.rootMaximumDepth, rootMaximumCells: c.rootMaximumCells,
      quadratureMaximumDepth: f.quadratureMaximumDepth, quadratureMaximumCells: f.quadratureMaximumCells,
      eventMaximumDepth: f.eventMaximumDepth, eventMaximumCells: f.eventMaximumCells,
      correctionIterations: c.correctionIterations, maximumStepAttempts: c.maximumStepAttempts,
      maximumRejectedSteps: c.maximumRejectedSteps, workerThreads: c.workerThreads, requestMemoryBytes: c.requestMemoryBytes },
  };
  const allocationCanonicalJson = canonicalStringify(allocations);
  const limits = d.operationalLimits;
  return prepareOrdinaryEvolutionRequest({
    candidateId: 'f5', releaseTime: '0', historyCoverageStart: '-1',
    historyEvidence: [
      { role: 'past-only-handoff', path: d.history.path, sha256: d.history.sha256 },
      { role: 'handoff-conformance', path: d.history.conformancePath, sha256: d.history.conformanceSha256 },
    ],
    histories: handoff.members.map(m => ({ pathId: m.worldlineId, sourceHistoryId: m.restrictedHistoryId,
      sourceFingerprint: m.historyFingerprint, polarity: m.polarity,
      segments: m.segments.map(s => ({ startTime: s.tStart, endTime: s.tEnd, coefficients: s.coefficients,
        positionErrors: s.positionErrors, velocityErrors: s.velocityErrors })) })),
    settings: { runId: id, endTime: d.scientificConditions.endTime,
      strength: { effectiveStrength: a.effectiveStrength, chargeMagnitude: a.chargeMagnitude, coupling: a.coupling },
      numericalControls: { initialStep: rung.initialStep, minimumStep: rung.minimumStep, maximumStep: rung.maximumStep,
        useAdaptiveStepGrowth: c.useAdaptiveStepGrowth, rootTolerance: rung.rootTolerance,
        accelerationTolerance: rung.accelerationTolerance, farFieldEnclosureFraction: c.farFieldEnclosureFraction,
        positionTolerance: rung.positionTolerance, velocityTolerance: rung.velocityTolerance,
        correctionTolerance: rung.correctionTolerance, threadCount: c.workerThreads },
      coreScale: f.coreScale,
      certifiedBudget: { presetId: id, allocations, allocationCanonicalJson, allocationHash: sha256(allocationCanonicalJson) },
      operationalLimits: Object.fromEntries(['wallSeconds', 'heartbeatSeconds', 'aggregateRssBytes', 'rssSampleIntervalSeconds',
        'logBytes', 'outputBytes', 'diskMinimumBytes'].map(k => [k, limits[k]])),
    },
  });
}

// No root/history mathematics here: compare the actual consumer's tokens,
// fingerprints and endpoint bits against the independently accepted handoff.
export function admitInspection(actual, prepared, handoff) {
  const request = prepared.transportRequest;
  check(actual.schema === 'eom_borg_request_inspection/v1' && actual.status === 'parser-inspection-only' && actual.parserInspected === true, 'missing actual parser inspection');
  for (const key of ['requestValidated', 'rootsEvaluated', 'eomExecuted', 'executionAuthorized', 'scienceApproved']) check(actual[key] === false, 'inspection authority overclaim');
  check(actual.runId === request.runId && actual.fieldSpeed === '1' && actual.coupling === request.modelControls.coupling &&
    actual.startTime === '0' && actual.endTime === request.absoluteTimeInterval.end, 'inspection scientific settings differ');
  check(sha256(prepared.wire.utf8) === prepared.wire.sha256 && Buffer.byteLength(prepared.wire.utf8) === prepared.wire.bytes, 'wire identity differs');
  const lines = prepared.wire.utf8.trimEnd().split('\n');
  check(lines[0] === 'EOM_BORG_NATIVE_V10' && lines.at(-1) === 'END' && lines.length === 627, 'wire census or framing differs');
  check(JSON.stringify(actual.runTokens) === JSON.stringify(lines[1].split('\t')), 'actual RUN tokens differ');
  const switches = actual.resolvedParserControls;
  check(switches.useQuarterStepPublication === true && switches.useFarFieldEnclosureInEvolution === false &&
    switches.useCertifiedTraversal === false && switches.forceEventPrecisionEscalation === false &&
    switches.traversalExactTilePairLimit === 64 && switches.jointHistoryCount === 0 && switches.freshHistoryCache === true, 'resolved parser controls differ');
  check(Array.isArray(actual.paths) && actual.paths.length === 12, 'inspection path count differs');
  for (let i = 0; i < 12; i++) {
    const p = actual.paths[i], m = handoff.members[i], expected = request.histories[i];
    check(p.pathId === m.worldlineId && p.pathId === expected.pathId && p.charge === expected.charge && p.stateFlags === 0,
      'actual path identity/charge differs');
    check(p.historyId === `borg-eom-shadow/${m.worldlineId}` && p.historyFingerprint === m.historyFingerprint,
      'actual restricted history identity differs');
    check(p.segmentCount === 51 && p.segments.length === 51, 'actual history census differs');
    for (let j = 0; j < 51; j++) {
      const s = p.segments[j];
      for (const key of ['startTime', 'endTime', 'coefficients', 'positionErrors', 'velocityErrors'])
        check(JSON.stringify(s[key]) === JSON.stringify(expected.segments[j][key]), `actual cubic token differs: ${i}/${j}/${key}`);
    }
    for (const kind of ['position', 'velocity']) {
      check(Array.isArray(p.endpointState[kind]) && p.endpointState[kind].length === 3, 'endpoint vector shape differs');
      for (let axis = 0; axis < 3; axis++) for (const side of ['lower', 'upper']) {
      const box = p.endpointState[kind][axis], bits = m.release.endpointState[kind][axis][`${side}Bits`];
      check(typeof box[side] === 'number' && Number.isFinite(box[side]) && box.lower <= box.upper && /^[0-9a-f]{16}$/u.test(bits), 'invalid numeric endpoint');
      check(box[`${side}Bits`] === bits, 'actual release uncertainty differs from accepted handoff');
      const buffer = Buffer.alloc(8); buffer.writeDoubleBE(box[side]);
      check(buffer.toString('hex') === bits, 'actual release numeric endpoint/bit mismatch');
      }
    }
  }
  return { schema: 'braid-program/f5-actual-request-inspection-admission.v1', dataConformanceEstablished: true,
    fullEomRequestValidationEstablished: false, members: 12, pieces: 612, endpointBits: 144, wireSha256: prepared.wire.sha256,
    mathematicalReference: 'accepted independent F5 handoff-conformance; exact token and endpoint-bit comparison only' };
}

export function parseProcessTable(text) {
  return text.trim().split('\n').filter(Boolean).map(line => {
    const m = line.trim().match(/^(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(.+)$/u);
    check(m, 'unparseable resource observation');
    return { pid: +m[1], ppid: +m[2], pgid: +m[3], rssBytes: +m[4] * 1024, cpuTime: m[5], executable: m[6] };
  });
}
const probe = (command, args) => new Promise((done, fail) => execFile(command, args,
  { timeout: 1500, maxBuffer: 4 * 1024 ** 2, env: childEnvironment() },
  (error, stdout) => error ? fail(error) : done(stdout)));
const processTable = async () => parseProcessTable(await probe('/bin/ps', ['-axo', 'pid=,ppid=,pgid=,rss=,time=,comm=']));

// A fixed-cadence outer observation never mistakes silent stdout for progress.
// The approved EOM CLI and the two directly invoked Python references do not
// detach descendants. Observed descendants remain tracked after reparenting;
// an escape from the owned group is a failure, never a new authorized process.
const sleep = ms => new Promise(done => setTimeout(done, ms));
function alive(pid) {
  if (!Number.isInteger(pid) || pid === 0) return false;
  try { process.kill(pid, 0); return true; } catch (e) { if (e.code === 'ESRCH') return false; throw e; }
}
function signal(pid, sig) { try { process.kill(pid, sig); } catch (e) { if (e.code !== 'ESRCH') throw e; } }
export function assertBeforeDeadline(deadline, message = 'inclusive evaluation deadline') { check(Date.now() < deadline, message); }

export async function runWatched({ command, args, input = '', output, limits, deadlineEpochMs = Infinity,
  budgetRoot = output, beforeSpawn = () => {}, abortState = { stopped: false }, testHooks = {}, delegation = null }) {
  const began = performance.now(), startedAt = new Date().toISOString();
  const deadline = Math.min(Date.now() + limits.wallSeconds * 1000, deadlineEpochMs);
  const observe = testHooks.processTable ?? processTable, hostProbe = testHooks.probe ?? probe;
  const writer = testHooks.write ?? writeSync, teardownGraceMs = 2000, teardownLimitMs = 10000;
  let child, childExit = null, childClosed = false, stopAt = null, failure = null, timer;
  let stdoutBytes = 0, stderrBytes = 0, observationBytes = 0, maxRss = 0, maxGap = 0;
  let samples = 0, lastSample = began, lastProgress = null, stderrPending = '', nextHeartbeat = began, nextHost = Infinity;
  const observed = new Set(), fds = [], stdoutPath = resolve(output, 'stdout.json'), stderrPath = resolve(output, 'stderr.log');
  let outFD, errFD, obsFD, closureEstablished = true;
  const gateEvents = []; let gateSpecification;
  const stop = reason => { failure ??= String(reason); stopAt ??= performance.now(); };
  const interrupted = () => { abortState.stopped = true; stop('operator interruption'); };
  const stderrFailure = error => stop(`launcher stderr failed: ${error.message}`);
  const liveOwned = () => {
    const ids = [...observed].filter(pid => alive(pid));
    if (child?.pid && alive(-child.pid)) ids.push(-child.pid);
    return ids;
  };
  // This path does not use ps, log writes, filesystem output scans or host probes.
  // It is called in finally even if descriptor creation, spawn or sampling fails.
  const closeOwned = async () => {
    if (!child) { closureEstablished = true; return; }
    stopAt ??= performance.now();
    let sentKill = false;
    while (true) {
      const ids = liveOwned();
      if (childClosed && ids.length === 0) { closureEstablished = true; return; }
      const elapsed = performance.now() - stopAt;
      for (const pid of ids) signal(pid, elapsed >= teardownGraceMs ? 'SIGKILL' : 'SIGTERM');
      sentKill ||= elapsed >= teardownGraceMs;
      if (elapsed >= teardownLimitMs) {
        const error = new Error(`owned process closure unresolved (killSent=${sentKill})`);
        error.ownedProcessClosureUnresolved = true; throw error;
      }
      await sleep(25);
    }
  };
  const logObservation = value => {
    const bytes = Buffer.from(JSON.stringify(value) + '\n');
    check(observationBytes + stderrBytes + bytes.length <= limits.logBytes, 'combined log limit');
    writeAll(obsFD, bytes, writer); observationBytes += bytes.length;
  };
  const openLog = path => { const fd = openSync(path, 'wx', 0o600); fds.push(fd); return fd; };
  process.on('SIGINT', interrupted); process.on('SIGTERM', interrupted);
  process.stderr.on('error', stderrFailure);
  try {
    assertBeforeDeadline(deadline, 'no remaining declared execution time');
    check(!abortState.stopped, 'operator interruption before launch');
    mkdirSync(output, { recursive: false, mode: 0o700 });
    outFD = openLog(stdoutPath); errFD = openLog(stderrPath); obsFD = openLog(resolve(output, 'resources.ndjson'));
    // The observation instrument itself must work before any child starts.
    await observe();
    const disk = statfsSync(ROOT, { bigint: true });
    check(disk.bavail * disk.bsize >= BigInt(limits.diskMinimumBytes), 'minimum free disk');
    const pressure = await hostProbe('/usr/bin/memory_pressure', []);
    const match = pressure.match(/System-wide memory free percentage:\s*(\d+)%/u);
    check(match && +match[1] >= limits.minimumHostMemoryFreePercent, 'host admission failed before process launch');
    logObservation({ kind: 'prelaunch-host-resource', freeMemoryPercent: +match[1], freeDiskBytes: String(disk.bavail * disk.bsize) });
    await beforeSpawn(); // Recheck frozen inputs after all asynchronous preflight.
    check(!abortState.stopped && failure == null, 'operator interruption before launch');
    assertBeforeDeadline(deadline, 'deadline before process launch');
    checkOutputBudget(budgetRoot, limits);
    lastSample = performance.now(); nextHost = lastSample + 15000;
    if (delegation) gateSpecification = delegation.describeStage({ command, args, input, environment: childEnvironment(), stageId: basename(output), deadlineEpochMs: deadline });
    child = spawn(delegation ? process.execPath : command, delegation ? [STAGE_GATE, JSON.stringify(gateSpecification)] : args,
      { cwd: ROOT, detached: true, stdio: delegation ? ['pipe', 'pipe', 'pipe', 'ipc'] : ['pipe', 'pipe', 'pipe'], env: childEnvironment() });
    closureEstablished = false;
    if (child.pid) observed.add(child.pid);
    child.once('error', error => { stop(error.message); childExit = { code: null, signal: null, spawnError: error.message }; });
    child.once('exit', (code, sig) => { childExit = { code, signal: sig }; if (code !== 0) stop('nonzero process exit'); });
    child.once('close', () => { childClosed = true; });
    if (delegation) {
      let lifecycle = 'unregistered', gateTargetPid, gateQueue = Promise.resolve();
      const tellGate = event => { if (child.connected) child.send({ event, stageId: gateSpecification.stageId }, error => { if (error) stop(error.message); }); };
      child.on('message', message => {
        gateQueue = gateQueue.then(async () => {
          check(message?.gatePid === child.pid && message.stageId === gateSpecification.stageId, 'gate protocol identity differs');
          if (message.event === 'gate-ready') {
            check(lifecycle === 'unregistered', 'duplicate gate registration'); lifecycle = 'registering';
            await delegation.registerGate(child, gateSpecification);
            await beforeSpawn();
            assertBeforeDeadline(deadline, 'stage deadline before gate start');
            check(!failure && !abortState.stopped, 'cancelled before gate start'); tellGate('go');
            lifecycle = 'admitted';
          } else if (message.event === 'target-started' || message.event === 'target-closed') {
            if (message.event === 'target-started') {
              check(lifecycle === 'admitted' && Number.isInteger(message.targetPid) && message.targetPid > 0, 'target start out of order');
              gateTargetPid = message.targetPid; lifecycle = 'running';
            } else {
              check(lifecycle === 'running' && message.targetPid === gateTargetPid, 'target closure out of order or identity differs');
              lifecycle = 'closed';
            }
            gateEvents.push(message); await delegation.targetEvent(message);
            if (message.event === 'target-closed') { lifecycle = 'released'; tellGate('release'); }
          } else throw Error('unexpected gate protocol message');
        }).catch(error => { stop(error.message); tellGate('cancel'); });
      });
    }
    child.stdout.on('data', bytes => { try {
      check(stdoutBytes + bytes.length <= limits.outputBytes, 'stdout output limit');
      writeAll(outFD, bytes, writer); stdoutBytes += bytes.length;
    } catch (e) { stop(e.message); } });
    child.stderr.on('data', bytes => { try {
      check(stderrBytes + observationBytes + bytes.length <= limits.logBytes, 'combined log limit');
      writeAll(errFD, bytes, writer); stderrBytes += bytes.length; stderrPending += bytes.toString('utf8');
      for (;;) { const at = stderrPending.indexOf('\n'); if (at < 0) break;
        const line = stderrPending.slice(0, at); stderrPending = stderrPending.slice(at + 1);
        try { const v = parseUniqueJson(Buffer.from(line));
          if (v.schema === 'eom_accepted_step_progress/v1' && v.event === 'accepted-step' && Number.isInteger(v.acceptedStepCount)) lastProgress = v;
        } catch {} }
      check(stderrPending.length <= 65536, 'oversized diagnostic line');
    } catch (e) { stop(e.message); } });
    child.stdin.on('error', error => { if (error.code !== 'EPIPE') stop(error.message); });
    child.stdin.end(input);
    timer = setTimeout(() => stop('inclusive stage deadline'), Math.max(1, deadline - Date.now()));
    while (!failure) {
      try {
        check(!abortState.stopped, 'operator or batch interruption');
        const sampleStart = performance.now(), rows = await observe();
        const ids = new Set(observed);
        let changed = true;
        while (changed) { changed = false; for (const r of rows) if ((ids.has(r.ppid) || r.pgid === child.pid) && !ids.has(r.pid)) { ids.add(r.pid); changed = true; } }
        for (const r of rows) if (ids.has(r.pid)) observed.add(r.pid);
        const owned = rows.filter(r => ids.has(r.pid) || r.pid === process.pid);
        check(!owned.some(r => r.pid !== process.pid && r.pgid !== child.pid), 'owned descendant escaped process group');
        const rss = owned.reduce((n, r) => n + r.rssBytes, 0), gap = sampleStart - lastSample;
        maxGap = Math.max(maxGap, gap); maxRss = Math.max(maxRss, rss); lastSample = sampleStart; samples++;
        logObservation({ kind: 'resource-sample', elapsedSeconds: (sampleStart - began) / 1000, rssBytes: rss, rows: owned });
        check(rss <= limits.aggregateRssBytes, 'sampled aggregate RSS limit');
        check(gap <= limits.maximumRssSampleGapSeconds * 1000, 'lost resource observation');
        checkOutputBudget(budgetRoot, limits);
        if (childClosed && liveOwned().length === 0) { closureEstablished = true; break; }
        if (childExit && rows.some(r => r.pgid === child.pid && r.pid !== child.pid)) stop('descendants remained after leader exit');
        if (sampleStart >= nextHost) {
          nextHost = sampleStart + 15000;
          const host = await hostProbe('/usr/bin/memory_pressure', []), free = host.match(/System-wide memory free percentage:\s*(\d+)%/u);
          check(free && +free[1] >= limits.minimumHostMemoryFreePercent, 'unsafe or unavailable host memory');
          const nowDisk = statfsSync(ROOT, { bigint: true });
          check(nowDisk.bavail * nowDisk.bsize >= BigInt(limits.diskMinimumBytes), 'minimum free disk');
          logObservation({ kind: 'host-resource', freeMemoryPercent: +free[1], freeDiskBytes: String(nowDisk.bavail * nowDisk.bsize) });
        }
        if (sampleStart >= nextHeartbeat) {
          nextHeartbeat += limits.heartbeatSeconds * 1000;
          const heartbeat = { kind: 'f5-evolution-heartbeat', elapsedSeconds: (sampleStart - began) / 1000, pid: child.pid, lastAcceptedProgress: lastProgress, sampledRssBytes: rss, failure };
          logObservation(heartbeat); process.stderr.write(JSON.stringify(heartbeat) + '\n');
        }
      } catch (e) { stop(e.message); }
      if (!failure) await sleep(limits.rssSampleIntervalSeconds * 1000);
    }
  } catch (e) { stop(e.message); }
  finally {
    clearTimeout(timer);
    let closeError;
    try { await closeOwned(); } catch (e) { e.ownedProcessClosureUnresolved = true; closeError = e; }
    // Finalization failures cannot bypass process teardown or descriptor closure.
    for (const fd of fds) {
      try { fsyncSync(fd); } catch (e) { stop(e.message); }
      try { closeSync(fd); } catch (e) { stop(e.message); }
    }
    process.off('SIGINT', interrupted); process.off('SIGTERM', interrupted);
    process.stderr.off('error', stderrFailure);
    if (closeError) throw closeError;
  }
  check(closureEstablished, 'missing owned process closure');
  if (delegation && failure == null) check(gateEvents.length === 2 && gateEvents[0].event === 'target-started' && gateEvents[1].event === 'target-closed', 'complete registered gate census required');
  if (Date.now() >= deadline) stop('inclusive stage deadline');
  const outputs = [stdoutPath, stderrPath, resolve(output, 'resources.ndjson')].filter(existsSync).map(path => {
    const { data, dev, ino, ...binding } = capture(path, limits.outputBytes); return binding;
  });
  const record = { schema: 'braid-program/f5-watched-process.v1', processSucceeded: failure == null,
    scientificOutcomeAccepted: false, command, args, environment: childEnvironment(), startedAt, elapsedSecondsThroughDescriptorClosure: (performance.now() - began) / 1000,
    exit: childExit, failure, processGroupClosed: true, observedOwnedPids: [...observed], pid: child?.pid ?? null, lastProgress,
    samples, maximumSampledAggregateRssBytes: maxRss, maximumSampleGapSeconds: maxGap / 1000,
    memoryScope: 'sampled launcher plus owned descendants; sampled RSS is not a continuous allocation ceiling',
    ...(delegation ? { executionGate: STAGE_GATE, gateEvents,
      targetTimingScope: 'gate-reported target spawn through close; excludes registration but includes target process startup',
      stageTimingScope: 'complete watched stage including registration gate, observation and publication preparation' } : {}),
    processScope: 'reviewed invoked code does not detach descendants; observed PID and kernel group liveness checked independently of sampler during teardown',
    stdoutBytes, stderrBytes, observationBytes, outputs };
  // Record scope ends at descriptor closure, not at this record's own publication.
  if (existsSync(output)) publish(resolve(output, 'process-receipt.json'), record, { root: budgetRoot, limits });
  testHooks.afterPublication?.();
  assertBeforeDeadline(deadline, 'inclusive stage finalization deadline');
  checkOutputBudget(budgetRoot, limits);
  return record;
}

export function acquireLock(path, identity) {
  const bytes = Buffer.from(JSON.stringify(identity)), fd = openSync(path, 'wx', 0o600);
  const created = fstatSync(fd); let completed = false;
  try { writeAll(fd, bytes); fsyncSync(fd); completed = true; }
  finally {
    closeSync(fd);
    if (!completed) { const now = lstatSync(path); if (now.dev === created.dev && now.ino === created.ino) unlinkSync(path); }
  }
  return { path, dev: created.dev, ino: created.ino, sha256: sha256(bytes), bytes: bytes.length };
}
export function releaseLock(lock) {
  const now = capture(lock.path, lock.bytes);
  check(now.dev === lock.dev && now.ino === lock.ino && now.sha256 === lock.sha256, 'shared lock identity changed; do not remove it');
  unlinkSync(lock.path);
}
export function classifyEvaluation(results, comparisons, operation, dynamics) {
  const positive = results.length > 0 && results.every(r => Number(r.response.value.acceptedEndTime) > 0);
  const local = operation?.processSucceeded === true && dynamics?.value.accepted === true;
  const sensitivity = comparisons.length > 0 && comparisons.every(c => c.operation.processSucceeded && c.result.value.comparison?.passed === true);
  return { allRungsGeneratedPositiveTime: positive, localDynamicsChecksPassed: local, sensitivityChecksPassed: sensitivity,
    status: positive && local && sensitivity ? 'evidence-ready-pending-independent-actual-output-admission' : 'unresolved-evidence-pending-independent-actual-output-admission' };
}

export async function main(argv = process.argv.slice(2)) {
  const beganEpoch = Date.now();
  validateLauncherEnvironment();
  if (argv.length === 1 && argv[0] === '--help') { process.stdout.write('Usage: --declaration FILE --out FRESH_DIRECTORY [--prepare-only | --batch-plan FILE --batch-case ID]\n'); return; }
  const batchMode = argv.length === 8 && argv[4] === '--batch-plan' && argv[6] === '--batch-case';
  check((argv.length === 4 || (argv.length === 5 && argv[4] === '--prepare-only') || batchMode) && argv[0] === '--declaration' && argv[2] === '--out', 'invalid arguments');
  const declaration = readJson(resolve(argv[1])), d = declaration.value;
  check(d.schema === 'braid-program/f5-ordinary-evolution-declaration.v1', 'wrong declaration schema'); validateDeclarationShape(d);
  const output = canonicalFreshOutput(argv[3]), budget = { root: output, limits: d.operationalLimits }, prepareOnly = argv.includes('--prepare-only');
  check(prepareOnly || d.operationalAdmission?.controlOnly !== true, 'inert-control declaration cannot launch the scientific caller');
  let deadlineEpochMs = Math.min(Date.parse(d.campaignDeadline), beganEpoch + d.operationalLimits.evaluationWallSeconds * 1000);
  assertBeforeDeadline(deadlineEpochMs, 'campaign deadline passed');
  const h = readJson(resolve(ROOT, d.history.path)), conformance = readJson(resolve(ROOT, d.history.conformancePath));
  check(h.sha256 === d.history.sha256 && h.bytes === d.history.bytes, 'accepted history identity changed');
  check(conformance.sha256 === d.history.conformanceSha256, 'accepted conformance changed');
  let review;
  if (!prepareOnly) {
    check(d.status === 'frozen' && d.executable && d.sourceBindings.length > 0, 'declaration is not frozen');
    check(canonicalStringify(d.runtime?.launcherEnvironment) === canonicalStringify({ PATH: '/usr/bin:/bin', LC_ALL: 'C', LANG: 'C' }), 'declared launcher environment differs');
    for (const [key, value] of Object.entries(d.runtime.launcherEnvironment)) check(process.env[key] === value, `launcher environment mismatch: ${key}`);
    review = readJson(resolve(ROOT, d.independentDeclarationReview));
    check(review.value.accepted === true && review.value.declarationSha256 === declaration.sha256, 'independent declaration acceptance required');
    validateSourceInventory(d);
  }
  const abortState = { stopped: false }, onSignal = () => { abortState.stopped = true; };
  check(prepareOnly || batchMode === Boolean(d.operationalAdmission), 'operational generation requires its declared admission mode');
  const delegation = batchMode ? await connectBatchWorker({ planPath:resolve(argv[5]), caseId:argv[7], declaration, output,
    api:{readJson,capture,authenticateBindings,sha256}, abortState }) : null;
  if (delegation) deadlineEpochMs = Math.min(deadlineEpochMs,delegation.deadlineEpochMs);
  const schedule = !prepareOnly ? createEvaluationSchedule(d, beganEpoch, deadlineEpochMs) : null;
  const requests = d.rungs.map(rung => ({ rung: rung.id, prepared: makePreparedRequest(d, rung, h.value) }));
  mkdirSync(output, { mode: 0o700 });
  for (const request of requests) request.artifact = publish(resolve(output, `${request.rung}-request.json`), request.prepared, budget);
  const immutable = [declaration, h, conformance, ...(review ? [review] : []), ...requests.map(x => x.artifact)];
  const admit = () => {
    check(!abortState.stopped, 'operator interruption'); assertBeforeDeadline(deadlineEpochMs);
    schedule?.assertFinalization();
    delegation?.verify();
    if (!prepareOnly) validateSourceInventory(d);
    authenticateBindings(immutable); checkOutputBudget(output, d.operationalLimits); schedule?.assertFinalization();
  };
  if (prepareOnly) {
    admit(); const receipt = publish(resolve(output, 'preparation.json'), { declaration, requests: requests.map(x => x.artifact), evolutionExecuted: false }, budget);
    admit(); process.stdout.write(JSON.stringify(receipt) + '\n'); return;
  }
  const stages = [], results = [], comparisons = [];
  let lock, unsafeClosure = false, finalBinding, finalSummary, primaryError;
  process.on('SIGINT', onSignal); process.on('SIGTERM', onSignal);
  const watched = async ({ limits = d.operationalLimits, ...options }) => {
    const stageId = basename(options.output), allowance = schedule?.begin(stageId);
    if (allowance !== undefined) limits = { ...limits, wallSeconds: allowance };
    admit();
    try {
      const beforeSpawn = () => { admit(); schedule?.beforeSpawn(stageId); };
      schedule?.watchStarted(stageId);
      const record = await runWatched({ ...options, limits, budgetRoot: output, deadlineEpochMs, beforeSpawn, abortState, delegation });
      schedule?.complete(stageId); admit(); return record;
    } catch (e) { if (e.ownedProcessClosureUnresolved) unsafeClosure = true; throw e; }
  };
  const acceptOutput = path => { const result = readJson(path, d.operationalLimits.outputBytes); immutable.push(result); return result; };
  try {
    admit();
    if (!delegation) lock = acquireLock(resolve(ROOT, '.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock'),
      { pid: process.pid, task: 'f5-ordinary-evolution', startedAt: new Date().toISOString(), declarationSha256: declaration.sha256 });
    for (const request of requests) {
      const executable = resolve(ROOT, d.executable.path);
      const inspection = await watched({ command: executable, args: ['borg-shadow-v0', '--inspect-request-only'], input: request.prepared.wire.utf8,
        output: resolve(output, `${request.rung}-inspection`) });
      check(inspection.processSucceeded, 'request inspection process failed');
      const actual = acceptOutput(resolve(output, `${request.rung}-inspection/stdout.json`));
      const admission = admitInspection(actual.value, request.prepared, h.value);
      immutable.push(publish(resolve(output, `${request.rung}-inspection-admission.json`), admission, budget));
      const evolution = await watched({ command: executable, args: ['borg-shadow-v0', '--accepted-step-progress'], input: request.prepared.wire.utf8,
        output: resolve(output, `${request.rung}-evolution`) });
      stages.push({ rung: request.rung, inspection, evolution });
      check(evolution.processSucceeded, 'evolution process/resource failure; preserve raw evidence, no automatic retry');
      const response = acceptOutput(resolve(output, `${request.rung}-evolution/stdout.json`)), geometryPath = resolve(output, `${request.rung}-geometry.json`);
      const geometry = await watched({ command: d.runtime.python,
        args: [...PYTHON_FLAGS, resolve(ROOT, 'scripts/eom/verify-f5-ordinary-evolution.py'), '--declaration', declaration.path, '--handoff', h.path,
          '--request', request.artifact.path, '--response', response.path, '--expected-request-sha256', request.artifact.sha256, '--out', geometryPath],
        output: resolve(output, `${request.rung}-geometry-process`), limits: { ...d.operationalLimits, wallSeconds: d.operationalLimits.geometryWallSeconds } });
      stages.at(-1).geometry = geometry;
      check(geometry.processSucceeded, 'independent geometry checker process failed');
      results.push({ request: request.artifact, response, geometry: acceptOutput(geometryPath) });
    }
    for (let i = 1; i < results.length; i++) {
      const left = results[i - 1], right = results[i], label = `${d.rungs[i - 1].id}-${d.rungs[i].id}`, resultPath = resolve(output, `${label}-sensitivity.json`);
      const operation = await watched({ command: d.runtime.python,
        args: [...PYTHON_FLAGS, resolve(ROOT, 'scripts/eom/verify-f5-ordinary-evolution.py'), '--declaration', declaration.path, '--handoff', h.path,
          '--request', right.request.path, '--response', right.response.path, '--comparison-request', left.request.path, '--comparison-response', left.response.path,
          '--expected-request-sha256', right.request.sha256, '--expected-comparison-request-sha256', left.request.sha256, '--out', resultPath],
        output: resolve(output, `${label}-sensitivity-process`), limits: { ...d.operationalLimits, wallSeconds: d.operationalLimits.geometryWallSeconds } });
      check(operation.processSucceeded, 'independent sensitivity checker process failed');
      comparisons.push({ label, operation, result: acceptOutput(resultPath) });
    }
    const fine = results.at(-1), dynamicsPath = resolve(output, 'independent-dynamics.json');
    const dynamicsOperation = await watched({ command: d.runtime.python,
      args: [...PYTHON_FLAGS, resolve(ROOT, 'scripts/eom/check-f5-evolution-dynamics.py'), '--declaration', declaration.path,
        '--request', fine.request.path, '--response', fine.response.path, '--out', dynamicsPath],
      output: resolve(output, 'independent-dynamics-process'), limits: { ...d.operationalLimits, wallSeconds: d.operationalLimits.oracleWallSeconds } });
    const dynamics = existsSync(dynamicsPath) ? acceptOutput(dynamicsPath) : null;
    schedule?.enterFinalization();
    admit();
    finalSummary = classifyEvaluation(results, comparisons, dynamicsOperation, dynamics);
    const final = {
      schema: 'braid-program/f5-ordinary-evolution-evaluation.v1', declarationSha256: declaration.sha256,
      accepted: false, externalActualOutcomeReviewRequired: true,
      scope: 'generated EOM trajectory with independent geometric bounds, adjacent-rung sensitivity, first-step and final-acceleration checks; no global validated solution enclosure',
      stages, results: results.map(r => ({ request: r.request, response: { ...r.response, value: undefined }, geometry: r.geometry })),
      comparisons, dynamicsOperation, dynamics, ...finalSummary,
      allRungsReachedHorizon: results.every(r => r.geometry.value.completeRequestedHorizon === true),
      elapsedSecondsBeforeFinalPublication: (Date.now() - beganEpoch) / 1000, remainingBurden: d.excludedClaims,
      completionScope: delegation ? 'worker evidence publication; outer batch closure and final census required' : 'evidence publication only; invocation receipt after lock release is required for operational completion',
    };
    finalBinding = publish(resolve(output, 'evaluation.json'), final, budget); immutable.push(finalBinding); admit();
  } catch (error) { primaryError = error; }
  finally {
    try { if (lock && !unsafeClosure) releaseLock(lock); }
    catch (error) { primaryError ??= error; }
    process.off('SIGINT', onSignal); process.off('SIGTERM', onSignal);
  }
  if (primaryError) { delegation?.close(); throw primaryError; }
  // No success marker can precede owned-process closure, lock release, final
  // rereads and the inclusive deadline check. This is not scientific acceptance.
  admit();
  const receipt = publish(resolve(output, 'invocation-receipt.json'), { ...finalBinding, accepted: false,
    operationallyComplete: false, finalStdoutSealRequired: true, sharedLockReleased: !delegation,
    ...(delegation ? delegation.finish() : {}), ...finalSummary,
      elapsedSecondsBeforeInvocationReceipt: (Date.now() - beganEpoch) / 1000,
      ...(schedule ? { operationalSchedule: schedule.report() } : {}) }, budget);
  admit(); authenticateBindings([receipt]); assertBeforeDeadline(deadlineEpochMs, 'inclusive finalization deadline');
  schedule?.assertFinalization();
  process.stdout.write(JSON.stringify({ ...receipt, accepted: false, operationallyComplete: true,
    launcherResourceUsage: process.resourceUsage(),
    ...(schedule ? { operationalSchedule: schedule.report() } : {}),
    elapsedSecondsThroughFinalChecks: (Date.now() - beganEpoch) / 1000 }) + '\n');
  delegation?.close();
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { process.stderr.write(JSON.stringify({ accepted: false, failure: error.message, ownedProcessClosureUnresolved: error.ownedProcessClosureUnresolved === true }) + '\n'); process.exitCode = 1; if(process.connected)process.disconnect(); });
}
