# Prescribed-Path Analytical Campaign Performance

## Purpose and boundary

This packet owns the measured performance and scalability investigation for the
all-candidate prescribed-path analytical campaign.

The optimization objective is to reduce wall-clock time, computation,
database-load time, stored bytes, and peak resource use while preserving:

- exact source, protocol, result, raw-packet, manifest, generation, and export
  identity;
- independently recomputed acceptance;
- raw-ledger reconstruction and provenance;
- deterministic export;
- SQLite integrity and foreign-key verification;
- atomic publication; and
- the prescribed-path boundary: no path evolution and no EOM solver.

Performance measurements do not establish mathematical correctness. Same-output
comparisons establish determinism and implementation equivalence only.

Large reports and disposable databases remain outside Git. The current local
report root is `.local-data/braid-analysis/performance/`; disposable write-heavy
runs use `/private/tmp/architrino-analytical-campaign-pipeline-benchmarks/`.

## Live workload snapshot

Measured from the published generation completed at
`2026-07-23T00:55:22.565Z`:

| Quantity | Value |
| --- | ---: |
| Candidates | 19 |
| Independently accepted | 3 |
| Independently rejected | 16 |
| Raw analytical artifacts | 13,927 |
| Distinct raw hashes | 13,927 |
| Raw JSON bytes | 77,106,540,648 |
| Stored gzip bytes | 9,148,969,914 |
| Compression ratio | 0.118654 |
| SQLite bytes | 9,677,225,984 |
| `multidimensional_measure` rows | 278,824 |
| SQLite page size | 4,096 bytes |
| SQLite pages | 2,362,604 |
| WAL bytes at inspection | 0 |

The older 17-candidate, 11-accepted snapshot is not the current performance
fixture.

## Exact end-to-end call graph

The live `rebuild-all` path is:

1. `scripts/eom/analytical-campaign-database.mjs`
   - `runCli()`
   - `rebuildAllCandidateAnalyticalDatabase()`
2. `src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs`
   - create rebuild lock and unique staging directory;
   - `buildAllCandidateAnalyticalCampaign()`;
   - `writeAllCandidateAnalyticalCampaign()`;
   - `importAnalyticalCampaign()` for the generated campaign and every
     registry-declared checked campaign;
   - `assertStagedCompleteness()`;
   - `deterministicExportCheck()` -> `exportAnalyticalCampaign()`;
   - `recordAnalyticalDatabaseGeneration()`;
   - `verifyAnalyticalCampaignDatabase()`;
   - check mode: discard staging;
   - publish mode only: `publishDatabase()` -> checkpoint, `fsync`, atomic
     rename, directory `fsync`, post-publication verification, rollback on
     failure.
3. `src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs`
   - `loadAllCandidateCampaignRegistry()`;
   - validate catalog, candidate specifications, prescribed records, campaign
     inventory, methodology coverage, and protocol;
   - for each candidate, construct the exact prescribed source and call
     `evaluateCompleteCycleCandidate()`;
   - serialize result and exact-source JSON;
   - construct manifest, summary, acceptance policy, raw-artifact inventory,
     and runtime timings.
4. `src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs`
   - `evaluateB1StreamingSurfaceReductions()`;
   - primary and refined fixed-internal
     `evaluatePrescribedRecordAnalysis()` calls;
   - primary and refined moving-receiver
     `evaluatePrescribedRecordAnalysis()` calls;
   - `evaluateBranchDiagnostics()`;
   - `evaluateSensitivity()`, which evaluates four perturbed exact sources,
     four surface campaigns, and four endpoint packets;
   - gate reduction, result construction, canonical SHA-256 result hash.
5. `src/prescribed-path-analysis/B1StreamingReductions.mjs`
   - construct the radius, resolution, and complete-cycle time grid;
   - construct event protocols;
   - call `evaluatePrescribedRecordAnalysis()` for every surface time sample;
   - independently check event packets;
   - stream angular, spectral, wake-flux, exposure, topology, and radial
     reductions;
   - compare primary and refined reductions.
