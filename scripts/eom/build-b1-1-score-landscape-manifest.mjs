#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  FULL_TAXONOMY_SAMPLER_ID,
  sampleFullConstraintPreservingTaxonomy,
} from "../../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";
import {
  sha256Canonical,
} from "../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";
import {
  validateB1CompleteCycleProbeProtocol,
} from "../../src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs";
import {
  validateExactPrescribedSourceRecord,
} from "../../src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "./generate-prescribed-braid-record.mjs";

export const MANIFEST_SCHEMA =
  "prescribed-path-analysis/b1-1-score-landscape-manifest.v1";
export const FREEZE_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/b1-1-score-landscape-freeze-protocol.v1";
export const POPULATION_SEED =
  "braid-b1-1-score-landscape-design-20260727-v1";
export const HELD_OUT_SEED =
  "braid-b1-1-score-landscape-heldout-20260727-v1";
export const SEALED_SOURCE_SEED =
  "braid-bc-monte-carlo-basin-20260725-v1";
export const SEALED_SAMPLE_ORDINAL = 5;
export const DEFAULT_MANIFEST_PATH =
  "reference/priorities/braid-program/campaigns/" +
  "b1-1-score-landscape-manifest.v1.json";
export const DEFAULT_PROTOCOL_PATH =
  "reference/priorities/braid-program/campaigns/" +
  "b1-1-score-landscape-complete-cycle-protocol.v1.json";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const TWO_PI = 2 * Math.PI;
const ANGLE_HALF_WIDTH = Math.PI / 8;
const PHASE_OFFSET = 3.079311623345746;
const SEALED_IDENTITIES = Object.freeze({
  caseSha256:
    "a0a485c9104204e92d8b1ad0af995f26f9264a481b99c36dd7e88d28f8e3388c",
  sampledSpecSha256:
    "c62c3e8ba3a393c7c090e79e7bd4b3869a8cbc1fcd007c3530cdafc0f45abe67",
  exactSourceSha256:
    "2fe5abc99c837a627c1817c4c27e39b71ecdae2264ea572d276e3d8e1b42f52a",
  scoreSha256:
    "c72a511f230b9422aac9af08242c4bff2dee2e5c4ba57abe9b98b5979e945e79",
});
const EXPECTED_PROTOCOL_CANONICAL_SHA256 =
  "3c5641cd9cd88f47e8cdbdb0b7697df002d6bb9e6418ac0d390541f09a27b30d";
const EXPECTED_SOURCE_BYTES_SHA256 =
  "69b33b21543e2a563e1d52692205c2db60931b5f09e67697ac729cbd00efe580";

export const COORDINATE_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: "R1",
    kind: "symmetric-log-radius",
    anchor: 0.1013708390621178,
    minimum: 0.09215530823828891,
    maximum: 0.11150792296832959,
  }),
  Object.freeze({
    id: "R2",
    kind: "symmetric-log-radius",
    anchor: 0.12599123487820238,
    minimum: 0.11453748625291124,
    maximum: 0.13859035836602263,
  }),
  Object.freeze({
    id: "R3",
    kind: "symmetric-log-radius",
    anchor: 0.19797831306779531,
    minimum: 0.17998028460708662,
    maximum: 0.21777614437457488,
  }),
  Object.freeze({
    id: "u1",
    kind: "linear",
    anchor: 0.5607114957052897,
    minimum: 0.4607114957052897,
    maximum: 0.6607114957052897,
  }),
  Object.freeze({
    id: "u2",
    kind: "linear",
    anchor: 0.19973938313738124,
    minimum: 0.1,
    maximum: 0.2994787662747625,
  }),
  Object.freeze({
    id: "u3",
    kind: "linear",
    anchor: 0.7813938908936988,
    minimum: 0.6813938908936988,
    maximum: 0.8813938908936988,
  }),
  Object.freeze({
    id: "theta1",
    kind: "periodic-linear",
    anchor: 6.250463126085282,
    halfWidth: ANGLE_HALF_WIDTH,
  }),
  Object.freeze({
    id: "theta2",
    kind: "periodic-linear",
    anchor: 1.2831301703861584,
    halfWidth: ANGLE_HALF_WIDTH,
  }),
  Object.freeze({
    id: "theta3",
    kind: "periodic-linear",
    anchor: 3.9301873448540365,
    halfWidth: ANGLE_HALF_WIDTH,
  }),
  Object.freeze({
    id: "kappa",
    kind: "linear",
    anchor: 0.017682417404789597,
    minimum: -0.1323175825952104,
    maximum: 0.1676824174047896,
  }),
  Object.freeze({
    id: "psi",
    kind: "periodic-linear-signed",
    anchor: -3.0334921137648716,
    halfWidth: ANGLE_HALF_WIDTH,
  }),
  Object.freeze({
    id: "sigma",
    kind: "linear",
    anchor: 0.9007296341094717,
    minimum: 0.8257296341094717,
    maximum: 0.9757296341094717,
  }),
]);

