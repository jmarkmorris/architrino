CREATE TABLE compact_schema_migration (
  migration_id TEXT PRIMARY KEY,
  migration_ordinal INTEGER NOT NULL UNIQUE,
  checksum_sha256 TEXT NOT NULL,
  tool_version TEXT NOT NULL
) STRICT;

CREATE TABLE compact_campaign (
  campaign_hash TEXT PRIMARY KEY,
  schema_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  protocol_hash TEXT NOT NULL,
  implementation_hash TEXT NOT NULL,
  claim_grade TEXT NOT NULL,
  diagnostic_only INTEGER NOT NULL CHECK (diagnostic_only IN (0, 1)),
  independent_acceptance_performed INTEGER NOT NULL
    CHECK (independent_acceptance_performed IN (0, 1)),
  path_evolution_invoked INTEGER NOT NULL
    CHECK (path_evolution_invoked IN (0, 1)),
  eom_solver_invoked INTEGER NOT NULL
    CHECK (eom_solver_invoked IN (0, 1)),
  case_count INTEGER NOT NULL CHECK (case_count >= 0),
  drawn_count INTEGER NOT NULL CHECK (drawn_count >= 0),
  evaluated_count INTEGER NOT NULL CHECK (evaluated_count >= 0),
  not_evaluated_count INTEGER NOT NULL CHECK (not_evaluated_count >= 0),
  header_json_sha256 TEXT NOT NULL,
  header_json TEXT NOT NULL CHECK (json_valid(header_json))
) STRICT;

CREATE TABLE compact_case (
  campaign_hash TEXT NOT NULL
    REFERENCES compact_campaign(campaign_hash) ON DELETE RESTRICT,
  output_ordinal INTEGER NOT NULL CHECK (output_ordinal >= 0),
  case_hash TEXT NOT NULL,
  schema_id TEXT NOT NULL,
  case_id TEXT NOT NULL,
  assembly_id TEXT NOT NULL,
  model_revision_sha256 TEXT NOT NULL,
  source_slug TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  sample_ordinal INTEGER NOT NULL CHECK (sample_ordinal >= 0),
  sampled_spec_hash TEXT NOT NULL,
  exact_source_hash TEXT NOT NULL,
  protocol_hash TEXT NOT NULL,
  implementation_hash TEXT NOT NULL,
  score_hash TEXT,
  status_code TEXT NOT NULL,
  score_status_code TEXT,
  evaluated INTEGER NOT NULL CHECK (evaluated IN (0, 1)),
  passed INTEGER CHECK (passed IS NULL OR passed IN (0, 1)),
  reason_code TEXT,
  wall_seconds REAL,
  user_cpu_seconds REAL,
  system_cpu_seconds REAL,
  retained_case_bytes INTEGER,
  score_json TEXT CHECK (score_json IS NULL OR json_valid(score_json)),
  evaluation_status_json TEXT NOT NULL CHECK (json_valid(evaluation_status_json)),
  verification_receipt_json TEXT
    CHECK (verification_receipt_json IS NULL OR json_valid(verification_receipt_json)),
  row_json_sha256 TEXT NOT NULL,
  row_json TEXT NOT NULL CHECK (json_valid(row_json)),
  PRIMARY KEY (campaign_hash, case_id),
  UNIQUE (campaign_hash, output_ordinal),
  UNIQUE (campaign_hash, case_hash)
) STRICT;

CREATE INDEX compact_campaign_id
  ON compact_campaign(campaign_id, campaign_hash);
CREATE INDEX compact_case_exact_configuration
  ON compact_case(assembly_id, model_revision_sha256, source_slug, sample_ordinal, campaign_hash);
CREATE INDEX compact_case_status
  ON compact_case(status_code, reason_code, assembly_id, model_revision_sha256);
CREATE INDEX compact_case_score_status
  ON compact_case(score_status_code, assembly_id, model_revision_sha256)
  WHERE score_status_code IS NOT NULL;
CREATE INDEX compact_case_source
  ON compact_case(exact_source_hash, sampled_spec_hash);
CREATE INDEX compact_case_score
  ON compact_case(score_hash)
  WHERE score_hash IS NOT NULL;

PRAGMA user_version = 1;
