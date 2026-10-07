// Independent direct-product-rule E derivative and centered signed quadrature.
// Shares accepted exact history/root infrastructure; performs no evolution.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q,G,add,sub,mul,dot,length,knownGrid} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory,cacheKnown} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
import {knownReference} from './maxwell-shaped-overnight-exact-reference-history.mjs';
import {rootBox} from './maxwell-shaped-overnight-directed-defect.mjs';

const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const dependencies=['maxwell-shaped-overnight-grid-interval.mjs','maxwell-shaped-overnight-exact-interval.mjs','maxwell-shaped-overnight-exact-reference-cached.mjs','maxwell-shaped-overnight-exact-reference-history.mjs','maxwell-shaped-overnight-exact-circular-preparation.mjs','maxwell-shaped-overnight-directed-defect.mjs','maxwell-shaped-overnight-directed-sensitivity.mjs'];
const imports=()=>Object.fromEntries(dependencies.map(p=>[p,sha(new URL(p,import.meta.url))]));
const encode=x=>x instanceof Q?x.toString():x instanceof G?x.out():Array.isArray(x)?x.map(encode):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,encode(v)])):x;
const zero=()=>[new G(0),new G(0)];
const cub=x=>x.sq().mul(x);

// r is receiver minus actual negative-member source; v,a,j are that source's jets.
export function directE(r,v,a,j,u){
 const R=length(r);assert(R.lo.cmp(0)>0);const n=mul(r,new G(1).div(R));
 const D=new G(1).sub(dot(n,v));assert(D.lo.cmp(0)>0);
 const clock=new G(1).sub(dot(n,u)).div(D),rdot=sub(u,mul(v,clock));
 const Rdot=dot(n,rdot),ndot=mul(sub(rdot,mul(n,Rdot)),new G(1).div(R));
 const vdot=mul(a,clock),adot=mul(j,clock);
 const Ddot=dot(ndot,v).add(dot(n,vdot)).neg();
 const w=sub(n,v),wdot=sub(ndot,vdot),q=new G(1).sub(dot(v,v)),qdot=dot(v,vdot).mul(-2);
 const c=dot(n,a),cdot=dot(ndot,a).add(dot(n,adot));
 const J=sub(mul(w,c),mul(a,D));
 const Jdot=sub(add(mul(wdot,c),mul(w,cdot)),add(mul(a,Ddot),mul(adot,D)));
 const N=add(mul(w,q),mul(J,R));
 const Ndot=add(add(mul(wdot,q),mul(w,qdot)),add(mul(J,Rdot),mul(Jdot,R)));
 const inverse=new G(1).div(R.sq().mul(cub(D)));
 const F=mul(N,inverse.neg());
 const logDerivative=Rdot.div(R).mul(2).add(Ddot.div(D).mul(3));
 const Fdot=mul(sub(mul(N,logDerivative),Ndot),inverse);
 return {F,Fdot,R,D,clock};
}

export function centered(dmid,derivative,a,b,T){
 a=Q.of(a);b=Q.of(b);T=Q.of(T);assert(b.cmp(a)>0&&T.cmp(b)>=0);
 const half=b.sub(a).div(2),h=half.mul(2),weight=T.sub(a.add(b).div(2));
 const one=[],two=[];
 for(let k=0;k<dmid.length;k++){
  const v=G.of(derivative[k]),c=v.lo.add(v.hi).div(2),radius=v.hi.sub(v.lo).div(2);
  const firstError=half.mul(half).mul(radius),secondError=firstError.mul(weight);
  one.push(G.of(dmid[k]).mul(h).add(new G(firstError.neg(),firstError)));
  two.push(G.of(dmid[k]).mul(h.mul(weight)).sub(new G(c).mul(half.mul(half).mul(half).mul(2).div(3))).add(new G(secondError.neg(),secondError)));
 }
 return {one,two};
}

