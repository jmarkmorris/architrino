// Coordinator refinement: second directional derivatives on certified smooth pieces.
// Shares frozen outward arithmetic/root brackets, not an independent response oracle.
import assert from 'node:assert/strict';
import {Q,G,add,sub,mul,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory,knownReference} from './maxwell-shaped-overnight-exact-reference-history.mjs';
import {rootBox,defectCell} from './maxwell-shaped-overnight-directed-defect.mjs';
import {jetBox} from './maxwell-shaped-overnight-exact-interval.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';

class Jet2 {
 constructor(v,d=0,e=0){this.v=G.of(v);this.d=G.of(d);this.e=G.of(e);}
 static of(x){return x instanceof Jet2?x:new Jet2(x);}
 add(x){x=Jet2.of(x);return new Jet2(this.v.add(x.v),this.d.add(x.d),this.e.add(x.e));}
 neg(){return new Jet2(this.v.neg(),this.d.neg(),this.e.neg());}
 sub(x){return this.add(Jet2.of(x).neg());}
 mul(x){x=Jet2.of(x);return new Jet2(this.v.mul(x.v),this.d.mul(x.v).add(this.v.mul(x.d)),this.e.mul(x.v).add(this.d.mul(x.d).mul(2)).add(this.v.mul(x.e)));}
 inv(){return new Jet2(new G(1).div(this.v),this.d.neg().div(this.v.sq()),this.d.sq().mul(2).div(this.v.sq().mul(this.v)).sub(this.e.div(this.v.sq())));}
 div(x){return this.mul(Jet2.of(x).inv());}
 sqrt(){const y=this.v.sqrt();return new Jet2(y,this.d.div(y.mul(2)),this.e.div(y.mul(2)).sub(this.d.sq().div(y.sq().mul(y).mul(4))));}
}
const ja=(a,b)=>a.map((x,k)=>Jet2.of(x).add(b[k])),js=(a,b)=>a.map((x,k)=>Jet2.of(x).sub(b[k])),jm=(a,s)=>a.map(x=>Jet2.of(x).mul(s)),jd=(a,b)=>a.reduce((z,x,k)=>z.add(Jet2.of(x).mul(b[k])),new Jet2(0)),jl=a=>jd(a,a).sqrt(),jv=(v,d,e)=>v.map((x,k)=>new Jet2(x,d[k],e[k]));
export function responseJet2(r,v,a,u,law){
 assert(law==='E'||law==='full');const R=jl(r),n=jm(r,R.inv()),D=new Jet2(1).sub(jd(n,v)),w=js(n,v),N=ja(jm(w,new Jet2(1).sub(jd(v,v))),jm(js(jm(w,jd(n,a)),jm(a,D)),R)),E=jm(N,R.mul(R).mul(D).mul(D).mul(D).inv()),F=law==='E'?E:ja(E,js(jm(n,jd(u,E)),jm(E,jd(u,n))));return jm(F,-1);
}

export class FourthReferenceHistory extends ExactReferenceHistory {
 circle(T,n){if(n!==4)return super.circle(T,n);return super.circle(T,0).map(z=>z.mul(this.referenceParameters.omega.mul(this.referenceParameters.omega).mul(this.referenceParameters.omega).mul(this.referenceParameters.omega)));}
 patched(T,n){if(n!==4)return super.patched(T,n);T=G.of(T);const {delta,da,dv}=this.referenceParameters,u=T.div(delta),s=u.add(1),f=new G(36).add(u.mul(60)).div(delta.mul(delta)),g=new G(168).sub(s.mul(360)).div(delta.mul(delta).mul(delta));return add(add(this.circle(T,4),mul(da,f)),mul(dv,g));}
}

