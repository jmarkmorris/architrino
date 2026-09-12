// Prepares immutable prior evidence for a separately reviewed 32/128 invocation.
// The existing entry/rung sources remain unchanged. No numerical work is run.
import {createHash} from 'node:crypto';import {gzipSync,gunzipSync} from 'node:zlib';
import {existsSync,mkdirSync,realpathSync,writeFileSync} from 'node:fs';
import path from 'node:path';import {fileURLToPath} from 'node:url';
import {closeSync,constants,fstatSync,openSync,readFileSync} from 'node:fs';
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
const sha=data=>createHash('sha256').update(data).digest('hex');
const check=(ok,message)=>{if(!ok)throw Error(message);};
const decode=record=>{check(Buffer.isBuffer(record.data)&&sha(record.data)===record.sha256,'captured input digest differs');return JSON.parse(record.data);};
const MAX=2*1024**2;
export function embedCircularPrior(record){check(record.data.length<=MAX&&sha(record.data)===record.sha256,'bounded exact embedded bytes required');return{path:record.path,sha256:record.sha256,bytes:record.data.length,encoding:'gzip-base64',dataBase64:gzipSync(record.data).toString('base64')};}
export function decodeCircularPrior(record){check(record.encoding==='gzip-base64'&&Number.isSafeInteger(record.bytes)&&record.bytes>=0&&record.bytes<=MAX&&record.dataBase64.length<=MAX*2,'bounded embedded encoding required');const data=gunzipSync(Buffer.from(record.dataBase64,'base64'),{maxOutputLength:MAX});check(data.length===record.bytes&&sha(data)===record.sha256,'embedded bytes differ');return{path:record.path,sha256:record.sha256,data};}
export function buildCurrentCircularPriorPacket({jointBinding,reviewBinding,stdoutBinding,terminalProjection,priorPrefix,earlierAdmissions,planBinding,entrySha256,memoryOwnerSha256,memoryHelperSha256}) {
 const joint=decode(jointBinding),review=decode(reviewBinding),stdout=decode(stdoutBinding),terminal=terminalProjection,prefix=decode(priorPrefix),previous=review.rung,next=previous===8?32:128;
 check(review.schema==='circular-independent-current-rung-review.v1'&&review.accepted===true&&review.h3EvidenceEligible===false&&[8,32].includes(previous)&&review.candidateId==='coincident-midpoint-common-frequency'&&review.phaseCount===previous&&review.rowCount===previous*36,'independently accepted preceding rung required');
 check(review.admission.sha256===jointBinding.sha256&&path.resolve(review.admission.path)===path.resolve(jointBinding.path),'reviewed joint differs');
 check(review.externalOwner.runId===terminal.runId&&terminal.exitCode===0&&terminal.processGroupClosed===true&&terminal.elapsedWallSeconds>0&&terminal.elapsedWallSeconds<1800&&terminal.exitCode===review.externalOwner.exitCode&&terminal.elapsedWallSeconds===review.externalOwner.elapsedWallSeconds&&review.externalOwner.processGroupClosed===true,'reviewed terminal projection differs');
 check(Object.keys(terminal).sort().join('|')==='elapsedWallSeconds|exitCode|processGroupClosed|runId','terminal projection contains unexpected fields');
 check(review.bindings.some(row=>row.path===stdoutBinding.path&&row.sha256===stdoutBinding.sha256)&&stdout.accepted===true&&stdout.admission.sha256===jointBinding.sha256&&path.resolve(stdout.admission.path)===path.resolve(jointBinding.path),'reviewed stdout admission differs');
 check(joint.schema==='circular-current-rung-admission.v1'&&joint.accepted===true&&joint.h3EvidenceEligible===false&&joint.rung===previous&&joint.candidateId===review.candidateId&&joint.process.accepted===true&&joint.process.processesClosed===true&&joint.process.guardClosed===true&&joint.process.admission.accepted===true,'original joint process closure differs');
 for(const owner of [joint.observations,joint.memory])check(owner.closed===true&&owner.failure===null&&owner.probes.length>=2&&owner.probes.every(row=>row.closed===true&&row.exitObserved===true&&row.exitCode===0&&row.exitSignal===null),'original observation closure incomplete');
 check(joint.process.admission.candidateId===review.candidateId&&joint.process.admission.rung===previous&&joint.process.admission.h3EvidenceEligible===false&&joint.process.admission.plan.sha256===planBinding.sha256&&path.resolve(joint.process.admission.plan.path)===path.resolve(planBinding.path),'prior candidate/rung/plan differs');
 const current=joint.process.admission.phaseReceipts;
 check(current.length===previous&&prefix.candidateId===review.candidateId&&prefix.phaseReceipts.length===(previous===8?2:10)&&prefix.rungAdmissions.length===(previous===8?0:1),'prior prefix census differs');
 check(review.bindings.some(row=>row.path===priorPrefix.path&&row.sha256===priorPrefix.sha256),'prior prefix lacks independent binding');
 check(earlierAdmissions.length===prefix.rungAdmissions.length&&earlierAdmissions.every((row,i)=>row.path===prefix.rungAdmissions[i].path&&row.sha256===prefix.rungAdmissions[i].sha256),'earlier admission binding differs');
 check(JSON.stringify(review.dispatcherRecomputedAdmission.phaseReceipts)===JSON.stringify(current),'independent phase chain differs');
 const nextReview={schema:'circular-current-resource-plan-review.v1',accepted:false,independentReviewStatus:'pending',h3EvidenceEligible:false,laterLadderAuthorized:false,
  candidateId:review.candidateId,rung:next,plan:planBinding,entrySha256,memoryOwnerSha256,memoryHelperSha256,
  processesClosed:joint.process.processesClosed,admission:joint.process.admission,
  immutablePriorEvidence:{schema:'circular-immutable-prior-evidence.v1',joint:embedCircularPrior(jointBinding),independentReview:embedCircularPrior(reviewBinding),stdout:embedCircularPrior(stdoutBinding),
   terminalProjection:{kind:'selected-public-terminal-fields-not-original-lease-bytes',record:terminal,authenticatedByIndependentReviewSha256:reviewBinding.sha256},
   priorPrefix:embedCircularPrior(priorPrefix),earlierAdmissions:earlierAdmissions.map(embedCircularPrior)},
  boundary:'Pending independent next-rung review. Top-level admission/processesClosed project the unchanged preceding joint.process; not newly observed closure. This accepted packet must be both profile.planReview and final prior.rungAdmissions entry. Exact profile linkage needs independent review; the frozen entry does not structurally compare those fields. Embedded gzip captures decode to original bytes and are actual consumed provenance through planReview hash rechecks. Unchanged1800secondcap; six over-cap candidates remain returned.'};
 const reviewBytes=Buffer.from(JSON.stringify(nextReview)+'\n');check(reviewBytes.length<=MAX,'embedded next-rung review exceeds existing reader cap');return{reviewBytes};
}
export function finalizeCurrentCircularPrior(binding){
 check(binding.data.length<=MAX,'accepted review exceeds existing reader cap');
 const packet=decode(binding);check(packet.schema==='circular-current-resource-plan-review.v1'&&packet.accepted===true&&packet.h3EvidenceEligible===false&&[32,128].includes(packet.rung),'independently accepted next review required');
 const evidence=packet.immutablePriorEvidence,jointBinding=decodeCircularPrior(evidence.joint),reviewBinding=decodeCircularPrior(evidence.independentReview),stdoutBinding=decodeCircularPrior(evidence.stdout),priorPrefix=decodeCircularPrior(evidence.priorPrefix),earlierAdmissions=evidence.earlierAdmissions.map(decodeCircularPrior);
 check(evidence.terminalProjection.kind==='selected-public-terminal-fields-not-original-lease-bytes'&&evidence.terminalProjection.authenticatedByIndependentReviewSha256===reviewBinding.sha256,'terminal projection provenance differs');
 const rebuilt=JSON.parse(buildCurrentCircularPriorPacket({jointBinding,reviewBinding,stdoutBinding,priorPrefix,earlierAdmissions,terminalProjection:evidence.terminalProjection.record,planBinding:packet.plan,entrySha256:packet.entrySha256,memoryOwnerSha256:packet.memoryOwnerSha256,memoryHelperSha256:packet.memoryHelperSha256}).reviewBytes);
 check(packet.rung===rebuilt.rung&&packet.candidateId===rebuilt.candidateId&&packet.processesClosed===rebuilt.processesClosed&&JSON.stringify(packet.admission)===JSON.stringify(rebuilt.admission),'reviewed process projection differs');
 const prefix=decode(priorPrefix),prior={candidateId:packet.candidateId,phaseReceipts:[...prefix.phaseReceipts,...packet.admission.phaseReceipts].map(({path,sha256})=>({path,sha256})),rungAdmissions:[...prefix.rungAdmissions,{path:binding.path,sha256:binding.sha256}]};
 const bytes=Buffer.from(JSON.stringify(prior)+'\n');check(bytes.length<=MAX,'prior index exceeds existing reader cap');return bytes;
}
async function main(){
 const root=realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..')),args={};
 for(let i=2;i<process.argv.length;i+=2){check(['--review','--review-sha256','--accepted-review','--accepted-review-sha256','--out','--self-sha256','--source-map-sha256'].includes(process.argv[i])&&process.argv[i+1]&&!args[process.argv[i]],'exact prior-preparation arguments required');args[process.argv[i]]=process.argv[i+1];}
 const final=Boolean(args['--accepted-review']);check(Object.keys(args).length===5&&args['--out']&&args['--self-sha256']&&(final?args['--accepted-review-sha256']:args['--review']&&args['--review-sha256']),'complete prior-preparation arguments required');
 const admission=await circularAdmission(root,args['--source-map-sha256']);
 check(admission.source('scripts/eom/prepare-current-subfield-circular-prior.mjs').sha256===args['--self-sha256'],'selected prior preparer differs');
 const captured=await import('data:text/javascript;base64,'+admission.source('scripts/eom/prepare-current-subfield-circular-prior.mjs').data.toString('base64'));
 return captured.prepareCurrentCircularPrior({root,args,originalBindings:admission.bindings});
}
export async function prepareCurrentCircularPrior({root,args,originalBindings}) {
 const admission=await circularAdmission(root,args['--source-map-sha256'],originalBindings),final=Boolean(args['--accepted-review']);
 check(import.meta.url==='data:text/javascript;base64,'+admission.source('scripts/eom/prepare-current-subfield-circular-prior.mjs').data.toString('base64'),'captured prior preparer required');
 const {captureCircularFile}=await import('data:text/javascript;base64,'+admission.source('src/prescribed-path-analysis/SubfieldCircularObservationOwner.mjs').data.toString('base64'));
 const inputs=[];const capture=(filename,digest)=>{const row=captureCircularFile(path.resolve(root,filename),digest);inputs.push(row);return row;};
 inputs.push(...admission.bindings);
 const base=path.join(root,'.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1'),output=path.resolve(root,args['--out']);check(path.dirname(output)===base&&realpathSync(base)===base&&!existsSync(output),'fresh direct prior output required');
 let bytes,name;
 if(final){const binding=capture(args['--accepted-review'],args['--accepted-review-sha256']),packet=decode(binding);
  check(packet.entrySha256===admission.source('scripts/eom/run-current-subfield-circular-root-rung.mjs').sha256&&packet.memoryOwnerSha256===admission.source('src/prescribed-path-analysis/SubfieldCircularMemoryOwner.mjs').sha256&&packet.memoryHelperSha256===admission.source('scripts/eom/observe-subfield-circular-memory.py').sha256,'accepted next review current source selection differs');
  bytes=finalizeCurrentCircularPrior(binding);name=`prior${packet.rung}.json`;}
 else{
  const reviewBinding=capture(args['--review'],args['--review-sha256']),review=decode(reviewBinding),jointBinding=capture(review.admission.path,review.admission.sha256),joint=decode(jointBinding);
  // Raw lease remains private. Never capture or publish its control token.
  check(/^[0-9a-f-]{36}$/u.test(review.externalOwner.runId),'reviewed owner identity required');
  const lease=JSON.parse(captureCircularFile(path.join(root,'.local-data/owned-compute/leases',review.externalOwner.runId+'.json')).data);
  const terminalProjection={runId:lease.runId,exitCode:lease.exitCode,processGroupClosed:lease.processGroupClosed,elapsedWallSeconds:lease.elapsedWallSeconds};
  const stdoutBinding=capture(lease.stdoutPath,review.bindings.find(row=>row.path===lease.stdoutPath)?.sha256),profile=decode(capture(joint.profile.path,joint.profile.sha256));
  for(const row of review.bindings)capture(row.path,row.sha256);
  const priorPrefix=capture(profile.prior.path,profile.prior.sha256),earlierAdmissions=decode(priorPrefix).rungAdmissions.map(row=>capture(row.path,row.sha256));
  ({reviewBytes:bytes}=buildCurrentCircularPriorPacket({jointBinding,reviewBinding,stdoutBinding,terminalProjection,priorPrefix,earlierAdmissions,planBinding:profile.plan,
   entrySha256:admission.source('scripts/eom/run-current-subfield-circular-root-rung.mjs').sha256,memoryOwnerSha256:admission.source('src/prescribed-path-analysis/SubfieldCircularMemoryOwner.mjs').sha256,memoryHelperSha256:admission.source('scripts/eom/observe-subfield-circular-memory.py').sha256}));name=`next${review.rung===8?32:128}-review.pending.json`;
 }
 admission.recheck();for(const row of inputs)captureCircularFile(row.path,row.sha256);mkdirSync(output);writeFileSync(path.join(output,name),bytes,{flag:'wx'});for(const row of inputs)captureCircularFile(row.path,row.sha256);admission.recheck();
 console.log(JSON.stringify({prepared:true,accepted:false,laterLadderAuthorized:false,sourceMap:admission.sourceMap,sourceBindings:admission.bindings,output:path.join(output,name),sha256:sha(bytes),bytes:bytes.length}));
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.stack);process.exitCode=1;});
