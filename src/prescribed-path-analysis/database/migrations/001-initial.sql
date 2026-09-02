CREATE TABLE schema_migration (
  migration_id TEXT PRIMARY KEY,
  migration_ordinal INTEGER NOT NULL UNIQUE CHECK (migration_ordinal > 0),
  checksum BLOB NOT NULL CHECK (length(checksum) = 32),
  applied_at TEXT NOT NULL,
  tool_version TEXT NOT NULL
) STRICT;

CREATE TABLE artifact (
  artifact_hash BLOB PRIMARY KEY CHECK (length(artifact_hash) = 32),
  artifact_kind TEXT NOT NULL,
  media_type TEXT NOT NULL,
  codec TEXT NOT NULL CHECK (codec IN ('identity', 'gzip')),
  raw_bytes INTEGER NOT NULL CHECK (raw_bytes >= 0),
  stored_bytes INTEGER NOT NULL CHECK (stored_bytes >= 0),
  payload BLOB NOT NULL,
  created_by TEXT NOT NULL
) STRICT, WITHOUT ROWID;

CREATE TABLE source_record (
  source_hash BLOB PRIMARY KEY CHECK (length(source_hash) = 32),
  record_id TEXT NOT NULL,
  source_schema TEXT,
  exact_source_record_schema TEXT,
  engine_id TEXT NOT NULL,
  engine_version TEXT,
  assembly_id TEXT NOT NULL,
  model_revision_sha256 TEXT NOT NULL CHECK (length(model_revision_sha256) = 64),
  source_slug TEXT NOT NULL,
  source_envelope_json BLOB NOT NULL,
  exact_source_artifact_hash BLOB REFERENCES artifact(artifact_hash),
  source_hash_verification_state TEXT NOT NULL CHECK (
    source_hash_verification_state IN ('exact-preimage-verified', 'packet-bound')
  )
) STRICT, WITHOUT ROWID;

CREATE INDEX source_exact_configuration
  ON source_record(assembly_id, model_revision_sha256, source_slug, source_hash);
CREATE INDEX source_identity_drift
  ON source_record(record_id, source_hash);

CREATE TABLE analysis_protocol (
  protocol_hash BLOB PRIMARY KEY CHECK (length(protocol_hash) = 32),
  protocol_id TEXT NOT NULL,
  schema_id TEXT NOT NULL,
  canonical_json BLOB NOT NULL,
  field_speed REAL NOT NULL,
  coupling REAL NOT NULL,
  root_policy_id TEXT NOT NULL,
  primary_root_tolerance REAL NOT NULL,
  refined_root_tolerance REAL NOT NULL,
  root_transversality_floor REAL NOT NULL,
  minimum_separation_floor REAL NOT NULL,
  convergence_absolute REAL NOT NULL
) STRICT, WITHOUT ROWID;

CREATE INDEX protocol_identity_drift
  ON analysis_protocol(protocol_id, protocol_hash);

CREATE TABLE campaign_manifest (
  manifest_hash BLOB PRIMARY KEY CHECK (length(manifest_hash) = 32),
  campaign_id TEXT NOT NULL,
  schema_id TEXT NOT NULL,
  campaign_stage TEXT,
  manifest_filename TEXT NOT NULL,
  packet_directory TEXT NOT NULL,
  summary_filename TEXT NOT NULL,
  seed_algorithm TEXT,
  seed_token TEXT,
  required_total_case_count INTEGER NOT NULL CHECK (required_total_case_count >= 0),
  required_anchor_count INTEGER NOT NULL CHECK (required_anchor_count >= 0),
  required_seeded_sample_count INTEGER NOT NULL CHECK (
    required_seeded_sample_count >= 0
  ),
  common_protocol_hash BLOB NOT NULL REFERENCES analysis_protocol(protocol_hash),
  acceptance_policy_json BLOB,
  artifact_hash BLOB NOT NULL REFERENCES artifact(artifact_hash)
) STRICT, WITHOUT ROWID;

CREATE INDEX campaign_identity_drift
  ON campaign_manifest(campaign_id, manifest_hash);

