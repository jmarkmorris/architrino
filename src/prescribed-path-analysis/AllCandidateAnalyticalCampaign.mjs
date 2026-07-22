import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  BORG_BRAID_RECORD_CATALOG,
  BORG_BRAID_RECORD_CATALOG_ID,
} from "../apps/borg/BorgBraidRecordCatalog.js";
import {
  PRESCRIBED_BRAID_TARGETS,
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";
import {
  canonicalJson,
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
  validatePrescribedRecordAnalysisProtocol,
} from "./AnalyticalBraidEvaluator.mjs";
import { validateExactPrescribedSourceRecord } from "./ExactPrescribedSourceWake.mjs";

export const ALL_CANDIDATE_CAMPAIGN_REGISTRY_SCHEMA =
  "prescribed-path-analysis/all-candidate-campaign-registry.v1";
export const ALL_CANDIDATE_CAMPAIGN_MANIFEST_SCHEMA =
  "prescribed-path-analysis/all-candidate-campaign-manifest.v1";
export const ALL_CANDIDATE_CAMPAIGN_SUMMARY_SCHEMA =
  "prescribed-path-analysis/all-candidate-campaign-summary.v1";

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../..");
const CAMPAIGN_DIRECTORY = path.join(
  REPOSITORY_ROOT,
  "src/prescribed-path-analysis/campaigns",
);
const REQUIRED_GATE_IDS = Object.freeze([
  "source-speed",
  "root-completeness",
  "root-transversality",
  "minimum-separation",
  "numerical-convergence",
]);
const IMPLEMENTED_MEASURES = Object.freeze([
  "retained-root-count",
  "signed-wake",
  "unsigned-wake",
  "signed-cancellation-ratio",
  "positive-and-negative-probe-acceleration",
  "prescribed-period-closure",
  "minimum-separation",
  "root-transversality-margin",
  "numerical-convergence",
]);

export const DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH = path.join(
  CAMPAIGN_DIRECTORY,
  "all-candidate-analytical-campaign.registry.v1.json",
);

function fail(message) {
  throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function prettyJsonBytes(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function resolveRepositoryPath(relativePath, label) {
  const value = concreteString(relativePath, label);
  if (path.isAbsolute(value)) throw new TypeError(`${label} must be repository-relative.`);
  const absolutePath = path.resolve(REPOSITORY_ROOT, value);
  if (!absolutePath.startsWith(`${REPOSITORY_ROOT}${path.sep}`)) {
    throw new RangeError(`${label} must remain inside the repository.`);
  }
  return absolutePath;
}

function relativeRepositoryPath(absolutePath) {
  return path.relative(REPOSITORY_ROOT, absolutePath).split(path.sep).join("/");
}

function listCampaignManifests(directory = CAMPAIGN_DIRECTORY) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...listCampaignManifests(absolutePath));
    else if (entry.name.endsWith(".manifest.v1.json")) {
      found.push(relativeRepositoryPath(absolutePath));
    }
  }
  return found.sort();
}

function validateRegistryShape(registry) {
  if (!registry || registry.schema !== ALL_CANDIDATE_CAMPAIGN_REGISTRY_SCHEMA) {
    throw new TypeError(
      `all-candidate registry requires schema ${ALL_CANDIDATE_CAMPAIGN_REGISTRY_SCHEMA}.`,
    );
  }
  concreteString(registry.registryId, "registryId");
  if (registry.catalogId !== BORG_BRAID_RECORD_CATALOG_ID) {
    fail(`registry catalog ${registry.catalogId} does not match ${BORG_BRAID_RECORD_CATALOG_ID}.`);
  }
  if (!registry.generatedCampaign || !Array.isArray(registry.candidates) ||
      !Array.isArray(registry.checkedCampaigns) ||
      !Array.isArray(registry.excludedCampaigns)) {
    fail("all-candidate registry inventories are incomplete.");
  }
  return registry;
}

function targetByRecordPath() {
  return new Map(PRESCRIBED_BRAID_TARGETS.map((target) => [
    relativeRepositoryPath(target.outPath),
    target,
  ]));
}

