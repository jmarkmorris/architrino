// Subject rational ray-frame first derivatives for exact transverse coordinates.
// This module supplies no root family, coordinate transfer, or target admission.
import assert from 'node:assert/strict';
import {Q,G,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {physicalDirection} from './maxwell-shaped-overnight-unit-frame-clock-angular.mjs';
const N=5;
class Dual{
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
export function frame(r,v,a,p){
 assert([r,v,a,p].every(z=>z.length===2));const radius=length(r),n=physicalDirection(r),coords=[radius,dot(n,v),cross(n,v),dot(n,p),cross(n,p)],xs=coords.map((x,k)=>new Dual(x,Array.from({length:N},(_,j)=>new G(j===k?1:0)))),[R,vn,vt,pn,pt]=xs,D=new Dual(1).add(vn),w=new Dual(1).sub(pn);
 assert(radius.lo.cmp(0)>0&&D.v.lo.cmp(0)>0&&w.v.lo.cmp(0)>0,'positive complete transverse R/D/w chart');
 const qt=vt.div(R.mul(D).mul(w)),un=pn,ut=pt.sub(qt),gamma=w.div(D),eta=ut.add(gamma.mul(vt)).div(R),alpha=new Dual(1).sub(vn.sq()).sub(vt.sq()),h=alpha.div(R.sq().mul(D.sq())),q=[new Dual(0),qt],U=[un,ut],H=[h.neg().sub(qt.mul(eta)),h.mul(vt).div(D).neg().sub(qt.mul(h).div(w)).sub(vn.mul(eta).div(R.mul(D).mul(w))).sub(qt.mul(vt).mul(eta).div(D)).add(qt.mul(ut).mul(eta).div(w)).sub(qt.mul(new Dual(1).sub(gamma)).div(R))],an=dot(n,a),at=cross(n,a);
 function coefficients(f){
  const FR=f.map(z=>z.d[0]),Fv=f.map(z=>z.d.slice(1,3)),Fp=f.map(z=>z.d.slice(3,5));
  const theta=f.map((z,k)=>z.d[1].mul(vt.v).sub(z.d[2].mul(vn.v)).add(z.d[3].mul(pt.v)).sub(z.d[4].mul(pn.v)).add(k===0?f[1].v.neg():f[0].v));
  const colN=FR.map((z,k)=>z.sub(dot(Fv[k],[an,at])).sub(vt.v.mul(theta[k]).div(radius)).div(D.v)),colT=theta.map(z=>z.div(radius));
  return {F:f.map(z=>z.v),FR,Fv,Fp,Ftheta:theta,AX:[[colN[0],colT[0]],[colN[1],colT[1]]]};
 }
 return {R:radius,D:D.v,w:w.v,n,components:Object.fromEntries(['R','vn','vt','pn','pt'].map((k,j)=>[k,coords[j]])),q:coefficients(q),U:coefficients(U),H:coefficients(H),physicalSourceAccelerationUsed:'prescribed acceleration only in nominal-clock spatial derivative; physical reconstruction remains separate'};
}
export function known(){
 const contains=(x,y)=>assert(x.lo.cmp(y)<=0&&x.hi.cmp(y)>=0,'analytically known rational enclosed');
 const near=(x,y)=>{contains(x,y);assert(x.hi.sub(x.lo).cmp('1/1000000000000000000')<0,'point control must be narrow');};
 const matrix=(a,b)=>a.forEach((r,i)=>r.forEach((x,j)=>near(x,b[i][j])));
 const s=frame([2,0],[0,0],[0,0],['1/3','2/5']);s.q.F.forEach(x=>near(x,0));matrix(s.U.Fp,[[1,0],[0,1]]);matrix(s.H.Fp,[[0,0],[0,0]]);matrix(s.H.AX,[['1/4',0],[0,'-1/8']]);matrix(s.U.AX,[[0,0],[0,0]]);
 const z=frame([2,0],['1/5','3/10'],[0,0],['1/4','2/5']);near(z.q.F[1],'1/6');near(z.U.F[1],'7/30');near(z.H.F[0],'-67/360');near(z.H.F[1],'-8023/64800');matrix(z.U.Fp,[[1,0],['-2/9',1]]);near(z.H.Fp[0][0],'-1/135');near(z.H.Fp[0][1],'-1/12');
 // Quarter-turn covariance is an exact geometric control of the ray assembly.
 const t=frame([0,2],['-3/10','1/5'],[0,0],['-2/5','1/4']);for(const field of ['q','U','H'])for(let k=0;k<2;k++)assert(t[field].F[k].lo.cmp(z[field].F[k].hi)<=0&&z[field].F[k].lo.cmp(t[field].F[k].hi)<=0);
 assert.throws(()=>frame([2,0],[-1,0],[0,0],[0,0]),/positive/);assert.throws(()=>frame([2,0],[0,0],[0,0],[1,0]),/positive/);
 return {passed:true,cases:['stationary source at nonzero p: q0, U_p identity, H_p0, H_x diag(1/4,-1/8)','rational moving-source q_t1/6, u_t7/30, H(-67/360,-8023/64800)','rational inverse matrix [[1,0],[-2/9,1]] and H radial p derivatives(-1/135,-1/12)','exact quarter-turn covariance of ray components','zero D and zero w rejected']};
}
if(process.argv.includes('--known-only'))console.log(JSON.stringify(known(),null,2));
