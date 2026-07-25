import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { BORG_BRAID_RECORD_CATALOG } from "../src/apps/borg/BorgBraidRecordCatalog.js";
import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  buildAllCandidateAnalyticalCampaign,
  loadAllCandidateCampaignRegistry,
  validateMethodologyCoverageContract,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  adjudicateTransmitterSensitivityConvergence,
  centeredSensitivityDerivative,
  differentiateMatchedRootBranches,
  perturbDeclaredPrimaryBraidPhaseOffset,
} from "../src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs";
import {
  validateCompleteCycleSourceApplicability,
} from "../src/prescribed-path-analysis/B1StreamingReductions.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "../scripts/eom/generate-prescribed-braid-record.mjs";
import {
  openAnalyticalCampaignDatabase,
  verifyAnalyticalCampaignDatabase,
} from "../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs";
import {
  rebuildAllCandidateAnalyticalDatabase,
} from "../src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs";

function temporaryDirectory(label) {
  return mkdtempSync(path.join(os.tmpdir(), `${label}-`));
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

test("all-candidate registry exactly covers the live Borg catalog", () => {
  const campaign = buildAllCandidateAnalyticalCampaign(undefined, {
    evaluationMode: "baseline",
  });
  assert.equal(campaign.candidates.length, BORG_BRAID_RECORD_CATALOG.entries.length);
  assert.deepEqual(
    campaign.candidates.map((row) => row.declaration.candidateId),
    BORG_BRAID_RECORD_CATALOG.entries.map((row) => row.id),
  );
  assert.equal(
    campaign.candidates.some((row) => row.declaration.memberId === "B1.4"),
    false,
  );
  assert.equal(
    campaign.candidates.filter((row) =>
      row.declaration.familyId === "B").every((row) =>
      row.spec.braids.some((braid) => braid.binaries.some(
        (binary) => binary.transverseOrbitRadius > 0,
      ))),
    true,
  );
  assert.equal(
    campaign.acceptedCandidateCount + campaign.rejectedCandidateCount,
    campaign.candidates.length,
  );
  assert.equal(campaign.artifacts.length, campaign.candidates.length * 2);
  for (const row of campaign.summary.cases) {
    assert.match(row.exactSourceArtifactSha256, /^[0-9a-f]{64}$/);
    assert.equal(row.protocolHash, campaign.protocolHash);
  }
  assert.deepEqual(campaign.summary.claimBoundary, {
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
    excludedClaims: ["stability", "energy", "retention", "physical-realization"],
  });
});

test("methodology coverage is exact and a methodology byte change does not advance", () => {
  const coverage = JSON.parse(readFileSync(
    new URL("../src/prescribed-path-analysis/analytical-measure-coverage.v1.json", import.meta.url),
    "utf8",
  ));
  const methodology = readFileSync(new URL(
    "../content/markdown/aaa/noether-braid/braid-analysis-methodology.md",
    import.meta.url,
  ));
  const validated = validateMethodologyCoverageContract(coverage, methodology);
  assert.equal(validated.measureIds.length, 29);
  assert.throws(
    () => validateMethodologyCoverageContract(
      coverage,
      Buffer.concat([methodology, Buffer.from("\nmethodology drift")]),
    ),
    /requires an explicit analytical coverage impact review/,
  );
});

test("centered stencil matches a cubic derivative and topology mismatch rejects differencing", () => {
  const step = 1e-3;
  const coordinate = 0.4;
  const derivative = centeredSensitivityDerivative(
    { analytic: (coordinate - step) ** 3 },
    { analytic: (coordinate + step) ** 3 },
    2 * step,
  );
  assert.ok(Math.abs(derivative.analytic - (3 * coordinate ** 2 + step ** 2)) < 1e-12);
  const event = (transmitterId) => ({
    roots: [{
      transmitterId,
      signedWakeContribution: 1,
      probeAccelerationContributions: [{
        probePolarity: 1,
        acceleration: { x: 1, y: 0, z: 0 },
      }],
    }],
    measures: {
      signedWake: 1,
      probeResponses: [{ probePolarity: 1, acceleration: { x: 1, y: 0, z: 0 } }],
    },
  });
  assert.equal(
    differentiateMatchedRootBranches(event("left"), event("right"), 2 * step, "x").status,
    "rejected-root-topology-discontinuity",
  );
});

test("transmitter-sensitivity convergence compares dimensionless per-measure uncertainty", () => {
  const adjudication = adjudicateTransmitterSensitivityConvergence({
    primaryDerivative: { etaExtPositive: 0.1, etaWakeFlux: 0.2 },
    refinedDerivative: { etaExtPositive: 0.11, etaWakeFlux: 0.205 },
    endpointRmsDerivatives: {
      sourceA: { primary: 100, refined: 101 },
    },
    baseEndpointRmsBySource: { sourceA: 80 },
    threshold: 0.02,
    normalization: {
      surfaceRatioScale: 1,
      endpointRmsRelativeFloor: 1e-12,
    },
  });
  assert.equal(adjudication.passed, true);
  assert.ok(adjudication.maximumNormalizedUncertainty < 0.02);
  assert.equal(adjudication.endpoints.sourceA.absoluteUncertainty, 1);
});

test("cohort sensitivity varies the declared braid phase offset without breaking A1.2", () => {
  const registry = loadAllCandidateCampaignRegistry();
  const a12 = registry.candidates.find((row) => row.declaration.memberId === "A1.2");
  const delta = Math.PI / 64;
  const perturbed = perturbDeclaredPrimaryBraidPhaseOffset(a12.spec, delta);
  assert.equal(perturbed.braids[0].phaseOffset, a12.spec.braids[0].phaseOffset + delta);
  assert.deepEqual(
    perturbed.braids[0].binaries.map((binary) => binary.phase),
    a12.spec.braids[0].binaries.map((binary) => binary.phase),
  );
});

test("coaxial C5 circles satisfy the cohort geometry and exact envelope", () => {
  const registry = loadAllCandidateCampaignRegistry();
  const c5 = registry.candidates.find((row) => row.declaration.memberId === "C5");
  const source = createPrescribedBraidExactSourceRecord(c5.spec);
  assert.doesNotThrow(() => validateCompleteCycleSourceApplicability(source, registry.protocol));
  assert.deepEqual(c5.spec.braids.map((braid) => braid.centerOffset), [
    [0, 0, -0.55],
    [0, 0, 0.55],
  ]);
  assert.deepEqual(c5.spec.braids.map((braid) => braid.frameDefinition.axis), [
    [0, 0, 1],
    [0, 0, 1],
  ]);
  const exactEnvelope = Math.max(...source.sources.map((entry) => {
    const center = entry.trajectory.centerAtEpoch;
    const radius = entry.trajectory.radiusU;
    return Math.hypot(center.x, center.y, center.z) + Math.hypot(radius.x, radius.y, radius.z);
  }));
  assert.equal(exactEnvelope, 0.99);
  assert.ok(exactEnvelope < registry.protocol.enclosingSurfaces.radii[0]);
});

test("registry omission fails before replacing the target database", async () => {
  const directory = temporaryDirectory("aaa-rebuild-registry-omission");
  try {
    const databasePath = path.join(directory, "analytical-campaigns.sqlite3");
    const database = openAnalyticalCampaignDatabase(databasePath);
    database.close();
    const before = sha256File(databasePath);
    const registry = JSON.parse(readFileSync(
      DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
      "utf8",
    ));
    registry.candidates.pop();
    const registryPath = path.join(directory, "incomplete-registry.json");
    writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
    await assert.rejects(
      rebuildAllCandidateAnalyticalDatabase({
        evaluationMode: "baseline",
        mode: "publish",
        databasePath,
        registryPath,
      }),
      /candidate count .* differs from catalog count/,
    );
    assert.equal(sha256File(databasePath), before);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("check is nonpublishing, post-swap failure rolls back, and success swaps atomically", async () => {
  const directory = temporaryDirectory("aaa-rebuild-publication");
  try {
    const databasePath = path.join(directory, "analytical-campaigns.sqlite3");
    const database = openAnalyticalCampaignDatabase(databasePath);
    database.close();
    const originalHash = sha256File(databasePath);

    const checked = await rebuildAllCandidateAnalyticalDatabase({
      evaluationMode: "baseline",
      mode: "check",
      databasePath,
    });
    assert.equal(checked.published, false);
    assert.equal(sha256File(databasePath), originalHash);

    await assert.rejects(
      rebuildAllCandidateAnalyticalDatabase({
        evaluationMode: "baseline",
        mode: "publish",
        databasePath,
        failureInjection: "after-swap",
      }),
      /injected analytical rebuild failure at after-swap/,
    );
    assert.equal(sha256File(databasePath), originalHash);
    assert.equal(verifyAnalyticalCampaignDatabase(databasePath).acceptedCaseCount, 0);

    const published = await rebuildAllCandidateAnalyticalDatabase({
      evaluationMode: "baseline",
      mode: "publish",
      databasePath,
    });
    assert.equal(published.published, true);
    assert.equal(published.fingerprint, checked.fingerprint);
    assert.equal(published.candidateCount, BORG_BRAID_RECORD_CATALOG.entries.length);
    assert.equal(
      published.acceptedCandidateCount + published.rejectedCandidateCount,
      published.candidateCount,
    );
    const verification = verifyAnalyticalCampaignDatabase(databasePath);
    assert.equal(verification.integrity, "ok");
    assert.equal(verification.generationCount, 1);
    assert.equal(verification.rejectedCaseCount, published.rejectedCandidateCount);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
