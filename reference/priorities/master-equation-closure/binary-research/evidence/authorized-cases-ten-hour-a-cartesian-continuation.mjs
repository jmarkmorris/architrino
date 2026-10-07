// Bounded same-history continuation subject; target use requires independent admission.
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
 const out={x:Q.of(0),v:Q.of(0),a:Q.of(0),speed:Q.of(0),bins:[]};
 if(P.lo.cmp(0)<=0){assert(past,'separate complete past speed certificate required');for(const k of ['x','v','a','speed'])out[k]=max(past[k],rows[0][k]);}
 for(let j=1;j<rows.length;j++)if(rows[j].t.cmp(P.lo)>=0&&rows[j-1].t.cmp(P.hi)<=0){for(const k of ['x','v','a','speed'])out[k]=max(out[k],rows[j][k]);out.bins.push(j);}
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
   return {X,J,S,ray,attempts,certificate:{left,right,Dclock:clock.D,initialRange:clock.R},jets:[0,1,2,3].map(n=>history.box(S,n))};
  }catch(e){attempts.push({width,message:e.message});}
 }
 const e=new Error('all six bounded root brackets failed');e.attempts=attempts;throw e;
}
import {block,lognorm4,known as matrixKnown} from './authorized-cases-ten-hour-a-cartesian-lognorm.mjs';
import {combine,known as companionKnown} from './authorized-cases-ten-hour-a-cartesian-companion.mjs';
import {conditionalFrame,signedClockKnown} from './maxwell-e-first-event-conditional-E-coefficients.mjs';
import {scalarFactors,known as factorsKnown} from './maxwell-e-first-event-source-tangential-damping-v2.mjs';
const min=(a,b)=>Q.of(a).cmp(b)<=0?Q.of(a):Q.of(b),neg=v=>v.map(x=>G.of(x).neg());
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>dot(row,B.map(r=>r[j])))),transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
function cartesian(n,A){const R=[[n[0],G.of(n[1]).neg()],[n[1],n[0]]];return mm(mm(R,A),transpose(R));}
function sourceGuard(left,right,start,P,bu,bs){
 [left,right,bu,bs]=[left,right,bu,bs].map(Q.of);const h=right.sub(left);assert(h.cmp(0)>0&&bu.cmp(0)>=0&&bu.cmp(1)<0&&bs.cmp(0)>=0&&bs.cmp(1)<0,'physical subfield source guard');assert(P.lo.cmp(start.lo)<=0&&P.hi.cmp(left)<0,'old closed initial source support');const displacement=h.mul(Q.of(1).add(bu)).div(Q.of(1).sub(bs)),slack=P.hi.sub(start.hi).sub(displacement);assert(slack.cmp(0)>0,'strict actual-source displacement guard');return {h,bu,bs,displacement,slack,start,P};
}
export function known(){
 const mk=(t,x,speed)=>({t:Q.of(t),x:Q.of(x),v:Q.of(0),a:Q.of(0),speed:Q.of(speed)}),rows=[mk(0,0,0),mk(1,7,'1/5'),mk(2,2,'3/10')],past=mk(0,3,'1/10'),seam=closedInventory(rows,new G(1),past);assert(seam.x.cmp(7)===0&&seam.speed.cmp('3/10')===0&&seam.bins.join(',')==='1,2');assert.throws(()=>closedInventory(rows,new G(2,3),past),/completed/);
 const guard=sourceGuard(4,'41/10',new G('1.9','2.1'),new G('1.9','2.35'),'1/5','3/10');assert(guard.displacement.cmp('6/35')===0&&guard.slack.cmp('11/140')===0);assert.throws(()=>sourceGuard(4,'41/10',new G('1.9','2.1'),new G('1.9','2.2'),'1/5','3/10'),/strict/);assert.throws(()=>sourceGuard(4,'41/10',new G('1.9','2.1'),new G('1.9','2.35'),'1/5',1),/subfield/);
 const rotated=cartesian([new G(0),new G(1)],[[new G(1),new G(2)],[new G(3),new G(4)]]);assert(rotated[0][0].lo.cmp(4)===0&&rotated[0][1].lo.cmp(-3)===0&&rotated[1][0].lo.cmp(-2)===0&&rotated[1][1].lo.cmp(1)===0);
 return {passed:true,coefficients:coefficientKnown(),roots:rootKnown(),matrix:matrixKnown(),companion:companionKnown(),originalE:signedClockKnown(),scalar:factorsKnown(),cases:['closed seam source X and physical speed maxima','uncompleted source rejection','exact source displacement6/35 and guard slack11/140','insufficient guard and unitspeed reject','quarter-turn full spatial Jacobian conjugation']};
}

