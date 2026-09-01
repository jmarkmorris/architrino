import {
  evaluatePrescribedWorldlineOperator,
} from "./PrescribedWorldlineOperators.mjs";
import {
  projectCircularRelationshipParameters,
} from "./PrescribedCircularRelationshipParameters.mjs";

export const PRESCRIBED_ASSEMBLY_VALIDATOR_IDS = Object.freeze([
  "circular-relationship-consistency.v2",
  "centered-five-coordinate-consistency.v2",
  "phase-varying-history-consistency.v2",
  "scoped-negative-circular-consistency.v2",
  "polarity-resolved-harmonic-consistency.v2",
]);

const VALIDATORS = new Map([
  ["circular-relationship-consistency.v2", validateCircularRelationships],
  ["centered-five-coordinate-consistency.v2", validateCenteredFiveCoordinate],
  ["phase-varying-history-consistency.v2", validatePhaseVaryingHistory],
  ["scoped-negative-circular-consistency.v2", validateScopedNegativeCircular],
  ["polarity-resolved-harmonic-consistency.v2", validatePolarityResolvedHarmonic],
]);

export function runPrescribedAssemblyValidators(spec) {
  spec.constraints.validators.forEach((validatorId) => {
    const validator = VALIDATORS.get(validatorId);
    if (!validator) throw new TypeError(`prescribed assembly validator ${validatorId} is not registered.`);
    validator(spec);
  });
}

function validateCircularRelationships(spec) {
  projectCircularRelationshipParameters(spec);
}

function validateCenteredFiveCoordinate(spec) {
  requireInventory(spec, 6, "sd3-centered-linear-member.v1", "centered five-coordinate history");
  requirePolarityCounts(spec, 3, 3);
  if (spec.relationships.neutralPairs?.length !== 3) {
    throw new TypeError("centered five-coordinate history requires three declared neutral-pair relationships.");
  }
  const reconstruction = spec.geometry?.reconstruction;
  if (reconstruction?.operator !== "centered-five-coordinate-linear-history.v1" ||
      reconstruction.removedGauge?.coordinate !== "gamma" ||
      reconstruction.removedGauge?.value !== 0 ||
      reconstruction.removedGauge?.rate !== 0) {
    throw new TypeError("centered five-coordinate history requires its exact reconstruction and gamma=dot(gamma)=0 gauge.");
  }
  requireCentroid(spec, 0, 1e-12);
  requireCentroidVelocity(spec, 0, 1e-12);
}

function validateScopedNegativeCircular(spec) {
  requireInventory(spec, 8, "moving-circular.v1", "scoped-negative circular history");
  requirePolarityCounts(spec, 4, 4);
  if ((spec.relationships.neutralPairs ?? []).length !== 0) {
    throw new TypeError("scoped-negative circular axis modules must not be represented as neutral binaries.");
  }
}

function validatePhaseVaryingHistory(spec) {
  requireInventory(spec, 12, "f5-phase-varying-member.v1", "phase-varying history");
  requirePolarityCounts(spec, 6, 6);
  if ((spec.relationships.pairings ?? []).length !== 6) {
    throw new TypeError("phase-varying history requires six declared polarity-conjugate dyads.");
  }
  if ((spec.relationships.neutralPairs ?? []).length !== 0) {
    throw new TypeError("phase-varying polarity-conjugate dyads must not be reclassified as established neutral binaries.");
  }
  requireCentroid(spec, 0, 1e-12);
  requireCentroidVelocity(spec, 0, 1e-12);
}

function validatePolarityResolvedHarmonic(spec) {
  requireInventory(spec, 8, "f6c-harmonic-member.v1", "polarity-resolved harmonic history");
  requirePolarityCounts(spec, 4, 4);
  if ((spec.relationships.neutralPairs ?? []).length !== 0) {
    throw new TypeError("polarity-resolved harmonic axis modules must not be represented as neutral binaries.");
  }
  const operators = spec.worldlines.map((row) => row.operator);
  const axes = operators.filter((row) => row.polarity === 1).map((row) => row.axis);
  if (axes.length !== 4) throw new TypeError("polarity-resolved harmonic history requires four ordered positive-sector tetrahedral axes.");
  const sum = axes.reduce((accumulator, axis) => accumulator.map((value, index) => value + axis[index]), [0, 0, 0]);
  if (Math.hypot(...sum) > 1e-12) throw new RangeError("polarity-resolved harmonic tetrahedral axes must be centered.");
  for (let left = 0; left < axes.length; left += 1) {
    for (let right = left + 1; right < axes.length; right += 1) {
      const product = axes[left].reduce((total, value, index) => total + value * axes[right][index], 0);
      if (Math.abs(product + 1 / 3) > 1e-12) throw new RangeError("polarity-resolved harmonic axes must have tetrahedral pair products -1/3.");
    }
  }
}

function requireInventory(spec, count, operatorKind, label) {
  if (spec.constituents.length !== count) {
    throw new TypeError(`${label} requires ${count} individually declared constituents.`);
  }
  if (!spec.worldlines.every((row) => row.operator.kind === operatorKind)) {
    throw new TypeError(`${label} requires ${operatorKind} on every declared worldline.`);
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
