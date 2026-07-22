import assert from "node:assert/strict";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  ALL_RETAINED_SIMPLE_ROOTS_POLICY,
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
  buildAllCandidateAnalyticalCampaign,
  backupAndVerifyAnalyticalCampaignDatabase,
  exportAnalyticalCampaign,
  importAnalyticalCampaign,
  inspectAnalyticalCampaignDatabase,
  openAnalyticalCampaignDatabase,
  sha256Canonical,
  verifyIndependentCaseAcceptance,
  verifyAnalyticalCampaignDatabase,
  evaluatePrescribedRecordAnalysis,
  writeAllCandidateAnalyticalCampaign,
} from "../src/prescribed-path-analysis/index.mjs";

function temporaryDirectory(label) {
  return mkdtempSync(path.join(tmpdir(), `${label}-`));
}

function stageCurrentCandidateCampaign(directory) {
  const campaign = buildAllCandidateAnalyticalCampaign(undefined, {
    evaluationMode: "baseline",
  });
  const paths = writeAllCandidateAnalyticalCampaign(
    campaign,
    path.join(directory, "generated-campaign"),
  );
  return { campaign, paths };
}

function serializedJson(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function packetWithoutResultHash(packet) {
  const copy = structuredClone(packet);
  delete copy.resultHash;
  return copy;
}

function linearSource(id, centerX) {
  return {
    id,
    charge: 1,
    trajectory: {
      kind: "moving-circular.v1",
      epochTime: 0,
      centerAtEpoch: { x: centerX, y: 0, z: 0 },
      centerVelocity: { x: 0, y: 0, z: 0 },
      radiusU: { x: 0, y: 0, z: 0 },
      radiusV: { x: 0, y: 0, z: 0 },
      angularVelocity: 0,
      angularAcceleration: 0,
      phaseAtEpoch: 0,
    },
  };
}

function noRootPacket() {
  const sourceRecord = {
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    recordId: "database-no-root-test",
    sourceSchema: "database-independent-acceptance-test.v1",
    engineId: "prescribed-geometry",
    engineVersion: "independent-test-fixture.v1",
    history: { start: 0, end: 4 },
    sources: [linearSource("near", 0), linearSource("far", 100)],
  };
  const protocol = {
    schema: PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
    protocolId: "database-no-root-test-v1",
    fieldSpeed: 2,
    coupling: 1,
    history: { start: 0, end: 4, minimumDelay: 1e-12 },
    returnWindow: { start: 0, period: 2 },
    rootPolicy: {
      id: ALL_RETAINED_SIMPLE_ROOTS_POLICY,
      tolerance: 1e-12,
      maxIterations: 128,
    },
    tolerances: {
      cancellationFloor: 1e-30,
      rootTransversalityFloor: 1e-10,
      minimumSeparationFloor: 0,
      convergenceAbsolute: 1e-9,
    },
    geometry: {
      minimumSeparationSamples: 32,
      samplingRule: "uniform-left-closed-periodic-grid.v1",
    },
    convergence: {
      rootTolerance: 1e-14,
      maxIterations: 192,
      minimumSeparationSamples: 64,
    },
    probes: [{
      id: "database-no-root-probe",
      kind: "stationary-coordinate-probe.v1",
      position: { x: 1, y: 0, z: 0 },
      observationTimes: [2],
      polarities: [1, -1],
    }],
  };
  return evaluatePrescribedRecordAnalysis({ sourceRecord, protocol });
}

test("independent acceptance derives gates from raw ledgers and covers no-root rows", () => {
  const campaign = buildAllCandidateAnalyticalCampaign(undefined, {
    evaluationMode: "baseline",
  });
  const acceptedCase = campaign.summary.cases.find((entry) => entry.gates.passed);
  const packetArtifact = campaign.artifacts.find(
    (artifact) => artifact.relativePath === acceptedCase.packetPath,
  );
  const accepted = verifyIndependentCaseAcceptance(packetArtifact.bytes);
  assert.equal(accepted.accepted, true);
  assert.deepEqual(accepted.failureCodes, []);
  assert.deepEqual(
    accepted.gates.map((gate) => gate.gateId),
    [
      "identity-and-boundary",
      "source-speed",
      "root-completeness",
      "root-transversality",
      "minimum-separation",
      "numerical-convergence",
      "projection-consistency",
      "producer-status-consistency",
    ],
  );

  const noRoot = noRootPacket();
  const noRootAcceptance = verifyIndependentCaseAcceptance(serializedJson(noRoot));
  assert.equal(noRoot.rawLedgers.causalRoots[0].noRootCount, 1);
  assert.equal(noRootAcceptance.accepted, true);

  const producerAcceptedButInvalid = structuredClone(accepted.packet);
  producerAcceptedButInvalid.rawLedgers.causalRoots[0].roots[0]
    .certifiedSpeedBound = producerAcceptedButInvalid.protocol.fieldSpeed;
  producerAcceptedButInvalid.resultHash = sha256Canonical(
    packetWithoutResultHash(producerAcceptedButInvalid),
  );
  assert.equal(producerAcceptedButInvalid.status.code, "ok");
  assert.equal(producerAcceptedButInvalid.reducedMeasures.validity.passed, true);
  const rejected = verifyIndependentCaseAcceptance(
    serializedJson(producerAcceptedButInvalid),
  );
  assert.equal(rejected.accepted, false);
  assert.ok(rejected.failureCodes.includes("source-speed-gate-failed"));
  assert.ok(rejected.failureCodes.includes("projection-consistency-failed"));
});

test("versioned migrations are checksummed and idempotent", () => {
  const directory = temporaryDirectory("aaa-analytical-db-migration");
  try {
    const databasePath = path.join(directory, "campaign.sqlite3");
    const first = openAnalyticalCampaignDatabase(databasePath, {
      appliedAt: "2026-07-22T00:00:00.000Z",
    });
    const firstRows = first.prepare(`
      SELECT migration_id, migration_ordinal, length(checksum) AS checksum_bytes,
             tool_version
      FROM schema_migration ORDER BY migration_ordinal
    `).all();
    assert.equal(Number(first.prepare("PRAGMA user_version").get().user_version), 3);
    first.close();

    const second = openAnalyticalCampaignDatabase(databasePath, {
      appliedAt: "2099-01-01T00:00:00.000Z",
    });
    const secondRows = second.prepare(`
      SELECT migration_id, migration_ordinal, length(checksum) AS checksum_bytes,
             tool_version
      FROM schema_migration ORDER BY migration_ordinal
    `).all();
    second.close();
    assert.deepEqual(secondRows, firstRows);
    assert.deepEqual(firstRows.map((row) => row.checksum_bytes), [32, 32, 32]);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("failed independent preflight writes no campaign artifacts", () => {
  const directory = temporaryDirectory("aaa-analytical-db-reject");
  try {
    const { campaign, paths } = stageCurrentCandidateCampaign(directory);
    const packetArtifact = campaign.artifacts.find(
      (artifact) => artifact.relativePath.endsWith(".result-packet.v1.json"),
    );
    const tamperedPath = path.join(
      path.dirname(paths.manifestPath),
      packetArtifact.relativePath,
    );
    const tampered = JSON.parse(readFileSync(tamperedPath, "utf8"));
    tampered.rawLedgers.causalRoots[0].roots[0].certifiedSpeedBound =
      tampered.protocol.fieldSpeed;
    tampered.resultHash = sha256Canonical(packetWithoutResultHash(tampered));
    writeFileSync(tamperedPath, serializedJson(tampered));

    const databasePath = path.join(directory, "campaign.sqlite3");
    const database = openAnalyticalCampaignDatabase(databasePath);
    database.close();
    assert.throws(
      () => importAnalyticalCampaign(databasePath, {
        manifestPath: paths.manifestPath,
        summaryPath: paths.summaryPath,
        packetDirectory: paths.packetDirectory,
      }),
      /failed independent acceptance/,
    );
    const reopened = openAnalyticalCampaignDatabase(databasePath, {
      readOnly: true,
      migrate: false,
    });
    assert.equal(
      Number(reopened.prepare("SELECT COUNT(*) AS count FROM artifact").get().count),
      0,
    );
    assert.equal(
      Number(reopened.prepare("SELECT COUNT(*) AS count FROM accepted_case").get().count),
      0,
    );
    reopened.close();
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("interrupted ingestion resumes after the last committed batch without duplication", () => {
  const directory = temporaryDirectory("aaa-analytical-db-resume");
  try {
    const { campaign, paths } = stageCurrentCandidateCampaign(directory);
    const databasePath = path.join(directory, "campaign.sqlite3");
    let interrupted = false;
    assert.throws(
      () => importAnalyticalCampaign(databasePath, {
        manifestPath: paths.manifestPath,
        summaryPath: paths.summaryPath,
        packetDirectory: paths.packetDirectory,
        batchSize: 4,
        onBatchCommitted() {
          if (!interrupted) {
            interrupted = true;
            throw new Error("injected interruption after first committed batch");
          }
        },
      }),
      /injected interruption/,
    );
    const partial = openAnalyticalCampaignDatabase(databasePath, {
      readOnly: true,
      migrate: false,
    });
    assert.equal(
      Number(partial.prepare("SELECT COUNT(*) AS count FROM campaign_case").get().count),
      4,
    );
    assert.equal(
      Number(partial.prepare("SELECT COUNT(*) AS count FROM accepted_case").get().count),
      0,
    );
    assert.deepEqual(
      { ...partial.prepare(`
        SELECT state, last_committed_ordinal, committed_case_count
        FROM ingest_batch
      `).get() },
      {
        state: "failed",
        last_committed_ordinal: 3,
        committed_case_count: 4,
      },
    );
    partial.close();

    const resumed = importAnalyticalCampaign(databasePath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
      batchSize: 4,
    });
    assert.equal(resumed.resumedFromOrdinal, 4);
    assert.equal(resumed.acceptedCaseCount, campaign.acceptedCandidateCount);
    assert.equal(resumed.rejectedCaseCount, campaign.rejectedCandidateCount);
    const complete = inspectAnalyticalCampaignDatabase(databasePath);
    assert.equal(complete.acceptedCaseCount, campaign.acceptedCandidateCount);
    assert.equal(complete.rejectedCaseCount, campaign.rejectedCandidateCount);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("generated campaign import is idempotent and deterministic export reproduces every staged byte", async () => {
  const directory = temporaryDirectory("aaa-analytical-db-generated");
  try {
    const { campaign, paths } = stageCurrentCandidateCampaign(directory);
    const databasePath = path.join(directory, "campaign.sqlite3");
    const importProgress = [];
    const first = importAnalyticalCampaign(databasePath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
      onProgress(progress) {
        importProgress.push(progress);
      },
    });
    assert.equal(first.caseCount, campaign.candidates.length);
    assert.equal(first.acceptedCaseCount, campaign.acceptedCandidateCount);
    assert.equal(first.rejectedCaseCount, campaign.rejectedCandidateCount);
    assert.equal(first.batchSize, 32);
    assert.ok(importProgress.some((row) => row.stage === "import-preflight-case"));
    if ((campaign.manifest.rawArtifacts ?? []).length > 0) {
      assert.ok(importProgress.some((row) => row.stage === "import-preflight-raw-artifacts"));
      assert.ok(importProgress.some((row) => row.stage === "import-raw-artifacts"));
    }
    const firstInspection = inspectAnalyticalCampaignDatabase(databasePath);
    assert.equal(firstInspection.integrity, "ok");
    assert.equal(firstInspection.acceptedCaseCount, campaign.acceptedCandidateCount);
    assert.equal(firstInspection.rejectedCaseCount, campaign.rejectedCandidateCount);

    const second = importAnalyticalCampaign(databasePath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
    });
    const secondInspection = inspectAnalyticalCampaignDatabase(databasePath);
    assert.equal(second.acceptedCaseCount, campaign.acceptedCandidateCount);
    assert.equal(secondInspection.fingerprint, firstInspection.fingerprint);
    assert.equal(secondInspection.artifactCount, campaign.artifacts.length + 2);

    const exportDirectory = path.join(directory, "export");
    const exportProgress = [];
    const exported = exportAnalyticalCampaign(databasePath, {
      manifestHash: first.manifestHash,
      outputDirectory: exportDirectory,
      onProgress(progress) {
        exportProgress.push(progress);
      },
    });
    assert.equal(exported.caseCount, campaign.candidates.length);
    assert.equal(exported.packetBoundSourceCount, 0);
    assert.ok(exported.fileCount > campaign.candidates.length);
    if ((campaign.manifest.rawArtifacts ?? []).length > 0) {
      assert.ok(exportProgress.some((row) => row.stage === "export-raw-artifacts"));
    }
    assert.deepEqual(
      readFileSync(path.join(exportDirectory, path.basename(paths.manifestPath))),
      readFileSync(paths.manifestPath),
    );
    assert.deepEqual(
      readFileSync(path.join(exportDirectory, path.basename(paths.summaryPath))),
      readFileSync(paths.summaryPath),
    );
    for (const artifact of campaign.artifacts.filter(
      (entry) => entry.relativePath.startsWith("packets/"),
    )) {
      assert.deepEqual(
        readFileSync(path.join(exportDirectory, artifact.relativePath)),
        artifact.bytes,
      );
    }
    for (const summaryCase of campaign.summary.cases) {
      assert.deepEqual(
        readFileSync(path.join(
          exportDirectory,
          "exact-sources",
          `${summaryCase.sourceHash}.exact-source-record.v1.json`,
        )),
        readFileSync(path.join(
          path.dirname(paths.manifestPath),
          summaryCase.exactSourceRecordPath,
        )),
      );
    }
    const secondExport = exportAnalyticalCampaign(databasePath, {
      manifestHash: first.manifestHash,
      outputDirectory: exportDirectory,
    });
    assert.equal(secondExport.inventoryHash, exported.inventoryHash);

    const backupPath = path.join(directory, "backup.sqlite3");
    const backupResult = await backupAndVerifyAnalyticalCampaignDatabase(
      databasePath,
      backupPath,
    );
    assert.equal(backupResult.integrity, "ok");
    assert.equal(backupResult.acceptedCaseCount, campaign.acceptedCandidateCount);
    assert.equal(backupResult.rejectedCaseCount, campaign.rejectedCandidateCount);
    assert.equal(backupResult.artifactCount, campaign.artifacts.length + 2);
    const verifyProgress = [];
    assert.equal(
      verifyAnalyticalCampaignDatabase(backupPath, {
        onProgress(progress) {
          verifyProgress.push(progress);
        },
      }).fingerprint,
      firstInspection.fingerprint,
    );
    assert.ok(verifyProgress.some((row) => row.stage === "verify-artifacts"));
    if ((campaign.manifest.rawArtifacts ?? []).length > 0) {
      assert.ok(verifyProgress.some((row) => row.stage === "verify-raw-artifacts"));
    }
    const backupExport = exportAnalyticalCampaign(backupPath, {
      manifestHash: first.manifestHash,
      outputDirectory: path.join(directory, "backup-export"),
    });
    assert.equal(backupExport.inventoryHash, exported.inventoryHash);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
