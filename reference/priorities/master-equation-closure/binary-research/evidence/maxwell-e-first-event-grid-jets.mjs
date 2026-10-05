// Outward fixed-grid Bernstein restriction of exact derivative coefficients.
// Independent oracle and original exact jetBox remain immutable.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {derivative,hermite} from './maxwell-shaped-overnight-exact-interval.mjs';
import {deepFreeze} from './maxwell-e-first-event-memoized-jets-v2.mjs';
const derivatives=new WeakMap(),boxes=new WeakMap();
const choose=(n,k)=>{let z=1n;for(let j=1;j<=k;j++)z=z*BigInt(n+1-j)/BigInt(j);return new Q(z);};
const power=(x,n)=>{let z=new G(1);for(let j=0;j<n;j++)z=z.mul(x);return z;};
const hull=(a,b)=>new G(a.lo.cmp(b.lo)<0?a.lo:b.lo,a.hi.cmp(b.hi)>0?a.hi:b.hi);
export function jetBox(segment,lo,hi,order){
 deepFreeze(segment);lo=Q.of(lo);hi=Q.of(hi);assert(lo.cmp(hi)<=0&&Number.isInteger(order)&&order>=0&&order<=4);
 let cached=boxes.get(segment);if(!cached){cached=new Map();boxes.set(segment,cached);}const key=order+':'+lo.toString()+':'+hi.toString();if(cached.has(key))return cached.get(key);
 let ds=derivatives.get(segment);if(!ds){ds=new Map();derivatives.set(segment,ds);}let dc=ds.get(order);if(!dc){dc=deepFreeze(segment.coeff.map(c=>derivative(c,order,segment.h)));ds.set(order,dc);}
 const a=new G(lo.sub(segment.t0).div(segment.h)),b=new G(hi.sub(segment.t0).div(segment.h)),w=b.sub(a);
 const out=dc.map(c=>{const degree=c.length-1,restricted=c.map((_,j)=>c.slice(j).reduce((z,x,k)=>z.add(new G(x).mul(choose(k+j,j)).mul(power(a,k))),new G(0)).mul(power(w,j))),bernstein=restricted.map((_,j)=>restricted.slice(0,j+1).reduce((z,x,k)=>z.add(x.mul(choose(j,k)).div(choose(degree,k))),new G(0)));return bernstein.reduce(hull);});
 deepFreeze(out);cached.set(key,out);if(cached.size>128)cached.delete(cached.keys().next().value);return out;
}
export function historyBox(history,T,n){
 T=G.of(T);assert(T.hi.cmp(history.knots.at(-1).t)<=0);if(T.hi.cmp(0)<=0)return history.pastBox(T,n);
 let out=T.lo.cmp(0)<0?history.pastBox(new G(T.lo,0),n):null,lo=T.lo.cmp(0)>0?T.lo:Q.of(0),j=history.index(lo);
 for(;j<history.knots.length-1;j++){const left=Q.of(history.knots[j].t),right=Q.of(history.knots[j+1].t);if(left.cmp(T.hi)>0)break;const a=left.cmp(lo)>0?left:lo,b=right.cmp(T.hi)<0?right:T.hi;if(a.cmp(b)>0)continue;const z=jetBox(history.segment(j),a,b,n).map(G.of);out=out?out.map((x,k)=>hull(x,z[k])):z;if(right.cmp(T.hi)>=0)break;}
 assert(out);return out;
}
const encloses=(z,x)=>assert(z.lo.cmp(x)<=0&&z.hi.cmp(x)>=0);
export function gridJetsKnown(){
 const curve=t=>({t,x:[Q.of(t).mul(t).div(2),0],v:[t,0],a:[1,0]}),s=hermite(curve(0),curve(1));
 const v=jetBox(s,'1/3','2/3',1);encloses(v[0],'1/3');encloses(v[0],'2/3');assert(v[0].hi.sub(v[0].lo).cmp('.333333333334')<0);
 encloses(jetBox(s,0,1,2)[0],1);encloses(jetBox(s,0,1,3)[0],0);encloses(jetBox(s,0,1,4)[0],0);assert(jetBox(s,'1/3','2/3',1)===v&&Object.isFrozen(v));
 const p=t=>({t,x:[Q.of(t).mul(t).mul(t).mul(t),0],v:[Q.of(t).mul(t).mul(t).mul(4),0],a:[Q.of(t).mul(t).mul(12),0]}),q=hermite(p(0),p(1));encloses(jetBox(q,'1/3','2/3',4)[0],24);encloses(jetBox(q,'1/3','2/3',3)[0],8);encloses(jetBox(q,'1/3','2/3',3)[0],16);
 const r=hermite({t:0,x:[2,0],v:[-2,0],a:[0,0]},{t:1,x:[0,0],v:[-2,0],a:[0,0]});encloses(jetBox(r,0,1,0)[0],0);encloses(jetBox(r,0,1,0)[0],2);encloses(jetBox(r,0,1,1)[0],-2);
 return {passed:true,cases:['exact non-grid quadratic velocity endpoints','constant second/zero third/fourth jets','quartic fourth24 and third8..16','negative affine derivative and full closed endpoints','immutable cache identity'],nonGridVelocity:v.map(x=>x.out())};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(gridJetsKnown()));
