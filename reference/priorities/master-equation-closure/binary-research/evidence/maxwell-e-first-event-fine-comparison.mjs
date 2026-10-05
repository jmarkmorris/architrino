import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {History,knownControls,step,diagnostic,evaluate,norm,sub} from './maxwell-shaped-overnight-history-instrument.mjs';
import {preparation} from './maxwell-shaped-overnight-preparation.mjs';
import {CoarseSourceHistory,historyResolutionKnownControl} from './maxwell-shaped-overnight-history-resolution.mjs';
function stepKnown(){
  // Complete compatible static-tail control; all sources remain before patch.
  // From y''=-1/y², y(0)=2,y'(0)=0, integration gives
  // y=2cos²theta, y'=-tan theta, t=2theta+sin(2theta).
  const delta=.1,da=-.25,past={speedBound:.075,at:t=>{
    if(t<=-delta)return {x:[1,0],v:[0,0],a:[0,0]};
    const u=t/delta,f=t*t*(1+u)**3/2,fp=t+4.5*t*t/delta+6*t**3/delta**2+2.5*t**4/delta**3,fpp=1+9*u+18*u*u+10*u**3;
    return {x:[1+da*f,0],v:[da*fp,0],a:[da*fpp,0]};
  }},launch={t:0,...past.at(0)},h=new History(past,launch);
  for(let j=0;j<10;j++)step(h,'E',.01,2e-13);
  const end=h.knots.at(-1);let lo=0,hi=.1;for(let j=0;j<70;j++){const theta=(lo+hi)/2;if(2*theta+Math.sin(2*theta)<end.t)lo=theta;else hi=theta;}
  const theta=(lo+hi)/2,exactX=2*Math.cos(theta)**2-1,exactV=-Math.tan(theta),error=Math.max(Math.abs(end.x[0]-exactX),Math.abs(end.v[0]-exactV),Math.abs(end.x[1]),Math.abs(end.v[1]));
  assert(error<1e-10,'independent exact static-tail receiving solution');
  const d=diagnostic(h,end,'E',2e-13);assert(d.S<-.1&&d.D===1&&d.partnerRoots===1&&d.selfRoots===0);
  return {passed:true,case:'complete compatible static-tail original E known interval; t=2theta+sin2theta',time:end.t,error,exactX,exactV,S:d.S,D:d.D,parameters:{K:1,cf:1,r:1,delta,da,history:'constant circle-tail with terminal compatible polynomial patch'},scope:'integration/root/history instrument control only; not original circularbeta3/10 target'};
}
const choose=(n,k)=>{let z=1;for(let j=1;j<=k;j++)z*=(n+1-j)/j;return z;};
function speedSquaredDerivativeBounds(seg){
  const h=seg.right.t-seg.left.t,c=Array(8).fill(0);
  for(const axis of seg.coeff){for(let i=0;i<5;i++)for(let j=0;j<4;j++)c[i+j]+=2*(i+1)*axis[i+1]*(j+2)*(j+1)*axis[j+2]/h**3;}
  const controls=Array.from({length:8},(_,j)=>{let z=0;for(let k=0;k<=j;k++)z+=c[k]*choose(j,k)/choose(7,k);return z;});
  return {lower:Math.min(...controls),upper:Math.max(...controls)};
}
// The added event instrument is checked BEFORE any target below: X=t²/2
// on [1,2] has d|V|²/dt=2t, whose Bernstein enclosure is exactly [2,4].
const rateKnown=speedSquaredDerivativeBounds({left:{t:1},right:{t:2},coeff:[[.5,1,.5,0,0,0],[0,0,0,0,0,0]]});
assert(rateKnown.lower===2&&rateKnown.upper===4,'known speed derivative bound');
const args=Object.fromEntries(process.argv.slice(2).map(s=>s.replace(/^--/,'').split('=')));
const beta=Number(args.beta??.3),law=args.law??'E',relativeStep=Number(args.step??.0003125),horizon=Number(args.horizon??60),rootTolerance=Number(args.root??2e-13),out=args.out;
const integrationKnown=stepKnown();if(args.controls==='only'){console.log(JSON.stringify({passed:true,integrationKnown,knownControls:knownControls(),historyKnown:historyResolutionKnownControl(),rateKnown},null,2));process.exit(0);}
const speedStop=Number(args.speedStop??.999);
const historyStride=Number(args.historyStride??1),historyKnown=historyResolutionKnownControl();
assert(speedStop>beta&&speedStop<1,'declared monitored speed margin');
assert(beta===.3&&law==='E'&&relativeStep===.0003125&&horizon===60&&rootTolerance===2e-13&&speedStop===.999&&historyStride===1&&!args.preparation,'frozen same-original-case quarter-step comparison');
assert(out&&out.startsWith('.local-data/master-equation-closure/binary-research/maxwell-e-first-event/'));
fs.mkdirSync(path.dirname(out),{recursive:true});assert(!fs.existsSync(out+'.json'),'do not overwrite retained result');
const controls=knownControls(),{past,launch,specification}=preparation(beta,law),history=historyStride===1?new History(past,launch):new CoarseSourceHistory(past,launch,historyStride);
const originalPath='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/b03-E-checked-event999-h0.00125.history.json',originalBytes=fs.readFileSync(originalPath),originalSHA=crypto.createHash('sha256').update(originalBytes).digest('hex'),original=JSON.parse(originalBytes);assert(originalSHA==='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495');for(const key of ['r','omega','delta','beta','K','cf','speedBound'])assert(specification[key]===original.specification[key],'unchanged numerical analytical past '+key);for(const key of ['da','launch'])assert(JSON.stringify(specification[key])===JSON.stringify(original.specification[key]),'unchanged numerical analytical past '+key);
const initial=diagnostic(history,launch,law,rootTolerance);assert(initial.equationDefect<1e-11);
const ablation=evaluate(history,launch.x,launch.v,0,'E',rootTolerance);
const summary={frozenCase:specification,integrationKnown,originalComparison:{path:originalPath,SHA:originalSHA,sameNumericalAnalyticalPast:true,sourceSHA:crypto.createHash('sha256').update(fs.readFileSync(new URL(import.meta.url))).digest('hex')},refinement:{relativeStep:'1/3200',ratioToOriginal:'1/4',rationale:'RK4 smooth-piece residual scaling motivates quarter-step; C2,1 and jerk-seam pieces receive no universal fourth-order claim; continuum defect must be independently enclosed',priorMeasuredCost:{originalSteps:17144,originalWallSeconds:3.627},grade:'floating comparison only; no actual original prefix or event'},method:{family:'RK4; quintic Hermite retained position and derivative jets',relativeStep,nominalStep:relativeStep*specification.r,historyStride,nominalHistoryStep:relativeStep*specification.r*historyStride,rootTolerance,horizon,speedStop,stopMeaning:'selected monitored margin event; not equality or continuation'},knownControls:controls,historyKnownControl:historyKnown,eventKnownControl:{case:'X=t²/2 on [1,2]; d|V|²/dt=2t',...rateKnown,passed:true},initial,
  identicalHistoryInputs:{E:ablation.rows.E.map(z=>-z),M:ablation.rows.M.map(z=>-z),full:ablation.rows.full.map(z=>-z),canonical:ablation.rows.canonical.map(z=>-z),G:ablation.rows.G.map(z=>-z)},
  startUTC:new Date().toISOString(),maxInteriorEquationDefect:0,maxRootResidual:Math.abs(initial.rootResidual),minD:initial.D,minDelay:initial.delay,minRadius:initial.r,maxSourceAcceleration:initial.sourceAccelerationNorm,steps:0,rejections:0};
