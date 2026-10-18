// Independent bounded multi-request server route check, c_f=1.
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const [binary,output]=process.argv.slice(2);
fs.mkdirSync(output,{recursive:true});
const cp=path.resolve(output,'accepted.v9.json');
const request=JSON.parse(fs.readFileSync('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/reviewer-o3-consumer-probe/request.json','utf8'));
request.execution.maximumAcceptedSteps=2;
const child=spawn(binary,['eom-v2-server','--checkpoint-file',cp],{stdio:['pipe','pipe','pipe']});
let stderr='';child.stderr.on('data',chunk=>stderr+=chunk);
const closed=new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',(code,signal)=>resolve({code,signal}));});
const timer=setTimeout(()=>child.kill('SIGTERM'),20000);
const lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();
const send=async(name,envelope)=>{
  fs.writeFileSync(path.join(output,name+'.request.json'),JSON.stringify(envelope));
  child.stdin.write(JSON.stringify(envelope)+'\n');
  const row=await lines.next();assert(!row.done,'server closed before response');
  fs.writeFileSync(path.join(output,name+'.response.json'),row.value+'\n');
  return JSON.parse(row.value);
};
try {
  const known=await send('known-cancel',{operation:'validate-cancel',request:{runId:'known-server'}});
  assert.deepEqual(known,{schema:'eom_cancel_request/v2',runId:'known-server'});
  console.log('KNOWN exact parser-only cancellation document PASS before server v3 targets.');
  const inspection=await send('inspect-v3',{operation:'inspect',request});
  assert.equal(inspection.schema,'eom_inspection/v3');assert.equal(inspection.admission.originPreflight,'not_run');
  const prefix=await send('evolve-v3',{operation:'evolve',request});
  assert.equal(prefix.schema,'eom_evolution_response/v3');assert.equal(prefix.acceptedStepCount,2);assert.equal(prefix.acceptedCoverage.end,'0.015625');assert.equal(prefix.checkpoint.durable,true);
  const checkpoint=JSON.parse(fs.readFileSync(cp,'utf8'));assert.equal(checkpoint.digest,prefix.checkpoint.digest);
  const resumed=await send('resume-v3',{operation:'resume',request,checkpoint,endTime:'0.0625',runtime:{threadCount:4}});
  assert.equal(resumed.schema,'eom_evolution_response/v3');assert.equal(resumed.acceptedStepCount,4);assert.equal(resumed.acceptedCoverage.end,'0.03125');assert.equal(resumed.validated.workerCount,4);assert.equal(resumed.validated.replayedSteps,2);assert.equal(resumed.checkpoint.durable,true);
  child.stdin.end();const terminal=await closed;assert.equal(terminal.code,0);assert.equal(terminal.signal,null);
  console.log(JSON.stringify({server_requests:4,known_control:1,v3_inspect:true,v3_prefix_steps:2,v3_resumed_steps:4,replayed_steps:2,worker_override:4,durable:true,terminal}));
} finally {
  clearTimeout(timer);if(child.exitCode===null && child.signalCode===null){child.kill('SIGTERM');await closed;}
  fs.writeFileSync(path.join(output,'server.stderr'),stderr);
}
