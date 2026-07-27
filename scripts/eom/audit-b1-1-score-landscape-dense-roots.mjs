#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

export const DENSE_ROOT_AUDIT_SCHEMA =
  "prescribed-path-analysis/b1-1-dense-root-residual-audit.v1";
export const DENSE_ROOT_PACKET_SCHEMA =
  "prescribed-path-analysis/b1-1-dense-root-packet.v1";
export const MAXIMUM_ROOT_RESIDUAL = 1e-12;

const SCRIPT_PATH = fileURLToPath(import.meta.url);

function fail(message) {
  throw new Error(message);
}

function finite(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    fail(`${label} must be a three-vector.`);
  }
  return value.map((entry, index) => finite(entry, `${label}[${index}]`));
}

function rootResidual(root, fieldSpeed) {
  const receiver = vector3(root.receiverPosition, "root.receiverPosition");
  const transmitter = vector3(
    root.transmitterPositionAtEmission,
    "root.transmitterPositionAtEmission",
  );
  const observationTime = finite(root.observationTime, "root.observationTime");
  const emissionTime = finite(root.emissionTime, "root.emissionTime");
  const distance = Math.hypot(
    receiver[0] - transmitter[0],
    receiver[1] - transmitter[1],
    receiver[2] - transmitter[2],
  );
  return Math.abs(distance - fieldSpeed * (observationTime - emissionTime));
}

export function describeDenseRootAuditContract() {
  return {
    schema: DENSE_ROOT_AUDIT_SCHEMA,
    packetSchema: DENSE_ROOT_PACKET_SCHEMA,
    authorshipBoundary:
      "separate geometric residual recomputation; no imports from the " +
      "prescribed-path causal-root evaluator",
    fieldSpeed: 1,
    residual:
      "abs(norm(receiverPosition-transmitterPositionAtEmission)" +
      "-fieldSpeed*(observationTime-emissionTime))",
    maximumRootResidual: MAXIMUM_ROOT_RESIDUAL,
    requiredPacketFields: [
      "manifestFileSha256",
      "protocolFileSha256",
      "rowId",
      "sampledSpecSha256",
      "inventoryCertification.certifiedComplete",
      "inventoryCertification.expectedTransmitterCount",
      "inventoryCertification.observedTransmitterCount",
      "roots[].transmitterId",
      "roots[].rootOrdinal",
      "roots[].rootCompletenessStatus",
      "roots[].observationTime",
      "roots[].emissionTime",
      "roots[].receiverPosition",
      "roots[].transmitterPositionAtEmission",
    ],
    failClosedDispositions: {
      incompleteInventory: "inapplicable-member-score",
      missingOrUncertifiedRoot: "unknown-numerical",
      residualAboveTolerance: "unknown-numerical",
      malformedOrIdentityMismatch: "invalid-manifest-row",
    },
    nullScoreRule:
      "inapplicable-member-score, unknown-numerical, and " +
      "invalid-manifest-row always carry null scores",
    claimBoundary: {
      diagnosticOnly: true,
      sameImplementationReplayIsIndependentEvidence: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: [
        "stability",
        "retention",
        "binding",
        "energy closure",
        "particle identity",
        "physical realization",
      ],
    },
  };
}

export function auditDenseRootResidualPacket(packet, expectedIdentity) {
  if (!packet || typeof packet !== "object" || Array.isArray(packet)) {
    fail("dense root packet must be an object.");
  }
  if (packet.schema !== DENSE_ROOT_PACKET_SCHEMA) {
    fail(`dense root packet requires schema ${DENSE_ROOT_PACKET_SCHEMA}.`);
  }
  for (const key of [
    "manifestFileSha256",
    "protocolFileSha256",
    "rowId",
    "sampledSpecSha256",
  ]) {
    if (packet[key] !== expectedIdentity?.[key]) {
      return {
        admitted: false,
        disposition: "invalid-manifest-row",
        score: null,
        reason: `${key} differs from the frozen identity`,
      };
    }
  }
  if (packet.fieldSpeed !== 1) {
    return {
      admitted: false,
      disposition: "invalid-manifest-row",
      score: null,
      reason: "fieldSpeed must equal 1",
    };
  }
  const inventory = packet.inventoryCertification;
  if (!inventory || inventory.certifiedComplete !== true ||
      inventory.expectedTransmitterCount !== inventory.observedTransmitterCount) {
    return {
      admitted: false,
      disposition: "inapplicable-member-score",
      score: null,
      reason: "complete declared acceleration inventory is unavailable",
    };
  }
  if (!Array.isArray(packet.roots) || packet.roots.length === 0 ||
      packet.roots.some((root) =>
        root.rootCompletenessStatus !== "certified-complete")) {
    return {
      admitted: false,
      disposition: "unknown-numerical",
      score: null,
      reason: "one or more causal roots are missing or uncertified",
    };
  }
  const residuals = packet.roots.map((root) => rootResidual(root, 1));
  const maximumResidual = Math.max(...residuals);
  if (maximumResidual > MAXIMUM_ROOT_RESIDUAL) {
    return {
      admitted: false,
      disposition: "unknown-numerical",
      score: null,
      maximumRootResidual: maximumResidual,
      reason: "independent geometric causal-root residual exceeds tolerance",
    };
  }
  return {
    admitted: true,
    disposition: "dense-root-residual-admitted",
    score: null,
    rootCount: residuals.length,
    maximumRootResidual: maximumResidual,
    tolerance: MAXIMUM_ROOT_RESIDUAL,
    claimBoundary:
      "numerical dense-root admission only; not a solver, stability, " +
      "retention, binding, or physical claim",
  };
}

function runCli() {
  const command = process.argv[2];
  if (command !== "describe-contract") {
    fail(
      "BP-009 authorizes only describe-contract; dense packet audit execution " +
      "requires a separately authorized analytical row.",
    );
  }
  process.stdout.write(
    `${JSON.stringify(describeDenseRootAuditContract(), null, 2)}\n`,
  );
}

if (path.resolve(process.argv[1] ?? "") === SCRIPT_PATH) {
  try {
    runCli();
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}
