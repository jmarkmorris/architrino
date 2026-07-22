#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  canonicalJson,
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
  validatePrescribedRecordAnalysisProtocol,
} from "../../src/prescribed-path-analysis/index.mjs";
import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "./generate-prescribed-braid-record.mjs";

export const B1_CAP_ANGLE_CAMPAIGN_MANIFEST_SCHEMA =
  "prescribed-path-analysis/b1-cap-angle-campaign-manifest.v1";
export const B1_CAP_ANGLE_CAMPAIGN_SUMMARY_SCHEMA =
  "prescribed-path-analysis/b1-cap-angle-campaign-summary.v1";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const SCRIPT_DIRECTORY = path.dirname(SCRIPT_PATH);
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "../..");
const REQUIRED_EXCLUDED_CLAIMS = Object.freeze([
  "stability",
  "energy",
  "retention",
  "physical-realization",
]);
const REQUIRED_IMPLEMENTED_MEASURES = Object.freeze([
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

export const DEFAULT_B1_CAP_ANGLE_CAMPAIGN_MANIFEST_PATH = path.resolve(
  REPOSITORY_ROOT,
  "src/prescribed-path-analysis/campaigns/b1-cap-angle-smoke/" +
    "b1-cap-angle-smoke-campaign.manifest.v1.json",
);

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function positiveInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new TypeError(`${label} must be a positive safe integer.`);
  }
  return number;
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) || canonicalJson(actual) !== canonicalJson(expected)) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function resolveRepositoryPath(relativePath, label) {
  const concrete = concreteString(relativePath, label);
  if (path.isAbsolute(concrete)) throw new TypeError(`${label} must be repository-relative.`);
  const resolved = path.resolve(REPOSITORY_ROOT, concrete);
  const rootPrefix = `${REPOSITORY_ROOT}${path.sep}`;
  if (resolved !== REPOSITORY_ROOT && !resolved.startsWith(rootPrefix)) {
    throw new RangeError(`${label} must remain inside the repository.`);
  }
  return resolved;
}

function relativeRepositoryPath(absolutePath) {
  return path.relative(REPOSITORY_ROOT, absolutePath).split(path.sep).join("/");
}

function readBoundJson(binding, label) {
  const absolutePath = resolveRepositoryPath(binding?.path ?? binding?.specPath, `${label}.path`);
  const bytes = fs.readFileSync(absolutePath);
  const actualHash = sha256Bytes(bytes);
  const expectedHash = concreteString(binding.sourceFileSha256, `${label}.sourceFileSha256`);
  if (actualHash !== expectedHash) {
    throw new Error(
      `${label} source hash mismatch: expected ${expectedHash}, received ${actualHash}.`,
    );
  }
  return {
    absolutePath,
    relativePath: relativeRepositoryPath(absolutePath),
    sourceFileSha256: actualHash,
    value: JSON.parse(bytes.toString("utf8")),
  };
}

function fixedCoordinateRecord(spec) {
  const braid = spec.braids[0];
  const binaries = braid.binaries;
  const ordinaryFrequency = binaries[0].frequency;
  return {
    responseCenter: spec.group.centerAtEpoch,
    frame: {
      e1: braid.frameDefinition.e1,
      e2: braid.frameDefinition.e2,
      axis: braid.frameDefinition.axis,
      orthonormalTolerance: 1e-12,
    },
    axialDriftSpeed: 0,
    ordinaryFrequency,
    angularFrequency: braid.circulationSense * 2 * Math.PI * ordinaryFrequency,
    radii: binaries.map((binary) => binary.radius),
    phases: binaries.map((binary) => binary.phase),
    polarityAssignments: binaries.map((binary) => binary.polarityAssignment),
    recordInterval: spec.recordInterval,
  };
}