6. `src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs`
   - validate source and protocol;
   - `evaluateAllEvents()` -> `evaluateEvent()` ->
     `solveCertifiedRetainedRoot()` for each transmitter;
   - evaluate primary and refined ledgers;
   - evaluate period closure and minimum separation;
   - compare numerical convergence;
   - construct raw ledgers and reduced measures;
   - canonical SHA-256 result hash.
7. Raw artifact creation in
   `createCompressedRawArtifactWriter()`
   - pretty JSON serialization;
   - SHA-256 of raw JSON;
   - gzip level 6 with deterministic time metadata;
   - SHA-256 of gzip bytes;
   - one filesystem file per distinct compressed hash;
   - descriptor and manifest inventory construction.
8. `src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs`
   - `preflightAnalyticalCampaignImport()` parses manifest, summary, result
     packets, exact sources, and independently recomputes case and campaign
     acceptance before the database opens for ingestion;
   - `openAnalyticalCampaignDatabase()` -> WAL, `synchronous=FULL`,
     foreign keys, migrations;
   - `insertCampaignEnvelope()` ingests the protocol, manifest, summary,
     methodology coverage, every raw artifact BLOB, and raw-artifact metadata;
   - case batches call `insertCase()` for source, configuration, result packet,
     reduced measures, multidimensional measures, gates, independent
     acceptance, and campaign membership;
   - insert campaign acceptance and complete the ingest ledger;
   - staged count checks.
9. Completeness, export, generation, verification, and publication
   - `verifyAnalyticalCampaignDatabase()` runs `integrity_check`,
     `foreign_key_check`, decodes and hashes every stored artifact, decodes and
     hashes every raw analytical artifact, checks exact-source preimages,
     normalized-row coverage, acceptance boundaries, and generation coverage;
   - `exportAnalyticalCampaign()` emits exact packets, sources, protocols,
     acceptance records, raw gzip artifacts, and a deterministically ordered
     reproducibility inventory;
   - `recordAnalyticalDatabaseGeneration()` stores the registry and generation
     cohort;
   - publish mode checkpoints and atomically replaces the production file, then
     verifies it again.

## Phase map and current instrumentation status

| Required phase | Live implementation location | Instrument |
| --- | --- | --- |
| Candidate source construction | `AllCandidateAnalyticalCampaign.mjs` | full rebuild profile; candidate worker harness |
| Prescribed-path event evaluation | `AnalyticalBraidEvaluator.mjs` | candidate stage timing; CPU profile pending |
| Surface reduction | `B1StreamingReductions.mjs` | candidate stage timing |
| Fixed internal probes | `CompleteCycleAnalyticalCampaign.mjs` | candidate stage timing |
| Moving receivers | same | candidate stage timing |
| Branch diagnostics | same | candidate stage timing |
| Source sensitivity | same | candidate stage timing |
| Result reduction | same | candidate stage timing; CPU profile pending |
| JSON serialization | raw writer and result writer | sampled codec harness; CPU profile pending |
| SHA-256 | raw writer and importer | sampled subphase wall timing |
| Gzip | raw writer and importer | sampled subphase wall timing |
| Raw filesystem writes | raw writer | candidate worker harness |
| Manifest and summary | all-candidate builder/writer | full rebuild phase timing |
| Independent preflight | `preflightAnalyticalCampaignImport()` | exact import profile pending |
| SQLite open and migration | database open/migrations | harness phase timing |
| Artifact ingestion | `insertCampaignEnvelope()` | sampled subphase wall timing |
| Normalized rows | `insertCase()` | sampled row timing; exact import profile pending |
| Multidimensional measures | `insertMultidimensionalMeasures()` | sampled row timing; exact import profile pending |
| Index and constraints | migrations plus inserts | controlled matrix |
| Commit and synchronization | explicit transactions, WAL, FULL | controlled matrix |
| Staged completeness | rebuild verification | full rebuild phase timing pending |
| Deterministic export | exporter | sampled export and full rebuild timing pending |
| Generation record | generation writer | full rebuild timing pending |
| SQLite integrity | verifier | sampled and full rebuild timing |
| Checkpoint | rebuild/publish helpers | publish-mode timing not authorized |
| Atomic publication | `publishDatabase()` | code-audited; no production experiment |

