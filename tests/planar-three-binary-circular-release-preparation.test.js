import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { B13_RELEASE, buildHandoff, makePrepared } from '../scripts/eom/prepare-planar-three-binary-circular-release.mjs';
import { ALL_RETAINED_ROOTS_POLICY, evaluatePrescribedRecordAnalysis } from '../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs';
import { ledgerAt, selfRoots } from '../scripts/equation-mapping/analyze-circular-self-hit-binary.mjs';

function independentCrossLedger({ phases, polarities, beta }) {
  const period = 2 * Math.PI / beta;
  const sources = phases.map((phase, index) => ({
    id: `source-${index}`,
    charge: polarities[index],
    trajectory: {
      kind: 'moving-circular.v1',
      epochTime: 0,
      centerAtEpoch: [0, 0, 0],
      centerVelocity: [0, 0, 0],
      radiusU: [1, 0, 0],
      radiusV: [0, 1, 0],
      angularVelocity: beta,
      angularAcceleration: 0,
      phaseAtEpoch: phase,
    },
  }));
  const modelRevisionSha256 = createHash('sha256').update(JSON.stringify({
    history: { start: -2.05, end: period },
    sources,
    fieldSpeed: 1,
    sourceLaw: 'default uncapped emission-site acceleration law',
  })).digest('hex');
  return evaluatePrescribedRecordAnalysis({
    sourceRecord: {
      schema: 'prescribed-path-analysis/exact-source-record.v1',
      assemblyId: `asm-${modelRevisionSha256.slice(0, 32)}`,
      modelRevisionSha256,
      recordId: 't04-exact-reference-handoff-independent-cross-root-check',
      engineId: 'prescribed-geometry',
      history: { start: -2.05, end: period },
      sources,
    },
    protocol: {
      schema: 'prescribed-path-analysis/analysis-protocol.v1',
      protocolId: 't04-exact-reference-handoff-independent-cross-root-check',
      fieldSpeed: 1,
      coupling: 1,
      history: { start: -2.05, end: period, minimumDelay: 1e-9 },
      returnWindow: { start: 0, period },
      rootPolicy: {
        id: ALL_RETAINED_ROOTS_POLICY,
        tolerance: 1e-12,
        maxIterations: 180,
        initialSubdivisionCount: 128,
        maximumSubdivisionDepth: 28,
        maximumCandidateIntervals: 32768,
      },
      tolerances: {
        cancellationFloor: 1e-14,
        rootTransversalityFloor: 1e-8,
        minimumSeparationFloor: 1e-6,
        convergenceAbsolute: 1e-7,
      },
      geometry: { minimumSeparationSamples: 64 },
      convergence: { rootTolerance: 1e-13, maxIterations: 200, minimumSeparationSamples: 128 },
      probes: phases.map((_, index) => ({
        id: `probe-${index}`,
        kind: 'prescribed-source-endpoint-probe.v1',
        transmitterId: `source-${index}`,
        selfHitPolicy: 'exclude-same-transmitter-id.v1',
        observationTimes: [0],
        polarities: [polarities[index]],
      })),
    },
  });
}

test('planar common-center three-binary constraint release carries only a complete past cycle and exact strength factorization', () => {
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
  assert.equal(prepared.transportRequest.numericalControls.threadCount,8);
  assert.equal(B13_RELEASE.resources.aggregateRssBytes,1610612736);
  assert.equal(B13_RELEASE.precisionPolicy.sharpAccelerationRootRefinement.finiteWidthFallback,false);
});

test('planar common-center three-binary constraint frozen topology and return action preserve all six identities', () => {
  assert.equal(B13_RELEASE.expectedRootCountMatrix.flat().reduce((a,b)=>a+b,0),72);
  assert.deepEqual(B13_RELEASE.returnAction.memberPermutation,[0,1,2,3,4,5]);
  assert.deepEqual(B13_RELEASE.returnAction.rotation,[[1,0,0],[0,1,0],[0,0,1]]);
  assert.equal(Number(B13_RELEASE.historyDepth)>Number(B13_RELEASE.maximumChordDelay),true);
  assert.equal(B13_RELEASE.claimBoundary.includes('questions 1-3 only'),true);
});

