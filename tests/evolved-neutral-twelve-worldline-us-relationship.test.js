import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

import {
  EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_PROTOCOL_SCHEMA,
  computeSameRowUsMoments,
  evaluateEvolvedNeutralTwelveWorldlineUsRelationship,
} from "../src/eom-analysis/EvolvedNeutralTwelveWorldlineUsRelationship.mjs";
import {
  createEomHistoryDataset,
} from "../src/apps/shared/EomHistoryDataset.mjs";
import {
  createSphericalProductQuadrature,
} from "../src/prescribed-path-analysis/CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs";
import {
  EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_SCHEMA,
  evaluateEvolvedNeutralTwelveWorldlineUsStudy,
} from "../scripts/eom/analyze-evolved-neutral-twelve-worldline-us-relationship.mjs";

function segment(startTime, endTime, position, velocity, acceleration = [0, 0, 0]) {
  return {
    startTime: String(startTime),
    endTime: String(endTime),
    coefficients: position.map((value, axis) => [
      String(value),
      String(velocity[axis]),
      String(acceleration[axis] / 2),
      "0",
    ]),
    positionError: "0",
    velocityError: "0",
  };
}

function recordFixture(overrides = {}) {
  const worldlines = Array.from({ length: 12 }, (_, index) => {
    const sign = index % 2 === 0 ? 1 : -1;
    const pair = Math.floor(index / 2);
    const angle = 2 * Math.PI * pair / 6;
    const position = [
      0.3 * Math.cos(angle),
      0.3 * Math.sin(angle),
      sign * 0.04,
    ];
    const velocity = [
      -0.03 * Math.sin(angle) + sign * 0.004 * (pair + 1),
      0.03 * Math.cos(angle),
      sign * 0.002,
    ];
    const acceleration = [
      sign * 0.002 * Math.cos(angle),
      0.001 * Math.sin(angle),
      sign * 0.0005 * (pair + 1),
    ];
    return {
      id: String(index + 1),
      pathKey: index + 1,
      polarity: sign,
      charge: String(sign / 6),
      stateFlags: sign > 0 ? 1 : 2,
      coverageStart: "-2",
      coverageEnd: "4",
      interpolation: "certified-piecewise-cubic-v0",
      historyFingerprint: `evolved-neutral-twelve-worldline-fixture-${index + 1}`,
      declaredPrehistorySegmentCount: 1,
      evolvedSegmentCount: 1,
      segments: [
        segment(-2, 0, position, velocity, acceleration),
        segment(0, 4, position, velocity, acceleration),
      ],
    };
  });
  return {
    schema: "assembly-view-record.v0",
    provenance: {
      engineId: "eom-solver",
      engineVersion: "eom-neutral-twelve-worldline-test-build",
      runId: "evolved-neutral-twelve-worldline-test-run",
      claimGrade: "evolved-record",
      evidenceStatus: "executable_architecture_evidence",
      generatingSpec:
        "reference/priorities/braid-program/campaigns/future-neutral-twelve-worldline.md",
      date: "2026-07-24",
    },
    window: {
      start: 0,
      end: 3,
      delayHorizon: 1,
      sampleInterval: 0.1,
    },
    worldlines,
    ...overrides,
  };
}

function protocolFixture(overrides = {}) {
  return {
    schema: EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_PROTOCOL_SCHEMA,
    protocolId: "evolved-neutral-twelve-worldline-us-test-v1",
    configurationKind: "neutral-twelve-worldline",
    configurationId: "counter-rotating-two-component-circular-test",
    fieldSpeed: 1,
    claimWindow: { start: 1, end: 2 },
    minimumAllowedEmissionTime: -1,
    rowCount: 2,
    probeCenter: { x: 0, y: 0, z: 0 },
    radii: [1, 1.5],
    quadrature: {
      primary: { polarOrder: 3, azimuthCount: 6 },
      refined: { polarOrder: 4, azimuthCount: 8 },
    },
    rootTolerance: 1e-11,
    maxRootIterations: 96,
    neutralityTolerance: 1e-12,
    minimumPower: 1e-24,
    retainRootLedger: true,
    ...overrides,
  };
}

test("same-row U and S use the cubic position, velocity, and acceleration at one time", () => {
  const dataset = createEomHistoryDataset(recordFixture());
  const row = computeSameRowUsMoments(
    dataset.worldlines,
    1.25,
    { x: 0, y: 0, z: 0 },
  );

  const independentlySummedU = dataset.worldlines.reduce(
    (sum, worldline) => {
      const state = dataset.evaluateWorldline(worldline.id, 1.25);
      return {
        x: sum.x + worldline.charge * state.velocity.x,
        y: sum.y + worldline.charge * state.velocity.y,
        z: sum.z + worldline.charge * state.velocity.z,
      };
    },
    { x: 0, y: 0, z: 0 },
  );
  assert.deepEqual(row.U, independentlySummedU);
  assert.ok(row.uNormSquared > 0);
  assert.ok(row.sNormSquared > 0);
  assert.ok(Math.abs(
    row.approximationPowers.l2 / row.approximationPowers.l1 -
    row.predictedRatio,
  ) < 1e-14);
});