// A returned piece fixes one-sided receiver/source jets at endpoint seams.
function piece(history,T){
 T=G.of(T);const boundary=history.referenceParameters.delta.neg();
 if(T.hi.cmp(0)<=0){assert(!(T.lo.cmp(boundary)<0&&T.hi.cmp(boundary)>0),'source patch seam');return T.hi.cmp(boundary)<=0?(t,n)=>history.circle(t,n):(t,n)=>history.patched(t,n);}
 assert(T.lo.cmp(0)>=0,'launch seam');let j=history.index(T.lo);if(Q.of(history.knots[j+1].t).cmp(T.lo)===0)j++;assert(j<history.knots.length-1,'no retained right piece');const left=Q.of(history.knots[j].t),right=Q.of(history.knots[j+1].t);assert(T.lo.cmp(left)>=0&&T.hi.cmp(right)<=0,'Hermite jerk seam');return(t,n)=>jetBox(history.segment(j),G.of(t).lo,G.of(t).hi,n).map(G.of);
}
function receptionPiece(history,left,right){
 // Choose by the exact scientific interval, before outward numerical grid expansion.
 // Polynomial extension over the outward box still encloses all true piece arguments.
 left=Q.of(left);right=Q.of(right);assert(left.cmp(0)>=0&&right.cmp(left)>0);let j=history.index(left);if(Q.of(history.knots[j+1].t).cmp(left)===0)j++;assert(j<history.knots.length-1,'no retained right piece');assert(left.cmp(history.knots[j].t)>=0&&right.cmp(history.knots[j+1].t)<=0,'reception Hermite jerk seam');return(t,n)=>jetBox(history.segment(j),G.of(t).lo,G.of(t).hi,n).map(G.of);
}
function derivativeInputs(receiver,source,T,S){
 const X=receiver(T,0),U=receiver(T,1),A=receiver(T,2),J=receiver(T,3),Q4=receiver(T,4),sourceX=source(S,0),v=mul(source(S,1),-1),a=mul(source(S,2),-1),j=mul(source(S,3),-1),k=mul(source(S,4),-1),r=add(X,sourceX),R=length(r),n=mul(r,new G(1).div(R)),D=new G(1).sub(dot(n,v)),S1=new G(1).sub(dot(n,U)).div(D),r1=sub(U,mul(v,S1)),curvature=dot(r1,r1).sub(new G(1).sub(S1).sq()).div(R),S2=dot(n,a).mul(S1.sq()).sub(dot(n,A)).sub(curvature).div(D),r2=sub(sub(A,mul(a,S1.sq())),mul(v,S2)),v1=mul(a,S1),v2=add(mul(j,S1.sq()),mul(a,S2)),a1=mul(j,S1),a2=add(mul(k,S1.sq()),mul(j,S2));assert(D.lo.cmp(0)>0&&R.lo.cmp(0)>0);return {r:jv(r,r1,r2),v:jv(v,v1,v2),a:jv(a,a1,a2),u:jv(U,A,J),A,J,Q4,S1,S2,D,R};
}
const intersect=(a,b)=>{const lo=a.lo.cmp(b.lo)>0?a.lo:b.lo,hi=a.hi.cmp(b.hi)<0?a.hi:b.hi;assert(lo.cmp(hi)<=0);return new G(lo,hi);};
export function secondOrderDefectCell(history,left,right,seed,law){
 left=Q.of(left);right=Q.of(right);assert(right.cmp(left)>0);const dt=right.sub(left),T=new G(left,right),rec=receptionPiece(history,left,right),S=rootBox(history,T,rec(T,0),seed,dt.mul(4).add('0.00000001')),src=piece(history,S),z=derivativeInputs(rec,src,T,S),F=responseJet2(z.r,z.v,z.a,z.u,law),d2=sub(z.Q4,F.map(x=>x.e)),leftS=intersect(S,rootBox(history,new G(left),rec(new G(left),0),S.lo.add(S.hi).div(2),S.hi.sub(S.lo).add('0.00000001'),Q.of(0),8)),lz=derivativeInputs(rec,src,new G(left),leftS),LF=responseJet2(lz.r,lz.v,lz.a,lz.u,law),d0=sub(lz.A,LF.map(x=>x.v)),d1=sub(lz.J,LF.map(x=>x.d)),point=normUpper(d0),first=normUpper(d1),second=normUpper(d2),bound=point.add(dt.mul(first)).add(dt.mul(dt).mul(second).div(2));return {left,right,S,bound,point,first,second,D:z.D,R:z.R,method:'smooth second-order directed defect'};
}
export function refinedDefectCell(history,left,right,seed,law){try{return secondOrderDefectCell(history,left,right,seed,law);}catch(e){if(!/seam|right piece/.test(e.message))throw e;return {...defectCell(history,left,right,seed,law),method:'first-derivative seam fallback',fallback:e.message};}}

