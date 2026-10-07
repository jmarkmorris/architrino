// Slow-motion expansion check for proposal P1 (extrapolated line of action). c_f = 1, K = 1.
// Evaluates prefactors on PRESCRIBED histories only; no trajectory is evolved under P1.
// Run: node reference/priorities/master-equation-closure/binary-research/evidence/weber-delayed-p1-expansion-check.mjs
const add=(a,b)=>a.map((x,i)=>x+b[i]), sub=(a,b)=>a.map((x,i)=>x-b[i]), mul=(a,s)=>a.map(x=>x*s);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0), norm=a=>Math.sqrt(dot(a,a)), unit=a=>mul(a,1/norm(a));
const perp=(a,e)=>sub(a,mul(e,dot(a,e)));
function root(X,x,T,span){ const g=S=>norm(sub(x,X(S)))-(T-S); let lo=T-span, hi=T;
  for(let k=0;k<300;k++){const m=(lo+hi)/2; if(g(m)>0) hi=m; else lo=m;} return (lo+hi)/2; }
// rows on one ordinary root: canonical K n/(R^2 D) and P1 K ntilde/(R^2 D), unit positive polarity product
function rows(src,x,T,span){ const S=root(src.X,x,T,span), d=sub(x,src.X(S)), R=norm(d), n=mul(d,1/R), w=src.V(S), D=1-dot(n,w);
  const nt=unit(sub(n,w)); return {R,n,D,nt,canon:mul(n,1/(R*R*D)),p1:mul(nt,1/(R*R*D))}; }
const f=(z,d=6)=>(z>=0?'+':'')+z.toFixed(d);
// generic smooth prescribed source with speed scale eps: X(S) = F(eps S); velocity ~ eps, acceleration ~ eps^2, jerk ~ eps^3
const F =s=>[0.3*Math.sin(s)+0.2*Math.sin(2.1*s+0.4), -1.0+0.25*Math.cos(1.3*s+0.2), 0.15*Math.sin(0.7*s+1.1)];
const F1=s=>[0.3*Math.cos(s)+0.42*Math.cos(2.1*s+0.4), -0.325*Math.sin(1.3*s+0.2), 0.105*Math.cos(0.7*s+1.1)];
const F2=s=>[-0.3*Math.sin(s)-0.882*Math.sin(2.1*s+0.4), -0.4225*Math.cos(1.3*s+0.2), -0.0735*Math.sin(0.7*s+1.1)];
const F3=s=>[-0.3*Math.cos(s)-1.8522*Math.cos(2.1*s+0.4), 0.54925*Math.sin(1.3*s+0.2), -0.05145*Math.cos(0.7*s+1.1)];
const generic=eps=>({X:S=>F(eps*S),V:S=>mul(F1(eps*S),eps),A:S=>mul(F2(eps*S),eps*eps),J:S=>mul(F3(eps*S),eps**3)});
const xr=[0.9,0.6,0.35];
function generalCase(eps){ const src=generic(eps), T=0, q=sub(xr,src.X(T)), r=norm(q), e=mul(q,1/r), v=src.V(T), a=src.A(T), j=src.J(T), u=dot(e,v);
  const g=rows(src,xr,T,50);
  const canonFirst=mul(add(e,sub(v,mul(e,2*u))),1/(r*r));            // (1/r^2)[e + v - 2(e.v)e]
  const p1First=mul(e,(1-u)/(r*r));                                  // (1/r^2)(1 - e.v) e
  const ntPerpPred=sub(mul(perp(a,e),0.5*r*(1+2*u)),mul(perp(j,e),r*r/3));
  return {eps, canonRem:norm(sub(g.canon,canonFirst)), p1Rem:norm(sub(g.p1,p1First)), p1PerpAtFirstOrder:norm(perp(g.p1,e)), ntPerpRem:norm(sub(perp(g.nt,e),ntPerpPred)), ntPerp:norm(perp(g.nt,e))}; }
// mirror circle, opposite polarity; receiver at R0 e_r moving +beta e_theta
function circle(beta){ const R0=1, w=beta, src={X:S=>[-Math.cos(w*S),-Math.sin(w*S),0],V:S=>[w*Math.sin(w*S),-w*Math.cos(w*S),0]}; const g=rows(src,[R0,0,0],0,50);
  return {canonT:-g.canon[1], p1T:-g.p1[1], ntT:g.nt[1], p1R:-g.p1[0]}; }