function validateB1CampaignSpec(spec) {
  validatePrescribedBraidSpec(spec);
  if (spec.taxonomy.familyId !== "B" || spec.taxonomy.memberId !== "B1" ||
      spec.braids.length !== 1) {
    throw new TypeError("B1 campaign sources must be Family B member B1 records.");
  }
  const braid = spec.braids[0];
  if (braid.circulationSense !== 1 || braid.phaseOffset !== 0 ||
      canonicalJson(braid.centerOffset) !== canonicalJson([0, 0, 0]) ||
      canonicalJson(spec.group.velocity) !== canonicalJson([0, 0, 0])) {
    throw new Error("B1 campaign sources changed a fixed center, drift, phase, or circulation coordinate.");
  }
  if (!braid.binaries.every((binary) =>
    binary.frequency === braid.binaries[0].frequency &&
    canonicalJson(binary.centerOffset) === canonicalJson([0, 0, 0]))) {
    throw new Error("B1 campaign sources changed a fixed frequency or binary center coordinate.");
  }
  return spec;
}

function assertFixedCoordinates(spec, manifest, label) {
  validateB1CampaignSpec(spec);
  const actual = fixedCoordinateRecord(spec);
  if (canonicalJson(actual) !== canonicalJson(manifest.fixedCoordinates)) {
    throw new Error(`${label} differs from the campaign fixed B1 coordinates.`);
  }
}