function fail(message) {
  throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function digestToken(parts) {
  return createHash("sha256").update(parts.join("\0")).digest("hex");
}

function jsonBytes(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function modulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function signedAngle(value) {
  const normalized = modulo(value + Math.PI, TWO_PI) - Math.PI;
  return normalized === -Math.PI ? Math.PI : normalized;
}

function assertNear(actual, expected, label, tolerance = 1e-15) {
  if (Math.abs(actual - expected) > tolerance) {
    fail(`${label} differs: expected ${expected}, received ${actual}.`);
  }
}

function coordinateValue(definition, z) {
  if (!Number.isFinite(z) || z < -1 || z > 1) {
    fail(`${definition.id} normalized coordinate must be in [-1, 1].`);
  }
  if (definition.kind === "symmetric-log-radius") {
    return definition.anchor * Math.exp(Math.log(1.1) * z);
  }
  if (definition.kind === "periodic-linear") {
    return modulo(definition.anchor + definition.halfWidth * z, TWO_PI);
  }
  if (definition.kind === "periodic-linear-signed") {
    return signedAngle(definition.anchor + definition.halfWidth * z);
  }
  const halfWidth = (definition.maximum - definition.minimum) / 2;
  return definition.anchor + halfWidth * z;
}

function vectorNorm(vector) {
  return Math.hypot(...vector);
}

function buildHeldOutDesign() {
  const permutations = COORDINATE_DEFINITIONS.map((_, coordinateIndex) =>
    Array.from({ length: 64 }, (_, sourceIndex) => ({
      sourceIndex,
      token: digestToken([
        HELD_OUT_SEED,
        String(coordinateIndex),
        String(sourceIndex),
      ]),
    })).sort((left, right) =>
      left.token.localeCompare(right.token) ||
      left.sourceIndex - right.sourceIndex));

  return Array.from({ length: 64 }, (_, rowOrdinal) => {
    const counterTokens = [];
    const normalizedCoordinates = permutations.map((permutation, coordinateIndex) => {
      const permutationEntry = permutation[rowOrdinal];
      const jitterToken = digestToken([
        HELD_OUT_SEED,
        String(coordinateIndex),
        String(rowOrdinal),
        "jitter",
      ]);
      const firstUnsigned64 = BigInt(`0x${jitterToken.slice(0, 16)}`);
      const jitter = Number(firstUnsigned64) / 2 ** 64;
      counterTokens.push({
        coordinateIndex,
        permutationSourceIndex: permutationEntry.sourceIndex,
        permutationTokenSha256: permutationEntry.token,
        jitterTokenSha256: jitterToken,
        jitterFirstUnsigned64Hex: jitterToken.slice(0, 16),
      });
      return 2 * (permutationEntry.sourceIndex + jitter) / 64 - 1;
    });
    return {
      rowId: `heldout-${String(rowOrdinal).padStart(3, "0")}`,
      rowType: "held-out-latin-hypercube",
      rowOrdinal,
      normalizedCoordinates,
      counterTokens,
    };
  });
}

function buildDeclaredNormalizedRows() {
  const rows = [{
    rowId: "center-000",
    rowType: "center",
    rowOrdinal: 0,
    normalizedCoordinates: Array(12).fill(0),
    counterTokens: [],
  }];
  const axialValues = [-1, -0.5, 0.5, 1];
  for (let coordinateIndex = 0; coordinateIndex < 12; coordinateIndex += 1) {
    for (const value of axialValues) {
      const normalizedCoordinates = Array(12).fill(0);
      normalizedCoordinates[coordinateIndex] = value;
      rows.push({
        rowId:
          `axial-${String(coordinateIndex).padStart(2, "0")}-` +
          `${value < 0 ? "m" : "p"}${Math.abs(value) === 1 ? "1" : "0p5"}`,
        rowType: "axial",
        rowOrdinal: rows.length,
        normalizedCoordinates,
        counterTokens: [],
      });
    }
  }
  const signs = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  for (let left = 0; left < 12; left += 1) {
    for (let right = left + 1; right < 12; right += 1) {
      for (const [leftSign, rightSign] of signs) {
        const normalizedCoordinates = Array(12).fill(0);
        normalizedCoordinates[left] = leftSign;
        normalizedCoordinates[right] = rightSign;
        rows.push({
          rowId:
            `pair-${String(left).padStart(2, "0")}-` +
            `${String(right).padStart(2, "0")}-` +
            `${leftSign < 0 ? "m" : "p"}-${rightSign < 0 ? "m" : "p"}`,
          rowType: "pairwise-interaction",
          rowOrdinal: rows.length,
          normalizedCoordinates,
          counterTokens: [],
        });
      }
    }
  }
  for (const row of buildHeldOutDesign()) {
    rows.push({ ...row, rowOrdinal: rows.length });
  }
  if (rows.length !== 377) fail(`declared population has ${rows.length} rows.`);
  return rows;
}

function loadSealedAnchor() {
  const loaded = loadAllCandidateCampaignRegistry();
  const candidate = loaded.candidates.find(
    (row) => row.declaration.memberId === "B1.1",
  );
  if (!candidate) fail("canonical registry lacks B1.1.");
  const sampled = sampleFullConstraintPreservingTaxonomy({
    candidate,
    seed: SEALED_SOURCE_SEED,
    sampleOrdinal: SEALED_SAMPLE_ORDINAL,
  });
  if (sampled.samplerId !== FULL_TAXONOMY_SAMPLER_ID) {
    fail("sealed center sampler identity differs.");
  }
  const sampledSpecSha256 = sha256Canonical(sampled.spec);
  if (sampledSpecSha256 !== SEALED_IDENTITIES.sampledSpecSha256) {
    fail("sealed center sampled-spec identity differs.");
  }
  const exactSource = validateExactPrescribedSourceRecord(
    createPrescribedBraidExactSourceRecord(sampled.spec, {
      sourceHash: sampledSpecSha256,
      generatingSpec: candidate.declaration.specPath,
    }),
  );
  if (sha256Canonical(exactSource) !== SEALED_IDENTITIES.exactSourceSha256) {
    fail("sealed center exact-source identity differs.");
  }
  const sourceBytes = readFileSync(candidate.declaration.specPath);
  if (sha256Bytes(sourceBytes) !== EXPECTED_SOURCE_BYTES_SHA256) {
    fail("canonical B1.1 source bytes differ.");
  }
  return { loaded, candidate, sampled };
}

function materializeRow(anchorSpec, candidate, row) {
  const physicalValues = row.normalizedCoordinates.map(
    (z, index) => coordinateValue(COORDINATE_DEFINITIONS[index], z),
  );
  const physicalCoordinates = Object.fromEntries(
    COORDINATE_DEFINITIONS.map((definition, index) => [
      definition.id,
      physicalValues[index],
    ]),
  );
  const isCenter = row.normalizedCoordinates.every((value) => value === 0);
  const sampledSpec = structuredClone(anchorSpec);
  if (!isCenter) {
    const braid = sampledSpec.braids[0];
    for (let binaryIndex = 0; binaryIndex < 3; binaryIndex += 1) {
      const binary = braid.binaries[binaryIndex];
      const radius = physicalValues[binaryIndex];
      const axialFraction = physicalValues[3 + binaryIndex];
      binary.radius = radius;
      binary.axialHalfSeparation = radius * axialFraction;
      binary.transverseOrbitRadius =
        radius * Math.sqrt(Math.max(0, 1 - axialFraction ** 2));
      binary.phase = modulo(physicalValues[6 + binaryIndex] - PHASE_OFFSET, TWO_PI);
    }
    const kappa = physicalValues[9];
    const psi = physicalValues[10];
    const sigma = physicalValues[11];
    const maximumRadius = Math.max(...braid.binaries.map((binary) => binary.radius));
    const maximumSafeSpeed =
      (sampledSpec.sphericalEnvelopeRadius - maximumRadius) / 16;
    const speed = sigma * maximumSafeSpeed;
    const transverse = Math.sqrt(Math.max(0, 1 - kappa ** 2));
    sampledSpec.group.velocity = [
      speed * transverse * Math.cos(psi),
      speed * transverse * Math.sin(psi),
      speed * kappa,
    ];
  }
  validatePrescribedBraidSpec(sampledSpec);
  const sampledSpecSha256 = sha256Canonical(sampledSpec);
  const exactSource = validateExactPrescribedSourceRecord(
    createPrescribedBraidExactSourceRecord(sampledSpec, {
      sourceHash: sampledSpecSha256,
      generatingSpec: candidate.declaration.specPath,
    }),
  );
  if (isCenter) {
    if (sampledSpecSha256 !== SEALED_IDENTITIES.sampledSpecSha256 ||
        sha256Canonical(exactSource) !== SEALED_IDENTITIES.exactSourceSha256) {
      fail("materialized center does not reproduce the sealed source identity.");
    }
    const velocity = sampledSpec.group.velocity;
    const speed = vectorNorm(velocity);
    assertNear(velocity[2] / speed, COORDINATE_DEFINITIONS[9].anchor, "center kappa");
    assertNear(
      Math.atan2(velocity[1], velocity[0]),
      COORDINATE_DEFINITIONS[10].anchor,
      "center psi",
    );
  }
  return {
    ...row,
    orderingTokenSha256: digestToken([
      POPULATION_SEED,
      row.rowType,
      String(row.rowOrdinal),
      row.rowId,
    ]),
    normalizedCoordinates: Object.fromEntries(
      COORDINATE_DEFINITIONS.map((definition, index) => [
        definition.id,
        row.normalizedCoordinates[index],
      ]),
    ),
    physicalCoordinates,
    materializedSpec: sampledSpec,
    sampledSpecSha256,
    exactSourceSha256: sha256Canonical(exactSource),
    analyticalState: {
      evaluated: false,
      disposition: null,
      primaryScore: null,
      refinedScore: null,
      denseScore: null,
      reason: "BP-009 manifest freeze; analytical evaluation is not authorized",
    },
  };
}

export function buildFrozenCompleteCycleProtocol() {
  const { protocol } = loadAllCandidateCampaignRegistry();
  const validated = validateB1CompleteCycleProbeProtocol(protocol);
  if (sha256Canonical(validated) !== EXPECTED_PROTOCOL_CANONICAL_SHA256) {
    fail("canonical complete-cycle protocol identity differs.");
  }
  if (validated.eventEvaluator.fieldSpeed !== 1 ||
      validated.completeCycle.primary.timeSamples !== 24 ||
      validated.completeCycle.primary.polarOrder !== 12 ||
      validated.completeCycle.primary.azimuthCount !== 24 ||
      validated.completeCycle.refined.timeSamples !== 48 ||
      validated.completeCycle.refined.polarOrder !== 16 ||
      validated.completeCycle.refined.azimuthCount !== 32) {
    fail("complete-cycle protocol does not match the declared BP-009 resolution.");
  }
  return validated;
}

export function buildScoreLandscapeManifest() {
  const { candidate, sampled } = loadSealedAnchor();
  const rows = buildDeclaredNormalizedRows().map((row) =>
    materializeRow(sampled.spec, candidate, row));
  const uniqueRowIds = new Set(rows.map((row) => row.rowId));
  const uniqueSpecs = new Set(rows.map((row) => row.sampledSpecSha256));
  if (uniqueRowIds.size !== 377 || uniqueSpecs.size !== 377) {
    fail("manifest rows or materialized specifications are not unique.");
  }
  return {
    schema: MANIFEST_SCHEMA,
    manifestId: "b1-1-score-landscape-20260727-v1",
    status: "frozen-score-free",
    claimBoundary: {
      diagnosticOnly: true,
      prescribedPathsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      causalRootsEvaluated: false,
      scoresComputed: false,
      independentAcceptancePerformed: false,
      excludedClaims: [
        "stability",
        "retention",
        "binding",
        "energy closure",
        "quantization",
        "particle identity",
        "catalog acceptance",
        "physical realization",
      ],
    },
    sourceBinding: {
      sourcePath: candidate.declaration.specPath,
      sourceBytesSha256: EXPECTED_SOURCE_BYTES_SHA256,
      samplerId: FULL_TAXONOMY_SAMPLER_ID,
      samplerSeed: SEALED_SOURCE_SEED,
      sampleOrdinal: SEALED_SAMPLE_ORDINAL,
      sealedIdentities: SEALED_IDENTITIES,
    },
    fixedCoordinates: {
      familyId: "B",
      memberId: "B1.1",
      commonMidpoint: [0, 0, 0],
      commonAxis: [0, 0, 1],
      commonFrequency: 0.75,
      commonCirculation: -1,
      polarityAssignments: [1, -1, -1],
      sourceOrder: [
        "spindle-binary-1",
        "spindle-binary-2",
        "spindle-binary-3",
      ],
      prescribedReturnPeriod: 4,
      sphericalEnvelopeRadius: 0.5,
      braidPhaseOffset: PHASE_OFFSET,
    },
    coordinateMap: {
      normalizedDomain: [-1, 1],
      coordinates: COORDINATE_DEFINITIONS,
      radiusRule: "R=R_anchor*exp(log(1.1)*z)",
      linearRule: "x=x_anchor+(maximum-minimum)*z/2",
      periodicRule: "angle=anchor+(pi/8)*z modulo 2*pi",
      translationSpeedRule:
        "speed=sigma*(sphericalEnvelopeRadius-maximumBinaryRadius)/16",
      translationDirectionRule:
        "[sqrt(1-kappa^2)*cos(psi),sqrt(1-kappa^2)*sin(psi),kappa]",
    },
    population: {
      rowCount: 377,
      orderingSeed: POPULATION_SEED,
      heldOutSeed: HELD_OUT_SEED,
      counts: {
        center: 1,
        axial: 48,
        pairwiseInteraction: 264,
        heldOutLatinHypercube: 64,
      },
      ordering:
        "center; coordinate-index axial -1,-1/2,+1/2,+1; " +
        "pair j<k signs --,-+,+-,++; held-out ordinal",
      scoreDependentMutationPermitted: false,
    },
    evaluationContract: {
      completeCycleProtocolCanonicalSha256:
        EXPECTED_PROTOCOL_CANONICAL_SHA256,
      primary: { timeSamples: 24, polarOrder: 12, azimuthCount: 24 },
      refined: { timeSamples: 48, polarOrder: 16, azimuthCount: 32 },
      dense: {
        primary: { timeSamples: 48, polarOrder: 16, azimuthCount: 32 },
        refined: { timeSamples: 96, polarOrder: 24, azimuthCount: 48 },
        independentRootResidualMaximum: 1e-12,
      },
      unchangedHandoff: {
        refinedMaximumPointwiseMemberResidual: 6,
        maximumPrimaryRefinedRelativeOrAbsoluteChange: 0.05,
      },
      requiredGates: [
        "strict-sub-field-speed",
        "moving-event-validity",
        "exact-expected-observed-transmitter-count",
        "per-transmitter-root-completeness",
        "root-transversality-margin",
        "complete-acceleration-inventory",
        "minimum-separation",
        "source-speed-margin",
        "complete-period-closure",
        "branch-continuity",
      ],
      dispositions: {
        "applicable-threshold-crossing": { scorePermitted: true },
        "applicable-threshold-noncrossing": { scorePermitted: true },
        "inapplicable-member-score": { scorePermitted: false },
        "unknown-numerical": { scorePermitted: false },
        "invalid-manifest-row": { scorePermitted: false },
      },
      failClosedRule:
        "inapplicable, unknown, and invalid rows retain null scores and do not " +
        "count as candidate failures",
    },
    rows,
  };
}

function writeOnceOrMatch(file, bytes) {
  if (existsSync(file)) {
    const prior = readFileSync(file);
    if (!prior.equals(bytes)) fail(`${file} exists with different bytes.`);
    return "matched-existing";
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, bytes, { flag: "wx" });
  return "written";
}

function parseArguments(args) {
  const command = args[0];
  if (!["write", "check", "summary"].includes(command)) {
    fail("command must be write, check, or summary.");
  }
  const values = new Map();
  for (let index = 1; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || !value) fail(`invalid argument ${key}.`);
    values.set(key, value);
  }
  return { command, values };
}

export function verifyFrozenFiles({
  manifestPath = DEFAULT_MANIFEST_PATH,
  protocolPath = DEFAULT_PROTOCOL_PATH,
} = {}) {
  const manifestBytes = jsonBytes(buildScoreLandscapeManifest());
  const protocolBytes = jsonBytes(buildFrozenCompleteCycleProtocol());
  if (!existsSync(manifestPath) || !readFileSync(manifestPath).equals(manifestBytes)) {
    fail(`${manifestPath} does not match the pure builder.`);
  }
  if (!existsSync(protocolPath) || !readFileSync(protocolPath).equals(protocolBytes)) {
    fail(`${protocolPath} does not match the pure builder.`);
  }
  return {
    manifestPath,
    manifestBytes: manifestBytes.length,
    manifestFileSha256: sha256Bytes(manifestBytes),
    manifestCanonicalSha256: sha256Canonical(JSON.parse(manifestBytes)),
    protocolPath,
    protocolBytes: protocolBytes.length,
    protocolFileSha256: sha256Bytes(protocolBytes),
    protocolCanonicalSha256: sha256Canonical(JSON.parse(protocolBytes)),
    rowCount: 377,
    implementationPath: path.relative(process.cwd(), SCRIPT_PATH),
    causalRootsEvaluated: false,
    scoresComputed: false,
  };
}

async function runCli() {
  const { command, values } = parseArguments(process.argv.slice(2));
  const manifestPath = values.get("--manifest") ?? DEFAULT_MANIFEST_PATH;
  const protocolPath = values.get("--protocol") ?? DEFAULT_PROTOCOL_PATH;
  if (command === "write") {
    const manifestResult = writeOnceOrMatch(
      manifestPath,
      jsonBytes(buildScoreLandscapeManifest()),
    );
    const protocolResult = writeOnceOrMatch(
      protocolPath,
      jsonBytes(buildFrozenCompleteCycleProtocol()),
    );
    process.stdout.write(`${JSON.stringify({
      manifestResult,
      protocolResult,
      ...verifyFrozenFiles({ manifestPath, protocolPath }),
    }, null, 2)}\n`);
    return;
  }
  const result = command === "check"
    ? verifyFrozenFiles({ manifestPath, protocolPath })
    : {
        manifest: buildScoreLandscapeManifest(),
        protocol: buildFrozenCompleteCycleProtocol(),
      };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (path.resolve(process.argv[1] ?? "") === SCRIPT_PATH) {
  runCli().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  });
}
