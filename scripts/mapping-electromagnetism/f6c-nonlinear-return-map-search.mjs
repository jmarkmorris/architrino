import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// Bounded nonlinear F6c return-map search around an already root-certified
// harmonic seed. The harmonic row supplies only the initial-history family;
// every ranking measurement comes from forward EOM-solver evolution. A small
// residual is not retention, stability, or an independently proved cycle.

function option(name, fallback) {
  const prefix = `--${name}=`;
  const entry = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : fallback;
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(option(name, String(fallback)), 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError(`${name} must be a positive integer.`);
  }
  return value;
}

function finiteOption(name, fallback) {
  const value = Number(option(name, String(fallback)));
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite.`);
  return value;
}

function halton(index, base) {
  let fraction = 1;
  let value = 0;
  let remaining = index;
  while (remaining > 0) {
    fraction /= base;
    value += fraction * (remaining % base);
    remaining = Math.floor(remaining / base);
  }
  return value;
}

function centered(fraction, radius) {
  return (2 * fraction - 1) * radius;
}

function run(command, args, options = {}) {
  return new Promise((resolve) => {
    const { timeoutSeconds = null, ...spawnOptions } = options;
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      ...spawnOptions,
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = timeoutSeconds === null ? null : setTimeout(() => {
      timedOut = true;
      child.kill("SIGINT");
    }, timeoutSeconds * 1000);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (status, signal) => {
      if (timer !== null) clearTimeout(timer);
      resolve({ status, signal, stdout, stderr, timedOut });
    });
  });
}

function rms(values) {
  return Math.sqrt(values.reduce((sum, value) => sum + value ** 2, 0)
    / values.length);
}

function summarizeCandidate(index, parameters, outDirectory, packet) {
  const manifest = JSON.parse(fs.readFileSync(
    path.join(outDirectory, "run-manifest.json"),
    "utf8",
  ));
  const censusPath = path.join(outDirectory, "census.jsonl");
  const censusRows = fs.existsSync(censusPath)
    ? fs.readFileSync(censusPath, "utf8").trim().split("\n")
      .filter(Boolean).map((line) => JSON.parse(line))
    : [];
  const frames = packet.coordinateFrames;
  const initial = frames[0];
  const eligibleFrames = frames.filter((frame) => frame.time >= 0.05);
  const actionRows = eligibleFrames.flatMap((frame) => [
    ["direct", frame.properRotationReturnResidual.direct],
    ["reflected", frame.properRotationReturnResidual.reflected],
  ].flatMap(([action, residual]) => {
    const nonzeroWinding = residual.nearestPhaseWinding.positive !== 0
      || residual.nearestPhaseWinding.negative !== 0;
    if (action === "direct" && !nonzeroWinding) return [];
    const values = Object.values(residual.componentResiduals)
      .flatMap((sector) => Object.values(sector));
    return [{
      action,
      time: frame.time,
      rms: rms(values),
      maximum: Math.max(...values.map(Math.abs)),
      componentResiduals: residual.componentResiduals,
      winding: residual.nearestPhaseWinding,
      sectorState: frame.sectors,
      memberSpeed: frame.maximumMemberSpeed,
    }];
  }));
  actionRows.sort((left, right) => left.rms - right.rms);
  const nearestAction = actionRows[0] ?? null;
  const shapeCoordinates = ["h", "rho"];
  const maximumShapeExcursion = Math.max(...frames.flatMap((frame) =>
    ["positive", "negative"].flatMap((sector) => shapeCoordinates.map(
      (coordinate) => Math.abs(
        frame.sectors[sector][coordinate]
          - initial.sectors[sector][coordinate],
      ),
    ))));
  const maximumLiftedPhaseAdvance = Math.max(...frames.flatMap((frame) =>
    ["positive", "negative"].map((sector) => Math.abs(
      frame.sectors[sector].theta - initial.sectors[sector].theta,
    ))));
  const turnInventory = Object.fromEntries(
    ["positive", "negative"].map((sector) => [sector, Object.fromEntries(
      ["axial", "radial", "phase"].map((coordinate) => [
        coordinate,
        packet.trajectorySummary.turnSequences[sector][coordinate],
      ]),
    )]),
  );
  const hasRadialTurn = ["positive", "negative"].some(
    (sector) => turnInventory[sector].radial.length > 0,
  );
  const hasCadenceTurn = ["positive", "negative"].some(
    (sector) => turnInventory[sector].phase.length > 0,
  );
  const rootRows = censusRows.map((row) => row.engine).filter(Boolean);
  const maximumRootMultiplicity = rootRows.length === 0 ? null
    : Math.max(...rootRows.map((row) => row.maximumRootMultiplicity));
  const minimumTransmitterFactorMagnitude = rootRows.length === 0 ? null
    : Math.min(...rootRows.map((row) =>
      row.minimumTransmitterFactorMagnitude ?? Infinity));
  const maximumRootTimePressureRatio = rootRows.length === 0 ? null
    : Math.max(...rootRows.map((row) =>
      row.maximumRootTimePressureRatio ?? 0));
  const minimumPairDistance = packet.trajectorySummary.minimumResolvedFramePair;
  const allAcceptedSnapshotsCertified = manifest.rejectedSteps === 0
    && !manifest.status.startsWith("halted_root_");
  const guardedSubfieldHistory = packet.trajectorySummary.maximumMemberSpeed < 1;
  const nontrivialCycleMarker = nearestAction !== null
    && maximumShapeExcursion >= 0.01
    && maximumLiftedPhaseAdvance >= 0.1
    && (hasRadialTurn || hasCadenceTurn);
  return {
    index,
    parameters,
    outDirectory,
    manifest: {
      runId: manifest.runId,
      status: manifest.status,
      acceptedEndTime: Number(manifest.acceptedEndTime),
      acceptedSteps: manifest.acceptedSteps,
      rejectedSteps: manifest.rejectedSteps,
      releaseRootClearance: manifest.releaseRootClearance,
      modelFingerprint: manifest.modelFingerprint,
      generatingSpec: manifest.generatingSpec,
    },
    returnActionContract: {
      direct: {
        exactProperRotation: "identity",
        modulePermutation: [0, 1, 2, 3],
        labeledHistoryEquivalent: true,
        requiredMarker: "at least one nonzero lifted sector winding",
      },
      reflected: {
        exactProperRotationMatrix: [[-1, 0, 0], [0, -1, 0], [0, 0, 1]],
        modulePermutation: [3, 2, 1, 0],
        phaseAction: {
          positive: { slope: -1, offsetRadians: -Math.PI / 3 },
          negative: { slope: -1, offsetRadians: Math.PI / 3 },
        },
        actionOrder: 2,
        labeledHistoryEquivalent: false,
        quotientHistoryEquivalentUnderDeclaredSamePolarityPermutation: true,
      },
    },
    nearestEligibleAction: nearestAction,
    nontrivialCycleMarker: {
      passed: nontrivialCycleMarker,
      minimumFlightTime: 0.05,
      maximumShapeExcursion,
      maximumLiftedPhaseAdvance,
      hasRadialTurn,
      hasCadenceTurn,
      turnInventory,
    },
    causalGuard: {
      regime: "guarded-complete-ordinary-root",
      fieldSpeed: 1,
      releaseRootCertificateRows: packet.releaseAcceleration?.rootCertificateRows ?? null,
      unresolvedReleaseRootCertificateRows:
        packet.releaseAcceleration?.unresolvedRootCertificateRows ?? null,
      allAcceptedSnapshotsCertified,
      maximumRootMultiplicity,
      maximumRootTimePressureRatio,
      minimumTransmitterFactorMagnitude:
        Number.isFinite(minimumTransmitterFactorMagnitude)
          ? minimumTransmitterFactorMagnitude : null,
      selfHitInventory: guardedSubfieldHistory && allAcceptedSnapshotsCertified
        ? "zero nontrivial self-hits by the derived subfield monotonicity guard"
        : "not excluded by the guarded-history certificate",
      transitionInventory: maximumRootMultiplicity === 1
        ? "all recorded accepted snapshots remained on simple single-root rows"
        : "multiple-root or unrecorded transition requires separate inspection",
    },
    spatialAndSpeedGuard: {
      minimumPairDistance,
      maximumMemberSpeed: packet.trajectorySummary.maximumMemberSpeed,
      guardedSubfieldHistory,
      channelAllocationAtNearestAction: nearestAction === null ? null
        : Object.fromEntries(["positive", "negative"].map((sector) => [
          sector,
          nearestAction.sectorState[sector].coordinateSpeedBudget,
        ])),
    },
    provenanceAndLeakage: {
      memberIds: manifest.seeds.map((seed) => seed.pathId),
      memberIdentityRule: "EOM path identities remain labeled throughout; no relabeling is performed by the analyzer",
      maximumNormalizedManifoldResidual:
        packet.trajectorySummary.maximumNormalizedManifoldResidual,
      maximumCentroidNorm: packet.trajectorySummary.maximumCentroidNorm,
      maximumDipoleNorm: packet.trajectorySummary.maximumDipoleNorm,
    },
  };
}

const executable = option(
  "executable",
  ".tmp/eom-native-dev/attractor-ensemble-harness",
);
const analyzer = option(
  "analyzer",
  "scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs",
);
const outRoot = option("out-root", ".tmp/f6c-nonlinear-return-map-search");
const rowsRequested = positiveInteger("rows", 32);
const concurrency = positiveInteger("concurrency", 2);
const seedOffset = positiveInteger("seed-offset", 1);
const endTime = finiteOption("end-time", 0.45);
const step = finiteOption("step", 0.002);
const offsetRadius = finiteOption("offset-radius", 0.9);
const rateRadius = finiteOption("rate-radius", 0.12);
const thetaRadius = finiteOption("theta-radius", 0.35);
const candidateWallSeconds = finiteOption("candidate-wall-seconds", 120);
if (!(endTime > 0) || !(step > 0) || !(offsetRadius > 0)) {
  throw new TypeError("end-time, step, and offset-radius must be positive.");
}
fs.mkdirSync(outRoot, { recursive: true });
const summaryPath = path.join(outRoot, "search-summary.json");

const center = {
  positiveRate: 0.899375,
  negativeRate: 0.899375,
  negativeTheta: 1.2786152816462157,
  breathingRate: 0.899375,
  cyclePhase: 5.5,
  positiveHAmplitude: 0.109152,
  negativeHAmplitude: -0.14011661807580172,
  positiveRhoAmplitude: 0.023504132231404962,
  negativeRhoAmplitude: -0.046224852071005913,
  positivePhaseAmplitude: -0.08602941176470588,
  negativePhaseAmplitude: -0.08881578947368421,
  positiveHPhaseOffset: 0,
  negativeHPhaseOffset: 0,
  positiveRhoPhaseOffset: 0,
  negativeRhoPhaseOffset: 0,
};
const bases = [2, 3, 5, 7, 11, 13, 17];
const candidates = Array.from({ length: rowsRequested }, (_, index) => {
  const sample = seedOffset + index;
  if (index === 0) return { ...center };
  return {
    ...center,
    positiveRate: center.positiveRate * (
      1 + centered(halton(sample, bases[0]), rateRadius)
    ),
    negativeRate: center.negativeRate * (
      1 + centered(halton(sample, bases[1]), rateRadius)
    ),
    negativeTheta: center.negativeTheta
      + centered(halton(sample, bases[2]), thetaRadius),
    positiveHPhaseOffset:
      centered(halton(sample, bases[3]), offsetRadius),
    negativeHPhaseOffset:
      centered(halton(sample, bases[4]), offsetRadius),
    positiveRhoPhaseOffset:
      centered(halton(sample, bases[5]), offsetRadius),
    negativeRhoPhaseOffset:
      centered(halton(sample, bases[6]), offsetRadius),
  };
});

const rows = [];
let nextIndex = 0;
const startedAt = Date.now();

function writeSummary(status) {
  const accepted = rows.filter((row) => row.status === "analyzed");
  const ranked = accepted.filter((row) =>
    row.result.nontrivialCycleMarker.passed
    && row.result.nearestEligibleAction !== null)
    .sort((left, right) =>
      left.result.nearestEligibleAction.rms
        - right.result.nearestEligibleAction.rms);
  fs.writeFileSync(summaryPath, JSON.stringify({
    schema: "f6c-nonlinear-return-map-search/v1",
    claimGrade: "measured-bounded-eom-solver-return-map-search-not-independent-oracle",
    excludedClaims: [
      "retention",
      "stability",
      "clock",
      "energy-closure",
      "particle-identity",
      "Lorentz-recovery",
      "global-nonexistence",
    ],
    status,
    search: {
      centerProvenance: "prescribed-harmonic prefilter row p21; forward evolution alone supplies return ranking",
      rowsRequested,
      rowsFinished: rows.length,
      concurrency,
      seedOffset,
      endTime,
      step,
      rootTolerance: "1e-5",
      fieldSpeed: 1,
      offsetRadius,
      rateRadius,
      thetaRadius,
      candidateWallSeconds,
      wallSeconds: (Date.now() - startedAt) / 1000,
    },
    bestRows: ranked.slice(0, 12),
    rows,
  }, null, 2));
  return ranked;
}

async function evaluate(index) {
  const parameters = candidates[index];
  const outDirectory = path.join(
    outRoot,
    `row-${String(index).padStart(3, "0")}`,
  );
  const args = [
    "--seed-family=f6c-balanced-tetrahedral-v1",
    `--f6c-positive-rate=${parameters.positiveRate}`,
    `--f6c-negative-rate=${parameters.negativeRate}`,
    `--f6c-negative-theta=${parameters.negativeTheta}`,
    `--f6c-breathing-rate=${parameters.breathingRate}`,
    `--f6c-cycle-phase=${parameters.cyclePhase}`,
    `--f6c-positive-h-amplitude=${parameters.positiveHAmplitude}`,
    `--f6c-negative-h-amplitude=${parameters.negativeHAmplitude}`,
    `--f6c-positive-rho-amplitude=${parameters.positiveRhoAmplitude}`,
    `--f6c-negative-rho-amplitude=${parameters.negativeRhoAmplitude}`,
    `--f6c-positive-phase-amplitude=${parameters.positivePhaseAmplitude}`,
    `--f6c-negative-phase-amplitude=${parameters.negativePhaseAmplitude}`,
    `--f6c-positive-h-phase-offset=${parameters.positiveHPhaseOffset}`,
    `--f6c-negative-h-phase-offset=${parameters.negativeHPhaseOffset}`,
    `--f6c-positive-rho-phase-offset=${parameters.positiveRhoPhaseOffset}`,
    `--f6c-negative-rho-phase-offset=${parameters.negativeRhoPhaseOffset}`,
    `--end-time=${endTime}`,
    `--step=${step}`,
    `--minimum-step=${step / 4}`,
    "--history-depth=8",
    "--history-segment-step=0.01",
    "--chunk-steps=5",
    "--sample-every=1",
    "--threads=4",
    "--root-tolerance=1e-5",
    `--out-dir=${outDirectory}`,
    "--record-date=2026-08-24",
    "--generating-spec=F6c-nonlinear-return-map-search-v1",
    "--engine-build-id=local-eom-dev-2026-08-24",
  ];
  const evolved = await run(executable, args, {
    timeoutSeconds: candidateWallSeconds,
  });
  if (!fs.existsSync(path.join(outDirectory, "run-manifest.json"))) {
    return {
      index,
      status: "harness-rejected-before-manifest",
      parameters,
      exitStatus: evolved.status,
      stderrTail: evolved.stderr.trim().split("\n").slice(-8),
    };
  }
  const analyzed = await run(process.execPath, [analyzer, outDirectory]);
  if (analyzed.status !== 0) {
    return {
      index,
      status: "analysis-rejected",
      parameters,
      exitStatus: analyzed.status,
      stderrTail: analyzed.stderr.trim().split("\n").slice(-8),
    };
  }
  return {
    index,
    status: "analyzed",
    harnessExitStatus: evolved.status,
    harnessSignal: evolved.signal,
    timeCapped: evolved.timedOut,
    harnessStderrTail: evolved.stderr.trim().split("\n").slice(-4),
    result: summarizeCandidate(
      index,
      parameters,
      outDirectory,
      JSON.parse(analyzed.stdout),
    ),
  };
}

async function worker() {
  while (nextIndex < candidates.length) {
    const index = nextIndex;
    nextIndex += 1;
    const row = await evaluate(index);
    rows.push(row);
    rows.sort((left, right) => left.index - right.index);
    const ranked = writeSummary("running");
    const best = ranked[0]?.result.nearestEligibleAction;
    process.stderr.write(
      `heartbeat finished=${rows.length}/${rowsRequested} row=${index}`
      + ` status=${row.status} bestRms=${best?.rms ?? "none"}`
      + ` wallSeconds=${((Date.now() - startedAt) / 1000).toFixed(1)}\n`,
    );
  }
}

const heartbeat = setInterval(() => {
  process.stderr.write(
    `heartbeat campaign finished=${rows.length}/${rowsRequested}`
    + ` active=${Math.min(concurrency, rowsRequested - rows.length)}`
    + ` wallSeconds=${((Date.now() - startedAt) / 1000).toFixed(1)}\n`,
  );
}, 30000);
await Promise.all(Array.from({ length: concurrency }, () => worker()));
clearInterval(heartbeat);
const ranked = writeSummary("completed");
console.log(JSON.stringify({
  summaryPath,
  rowsFinished: rows.length,
  bestRows: ranked.slice(0, 5),
}, null, 2));