export function validateB1CapAngleCampaignManifest(manifest) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new TypeError("B1 cap-angle campaign manifest must be an object.");
  }
  if (manifest.schema !== B1_CAP_ANGLE_CAMPAIGN_MANIFEST_SCHEMA) {
    throw new TypeError(
      `B1 cap-angle campaign manifest requires schema ${B1_CAP_ANGLE_CAMPAIGN_MANIFEST_SCHEMA}.`,
    );
  }
  concreteString(manifest.campaignId, "manifest.campaignId");
  concreteString(manifest.date, "manifest.date");
  if (manifest.claimGrade !== "derived") {
    throw new TypeError("manifest.claimGrade must be derived.");
  }
  if (manifest.sourceClaimGrade !== "chart-hypothesis" ||
      manifest.sourceEvidenceStatus !== "display-only") {
    throw new TypeError(
      "manifest sources must remain claimGrade=chart-hypothesis and evidenceStatus=display-only.",
    );
  }
  exactArray(manifest.excludedClaims, REQUIRED_EXCLUDED_CLAIMS, "manifest.excludedClaims");
  if (manifest.seed?.algorithm !== "mulberry32/v1") {
    throw new TypeError("manifest.seed.algorithm must be mulberry32/v1.");
  }
  const seed = finiteNumber(manifest.seed?.value, "manifest.seed.value");
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new RangeError("manifest.seed.value must be an unsigned 32-bit integer.");
  }
  const sampleCount = positiveInteger(manifest.sampleCount, "manifest.sampleCount");
  if (manifest.stratification?.method !== "latin-hypercube/v1" ||
      manifest.stratification?.withinStratumRule !== "seeded-uniform-half-open/v1") {
    throw new TypeError("manifest stratification must use the declared Latin-hypercube rules.");
  }
  if (positiveInteger(
    manifest.stratification.strataPerDimension,
    "manifest.stratification.strataPerDimension",
  ) !== sampleCount) {
    throw new RangeError("manifest strataPerDimension must equal sampleCount.");
  }
  if (manifest.samplingMeasure?.id !== "independent-uniform-cap-angle/v1") {
    throw new TypeError(
      "manifest.samplingMeasure.id must be independent-uniform-cap-angle/v1.",
    );
  }
  if (!Array.isArray(manifest.samplingMeasure.coordinates) ||
      manifest.samplingMeasure.coordinates.length !== 3) {
    throw new TypeError("manifest must declare exactly three cap-angle coordinates.");
  }
  manifest.samplingMeasure.coordinates.forEach((coordinate, index) => {
    if (coordinate.id !== `alpha_${index + 1}` || coordinate.unit !== "radian") {
      throw new TypeError(`manifest cap-angle coordinate ${index + 1} is malformed.`);
    }
    if (finiteNumber(coordinate.minimum, `${coordinate.id}.minimum`) !== 0 ||
        finiteNumber(coordinate.maximum, `${coordinate.id}.maximum`) !== Math.PI / 2) {
      throw new RangeError(`${coordinate.id} must span [0, pi/2].`);
    }
  });
  const fixed = manifest.fixedCoordinates;
  exactArray(fixed?.responseCenter, [0, 0, 0], "manifest.fixedCoordinates.responseCenter");
  positiveNumber(fixed?.ordinaryFrequency, "manifest.fixedCoordinates.ordinaryFrequency");
  positiveNumber(Math.abs(fixed?.angularFrequency), "manifest.fixedCoordinates.angularFrequency");
  if (Math.abs(fixed.ordinaryFrequency - Math.abs(fixed.angularFrequency) / (2 * Math.PI)) > 1e-15) {
    throw new RangeError("manifest ordinary and angular frequencies disagree.");
  }
  if (!Array.isArray(fixed.radii) || fixed.radii.length !== 3) {
    throw new TypeError("manifest.fixedCoordinates.radii must contain three radii.");
  }
  fixed.radii.forEach((radius, index) =>
    positiveNumber(radius, `manifest.fixedCoordinates.radii[${index}]`));
  if (!Array.isArray(fixed.phases) || fixed.phases.length !== 3) {
    throw new TypeError("manifest.fixedCoordinates.phases must contain three phases.");
  }
  fixed.phases.forEach((phase, index) =>
    finiteNumber(phase, `manifest.fixedCoordinates.phases[${index}]`));
  exactArray(
    fixed.polarityAssignments,
    [1, -1, 1],
    "manifest.fixedCoordinates.polarityAssignments",
  );
  if (fixed.axialDriftSpeed !== 0) {
    throw new RangeError("the first B1 smoke campaign requires axialDriftSpeed=0.");
  }
  if (!manifest.baseSpec || !manifest.commonProtocol) {
    throw new TypeError("manifest requires baseSpec and commonProtocol bindings.");
  }
  concreteString(manifest.commonProtocol.protocolHash, "manifest.commonProtocol.protocolHash");
  if (!Array.isArray(manifest.anchors) || manifest.anchors.length !== 4) {
    throw new TypeError("manifest must bind the four existing B1 anchor records.");
  }
  const anchorIds = new Set();
  manifest.anchors.forEach((anchor, index) => {
    const label = `manifest.anchors[${index}]`;
    const caseId = concreteString(anchor.caseId, `${label}.caseId`);
    if (anchorIds.has(caseId)) throw new TypeError(`duplicate anchor case id ${caseId}.`);
    anchorIds.add(caseId);
    concreteString(anchor.label, `${label}.label`);
    concreteString(anchor.specPath, `${label}.specPath`);
    concreteString(anchor.sourceFileSha256, `${label}.sourceFileSha256`);
    if (!Array.isArray(anchor.expectedCapAngles) || anchor.expectedCapAngles.length !== 3) {
      throw new TypeError(`${label}.expectedCapAngles must contain three angles.`);
    }
    anchor.expectedCapAngles.forEach((angle, angleIndex) => {
      const value = finiteNumber(angle, `${label}.expectedCapAngles[${angleIndex}]`);
      if (value < 0 || value > Math.PI / 2) {
        throw new RangeError(`${label}.expectedCapAngles[${angleIndex}] is outside [0, pi/2].`);
      }
    });
  });
  exactArray(
    manifest.implementedMeasures,
    REQUIRED_IMPLEMENTED_MEASURES,
    "manifest.implementedMeasures",
  );
  resolveRepositoryPath(manifest.outputs?.directory, "manifest.outputs.directory");
  concreteString(manifest.outputs?.packetDirectory, "manifest.outputs.packetDirectory");
  concreteString(manifest.outputs?.summaryFilename, "manifest.outputs.summaryFilename");
  return manifest;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledStrata(count, random) {
  const strata = Array.from({ length: count }, (_, index) => index);
  for (let index = count - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [strata[index], strata[swapIndex]] = [strata[swapIndex], strata[index]];
  }
  return strata;
}

