import assert from 'node:assert/strict';
import{readFileSync,writeFileSync,realpathSync}from'node:fs';
import{createHash}from'node:crypto';
import path from'node:path';
const sha=b=>createHash('sha256').update(b).digest('hex');
function envelope(lease,joint){
 assert.equal(lease.exitCode,0);assert.equal(lease.processGroupClosed,true);assert(lease.elapsedWallSeconds>0&&lease.elapsedWallSeconds<1800);
 assert.equal(joint.schema,'circular-current-rung-admission.v1');assert.equal(joint.accepted,true);assert.equal(joint.h3EvidenceEligible,false);assert.equal(joint.laterLadderAuthorized,false);
 assert.equal(joint.candidateId,'coincident-midpoint-common-frequency');assert.equal(joint.rung,32);
 assert.equal(joint.process.accepted,true);assert.equal(joint.process.processesClosed,true);assert.equal(joint.process.guardClosed,true);assert.equal(joint.process.admission.accepted,true);assert.equal(joint.process.admission.h3EvidenceEligible,false);
 for(const owner of [joint.observations,joint.memory]){assert.equal(owner.closed,true);assert.equal(owner.failure,null);assert(owner.probes.length>=2);for(const p of owner.probes){assert.equal(p.closed,true);assert.equal(p.exitObserved,true);assert.equal(p.exitCode,0);assert.equal(p.exitSignal,null);if(p.mode==='table')assert.equal(p.psClosed,true);if(p.mode==='memory')assert.equal(p.queryClosed,true);}}
 assert(joint.resourceObservations.length>=2);for(const sample of joint.resourceObservations){assert.equal(sample.accepted,true);assert.equal(sample.h3EvidenceEligible,false);}
}
function controls(){
 assert.equal(sha(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
 const p={closed:true,exitObserved:true,exitCode:0,exitSignal:null},o={closed:true,failure:null,probes:[p,p]},lease={exitCode:0,processGroupClosed:true,elapsedWallSeconds:1},joint={schema:'circular-current-rung-admission.v1',accepted:true,h3EvidenceEligible:false,laterLadderAuthorized:false,candidateId:'coincident-midpoint-common-frequency',rung:32,process:{accepted:true,processesClosed:true,guardClosed:true,admission:{accepted:true,h3EvidenceEligible:false}},observations:o,memory:o,resourceObservations:[{accepted:true,h3EvidenceEligible:false},{accepted:true,h3EvidenceEligible:false}]};envelope(lease,joint);
 for(const mutate of [x=>x.lease.exitCode=1,x=>x.lease.processGroupClosed=false,x=>x.lease.elapsedWallSeconds=1800,x=>x.joint.rung=128,x=>x.joint.process.guardClosed=false,x=>x.joint.memory.failure='failure',x=>x.joint.observations.probes[0].closed=false,x=>x.joint.resourceObservations[0].accepted=false]){const pair=structuredClone({lease,joint});mutate(pair);assert.throws(()=>envelope(pair.lease,pair.joint));}
 console.log('Known SHA, complete scoped-envelope positive, and eight failure/deadline/scope/closure negatives passed before any target read.');
}
controls();
if(process.argv[2]!=='--controls'){
 assert.equal(process.argv.length,4,'review-current-rung32.mjs --controls | RUN_ID ADMISSION_PATH');
 const root=process.cwd(),runId=process.argv[2],jointPath=path.resolve(process.argv[3]);assert(/^[0-9a-f-]{36}$/u.test(runId));
 const bindings=new Map(),bind=(filename,expected)=>{const p=path.resolve(root,filename),bytes=readFileSync(p),digest=sha(bytes);if(expected)assert.equal(digest,expected,p);const row={path:p,sha256:digest,bytes:bytes.length};bindings.set(p,row);return row;},json=p=>JSON.parse(readFileSync(p));
 const lease=json(path.join(root,'.local-data/owned-compute/leases',runId+'.json')),joint=json(jointPath);envelope(lease,joint);bind(jointPath);
 assert.equal(lease.command,'node');assert.equal(lease.args[0],'scripts/eom/run-current-subfield-circular-root-rung.mjs');
 const option=name=>lease.args[lease.args.indexOf(name)+1];assert.equal(path.resolve(root,option('--out'),'current-admission.json'),jointPath);
 assert.equal(path.resolve(root,option('--profile')),path.resolve(joint.profile.path));assert.equal(option('--profile-sha256'),joint.profile.sha256);
 const profile=json(joint.profile.path);bind(joint.profile.path,joint.profile.sha256);const invocationReviewPath='reference/priorities/development-process-review/evidence/circular-current-execution/current-profile32-review.json',invocationReview=json(invocationReviewPath);bind(invocationReviewPath);assert.equal(invocationReview.accepted,true);assert.equal(invocationReview.requiredCliProfileSha256,joint.profile.sha256);assert.equal(path.resolve(invocationReview.profile.path),path.resolve(joint.profile.path));assert.equal(profile.candidateId,joint.candidateId);assert.equal(profile.rung,joint.rung);assert.equal(profile.limitMs,1800000);
 for(const source of Object.values(profile.sources))bind(source.path,source.sha256);bind(profile.node.path,profile.node.sha256);for(const source of profile.node.sharedObjects)bind(source.path,source.sha256);
 const plan=json(profile.plan.path),review=json(profile.planReview.path);bind(profile.plan.path,profile.plan.sha256);bind(profile.planReview.path,profile.planReview.sha256);bind(profile.prior.path,profile.prior.sha256);
 assert.equal(review.schema,'circular-current-resource-plan-review.v1');assert.equal(review.accepted,true);assert.equal(review.h3EvidenceEligible,false);assert.equal(review.candidateId,joint.candidateId);assert.equal(review.rung,joint.rung);assert.equal(review.plan.sha256,profile.plan.sha256);assert.equal(review.entrySha256,profile.sources.entry.sha256);assert.equal(review.memoryOwnerSha256,profile.sources.memoryOwner.sha256);assert.equal(review.memoryHelperSha256,profile.sources.memoryHelper.sha256);
 for(const owner of [joint.observations,joint.memory])for(const source of [...owner.sourceBindings,...owner.runtimeBindings]){const measured=bind(source.path,source.sha256);assert.equal(measured.bytes,source.bytes);if(source.realPath)assert.equal(realpathSync(source.path),source.realPath);}
 const rungBytes=readFileSync(path.resolve(root,profile.sources.runner.path)),dispatcherBytes=readFileSync(path.resolve(root,profile.sources.dispatcher.path));
 const url=b=>'data:text/javascript;base64,'+b.toString('base64'),rung=await import(url(rungBytes)),dispatcher=await import(url(dispatcherBytes));rung.validateSubfieldCircularResourcePlan(plan);
 for(const[key,filename]of Object.entries(rung.SUBFIELD_CIRCULAR_RUNTIME_PATHS))bind(filename,rung.SUBFIELD_CIRCULAR_RUNTIME_HASHES[key]);
 const runOutput=path.join(path.dirname(jointPath),'rung');
 const rechecked=await dispatcher.subfieldCircularDispatchFileOperation({kind:'admit',root,rungBytes,rungSha256:profile.sources.runner.sha256,runOutput,candidateId:joint.candidateId,rung:joint.rung,wallLimitSeconds:1800,processReceipt:joint.process,bindings:[],plan:{path:path.resolve(profile.plan.path),sha256:profile.plan.sha256}});
 assert.equal(rechecked.accepted,true);assert.equal(rechecked.h3EvidenceEligible,false);assert.deepEqual(rechecked.phaseReceipts,joint.process.admission.phaseReceipts);assert.deepEqual(rechecked.summary,joint.process.admission.summary);assert.deepEqual(rechecked.rungProcess,joint.process.admission.rungProcess);
 const summary=json(rechecked.summary.path);assert.equal(summary.phaseCount,32);assert.equal(summary.rowCount,1152);
 bind(lease.stdoutPath);bind(lease.stderrPath);
 const result={schema:'circular-independent-current-rung-review.v1',accepted:true,h3EvidenceEligible:false,laterLadderAuthorized:false,candidateId:joint.candidateId,rung:joint.rung,phaseCount:summary.phaseCount,rowCount:summary.rowCount,admission:bind(jointPath),profile:joint.profile,plan:profile.plan,planReview:profile.planReview,knownControlsPassedBeforeTarget:true,checkedUniqueBindings:bindings.size,bindings:[...bindings.values()],dispatcherRecomputedAdmission:rechecked,externalOwner:{runId,exitCode:lease.exitCode,processGroupClosed:lease.processGroupClosed,elapsedWallSeconds:lease.elapsedWallSeconds},closedProcessProbes:joint.observations.probes.length,closedMemoryProbes:joint.memory.probes.length,resourceObservations:joint.resourceObservations.length,boundary:'Independent operational source/closure/scope review plus re-execution of the unchanged declared admission instrument. Re-execution is deterministic transport evidence; numerical correctness remains with the unchanged independent references. No later rung or H3 authorization.'};
 writeFileSync('reference/priorities/development-process-review/evidence/circular-current-execution/current-rung32-independent-review.json',JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({accepted:true,phaseCount:32,rowCount:1152,checkedUniqueBindings:bindings.size,laterLadderAuthorized:false}));
}
