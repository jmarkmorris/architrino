import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";

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

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function stageBaselineCampaignWithRawArtifact(directory) {
  const campaign = buildAllCandidateAnalyticalCampaign(undefined, {
    evaluationMode: "baseline",
  });
  const rawBytes = serializedJson({
    schema: "prescribed-record-analytics/test-raw-packet.v1",
    candidateId: campaign.summary.cases[0].caseId,
    values: [0, 1, 2, Math.PI],
  });
  const compressedBytes = gzipSync(rawBytes, { level: 6, mtime: 0 });
  const descriptor = {
    artifactKind: "raw-analytical-result-packet",
    mediaType: "application/json",
    codec: "gzip",
    path: `raw-artifacts/${sha256Bytes(compressedBytes)}.json.gz`,
    rawSha256: sha256Bytes(rawBytes),
    compressedSha256: sha256Bytes(compressedBytes),
    rawBytes: rawBytes.length,
    storedBytes: compressedBytes.length,
    candidateId: campaign.summary.cases[0].caseId,
    context: { stage: "test-raw-packet", resolution: "primary" },
  };
  const manifest = {
    ...campaign.manifest,
    rawArtifacts: [descriptor],
  };
  const manifestHash = sha256Canonical(manifest);
  const { summaryHash: omittedSummaryHash, ...priorSummary } = campaign.summary;
  void omittedSummaryHash;
  const summaryWithoutHash = {
    ...priorSummary,
    manifestHash,
    rawArtifactCount: 1,
  };
  const summary = {
    ...summaryWithoutHash,
    summaryHash: sha256Canonical(summaryWithoutHash),
  };
  const modified = {
    ...campaign,
    manifest,
    manifestHash,
    manifestBytes: serializedJson(manifest),
    summary,
    summaryBytes: serializedJson(summary),
    rawArtifactInventory: [descriptor],
  };
  const outputDirectory = path.join(directory, "generated-campaign");
  const paths = writeAllCandidateAnalyticalCampaign(modified, outputDirectory);
  const rawPath = path.join(outputDirectory, descriptor.path);
  mkdirSync(path.dirname(rawPath), { recursive: true });
  writeFileSync(rawPath, compressedBytes);
  return { campaign: modified, paths, descriptor, compressedBytes };
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
    assert.equal(Number(first.prepare("PRAGMA user_version").get().user_version), 4);
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
    assert.deepEqual(firstRows.map((row) => row.checksum_bytes), [32, 32, 32, 32]);
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

    const verifiedCompressedDatabasePath = path.join(
      directory,
      "campaign-verified-compressed.sqlite3",
    );
    const verifiedCompressedImport = importAnalyticalCampaign(
      verifiedCompressedDatabasePath,
      {
        manifestPath: paths.manifestPath,
        summaryPath: paths.summaryPath,
        packetDirectory: paths.packetDirectory,
        experimentalRawArtifactImportMode: "verified-compressed",
      },
    );
    const verifiedCompressedInspection = inspectAnalyticalCampaignDatabase(
      verifiedCompressedDatabasePath,
    );
    assert.deepEqual(
      {
        caseCount: verifiedCompressedImport.caseCount,
        acceptedCaseCount: verifiedCompressedImport.acceptedCaseCount,
        rejectedCaseCount: verifiedCompressedImport.rejectedCaseCount,
        fingerprint: verifiedCompressedInspection.fingerprint,
        integrity: verifiedCompressedInspection.integrity,
        artifactCount: verifiedCompressedInspection.artifactCount,
      },
      {
        caseCount: first.caseCount,
        acceptedCaseCount: first.acceptedCaseCount,
        rejectedCaseCount: first.rejectedCaseCount,
        fingerprint: firstInspection.fingerprint,
        integrity: firstInspection.integrity,
        artifactCount: firstInspection.artifactCount,
      },
    );
    const baselineDatabase = openAnalyticalCampaignDatabase(databasePath, {
      readOnly: true,
      migrate: false,
    });
    const verifiedCompressedDatabase = openAnalyticalCampaignDatabase(
      verifiedCompressedDatabasePath,
      { readOnly: true, migrate: false },
    );
    try {
      for (const table of [
        "artifact",
        "analytical_raw_artifact",
        "case_reduced_measure",
        "multidimensional_measure",
        "validity_gate_result",
        "case_acceptance",
      ]) {
        const baselineRows = baselineDatabase.prepare(
          `SELECT * FROM ${table} ORDER BY 1`,
        ).all();
        const verifiedCompressedRows = verifiedCompressedDatabase.prepare(
          `SELECT * FROM ${table} ORDER BY 1`,
        ).all();
        assert.deepEqual(verifiedCompressedRows, baselineRows);
      }
    } finally {
      baselineDatabase.close();
      verifiedCompressedDatabase.close();
    }

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

test("verified compressed raw import preserves baseline bytes and verification", () => {
  const directory = temporaryDirectory("aaa-analytical-db-verified-compressed");
  try {
    const { paths, descriptor, compressedBytes } =
      stageBaselineCampaignWithRawArtifact(directory);
    const baselinePath = path.join(directory, "baseline.sqlite3");
    const verifiedPath = path.join(directory, "verified.sqlite3");
    const baselineImport = importAnalyticalCampaign(baselinePath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
    });
    const verifiedImport = importAnalyticalCampaign(verifiedPath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
      experimentalRawArtifactImportMode: "verified-compressed",
    });
    const baselineVerification = verifyAnalyticalCampaignDatabase(baselinePath);
    const verifiedVerification = verifyAnalyticalCampaignDatabase(verifiedPath);
    const singlePassVerification = verifyAnalyticalCampaignDatabase(
      verifiedPath,
      { experimentalSinglePassRawArtifactVerification: true },
    );
    assert.equal(
      singlePassVerification.fingerprint,
      verifiedVerification.fingerprint,
    );
    assert.deepEqual(
      {
        manifestHash: verifiedImport.manifestHash,
        summaryHash: verifiedImport.summaryHash,
        caseCount: verifiedImport.caseCount,
        acceptedCaseCount: verifiedImport.acceptedCaseCount,
        rejectedCaseCount: verifiedImport.rejectedCaseCount,
        campaignEvidenceHash: verifiedImport.campaignEvidenceHash,
        fingerprint: verifiedVerification.fingerprint,
        integrity: verifiedVerification.integrity,
      },
      {
        manifestHash: baselineImport.manifestHash,
        summaryHash: baselineImport.summaryHash,
        caseCount: baselineImport.caseCount,
        acceptedCaseCount: baselineImport.acceptedCaseCount,
        rejectedCaseCount: baselineImport.rejectedCaseCount,
        campaignEvidenceHash: baselineImport.campaignEvidenceHash,
        fingerprint: baselineVerification.fingerprint,
        integrity: baselineVerification.integrity,
      },
    );
    for (const databasePath of [baselinePath, verifiedPath]) {
      const database = openAnalyticalCampaignDatabase(databasePath, {
        readOnly: true,
        migrate: false,
      });
      try {
        const row = database.prepare(`
          SELECT lower(hex(r.compressed_hash)) AS compressed_hash,
                 lower(hex(r.raw_hash)) AS raw_hash,
                 a.payload
          FROM analytical_raw_artifact AS r
          JOIN artifact AS a USING (artifact_hash)
        `).get();
        assert.equal(row.compressed_hash, descriptor.compressedSha256);
        assert.equal(row.raw_hash, descriptor.rawSha256);
        assert.deepEqual(Buffer.from(row.payload), compressedBytes);
      } finally {
        database.close();
      }
    }
    const corrupted = openAnalyticalCampaignDatabase(verifiedPath);
    const storedPayload = corrupted.prepare(`
      SELECT artifact.payload
      FROM analytical_raw_artifact
      JOIN artifact USING (artifact_hash)
    `).get().payload;
    const corruptedPayload = Buffer.from(storedPayload);
    corruptedPayload[0] ^= 0xff;
    corrupted.prepare(`
      UPDATE artifact SET payload = ?
      WHERE artifact_hash = (
        SELECT artifact_hash FROM analytical_raw_artifact LIMIT 1
      )
    `).run(corruptedPayload);
    corrupted.close();
    assert.throws(
      () => verifyAnalyticalCampaignDatabase(verifiedPath, {
        experimentalSinglePassRawArtifactVerification: true,
      }),
      /incorrect header check|failed hash\/size verification/,
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("bounded raw-artifact transactions preserve output and resume after interruption", () => {
  const directory = temporaryDirectory("aaa-analytical-db-bounded-raw");
  try {
    const { paths } = stageBaselineCampaignWithRawArtifact(directory);
    const baselinePath = path.join(directory, "baseline.sqlite3");
    const boundedPath = path.join(directory, "bounded.sqlite3");
    const interruptedPath = path.join(directory, "interrupted.sqlite3");
    importAnalyticalCampaign(baselinePath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
      experimentalRawArtifactImportMode: "verified-compressed",
    });
    const committed = [];
    const boundedImport = importAnalyticalCampaign(boundedPath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
      experimentalRawArtifactImportMode: "verified-compressed",
      experimentalRawArtifactTransactionBatchSize: 1,
      onRawArtifactBatchCommitted(progress) {
        committed.push(progress);
      },
    });
    assert.equal(boundedImport.rawArtifactTransactionBatchSize, 1);
    assert.deepEqual(
      committed.map((row) => [row.completedWork, row.totalWork]),
      [[1, 1]],
    );
    assert.equal(
      verifyAnalyticalCampaignDatabase(boundedPath).fingerprint,
      verifyAnalyticalCampaignDatabase(baselinePath).fingerprint,
    );

    let interrupted = false;
    assert.throws(
      () => importAnalyticalCampaign(interruptedPath, {
        manifestPath: paths.manifestPath,
        summaryPath: paths.summaryPath,
        packetDirectory: paths.packetDirectory,
        experimentalRawArtifactImportMode: "verified-compressed",
        experimentalRawArtifactTransactionBatchSize: 1,
        onRawArtifactBatchCommitted() {
          if (!interrupted) {
            interrupted = true;
            throw new Error("injected interruption after raw-artifact commit");
          }
        },
      }),
      /injected interruption/,
    );
    const partial = openAnalyticalCampaignDatabase(interruptedPath, {
      readOnly: true,
      migrate: false,
    });
    assert.equal(
      Number(partial.prepare(
        "SELECT COUNT(*) AS count FROM analytical_raw_artifact",
      ).get().count),
      1,
    );
    assert.equal(
      Number(partial.prepare("SELECT COUNT(*) AS count FROM campaign_case").get().count),
      0,
    );
    partial.close();
    importAnalyticalCampaign(interruptedPath, {
      manifestPath: paths.manifestPath,
      summaryPath: paths.summaryPath,
      packetDirectory: paths.packetDirectory,
      experimentalRawArtifactImportMode: "verified-compressed",
      experimentalRawArtifactTransactionBatchSize: 1,
    });
    assert.equal(
      verifyAnalyticalCampaignDatabase(interruptedPath).fingerprint,
      verifyAnalyticalCampaignDatabase(baselinePath).fingerprint,
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("verified compressed raw import rejects a file changed after preflight", () => {
  const directory = temporaryDirectory("aaa-analytical-db-raw-toctou");
  try {
    const { paths, descriptor, compressedBytes } =
      stageBaselineCampaignWithRawArtifact(directory);
    const rawPath = path.join(path.dirname(paths.manifestPath), descriptor.path);
    const databasePath = path.join(directory, "changed.sqlite3");
    let changed = false;
    assert.throws(
      () => importAnalyticalCampaign(databasePath, {
        manifestPath: paths.manifestPath,
        summaryPath: paths.summaryPath,
        packetDirectory: paths.packetDirectory,
        experimentalRawArtifactImportMode: "verified-compressed",
        onProgress(progress) {
          if (!changed && progress.stage === "import-preflight-raw-artifacts" &&
              progress.completedWork === progress.totalWork &&
              progress.completedWork > 0) {
            changed = true;
            writeFileSync(
              rawPath,
              Buffer.concat([compressedBytes, Buffer.from([0])]),
            );
          }
        },
      }),
      /changed after preflight/,
    );
    assert.equal(changed, true);
    const database = openAnalyticalCampaignDatabase(databasePath, {
      readOnly: true,
      migrate: false,
    });
    try {
      assert.equal(
        Number(database.prepare("SELECT COUNT(*) AS count FROM artifact").get().count),
        0,
      );
      assert.equal(
        Number(database.prepare(
          "SELECT COUNT(*) AS count FROM analytical_raw_artifact",
        ).get().count),
        0,
      );
    } finally {
      database.close();
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