export function generateSeededB1CapAngleSamples(rawManifest) {
  const manifest = validateB1CapAngleCampaignManifest(rawManifest);
  const random = mulberry32(manifest.seed.value);
  const count = manifest.sampleCount;
  const dimensions = manifest.samplingMeasure.coordinates.map((coordinate) => {
    const strata = shuffledStrata(count, random);
    const width = (coordinate.maximum - coordinate.minimum) / count;
    return strata.map((stratum) => {
      const jitter = random();
      return {
        stratum,
        unitCoordinate: (stratum + jitter) / count,
        angle: coordinate.minimum + width * (stratum + jitter),
      };
    });
  });
  return Array.from({ length: count }, (_, sampleIndex) => {
    const capAngles = dimensions.map((dimension) => dimension[sampleIndex].angle);
    const axialHalfSeparations = capAngles.map((angle, index) =>
      manifest.fixedCoordinates.radii[index] * Math.sin(angle));
    const transverseOrbitRadii = capAngles.map((angle, index) =>
      manifest.fixedCoordinates.radii[index] * Math.cos(angle));
    return {
      caseId: `sample-${String(sampleIndex).padStart(3, "0")}`,
      label: `B1 seeded cap-angle sample ${String(sampleIndex).padStart(3, "0")}`,
      sampleIndex,
      strata: dimensions.map((dimension) => dimension[sampleIndex].stratum),
      unitCoordinates: dimensions.map((dimension) => dimension[sampleIndex].unitCoordinate),
      capAngles,
      axialHalfSeparations,
      transverseOrbitRadii,
    };
  });
}

function capAngleCoordinates(spec) {
  const binaries = spec.braids[0].binaries;
  const capAngles = binaries.map((binary) =>
    Math.atan2(binary.axialHalfSeparation, binary.transverseOrbitRadius));
  return {
    radii: binaries.map((binary) => binary.radius),
    capAngles,
    axialHalfSeparations: binaries.map((binary) => binary.axialHalfSeparation),
    transverseOrbitRadii: binaries.map((binary) => binary.transverseOrbitRadius),
  };
}

function createSampleSpec(baseSpec, manifest, sample) {
  const spec = structuredClone(baseSpec);
  spec.specId = `${manifest.campaignId}-${sample.caseId}`;
  spec.label = sample.label;
  spec.date = manifest.date;
  spec.taxonomy = {
    ...spec.taxonomy,
    instantiationLabel: `seeded sample ${String(sample.sampleIndex).padStart(3, "0")}`,
    displayLabel: `B1 — seeded sample ${String(sample.sampleIndex).padStart(3, "0")}`,
  };
  spec.provenanceDescription =
    "Exact B1 prescribed paths at one seeded cap-angle smoke-campaign coordinate.";
  spec.illustrativeCoordinates = {
    status: "prescribed-display-coordinates",
    choices: [
      "The three axial half-separations and transverse orbit radii are deterministically derived from the campaign cap-angle sample.",
    ],
  };
  spec.braids[0].binaries.forEach((binary, index) => {
    binary.axialHalfSeparation = sample.axialHalfSeparations[index];
    binary.transverseOrbitRadius = sample.transverseOrbitRadii[index];
  });
  return validateB1CampaignSpec(spec);
}

function accelerationMagnitude(response) {
  return Math.hypot(
    response.acceleration.x,
    response.acceleration.y,
    response.acceleration.z,
  );
}

