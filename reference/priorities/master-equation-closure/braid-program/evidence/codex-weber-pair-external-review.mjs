// Independent Codex diagnostic: uses the frozen, separately authored reference law.
// K=cf=1; opposite-polarity pair only; target mode reads retained states without evolution.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {solveAccelerations, lawResidual} from '../../binary-research/evidence/weber-frequency-reference-law.mjs';
const dot=(a,b)=>a.reduce((s,x,k)=>s+x*b[k],0);
const sub=(a,b)=>a.map((x,k)=>x-b[k]);
const mul=(a,s)=>a.map(x=>x*s);
const norm=a=>Math.hypot(...a);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function pair(st,A,i,j){
  assert(st.q[i]*st.q[j]===-1, "opposite-polarity diagnostic only");
  const rv=sub(st.X[i],st.X[j]),w=sub(st.V[i],st.V[j]),a=sub(A[i],A[j]);
  const r=norm(rv), e=mul(rv,1/r), u=dot(e,w), h=cross(rv,w), C=dot(rv,w);
  const rdd=dot(e,a)+(dot(w,w)-u*u)/r;
  const mutual=mul(e,st.q[i]*st.q[j]*(1-u*u/2+r*rdd)/(r*r));
  const f=sub(a,mul(mutual,2));
  const eps=dot(w,w)/2+C*C/(r*r*r)-2/r;
  const epsdot=dot(w,a)+2*C*(dot(w,w)+dot(rv,a))/(r**3)-3*C*C*u/(r**4)+2*u/(r*r);
  return {r,eps,h:norm(h),f,energyRate:dot(w,f),angularRate:cross(rv,f),energyIdentityResidual:Math.abs(epsdot-dot(w,f)),angularIdentityResidual:norm(sub(cross(rv,a),cross(rv,f)))};
}
function known(){
  let error=0;
  for(const rho of [.25,1,3]){
    const omega=Math.sqrt(1/(4*rho**3));
    const st={X:[[rho,0,0],[-rho,0,0]],V:[[0,omega*rho,0],[0,-omega*rho,0]],q:[1,-1]};
    const sol=solveAccelerations(st); assert(!sol.singular);
    error=Math.max(error,norm(sub(sol.A[0],[-omega*omega*rho,0,0])));
    const p=pair(st,sol.A,0,1);assert(norm(p.f)<1e-12);assert(Math.abs(p.eps+1/(2*rho))<1e-12);
    assert(p.energyIdentityResidual<1e-12);assert(p.angularIdentityResidual<1e-12);
  }
  assert(error<1e-12);
  console.log(JSON.stringify({mode:'known',passed:true,reference:'analytic isolated circle at rho=.25,1,3; K=cf=1',maxAccelerationError:error}));
}
known();
if(process.argv[2]==='target'){
  const [trajectory,iText,jText,startText,endText]=process.argv.slice(3),i=Number(iText),j=Number(jText),start=Number(startText),end=Number(endText);
  const rows=fs.readFileSync(trajectory,'utf8').trim().split('\n').map(x=>JSON.parse(x)).filter(x=>x.type==='state'&&x.t>=start&&x.t<=end);
  assert(rows.length>1);
  const q=[1,-1,1,-1,1,-1],samples=[];let identity=0,law=0;
  for(const row of rows){
    const st={X:q.map((_,k)=>row.x.slice(3*k,3*k+3)),V:q.map((_,k)=>row.v.slice(3*k,3*k+3)),q};
    const sol=solveAccelerations(st);assert(!sol.singular);
    const p=pair(st,sol.A,i,j);identity=Math.max(identity,p.energyIdentityResidual,p.angularIdentityResidual);law=Math.max(law,lawResidual(st,sol.A));
    let other=Infinity;for(let k=0;k<6;k++)if(k!==i&&k!==j)other=Math.min(other,norm(sub(st.X[k],st.X[i])),norm(sub(st.X[k],st.X[j])));
    samples.push({t:row.t,...p,other});
  }
  let signedEnergy=0,absEnergy=0,absAngular=0,signedAngular=[0,0,0];
  for(let k=1;k<samples.length;k++){
    const a=samples[k-1],b=samples[k],dt=b.t-a.t;
    signedEnergy+=dt*(a.energyRate+b.energyRate)/2;
    absEnergy+=dt*(Math.abs(a.energyRate)+Math.abs(b.energyRate))/2;
    absAngular+=dt*(norm(a.angularRate)+norm(b.angularRate))/2;
    signedAngular=signedAngular.map((x,l)=>x+dt*(a.angularRate[l]+b.angularRate[l])/2);
  }
  const a=samples[0],b=samples.at(-1);
  console.log(JSON.stringify({mode:'target',trajectory,pair:[i,j],requestedWindow:[start,end],sampleWindow:[a.t,b.t],samples:samples.length,epsStart:a.eps,epsEnd:b.eps,hStart:a.h,hEnd:b.h,epsMax:Math.max(...samples.map(x=>x.eps)),hMin:Math.min(...samples.map(x=>x.h)),rMin:Math.min(...samples.map(x=>x.r)),rMax:Math.max(...samples.map(x=>x.r)),otherMin:Math.min(...samples.map(x=>x.other)),signedEnergy,absEnergy,absAngular,signedAngular,maxIdentityResidual:identity,maxLawResidual:law,boundary:'sampled states and trapezoid quadrature only; no continuous-window or trajectory-error certificate'}));
}
