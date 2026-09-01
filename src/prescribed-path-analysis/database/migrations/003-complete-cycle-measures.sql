CREATE TABLE methodology_coverage (
  coverage_hash BLOB PRIMARY KEY CHECK (length(coverage_hash) = 32),
  coverage_id TEXT NOT NULL,
  methodology_path TEXT NOT NULL,
  methodology_sha256 BLOB NOT NULL CHECK (length(methodology_sha256) = 32),
  impact_review TEXT NOT NULL,
  reduction_versions_json BLOB NOT NULL,
  canonical_json BLOB NOT NULL
) STRICT, WITHOUT ROWID;

CREATE TABLE analytical_raw_artifact (
  compressed_hash BLOB PRIMARY KEY CHECK (length(compressed_hash) = 32),
  raw_hash BLOB NOT NULL CHECK (length(raw_hash) = 32),
  artifact_hash BLOB NOT NULL REFERENCES artifact(artifact_hash),
  manifest_hash BLOB NOT NULL REFERENCES campaign_manifest(manifest_hash),
  candidate_id TEXT NOT NULL,
  artifact_kind TEXT NOT NULL,
  relative_path TEXT NOT NULL,
  enclosing_radius REAL,
  resolution TEXT,
  time_sample INTEGER,
  sensitivity_coordinate TEXT,
  stencil TEXT,
  raw_bytes INTEGER NOT NULL CHECK (raw_bytes > 0),
  stored_bytes INTEGER NOT NULL CHECK (stored_bytes > 0),
  context_json BLOB NOT NULL,
  UNIQUE (manifest_hash, relative_path)
) STRICT, WITHOUT ROWID;

CREATE INDEX raw_artifact_candidate
  ON analytical_raw_artifact(manifest_hash, candidate_id, artifact_kind);
CREATE INDEX raw_artifact_event_filter
  ON analytical_raw_artifact(
    manifest_hash, candidate_id, enclosing_radius, resolution, time_sample,
    sensitivity_coordinate, stencil
  );

CREATE TABLE multidimensional_measure (
  row_hash BLOB PRIMARY KEY CHECK (length(row_hash) = 32),
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  measure_id TEXT NOT NULL,
  reduction_version TEXT NOT NULL,
  disposition TEXT NOT NULL CHECK (
    disposition IN ('accepted', 'rejected', 'below-floor', 'diagnostic-only')
  ),
  scalar_value REAL,
  unit TEXT NOT NULL,
  probe_id TEXT,
  probe_polarity REAL,
  enclosing_radius REAL,
  resolution TEXT,
  time_sample INTEGER,
  temporal_harmonic INTEGER,
  angular_degree INTEGER,
  angular_order INTEGER,
  transmitter_id TEXT,
  root_ordinal INTEGER,
  sensitivity_coordinate TEXT,
  stencil TEXT,
  real_part REAL,
  imaginary_part REAL,
  magnitude REAL,
  normalization TEXT,
  coefficient_floor REAL,
  numerical_uncertainty REAL,
  details_json BLOB NOT NULL
) STRICT, WITHOUT ROWID;

CREATE INDEX multidimensional_measure_query
  ON multidimensional_measure(
    measure_id, disposition, enclosing_radius, resolution,
    temporal_harmonic, angular_degree, angular_order, probe_polarity
  );

CREATE INDEX multidimensional_measure_source_root
  ON multidimensional_measure(
    transmitter_id, root_ordinal, measure_id, result_hash
  );

CREATE INDEX multidimensional_measure_sensitivity
  ON multidimensional_measure(
    sensitivity_coordinate, stencil, measure_id, result_hash
  );

CREATE TABLE database_generation_case (
  generation_hash BLOB NOT NULL REFERENCES database_generation(generation_hash),
  manifest_hash BLOB NOT NULL REFERENCES campaign_manifest(manifest_hash),
  result_hash BLOB NOT NULL REFERENCES case_result(result_hash),
  case_id TEXT NOT NULL,
  assembly_id TEXT NOT NULL,
  model_revision_sha256 TEXT NOT NULL CHECK (length(model_revision_sha256) = 64),
  source_slug TEXT NOT NULL,
  source_hash BLOB NOT NULL REFERENCES source_record(source_hash),
  protocol_hash BLOB NOT NULL REFERENCES analysis_protocol(protocol_hash),
  acceptance_state TEXT NOT NULL CHECK (acceptance_state IN ('accepted', 'rejected')),
  failed_gate TEXT,
  PRIMARY KEY (generation_hash, result_hash)
) STRICT, WITHOUT ROWID;

CREATE INDEX generation_case_filter
  ON database_generation_case(
    generation_hash, assembly_id, model_revision_sha256, source_slug,
    acceptance_state, failed_gate
  );

PRAGMA user_version = 3;
