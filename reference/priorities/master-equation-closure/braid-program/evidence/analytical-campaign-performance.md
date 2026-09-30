# Prescribed-Path Analytical Campaign Performance

## Purpose and boundary

This packet owns the measured performance and scalability investigation for the all-candidate prescribed-path analytical campaign.

The optimization objective is to reduce wall-clock time, computation, database-load time, stored bytes, and peak resource use while preserving:

- exact source, protocol, result, raw-packet, manifest, generation, and export identity;
- independently recomputed acceptance;
- raw-ledger reconstruction and provenance;
- deterministic export;
- SQLite integrity and foreign-key verification;
- atomic publication; and
- the prescribed-path boundary: no path evolution and no EOM solver.

Performance measurements do not establish mathematical correctness. Same-output comparisons establish determinism and implementation equivalence only.

Large reports and disposable databases remain outside Git. The current local report root is `.local-data/braid-analysis/performance/`; disposable write-heavy runs use `/private/tmp/architrino-analytical-campaign-pipeline-benchmarks/`.

## Live workload snapshot

Measured from the published generation completed at `2026-07-23T00:55:22.565Z`:

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

The older 17-candidate, 11-accepted snapshot is not the current performance fixture.

### Next-rebuild protocol drift

Grade: derived from the live protocol and evaluator loops.

During this investigation, the next-rebuild protocol changed from file hash `289190df392fc090c9e0135abffb2428091752f999564f15e62aac4f6f5b5824` to `2e23c6ace6d5284380a7847b77a7613e835ca5421847fbe194c1c09431b2c5d8`. The current protocol retains four radii but uses 24 primary and 48 refined cycle times, rather than the published generation's smaller grid. It therefore writes 288 base surface packets, 293 no-sensitivity packets, and 1,453 full-sensitivity packets per candidate: 27,607 packet-write events for 19 candidates before any exact-hash coincidence.

The published 13,927-packet database remains the read-only production baseline. The retained full rebuild measures the expanded next-rebuild workload. Its wall time must not be compared directly with the earlier 41/70-minute observations as if the logical input were unchanged.

### Retained expanded-protocol baseline

Grade: measured by the completed nonpublishing check-mode rebuild and the read-only v2 full inventory.

| Quantity | Value |
| --- | ---: |
| End-to-end wall | 17,151.144 s (4 h 45 m 51 s) |
| Candidates | 19 |
| Independently accepted/rejected | 8 / 11 |
| Raw artifacts / distinct raw hashes | 27,607 / 27,607 |
| Raw JSON bytes | 286,214,744,413 |
| Exact gzip bytes | 33,862,579,968 |
| Compression ratio | 0.118312 |
| SQLite bytes | 34,555,154,432 |
| Multidimensional rows | 278,826 |
| Artifact rows | 27,648 |
| Generation hash | `5cbb5765d9b5e327240227d09b722c1d23e22a3c3c03435878025bbcfb78f084` |
| Database fingerprint | `68a90e6ee4277aed1dcb752d76c79337139de596c331e2cd1e677a31b9373506` |
| Integrity | `ok` |

Source-sensitivity surface packets account for 26,973,730,435 stored bytes (79.6565% of raw gzip storage), base complete-cycle surfaces account for 6,736,769,664 bytes (19.8944%), and every other raw stage together accounts for 0.4491%. The prior approximate 79%/20% observation therefore reproduces on the expanded workload.

The report is `.local-data/braid-analysis/complete-19-candidate-nonpublishing-rebuild-profile.v1.json`; the full table/column/index inventory is `.local-data/braid-analysis/performance/expanded-full-inventory.v2.json`. The check did not publish or replace the production database.

## Exact legacy raw-artifact end-to-end call graph

The explicitly selected `legacy-rebuild-all` path is:

1. `scripts/eom/analytical-campaign-database.mjs`
   - `runCli()`
   - `rebuildAllCandidateAnalyticalDatabase()`
2. `src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs`
   - create rebuild lock and unique staging directory;
   - `buildAllCandidateAnalyticalCampaign()`;
   - `writeAllCandidateAnalyticalCampaign()`;
   - `importAnalyticalCampaign()` for the generated campaign and every registry-declared checked campaign;
   - `assertStagedCompleteness()`;
   - `deterministicExportCheck()` -> `exportAnalyticalCampaign()`;
   - `recordAnalyticalDatabaseGeneration()`;
   - `verifyAnalyticalCampaignDatabase()`;
   - check mode: discard staging;
   - publish mode only: `publishDatabase()` -> checkpoint, `fsync`, atomic rename, directory `fsync`, post-publication verification, rollback on failure.
3. `src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs`
   - `loadAllCandidateCampaignRegistry()`;
   - validate catalog, candidate specifications, prescribed records, campaign inventory, methodology coverage, and protocol;
   - for each candidate, construct the exact prescribed source and call `evaluateCompleteCycleCandidate()`;
   - serialize result and exact-source JSON;
   - construct manifest, summary, acceptance policy, raw-artifact inventory, and runtime timings.
4. `src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs`
   - `evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions()`;
   - primary and refined fixed-internal `evaluatePrescribedRecordAnalysis()` calls;
   - primary and refined moving-receiver `evaluatePrescribedRecordAnalysis()` calls;
   - `evaluateBranchDiagnostics()`;
   - `evaluateSensitivity()`, which evaluates four perturbed exact sources, four surface campaigns, and four endpoint packets;
   - gate reduction, result construction, canonical SHA-256 result hash.
5. `src/prescribed-path-analysis/CoincidentAxisThreeBinaryStreamingReductions.mjs`
   - construct the radius, resolution, and complete-cycle time grid;
   - construct event protocols;
   - call `evaluatePrescribedRecordAnalysis()` for every surface time sample;
   - independently check event packets;
   - stream angular, spectral, wake-flux, exposure, topology, and radial reductions;
   - compare primary and refined reductions.
6. `src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs`
   - validate source and protocol;
   - `evaluateAllEvents()` -> `evaluateEvent()` -> `solveCertifiedRetainedRoot()` for each transmitter;
   - evaluate primary and refined ledgers;
   - evaluate period closure and minimum separation;
   - compare numerical convergence;
   - construct raw ledgers and reduced measures;
   - canonical SHA-256 result hash.
7. Raw artifact creation in `createCompressedRawArtifactWriter()`
   - pretty JSON serialization;
   - SHA-256 of raw JSON;
   - gzip level 6 with deterministic time metadata;
   - SHA-256 of gzip bytes;
   - one filesystem file per distinct compressed hash;
   - descriptor and manifest inventory construction.
8. `src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs`
   - `preflightAnalyticalCampaignImport()` parses manifest, summary, result packets, exact sources, and independently recomputes case and campaign acceptance before the database opens for ingestion;
   - `openAnalyticalCampaignDatabase()` -> WAL, `synchronous=FULL`, foreign keys, migrations;
   - `insertCampaignEnvelope()` ingests the protocol, manifest, summary, methodology coverage, every raw artifact BLOB, and raw-artifact metadata;
   - case batches call `insertCase()` for source, configuration, result packet, reduced measures, multidimensional measures, gates, independent acceptance, and campaign membership;
   - insert campaign acceptance and complete the ingest ledger;
   - staged count checks.
9. Completeness, export, generation, verification, and publication
   - `verifyAnalyticalCampaignDatabase()` runs `integrity_check`, `foreign_key_check`, decodes and hashes every stored artifact, decodes and hashes every raw analytical artifact, checks exact-source preimages, normalized-row coverage, acceptance boundaries, and generation coverage;
   - `exportAnalyticalCampaign()` emits exact packets, sources, protocols, acceptance records, raw gzip artifacts, and a deterministically ordered reproducibility inventory;
   - `recordAnalyticalDatabaseGeneration()` stores the registry and generation cohort;
   - publish mode checkpoints and atomically replaces the production file, then verifies it again.

## Phase map and current instrumentation status

| Required phase | Live implementation location | Instrument |
| --- | --- | --- |
| Candidate source construction | `AllCandidateAnalyticalCampaign.mjs` | full rebuild profile; candidate worker harness |
| Prescribed-path event evaluation | `AnalyticalBraidEvaluator.mjs` | candidate stage timing plus point stack samples |
| Surface reduction | `CoincidentAxisThreeBinaryStreamingReductions.mjs` | measured candidate stage timing |
| Fixed internal probes | `CompleteCycleAnalyticalCampaign.mjs` | candidate stage timing |
| Moving receivers | same | candidate stage timing |
| Branch diagnostics | same | candidate stage timing |
| Source sensitivity | same | measured candidate stage timing |
| Result reduction | same | candidate stage timing; point stack samples |
| JSON serialization | raw writer and result writer | sampled codec harness; CPU profile pending |
| SHA-256 | raw writer and importer | sampled subphase wall timing |
| Gzip | raw writer and importer | sampled subphase wall timing |
| Raw filesystem writes | raw writer | candidate worker harness |
| Manifest and summary | all-candidate builder/writer | full rebuild phase timing |
| Independent preflight | `preflightAnalyticalCampaignImport()` | included in exact 5,661.056 s import; subphase SQL-preload replay pending |
| SQLite open and migration | database open/migrations | harness phase timing |
| Artifact ingestion | `insertCampaignEnvelope()` | sampled subphase wall timing |
| Normalized rows | `insertCase()` | sampled row timing; exact import profile pending |
| Multidimensional measures | `insertMultidimensionalMeasures()` | sampled row timing; exact import profile pending |
| Index and constraints | migrations plus inserts | controlled matrix |
| Commit and synchronization | explicit transactions, WAL, FULL | controlled matrix |
| Staged completeness | rebuild verification | measured 1,320.174 s; includes a complete database verification |
| Deterministic export | exporter | measured 337.614 s |
| Generation record | generation writer | measured 0.052 s |
| SQLite integrity | verifier | second measured complete verification: 1,324.939 s |
| Checkpoint | rebuild/publish helpers | publish-mode timing not authorized |
| Atomic publication | `publishDatabase()` | code-audited; no production experiment |

## What the current importer actually does

Grade: derived from live control flow and current row counts.

The loader is not a bulk loader. It performs one `INSERT` per logical row inside explicit transactions. It does not use multi-row SQL, the SQLite CLI `.import`, or a native bulk-load interface.

For the generated 19-candidate campaign:

- the raw-artifact envelope is one transaction containing all 13,927 packets;
- candidate batch size 32 means all 19 candidates fit in one case transaction;
- campaign acceptance is a final transaction;
- generation recording is a separate transaction;
- every raw packet constructs and executes one `artifact` statement and one `analytical_raw_artifact` statement;
- every multidimensional row constructs and executes its own statement;
- prepared statements are reconstructed inside the raw-artifact and multidimensional-measure loops;
- each already-compressed raw packet is read, decompressed, raw-hashed, gzip encoded again at level 6, byte-compared with the supplied gzip file, and inserted;
- verification later reads, decompresses, compressed-hashes, and raw-hashes every packet again;
- fresh ingestion does not repeatedly select artifact identities after insert; conflict verification selects occur only on an actual conflict;
- protocol insertion is attempted once for the envelope and once per case even though the cohort has one protocol;
- generation recording performs one failed-gate query per case before inserting each `database_generation_case` row.

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

The two largest loop preparation counts are therefore 27,854 raw-artifact insert preparations and 278,824 multidimensional-measure insert preparations. The controlled timing below shows that statement preparation is not currently the leading total-time cause.

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

