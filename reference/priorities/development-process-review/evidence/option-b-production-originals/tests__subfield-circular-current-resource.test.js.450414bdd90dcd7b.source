import test from 'node:test';import assert from 'node:assert/strict';
import {currentCircularDispositions} from '../scripts/eom/prepare-current-subfield-circular-ladder.mjs';
import {acceptCurrentCircularPilot,SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW} from '../scripts/eom/run-subfield-circular-root-rung.mjs';
test('known cost boundary partitions enabled and returned candidates without increasing cap',()=>{
 const rows=currentCircularDispositions(['a','b'],[{candidateId:'a',projected128PhaseSeconds:1800},{candidateId:'b',projected128PhaseSeconds:1800.01}]);
 assert.equal(rows[0].disposition,'proposed-enabled-pending-review');assert.equal(rows[1].disposition,'resource-return-not-run');assert(rows.every(row=>row.wallLimitSeconds===1800&&!row.h3EvidenceEligible));
 assert.throws(()=>currentCircularDispositions(['a','b'],[{candidateId:'a',projected128PhaseSeconds:1},{candidateId:'a',projected128PhaseSeconds:2}]));
 assert.throws(()=>currentCircularDispositions(['a'],[{candidateId:'a',projected128PhaseSeconds:NaN}]));
});
test('current pilot transport requires independently bound review and joint closure',()=>{
 const joint={path:'/known/pilot',sha256:'a'.repeat(64),value:{schema:'circular-current-pilot-admission.v1',accepted:true,h3EvidenceEligible:false,observations:{closed:true,failure:null},process:{accepted:true,processesClosed:true,guardClosed:true,admission:{accepted:true,h3EvidenceEligible:false}}}};
 const review={sha256:SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW.sha256,value:{schema:'circular-independent-current-pilot-review.v1',boundedPilotAccepted:true,h3EvidenceEligible:false,joint:{path:joint.path,sha256:joint.sha256},externalOwner:{exitCode:0,processGroupClosed:true,elapsedWallSeconds:100},phaseCount:32,rowCount:2448,candidateCount:16}};
 review.path=SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW.path;
 assert.equal(acceptCurrentCircularPilot(joint,review,SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW),joint.value.process);
 assert.throws(()=>acceptCurrentCircularPilot(joint,{...review,sha256:'b'.repeat(64)},SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW));
 assert.throws(()=>acceptCurrentCircularPilot(joint,review));
 joint.value.observations.closed=false;assert.throws(()=>acceptCurrentCircularPilot(joint,review,SUBFIELD_CIRCULAR_CURRENT_PILOT_REVIEW));
});
