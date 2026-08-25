import fs from "node:fs";
import path from "node:path";

const DEFAULT_ACCELERATION_TOLERANCE = 1e-8;
const DEFAULT_ORIENTATION_TOLERANCE = 1e-12;
const DEFAULT_TRANSMITTER_FACTOR_FLOOR = 0.1;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function intervalNormBounds(intervals) {
  let lowerSquared = 0;
  let upperSquared = 0;
  for (const interval of intervals) {
    const lowerMagnitude = interval.lower <= 0 && interval.upper >= 0
      ? 0
      : Math.min(Math.abs(interval.lower), Math.abs(interval.upper));
    const upperMagnitude = Math.max(
      Math.abs(interval.lower), Math.abs(interval.upper));
    lowerSquared += lowerMagnitude ** 2;
    upperSquared += upperMagnitude ** 2;
  }
  return { lower: Math.sqrt(lowerSquared), upper: Math.sqrt(upperSquared) };
}

function orientationCensus(seeds) {
  const secondMoment = Array.from({ length: 3 }, () => [0, 0, 0]);
  let maximumFrameError = 0;
  for (const seed of seeds) {
    if (![seed.frameP, seed.frameQ, seed.frameNormal].every(
      (row) => Array.isArray(row) && row.length === 3 && row.every(Number.isFinite),
    )) {
      throw new Error(`site ${seed.pathId} lacks a finite local frame`);
    }
    const computedNormal = cross(seed.frameP, seed.frameQ);
    maximumFrameError = Math.max(
      maximumFrameError,
      Math.abs(dot(seed.frameP, seed.frameP) - 1),
      Math.abs(dot(seed.frameQ, seed.frameQ) - 1),
      Math.abs(dot(seed.frameP, seed.frameQ)),
      ...computedNormal.map((value, axis) =>
        Math.abs(value - seed.frameNormal[axis])),
    );
    for (let left = 0; left < 3; left += 1) {
      for (let right = 0; right < 3; right += 1) {
        secondMoment[left][right] +=
          seed.frameNormal[left] * seed.frameNormal[right] / seeds.length;
      }
    }
  }
  let maximumSecondMomentError = 0;
  for (let left = 0; left < 3; left += 1) {
    for (let right = 0; right < 3; right += 1) {
      maximumSecondMomentError = Math.max(
        maximumSecondMomentError,
        Math.abs(secondMoment[left][right] - (left === right ? 1 / 3 : 0)),
      );
    }
  }
  return { secondMoment, maximumFrameError, maximumSecondMomentError };
}

function expectedCircularAcceleration(seed, radius, angularRate) {
  const cosine = Math.cos(seed.phase);
  const sine = Math.sin(seed.phase);
  const scale = -radius * angularRate ** 2;
  return seed.frameP.map((value, axis) =>
    scale * (value * cosine + seed.frameQ[axis] * sine));
}

