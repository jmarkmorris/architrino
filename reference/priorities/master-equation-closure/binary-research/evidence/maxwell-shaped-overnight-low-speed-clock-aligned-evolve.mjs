import {alignedStep,clockAlignmentKnown} from './maxwell-shaped-overnight-clock-alignment-control.mjs';
import assert from 'node:assert/strict';
import {largeClockKnown} from './maxwell-shaped-overnight-large-clock-control.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {History,knownControls,step,diagnostic,evaluate,norm,sub} from './maxwell-shaped-overnight-history-instrument.mjs';
import {preparation} from './maxwell-shaped-overnight-low-speed-preparation.mjs';
import {radialBalancePreparation} from './maxwell-shaped-overnight-radial-balance-preparation.mjs';
import {CoarseSourceHistory,historyResolutionKnownControl} from './maxwell-shaped-overnight-history-resolution.mjs';
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
const beta=Number(args.beta??.05),law=args.law??'E',relativeStep=Number(args.step??.01),horizon=Number(args.horizon??100),rootTolerance=Number(args.root??2e-13),out=args.out;
const speedStop=Number(args.speedStop??.999);
// Separate successor: uniformly refine every adaptive ceiling, including late steps.
// The original coarse source remains frozen. At factor 1/2 all stage availability
// inequalities strengthen; no accepted interval becomes longer than its coarse ceiling.
const controllerFactor=Number(args.controllerFactor??.5);
assert(controllerFactor===.5&&relativeStep===.01,'frozen uniform half-controller refinement');
const historyStride=Number(args.historyStride??1),historyKnown=historyResolutionKnownControl();
assert(speedStop>beta&&speedStop<1,'declared monitored speed margin');
assert(out&&out.startsWith('.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/'));
fs.mkdirSync(path.dirname(out),{recursive:true});assert(!fs.existsSync(out+'.json'),'do not overwrite retained result');
const alignmentKnown=clockAlignmentKnown(),clockKnown=largeClockKnown(),controls=knownControls(),{past,launch,specification}=(args.preparation==='radialBalance'?radialBalancePreparation:preparation)(beta,law),history=historyStride===1?new History(past,launch):new CoarseSourceHistory(past,launch,historyStride);
const initial=diagnostic(history,launch,law,rootTolerance);assert(initial.equationDefect<1e-11);
const ablation=evaluate(history,launch.x,launch.v,0,'E',rootTolerance);
const summary={frozenCase:specification,method:{family:'RK4; quintic Hermite retained position and derivative jets',relativeStep,nominalStep:relativeStep*specification.r,historyStride,nominalHistoryStep:relativeStep*specification.r*historyStride,rootTolerance,horizon,speedStop,stopMeaning:'selected monitored margin event; not equality or continuation'},knownControls:controls,largeClockKnown:clockKnown,clockAlignmentKnown:alignmentKnown,historyKnownControl:historyKnown,eventKnownControl:{case:'X=t²/2 on [1,2]; d|V|²/dt=2t',...rateKnown,passed:true},initial,
  identicalHistoryInputs:{E:ablation.rows.E.map(z=>-z),M:ablation.rows.M.map(z=>-z),full:ablation.rows.full.map(z=>-z),canonical:ablation.rows.canonical.map(z=>-z),G:ablation.rows.G.map(z=>-z)},
  startUTC:new Date().toISOString(),maxInteriorEquationDefect:0,maxRootResidual:Math.abs(initial.rootResidual),minD:initial.D,minDelay:initial.delay,minRadius:initial.r,maxSourceAcceleration:initial.sourceAccelerationNorm,steps:0,rejections:0};
