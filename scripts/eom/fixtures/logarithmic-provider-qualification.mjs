// Explicit-use qualification of production EOM transport and shared clients.
// Analytical acceleration/derivative references live in the C++ manual fixture.
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createEomV2ProcessClient } from '../EomV2ProcessClient.mjs';
import { createEomV2HttpClient } from '../../../src/apps/shared/EomV2HttpClient.js';
import { selectEomModel, eomModelOptions } from '../../../src/apps/shared/EomModelSelection.js';
const binaryPath=resolve(process.argv[2]??'.tmp/logarithmic-provider/build/eom_borg_shadow_cli');
const output=resolve(process.argv[3]??'.local-data/eom/logarithmic-provider-2026-11-01');
mkdirSync(output,{recursive:true});
const client=createEomV2ProcessClient({binaryPath,checkpointRoot:resolve(output,'checkpoints'),recordRoot:resolve(output,'records')});
const zero=['0','0','0'];
const request=(domain='unrestricted')=>({schema:'eom_evolution_request/v2',runId:`logarithmic-${domain}`,
 model:{compositionId:'logarithmic/v1',constraint:'none',method:'numerical',fieldSpeed:'1',coupling:'0.0001',speedDomain:domain,boundaryPolicy:domain==='unrestricted'?'none':'halt'},
 interval:{start:'0',end:'0.25'},
 paths:['-0.1','0.1'].map((x,i)=>({pathId:`p${i}`,charge:i?'1':'-1',history:{kind:'cubic',segments:[{start:'-2',end:'0',coefficients:[[x,'0','0','0'],['0','0','0','0'],['0','0','0','0']],positionErrors:zero,velocityErrors:zero}]}})),
 numerics:{initialStep:'0.03125',maximumStep:'0.03125',minimumStep:'0.0078125',rootTolerance:'1e-9',accelerationTolerance:'1e-5',positionTolerance:'1e-6',velocityTolerance:'1e-6',correctionTolerance:'1e-6',maxStepAttempts:64,maxRejectedSteps:16},resources:{memoryBytes:1073741824}});
