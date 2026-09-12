// Prepares a reviewable current resource plan and measures a fresh resource
// preflight. It never executes a ladder or declares its own plan reviewed.
import {createHash} from 'node:crypto';
import {existsSync,mkdirSync,readFileSync,realpathSync,writeFileSync} from 'node:fs';
import {closeSync,constants,fstatSync,openSync} from 'node:fs';
async function circularAdmission(root,digest,originalBindings=[]) {
  if (!/^[a-f0-9]{64}$/u.test(digest??'')) throw Error('externally selected circular source-map digest required');
  const initial=[...originalBindings];
  const capture=(filename,expected)=>{
    if(realpathSync(filename)!==filename)throw Error('canonical circular bootstrap source required');
    const fd=openSync(filename,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
    try{const before=fstatSync(fd);if(!before.isFile()||before.size>2*1024**2)throw Error('bounded circular bootstrap source required');
      const data=readFileSync(fd),after=fstatSync(fd);
      if(data.length!==before.size||['dev','ino','size','mtimeMs','ctimeMs'].some(key=>before[key]!==after[key])||createHash('sha256').update(data).digest('hex')!==expected)throw Error('circular bootstrap source differs');
      initial.push({path:filename,sha256:expected,identity:Object.fromEntries(['dev','ino','size','mtimeMs','ctimeMs'].map(key=>[key,before[key]]))});
      return data;
    }finally{closeSync(fd);}
  };
  const raw=capture(path.join(root,'reference/priorities/development-process-review/contracts/option-b-circular-sources.jsonld'),digest);
  const rows=JSON.parse(raw)['@graph']?.filter(row=>row['@type']==='Source'&&row.role==='admission');
  if(rows?.length!==1||rows[0].binding.path!=='scripts/eom/run-current-subfield-circular-root-pilot.mjs')throw Error('circular admission entry differs');
  const module=await import('data:text/javascript;base64,'+capture(path.join(root,rows[0].binding.path),rows[0].binding.sha256).toString('base64'));
  return module.loadCircularSourceMap(root,digest,initial);
}
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
  const args={};for(let i=2;i<process.argv.length;i+=2){demand(['--out','--self-sha256','--source-map-sha256','--pilot-review','--pilot-review-sha256'].includes(process.argv[i])&&process.argv[i+1]&&!args[process.argv[i]],'exact circular preparation options required');args[process.argv[i]]=process.argv[i+1];}
  demand(Object.keys(args).length===5&&['--self-sha256','--source-map-sha256','--pilot-review-sha256'].every(key=>/^[a-f0-9]{64}$/u.test(args[key]??'')),'external source and prior review selections required');
  demand(process.execArgv.length===0&&!Object.keys(process.env).some(key=>(key.startsWith('DYLD_')||['NODE_OPTIONS','NODE_PATH','LD_PRELOAD','LD_LIBRARY_PATH'].includes(key))&&process.env[key]),'clean runtime required');
  const root=realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'));
  const admission=await circularAdmission(root,args['--source-map-sha256']);
  demand(admission.source(roles.self).sha256===args['--self-sha256'],'preparation source binding differs');
  const captured=await import(dataURL(admission.source(roles.self).data));
  await captured.prepareCurrentCircularLadder({root,args,originalBindings:admission.bindings,began,completionEnd,controller,guard,check,
    setOwners:(process,memory)=>{processOwner=process;memoryOwner=memory;},markWorkStarted:()=>{workStarted=true;}});
 }catch(error){failure=error;}
 const closed=!workStarted||(processOwner?.snapshot().probes.every(row=>row.closed)&&memoryOwner?.snapshot().probes.every(row=>row.closed));
 if(closed){guardClosed=true;await guard.terminate();process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}
 if(failure){console.error(failure.stack);process.exitCode=1;}
}
export async function prepareCurrentCircularLadder({root,args,originalBindings,began,completionEnd,controller,guard,check,setOwners,markWorkStarted}) {
 const admission=await circularAdmission(root,args['--source-map-sha256'],originalBindings);
 demand(import.meta.url===dataURL(admission.source(roles.self).data),'captured circular ladder preparer required');
 let processOwner,memoryOwner,output;
  const {captureCircularFile,createCircularObservationOwner}=await import(dataURL(admission.source(roles.processOwner).data));
  const sources=Object.entries(roles).map(([role,filename])=>({role,...admission.source(filename)}));
  sources.push(...admission.bindings);
  const nodeImages=process.report.getReport().sharedObjects.filter(p=>!p.startsWith('/System/')&&!p.startsWith('/usr/lib/')).map(filename=>captureCircularFile(filename));
  sources.push(...nodeImages.map(row=>({role:'nodeRuntime',...row})));
  sources.push({role:'nodeExecutable',...captureCircularFile(process.execPath)});
  const get=role=>sources.find(row=>row.role===role);
  const rung=await import(dataURL(get('rung').data)),{createCircularMemoryOwner}=await import(dataURL(get('memoryOwner').data));
  const selection={path:path.resolve(root,args['--pilot-review']),sha256:args['--pilot-review-sha256']};
  const review=captureCircularFile(selection.path,selection.sha256);const reviewValue=JSON.parse(review.data);
  const joint=captureCircularFile(reviewValue.joint.path,reviewValue.joint.sha256),jointValue=JSON.parse(joint.data);
  const authority=rung.acceptCurrentCircularPilot({...joint,value:jointValue},{...review,value:reviewValue},selection);
  const ledger=captureCircularFile(authority.admission.summary.path,authority.admission.summary.sha256),ledgerValue=JSON.parse(ledger.data);
  demand(ledgerValue.accepted&&ledgerValue.phaseCount===32&&ledgerValue.rowCount===2448,'complete current pilot summary required');
  const dispositions=currentCircularDispositions(rung.SUBFIELD_CIRCULAR_IDS,reviewValue.candidateCosts);
  sources.push({...review,role:'pilotReview'},{...joint,role:'pilotAdmission'},{...ledger,role:'pilotSummary'});
  const base=path.join(root,'.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1');output=path.resolve(root,args['--out']);demand(path.dirname(output)===base&&!existsSync(output)&&realpathSync(base)===base,'fresh direct output child required');admission.recheck();mkdirSync(output);
  const python=path.resolve(root,process.env.AAA_VENV??'../.venv','bin/python');
  const shared={python,sources,root,completionEnd,signal:controller.signal};
  processOwner=createCircularObservationOwner({...shared,helper:get('processHelper').path,began});
  memoryOwner=createCircularMemoryOwner({...shared,helper:get('memoryHelper').path,capture:captureCircularFile});
  setOwners(processOwner,memoryOwner);markWorkStarted();await processOwner.initialize();const table=await processOwner.inspect({remainingMs:2500,originalDeadlineMs:completionEnd,cleanup:false});
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
  admission.recheck();
  const receipt={schema:'circular-current-ladder-preparation.v1',accepted:resourceObservation.accepted&&memoryReceipt.closed&&processReceipt.closed,h3EvidenceEligible:false,laterLadderAuthorized:false,sourceMap:admission.sourceMap,sourceBindings:admission.bindings,
   plan:captureCircularFile(planPath),resourceObservation,memory:memoryReceipt,process:processReceipt,elapsedSeconds:(performance.now()-began)/1000,conditionalOn:'exact external owner zero exit before original60seconddeadline'};
  delete receipt.plan.data;writeFileSync(path.join(output,'preflight.json'),JSON.stringify(receipt)+'\n',{flag:'wx'});check();processOwner.recheck();memoryOwner.recheck();admission.recheck();
  await new Promise((resolve,reject)=>process.stdout.write(JSON.stringify({accepted:receipt.accepted,laterLadderAuthorized:false,out:output})+'\n',error=>error?reject(error):resolve()));check();
  if(!receipt.accepted)throw Error(resourceObservation.failure??'resource preflight rejected');
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main();
