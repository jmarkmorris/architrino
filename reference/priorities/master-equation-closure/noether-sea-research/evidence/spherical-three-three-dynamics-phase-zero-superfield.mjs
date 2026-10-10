// Phase-zero reference only. Targets require reviewed admission, supplied separately.
import assert from 'node:assert/strict';
const dot=(a,b)=>a.reduce((s,v,k)=>s+v*b[k],0);
const mul=(a,s)=>a.map(v=>v*s);
const add=(a,b)=>a.map((v,k)=>v+b[k]);
const close=(a,b)=>assert.ok(Math.abs(a-b)<2e-13,`${a} != ${b}`);
function root(f,lo,hi){
  let fl=f(lo),fh=f(hi);assert.ok(fl<=0&&fh>=0,'proved sign bracket required');
  if(fl===0)return lo;if(fh===0)return hi;
  for(let k=0;k<60;k++){const m=(lo+hi)/2;if(f(m)>0)hi=m;else lo=m;}
  return(lo+hi)/2;
}
function hit(x,v,receiverV,polarity){
  const r=[1-x[0],-x[1],-x[2]],u=Math.hypot(...r),n=mul(r,1/u);
  const Dt=1-dot(n,v),Dr=1-dot(n,receiverV);
  assert.ok(u>0&&Math.abs(Dt)>1e-12);
  return {u,Dt,Dr,A:mul(n,polarity/(u*u*Math.abs(Dt)))};
}
function self(beta){
  if(beta<=1)return [];
  assert.ok(beta>=1.5&&beta<=Math.PI/2,'one-lobe bracket domain');
  const x=root(z=>z-beta*Math.sin(z),.5,beta),u=2*x/beta;
  return [{x,...hit([Math.cos(2*x),-Math.sin(2*x),0],[beta*Math.sin(2*x),beta*Math.cos(2*x),0],[0,beta,0],1),rootDelay:u}];
}
function antipode(beta){
  assert.ok(beta>0&&beta<Math.PI/2);
  const x=root(z=>z-beta*Math.cos(z),0,beta);
  return {x,...hit([-Math.cos(2*x),Math.sin(2*x),0],[-beta*Math.sin(2*x),-beta*Math.cos(2*x),0],[0,beta,0],-1),rootDelay:2*x/beta};
}
function controls(){
  close(root(x=>x-2,0,4),2);
  assert.throws(()=>root(x=>x*x+1,0,1));
  assert.deepEqual(self(.5),[]);
  const known=self(Math.PI/2)[0];close(known.x,Math.PI/2);close(known.u,2);close(known.Dt,1);close(known.Dr,1);known.A.forEach((x,k)=>close(x,k===0?.25:0));
  const anti=antipode(Math.PI/(3*Math.sqrt(3)));close(anti.x,Math.PI/6);close(anti.u,Math.sqrt(3));
  const stationary=hit([0,1,0],[0,0,0],[0,-Math.sqrt(2),0],1);close(stationary.Dt,1);close(stationary.Dr,0);stationary.A.forEach((x,k)=>close(x,[1,-1,0][k]/(2*Math.sqrt(2))));
  console.log(JSON.stringify({kind:'controls',status:'passed',selfEndpoint:known,antipodalKnown:anti,receiverZero:stationary}));
}
controls();
if(process.argv[2]==='target'){
  assert.equal(process.argv[3],'reviewed-admission','target requires coordinator-supplied admission verdict');
  const beta=1.5,parts=[...self(beta),antipode(beta)];
  for(const sign of [1,-1]){
    const u=Math.sqrt(2),d=beta*u;
    parts.push(hit([0,sign*Math.cos(d),-sign*Math.sin(d)],[0,sign*beta*Math.sin(d),sign*beta*Math.cos(d)],[0,beta,0],sign));
  }
  const plus=root(u=>u-2*Math.sin(Math.PI/4+beta*u/2),Math.sqrt(2),2);
  const minus=root(u=>u-2*Math.cos(Math.PI/4+beta*u/2),0,Math.PI/(2*beta));
  for(const [sign,u] of [[1,plus],[-1,minus]]){
    const d=beta*u;
    parts.push({...hit([-sign*Math.sin(d),0,sign*Math.cos(d)],[sign*beta*Math.cos(d),0,sign*beta*Math.sin(d)],[0,beta,0],sign),rootDelay:u});
  }
  const A=parts.reduce((s,p)=>add(s,p.A),[0,0,0]);
  console.log(JSON.stringify({beta,cf:1,R:1,rootCount:parts.length,parts,A,lambda:-beta*beta-A[0],mu:-A[1],side:-A[2],residual:Math.hypot(A[1],A[2])}));
}else assert.equal(process.argv[2],'controls');