test("evolved neutral twelve-worldline evaluator computes exact finite and far ratios with refinement", () => {
  const result = evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
    record: recordFixture(),
    protocol: protocolFixture(),
  });

  assert.equal(result.schema, "eom-analysis/evolved-neutral-twelve-worldline-us-result.v1");
  assert.equal(result.source.engineId, "eom-solver");
  assert.equal(result.source.claimGrade, "evolved-record");
  assert.equal(result.source.worldlineCount, 12);
  assert.ok(result.source.certifiedRetainedSpeedBound < 1);
  assert.equal(result.rows.length, 4);
  assert.ok(result.rows.every((row) => row.moments.predictedRatio > 0));
  assert.ok(result.rows.every((row) => row.finiteRatio > 0));
  assert.ok(result.rows.every((row) => row.farRatio > 0));
  assert.ok(result.summary.maximumAbsoluteRootResidual <= 1e-11);
  assert.ok(result.summary.minimumEmissionTime >= -1 - 1e-11);
  assert.equal(
    result.rows[0].refined.rootLedger.length,
    12 * 4 * 8,
  );
});

function constantVelocityAxisRecord(speed) {
  const base = recordFixture();
  base.worldlines = base.worldlines.map((worldline, index) => {
    const moving = index === 0;
    const velocity = moving ? [0, 0, speed] : [0, 0, 0];
    return {
      ...worldline,
      coverageStart: "-2",
      coverageEnd: "4",
      segments: [
        segment(-2, 0, [0, 0, moving ? -2 * speed : 0], velocity),
        segment(0, 4, [0, 0, 0], velocity),
      ],
    };
  });
  return base;
}

function constantVelocityClosedForm(speed, charge) {
  const i0 = Math.log((1 + speed) / (1 - speed)) / speed;
  const i1 = (i0 - 2) / speed;
  const i2 = i1 / speed;
  const j0 = i0 - 2;
  const j2 = i2 - 2 / 3;
  const firstZ = 2 * Math.PI * charge * i1;
  const mzz = 2 * Math.PI * charge * j2;
  const mxx = Math.PI * charge * (j0 - j2);
  const trace = 2 * mxx + mzz;
  const xStf = mxx - trace / 3;
  const zStf = mzz - trace / 3;
  return {
    l1: 3 / (4 * Math.PI) * firstZ ** 2,
    l2: 15 / (8 * Math.PI) * (2 * xStf ** 2 + zStf ** 2),
  };
}

test("far angular powers match an independently derived constant-velocity closed form", () => {
  const speed = 0.2;
  const result = evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
    record: constantVelocityAxisRecord(speed),
    protocol: protocolFixture({
      claimWindow: { start: 0.75, end: 1.25 },
      minimumAllowedEmissionTime: -2,
      rowCount: 1,
      radii: [1],
      quadrature: {
        primary: { polarOrder: 12, azimuthCount: 24 },
        refined: { polarOrder: 16, azimuthCount: 32 },
      },
    }),
  });
  const expected = constantVelocityClosedForm(speed, 1 / 6);
  const actual = result.rows[0].refined.far;
  assert.ok(Math.abs(actual.l1 - expected.l1) / expected.l1 < 1e-11);
  assert.ok(Math.abs(actual.l2 - expected.l2) / expected.l2 < 1e-9);
  assert.ok(Math.abs(
    result.rows[0].farRatio - expected.l2 / expected.l1,
  ) / (expected.l2 / expected.l1) < 1e-9);

  // The quadrature weights themselves are independently sanity-checked here
  // against the exact sphere area so the closed form is not accepted on a
  // malformed angular grid.
  const area = createSphericalProductQuadrature({
    polarOrder: 16,
    azimuthCount: 32,
  }).reduce((sum, node) => sum + node.solidAngleWeight, 0);
  assert.ok(Math.abs(area - 4 * Math.PI) < 1e-13);
});

