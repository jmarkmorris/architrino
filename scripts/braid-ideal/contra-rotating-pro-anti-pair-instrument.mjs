#!/usr/bin/env node

// Section 92 seed-grade contra-rotating pro/anti pair instrument.
//
// The single-braid calibration is measured by the existing exact-causal-root
// runner.  The pair is a declared two-copy linear ansatz: the anti copy has
// the opposite axial pump, velocity-circulatory block, and antisymmetric
// stiffness block.  A finite inter-copy lock is then scanned.  No cross-braid
// retained-history force row is invented: the absence of that row is itself
// part of the representability verdict and prevents a native release.

import { fileURLToPath } from "node:url";

import { axisPencilSpectrum } from "./kapitza-flutter-stabilization.mjs";
import {
  braidNetZTorque,
  gyroscopicTiltAnalysisFull,
} from "./spindle-support-ratio-targeted-search.mjs";
import { CONTRA_ROTATING_PAIR_FIXTURE } from "./contra-rotating-pro-anti-pair-fixture.mjs";

export const CONTRA_ROTATING_PAIR_SCHEMA = "contra_rotating_pro_anti_pair_instrument.v0";
export const CONTRA_ROTATING_PAIR_SPEC = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md#92-contra-rotating-proanti-pair-native-self-sinking-instrument-2026-07-12";

const zeros = (rows, cols = rows) => Array.from({ length: rows }, () => Array(cols).fill(0));
const symmetricPart = (A) => A.map((row, i) => row.map((v, j) => (v + A[j][i]) / 2));
const antisymmetricPart = (A) => A.map((row, i) => row.map((v, j) => (v - A[j][i]) / 2));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const conjugateByAxisReflection = (A) => {
  const sign = [1, 1, 1, -1, -1, -1];
  return A.map((row, i) => row.map((v, j) => sign[i] * v * sign[j]));
};

function blockPair({ pro, anti, lockStiffness = 0, lockDamping = 0 }) {
  const n = pro.mass.length;
  const mass = zeros(2 * n);
  const velocity = zeros(2 * n);
  const stiffness = zeros(2 * n);
  for (let copy = 0; copy < 2; copy++) {
    const offset = copy * n;
    const source = copy === 0 ? pro : anti;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      mass[offset + i][offset + j] = source.mass[i][j];
      velocity[offset + i][offset + j] = source.velocity[i][j];
      stiffness[offset + i][offset + j] = source.stiffness[i][j];
    }
    for (let i = 0; i < n; i++) {
      stiffness[offset + i][offset + i] += lockStiffness;
      stiffness[offset + i][(1 - copy) * n + i] -= lockStiffness;
      velocity[offset + i][offset + i] += lockDamping;
      velocity[offset + i][(1 - copy) * n + i] -= lockDamping;
    }
  }
  return { mass, velocity, stiffness };
}

function hardLockPencil(pro, anti) {
  return {
    mass: pro.mass.map((row, i) => row.map((v, j) => v + anti.mass[i][j])),
    velocity: pro.velocity.map((row, i) => row.map((v, j) => v + anti.velocity[i][j])),
    stiffness: pro.stiffness.map((row, i) => row.map((v, j) => v + anti.stiffness[i][j])),
  };
}

