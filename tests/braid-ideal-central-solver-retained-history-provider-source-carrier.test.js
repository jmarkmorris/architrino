import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildCentralSolverRetainedHistoryProviderSourceCarrier,
  evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence,
  validateCentralSolverRetainedHistoryProviderSourceCarrier,
} from "../scripts/braid-ideal/central-solver-retained-history-provider-source-carrier.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/central-solver-retained-history-provider-source-carrier.mjs", import.meta.url)
);

test("central retained-history provider/source carrier is deterministic and fails closed at retained record binding", () => {
  const first = buildCentralSolverRetainedHistoryProviderSourceCarrier();
  const second = buildCentralSolverRetainedHistoryProviderSourceCarrier();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.artifact_status, "fail_closed_missing_retained_record_id");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.native_app_path_history_provenance.seed_path_row_count, 6);
  assert.equal(first.native_app_path_history_provenance.stream_manifest_count, 6);
  assert.equal(first.native_app_path_history_provenance.durable_stream_count, 0);
  assert.equal(first.native_app_root_ledger_provenance.required_root_replay_count, 36);
  assert.equal(first.accepted_retained_history_provider_source_carrier_ref, null);
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderSourceCarrier(first), []);
});

test("central retained-history provider/source carrier binds native/app path-history refs before source row evidence", () => {
  const retainedRecordId = "retained-record:held-release-six-point:provider-source-carrier";
  const artifact = buildCentralSolverRetainedHistoryProviderSourceCarrier({
    retainedRecordId,
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_source_row_id");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.same_record_binding.source_row_id"
  );
  assert.equal(artifact.same_record_binding.retained_record_id, retainedRecordId);
  assert.equal(artifact.same_record_binding.source_row_id, null);
  assert.equal(artifact.native_app_path_history_provenance.durable_stream_count, 6);
  assert.match(
    artifact.native_app_path_history_provenance.durable_stream_manifest_refs[0],
    /^candidate:native-app:path-history-stream-manifest:retainedminusrecord_heldminusreleaseminussixminuspoint_providerminussourceminuscarrier:0$/
  );
  assert.equal(
    artifact.native_app_path_history_provenance.source_surfaces[0].producer,
    "createPathHistoryStreamF64"
  );
  assert.equal(
    artifact.native_app_path_history_provenance.source_surfaces[1].native_struct,
    "PathHistoryRowF64"
  );
  assert.equal(
    artifact.central_solver_retained_source_adapter.first_missing_field,
    "central_solver_retained_source_adapter.same_record_binding.source_row_id"
  );
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderSourceCarrier(artifact), []);
});

test("central retained-history provider/source carrier binds one retained record across native/app path-history and root-ledger provenance", () => {
  const retainedRecordId = "retained-record:held-release-six-point:provider-source-carrier-full";
  const sourceRowId = "two-speed-preferred-row:u0.8:v0.2";
  const artifact = buildCentralSolverRetainedHistoryProviderSourceCarrier({
    retainedRecordId,
    sourceRowId,
  });

  assert.equal(
    artifact.artifact_status,
    "retained_history_provider_source_carrier_present_acceptance_blocked"
  );
  assert.equal(artifact.source_status, "candidate_retained_history_provider_source_carrier_unaccepted");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.acceptance_certificate_ref"
  );
  assert.equal(artifact.same_record_binding.retained_record_id, retainedRecordId);
  assert.equal(artifact.same_record_binding.source_row_id, sourceRowId);
  assert.match(
    artifact.same_record_binding.provider_object_ref,
    /^candidate:central_solver_retained_history_provider_object:[0-9a-f]{16}$/
  );
  assert.equal(artifact.native_app_path_history_provenance.durable_stream_count, 6);
  assert.equal(
    artifact.native_app_path_history_provenance.status,
    "candidate_native_app_path_history_streams_bound_unaccepted"
  );
  assert.equal(artifact.native_app_root_ledger_provenance.required_root_replay_count, 36);
  assert.equal(artifact.native_app_root_ledger_provenance.native_root_ledger_detail_ref_count, 36);
  assert.equal(artifact.native_app_root_ledger_provenance.causal_root_replay_ref_count, 36);
  assert.match(
    artifact.native_app_root_ledger_provenance.native_root_ledger_detail_refs[0],
    /^candidate:native-app:root-ledger-detail:retainedminusrecord_heldminusreleaseminussixminuspoint_providerminussourceminuscarrierminusfull:twominusspeedminuspreferredminusrow_u0_8_v0_2:0$/
  );
  assert.equal(
    artifact.native_app_root_ledger_provenance.source_surfaces[0].producer,
    "buildRootLedgerDetailF64WithModule"
  );
  assert.equal(
    artifact.native_app_root_ledger_provenance.source_surfaces[1].native_struct,
    "RootLedgerDetailRowF64"
  );
  assert.match(
    artifact.same_record_action_closure_ref,
    /^candidate:native-app:same-record-action-closure:retainedminusrecord_heldminusreleaseminussixminuspoint_providerminussourceminuscarrierminusfull:twominusspeedminuspreferredminusrow_u0_8_v0_2$/
  );
  assert.match(
    artifact.retained_wake_history_ref,
    /^candidate:native-app:retained-wake-history:retainedminusrecord_heldminusreleaseminussixminuspoint_providerminussourceminuscarrierminusfull:twominusspeedminuspreferredminusrow_u0_8_v0_2$/
  );
  assert.equal(
    artifact.central_solver_retained_source_adapter.artifact_status,
    "retained_source_adapter_present_acceptance_blocked"
  );
  assert.deepEqual(evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_retained_history_provider_source_carrier_evidence",
    first_missing_field: "central_solver_retained_source_adapter.acceptance_certificate_ref",
  });
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderSourceCarrier(artifact), []);
});

