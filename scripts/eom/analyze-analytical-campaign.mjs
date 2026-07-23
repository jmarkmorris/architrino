#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { gunzipSync } from "node:zlib";

import {
  defaultAnalyticalCampaignDatabasePath,
} from "../../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

const SUMMARY_METRICS = [
  {
    measureId: "external-exposure/L_ext",
    ordering: "ascending",
    interpretation: "lower exterior net acceleration-response power",
  },
  {
    measureId: "external-exposure/L_raw",
    ordering: "descending",
    interpretation: "largest uncancelled reference magnitude; descriptive, not an objective",
  },
  {
    measureId: "external-exposure/eta_ext",
    ordering: "ascending",
    interpretation: "lower exterior acceleration-response cancellation ratio",
  },
  {
    measureId: "normal-wake-flux/signed-cycle-integral",
    ordering: "absolute-ascending",
    interpretation: "closest signed complete-cycle flux to zero",
  },
  {
    measureId: "normal-wake-flux/raw-cycle-integral",
    ordering: "reference-residual-ascending",
    interpretation: "closest to the declared charge-count reference; diagnostic, not an objective",
  },
  {
    measureId: "normal-wake-flux/residual-cycle-integral",
    ordering: "ascending",
    interpretation: "lower residual wake crossing; source-count dependent",
  },
  {
    measureId: "normal-wake-flux/eta",
    ordering: "ascending",
    interpretation: "lower normalized wake-flux cancellation ratio",
  },
];

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  const values = new Map();
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    const value = args[index + 1];
    if (!value || value.startsWith("--")) fail(`${key} requires a value.`);
    if (values.has(key)) fail(`${key} was supplied more than once.`);
    values.set(key, value);
    index += 1;
  }
  const top = Number(values.get("--top") ?? 5);
  if (!Number.isSafeInteger(top) || top < 1) fail("--top must be a positive integer.");
  return {
    databasePath: path.resolve(
      values.get("--database") ?? defaultAnalyticalCampaignDatabasePath(),
    ),
    profilePath: values.has("--profile")
      ? path.resolve(values.get("--profile"))
      : null,
    top,
  };
}

function hashHex(hash) {
  return Buffer.from(hash).toString("hex");
}

function decodeArtifact(row) {
  const bytes = row.codec === "gzip" ? gunzipSync(row.payload) : row.payload;
  return JSON.parse(bytes.toString("utf8"));
}

function compactSurfaceGate(gate) {
  return {
    passed: gate.passed,
    threshold: gate.threshold,
    maximumChange: gate.maximumChange,
    ...(gate.identityMatch === undefined
      ? {}
      : { identityMatch: gate.identityMatch }),
  };
}

function compactEventValidity(validity) {
  if (!validity) return null;
  return {
    passed: validity.passed,
    rootTopologyComplete: validity.rootTopologyComplete,
    rootTransversalityPassed: validity.rootTransversalityPassed,
    minimumSeparationPassed: validity.minimumSeparationPassed,
    numericalConvergencePassed: validity.numericalConvergencePassed,
    failedChecks: [
      ["root-topology-completeness", validity.rootTopologyComplete],
      ["root-transversality", validity.rootTransversalityPassed],
      ["minimum-separation", validity.minimumSeparationPassed],
      ["numerical-convergence", validity.numericalConvergencePassed],
    ].filter(([, passed]) => !passed).map(([check]) => check),
  };
}

function rawReference(row) {
  return row.familyId === "C" ? 48 : 24;
}

function rankMetric(definition, rows, top) {
  const ranked = [...rows];
  ranked.sort((left, right) => {
    if (definition.ordering === "descending") {
      return right.value - left.value;
    }
    if (definition.ordering === "absolute-ascending") {
      return Math.abs(left.value) - Math.abs(right.value);
    }
    if (definition.ordering === "reference-residual-ascending") {
      return Math.abs(left.value - rawReference(left)) -
        Math.abs(right.value - rawReference(right));
    }
    return left.value - right.value;
  });
  return {
    measureId: definition.measureId,
    ordering: definition.ordering,
    interpretation: definition.interpretation,
    leaders: ranked.slice(0, top).map((row, index) => ({
      rank: index + 1,
      ...row,
      ...(definition.ordering === "reference-residual-ascending"
        ? {
            referenceValue: rawReference(row),
            absoluteReferenceResidual: Math.abs(row.value - rawReference(row)),
          }
        : {}),
    })),
  };
}