export function assertCampaignPacketPasses(packet, expectedProtocolHash, caseId = "case") {
  if (packet.evaluator?.pathEvolutionInvoked !== false ||
      packet.evaluator?.eomSolverInvoked !== false) {
    throw new Error(`${caseId} invoked path evolution or the EOM solver.`);
  }
  if (packet.claimGrade !== "derived" ||
      canonicalJson(packet.excludedClaims) !== canonicalJson(REQUIRED_EXCLUDED_CLAIMS)) {
    throw new Error(`${caseId} changed the prescribed-record analytical claim boundary.`);
  }
  if (packet.protocolHash !== expectedProtocolHash) {
    throw new Error(`${caseId} did not use the common campaign protocol.`);
  }
  const validity = packet.reducedMeasures?.validity;
  const requiredGates = [
    "rootTopologyComplete",
    "rootTransversalityPassed",
    "minimumSeparationPassed",
    "numericalConvergencePassed",
    "passed",
  ];
  if (packet.status?.code !== "ok" ||
      requiredGates.some((gate) => validity?.[gate] !== true)) {
    throw new Error(`${caseId} failed one or more analytical validity gates.`);
  }
  if (!packet.rawLedgers?.causalRoots?.every(
    (event) => event.rootCompletenessCertification?.complete === true,
  )) {
    throw new Error(`${caseId} lacks complete retained-root certification.`);
  }
  const fieldSpeed = packet.protocol?.fieldSpeed;
  if (!packet.rawLedgers.causalRoots.every((event) => event.roots.every((root) =>
    root.certifiedSpeedBound < fieldSpeed && root.certifiedMonotonicityMargin > 0))) {
    throw new Error(`${caseId} lacks a strict sub-field-speed root certificate.`);
  }
  return packet;
}

function reduceCase({ caseId, label, caseType, packetPath, packet, coordinates, sampling }) {
  return {
    caseId,
    label,
    caseType,
    packetPath,
    sourceRecordId: packet.source.recordId,
    sourceHash: packet.source.sourceHash,
    resultHash: packet.resultHash,
    protocolHash: packet.protocolHash,
    coordinates: {
      radii: coordinates.radii,
      capAngles: coordinates.capAngles,
      axialHalfSeparations: coordinates.axialHalfSeparations,
      transverseOrbitRadii: coordinates.transverseOrbitRadii,
      ...(sampling ? { sampling } : {}),
    },
    gates: packet.reducedMeasures.validity,
    rootCount: packet.reducedMeasures.events.reduce((sum, event) => sum + event.rootCount, 0),
    noRootCount: packet.reducedMeasures.events.reduce((sum, event) => sum + event.noRootCount, 0),
    eventMeasures: packet.reducedMeasures.events.map((event) => ({
      eventId: event.eventId,
      observationTime: event.observationTime,
      signedWake: event.signedWake,
      unsignedWake: event.unsignedWake,
      signedCancellationRatio: event.signedCancellationRatio,
      probeResponses: event.probeResponses.map((response) => ({
        probePolarity: response.probePolarity,
        acceleration: response.acceleration,
        accelerationMagnitude: accelerationMagnitude(response),
      })),
      rootTransversalityMargin: event.rootTransversalityMargin,
      maximumRootResidual: event.maximumRootResidual,
    })),
    prescribedPeriodClosure: packet.reducedMeasures.prescribedPeriodClosure,
    minimumSeparation: packet.reducedMeasures.minimumSeparation,
    rootTransversalityMargin: packet.reducedMeasures.rootTransversalityMargin,
    numericalConvergence: {
      maximumReportedChange:
        packet.reducedMeasures.numericalConvergence.maximumReportedChange,
      passed: packet.reducedMeasures.numericalConvergence.passed,
    },
  };
}

function numericRange(values) {
  return { minimum: Math.min(...values), maximum: Math.max(...values) };
}

