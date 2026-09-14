#!/usr/bin/env node
// Candidate-specific data preparation only. The production EOM and the frozen
// prescribed circular evaluators remain unchanged.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalStringify } from '../../src/apps/borg/BorgCertifiedBudgets.js';
import { prepareOrdinaryEvolutionRequest } from './prepare-ordinary-evolution-request.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const check = (ok, message) => { if (!ok) throw new Error(message); };
const sha256 = value => createHash('sha256').update(value).digest('hex');
const token = value => {
  check(Number.isFinite(value), 'finite binary64 carrier required');
  return Object.is(value, -0) ? '0' : value.toString();
};

export const B13_RELEASE = Object.freeze({
  schema: 'braid-program/b1-3-circular-release-declaration.v1',
  candidateId: 'b1-3-circular-balanced-locus',
  fieldSpeed: '1', beta: '2.974307176117293568027380199624405914686222541005478142309948089455288', radius: '0.5617317000712902207417147050795197657217944026929011952931141159066451',
  radiusStar: '1', effectiveStrength: '1', chargeMagnitude: '1', coupling: '1',
  angularVelocity: '5.2948893141330990222198341218550365272093435090874684611564960934394992274289131', period: '1.1866509259048213597786822809197254921825571223936242037859209975941094859055343',
  releaseTime: '0', historyStart: '-1.1866509259048213597786822809197254921825571223936242037859209975941094859055343', historyDepth: '1.1866509259048213597786822809197254921825571223936242037859209975941094859055343',
  maximumChordDelay: '1.1234634001425804414834294101590395314435888053858023905862282318132902', historyClearance: '0.0631875257622409182952528707606859607389683170078218131996927657808192859055343',
  exactBalanceTarget: {
    definition: 'the unique simple zero of the regular alternating hexagon tangential acceleration coefficient inside betaBracket',
    betaBracket: ['2.974307176117283568027380199624405914686222541005478142309948089455288','2.974307176117303568027380199624405914686222541005478142309948089455288'],
    radiusRule: 'R/R_*= -a_radial(beta)/beta^2 with R_*=1',
    intervalProofStatus: 'pending independent directed-rounding sign and range certificate',
  },
  historySegmentsPerMember: 4096,
  historyPositionError: '2e-13', historyVelocityError: '2e-9',
  historyErrorMethod: {
    fourthDerivativeUpper: '441.526197100356184101474226690183942827528968678356556062001',
    maximumSegmentWidth: '0.000289709698707231777289717353740167356489882109959380909127422',
    positionRule: 'M4*h^4/300 plus 128 binary64 eps times max(1,R,beta)',
    velocityRule: 'M4*h^3/8 plus 256 binary64 eps times max(1,beta,omega*beta)',
  },
  phases: ['0', '1.0471975511965976', '2.0943951023931953', '3.141592653589793', '4.1887902047863905', '5.235987755982989'],
  polarities: [1, -1, 1, -1, 1, -1],
  expectedRootCountMatrix: [[1,3,3,3,1,1],[1,1,3,3,3,1],[1,1,1,3,3,3],[3,1,1,1,3,3],[3,3,1,1,1,3],[3,3,3,1,1,1]],
  expectedDirectedRootCount: 72,
  rootPolicy: {
    chart: 'sharp', coincidentSelfRoot: 'excluded', nontrivialSameTransmitterRoots: 'required',
    ownership: 'ordered receiver path, ordered transmitter path, emission-time order',
    ordinaryContinuation: 'same owner and ordinal with overlapping consecutive root enclosures',
    birthDeathFoldPolicy: 'fail-closed: stop the rung and report the first nonordinary or ownership-changing event; no finite-width rescue',
  },
  returnAction: {
    eventTime: '1.1866509259048213597786822809197254921825571223936242037859209975941094859055343', rotation: [[1,0,0],[0,1,0],[0,0,1]], translation: ['0','0','0'],
    memberPermutation: [0,1,2,3,4,5], lift: 'one positive circular turn', retainedHistoryDepthLambda: '2',
    comparedHistorySeconds: '1.1234634001425804414834294101590395314435888053858023905862282318132902',
  },
  rungs: [
    { id:'coarse', initialStep:'0.00390625', minimumStep:'0.0001220703125', maximumStep:'0.00390625', rootTolerance:'2e-8', accelerationTolerance:'8e-6', positionTolerance:'1e-7', velocityTolerance:'1e-7', correctionTolerance:'1e-6' },
    { id:'medium', initialStep:'0.001953125', minimumStep:'0.00006103515625', maximumStep:'0.001953125', rootTolerance:'1e-8', accelerationTolerance:'4e-6', positionTolerance:'2.5e-8', velocityTolerance:'2.5e-8', correctionTolerance:'5e-7' },
    { id:'fine', initialStep:'0.0009765625', minimumStep:'0.000030517578125', maximumStep:'0.0009765625', rootTolerance:'5e-9', accelerationTolerance:'2e-6', positionTolerance:'6.25e-9', velocityTolerance:'6.25e-9', correctionTolerance:'2.5e-7' },
  ],
  acceptanceTolerances: {
    positionReturn:'0.0001', velocityReturn:'0.0001', retainedHistoryReturn:'0.0002', rootTimingReturn:'0.0001',
    adjacentRungPosition:'0.0001', adjacentRungVelocity:'0.0001',
  },
  precisionPolicy: { bulk:'binary64-outward', difficultRowInitialBits:128, difficultRowMaximumBits:512, roundingMode:'outward', deterministicReduction:'fixed-pairwise', sharpAccelerationRootRefinement:{levels:2,ratio:'0.1',finiteWidthFallback:false} },
  stoppingRules: ['requested one-cycle horizon','EOM solver halt','missing or non-bijective root ownership','root birth, death, fold, or other nonordinary event','resource limit','operator stop','input or executable identity change'],
  resources: { wallSecondsPerRung:7200, heartbeatSeconds:15, rssSampleSeconds:1, aggregateRssBytes:1610612736, outputBytesPerRung:268435456, aggregateOutputBytes:1073741824, diskMinimumBytes:5368709120, workerThreads:8, requestMemoryBytes:1073741824 },
  claimBoundary: 'questions 1-3 only; no perturbation or positive-width work; no retained, stable, bound, or physical claim without the declared gates',
});