export function contraRotatingProAntiPairInstrument({ fixture = CONTRA_ROTATING_PAIR_FIXTURE } = {}) {
  const pump = braidNetZTorque({});
  const flutter = gyroscopicTiltAnalysisFull({});
  const pro = flutter.pencilMatrices;
  const stiffnessSymmetric = symmetricPart(pro.stiffness);
  const stiffnessCirculatory = antisymmetricPart(pro.stiffness);
  const anti = {
    mass: conjugateByAxisReflection(pro.mass),
    velocity: conjugateByAxisReflection(pro.velocity),
    stiffness: conjugateByAxisReflection(pro.stiffness),
  };

  const proSpectrum = axisPencilSpectrum(pro);
  const antiSpectrum = axisPencilSpectrum(anti);
  const lockingScan = fixture.lockingScan.map(({ stiffness, damping }) => {
    if (stiffness === 0 && damping === 0) {
      return {
        stiffness,
        damping,
        leadingRe: Math.max(proSpectrum.leading.re, antiSpectrum.leading.re),
        leadingIm: Math.abs(proSpectrum.leading.im),
        stableOrMarginal: false,
        polynomialResidual: Math.max(proSpectrum.leading.pencilResidual, antiSpectrum.leading.pencilResidual),
        dkResidual: Math.max(proSpectrum.dkResidual, antiSpectrum.dkResidual),
        spectrumConstruction: "analytic_union_of_the_two_uncoupled_single_braid_spectra",
      };
    }
    const spectrum = axisPencilSpectrum(blockPair({ pro, anti, lockStiffness: stiffness, lockDamping: damping }));
    return {
      stiffness,
      damping,
      leadingRe: spectrum.leading.re,
      leadingIm: Math.abs(spectrum.leading.im),
      stableOrMarginal: spectrum.leading.re <= fixture.marginalGrowthTolerance,
      polynomialResidual: spectrum.leading.pencilResidual,
      dkResidual: spectrum.dkResidual,
    };
  });
  const hardLock = axisPencilSpectrum(hardLockPencil(pro, anti));

  const proPump = pump.net;
  const antiPump = -proPump;
  const intrinsicNetPump = proPump + antiPump;
  const pumpCancelsAtDeclaredBoundary = Math.abs(intrinsicNetPump) <= fixture.pumpTolerance;
  const anyFiniteLockStable = lockingScan.some((row) => row.stableOrMarginal);
  const hardLockStable = hardLock.leading.re <= fixture.marginalGrowthTolerance;
  const nativeCrossPairRowsPresent = false;
  const locks = nativeCrossPairRowsPresent && anyFiniteLockStable;
  const closesLinearGates = pumpCancelsAtDeclaredBoundary && anyFiniteLockStable && locks;

  return {
    schema: CONTRA_ROTATING_PAIR_SCHEMA,
    spec: CONTRA_ROTATING_PAIR_SPEC,
    claimLevel: "seed_grade_two_copy_axis_ansatz_not_a_retained_history_release",
    ansatz: {
      primary: fixture.primaryAnsatz,
      comparison: fixture.comparisonAnsatz,
      geometryConsumedByCurrentLinearInstrument: false,
      reasonGeometryNotConsumed: "cross_braid_retained_history_force_and_torque_rows_are_not_present",
    },
    regression: {
      pro: { pump: proPump, leadingRe: proSpectrum.leading.re, leadingIm: Math.abs(proSpectrum.leading.im) },
      anti: { pump: antiPump, leadingRe: antiSpectrum.leading.re, leadingIm: Math.abs(antiSpectrum.leading.im) },
      removingPartnerRecoversSingleBraid: Math.abs(proSpectrum.leading.re - flutter.maxGrowthRate) < 1e-12,
      pumpTargetError: Math.abs(proPump - fixture.singlePumpTarget),
      flutterTargetError: Math.abs(proSpectrum.leading.re - fixture.singleFlutterGrowthTarget),
    },
    pump: {
      pro: proPump,
      anti: antiPump,
      intrinsicNet: intrinsicNetPump,
      cancelsAtDeclaredPairBoundary: pumpCancelsAtDeclaredBoundary,
      crossPairContributionMeasured: false,
      genuinelySelfSinkingEstablished: false,
      honesty: "the zero is imposed by the conjugate two-copy boundary until same-record cross-braid torque rows show that the interaction preserves it",
    },
    jointFlutter: {
      construction: "the anti copy is the axis-reflected similarity conjugate of the pro pencil; this reverses the handed cross-axis circulatory blocks while preserving the isolated spectrum exactly",
      stiffnessSymmetricScale: maxAbs(stiffnessSymmetric),
      stiffnessCirculatoryScale: maxAbs(stiffnessCirculatory),
      freePair: lockingScan[0],
      finiteLockingScan: lockingScan,
      anyFiniteLockStable,
      hardLockCounterfactual: {
        leadingRe: hardLock.leading.re,
        leadingIm: Math.abs(hardLock.leading.im),
        stableOrMarginal: hardLockStable,
        handedVelocityCancellationResidual: Math.max(
          ...[0, 1, 2].flatMap((i) => [3, 4, 5].map((j) => Math.abs(pro.velocity[i][j] + anti.velocity[i][j]))),
        ),
      },
      flutterCancelled: anyFiniteLockStable && hardLockStable,
    },
    lockingRepresentability: {
      nativeCrossPairRowsPresent,
      finiteLockingMechanismDerived: false,
      locks,
      verdict: "pair_does_not_lock_in_the_current_native_record_the_declared_pairing_remains_an_ansatz",
    },
    luminalApproach: {
      reached: false,
      xiLimitMeasured: false,
      photonChannelCandidate: false,
      neutrinoNearLockResidueMeasured: false,
      blocker: "no_locked_linearly_closed_pair_branch_exists_to_continue_toward_xi_zero",
    },
    decision: closesLinearGates
      ? "pair_cancels_pump_quiets_flutter_and_locks_hand_back_for_release_adjudication"
      : "pump_cancels_only_at_the_declared_boundary_but_flutter_survives_and_no_native_lock_exists_no_release",
    releaseGate: {
      pumpClosed: pumpCancelsAtDeclaredBoundary,
      flutterMarginalOrStable: anyFiniteLockStable,
      locks,
      closesLinearGates,
      nativeRetainedHistoryReleaseAuthorized: false,
      firstFailedGate: anyFiniteLockStable ? "native_pair_lock" : "joint_flutter",
    },
    centralSolverTouched: false,
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function isMain() {
  return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
}
if (isMain()) {
  process.stdout.write(`${JSON.stringify(contraRotatingProAntiPairInstrument(), null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
}
