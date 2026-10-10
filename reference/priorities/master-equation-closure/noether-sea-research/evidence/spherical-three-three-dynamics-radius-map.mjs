// Exact similarity scaling of retained prescribed-history measurements.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
const stats=a=>({min:Math.min(...a),max:Math.max(...a),mean:mean(a),rms:Math.sqrt(mean(a.map(x=>x*x)))});
function scale(row,beta,g){return {lambda:g*g*row.lambda+(g*g-g)*beta*beta,mu:g*g*row.mu,side:g*g*row.side,residual:g*g*row.residual};}
assert.equal(mean([1,3]),2);assert.equal(stats([-3,3]).rms,3);
const known=scale({lambda:-.15,mu:.2,side:-.3,residual:Math.hypot(.2,.3)},.5,.1);
assert.ok(Math.abs(known.lambda-(-.25/10+.1/100))<1e-15);
assert.ok(Math.abs(known.mu-.002)<1e-15);assert.ok(Math.abs(known.side+.003)<1e-15);
console.log(JSON.stringify({kind:'controls',status:'passed',directRadiusTen:known}));
const prefix='reference/priorities/master-equation-closure/noether-sea-research/evidence/';
const paths=['.local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json',prefix+'spherical-three-three-dynamics-phase-zero-superfield-target.jsonl'];
const inputs=paths.map(path=>({path,bytes:readFileSync(path)}));
const subfield=JSON.parse(inputs[0].bytes.toString());
const event=inputs[1].bytes.toString().trim().split('\n').map(JSON.parse).find(x=>x.beta===1.5);
assert.equal(event.rootCount,6);
const sourceCases=subfield.cases.map(c=>({beta:c.summary.beta,scope:'768 phase samples over one prescribed period',rows:c.rows.map(r=>({lambda:r.lambda,mu:r.mu,side:r.side,residual:r.residualNorm}))}));
sourceCases.push({beta:1.5,scope:'positive receiver 0 at phase zero only; all six share support magnitudes, antipodal sideways signs reverse',rows:[event]});
const cells=[];
for(const source of sourceCases)for(const g of [.1,1,10]){
  const rows=source.rows.map(row=>scale(row,source.beta,g));
  cells.push({beta:source.beta,g,R:1/g,scope:source.scope,normal:stats(rows.map(r=>r.lambda)),along:stats(rows.map(r=>r.mu)),sideways:stats(rows.map(r=>r.side)),fullResidual:stats(rows.map(r=>r.residual)),dimensionless:{normal:stats(rows.map(r=>r.lambda/g)),along:stats(rows.map(r=>r.mu/g)),sideways:stats(rows.map(r=>r.side/g))}});
}
for(const g of [.1,1,10])cells.push({beta:3,g,R:1/g,status:'inadmissible for a full-period ordinary-root residual: cross-plane Dt=0 events',scope:'root obstruction; no acceleration evaluated'});
const receipt={schema:'spherical-three-three-prescribed-radius-support/v1',cf:1,Kint:1,inputs:inputs.map(x=>({path:x.path,sha256:createHash('sha256').update(x.bytes).digest('hex')})),cells};
writeFileSync(prefix+'spherical-three-three-dynamics-radius-map.json',JSON.stringify(receipt,null,2)+'\n');
for(const c of cells)console.log(JSON.stringify(c));