import {storage,known as storageKnown} from './authorized-cases-ten-hour-a-continuation-storage.mjs';

function cell({history,rows,left,right,defect,X0,V0,W0,initialS,checkpoint,result}){
const T=new G(left,right),h=right.sub(left),delta=Q.of(defect.bound),nu=Q.of(1),past=null;
  const trialX=X0.add(h.mul(V0)).add(h.mul(h).mul(delta)).mul('6/5').add('1/100000000000000'),trialV=V0.add(h.mul(delta)).mul('6/5').add('1/100000000000000');assert(X0.cmp(trialX)<0&&V0.cmp(trialV)<0,'strict initial physical containment');
  const XC=history.box(T,0),VC=history.box(T,1),bc=normUpper(VC),rc=length(XC).lo,Utrial=expand(VC,trialV),bu=bc.add(trialV);assert(rc.sub(trialX).cmp(0)>0&&bu.cmp(1)<0,'complete receiving physical chart');
  const startS=new G(initialS.lo,initialS.hi);let P=new G(startS.lo,startS.hi.add('1/40'));assert(P.lo.cmp(0)>0,'fixed positive old source support, no synthetic past speed used');const initialInventory=closedInventory(rows,P,past),guard=sourceGuard(left,right,startS,P,bu,initialInventory.speed),seed=startS.lo.add(startS.hi).div(2);
  result.receiving={T,h,X0,V0,W0,nu,trialX,trialV,rc,bc,bu,initialSpeedMargin:Q.of(1).sub(bu),radiusMargin:rc.sub(trialX),XC,VC,defect,initialInventory,guard};result.sourceStages=[];
  let selected,source,sourceField;
  for(let k=0;k<3;k++){
   checkpoint('source refinement '+k);selected=closedInventory(rows,P,past);source=rootFamily(history,T,trialX,selected.x,seed,checkpoint);const stage={stage:k,P,selected,family:source};result.sourceStages.push(stage);sourceField=frame(source.ray,expand(source.jets[1],selected.v),source.jets[2],Utrial,source.jets[1]);stage.coefficients=sourceField;
   if(k<2){const lo=max(P.lo,source.S.lo),hi=min(P.hi,source.S.hi);assert(lo.cmp(hi)<=0,'physical/auxiliary source intersection nonempty');P=new G(lo,hi);}
  }
  checkpoint('position family');const position=rootFamily(history,T,trialX,0,seed,checkpoint),pf=frame(position.ray,position.jets[1],position.jets[2],Utrial,position.jets[1]);result.position={family:position,coefficients:pf};
  checkpoint('velocity family');const velocity=rootFamily(history,T,0,0,seed,checkpoint),vf=frame(velocity.ray,velocity.jets[1],velocity.jets[2],Utrial,velocity.jets[1]),nom=frame(velocity.ray,velocity.jets[1],velocity.jets[2],VC,velocity.jets[1]),alpha=vf.components.vt.div(vf.R.mul(vf.D).mul(vf.w).mul(nom.w));result.velocity={family:velocity,coefficients:vf,nominal:nom,alpha};
  checkpoint('four-dimensional signed bound');const Bq=cartesian(pf.n,pf.q.AX),BH=cartesian(pf.n,pf.H.AX),U=cartesian(vf.n,vf.H.Fu),signed=block(Bq,BH,U,alpha,vf.n,nu),lognorm=lognorm4(signed.S),Ebound=length([new G(1),new G(alpha.absUpper().div(2))]).hi.add(alpha.absUpper().div(2)),Ubound=normUpper(U.flat()),bx=normUpper(signed.EBq.flat()),fq=normUpper(sourceField.q.AX.flat()).mul(selected.x).add(normUpper(sourceField.q.Fv.flat()).mul(selected.v)),fHsource=normUpper(sourceField.H.AX.flat()).mul(selected.x).add(normUpper(sourceField.H.Fv.flat()).mul(selected.v)),residualAlpha=nom.q.Fu[1][0].absUpper(),residualMultiplier=length([new G(1),new G(residualAlpha.div(2))]).hi.add(residualAlpha.div(2)),fH=fHsource.add(residualMultiplier.mul(delta)),forcing=length([new G(nu.mul(Ebound).mul(fq)),new G(fH.add(Ubound.mul(Ebound).mul(fq)))]).hi,factors=scalarFactors(lognorm.mu,h);
  result.transformed={Bq,BH,U,signed,lognorm,Ebound,Ubound,bx,fq,fHsource,residualMultiplier,originalResidual:delta,fH,forcing,factors};
  checkpoint('original E and physical companion');const physical=conditionalFrame(source.ray,neg(source.jets[1]),neg(source.jets[2]),neg(source.jets[3]),Utrial,selected.v,selected.a);assert(physical.R.lo.cmp(0)>0&&physical.D.lo.cmp(0)>0&&physical.Dclock.lo.cmp(0)>0,'original E full chart');result.originalE={physical,sourceX:selected.x,sourceV:selected.v,sourceA:selected.a,P};
  const recurrence=combine({X0,V0,W0,h,Cx:physical.Cx,sourceX:selected.x,sourceV:selected.v,sourceA:selected.a,Hv:physical.Hv,B:physical.B,delta,E:factors.E.hi,P:factors.P.hi,f:forcing,nu,bx,bw:Ebound,bf:Ebound.mul(fq),trialX,trialV});result.recurrence=recurrence;result.passed=true;result.accepted=recurrence.strict.X&&recurrence.strict.V;return result;
}
function continuationKnown(){
 const initial=known(),rounding=storageKnown(),mk=(t,x,speed)=>({t:Q.of(t),x:Q.of(x),v:Q.of(0),a:Q.of(0),speed:Q.of(speed)}),rows=[mk(0,0,0),mk(1,1,'.2')];rows.push(mk(2,2,'.3'));const z=closedInventory(rows,new G(1),null);assert(z.bins.join(',')==='1,2'&&z.speed.cmp('.3')===0&&z.x.cmp(2)===0);return {passed:true,initial,rounding,cases:['newly appended closed seam retains both incident whole-cell bins']};
}
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
if(process.argv.includes('--known-continuation')){console.log(JSON.stringify(encode(continuationKnown()),null,2));process.exit(0);}
if(args.receipt){
 assert(args.targetGate==='coordinator-admitted-a-cartesian-continuation-v1');
 // This placeholder deliberately prevents target use before first-cell audit and allocation freeze.
 assert(args.firstAuditSHA==='PENDING_INDEPENDENT_FIRST_CELL_ACCEPTANCE','first-cell admission not frozen');
 assert(args.out&&!fs.existsSync(args.out)&&!fs.existsSync(args.out+'.jsonl'));
 const started=Date.now(),absolute=Date.parse('2026-10-06T03:20:00Z'),deadline=Math.min(Date.parse(args.deadline),started+2100000,absolute),maxCells=Number(args.maxCells);assert(Number.isFinite(deadline)&&deadline>started&&Number.isInteger(maxCells)&&maxCells>0&&maxCells<=800);
 let phase='binding',completed=0,bytes=0,active=null,fd=null;const result={knownFirst:continuationKnown(),sourceSHA:sha(new URL(import.meta.url)),scope:'subject finite same-history induction; independent emitted-bound audit required before physical acceptance',passed:false,deadline:new Date(deadline).toISOString(),maxCells,limits:{heapMiB:2048,rssMiB:1536,outputMiB:160,cooperativeSeconds:2100},cells:0};
 const checkpoint=p=>{phase=p;assert(Date.now()<deadline,'cooperative time cutoff');assert(process.memoryUsage().rss<=1536*1048576,'cooperative RSS cutoff');console.log(JSON.stringify({event:'continuation-progress',phase,completed,endpoint:result.endpoint??null,wallSeconds:(Date.now()-started)/1000,rssMiB:process.memoryUsage().rss/1048576,bytes}));};
 try{
  const pins={receipt:'f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f',input:'187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495',defects:'f1dfe60ce012fa4678fdd4a27ff871497bcc5dcf2a2a65bc306e6d4ecdd52ca1',defectSpec:'f9c5be916e52f545355109e04253a4d1f148a18356414028668e8061960bcc18',firstCell:'922b492c636df85a7ad24d0cd7ab1cc79e656abb06716e15341c9c7d73cdd672'};
  for(const [k,v]of Object.entries(pins))assert(sha(args[k])===v,k+' exact pin');assert(sha(args.receipt+'.jsonl')==='c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd');assert(sha(args.firstAudit)===args.firstAuditSHA,'independent first-cell exact pin');
  const old=JSON.parse(fs.readFileSync(args.receipt)),first=JSON.parse(fs.readFileSync(args.firstCell)),firstAudit=JSON.parse(fs.readFileSync(args.firstAudit));assert(first.passed&&first.accepted);assert(firstAudit.passed&&firstAudit.subjectSHA===pins.firstCell,'independent first-cell binding');
  result.bindings=Object.fromEntries([...Object.keys(pins),'firstAudit'].map(k=>[k,{path:args[k],sha:sha(args[k])}]));result.dependencySHA=Object.fromEntries(['authorized-cases-ten-hour-a-transverse-physical-u-coefficients-v2.mjs','authorized-cases-ten-hour-a-cartesian-lognorm.mjs','authorized-cases-ten-hour-a-cartesian-companion.mjs','authorized-cases-ten-hour-a-continuation-storage.mjs'].map(p=>[p,sha(new URL(p,import.meta.url))]));
  const raw=fs.readFileSync(args.receipt+'.jsonl','utf8').trim().split('\n').map(JSON.parse);assert(raw.length===16462&&old.bins===16462);const convert=z=>({t:Q.of(z.t),x:Q.of(z.x),v:Q.of(z.v),a:Q.of(z.a),speed:Q.of(z.speedUpper)}),rows=[{t:Q.of(0),x:Q.of(old.initialErrors[0]),v:Q.of(old.initialErrors[1]),a:Q.of(old.initialErrors[2]),speed:Q.of('3/10')},...raw.map(convert)];
  let last=storage(first,first.receiving.bc,first.receiving.T,first.originalE.P);assert(last.t.cmp('7983431761321363/140737488355328')===0);rows.push(last);result.initialStorage=last;result.endpoint=last.t.toString();
  const saved=JSON.parse(fs.readFileSync(args.input));assert(saved.specification.K===1&&saved.specification.cf===1&&saved.specification.equation==='Sections 7 E');const history=new ExactReferenceHistory(saved.knots,saved.specification),drows=fs.readFileSync(args.defects,'utf8').trim().split('\n').map(JSON.parse),end=Q.of('119/2');assert(drows.length===17270);fd=fs.openSync(args.out+'.jsonl','wx');
  for(let j=16463;j<17263&&completed<maxCells;j++){
   checkpoint('next original cell '+(j+1));const defect=drows[j],left=Q.of(defect.left),right=min(defect.right,end);assert(left.cmp(last.t)===0&&right.cmp(left)>0,'exact touching original defect cell');active={index:j+1,originalDefect:defect,restricted:right.cmp(defect.right)!==0};
   cell({history,rows,left,right,defect,X0:last.x,V0:last.v,W0:last.W,initialS:last.S,checkpoint,result:active});assert(active.accepted,'strict raw receiving X/V closure');active.stored=storage(active,active.receiving.bc,{lo:left,hi:right},active.originalE.P);active.wallSeconds=(Date.now()-started)/1000;active.winningCaps=active.recurrence.stages.map(z=>({physicalX:Q.of(z.XI).cmp(z.Xnorm)<=0,physicalV:Q.of(z.VI).cmp(z.VN)<=0}));
   const line=JSON.stringify(encode(active))+'\n',size=Buffer.byteLength(line);assert(bytes+size<=156*1048576,'cooperative output cutoff');fs.writeSync(fd,line);bytes+=size;last=active.stored;rows.push(last);completed++;result.cells=completed;result.endpoint=last.t.toString();result.lastStored=last;active=null;checkpoint('completed receiving cell '+completed);
  }
  result.passed=true;result.stop=Q.of(result.endpoint).cmp(end)===0?'fixed horizon reached':'finite cell limit reached';
 }catch(e){result.failure={phase,message:e.message,attempts:e.attempts??null,stack:e.stack};result.failedCell=active;result.stop=/cutoff/.test(e.message)?'explicit resource cutoff':'first unsupported inequality';}
 if(fd!==null)fs.closeSync(fd);result.completedRows=completed;result.bytes=bytes;result.wallSeconds=(Date.now()-started)/1000;result.rowsSHA=fs.existsSync(args.out+'.jsonl')?sha(args.out+'.jsonl'):null;const output=JSON.stringify(encode(result),null,2)+'\n';assert(Buffer.byteLength(output)<=4*1048576,'summary output limit');fs.writeFileSync(args.out,output,{flag:'wx'});console.log(JSON.stringify({event:'continuation-closed',passed:result.passed,stop:result.stop,completed,endpoint:result.endpoint,wallSeconds:result.wallSeconds,out:args.out}));if(!result.passed)process.exitCode=1;
}