fs.writeFileSync(out+'.specification.json',JSON.stringify(summary,null,2));
const fd=fs.openSync(out+'.jsonl','wx');const record=d=>fs.writeSync(fd,JSON.stringify(d)+'\n');record(initial);
let lastHeartbeat=Date.now(),lastRecord=0,h=summary.method.nominalStep,terminal='horizon';
let unwrappedAngle=initial.angle,lastGoodDiagnostic=initial;
const computeCutoff=Date.parse('2026-10-05T11:29:32Z'),rssLimit=Number(args.rssMB??768)*1048576;
summary.method.computeCutoffUTC='2026-10-05 11:29:32 UTC';summary.method.rssLimitMiB=rssLimit/1048576;summary.method.clockRootBudget='2e-13*max(1,4*initialRadius)+8*EPS*max(1,abs(T)); known large-clock affine calibration';
summary.initialRSSMiB=process.memoryUsage().rss/1048576;
summary.method.clockStepAlignment='quantize step to actual reception clock delta BEFORE every RK trial; floor if nearest rounding exceeds ceiling';summary.maxClockStepDifference=0;summary.maxStageClockBudget=0;summary.method.controllerFactor=controllerFactor;
summary.method.delayStepFraction=controllerFactor/5;
summary.method.accelerationStepFraction=.02*controllerFactor;
try{
summary.maxAngleIncrement=0;
summary.monitoredMarginCensus=true;
while(history.knots.at(-1).t<horizon-Math.max(1e-10,summary.method.nominalStep*1e-8)){
  if(Date.now()>=computeCutoff){terminal='owned compute cutoff';break;}
  if(summary.steps%1000===0&&process.memoryUsage().rss>rssLimit){terminal='numerical owned-RSS guard';break;}
  const p=history.knots.at(-1),d=diagnostic(history,p,law,rootTolerance);
  h=Math.min(summary.method.nominalStep,controllerFactor*d.delay/5,.02*controllerFactor*Math.max(d.speed,.05)/Math.max(norm(p.a),1e-15),horizon-p.t);
  let accepted=false;
  for(let attempts=0;attempts<30;attempts++){
    try{const candidate=h;h=alignedStep(p.t,candidate);if(h>candidate)h=alignedStep(p.t,candidate-4*Number.EPSILON*Math.max(1,Math.abs(p.t)));assert(h<=candidate&&h>0,'clock-aligned adaptive ceiling');summary.maxClockStepDifference=Math.max(summary.maxClockStepDifference,Math.abs(h-candidate));summary.maxStageClockBudget=Math.max(summary.maxStageClockBudget,4*Number.EPSILON*Math.max(1,Math.abs(p.t+h)));step(history,law,h,rootTolerance);accepted=true;break;}
    catch(err){summary.rejections++;h/=2;if(h<1e-10){terminal='numerical guard: '+err.message;break;}}
  }
  if(!accepted)break;
  const q=history.knots.at(-1),end=diagnostic(history,q,law,rootTolerance),seg=history.segments.at(-1);
  const segmentRadiusFloor=norm(p.x)-h*seg.speedBound;
  assert(segmentRadiusFloor>0&&h*seg.speedBound/segmentRadiusFloor<Math.PI,'angular unwrapping domain');
  const angleIncrement=Math.atan2(p.x[0]*q.x[1]-p.x[1]*q.x[0],p.x[0]*q.x[0]+p.x[1]*q.x[1]);
  unwrappedAngle+=angleIncrement;summary.maxAngleIncrement=Math.max(summary.maxAngleIncrement,Math.abs(angleIncrement));
  q.unwrappedAngle=unwrappedAngle;end.unwrappedAngle=unwrappedAngle;lastGoodDiagnostic=end;
  const rootBudget=2e-13*Math.max(1,4*specification.r)+8*Number.EPSILON*Math.max(1,Math.abs(q.t));
  if(Math.abs(end.rootResidual)>rootBudget||end.rootWidth>2*rootBudget){terminal='numerical roundoff-aware root-budget guard';break;}
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
}catch(err){terminal='numerical exception: '+err.message;summary.exceptionStack=err.stack;}
try{summary.final=diagnostic(history,history.knots.at(-1),law,rootTolerance);}catch(err){summary.final=lastGoodDiagnostic;summary.finalDiagnosticFailure=err.message;}
summary.finalRSSMiB=process.memoryUsage().rss/1048576;summary.terminal=terminal;summary.endUTC=new Date().toISOString();summary.wallSeconds=(Date.parse(summary.endUTC)-Date.parse(summary.startUTC))/1000;
summary.final.unwrappedAngle=unwrappedAngle;
record(summary.final);fs.closeSync(fd);fs.writeFileSync(out+'.json',JSON.stringify(summary,null,2));
if(args.history==='retain'){const historyfd=fs.openSync(out+'.history.json','wx');fs.writeSync(historyfd,'{"specification":'+JSON.stringify(specification)+',"knots":[');for(let j=0;j<history.knots.length;j++)fs.writeSync(historyfd,(j?',':'')+JSON.stringify(history.knots[j]));fs.writeSync(historyfd,']}');fs.closeSync(historyfd);}
console.log(JSON.stringify(summary,null,2));
