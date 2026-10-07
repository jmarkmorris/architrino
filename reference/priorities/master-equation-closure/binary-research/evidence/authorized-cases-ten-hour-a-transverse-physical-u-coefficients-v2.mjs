// Subject exact-rational interval derivatives on the physical-u comparison path.
// No root/support construction, endpoint transfer, or numerical target is admitted here.
import assert from 'node:assert/strict';
import {Q,G,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {physicalDirection} from './maxwell-shaped-overnight-unit-frame-clock-angular.mjs';
const N=5;
class Dual {
 constructor(v,d=Array.from({length:N},()=>new G(0))){this.v=G.of(v);this.d=d;}
 static of(x){return x instanceof Dual?x:new Dual(x);}
 add(x){x=Dual.of(x);return new Dual(this.v.add(x.v),this.d.map((a,k)=>a.add(x.d[k])));}
 neg(){return new Dual(this.v.neg(),this.d.map(a=>a.neg()));}
 sub(x){return this.add(Dual.of(x).neg());}
 mul(x){x=Dual.of(x);return new Dual(this.v.mul(x.v),this.d.map((a,k)=>a.mul(x.v).add(this.v.mul(x.d[k]))));}
 div(x){x=Dual.of(x);return new Dual(this.v.div(x.v),this.d.map((a,k)=>a.mul(x.v).sub(this.v.mul(x.d[k])).div(x.v.sq())));}
 sq(){return this.mul(this);}
}
const cross=(a,b)=>G.of(a[0]).mul(b[1]).sub(G.of(a[1]).mul(b[0]));
export function frame(r,v,a,u,clockV){
 assert(clockV,'explicit prescribed clock velocity required');
 assert([r,v,a,u,clockV].every(z=>z.length===2));
 const radius=length(r),n=physicalDirection(r),coords=[radius,dot(n,v),cross(n,v),dot(n,u),cross(n,u)],xs=coords.map((x,k)=>new Dual(x,Array.from({length:N},(_,j)=>new G(j===k?1:0)))),[R,vn,vt,un,ut]=xs,D=new Dual(1).add(vn),w=new Dual(1).sub(un);
 assert(radius.lo.cmp(0)>0&&D.v.lo.cmp(0)>0&&w.v.lo.cmp(0)>0,'positive complete transverse R/D/w chart');
 const qt=vt.div(R.mul(D).mul(w)),gamma=w.div(D),eta=ut.add(gamma.mul(vt)).div(R),alpha=new Dual(1).sub(vn.sq()).sub(vt.sq()),h=alpha.div(R.sq().mul(D.sq())),q=[new Dual(0),qt],P=[un,ut.add(qt)],deltaQ=[new Dual(-1).div(R),qt.mul(un)],H=[h.neg().sub(qt.mul(eta)),h.mul(vt).div(D).neg().sub(qt.mul(h).div(w)).sub(vn.mul(eta).div(R.mul(D).mul(w))).sub(qt.mul(vt).mul(eta).div(D)).add(qt.mul(ut).mul(eta).div(w)).sub(qt.mul(new Dual(1).sub(gamma)).div(R))],an=dot(n,a),at=cross(n,a);
 function coefficients(f){
  const FR=f.map(z=>z.d[0]),Fv=f.map(z=>z.d.slice(1,3)),Fu=f.map(z=>z.d.slice(3,5));
  // Ftheta holds Cartesian v/u fixed as the ray rotates counterclockwise.
  const theta=f.map((z,k)=>z.d[1].mul(vt.v).sub(z.d[2].mul(vn.v)).add(z.d[3].mul(ut.v)).sub(z.d[4].mul(un.v)).add(k===0?f[1].v.neg():f[0].v));
  // Prescribed clock may differ from interpolated field velocity.
  // ds=-n.dx/Dclock, dR=-ds, dtheta=(t.dx+clockVt ds)/R.
  const clockN=dot(n,clockV),clockT=cross(n,clockV),clockD=new G(1).add(clockN);assert(clockD.lo.cmp(0)>0,'positive prescribed clock denominator');
  const colN=FR.map((z,k)=>z.sub(dot(Fv[k],[an,at])).sub(clockT.mul(theta[k]).div(radius)).div(clockD)),colT=theta.map(z=>z.div(radius));
  return {F:f.map(z=>z.v),FR,Fv,Fu,Ftheta:theta,AX:[[colN[0],colT[0]],[colN[1],colT[1]]]};
 }
 return {R:radius,D:D.v,w:w.v,n,components:Object.fromEntries(['R','vn','vt','un','ut'].map((k,j)=>[k,coords[j]])),q:coefficients(q),P:coefficients(P),deltaQ:coefficients(deltaQ),H:coefficients(H),physicalSourceAccelerationUsed:'prescribed acceleration only in nominal-clock spatial derivative; physical reconstruction remains separate'};
}
export function known(){
 const near=(x,y)=>{assert(x.lo.cmp(y)<=0&&x.hi.cmp(y)>=0,'analytically known rational enclosed');assert(x.hi.sub(x.lo).cmp('1/1000000000000000000')<0,'point control must be narrow');};
 const matrix=(a,b)=>a.forEach((r,i)=>r.forEach((x,j)=>near(x,b[i][j])));
 const s=frame([2,0],[0,0],[0,0],['1/3','2/5'],[0,0]);s.q.F.forEach(x=>near(x,0));matrix(s.P.Fu,[[1,0],[0,1]]);matrix(s.H.Fu,[[0,0],[0,0]]);matrix(s.H.AX,[['1/4',0],[0,'-1/8']]);near(s.deltaQ.F[0],'-1/2');near(s.deltaQ.F[1],0);
 const z=frame([2,0],['1/5','3/10'],[0,0],['1/4','7/30'],['1/5','3/10']);near(z.q.F[1],'1/6');near(z.P.F[1],'2/5');near(z.H.F[0],'-67/360');near(z.H.F[1],'-8023/64800');matrix(z.q.Fu,[[0,0],['2/9',0]]);matrix(z.P.Fu,[[1,0],['2/9',1]]);near(z.H.Fu[0][0],'-7/270');near(z.H.Fu[0][1],'-1/12');near(z.deltaQ.F[0],'-1/2');near(z.deltaQ.F[1],'1/24');matrix(z.deltaQ.Fu,[[0,0],['2/9',0]]);
 // The nilpotent algebra is checked on a fixed ray at two physical velocities.
 const z2=frame([2,0],['1/5','3/10'],[0,0],['1/2','1/5'],['1/5','3/10']);near(z2.q.Fu[1][0],'1/2');const av=z.q.Fu.map((r,i)=>r.map((x,j)=>x.add(z2.q.Fu[i][j]).div(2)));matrix(av.map(r=>[dot(r,[av[0][0],av[1][0]]),dot(r,[av[0][1],av[1][1]])]),[[0,0],[0,0]]);
 const t=frame([0,2],['-3/10','1/5'],[0,0],['-7/30','1/4'],['-3/10','1/5']);for(const field of ['q','P','deltaQ','H'])for(let k=0;k<2;k++)assert(t[field].F[k].lo.cmp(z[field].F[k].hi)<=0&&z[field].F[k].lo.cmp(t[field].F[k].hi)<=0);
 const shifted=frame([2,0],['1/5','3/10'],[0,0],['1/4','7/30'],[0,0]);near(shifted.q.AX[0][0],0);near(shifted.q.AX[1][0],'-1/12');
 assert.throws(()=>frame([2,0],[0,0],[0,0],[0,0]),/explicit/);assert.throws(()=>frame([2,0],[-1,0],[0,0],[0,0],[0,0]),/positive/);assert.throws(()=>frame([2,0],[0,0],[0,0],[1,0],[0,0]),/positive/);assert.throws(()=>frame([2,0],[0,0],[0,0],[0,0],[-1,0]),/positive/);
 return {passed:true,cases:['stationary source with nonzero u: q0, p_u identity, H_u0, H_x diag(1/4,-1/8)','rational physical-u q_t1/6, p_t2/5, H(-67/360,-8023/64800)','q_u [[0,0],[2/9,0]], radial H_u(-7/270,-1/12)','correction difference(-1/2,1/24) and its exact u derivatives','fixed-ray average derivative square zero','quarter-turn covariance','differing field velocity and stationary clock: radial q derivative(0,-1/12)','missing clock/D0/w0/clockD0 reject']};
}
if(process.argv.includes('--known-only'))console.log(JSON.stringify(known(),null,2));