export function analyzeAdaptiveSiteLocalReleaseDirectory(
  outDirectory,
  options = {},
) {
  const accelerationTolerance = options.accelerationTolerance
    ?? DEFAULT_ACCELERATION_TOLERANCE;
  const orientationTolerance = options.orientationTolerance
    ?? DEFAULT_ORIENTATION_TOLERANCE;
  const transmitterFactorFloor = options.transmitterFactorFloor
    ?? DEFAULT_TRANSMITTER_FACTOR_FLOOR;
  const manifest = readJson(path.join(outDirectory, "run-manifest.json"));
  const release = readJson(path.join(outDirectory, "release-acceleration.json"));
  const coordinate = manifest.adaptiveCubicMediumCoordinate;
  if (manifest.seedFamily !== "f6c-cubic-site-local-v1" ||
      coordinate?.orientationField !== "tetrahedral-parity-v1" ||
      !Number.isFinite(coordinate.spacing) || !(coordinate.spacing > 0) ||
      !Number.isFinite(coordinate.orbitRadius) ||
      !Number.isFinite(coordinate.angularRate)) {
    throw new Error("manifest is not a valid adaptive site-local cubic run");
  }
  if (release.schema !== "f6c_cubic_site_local_release_acceleration/v0" ||
      release.status !== "certified_complete" ||
      release.rootCertificates.length !== manifest.population ** 2 ||
      release.rootCertificates.some((row) => row.status !== "certified_complete")) {
    throw new Error("site-local release root record is incomplete");
  }
  const byPathId = new Map(release.receiverAccelerations.map(
    (row) => [row.pathId, row.acceleration],
  ));
  const members = manifest.seeds.map((seed) => {
    const acceleration = byPathId.get(seed.pathId);
    if (!acceleration || acceleration.length !== 3) {
      throw new Error(`release lacks receiver acceleration for ${seed.pathId}`);
    }
    const expected = expectedCircularAcceleration(
      seed, coordinate.orbitRadius, coordinate.angularRate);
    const residual = acceleration.map((interval, axis) => ({
      lower: interval.lower - expected[axis],
      upper: interval.upper - expected[axis],
    }));
    const bounds = intervalNormBounds(residual);
    return {
      pathId: seed.pathId,
      expectedAcceleration: expected,
      residualNormLower: bounds.lower,
      residualNormUpper: bounds.upper,
      normalizedResidualLower: bounds.lower / coordinate.spacing,
      normalizedResidualUpper: bounds.upper / coordinate.spacing,
    };
  });
  const orientation = orientationCensus(manifest.seeds);
  const maximumResidualLower = Math.max(...members.map(
    (row) => row.normalizedResidualLower));
  const maximumResidualUpper = Math.max(...members.map(
    (row) => row.normalizedResidualUpper));
  const transmitterFactorPass =
    Number.isFinite(release.minimumTransmitterFactorMagnitude) &&
    release.minimumTransmitterFactorMagnitude >= transmitterFactorFloor;
  const orientationPass =
    orientation.maximumFrameError <= orientationTolerance &&
    orientation.maximumSecondMomentError <= orientationTolerance;
  return {
    schema: "adaptive-cubic-site-local-release-analysis/v1",
    claimGrade: "measured-eom-solver-finite-replicated-release-diagnostic",
    runId: manifest.runId,
    modelFingerprint: manifest.modelFingerprint,
    latticeSide: coordinate.latticeSide,
    population: manifest.population,
    boundary: coordinate.boundaryStatus,
    orientationField: coordinate.orientationField,
    guards: {
      releaseRootsComplete: true,
      transmitterFactor: transmitterFactorPass,
      exactSecondRankOrientationCensus: orientationPass,
    },
    measurements: {
      accelerationTolerance,
      orientationTolerance,
      transmitterFactorFloor,
      minimumTransmitterFactorMagnitude:
        release.minimumTransmitterFactorMagnitude,
      orientationSecondMoment: orientation.secondMoment,
      maximumFrameError: orientation.maximumFrameError,
      maximumOrientationSecondMomentError:
        orientation.maximumSecondMomentError,
      maximumNormalizedReleaseResidualLower: maximumResidualLower,
      maximumNormalizedReleaseResidualUpper: maximumResidualUpper,
      members,
    },
    decision: !transmitterFactorPass || !orientationPass
      ? "release_guard_rejected"
      : maximumResidualLower > accelerationTolerance
      ? "site_local_circular_history_rejected_at_release"
      : maximumResidualUpper <= accelerationTolerance
      ? "site_local_circular_release_match_certified"
      : "site_local_circular_release_match_unresolved",
    onePeriodHistoryReturn: "not_evaluated_release_gate_first",
    propagationRows: "not_run",
    physicalReceiverRows: "not_run",
    infiniteMediumClaim: "excluded_finite_open_crop",
  };
}

export function analyzeAdaptiveSiteLocalReleaseLadder(
  outDirectories,
  options = {},
) {
  const declaredSides = options.declaredSides ?? [2, 4, 6];
  const rows = outDirectories.map((directory) =>
    analyzeAdaptiveSiteLocalReleaseDirectory(directory, options))
    .sort((left, right) => left.latticeSide - right.latticeSide);
  const complete = declaredSides.every((side) =>
    rows.some((row) => row.latticeSide === side));
  const allRejected = complete && declaredSides.every((side) =>
    rows.find((row) => row.latticeSide === side)?.decision ===
      "site_local_circular_history_rejected_at_release");
  return {
    schema: "adaptive-cubic-site-local-release-ladder-analysis/v1",
    declaredSides,
    complete,
    rows,
    decision: !complete
      ? "declared_ladder_incomplete"
      : rows.some((row) => row.decision === "release_guard_rejected")
      ? "declared_ladder_guard_rejected"
      : allRejected
      ? "site_local_circular_history_rejected_across_declared_ladder"
      : rows.some((row) =>
        row.decision === "site_local_circular_release_match_certified")
      ? "release_match_candidate_requires_one_period_evolution"
      : "declared_ladder_unresolved",
    propagationRows: "not_run",
    physicalReceiverRows: "not_run",
    infiniteMediumClaim: "excluded_no_exterior_tail_envelope",
  };
}
