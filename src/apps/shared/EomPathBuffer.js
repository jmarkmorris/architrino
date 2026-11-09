import { errorBoundChecking } from './ErrorBoundChecking.js';
const decimal = x => typeof x === 'string' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(x) && Number.isFinite(Number(x));
// A live path feed is provisional until the terminal record/checkpoint arrives.
// Validate a whole population before publishing any part of a chunk to the viewer.
export function createEomPathBuffer(request, modelDigest, { start = request.interval.start, end = request.interval.end } = {}) {
  let boundary = Number(start), sequence = 0;
  const histories = request.paths.map(p => ({pathId:p.pathId, charge:Number(p.charge), coverage:{start:Number(start),end:boundary}, segments:[]}));
  function accept(event) {
    if(event?.schema!=='eom_paths/v1' || event.runId!==request.runId || event.modelDigest!==modelDigest || event.errorBoundChecking!==errorBoundChecking(request) || event.durable!==false || event.sequence!==sequence+1) throw new Error('Live EOM path identity or sequence mismatch.');
    const a=event.acceptedCoverage?.start,b=event.acceptedCoverage?.end;
    if(!decimal(a)||!decimal(b)||Number(a)!==boundary||Number(b)<=boundary||Number(b)>Number(end))throw new Error('Live EOM coverage is discontinuous or outside the request.');
    const rows=event.publishedExtensions;
    if(!Array.isArray(rows)||rows.length!==histories.length||new Set(rows.map(h=>h.pathId)).size!==histories.length)throw new Error('Live EOM population mismatch.');
    const additions=histories.map(h=>{
      const row=rows.find(r=>r.pathId===h.pathId);if(!row||!Array.isArray(row.segments)||!row.segments.length)throw new Error('Live EOM member is missing.');
      let t=boundary,previous=h.segments.at(-1);
      for(const s of row.segments){
        if(!decimal(s.start)||!decimal(s.end)||Number(s.start)!==t||Number(s.end)<=t||Number(s.end)>Number(b)||s.coefficients?.length!==3||s.coefficients.some(c=>c.length!==4||!c.every(decimal))||[s.positionErrors,s.velocityErrors].some(c=>c?.length!==3||c.some(x=>!decimal(x)||Number(x)<0)))throw new Error('Invalid live EOM cubic.');
        if(previous)checkJoin(previous,s);
        previous=s;t=Number(s.end);
      }
      if(t!==Number(b))throw new Error('Incomplete live EOM member coverage.');
      return row.segments.map(s=>({...s,startTime:s.start,endTime:s.end}));
    });
    for(let i=0;i<histories.length;i++){histories[i].segments.push(...additions[i]);histories[i].coverage.end=Number(b);}
    boundary=Number(b);sequence=event.sequence;return histories;
  }
  function reconcile(result){
    if(result.runId!==request.runId || result.modelDigest!==modelDigest || (result.errorBoundChecking??'strict')!==errorBoundChecking(request) || Number(result.acceptedCoverage?.start)!==Number(start) || Number(result.acceptedCoverage?.end)!==boundary)throw new Error('Terminal EOM coverage differs from its path feed.');
    if(!Array.isArray(result.publishedExtensions)||result.publishedExtensions.length!==histories.length||new Set(result.publishedExtensions.map(h=>h.pathId)).size!==histories.length)throw new Error('Terminal EOM population differs from the live feed.');
    for(const h of histories){const row=result.publishedExtensions?.find(p=>p.pathId===h.pathId);const plain=h.segments.map(({startTime,endTime,...s})=>s);if(JSON.stringify(row?.segments)!==JSON.stringify(plain))throw new Error('Terminal EOM cubics differ from the live feed.');}
  }
  return {histories,accept,reconcile,get end(){return boundary;},get sequence(){return sequence;}};
}
function checkJoin(left,right){
  const dt=Number(left.end)-Number(left.start);
  for(let axis=0;axis<3;axis++){
    const c=left.coefficients[axis].map(Number),r=right.coefficients[axis].map(Number);
    const p=c[0]+dt*(c[1]+dt*(c[2]+dt*c[3])),v=c[1]+dt*(2*c[2]+dt*3*c[3]);
    const round=128*Number.EPSILON*Math.max(1,...c.map(Math.abs),...r.map(Math.abs),Math.abs(p),Math.abs(v));
    if(Math.abs(p-r[0])>Number(left.positionErrors[axis])+Number(right.positionErrors[axis])+round||Math.abs(v-r[1])>Number(left.velocityErrors[axis])+Number(right.velocityErrors[axis])+round)throw new Error('Live EOM position/velocity join is discontinuous.');
  }
}
