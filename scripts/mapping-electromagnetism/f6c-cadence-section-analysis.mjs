import fs from "node:fs";
import {
  f6cAssemblyCurrentDecomposition,
  f6cCurrentCoefficient,
} from "./f6c-current-transport.mjs";

// Interpolate already-analyzed F6c coordinate records to the first positive-
// sector cadence-zero section. This is a bounded section diagnostic, not an
// event-integrated orbit, retained braid, or independent oracle.

const inputPaths = process.argv.slice(2);
if (inputPaths.length === 0) {
  throw new TypeError(
    "usage: node f6c-cadence-section-analysis.mjs ANALYSIS_JSON...",
  );
}

function interpolate(left, right, fraction) {
  return left + fraction * (right - left);
}

function rangeSummary(values) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return {
    minimum,
    maximum,
    mean,
    span: maximum - minimum,
    relativeSpan: mean === 0 ? null : (maximum - minimum) / Math.abs(mean),
  };
}

const rows = inputPaths.map((inputPath) => {
  const report = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const turn = report.trajectorySummary.turns.positive.phase;
  if (!turn) {
    throw new TypeError(`${inputPath} has no positive-sector cadence turn`);
  }
  const [leftTime, rightTime] = turn.bracket;
  const left = report.coordinateFrames.find((frame) => frame.time === leftTime);
  const right = report.coordinateFrames.find((frame) => frame.time === rightTime);
  if (!left || !right) {
    throw new TypeError(`${inputPath} lacks the cadence-turn bracket frames`);
  }
  const fraction = (turn.linearlyInterpolatedTime - leftTime)
    / (rightTime - leftTime);
  const sectors = Object.fromEntries(["positive", "negative"].map(
    (sectorName) => [sectorName, Object.fromEntries([
      "h", "rho", "theta", "hDot", "rhoDot", "thetaDot",
    ].map((coordinate) => [
      coordinate,
      interpolate(
        left.sectors[sectorName][coordinate],
        right.sectors[sectorName][coordinate],
        fraction,
      ),
    ]))],
  ));
  sectors.positive.thetaDot = 0;
  const decomposition = f6cAssemblyCurrentDecomposition(sectors);
  const sectorCurrents = Object.fromEntries(["positive", "negative"].map(
    (sectorName) => {
      const sector = sectors[sectorName];
      const coefficient = f6cCurrentCoefficient(sectorName, sector);
      const rate = [sector.hDot, sector.rhoDot, sector.rho * sector.thetaDot];
      const factor = sectorName === "positive" ? -4 / 3 : 4 / 3;
      return [sectorName, factor * coefficient.reduce(
        (sum, value, component) => sum + value * rate[component],
        0,
      )];
    },
  ));
  return {
    inputPath,
    runId: report.run.runId,
    cadenceZeroTime: turn.linearlyInterpolatedTime,
    bracket: turn.bracket,
    interpolationFraction: fraction,
    sectors,
    sectorCurrents,
    totalCurrent: sectorCurrents.positive + sectorCurrents.negative,
    currentEfficiency: decomposition.currentEfficiency,
    currentNeutralNormFraction:
      decomposition.currentNeutralResidualNorm / decomposition.rateNorm,
    currentNeutralComponentFractions:
      decomposition.currentNeutralComponentBudget.fractions,
    interpolationConsistency: {
      positiveCadence: sectors.positive.thetaDot,
      currentResidual:
        decomposition.current - sectorCurrents.positive - sectorCurrents.negative,
      orthogonalityResidual: decomposition.orthogonalityResidual,
      pythagoreanResidual: decomposition.pythagoreanResidual,
    },
  };
});

console.log(JSON.stringify({
  schema: "f6c-cadence-section-analysis/v1",
  claimGrade:
    "measured-linear-coordinate-section-interpolation-not-independent-oracle",
  excludedClaims: [
    "exact-event-integration",
    "periodic-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
  ],
  rowCount: rows.length,
  summary: {
    cadenceZeroTime: rangeSummary(rows.map((row) => row.cadenceZeroTime)),
    totalCurrent: rangeSummary(rows.map((row) => row.totalCurrent)),
    currentEfficiency: rangeSummary(rows.map((row) => row.currentEfficiency)),
    currentNeutralNormFraction: rangeSummary(rows.map(
      (row) => row.currentNeutralNormFraction,
    )),
    tangentialNeutralFraction: rangeSummary(rows.map(
      (row) => row.currentNeutralComponentFractions.tangential,
    )),
  },
  rows,
}, null, 2));