The `artifact` payload is the stored gzip packet, not a second uncompressed copy. `analytical_raw_artifact` stores identity, dimensions, paths, sizes, and context but no second payload. The large duplicate *work* is recompression; the large duplicate *storage* has not been established.

On the expanded retained database, the concentration increases:

| Object group | Stored bytes | Share of 34.555 GB |
| --- | ---: | ---: |
| `artifact` table | 34,040,623,104 | 98.511% |
| `multidimensional_measure` table | 269,438,976 | 0.780% |
| Three multidimensional-measure indexes | 122,048,512 | 0.353% |
| `analytical_raw_artifact` table | 107,122,688 | 0.310% |
| Raw-artifact indexes | 15,020,032 | 0.043% |
| All remaining objects | about 1 MB | about 0.003% |

The exact expanded database size minus the `artifact` table is 514,531,328 bytes. That is a measured object-accounting bound, not yet a measured production-schema metadata-only build; page packing, a replay-recipe table, and selectively retained full-adjudication packets will change the final number.

`multidimensional_measure.details_json` is 111,313,332 logical bytes (0.322% of the database), raw `context_json` is 18,715,551 bytes (0.054%), and `campaign_case.summary_case_json` is 98,570 bytes (0.0003%). Even removing all three without physical overhead would save under 0.38%. Their redundancy audit remains useful for contract clarity, but it cannot materially solve storage volume.

## Reusable benchmark harness

`scripts/eom/benchmark-analytical-campaign-pipeline.mjs` supports:

- `inventory`: read-only workload and SQLite object inventory;
- `ingest`: small, medium, representative-large, or full hash-bound fixtures;
- `formats`: external immutable packets plus gzip NDJSON and gzip CSV tables;
- `compute`: deterministic candidate-worker experiments;
- one-variable variants for recompression, persistent statements, transaction bounds, index timing, journal mode, synchronous mode, foreign-key timing, cache/temp settings, mmap, page size, single-transaction loading, multi-row SQL, measure staging, SQLite CLI CSV staging, a metric-order query index, external packets, and an explicitly unsafe lower bound;
- warm-ups, repeated runs, individual values, median, range, CPU time, peak process RSS, input/output bytes, row counts, statement counts, transaction counts, per-phase wall time, WAL size, SQLite object size, verification, export, query throughput, and fixture hashes;
- each ingestion warm-up and measured repetition now runs in a fresh Node process, preventing earlier variants' retained heaps from contaminating peak RSS;
- full inventory mode records one-scan per-column logical bytes and null counts; it also records query plans and warm-cache latency for candidate, artifact, gate, metric, root, and sensitivity lookups. Summary mode avoids payload scans, and compute mode skips the production inventory by default so it does not pre-warm the database cache;
- CSV and NDJSON fixtures now decode after write and require exact logical row and binary64 round trips; their same lookups are measured as compressed full-scan lower bounds rather than treated as indexed queries;
- heartbeat output containing phase, completed work, total work, wall seconds, and output path.

Harness version 2 adds the selected results' complete `validity_gate_result` rows to every ingestion fixture, fixture hash, logical round-trip check, foreign-key/integrity check, per-phase timing, and indexed gate query. The v1 reports below predate that addition and therefore remain historical raw-artifact-plus-multidimensional-measure measurements; their fixture hashes and timings must not be mixed with v2 repetitions.

The source database is always opened read-only. All writes use unique disposable directories under `/private/tmp` unless an explicit work root is supplied.

`scripts/eom/profile-sqlite-statements-preload.mjs` instruments the actual `node:sqlite` calls without changing importer control flow. It records prepare and execution wall time, statement counts, changed rows, iterator rows, and logical parameter bytes by statement class and table. It also records process wall/CPU time, peak RSS, time before the first SQL operation, the profiled SQL window, and transaction/DDL `exec` calls. It now attributes execution attempts, retained changed rows, logical parameter bytes, wall time, and per-table work to each completed transaction, and exposes any transaction still open at process exit. A three-attempt transaction smoke with one uniqueness no-op reported three executions, two changed rows, and one committed transaction exactly. This instrument adds timing calls and therefore reports an instrumented baseline; its overhead must be bounded against an uninstrumented run before using small timing differences.

A focused campaign test under the preload confirmed table-level accounting: 304 `validity_gate_result` inserts, 304 `case_reduced_measure` inserts, 82 artifact inserts, 14 transaction begins, and 14 commits were counted across the test's two imports and verifications. The counts match the test control flow; the retained full campaign remains the timing target.

The import, export, and verification CLI paths now emit monotonic heartbeats from zero completed work through each raw/case phase. This supplies exact phase boundaries around preflight, ingestion, raw export, artifact verification, and raw-artifact verification without changing their default data path.

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
- Fixture: published generation `d4eb19851bb7587e153d5049af797d602cd105a30c8b650f1c4f8fb8e4efa9ed`.
- Result grade: measured.
- Conclusion: packet BLOBs dominate database size; normalized measures and indexes are secondary.
- Falsifier: a new `dbstat` inventory materially changes the object shares.
- Next: measure the write path rather than infer cost from bytes.

### EXP-DB-002: small ingestion matrix

- Fixture hash: `f62c5ee673d8329dbabc8a257921f8d0c69c095457c679ba15548a12d57056e9`.
- Inputs: 64 stage-stratified packets, 323,637,942 raw bytes, 37,915,212 gzip bytes, 4,000 multidimensional rows.
- Method: one warm-up plus three measured repetitions per variant.
- Report: `.local-data/braid-analysis/performance/ingest-small-matrix.v1.json`.
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

The transaction, journal, synchronous, foreign-key, post-load-index, and combined cache-plus-memory-temp hypotheses are killed at this fixture scale: their changes are within or worse than the observed range. Cache size and temporary-store location still require isolated one-variable runs.

The current small replay used two transactions containing 64 raw logical rows and 4,000 measure rows, 4,147 insert executions, and 4,133 preparations. Persistent statements reduced preparations to 9 without reducing wall time. Thirty-two-row transactions increased the transaction count to 127 and reduced peak WAL from 38,686,832 to 19,528,832 bytes, but did not improve wall time. This makes bounded transactions a possible WAL-cap control, not a speed optimization.

### EXP-DB-003: medium ingestion matrix

- Fixture hash: `b9c32ea3a69fd08c0992f784c8ece73113d2a0096705b9441a2e8333dc4ecc11`.
- Inputs: 512 stage-stratified packets, 2,825,475,283 raw bytes, 331,510,499 gzip bytes, 40,000 multidimensional rows.
- Method: one warm-up plus three measured repetitions.
- Report: `.local-data/braid-analysis/performance/ingest-medium-matrix.v1.json`.
- Result grade: measured on a warm-cache sampled fixture.

| Variant | Median s | Range s | Raw ingest s | Measure replay s | Verification s |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current behavior | 36.823 | 34.789–37.765 | 27.024 | 2.683 | 4.220 |
| Verify existing gzip | 15.091 | 14.646–15.313 | 5.793 | 2.687 | 4.283 |
| Persistent statements | 40.747 | 36.968–41.129 | 30.250 | 2.624 | 4.977 |
| Build indexes after load | 38.640 | 38.087–39.660 | 29.409 | 2.393 | 4.399 |
| External packets + SQLite | 14.640 | 12.899–14.768 | 5.461 | 2.614 | 4.007 |

In an individual current run, gzip recompression consumed 21.993 s of 37.765 s (58.2%). Required first-pass decompression plus raw hashing consumed 2.992 s. Final verification decompression plus compressed/raw hashing consumed 2.952 s. Packet BLOB insertion consumed 1.051 s. These figures explain about 76.7% of total wall time; source reads, metadata inserts, integrity/foreign-key checks, measure fixture replay, export, and query checks explain the balance.

Avoiding recompression reduced the median complete sampled run by 59.0% while preserving compressed hash, raw hash, row inventory, final integrity, and foreign-key results. This is a measured sampled-fixture result, not yet a full rebuild speedup. Median user CPU fell from 31.757 s to 11.258 s and total user-plus-system CPU fell from 36.702 s to 16.026 s. Database and peak WAL bytes were identical: 383,463,424 and 337,011,912 bytes. The old matrix ran variants sequentially in one Node process, so its monotonically increasing absolute RSS readings are order-contaminated and do not support a memory comparison. The harness now launches a fresh process per warm-up and measured repetition; peak RSS must be remeasured.

### EXP-DB-004: production-shaped verified-gzip safety fixture

- Question: can the importer retain supplied gzip bytes without recompression while preserving its identity boundary requiring verification before advancement?
- Baseline: default recompress-and-byte-compare importer.
- Changed variable: opt-in `experimentalRawArtifactImportMode: "verified-compressed"`.
- Fixture: baseline all-candidate campaign plus one deterministic gzip raw artifact bound by raw and compressed SHA-256.
- Command: focused Node test pattern `verified compressed raw import`.
- Machine/runtime: current machine context; two tests completed in 518 ms.
- Repetitions: one correctness run per test; this is not a timing benchmark.
- Measurements: baseline and variant match stored gzip bytes, raw/compressed hashes, manifest/summary hashes, independent acceptance evidence, row inventory, database fingerprint, and `integrity: ok`.
- Correctness comparison: pass. A second test changed the gzip file after preflight; ingestion rejected it before any artifact or raw-artifact row committed.
- Result grade: measured local conformance, not full-campaign performance.
- Conclusion: recompression is not required to preserve the current preflight-to-insert mutation check.
- Falsifier: any full fixture mismatch in artifact bytes, normalized rows, acceptance, fingerprint, export inventory, or final verification.
- Next: run both modes against the retained full generated campaign.

### Controlled ingestion matrix status

| Primary variable | Baseline/variant | Current evidence | Status |
| --- | --- | --- | --- |
| Gzip validation | recompress / verify supplied gzip | three small and three medium repetitions; exact safety fixture | leading measured improvement; full replay pending |
| Prepared statements | per-row prepare / persistent | small and medium | killed as leading total-wall cause |
| Transaction bound | two large transactions / 32 / 512 rows | small | no speed gain; 32 rows halves peak WAL |
| Single transaction | raw plus measures separate / one transaction | three small repetitions | 1.7% lower median, within the small-fixture range; WAL 12.6% larger |
| Row SQL shape | one measure row / 64-row SQL | three small repetitions; 4,375 to 438 insert executions | 3.0% slower median; statement count is not the bottleneck |
| Measure staging | direct indexed target / unindexed stage then ordered transfer | three small repetitions; dropped-stage pages remain allocated | 20.4% slower median and 6.4% larger database |
| SQLite CLI staging | Node loop / CSV `.import` plus strict transfer | three small repetitions; local CLI 3.51.0 | 2.6% slower median and 10.9% larger database |
| Index timing | maintain / create after load | small and medium | no speed gain |
| Metric query index | current index / `(measure_id, scalar_value, result_hash)` | three small repetitions; temporary sort removed | metric query 55.6% faster; total load/verify/export 6.4% slower and database 1.4% larger |
| Foreign keys | immediate / final deferred check | small | no speed gain; final check retained |
| Journal | WAL / rollback journal | small | no speed gain |
| Synchronous policy | FULL / NORMAL | small sandbox only | no speed gain; unsafe mode not recommended |
| Page cache | current / 256 MiB | three small repetitions | 19.5% slower median; no RSS benefit |
| Temporary store | default / memory | three small repetitions | 10.4% slower median with a 36.5% high outlier |
| Cache/temp interaction | both changes together | three small repetitions | 23.4% slower median |
| Memory mapping | none / 256 MiB | three small repetitions | 1.3% slower median; no material benefit |
| Page size | 4 KiB / 8 KiB | three small repetitions | 0.9% slower median; 0.06% smaller database |
| Artifact table shape | payload-bearing `WITHOUT ROWID` primary B-tree / rowid payload table plus skinny unique hash index | three small and three medium repetitions | 6.3% faster than recompressing current schema at medium; still much slower than external/no payload |
| Payload location | SQLite BLOB / external immutable gzip | isolated direct-gzip small and medium repetitions | external is 19.0% faster at medium and cuts SQLite/WAL working set 86.7%; retained total bytes nearly unchanged |