## What the current importer actually does

Grade: derived from live control flow and current row counts.

The loader is not a bulk loader. It performs one `INSERT` per logical row inside
explicit transactions. It does not use multi-row SQL, the SQLite CLI `.import`,
or a native bulk-load interface.

For the generated 19-candidate campaign:

- the raw-artifact envelope is one transaction containing all 13,927 packets;
- candidate batch size 32 means all 19 candidates fit in one case transaction;
- campaign acceptance is a final transaction;
- generation recording is a separate transaction;
- every raw packet constructs and executes one `artifact` statement and one
  `analytical_raw_artifact` statement;
- every multidimensional row constructs and executes its own statement;
- prepared statements are reconstructed inside the raw-artifact and
  multidimensional-measure loops;
- each already-compressed raw packet is read, decompressed, raw-hashed, gzip
  encoded again at level 6, byte-compared with the supplied gzip file, and
  inserted;
- verification later reads, decompresses, compressed-hashes, and raw-hashes
  every packet again;
- fresh ingestion does not repeatedly select artifact identities after insert;
  conflict verification selects occur only on an actual conflict;
- protocol insertion is attempted once for the envelope and once per case even
  though the cohort has one protocol;
- generation recording performs one failed-gate query per case before inserting
  each `database_generation_case` row.

Fresh-build insert attempts by table:

| Table | Rows retained | Insert attempts |
| --- | ---: | ---: |
| `schema_migration` | 3 | 3 |
| `artifact` | 13,968 | 13,968 |
| `analysis_protocol` | 1 | 20 |
| `source_record` | 19 | 19 |
| `campaign_manifest` | 1 | 1 |
| `campaign_summary` | 1 | 1 |
| `methodology_coverage` | 1 | 1 |
| `analytical_raw_artifact` | 13,927 | 13,927 |
| `configuration` | 19 | 19 |
| `case_result` | 19 | 19 |
| `observation_event` | 0 | 0 |
| `case_reduced_measure` | 190 | 190 |
| `multidimensional_measure` | 278,824 | 278,824 |
| `validity_gate_result` | 228 | 228 |
| `case_acceptance` | 19 | 19 |
| `campaign_case` | 19 | 19 |
| `ingest_batch` | 1 | 3 |
| `campaign_acceptance` | 1 | 1 |
| `database_generation` | 1 | 1 |
| `database_generation_case` | 19 | 19 |

The two largest loop preparation counts are therefore 27,854 raw-artifact
insert preparations and 278,824 multidimensional-measure insert preparations.
The controlled timing below shows that statement preparation is not currently
the leading total-time cause.

## Database size attribution

Grade: measured with SQLite `dbstat`.

| Object | Stored bytes | Share of 9.677 GB |
| --- | ---: | ---: |
| `artifact` table | 9,239,572,480 | 95.48% |
| `multidimensional_measure` table | 253,087,744 | 2.62% |
| Three multidimensional-measure indexes | 122,437,632 | 1.27% |
| `analytical_raw_artifact` table | 53,608,448 | 0.55% |
| Raw-artifact indexes and unique index | 7,538,688 | 0.08% |
| All remaining objects | about 0.7 MB | under 0.01% |

The `artifact` payload is the stored gzip packet, not a second uncompressed
copy. `analytical_raw_artifact` stores identity, dimensions, paths, sizes, and
context but no second payload. The large duplicate *work* is recompression; the
large duplicate *storage* has not been established.

## Reusable benchmark harness