test("evolved neutral twelve-worldline evaluator fails closed on ineligible record authority and geometry", () => {
  const converted = recordFixture();
  converted.provenance.claimGrade = "chart-hypothesis";
  converted.provenance.evidenceStatus = "display-only";
  converted.provenance.conversion = { converterId: "test" };
  assert.throws(
    () => evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
      record: converted,
      protocol: protocolFixture(),
    }),
    /direct EOM solver output/,
  );

  const elevenPaths = recordFixture({ worldlines: recordFixture().worldlines.slice(0, 11) });
  assert.throws(
    () => evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
      record: elevenPaths,
      protocol: protocolFixture(),
    }),
    /exactly 12 evolved worldlines/,
  );

  const nonneutral = recordFixture();
  nonneutral.worldlines[1].charge = "0.16666666666666666";
  nonneutral.worldlines[1].polarity = 1;
  assert.throws(
    () => evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
      record: nonneutral,
      protocol: protocolFixture(),
    }),
    /requires a neutral source/,
  );
});

test("evolved neutral twelve-worldline evaluator rejects field-speed and pre-clearance roots", () => {
  const fieldSpeed = recordFixture();
  fieldSpeed.worldlines[0].segments[0].coefficients[0][1] = "1";
  fieldSpeed.worldlines[0].segments[1].coefficients[0][1] = "1";
  assert.throws(
    () => evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
      record: fieldSpeed,
      protocol: protocolFixture(),
    }),
    /reaches field speed/,
  );

  assert.throws(
    () => evaluateEvolvedNeutralTwelveWorldlineUsRelationship({
      record: recordFixture(),
      protocol: protocolFixture({ minimumAllowedEmissionTime: 1 }),
    }),
    /precedes the qualified emission boundary/,
  );
});

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

test("study binds a complete collapse/refinement cohort and pools same-row results", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "evolved-neutral-twelve-worldline-us-"));
  const evidenceBytes = Buffer.from("independently accepted fixture evidence\n");
  writeFileSync(path.join(directory, "qualification.txt"), evidenceBytes);
  const evidenceHash = sha256Bytes(evidenceBytes);
  const runs = [];
  for (const prehistoryId of ["P0", "P1", "P2"]) {
    for (const refinementId of ["R1", "R2"]) {
      const record = recordFixture();
      record.provenance.runId = `neutral-twelve-worldline-${prehistoryId}-${refinementId}`;
      const recordBytes = Buffer.from(`${JSON.stringify(record)}\n`);
      const recordPath = `${record.provenance.runId}.json`;
      writeFileSync(path.join(directory, recordPath), recordBytes);
      runs.push({
        prehistoryId,
        refinementId,
        recordPath,
        recordSha256: sha256Bytes(recordBytes),
      });
    }
  }
  const binding = {
    artifactPath: "qualification.txt",
    sha256: evidenceHash,
  };
  const study = {
    schema: EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_SCHEMA,
    studyId: "neutral-twelve-worldline-us-study-test",
    branchId: "neutral-twelve-worldline-test-branch",
    protocol: protocolFixture({
      rowCount: 1,
      radii: [1],
      quadrature: {
        primary: { polarOrder: 3, azimuthCount: 6 },
        refined: { polarOrder: 4, azimuthCount: 8 },
      },
    }),
    qualification: {
      prehistoryCollapse: { status: "passed", ...binding },
      rootClearance: { status: "certified_complete", ...binding },
      refinement: { status: "passed", ...binding },
      independentOracle: { status: "passed", ...binding },
    },
    runs,
  };

  const result = evaluateEvolvedNeutralTwelveWorldlineUsStudy({
    study,
    baseDirectory: directory,
  });
  assert.equal(result.grid.runCount, 6);
  assert.equal(result.grid.cartesianComplete, true);
  assert.equal(result.summary.pooled.rowRadiusCount, 6);
  assert.equal(Object.keys(result.summary.byPrehistory).length, 3);
  assert.equal(Object.keys(result.summary.byRefinement).length, 2);
  assert.match(result.resultHash, /^[0-9a-f]{64}$/u);

  const studyPath = path.join(directory, "study.json");
  const outputPath = path.join(directory, "result.json");
  writeFileSync(studyPath, `${JSON.stringify(study, null, 2)}\n`);
  const cli = spawnSync(
    process.execPath,
    [
      path.resolve(
        process.cwd(),
        "scripts/eom/analyze-evolved-neutral-twelve-worldline-us-relationship.mjs",
      ),
      "--study",
      studyPath,
      "--out",
      outputPath,
    ],
    { encoding: "utf8" },
  );
  assert.equal(cli.status, 0, cli.stderr);
  const cliResult = JSON.parse(readFileSync(outputPath, "utf8"));
  assert.equal(cliResult.resultHash, result.resultHash);
  assert.match(cli.stdout, /runs=6 rows=6/u);

  const incomplete = structuredClone(study);
  incomplete.runs.pop();
  assert.throws(
    () => evaluateEvolvedNeutralTwelveWorldlineUsStudy({
      study: incomplete,
      baseDirectory: directory,
    }),
    /grid must be Cartesian-complete/,
  );
});
