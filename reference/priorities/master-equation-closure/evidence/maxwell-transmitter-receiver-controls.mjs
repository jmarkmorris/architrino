// Prescribed-history comparison instrument, not an EOM solver. c_f = K = 1.
// Fixed subject: equation-variants/manuscript.md, Sections 7 and 8.
// Independent reference: numerical derivatives of scalar/vector potentials,
// including curl(vector potential), rather than the closed receiver identity.
import assert from 'node:assert/strict';

const add = (a,b) => a.map((z,k)=>z+b[k]);
const sub = (a,b) => a.map((z,k)=>z-b[k]);
const mul = (a,b) => a.map(z=>z*b);
const dot = (a,b) => a.reduce((s,z,k)=>s+z*b[k],0);
const norm = a => Math.sqrt(dot(a,a));
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const zero = () => [0,0,0];

function geometry(source,x,T) {
  assert(source.speedBound < 1, 'declared complete source must be uniformly subfield');
  const gap = S => norm(sub(x,source.X(S))) - (T-S);
  assert(gap(T)>0, 'source must be separated at reception');
  let age=1;
  while(gap(T-age)>=0) {age*=2; assert(age<1e8,'failed to bracket ordinary root');}
  let lo=T-age, hi=T;
  for(let k=0;k<90;k++) {const m=(lo+hi)/2; if(gap(m)>0) hi=m; else lo=m;}
  const S=(lo+hi)/2, r=sub(x,source.X(S)), R=norm(r), n=mul(r,1/R);
  const v=source.V(S), a=source.A(S), D=1-dot(n,v);
  assert(D>0 && R>0);
  assert(Math.abs(gap(S))<1e-11*(1+R));
  return {S,R,n,v,a,D};
}

function subject(source,x,T,u) {
  const g=geometry(source,x,T), {R,n,v,a,D}=g;
  const G=mul(add(sub(mul(n,1-dot(v,v)),mul(v,D)),mul(n,R*dot(n,a))),1/(R*R*D**3));
  const E=mul(add(mul(sub(n,v),1-dot(v,v)),mul(sub(mul(sub(n,v),dot(n,a)),mul(a,D)),R)),1/(R*R*D**3));
  const M=sub(mul(n,dot(u,E)),mul(E,dot(u,n)));
  return {...g,canonical:mul(n,1/(R*R*D)),G,W:sub(E,G),E,M,full:add(E,M)};
}

function potentials(source,x,T) {
  const {R,D,v}=geometry(source,x,T);
  return {scalar:1/(R*D),vector:mul(v,1/(R*D))};
}

function reference(source,x,T,u,h) {
  const derivative=f=>(f(-2*h)-8*f(-h)+8*f(h)-f(2*h))/(12*h);
  const spatial=(component,axis)=>derivative(step=>{
    const y=x.slice();y[axis]+=step;
    const p=potentials(source,y,T);
    return component===-1 ? p.scalar : p.vector[component];
  });
  const G=[0,1,2].map(axis=>-spatial(-1,axis));
  const W=[0,1,2].map(axis=>-derivative(step=>potentials(source,x,T+step).vector[axis]));
  const B=[spatial(2,1)-spatial(1,2),spatial(0,2)-spatial(2,0),spatial(1,0)-spatial(0,1)];
  const E=add(G,W), M=cross(u,B);
  return {G,W,E,M,full:add(E,M),B};
}

function compare(source,x,T,u) {
  const s=subject(source,x,T,u);
  const checks=[4e-4,2e-4,1e-4].map(h=>{
    const r=reference(source,x,T,u,h);
    const errors=Object.fromEntries(['G','W','E','M','full'].map(k=>[k,norm(sub(s[k],r[k]))]));
    assert(Math.max(...Object.values(errors))<2e-7*(1+norm(s.full)), 'potential-derivative mismatch');
    return {h,errors};
  });
  assert(Math.abs(dot(u,s.M))<1e-12*(1+norm(s.M)), 'receiver term changes instantaneous speed');
  return {u,...s,checks};
}

