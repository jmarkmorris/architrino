import { pulsePreparation, scaledDecimal } from './LatticePulsePreparation.js';
import { canonicalJson } from '../shared/EomExecutionIdentity.js';

export const LATTICE_PATCH_RECORD_SCHEMA = 'lattice_patch_record/v2';
export const LEGACY_LATTICE_PATCH_RECORD_SCHEMA = 'lattice_patch_record/v1';
export const LATTICE_PATCH_RECORD_LIMIT = 12 * 1024 * 1024;
const axes = ['x', 'y', 'z'];
const decimal = value => typeof value === 'string' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value) && Number.isFinite(Number(value));

// A finite, open-boundary experiment. The held, displaced past is an input,
// never the implicit ancient nonlinear history of the infinite theorem.
export function createLatticeDisturbanceExperiment(settings = {}, runId = `lattice-patch-${globalThis.crypto.randomUUID()}`) {
  if (settings.preparation) return createPulseExperiment(settings, runId);
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
  if (record?.schema === LATTICE_PATCH_RECORD_SCHEMA) return validatePulseRecord(record);
  if (record?.schema !== LEGACY_LATTICE_PATCH_RECORD_SCHEMA || !record.settings || !record.request) throw new Error('Import a finite lattice-patch run exported by this section.');
  if (record.settings.preparation) throw new Error('The legacy format cannot declare a pulse preparation.');
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

export function latticePatchHistories(record, control = false) {
  validateLatticePatchRecord(record);
  if (record.schema === LATTICE_PATCH_RECORD_SCHEMA) return pulseHistories(record, control);
  const end = Number(record.result.acceptedCoverage.end);
  return record.request.paths.map(path => ({ pathId: path.pathId, charge: Number(path.charge), coverage: { start: 0, end }, segments: record.result.publishedExtensions.find(h => h.pathId === path.pathId).segments.map(s => ({ ...s, startTime: s.start, endTime: s.end })) }));
}

function createPulseExperiment(settings, runId) {
  const { side = 3, spacing = 256, amplitude = '0.02', axis = 'x', duration = '1.5', preparation = 'pulse', quality = 'display' } = settings;
  if (![2,3,4].includes(side) || ![1,16,64,256].includes(spacing) || !axes.includes(axis) || !['pulse','held'].includes(preparation) || !['display','refined'].includes(quality) || !decimal(amplitude) || Number(amplitude)<0 || Number(amplitude)>.2 || !decimal(duration) || Number(duration)<=0 || Number(duration)>4) throw new Error('Choose a supported patch, spacing, displacement 0–0.2 and duration up to four wake-crossing times.');
  if (typeof runId !== 'string' || !/^lattice-patch-[a-zA-Z0-9-]{1,100}$/.test(runId)) throw new Error('Invalid finite-patch run identity.');
  const refinement = quality === 'refined' ? 4 : 1;
  return { schema:'eom_evolution_request/v2', runId,
    model:{ compositionId:'canonical/v1', constraint:'none', speedDomain:'unrestricted', boundaryPolicy:'none', fieldSpeed:'1', coupling:'16' },
    interval:{start:'0',end:scaledDecimal(duration,spacing)},
    paths:pulsePreparation({side,spacing,amplitude,axis,preparation}),
    numerics:{ initialStep:String(spacing/100), maximumStep:String(spacing/20), minimumStep:String(spacing/262144), rootTolerance:String(spacing*.0001/refinement), accelerationTolerance:String(.000001/refinement), positionTolerance:String(spacing*.00001/refinement), velocityTolerance:String(.0001/refinement), correctionTolerance:String(.0001/refinement), continuousAdaptive:true, adaptiveGrowth:true, threadCount:4, maxStepAttempts:2000, maxRejectedSteps:100 },
    resources:{memoryBytes:536870912} };
}
export function compactLatticeResult(result) {
  const copy = structuredClone(result);
  if (copy.checkpoint) copy.checkpoint.data = null;
  return copy;
}
export function latticeRecordEnd(record, control = false) {
  if (record.schema === LEGACY_LATTICE_PATCH_RECORD_SCHEMA) return control ? 0 : Number(record.result.acceptedCoverage.end);
  return Number((control ? record.control.parts : record.parts).at(-1)?.acceptedCoverage.end ?? 0);
}
export function latticeRecordResult(record) { return record.schema === LEGACY_LATTICE_PATCH_RECORD_SCHEMA ? record.result : record.parts.at(-1); }
export function latticeRecordStart(record) { return record.schema === LEGACY_LATTICE_PATCH_RECORD_SCHEMA || record.settings.preparation !== 'pulse' ? 0 : -record.settings.spacing/4; }
function validatePartSeries(request, parts, digest) {
  if (!Array.isArray(parts) || parts.length>32) throw new Error('Invalid continuation series.');
  let time=0;
  for (const result of parts) {
    if (result.schema!=='eom_evolution_response/v2' || !['completed','halted','cancelled'].includes(result.status) || result.runId!==request.runId || result.modelDigest!==digest || !/^[a-f0-9]{64}$/.test(digest)) throw new Error('Continuation identity differs.');
    const model=result.resolvedModel;
    if (model?.compositionId!=='canonical/v1' || model.selection?.constraint!=='none' || model.selection?.speedDomain!=='unrestricted' || model.selection?.boundaryPolicy!=='none' || model.parameters?.fieldSpeed!=='1e0' || model.parameters?.coupling!=='16e0') throw new Error('Wrong normalized canonical model.');
    const start=Number(result.acceptedCoverage?.start), end=Number(result.acceptedCoverage?.end);
    if(start!==time || !Number.isFinite(end) || end<start || end>Number(request.interval.end))throw new Error('Continuation coverage has a gap or exceeds the request.');
    const hs=result.publishedExtensions;
    if(!Array.isArray(hs)||hs.length!==request.paths.length||new Set(hs.map(h=>h.pathId)).size!==hs.length)throw new Error('Incomplete continuation population.');
    for(const path of request.paths){const h=hs.find(h=>h.pathId===path.pathId);let t=start;if(!h||!Array.isArray(h.segments)||h.segments.length>10000)throw new Error('Missing continuation history.');for(const s of h.segments){if(!decimal(s.start)||!decimal(s.end)||Number(s.start)!==t||Number(s.end)<=t||Number(s.end)>end||s.coefficients?.length!==3||s.coefficients.some(c=>c.length!==4||!c.every(decimal))||[s.positionErrors,s.velocityErrors].some(c=>c?.length!==3||c.some(v=>!decimal(v)||Number(v)<0)))throw new Error('Invalid continuation cubic.');t=Number(s.end);}if(t!==end)throw new Error('Incomplete member coverage.');}
    time=end;
  }
}
function validatePulseRecord(record) {
  if (!record.settings?.preparation || !record.request || !record.control?.request) throw new Error('A paired pulse record is required.');
  const expected=createPulseExperiment(record.settings,record.request.runId);
  const controlExpected=createPulseExperiment({...record.settings,amplitude:'0'},record.control.request.runId);
  if(canonicalJson(expected)!==canonicalJson(record.request)||canonicalJson(controlExpected)!==canonicalJson(record.control.request))throw new Error('Pulse preparation differs from its declared settings.');
  const digest=record.parts?.[0]?.modelDigest ?? record.control.parts?.[0]?.modelDigest;
  if(!digest)throw new Error('A record requires at least one accepted calculation.');
  validatePartSeries(record.request,record.parts,digest);validatePartSeries(record.control.request,record.control.parts,digest);
  if (latticeRecordEnd(record)>latticeRecordEnd(record,true)) throw new Error('The pulse exceeds its comparison coverage.');
  for (const control of [false,true]) for (const h of pulseHistories(record,control)) for (let i=1;i<h.segments.length;i++) checkJoin(h.segments[i-1],h.segments[i]);
  return record;
}
function pulseHistories(record, control) {
  const request=control?record.control.request:record.request, parts=control?record.control.parts:record.parts;
  const end=latticeRecordEnd(record,control);
  return request.paths.map(path=>({pathId:path.pathId,charge:Number(path.charge),coverage:{start:Number(path.history.segments[0].start),end},segments:[...path.history.segments,...parts.flatMap(p=>p.publishedExtensions.find(h=>h.pathId===path.pathId).segments)].map(s=>({...s,startTime:s.start,endTime:s.end}))}));
}

function checkJoin(left, right) {
  const dt=Number(left.end)-Number(left.start);
  for(let axis=0;axis<3;axis++){
    const c=left.coefficients[axis].map(Number),r=right.coefficients[axis].map(Number);
    const p=c[0]+dt*(c[1]+dt*(c[2]+dt*c[3])),v=c[1]+dt*(2*c[2]+dt*3*c[3]);
    const round=32*Number.EPSILON*Math.max(1,...c.map(Math.abs),...r.map(Math.abs),Math.abs(p),Math.abs(v));
    if(Math.abs(p-r[0])>Number(left.positionErrors[axis])+Number(right.positionErrors[axis])+round || Math.abs(v-r[1])>Number(left.velocityErrors[axis])+Number(right.velocityErrors[axis])+round)throw new Error('A retained position or velocity join is discontinuous.');
  }
}
