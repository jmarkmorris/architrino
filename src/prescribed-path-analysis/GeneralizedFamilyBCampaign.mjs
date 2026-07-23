import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

import {
  canonicalJson,
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
  evaluateCompleteCycleCandidate,
} from "./CompleteCycleAnalyticalCampaign.mjs";
import {
  GENERALIZED_FAMILY_B_SPACING_SENSITIVITY_ADAPTER,
  createGeneralizedFamilyBPilotInventory,
} from "./GeneralizedFamilyBPilot.mjs";

export const GENERALIZED_FAMILY_B_CAMPAIGN_REDUCER_VERSION =
  "prescribed-record-analytics/generalized-family-b-pilot-reducer/v1";
export const GENERALIZED_FAMILY_B_CAMPAIGN_ID =
  "generalized-family-b-prescribed-train-pilot.v1";

const MANIFEST_SCHEMA = "prescribed-path-analysis/all-candidate-campaign-manifest.v1";
const SUMMARY_SCHEMA = "prescribed-path-analysis/all-candidate-campaign-summary.v1";
const COMPLETE_CYCLE_REQUIRED_GATES = Object.freeze([
  "surfaceQuadrature",
  "fixedInternalPrimary",
  "fixedInternalRefined",
  "movingReceiverPrimary",
  "movingReceiverRefined",
  "branchContinuity",
  "sourceSensitivity",
]);
const RESIDUAL_CONVERGENCE_THRESHOLD = 0.02;

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function prettyBytes(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function residualSummary(reduction) {
  const projections = ["axial", "radial", "tangential"];
  const byProjection = {};
  for (const projection of projections) {
    const rows = reduction.receivers.map((receiver) => ({
      sourceId: receiver.sourceId,
      ...receiver.residualProjections[projection],
    }));
    byProjection[projection] = {
      maximumReceiverRms: Math.max(...rows.map((row) => row.rms)),
      maximumPointwiseAbsolute: Math.max(...rows.map((row) => row.maximumAbsolute)),
      maximumSignedCycleAverageAbsolute: Math.max(
        ...rows.map((row) => Math.abs(row.signedCycleAverage)),
      ),
      receivers: rows,
    };
  }
  return byProjection;
}

function compareResidualSummaries(primary, refined) {
  const entries = [];
  for (const projection of ["axial", "radial", "tangential"]) {
    for (const measure of [
      "maximumReceiverRms",
      "maximumPointwiseAbsolute",
      "maximumSignedCycleAverageAbsolute",
    ]) {
      const primaryValue = primary[projection][measure];
      const refinedValue = refined[projection][measure];
      const relativeOrAbsolute = Math.abs(refinedValue - primaryValue) /
        Math.max(1, Math.abs(primaryValue), Math.abs(refinedValue));
      entries.push({
        projection,
        measure,
        primary: primaryValue,
        refined: refinedValue,
        relativeOrAbsolute,
      });
    }
  }
  const maximumChange = Math.max(...entries.map((row) => row.relativeOrAbsolute));
  return {
    comparison: "absolute-change-normalized-by-max(1,abs(primary),abs(refined)).v1",
    threshold: RESIDUAL_CONVERGENCE_THRESHOLD,
    maximumChange,
    passed: maximumChange <= RESIDUAL_CONVERGENCE_THRESHOLD,
    entries,
  };
}

function vectorCross(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function axialAngularMomentumDiagnostic(reduction, sourceRecord, period) {
  const axis = sourceRecord.parameterVector.frame.n;
  const sourceById = new Map(sourceRecord.sources.map((source) => [source.id, source]));
  const eventCount = Math.min(...reduction.receivers.map((row) => row.events.length));
  const rows = [];
  let wakeAxialPerUnitMu = 0;
  for (let timeIndex = 0; timeIndex < eventCount; timeIndex += 1) {
    let mechanical = 0;
    let torque = 0;
    let time = null;
    for (const receiver of reduction.receivers) {
      const event = receiver.events[timeIndex];
      const source = sourceById.get(receiver.sourceId);
      time = event.observationTime;
      mechanical += dot(
        vectorCross(event.receiverPosition, event.receiverVelocity),
        axis,
      );
      torque += dot(
        vectorCross(event.receiverPosition, event.netAccelerationFromOtherSources),
        axis,
      );
      if (!source) throw new Error(`missing source ${receiver.sourceId}.`);
    }
    if (timeIndex > 0) {
      wakeAxialPerUnitMu -= torque * period / eventCount;
    }
    rows.push({
      time,
      mechanicalAxialPerUnitMu: mechanical,
      wakeAxialPerUnitMu,
      totalAxialPerUnitMu: mechanical + wakeAxialPerUnitMu,
      torqueAxialPerUnitMu: torque,
    });
  }
  const totals = rows.map((row) => row.totalAxialPerUnitMu);
  const mean = totals.reduce((sum, value) => sum + value, 0) / totals.length;
  return {
    definition:
      "per-unit-mu_arch particle mechanical axial term plus integrated declared-source axial torque with zero wake datum at the cycle start",
    grade: "diagnostic-only",
    conservationClaim: false,
    insertedH: false,
    insertedHbar: false,
    rows,
    cycle: {
      mean,
      rmsAboutMean: Math.sqrt(
        totals.reduce((sum, value) => sum + (value - mean) ** 2, 0) / totals.length,
      ),
      startToLastSampleChange: totals.at(-1) - totals[0],
    },
    falsifier:
      "Reject any organization inference if the primary/refined diagnostics disagree, a separately authored reducer disagrees, or held-out samples erase the pattern.",
  };
}

function rootMargin(reduction) {
  const margins = reduction.receivers.flatMap((receiver) =>
    receiver.events.flatMap((event) =>
      event.roots.map((root) => Math.abs(root.transmitterSideFactorDt))));
  return Math.min(...margins);
}

function exteriorSummary(packet) {
  const surfaces = packet.diagnosticReductions.surface.surface.primary;
  const outer = surfaces.reduce(
    (best, row) => !best || row.radius > best.radius ? row : best,
    null,
  );
  const positive = outer.exposures.find((row) => row.probePolarity === 1);
  return {
    enclosingRadius: outer.radius,
    L_ext: positive.L_ext,
    L_raw: positive.L_raw,
    eta_ext: positive.eta_ext,
    peakExteriorResponse: positive.peak,
    wakeFluxSignedCycleIntegral: outer.wakeFlux.signedCycleIntegral,
    wakeFluxResidualCycleIntegral: outer.wakeFlux.residualCycleIntegral,
    wakeFluxEta: outer.wakeFlux.etaWakeFlux,
    anisotropy: outer.angularChannels,
  };
}

function augmentGeneralizedPacket(packet, sourceRecord) {
  const primaryReduction =
    packet.diagnosticReductions.internalReceivers.primary.reduction;
  const refinedReduction =
    packet.diagnosticReductions.internalReceivers.refined.reduction;
  const primaryResidual = residualSummary(primaryReduction);
  const refinedResidual = residualSummary(refinedReduction);
  const convergence = compareResidualSummaries(primaryResidual, refinedResidual);
  const completeInventory = primaryReduction.completeDeclaredSourceInventory &&
    refinedReduction.completeDeclaredSourceInventory;
  const generalized = {
    schema: "prescribed-path-analysis/generalized-family-b-reduction.v1",
    reducerVersion: GENERALIZED_FAMILY_B_CAMPAIGN_REDUCER_VERSION,
    coordinateDefinition: sourceRecord.parameterVector.coordinateDefinition,
    binaryCounterpartMap: sourceRecord.parameterVector.binaryCounterpartMap,
    payloadPairingMap: sourceRecord.parameterVector.payloadPairingMap,
    payloadDefinition: sourceRecord.parameterVector.payloadDefinition,
    residuals: {
      primary: primaryResidual,
      refined: refinedResidual,
      convergence,
      completeDeclaredSourceInventory: completeInventory,
      omittedContributions: primaryReduction.omittedContributions,
    },
    minimumRootTransversalityMargin: {
      primary: rootMargin(primaryReduction),
      refined: rootMargin(refinedReduction),
    },
    exterior: exteriorSummary(packet),
    hingeDiagnostic: {
      status: "rejected-insufficient-coordinate-jacobian",
      grade: "diagnostic-only",
      reason:
        "the bounded pilot differentiates one grouped spacing coordinate and cannot establish a coordinate-robust orbital, binary, adjacent-pair, or payload hinge",
      arbitraryOrderingUsed: false,
    },
    actionDiagnostic: {
      status: "not-computed",
      reason:
        "no independently accepted particle-plus-wake action reducer is present in the prescribed-path stack",
      insertedH: false,
    },
    axialAngularMomentumDiagnostic: {
      primary: axialAngularMomentumDiagnostic(
        primaryReduction,
        sourceRecord,
        packet.completeCycleProtocol.completeCycle.period,
      ),
      refined: axialAngularMomentumDiagnostic(
        refinedReduction,
        sourceRecord,
        packet.completeCycleProtocol.completeCycle.period,
      ),
    },
    excludedClaims: [
      "stability",
      "self-stabilization",
      "retention",
      "binding",
      "photon-identity",
      "energy-closure",
      "quantization",
      "physical-realization",
      "EOM-solver-compatibility",
    ],
  };
  const modified = structuredClone(packet);
  delete modified.resultHash;
  modified.reducer.generalizedFamilyBReducer =
    GENERALIZED_FAMILY_B_CAMPAIGN_REDUCER_VERSION;
  modified.diagnosticReductions.generalizedFamilyB = generalized;
  modified.convergenceComparisons.generalizedFamilyBResiduals = convergence;
  modified.gates.sourceSensitivity = modified.gates.sourceSensitivity &&
    convergence.passed && completeInventory;
  const accepted = Object.values(modified.gates).every(Boolean);
  modified.status = {
    code: accepted ? "ok" : "complete-cycle-gate-failed",
    accepted,
    disposition: accepted ? "accepted" : "diagnostic-only",
    failedGates: Object.entries(modified.gates)
      .filter(([, passed]) => !passed)
      .map(([gateId]) => gateId),
  };
  if (!accepted) modified.reducedMeasures = null;
  else modified.reducedMeasures.generalizedFamilyB = generalized;
  modified.methodologyBoundary.generalizedFamilyB =
    "complete over the declared core-plus-payload source inventory only; no path evolution, Noether-sea closure, stability, retention, photon, or quantization inference";
  return { ...modified, resultHash: sha256Canonical(modified) };
}

function createRawArtifactWriter(outputDirectory, inventory, candidateId) {
  return (value, context) => {
    const rawBytes = prettyBytes(value);
    const compressedBytes = gzipSync(rawBytes, { level: 6, mtime: 0 });
    const rawSha256 = sha256Bytes(rawBytes);
    const compressedSha256 = sha256Bytes(compressedBytes);
    const relativePath = `raw/${compressedSha256}.json.gz`;
    const absolutePath = path.join(outputDirectory, relativePath);
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, compressedBytes);
    const descriptor = {
      artifactKind: context?.artifactKind ?? "raw-analytical-result-packet",
      mediaType: "application/json",
      path: relativePath,
      codec: "gzip",
      rawSha256,
      compressedSha256,
      rawBytes: rawBytes.length,
      storedBytes: compressedBytes.length,
      candidateId,
      context: structuredClone(context),
    };
    inventory.set(compressedSha256, descriptor);
    return descriptor;
  };
}

function compactMeasures(packet) {
  const generalized = packet.diagnosticReductions.generalizedFamilyB;
  return {
    residuals: generalized.residuals.primary,
    residualConvergence: generalized.residuals.convergence,
    minimumRootTransversalityMargin:
      generalized.minimumRootTransversalityMargin.primary,
    exterior: generalized.exterior,
    hingeDiagnostic: generalized.hingeDiagnostic,
    angularMomentum: {
      primary: generalized.axialAngularMomentumDiagnostic.primary.cycle,
      refined: generalized.axialAngularMomentumDiagnostic.refined.cycle,
    },
  };
}

export function buildGeneralizedFamilyBPilotCampaign({
  outputDirectory,
  protocolPath,
  seed = 20210102,
  includeNeighborhoodSamples = true,
  onProgress = null,
} = {}) {
  const absoluteOutput = path.resolve(outputDirectory);
  mkdirSync(absoluteOutput, { recursive: true });
  const protocolBytes = readFileSync(path.resolve(protocolPath));
  const protocol = JSON.parse(protocolBytes.toString("utf8"));
  const protocolHash = sha256Canonical(protocol);
  const inventory = createGeneralizedFamilyBPilotInventory({
    seed,
    includeNeighborhoodSamples,
  });
  const rawArtifactInventory = new Map();
  const cases = [];
  const manifestCases = [];
  const runtime = [];
  for (let index = 0; index < inventory.length; index += 1) {
    const row = inventory[index];
    const startedAt = Date.now();
    const onRawPacket = createRawArtifactWriter(
      absoluteOutput,
      rawArtifactInventory,
      row.spec.specId,
    );
    onProgress?.({
      stage: "candidate-start",
      candidateId: row.spec.specId,
      completedCandidates: index,
      totalCandidates: inventory.length,
    });
    const packet = augmentGeneralizedPacket(
      evaluateCompleteCycleCandidate({
        candidateId: row.spec.specId,
        sourceRecord: row.sourceRecord,
        sourceSpec: row.spec,
        completeCycleProtocol: protocol,
        onRawPacket,
        sensitivityAdapter: GENERALIZED_FAMILY_B_SPACING_SENSITIVITY_ADAPTER,
        onProgress(progress) {
          onProgress?.({
            ...progress,
            completedCandidates: index,
            totalCandidates: inventory.length,
          });
        },
      }),
      row.sourceRecord,
    );
    const packetRelativePath = `packets/${row.spec.specId}.complete-cycle-result.v1.json`;
    const sourceRelativePath = `exact-sources/${row.spec.specId}.exact-source-record.v1.json`;
    const specRelativePath = `specs/${row.spec.specId}.generalized-family-b-spec.v1.json`;
    const packetBytes = prettyBytes(packet);
    const sourceBytes = prettyBytes(row.sourceRecord);
    const specBytes = prettyBytes(row.spec);
    for (const [relativePath, bytes] of [
      [packetRelativePath, packetBytes],
      [sourceRelativePath, sourceBytes],
      [specRelativePath, specBytes],
    ]) {
      const absolutePath = path.join(absoluteOutput, relativePath);
      mkdirSync(path.dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, bytes);
    }
    const caseRow = {
      caseId: row.spec.specId,
      label: row.spec.label,
      caseType: row.caseType,
      familyId: "B",
      memberId: row.sourceRecord.taxonomy.memberId,
      seed: row.seed ?? null,
      packetPath: packetRelativePath,
      exactSourceRecordPath: sourceRelativePath,
      sourceRecordId: row.sourceRecord.recordId,
      sourceHash: packet.source.sourceHash,
      resultHash: packet.resultHash,
      protocolHash: packet.completeCycleProtocolHash,
      taxonomy: row.sourceRecord.taxonomy,
      acceptanceState: packet.status.accepted ? "accepted" : "rejected",
      failedGates: packet.status.failedGates,
      gates: packet.gates,
      measures: [],
      generalizedMeasures: compactMeasures(packet),
      sourceSpec: {
        path: specRelativePath,
        sha256: sha256Bytes(specBytes),
      },
      exactSourceArtifactSha256: sha256Bytes(sourceBytes),
      rawArtifactCount: packet.rawArtifactInventory.length,
    };
    cases.push(caseRow);
    manifestCases.push({
      caseId: caseRow.caseId,
      caseType: caseRow.caseType,
      familyId: caseRow.familyId,
      memberId: caseRow.memberId,
      specPath: specRelativePath,
      specSha256: caseRow.sourceSpec.sha256,
      sourceHash: caseRow.sourceHash,
      resultHash: caseRow.resultHash,
      acceptanceState: caseRow.acceptanceState,
      failedGates: caseRow.failedGates,
    });
    runtime.push({
      candidateId: row.spec.specId,
      wallSeconds: (Date.now() - startedAt) / 1000,
    });
    onProgress?.({
      stage: "candidate-complete",
      candidateId: row.spec.specId,
      accepted: packet.status.accepted,
      completedCandidates: index + 1,
      totalCandidates: inventory.length,
    });
  }
  const acceptancePolicy = {
    id: "complete-cycle-candidate-inventory/fail-closed.v1",
    requiredTotalCaseCount: cases.length,
    requiredAnchorCount: 0,
    requiredSeededSampleCount: 0,
    requiredGates: COMPLETE_CYCLE_REQUIRED_GATES,
    candidateValidityDisposition: "retain-complete-rejected-cases-as-diagnostic-only",
    failureDisposition: "reject-incomplete-generation-and-publish-no-database",
  };
  const manifest = {
    schema: MANIFEST_SCHEMA,
    campaignId: GENERALIZED_FAMILY_B_CAMPAIGN_ID,
    campaignStage: "generalized-family-b-complete-cycle-prescribed-path-pilot",
    registry: {
      registryId: "generalized-family-b-pilot.v1",
      registryHash: sha256Canonical({
        caseIds: cases.map((row) => row.caseId),
        seed,
      }),
    },
    catalog: {
      catalogId: "operator-directed-generalized-family-b-pilot.v1",
      catalogHash: sha256Canonical(manifestCases),
    },
    commonProtocol: {
      path: path.relative(process.cwd(), path.resolve(protocolPath)),
      sourceFileSha256: sha256Bytes(protocolBytes),
      protocolHash,
    },
    reducer: {
      version: GENERALIZED_FAMILY_B_CAMPAIGN_REDUCER_VERSION,
      baseVersion: COMPLETE_CYCLE_CAMPAIGN_REDUCER_VERSION,
    },
    cases: manifestCases,
    implementedMeasures: [
      "root-completeness",
      "root-transversality",
      "minimum-separation",
      "axial-radial-tangential-complete-cycle-residuals",
      "external-acceleration-response-exposure",
      "causal-wake-flux-cancellation",
      "anisotropy",
      "spacing-sensitivity",
      "diagnostic-particle-plus-wake-axial-angular-momentum",
    ],
    rawArtifacts: [...rawArtifactInventory.values()].sort(
      (left, right) => left.compressedSha256.localeCompare(right.compressedSha256),
    ),
    acceptancePolicy,
    outputs: {
      directory: ".",
      packetDirectory: "packets",
      summaryFilename: "generalized-family-b-pilot.summary.v1.json",
    },
  };
  const manifestHash = sha256Canonical(manifest);
  const acceptedCount = cases.filter((row) => row.acceptanceState === "accepted").length;
  const summaryWithoutHash = {
    schema: SUMMARY_SCHEMA,
    campaignId: manifest.campaignId,
    manifestHash,
    registry: manifest.registry,
    catalog: manifest.catalog,
    commonProtocol: manifest.commonProtocol,
    reducer: manifest.reducer,
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
    runtimeProfile: {
      grade: "measured",
      totalWallSeconds: runtime.reduce((sum, row) => sum + row.wallSeconds, 0),
      candidates: runtime,
    },
    status: {
      code: "ok",
      severity: "ok",
      message:
        "every bounded generalized Family-B pilot row received complete-cycle prescribed-path analysis",
    },
    claimBoundary: {
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: [
        "stability",
        "self-stabilization",
        "retention",
        "binding",
        "photon-identity",
        "energy-closure",
        "quantization",
        "physical-realization",
        "EOM-solver-compatibility",
      ],
    },
  };
  const summary = {
    ...summaryWithoutHash,
    summaryHash: sha256Canonical(summaryWithoutHash),
  };
  const manifestBytes = prettyBytes(manifest);
  const summaryBytes = prettyBytes(summary);
  const manifestPath = path.join(
    absoluteOutput,
    "generalized-family-b-pilot.manifest.v1.json",
  );
  const summaryPath = path.join(absoluteOutput, manifest.outputs.summaryFilename);
  writeFileSync(manifestPath, manifestBytes);
  writeFileSync(summaryPath, summaryBytes);
  return {
    manifest,
    manifestHash,
    manifestPath,
    summary,
    summaryPath,
    packetDirectory: path.join(absoluteOutput, "packets"),
    outputDirectory: absoluteOutput,
    report: compareGeneralizedFamilyBPilotCases(cases),
  };
}

function dominates(left, right) {
  const leftVector = [
    left.generalizedMeasures.residuals.axial.maximumReceiverRms,
    left.generalizedMeasures.residuals.radial.maximumReceiverRms,
    left.generalizedMeasures.residuals.tangential.maximumReceiverRms,
    left.generalizedMeasures.exterior.eta_ext,
    left.generalizedMeasures.exterior.wakeFluxEta,
  ];
  const rightVector = [
    right.generalizedMeasures.residuals.axial.maximumReceiverRms,
    right.generalizedMeasures.residuals.radial.maximumReceiverRms,
    right.generalizedMeasures.residuals.tangential.maximumReceiverRms,
    right.generalizedMeasures.exterior.eta_ext,
    right.generalizedMeasures.exterior.wakeFluxEta,
  ];
  return leftVector.every((value, index) => value <= rightVector[index]) &&
    leftVector.some((value, index) => value < rightVector[index]);
}

function matchedPayloadBenefit(cases) {
  const withoutPayload = cases.find(
    (row) => row.caseId === "generalized-b-dual-central-no-payload",
  );
  const withPayload = cases.find(
    (row) => row.caseId === "generalized-b-dual-central-six-payload",
  );
  if (!withoutPayload || !withPayload) return null;
  const measures = [
    ["axialResidualRms",
      (row) => row.generalizedMeasures.residuals.axial.maximumReceiverRms],
    ["radialResidualRms",
      (row) => row.generalizedMeasures.residuals.radial.maximumReceiverRms],
    ["tangentialResidualRms",
      (row) => row.generalizedMeasures.residuals.tangential.maximumReceiverRms],
    ["minimumRootTransversalityMargin",
      (row) => row.generalizedMeasures.minimumRootTransversalityMargin],
    ["exteriorEta", (row) => row.generalizedMeasures.exterior.eta_ext],
    ["wakeFluxEta", (row) => row.generalizedMeasures.exterior.wakeFluxEta],
  ];
  return {
    definition: "six-payload row minus its exact matching no-payload reference",
    rows: measures.map(([measureId, extract]) => ({
      measureId,
      noPayload: extract(withoutPayload),
      sixPayload: extract(withPayload),
      delta: extract(withPayload) - extract(withoutPayload),
    })),
  };
}

export function compareGeneralizedFamilyBPilotCases(cases) {
  const nondominated = cases.filter(
    (candidate) => !cases.some(
      (other) => other.caseId !== candidate.caseId && dominates(other, candidate),
    ),
  ).map((row) => row.caseId);
  return {
    schema: "prescribed-path-analysis/generalized-family-b-pilot-report.v1",
    claimGrade: "measured",
    candidateCount: cases.length,
    acceptedCount: cases.filter((row) => row.acceptanceState === "accepted").length,
    rejectedCount: cases.filter((row) => row.acceptanceState === "rejected").length,
    nondominatedDiagnosticCaseIds: nondominated,
    payloadBenefit: matchedPayloadBenefit(cases),
    cases: cases.map((row) => ({
      caseId: row.caseId,
      caseType: row.caseType,
      acceptanceState: row.acceptanceState,
      failedGates: row.failedGates,
      objectiveVector: {
        rootMargin: row.generalizedMeasures.minimumRootTransversalityMargin,
        axialResidualRms: row.generalizedMeasures.residuals.axial.maximumReceiverRms,
        radialResidualRms: row.generalizedMeasures.residuals.radial.maximumReceiverRms,
        tangentialResidualRms:
          row.generalizedMeasures.residuals.tangential.maximumReceiverRms,
        exteriorEta: row.generalizedMeasures.exterior.eta_ext,
        wakeFluxEta: row.generalizedMeasures.exterior.wakeFluxEta,
      },
    })),
    falsifiers: {
      spacingDependentWakeBalance:
        "falsified on the declared pilot domain if spacing perturbations fail convergence or no finite-width neighborhood improves every required residual projection",
      payloadBenefit:
        "falsified if the exact matched six-payload minus no-payload vector does not improve a predeclared objective without degrading another required gate",
      hinge:
        "not testable until a full coordinate Jacobian survives refinement and reparameterization",
      actionOrAngularMomentumOrganization:
        "falsified if primary/refined or independently authored reducers disagree, or held-out samples erase the apparent organization",
    },
    claimBoundary:
      "non-dominated means only that no sampled row is componentwise better in the declared analytical objective subset; it is not stability, retention, binding, photon identity, energy closure, quantization, or physical realization",
  };
}

export function serializeGeneralizedFamilyBPilotReport(report) {
  return `${canonicalJson(report)}\n`;
}
