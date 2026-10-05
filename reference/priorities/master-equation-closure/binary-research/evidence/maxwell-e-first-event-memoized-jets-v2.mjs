// Pure-value memoization only. Frozen exact arithmetic/oracle remain immutable.
import assert from 'node:assert/strict';
import {Q,G,sin,cos} from './maxwell-shaped-overnight-grid-interval.mjs';
import {jetBox as exactJetBox,hermite} from './maxwell-shaped-overnight-exact-interval.mjs';
export function deepFreeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){for(const v of Object.values(value))deepFreeze(v);Object.freeze(value);}return value;}
const polynomialCaches=new WeakMap();
let hits=0,misses=0;
const remember=(cache,k,v)=>{deepFreeze(v);cache.set(k,v);if(cache.size>128)cache.delete(cache.keys().next().value);return v;};
export function jetBox(segment,lo,hi,n){
 deepFreeze(segment);let cache=polynomialCaches.get(segment);if(!cache){cache=new Map();polynomialCaches.set(segment,cache);}
 const key=n+':'+Q.of(lo).toString()+':'+Q.of(hi).toString();
 const old=cache.get(key);if(old){hits++;return old;}misses++;return remember(cache,key,exactJetBox(segment,lo,hi,n));
}
export const memoStats=()=>({hits,misses,maximumKeysPerSegment:128});
export function memoCircle(history,T,n){
 deepFreeze(history.referenceParameters);T=G.of(T);const cache=history.memoAngles??(history.memoAngles=new Map()),key=T.lo.toString()+':'+T.hi.toString();
 let angle=cache.get(key);if(!angle){const w=new G(history.referenceParameters.omega).mul(T);angle=remember(cache,key,{c:cos(w),s:sin(w)});}
 const {r,omega,beta}=history.referenceParameters,{c,s}=angle;
 if(n===0)return [new G(r).mul(c),new G(r).mul(s)];
 if(n===1)return [new G(beta).mul(s).neg(),new G(beta).mul(c)];
 if(n===2)return [new G(beta.mul(omega)).mul(c).neg(),new G(beta.mul(omega)).mul(s).neg()];
 assert(n===3);return [new G(beta.mul(omega).mul(omega)).mul(s),new G(beta.mul(omega).mul(omega)).mul(c).neg()];
}
export function memoBox(history,T,n,uncached){
 T=G.of(T);const cache=history.memoBoxes??(history.memoBoxes=new Map()),key=n+':'+T.lo.toString()+':'+T.hi.toString();
 const old=cache.get(key);return old??remember(cache,key,uncached(T,n));
}
export function memoKnown(){
 const curve=t=>({t,x:[Q.of(t).mul(t).div(2),0],v:[t,0],a:[1,0]}),s=hermite(curve(0),curve(1));
 const a=jetBox(s,0,1,1),b=jetBox(s,0,1,1),c=jetBox(s,0,'.5',1),d=jetBox(s,0,1,2);
 assert(a===b&&a[0].lo.cmp(0)===0&&a[0].hi.cmp(1)===0&&c[0].hi.cmp('.5')===0&&d[0].lo.cmp(1)===0);
 const other=hermite({t:0,x:[0,0],v:[2,0],a:[0,0]},{t:1,x:[2,0],v:[2,0],a:[0,0]});assert(jetBox(other,0,1,1)[0].lo.cmp(2)===0);
 const history={referenceParameters:{r:Q.of(2),omega:Q.of('.1'),beta:Q.of('.2')}},expected=[[2,0],[0,'.2'],['-.02',0],[0,'-.002']];
 for(let n=0;n<4;n++)for(let j=0;j<2;j++){const z=memoCircle(history,0,n)[j];assert(z.lo.cmp(expected[n][j])<=0&&z.hi.cmp(expected[n][j])>=0);}
 const z=memoBox(history,new G(0),4,()=>[new G('.0002'),new G(0)]);assert(memoBox(history,0,4,()=>{throw Error('cache miss');})===z);
 assert(Object.isFrozen(a)&&Object.isFrozen(a[0])&&Object.isFrozen(a[0].lo)&&Object.isFrozen(s)&&Object.isFrozen(s.coeff[0]));
 return {passed:true,immutableCachedValues:true,cases:['closed quadratic jets','exact derivative-order and closed-face keys','distinct segment identity','four analytical circle jets','same fourth-box identity'],stats:memoStats()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(memoKnown()));