function summarizeProfile(profilePath) {
  if (!profilePath) {
    return {
      status: "timing-profile-not-supplied",
      falsifier:
        "No speedup claim is licensed until a rebuild report with measured runtimeProfile data is supplied through --profile.",
    };
  }
  const profile = JSON.parse(readFileSync(profilePath, "utf8"));
  if (!profile.runtimeProfile) {
    fail(`${profilePath} does not contain runtimeProfile data.`);
  }
  return {
    status: "measured-profile-loaded",
    profilePath,
    ...profile.runtimeProfile,
  };
}

export function analyzeAnalyticalCampaignDatabase(databasePath, options = {}) {
  const top = options.top ?? 5;
  const database = new DatabaseSync(path.resolve(databasePath), { readOnly: true });
  try {
    const generation = database.prepare(`
      SELECT generation_hash, registry_id, completed_at,
             accepted_candidate_count, rejected_candidate_count
      FROM database_generation
      ORDER BY completed_at DESC
      LIMIT 1
    `).get();
    if (!generation) fail("the analytical campaign database has no generation.");

    const candidates = database.prepare(`
      SELECT g.case_id, g.family_id, g.member_id, g.acceptance_state,
             g.failed_gate, g.result_hash, a.codec, a.payload
      FROM database_generation_case AS g
      JOIN case_result AS r USING (result_hash)
      JOIN artifact AS a ON a.artifact_hash = r.artifact_hash
      WHERE g.generation_hash = ?
      ORDER BY g.family_id, g.member_id, g.case_id
    `).all(generation.generation_hash).map((row) => ({
      ...row,
      packet: decodeArtifact(row),
    }));

    const gateFailureCounts = new Map();
    const rejectionDetails = [];
    const rawContextStatement = database.prepare(`
      SELECT artifact_hash, context_json
      FROM analytical_raw_artifact
      WHERE candidate_id = ?
    `);
    const artifactStatement = database.prepare(`
      SELECT codec, payload FROM artifact WHERE artifact_hash = ?
    `);
    function fixedValidity(candidateId, refinement) {
      const descriptor = rawContextStatement.all(candidateId).find((row) => {
        const context = JSON.parse(Buffer.from(row.context_json).toString("utf8"));
        return context.stage === "complete-cycle-internal-fixed" &&
          context.refinement === refinement;
      });
      if (!descriptor) return null;
      return compactEventValidity(
        decodeArtifact(artifactStatement.get(descriptor.artifact_hash))
          .reducedMeasures.validity,
      );
    }
    for (const candidate of candidates) {
      const failedGates = candidate.packet.status.failedGates;
      for (const gate of failedGates) {
        gateFailureCounts.set(gate, (gateFailureCounts.get(gate) ?? 0) + 1);
      }
      if (candidate.acceptance_state === "accepted") continue;
      const surfaceGates = candidate.packet.convergenceComparisons
        .surface.quadrature.gates;
      const sensitivity = candidate.packet.diagnosticReductions.sourceSensitivity;
      rejectionDetails.push({
        candidateId: candidate.case_id,
        familyId: candidate.family_id,
        memberId: candidate.member_id,
        failedGates,
        firstIndexedFailedGate: candidate.failed_gate,
        failedSurfaceSubgates: Object.entries(surfaceGates)
          .filter(([, gate]) => !gate.passed)
          .map(([gateId, gate]) => ({ gateId, ...compactSurfaceGate(gate) })),
        fixedInternalPrimaryValidity: failedGates.includes("fixedInternalPrimary")
          ? fixedValidity(candidate.case_id, "primary")
          : null,
        fixedInternalRefinedValidity: failedGates.includes("fixedInternalRefined")
          ? fixedValidity(candidate.case_id, "refined")
          : null,
        movingReceiverPrimaryValidity: failedGates.includes("movingReceiverPrimary")
          ? compactEventValidity(
              candidate.packet.diagnosticReductions.internalReceivers.primary.validity,
            )
          : null,
        movingReceiverRefinedValidity: failedGates.includes("movingReceiverRefined")
          ? compactEventValidity(
              candidate.packet.diagnosticReductions.internalReceivers.refined.validity,
            )
          : null,
        sensitivity: {
          accepted: sensitivity.accepted,
          failureCode: sensitivity.failureCode,
          topologyMatch: sensitivity.topologyMatch,
          maximumUncertainty: sensitivity.maximumUncertainty,
          threshold: sensitivity.threshold,
          rejectedPerturbationCount: (sensitivity.perturbedSources ?? [])
            .filter((row) => !row.accepted).length,
        },
      });
    }

    const placeholders = SUMMARY_METRICS.map(() => "?").join(", ");
    const measures = database.prepare(`
      SELECT g.case_id, g.family_id, g.member_id, g.acceptance_state,
             m.measure_id, m.scalar_value, m.unit, m.disposition
      FROM database_generation_case AS g
      JOIN multidimensional_measure AS m USING (result_hash)
      WHERE g.generation_hash = ?
        AND m.resolution IS NULL
        AND m.enclosing_radius = 2
        AND m.measure_id IN (${placeholders})
        AND (m.probe_polarity IS NULL OR m.probe_polarity = 1)
    `).all(
      generation.generation_hash,
      ...SUMMARY_METRICS.map((row) => row.measureId),
    ).map((row) => ({
      measureId: row.measure_id,
      candidateId: row.case_id,
      familyId: row.family_id,
      memberId: row.member_id,
      acceptance: row.acceptance_state,
      disposition: row.disposition,
      value: row.scalar_value,
      unit: row.unit,
    }));

    const workloadRows = database.prepare(`
      SELECT raw_hash, artifact_kind, raw_bytes, stored_bytes, context_json
      FROM analytical_raw_artifact
      WHERE manifest_hash IN (
        SELECT DISTINCT manifest_hash
        FROM database_generation_case
        WHERE generation_hash = ?
      )
    `).all(generation.generation_hash);
    const workloadByStage = new Map();
    for (const row of workloadRows) {
      const context = JSON.parse(Buffer.from(row.context_json).toString("utf8"));
      const stage = context.stage ?? row.artifact_kind;
      const current = workloadByStage.get(stage) ?? {
        stage,
        artifactCount: 0,
        rawBytes: 0,
        storedBytes: 0,
      };
      current.artifactCount += 1;
      current.rawBytes += row.raw_bytes;
      current.storedBytes += row.stored_bytes;
      workloadByStage.set(stage, current);
    }
    const distinctRawHashes = new Set(workloadRows.map((row) => hashHex(row.raw_hash)));

    return {
      schema: "prescribed-record-analytics/campaign-analysis-report.v1",
      databasePath: path.resolve(databasePath),
      generationHash: hashHex(generation.generation_hash),
      registryId: generation.registry_id,
      completedAt: generation.completed_at,
      claimBoundary: {
        pathEvolutionInvoked: false,
        eomSolverInvoked: false,
        excludedClaims: ["stability", "energy", "retention", "physical-realization"],
        rejectedMeasuresAreDiagnosticOnly: true,
      },
      acceptanceSummary: {
        accepted: Number(generation.accepted_candidate_count),
        rejected: Number(generation.rejected_candidate_count),
        acceptedCandidates: candidates
          .filter((row) => row.acceptance_state === "accepted")
          .map((row) => ({
            memberId: row.member_id,
            candidateId: row.case_id,
            passedGates: Object.keys(row.packet.gates),
          })),
        gateFailureCounts: Object.fromEntries(
          [...gateFailureCounts].sort(([left], [right]) => left.localeCompare(right)),
        ),
      },
      rejectionDetails,
      rankings: SUMMARY_METRICS.map((definition) => rankMetric(
        definition,
        measures.filter((row) => row.measureId === definition.measureId),
        top,
      )),
      workload: {
        rawArtifactCount: workloadRows.length,
        distinctRawHashCount: distinctRawHashes.size,
        duplicateRawArtifactCount: workloadRows.length - distinctRawHashes.size,
        byStage: [...workloadByStage.values()]
          .sort((left, right) => right.storedBytes - left.storedBytes),
      },
      runtimeProfile: summarizeProfile(options.profilePath ?? null),
      optimizationBoundary: {
        measuredDatabaseWorkload: true,
        measuredRuntimeProfile: Boolean(options.profilePath),
        projectedSpeedup: null,
        nextExperiment:
          "Measure a serial rebuild profile, then compare candidate-level worker parallelism at fixed protocol and identical generation fingerprint.",
      },
    };
  } finally {
    database.close();
  }
}

function runCli() {
  const options = parseArguments(process.argv.slice(2));
  process.stdout.write(`${JSON.stringify(analyzeAnalyticalCampaignDatabase(
    options.databasePath,
    options,
  ), null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  runCli();
}
