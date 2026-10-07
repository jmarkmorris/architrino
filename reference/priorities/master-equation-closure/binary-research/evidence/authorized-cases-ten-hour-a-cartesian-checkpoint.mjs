// Checkpoint-only subject. Does not advance the physical receiving cursor.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {Q,G,add,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {physicalDirection} from './maxwell-shaped-overnight-unit-frame-clock-angular.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {ExactReferenceHistory} from './maxwell-e-first-event-whole-query-history-cache.mjs';
import {rootBox,unitClockDenominator,known as rootKnown} from './maxwell-e-first-event-root-speed-floor.mjs';
import {frame,known as coefficientKnown} from './authorized-cases-ten-hour-a-transverse-physical-u-coefficients-v2.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const max=(a,b)=>Q.of(a).cmp(b)>=0?Q.of(a):Q.of(b);
const expand=(v,e)=>v.map(z=>G.of(z).add(new G(Q.of(e).neg(),e)));
const encode=z=>z instanceof Q?z.toString():z instanceof G?z.out():Array.isArray(z)?z.map(encode):z&&typeof z==='object'?Object.fromEntries(Object.entries(z).map(([k,v])=>[k,encode(v)])):z;
function closedInventory(rows,P,past){
 assert(P.hi.cmp(rows.at(-1).t)<=0,'source inventory already completed');
 const out={x:Q.of(0),v:Q.of(0),a:Q.of(0),bins:[]};
 if(P.lo.cmp(0)<=0)for(const k of ['x','v','a'])out[k]=max(past[k],rows[0][k]);
 for(let j=1;j<rows.length;j++)if(rows[j].t.cmp(P.lo)>=0&&rows[j-1].t.cmp(P.hi)<=0){for(const k of ['x','v','a'])out[k]=max(out[k],rows[j][k]);out.bins.push(j);}
 assert(P.hi.cmp(0)<=0||out.bins.length,'positive support covered');return out;
}
function rootFamily(history,T,rx,px,seed,checkpoint){
 const X=expand(history.box(T,0),rx),attempts=[];
 for(const width of ['1/2','3/4','1','3/2','2','5/2']){
  checkpoint('root width '+width);
  try{
   const J=new G(Q.of(seed).sub(width),Q.of(seed).add(width));assert(J.lo.cmp(-6)>0,'nominal past domain');
   const gap=s=>T.sub(new G(s)).sub(length(add(X,expand(history.box(new G(s),0),px))));
   const left=gap(J.lo),right=gap(J.hi),clock=unitClockDenominator(add(X,expand(history.box(J,0),px)),history.box(J,1));
   assert(left.lo.cmp(0)>0&&right.hi.cmp(0)<0&&clock.D.lo.cmp(0)>0,'full initial bracket');
   const S=rootBox(history,T,X,seed,width,px,3),ray=add(X,expand(history.box(S,0),px));
   return {X,J,S,ray,attempts,certificate:{left,right,Dclock:clock.D,initialRange:clock.R},jets:[0,1,2].map(n=>history.box(S,n))};
  }catch(e){attempts.push({width,message:e.message});}
 }
 const e=new Error('all six bounded root brackets failed');e.attempts=attempts;throw e;
}
function transfer(history,T,old,P,rows,past,checkpoint=()=>{}){
 const XC=history.box(T,0),VC=history.box(T,1),AC=history.box(T,2),rc=length(XC).lo,bc=normUpper(VC),ac=normUpper(AC),r=Q.of(old.x);assert(r.cmp(rc)<0,'positive checkpoint radius');
 const physicalU=Q.of(old.v),physicalA=Q.of(old.a),inv=closedInventory(rows,P,past),geo=[0,1,2].map(n=>normUpper(history.box(P,n))),offset={x:inv.x,v:inv.v,a:inv.a},seed=P.lo.add(P.hi).div(2),U=expand(VC,physicalU),nr=physicalDirection(XC);
 checkpoint('source family');const source=rootFamily(history,T,r,offset.x,seed,checkpoint),sourceField=frame(source.ray,expand(source.jets[1],offset.v),source.jets[2],U,source.jets[1]),qSourceX=normUpper(sourceField.q.AX.flat()),qSourceV=normUpper(sourceField.q.Fv.flat()),fq=qSourceX.mul(offset.x).add(qSourceV.mul(offset.v));
 checkpoint('position family');const position=rootFamily(history,T,r,Q.of(0),seed,checkpoint),positionField=frame(position.ray,position.jets[1],position.jets[2],U,position.jets[1]),qPositionMatrix=positionField.q.AX,qPosition=normUpper(qPositionMatrix.flat()).mul(r);
 checkpoint('velocity family');const velocity=rootFamily(history,T,Q.of(0),Q.of(0),seed,checkpoint),velocityField=frame(velocity.ray,velocity.jets[1],velocity.jets[2],U,velocity.jets[1]),nominalField=frame(velocity.ray,velocity.jets[1],velocity.jets[2],VC,velocity.jets[1]),wa=velocityField.w,wc=nominalField.w,alpha=velocityField.components.vt.div(velocityField.R.mul(velocityField.D).mul(wa).mul(wc)),qVelocity=alpha.absUpper().mul(physicalU),qError=fq.add(qPosition).add(qVelocity),sigma=length([new G(1),new G(alpha.absUpper().div(2))]).hi.add(alpha.absUpper().div(2)),pError=sigma.mul(physicalU).add(qPosition).add(fq),nu=Q.of(1),W=length([new G(nu.mul(r)),new G(pError)]).hi;
 const physicalChart=Q.of(1).sub(old.speedUpper??bc.add(physicalU));assert(physicalChart.cmp(0)>0,'original physical receiver subfield chart');
 const residualAlpha=nominalField.q.Fu[1][0].absUpper(),residualMultiplier=length([new G(1),new G(residualAlpha.div(2))]).hi.add(residualAlpha.div(2));
 return {scope:'full Cartesian checkpoint geometry and sufficient coordinate initialization only; no recurrence or continuation',T,oldCartesian:old,receiving:{rc,bc,ac,r,physicalU,physicalA,physicalChart,frame:'common Cartesian; no receiving radial alignment'},sourceInventory:inv,physicalSourceSupport:P,sourceGeometry:geo,sourceOffsets:offset,source:{family:source,coefficients:sourceField},position:{family:position,coefficients:positionField,qPositionMatrix},velocity:{family:velocity,coefficients:velocityField,nominal:nominalField,alpha},initializer:{nu,r,physicalU,fq,qSourceX,qSourceV,qPosition,qVelocity,qError,sigma,pError,W},residualMultiplier};
}
export function known(){
 const mk=(t,x,v=0,a=0)=>({t:Q.of(t),x:Q.of(x),v:Q.of(v),a:Q.of(a)}),rows=[mk(0,0),mk(1,7),mk(2,2)],past=mk(0,3);
 assert(closedInventory(rows,new G(1),past).x.cmp(7)===0);assert(closedInventory(rows,new G('-.1','1.1'),past).x.cmp(7)===0);assert.throws(()=>closedInventory(rows,new G(2,3),past),/completed/);
 const staticHistory={box:(_S,n)=>[new G(n===0?1:0),new G(0)]},flat=[mk(0,0),mk(2,'1/100'),mk(4,'1/100')],z=transfer(staticHistory,new G(4),{x:Q.of('1/100'),v:Q.of(0),a:Q.of(0),speedUpper:Q.of(0)},new G('1.9','2.1'),flat,mk(0,0));
 assert(z.receiving.physicalU.cmp(0)===0&&z.initializer.qError.cmp(0)>=0&&z.initializer.qError.cmp('1/1000000000000000000')<0&&z.initializer.W.cmp('1/100')>=0&&z.initializer.W.sub('1/100').cmp('1/1000000000000000000')<0&&z.residualMultiplier.cmp(1)>=0,JSON.stringify(encode({eta:z.receiving.eta,q:z.initializer.qError,W:z.initializer.W,m:z.residualMultiplier}))); 
 return {passed:true,coefficients:coefficientKnown(),roots:rootKnown(),cases:['closed seam selects both bins with maximum7','negative and positive complete source coverage','uncompleted source rejected','static Cartesian checkpoint with zero velocity error, q error0 and W1/100 enclosed outward'],scope:'analytical controls; no physical target'};
}
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
if(process.argv.includes('--known-cartesian-checkpoint')){console.log(JSON.stringify(known(),null,2));process.exit(0);}
if(args.receipt){
 assert(args.targetGate==='coordinator-admitted-a-cartesian-checkpoint-v1','explicit checkpoint admission required');assert(args.out&&!fs.existsSync(args.out));
 const deadline=Date.parse(args.deadline);assert(Number.isFinite(deadline)&&deadline>Date.now());let phase='binding',started=Date.now();const result={knownFirst:known(),sourceSHA:sha(new URL(import.meta.url)),coefficientSHA:sha(new URL('./authorized-cases-ten-hour-a-transverse-physical-u-coefficients-v2.mjs',import.meta.url)),deadline:args.deadline,scope:'immutable original56.72222 full Cartesian checkpoint only; no new physical rows',passed:false};
 const checkpoint=p=>{phase=p;assert(Date.now()<deadline,'cooperative checkpoint cutoff');console.log(JSON.stringify({event:'checkpoint-progress',phase,wallSeconds:(Date.now()-started)/1000,rssMB:process.memoryUsage().rss/1048576}));};
 try{
  assert(sha(args.receipt)==='f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f'&&sha(args.receipt+'.jsonl')==='c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd');
  const old=JSON.parse(fs.readFileSync(args.receipt));assert(fs.statSync(args.receipt+'.jsonl').size<512*1024*1024,'finite input budget');const savedRows=fs.readFileSync(args.receipt+'.jsonl','utf8').trim().split('\n').map(JSON.parse);assert(savedRows.length===16462&&old.bins===16462);
  assert(old.inputSHA===sha(args.input)&&old.inputSHA==='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495');
  assert(sha(args.prefixAudit)==='a863e77148436ea1ca43257bd8f0f195ffad93a27245fb103f16cd16aa6d3b94'&&sha(args.recurrenceAudit)==='2b7c70717800a4b5e96db8cbcd514bae6294ea2e56ccc8a332063e0d00c8dbda'&&sha(args.strictAudit)==='658aea7414fc08b2727ec9b8c0f1e95d6391913ff00b8b653154e2c62f23444b','exact immutable old admission receipts');
  const prefix=JSON.parse(fs.readFileSync(args.prefixAudit)),recurrence=JSON.parse(fs.readFileSync(args.recurrenceAudit)),strict=JSON.parse(fs.readFileSync(args.strictAudit));assert(prefix.acceptedPrefix&&prefix.subjectSHA===sha(args.receipt)&&prefix.rowsSHA===sha(args.receipt+'.jsonl')&&recurrence.target.accepted&&recurrence.target.bins===16462&&recurrence.target.end===old.final.t&&strict.target.accepted&&strict.target.receiptSHA===sha(args.receipt)&&strict.target.rowsSHA===sha(args.receipt+'.jsonl'));
  const saved=JSON.parse(fs.readFileSync(args.input));assert(saved.specification.K===1&&saved.specification.cf===1&&saved.specification.equation==='Sections 7 E');const history=new ExactReferenceHistory(saved.knots,saved.specification),convert=z=>Object.fromEntries(['t','x','v','a'].map(k=>[k,Q.of(z[k])])),initial={t:'0',...Object.fromEntries(['x','v','a'].map((k,j)=>[k,old.initialErrors[j]]))},rows=[convert(initial),...savedRows.map(convert)],past=Object.fromEntries(['x','v','a'].map((k,j)=>[k,Q.of(old.pastMismatch[j])])),last=savedRows.at(-1);assert(last.t===old.final.t&&last.t==='1995735772371699/35184372088832');
  result.bindings={receipt:args.receipt,receiptSHA:sha(args.receipt),rowsSHA:sha(args.receipt+'.jsonl'),input:args.input,inputSHA:sha(args.input),admissions:Object.fromEntries(['prefixAudit','recurrenceAudit','strictAudit'].map(k=>[k,{path:args[k],sha:sha(args[k])}]))};
  result.transfer=transfer(history,new G(last.t),{...convert(last),speedUpper:Q.of(last.speedUpper)},new G(last.S.lo,last.S.hi),rows,past,checkpoint);result.passed=true;
 }catch(e){result.failure={phase,message:e.message,attempts:e.attempts??null,stack:e.stack};}
 result.wallSeconds=(Date.now()-started)/1000;const output=JSON.stringify(encode(result),null,2)+'\n';assert(Buffer.byteLength(output)<2*1024*1024,'finite output budget');fs.writeFileSync(args.out,output,{flag:'wx'});console.log(JSON.stringify({event:'checkpoint-closed',passed:result.passed,out:args.out,wallSeconds:result.wallSeconds}));if(!result.passed)process.exitCode=1;
}