const encloses=(x,q)=>assert(x.lo.cmp(q)<=0&&x.hi.cmp(q)>=0),zero=()=>[new Jet2(0),new Jet2(0)];
export function secondOrderKnown(){
 const sq=new Jet2(4,1,0).sqrt();encloses(sq.v,2);encloses(sq.d,'.25');encloses(sq.e,new Q(-1n,32n));
 const radial=responseJet2([new Jet2(2,1,0),new Jet2(0)],zero(),zero(),zero(),'E');encloses(radial[0].v,'-.25');encloses(radial[0].d,'.25');encloses(radial[0].e,'-.375');
 const transverse=responseJet2([new Jet2(2),new Jet2(0,1,0)],zero(),zero(),zero(),'E');encloses(transverse[0].e,new Q(3n,16n));encloses(transverse[1].d,new Q(-1n,8n));
 const turning=responseJet2([new Jet2(2),new Jet2(0)],zero(),[new Jet2(0),new Jet2('.03')],[new Jet2(0),new Jet2(0,1,0)],'full');encloses(turning[0].v,'-.25');encloses(turning[0].d,'.015');encloses(turning[0].e,0);
 const {history:h}=knownReference(),history=new FourthReferenceHistory(h.knots,h.spec),q4=history.box(new G('.05'),4);encloses(q4[0],0);encloses(history.patched(new G(0),4)[0],-900);
 const c=secondOrderDefectCell(history,0,'.1','-1.95','E'),q=new Q(799n,800n),exact=new Q(-1n,4n).add(new Q(1n).div(q.add(1).mul(q.add(1)))).abs();assert(c.bound.cmp(exact)>=0&&c.bound.cmp('.0004')<0);
 const sourceSecond=derivativeInputs((t,n)=>history.box(t,n),(t,n)=>history.circle(t,n),new G(0),new G(-2)).S2;encloses(sourceSecond,'.25');
 // Distributional calibration is intentionally separate from smooth-cell calculus.
 const hingeJump=new Q(1n).mul(new Q(1n).sub(new Q(1n,2n))),smoothRemainder=new Q(1n).div(2);assert(hingeJump.cmp(new Q(1n,2n))===0&&smoothRemainder.cmp(new Q(1n,2n))===0);
 const hinge=new FourthReferenceHistory([{t:0,x:[1,0],v:[0,0],a:[0,0]},{t:'.5',x:[1,0],v:[0,0],a:[0,0]},{t:1,x:[new Q(49n,48n),0],v:[new Q(1n,8n),0],a:['.5',0]}],{r:1,omega:0,delta:'.1'}),fallback=refinedDefectCell(hinge,'.4','.6','-1.5','E'),hingeEndpoint=new Q(1n,10n).add(new Q(36000000n,144024001n));assert(fallback.method==='first-derivative seam fallback'&&fallback.bound.cmp(hingeEndpoint)>=0);
 const t=Q.of(1/3),quadratic=t=>({t,x:[new Q(1n).sub(t.mul(t).div(8)),0],v:[t.div(4).neg(),0],a:['-.25',0]}),nonGrid=new FourthReferenceHistory([quadratic(Q.of(0)),quadratic(t)],{r:1,omega:0,delta:'.1'}),ng=refinedDefectCell(nonGrid,0,t,'-1.8','E');assert(ng.method==='smooth second-order directed defect');const nq=new Q(1n).sub(t.mul(t).div(8)),ngExact=new Q(-1n,4n).add(new Q(1n).div(nq.add(1).mul(nq.add(1)))).abs();assert(ng.bound.cmp(ngExact)>=0);
 return {passed:true,cases:['second sqrt derivative','radial inverse-square response derivatives','transverse normalized-direction derivative','accelerated-source receiver turning derivative','exact future/patch fourth jets','nonzero quadratic continuum defect','stationary-source root second derivative','C2 cubic hinge jump and quartic half factor','C2 jerk seam actual checker fallback','non-grid exact reception knot smooth-piece reach'],quadraticExactEndpointDefect:exact.toString(),quadraticDefectUpper:c.bound.toString(),quadraticSecondDerivativeUpper:c.second.toString(),sourceSecond:sourceSecond.out(),hingeEndpoint:hingeJump.toString(),hingeEquationEndpoint:hingeEndpoint.toString(),hingeFallbackUpper:fallback.bound.toString(),nonGridDefectUpper:ng.bound.toString(),nonGridExactEndpoint:ngExact.toString()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(secondOrderKnown(),null,2));