function campaignRanges(cases, polarities) {
  const events = cases.flatMap((row) => row.eventMeasures);
  const responseMagnitudeByPolarity = Object.fromEntries(polarities.map((polarity) => {
    const values = events.flatMap((event) => event.probeResponses
      .filter((response) => response.probePolarity === polarity)
      .map((response) => response.accelerationMagnitude));
    return [String(polarity), numericRange(values)];
  }));
  return {
    signedWake: numericRange(events.map((event) => event.signedWake)),
    unsignedWake: numericRange(events.map((event) => event.unsignedWake)),
    signedCancellationRatio: numericRange(
      events.map((event) => event.signedCancellationRatio),
    ),
    probeAccelerationMagnitudeByPolarity: responseMagnitudeByPolarity,
    minimumSeparation: numericRange(
      cases.map((row) => row.minimumSeparation.value),
    ),
    rootTransversalityMargin: numericRange(
      cases.map((row) => row.rootTransversalityMargin),
    ),
    numericalConvergenceMaximumChange: numericRange(
      cases.map((row) => row.numericalConvergence.maximumReportedChange),
    ),
  };
}

function packetFilename(caseId) {
  return `${caseId}.result-packet.v1.json`;
}

function serializedJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function buildB1CapAngleCampaign(rawManifest, options = {}) {
  const manifest = validateB1CapAngleCampaignManifest(rawManifest);
  const manifestPath = path.resolve(
    options.manifestPath ?? DEFAULT_B1_CAP_ANGLE_CAMPAIGN_MANIFEST_PATH,
  );
  const manifestHash = sha256Canonical(manifest);
  const base = readBoundJson(manifest.baseSpec, "manifest.baseSpec");
  assertFixedCoordinates(base.value, manifest, "baseSpec");
  const protocolBinding = readBoundJson(
    manifest.commonProtocol,
    "manifest.commonProtocol",
  );
  const protocol = validatePrescribedRecordAnalysisProtocol(protocolBinding.value);
  const protocolHash = sha256Canonical(protocol);
  if (protocolHash !== manifest.commonProtocol.protocolHash) {
    throw new Error(
      `common protocol hash mismatch: expected ${manifest.commonProtocol.protocolHash}, ` +
      `received ${protocolHash}.`,
    );
  }
  const outputDirectory = resolveRepositoryPath(
    manifest.outputs.directory,
    "manifest.outputs.directory",
  );
  const packetDirectory = path.resolve(
    outputDirectory,
    manifest.outputs.packetDirectory,
  );
  if (!packetDirectory.startsWith(`${outputDirectory}${path.sep}`)) {
    throw new RangeError("manifest packet directory must remain inside the output directory.");
  }
  const artifacts = [];
  const caseRows = [];

  const evaluateCase = ({ caseId, label, caseType, spec, sourceInputHash, generatingSpec, sampling }) => {
    const exactRecord = createPrescribedBraidExactSourceRecord(spec, {
      sourceHash: sourceInputHash,
      generatingSpec,
    });
    const packet = assertCampaignPacketPasses(
      evaluatePrescribedRecordAnalysis({ sourceRecord: exactRecord, protocol }),
      protocolHash,
      caseId,
    );
    const filename = packetFilename(caseId);
    const absolutePacketPath = path.resolve(packetDirectory, filename);
    const relativePacketPath = relativeRepositoryPath(absolutePacketPath);
    artifacts.push({
      absolutePath: absolutePacketPath,
      relativePath: relativePacketPath,
      content: serializedJson(packet),
    });
    caseRows.push(reduceCase({
      caseId,
      label,
      caseType,
      packetPath: relativePacketPath,
      packet,
      coordinates: capAngleCoordinates(spec),
      sampling,
    }));
  };

  for (const anchor of manifest.anchors) {
    const binding = readBoundJson(anchor, `anchor ${anchor.caseId}`);
    assertFixedCoordinates(binding.value, manifest, `anchor ${anchor.caseId}`);
    const actualAngles = capAngleCoordinates(binding.value).capAngles;
    if (actualAngles.some((angle, index) =>
      Math.abs(angle - anchor.expectedCapAngles[index]) > 1e-15)) {
      throw new Error(`anchor ${anchor.caseId} cap angles differ from the manifest.`);
    }
    evaluateCase({
      caseId: anchor.caseId,
      label: anchor.label,
      caseType: "anchor",
      spec: binding.value,
      sourceInputHash: binding.sourceFileSha256,
      generatingSpec: binding.relativePath,
      sampling: null,
    });
  }

  const samples = generateSeededB1CapAngleSamples(manifest);
  for (const sample of samples) {
    const spec = createSampleSpec(base.value, manifest, sample);
    evaluateCase({
      caseId: sample.caseId,
      label: sample.label,
      caseType: "seeded-sample",
      spec,
      sourceInputHash: sha256Canonical(spec),
      generatingSpec: `${relativeRepositoryPath(manifestPath)}#${sample.caseId}`,
      sampling: {
        sampleIndex: sample.sampleIndex,
        strata: sample.strata,
        unitCoordinates: sample.unitCoordinates,
      },
    });
  }

  const allPassed = caseRows.every((row) => row.gates.passed === true);
  if (!allPassed) throw new Error("campaign contains a failed analytical validity gate.");
  const polarities = protocol.probes.flatMap((probe) => probe.polarities);
  const uniquePolarities = [...new Set(polarities)];
  const summaryWithoutHash = {
    schema: B1_CAP_ANGLE_CAMPAIGN_SUMMARY_SCHEMA,
    campaignId: manifest.campaignId,
    manifestPath: relativeRepositoryPath(manifestPath),
    manifestHash,
    claimGrade: manifest.claimGrade,
    claimScope: manifest.claimScope,
    sourceClaimGrade: manifest.sourceClaimGrade,
    sourceEvidenceStatus: manifest.sourceEvidenceStatus,
    excludedClaims: manifest.excludedClaims,
    evaluator: {
      id: "prescribed-record-analytical-braid-evaluator",
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
    },
    sampling: {
      seed: manifest.seed,
      sampleCount: manifest.sampleCount,
      stratification: manifest.stratification,
      samplingMeasure: manifest.samplingMeasure,
      fixedCoordinates: manifest.fixedCoordinates,
    },
    commonProtocol: {
      path: protocolBinding.relativePath,
      sourceFileSha256: protocolBinding.sourceFileSha256,
      protocolHash,
    },
    implementedMeasures: manifest.implementedMeasures,
    caseCounts: {
      total: caseRows.length,
      anchors: caseRows.filter((row) => row.caseType === "anchor").length,
      seededSamples: caseRows.filter((row) => row.caseType === "seeded-sample").length,
      passed: caseRows.filter((row) => row.gates.passed).length,
      failed: caseRows.filter((row) => !row.gates.passed).length,
    },
    cases: caseRows,
    implementedMeasureRanges: campaignRanges(caseRows, uniquePolarities),
    validity: {
      allCasesPassed: allPassed,
      allRootTopologiesComplete: caseRows.every((row) => row.gates.rootTopologyComplete),
      allRootTransversalityGatesPassed:
        caseRows.every((row) => row.gates.rootTransversalityPassed),
      allMinimumSeparationGatesPassed:
        caseRows.every((row) => row.gates.minimumSeparationPassed),
      allNumericalConvergenceGatesPassed:
        caseRows.every((row) => row.gates.numericalConvergencePassed),
    },
    status: {
      code: "ok",
      severity: "ok",
      message: "seeded B1 prescribed-record analytical smoke campaign completed",
    },
    falsifier:
      "Reject campaign reproducibility if the bound manifest and seed do not reproduce every packet and summary hash; reject an analytical case if any declared validity gate fails.",
  };
  const summary = {
    ...summaryWithoutHash,
    summaryHash: sha256Canonical(summaryWithoutHash),
  };
  const absoluteSummaryPath = path.resolve(
    outputDirectory,
    manifest.outputs.summaryFilename,
  );
  artifacts.push({
    absolutePath: absoluteSummaryPath,
    relativePath: relativeRepositoryPath(absoluteSummaryPath),
    content: serializedJson(summary),
  });
  return { manifest, manifestHash, protocol, protocolHash, samples, caseRows, summary, artifacts };
}

