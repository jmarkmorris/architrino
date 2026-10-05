// Re-encode a fixed comparison curve from quarter-step integrated shared jets.
// No physical-history/law change or exact-solution assertion.
import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {Q,hermite,jetBox} from './maxwell-shaped-overnight-exact-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function selected(knots){const indices=[];for(let j=0;j<knots.length;j+=4)indices.push(j);if(indices.at(-1)!==knots.length-1)indices.push(knots.length-1);return {indices,knots:indices.map(j=>knots[j])};}
export function known(){
 const power=(t,n)=>{let z=Q.of(1);for(let j=0;j<n;j++)z=z.mul(t);return z;},curve=t=>({t,x:[power(t,5),0],v:[power(t,4).mul(5),0],a:[power(t,3).mul(20),0]}),knots=Array.from({length:12},(_,j)=>curve(Q.of(j))),s=selected(knots);assert(s.indices.join(',')==='0,4,8,11');
 for(let j=0;j<s.knots.length-1;j++){const segment=hermite(s.knots[j],s.knots[j+1]),mid=Q.of(s.knots[j].t).add(s.knots[j+1].t).div(2);for(const [order,expected]of[[0,power(mid,5)],[1,power(mid,4).mul(5)],[2,power(mid,3).mul(20)],[3,power(mid,2).mul(60)],[4,mid.mul(120)]]){const z=jetBox(segment,mid,mid,order)[0];assert(z.lo.cmp(expected)===0&&z.hi.cmp(expected)===0);}}
 assert(selected(knots.slice(0,9)).indices.join(',')==='0,4,8');return {passed:true,cases:['fixed-stride4 and final short cell','exact quintic X/V/A shared-jet re-encoding and all jets0..4','no duplicate final face']};
}
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
if(!args.input){console.log(JSON.stringify({knownFirst:known()},null,2));process.exit(0);}
const knownFirst=known();assert(args.out&&!fs.existsSync(args.out)&&sha(args.input)==='52d394ddf627c6823a72a702e0b307752807f591ede7f87685aae99ca339c367','frozen immutable fine source');const data=JSON.parse(fs.readFileSync(args.input)),s=selected(data.knots),out={specification:data.specification,knots:s.knots};assert(data.specification.K===1&&data.specification.cf===1&&data.specification.beta===.3);fs.writeFileSync(args.out,JSON.stringify(out),{flag:'wx'});const receipt={knownFirst,input:args.input,inputSHA:sha(args.input),output:args.out,outputSHA:sha(args.out),sourceSHA:sha(new URL(import.meta.url)),retainedInputIndices:s.indices,knots:out.knots.length,stride:4,completeNumericalPastIdentical:true,grade:'new analytical comparison representation of the same quarter-step integrated states; no actual-solution tube; own complete continuum defect required'};fs.writeFileSync(args.out+'.receipt.json',JSON.stringify(receipt,null,2),{flag:'wx'});console.log(JSON.stringify({...receipt,retainedInputIndices:undefined}));
