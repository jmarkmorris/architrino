#!/usr/bin/env node
// Supervised candidate-specific launcher. Scientific settings are consumed
// from the already prepared request bytes; this file does not alter the EOM.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { capture, runWatched, sha256 } from './run-f5-ordinary-evolution.mjs';

const check=(ok,message)=>{if(!ok)throw new Error(message);};
const ROOT=fileURLToPath(new URL('../../',import.meta.url));

async function main(args=process.argv.slice(2)){
  check(args.length===10&&args[0]==='--prepared'&&args[2]==='--binary'&&args[4]==='--manifest'&&args[6]==='--acceptance'&&args[8]==='--out','usage: --prepared DIR --binary FILE --manifest FILE --acceptance FILE --out FRESH_DIR');
  const prepared=resolve(args[1]), binary=resolve(args[3]), manifestPath=resolve(args[5]), acceptancePath=resolve(args[7]), out=resolve(args[9]);
  check(!existsSync(out),'fresh output directory required'); mkdirSync(out,{mode:0o700});
  const limits={wallSeconds:7200,heartbeatSeconds:15,aggregateRssBytes:1610612736,rssSampleIntervalSeconds:1,
    maximumRssSampleGapSeconds:2,logBytes:16777216,outputBytes:268435456,aggregateOutputBytes:1073741824,
    diskMinimumBytes:5368709120,minimumHostMemoryFreePercent:20};
  const acceptedBytes=capture(acceptancePath,1024*1024), acceptance=JSON.parse(acceptedBytes.data);
  check(acceptance.schema==='braid-program/b1-3-circular-release-independent-review.v1'&&acceptance.accepted===true&&acceptance.executionScope==='questions-1-3-only','independent launch acceptance required');
  const authenticate=()=>{
    const currentAcceptance=capture(acceptancePath,acceptedBytes.bytes);check(currentAcceptance.bytes===acceptedBytes.bytes&&currentAcceptance.sha256===acceptedBytes.sha256,'acceptance receipt changed');
    const manifestBytes=capture(manifestPath,16*1024*1024);check(manifestBytes.sha256===acceptance.manifestSha256&&manifestBytes.bytes===acceptance.manifestBytes,'reviewed manifest identity differs');
    const manifest=JSON.parse(manifestBytes.data);check(manifest.schema==='braid-program/b1-3-circular-release-binding-manifest.v1'&&manifest.executionAuthorized===false&&manifest.reviewStatus==='pending','wrong immutable manifest');
    for(const binding of manifest.bindings){const actual=capture(binding.path,binding.bytes);check(actual.bytes===binding.bytes&&actual.sha256===binding.sha256,`changed immutable binding: ${binding.path}`);}
    check(manifest.bindings.some(b=>b.role==='eom-executable'&&b.path===binary),'binary is not the reviewed executable');
    check(manifest.bindings.some(b=>b.role==='past-only-handoff'&&b.path===resolve(prepared,'handoff.json')),'handoff is not the reviewed input');
    for(const request of manifest.requests){const actual=capture(request.path,request.bytes),raw=JSON.parse(actual.data);check(actual.sha256===request.sha256&&raw.wire.sha256===request.wireSha256&&raw.wire.bytes===request.wireBytes&&sha256(raw.wire.utf8)===request.wireSha256,'request or wire differs from reviewed bytes');}
    return manifest;
  };
  const manifest=authenticate();
  const stages=[], responses={};
  for(const rung of ['coarse','medium','fine']){
    const requestBinding=manifest.requests.find(row=>row.rung===rung);check(requestBinding?.path===resolve(prepared,`${rung}-request.json`),'reviewed rung path differs');
    const request=JSON.parse(readFileSync(requestBinding.path,'utf8'));
    check(request.wire?.utf8&&request.transportRequest?.runId===`b1-3-circular-${rung}-v1`,'prepared request identity differs');
    for(const [suffix,extra] of [['inspection',['--inspect-request-only']],['evolution',['--accepted-step-progress']]]){
      authenticate();
      const stageOut=resolve(out,`${rung}-${suffix}`);
      const record=await runWatched({command:binary,args:['borg-shadow-v0',...extra],input:request.wire.utf8,output:stageOut,limits,budgetRoot:out,beforeSpawn:authenticate});
      stages.push({rung,suffix,record});
      check(record.processSucceeded,`${rung} ${suffix} process/resource failure`);
      const responsePath=resolve(stageOut,'stdout.json'); check(existsSync(responsePath),`${rung} ${suffix} response absent`);
      const response=JSON.parse(readFileSync(responsePath,'utf8'));
      if(suffix==='inspection'){
        check(response.schema==='eom_borg_request_inspection/v1'&&response.parserInspected===true&&response.eomExecuted===false,'parser inspection failed');
        check(response.paths?.length===6&&response.paths.every(p=>p.segmentCount===4096),'parser history census differs');
      }else responses[rung]=responsePath;
      authenticate();
    }
  }
  check(Object.keys(responses).length===3,'all three evolution responses required');
  const checkerOut=resolve(out,'independent-checkpoint.json'), checkerStage=resolve(out,'independent-check-process');
  const python=resolve(ROOT,'../.venv/bin/python');
  authenticate();
  const checker=await runWatched({command:python,args:['-I','-S','-B',resolve(ROOT,'scripts/eom/check-b1-3-circular-release.py'),
    '--handoff',resolve(prepared,'handoff.json'),'--coarse-response',responses.coarse,'--medium-response',responses.medium,'--fine-response',responses.fine,'--out',checkerOut],
    output:checkerStage,limits,budgetRoot:out,beforeSpawn:authenticate});
  check(checker.processSucceeded&&existsSync(checkerOut),'independent checker process failed');
  const checkpoint=JSON.parse(readFileSync(checkerOut,'utf8')); authenticate();
  const summary={schema:'braid-program/b1-3-circular-release-launch.v1',operationallyComplete:true,questions4And5Started:false,
    preparedDirectory:prepared,binary,manifest:{path:manifestPath,sha256:acceptance.manifestSha256},acceptance:{path:acceptancePath,sha256:acceptedBytes.sha256},stages,
    independentCheckpoint:{path:checkerOut,accepted:checkpoint.accepted}};
  writeFileSync(resolve(out,'launch.json'),JSON.stringify(summary,null,2)+'\n',{flag:'wx',mode:0o600});
  authenticate();
  process.stdout.write(JSON.stringify({out,stages:stages.length,operationallyComplete:true})+'\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){main().catch(e=>{process.stderr.write(e.stack+'\n');process.exitCode=1;});}