### EXP-DB-005: v2 variant conformance smoke

- Question: do the newly implemented single-transaction, multi-row, staging, SQLite CLI, metric-index, cache, mmap, page-size, and isolated external-store paths preserve the expanded v2 fixture contract?
- Fixture hash: `93397fb194f6919b9d3e2a4a2b3a6ba97f96b86d7019b04208a9e288b9a39084`; 64 raw artifacts, 4,000 multidimensional measures, and 228 complete validity gates.
- Repetitions: one functional run per variant, performed during the already excluded candidate-8 full-rebuild window.
- Correctness comparison: all ten variants produced `integrity: ok`, zero foreign-key failures, identical measure logical digest `2b3cf93791755a2742565afadb1dded75f3c61d1240efda386e3f79533658587`, and identical gate logical digest `867d1a76b1355e0a204a71b100d4958da9265075463996564304df2b10bdf910`.
- Result grade: measured functional conformance; all wall/CPU results are rejected because the expanded full rebuild was running concurrently.
- Statement-shape check: multi-row SQL reduced insert executions from 4,375 to 438; SQLite CLI staging used one CLI import and 376 Node insert executions. This is a measured statement-count change, not a speedup.
- Storage observation: dropping the staging table does not reclaim its pages. The single-row/multi-row database was 43,245,568 bytes, in-process staging was 46,014,464 bytes, and CLI staging was 47,951,872 bytes. Any production staging proposal therefore needs an explicit compaction or fresh-file publication model.
- Falsifier: an uncontended repeated run fails a logical digest, final integrity, foreign key, export, or exact packet check.
- Next: repeat the matrix uncontended and use medians before accepting any timing claim.

### EXP-DB-006: expanded exact verified-gzip import

- Question: when analytical computation is held out and the retained 27,607 packet campaign is imported exactly, where does full-scale ingestion time go?
- Baseline: the unchanged full rebuild imported this generated campaign in 5,661.056 s. The variant used the opt-in `verified-compressed` path in a new database under `/private/tmp`; it did not read or write the production database.
- Fixture: manifest `2d3758e886a51b5d9d890adfdced34ac77e52e73596bf518d842fd8dd32dc2d8`, summary `e582ae0ab6fe4a59b86aedc4a8db870f987ac83812f8f01c827cb64568c4d584`, 27,607 raw artifacts, 278,826 multidimensional measures, and 228 validity gates from EXP-E2E-001.
- Command: `import-campaign` with `--experimental-raw-artifact-import-mode verified-compressed`, the Node SQLite statement profiler, `/usr/bin/time -l`, and monotonic progress heartbeats.
- Measurements: 3,662.51 s wall, 3,273.52 s user CPU, 309.06 s system CPU, 0.978 lifetime CPU-core equivalent, and 1.68 GB peak physical footprint. Importer preflight before the first SQL statement took 352.10 s (9.61%). The SQL window took 3,310.17 s (90.39%).
- Transaction shape: seven commits were issued: four one-row migration transactions, one envelope/raw-artifact transaction, one all-cases transaction, and one campaign-acceptance transaction. The envelope/raw transaction executed 55,222 statements, changed 55,221 rows, processed 33,933,223,842 logical parameter bytes, and took 3,288.74 s (89.79% of complete import wall). Its WAL reached about 32 GB before the single commit. The all-cases transaction, including all 278,826 multidimensional measures, took 21.42 s (0.58%).
- Table attribution: 27,647 `artifact` inserts took 1,760.24 s (48.06% of complete wall); 27,607 `analytical_raw_artifact` inserts took 1,341.82 s (36.64%); 278,826 `multidimensional_measure` inserts took 8.68 s (0.24%). All commits together took 108.48 s (2.96%). Statement preparation for those three tables took 5.39 s (0.15%), so statement reconstruction is not the leading cause at this scale.
- Late-stage point sample: after the WAL had grown to about 30 GB, 2,872 of 4,189 active-main-thread top frames were in SQLite `walFindFrame` and 877 were in `walHashGet`; together they were 89.5%. SHA-256 appeared in seven top frames. This is a five-second measured point sample, not a whole-import CPU attribution.
- Result grade: measured full-scale variant profile. The apparent 35.3% wall-time reduction from the unchanged 5,661.056 s baseline is provisional, because the variant was statement-profiled and the baseline was not. It is not yet the accepted production speedup.
- Correctness comparison: pass. Exact generation recording reproduced `5cbb5765d9b5e327240227d09b722c1d23e22a3c3c03435878025bbcfb78f084`; the full verifier returned `integrity: ok`, fingerprint `68a90e6ee4277aed1dcb752d76c79337139de596c331e2cd1e677a31b9373506`, 27,648 artifacts, and the unchanged 8 accepted/11 rejected inventory. The database has the same 34,555,154,432-byte size, 8,436,317-page count, zero free pages, and schema version as the retained unchanged staging database.
- Conclusion: the full-scale importer is not a bulk loader. It performs one prepared `INSERT` execution per artifact row and per normalized row. More importantly, it holds all 27,607 large BLOB rows and their index maintenance in one transaction. The `artifact` table is `WITHOUT ROWID`, so its payload-bearing primary B-tree is also the target of each raw-metadata foreign-key lookup; that is a plausible explanation for the otherwise surprising 1,341.82 s raw-metadata insert total. The measured late-stage WAL lookup concentration and falling row rate make a bounded raw-artifact transaction the leading ingestion hypothesis; a separate skinny hash index is an additional controlled schema hypothesis. Recompression alone does not explain the remaining time.
- Falsifier: bounded commits do not remove the late-stage rate collapse under identical input and final hashes, or an independent repetition fails the exact full verifier and export comparisons.
- Next: compare the verified direct-gzip importer with raw-only bounded transactions and external immutable payloads at increasing scale.

### EXP-DB-007: durability, payload-table, and external-object matrices

- Question: are WAL, filesystem synchronization, payload-table shape, or external payload placement material before the 32 GB full-scale regime?
- Small fixture: 64 raw artifacts, 4,000 multidimensional measures, 228 gates, fixture hash `93397fb194f6919b9d3e2a4a2b3a6ba97f96b86d7019b04208a9e288b9a39084`. Three measured runs followed one warm-up per variant.
- Small medians: current 4.914 s; direct verified gzip 2.574 s; journal-off 4.948 s; synchronous-off 5.214 s; both off 4.953 s; rowid payload table 5.248 s; external payloads 2.700 s. The external variant used a 5.21 MB SQLite database plus 37.92 MB external packets versus 43.25 MB all-SQLite.
- Medium fixture: 512 raw artifacts, 40,000 measures, 228 gates, fixture hash `8659cddb727554ce3831e504ecb9e3a22219041e99633157f3f6c7932c2a35e3`. Three measured runs followed one warm-up per variant.
- Medium medians: current 35.905 s; direct verified gzip 14.766 s; bounded direct 15.708 s; bounded plus journal-off 15.480 s; bounded plus synchronous-off 15.107 s; bounded plus both off 15.008 s; rowid payload table 33.655 s; external payloads 11.961 s.
- Medium storage: current/direct SQLite 383.62 MB with a 337.04 MB peak WAL; external payloads used a 51.09 MB SQLite database plus 331.51 MB immutable packets and a 51.36 MB peak WAL. Total retained bytes are nearly unchanged; the database working set is 86.7% smaller.
- Correctness comparison: every measured variant returned `integrity: ok`, zero foreign-key failures, raw compressed/raw hash verification, identical measure digest `ef601280a039ceafb1f9722d6567c41b054c9c481170b30569a88f0e79f7a5f6`, gate digest `867d1a76b1355e0a204a71b100d4958da9265075463996564304df2b10bdf910`, and export inventory `886378a63055efdeef74ca89f739b4574e675e6bed7ce089ba52a3b88f358441`.
- Result grade: measured repeated data-plane creation, verification, export, and query benchmark. The external variant does not yet implement the full production control-plane and atomic generation-directory contract.
- Conclusion: disabling durability is not a general speed lever at small or medium scale. Avoiding recompression is large. External payloads are 19.0% faster than direct SQLite BLOBs at medium scale and sharply reduce the SQLite/WAL working set without reducing total retained packet bytes. The rowid table is a modest 6.3% improvement over the recompressing current schema at medium scale but does not approach externalization.
- Falsifier: raw-only bounded transactions fail to cap WAL or improve the representative-large/full tail, or the full external-object workflow loses atomicity, reconstruction, exact export, or any final verification.
- Next: repeat at 2,048 raw artifacts with a raw-only transaction bound, then run the exact retained campaign only for variants that survive.

### EXP-DB-008: recomputable Monte Carlo retention

- Question: if every sampled configuration is exactly replayable, what is the cost of retaining the replay recipe, packet identities, normalized measurements, and screening-gate evidence while discarding the raw packet payloads for diagnostic coverage rows?
- Baseline: verified supplied-gzip bytes embedded in SQLite.
- Changed variable: payload location only. The external variant stores the supplied gzip bytes by hash outside SQLite. The recomputable variant writes no packet payload and exports a deterministic replay-required inventory.
- Fixture: medium, 512 raw artifacts, 40,000 multidimensional measures, 228 validity gates, fixture hash `8659cddb727554ce3831e504ecb9e3a22219041e99633157f3f6c7932c2a35e3`.
- Command: `node scripts/eom/benchmark-analytical-campaign-pipeline.mjs ingest --fixture medium --variants direct-compressed,external-artifacts,metadata-only-recomputable --warmups 1 --repetitions 3 --output .local-data/braid-analysis/performance/ingest-medium-metadata-only-v1.json`
- Instrument: fresh Node process per run, monotonic phase timers, process CPU usage, peak RSS, filesystem sizes, SQLite integrity and foreign-key checks, raw/compressed source-packet hash verification, normalized-measure digest, validity-gate digest, and deterministic export inventory.
- Warm-cache results after one warm-up:

| Representation | Median wall (s) | Range (s) | SQLite bytes | External packet bytes | Export bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Supplied gzip embedded in SQLite | 14.733 | 14.730–15.033 | 383,619,072 | 0 | 331,650,841 |
| Supplied gzip external by hash | 11.920 | 11.776–12.303 | 51,093,504 | 331,510,499 | 331,650,841 |
| Recomputable metadata/results only | 8.679 | 8.271–8.992 | 51,089,408 | 0 | 151,606 |

