import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

import {
  BORG_BRAID_RECORD_CATALOG,
  BORG_BRAID_RECORD_CATALOG_ID,
} from "../apps/borg/BorgBraidRecordCatalog.js";
import {
  ACTIVE_PRESCRIBED_BRAID_TARGETS,
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";
import {
  canonicalJson,
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
  validatePrescribedRecordAnalysisProtocol,
} from "./AnalyticalBraidEvaluator.mjs";
import { validateB1CompleteCycleProbeProtocol } from "./B1CompleteCycleProbeProtocol.mjs";
import {
  COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
  evaluateCompleteCycleCandidate,
} from "./CompleteCycleAnalyticalCampaign.mjs";
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
  "root-topology-ledger",
  "internal-receiver-wake-and-acceleration",
  "partial-prescribed-path-equation-mismatch",
  "external-exposure",
  "complete-cycle-normal-causal-wake-flux",
  "frequency-resolved-normal-wake-flux",
  "angular-ledger-and-anisotropy",
  "branch-spatial-gradient-and-temporal-variation",
  "spectral-ledger",
  "radial-scaling",
  "declared-source-coordinate-sensitivity",
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
  return new Map(ACTIVE_PRESCRIBED_BRAID_TARGETS.map((target) => [
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
    if (candidate.familyId === "B" &&
        !spec.braids.some((braid) => braid.binaries.some(
          (binary) => binary.transverseOrbitRadius > 0,
        ))) {
      fail(
        `active Family-B candidate ${candidate.candidateId} requires ` +
        "nonzero transverse internal motion.",
      );
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

export function validateMethodologyCoverageContract(coverage, methodologyBytes) {
  if (coverage.schema !== "prescribed-path-analysis/analytical-measure-coverage.v1" ||
      !Number.isSafeInteger(coverage.requiredMeasureCount) ||
      coverage.requiredMeasureCount < 1 ||
      !Array.isArray(coverage.measures) ||
      coverage.measures.length !== coverage.requiredMeasureCount) {
    fail("analytical methodology coverage contract is incomplete.");
  }
  const methodologySha256 = sha256Bytes(methodologyBytes);
  if (methodologySha256 !== coverage.methodology.sha256 ||
      coverage.methodology.impactReview !== "reviewed-for-complete-cycle-campaign-v1") {
    fail(
      `methodology hash ${methodologySha256} requires an explicit analytical coverage impact review.`,
    );
  }
  const requiredFields = [
    "measureId", "obligation", "methodologyLocation", "requiredFields",
    "applicability", "producer", "resultPacketLocation", "sqliteProjection",
    "validityGates", "convergence", "independentEvidence", "status",
    "publicationDisposition",
  ];
  const ids = new Set();
  for (const measure of coverage.measures) {
    if (requiredFields.some((field) => measure[field] == null) ||
        !coverage.allowedStatuses.includes(measure.status) ||
        ids.has(measure.measureId)) {
      fail(`analytical coverage row ${measure.measureId ?? "unknown"} is incomplete or duplicated.`);
    }
    ids.add(measure.measureId);
  }
  return { methodologySha256, measureIds: [...ids] };
}

function loadMethodologyCoverage(registry) {
  const coveragePath = resolveRepositoryPath(
    registry.generatedCampaign.methodologyCoveragePath,
    "generatedCampaign.methodologyCoveragePath",
  );
  const coverageBytes = readFileSync(coveragePath);
  const coverage = JSON.parse(coverageBytes.toString("utf8"));
  const methodologyPath = resolveRepositoryPath(
    coverage.methodology?.path,
    "coverage.methodology.path",
  );
  const methodologyBytes = readFileSync(methodologyPath);
  const { methodologySha256 } = validateMethodologyCoverageContract(
    coverage,
    methodologyBytes,
  );
  return {
    coveragePath,
    coverageBytes,
    coverage,
    coverageHash: sha256Canonical(coverage),
    methodologyPath,
    methodologySha256,
  };
}

export function loadAllCandidateCampaignRegistry(
  registryPath = DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
) {
  const absolutePath = path.resolve(registryPath);
  const bytes = readFileSync(absolutePath);
  const registry = validateRegistryShape(JSON.parse(bytes.toString("utf8")));
  const candidates = validateCandidateInventory(registry);
  const checkedCampaigns = validateDeclaredCampaignInventory(registry);
  const methodologyCoverage = loadMethodologyCoverage(registry);
  const protocolPath = resolveRepositoryPath(
    registry.generatedCampaign.protocolPath,
    "generatedCampaign.protocolPath",
  );
  const protocolBytes = readFileSync(protocolPath);
  const parsedProtocol = JSON.parse(protocolBytes.toString("utf8"));
  const protocol = parsedProtocol.schema ===
    "prescribed-path-analysis/analysis-protocol.v1"
    ? validatePrescribedRecordAnalysisProtocol(parsedProtocol)
    : validateB1CompleteCycleProbeProtocol(parsedProtocol);
  return {
    registryPath: absolutePath,
    registryBytes: bytes,
    registry,
    registryHash: sha256Canonical(registry),
    catalogHash: sha256Canonical(BORG_BRAID_RECORD_CATALOG),
    candidates,
    checkedCampaigns,
    ...methodologyCoverage,
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

export function buildAllCandidateAnalyticalCampaign(registryPath, options = {}) {
  if (options.evaluationMode !== "baseline") {
    return buildCompleteCycleAllCandidateCampaign(registryPath, options);
  }
  const loaded = loadAllCandidateCampaignRegistry(registryPath);
  const { registry } = loaded;
  const baselineProtocolPath = path.join(
    REPOSITORY_ROOT,
    "src/prescribed-path-analysis/protocols/all-candidate-small-probe-protocol.v1.json",
  );
  const protocol = validatePrescribedRecordAnalysisProtocol(
    JSON.parse(readFileSync(baselineProtocolPath, "utf8")),
  );
  loaded.protocol = protocol;
  loaded.protocolPath = baselineProtocolPath;
  loaded.protocolBytes = readFileSync(baselineProtocolPath);
  loaded.protocolHash = sha256Canonical(protocol);
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
    methodologyCoverage: {
      path: relativeRepositoryPath(loaded.coveragePath),
      coverageHash: loaded.coverageHash,
      methodologyPath: relativeRepositoryPath(loaded.methodologyPath),
      methodologySha256: loaded.methodologySha256,
      reductionVersions: loaded.coverage.reductionVersions,
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
    methodologyCoverage: manifest.methodologyCoverage,
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

function createCompressedRawArtifactWriter(
  outputDirectory,
  candidateId,
  inventory,
  onArtifact = null,
) {
  const rawDirectory = path.join(outputDirectory, "raw-artifacts");
  mkdirSync(rawDirectory, { recursive: true });
  return (value, context = {}) => {
    const rawBytes = prettyJsonBytes(value);
    const rawSha256 = sha256Bytes(rawBytes);
    const compressedBytes = gzipSync(rawBytes, { level: 6, mtime: 0 });
    const compressedSha256 = sha256Bytes(compressedBytes);
    const relativePath = `raw-artifacts/${compressedSha256}.json.gz`;
    const absolutePath = path.join(outputDirectory, relativePath);
    if (!existsSync(absolutePath)) writeFileSync(absolutePath, compressedBytes);
    const descriptor = {
      artifactKind: context.artifactKind ?? "raw-analytical-result-packet",
      mediaType: "application/json",
      codec: "gzip",
      path: relativePath,
      rawSha256,
      compressedSha256,
      rawBytes: rawBytes.length,
      storedBytes: compressedBytes.length,
      candidateId,
      context,
    };
    inventory.set(compressedSha256, descriptor);
    onArtifact?.(descriptor);
    return descriptor;
  };
}

function compactCompleteCycleMeasures(packet) {
  const surfaces = packet.diagnosticReductions.surface.surface.primary;
  const outer = surfaces.find(
    (row) => row.radius === Math.max(...surfaces.map((candidate) => candidate.radius)),
  );
  const rows = [];
  for (const exposure of outer.exposures) {
    rows.push(
      {
        measureId: "external-exposure/L_ext",
        scalarValue: exposure.L_ext,
        unit: "acceleration-squared-area",
        radius: outer.radius,
        probePolarity: exposure.probePolarity,
      },
      {
        measureId: "external-exposure/L_raw",
        scalarValue: exposure.L_raw,
        unit: "acceleration-squared-area",
        radius: outer.radius,
        probePolarity: exposure.probePolarity,
      },
      {
        measureId: "external-exposure/eta_ext",
        scalarValue: exposure.eta_ext,
        unit: "ratio",
        radius: outer.radius,
        probePolarity: exposure.probePolarity,
      },
    );
  }
  rows.push(
    {
      measureId: "normal-wake-flux/signed-cycle-integral",
      scalarValue: outer.wakeFlux.signedCycleIntegral,
      unit: "source-normalized-wake-crossing",
      radius: outer.radius,
      probePolarity: null,
    },
    {
      measureId: "normal-wake-flux/raw-cycle-integral",
      scalarValue: outer.wakeFlux.rawCycleIntegral,
      unit: "source-normalized-wake-crossing",
      radius: outer.radius,
      probePolarity: null,
    },
    {
      measureId: "normal-wake-flux/residual-cycle-integral",
      scalarValue: outer.wakeFlux.residualCycleIntegral,
      unit: "source-normalized-wake-crossing",
      radius: outer.radius,
      probePolarity: null,
    },
    {
      measureId: "normal-wake-flux/eta",
      scalarValue: outer.wakeFlux.etaWakeFlux,
      unit: "ratio",
      radius: outer.radius,
      probePolarity: null,
    },
  );
  return rows.map((row) => ({
    ...row,
    reductionVersion: COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
    normalization: row.measureId.startsWith("external-exposure")
      ? "cycle-average-centered-sphere.v1"
      : "complete-cycle-centered-sphere.v1",
    numericalUncertainty:
      packet.convergenceComparisons.surface.quadrature.gates.causalWakeFlux.maximumChange,
    disposition: packet.status.accepted ? "accepted" : "diagnostic-only",
  }));
}

function buildCompleteCycleAllCandidateCampaign(registryPath, options) {
  const loaded = loadAllCandidateCampaignRegistry(registryPath);
  const { registry, protocol } = loaded;
  if (protocol.schema !== "prescribed-path-analysis/complete-cycle-probe-protocol.v1") {
    fail("live all-candidate campaign must declare the complete-cycle cohort protocol.");
  }
  const outputDirectory = options.outputDirectory
    ? path.resolve(options.outputDirectory)
    : null;
  if (!outputDirectory) {
    fail("complete-cycle campaign evaluation requires a staging outputDirectory.");
  }
  mkdirSync(outputDirectory, { recursive: true });
  const rawArtifactInventory = new Map();
  const cases = [];
  const artifacts = [];
  const manifestCases = [];
  const startedAt = Date.now();
  const runtimeTimings = [];
  for (const [candidateIndex, candidate] of loaded.candidates.entries()) {
    if (candidate.spec.prescribedReturnPeriod !== protocol.completeCycle.period ||
        protocol.eventEvaluator.history.start < candidate.spec.recordInterval.start ||
        protocol.eventEvaluator.history.end > candidate.spec.recordInterval.end) {
      fail(`candidate ${candidate.declaration.candidateId} does not support the cohort protocol span.`);
    }
    const exactSource = validateExactPrescribedSourceRecord(
      createPrescribedBraidExactSourceRecord(candidate.spec, {
        sourceHash: sha256Bytes(candidate.specBytes),
        generatingSpec: candidate.declaration.specPath,
      }),
    );
    const candidateStartedAt = Date.now();
    let rawCompleted = 0;
    const timeCount = protocol.completeCycle.primary.timeSamples +
      protocol.completeCycle.refined.timeSamples;
    const surfaceArtifactCount = protocol.enclosingSurfaces.radii.length * timeCount;
    const rawTotal = surfaceArtifactCount *
      (options.includeSensitivity === false ? 1 : 5) +
      (options.includeSensitivity === false ? 5 : 13);
    let currentStage = null;
    let stageStartedAt = candidateStartedAt;
    const candidateStageTimings = [];
    const onRawPacket = createCompressedRawArtifactWriter(
      outputDirectory,
      candidate.declaration.candidateId,
      rawArtifactInventory,
      (descriptor) => {
        rawCompleted += 1;
        if (rawCompleted !== 1 && rawCompleted % 12 !== 0 &&
            rawCompleted !== rawTotal) return;
        options.onProgress?.({
          candidateId: candidate.declaration.candidateId,
          stage: descriptor.context.stage,
          radius: descriptor.context.radius ?? null,
          resolution: descriptor.context.resolution ??
            descriptor.context.refinement ?? null,
          batch: descriptor.context.timeIndex ?? null,
          completedWork: rawCompleted,
          totalWork: rawTotal,
          completedCandidates: candidateIndex,
          totalCandidates: loaded.candidates.length,
          wallSeconds: (Date.now() - startedAt) / 1000,
        });
      },
    );
    const packet = evaluateCompleteCycleCandidate({
      candidateId: candidate.declaration.candidateId,
      sourceRecord: exactSource,
      sourceSpec: candidate.spec,
      completeCycleProtocol: protocol,
      includeSensitivity: options.includeSensitivity !== false,
      sourceOptions: {
        sourceHash: sha256Bytes(candidate.specBytes),
        generatingSpec: candidate.declaration.specPath,
      },
      onRawPacket,
      onProgress(progress) {
        const now = Date.now();
        if (currentStage !== null && progress.stage !== currentStage) {
          candidateStageTimings.push({
            candidateId: candidate.declaration.candidateId,
            stage: currentStage,
            wallSeconds: (now - stageStartedAt) / 1000,
          });
          stageStartedAt = now;
        }
        currentStage = progress.stage;
        options.onProgress?.({
          ...progress,
          completedCandidates: candidateIndex,
          totalCandidates: loaded.candidates.length,
          wallSeconds: (Date.now() - startedAt) / 1000,
        });
      },
    });
    const candidateEndedAt = Date.now();
    if (currentStage !== null) {
      candidateStageTimings.push({
        candidateId: candidate.declaration.candidateId,
        stage: currentStage,
        wallSeconds: (candidateEndedAt - stageStartedAt) / 1000,
      });
    }
    runtimeTimings.push(...candidateStageTimings, {
      candidateId: candidate.declaration.candidateId,
      stage: "candidate-total",
      wallSeconds: (candidateEndedAt - candidateStartedAt) / 1000,
    });
    const exactSourceBytes = prettyJsonBytes(exactSource);
    const packetBytes = prettyJsonBytes(packet);
    const packetPath =
      `packets/${candidate.declaration.candidateId}.complete-cycle-result.v1.json`;
    const exactSourceRecordPath =
      `exact-sources/${candidate.declaration.candidateId}.exact-source-record.v1.json`;
    for (const [relativePath, bytes] of [
      [packetPath, packetBytes],
      [exactSourceRecordPath, exactSourceBytes],
    ]) {
      const absolutePath = path.join(outputDirectory, relativePath);
      mkdirSync(path.dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, bytes);
    }
    const row = {
      caseId: candidate.declaration.candidateId,
      label: candidate.catalog.label,
      caseType: "catalog-candidate-complete-cycle",
      familyId: candidate.declaration.familyId,
      memberId: candidate.declaration.memberId,
      packetPath,
      exactSourceRecordPath,
      sourceRecordId: exactSource.recordId,
      sourceHash: packet.source.sourceHash,
      resultHash: packet.resultHash,
      protocolHash: packet.completeCycleProtocolHash,
      taxonomy: exactSource.taxonomy,
      acceptanceState: packet.status.accepted ? "accepted" : "rejected",
      failedGates: packet.status.failedGates,
      gates: packet.gates,
      measures: compactCompleteCycleMeasures(packet),
      sourceSpec: {
        path: candidate.declaration.specPath,
        sha256: sha256Bytes(candidate.specBytes),
      },
      catalogRecord: {
        path: candidate.declaration.recordPath,
        sha256: sha256Bytes(candidate.recordBytes),
      },
      exactSourceArtifactSha256: sha256Bytes(exactSourceBytes),
      rawArtifactCount: packet.rawArtifactInventory.length,
    };
    cases.push(row);
    manifestCases.push({
      caseId: row.caseId,
      caseType: row.caseType,
      familyId: row.familyId,
      memberId: row.memberId,
      specPath: candidate.declaration.specPath,
      specSha256: row.sourceSpec.sha256,
      catalogRecordPath: candidate.declaration.recordPath,
      catalogRecordSha256: row.catalogRecord.sha256,
      sourceHash: row.sourceHash,
      resultHash: row.resultHash,
      acceptanceState: row.acceptanceState,
      failedGates: row.failedGates,
    });
    artifacts.push({
      relativePath: packetPath,
      staged: true,
      sha256: sha256Bytes(packetBytes),
      bytesLength: packetBytes.length,
    });
    artifacts.push({
      relativePath: exactSourceRecordPath,
      staged: true,
      sha256: sha256Bytes(exactSourceBytes),
      bytesLength: exactSourceBytes.length,
    });
    options.onProgress?.({
      candidateId: row.caseId,
      stage: "candidate-retained",
      completedCandidates: candidateIndex + 1,
      totalCandidates: loaded.candidates.length,
      rawArtifactCount: rawArtifactInventory.size,
      wallSeconds: (Date.now() - startedAt) / 1000,
    });
  }
  const acceptancePolicy = {
    id: "complete-cycle-candidate-inventory/fail-closed.v1",
    requiredTotalCaseCount: cases.length,
    requiredAnchorCount: 0,
    requiredSeededSampleCount: 0,
    requiredGates: [
      "surfaceQuadrature",
      "fixedInternalPrimary",
      "fixedInternalRefined",
      "movingReceiverPrimary",
      "movingReceiverRefined",
      "branchContinuity",
      "transmitterSensitivity",
    ],
    candidateValidityDisposition: "retain-complete-rejected-cases-as-diagnostic-only",
    failureDisposition: "reject-incomplete-generation-and-publish-no-database",
  };
  const manifest = {
    schema: ALL_CANDIDATE_CAMPAIGN_MANIFEST_SCHEMA,
    campaignId: registry.generatedCampaign.campaignId,
    campaignStage: "all-candidate-complete-cycle-prescribed-record-analysis",
    registry: { registryId: registry.registryId, registryHash: loaded.registryHash },
    catalog: { catalogId: registry.catalogId, catalogHash: loaded.catalogHash },
    commonProtocol: {
      path: relativeRepositoryPath(loaded.protocolPath),
      sourceFileSha256: sha256Bytes(loaded.protocolBytes),
      protocolHash: loaded.protocolHash,
    },
    reducer: {
      version: COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
    },
    methodologyCoverage: {
      path: relativeRepositoryPath(loaded.coveragePath),
      coverageHash: loaded.coverageHash,
      methodologyPath: relativeRepositoryPath(loaded.methodologyPath),
      methodologySha256: loaded.methodologySha256,
      reductionVersions: loaded.coverage.reductionVersions,
    },
    cases: manifestCases,
    implementedMeasures: IMPLEMENTED_MEASURES,
    rawArtifacts: [...rawArtifactInventory.values()].sort(
      (left, right) => left.compressedSha256.localeCompare(right.compressedSha256),
    ),
    acceptancePolicy,
    outputs: {
      directory: ".",
      packetDirectory: "packets",
      summaryFilename: "all-candidate-campaign.summary.v1.json",
    },
  };
  const manifestHash = sha256Canonical(manifest);
  const acceptedCount = cases.filter((row) => row.acceptanceState === "accepted").length;
  const summaryWithoutHash = {
    schema: ALL_CANDIDATE_CAMPAIGN_SUMMARY_SCHEMA,
    campaignId: manifest.campaignId,
    manifestHash,
    registry: manifest.registry,
    catalog: manifest.catalog,
    commonProtocol: manifest.commonProtocol,
    reducer: manifest.reducer,
    methodologyCoverage: manifest.methodologyCoverage,
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
    rawArtifactCount: rawArtifactInventory.size,
    status: {
      code: "ok",
      severity: "ok",
      message: "all registered prescribed braid candidates received complete-cycle evaluation",
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
  return {
    ...loaded,
    manifest,
    manifestHash,
    manifestBytes: prettyJsonBytes(manifest),
    summary,
    summaryBytes: prettyJsonBytes(summary),
    artifacts,
    rawArtifactInventory: [...rawArtifactInventory.values()],
    acceptedCandidateCount: acceptedCount,
    rejectedCandidateCount: cases.length - acceptedCount,
    runtimeTimings,
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
  for (const artifact of campaign.artifacts) {
    if (!artifact.staged) {
      write(artifact.relativePath, artifact.bytes);
      continue;
    }
    const absolutePath = path.join(absoluteOutputDirectory, artifact.relativePath);
    const bytes = readFileSync(absolutePath);
    if (bytes.length !== artifact.bytesLength || sha256Bytes(bytes) !== artifact.sha256) {
      fail(`staged campaign artifact ${artifact.relativePath} failed byte/hash verification.`);
    }
  }
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