function state(phase, time) {
  const r = Number(B13_RELEASE.radius), w = Number(B13_RELEASE.angularVelocity), a = phase + w*time;
  return { p:[r*Math.cos(a),r*Math.sin(a),0], v:[-r*w*Math.sin(a),r*w*Math.cos(a),0] };
}
function cubic(a, b, s0, s1) {
  const h=b-a;
  return s0.p.map((p0, axis) => {
    const p1=s1.p[axis], v0=s0.v[axis], v1=s1.v[axis];
    return [p0, v0, 3*(p1-p0)/(h*h)-(2*v0+v1)/h, 2*(p0-p1)/(h*h*h)+(v0+v1)/(h*h)].map(token);
  });
}
export function buildHandoff() {
  const start=Number(B13_RELEASE.historyStart), end=0, count=B13_RELEASE.historySegmentsPerMember, h=(end-start)/count;
  const members=B13_RELEASE.phases.map((phaseToken,index) => {
    const phase=Number(phaseToken), segments=[];
    for(let j=0;j<count;j++){
      const a=j===0?start:start+h*j, b=j===count-1?end:start+h*(j+1);
      const coefficients=cubic(a,b,state(phase,a),state(phase,b));
      segments.push({ startTime:j===0?B13_RELEASE.historyStart:token(a), endTime:j===count-1?'0':token(b), coefficients,
        positionErrors:Array(3).fill(B13_RELEASE.historyPositionError), velocityErrors:Array(3).fill(B13_RELEASE.historyVelocityError) });
    }
    const material=JSON.stringify(segments);
    return { pathId:`b13-${index}`, sourceHistoryId:`b13-circular-prehistory/${index}`, sourceFingerprint:`sha256:${sha256(material)}`,
      polarity:B13_RELEASE.polarities[index], phaseAtRelease:phaseToken, segments };
  });
  return { schema:'braid-program/b1-3-circular-prehistory-handoff.v1', declaration:B13_RELEASE, members };
}

