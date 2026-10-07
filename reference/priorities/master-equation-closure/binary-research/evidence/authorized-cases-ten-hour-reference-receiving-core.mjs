// Independent checkpoint audit: old Hermite-Horner oracle, new elementary q derivatives.
import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';
import {norm,add,expand,dot,Q,G} from './authorized-cases-ten-hour-reference-checkpoint-core.mjs';
import {ExactHistory as History,known as historyKnown} from './authorized-cases-ten-hour-reference-checkpoint-bernstein.mjs';
const q=Q.of,g=x=>x&&typeof x==='object'&&'lo'in x?new G(x.lo,x.hi):G.of(x),vec=x=>x.map(g),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const min=(a,b)=>q(a).cmp(b)<0?q(a):q(b),max=(a,b)=>q(a).cmp(b)>0?q(a):q(b),zero=new G(0),cross=(a,b)=>g(a[0]).mul(b[1]).sub(g(a[1]).mul(b[0]));
function unit(r){r=vec(r);assert(norm(r).lo.cmp(0)>0);const points=[];for(const x of [r[0].lo,r[0].hi])for(const y of [r[1].lo,r[1].hi])points.push([x,y]);for(let i=0;i<2;i++)if(r[i].lo.cmp(0)<=0&&r[i].hi.cmp(0)>=0)for(const x of [r[1-i].lo,r[1-i].hi])points.push(i===0?[q(0),x]:[x,q(0)]);const values=points.map(p=>{const L=norm(p);return p.map(x=>new G(x).div(L));});return [0,1].map(i=>new G(max(-1,values.reduce((s,p)=>min(s,p[i].lo),q(1))),min(1,values.reduce((s,p)=>max(s,p[i].hi),q(-1)))));}
function qCoefficients(ray,v,a,u,clock){
 const R=norm(ray),n=unit(ray),vn=dot(n,v),vt=cross(n,v),un=dot(n,u),ut=cross(n,u),D=new G(1).add(vn),w=new G(1).sub(un),cn=dot(n,clock),ct=cross(n,clock),Dc=new G(1).add(cn),an=dot(n,a),at=cross(n,a);assert([R,D,w,Dc].every(x=>x.lo.cmp(0)>0));
 const qt=vt.div(R.mul(D).mul(w)),FR=[zero,qt.div(R).neg()],Fv=[[zero,zero],[qt.div(D).neg(),new G(1).div(R.mul(D).mul(w))]],Fu=[[zero,zero],[qt.div(w),zero]],angle=[qt.neg(),qt.mul(vt).div(D).neg().sub(vn.div(R.mul(D).mul(w))).add(qt.mul(ut).div(w))];
 const normal=FR.map((x,k)=>x.sub(dot(Fv[k],[an,at])).sub(ct.mul(angle[k]).div(R)).div(Dc)),AX=normal.map((x,k)=>[x,angle[k].div(R)]);
 return {R,n,D,w,Dc,vt,FR,Fv,Fu,angle,AX};
}
function inventory(rows,P,past){const values={x:q(0),v:q(0),a:q(0)},bins=[];if(P.lo.cmp(0)<=0)for(const k of Object.keys(values))values[k]=max(past[k],rows[0][k]);for(let j=1;j<rows.length;j++)if(q(rows[j].t).cmp(P.lo)>=0&&q(rows[j-1].t).cmp(P.hi)<=0){bins.push(j);for(const k of Object.keys(values))values[k]=max(values[k],rows[j][k]);}return {...values,bins};}
const exact=(a,b,msg)=>assert(q(a).cmp(b)===0,msg??(`exact comparison ${q(a)} != ${q(b)}`)),atMost=(a,b,msg)=>assert(q(a).cmp(b)<=0,msg),contains=(x,value)=>assert(x.lo.cmp(value)<=0&&x.hi.cmp(value)>=0);
const normSquare=v=>v.reduce((z,x)=>{const a=g(x).absUpper();return z.add(a.mul(a));},q(0)),boundNorm=(v,b,msg)=>atMost(normSquare(v),q(b).mul(b),msg);
function known(){boundNorm([3,4],5);assert.throws(()=>boundNorm([3,4],'499/100'));const rationalTime=new G('1/3');contains(rationalTime,'1/3');assert(rationalTime.lo.cmp('1/3')<0&&rationalTime.hi.cmp('1/3')>0);const h=historyKnown();const n=unit([3,4]);contains(n[0],'3/5');contains(n[1],'4/5');const ax=unit([new G(-3,3),4]);contains(ax[0],'-3/5');contains(ax[0],'3/5');contains(ax[1],1);const c=qCoefficients([2,0],['1/5','3/10'],[0,0],['1/4','7/30'],[0,0]);contains(c.AX[1][0],'-1/12');contains(c.Fu[1][0],'2/9');assert.throws(()=>qCoefficients([2,0],[0,0],[0,0],[1,0],[0,0]));const i=inventory([{t:0,x:0,v:0,a:0},{t:1,x:7,v:1,a:2},{t:2,x:2,v:3,a:1}],new G(1),{x:0,v:0,a:0});assert(i.bins.join(',')==='1,2');exact(i.x,7);exact(i.v,3);exact(i.a,2);return {passed:true,history:h,cases:['independent corner/axis unit direction','exact simplified q derivative with differing clock','invalid w rejected','closed source seam nonmonotone inventory']};}

export {q,g,vec,sha,min,max,zero,cross,unit,qCoefficients,inventory,exact,atMost,contains,normSquare,boundNorm,known,History,norm,add,expand,dot,Q,G};
