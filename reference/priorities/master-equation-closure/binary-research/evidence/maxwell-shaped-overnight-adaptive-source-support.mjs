// Exact support inventory; it does not admit the external true-prefix errors.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
const min=(a,b)=>a.cmp(b)<0?a:b,max=(a,b)=>a.cmp(b)>0?a:b;
function inventory(rows,finalX){
  let lo=null,hi=null,maxDt=Q.of(0),maxLocalX=Q.of(0),maxWidth=Q.of(0);
  for(const r of rows){
    const a=Q.of(r.source.lo),b=Q.of(r.source.hi),dt=Q.of(r.exactCoefficients.dt),lx=Q.of(r.localExpansion.x);
    assert(a.cmp(b)<=0&&dt.cmp(0)>0&&dt.cmp('.0001')<=0&&lx.cmp(Q.of(finalX).add('.00002'))<=0);
    const w=dt.mul(4).add('.00000001').add(lx.add('.001').mul(10));
    lo=lo===null?a:min(lo,a);hi=hi===null?b:max(hi,b);maxDt=max(maxDt,dt);maxLocalX=max(maxLocalX,lx);maxWidth=max(maxWidth,w);
  }
  // Every nonempty refined rootBox is an intersection with its initial
  // G(seed-width,seed+width). An initial bracket point is at most its
  // diameter from a refined point. Include both outward endpoint grids.
  const diameter=maxWidth.mul(2).add('0.000000000000000000000002');
  return {refined:{lo,hi},initialGuard:{lo:lo.sub(diameter),hi:hi.add(diameter)},maxDt,maxLocalX,maxWidth};
}
const controls=inventory([{source:{lo:'1.01',hi:'1.02'},exactCoefficients:{dt:'.0001'},localExpansion:{x:'.00102'}}],'.001');
assert(controls.maxWidth.cmp('.02060001')===0);
assert(controls.initialGuard.lo.cmp(Q.of('1.01').sub('.041200020000000000000002'))===0);
assert(controls.initialGuard.hi.cmp(Q.of('1.02').add('.041200020000000000000002'))===0);
const knownFirst={passed:true,cases:['exact width .02060001','nonempty-intersection bracket diameter plus two outward grid units']};
console.log(JSON.stringify({knownFirst,stage:'known-before-target'}));
if(process.argv.includes('--known'))process.exit(0);
const input='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-test-event-adaptive.json',output='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-test-event-adaptive-source-support.json';
assert(!fs.existsSync(output),'retain earlier output');
const bytes=fs.readFileSync(input),r=JSON.parse(bytes);assert(r.passed&&r.terminal==='completed'&&r.cells===r.rows.length);
const z=inventory(r.rows,r.exactWitness.errors.x),guard={lo:Q.of('37.42'),hi:Q.of('37.81')};
assert(guard.lo.cmp(z.initialGuard.lo)<0&&guard.hi.cmp(z.initialGuard.hi)>0&&guard.hi.cmp('38.3')<0);
const exact=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v instanceof Q?v.toString():exact(v)]));
const result={knownFirst,input,SHA256:crypto.createHash('sha256').update(bytes).digest('hex'),cells:r.cells,exact:exact(z),outwardRefined:new G(z.refined.lo,z.refined.hi).out(),outwardInitialGuard:new G(z.initialGuard.lo,z.initialGuard.hi).out(),wholeInputGuard:{lo:'37.42',hi:'37.81'},requiredSourceErrors:{x:'.001',v:'.001',a:'.01'},grade:'conditional source-support inventory; actual original prefix admission remains external',passed:true};
fs.writeFileSync(output,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify(result,null,2));
