// Independent process observer around the existing synthetic process suites.
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {readFileSync,writeFileSync,mkdtempSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {runOwned} from '../../../../../scripts/dev/owned-compute-supervisor.mjs';
const out=path.dirname(new URL(import.meta.url).pathname),dir=mkdtempSync(path.join(tmpdir(),'root-cover-observer-'));
function enroll(rows,rootPid,known){
 const ids=new Set([rootPid,...known.keys()]),groups=new Set([...known.values()].map(r=>r.pgid));
 let changed=true;while(changed){changed=false;for(const r of rows)if(ids.has(r.pid)||ids.has(r.ppid)||groups.has(r.pgid)){
  if(!ids.has(r.pid)){ids.add(r.pid);changed=true;}groups.add(r.pgid);
  const prior=known.get(r.pid);assert(!prior||prior.started===r.started,'PID birth changed');known.set(r.pid,r);
 }}
}
function parse(raw){return raw.split('\n').filter(s=>s.trim()).map(line=>{const m=/^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.{24})\s+(\S+)\s+(.+)$/u.exec(line);assert(m,'complete process row');return{pid:Number(m[1]),ppid:Number(m[2]),pgid:Number(m[3]),started:m[4].replace(/\s+/gu,' '),command:m[6]};});}
const known=new Map();
enroll([{pid:10,ppid:1,pgid:10,started:'a'},{pid:11,ppid:10,pgid:11,started:'b'},{pid:12,ppid:11,pgid:11,started:'c'},{pid:99,ppid:1,pgid:99,started:'z'}],10,known);
assert.deepEqual([...known.keys()],[10,11,12]);enroll([{pid:13,ppid:1,pgid:11,started:'d'}],10,known);assert(known.has(13));
assert.throws(()=>enroll([{pid:11,ppid:1,pgid:11,started:'changed'}],10,known));
assert.equal(parse(' 10 1 10 Mon Sep  7 12:00:00 2026 S node\n')[0].started,'Mon Sep 7 12:00:00 2026');assert.throws(()=>parse('invalid'));
console.log('Known graph, reparenting, PID reuse, process-row and malformed-row cases passed before host observation.');
const observe=()=>new Promise((resolve,reject)=>execFile('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,comm='],{encoding:'utf8',timeout:1000,maxBuffer:8*1024**2,env:{...process.env,LC_ALL:'C'}},(e,text)=>{if(e)return reject(e);try{resolve(parse(text));}catch(e){reject(e);}}));
const pause=ms=>new Promise(r=>setTimeout(r,ms)),pidFile=path.join(dir,'pid'),wrapper=path.join(dir,'run.mjs');
writeFileSync(wrapper,`import{writeFileSync}from'node:fs';import{spawn}from'node:child_process';writeFileSync(${JSON.stringify(pidFile)},String(process.pid));const c=spawn(process.execPath,['--test','--test-concurrency=1','tests/f6c-cached-root-cover-full-process.test.js'],{stdio:'inherit'});c.once('error',e=>{throw e});c.once('exit',(code,signal)=>{process.exitCode=signal?1:code});\n`);
const observed=new Map();let running=true,failure,samples=0;
const observer=(async()=>{try{while(running){if(existsSync(pidFile)){enroll(await observe(),Number(readFileSync(pidFile,'utf8')),observed);samples++;}await pause(50);}}catch(e){failure=e;}})();
let lease;try{lease=await runOwned(['--owner-task',process.env.CODEX_SESSION_ID,'--deadline-seconds','60','--heartbeat-seconds','5','--',process.execPath,wrapper]);}finally{running=false;await observer;}
assert(!failure,failure?.message);assert.equal(lease.exitCode,0);assert.equal(lease.processGroupClosed,true);assert(observed.size>1);
const final=await observe(),remaining=final.filter(r=>observed.has(r.pid)||[...observed.values()].some(p=>p.pgid===r.pgid));
delete lease.control;
writeFileSync(path.join(out,'external-process-observation.json'),JSON.stringify({knownCasesPassed:true,samples,observed:[...observed.values()],remaining,lease,claim:'Sampled observed process identities and groups absent after bounded synthetic controls; no scientific validation.'},null,2)+'\n');
assert.deepEqual(remaining,[],'observed owned process or group remains');
console.log(JSON.stringify({runId:lease.runId,samples,observedProcesses:observed.size,remaining:remaining.length}));
