// Synthetic batch transport controls. Frozen independent mathematical controls
// remain separate; no retained history, provider or numerical launch occurs.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,linkSync,renameSync,realpathSync,statSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import path from 'node:path';
import * as B from '../scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';
const root=realpathSync(process.cwd());
const sha=b=>createHash('sha256').update(b).digest('hex');
const b=(p,hash='a'.repeat(64),bytes=1)=>({path:p,sha256:hash,bytes});
function configuration(indices=[3,4,5]){
 const hookModule=b(path.join(root,B.SELF)),hookControls=b(path.join(root,B.CONTROL));
 const pythonCommand=path.resolve(root,process.env.AAA_VENV??'../.venv','bin/python'),git=realpathSync('/usr/bin/git');
 const runtimeBindings=[b(realpathSync(process.execPath)),b(realpathSync(pythonCommand)),b(path.resolve(path.dirname(pythonCommand),'../pyvenv.cfg')),b(git)];
 const parents=indices.map(parentIndex=>({parentIndex,plan:b('/synthetic/parent-'+parentIndex+'.json'),output:path.join(root,B.LANE,'pilot-parent-'+parentIndex+'-synthetic'),producerMaximumBytes:1048576,comparisonMaximumBytes:1048576}));
 return{root,operationDirectory:'/synthetic/operation',parents,pythonCommand,git,hookModule,hookControls,sources:[...parents.map(p=>p.plan),...runtimeBindings],runtimeBindings,closureReserveBytes:1048576};
}
test('fixed math census/limits and source pins remain unchanged',()=>{
 assert.equal(B.LIMIT,1800000);assert.equal(B.FILE,67108864);assert.equal(B.LOG,16777216);
 assert.deepEqual(B.CENSUS,{cells:1,members:8,queries:3584,pairRows:64,ordinaryPairs:56,selfZeros:8,pieceRecords:112});
 assert.deepEqual(B.ALGORITHM,{lowerQueriesPerPair:32,upperQueriesPerPair:32,upperSearchRestartsFromOriginal:true,receptionSubdivision:false,automaticRetry:false});
 for(const name of ['proposalReference','comparisonReference']){const[p,h]=B.NAMED[name];assert.equal(sha(readFileSync(path.join(root,p))),h);}
 assert.equal(sha(readFileSync(path.join(root,B.COORDINATOR[0]))),B.COORDINATOR[1]);
 assert.ok(Object.values(B.CLAIMS).every(v=>v===false));
});
test('closed JSON parser rejects duplicate keys/trailing syntax/unsafe integers',()=>{
 for(const raw of ['{"a":1,"a":2}','{"x":{"a":1,"a":2}}','null null','[NaN]','[9007199254740993]'])assert.throws(()=>B.parseJSON(Buffer.from(raw)));
 assert.deepEqual(B.parseJSON(Buffer.from('{"a":0.0,"b":[1e-6,true,null,"-0"]}\n')),{a:0,b:[.000001,true,null,'-0']});
 assert.throws(()=>B.binding(b('/a/../b'),root));assert.throws(()=>B.binding(b('/a\0b'),root));
});
test('data-only planmaker gives exact3/4/5 producer/comparison order and alias layout',()=>{
 const input=configuration(),copy=structuredClone(input),p=B.makeBatchPlan(input);assert.deepEqual(input,copy);
 assert.deepEqual(p.stages.map(s=>s.id),['parent-3-producer','parent-3-comparison','parent-4-producer','parent-4-comparison','parent-5-producer','parent-5-comparison']);
 assert.equal(p.outputDirectories.length,6);assert.equal(p.publicationAliases.length,15);
 for(let i=0;i<3;i++)assert.deepEqual(p.stages[2*i].args,['--registered','producer','--parent',String(i+3)]);
 assert.equal(p.configuration.closureReserveBytes,1048576);
});
test('data-only parent plans preserve every original mathematical/ancestry token',()=>{
 const template={schema:'braid-program/f6c-parent-emission-refinement-launch.v1',scope:B.parentScope(2),parentIndex:2,
  ...Object.fromEntries(Object.entries(B.NAMED).map(([k,[p,h]])=>[k,b(p,h??'b'.repeat(64))])),
  dependencies:Object.fromEntries(Object.entries(B.DEPENDENCIES).map(([k,[p,h]])=>[k,b(p,h)])),originalBindings:Object.fromEntries(Object.entries(B.ORIGINAL).map(([k,[p,h,n]])=>[k,b(p,h,n??1)])),
  acceptanceOwner:b('reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md'),priorCoverClosure:{original:'exact preserved source tokens'},runtimeBindings:[],operationalBindings:[],limits:structuredClone(B.LIMITS)};
 const sourceBindings=['producer','producerControls','verifier','verifierControls'].map(k=>b(path.join(root,B.NAMED[k][0]),'c'.repeat(64)));
 const input={template,indices:[3,4,5],sourceBindings,runtimeBindings:[b('/python')],operationalBindings:[b('/operation')],acceptanceOwner:template.acceptanceOwner,historicalDocumentRoutes:[]},before=structuredClone(input);
 const plans=B.makeParentPlans(input);assert.deepEqual(input,before);assert.deepEqual(plans.map(p=>p.parentIndex),[3,4,5]);
 for(const p of plans){assert.equal(p.schema,'braid-program/f6c-parent-emission-refinement-launch.v2');assert.deepEqual(p.originalBindings,template.originalBindings);assert.deepEqual(p.dependencies,template.dependencies);assert.deepEqual(p.priorCoverClosure,template.priorCoverClosure);assert.equal(p.proposalReference.sha256,B.NAMED.proposalReference[1]);assert.equal(p.producer.sha256,'c'.repeat(64));}
 assert.throws(()=>B.makeParentPlans({...input,indices:[3,3]}));assert.throws(()=>B.makeParentPlans({...input,sourceBindings:sourceBindings.slice(1)}));
 const bad=structuredClone(template);bad.proposalReference.sha256='d'.repeat(64);assert.throws(()=>B.makeParentPlans({...input,template:bad}));
});
test('batch validates explicit order and rejects changed stages/aliases/roots',()=>{
 const p=B.makeBatchPlan(configuration());assert.equal(B.validateBatch(p).parents.length,3);
 const mutations=[v=>v.configuration.parents.reverse(),v=>v.configuration.parents[1].parentIndex=3,v=>v.stages.reverse(),v=>v.stages.pop(),v=>v.outputDirectories.pop(),v=>v.publicationAliases[0].privatePrefix='foreign-',v=>v.configuration.parents[0].output+='/nested',v=>v.configuration.extra=true,v=>v.configuration.closureReserveBytes=0,v=>v.configuration.parents[0].producerMaximumBytes=67108864];
 for(const mutate of mutations){const v=structuredClone(p);mutate(v);assert.throws(()=>B.validateBatch(v));}
 assert.throws(()=>B.validateBatch(B.makeBatchPlan(configuration([0,1,2,3,4,5,6,7,8]))));
});
test('registered args require original deadline, captured plan and immediate prior context',()=>{
 const args=['--registered','producer','--parent','3','--operation-plan-binding','{}','--operation-deadline-ns','123','--operation-prior-stdout','null'];
 assert.equal(B.parseRegisteredArgs(args)['--parent'],'3');
 for(const bad of [args.slice(2),[...args,'--parent','3'],args.map(v=>v==='3'?'03':v),args.map(v=>v==='producer'?'retry':v)])assert.throws(()=>B.parseRegisteredArgs(bad));
 assert.throws(()=>C.stageArguments(['--operation-plan-binding','{}'],null,'123',b('/plan')));
 assert.equal(C.stageArguments(['--registered','producer','--parent','3'],null,'123',b('/plan')).length,10);
});
test('duration transfer cannot reset original1800s or compare epochs',()=>{
 assert.deepEqual(B.remainingDuration('9000000000000',8999000000000n),{originalNodeDeadlineNanoseconds:'9000000000000',entryBudgetStampNanoseconds:'8999000000000',remainingNanoseconds:'1000000000',seconds:'1.000000000'});
 for(const now of[9000000000000n,9000000000001n,1n])assert.throws(()=>B.remainingDuration('9000000000000',now));
});
test('hook leaves completion binding ownership to frozen coordinator',()=>{
 const stdout=b('/synthetic/runner-stdout.log'),input={accepted:true,h3EvidenceEligible:false,completionLog:stdout,completion:{accepted:true}},copy=structuredClone(input);
 const actual=B.coordinatorAdmission(input,structuredClone(stdout));assert.deepEqual(input,copy);assert.equal(actual.accepted,true);
 assert.ok(!Object.hasOwn(actual,'completionLog'));assert.ok(!Object.hasOwn(actual,'completionLogIdentity'));
 assert.deepEqual(actual.completion,input.completion);
 assert.throws(()=>B.coordinatorAdmission(input,{...stdout,bytes:2}));
 assert.throws(()=>B.coordinatorAdmission({...input,completionLogIdentity:'foreign'},stdout));
 const source=readFileSync(path.join(root,B.SELF),'utf8');assert.ok(source.includes('return coordinatorAdmission(result,job.stdoutLog)'));
});
test('exact historical tuples are separate logical/physical bindings',()=>{
 const rows=[['7d4c202ce935256168ccef52e3588ffa72eb4d6509db432e814eba65ed5568bc',16985],['2883081c639b1dc1a833a5c7a2f76ec79fbb3c7756718110a2e8db593b827a40',13021]].map(([h,n],i)=>({original:b(path.join(root,'reference/priorities/braid-program/evidence','old-'+i+'.json'),h,n),physical:b('/synthetic/archives/'+h+'.json',h,n)}));
 const routes=B.historicalRoutes(rows,root);assert.deepEqual(B.physicalSource(rows[0].original,{historicalDocumentRoutes:routes}),rows[0].physical);
 assert.deepEqual(B.historicalRoutes([],root),[]);assert.deepEqual(B.historicalRoutes([rows[1]],root),[rows[1]]);
 for(const mutate of [v=>v.push(v[0]),v=>v[0].physical.sha256='0'.repeat(64),v=>v[0].original.bytes++,v=>v[0].physical.path=v[0].original.path,v=>v[0].original.path='/scripts/executable.py']){const v=structuredClone(rows);mutate(v);assert.throws(()=>B.historicalRoutes(v,root));}
 assert.throws(()=>B.physicalSource({...rows[0].original,bytes:1},{historicalDocumentRoutes:routes}));
});
test('eight publication paths count four inodes; replacement/third alias reject',()=>{
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'parent-batch-controls-')));
 try{const out=path.join(dir,'out');mkdirSync(out);
  for(const n of ['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json']){const hidden=path.join(out,n+'.partial.'+'a'.repeat(32));writeFileSync(hidden,'{}\n');linkSync(hidden,path.join(out,n));}
  assert.equal(B.inspectCandidate(out,true).bytes,12);assert.equal(B.inspectCandidate(out,true).bindings.length,4);
  linkSync(path.join(out,'rows.ndjson'),path.join(dir,'foreign'));assert.throws(()=>B.inspectCandidate(out,true));
 }finally{rmSync(dir,{recursive:true});}
});
test('original metadata retains nonuniform exact endpoint tokens',()=>{
 const tokens=Array.from({length:161},(_,n)=>String(n/1000));tokens[3]='0.0030000000000000001';tokens[4]='0.0040000000000000001';
 const segments=[...Array(1600).fill(null),...tokens.slice(0,-1).map((startTime,n)=>({startTime,endTime:tokens[n+1]}))];
 const exported={schema:'braid-program/f6c-retained-history-export.v1',fieldSpeed:'1',acceptedFrames:tokens.filter((_,n)=>n%2===0).map(time=>({time})),retainedHistories:Array.from({length:8},()=>({segments:structuredClone(segments)}))};
 assert.deepEqual(B.originalParentMetadata(exported,3).reception,{lower:tokens[3],upper:tokens[4],precision:90});
 const bad=structuredClone(exported);bad.retainedHistories[7].segments[1603].startTime='0.003';assert.throws(()=>B.originalParentMetadata(bad,3));
});
test('thin batch source contains no legacy supervisor or output deletion',()=>{
 const source=readFileSync(path.join(root,B.SELF),'utf8');
 assert.ok(!source.includes('export async function coordinate('));assert.ok(!source.includes('retractOwnedOutputs'));assert.ok(!source.includes('unlinkSync'));
 assert.ok(!source.includes("import {spawn,execFile}"));assert.ok(source.includes("await import('node:child_process')"));
});
