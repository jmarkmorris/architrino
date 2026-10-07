// Replay retained whole-cell certificates only; no coupled evolution.
import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
import {known,rowDensity,encode} from './authorized-cases-ten-hour-a-joint-phase.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,i,z)=>x.startsWith('--')?[...a,[x.slice(2),z[i+1]]]:a,[]));
const knownFirst=known();
if(!args.receipt){console.log(JSON.stringify(encode({knownFirst,sourceSHA:sha(new URL(import.meta.url)),helperSHA:sha(new URL('./authorized-cases-ten-hour-a-joint-phase.mjs',import.meta.url))}),null,2));process.exit(0);}
assert(args.targetGate==='coordinator-admitted-a-phase-replay-v1','independent proof admission required');
assert(args.out&&!fs.existsSync(args.out)&&!fs.existsSync(args.out+'.jsonl'));
assert(sha(args.receipt)==='854a482aac1b4d063e067be2f3f6585d8ab31f76b0f8384c2c6a0dc8f997147a');
assert(sha(args.receipt+'.jsonl')==='e2450cf4538a47ddd2884bc948ae2cbb50deb4a249716ca9d304743bd413c99c');
const old=JSON.parse(fs.readFileSync(args.receipt)),raw=fs.readFileSync(args.receipt+'.jsonl','utf8').trim().split('\n').map(JSON.parse);
assert(raw.length===15832&&old.bins===raw.length);
const admission={};for(const key of ['recurrence','domain','tangent']){assert(args[key]);const r=JSON.parse(fs.readFileSync(args[key]));assert(r.knownFirst.passed&&r.target.passed&&r.target.subjectSHA===sha(args.receipt)&&r.target.rowsSHA===sha(args.receipt+'.jsonl'));admission[key]={path:args[key],sha:sha(args[key])};}
assert(sha(old.input)===old.inputSHA&&sha(old.defects)===old.defectSHA);
const started=Date.now(),deadline=Date.parse(args.deadline);assert(Number.isFinite(deadline)&&deadline>started);let previous=Q.of(0),oldPrimitive=Q.of(0),newPrimitive=Q.of(0),processed=0,joint=0,improved=0,lastHeartbeat=started,failure=null;
const spec={grade:'conditional phase-density replay of admitted old cells; no receiving propagation',knownFirst,sourceSHA:sha(new URL(import.meta.url)),helperSHA:sha(new URL('./authorized-cases-ten-hour-a-joint-phase.mjs',import.meta.url)),theoremSHA:sha(new URL('../analysis/authorized-cases-ten-hour-a-joint-phase-theorem.md',import.meta.url)),oldReceipt:args.receipt,oldReceiptSHA:sha(args.receipt),oldRowsSHA:sha(args.receipt+'.jsonl'),input:old.input,inputSHA:old.inputSHA,defects:old.defects,defectSHA:old.defectSHA,admission,deadline:new Date(deadline).toISOString(),physicalErrors:'all original r/u/a/components preserved; only completed omega/angularPrefix replayed'};
fs.writeFileSync(args.out+'.jsonl','',{flag:'wx'});
console.log(JSON.stringify({event:'launch',rows:raw.length,pid:process.pid,deadline:spec.deadline}));
try{
 for(let i=0;i<raw.length;i++){
  assert(Date.now()<deadline,'cooperative phase-replay deadline');const row=raw[i],t=Q.of(row.t);assert(t.cmp(previous)>0);const d=rowDensity(row),dt=t.sub(previous);
  oldPrimitive=oldPrimitive.add(dt.mul(row.omega));assert(oldPrimitive.cmp(row.angularPrefix)===0,'old complete primitive mismatch');
  newPrimitive=newPrimitive.add(dt.mul(d.bound));assert(newPrimitive.cmp(oldPrimitive)<=0);
  if(d.mode.startsWith('admitted'))joint++;if(d.bound.cmp(d.old)<0)improved++;
  fs.appendFileSync(args.out+'.jsonl',JSON.stringify(encode({index:i+1,left:previous,right:t,oldOmega:d.old,omega:d.bound,oldAngularPrefix:oldPrimitive,angularPrefix:newPrimitive,mode:d.mode,input:d.input,certificate:d.certificate}))+'\n');
  previous=t;processed=i+1;if(Date.now()-lastHeartbeat>10000){lastHeartbeat=Date.now();console.log(JSON.stringify({event:'heartbeat',processed,joint,improved,t:t.num(),wallSeconds:(Date.now()-started)/1000,rssMB:process.memoryUsage().rss/1048576}));}
 }
}catch(e){failure={message:e.message,stack:e.stack};}
const result={...spec,passed:!failure&&processed===raw.length,processed,joint,improved,final:encode({t:previous,oldAngularPrefix:oldPrimitive,angularPrefix:newPrimitive,reduction:oldPrimitive.sub(newPrimitive)}),rowsSHA:sha(args.out+'.jsonl'),failure,wallSeconds:(Date.now()-started)/1000,rssMB:process.memoryUsage().rss/1048576};
fs.writeFileSync(args.out,JSON.stringify(encode(result),null,2),{flag:'wx'});console.log(JSON.stringify(encode({passed:result.passed,processed,joint,improved,final:result.final,failure,wallSeconds:result.wallSeconds})));if(!result.passed)process.exitCode=1;
