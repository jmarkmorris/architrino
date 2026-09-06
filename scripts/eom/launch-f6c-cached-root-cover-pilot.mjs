// Two sequential registered stages. This is operational composition, not an oracle.
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync, mkdirSync,
  openSync, readSync, realpathSync, statfsSync, unlinkSync, writeSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const SELF="scripts/eom/launch-f6c-cached-root-cover-pilot.mjs",ENTRY="scripts/eom/run-f6c-cached-root-cover-pilot.mjs";
const OUTER="scripts/eom/launch-subfield-circular-root-pilot.mjs";
const OUTER_SHA="cd5b892440cba141f6aeac72fbef07f7febdc8fe28b18e813cf0d73be0633a48";
const LIMIT_MS=1800000,LOG_LIMIT=16*1024**2,FILE_LIMIT=64*1024**2,RSS_LIMIT=2*1024**3;
const check=(yes,message)=>{if(!yes)throw new Error(message);};
const sha=b=>createHash("sha256").update(b).digest("hex");
const elapsed=began=>(performance.now()-began)/1000;
const sourceURL=b=>"data:text/javascript;base64,"+Buffer.from(b).toString("base64");
const sameFile=(a,b)=>["dev","ino","size","mtimeMs","ctimeMs"].every(k=>a[k]===b[k]);
function captureSource(filename,expected) {
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
  const gap=state.lastSampleMs===null?0:stampMs-(state.lastSampleStartedMs??state.lastSampleMs);
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
export async function flushCompletion(completion,{stream=process.stdout,deadlineMs,observationStartedMs,now=()=>performance.now()}={}) {
  const until=Math.min(deadlineMs,observationStartedMs+1000);
  const live=()=>check(Number.isFinite(until)&&now()<deadlineMs&&now()-observationStartedMs<=1000,"final stdout deadline or observation gap");
  live();const bytes=Buffer.from(JSON.stringify(completion)+"\n");check(bytes.length<=1024**2,"completion line size bound");live();
  await new Promise((resolve,reject)=>{
    let settled=false,timer;
    const detach=()=>stream.removeListener("error",onError);
    const finish=error=>{
      if(settled)return;
      if(!error)try{live();}catch(e){error=e;}
      settled=true;clearTimeout(timer);
      if(error){
        // A pending stdout pipe must not keep a failed launcher alive after the
        // timer fires. Keep the error listener through stream destruction.
        stream.once("close",detach);stream.destroy();reject(error);
      }else{detach();resolve();}
    };
    const onError=error=>finish(error);stream.on("error",onError);
    timer=setTimeout(()=>finish(new Error("final stdout flush deadline or observation gap")),Math.max(1,Math.ceil(until-now())));
    try{stream.write(bytes,error=>finish(error));}catch(error){finish(error);}
  });
  live();
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
    .then(m=>m.fileOperation(workerData.job)).then(value=>parentPort.postMessage({value}))
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
  try{writeSync(fd,bytes);fsyncSync(fd);const own=fstatSync(fd);return {path:filename,dev:own.dev,ino:own.ino};}finally{closeSync(fd);}
}
export function releaseLock(lock) {
  if(!lock)return;
  const now=lstatSync(lock.path);check(now.isFile()&&now.dev===lock.dev&&now.ino===lock.ino,"owned lock was replaced; not removed");unlinkSync(lock.path);
}
export function assertNoCompetingPilot(table,ownPid) {
  const own=new Set([ownPid]);let changed;
  do{changed=false;for(const r of table)if(own.has(r.ppid)&&!own.has(r.pid)){own.add(r.pid);changed=true;}}while(changed);
  check(!table.some(r=>!own.has(r.pid)&&/reduce-prescribed-acceleration-response\.py|(?:run|launch)-f6c(?:-cached)?-root-cover-pilot\.mjs|prepare-f6c(?:-cached)?-continuous-reception-root-cover\.py/u.test(r.command)),"competing response/root-cover pilot observed");
}
export function boundedLogAppend(fd,bytes,totals) {
  bytes=Buffer.from(bytes);check(totals.bytes+bytes.length<=LOG_LIMIT,"combined operational log limit");
  let at=0;while(at<bytes.length){const n=writeSync(fd,bytes,at);check(n>0,"log write made no progress");at+=n;}totals.bytes+=bytes.length;
}
export function readProgress(filename,state) {
  if(!existsSync(filename))return state.completedRows;
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try {
    const info=fstatSync(fd);check(info.isFile()&&info.size>=state.offset&&info.size<=LOG_LIMIT,"progress log changed/truncated");
    const bytes=Buffer.alloc(Math.min(65536,info.size-state.offset));
    const n=readSync(fd,bytes,0,bytes.length,state.offset);state.offset+=n;
    state.pending+=bytes.subarray(0,n).toString("utf8");check(state.pending.length<=1024**2,"progress line limit");
    for(let end;(end=state.pending.indexOf("\n"))>=0;){
      const line=state.pending.slice(0,end);state.pending=state.pending.slice(end+1);
      let row;try{row=JSON.parse(line);}catch{continue;}// Original diagnostics remain preserved.
      if(row&&Object.hasOwn(row,"completedRows")) {
        check(Number.isSafeInteger(row.completedRows)&&row.completedRows>=state.completedRows&&row.completedRows<=64,"invalid observed row progress");
        state.completedRows=row.completedRows;
      }
    }
    return state.completedRows;
  }finally{closeSync(fd);}
}
function statRegular(filename,limit) {
  if(!existsSync(filename))return 0;
  const s=lstatSync(filename);check(s.isFile()&&s.size<=limit,"named output/log type or byte bound: "+filename);return s.size;
}
export async function launchCaptured({root,options,self,entry,outerBytes,began,deadlineNanoseconds}) {
  check(import.meta.url===sourceURL(self.data)&&sha(self.data)===options.launcherSha256,"executing launcher generation differs");
  const C=await import(sourceURL(entry.data)),outer=await import(sourceURL(outerBytes));
  const output=path.resolve(root,options.output),lane=path.join(root,C.LANE);
  check(path.dirname(output)===lane&&!existsSync(output)&&realpathSync(lane)===lane,"fresh direct child of canonical ignored pilot lane required");
  const abort=new AbortController(),owners=new Map(),probes=new Set(),pending=new Set(),hostObservations=[],stages=[];
  const rss={lastSampleMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0};
  let failure,activeOuter=false,timer,deadlineTimer,hostJob,rssJob,lock,logFD,monitorFD,reserved=false,publication,completion;
  let currentStage="preflight",completedRows=0,comparedRows=0,stdioTotal={bytes:0},monitorTotal={bytes:0};
  const progress={consumer:{offset:0,pending:"",completedRows:0},comparison:{offset:0,pending:"",completedRows:0}};
  const originalError=console.error;
  const remaining=()=>Math.floor(LIMIT_MS-(performance.now()-began));
  const live=()=>{check(!failure&&!abort.signal.aborted, failure?.message??"pilot interrupted");check(remaining()>0,"inclusive pilot deadline");};
  const fail=error=>{failure??=error;abort.abort(failure);if(activeOuter)process.emit("SIGTERM");};
  const interrupt=()=>{if(!abort.signal.aborted)fail(new Error("operator interrupted pilot"));};
  const log=record=>{const raw=Buffer.from(typeof record==="string"?record+"\n":JSON.stringify(record)+"\n");
    boundedLogAppend(logFD,raw,stdioTotal);process.stderr.write(raw);};
  const monitoredFiles=()=>["consumer-process/runner-stdout.log","consumer-process/runner-stderr.log","comparison-process/runner-stdout.log","comparison-process/runner-stderr.log"].map(n=>path.join(output,n));
  const logBytes=()=>{const size=stdioTotal.bytes+monitorTotal.bytes+monitoredFiles().reduce((n,p)=>n+statRegular(p,LOG_LIMIT),0)+statRegular(path.join(output,"pilot-rejection.json"),LOG_LIMIT);
    check(size<=LOG_LIMIT,"combined operational logs exceed16MiB");return size;};
  const pollOutputs=()=>{
    for(const p of ["subject/rows.ndjson","subject/pieces.ndjson","subject/cover-manifest.json","comparison.json"])statRegular(path.join(output,p),FILE_LIMIT);
    logBytes();
    completedRows=Math.max(completedRows,readProgress(path.join(output,"consumer-process/runner-stderr.log"),progress.consumer));
    comparedRows=Math.max(comparedRows,readProgress(path.join(output,"comparison-process/runner-stderr.log"),progress.comparison));
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
    mkdirSync(output,{mode:0o700});reserved=true;
    logFD=openSync(path.join(output,"launcher-stderr.log"),"wx",0o600);monitorFD=openSync(path.join(output,"resource-observations.ndjson"),"wx",0o600);
    console.error=(...args)=>{try{log(args.map(v=>typeof v==="string"?v:JSON.stringify(v)).join(" "));}catch(e){fail(e);}};
    process.on("SIGINT",interrupt);process.on("SIGTERM",interrupt);
    deadlineTimer=setTimeout(()=>fail(new Error("inclusive pilot wall deadline")),Math.max(1,remaining()));
    let nextHost=performance.now()+15000,nextHeartbeat=nextHost;
    timer=setInterval(()=>{
      try {
        if(rss.lastSampleMs!==null&&performance.now()-rss.lastSampleStartedMs>1000)throw new Error("aggregate RSS observation lost for over one second");
        if(!rssJob)rssJob=observeTable().then(table=>{if(!abort.signal.aborted)recordRSS(table);}).catch(fail).finally(()=>{rssJob=undefined;});
        if(performance.now()>=nextHost&&!hostJob){nextHost=performance.now()+15000;hostJob=host(false).catch(fail).finally(()=>{hostJob=undefined;});}
        if(performance.now()>=nextHeartbeat){nextHeartbeat=performance.now()+15000;log({kind:"f6c-pilot-heartbeat",stage:currentStage,elapsedSeconds:elapsed(began),
          completedConditionalRows:completedRows,independentlyComparedRows:comparedRows,maximumSampledAggregateRSSBytes:rss.maximumSampledRSSBytes,accepted:false});}
        pollOutputs();
      }catch(e){fail(e);}
    },250);
    const initial=await observeTable();recordRSS(initial);assertNoCompetingPilot(initial,process.pid);
    lock=reserveLock(path.join(lane,".pilot.lock"),initial.find(r=>r.pid===process.pid));
    const pre=await worker({kind:"preflight",root,planPath:options.plan,planSha256:options.planSha256,
      launcherSha256:options.launcherSha256,entrySha256:entry.sha256});
    const {plan,planBinding,sources}=pre;
    await host(true);live();
    // Resolve and retain the environment invocation path as well as real binary bytes.
    check(plan.node===realpathSync(process.execPath),"resolved Node invocation differs");
    for(const stage of ["consumer","comparison"]) {
      live();currentStage=stage;
      const previous=stages[0]?.admission,manifest=previous?.outputs[2];
      await worker({kind:"recheck",sources});live();
      const args=["--plan",planBinding.path,"--plan-sha256",planBinding.sha256,"--entry-sha256",entry.sha256,
        "--launcher-sha256",self.sha256,"--stage",stage,"--out",output,"--deadline-ns",deadlineNanoseconds,
        "--manifest-sha256",manifest?.sha256??"none"];
      activeOuter=true;
      let receipt;
      try{receipt=await outer.superviseRegisteredPilot({root,entry:ENTRY,args,sources:[{path:ENTRY,sha256:entry.sha256,bytes:entry.data}],
        output:path.join(output,stage+"-process"),startedAtMs:began,limitMs:LIMIT_MS,heartbeatMs:15000,
        inspectProcesses:startupAbortInspection(inspect,abort.signal),
        admit:async({receipt:processReceipt,signal})=>{
          live();const stdout={path:path.join(output,stage+"-process/runner-stdout.log")};
          return runFileWorker({kind:"admit",root,stage,plan,planBinding,output,manifest,consumer:previous,
            processReceipt,stdout,sources,deadlineNanoseconds},entry.data,remaining(),signal);
        }});}catch(error){if(error.outerReceipt)stages.push({stage,process: error.outerReceipt});throw error;}
      finally{activeOuter=false;}
      check(C.equal(receipt.stdoutLog,receipt.admission.completionLog),"fresh stdout differs from registered outer bytes");
      check(C.equal(receipt.stderrLog,receipt.admission.resources.stderr),"fresh resource log differs from registered outer bytes");
      stages.push({stage,process:receipt,admission:receipt.admission});
      if(stage==="consumer")completedRows=64;else comparedRows=64;
      await host(false);live();
    }
    currentStage="final-admission";
    check(stages.length===2&&stages.every(s=>s.process.accepted===true&&s.process.processesClosed===true),"complete two-stage closure required");
    const evidence=[...stages.flatMap(s=>[s.process.stdoutLog,s.process.stderrLog,...s.admission.outputs])];
    await worker({kind:"recheck",sources:[...sources,...evidence]});
    if(rssJob)await rssJob;recordRSS(await observeTable());await host(false);live();
    const record={schema:"braid-program/f6c-cached-root-cover-pilot-admission.v1",accepted:true,scope:"pilot-cell-0",
      authority:"source-bound one-cell conditional reconstructed-family coverage with separate frozen comparison",
      processesClosed:true,stages,plan:planBinding,sourceBindings:sources,observationsBeforePublication:{...rss},hostObservationsBeforePublication:[...hostObservations],
      memoryScope:"launcher including admission-worker threads plus owned descendant/bootstrap/gate groups; bounded PS probes excluded; sampled not a hard allocation cap",
      loggingBytesBeforePublication:logBytes(),elapsedSecondsBeforePublication:elapsed(began),
      publicationRequires:"matching fresh launcher completion and exit zero after final hashing, monitor/worker/lock closure within1800seconds",
      eomExecuted:false,h3EvidenceEligible:false,metricsAvailable:false,fullRunAuthorized:false,historicalTrajectoryIdentityEstablished:false};
    publication=await worker({kind:"finalize",output,record,sources,evidence});
    await host(false);recordRSS(await observeTable());live();
    // Monitoring remains active through final publication/rehashes and worker closure.
    await worker({kind:"recheck",sources:[...sources,...evidence,publication]});live();
    currentStage="watch-teardown";
    await stopMonitors();live();
    releaseLock(lock);lock=undefined;
    for(const fd of [logFD,monitorFD])fsyncSync(fd);
    const logs=["launcher-stderr.log","resource-observations.ndjson"].map(n=>C.clean(C.readBound(path.join(output,n),undefined,false,LOG_LIMIT)));
    const totalLogBytes=logBytes();
    const rawOutputs=[...stages[0].admission.outputs,...stages[1].admission.outputs];
    live();
    // Synchronous final hashes are small bounded logs; elapsed is checked again
    // afterwards. The final line, not the stored pre-publication time, closes admission.
    completion={completed:true,accepted:true,scope:"pilot-cell-0",receipt:publication,logs,
      rawOutputBytes:rawOutputs.reduce((n,b)=>n+b.bytes,0),operationalLogBytes:totalLogBytes,
      maximumSampledAggregateRSSBytes:rss.maximumSampledRSSBytes,maximumSampleGapMs:rss.maximumSampleGapMs,samples:rss.samples,
      elapsedSeconds:elapsed(began),processesClosed:true,workerAndMonitorClosed:true,lockReleased:true,
      eomExecuted:false,h3EvidenceEligible:false,fullRunAuthorized:false,
      lastRSSObservationStartedAtMs:rss.lastSampleStartedMs,finalObservationToClosureMs:admitFinalObservation(rss,performance.now())};
    completion.coordinatorResourceUsage=process.resourceUsage();
    completion.cpuScope="coordinator self includes worker threads; stage Python/entry/gate CPU and Python waited-child CPU retained separately without double-counting";
    return completion;
  }catch(error){
    fail(error);await stopMonitors();
    if(reserved)try{
      const rejection={completed:false,accepted:false,scope:"pilot-cell-0",failure:String(error.message).slice(0,4096),stage:currentStage,
        completedConditionalRows:completedRows,independentlyComparedRows:comparedRows,invalidatesPublication:publication??null,
        stages:stages.map(s=>({stage:s.stage,processesClosed:s.process.processesClosed??false,exit:s.process.exit??null,
          cancellationObservedPidsAbsent:s.process.cancellationObservedPidsAbsent??null,gates:s.process.gates?.map(g=>({identity:g.identity,target:g.target,acknowledged:g.acknowledged}))??[]})),
        elapsedSeconds:elapsed(began),eomExecuted:false,h3EvidenceEligible:false};
      const remainingLog=LOG_LIMIT-logBytes();check(remainingLog>0,"no rejection log budget remains");
      C.writeNew(path.join(output,"pilot-rejection.json"),rejection,remainingLog);
    }catch(preservation){originalError("F6c rejection preservation failed: "+preservation.message);}
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
export function parseArgs(argv) {
  const values={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!values[argv[i]],"unique paired launch arguments required");values[argv[i]]=argv[i+1];}
  check(Object.keys(values).sort().join("|")===["--out","--plan","--plan-sha256","--launcher-sha256","--entry-sha256"].sort().join("|"),"closed launch arguments required");
  for(const key of ["--plan-sha256","--launcher-sha256","--entry-sha256"])check(/^[a-f0-9]{64}$/u.test(values[key]),"reviewed hash required");
  check(!values["--out"].split(/[\\/]/u).some(p=>p==="."||p===".."),"canonical scoped output required");
  return {output:values["--out"],plan:path.resolve(values["--plan"]),planSha256:values["--plan-sha256"],launcherSha256:values["--launcher-sha256"],entrySha256:values["--entry-sha256"]};
}
async function main() {
  const began=performance.now(),deadlineNanoseconds=String(process.hrtime.bigint()+1800000000000n),options=parseArgs(process.argv.slice(2));
  const root=realpathSync(process.cwd()),self=captureSource(path.join(root,SELF),options.launcherSha256),entry=captureSource(path.join(root,ENTRY),options.entrySha256),outer=captureSource(path.join(root,OUTER),OUTER_SHA);
  // Bind observation executables before the first invocation; full source/data
  // capture and rechecks still run in watched workers before numerical dispatch.
  const C=await import(sourceURL(entry.data)),plan=JSON.parse(C.readBound(options.plan,options.planSha256,true,1024**2).data);
  C.validatePlan(plan,root,options.launcherSha256,options.entrySha256);
  C.checkBindings(plan.operationalBindings.filter(b=>["/bin/ps","/usr/bin/memory_pressure",plan.node].includes(b.path)));
  const captured=await import(sourceURL(self.data));
  const result=await captured.launchCaptured({root,options,self,entry,outerBytes:outer.data,began,deadlineNanoseconds});
  check(performance.now()-began<LIMIT_MS,"post-teardown deadline");
  check(performance.now()-result.lastRSSObservationStartedAtMs<=1000,"post-teardown observation gap");
  result.elapsedSeconds=elapsed(began);
  await flushCompletion(result,{deadlineMs:began+LIMIT_MS,observationStartedMs:result.lastRSSObservationStartedAtMs});
  check(performance.now()-began<LIMIT_MS,"post-completion deadline");
  check(performance.now()-result.lastRSSObservationStartedAtMs<=1000,"post-completion observation gap");
}
if(import.meta.url.startsWith("file:")&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
  main().catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});
