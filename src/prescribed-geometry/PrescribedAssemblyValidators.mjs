import {
  evaluatePrescribedWorldlineOperator,
} from "./PrescribedWorldlineOperators.mjs";
import {
  projectCircularRelationshipParameters,
} from "./PrescribedCircularRelationshipParameters.mjs";

export const PRESCRIBED_ASSEMBLY_VALIDATOR_IDS = Object.freeze([
  "legacy-family-a.v1",
  "legacy-family-b.v1",
  "legacy-family-c.v1",
  "sd3-centered-five-coordinate.v1",
  "f5-phase-varying.v1",
  "f6b-scoped-negative.v1",
  "f6c-exact-map.v1",
]);

const VALIDATORS = new Map([
  ["legacy-family-a.v1", validateCircularFamily("A")],
  ["legacy-family-b.v1", validateCircularFamily("B")],
  ["legacy-family-c.v1", validateCircularFamily("C")],
  ["sd3-centered-five-coordinate.v1", validateSd3],
  ["f5-phase-varying.v1", validateF5],
  ["f6b-scoped-negative.v1", validateF6b],
  ["f6c-exact-map.v1", validateF6c],
]);

export function runPrescribedAssemblyValidators(spec) {
  spec.constraints.validators.forEach((validatorId) => {
    const validator = VALIDATORS.get(validatorId);
    if (!validator) throw new TypeError(`prescribed assembly validator ${validatorId} is not registered.`);
    validator(spec);
  });
}

function validateCircularFamily(expectedFamilyId) {
  return (spec) => {
    if (spec.identity.taxonomy?.familyId !== expectedFamilyId) {
      throw new TypeError(`${spec.constraints.validators[0]} requires Family ${expectedFamilyId}.`);
    }
    projectCircularRelationshipParameters(spec);
  };
}

function validateSd3(spec) {
  requireCandidate(spec, "SD3", 6, "sd3-centered-linear-member.v1");
  requirePolarityCounts(spec, 3, 3);
  if (spec.relationships.neutralPairs?.length !== 3) {
    throw new TypeError("SD3 requires three declared neutral-pair relationships.");
  }
  const reconstruction = spec.geometry?.reconstruction;
  if (reconstruction?.operator !== "sd3-centered-five-coordinate.v1" ||
      reconstruction.removedGauge?.coordinate !== "gamma" ||
      reconstruction.removedGauge?.value !== 0 ||
      reconstruction.removedGauge?.rate !== 0) {
    throw new TypeError("SD3 requires the exact centered five-coordinate reconstruction and gamma=dot(gamma)=0 gauge.");
  }
  requireCentroid(spec, 0, 1e-12);
  requireCentroidVelocity(spec, 0, 1e-12);
}

function validateF6b(spec) {
  requireCandidate(spec, "F6b", 8, "moving-circular.v1");
  requirePolarityCounts(spec, 4, 4);
  if (spec.identity.status !== "scoped-negative-reproducibility-control") {
    throw new TypeError("F6b must remain a scoped-negative reproducibility control.");
  }
  if ((spec.relationships.neutralPairs ?? []).length !== 0) {
    throw new TypeError("F6b axis modules must not be represented as neutral binaries.");
  }
}

function validateF5(spec) {
  requireCandidate(spec, "F5", 12, "f5-phase-varying-member.v1");
  requirePolarityCounts(spec, 6, 6);
  if (spec.identity.status !== "operator-approved-prescribed-display") {
    throw new TypeError("F5 revised history must remain the operator-approved prescribed display representative.");
  }
  if ((spec.relationships.pairings ?? []).length !== 6) {
    throw new TypeError("F5 requires six declared polarity-conjugate dyads.");
  }
  if ((spec.relationships.neutralPairs ?? []).length !== 0) {
    throw new TypeError("F5 polarity-conjugate dyads must not be reclassified as established neutral binaries.");
  }
  requireCentroid(spec, 0, 1e-12);
  requireCentroidVelocity(spec, 0, 1e-12);
}

function validateF6c(spec) {
  requireCandidate(spec, "F6c", 8, "f6c-harmonic-member.v1");
  requirePolarityCounts(spec, 4, 4);
  if ((spec.relationships.neutralPairs ?? []).length !== 0) {
    throw new TypeError("F6c axis modules must not be represented as neutral binaries.");
  }
  const operators = spec.worldlines.map((row) => row.operator);
  const axes = operators.filter((row) => row.polarity === 1).map((row) => row.axis);
  if (axes.length !== 4) throw new TypeError("F6c requires four ordered positive-sector tetrahedral axes.");
  const sum = axes.reduce((accumulator, axis) => accumulator.map((value, index) => value + axis[index]), [0, 0, 0]);
  if (Math.hypot(...sum) > 1e-12) throw new RangeError("F6c tetrahedral axes must be centered.");
  for (let left = 0; left < axes.length; left += 1) {
    for (let right = left + 1; right < axes.length; right += 1) {
      const product = axes[left].reduce((total, value, index) => total + value * axes[right][index], 0);
      if (Math.abs(product + 1 / 3) > 1e-12) throw new RangeError("F6c axes must have tetrahedral pair products -1/3.");
    }
  }
}

function requireCandidate(spec, candidateId, count, operatorKind) {
  if (spec.identity.candidateId !== candidateId || spec.constituents.length !== count) {
    throw new TypeError(`${candidateId} requires ${count} individually declared constituents.`);
  }
  if (!spec.worldlines.every((row) => row.operator.kind === operatorKind)) {
    throw new TypeError(`${candidateId} requires ${operatorKind} on every declared worldline.`);
  }
}

function requirePolarityCounts(spec, positive, negative) {
  const positiveCount = spec.constituents.filter((row) => row.polarity === 1).length;
  const negativeCount = spec.constituents.filter((row) => row.polarity === -1).length;
  if (positiveCount !== positive || negativeCount !== negative) {
    throw new RangeError(`candidate requires polarity counts ${positive}:${negative}.`);
  }
}

function requireCentroid(spec, time, tolerance) {
  const sum = spec.worldlines.reduce((accumulator, row) => {
    const state = evaluatePrescribedWorldlineOperator(row.operator, time);
    return accumulator.map((value, index) => value + state.position[index]);
  }, [0, 0, 0]);
  if (Math.hypot(...sum.map((value) => value / spec.worldlines.length)) > tolerance) {
    throw new RangeError("candidate whole-assembly centroid declaration failed.");
  }
}

function requireCentroidVelocity(spec, time, tolerance) {
  const sum = spec.worldlines.reduce((accumulator, row) => {
    const state = evaluatePrescribedWorldlineOperator(row.operator, time);
    return accumulator.map((value, index) => value + state.velocity[index]);
  }, [0, 0, 0]);
  if (Math.hypot(...sum.map((value) => value / spec.worldlines.length)) > tolerance) {
    throw new RangeError("candidate whole-assembly centroid-velocity declaration failed.");
  }
}
