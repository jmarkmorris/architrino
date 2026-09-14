// Literal transport controls. The adapter independently owns historical truth.
import test from 'node:test';
import assert from 'node:assert/strict';
import {historicalEvidenceInputs,historicalInvocationVersion} from '../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const binding=(path,sha256='a'.repeat(64),bytes=3)=>({path,sha256,bytes});
function fixture(){
 const original=binding('/repo/old.py'),physical=binding('/repo/evidence/old.py.source');
 return {bindings:{adapter:binding('/repo/adapter.py','b'.repeat(64))},runtimeBindings:[binding('/python','c'.repeat(64))],historicalEvidence:{selection:{schema:'braid-program/variable-cell-historical-evidence.v1',routes:[{original,physical}]},sourceBindings:[physical]}};
}
test('literal historical v5 passes the version gate while new v6 requires separate acceptance',()=>{
 assert.equal(historicalInvocationVersion('braid-program/f6c-streamed-leaf-invocation.v5'),undefined);
 assert.throws(()=>historicalInvocationVersion('braid-program/f6c-streamed-leaf-invocation.v6'),/separately reviewed acceptance/);
});
test('literal retained selection includes exact nonexecuting physical source',()=>{
 const spec=fixture(),before=structuredClone(spec);assert.deepEqual(historicalEvidenceInputs(spec),spec.historicalEvidence.sourceBindings);assert.deepEqual(spec,before);
 assert.deepEqual(historicalEvidenceInputs({...spec,historicalEvidence:null}),[]);
});
test('archive/runtime confusion, substitution, omitted and duplicate sources reject',()=>{
 for(const mutate of [s=>s.historicalEvidence.selection.schema='unknown',s=>s.historicalEvidence.selection.routes[0].physical.sha256='b'.repeat(64),s=>s.historicalEvidence.sourceBindings=[],s=>s.historicalEvidence.selection.routes.push(s.historicalEvidence.selection.routes[0]),s=>s.runtimeBindings.push(s.historicalEvidence.selection.routes[0].physical),s=>s.bindings.adapter=s.historicalEvidence.selection.routes[0].physical,s=>s.historicalEvidence.sourceBindings.push(s.historicalEvidence.sourceBindings[0]),s=>s.historicalEvidence.selection.extra=true,s=>s.historicalEvidence.sourceBindings[0]={...s.historicalEvidence.sourceBindings[0],bytes:4}]){
  const s=fixture();mutate(s);assert.throws(()=>historicalEvidenceInputs(s));
 }
});
test('distinct historical generations at one logical path remain distinct',()=>{
 const s=fixture(),second={original:binding('/repo/old.py','b'.repeat(64),4),physical:binding('/repo/evidence/second.source','b'.repeat(64),4)};
 s.historicalEvidence.selection.routes.push(second);s.historicalEvidence.sourceBindings.push(second.physical);assert.equal(historicalEvidenceInputs(s).length,2);
});