test("central retained-history provider/source carrier with a declared certificate still requires external accepted authority", () => {
  const artifact = buildCentralSolverRetainedHistoryProviderSourceCarrier({
    retainedRecordId: "retained-record:held-release-six-point:provider-source-carrier-certified",
    sourceRowId: "two-speed-preferred-row:u0.7:v0.3",
    acceptanceCertificateRef: "candidate:adapter-acceptance-certificate:provider-source-carrier-certified",
  });

  assert.equal(
    artifact.artifact_status,
    "retained_history_provider_source_carrier_declared_certificate_external_verification_required"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.external_accepted_authority_verification_ref"
  );
  assert.deepEqual(evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence(artifact), {
    accepted: false,
    reason: "external_accepted_authority_verification_missing",
    first_missing_field: "central_solver_retained_source_adapter.external_accepted_authority_verification_ref",
  });
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderSourceCarrier(artifact), []);
});

test("central retained-history provider/source carrier CLI emits the bound carrier artifact", () => {
  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--retained-record-id=retained-record:held-release-six-point:provider-source-carrier-cli",
      "--source-row-id=two-speed-preferred-row:u0.75:v0.25",
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const artifact = JSON.parse(output);

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "retained_history_provider_source_carrier_present_acceptance_blocked"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.acceptance_certificate_ref"
  );
  assert.equal(
    artifact.same_record_binding.retained_record_id,
    "retained-record:held-release-six-point:provider-source-carrier-cli"
  );
  assert.equal(artifact.same_record_binding.source_row_id, "two-speed-preferred-row:u0.75:v0.25");
  assert.equal(artifact.native_app_path_history_provenance.durable_stream_count, 6);
  assert.equal(artifact.native_app_root_ledger_provenance.native_root_ledger_detail_ref_count, 36);
  assert.equal(artifact.native_app_root_ledger_provenance.causal_root_replay_ref_count, 36);
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderSourceCarrier(artifact), []);
});

test("central retained-history provider/source carrier rejects generic metadata and non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }

  assert.deepEqual(evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence({ schema: "path-history-only.v0" }), {
    accepted: false,
    reason: "schema_not_central_solver_retained_history_provider_source_carrier_v0",
    first_missing_field: FIRST_MISSING_FIELD,
  });

  assert.deepEqual(
    evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence({
      schema: SCHEMA,
      same_record_binding: { retained_record_id: "retained-record:generic" },
      native_app_path_history_provenance: {
        durable_stream_manifest_refs: Array.from({ length: 6 }, (_, index) => `generic:path:${index}`),
      },
    }),
    {
      accepted: false,
      reason: "source_row_id_missing",
      first_missing_field: "central_solver_retained_source_adapter.same_record_binding.source_row_id",
    }
  );
});