function rowAt(history,T,S){
 return directE(add(history.box(T,0),history.box(S,0)),mul(history.box(S,1),-1),mul(history.box(S,2),-1),mul(history.box(S,3),-1),history.box(T,1));
}
export function independentPiece(history,a,b,seed,width,Tend){
 const window=new G(a,b),S=rootBox(history,window,history.box(window,0),seed,width);
 const full=rowAt(history,window,S),m=Q.of(a).add(b).div(2),point=new G(m);
 const Sm=rootBox(history,point,history.box(point,0),S.lo.add(S.hi).div(2),S.hi.sub(S.lo).add('1/10000000'),Q.of(0),8);
 const atmid=rowAt(history,point,Sm),dmid=sub(history.box(point,2),atmid.F),derivative=sub(history.box(window,3),full.Fdot);
 return {...centered(dmid,derivative,a,b,Tend),S,Sm,D:full.D,R:full.R,dmid,derivative};
}

export function known(){
 const contains=(x,z,tight=false)=>{x=G.of(x);assert(x.lo.cmp(z)<=0&&x.hi.cmp(z)>=0);if(tight)assert(x.hi.sub(x.lo).cmp('1/100000000000000000000')<0);};
 // Stationary source, arbitrary receiver derivative: F=-r/|r|^3.
 const staticRow=directE([2,0],[0,0],[0,0],[0,0],['3/10','2/5']);
 [[staticRow.F[0],'-1/4'],[staticRow.F[1],0],[staticRow.Fdot[0],'3/40'],[staticRow.Fdot[1],'-1/20']].forEach(([x,z])=>contains(x,z,true));
 // At source S=0: v=0, transverse a=1/5, jerk=1/7; receiver u=(1/4,0).
 // Independent scalar reduction: Fx' = 2u/R^3; Fy'=a(1-2u)/R^2+j(1-u)/R.
 const accelerated=directE([2,0],[0,0],[0,'1/5'],[0,'1/7'],['1/4',0]);
 [[accelerated.F[0],'-1/4'],[accelerated.F[1],'1/10'],[accelerated.clock,'3/4'],[accelerated.Fdot[0],'1/16'],[accelerated.Fdot[1],'11/140']].forEach(([x,z])=>contains(x,z,true));
 // d=2t-1, and a triangular C0 residual with one derivative seam.
 const linear=centered([0],[2],0,1,1);contains(linear.one[0],0,true);contains(linear.two[0],'-1/6',true);
 const left=centered(['1/4'],[1],0,'1/2',1),right=centered(['1/4'],[-1],'1/2',1,1);
 contains(left.one[0].add(right.one[0]),'1/4',true);contains(left.two[0].add(right.two[0]),'1/8',true);
 const quadratic=centered(['1/4'],[new G(0,2)],0,1,1);contains(quadratic.one[0],'1/3');contains(quadratic.two[0],'1/12');
 assert.throws(()=>centered([0],[0],0,2,1));
 const {history}=knownReference(),p=independentPiece(history,Q.of(0),Q.of('1/10'),Q.of('-1.95'),Q.of('1/2'),Q.of('1/10'));
 // y=1-t^2/8 and fixed opposite old source -1: d=-1/4+(2-t^2/8)^-2.
 const mid=Q.of('1/20'),range=Q.of(2).sub(mid.mul(mid).div(8)),exact=Q.of('-1/4').add(Q.of(1).div(range.mul(range)));
 contains(p.dmid[0],exact);contains(p.derivative[0],0);contains(p.derivative[0],Q.of('1/20').div(Q.of('1599/800').mul('1599/800').mul('1599/800')));
 return {passed:true,cases:['stationary direct E value and reception derivative','nonzero transverse source acceleration and source jerk with clock rate 3/4','exact affine cancellation and weighted integral','continuous triangular residual with derivative seam','quadratic exact moments enclosed','future weight rejected','quadratic comparison midpoint and whole-piece derivative'],sharedControls:{grid:knownGrid(),cache:cacheKnown()}};
}

