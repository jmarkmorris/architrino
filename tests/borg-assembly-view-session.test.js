import assert from "node:assert/strict";
import test from "node:test";

import {
  BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS,
  assessBorgAssemblyViewComparison,
  createBorgAssemblyViewPresentation,
  createBorgAssemblyViewSession,
  resolveBorgAssemblyViewTrail,
} from "../src/apps/borg/BorgAssemblyViewSession.js";

function record(runId, overrides = {}) {
  const claimGrade = overrides.claimGrade ?? "chart-hypothesis";
  const worldline = {
    id: overrides.worldlineId ?? `${runId}-source`,
    pathKey: overrides.pathKey ?? `${runId}-path`,
    polarity: 1,
    coverageStart: 0,
    coverageEnd: 2,
    interpolation: "exact-inertial-polynomial/v1",
    segments: [{
      startTime: 0,
      endTime: 2,
      coefficients: [[0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      positionError: 0,
      velocityError: 0,
    }],
  };
  if (claimGrade === "evolved-record") {
    worldline.declaredPrehistorySegmentCount = 0;
    worldline.evolvedSegmentCount = 1;
    worldline.historyFingerprint = `${runId}-fingerprint`;
  }
  return {
    schema: "assembly-view-record.v0",
    sourceId: overrides.sourceId ?? runId,
    permutationCanonicalKey: overrides.permutationCanonicalKey,
    provenance: {
      engineId: "eom-solver",
      engineVersion: "session-fixture-v1",
      runId,
      claimGrade,
      evidenceStatus: overrides.evidenceStatus ?? "display-only",
      generatingSpec: "tests/borg-assembly-view-session.test.js",
      date: "2026-07-20",
    },
    window: overrides.window ??
      { start: 0, end: 2, delayHorizon: 0.75, sampleInterval: 0.25 },
    worldlines: [worldline],
    binaries: overrides.binaries ?? [],
    ansatz: overrides.ansatz ?? [],
    events: overrides.events ?? [],
    navigation: overrides.navigation,
  };
}

test("Borg assembly-view collection preserves raw records, source ids, source order, and string path ids", () => {
  const raw = [
    record("r-z", { sourceId: "source-z", worldlineId: "labeled-z", pathKey: "path-z" }),
    record("r-a", { sourceId: "source-a", worldlineId: "labeled-a", pathKey: "path-a" }),
  ];
  const session = createBorgAssemblyViewSession(raw);

  assert.deepEqual(session.records.map((entry) => entry.sourceId), ["source-z", "source-a"]);
  assert.deepEqual(session.records.map((entry) => entry.sourceIndex), [0, 1]);
  assert.equal(session.records[0].rawRecord, raw[0]);
  assert.equal(session.records[1].rawRecord, raw[1]);
  assert.equal(session.records[0].dataset.worldlines[0].id, "labeled-z");
  assert.equal(session.records[0].dataset.worldlines[0].pathKey, "path-z");
});

test("optional S3 navigation grouping requires source-carried keys and never replaces the raw selection", () => {
  const missing = createBorgAssemblyViewSession([record("a"), record("b")]);
  assert.throws(
    () => missing.setGroupingEnabled(true),
    /source-carried permutation-canonical key/,
  );

  const grouped = createBorgAssemblyViewSession([
    record("a", { permutationCanonicalKey: "tri-binary:S3:k" }),
    record("b", { permutationCanonicalKey: "tri-binary:S3:k" }),
  ]);
  grouped.selectSource("b");
  const rows = grouped.setGroupingEnabled(true);
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0].groupedSourceIds, ["a", "b"]);
  assert.equal(rows[0].selectedRawRecordId, "b");
  assert.equal(grouped.selectedSourceId, "b");
  assert.equal(grouped.selected.rawRecord.provenance.runId, "b");
});

test("collection filters consume only source-carried values and preserve source order", () => {
  const session = createBorgAssemblyViewSession([
    record("first", { navigation: { filters: { braidCertificationStatus: "candidate" } } }),
    record("second", { navigation: { filters: { braidCertificationStatus: "rejected" } } }),
    record("third"),
  ]);
  assert.deepEqual(
    session.setFilters({ braidCertificationStatus: "candidate" }).map((entry) => entry.sourceId),
    ["first"],
  );
  assert.throws(() => session.setFilters({ computedResidual: "small" }), /not source-carried/);
});

