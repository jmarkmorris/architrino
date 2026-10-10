// Independent phase-zero reference: scalar chord equations and a contraction
// iteration, with closed-form paired yz-plane contributions. No subject imports.
import assert from 'node:assert/strict';
function fixedPoint(chord, lipschitz) {
  assert.ok(lipschitz >= 0 && lipschitz < 1);
  let u = 0;
  for (let k = 0; k < 1000; k++) {
    const next = chord(u);
    if (Math.abs(next-u) <= 2e-15) return next;
    u = next;
  }
  throw Error('Contraction did not reach binary64 stopping threshold');
}
function reference(beta) {
  assert.ok(beta >= 0 && beta <= .75);
  const anti = fixedPoint(u => 2*Math.cos(beta*u/2), beta);
  const plus = fixedPoint(u => Math.sqrt(2+2*Math.sin(beta*u)), beta);
  const minus = fixedPoint(u => Math.sqrt(2-2*Math.sin(beta*u)), beta);
  const x=beta*anti/2;
  const denominators=[
    anti**3*(1+beta*Math.sin(x)),
    plus**3*(1-beta*Math.cos(beta*plus)/plus),
    minus**3*(1+beta*Math.cos(beta*minus)/minus)
  ];
  const A=[
    -(1+Math.cos(2*x))/denominators[0]
      +(1+Math.sin(beta*plus))/denominators[1]
      -(1-Math.sin(beta*minus))/denominators[2],
    Math.sin(2*x)/denominators[0]-Math.cos(Math.SQRT2*beta)/Math.SQRT2,
    -Math.cos(beta*plus)/denominators[1]-Math.cos(beta*minus)/denominators[2]
      +Math.sin(Math.SQRT2*beta)/Math.SQRT2
  ];
  return {beta,delays:{anti,yz:Math.SQRT2,plus,minus},A,
    lambda:-(beta**2)-A[0],mu:-A[1],side:-A[2],residualNorm:Math.hypot(A[1],A[2])};
}
const mode=process.argv[2];
if(mode==='controls') {
  assert.ok(Math.abs(fixedPoint(u=>1+.5*u,.5)-2)<1e-13);
  assert.throws(()=>fixedPoint(()=>1,1));
  const staticCase=reference(0);
  [-.25,-1/Math.SQRT2,-1/Math.SQRT2].forEach((v,k)=>assert.ok(Math.abs(v-staticCase.A[k])<1e-14));
  assert.equal(staticCase.delays.anti,2);
  const n=19999n*239759n**2n-61440n*27921n*655360n;
  const d=61440n*239759n**2n;
  assert.ok(n*1000n>7n*d);
  console.log(JSON.stringify({mode,status:'passed',knownContractionRoot:2,rejectedNoncontraction:true,staticCase,exactGap:{numerator:String(n),denominator:String(d),exceeds:.007}}));
} else if(mode==='target') {
  console.log(JSON.stringify({mode,claimGrade:'measured',scope:'binary64 independent phase-zero reference only; no interval arithmetic certificate',rows:[reference(.25),reference(.75)]}));
} else throw Error('Choose controls or target');