`scripts/eom/benchmark-analytical-campaign-pipeline.mjs` supports:

- `inventory`: read-only workload and SQLite object inventory;
- `ingest`: small, medium, representative-large, or full hash-bound fixtures;
- `formats`: external immutable packets plus gzip NDJSON and gzip CSV tables;
- `compute`: deterministic candidate-worker experiments;
- one-variable variants for recompression, persistent statements, transaction
  bounds, index timing, journal mode, synchronous mode, foreign-key timing,
  cache/temp settings, mmap, page size, single-transaction loading, multi-row
  SQL, measure staging, SQLite CLI CSV staging, external packets, and an
  explicitly unsafe lower bound;
- warm-ups, repeated runs, individual values, median, range, CPU time, peak
  process RSS, input/output bytes, row counts, statement counts, transaction
  counts, per-phase wall time, WAL size, SQLite object size, verification,
  export, query throughput, and fixture hashes;
- heartbeat output containing phase, completed work, total work, wall seconds,
  and output path.

The source database is always opened read-only. All writes use unique disposable
directories under `/private/tmp` unless an explicit work root is supplied.

`scripts/eom/profile-sqlite-statements-preload.mjs` instruments the actual
`node:sqlite` calls without changing importer control flow. It records prepare
and execution wall time, statement counts, changed rows, iterator rows, and
logical parameter bytes by statement class and table. A two-insert/two-select
smoke test produced exactly those counts. This instrument adds timing calls and
therefore reports an instrumented baseline; its overhead must be bounded against
an uninstrumented run before using small timing differences.

## Experiment ledger

Machine context for the current measurements:

- Apple M3, 8 logical CPUs, 24 GiB memory;
- macOS 26.5.2 build 25F84;
- Node v26.3.0;
- embedded SQLite 3.53.2;
- zlib 1.2.12;
- filesystem free space before experiments: approximately 995 GiB.

### EXP-DB-001: production inventory

- Question: what rows, bytes, tables, and indexes exist?
- Fixture: published generation
  `d4eb19851bb7587e153d5049af797d602cd105a30c8b650f1c4f8fb8e4efa9ed`.
- Result grade: measured.
- Conclusion: packet BLOBs dominate database size; normalized measures and
  indexes are secondary.
- Falsifier: a new `dbstat` inventory materially changes the object shares.
- Next: measure the write path rather than infer cost from bytes.

### EXP-DB-002: small ingestion matrix

- Fixture hash:
  `f62c5ee673d8329dbabc8a257921f8d0c69c095457c679ba15548a12d57056e9`.
- Inputs: 64 stage-stratified packets, 323,637,942 raw bytes, 37,915,212
  gzip bytes, 4,000 multidimensional rows.
- Method: one warm-up plus three measured repetitions per variant.
- Report:
  `.local-data/braid-analysis/performance/ingest-small-matrix.v1.json`.
- Result grade: measured on a warm-cache sampled fixture.

| Variant | Median s | Range s | Raw ingest s | Measure replay s | Verification s |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current behavior | 4.982 | 4.947–5.016 | 3.052 | 1.404 | 0.415 |
| Verify existing gzip | 2.540 | 2.515–2.611 | 0.628 | 1.385 | 0.412 |
| Persistent statements | 4.942 | 4.875–5.065 | 3.002 | 1.343 | 0.414 |
| Build indexes after load | 5.149 | 4.997–5.248 | 3.083 | 1.396 | 0.408 |
| 32-row transactions | 4.923 | 4.871–5.004 | 2.981 | 1.432 | 0.403 |
| 512-row transactions | 4.935 | 4.898–5.345 | 2.981 | 1.460 | 0.411 |
| Rollback journal | 5.003 | 4.818–5.062 | 3.072 | 1.399 | 0.411 |
| `synchronous=NORMAL` | 4.981 | 4.969–4.991 | 2.989 | 1.442 | 0.418 |
| Deferred foreign keys | 5.078 | 5.078–5.111 | 3.147 | 1.415 | 0.411 |
| Larger cache/memory temp | 5.160 | 5.067–5.174 | 3.079 | 1.501 | 0.427 |
| External packets + SQLite | 2.335 | 2.313–2.498 | 0.478 | 1.423 | 0.351 |
| Unsafe compressed-hash-only lower bound | 2.275 | 2.242–2.311 | 0.297 | 1.441 | 0.418 |