const stationary={speedBound:0,X:zero,V:zero,A:zero};
const b=[0.3,0.4,0];
const affine={speedBound:0.5,X:S=>mul(b,S),V:()=>b,A:zero};
const controls=[];
{
  const x=[2,0,0],u=[0.2,0.3,-0.1],r=reference(stationary,x,0,u,2e-4);
  assert(norm(sub(r.E,[0.25,0,0]))<1e-10);
  assert(norm(r.B)===0 && norm(r.M)===0);
  controls.push({case:'stationary source; moving receiver',E:r.E,B:r.B,M:r.M});
}
{
  const x=[1,-0.7,0.5],u=[0.2,0.3,-0.1],v2=dot(b,b);
  const L=Math.sqrt((1-v2)*dot(x,x)+dot(x,b)**2);
  const E=mul(x,(1-v2)/L**3),B=cross(b,E),M=cross(u,B);
  const r=reference(affine,x,0,u,2e-4);
  const errors={E:norm(sub(r.E,E)),B:norm(sub(r.B,B)),M:norm(sub(r.M,M))};
  assert(Math.max(...Object.values(errors))<1e-10);
  controls.push({case:'affine source; independent present-position closed form',errors});
}
console.log(JSON.stringify({knownControls:controls,passed:true},null,2));
if(process.argv.includes('--controls-only')) process.exit(0);

const cases=[];
const common={speedBound:0.6,X:S=>[0.6*S,0,0],V:()=>[0.6,0,0],A:zero};
for(const [name,x] of [['common transverse',[0,1,0]],['common leading',[1,0,0]],['common trailing',[-1,0,0]]])
  cases.push({name,...compare(common,x,0,[0.6,0,0])});
const collinear={speedBound:0.08,X:S=>[0.2*Math.sin(0.4*S),0,0],V:S=>[0.08*Math.cos(0.4*S),0,0],A:S=>[-0.032*Math.sin(0.4*S),0,0]};
cases.push({name:'accelerated collinear',...compare(collinear,[1.5,0,0],0,[-0.3,0,0])});
const generic={speedBound:0.55,X:S=>[0.9*Math.cos(0.6*S),0.9*Math.sin(0.6*S),0.2*Math.sin(0.3*S)],V:S=>[-0.54*Math.sin(0.6*S),0.54*Math.cos(0.6*S),0.06*Math.cos(0.3*S)],A:S=>[-0.324*Math.cos(0.6*S),-0.324*Math.sin(0.6*S),-0.018*Math.sin(0.3*S)]};
cases.push({name:'generic accelerated; receiver at rest',...compare(generic,[2.3,-1.1,0.7],0.4,zero())});
cases.push({name:'same generic source; moving receiver',...compare(generic,[2.3,-1.1,0.7],0.4,[0.2,0.3,-0.1])});
function circle(phase,beta) {
  return {speedBound:beta,X:S=>[Math.cos(phase+beta*S),Math.sin(phase+beta*S),0],V:S=>[-beta*Math.sin(phase+beta*S),beta*Math.cos(phase+beta*S),0],A:S=>[-(beta**2)*Math.cos(phase+beta*S),-(beta**2)*Math.sin(phase+beta*S),0]};
}
for(const beta of [0.02,0.1,0.5,0.9]) {
  const r=compare(circle(Math.PI,beta),[1,0,0],0,[0,beta,0]);
  const signed=Object.fromEntries(['canonical','G','W','E','M','full'].map(k=>[k,mul(r[k],-1)]));
  cases.push({name:'opposite-polarity antipodal circle',beta,...r,signed});
}
function ring(N,beta) {
  const total={E:zero(),M:zero(),full:zero(),canonical:zero()}, u=[0,beta,0];
  let maxError=0;
  for(let j=1;j<N;j++) {
    const s=subject(circle(2*Math.PI*j/N,beta),[1,0,0],0,u);
    const r=reference(circle(2*Math.PI*j/N,beta),[1,0,0],0,u,1e-4);
    const sign=j%2 ? -1 : 1;
    for(const k of Object.keys(total)) total[k]=add(total[k],mul(s[k],sign));
    maxError=Math.max(maxError,norm(sub(s.E,r.E)),norm(sub(s.M,r.M)));
  }
  assert(maxError<2e-6);
  return {...total,maxPotentialDerivativeError:maxError};
}
const rings=[];
// Supporting prescribed-ring diagnostics: no evolution or stability calculation.
for(const N of [4,24]) {
  let lo=0.3,hi=0.95;
  assert(ring(N,lo).E[1]>0 && ring(N,hi).E[1]<0);
  for(let k=0;k<45;k++) {const m=(lo+hi)/2; if(ring(N,m).E[1]>0)lo=m;else hi=m;}
  const beta=(lo+hi)/2,r=ring(N,beta);
  rings.push({N,beta,...r,balanceRadiusE:r.E[0]<0 ? -r.E[0]/beta**2 : null,balanceRadiusFull:r.full[0]<0 ? -r.full[0]/beta**2 : null});
}
console.log(JSON.stringify({cases,rings,scope:'prescribed histories; no coupled evolution, stability or physical-account claim'},null,2));
