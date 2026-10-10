// Phase-shift companion; original synchronized instrument remains frozen.
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';

const add=(a,b)=>a.map((x,k)=>x+b[k]);
const sub=(a,b)=>a.map((x,k)=>x-b[k]);
const mul=(a,s)=>a.map(x=>x*s);
const dot=(a,b)=>a.reduce((v,x,k)=>v+x*b[k],0);
const norm=a=>Math.hypot(...a);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const close=(a,b,tol=2e-12)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);

function path(axis,sign,beta,phase=0){
  return {q:sign,beta,at(t){
    const h=beta*t+phase,c=Math.cos(h),s=Math.sin(h);
    const p=axis===0?[c,s,0]:axis===1?[0,c,s]:[s,0,c];
    const v=axis===0?[-s,c,0]:axis===1?[0,-s,c]:[c,0,-s];
    return {x:mul(p,sign),v:mul(v,sign*beta),a:mul(p,-sign*beta*beta)};
  }};
}
const stationary=(x,q)=>({q,beta:0,at:()=>({x,v:[0,0,0],a:[0,0,0]})});

// cf=R=K_int=1. Entire paths stay on the unit sphere. If beta<1,
// f(tau)=tau-|x_i(T)-x_j(T-tau)| is strictly increasing by its
// (1-beta)-Lipschitz lower bound, so exactly one partner root lies in (0,2].
// The speed bound excludes all positive-delay self roots.
function acceleration(paths,i,T,iterations=50){
  assert.ok(paths.every(p=>p.beta>=0&&p.beta<1),'subfield root theorem required');
  const receiver=paths[i].at(T); let A=[0,0,0], roots=[];
  for(let j=0;j<paths.length;j++){
    if(j===i)continue; // theorem exclusion, never a numerical root deletion
    const f=tau=>tau-norm(sub(receiver.x,paths[j].at(T-tau).x));
    assert.ok(f(0)<-1e-9,'coincident endpoint outside this diagnostic chart');
    assert.ok(f(2)>=-2e-15,'unit-sphere history coverage failed');
    let lo=0,hi=2;
    for(let k=0;k<iterations;k++){
      const mid=(lo+hi)/2;
      if(f(mid)>0)hi=mid;else lo=mid;
    }
    const tau=(lo+hi)/2,src=paths[j].at(T-tau),r=sub(receiver.x,src.x),d=norm(r),n=mul(r,1/d);
    const Dt=1-dot(n,src.v),Dr=1-dot(n,receiver.v);
    const hit=mul(n,paths[i].q*paths[j].q/(d*d*Math.abs(Dt)));
    A=add(A,hit);
    roots.push({j,tau,bracketWidth:hi-lo,residual:f(tau),distance:d,Dt,Dr,hit});
  }
  return {A,roots};
}
function support(state,A){
  const n=state.x,s=norm(state.v),t=s>0?mul(state.v,1/s):[0,1,0],b=cross(n,t);
  const lambda=-s*s-dot(n,A),mu=-dot(t,A),side=dot(b,sub(state.a,A));
  const residual=sub(sub(state.a,A),mul(n,lambda));
  return {lambda,mu,side,residualNorm:norm(residual),speedDerivative:s>0?dot(t,A):null};
}
function controls(){
  const state={x:[1,0,0],v:[0,.5,0],a:[-.25,0,0]};
  const zero=support(state,[0,0,0]); close(zero.lambda,-.25);close(zero.mu,0);close(zero.residualNorm,0);
  const inward=support(state,[-.25,0,0]);close(inward.lambda,0);close(inward.residualNorm,0);
  const tangent=support(state,[-.25,.125,0]);close(tangent.mu,-.125);close(tangent.speedDerivative,.125);close(tangent.residualNorm,.125);
  const axes=[[1,0,0],[0,1,0],[0,0,1]],oct=axes.flatMap(x=>[stationary(x,1),stationary(mul(x,-1),-1)]);
  const measured=acceleration(oct,0,0);const expected=[-.25,-1/Math.sqrt(2),-1/Math.sqrt(2)];
  measured.A.forEach((x,k)=>close(x,expected[k]));close(norm(measured.A),Math.sqrt(17)/4);
  for(const root of measured.roots){close(root.Dt,1);close(root.tau,root.distance);}
  const negative=acceleration([stationary([1,0,0],1),stationary([0,1,0],1)],0,0);
  negative.A.forEach((x,k)=>close(x,[1,-1,0][k]/(2*Math.sqrt(2))));
  const result={status:'passed',zero,inward,tangent,staticOctahedron:{measured:measured.A,expected},imbalancedCanonicalPair:negative.A};
  console.log(JSON.stringify({kind:'controls',...result}));
  return result;
}
const mode=process.argv[2]??'controls';
const controlReceipt=controls();
if(mode==='target'){
  const N=Number(process.argv[3]??96),output=process.argv[4];
  assert.ok(Number.isInteger(N)&&N>=8&&N<=4096);assert.ok(output);
  const start=performance.now(),cases=[];
  for(const beta of [.25,.75])for(const phases of [[0,0,0],[0,.3,-.4],[0,Math.PI/3,2*Math.PI/3],[0,.6,.6],[0,-.3,.4]]){
    const paths=[0,1,2].flatMap(k=>[path(k,1,beta,phases[k]),path(k,-1,beta,phases[k])]);
    const rows=[];let minPresentSeparation=Infinity,minRootDistance=Infinity,minDt=Infinity,maxRootResidual=0,maxSymmetrySpread=0;
    for(let k=0;k<N;k++){
      const theta=2*Math.PI*k/N,T=theta/beta,event=[];
      for(let i=0;i<6;i++){
        const state=paths[i].at(T),calc=acceleration(paths,i,T),s=support(state,calc.A);
        for(let j=i+1;j<6;j++)minPresentSeparation=Math.min(minPresentSeparation,norm(sub(state.x,paths[j].at(T).x)));
        for(const r of calc.roots){minRootDistance=Math.min(minRootDistance,r.distance);minDt=Math.min(minDt,r.Dt);maxRootResidual=Math.max(maxRootResidual,Math.abs(r.residual));}
        event.push(s);rows.push({theta,i,x:state.x,v:state.v,A:calc.A,...s,...(k===0?{roots:calc.roots}:{})});
      }
      for(const name of ['lambda','mu'])maxSymmetrySpread=Math.max(maxSymmetrySpread,Math.max(...event.map(r=>r[name]))-Math.min(...event.map(r=>r[name])));
    }
    const stats=name=>({min:Math.min(...rows.map(r=>r[name])),max:Math.max(...rows.map(r=>r[name])),mean:rows.reduce((sum,r)=>sum+r[name],0)/rows.length,rms:Math.sqrt(rows.reduce((sum,r)=>sum+r[name]**2,0)/rows.length)});
    const memberMean=Array.from({length:6},(_,i)=>rows.filter(r=>r.i===i).reduce((s,r)=>s+r.speedDerivative,0)/N);
    const summary={beta,relativePhases:phases,phases:N,memberMean,period:2*Math.PI/beta,partnerRootsPerEvent:30,selfRootsPerEvent:0,minPresentSeparation,minRootDistance,minDt,maxRootResidual,maxSymmetrySpread,lambda:stats('lambda'),mu:stats('mu'),side:stats('side'),residualNorm:stats('residualNorm')};
    console.log(JSON.stringify({kind:'target-summary',...summary}));cases.push({summary,rows});
  }
  const result={schema:'spherical-three-three-shifted-subfield/v1',cf:1,R:1,Kint:1,controls:controlReceipt,cases,wallSeconds:(performance.now()-start)/1000,memory:process.memoryUsage()};
  writeFileSync(output,JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({kind:'resource',wallSeconds:result.wallSeconds,memory:result.memory,output}));
}else assert.equal(mode,'controls');
