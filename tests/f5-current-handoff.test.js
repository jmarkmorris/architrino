import { knownHashAnswers as admittedKnownHashAnswers } from '../scripts/equation-mapping/controlled-fixture-records.mjs';
const knownHashes = admittedKnownHashAnswers("tests/f5-current-handoff.test.js");
const ABC_SHA = knownHashes.sha256.abc;
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { admitStage, recheckBindings } from '../scripts/eom/run-f5-current-handoff.mjs';
import { readBound } from '../scripts/eom/launch-f5-prehistory-handoff-build.mjs';
test('current F5 external admission controls reject substituted bridge and changed prior inputs',()=>{
 const dir=mkdtempSync(path.join(tmpdir(),'f5-current-admission-'));
 try {
 const put=(name,value)=>{const p=path.join(dir,name);writeFileSync(p,typeof value==='string'?value:JSON.stringify(value));return readBound(p);};
 const plan=put('plan','abc'), bridge=put('bridge','bridge'), handoff=put('handoff','data');
 assert.equal(plan.sha256,ABC_SHA);
 const packet={schema:'braid-program/f5-current-handoff-stage.v1',stage:'produce',completed:true,accepted:false,h3EvidenceEligible:false,evolutionAuthorized:false,requiresFreshExternalCompletion:true,plan,bindings:{bridge,plan},handoff,inspectorClosed:true};
 const receipt=put('stage.json',packet);const stdout=put('stdout',{completed:true,accepted:false,stage:'produce',h3EvidenceEligible:false,receipt});
 const lease={status:'completed',exitCode:0,exitSignal:null,processGroupClosed:true,stdoutPath:stdout.path};
 assert.equal(admitStage(lease,'produce',plan,dir,bridge).packet.inspectorClosed,true);
 assert.throws(()=>admitStage(lease,'produce',plan,dir,{...bridge,sha256:'0'.repeat(64)}),/bridge/);
 assert.throws(()=>admitStage({...lease,processGroupClosed:false},'produce',plan,dir,bridge),/closure/);
 assert.throws(()=>admitStage({...lease,exitCode:1},'produce',plan,dir,bridge),/closure/);
 writeFileSync(plan.path,'changed after producer admission');assert.throws(()=>recheckBindings(packet.bindings),/differs/);
 } finally {rmSync(dir,{recursive:true,force:true});}
});
