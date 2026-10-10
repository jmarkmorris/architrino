// Root-admission bounds only; no trajectory evolution or target acceleration.
// Fixed-point intervals use BigInt outward rounding and a Taylor remainder.
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {performance} from 'node:perf_hooks';
const S=10n**24n;
const floor=(a,b)=>a>=0n?a/b:-((-a+b-1n)/b);
const ceil=(a,b)=>-floor(-a,b);
const rat=(a,b=1n)=>[floor(a*S,b),ceil(a*S,b)];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const neg=a=>[-a[1],-a[0]];
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>{const p=[a[0]*b[0],a[0]*b[1],a[1]*b[0],a[1]*b[1]].sort((x,y)=>x<y?-1:x>y?1:0);return[floor(p[0],S),ceil(p[3],S)];};
const square=a=>a[0]>=0n?mul(a,a):a[1]<=0n?mul(neg(a),neg(a)):[0n,ceil(((-a[0]>a[1]?-a[0]:a[1]))**2n,S)];
const factorial=n=>{let p=1n;for(let k=2n;k<=n;k++)p*=k;return p;};
function trig(n,d,kind){
  assert.ok(n>=0n&&n<=6n*d);
  let result=[0n,0n],j=0;
  for(let p=kind==='sin'?1:0;p<=(kind==='sin'?39:40);p+=2,j++){
    const N=n**BigInt(p)*S,D=d**BigInt(p)*factorial(BigInt(p));
    const term=[floor(N,D),ceil(N,D)];result=add(result,j%2?neg(term):term);
  }
  const order=kind==='sin'?40n:41n;
  const err=ceil(n**order*S,d**order*factorial(order));
  return[result[0]-err,result[1]+err];
}
function H(k,bn,bd,e){
  const u=rat(BigInt(k),100n),b=rat(bn,bd),E=rat(BigInt(e));
  const xN=BigInt(k)*bn,xD=100n*bd;
  const a=sub(sub(rat(2n),square(u)),mul(E,trig(xN,xD,'sin')));
  const z=add(trig(xN,xD,'cos'),mul(rat(2n*BigInt(e)*bd,bn),u));
  return sub(add(square(a),square(z)),rat(1n));
}
const show=a=>a.map(x=>Number(x)/Number(S));
function controls(){
  assert.equal(floor(-1n,3n),-1n);assert.equal(ceil(-1n,3n),0n);
  assert.deepEqual(add(rat(1n,2n),rat(1n,2n)),rat(1n));
  assert.deepEqual(square([-2n*S,3n*S]),[0n,9n*S]);
  assert.deepEqual(trig(0n,1n,'sin'),rat(0n));assert.deepEqual(trig(0n,1n,'cos'),rat(1n));
  assert.deepEqual(H(0,3n,2n,1),rat(4n));
  // Independent alternating-series bounds at x=1, deliberately broad.
  const sn=trig(1n,1n,'sin'),cs=trig(1n,1n,'cos');
  assert.ok(sn[0]>rat(5n,6n)[1]&&sn[1]<rat(101n,120n)[0]);
  assert.ok(cs[0]>rat(1n,2n)[1]&&cs[1]<rat(13n,24n)[0]);
  console.log(JSON.stringify({kind:'controls',status:'passed',sinOne:show(sn),cosOne:show(cs)}));
}
controls();
if(process.argv[2]==='target'){
  const start=performance.now();const bounds=[];
  for(const [bn,bd] of [[3n,2n],[3n,1n]])for(const e of [-1,1]){
    let min=null,minK=0;const changes=[];let previous=null;
    for(let k=0;k<=200;k++){
      const h=H(k,bn,bd,e);if(min===null||h[0]<min){min=h[0];minK=k;}
      if(previous&&((previous[0]>0n&&h[1]<0n)||(previous[1]<0n&&h[0]>0n)))changes.push({u:[(k-1)/100,k/100],left:show(previous),right:show(h)});
      previous=h;
    }
    // |H'| <= 6(4+beta)+2(1+4/beta)(beta+2/beta).
    const L=add(mul(rat(6n),add(rat(4n),rat(bn,bd))),mul(rat(2n),mul(add(rat(1n),rat(4n*bd,bn)),add(rat(bn,bd),rat(2n*bd,bn)))));
    const lower=min-mul(L,rat(1n,200n))[1];
    bounds.push({beta:Number(bn)/Number(bd),epsilon:e,minGridLower:Number(min)/Number(S),minGridU:minK/100,derivativeUpper:show(L)[1],continuousLower:Number(lower)/Number(S),signChanges:changes});
  }
  const receipt={schema:'spherical-superfield-root-admission/v1',scale:S.toString(),gridSpacing:.01,cf:1,R:1,bounds,wallSeconds:(performance.now()-start)/1000,memory:process.memoryUsage()};
  assert.ok(bounds.filter(r=>r.beta===1.5).every(r=>r.continuousLower>0));
  assert.ok(bounds.find(r=>r.beta===3&&r.epsilon===1).signChanges.length>=2);
  writeFileSync(process.argv[3],JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
}else assert.equal(process.argv[2],'controls');
