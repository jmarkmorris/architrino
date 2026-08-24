import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { f6cSectorCurrentFlow } from "./f6c-current-transport.mjs";
import {
  f6cCurrentCorridorDecomposition,
  f6cPairDistanceRateRow,
} from "./f6c-linear-constraint-geometry.mjs";

// Rank already-generated, root-certified F6c release frames by exact current
// capacity and causal-speed use. This is a bounded record census, not a basin
// measure, dynamical continuation, retained braid, or particle assignment.

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const analyzer = path.join(scriptDirectory, "f6c-eom-coordinate-analysis.mjs");
const compactOutput = process.argv.includes("--compact");
const rootArguments = process.argv.slice(2).filter(
  (argument) => !argument.startsWith("--"),
);
const searchRoots = rootArguments.length > 0
  ? rootArguments
  : [".tmp"];

function findManifests(root, results = []) {
  if (!fs.existsSync(root)) return results;
  const stat = fs.statSync(root);
  if (stat.isFile()) {
    if (path.basename(root) === "run-manifest.json") results.push(root);
    return results;
  }
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const child = path.join(root, entry.name);
    if (entry.isDirectory()) findManifests(child, results);
    else if (entry.isFile() && entry.name === "run-manifest.json") results.push(child);
  }
  return results;
}

const manifests = searchRoots.flatMap((root) => findManifests(root));
const eligible = manifests.flatMap((manifestPath) => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (
    manifest.seedFamily !== "f6c-balanced-tetrahedral-v1"
    || manifest.releaseRootClearance !== "certified_complete"
    || Number(manifest.framesEmitted ?? 0) < 8
  ) {
    return [];
  }
  return [{ manifestPath, manifest }];
});

const unique = new Map();
for (const row of eligible) {
  const coordinate = row.manifest.f6cCoordinate;
  const key = JSON.stringify([
    row.manifest.seedFamily,
    row.manifest.coupling,
    coordinate.positiveRate,
    coordinate.negativeRate,
    coordinate.negativeTheta,
    coordinate.breathingRate,
    coordinate.cyclePhase,
    coordinate.positiveHAmplitude,
    coordinate.negativeHAmplitude,
    coordinate.positiveRhoAmplitude,
    coordinate.negativeRhoAmplitude,
    coordinate.positivePhaseAmplitude ?? 0,
    coordinate.negativePhaseAmplitude ?? 0,
  ]);
  const prior = unique.get(key);
  const isPreferred = !prior
    || Number(row.manifest.rootTolerance)
      < Number(prior.manifest.rootTolerance)
    || (
      Number(row.manifest.rootTolerance)
        === Number(prior.manifest.rootTolerance)
      && Number(row.manifest.acceptedEndTime)
        < Number(prior.manifest.acceptedEndTime)
    );
  if (isPreferred) unique.set(key, row);
}