The transaction, journal, synchronous, foreign-key, cache, and index hypotheses
are killed at this fixture scale: their changes are within or worse than the
observed range.

### EXP-DB-003: medium ingestion matrix

- Fixture hash:
  `b9c32ea3a69fd08c0992f784c8ece73113d2a0096705b9441a2e8333dc4ecc11`.
- Inputs: 512 stage-stratified packets, 2,825,475,283 raw bytes, 331,510,499
  gzip bytes, 40,000 multidimensional rows.
- Method: one warm-up plus three measured repetitions.
- Report:
  `.local-data/braid-analysis/performance/ingest-medium-matrix.v1.json`.
- Result grade: measured on a warm-cache sampled fixture.

| Variant | Median s | Range s | Raw ingest s | Measure replay s | Verification s |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current behavior | 36.823 | 34.789–37.765 | 27.024 | 2.683 | 4.220 |
| Verify existing gzip | 15.091 | 14.646–15.313 | 5.793 | 2.687 | 4.283 |
| Persistent statements | 40.747 | 36.968–41.129 | 30.250 | 2.624 | 4.977 |
| Build indexes after load | 38.640 | 38.087–39.660 | 29.409 | 2.393 | 4.399 |
| External packets + SQLite | 14.640 | 12.899–14.768 | 5.461 | 2.614 | 4.007 |

In an individual current run, gzip recompression consumed 21.993 s of 37.765 s
(58.2%). Required first-pass decompression plus raw hashing consumed 2.992 s.
Final verification decompression plus compressed/raw hashing consumed 2.952 s.
Packet BLOB insertion consumed 1.051 s. These figures explain about 76.7% of
total wall time; source reads, metadata inserts, integrity/foreign-key checks,
measure fixture replay, export, and query checks explain the balance.

Avoiding recompression reduced the median complete sampled run by 59.0% while
preserving compressed hash, raw hash, row inventory, final integrity, and
foreign-key results. This is a measured sampled-fixture result, not yet a full
rebuild speedup.

### EXP-FMT-001: external formats

- Same medium fixture and three measured repetitions after a warm-up.
- Report:
  `.local-data/braid-analysis/performance/formats-medium-matrix.v1.json`.
- Result grade: measured creation/storage; semantic tradeoffs derived from the
  live contracts.

| Representation | Median creation s | Total bytes | Metadata bytes |
| --- | ---: | ---: | ---: |
| SQLite packet BLOBs + normalized rows | 15.091 | 383,463,424 | 51,952,925 above gzip payload |
| External packets + SQLite normalized rows | 14.640 | 382,448,355 | 50,937,856 |
| External packets + gzip NDJSON | 15.160 | 340,697,933 | 9,187,434 |
| External packets + gzip CSV | 14.496 | 339,935,828 | 8,425,329 |

CSV and NDJSON save normalized/index storage on this fixture, but they do not
replace SQLite semantics. Reconstructing schema enforcement, foreign keys,
indexed candidate/gate/metric/root/sensitivity lookups, partial-write
protection, and atomic publication would require a validation/index layer.

No local Apache Arrow, Parquet, or DuckDB dependency or executable was
available at inspection. A columnar dependency is therefore deferred until a
measured query bottleneck justifies its inclusion and operational cost.

### EXP-PAR-000: rejected mixed-revision worker matrix

- Question: can four no-sensitivity candidates scale across one, two, and four
  worker threads?