if(process.argv[1]===new URL(import.meta.url).pathname){
 const args={};for(let i=2;i<process.argv.length;i++)if(process.argv[i].startsWith('--'))args[process.argv[i].slice(2)]=process.argv[i+1];
 assert(args.out&&!fs.existsSync(args.out),'fresh output only');
 if(process.argv.includes('--known')){
  const receipt={time:new Date().toISOString(),sourceSHA:sha(new URL(import.meta.url)),imports:imports(),...known()};
  fs.writeFileSync(args.out,JSON.stringify(encode(receipt),null,2)+'\n',{flag:'wx'});console.log('Independent known controls passed.');
 }else if(process.argv.includes('--target')){
  const receipt=JSON.parse(fs.readFileSync(args.knownReceipt));assert(receipt.passed&&receipt.sourceSHA===sha(new URL(import.meta.url)));assert.deepEqual(receipt.imports,imports());
  const started=Date.now(),deadline=started+1200000;let lastBeat=started;
  const summary=JSON.parse(fs.readFileSync(args.summary));assert(summary.law==='E');
  assert(sha(args.summary)==='f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f');
  assert(sha(args.summary+'.jsonl')==='c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd');
  assert(sha(args.input)===summary.inputSHA);
  const data=JSON.parse(fs.readFileSync(args.input)),history=new ExactReferenceHistory(data.knots,data.specification);
  const rows=fs.readFileSync(args.summary+'.jsonl','utf8').trim().split('\n').slice(0,128).map(JSON.parse);assert(rows.length===128);
  const T=Q.of(rows.at(-1).t),past=summary.pastMismatch.map(Q.of);
  let left=Q.of(0),I1=zero(),I2=zero(),velocityRadius=Q.of(summary.initialErrors[1]),positionRadius=Q.of(summary.initialErrors[0]).add(T.mul(summary.initialErrors[1]));
  const cells=[];
  for(let k=0;k<rows.length;k++){
   const old=rows[k],right=Q.of(old.t),width=right.sub(left);assert(width.cmp(0)>0&&Q.of(old.S.hi).cmp(0)<0&&old.sourceBins.length===0);
   const seed=Q.of(old.S.lo).add(old.S.hi).div(2),rootWidth=Q.of(old.S.hi).sub(old.S.lo).add('1/100');let first=zero(),second=zero();const pieces=[];
   for(let j=0;j<8;j++){
    assert(Date.now()<deadline,'cooperative deadline');const a=left.add(width.mul(j).div(8)),b=left.add(width.mul(j+1).div(8));
    const p=independentPiece(history,a,b,seed,rootWidth,T);assert(p.S.hi.cmp(0)<0&&p.Sm.hi.cmp(0)<0);
    first=add(first,p.one);second=add(second,p.two);pieces.push({a,b,...p});
    if(Date.now()-lastBeat>=10000){console.log(JSON.stringify({event:'independent-signed-progress',cell:k,piece:j+1,total:128,wallSeconds:(Date.now()-started)/1000}));lastBeat=Date.now();}
   }
   const Gbound=Q.of(old.Cx).mul(Q.of(old.x).add(past[0])).add(Q.of(old.Hv).mul(past[1])).add(Q.of(old.B).mul(past[2]));
   velocityRadius=velocityRadius.add(width.mul(Gbound));positionRadius=positionRadius.add(width.mul(T.sub(left.add(right).div(2))).mul(Gbound));
   I1=add(I1,first);I2=add(I2,second);cells.push({index:k,left,right,Gbound,first,second,pieces});left=right;
  }
  assert(left.cmp(T)===0);assert.deepEqual(receipt.imports,imports());
  const V=length(I1).hi.add(velocityRadius),X=length(I2).hi.add(positionRadius),old=rows.at(-1);
  const result={scope:'independent direct derivative and centered residual quadrature on 128 accepted cells; shared roots/history; no evolution',time:new Date().toISOString(),sourceSHA:sha(new URL(import.meta.url)),imports:imports(),knownSHA:sha(args.knownReceipt),bindings:{summary:sha(args.summary),rows:sha(args.summary+'.jsonl'),input:sha(args.input)},T,I1,I2,velocityRadius,positionRadius,V,X,oldV:old.v,oldX:old.x,improvedV:V.cmp(old.v)<0,improvedX:X.cmp(old.x)<0,cells,wallSeconds:(Date.now()-started)/1000};
  const bytes=JSON.stringify(encode(result))+'\n';assert(Buffer.byteLength(bytes)<2*1024*1024,'2MiB output cap');fs.writeFileSync(args.out,bytes,{flag:'wx'});
  console.log(JSON.stringify(encode({...result,cells:undefined})));
 }else throw Error('choose known or target');
}