// mirror Kepler pair: relative orbit with mu = 2K, semi-major A, eccentricity ec; partner at -r/2
function kepler(A,ec,phaseM){ const K=1, mu=2*K, nmean=Math.sqrt(mu/A**3), b=A*Math.sqrt(1-ec*ec);
  const rel=t=>{ const M=nmean*t+phaseM; let E=M; for(let k=0;k<60;k++) E-= (E-ec*Math.sin(E)-M)/(1-ec*Math.cos(E));
    const pos=[A*(Math.cos(E)-ec), b*Math.sin(E), 0], Ed=nmean/(1-ec*Math.cos(E)), vel=[-A*Math.sin(E)*Ed, b*Math.cos(E)*Ed, 0]; return {pos,vel}; };
  const src={X:S=>mul(rel(S).pos,-0.5),V:S=>mul(rel(S).vel,-0.5)}, now=rel(0), r=norm(now.pos), e=mul(now.pos,1/r), th=[-e[1],e[0],0];
  const h=now.pos[0]*now.vel[1]-now.pos[1]*now.vel[0], om=h/(r*r), g=rows(src,mul(now.pos,0.5),0,20*A);
  const p1theta=-dot(g.p1,th);                                         // sigma = -1
  return {A,r,om,speed:norm(now.vel)/2, ntTheta:dot(g.nt,th), ntPred:-K*om/3, p1theta, p1Pred:K*K*om/(3*r*r), canonTheta:-dot(g.canon,th), canonPred:K*norm(perp(mul(now.vel,0.5),e))/(r*r)}; }

console.log('=== KNOWN CASES (run before targets) ===');
for(const b of [0.02,0.01]) console.log(`canonical mirror circle beta=${b}: tangential/beta = ${f(circle(b).canonT/b)} (adjudicated leading value 0.25)`);
{ const r1=generalCase(0.02), r2=generalCase(0.01), r3=generalCase(0.005);
  console.log(`canonical first-order formula, remainder under halving eps: ${r1.canonRem.toExponential(3)}, ${r2.canonRem.toExponential(3)}, ${r3.canonRem.toExponential(3)}; ratios ${(r2.canonRem/r1.canonRem).toFixed(4)}, ${(r3.canonRem/r2.canonRem).toFixed(4)} (second order expects 0.25)`); }
{ const k=kepler(800,0.3,1.0); console.log(`canonical first-order forward push on a Kepler mirror pair (A=800): measured ${k.canonTheta.toExponential(6)}, formula K|v_perp|/r^2 = ${k.canonPred.toExponential(6)}, ratio ${(k.canonTheta/k.canonPred).toFixed(5)}`); }
console.log('=== TARGET 1: P1 on a generic prescribed history ===');
{ const rs=[0.04,0.02,0.01,0.005].map(generalCase);
  for(const r of rs) console.log(`eps=${r.eps}: |P1 - (1-e.v)e/r^2| = ${r.p1Rem.toExponential(3)}; |P1 transverse| = ${r.p1PerpAtFirstOrder.toExponential(3)}; |ntilde_perp| = ${r.ntPerp.toExponential(3)}; |ntilde_perp - prediction| = ${r.ntPerpRem.toExponential(3)}`);
  for(let i=1;i<rs.length;i++) console.log(`halving ${rs[i-1].eps}->${rs[i].eps}: P1 remainder ratio ${(rs[i].p1Rem/rs[i-1].p1Rem).toFixed(4)} (expect 0.25); transverse ratio ${(rs[i].p1PerpAtFirstOrder/rs[i-1].p1PerpAtFirstOrder).toFixed(4)} (expect 0.25: no first-order transverse term); prediction-remainder ratio ${(rs[i].ntPerpRem/rs[i-1].ntPerpRem).toFixed(4)} (expect 0.0625)`); }
console.log('=== TARGET 2: P1 on the mirror circle ===');
for(const b of [0.01,0.02,0.05,0.1]){ const c=circle(b); console.log(`beta=${b}: ntilde_theta/beta^3 = ${f(c.ntT/b**3)} (predict -4/3); P1 tangential/beta^3 = ${f(c.p1T/b**3)} (predict +1/3); canonical tangential/beta = ${f(c.canonT/b)}`); }
{ let minv=Infinity, at=0; for(let i=1;i<1000;i++){ const b=i/1000, v=circle(b).p1T; if(v<minv){minv=v;at=b;} } console.log(`P1 tangential residual on 0.001..0.999 (step 0.001): minimum ${minv.toExponential(3)} at beta=${at} (positive everywhere iff minimum > 0)`); }
for(const b of [0.3,0.6,0.9]){ const c=circle(b); console.log(`beta=${b}: P1 tangential ${f(c.p1T)}, P1 radial ${f(c.p1R)} (outward +), canonical tangential ${f(c.canonT)}`); }
console.log('=== TARGET 3: P1 on Kepler mirror pairs (eccentricity 0.3) ===');
for(const A of [200,800,3200]) for(const ph of [0.4,2.0,4.5]){ const k=kepler(A,0.3,ph);
  console.log(`A=${A} M0=${ph}: member speed ${k.speed.toFixed(4)}; ntilde_theta/(-K omega/3) = ${(k.ntTheta/k.ntPred).toFixed(5)}; P1 tangential/(K^2 omega/(3 r^2)) = ${(k.p1theta/k.p1Pred).toFixed(5)}`); }