CREATE TABLE campaign_summary (
  summary_hash BLOB PRIMARY KEY CHECK (length(summary_hash) = 32),
  manifest_hash BLOB NOT NULL UNIQUE REFERENCES campaign_manifest(manifest_hash),
  schema_id TEXT NOT NULL,
  producer_status_json BLOB NOT NULL,
  producer_acceptance_json BLOB,
  artifact_hash BLOB NOT NULL REFERENCES artifact(artifact_hash)
) STRICT, WITHOUT ROWID;

CREATE TABLE configuration (
  configuration_hash BLOB PRIMARY KEY CHECK (length(configuration_hash) = 32),
  assembly_id TEXT NOT NULL,
  model_revision_sha256 TEXT NOT NULL CHECK (length(model_revision_sha256) = 64),
  source_slug TEXT NOT NULL,
  parameter_vector_json BLOB NOT NULL,
  coordinate_definition TEXT NOT NULL,
  alpha_1 REAL,
  alpha_2 REAL,
  alpha_3 REAL
) STRICT, WITHOUT ROWID;

CREATE INDEX configuration_exact_range
  ON configuration(
    assembly_id, model_revision_sha256, source_slug, alpha_1, alpha_2, alpha_3
  );

CREATE TABLE case_result (
  result_hash BLOB PRIMARY KEY CHECK (length(result_hash) = 32),
  source_hash BLOB NOT NULL REFERENCES source_record(source_hash),
  protocol_hash BLOB NOT NULL REFERENCES analysis_protocol(protocol_hash),
  evaluator_id TEXT NOT NULL,
  evaluator_version TEXT NOT NULL,
  packet_schema TEXT NOT NULL,
  refinement_id TEXT NOT NULL DEFAULT 'primary',
  artifact_hash BLOB NOT NULL REFERENCES artifact(artifact_hash),
  completeness_state TEXT NOT NULL CHECK (
    completeness_state IN ('complete', 'rejected', 'quarantined')
  ),
  producer_status_code TEXT,
  producer_status_json BLOB NOT NULL,
  UNIQUE (
    source_hash,
    protocol_hash,
    evaluator_id,
    evaluator_version,
    refinement_id
  )
) STRICT, WITHOUT ROWID;

CREATE TABLE campaign_case (
  manifest_hash BLOB NOT NULL REFERENCES campaign_manifest(manifest_hash),
  case_ordinal INTEGER NOT NULL CHECK (case_ordinal >= 0),
  case_id TEXT NOT NULL,
  case_type TEXT NOT NULL,
  configuration_hash BLOB NOT NULL REFERENCES configuration(configuration_hash),
  source_hash BLOB NOT NULL REFERENCES source_record(source_hash),
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  packet_filename TEXT NOT NULL,
  summary_case_json BLOB NOT NULL,
  sample_index INTEGER,
  strata_json BLOB,
  unit_coordinates_json BLOB,
  PRIMARY KEY (manifest_hash, case_ordinal),
  UNIQUE (manifest_hash, case_id),
  UNIQUE (manifest_hash, result_hash)
) STRICT, WITHOUT ROWID;

CREATE INDEX campaign_enumeration
  ON campaign_case(manifest_hash, case_ordinal, result_hash);

CREATE TABLE observation_event (
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  event_ordinal INTEGER NOT NULL CHECK (event_ordinal >= 0),
  event_id TEXT NOT NULL,
  probe_id TEXT NOT NULL,
  observation_time REAL NOT NULL,
  root_count INTEGER NOT NULL CHECK (root_count >= 0),
  no_root_count INTEGER NOT NULL CHECK (no_root_count >= 0),
  signed_wake REAL NOT NULL,
  unsigned_wake REAL NOT NULL,
  signed_cancellation_ratio REAL NOT NULL,
  root_transversality_margin REAL,
  maximum_root_residual REAL NOT NULL,
  PRIMARY KEY (result_hash, event_ordinal),
  UNIQUE (result_hash, event_id)
) STRICT, WITHOUT ROWID;

