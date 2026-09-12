/** Independent, nonexecuting admission of the canonical coordinator's pending output.
 * No coordinator/producer import and no translation into the old v1 receipt.
 * The caller owns fresh process observation; this checker owns its required
 * relation to the exact invocation, retained files, and conditional record.
 */
import {createHash} from 'node:crypto';
import {openSync,closeSync,readSync,fstatSync,lstatSync,realpathSync,constants} from 'node:fs';
import path from 'node:path';

export const COORDINATOR_SHA='e100a96f0771d82664fa62b66865cbf5924cced1216588c631836ed361d6a252';
export const LOCK='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock';
const check=(ok,message)=>{if(!ok)throw Error(message);};
const canonical=o=>o===null||typeof o!=='object'?JSON.stringify(o):Array.isArray(o)?'['+o.map(canonical).join(',')+']':'{'+Object.keys(o).sort().map(k=>JSON.stringify(k)+':'+canonical(o[k])).join(',')+'}';
const same=(a,b)=>canonical(a)===canonical(b);
const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
const integer=(n,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=0&&n<=max;
const finite=(n,max)=>Number.isFinite(n)&&n>=0&&n<=max;
const LIMITS={inclusiveMilliseconds:1800000,aggregateRSSBytes:2147483648,rssPollMilliseconds:250,maximumRSSGapMilliseconds:1000,heartbeatMilliseconds:15000,scientificBytes:67108864,combinedLogBytes:16777216,sourceFiles:512,sourceBytes:1073741824,outputFiles:512,serialWorkers:1,startFreePercent:40,startDiskBytes:68719476736,stopFreePercent:20,stopDiskBytes:17179869184};
export const clean=({path,sha256,bytes})=>({path,sha256,bytes});

export function capture(b,{collect=false,limit=1073741824,expectedIdentity,live=()=>{}}={}){
 check(b&&typeof b.path==='string'&&path.isAbsolute(b.path)&&path.resolve(b.path)===b.path&&realpathSync(b.path)===b.path,'canonical captured path');
 check(/^[a-f0-9]{64}$/u.test(b.sha256)&&integer(b.bytes,limit),'bounded expected bytes');live();
 const fd=openSync(b.path,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
 try{
  const before=fstatSync(fd,{bigint:true});check(before.isFile()&&before.size===BigInt(b.bytes),'regular exact captured size');
  const id=identity(before);check(!expectedIdentity||id===expectedIdentity,'original file identity');
  const hash=createHash('sha256'),parts=[],buffer=Buffer.alloc(65536);let at=0;
  while(at<b.bytes){live();const n=readSync(fd,buffer,0,Math.min(buffer.length,b.bytes-at),at);check(n>0,'captured truncation');hash.update(buffer.subarray(0,n));if(collect)parts.push(Buffer.from(buffer.subarray(0,n)));at+=n;}
  check(readSync(fd,buffer,0,1,at)===0&&hash.digest('hex')===b.sha256,'captured EOF/hash');
  check(identity(fstatSync(fd,{bigint:true}))===id&&identity(lstatSync(b.path,{bigint:true}))===id&&realpathSync(b.path)===b.path,'captured replacement');live();
  return{...clean(b),identity:id,...(collect?{data:Buffer.concat(parts)}:{})};
 }finally{closeSync(fd);}
}

export function parseProcessTable(raw){
 check(typeof raw==='string'&&Buffer.byteLength(raw)<=8388608,'bounded process snapshot');
 const rows=raw.split('\n').filter(s=>s.trim()).map(line=>{
  const m=/^\s*(\d+)\s+(\d+)\s+(\d+)\s+([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(\S+)\s+(.+)$/u.exec(line);
  check(m,'complete process identity row');return{pid:Number(m[1]),ppid:Number(m[2]),pgid:Number(m[3]),started:m[4].replace(/\s+/gu,' '),state:m[5],command:m[6]};
 });
 check(rows.length>0&&rows.length<=65536&&new Set(rows.map(r=>r.pid)).size===rows.length,'nonempty unique process snapshot');return rows;
}

// v2 expectations are supplied by the invoking owner before launch, never by
// the coordinator's conditional output. v1 remains historical verification.
export function verifyCurrentSelection(expected,{read=capture}={}){
 const fields=(o,n)=>check(o&&same(Object.keys(o).sort(),n.split(' ').sort()),'closed current selection fields');
 fields(expected,'schema root coordinator node plan control sourceMap');
 check(expected.schema==='braid-program/observed-bounded-invocation.v2'&&typeof expected.control==='boolean','explicit current invocation');
 const root=expected.root;
 check(typeof root==='string'&&path.isAbsolute(root)&&path.resolve(root)===root,'canonical selected root');
 for(const b of [expected.coordinator,expected.node,expected.plan,expected.sourceMap]){
  fields(b,'path sha256 bytes');check(typeof b.path==='string'&&path.isAbsolute(b.path)&&path.resolve(b.path)===b.path&&/^[a-f0-9]{64}$/u.test(b.sha256)&&integer(b.bytes,1073741824)&&b.bytes>0,'explicit current binding');
 }
 check(expected.coordinator.path===path.join(root,'scripts/eom/f6c-bounded-operation.mjs')&&expected.sourceMap.path===path.join(root,'reference/priorities/development-process-review/contracts/option-b-f6c-bounded-operation-sources.jsonld'),'current profile paths');
 const captured=read(expected.sourceMap,{collect:true,limit:1048576}),raw=captured.data;
 check(Buffer.isBuffer(raw)&&raw.length===expected.sourceMap.bytes&&createHash('sha256').update(raw).digest('hex')===expected.sourceMap.sha256,'selected manifest bytes');
 const doc=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw));
 // A single authored serialization also rejects duplicate members without
// importing the subject's parser or accepting a lossy parse as evidence.
 check(raw.equals(Buffer.from(JSON.stringify(doc,null,2)+'\n')),'canonical selected manifest');
 fields(doc,'@context schemaVersion scope repository baseline revisionId @graph');
 const ns='https://architrino.com/knowledge/current-source/';
 check(same(doc['@context'],{'@vocab':ns,from:{'@type':'@id'},to:{'@type':'@id'}})&&doc.schemaVersion==='current-source-manifest/v1'&&doc.scope==='f6c-bounded-operation-current-source'&&doc.repository==='https://github.com/jmarkmorris/architrino.git','selected manifest scope');
 fields(doc.baseline,'commit entry authority');check(/^[a-f0-9]{40}$/u.test(doc.baseline.commit)&&doc.baseline.entry==='scripts/eom/f6c-bounded-operation.mjs'&&doc.baseline.authority==='operator-directed-existing-A-transfer','selected manifest baseline');
 check(typeof doc.revisionId==='string'&&doc.revisionId.length>0&&Array.isArray(doc['@graph'])&&doc['@graph'].length>0&&doc['@graph'].length<=2048,'bounded selected graph');
 const rows=new Map(),paths=new Set(),edges=[],ids=new Set();
 for(const row of doc['@graph']){
  check(typeof row['@id']==='string'&&row['@id'].startsWith(ns)&&!ids.has(row['@id'])&&typeof row.revisionId==='string'&&row.revisionId.length>0,'unique selected source revision');ids.add(row['@id']);
  if(row['@type']==='Source'){
   fields(row,'@id @type revisionId role binding');fields(row.binding,'path selector contract sha256');
   const b=row.binding;check(typeof b.path==='string'&&!b.path.includes('\\')&&!b.path.includes('\0')&&!b.path.startsWith('/')&&b.path.split('/').every(p=>p&&p!=='.'&&p!=='..')&&!paths.has(b.path),'unique safe selected source path');paths.add(b.path);
   check(same(b.selector,{kind:'whole'})&&b.contract==='fixed-byte-selection/v1'&&/^[a-f0-9]{64}$/u.test(b.sha256),'selected whole-file source');
   check(['current-source','independent-reference','scientific-control','scientific-contract','resource-plan','admission','launcher','manifest-reader'].includes(row.role),'selected source role');rows.set(row['@id'],row);
  }else{fields(row,'@id @type revisionId kind from fromRevision to toRevision role');check(row['@type']==='Relationship'&&['checks','dependsOn'].includes(row.kind)&&typeof row.role==='string'&&row.role.length>0,'selected relationship');edges.push(row);}
 }
 const sources=[...rows.values()],admissions=sources.filter(r=>r.role==='admission'),readers=sources.filter(r=>r.role==='manifest-reader');
 check(admissions.length===1&&admissions[0].binding.path==='scripts/eom/f6c-bounded-operation.mjs'&&admissions[0].binding.sha256===expected.coordinator.sha256,'selected coordinator identity');
 check(readers.length===1&&readers[0].binding.path==='scripts/equation-mapping/current-source-manifest.mjs'&&!paths.has(path.relative(root,expected.sourceMap.path)),'unique reader and no map self-binding');
 const triples=new Set();
 for(const e of edges){const key=JSON.stringify([e.kind,e.from,e.to]);check(!triples.has(key)&&rows.get(e.from)?.revisionId===e.fromRevision&&rows.get(e.to)?.revisionId===e.toRevision,'selected graph endpoints');triples.add(key);if(e.kind==='checks')check(e.from===admissions[0]['@id'],'selected admission edge');}
 for(const r of sources)if(r!==admissions[0])check(edges.some(e=>e.kind==='checks'&&e.from===admissions[0]['@id']&&e.to===r['@id']),'selected admission coverage');
 return sources.map(r=>({path:path.join(root,r.binding.path),sha256:r.binding.sha256}));
}

export function verifyClosure({invocation,lease,elapsedMilliseconds,wire,operation,plan,observation,read=capture},{expectedInvocation}={}){
 const current=invocation.schema==='braid-program/observed-bounded-invocation.v2';
 let selected=[];
 if(current){check(expectedInvocation&&same(invocation,expectedInvocation),'independently selected current invocation');selected=verifyCurrentSelection(expectedInvocation,{read});}
 else{
  check(!expectedInvocation&&invocation.schema==='braid-program/observed-bounded-invocation.v1','explicit external invocation');
  check(invocation.coordinator.sha256===COORDINATOR_SHA&&invocation.coordinator.path===path.join(invocation.root,'scripts/eom/f6c-bounded-operation.mjs'),'canonical coordinator generation');
 }
 const maximum=invocation.control?120000:1800000;
 check(typeof invocation.control==='boolean'&&Number.isFinite(elapsedMilliseconds)&&elapsedMilliseconds>0&&elapsedMilliseconds<maximum,'external inclusive original deadline');
 check(lease.status==='completed'&&lease.exitCode===0&&lease.exitSignal===null&&lease.processGroupClosed===true&&!lease.error&&!lease.stopReason,'successful externally closed invocation');
 const args=[invocation.coordinator.path,invocation.control?'--control-plan':'--plan',invocation.plan.path,'--plan-sha256',invocation.plan.sha256,'--self-sha256',current?expectedInvocation.coordinator.sha256:COORDINATOR_SHA,...(current?['--source-map-sha256',expectedInvocation.sourceMap.sha256]:[])];
 check(lease.cwd===invocation.root&&lease.command===invocation.node.path&&same(lease.args,args),'exact original executable and arguments');
 check(lease.targetIdentity&&integer(lease.targetIdentity.pid)&&lease.targetIdentity.pid>1&&lease.targetIdentity.pgid===lease.targetIdentity.pid,'original owned process group');
 check(plan.root===invocation.root&&plan.schema==='braid-program/f6c-bounded-operation-plan.v1'&&Array.isArray(plan.stages)&&plan.stages.length>0,'exact serial plan');
 check(wire.mode==='serial-plan'&&wire.scope==='conditional-operational-completion'&&wire.accepted===false&&wire.completed===false&&wire.ordinaryProcessesClosed===true,'conditional message is not completion');
 check(wire.lockReleased===false&&wire.wholeGuardClosed===false&&wire.workersAndMonitorsClosed===false&&wire.failure===null,'unaltered pending closure fields');
 check(same(wire.terminalClosure,{status:'pending-external-exit',requiredExitCode:0,lock:'held',wholeGuard:'armed'}),'explicit pending external obligation');
 check(wire.wholeGuard?.owner===lease.targetIdentity.pid&&wire.wholeGuard.activeInclusiveMilliseconds===maximum&&wire.budget?.activeInclusiveMilliseconds===maximum,'same guarded original invocation');
 check(wire.h3EvidenceEligible===false&&wire.physicalClaims===false&&wire.stderrCallbacksPending===0,'no scientific authority or pending diagnostic callbacks');
 check(wire.observerProcesses?.count>0&&wire.observerProcesses.closed===wire.observerProcesses.count&&same(wire.observerProcesses.unresolved,[]),'all coordinator probes closed');
 check(operation.schema==='braid-program/f6c-bounded-operation.v2'&&operation.accepted===false&&operation.ordinaryChecksPassed===true&&operation.wholeClosurePending===true&&operation.scope==='ordinary-operation-pending-whole-attempt','version-two pending operation');
 check(same(operation.plan,invocation.plan)&&same(wire.operation.path,path.join(plan.operationDirectory,'operation.json')),'operation/plan crosslink');
 check(operation.h3EvidenceEligible===false&&operation.physicalClaims===false&&Array.isArray(operation.stages)&&operation.stages.length===plan.stages.length,'operation authority and stage census');
 check(same(operation.limits,LIMITS),'unchanged operational limits');
 check(integer(wire.samples)&&wire.samples>0&&integer(wire.maximumSampledRSSBytes,LIMITS.aggregateRSSBytes)&&finite(wire.maximumSampleGapMs,1000)&&finite(wire.finalObservationToClosureMs,1000),'complete bounded resource observations');
 check(integer(wire.scientificBytes,LIMITS.scientificBytes)&&integer(wire.combinedLogBytesIncludingConditionalStdout,LIMITS.combinedLogBytes)&&integer(wire.physicalOutputFiles,512)&&integer(wire.outputPaths,512),'bounded output census');
 check(Array.isArray(wire.hostObservations)&&wire.hostObservations.length>=2&&wire.hostObservations[0].atLaunch===true,'initial and final host observations');
 for(const h of wire.hostObservations)check(finite(h.freePercent,100)&&h.freePercent>=(h.atLaunch?40:20)&&/^\d+$/u.test(h.availableDiskBytes)&&BigInt(h.availableDiskBytes)>=BigInt(h.atLaunch?68719476736:17179869184),'host capacity requirements');
 const pids=new Set([lease.targetIdentity.pid]),groups=new Set([lease.targetIdentity.pgid]);
 function retain(value){
  if(!value||typeof value!=='object')return;
  if(integer(value.pid)&&value.pid>1)pids.add(value.pid);
  if(integer(value.pgid)&&value.pgid>1)groups.add(value.pgid);
  for(const child of Object.values(value))if(child&&typeof child==='object')retain(child);
 }
 for(let i=0;i<operation.stages.length;i++){
  const stage=operation.stages[i],p=stage.process;
  check(stage.id===plan.stages[i].id&&p?.accepted===true&&p.processesClosed===true&&same(p.exit,{code:0,signal:null})&&!p.failure&&!p.cleanupFailure&&same(p.signals,[]),'complete successful original stage');
  check(p.admission?.accepted===true&&p.admission.h3EvidenceEligible===false&&same(p.stdoutLog,p.admission.completionLog),'stage admission and completion binding');
  check(p.guardClosed===true&&p.rootGuard?.acknowledged===true&&p.stdoutDroppedBytes===0&&p.stderrDroppedBytes===0,'acknowledged stage guard and complete stage logs');
  check(Array.isArray(p.gates),'declared stage gates');
  for(const g of p.gates)check(g.retired===true&&g.acknowledged===true&&g.measurement?.code===0&&g.measurement.signal===null,'retired original gate');
  retain(p);
 }
 check(observation.lock.path===path.join(invocation.root,LOCK)&&observation.lock.absent===true,'fresh original lock absence');
 check(Array.isArray(observation.processes)&&observation.processes.length>0,'fresh complete external process observation');
 const sources=wire.sourceBindings,outputs=wire.outputBindings;
 check(Array.isArray(sources)&&sources.length>0&&sources.length<=512&&Array.isArray(outputs)&&outputs.length>0&&outputs.length<=512,'bounded source/output closure');
 for(const [rows,ids] of [[sources,wire.sourceIdentities],[outputs,wire.outputIdentities]]){
  check(new Set(rows.map(b=>b.path)).size===rows.length&&same(Object.keys(ids??{}).sort(),rows.map(b=>b.path).sort()),'exact identity coverage');
  for(const b of rows)check(read(b,{expectedIdentity:ids[b.path]}).identity===ids[b.path],'unchanged original source/output identity');
 }
 check(sources.reduce((n,b)=>n+b.bytes,0)<=LIMITS.sourceBytes,'bounded source aggregate');
 check(new Set(sources.map(b=>wire.sourceIdentities[b.path].split(':').slice(0,2).join(':'))).size===sources.length,'distinct physical sources');
 for(const b of [invocation.coordinator,invocation.plan,invocation.node])check(sources.some(s=>same(s,b)),'invocation source omitted');
 if(current){
  check(sources.some(s=>same(s,expectedInvocation.sourceMap)),'selected source map omitted');
  for(const b of selected)check(sources.some(s=>s.path===b.path&&s.sha256===b.sha256),'selected manifest source omitted or substituted');
  for(const b of [expectedInvocation.sourceMap,...sources.filter(s=>selected.some(b=>b.path===s.path))])check(operation.sources.some(s=>same(s,b)),'selected operation source omitted');
 }
 for(const b of operation.sources)check(sources.some(s=>same(s,b)),'operation source omitted');
 check(outputs.some(b=>same(b,wire.operation)),'published operation omitted');
 for(const stage of operation.stages)check(outputs.some(b=>same(b,stage.process.stdoutLog)),'original stage completion output omitted');
 const operationFile=read(wire.operation,{collect:true,expectedIdentity:wire.outputIdentities[wire.operation.path]});
 check(same(JSON.parse(operationFile.data),operation),'operation bytes differ from checked record');
 const resource=outputs.find(b=>b.path===wire.observerProcesses.completeRecordsPath);check(resource,'complete observer log absent');
 const raw=read(resource,{collect:true,expectedIdentity:wire.outputIdentities[resource.path]}).data;
 check(raw.length<=16777216&&raw.at(-1)===10,'complete bounded observation log');
 const records=raw.toString('utf8').slice(0,-1).split('\n').map(line=>JSON.parse(line));
 const probes=records.filter(r=>r.kind==='observer-process-close');
 check(probes.length===wire.observerProcesses.count,'complete probe closure census');
 for(const p of probes){check(p.closed===true&&same(p.exit,{code:0,signal:null})&&p.stdoutDroppedBytes===0&&p.stderrDroppedBytes===0&&!p.rawFailure,'complete successful observer record');retain(p);}
 retain(records);
 for(const r of observation.processes)check(!pids.has(r.pid)&&!groups.has(r.pgid),'owned process or group remains');
 return{schema:current?'braid-program/f6c-bounded-operation-external-closure.v2':'braid-program/f6c-bounded-operation-external-closure.v1',accepted:true,authority:'independently observed operational closure only',
  invocation,operation:wire.operation,elapsedMilliseconds,processesClosed:true,wholeGuardClosed:true,lockReleased:true,
  sourceBindings:sources,sourceIdentities:wire.sourceIdentities,outputBindings:outputs,outputIdentities:wire.outputIdentities,
  observedProcessIds:[...pids].sort((a,b)=>a-b),observedProcessGroups:[...groups].sort((a,b)=>a-b),
  h3EvidenceEligible:false,physicalClaims:false,mathematicalAcceptance:false};
}
