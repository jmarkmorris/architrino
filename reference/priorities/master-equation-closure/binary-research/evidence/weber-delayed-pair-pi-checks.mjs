#!/usr/bin/env node
// Principal Investigator's theory-lane checks for the delayed Weber pair investigation (frozen Section 9a, K=c_f=1).
// Not an integrator, not a target run: (1) rigid mirror-circle root census and tangential/radial coefficients vs beta,
// (2) first/second-order expansion of the canonical delayed prefactor and the additive decomposition
//     9a = S9 + (ME - IS) + O(beta^3) on prescribed polynomial histories (kinematic accelerations inserted).
// Usage: node weber-delayed-pair-pi-checks.mjs [census|expansion|all]   (writes weber-delayed-pair-pi-checks.json beside itself)
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1], sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add=(a,b)=>[a[0]+b[0],a[1]+b[1]], mul=(a,s)=>[a[0]*s,a[1]*s], nrm=a=>Math.hypot(a[0],a[1]);

// ---------------- (1) rigid mirror circle, rho=1 units: receiver 1 at (1,0) with velocity (0,beta); X_2=-X_1.
function rootsOf(f,hi,N=200000){const out=[];let a=1e-9,fa=f(a);for(let k=1;k<=N;k++){const b=hi*k/N,fb=f(b);if(fa*fb<0){let lo=a,up=b,flo=fa;for(let it=0;it<100;it++){const c=(lo+up)/2,fc=f(c);if(fc*flo>0){lo=c;flo=fc;}else up=c;}out.push((lo+up)/2);}a=b;fa=fb;}return out;}
export function circleCoefficients(beta){
  const partner=rootsOf(d=>d-2*beta*Math.abs(Math.cos(d/2)),2*beta), self=rootsOf(d=>d-2*beta*Math.abs(Math.sin(d/2)),2*beta).filter(d=>d>1e-6);
  let Cr=0,Ct=0; const rows=[]; const M=[[1,0],[0,1]];
  for(const [list,sig,isSelf] of [[partner,-1,false],[self,1,true]]) for(const d of list){
    const ang=isSelf?-d:Math.PI-d; const ex=[Math.cos(ang),Math.sin(ang)], vx=[-beta*Math.sin(ang),beta*Math.cos(ang)];
    const r=[1-ex[0],-ex[1]], R=nrm(r), n=mul(r,1/R), Dt=1-dot(n,vx);
    if(Math.abs(Dt)<1e-9){rows.push({type:isSelf?'self':'partner',d,R,Dt,nonordinary:true});continue;}
    const w=sig/(R*R*Math.abs(Dt)); Cr+=w*n[0]; Ct+=w*n[1]; rows.push({type:isSelf?'self':'partner',d,R,Dt,cr:w*n[0],ct:w*n[1],n});
  }
  return {beta,nPartner:partner.length,nSelf:self.length,Cr,Ct,rows};
}
function detMAt(beta,rho){const c=circleCoefficients(beta);const M=[[1,0],[0,1]];for(const r of c.rows){if(r.nonordinary)continue;const sig=r.type==='self'?1:-1;const w=sig/(r.R*rho*Math.abs(r.Dt)*r.Dt);for(let i=0;i<2;i++)for(let j=0;j<2;j++)M[i][j]-=w*r.n[i]*r.n[j];}return M[0][0]*M[1][1]-M[0][1]*M[1][0];}
function census(){
  const out={scan:{betaMin:0.02,betaMax:20,step:0.005},censusChanges:[],signChanges:[],balances:[],subfield:{}};
  let prev=null; for(let b=0.02;b<=20.0001;b+=0.005){const c=circleCoefficients(b);
    if(!prev||c.nPartner!==prev.nPartner||c.nSelf!==prev.nSelf) out.censusChanges.push({beta:+b.toFixed(3),nPartner:c.nPartner,nSelf:c.nSelf});
    if(prev&&prev.Ct*c.Ct<0){const same=prev.nPartner===c.nPartner&&prev.nSelf===c.nSelf; out.signChanges.push({between:[+prev.beta.toFixed(3),+b.toFixed(3)],sameCensus:same});
      if(same){let a=prev.beta,bb=b,fa=prev.Ct;for(let k=0;k<60;k++){const m=(a+bb)/2,fm=circleCoefficients(m).Ct;if(fm*fa>0){a=m;fa=fm;}else bb=m;}const z=(a+bb)/2,cz=circleCoefficients(z),rho=-cz.Cr/(z*z);
        out.balances.push({beta:z,Ct:cz.Ct,Cr:cz.Cr,rho,Omega:z/rho,nPartner:cz.nPartner,nSelf:cz.nSelf,minAbsDt:Math.min(...cz.rows.map(r=>Math.abs(r.Dt))),detM:detMAt(z,rho),roots:cz.rows.map(r=>({type:r.type,d:r.d,Dt:r.Dt}))});}}
    prev=c;}
  let minCt=Infinity; for(let b=0.001;b<=1;b+=0.001){const c=circleCoefficients(b); if(c.nPartner!==1||c.nSelf!==0) out.subfield.censusViolation=b; minCt=Math.min(minCt,c.Ct);} 
  out.subfield.minCtOn01=minCt; out.subfield.CtOverBetaAt1e3=circleCoefficients(0.001).Ct/0.001; out.subfield.atBetaOne=(({nPartner,nSelf,Cr,Ct})=>({nPartner,nSelf,Cr,Ct}))(circleCoefficients(1));
  // closed-form check at beta=0.05: d=2b cos(d/2), tangential sin(d/2)/(4 cos^2(d/2) Dt), radial -1/(4 cos(d/2) Dt)
  let d=0.1; for(let k=0;k<100;k++) d=0.1*Math.cos(d/2); const Dt=1+0.05*Math.sin(d/2); const c05=circleCoefficients(0.05);
  out.closedFormBeta005={d, Ct_closed:Math.sin(d/2)/(4*Math.cos(d/2)**2*Dt), Cr_closed:-1/(4*Math.cos(d/2)*Dt), Ct_scan:c05.Ct, Cr_scan:c05.Cr};
  return out;
}
// ---------------- (2) prescribed cubic histories
function poly(X0,V0,A0,J0){return {X:t=>add(add(add(X0,mul(V0,t)),mul(A0,t*t/2)),mul(J0,t*t*t/6)),V:t=>add(add(V0,mul(A0,t)),mul(J0,t*t/2)),A:t=>add(A0,mul(J0,t))};}
function evalLaws(hi,hj,T,K=1,sig=-1){
  const f=S=>nrm(sub(hi.X(T),hj.X(S)))-(T-S); let a=T-50*nrm(sub(hi.X(T),hj.X(T))),b=T-1e-14; for(let k=0;k<300;k++){const c=(a+b)/2;if(f(c)*f(a)>0)a=c;else b=c;} const S=(a+b)/2;
  const rv=sub(hi.X(T),hj.X(S)),R=nrm(rv),n=mul(rv,1/R),Vj=hj.V(S),Vi=hi.V(T),Dt=1-dot(n,Vj),p=(1-dot(n,Vi))/Dt,w=sub(Vi,mul(Vj,p)),wp=sub(w,mul(n,dot(n,w))),Rd=1-p,Rdd=(dot(n,sub(hi.A(T),mul(hj.A(S),p*p)))+dot(wp,wp)/R)/Dt,B=1-Rd*Rd/2+R*Rdd;
  const ME=mul(n,sig*K/(R*R*Math.abs(Dt))),W9a=mul(ME,B);
  const r=sub(hi.X(T),hj.X(T)),rr=nrm(r),e=mul(r,1/rr),wi=sub(Vi,hj.V(T)),rd=dot(e,wi),wip=sub(wi,mul(e,rd)),rdd=dot(e,sub(hi.A(T),hj.A(T)))+dot(wip,wip)/rr,B9=1-rd*rd/2+rr*rdd;
  const IS=mul(e,sig*K/(rr*rr)),S9=mul(IS,B9);
  const vj=hj.V(T),aj=hj.A(T),s=dot(e,vj),vjp=sub(vj,mul(e,s)),ajp=sub(aj,mul(e,dot(e,aj)));
  const P1=mul(sub(vj,mul(e,2*s)),sig*K/(rr*rr)); const P2=mul(add(add(mul(vjp,-s),mul(ajp,-rr/2)),mul(e,-dot(vjp,vjp)/2)),sig*K/(rr*rr));
  return {scale:K/(rr*rr),ME,W9a,IS,S9,P1,P2,B,B9,S,R,Dt,vjp,e};}
