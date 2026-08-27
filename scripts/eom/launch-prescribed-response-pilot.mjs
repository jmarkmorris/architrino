// Two separately closed registered stages: compute, then pure publication.
// This supervisor performs no response mathematics, root search or evolution.
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync, mkdirSync,
  openSync, readSync, realpathSync, statfsSync, unlinkSync, writeSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const SELF="scripts/eom/launch-prescribed-response-pilot.mjs",ENTRY="scripts/eom/run-prescribed-response-pilot.mjs";
const OUTER="scripts/eom/launch-abc-enclosed-root-pilot.mjs";
const OUTER_SHA="5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa";
const LIMIT_MS=1800000,LOG_LIMIT=16*1024**2,OUTPUT_LIMIT=8*1024**2,RSS_LIMIT=2*1024**3;
const SHARED_LOCK_LANE=".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827";
const check=(yes,message)=>{if(!yes)throw new Error(message);};
const sha=b=>createHash("sha256").update(b).digest("hex");
const elapsed=began=>(performance.now()-began)/1000;
const sourceURL=b=>"data:text/javascript;base64,"+Buffer.from(b).toString("base64");
const sameFile=(a,b)=>["dev","ino","size","mtimeMs","ctimeMs"].every(k=>a[k]===b[k]);
export function captureSource(filename,expected) {
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try {
    const before=fstatSync(fd);check(before.isFile()&&before.size>0&&before.size<=1024**2,"bounded composition source required");
    const bytes=Buffer.alloc(before.size);let at=0;
    while(at<bytes.length){const n=readSync(fd,bytes,at,bytes.length-at,at);check(n>0,"composition source truncated");at+=n;}
    check(sameFile(before,fstatSync(fd))&&sameFile(before,lstatSync(filename))&&sha(bytes)===expected,"composition generation differs");
    return {path:filename,sha256:expected,bytes:bytes.length,data:bytes};
  }finally{closeSync(fd);}
}
export function parseObservation(text) {
  return text.split("\n").filter(x=>x.trim()).map(line=>{
    const m=/^\s*(\d+)\s+(\d+)\s+(\d+)\s+([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(\S+)\s+(\d+)\s+(.+)$/u.exec(line);
    check(m,"malformed owned-process/RSS observation");
    const row={pid:Number(m[1]),ppid:Number(m[2]),pgid:Number(m[3]),started:m[4].replace(/\s+/gu," "),state:m[5],rssBytes:Number(m[6])*1024,command:m[7]};
    check([row.pid,row.ppid,row.pgid,row.rssBytes].every(Number.isSafeInteger)&&row.pid>0&&row.rssBytes>=0,"invalid process/RSS integers");return row;
  });
}
export function parseHostResource(stdout,disk,launch) {
  const rows=stdout.split(/\r?\n/u).filter(x=>x.includes("System-wide memory free percentage:"));
  check(rows.length===1&&/^System-wide memory free percentage: \d+%$/u.test(rows[0]),"invalid memory-pressure observation");
  const free=Number(rows[0].match(/(\d+)%$/u)[1]);
  check(Number.isInteger(free)&&free<=100&&free>=(launch?40:20)&&typeof disk==="bigint"&&disk>=BigInt(launch?64:16)*1024n**3n,"host memory/disk resource stop");
  return {freePercent:free,availableDiskBytes:String(disk),atLaunch:launch};
}
export function selectOwnedRows(table,pid,owners,outer,exclude=new Set()) {
  check(table.some(r=>r.pid===pid),"launcher absent from process observation");
  const descendants=outer.descendantRecords(table,pid,[]);
  for(const row of descendants) if(row.pgid===row.pid&&row.pid!==pid&&!exclude.has(row.pid)&&!owners.has(row.pgid))
    owners.set(row.pgid,{identity:row,knownMembers:[row]});
  const extra=[...owners.values()].flatMap(owner=>outer.currentOwnedGroup(table,owner));
  const unique=new Map([...descendants,...extra].filter(r=>!exclude.has(r.pid)).map(r=>[r.pid,r]));
  return [...unique.values()];
}
export function acceptRSS(state,rows,stampMs,sampleStartedMs=stampMs) {
  check(Number.isFinite(stampMs)&&rows.length>0,"missing RSS sample");
  const gap=state.lastSampleMs===null?(state.beganMs===undefined?0:stampMs-state.beganMs):stampMs-(state.lastSampleStartedMs??state.lastSampleMs);
  check(sampleStartedMs<=stampMs&&gap>=0&&gap<=1000,"aggregate RSS observation gap exceeded one second");
  const sum=rows.reduce((n,r)=>n+r.rssBytes,0);
  check(Number.isSafeInteger(sum)&&sum>0&&sum<RSS_LIMIT,"aggregate owned memory resource stop");
  state.maximumSampleGapMs=Math.max(state.maximumSampleGapMs,gap);state.maximumSampledRSSBytes=Math.max(state.maximumSampledRSSBytes,sum);
  state.lastSampleMs=stampMs;state.lastSampleStartedMs=sampleStartedMs;state.samples++;
  return {aggregateResidentBytes:sum,sampleGapMs:gap,processes:rows.map(({pid,pgid,started,rssBytes})=>({pid,pgid,started,rssBytes}))};
}
export function admitFinalObservation(state,nowMs) {
  const gap=nowMs-state.lastSampleStartedMs;
  check(state.samples>0&&Number.isFinite(gap)&&gap>=0&&gap<=1000,"final observation-to-closure gap exceeded one second");
  return gap;
}
export function startupAbortInspection(inspect,signal) {
  let consumed=false;
  const reject=()=>{if(signal.aborted&&!consumed){consumed=true;throw signal.reason??new Error("startup interrupted");}};
  return async()=>{reject();const rows=await inspect();reject();return rows;};
}
export async function runFileWorker(job,bytes,remainingMs,signal) {
  check(Number.isInteger(remainingMs)&&remainingMs>0&&remainingMs<=LIMIT_MS,"positive remaining worker budget required");
  check(!signal.aborted,"worker already interrupted");
  const worker=new Worker(`const{parentPort,workerData}=require('node:worker_threads');
    import('data:text/javascript;base64,'+Buffer.from(workerData.bytes).toString('base64'))
    .then(m=>{const job=workerData.job;
      if(job.stdoutPath){job.stdout=m.clean(m.readBound(job.stdoutPath,undefined,false,16*1024**2));delete job.stdoutPath;}
      return m.fileOperation(job);}).then(value=>parentPort.postMessage({value}))
    .catch(error=>parentPort.postMessage({failure:String(error.message)}));`,{eval:true,execArgv:[],workerData:{bytes,job}});
  let timer,listener;
  try{return await new Promise((resolve,reject)=>{
    listener=()=>reject(signal.reason??new Error("file worker interrupted"));signal.addEventListener("abort",listener,{once:true});if(signal.aborted)listener();
    timer=setTimeout(()=>reject(new Error("file worker deadline")),remainingMs);
    worker.once("message",m=>m.failure?reject(new Error(m.failure)):resolve(m.value));worker.once("error",reject);
    worker.once("exit",code=>reject(new Error("file worker closed without result: "+code)));
  });}finally{await worker.terminate();clearTimeout(timer);signal.removeEventListener("abort",listener);}
}
export function reserveLock(filename,identity) {
  check(Number.isSafeInteger(identity.pid)&&identity.pid>0&&typeof identity.started==="string","lock process identity required");
  const fd=openSync(filename,"wx",0o600),bytes=Buffer.from(JSON.stringify({pid:identity.pid,started:identity.started})+"\n");
  try{let at=0;while(at<bytes.length){const n=writeSync(fd,bytes,at);check(n>0,"lock write made no progress");at+=n;}fsyncSync(fd);const own=fstatSync(fd);return {path:filename,dev:own.dev,ino:own.ino};}finally{closeSync(fd);}
}
export function releaseLock(lock) {
  if(!lock)return;
  const now=lstatSync(lock.path);check(now.isFile()&&now.dev===lock.dev&&now.ino===lock.ino,"owned lock was replaced; not removed");unlinkSync(lock.path);
}
export function assertNoCompetingPilot(table,ownPid) {
  const own=new Set([ownPid]);let changed;
  do{changed=false;for(const r of table)if(own.has(r.ppid)&&!own.has(r.pid)){own.add(r.pid);changed=true;}}while(changed);
  check(!table.some(r=>!own.has(r.pid)&&/(?:reduce|publish)-prescribed-acceleration-response\.py|(?:run|launch)-(?:f6c-root-cover|prescribed-response)-pilot\.mjs|prepare-f6c-continuous-reception-root-cover\.py/u.test(r.command)),"competing response/root-cover pilot observed");
}
export function boundedLogAppend(fd,bytes,totals) {
  bytes=Buffer.from(bytes);check(totals.bytes+bytes.length<=LOG_LIMIT,"combined operational log limit");
  let at=0;while(at<bytes.length){const n=writeSync(fd,bytes,at);check(n>0,"log write made no progress");at+=n;}totals.bytes+=bytes.length;
}
function statRegular(filename,limit) {
  if(!existsSync(filename))return 0;
  const s=lstatSync(filename);check(s.isFile()&&s.size<=limit,"named output/log type or byte bound: "+filename);return s.size;
}
export async function launchCaptured({root,options,self,entry,outerBytes,began,deadlineNanoseconds,startedAt=new Date(Date.now()-(performance.now()-began)).toISOString()}) {
  check(import.meta.url===sourceURL(self.data)&&sha(self.data)===options.launcherSha256,"executing launcher generation differs");
  const C=await import(sourceURL(entry.data)),outer=await import(sourceURL(outerBytes));
  const output=path.resolve(root,options.output),lane=path.join(root,C.LANE),operationalOutput=output+"-outer";
  check(path.dirname(output)===lane&&/^prescribed-response-[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(path.basename(output))&&
    !existsSync(output)&&!existsSync(operationalOutput)&&realpathSync(lane)===lane,"fresh direct child of canonical response lane required");
  const lockLane=path.join(root,SHARED_LOCK_LANE);check(realpathSync(lockLane)===lockLane,"canonical shared pilot-lock lane required");
  const abort=new AbortController(),owners=new Map(),probes=new Set(),pending=new Set(),hostObservations=[],stages=[];
  const rss={beganMs:began,lastSampleMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0};
  let failure,activeOuter=false,timer,deadlineTimer,hostJob,rssJob,lock,logFD,monitorFD,reserved=false,publication,completion;
  let currentStage="preflight",publicationJob,computeExecution,stdioTotal={bytes:0},monitorTotal={bytes:0};
  const originalError=console.error;
  const remaining=()=>Math.floor(LIMIT_MS-(performance.now()-began));
  const live=()=>{check(!failure&&!abort.signal.aborted, failure?.message??"pilot interrupted");check(remaining()>0,"inclusive pilot deadline");};
  const fail=error=>{failure??=error;abort.abort(failure);if(activeOuter)process.emit("SIGTERM");};
  const interrupt=()=>{if(!abort.signal.aborted)fail(new Error("operator interrupted pilot"));};
  const log=record=>{const raw=Buffer.from(typeof record==="string"?record+"\n":JSON.stringify(record)+"\n");
    boundedLogAppend(logFD,raw,stdioTotal);process.stderr.write(raw);};
  const monitoredFiles=()=>["compute-process/runner-stdout.log","compute-process/runner-stderr.log","publisher-process/runner-stdout.log","publisher-process/runner-stderr.log"].map(n=>path.join(operationalOutput,n));
  const logBytes=()=>{const size=stdioTotal.bytes+monitorTotal.bytes+monitoredFiles().reduce((n,p)=>n+statRegular(p,LOG_LIMIT),0)+statRegular(path.join(operationalOutput,"pilot-rejection.json"),LOG_LIMIT);
    check(size<=LOG_LIMIT,"combined operational logs exceed16MiB");return size;};
  const pollOutputs=()=>{
    for(const p of ["private-candidate.json","response.json"])statRegular(path.join(output,p),OUTPUT_LIMIT);
    statRegular(path.join(output,"rejection.json"),LOG_LIMIT);
    statRegular(path.join(operationalOutput,"publisher-job.json"),OUTPUT_LIMIT);
    logBytes();
  };
  const probe=(command,args,timeout,maxBuffer)=>{
    const promise=new Promise((resolve,reject)=>{
      const child=execFile(command,args,{encoding:"utf8",timeout,killSignal:"SIGKILL",maxBuffer,env:{...process.env,LC_ALL:"C"}},(error,text)=>{
        probes.delete(child.pid);error?reject(error):resolve({text,pid:child.pid});
      });if(command==="/bin/ps")probes.add(child.pid);
    });pending.add(promise);promise.finally(()=>pending.delete(promise)).catch(()=>{});return promise;
  };
  const observeTable=async()=>{
    const startedMs=performance.now(),result=await probe("/bin/ps",["-axo","pid=,ppid=,pgid=,lstart=,stat=,rss=,args="],500,8*1024**2);
    const table=parseObservation(result.text).filter(row=>row.pid!==result.pid);
    Object.defineProperty(table,"sampleStartedMs",{value:startedMs});return table;
  };
  const recordRSS=table=>{
    const owned=selectOwnedRows(table,process.pid,owners,outer,probes),value=acceptRSS(rss,owned,performance.now(),table.sampleStartedMs);
    boundedLogAppend(monitorFD,Buffer.from(JSON.stringify({kind:"aggregate-rss",elapsedSeconds:elapsed(began),stage:currentStage,...value})+"\n"),monitorTotal);
    pollOutputs();return value;
  };
  const inspect=async()=>{const table=await observeTable();if(!abort.signal.aborted)try{recordRSS(table);}catch(e){fail(e);throw e;}
    return table.map(({rssBytes,...row})=>row);};
  const host=async launch=>{
    const stamp={kind:"host-resource",elapsedSeconds:elapsed(began),atLaunch:launch};
    try{const {text}=await probe("/usr/bin/memory_pressure",[],2000,1024**2),disk=statfsSync(root,{bigint:true});
      Object.assign(stamp,parseHostResource(text,disk.bavail*disk.bsize,launch));hostObservations.push(stamp);log(stamp);pollOutputs();}
    catch(error){fail(error);throw error;}
  };
  const worker=job=>runFileWorker({...job,deadlineNanoseconds},entry.data,remaining(),abort.signal);
  const stopMonitors=async()=>{clearInterval(timer);clearTimeout(deadlineTimer);if(hostJob)await hostJob;if(rssJob)await rssJob;await Promise.allSettled([...pending]);};
  try {
    // Reservations precede timers/listeners; failure here cannot strand a heartbeat.
    mkdirSync(operationalOutput,{mode:0o700});reserved=true;
    logFD=openSync(path.join(operationalOutput,"launcher-stderr.log"),"wx",0o600);monitorFD=openSync(path.join(operationalOutput,"resource-observations.ndjson"),"wx",0o600);
    console.error=(...args)=>{try{log(args.map(v=>typeof v==="string"?v:JSON.stringify(v)).join(" "));}catch(e){fail(e);}};
    process.on("SIGINT",interrupt);process.on("SIGTERM",interrupt);
    deadlineTimer=setTimeout(()=>fail(new Error("inclusive pilot wall deadline")),Math.max(1,remaining()));
    let nextHost=performance.now()+15000,nextHeartbeat=nextHost;
    timer=setInterval(()=>{
      try {
        if(rss.lastSampleMs!==null&&performance.now()-rss.lastSampleStartedMs>1000)throw new Error("aggregate RSS observation lost for over one second");
        if(!rssJob)rssJob=observeTable().then(table=>{if(!abort.signal.aborted)recordRSS(table);}).catch(fail).finally(()=>{rssJob=undefined;});
        if(performance.now()>=nextHost&&!hostJob){nextHost=performance.now()+15000;hostJob=host(false).catch(fail).finally(()=>{hostJob=undefined;});}
        if(performance.now()>=nextHeartbeat){nextHeartbeat=performance.now()+15000;log({kind:"prescribed-response-pilot-heartbeat",stage:currentStage,elapsedSeconds:elapsed(began),
          closedAdmittedStages:stages.filter(s=>s.admission?.accepted===true).map(s=>s.stage),maximumSampledAggregateRSSBytes:rss.maximumSampledRSSBytes,accepted:false});}
        pollOutputs();
      }catch(e){fail(e);}
    },250);
    const initial=await observeTable();recordRSS(initial);assertNoCompetingPilot(initial,process.pid);
    lock=reserveLock(path.join(lockLane,".pilot.lock"),initial.find(r=>r.pid===process.pid));
    const pre=await worker({kind:"preflight",root,output,planPath:options.plan,planSha256:options.planSha256,
      launcherSha256:options.launcherSha256,entrySha256:entry.sha256});
    const {plan,planBinding,sources}=pre;
    const context={root,output,plan,planBinding,sources,entrySha256:entry.sha256,launcherSha256:self.sha256};
    await host(true);live();
    // Resolve and retain the environment invocation path as well as real binary bytes.
    check(plan.node===realpathSync(process.execPath),"resolved Node invocation differs");
    for(const stage of ["compute","publisher"]) {
      live();currentStage=stage;
      const previous=stages[0]?.admission;
      await worker({kind:"recheck",sources});live();
      const args=["--plan",planBinding.path,"--plan-sha256",planBinding.sha256,"--entry-sha256",entry.sha256,
        "--launcher-sha256",self.sha256,"--stage",stage,"--out",output,"--deadline-ns",deadlineNanoseconds,
        "--publication-job-sha256",publicationJob?.sha256??"none"];
      activeOuter=true;
      let receipt;
      try{receipt=await outer.superviseRegisteredPilot({root,entry:ENTRY,args,sources:[{path:ENTRY,sha256:entry.sha256,bytes:entry.data}],
        output:path.join(operationalOutput,stage+"-process"),startedAtMs:began,limitMs:LIMIT_MS,heartbeatMs:15000,
        inspectProcesses:startupAbortInspection(inspect,abort.signal),
        admit:async({receipt:processReceipt,signal})=>{
          live();const stdoutPath=path.join(operationalOutput,stage+"-process/runner-stdout.log");
          return runFileWorker({...context,kind:"admit",stage,publicationJob,compute:previous,
            processReceipt,stdoutPath,deadlineNanoseconds},entry.data,remaining(),signal);
        }});}catch(error){if(error.outerReceipt)stages.push({stage,process: error.outerReceipt});throw error;}
      finally{activeOuter=false;}
      check(C.equal(receipt.stdoutLog,receipt.admission.completionLog),"fresh stdout differs from registered outer bytes");
      stages.push({stage,process:receipt,admission:receipt.admission});
      await host(false);live();
      if(stage==="compute"){
        // Snapshot only completed compute plus its private publication and cleanup.
        // The final response byte count is later derived, never pre-measured.
        recordRSS(await observeTable());live();
        computeExecution=closedComputeObservations({receipt,completion:receipt.admission.completion,
          startedAt,began,rss,logBytes:logBytes(),watcherSha256:self.sha256});
        publicationJob=await worker({...context,kind:"prepare-publication",compute:receipt.admission,
          closedProcess:receipt,execution:computeExecution});live();
      }
    }
    currentStage="final-admission";
    check(stages.length===2&&stages.every(s=>s.process.accepted===true&&s.process.processesClosed===true),"complete two-stage closure required");
    const evidence=[publicationJob,...stages.flatMap(s=>[s.process.stdoutLog,s.process.stderrLog,...s.admission.outputs])];
    await worker({kind:"recheck",sources:[...sources,...evidence]});
    if(rssJob)await rssJob;recordRSS(await observeTable());await host(false);live();
    const record={schema:"braid-program/prescribed-response-pilot-admission.v1",accepted:true,scope:"f5-release",
      authority:"source-bound prescribed release-response enclosure; independent frozen reference, no evolution",
      embeddedExecutionScope:C.EXECUTION_SCOPE,externalWholeAttemptAdmissionRequired:true,computeExecution,publicationJob,
      processesClosed:true,stages,plan:planBinding,sourceBindings:sources,observationsBeforePublication:{...rss},hostObservationsBeforePublication:[...hostObservations],
      memoryScope:"launcher including admission-worker threads plus owned descendant/bootstrap/gate groups; bounded PS probes excluded; sampled not a hard allocation cap",
      loggingBytesBeforePublication:logBytes(),elapsedSecondsBeforePublication:elapsed(began),
      publicationRequires:"matching fresh launcher completion and exit zero after final hashing, monitor/worker/lock closure within1800seconds",
      claims:Object.fromEntries(C.FALSE_CLAIMS.map(k=>[k,false])),newRootSearches:0};
    publication=await worker({...context,kind:"finalize",record,evidence});
    await host(false);recordRSS(await observeTable());live();
    // Monitoring remains active through final publication/rehashes and worker closure.
    await worker({kind:"recheck",sources:[...sources,...evidence,publication]});live();
    currentStage="watch-teardown";
    await stopMonitors();live();
    releaseLock(lock);lock=undefined;
    for(const fd of [logFD,monitorFD])fsyncSync(fd);
    const logs=["launcher-stderr.log","resource-observations.ndjson"].map(n=>C.clean(C.readBound(path.join(operationalOutput,n),undefined,false,LOG_LIMIT)));
    const totalLogBytes=logBytes();
    const rawOutputs=[...stages[0].admission.outputs,...stages[1].admission.outputs];
    live();
    // Synchronous final hashes are small bounded logs; elapsed is checked again
    // afterwards. The final line, not the stored pre-publication time, closes admission.
    completion={completed:true,accepted:true,scope:"f5-release",receipt:publication,logs,
      rawOutputBytes:rawOutputs.reduce((n,b)=>n+b.bytes,0),operationalLogBytes:totalLogBytes,
      maximumSampledAggregateRSSBytes:rss.maximumSampledRSSBytes,maximumSampleGapMs:rss.maximumSampleGapMs,samples:rss.samples,
      elapsedSeconds:elapsed(began),processesClosed:true,workerAndMonitorClosed:true,lockReleased:true,
      claims:Object.fromEntries(C.FALSE_CLAIMS.map(k=>[k,false])),newRootSearches:0,embeddedExecutionScope:C.EXECUTION_SCOPE,
      lastRSSObservationStartedAtMs:rss.lastSampleStartedMs,finalObservationToClosureMs:admitFinalObservation(rss,performance.now())};
    completion.coordinatorResourceUsage=process.resourceUsage();
    completion.cpuScope="coordinator self includes admission-worker threads; registered gate process measurements are separate; no unmeasured target CPU inferred";
    return completion;
  }catch(error){
    fail(error);await stopMonitors();
    if(reserved)try{
      const rejection={completed:false,accepted:false,scope:"f5-release",failure:String(error.message).slice(0,4096),stage:currentStage,
        closedAdmittedStages:stages.filter(s=>s.admission?.accepted===true).map(s=>s.stage),invalidatesPublication:publication??null,
        stages:stages.map(s=>({stage:s.stage,processesClosed:s.process.processesClosed??false,exit:s.process.exit??null,
          cancellationObservedPidsAbsent:s.process.cancellationObservedPidsAbsent??null,gates:s.process.gates?.map(g=>({identity:g.identity,target:g.target,acknowledged:g.acknowledged}))??[]})),
        elapsedSeconds:elapsed(began),eomExecuted:false,h3EvidenceEligible:false};
      const remainingLog=LOG_LIMIT-logBytes();check(remainingLog>0,"no rejection log budget remains");
      C.writeNew(path.join(operationalOutput,"pilot-rejection.json"),rejection,remainingLog);
    }catch(preservation){originalError("Response rejection preservation failed: "+preservation.message);}
    throw error;
  }finally{
    await stopMonitors();
    if(lock)try{releaseLock(lock);}catch(error){failure??=error;originalError(error.message);}
    console.error=originalError;process.off("SIGINT",interrupt);process.off("SIGTERM",interrupt);
    if(logFD!==undefined)closeSync(logFD);if(monitorFD!==undefined)closeSync(monitorFD);
    // A failure after the return expression still rejects the async function.
    if(failure)throw failure;
    check(performance.now()-began<LIMIT_MS&&!abort.signal.aborted,"final watch cleanup exceeded deadline");
    if(completion)completion.finalObservationToClosureMs=admitFinalObservation(rss,performance.now());
  }
}

export function closedComputeObservations({receipt,completion,startedAt,began,rss,logBytes,watcherSha256,nowMs=performance.now()}) {
  check(receipt?.accepted===true&&receipt.processesClosed===true&&receipt.exit?.code===0&&receipt.exit.signal===null,
    "compute must have successful external group closure");
  const elapsedSeconds=(nowMs-began)/1000;
  check(completion?.completed===true&&completion.accepted===false&&Number.isFinite(completion.elapsedSeconds)&&
    Number.isFinite(elapsedSeconds)&&elapsedSeconds>=completion.elapsedSeconds&&elapsedSeconds<1800,"closed compute time differs");
  admitFinalObservation(rss,nowMs);
  check(rss.maximumSampledRSSBytes>0&&rss.maximumSampledRSSBytes<RSS_LIMIT&&rss.maximumSampleGapMs<=1000&&
    Number.isSafeInteger(logBytes)&&logBytes>=0&&logBytes<=LOG_LIMIT&&/^[a-f0-9]{64}$/u.test(watcherSha256),"closed compute resources differ");
  check(typeof startedAt==="string"&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/u.test(startedAt),"actual compute start required");
  return {startedAt,elapsedSeconds,exitCode:0,processesClosed:true,heartbeatSeconds:15,
    maximumSampledGroupRssBytes:rss.maximumSampledRSSBytes,rssSampleIntervalSeconds:1,
    outputBytes:0,logBytes,watcherSha256,publicationComplete:true};
}
export async function flushCompletion(result,{began,lastSampleStartedMs,stream=process.stdout,clock=()=>performance.now()}) {
  const live=()=>{const now=clock();check(now-began<LIMIT_MS,"final stdout deadline");
    check(now-lastSampleStartedMs>=0&&now-lastSampleStartedMs<=1000,"final stdout observation gap");};
  live();const raw=Buffer.from(JSON.stringify(result)+"\n");
  check(raw.length<=1024**2&&raw.length+(result.operationalLogBytes??0)<=LOG_LIMIT,"completion plus operational log bound");
  const budget=Math.min(LIMIT_MS-(clock()-began),1000-(clock()-lastSampleStartedMs));
  check(budget>0,"no final output budget remains");
  await new Promise((resolve,reject)=>{
    let timer,settled=false;
    const detach=()=>stream.removeListener("error",onError);
    const finish=error=>{
      if(settled)return;
      if(!error)try{live();}catch(e){error=e;}
      settled=true;clearTimeout(timer);
      if(error){
        // Rejecting alone would leave a pending stdout pipe able to keep this
        // failed attempt alive. Destroy only this owned output; retain its error
        // listener through close, including a late callback or asynchronous EPIPE.
        stream.once("close",detach);stream.destroy();reject(error);
      }else{detach();resolve();}
    };
    const onError=error=>finish(error);stream.on("error",onError);
    timer=setTimeout(()=>finish(new Error("final stdout flush exceeded deadline/observation gap")),Math.max(1,Math.ceil(budget)));
    try{stream.write(raw,error=>finish(error));}catch(error){finish(error);}
  });live();
}

export function parseArgs(argv) {
  const values={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!values[argv[i]],"unique paired launch arguments required");values[argv[i]]=argv[i+1];}
  check(Object.keys(values).sort().join("|")===["--out","--plan","--plan-sha256","--launcher-sha256","--entry-sha256"].sort().join("|"),"closed launch arguments required");
  for(const key of ["--plan-sha256","--launcher-sha256","--entry-sha256"])check(/^[a-f0-9]{64}$/u.test(values[key]),"reviewed hash required");
  check(!values["--out"].split(/[\\/]/u).some(p=>p==="."||p===".."),"canonical scoped output required");
  return {output:values["--out"],plan:path.resolve(values["--plan"]),planSha256:values["--plan-sha256"],launcherSha256:values["--launcher-sha256"],entrySha256:values["--entry-sha256"]};
}
async function main() {
  const startedAt=new Date().toISOString(),began=performance.now(),deadlineNanoseconds=String(process.hrtime.bigint()+1800000000000n),options=parseArgs(process.argv.slice(2));
  const root=realpathSync(process.cwd()),self=captureSource(path.join(root,SELF),options.launcherSha256),entry=captureSource(path.join(root,ENTRY),options.entrySha256),outer=captureSource(path.join(root,OUTER),OUTER_SHA);
  // Bind observation executables before the first invocation; full source/data
  // capture and rechecks still run in watched workers before numerical dispatch.
  const C=await import(sourceURL(entry.data)),plan=C.decode(C.readBound(options.plan,options.planSha256,true,1024**2).data,1024**2);
  C.validatePlan(plan,root,options.launcherSha256,options.entrySha256);
  C.checkBindings(plan.operationalBindings.filter(b=>["/bin/ps","/usr/bin/memory_pressure",plan.node].includes(b.path)));
  const captured=await import(sourceURL(self.data));
  const result=await captured.launchCaptured({root,options,self,entry,outerBytes:outer.data,began,deadlineNanoseconds,startedAt});
  check(performance.now()-began<LIMIT_MS,"post-teardown deadline");
  check(performance.now()-result.lastRSSObservationStartedAtMs<=1000,"post-teardown observation gap");
  result.elapsedSeconds=elapsed(began);await flushCompletion(result,{began,lastSampleStartedMs:result.lastRSSObservationStartedAtMs});
  check(performance.now()-began<LIMIT_MS,"post-completion deadline");
  check(performance.now()-result.lastRSSObservationStartedAtMs<=1000,"post-completion observation gap");
}
if(import.meta.url.startsWith("file:")&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
  main().catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});
