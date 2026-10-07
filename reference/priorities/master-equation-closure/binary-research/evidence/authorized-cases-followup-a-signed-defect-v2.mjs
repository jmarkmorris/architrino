// Retrospective signed-residual certificate; no physical evolution is performed.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q,G,add,sub,mul,dot} from './maxwell-shaped-overnight-grid-interval.mjs';
import {knownReference} from './maxwell-shaped-overnight-exact-reference-history.mjs';
import {ExactReferenceHistory,cacheKnown} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
import {rootBox,inputBox,defectKnown} from './maxwell-shaped-overnight-directed-defect.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';

const matvec=(A,v)=>A.map(r=>dot(r,v));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const enc=x=>x instanceof Q?x.toString():x instanceof G?x.out():Array.isArray(x)?x.map(enc):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,enc(v)])):x;
const zero=()=>[new G(0),new G(0)];
export function moments(d0,d1,a,h,T){
 a=Q.of(a);h=Q.of(h);T=Q.of(T);
 assert(h.cmp(0)>0&&T.cmp(a.add(h))>=0);
 const w=T.sub(a),h2=h.mul(h),h3=h2.mul(h);
 return {one:add(mul(d0,h),mul(d1,h2.div(2))),two:add(mul(d0,w.mul(h).sub(h2.div(2))),mul(d1,w.mul(h2).div(2).sub(h3.div(3))))};
}
export function signedPiece(history,a,b,seed,width){
 a=Q.of(a);b=Q.of(b);const T=new G(a,b),S=rootBox(history,T,history.box(T,0),seed,width);
 const z=inputBox(history,T,S,'E');
 assert(z.D.lo.cmp(0)>0&&z.R.lo.cmp(0)>0);
 const Sa=rootBox(history,new G(a),history.box(new G(a),0),S.lo.add(S.hi).div(2),S.hi.sub(S.lo).add('1/10000000'),Q.of(0),8);
 const za=inputBox(history,new G(a),Sa,'E'),d0=sub(history.box(new G(a),2),za.F);
 const rate=new G(1).sub(dot(z.n,z.U)).div(z.D);
 const direction=sub(z.U,mul(z.sourceV,rate));
 const Fprime=add(add(matvec(z.Fr,direction),matvec(z.Fv,mul(z.sourceA,rate))),add(matvec(z.Fa,mul(z.sourceJ,rate)),matvec(z.Fu,history.box(T,2))));
 return {d0,d1:sub(history.box(T,3),Fprime),S,Sa,D:z.D,R:z.R};
}
export function known(){
 const exact=(g,v)=>{assert(g.lo.cmp(v)<=0&&g.hi.cmp(v)>=0);assert(g.hi.sub(g.lo).cmp('1/100000000000000000000')<0);};
 const linear=moments([new G(-1),new G(2)],[new G(2),new G(-4)],0,1,1);
 exact(linear.one[0],0);exact(linear.two[0],'-1/6');exact(linear.one[1],0);exact(linear.two[1],'1/3');
 const a=moments([new G(0),new G(0)],[new G(1),new G(0)],0,'1/2',1);
 const b=moments([new G('1/2'),new G(0)],[new G(-1),new G(0)],'1/2','1/2',1);
 exact(add(a.one,b.one)[0],'1/4');exact(add(a.two,b.two)[0],'1/8');
 assert.throws(()=>moments(zero(),zero(),0,2,1));
 const controls={original:defectKnown(),cache:cacheKnown()}, {history}=knownReference();
 const piece=signedPiece(history,0,'1/10','-1.95','1/2');
 assert(piece.d0[0].lo.cmp(0)<=0&&piece.d0[0].hi.cmp(0)>=0);
 // Exact quadratic comparison has d'(t)=(t/2)/(2-t^2/8)^3 on this source chart.
 const exactAtEnd=Q.of('1/20').div(Q.of('1599/800').mul(Q.of('1599/800')).mul(Q.of('1599/800')));
 assert(piece.d1[0].lo.cmp(0)<=0&&piece.d1[0].hi.cmp(exactAtEnd)>=0);
 return {passed:true,cases:['signed linear cancellation and weighted moment','continuous triangular residual derivative seam','future weight rejection','stationary and quadratic E response/root controls','whole-piece quadratic residual derivative'],controls};
}