- CPU and memory: median user/system CPU seconds were 11.561/4.379, 10.969/2.251, and 7.395/1.915 respectively; median peak RSS was 195.9 MB, 196.4 MB, and 195.9 MB.
- Correctness: all nine measured runs verified every supplied compressed and raw packet hash before ingestion, produced the same 40,000-row logical measure digest `ef601280a039ceafb1f9722d6567c41b054c9c481170b30569a88f0e79f7a5f6`, the same 228-row validity-gate digest `867d1a76b1355e0a204a71b100d4958da9265075463996564304df2b10bdf910`, zero foreign-key failures, and `integrity: ok`.
- The recomputable export records all 512 packet identities as `replayRequired`; it does not claim byte equivalence with an export that contains the packet payloads.
- Result grade: measured data-plane lower bound. It proves the load, storage, verification, and export effect after the packets exist. It does not yet prove that the production replay recipe captures every source, software, runtime, and sampling dependency needed to regenerate those identities, and it does not make the metadata-only rows independently accepted.
- Measured conclusion: compared with embedded packet BLOBs, the recomputable variant reduced this path's median wall time by 41.1%, SQLite size by 86.7%, retained payload bytes by 100%, and deterministic export bytes by 99.95%. Compared with external retention it reduced median wall time by 27.2% and retained bytes by 86.6%.
- Falsifier: replay a retained recipe in the pinned runtime. Any source, protocol, result, raw-packet inventory, normalized-measure, validity-gate, or acceptance mismatch invalidates the claim that the discarded payload was a derivable cache.
- Next: specify and test the production replay-recipe schema, then apply tiered retention to canonical anchors, failures, near-threshold results, anomalies, and an audit sample.

### EXP-DB-009: complete small ingestion hypothesis matrix

- Question: after payload strategy is separated, do transaction shape, multi-row SQL, staging, CLI import, index timing, foreign-key timing, cache, temporary storage, memory mapping, or page size materially improve the current data plane?
- Fixture: 64 exact raw artifacts, 4,000 multidimensional measures, 228 validity gates, fixture hash `93397fb194f6919b9d3e2a4a2b3a6ba97f96b86d7019b04208a9e288b9a39084`.
- Command: `node scripts/eom/benchmark-analytical-campaign-pipeline.mjs ingest --fixture small --variants current,prepared,direct-compressed,post-index,single-transaction,multi-row-64,measure-staging,sqlite-cli-measure-staging,metric-order-index,deferred-foreign-keys,larger-cache,memory-temp,larger-cache-memory-temp,mmap-256mb,page-size-8192 --warmups 1 --repetitions 3 --output .local-data/braid-analysis/performance/ingest-small-comprehensive-v3.json`
- Method: one warm-up and three fresh-process measured runs per variant, 60 total runs. One primary variable changed per named variant except the explicitly labeled cache/temporary-store interaction.

| Variant | Median wall (s) | Range (s) | Change from current | Database bytes | Peak WAL bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current | 4.885 | 4.856–4.936 | baseline | 43,245,568 | 38,715,672 |
| Persistent prepared statements | 4.846 | 4.803–4.968 | -0.8% | 43,245,568 | 38,715,672 |
| Verify supplied gzip | 2.489 | 2.471–2.516 | -49.1% | 43,245,568 | 38,715,672 |
| Build nonessential indexes after load | 4.798 | 4.788–4.818 | -1.8% | 43,053,056 | 38,612,672 |
| One transaction | 4.802 | 4.765–4.812 | -1.7% | 43,245,568 | 43,610,232 |
| 64-row measure SQL | 5.031 | 4.698–5.312 | +3.0% | 43,245,568 | 38,715,672 |
| Node staging table | 5.882 | 4.928–5.892 | +20.4% | 46,014,464 | 38,732,152 |
| SQLite CLI CSV staging | 5.012 | 4.945–5.118 | +2.6% | 47,951,872 | 38,732,152 |
| Metric-order index | 5.199 | 4.894–5.256 | +6.4% | 43,847,680 | 38,728,032 |
| Deferred foreign keys | 5.293 | 4.943–5.876 | +8.3% | 43,245,568 | 38,715,672 |
| 256 MiB cache | 5.837 | 5.211–5.936 | +19.5% | 43,245,568 | 38,715,672 |
| Memory temporary store | 5.395 | 5.287–7.257 | +10.4% | 43,245,568 | 38,715,672 |
| Cache plus memory temporary store | 6.026 | 5.199–6.121 | +23.4% | 43,245,568 | 38,715,672 |
| 256 MiB memory map | 4.949 | 4.931–5.087 | +1.3% | 43,245,568 | 38,715,672 |
| 8 KiB pages | 4.931 | 4.894–5.626 | +0.9% | 43,220,992 | 38,623,448 |

- Statement result: 64-row SQL reduced insert executions from 4,375 to 438 and insert preparations from 4,357 to 420, but total wall time did not improve. SQLite CLI staging used one CLI import and 376 Node insert executions, but its extra CSV/staging/transfer work also did not improve wall time.
- Query tradeoff: the metric-order index removed the temporary sort and reduced the sampled ordered metric query median from 1,640.9 to 728.5 microseconds (55.6%) while adding 602,112 database bytes and increasing total median wall time 6.4%. Other lookup plans were unchanged.
- Correctness: all 45 measured runs had `integrity: ok`, zero foreign-key failures, verified raw and compressed hashes, one common measure digest `2b3cf93791755a2742565afadb1dded75f3c61d1240efda386e3f79533658587`, one common gate digest `867d1a76b1355e0a204a71b100d4958da9265075463996564304df2b10bdf910`, and one common deterministic export inventory `ec4f20c4dbe7cb23f584173e8a58119fbe2ef438810c7efe62f40949fe130b40`.
- Result grade: measured small-fixture result. Later variants ran during a somewhat slower machine interval, so small differences near the run range are not accepted as speedups; large regressions and the supplied-gzip result are consistent with earlier independent matrices.
- Conclusion: the loader is row-oriented, but SQL statement count is not its leading cost. None of the transaction, staging, CLI, cache, temporary-store, mapping, page-size, or foreign-key changes merits production adoption. The metric-order index is a query-policy tradeoff, not a rebuild optimization.
- Falsifier: a medium or full logically identical run shows a material, repeatable improvement outside these ranges without increasing storage, memory, or verification cost.
- Next: only measure the metric-order index at larger scale if ordered metric distributions become an operationally important query; do not expand the ingestion tuning search before removing universal packet payloads.

### EXP-FMT-001: external formats

- Same medium fixture and three measured repetitions after a warm-up.
- Report: `.local-data/braid-analysis/performance/formats-medium-matrix.v1.json`.
- Result grade: measured creation/storage; semantic tradeoffs derived from the live contracts.
- Scope: this v1 component benchmark encodes sampled raw-artifact metadata and multidimensional measures, with exact gzip payloads externalized. It does not encode the remaining campaign control-plane tables and therefore supplies a data-plane size/time lower bound, not an independently reconstructable primary representation. Harness v2 adds complete validity gates; full source/protocol/result/acceptance/generation coverage remains a decision gate.

| Representation | Median creation s | Total bytes | Metadata bytes |
| --- | ---: | ---: | ---: |
| SQLite packet BLOBs + normalized rows | 15.091 | 383,463,424 | 51,952,925 above gzip payload |
| External packets + SQLite normalized rows | 14.640 | 382,448,355 | 50,937,856 |
| External packets + gzip NDJSON | 15.160 | 340,697,933 | 9,187,434 |
| External packets + gzip CSV | 14.496 | 339,935,828 | 8,425,329 |

CSV and NDJSON save normalized/index storage on this fixture, but they do not replace SQLite semantics. Reconstructing schema enforcement, foreign keys, indexed candidate/gate/metric/root/sensitivity lookups, partial-write protection, and atomic publication would require a validation/index layer.

The external-packet SQLite variant reduced the SQLite file from 383,463,424 to 50,937,856 bytes and peak WAL from 337,011,912 to 51,405,272 bytes, while retaining 331,510,499 exact gzip bytes externally. Total storage fell only 1,015,069 bytes (0.26%). This makes smaller database copying/checkpointing a plausible operational benefit, not a meaningful payload-elimination result. Its historical timing run also switched to persistent statements, so the 14.640-second median is not an accepted one-variable payload-location timing. The harness now keeps statement preparation unchanged between direct-compressed and external-artifact variants.

Warm-cache SQLite lookup medians across the three direct-compressed runs were about 11 microseconds for candidate artifacts, 7–8 microseconds for an artifact hash, 27 microseconds for the first root rows, and 139–144 microseconds for the first sensitivity rows. The metric-distribution query took 42.5–45.6 milliseconds because it orders matching rows by `scalar_value`; the current multidimensional index does not supply that complete ordering. Whether a new metric-distribution index is worth its load/storage cost remains an explicit query-versus-ingestion tradeoff. SQLite's live query plan confirms that `multidimensional_measure_query` finds the metric rows and then uses a temporary B-tree for the ordering; the root and sensitivity plans use their dedicated indexes without that extra sort.

The full expanded inventory exposed a stronger worst-case metric query than the earlier first-metric probe. The most common measure, `normal-wake-flux/transmitter-root-complex-coefficient`, has 138,000 rows. Five warm executions of the current `WHERE measure_id = ? ORDER BY scalar_value` query took 0.932–1.470 s (median 1.138 s); `EXPLAIN QUERY PLAN` confirms an indexed measure lookup followed by a temporary B-tree sort. The harness now selects the highest-row-count measure for this query so future reports do not hide the worst distribution behind an alphabetically early small measure.

No local Apache Arrow, Parquet, or DuckDB dependency or executable was available at inspection. A columnar dependency is therefore deferred until a measured query bottleneck justifies its inclusion and operational cost.

### EXP-PAR-000: rejected mixed-revision worker matrix

- Question: can four no-sensitivity candidates scale across one, two, and four worker threads?
- Result grade: rejected measurement.
- Result: the first attempt crossed concurrent edits to the surface reducer, evaluator, and protocol. The aggregate output hash changed during the two-worker repetitions, so no speedup was accepted.
- Conclusion: candidate and protocol hashes alone do not freeze the executing implementation in a shared checkout.
- Falsifier: none; file hashes proved that the implementation changed.
- Corrective action: the harness now binds a transitive implementation hash, compares packet bytes in addition to result and raw-inventory hashes, and is being run from immutable snapshot `0bb7310b`.
- Next: finish three exact-output repetitions at one, two, and four workers.

A serial OS sample of the frozen fixture measured the benchmark at 119.6% macOS CPU (approximately one fully occupied core) and 503 MB RSS. The same sample found Bitdefender at 86.8%, WindowServer at 33.0%, and `syspolicyd` at 32.6%. A later two-worker sample measured the benchmark at 225.1% CPU and 811 MB RSS. These are measured utilization facts; they also make the interrupted wall-time matrix a contended-machine diagnostic rather than an optimization result.

### EXP-PAR-001: rejected live Monte Carlo-aligned worker fixture

- Question: can a sandbox-only frozen-input fixture measure worker scaling while the methodology coverage review is being updated in another thread?
- Baseline: first four registered candidates, current protocol, sensitivity omitted, one worker, file artifacts plus deterministic merge.
- Harness boundary: production registry validation remained not advanced. The explicit `--allow-unreviewed-methodology-performance-fixture` mode recorded registry, methodology, coverage, protocol, candidate-spec, and implementation hashes and labeled the fixture nonpublishable.
- Attempt 1: rejected before timing because the unreviewed methodology hash was not yet covered by the production contract.
- Attempt 2: rejected when the evenly spaced fourth candidate exceeded the current protocol source envelope. No applicability constraint was relaxed.
- Attempt 3: all four first-candidate computations completed in the one-worker warm-up, but the executing implementation inventory changed from `624db3dcd5c9cda58ed3c2309c73a88cce0feeb1c20c63ca383a207b04d03ca4` to `afe3060b87dfd2779cecaec0012a5fcc53865e92ae25f5d2f3c3973d26d0e7e2` during the run. The harness rejected the warm-up and wrote no timing report.
- Result grade: rejected measurement; no speedup claim.
- Conclusion: the active Monte Carlo methodology/evaluator work is changing the exact compute path faster than this roughly five-minute fixture can finish.
- Falsifier: a run from one immutable implementation hash completes one warm-up plus three measured repetitions at 1, 2, and 4 workers with identical source, protocol, result, packet, and deterministic-merge inventory hashes.
- Next: rerun after the Monte Carlo implementation changes settle or export an explicit immutable sandbox snapshot. Do not spend another live-checkout run until then.