- Result grade: rejected measurement.
- Result: the first attempt crossed concurrent edits to the surface reducer,
  evaluator, and protocol. The aggregate output hash changed during the
  two-worker repetitions, so no speedup was accepted.
- Conclusion: candidate and protocol hashes alone do not freeze the executing
  implementation in a shared checkout.
- Falsifier: none; file hashes proved that the implementation changed.
- Corrective action: the harness now binds a transitive implementation hash,
  compares packet bytes in addition to result and raw-inventory hashes, and is
  being run from immutable snapshot `0bb7310b`.
- Next: finish three exact-output repetitions at one, two, and four workers.

## Current bottleneck ranking

Measured on the medium ingestion fixture:

1. Gzip recompression during import: 58.2% of sampled total wall.
2. Mandatory full verification: 11.3%.
3. Raw source BLOB reads plus first-pass decompression and hashes: 10.8%.
4. Harness measure-source scan and replay: 7.1%; the source scan is fixture
   overhead and must not be attributed directly to the production importer.
5. Packet BLOB and raw-metadata insertion: 4.1%.
6. SQLite integrity and foreign-key checks: 1.6%.
7. Remaining open/schema/export/query/bookkeeping: about 6.9%.

This ranking supersedes the unmeasured story that index maintenance, WAL,
foreign keys, or statement reconstruction explain ingestion.

## Storage-necessity audit

| Representation | Current consumer and obligation | Classification | Candidate action |
| --- | --- | --- | --- |
| Exact source record artifact | source-hash preimage verification, reconstruction | required provenance | retain |
| Analysis protocol canonical JSON | protocol identity and reconstruction | required provenance | retain |
| Result packet artifact | result-hash identity, deterministic export, acceptance reconstruction | required acceptance and export | retain |
| Raw surface packets | independent event checks, root ledger, angular/spectral/wake-flux reconstruction | required reconstruction and root audit | retain until a field-level consumer proof says otherwise |
| Raw fixed-probe packets | independent validity and convergence checks | required acceptance | retain |
| Raw moving-receiver packets | endpoint reduction and validity reconstruction | required acceptance | retain |
| Branch-diagnostic packet | branch continuity audit | required root/continuity audit | retain |
| Sensitivity exact sources | perturbed source identity | required sensitivity provenance | retain |
| Sensitivity surface/endpoint packets | derivative, topology, and perturbed-gate reconstruction | required sensitivity acceptance | retain |
| `artifact.payload` for raw packets | authoritative packet bytes | required, but location is negotiable | candidate for immutable externalization |
| `analytical_raw_artifact` dimensions/context | candidate and event lookup, deterministic export | required index/provenance | retain |
| `multidimensional_measure.details_json` | row reconstruction and diagnostic context | mixed; many rows may repeat larger structures | field-level consumer audit required |
| `case_reduced_measure` plus summary multidimensional rows | hot scalar queries and compatibility | possible redundant representation | audit exact consumers before removal |
| Three multidimensional indexes | metric/root/sensitivity queries | required for current query contract, not acceptance | retain unless query benchmarks justify redesign |
| Deterministic export files | generated from authoritative database during rebuild | derivable cache | do not retain after check; current staging cleanup already removes them |

No raw ledger is approved for removal. The largest safe opportunity currently
identified is to change how already-generated gzip bytes are validated and
where they are stored, not to discard them.

## Representation decision matrix

