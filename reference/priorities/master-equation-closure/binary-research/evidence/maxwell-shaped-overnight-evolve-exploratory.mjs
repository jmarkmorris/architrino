import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {History,knownControls,step,diagnostic,evaluate,norm,sub} from './maxwell-shaped-overnight-history-instrument.mjs';
import {preparation} from './maxwell-shaped-overnight-preparation.mjs';
const args=Object.fromEntries(process.argv.slice(2).map(s=>s.replace(/^--/,'').split('=')));
const beta=Number(args.beta??.3),law=args.law??'E',relativeStep=Number(args.step??.01),horizon=Number(args.horizon??100),rootTolerance=Number(args.root??2e-13),out=args.out;
assert(out&&out.startsWith('.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/'));
fs.mkdirSync(path.dirname(out),{recursive:true});assert(!fs.existsSync(out+'.json'),'do not overwrite retained result');
const controls=knownControls(),{past,launch,specification}=preparation(beta,law),history=new History(past,launch);
const initial=diagnostic(history,launch,law,rootTolerance);assert(initial.equationDefect<1e-11);
const ablation=evaluate(history,launch.x,launch.v,0,'E',rootTolerance);
const summary={frozenCase:specification,method:{family:'RK4; quintic Hermite retained position and derivative jets',relativeStep,nominalStep:relativeStep*specification.r,rootTolerance,horizon},knownControls:controls,initial,
  identicalHistoryInputs:{E:ablation.rows.E.map(z=>-z),M:ablation.rows.M.map(z=>-z),full:ablation.rows.full.map(z=>-z),canonical:ablation.rows.canonical.map(z=>-z),G:ablation.rows.G.map(z=>-z)},
  startUTC:new Date().toISOString(),maxInteriorEquationDefect:0,maxRootResidual:Math.abs(initial.rootResidual),minD:initial.D,minDelay:initial.delay,minRadius:initial.r,maxSourceAcceleration:initial.sourceAccelerationNorm,steps:0,rejections:0};
fs.writeFileSync(out+'.specification.json',JSON.stringify(summary,null,2));
const fd=fs.openSync(out+'.jsonl','wx');const record=d=>fs.writeSync(fd,JSON.stringify(d)+'\n');record(initial);
let lastHeartbeat=Date.now(),lastRecord=0,h=summary.method.nominalStep,terminal='horizon';
while(history.knots.at(-1).t<horizon-1e-12){
  const p=history.knots.at(-1),d=diagnostic(history,p,law,rootTolerance);
  h=Math.min(summary.method.nominalStep,d.delay/5,.02*Math.max(d.speed,.05)/Math.max(norm(p.a),1e-15),horizon-p.t);
  let accepted=false;
  for(let attempts=0;attempts<30;attempts++){
    try{step(history,law,h,rootTolerance);accepted=true;break;}
    catch(err){summary.rejections++;h/=2;if(h<1e-10){terminal='numerical guard: '+err.message;break;}}
  }
  if(!accepted)break;
  const q=history.knots.at(-1),end=diagnostic(history,q,law,rootTolerance),seg=history.segments.at(-1);
  for(const fraction of [.25,.5,.75]){
    const t=p.t+h*fraction,j=seg.at(t),e=evaluate(history,j.x,j.v,t,law,rootTolerance);
    summary.maxInteriorEquationDefect=Math.max(summary.maxInteriorEquationDefect,norm(sub(j.a,e.aNow)));
  }
  summary.steps++;summary.maxRootResidual=Math.max(summary.maxRootResidual,Math.abs(end.rootResidual));summary.minD=Math.min(summary.minD,end.D);summary.minDelay=Math.min(summary.minDelay,end.delay);summary.minRadius=Math.min(summary.minRadius,end.r);summary.maxSourceAcceleration=Math.max(summary.maxSourceAcceleration,end.sourceAccelerationNorm);
  if(q.t-lastRecord>=Number(args.record??.2)*specification.r||q.t>=horizon-1e-10){record(end);lastRecord=q.t;}
  if(Date.now()-lastHeartbeat>30000){console.log(JSON.stringify({heartbeat:true,wallSeconds:(Date.now()-Date.parse(summary.startUTC))/1000,steps:summary.steps,...end}));lastHeartbeat=Date.now();}
}
summary.final=diagnostic(history,history.knots.at(-1),law,rootTolerance);summary.terminal=terminal;summary.endUTC=new Date().toISOString();summary.wallSeconds=(Date.parse(summary.endUTC)-Date.parse(summary.startUTC))/1000;
record(summary.final);fs.closeSync(fd);fs.writeFileSync(out+'.json',JSON.stringify(summary,null,2));
if(args.history==='retain')fs.writeFileSync(out+'.history.json',JSON.stringify({specification,knots:history.knots}));
console.log(JSON.stringify(summary,null,2));
