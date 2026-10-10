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
const show=a=>a.map(v=>Number(v)/Number(S));
function trigRange(u,kind){
  const t=trig(3n*(u[0]+u[1]),2n*S,kind),r=ceil(3n*(u[1]-u[0]),2n);
  return[t[0]-r,t[1]+r];
}
function H(u){
  return sub(add(square(sub(sub(rat(2n),square(u)),trigRange(u,'sin'))),square(add(trigRange(u,'cos'),mul(rat(2n,3n),u)))),rat(1n));
}
function Hp(u){return mul(rat(2n),mul(sub(square(u),rat(16n,9n)),add(mul(rat(2n),u),mul(rat(3n),trigRange(u,'cos')))));}
function isolate(fn,dfn,domain,tolerance=S/10000000n){
  const roots=[],unresolved=[];let cells=0;
  function visit(a,depth){
    assert.ok(++cells<100000,'cell cap');const f=fn(a);if(f[0]>0n||f[1]<0n)return;
    const d=dfn(a),left=fn([a[0],a[0]]),right=fn([a[1],a[1]]);
    const monotone=d[0]>0n||d[1]<0n;
    const crossed=(left[0]>0n&&right[1]<0n)||(left[1]<0n&&right[0]>0n);
    if(monotone&&!crossed&&((left[0]>0n&&right[0]>0n)||(left[1]<0n&&right[1]<0n)))return;
    if(monotone&&crossed&&a[1]-a[0]<=tolerance){roots.push(a);return;}
    if(depth===40){unresolved.push(a);return;}
    const m=(a[0]+a[1])/2n;visit([a[0],m],depth+1);visit([m,a[1]],depth+1);
  }
  visit(domain,0);return{roots,unresolved,cells};
}
function controls(){
  assert.deepEqual(trig(0n,1n,'sin'),rat(0n));assert.deepEqual(trig(0n,1n,'cos'),rat(1n));
  assert.deepEqual(H(rat(0n)),rat(4n));
  const known=isolate(x=>sub(square(x),rat(2n)),x=>mul(rat(2n),x),[S,2n*S]);
  assert.equal(known.roots.length,1);assert.equal(known.unresolved.length,0);
  assert.ok(known.roots[0][0]**2n<2n*S*S&&known.roots[0][1]**2n>2n*S*S);
  const absent=isolate(x=>add(square(x),rat(1n)),x=>mul(rat(2n),x),[0n,S]);assert.equal(absent.roots.length,0);assert.equal(absent.unresolved.length,0);
  console.log(JSON.stringify({kind:'controls',status:'passed',sqrtTwo:show(known.roots[0]),absentRoots:absent.roots.length}));
}
controls();
if(process.argv[2]==='target'){
  const start=performance.now(),result=isolate(H,Hp,[0n,2n*S]);
  assert.equal(result.unresolved.length,0);assert.equal(result.roots.length,2);
  const roots=result.roots.map(u=>{
    const sin=trigRange(u,'sin'),cos=trigRange(u,'cos'),a=sub(rat(2n),square(u));
    const Ftheta=mul(rat(2n),add(cos,mul(rat(2n,3n),u))),Fuu=sub(mul(rat(9n),square(u)),rat(16n));
    const sinTwoTheta=add(mul(a,cos),mul(mul(rat(2n,3n),u),sin));
    const cosTwoTheta=sub(add(rat(1n),mul(mul(rat(2n,3n),u),cos)),mul(a,sin));
    return{delay:show(u),delayFixed:u.map(String),Ftheta:show(Ftheta),Fuu:show(Fuu),sinTwoTheta:show(sinTwoTheta),cosTwoTheta:show(cosTwoTheta)};
  });
  const receipt={schema:'spherical-three-three-fold-local/v1',scale:S.toString(),roots,cells:result.cells,unresolved:0,wallSeconds:(performance.now()-start)/1000,memory:process.memoryUsage()};
  writeFileSync(process.argv[3],JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
}else assert.equal(process.argv[2],'controls');