### EXP-PAR-002: immutable compact Monte Carlo worker matrix

- Question: how does the compact coverage evaluator scale at one, two, and four worker threads when the sampled cases and executing implementation are held fixed?
- Fixture: nine exact cases, three samples each from the coincident-midpoint equal-radius common-frequency orthogonal-axis three-binary configuration, planar common-center three-binary constraint, and coaxial-separated co-rotating two-planar-braid configuration, seed `compact-worker-matrix-snapshot-20260723-v1`; fixture hash `1e8e82849984ca14ab36e5dc4f640dbbcd11038b4302c2a3ae4500688dc54cd8`.
- Execution boundary: immutable sandbox snapshot tar hash `15d81b436bd9495f13cb15d81b6ca6b6855cb15d81b6ca9ae2afa5264a8dc2a`; implementation hash `2b03bbb0e5280d30483f5e85021477834f2f1f800659bd65309e851ada847535`; eight logical CPUs; no production database access, path evolution, EOM solver, independent acceptance, or publication.
- Method: one warm-up followed by three measured repetitions at each worker count. Tasks were assigned in seeded order to static round-robin worker partitions. Results were merged in case order.
- Result grade: measured diagnostic performance and deterministic equivalence, not mathematical correctness or catalog acceptance.

| Workers | Wall median (s) | Range (s) | Speedup | Efficiency | Median CPU-core equivalent | Peak RSS median |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 30.443 | 29.044–30.784 | 1.000x | 100.0% | 1.297 | 400.7 MB |
| 2 | 22.242 | 19.619–49.055 | 1.369x | 68.4% | 2.622 | 551.7 MB |
| 4 | 20.706 | 18.328–21.245 | 1.470x | 36.8% | 3.912 | 911.3 MB |

- Correctness comparison: pass for determinism. Every warm-up, repetition, and worker count reproduced output hash `ef2d1066b3498f8f3f935564c10b5abd4d201fd24332d169dd2eeb223ed30c80` across case ID, sampled-spec hash, exact-source hash, protocol hash, score hash, and case hash.
- Observations: the one-worker process already consumed 1.30 CPU-core equivalents, so the earlier “one core” observation is approximately, not exactly, true for this compact path. Four workers kept about 3.91 cores busy but each case slowed enough that wall speedup stopped at 1.47x. Peak RSS rose 2.27x from one to four workers. The 49.055-second two-worker run is retained as a contention outlier; the median and full range are both reported.
- Amdahl interpretation: fitting the measured medians gives an apparent serial fraction of 0.46 at two workers and 0.57 at four. The disagreement means this is not a fixed serial fraction: worker overhead, task imbalance, and shared CPU or memory contention grow with worker count. The observed four-worker result therefore does not support extrapolating one candidate per core.
- Conclusion: bounded candidate/sample parallelism is useful, but four workers buy only another 6.9% wall reduction over the two-worker median while adding about 360 MB median peak RSS. Two workers are the current conservative operating point; a dynamic scheduler and larger representative fixture must beat this result before a higher default is recommended.
- Falsifier: a larger frozen 21-configuration fixture with the same exact-output checks shows materially better four-worker efficiency and bounded memory/disk amplification.
- Next: compare static round-robin with a bounded dynamic queue on a representative cross-configuration fixture, then isolate whether compression or analytical evaluation causes the shared-resource slowdown.

### EXP-PAR-003: six- and eight-worker throughput extension

- Question: does increasing compact test-point concurrency to all eight logical CPUs increase completed tests per hour?
- Fixture and implementation: exactly the immutable EXP-PAR-002 snapshot, seed, nine cases, fixture hash `1e8e82849984ca14ab36e5dc4f640dbbcd11038b4302c2a3ae4500688dc54cd8`, and implementation hash `2b03bbb0e5280d30483f5e85021477834f2f1f800659bd65309e851ada847535`.
- Method: one warm-up and three measured repetitions at one, six, and eight workers. Throughput is `9 cases * 3,600 / run wall seconds`.
- Result grade: measured throughput for this three-configuration, nine-case diagnostic fixture. It is an estimate for future all-configuration sampling because configuration costs are not yet known to have the same distribution.

| Workers | Wall median (s) | Range (s) | Tests/hour median | Range from individual runs | Median CPU-core equivalent | Peak RSS median |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 28.915 | 28.656–29.297 | 1,121 | 1,106–1,131 | 1.292 | 402.7 MB |
| 6 | 12.972 | 12.859–14.080 | 2,498 | 2,301–2,520 | 5.060 | 1,194.1 MB |
| 8 | 13.814 | 13.679–14.302 | 2,346 | 2,265–2,369 | 5.145 | 1,542.4 MB |

- Correctness comparison: pass. Every run reproduced output hash `ef2d1066b3498f8f3f935564c10b5abd4d201fd24332d169dd2eeb223ed30c80` across the same exact identity fields as EXP-PAR-002.
- Conclusion: six workers are the measured throughput maximum in the tested set. Eight workers increased median CPU use by only 0.085 core equivalent, reduced throughput by 6.1%, and increased median peak RSS by 29.2% relative to six. “Use all logical CPUs” is therefore not the same as “finish the most test points.” Run a bounded six-worker pool by default on this machine.
- Bottleneck change: this supersedes the earlier two-worker conservative recommendation. The earlier 1/2/4 matrix stopped before the scheduling shape improved at six workers; it also contained a severe two-worker contention outlier. Six-worker repetitions were tight enough to support the updated throughput recommendation.
- Falsifier: a larger frozen 21-configuration fixture or dynamic queue moves the throughput maximum to another worker count.
- Next: use dynamic work stealing with a six-worker cap and repeat on a representative 21-configuration inventory; compare throughput per configuration as well as aggregate throughput.

### EXP-MC-001: production-shaped compact coverage packet

- Question: how much durable data does the new replayable coverage result retain before any database representation is chosen?
- Fixture: nine exact configuration-local-neighborhood cases in `compact-monte-carlo-abc-coverage-v3.json`, seed `compact-abc-benchmark-20260723-v3`.
- Result grade: one measured production-shaped diagnostic run, not a repeated timing benchmark and not complete 21-configuration coverage.
- Result: 37.160 s campaign wall; 37.143 s analytical evaluation across 37.156 s summed case wall, or 99.965% of measured case time. The nine compact rows retain 79,878 bytes in their row-size accounting. The complete deterministic JSON is 155,609 bytes and deterministic gzip is 16,682 bytes. File SHA-256 is `44f4e9dd3f5247487bdff12df1d9087ab1459475a040b937bd679ca2aad36042`.
- Correctness boundary: the packet retains exact rerun instructions, sampled-spec/source/protocol/score/case identities, normalized scores and gates, implementation identity, and the diagnostic claim boundary. It performs no independent acceptance and retains no raw ledgers.
- Conclusion: for replayable coverage, storage and database work are already negligible beside computation. A universal raw-artifact database would reintroduce the wrong cost center.
- Falsifier: a full 21-configuration schema adds a currently omitted consumer whose independent result cannot be reconstructed or promoted through a separately retained full-adjudication packet.
- Next: scale the bound compact indexed SQLite control plane and a selective full-adjudication exception store; do not import raw packet BLOBs for ordinary coverage rows.

### EXP-MC-002: production-shaped compact storage control plane

- Question: after raw ledgers are omitted from ordinary coverage, is SQLite still too slow or too large for the actual compact row contract?
- Fixture: the exact nine-row EXP-MC-001 packet, input SHA-256 `44f4e9dd3f5247487bdff12df1d9087ab1459475a040b937bd679ca2aad36042`; one warm-up and three measured repetitions per format.
- Representations: the production compact SQLite campaign/case schema with the literal `family`/`member` machine-field indexes, status, source, and score indexes under rollback journal (`journal_mode=DELETE`) plus `synchronous=NORMAL`; gzip NDJSON; and gzip CSV with each typed nested row encoded as base64 JSON so the comparison does not silently lose types or exact rerun data.
- Result grade: measured production-shaped diagnostic storage result. The fixture is intentionally small, so these are overhead measurements, not large-scale throughput claims.

| Representation | Median create/verify/query wall | Range | Stored bytes | Transient WAL | Exact logical inventory |
| --- | ---: | ---: | ---: | ---: | --- |
| Production compact SQLite | 31.803 ms | 30.025–47.604 ms | 196,608 | 0 | yes; integrity ok, zero FK failures, zero BLOB columns |
| gzip NDJSON | 3.121 ms | 2.992–3.278 ms | 13,912 | 0 | yes |
| gzip CSV + base64 JSON | 3.662 ms | 3.623–3.737 ms | 27,514 | 0 | yes |

- SQLite warm query medians were 11.145 microseconds for exact case lookup, 4.833 microseconds for member samples, and 6.000 microseconds for status lookup. NDJSON/CSV query timings apply only after the entire compressed file has been decoded into memory; they are not disk random-access measurements.
- Correctness comparison: every run reproduced logical inventory hash `69e0d4361b7c4359456b51e543be1ff646d8e9acb21cfa4e77de5044f3e7047d`.
- Conclusion: SQLite is not the problem when used as the compact control plane. Its complete measured overhead was 0.086% of the 37.160-second campaign compute wall. NDJSON is an excellent deterministic compact export, but it gives up indexed incremental queries, schema checks, relationships, and transactional updates. CSV is a poor native fit: preserving nested typed rerun instructions required wrapping JSON in base64 and produced twice the NDJSON bytes.
- Journal conclusion: the production compact path now uses a rollback journal, so a completed build leaves no WAL or shared-memory sidecar. `NORMAL` synchronization is appropriate because this local index is deterministically rebuildable from a hash-bound compact campaign. Transaction atomicity, foreign keys, canonical hash verification, and final `integrity_check` remain mandatory.
- Import shape: the nine-row fixture used one campaign insert plus nine persistent prepared case inserts inside one transaction. This is row-oriented loading, not a native bulk loader, but 10 total executions are immaterial beside analytical computation.
- Report: `.local-data/braid-analysis/performance/compact-monte-carlo-storage-control-plane-v2.json`.
- Falsifier: a representative all-configuration compact database makes SQLite load/query/export time material relative to analysis or exposes unacceptable append/checkpoint behavior.
- Next: scale the same schema across the declared 21-configuration sampling inventory and add the selective full-adjudication exception references.

### Compact control-plane implementation decision

Grade: implemented and measured local conformance; this is not independent acceptance or mathematical correctness evidence.

The default database command now addresses `.local-data/braid-analysis/compact-campaigns.sqlite3` and accepts serialized `compact-monte-carlo-campaign.v1` / `compact-monte-carlo-case.v1` packets. The schema retains:

- the complete exact rerun instruction, including sampled specification and sampled-spec, exact-source, protocol, and implementation hashes;
- score and case hashes, compact score/gate JSON, status, and measured cost;
- diagnostic claim boundaries and any compact verification receipt included in the serialized row; and
- `drawn-not-evaluated` rows with null score/hash and a structured reason.