export function loadAndBuildB1CapAngleCampaign(manifestPath = DEFAULT_B1_CAP_ANGLE_CAMPAIGN_MANIFEST_PATH) {
  const absoluteManifestPath = path.resolve(manifestPath);
  const manifest = JSON.parse(fs.readFileSync(absoluteManifestPath, "utf8"));
  return buildB1CapAngleCampaign(manifest, { manifestPath: absoluteManifestPath });
}

function expectedPacketFilenames(campaign) {
  return campaign.caseRows.map((row) => packetFilename(row.caseId)).sort();
}

function assertNoUnexpectedPackets(campaign) {
  const manifest = campaign.manifest;
  const outputDirectory = resolveRepositoryPath(
    manifest.outputs.directory,
    "manifest.outputs.directory",
  );
  const packetDirectory = path.resolve(outputDirectory, manifest.outputs.packetDirectory);
  if (!fs.existsSync(packetDirectory)) return;
  const actual = fs.readdirSync(packetDirectory)
    .filter((name) => name.endsWith(".result-packet.v1.json"))
    .sort();
  const expected = expectedPacketFilenames(campaign);
  if (canonicalJson(actual) !== canonicalJson(expected)) {
    throw new Error(
      `campaign packet inventory drift: expected ${JSON.stringify(expected)}, ` +
      `received ${JSON.stringify(actual)}.`,
    );
  }
}

