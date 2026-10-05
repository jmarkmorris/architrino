// Mechanical exact closed-partition join, retaining every immutable shard source.
import assert from 'node:assert/strict';
import fs from 'node:fs';import crypto from 'node:crypto';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
export function join(parts,start,end){
 start=Q.of(start);end=Q.of(end);assert(parts.length&&start.cmp(end)<0);
 const identity=parts[0].result;let next=start;const rows=[];
 for(const {result,spec,data} of parts){
  assert(result.input===identity.input&&result.inputSHA===identity.inputSHA&&result.law===identity.law,'same complete source history and equation');
  assert(JSON.stringify(result.sourceHashes)===JSON.stringify(identity.sourceHashes),'same frozen producer context');
  assert(spec.input===result.input&&spec.inputSHA===result.inputSHA&&spec.law===result.law&&spec.knownFirst.passed,'known-first same-input producer specification');
  assert(result.firstFailure===null&&Q.of(result.start).cmp(next)===0&&Q.of(result.lastCompleted).cmp(result.end)===0&&data.length===result.cells&&data.length,'closed successful shard');
  for(const row of data){assert(Q.of(row.left).cmp(next)===0&&Q.of(row.right).cmp(next)>0&&Q.of(row.bound).cmp(0)>=0,'complete exact defect partition');assert(Q.of(row.R.lo).cmp(0)>0&&Q.of(row.D.lo).cmp(0)>0,'retained nominal ordinary root margins');assert(Q.of(row.source.lo).cmp(row.source.hi)<=0&&Q.of(row.source.hi).cmp(row.left)<0,'retained completed nominal source interval');rows.push(row);next=Q.of(row.right);}
  assert(next.cmp(result.end)===0,'no missing shard tail');
 }
 assert(next.cmp(end)===0,'exact covered endpoint');return rows;
}
export function known(){
 const make=(a,b)=>{const result={input:'known',inputSHA:'literal',law:'E',sourceHashes:{known:'fixed'},start:a,end:b,lastCompleted:b,firstFailure:null,cells:1},spec={...result,knownFirst:{passed:true}},data=[{left:a,right:b,bound:'1/10',R:{lo:1},D:{lo:1},source:{lo:-3,hi:-2}}];return {result,spec,data};};
 const a=make('0','1/2'),b=make('1/2','1');assert(join([a,b],0,1).length===2);
 for(const mutate of [x=>x.result.law='full',x=>x.result.inputSHA='other',x=>x.result.sourceHashes.known='other',x=>x.result.firstFailure={message:'failure'},x=>x.data[0].left='3/5',x=>x.data[0].source.hi=1]){const c=structuredClone(b);mutate(c);assert.throws(()=>join([a,c],0,1));}
 assert.throws(()=>join([a],0,1));return {passed:true,cases:['two exact touching closed cells','different law/history/context rejected','failed shard rejected','gap rejected','uncompleted source rejected','missing endpoint rejected']};
}
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
if(!args.parts){console.log(JSON.stringify({knownFirst:known()},null,2));process.exit(0);}
const knownFirst=known();assert(args.out&&!fs.existsSync(args.out)&&!fs.existsSync(args.out+'.jsonl'));
const files=args.parts.split(','),parts=files.map(p=>({result:JSON.parse(fs.readFileSync(p)),spec:JSON.parse(fs.readFileSync(p+'.specification.json')),data:fs.readFileSync(p+'.jsonl','utf8').trim().split('\n').map(JSON.parse)})),rows=join(parts,args.start,args.end),source=parts[0].result;assert(source.inputSHA===sha(source.input));
const sources=files.map(p=>({receipt:p,receiptSHA:sha(p),specification:p+'.specification.json',specificationSHA:sha(p+'.specification.json'),rows:p+'.jsonl',rowsSHA:sha(p+'.jsonl')})),spec={input:source.input,inputSHA:source.inputSHA,law:source.law,start:Q.of(args.start).toString(),end:Q.of(args.end).toString(),knownFirst,sourceHashes:source.sourceHashes,shards:sources,joinerSHA:sha(new URL(import.meta.url)),grade:'same-complete-history exact nominal defect partition join only; subject producer mathematics separately assessed'};
fs.writeFileSync(args.out+'.specification.json',JSON.stringify(spec,null,2),{flag:'wx'});fs.writeFileSync(args.out+'.jsonl',rows.map(x=>JSON.stringify(x)).join('\n')+'\n',{flag:'wx'});const result={...spec,cells:rows.length,rowsSHA:sha(args.out+'.jsonl'),firstFailure:null,lastCompleted:spec.end};fs.writeFileSync(args.out,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify(result));