The schema has no BLOB-typed column and no artifact, raw-artifact, multidimensional-measure, observation-event, or raw causal-root-ledger table. Import validates campaign, protocol, score, case, and row hashes before one transaction. Verification reconstructs every serialized campaign, reruns those hash checks, runs SQLite integrity and foreign-key checks, and rejects any legacy payload table or BLOB column. Re-import is idempotent; deterministic exports from two reads were byte-identical in the focused test.

The former commands are available only as explicit `legacy-*` operations and require an explicit `--database` path. `rebuild-all` without the `legacy-` prefix fails before creating a database. The deleted `.local-data/braid-analysis/analytical-campaigns.sqlite3` is therefore not recreated by the default command or benchmark. The compact opener rejects that legacy filename, and legacy CLI operations reject the compact default filename, preventing either schema from being created at the other's reserved path.

### EXP-COMP-001: live expanded-rebuild stack sample

- Question: what work occupies the serial rebuild process during raw packet generation?
- Fixture: the retained 19-candidate check-mode rebuild under current protocol file hash `2e23c6ace6d5284380a7847b77a7613e835ca5421847fbe194c1c09431b2c5d8`.
- Instrument: `/usr/bin/sample`, one-millisecond interval for five seconds, taken while 1,098 distinct raw packets and 1.1 GB of generated-campaign data had been staged.
- Result grade: measured point sample, not a whole-campaign attribution.
- Result: the process used approximately 111.7% macOS CPU before the sample and had a 1.0 GB peak physical footprint in the sample report. Of 3,868 sampled main-thread stacks, 928 were inside zlib `deflate` (24.0% of sampled active main-thread stacks). The collapsed stacks also exposed SHA-256, JSON stringification, UTF-8 encoding, sorting, floating-point conversion, and garbage collection.
- Repeated window: immediately after four result packets were retained, the raw count was 48 beyond the exact four-candidate packet total, locating the process early in candidate 5's base surface work. Of 3,779 sampled active main-thread stacks, 894 were inside zlib `deflate` (23.7%). The sample reported 626 MB current and 1.2 GB peak physical footprint.
- Conclusion: packet compression is material during computation as well as import, and the observed process is approximately single-core at these points. Similar compression shares appeared in early base-surface and later sensitivity windows. The samples do not separate event evaluation from packet serialization over the whole campaign.
- Falsifier: a phase-stratified CPU profile or repeated stack samples assign materially different shares over the complete workload.
- Next: use the retained full rebuild profile for stage wall time, then compare file-backed and in-memory raw-packet modes on an immutable candidate fixture.

### EXP-E2E-001: retained expanded-protocol full rebuild

- Question: what is the measured end-to-end phase attribution for the current 19-candidate protocol, and can its generated artifacts be reused for exact importer experiments?
- Baseline: unchanged live `rebuildAllCandidateAnalyticalDatabase()` behavior in check mode.
- Changed variable: none; `keepStaging: true` changes cleanup only, not computation, import, verification, export, generation, or database bytes.
- Fixture: live 19-candidate registry and protocol file hash `2e23c6ace6d5284380a7847b77a7613e835ca5421847fbe194c1c09431b2c5d8`; the process launched after commit `2fed88c342d595b1e63cceff56fe35aa7a0529c9`. A commit-relative audit while the process was running found no changes in the evaluator, reducer, all-candidate builder, exact-source generator, or catalog; only the database module changed after process launch for the opt-in importer experiment.
- Command: Node module invocation of `rebuildAllCandidateAnalyticalDatabase({ mode: "check", keepStaging: true })` with progress heartbeats and final report path `.local-data/braid-analysis/complete-19-candidate-nonpublishing-rebuild-profile.v1.json`.
- Machine/runtime: the machine context recorded above; Node v26.3.0 and embedded SQLite 3.53.2.
- Repetitions: one full-scale run because the expanded artifact set is expected to require hours and can be replayed for database repetitions.
- Measurements: 17,151.144 s complete wall; 8,506.956 s computation; 5,661.056 s import; 1,320.174 s initial completeness/full verification; 337.614 s deterministic export; 0.052 s generation recording; and 1,324.939 s final staged full verification. All listed phases explain 17,151.144 s to rounding.
- Candidate stage attribution: source sensitivity consumed 6,770.191 s (79.60% of candidate time; 39.47% of complete wall), base surface reduction 1,709.311 s (20.10%; 9.97% of complete wall), and every remaining candidate stage together 25.321 s (0.30%; 0.15% of complete wall).
- Candidate variation: the fastest candidate took 313.572 s; the coincident-center two-component circular co-rotating configuration, coincident-center two-component circular counter-rotating configuration, coaxial-separated two-planar-braid co-rotating configuration, and coaxial-separated two-planar-braid counter-rotating configuration took 700.980–704.905 s. Equal candidate counts are not equal worker loads.
- Contention note: during candidate 8, an attempted SHA-256 inventory of the 9.68 GB read-only production database was stopped after 10 seconds to avoid further disk/cache interference. The database inode, size, and modification time remained `174404791`, `9,677,225,984`, and `2026-07-22 20:55:22 -0400`. Treat candidate 8's interval as potentially contaminated and do not use it alone for a per-candidate cost claim.
- Correctness comparison: pass for source/protocol/result generation, independent acceptance (8 accepted, 11 rejected), deterministic export, generation fingerprint, and `integrity: ok`; 27,607 raw artifacts have 27,607 distinct raw hashes.
- Result grade: measured complete check-mode baseline; no publication claim.
- Falsifier: any final hash, acceptance, completeness, export, or integrity failure rejects the run as a reusable fixture.
- Next: profile the retained generated campaign through the verified-compressed import path without recomputing candidates, and test a lightweight structural completeness query plus one final full verification against the current duplicate full-verification sequence.

### EXP-VERIFY-001: full verification attribution and single raw pass

- Question: where does a 34.56 GB full verification spend time, and can raw packets be verified once without weakening any check?
- Baseline: the default verifier over the exact database produced by EXP-DB-006. Variant: an opt-in verifier excludes raw-artifact payloads from the generic artifact decode/hash pass, then checks the artifact/raw-hash identity, both recorded sizes, compressed SHA-256, raw SHA-256, and gzip decode exactly once in the raw-artifact pass.
- Instruments: Node SQLite statement profiler, monotonic stage heartbeats, two default runs bracketing one variant run, and five-second OS point samples.
- Default run 1: 1,295.47 s wall, 868.20 s user CPU, 217.50 s system CPU, 0.838 lifetime CPU-core equivalent, and 512 MB peak RSS. Integrity plus foreign-key checks ended at 302.01 s; the general artifact pass ended at 675.21 s; the raw pass ended at 1,294.09 s.
- Default warm control: 1,275.68 s wall, 862.87 s user CPU, 209.80 s system CPU, 0.841 CPU-core equivalent, and 515 MB peak RSS. Its corresponding boundaries were 287.52 s and 653.05 s.
- Single-pass warm variant: 1,013.83 s wall, 522.55 s user CPU, 253.19 s system CPU, 0.765 CPU-core equivalent, and 519 MB peak RSS. It was 261.85 s (20.53%) faster than the following warm default control.
- SQL attribution in the warm default: `foreign_key_check` took 189.36 s, `integrity_check` 97.87 s, the raw-artifact cursor 301.72 s, the generic artifact cursor 65.86 s, and the normalized-measure completeness query 0.85 s. The remaining 620.0 s is principally JavaScript gzip decode, SHA-256, result-packet checks, and loop/memory work around those cursors.
- Point samples: the initial check window was storage-read-bound; 4,241 of 4,266 active-main-thread top frames were `pread`. In the raw pass, sampled work included database reads, SHA-256, gzip inflate, and memory management. Point samples are diagnostic, not whole-run percentages.
- Correctness comparison: all three runs returned the identical fingerprint `68a90e6ee4277aed1dcb752d76c79337139de596c331e2cd1e677a31b9373506`, `integrity: ok`, the same generation, artifact count, and 8/11 acceptance inventory. Focused tests also corrupt a raw gzip payload and require the single-pass path to fail.
- Result grade: measured full-scale warm-cache speedup with a bracketing warm control; no production-default change.
- Conclusion: full SQLite integrity and foreign-key checks are material and remain required once before publication. Decompressing every raw payload twice is not required. More importantly, the current rebuild invokes the entire verifier twice before publication; eliminating that duplicate invocation is worth about 1,320 s on the retained baseline, before the additional measured 20.53% single-pass verifier improvement.
- Falsifier: a mutation accepted by the single-pass path but rejected by the default path, or any mismatch in fingerprint, generation, acceptance, artifact identity, or integrity.
- Next: test bounded/non-WAL staging and retain one single-pass full verifier immediately before atomic publication plus the existing post-publication verification.

## Current bottleneck ranking

Measured end to end on the retained expanded-protocol baseline:

1. Source-sensitivity computation: 39.47% of complete wall.
2. Database import: 33.01%.
3. Base complete-cycle surface computation: 9.97%.
4. Final staged full verification: 7.73%.
5. The earlier “staged completeness” phase, which calls the same full `verifyAnalyticalCampaignDatabase()` before running two lightweight inventory queries: 7.70%.
6. Deterministic export: 1.97%.
7. All fixed-probe, moving-receiver, branch, result-finalization, manifest, and generation work combined: about 0.16%.

The phase timers explain 100% of measured wall to rounding. Within import, the medium fixture still assigns 58.2% of total sampled wall to deterministic gzip recompression, 10.8% to initial raw reads/decompression/hashes, 11.3% to final verification, 4.1% to packet BLOB/metadata insertion, 1.6% to SQLite integrity/foreign-key checks, and 7.1% to harness-only measure-source replay. The exact full SQL-preload replay remains necessary before projecting the sampled recompression share onto the 5,661-second import.

This ranking supersedes both the unmeasured story that index maintenance, WAL, foreign keys, or statement reconstruction lead ingestion and the earlier assumption that one verification pass dominated. The workflow currently runs two prepublication full database verifications; publish mode would then run a third post-swap verification.

For the new compact Monte Carlo coverage lane, the bottleneck ranking changes explicitly. In the first production-shaped nine-case packet, analytical evaluation consumed 37.143 of 37.156 summed case seconds, or 99.965%. The complete durable result was only 155,609 bytes uncompressed and 16,682 bytes as deterministic gzip. Database ingestion, WAL, payload compression, and publication are therefore not plausible leading costs for ordinary coverage rows unless the storage design unnecessarily restores the raw ledgers. The archival ranking above continues to govern promoted full-adjudication cases.

## Computational scalability map

Grade: derived from live control flow, except for the explicitly measured utilization samples.

| Boundary | Independence | Determinism requirement | Resource risk | Current disposition |
| --- | --- | --- | --- | --- |
| Candidate evaluation | candidates share only immutable registry/protocol inputs; current serial loop carries no mathematical state between candidates | retain registry order for manifest/summary; compare source, protocol, result, packet-byte, and raw-inventory hashes | each worker holds a candidate packet/reductions and writes large gzip files | useful but sublinear: compact six-worker throughput is 2.23x serial; eight workers regress |
| Radius/time surface packets | evaluations are logically independent before ordered streaming reductions | reduction order must remain fixed to avoid binary64 reassociation and hash drift | dispatching individual packets can multiply retained intermediate memory and scheduler overhead | possible second-level target only after candidate scaling |
| Fixed probes and moving receivers | individual event protocols are independent before result assembly | preserve declared probe/event ordering | small task count; worker overhead may dominate | lower priority |
| Branch diagnostics | local to one candidate and source | preserve branch/root ordering | limited absolute work until profiled | do not isolate yet |
| Source-sensitivity coordinates | four perturbed sources are independent before the centered-difference reduction | merge by declared coordinate/stencil order and verify exact perturbed-source hashes | roughly four additional surface campaigns per candidate; high disk and memory amplification | promising inside a single expensive candidate, but candidate workers come first |
| JSON/SHA/gzip packet materialization | each raw packet is content-addressed independently | canonical JSON and exact gzip bytes must remain byte-identical | concurrent gzip can saturate CPUs and increase write queue/RSS | compare computation workers with a bounded compression pool |
| SQLite ingestion | statements are logically serial in the current single database | transaction order and final rows must match; SQLite permits one writer | multiple writers add lock contention and nondeterministic commit order | keep one writer; parallelize upstream work |
| Deterministic export and full verification | artifact rows can be decoded independently, but output order and final inventory are ordered | identical exported bytes and inventory hash | parallel decompression increases RSS/read bandwidth | consider bounded read workers only after import changes |