function allocationsFor(rung) {
  const id=`b1-3-circular-${rung.id}-v1`, f={ causalWidth:'0.0001', coreScale:'0.0001', quadratureTolerance:'1e-8', receiverImpulseTotal:'1e-8', receiverPositionMomentTotal:'1e-8', independentOverlap:'0',
    rowFractions:{quadrature:'0.35',causalWidthRegulator:'0.15',coreRegulator:'0.15',finiteWidthStateNumerical:'0.15',amendment1RegulatorMatching:'0.20'},
    finiteWidthStateNumericalFractions:{retainedHistory:'0.04',interpolation:'0.04',rounding:'0.02',endpointLinearShortcut:'0.05'}, regulatorRefinementRatio:'0.5', regulatorLevels:3, receiverAllocationRule:'equal-routed-pair-weight/v1' };
  return { schema:'borg_certified_budget/v1', presetId:id, topLevel:{positionIncrement:'1e-6',velocityIncrement:'1e-6'},
    controller:{initialStep:rung.initialStep,minimumStep:rung.minimumStep,maximumStep:rung.maximumStep,adaptiveGrowth:false},
    ordinary:{rootTimeEnclosure:rung.rootTolerance,accelerationEnclosure:rung.accelerationTolerance,farFieldEnclosureFraction:'0',acceptedStepPosition:rung.positionTolerance,acceptedStepVelocity:rung.velocityTolerance,correctionAccelerationResidual:rung.correctionTolerance,transmitterFactorFloor:'1e-12',chartPolicy:'sharp',quadratureTolerance:f.quadratureTolerance},
    finiteWidth:{...f,quadratureMaximumDepth:undefined,quadratureMaximumCells:undefined,eventMaximumDepth:undefined,eventMaximumCells:undefined},
    precision:{bulk:'binary64-outward',difficultRowInitialBits:128,difficultRowMaximumBits:512,forceEventPrecisionEscalation:false,deterministicReduction:'fixed-pairwise',roundingMode:'outward'},
    resources:{rootMaximumDepth:256,rootMaximumCells:100000,quadratureMaximumDepth:16,quadratureMaximumCells:10000,eventMaximumDepth:16,eventMaximumCells:10000,correctionIterations:16,maximumStepAttempts:4096,maximumRejectedSteps:128,workerThreads:8,requestMemoryBytes:1073741824} };
}
export function makePrepared(handoff, rung) {
  const allocations=allocationsFor(rung);
  // Remove explanatory-only undefined keys before canonical validation.
  allocations.finiteWidth=JSON.parse(JSON.stringify(allocations.finiteWidth));
  const canonical=canonicalStringify(allocations), presetId=allocations.presetId;
  return prepareOrdinaryEvolutionRequest({ candidateId:B13_RELEASE.candidateId, releaseTime:'0', historyCoverageStart:B13_RELEASE.historyStart,
    historyEvidence:[{role:'balanced-locus',path:'reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.md',sha256:sha256(readFileSync(resolve(ROOT,'reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.md')))}],
    histories:handoff.members.map(({pathId,sourceHistoryId,sourceFingerprint,polarity,segments})=>({pathId,sourceHistoryId,sourceFingerprint,polarity,segments})),
    settings:{runId:presetId,endTime:B13_RELEASE.period,strength:{effectiveStrength:'1',chargeMagnitude:'1',coupling:'1'},
      numericalControls:{initialStep:rung.initialStep,minimumStep:rung.minimumStep,maximumStep:rung.maximumStep,useAdaptiveStepGrowth:false,rootTolerance:rung.rootTolerance,accelerationTolerance:rung.accelerationTolerance,farFieldEnclosureFraction:'0',positionTolerance:rung.positionTolerance,velocityTolerance:rung.velocityTolerance,correctionTolerance:rung.correctionTolerance,threadCount:8},
      coreScale:'0.0001',certifiedBudget:{presetId,allocations,allocationCanonicalJson:canonical,allocationHash:sha256(canonical)},
      operationalLimits:{wallSeconds:7200,heartbeatSeconds:15,aggregateRssBytes:1610612736,rssSampleIntervalSeconds:1,logBytes:16777216,outputBytes:268435456,diskMinimumBytes:5368709120}} });
}

function main(args=process.argv.slice(2)) {
  check(args.length===2&&args[0]==='--out', 'usage: --out FRESH_DIRECTORY');
  const out=resolve(args[1]); mkdirSync(out,{recursive:false,mode:0o700});
  const handoff=buildHandoff();
  const handoffBytes=Buffer.from(JSON.stringify(handoff)+'\n');
  writeFileSync(resolve(out,'handoff.json'),handoffBytes,{flag:'wx',mode:0o600});
  for(const rung of B13_RELEASE.rungs){ const prepared=makePrepared(handoff,rung); writeFileSync(resolve(out,`${rung.id}-request.json`),JSON.stringify(prepared,null,2)+'\n',{flag:'wx',mode:0o600}); }
  const receipt={schema:'braid-program/planar-three-binary-circular-release-preparation.v1',accepted:false,eomExecuted:false,handoff:{sha256:sha256(handoffBytes),bytes:handoffBytes.length},declaration:B13_RELEASE};
  writeFileSync(resolve(out,'preparation.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx',mode:0o600});
  process.stdout.write(JSON.stringify({out,handoff:receipt.handoff,segments:handoff.members.length*B13_RELEASE.historySegmentsPerMember})+'\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{main();}catch(e){process.stderr.write(e.message+'\n');process.exitCode=1;}}