CREATE TABLE case_reduced_measure (
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  measure_id TEXT NOT NULL,
  reduction_version TEXT NOT NULL,
  scalar_value REAL NOT NULL,
  unit TEXT NOT NULL,
  source_row_count INTEGER NOT NULL CHECK (source_row_count >= 0),
  PRIMARY KEY (result_hash, measure_id, reduction_version)
) STRICT, WITHOUT ROWID;

CREATE INDEX measure_distribution
  ON case_reduced_measure(measure_id, scalar_value, result_hash);

CREATE TABLE validity_gate_result (
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  gate_id TEXT NOT NULL,
  gate_instrument_version TEXT NOT NULL,
  measured_value REAL,
  comparator TEXT NOT NULL,
  threshold_value REAL,
  independent_pass INTEGER NOT NULL CHECK (independent_pass IN (0, 1)),
  evidence_hash BLOB NOT NULL CHECK (length(evidence_hash) = 32),
  failure_code TEXT,
  evidence_json BLOB NOT NULL,
  PRIMARY KEY (result_hash, gate_id, gate_instrument_version)
) STRICT, WITHOUT ROWID;

CREATE INDEX marginal_gate
  ON validity_gate_result(
    gate_id,
    independent_pass,
    measured_value,
    result_hash
  );

CREATE TABLE case_acceptance (
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  acceptance_instrument_version TEXT NOT NULL,
  accepted INTEGER NOT NULL CHECK (accepted IN (0, 1)),
  evidence_hash BLOB NOT NULL CHECK (length(evidence_hash) = 32),
  evidence_json BLOB NOT NULL,
  PRIMARY KEY (result_hash, acceptance_instrument_version)
) STRICT, WITHOUT ROWID;

CREATE TABLE campaign_acceptance (
  manifest_hash BLOB NOT NULL REFERENCES campaign_manifest(manifest_hash),
  acceptance_instrument_version TEXT NOT NULL,
  accepted INTEGER NOT NULL CHECK (accepted IN (0, 1)),
  required_case_count INTEGER NOT NULL CHECK (required_case_count >= 0),
  observed_case_count INTEGER NOT NULL CHECK (observed_case_count >= 0),
  accepted_case_count INTEGER NOT NULL CHECK (accepted_case_count >= 0),
  evidence_hash BLOB NOT NULL CHECK (length(evidence_hash) = 32),
  evidence_json BLOB NOT NULL,
  PRIMARY KEY (manifest_hash, acceptance_instrument_version)
) STRICT, WITHOUT ROWID;

CREATE TABLE ingest_batch (
  ingest_batch_id BLOB PRIMARY KEY CHECK (length(ingest_batch_id) = 32),
  manifest_hash BLOB NOT NULL REFERENCES campaign_manifest(manifest_hash),
  importer_version TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('in-progress', 'complete', 'failed')),
  last_committed_ordinal INTEGER NOT NULL,
  source_case_count INTEGER NOT NULL CHECK (source_case_count >= 0),
  committed_case_count INTEGER NOT NULL CHECK (committed_case_count >= 0),
  error_code TEXT,
  started_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT, WITHOUT ROWID;

CREATE VIEW accepted_case AS
SELECT
  campaign_case.manifest_hash,
  campaign_case.case_ordinal,
  campaign_case.case_id,
  campaign_case.case_type,
  campaign_case.configuration_hash,
  campaign_case.source_hash,
  campaign_case.result_hash
FROM campaign_case
JOIN case_result USING (result_hash)
JOIN case_acceptance USING (result_hash)
JOIN campaign_acceptance USING (manifest_hash)
WHERE case_result.completeness_state = 'complete'
  AND case_acceptance.accepted = 1
  AND campaign_acceptance.accepted = 1
  AND case_acceptance.acceptance_instrument_version =
    'prescribed-record-independent-acceptance/v1'
  AND campaign_acceptance.acceptance_instrument_version =
    'prescribed-record-independent-acceptance/v1';

PRAGMA user_version = 1;