test("comparison does not advance because v0 has no ratified time and unit transforms", () => {
  const session = createBorgAssemblyViewSession([record("left"), record("right")]);
  const result = session.assessComparison("right");
  assert.equal(result.compatible, false);
  assert.equal(result.code, "missing-ratified-comparison-transforms");
  assert.equal(result.message, BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS.comparisonTransforms);
  assert.deepEqual(result, assessBorgAssemblyViewComparison(session.records[0], session.records[1]));
});

test("presentation labels chart and evolved records distinctly without upgrading evidence", () => {
  const chart = createBorgAssemblyViewSession([record("chart")]).selected;
  const evolved = createBorgAssemblyViewSession([
    record("evolved", { claimGrade: "evolved-record", evidenceStatus: "canonical" }),
  ]).selected;
  assert.equal(createBorgAssemblyViewPresentation(chart).claimLabel, "Prescribed Geometry");
  const evolvedPresentation = createBorgAssemblyViewPresentation(evolved);
  assert.equal(evolvedPresentation.claimLabel, "Evolved record");
  assert.equal(evolvedPresentation.provenance.evidenceStatus, "canonical");
  assert.match(evolvedPresentation.authorityNotice, /create no evidence/);
});

test("presentation exposes individual constituent and worldline identities for nonbinary prescribed records", () => {
  const raw = record("individual-worldline");
  raw.provenance.engineId = "prescribed-geometry";
  raw.provenance.prescribedGeometry = {
    emitterId: "test-emitter.v0",
    sourceSchema: "prescribed-assembly-spec.v2",
    interpolation: "exact-inertial-polynomial/v1",
    errorMethod: "test-error-method.v0",
    physicsInvoked: false,
    responseCenter: { x: 0, y: 0, z: 0 },
    sphericalEnvelopeRadius: 1,
    prescribedReturnPeriod: null,
    displayTrailDuration: 1,
    coordinates: {
      constituentInventory: [{
        id: "individual-positrino",
        polarity: 1,
        role: "braid",
        worldlineId: "individual-worldline-source",
      }],
    },
  };
  raw.worldlines[0].id = "individual-worldline-source";
  raw.worldlines[0].pathKey = "individual-worldline-source";
  const presentation = createBorgAssemblyViewPresentation(
    createBorgAssemblyViewSession([raw]).selected,
  );

  assert.deepEqual(presentation.binaryRows, []);
  assert.deepEqual(
    presentation.constituentRows.map(({ constituentId, worldlineId, polarity, role }) => ({
      constituentId,
      worldlineId,
      polarity,
      role,
    })),
    [{
      constituentId: "individual-positrino",
      worldlineId: "individual-worldline-source",
      polarity: 1,
      role: "braid",
    }],
  );
});

test("prescribed chart trails use the source-defined number of full rotations", () => {
  const raw = record("prescribed-trail", {
    binaries: [{
      id: "binary-a",
      frequency: 0.25,
      planeOrientation: { normal: { x: 0, y: 0, z: 1 } },
    }],
  });
  raw.provenance.engineId = "prescribed-geometry";
  raw.provenance.prescribedGeometry = {
    emitterId: "test-emitter.v0",
    sourceSchema: "test-source.v0",
    interpolation: "exact-inertial-polynomial/v1",
    errorMethod: "test-error-method.v0",
    physicsInvoked: false,
    responseCenter: { x: 0, y: 0, z: 0 },
    sphericalEnvelopeRadius: 1,
    prescribedReturnPeriod: 4,
    displayTrailPeriods: 2,
  };
  const entry = createBorgAssemblyViewSession([raw]).selected;
  assert.deepEqual(resolveBorgAssemblyViewTrail(entry), {
    duration: 8,
    period: 4,
    periodCount: 2,
    source: "prescribed-display-periods",
  });
});

test("record trails stay positive when a valid record declares zero delay horizon", () => {
  const entry = createBorgAssemblyViewSession([
    record("zero-horizon", {
      window: {
        start: 0,
        end: 2,
        delayHorizon: 0,
        sampleInterval: 0.25,
      },
      binaries: [{
        id: "binary",
        frequency: 1,
      }],
    }),
  ]).selected;
  assert.deepEqual(resolveBorgAssemblyViewTrail(entry), {
    duration: 0.25,
    period: 1,
    periodCount: null,
    source: "record-sample-interval-fallback",
  });
});

test("play and scrub attempts outside recorded coverage do not advance", () => {
  const session = createBorgAssemblyViewSession([record("coverage")]);
  assert.equal(session.requireTimeInCoverage(2), 2);
  assert.throws(() => session.requireTimeInCoverage(2.0001), /does not cover display time/);
  assert.throws(() => createBorgAssemblyViewPresentation(session.selected, { time: -1 }), /inside \[0, 2\]/);
});