if(process.argv[1]===new URL(import.meta.url).pathname){
 const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,z)=>v.startsWith('--')?[...a,[v.slice(2),z[i+1]]]:a,[]));
 assert(args.out&&!fs.existsSync(args.out),'fresh exclusive output required');
 if(process.argv.includes('--known')){
  fs.writeFileSync(args.out,JSON.stringify(enc({sourceSHA:sha(new URL(import.meta.url)),...known()}),null,2)+'\n',{flag:'wx'});
  console.log('Known controls passed.');
 }else if(process.argv.includes('--target')){
  const k=JSON.parse(fs.readFileSync(args.knownReceipt));assert(k.passed&&k.sourceSHA===sha(new URL(import.meta.url)),'matching pretarget known receipt');
  const started=Date.now(),deadline=started+1200000;let lastBeat=started;
  const summary=JSON.parse(fs.readFileSync(args.summary));
  assert(sha(args.input)===summary.inputSHA&&summary.law==='E');
  assert(sha(args.summary)==='f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f');
  assert(sha(args.summary+'.jsonl')==='c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd');
  const saved=JSON.parse(fs.readFileSync(args.input)),history=new ExactReferenceHistory(saved.knots,saved.specification);
  const rows=fs.readFileSync(args.summary+'.jsonl','utf8').trim().split('\n').slice(0,128).map(JSON.parse);
  assert(rows.length===128);const T=Q.of(rows.at(-1).t),past=summary.pastMismatch.map(Q.of);
  let left=Q.of(0),I1=zero(),I2=zero(),RV=Q.of(summary.initialErrors[1]),RX=Q.of(summary.initialErrors[0]).add(T.mul(summary.initialErrors[1])),oldBudget=Q.of(0);
  const cells=[];
  for(let j=0;j<rows.length;j++){
   assert(Date.now()<deadline,'cooperative cutoff');const r=rows[j],right=Q.of(r.t),h=right.sub(left);
   assert(h.cmp(0)>0&&Q.of(r.S.hi).cmp(0)<0&&r.sourceBins.length===0,'negative complete physical source only');
   const seed=Q.of(r.S.lo).add(r.S.hi).div(2),width=Q.of(r.S.hi).sub(r.S.lo).add('1/100');
   let one=zero(),two=zero();
   for(let n=0;n<8;n++){
    assert(Date.now()<deadline,'cooperative cutoff');
    const a=left.add(h.mul(n).div(8)),b=left.add(h.mul(n+1).div(8));
    const p=signedPiece(history,a,b,seed,width);assert(p.S.hi.cmp(0)<0,'nominal source remains in supplied past');
    const m=moments(p.d0,p.d1,a,b.sub(a),T);one=add(one,m.one);two=add(two,m.two);
    if(Date.now()-lastBeat>=10000){console.log(JSON.stringify({event:'signed-residual-progress',cells:j,piece:n+1,total:128,wallSeconds:(Date.now()-started)/1000}));lastBeat=Date.now();}
   }
   const g=Q.of(r.Cx).mul(Q.of(r.x).add(past[0])).add(Q.of(r.Hv).mul(past[1])).add(Q.of(r.B).mul(past[2]));
   I1=add(I1,one);I2=add(I2,two);RV=RV.add(h.mul(g));RX=RX.add(h.mul(T.mul(2).sub(left).sub(right)).div(2).mul(g));oldBudget=oldBudget.add(h.mul(r.delta));
   cells.push({index:j,left,right,G:g,one,two});left=right;
   if((j+1)%8===0)console.log(JSON.stringify({event:'signed-residual-progress',cells:j+1,total:128,wallSeconds:(Date.now()-started)/1000}));
  }
  const V=normUpper(I1).add(RV),X=normUpper(I2).add(RX),old=rows.at(-1);
  const result={scope:'128 inherited cells; signed residual method, no new physical endpoint',sourceSHA:sha(new URL(import.meta.url)),knownReceiptSHA:sha(args.knownReceipt),bindings:{summary:sha(args.summary),rows:sha(args.summary+'.jsonl'),input:sha(args.input)},T,I1,I2,RV,RX,V,X,oldV:old.v,oldX:old.x,oldMagnitudeResidualBudget:oldBudget,improvedV:V.cmp(old.v)<0,improvedX:X.cmp(old.x)<0,cells,wallSeconds:(Date.now()-started)/1000};
  const output=JSON.stringify(enc(result),null,2)+'\n';assert(Buffer.byteLength(output)<2*1024*1024,'finite output budget');
  fs.writeFileSync(args.out,output,{flag:'wx'});console.log(JSON.stringify(enc({...result,cells:undefined})));
 }
}
