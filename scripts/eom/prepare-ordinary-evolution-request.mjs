#!/usr/bin/env node
// Preparation only. Never construct the process client or execute an EOM binary.
import { createHash } from 'node:crypto';
import { constants, openSync, fstatSync, readSync, closeSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { encodeNativeRequest, BORG_NATIVE_EOM_PROTOCOL_MAGIC } from './BorgNativeEomProcessClient.mjs';
import { canonicalStringify, validateBorgCertifiedBudgetPreset } from '../../src/apps/borg/BorgCertifiedBudgets.js';

export const SCHEMA = 'braid-program/ordinary-evolution-request-preparation.v1';
export const INPUT_LIMIT_BYTES = 16 * 1024 * 1024;
export const F5_HISTORY_EVIDENCE = Object.freeze([
  Object.freeze({ role: 'past-only-handoff', path: '.local-data/braid-analysis/f5-prehistory-handoff-20260827-v1/handoff.json', sha256: '4e0696a848a0d36ccbe5948295e71738c933b7ea120e9aee00e2effdd6ecc149' }),
  Object.freeze({ role: 'handoff-conformance', path: '.local-data/braid-analysis/f5-prehistory-handoff-20260827-v1/handoff-conformance.json', sha256: '5b7ddc53d47a97f81383bd043c37e93daa80fe5a9b595d400faddd4c9724b622' }),
]);
const CONTROL_KEYS = ['initialStep', 'minimumStep', 'maximumStep', 'useAdaptiveStepGrowth', 'rootTolerance', 'accelerationTolerance', 'farFieldEnclosureFraction', 'positionTolerance', 'velocityTolerance', 'correctionTolerance', 'threadCount'];
const LIMIT_KEYS = ['wallSeconds', 'heartbeatSeconds', 'aggregateRssBytes', 'rssSampleIntervalSeconds', 'logBytes', 'outputBytes', 'diskMinimumBytes'];
const BUDGET_LEAVES = [
  'schema', 'presetId', 'topLevel.positionIncrement', 'topLevel.velocityIncrement',
  'controller.initialStep', 'controller.minimumStep', 'controller.maximumStep', 'controller.adaptiveGrowth',
  'ordinary.rootTimeEnclosure', 'ordinary.accelerationEnclosure', 'ordinary.farFieldEnclosureFraction',
  'ordinary.acceptedStepPosition', 'ordinary.acceptedStepVelocity', 'ordinary.correctionAccelerationResidual',
  'ordinary.transmitterFactorFloor', 'ordinary.chartPolicy', 'ordinary.quadratureTolerance',
  'finiteWidth.causalWidth', 'finiteWidth.coreScale', 'finiteWidth.receiverImpulseTotal',
  'finiteWidth.receiverPositionMomentTotal', 'finiteWidth.independentOverlap',
  'finiteWidth.rowFractions.quadrature', 'finiteWidth.rowFractions.causalWidthRegulator',
  'finiteWidth.rowFractions.coreRegulator', 'finiteWidth.rowFractions.finiteWidthStateNumerical',
  'finiteWidth.rowFractions.amendment1RegulatorMatching', 'finiteWidth.regulatorRefinementRatio',
  'finiteWidth.regulatorLevels', 'finiteWidth.receiverAllocationRule',
  'finiteWidth.finiteWidthStateNumericalFractions.retainedHistory',
  'finiteWidth.finiteWidthStateNumericalFractions.interpolation',
  'finiteWidth.finiteWidthStateNumericalFractions.rounding',
  'finiteWidth.finiteWidthStateNumericalFractions.endpointLinearShortcut',
  'precision.difficultRowInitialBits', 'precision.difficultRowMaximumBits',
  'precision.deterministicReduction', 'precision.roundingMode',
  'resources.rootMaximumDepth', 'resources.rootMaximumCells', 'resources.quadratureMaximumDepth',
  'resources.quadratureMaximumCells', 'resources.eventMaximumDepth', 'resources.eventMaximumCells',
  'resources.correctionIterations', 'resources.maximumStepAttempts', 'resources.maximumRejectedSteps',
  'resources.workerThreads', 'resources.requestMemoryBytes',
];
const get = (object, dotted) => dotted.split('.').reduce((value, key) => value?.[key], object);
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const clone = (value) => JSON.parse(JSON.stringify(value));
function object(value, keys, label) {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${label}: expected object`);
  for (const key of Object.keys(value)) if (!keys.includes(key)) throw new TypeError(`${label}: unexpected field ${key}`);
}
function text(value, label) {
  if (typeof value !== 'string' || !value.length || value.length > 1024 || /[\x00-\x1f\x7f]/u.test(value)) throw new TypeError(`${label}: nonempty single-line string required`);
  return value;
}
// Exact decimal comparisons protect time/cut tokens; this is not interval arithmetic.
function decimal(value, label) {
  if (typeof value !== 'string' || value.length > 256 || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/u.test(value) || !Number.isFinite(Number(value))) throw new TypeError(`${label}: finite decimal string required`);
  const [mantissa, exp = '0'] = value.toLowerCase().split('e');
  if (Math.abs(Number(exp)) > 1000) throw new RangeError(`${label}: decimal exponent exceeds preparation bound`);
  const scale = (mantissa.split('.')[1]?.length ?? 0) - Number(exp);
  let numerator = BigInt(mantissa.replace('.', '')); let denominator = 1n;
  if (scale >= 0) denominator = 10n ** BigInt(scale); else numerator *= 10n ** BigInt(-scale);
  return { numerator, denominator };
}
const compare = (a, b) => a.numerator * b.denominator - b.numerator * a.denominator;
function positiveToken(value, label) {
  const number = decimal(value, label);
  if (number.numerator <= 0n || !(Number(value) > 0)) throw new RangeError(`${label}: positive representable decimal required`);
  return number;
}
function positiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new RangeError(`${label}: positive safe integer required`);
}

export function createOrdinaryEvolutionTemplate(candidateId) {
  text(candidateId, 'candidateId');
  return {
    candidateId,
    releaseTime: candidateId === 'f5' ? '0' : null,
    historyCoverageStart: candidateId === 'f5' ? '-1' : null,
    historyEvidence: candidateId === 'f5' ? clone(F5_HISTORY_EVIDENCE) : null,
    histories: null,
    settings: {
      runId: null, endTime: null,
      strength: { effectiveStrength: null, chargeMagnitude: null, coupling: null },
      numericalControls: Object.fromEntries(CONTROL_KEYS.map((key) => [key, null])),
      coreScale: null, certifiedBudget: null,
      operationalLimits: Object.fromEntries(LIMIT_KEYS.map((key) => [key, null])),
    },
  };
}

function validateHistories(input) {
  const release = decimal(input.releaseTime, 'releaseTime');
  const first = decimal(input.historyCoverageStart, 'historyCoverageStart');
  if (compare(first, release) >= 0n) throw new RangeError('retained history must precede release');
  if (!Array.isArray(input.histories) || !input.histories.length || input.histories.length > 1024) throw new TypeError('histories: nonempty bounded member array required');
  const ids = new Set(); const historyIds = new Set(); let count = 0;
  for (const [index, history] of input.histories.entries()) {
    const label = `histories[${index}]`;
    object(history, ['pathId', 'sourceHistoryId', 'sourceFingerprint', 'polarity', 'segments'], label);
    text(history.pathId, `${label}.pathId`); text(history.sourceHistoryId, `${label}.sourceHistoryId`);
    text(history.sourceFingerprint, `${label}.sourceFingerprint`);
    if (ids.has(history.pathId) || historyIds.has(history.sourceHistoryId)) throw new TypeError('duplicate member or history identity');
    ids.add(history.pathId); historyIds.add(history.sourceHistoryId);
    if (![1, -1].includes(history.polarity)) throw new TypeError(`${label}: polarity must be +1 or -1`);
    if (!Array.isArray(history.segments) || !history.segments.length) throw new TypeError(`${label}: missing segments`);
    let previous = input.historyCoverageStart;
    for (const segment of history.segments) {
      if (++count > 100000) throw new RangeError('preparation segment limit exceeded');
      object(segment, ['startTime', 'endTime', 'coefficients', 'positionErrors', 'velocityErrors'], 'segment');
      const start = decimal(segment.startTime, 'segment.startTime'); const end = decimal(segment.endTime, 'segment.endTime');
      if (segment.startTime !== previous || compare(start, end) >= 0n || compare(end, release) > 0n || !(Number(segment.endTime) > Number(segment.startTime))) throw new RangeError('segment gap, overlap, degenerate interval, or supplied future');
      previous = segment.endTime;
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3 || segment.coefficients.some((axis) => !Array.isArray(axis) || axis.length !== 4)) throw new TypeError('coefficient shape must be 3 by 4');
      segment.coefficients.flat().forEach((token) => decimal(token, 'coefficient'));
      for (const key of ['positionErrors', 'velocityErrors']) {
        if (!Array.isArray(segment[key]) || segment[key].length !== 3) throw new TypeError(`${key}: three axis tokens required`);
        for (const token of segment[key]) if (decimal(token, key).numerator < 0n) throw new RangeError(`${key}: negative radius`);
      }
    }
    if (previous !== input.releaseTime) throw new RangeError('every retained history must end at the exact release token');
  }
  return count;
}

function checkSettings(settings) {
  const strength = settings.strength;
  const k = positiveToken(strength.effectiveStrength, 'effectiveStrength');
  const q = positiveToken(strength.chargeMagnitude, 'chargeMagnitude');
  const coupling = positiveToken(strength.coupling, 'coupling');
  if (k.numerator * coupling.denominator * q.denominator ** 2n !== coupling.numerator * q.numerator ** 2n * k.denominator) throw new RangeError('effectiveStrength must equal coupling * chargeMagnitude^2 exactly');
  const controls = settings.numericalControls;
  for (const key of CONTROL_KEYS.filter((key) => !['threadCount', 'useAdaptiveStepGrowth', 'farFieldEnclosureFraction'].includes(key))) positiveToken(controls[key], key);
  if (typeof controls.useAdaptiveStepGrowth !== 'boolean') throw new TypeError('useAdaptiveStepGrowth: explicit boolean required');
  positiveInteger(controls.threadCount, 'threadCount');
  const far = decimal(controls.farFieldEnclosureFraction, 'farFieldEnclosureFraction');
  if (far.numerator < 0n || far.numerator >= far.denominator) throw new RangeError('farFieldEnclosureFraction must lie in [0,1)');
  if (compare(decimal(controls.minimumStep), decimal(controls.initialStep)) > 0n || compare(decimal(controls.initialStep), decimal(controls.maximumStep)) > 0n) throw new RangeError('minimumStep <= initialStep <= maximumStep required');
  positiveToken(settings.coreScale, 'coreScale');
  for (const key of LIMIT_KEYS) {
    if (key.endsWith('Bytes')) positiveInteger(settings.operationalLimits[key], key);
    else if (typeof settings.operationalLimits[key] !== 'number' || !Number.isFinite(settings.operationalLimits[key]) || settings.operationalLimits[key] <= 0) throw new RangeError(`${key}: positive finite seconds required`);
  }
  if (settings.operationalLimits.heartbeatSeconds > settings.operationalLimits.wallSeconds || settings.operationalLimits.rssSampleIntervalSeconds > settings.operationalLimits.wallSeconds) throw new RangeError('observation interval exceeds wall budget');
  const budget = settings.certifiedBudget; const a = budget.allocations;
  text(budget.presetId, 'certifiedBudget.presetId');
  if (a.schema !== 'borg_certified_budget/v1' || a.presetId !== budget.presetId) throw new TypeError('certified budget identity mismatch');
  for (const path of BUDGET_LEAVES) {
    const value = get(a, path);
    if (path.startsWith('resources.') || ['precision.difficultRowInitialBits', 'precision.difficultRowMaximumBits', 'finiteWidth.regulatorLevels'].includes(path)) positiveInteger(value, path);
    else if (path === 'controller.adaptiveGrowth') { if (typeof value !== 'boolean') throw new TypeError(`${path}: boolean required`); }
    else if (['schema', 'presetId', 'ordinary.chartPolicy', 'precision.deterministicReduction', 'precision.roundingMode', 'finiteWidth.receiverAllocationRule'].includes(path)) text(value, path);
    else if (['ordinary.farFieldEnclosureFraction', 'finiteWidth.independentOverlap'].includes(path)) {
      if (decimal(value, path).numerator < 0n) throw new RangeError(`${path}: nonnegative token required`);
    } else positiveToken(value, path);
  }
  if (a.resources.requestMemoryBytes > settings.operationalLimits.aggregateRssBytes) throw new RangeError('request memory exceeds outer RSS limit');
  if (a.precision.difficultRowInitialBits > a.precision.difficultRowMaximumBits) throw new RangeError('precision order invalid');
  if (a.precision.forceEventPrecisionEscalation != null && a.precision.forceEventPrecisionEscalation !== false) throw new TypeError('this transport fixes forceEventPrecisionEscalation false');
  if (!['sharp', 'finite_width', 'sharp_with_finite_width_fallback'].includes(a.ordinary.chartPolicy)) throw new TypeError('unsupported chart policy');
  if (a.precision.roundingMode !== 'outward' || a.precision.deterministicReduction !== 'fixed-pairwise' || a.finiteWidth.receiverAllocationRule !== 'equal-routed-pair-weight/v1') throw new TypeError('unsupported rounding/reduction/allocation policy');
  // Invoke the canonical validation, not a copied allocation/transport implementation.
  validateBorgCertifiedBudgetPreset({ id: budget.presetId, allocations: a, allocationCanonicalJson: budget.allocationCanonicalJson, allocationHash: budget.allocationHash });
  if (sha(budget.allocationCanonicalJson) !== budget.allocationHash || canonicalStringify(a) !== budget.allocationCanonicalJson) throw new TypeError('canonical budget allocation/hash mismatch');
  if (controls.initialStep !== a.controller.initialStep) throw new TypeError('initialStep differs from explicit budget token');
  const correspondence = { minimumStep: 'controller.minimumStep', maximumStep: 'controller.maximumStep', useAdaptiveStepGrowth: 'controller.adaptiveGrowth', rootTolerance: 'ordinary.rootTimeEnclosure', accelerationTolerance: 'ordinary.accelerationEnclosure', farFieldEnclosureFraction: 'ordinary.farFieldEnclosureFraction', positionTolerance: 'ordinary.acceptedStepPosition', velocityTolerance: 'ordinary.acceptedStepVelocity', correctionTolerance: 'ordinary.correctionAccelerationResidual', threadCount: 'resources.workerThreads' };
  for (const [key, path] of Object.entries(correspondence)) if (controls[key] !== get(a, path)) throw new TypeError(`${key}: exact budget token mismatch`);
  if (settings.coreScale !== a.finiteWidth.coreScale) throw new TypeError('coreScale: exact budget token mismatch');
}

export function prepareOrdinaryEvolutionRequest(input) {
  object(input, ['candidateId', 'releaseTime', 'historyCoverageStart', 'historyEvidence', 'histories', 'settings'], 'input');
  text(input.candidateId, 'candidateId');
  object(input.settings, ['runId', 'endTime', 'strength', 'numericalControls', 'coreScale', 'certifiedBudget', 'operationalLimits'], 'settings');
  const s = input.settings;
  object(s.strength, ['effectiveStrength', 'chargeMagnitude', 'coupling'], 'strength');
  object(s.numericalControls, CONTROL_KEYS, 'numericalControls');
  object(s.operationalLimits, LIMIT_KEYS, 'operationalLimits');
  if (s.certifiedBudget != null) object(s.certifiedBudget, ['presetId', 'allocations', 'allocationCanonicalJson', 'allocationHash'], 'certifiedBudget');
  const missing = [];
  const requireValue = (path) => { if (get(input, path) == null) missing.push(path); };
  for (const path of ['releaseTime', 'historyCoverageStart', 'historyEvidence', 'histories', 'settings.runId', 'settings.endTime', 'settings.coreScale', ...['effectiveStrength', 'chargeMagnitude', 'coupling'].map((key) => `settings.strength.${key}`), ...CONTROL_KEYS.map((key) => `settings.numericalControls.${key}`), ...LIMIT_KEYS.map((key) => `settings.operationalLimits.${key}`)]) requireValue(path);
  if (s.certifiedBudget == null) missing.push('settings.certifiedBudget');
  else {
    for (const key of ['presetId', 'allocationCanonicalJson', 'allocationHash', 'allocations']) requireValue(`settings.certifiedBudget.${key}`);
    if (s.certifiedBudget.allocations != null) for (const path of BUDGET_LEAVES) requireValue(`settings.certifiedBudget.allocations.${path}`);
  }
  if (input.candidateId === 'f5' && (input.releaseTime !== '0' || input.historyCoverageStart !== '-1')) throw new TypeError('F5 preparation preserves declared [-1,0] release');
  if (input.historyEvidence != null) {
    if (!Array.isArray(input.historyEvidence) || !input.historyEvidence.length) throw new TypeError('historyEvidence must name supplied provenance');
    for (const binding of input.historyEvidence) {
      object(binding, ['role', 'path', 'sha256'], 'historyEvidence'); text(binding.role, 'binding.role'); text(binding.path, 'binding.path');
      if (!/^[a-f0-9]{64}$/u.test(binding.sha256)) throw new TypeError('history evidence SHA-256 required');
    }
  }
  const segmentCount = input.histories != null && input.releaseTime != null && input.historyCoverageStart != null ? validateHistories(input) : null;
  const preparation = {
    schema: SCHEMA, candidateId: input.candidateId, accepted: false, executionAuthorized: false,
    eomExecuted: false, historyEvidenceAuthenticated: false, initialStateConformanceEstablished: false,
    physicalStrengthAuthorized: false, h3EvidenceEligible: false, scoreAuthorized: false,
    status: missing.length ? 'missing-explicit-settings' : 'mechanically-prepared-not-authorized',
    missingRequiredSettings: missing, input: clone(input), segmentCount,
    initialStatePolicy: 'RetainedHistory.endpoint_state_hull; no independent nominal override',
    prescribedFuturePolicy: 'prohibited-as-input; comparison-only outside this request',
    transport: { protocol: BORG_NATIVE_EOM_PROTOCOL_MAGIC, encoder: 'scripts/eom/BorgNativeEomProcessClient.mjs#encodeNativeRequest', consumer: 'src/eom/native/eom_borg_shadow_cli.cpp', namespace: 'borg-eom-shadow/<pathId>', useQuarterStepPublication: true, useFarFieldEnclosureInEvolution: false, freshHistoryCache: true, implementationBindingRequiredBeforeExecution: true },
    historyNamespaceMapping: input.histories?.map((h) => ({ pathId: h.pathId, sourceHistoryId: h.sourceHistoryId, sourceFingerprint: h.sourceFingerprint, consumerHistoryId: `borg-eom-shadow/${h.pathId}`, consumerFingerprint: null })) ?? [],
    canonicalBudgetGate: 'not-checked', transportRequest: null, wire: null,
    laterObligations: ['authenticate history/proof/source/build bytes and actual endpoint/fingerprint mapping', 'explicit scientific settings and launch predeclaration', 'independent generated-history acceptance', 'inclusive resource supervision and process closure'],
  };
  if (missing.length) return preparation;
  checkSettings(s); text(s.runId, 'runId');
  if (compare(decimal(s.endTime, 'endTime'), decimal(input.releaseTime, 'releaseTime')) <= 0n || !(Number(s.endTime) > Number(input.releaseTime))) throw new RangeError('endTime must be strictly after release');
  const magnitude = s.strength.chargeMagnitude;
  const request = {
    schema: 'eom_borg_shadow_request/v1', contractId: 'eom_evolution_contract/v1', contractAmendmentIds: [],
    modelBindingId: 'master_eom_binding/v1', runId: s.runId, runGrade: 'certified',
    absoluteTimeInterval: { start: input.releaseTime, end: s.endTime },
    histories: input.histories.map((h) => ({ pathId: h.pathId, charge: h.polarity === 1 ? magnitude : `-${magnitude.replace(/^\+/u, '')}`, stateFlags: 0, segments: clone(h.segments) })),
    numericalControls: clone(s.numericalControls),
    modelControls: { fieldSpeed: '1', coupling: s.strength.coupling, coreScale: s.coreScale, selfPairs: 'included-except-coincident-endpoint', futurePathPolicy: 'prohibited' },
    certifiedBudget: clone(s.certifiedBudget),
    resourceEnvelope: { memoryBudgetBytes: s.certifiedBudget.allocations.resources.requestMemoryBytes, failurePolicy: 'fail-closed', causalHistoryRetention: null },
  };
  const wire = encodeNativeRequest(request, { cachedHistories: null });
  preparation.canonicalBudgetGate = 'canonical-validator-and-encoder-passed-not-EOM-validation';
  preparation.transportRequest = request;
  preparation.wire = { utf8: wire, sha256: sha(wire), bytes: Buffer.byteLength(wire) };
  return preparation;
}

function readBoundInput(path, limit = INPUT_LIMIT_BYTES) {
  const fd = openSync(path, constants.O_RDONLY | constants.O_NONBLOCK | constants.O_NOFOLLOW);
  try {
    const before = fstatSync(fd, { bigint: true });
    if (!before.isFile() || before.size > BigInt(limit)) throw new TypeError('input must be a bounded regular file');
    const bytes = Buffer.alloc(Number(before.size)); let offset = 0;
    while (offset < bytes.length) { const n = readSync(fd, bytes, offset, bytes.length - offset, offset); if (!n) throw new Error('input truncated during capture'); offset += n; }
    const after = fstatSync(fd, { bigint: true });
    for (const key of ['dev', 'ino', 'size', 'mtimeNs', 'ctimeNs']) if (before[key] !== after[key]) throw new Error('input changed during capture');
    return { bytes, sha256: sha(bytes) };
  } finally { closeSync(fd); }
}

export function main(argv = process.argv.slice(2)) {
  if (argv.length === 1 && argv[0] === '--help') {
    process.stdout.write('Preparation only: --template CANDIDATE --out FILE | --input FILE --out FILE\n'); return;
  }
  if (argv.length !== 4 || !['--template', '--input'].includes(argv[0]) || argv[2] !== '--out') throw new TypeError('expected --template CANDIDATE --out FILE or --input FILE --out FILE');
  const output = resolve(argv[3]);
  const captured = argv[0] === '--input' ? readBoundInput(resolve(argv[1])) : null;
  const input = captured ? JSON.parse(captured.bytes.toString('utf8')) : createOrdinaryEvolutionTemplate(argv[1]);
  const result = prepareOrdinaryEvolutionRequest(input);
  if (captured) {
    result.inputBytes = { path: resolve(argv[1]), sha256: captured.sha256, bytes: captured.bytes.length };
    if (readBoundInput(resolve(argv[1])).sha256 !== captured.sha256) throw new Error('input changed before publication');
  }
  const bytes = Buffer.from(`${JSON.stringify(result, null, 2)}\n`);
  if (bytes.length > 8 * INPUT_LIMIT_BYTES) throw new RangeError('preparation output exceeds byte limit');
  writeFileSync(output, bytes, { flag: 'wx', mode: 0o600 });
  if (!readBoundInput(output, 8 * INPUT_LIMIT_BYTES).bytes.equals(bytes)) throw new Error('preparation output changed after publication');
  if (captured && readBoundInput(resolve(argv[1])).sha256 !== captured.sha256) throw new Error('input changed after publication; preparation has no authority');
  process.stdout.write(`${JSON.stringify({ schema: SCHEMA, accepted: false, executionAuthorized: false, eomExecuted: false, status: result.status, output, sha256: sha(bytes), bytes: bytes.length })}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