test('T04 exact-reference handoff matches both unchanged independent root instruments and all six acceleration rows', () => {
  const source = JSON.parse(readFileSync(new URL('../reference/priorities/braid-program/configurations/equal-radius-planar-three-binary-balance-beta-2p974307176117293.v3.json', import.meta.url)));
  const sourceBeta = Number(source.geometry.balanceParameters.betaDecimal);
  const sourceRadius = Number(source.geometry.balanceParameters.radiusDecimal);
  const beta = Number(B13_RELEASE.beta);
  const radius = Number(B13_RELEASE.radius);
  const phases = B13_RELEASE.phases.map(Number);
  const polarities = B13_RELEASE.polarities;
  const cross = independentCrossLedger({ phases, polarities, beta });
  const self = ledgerAt(beta).selfOnly;
  const selfRootCount = selfRoots(beta).length;
  assert.equal(cross.reducedMeasures.validity.passed, true,
    JSON.stringify(cross.reducedMeasures.numericalConvergence));
  assert.equal(source.geometry.balanceParameters.directedRootCount, B13_RELEASE.expectedDirectedRootCount);
  assert.ok(sourceBeta >= Number(B13_RELEASE.exactBalanceTarget.betaBracket[0]));
  assert.ok(sourceBeta <= Number(B13_RELEASE.exactBalanceTarget.betaBracket[1]));
  assert.ok(Math.abs(sourceBeta - beta) <= 2e-16);
  assert.ok(Math.abs(sourceRadius - radius) <= 1e-16);
  assert.ok(2.974307176117306 >= 2.97430717611728 && 2.974307176117306 <= 2.97430717611732);
  assert.ok(sourceBeta >= 2.97430717611728 && sourceBeta <= 2.97430717611732);
  assert.ok(0.5617317000713459 >= 0.56173170007128 && 0.5617317000713459 <= 0.56173170007136);
  assert.ok(sourceRadius >= 0.56173170007128 && sourceRadius <= 0.56173170007136);
  assert.equal(cross.rawLedgers.causalRoots.length, 6);
  let directedRootCount = 0;
  let maximumFullResidual = 0;
  let minimumCompatibleRadius = Number.POSITIVE_INFINITY;
  let maximumCompatibleRadius = Number.NEGATIVE_INFINITY;
  cross.rawLedgers.causalRoots.forEach((event, receiverIndex) => {
    const expectedCrossRoots = B13_RELEASE.expectedRootCountMatrix[receiverIndex]
      .reduce((sum, count, transmitterIndex) => sum + (transmitterIndex === receiverIndex ? 0 : count), 0);
    assert.equal(event.rootCount, expectedCrossRoots);
    directedRootCount += event.rootCount + selfRootCount;
    const phase = phases[receiverIndex];
    const acceleration = event.measures.probeResponses[0].acceleration;
    const crossRadial = acceleration.x * Math.cos(phase) + acceleration.y * Math.sin(phase);
    const crossTangential = -acceleration.x * Math.sin(phase) + acceleration.y * Math.cos(phase);
    const radial = crossRadial + self.radial;
    const tangential = crossTangential + self.tangential;
    const compatibleRadius = -radial / (beta * beta);
    minimumCompatibleRadius = Math.min(minimumCompatibleRadius, compatibleRadius);
    maximumCompatibleRadius = Math.max(maximumCompatibleRadius, compatibleRadius);
    maximumFullResidual = Math.max(maximumFullResidual,
      Math.hypot(radial + beta * beta * radius, tangential, acceleration.z));
  });
  assert.equal(directedRootCount, B13_RELEASE.expectedDirectedRootCount);
  assert.ok(maximumCompatibleRadius - minimumCompatibleRadius <= 2e-10,
    `receiver-compatible radii differ by ${maximumCompatibleRadius - minimumCompatibleRadius}`);
  assert.ok(radius >= minimumCompatibleRadius - 2e-10 && radius <= maximumCompatibleRadius + 2e-10,
    `frozen radius ${radius} is outside independent receiver-compatible enclosure`);
  assert.ok(maximumFullResidual <= 2e-8,
    `independent full-vector residual ${maximumFullResidual} exceeds handoff budget`);
});
