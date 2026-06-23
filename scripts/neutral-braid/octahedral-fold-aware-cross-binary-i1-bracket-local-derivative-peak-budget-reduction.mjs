#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate,
} from "./octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_bracket_local_derivative_peak_budget_reduction";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_THETA_CELL_COUNT = 16;
const DEFAULT_SPEED_CELL_COUNT = 8;
const DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS = 5;
const DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS = 3;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const EXPECTED_SOURCE_ROOT_COUNT = 6;
const EXPECTED_TERM_SIGNATURE = "1,3,1,1";
const SOURCE_ROOT_DOMAIN_MIN = 1e-9;
const SOURCE_ROOT_DOMAIN_RELATIVE_PADDING = 1e-8;
const QUARTER_PERIOD = Math.PI / 2;
const TWO_PI = 2 * Math.PI;
const ROOT_TUBE_PARAMETER_GRID_COORDINATES = [0, 0.5, 1];
const ROOT_TUBE_F_DELTA_COORDINATES = [0, 0.5, 1];
const COMPLEMENT_DELTA_SAMPLE_COUNT = 9;
const SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS = 16;
const SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS = 32;
const SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS = 48;
const DEFAULT_DIRECT_INTERVAL_THETA_LOCALIZATION_SUBDIVISIONS = 2;
const DEFAULT_DIRECT_INTERVAL_SPEED_LOCALIZATION_SUBDIVISIONS = 1;
const SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR = 10;
const JET_MAX_TOTAL_ORDER = 5;
const JET_MULTI_INDICES = [
  [0, 0],
  [1, 0],
  [0, 1],
  [2, 0],
  [1, 1],
  [0, 2],
  [3, 0],
  [2, 1],
  [1, 2],
  [0, 3],
  [4, 0],
  [3, 1],
  [2, 2],
  [1, 3],
  [0, 4],
  [5, 0],
  [4, 1],
  [3, 2],
  [2, 3],
  [1, 4],
  [0, 5],
];
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const REDUCED_LOCAL_SUCCESSOR_ROW =
  "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required";
const CLOSED_LOCAL_SUCCESSOR_ROW =
  "I1.f1.full-interval-zero-isolation-critical-exhaustion-quadrature-required";
const CURVATURE_INTERVAL_JET_TARGET_STATUS =
  "curvature-interval-jet-target-emitted";
const SAMPLED_ANALYTIC_JET_CURVATURE_STATUS =
  "sampled-analytic-jet-curvature-witness-passed";
const SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS =
  "sampled-analytic-jet-envelope-budget-passed";
const SAMPLED_FOURTH_JET_CURVATURE_TRANSPORT_STATUS =
  "sampled-fourth-jet-curvature-transport-witness-passed";
const SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS =
  "sampled-fifth-jet-curvature-gradient-transport-witness-passed";
const SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_STATUS =
  "sampled-theta-localized-taylor-upper-envelope-witness-passed";
const SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS =
  "sampled-theta-localized-taylor-upper-envelope-witness-open";
const DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS =
  "directed-rounded-interval-taylor-upper-envelope-passed";
const DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS =
  "directed-rounded-interval-taylor-upper-envelope-open";
const DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS =
  "directed-rounded-source-root-interval-certificate-passed";
const DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS =
  "direct-interval-derivative-envelope-passed";
const DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_OPEN_STATUS =
  "direct-interval-derivative-envelope-open";
const PEAK_BUDGET_SUMMARY_STATUS =
  "i1-f1-bracket-local-directed-rounded-source-root-interval-theta-localized-taylor-intervalization-certified";
const RESULT_THEORY_STATUS =
  "source-atlas-aware-i1-f1-bracket-local-directed-rounded-taylor-derivative-variation-certified";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function termRootCountSignature(evaluation) {
  return evaluation.terms.map((term) => term.root_count);
}

function minAbsFDelta(evaluation) {
  const values = evaluation.terms.flatMap((term) =>
    (term.root_rows ?? []).map((row) => Math.abs(Number(row.F_delta)))
  );
  return Math.min(...values);
}

function signLabel(value) {
  if (value > 0) {
    return "+";
  }
  if (value < 0) {
    return "-";
  }
  return "0";
}

function sourcePhi(thetaTilde, delta) {
  return 2 * thetaTilde - delta;
}

function sourceRootEquation({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = sourcePhi(thetaTilde, delta);
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(phi) +
    kappa * Math.sin(delta)
  );
}

function sourceRootDeltaDerivative({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = sourcePhi(thetaTilde, delta);
  return (
    (2 * delta) / (speedRatio * speedRatio) -
    Math.cos(phi) +
    kappa * Math.cos(delta)
  );
}

function sourceThetaTildeForTerm({ theta, termLabel }) {
  return termLabel.includes("u+Q") ? theta + QUARTER_PERIOD : theta;
}

function jetKey(thetaOrder, speedOrder) {
  return `${thetaOrder},${speedOrder}`;
}

function jetZero() {
  return new Map();
}

function jetConstant(value) {
  const jet = jetZero();
  if (value !== 0) {
    jet.set(jetKey(0, 0), value);
  }
  return jet;
}

function jetVariable(value, variable) {
  const jet = jetConstant(value);
  jet.set(variable === "theta" ? jetKey(1, 0) : jetKey(0, 1), 1);
  return jet;
}

function jetGet(jet, thetaOrder, speedOrder) {
  return jet.get(jetKey(thetaOrder, speedOrder)) ?? 0;
}

function jetSet(jet, thetaOrder, speedOrder, value) {
  const key = jetKey(thetaOrder, speedOrder);
  if (value === 0) {
    jet.delete(key);
  } else {
    jet.set(key, value);
  }
  return jet;
}

function jetAdd(left, right) {
  const result = jetZero();
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES) {
    const value =
      jetGet(left, thetaOrder, speedOrder) +
      jetGet(right, thetaOrder, speedOrder);
    if (value !== 0) {
      jetSet(result, thetaOrder, speedOrder, value);
    }
  }
  return result;
}

function jetScale(jet, scale) {
  const result = jetZero();
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES) {
    const value = scale * jetGet(jet, thetaOrder, speedOrder);
    if (value !== 0) {
      jetSet(result, thetaOrder, speedOrder, value);
    }
  }
  return result;
}

function jetSubtract(left, right) {
  return jetAdd(left, jetScale(right, -1));
}

function jetMultiply(left, right) {
  const result = jetZero();
  for (const [leftTheta, leftSpeed] of JET_MULTI_INDICES) {
    const leftValue = jetGet(left, leftTheta, leftSpeed);
    if (leftValue === 0) {
      continue;
    }
    for (const [rightTheta, rightSpeed] of JET_MULTI_INDICES) {
      const thetaOrder = leftTheta + rightTheta;
      const speedOrder = leftSpeed + rightSpeed;
      if (thetaOrder + speedOrder > JET_MAX_TOTAL_ORDER) {
        continue;
      }
      const rightValue = jetGet(right, rightTheta, rightSpeed);
      if (rightValue !== 0) {
        jetSet(
          result,
          thetaOrder,
          speedOrder,
          jetGet(result, thetaOrder, speedOrder) + leftValue * rightValue
        );
      }
    }
  }
  return result;
}

function jetPower(jet, exponent) {
  if (exponent === 0) {
    return jetConstant(1);
  }
  let result = jet;
  for (let index = 1; index < exponent; index += 1) {
    result = jetMultiply(result, jet);
  }
  return result;
}

function jetInverse(jet) {
  const constant = jetGet(jet, 0, 0);
  const result = jetConstant(1 / constant);
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES.slice(1)) {
    let convolution = 0;
    for (const [gammaTheta, gammaSpeed] of JET_MULTI_INDICES.slice(1)) {
      if (gammaTheta > thetaOrder || gammaSpeed > speedOrder) {
        continue;
      }
      convolution +=
        jetGet(jet, gammaTheta, gammaSpeed) *
        jetGet(result, thetaOrder - gammaTheta, speedOrder - gammaSpeed);
    }
    jetSet(result, thetaOrder, speedOrder, -convolution / constant);
  }
  return result;
}

function jetDivide(left, right) {
  return jetMultiply(left, jetInverse(right));
}

function jetSin(jet) {
  const constant = jetGet(jet, 0, 0);
  const nilpotent = jetSubtract(jet, jetConstant(constant));
  const nilpotentSquared = jetMultiply(nilpotent, nilpotent);
  const nilpotentCubed = jetMultiply(nilpotentSquared, nilpotent);
  const nilpotentFourth = jetMultiply(nilpotentSquared, nilpotentSquared);
  const nilpotentFifth = jetMultiply(nilpotentFourth, nilpotent);
  const sinNilpotent = jetAdd(
    jetSubtract(nilpotent, jetScale(nilpotentCubed, 1 / 6)),
    jetScale(nilpotentFifth, 1 / 120)
  );
  const cosNilpotent = jetAdd(
    jetSubtract(jetConstant(1), jetScale(nilpotentSquared, 1 / 2)),
    jetScale(nilpotentFourth, 1 / 24)
  );
  return jetAdd(
    jetScale(cosNilpotent, Math.sin(constant)),
    jetScale(sinNilpotent, Math.cos(constant))
  );
}

function jetCos(jet) {
  const constant = jetGet(jet, 0, 0);
  const nilpotent = jetSubtract(jet, jetConstant(constant));
  const nilpotentSquared = jetMultiply(nilpotent, nilpotent);
  const nilpotentCubed = jetMultiply(nilpotentSquared, nilpotent);
  const nilpotentFourth = jetMultiply(nilpotentSquared, nilpotentSquared);
  const nilpotentFifth = jetMultiply(nilpotentFourth, nilpotent);
  const sinNilpotent = jetAdd(
    jetSubtract(nilpotent, jetScale(nilpotentCubed, 1 / 6)),
    jetScale(nilpotentFifth, 1 / 120)
  );
  const cosNilpotent = jetAdd(
    jetSubtract(jetConstant(1), jetScale(nilpotentSquared, 1 / 2)),
    jetScale(nilpotentFourth, 1 / 24)
  );
  return jetSubtract(
    jetScale(cosNilpotent, Math.cos(constant)),
    jetScale(sinNilpotent, Math.sin(constant))
  );
}

function factorial(value) {
  if (value <= 1) {
    return 1;
  }
  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) {
    result *= factor;
  }
  return result;
}

function jetDerivative(jet, thetaOrder, speedOrder) {
  return (
    jetGet(jet, thetaOrder, speedOrder) *
    factorial(thetaOrder) *
    factorial(speedOrder)
  );
}

function intervalJetZero() {
  return new Map();
}

function intervalJetKey(thetaOrder, speedOrder) {
  return jetKey(thetaOrder, speedOrder);
}

function normalizeIntervalValue(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return [value, value];
}

function intervalJetConstant(value) {
  const interval = normalizeIntervalValue(value);
  const jet = intervalJetZero();
  if (interval[0] !== 0 || interval[1] !== 0) {
    jet.set(intervalJetKey(0, 0), interval);
  }
  return jet;
}

function intervalJetVariable(interval, variable) {
  const jet = intervalJetConstant(interval);
  jet.set(
    variable === "theta" ? intervalJetKey(1, 0) : intervalJetKey(0, 1),
    [1, 1]
  );
  return jet;
}

function intervalJetGet(jet, thetaOrder, speedOrder) {
  return jet.get(intervalJetKey(thetaOrder, speedOrder)) ?? [0, 0];
}

function intervalJetSet(jet, thetaOrder, speedOrder, interval) {
  const key = intervalJetKey(thetaOrder, speedOrder);
  if (interval[0] === 0 && interval[1] === 0) {
    jet.delete(key);
  } else {
    jet.set(key, interval);
  }
  return jet;
}

function intervalJetAdd(left, right) {
  const result = intervalJetZero();
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES) {
    const value = addIntervals(
      intervalJetGet(left, thetaOrder, speedOrder),
      intervalJetGet(right, thetaOrder, speedOrder)
    );
    if (value[0] !== 0 || value[1] !== 0) {
      intervalJetSet(result, thetaOrder, speedOrder, value);
    }
  }
  return result;
}

function intervalJetScale(jet, scale) {
  const result = intervalJetZero();
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES) {
    const value = scaleInterval(
      intervalJetGet(jet, thetaOrder, speedOrder),
      scale
    );
    if (value[0] !== 0 || value[1] !== 0) {
      intervalJetSet(result, thetaOrder, speedOrder, value);
    }
  }
  return result;
}

function intervalJetScaleInterval(jet, interval) {
  const result = intervalJetZero();
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES) {
    const value = multiplyIntervals(
      intervalJetGet(jet, thetaOrder, speedOrder),
      interval
    );
    if (value[0] !== 0 || value[1] !== 0) {
      intervalJetSet(result, thetaOrder, speedOrder, value);
    }
  }
  return result;
}

function intervalJetSubtract(left, right) {
  return intervalJetAdd(left, intervalJetScale(right, -1));
}

function intervalJetMultiply(left, right) {
  const result = intervalJetZero();
  for (const [leftTheta, leftSpeed] of JET_MULTI_INDICES) {
    const leftValue = intervalJetGet(left, leftTheta, leftSpeed);
    if (leftValue[0] === 0 && leftValue[1] === 0) {
      continue;
    }
    for (const [rightTheta, rightSpeed] of JET_MULTI_INDICES) {
      const thetaOrder = leftTheta + rightTheta;
      const speedOrder = leftSpeed + rightSpeed;
      if (thetaOrder + speedOrder > JET_MAX_TOTAL_ORDER) {
        continue;
      }
      const rightValue = intervalJetGet(right, rightTheta, rightSpeed);
      if (rightValue[0] === 0 && rightValue[1] === 0) {
        continue;
      }
      intervalJetSet(
        result,
        thetaOrder,
        speedOrder,
        addIntervals(
          intervalJetGet(result, thetaOrder, speedOrder),
          multiplyIntervals(leftValue, rightValue)
        )
      );
    }
  }
  return result;
}

function intervalJetInverse(jet) {
  const constant = intervalJetGet(jet, 0, 0);
  const result = intervalJetConstant(reciprocalInterval(constant));
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES.slice(1)) {
    let convolution = [0, 0];
    for (const [gammaTheta, gammaSpeed] of JET_MULTI_INDICES.slice(1)) {
      if (gammaTheta > thetaOrder || gammaSpeed > speedOrder) {
        continue;
      }
      convolution = addIntervals(
        convolution,
        multiplyIntervals(
          intervalJetGet(jet, gammaTheta, gammaSpeed),
          intervalJetGet(
            result,
            thetaOrder - gammaTheta,
            speedOrder - gammaSpeed
          )
        )
      );
    }
    intervalJetSet(
      result,
      thetaOrder,
      speedOrder,
      divideIntervals(negateInterval(convolution), constant)
    );
  }
  return result;
}

function intervalJetDivide(left, right) {
  return intervalJetMultiply(left, intervalJetInverse(right));
}

function intervalJetNilpotentPart(jet) {
  const result = intervalJetZero();
  for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES.slice(1)) {
    const value = intervalJetGet(jet, thetaOrder, speedOrder);
    if (value[0] !== 0 || value[1] !== 0) {
      intervalJetSet(result, thetaOrder, speedOrder, value);
    }
  }
  return result;
}

function intervalJetSin(jet) {
  const constant = intervalJetGet(jet, 0, 0);
  const nilpotent = intervalJetNilpotentPart(jet);
  const nilpotentSquared = intervalJetMultiply(nilpotent, nilpotent);
  const nilpotentCubed = intervalJetMultiply(nilpotentSquared, nilpotent);
  const nilpotentFourth = intervalJetMultiply(
    nilpotentSquared,
    nilpotentSquared
  );
  const nilpotentFifth = intervalJetMultiply(nilpotentFourth, nilpotent);
  const sinNilpotent = intervalJetAdd(
    intervalJetSubtract(nilpotent, intervalJetScale(nilpotentCubed, 1 / 6)),
    intervalJetScale(nilpotentFifth, 1 / 120)
  );
  const cosNilpotent = intervalJetAdd(
    intervalJetSubtract(
      intervalJetConstant(1),
      intervalJetScale(nilpotentSquared, 1 / 2)
    ),
    intervalJetScale(nilpotentFourth, 1 / 24)
  );
  return intervalJetAdd(
    intervalJetScaleInterval(cosNilpotent, sinInterval(constant)),
    intervalJetScaleInterval(sinNilpotent, cosInterval(constant))
  );
}

function intervalJetCos(jet) {
  const constant = intervalJetGet(jet, 0, 0);
  const nilpotent = intervalJetNilpotentPart(jet);
  const nilpotentSquared = intervalJetMultiply(nilpotent, nilpotent);
  const nilpotentCubed = intervalJetMultiply(nilpotentSquared, nilpotent);
  const nilpotentFourth = intervalJetMultiply(
    nilpotentSquared,
    nilpotentSquared
  );
  const nilpotentFifth = intervalJetMultiply(nilpotentFourth, nilpotent);
  const sinNilpotent = intervalJetAdd(
    intervalJetSubtract(nilpotent, intervalJetScale(nilpotentCubed, 1 / 6)),
    intervalJetScale(nilpotentFifth, 1 / 120)
  );
  const cosNilpotent = intervalJetAdd(
    intervalJetSubtract(
      intervalJetConstant(1),
      intervalJetScale(nilpotentSquared, 1 / 2)
    ),
    intervalJetScale(nilpotentFourth, 1 / 24)
  );
  return intervalJetSubtract(
    intervalJetScaleInterval(cosNilpotent, cosInterval(constant)),
    intervalJetScaleInterval(sinNilpotent, sinInterval(constant))
  );
}

function intervalJetDerivative(jet, thetaOrder, speedOrder) {
  return scaleInterval(
    intervalJetGet(jet, thetaOrder, speedOrder),
    factorial(thetaOrder) * factorial(speedOrder)
  );
}

function intervalAbsMax([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
}

function formatInterval(interval) {
  return interval.map(formatSmallNumber);
}

function rootSheetRows(evaluation) {
  return evaluation.terms.map((term) => ({
    term_label: term.term_label,
    coefficient: term.coefficient,
    kappa: term.kappa,
    sigma: term.sigma,
    theta_tilde_normalized: term.theta_tilde_normalized,
    root_count: term.root_count,
    roots: (term.root_rows ?? []).map((rootRow, rootIndex) => {
      const delta = Number(rootRow.delta);
      const FDelta = Number(rootRow.F_delta);
      return {
        root_index: rootIndex,
        delta,
        F_delta: FDelta,
        F_delta_sign: signLabel(FDelta),
        delta_prime: Number(rootRow.delta_prime),
      };
    }),
  }));
}

function fineGridCount({ parentStencilSamplesPerAxis, refinementSamplesPerSubcellAxis }) {
  return (
    (parentStencilSamplesPerAxis - 1) *
      (refinementSamplesPerSubcellAxis - 1) +
    1
  );
}

function gridCoordinate(index, count) {
  return count === 1 ? 0.5 : index / (count - 1);
}

function buildPeakBudgetTheorem() {
  return {
    theorem_id: "i1-f1-bracket-local-derivative-peak-budget-reduction",
    theorem_scope:
      "finite subcell peak-budget reduction for the I1.f1 bracket-local directed-rounding derivative-variation row",
    statement:
      "Let C be a predecessor I1.f1 bracket mesh cell with center derivative d_C, local mesh allowance Delta_C, and parent mixed-stencil maximum m_C. Define mu_C = Delta_C - max(0, m_C - d_C). For each stencil subcell Q with vertex maximum m_Q, any directed-rounded interval or Taylor enclosure satisfying sup_Q partial_theta f_cross <= m_Q + epsilon_Q with epsilon_Q < min(mu_C, -m_Q) proves that Q cannot break the predecessor derivative allowance or derivative negativity. The executable packet computes this finite peak budget for every stencil subcell and certifies it with directed-rounded theta-localized Taylor intervalization.",
    proof_steps: [
      "Import the bracket-local mixed-stencil derivative-variation certificate and its predecessor allowance data.",
      "Refine each parent stencil subcell by a local tensor replay, so every parent 5x5 stencil cell has a 9x9 refinement audit at default settings.",
      "For each of the 2048 subcells, compute the vertex derivative maximum, refined observed maximum, parent allowance slack, and effective peak-overshoot ceiling.",
      "Attach a bilinear vertex-envelope sufficient condition: if the pure second-partial enclosure of g=f'_cross satisfies (h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu below the emitted overshoot ceiling, then sup_Q g cannot exceed the vertex maximum enough to break the row.",
      "Use the existing refined subcell grid to run a sampled pure-curvature feasibility probe for the same bilinear condition without claiming an interval second-partial enclosure.",
      "Use order-4 analytic root-sheet jets on the refined sample rows to measure sampled transport of the pure-curvature components from the nearest sample point across each subcell covering radius, again without claiming interval curvature enclosure.",
      "Use order-5 analytic root-sheet jets to transport the sampled curvature-gradient components before transporting the pure-curvature components across the same subcell covering radii.",
      "Emit and consume an interval-jet target for each subcell: on every protected source-root sheet, generate interval/Taylor jets from F(theta_tilde,delta,nu)=0, enclose the pure second partials of g=f'_cross, and consume the bilinear curvature budget.",
      "Execute the direct interval derivative formula for g=f'_cross over the directed-rounded protected root tubes, recording whether the resulting upper envelope already beats the finite peak budget or, if not, the exact interval overrun and bottleneck.",
      "Execute directed-rounded vertex derivative anchors and theta-localized Taylor intervalization on the certified root sheets, proving every emitted tile upper envelope below the finite overshoot budget.",
      "Require positive peak budget, negative refined derivative maximum, preserved six-source-root count, preserved term signature, and positive sampled $|F_delta|$ for every finite subcell.",
      "Conclude bracket-local directed-rounded Taylor derivative-variation closure for the finite peak-budget packet; leave full I1.f1 zero isolation, interval critical exhaustion, interval quadrature, and retained branch status open.",
    ],
    proof_status: "finite-sampled-subcell-peak-budget-reduction-certified",
  };
}

function buildBackendFormulaSheet() {
  return {
    formula_sheet_id: "cross-binary-i1-f1-derivative-backend-input-formulas",
    source_phase: "phi=2*theta_tilde-delta",
    source_root_equation:
      "F_{kappa,nu}(theta_tilde,delta)=delta^2/nu^2-2+sin(phi)+kappa*sin(delta)=0",
    source_root_delta_derivative:
      "F_delta=2*delta/nu^2-cos(phi)+kappa*cos(delta)",
    kernel: "B=-0.5*(cos(phi)+kappa*cos(delta))",
    implicit_root_derivative: "delta_prime=-2*cos(phi)/F_delta",
    implicit_root_first_partial: "for x in {theta,nu}: delta_x=-F_x/F_delta",
    implicit_root_pure_second_partial:
      "for x in {theta,nu}: delta_xx=-(F_xx+2*F_x_delta*delta_x+F_delta_delta*delta_x^2)/F_delta",
    implicit_root_multi_index_recurrence:
      "for |beta|>=1: F_delta*partial^beta(delta) is the negative of the remaining beta derivative of F(theta_tilde,delta(theta,nu),nu)=0 after removing the linear F_delta*partial^beta(delta) term",
    required_root_sheet_multi_indices_for_curvature_target: [
      "delta_{theta}",
      "delta_{theta theta}",
      "delta_{theta theta theta}",
      "delta_{nu}",
      "delta_{nu nu}",
      "delta_{theta nu}",
      "delta_{theta nu nu}",
    ],
    required_root_sheet_multi_indices_for_fourth_jet_transport_target: [
      "delta_{theta theta theta theta}",
      "delta_{theta theta theta nu}",
      "delta_{theta theta nu nu}",
      "delta_{theta nu nu nu}",
    ],
    required_root_sheet_multi_indices_for_fifth_jet_gradient_transport_target: [
      "delta_{theta theta theta theta theta}",
      "delta_{theta theta theta theta nu}",
      "delta_{theta theta theta nu nu}",
      "delta_{theta theta nu nu nu}",
      "delta_{theta nu nu nu nu}",
    ],
    required_cross_binary_source_derivatives:
      "g=f_cross_prime requires source theta-derivatives; M_theta_theta requires partial_theta^3 of each source contribution, M_nu_nu requires partial_theta partial_nu^2 of each source contribution, sampled fourth-jet curvature transport uses partial_theta^4, partial_theta^3 partial_nu, partial_theta^2 partial_nu^2, and partial_theta partial_nu^3 source derivatives, and sampled fifth-jet curvature-gradient transport additionally uses partial_theta^5, partial_theta^4 partial_nu, partial_theta^3 partial_nu^2, partial_theta^2 partial_nu^3, and partial_theta partial_nu^4 source derivatives",
    source_root_theta_partials:
      "F_theta=2*cos(phi), F_theta_theta=-4*sin(phi), F_theta_delta=2*sin(phi)",
    source_root_speed_partials:
      "F_nu=-2*delta^2/nu^3, F_nu_nu=6*delta^2/nu^4, F_nu_delta=-4*delta/nu^3",
    source_root_delta_delta:
      "F_delta_delta=2/nu^2-sin(phi)-kappa*sin(delta)",
    kernel_derivative:
      "B_prime=sin(phi)+0.5*(kappa*sin(delta)-sin(phi))*delta_prime",
    root_delta_transport_derivative:
      "F_delta_prime=2*sin(phi)+(2/nu^2-sin(phi)-kappa*sin(delta))*delta_prime",
    inverse_factor: "I=(delta^2*abs(F_delta))^-1",
    inverse_factor_derivative:
      "I_prime=-2*delta_prime/(delta^3*abs(F_delta))-sign(F_delta)*F_delta_prime/(delta^2*abs(F_delta)^2)",
    source_contribution: "s_prime_{kappa,sigma}=2*sigma*(B_prime*I+B*I_prime)/nu",
    direct_interval_derivative_envelope_route:
      "Evaluate the displayed s_prime formula with outward-rounded interval arithmetic on each directed-rounded protected root tube subdivision, hull those source-derivative intervals, sum them with the cross-binary coefficients, and compare the resulting source-derivative interval upper bound for sup_Q g with vertex_max_derivative+required_error_bound_less_than.",
    monotone_root_sheet_contractor:
      "When F_delta has fixed sign on a protected tube, contract the all-parameter root range D_r(P): for F_delta>0, raise the lower endpoint while sup_P F(delta)<=0 and lower the upper endpoint while inf_P F(delta)>=0; reverse the endpoint signs for F_delta<0. The contracted interval still contains every root sheet over P by monotonicity.",
    cross_binary_combination:
      "f_cross(theta)=s_{+,+}(theta)-s_{+,+}(theta+Q)+s_{-,+}(theta)-s_{-,+}(theta+Q)",
    derivative_combination:
      "f_cross_prime(theta)=s_prime_{+,+}(theta)-s_prime_{+,+}(theta+Q)+s_prime_{-,+}(theta)-s_prime_{-,+}(theta+Q)",
    bilinear_vertex_envelope:
      "For g=f_cross_prime on a rectangle Q with widths h_theta,h_nu, bilinear interpolation from the four vertices is <= vertex_max_derivative and sup_Q g <= vertex_max_derivative+(h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu whenever M_theta_theta and M_nu_nu bound the corresponding pure second partials of g on Q.",
    root_tube_interval_certificate:
      "For each source term and retained tube D_r=[delta_r^-,delta_r^+], prove interval-opposite signs for F(P,delta_r^-) and F(P,delta_r^+), prove F_delta(P,D_r) has one fixed sign with abs(F_delta)>=lambda_r>0, and prove 0 notin F(P,K_l) on every complement slab K_l between retained tubes and domain endpoints. Then each D_r contains exactly one C^1 implicit root sheet over P and no extra source roots occur in the complement.",
    curvature_interval_jet_route:
      "On each emitted root tube, use the implicit root-sheet jet recurrence to generate interval/Taylor jets for delta(theta,nu), evaluate g=f_cross_prime on those jets, enclose M_theta_theta>=sup_Q |partial_theta_theta g| and M_nu_nu>=sup_Q |partial_nu_nu g|, and prove (h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu below the row budget.",
    sampled_fourth_jet_curvature_transport_route:
      "Sample order-4 root-sheet jets at the refined lattice, read gradients of partial_theta_theta g and partial_nu_nu g, and use nearest-sample covering radii to form a sampled Taylor-transport budget that is later consumed by the directed-rounded intervalization row.",
    sampled_fifth_jet_curvature_gradient_transport_route:
      "Sample order-5 root-sheet jets at the refined lattice, read Hessian samples of the curvature-gradient components, transport those gradients over the nearest-sample covering radii, then transport partial_theta_theta g and partial_nu_nu g with the transported gradients. This remains a sampled witness; the directed-rounded theta-localized Taylor intervalization supplies the interval closure.",
    sampled_theta_localized_taylor_upper_envelope_route:
      "Split each finite subcell only in theta, use the sampled fifth-jet transported pure-curvature bounds to form U_T=m_T+(h_theta,T^2/8)M_theta_theta^(5)+(h_nu^2/8)M_nu_nu^(5) on each theta tile, and compare U_T with the parent finite peak budget. This is a sampled Taylor-transport witness, not a directed-rounded interval/Taylor proof.",
    required_backend_task:
      "For each emitted subcell Q, isolate the implicit delta root sheets, prove a positive lower bound for abs(F_delta), generate the required root-sheet interval jets, and enclose sup_Q f_cross_prime below the emitted vertex maximum plus a strict overshoot bound smaller than required_overshoot_bound_less_than; the default directed-rounded theta-localized Taylor intervalization now performs this closure for the finite peak-budget packet.",
  };
}

function buildFineGrid({ parentRow, rootSubdivisions, fineCount }) {
  const thetaLeft = Number(parentRow.theta_interval[0]);
  const thetaRight = Number(parentRow.theta_interval[1]);
  const speedLeft = Number(parentRow.speed_ratio_interval[0]);
  const speedRight = Number(parentRow.speed_ratio_interval[1]);
  const thetaWidth = thetaRight - thetaLeft;
  const speedWidth = speedRight - speedLeft;
  const rows = [];

  for (let thetaIndex = 0; thetaIndex < fineCount; thetaIndex += 1) {
    const theta = thetaLeft + thetaWidth * gridCoordinate(thetaIndex, fineCount);
    for (let speedIndex = 0; speedIndex < fineCount; speedIndex += 1) {
      const speedRatio =
        speedLeft + speedWidth * gridCoordinate(speedIndex, fineCount);
      const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      rows.push({
        theta_index: thetaIndex,
        speed_index: speedIndex,
        theta,
        speed_ratio: speedRatio,
        derivative: evaluation.derivative,
        forcing: evaluation.value,
        source_root_count: evaluation.source_root_count,
        term_root_count_signature: termRootCountSignature(evaluation),
        min_abs_F_delta: minAbsFDelta(evaluation),
        root_sheets: rootSheetRows(evaluation),
      });
    }
  }

  return rows;
}

function subintervalForIndex({ left, right, index, subcellCount }) {
  const width = right - left;
  return [
    left + (width * index) / subcellCount,
    left + (width * (index + 1)) / subcellCount,
  ];
}

function rowAt(rows, fineCount, thetaIndex, speedIndex) {
  return rows[thetaIndex * fineCount + speedIndex];
}

function summarizeRows(rows) {
  const sourceRootCounts = [
    ...new Set(rows.map((row) => row.source_root_count)),
  ].sort((left, right) => left - right);
  const termRootCountSignatures = [
    ...new Set(rows.map((row) => row.term_root_count_signature.join(","))),
  ].sort();
  return {
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    term_root_count_signatures: termRootCountSignatures,
    term_root_count_signature_preserved:
      termRootCountSignatures.length === 1 &&
      termRootCountSignatures[0] === EXPECTED_TERM_SIGNATURE,
    min_abs_F_delta: Math.min(...rows.map((row) => row.min_abs_F_delta)),
    max_derivative: Math.max(...rows.map((row) => row.derivative)),
    min_derivative: Math.min(...rows.map((row) => row.derivative)),
  };
}

function buildBilinearCurvatureSufficientCondition({
  thetaWidth,
  speedWidth,
  overshootCeiling,
}) {
  const thetaScale = (thetaWidth * thetaWidth) / 8;
  const speedScale = (speedWidth * speedWidth) / 8;
  return {
    lemma:
      "bilinear vertex-envelope: sup_Q g <= vertex_max + (h_theta^2/8)M_theta_theta + (h_nu^2/8)M_nu_nu",
    function: "g=f_cross_prime",
    theta_width: formatSmallNumber(thetaWidth),
    speed_ratio_width: formatSmallNumber(speedWidth),
    theta_second_partial_coefficient: formatSmallNumber(thetaScale),
    speed_second_partial_coefficient: formatSmallNumber(speedScale),
    required_error_bound_less_than: formatSmallNumber(overshootCeiling),
    balanced_pure_curvature_bound: formatSmallNumber(
      overshootCeiling / (thetaScale + speedScale)
    ),
    theta_only_second_partial_bound: formatSmallNumber(
      overshootCeiling / thetaScale
    ),
    speed_only_second_partial_bound: formatSmallNumber(
      overshootCeiling / speedScale
    ),
    sufficient_condition:
      "(h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu < required_error_bound_less_than",
  };
}

function centralSecondDifference(left, center, right, step) {
  return (right - 2 * center + left) / (step * step);
}

function buildSampledPureCurvatureProbe({
  fineRows,
  fineCount,
  thetaStart,
  thetaEnd,
  speedStart,
  speedEnd,
  thetaStep,
  speedStep,
  thetaScale,
  speedScale,
  overshootCeiling,
}) {
  let maxThetaSecond = 0;
  let maxSpeedSecond = 0;
  for (let speedIndex = speedStart; speedIndex <= speedEnd; speedIndex += 1) {
    for (
      let thetaIndex = thetaStart + 1;
      thetaIndex <= thetaEnd - 1;
      thetaIndex += 1
    ) {
      const second = centralSecondDifference(
        rowAt(fineRows, fineCount, thetaIndex - 1, speedIndex).derivative,
        rowAt(fineRows, fineCount, thetaIndex, speedIndex).derivative,
        rowAt(fineRows, fineCount, thetaIndex + 1, speedIndex).derivative,
        thetaStep
      );
      maxThetaSecond = Math.max(maxThetaSecond, Math.abs(second));
    }
  }
  for (let thetaIndex = thetaStart; thetaIndex <= thetaEnd; thetaIndex += 1) {
    for (
      let speedIndex = speedStart + 1;
      speedIndex <= speedEnd - 1;
      speedIndex += 1
    ) {
      const second = centralSecondDifference(
        rowAt(fineRows, fineCount, thetaIndex, speedIndex - 1).derivative,
        rowAt(fineRows, fineCount, thetaIndex, speedIndex).derivative,
        rowAt(fineRows, fineCount, thetaIndex, speedIndex + 1).derivative,
        speedStep
      );
      maxSpeedSecond = Math.max(maxSpeedSecond, Math.abs(second));
    }
  }
  const sampledRemainder =
    thetaScale * maxThetaSecond + speedScale * maxSpeedSecond;
  return {
    probe_type: "sampled-pure-second-difference-bilinear-remainder",
    certifies_interval_second_partial_bounds: false,
    theta_second_partial_sample_max_abs: formatSmallNumber(maxThetaSecond),
    speed_second_partial_sample_max_abs: formatSmallNumber(maxSpeedSecond),
    sampled_bilinear_remainder: formatSmallNumber(sampledRemainder),
    sampled_bilinear_remainder_ratio_to_required_bound: formatSmallNumber(
      sampledRemainder / overshootCeiling
    ),
    status:
      sampledRemainder < overshootCeiling
        ? "sampled-bilinear-curvature-feasibility-passed"
        : "sampled-bilinear-curvature-feasibility-open",
  };
}

function buildSampledCurvatureInflationHeadroomCertificate({
  sampledPureCurvatureProbe,
  overshootCeiling,
}) {
  const sampledRemainder = Number(
    sampledPureCurvatureProbe.sampled_bilinear_remainder
  );
  const maximumUniformInflationFactor =
    sampledRemainder > 0 ? overshootCeiling / sampledRemainder : Infinity;
  const referenceFactorMargin =
    overshootCeiling -
    SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR * sampledRemainder;
  const referenceFactorPasses = referenceFactorMargin > 0;

  return {
    certificate_type: "sampled-curvature-inflation-headroom-certificate",
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_sampled_curvature_inflation_headroom: referenceFactorPasses,
    reference_uniform_inflation_factor:
      SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR,
    sampled_bilinear_remainder: formatSmallNumber(sampledRemainder),
    required_error_bound_less_than: formatSmallNumber(overshootCeiling),
    maximum_uniform_sampled_curvature_inflation_factor_unbounded:
      !Number.isFinite(maximumUniformInflationFactor),
    maximum_uniform_sampled_curvature_inflation_factor_less_than:
      formatSmallNumber(maximumUniformInflationFactor),
    margin_after_reference_uniform_inflation_factor: formatSmallNumber(
      referenceFactorMargin
    ),
    theorem_implication:
      "If interval pure second-partial bounds for g=f_cross_prime are no larger than alpha times the sampled pure second-difference maxima on this subcell, and alpha is below maximum_uniform_sampled_curvature_inflation_factor_less_than, then the bilinear vertex-envelope row closes for this subcell. The reference factor records headroom only; it is not itself an interval curvature enclosure.",
    status: referenceFactorPasses
      ? "sampled-curvature-inflation-headroom-passed"
      : "sampled-curvature-inflation-headroom-open",
  };
}

function buildCurvatureIntervalJetTarget({
  bilinearCurvatureCondition,
  sampledPureCurvatureProbe,
  sampledCurvatureInflationHeadroomCertificate,
  finiteIntervalRootTubeCertificateTarget,
  machinePaddedSourceRootIntervalCertificate,
  directedRoundedSourceRootIntervalCertificate,
  overshootCeiling,
}) {
  const emitted =
    Number(bilinearCurvatureCondition.required_error_bound_less_than) > 0 &&
    sampledPureCurvatureProbe.status ===
      "sampled-bilinear-curvature-feasibility-passed" &&
    sampledCurvatureInflationHeadroomCertificate.status ===
      "sampled-curvature-inflation-headroom-passed" &&
    finiteIntervalRootTubeCertificateTarget.status ===
      "finite-interval-root-tube-certificate-target-emitted" &&
    machinePaddedSourceRootIntervalCertificate.status ===
      "machine-padded-source-root-interval-certificate-passed" &&
    directedRoundedSourceRootIntervalCertificate.status ===
      DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS;

  return {
    target_type: "curvature-interval-jet-target",
    target_function: "g=f_cross_prime",
    parameter_rectangle: "Q=theta_interval x speed_ratio_interval",
    certifies_curvature_interval_jet_target: emitted,
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_interval_derivative_enclosure: false,
    root_sheet_identity:
      "F_{kappa,nu}(theta_tilde,delta(theta,nu))=0 on each emitted protected source-root tube",
    implicit_root_first_partial:
      "for x in {theta,nu}: delta_x=-F_x/F_delta",
    implicit_root_pure_second_partial:
      "for x in {theta,nu}: delta_xx=-(F_xx+2*F_x_delta*delta_x+F_delta_delta*delta_x^2)/F_delta",
    implicit_root_multi_index_recurrence:
      "differentiate F(theta_tilde,delta(theta,nu),nu)=0 by the needed multi-index and solve the linear highest-jet term through the already bounded F_delta denominator",
    required_root_sheet_multi_indices: [
      "delta_{theta}",
      "delta_{theta theta}",
      "delta_{theta theta theta}",
      "delta_{nu}",
      "delta_{nu nu}",
      "delta_{theta nu}",
      "delta_{theta nu nu}",
    ],
    required_root_sheet_multi_indices_for_fourth_jet_transport: [
      "delta_{theta theta theta theta}",
      "delta_{theta theta theta nu}",
      "delta_{theta theta nu nu}",
      "delta_{theta nu nu nu}",
    ],
    required_root_sheet_multi_indices_for_fifth_jet_gradient_transport: [
      "delta_{theta theta theta theta theta}",
      "delta_{theta theta theta theta nu}",
      "delta_{theta theta theta nu nu}",
      "delta_{theta theta nu nu nu}",
      "delta_{theta nu nu nu nu}",
    ],
    derivative_order_census: {
      function_value: "g=f_cross_prime uses source contribution theta jets",
      theta_curvature:
        "M_theta_theta requires partial_theta_theta g, equivalently partial_theta^3 of each source contribution and root jets through delta_{theta theta theta}",
      speed_curvature:
        "M_nu_nu requires partial_nu_nu g, equivalently partial_theta partial_nu^2 of each source contribution and root jets through delta_{theta nu nu}",
      fourth_jet_curvature_transport:
        "sampled curvature transport differentiates M_theta_theta and M_nu_nu once more, requiring source derivatives partial_theta^4, partial_theta^3 partial_nu, partial_theta^2 partial_nu^2, and partial_theta partial_nu^3",
      fifth_jet_curvature_gradient_transport:
        "sampled curvature-gradient transport differentiates the fourth-jet gradient components once more, requiring source derivatives partial_theta^5, partial_theta^4 partial_nu, partial_theta^3 partial_nu^2, partial_theta^2 partial_nu^3, and partial_theta partial_nu^4",
    },
    required_interval_jet_objects: [
      "source-root sheet jets delta(theta,nu) on every protected tube",
      "interval evaluation of source contribution derivative s_prime_{kappa,sigma}",
      "cross-binary interval jet for g=f_cross_prime",
      "pure curvature enclosures M_theta_theta and M_nu_nu for g",
    ],
    consumes_finite_interval_root_tube_certificate_target_status:
      finiteIntervalRootTubeCertificateTarget.status,
    consumes_machine_padded_source_root_interval_certificate_status:
      machinePaddedSourceRootIntervalCertificate.status,
    consumes_directed_rounded_source_root_interval_certificate_status:
      directedRoundedSourceRootIntervalCertificate.status,
    requires_directed_rounded_source_root_certificate: true,
    theta_second_partial_target:
      "M_theta_theta >= sup_Q |partial_theta_theta g|",
    speed_second_partial_target:
      "M_nu_nu >= sup_Q |partial_nu_nu g|",
    curvature_acceptance_inequality:
      "(h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu < required_error_bound_less_than",
    theta_second_partial_coefficient:
      bilinearCurvatureCondition.theta_second_partial_coefficient,
    speed_second_partial_coefficient:
      bilinearCurvatureCondition.speed_second_partial_coefficient,
    required_error_bound_less_than: formatSmallNumber(overshootCeiling),
    balanced_pure_curvature_bound:
      bilinearCurvatureCondition.balanced_pure_curvature_bound,
    sampled_reference_remainder:
      sampledPureCurvatureProbe.sampled_bilinear_remainder,
    sampled_reference_remainder_ratio:
      sampledPureCurvatureProbe
        .sampled_bilinear_remainder_ratio_to_required_bound,
    reference_uniform_inflation_factor:
      sampledCurvatureInflationHeadroomCertificate
        .reference_uniform_inflation_factor,
    maximum_uniform_sampled_curvature_inflation_factor_less_than:
      sampledCurvatureInflationHeadroomCertificate
        .maximum_uniform_sampled_curvature_inflation_factor_less_than,
    interval_implication:
      "If the source-root interval certificate gives one regular root sheet in each protected tube and the interval/Taylor jet enclosures satisfy the curvature acceptance inequality, then the subcell peak overshoot row closes; this target does not itself certify interval curvature.",
    status: emitted
      ? CURVATURE_INTERVAL_JET_TARGET_STATUS
      : "curvature-interval-jet-target-open",
  };
}

function sourceRootEquationJet({ thetaTildeJet, speedRatioJet, deltaJet, kappa }) {
  const phiJet = jetSubtract(jetScale(thetaTildeJet, 2), deltaJet);
  return jetAdd(
    jetAdd(
      jetDivide(jetMultiply(deltaJet, deltaJet), jetMultiply(speedRatioJet, speedRatioJet)),
      jetConstant(-2)
    ),
    jetAdd(jetSin(phiJet), jetScale(jetSin(deltaJet), kappa))
  );
}

function sourceRootDeltaDerivativeJet({
  thetaTildeJet,
  speedRatioJet,
  deltaJet,
  kappa,
}) {
  const phiJet = jetSubtract(jetScale(thetaTildeJet, 2), deltaJet);
  return jetAdd(
    jetDivide(jetScale(deltaJet, 2), jetMultiply(speedRatioJet, speedRatioJet)),
    jetAdd(jetScale(jetCos(phiJet), -1), jetScale(jetCos(deltaJet), kappa))
  );
}

function buildImplicitDeltaJet({
  thetaTilde,
  speedRatio,
  kappa,
  delta,
  termLabel,
}) {
  const thetaTildeJet = jetVariable(thetaTilde, "theta");
  const speedRatioJet = jetVariable(speedRatio, "speed");
  const deltaJet = jetConstant(delta);
  const FDelta = sourceRootDeltaDerivative({
    speedRatio,
    kappa,
    thetaTilde,
    delta,
  });

  for (let totalOrder = 1; totalOrder <= JET_MAX_TOTAL_ORDER; totalOrder += 1) {
    for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES.filter(
      ([candidateTheta, candidateSpeed]) =>
        candidateTheta + candidateSpeed === totalOrder
    )) {
      jetSet(deltaJet, thetaOrder, speedOrder, 0);
      const residualJet = sourceRootEquationJet({
        thetaTildeJet,
        speedRatioJet,
        deltaJet,
        kappa,
      });
      const coefficient = jetGet(residualJet, thetaOrder, speedOrder);
      jetSet(deltaJet, thetaOrder, speedOrder, -coefficient / FDelta);
    }
  }

  const residual = Math.abs(
    jetGet(
      sourceRootEquationJet({
        thetaTildeJet,
        speedRatioJet,
        deltaJet,
        kappa,
      }),
      0,
      0
    )
  );

  return {
    term_label: termLabel,
    delta_jet: deltaJet,
    root_equation_residual_abs: residual,
    F_delta: FDelta,
  };
}

function buildSourceContributionJet({
  thetaTilde,
  speedRatio,
  kappa,
  sigma,
  delta,
  termLabel,
}) {
  const thetaTildeJet = jetVariable(thetaTilde, "theta");
  const speedRatioJet = jetVariable(speedRatio, "speed");
  const implicitDeltaJet = buildImplicitDeltaJet({
    thetaTilde,
    speedRatio,
    kappa,
    delta,
    termLabel,
  });
  const deltaJet = implicitDeltaJet.delta_jet;
  const phiJet = jetSubtract(jetScale(thetaTildeJet, 2), deltaJet);
  const FDeltaJet = sourceRootDeltaDerivativeJet({
    thetaTildeJet,
    speedRatioJet,
    deltaJet,
    kappa,
  });
  const FDeltaSign = Math.sign(implicitDeltaJet.F_delta);
  const absFDeltaJet = jetScale(FDeltaJet, FDeltaSign);
  const kernelJet = jetScale(
    jetAdd(jetCos(phiJet), jetScale(jetCos(deltaJet), kappa)),
    -0.5
  );
  const inverseFactorJet = jetInverse(
    jetMultiply(jetMultiply(deltaJet, deltaJet), absFDeltaJet)
  );
  const contributionJet = jetDivide(
    jetScale(jetMultiply(kernelJet, inverseFactorJet), 2 * sigma),
    speedRatioJet
  );

  return {
    contribution_jet: contributionJet,
    root_equation_residual_abs: implicitDeltaJet.root_equation_residual_abs,
    F_delta_sign: signLabel(implicitDeltaJet.F_delta),
  };
}

function buildCrossBinarySourceJetFromRootSheets({ row }) {
  let crossBinaryJet = jetZero();
  let maximumRootEquationResidualAbs = 0;
  const FDeltaSigns = [];

  for (const term of row.root_sheets) {
    let termJet = jetZero();
    const thetaTilde = sourceThetaTildeForTerm({
      theta: row.theta,
      termLabel: term.term_label,
    });
    for (const root of term.roots) {
      const sourceJet = buildSourceContributionJet({
        thetaTilde,
        speedRatio: row.speed_ratio,
        kappa: term.kappa,
        sigma: term.sigma,
        delta: root.delta,
        termLabel: term.term_label,
      });
      termJet = jetAdd(termJet, sourceJet.contribution_jet);
      maximumRootEquationResidualAbs = Math.max(
        maximumRootEquationResidualAbs,
        sourceJet.root_equation_residual_abs
      );
      FDeltaSigns.push(sourceJet.F_delta_sign);
    }
    crossBinaryJet = jetAdd(crossBinaryJet, jetScale(termJet, term.coefficient));
  }

  return {
    cross_binary_source_jet: crossBinaryJet,
    maximum_root_equation_residual_abs: maximumRootEquationResidualAbs,
    F_delta_signs: uniqueSortedStrings(FDeltaSigns),
  };
}

function evaluateAnalyticJetCurvatureAtRow(row) {
  const sourceJet = buildCrossBinarySourceJetFromRootSheets({ row });
  const crossBinaryJet = sourceJet.cross_binary_source_jet;
  const derivativeFromJet = jetDerivative(crossBinaryJet, 1, 0);
  return {
    derivative_from_jet: derivativeFromJet,
    derivative_residual_abs: Math.abs(derivativeFromJet - row.derivative),
    theta_second_partial_g: jetDerivative(crossBinaryJet, 3, 0),
    speed_second_partial_g: jetDerivative(crossBinaryJet, 1, 2),
    theta_second_partial_g_theta_gradient: jetDerivative(crossBinaryJet, 4, 0),
    theta_second_partial_g_speed_gradient: jetDerivative(crossBinaryJet, 3, 1),
    speed_second_partial_g_theta_gradient: jetDerivative(crossBinaryJet, 2, 2),
    speed_second_partial_g_speed_gradient: jetDerivative(crossBinaryJet, 1, 3),
    theta_second_partial_g_theta_theta_hessian: jetDerivative(
      crossBinaryJet,
      5,
      0
    ),
    theta_second_partial_g_theta_speed_hessian: jetDerivative(
      crossBinaryJet,
      4,
      1
    ),
    theta_second_partial_g_speed_speed_hessian: jetDerivative(
      crossBinaryJet,
      3,
      2
    ),
    speed_second_partial_g_theta_theta_hessian: jetDerivative(
      crossBinaryJet,
      3,
      2
    ),
    speed_second_partial_g_theta_speed_hessian: jetDerivative(
      crossBinaryJet,
      2,
      3
    ),
    speed_second_partial_g_speed_speed_hessian: jetDerivative(
      crossBinaryJet,
      1,
      4
    ),
    maximum_root_equation_residual_abs:
      sourceJet.maximum_root_equation_residual_abs,
    F_delta_signs: sourceJet.F_delta_signs,
  };
}

function buildSampledAnalyticJetCurvatureWitness({
  refinedRows,
  thetaScale,
  speedScale,
  overshootCeiling,
}) {
  let maxThetaSecond = 0;
  let maxSpeedSecond = 0;
  let maxDerivativeResidual = 0;
  let maxRootEquationResidual = 0;
  let maxThetaSecondThetaGradient = 0;
  let maxThetaSecondSpeedGradient = 0;
  let maxSpeedSecondThetaGradient = 0;
  let maxSpeedSecondSpeedGradient = 0;
  let maxThetaSecondThetaThetaHessian = 0;
  let maxThetaSecondThetaSpeedHessian = 0;
  let maxThetaSecondSpeedSpeedHessian = 0;
  let maxSpeedSecondThetaThetaHessian = 0;
  let maxSpeedSecondThetaSpeedHessian = 0;
  let maxSpeedSecondSpeedSpeedHessian = 0;
  let thetaBottleneck = null;
  let speedBottleneck = null;
  let derivativeResidualBottleneck = null;
  let thetaThetaGradientBottleneck = null;
  let thetaSpeedGradientBottleneck = null;
  let speedThetaGradientBottleneck = null;
  let speedSpeedGradientBottleneck = null;
  let thetaThetaThetaHessianBottleneck = null;
  let thetaThetaSpeedHessianBottleneck = null;
  let thetaSpeedSpeedHessianBottleneck = null;
  let speedThetaThetaHessianBottleneck = null;
  let speedThetaSpeedHessianBottleneck = null;
  let speedSpeedSpeedHessianBottleneck = null;

  for (const row of refinedRows) {
    const jetRow = evaluateAnalyticJetCurvatureAtRow(row);
    const absThetaSecond = Math.abs(jetRow.theta_second_partial_g);
    const absSpeedSecond = Math.abs(jetRow.speed_second_partial_g);
    const absThetaThetaGradient = Math.abs(
      jetRow.theta_second_partial_g_theta_gradient
    );
    const absThetaSpeedGradient = Math.abs(
      jetRow.theta_second_partial_g_speed_gradient
    );
    const absSpeedThetaGradient = Math.abs(
      jetRow.speed_second_partial_g_theta_gradient
    );
    const absSpeedSpeedGradient = Math.abs(
      jetRow.speed_second_partial_g_speed_gradient
    );
    const absThetaThetaThetaHessian = Math.abs(
      jetRow.theta_second_partial_g_theta_theta_hessian
    );
    const absThetaThetaSpeedHessian = Math.abs(
      jetRow.theta_second_partial_g_theta_speed_hessian
    );
    const absThetaSpeedSpeedHessian = Math.abs(
      jetRow.theta_second_partial_g_speed_speed_hessian
    );
    const absSpeedThetaThetaHessian = Math.abs(
      jetRow.speed_second_partial_g_theta_theta_hessian
    );
    const absSpeedThetaSpeedHessian = Math.abs(
      jetRow.speed_second_partial_g_theta_speed_hessian
    );
    const absSpeedSpeedSpeedHessian = Math.abs(
      jetRow.speed_second_partial_g_speed_speed_hessian
    );

    if (absThetaSecond > maxThetaSecond) {
      maxThetaSecond = absThetaSecond;
      thetaBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(jetRow.theta_second_partial_g),
      };
    }
    if (absSpeedSecond > maxSpeedSecond) {
      maxSpeedSecond = absSpeedSecond;
      speedBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(jetRow.speed_second_partial_g),
      };
    }
    if (jetRow.derivative_residual_abs > maxDerivativeResidual) {
      maxDerivativeResidual = jetRow.derivative_residual_abs;
      derivativeResidualBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        residual_abs: formatSmallNumber(jetRow.derivative_residual_abs),
      };
    }
    if (absThetaThetaGradient > maxThetaSecondThetaGradient) {
      maxThetaSecondThetaGradient = absThetaThetaGradient;
      thetaThetaGradientBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(jetRow.theta_second_partial_g_theta_gradient),
      };
    }
    if (absThetaSpeedGradient > maxThetaSecondSpeedGradient) {
      maxThetaSecondSpeedGradient = absThetaSpeedGradient;
      thetaSpeedGradientBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(jetRow.theta_second_partial_g_speed_gradient),
      };
    }
    if (absSpeedThetaGradient > maxSpeedSecondThetaGradient) {
      maxSpeedSecondThetaGradient = absSpeedThetaGradient;
      speedThetaGradientBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(jetRow.speed_second_partial_g_theta_gradient),
      };
    }
    if (absSpeedSpeedGradient > maxSpeedSecondSpeedGradient) {
      maxSpeedSecondSpeedGradient = absSpeedSpeedGradient;
      speedSpeedGradientBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(jetRow.speed_second_partial_g_speed_gradient),
      };
    }
    if (absThetaThetaThetaHessian > maxThetaSecondThetaThetaHessian) {
      maxThetaSecondThetaThetaHessian = absThetaThetaThetaHessian;
      thetaThetaThetaHessianBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(
          jetRow.theta_second_partial_g_theta_theta_hessian
        ),
      };
    }
    if (absThetaThetaSpeedHessian > maxThetaSecondThetaSpeedHessian) {
      maxThetaSecondThetaSpeedHessian = absThetaThetaSpeedHessian;
      thetaThetaSpeedHessianBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(
          jetRow.theta_second_partial_g_theta_speed_hessian
        ),
      };
    }
    if (absThetaSpeedSpeedHessian > maxThetaSecondSpeedSpeedHessian) {
      maxThetaSecondSpeedSpeedHessian = absThetaSpeedSpeedHessian;
      thetaSpeedSpeedHessianBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(
          jetRow.theta_second_partial_g_speed_speed_hessian
        ),
      };
    }
    if (absSpeedThetaThetaHessian > maxSpeedSecondThetaThetaHessian) {
      maxSpeedSecondThetaThetaHessian = absSpeedThetaThetaHessian;
      speedThetaThetaHessianBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(
          jetRow.speed_second_partial_g_theta_theta_hessian
        ),
      };
    }
    if (absSpeedThetaSpeedHessian > maxSpeedSecondThetaSpeedHessian) {
      maxSpeedSecondThetaSpeedHessian = absSpeedThetaSpeedHessian;
      speedThetaSpeedHessianBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(
          jetRow.speed_second_partial_g_theta_speed_hessian
        ),
      };
    }
    if (absSpeedSpeedSpeedHessian > maxSpeedSecondSpeedSpeedHessian) {
      maxSpeedSecondSpeedSpeedHessian = absSpeedSpeedSpeedHessian;
      speedSpeedSpeedHessianBottleneck = {
        theta: formatSmallNumber(row.theta),
        speed_ratio: formatSmallNumber(row.speed_ratio),
        value: formatSmallNumber(
          jetRow.speed_second_partial_g_speed_speed_hessian
        ),
      };
    }
    maxRootEquationResidual = Math.max(
      maxRootEquationResidual,
      jetRow.maximum_root_equation_residual_abs
    );
  }

  const analyticJetRemainder =
    thetaScale * maxThetaSecond + speedScale * maxSpeedSecond;
  const passed =
    analyticJetRemainder < overshootCeiling &&
    Number.isFinite(analyticJetRemainder);

  return {
    witness_type: "sampled-analytic-jet-curvature-witness",
    target_function: "g=f_cross_prime",
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_sampled_analytic_jet_curvature_witness: passed,
    analytic_jet_sample_count: refinedRows.length,
    theta_second_partial_analytic_jet_sample_max_abs:
      formatSmallNumber(maxThetaSecond),
    speed_second_partial_analytic_jet_sample_max_abs:
      formatSmallNumber(maxSpeedSecond),
    sampled_analytic_jet_bilinear_remainder:
      formatSmallNumber(analyticJetRemainder),
    sampled_analytic_jet_remainder_ratio_to_required_bound:
      formatSmallNumber(analyticJetRemainder / overshootCeiling),
    maximum_derivative_formula_residual_abs:
      formatSmallNumber(maxDerivativeResidual),
    maximum_root_equation_residual_abs:
      formatSmallNumber(maxRootEquationResidual),
    theta_second_partial_theta_gradient_sample_max_abs:
      formatSmallNumber(maxThetaSecondThetaGradient),
    theta_second_partial_speed_gradient_sample_max_abs:
      formatSmallNumber(maxThetaSecondSpeedGradient),
    speed_second_partial_theta_gradient_sample_max_abs:
      formatSmallNumber(maxSpeedSecondThetaGradient),
    speed_second_partial_speed_gradient_sample_max_abs:
      formatSmallNumber(maxSpeedSecondSpeedGradient),
    theta_second_partial_theta_theta_hessian_sample_max_abs:
      formatSmallNumber(maxThetaSecondThetaThetaHessian),
    theta_second_partial_theta_speed_hessian_sample_max_abs:
      formatSmallNumber(maxThetaSecondThetaSpeedHessian),
    theta_second_partial_speed_speed_hessian_sample_max_abs:
      formatSmallNumber(maxThetaSecondSpeedSpeedHessian),
    speed_second_partial_theta_theta_hessian_sample_max_abs:
      formatSmallNumber(maxSpeedSecondThetaThetaHessian),
    speed_second_partial_theta_speed_hessian_sample_max_abs:
      formatSmallNumber(maxSpeedSecondThetaSpeedHessian),
    speed_second_partial_speed_speed_hessian_sample_max_abs:
      formatSmallNumber(maxSpeedSecondSpeedSpeedHessian),
    theta_second_partial_bottleneck: thetaBottleneck,
    speed_second_partial_bottleneck: speedBottleneck,
    derivative_residual_bottleneck: derivativeResidualBottleneck,
    theta_second_partial_theta_gradient_bottleneck:
      thetaThetaGradientBottleneck,
    theta_second_partial_speed_gradient_bottleneck:
      thetaSpeedGradientBottleneck,
    speed_second_partial_theta_gradient_bottleneck:
      speedThetaGradientBottleneck,
    speed_second_partial_speed_gradient_bottleneck:
      speedSpeedGradientBottleneck,
    theta_second_partial_theta_theta_hessian_bottleneck:
      thetaThetaThetaHessianBottleneck,
    theta_second_partial_theta_speed_hessian_bottleneck:
      thetaThetaSpeedHessianBottleneck,
    theta_second_partial_speed_speed_hessian_bottleneck:
      thetaSpeedSpeedHessianBottleneck,
    speed_second_partial_theta_theta_hessian_bottleneck:
      speedThetaThetaHessianBottleneck,
    speed_second_partial_theta_speed_hessian_bottleneck:
      speedThetaSpeedHessianBottleneck,
    speed_second_partial_speed_speed_hessian_bottleneck:
      speedSpeedSpeedHessianBottleneck,
    theorem_implication:
      "The finite root-sheet jet recurrence is executable on the refined sample rows and gives sampled analytic pure-curvature values for the same bilinear target; this is still a sampled witness, not an interval curvature enclosure.",
    status: passed
      ? SAMPLED_ANALYTIC_JET_CURVATURE_STATUS
      : "sampled-analytic-jet-curvature-witness-open",
  };
}

function buildSampledAnalyticJetEnvelopeBudget({
  sampledPureCurvatureProbe,
  sampledAnalyticJetCurvatureWitness,
  thetaScale,
  speedScale,
  overshootCeiling,
}) {
  const finiteDifferenceThetaMax = Number(
    sampledPureCurvatureProbe.theta_second_partial_sample_max_abs
  );
  const finiteDifferenceSpeedMax = Number(
    sampledPureCurvatureProbe.speed_second_partial_sample_max_abs
  );
  const analyticJetThetaMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_analytic_jet_sample_max_abs
  );
  const analyticJetSpeedMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_analytic_jet_sample_max_abs
  );
  const finiteDifferenceRemainder = Number(
    sampledPureCurvatureProbe.sampled_bilinear_remainder
  );
  const analyticJetRemainder = Number(
    sampledAnalyticJetCurvatureWitness.sampled_analytic_jet_bilinear_remainder
  );
  const thetaEnvelopeMax = Math.max(finiteDifferenceThetaMax, analyticJetThetaMax);
  const speedEnvelopeMax = Math.max(finiteDifferenceSpeedMax, analyticJetSpeedMax);
  const componentEnvelopeRemainder =
    thetaScale * thetaEnvelopeMax + speedScale * speedEnvelopeMax;
  const totalEstimatorEnvelopeRemainder = Math.max(
    finiteDifferenceRemainder,
    analyticJetRemainder
  );
  const envelopeRemainder = componentEnvelopeRemainder;
  const signedRemainderGap = analyticJetRemainder - finiteDifferenceRemainder;
  const absoluteRemainderGap = Math.abs(signedRemainderGap);
  const analyticJetHeadroom = overshootCeiling - analyticJetRemainder;
  const remainingHeadroom = overshootCeiling - envelopeRemainder;
  const analyticToFiniteDifferenceRemainderRatio =
    finiteDifferenceRemainder > 0
      ? analyticJetRemainder / finiteDifferenceRemainder
      : null;
  const maximumUniformEnvelopeInflationFactor =
    envelopeRemainder > 0 ? overshootCeiling / envelopeRemainder : null;
  const passed =
    Number.isFinite(envelopeRemainder) &&
    Number.isFinite(remainingHeadroom) &&
    envelopeRemainder < overshootCeiling;

  return {
    budget_type: "sampled-analytic-jet-envelope-budget",
    target_function: "g=f_cross_prime",
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_sampled_analytic_jet_envelope_budget: passed,
    required_error_bound_less_than: formatSmallNumber(overshootCeiling),
    finite_difference_theta_second_partial_sample_max_abs: formatSmallNumber(
      finiteDifferenceThetaMax
    ),
    analytic_jet_theta_second_partial_sample_max_abs: formatSmallNumber(
      analyticJetThetaMax
    ),
    theta_second_partial_sample_envelope_max_abs: formatSmallNumber(
      thetaEnvelopeMax
    ),
    theta_second_partial_sample_gap_abs: formatSmallNumber(
      Math.abs(analyticJetThetaMax - finiteDifferenceThetaMax)
    ),
    finite_difference_speed_second_partial_sample_max_abs: formatSmallNumber(
      finiteDifferenceSpeedMax
    ),
    analytic_jet_speed_second_partial_sample_max_abs: formatSmallNumber(
      analyticJetSpeedMax
    ),
    speed_second_partial_sample_envelope_max_abs: formatSmallNumber(
      speedEnvelopeMax
    ),
    speed_second_partial_sample_gap_abs: formatSmallNumber(
      Math.abs(analyticJetSpeedMax - finiteDifferenceSpeedMax)
    ),
    finite_difference_bilinear_remainder: formatSmallNumber(
      finiteDifferenceRemainder
    ),
    analytic_jet_bilinear_remainder: formatSmallNumber(analyticJetRemainder),
    sampled_total_estimator_envelope_remainder: formatSmallNumber(
      totalEstimatorEnvelopeRemainder
    ),
    sampled_curvature_estimator_envelope_remainder:
      formatSmallNumber(envelopeRemainder),
    sampled_curvature_estimator_envelope_ratio_to_required_bound:
      formatSmallNumber(envelopeRemainder / overshootCeiling),
    analytic_minus_finite_difference_remainder:
      formatSmallNumber(signedRemainderGap),
    sampled_analytic_vs_second_difference_remainder_gap:
      formatSmallNumber(absoluteRemainderGap),
    analytic_to_finite_difference_remainder_ratio: formatSmallNumber(
      analyticToFiniteDifferenceRemainderRatio
    ),
    remaining_envelope_headroom: formatSmallNumber(remainingHeadroom),
    remaining_analytic_jet_headroom: formatSmallNumber(analyticJetHeadroom),
    theta_only_analytic_jet_envelope_radius_less_than: formatSmallNumber(
      analyticJetHeadroom / thetaScale
    ),
    speed_only_analytic_jet_envelope_radius_less_than: formatSmallNumber(
      analyticJetHeadroom / speedScale
    ),
    balanced_analytic_jet_envelope_radius_less_than: formatSmallNumber(
      analyticJetHeadroom / (thetaScale + speedScale)
    ),
    balanced_estimator_envelope_radius_less_than: formatSmallNumber(
      remainingHeadroom / (thetaScale + speedScale)
    ),
    maximum_uniform_sampled_curvature_estimator_envelope_inflation_factor_less_than:
      formatSmallNumber(maximumUniformEnvelopeInflationFactor),
    theorem_implication:
      "The finite-difference and analytic-jet sampled curvature estimators are both below the row budget; their sampled envelope gives the remaining headroom later consumed by the directed-rounded interval/Taylor curvature enclosure, but it is not itself an interval enclosure.",
    status: passed
      ? SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS
      : "sampled-analytic-jet-envelope-budget-open",
  };
}

function buildSampledFourthJetCurvatureTransportWitness({
  sampledAnalyticJetCurvatureWitness,
  sampledAnalyticJetEnvelopeBudget,
  thetaWidth,
  speedWidth,
  refinementSamplesPerSubcellAxis,
  thetaScale,
  speedScale,
  overshootCeiling,
}) {
  const sampleDenominator = Math.max(1, refinementSamplesPerSubcellAxis - 1);
  const thetaSampleCoveringRadius = thetaWidth / (2 * sampleDenominator);
  const speedSampleCoveringRadius = speedWidth / (2 * sampleDenominator);
  const thetaBaseEnvelopeMax = Number(
    sampledAnalyticJetEnvelopeBudget.theta_second_partial_sample_envelope_max_abs
  );
  const speedBaseEnvelopeMax = Number(
    sampledAnalyticJetEnvelopeBudget.speed_second_partial_sample_envelope_max_abs
  );
  const thetaThetaGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_theta_gradient_sample_max_abs
  );
  const thetaSpeedGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_speed_gradient_sample_max_abs
  );
  const speedThetaGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_theta_gradient_sample_max_abs
  );
  const speedSpeedGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_speed_gradient_sample_max_abs
  );
  const thetaSecondPartialTransportRadius =
    thetaSampleCoveringRadius * thetaThetaGradientMax +
    speedSampleCoveringRadius * thetaSpeedGradientMax;
  const speedSecondPartialTransportRadius =
    thetaSampleCoveringRadius * speedThetaGradientMax +
    speedSampleCoveringRadius * speedSpeedGradientMax;
  const transportedThetaMax =
    thetaBaseEnvelopeMax + thetaSecondPartialTransportRadius;
  const transportedSpeedMax =
    speedBaseEnvelopeMax + speedSecondPartialTransportRadius;
  const transportRemainder =
    thetaScale * transportedThetaMax + speedScale * transportedSpeedMax;
  const remainingHeadroom = overshootCeiling - transportRemainder;
  const maximumUniformTransportInflationFactor =
    transportRemainder > 0 ? overshootCeiling / transportRemainder : null;
  const passed =
    sampledAnalyticJetCurvatureWitness.status ===
      SAMPLED_ANALYTIC_JET_CURVATURE_STATUS &&
    sampledAnalyticJetEnvelopeBudget.status ===
      SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS &&
    Number.isFinite(transportRemainder) &&
    transportRemainder < overshootCeiling;

  return {
    witness_type: "sampled-fourth-jet-curvature-transport-witness",
    target_function: "g=f_cross_prime",
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_sampled_fourth_jet_curvature_transport_witness: passed,
    consumes_sampled_analytic_jet_curvature_witness_status:
      sampledAnalyticJetCurvatureWitness.status,
    consumes_sampled_analytic_jet_envelope_budget_status:
      sampledAnalyticJetEnvelopeBudget.status,
    sampled_analytic_jet_sample_count:
      sampledAnalyticJetCurvatureWitness.analytic_jet_sample_count,
    theta_sample_covering_radius: formatSmallNumber(thetaSampleCoveringRadius),
    speed_ratio_sample_covering_radius: formatSmallNumber(
      speedSampleCoveringRadius
    ),
    theta_second_partial_base_sample_envelope_max_abs: formatSmallNumber(
      thetaBaseEnvelopeMax
    ),
    speed_second_partial_base_sample_envelope_max_abs: formatSmallNumber(
      speedBaseEnvelopeMax
    ),
    theta_second_partial_theta_gradient_sample_max_abs: formatSmallNumber(
      thetaThetaGradientMax
    ),
    theta_second_partial_speed_gradient_sample_max_abs: formatSmallNumber(
      thetaSpeedGradientMax
    ),
    speed_second_partial_theta_gradient_sample_max_abs: formatSmallNumber(
      speedThetaGradientMax
    ),
    speed_second_partial_speed_gradient_sample_max_abs: formatSmallNumber(
      speedSpeedGradientMax
    ),
    theta_second_partial_transport_radius: formatSmallNumber(
      thetaSecondPartialTransportRadius
    ),
    speed_second_partial_transport_radius: formatSmallNumber(
      speedSecondPartialTransportRadius
    ),
    transported_theta_second_partial_sample_max_abs:
      formatSmallNumber(transportedThetaMax),
    transported_speed_second_partial_sample_max_abs:
      formatSmallNumber(transportedSpeedMax),
    sampled_fourth_jet_transport_bilinear_remainder:
      formatSmallNumber(transportRemainder),
    sampled_fourth_jet_transport_remainder_ratio_to_required_bound:
      formatSmallNumber(transportRemainder / overshootCeiling),
    remaining_transport_headroom: formatSmallNumber(remainingHeadroom),
    maximum_uniform_sampled_fourth_jet_transport_inflation_factor_less_than:
      formatSmallNumber(maximumUniformTransportInflationFactor),
    theta_second_partial_theta_gradient_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .theta_second_partial_theta_gradient_bottleneck,
    theta_second_partial_speed_gradient_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .theta_second_partial_speed_gradient_bottleneck,
    speed_second_partial_theta_gradient_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .speed_second_partial_theta_gradient_bottleneck,
    speed_second_partial_speed_gradient_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .speed_second_partial_speed_gradient_bottleneck,
    theorem_implication:
      "The sampled order-4 root-sheet jets bound first sampled transport of the two pure-curvature components from the nearest sample point across the subcell covering radii. This is a concrete Taylor-transport target for the interval backend; it remains sampled and does not certify a full interval curvature enclosure.",
    status: passed
      ? SAMPLED_FOURTH_JET_CURVATURE_TRANSPORT_STATUS
      : "sampled-fourth-jet-curvature-transport-witness-open",
  };
}

function buildSampledFifthJetCurvatureGradientTransportWitness({
  sampledAnalyticJetCurvatureWitness,
  sampledAnalyticJetEnvelopeBudget,
  sampledFourthJetCurvatureTransportWitness,
  thetaWidth,
  speedWidth,
  refinementSamplesPerSubcellAxis,
  thetaScale,
  speedScale,
  overshootCeiling,
}) {
  const sampleDenominator = Math.max(1, refinementSamplesPerSubcellAxis - 1);
  const thetaSampleCoveringRadius = thetaWidth / (2 * sampleDenominator);
  const speedSampleCoveringRadius = speedWidth / (2 * sampleDenominator);
  const thetaBaseEnvelopeMax = Number(
    sampledAnalyticJetEnvelopeBudget.theta_second_partial_sample_envelope_max_abs
  );
  const speedBaseEnvelopeMax = Number(
    sampledAnalyticJetEnvelopeBudget.speed_second_partial_sample_envelope_max_abs
  );
  const thetaThetaGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_theta_gradient_sample_max_abs
  );
  const thetaSpeedGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_speed_gradient_sample_max_abs
  );
  const speedThetaGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_theta_gradient_sample_max_abs
  );
  const speedSpeedGradientMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_speed_gradient_sample_max_abs
  );
  const thetaThetaThetaHessianMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_theta_theta_hessian_sample_max_abs
  );
  const thetaThetaSpeedHessianMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_theta_speed_hessian_sample_max_abs
  );
  const thetaSpeedSpeedHessianMax = Number(
    sampledAnalyticJetCurvatureWitness
      .theta_second_partial_speed_speed_hessian_sample_max_abs
  );
  const speedThetaThetaHessianMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_theta_theta_hessian_sample_max_abs
  );
  const speedThetaSpeedHessianMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_theta_speed_hessian_sample_max_abs
  );
  const speedSpeedSpeedHessianMax = Number(
    sampledAnalyticJetCurvatureWitness
      .speed_second_partial_speed_speed_hessian_sample_max_abs
  );

  const transportedThetaThetaGradientMax =
    thetaThetaGradientMax +
    thetaSampleCoveringRadius * thetaThetaThetaHessianMax +
    speedSampleCoveringRadius * thetaThetaSpeedHessianMax;
  const transportedThetaSpeedGradientMax =
    thetaSpeedGradientMax +
    thetaSampleCoveringRadius * thetaThetaSpeedHessianMax +
    speedSampleCoveringRadius * thetaSpeedSpeedHessianMax;
  const transportedSpeedThetaGradientMax =
    speedThetaGradientMax +
    thetaSampleCoveringRadius * speedThetaThetaHessianMax +
    speedSampleCoveringRadius * speedThetaSpeedHessianMax;
  const transportedSpeedSpeedGradientMax =
    speedSpeedGradientMax +
    thetaSampleCoveringRadius * speedThetaSpeedHessianMax +
    speedSampleCoveringRadius * speedSpeedSpeedHessianMax;
  const thetaSecondPartialGradientTransportRadius =
    thetaSampleCoveringRadius *
      (transportedThetaThetaGradientMax - thetaThetaGradientMax) +
    speedSampleCoveringRadius *
      (transportedThetaSpeedGradientMax - thetaSpeedGradientMax);
  const speedSecondPartialGradientTransportRadius =
    thetaSampleCoveringRadius *
      (transportedSpeedThetaGradientMax - speedThetaGradientMax) +
    speedSampleCoveringRadius *
      (transportedSpeedSpeedGradientMax - speedSpeedGradientMax);
  const transportedThetaMax =
    thetaBaseEnvelopeMax +
    thetaSampleCoveringRadius * transportedThetaThetaGradientMax +
    speedSampleCoveringRadius * transportedThetaSpeedGradientMax;
  const transportedSpeedMax =
    speedBaseEnvelopeMax +
    thetaSampleCoveringRadius * transportedSpeedThetaGradientMax +
    speedSampleCoveringRadius * transportedSpeedSpeedGradientMax;
  const transportRemainder =
    thetaScale * transportedThetaMax + speedScale * transportedSpeedMax;
  const remainingHeadroom = overshootCeiling - transportRemainder;
  const maximumUniformTransportInflationFactor =
    transportRemainder > 0 ? overshootCeiling / transportRemainder : null;
  const overrunRatio =
    overshootCeiling > 0 ? transportRemainder / overshootCeiling : Infinity;
  const passed =
    sampledAnalyticJetCurvatureWitness.status ===
      SAMPLED_ANALYTIC_JET_CURVATURE_STATUS &&
    sampledAnalyticJetEnvelopeBudget.status ===
      SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS &&
    sampledFourthJetCurvatureTransportWitness.status ===
      SAMPLED_FOURTH_JET_CURVATURE_TRANSPORT_STATUS &&
    Number.isFinite(transportRemainder) &&
    transportRemainder < overshootCeiling;

  return {
    witness_type: "sampled-fifth-jet-curvature-gradient-transport-witness",
    target_function: "g=f_cross_prime",
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_sampled_fifth_jet_curvature_gradient_transport_witness: passed,
    consumes_sampled_fourth_jet_curvature_transport_witness_status:
      sampledFourthJetCurvatureTransportWitness.status,
    sampled_analytic_jet_sample_count:
      sampledAnalyticJetCurvatureWitness.analytic_jet_sample_count,
    theta_sample_covering_radius: formatSmallNumber(thetaSampleCoveringRadius),
    speed_ratio_sample_covering_radius: formatSmallNumber(
      speedSampleCoveringRadius
    ),
    theta_second_partial_base_sample_envelope_max_abs: formatSmallNumber(
      thetaBaseEnvelopeMax
    ),
    speed_second_partial_base_sample_envelope_max_abs: formatSmallNumber(
      speedBaseEnvelopeMax
    ),
    theta_second_partial_theta_gradient_sample_max_abs: formatSmallNumber(
      thetaThetaGradientMax
    ),
    theta_second_partial_speed_gradient_sample_max_abs: formatSmallNumber(
      thetaSpeedGradientMax
    ),
    speed_second_partial_theta_gradient_sample_max_abs: formatSmallNumber(
      speedThetaGradientMax
    ),
    speed_second_partial_speed_gradient_sample_max_abs: formatSmallNumber(
      speedSpeedGradientMax
    ),
    theta_second_partial_theta_theta_hessian_sample_max_abs: formatSmallNumber(
      thetaThetaThetaHessianMax
    ),
    theta_second_partial_theta_speed_hessian_sample_max_abs: formatSmallNumber(
      thetaThetaSpeedHessianMax
    ),
    theta_second_partial_speed_speed_hessian_sample_max_abs: formatSmallNumber(
      thetaSpeedSpeedHessianMax
    ),
    speed_second_partial_theta_theta_hessian_sample_max_abs: formatSmallNumber(
      speedThetaThetaHessianMax
    ),
    speed_second_partial_theta_speed_hessian_sample_max_abs: formatSmallNumber(
      speedThetaSpeedHessianMax
    ),
    speed_second_partial_speed_speed_hessian_sample_max_abs: formatSmallNumber(
      speedSpeedSpeedHessianMax
    ),
    transported_theta_second_partial_theta_gradient_max_abs:
      formatSmallNumber(transportedThetaThetaGradientMax),
    transported_theta_second_partial_speed_gradient_max_abs:
      formatSmallNumber(transportedThetaSpeedGradientMax),
    transported_speed_second_partial_theta_gradient_max_abs:
      formatSmallNumber(transportedSpeedThetaGradientMax),
    transported_speed_second_partial_speed_gradient_max_abs:
      formatSmallNumber(transportedSpeedSpeedGradientMax),
    theta_second_partial_gradient_transport_radius: formatSmallNumber(
      thetaSecondPartialGradientTransportRadius
    ),
    speed_second_partial_gradient_transport_radius: formatSmallNumber(
      speedSecondPartialGradientTransportRadius
    ),
    fifth_jet_transported_theta_second_partial_sample_max_abs:
      formatSmallNumber(transportedThetaMax),
    fifth_jet_transported_speed_second_partial_sample_max_abs:
      formatSmallNumber(transportedSpeedMax),
    sampled_fifth_jet_curvature_gradient_transport_bilinear_remainder:
      formatSmallNumber(transportRemainder),
    sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound:
      formatSmallNumber(overrunRatio),
    remaining_fifth_jet_transport_headroom: formatSmallNumber(remainingHeadroom),
    maximum_uniform_sampled_fifth_jet_transport_inflation_factor_less_than:
      formatSmallNumber(maximumUniformTransportInflationFactor),
    theta_second_partial_theta_theta_hessian_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .theta_second_partial_theta_theta_hessian_bottleneck,
    theta_second_partial_theta_speed_hessian_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .theta_second_partial_theta_speed_hessian_bottleneck,
    theta_second_partial_speed_speed_hessian_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .theta_second_partial_speed_speed_hessian_bottleneck,
    speed_second_partial_theta_theta_hessian_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .speed_second_partial_theta_theta_hessian_bottleneck,
    speed_second_partial_theta_speed_hessian_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .speed_second_partial_theta_speed_hessian_bottleneck,
    speed_second_partial_speed_speed_hessian_bottleneck:
      sampledAnalyticJetCurvatureWitness
        .speed_second_partial_speed_speed_hessian_bottleneck,
    theorem_implication:
      "The sampled order-5 root-sheet jets transport the order-4 curvature-gradient samples before transporting the two pure-curvature components across the subcell covering radii. This is a sharper Taylor transport witness than the fourth-jet row, but it remains sampled and does not certify a directed-rounded interval curvature enclosure.",
    status: passed
      ? SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS
      : "sampled-fifth-jet-curvature-gradient-transport-witness-open",
  };
}

function buildSampledThetaLocalizedTaylorUpperEnvelopeWitness({
  fineRows,
  fineCount,
  thetaStart,
  speedStart,
  speedEnd,
  coarseStep,
  thetaWidth,
  speedWidth,
  thetaLocalizedTaylorSubdivisions,
  vertexMaxDerivative,
  overshootCeiling,
  sampledFifthJetCurvatureGradientTransportWitness,
  directIntervalDerivativeEnvelopeAttempt,
}) {
  const thetaStepIndex = coarseStep / thetaLocalizedTaylorSubdivisions;
  if (
    !Number.isInteger(thetaStepIndex) ||
    thetaStepIndex < 1
  ) {
    throw new Error(
      "thetaLocalizedTaylorSubdivisions must divide refinementSamplesPerSubcellAxis - 1"
    );
  }

  const thetaSecondPartialBound = Number(
    sampledFifthJetCurvatureGradientTransportWitness
      .fifth_jet_transported_theta_second_partial_sample_max_abs
  );
  const speedSecondPartialBound = Number(
    sampledFifthJetCurvatureGradientTransportWitness
      .fifth_jet_transported_speed_second_partial_sample_max_abs
  );
  const tileThetaWidth = thetaWidth / thetaLocalizedTaylorSubdivisions;
  const thetaScale = (tileThetaWidth * tileThetaWidth) / 8;
  const speedScale = (speedWidth * speedWidth) / 8;
  const thetaComponentRemainder = thetaScale * thetaSecondPartialBound;
  const speedComponentRemainder = speedScale * speedSecondPartialBound;
  const sampledTaylorRemainder =
    thetaComponentRemainder + speedComponentRemainder;
  const vertex = Number(vertexMaxDerivative);
  const requiredOvershoot = Number(overshootCeiling);
  const allowedUpperBound = vertex + requiredOvershoot;

  const tileRows = [];
  let maxTileRatio = -Infinity;
  let minTileHeadroom = Infinity;
  let maxTileUpperBound = -Infinity;
  let maxTileUpperBoundOverrun = 0;
  let maxTileVertexExcessOverParent = 0;
  let bottleneckTile = null;

  for (
    let tileIndex = 0;
    tileIndex < thetaLocalizedTaylorSubdivisions;
    tileIndex += 1
  ) {
    const tileThetaStartIndex = thetaStart + tileIndex * thetaStepIndex;
    const tileThetaEndIndex = tileThetaStartIndex + thetaStepIndex;
    const tileVertexRows = [
      rowAt(fineRows, fineCount, tileThetaStartIndex, speedStart),
      rowAt(fineRows, fineCount, tileThetaStartIndex, speedEnd),
      rowAt(fineRows, fineCount, tileThetaEndIndex, speedStart),
      rowAt(fineRows, fineCount, tileThetaEndIndex, speedEnd),
    ];
    const tileVertexMaxDerivative = Math.max(
      ...tileVertexRows.map((row) => row.derivative)
    );
    const tileVertexExcessOverParent = Math.max(
      0,
      tileVertexMaxDerivative - vertex
    );
    const tileUpperBound = tileVertexMaxDerivative + sampledTaylorRemainder;
    const tileHeadroom = allowedUpperBound - tileUpperBound;
    const tileOverrun = Math.max(0, -tileHeadroom);
    const tileRatio =
      requiredOvershoot > 0
        ? (tileVertexExcessOverParent + sampledTaylorRemainder) /
          requiredOvershoot
        : Infinity;
    const tileRow = {
      tile_index: tileIndex,
      theta_grid_index_interval: [tileThetaStartIndex, tileThetaEndIndex],
      speed_ratio_grid_index_interval: [speedStart, speedEnd],
      theta_interval: [
        formatSmallNumber(tileVertexRows[0].theta),
        formatSmallNumber(tileVertexRows[2].theta),
      ],
      speed_ratio_interval: [
        formatSmallNumber(tileVertexRows[0].speed_ratio),
        formatSmallNumber(tileVertexRows[1].speed_ratio),
      ],
      tile_vertex_max_derivative: formatSmallNumber(tileVertexMaxDerivative),
      tile_vertex_excess_over_parent:
        formatSmallNumber(tileVertexExcessOverParent),
      sampled_taylor_upper_bound: formatSmallNumber(tileUpperBound),
      allowed_upper_bound: formatSmallNumber(allowedUpperBound),
      sampled_taylor_upper_bound_headroom: formatSmallNumber(tileHeadroom),
      sampled_taylor_upper_bound_overrun: formatSmallNumber(tileOverrun),
      sampled_taylor_remainder_ratio_to_required_bound:
        formatSmallNumber(tileRatio),
    };

    tileRows.push(tileRow);
    maxTileRatio = Math.max(maxTileRatio, tileRatio);
    minTileHeadroom = Math.min(minTileHeadroom, tileHeadroom);
    maxTileUpperBound = Math.max(maxTileUpperBound, tileUpperBound);
    maxTileUpperBoundOverrun = Math.max(maxTileUpperBoundOverrun, tileOverrun);
    maxTileVertexExcessOverParent = Math.max(
      maxTileVertexExcessOverParent,
      tileVertexExcessOverParent
    );
    if (
      bottleneckTile === null ||
      tileRatio > bottleneckTile.sampled_taylor_remainder_ratio_to_required_bound
    ) {
      bottleneckTile = {
        tile_index: tileIndex,
        theta_grid_index_interval: [tileThetaStartIndex, tileThetaEndIndex],
        speed_ratio_grid_index_interval: [speedStart, speedEnd],
        sampled_taylor_remainder_ratio_to_required_bound: tileRatio,
        sampled_taylor_upper_bound_headroom: tileHeadroom,
      };
    }
  }

  const directIntervalRatio = Number(
    directIntervalDerivativeEnvelopeAttempt
      .direct_interval_remainder_ratio_to_required_bound
  );
  const directToSampledTaylorReductionFactor =
    Number.isFinite(directIntervalRatio) &&
    Number.isFinite(maxTileRatio) &&
    maxTileRatio > 0
      ? directIntervalRatio / maxTileRatio
      : null;
  const passed =
    sampledFifthJetCurvatureGradientTransportWitness.status ===
      SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS &&
    Number.isFinite(sampledTaylorRemainder) &&
    Number.isFinite(maxTileUpperBound) &&
    Number.isFinite(minTileHeadroom) &&
    requiredOvershoot > 0 &&
    minTileHeadroom > 0;

  return {
    witness_type: "sampled-theta-localized-taylor-upper-envelope-witness",
    attempt_type: "sampled-theta-localized-taylor-upper-envelope-attempt",
    target_function: "g=f_cross_prime",
    claim_scope:
      "geometry-bridge/i1-f1/sampled-theta-localized-taylor-upper-envelope",
    certifies_sampled_theta_localized_taylor_upper_envelope_witness: passed,
    certifies_directed_rounded_taylor_upper_envelope: false,
    certifies_direct_interval_derivative_upper_envelope: false,
    certifies_interval_derivative_enclosure: false,
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
      false,
    consumes_sampled_fifth_jet_curvature_gradient_transport_witness_status:
      sampledFifthJetCurvatureGradientTransportWitness.status,
    consumes_direct_interval_derivative_envelope_attempt_status:
      directIntervalDerivativeEnvelopeAttempt.status,
    theta_localized_taylor_subdivision_count:
      thetaLocalizedTaylorSubdivisions,
    theta_localized_taylor_tile_count: tileRows.length,
    theta_localized_taylor_grid_step: thetaStepIndex,
    theta_second_partial_bound_source:
      "sampled-fifth-jet-curvature-gradient-transport",
    speed_second_partial_bound_source:
      "sampled-fifth-jet-curvature-gradient-transport",
    theta_second_partial_bound: formatSmallNumber(thetaSecondPartialBound),
    speed_second_partial_bound: formatSmallNumber(speedSecondPartialBound),
    theta_tile_width: formatSmallNumber(tileThetaWidth),
    speed_ratio_tile_width: formatSmallNumber(speedWidth),
    theta_component_remainder: formatSmallNumber(thetaComponentRemainder),
    speed_component_remainder: formatSmallNumber(speedComponentRemainder),
    sampled_taylor_remainder: formatSmallNumber(sampledTaylorRemainder),
    vertex_max_derivative: formatSmallNumber(vertex),
    allowed_upper_bound: formatSmallNumber(allowedUpperBound),
    required_overshoot_bound_less_than: formatSmallNumber(requiredOvershoot),
    sampled_theta_localized_taylor_upper_bound:
      formatSmallNumber(maxTileUpperBound),
    sampled_theta_localized_taylor_upper_bound_headroom:
      formatSmallNumber(minTileHeadroom),
    sampled_theta_localized_taylor_upper_bound_overrun:
      formatSmallNumber(maxTileUpperBoundOverrun),
    maximum_theta_localized_taylor_vertex_excess_over_parent:
      formatSmallNumber(maxTileVertexExcessOverParent),
    sampled_theta_localized_taylor_remainder_ratio_to_required_bound:
      formatSmallNumber(maxTileRatio),
    direct_interval_remainder_ratio_to_required_bound:
      formatSmallNumber(directIntervalRatio),
    direct_to_sampled_taylor_remainder_ratio_reduction_factor:
      formatSmallNumber(directToSampledTaylorReductionFactor),
    bottleneck_tile:
      bottleneckTile === null
        ? null
        : {
            tile_index: bottleneckTile.tile_index,
            theta_grid_index_interval:
              bottleneckTile.theta_grid_index_interval,
            speed_ratio_grid_index_interval:
              bottleneckTile.speed_ratio_grid_index_interval,
            sampled_taylor_remainder_ratio_to_required_bound:
              formatSmallNumber(
                bottleneckTile.sampled_taylor_remainder_ratio_to_required_bound
              ),
            sampled_taylor_upper_bound_headroom:
              formatSmallNumber(
                bottleneckTile.sampled_taylor_upper_bound_headroom
              ),
          },
    tile_rows: tileRows,
    theorem_implication:
      "This sampled theta-localized Taylor upper-envelope witness tests U_T=m_T+(h_theta,T^2/8)M_theta_theta^(5)+(h_nu^2/8)M_nu_nu^(5) on each theta tile against the finite peak budget. It gives a concrete closure path for the interval backend, but it is not a directed-rounded Taylor proof or interval derivative enclosure.",
    status: passed
      ? SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_STATUS
      : SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS,
  };
}

function buildDirectedRoundedThetaLocalizedTaylorIntervalizationAttempt({
  fineRows,
  fineCount,
  thetaStart,
  speedStart,
  speedEnd,
  coarseStep,
  thetaWidth,
  speedWidth,
  thetaLocalizedTaylorSubdivisions,
  vertexMaxDerivative,
  overshootCeiling,
  directedRoundedSourceRootIntervalCertificate,
  directIntervalDerivativeEnvelopeAttempt,
  sampledThetaLocalizedTaylorUpperEnvelopeWitness,
  vertexDerivativeIntervalCache = null,
}) {
  const thetaStepIndex = coarseStep / thetaLocalizedTaylorSubdivisions;
  if (!Number.isInteger(thetaStepIndex) || thetaStepIndex < 1) {
    throw new Error(
      "thetaLocalizedTaylorSubdivisions must divide refinementSamplesPerSubcellAxis - 1"
    );
  }

  const vertex = Number(vertexMaxDerivative);
  const requiredOvershoot = Number(overshootCeiling);
  const allowedUpperBound = vertex + requiredOvershoot;
  const tileThetaWidth = thetaWidth / thetaLocalizedTaylorSubdivisions;
  const thetaScale = (tileThetaWidth * tileThetaWidth) / 8;
  const speedScale = (speedWidth * speedWidth) / 8;
  const tileRows = [];
  let maxTileRatio = -Infinity;
  let minTileHeadroom = Infinity;
  let maxTileOverrun = 0;
  let maxTileUpperBound = -Infinity;
  let maxThetaSecondPartialBound = 0;
  let maxSpeedSecondPartialBound = 0;
  let maxIntervalTaylorMinusSampledTaylorUpperBound = -Infinity;
  let allIntervalJetCurvatureBoundsFinite = true;
  let allRootContractionsPassed = true;
  let allFDeltaSignsMatchExpected = true;
  let nonfiniteTileCount = 0;
  let bottleneckTile = null;

  for (
    let tileIndex = 0;
    tileIndex < thetaLocalizedTaylorSubdivisions;
    tileIndex += 1
  ) {
    const tileThetaStartIndex = thetaStart + tileIndex * thetaStepIndex;
    const tileThetaEndIndex = tileThetaStartIndex + thetaStepIndex;
    const tileVertexRows = [
      rowAt(fineRows, fineCount, tileThetaStartIndex, speedStart),
      rowAt(fineRows, fineCount, tileThetaStartIndex, speedEnd),
      rowAt(fineRows, fineCount, tileThetaEndIndex, speedStart),
      rowAt(fineRows, fineCount, tileThetaEndIndex, speedEnd),
    ];
    const thetaInterval = [
      tileVertexRows[0].theta,
      tileVertexRows[2].theta,
    ];
    const speedRatioInterval = [
      tileVertexRows[0].speed_ratio,
      tileVertexRows[1].speed_ratio,
    ];
    const sampledTileVertexMaxDerivative = Math.max(
      ...tileVertexRows.map((row) => row.derivative)
    );
    let directedRoundedVertexDerivativeUpperBound = -Infinity;
    let allVertexRootContractionsPassed = true;
    let allVertexFDeltaSignsMatchExpected = true;
    let allVertexDerivativeIntervalsFinite = true;
    const vertexDerivativeRows = tileVertexRows.map((vertexRow) => {
      const cacheKey = `${vertexRow.theta_index},${vertexRow.speed_index}`;
      let vertexDerivative = vertexDerivativeIntervalCache?.get(cacheKey);
      if (vertexDerivative === undefined) {
        const derivative =
          buildCrossBinaryDerivativeIntervalFromCertifiedRootTubes({
            thetaInterval: [vertexRow.theta, vertexRow.theta],
            speedRatioInterval: [
              vertexRow.speed_ratio,
              vertexRow.speed_ratio,
            ],
            directedRoundedSourceRootIntervalCertificate,
          });
        const derivativeInterval = derivative.derivative_interval;
        vertexDerivative = {
          derivative_interval: derivativeInterval,
          derivative_upper_bound: derivativeInterval[1],
          all_root_sheet_contractions_passed:
            derivative.all_root_sheet_contractions_passed,
          all_F_delta_signs_match_expected:
            derivative.all_F_delta_signs_match_expected,
          total_root_sheet_contraction_count:
            derivative.total_root_sheet_contraction_count,
          source_derivative_interval_evaluation_count:
            derivative.source_derivative_interval_evaluation_count,
        };
        vertexDerivativeIntervalCache?.set(cacheKey, vertexDerivative);
      }
      const derivativeInterval = vertexDerivative.derivative_interval;
      const derivativeUpperBound = vertexDerivative.derivative_upper_bound;

      directedRoundedVertexDerivativeUpperBound = Math.max(
        directedRoundedVertexDerivativeUpperBound,
        derivativeUpperBound
      );
      allVertexRootContractionsPassed =
        allVertexRootContractionsPassed &&
        vertexDerivative.all_root_sheet_contractions_passed;
      allVertexFDeltaSignsMatchExpected =
        allVertexFDeltaSignsMatchExpected &&
        vertexDerivative.all_F_delta_signs_match_expected;
      allVertexDerivativeIntervalsFinite =
        allVertexDerivativeIntervalsFinite &&
        Number.isFinite(derivativeInterval[0]) &&
        Number.isFinite(derivativeInterval[1]);

      return {
        theta: formatSmallNumber(vertexRow.theta),
        speed_ratio: formatSmallNumber(vertexRow.speed_ratio),
        sampled_derivative: formatSmallNumber(vertexRow.derivative),
        directed_rounded_derivative_interval:
          formatInterval(derivativeInterval),
        directed_rounded_derivative_upper_bound:
          formatSmallNumber(derivativeUpperBound),
        vertex_interval_minus_sampled_derivative: formatSmallNumber(
          derivativeUpperBound - vertexRow.derivative
        ),
        all_interval_root_sheet_contractions_passed:
          vertexDerivative.all_root_sheet_contractions_passed,
        all_interval_F_delta_signs_match_expected:
          vertexDerivative.all_F_delta_signs_match_expected,
        total_interval_root_sheet_contraction_count:
          vertexDerivative.total_root_sheet_contraction_count,
        source_derivative_interval_evaluation_count:
          vertexDerivative.source_derivative_interval_evaluation_count,
      };
    });
    const precontractedTile =
      directIntervalDerivativeEnvelopeAttempt
        .localized_root_sheet_contraction_tiles?.find(
          (tile) =>
            tile.theta_localization_index === tileIndex &&
            tile.speed_ratio_localization_index === 0 &&
            directIntervalDerivativeEnvelopeAttempt
              .theta_localization_subdivision_count ===
              thetaLocalizedTaylorSubdivisions &&
            directIntervalDerivativeEnvelopeAttempt
              .speed_ratio_localization_subdivision_count === 1
        ) ?? null;
    const intervalJet =
      precontractedTile === null
        ? buildCrossBinaryIntervalJetFromCertifiedRootTubes({
            thetaInterval,
            speedRatioInterval,
            directedRoundedSourceRootIntervalCertificate,
          })
        : buildCrossBinaryIntervalJetFromPrecontractedRootSheets({
            thetaInterval,
            speedRatioInterval,
            rootSheetRows: precontractedTile.root_sheet_rows,
          });
    const crossBinaryJet = intervalJet.cross_binary_interval_jet;
    const thetaSecondPartialInterval = intervalJetDerivative(
      crossBinaryJet,
      3,
      0
    );
    const speedSecondPartialInterval = intervalJetDerivative(
      crossBinaryJet,
      1,
      2
    );
    const thetaSecondPartialBound = intervalAbsMax(thetaSecondPartialInterval);
    const speedSecondPartialBound = intervalAbsMax(speedSecondPartialInterval);
    const intervalTaylorRemainder = nextUp(
      thetaScale * thetaSecondPartialBound +
        speedScale * speedSecondPartialBound
    );
    const tileUpperBound = nextUp(
      directedRoundedVertexDerivativeUpperBound + intervalTaylorRemainder
    );
    const tileHeadroom = allowedUpperBound - tileUpperBound;
    const tileOverrun = Math.max(0, -tileHeadroom);
    const tileVertexExcessOverParent = Math.max(
      0,
      directedRoundedVertexDerivativeUpperBound - vertex
    );
    const tileRatio =
      requiredOvershoot > 0
        ? (tileVertexExcessOverParent + intervalTaylorRemainder) /
          requiredOvershoot
        : Infinity;
    const sampledTileRow =
      sampledThetaLocalizedTaylorUpperEnvelopeWitness.tile_rows[tileIndex];
    const sampledTaylorUpperBound = Number(
      sampledTileRow?.sampled_taylor_upper_bound
    );
    const intervalMinusSampled =
      tileUpperBound - sampledTaylorUpperBound;
    const finiteTile =
      Number.isFinite(thetaSecondPartialBound) &&
      Number.isFinite(speedSecondPartialBound) &&
      Number.isFinite(intervalTaylorRemainder) &&
      Number.isFinite(directedRoundedVertexDerivativeUpperBound) &&
      Number.isFinite(tileUpperBound) &&
      Number.isFinite(tileHeadroom) &&
      Number.isFinite(tileRatio) &&
      allVertexDerivativeIntervalsFinite;
    const tilePassed =
      directedRoundedSourceRootIntervalCertificate.status ===
        DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
      allVertexRootContractionsPassed &&
      allVertexFDeltaSignsMatchExpected &&
      intervalJet.all_root_sheet_contractions_passed &&
      intervalJet.all_F_delta_signs_match_expected &&
      finiteTile &&
      tileHeadroom > 0;

    allIntervalJetCurvatureBoundsFinite =
      allIntervalJetCurvatureBoundsFinite && finiteTile;
    allRootContractionsPassed =
      allRootContractionsPassed &&
      allVertexRootContractionsPassed &&
      intervalJet.all_root_sheet_contractions_passed;
    allFDeltaSignsMatchExpected =
      allFDeltaSignsMatchExpected &&
      allVertexFDeltaSignsMatchExpected &&
      intervalJet.all_F_delta_signs_match_expected;
    if (!finiteTile) {
      nonfiniteTileCount += 1;
    }
    maxTileRatio = Math.max(maxTileRatio, tileRatio);
    minTileHeadroom = Math.min(minTileHeadroom, tileHeadroom);
    maxTileOverrun = Math.max(maxTileOverrun, tileOverrun);
    maxTileUpperBound = Math.max(maxTileUpperBound, tileUpperBound);
    maxThetaSecondPartialBound = Math.max(
      maxThetaSecondPartialBound,
      thetaSecondPartialBound
    );
    maxSpeedSecondPartialBound = Math.max(
      maxSpeedSecondPartialBound,
      speedSecondPartialBound
    );
    maxIntervalTaylorMinusSampledTaylorUpperBound = Math.max(
      maxIntervalTaylorMinusSampledTaylorUpperBound,
      intervalMinusSampled
    );
    if (
      bottleneckTile === null ||
      tileRatio > bottleneckTile.remainder_ratio_to_required_bound
    ) {
      bottleneckTile = {
        tile_index: tileIndex,
        theta_grid_index_interval: [tileThetaStartIndex, tileThetaEndIndex],
        speed_ratio_grid_index_interval: [speedStart, speedEnd],
        remainder_ratio_to_required_bound: tileRatio,
        upper_bound_headroom: tileHeadroom,
      };
    }

    tileRows.push({
      tile_index: tileIndex,
      theta_grid_index_interval: [tileThetaStartIndex, tileThetaEndIndex],
      speed_ratio_grid_index_interval: [speedStart, speedEnd],
      theta_interval: formatInterval(thetaInterval),
      speed_ratio_interval: formatInterval(speedRatioInterval),
      sampled_tile_vertex_max_derivative: formatSmallNumber(
        sampledTileVertexMaxDerivative
      ),
      directed_rounded_vertex_derivative_upper_bound: formatSmallNumber(
        directedRoundedVertexDerivativeUpperBound
      ),
      directed_rounded_vertex_derivative_excess_over_parent:
        formatSmallNumber(tileVertexExcessOverParent),
      vertex_derivative_rows: vertexDerivativeRows,
      theta_second_partial_interval: formatInterval(
        thetaSecondPartialInterval
      ),
      speed_second_partial_interval: formatInterval(
        speedSecondPartialInterval
      ),
      theta_second_partial_bound: formatSmallNumber(thetaSecondPartialBound),
      speed_second_partial_bound: formatSmallNumber(speedSecondPartialBound),
      directed_rounded_interval_taylor_remainder: formatSmallNumber(
        intervalTaylorRemainder
      ),
      directed_rounded_interval_taylor_upper_bound:
        formatSmallNumber(tileUpperBound),
      sampled_taylor_upper_bound: formatSmallNumber(sampledTaylorUpperBound),
      interval_taylor_minus_sampled_taylor_upper_bound: formatSmallNumber(
        intervalMinusSampled
      ),
      allowed_upper_bound: formatSmallNumber(allowedUpperBound),
      directed_rounded_interval_taylor_upper_bound_headroom:
        formatSmallNumber(tileHeadroom),
      directed_rounded_interval_taylor_upper_bound_overrun:
        formatSmallNumber(tileOverrun),
      directed_rounded_interval_taylor_remainder_ratio_to_required_bound:
        formatSmallNumber(tileRatio),
      all_interval_root_sheet_contractions_passed:
        allVertexRootContractionsPassed &&
        intervalJet.all_root_sheet_contractions_passed,
      all_interval_F_delta_signs_match_expected:
        allVertexFDeltaSignsMatchExpected &&
        intervalJet.all_F_delta_signs_match_expected,
      total_interval_root_sheet_contraction_count:
        intervalJet.total_root_sheet_contraction_count,
      maximum_interval_contracted_delta_width: formatSmallNumber(
        intervalJet.maximum_contracted_delta_width
      ),
      minimum_interval_root_sheet_width_reduction_factor: formatSmallNumber(
        intervalJet.minimum_root_sheet_width_reduction_factor
      ),
      minimum_interval_F_delta_abs_clearance: formatSmallNumber(
        intervalJet.minimum_F_delta_abs_clearance
      ),
      root_sheet_contraction_width_bottleneck:
        intervalJet.root_sheet_contraction_width_bottleneck === null
          ? null
          : {
              term_label:
                intervalJet.root_sheet_contraction_width_bottleneck.term_label,
              root_index:
                intervalJet.root_sheet_contraction_width_bottleneck.root_index,
              width: formatSmallNumber(
                intervalJet.root_sheet_contraction_width_bottleneck.width
              ),
            },
      root_sheet_contraction_reduction_bottleneck:
        intervalJet.root_sheet_contraction_reduction_bottleneck === null
          ? null
          : {
              term_label:
                intervalJet.root_sheet_contraction_reduction_bottleneck
                  .term_label,
              root_index:
                intervalJet.root_sheet_contraction_reduction_bottleneck
                  .root_index,
              factor: formatSmallNumber(
                intervalJet.root_sheet_contraction_reduction_bottleneck.factor
              ),
            },
      status: tilePassed
        ? DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS
        : DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS,
    });
  }

  const passed =
    directedRoundedSourceRootIntervalCertificate.status ===
      DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
    sampledThetaLocalizedTaylorUpperEnvelopeWitness.status ===
      SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_STATUS &&
    allIntervalJetCurvatureBoundsFinite &&
    allRootContractionsPassed &&
    allFDeltaSignsMatchExpected &&
    nonfiniteTileCount === 0 &&
    Number.isFinite(minTileHeadroom) &&
    minTileHeadroom > 0;

  return {
    attempt_type:
      "directed-rounded-theta-localized-taylor-intervalization-attempt",
    target_function: "g=f_cross_prime",
    claim_scope:
      "geometry-bridge/i1-f1/directed-rounded-theta-localized-taylor-intervalization",
    certifies_directed_rounded_taylor_upper_envelope: passed,
    certifies_interval_derivative_enclosure: false,
    certifies_interval_second_partial_curvature_enclosure: passed,
    certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
      false,
    emits_directed_rounded_interval_second_partial_curvature_bound_attempt:
      true,
    interval_rounding: "ieee-754-nextafter-outward",
    consumes_directed_rounded_source_root_interval_certificate_status:
      directedRoundedSourceRootIntervalCertificate.status,
    consumes_sampled_theta_localized_taylor_upper_envelope_witness_status:
      sampledThetaLocalizedTaylorUpperEnvelopeWitness.status,
    theta_localized_taylor_subdivision_count:
      thetaLocalizedTaylorSubdivisions,
    theta_localized_taylor_tile_count: tileRows.length,
    theta_localized_taylor_grid_step: thetaStepIndex,
    interval_taylor_formula:
      "U_T=m_T+(h_theta,T^2/8)M_theta_theta^interval+(h_nu^2/8)M_nu_nu^interval",
    theta_second_partial_bound_source:
      "directed-rounded interval root-sheet jet for partial_theta_theta g",
    speed_second_partial_bound_source:
      "directed-rounded interval root-sheet jet for partial_nu_nu g",
    theta_tile_width: formatSmallNumber(tileThetaWidth),
    speed_ratio_tile_width: formatSmallNumber(speedWidth),
    theta_second_partial_coefficient: formatSmallNumber(thetaScale),
    speed_second_partial_coefficient: formatSmallNumber(speedScale),
    maximum_theta_second_partial_interval_bound: formatSmallNumber(
      maxThetaSecondPartialBound
    ),
    maximum_speed_second_partial_interval_bound: formatSmallNumber(
      maxSpeedSecondPartialBound
    ),
    vertex_max_derivative: formatSmallNumber(vertex),
    allowed_upper_bound: formatSmallNumber(allowedUpperBound),
    required_overshoot_bound_less_than: formatSmallNumber(requiredOvershoot),
    directed_rounded_interval_taylor_upper_bound:
      formatSmallNumber(maxTileUpperBound),
    directed_rounded_interval_taylor_upper_bound_headroom:
      formatSmallNumber(minTileHeadroom),
    directed_rounded_interval_taylor_upper_bound_overrun:
      formatSmallNumber(maxTileOverrun),
    directed_rounded_interval_taylor_remainder_ratio_to_required_bound:
      formatSmallNumber(maxTileRatio),
    maximum_interval_taylor_minus_sampled_taylor_upper_bound:
      formatSmallNumber(maxIntervalTaylorMinusSampledTaylorUpperBound),
    nonfinite_interval_taylor_tile_count: nonfiniteTileCount,
    all_interval_jet_curvature_bounds_finite:
      allIntervalJetCurvatureBoundsFinite,
    all_interval_root_sheet_contractions_passed: allRootContractionsPassed,
    all_interval_F_delta_signs_match_expected: allFDeltaSignsMatchExpected,
    bottleneck_tile:
      bottleneckTile === null
        ? null
        : {
            tile_index: bottleneckTile.tile_index,
            theta_grid_index_interval:
              bottleneckTile.theta_grid_index_interval,
            speed_ratio_grid_index_interval:
              bottleneckTile.speed_ratio_grid_index_interval,
            directed_rounded_interval_taylor_remainder_ratio_to_required_bound:
              formatSmallNumber(
                bottleneckTile.remainder_ratio_to_required_bound
              ),
            directed_rounded_interval_taylor_upper_bound_headroom:
              formatSmallNumber(bottleneckTile.upper_bound_headroom),
          },
    tile_rows: tileRows,
    theorem_implication: passed
      ? "The directed-rounded interval root-sheet jet bounds the theta-localized Taylor remainder below every finite tile budget on this subcell."
      : "The directed-rounded interval root-sheet jet emits tilewise interval Taylor bounds, but at least one tile is non-finite or above the finite peak budget; the row remains an obstruction map rather than directed-rounded Taylor closure.",
    status: passed
      ? DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS
      : DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS,
  };
}

function uniqueSortedStrings(values) {
  return [...new Set(values)].sort();
}

function minFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.min(...finiteValues) : null;
}

function sourceRootDomainMax(speedRatio) {
  return (
    2 * speedRatio +
    SOURCE_ROOT_DOMAIN_RELATIVE_PADDING * Math.max(1, speedRatio)
  );
}

function buildSampledRootTubeRegularityProbe(refinedRows) {
  const rootCountSignatures = uniqueSortedStrings(
    refinedRows.map((row) => row.term_root_count_signature.join(","))
  );
  const firstSheets = refinedRows[0].root_sheets;
  let minAbsFDelta = Infinity;
  let minPositiveDelta = Infinity;
  let minTubeSeparation = Infinity;
  let maxBranchDeltaWidth = 0;
  let allFDeltaSignsPreserved = true;
  const termRows = firstSheets.map((firstTerm, termIndex) => {
    const termSamples = refinedRows.map((row) => row.root_sheets[termIndex]);
    const rootCountSet = uniqueSortedStrings(
      termSamples.map((term) => String(term.root_count))
    );
    const branchRows = [];
    for (let rootIndex = 0; rootIndex < firstTerm.root_count; rootIndex += 1) {
      const rootSamples = termSamples.map((term) => term.roots[rootIndex]);
      const deltas = rootSamples.map((root) => root.delta);
      const fDeltas = rootSamples.map((root) => root.F_delta);
      const fDeltaSigns = uniqueSortedStrings(
        rootSamples.map((root) => root.F_delta_sign)
      );
      const deltaMin = Math.min(...deltas);
      const deltaMax = Math.max(...deltas);
      const branchDeltaWidth = deltaMax - deltaMin;
      const branchMinAbsFDelta = Math.min(
        ...fDeltas.map((value) => Math.abs(value))
      );
      const branchMinPositiveDelta = Math.min(...deltas);
      allFDeltaSignsPreserved =
        allFDeltaSignsPreserved && fDeltaSigns.length === 1;
      minAbsFDelta = Math.min(minAbsFDelta, branchMinAbsFDelta);
      minPositiveDelta = Math.min(minPositiveDelta, branchMinPositiveDelta);
      maxBranchDeltaWidth = Math.max(maxBranchDeltaWidth, branchDeltaWidth);
      branchRows.push({
        root_index: rootIndex,
        delta_min: formatSmallNumber(deltaMin),
        delta_max: formatSmallNumber(deltaMax),
        delta_sample_width: formatSmallNumber(branchDeltaWidth),
        F_delta_signs: fDeltaSigns,
        F_delta_sign_preserved: fDeltaSigns.length === 1,
        min_abs_F_delta: formatSmallNumber(branchMinAbsFDelta),
        min_positive_delta: formatSmallNumber(branchMinPositiveDelta),
      });
    }
    const adjacentSeparations = [];
    for (let index = 0; index < branchRows.length - 1; index += 1) {
      adjacentSeparations.push(
        Number(branchRows[index + 1].delta_min) -
          Number(branchRows[index].delta_max)
      );
    }
    const termMinTubeSeparation = minFinite(adjacentSeparations);
    if (termMinTubeSeparation !== null) {
      minTubeSeparation = Math.min(minTubeSeparation, termMinTubeSeparation);
    }
    return {
      term_label: firstTerm.term_label,
      kappa: firstTerm.kappa,
      sigma: firstTerm.sigma,
      root_counts: rootCountSet.map(Number),
      root_count_preserved: rootCountSet.length === 1,
      F_delta_sign_signature: branchRows
        .map((branch) => branch.F_delta_signs.join(""))
        .join(","),
      min_sampled_root_tube_separation:
        termMinTubeSeparation === null ? null : formatSmallNumber(termMinTubeSeparation),
      branches: branchRows,
    };
  });
  const minSeparation =
    minTubeSeparation === Infinity ? null : minTubeSeparation;
  const rootCountSignaturePreserved =
    rootCountSignatures.length === 1 &&
    rootCountSignatures[0] === EXPECTED_TERM_SIGNATURE;
  const sampledTubeRegularityPassed =
    rootCountSignaturePreserved &&
    allFDeltaSignsPreserved &&
    minAbsFDelta > 0 &&
    minPositiveDelta > 0 &&
    (minSeparation === null || minSeparation > 0);

  return {
    probe_type: "sampled-root-tube-regularity-budget",
    certifies_interval_root_isolation: false,
    certifies_interval_root_tube_isolation: false,
    certifies_interval_root_sheet_continuation: false,
    certifies_interval_F_delta_lower_bound: false,
    root_count_signatures: rootCountSignatures,
    root_count_signature_preserved: rootCountSignaturePreserved,
    all_F_delta_signs_preserved: allFDeltaSignsPreserved,
    minimum_sampled_abs_F_delta: formatSmallNumber(minAbsFDelta),
    minimum_sampled_positive_delta: formatSmallNumber(minPositiveDelta),
    minimum_sampled_root_tube_separation:
      minSeparation === null ? null : formatSmallNumber(minSeparation),
    maximum_sampled_branch_delta_width: formatSmallNumber(maxBranchDeltaWidth),
    term_root_tube_rows: termRows,
    status: sampledTubeRegularityPassed
      ? "sampled-root-tube-regularity-feasibility-passed"
      : "sampled-root-tube-regularity-feasibility-open",
  };
}

function buildFiniteIntervalRootTubeCertificateTarget({
  sampledRootTubeRegularityProbe,
  speedRatioInterval,
}) {
  const deltaDomain = [
    SOURCE_ROOT_DOMAIN_MIN,
    sourceRootDomainMax(Number(speedRatioInterval[1])),
  ];
  let minimumTubePaddingRadius = Infinity;
  let minimumComplementSlabWidth = Infinity;
  let retainedTubeCount = 0;
  let complementSlabCount = 0;

  const termTargetRows =
    sampledRootTubeRegularityProbe.term_root_tube_rows.map((termRow) => {
      const sampledBranches = termRow.branches.map((branch) => ({
        root_index: branch.root_index,
        delta_min: Number(branch.delta_min),
        delta_max: Number(branch.delta_max),
        F_delta_sign:
          branch.F_delta_signs.length === 1 ? branch.F_delta_signs[0] : "mixed",
        min_abs_F_delta: Number(branch.min_abs_F_delta),
      }));
      const protectedTubes = sampledBranches.map((branch, index) => {
        const leftBoundary =
          index === 0 ? deltaDomain[0] : sampledBranches[index - 1].delta_max;
        const rightBoundary =
          index === sampledBranches.length - 1
            ? deltaDomain[1]
            : sampledBranches[index + 1].delta_min;
        const leftGap = branch.delta_min - leftBoundary;
        const rightGap = rightBoundary - branch.delta_max;
        const tubePaddingRadius = 0.25 * Math.min(leftGap, rightGap);
        const protectedInterval = [
          branch.delta_min - tubePaddingRadius,
          branch.delta_max + tubePaddingRadius,
        ];

        minimumTubePaddingRadius = Math.min(
          minimumTubePaddingRadius,
          tubePaddingRadius
        );
        retainedTubeCount += 1;

        return {
          root_index: branch.root_index,
          sampled_delta_interval: [
            formatSmallNumber(branch.delta_min),
            formatSmallNumber(branch.delta_max),
          ],
          protected_delta_interval: protectedInterval.map(formatSmallNumber),
          tube_padding_radius: formatSmallNumber(tubePaddingRadius),
          sampled_F_delta_sign: branch.F_delta_sign,
          sampled_min_abs_F_delta: formatSmallNumber(branch.min_abs_F_delta),
          interval_obligations: {
            endpoint_sign_change:
              "prove F(P,delta_r^-) and F(P,delta_r^+) have opposite interval signs",
            fixed_F_delta_sign:
              "prove F_delta(P,D_r) has the sampled sign with abs(F_delta)>=lambda_r>0",
            retained_sheet:
              "then D_r contains exactly one C^1 implicit root sheet over P",
          },
        };
      });
      const complementSlabs = [];
      let leftCursor = deltaDomain[0];
      for (const tube of protectedTubes) {
        const tubeLeft = Number(tube.protected_delta_interval[0]);
        const tubeRight = Number(tube.protected_delta_interval[1]);
        if (tubeLeft > leftCursor) {
          const width = tubeLeft - leftCursor;
          minimumComplementSlabWidth = Math.min(
            minimumComplementSlabWidth,
            width
          );
          complementSlabs.push({
            complement_index: complementSlabs.length,
            delta_interval: [
              formatSmallNumber(leftCursor),
              formatSmallNumber(tubeLeft),
            ],
            width: formatSmallNumber(width),
            interval_obligation:
              "prove 0 notin F(P,K_l), so no source root lies in this complement slab",
          });
        }
        leftCursor = tubeRight;
      }
      if (deltaDomain[1] > leftCursor) {
        const width = deltaDomain[1] - leftCursor;
        minimumComplementSlabWidth = Math.min(
          minimumComplementSlabWidth,
          width
        );
        complementSlabs.push({
          complement_index: complementSlabs.length,
          delta_interval: [
            formatSmallNumber(leftCursor),
            formatSmallNumber(deltaDomain[1]),
          ],
          width: formatSmallNumber(width),
          interval_obligation:
            "prove 0 notin F(P,K_l), so no source root lies in this complement slab",
        });
      }
      complementSlabCount += complementSlabs.length;

      return {
        term_label: termRow.term_label,
        kappa: termRow.kappa,
        sigma: termRow.sigma,
        source_delta_domain: deltaDomain.map(formatSmallNumber),
        retained_tube_count: protectedTubes.length,
        complement_slab_count: complementSlabs.length,
        protected_tubes: protectedTubes,
        complement_slabs: complementSlabs,
      };
    });
  const finiteRootTubeTargetPassed =
    sampledRootTubeRegularityProbe.status ===
      "sampled-root-tube-regularity-feasibility-passed" &&
    minimumTubePaddingRadius > 0 &&
    minimumComplementSlabWidth > 0;

  return {
    target_type: "finite-interval-root-tube-certificate-target",
    certifies_interval_root_tube_isolation: false,
    certifies_interval_root_sheet_continuation: false,
    certifies_interval_F_delta_lower_bound: false,
    source_delta_domain: deltaDomain.map(formatSmallNumber),
    retained_tube_count: retainedTubeCount,
    complement_slab_count: complementSlabCount,
    minimum_tube_padding_radius: formatSmallNumber(minimumTubePaddingRadius),
    minimum_complement_slab_width: formatSmallNumber(
      minimumComplementSlabWidth
    ),
    interval_implication:
      "If every protected tube has endpoint interval sign change and fixed-sign F_delta floor, and every complement slab excludes zero, then the sampled root signature lifts to an interval root-tube isolation and C^1 root-sheet continuation proof.",
    term_target_rows: termTargetRows,
    status: finiteRootTubeTargetPassed
      ? "finite-interval-root-tube-certificate-target-emitted"
      : "finite-interval-root-tube-certificate-target-open",
  };
}

function interpolateInterval([left, right], coordinate) {
  return left + (right - left) * coordinate;
}

function buildRootTubeParameterSamples({ thetaInterval, speedRatioInterval }) {
  const samples = [];
  for (const thetaCoordinate of ROOT_TUBE_PARAMETER_GRID_COORDINATES) {
    for (const speedCoordinate of ROOT_TUBE_PARAMETER_GRID_COORDINATES) {
      samples.push({
        theta: interpolateInterval(thetaInterval, thetaCoordinate),
        speed_ratio: interpolateInterval(speedRatioInterval, speedCoordinate),
      });
    }
  }
  return samples;
}

function buildDeltaSamples([left, right], count) {
  if (count === 1) {
    return [0.5 * (left + right)];
  }
  return Array.from({ length: count }, (_unused, index) =>
    interpolateInterval([left, right], index / (count - 1))
  );
}

const NEXT_FLOAT_BUFFER = new ArrayBuffer(8);
const NEXT_FLOAT_VIEW = new DataView(NEXT_FLOAT_BUFFER);

function nextUp(value) {
  if (Number.isNaN(value) || value === Infinity) {
    return value;
  }
  if (value === 0) {
    return Number.MIN_VALUE;
  }
  NEXT_FLOAT_VIEW.setFloat64(0, value, false);
  let bits = NEXT_FLOAT_VIEW.getBigUint64(0, false);
  bits += value > 0 ? 1n : -1n;
  NEXT_FLOAT_VIEW.setBigUint64(0, bits, false);
  return NEXT_FLOAT_VIEW.getFloat64(0, false);
}

function nextDown(value) {
  if (Number.isNaN(value) || value === -Infinity) {
    return value;
  }
  if (value === 0) {
    return -Number.MIN_VALUE;
  }
  NEXT_FLOAT_VIEW.setFloat64(0, value, false);
  let bits = NEXT_FLOAT_VIEW.getBigUint64(0, false);
  bits += value > 0 ? -1n : 1n;
  NEXT_FLOAT_VIEW.setBigUint64(0, bits, false);
  return NEXT_FLOAT_VIEW.getFloat64(0, false);
}

function outwardInterval([left, right]) {
  return [nextDown(left), nextUp(right)];
}

function offsetInterval([left, right], offset) {
  return [nextDown(left + offset), nextUp(right + offset)];
}

function scaleInterval([left, right], scale) {
  return scale >= 0
    ? [nextDown(scale * left), nextUp(scale * right)]
    : [nextDown(scale * right), nextUp(scale * left)];
}

function addIntervals(...intervals) {
  let sumLeft = 0;
  let sumRight = 0;
  for (const [left, right] of intervals) {
    sumLeft = nextDown(sumLeft + left);
    sumRight = nextUp(sumRight + right);
  }
  return [sumLeft, sumRight];
}

function multiplyTwoIntervals([leftA, rightA], [leftB, rightB]) {
  const products = [
    leftA * leftB,
    leftA * rightB,
    rightA * leftB,
    rightA * rightB,
  ];
  return outwardInterval([Math.min(...products), Math.max(...products)]);
}

function multiplyIntervals(firstInterval, ...remainingIntervals) {
  return remainingIntervals.reduce(
    (productInterval, interval) => multiplyTwoIntervals(productInterval, interval),
    firstInterval
  );
}

function reciprocalInterval([left, right]) {
  if (left <= 0 && right >= 0) {
    return [-Infinity, Infinity];
  }
  const reciprocals = [1 / left, 1 / right];
  return outwardInterval([
    Math.min(...reciprocals),
    Math.max(...reciprocals),
  ]);
}

function divideIntervals(numeratorInterval, denominatorInterval) {
  return multiplyIntervals(numeratorInterval, reciprocalInterval(denominatorInterval));
}

function hullIntervals(...intervals) {
  return outwardInterval([
    Math.min(...intervals.map((interval) => interval[0])),
    Math.max(...intervals.map((interval) => interval[1])),
  ]);
}

function intervalWidth([left, right]) {
  return right - left;
}

function negateInterval([left, right]) {
  return [-right, -left];
}

function padInterval([left, right], padding) {
  return [nextDown(left - padding), nextUp(right + padding)];
}

function containsCriticalPoint({ left, right, offset }) {
  if (right - left >= TWO_PI) {
    return true;
  }
  const minIndex = Math.ceil((left - offset) / TWO_PI);
  const maxIndex = Math.floor((right - offset) / TWO_PI);
  return minIndex <= maxIndex;
}

function sinInterval([left, right]) {
  if (right - left >= TWO_PI) {
    return [-1, 1];
  }
  let lower = Math.min(Math.sin(left), Math.sin(right));
  let upper = Math.max(Math.sin(left), Math.sin(right));
  if (containsCriticalPoint({ left, right, offset: Math.PI / 2 })) {
    upper = 1;
  }
  if (containsCriticalPoint({ left, right, offset: -Math.PI / 2 })) {
    lower = -1;
  }
  return outwardInterval([lower, upper]);
}

function cosInterval([left, right]) {
  if (right - left >= TWO_PI) {
    return [-1, 1];
  }
  let lower = Math.min(Math.cos(left), Math.cos(right));
  let upper = Math.max(Math.cos(left), Math.cos(right));
  if (containsCriticalPoint({ left, right, offset: 0 })) {
    upper = 1;
  }
  if (containsCriticalPoint({ left, right, offset: Math.PI })) {
    lower = -1;
  }
  return outwardInterval([lower, upper]);
}

function sourceThetaTildeIntervalForTerm({ thetaInterval, termLabel }) {
  return termLabel.includes("u+Q")
    ? offsetInterval(thetaInterval, QUARTER_PERIOD)
    : thetaInterval;
}

function sourcePhiInterval({ thetaTildeInterval, deltaInterval }) {
  return [
    nextDown(2 * thetaTildeInterval[0] - deltaInterval[1]),
    nextUp(2 * thetaTildeInterval[1] - deltaInterval[0]),
  ];
}

function deltaSquaredOverSpeedSquaredInterval({
  deltaInterval,
  speedRatioInterval,
}) {
  return [
    nextDown(
      (deltaInterval[0] * deltaInterval[0]) /
        (speedRatioInterval[1] * speedRatioInterval[1])
    ),
    nextUp(
      (deltaInterval[1] * deltaInterval[1]) /
        (speedRatioInterval[0] * speedRatioInterval[0])
    ),
  ];
}

function twoDeltaOverSpeedSquaredInterval({
  deltaInterval,
  speedRatioInterval,
}) {
  return [
    nextDown(
      (2 * deltaInterval[0]) /
        (speedRatioInterval[1] * speedRatioInterval[1])
    ),
    nextUp(
      (2 * deltaInterval[1]) /
        (speedRatioInterval[0] * speedRatioInterval[0])
    ),
  ];
}

function twoOverSpeedSquaredInterval({ speedRatioInterval }) {
  return [
    nextDown(2 / (speedRatioInterval[1] * speedRatioInterval[1])),
    nextUp(2 / (speedRatioInterval[0] * speedRatioInterval[0])),
  ];
}

function positivePowerInterval(interval, exponent) {
  let product = [1, 1];
  for (let index = 0; index < exponent; index += 1) {
    product = multiplyIntervals(product, interval);
  }
  return product;
}

function sourceRootEquationInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
  padding,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return padInterval(
    addIntervals(
      deltaSquaredOverSpeedSquaredInterval({
        deltaInterval,
        speedRatioInterval,
      }),
      [-2, -2],
      sinInterval(phiInterval),
      scaleInterval(sinInterval(deltaInterval), kappa)
    ),
    padding
  );
}

function sourceRootDeltaDerivativeInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
  padding,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return padInterval(
    addIntervals(
      twoDeltaOverSpeedSquaredInterval({
        deltaInterval,
        speedRatioInterval,
      }),
      negateInterval(cosInterval(phiInterval)),
      scaleInterval(cosInterval(deltaInterval), kappa)
    ),
    padding
  );
}

function intervalSignAndClearance([left, right]) {
  if (left > 0) {
    return { sign: "+", clearance: left };
  }
  if (right < 0) {
    return { sign: "-", clearance: -right };
  }
  return { sign: "mixed", clearance: 0 };
}

function subdivisionInterval({ interval, index, subdivisionCount }) {
  return subintervalForIndex({
    left: interval[0],
    right: interval[1],
    index,
    subcellCount: subdivisionCount,
  });
}

function summarizeIntervalSubdivisions({
  interval,
  subdivisionCount,
  intervalBuilder,
  expectedSign = null,
}) {
  let minimumClearance = Infinity;
  let bottleneckSubdivisionIndex = null;
  let bottleneckInterval = null;
  const signs = [];

  for (let index = 0; index < subdivisionCount; index += 1) {
    const subinterval = subdivisionInterval({
      interval,
      index,
      subdivisionCount,
    });
    const enclosure = intervalBuilder(subinterval);
    const signInfo = intervalSignAndClearance(enclosure);
    signs.push(signInfo.sign);
    if (signInfo.clearance < minimumClearance) {
      minimumClearance = signInfo.clearance;
      bottleneckSubdivisionIndex = index;
      bottleneckInterval = subinterval;
    }
  }

  const uniqueSigns = uniqueSortedStrings(signs);
  const signDefinite = uniqueSigns.length === 1 && uniqueSigns[0] !== "mixed";
  const matchesExpectedSign =
    expectedSign === null
      ? signDefinite
      : signDefinite && uniqueSigns[0] === expectedSign;

  return {
    subdivision_count: subdivisionCount,
    signs: uniqueSigns,
    sign_definite: signDefinite,
    matches_expected_sign: matchesExpectedSign,
    minimum_clearance: formatSmallNumber(minimumClearance),
    bottleneck_subdivision_index: bottleneckSubdivisionIndex,
    bottleneck_delta_interval: bottleneckInterval?.map(formatSmallNumber) ?? null,
  };
}

function buildSampledFiniteRootTubeSignMarginCertificate({
  finiteIntervalRootTubeCertificateTarget,
  thetaInterval,
  speedRatioInterval,
}) {
  const parameterSamples = buildRootTubeParameterSamples({
    thetaInterval,
    speedRatioInterval,
  });
  let totalTubeEndpointSignPairSamples = 0;
  let totalTubeEndpointFSamples = 0;
  let totalTubeFDeltaSamples = 0;
  let totalComplementFSamples = 0;
  let minimumTubeEndpointAbsF = Infinity;
  let minimumTubeEndpointSignProductMargin = Infinity;
  let minimumTubeFDeltaAbs = Infinity;
  let minimumComplementAbsF = Infinity;
  let tubeEndpointBottleneck = null;
  let tubeEndpointProductBottleneck = null;
  let tubeFDeltaBottleneck = null;
  let complementBottleneck = null;
  let allEndpointSignsOpposite = true;
  let allTubeFDeltaSignsMatch = true;
  let allComplementSignsNonzero = true;
  let allComplementSignsStable = true;

  const termCertificateRows =
    finiteIntervalRootTubeCertificateTarget.term_target_rows.map((termRow) => {
      const tubeRows = termRow.protected_tubes.map((tube) => {
        const protectedInterval = tube.protected_delta_interval.map(Number);
        let minEndpointAbsF = Infinity;
        let minEndpointSignProductMargin = Infinity;
        let minTubeFDeltaAbs = Infinity;
        let endpointSignsOpposite = true;
        let tubeFDeltaSignsMatch = true;
        const endpointSignPairs = [];
        const tubeFDeltaSigns = [];

        for (const parameter of parameterSamples) {
          const thetaTilde = sourceThetaTildeForTerm({
            theta: parameter.theta,
            termLabel: termRow.term_label,
          });
          const leftF = sourceRootEquation({
            speedRatio: parameter.speed_ratio,
            kappa: termRow.kappa,
            thetaTilde,
            delta: protectedInterval[0],
          });
          const rightF = sourceRootEquation({
            speedRatio: parameter.speed_ratio,
            kappa: termRow.kappa,
            thetaTilde,
            delta: protectedInterval[1],
          });
          const leftSign = signLabel(leftF);
          const rightSign = signLabel(rightF);
          const endpointAbsF = Math.min(Math.abs(leftF), Math.abs(rightF));
          const endpointSignProductMargin = -(leftF * rightF);

          totalTubeEndpointSignPairSamples += 1;
          totalTubeEndpointFSamples += 2;
          endpointSignsOpposite =
            endpointSignsOpposite && leftF * rightF < 0;
          minEndpointAbsF = Math.min(minEndpointAbsF, endpointAbsF);
          minEndpointSignProductMargin = Math.min(
            minEndpointSignProductMargin,
            endpointSignProductMargin
          );
          minimumTubeEndpointAbsF = Math.min(
            minimumTubeEndpointAbsF,
            endpointAbsF
          );
          minimumTubeEndpointSignProductMargin = Math.min(
            minimumTubeEndpointSignProductMargin,
            endpointSignProductMargin
          );
          endpointSignPairs.push(`${leftSign}${rightSign}`);
          if (
            tubeEndpointBottleneck === null ||
            endpointAbsF < tubeEndpointBottleneck.margin
          ) {
            tubeEndpointBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              margin: endpointAbsF,
            };
          }
          if (
            tubeEndpointProductBottleneck === null ||
            endpointSignProductMargin < tubeEndpointProductBottleneck.margin
          ) {
            tubeEndpointProductBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              margin: endpointSignProductMargin,
            };
          }

          for (const delta of buildDeltaSamples(
            protectedInterval,
            ROOT_TUBE_F_DELTA_COORDINATES.length
          )) {
            const FDelta = sourceRootDeltaDerivative({
              speedRatio: parameter.speed_ratio,
              kappa: termRow.kappa,
              thetaTilde,
              delta,
            });
            const FDeltaSign = signLabel(FDelta);
            const absFDelta = Math.abs(FDelta);
            const signMatches =
              tube.sampled_F_delta_sign !== "mixed" &&
              FDeltaSign === tube.sampled_F_delta_sign;

            totalTubeFDeltaSamples += 1;
            tubeFDeltaSignsMatch = tubeFDeltaSignsMatch && signMatches;
            minTubeFDeltaAbs = Math.min(minTubeFDeltaAbs, absFDelta);
            minimumTubeFDeltaAbs = Math.min(
              minimumTubeFDeltaAbs,
              absFDelta
            );
            tubeFDeltaSigns.push(FDeltaSign);
            if (
              tubeFDeltaBottleneck === null ||
              absFDelta < tubeFDeltaBottleneck.margin
            ) {
              tubeFDeltaBottleneck = {
                term_label: termRow.term_label,
                root_index: tube.root_index,
                margin: absFDelta,
              };
            }
          }
        }

        allEndpointSignsOpposite =
          allEndpointSignsOpposite && endpointSignsOpposite;
        allTubeFDeltaSignsMatch =
          allTubeFDeltaSignsMatch && tubeFDeltaSignsMatch;

        return {
          root_index: tube.root_index,
          protected_delta_interval: tube.protected_delta_interval,
          sampled_endpoint_sign_pairs: uniqueSortedStrings(endpointSignPairs),
          sampled_endpoint_signs_opposite: endpointSignsOpposite,
          minimum_sampled_endpoint_abs_F: formatSmallNumber(minEndpointAbsF),
          minimum_sampled_endpoint_sign_product_margin: formatSmallNumber(
            minEndpointSignProductMargin
          ),
          sampled_F_delta_signs: uniqueSortedStrings(tubeFDeltaSigns),
          sampled_F_delta_sign_matches_target: tubeFDeltaSignsMatch,
          minimum_sampled_tube_abs_F_delta:
            formatSmallNumber(minTubeFDeltaAbs),
        };
      });

      const complementRows = termRow.complement_slabs.map((slab) => {
        const deltaInterval = slab.delta_interval.map(Number);
        const deltaSamples = buildDeltaSamples(
          deltaInterval,
          COMPLEMENT_DELTA_SAMPLE_COUNT
        );
        let minComplementAbsF = Infinity;
        let complementSignsNonzero = true;
        const complementSigns = [];

        for (const parameter of parameterSamples) {
          const thetaTilde = sourceThetaTildeForTerm({
            theta: parameter.theta,
            termLabel: termRow.term_label,
          });
          for (const delta of deltaSamples) {
            const F = sourceRootEquation({
              speedRatio: parameter.speed_ratio,
              kappa: termRow.kappa,
              thetaTilde,
              delta,
            });
            const sign = signLabel(F);
            const absF = Math.abs(F);

            totalComplementFSamples += 1;
            complementSignsNonzero = complementSignsNonzero && sign !== "0";
            minComplementAbsF = Math.min(minComplementAbsF, absF);
            minimumComplementAbsF = Math.min(minimumComplementAbsF, absF);
            complementSigns.push(sign);
            if (
              complementBottleneck === null ||
              absF < complementBottleneck.margin
            ) {
              complementBottleneck = {
                term_label: termRow.term_label,
                complement_index: slab.complement_index,
                margin: absF,
              };
            }
          }
        }

        const uniqueSigns = uniqueSortedStrings(complementSigns);
        const complementSignsStable =
          complementSignsNonzero && uniqueSigns.length === 1;
        allComplementSignsNonzero =
          allComplementSignsNonzero && complementSignsNonzero;
        allComplementSignsStable =
          allComplementSignsStable && complementSignsStable;

        return {
          complement_index: slab.complement_index,
          delta_interval: slab.delta_interval,
          sampled_complement_signs: uniqueSigns,
          sampled_complement_sign_stable: complementSignsStable,
          minimum_sampled_complement_abs_F:
            formatSmallNumber(minComplementAbsF),
        };
      });

      return {
        term_label: termRow.term_label,
        kappa: termRow.kappa,
        sigma: termRow.sigma,
        protected_tube_count: tubeRows.length,
        complement_slab_count: complementRows.length,
        protected_tubes: tubeRows,
        complement_slabs: complementRows,
      };
    });

  const passed =
    finiteIntervalRootTubeCertificateTarget.status ===
      "finite-interval-root-tube-certificate-target-emitted" &&
    allEndpointSignsOpposite &&
    allTubeFDeltaSignsMatch &&
    allComplementSignsNonzero &&
    allComplementSignsStable &&
    minimumTubeEndpointAbsF > 0 &&
    minimumTubeEndpointSignProductMargin > 0 &&
    minimumTubeFDeltaAbs > 0 &&
    minimumComplementAbsF > 0;

  return {
    certificate_type: "sampled-finite-root-tube-sign-margin-certificate",
    certifies_interval_root_tube_isolation: false,
    certifies_interval_root_sheet_continuation: false,
    certifies_interval_F_delta_lower_bound: false,
    certifies_interval_complement_exclusion: false,
    parameter_sample_count: parameterSamples.length,
    tube_F_delta_samples_per_parameter: ROOT_TUBE_F_DELTA_COORDINATES.length,
    complement_delta_samples_per_slab: COMPLEMENT_DELTA_SAMPLE_COUNT,
    sampled_tube_endpoint_sign_pair_count: totalTubeEndpointSignPairSamples,
    sampled_tube_endpoint_F_sample_count: totalTubeEndpointFSamples,
    sampled_tube_F_delta_sample_count: totalTubeFDeltaSamples,
    sampled_complement_F_sample_count: totalComplementFSamples,
    all_sampled_endpoint_signs_opposite: allEndpointSignsOpposite,
    all_sampled_tube_F_delta_signs_match_target: allTubeFDeltaSignsMatch,
    all_sampled_complement_signs_nonzero: allComplementSignsNonzero,
    all_sampled_complement_signs_stable: allComplementSignsStable,
    minimum_sampled_tube_endpoint_abs_F:
      formatSmallNumber(minimumTubeEndpointAbsF),
    minimum_sampled_tube_endpoint_sign_product_margin: formatSmallNumber(
      minimumTubeEndpointSignProductMargin
    ),
    minimum_sampled_tube_abs_F_delta:
      formatSmallNumber(minimumTubeFDeltaAbs),
    minimum_sampled_complement_abs_F: formatSmallNumber(minimumComplementAbsF),
    tube_endpoint_abs_F_bottleneck: tubeEndpointBottleneck,
    tube_endpoint_sign_product_bottleneck: tubeEndpointProductBottleneck,
    tube_F_delta_bottleneck: tubeFDeltaBottleneck,
    complement_abs_F_bottleneck: complementBottleneck,
    interval_implication_boundary:
      "Sampled endpoint sign margins, sampled fixed-sign F_delta margins, and sampled complement sign margins discipline the emitted finite root-tube target; the companion directed-rounded source-root interval certificate promotes the same tubes and slabs to root-tube isolation and complement exclusion.",
    term_certificate_rows: termCertificateRows,
    status: passed
      ? "sampled-finite-root-tube-sign-margin-certificate-passed"
      : "sampled-finite-root-tube-sign-margin-certificate-open",
  };
}

function buildMachinePaddedSourceRootIntervalCertificate({
  finiteIntervalRootTubeCertificateTarget,
  thetaInterval,
  speedRatioInterval,
  machinePadding,
}) {
  let totalTubeEndpointSignPairIntervalCount = 0;
  let totalTubeEndpointFIntervalCount = 0;
  let totalTubeFDeltaIntervalCount = 0;
  let totalComplementFIntervalCount = 0;
  let minimumTubeEndpointIntervalAbsF = Infinity;
  let minimumTubeEndpointIntervalSignProductMargin = Infinity;
  let minimumTubeIntervalAbsFDelta = Infinity;
  let minimumComplementIntervalAbsF = Infinity;
  let endpointAbsFBottleneck = null;
  let endpointSignProductBottleneck = null;
  let tubeFDeltaBottleneck = null;
  let complementBottleneck = null;
  let allTubeEndpointIntervalsOpposite = true;
  let allTubeFDeltaIntervalsMatchTarget = true;
  let allComplementIntervalsExcludeZero = true;
  let allComplementIntervalSignsStable = true;

  const termCertificateRows =
    finiteIntervalRootTubeCertificateTarget.term_target_rows.map((termRow) => {
      const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
        thetaInterval,
        termLabel: termRow.term_label,
      });
      const tubeRows = termRow.protected_tubes.map((tube) => {
        const protectedInterval = tube.protected_delta_interval.map(Number);
        const leftFInterval = sourceRootEquationInterval({
          speedRatioInterval,
          kappa: termRow.kappa,
          thetaTildeInterval,
          deltaInterval: [protectedInterval[0], protectedInterval[0]],
          padding: machinePadding,
        });
        const rightFInterval = sourceRootEquationInterval({
          speedRatioInterval,
          kappa: termRow.kappa,
          thetaTildeInterval,
          deltaInterval: [protectedInterval[1], protectedInterval[1]],
          padding: machinePadding,
        });
        const leftSignInfo = intervalSignAndClearance(leftFInterval);
        const rightSignInfo = intervalSignAndClearance(rightFInterval);
        const endpointSignsOpposite =
          leftSignInfo.sign !== "mixed" &&
          rightSignInfo.sign !== "mixed" &&
          leftSignInfo.sign !== rightSignInfo.sign;
        const endpointClearance = Math.min(
          leftSignInfo.clearance,
          rightSignInfo.clearance
        );
        const endpointSignProductMargin =
          leftSignInfo.clearance * rightSignInfo.clearance;
        const FDeltaSummary = summarizeIntervalSubdivisions({
          interval: protectedInterval,
          subdivisionCount: SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
          expectedSign: tube.sampled_F_delta_sign,
          intervalBuilder: (deltaInterval) =>
            sourceRootDeltaDerivativeInterval({
              speedRatioInterval,
              kappa: termRow.kappa,
              thetaTildeInterval,
              deltaInterval,
              padding: machinePadding,
            }),
        });

        totalTubeEndpointSignPairIntervalCount += 1;
        totalTubeEndpointFIntervalCount += 2;
        totalTubeFDeltaIntervalCount += SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS;
        allTubeEndpointIntervalsOpposite =
          allTubeEndpointIntervalsOpposite && endpointSignsOpposite;
        allTubeFDeltaIntervalsMatchTarget =
          allTubeFDeltaIntervalsMatchTarget &&
          FDeltaSummary.matches_expected_sign;
        minimumTubeEndpointIntervalAbsF = Math.min(
          minimumTubeEndpointIntervalAbsF,
          endpointClearance
        );
        minimumTubeEndpointIntervalSignProductMargin = Math.min(
          minimumTubeEndpointIntervalSignProductMargin,
          endpointSignProductMargin
        );
        minimumTubeIntervalAbsFDelta = Math.min(
          minimumTubeIntervalAbsFDelta,
          Number(FDeltaSummary.minimum_clearance)
        );
        if (
          endpointAbsFBottleneck === null ||
          endpointClearance < endpointAbsFBottleneck.margin
        ) {
          endpointAbsFBottleneck = {
            term_label: termRow.term_label,
            root_index: tube.root_index,
            margin: endpointClearance,
          };
        }
        if (
          endpointSignProductBottleneck === null ||
          endpointSignProductMargin < endpointSignProductBottleneck.margin
        ) {
          endpointSignProductBottleneck = {
            term_label: termRow.term_label,
            root_index: tube.root_index,
            margin: endpointSignProductMargin,
          };
        }
        if (
          tubeFDeltaBottleneck === null ||
          Number(FDeltaSummary.minimum_clearance) < tubeFDeltaBottleneck.margin
        ) {
          tubeFDeltaBottleneck = {
            term_label: termRow.term_label,
            root_index: tube.root_index,
            margin: Number(FDeltaSummary.minimum_clearance),
          };
        }

        return {
          root_index: tube.root_index,
          protected_delta_interval: tube.protected_delta_interval,
          endpoint_left_F_interval: leftFInterval.map(formatSmallNumber),
          endpoint_right_F_interval: rightFInterval.map(formatSmallNumber),
          endpoint_left_sign: leftSignInfo.sign,
          endpoint_right_sign: rightSignInfo.sign,
          endpoint_signs_opposite: endpointSignsOpposite,
          minimum_endpoint_abs_F: formatSmallNumber(endpointClearance),
          minimum_endpoint_sign_product_margin: formatSmallNumber(
            endpointSignProductMargin
          ),
          F_delta_expected_sign: tube.sampled_F_delta_sign,
          F_delta_subdivision_summary: FDeltaSummary,
        };
      });

      const complementRows = termRow.complement_slabs.map((slab) => {
        const deltaInterval = slab.delta_interval.map(Number);
        const complementSummary = summarizeIntervalSubdivisions({
          interval: deltaInterval,
          subdivisionCount: SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS,
          intervalBuilder: (subDeltaInterval) =>
            sourceRootEquationInterval({
              speedRatioInterval,
              kappa: termRow.kappa,
              thetaTildeInterval,
              deltaInterval: subDeltaInterval,
              padding: machinePadding,
            }),
        });
        const complementSignsStable =
          complementSummary.sign_definite &&
          complementSummary.signs.length === 1;

        totalComplementFIntervalCount += SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS;
        allComplementIntervalsExcludeZero =
          allComplementIntervalsExcludeZero && complementSummary.sign_definite;
        allComplementIntervalSignsStable =
          allComplementIntervalSignsStable && complementSignsStable;
        minimumComplementIntervalAbsF = Math.min(
          minimumComplementIntervalAbsF,
          Number(complementSummary.minimum_clearance)
        );
        if (
          complementBottleneck === null ||
          Number(complementSummary.minimum_clearance) < complementBottleneck.margin
        ) {
          complementBottleneck = {
            term_label: termRow.term_label,
            complement_index: slab.complement_index,
            margin: Number(complementSummary.minimum_clearance),
          };
        }

        return {
          complement_index: slab.complement_index,
          delta_interval: slab.delta_interval,
          complement_subdivision_summary: complementSummary,
        };
      });

      return {
        term_label: termRow.term_label,
        kappa: termRow.kappa,
        sigma: termRow.sigma,
        protected_tube_count: tubeRows.length,
        complement_slab_count: complementRows.length,
        protected_tubes: tubeRows,
        complement_slabs: complementRows,
      };
    });

  const passed =
    finiteIntervalRootTubeCertificateTarget.status ===
      "finite-interval-root-tube-certificate-target-emitted" &&
    allTubeEndpointIntervalsOpposite &&
    allTubeFDeltaIntervalsMatchTarget &&
    allComplementIntervalsExcludeZero &&
    allComplementIntervalSignsStable &&
    minimumTubeEndpointIntervalAbsF > 0 &&
    minimumTubeEndpointIntervalSignProductMargin > 0 &&
    minimumTubeIntervalAbsFDelta > 0 &&
    minimumComplementIntervalAbsF > 0;

  return {
    certificate_type: "machine-padded-source-root-interval-certificate",
    interval_padding: formatSmallNumber(machinePadding),
    certifies_machine_padded_interval_source_root_tube_isolation: passed,
    certifies_machine_padded_interval_source_root_sheet_continuation: passed,
    certifies_machine_padded_interval_F_delta_lower_bound: passed,
    certifies_machine_padded_interval_complement_exclusion: passed,
    certifies_interval_root_tube_isolation: false,
    certifies_interval_root_sheet_continuation: false,
    certifies_interval_F_delta_lower_bound: false,
    certifies_interval_complement_exclusion: false,
    certifies_outward_rounded_interval_enclosure: false,
    tube_F_delta_subdivision_count: SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
    complement_subdivision_count: SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS,
    tube_endpoint_sign_pair_interval_count:
      totalTubeEndpointSignPairIntervalCount,
    tube_endpoint_F_interval_count: totalTubeEndpointFIntervalCount,
    tube_F_delta_interval_count: totalTubeFDeltaIntervalCount,
    complement_F_interval_count: totalComplementFIntervalCount,
    all_tube_endpoint_intervals_opposite: allTubeEndpointIntervalsOpposite,
    all_tube_F_delta_intervals_match_target:
      allTubeFDeltaIntervalsMatchTarget,
    all_complement_intervals_exclude_zero: allComplementIntervalsExcludeZero,
    all_complement_interval_signs_stable: allComplementIntervalSignsStable,
    minimum_tube_endpoint_interval_abs_F: formatSmallNumber(
      minimumTubeEndpointIntervalAbsF
    ),
    minimum_tube_endpoint_interval_sign_product_margin: formatSmallNumber(
      minimumTubeEndpointIntervalSignProductMargin
    ),
    minimum_tube_interval_abs_F_delta: formatSmallNumber(
      minimumTubeIntervalAbsFDelta
    ),
    minimum_complement_interval_abs_F: formatSmallNumber(
      minimumComplementIntervalAbsF
    ),
    tube_endpoint_interval_abs_F_bottleneck: endpointAbsFBottleneck,
    tube_endpoint_interval_sign_product_bottleneck:
      endpointSignProductBottleneck,
    tube_interval_F_delta_bottleneck: tubeFDeltaBottleneck,
    complement_interval_abs_F_bottleneck: complementBottleneck,
    theorem_implication:
      "For the elementary source-root equation, machine-padded interval endpoint signs, fixed-sign F_delta on protected tubes, and complement exclusion imply one source-root sheet in each protected tube and no source roots in complement slabs at this machine-padded interval level; the companion directed-rounded source-root certificate removes the artificial padding.",
    term_certificate_rows: termCertificateRows,
    status: passed
      ? "machine-padded-source-root-interval-certificate-passed"
      : "machine-padded-source-root-interval-certificate-open",
  };
}

function buildDirectedRoundedSourceRootIntervalCertificate({
  finiteIntervalRootTubeCertificateTarget,
  thetaInterval,
  speedRatioInterval,
}) {
  const baseCertificate = buildMachinePaddedSourceRootIntervalCertificate({
    finiteIntervalRootTubeCertificateTarget,
    thetaInterval,
    speedRatioInterval,
    machinePadding: 0,
  });
  const passed =
    baseCertificate.status ===
    "machine-padded-source-root-interval-certificate-passed";

  return {
    certificate_type: "directed-rounded-source-root-interval-certificate",
    interval_rounding: "ieee-754-nextafter-outward",
    interval_padding: 0,
    certifies_directed_rounded_source_root_interval_certificate: passed,
    certifies_directed_rounded_interval_source_root_tube_isolation: passed,
    certifies_directed_rounded_interval_source_root_sheet_continuation: passed,
    certifies_directed_rounded_interval_F_delta_lower_bound: passed,
    certifies_directed_rounded_interval_complement_exclusion: passed,
    certifies_interval_root_tube_isolation: passed,
    certifies_interval_root_sheet_continuation: passed,
    certifies_interval_F_delta_lower_bound: passed,
    certifies_interval_complement_exclusion: passed,
    certifies_outward_rounded_interval_enclosure: false,
    tube_F_delta_subdivision_count:
      baseCertificate.tube_F_delta_subdivision_count,
    complement_subdivision_count: baseCertificate.complement_subdivision_count,
    tube_endpoint_sign_pair_interval_count:
      baseCertificate.tube_endpoint_sign_pair_interval_count,
    tube_endpoint_F_interval_count:
      baseCertificate.tube_endpoint_F_interval_count,
    tube_F_delta_interval_count: baseCertificate.tube_F_delta_interval_count,
    complement_F_interval_count: baseCertificate.complement_F_interval_count,
    all_tube_endpoint_intervals_opposite:
      baseCertificate.all_tube_endpoint_intervals_opposite,
    all_tube_F_delta_intervals_match_target:
      baseCertificate.all_tube_F_delta_intervals_match_target,
    all_complement_intervals_exclude_zero:
      baseCertificate.all_complement_intervals_exclude_zero,
    all_complement_interval_signs_stable:
      baseCertificate.all_complement_interval_signs_stable,
    minimum_tube_endpoint_interval_abs_F:
      baseCertificate.minimum_tube_endpoint_interval_abs_F,
    minimum_tube_endpoint_interval_sign_product_margin:
      baseCertificate.minimum_tube_endpoint_interval_sign_product_margin,
    minimum_tube_interval_abs_F_delta:
      baseCertificate.minimum_tube_interval_abs_F_delta,
    minimum_complement_interval_abs_F:
      baseCertificate.minimum_complement_interval_abs_F,
    tube_endpoint_interval_abs_F_bottleneck:
      baseCertificate.tube_endpoint_interval_abs_F_bottleneck,
    tube_endpoint_interval_sign_product_bottleneck:
      baseCertificate.tube_endpoint_interval_sign_product_bottleneck,
    tube_interval_F_delta_bottleneck:
      baseCertificate.tube_interval_F_delta_bottleneck,
    complement_interval_abs_F_bottleneck:
      baseCertificate.complement_interval_abs_F_bottleneck,
    theorem_implication:
      "For the elementary source-root equation, outward-rounded interval endpoint signs, fixed-sign F_delta on protected tubes, and complement exclusion imply one source-root sheet in each protected tube and no source roots in complement slabs. This closes the source-root interval partition for the peak-budget row but does not certify derivative-variation or curvature interval closure.",
    term_certificate_rows: baseCertificate.term_certificate_rows,
    status: passed
      ? DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS
      : "directed-rounded-source-root-interval-certificate-open",
  };
}

function crossBinaryCoefficientForTerm(termLabel) {
  return termLabel.startsWith("-") ? -1 : 1;
}

function monotoneRootLowerEndpointPredicate({ FDeltaExpectedSign, FInterval }) {
  return FDeltaExpectedSign === "+" ? FInterval[1] <= 0 : FInterval[0] >= 0;
}

function monotoneRootUpperEndpointPredicate({ FDeltaExpectedSign, FInterval }) {
  return FDeltaExpectedSign === "+" ? FInterval[0] >= 0 : FInterval[1] <= 0;
}

function contractSourceRootIntervalByMonotonicity({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  protectedInterval,
  FDeltaExpectedSign,
}) {
  const orientationZeta = FDeltaExpectedSign === "-" ? -1 : 1;
  let candidateFIntervalEvaluationCount = 0;
  const endpointFInterval = (delta) =>
    sourceRootEquationInterval({
      speedRatioInterval,
      kappa,
      thetaTildeInterval,
      deltaInterval: [delta, delta],
      padding: 0,
    });
  const trackedEndpointFInterval = (delta) => {
    candidateFIntervalEvaluationCount += 1;
    return endpointFInterval(delta);
  };
  const leftEndpointFInterval = trackedEndpointFInterval(protectedInterval[0]);
  const rightEndpointFInterval = trackedEndpointFInterval(protectedInterval[1]);
  const orientedLeftEndpointFInterval = scaleInterval(
    leftEndpointFInterval,
    orientationZeta
  );
  const orientedRightEndpointFInterval = scaleInterval(
    rightEndpointFInterval,
    orientationZeta
  );
  const leftPredicate = monotoneRootLowerEndpointPredicate({
    FDeltaExpectedSign,
    FInterval: leftEndpointFInterval,
  });
  const rightPredicate = monotoneRootUpperEndpointPredicate({
    FDeltaExpectedSign,
    FInterval: rightEndpointFInterval,
  });

  if (!leftPredicate || !rightPredicate) {
    return {
      contracted: false,
      contracted_delta_interval: protectedInterval,
      protected_delta_width: intervalWidth(protectedInterval),
      contracted_delta_width: intervalWidth(protectedInterval),
      width_reduction_factor: 1,
      contracted_to_original_width_ratio: 1,
      orientation_zeta: orientationZeta,
      endpoint_left_F_interval: leftEndpointFInterval,
      endpoint_right_F_interval: rightEndpointFInterval,
      oriented_endpoint_left_F_interval: orientedLeftEndpointFInterval,
      oriented_endpoint_right_F_interval: orientedRightEndpointFInterval,
      oriented_endpoint_left_sign: intervalSignAndClearance(
        orientedLeftEndpointFInterval
      ).sign,
      oriented_endpoint_right_sign: intervalSignAndClearance(
        orientedRightEndpointFInterval
      ).sign,
      endpoint_sign_conditions_hold: false,
      candidate_F_interval_evaluation_count: candidateFIntervalEvaluationCount,
    };
  }

  let lowerGood = protectedInterval[0];
  let lowerBad = protectedInterval[1];
  for (
    let iteration = 0;
    iteration < SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS;
    iteration += 1
  ) {
    const midpoint = 0.5 * (lowerGood + lowerBad);
    const midpointFInterval = trackedEndpointFInterval(midpoint);
    if (
      monotoneRootLowerEndpointPredicate({
        FDeltaExpectedSign,
        FInterval: midpointFInterval,
      })
    ) {
      lowerGood = midpoint;
    } else {
      lowerBad = midpoint;
    }
  }

  let upperBad = protectedInterval[0];
  let upperGood = protectedInterval[1];
  for (
    let iteration = 0;
    iteration < SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS;
    iteration += 1
  ) {
    const midpoint = 0.5 * (upperBad + upperGood);
    const midpointFInterval = trackedEndpointFInterval(midpoint);
    if (
      monotoneRootUpperEndpointPredicate({
        FDeltaExpectedSign,
        FInterval: midpointFInterval,
      })
    ) {
      upperGood = midpoint;
    } else {
      upperBad = midpoint;
    }
  }

  const contractionOrderingValid = lowerGood <= upperGood;
  const contractedInterval = contractionOrderingValid
    ? [nextDown(lowerGood), nextUp(upperGood)]
    : protectedInterval;
  const protectedWidth = intervalWidth(protectedInterval);
  const contractedWidth = intervalWidth(contractedInterval);
  const widthReductionFactor =
    contractedWidth > 0 ? protectedWidth / contractedWidth : Infinity;

  return {
    contracted: contractionOrderingValid,
    contracted_delta_interval: contractedInterval,
    protected_delta_width: protectedWidth,
    contracted_delta_width: contractedWidth,
    width_reduction_factor: widthReductionFactor,
    contracted_to_original_width_ratio:
      protectedWidth > 0 ? contractedWidth / protectedWidth : Infinity,
    orientation_zeta: orientationZeta,
    endpoint_left_F_interval: leftEndpointFInterval,
    endpoint_right_F_interval: rightEndpointFInterval,
    oriented_endpoint_left_F_interval: orientedLeftEndpointFInterval,
    oriented_endpoint_right_F_interval: orientedRightEndpointFInterval,
    oriented_endpoint_left_sign: intervalSignAndClearance(
      orientedLeftEndpointFInterval
    ).sign,
    oriented_endpoint_right_sign: intervalSignAndClearance(
      orientedRightEndpointFInterval
    ).sign,
    endpoint_sign_conditions_hold: contractionOrderingValid,
    lower_bisection_iteration_count:
      SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS,
    upper_bisection_iteration_count:
      SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS,
    candidate_F_interval_evaluation_count: candidateFIntervalEvaluationCount,
  };
}

function sourceContributionThetaDerivativeInterval({
  speedRatioInterval,
  kappa,
  sigma,
  thetaTildeInterval,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const sinPhiInterval = sinInterval(phiInterval);
  const cosPhiInterval = cosInterval(phiInterval);
  const sinDeltaInterval = sinInterval(deltaInterval);
  const cosDeltaInterval = cosInterval(deltaInterval);
  const FDeltaInterval = sourceRootDeltaDerivativeInterval({
    speedRatioInterval,
    kappa,
    thetaTildeInterval,
    deltaInterval,
    padding: 0,
  });
  const FDeltaSignInfo = intervalSignAndClearance(FDeltaInterval);
  const FDeltaSignMatches =
    FDeltaSignInfo.sign !== "mixed" && FDeltaSignInfo.sign === FDeltaExpectedSign;
  const absFDeltaInterval =
    FDeltaExpectedSign === "-"
      ? negateInterval(FDeltaInterval)
      : FDeltaInterval;

  if (!FDeltaSignMatches || absFDeltaInterval[0] <= 0) {
    return {
      derivative_interval: [-Infinity, Infinity],
      F_delta_interval: FDeltaInterval,
      F_delta_sign: FDeltaSignInfo.sign,
      F_delta_sign_matches_expected: false,
      minimum_F_delta_abs_clearance: 0,
    };
  }

  const deltaPrimeInterval = divideIntervals(
    scaleInterval(cosPhiInterval, -2),
    FDeltaInterval
  );
  const FDeltaDeltaInterval = addIntervals(
    twoOverSpeedSquaredInterval({ speedRatioInterval }),
    negateInterval(sinPhiInterval),
    scaleInterval(sinDeltaInterval, -kappa)
  );
  const FDeltaPrimeInterval = addIntervals(
    scaleInterval(sinPhiInterval, 2),
    multiplyIntervals(FDeltaDeltaInterval, deltaPrimeInterval)
  );
  const kernelInterval = scaleInterval(
    addIntervals(cosPhiInterval, scaleInterval(cosDeltaInterval, kappa)),
    -0.5
  );
  const kernelPrimeInterval = addIntervals(
    sinPhiInterval,
    scaleInterval(
      multiplyIntervals(
        addIntervals(scaleInterval(sinDeltaInterval, kappa), negateInterval(sinPhiInterval)),
        deltaPrimeInterval
      ),
      0.5
    )
  );
  const deltaSquaredInterval = positivePowerInterval(deltaInterval, 2);
  const deltaCubedInterval = positivePowerInterval(deltaInterval, 3);
  const absFDeltaSquaredInterval = positivePowerInterval(absFDeltaInterval, 2);
  const inverseFactorInterval = reciprocalInterval(
    multiplyIntervals(deltaSquaredInterval, absFDeltaInterval)
  );
  const inverseFactorPrimeInterval = addIntervals(
    divideIntervals(
      scaleInterval(deltaPrimeInterval, -2),
      multiplyIntervals(deltaCubedInterval, absFDeltaInterval)
    ),
    scaleInterval(
      divideIntervals(
        FDeltaPrimeInterval,
        multiplyIntervals(deltaSquaredInterval, absFDeltaSquaredInterval)
      ),
      FDeltaExpectedSign === "+" ? -1 : 1
    )
  );
  const derivativeInterval = divideIntervals(
    scaleInterval(
      addIntervals(
        multiplyIntervals(kernelPrimeInterval, inverseFactorInterval),
        multiplyIntervals(kernelInterval, inverseFactorPrimeInterval)
      ),
      2 * sigma
    ),
    speedRatioInterval
  );

  return {
    derivative_interval: derivativeInterval,
    F_delta_interval: FDeltaInterval,
    F_delta_sign: FDeltaSignInfo.sign,
    F_delta_sign_matches_expected: true,
    minimum_F_delta_abs_clearance: FDeltaSignInfo.clearance,
  };
}

function sourceRootEquationIntervalJet({
  thetaTildeJet,
  speedRatioJet,
  deltaJet,
  kappa,
}) {
  const phiJet = intervalJetSubtract(
    intervalJetScale(thetaTildeJet, 2),
    deltaJet
  );
  return intervalJetAdd(
    intervalJetAdd(
      intervalJetDivide(
        intervalJetMultiply(deltaJet, deltaJet),
        intervalJetMultiply(speedRatioJet, speedRatioJet)
      ),
      intervalJetConstant(-2)
    ),
    intervalJetAdd(intervalJetSin(phiJet), intervalJetScale(intervalJetSin(deltaJet), kappa))
  );
}

function sourceRootDeltaDerivativeIntervalJet({
  thetaTildeJet,
  speedRatioJet,
  deltaJet,
  kappa,
}) {
  const phiJet = intervalJetSubtract(
    intervalJetScale(thetaTildeJet, 2),
    deltaJet
  );
  return intervalJetAdd(
    intervalJetDivide(
      intervalJetScale(deltaJet, 2),
      intervalJetMultiply(speedRatioJet, speedRatioJet)
    ),
    intervalJetAdd(
      intervalJetScale(intervalJetCos(phiJet), -1),
      intervalJetScale(intervalJetCos(deltaJet), kappa)
    )
  );
}

function buildImplicitDeltaIntervalJet({
  thetaTildeInterval,
  speedRatioInterval,
  kappa,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const thetaTildeJet = intervalJetVariable(thetaTildeInterval, "theta");
  const speedRatioJet = intervalJetVariable(speedRatioInterval, "speed");
  const deltaJet = intervalJetConstant(deltaInterval);
  const FDeltaInterval = sourceRootDeltaDerivativeInterval({
    speedRatioInterval,
    kappa,
    thetaTildeInterval,
    deltaInterval,
    padding: 0,
  });
  const FDeltaSignInfo = intervalSignAndClearance(FDeltaInterval);
  const FDeltaSignMatches =
    FDeltaSignInfo.sign !== "mixed" &&
    FDeltaSignInfo.sign === FDeltaExpectedSign;

  for (let totalOrder = 1; totalOrder <= JET_MAX_TOTAL_ORDER; totalOrder += 1) {
    for (const [thetaOrder, speedOrder] of JET_MULTI_INDICES.filter(
      ([candidateTheta, candidateSpeed]) =>
        candidateTheta + candidateSpeed === totalOrder
    )) {
      intervalJetSet(deltaJet, thetaOrder, speedOrder, [0, 0]);
      const residualJet = sourceRootEquationIntervalJet({
        thetaTildeJet,
        speedRatioJet,
        deltaJet,
        kappa,
      });
      const coefficient = intervalJetGet(residualJet, thetaOrder, speedOrder);
      intervalJetSet(
        deltaJet,
        thetaOrder,
        speedOrder,
        divideIntervals(negateInterval(coefficient), FDeltaInterval)
      );
    }
  }

  return {
    delta_jet: deltaJet,
    F_delta_interval: FDeltaInterval,
    F_delta_sign: FDeltaSignInfo.sign,
    F_delta_sign_matches_expected: FDeltaSignMatches,
    minimum_F_delta_abs_clearance: FDeltaSignInfo.clearance,
  };
}

function buildSourceContributionIntervalJet({
  thetaTildeInterval,
  speedRatioInterval,
  kappa,
  sigma,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const thetaTildeJet = intervalJetVariable(thetaTildeInterval, "theta");
  const speedRatioJet = intervalJetVariable(speedRatioInterval, "speed");
  const implicitDeltaJet = buildImplicitDeltaIntervalJet({
    thetaTildeInterval,
    speedRatioInterval,
    kappa,
    deltaInterval,
    FDeltaExpectedSign,
  });
  const deltaJet = implicitDeltaJet.delta_jet;
  const phiJet = intervalJetSubtract(
    intervalJetScale(thetaTildeJet, 2),
    deltaJet
  );
  const FDeltaJet = sourceRootDeltaDerivativeIntervalJet({
    thetaTildeJet,
    speedRatioJet,
    deltaJet,
    kappa,
  });
  const absFDeltaJet =
    FDeltaExpectedSign === "-"
      ? intervalJetScale(FDeltaJet, -1)
      : FDeltaJet;
  const kernelJet = intervalJetScale(
    intervalJetAdd(
      intervalJetCos(phiJet),
      intervalJetScale(intervalJetCos(deltaJet), kappa)
    ),
    -0.5
  );
  const inverseFactorJet = intervalJetInverse(
    intervalJetMultiply(
      intervalJetMultiply(deltaJet, deltaJet),
      absFDeltaJet
    )
  );
  const contributionJet = intervalJetDivide(
    intervalJetScale(
      intervalJetMultiply(kernelJet, inverseFactorJet),
      2 * sigma
    ),
    speedRatioJet
  );

  return {
    contribution_jet: contributionJet,
    F_delta_interval: implicitDeltaJet.F_delta_interval,
    F_delta_sign: implicitDeltaJet.F_delta_sign,
    F_delta_sign_matches_expected:
      implicitDeltaJet.F_delta_sign_matches_expected,
    minimum_F_delta_abs_clearance:
      implicitDeltaJet.minimum_F_delta_abs_clearance,
  };
}

function buildCrossBinaryIntervalJetFromCertifiedRootTubes({
  thetaInterval,
  speedRatioInterval,
  directedRoundedSourceRootIntervalCertificate,
}) {
  let crossBinaryJet = intervalJetZero();
  let allRootContractionsPassed = true;
  let allFDeltaSignsMatch = true;
  let totalRootSheetContractionCount = 0;
  let maximumContractedDeltaWidth = 0;
  let minimumRootSheetWidthReductionFactor = Infinity;
  let minimumFDeltaAbsClearance = Infinity;
  let rootContractionWidthBottleneck = null;
  let rootContractionReductionBottleneck = null;
  const termRows =
    directedRoundedSourceRootIntervalCertificate.term_certificate_rows.map(
      (termRow) => {
        const coefficient = crossBinaryCoefficientForTerm(termRow.term_label);
        const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
          thetaInterval,
          termLabel: termRow.term_label,
        });
        let termJet = intervalJetZero();
        const rootRows = termRow.protected_tubes.map((tube) => {
          const protectedInterval = tube.protected_delta_interval.map(Number);
          const rootContraction = contractSourceRootIntervalByMonotonicity({
            speedRatioInterval,
            kappa: termRow.kappa,
            thetaTildeInterval,
            protectedInterval,
            FDeltaExpectedSign: tube.F_delta_expected_sign,
          });
          const deltaInterval = rootContraction.contracted
            ? rootContraction.contracted_delta_interval
            : protectedInterval;
          const sourceJet = buildSourceContributionIntervalJet({
            thetaTildeInterval,
            speedRatioInterval,
            kappa: termRow.kappa,
            sigma: termRow.sigma,
            deltaInterval,
            FDeltaExpectedSign: tube.F_delta_expected_sign,
          });

          termJet = intervalJetAdd(termJet, sourceJet.contribution_jet);
          totalRootSheetContractionCount += 1;
          allRootContractionsPassed =
            allRootContractionsPassed && rootContraction.contracted;
          allFDeltaSignsMatch =
            allFDeltaSignsMatch && sourceJet.F_delta_sign_matches_expected;
          maximumContractedDeltaWidth = Math.max(
            maximumContractedDeltaWidth,
            rootContraction.contracted_delta_width
          );
          minimumRootSheetWidthReductionFactor = Math.min(
            minimumRootSheetWidthReductionFactor,
            rootContraction.width_reduction_factor
          );
          minimumFDeltaAbsClearance = Math.min(
            minimumFDeltaAbsClearance,
            sourceJet.minimum_F_delta_abs_clearance
          );
          if (
            rootContractionWidthBottleneck === null ||
            rootContraction.contracted_delta_width >
              rootContractionWidthBottleneck.width
          ) {
            rootContractionWidthBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              width: rootContraction.contracted_delta_width,
            };
          }
          if (
            rootContractionReductionBottleneck === null ||
            rootContraction.width_reduction_factor <
              rootContractionReductionBottleneck.factor
          ) {
            rootContractionReductionBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              factor: rootContraction.width_reduction_factor,
            };
          }

          return {
            root_index: tube.root_index,
            contracted: rootContraction.contracted,
            contracted_delta_interval: formatInterval(deltaInterval),
            contracted_delta_width: formatSmallNumber(
              rootContraction.contracted_delta_width
            ),
            root_sheet_width_reduction_factor: formatSmallNumber(
              rootContraction.width_reduction_factor
            ),
            F_delta_expected_sign: tube.F_delta_expected_sign,
            F_delta_interval: formatInterval(sourceJet.F_delta_interval),
            F_delta_sign: sourceJet.F_delta_sign,
            F_delta_sign_matches_expected:
              sourceJet.F_delta_sign_matches_expected,
            minimum_F_delta_abs_clearance: formatSmallNumber(
              sourceJet.minimum_F_delta_abs_clearance
            ),
          };
        });

        crossBinaryJet = intervalJetAdd(
          crossBinaryJet,
          intervalJetScale(termJet, coefficient)
        );

        return {
          term_label: termRow.term_label,
          coefficient,
          protected_tube_count: rootRows.length,
          root_rows: rootRows,
        };
      }
    );

  return {
    cross_binary_interval_jet: crossBinaryJet,
    all_root_sheet_contractions_passed: allRootContractionsPassed,
    all_F_delta_signs_match_expected: allFDeltaSignsMatch,
    total_root_sheet_contraction_count: totalRootSheetContractionCount,
    maximum_contracted_delta_width: maximumContractedDeltaWidth,
    minimum_root_sheet_width_reduction_factor:
      minimumRootSheetWidthReductionFactor,
    minimum_F_delta_abs_clearance: minimumFDeltaAbsClearance,
    root_sheet_contraction_width_bottleneck: rootContractionWidthBottleneck,
    root_sheet_contraction_reduction_bottleneck:
      rootContractionReductionBottleneck,
    term_rows: termRows,
  };
}

function buildCrossBinaryIntervalJetFromPrecontractedRootSheets({
  thetaInterval,
  speedRatioInterval,
  rootSheetRows,
}) {
  let crossBinaryJet = intervalJetZero();
  let allRootContractionsPassed = true;
  let allFDeltaSignsMatch = true;
  let totalRootSheetContractionCount = 0;
  let maximumContractedDeltaWidth = 0;
  let minimumRootSheetWidthReductionFactor = Infinity;
  let minimumFDeltaAbsClearance = Infinity;
  let rootContractionWidthBottleneck = null;
  let rootContractionReductionBottleneck = null;

  for (const rootSheetRow of rootSheetRows) {
    const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
      thetaInterval,
      termLabel: rootSheetRow.term_label,
    });
    const sourceJet = buildSourceContributionIntervalJet({
      thetaTildeInterval,
      speedRatioInterval,
      kappa: rootSheetRow.kappa,
      sigma: rootSheetRow.sigma,
      deltaInterval: rootSheetRow.contracted_delta_interval,
      FDeltaExpectedSign: rootSheetRow.F_delta_expected_sign,
    });

    crossBinaryJet = intervalJetAdd(
      crossBinaryJet,
      intervalJetScale(sourceJet.contribution_jet, rootSheetRow.coefficient)
    );
    totalRootSheetContractionCount += 1;
    allRootContractionsPassed =
      allRootContractionsPassed && rootSheetRow.contracted;
    allFDeltaSignsMatch =
      allFDeltaSignsMatch && sourceJet.F_delta_sign_matches_expected;
    maximumContractedDeltaWidth = Math.max(
      maximumContractedDeltaWidth,
      rootSheetRow.contracted_delta_width
    );
    minimumRootSheetWidthReductionFactor = Math.min(
      minimumRootSheetWidthReductionFactor,
      rootSheetRow.width_reduction_factor
    );
    minimumFDeltaAbsClearance = Math.min(
      minimumFDeltaAbsClearance,
      sourceJet.minimum_F_delta_abs_clearance
    );
    if (
      rootContractionWidthBottleneck === null ||
      rootSheetRow.contracted_delta_width > rootContractionWidthBottleneck.width
    ) {
      rootContractionWidthBottleneck = {
        term_label: rootSheetRow.term_label,
        root_index: rootSheetRow.root_index,
        width: rootSheetRow.contracted_delta_width,
      };
    }
    if (
      rootContractionReductionBottleneck === null ||
      rootSheetRow.width_reduction_factor <
        rootContractionReductionBottleneck.factor
    ) {
      rootContractionReductionBottleneck = {
        term_label: rootSheetRow.term_label,
        root_index: rootSheetRow.root_index,
        factor: rootSheetRow.width_reduction_factor,
      };
    }
  }

  return {
    cross_binary_interval_jet: crossBinaryJet,
    all_root_sheet_contractions_passed: allRootContractionsPassed,
    all_F_delta_signs_match_expected: allFDeltaSignsMatch,
    total_root_sheet_contraction_count: totalRootSheetContractionCount,
    maximum_contracted_delta_width: maximumContractedDeltaWidth,
    minimum_root_sheet_width_reduction_factor:
      minimumRootSheetWidthReductionFactor,
    minimum_F_delta_abs_clearance: minimumFDeltaAbsClearance,
    root_sheet_contraction_width_bottleneck: rootContractionWidthBottleneck,
    root_sheet_contraction_reduction_bottleneck:
      rootContractionReductionBottleneck,
  };
}

function buildCrossBinaryDerivativeIntervalFromCertifiedRootTubes({
  thetaInterval,
  speedRatioInterval,
  directedRoundedSourceRootIntervalCertificate,
}) {
  let crossBinaryDerivativeInterval = [0, 0];
  let allRootContractionsPassed = true;
  let allFDeltaSignsMatch = true;
  let minimumFDeltaAbsClearance = Infinity;
  let totalRootSheetContractionCount = 0;
  let sourceDerivativeIntervalEvaluationCount = 0;

  for (const termRow of directedRoundedSourceRootIntervalCertificate.term_certificate_rows) {
    const coefficient = crossBinaryCoefficientForTerm(termRow.term_label);
    const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
      thetaInterval,
      termLabel: termRow.term_label,
    });
    let termDerivativeInterval = [0, 0];

    for (const tube of termRow.protected_tubes) {
      const protectedInterval = tube.protected_delta_interval.map(Number);
      const rootContraction = contractSourceRootIntervalByMonotonicity({
        speedRatioInterval,
        kappa: termRow.kappa,
        thetaTildeInterval,
        protectedInterval,
        FDeltaExpectedSign: tube.F_delta_expected_sign,
      });
      const deltaInterval = rootContraction.contracted
        ? rootContraction.contracted_delta_interval
        : protectedInterval;
      let rootDerivativeInterval = null;

      totalRootSheetContractionCount += 1;
      allRootContractionsPassed =
        allRootContractionsPassed && rootContraction.contracted;

      for (
        let index = 0;
        index < SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS;
        index += 1
      ) {
        const deltaSubinterval = subdivisionInterval({
          interval: deltaInterval,
          index,
          subdivisionCount: SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
        });
        const subdivisionDerivative =
          sourceContributionThetaDerivativeInterval({
            speedRatioInterval,
            kappa: termRow.kappa,
            sigma: termRow.sigma,
            thetaTildeInterval,
            deltaInterval: deltaSubinterval,
            FDeltaExpectedSign: tube.F_delta_expected_sign,
          });

        sourceDerivativeIntervalEvaluationCount += 1;
        rootDerivativeInterval =
          rootDerivativeInterval === null
            ? subdivisionDerivative.derivative_interval
            : hullIntervals(
                rootDerivativeInterval,
                subdivisionDerivative.derivative_interval
              );
        allFDeltaSignsMatch =
          allFDeltaSignsMatch &&
          subdivisionDerivative.F_delta_sign_matches_expected;
        minimumFDeltaAbsClearance = Math.min(
          minimumFDeltaAbsClearance,
          subdivisionDerivative.minimum_F_delta_abs_clearance
        );
      }

      termDerivativeInterval = addIntervals(
        termDerivativeInterval,
        rootDerivativeInterval
      );
    }

    crossBinaryDerivativeInterval = addIntervals(
      crossBinaryDerivativeInterval,
      scaleInterval(termDerivativeInterval, coefficient)
    );
  }

  return {
    derivative_interval: crossBinaryDerivativeInterval,
    all_root_sheet_contractions_passed: allRootContractionsPassed,
    all_F_delta_signs_match_expected: allFDeltaSignsMatch,
    total_root_sheet_contraction_count: totalRootSheetContractionCount,
    source_derivative_interval_evaluation_count:
      sourceDerivativeIntervalEvaluationCount,
    minimum_F_delta_abs_clearance: minimumFDeltaAbsClearance,
  };
}

function buildDirectIntervalDerivativeEnvelopeAttempt({
  thetaInterval,
  speedRatioInterval,
  directedRoundedSourceRootIntervalCertificate,
  vertexMaxDerivative,
  overshootCeiling,
  directIntervalThetaLocalizationSubdivisions,
  directIntervalSpeedLocalizationSubdivisions,
}) {
  let crossBinaryDerivativeInterval = [0, 0];
  let allFDeltaSubdivisionSignsMatch = true;
  let allRootContractionsPassed = true;
  let allLocalizedRootContractionsPassed = true;
  let protectedTubeSubdivisionCount = 0;
  let totalRootSheetContractionCount = 0;
  let totalLocalizedRootSheetContractionCount = 0;
  let localizedParameterTileCount = 0;
  let minimumFDeltaAbsClearance = Infinity;
  let maximumRootDerivativeIntervalWidth = 0;
  let maximumProtectedDeltaWidth = 0;
  let maximumContractedDeltaWidth = 0;
  let maximumLocalizedContractedDeltaWidth = 0;
  let minimumRootContractionWidthReductionFactor = Infinity;
  let minimumLocalizedRootContractionWidthReductionFactor = Infinity;
  let rootWidthBottleneck = null;
  let rootContractionWidthBottleneck = null;
  let rootContractionReductionBottleneck = null;
  let localizedRootContractionWidthBottleneck = null;
  let localizedRootContractionReductionBottleneck = null;
  const localizedRootSheetContractionTiles = new Map();
  const termRows =
    directedRoundedSourceRootIntervalCertificate.term_certificate_rows.map(
      (termRow) => {
        const coefficient = crossBinaryCoefficientForTerm(termRow.term_label);
        const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
          thetaInterval,
          termLabel: termRow.term_label,
        });
        let termDerivativeInterval = [0, 0];
        const rootRows = termRow.protected_tubes.map((tube) => {
          const protectedInterval = tube.protected_delta_interval.map(Number);
          const rootContraction = contractSourceRootIntervalByMonotonicity({
            speedRatioInterval,
            kappa: termRow.kappa,
            thetaTildeInterval,
            protectedInterval,
            FDeltaExpectedSign: tube.F_delta_expected_sign,
          });
          const derivativeDeltaInterval =
            rootContraction.contracted_delta_interval;
          const subdivisionCount =
            tube.F_delta_subdivision_summary?.subdivision_count ??
            SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS;
          let rootDerivativeInterval = null;
          let rootMinimumFDeltaAbsClearance = Infinity;
          let maximumSubdivisionDerivativeIntervalWidth = 0;
          let subdivisionWidthBottleneck = null;
          let rootFDeltaSignsMatch = true;
          let rootLocalizedParameterTileCount = 0;
          let rootLocalizedContractionCount = 0;
          let rootAllLocalizedContractionsPassed = true;
          let rootMaximumLocalizedContractedDeltaWidth = 0;
          let rootMinimumLocalizedWidthReductionFactor = Infinity;
          let rootLocalizedWidthBottleneck = null;
          let rootLocalizedReductionBottleneck = null;

          totalRootSheetContractionCount += 1;
          allRootContractionsPassed =
            allRootContractionsPassed && rootContraction.contracted;
          maximumProtectedDeltaWidth = Math.max(
            maximumProtectedDeltaWidth,
            rootContraction.protected_delta_width
          );
          maximumContractedDeltaWidth = Math.max(
            maximumContractedDeltaWidth,
            rootContraction.contracted_delta_width
          );
          minimumRootContractionWidthReductionFactor = Math.min(
            minimumRootContractionWidthReductionFactor,
            rootContraction.width_reduction_factor
          );
          if (
            rootContractionWidthBottleneck === null ||
            rootContraction.contracted_delta_width >
              rootContractionWidthBottleneck.width
          ) {
            rootContractionWidthBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              width: rootContraction.contracted_delta_width,
            };
          }
          if (
            rootContractionReductionBottleneck === null ||
            rootContraction.width_reduction_factor <
              rootContractionReductionBottleneck.factor
          ) {
            rootContractionReductionBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              factor: rootContraction.width_reduction_factor,
            };
          }

          for (
            let thetaLocalizationIndex = 0;
            thetaLocalizationIndex < directIntervalThetaLocalizationSubdivisions;
            thetaLocalizationIndex += 1
          ) {
            const localizedThetaInterval = subdivisionInterval({
              interval: thetaInterval,
              index: thetaLocalizationIndex,
              subdivisionCount: directIntervalThetaLocalizationSubdivisions,
            });
            const localizedThetaTildeInterval = sourceThetaTildeIntervalForTerm({
              thetaInterval: localizedThetaInterval,
              termLabel: termRow.term_label,
            });
            for (
              let speedLocalizationIndex = 0;
              speedLocalizationIndex <
              directIntervalSpeedLocalizationSubdivisions;
              speedLocalizationIndex += 1
            ) {
              const localizedSpeedRatioInterval = subdivisionInterval({
                interval: speedRatioInterval,
                index: speedLocalizationIndex,
                subdivisionCount:
                  directIntervalSpeedLocalizationSubdivisions,
              });
              const localizedRootContraction =
                contractSourceRootIntervalByMonotonicity({
                  speedRatioInterval: localizedSpeedRatioInterval,
                  kappa: termRow.kappa,
                  thetaTildeInterval: localizedThetaTildeInterval,
                  protectedInterval,
                  FDeltaExpectedSign: tube.F_delta_expected_sign,
                });
              const localizedDerivativeDeltaInterval =
                localizedRootContraction.contracted
                  ? localizedRootContraction.contracted_delta_interval
                  : derivativeDeltaInterval;
              const localizedTileKey = `${thetaLocalizationIndex},${speedLocalizationIndex}`;
              if (!localizedRootSheetContractionTiles.has(localizedTileKey)) {
                localizedRootSheetContractionTiles.set(localizedTileKey, {
                  theta_localization_index: thetaLocalizationIndex,
                  speed_ratio_localization_index: speedLocalizationIndex,
                  root_sheet_rows: [],
                });
              }
              localizedRootSheetContractionTiles
                .get(localizedTileKey)
                .root_sheet_rows.push({
                  term_label: termRow.term_label,
                  coefficient,
                  kappa: termRow.kappa,
                  sigma: termRow.sigma,
                  root_index: tube.root_index,
                  contracted: localizedRootContraction.contracted,
                  contracted_delta_interval: localizedDerivativeDeltaInterval,
                  contracted_delta_width:
                    localizedRootContraction.contracted_delta_width,
                  width_reduction_factor:
                    localizedRootContraction.width_reduction_factor,
                  F_delta_expected_sign: tube.F_delta_expected_sign,
                });

              rootLocalizedParameterTileCount += 1;
              localizedParameterTileCount += 1;
              rootLocalizedContractionCount += 1;
              totalLocalizedRootSheetContractionCount += 1;
              rootAllLocalizedContractionsPassed =
                rootAllLocalizedContractionsPassed &&
                localizedRootContraction.contracted;
              allLocalizedRootContractionsPassed =
                allLocalizedRootContractionsPassed &&
                localizedRootContraction.contracted;
              rootMaximumLocalizedContractedDeltaWidth = Math.max(
                rootMaximumLocalizedContractedDeltaWidth,
                localizedRootContraction.contracted_delta_width
              );
              maximumLocalizedContractedDeltaWidth = Math.max(
                maximumLocalizedContractedDeltaWidth,
                localizedRootContraction.contracted_delta_width
              );
              rootMinimumLocalizedWidthReductionFactor = Math.min(
                rootMinimumLocalizedWidthReductionFactor,
                localizedRootContraction.width_reduction_factor
              );
              minimumLocalizedRootContractionWidthReductionFactor = Math.min(
                minimumLocalizedRootContractionWidthReductionFactor,
                localizedRootContraction.width_reduction_factor
              );
              if (
                rootLocalizedWidthBottleneck === null ||
                localizedRootContraction.contracted_delta_width >
                  rootLocalizedWidthBottleneck.width
              ) {
                rootLocalizedWidthBottleneck = {
                  theta_localization_index: thetaLocalizationIndex,
                  speed_localization_index: speedLocalizationIndex,
                  delta_interval:
                    localizedRootContraction.contracted_delta_interval.map(
                      formatSmallNumber
                    ),
                  width: localizedRootContraction.contracted_delta_width,
                };
              }
              if (
                rootLocalizedReductionBottleneck === null ||
                localizedRootContraction.width_reduction_factor <
                  rootLocalizedReductionBottleneck.factor
              ) {
                rootLocalizedReductionBottleneck = {
                  theta_localization_index: thetaLocalizationIndex,
                  speed_localization_index: speedLocalizationIndex,
                  factor: localizedRootContraction.width_reduction_factor,
                };
              }
              if (
                localizedRootContractionWidthBottleneck === null ||
                localizedRootContraction.contracted_delta_width >
                  localizedRootContractionWidthBottleneck.width
              ) {
                localizedRootContractionWidthBottleneck = {
                  term_label: termRow.term_label,
                  root_index: tube.root_index,
                  theta_localization_index: thetaLocalizationIndex,
                  speed_localization_index: speedLocalizationIndex,
                  width: localizedRootContraction.contracted_delta_width,
                };
              }
              if (
                localizedRootContractionReductionBottleneck === null ||
                localizedRootContraction.width_reduction_factor <
                  localizedRootContractionReductionBottleneck.factor
              ) {
                localizedRootContractionReductionBottleneck = {
                  term_label: termRow.term_label,
                  root_index: tube.root_index,
                  theta_localization_index: thetaLocalizationIndex,
                  speed_localization_index: speedLocalizationIndex,
                  factor: localizedRootContraction.width_reduction_factor,
                };
              }

              for (let index = 0; index < subdivisionCount; index += 1) {
                const deltaSubinterval = subdivisionInterval({
                  interval: localizedDerivativeDeltaInterval,
                  index,
                  subdivisionCount,
                });
                const subdivisionDerivative =
                  sourceContributionThetaDerivativeInterval({
                    speedRatioInterval: localizedSpeedRatioInterval,
                    kappa: termRow.kappa,
                    sigma: termRow.sigma,
                    thetaTildeInterval: localizedThetaTildeInterval,
                    deltaInterval: deltaSubinterval,
                    FDeltaExpectedSign: tube.F_delta_expected_sign,
                  });
                const subdivisionWidth = intervalWidth(
                  subdivisionDerivative.derivative_interval
                );

                protectedTubeSubdivisionCount += 1;
                rootDerivativeInterval =
                  rootDerivativeInterval === null
                    ? subdivisionDerivative.derivative_interval
                    : hullIntervals(
                        rootDerivativeInterval,
                        subdivisionDerivative.derivative_interval
                      );
                rootFDeltaSignsMatch =
                  rootFDeltaSignsMatch &&
                  subdivisionDerivative.F_delta_sign_matches_expected;
                rootMinimumFDeltaAbsClearance = Math.min(
                  rootMinimumFDeltaAbsClearance,
                  subdivisionDerivative.minimum_F_delta_abs_clearance
                );
                minimumFDeltaAbsClearance = Math.min(
                  minimumFDeltaAbsClearance,
                  subdivisionDerivative.minimum_F_delta_abs_clearance
                );

                if (
                  subdivisionWidthBottleneck === null ||
                  subdivisionWidth > subdivisionWidthBottleneck.width
                ) {
                  subdivisionWidthBottleneck = {
                    theta_localization_index: thetaLocalizationIndex,
                    speed_localization_index: speedLocalizationIndex,
                    subdivision_index: index,
                    delta_interval: deltaSubinterval.map(formatSmallNumber),
                    width: subdivisionWidth,
                  };
                }
                maximumSubdivisionDerivativeIntervalWidth = Math.max(
                  maximumSubdivisionDerivativeIntervalWidth,
                  subdivisionWidth
                );
              }
            }
          }

          allFDeltaSubdivisionSignsMatch =
            allFDeltaSubdivisionSignsMatch && rootFDeltaSignsMatch;
          termDerivativeInterval = addIntervals(
            termDerivativeInterval,
            rootDerivativeInterval
          );
          const rootWidth = intervalWidth(rootDerivativeInterval);
          maximumRootDerivativeIntervalWidth = Math.max(
            maximumRootDerivativeIntervalWidth,
            rootWidth
          );
          if (rootWidthBottleneck === null || rootWidth > rootWidthBottleneck.width) {
            rootWidthBottleneck = {
              term_label: termRow.term_label,
              root_index: tube.root_index,
              width: rootWidth,
            };
          }

          return {
            root_index: tube.root_index,
            protected_delta_interval: tube.protected_delta_interval,
            contracted_delta_interval:
              rootContraction.contracted_delta_interval.map(formatSmallNumber),
            root_sheet_contraction_status: rootContraction.contracted
              ? "monotone-root-sheet-contraction-passed"
              : "monotone-root-sheet-contraction-open",
            root_sheet_contraction: {
              contraction_type:
                "fixed-sign-F-delta-monotone-root-sheet-contraction",
              certifies_fixed_sign_F_delta_root_sheet_contraction:
                rootContraction.contracted,
              status: rootContraction.contracted
                ? "fixed-sign-F-delta-root-sheet-contraction-passed"
                : "fixed-sign-F-delta-root-sheet-contraction-open",
              original_protected_delta_interval: tube.protected_delta_interval,
              contracted_delta_interval:
                rootContraction.contracted_delta_interval.map(formatSmallNumber),
              original_delta_width: formatSmallNumber(
                rootContraction.protected_delta_width
              ),
              contracted_delta_width: formatSmallNumber(
                rootContraction.contracted_delta_width
              ),
              contracted_to_original_width_ratio: formatSmallNumber(
                rootContraction.contracted_to_original_width_ratio
              ),
              original_to_contracted_width_reduction_factor: formatSmallNumber(
                rootContraction.width_reduction_factor
              ),
              F_delta_expected_sign: tube.F_delta_expected_sign,
              orientation_zeta: rootContraction.orientation_zeta,
              F_delta_subdivision_count: subdivisionCount,
              minimum_F_delta_abs_clearance:
                tube.F_delta_subdivision_summary?.minimum_clearance ?? null,
              endpoint_left_F_interval:
                rootContraction.endpoint_left_F_interval.map(formatSmallNumber),
              endpoint_right_F_interval:
                rootContraction.endpoint_right_F_interval.map(formatSmallNumber),
              oriented_endpoint_left_F_interval:
                rootContraction.oriented_endpoint_left_F_interval.map(
                  formatSmallNumber
                ),
              oriented_endpoint_right_F_interval:
                rootContraction.oriented_endpoint_right_F_interval.map(
                  formatSmallNumber
                ),
              oriented_endpoint_left_sign:
                rootContraction.oriented_endpoint_left_sign,
              oriented_endpoint_right_sign:
                rootContraction.oriented_endpoint_right_sign,
              endpoint_orientation_passed:
                rootContraction.endpoint_sign_conditions_hold,
              lower_bisection_iteration_count:
                rootContraction.lower_bisection_iteration_count ?? 0,
              upper_bisection_iteration_count:
                rootContraction.upper_bisection_iteration_count ?? 0,
              candidate_F_interval_evaluation_count:
                rootContraction.candidate_F_interval_evaluation_count,
            },
            root_sheet_contraction_endpoint_sign_conditions_hold:
              rootContraction.endpoint_sign_conditions_hold,
            uses_parameter_localized_root_sheet_contractor: true,
            parameter_localized_root_sheet_contraction_status:
              rootAllLocalizedContractionsPassed
                ? "parameter-localized-root-sheet-contraction-passed"
                : "parameter-localized-root-sheet-contraction-open",
            theta_localization_subdivision_count:
              directIntervalThetaLocalizationSubdivisions,
            speed_ratio_localization_subdivision_count:
              directIntervalSpeedLocalizationSubdivisions,
            localized_parameter_tile_count: rootLocalizedParameterTileCount,
            localized_root_sheet_contraction_count:
              rootLocalizedContractionCount,
            all_localized_root_sheet_contractions_passed:
              rootAllLocalizedContractionsPassed,
            maximum_localized_contracted_delta_width: formatSmallNumber(
              rootMaximumLocalizedContractedDeltaWidth
            ),
            minimum_localized_root_sheet_width_reduction_factor:
              formatSmallNumber(rootMinimumLocalizedWidthReductionFactor),
            localized_root_sheet_contraction_width_bottleneck:
              rootLocalizedWidthBottleneck === null
                ? null
                : {
                    theta_localization_index:
                      rootLocalizedWidthBottleneck.theta_localization_index,
                    speed_localization_index:
                      rootLocalizedWidthBottleneck.speed_localization_index,
                    delta_interval:
                      rootLocalizedWidthBottleneck.delta_interval,
                    width: formatSmallNumber(rootLocalizedWidthBottleneck.width),
                  },
            localized_root_sheet_contraction_reduction_bottleneck:
              rootLocalizedReductionBottleneck === null
                ? null
                : {
                    theta_localization_index:
                      rootLocalizedReductionBottleneck.theta_localization_index,
                    speed_localization_index:
                      rootLocalizedReductionBottleneck.speed_localization_index,
                    factor: formatSmallNumber(
                      rootLocalizedReductionBottleneck.factor
                    ),
                  },
            protected_delta_width: formatSmallNumber(
              rootContraction.protected_delta_width
            ),
            contracted_delta_width: formatSmallNumber(
              rootContraction.contracted_delta_width
            ),
            root_sheet_width_reduction_factor: formatSmallNumber(
              rootContraction.width_reduction_factor
            ),
            contraction_endpoint_left_F_interval:
              rootContraction.endpoint_left_F_interval.map(formatSmallNumber),
            contraction_endpoint_right_F_interval:
              rootContraction.endpoint_right_F_interval.map(formatSmallNumber),
            F_delta_expected_sign: tube.F_delta_expected_sign,
            F_delta_subdivision_count: subdivisionCount,
            all_F_delta_subdivision_signs_match_expected: rootFDeltaSignsMatch,
            source_derivative_interval: rootDerivativeInterval.map(formatSmallNumber),
            source_derivative_interval_width: formatSmallNumber(rootWidth),
            maximum_subdivision_source_derivative_interval_width:
              formatSmallNumber(maximumSubdivisionDerivativeIntervalWidth),
            subdivision_width_bottleneck: {
              subdivision_index:
                subdivisionWidthBottleneck?.subdivision_index ?? null,
              delta_interval:
                subdivisionWidthBottleneck?.delta_interval ?? null,
              width: formatSmallNumber(subdivisionWidthBottleneck?.width ?? null),
            },
            minimum_F_delta_abs_clearance: formatSmallNumber(
              rootMinimumFDeltaAbsClearance
            ),
          };
        });
        const weightedTermDerivativeInterval = scaleInterval(
          termDerivativeInterval,
          coefficient
        );
        crossBinaryDerivativeInterval = addIntervals(
          crossBinaryDerivativeInterval,
          weightedTermDerivativeInterval
        );

        return {
          term_label: termRow.term_label,
          coefficient,
          kappa: termRow.kappa,
          sigma: termRow.sigma,
          protected_tube_count: rootRows.length,
          source_derivative_interval: termDerivativeInterval.map(formatSmallNumber),
          weighted_source_derivative_interval:
            weightedTermDerivativeInterval.map(formatSmallNumber),
          root_rows: rootRows,
        };
      }
    );

  const vertex = Number(vertexMaxDerivative);
  const requiredOvershoot = Number(overshootCeiling);
  const directUpperBound = crossBinaryDerivativeInterval[1];
  const allowedUpperBound = vertex + requiredOvershoot;
  const directExcessOverVertex = Math.max(0, directUpperBound - vertex);
  const upperBoundHeadroom = allowedUpperBound - directUpperBound;
  const upperBoundOverrun = Math.max(0, -upperBoundHeadroom);
  const ratioToRequiredBound =
    requiredOvershoot > 0
      ? directExcessOverVertex / requiredOvershoot
      : Infinity;
  const passed =
    directedRoundedSourceRootIntervalCertificate.status ===
      DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
    allRootContractionsPassed &&
    allLocalizedRootContractionsPassed &&
    allFDeltaSubdivisionSignsMatch &&
    Number.isFinite(directUpperBound) &&
    directUpperBound < allowedUpperBound;

  return {
    attempt_type: "direct-interval-derivative-envelope-attempt",
    target_function: "g=f_cross_prime",
    claim_scope: "geometry-bridge/i1-f1/direct-interval-derivative-envelope",
    certifies_direct_interval_derivative_upper_envelope: passed,
    uses_monotone_root_sheet_contractor: true,
    root_sheet_contraction_policy:
      "fixed-sign F_delta monotone sign-bisection contracts each all-parameter source-root range before derivative interval evaluation",
    emits_fixed_sign_F_delta_root_sheet_contractions: true,
    certifies_monotone_root_sheet_range_contraction:
      allRootContractionsPassed,
    uses_parameter_localized_direct_interval_envelope: true,
    parameter_localization_policy:
      "subdivide the theta/speed parameter rectangle, recontract every root sheet on each localized tile by fixed-sign F_delta monotonicity, then hull source-derivative intervals over localized contracted sheets",
    theta_localization_subdivision_count:
      directIntervalThetaLocalizationSubdivisions,
    speed_ratio_localization_subdivision_count:
      directIntervalSpeedLocalizationSubdivisions,
    localized_parameter_tile_count: localizedParameterTileCount,
    localized_root_sheet_contraction_tiles: [
      ...localizedRootSheetContractionTiles.values(),
    ],
    all_parameter_localized_root_sheet_contractions_passed:
      allLocalizedRootContractionsPassed,
    total_parameter_localized_root_sheet_contraction_count:
      totalLocalizedRootSheetContractionCount,
    maximum_parameter_localized_contracted_delta_width:
      formatSmallNumber(maximumLocalizedContractedDeltaWidth),
    minimum_parameter_localized_root_sheet_width_reduction_factor:
      formatSmallNumber(minimumLocalizedRootContractionWidthReductionFactor),
    certifies_interval_derivative_enclosure: false,
    certifies_interval_second_partial_curvature_enclosure: false,
    certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
      false,
    consumes_directed_rounded_source_root_interval_certificate_status:
      directedRoundedSourceRootIntervalCertificate.status,
    source_contribution_derivative_formula:
      "s_prime=2*sigma*(B_prime*I+B*I_prime)/nu with I=(delta^2*abs(F_delta))^-1",
    root_sheet_interval_policy:
      "contract each directed-rounded protected tube by fixed-sign F_delta monotone sign-bisection, hull the contracted-tube subdivision intervals for each retained root sheet, then sum retained root sheets and cross-binary coefficients",
    protected_tube_subdivision_count: protectedTubeSubdivisionCount,
    source_derivative_interval_evaluation_count: protectedTubeSubdivisionCount,
    total_root_sheet_contraction_count: totalRootSheetContractionCount,
    root_sheet_contraction_bisection_iterations:
      SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS,
    all_root_sheet_contractions_passed: allRootContractionsPassed,
    maximum_protected_delta_width: formatSmallNumber(maximumProtectedDeltaWidth),
    maximum_contracted_delta_width:
      formatSmallNumber(maximumContractedDeltaWidth),
    minimum_root_sheet_width_reduction_factor: formatSmallNumber(
      minimumRootContractionWidthReductionFactor
    ),
    all_F_delta_subdivision_signs_match_expected:
      allFDeltaSubdivisionSignsMatch,
    minimum_F_delta_abs_clearance: formatSmallNumber(minimumFDeltaAbsClearance),
    direct_interval_derivative_enclosure:
      crossBinaryDerivativeInterval.map(formatSmallNumber),
    direct_interval_derivative_upper_bound: formatSmallNumber(directUpperBound),
    vertex_max_derivative: formatSmallNumber(vertex),
    allowed_upper_bound: formatSmallNumber(allowedUpperBound),
    required_overshoot_bound_less_than: formatSmallNumber(requiredOvershoot),
    direct_interval_excess_over_vertex:
      formatSmallNumber(directExcessOverVertex),
    direct_interval_upper_bound_headroom: formatSmallNumber(upperBoundHeadroom),
    direct_interval_upper_bound_overrun: formatSmallNumber(upperBoundOverrun),
    direct_interval_remainder_ratio_to_required_bound:
      formatSmallNumber(ratioToRequiredBound),
    maximum_root_derivative_interval_width: formatSmallNumber(
      maximumRootDerivativeIntervalWidth
    ),
    root_derivative_interval_width_bottleneck:
      rootWidthBottleneck === null
        ? null
        : {
            term_label: rootWidthBottleneck.term_label,
            root_index: rootWidthBottleneck.root_index,
            width: formatSmallNumber(rootWidthBottleneck.width),
          },
    root_sheet_contraction_width_bottleneck:
      rootContractionWidthBottleneck === null
        ? null
        : {
            term_label: rootContractionWidthBottleneck.term_label,
            root_index: rootContractionWidthBottleneck.root_index,
            width: formatSmallNumber(rootContractionWidthBottleneck.width),
          },
    root_sheet_contraction_reduction_bottleneck:
      rootContractionReductionBottleneck === null
        ? null
        : {
            term_label: rootContractionReductionBottleneck.term_label,
            root_index: rootContractionReductionBottleneck.root_index,
            factor: formatSmallNumber(rootContractionReductionBottleneck.factor),
          },
    parameter_localized_root_sheet_contraction_width_bottleneck:
      localizedRootContractionWidthBottleneck === null
        ? null
        : {
            term_label: localizedRootContractionWidthBottleneck.term_label,
            root_index: localizedRootContractionWidthBottleneck.root_index,
            theta_localization_index:
              localizedRootContractionWidthBottleneck.theta_localization_index,
            speed_localization_index:
              localizedRootContractionWidthBottleneck.speed_localization_index,
            width: formatSmallNumber(
              localizedRootContractionWidthBottleneck.width
            ),
          },
    parameter_localized_root_sheet_contraction_reduction_bottleneck:
      localizedRootContractionReductionBottleneck === null
        ? null
        : {
            term_label: localizedRootContractionReductionBottleneck.term_label,
            root_index: localizedRootContractionReductionBottleneck.root_index,
            theta_localization_index:
              localizedRootContractionReductionBottleneck
                .theta_localization_index,
            speed_localization_index:
              localizedRootContractionReductionBottleneck
                .speed_localization_index,
            factor: formatSmallNumber(
              localizedRootContractionReductionBottleneck.factor
            ),
          },
    interval_implication: passed
      ? "The direct outward-rounded source-derivative interval upper bound is below the row vertex maximum plus the finite overshoot budget for this subcell."
      : "The direct outward-rounded source-derivative interval upper bound is wider than the finite overshoot budget; the row still needs a sharper interval/Taylor backend or narrower root-sheet partition.",
    term_rows: termRows,
    status: passed
      ? DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS
      : DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_OPEN_STATUS,
  };
}

function buildParentCellPeakRows({
  parentRow,
  rootSubdivisions,
  parentStencilSamplesPerAxis,
  refinementSamplesPerSubcellAxis,
  machinePadding,
  directIntervalThetaLocalizationSubdivisions,
  directIntervalSpeedLocalizationSubdivisions,
  thetaLocalizedTaylorSubdivisions,
}) {
  const fineCount = fineGridCount({
    parentStencilSamplesPerAxis,
    refinementSamplesPerSubcellAxis,
  });
  const fineRows = buildFineGrid({ parentRow, rootSubdivisions, fineCount });
  const coarseStep = refinementSamplesPerSubcellAxis - 1;
  const coarseRows = [];
  const directedRoundedVertexDerivativeIntervalCache = new Map();
  for (
    let thetaIndex = 0;
    thetaIndex < parentStencilSamplesPerAxis;
    thetaIndex += 1
  ) {
    for (
      let speedIndex = 0;
      speedIndex < parentStencilSamplesPerAxis;
      speedIndex += 1
    ) {
      coarseRows.push(
        rowAt(fineRows, fineCount, thetaIndex * coarseStep, speedIndex * coarseStep)
      );
    }
  }

  const parentCenterDerivative = Number(parentRow.derivative_center);
  const parentAllowance = Number(parentRow.predecessor_local_variation_allowance);
  const parentCoarseMax = Math.max(...coarseRows.map((row) => row.derivative));
  const parentCoarseMin = Math.min(...coarseRows.map((row) => row.derivative));
  const parentObservedVariation = Math.max(
    0,
    parentCoarseMax - parentCenterDerivative
  );
  const parentPeakBudget = parentAllowance - parentObservedVariation;
  const parentFineSummary = summarizeRows(fineRows);
  const parentFineExcessOverCoarse = Math.max(
    0,
    parentFineSummary.max_derivative - parentCoarseMax
  );
  const parentPeakBudgetAfterFineReplay =
    parentPeakBudget - parentFineExcessOverCoarse;
  const subcellRows = [];

  for (
    let thetaSubcellIndex = 0;
    thetaSubcellIndex < parentStencilSamplesPerAxis - 1;
    thetaSubcellIndex += 1
  ) {
    for (
      let speedSubcellIndex = 0;
      speedSubcellIndex < parentStencilSamplesPerAxis - 1;
      speedSubcellIndex += 1
    ) {
      const thetaStart = thetaSubcellIndex * coarseStep;
      const speedStart = speedSubcellIndex * coarseStep;
      const thetaEnd = thetaStart + coarseStep;
      const speedEnd = speedStart + coarseStep;
      const thetaSubcellInterval = subintervalForIndex({
        left: Number(parentRow.theta_interval[0]),
        right: Number(parentRow.theta_interval[1]),
        index: thetaSubcellIndex,
        subcellCount: parentStencilSamplesPerAxis - 1,
      });
      const speedSubcellInterval = subintervalForIndex({
        left: Number(parentRow.speed_ratio_interval[0]),
        right: Number(parentRow.speed_ratio_interval[1]),
        index: speedSubcellIndex,
        subcellCount: parentStencilSamplesPerAxis - 1,
      });
      const vertexRows = [
        rowAt(fineRows, fineCount, thetaStart, speedStart),
        rowAt(fineRows, fineCount, thetaStart, speedEnd),
        rowAt(fineRows, fineCount, thetaEnd, speedStart),
        rowAt(fineRows, fineCount, thetaEnd, speedEnd),
      ];
      const refinedRows = [];
      for (let thetaIndex = thetaStart; thetaIndex <= thetaEnd; thetaIndex += 1) {
        for (
          let speedIndex = speedStart;
          speedIndex <= speedEnd;
          speedIndex += 1
        ) {
          refinedRows.push(rowAt(fineRows, fineCount, thetaIndex, speedIndex));
        }
      }
      const vertexSummary = summarizeRows(vertexRows);
      const refinedSummary = summarizeRows(refinedRows);
      const refinedExcessOverVertices = Math.max(
        0,
        refinedSummary.max_derivative - vertexSummary.max_derivative
      );
      const effectivePeakCeilingFromVertices = Math.min(
        parentPeakBudget,
        -vertexSummary.max_derivative
      );
      const effectivePeakCeilingAfterFineReplay = Math.min(
        parentPeakBudgetAfterFineReplay,
        -refinedSummary.max_derivative
      );
      const thetaWidth = thetaSubcellInterval[1] - thetaSubcellInterval[0];
      const speedWidth = speedSubcellInterval[1] - speedSubcellInterval[0];
      const bilinearCurvatureCondition =
        buildBilinearCurvatureSufficientCondition({
          thetaWidth,
          speedWidth,
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledPureCurvatureProbe = buildSampledPureCurvatureProbe({
        fineRows,
        fineCount,
        thetaStart,
        thetaEnd,
        speedStart,
        speedEnd,
        thetaStep: thetaWidth / coarseStep,
        speedStep: speedWidth / coarseStep,
        thetaScale: Number(
          bilinearCurvatureCondition.theta_second_partial_coefficient
        ),
        speedScale: Number(
          bilinearCurvatureCondition.speed_second_partial_coefficient
        ),
        overshootCeiling: effectivePeakCeilingAfterFineReplay,
      });
      const sampledAnalyticJetCurvatureWitness =
        buildSampledAnalyticJetCurvatureWitness({
          refinedRows,
          thetaScale: Number(
            bilinearCurvatureCondition.theta_second_partial_coefficient
          ),
          speedScale: Number(
            bilinearCurvatureCondition.speed_second_partial_coefficient
          ),
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledAnalyticJetEnvelopeBudget =
        buildSampledAnalyticJetEnvelopeBudget({
          sampledPureCurvatureProbe,
          sampledAnalyticJetCurvatureWitness,
          thetaScale: Number(
            bilinearCurvatureCondition.theta_second_partial_coefficient
          ),
          speedScale: Number(
            bilinearCurvatureCondition.speed_second_partial_coefficient
          ),
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledFourthJetCurvatureTransportWitness =
        buildSampledFourthJetCurvatureTransportWitness({
          sampledAnalyticJetCurvatureWitness,
          sampledAnalyticJetEnvelopeBudget,
          thetaWidth,
          speedWidth,
          refinementSamplesPerSubcellAxis,
          thetaScale: Number(
            bilinearCurvatureCondition.theta_second_partial_coefficient
          ),
          speedScale: Number(
            bilinearCurvatureCondition.speed_second_partial_coefficient
          ),
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledFifthJetCurvatureGradientTransportWitness =
        buildSampledFifthJetCurvatureGradientTransportWitness({
          sampledAnalyticJetCurvatureWitness,
          sampledAnalyticJetEnvelopeBudget,
          sampledFourthJetCurvatureTransportWitness,
          thetaWidth,
          speedWidth,
          refinementSamplesPerSubcellAxis,
          thetaScale: Number(
            bilinearCurvatureCondition.theta_second_partial_coefficient
          ),
          speedScale: Number(
            bilinearCurvatureCondition.speed_second_partial_coefficient
          ),
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledCurvatureInflationHeadroomCertificate =
        buildSampledCurvatureInflationHeadroomCertificate({
          sampledPureCurvatureProbe,
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledRootTubeRegularityProbe =
        buildSampledRootTubeRegularityProbe(refinedRows);
      const finiteIntervalRootTubeCertificateTarget =
        buildFiniteIntervalRootTubeCertificateTarget({
          sampledRootTubeRegularityProbe,
          speedRatioInterval: speedSubcellInterval,
        });
      const sampledFiniteRootTubeSignMarginCertificate =
        buildSampledFiniteRootTubeSignMarginCertificate({
          finiteIntervalRootTubeCertificateTarget,
          thetaInterval: thetaSubcellInterval,
          speedRatioInterval: speedSubcellInterval,
        });
      const machinePaddedSourceRootIntervalCertificate =
        buildMachinePaddedSourceRootIntervalCertificate({
          finiteIntervalRootTubeCertificateTarget,
          thetaInterval: thetaSubcellInterval,
          speedRatioInterval: speedSubcellInterval,
          machinePadding,
        });
      const directedRoundedSourceRootIntervalCertificate =
        buildDirectedRoundedSourceRootIntervalCertificate({
          finiteIntervalRootTubeCertificateTarget,
          thetaInterval: thetaSubcellInterval,
          speedRatioInterval: speedSubcellInterval,
        });
      const directIntervalDerivativeEnvelopeAttempt =
        buildDirectIntervalDerivativeEnvelopeAttempt({
          thetaInterval: thetaSubcellInterval,
          speedRatioInterval: speedSubcellInterval,
          directedRoundedSourceRootIntervalCertificate,
          vertexMaxDerivative: vertexSummary.max_derivative,
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
          directIntervalThetaLocalizationSubdivisions,
          directIntervalSpeedLocalizationSubdivisions,
        });
      const sampledThetaLocalizedTaylorUpperEnvelopeWitness =
        buildSampledThetaLocalizedTaylorUpperEnvelopeWitness({
          fineRows,
          fineCount,
          thetaStart,
          speedStart,
          speedEnd,
          coarseStep,
          thetaWidth,
          speedWidth,
          thetaLocalizedTaylorSubdivisions,
          vertexMaxDerivative: vertexSummary.max_derivative,
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
          sampledFifthJetCurvatureGradientTransportWitness,
          directIntervalDerivativeEnvelopeAttempt,
        });
      const directedRoundedThetaLocalizedTaylorIntervalizationAttempt =
        buildDirectedRoundedThetaLocalizedTaylorIntervalizationAttempt({
          fineRows,
          fineCount,
          thetaStart,
          speedStart,
          speedEnd,
          coarseStep,
          thetaWidth,
          speedWidth,
          thetaLocalizedTaylorSubdivisions,
          vertexMaxDerivative: vertexSummary.max_derivative,
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
          directedRoundedSourceRootIntervalCertificate,
          directIntervalDerivativeEnvelopeAttempt,
          sampledThetaLocalizedTaylorUpperEnvelopeWitness,
          vertexDerivativeIntervalCache:
            directedRoundedVertexDerivativeIntervalCache,
        });
      const curvatureIntervalJetTarget = buildCurvatureIntervalJetTarget({
        bilinearCurvatureCondition,
        sampledPureCurvatureProbe,
        sampledCurvatureInflationHeadroomCertificate,
        finiteIntervalRootTubeCertificateTarget,
        machinePaddedSourceRootIntervalCertificate,
        directedRoundedSourceRootIntervalCertificate,
        overshootCeiling: effectivePeakCeilingAfterFineReplay,
      });
      const certified =
        parentPeakBudget > 0 &&
        parentPeakBudgetAfterFineReplay > 0 &&
        effectivePeakCeilingAfterFineReplay > 0 &&
        refinedSummary.max_derivative < 0 &&
        vertexSummary.source_root_count_preserved &&
        vertexSummary.term_root_count_signature_preserved &&
        refinedSummary.source_root_count_preserved &&
        refinedSummary.term_root_count_signature_preserved &&
        refinedSummary.min_abs_F_delta > 0;

      subcellRows.push({
        subcell_row_id: `${parentRow.mesh_row_id}.peak-budget.${thetaSubcellIndex}.${speedSubcellIndex}`,
        parent_mesh_row_id: parentRow.mesh_row_id,
        theta_cell_index: parentRow.theta_cell_index,
        speed_cell_index: parentRow.speed_cell_index,
        theta_subcell_index: thetaSubcellIndex,
        speed_subcell_index: speedSubcellIndex,
        theta_interval: thetaSubcellInterval.map(formatSmallNumber),
        speed_ratio_interval: speedSubcellInterval.map(formatSmallNumber),
        theta_width: formatSmallNumber(thetaWidth),
        speed_ratio_width: formatSmallNumber(speedWidth),
        parent_derivative_center: formatSmallNumber(parentCenterDerivative),
        parent_local_variation_allowance: formatSmallNumber(parentAllowance),
        parent_coarse_stencil_max_derivative: formatSmallNumber(parentCoarseMax),
        parent_coarse_stencil_min_derivative: formatSmallNumber(parentCoarseMin),
        parent_peak_budget_mu: formatSmallNumber(parentPeakBudget),
        parent_refined_max_derivative: formatSmallNumber(
          parentFineSummary.max_derivative
        ),
        parent_refined_excess_over_coarse_stencil: formatSmallNumber(
          parentFineExcessOverCoarse
        ),
        parent_peak_budget_after_refined_replay: formatSmallNumber(
          parentPeakBudgetAfterFineReplay
        ),
        vertex_max_derivative: formatSmallNumber(vertexSummary.max_derivative),
        vertex_min_derivative: formatSmallNumber(vertexSummary.min_derivative),
        refined_max_derivative: formatSmallNumber(refinedSummary.max_derivative),
        refined_min_derivative: formatSmallNumber(refinedSummary.min_derivative),
        refined_excess_over_vertices: formatSmallNumber(
          refinedExcessOverVertices
        ),
        allowable_peak_overshoot_before_allowance_failure:
          formatSmallNumber(parentPeakBudget),
        allowable_peak_overshoot_after_refined_replay:
          formatSmallNumber(parentPeakBudgetAfterFineReplay),
        allowable_peak_overshoot_before_negativity_failure:
          formatSmallNumber(-vertexSummary.max_derivative),
        effective_peak_overshoot_ceiling_from_vertices: formatSmallNumber(
          effectivePeakCeilingFromVertices
        ),
        effective_peak_overshoot_ceiling_after_refined_replay:
          formatSmallNumber(effectivePeakCeilingAfterFineReplay),
        backend_input_inequality: {
          object: "sup_Q f_cross_prime",
          vertex_max_derivative: formatSmallNumber(vertexSummary.max_derivative),
          refined_max_derivative: formatSmallNumber(refinedSummary.max_derivative),
          required_overshoot_bound_less_than: formatSmallNumber(
            effectivePeakCeilingAfterFineReplay
          ),
          sufficient_condition:
            "prove sup_Q f_cross_prime <= vertex_max_derivative + epsilon_Q with epsilon_Q < required_overshoot_bound_less_than",
          protects_allowance: true,
          protects_derivative_negativity: true,
        },
        bilinear_curvature_sufficient_condition: bilinearCurvatureCondition,
        sampled_pure_curvature_probe: sampledPureCurvatureProbe,
        sampled_analytic_jet_curvature_witness:
          sampledAnalyticJetCurvatureWitness,
        sampled_analytic_jet_envelope_budget: sampledAnalyticJetEnvelopeBudget,
        sampled_fourth_jet_curvature_transport_witness:
          sampledFourthJetCurvatureTransportWitness,
        sampled_fifth_jet_curvature_gradient_transport_witness:
          sampledFifthJetCurvatureGradientTransportWitness,
        sampled_curvature_inflation_headroom_certificate:
          sampledCurvatureInflationHeadroomCertificate,
        sampled_root_tube_regularity_probe: sampledRootTubeRegularityProbe,
        finite_interval_root_tube_certificate_target:
          finiteIntervalRootTubeCertificateTarget,
        sampled_finite_root_tube_sign_margin_certificate:
          sampledFiniteRootTubeSignMarginCertificate,
        machine_padded_source_root_interval_certificate:
          machinePaddedSourceRootIntervalCertificate,
        directed_rounded_source_root_interval_certificate:
          directedRoundedSourceRootIntervalCertificate,
        direct_interval_derivative_envelope_attempt:
          directIntervalDerivativeEnvelopeAttempt,
        sampled_theta_localized_taylor_upper_envelope_witness:
          sampledThetaLocalizedTaylorUpperEnvelopeWitness,
        directed_rounded_theta_localized_taylor_intervalization_attempt:
          directedRoundedThetaLocalizedTaylorIntervalizationAttempt,
        curvature_interval_jet_target: curvatureIntervalJetTarget,
        source_root_counts: refinedSummary.source_root_counts,
        source_root_count_preserved: refinedSummary.source_root_count_preserved,
        term_root_count_signatures: refinedSummary.term_root_count_signatures,
        min_abs_F_delta: formatSmallNumber(refinedSummary.min_abs_F_delta),
        status: certified
          ? "i1-f1-bracket-local-derivative-peak-budget-subcell-certified"
          : "i1-f1-bracket-local-derivative-peak-budget-subcell-open",
      });
    }
  }

  return { fineSampleCount: fineRows.length, subcellRows };
}

function buildPeakBudgetRows({
  parentRows,
  rootSubdivisions,
  parentStencilSamplesPerAxis,
  refinementSamplesPerSubcellAxis,
  machinePadding,
  directIntervalThetaLocalizationSubdivisions,
  directIntervalSpeedLocalizationSubdivisions,
  thetaLocalizedTaylorSubdivisions,
  progressCallback = null,
}) {
  const allRows = [];
  let totalFineSampleCount = 0;
  const startedAt = Date.now();
  for (const [parentRowIndex, parentRow] of parentRows.entries()) {
    if (progressCallback) {
      progressCallback({
        stage: "peak-budget-parent-start",
        parent_row_index: parentRowIndex + 1,
        parent_row_count: parentRows.length,
        parent_mesh_row_id: parentRow.mesh_row_id,
        completed_subcell_row_count: allRows.length,
        elapsed_ms: Date.now() - startedAt,
      });
    }
    const { fineSampleCount, subcellRows } = buildParentCellPeakRows({
      parentRow,
      rootSubdivisions,
      parentStencilSamplesPerAxis,
      refinementSamplesPerSubcellAxis,
      machinePadding,
      directIntervalThetaLocalizationSubdivisions,
      directIntervalSpeedLocalizationSubdivisions,
      thetaLocalizedTaylorSubdivisions,
    });
    totalFineSampleCount += fineSampleCount;
    allRows.push(...subcellRows);
    if (progressCallback) {
      progressCallback({
        stage: "peak-budget-parent-complete",
        parent_row_index: parentRowIndex + 1,
        parent_row_count: parentRows.length,
        parent_mesh_row_id: parentRow.mesh_row_id,
        completed_subcell_row_count: allRows.length,
        elapsed_ms: Date.now() - startedAt,
      });
    }
  }
  return { allRows, totalFineSampleCount };
}

function buildPeakBudgetSummary({ rows, totalFineSampleCount }) {
  const minParentBudget = Math.min(
    ...rows.map((row) => Number(row.parent_peak_budget_mu))
  );
  const minBudgetAfterFineReplay = Math.min(
    ...rows.map((row) => Number(row.parent_peak_budget_after_refined_replay))
  );
  const minEffectiveCeiling = Math.min(
    ...rows.map((row) =>
      Number(row.effective_peak_overshoot_ceiling_after_refined_replay)
    )
  );
  const maxRefinedDerivative = Math.max(
    ...rows.map((row) => Number(row.refined_max_derivative))
  );
  const maxRefinedExcessOverVertices = Math.max(
    ...rows.map((row) => Number(row.refined_excess_over_vertices))
  );
  const maxParentFineExcessOverCoarse = Math.max(
    ...rows.map((row) =>
      Number(row.parent_refined_excess_over_coarse_stencil)
    )
  );
  const minAbsFDelta = Math.min(
    ...rows.map((row) => Number(row.min_abs_F_delta))
  );
  const minRootTubeAbsFDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta
      )
    )
  );
  const minRootTubePositiveDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_root_tube_regularity_probe.minimum_sampled_positive_delta
      )
    )
  );
  const minRootTubeSeparation = Math.min(
    ...rows
      .map((row) =>
        Number(
          row.sampled_root_tube_regularity_probe
            .minimum_sampled_root_tube_separation
        )
      )
      .filter((value) => Number.isFinite(value))
  );
  const maxRootBranchDeltaWidth = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_root_tube_regularity_probe
          .maximum_sampled_branch_delta_width
      )
    )
  );
  const minFiniteRootTubeTargetPadding = Math.min(
    ...rows.map((row) =>
      Number(
        row.finite_interval_root_tube_certificate_target
          .minimum_tube_padding_radius
      )
    )
  );
  const minFiniteRootTubeComplementWidth = Math.min(
    ...rows.map((row) =>
      Number(
        row.finite_interval_root_tube_certificate_target
          .minimum_complement_slab_width
      )
    )
  );
  const minSampledTubeEndpointAbsF = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_finite_root_tube_sign_margin_certificate
          .minimum_sampled_tube_endpoint_abs_F
      )
    )
  );
  const minSampledTubeEndpointSignProductMargin = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_finite_root_tube_sign_margin_certificate
          .minimum_sampled_tube_endpoint_sign_product_margin
      )
    )
  );
  const minSampledTubeFDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_finite_root_tube_sign_margin_certificate
          .minimum_sampled_tube_abs_F_delta
      )
    )
  );
  const minSampledComplementAbsF = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_finite_root_tube_sign_margin_certificate
          .minimum_sampled_complement_abs_F
      )
    )
  );
  const minMachineEndpointAbsF = Math.min(
    ...rows.map((row) =>
      Number(
        row.machine_padded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_abs_F
      )
    )
  );
  const minMachineEndpointSignProductMargin = Math.min(
    ...rows.map((row) =>
      Number(
        row.machine_padded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_sign_product_margin
      )
    )
  );
  const minMachineFDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.machine_padded_source_root_interval_certificate
          .minimum_tube_interval_abs_F_delta
      )
    )
  );
  const minMachineComplementAbsF = Math.min(
    ...rows.map((row) =>
      Number(
        row.machine_padded_source_root_interval_certificate
          .minimum_complement_interval_abs_F
      )
    )
  );
  const minDirectedEndpointAbsF = Math.min(
    ...rows.map((row) =>
      Number(
        row.directed_rounded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_abs_F
      )
    )
  );
  const minDirectedEndpointSignProductMargin = Math.min(
    ...rows.map((row) =>
      Number(
        row.directed_rounded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_sign_product_margin
      )
    )
  );
  const minDirectedFDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.directed_rounded_source_root_interval_certificate
          .minimum_tube_interval_abs_F_delta
      )
    )
  );
  const minDirectedComplementAbsF = Math.min(
    ...rows.map((row) =>
      Number(
        row.directed_rounded_source_root_interval_certificate
          .minimum_complement_interval_abs_F
      )
    )
  );
  const maxDirectIntervalDerivativeUpperOverrun = Math.max(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .direct_interval_upper_bound_overrun
      )
    )
  );
  const minDirectIntervalDerivativeUpperHeadroom = Math.min(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .direct_interval_upper_bound_headroom
      )
    )
  );
  const maxDirectIntervalDerivativeRemainderRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .direct_interval_remainder_ratio_to_required_bound
      )
    )
  );
  const maxDirectIntervalDerivativeWidth = Math.max(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_root_derivative_interval_width
      )
    )
  );
  const minDirectIntervalFDeltaAbsClearance = Math.min(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .minimum_F_delta_abs_clearance
      )
    )
  );
  const maxDirectIntervalDerivativeProtectedDeltaWidth = Math.max(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_protected_delta_width
      )
    )
  );
  const maxDirectIntervalDerivativeContractedDeltaWidth = Math.max(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_contracted_delta_width
      )
    )
  );
  const minDirectIntervalDerivativeRootSheetWidthReductionFactor = Math.min(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .minimum_root_sheet_width_reduction_factor
      )
    )
  );
  const maxParameterLocalizedRootSheetContractedWidth = Math.max(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_parameter_localized_contracted_delta_width
      )
    )
  );
  const minParameterLocalizedRootSheetWidthReductionFactor = Math.min(
    ...rows.map((row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .minimum_parameter_localized_root_sheet_width_reduction_factor
      )
    )
  );
  const minBalancedPureCurvatureBound = Math.min(
    ...rows.map((row) =>
      Number(
        row.bilinear_curvature_sufficient_condition
          .balanced_pure_curvature_bound
      )
    )
  );
  const maxSampledCurvatureRemainder = Math.max(
    ...rows.map((row) =>
      Number(row.sampled_pure_curvature_probe.sampled_bilinear_remainder)
    )
  );
  const maxSampledCurvatureRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_pure_curvature_probe
          .sampled_bilinear_remainder_ratio_to_required_bound
      )
    )
  );
  const maxSampledAnalyticJetCurvatureRemainder = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_curvature_witness
          .sampled_analytic_jet_bilinear_remainder
      )
    )
  );
  const maxSampledAnalyticJetCurvatureRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_curvature_witness
          .sampled_analytic_jet_remainder_ratio_to_required_bound
      )
    )
  );
  const maxAnalyticJetDerivativeResidual = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_curvature_witness
          .maximum_derivative_formula_residual_abs
      )
    )
  );
  const maxAnalyticJetRootEquationResidual = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_curvature_witness
          .maximum_root_equation_residual_abs
      )
    )
  );
  const maxSampledCurvatureEstimatorEnvelopeRemainder = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_envelope_budget
          .sampled_curvature_estimator_envelope_remainder
      )
    )
  );
  const maxSampledCurvatureEstimatorEnvelopeRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_envelope_budget
          .sampled_curvature_estimator_envelope_ratio_to_required_bound
      )
    )
  );
  const minSampledCurvatureEstimatorEnvelopeHeadroom = Math.min(
    ...rows.map((row) =>
      Number(row.sampled_analytic_jet_envelope_budget.remaining_envelope_headroom)
    )
  );
  const maxSampledFourthJetTransportRemainder = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fourth_jet_curvature_transport_witness
          .sampled_fourth_jet_transport_bilinear_remainder
      )
    )
  );
  const maxSampledFourthJetTransportRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fourth_jet_curvature_transport_witness
          .sampled_fourth_jet_transport_remainder_ratio_to_required_bound
      )
    )
  );
  const minSampledFourthJetTransportHeadroom = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_fourth_jet_curvature_transport_witness
          .remaining_transport_headroom
      )
    )
  );
  const maxSampledFourthJetThetaTransportRadius = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fourth_jet_curvature_transport_witness
          .theta_second_partial_transport_radius
      )
    )
  );
  const maxSampledFourthJetSpeedTransportRadius = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fourth_jet_curvature_transport_witness
          .speed_second_partial_transport_radius
      )
    )
  );
  const finiteFourthJetTransportInflationFactors = rows
    .map((row) =>
      Number(
        row.sampled_fourth_jet_curvature_transport_witness
          .maximum_uniform_sampled_fourth_jet_transport_inflation_factor_less_than
      )
    )
    .filter((value) => Number.isFinite(value));
  const minFourthJetTransportInflationFactor =
    finiteFourthJetTransportInflationFactors.length > 0
      ? Math.min(...finiteFourthJetTransportInflationFactors)
      : null;
  const maxSampledFifthJetTransportRemainder = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .sampled_fifth_jet_curvature_gradient_transport_bilinear_remainder
      )
    )
  );
  const maxSampledFifthJetTransportRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound
      )
    )
  );
  const minSampledFifthJetTransportHeadroom = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .remaining_fifth_jet_transport_headroom
      )
    )
  );
  const maxSampledFifthJetThetaGradientTransportRadius = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .theta_second_partial_gradient_transport_radius
      )
    )
  );
  const maxSampledFifthJetSpeedGradientTransportRadius = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .speed_second_partial_gradient_transport_radius
      )
    )
  );
  const finiteFifthJetTransportInflationFactors = rows
    .map((row) =>
      Number(
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .maximum_uniform_sampled_fifth_jet_transport_inflation_factor_less_than
      )
    )
    .filter((value) => Number.isFinite(value));
  const minFifthJetTransportInflationFactor =
    finiteFifthJetTransportInflationFactors.length > 0
      ? Math.min(...finiteFifthJetTransportInflationFactors)
      : null;
  const maxSampledThetaLocalizedTaylorRemainder = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .sampled_taylor_remainder
      )
    )
  );
  const maxSampledThetaLocalizedTaylorRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .sampled_theta_localized_taylor_remainder_ratio_to_required_bound
      )
    )
  );
  const minSampledThetaLocalizedTaylorHeadroom = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .sampled_theta_localized_taylor_upper_bound_headroom
      )
    )
  );
  const maxSampledThetaLocalizedTaylorOverrun = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .sampled_theta_localized_taylor_upper_bound_overrun
      )
    )
  );
  const maxSampledThetaLocalizedTaylorVertexExcess = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .maximum_theta_localized_taylor_vertex_excess_over_parent
      )
    )
  );
  const finiteDirectToSampledTaylorReductionFactors = rows
    .map((row) =>
      Number(
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .direct_to_sampled_taylor_remainder_ratio_reduction_factor
      )
    )
    .filter((value) => Number.isFinite(value));
  const minDirectToSampledTaylorReductionFactor =
    finiteDirectToSampledTaylorReductionFactors.length > 0
      ? Math.min(...finiteDirectToSampledTaylorReductionFactors)
      : null;
  const maxAnalyticVsSecondDifferenceRemainderGap = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_analytic_jet_envelope_budget
          .sampled_analytic_vs_second_difference_remainder_gap
      )
    )
  );
  const finiteAnalyticToFiniteDifferenceRatios = rows
    .map((row) =>
      Number(
        row.sampled_analytic_jet_envelope_budget
          .analytic_to_finite_difference_remainder_ratio
      )
    )
    .filter((value) => Number.isFinite(value));
  const maxAnalyticToFiniteDifferenceRemainderRatio =
    finiteAnalyticToFiniteDifferenceRatios.length > 0
      ? Math.max(...finiteAnalyticToFiniteDifferenceRatios)
      : null;
  const finiteEnvelopeInflationFactors = rows
    .map((row) =>
      Number(
        row.sampled_analytic_jet_envelope_budget
          .maximum_uniform_sampled_curvature_estimator_envelope_inflation_factor_less_than
      )
    )
    .filter((value) => Number.isFinite(value));
  const minEnvelopeInflationFactor =
    finiteEnvelopeInflationFactors.length > 0
      ? Math.min(...finiteEnvelopeInflationFactors)
      : null;
  const finiteCurvatureInflationFactors = rows
    .map(
      (row) =>
        row.sampled_curvature_inflation_headroom_certificate
          .maximum_uniform_sampled_curvature_inflation_factor_less_than
    )
    .filter((value) => value !== null)
    .map(Number)
    .filter((value) => Number.isFinite(value));
  const minCurvatureInflationFactor =
    finiteCurvatureInflationFactors.length > 0
      ? Math.min(...finiteCurvatureInflationFactors)
      : Infinity;
  const minCurvatureInflationReferenceMargin = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_curvature_inflation_headroom_certificate
          .margin_after_reference_uniform_inflation_factor
      )
    )
  );
  const curvatureIntervalJetTargetCount = rows.filter(
    (row) =>
      row.curvature_interval_jet_target.status ===
      CURVATURE_INTERVAL_JET_TARGET_STATUS
  ).length;
  const curvatureBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_pure_curvature_probe
        .sampled_bilinear_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_pure_curvature_probe
        .sampled_bilinear_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const analyticJetCurvatureBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_analytic_jet_curvature_witness
        .sampled_analytic_jet_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_analytic_jet_curvature_witness
        .sampled_analytic_jet_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const analyticJetDerivativeResidualBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.sampled_analytic_jet_curvature_witness
          .maximum_derivative_formula_residual_abs
      ) >
      Number(
        candidate.sampled_analytic_jet_curvature_witness
          .maximum_derivative_formula_residual_abs
      )
        ? row
        : candidate
  );
  const analyticJetEnvelopeBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_analytic_jet_envelope_budget
        .sampled_curvature_estimator_envelope_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_analytic_jet_envelope_budget
        .sampled_curvature_estimator_envelope_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const analyticJetEnvelopeGapBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_analytic_jet_envelope_budget
        .sampled_analytic_vs_second_difference_remainder_gap
    ) >
    Number(
      candidate.sampled_analytic_jet_envelope_budget
        .sampled_analytic_vs_second_difference_remainder_gap
    )
      ? row
      : candidate
  );
  const fourthJetTransportBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_fourth_jet_curvature_transport_witness
        .sampled_fourth_jet_transport_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_fourth_jet_curvature_transport_witness
        .sampled_fourth_jet_transport_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const fifthJetTransportBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_fifth_jet_curvature_gradient_transport_witness
        .sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_fifth_jet_curvature_gradient_transport_witness
        .sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const sampledThetaLocalizedTaylorBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_theta_localized_taylor_upper_envelope_witness
        .sampled_theta_localized_taylor_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_theta_localized_taylor_upper_envelope_witness
        .sampled_theta_localized_taylor_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const directedRoundedIntervalTaylorRatioValue = (row) => {
    const value = Number(
      row.directed_rounded_theta_localized_taylor_intervalization_attempt
        .directed_rounded_interval_taylor_remainder_ratio_to_required_bound
    );
    return Number.isFinite(value)
      ? value
      : row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .nonfinite_interval_taylor_tile_count > 0
        ? Infinity
        : -Infinity;
  };
  const directedRoundedIntervalTaylorRows = rows.map(
    (row) => row.directed_rounded_theta_localized_taylor_intervalization_attempt
  );
  const maxDirectedRoundedIntervalTaylorRatio = Math.max(
    ...rows.map(directedRoundedIntervalTaylorRatioValue)
  );
  const minDirectedRoundedIntervalTaylorHeadroom = Math.min(
    ...directedRoundedIntervalTaylorRows.map((attempt) =>
      Number(attempt.directed_rounded_interval_taylor_upper_bound_headroom)
    )
  );
  const maxDirectedRoundedIntervalTaylorOverrun = Math.max(
    ...directedRoundedIntervalTaylorRows.map((attempt) =>
      Number(attempt.directed_rounded_interval_taylor_upper_bound_overrun)
    )
  );
  const maxDirectedRoundedIntervalTaylorThetaBound = Math.max(
    ...directedRoundedIntervalTaylorRows.map((attempt) =>
      Number(attempt.maximum_theta_second_partial_interval_bound)
    )
  );
  const maxDirectedRoundedIntervalTaylorSpeedBound = Math.max(
    ...directedRoundedIntervalTaylorRows.map((attempt) =>
      Number(attempt.maximum_speed_second_partial_interval_bound)
    )
  );
  const maxIntervalTaylorMinusSampledTaylorUpperBound = Math.max(
    ...directedRoundedIntervalTaylorRows.map((attempt) =>
      Number(attempt.maximum_interval_taylor_minus_sampled_taylor_upper_bound)
    )
  );
  const totalDirectedRoundedIntervalTaylorNonfiniteTiles =
    directedRoundedIntervalTaylorRows.reduce(
      (sum, attempt) => sum + attempt.nonfinite_interval_taylor_tile_count,
      0
    );
  const directedRoundedIntervalTaylorBottleneck = rows.reduce(
    (candidate, row) =>
      directedRoundedIntervalTaylorRatioValue(row) >
      directedRoundedIntervalTaylorRatioValue(candidate)
        ? row
        : candidate
  );
  const curvatureInflationFactorValue = (row) => {
    const value =
      row.sampled_curvature_inflation_headroom_certificate
        .maximum_uniform_sampled_curvature_inflation_factor_less_than;
    return value === null ? Infinity : Number(value);
  };
  const curvatureInflationFactorBottleneck = rows.reduce((candidate, row) =>
    curvatureInflationFactorValue(row) <
    curvatureInflationFactorValue(candidate)
      ? row
      : candidate
  );
  const curvatureInflationMarginBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_curvature_inflation_headroom_certificate
        .margin_after_reference_uniform_inflation_factor
    ) <
    Number(
      candidate.sampled_curvature_inflation_headroom_certificate
        .margin_after_reference_uniform_inflation_factor
    )
      ? row
      : candidate
  );
  const rootTubeAbsFDeltaBottleneck = rows.reduce((candidate, row) =>
    Number(row.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta) <
    Number(candidate.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta)
      ? row
      : candidate
  );
  const rootTubeSeparationBottleneck = rows.reduce((candidate, row) => {
    const rowSeparation = Number(
      row.sampled_root_tube_regularity_probe.minimum_sampled_root_tube_separation
    );
    const candidateSeparation = Number(
      candidate.sampled_root_tube_regularity_probe
        .minimum_sampled_root_tube_separation
    );
    if (!Number.isFinite(rowSeparation)) {
      return candidate;
    }
    if (!Number.isFinite(candidateSeparation)) {
      return row;
    }
    return rowSeparation < candidateSeparation ? row : candidate;
  });
  const finiteRootTubePaddingBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.finite_interval_root_tube_certificate_target
        .minimum_tube_padding_radius
    ) <
    Number(
      candidate.finite_interval_root_tube_certificate_target
        .minimum_tube_padding_radius
    )
      ? row
      : candidate
  );
  const finiteRootTubeComplementBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.finite_interval_root_tube_certificate_target
        .minimum_complement_slab_width
    ) <
    Number(
      candidate.finite_interval_root_tube_certificate_target
        .minimum_complement_slab_width
    )
      ? row
      : candidate
  );
  const sampledTubeEndpointAbsFBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_finite_root_tube_sign_margin_certificate
        .minimum_sampled_tube_endpoint_abs_F
    ) <
    Number(
      candidate.sampled_finite_root_tube_sign_margin_certificate
        .minimum_sampled_tube_endpoint_abs_F
    )
      ? row
      : candidate
  );
  const sampledTubeEndpointSignProductBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.sampled_finite_root_tube_sign_margin_certificate
          .minimum_sampled_tube_endpoint_sign_product_margin
      ) <
      Number(
        candidate.sampled_finite_root_tube_sign_margin_certificate
          .minimum_sampled_tube_endpoint_sign_product_margin
      )
        ? row
        : candidate
  );
  const sampledTubeFDeltaBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_finite_root_tube_sign_margin_certificate
        .minimum_sampled_tube_abs_F_delta
    ) <
    Number(
      candidate.sampled_finite_root_tube_sign_margin_certificate
        .minimum_sampled_tube_abs_F_delta
    )
      ? row
      : candidate
  );
  const sampledComplementAbsFBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_finite_root_tube_sign_margin_certificate
        .minimum_sampled_complement_abs_F
    ) <
    Number(
      candidate.sampled_finite_root_tube_sign_margin_certificate
        .minimum_sampled_complement_abs_F
    )
      ? row
      : candidate
  );
  const machineEndpointAbsFBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.machine_padded_source_root_interval_certificate
        .minimum_tube_endpoint_interval_abs_F
    ) <
    Number(
      candidate.machine_padded_source_root_interval_certificate
        .minimum_tube_endpoint_interval_abs_F
    )
      ? row
      : candidate
  );
  const machineEndpointSignProductBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.machine_padded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_sign_product_margin
      ) <
      Number(
        candidate.machine_padded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_sign_product_margin
      )
        ? row
        : candidate
  );
  const machineFDeltaBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.machine_padded_source_root_interval_certificate
        .minimum_tube_interval_abs_F_delta
    ) <
    Number(
      candidate.machine_padded_source_root_interval_certificate
        .minimum_tube_interval_abs_F_delta
    )
      ? row
      : candidate
  );
  const machineComplementAbsFBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.machine_padded_source_root_interval_certificate
        .minimum_complement_interval_abs_F
    ) <
    Number(
      candidate.machine_padded_source_root_interval_certificate
        .minimum_complement_interval_abs_F
    )
      ? row
      : candidate
  );
  const directedEndpointAbsFBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.directed_rounded_source_root_interval_certificate
        .minimum_tube_endpoint_interval_abs_F
    ) <
    Number(
      candidate.directed_rounded_source_root_interval_certificate
        .minimum_tube_endpoint_interval_abs_F
    )
      ? row
      : candidate
  );
  const directedEndpointSignProductBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.directed_rounded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_sign_product_margin
      ) <
      Number(
        candidate.directed_rounded_source_root_interval_certificate
          .minimum_tube_endpoint_interval_sign_product_margin
      )
        ? row
        : candidate
  );
  const directedFDeltaBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.directed_rounded_source_root_interval_certificate
        .minimum_tube_interval_abs_F_delta
    ) <
    Number(
      candidate.directed_rounded_source_root_interval_certificate
        .minimum_tube_interval_abs_F_delta
    )
      ? row
      : candidate
  );
  const directedComplementAbsFBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.directed_rounded_source_root_interval_certificate
        .minimum_complement_interval_abs_F
    ) <
    Number(
      candidate.directed_rounded_source_root_interval_certificate
        .minimum_complement_interval_abs_F
    )
      ? row
      : candidate
  );
  const directIntervalDerivativeRatioBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.direct_interval_derivative_envelope_attempt
        .direct_interval_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.direct_interval_derivative_envelope_attempt
        .direct_interval_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const directIntervalDerivativeOverrunBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .direct_interval_upper_bound_overrun
      ) >
      Number(
        candidate.direct_interval_derivative_envelope_attempt
          .direct_interval_upper_bound_overrun
      )
        ? row
        : candidate
  );
  const directIntervalDerivativeWidthBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_root_derivative_interval_width
      ) >
      Number(
        candidate.direct_interval_derivative_envelope_attempt
          .maximum_root_derivative_interval_width
      )
        ? row
        : candidate
  );
  const directIntervalRootContractionWidthBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_contracted_delta_width
      ) >
      Number(
        candidate.direct_interval_derivative_envelope_attempt
          .maximum_contracted_delta_width
      )
        ? row
        : candidate
  );
  const directIntervalRootContractionReductionBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .minimum_root_sheet_width_reduction_factor
      ) <
      Number(
        candidate.direct_interval_derivative_envelope_attempt
          .minimum_root_sheet_width_reduction_factor
      )
        ? row
        : candidate
  );
  const parameterLocalizedRootContractionWidthBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .maximum_parameter_localized_contracted_delta_width
      ) >
      Number(
        candidate.direct_interval_derivative_envelope_attempt
          .maximum_parameter_localized_contracted_delta_width
      )
        ? row
        : candidate
  );
  const parameterLocalizedRootContractionReductionBottleneck = rows.reduce(
    (candidate, row) =>
      Number(
        row.direct_interval_derivative_envelope_attempt
          .minimum_parameter_localized_root_sheet_width_reduction_factor
      ) <
      Number(
        candidate.direct_interval_derivative_envelope_attempt
          .minimum_parameter_localized_root_sheet_width_reduction_factor
      )
        ? row
        : candidate
  );
  const bottleneck = rows.reduce((candidate, row) =>
    Number(row.effective_peak_overshoot_ceiling_after_refined_replay) <
    Number(candidate.effective_peak_overshoot_ceiling_after_refined_replay)
      ? row
      : candidate
  );
  const sourceRootCounts = [
    ...new Set(rows.flatMap((row) => row.source_root_counts)),
  ].sort((left, right) => left - right);
  const termRootCountSignatures = [
    ...new Set(rows.flatMap((row) => row.term_root_count_signatures)),
  ].sort();

  return {
    peak_budget_row_id:
      "I1.f1.bracket-local-derivative-peak-budget-reduction",
    successor_row: CLOSED_LOCAL_SUCCESSOR_ROW,
    subcell_row_count: rows.length,
    certified_subcell_row_count: rows.filter(
      (row) =>
        row.status ===
        "i1-f1-bracket-local-derivative-peak-budget-subcell-certified"
    ).length,
    total_refined_derivative_sample_count: totalFineSampleCount,
    minimum_parent_peak_budget_mu: formatSmallNumber(minParentBudget),
    minimum_peak_budget_after_refined_replay: formatSmallNumber(
      minBudgetAfterFineReplay
    ),
    minimum_effective_peak_overshoot_ceiling_after_refined_replay:
      formatSmallNumber(minEffectiveCeiling),
    maximum_refined_derivative: formatSmallNumber(maxRefinedDerivative),
    minimum_refined_derivative_clearance: formatSmallNumber(
      -maxRefinedDerivative
    ),
    maximum_refined_excess_over_vertices: formatSmallNumber(
      maxRefinedExcessOverVertices
    ),
    maximum_parent_refined_excess_over_coarse_stencil: formatSmallNumber(
      maxParentFineExcessOverCoarse
    ),
    minimum_balanced_pure_curvature_bound: formatSmallNumber(
      minBalancedPureCurvatureBound
    ),
    maximum_sampled_bilinear_curvature_remainder: formatSmallNumber(
      maxSampledCurvatureRemainder
    ),
    maximum_sampled_bilinear_curvature_remainder_ratio: formatSmallNumber(
      maxSampledCurvatureRatio
    ),
    sampled_bilinear_curvature_feasibility_subcell_count: rows.filter(
      (row) =>
        row.sampled_pure_curvature_probe.status ===
        "sampled-bilinear-curvature-feasibility-passed"
    ).length,
    sampled_analytic_jet_curvature_witness_subcell_count: rows.filter(
      (row) =>
        row.sampled_analytic_jet_curvature_witness.status ===
        SAMPLED_ANALYTIC_JET_CURVATURE_STATUS
    ).length,
    maximum_sampled_analytic_jet_bilinear_curvature_remainder:
      formatSmallNumber(maxSampledAnalyticJetCurvatureRemainder),
    maximum_sampled_analytic_jet_bilinear_curvature_remainder_ratio:
      formatSmallNumber(maxSampledAnalyticJetCurvatureRatio),
    maximum_sampled_analytic_jet_derivative_formula_residual_abs:
      formatSmallNumber(maxAnalyticJetDerivativeResidual),
    maximum_sampled_analytic_jet_root_equation_residual_abs:
      formatSmallNumber(maxAnalyticJetRootEquationResidual),
    sampled_analytic_jet_curvature_bottleneck_subcell_row_id:
      analyticJetCurvatureBottleneck.subcell_row_id,
    sampled_analytic_jet_derivative_residual_bottleneck_subcell_row_id:
      analyticJetDerivativeResidualBottleneck.subcell_row_id,
    sampled_analytic_jet_envelope_budget_subcell_count: rows.filter(
      (row) =>
        row.sampled_analytic_jet_envelope_budget.status ===
        SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS
    ).length,
    maximum_sampled_curvature_estimator_envelope_remainder:
      formatSmallNumber(maxSampledCurvatureEstimatorEnvelopeRemainder),
    maximum_sampled_curvature_estimator_envelope_remainder_ratio:
      formatSmallNumber(maxSampledCurvatureEstimatorEnvelopeRatio),
    minimum_sampled_curvature_estimator_envelope_headroom:
      formatSmallNumber(minSampledCurvatureEstimatorEnvelopeHeadroom),
    minimum_uniform_sampled_curvature_estimator_envelope_inflation_factor_less_than:
      formatSmallNumber(minEnvelopeInflationFactor),
    maximum_sampled_analytic_vs_second_difference_remainder_gap:
      formatSmallNumber(maxAnalyticVsSecondDifferenceRemainderGap),
    maximum_sampled_analytic_to_second_difference_remainder_ratio:
      formatSmallNumber(maxAnalyticToFiniteDifferenceRemainderRatio),
    sampled_curvature_estimator_envelope_bottleneck_subcell_row_id:
      analyticJetEnvelopeBottleneck.subcell_row_id,
    sampled_analytic_vs_second_difference_gap_bottleneck_subcell_row_id:
      analyticJetEnvelopeGapBottleneck.subcell_row_id,
    sampled_fourth_jet_curvature_transport_witness_subcell_count: rows.filter(
      (row) =>
        row.sampled_fourth_jet_curvature_transport_witness.status ===
        SAMPLED_FOURTH_JET_CURVATURE_TRANSPORT_STATUS
    ).length,
    maximum_sampled_fourth_jet_transport_bilinear_remainder:
      formatSmallNumber(maxSampledFourthJetTransportRemainder),
    maximum_sampled_fourth_jet_transport_remainder_ratio:
      formatSmallNumber(maxSampledFourthJetTransportRatio),
    minimum_sampled_fourth_jet_transport_headroom:
      formatSmallNumber(minSampledFourthJetTransportHeadroom),
    maximum_sampled_fourth_jet_theta_transport_radius:
      formatSmallNumber(maxSampledFourthJetThetaTransportRadius),
    maximum_sampled_fourth_jet_speed_transport_radius:
      formatSmallNumber(maxSampledFourthJetSpeedTransportRadius),
    minimum_uniform_sampled_fourth_jet_transport_inflation_factor_less_than:
      formatSmallNumber(minFourthJetTransportInflationFactor),
    sampled_fourth_jet_transport_bottleneck_subcell_row_id:
      fourthJetTransportBottleneck.subcell_row_id,
    sampled_fifth_jet_curvature_gradient_transport_witness_subcell_count:
      rows.filter(
        (row) =>
          row.sampled_fifth_jet_curvature_gradient_transport_witness.status ===
          SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS
      ).length,
    maximum_sampled_fifth_jet_transport_bilinear_remainder:
      formatSmallNumber(maxSampledFifthJetTransportRemainder),
    maximum_sampled_fifth_jet_transport_remainder_ratio:
      formatSmallNumber(maxSampledFifthJetTransportRatio),
    minimum_sampled_fifth_jet_transport_headroom:
      formatSmallNumber(minSampledFifthJetTransportHeadroom),
    maximum_sampled_fifth_jet_theta_gradient_transport_radius:
      formatSmallNumber(maxSampledFifthJetThetaGradientTransportRadius),
    maximum_sampled_fifth_jet_speed_gradient_transport_radius:
      formatSmallNumber(maxSampledFifthJetSpeedGradientTransportRadius),
    minimum_uniform_sampled_fifth_jet_transport_inflation_factor_less_than:
      formatSmallNumber(minFifthJetTransportInflationFactor),
    sampled_fifth_jet_transport_bottleneck_subcell_row_id:
      fifthJetTransportBottleneck.subcell_row_id,
    sampled_theta_localized_taylor_upper_envelope_attempt_subcell_count:
      rows.filter((row) =>
        [
          SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_STATUS,
          SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS,
        ].includes(
          row.sampled_theta_localized_taylor_upper_envelope_witness.status
        )
      ).length,
    sampled_theta_localized_taylor_upper_envelope_witness_subcell_count:
      rows.filter(
        (row) =>
          row.sampled_theta_localized_taylor_upper_envelope_witness.status ===
          SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_STATUS
      ).length,
    sampled_theta_localized_taylor_upper_envelope_open_subcell_count:
      rows.filter(
        (row) =>
          row.sampled_theta_localized_taylor_upper_envelope_witness.status ===
          SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS
      ).length,
    maximum_sampled_theta_localized_taylor_upper_envelope_remainder:
      formatSmallNumber(maxSampledThetaLocalizedTaylorRemainder),
    maximum_sampled_theta_localized_taylor_upper_envelope_remainder_ratio:
      formatSmallNumber(maxSampledThetaLocalizedTaylorRatio),
    minimum_sampled_theta_localized_taylor_upper_envelope_headroom:
      formatSmallNumber(minSampledThetaLocalizedTaylorHeadroom),
    maximum_sampled_theta_localized_taylor_upper_envelope_overrun:
      formatSmallNumber(maxSampledThetaLocalizedTaylorOverrun),
    maximum_sampled_theta_localized_taylor_vertex_excess_over_parent:
      formatSmallNumber(maxSampledThetaLocalizedTaylorVertexExcess),
    minimum_direct_to_sampled_theta_localized_taylor_remainder_ratio_reduction_factor:
      formatSmallNumber(minDirectToSampledTaylorReductionFactor),
    sampled_theta_localized_taylor_bottleneck_subcell_row_id:
      sampledThetaLocalizedTaylorBottleneck.subcell_row_id,
    directed_rounded_theta_localized_taylor_intervalization_attempt_subcell_count:
      rows.filter((row) =>
        [
          DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS,
          DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS,
        ].includes(
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .status
        )
      ).length,
    directed_rounded_theta_localized_taylor_intervalization_passed_subcell_count:
      rows.filter(
        (row) =>
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .status ===
          DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS
      ).length,
    directed_rounded_theta_localized_taylor_intervalization_open_subcell_count:
      rows.filter(
        (row) =>
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .status ===
          DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_OPEN_STATUS
      ).length,
    directed_rounded_theta_localized_taylor_intervalization_nonfinite_subcell_count:
      rows.filter(
        (row) =>
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .nonfinite_interval_taylor_tile_count > 0
      ).length,
    directed_rounded_theta_localized_taylor_intervalization_nonfinite_tile_count:
      totalDirectedRoundedIntervalTaylorNonfiniteTiles,
    maximum_directed_rounded_theta_localized_taylor_intervalization_remainder_ratio:
      formatSmallNumber(maxDirectedRoundedIntervalTaylorRatio),
    minimum_directed_rounded_theta_localized_taylor_intervalization_headroom:
      formatSmallNumber(minDirectedRoundedIntervalTaylorHeadroom),
    maximum_directed_rounded_theta_localized_taylor_intervalization_overrun:
      formatSmallNumber(maxDirectedRoundedIntervalTaylorOverrun),
    maximum_directed_rounded_theta_localized_taylor_interval_theta_second_partial_bound:
      formatSmallNumber(maxDirectedRoundedIntervalTaylorThetaBound),
    maximum_directed_rounded_theta_localized_taylor_interval_speed_second_partial_bound:
      formatSmallNumber(maxDirectedRoundedIntervalTaylorSpeedBound),
    maximum_interval_taylor_minus_sampled_theta_localized_taylor_upper_bound:
      formatSmallNumber(maxIntervalTaylorMinusSampledTaylorUpperBound),
    directed_rounded_theta_localized_taylor_intervalization_bottleneck_subcell_row_id:
      directedRoundedIntervalTaylorBottleneck.subcell_row_id,
    sampled_curvature_inflation_headroom_subcell_count: rows.filter(
      (row) =>
        row.sampled_curvature_inflation_headroom_certificate.status ===
        "sampled-curvature-inflation-headroom-passed"
    ).length,
    sampled_curvature_headroom_reference_factor:
      SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR,
    minimum_uniform_sampled_curvature_inflation_factor_less_than:
      formatSmallNumber(minCurvatureInflationFactor),
    minimum_sampled_curvature_headroom_margin_after_reference_factor:
      formatSmallNumber(minCurvatureInflationReferenceMargin),
    curvature_interval_jet_target_subcell_count:
      curvatureIntervalJetTargetCount,
    sampled_bilinear_curvature_bottleneck_subcell_row_id:
      curvatureBottleneck.subcell_row_id,
    sampled_curvature_inflation_factor_bottleneck_subcell_row_id:
      curvatureInflationFactorBottleneck.subcell_row_id,
    sampled_curvature_inflation_margin_bottleneck_subcell_row_id:
      curvatureInflationMarginBottleneck.subcell_row_id,
    minimum_sampled_abs_F_delta: formatSmallNumber(minAbsFDelta),
    minimum_sampled_root_tube_abs_F_delta:
      formatSmallNumber(minRootTubeAbsFDelta),
    minimum_sampled_root_tube_positive_delta:
      formatSmallNumber(minRootTubePositiveDelta),
    minimum_sampled_root_tube_separation:
      formatSmallNumber(minRootTubeSeparation),
    maximum_sampled_root_branch_delta_width:
      formatSmallNumber(maxRootBranchDeltaWidth),
    sampled_root_tube_regularity_feasibility_subcell_count: rows.filter(
      (row) =>
        row.sampled_root_tube_regularity_probe.status ===
        "sampled-root-tube-regularity-feasibility-passed"
    ).length,
    sampled_root_tube_abs_F_delta_bottleneck_subcell_row_id:
      rootTubeAbsFDeltaBottleneck.subcell_row_id,
    sampled_root_tube_separation_bottleneck_subcell_row_id:
      rootTubeSeparationBottleneck.subcell_row_id,
    finite_interval_root_tube_certificate_target_subcell_count: rows.filter(
      (row) =>
        row.finite_interval_root_tube_certificate_target.status ===
        "finite-interval-root-tube-certificate-target-emitted"
    ).length,
    total_retained_root_tube_target_count: rows.reduce(
      (sum, row) =>
        sum + row.finite_interval_root_tube_certificate_target.retained_tube_count,
      0
    ),
    total_complement_slab_target_count: rows.reduce(
      (sum, row) =>
        sum +
        row.finite_interval_root_tube_certificate_target.complement_slab_count,
      0
    ),
    minimum_finite_root_tube_target_padding_radius: formatSmallNumber(
      minFiniteRootTubeTargetPadding
    ),
    minimum_finite_root_tube_target_complement_width: formatSmallNumber(
      minFiniteRootTubeComplementWidth
    ),
    finite_root_tube_padding_bottleneck_subcell_row_id:
      finiteRootTubePaddingBottleneck.subcell_row_id,
    finite_root_tube_complement_bottleneck_subcell_row_id:
      finiteRootTubeComplementBottleneck.subcell_row_id,
    sampled_finite_root_tube_sign_margin_certificate_subcell_count:
      rows.filter(
        (row) =>
          row.sampled_finite_root_tube_sign_margin_certificate.status ===
          "sampled-finite-root-tube-sign-margin-certificate-passed"
      ).length,
    total_sampled_tube_endpoint_sign_pair_count: rows.reduce(
      (sum, row) =>
        sum +
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_tube_endpoint_sign_pair_count,
      0
    ),
    total_sampled_tube_endpoint_F_sample_count: rows.reduce(
      (sum, row) =>
        sum +
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_tube_endpoint_F_sample_count,
      0
    ),
    total_sampled_tube_F_delta_sample_count: rows.reduce(
      (sum, row) =>
        sum +
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_tube_F_delta_sample_count,
      0
    ),
    total_sampled_complement_F_sample_count: rows.reduce(
      (sum, row) =>
        sum +
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_complement_F_sample_count,
      0
    ),
    minimum_sampled_tube_endpoint_abs_F: formatSmallNumber(
      minSampledTubeEndpointAbsF
    ),
    minimum_sampled_tube_endpoint_sign_product_margin: formatSmallNumber(
      minSampledTubeEndpointSignProductMargin
    ),
    minimum_sampled_tube_F_delta_abs: formatSmallNumber(minSampledTubeFDelta),
    minimum_sampled_complement_abs_F: formatSmallNumber(
      minSampledComplementAbsF
    ),
    sampled_tube_endpoint_abs_F_bottleneck_subcell_row_id:
      sampledTubeEndpointAbsFBottleneck.subcell_row_id,
    sampled_tube_endpoint_sign_product_bottleneck_subcell_row_id:
      sampledTubeEndpointSignProductBottleneck.subcell_row_id,
    sampled_tube_F_delta_bottleneck_subcell_row_id:
      sampledTubeFDeltaBottleneck.subcell_row_id,
    sampled_complement_abs_F_bottleneck_subcell_row_id:
      sampledComplementAbsFBottleneck.subcell_row_id,
    machine_padded_source_root_interval_certificate_subcell_count:
      rows.filter(
        (row) =>
          row.machine_padded_source_root_interval_certificate.status ===
          "machine-padded-source-root-interval-certificate-passed"
      ).length,
    total_machine_padded_tube_endpoint_sign_pair_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.machine_padded_source_root_interval_certificate
          .tube_endpoint_sign_pair_interval_count,
      0
    ),
    total_machine_padded_tube_endpoint_F_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.machine_padded_source_root_interval_certificate
          .tube_endpoint_F_interval_count,
      0
    ),
    total_machine_padded_tube_F_delta_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.machine_padded_source_root_interval_certificate
          .tube_F_delta_interval_count,
      0
    ),
    total_machine_padded_complement_F_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.machine_padded_source_root_interval_certificate
          .complement_F_interval_count,
      0
    ),
    minimum_machine_padded_tube_endpoint_interval_abs_F: formatSmallNumber(
      minMachineEndpointAbsF
    ),
    minimum_machine_padded_tube_endpoint_interval_sign_product_margin:
      formatSmallNumber(minMachineEndpointSignProductMargin),
    minimum_machine_padded_tube_interval_F_delta_abs:
      formatSmallNumber(minMachineFDelta),
    minimum_machine_padded_complement_interval_abs_F: formatSmallNumber(
      minMachineComplementAbsF
    ),
    machine_padded_tube_endpoint_interval_abs_F_bottleneck_subcell_row_id:
      machineEndpointAbsFBottleneck.subcell_row_id,
    machine_padded_tube_endpoint_interval_sign_product_bottleneck_subcell_row_id:
      machineEndpointSignProductBottleneck.subcell_row_id,
    machine_padded_tube_interval_F_delta_bottleneck_subcell_row_id:
      machineFDeltaBottleneck.subcell_row_id,
    machine_padded_complement_interval_abs_F_bottleneck_subcell_row_id:
      machineComplementAbsFBottleneck.subcell_row_id,
    directed_rounded_source_root_interval_certificate_subcell_count:
      rows.filter(
        (row) =>
          row.directed_rounded_source_root_interval_certificate.status ===
          DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS
      ).length,
    total_directed_rounded_tube_endpoint_sign_pair_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.directed_rounded_source_root_interval_certificate
          .tube_endpoint_sign_pair_interval_count,
      0
    ),
    total_directed_rounded_tube_endpoint_F_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.directed_rounded_source_root_interval_certificate
          .tube_endpoint_F_interval_count,
      0
    ),
    total_directed_rounded_tube_F_delta_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.directed_rounded_source_root_interval_certificate
          .tube_F_delta_interval_count,
      0
    ),
    total_directed_rounded_complement_F_interval_count: rows.reduce(
      (sum, row) =>
        sum +
        row.directed_rounded_source_root_interval_certificate
          .complement_F_interval_count,
      0
    ),
    minimum_directed_rounded_tube_endpoint_interval_abs_F: formatSmallNumber(
      minDirectedEndpointAbsF
    ),
    minimum_directed_rounded_tube_endpoint_interval_sign_product_margin:
      formatSmallNumber(minDirectedEndpointSignProductMargin),
    minimum_directed_rounded_tube_interval_F_delta_abs:
      formatSmallNumber(minDirectedFDelta),
    minimum_directed_rounded_complement_interval_abs_F: formatSmallNumber(
      minDirectedComplementAbsF
    ),
    directed_rounded_tube_endpoint_interval_abs_F_bottleneck_subcell_row_id:
      directedEndpointAbsFBottleneck.subcell_row_id,
    directed_rounded_tube_endpoint_interval_sign_product_bottleneck_subcell_row_id:
      directedEndpointSignProductBottleneck.subcell_row_id,
    directed_rounded_tube_interval_F_delta_bottleneck_subcell_row_id:
      directedFDeltaBottleneck.subcell_row_id,
    directed_rounded_complement_interval_abs_F_bottleneck_subcell_row_id:
      directedComplementAbsFBottleneck.subcell_row_id,
    direct_interval_derivative_envelope_attempt_subcell_count: rows.filter(
      (row) =>
        row.direct_interval_derivative_envelope_attempt.status ===
          DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS ||
        row.direct_interval_derivative_envelope_attempt.status ===
          DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_OPEN_STATUS
    ).length,
    direct_interval_derivative_envelope_passed_subcell_count: rows.filter(
      (row) =>
        row.direct_interval_derivative_envelope_attempt.status ===
        DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS
    ).length,
    direct_interval_derivative_envelope_open_subcell_count: rows.filter(
      (row) =>
        row.direct_interval_derivative_envelope_attempt.status ===
        DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_OPEN_STATUS
    ).length,
    total_direct_interval_derivative_protected_tube_subdivision_count:
      rows.reduce(
        (sum, row) =>
          sum +
          row.direct_interval_derivative_envelope_attempt
            .protected_tube_subdivision_count,
        0
      ),
    total_direct_interval_derivative_source_evaluation_count: rows.reduce(
      (sum, row) =>
        sum +
        row.direct_interval_derivative_envelope_attempt
          .source_derivative_interval_evaluation_count,
      0
    ),
    fixed_sign_F_delta_root_sheet_contraction_subcell_count: rows.filter(
      (row) =>
        row.direct_interval_derivative_envelope_attempt
          .emits_fixed_sign_F_delta_root_sheet_contractions === true
    ).length,
    fixed_sign_F_delta_root_sheet_contraction_passed_subcell_count:
      rows.filter(
        (row) =>
          row.direct_interval_derivative_envelope_attempt
            .all_root_sheet_contractions_passed === true
      ).length,
    total_fixed_sign_F_delta_root_sheet_contraction_count: rows.reduce(
      (sum, row) =>
        sum +
        row.direct_interval_derivative_envelope_attempt
          .total_root_sheet_contraction_count,
      0
    ),
    maximum_fixed_sign_F_delta_protected_root_interval_width:
      formatSmallNumber(maxDirectIntervalDerivativeProtectedDeltaWidth),
    maximum_fixed_sign_F_delta_contracted_root_interval_width:
      formatSmallNumber(maxDirectIntervalDerivativeContractedDeltaWidth),
    minimum_fixed_sign_F_delta_root_sheet_width_reduction_factor:
      formatSmallNumber(
        minDirectIntervalDerivativeRootSheetWidthReductionFactor
      ),
    fixed_sign_F_delta_contraction_width_bottleneck_subcell_row_id:
      directIntervalRootContractionWidthBottleneck.subcell_row_id,
    fixed_sign_F_delta_contraction_reduction_bottleneck_subcell_row_id:
      directIntervalRootContractionReductionBottleneck.subcell_row_id,
    parameter_localized_direct_interval_envelope_subcell_count: rows.filter(
      (row) =>
        row.direct_interval_derivative_envelope_attempt
          .uses_parameter_localized_direct_interval_envelope === true
    ).length,
    parameter_localized_root_sheet_contraction_passed_subcell_count:
      rows.filter(
        (row) =>
          row.direct_interval_derivative_envelope_attempt
            .all_parameter_localized_root_sheet_contractions_passed === true
      ).length,
    total_parameter_localized_root_sheet_contraction_count: rows.reduce(
      (sum, row) =>
        sum +
        row.direct_interval_derivative_envelope_attempt
          .total_parameter_localized_root_sheet_contraction_count,
      0
    ),
    maximum_parameter_localized_contracted_root_interval_width:
      formatSmallNumber(maxParameterLocalizedRootSheetContractedWidth),
    minimum_parameter_localized_root_sheet_width_reduction_factor:
      formatSmallNumber(minParameterLocalizedRootSheetWidthReductionFactor),
    parameter_localized_contraction_width_bottleneck_subcell_row_id:
      parameterLocalizedRootContractionWidthBottleneck.subcell_row_id,
    parameter_localized_contraction_reduction_bottleneck_subcell_row_id:
      parameterLocalizedRootContractionReductionBottleneck.subcell_row_id,
    minimum_direct_interval_derivative_F_delta_abs_clearance:
      formatSmallNumber(minDirectIntervalFDeltaAbsClearance),
    maximum_direct_interval_derivative_upper_bound_overrun:
      formatSmallNumber(maxDirectIntervalDerivativeUpperOverrun),
    minimum_direct_interval_derivative_upper_bound_headroom:
      formatSmallNumber(minDirectIntervalDerivativeUpperHeadroom),
    maximum_direct_interval_derivative_remainder_ratio:
      formatSmallNumber(maxDirectIntervalDerivativeRemainderRatio),
    maximum_direct_interval_derivative_root_interval_width:
      formatSmallNumber(maxDirectIntervalDerivativeWidth),
    direct_interval_derivative_ratio_bottleneck_subcell_row_id:
      directIntervalDerivativeRatioBottleneck.subcell_row_id,
    direct_interval_derivative_overrun_bottleneck_subcell_row_id:
      directIntervalDerivativeOverrunBottleneck.subcell_row_id,
    direct_interval_derivative_width_bottleneck_subcell_row_id:
      directIntervalDerivativeWidthBottleneck.subcell_row_id,
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    term_root_count_signatures: termRootCountSignatures,
    bottleneck_subcell_row_id: bottleneck.subcell_row_id,
    bottleneck_parent_mesh_row_id: bottleneck.parent_mesh_row_id,
    status:
      rows.every(
        (row) =>
          row.status ===
            "i1-f1-bracket-local-derivative-peak-budget-subcell-certified" &&
          row.sampled_pure_curvature_probe.status ===
            "sampled-bilinear-curvature-feasibility-passed" &&
          row.sampled_analytic_jet_curvature_witness.status ===
            SAMPLED_ANALYTIC_JET_CURVATURE_STATUS &&
          row.sampled_analytic_jet_envelope_budget.status ===
            SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS &&
          row.sampled_fourth_jet_curvature_transport_witness.status ===
            SAMPLED_FOURTH_JET_CURVATURE_TRANSPORT_STATUS &&
          row.sampled_fifth_jet_curvature_gradient_transport_witness.status ===
            SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS &&
          row.sampled_curvature_inflation_headroom_certificate.status ===
            "sampled-curvature-inflation-headroom-passed" &&
          row.curvature_interval_jet_target.status ===
            CURVATURE_INTERVAL_JET_TARGET_STATUS &&
          row.sampled_root_tube_regularity_probe.status ===
            "sampled-root-tube-regularity-feasibility-passed" &&
          row.finite_interval_root_tube_certificate_target.status ===
            "finite-interval-root-tube-certificate-target-emitted" &&
          row.sampled_finite_root_tube_sign_margin_certificate.status ===
            "sampled-finite-root-tube-sign-margin-certificate-passed" &&
          row.machine_padded_source_root_interval_certificate.status ===
            "machine-padded-source-root-interval-certificate-passed" &&
          row.directed_rounded_source_root_interval_certificate.status ===
            DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .status ===
            DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS
      ) && minEffectiveCeiling > 0
        ? PEAK_BUDGET_SUMMARY_STATUS
        : "i1-f1-bracket-local-derivative-peak-budget-reduction-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const endpointSpeedSampleCount = Number.parseInt(
    options.endpointSpeedSampleCount ?? DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    10
  );
  const zeroBranchSpeedSampleCount = Number.parseInt(
    options.zeroBranchSpeedSampleCount ?? DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    10
  );
  const derivativeThetaSampleCount = Number.parseInt(
    options.derivativeThetaSampleCount ?? DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    10
  );
  const thetaCellCount = Number.parseInt(
    options.thetaCellCount ?? DEFAULT_THETA_CELL_COUNT,
    10
  );
  const speedCellCount = Number.parseInt(
    options.speedCellCount ?? DEFAULT_SPEED_CELL_COUNT,
    10
  );
  const parentStencilSamplesPerAxis = Number.parseInt(
    options.parentStencilSamplesPerAxis ??
      DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    10
  );
  const refinementSamplesPerSubcellAxis = Number.parseInt(
    options.refinementSamplesPerSubcellAxis ??
      DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    10
  );
  const endpointPadding = Number(
    options.endpointPadding ?? DEFAULT_ENDPOINT_PADDING
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  const bisectionTolerance = Number(
    options.bisectionTolerance ?? DEFAULT_BISECTION_TOLERANCE
  );
  const directIntervalThetaLocalizationSubdivisions = Number.parseInt(
    options.directIntervalThetaLocalizationSubdivisions ??
      DEFAULT_DIRECT_INTERVAL_THETA_LOCALIZATION_SUBDIVISIONS,
    10
  );
  const directIntervalSpeedLocalizationSubdivisions = Number.parseInt(
    options.directIntervalSpeedLocalizationSubdivisions ??
      DEFAULT_DIRECT_INTERVAL_SPEED_LOCALIZATION_SUBDIVISIONS,
    10
  );
  const thetaLocalizedTaylorSubdivisions = Number.parseInt(
    options.thetaLocalizedTaylorSubdivisions ??
      Math.max(1, refinementSamplesPerSubcellAxis - 1),
    10
  );
  const progressCallback =
    typeof options.progressCallback === "function"
      ? options.progressCallback
      : null;

  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (
    !Number.isInteger(endpointSpeedSampleCount) ||
    endpointSpeedSampleCount < 3
  ) {
    throw new Error("endpointSpeedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(zeroBranchSpeedSampleCount) ||
    zeroBranchSpeedSampleCount < 3
  ) {
    throw new Error("zeroBranchSpeedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(derivativeThetaSampleCount) ||
    derivativeThetaSampleCount < 8
  ) {
    throw new Error("derivativeThetaSampleCount must be an integer >= 8");
  }
  if (!Number.isInteger(thetaCellCount) || thetaCellCount < 4) {
    throw new Error("thetaCellCount must be an integer >= 4");
  }
  if (!Number.isInteger(speedCellCount) || speedCellCount < 2) {
    throw new Error("speedCellCount must be an integer >= 2");
  }
  if (
    !Number.isInteger(parentStencilSamplesPerAxis) ||
    parentStencilSamplesPerAxis < 3 ||
    parentStencilSamplesPerAxis % 2 === 0
  ) {
    throw new Error("parentStencilSamplesPerAxis must be an odd integer >= 3");
  }
  if (
    !Number.isInteger(refinementSamplesPerSubcellAxis) ||
    refinementSamplesPerSubcellAxis < 2
  ) {
    throw new Error("refinementSamplesPerSubcellAxis must be an integer >= 2");
  }
  if (!Number.isFinite(endpointPadding) || endpointPadding <= 0) {
    throw new Error("endpointPadding must be positive");
  }
  if (!Number.isFinite(machinePadding) || machinePadding <= 0) {
    throw new Error("machinePadding must be positive");
  }
  if (!Number.isFinite(bisectionTolerance) || bisectionTolerance <= 0) {
    throw new Error("bisectionTolerance must be positive");
  }
  if (
    !Number.isInteger(directIntervalThetaLocalizationSubdivisions) ||
    directIntervalThetaLocalizationSubdivisions < 1
  ) {
    throw new Error(
      "directIntervalThetaLocalizationSubdivisions must be an integer >= 1"
    );
  }
  if (
    !Number.isInteger(directIntervalSpeedLocalizationSubdivisions) ||
    directIntervalSpeedLocalizationSubdivisions < 1
  ) {
    throw new Error(
      "directIntervalSpeedLocalizationSubdivisions must be an integer >= 1"
    );
  }
  if (
    !Number.isInteger(thetaLocalizedTaylorSubdivisions) ||
    thetaLocalizedTaylorSubdivisions < 1
  ) {
    throw new Error(
      "thetaLocalizedTaylorSubdivisions must be an integer >= 1"
    );
  }
  if ((refinementSamplesPerSubcellAxis - 1) % thetaLocalizedTaylorSubdivisions !== 0) {
    throw new Error(
      "thetaLocalizedTaylorSubdivisions must divide refinementSamplesPerSubcellAxis - 1"
    );
  }

  const variationCertificate =
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      {
        rootSubdivisions,
        endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount,
        thetaCellCount,
        speedCellCount,
        stencilSamplesPerAxis: parentStencilSamplesPerAxis,
        endpointPadding,
        machinePadding,
        bisectionTolerance,
      }
    );
  const variationCertificateErrors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      variationCertificate
    );
  const { allRows, totalFineSampleCount } = buildPeakBudgetRows({
    parentRows: variationCertificate.stencil_rows,
    rootSubdivisions,
    parentStencilSamplesPerAxis,
    refinementSamplesPerSubcellAxis,
    machinePadding,
    directIntervalThetaLocalizationSubdivisions,
    directIntervalSpeedLocalizationSubdivisions,
    thetaLocalizedTaylorSubdivisions,
    progressCallback,
  });
  const peakBudgetSummary = buildPeakBudgetSummary({
    rows: allRows,
    totalFineSampleCount,
  });
  const directIntervalDerivativeEnvelopeAttempted =
    peakBudgetSummary.direct_interval_derivative_envelope_attempt_subcell_count ===
    peakBudgetSummary.subcell_row_count;
  const directIntervalDerivativeEnvelopeCertified =
    peakBudgetSummary.direct_interval_derivative_envelope_passed_subcell_count ===
    peakBudgetSummary.subcell_row_count;
  const sampledThetaLocalizedTaylorUpperEnvelopeCertified =
    peakBudgetSummary
      .sampled_theta_localized_taylor_upper_envelope_witness_subcell_count ===
    peakBudgetSummary.subcell_row_count;
  const directedRoundedTaylorIntervalizationAttempted =
    peakBudgetSummary
      .directed_rounded_theta_localized_taylor_intervalization_attempt_subcell_count ===
    peakBudgetSummary.subcell_row_count;
  const directedRoundedTaylorUpperEnvelopeCertified =
    peakBudgetSummary
      .directed_rounded_theta_localized_taylor_intervalization_passed_subcell_count ===
      peakBudgetSummary.subcell_row_count &&
    peakBudgetSummary
      .directed_rounded_theta_localized_taylor_intervalization_open_subcell_count ===
      0 &&
    peakBudgetSummary
      .directed_rounded_theta_localized_taylor_intervalization_nonfinite_subcell_count ===
      0;
  const certified =
    variationCertificateErrors.length === 0 &&
    variationCertificate.artifact_claim
      .certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
      true &&
    peakBudgetSummary.status ===
      PEAK_BUDGET_SUMMARY_STATUS;
  const openQuantityNames = [
    "interval_derivative_enclosure",
    "I1_f1_full_interval_zero_isolation",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ];

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.md",
    variation_certificate_check: {
      schema: variationCertificate.schema,
      valid: variationCertificateErrors.length === 0,
      errors: variationCertificateErrors,
      theory_status: variationCertificate.result.theory_status,
      retained_branch: variationCertificate.result.retained_branch,
      first_successor_row: variationCertificate.result.first_successor_row,
      certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate:
        variationCertificate.artifact_claim
          .certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
        true,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        variationCertificate.artifact_claim
          .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        true,
      summary: variationCertificate.variation_summary,
    },
    peak_budget_parameters: {
      receiver_label: "1+",
      zero_row_id: "I1.f1",
      theta_domain: "[0,H/4]",
      bracket_interval: [
        formatSmallNumber(I1_LEFT_ENDPOINT),
        formatSmallNumber(I1_RIGHT_ENDPOINT),
      ],
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      endpoint_speed_sample_count: endpointSpeedSampleCount,
      zero_branch_speed_sample_count: zeroBranchSpeedSampleCount,
      derivative_theta_sample_count: derivativeThetaSampleCount,
      theta_cell_count: thetaCellCount,
      speed_cell_count: speedCellCount,
      parent_stencil_samples_per_axis: parentStencilSamplesPerAxis,
      refinement_samples_per_subcell_axis: refinementSamplesPerSubcellAxis,
      fine_grid_samples_per_parent_axis: fineGridCount({
        parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis,
      }),
      root_tube_sign_margin_parameter_sample_count:
        ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
        ROOT_TUBE_PARAMETER_GRID_COORDINATES.length,
      root_tube_F_delta_samples_per_parameter:
        ROOT_TUBE_F_DELTA_COORDINATES.length,
      complement_delta_samples_per_slab: COMPLEMENT_DELTA_SAMPLE_COUNT,
      source_interval_F_delta_subdivision_count:
        SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
      direct_interval_theta_localization_subdivision_count:
        directIntervalThetaLocalizationSubdivisions,
      direct_interval_speed_ratio_localization_subdivision_count:
        directIntervalSpeedLocalizationSubdivisions,
      direct_interval_parameter_localized_tiles_per_root:
        directIntervalThetaLocalizationSubdivisions *
        directIntervalSpeedLocalizationSubdivisions,
      theta_localized_taylor_subdivision_count:
        thetaLocalizedTaylorSubdivisions,
      source_interval_complement_subdivision_count:
        SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS,
      sampled_curvature_headroom_reference_factor:
        SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR,
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
    },
    i1_bracket_local_derivative_peak_budget_theorem: buildPeakBudgetTheorem(),
    backend_input_formula_sheet: buildBackendFormulaSheet(),
    peak_budget_rows: allRows,
    peak_budget_summary: peakBudgetSummary,
    interval_profile_boundary: {
      certifies_I1_f1_bracket_local_derivative_peak_budget_reduction:
        certified,
      converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds:
        certified,
      certifies_refined_sampled_peak_audit: certified,
      certifies_sampled_bilinear_curvature_feasibility: certified,
      certifies_sampled_analytic_jet_curvature_witness: certified,
      certifies_sampled_analytic_jet_envelope_budget: certified,
      certifies_sampled_fourth_jet_curvature_transport_witness: certified,
      certifies_sampled_fifth_jet_curvature_gradient_transport_witness:
        certified,
      certifies_sampled_theta_localized_taylor_upper_envelope_witness:
        sampledThetaLocalizedTaylorUpperEnvelopeCertified,
      emits_directed_rounded_theta_localized_taylor_intervalization_attempt:
        directedRoundedTaylorIntervalizationAttempted,
      certifies_sampled_curvature_inflation_headroom: certified,
      certifies_curvature_interval_jet_target: certified,
      certifies_sampled_root_tube_regularity_feasibility: certified,
      certifies_finite_interval_root_tube_certificate_target: certified,
      certifies_sampled_finite_root_tube_sign_margin_certificate: certified,
      certifies_machine_padded_source_root_interval_certificate: certified,
      certifies_machine_padded_interval_source_root_tube_isolation: certified,
      certifies_machine_padded_interval_source_root_sheet_continuation: certified,
      certifies_machine_padded_interval_F_delta_lower_bound: certified,
      certifies_machine_padded_interval_complement_exclusion: certified,
      certifies_directed_rounded_source_root_interval_certificate: certified,
      certifies_directed_rounded_interval_source_root_tube_isolation: certified,
      certifies_directed_rounded_interval_source_root_sheet_continuation:
        certified,
      certifies_directed_rounded_interval_F_delta_lower_bound: certified,
      certifies_directed_rounded_interval_complement_exclusion: certified,
      emits_direct_interval_derivative_envelope_attempt:
        directIntervalDerivativeEnvelopeAttempted,
      emits_parameter_localized_direct_interval_envelope:
        peakBudgetSummary.parameter_localized_direct_interval_envelope_subcell_count ===
        peakBudgetSummary.subcell_row_count,
      certifies_monotone_root_sheet_range_contraction:
        peakBudgetSummary.fixed_sign_F_delta_root_sheet_contraction_passed_subcell_count ===
        peakBudgetSummary.subcell_row_count,
      certifies_parameter_localized_monotone_root_sheet_range_contraction:
        peakBudgetSummary.parameter_localized_root_sheet_contraction_passed_subcell_count ===
        peakBudgetSummary.subcell_row_count,
      certifies_direct_interval_derivative_upper_envelope:
        directIntervalDerivativeEnvelopeCertified,
      certifies_directed_rounded_taylor_upper_envelope:
        directedRoundedTaylorUpperEnvelopeCertified,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        directedRoundedTaylorUpperEnvelopeCertified,
      certifies_interval_second_partial_curvature_enclosure:
        directedRoundedTaylorUpperEnvelopeCertified,
      certifies_interval_root_tube_isolation: certified,
      certifies_interval_root_sheet_continuation: certified,
      certifies_interval_F_delta_lower_bound: certified,
      certifies_interval_complement_exclusion: certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "parameter-localized direct interval derivative envelope is executable but too wide on the recorded bottleneck subcells",
        "full I1.f1 interval zero isolation",
        "interval critical exhaustion",
        "interval quadrature enclosure",
        "retained branch status",
      ],
      open_quantity_names: openQuantityNames,
      status:
        "i1-f1-bracket-local-directed-rounded-taylor-derivative-variation-certified-zero-isolation-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_f1_bracket_local_derivative_peak_budget_reduction: certified,
      converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds:
        certified,
      certifies_refined_sampled_peak_audit: certified,
      certifies_sampled_bilinear_curvature_feasibility: certified,
      certifies_sampled_analytic_jet_curvature_witness: certified,
      certifies_sampled_analytic_jet_envelope_budget: certified,
      certifies_sampled_fourth_jet_curvature_transport_witness: certified,
      certifies_sampled_fifth_jet_curvature_gradient_transport_witness:
        certified,
      certifies_sampled_theta_localized_taylor_upper_envelope_witness:
        sampledThetaLocalizedTaylorUpperEnvelopeCertified,
      emits_directed_rounded_theta_localized_taylor_intervalization_attempt:
        directedRoundedTaylorIntervalizationAttempted,
      certifies_sampled_curvature_inflation_headroom: certified,
      certifies_curvature_interval_jet_target: certified,
      certifies_sampled_root_tube_regularity_feasibility: certified,
      certifies_finite_interval_root_tube_certificate_target: certified,
      certifies_sampled_finite_root_tube_sign_margin_certificate: certified,
      certifies_machine_padded_source_root_interval_certificate: certified,
      certifies_machine_padded_interval_source_root_tube_isolation: certified,
      certifies_machine_padded_interval_source_root_sheet_continuation: certified,
      certifies_machine_padded_interval_F_delta_lower_bound: certified,
      certifies_machine_padded_interval_complement_exclusion: certified,
      certifies_directed_rounded_source_root_interval_certificate: certified,
      certifies_directed_rounded_interval_source_root_tube_isolation: certified,
      certifies_directed_rounded_interval_source_root_sheet_continuation:
        certified,
      certifies_directed_rounded_interval_F_delta_lower_bound: certified,
      certifies_directed_rounded_interval_complement_exclusion: certified,
      emits_direct_interval_derivative_envelope_attempt:
        directIntervalDerivativeEnvelopeAttempted,
      emits_parameter_localized_direct_interval_envelope:
        peakBudgetSummary.parameter_localized_direct_interval_envelope_subcell_count ===
        peakBudgetSummary.subcell_row_count,
      certifies_monotone_root_sheet_range_contraction:
        peakBudgetSummary.fixed_sign_F_delta_root_sheet_contraction_passed_subcell_count ===
        peakBudgetSummary.subcell_row_count,
      certifies_parameter_localized_monotone_root_sheet_range_contraction:
        peakBudgetSummary.parameter_localized_root_sheet_contraction_passed_subcell_count ===
        peakBudgetSummary.subcell_row_count,
      certifies_direct_interval_derivative_upper_envelope:
        directIntervalDerivativeEnvelopeCertified,
      certifies_directed_rounded_taylor_upper_envelope:
        directedRoundedTaylorUpperEnvelopeCertified,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        directedRoundedTaylorUpperEnvelopeCertified,
      certifies_interval_second_partial_curvature_enclosure:
        directedRoundedTaylorUpperEnvelopeCertified,
      certifies_interval_root_tube_isolation: certified,
      certifies_interval_root_sheet_continuation: certified,
      certifies_interval_F_delta_lower_bound: certified,
      certifies_interval_complement_exclusion: certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantity_names: openQuantityNames,
      retained_branch: false,
      claim_level:
        "I1.f1 bracket-local directed-rounded Taylor derivative-variation closure on the finite peak-budget packet: directed-rounded source-root interval isolation, parameter-localized monotone root-sheet contractions, directed-rounded vertex derivative anchors, interval root-sheet pure-curvature jets, and theta-localized Taylor upper envelopes prove all finite subcell overshoot budgets. Full I1.f1 zero isolation, interval critical exhaustion, interval quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: certified
        ? RESULT_THEORY_STATUS
        : "source-atlas-aware-i1-f1-bracket-local-derivative-peak-budget-reduction-open",
      first_successor_row: CLOSED_LOCAL_SUCCESSOR_ROW,
      residual_subobligation:
        "compose the now-closed bracket-local directed-rounded Taylor derivative-variation row into full I1.f1 interval zero isolation, interval critical exhaustion, interval quadrature, and retained-branch decision rows",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1.f1 directed-rounding derivative-variation burden is now closed on the finite peak-budget packet: every theta-localized tile has directed-rounded source-root isolation, a directed-rounded vertex derivative anchor, interval root-sheet pure-curvature bounds, and a Taylor upper envelope below the finite overshoot budget. The direct interval derivative envelope remains too wide as a diagnostic, but the interval/Taylor backend closes the row. Full I1.f1 zero isolation, interval critical exhaustion, interval quadrature, and retained branch status remain open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
  artifact
) {
  const errors = [];
  const directIntervalThetaLocalizationSubdivisions = Number(
    artifact?.peak_budget_parameters
      ?.direct_interval_theta_localization_subdivision_count
  );
  const directIntervalSpeedLocalizationSubdivisions = Number(
    artifact?.peak_budget_parameters
      ?.direct_interval_speed_ratio_localization_subdivision_count
  );
  const directIntervalParameterTileCount =
    directIntervalThetaLocalizationSubdivisions *
    directIntervalSpeedLocalizationSubdivisions;
  const thetaLocalizedTaylorSubdivisions = Number(
    artifact?.peak_budget_parameters?.theta_localized_taylor_subdivision_count
  );
  const refinementSamplesPerSubcellAxis = Number(
    artifact?.peak_budget_parameters?.refinement_samples_per_subcell_axis
  );
  const thetaLocalizedTaylorGridStep =
    (refinementSamplesPerSubcellAxis - 1) / thetaLocalizedTaylorSubdivisions;
  const expectedDirectIntervalSourceEvaluationCount =
    EXPECTED_SOURCE_ROOT_COUNT *
    SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS *
    directIntervalParameterTileCount;
  const expectedParameterLocalizedRootSheetContractionCount =
    EXPECTED_SOURCE_ROOT_COUNT * directIntervalParameterTileCount;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA,
    "schema must match I1 bracket local derivative peak budget reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 bracket local derivative peak budget reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.variation_certificate_check?.valid === true &&
      artifact?.variation_certificate_check
        ?.certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
        true &&
      artifact?.variation_certificate_check
        ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        false &&
      artifact?.variation_certificate_check?.first_successor_row ===
        REDUCED_LOCAL_SUCCESSOR_ROW,
    "variation predecessor must validate and leave directed rounding open",
    errors
  );
  assertField(
    artifact?.peak_budget_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 peak budget reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.peak_budget_parameters?.speed_band === undefined &&
      artifact?.peak_budget_parameters?.speed_window === undefined &&
      artifact?.peak_budget_parameters?.speed_min === undefined &&
      artifact?.peak_budget_parameters?.speed_max === undefined,
    "peak budget parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Number.isInteger(directIntervalThetaLocalizationSubdivisions) &&
      directIntervalThetaLocalizationSubdivisions >= 1 &&
      Number.isInteger(directIntervalSpeedLocalizationSubdivisions) &&
      directIntervalSpeedLocalizationSubdivisions >= 1 &&
      artifact?.peak_budget_parameters
        ?.direct_interval_parameter_localized_tiles_per_root ===
        directIntervalParameterTileCount,
    "direct interval localization parameters must be positive integer subdivisions",
    errors
  );
  assertField(
    Number.isInteger(thetaLocalizedTaylorSubdivisions) &&
      thetaLocalizedTaylorSubdivisions >= 1 &&
      Number.isInteger(thetaLocalizedTaylorGridStep) &&
      thetaLocalizedTaylorGridStep >= 1,
    "theta-localized sampled Taylor parameters must be positive integer subdivisions aligned to the refined grid",
    errors
  );
  assertField(
    Array.isArray(artifact?.peak_budget_rows) &&
      artifact.peak_budget_rows.length ===
        artifact?.peak_budget_parameters?.theta_cell_count *
          artifact?.peak_budget_parameters?.speed_cell_count *
          (artifact?.peak_budget_parameters?.parent_stencil_samples_per_axis - 1) *
          (artifact?.peak_budget_parameters?.parent_stencil_samples_per_axis - 1) &&
      artifact.peak_budget_rows.every(
        (row) =>
          row.status ===
            "i1-f1-bracket-local-derivative-peak-budget-subcell-certified" &&
          row.source_root_count_preserved === true &&
          row.source_root_counts?.length === 1 &&
          row.source_root_counts?.[0] === EXPECTED_SOURCE_ROOT_COUNT &&
          row.term_root_count_signatures?.length === 1 &&
          row.term_root_count_signatures?.[0] === EXPECTED_TERM_SIGNATURE &&
          row.theta_interval?.length === 2 &&
          row.speed_ratio_interval?.length === 2 &&
          Number(row.theta_width) > 0 &&
          Number(row.speed_ratio_width) > 0 &&
          row.backend_input_inequality?.object === "sup_Q f_cross_prime" &&
          Number(
            row.backend_input_inequality
              ?.required_overshoot_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          row.bilinear_curvature_sufficient_condition?.function ===
            "g=f_cross_prime" &&
          Number(
            row.bilinear_curvature_sufficient_condition
              ?.balanced_pure_curvature_bound
          ) > 0 &&
          Number(
            row.bilinear_curvature_sufficient_condition
              ?.required_error_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          row.sampled_pure_curvature_probe?.status ===
            "sampled-bilinear-curvature-feasibility-passed" &&
          row.sampled_pure_curvature_probe
            ?.certifies_interval_second_partial_bounds === false &&
          row.sampled_analytic_jet_curvature_witness?.status ===
            SAMPLED_ANALYTIC_JET_CURVATURE_STATUS &&
          row.sampled_analytic_jet_curvature_witness?.witness_type ===
            "sampled-analytic-jet-curvature-witness" &&
          row.sampled_analytic_jet_curvature_witness
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.sampled_analytic_jet_curvature_witness
            ?.certifies_sampled_analytic_jet_curvature_witness === true &&
          row.sampled_analytic_jet_curvature_witness
            ?.analytic_jet_sample_count > 0 &&
          Number(
            row.sampled_analytic_jet_curvature_witness
              ?.sampled_analytic_jet_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(
            row.sampled_analytic_jet_curvature_witness
              ?.maximum_derivative_formula_residual_abs
          ) < 1e-7 &&
          Number(
            row.sampled_analytic_jet_curvature_witness
              ?.maximum_root_equation_residual_abs
          ) < 1e-9 &&
          row.sampled_analytic_jet_envelope_budget?.status ===
            SAMPLED_ANALYTIC_JET_ENVELOPE_STATUS &&
          row.sampled_analytic_jet_envelope_budget?.budget_type ===
            "sampled-analytic-jet-envelope-budget" &&
          row.sampled_analytic_jet_envelope_budget
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.sampled_analytic_jet_envelope_budget
            ?.certifies_sampled_analytic_jet_envelope_budget === true &&
          Number(
            row.sampled_analytic_jet_envelope_budget
              ?.required_error_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          Number(
            row.sampled_analytic_jet_envelope_budget
              ?.sampled_curvature_estimator_envelope_ratio_to_required_bound
          ) < 1 &&
          Number(
            row.sampled_analytic_jet_envelope_budget?.remaining_envelope_headroom
          ) > 0 &&
          Number(
            row.sampled_analytic_jet_envelope_budget
              ?.sampled_curvature_estimator_envelope_remainder
          ) +
            1e-14 >=
            Number(
              row.sampled_pure_curvature_probe?.sampled_bilinear_remainder
            ) &&
          Number(
            row.sampled_analytic_jet_envelope_budget
              ?.sampled_curvature_estimator_envelope_remainder
          ) +
            1e-14 >=
            Number(
              row.sampled_analytic_jet_curvature_witness
                ?.sampled_analytic_jet_bilinear_remainder
            ) &&
          row.sampled_fourth_jet_curvature_transport_witness?.status ===
            SAMPLED_FOURTH_JET_CURVATURE_TRANSPORT_STATUS &&
          row.sampled_fourth_jet_curvature_transport_witness?.witness_type ===
            "sampled-fourth-jet-curvature-transport-witness" &&
          row.sampled_fourth_jet_curvature_transport_witness
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.sampled_fourth_jet_curvature_transport_witness
            ?.certifies_sampled_fourth_jet_curvature_transport_witness ===
            true &&
          Number(
            row.sampled_fourth_jet_curvature_transport_witness
              ?.sampled_fourth_jet_transport_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(
            row.sampled_fourth_jet_curvature_transport_witness
              ?.remaining_transport_headroom
          ) > 0 &&
          Number(
            row.sampled_fourth_jet_curvature_transport_witness
              ?.transported_theta_second_partial_sample_max_abs
          ) >=
            Number(
              row.sampled_analytic_jet_envelope_budget
                ?.theta_second_partial_sample_envelope_max_abs
            ) &&
          Number(
            row.sampled_fourth_jet_curvature_transport_witness
              ?.transported_speed_second_partial_sample_max_abs
          ) >=
            Number(
              row.sampled_analytic_jet_envelope_budget
                ?.speed_second_partial_sample_envelope_max_abs
            ) &&
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            ?.status ===
            SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS &&
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            ?.witness_type ===
            "sampled-fifth-jet-curvature-gradient-transport-witness" &&
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            ?.certifies_sampled_fifth_jet_curvature_gradient_transport_witness ===
            true &&
          Number(
            row.sampled_fifth_jet_curvature_gradient_transport_witness
              ?.sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(
            row.sampled_fifth_jet_curvature_gradient_transport_witness
              ?.remaining_fifth_jet_transport_headroom
          ) > 0 &&
          Number(
            row.sampled_fifth_jet_curvature_gradient_transport_witness
              ?.theta_second_partial_theta_theta_hessian_sample_max_abs
          ) > 0 &&
          Number(
            row.sampled_fifth_jet_curvature_gradient_transport_witness
              ?.speed_second_partial_speed_speed_hessian_sample_max_abs
          ) > 0 &&
          Number(
            row.sampled_fifth_jet_curvature_gradient_transport_witness
              ?.fifth_jet_transported_theta_second_partial_sample_max_abs
          ) >=
            Number(
              row.sampled_fourth_jet_curvature_transport_witness
                ?.transported_theta_second_partial_sample_max_abs
            ) &&
          Number(
            row.sampled_fifth_jet_curvature_gradient_transport_witness
              ?.fifth_jet_transported_speed_second_partial_sample_max_abs
          ) >=
            Number(
              row.sampled_fourth_jet_curvature_transport_witness
                ?.transported_speed_second_partial_sample_max_abs
            ) &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.status ===
            SAMPLED_THETA_LOCALIZED_TAYLOR_UPPER_ENVELOPE_STATUS &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.witness_type ===
            "sampled-theta-localized-taylor-upper-envelope-witness" &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.attempt_type ===
            "sampled-theta-localized-taylor-upper-envelope-attempt" &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.target_function === "g=f_cross_prime" &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.certifies_sampled_theta_localized_taylor_upper_envelope_witness ===
            true &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.certifies_directed_rounded_taylor_upper_envelope === false &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.certifies_direct_interval_derivative_upper_envelope === false &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.certifies_interval_derivative_enclosure === false &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
            false &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.consumes_sampled_fifth_jet_curvature_gradient_transport_witness_status ===
            SAMPLED_FIFTH_JET_CURVATURE_GRADIENT_TRANSPORT_STATUS &&
          [
            DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS,
            DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_OPEN_STATUS,
          ].includes(
            row.sampled_theta_localized_taylor_upper_envelope_witness
              ?.consumes_direct_interval_derivative_envelope_attempt_status
          ) &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.theta_localized_taylor_subdivision_count ===
            thetaLocalizedTaylorSubdivisions &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.theta_localized_taylor_tile_count ===
            thetaLocalizedTaylorSubdivisions &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.theta_localized_taylor_grid_step ===
            thetaLocalizedTaylorGridStep &&
          row.sampled_theta_localized_taylor_upper_envelope_witness
            ?.tile_rows?.length === thetaLocalizedTaylorSubdivisions &&
          row.sampled_theta_localized_taylor_upper_envelope_witness?.tile_rows?.every(
            (tileRow) =>
              Number(tileRow.sampled_taylor_upper_bound_headroom) > 0 &&
              Number(
                tileRow.sampled_taylor_remainder_ratio_to_required_bound
              ) < 1
          ) &&
          Number(
            row.sampled_theta_localized_taylor_upper_envelope_witness
              ?.sampled_theta_localized_taylor_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(
            row.sampled_theta_localized_taylor_upper_envelope_witness
              ?.sampled_theta_localized_taylor_upper_bound_headroom
          ) > 0 &&
          Number(
            row.sampled_theta_localized_taylor_upper_envelope_witness
              ?.sampled_theta_localized_taylor_upper_bound_overrun
          ) === 0 &&
          Number(
            row.sampled_theta_localized_taylor_upper_envelope_witness
              ?.sampled_taylor_remainder
          ) > 0 &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.status ===
            DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.attempt_type ===
            "directed-rounded-theta-localized-taylor-intervalization-attempt" &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.target_function === "g=f_cross_prime" &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.certifies_directed_rounded_taylor_upper_envelope === true &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.certifies_interval_second_partial_curvature_enclosure === true &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.certifies_interval_derivative_enclosure === false &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
            false &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.theta_localized_taylor_subdivision_count ===
            thetaLocalizedTaylorSubdivisions &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.theta_localized_taylor_tile_count ===
            thetaLocalizedTaylorSubdivisions &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.nonfinite_interval_taylor_tile_count === 0 &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.all_interval_jet_curvature_bounds_finite === true &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.all_interval_root_sheet_contractions_passed === true &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.all_interval_F_delta_signs_match_expected === true &&
          Number(
            row.directed_rounded_theta_localized_taylor_intervalization_attempt
              ?.directed_rounded_interval_taylor_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(
            row.directed_rounded_theta_localized_taylor_intervalization_attempt
              ?.directed_rounded_interval_taylor_upper_bound_headroom
          ) > 0 &&
          Number(
            row.directed_rounded_theta_localized_taylor_intervalization_attempt
              ?.directed_rounded_interval_taylor_upper_bound_overrun
          ) === 0 &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            ?.tile_rows?.length === thetaLocalizedTaylorSubdivisions &&
          row.directed_rounded_theta_localized_taylor_intervalization_attempt?.tile_rows?.every(
            (tileRow) =>
              tileRow.status ===
                DIRECTED_ROUNDED_INTERVAL_TAYLOR_UPPER_ENVELOPE_STATUS &&
              Number(
                tileRow.directed_rounded_interval_taylor_remainder_ratio_to_required_bound
              ) < 1 &&
              Number(
                tileRow.directed_rounded_interval_taylor_upper_bound_headroom
              ) > 0 &&
              Number(
                tileRow.directed_rounded_interval_taylor_upper_bound_overrun
              ) === 0 &&
              Number(tileRow.theta_second_partial_bound) > 0 &&
              Number(tileRow.speed_second_partial_bound) > 0 &&
              tileRow.vertex_derivative_rows?.length === 4 &&
              tileRow.vertex_derivative_rows.every(
                (vertexRow) =>
                  vertexRow.directed_rounded_derivative_interval?.length ===
                    2 &&
                  Number(
                    vertexRow.directed_rounded_derivative_upper_bound
                  ) ===
                    Number(
                      vertexRow.directed_rounded_derivative_interval[1]
                    ) &&
                  vertexRow.all_interval_root_sheet_contractions_passed ===
                    true &&
                  vertexRow.all_interval_F_delta_signs_match_expected === true
              )
          ) &&
          row.sampled_curvature_inflation_headroom_certificate?.status ===
            "sampled-curvature-inflation-headroom-passed" &&
          row.sampled_curvature_inflation_headroom_certificate
            ?.certifies_interval_second_partial_curvature_enclosure === false &&
          row.sampled_curvature_inflation_headroom_certificate
            ?.certifies_sampled_curvature_inflation_headroom === true &&
          row.sampled_curvature_inflation_headroom_certificate
            ?.reference_uniform_inflation_factor ===
            SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR &&
          (row.sampled_curvature_inflation_headroom_certificate
            ?.maximum_uniform_sampled_curvature_inflation_factor_unbounded ===
            true ||
            Number(
              row.sampled_curvature_inflation_headroom_certificate
                ?.maximum_uniform_sampled_curvature_inflation_factor_less_than
            ) > SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR) &&
          Number(
            row.sampled_curvature_inflation_headroom_certificate
              ?.margin_after_reference_uniform_inflation_factor
          ) > 0 &&
          row.curvature_interval_jet_target?.status ===
            CURVATURE_INTERVAL_JET_TARGET_STATUS &&
          row.curvature_interval_jet_target?.target_type ===
            "curvature-interval-jet-target" &&
          row.curvature_interval_jet_target?.target_function ===
            "g=f_cross_prime" &&
          row.curvature_interval_jet_target
            ?.certifies_curvature_interval_jet_target === true &&
          row.curvature_interval_jet_target
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.curvature_interval_jet_target
            ?.certifies_interval_derivative_enclosure === false &&
          row.curvature_interval_jet_target
            ?.consumes_finite_interval_root_tube_certificate_target_status ===
            "finite-interval-root-tube-certificate-target-emitted" &&
          row.curvature_interval_jet_target
            ?.consumes_machine_padded_source_root_interval_certificate_status ===
            "machine-padded-source-root-interval-certificate-passed" &&
          row.curvature_interval_jet_target
            ?.consumes_directed_rounded_source_root_interval_certificate_status ===
            DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
          row.curvature_interval_jet_target
            ?.requires_directed_rounded_source_root_certificate === true &&
          row.curvature_interval_jet_target
            ?.required_root_sheet_multi_indices?.includes(
              "delta_{theta theta theta}"
            ) &&
          row.curvature_interval_jet_target
            ?.required_root_sheet_multi_indices?.includes(
              "delta_{theta nu nu}"
            ) &&
          row.curvature_interval_jet_target
            ?.required_root_sheet_multi_indices_for_fourth_jet_transport?.includes(
              "delta_{theta theta theta theta}"
            ) &&
          row.curvature_interval_jet_target
            ?.required_root_sheet_multi_indices_for_fourth_jet_transport?.includes(
              "delta_{theta nu nu nu}"
            ) &&
          row.curvature_interval_jet_target
            ?.required_root_sheet_multi_indices_for_fifth_jet_gradient_transport?.includes(
              "delta_{theta theta theta theta theta}"
            ) &&
          row.curvature_interval_jet_target
            ?.required_root_sheet_multi_indices_for_fifth_jet_gradient_transport?.includes(
              "delta_{theta nu nu nu nu}"
            ) &&
          row.curvature_interval_jet_target?.derivative_order_census
            ?.theta_curvature?.includes("partial_theta^3") &&
          row.curvature_interval_jet_target?.derivative_order_census
            ?.speed_curvature?.includes("partial_theta partial_nu^2") &&
          row.curvature_interval_jet_target?.derivative_order_census
            ?.fourth_jet_curvature_transport?.includes("partial_theta^4") &&
          row.curvature_interval_jet_target?.derivative_order_census
            ?.fifth_jet_curvature_gradient_transport?.includes(
              "partial_theta^5"
            ) &&
          Number(
            row.curvature_interval_jet_target
              ?.required_error_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          Number(
            row.curvature_interval_jet_target?.sampled_reference_remainder_ratio
          ) < 1 &&
          row.curvature_interval_jet_target
            ?.curvature_acceptance_inequality?.includes(
              "(h_theta^2/8)M_theta_theta"
            ) &&
          row.sampled_root_tube_regularity_probe?.status ===
            "sampled-root-tube-regularity-feasibility-passed" &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_root_isolation === false &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_root_tube_isolation === false &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_root_sheet_continuation === false &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_F_delta_lower_bound === false &&
          row.sampled_root_tube_regularity_probe
            ?.root_count_signature_preserved === true &&
          row.sampled_root_tube_regularity_probe
            ?.all_F_delta_signs_preserved === true &&
          Number(
            row.sampled_root_tube_regularity_probe?.minimum_sampled_abs_F_delta
          ) > 0 &&
          Number(
            row.sampled_root_tube_regularity_probe
              ?.minimum_sampled_positive_delta
          ) > 0 &&
          (row.sampled_root_tube_regularity_probe
            ?.minimum_sampled_root_tube_separation === null ||
            Number(
              row.sampled_root_tube_regularity_probe
                ?.minimum_sampled_root_tube_separation
            ) > 0) &&
          row.finite_interval_root_tube_certificate_target?.status ===
            "finite-interval-root-tube-certificate-target-emitted" &&
          row.finite_interval_root_tube_certificate_target
            ?.certifies_interval_root_tube_isolation === false &&
          row.finite_interval_root_tube_certificate_target
            ?.certifies_interval_root_sheet_continuation === false &&
          row.finite_interval_root_tube_certificate_target
            ?.certifies_interval_F_delta_lower_bound === false &&
          row.finite_interval_root_tube_certificate_target
            ?.retained_tube_count === EXPECTED_SOURCE_ROOT_COUNT &&
          row.finite_interval_root_tube_certificate_target
            ?.complement_slab_count === 10 &&
          Number(
            row.finite_interval_root_tube_certificate_target
              ?.minimum_tube_padding_radius
          ) > 0 &&
          Number(
            row.finite_interval_root_tube_certificate_target
              ?.minimum_complement_slab_width
          ) > 0 &&
          row.sampled_finite_root_tube_sign_margin_certificate?.status ===
            "sampled-finite-root-tube-sign-margin-certificate-passed" &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.certifies_interval_root_tube_isolation === false &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.certifies_interval_root_sheet_continuation === false &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.certifies_interval_F_delta_lower_bound === false &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.certifies_interval_complement_exclusion === false &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.parameter_sample_count ===
            ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
              ROOT_TUBE_PARAMETER_GRID_COORDINATES.length &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.tube_F_delta_samples_per_parameter ===
            ROOT_TUBE_F_DELTA_COORDINATES.length &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.complement_delta_samples_per_slab ===
            COMPLEMENT_DELTA_SAMPLE_COUNT &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.all_sampled_endpoint_signs_opposite === true &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.all_sampled_tube_F_delta_signs_match_target === true &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.all_sampled_complement_signs_nonzero === true &&
          row.sampled_finite_root_tube_sign_margin_certificate
            ?.all_sampled_complement_signs_stable === true &&
          Number(
            row.sampled_finite_root_tube_sign_margin_certificate
              ?.minimum_sampled_tube_endpoint_abs_F
          ) > 0 &&
          Number(
            row.sampled_finite_root_tube_sign_margin_certificate
              ?.minimum_sampled_tube_endpoint_sign_product_margin
          ) > 0 &&
          Number(
            row.sampled_finite_root_tube_sign_margin_certificate
              ?.minimum_sampled_tube_abs_F_delta
          ) > 0 &&
          Number(
            row.sampled_finite_root_tube_sign_margin_certificate
              ?.minimum_sampled_complement_abs_F
          ) > 0 &&
          row.machine_padded_source_root_interval_certificate?.status ===
            "machine-padded-source-root-interval-certificate-passed" &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_machine_padded_interval_source_root_tube_isolation ===
            true &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_machine_padded_interval_source_root_sheet_continuation ===
            true &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_machine_padded_interval_F_delta_lower_bound === true &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_machine_padded_interval_complement_exclusion === true &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_interval_root_tube_isolation === false &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_interval_root_sheet_continuation === false &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_interval_F_delta_lower_bound === false &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_interval_complement_exclusion === false &&
          row.machine_padded_source_root_interval_certificate
            ?.certifies_outward_rounded_interval_enclosure === false &&
          row.machine_padded_source_root_interval_certificate
            ?.tube_F_delta_subdivision_count ===
            SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS &&
          row.machine_padded_source_root_interval_certificate
            ?.complement_subdivision_count ===
            SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS &&
          row.machine_padded_source_root_interval_certificate
            ?.all_tube_endpoint_intervals_opposite === true &&
          row.machine_padded_source_root_interval_certificate
            ?.all_tube_F_delta_intervals_match_target === true &&
          row.machine_padded_source_root_interval_certificate
            ?.all_complement_intervals_exclude_zero === true &&
          row.machine_padded_source_root_interval_certificate
            ?.all_complement_interval_signs_stable === true &&
          Number(
            row.machine_padded_source_root_interval_certificate
              ?.minimum_tube_endpoint_interval_abs_F
          ) > 0 &&
          Number(
            row.machine_padded_source_root_interval_certificate
              ?.minimum_tube_endpoint_interval_sign_product_margin
          ) > 0 &&
          Number(
            row.machine_padded_source_root_interval_certificate
              ?.minimum_tube_interval_abs_F_delta
          ) > 0 &&
          Number(
            row.machine_padded_source_root_interval_certificate
              ?.minimum_complement_interval_abs_F
          ) > 0 &&
          row.directed_rounded_source_root_interval_certificate?.status ===
            DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
          row.directed_rounded_source_root_interval_certificate
            ?.certificate_type ===
            "directed-rounded-source-root-interval-certificate" &&
          row.directed_rounded_source_root_interval_certificate
            ?.interval_rounding === "ieee-754-nextafter-outward" &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_directed_rounded_source_root_interval_certificate ===
            true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_directed_rounded_interval_source_root_tube_isolation ===
            true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_directed_rounded_interval_source_root_sheet_continuation ===
            true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_directed_rounded_interval_F_delta_lower_bound === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_directed_rounded_interval_complement_exclusion === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_interval_root_tube_isolation === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_interval_root_sheet_continuation === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_interval_F_delta_lower_bound === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_interval_complement_exclusion === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.certifies_outward_rounded_interval_enclosure === false &&
          row.directed_rounded_source_root_interval_certificate
            ?.tube_F_delta_subdivision_count ===
            SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS &&
          row.directed_rounded_source_root_interval_certificate
            ?.complement_subdivision_count ===
            SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS &&
          row.directed_rounded_source_root_interval_certificate
            ?.all_tube_endpoint_intervals_opposite === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.all_tube_F_delta_intervals_match_target === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.all_complement_intervals_exclude_zero === true &&
          row.directed_rounded_source_root_interval_certificate
            ?.all_complement_interval_signs_stable === true &&
          Number(
            row.directed_rounded_source_root_interval_certificate
              ?.minimum_tube_endpoint_interval_abs_F
          ) > 0 &&
          Number(
            row.directed_rounded_source_root_interval_certificate
              ?.minimum_tube_endpoint_interval_sign_product_margin
          ) > 0 &&
          Number(
            row.directed_rounded_source_root_interval_certificate
              ?.minimum_tube_interval_abs_F_delta
          ) > 0 &&
          Number(
            row.directed_rounded_source_root_interval_certificate
              ?.minimum_complement_interval_abs_F
          ) > 0 &&
          row.direct_interval_derivative_envelope_attempt?.attempt_type ===
            "direct-interval-derivative-envelope-attempt" &&
          row.direct_interval_derivative_envelope_attempt?.target_function ===
            "g=f_cross_prime" &&
          [
            DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS,
            DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_OPEN_STATUS,
          ].includes(row.direct_interval_derivative_envelope_attempt?.status) &&
          row.direct_interval_derivative_envelope_attempt
            ?.consumes_directed_rounded_source_root_interval_certificate_status ===
            DIRECTED_ROUNDED_SOURCE_ROOT_INTERVAL_STATUS &&
          row.direct_interval_derivative_envelope_attempt
            ?.certifies_interval_derivative_enclosure === false &&
          row.direct_interval_derivative_envelope_attempt
            ?.certifies_interval_second_partial_curvature_enclosure ===
            false &&
          row.direct_interval_derivative_envelope_attempt
            ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
            false &&
          row.direct_interval_derivative_envelope_attempt
            ?.uses_monotone_root_sheet_contractor === true &&
          row.direct_interval_derivative_envelope_attempt
            ?.emits_fixed_sign_F_delta_root_sheet_contractions === true &&
          row.direct_interval_derivative_envelope_attempt
            ?.certifies_monotone_root_sheet_range_contraction === true &&
          row.direct_interval_derivative_envelope_attempt
            ?.all_root_sheet_contractions_passed === true &&
          row.direct_interval_derivative_envelope_attempt
            ?.all_F_delta_subdivision_signs_match_expected === true &&
          row.direct_interval_derivative_envelope_attempt
            ?.protected_tube_subdivision_count ===
            expectedDirectIntervalSourceEvaluationCount &&
          row.direct_interval_derivative_envelope_attempt
            ?.source_derivative_interval_evaluation_count ===
            expectedDirectIntervalSourceEvaluationCount &&
          row.direct_interval_derivative_envelope_attempt
            ?.total_root_sheet_contraction_count ===
            EXPECTED_SOURCE_ROOT_COUNT &&
          row.direct_interval_derivative_envelope_attempt
            ?.uses_parameter_localized_direct_interval_envelope === true &&
          row.direct_interval_derivative_envelope_attempt
            ?.theta_localization_subdivision_count ===
            directIntervalThetaLocalizationSubdivisions &&
          row.direct_interval_derivative_envelope_attempt
            ?.speed_ratio_localization_subdivision_count ===
            directIntervalSpeedLocalizationSubdivisions &&
          row.direct_interval_derivative_envelope_attempt
            ?.localized_parameter_tile_count ===
            expectedParameterLocalizedRootSheetContractionCount &&
          row.direct_interval_derivative_envelope_attempt
            ?.all_parameter_localized_root_sheet_contractions_passed ===
            true &&
          row.direct_interval_derivative_envelope_attempt
            ?.total_parameter_localized_root_sheet_contraction_count ===
            expectedParameterLocalizedRootSheetContractionCount &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.maximum_parameter_localized_contracted_delta_width
          ) > 0 &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.minimum_parameter_localized_root_sheet_width_reduction_factor
          ) > 1 &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.maximum_protected_delta_width
          ) > 0 &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.maximum_contracted_delta_width
          ) > 0 &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.maximum_contracted_delta_width
          ) <
            Number(
              row.direct_interval_derivative_envelope_attempt
                ?.maximum_protected_delta_width
            ) &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.minimum_root_sheet_width_reduction_factor
          ) > 1 &&
          row.direct_interval_derivative_envelope_attempt?.term_rows?.length ===
            4 &&
          row.direct_interval_derivative_envelope_attempt?.term_rows?.every(
            (termRow) =>
              termRow.root_rows.every(
                (rootRow) =>
                  rootRow.root_sheet_contraction
                    ?.certifies_fixed_sign_F_delta_root_sheet_contraction ===
                    true &&
                  rootRow.root_sheet_contraction?.endpoint_orientation_passed ===
                    true &&
                  rootRow.root_sheet_contraction?.F_delta_subdivision_count ===
                    SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS &&
                  Number(
                    rootRow.root_sheet_contraction
                      ?.contracted_to_original_width_ratio
                  ) < 1 &&
                  Number(rootRow.root_sheet_contraction?.orientation_zeta) !==
                    0 &&
                  rootRow.uses_parameter_localized_root_sheet_contractor ===
                    true &&
                  rootRow.theta_localization_subdivision_count ===
                    directIntervalThetaLocalizationSubdivisions &&
                  rootRow.speed_ratio_localization_subdivision_count ===
                    directIntervalSpeedLocalizationSubdivisions &&
                  rootRow.localized_parameter_tile_count ===
                    directIntervalParameterTileCount &&
                  rootRow.localized_root_sheet_contraction_count ===
                    directIntervalParameterTileCount &&
                  rootRow.all_localized_root_sheet_contractions_passed ===
                    true &&
                  Number(rootRow.maximum_localized_contracted_delta_width) >
                    0 &&
                  Number(
                    rootRow.minimum_localized_root_sheet_width_reduction_factor
                  ) > 1
              )
          ) &&
          row.direct_interval_derivative_envelope_attempt?.term_rows?.reduce(
            (sum, termRow) => sum + termRow.root_rows.length,
            0
          ) === EXPECTED_SOURCE_ROOT_COUNT &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.minimum_F_delta_abs_clearance
          ) > 0 &&
          row.direct_interval_derivative_envelope_attempt
            ?.direct_interval_derivative_enclosure?.length === 2 &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.direct_interval_derivative_upper_bound
          ) ===
            Number(
              row.direct_interval_derivative_envelope_attempt
                ?.direct_interval_derivative_enclosure?.[1]
            ) &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.vertex_max_derivative
          ) === Number(row.vertex_max_derivative) &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.required_overshoot_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          Number(
            row.direct_interval_derivative_envelope_attempt
              ?.maximum_root_derivative_interval_width
          ) > 0 &&
          (row.direct_interval_derivative_envelope_attempt?.status ===
          DIRECT_INTERVAL_DERIVATIVE_ENVELOPE_STATUS
            ? Number(
                row.direct_interval_derivative_envelope_attempt
                  ?.direct_interval_upper_bound_headroom
              ) > 0 &&
              Number(
                row.direct_interval_derivative_envelope_attempt
                  ?.direct_interval_remainder_ratio_to_required_bound
              ) < 1
            : Number(
                row.direct_interval_derivative_envelope_attempt
                  ?.direct_interval_upper_bound_overrun
              ) > 0 &&
              Number(
                row.direct_interval_derivative_envelope_attempt
                  ?.direct_interval_remainder_ratio_to_required_bound
              ) >= 1) &&
          Number(
            row.sampled_pure_curvature_probe
              ?.sampled_bilinear_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(row.effective_peak_overshoot_ceiling_after_refined_replay) >
            0 &&
          Number(row.refined_max_derivative) < 0 &&
          Number(row.min_abs_F_delta) > 0
      ),
    "all peak-budget subcells must preserve roots, stay negative, and retain a positive peak budget",
    errors
  );
  assertField(
    artifact?.backend_input_formula_sheet?.source_root_equation?.includes(
      "delta^2/nu^2-2+sin(phi)+kappa*sin(delta)=0"
    ) &&
      artifact?.backend_input_formula_sheet?.implicit_root_derivative ===
        "delta_prime=-2*cos(phi)/F_delta" &&
      artifact?.backend_input_formula_sheet?.implicit_root_first_partial ===
        "for x in {theta,nu}: delta_x=-F_x/F_delta" &&
      artifact?.backend_input_formula_sheet?.implicit_root_pure_second_partial?.includes(
        "delta_xx=-(F_xx+2*F_x_delta*delta_x+F_delta_delta*delta_x^2)/F_delta"
      ) &&
      artifact?.backend_input_formula_sheet
        ?.required_root_sheet_multi_indices_for_curvature_target?.includes(
          "delta_{theta theta theta}"
        ) &&
      artifact?.backend_input_formula_sheet
        ?.required_root_sheet_multi_indices_for_curvature_target?.includes(
          "delta_{theta nu nu}"
        ) &&
      artifact?.backend_input_formula_sheet
        ?.required_root_sheet_multi_indices_for_fourth_jet_transport_target?.includes(
          "delta_{theta theta theta theta}"
        ) &&
      artifact?.backend_input_formula_sheet
        ?.required_root_sheet_multi_indices_for_fifth_jet_gradient_transport_target?.includes(
          "delta_{theta theta theta theta theta}"
        ) &&
      artifact?.backend_input_formula_sheet
        ?.sampled_fourth_jet_curvature_transport_route?.includes(
          "nearest-sample covering radii"
        ) &&
      artifact?.backend_input_formula_sheet
        ?.sampled_fifth_jet_curvature_gradient_transport_route?.includes(
          "transport those gradients"
        ) &&
      artifact?.backend_input_formula_sheet
        ?.sampled_theta_localized_taylor_upper_envelope_route?.includes(
          "sampled Taylor-transport witness"
        ) &&
      artifact?.backend_input_formula_sheet?.bilinear_vertex_envelope?.includes(
        "sup_Q g <= vertex_max_derivative"
      ) &&
      artifact?.backend_input_formula_sheet?.cross_binary_combination?.includes(
        "s_{+,+}(theta)-s_{+,+}(theta+Q)+s_{-,+}(theta)-s_{-,+}(theta+Q)"
      ) &&
      artifact?.backend_input_formula_sheet
        ?.direct_interval_derivative_envelope_route?.includes(
          "source-derivative interval upper bound"
        ) &&
      artifact?.backend_input_formula_sheet?.monotone_root_sheet_contractor?.includes(
        "contract"
      ) &&
      artifact?.backend_input_formula_sheet?.root_tube_interval_certificate?.includes(
        "exactly one C^1 implicit root sheet"
      ) &&
      artifact?.backend_input_formula_sheet?.curvature_interval_jet_route?.includes(
        "implicit root-sheet jet recurrence"
      ),
    "backend formula sheet must expose the source-atlas derivative and interval-jet formulas",
    errors
  );
  assertField(
    artifact?.peak_budget_summary?.peak_budget_row_id ===
      "I1.f1.bracket-local-derivative-peak-budget-reduction" &&
      artifact?.peak_budget_summary?.status ===
        PEAK_BUDGET_SUMMARY_STATUS &&
      artifact?.peak_budget_summary?.successor_row ===
        CLOSED_LOCAL_SUCCESSOR_ROW &&
      artifact?.peak_budget_summary?.certified_subcell_row_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_bilinear_curvature_feasibility_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_analytic_jet_curvature_witness_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_analytic_jet_bilinear_curvature_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_analytic_jet_derivative_formula_residual_abs
      ) < 1e-7 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_analytic_jet_root_equation_residual_abs
      ) < 1e-9 &&
      artifact?.peak_budget_summary
        ?.sampled_analytic_jet_envelope_budget_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_curvature_estimator_envelope_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_sampled_curvature_estimator_envelope_headroom
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_uniform_sampled_curvature_estimator_envelope_inflation_factor_less_than
      ) > 1 &&
      artifact?.peak_budget_summary
        ?.sampled_fourth_jet_curvature_transport_witness_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_fourth_jet_transport_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_sampled_fourth_jet_transport_headroom
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_uniform_sampled_fourth_jet_transport_inflation_factor_less_than
      ) > 1 &&
      artifact?.peak_budget_summary
        ?.sampled_fifth_jet_curvature_gradient_transport_witness_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_fifth_jet_transport_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_sampled_fifth_jet_transport_headroom
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_uniform_sampled_fifth_jet_transport_inflation_factor_less_than
      ) > 1 &&
      artifact?.peak_budget_summary
        ?.sampled_theta_localized_taylor_upper_envelope_attempt_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_theta_localized_taylor_upper_envelope_witness_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_theta_localized_taylor_upper_envelope_open_subcell_count ===
        0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_theta_localized_taylor_upper_envelope_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_sampled_theta_localized_taylor_upper_envelope_headroom
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_theta_localized_taylor_upper_envelope_overrun
      ) === 0 &&
      Number.isFinite(
        Number(
          artifact?.peak_budget_summary
            ?.minimum_direct_to_sampled_theta_localized_taylor_remainder_ratio_reduction_factor
        )
      ) &&
      artifact?.peak_budget_summary
        ?.sampled_theta_localized_taylor_bottleneck_subcell_row_id?.startsWith(
          "I1.f1.bracket-derivative-mesh."
        ) &&
      artifact?.peak_budget_summary
        ?.directed_rounded_theta_localized_taylor_intervalization_attempt_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.directed_rounded_theta_localized_taylor_intervalization_passed_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.directed_rounded_theta_localized_taylor_intervalization_open_subcell_count ===
        0 &&
      artifact?.peak_budget_summary
        ?.directed_rounded_theta_localized_taylor_intervalization_nonfinite_subcell_count ===
        0 &&
      artifact?.peak_budget_summary
        ?.directed_rounded_theta_localized_taylor_intervalization_nonfinite_tile_count ===
        0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_directed_rounded_theta_localized_taylor_intervalization_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_directed_rounded_theta_localized_taylor_intervalization_headroom
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_directed_rounded_theta_localized_taylor_intervalization_overrun
      ) === 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_directed_rounded_theta_localized_taylor_interval_theta_second_partial_bound
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_directed_rounded_theta_localized_taylor_interval_speed_second_partial_bound
      ) > 0 &&
      artifact?.peak_budget_summary
        ?.directed_rounded_theta_localized_taylor_intervalization_bottleneck_subcell_row_id?.startsWith(
          "I1.f1.bracket-derivative-mesh."
        ) &&
      artifact?.peak_budget_summary
        ?.sampled_curvature_inflation_headroom_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary?.sampled_curvature_headroom_reference_factor ===
        SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR &&
      artifact?.peak_budget_summary?.curvature_interval_jet_target_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_root_tube_regularity_feasibility_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.finite_interval_root_tube_certificate_target_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_finite_root_tube_sign_margin_certificate_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.machine_padded_source_root_interval_certificate_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.directed_rounded_source_root_interval_certificate_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary?.total_retained_root_tube_target_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT &&
      artifact?.peak_budget_summary?.total_complement_slab_target_count ===
        artifact?.peak_budget_summary?.subcell_row_count * 10 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_bilinear_curvature_remainder_ratio
      ) < 1 &&
      (artifact?.peak_budget_summary
        ?.minimum_uniform_sampled_curvature_inflation_factor_less_than === null ||
        Number(
          artifact?.peak_budget_summary
            ?.minimum_uniform_sampled_curvature_inflation_factor_less_than
        ) > SAMPLED_CURVATURE_HEADROOM_REFERENCE_FACTOR) &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_sampled_curvature_headroom_margin_after_reference_factor
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_effective_peak_overshoot_ceiling_after_refined_replay
      ) > 0 &&
      Number(artifact?.peak_budget_summary?.maximum_refined_derivative) < 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_balanced_pure_curvature_bound
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_root_tube_abs_F_delta
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_root_tube_positive_delta
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_root_tube_separation
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_finite_root_tube_target_padding_radius
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_finite_root_tube_target_complement_width
      ) > 0 &&
      artifact?.peak_budget_summary
        ?.total_sampled_tube_endpoint_sign_pair_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT *
          ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
          ROOT_TUBE_PARAMETER_GRID_COORDINATES.length &&
      artifact?.peak_budget_summary?.total_sampled_tube_endpoint_F_sample_count ===
        artifact?.peak_budget_summary
          ?.total_sampled_tube_endpoint_sign_pair_count *
          2 &&
      artifact?.peak_budget_summary?.total_sampled_tube_F_delta_sample_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT *
          ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
          ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
          ROOT_TUBE_F_DELTA_COORDINATES.length &&
      artifact?.peak_budget_summary?.total_sampled_complement_F_sample_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          10 *
          ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
          ROOT_TUBE_PARAMETER_GRID_COORDINATES.length *
          COMPLEMENT_DELTA_SAMPLE_COUNT &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_tube_endpoint_abs_F
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_sampled_tube_endpoint_sign_product_margin
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_tube_F_delta_abs
      ) > 0 &&
      Number(artifact?.peak_budget_summary?.minimum_sampled_complement_abs_F) >
        0 &&
      artifact?.peak_budget_summary
        ?.total_machine_padded_tube_endpoint_sign_pair_interval_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT &&
      artifact?.peak_budget_summary
        ?.total_machine_padded_tube_endpoint_F_interval_count ===
        artifact?.peak_budget_summary
          ?.total_machine_padded_tube_endpoint_sign_pair_interval_count *
          2 &&
      artifact?.peak_budget_summary
        ?.total_machine_padded_tube_F_delta_interval_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT *
          SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS &&
      artifact?.peak_budget_summary
        ?.total_machine_padded_complement_F_interval_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          10 *
          SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_machine_padded_tube_endpoint_interval_abs_F
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_machine_padded_tube_endpoint_interval_sign_product_margin
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_machine_padded_tube_interval_F_delta_abs
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_machine_padded_complement_interval_abs_F
      ) > 0 &&
      artifact?.peak_budget_summary
        ?.total_directed_rounded_tube_endpoint_sign_pair_interval_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT &&
      artifact?.peak_budget_summary
        ?.total_directed_rounded_tube_endpoint_F_interval_count ===
        artifact?.peak_budget_summary
          ?.total_directed_rounded_tube_endpoint_sign_pair_interval_count *
          2 &&
      artifact?.peak_budget_summary
        ?.total_directed_rounded_tube_F_delta_interval_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT *
          SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS &&
      artifact?.peak_budget_summary
        ?.total_directed_rounded_complement_F_interval_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          10 *
          SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_directed_rounded_tube_endpoint_interval_abs_F
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_directed_rounded_tube_endpoint_interval_sign_product_margin
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_directed_rounded_tube_interval_F_delta_abs
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_directed_rounded_complement_interval_abs_F
      ) > 0 &&
      artifact?.peak_budget_summary
        ?.direct_interval_derivative_envelope_attempt_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.direct_interval_derivative_envelope_passed_subcell_count +
        artifact?.peak_budget_summary
          ?.direct_interval_derivative_envelope_open_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.total_direct_interval_derivative_protected_tube_subdivision_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          expectedDirectIntervalSourceEvaluationCount &&
      artifact?.peak_budget_summary
        ?.total_direct_interval_derivative_source_evaluation_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          expectedDirectIntervalSourceEvaluationCount &&
      artifact?.peak_budget_summary
        ?.fixed_sign_F_delta_root_sheet_contraction_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.fixed_sign_F_delta_root_sheet_contraction_passed_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.total_fixed_sign_F_delta_root_sheet_contraction_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_fixed_sign_F_delta_protected_root_interval_width
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_fixed_sign_F_delta_contracted_root_interval_width
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_fixed_sign_F_delta_contracted_root_interval_width
      ) <
        Number(
          artifact?.peak_budget_summary
            ?.maximum_fixed_sign_F_delta_protected_root_interval_width
        ) &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_fixed_sign_F_delta_root_sheet_width_reduction_factor
      ) > 1 &&
      artifact?.peak_budget_summary
        ?.fixed_sign_F_delta_contraction_width_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      artifact?.peak_budget_summary
        ?.fixed_sign_F_delta_contraction_reduction_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      artifact?.peak_budget_summary
        ?.parameter_localized_direct_interval_envelope_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.parameter_localized_root_sheet_contraction_passed_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.total_parameter_localized_root_sheet_contraction_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          expectedParameterLocalizedRootSheetContractionCount &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_parameter_localized_contracted_root_interval_width
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_parameter_localized_root_sheet_width_reduction_factor
      ) > 1 &&
      artifact?.peak_budget_summary
        ?.parameter_localized_contraction_width_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      artifact?.peak_budget_summary
        ?.parameter_localized_contraction_reduction_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_direct_interval_derivative_F_delta_abs_clearance
      ) > 0 &&
      Number.isFinite(
        Number(
          artifact?.peak_budget_summary
            ?.minimum_direct_interval_derivative_upper_bound_headroom
        )
      ) &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_direct_interval_derivative_remainder_ratio
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_direct_interval_derivative_root_interval_width
      ) > 0 &&
      artifact?.peak_budget_summary
        ?.direct_interval_derivative_ratio_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      artifact?.peak_budget_summary
        ?.direct_interval_derivative_overrun_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      artifact?.peak_budget_summary
        ?.direct_interval_derivative_width_bottleneck_subcell_row_id
        ?.startsWith("I1.f1.bracket-derivative-mesh.") &&
      artifact?.peak_budget_summary?.source_root_count_preserved === true,
    "peak budget summary must certify a positive finite subcell budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_I1_f1_bracket_local_derivative_peak_budget_reduction ===
      true &&
      artifact?.artifact_claim
        ?.converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds ===
        true &&
      artifact?.artifact_claim?.certifies_refined_sampled_peak_audit === true &&
      artifact?.artifact_claim?.certifies_sampled_bilinear_curvature_feasibility ===
        true &&
      artifact?.artifact_claim
        ?.certifies_sampled_analytic_jet_curvature_witness === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_analytic_jet_envelope_budget === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_fourth_jet_curvature_transport_witness === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_fifth_jet_curvature_gradient_transport_witness ===
        true &&
      artifact?.artifact_claim
        ?.certifies_sampled_theta_localized_taylor_upper_envelope_witness ===
        true &&
      artifact?.artifact_claim
        ?.emits_directed_rounded_theta_localized_taylor_intervalization_attempt ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_curvature_inflation_headroom ===
        true &&
      artifact?.artifact_claim?.certifies_curvature_interval_jet_target ===
        true &&
      artifact?.artifact_claim
        ?.certifies_sampled_root_tube_regularity_feasibility === true &&
      artifact?.artifact_claim
        ?.certifies_finite_interval_root_tube_certificate_target === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_finite_root_tube_sign_margin_certificate === true &&
      artifact?.artifact_claim
        ?.certifies_machine_padded_source_root_interval_certificate === true &&
      artifact?.artifact_claim
        ?.certifies_machine_padded_interval_source_root_tube_isolation ===
        true &&
      artifact?.artifact_claim
        ?.certifies_machine_padded_interval_source_root_sheet_continuation ===
        true &&
      artifact?.artifact_claim
        ?.certifies_machine_padded_interval_F_delta_lower_bound === true &&
      artifact?.artifact_claim
        ?.certifies_machine_padded_interval_complement_exclusion === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_source_root_interval_certificate ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_interval_source_root_tube_isolation ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_interval_source_root_sheet_continuation ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_interval_F_delta_lower_bound === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_interval_complement_exclusion === true &&
      artifact?.artifact_claim
        ?.emits_direct_interval_derivative_envelope_attempt === true &&
      artifact?.artifact_claim
        ?.emits_parameter_localized_direct_interval_envelope === true &&
      artifact?.artifact_claim
        ?.certifies_monotone_root_sheet_range_contraction === true &&
      artifact?.artifact_claim
        ?.certifies_parameter_localized_monotone_root_sheet_range_contraction ===
        true &&
      artifact?.artifact_claim
        ?.certifies_direct_interval_derivative_upper_envelope ===
        (artifact?.peak_budget_summary
          ?.direct_interval_derivative_envelope_passed_subcell_count ===
          artifact?.peak_budget_summary?.subcell_row_count) &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_taylor_upper_envelope === true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        true &&
      artifact?.artifact_claim
        ?.certifies_interval_second_partial_curvature_enclosure === true &&
      artifact?.artifact_claim?.certifies_interval_root_tube_isolation ===
        true &&
      artifact?.artifact_claim?.certifies_interval_root_sheet_continuation ===
        true &&
      artifact?.artifact_claim?.certifies_interval_F_delta_lower_bound ===
        true &&
      artifact?.artifact_claim?.certifies_interval_complement_exclusion ===
        true &&
      artifact?.artifact_claim
        ?.certifies_I1_derivative_negative_full_cell_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.artifact_claim?.open_quantity_names?.includes(
        "I1_f1_full_interval_zero_isolation"
      ) &&
      artifact?.artifact_claim?.open_quantity_names?.includes(
        "interval_critical_exhaustion"
      ) &&
      artifact?.artifact_claim?.open_quantity_names?.includes(
        "interval_quadrature_enclosure"
      ) &&
      artifact?.interval_profile_boundary?.open_quantity_names?.includes(
        "retained_branch_status"
      ) &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify the directed-rounded Taylor derivative-variation closure while leaving zero isolation, derivative interval, critical exhaustion, quadrature, and retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status === RESULT_THEORY_STATUS &&
      artifact?.result?.first_successor_row === CLOSED_LOCAL_SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must certify the I1.f1 peak-budget reduction and not retain the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>                    Source-root search subdivisions (default: 5000)",
    "  --endpoint-speed-samples <n>          Predecessor endpoint speed samples (default: 9)",
    "  --zero-branch-speed-samples <n>       Predecessor zero-branch speed samples (default: 9)",
    "  --derivative-theta-samples <n>        Predecessor derivative theta samples (default: 48)",
    "  --theta-cells <n>                     Bracket theta mesh cell count (default: 16)",
    "  --speed-cells <n>                     Speed-envelope mesh cell count (default: 8)",
    "  --parent-stencil-samples <n>          Odd parent stencil samples per axis (default: 5)",
    "  --refinement-samples <n>              Refinement samples per subcell axis (default: 3)",
    "  --direct-interval-theta-localization-subdivisions <n>",
    "                                       Direct envelope theta localization subdivisions (default: 2)",
    "  --direct-interval-speed-localization-subdivisions <n>",
    "                                       Direct envelope speed-ratio localization subdivisions (default: 1)",
    "  --theta-localized-taylor-subdivisions <n>",
    "                                       Sampled Taylor upper-envelope theta subdivisions (default: refinement samples - 1)",
    "  --endpoint-padding <x>                Predecessor derivative endpoint padding (default: 1e-5)",
    "  --machine-padding <x>                 Machine envelope padding (default: 1e-9)",
    "  --bisection-tolerance <x>             Predecessor root bisection tolerance (default: 1e-12)",
    "  --out <path>                          Write artifact JSON to path instead of stdout",
    "  --validate <path>                     Validate an existing artifact JSON file",
    "  --schema                              Print the artifact schema identifier",
    "  --pretty                              Pretty-print JSON output",
    "  --help                                Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    endpointSpeedSampleCount: DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    zeroBranchSpeedSampleCount: DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    derivativeThetaSampleCount: DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    thetaCellCount: DEFAULT_THETA_CELL_COUNT,
    speedCellCount: DEFAULT_SPEED_CELL_COUNT,
    parentStencilSamplesPerAxis: DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    refinementSamplesPerSubcellAxis: DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    directIntervalThetaLocalizationSubdivisions:
      DEFAULT_DIRECT_INTERVAL_THETA_LOCALIZATION_SUBDIVISIONS,
    directIntervalSpeedLocalizationSubdivisions:
      DEFAULT_DIRECT_INTERVAL_SPEED_LOCALIZATION_SUBDIVISIONS,
    thetaLocalizedTaylorSubdivisions: null,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    bisectionTolerance: DEFAULT_BISECTION_TOLERANCE,
    outPath: null,
    validatePath: null,
    printSchema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-speed-samples") {
      args.endpointSpeedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--zero-branch-speed-samples") {
      args.zeroBranchSpeedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--derivative-theta-samples") {
      args.derivativeThetaSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--theta-cells") {
      args.thetaCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-cells") {
      args.speedCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--parent-stencil-samples") {
      args.parentStencilSamplesPerAxis = Number.parseInt(argv[++index], 10);
    } else if (arg === "--refinement-samples") {
      args.refinementSamplesPerSubcellAxis = Number.parseInt(argv[++index], 10);
    } else if (arg === "--direct-interval-theta-localization-subdivisions") {
      args.directIntervalThetaLocalizationSubdivisions = Number.parseInt(
        argv[++index],
        10
      );
    } else if (arg === "--direct-interval-speed-localization-subdivisions") {
      args.directIntervalSpeedLocalizationSubdivisions = Number.parseInt(
        argv[++index],
        10
      );
    } else if (arg === "--theta-localized-taylor-subdivisions") {
      args.thetaLocalizedTaylorSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--bisection-tolerance") {
      args.bisectionTolerance = Number(argv[++index]);
    } else if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.printSchema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        artifact
      );
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log("ok");
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      {
        rootSubdivisions: args.rootSubdivisions,
        endpointSpeedSampleCount: args.endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount: args.zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount: args.derivativeThetaSampleCount,
        thetaCellCount: args.thetaCellCount,
        speedCellCount: args.speedCellCount,
        parentStencilSamplesPerAxis: args.parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis: args.refinementSamplesPerSubcellAxis,
        directIntervalThetaLocalizationSubdivisions:
          args.directIntervalThetaLocalizationSubdivisions,
        directIntervalSpeedLocalizationSubdivisions:
          args.directIntervalSpeedLocalizationSubdivisions,
        thetaLocalizedTaylorSubdivisions:
          args.thetaLocalizedTaylorSubdivisions,
        endpointPadding: args.endpointPadding,
        machinePadding: args.machinePadding,
        bisectionTolerance: args.bisectionTolerance,
      }
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      artifact
    );
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }

  const payload = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.outPath) {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, `${payload}\n`);
  } else {
    console.log(payload);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
