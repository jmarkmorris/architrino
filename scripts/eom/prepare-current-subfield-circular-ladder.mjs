// Prepares a reviewable current resource plan and measures a fresh resource
// preflight. It never executes a ladder or declares its own plan reviewed.
import {createHash} from 'node:crypto';
import {existsSync,mkdirSync,readFileSync,realpathSync,writeFileSync} from 'node:fs';
import path from 'node:path';import {fileURLToPath} from 'node:url';import {Worker} from 'node:worker_threads';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');const demand=(ok,message)=>{if(!ok)throw Error(message);};
const dataURL=bytes=>'data:text/javascript;base64,'+Buffer.from(bytes).toString('base64');
const roles={self:'scripts/eom/prepare-current-subfield-circular-ladder.mjs',processOwner:'src/prescribed-path-analysis/SubfieldCircularObservationOwner.mjs',processHelper:'scripts/eom/observe-subfield-circular-processes.py',memoryOwner:'src/prescribed-path-analysis/SubfieldCircularMemoryOwner.mjs',memoryHelper:'scripts/eom/observe-subfield-circular-memory.py',rung:'scripts/eom/run-subfield-circular-root-rung.mjs',dispatcher:'scripts/eom/dispatch-subfield-circular-root-ladder.mjs'};
export function currentCircularDispositions(ids,costs){
 demand(Array.isArray(costs)&&costs.length===ids.length&&new Set(costs.map(row=>row.candidateId)).size===ids.length,'complete unique cost census required');
 return ids.map(candidateId=>{const row=costs.find(row=>row.candidateId===candidateId);demand(row&&Number.isFinite(row.projected128PhaseSeconds)&&row.projected128PhaseSeconds>0,'finite measured-pilot projection required');return{candidateId,projected128PhaseSeconds:row.projected128PhaseSeconds,projectionIsEstimate:true,wallLimitSeconds:1800,
  disposition:row.projected128PhaseSeconds<=1800?'proposed-enabled-pending-review':'resource-return-not-run',
  status:row.projected128PhaseSeconds<=1800?'○ Not done':'○ Not done — Blocked',
  reason:row.projected128PhaseSeconds<=1800?'Within existing cap by pilot projection; actual rung admission and memory policy remain required.':'Projection exceeds unchanged 1800-second cap; requires explicit resource-return decision before enabling.',rungs:[8,32,128],h3EvidenceEligible:false};});
}
async function main(){
 const began=performance.now(),completionEnd=began+60000,deadline=String(process.hrtime.bigint()+60000000000n),controller=new AbortController();
 const guard=new Worker(`const{parentPort,workerData}=require('node:worker_threads');let group=false;parentPort.on('message',m=>{if(m==='group')group=true;});function tick(){if(process.hrtime.bigint()>=BigInt(workerData)){process.kill(group?-process.pid:process.pid,'SIGKILL');return;}setTimeout(tick,50);}tick();`,{eval:true,execArgv:[],workerData:deadline});
 let guardClosed=false,workStarted=false,processOwner,memoryOwner,output,failure;const interrupt=()=>controller.abort(Error('preflight interrupted'));process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
 guard.on('error',()=>process.exit(125));guard.on('exit',()=>{if(!guardClosed)process.exit(125);});
 const check=()=>demand(performance.now()<completionEnd&&!controller.signal.aborted,'preflight original deadline/interruption');
 try{
  demand(process.argv.length===6&&process.argv[2]==='--out'&&process.argv[4]==='--self-sha256'&&/^[0-9a-f]{64}$/u.test(process.argv[5]),'--out NEW --self-sha256 SHA required');
  demand(process.execArgv.length===0&&!Object.keys(process.env).some(key=>(key.startsWith('DYLD_')||['NODE_OPTIONS','NODE_PATH','LD_PRELOAD','LD_LIBRARY_PATH'].includes(key))&&process.env[key]),'clean runtime required');
  const root=realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'));
  const self=readFileSync(path.join(root,roles.self));demand(sha(self)===process.argv[5],'preparation source binding differs');
  const ownerBytes=readFileSync(path.join(root,roles.processOwner));const {captureCircularFile,createCircularObservationOwner}=await import(dataURL(ownerBytes));
  const sources=Object.entries(roles).map(([role,filename])=>({role,...captureCircularFile(path.join(root,filename))}));
  demand(sources.find(row=>row.role==='self').sha256===process.argv[5]&&sources.find(row=>row.role==='processOwner').sha256===sha(ownerBytes),'source capture differs');
  const nodeImages=process.report.getReport().sharedObjects.filter(p=>!p.startsWith('/System/')&&!p.startsWith('/usr/lib/')).map(filename=>captureCircularFile(filename));
  sources.push(...nodeImages.map(row=>({role:'nodeRuntime',...row})));
  sources.push({role:'nodeExecutable',...captureCircularFile(process.execPath)});
  const get=role=>sources.find(row=>row.role===role);
  const rung=await import(dataURL(get('rung').data)),{createCircularMemoryOwner}=await import(dataURL(get('memoryOwner').data));
  const review=captureCircularFile(path.join(root,rung.SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW.path),rung.SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW.sha256);const reviewValue=JSON.parse(review.data);
  const joint=captureCircularFile(reviewValue.joint.path,reviewValue.joint.sha256),jointValue=JSON.parse(joint.data);
  const authority=rung.acceptCurrentCircularPilot({...joint,value:jointValue},{...review,value:reviewValue});
  const ledger=captureCircularFile(authority.admission.summary.path,authority.admission.summary.sha256),ledgerValue=JSON.parse(ledger.data);
  demand(ledgerValue.accepted&&ledgerValue.phaseCount===32&&ledgerValue.rowCount===2448,'complete current pilot summary required');
  const dispositions=currentCircularDispositions(rung.SUBFIELD_CIRCULAR_IDS,reviewValue.candidateCosts);
  sources.push({...review,role:'pilotReview'},{...joint,role:'pilotAdmission'},{...ledger,role:'pilotSummary'});
  const base=path.join(root,'.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1');output=path.resolve(root,process.argv[3]);demand(path.dirname(output)===base&&!existsSync(output)&&realpathSync(base)===base,'fresh direct output child required');mkdirSync(output);
  const python=path.resolve(root,process.env.AAA_VENV??'../.venv','bin/python');
  const shared={python,sources,root,completionEnd,signal:controller.signal};
  processOwner=createCircularObservationOwner({...shared,helper:get('processHelper').path,began});
  memoryOwner=createCircularMemoryOwner({...shared,helper:get('memoryHelper').path,capture:captureCircularFile});
  workStarted=true;await processOwner.initialize();const table=await processOwner.inspect({remainingMs:2500,originalDeadlineMs:completionEnd,cleanup:false});
  demand(table.some(row=>row.pid===process.pid&&row.pgid===process.pid),'owned isolated preflight process group required');guard.postMessage('group');
  await memoryOwner.initialize();let resourceObservation;
  try{resourceObservation=await memoryOwner.observe({policy:rung.SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION,atLaunch:true});}catch(error){resourceObservation={accepted:false,failure:error.message};}
  const enabled=dispositions.filter(row=>row.disposition==='proposed-enabled-pending-review').map(row=>row.candidateId),returns=dispositions.filter(row=>row.disposition==='resource-return-not-run').map(row=>row.candidateId);
  const plan={schema:'braid-program/subfield-circular-root-ladder-resource-plan.v1',resourceBudgetReviewed:false,independentReviewStatus:'pending',h3EvidenceEligible:false,laterLadderAuthorized:false,
   wallLimitSecondsPerCandidateRung:1800,rungs:[8,32,128],eomWorkersPerCandidate:1,maximumConcurrentCandidates:1,totalEomWorkers:1,candidates:enabled,resourceReturns:returns,
   cohorts:[{id:'current-within-existing-cap',candidates:enabled,wallLimitSeconds:1800,resourceReturn:null}],resourceObservation:{...rung.SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION},
   pilotAdmission:{path:joint.path,sha256:joint.sha256},pilotIndependentReview:{path:review.path,sha256:review.sha256},buildReceipt:{path:rung.SUBFIELD_CIRCULAR_BUILD_PATH,sha256:rung.SUBFIELD_CIRCULAR_BUILD_SHA},
   runnerSha256:get('rung').sha256,dispatcherSha256:get('dispatcher').sha256,dispositions,
   executionStatus:'Blocked pending independent resource-plan and current ladder-entry review; preparation executes no ladder.'};
  const planPath=path.join(output,'resource-plan.pending.json');writeFileSync(planPath,JSON.stringify(plan,null,2)+'\n',{flag:'wx'});
  const first=enabled[0],prior={candidateId:first,phaseReceipts:ledgerValue.phaseReceipts.filter(row=>row.candidateId===first).map(({path,sha256})=>({path,sha256})),rungAdmissions:[]};
  writeFileSync(path.join(output,'first-rung-prior.json'),JSON.stringify(prior)+'\n',{flag:'wx'});
  let memoryReceipt;try{memoryReceipt=await memoryOwner.finish();}catch{memoryReceipt=memoryOwner.snapshot();}
  const processReceipt=await processOwner.finish();check();memoryOwner.recheck();
  const receipt={schema:'circular-current-ladder-preparation.v1',accepted:resourceObservation.accepted&&memoryReceipt.closed&&processReceipt.closed,h3EvidenceEligible:false,laterLadderAuthorized:false,
   plan:captureCircularFile(planPath),resourceObservation,memory:memoryReceipt,process:processReceipt,elapsedSeconds:(performance.now()-began)/1000,conditionalOn:'exact external owner zero exit before original60seconddeadline'};
  delete receipt.plan.data;writeFileSync(path.join(output,'preflight.json'),JSON.stringify(receipt)+'\n',{flag:'wx'});check();processOwner.recheck();memoryOwner.recheck();
  await new Promise((resolve,reject)=>process.stdout.write(JSON.stringify({accepted:receipt.accepted,laterLadderAuthorized:false,out:output})+'\n',error=>error?reject(error):resolve()));check();
  if(!receipt.accepted)failure=Error(resourceObservation.failure??'resource preflight rejected');
 }catch(error){failure=error;}
 const closed=!workStarted||(processOwner?.snapshot().probes.every(row=>row.closed)&&memoryOwner?.snapshot().probes.every(row=>row.closed));
 if(closed){guardClosed=true;await guard.terminate();process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}
 if(failure){console.error(failure.stack);process.exitCode=1;}
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main();
