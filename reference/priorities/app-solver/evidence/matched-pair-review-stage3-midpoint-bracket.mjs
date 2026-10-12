import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
// Independent midpoint quadrature with a global derivative remainder.
// No author bracket or production arithmetic is imported.
const Q=(n,d=1n)=>[BigInt(n),BigInt(d)];
const add=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const neg=a=>Q(-a[0],a[1]);
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>Q(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>{assert(b[0]>0n);return Q(a[0]*b[1],a[1]*b[0]);};
const le=(a,b)=>a[0]*b[1]<=b[0]*a[1];
const power=(a,k)=>Q(a[0]**BigInt(k),a[1]**BigInt(k));
const scale=10n**30n;
const down=a=>{assert(a[0]>=0n);return Q(a[0]*scale/a[1],scale);};
const up=a=>{assert(a[0]>=0n);return Q((a[0]*scale+a[1]-1n)/a[1],scale);};
const num=a=>Number(a[0])/Number(a[1]);
function decimal(t) {
  const m=/^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(t);assert(m);
  const n=BigInt(m[2]+(m[3]??''))*(m[1]==='-'?-1n:1n),e=Number(m[4]??0)-(m[3]?.length??0);
  return e>=0?Q(n*10n**BigInt(e)):Q(n,10n**BigInt(-e));
}
function binary(x) {
  assert(Number.isFinite(x));if(x===0)return Q(0);
  const d=new DataView(new ArrayBuffer(8));d.setFloat64(0,Math.abs(x));
  const b=d.getBigUint64(0),e=Number((b>>52n)&2047n),m=(b&((1n<<52n)-1n))+(e?1n<<52n:0n),p=e?e-1075:-1074;
  const n=x<0?-m:m;return p>=0?Q(n<<BigInt(p)):Q(n,1n<<BigInt(-p));
}
function midpoint(f,M,N=1024) {
  let lo=0n,hi=0n;
  for(let j=0;j<N;j++) {
    const value=div(f(Q(2*j+1,2*N)),Q(N));
    lo+=down(value)[0];hi+=up(value)[0];
  }
  // Integral |u-u_mid| over one cell = 1/(4N^2), summed over N.
  const error=div(M,Q(4*N));
  return [sub(Q(lo,scale),error),add(Q(hi,scale),error)];
}
const contains=(b,q)=>le(b[0],q)&&le(q,b[1]);
const R=Q(10),A=Q(1,5),kappa=Q(1,1000),one=Q(1);
const known=midpoint(u=>div(one,power(add(R,mul(Q(2,5),u)),2)),Q(8,10000));
const knownExact=div(sub(div(one,R),div(one,Q(52,5))),Q(2,5));
assert(contains(known,knownExact));
assert(contains(midpoint(()=>Q(1,100),Q(0)),Q(1,100)));
assert(contains(midpoint(u=>div(sub(Q(3),mul(Q(2),u)),Q(100)),Q(1,50)),Q(1,50)));
assert(le(binary(-0.25),Q(-1,4))&&le(Q(-1,4),binary(-0.25)));
assert(!contains([Q(0),Q(0)],Q(1,100)));
console.log('Known cases passed BEFORE target reads: exact affine-distance integral, static integral, linear weighted integral, signed binary endpoint and escaping interval.');
const [input,output]=process.argv.slice(2);assert(input&&output);
const p=u=>{const t=le(u,Q(1,2))?u:sub(one,u);return sub(mul(Q(12),power(t,2)),mul(Q(16),power(t,3)));};
const distance=u=>add(R,mul(A,p(u)));
const f=u=>div(one,power(distance(u),2));
// |p'|<=3; |f'|<=2*A*3/R^3. Reception phase t=u+A*p(u) has |t'|<=1+3A.
const Mf=div(mul(Q(6),A),power(R,3));
const Mh=add(div(mul(Q(2),add(one,mul(Q(3),A))),power(R,2)),mul(Q(3),Mf));
const I=midpoint(f,Mf),W=midpoint(u=>mul(sub(Q(3),mul(Q(2),add(u,mul(A,p(u))))),f(u)),Mh);
const floor=sub(one,mul(Q(3),A));
const L=add(div(Q(2),mul(power(R,3),power(floor,2))),div(mul(Q(24),A),mul(power(R,2),power(floor,3))));
assert(le(L,Q(61,80))&&le(Q(61,80),L));
const bytes=fs.readFileSync(input),records=bytes.toString().trim().split('\n').map(JSON.parse);
let diagnosticChecks=0;
for(const r of records) {
  if(r.mode!=='diagnostic')continue;
  let exact=null;
  if(r.amplitude==='0') exact=Q(-1,100000);
  else if(r.amplitude==='0.2'&&['0','1','2'].includes(r.time)) exact=Q(-1,100000);
  else if(r.amplitude==='0.2'&&r.time==='0.35') exact=Q(-1,163216);
  else if(r.amplitude==='0.2'&&r.time==='0.85') exact=Q(-1,40804);
  if(exact) {assert.equal(r.status,'certified_complete');assert(contains(r.receiver_acceleration_z.map(binary),exact));diagnosticChecks++;}
}
assert.equal(diagnosticChecks,20);
const targets=[];
for(const r of records) {
  if(r.mode!=='evolve'||r.amplitude!=='0.2'||r.status!=='completed')continue;
  assert.equal(r.coupling,'0.001');assert.equal(r.root_tolerance,'1e-7');
  assert.equal(r.accepted_steps,1);assert.equal(r.accepted_end_time,r.step);
  const h=decimal(r.step);assert(r.step==='2'||r.step==='4');
  const denom=mul(power(R,2),floor);
  const dv=div(mul(mul(power(kappa,2),L),power(h,3)),mul(Q(6),denom));
  const dz=div(mul(mul(power(kappa,2),L),power(h,4)),mul(Q(24),denom));
  const v=[sub(neg(mul(mul(kappa,h),I[1])),dv),add(neg(mul(mul(kappa,h),I[0])),dv)];
  const receiver=r.paths.find(x=>x.path==='receiver');assert(receiver);
  const vp=receiver.velocity_z.map(binary),vg=sub(v[0],vp[1]);assert(vg[0]>0n,'velocity brackets must be disjoint');
  const result={step:r.step,velocityTrue:v.map(num),velocityGapLower:num(vg),velocityHalfWidthsLower:num(div(vg,div(sub(vp[1],vp[0]),Q(2))))};
  if(r.step==='2') {
    const z=[sub(neg(mul(kappa,W[1])),dz),add(neg(mul(kappa,W[0])),dz)];
    const zp=receiver.position_z.map(binary),zg=sub(z[0],zp[1]);assert(zg[0]>0n,'position brackets must be disjoint');
    Object.assign(result,{positionTrue:z.map(num),positionGapLower:num(zg),positionHalfWidthsLower:num(div(zg,div(sub(zp[1],zp[0]),Q(2))))});
  }
  targets.push(result);
}
assert.equal(targets.length,2);
const receipt={recordedAt:new Date().toISOString(),input,inputHash:createHash('sha256').update(bytes).digest('hex'),knownBeforeTargets:true,diagnosticChecks,method:'exact rational midpoint sums with global derivative remainder; N=1024; directed decimal rounding at 30 digits',I:I.map(num),weightedStep2:W.map(num),L:num(L),targets};
fs.writeFileSync(output,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt));