function expansion(){
  const base={X1:[1,0],X2:[-1.1,0.3],V1:[0.1,0.9],V2:[-0.7,-0.4],A1:[-0.5,0.2],A2:[0.6,0.3],J1:[0.2,-0.1],J2:[-0.3,0.4]};
  const rows=[];
  for(const beta of [0.05,0.025,0.0125,0.00625]){const rho=1/(4*beta*beta);const sc=(v,p)=>mul(v,p);
    const h1=poly(sc(base.X1,rho),sc(base.V1,beta),sc(base.A1,beta*beta/rho),sc(base.J1,beta**3/rho**2)),h2=poly(sc(base.X2,rho),sc(base.V2,beta),sc(base.A2,beta*beta/rho),sc(base.J2,beta**3/rho**2));
    const E=evalLaws(h1,h2,0);const d1=sub(sub(E.ME,E.IS),E.P1),d2=sub(d1,E.P2),d3=sub(E.W9a,E.ME),d4=sub(sub(E.W9a,E.S9),sub(E.ME,E.IS));
    rows.push({beta,remainderAfterFirstOrder:nrm(d1)/E.scale,remainderAfterSecondOrder:nrm(d2)/E.scale,nineA_minus_ME:nrm(d3)/E.scale,decompositionResidual:nrm(d4)/E.scale,bracket9aMinusOne:E.B-1,bracketS9MinusOne:E.B9-1});}
  // rigid circle transverse push check: receiver 1 transverse part of (ME-IS) vs +K v_{1perp}/r^2 (= -K v_{2perp}/r^2)
  const circ=[];for(const beta of [0.05,0.0125,0.00625]){const rho=1/(4*beta*beta),Om=beta/rho;const X=(j,t)=>{const s=j===0?1:-1;return[s*rho*Math.cos(Om*t),s*rho*Math.sin(Om*t)];},V=(j,t)=>{const s=j===0?1:-1;return[-s*rho*Om*Math.sin(Om*t),s*rho*Om*Math.cos(Om*t)];},A=(j,t)=>{const s=j===0?1:-1;return[-s*rho*Om*Om*Math.cos(Om*t),-s*rho*Om*Om*Math.sin(Om*t)];};
    const h1={X:t=>X(0,t),V:t=>V(0,t),A:t=>A(0,t)},h2={X:t=>X(1,t),V:t=>V(1,t),A:t=>A(1,t)};const E=evalLaws(h1,h2,0.3*rho);const dME=sub(E.ME,E.IS);const v1=h1.V(0.3*rho);const v1p=sub(v1,mul(E.e,dot(E.e,v1)));
    circ.push({beta,transverseOverPredicted:dot(dME,v1p)/(E.scale*dot(v1p,v1p)),bracket9aMinusOne:E.B-1});}
  return {polynomialHistories:rows,rigidCircleTransverse:circ,note:'normalized by K/r^2; prescribed histories with kinematic accelerations inserted; shape fixed, scaled by rho=1/(4 beta^2), beta, beta^2/rho, beta^3/rho^2'};
}
const mode=process.argv[2]??'all';const receipt={utc:new Date().toISOString(),script:'weber-delayed-pair-pi-checks.mjs',grade:'measured double-precision checks of derived formulas on prescribed histories and rigid circles; not an integrator; not an enclosure'};
if(mode==='census'||mode==='all')receipt.census=census(); if(mode==='expansion'||mode==='all')receipt.expansion=expansion();
fs.writeFileSync(path.join(HERE,'weber-delayed-pair-pi-checks.json'),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({censusChanges:receipt.census?.censusChanges,balances:receipt.census?.balances?.map(b=>({beta:b.beta,rho:b.rho,nPartner:b.nPartner,nSelf:b.nSelf,detM:b.detM,minAbsDt:b.minAbsDt})),subfield:receipt.census?.subfield,closedForm:receipt.census?.closedFormBeta005,expansion:receipt.expansion},null,1));
