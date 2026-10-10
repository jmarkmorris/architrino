// Separate evaluation of the analytical quarter-period cancellation identity.
// The analytical identity, not agreement between these scripts, is the reference.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
function antipodal(beta){
  let lo=0,hi=beta;
  for(let k=0;k<60;k++){const x=(lo+hi)/2;if(x-beta*Math.cos(x)>0)hi=x;else lo=x;}
  const xi=(lo+hi)/2;
  return {xi,C:Math.sin(xi)/(4*Math.cos(xi)**2*(1+beta*Math.sin(xi)))};
}
const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
assert.equal(mean([1,3]),2);
const known=antipodal(Math.PI/(3*Math.sqrt(3)));
assert.ok(Math.abs(known.xi-Math.PI/6)<1e-14);
assert.ok(Math.abs(known.C-1/(6*(1+Math.PI/(6*Math.sqrt(3)))))<1e-14);
console.log(JSON.stringify({kind:'known-control',status:'passed',xiExpected:Math.PI/6,...known}));
const input=JSON.parse(readFileSync(process.argv[2],'utf8'));
for(const {summary,rows} of input.cases){
  const ref=antipodal(summary.beta),N=summary.phases;
  let maxQuarterCancellationError=0;
  for(let k=0;k<N;k++){
    const first=rows[6*k],quarter=rows[6*((k+N/4)%N)];
    maxQuarterCancellationError=Math.max(maxQuarterCancellationError,Math.abs(first.mu+quarter.mu+2*ref.C));
  }
  const actual=mean(rows.map(r=>r.speedDerivative));
  console.log(JSON.stringify({beta:summary.beta,analyticalMean:ref.C,measuredMean:actual,error:actual-ref.C,maxQuarterCancellationError,thetaZero:rows[0]}));
}
