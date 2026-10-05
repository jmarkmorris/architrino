// Research comparison instrument only. Sections 7/8, K=c_f=1.
// Uses complete supplied past and no boundary response. Never an EOM solver.
import assert from 'node:assert/strict';
export const add=(x,y)=>x.map((v,k)=>v+y[k]);
export const sub=(x,y)=>x.map((v,k)=>v-y[k]);
export const mul=(x,s)=>x.map(v=>v*s);
export const dot=(x,y)=>x.reduce((s,v,k)=>s+v*y[k],0);
export const norm=x=>Math.sqrt(dot(x,x));
export const zero=()=>[0,0];
const choose=(n,k)=>{let z=1;for(let j=1;j<=k;j++)z*= (n+1-j)/j;return z;};

// Quintic polynomial matches position, velocity and acceleration at both ends.
// This evaluates A as the actual second derivative of the retained X polynomial.
export function segment(left,right) {
  const h=right.t-left.t;
  assert(h>0);
  const coeff=left.x.map((_,k)=>{
    const c0=left.x[k], c1=h*left.v[k], c2=h*h*left.a[k]/2;
    const d=right.x[k]-c0-c1-c2,e=h*right.v[k]-c1-2*c2,f=h*h*right.a[k]-2*c2;
    return [c0,c1,c2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2];
  });
  const evalDerivative=(u,n)=>coeff.map(c=>{
    let z=0;
    for(let k=5;k>=n;k--){let f=1;for(let j=0;j<n;j++)f*=k-j;z=z*u+c[k]*f;}
    return z/h**n;
  });
  const controls=Array.from({length:5},(_,j)=>coeff.map(c=>{
    let z=0;for(let k=0;k<=j;k++)z+=(k+1)*c[k+1]*choose(j,k)/choose(4,k)/h;return z;
  }));
  return {left,right,coeff,speedBound:Math.max(...controls.map(norm)),
    at:t=>{const u=(t-left.t)/h;assert(u>=-1e-10&&u<=1+1e-10);return {x:evalDerivative(u,0),v:evalDerivative(u,1),a:evalDerivative(u,2)};}};
}

export class History {
  constructor(past,launch){this.past=past;this.knots=[launch];this.segments=[];this.speedBound=past.speedBound;}
  at(t){
    if(t<=0)return this.past.at(t);
    const last=this.knots.at(-1);assert(t<=last.t+1e-11,'uncompleted future history request');
    if(Math.abs(t-last.t)<1e-11)return last;
    let lo=0,hi=this.segments.length-1;
    while(lo<hi){const m=(lo+hi)>>1;if(this.segments[m].right.t<t)lo=m+1;else hi=m;}
    assert(this.segments[lo]);return this.segments[lo].at(t);
  }
  append(knot){const s=segment(this.knots.at(-1),knot);assert(s.speedBound<1,'retained interpolant speed ceiling');this.speedBound=Math.max(this.speedBound,s.speedBound);this.segments.push(s);this.knots.push(knot);return s;}
}

export function geometry(history,x,T,rootTolerance=2e-13) {
  assert(history.speedBound<1);
  const sourceAt=S=>{const p=history.at(S);return {x:mul(p.x,-1),v:mul(p.v,-1),a:mul(p.a,-1)};};
  const gap=S=>norm(sub(x,sourceAt(S).x))-(T-S);
  // The complete past speed margin proves monotonicity; no older root truncation.
  const availableThrough=history.knots?.at(-1).t??T;
  let age=Math.max(norm(x),T-availableThrough+1,1),lo=T-age,hi=Math.min(T,availableThrough);
  assert(gap(hi)>0,'delay not inside completed history');
  while(gap(lo)>=0){age*=2;lo=T-age;assert(age<1e15,'bracketing bound');}
  for(let k=0;k<100&&hi-lo>rootTolerance*Math.max(1,age);k++){
    const m=(lo+hi)/2;if(gap(m)>0)hi=m;else lo=m;
  }
  const S=(lo+hi)/2,p=sourceAt(S),r=sub(x,p.x),R=norm(r),n=mul(r,1/R),D=1-dot(n,p.v);
  assert(R>0&&D>0);
  return {S,R,n,D,v:p.v,a:p.a,rootWidth:hi-lo,rootResidual:gap(S),partnerRoots:1,selfRoots:0};
}

export function responses(g,u){
  const {R,n,D,v,a}=g;
  const E=mul(add(mul(sub(n,v),1-dot(v,v)),mul(sub(mul(sub(n,v),dot(n,a)),mul(a,D)),R)),1/(R*R*D**3));
  const M=sub(mul(n,dot(u,E)),mul(E,dot(u,n)));
  const G=mul(add(sub(mul(n,1-dot(v,v)),mul(v,D)),mul(n,R*dot(n,a))),1/(R*R*D**3));
  return {E,M,full:add(E,M),G,canonical:mul(n,1/(R*R*D))};
}

export function evaluate(history,x,v,t,law,tolerance){
  const g=geometry(history,x,t,tolerance),rows=responses(g,v);
  assert(['E','full','G','canonical'].includes(law));
  return {...g,rows,aNow:mul(rows[law],-1)};
}

