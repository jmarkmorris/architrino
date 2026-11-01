// Explicit-use Stage E consumer checks; not recurring scientific test enrollment.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createEomResponseView} from '../EomResponseRecord.mjs';
import {evaluateEomCubicHistoryAtTime} from '../../../src/apps/shared/EomCubicHistoryEvaluation.mjs';
import {createSurfaceExperiment,isQualifiedPreparation} from '../../../src/apps/surface/SurfaceExperiment.js';
import {validateSurfaceRecord,validateSurfaceRequest,retainedHistories} from '../../../src/apps/surface/SurfaceRecord.js';
import {createEomV2HttpClient} from '../../../src/apps/shared/EomV2HttpClient.js';
const known={coverage:{start:0,end:1},segments:[{startTime:0,endTime:1,coefficients:[[0,1,0,0],[1,0,0,0],[0,0,0,0]],positionErrors:[0,0,0],velocityErrors:[0,0,0]}]};
assert.deepEqual(evaluateEomCubicHistoryAtTime(known,.5).position,{x:.5,y:1,z:0});assert.deepEqual(evaluateEomCubicHistoryAtTime(known,.5).velocity,{x:1,y:0,z:0});assert.throws(()=>evaluateEomCubicHistoryAtTime(known,1.1));
const testView=createEomResponseView({schema:'eom_evolution_response/v2',surfaceDiagnostics:[{pathId:'p0',reception:['0','1']}],ledgers:{pointRoots:[1,2]},publishedExtensions:[]},{sha256:'known'});assert.equal(testView.record.ledgerCounts.pointRoots,2);assert.equal(testView.surfaceDiagnostics.length,1);assert.equal(testView.ledgers,undefined);
assert.equal(createSurfaceExperiment().paths[0].history.angularSpeed,'0.1');assert.equal(isQualifiedPreparation(createSurfaceExperiment()),true);
validateSurfaceRequest(createSurfaceExperiment());const missingControls=createSurfaceExperiment();delete missingControls.numerics;assert.throws(()=>validateSurfaceRequest(missingControls));const reversedPast=createSurfaceExperiment();reversedPast.paths[0].history.start='1';assert.throws(()=>validateSurfaceRequest(reversedPast));
for(const token of ['0x1',' 1']){const badToken=createSurfaceExperiment();badToken.numerics.initialStep=token;assert.throws(()=>validateSurfaceRequest(badToken));}
const model={modelDigest:'1'.repeat(64),resolvedModel:{compositionId:'known',parameters:{radius:'1'}}}, reply={schema:'eom_evolution_response/v2',runId:'known',...model,record:{artifact:{id:'known-record',bytes:100}},acceptedCoverage:{end:'1'},checkpoint:{id:'known-checkpoint'}};
const http=(answer)=>createEomV2HttpClient({fetchImpl:async url=>new Response(JSON.stringify(url.endsWith('/inspect')?model:answer),{status:200})});
assert.equal((await http(reply).evolveRecord({runId:'known'})).runId,'known');
const mismatch=structuredClone(reply);mismatch.resolvedModel.parameters.radius='2';await assert.rejects(http(mismatch).evolveRecord({runId:'known'}),error=>error.retainedFailure?.recordId==='known-record');
let absentCalls=0;const absent=createEomV2HttpClient({fetchImpl:async()=>{absentCalls++;throw new Error('Known absent service');}});await assert.rejects(absent.evolveRecord({runId:'known'}),/absent service/);assert.equal(absentCalls,1);
console.log('Known display interpolation/velocity/coverage, bounded-view and exact circular-preparation controls pass BEFORE target reads.');
const root='.local-data/eom/surface-stage-d-2026-10-11';
const request=JSON.parse(fs.readFileSync(root+'/base.request.json'));const result=createEomResponseView(JSON.parse(fs.readFileSync(root+'/base.response.json')),{sha256:'7a62c923420a04c22926588399c0ae9d8dc1417b51c3e934327f3dc2109294e4'});
const record={schema:'surface_playback_record/v1',request,results:[result]};validateSurfaceRecord(record);assert.equal(retainedHistories(record).length,6);
const negatives=[r=>r.request.paths[0].history.phase='0.2',r=>r.request.numerics.rootTolerance='1e-3',r=>r.results[0].acceptedCoverage.end='0.3',r=>r.results[0].publishedExtensions[0].segments[0].start='0.001',r=>r.results[0].publishedExtensions[0].pathId='unknown',r=>r.results[0].resolvedModel.parameters.coupling='1e-3',r=>r.request.paths[0].charge=true,r=>r.results[0].surfaceDiagnostics[0].reception=['0.1','0'],r=>r.results[0].surfaceDiagnostics[0].reception=['-0.1','0'],r=>r.results[0].record.acceptedSurface.certifiedCount=0];
for(const change of negatives){const bad=structuredClone(record);change(bad);assert.throws(()=>validateSurfaceRecord(bad));}
const altered=createSurfaceExperiment();altered.model.coupling='0.00000100000000000000000000000000000001';assert.equal(isQualifiedPreparation(altered),false);
console.log(JSON.stringify({status:'passed',displayBytes:Buffer.byteLength(JSON.stringify(result)),rawBytes:fs.statSync(root+'/base.response.json').size,diagnostics:result.surfaceDiagnostics.length,originalDiagnostics:result.record.originalDiagnosticCount,histories:6,negativeImportControls:negatives.length}));
