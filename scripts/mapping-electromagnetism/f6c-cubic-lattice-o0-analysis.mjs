import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_SYMMETRY_TOLERANCE = 1e-8;
const DEFAULT_CLEARANCE_FLOOR = 0.05;
const DEFAULT_TRANSMITTER_FACTOR_FLOOR = 0.1;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readJsonLines(filePath) {
  return fs.readFileSync(filePath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function siteCoordinate(pathId) {
  const match = /^g(?:(\d)(\d)(\d)|(\d+)_(\d+)_(\d+))[+-]$/u.exec(pathId);
  if (!match) throw new TypeError(`invalid cubic-lattice path id: ${pathId}`);
  return (match[1] === undefined ? match.slice(4, 7) : match.slice(1, 4))
    .map(Number);
}

function declaredLatticeSide(manifest) {
  const declared = manifest.f6cCubicLatticeCoordinate?.latticeSide;
  const side = declared ?? Math.round(Math.cbrt(manifest.population));
  if (!Number.isInteger(side) || side < 2 || side % 2 !== 0 ||
      side ** 3 !== manifest.population) {
    throw new Error("manifest does not declare an even cubic lattice population");
  }
  return side;
}

function siteCenter(pathId, spacing, side) {
  const centerIndex = (side - 1) / 2;
  return siteCoordinate(pathId).map((value) =>
    (value - centerIndex) * spacing);
}

function norm(values) {
  return Math.hypot(...values);
}

function frameLeakage(rows, seeds, spacing, side) {
  if (rows.length !== seeds.length) {
    throw new Error("each sampled frame must contain every declared site");
  }
  const displacementRows = rows.map((row) => {
    const seed = seeds[row.pathKey - 1];
    if (!seed) throw new Error(`unknown pathKey ${row.pathKey}`);
    const center = siteCenter(seed.pathId, spacing, side);
    return {
      pathId: seed.pathId,
      polarity: seed.pathId.endsWith("+") ? 1 : -1,
      displacement: [
        row.position.x - center[0],
        row.position.y - center[1],
        row.position.z - center[2],
      ],
    };
  });
  let maximum = 0;
  const sectorMeans = {};
  for (const polarity of [1, -1]) {
    const sector = displacementRows.filter((row) => row.polarity === polarity);
    const mean = [0, 1, 2].map((axis) =>
      sector.reduce((sum, row) => sum + row.displacement[axis], 0)
        / sector.length);
    sectorMeans[String(polarity)] = mean;
    for (const row of sector) {
      maximum = Math.max(maximum, norm(row.displacement.map(
        (value, axis) => value - mean[axis],
      )) / spacing);
    }
  }
  return { normalizedTranslationSublatticeLeakage: maximum, sectorMeans };
}

function intervalNormBounds(values) {
  let lowerSquared = 0;
  let upperSquared = 0;
  for (const value of values) {
    const minimumMagnitude = value.lower <= 0 && value.upper >= 0
      ? 0
      : Math.min(Math.abs(value.lower), Math.abs(value.upper));
    const maximumMagnitude = Math.max(
      Math.abs(value.lower), Math.abs(value.upper));
    lowerSquared += minimumMagnitude ** 2;
    upperSquared += maximumMagnitude ** 2;
  }
  return { lower: Math.sqrt(lowerSquared), upper: Math.sqrt(upperSquared) };
}

function accelerationLeakage(receiverAccelerations, side, spacing) {
  const centralIndices = new Set([side / 2 - 1, side / 2]);
  const core = receiverAccelerations.map((row) => ({
    ...row,
    coordinate: siteCoordinate(row.pathId),
    polarity: row.pathId.endsWith("+") ? 1 : -1,
  })).filter((row) => row.coordinate.every((value) =>
    centralIndices.has(value)));
  if (core.length !== 8) {
    throw new Error(`central core has ${core.length} members instead of 8`);
  }
  let lower = 0;
  let upper = 0;
  const memberBounds = [];
  for (const polarity of [1, -1]) {
    const sector = core.filter((row) => row.polarity === polarity);
    if (sector.length !== 4) {
      throw new Error("central core does not contain four members per polarity");
    }
    const mean = [0, 1, 2].map((axis) => ({
      lower: sector.reduce((sum, row) =>
        sum + row.acceleration[axis].lower, 0) / sector.length,
      upper: sector.reduce((sum, row) =>
        sum + row.acceleration[axis].upper, 0) / sector.length,
    }));
    for (const row of sector) {
      const difference = row.acceleration.map((axis, index) => ({
        lower: axis.lower - mean[index].upper,
        upper: axis.upper - mean[index].lower,
      }));
      const bounds = intervalNormBounds(difference);
      lower = Math.max(lower, bounds.lower / spacing);
      upper = Math.max(upper, bounds.upper / spacing);
      memberBounds.push({
        pathId: row.pathId,
        normalizedLower: bounds.lower / spacing,
        normalizedUpper: bounds.upper / spacing,
      });
    }
  }
  return {
    corePathIds: core.map((row) => row.pathId),
    normalizedLower: lower,
    normalizedUpper: upper,
    memberBounds,
  };
}

export function analyzeO0ReleaseDirectory(outDirectory, options = {}) {
  const symmetryTolerance = options.symmetryTolerance
    ?? DEFAULT_SYMMETRY_TOLERANCE;
  const transmitterFactorFloor = options.transmitterFactorFloor
    ?? DEFAULT_TRANSMITTER_FACTOR_FLOOR;
  const manifest = readJson(path.join(outDirectory, "run-manifest.json"));
  const release = readJson(path.join(outDirectory, "release-acceleration.json"));
  const spacing = manifest.f6cCubicLatticeCoordinate?.spacing;
  if (manifest.seedFamily !== "f6c-cubic-lattice-o0-v1" ||
      !Number.isFinite(spacing) || !(spacing > 0)) {
    throw new Error("manifest is not a valid F6c cubic-lattice O0 run");
  }
  const side = declaredLatticeSide(manifest);
  if (release.status !== "certified_complete" ||
      release.rootCertificates.length !== manifest.population ** 2 ||
      release.rootCertificates.some((row) => row.status !== "certified_complete")) {
    throw new Error("release root record is incomplete");
  }
  const leakage = accelerationLeakage(
    release.receiverAccelerations, side, spacing);
  const transmitterFactorPass =
    Number.isFinite(release.minimumTransmitterFactorMagnitude) &&
    release.minimumTransmitterFactorMagnitude >= transmitterFactorFloor;
  return {
    schema: "f6c-cubic-lattice-o0-release-analysis/v1",
    claimGrade: "measured-eom-solver-finite-replicated-diagnostic",
    runId: manifest.runId,
    modelFingerprint: manifest.modelFingerprint,
    boundary: manifest.f6cCubicLatticeCoordinate.boundaryStatus,
    latticeSide: side,
    population: manifest.population,
    releaseRootRows: release.rootCertificates.length,
    guards: {
      releaseRootsComplete: true,
      transmitterFactor: transmitterFactorPass,
    },
    measurements: {
      symmetryTolerance,
      centralCoreNormalizedAccelerationLeakageLower: leakage.normalizedLower,
      centralCoreNormalizedAccelerationLeakageUpper: leakage.normalizedUpper,
      centralCorePathIds: leakage.corePathIds,
      transmitterFactorFloor,
      minimumTransmitterFactorMagnitude:
        release.minimumTransmitterFactorMagnitude,
    },
    decision: !transmitterFactorPass
      ? "release_guard_rejected"
      : leakage.normalizedLower > symmetryTolerance
      ? "release_split_certified"
      : leakage.normalizedUpper <= symmetryTolerance
      ? "release_symmetry_certified_to_tolerance"
      : "release_symmetry_unresolved",
    responseRows: "not_run",
  };
}

export function analyzeO0ReplicationLadder(outDirectories, options = {}) {
  const rows = outDirectories.map((directory) =>
    analyzeO0ReleaseDirectory(directory, options))
    .sort((left, right) => left.latticeSide - right.latticeSide);
  const declaredSides = options.declaredSides ?? [2, 4, 6];
  const complete = declaredSides.every((side) =>
    rows.some((row) => row.latticeSide === side));
  const upperBounds = rows.map((row) =>
    row.measurements.centralCoreNormalizedAccelerationLeakageUpper);
  const monotonicallyDecreasing = upperBounds.every((value, index) =>
    index === 0 || value < upperBounds[index - 1]);
  const final = complete ? rows.find((row) =>
    row.latticeSide === declaredSides.at(-1)) : null;
  return {
    schema: "f6c-cubic-lattice-o0-replication-ladder-analysis/v1",
    declaredSides,
    complete,
    rows,
    boundedBoundarySuppressionTrend: complete && monotonicallyDecreasing,
    decision: !complete
      ? "declared_ladder_incomplete"
      : rows.some((row) => row.decision === "release_guard_rejected")
      ? "declared_ladder_guard_rejected"
      : rows.some((row) =>
        row.decision === "release_symmetry_certified_to_tolerance")
      ? "rung_release_symmetry_candidate_requires_evolution"
      : final?.decision === "release_split_certified"
      ? "declared_ladder_did_not_remove_release_split"
      : "declared_ladder_unresolved",
    infiniteMediumClaim: "excluded_no_exterior_tail_envelope",
    responseRows: "not_run",
  };
}

export function analyzeO0Directory(outDirectory, options = {}) {
  const symmetryTolerance = options.symmetryTolerance
    ?? DEFAULT_SYMMETRY_TOLERANCE;
  const clearanceFloor = options.clearanceFloor ?? DEFAULT_CLEARANCE_FLOOR;
  const transmitterFactorFloor = options.transmitterFactorFloor
    ?? DEFAULT_TRANSMITTER_FACTOR_FLOOR;
  const manifest = readJson(path.join(outDirectory, "run-manifest.json"));
  const release = readJson(path.join(outDirectory, "release-acceleration.json"));
  const census = readJsonLines(path.join(outDirectory, "census.jsonl"));
  const frames = readJsonLines(path.join(outDirectory, "frames.jsonl"));
  const spacing = manifest.f6cCubicLatticeCoordinate?.spacing;
  if (manifest.seedFamily !== "f6c-cubic-lattice-o0-v1" ||
      !Number.isFinite(spacing) || !(spacing > 0)) {
    throw new Error("manifest is not a valid F6c cubic-lattice O0 run");
  }
  if (release.status !== "certified_complete" ||
      release.rootCertificates.length !== manifest.population ** 2) {
    throw new Error("release root record is incomplete");
  }
  if (census.length === 0) throw new Error("run has no complete evolved checkpoint");
  const side = declaredLatticeSide(manifest);
  const checkpointTime = Number(census.at(-1).time);
  const framesByIndex = new Map();
  for (const row of frames.filter((frame) => frame.time <= checkpointTime)) {
    if (!framesByIndex.has(row.frameIndex)) framesByIndex.set(row.frameIndex, []);
    framesByIndex.get(row.frameIndex).push(row);
  }
  const leakageRows = [...framesByIndex.entries()]
    .sort(([left], [right]) => left - right)
    .map(([frameIndex, rows]) => ({
      frameIndex,
      time: rows[0].time,
      ...frameLeakage(rows, manifest.seeds, spacing, side),
    }));
  const firstSymmetryFailure = leakageRows.find((row) =>
    row.normalizedTranslationSublatticeLeakage > symmetryTolerance) ?? null;
  const maximumSymmetryLeakage = Math.max(...leakageRows.map((row) =>
    row.normalizedTranslationSublatticeLeakage));
  const minimumPairClearance = Math.min(...census.map((row) =>
    row.minPairDistanceInChunk));
  const maximumMemberSpeed = Math.max(...census.map((row) => row.maxSpeed));
  const minimumTransmitterFactorMagnitude = Math.min(...census
    .map((row) => row.engine.minimumTransmitterFactorMagnitude)
    .filter(Number.isFinite));
  const maximumRootMultiplicity = Math.max(...census.map((row) =>
    row.engine.maximumRootMultiplicity));
  const guards = {
    releaseRootsComplete: manifest.releaseRootClearance === "certified_complete",
    acceptedCheckpointRootsComplete: census.every((row) =>
      row.engine.status === "completed" && row.engine.rejectedSteps === 0),
    transmitterFactor: minimumTransmitterFactorMagnitude
      >= transmitterFactorFloor,
    pairClearance: minimumPairClearance >= clearanceFloor,
    memberSpeed: maximumMemberSpeed < 1,
    translationSublatticeSymmetry: firstSymmetryFailure === null,
  };
  const backgroundRejected = Object.values(guards).includes(false);
  const completedPeriod = manifest.status === "completed" &&
    Number(manifest.acceptedEndTime) >= Number(manifest.requestedEndTime);
  return {
    schema: "f6c-cubic-lattice-o0-analysis/v1",
    claimGrade: "measured-eom-solver-finite-replicated-diagnostic",
    boundary: manifest.f6cCubicLatticeCoordinate.boundaryStatus,
    runId: manifest.runId,
    modelFingerprint: manifest.modelFingerprint,
    completeCheckpointTime: checkpointTime,
    requestedPeriodEnd: manifest.requestedEndTime,
    releaseRootRows: release.rootCertificates.length,
    guards,
    measurements: {
      symmetryTolerance,
      maximumNormalizedTranslationSublatticeLeakage: maximumSymmetryLeakage,
      firstSymmetryFailure,
      clearanceFloor,
      minimumPairClearance,
      transmitterFactorFloor,
      minimumTransmitterFactorMagnitude,
      maximumMemberSpeed,
      maximumRootMultiplicity,
    },
    decision: backgroundRejected
      ? "background_rejected"
      : completedPeriod
      ? "background_requires_history_return_comparison"
      : "background_incomplete",
    onePeriodHistoryReturn: backgroundRejected
      ? "not_evaluated_background_rejected_before_period"
      : completedPeriod
      ? "not_evaluated_by_this_guard_analyzer"
      : "not_evaluated_run_incomplete",
    responseRows: "not_run",
    excludedClaims: [
      "periodic_exact",
      "infinite_medium",
      "retained_branch",
      "stability",
      "modulus",
      "propagation",
      "electromagnetic_response",
      "gravity_response",
      "Noether_sea_identity",
    ],
  };
}

function parseCli(argv) {
  const outDirectories = argv.filter((argument) => !argument.startsWith("--"));
  if (outDirectories.length === 0) {
    throw new TypeError("usage: node f6c-cubic-lattice-o0-analysis.mjs OUT_DIR");
  }
  return { outDirectories, releaseLadder: argv.includes("--release-ladder") };
}

if (process.argv[1] &&
    fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const cli = parseCli(process.argv.slice(2));
  const result = cli.releaseLadder
    ? analyzeO0ReplicationLadder(cli.outDirectories)
    : analyzeO0Directory(cli.outDirectories[0]);
  console.log(JSON.stringify(result, null, 2));
}
