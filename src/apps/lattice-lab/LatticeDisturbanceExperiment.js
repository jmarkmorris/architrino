import { canonicalJson } from '../shared/EomExecutionIdentity.js';

export const LATTICE_PATCH_RECORD_SCHEMA = 'lattice_patch_record/v1';
export const LATTICE_PATCH_RECORD_LIMIT = 12 * 1024 * 1024;
const axes = ['x', 'y', 'z'];
const decimal = value => typeof value === 'string' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value) && Number.isFinite(Number(value));

// A finite, open-boundary experiment. The held, displaced past is an input,
// never the implicit ancient nonlinear history of the infinite theorem.
export function createLatticeDisturbanceExperiment(settings = {}, runId = `lattice-patch-${globalThis.crypto.randomUUID()}`) {
  const { side = 3, amplitude = '0.02', axis = 'x', duration = '0.01' } = settings;
  if (![2, 3, 4].includes(side) || !axes.includes(axis) || !decimal(amplitude) || Number(amplitude) < 0 || Number(amplitude) > .2 || !decimal(duration) || Number(duration) <= 0 || Number(duration) > .1) throw new Error('Choose 2–4 sites per edge, displacement 0–0.2 and duration greater than zero and at most 0.1.');
  if (typeof runId !== 'string' || !/^lattice-patch-[a-zA-Z0-9-]{1,100}$/.test(runId)) throw new Error('Invalid finite-patch run identity.');
  const center = Math.floor(side / 2), offset = (side - 1) / 2;
  const historyStart = String(-Math.ceil(Math.sqrt(3) * (side - 1) + 2 * Number(amplitude) + 2));
  const paths = [];
  for (let i = 0; i < side; i++) for (let j = 0; j < side; j++) for (let k = 0; k < side; k++) {
    const selected = i === center && j === center && k === center;
    const position = [i - offset, j - offset, k - offset];
    if (selected) position[axes.indexOf(axis)] += Number(amplitude);
    paths.push({ pathId: `site-${i}-${j}-${k}`, charge: (i + j + k) % 2 ? '-1' : '1', history: { kind: 'cubic', segments: [{ start: historyStart, end: '0', coefficients: position.map(v => [String(v), '0', '0', '0']), positionErrors: ['0', '0', '0'], velocityErrors: ['0', '0', '0'] }] } });
  }
  return {
    schema: 'eom_evolution_request/v2', runId,
    model: { compositionId: 'canonical/v1', constraint: 'none', speedDomain: 'unrestricted', boundaryPolicy: 'none', fieldSpeed: '1', coupling: '16' },
    interval: { start: '0', end: duration }, paths,
    numerics: { initialStep: '0.002', maximumStep: '0.002', minimumStep: '0.00003125', rootTolerance: '1e-7', accelerationTolerance: '0.001', positionTolerance: '0.00001', velocityTolerance: '0.0001', correctionTolerance: '0.0001', maxStepAttempts: 120, maxRejectedSteps: 30 },
    resources: { memoryBytes: 536870912 },
  };
}

export function latticePatchOrigin(path) {
  const index = path.pathId.split('-').slice(1).map(Number);
  return { index, position: path.history.segments[0].coefficients.map(c => Number(c[0])) };
}

export function validateLatticePatchRecord(record) {
  if (new TextEncoder().encode(JSON.stringify(record)).length > LATTICE_PATCH_RECORD_LIMIT) throw new Error('Playback record exceeds 12 MiB.');
  if (record?.schema !== LATTICE_PATCH_RECORD_SCHEMA || !record.settings || !record.request) throw new Error('Import a finite lattice-patch run exported by this section.');
  const expected = createLatticeDisturbanceExperiment(record.settings, record.request.runId);
  if (canonicalJson(expected) !== canonicalJson(record.request)) throw new Error('Preparation differs from the supported finite-patch experiment.');
  const result = record.result, request = record.request;
  if (result?.schema !== 'eom_evolution_response/v2' || !['completed', 'halted', 'cancelled'].includes(result.status) || result.runId !== request.runId || !/^[a-f0-9]{64}$/.test(result.modelDigest)) throw new Error('Run identity or EOM response is invalid.');
  const model = result.resolvedModel;
  // The model manifest uses the engine's canonical decimal tokens, not the
  // spelling of the request's input tokens.
  if (model?.compositionId !== 'canonical/v1' || model.selection?.constraint !== 'none' || model.selection?.speedDomain !== 'unrestricted' || model.selection?.boundaryPolicy !== 'none' || model.parameters?.fieldSpeed !== '1e0' || model.parameters?.coupling !== '16e0') throw new Error('The record does not use this section’s normalized canonical equation.');
  const end = Number(result.acceptedCoverage?.end);
  if (result.acceptedCoverage?.start !== '0' || !decimal(result.acceptedCoverage?.end) || end < 0 || end > Number(request.interval.end)) throw new Error('Accepted coverage is outside the requested interval.');
  const histories = result.publishedExtensions;
  if (!Array.isArray(histories) || histories.length !== request.paths.length || new Set(histories.map(h => h.pathId)).size !== request.paths.length) throw new Error('The published population is incomplete.');
  for (const path of request.paths) {
    const history = histories.find(h => h.pathId === path.pathId);
    if (!history || !Array.isArray(history.segments) || history.segments.length > 10000) throw new Error('A published member history is missing.');
    let time = 0;
    for (const s of history.segments) {
      if (!decimal(s.start) || !decimal(s.end) || Number(s.start) !== time || Number(s.end) <= time || Number(s.end) > end || s.coefficients?.length !== 3 || s.coefficients.some(row => row.length !== 4 || !row.every(decimal)) || [s.positionErrors, s.velocityErrors].some(row => row?.length !== 3 || row.some(v => !decimal(v) || Number(v) < 0))) throw new Error('A published cubic has a gap, invalid coefficients or invalid uncertainty.');
      time = Number(s.end);
    }
    if (time !== end) throw new Error('A member does not cover the accepted interval.');
  }
  return record;
}

export function latticePatchHistories(record) {
  validateLatticePatchRecord(record);
  const end = Number(record.result.acceptedCoverage.end);
  return record.request.paths.map(path => ({ pathId: path.pathId, charge: Number(path.charge), coverage: { start: 0, end }, segments: record.result.publishedExtensions.find(h => h.pathId === path.pathId).segments.map(s => ({ ...s, startTime: s.start, endTime: s.end })) }));
}