Measured utilization anchors:

- one frozen no-sensitivity candidate consumed 0.999 CPU-core equivalent;
- an OS point sample of the expanded full rebuild measured approximately 1.1 macOS CPU cores;
- the accepted compact Monte Carlo matrix measured 1.297, 2.622, and 3.912 median CPU-core equivalents at one, two, and four workers, respectively;
- the same matrix measured only 1.369x and 1.470x median wall speedup at two and four workers, while median peak RSS rose from 400.7 MB to 911.3 MB.
- the extension measured 5.060 and 5.145 median CPU-core equivalents at six and eight workers; throughput peaked at 2,498 tests/hour with six workers and regressed to 2,346 tests/hour with eight, while RSS rose from 1.19 to 1.54 GB.

These measurements verify available CPU parallelism and a real but strongly sublinear wall-time speedup for compact coverage. Six workers are the current measured operating point. They also falsify a simple one-candidate-per-core projection: useful CPU work plateaus before eight logical workers because overhead, scheduling imbalance, and shared-resource contention are not constant. The raw-artifact campaign harness retains the stronger worker-local directory and deterministic merge checks, but its full 1/2/4 archival matrix remains a separate experiment; compact coverage does not exercise that disk path. The first steady expanded-rebuild candidates completed in about 371–378 seconds, but candidate 15 completed in 314 seconds. Static equal-count worker partitions can therefore be load-imbalanced even when candidate counts match. Any production design must measure per-worker settling time and compare a bounded dynamic queue or measured-weight partition against the current round-robin benchmark while retaining registry-ordered merge. Changing gzip level, implementation, or metadata is outside the optimization boundary because it changes compressed artifact hashes. Compression parallelism must run the same deterministic encoder and reproduce every gzip byte.

## Storage-necessity audit

The retention obligation depends on campaign purpose. The published all-candidate database is an archival evidence package, while a Monte Carlo campaign over all configurations and degrees of freedom can use two storage lanes. Broad coverage can be a reproducible diagnostic result index if its exact sampled configurations are durable. Full adjudication remains an archival evidence package with the raw ledgers required by its gates. Under that split, raw packet payloads are derivable caches for coverage rows, not for stored full-acceptance claims.

| Representation | Current consumer and obligation | Classification | Candidate action |
| --- | --- | --- | --- |
| Exact source record artifact | source-hash preimage verification, reconstruction | required provenance | retain |
| Analysis protocol canonical JSON | protocol identity and reconstruction | required provenance | retain |
| Result packet artifact | result-hash identity, deterministic export, acceptance reconstruction | required acceptance and export | retain |
| Raw surface packets | independent event checks, root ledger, angular/spectral/wake-flux reconstruction | full-adjudication rows: required reconstruction; coverage rows: derivable cache | omit for coverage; retain for full adjudication |
| Raw fixed-probe packets | independent validity and convergence checks | full-adjudication rows: required acceptance; coverage rows: derivable cache | omit for coverage; retain for full adjudication |
| Raw moving-receiver packets | endpoint reduction and validity reconstruction | full-adjudication rows: required acceptance; coverage rows: derivable cache | omit for coverage; retain for full adjudication |
| Branch-diagnostic packet | branch continuity audit | full-adjudication rows: required root/continuity audit; coverage rows: derivable cache | retain for full adjudication |
| Sensitivity exact sources | perturbed source identity | required sensitivity provenance | retain |
| Sensitivity surface/endpoint packets | derivative, topology, and perturbed-gate reconstruction | full-adjudication rows: required sensitivity acceptance; coverage rows: omit sensitivity unless explicitly required | retain only where full protocol requires it |
| `artifact.payload` for raw packets | exact packet bytes | full-adjudication rows: required; coverage rows: derivable cache | omit from coverage storage |
| `analytical_raw_artifact` hashes, sizes, dimensions, and context | replay target, candidate/stage lookup, deterministic inventory | required replay index/provenance | retain without the payload |
| `multidimensional_measure.details_json` | row reconstruction and diagnostic context | mixed; many rows may repeat larger structures | field-level consumer audit required |
| `case_reduced_measure` plus summary multidimensional rows | hot scalar queries and current consumer coverage | possible redundant representation | audit exact consumers before removal |
| Three multidimensional indexes | metric/root/sensitivity queries | required for current query contract, not acceptance | retain unless query benchmarks justify redesign |
| Deterministic export files | generated from authoritative database during rebuild | derivable cache | do not retain after check; current staging cleanup already removes them |

For the existing archival generation, no raw ledger removal is approved. For a new explicitly replayable Monte Carlo coverage lane, raw payload omission is approved for continued sandbox design and measurement, not yet for production storage. A coverage row cannot receive an acceptance grade whose reconstruction requires an omitted ledger.

### Recomputable campaign contract

The phrase “run that configuration again” is exact only if the retained recipe contains:

1. the literal `family`/`member` machine identity, every degree-of-freedom value, sample ordinal, sampling algorithm and version, random seed and derived random stream;
2. exact source record or a source preimage with its source hash;
3. canonical protocol JSON and protocol hash;
4. evaluator, reducer, independent-acceptance, and serialization schema versions, plus repository revision and dirty-source identity when applicable;
5. runtime identity sufficient to reproduce deterministic floating-point and gzip behavior where those byte identities remain in the contract;
6. result hash, acceptance result and evidence, normalized measurements, gates, raw-packet inventory hashes/sizes/stages, and generation fingerprint.

The broad generation path may compute screening gates from ephemeral packets, but it records a diagnostic coverage disposition rather than full independent acceptance. A later replay is a determinism check; it is not an independent mathematical correctness proof. Promotion requires a full-adjudication rerun whose independent-acceptance instrument remains separate and whose required raw ledgers are retained.

Tiered payload retention:

- retain all payloads for canonical anchors and every full-adjudication row;
- promote favorable points, failed or near-threshold gates, anomalies, interrupted or replay-mismatched samples, a declared false-negative sample, and a deterministic audit sample to full adjudication;
- omit coverage-lane payloads only after recipe durability, compact-row commit, integrity checks, and packet-inventory recording succeed.

New failure mode: the stored recipe survives while its exact evaluator, runtime, dependency graph, or source preimage does not. Mitigation requires content-addressed source/protocol inputs, versioned instruments, a reproducible runtime manifest, periodic sampled replay, and promotion of any replay mismatch to retained archival payloads. The current storage contract requires a versioned `artifact_storage`/retention policy so readers can distinguish inline, external, and replay-required artifacts. Existing inline generations remain a rollback reference and need no destructive migration.

### Schema-field retention audit

Grade: derived from migrations plus live importer, verifier, exporter, generation-fingerprint, and query code. A `derivable cache` classification is not removal authority; exact consumers and current-reader obligations still have to be measured before a schema change.

| Table | Field group | Exact live consumer or obligation | Classification |
| --- | --- | --- | --- |
| `schema_migration` | migration ID, ordinal, checksum, tool version, timestamps | migration application and schema audit | required operational provenance |
| `artifact` | artifact hash, kind, media type, codec, raw/stored sizes, payload, producer | full byte/hash verification, result/manifest/summary/source/registry reconstruction, deterministic export | identity/provenance required; raw payload is a derivable cache only in a replayable campaign |
| `source_record` | source identity/schema/engine plus literal `family`/`member` machine fields, canonical envelope, exact-source artifact link, verification state | exact source preimage verification, campaign export, generation candidate joins | required source/protocol provenance |
| `analysis_protocol` | protocol hash/ID/schema/canonical JSON | protocol identity, result link, deterministic export | required protocol provenance |
| `analysis_protocol` | parsed speed, coupling, root tolerances, separation and convergence floors | indexed/queryable protocol inspection and conflict checks | derivable cache from canonical JSON |
| `campaign_manifest` | manifest identity/artifact, campaign ID/schema, filenames, packet directory, counts, common protocol, acceptance policy | import completeness, deterministic export paths/order, campaign acceptance | required campaign identity and export |
| `campaign_manifest` | normalized path/count/seed/stage columns | fast validation and export without reparsing manifest | derivable cache with active consumers |
| `campaign_summary` | summary identity/artifact and manifest link | exact summary export and campaign identity | required deterministic export |
| `campaign_summary` | producer status and producer acceptance JSON | producer-versus-independent audit | useful diagnostic; not independent acceptance |
| `configuration` | configuration hash, literal `family`/`member` machine fields, parameter vector, coordinate definition, alpha coordinates | candidate/configuration query and campaign case link | query cache reconstructible from retained source/spec; current consumer |
| `case_result` | result/source/protocol/artifact identities, evaluator/schema/refinement, completeness | result hash provenance, acceptance boundary, export, completeness checks | required result identity |
| `case_result` | producer status code/JSON | producer-versus-independent audit | useful diagnostic; not independent acceptance |
| `campaign_case` | manifest/order/case/type and source/configuration/result links, packet filename | deterministic campaign enumeration, completeness, export, generation joins | required campaign inventory |
| `campaign_case` | summary case JSON | conflict detection and retained manifest case context | redundant representation with an active equality check |
| `campaign_case` | sample index, strata, unit coordinates | seeded-campaign sampling contracts | required for campaigns that use sampling; currently null for the all-candidate cohort |
| `observation_event` | event identity, probe/time/root counts and reduced wake/root fields | legacy normalized event queries and completeness-preserving schema | currently zero rows in the published all-candidate cohort; ownership must be audited across checked campaigns |
| `case_reduced_measure` | scalar reduction identity/value/unit/source count | hot scalar distribution query | derivable query cache from result/raw packets |
| `validity_gate_result` | gate identity/instrument, measurement/comparator/threshold/pass, evidence hash/JSON, failure code | independent case acceptance and failure audit | required independent acceptance |
| `case_acceptance` | result/instrument/accepted/evidence hash/JSON | `accepted_case`, export, fingerprint, rejected count | required independent acceptance |
| `campaign_acceptance` | campaign/instrument/accepted/counts/evidence hash/JSON | accepted campaign export and `accepted_case` | required independent acceptance |
| `ingest_batch` | batch ID, manifest/importer, state/progress/counts/error/timestamps | transactional progress and completed-ingest proof | required operational audit; timestamp bytes are not result evidence |
| `methodology_coverage` | identity/path/file hash/impact/reduction versions/canonical JSON | preflight method coverage and provenance | required methodology provenance |
| `analytical_raw_artifact` | compressed/raw/artifact/manifest identities, candidate/kind/path, dimensions, sizes, context | raw byte verification or replay comparison, candidate/stage lookup, deterministic inventory | required raw-ledger index/provenance; payload retention is policy-controlled |
| `multidimensional_measure` | row/result/measure/reducer identities, disposition/value/unit and dimensions | metric/root/sensitivity queries, cohort digest, normalized-row completeness | derivable query cache with required current query consumers |
| `multidimensional_measure` | `details_json` | row-specific diagnostic reconstruction | mixed diagnostic/derivable representation; field-level equality audit pending |
| `database_generation` | generation/registry/artifact/instrument/counts/evidence/timestamp | publication cohort completeness, registry hash verification, fingerprint | required generation provenance; completion time is operational metadata |
| `database_generation_case` | generation/campaign/result/case plus literal `family`/`member` machine fields, source/protocol/acceptance/failed-gate | exact published cohort inventory and candidate digest | required generation provenance and query index |

