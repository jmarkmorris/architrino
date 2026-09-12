// Current memory-pressure transport. Caller retains the whole-entry watchdog;
// this owner retains every direct helper through observed exit and stream close.
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {mkdtempSync,readdirSync,realpathSync,rmSync,statfsSync} from 'node:fs';
import {cpus,tmpdir} from 'node:os';
import path from 'node:path';
const demand=(ok,message)=>{if(!ok)throw Error(message);};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const clean=({data,...row})=>row;
const usage=value=>value&&['userSeconds','systemSeconds','maximumResidentBytes'].every(key=>Number.isFinite(value[key])&&value[key]>=0);
export function createCircularMemoryOwner({capture,python,helper,sources,root,completionEnd,signal,maximumBytes=1024*1024,maximumProbeMs=2000}) {
 demand(typeof capture==='function'&&completionEnd>performance.now()&&maximumProbeMs>0&&maximumProbeMs<=2000&&maximumBytes>0&&maximumBytes<=1024*1024,'bounded memory observer contract required');
 const pythonPath=realpathSync(python);
 const bound=sources.map(row=>capture(row.path,row.sha256));
 demand(bound.reduce((sum,row)=>sum+row.bytes,0)<=128*1024**2,'memory observer source union exceeds bound');
 const helperSource=bound.find(row=>row.path===path.resolve(helper));demand(helperSource,'captured memory helper required');
 const processors=cpus().length;demand(processors>0,'CPU census unavailable');
 let runtime=null,failure=null,finished=false,totalBytes=0;const probes=[],pending=new Set();
 const recheck=()=>{for(const row of bound){const current=capture(row.path,row.sha256);demand(current.realPath===row.realPath&&current.bytes===row.bytes,'memory observer source changed');}demand(cpus().length===processors,'CPU census changed');};
 function execute(mode,remainingMs){
  demand(!finished&&!failure&&!signal?.aborted,'memory observation unavailable');recheck();
  demand(probes.length<4096,'memory observation census exceeds bound');
  const end=Math.min(completionEnd,performance.now()+remainingMs);demand(end-performance.now()>100,'memory observation closure allowance missing');
  const durationMs=Math.min(maximumProbeMs,Math.floor(end-performance.now()-100));
  const cache=realpathSync(mkdtempSync(path.join(tmpdir(),'circular-memory-cache-')));
  const record={mode,startedMilliseconds:performance.now(),deadlineMilliseconds:end,closed:false,outputBytes:0,droppedBytes:0};probes.push(record);
  const child=spawn(pythonPath,['-I','-B','-X',`pycache_prefix=${cache}`,'-c',helperSource.data.toString('utf8')],{cwd:root,env:{...process.env,LC_ALL:'C'},stdio:['pipe','pipe','pipe']});record.pid=child.pid;
  let timer,escalation,cancelled=false;const output=[],errors=[];
  const cancel=reason=>{if(cancelled||record.closed)return;cancelled=true;record.cancellation=reason;if(!record.exitObserved)child.kill('SIGTERM');escalation=setTimeout(()=>{if(!record.closed&&!record.exitObserved){record.escalated=true;child.kill('SIGKILL');}},Math.max(1,Math.min(100,end-performance.now()-10)));};
  const interrupted=()=>cancel('owner-interrupted');
  const actual=new Promise((resolve,reject)=>{
   const collect=(target,data)=>{record.outputBytes+=data.length;totalBytes+=data.length;if(record.outputBytes>2*maximumBytes||totalBytes>32*1024**2){record.droppedBytes+=data.length;cancel('output-limit');}else target.push(data);};
   child.stdout.on('data',data=>collect(output,data));child.stderr.on('data',data=>collect(errors,data));
   for(const stream of [child.stdin,child.stdout,child.stderr])stream.on('error',error=>{record.streamError=error.message;cancel('stream-error');});
   child.on('error',error=>{record.spawnError=error.message;cancel('spawn-error');});
   child.once('exit',()=>{record.exitObserved=true;});
   signal?.addEventListener('abort',interrupted,{once:true});if(signal?.aborted)interrupted();
   timer=setTimeout(()=>cancel('probe-deadline'),durationMs+25);
   child.once('close',(code,exitSignal)=>{
    clearTimeout(timer);clearTimeout(escalation);signal?.removeEventListener('abort',interrupted);record.closed=true;record.exitCode=code;record.exitSignal=exitSignal;
    record.wallSeconds=(performance.now()-record.startedMilliseconds)/1000;record.cpuUpperBoundSeconds=record.wallSeconds*processors;
    const stdout=Buffer.concat(output),stderr=Buffer.concat(errors);record.stdoutSha256=sha(stdout);record.stderrSha256=sha(stderr);
    try{
     demand(readdirSync(cache).length===0,'unexpected memory observer bytecode cache');rmSync(cache,{recursive:true});
     demand(performance.now()<end&&!cancelled&&!record.streamError&&!record.spawnError&&!record.droppedBytes&&code===0&&exitSignal===null&&stderr.length===0,'memory observer failed or incomplete');
     const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(stdout));
     demand(value.pid===child.pid&&value.parentPid===process.pid&&usage(value.helperResourceUsageBeforeSerialization),'memory helper identity/usage missing');
     record.helperResourceUsageBeforeSerialization=value.helperResourceUsageBeforeSerialization;
     if(mode==='inventory'){
      demand(value.schema==='circular-observer-runtime.v1'&&Array.isArray(value.runtime)&&value.runtime.length>0&&value.runtime.length<=256,'memory runtime census missing');
      runtime=value.runtime.map(row=>({path:row.path,realPath:realpathSync(row.path)}));record.runtimeFiles=runtime.length;
     }else{
      demand(value.schema==='circular-memory-observation.v1'&&Number.isSafeInteger(value.queryPid)&&value.queryPid>0&&value.queryPid!==child.pid&&value.queryClosed===true&&value.queryExitCode===0&&value.stopReason===null&&usage(value.queryResourceUsage)&&value.droppedBytes.stdout===0&&value.droppedBytes.stderr===0,'memory query closure/usage missing');
      demand(JSON.stringify(value.runtime.map(row=>row.path))===JSON.stringify(runtime.map(row=>row.path)),'memory loaded runtime changed');
      record.queryPid=value.queryPid;record.queryClosed=true;record.queryResourceUsage=value.queryResourceUsage;
      record.identity={pid:child.pid,parentPid:value.parentPid,processGroup:value.processGroup,authority:'live direct ChildProcess handle through exit; query PID owned and reaped by helper wait4'};
     }
     demand(record.helperResourceUsageBeforeSerialization.maximumResidentBytes<=1024**3&&(record.queryResourceUsage?.maximumResidentBytes??0)<=1024**3,'memory observer resident ceiling exceeded');
     recheck();resolve(value);
    }catch(error){failure??=error;record.failure=error.message;reject(error);}
   });
   child.stdin.end(JSON.stringify({mode,durationMs,maximumBytes})+'\n');
  });pending.add(actual);void actual.finally(()=>pending.delete(actual)).catch(()=>{});return actual;
 }
 const snapshot=()=>({schema:'circular-memory-owner.v1',closed:finished&&pending.size===0,accepted:false,h3EvidenceEligible:false,failure:failure?.message??null,
  sourceBindings:bound.map(clean),runtimeBindings:runtime,probes,totalBytes,processorCount:processors,
  totalCPUUpperBoundSeconds:probes.every(row=>Number.isFinite(row.cpuUpperBoundSeconds))?probes.reduce((sum,row)=>sum+row.cpuUpperBoundSeconds,0):null,
  accountingBoundary:'wait4 measures actual memory_pressure child; helper usage precedes final serialization; wall times logical CPUs bounds each full helper lifetime. Individual RSS is not aggregate peak. macOS system shared cache and kernel are trusted.'});
 return {initialize:()=>execute('inventory',Math.min(5000,completionEnd-performance.now())),
  async observe({policy,atLaunch=false,remainingMs=2500}){try{const value=await execute('memory',remainingMs);const lines=value.stdout.split(/\r?\n/u).filter(row=>row.includes('System-wide memory free percentage:'));
   demand(lines.length===1&&/^System-wide memory free percentage: \d+%$/u.test(lines[0]),'memory percentage malformed');const freePercent=Number(lines[0].match(/(\d+)%$/u)[1]);
   const disk=statfsSync(root,{bigint:true}),availableDiskBytes=disk.bavail*disk.bsize;
   demand(freePercent<=100&&freePercent>=policy.minimumSystemFreePercent&&availableDiskBytes>=BigInt(atLaunch?policy.minimumFreeDiskBytesAtLaunch:policy.minimumFreeDiskBytesDuringRun),'memory/disk below reviewed minimum');
   recheck();return {accepted:true,h3EvidenceEligible:false,freePercent,availableDiskBytes:String(availableDiskBytes),atLaunch,queryProbe:probes.length-1};
  }catch(error){failure??=error;throw error;}},
  recheck,snapshot,async finish(){await Promise.allSettled([...pending]);recheck();demand(performance.now()<completionEnd&&probes.every(row=>row.closed),'memory observer closure incomplete');finished=true;if(failure)throw failure;return snapshot();}};
}
