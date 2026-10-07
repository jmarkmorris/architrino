// Scalar physical/transformed intersection; complete family hypotheses are external.
import assert from 'node:assert/strict';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
const min=(a,b)=>a.cmp(b)<=0?a:b,max=(a,b)=>a.cmp(b)>=0?a:b;
export function combine(input){
 const names=['X0','V0','W0','h','Cx','sourceX','sourceV','sourceA','Hv','B','delta','E','P','f','nu','bx','bw','bf','trialX','trialV'];const z=Object.fromEntries(names.map(k=>[k,Q.of(input[k])]));assert(names.every(k=>z[k].cmp(0)>=0)&&z.nu.cmp(0)>0,'nonnegative bounds and positive metric');
 const {X0,V0,W0,h,Cx,sourceX,sourceV,sourceA,Hv,B,delta,E,P,f,nu,bx,bw,bf,trialX,trialV}=z,Fa=Cx.mul(sourceX).add(Hv.mul(sourceV)).add(B.mul(sourceA)).add(delta),Wend=E.mul(W0).add(P.mul(f)),Wwhole=max(W0,Wend),Xnorm=Wwhole.div(nu);let X=trialX;const stages=[];
 for(let k=0;k<3;k++){
  const A=Cx.mul(X).add(Fa),XI=X0.add(h.mul(V0)).add(h.mul(h).mul(A).div(2)),VI=V0.add(h.mul(A)),VN=bx.mul(X).add(bw.mul(Wwhole)).add(bf),nextX=min(X,min(XI,Xnorm)),V=min(VI,VN);stages.push({stage:k,assumedX:X,A,XI,VI,VN,Xnorm,X:nextX,V});X=nextX;
 }
 const final=stages.at(-1),A=Cx.mul(final.X).add(Fa),Vphysical=min(V0.add(h.mul(A)),bx.mul(final.X).add(bw.mul(Wwhole)).add(bf));return {...z,Fa,Wend,Wwhole,stages,X:final.X,V:Vphysical,A,strict:{X:final.X.cmp(trialX)<0,V:Vphysical.cmp(trialV)<0},slack:{X:trialX.sub(final.X),V:trialV.sub(Vphysical)},premise:'coefficients and source support depend only on original physical X/V trials, not a W box; scalar E/P are independent outward factors'};
}
export function known(){
 const base={X0:1,V0:2,W0:3,h:'1/10',Cx:0,sourceX:0,sourceV:0,sourceA:0,Hv:0,B:0,delta:3,E:1,P:0,f:0,nu:1,bx:0,bw:1,bf:0,trialX:2,trialV:3},z=combine(base);assert(z.X.cmp('243/200')===0&&z.V.cmp('23/10')===0&&z.A.cmp(3)===0&&z.strict.X&&z.strict.V);
 const a=combine({...base,X0:0,V0:0,W0:4,sourceA:3,B:2,delta:1});assert(a.Fa.cmp(7)===0&&a.V.cmp('7/10')===0&&a.X.cmp('7/200')===0);
 const down=combine({...base,W0:2,E:'3/4',P:'1/4',f:1}),up=combine({...base,W0:1,E:'3/4',P:'1/4',f:2});assert(down.Wend.cmp('7/4')===0&&down.Wwhole.cmp(2)===0&&up.Wend.cmp('5/4')===0&&up.Wwhole.cmp('5/4')===0);
 assert.throws(()=>combine({...base,sourceA:-1}),/nonnegative/);assert(!combine({...base,trialV:'23/10'}).strict.V);
 return {passed:true,cases:['constant acceleration integral XI243/200 VI23/10','original source-A contribution B2*A3 plus residual1 retained exactly','decreasing scalar endpoint7/4 has whole2; increasing endpoint5/4 has whole5/4','negative source-A bound rejected','strict physical velocity equality rejected'],scope:'scalar mathematical controls only; no receiving geometry or physical target'};
}
if(process.argv.includes('--known-cartesian-companion'))console.log(JSON.stringify(known(),null,2));
