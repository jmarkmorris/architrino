// Nonmathematical, one-cell serial consumer/comparison composition. The reused
// F5 module supplies only reviewed process/resource/publication helper functions.
import {execFile} from 'node:child_process';
import {createHash} from 'node:crypto';
import {closeSync,constants,existsSync,fstatSync,fsyncSync,lstatSync,mkdirSync,openSync,
  readSync,readdirSync,realpathSync,statfsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const SELF='scripts/eom/launch-f6c-refined-acceleration-pilot.mjs',ENTRY='scripts/eom/run-f6c-refined-acceleration-pilot.mjs';
const HELPERS='scripts/eom/launch-prescribed-response-pilot.mjs',OUTER='scripts/eom/launch-abc-enclosed-root-pilot.mjs';
const HELPER_SHA='a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9';
const OUTER_SHA='5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa';
const LIMIT_MS=1800000,FILE_LIMIT=64*1024**2,LOG_LIMIT=16*1024**2;
const check=(yes,message)=>{if(!yes)throw Error(message);};
const sha=b=>createHash('sha256').update(b).digest('hex');
const url=bytes=>'data:text/javascript;base64,'+Buffer.from(bytes).toString('base64');
const elapsed=began=>(performance.now()-began)/1000;
export function captureBootstrapSource(filename,expected){
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try{const before=fstatSync(fd,{bigint:true});check(before.isFile()&&before.size>0n&&before.size<=1024n**2n,'bounded source');
    const data=Buffer.alloc(Number(before.size));let at=0;while(at<data.length){const n=readSync(fd,data,at,data.length-at,at);check(n>0,'truncated source');at+=n;}
    const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
    check(identity(before)===identity(fstatSync(fd,{bigint:true}))&&identity(before)===identity(lstatSync(filename,{bigint:true}))&&sha(data)===expected,'source generation differs');return {path:filename,sha256:expected,bytes:data.length,data};
  }finally{closeSync(fd);}
}
export async function reviewedHelpers(bytes){check(sha(bytes)===HELPER_SHA,'reviewed helper generation differs');return import(url(bytes));}
export function assertNoCompetitor(table,pid){
  const own=new Set([pid]);let changed;
  do{changed=false;for(const row of table)if(own.has(row.ppid)&&!own.has(row.pid)){own.add(row.pid);changed=true;}}while(changed);
  const programs=/(?:run|launch)-f6c-refined-acceleration-pilot\.mjs|(?:prepare|verify)-f6c-refined-acceleration\.py|(?:run|launch)-f6c-emission-refinement-pilot\.mjs|(?:prepare|verify)-f6c-emission-refinement\.py|(?:reduce|publish)-prescribed-acceleration-response\.py|(?:run|launch)-prescribed-response-pilot\.mjs|(?:run|launch)-f6c(?:-cached)?-root-cover-(?:pilot|full)\.mjs|(?:prepare|verify)-f6c(?:-cached)?-continuous-reception-root-cover\.py|(?:run|launch)-f6c-acceleration-pilot\.mjs|(?:prepare|verify)-f6c-continuous-reception-acceleration\.py/u;
  check(!table.some(row=>!own.has(row.pid)&&programs.test(row.command)),'competing F5/F6c computation observed');
}
function size(filename,limit){if(!existsSync(filename))return 0;const stat=lstatSync(filename);check(stat.isFile()&&stat.size<=limit,'named output/log type or size');return stat.size;}
function privateCandidates(directory,prefix){if(!existsSync(directory))return;const names=readdirSync(directory).filter(name=>name.startsWith(prefix));check(names.length<=1,'unexpected repeated private publication');for(const name of names)size(path.join(directory,name),FILE_LIMIT);}
export async function ignoredOutputs(git,root,output){
  check(path.dirname(output)===path.join(root,'.local-data/braid-analysis/f6c-refined-acceleration-20260827'),'scoped ignored output');
  for(const target of [output,output+'-outer'])await new Promise((resolve,reject)=>{
    execFile(git,['check-ignore','-q','--',path.relative(root,target)],{cwd:root,timeout:2000,killSignal:'SIGKILL',maxBuffer:4096},error=>error?reject(error):resolve());
  });
}
export async function drainDiagnostics({stream=process.stderr,began,lastSampleStartedMs,clock=()=>performance.now()}={}){
  const live=()=>{const now=clock();check(now-began<LIMIT_MS&&now-lastSampleStartedMs>=0&&now-lastSampleStartedMs<=1000,'final stderr deadline/observation gap');};
  live();const budget=Math.min(LIMIT_MS-(clock()-began),1000-(clock()-lastSampleStartedMs));check(budget>0,'no stderr flush budget');
  await new Promise((resolve,reject)=>{let timer,settled=false;
    const detach=()=>stream.removeListener('error',onError);
    const finish=error=>{if(settled)return;if(!error)try{live();}catch(cause){error=cause;}settled=true;clearTimeout(timer);
      if(error){stream.once('close',detach);stream.destroy();reject(error);}else{detach();resolve();}};
    const onError=error=>finish(error);stream.on('error',onError);
    timer=setTimeout(()=>finish(Error('final stderr flush deadline/observation gap')),Math.max(1,Math.ceil(budget)));
    // An ordered zero-byte write waits behind every previously mirrored log.
    try{stream.write(Buffer.alloc(0),error=>finish(error));}catch(error){finish(error);}
  });live();
}
export async function terminalFailure(error,{stream=process.stderr,began,clock=()=>performance.now()}={}){
  // No successful admission remains. Preserve the durable operation log, then
  // either flush this bounded final diagnostic or request owned-stream destroy.
  // Node stdio may suppress actual fd closure; failedCLICompletion handles that.
  if(stream.destroyed)return;
  const budget=Math.min(1000,LIMIT_MS-(clock()-began));
  if(!(budget>0)){stream.on('error',()=>{});stream.destroy();return;}
  const bytes=Buffer.from(JSON.stringify({completed:false,accepted:false,failure:String(error.message).slice(0,4096)})+'\n');
  await new Promise(resolve=>{let timer,settled=false;
    const detach=()=>stream.removeListener('error',onError);
    const finish=failed=>{if(settled)return;settled=true;clearTimeout(timer);
      if(failed||clock()-began>=LIMIT_MS){stream.once('close',detach);stream.destroy();}else detach();resolve();};
    const onError=()=>finish(true);stream.on('error',onError);
    timer=setTimeout(()=>finish(true),Math.max(1,Math.ceil(budget)));
    try{stream.write(bytes,error=>finish(Boolean(error)));}catch{finish(true);}
  });
}
export async function failedCLICompletion(error,{exit=code=>process.exit(code),...options}={}){
  // CLI only: launchCaptured's bounded cleanup attempts have finished, or the
  // failure preceded any stage. Failure does NOT imply verified process closure
  // or lock release; preserve unresolved identities/errors in rejection evidence.
  // Stdio.destroy() is deliberately a no-close operation on Node's own fd1/2.
  // After bounded best-effort diagnostics, exit NONZERO rather than strand a
  // failed coordinator on pending pipe writes. No successful completion is sent.
  try{await terminalFailure(error,options);}finally{exit(1);}
}
export function rejectedStageSummaries(stages){
  return stages.map(s=>({stage:s.stage,processesClosed:s.process.processesClosed??false,exit:s.process.exit??null,
    runner:s.process.runner??null,failure:s.process.failure??null,cleanupFailure:s.process.cleanupFailure??null,
    cancellationObservedPidsAbsent:s.process.cancellationObservedPidsAbsent??null,
    cancellationUnverifiedPids:s.process.cancellationUnverifiedPids??null,
    gates:s.process.gates?.map(g=>({identity:g.identity,target:g.target,acknowledged:g.acknowledged}))??[]}));
}
export function diagnosticGuard(stream=process.stderr){
  let first,notify=()=>{},pending=0;const idle=new Set();
  const fail=error=>{if(first)return;first=error instanceof Error?error:Error(String(error));notify(first);};
  const onError=error=>fail(error);stream.on('error',onError);
  const finish=error=>{if(error)fail(error);pending--;if(pending===0){for(const done of idle)done();idle.clear();}};
  return {
    get failure(){return first;},
    bind(callback){notify=callback;if(first)notify(first);},
    check(){if(first)throw first;},
    write(bytes){pending++;let done=false;const callback=error=>{if(done)return;done=true;finish(error);};
      try{stream.write(bytes,callback);}catch(error){callback(error);}},
    async close(began){
      // Only after owned cleanup/final admission. Pending mirror callbacks are
      // bounded even on failed attempts; this is not a new RSS observation.
      if(pending)await new Promise(resolve=>{let timer;const done=()=>{clearTimeout(timer);idle.delete(done);resolve();};idle.add(done);
        const budget=Math.min(1000,LIMIT_MS-(performance.now()-began));
        timer=setTimeout(()=>{fail(Error('diagnostic cleanup deadline'));done();},Math.max(1,Math.ceil(budget)));
      });
      if(first){stream.once('close',()=>stream.removeListener('error',onError));stream.destroy();}
      else stream.removeListener('error',onError);
      if(first)throw first;
    },
  };
}
export async function launchCaptured({root,options,self,entry,outerBytes,helperBytes,began,deadlineNanoseconds,diagnostics}){
  check(import.meta.url===url(self.data)&&sha(self.data)===options.launcherSha256,'executing launcher generation differs');
  check(sha(outerBytes)===OUTER_SHA,'registered supervisor generation differs');
  const C=await import(url(entry.data)),H=await reviewedHelpers(helperBytes),outer=await import(url(outerBytes));
  const output=path.resolve(root,options.output),paths=C.outputPaths(root,output),lockLane=path.join(root,C.SHARED_LOCK_LANE);
  check(!existsSync(output)&&!existsSync(paths.operations)&&realpathSync(lockLane)===lockLane,'fresh data/operations and canonical shared lock required');
  const abort=new AbortController(),owners=new Map(),probes=new Set(),pending=new Set(),stages=[],hostObservations=[];
  const rss={beganMs:began,lastSampleMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0};
  let failure,activeOuter=false,interval,deadlineTimer,hostJob,rssJob,lock,logFD,monitorFD,reserved=false,publication,completion;
  let stage='preflight';const stdio={bytes:0},monitor={bytes:0},originalError=console.error;
  const remaining=()=>Math.floor(LIMIT_MS-(performance.now()-began));
  const live=()=>{check(!failure&&!abort.signal.aborted,failure?.message??'attempt interrupted');check(remaining()>0,'inclusive1800s deadline');};
  const fail=error=>{failure??=error;abort.abort(failure);if(activeOuter)process.emit('SIGTERM');};
  const ownsDiagnostics=!diagnostics;diagnostics??=diagnosticGuard();diagnostics.bind(fail);
  const interrupt=()=>{if(!abort.signal.aborted)fail(Error('operator interrupted attempt'));};
  const log=value=>{const bytes=Buffer.from((typeof value==='string'?value:JSON.stringify(value))+'\n');H.boundedLogAppend(logFD,bytes,stdio);diagnostics.write(bytes);};
  const stageLogs=()=>['consumer','comparison'].flatMap(name=>['runner-stdout.log','runner-stderr.log'].map(file=>path.join(paths.operations,name+'-process',file)));
  const logBytes=()=>{const n=stdio.bytes+monitor.bytes+stageLogs().reduce((sum,file)=>sum+size(file,LOG_LIMIT),0)+size(path.join(paths.operations,'pilot-rejection.json'),LOG_LIMIT);check(n<=LOG_LIMIT,'combined16MiB log limit');return n;};
  const poll=()=>{for(const file of paths.dataFiles)size(file,FILE_LIMIT);size(paths.comparison,FILE_LIMIT);privateCandidates(output,'.refined-range-private-');privateCandidates(paths.operations,'.refined-range-comparison-private-');logBytes();};
  const probe=(command,args,timeout,maxBuffer)=>{
    const promise=new Promise((resolve,reject)=>{const child=execFile(command,args,{encoding:'utf8',timeout,killSignal:'SIGKILL',maxBuffer,env:{...process.env,LC_ALL:'C'}},(error,text)=>{probes.delete(child.pid);error?reject(error):resolve({text,pid:child.pid});});if(command==='/bin/ps')probes.add(child.pid);});
    pending.add(promise);promise.finally(()=>pending.delete(promise)).catch(()=>{});return promise;
  };
  const table=async()=>{const started=performance.now(),result=await probe('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,rss=,args='],500,8*1024**2),rows=H.parseObservation(result.text).filter(row=>row.pid!==result.pid);Object.defineProperty(rows,'sampleStartedMs',{value:started});return rows;};
  const sample=rows=>{const owned=H.selectOwnedRows(rows,process.pid,owners,outer,probes),observation=H.acceptRSS(rss,owned,performance.now(),rows.sampleStartedMs);H.boundedLogAppend(monitorFD,Buffer.from(JSON.stringify({kind:'aggregate-rss',stage,elapsedSeconds:elapsed(began),...observation})+'\n'),monitor);poll();return observation;};
  const inspect=async()=>{const rows=await table();if(!abort.signal.aborted)try{sample(rows);}catch(error){fail(error);throw error;}return rows.map(({rssBytes,...row})=>row);};
  const host=async launch=>{try{const result=await probe('/usr/bin/memory_pressure',[],2000,1024**2),disk=statfsSync(root,{bigint:true});const value={kind:'host-resource',stage,elapsedSeconds:elapsed(began),...H.parseHostResource(result.text,disk.bavail*disk.bsize,launch)};hostObservations.push(value);log(value);poll();}catch(error){fail(error);throw error;}};
  const worker=job=>H.runFileWorker({...job,deadlineNanoseconds},entry.data,remaining(),abort.signal);
  const stopMonitors=async()=>{clearInterval(interval);clearTimeout(deadlineTimer);if(hostJob)await hostJob;if(rssJob)await rssJob;await Promise.allSettled([...pending]);};
  try{
    mkdirSync(paths.operations,{mode:0o700});reserved=true;
    logFD=openSync(path.join(paths.operations,'launcher-stderr.log'),'wx',0o600);monitorFD=openSync(path.join(paths.operations,'resource-observations.ndjson'),'wx',0o600);
    console.error=(...args)=>{try{log(args.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' '));}catch(error){fail(error);}};
    process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
    deadlineTimer=setTimeout(()=>fail(Error('inclusive attempt wall deadline')),Math.max(1,remaining()));
    let nextHost=performance.now()+15000,nextHeartbeat=nextHost;
    interval=setInterval(()=>{try{
      if(rss.lastSampleMs!==null&&performance.now()-rss.lastSampleStartedMs>1000)throw Error('lost aggregate RSS observation');
      if(!rssJob)rssJob=table().then(rows=>{if(!abort.signal.aborted)sample(rows);}).catch(fail).finally(()=>{rssJob=undefined;});
      if(performance.now()>=nextHost&&!hostJob){nextHost=performance.now()+15000;hostJob=host(false).catch(fail).finally(()=>{hostJob=undefined;});}
      if(performance.now()>=nextHeartbeat){nextHeartbeat=performance.now()+15000;log({kind:'f6c-refined-acceleration-pilot-heartbeat',stage,elapsedSeconds:elapsed(began),closedAdmittedStages:stages.filter(s=>s.admission?.accepted).map(s=>s.stage),maximumSampledAggregateRSSBytes:rss.maximumSampledRSSBytes,accepted:false});}
      poll();
    }catch(error){fail(error);}},250);
    const initial=await table();sample(initial);assertNoCompetitor(initial,process.pid);
    lock=H.reserveLock(path.join(lockLane,'.pilot.lock'),initial.find(row=>row.pid===process.pid));
    const pre=await worker({kind:'preflight',root,planPath:options.plan,planSha256:options.planSha256,launcherSha256:self.sha256,entrySha256:entry.sha256,python:options.python,git:options.git});
    const {plan,planBinding,sources}=pre;await host(true);live();
    for(const name of ['consumer','comparison']){
      stage=name;live();await worker({kind:'recheck',sources});const candidate=stages[0]?.admission?.outputs[0];
      const args=['--plan',planBinding.path,'--plan-sha256',planBinding.sha256,'--entry-sha256',entry.sha256,'--launcher-sha256',self.sha256,
        '--stage',stage,'--out',output,'--deadline-ns',deadlineNanoseconds,'--candidate-sha256',candidate?.sha256??'none','--python',options.python,'--git-binary',options.git];
      activeOuter=true;let receipt;
      try{receipt=await outer.superviseRegisteredPilot({root,entry:ENTRY,args,sources:[{path:ENTRY,sha256:entry.sha256,bytes:entry.data}],
        output:path.join(paths.operations,stage+'-process'),startedAtMs:began,limitMs:LIMIT_MS,heartbeatMs:15000,
        inspectProcesses:H.startupAbortInspection(inspect,abort.signal),admit:async({receipt:processReceipt,signal})=>{
          live();return H.runFileWorker({kind:'admit',root,output,stage,plan,planBinding,sources,python:options.python,git:options.git,candidate,
            processReceipt,stdoutPath:path.join(paths.operations,stage+'-process/runner-stdout.log'),deadlineNanoseconds},entry.data,remaining(),signal);
        }});}catch(error){if(error.outerReceipt)stages.push({stage,process:error.outerReceipt});throw error;}finally{activeOuter=false;}
      stages.push({stage,process:receipt,admission:receipt.admission});
      check(C.equal(receipt.stdoutLog,receipt.admission.completionLog)&&C.equal(receipt.stderrLog,receipt.admission.resources.stderr),'fresh supervisor logs differ from admission');
      await host(false);live();
    }
    stage='final-admission';check(stages.length===2&&stages.every(s=>s.process.accepted===true&&s.process.processesClosed===true),'closed two-stage census');
    const evidence=stages.flatMap(s=>[s.process.stdoutLog,s.process.stderrLog,...s.admission.outputs]);
    await worker({kind:'recheck',sources:[...sources,...evidence]});if(rssJob)await rssJob;sample(await table());await host(false);live();
    const record={schema:'braid-program/f6c-refined-acceleration-pilot-admission.v1',accepted:true,scope:C.SCOPE,
      authority:'source-bound one-cell conditional refined-cover acceleration-range conformance only',processesClosed:true,stages,plan:planBinding,
      invocation:{python:options.python,pythonRealPath:realpathSync(options.python),git:options.git,node:realpathSync(process.execPath)},
      sourceBindings:sources,observationsBeforePublication:{...rss},hostObservationsBeforePublication:[...hostObservations],
      elapsedSecondsBeforePublication:elapsed(began),loggingBytesBeforePublication:logBytes(),
      publicationRequires:'matching fresh launcher completion and exit zero after final hashes, worker/monitor/lock closure and stdout flush within1800seconds',
      memoryScope:'coordinator including worker threads plus owned descendants and registered groups; bounded PS probes excluded; sampled not an allocation cap',
      census:C.CENSUS,accelerationEvaluated:true,rootsEvaluated:false,eomExecuted:false,h3EvidenceEligible:false,metricsAvailable:false,scoreAuthorized:false,historicalTrajectoryIdentityEstablished:false,fullRunAuthorized:false};
    publication=await worker({kind:'finalize',output,record,sources,evidence});await host(false);sample(await table());live();
    await worker({kind:'recheck',sources:[...sources,...evidence,publication]});live();stage='watch-teardown';await stopMonitors();live();
    H.releaseLock(lock);lock=undefined;for(const fd of [logFD,monitorFD])fsyncSync(fd);
    const logs=['launcher-stderr.log','resource-observations.ndjson'].map(name=>C.clean(C.readBound(path.join(paths.operations,name),undefined,false,LOG_LIMIT)));
    completion={completed:true,accepted:true,scope:C.SCOPE,receipt:publication,logs,rawOutputBytes:stages.flatMap(s=>s.admission.outputs).reduce((n,b)=>n+b.bytes,0),
      operationalLogBytes:logBytes(),maximumSampledAggregateRSSBytes:rss.maximumSampledRSSBytes,maximumSampleGapMs:rss.maximumSampleGapMs,samples:rss.samples,
      elapsedSeconds:elapsed(began),processesClosed:true,workerAndMonitorClosed:true,lockReleased:true,lastRSSObservationStartedAtMs:rss.lastSampleStartedMs,
      finalObservationToClosureMs:H.admitFinalObservation(rss,performance.now()),coordinatorResourceUsage:process.resourceUsage(),
      cpuScope:'coordinator self includes worker threads; Python/entry/gate and Python waited-child CPU kept separately without double counting',
      census:C.CENSUS,accelerationEvaluated:true,rootsEvaluated:false,eomExecuted:false,h3EvidenceEligible:false,metricsAvailable:false,scoreAuthorized:false,historicalTrajectoryIdentityEstablished:false,fullRunAuthorized:false};return completion;
  }catch(error){
    fail(error);await stopMonitors();if(reserved)try{const record={completed:false,accepted:false,scope:C.SCOPE,stage,failure:String(error.message).slice(0,4096),diagnosticFailure:diagnostics.failure?.message??null,invalidatesPublication:publication??null,
      stages:rejectedStageSummaries(stages),elapsedSeconds:elapsed(began),eomExecuted:false,h3EvidenceEligible:false};
      const budget=LOG_LIMIT-logBytes();check(budget>0,'rejection log budget');C.writeNew(path.join(paths.operations,'pilot-rejection.json'),record,budget);
    }catch(preservation){diagnostics.write(Buffer.from('Refined-range rejection preservation failed: '+preservation.message+'\n'));}throw error;
  }finally{
    await stopMonitors();if(lock)try{H.releaseLock(lock);}catch(error){failure??=error;diagnostics.write(Buffer.from(error.message+'\n'));}
    console.error=originalError;process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);if(logFD!==undefined)closeSync(logFD);if(monitorFD!==undefined)closeSync(monitorFD);
    if(ownsDiagnostics){try{if(!failure)await drainDiagnostics({began,lastSampleStartedMs:rss.lastSampleStartedMs});}catch(error){failure??=error;}
      try{await diagnostics.close(began);}catch(error){failure??=error;}}
    try{diagnostics.check();}catch(error){failure??=error;}
    if(failure)throw failure;check(performance.now()-began<LIMIT_MS&&!abort.signal.aborted,'final cleanup deadline');
    if(completion)completion.finalObservationToClosureMs=H.admitFinalObservation(rss,performance.now());
  }
}
export function parseArgs(argv){const v={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!v[argv[i]],'unique paired arguments');v[argv[i]]=argv[i+1];}
  check(Object.keys(v).sort().join('|')===['--out','--plan','--plan-sha256','--launcher-sha256','--entry-sha256','--python','--git-binary'].sort().join('|'),'closed launcher arguments');
  for(const key of ['--plan-sha256','--launcher-sha256','--entry-sha256'])check(/^[a-f0-9]{64}$/u.test(v[key]),'reviewed SHA required');
  check(!v['--out'].split(/[\\/]/u).some(p=>p==='.'||p==='..'),'output traversal');
  for(const key of ['--python','--git-binary'])check(path.isAbsolute(v[key])&&path.resolve(v[key])===v[key],'explicit absolute runtime invocation');
  return {output:v['--out'],plan:path.resolve(v['--plan']),planSha256:v['--plan-sha256'],launcherSha256:v['--launcher-sha256'],entrySha256:v['--entry-sha256'],python:v['--python'],git:v['--git-binary']};
}
async function main(began,diagnostics){const deadlineNanoseconds=String(process.hrtime.bigint()+1800000000000n),options=parseArgs(process.argv.slice(2)),root=realpathSync(process.cwd());
  const self=captureBootstrapSource(path.join(root,SELF),options.launcherSha256),entry=captureBootstrapSource(path.join(root,ENTRY),options.entrySha256),helpers=captureBootstrapSource(path.join(root,HELPERS),HELPER_SHA),outer=captureBootstrapSource(path.join(root,OUTER),OUTER_SHA);
  const C=await import(url(entry.data)),plan=C.decode(C.readBound(options.plan,options.planSha256,true,1024**2).data,1024**2);
  C.validatePlan(plan,root,self.sha256,entry.sha256,options.python,options.git);
  C.checkBindings([...plan.operationalBindings.filter(b=>['/bin/ps','/usr/bin/memory_pressure',realpathSync(process.execPath)].includes(b.path)),...plan.runtimeBindings.filter(b=>path.resolve(root,b.path)===options.git)].map(b=>({...b,path:path.resolve(root,b.path)})));
  await ignoredOutputs(options.git,root,path.resolve(root,options.output));
  diagnostics.check();const captured=await import(url(self.data)),result=await captured.launchCaptured({root,options,self,entry,outerBytes:outer.data,helperBytes:helpers.data,began,deadlineNanoseconds,diagnostics});
  const H=await reviewedHelpers(helpers.data);check(performance.now()-began<LIMIT_MS,'post-teardown deadline');
  await drainDiagnostics({began,lastSampleStartedMs:result.lastRSSObservationStartedAtMs});diagnostics.check();result.elapsedSeconds=elapsed(began);
  await H.flushCompletion(result,{began,lastSampleStartedMs:result.lastRSSObservationStartedAtMs});
  diagnostics.check();await diagnostics.close(began);
  check(performance.now()-began<LIMIT_MS&&performance.now()-result.lastRSSObservationStartedAtMs<=1000,'post-completion deadline/gap');
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const began=performance.now(),diagnostics=diagnosticGuard();main(began,diagnostics).catch(error=>failedCLICompletion(error,{began}));
}