function validateCandidateInventory(registry) {
  const catalogEntries = BORG_BRAID_RECORD_CATALOG.entries;
  if (registry.candidates.length !== catalogEntries.length) {
    fail(
      `registry candidate count ${registry.candidates.length} differs from ` +
      `catalog count ${catalogEntries.length}.`,
    );
  }
  const targets = targetByRecordPath();
  const candidateIds = new Set();
  return registry.candidates.map((candidate, ordinal) => {
    const catalog = catalogEntries[ordinal];
    if (candidate.candidateId !== catalog.id ||
        candidate.familyId !== catalog.familyId ||
        candidate.recordPath !== catalog.recordUrl) {
      fail(`registry candidate ${ordinal} differs from the canonical Borg catalog.`);
    }
    if (candidateIds.has(candidate.candidateId)) {
      fail(`registry candidate ${candidate.candidateId} is duplicated.`);
    }
    candidateIds.add(candidate.candidateId);
    const target = targets.get(candidate.recordPath);
    if (!target || relativeRepositoryPath(target.specPath) !== candidate.specPath) {
      fail(`registry candidate ${candidate.candidateId} differs from the prescribed target map.`);
    }
    const specPath = resolveRepositoryPath(candidate.specPath, "candidate specPath");
    const recordPath = resolveRepositoryPath(candidate.recordPath, "candidate recordPath");
    const specBytes = readFileSync(specPath);
    const recordBytes = readFileSync(recordPath);
    const spec = validatePrescribedBraidSpec(JSON.parse(specBytes.toString("utf8")));
    if (spec.specId !== candidate.candidateId ||
        spec.taxonomy.familyId !== candidate.familyId ||
        spec.taxonomy.memberId !== candidate.memberId) {
      fail(`registry candidate ${candidate.candidateId} differs from its source specification.`);
    }
    return {
      ordinal,
      declaration: candidate,
      catalog,
      spec,
      specBytes,
      recordBytes,
    };
  });
}

function validateDeclaredCampaignInventory(registry) {
  const declared = [
    ...registry.checkedCampaigns.map((row) => row.manifestPath),
    ...registry.excludedCampaigns.map((row) => row.manifestPath),
  ].sort();
  const discovered = listCampaignManifests();
  if (canonicalJson(declared) !== canonicalJson(discovered)) {
    fail(
      `campaign registry inventory differs: declared ${JSON.stringify(declared)}, ` +
      `discovered ${JSON.stringify(discovered)}.`,
    );
  }
  const ids = new Set();
  const checkedCampaigns = registry.checkedCampaigns.map((row) => {
    concreteString(row.campaignId, "checked campaignId");
    const manifestPath = resolveRepositoryPath(row.manifestPath, "checked manifestPath");
    const summaryPath = resolveRepositoryPath(row.summaryPath, "checked summaryPath");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (manifest.campaignId !== row.campaignId || ids.has(row.campaignId)) {
      fail(`checked campaign ${row.campaignId} is duplicated or mismatched.`);
    }
    ids.add(row.campaignId);
    return { ...row, manifestPath, summaryPath };
  });
  for (const row of registry.excludedCampaigns) {
    concreteString(row.campaignId, "excluded campaignId");
    concreteString(row.reason, `excluded campaign ${row.campaignId} reason`);
    const manifestPath = resolveRepositoryPath(
      row.manifestPath,
      "excluded manifestPath",
    );
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (manifest.campaignId !== row.campaignId || ids.has(row.campaignId)) {
      fail(`excluded campaign ${row.campaignId} is duplicated or mismatched.`);
    }
    ids.add(row.campaignId);
  }
  return checkedCampaigns;
}

export function loadAllCandidateCampaignRegistry(
  registryPath = DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
) {
  const absolutePath = path.resolve(registryPath);
  const bytes = readFileSync(absolutePath);
  const registry = validateRegistryShape(JSON.parse(bytes.toString("utf8")));
  const candidates = validateCandidateInventory(registry);
  const checkedCampaigns = validateDeclaredCampaignInventory(registry);
  const protocolPath = resolveRepositoryPath(
    registry.generatedCampaign.protocolPath,
    "generatedCampaign.protocolPath",
  );
  const protocolBytes = readFileSync(protocolPath);
  const protocol = validatePrescribedRecordAnalysisProtocol(
    JSON.parse(protocolBytes.toString("utf8")),
  );
  return {
    registryPath: absolutePath,
    registryBytes: bytes,
    registry,
    registryHash: sha256Canonical(registry),
    catalogHash: sha256Canonical(BORG_BRAID_RECORD_CATALOG),
    candidates,
    checkedCampaigns,
    protocolPath,
    protocolBytes,
    protocol,
    protocolHash: sha256Canonical(protocol),
  };
}