| Representation | Exact bytes and hashes | Schema/FK | Query behavior | Incremental load | Atomicity/corruption | Current verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Current SQLite BLOBs | strong | strong | indexed | transactional | single-file staged swap plus verification | retain as baseline |
| External immutable gzip + SQLite index/measures | strong if directory manifest and raw/compressed hashes are mandatory | strong for metadata | same metadata queries; one file open for payload | appendable by hash | requires staged directory publication and missing-file audit | promising, decision pending full workflow measurement |
| SQLite metadata and accepted summaries only + external raw store | raw exactness can remain | strong metadata | loses rejected diagnostic measures unless retained externally | appendable | more reconstruction joins | not yet justified |
| Gzip NDJSON | exact with explicit encodings and manifest | application-enforced | full scan without auxiliary index | concatenation/rewrite policy needed | staged multi-file manifest | export/interop format, not primary |
| Gzip CSV | exact binary64 possible only with specified decimal/hex encodings | application-enforced | full scan without auxiliary index | appendable but relationship checks external | staged multi-file manifest | export/staging format, not primary |
| Columnar | not tested; no justified local dependency selected | format-dependent | potentially good analytical scans | format-dependent | format-dependent | defer until measured query need justifies dependency |

## Ranked optimization plan

1. **Stop deterministic gzip recompression during import.**
   - Measured sampled benefit: 59.0% median total reduction on the medium
     ingestion fixture.
   - Preserve: hash the supplied gzip bytes, decompress once, verify raw size and
     raw SHA-256, insert the exact supplied bytes, and retain the final full
     verifier.
   - Risk: a producer could change gzip parameters while preserving raw JSON;
     compressed SHA-256 identity detects and records that change.
   - Rollback: restore the recompression/byte-compare path.
   - Production gate: exact full import and rebuild equivalence.
2. **Measure candidate-level worker parallelism with worker-local artifact
   directories and deterministic merge.**
   - Serial no-sensitivity smoke: 41.135 s wall, 41.110 CPU seconds,
     0.999 CPU-core equivalent; surface work was 39.715 s.
   - This verifies the earlier one-core observation for one candidate fixture.
   - Full 1/2/4-worker matrix is in progress.
3. **Evaluate external immutable packets plus a smaller SQLite database.**
   - Measured medium storage: 331.5 MB packet store plus 50.9 MB SQLite versus
     383.5 MB current SQLite.
   - Immediate size saving is small because packets remain required; operational
     and WAL/checkpoint behavior may still improve at full scale.
   - New failure mode: missing, renamed, partially published, or mismatched
     external file. Mandatory manifest/hash coverage and atomic directory
     publication are required.
4. **Profile exact multidimensional-row construction and hashing.**
   - Persistent statements alone did not improve total sampled time.
   - The harness replay does not include production
     `completeCycleMultidimensionalRows()` construction,
     `sha256Canonical(identity)`, or `canonicalBytes(details)`.
5. **Do not change durability pragmas, foreign-key timing, journal mode, batch
   size, or index timing on current evidence.**
   - The controlled small matrix found no benefit outside noise.
6. **Keep CSV/NDJSON as deterministic export or staging formats.**
   - Their write/storage advantage does not compensate for reconstructing the
     database contract.

## Open experiments

1. Finish the 1/2/4 candidate-worker matrix and calculate serial fraction and
   Amdahl upper bounds.
2. Run a representative-large direct-gzip versus current ingestion comparison.
3. Build an exact one-candidate import fixture from the published generation to
   include preflight JSON parsing, independent acceptance, normalized-row
   construction, and result hashing.
4. Run the unchanged full `rebuild-all --check` with `runtimeProfile`, Node CPU
   profile, and OS resource measurements.
5. Compare a production-compatible direct-gzip experimental importer against
   current output: source hashes, protocol hashes, result hashes, acceptance,
   metric rows, generation fingerprint, deterministic export inventory, and
   `integrity: ok`.
6. Measure full-scale external-packet publication, missing-file audit, backup,
   recovery, and query latency before changing the storage contract.

## Completion gate

No production recommendation is accepted until:

- the full unchanged baseline explains nearly all wall time;
- the variant processes logically identical inputs;
- source, protocol, result, generation, export, and raw-artifact hashes match;
- accepted/rejected inventory and every normalized metric row match;
- independent acceptance and `integrity: ok` match;
- peak memory, WAL, temporary files, and disk amplification are measured;
- the failure and rollback models are explicit; and
- no production database or artifact is deleted or overwritten.
