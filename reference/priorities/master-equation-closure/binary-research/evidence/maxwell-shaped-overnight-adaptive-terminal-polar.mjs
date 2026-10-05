// Conditional incoming solution diagnostics; source/prefix admission is external.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {Q,G,add,mul,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
const min=(a,b)=>a.cmp(b)<0?a:b,max=(a,b)=>a.cmp(b)>0?a:b;
function polar(q,u,ex=0,ev=0){
  const expand=(a,e)=>a.map(z=>G.of(z).add(new G(Q.of(e).neg(),e))),x=expand(q,ex),v=expand(u,ev),r=length(x);
  assert(r.lo.cmp(0)>0,'positive polar radius required');
  const radialNumerator=dot(x,v),det=x[0].mul(v[1]).sub(x[1].mul(v[0]));
  return {radius:r,radial:radialNumerator.div(r),tangential:det.div(r),phaseRate:det.div(r.sq()),radialNumerator,det};
}
function appendCubic(p,t,j){t=Q.of(t);const s=t.sub(p.t);return {t,x:p.x.map((z,k)=>Q.of(z).add(Q.of(p.v[k]).mul(s)).add(Q.of(p.a[k]).mul(s.mul(s)).div(2)).add(Q.of(j[k]).mul(s.mul(s).mul(s)).div(6))),v:p.v.map((z,k)=>Q.of(z).add(Q.of(p.a[k]).mul(s)).add(Q.of(j[k]).mul(s.mul(s)).div(2))),a:p.a.map((z,k)=>Q.of(z).add(Q.of(j[k]).mul(s)))};}
const p=polar([3,4],['-.8','.6']);assert(p.radius.lo.cmp(5)<=0&&p.radius.hi.cmp(5)>=0&&p.radial.lo.cmp(0)<=0&&p.radial.hi.cmp(0)>=0&&p.tangential.lo.cmp(1)<=0&&p.tangential.hi.cmp(1)>=0&&p.phaseRate.lo.cmp('.2')<=0&&p.phaseRate.hi.cmp('.2')>=0);
assert(polar([3,4],['-.6','-.8']).radial.hi.cmp('-.999999999999')<0&&polar([3,4],['.6','.8']).radial.lo.cmp('.999999999999')>0);
const pert=polar([3,4],['-.8','.6'],'.01','.02'),sample=polar(['3.006','3.992'],['-.788','.584']);for(const k of ['radius','radial','tangential','phaseRate'])assert(pert[k].lo.cmp(sample[k].lo)<=0&&pert[k].hi.cmp(sample[k].hi)>=0);
assert.throws(()=>polar([0,0],[1,0]));
const end=appendCubic({t:0,x:[2,3],v:['.1','.2'],a:['.4','-.3']},1,['.6','1.2']);assert(end.x[0].cmp('2.4')===0&&end.v[0].cmp('.8')===0&&end.a[0].cmp(1)===0&&end.x[1].cmp('3.25')===0&&end.v[1].cmp('.5')===0&&end.a[1].cmp('.9')===0);
assert(Q.of('38.3').add(new Q(1n,10000n)).cmp('38.3001')===0);
const knownFirst={passed:true,cases:['signed 3-4-5 orthogonal/inward/outward polar identities','nonzero error balls enclose signed sample','zero radius rejection','exact cubic endpoint X/V/A','exact decimal contiguous cell']};
console.log(JSON.stringify({knownFirst,stage:'known-before-target'}));if(process.argv.includes('--known'))process.exit(0);
const input='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-test-event-adaptive.json',output='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-test-event-adaptive-terminal-polar.json';assert(!fs.existsSync(output),'retain earlier outputs');
const bytes=fs.readFileSync(input),receipt=JSON.parse(bytes),historyBytes=fs.readFileSync(receipt.case.input),saved=JSON.parse(historyBytes);assert(receipt.passed&&crypto.createHash('sha256').update(historyBytes).digest('hex')===receipt.case.SHA256);
const j=receipt.case.jetSelection.midpoint.map(Q.of),history=new ExactReferenceHistory([...saved.knots,appendCubic(saved.knots.at(-1),'38.41',j)],saved.specification),ranges={},rows=[];let t=Q.of('38.3');
for(const row of receipt.rows){const dt=Q.of(row.exactCoefficients.dt),next=t.add(dt),z=polar(history.box(new G(t,next),0),history.box(new G(t,next),1),row.exactErrors.x,row.exactErrors.v);for(const [k,v]of Object.entries(z)){ranges[k]=ranges[k]?new G(min(ranges[k].lo,v.lo),max(ranges[k].hi,v.hi)):v;}rows.push({left:t.toString(),right:next.toString(),polar:Object.fromEntries(Object.entries(z).map(([k,v])=>[k,v.out()]))});t=next;}
assert(t.cmp('38.4')===0&&rows.length===1006);const passed=ranges.radialNumerator.hi.cmp(0)<0&&ranges.det.lo.cmp(0)>0;
const result={knownFirst,input,SHA256:crypto.createHash('sha256').update(bytes).digest('hex'),historySHA256:receipt.case.SHA256,grade:'conditional terminal polar solution diagnostics; actual original prefix not admitted',domain:'true incoming interval until first event only; no outgoing analytical test adoption',cells:rows.length,ranges:Object.fromEntries(Object.entries(ranges).map(([k,v])=>[k,v.out()])),eventPhaseIncrementUpper:new G(ranges.phaseRate.hi.mul('.1')).out(),passed,rows};
fs.writeFileSync(output,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify({...result,rows:undefined},null,2));
