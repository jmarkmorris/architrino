import fs from "node:fs";

// Find the first sampled F6c frame at which current-neutral motion becomes
// breathing dominated. This reads analyzed EOM records and does not establish
// an exact event time, retention, or particle identity.

const inputPaths = process.argv.slice(2).filter(
  (argument) => !argument.startsWith("--"),
);
const thresholdArgument = process.argv.slice(2).find(
  (argument) => argument.startsWith("--tangential-threshold="),
);
const tangentialThreshold = thresholdArgument
  ? Number(thresholdArgument.split("=")[1])
  : 0.01;
if (inputPaths.length === 0 || !Number.isFinite(tangentialThreshold)) {
  throw new TypeError(
    "usage: node f6c-mode-conversion-analysis.mjs "
      + "[--tangential-threshold=0.01] ANALYSIS_JSON...",
  );
}

function rangeSummary(values) {
  if (values.length === 0) return null;
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
  const frame = report.coordinateFrames.find((candidate) =>
    candidate.assemblyCurrentDecomposition
      .currentNeutralComponentBudget.fractions.tangential
        <= tangentialThreshold);
  const cadenceTurn = report.trajectorySummary.turns.positive.phase;
  return {
    inputPath,
    runId: report.run.runId,
    acceptedEndTime: Number(report.run.acceptedEndTime),
    cadenceZeroTime: cadenceTurn?.linearlyInterpolatedTime ?? null,
    conversion: frame ? {
      sampledTime: frame.time,
      positiveCadence: frame.sectors.positive.thetaDot,
      totalCurrent: frame.currentMoment[0],
      currentEfficiency:
        frame.assemblyCurrentDecomposition.currentEfficiency,
      currentNeutralNormFraction:
        frame.assemblyCurrentDecomposition.currentNeutralResidualNorm
          / frame.assemblyCurrentDecomposition.rateNorm,
      currentNeutralComponentFractions:
        frame.assemblyCurrentDecomposition.currentNeutralComponentBudget
          .fractions,
      leadTimeToCadenceZero: cadenceTurn
        ? cadenceTurn.linearlyInterpolatedTime - frame.time
        : null,
    } : null,
  };
});
const converted = rows.filter((row) => row.conversion);
const withCadenceTurn = converted.filter(
  (row) => row.conversion.leadTimeToCadenceZero !== null,
);

console.log(JSON.stringify({
  schema: "f6c-mode-conversion-analysis/v1",
  claimGrade: "measured-sampled-threshold-diagnostic-not-independent-oracle",
  excludedClaims: [
    "exact-event-time",
    "periodic-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
  ],
  tangentialThreshold,
  inputCount: rows.length,
  convertedCount: converted.length,
  cadenceTurnCount: rows.filter((row) => row.cadenceZeroTime !== null).length,
  summary: {
    conversionTime: rangeSummary(converted.map(
      (row) => row.conversion.sampledTime,
    )),
    positiveCadenceAtConversion: rangeSummary(converted.map(
      (row) => row.conversion.positiveCadence,
    )),
    totalCurrentAtConversion: rangeSummary(converted.map(
      (row) => row.conversion.totalCurrent,
    )),
    leadTimeToCadenceZero: rangeSummary(withCadenceTurn.map(
      (row) => row.conversion.leadTimeToCadenceZero,
    )),
  },
  rows,
}, null, 2));