const rows = [];
const analysisFailures = [];
let analyzed = 0;
for (const { manifestPath, manifest } of unique.values()) {
  const outDirectory = path.dirname(manifestPath);
  const child = spawnSync(
    process.execPath,
    [analyzer, outDirectory, "--release-capacity-only"],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  analyzed += 1;
  if (analyzed % 100 === 0 || analyzed === unique.size) {
    process.stderr.write(`release_capacity_progress=${analyzed}/${unique.size}\n`);
  }
  if (child.status !== 0) {
    analysisFailures.push({
      outDirectory,
      exitStatus: child.status,
      stderr: child.stderr.trim(),
    });
    continue;
  }
  const report = JSON.parse(child.stdout);
  const frame = report.releaseFrame;
  const positive = frame.sectors.positive;
  const negative = frame.sectors.negative;
  const sectorRows = [positive, negative];
  const sectorNames = ["positive", "negative"];
  const sectorCurrentMoments = sectorRows.map(
    (sector) => sector.currentCapacity.predictedAxialCurrentMoment,
  );
  const sectorCurrentDerivatives = sectorRows.map((sector, index) => {
    const sectorName = sectorNames[index];
    const acceleration = report.releaseAcceleration?.sectors?.[sectorName]
      ?.coordinateSecondDerivatives;
    if (!acceleration) return null;
    return f6cSectorCurrentFlow(
      sectorName,
      sector,
      acceleration,
    ).currentDerivative;
  });
  const totalCurrentMoment = sectorCurrentMoments.reduce(
    (sum, value) => sum + value,
    0,
  );
  const totalCurrentDerivative = sectorCurrentDerivatives.every(
    (value) => value !== null,
  ) ? sectorCurrentDerivatives.reduce((sum, value) => sum + value, 0) : null;
  const sectorCurrentDerivativeAbsoluteSum = sectorCurrentDerivatives.every(
    (value) => value !== null,
  ) ? sectorCurrentDerivatives.reduce(
      (sum, value) => sum + Math.abs(value),
      0,
    ) : null;
  const absoluteFractionalCurrentDerivative = totalCurrentDerivative === null
      || totalCurrentMoment === 0
    ? null
    : Math.abs(totalCurrentDerivative / totalCurrentMoment);
  const currentExchangeRatePerCurrent = sectorCurrentDerivativeAbsoluteSum
      === null || totalCurrentMoment === 0
    ? null
    : sectorCurrentDerivativeAbsoluteSum / Math.abs(totalCurrentMoment);
  const currentTransferCancellationFraction = sectorCurrentDerivativeAbsoluteSum
      === null || sectorCurrentDerivativeAbsoluteSum === 0
    ? 0
    : 1 - Math.abs(totalCurrentDerivative)
      / sectorCurrentDerivativeAbsoluteSum;
  const currentCapacityAtActualSpeeds = sectorRows.reduce(
    (sum, sector) => sum
      + sector.currentCapacity.unitSpeedCapacity
        * sector.coordinateSpeedBudget.memberSpeed,
    0,
  );
  const absoluteSectorCurrentSum = sectorCurrentMoments.reduce(
    (sum, value) => sum + Math.abs(value),
    0,
  );
  const maximumMemberSpeed = Math.max(...sectorRows.map(
    (sector) => sector.coordinateSpeedBudget.memberSpeed,
  ));
  const corridor = f6cPairDistanceRateRow(
    frame.sectors,
    frame.minimumPair.ids,
  );
  const currentOnlyCorridorDistanceRate = corridor.row.reduce(
    (sum, value, index) => sum
      + value * frame.assemblyCurrentDecomposition.minimumNormCarrier[index],
    0,
  );
  const currentCorridorDecomposition = f6cCurrentCorridorDecomposition(
    frame.sectors,
    frame.minimumPair.ids,
    totalCurrentMoment,
    frame.minimumPair.distanceRate,
  );
  const speedFlowBySector = Object.fromEntries(sectorNames.map(
    (sectorName, index) => {
      const sector = sectorRows[index];
      const acceleration = report.releaseAcceleration?.sectors?.[sectorName]
        ?.coordinateSecondDerivatives;
      if (!acceleration) return [sectorName, null];
      const rateVector = [
        sector.hDot,
        sector.rhoDot,
        sector.rho * sector.thetaDot,
      ];
      const rateVectorDerivative = [
        acceleration.hDDot,
        acceleration.rhoDDot,
        sector.rhoDot * sector.thetaDot
          + sector.rho * acceleration.thetaDDot,
      ];
      const speed = sector.coordinateSpeedBudget.memberSpeed;
      const speedDerivative = speed === 0
        ? Math.hypot(...rateVectorDerivative)
        : rateVector.reduce((sum, value, component) =>
          sum + value * rateVectorDerivative[component], 0) / speed;
      return [sectorName, {
        rateVector,
        rateVectorDerivative,
        rateVectorDerivativeNorm: Math.hypot(...rateVectorDerivative),
        speedDerivative,
        localLinearTimeToUnitSpeed:
          speedDerivative > 0 ? (1 - speed) / speedDerivative : null,
      }];
    },
  ));
  const availableSpeedFlows = Object.values(speedFlowBySector).filter(Boolean);
  const maximumSectorSpeedDerivative = availableSpeedFlows.length === 0
    ? null
    : Math.max(...availableSpeedFlows.map((flow) => flow.speedDerivative));
  const maximumPositiveSectorSpeedDerivative = Math.max(
    0,
    maximumSectorSpeedDerivative ?? 0,
  );
  const maximumRateVectorDerivativeNorm = availableSpeedFlows.length === 0
    ? null
    : Math.max(...availableSpeedFlows.map(
      (flow) => flow.rateVectorDerivativeNorm,
    ));
  const minimumLocalLinearTimeToUnitSpeed = availableSpeedFlows
    .map((flow) => flow.localLinearTimeToUnitSpeed)
    .filter((value) => value !== null)
    .reduce((minimum, value) => Math.min(minimum, value), Infinity);
  rows.push({
    outDirectory,
    runId: manifest.runId,
    generatingSpec: manifest.generatingSpec,
    f6cCoordinate: manifest.f6cCoordinate,
    acceptedEndTime: Number(manifest.acceptedEndTime),
    releaseMinimumPairDistance: frame.minimumPair.distance,
    releaseMinimumPairDistanceRate: frame.minimumPair.distanceRate,
    maximumMemberSpeed,
    fieldSpeedMargin: 1 - maximumMemberSpeed,
    speedFlowBySector,
    maximumSectorSpeedDerivative,
    maximumPositiveSectorSpeedDerivative,
    maximumRateVectorDerivativeNorm,
    minimumLocalLinearTimeToUnitSpeed: Number.isFinite(
      minimumLocalLinearTimeToUnitSpeed,
    ) ? minimumLocalLinearTimeToUnitSpeed : null,
    sectorCurrentMoments: {
      positive: sectorCurrentMoments[0],
      negative: sectorCurrentMoments[1],
    },
    sectorCurrentDerivatives: {
      positive: sectorCurrentDerivatives[0],
      negative: sectorCurrentDerivatives[1],
    },
    totalCurrentMoment,
    totalCurrentDerivative,
    sectorCurrentDerivativeAbsoluteSum,
    absoluteFractionalCurrentDerivative,
    currentExchangeRatePerCurrent,
    currentTransferCancellationFraction,
    absoluteTotalCurrentMoment: Math.abs(totalCurrentMoment),
    currentCapacityAtActualSpeeds,
    combinedCurrentAlignmentFraction:
      currentCapacityAtActualSpeeds === 0
        ? 0 : Math.abs(totalCurrentMoment) / currentCapacityAtActualSpeeds,
    sectorReinforcementFraction:
      absoluteSectorCurrentSum === 0
        ? 0 : Math.abs(totalCurrentMoment) / absoluteSectorCurrentSum,
    currentMagnitudePerMaximumMemberSpeed:
      maximumMemberSpeed === 0
        ? 0 : Math.abs(totalCurrentMoment) / maximumMemberSpeed,
    assemblyCurrentDecomposition: frame.assemblyCurrentDecomposition,
    currentCorridorGeometry: {
      currentOnlyCorridorDistanceRate,
      minimumNormForMeasuredCurrentAndCorridor:
        currentCorridorDecomposition.constrainedCarrier.norm,
      maximumSectorMemberSpeedForMeasuredCurrentAndCorridor:
        currentCorridorDecomposition.constrainedCarrier
          .maximumSectorMemberSpeed,
      jointNeutralResidualNorm:
        currentCorridorDecomposition.jointNeutralResidualNorm,
      jointConstraintEfficiency:
        currentCorridorDecomposition.constrainedCarrier.norm
          / frame.assemblyCurrentDecomposition.rateNorm,
    },
    sectors: {
      positive: {
        speedBudget: positive.coordinateSpeedBudget,
        currentCapacity: positive.currentCapacity,
      },
      negative: {
        speedBudget: negative.coordinateSpeedBudget,
        currentCapacity: negative.currentCapacity,
      },
    },
  });
}

function descending(key) {
  return (left, right) => right[key] - left[key];
}

function dominates(left, right) {
  const noWorse = left.currentMagnitudePerMaximumMemberSpeed
      >= right.currentMagnitudePerMaximumMemberSpeed
    && left.combinedCurrentAlignmentFraction
      >= right.combinedCurrentAlignmentFraction
    && left.releaseMinimumPairDistance >= right.releaseMinimumPairDistance
    && left.releaseMinimumPairDistanceRate >= right.releaseMinimumPairDistanceRate
    && left.maximumPositiveSectorSpeedDerivative
      <= right.maximumPositiveSectorSpeedDerivative
    && left.maximumRateVectorDerivativeNorm
      <= right.maximumRateVectorDerivativeNorm
    && left.absoluteFractionalCurrentDerivative
      <= right.absoluteFractionalCurrentDerivative
    && left.fieldSpeedMargin >= right.fieldSpeedMargin;
  const better = left.currentMagnitudePerMaximumMemberSpeed
      > right.currentMagnitudePerMaximumMemberSpeed
    || left.combinedCurrentAlignmentFraction
      > right.combinedCurrentAlignmentFraction
    || left.releaseMinimumPairDistance > right.releaseMinimumPairDistance
    || left.releaseMinimumPairDistanceRate > right.releaseMinimumPairDistanceRate
    || left.maximumPositiveSectorSpeedDerivative
      < right.maximumPositiveSectorSpeedDerivative
    || left.maximumRateVectorDerivativeNorm
      < right.maximumRateVectorDerivativeNorm
    || left.absoluteFractionalCurrentDerivative
      < right.absoluteFractionalCurrentDerivative
    || left.fieldSpeedMargin > right.fieldSpeedMargin;
  return noWorse && better;
}

const paretoFrontier = rows.filter((candidate) =>
  !rows.some((other) => other !== candidate && dominates(other, candidate)))
  .sort(descending("currentMagnitudePerMaximumMemberSpeed"));

function distributionSummary(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const quantile = (fraction) => {
    if (sorted.length === 0) return null;
    const position = fraction * (sorted.length - 1);
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    const weight = position - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };
  return {
    count: sorted.length,
    minimum: sorted[0] ?? null,
    q25: quantile(0.25),
    median: quantile(0.5),
    q75: quantile(0.75),
    maximum: sorted.at(-1) ?? null,
  };
}

const activeCurrentHandoffs = rows.filter((row) =>
  row.currentTransferCancellationFraction >= 0.9
    && row.currentExchangeRatePerCurrent >= 0.5
    && row.absoluteFractionalCurrentDerivative <= 0.1);
const guardedActiveCurrentHandoffs = activeCurrentHandoffs.filter((row) =>
  row.releaseMinimumPairDistanceRate >= 0
    && row.maximumPositiveSectorSpeedDerivative === 0);
const assemblyCurrentEfficiencySummary = {
  all: distributionSummary(rows.map(
    (row) => row.assemblyCurrentDecomposition.currentEfficiency,
  )),
  activeHandoff: distributionSummary(activeCurrentHandoffs.map(
    (row) => row.assemblyCurrentDecomposition.currentEfficiency,
  )),
  guardedActiveHandoff: distributionSummary(guardedActiveCurrentHandoffs.map(
    (row) => row.assemblyCurrentDecomposition.currentEfficiency,
  )),
};
const openingRows = rows.filter(
  (row) => row.releaseMinimumPairDistanceRate >= 0,
);
const currentCorridorSummary = {
  openingReleaseCount: openingRows.length,
  openingWhoseCurrentOnlyCarrierClosesCount: openingRows.filter((row) =>
    row.currentCorridorGeometry.currentOnlyCorridorDistanceRate < 0).length,
  activeHandoffOpeningCount: activeCurrentHandoffs.filter((row) =>
    row.releaseMinimumPairDistanceRate >= 0).length,
  activeHandoffOpeningWhoseCurrentOnlyCarrierClosesCount:
    activeCurrentHandoffs.filter((row) =>
      row.releaseMinimumPairDistanceRate >= 0
        && row.currentCorridorGeometry.currentOnlyCorridorDistanceRate < 0)
      .length,
  guardedActiveHandoffCount: guardedActiveCurrentHandoffs.length,
  guardedActiveHandoffWhoseCurrentOnlyCarrierClosesCount:
    guardedActiveCurrentHandoffs.filter((row) =>
      row.currentCorridorGeometry.currentOnlyCorridorDistanceRate < 0).length,
  guardedActiveHandoffJointConstraintEfficiency: distributionSummary(
    guardedActiveCurrentHandoffs.map((row) =>
      row.currentCorridorGeometry.jointConstraintEfficiency),
  ),
};

const report = {
  schema: "f6c-release-current-capacity-ranking/v1",
  claimGrade: "measured-existing-root-certified-release-census",
  excludedClaims: [
    "basin-measure",
    "evolved-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
    "global-optimum",
  ],
  searchedManifestCount: manifests.length,
  eligibleManifestCount: eligible.length,
  uniqueReleaseCount: unique.size,
  analyzedReleaseCount: rows.length,
  analysisFailures,
  assemblyCurrentEfficiencySummary,
  currentCorridorSummary,
  rankingDefinitions: {
    currentMagnitudePerMaximumMemberSpeed:
      "absolute total axial current divided by the largest sector member speed",
    combinedCurrentAlignmentFraction:
      "absolute total axial current divided by the sum of both sector current capacities at their actual speeds",
    sectorReinforcementFraction:
      "absolute total current divided by the sum of absolute sector currents",
    currentExchangeRatePerCurrent:
      "sum of absolute sector-current derivatives divided by absolute total current",
    currentTransferCancellationFraction:
      "one minus absolute total-current derivative divided by the sum of absolute sector-current derivatives",
    paretoMetrics: [
      "maximize currentMagnitudePerMaximumMemberSpeed",
      "maximize combinedCurrentAlignmentFraction",
      "maximize releaseMinimumPairDistance",
      "maximize releaseMinimumPairDistanceRate",
      "minimize maximumPositiveSectorSpeedDerivative",
      "minimize maximumRateVectorDerivativeNorm",
      "minimize absoluteFractionalCurrentDerivative",
      "maximize fieldSpeedMargin",
    ],
  },
  topCurrentPerSpeed: [...rows]
    .sort(descending("currentMagnitudePerMaximumMemberSpeed")).slice(0, 20),
  topCombinedAlignment: [...rows]
    .sort(descending("combinedCurrentAlignmentFraction")).slice(0, 20),
  topNonclosingCurrentPerSpeed: rows
    .filter((row) => row.releaseMinimumPairDistanceRate >= 0)
    .sort(descending("currentMagnitudePerMaximumMemberSpeed")).slice(0, 20),
  topOpeningNonacceleratingCurrentPerSpeed: rows
    .filter((row) => row.releaseMinimumPairDistanceRate >= 0
      && row.maximumPositiveSectorSpeedDerivative === 0)
    .sort(descending("currentMagnitudePerMaximumMemberSpeed")).slice(0, 20),
  lowestCurvatureOpeningNonaccelerating: rows
    .filter((row) => row.releaseMinimumPairDistanceRate >= 0
      && row.maximumPositiveSectorSpeedDerivative === 0)
    .sort((left, right) => left.maximumRateVectorDerivativeNorm
      - right.maximumRateVectorDerivativeNorm).slice(0, 20),
  lowestCurrentFlowOpeningNonaccelerating: rows
    .filter((row) => row.releaseMinimumPairDistanceRate >= 0
      && row.maximumPositiveSectorSpeedDerivative === 0)
    .sort((left, right) => left.absoluteFractionalCurrentDerivative
      - right.absoluteFractionalCurrentDerivative).slice(0, 20),
  topActiveCurrentHandoff: rows
    .filter((row) => row.currentTransferCancellationFraction >= 0.9
      && row.currentExchangeRatePerCurrent >= 0.5
      && row.absoluteFractionalCurrentDerivative <= 0.1)
    .sort((left, right) =>
      right.currentMagnitudePerMaximumMemberSpeed
        - left.currentMagnitudePerMaximumMemberSpeed).slice(0, 100),
  paretoFrontier,
};

function compactRow(row) {
  return Object.fromEntries(Object.entries(row).filter(
    ([key]) => ![
      "sectors",
      "assemblyCurrentDecomposition",
      "currentCorridorGeometry",
    ].includes(key),
  ));
}

console.log(JSON.stringify(compactOutput ? {
  schema: report.schema,
  claimGrade: report.claimGrade,
  excludedClaims: report.excludedClaims,
  searchedManifestCount: report.searchedManifestCount,
  eligibleManifestCount: report.eligibleManifestCount,
  uniqueReleaseCount: report.uniqueReleaseCount,
  analyzedReleaseCount: report.analyzedReleaseCount,
  analysisFailureCount: report.analysisFailures.length,
  rankingDefinitions: report.rankingDefinitions,
  paretoFrontierCount: report.paretoFrontier.length,
  nonclosingReleaseCount: rows.filter(
    (row) => row.releaseMinimumPairDistanceRate >= 0,
  ).length,
  openingNonacceleratingReleaseCount: rows.filter(
    (row) => row.releaseMinimumPairDistanceRate >= 0
      && row.maximumPositiveSectorSpeedDerivative === 0,
  ).length,
  opposedSectorCurrentDerivativeCount: rows.filter((row) =>
    row.sectorCurrentDerivatives.positive
      * row.sectorCurrentDerivatives.negative < 0).length,
  highCurrentTransferCancellationCount: rows.filter((row) =>
    row.currentTransferCancellationFraction >= 0.9).length,
  activeCurrentHandoffCount: rows.filter((row) =>
    row.currentTransferCancellationFraction >= 0.9
      && row.currentExchangeRatePerCurrent >= 0.5
      && row.absoluteFractionalCurrentDerivative <= 0.1).length,
  assemblyCurrentEfficiencySummary,
  currentCorridorSummary,
  oppositeHAmplitudeSignCount: rows.filter((row) =>
    (row.f6cCoordinate.positiveHAmplitude ?? 0)
      * (row.f6cCoordinate.negativeHAmplitude ?? 0) < 0).length,
  oppositeRhoAmplitudeSignCount: rows.filter((row) =>
    (row.f6cCoordinate.positiveRhoAmplitude ?? 0)
      * (row.f6cCoordinate.negativeRhoAmplitude ?? 0) < 0).length,
  activeCurrentHandoffOpeningCount: report.topActiveCurrentHandoff.filter(
    (row) => row.releaseMinimumPairDistanceRate >= 0,
  ).length,
  activeCurrentHandoffOppositeHAmplitudeSignCount:
    report.topActiveCurrentHandoff.filter((row) =>
      (row.f6cCoordinate.positiveHAmplitude ?? 0)
        * (row.f6cCoordinate.negativeHAmplitude ?? 0) < 0).length,
  activeCurrentHandoffOppositeRhoAmplitudeSignCount:
    report.topActiveCurrentHandoff.filter((row) =>
      (row.f6cCoordinate.positiveRhoAmplitude ?? 0)
        * (row.f6cCoordinate.negativeRhoAmplitude ?? 0) < 0).length,
  topCurrentPerSpeed: report.topCurrentPerSpeed.slice(0, 10).map(compactRow),
  topCombinedAlignment: report.topCombinedAlignment.slice(0, 10).map(compactRow),
  topNonclosingCurrentPerSpeed:
    report.topNonclosingCurrentPerSpeed.slice(0, 10).map(compactRow),
  topOpeningNonacceleratingCurrentPerSpeed:
    report.topOpeningNonacceleratingCurrentPerSpeed
      .slice(0, 10).map(compactRow),
  lowestCurvatureOpeningNonaccelerating:
    report.lowestCurvatureOpeningNonaccelerating
      .slice(0, 10).map(compactRow),
  lowestCurrentFlowOpeningNonaccelerating:
    report.lowestCurrentFlowOpeningNonaccelerating
      .slice(0, 10).map(compactRow),
  topActiveCurrentHandoff:
    report.topActiveCurrentHandoff.map(compactRow),
  paretoFrontier: report.paretoFrontier.map(compactRow),
} : report, null, 2));