fs.writeFileSync(out+'.specification.json',JSON.stringify(summary,null,2));
const fd=fs.openSync(out+'.jsonl','wx');const record=d=>fs.writeSync(fd,JSON.stringify(d)+'\n');record(initial);
console.log(JSON.stringify({event:'known-before-target',passed:true,pid:process.pid,sourceSHA:summary.originalComparison.sourceSHA,relativeStep,nominalStep:summary.method.nominalStep}));
let lastHeartbeat=Date.now(),lastRecord=0,h=summary.method.nominalStep,terminal='horizon';
let unwrappedAngle=initial.angle;
summary.maxAngleIncrement=0;
summary.monitoredMarginCensus=true;
while(history.knots.at(-1).t<horizon-Math.max(1e-10,summary.method.nominalStep*1e-8)){
  const p=history.knots.at(-1),d=diagnostic(history,p,law,rootTolerance);
  h=Math.min(summary.method.nominalStep,d.delay/5,.02*Math.max(d.speed,.05)/Math.max(norm(p.a),1e-15),horizon-p.t);
  let accepted=false;
  for(let attempts=0;attempts<30;attempts++){
    try{step(history,law,h,rootTolerance);accepted=true;break;}
    catch(err){summary.rejections++;h/=2;if(h<1e-10){terminal='numerical guard: '+err.message;break;}}
  }
  if(!accepted)break;
  const q=history.knots.at(-1),end=diagnostic(history,q,law,rootTolerance),seg=history.segments.at(-1);
  const segmentRadiusFloor=norm(p.x)-h*seg.speedBound;
  assert(segmentRadiusFloor>0&&h*seg.speedBound/segmentRadiusFloor<Math.PI,'angular unwrapping domain');
  const angleIncrement=Math.atan2(p.x[0]*q.x[1]-p.x[1]*q.x[0],p.x[0]*q.x[0]+p.x[1]*q.x[1]);
  unwrappedAngle+=angleIncrement;summary.maxAngleIncrement=Math.max(summary.maxAngleIncrement,Math.abs(angleIncrement));
  q.unwrappedAngle=unwrappedAngle;end.unwrappedAngle=unwrappedAngle;
  const rate=speedSquaredDerivativeBounds(seg);
  if(seg.speedBound>=speedStop&&!(rate.lower>0&&norm(p.v)<speedStop))summary.monitoredMarginCensus=false;
  for(const fraction of [.25,.5,.75]){
    const t=p.t+h*fraction,j=seg.at(t),e=evaluate(history,j.x,j.v,t,law,rootTolerance);
    summary.maxInteriorEquationDefect=Math.max(summary.maxInteriorEquationDefect,norm(sub(j.a,e.aNow)));
  }
  summary.steps++;summary.maxRootResidual=Math.max(summary.maxRootResidual,Math.abs(end.rootResidual));summary.minD=Math.min(summary.minD,end.D);summary.minDelay=Math.min(summary.minDelay,end.delay);summary.minRadius=Math.min(summary.minRadius,end.r);summary.maxSourceAcceleration=Math.max(summary.maxSourceAcceleration,end.sourceAccelerationNorm);
  if(end.speed>=speedStop){
    terminal='selected monitored speed-margin event';record(end);
    let lo=p.t,hi=q.t;for(let k=0;k<60&&hi-lo>1e-12;k++){const m=(lo+hi)/2;if(norm(seg.at(m).v)<speedStop)lo=m;else hi=m;}
    const eventT=(lo+hi)/2,eventJet=seg.at(eventT),event=diagnostic(history,{t:eventT,...eventJet},law,rootTolerance);
    event.unwrappedAngle=p.unwrappedAngle??0;
    event.unwrappedAngle+=Math.atan2(p.x[0]*eventJet.x[1]-p.x[1]*eventJet.x[0],p.x[0]*eventJet.x[0]+p.x[1]*eventJet.x[1]);
    summary.monitoredMarginEvent={...event,timeWidth:hi-lo,speedSquaredDerivativeBounds:rate,meaning:'interpolated threshold event; no continuous error certificate'};
    break;
  }
  if(q.t-lastRecord>=Number(args.record??.2)*specification.r||q.t>=horizon-1e-10){record(end);lastRecord=q.t;}
  if(Date.now()-lastHeartbeat>30000){console.log(JSON.stringify({heartbeat:true,wallSeconds:(Date.now()-Date.parse(summary.startUTC))/1000,steps:summary.steps,...end}));lastHeartbeat=Date.now();}
}
summary.final=diagnostic(history,history.knots.at(-1),law,rootTolerance);summary.terminal=terminal;summary.endUTC=new Date().toISOString();summary.wallSeconds=(Date.parse(summary.endUTC)-Date.parse(summary.startUTC))/1000;
summary.final.unwrappedAngle=unwrappedAngle;
record(summary.final);fs.closeSync(fd);fs.writeFileSync(out+'.json',JSON.stringify(summary,null,2));
if(args.history==='retain')fs.writeFileSync(out+'.history.json',JSON.stringify({specification,knots:history.knots}));
console.log(JSON.stringify(summary,null,2));