export function writeB1CapAngleCampaign(campaign) {
  assertNoUnexpectedPackets(campaign);
  for (const artifact of campaign.artifacts) {
    fs.mkdirSync(path.dirname(artifact.absolutePath), { recursive: true });
    fs.writeFileSync(artifact.absolutePath, artifact.content);
  }
  return campaign;
}

export function checkB1CapAngleCampaign(campaign) {
  assertNoUnexpectedPackets(campaign);
  for (const artifact of campaign.artifacts) {
    if (!fs.existsSync(artifact.absolutePath)) {
      throw new Error(`campaign artifact is missing: ${artifact.relativePath}`);
    }
    const actual = fs.readFileSync(artifact.absolutePath, "utf8");
    if (actual !== artifact.content) {
      throw new Error(
        `campaign artifact drift: ${artifact.relativePath}; run ` +
        "node scripts/eom/run-b1-prescribed-analysis-campaign.mjs --write",
      );
    }
  }
  return campaign;
}

function parseArgs(args) {
  const parsed = {
    manifestPath: DEFAULT_B1_CAP_ANGLE_CAMPAIGN_MANIFEST_PATH,
    mode: null,
  };
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (key === "--check" || key === "--write") {
      if (parsed.mode) throw new TypeError("--check and --write are mutually exclusive.");
      parsed.mode = key.slice(2);
    } else if (key === "--manifest") {
      const value = args[index + 1];
      if (!value) throw new TypeError("--manifest requires a value.");
      parsed.manifestPath = path.resolve(value);
      index += 1;
    } else {
      throw new TypeError(`unknown campaign argument ${key}.`);
    }
  }
  if (!parsed.mode) throw new TypeError("campaign runner requires --check or --write.");
  return parsed;
}

function runCli() {
  const options = parseArgs(process.argv.slice(2));
  const campaign = loadAndBuildB1CapAngleCampaign(options.manifestPath);
  if (options.mode === "write") writeB1CapAngleCampaign(campaign);
  else checkB1CapAngleCampaign(campaign);
  process.stdout.write(
    `B1 cap-angle smoke campaign ${options.mode} passed: ` +
    `${campaign.caseRows.length} cases, summary ${campaign.summary.summaryHash}\n`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) runCli();
