// Display adapter for retained analytical evidence. This module never evolves motion.
export const SIX_POLE_CASE='six-pole-rest-r10';
export const SIX_POLE_SCHEMA='surface_analytical_replay/v1';
export const SIX_POLE_DATA_URL=new URL('./data/six-pole-rest-r10.json',import.meta.url);
export const SIX_POLE_MEMBERS=Object.freeze([
  {pathId:'px',charge:'1',axis:0,sign:1},{pathId:'py',charge:'1',axis:1,sign:1},{pathId:'pz',charge:'1',axis:2,sign:1},
  {pathId:'ex',charge:'-1',axis:0,sign:-1},{pathId:'ey',charge:'-1',axis:1,sign:-1},{pathId:'ez',charge:'-1',axis:2,sign:-1}
]);
export function createSixPolePreparation(){return {
  schema:'surface_analytical_preparation/v1',runId:SIX_POLE_CASE,
  model:{compositionId:'canonical-surface/v1',constraint:'surface',fieldSpeed:'1',coupling:'1',geometry:{kind:'sphere',radius:'10'},speedDomain:'strict',boundaryPolicy:'halt'},
  interval:{start:'0',end:'0'},paths:SIX_POLE_MEMBERS.map(p=>({...p,history:{kind:'stationary',start:'negative-infinity',end:'0',speed:'0',position:[0,1,2].map(i=>i===p.axis?String(p.sign*10):'0')}}))
};}
export function isSixPolePreparation(request){return request?.schema==='surface_analytical_preparation/v1'&&request.runId===SIX_POLE_CASE;}
export function isSixPoleReplay(record){return record?.schema===SIX_POLE_SCHEMA;}
const numeric=s=>typeof s==='string'&&/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s)&&Number.isFinite(Number(s));
const interval=p=>Array.isArray(p)&&p.length===2&&p.every(numeric)&&Number(p[0])<=Number(p[1]);
export function validateSixPoleReplay(record){
  if(!isSixPoleReplay(record)||record.caseId!==SIX_POLE_CASE||JSON.stringify(record.preparation)!==JSON.stringify(createSixPolePreparation()))throw new Error('This analytical replay requires the exact radius-10 six-pole rest preparation.');
  if(!Array.isArray(record.sources)||!record.sources.length||record.sources.some(s=>!/^reference\/priorities\/[\w./-]+$/.test(s.path)||!(/^[a-f0-9]{64}$/).test(s.sha256)))throw new Error('Missing analytical source identities.');
  if(!Array.isArray(record.samples)||record.samples.length<3||record.samples.length>1000)throw new Error('Missing bounded analytical observations.');
  let previous=-1;
  for(const s of record.samples){
    if(![s.t,s.q,s.w].every(interval)||Number(s.t[0])<0||Number(s.t[0])<=previous||!Number.isInteger(s.source)||s.source<0||s.source>=record.sources.length)throw new Error('Invalid analytical observation or time ordering.');
    previous=Number(s.t[0]);
    const d=s.diagnostics;if(d){for(const k of ['tangent','radial','support'])if(d[k]!==null&&!interval(d[k]))throw new Error('Invalid analytical diagnostic interval.');
      if(d.classes){for(const [name,count] of [['like',2],['unlike',2],['antipode',1]]){const c=d.classes[name];if(c?.multiplicity!==count||!interval(c.tangent)||!interval(c.radial))throw new Error('Invalid analytical partner-class account.');}}
    }
  }
  const first=record.samples[0];if([...first.t,...first.q,...first.w].some(x=>Number(x)!==0))throw new Error('The analytical history must begin at rest at release.');
  if(!Array.isArray(record.events)||record.events.some(e=>typeof e.label!=='string'||!interval(e.t)||Number(e.t[0])<0||Number(e.t[1])>previous))throw new Error('Event outside analytical coverage.');
  return record;
}
export function sixPoleBounds(record){return {start:0,end:Number(record.samples.at(-1).t[0])*10};}
const mid=p=>(Number(p[0])+Number(p[1]))/2;
export function sixPoleFrame(member,q){
  const c=Math.cos(q),s=Math.sin(q),n=[0,1,2].map(i=>member.sign*(i===member.axis?c:-s/Math.SQRT2)),e=[0,1,2].map(i=>member.sign*(i===member.axis?-s:-c/Math.SQRT2));
  return {normal:n,tangent:e};
}
export function sixPolePartners(receiver){return {
  like:SIX_POLE_MEMBERS.filter(p=>p.charge===receiver.charge&&p.pathId!==receiver.pathId).map(p=>p.pathId),
  unlike:SIX_POLE_MEMBERS.filter(p=>p.charge!==receiver.charge&&p.axis!==receiver.axis).map(p=>p.pathId),
  antipode:SIX_POLE_MEMBERS.filter(p=>p.charge!==receiver.charge&&p.axis===receiver.axis).map(p=>p.pathId)
};}
export function nearestSixPoleSample(record,T){
  const t=T/10;return record.samples.reduce((best,s)=>Math.abs(mid(s.t)-t)<Math.abs(mid(best.t)-t)?s:best,record.samples[0]);
}
export function evaluateSixPolePath(record,pathId,T){
  const {end}=sixPoleBounds(record);if(!Number.isFinite(T)||T<0||T>end+1e-10)throw new Error('Analytical replay time is outside retained coverage.');
  const member=SIX_POLE_MEMBERS.find(p=>p.pathId===pathId);if(!member)throw new Error('Unknown six-pole member.');
  const t=Math.min(T,end)/10,s=record.samples;
  // The lower uncertain endpoint is the display clock. The original interval is
  // retained alongside it. Linear interpolation of midpoints is illustrative,
  // not a claimed interval enclosure or a newly integrated solution.
  let i=0;while(i<s.length-2&&Number(s[i+1].t[0])<t)i++;
  const a=s[i],b=s[i+1],u=(t-Number(a.t[0]))/(Number(b.t[0])-Number(a.t[0])),q=mid(a.q)+(mid(b.q)-mid(a.q))*u,w=mid(a.w)+(mid(b.w)-mid(a.w))*u;
  const f=sixPoleFrame(member,q),xyz=f.normal.map(x=>10*x);
  return {position:{x:xyz[0],y:xyz[1],z:xyz[2]},velocity:Object.fromEntries(['x','y','z'].map((k,j)=>[k,w*f.tangent[j]])),q,w,illustrative:true};
}
export function sixPoleHistories(record){const bounds=sixPoleBounds(record);return SIX_POLE_MEMBERS.map(p=>({pathId:p.pathId,charge:Number(p.charge),kind:'six-pole-analytical',record,coverage:bounds,segments:record.samples.slice(1).map((s,i)=>({startTime:Number(record.samples[i].t[0])*10,endTime:Number(s.t[0])*10}))}));}

// Compare complete canonical JSON with the shipped source-bound export. Imported
// provenance alone never upgrades evidence. The digest is in the adjacent binding.
export async function verifySixPoleReplay(record){
  validateSixPoleReplay(record);
  const {SIX_POLE_REPLAY_SHA256}=await import('./data/SixPoleReplayBinding.js');
  const bytes=new TextEncoder().encode(JSON.stringify(record)),digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
  if(digest!==SIX_POLE_REPLAY_SHA256)throw new Error('Analytical replay differs from the reviewed, source-bound display export.');
  return record;
}
export async function loadSixPoleReplay(){const response=await fetch(SIX_POLE_DATA_URL);if(!response.ok)throw new Error('The reviewed six-pole replay is unavailable.');return verifySixPoleReplay(await response.json());}
