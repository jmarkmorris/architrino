// Operational controls only: no scientific input, response arithmetic or EOM.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { closeSync, existsSync, mkdtempSync, openSync, readFileSync, renameSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { Writable } from 'node:stream';
import * as L from '../scripts/eom/launch-prescribed-response-pilot.mjs';
import { currentOwnedGroup, descendantRecords } from '../scripts/eom/launch-subfield-circular-root-pilot.mjs';
const temp=()=>mkdtempSync(path.join(tmpdir(),'prescribed-response-launch-control-'));
const digest=x=>createHash('sha256').update(x).digest('hex');

test('exact integer host minima, malformed observations and disk thresholds',()=>{
  assert.equal(L.parseHostResource('System-wide memory free percentage: 40%\n',64n*1024n**3n,true).freePercent,40);
  assert.equal(L.parseHostResource('System-wide memory free percentage: 20%',16n*1024n**3n,false).freePercent,20);
  for(const value of ['20.0','20.5','-1','101','NaN','19'])assert.throws(()=>L.parseHostResource(`System-wide memory free percentage: ${value}%`,64n*1024n**3n,false));
  assert.throws(()=>L.parseHostResource('System-wide memory free percentage: 40%',64n*1024n**3n-1n,true));
  assert.throws(()=>L.parseHostResource('System-wide memory free percentage: 20%',16n*1024n**3n-1n,false));
  assert.throws(()=>L.parseHostResource('System-wide memory free percentage: 40%\nSystem-wide memory free percentage: 40%',64n*1024n**3n,true));
});
test('RSS is aggregate with strict2GiB bound and conservative sample-start timing',()=>{
  const fresh=()=>({beganMs:0,lastSampleMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0});
  const state=fresh();assert.equal(L.acceptRSS(state,[{rssBytes:100},{rssBytes:200}],100,80).aggregateResidentBytes,300);
  assert.equal(L.acceptRSS(state,[{rssBytes:100}],1080,1070).sampleGapMs,1000);
  assert.throws(()=>L.acceptRSS(state,[{rssBytes:100}],2071,2070),/one second/);
  assert.throws(()=>L.acceptRSS(fresh(),[{rssBytes:2*1024**3}],1));
  assert.throws(()=>L.acceptRSS(fresh(),[{rssBytes:0}],1));
  assert.throws(()=>L.acceptRSS(fresh(),[],1));
  assert.throws(()=>L.acceptRSS(fresh(),[{rssBytes:1}],1001,1000),/one second/);
});
test('final teardown must retain a recent observation',()=>{
  const state={samples:1,lastSampleStartedMs:100};assert.equal(L.admitFinalObservation(state,1100),1000);
  assert.throws(()=>L.admitFinalObservation(state,1100.1),/closure gap/);
  assert.throws(()=>L.admitFinalObservation({samples:0,lastSampleStartedMs:100},101));
});
test('process parser preserves birth identity, resident bytes and full command',()=>{
  const [row]=L.parseObservation(' 100 1 100 Thu Aug 27 12:34:56 2026 S 10 /some/python -I fixture\n');
  assert.equal(row.rssBytes,10240);assert.equal(row.started,'Thu Aug 27 12:34:56 2026');assert.equal(row.command,'/some/python -I fixture');
  for(const bad of ['100 1 100 invalid','0 1 1 Thu Aug 27 12:34:56 2026 S 10 command'])assert.throws(()=>L.parseObservation(bad));
});
test('owned RSS retains orphaned group members and rejects reused identities',()=>{
  const row=(pid,ppid,pgid,started='old')=>({pid,ppid,pgid,started,rssBytes:10});
  const owners=new Map(),outer={currentOwnedGroup,descendantRecords};
  assert.deepEqual(L.selectOwnedRows([row(1,0,1),row(2,1,2),row(3,2,2),row(9,0,9),row(7,1,7)],1,owners,outer,new Set([7])).map(x=>x.pid).sort(),[1,2,3]);
  assert.deepEqual(L.selectOwnedRows([row(1,0,1),row(3,0,2),row(9,0,9)],1,owners,outer).map(x=>x.pid).sort(),[1,3]);
  assert.deepEqual(L.selectOwnedRows([row(1,0,1),row(2,0,2,'reused'),row(9,0,9)],1,owners,outer).map(x=>x.pid),[1]);
});
test('startup abort stops admission once while leaving cleanup inspection available',async()=>{
  const abort=new AbortController();let calls=0;
  const inspect=L.startupAbortInspection(async()=>{calls++;if(calls===1)abort.abort(new Error('synthetic stop'));return[calls];},abort.signal);
  await assert.rejects(inspect(),/synthetic stop/);assert.deepEqual(await inspect(),[2]);
});
test('source capture refuses drift, symlinks, directories and truncated byte bounds',()=>{
  const dir=temp(),p=path.join(dir,'source');writeFileSync(p,'abc');assert.equal(L.captureSource(p,digest('abc')).data.toString(),'abc');
  assert.throws(()=>L.captureSource(p,'0'.repeat(64)));assert.throws(()=>L.captureSource(dir,digest('abc')));
  symlinkSync(p,path.join(dir,'alias'));assert.throws(()=>L.captureSource(path.join(dir,'alias'),digest('abc')));
  writeFileSync(p,Buffer.alloc(1024**2+1));assert.throws(()=>L.captureSource(p,digest(readFileSync(p))));
});
test('shared lock is exclusive and cannot unlink replacement ownership',()=>{
  const dir=temp(),p=path.join(dir,'lock'),lock=L.reserveLock(p,{pid:1,started:'synthetic'});
  assert.throws(()=>L.reserveLock(p,{pid:2,started:'other'}));
  const q=path.join(dir,'foreign');writeFileSync(q,'foreign');renameSync(q,p);
  assert.throws(()=>L.releaseLock(lock));assert.equal(readFileSync(p,'utf8'),'foreign');
  const own=path.join(dir,'own'),held=L.reserveLock(own,{pid:1,started:'synthetic'});L.releaseLock(held);assert.equal(existsSync(own),false);
});
test('both F5 stages and F6c stages conflict, own descendants are allowed',()=>{
  const own=[{pid:1,ppid:0,command:'launcher'},{pid:2,ppid:1,command:'reduce-prescribed-acceleration-response.py'}];L.assertNoCompetingPilot(own,1);
  for(const command of ['reduce-prescribed-acceleration-response.py','publish-prescribed-acceleration-response.py','launch-prescribed-response-pilot.mjs','run-prescribed-response-pilot.mjs','launch-f6c-root-cover-pilot.mjs','prepare-f6c-continuous-reception-root-cover.py'])assert.throws(()=>L.assertNoCompetingPilot([...own,{pid:3,ppid:0,command}],1));
});
test('log writes preserve bytes and enforce total16MiB ceiling',()=>{
  const p=path.join(temp(),'log'),fd=openSync(p,'wx'),total={bytes:0};try{L.boundedLogAppend(fd,'original\n',total);assert.equal(total.bytes,9);assert.throws(()=>L.boundedLogAppend(fd,'x',{bytes:16*1024**2}));}finally{closeSync(fd);}assert.equal(readFileSync(p,'utf8'),'original\n');
});
test('hung worker timeout and abort terminate the owned worker',async()=>{
  const bytes=Buffer.from('export function fileOperation(){while(true){}}'),abort=new AbortController();
  await assert.rejects(L.runFileWorker({},bytes,30,abort.signal),/deadline/);
  const pending=L.runFileWorker({},bytes,2000,abort.signal);setTimeout(()=>abort.abort(new Error('synthetic cancel')),20);await assert.rejects(pending,/cancel/);
  await assert.rejects(L.runFileWorker({},bytes,1,abort.signal),/already/);
});
test('worker executes captured bytes with clean execArgv and binds original stdout',async()=>{
  const bytes=Buffer.from("export const clean=x=>x;export function readBound(p){return{path:p,sha256:'synthetic',bytes:3}}export function fileOperation(j){return{stdout:j.stdout,remainingKey:Object.hasOwn(j,'stdoutPath')}}");
  assert.deepEqual(await L.runFileWorker({stdoutPath:'/fixture'},bytes,2000,new AbortController().signal),{stdout:{path:'/fixture',sha256:'synthetic',bytes:3},remainingKey:false});
});
function closedFixture(){return{receipt:{accepted:true,processesClosed:true,exit:{code:0,signal:null}},completion:{completed:true,accepted:false,elapsedSeconds:0.1},startedAt:'2026-08-27T00:00:00.000Z',began:0,nowMs:200,rss:{samples:2,lastSampleStartedMs:180,maximumSampledRSSBytes:1024,maximumSampleGapMs:100},logBytes:12,watcherSha256:'1'.repeat(64)};}
test('embedded execution represents actually closed compute, leaves outputBytes derived',()=>{
  const f=closedFixture(),r=L.closedComputeObservations(f);assert.equal(r.elapsedSeconds,0.2);assert.equal(r.publicationComplete,true);assert.equal(r.outputBytes,0);assert.equal(r.maximumSampledGroupRssBytes,1024);
  for(const mutate of [x=>x.receipt.accepted=false,x=>x.receipt.processesClosed=false,x=>x.receipt.exit.code=1,x=>x.completion.accepted=true,x=>x.completion.elapsedSeconds=1,x=>x.rss.maximumSampledRSSBytes=2*1024**3,x=>x.nowMs=1800000,x=>x.logBytes=16*1024**2+1,x=>x.startedAt='not measured']){const bad=structuredClone(f);mutate(bad);assert.throws(()=>L.closedComputeObservations(bad));}
});
test('final completion awaits actual stdout callback, rejects stalls and late flush',async()=>{
  let called=false;await L.flushCompletion({completed:true},{began:0,lastSampleStartedMs:0,clock:()=>100,stream:new Writable({write(_bytes,_enc,done){setTimeout(()=>{called=true;done();},5);}})});assert.equal(called,true);
  let lateCallback;const stalled=new Writable({write(_bytes,_enc,done){lateCallback=done;}});
  await assert.rejects(L.flushCompletion({completed:true},{began:0,lastSampleStartedMs:0,clock:()=>990,stream:stalled}),/flush exceeded/);assert.equal(stalled.destroyed,true);
  lateCallback();await new Promise(resolve=>setImmediate(resolve));assert.equal(stalled.listenerCount('error'),0);
  let now=100;const late=new Writable({write(_bytes,_enc,done){now=1100;done();}});
  await assert.rejects(L.flushCompletion({completed:true},{began:0,lastSampleStartedMs:0,clock:()=>now,stream:late}),/observation gap/);assert.equal(late.destroyed,true);
  await assert.rejects(L.flushCompletion({},{began:0,lastSampleStartedMs:1799990,clock:()=>1800001,stream:new Writable({write(){}})}),/deadline/);
  const broken=new Writable({write(_b,_enc,done){done(new Error('synthetic EPIPE'));}});
  await assert.rejects(L.flushCompletion({},{began:0,lastSampleStartedMs:0,clock:()=>1,stream:broken}),/EPIPE/);assert.equal(broken.destroyed,true);
  await new Promise(resolve=>setImmediate(resolve));assert.equal(broken.listenerCount('error'),0);
  await assert.rejects(L.flushCompletion({operationalLogBytes:16*1024**2},{began:0,lastSampleStartedMs:0,clock:()=>1,stream:new Writable({write(){}})}),/log bound/);
});
test('closed CLI hash/path contract rejects extras, duplicates and traversal',()=>{
  const argv=['--out','.local-data/braid-analysis/prescribed-response-example','--plan','plan','--plan-sha256','1'.repeat(64),'--launcher-sha256','2'.repeat(64),'--entry-sha256','3'.repeat(64)];
  assert.equal(L.parseArgs(argv).entrySha256,'3'.repeat(64));for(const bad of [argv.slice(0,-2),[...argv,'--extra','x'],[...argv,'--out','again']])assert.throws(()=>L.parseArgs(bad));
  const bad=[...argv];bad[1]='a/../b';assert.throws(()=>L.parseArgs(bad));
});
test('composition is standalone and fixes compute-before-publisher, source rechecks and original clock',()=>{
  const src=readFileSync('scripts/eom/launch-prescribed-response-pilot.mjs','utf8');
  assert.match(src,/for\(const stage of \["compute","publisher"\]\)/);assert.match(src,/await outer\.superviseRegisteredPilot/);assert.match(src,/startedAtMs:began,limitMs:LIMIT_MS/);
  assert.match(src,/kind:"prepare-publication"/);assert.match(src,/outputBytes:0/);assert.match(src,/externalWholeAttemptAdmissionRequired:true/);assert.match(src,/await flushCompletion/);
  assert.doesNotMatch(src,/from ["'][^"']*f6c|import\([^)]*f6c|evaluate_response|enclose_root_cover/);
});