export function diagnostic(history,knot,law,tolerance){
  const e=evaluate(history,knot.x,knot.v,knot.t,law,tolerance),r=norm(knot.x),er=mul(knot.x,1/r),et=[-er[1],er[0]],vR=dot(knot.v,er),vT=dot(knot.v,et);
  return {t:knot.t,r,separation:2*r,speed:norm(knot.v),vR,vT,angle:Math.atan2(knot.x[1],knot.x[0]),angularRate:vT/r,aR:dot(e.aNow,er),aT:dot(e.aNow,et),
    S:e.S,delay:knot.t-e.S,R:e.R,D:e.D,sourceAcceleration:e.a,sourceAccelerationNorm:norm(e.a),partnerRoots:1,selfRoots:0,rootResidual:e.rootResidual,rootWidth:e.rootWidth,completeSpeedBound:history.speedBound,
    equationDefect:norm(sub(knot.a,e.aNow)),identicalHistorySpeedDifference:dot(knot.v,e.rows.M),M:mul(e.rows.M,-1)};
}

// Classical RK4 on (X,V); all stages query completed retained history only.
export function step(history,law,h,tolerance=2e-13){
  const p=history.knots.at(-1),t=p.t;
  const rhs=(x,v,T)=>{assert(norm(v)<1,'stage speed boundary');const e=evaluate(history,x,v,T,law,tolerance);assert(e.S<=t-1e-10,'method-of-steps delay exhausted');return {x:v,v:e.aNow};};
  const k1=rhs(p.x,p.v,t),k2=rhs(add(p.x,mul(k1.x,h/2)),add(p.v,mul(k1.v,h/2)),t+h/2),k3=rhs(add(p.x,mul(k2.x,h/2)),add(p.v,mul(k2.v,h/2)),t+h/2),k4=rhs(add(p.x,mul(k3.x,h)),add(p.v,mul(k3.v,h)),t+h);
  const weighted=key=>mul(add(add(k1[key],mul(k2[key],2)),add(mul(k3[key],2),k4[key])),h/6);
  const q={t:t+h,x:add(p.x,weighted('x')),v:add(p.v,weighted('v'))};
  assert(norm(q.v)<1,'endpoint speed boundary');
  q.a=evaluate(history,q.x,q.v,q.t,law,tolerance).aNow;
  history.append(q);return q;
}

export function knownControls(){
  const results=[];
  // Exact quintic curve: tests X,V,A interpolation and velocity enclosure.
  const exact=t=>({t,x:[1+t+.03*t**5,-.2*t**3],v:[1+.15*t**4,-.6*t*t],a:[.6*t**3,-1.2*t]});
  const s=segment(exact(0),exact(.5));let error=0;
  for(let j=0;j<=20;j++){const t=j*.025,p=s.at(t),q=exact(t);for(const key of ['x','v','a'])error=Math.max(error,norm(sub(p[key],q[key])));}
  assert(error<1e-12);results.push({case:'exact quintic interpolation jets',error});
  const stationary={speedBound:0,at:()=>({x:[-2,0],v:zero(),a:zero()})};
  const g=geometry(stationary,[0,0],0),r=responses(g,[.2,.3]);
  assert(Math.abs(g.S+2)<1e-11&&norm(sub(r.E,[-.25,0]))<1e-11&&norm(r.M)<1e-12);
  results.push({case:'stationary partner; E and M',S:g.S,E:r.E,M:r.M});
  // history represents q, source=-q; exact affine present-position formula.
  const b=[.3,.4],x=[1,-.7],affine={speedBound:.5,at:S=>({x:mul(b,-S),v:mul(b,-1),a:zero()})};
  const ga=geometry(affine,x,0),ra=responses(ga,[.2,.3]);
  const L=Math.sqrt((1-dot(b,b))*dot(x,x)+dot(x,b)**2),expected=mul(x,(1-dot(b,b))/L**3),ea=norm(sub(ra.E,expected));
  assert(ea<1e-11);results.push({case:'affine source closed present-position response',error:ea,rootResidual:ga.rootResidual});
  // Complete transverse sinusoidal source: root S=-2 has X=V=0,
  // A=(0,.03), so independent transverse identity is E=(1/4,-.03/2).
  const acc=.03,omega=.4,d=2,accelerated={speedBound:acc/omega,at:S=>({x:[0,-acc/omega**2*(1-Math.cos(omega*(S+d)))],v:[0,-acc/omega*Math.sin(omega*(S+d))],a:[0,-acc*Math.cos(omega*(S+d))]})};
  const gc=geometry(accelerated,[d,0],0),rc=responses(gc,[.2,.3]);
  const ec=norm(sub(rc.E,[.25,-.015]));assert(ec<1e-11);
  // At n=(1,0),v=0, the delayed coefficient maps (a_x,a_y)
  // to (0,-a_y/R), and the receiver map adds (-u_y*a_y/R,u_x*a_y/R).
  assert(norm(sub(rc.M,[-.0045,.003]))<1e-11);
  const accelerationPart=mul(sub(mul(sub(gc.n,gc.v),dot(gc.n,gc.a)),mul(gc.a,gc.D)),1/(gc.R*gc.D**3));
  assert(Math.abs(dot(gc.n,accelerationPart))<1e-14);
  results.push({case:'accelerated transverse source and delayed coefficient; complete sinusoidal history',error:ec,E:rc.E,M:rc.M,S:gc.S,sourceAcceleration:gc.a});
  return results;
}

if(process.argv.includes('--controls-only'))console.log(JSON.stringify({knownControls:knownControls(),passed:true},null,2));
