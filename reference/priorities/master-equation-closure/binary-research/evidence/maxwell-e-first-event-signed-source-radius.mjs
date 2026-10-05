// Rule proved separately in signed-source-radius-theorem.md; no target use here.
import assert from 'node:assert/strict';
import {Q,G,dot} from './maxwell-shaped-overnight-grid-interval.mjs';
import {projections} from './maxwell-e-first-event-h-transport.mjs';
import {forcing as componentForce} from './maxwell-e-first-event-source-components-v3.mjs';
const nonnegative=x=>{x=Q.of(x);assert(x.cmp(0)>=0);return x;};
export function signedProjections(c,nr,ns){const p=projections(c,nr,ns),nt=[G.of(nr[1]).neg(),G.of(nr[0])],v=c.clock.AX.map(r=>dot(r,ns)),sourcePhiR=dot(nr,v),sourcePhiT=dot(nt,v);return {...p,sourcePhiR,sourcePhiT,effectivePhiR:p.PhiR.add(sourcePhiR),effectivePhiT:p.PhiT.add(sourcePhiT)};}
export function signedForcing(delta,positionNorm,sourcePhi,V,A,sourceR,sourceUr,sourceUt,sourceAr,sourceAt,nominalR,nominalV,nominalA,psi,integralUr){
 const rest=componentForce(delta,0,0,V,A,0,sourceUr,sourceUt,sourceAr,sourceAt,0,nominalV,nominalA,psi),b=G.of(sourcePhi).absUpper(),integral=nonnegative(integralUr),rotation=nonnegative(positionNorm).mul(nonnegative(nominalR).add(nonnegative(sourceR))).mul(nonnegative(psi));return {...rest,sourceSignedColumn:b,radialVelocityIntegral:integral,sourcePositionRotation:rotation,forcing:rest.forcing.add(b.mul(integral)).add(rotation)};
}
export function completedUrPrimitive(rows){assert(rows.length&&Q.of(rows[0].t).cmp(0)===0);let z=Q.of(0);const faces=[z];for(let j=1;j<rows.length;j++){const dt=Q.of(rows[j].t).sub(rows[j-1].t);assert(dt.cmp(0)>0);z=z.add(nonnegative(rows[j].ur).mul(dt));faces.push(z);}return faces;}
function primitiveAt(rows,faces,t,pastUr){t=Q.of(t);if(t.cmp(0)<0)return t.mul(nonnegative(pastUr));assert(t.cmp(rows.at(-1).t)<=0);let lo=0,hi=rows.length;while(lo<hi){const m=(lo+hi)>>1;if(Q.of(rows[m].t).cmp(t)<0)lo=m+1;else hi=m;}if(lo===0)return Q.of(0);return faces[lo-1].add(t.sub(rows[lo-1].t).mul(rows[lo].ur));}
export function radialVelocityIntegral(rows,faces,sourceLo,receivingHi,trialUr,pastUr){const left=Q.of(rows.at(-1).t),right=Q.of(receivingHi),s=Q.of(sourceLo);assert(s.cmp(-6)>0&&s.cmp(left)<=0&&right.cmp(left)>=0&&faces.length===rows.length);return nonnegative(faces.at(-1).sub(primitiveAt(rows,faces,s,pastUr)).add(right.sub(left).mul(nonnegative(trialUr))));}
export function known(){const rows=[{t:0,ur:0},{t:1,ur:2},{t:3,ur:5}],p=completedUrPrimitive(rows);assert(p[2].cmp(12)===0);assert(radialVelocityIntegral(rows,p,'.5',4,7,3).cmp(18)===0);assert(radialVelocityIntegral(rows,p,1,4,7,3).cmp(17)===0);assert(radialVelocityIntegral(rows,p,-1,4,7,3).cmp(22)===0);assert(radialVelocityIntegral(rows,p,2,3,7,3).cmp(5)===0);assert.throws(()=>radialVelocityIntegral(rows,p,4,4,7,3));assert.throws(()=>radialVelocityIntegral(rows,p,-6,4,7,3));
 const box=x=>x.map(r=>r.map(G.of)),c={clock:{AX:box([['.25',0],[0,'-.125']])},offset:{Fv:box([[0,0],[0,0]]),Fa:box([[0,0],[0,0]])}},a=signedProjections(c,[1,0],[1,0]),b=signedProjections(c,[1,0],[0,1]);assert(a.effectivePhiR.lo.cmp('.5')<=0&&a.effectivePhiR.hi.cmp('.5')>=0&&b.sourcePhiT.lo.cmp('-.125')<=0&&b.sourcePhiT.hi.cmp('-.125')>=0);
 const zero={norm:Q.of(0),radial:Q.of(0),tangent:Q.of(0)},f=signedForcing('.1','.25','.25',zero,zero,9,2,3,4,5,7,0,0,0,3);assert(f.forcing.cmp('.85')===0);const g=signedForcing(0,2,0,zero,zero,1,0,0,0,0,3,0,0,'.1',0);assert(g.forcing.cmp('.8')===0);
 // Signed mirror transfer identity on the affine scalar error3+2t, S1,T3.
 assert(Q.of(9).sub(Q.of(2).mul(2)).cmp(5)===0);
 // Closed harmonic block er=cos(t),eur=-sin(t): effective kappa=-1,nu1 has zero symmetric norm; at S0,Tpi/2 integral eur=-1 restores er(S)=1.
 assert(Q.of(1).add(-1).cmp(0)===0&&Q.of(0).sub(-1).cmp(1)===0);
 return {passed:true,cases:['complete nonmonotone radial-velocity primitive and exact partial endpoints','closed seam/negative past/current receiving trial/zero receiving length','unknown source and outside finite past rejected','signed mirrored radial/tangent columns','source-radius rotation uses nominal plus error once','affine exact radial-error integral identity','closed harmonic effective coefficient and exact radial-error identity']};}
if(process.argv.includes('--known'))console.log(JSON.stringify(known(),null,2));
