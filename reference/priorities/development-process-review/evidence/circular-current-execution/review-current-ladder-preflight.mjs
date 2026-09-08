import assert from 'node:assert/strict';
import{readFileSync,writeFileSync,realpathSync}from'node:fs';
import{createHash}from'node:crypto';
import path from'node:path';
import{currentCircularDispositions}from'../../../../../scripts/eom/prepare-current-subfield-circular-ladder.mjs';
import{SUBFIELD_CIRCULAR_IDS,validateSubfieldCircularResourcePlan}from'../../../../../scripts/eom/run-subfield-circular-root-rung.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.deepEqual(currentCircularDispositions(['a','b'],[{candidateId:'a',projected128PhaseSeconds:1800},{candidateId:'b',projected128PhaseSeconds:1801}]).map(x=>x.disposition),['proposed-enabled-pending-review','resource-return-not-run']);
assert.throws(()=>currentCircularDispositions(['a','b'],[{candidateId:'a',projected128PhaseSeconds:1},{candidateId:'a',projected128PhaseSeconds:1}]));
assert.throws(()=>validateSubfieldCircularResourcePlan({resourceBudgetReviewed:false,independentReviewStatus:'pending'}));
console.log('Known SHA, cost boundary, duplicate census and pending rejection controls passed before target checks.');
const suffix=process.argv[2]??'a';assert(['a','b'].includes(suffix));
const root=process.cwd(),base=path.join(root,'.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/current-ladder-preflight-20260908-'+suffix);
const checked=new Map();
function bind(filename,expected){const p=path.resolve(root,filename),b=readFileSync(p),h=sha(b);if(expected)assert.equal(h,expected,p);checked.set(p,{path:p,sha256:h,bytes:b.length});return{path:p,sha256:h,bytes:b.length};}
const json=p=>JSON.parse(readFileSync(p));
const preflightPath=path.join(base,'preflight.json'),preflight=json(preflightPath);bind(preflightPath);
assert.equal(preflight.accepted,true);assert.equal(preflight.h3EvidenceEligible,false);assert.equal(preflight.laterLadderAuthorized,false);
const plan=json(preflight.plan.path);bind(preflight.plan.path,preflight.plan.sha256);
assert.equal(plan.resourceBudgetReviewed,false);assert.equal(plan.independentReviewStatus,'pending');assert.throws(()=>validateSubfieldCircularResourcePlan(plan));
const review=json(plan.pilotIndependentReview.path);bind(plan.pilotIndependentReview.path,plan.pilotIndependentReview.sha256);bind(plan.pilotAdmission.path,plan.pilotAdmission.sha256);bind(plan.buildReceipt.path,plan.buildReceipt.sha256);
assert.deepEqual(plan.dispositions,currentCircularDispositions(SUBFIELD_CIRCULAR_IDS,review.candidateCosts));assert.deepEqual(plan.candidates,SUBFIELD_CIRCULAR_IDS.slice(0,10));assert.deepEqual(plan.resourceReturns,SUBFIELD_CIRCULAR_IDS.slice(10));
assert.equal(plan.maximumConcurrentCandidates,1);assert.equal(plan.wallLimitSecondsPerCandidateRung,1800);assert.equal(plan.cohorts.length,1);assert.equal(plan.cohorts[0].wallLimitSeconds,1800);
for(const owner of [preflight.memory,preflight.process]){assert.equal(owner.closed,true);assert.equal(owner.failure,null);assert.equal(owner.probes.length,2);for(const p of owner.probes){assert.equal(p.closed,true);assert.equal(p.exitObserved,true);assert.equal(p.exitCode,0);assert.equal(p.exitSignal,null);assert(Number.isFinite(p.cpuUpperBoundSeconds)&&p.cpuUpperBoundSeconds>=0);}
for(const r of [...owner.sourceBindings,...owner.runtimeBindings]){const v=bind(r.path,r.sha256);assert.equal(v.bytes,r.bytes);if(r.realPath)assert.equal(realpathSync(r.path),r.realPath);}}
assert.equal(preflight.memory.probes[1].queryClosed,true);assert.equal(preflight.process.probes[1].psClosed,true);
assert.equal(preflight.resourceObservation.accepted,true);assert(preflight.resourceObservation.freePercent>=plan.resourceObservation.minimumSystemFreePercent);assert(BigInt(preflight.resourceObservation.availableDiskBytes)>=BigInt(plan.resourceObservation.minimumFreeDiskBytesAtLaunch));
const runId=suffix==='a'?'df6de16d-5d85-45eb-a1c8-6d187ea0ac67':'57c5451f-0814-4924-b0eb-0d2a315c54ea',lease=json(path.join(root,'.local-data/owned-compute/leases',runId+'.json'));assert.equal(lease.exitCode,0);assert.equal(lease.processGroupClosed,true);assert(lease.elapsedWallSeconds<60);bind(lease.stdoutPath);bind(lease.stderrPath);
const priorPath=path.join(base,'first-rung-prior.json'),prior=json(priorPath);bind(priorPath);assert.equal(prior.candidateId,plan.candidates[0]);assert.equal(prior.phaseReceipts.length,2);assert.equal(prior.rungAdmissions.length,0);for(const r of prior.phaseReceipts)bind(r.path,r.sha256);
const output={schema:'circular-independent-current-ladder-preflight-review.v1',accepted:true,h3EvidenceEligible:false,laterLadderAuthorized:false,knownControlsPassedBeforeTarget:true,preflight:bind(preflightPath),pendingPlan:bind(preflight.plan.path),checkedUniqueBindings:checked.size,bindings:[...checked.values()],externalOwner:{runId,exitCode:lease.exitCode,processGroupClosed:lease.processGroupClosed,elapsedWallSeconds:lease.elapsedWallSeconds},freePercent:preflight.resourceObservation.freePercent,availableDiskBytes:preflight.resourceObservation.availableDiskBytes,enabledCandidates:plan.candidates.length,resourceReturnCandidates:plan.resourceReturns.length,boundary:'Fresh preflight and unchanged-cap serial plan applicability only; current entry, each actual rung and exact external zero exit remain required.'};
writeFileSync('reference/priorities/development-process-review/evidence/circular-current-execution/current-ladder-preflight-review'+(suffix==='a'?'':'-'+suffix)+'.json',JSON.stringify(output,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({accepted:true,checkedUniqueBindings:checked.size,enabled:10,returns:6,laterLadderAuthorized:false}));
