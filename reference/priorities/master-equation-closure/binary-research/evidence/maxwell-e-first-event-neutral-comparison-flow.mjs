// Whole-cell positive inverse from separately assessed intrinsic p error theorem.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
export function terms(Cq,Vq,CH,UH,VH,AH,Pc,bc,ra,rc,sr,sv,sa,Rs,Vs,As,psi,delta){
 const all=[Cq,Vq,CH,UH,VH,AH,Pc,bc,ra,rc,sr,sv,sa,Rs,Vs,As,psi,delta].map(Q.of);for(const x of all)assert(x.cmp(0)>=0);assert(Q.of(ra).cmp(0)>0&&Q.of(rc).cmp(0)>0);[Cq,Vq,CH,UH,VH,AH,Pc,bc,ra,rc,sr,sv,sa,Rs,Vs,As,psi,delta]=all;
 const sq=sr.add(Rs.mul(psi)),vq=sv.add(Vs.mul(psi)),aq=sa.add(As.mul(psi)),fq=Cq.mul(sq).add(Vq.mul(vq)),fH=delta.add(CH.mul(sq)).add(VH.mul(vq)).add(AH.mul(aq)),L=UH.add(Pc.div(ra));return {fq,fH,L,m00:Cq,m01:Q.of(1),m10:CH.add(L.mul(Cq)).add(Pc.mul(bc).div(ra.mul(rc))),m11:L,f0:fq,f1:fH.add(L.mul(fq))};
}
export function flow(r,p,c,dt){r=Q.of(r);p=Q.of(p);dt=Q.of(dt);const a=Q.of(1).sub(dt.mul(c.m00)),d=Q.of(1).sub(dt.mul(c.m11)),det=a.mul(d).sub(dt.mul(dt).mul(c.m01).mul(c.m10));assert(a.cmp(0)>0&&d.cmp(0)>0&&det.cmp(0)>0,'positive transformed whole-cell inverse');const b0=r.add(dt.mul(c.f0)),b1=p.add(dt.mul(c.f1));return {r:d.mul(b0).add(dt.mul(c.m01).mul(b1)).div(det),p:dt.mul(c.m10).mul(b0).add(a.mul(b1)).div(det),det};}
export function known(){const q=Q.of,c={m00:q(0),m01:q(1),m10:q(0),m11:q(0),f0:q(0),f1:q(0)},z=flow(2,3,c,'1/5');assert(z.r.cmp('13/5')===0&&z.p.cmp(3)===0);const t=terms(1,2,3,4,5,6,2,3,4,5,'1/10','1/5','3/10',7,8,9,'1/100','1/20');assert(t.fq.cmp('73/100')===0&&t.L.cmp('9/2')===0&&t.fH.cmp('43/10')===0);assert.throws(()=>flow(1,1,{...c,m00:q(10)},'1/5'),/positive transformed/);return {passed:true,cases:['exact triangular inverse13/5,3','complete source forcing73/100 and43/10 withL9/2','nonpositive inverse rejected']};}
if(process.argv.includes('--known'))console.log(JSON.stringify(known()));
