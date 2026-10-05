// Earlier receiving-test restriction; original failed longer horizon preserved.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {Q,G,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
const min=(a,b)=>a.cmp(b)<0?a:b;
export function restrictAccepted(receipt,Tc,Tf){
  Tc=Q.of(Tc);Tf=Q.of(Tf);assert(Tf.cmp(Tc)>0);
  let t=Tc,prior={x:Q.of(receipt.case.initialErrors.x),v:Q.of(receipt.case.initialErrors.v)},work=null,D=null,R=null;
  const rows=[];for(const row of receipt.rows){
    const dt=Q.of(row.exactCoefficients.dt),end=t.add(dt),errors={x:Q.of(row.exactErrors.x),v:Q.of(row.exactErrors.v)};assert(dt.cmp(0)>0);
    for(const k of ['x','v'])assert(errors[k].cmp(prior[k])>=0&&errors[k].cmp(row.localExpansion[k])<0&&errors[k].cmp(receipt.case.radii[k])<0,'only accepted monotone parent rows');
    const W=G.of(new G(row.work.lo,row.work.hi)),d=new G(row.D.lo,row.D.hi),r=new G(row.R.lo,row.R.hi);assert(W.lo.cmp(0)>0&&d.lo.cmp(0)>0&&r.lo.cmp(0)>0);
    const right=min(end,Tf);rows.push({parentCell:rows.length+1,left:t.toString(),right:right.toString(),parentRight:end.toString(),exactErrors:row.exactErrors,source:row.source,work:row.work,D:row.D,R:row.R});
    work=work===null?W.lo:min(work,W.lo);D=D===null?d.lo:min(D,d.lo);R=R===null?r.lo:min(R,r.lo);prior=errors;t=right;
    if(t.cmp(Tf)===0)return {rows,errors:prior,work,D,R,reached:t};
  }throw new Error('selected restriction exceeds accepted parent coverage');
}
function appendCubic(p,t,j){t=Q.of(t);const s=t.sub(p.t);return {t,x:p.x.map((z,k)=>Q.of(z).add(Q.of(p.v[k]).mul(s)).add(Q.of(p.a[k]).mul(s.mul(s)).div(2)).add(Q.of(j[k]).mul(s.mul(s).mul(s)).div(6))),v:p.v.map((z,k)=>Q.of(z).add(Q.of(p.a[k]).mul(s)).add(Q.of(j[k]).mul(s.mul(s)).div(2))),a:p.a.map((z,k)=>Q.of(z).add(Q.of(j[k]).mul(s)))};}
function known(){
  const make=(x,v,local='.1')=>({exactCoefficients:{dt:'.1'},exactErrors:{x,v},localExpansion:{x:local,v:local},source:{lo:'-.3',hi:'-.2'},work:{lo:1,hi:2},D:{lo:'.8',hi:'.9'},R:{lo:1,hi:2}}),synthetic={case:{initialErrors:{x:'.01',v:'.01'},radii:{x:'.1',v:'.1'}},rows:[make('.02','.02'),make('.03','.03'),make('.2','.2')]},r=restrictAccepted(synthetic,0,'.15');assert(r.rows.length===2&&r.reached.cmp('.15')===0&&r.rows[1].parentRight==='1/5'&&r.errors.v.cmp('.03')===0);assert.throws(()=>restrictAccepted(synthetic,0,'.25'),/only accepted/);assert(Q.of('1.04').sub('.03').sub(1).cmp(0)>0&&Q.of('1.03').sub('.03').sub(1).cmp(0)===0);
  const p={t:0,x:[2,3],v:['.1','.2'],a:['.4','-.3']},j=['.6','1.2'],c1=appendCubic(p,1,j),c2=appendCubic(p,2,j),h1=new ExactReferenceHistory([p,c1],{r:2,omega:0,delta:'.1'}),h2=new ExactReferenceHistory([p,c2],{r:2,omega:0,delta:'.1'}),expected=[['2.1125','3.0875'],['.375','.2'],['.7','.3'],['.6','1.2']];for(let n=0;n<4;n++)for(const H of [h1,h2])H.box(new G('.5'),n).forEach((z,k)=>assert(z.lo.cmp(expected[n][k])<=0&&z.hi.cmp(expected[n][k])>=0));
  return {passed:true,cases:['exact truncated contiguous parent cells','whole parent error inherited on restricted cell','failed candidate excluded','strict/equality reverse-triangle gap','unchanged cubic polynomial with different endpoint knots']};
}
const knownFirst=known();console.log(JSON.stringify({knownFirst,stage:'known-before-target'}));if(process.argv.includes('--known'))process.exit(0);
const input='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-E-test-event.json',output='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-E-test-event-restricted.json';assert(!fs.existsSync(output));const bytes=fs.readFileSync(input),SHA=crypto.createHash('sha256').update(bytes).digest('hex');assert.equal(SHA,'17e5e2d894b2790a48ed13e59a7063455e48f0bc5aeb284a98b65c2cd24164ed');
const receipt=JSON.parse(bytes),historyBytes=fs.readFileSync(receipt.case.input);assert.equal(crypto.createHash('sha256').update(historyBytes).digest('hex'),receipt.case.SHA256);assert.equal(receipt.case.law,'E');assert.equal(receipt.terminal,'declared error tube failed');
const saved=JSON.parse(historyBytes),Tc=Q.of('59.5'),Tf=Q.of('59.56'),restriction=restrictAccepted(receipt,Tc,Tf),history=new ExactReferenceHistory([...saved.knots,appendCubic(saved.knots.at(-1),'59.58',receipt.case.jetSelection.midpoint)],saved.specification),initialSpeed=length(history.box(new G(Tc),1)),finalSpeed=length(history.box(new G(Tf),1)),speedGap=finalSpeed.lo.sub(restriction.errors.v).sub(1),passed=initialSpeed.hi.add(receipt.case.initialErrors.v).cmp(1)<0&&speedGap.cmp(0)>0;
const q=x=>x instanceof Q?x.toString():x instanceof G?x.out():Array.isArray(x)?x.map(q):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,q(v)])):x;
const result={knownFirst,input,SHA256:SHA,historySHA256:receipt.case.SHA256,grade:'conditional earlier E receiving-test event; actual original checkpoint/whole-source guard budgets unsupplied',case:{law:'E',beta:'.3',K:1,cf:1,Tc,Tf,initialErrors:receipt.case.initialErrors,sourceErrors:receipt.case.sourceErrors,sourceGuard:'58.95..59.35 unchanged entire initial source guard',cubicJerk:receipt.case.jetSelection.midpoint},initialSpeed,finalSpeed,speedGap,restriction,passed};fs.writeFileSync(output,JSON.stringify(q(result),null,2),{flag:'wx'});console.log(JSON.stringify(q({...result,restriction:{...restriction,rows:undefined}}),null,2));
