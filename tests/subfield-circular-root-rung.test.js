import assert from "node:assert/strict";
import { fstatSync, mkdtempSync, readFileSync, readSync, realpathSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { SUBFIELD_CIRCULAR_BUILD_PATH, SUBFIELD_CIRCULAR_BUILD_SHA, SUBFIELD_CIRCULAR_IDS, SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION, SUBFIELD_CIRCULAR_RUNG_PATH, SUBFIELD_CIRCULAR_RUNTIME_PATHS,
  SUBFIELD_CIRCULAR_RUNTIME_HASHES, authenticateSubfieldCircularPriorPhases, candidateRungDispositions, candidateRungSchedule, candidateWallLimit,
  checkRepeatedSubfieldCircularPhase, parseSubfieldCircularRungArgs, rungSha, validateSubfieldCircularResourcePlan, validateSubfieldCircularRungSummary,
  captureSubfieldCircularRungSource, summarizeSubfieldCircularNamedOutputs, watchedSubfieldCircularRepeatedPhases } from "../scripts/eom/run-subfield-circular-root-rung.mjs";
import { subfieldCircularExactDecimal } from "../src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs";

// Pure scheduling and synthetic receipt plumbing, not independent mathematics.
// No histories are prepared and no EOM root call is made by these controls.
const hash = "a".repeat(64);
function plan() { return { schema: "braid-program/subfield-circular-root-ladder-resource-plan.v1", resourceBudgetReviewed: true,
  independentReviewStatus: "accepted", h3EvidenceEligible: false, rungs: [8,32,128], maximumConcurrentCandidates: 4,
  totalEomWorkers: 4, eomWorkersPerCandidate: 1, wallLimitSecondsPerCandidateRung: 1800,
  resourceObservation: { ...SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION }, candidates: [...SUBFIELD_CIRCULAR_IDS], resourceReturns: [],
  cohorts: [{ id: "ab", candidates: SUBFIELD_CIRCULAR_IDS.slice(0,10), wallLimitSeconds: 1800, resourceReturn: null },
    { id: "c", candidates: SUBFIELD_CIRCULAR_IDS.slice(10), wallLimitSeconds: 3600, resourceReturn: { path: "review.md", sha256: hash, independentReviewStatus: "accepted" } }],
  pilotAdmission: { path: "pilot.json", sha256: hash }, buildReceipt: { path: SUBFIELD_CIRCULAR_BUILD_PATH, sha256: SUBFIELD_CIRCULAR_BUILD_SHA },
  runnerSha256: hash, dispatcherSha256: hash }; }

test("only exact reviewed resource predicates and separately accepted cohort extension admit", () => {
  validateSubfieldCircularResourcePlan(plan()); assert.equal(candidateWallLimit(plan(), "coincident-midpoint-common-frequency"),1800); assert.equal(candidateWallLimit(plan(), "coaxial-separated-two-planar-braid-counter-rotating"),3600);
  for (const mutate of [p=>p.resourceBudgetReviewed=false,p=>p.independentReviewStatus="pending",p=>p.h3EvidenceEligible=true,
    p=>p.rungs=[8,128],p=>p.wallLimitSecondsPerCandidateRung=3600,p=>p.maximumConcurrentCandidates=5,
    p=>p.cohorts[1].resourceReturn.independentReviewStatus="pending",p=>p.cohorts[1].resourceReturn=null,
    p=>p.resourceObservation.minimumSystemFreePercent=19,p=>p.resourceObservation.commandTimeoutMs=2001,
    p=>p.candidates.reverse(),p=>p.cohorts[1].candidates.push("coincident-midpoint-common-frequency"),p=>p.buildReceipt.path="other.json"]) {
    const p=plan(); mutate(p); assert.throws(()=>validateSubfieldCircularResourcePlan(p));
  }
});

test("rung CLI rejects incomplete authority, changed rungs and output escape", () => {
  const a=["--plan","plan.json","--plan-sha256",hash,"--candidate","coincident-center-two-component-circular-co-rotating","--rung","8","--prior-phase-receipts","prior.json",
    "--prior-phase-receipts-sha256",hash,"--out",".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/new","--runner-sha256",hash];
  assert.equal(parseSubfieldCircularRungArgs(a)["--rung"],"8");
  for(const b of [a.slice(0,-2),[...a,"--rung","32"],a.map(x=>x==="8"?"2":x),a.map(x=>x.endsWith("/new")?x+"/../escape":x)])assert.throws(()=>parseSubfieldCircularRungArgs(b));
});

test("all candidate ladders preserve canonical pair/phase counts and exact dyadic times", () => {
  const schedule=SUBFIELD_CIRCULAR_IDS.flatMap(id=>[8,32,128].flatMap(n=>candidateRungSchedule(id,n)));
  assert.equal(schedule.reduce((n,r)=>n+r.rowCount,0),205632);
  assert.deepEqual(candidateRungSchedule("coincident-midpoint-common-frequency",8).map(r=>r.receptionTime),["4","4.5","5","5.5","6","6.5","7","7.5"]);
  assert.equal(candidateRungSchedule("coaxial-separated-two-planar-braid-counter-rotating",128).at(-1).receptionTime,"7.96875");
});

test("failed candidate retains passed phases and accounts for every unvisited ordered pair", () => {
  const schedule=candidateRungSchedule("coincident-midpoint-common-frequency",8), rows=candidateRungDispositions(schedule,[{accepted:true},{process:{dispatchedRows:3}}]);
  assert.deepEqual(rows[0].ranges,[{from:0,count:36,disposition:"passed"}]);
  assert.equal(rows[1].ranges[0].disposition,"failed"); assert.equal(rows[1].ranges[1].count,33);
  assert.equal(rows.flatMap(r=>r.ranges).reduce((n,r)=>n+r.count,0),288);
  assert.equal(rows[7].ranges[0].disposition,"not-run");
});

const repeated = (lower="0.1",upper="0.2")=>({candidateId:"coincident-midpoint-common-frequency",receptionTime:"4",historyManifest:{sha256:hash},members:[{id:"a"}],sourceBinding:{sha256:hash},
  rows:[{receiverIndex:0,transmitterIndex:1,roots:[{lower,upper}]}]});
test("repeat scheduling guard uses exact rational overlap, including closed endpoint contact",()=>{
  assert.equal(checkRepeatedSubfieldCircularPhase(repeated("0.2","0.3"),repeated(),subfieldCircularExactDecimal).accepted,false);
  assert.throws(()=>checkRepeatedSubfieldCircularPhase(repeated("0.200000000000000000000000000001","0.3"),repeated(),subfieldCircularExactDecimal),/disjoint/u);
  const old=repeated(); old.members[0].id="b"; assert.throws(()=>checkRepeatedSubfieldCircularPhase(repeated(),old,subfieldCircularExactDecimal),/identity/u);
});

test("captured repeat worker rejects mismatch and interruption without calling EOM",async()=>{
  const sources=[SUBFIELD_CIRCULAR_RUNG_PATH,SUBFIELD_CIRCULAR_RUNTIME_PATHS.reducer].map(path=>{const bytes=readFileSync(path);return{path,bytes,sha256:rungSha(bytes)};});
  await watchedSubfieldCircularRepeatedPhases({current:repeated(),prior:[repeated()],sources,limitMs:3000});
  await assert.rejects(watchedSubfieldCircularRepeatedPhases({current:repeated("1","2"),prior:[repeated()],sources,limitMs:3000}),/disjoint/u);
  const abort=new AbortController(); abort.abort(new Error("synthetic interruption"));
  await assert.rejects(watchedSubfieldCircularRepeatedPhases({current:repeated(),prior:[repeated()],sources,limitMs:3000,signal:abort.signal}),/interruption/u);
});

function phaseBindings(id,n){return Array.from({length:n},(_,phase)=>({path:`/${id}/${n}/${phase}`,sha256:rungSha(`${id}/${n}/${phase}`),candidateId:id,rung:n,phase}));}
test("authenticated prior chain covers pilot then complete8 and32 admissions, not caller labels",()=>{
  const pilotSummary={accepted:true,h3EvidenceEligible:false,scope:"pilot",phaseCount:32,rowCount:2448,phaseReceipts:SUBFIELD_CIRCULAR_IDS.flatMap(id=>phaseBindings(id,2))};
  const planBinding={path:"/plan",sha256:hash}, old8=phaseBindings("coincident-midpoint-common-frequency",8),old32=phaseBindings("coincident-midpoint-common-frequency",32);
  const admissions=[8,32].map((rung,index)=>({value:{accepted:true,h3EvidenceEligible:false,processesClosed:true,
    admission:{accepted:true,h3EvidenceEligible:false,candidateId:"coincident-midpoint-common-frequency",rung,plan:planBinding,phaseReceipts:index?old32:old8}}}));
  const input={candidateId:"coincident-midpoint-common-frequency",rung:128,prior:{rungAdmissions:[{},{}]},pilotSummary,admissions,
    phaseBindings:[...phaseBindings("coincident-midpoint-common-frequency",2),...old8,...old32],planBinding};
  authenticateSubfieldCircularPriorPhases(input);
  for(const mutate of [x=>delete x.admissions[0].value.admission.plan,x=>x.phaseBindings[0].sha256="b".repeat(64),
    x=>x.admissions[1].value.processesClosed=false,x=>x.admissions.reverse()]){
    const x=structuredClone(input);mutate(x);assert.throws(()=>authenticateSubfieldCircularPriorPhases(x));
  }
  authenticateSubfieldCircularPriorPhases({...input,rung:32,prior:{rungAdmissions:[{}]},admissions:admissions.slice(0,1),phaseBindings:input.phaseBindings.slice(0,10)});
});

test("complete rung summary needs exact scope,census,phase order and hash chain",()=>{
  const phases=phaseBindings("coincident-midpoint-common-frequency",8), summary={schema:"braid-program/subfield-circular-root-summary-reduction.v1",accepted:true,
    h3EvidenceEligible:false,rootExecutionAuthorized:false,authority:"authenticated-phase-summary-chain-only",scope:"candidate-rung",
    candidateIds:["coincident-midpoint-common-frequency"],phaseCount:8,rowCount:288,ordinaryRootCount:240,selfEndpointCount:48,phaseReceipts:phases,
    phaseReceiptChainSha256:rungSha(phases.map(p=>p.sha256).join("\n")+"\n")};
  validateSubfieldCircularRungSummary(summary,{candidateId:"coincident-midpoint-common-frequency",rung:8},phases,"candidate-rung");
  for(const mutation of [{h3EvidenceEligible:true},{phaseCount:7},{rowCount:287},{scope:"pilot"},{phaseReceiptChainSha256:hash}])
    assert.throws(()=>validateSubfieldCircularRungSummary({...summary,...mutation},{candidateId:"coincident-midpoint-common-frequency",rung:8},phases,"candidate-rung"));
});

test("captured frozen runtime import exposes the exact APIs used by the composition",async()=>{
  const api={outer:["processTable","superviseRegisteredPilot","outerWorkerOperation"],pilot:["installPilotSnapshot","watchedPilotFileOperation","validatePilotPhase","validatePilotProof"],
    helper:["runSubfieldCircularPhaseProcess"],bridge:["openSubfieldCircularPhaseLedgerWorker"],watch:["runWatched"],reducer:["subfieldCircularExactDecimal"]};
  for(const[key,names]of Object.entries(api)){const bytes=readFileSync(SUBFIELD_CIRCULAR_RUNTIME_PATHS[key]);assert.equal(rungSha(bytes),SUBFIELD_CIRCULAR_RUNTIME_HASHES[key]);
    if(key==="watch")continue; // This module needs its original file URL; covered by the frozen snapshot control below.
    const m=await import("data:text/javascript;base64,"+bytes.toString("base64"));for(const name of names)assert.equal(typeof m[name],"function",`${key}.${name}`);}
  const sources=[{path:SUBFIELD_CIRCULAR_RUNG_PATH,bytes:readFileSync(SUBFIELD_CIRCULAR_RUNG_PATH)},...Object.values(SUBFIELD_CIRCULAR_RUNTIME_PATHS).map(path=>({path,bytes:readFileSync(path)}))]
    .map(row=>({...row,sha256:rungSha(row.bytes)}));
  const p=await import("data:text/javascript;base64,"+readFileSync(SUBFIELD_CIRCULAR_RUNTIME_PATHS.pilot).toString("base64")),snapshot=p.installPilotSnapshot(sources,realpathSync("."));
  try {assert.equal(typeof(await snapshot.import(SUBFIELD_CIRCULAR_RUNG_PATH)).runSubfieldCircularCandidateRung,"function");
    assert.equal(typeof(await snapshot.import(SUBFIELD_CIRCULAR_RUNTIME_PATHS.watch)).runWatched,"function");}finally{snapshot.close();}
});

test("same-descriptor source capture rejects FIFO, oversized, truncated and changed inputs",()=>{
  const root=realpathSync(mkdtempSync(path.join(os.tmpdir(),"subfieldCircular-rung-capture-"))), filename=path.join(root,"source.mjs"), text="export const synthetic=true;\n";
  writeFileSync(filename,text);assert.equal(captureSubfieldCircularRungSource(filename,rungSha(text)).toString(),text);
  assert.throws(()=>captureSubfieldCircularRungSource(filename,"f".repeat(64)),/generation/u);
  const fifo=path.join(root,"fifo");execFileSync("/usr/bin/mkfifo",[fifo]);assert.throws(()=>captureSubfieldCircularRungSource(fifo,hash),/regular/u);
  writeFileSync(filename,Buffer.alloc(2*1024**2+1));assert.throws(()=>captureSubfieldCircularRungSource(filename,hash),/bounded/u);
  writeFileSync(filename,text);let truncated=false;
  assert.throws(()=>captureSubfieldCircularRungSource(filename,rungSha(text),{stat:fstatSync,read:(...args)=>{
    if(!truncated){truncated=true;writeFileSync(filename,"");}return readSync(...args);}}),/truncated/u);
});

test("named output accounting deduplicates paths and retains honest partial precision scope",()=>{
  const a={path:"/a",sha256:hash,bytes:10},b={path:"/b",sha256:hash,bytes:20};
  const x=summarizeSubfieldCircularNamedOutputs([a,b,a],128);assert.equal(x.outputBytes,30);assert.equal(x.namedOutputCount,2);assert.equal(x.maximumPrecisionBits,128);
  assert.match(x.outputBytesScope,/excludes shared/u);assert.equal(summarizeSubfieldCircularNamedOutputs([],null).maximumPrecisionBits,null);
  assert.throws(()=>summarizeSubfieldCircularNamedOutputs([a,{...a,bytes:11}],53),/conflicting/u);
  assert.throws(()=>summarizeSubfieldCircularNamedOutputs([a],0),/precision/u);
});
