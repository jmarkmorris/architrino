CREATE TABLE database_generation (
  generation_hash BLOB PRIMARY KEY CHECK (length(generation_hash) = 32),
  registry_id TEXT NOT NULL,
  registry_hash BLOB NOT NULL CHECK (length(registry_hash) = 32),
  registry_artifact_hash BLOB NOT NULL REFERENCES artifact(artifact_hash),
  rebuild_instrument_version TEXT NOT NULL,
  required_campaign_count INTEGER NOT NULL CHECK (required_campaign_count >= 0),
  observed_campaign_count INTEGER NOT NULL CHECK (observed_campaign_count >= 0),
  required_candidate_count INTEGER NOT NULL CHECK (required_candidate_count >= 0),
  observed_candidate_count INTEGER NOT NULL CHECK (observed_candidate_count >= 0),
  accepted_candidate_count INTEGER NOT NULL CHECK (accepted_candidate_count >= 0),
  rejected_candidate_count INTEGER NOT NULL CHECK (rejected_candidate_count >= 0),
  evidence_hash BLOB NOT NULL CHECK (length(evidence_hash) = 32),
  evidence_json BLOB NOT NULL,
  completed_at TEXT NOT NULL
) STRICT, WITHOUT ROWID;

CREATE UNIQUE INDEX database_generation_registry
  ON database_generation(registry_hash, generation_hash);

PRAGMA user_version = 2;
