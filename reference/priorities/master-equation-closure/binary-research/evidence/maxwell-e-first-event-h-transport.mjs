// Intrinsic radius/radial velocity/scalar h comparison, no targets in this helper.
// Signed centrifugal coefficient retained before norm. K=c_f=1 in applications.
import assert from 'node:assert/strict';
import {Q,G,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
const positive=x=>{x=Q.of(x);assert(x.cmp(0)>0);return x;},nonnegative=x=>{x=Q.of(x);assert(x.cmp(0)>=0);return x;};
const mv=(A,v)=>A.map(row=>dot(row,v)),perp=v=>[G.of(v[1]).neg(),G.of(v[0])];
const row=(direction,A)=>A[0].map((_,j)=>dot(direction,A.map(r=>r[j])));
export const cross=(a,b)=>G.of(a[0]).mul(b[1]).sub(G.of(a[1]).mul(b[0]));
export function projections(c,currentDirection,sourceDirection){
 const radial=currentDirection.map(G.of),tangent=perp(radial),current=mv(c.clock.AX,radial),source=mv(c.clock.AX,sourceDirection);
 return {PhiR:dot(radial,current),PhiT:dot(tangent,current),CsR:dot(radial,source).absUpper(),CsT:dot(tangent,source).absUpper(),CrPosition:normUpper(row(radial,c.clock.AX)),CtPosition:normUpper(row(tangent,c.clock.AX)),Hr:normUpper(row(radial,c.offset.Fv)),Ht:normUpper(row(tangent,c.offset.Fv)),Br:normUpper(row(radial,c.offset.Fa)),Bt:normUpper(row(tangent,c.offset.Fa))};
}
export function coefficients(PhiR,PhiT,rcInterval,hcInterval,trialR,trialH,comparisonAt){
 const rc=G.of(rcInterval),hc=G.of(hcInterval),er=nonnegative(trialR),eh=nonnegative(trialH),radius=new G(rc.lo.sub(er),rc.hi.add(er));assert(radius.lo.cmp(0)>0);
 const ha=hc.add(new G(eh.neg(),eh)),centrifugal=ha.sq().mul(-3).div(radius.sq().sq()),kappa=G.of(PhiR).add(centrifugal),Ch=ha.add(hc).absUpper().div(rc.lo.mul(rc.lo).mul(rc.lo)),Lh=radius.hi.mul(G.of(PhiT).absUpper()).add(G.of(comparisonAt).absUpper());
 return {kappa,centrifugal,Ch,Lh,rPlus:radius.hi,rMinus:radius.lo,hActual:ha};
}
export function mu(kappa,nu){nu=positive(nu);return new G(nu).add(G.of(kappa).div(nu)).absUpper().div(2);}
export function convert(Z,H,nu,raMin,rcMin,rcMax,hcMax){
 Z=nonnegative(Z);H=nonnegative(H);nu=positive(nu);raMin=positive(raMin);rcMin=positive(rcMin);rcMax=positive(rcMax);hcMax=nonnegative(hcMax);
 const r=Z.div(nu),ur=Z,ut=H.div(raMin).add(hcMax.mul(r).div(raMin.mul(rcMin))),u=length([new G(ur),new G(ut)]).hi,raPlus=rcMax.add(r),omega=H.div(raMin.mul(raMin)).add(hcMax.mul(r).mul(raPlus.add(rcMax)).div(raMin.mul(raMin).mul(rcMin).mul(rcMin)));
 return {r,ur,ut,u,omega};
}
export function initialH(rcMax,vcMax,eX,eV){return nonnegative(rcMax).mul(nonnegative(eV)).add(nonnegative(vcMax).mul(nonnegative(eX))).add(Q.of(eX).mul(eV));}
export function metric(Z,previousNu,newNu){Z=nonnegative(Z);previousNu=positive(previousNu);newNu=positive(newNu);const factor=newNu.cmp(previousNu)>0?newNu.div(previousNu):Q.of(1);return Z.mul(factor);}
export function flow(Z,H,M,Ch,LhOverNu,Fr,Fh,dt){
 [Z,H,M,Ch,LhOverNu,Fr,Fh,dt]=[Z,H,M,Ch,LhOverNu,Fr,Fh,dt].map(nonnegative);const denominator=Q.of(1).sub(dt.mul(M)).sub(dt.mul(dt).mul(Ch).mul(LhOverNu));assert(denominator.cmp(0)>0,'positive whole-cell H-flow inverse');
 const wz=Z.add(dt.mul(Fr)),wh=H.add(dt.mul(Fh)),z=wz.add(dt.mul(Ch).mul(wh)).div(denominator),h=wh.add(dt.mul(LhOverNu).mul(z));return {Z:z,H:h,denominator};
}
export function componentForcing(delta,positionNorm,sourceColumn,Hv,B,sourceR,sourceU,sourceA,nominalR,nominalV,nominalA,psi){
 [delta,positionNorm,sourceColumn,Hv,B,sourceR,sourceU,sourceA,nominalR,nominalV,nominalA,psi]=[delta,positionNorm,sourceColumn,Hv,B,sourceR,sourceU,sourceA,nominalR,nominalV,nominalA,psi].map(nonnegative);
 const sourceRadial=sourceColumn.add(positionNorm.mul(psi));return {sourceRadial,forcing:delta.add(sourceRadial.mul(sourceR)).add(positionNorm.mul(nominalR).mul(psi)).add(Hv.mul(sourceU.add(nominalV.mul(psi)))).add(B.mul(sourceA.add(nominalA.mul(psi))))};
}
export function known(){
 const box=A=>A.map(r=>r.map(G.of)),c={clock:{AX:box([['.25',0],[0,'-.125']])},offset:{Fv:box([[1,0],[0,2]]),Fa:box([[0,0],[0,'.5']])}},p=projections(c,[1,0],[0,1]);assert(p.PhiR.lo.cmp('.25')<=0&&p.PhiR.hi.cmp('.25')>=0&&p.PhiT.absUpper().cmp('0.000000000001')<0&&p.CsR.cmp('0.000000000001')<0&&p.CsT.cmp('.125')>=0&&p.Br.cmp('0.000000000001')<0&&p.Bt.cmp('.5')>=0);
 const k=coefficients('.25',0,2,1,0,0,0);assert(k.kappa.lo.cmp('1/16')<=0&&k.kappa.hi.cmp('1/16')>=0);assert(mu(new G('-.25'),'.5').cmp('0.000000000001')<0,'exact signed harmonic squared-norm cancellation');
 const cent=coefficients(0,0,2,2,1,0,0);assert(cent.centrifugal.lo.cmp('-19/54')<=0&&cent.centrifugal.hi.cmp('-19/54')>=0,'exact centrifugal mean-value quotient between2and3 at fixedh2');
 const t=convert('.5',1,'.5',2,3,3,2);assert(t.ut.cmp('5/6')===0);const exactOmega=Q.of('19/36');assert(t.omega.cmp(exactOmega)>=0);
 assert(initialH(2,'.3','.1','.2').cmp('.45')===0&&metric(2,1,3).cmp(6)===0&&metric(2,3,1).cmp(2)===0);
 const zero=flow(1,2,0,0,0,0,0,1);assert(zero.Z.cmp(1)===0&&zero.H.cmp(2)===0);
 const polynomial=flow(2,3,0,2,0,4,6,'1/2');assert(polynomial.Z.cmp('17/2')>=0&&polynomial.H.cmp(6)===0,'exact polynomial Z2+10t+6t² at t1/2');
 const eigen=flow(1,1,1,2,3,0,0,'1/10');assert(eigen.Z.cmp('10/7')===0&&eigen.H.cmp('10/7')===0);assert.throws(()=>flow(1,1,1,2,3,0,0,1),/positive/);assert.throws(()=>coefficients(0,0,1,1,1,0,0));
 return {passed:true,cases:['static signed radial/tangential/full sourceV/A projections','signed centrifugal physical radius coefficient','harmonic squared-norm cancellation','exact centrifugal difference quotient','source h-to-tangential/omega conversion','bilinear initial h bound and metric jumps','zero/polynomial/eigenmode directed2x2 flow','inverse and radius domain rejection'],polynomialUpper:{Z:polynomial.Z.toString(),H:polynomial.H.toString()}};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(known(),null,2));