Current removal verdicts:

- No acceptance evidence, identity hash, raw-artifact inventory row, or generation row is removable on current evidence.
- Raw packet payloads remain required for archival generations. They are a measured high-value removal candidate for new replayable Monte Carlo generations after the recomputable campaign contract passes replay tests.
- Parsed protocol scalars, configuration rows, scalar reduced measures, and multidimensional rows are genuine normalized caches, but they provide the present query contract. Removing them would move parse/reduction cost into every query and independent comparison.
- `campaign_case.summary_case_json`, producer status JSON, and `multidimensional_measure.details_json` are the strongest redundancy-audit candidates. Their exact byte share, consumers, and reconstruction cost remain unmeasured, so no deletion or externalization is recommended.
- `observation_event` is empty for the published all-candidate generation. That is not proof the table is globally unused because the database contract also imports checked campaigns.

## Representation decision matrix

| Representation | Exact bytes and hashes | Schema/FK | Query behavior | Incremental load | Atomicity/corruption | Current verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy SQLite BLOB archive | strong | strong | indexed | transactional | single-file staged swap plus verification | explicit legacy only; no default rebuild or automatic recreation |
| External immutable gzip + SQLite index/measures | strong if directory manifest and raw/compressed hashes are mandatory | strong for metadata | same metadata queries; one file open for payload | appendable by hash | requires staged directory publication and missing-file audit | promising, decision pending full workflow measurement |
| Compact SQLite replay recipes, identities, scores/gates, measured cost, and compact receipts | exact retained hashes; omitted raw ledgers require replay | strict schema and foreign keys | indexed case/member/status/source/score queries | natural append by campaign | one transaction plus full hash/integrity verification; replay availability is a new dependency | default local Monte Carlo control plane; production-shaped nine-row overhead is 31.8 ms, all-configuration scale gate pending |
| SQLite metadata and accepted summaries only + external raw store | raw exactness can remain | strong metadata | loses rejected diagnostic measures unless retained externally | appendable | more reconstruction joins | not yet justified |
| Gzip NDJSON | exact with explicit encodings and manifest | application-enforced | full scan without auxiliary index | concatenation/rewrite policy needed | staged multi-file manifest | export/interop format, not primary |
| Gzip CSV | exact binary64 possible only with specified decimal/hex encodings | application-enforced | full scan without auxiliary index | appendable but relationship checks external | staged multi-file manifest | export/staging format, not primary |
| Columnar | not tested; no justified local dependency selected | format-dependent | potentially good analytical scans | format-dependent | format-dependent | defer until measured query need justifies dependency |

### External-artifact failure and migration model

The exact consumer of each externalized payload would remain `readStoredArtifact()`, raw verification, deterministic export, backup, and independent reconstruction. Only the byte location changes.

Required design before production use:

1. Store each immutable gzip object at a hash-derived relative path inside a generation staging directory; keep raw hash, compressed hash, sizes, codec, and relative path in SQLite.
2. Add a store manifest that binds every expected object path/hash/size plus the SQLite file hash. Verify the entire manifest before declaring the generation complete.
3. Publish the database and object tree as one same-volume directory rename, or publish an immutable generation directory followed by one atomically replaced pointer. A separately swapped database and object directory does not satisfy the verification required for advancement.
4. Make verification fail on a missing, extra, renamed, size-mismatched, or hash-mismatched object. Backup and recovery must copy and verify the whole generation directory, not SQLite alone.
5. Introduce an artifact-storage discriminator so readers support both existing inline BLOBs and external objects during migration. Copy objects out by hash, build and verify the new index/store manifest, reproduce deterministic export and independent acceptance, then retain the inline database as rollback until the new generation passes the full completion gate.

New failure modes are directory/SQLite skew, missing objects, partial backup, orphaned objects, cross-volume non-atomic moves, and garbage collection of a still-referenced hash. The measured medium result saves only 0.26% total bytes; the design is justified only if full-scale publication, checkpoint, copy, backup, or recovery time improves enough to pay for those new obligations.

The tested recomputable design is not “accepted summaries only.” It retains normalized measurements for accepted and rejected samples, gate evidence, acceptance, and packet identities; it omits only the bulky raw packet payload. Removing normalized diagnostics as well is a separate optimization and is not approved by these measurements.

## Ranked optimization plan

1. **Use the implemented versioned compact SQLite control plane for the new Monte Carlo campaign.**
   - Measured medium benefit versus embedded packet BLOBs: 41.1% lower median load/verify/export wall time, 86.7% smaller SQLite database, no retained packet payload bytes, and 99.95% smaller deterministic export.
   - Coverage lane: preserve the exact sample recipe, source/protocol/result identities, normalized measurements, screening gates, packet identity inventory, and generation fingerprint; grade the row diagnostic.
   - Full-adjudication lane: retain complete packets and independent acceptance for canonical anchors, favorable points, failures, marginal results, anomalies, replay mismatches, a false-negative sample, and a deterministic audit sample.
   - Risk: an old sample may become unreplayable because software, runtime, or source preimages were not durably captured.
   - Rollback: the storage-policy discriminator permits inline/external packet retention; existing archival databases remain unchanged.
   - Production gate: coverage replay reproduces source, protocol, result, packet inventory, measurements, screening gates, and generation identity; full-adjudication rows additionally reproduce independent acceptance from retained ledgers in a pinned runtime.
   - Production-shaped anchor: the production compact SQLite schema imported, hash-verified, integrity-checked, and exercised indexed queries in 31.803 ms median for nine rows, versus 37.160 s to compute the packet. It stored 196,608 bytes and left no WAL.
2. **Stop deterministic gzip recompression when a packet is retained.**
   - Measured sampled benefit: 59.0% median total reduction on the medium ingestion fixture.
   - Preserve: hash the supplied gzip bytes, decompress once, verify raw size and raw SHA-256, insert the exact supplied bytes, and retain the final full verifier.
   - Reversible implementation: `experimentalRawArtifactImportMode: "verified-compressed"` is an opt-in path; the default remains `"recompress"`. Preflight verifies compressed and raw identities, ingestion re-reads and compressed-hashes the file to close the preflight-to-insert mutation window, and final verification still decompresses and verifies both identities.
   - Focused tests use a real gzip raw-artifact row: baseline and experimental imports match manifest, summary, acceptance-evidence, database fingerprint, stored gzip bytes, raw/compressed hashes, and `integrity: ok`. A deliberate post-preflight file mutation is rejected before any artifact row commits.
   - Risk: a producer could change gzip parameters while preserving raw JSON; compressed SHA-256 identity detects and records that change.
   - Rollback: restore the recompression/byte-compare path.
   - Production gate: exact full import and rebuild equivalence.
3. **Use a bounded six-worker pool for compact Monte Carlo evaluation on this machine.**
   - The six-worker extension measured 2,498 test points/hour median (2,301–2,520 across runs), 2.229x serial throughput, and 1.19 GB median peak RSS.
   - Eight workers regressed to 2,346 tests/hour while median peak RSS rose to 1.54 GB. Median CPU use barely changed from 5.060 to 5.145 core equivalents, identifying a practical saturation point before all eight logical CPUs.
   - Preserve deterministic task definitions and sorted merge. Add a bounded dynamic queue because static round-robin partitions contain unequal case costs.
   - Risk: the three-configuration fixture may not represent the cost distribution across all 21 configurations; background contention can also create severe outliers.
   - Rollback: `--workers 1` is the exact-output serial path.
   - Production gate: repeat on representative samples from all 21 configurations and retain individual runs, not just a median.
4. **Use external immutable packets for selectively retained Monte Carlo exceptions, not for every ordinary accepted sample.**
   - Measured medium storage: 331.5 MB packet store plus 50.9 MB SQLite versus 383.5 MB current SQLite.
   - Immediate size saving is small because packets remain required; operational and WAL/checkpoint behavior may still improve at full scale.
   - New failure mode: missing, renamed, partially published, or mismatched external file. Mandatory manifest/hash coverage and atomic directory publication are required.
5. **Profile exact multidimensional-row construction and hashing.**
   - Persistent statements alone did not improve total sampled time.
   - The harness replay does not include production `completeCycleMultidimensionalRows()` construction, `sha256Canonical(identity)`, or `canonicalBytes(details)`.
6. **Use rollback journal for the compact build-once control plane; keep WAL experimental rather than default.**
   - WAL became pathological because a single transaction inserted tens of gigabytes of BLOBs. The recomputable medium database had a 51.36 MB peak WAL rather than 337.04 MB.
   - Keep final integrity and atomic publication. Revisit journal mode only after the payload-free production-shaped load is measured.
   - The production compact control plane now uses rollback journal and left zero WAL bytes in every measured repetition. This is operational simplification, not a claimed speedup.
7. **Do not change foreign-key timing, batch size, or index timing on current evidence.**
   - The controlled small and medium matrices found no material benefit.
8. **Keep CSV/NDJSON as deterministic export or staging formats.**
   - Their write/storage advantage does not compensate for reconstructing the database contract.

## Open experiments

1. Compare static round-robin with a bounded dynamic worker queue on a frozen, representative 21-configuration compact fixture and isolate analytical versus compression contention.
2. Scale the production compact SQLite schema across a representative all-configuration inventory and measure append, verification, export, and query behavior.
3. Build an exact one-candidate import fixture from the published generation to include preflight JSON parsing, independent acceptance, normalized-row construction, and result hashing.
4. Run another full legacy archival rebuild only if a remaining archival question justifies its cost, using explicit `legacy-rebuild-all --database <sandbox-path> --check` with `runtimeProfile`, a Node CPU profile, and OS resource measurements.
5. Compare a production-shaped direct-gzip experimental importer against current output: source hashes, protocol hashes, result hashes, acceptance, metric rows, generation fingerprint, deterministic export inventory, and `integrity: ok`.
6. Measure a production-shaped recomputable database plus selectively retained exceptions before changing the storage contract.

## Completion gate

No legacy archival-database optimization is accepted until:

- the full unchanged baseline explains nearly all wall time;
- the variant processes logically identical inputs;
- source, protocol, result, generation, export, and raw-artifact hashes match;
- accepted/rejected inventory and every normalized metric row match;
- independent acceptance and `integrity: ok` match;
- peak memory, WAL, temporary files, and disk amplification are measured;
- the failure and rollback models are explicit; and
- no production database or artifact is deleted or overwritten.

The compact Monte Carlo control plane has a separate gate: the serialized campaign and case hashes validate; exact rerun instructions and compact scores/gates survive deterministic import/query/export; null-score rejected draws survive with their structured reason; SQLite reports `integrity: ok` and zero foreign-key failures; and the schema contains no BLOB or raw-artifact storage. The focused tests satisfy that local-conformance gate. Independent acceptance still requires a separately retained full-adjudication packet and is not implied by compact replay.