function accelerationMagnitude(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function summaryCase(candidate, packet) {
  const rootCount = packet.rawLedgers.causalRoots.reduce(
    (sum, event) => sum + event.roots.length,
    0,
  );
  const noRootCount = packet.rawLedgers.causalRoots.reduce(
    (sum, event) => sum + event.noRootTransmitters.length,
    0,
  );
  return {
    caseId: candidate.declaration.candidateId,
    label: candidate.catalog.label,
    caseType: "catalog-candidate",
    packetPath: `packets/${candidate.declaration.candidateId}.result-packet.v1.json`,
    exactSourceRecordPath:
      `exact-sources/${candidate.declaration.candidateId}.exact-source-record.v1.json`,
    sourceRecordId: packet.source.recordId,
    sourceHash: packet.source.sourceHash,
    resultHash: packet.resultHash,
    protocolHash: packet.protocolHash,
    taxonomy: packet.source.taxonomy,
    sourceSpec: {
      path: candidate.declaration.specPath,
      sha256: sha256Bytes(candidate.specBytes),
    },
    catalogRecord: {
      path: candidate.declaration.recordPath,
      sha256: sha256Bytes(candidate.recordBytes),
    },
    gates: packet.reducedMeasures.validity,
    producerStatus: packet.status,
    rootCount,
    noRootCount,
    eventMeasures: packet.reducedMeasures.events.map((event) => ({
      ...event,
      probeResponses: event.probeResponses.map((response) => ({
        ...response,
        accelerationMagnitude: accelerationMagnitude(response.acceleration),
      })),
    })),
    prescribedPeriodClosure: packet.reducedMeasures.prescribedPeriodClosure,
    minimumSeparation: packet.reducedMeasures.minimumSeparation,
    rootTransversalityMargin: packet.reducedMeasures.rootTransversalityMargin,
    numericalConvergence: packet.reducedMeasures.numericalConvergence,
  };
}

export function buildAllCandidateAnalyticalCampaign(registryPath) {
  const loaded = loadAllCandidateCampaignRegistry(registryPath);
  const { registry, protocol } = loaded;
  const cases = [];
  const artifacts = [];
  const manifestCases = [];
  for (const candidate of loaded.candidates) {
    if (candidate.spec.prescribedReturnPeriod !== protocol.returnWindow.period ||
        protocol.history.start < candidate.spec.recordInterval.start ||
        protocol.history.end > candidate.spec.recordInterval.end) {
      fail(`candidate ${candidate.declaration.candidateId} does not support the registry protocol span.`);
    }
    const exactSource = validateExactPrescribedSourceRecord(
      createPrescribedBraidExactSourceRecord(candidate.spec, {
        sourceHash: sha256Bytes(candidate.specBytes),
        generatingSpec: candidate.declaration.specPath,
      }),
    );
    const packet = evaluatePrescribedRecordAnalysis({
      sourceRecord: exactSource,
      protocol,
    });
    const exactSourceBytes = prettyJsonBytes(exactSource);
    const packetBytes = prettyJsonBytes(packet);
    const row = summaryCase(candidate, packet);
    row.exactSourceArtifactSha256 = sha256Bytes(exactSourceBytes);
    cases.push(row);
    manifestCases.push({
      caseId: row.caseId,
      caseType: row.caseType,
      familyId: candidate.declaration.familyId,
      memberId: candidate.declaration.memberId,
      specPath: candidate.declaration.specPath,
      specSha256: sha256Bytes(candidate.specBytes),
      catalogRecordPath: candidate.declaration.recordPath,
      catalogRecordSha256: sha256Bytes(candidate.recordBytes),
    });
    artifacts.push({ relativePath: row.packetPath, bytes: packetBytes });
    artifacts.push({ relativePath: row.exactSourceRecordPath, bytes: exactSourceBytes });
  }

  const acceptancePolicy = {
    id: "complete-candidate-inventory/fail-closed.v1",
    requiredTotalCaseCount: cases.length,
    requiredAnchorCount: 0,
    requiredSeededSampleCount: 0,
    requiredGates: REQUIRED_GATE_IDS,
    candidateValidityDisposition: "retain-complete-rejected-cases",
    failureDisposition: "reject-incomplete-generation-and-publish-no-database",
  };
  const manifest = {
    schema: ALL_CANDIDATE_CAMPAIGN_MANIFEST_SCHEMA,
    campaignId: registry.generatedCampaign.campaignId,
    campaignStage: registry.generatedCampaign.campaignStage,
    registry: {
      registryId: registry.registryId,
      registryHash: loaded.registryHash,
    },
    catalog: {
      catalogId: registry.catalogId,
      catalogHash: loaded.catalogHash,
    },
    commonProtocol: {
      path: relativeRepositoryPath(loaded.protocolPath),
      sourceFileSha256: sha256Bytes(loaded.protocolBytes),
      protocolHash: loaded.protocolHash,
    },
    cases: manifestCases,
    implementedMeasures: IMPLEMENTED_MEASURES,
    acceptancePolicy,
    outputs: {
      directory: ".",
      packetDirectory: "packets",
      summaryFilename: "all-candidate-campaign.summary.v1.json",
    },
  };
  const manifestHash = sha256Canonical(manifest);
  const acceptedCount = cases.filter((row) => row.gates.passed).length;
  const summaryWithoutHash = {
    schema: ALL_CANDIDATE_CAMPAIGN_SUMMARY_SCHEMA,
    campaignId: manifest.campaignId,
    manifestHash,
    registry: manifest.registry,
    catalog: manifest.catalog,
    commonProtocol: manifest.commonProtocol,
    caseCounts: {
      total: cases.length,
      complete: cases.length,
      independentlyAccepted: acceptedCount,
      independentlyRejected: cases.length - acceptedCount,
    },
    cases,
    acceptance: {
      policy: acceptancePolicy,
      accepted: true,
      completeCaseCount: cases.length,
      acceptedCaseCount: acceptedCount,
      rejectedCaseCount: cases.length - acceptedCount,
    },
    status: {
      code: "ok",
      severity: "ok",
      message: "all registered prescribed braid candidates were evaluated",
    },
    claimBoundary: {
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: ["stability", "energy", "retention", "physical-realization"],
    },
  };
  const summary = {
    ...summaryWithoutHash,
    summaryHash: sha256Canonical(summaryWithoutHash),
  };
  const manifestBytes = prettyJsonBytes(manifest);
  const summaryBytes = prettyJsonBytes(summary);
  return {
    ...loaded,
    manifest,
    manifestHash,
    manifestBytes,
    summary,
    summaryBytes,
    artifacts,
    acceptedCandidateCount: acceptedCount,
    rejectedCandidateCount: cases.length - acceptedCount,
  };
}

export function writeAllCandidateAnalyticalCampaign(campaign, outputDirectory) {
  const absoluteOutputDirectory = path.resolve(outputDirectory);
  const write = (relativePath, bytes) => {
    const absolutePath = path.resolve(absoluteOutputDirectory, relativePath);
    if (!absolutePath.startsWith(`${absoluteOutputDirectory}${path.sep}`)) {
      fail(`campaign output ${relativePath} escapes its staging directory.`);
    }
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, bytes);
  };
  write("all-candidate-campaign.manifest.v1.json", campaign.manifestBytes);
  write(campaign.manifest.outputs.summaryFilename, campaign.summaryBytes);
  for (const artifact of campaign.artifacts) write(artifact.relativePath, artifact.bytes);
  return {
    manifestPath: path.join(
      absoluteOutputDirectory,
      "all-candidate-campaign.manifest.v1.json",
    ),
    summaryPath: path.join(
      absoluteOutputDirectory,
      campaign.manifest.outputs.summaryFilename,
    ),
    packetDirectory: path.join(absoluteOutputDirectory, "packets"),
  };
}
