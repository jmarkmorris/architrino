import fs from "node:fs";
import {
  f6cCurrentCorridorDecomposition,
  f6cPairDistanceRateRow,
  minimumMaximumSectorSpeedTwoConstraintSolution,
  minimumNormTwoConstraintSolution,
} from "./f6c-linear-constraint-geometry.mjs";

// Analyze the exact fixed-shape trade between axial current and one measured
// pair-distance rate on an existing F6c coordinate record.

const inputPath = process.argv.slice(2).find(
  (argument) => !argument.startsWith("--"),
);
const frameOption = process.argv.slice(2).find(
  (argument) => argument.startsWith("--frame="),
)?.split("=")[1] ?? "release";
const breathingRate = Number(process.argv.slice(2).find(
  (argument) => argument.startsWith("--breathing-rate="),
)?.split("=")[1] ?? 1.25);
if (!inputPath || !["release", "final"].includes(frameOption)) {
  throw new TypeError(
    "usage: node f6c-current-corridor-analysis.mjs "
      + "ANALYSIS_JSON [--frame=release|final]",
  );
}
if (!(breathingRate > 0) || !Number.isFinite(breathingRate)) {
  throw new TypeError("breathing-rate must be finite and positive");
}

function wrapAngle(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function harmonicCoordinateAtEndpoint(displacement, rate, cyclePhase) {
  const cosineCoordinate = rate / breathingRate;
  const amplitude = Math.hypot(displacement, cosineCoordinate);
  const endpointArgument = Math.atan2(displacement, cosineCoordinate);
  return {
    amplitude,
    phaseOffset: wrapAngle(endpointArgument - cyclePhase),
    endpointArgument,
    reconstructedDisplacement: amplitude * Math.sin(endpointArgument),
    reconstructedRate:
      amplitude * breathingRate * Math.cos(endpointArgument),
  };
}

const report = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const frame = frameOption === "release"
  ? report.coordinateFrames[0]
  : report.coordinateFrames.at(-1);
const pairIds = frame.minimumPair.ids;
const targetCurrent = frame.currentMoment[0];
const targetDistanceRate = frame.minimumPair.distanceRate;
const actual = f6cCurrentCorridorDecomposition(
  frame.sectors,
  pairIds,
  targetCurrent,
  targetDistanceRate,
);
const corridor = f6cPairDistanceRateRow(frame.sectors, pairIds);
const currentOnly = frame.assemblyCurrentDecomposition;
const currentOnlyDistanceRate = corridor.row.reduce(
  (sum, value, index) => sum + value * currentOnly.minimumNormCarrier[index],
  0,
);
const nonclosingCarrier = minimumNormTwoConstraintSolution(
  currentOnly.currentRow,
  targetCurrent,
  corridor.row,
  0,
);
const measuredCorridorMinimaxCarrier =
  minimumMaximumSectorSpeedTwoConstraintSolution(
    currentOnly.currentRow,
    targetCurrent,
    corridor.row,
    targetDistanceRate,
  );
const nonclosingMinimaxCarrier = minimumMaximumSectorSpeedTwoConstraintSolution(
  currentOnly.currentRow,
  targetCurrent,
  corridor.row,
  0,
);
const minimaxRates = measuredCorridorMinimaxCarrier.solution;
const cyclePhase = frame.sectors.positive.theta;
const matchedHarmonicCoordinates = {
  positiveH: harmonicCoordinateAtEndpoint(
    frame.sectors.positive.h - 0.3,
    minimaxRates[0],
    cyclePhase,
  ),
  positiveRho: harmonicCoordinateAtEndpoint(
    frame.sectors.positive.rho - 0.3,
    minimaxRates[1],
    cyclePhase,
  ),
  negativeH: harmonicCoordinateAtEndpoint(
    frame.sectors.negative.h - 0.3,
    minimaxRates[3],
    cyclePhase,
  ),
  negativeRho: harmonicCoordinateAtEndpoint(
    frame.sectors.negative.rho - 0.3,
    minimaxRates[4],
    cyclePhase,
  ),
};
const matchedHarmonicSeed = {
  constructionGrade:
    "derived-endpoint-matched-harmonic-prehistory-parameters-not-evolved",
  breathingRate,
  cyclePhase,
  positiveRate: minimaxRates[2] / frame.sectors.positive.rho,
  negativeRate: minimaxRates[5] / frame.sectors.negative.rho,
  negativeTheta: wrapAngle(frame.sectors.negative.theta - cyclePhase),
  coordinates: matchedHarmonicCoordinates,
  maximumBreathingAmplitude: Math.max(
    ...Object.values(matchedHarmonicCoordinates).map(({ amplitude }) => amplitude),
  ),
};

console.log(JSON.stringify({
  schema: "f6c-current-corridor-analysis/v1",
  claimGrade: "derived-fixed-shape-linear-geometry-with-measured-input-frame",
  excludedClaims: [
    "causal-root-clearance-of-projected-rates",
    "causal-root-clearance-of-endpoint-matched-harmonic-prehistory",
    "evolution",
    "periodic-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
  ],
  inputPath,
  frame: frameOption,
  time: frame.time,
  pairIds,
  pairDistance: corridor.distance,
  targetCurrent,
  targetDistanceRate,
  actualRateNorm: currentOnly.rateNorm,
  actualMaximumMemberSpeed: frame.maximumMemberSpeed,
  currentOnlyCarrier: {
    rateNorm: currentOnly.minimumRateNormForCurrent,
    corridorDistanceRate: currentOnlyDistanceRate,
    maximumSectorMemberSpeed: Math.max(
      Math.hypot(...currentOnly.minimumNormCarrier.slice(0, 3)),
      Math.hypot(...currentOnly.minimumNormCarrier.slice(3, 6)),
    ),
  },
  currentAndMeasuredCorridorCarrier: {
    ...actual.constrainedCarrier,
    jointNeutralResidualNorm: actual.jointNeutralResidualNorm,
    jointNeutralConstraintResiduals: actual.jointNeutralConstraintResiduals,
    pythagoreanResidual: actual.pythagoreanResidual,
  },
  currentAndMeasuredCorridorMinimaxCarrier: measuredCorridorMinimaxCarrier,
  matchedHarmonicSeed,
  currentAndNonclosingBoundaryCarrier: nonclosingCarrier,
  currentAndNonclosingBoundaryMinimaxCarrier: nonclosingMinimaxCarrier,
}, null, 2));
