import { evaluateEomCubicHistoryAtTime } from '../shared/EomCubicHistoryEvaluation.mjs';
import {validateSurfaceGeometry,circleOnSurface,matchingSurfaceGeometry,sameDecimal} from './SurfaceGeometry.js';
export const PLAYBACK_RECORD_LIMIT = 12 * 1024 * 1024;
const finite = value => typeof value==='string' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value) && Number.isFinite(Number(value));
function assertRequestSubset(request,prepared) { if(typeof request!=='object' || request===null) { if(request!==prepared) throw new Error('Imported preparation or numerical controls differ from checkpoint.'); return; } if(!prepared || typeof prepared!=='object') throw new Error('Missing checkpoint preparation.'); if(Array.isArray(request) && (!Array.isArray(prepared) || request.length!==prepared.length)) throw new Error('Checkpoint population mismatch.'); for(const [key,value] of Object.entries(request)) assertRequestSubset(value,prepared[key]); }
export function validateSurfaceRequest(request) {
  if (request?.schema!=='eom_evolution_request/v2' || request.model?.compositionId!=='canonical-surface/v1' || request.model.constraint!=='surface' || !finite(request.model.fieldSpeed) || request.model.fieldSpeed!=='1') throw new Error('This Surface viewer requires a normalized canonical surface request.');
  if(typeof request.runId!=='string' || !request.runId.length || new TextEncoder().encode(request.runId).length>1024 || !finite(request.model.coupling) || !['unrestricted','inclusive','strict'].includes(request.model.speedDomain) || !request.numerics || Array.isArray(request.numerics) || !finite(request.numerics.initialStep) || !(Number(request.numerics.initialStep)>0) || request.numerics.maximumStep!==undefined && (!finite(request.numerics.maximumStep)||!(Number(request.numerics.maximumStep)>0))) throw new Error('Import requires explicit run identity, coupling, speed domain and positive decimal step controls.');
  const g=validateSurfaceGeometry(request.model.geometry);
  if(request.model.boundaryPolicy!==(request.model.speedDomain==='unrestricted'?'none':'halt')) throw new Error('This viewer uses no boundary policy for unrestricted speed, and halts restricted domains at unsupported boundaries.');
  if (!Array.isArray(request.paths) || !request.paths.length || request.paths.length>12 || request.paths.some(p=>typeof p.pathId!=='string'||!p.pathId.length) || new Set(request.paths.map(p=>p.pathId)).size!==request.paths.length) throw new Error('A unique bounded population is required.');
  if (!finite(request.interval?.start) || !finite(request.interval?.end) || Number(request.interval.end)<Number(request.interval.start)) throw new Error('Invalid requested interval.');
  for(const p of request.paths) if (!['1','-1'].includes(p.charge) || p.history?.kind!=='uniform-circular' || !sameDecimal(p.history.end,request.interval.start) || ![p.history.radius,p.history.height,p.history.angularSpeed,p.history.phase,p.history.start,p.history.end].every(finite) || Number(p.history.start)>=Number(p.history.end) || p.history.speed!==undefined && !finite(p.history.speed) || ['tiltX','tiltY'].some(k=>p.history[k]!==undefined && !sameDecimal(p.history[k],'0')) || !circleOnSurface(g,p.history.radius,p.history.height)) throw new Error('Import must use exact latitude circles on the selected surface. EOM independently admits them before execution.');
  return request;
}
export function validateSurfaceRecord(record) {
  if(new TextEncoder().encode(JSON.stringify(record)).length>PLAYBACK_RECORD_LIMIT) throw new Error('Complete playback record exceeds 12 MiB. Full EOM evidence remains at its original host.');
  if(record?.schema!=='surface_playback_record/v1') throw new Error('Import a Surface playback record exported by this app.');
  const request=validateSurfaceRequest(record.request);
  if(!Array.isArray(record.results) || !record.results.length || record.results.length>80) throw new Error('No bounded accepted result series.');
  const ids=request.paths.map(p=>p.pathId);let end=Number(request.interval.start);let digest;
  for(const result of record.results){
    if(result.schema!=='eom_evolution_response/v2' || !['completed','halted','cancelled'].includes(result.status) || result.runId!==request.runId || !/^[a-f0-9]{64}$/.test(result.modelDigest) || (digest && digest!==result.modelDigest)) throw new Error('Run/model identity mismatch.');
    digest=result.modelDigest;
    if(result.checkpoint?.data) { assertRequestSubset(request,result.checkpoint.data.preparation); if(result.checkpoint.data.runId!==request.runId || Number(result.checkpoint.data.acceptedTime)!==Number(result.acceptedCoverage?.end)) throw new Error('Checkpoint coverage/identity mismatch.'); }
    const m=result.resolvedModel;
    if(m?.compositionId!==request.model.compositionId || m.selection?.constraint!=='surface' || m.selection.speedDomain!==request.model.speedDomain || m.selection.boundaryPolicy!==request.model.boundaryPolicy || !sameDecimal(m.parameters?.fieldSpeed,'1') || !sameDecimal(m.parameters.coupling,request.model.coupling) || !matchingSurfaceGeometry(request.model.geometry,m.parameters.surfaceGeometry)) throw new Error('Returned manifest differs from preparation.');
    if(Number(result.acceptedCoverage?.start)!==end || !finite(result.acceptedCoverage.end) || Number(result.acceptedCoverage.end)<end || !result.evidence || result.evidence.constraint!=='artificial-surface' || !(result.evidence.numericalAcceptance==='constrained_solution_enclosure' || result.status==='halted' && result.evidence.numericalAcceptance==='failed')) throw new Error('Accepted coverage or evidence missing.');
    const next=Number(result.acceptedCoverage.end);
    if(!Array.isArray(result.publishedExtensions) || result.publishedExtensions.length!==ids.length || new Set(result.publishedExtensions.map(p=>p.pathId)).size!==ids.length) throw new Error('Accepted population mismatch.');
    for(const h of result.publishedExtensions){
      if(!ids.includes(h.pathId) || !Array.isArray(h.segments) || h.segments.length>100000) throw new Error('Unknown path or oversized history.');
      let t=end;
      for(const s of h.segments){
        if(Number(s.start)!==t || !finite(s.end) || Number(s.end)<=t || Number(s.end)>next || s.coefficients?.length!==3 || s.coefficients.some(row=>row.length!==4 || !row.every(finite)) || [s.positionErrors,s.velocityErrors].some(row=>row?.length!==3 || row.some(v=>!finite(v) || Number(v)<0))) throw new Error('Invalid, missing or out-of-coverage accepted segment.');
        t=Number(s.end);
      }
      if(t!==next) throw new Error('Accepted path has a coverage gap.');
    }
    const segmentCount=result.publishedExtensions.reduce((sum,h)=>sum+h.segments.length,0),certificates=result.record?.acceptedSurface;
    if(!certificates || certificates.certificateCount!==segmentCount || certificates.certifiedCount!==segmentCount || (segmentCount && (![certificates.maximumDistance,certificates.maximumTangentVelocity].every(finite) || Number(certificates.maximumDistance)<0 || Number(certificates.maximumTangentVelocity)<0))) throw new Error('Accepted Surface certificate summary is missing or incomplete.');
    if((result.surfaceDiagnostics?.length ?? 0)>2048) throw new Error('Playback diagnostics exceed the sampled budget.');
    for(const row of result.surfaceDiagnostics ?? []) if(!ids.includes(row.pathId) || row.reception?.length!==2 || !row.reception.every(finite) || Number(row.reception[0])>Number(row.reception[1]) || Number(row.reception[0])<nextFloat(end,-1) || Number(row.reception[1])>nextFloat(next,1) || ['netInteraction','tangentInteraction','discardedNormal','curvature','support','totalAcceleration'].some(key=>row[key]?.length!==3 || row[key].some(v=>v?.length!==2 || !v.every(finite) || Number(v[0])>Number(v[1])))) throw new Error('Invalid receiver-total diagnostic interval.');
    end=next;
  }
  return record;
}
export function retainedHistories(record){
  const start=Number(record.request.interval.start),end=Number(record.results.at(-1).acceptedCoverage.end);
  return record.request.paths.map(p=>({pathId:p.pathId,charge:Number(p.charge),coverage:{start,end},segments:record.results.flatMap(r=>r.publishedExtensions.find(h=>h.pathId===p.pathId).segments.map(s=>({...s,startTime:s.start,endTime:s.end})))}));
}
// Display names only: positrinos p1, p2, … and electrinos e1, e2, … in request order. EOM pathIds are unchanged.
export function architrinoLabels(paths){const counts={p:0,e:0};return new Map(paths.map(p=>{const k=Number(p.charge)>0?'p':'e';return [p.pathId,`${k}${++counts[k]}`];}));}
export function evaluateSurfacePath(history,time){return evaluateEomCubicHistoryAtTime(history,time);}
export function nearestSurfaceDiagnostic(record,pathId,time){
  const rows=record.results.flatMap(r=>r.surfaceDiagnostics ?? []).filter(r=>r.pathId===pathId);
  return rows.reduce((best,row)=>!best || Math.abs((Number(row.reception[0])+Number(row.reception[1]))/2-time)<Math.abs((Number(best.reception[0])+Number(best.reception[1]))/2-time)?row:best,null);
}

// Allow only the producer's binary64 outward rounding at accepted endpoints.
function nextFloat(value,direction){if(value===0)return direction*Number.MIN_VALUE;const view=new DataView(new ArrayBuffer(8));view.setFloat64(0,value);view.setBigUint64(0,view.getBigUint64(0)+(value>0?BigInt(direction):-BigInt(direction)));return view.getFloat64(0);}
