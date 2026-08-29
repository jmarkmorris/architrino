import test from 'node:test';
import assert from 'node:assert/strict';
import { B13_RELEASE, buildHandoff, makePrepared } from '../scripts/eom/prepare-b1-3-circular-release.mjs';

test('B1.3 release carries only a complete past cycle and exact strength factorization', () => {
  const handoff=buildHandoff();
  assert.equal(handoff.members.length,6);
  assert.equal(handoff.members.every(m=>m.segments.length===4096),true);
  assert.equal(handoff.members.every(m=>m.segments[0].startTime===B13_RELEASE.historyStart&&m.segments.at(-1).endTime==='0'),true);
  const prepared=makePrepared(handoff,B13_RELEASE.rungs[0]);
  assert.equal(prepared.status,'mechanically-prepared-not-authorized');
  assert.equal(prepared.eomExecuted,false);
  assert.equal(prepared.transportRequest.absoluteTimeInterval.start,'0');
  assert.equal(prepared.transportRequest.absoluteTimeInterval.end,B13_RELEASE.period);
  assert.equal(prepared.transportRequest.modelControls.futurePathPolicy,'prohibited');
  assert.equal(prepared.transportRequest.modelControls.coupling,'1');
  assert.equal(prepared.transportRequest.histories.length,6);
});

test('B1.3 frozen topology and return action preserve all six identities', () => {
  assert.equal(B13_RELEASE.expectedRootCountMatrix.flat().reduce((a,b)=>a+b,0),72);
  assert.deepEqual(B13_RELEASE.returnAction.memberPermutation,[0,1,2,3,4,5]);
  assert.deepEqual(B13_RELEASE.returnAction.rotation,[[1,0,0],[0,1,0],[0,0,1]]);
  assert.equal(Number(B13_RELEASE.historyDepth)>Number(B13_RELEASE.maximumChordDelay),true);
  assert.equal(B13_RELEASE.claimBoundary.includes('questions 1-3 only'),true);
});
