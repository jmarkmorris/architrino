import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, realpathSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const mode = process.argv[2];
assert.ok(['explicit-exit', 'natural-return', 'unref-control', 'bootstrap-interruption'].includes(mode));
// Known case first: the independent command/output capture must return this exact marker.
assert.equal(execFileSync(process.execPath, ['-e', 'process.stdout.write("KNOWN_CONTROL")'], {encoding:'utf8', timeout:2000}), 'KNOWN_CONTROL');
console.log(JSON.stringify({event:'known-command-capture-pass',mode}));
const launcherPath = path.resolve('scripts/eom/launch-subfield-circular-root-pilot.mjs');
let launcher = readFileSync(launcherPath,'utf8');
if(mode === 'unref-control') {
  const before = 'try{await import(pathToFileURL(process.argv[1]).href);if(process.connected)process.disconnect()}';
  assert.equal(launcher.split(before).length,2,'experiment requires one exact bootstrap completion site');
  launcher = launcher.replace(before,'try{await import(pathToFileURL(process.argv[1]).href);rootGuard.unref();rootGuard.channel.unref();if(process.connected)process.disconnect()}');
}
const {superviseRegisteredPilot,processTable} = await import(mode==='unref-control' ? 'data:text/javascript;base64,'+Buffer.from(launcher).toString('base64') : pathToFileURL(launcherPath));
const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'dpr-supervision-')));
const source = Buffer.from('process.stdout.write("WORKLOAD_COMPLETE\\n");' + (mode === 'explicit-exit' ? 'process.exit(0);' : ''));
writeFileSync(path.join(root,'synthetic.mjs'), source);
console.log(JSON.stringify({event:'probe-start',mode,root,node:process.version}));
const began = performance.now();
let inspections=0;
const independentlyObservedPids = new Set();
let receipt, rejected = false;
try {
  receipt = await superviseRegisteredPilot({root,entry:'synthetic.mjs',args:[],
    sources:[{path:'synthetic.mjs',bytes:source,sha256:createHash('sha256').update(source).digest('hex')}],
    output:path.join(root,'attempt'),limitMs:20000,heartbeatMs:1000,graceMs:100,
    inspectProcesses:async()=>{
      const rows=await processTable();
      if(mode==='bootstrap-interruption' && ++inspections===2) {
        const children=rows.filter(row=>row.ppid===process.pid && row.pgid===row.pid && row.command===process.execPath);
        assert.equal(children.length,1,'interruption must observe one newly spawned runner');
        for(const row of children)independentlyObservedPids.add(row.pid);
        for(const row of rows)if(children.some(parent=>row.ppid===parent.pid))independentlyObservedPids.add(row.pid);
        throw Error('synthetic bootstrap interruption');
      }
      return rows;
    },
    admit:async()=>({accepted:true,h3EvidenceEligible:false,scope:'synthetic operational control only'})});
} catch(error) {
  rejected = true;
  receipt = error.outerReceipt;
  if (!receipt) throw error;
}
writeFileSync(path.join(root,'receipt.json'),JSON.stringify(receipt,null,2)+'\n');
const pids = [...new Set([receipt.runner?.pid,receipt.rootGuard?.identity?.pid,...independentlyObservedPids].filter(Number.isInteger))];
const observations = pids.map(pid=>{
  try { return {pid,output:execFileSync('/bin/ps',['-p',String(pid),'-o','pid=,ppid=,pgid=,stat='],{encoding:'utf8',timeout:2000}).trim(),present:true}; }
  catch(error) { if(error.status===1 && String(error.stdout??'').trim()==='')return {pid,present:false};throw error; }
});
console.log(JSON.stringify({event:'probe-result',mode,root,rejected,accepted:receipt.accepted,
  failure:receipt.failure,cleanupFailure:receipt.cleanupFailure,finalizationFailure:receipt.finalizationFailure,
  seconds:(performance.now()-began)/1000,processesClosed:receipt.processesClosed,
  stdout:readFileSync(path.join(root,'attempt','runner-stdout.log'),'utf8'),observations}));
assert.ok(observations.every(row=>!row.present),'probe retained a recorded child');
