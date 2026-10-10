// Reviewer's frozen exact-event formulas. No subject implementation imported.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
function antipode(beta) {
  assert.ok(beta>=0&&beta<1);
  let x=0;
  for(let k=0;k<10000;k++) {
    const y=beta*Math.cos(x);
    if(Math.abs(y-x)<1e-15) return Math.sin(y)/(4*Math.cos(y)**2*(1+beta*Math.sin(y)));
    x=y;
  }
  throw Error('No convergence');
}
const predictions=(beta,next,previous)=>[
  antipode(beta)-Math.cos(next-Math.SQRT2*beta)/Math.SQRT2,
  antipode(beta)+Math.cos(previous-Math.SQRT2*beta)/Math.SQRT2
];
const mode=process.argv[2];
if(mode==='controls') {
  assert.equal(antipode(0),0);
  assert.throws(()=>antipode(1));
  const beta=Math.PI/(3*Math.sqrt(3));
  const expected=1/(6*(1+Math.PI/(6*Math.sqrt(3))));
  assert.ok(Math.abs(antipode(beta)-expected)<1e-14);
  const zero=predictions(0,0,0);
  assert.ok(Math.abs(zero[0]+1/Math.SQRT2)<1e-15);
  assert.ok(Math.abs(zero[1]-1/Math.SQRT2)<1e-15);
  console.log(JSON.stringify({mode,status:'passed',knownAngle:Math.PI/6,expected,actual:antipode(beta),staticEvents:zero,rejectedBoundary:true}));
} else if(mode==='target') {
  const path=process.argv[3];assert.ok(path);
  const bytes=readFileSync(path),data=JSON.parse(bytes);
  const rows=data.cases.map(c=>{
    const [own,next,previous]=c.summary.relativePhases;
    assert.equal(own,0);
    const expected=predictions(c.summary.beta,next,previous);
    const events=[0,Math.PI/2].map(theta=>c.rows.find(r=>r.i===0&&Math.abs(r.theta-theta)<1e-14));
    assert.ok(events.every(Boolean));
    const actual=events.map(r=>r.speedDerivative);
    const error=Math.max(...actual.map((v,i)=>Math.abs(v-expected[i])));
    assert.ok(error<2e-12);
    return {beta:c.summary.beta,phases:[own,next,previous],expected,actual,maxAbsoluteError:error};
  });
  console.log(JSON.stringify({mode,status:'passed',scope:'positive circle 0, own phase 0 and pi/2, retained pilot cells only; binary64 comparison',tolerance:2e-12,path,sha256:createHash('sha256').update(bytes).digest('hex'),rows}));
} else throw Error('Choose controls or target');