const execute=(operation,r,extra={},options={})=>client.execute(JSON.stringify({operation,...(r?{request:r}:{}),...extra}),{runId:r?.runId,...options});
const denied=(r)=>assert.equal(r.schema,'eom_error/v2',JSON.stringify(r));
const seal=cp=>{const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;delete cp.digest;cp.digest=createHash('sha256').update(JSON.stringify(sorted(cp))).digest('hex');return cp;};
try {
 // Test the checkpoint resealing helper before applying it to target evidence.
 assert.equal(seal({a:1}).digest,createHash('sha256').update('{"a":1}').digest('hex'));
 console.log('known resealing control passed');
 const caps=await client.capabilities();
 const choices=await client.modelOptions();assert(choices.some(o=>o.id==='logarithmic/v1'));
 assert(!eomModelOptions(caps,{constraint:'surface'}).some(o=>o.id==='logarithmic/v1'));
 assert(!eomModelOptions(caps,{errorBoundChecking:'none'}).some(o=>o.id==='logarithmic/v1'));
 assert.throws(()=>selectEomModel(caps,{compositionId:'logarithmic/v1',errorBoundChecking:'none'}));
 assert.equal((await client.selectModel()).compositionId,'canonical/v1');
 assert.equal(selectEomModel(caps,{compositionId:'logarithmic/v1'}).speedDomain,'unrestricted');
 assert.throws(()=>selectEomModel(caps,{compositionId:'logarithmic/v1',constraint:'surface'}));
 const inspections=[],results=[];
 for(const domain of ['unrestricted','inclusive','strict']) {
  const r=request(domain), inspected=await execute('inspect',r);assert.equal(inspected.schema,'eom_inspection/v2');
  assert.equal(inspected.resolvedModel.modelBindingId,'logarithmic-potential/v1');
  assert.equal(inspected.resolvedModel.legacyModelFingerprint,null);inspections.push(inspected);
  const result=await execute('evolve',r);assert.equal(result.status,'completed',JSON.stringify(result.halt));
  assert.equal(result.acceptedCoverage.end,'0.25');assert.equal(result.modelDigest,inspected.modelDigest);
  assert.equal(result.checkpoint.durable,true);assert.equal(result.checkpoint.data.providerState.schema,'logarithmic-revalidate-publication/v1');
  assert(result.ledgers.ordinarySolutions.every(s=>s.certified));
  for(const snapshot of result.ledgers.pointRoots)for(const pair of snapshot.pairs){ assert(pair.rootFreeComplement); assert.equal(pair.roots.length,pair.receiverPathId===pair.transmitterPathId?0:1); if(pair.receiverPathId===pair.transmitterPathId)assert(pair.coincidentEndpointExcluded); }
  assert(result.ledgers.partnerRoots.some(row=>!row.analyticSourceAcceleration));
  assert.equal(result.evidence.scientificAcceptance,false);results.push(result);
  writeFileSync(resolve(output,`${domain}.json`),JSON.stringify({request:r,result}));
 }
 assert.equal(new Set(inspections.map(r=>r.modelDigest)).size,3);
 assert.deepEqual(results[0].publishedExtensions,results[1].publishedExtensions);
 assert.deepEqual(results[0].publishedExtensions,results[2].publishedExtensions);
 const r=request(), result=results[0];
 const resumed=await execute('resume',r,{checkpoint:result.checkpoint.data,endTime:'0.3125'});assert.equal(resumed.status,'completed');
 const longer=structuredClone(r);longer.interval.end='0.3125';const full=await execute('evolve',longer);
 assert.deepEqual(resumed.checkpoint.data.histories,full.checkpoint.data.histories);
 for(const change of [q=>q.model.coupling='0.0002',q=>q.model.compositionId='canonical/v1',q=>q.paths[0].charge='1',q=>q.numerics.rootTolerance='1e-8']) {
  const changed=structuredClone(r);change(changed);denied(await execute('resume',changed,{checkpoint:result.checkpoint.data,endTime:'0.3125'}));
 }
 const corrupted=structuredClone(result.checkpoint.data);corrupted.histories[0].segments.at(-1).coefficients[0][0]='2';
 denied(await execute('resume',r,{checkpoint:seal(corrupted),endTime:'0.3125'}));
 const wrongState=structuredClone(result.checkpoint.data);wrongState.providerState.schema='canonical-v7-inside-v8/v1';
 denied(await execute('resume',r,{checkpoint:seal(wrongState),endTime:'0.3125'}));
 for(const change of [q=>q.model.constraint='surface',q=>q.model.method='analytical',q=>q.numerics.errorBoundChecking='none',q=>q.model.fieldSpeed='2',q=>q.paths[0].history.segments[0].positionErrors[0]='1e-10',q=>q.paths[0].history.segments[0].coefficients[0][1]='1']) {
  const changed=structuredClone(r);change(changed);denied(await execute('inspect',changed));
 }
 const shallow=structuredClone(r);for(const p of shallow.paths)p.history.segments[0].start='-0.1';
 const shallowResult=await execute('evolve',shallow);assert.notEqual(shallowResult.status,'completed');assert.equal(shallowResult.acceptedCoverage.end,'0');
 // Browser client uses the same service envelopes. This fetch adapter tests
 // client framing/binding, not actual browser rendering or HTTP deployment.
 const fetchImpl=async(url,init)=>{ const value=url.endsWith('/capabilities')?caps:await execute(url.endsWith('/inspect')?'inspect':'evolve',JSON.parse(init.body)); return {ok:true,json:async()=>value,text:async()=>JSON.stringify(value)}; };
 const browser=createEomV2HttpClient({fetchImpl});
 assert((await browser.modelOptions()).some(o=>o.id==='logarithmic/v1'));
 assert.equal((await browser.selectModel({compositionId:'logarithmic/v1'})).compositionId,'logarithmic/v1');
 const browserResult=await browser.evolve(r);assert.equal(browserResult.modelDigest,result.modelDigest);
 await browser.dispose();
 const record=await execute('evolve',r,{}, {retainRecord:true});
 assert.equal(record.record.acceptedOrdinary.certifiedCount,record.record.acceptedOrdinary.certificateCount);
 assert(record.record.acceptedOrdinary.certificateCount>0);
 writeFileSync(resolve(output,'resume.json'),JSON.stringify({resumed,full}));
 console.log('logarithmic v2 transport, three domain/halt policies, generated-history evolution, v8 replay, resealed corruption refusals, retained records and shared Node/browser selection passed');
} finally { await client.dispose(); }
