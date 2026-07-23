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

### Next-rebuild protocol drift

Grade: derived from the live protocol and evaluator loops.

During this investigation, the next-rebuild protocol changed from file hash
`289190df392fc090c9e0135abffb2428091752f999564f15e62aac4f6f5b5824`
to
`2e23c6ace6d5284380a7847b77a7613e835ca5421847fbe194c1c09431b2c5d8`.
The current protocol retains four radii but uses 24 primary and 48 refined
cycle times, rather than the published generation's smaller grid. It therefore
writes 288 base surface packets, 293 no-sensitivity packets, and 1,453
full-sensitivity packets per candidate: 27,607 packet-write events for 19
candidates before any exact-hash coincidence.

The published 13,927-packet database remains the read-only production baseline.
The retained full rebuild measures the expanded next-rebuild workload. Its
wall time must not be compared directly with the earlier 41/70-minute
observations as if the logical input were unchanged.

### Retained expanded-protocol baseline

Grade: measured by the completed nonpublishing check-mode rebuild and the
read-only v2 full inventory.

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

Source-sensitivity surface packets account for 26,973,730,435 stored bytes
(79.6565% of raw gzip storage), base complete-cycle surfaces account for
6,736,769,664 bytes (19.8944%), and every other raw stage together accounts
for 0.4491%. The prior approximate 79%/20% observation therefore reproduces on
the expanded workload.

The report is
`.local-data/braid-analysis/complete-19-candidate-nonpublishing-rebuild-profile.v1.json`;
the full table/column/index inventory is
`.local-data/braid-analysis/performance/expanded-full-inventory.v2.json`.
The check did not publish or replace the production database.

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
| Prescribed-path event evaluation | `AnalyticalBraidEvaluator.mjs` | candidate stage timing plus point stack samples |
| Surface reduction | `B1StreamingReductions.mjs` | measured candidate stage timing |
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

On the expanded retained database, the concentration increases:

| Object group | Stored bytes | Share of 34.555 GB |
| --- | ---: | ---: |
| `artifact` table | 34,040,623,104 | 98.511% |
| `multidimensional_measure` table | 269,438,976 | 0.780% |
| Three multidimensional-measure indexes | 122,048,512 | 0.353% |
| `analytical_raw_artifact` table | 107,122,688 | 0.310% |
| Raw-artifact indexes | 15,020,032 | 0.043% |
| All remaining objects | about 1 MB | about 0.003% |

`multidimensional_measure.details_json` is 111,313,332 logical bytes
(0.322% of the database), raw `context_json` is 18,715,551 bytes (0.054%),
and `campaign_case.summary_case_json` is 98,570 bytes (0.0003%). Even removing
all three without physical overhead would save under 0.38%. Their redundancy
audit remains useful for contract clarity, but it cannot materially solve
storage volume.

## Reusable benchmark harness

`scripts/eom/benchmark-analytical-campaign-pipeline.mjs` supports:

- `inventory`: read-only workload and SQLite object inventory;
- `ingest`: small, medium, representative-large, or full hash-bound fixtures;
- `formats`: external immutable packets plus gzip NDJSON and gzip CSV tables;
- `compute`: deterministic candidate-worker experiments;
- one-variable variants for recompression, persistent statements, transaction
  bounds, index timing, journal mode, synchronous mode, foreign-key timing,
  cache/temp settings, mmap, page size, single-transaction loading, multi-row
  SQL, measure staging, SQLite CLI CSV staging, a metric-order query index,
  external packets, and an explicitly unsafe lower bound;
- warm-ups, repeated runs, individual values, median, range, CPU time, peak
  process RSS, input/output bytes, row counts, statement counts, transaction
  counts, per-phase wall time, WAL size, SQLite object size, verification,
  export, query throughput, and fixture hashes;
- each ingestion warm-up and measured repetition now runs in a fresh Node
  process, preventing earlier variants' retained heaps from contaminating peak
  RSS;
- full inventory mode records one-scan per-column logical bytes and null counts;
  it also records query plans and warm-cache latency for candidate, artifact,
  gate, metric, root, and sensitivity lookups. Summary mode avoids payload
  scans, and compute mode skips the production inventory by default so it does
  not pre-warm the database cache;
- CSV and NDJSON fixtures now decode after write and require exact logical row
  and binary64 round trips; their same lookups are measured as compressed
  full-scan lower bounds rather than treated as indexed queries;
- heartbeat output containing phase, completed work, total work, wall seconds,
  and output path.

Harness version 2 adds the selected results' complete
`validity_gate_result` rows to every ingestion fixture, fixture hash, logical
round-trip check, foreign-key/integrity check, per-phase timing, and indexed
gate query. The v1 reports below predate that addition and therefore remain
historical raw-artifact-plus-multidimensional-measure measurements; their
fixture hashes and timings must not be mixed with v2 repetitions.

The source database is always opened read-only. All writes use unique disposable
directories under `/private/tmp` unless an explicit work root is supplied.

`scripts/eom/profile-sqlite-statements-preload.mjs` instruments the actual
`node:sqlite` calls without changing importer control flow. It records prepare
and execution wall time, statement counts, changed rows, iterator rows, and
logical parameter bytes by statement class and table. It also records process
wall/CPU time, peak RSS, time before the first SQL operation, the profiled SQL
window, and transaction/DDL `exec` calls. It now attributes execution attempts,
retained changed rows, logical parameter bytes, wall time, and per-table work to
each completed transaction, and exposes any transaction still open at process
exit. A three-attempt transaction smoke with one uniqueness no-op reported
three executions, two changed rows, and one committed transaction exactly.
This instrument adds timing calls and therefore reports an instrumented
baseline; its overhead must be bounded against an uninstrumented run before
using small timing differences.

A focused campaign test under the preload confirmed table-level accounting:
304 `validity_gate_result` inserts, 304 `case_reduced_measure` inserts, 82
artifact inserts, 14 transaction begins, and 14 commits were counted across the
test's two imports and verifications. The counts match the test control flow;
the retained full campaign remains the timing target.

The import, export, and verification CLI paths now emit monotonic heartbeats
from zero completed work through each raw/case phase. This supplies exact phase
boundaries around preflight, ingestion, raw export, artifact verification, and
raw-artifact verification without changing their default data path.

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

The transaction, journal, synchronous, foreign-key, post-load-index, and
combined cache-plus-memory-temp hypotheses are killed at this fixture scale:
their changes are within or worse than the observed range. Cache size and
temporary-store location still require isolated one-variable runs.

The current small replay used two transactions containing 64 raw logical rows
and 4,000 measure rows, 4,147 insert executions, and 4,133 preparations.
Persistent statements reduced preparations to 9 without reducing wall time.
Thirty-two-row transactions increased the transaction count to 127 and reduced
peak WAL from 38,686,832 to 19,528,832 bytes, but did not improve wall time.
This makes bounded transactions a possible WAL-cap control, not a speed
optimization.

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
rebuild speedup. Median user CPU fell from 31.757 s to 11.258 s and total
user-plus-system CPU fell from 36.702 s to 16.026 s. Database and peak WAL bytes
were identical: 383,463,424 and 337,011,912 bytes. The old matrix ran variants
sequentially in one Node process, so its monotonically increasing absolute RSS
readings are order-contaminated and do not support a memory comparison. The
harness now launches a fresh process per warm-up and measured repetition; peak
RSS must be remeasured.

### EXP-DB-004: production-compatible verified-gzip safety fixture

- Question: can the importer retain supplied gzip bytes without recompression
  while preserving its fail-closed identity boundary?
- Baseline: default recompress-and-byte-compare importer.
- Changed variable: opt-in
  `experimentalRawArtifactImportMode: "verified-compressed"`.
- Fixture: baseline all-candidate campaign plus one deterministic gzip raw
  artifact bound by raw and compressed SHA-256.
- Command: focused Node test pattern `verified compressed raw import`.
- Machine/runtime: current machine context; two tests completed in 518 ms.
- Repetitions: one correctness run per test; this is not a timing benchmark.
- Measurements: baseline and variant match stored gzip bytes, raw/compressed
  hashes, manifest/summary hashes, independent acceptance evidence, row
  inventory, database fingerprint, and `integrity: ok`.
- Correctness comparison: pass. A second test changed the gzip file after
  preflight; ingestion rejected it before any artifact or raw-artifact row
  committed.
- Result grade: measured local conformance, not full-campaign performance.
- Conclusion: recompression is not required to preserve the current
  preflight-to-insert mutation check.
- Falsifier: any full fixture mismatch in artifact bytes, normalized rows,
  acceptance, fingerprint, export inventory, or final verification.
- Next: run both modes against the retained full generated campaign.

### Controlled ingestion matrix status

| Primary variable | Baseline/variant | Current evidence | Status |
| --- | --- | --- | --- |
| Gzip validation | recompress / verify supplied gzip | three small and three medium repetitions; exact safety fixture | leading measured improvement; full replay pending |
| Prepared statements | per-row prepare / persistent | small and medium | killed as leading total-wall cause |
| Transaction bound | two large transactions / 32 / 512 rows | small | no speed gain; 32 rows halves peak WAL |
| Single transaction | raw plus measures separate / one transaction | v2 functional pass | repeated timing pending |
| Row SQL shape | one measure row / 64-row SQL | v2 functional pass; 4,375 to 438 insert executions | repeated timing pending |
| Measure staging | direct indexed target / unindexed stage then ordered transfer | v2 functional pass; dropped-stage pages remain allocated | repeated timing pending |
| SQLite CLI staging | Node loop / CSV `.import` plus strict transfer | v2 functional pass; local CLI 3.51.0 | repeated timing pending |
| Index timing | maintain / create after load | small and medium | no speed gain |
| Metric query index | current index / `(measure_id, scalar_value, result_hash)` | v2 functional pass; live baseline plan shows temporary sort | repeated load/storage/query matrix pending |
| Foreign keys | immediate / final deferred check | small | no speed gain; final check retained |
| Journal | WAL / rollback journal | small | no speed gain |
| Synchronous policy | FULL / NORMAL | small sandbox only | no speed gain; unsafe mode not recommended |
| Page cache | current / 256 MiB | v2 functional pass | timing/memory run pending |
| Temporary store | default / memory | v2 functional pass | timing/memory run pending |
| Cache/temp interaction | both changes together | old small run | no speed gain; not a one-variable result |
| Memory mapping | none / 256 MiB | v2 functional pass | timing run pending |
| Page size | 4 KiB / 8 KiB | v2 functional pass | timing/storage run pending |
| Artifact table shape | payload-bearing `WITHOUT ROWID` primary B-tree / rowid payload table plus skinny unique hash index | live schema and late WAL sample identify a plausible interaction | functional and repeated timing pending |
| Payload location | SQLite BLOB / external immutable gzip | old small/medium run changed location and statement lifetime together | storage/DB/WAL result valid; isolated timing rerun pending |

### EXP-DB-005: v2 variant conformance smoke

- Question: do the newly implemented single-transaction, multi-row, staging,
  SQLite CLI, metric-index, cache, mmap, page-size, and isolated external-store
  paths preserve the expanded v2 fixture contract?
- Fixture hash:
  `93397fb194f6919b9d3e2a4a2b3a6ba97f96b86d7019b04208a9e288b9a39084`;
  64 raw artifacts, 4,000 multidimensional measures, and 228 complete validity
  gates.
- Repetitions: one functional run per variant, performed during the already
  excluded candidate-8 full-rebuild window.
- Correctness comparison: all ten variants produced `integrity: ok`, zero
  foreign-key failures, identical measure logical digest
  `2b3cf93791755a2742565afadb1dded75f3c61d1240efda386e3f79533658587`,
  and identical gate logical digest
  `867d1a76b1355e0a204a71b100d4958da9265075463996564304df2b10bdf910`.
- Result grade: measured functional conformance; all wall/CPU results are
  rejected because the expanded full rebuild was running concurrently.
- Statement-shape check: multi-row SQL reduced insert executions from 4,375 to
  438; SQLite CLI staging used one CLI import and 376 Node insert executions.
  This is a measured statement-count change, not a speedup.
- Storage observation: dropping the staging table does not reclaim its pages.
  The single-row/multi-row database was 43,245,568 bytes, in-process staging was
  46,014,464 bytes, and CLI staging was 47,951,872 bytes. Any production
  staging proposal therefore needs an explicit compaction or fresh-file
  publication model.
- Falsifier: an uncontended repeated run fails a logical digest, final
  integrity, foreign key, export, or exact packet check.
- Next: repeat the matrix uncontended and use medians before accepting any
  timing claim.

### EXP-DB-006: expanded exact verified-gzip import

- Question: when analytical computation is held out and the retained 27,607
  packet campaign is imported exactly, where does full-scale ingestion time go?
- Baseline: the unchanged full rebuild imported this generated campaign in
  5,661.056 s. The variant used the opt-in `verified-compressed` path in a new
  database under `/private/tmp`; it did not read or write the production
  database.
- Fixture: manifest
  `2d3758e886a51b5d9d890adfdced34ac77e52e73596bf518d842fd8dd32dc2d8`,
  summary
  `e582ae0ab6fe4a59b86aedc4a8db870f987ac83812f8f01c827cb64568c4d584`,
  27,607 raw artifacts, 278,826 multidimensional measures, and 228 validity
  gates from EXP-E2E-001.
- Command: `import-campaign` with
  `--experimental-raw-artifact-import-mode verified-compressed`, the Node
  SQLite statement profiler, `/usr/bin/time -l`, and monotonic progress
  heartbeats.
- Measurements: 3,662.51 s wall, 3,273.52 s user CPU, 309.06 s system CPU,
  0.978 lifetime CPU-core equivalent, and 1.68 GB peak physical footprint.
  Importer preflight before the first SQL statement took 352.10 s (9.61%).
  The SQL window took 3,310.17 s (90.39%).
- Transaction shape: seven commits were issued: four one-row migration
  transactions, one envelope/raw-artifact transaction, one all-cases
  transaction, and one campaign-acceptance transaction. The envelope/raw
  transaction executed 55,222 statements, changed 55,221 rows, processed
  33,933,223,842 logical parameter bytes, and took 3,288.74 s (89.79% of
  complete import wall). Its WAL reached about 32 GB before the single commit.
  The all-cases transaction, including all 278,826 multidimensional measures,
  took 21.42 s (0.58%).
- Table attribution: 27,647 `artifact` inserts took 1,760.24 s (48.06% of
  complete wall); 27,607 `analytical_raw_artifact` inserts took 1,341.82 s
  (36.64%); 278,826 `multidimensional_measure` inserts took 8.68 s (0.24%).
  All commits together took 108.48 s (2.96%). Statement preparation for those
  three tables took 5.39 s (0.15%), so statement reconstruction is not the
  leading cause at this scale.
- Late-stage point sample: after the WAL had grown to about 30 GB, 2,872 of
  4,189 active-main-thread top frames were in SQLite `walFindFrame` and 877
  were in `walHashGet`; together they were 89.5%. SHA-256 appeared in seven top
  frames. This is a five-second measured point sample, not a whole-import CPU
  attribution.
- Result grade: measured full-scale variant profile. The apparent 35.3%
  wall-time reduction from the unchanged 5,661.056 s baseline is provisional,
  because the variant was statement-profiled and the baseline was not. It is
  not yet the accepted production speedup.
- Correctness status: import preflight and independent acceptance passed with
  8 accepted and 11 rejected cases. Exact generation recording and the final
  full verifier are running as the remaining equivalence gates.
- Conclusion: the full-scale importer is not a bulk loader. It performs one
  prepared `INSERT` execution per artifact row and per normalized row. More
  importantly, it holds all 27,607 large BLOB rows and their index maintenance
  in one transaction. The `artifact` table is `WITHOUT ROWID`, so its
  payload-bearing primary B-tree is also the target of each raw-metadata
  foreign-key lookup; that is a plausible explanation for the otherwise
  surprising 1,341.82 s raw-metadata insert total. The measured late-stage WAL
  lookup concentration and falling row rate make a bounded raw-artifact
  transaction the leading ingestion hypothesis; a separate skinny hash index
  is an additional controlled schema hypothesis. Recompression alone does not
  explain the remaining time.
- Falsifier: bounded commits do not remove the late-stage rate collapse under
  identical input and final hashes, or the pending full verifier rejects the
  direct-gzip database.
- Next: finish full verification, then compare unprofiled direct-gzip imports
  with the same importer using bounded raw-artifact commits.

### EXP-FMT-001: external formats

- Same medium fixture and three measured repetitions after a warm-up.
- Report:
  `.local-data/braid-analysis/performance/formats-medium-matrix.v1.json`.
- Result grade: measured creation/storage; semantic tradeoffs derived from the
  live contracts.
- Scope: this v1 component benchmark encodes sampled raw-artifact metadata and
  multidimensional measures, with exact gzip payloads externalized. It does not
  encode the remaining campaign control-plane tables and therefore supplies a
  data-plane size/time lower bound, not an independently reconstructable
  primary representation. Harness v2 adds complete validity gates; full
  source/protocol/result/acceptance/generation coverage remains a decision gate.

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

The external-packet SQLite variant reduced the SQLite file from 383,463,424 to
50,937,856 bytes and peak WAL from 337,011,912 to 51,405,272 bytes, while
retaining 331,510,499 exact gzip bytes externally. Total storage fell only
1,015,069 bytes (0.26%). This makes smaller database copying/checkpointing a
plausible operational benefit, not a meaningful payload-elimination result.
Its historical timing run also switched to persistent statements, so the
14.640-second median is not an accepted one-variable payload-location timing.
The harness now keeps statement preparation unchanged between
direct-compressed and external-artifact variants.

Warm-cache SQLite lookup medians across the three direct-compressed runs were
about 11 microseconds for candidate artifacts, 7–8 microseconds for an artifact
hash, 27 microseconds for the first root rows, and 139–144 microseconds for the
first sensitivity rows. The metric-distribution query took 42.5–45.6
milliseconds because it orders matching rows by `scalar_value`; the current
multidimensional index does not supply that complete ordering. Whether a new
metric-distribution index is worth its load/storage cost remains an explicit
query-versus-ingestion tradeoff. SQLite's live query plan confirms that
`multidimensional_measure_query` finds the metric rows and then uses a temporary
B-tree for the ordering; the root and sensitivity plans use their dedicated
indexes without that extra sort.

The full expanded inventory exposed a stronger worst-case metric query than the
earlier first-metric probe. The most common measure,
`normal-wake-flux/transmitter-root-complex-coefficient`, has 138,000 rows.
Five warm executions of the current
`WHERE measure_id = ? ORDER BY scalar_value` query took
0.932–1.470 s (median 1.138 s); `EXPLAIN QUERY PLAN` confirms an indexed
measure lookup followed by a temporary B-tree sort. The harness now selects the
highest-row-count measure for this query so future reports do not hide the
worst distribution behind an alphabetically early small measure.

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

A serial OS sample of the frozen fixture measured the benchmark at 119.6%
macOS CPU (approximately one fully occupied core) and 503 MB RSS. The same
sample found Bitdefender at 86.8%, WindowServer at 33.0%, and `syspolicyd` at
32.6%. A later two-worker sample measured the benchmark at 225.1% CPU and
811 MB RSS. These are measured utilization facts; they also make the interrupted
wall-time matrix a contended-machine diagnostic rather than an optimization
result.

### EXP-COMP-001: live expanded-rebuild stack sample

- Question: what work occupies the serial rebuild process during raw packet
  generation?
- Fixture: the retained 19-candidate check-mode rebuild under current protocol
  file hash
  `2e23c6ace6d5284380a7847b77a7613e835ca5421847fbe194c1c09431b2c5d8`.
- Instrument: `/usr/bin/sample`, one-millisecond interval for five seconds,
  taken while 1,098 distinct raw packets and 1.1 GB of generated-campaign data
  had been staged.
- Result grade: measured point sample, not a whole-campaign attribution.
- Result: the process used approximately 111.7% macOS CPU before the sample and
  had a 1.0 GB peak physical footprint in the sample report. Of 3,868 sampled
  main-thread stacks, 928 were inside zlib `deflate` (24.0% of sampled active
  main-thread stacks). The collapsed stacks also exposed SHA-256, JSON
  stringification, UTF-8 encoding, sorting, floating-point conversion, and
  garbage collection.
- Repeated window: immediately after four result packets were retained, the raw
  count was 48 beyond the exact four-candidate packet total, locating the
  process early in candidate 5's base surface work. Of 3,779 sampled active
  main-thread stacks, 894 were inside zlib `deflate` (23.7%). The sample reported
  626 MB current and 1.2 GB peak physical footprint.
- Conclusion: packet compression is material during computation as well as
  import, and the observed process is approximately single-core at these
  points. Similar compression shares appeared in early base-surface and later
  sensitivity windows. The samples do not separate event evaluation from
  packet serialization over the whole campaign.
- Falsifier: a phase-stratified CPU profile or repeated stack samples assign
  materially different shares over the complete workload.
- Next: use the retained full rebuild profile for stage wall time, then compare
  file-backed and in-memory raw-packet modes on an immutable candidate fixture.

### EXP-E2E-001: retained expanded-protocol full rebuild

- Question: what is the measured end-to-end phase attribution for the current
  19-candidate protocol, and can its generated artifacts be reused for exact
  importer experiments?
- Baseline: unchanged live `rebuildAllCandidateAnalyticalDatabase()` behavior in
  check mode.
- Changed variable: none; `keepStaging: true` changes cleanup only, not
  computation, import, verification, export, generation, or database bytes.
- Fixture: live 19-candidate registry and protocol file hash
  `2e23c6ace6d5284380a7847b77a7613e835ca5421847fbe194c1c09431b2c5d8`;
  the process launched after commit
  `2fed88c342d595b1e63cceff56fe35aa7a0529c9`. A commit-relative audit while
  the process was running found no changes in the evaluator, reducer,
  all-candidate builder, exact-source generator, or catalog; only the database
  module changed after process launch for the opt-in importer experiment.
- Command: Node module invocation of
  `rebuildAllCandidateAnalyticalDatabase({ mode: "check", keepStaging: true })`
  with progress heartbeats and final report path
  `.local-data/braid-analysis/complete-19-candidate-nonpublishing-rebuild-profile.v1.json`.
- Machine/runtime: the machine context recorded above; Node v26.3.0 and embedded
  SQLite 3.53.2.
- Repetitions: one full-scale run because the expanded artifact set is expected
  to require hours and can be replayed for database repetitions.
- Measurements: 17,151.144 s complete wall; 8,506.956 s computation;
  5,661.056 s import; 1,320.174 s initial completeness/full verification;
  337.614 s deterministic export; 0.052 s generation recording; and
  1,324.939 s final staged full verification. All listed phases explain
  17,151.144 s to rounding.
- Candidate stage attribution: source sensitivity consumed 6,770.191 s
  (79.60% of candidate time; 39.47% of complete wall), base surface reduction
  1,709.311 s (20.10%; 9.97% of complete wall), and every remaining candidate
  stage together 25.321 s (0.30%; 0.15% of complete wall).
- Candidate variation: the fastest candidate took 313.572 s and the four
  Family-C candidates took 700.980–704.905 s. Equal candidate counts are not
  equal worker loads.
- Contention note: during candidate 8, an attempted SHA-256 inventory of the
  9.68 GB read-only production database was stopped after 10 seconds to avoid
  further disk/cache interference. The database inode, size, and modification
  time remained `174404791`, `9,677,225,984`, and
  `2026-07-22 20:55:22 -0400`. Treat candidate 8's interval as potentially
  contaminated and do not use it alone for a per-candidate cost claim.
- Correctness comparison: pass for source/protocol/result generation,
  independent acceptance (8 accepted, 11 rejected), deterministic export,
  generation fingerprint, and `integrity: ok`; 27,607 raw artifacts have
  27,607 distinct raw hashes.
- Result grade: measured complete check-mode baseline; no publication claim.
- Falsifier: any final hash, acceptance, completeness, export, or integrity
  failure rejects the run as a reusable fixture.
- Next: profile the retained generated campaign through the
  verified-compressed import path without recomputing candidates, and test a
  lightweight structural completeness query plus one final full verification
  against the current duplicate full-verification sequence.

## Current bottleneck ranking

Measured end to end on the retained expanded-protocol baseline:

1. Source-sensitivity computation: 39.47% of complete wall.
2. Database import: 33.01%.
3. Base complete-cycle surface computation: 9.97%.
4. Final staged full verification: 7.73%.
5. The earlier “staged completeness” phase, which calls the same full
   `verifyAnalyticalCampaignDatabase()` before running two lightweight
   inventory queries: 7.70%.
6. Deterministic export: 1.97%.
7. All fixed-probe, moving-receiver, branch, result-finalization, manifest, and
   generation work combined: about 0.16%.

The phase timers explain 100% of measured wall to rounding. Within import, the
medium fixture still assigns 58.2% of total sampled wall to deterministic gzip
recompression, 10.8% to initial raw reads/decompression/hashes, 11.3% to final
verification, 4.1% to packet BLOB/metadata insertion, 1.6% to SQLite
integrity/foreign-key checks, and 7.1% to harness-only measure-source replay.
The exact full SQL-preload replay remains necessary before projecting the
sampled recompression share onto the 5,661-second import.

This ranking supersedes both the unmeasured story that index maintenance, WAL,
foreign keys, or statement reconstruction lead ingestion and the earlier
assumption that one verification pass dominated. The workflow currently runs
two prepublication full database verifications; publish mode would then run a
third post-swap verification.

## Computational scalability map

Grade: derived from live control flow, except for the explicitly measured
utilization samples.

| Boundary | Independence | Determinism requirement | Resource risk | Current disposition |
| --- | --- | --- | --- | --- |
| Candidate evaluation | candidates share only immutable registry/protocol inputs; current serial loop carries no mathematical state between candidates | retain registry order for manifest/summary; compare source, protocol, result, packet-byte, and raw-inventory hashes | each worker holds a candidate packet/reductions and writes large gzip files | strongest parallel target; exact 1/2/4 matrix pending |
| Radius/time surface packets | evaluations are logically independent before ordered streaming reductions | reduction order must remain fixed to avoid binary64 reassociation and hash drift | dispatching individual packets can multiply retained intermediate memory and scheduler overhead | possible second-level target only after candidate scaling |
| Fixed probes and moving receivers | individual event protocols are independent before result assembly | preserve declared probe/event ordering | small task count; worker overhead may dominate | lower priority |
| Branch diagnostics | local to one candidate and source | preserve branch/root ordering | limited absolute work until profiled | do not isolate yet |
| Source-sensitivity coordinates | four perturbed sources are independent before the centered-difference reduction | merge by declared coordinate/stencil order and verify exact perturbed-source hashes | roughly four additional surface campaigns per candidate; high disk and memory amplification | promising inside a single expensive candidate, but candidate workers come first |
| JSON/SHA/gzip packet materialization | each raw packet is content-addressed independently | canonical JSON and exact gzip bytes must remain byte-identical | concurrent gzip can saturate CPUs and increase write queue/RSS | compare computation workers with a bounded compression pool |
| SQLite ingestion | statements are logically serial in the current single database | transaction order and final rows must match; SQLite permits one writer | multiple writers add lock contention and nondeterministic commit order | keep one writer; parallelize upstream work |
| Deterministic export and full verification | artifact rows can be decoded independently, but output order and final inventory are ordered | identical exported bytes and inventory hash | parallel decompression increases RSS/read bandwidth | consider bounded read workers only after import changes |

Measured utilization anchors:

- one frozen no-sensitivity candidate consumed 0.999 CPU-core equivalent;
- an OS point sample of the expanded full rebuild measured approximately 1.1
  macOS CPU cores;
- a two-worker diagnostic sample measured approximately 2.25 cores and 811 MB
  RSS, but its wall time was rejected because the machine was contended.

These measurements verify available CPU parallelism; they do not yet establish
a wall-time speedup. The benchmark harness now implements the accepted worker
design: worker-local artifact directories followed by a serial,
registry-ordered merge that re-hashes every candidate packet and compressed raw
artifact, records read/write amplification and merge time, and requires the
merged inventory hash to match across repetitions and worker counts. The
uncontended 1/2/4 measurement remains pending.
The first steady expanded-rebuild candidates completed in about 371–378
seconds, but candidate 15 completed in 314 seconds. Static equal-count worker
partitions can therefore be load-imbalanced even when candidate counts match.
Any production design must measure per-worker settling time and compare a
bounded dynamic queue or measured-weight partition against the current
round-robin benchmark while retaining registry-ordered merge.
Changing gzip level, implementation, or metadata is outside the optimization
boundary because it changes compressed artifact hashes. Compression parallelism
must run the same deterministic encoder and reproduce every gzip byte.

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

### Schema-field retention audit

Grade: derived from migrations plus live importer, verifier, exporter,
generation-fingerprint, and query code. A `derivable cache` classification is
not removal authority; exact consumers and compatibility still have to be
measured before a schema change.

| Table | Field group | Exact live consumer or obligation | Classification |
| --- | --- | --- | --- |
| `schema_migration` | migration ID, ordinal, checksum, tool version, timestamps | migration application and schema audit | required operational provenance |
| `artifact` | artifact hash, kind, media type, codec, raw/stored sizes, payload, producer | full byte/hash verification, result/manifest/summary/source/registry reconstruction, deterministic export | required byte identity and provenance; payload location negotiable |
| `source_record` | source identity/schema/engine/family/member, canonical envelope, exact-source artifact link, verification state | exact source preimage verification, campaign export, generation candidate joins | required source/protocol provenance |
| `analysis_protocol` | protocol hash/ID/schema/canonical JSON | protocol identity, result link, deterministic export | required protocol provenance |
| `analysis_protocol` | parsed speed, coupling, root tolerances, separation and convergence floors | indexed/queryable protocol inspection and conflict checks | derivable cache from canonical JSON |
| `campaign_manifest` | manifest identity/artifact, campaign ID/schema, filenames, packet directory, counts, common protocol, acceptance policy | import completeness, deterministic export paths/order, campaign acceptance | required campaign identity and export |
| `campaign_manifest` | normalized path/count/seed/stage columns | fast validation and export without reparsing manifest | derivable cache with active consumers |
| `campaign_summary` | summary identity/artifact and manifest link | exact summary export and campaign identity | required deterministic export |
| `campaign_summary` | producer status and producer acceptance JSON | producer-versus-independent audit | useful diagnostic; not independent acceptance |
| `configuration` | configuration hash, family/member, parameter vector, coordinate definition, alpha coordinates | candidate/configuration query and campaign case link | query cache reconstructible from retained source/spec; compatibility consumer |
| `case_result` | result/source/protocol/artifact identities, evaluator/schema/refinement, completeness | result hash provenance, acceptance boundary, export, completeness checks | required result identity |
| `case_result` | producer status code/JSON | producer-versus-independent audit | useful diagnostic; not independent acceptance |
| `campaign_case` | manifest/order/case/type and source/configuration/result links, packet filename | deterministic campaign enumeration, completeness, export, generation joins | required campaign inventory |
| `campaign_case` | summary case JSON | conflict detection and retained manifest case context | redundant representation with an active compatibility check |
| `campaign_case` | sample index, strata, unit coordinates | seeded-campaign sampling contracts | required for campaigns that use sampling; currently null for the all-candidate cohort |
| `observation_event` | event identity, probe/time/root counts and reduced wake/root fields | legacy normalized event queries and completeness-compatible schema | currently zero rows in the published all-candidate cohort; ownership must be audited across checked campaigns |
| `case_reduced_measure` | scalar reduction identity/value/unit/source count | hot scalar distribution query | derivable query cache from result/raw packets |
| `validity_gate_result` | gate identity/instrument, measurement/comparator/threshold/pass, evidence hash/JSON, failure code | independent case acceptance and failure audit | required independent acceptance |
| `case_acceptance` | result/instrument/accepted/evidence hash/JSON | `accepted_case`, export, fingerprint, rejected count | required independent acceptance |
| `campaign_acceptance` | campaign/instrument/accepted/counts/evidence hash/JSON | accepted campaign export and `accepted_case` | required independent acceptance |
| `ingest_batch` | batch ID, manifest/importer, state/progress/counts/error/timestamps | transactional progress and completed-ingest proof | required operational audit; timestamp bytes are not result evidence |
| `methodology_coverage` | identity/path/file hash/impact/reduction versions/canonical JSON | preflight method coverage and provenance | required methodology provenance |
| `analytical_raw_artifact` | compressed/raw/artifact/manifest identities, candidate/kind/path, dimensions, sizes, context | raw byte verification, candidate/stage lookup, deterministic raw export | required raw-ledger index/provenance |
| `multidimensional_measure` | row/result/measure/reducer identities, disposition/value/unit and dimensions | metric/root/sensitivity queries, cohort digest, normalized-row completeness | derivable query cache with required current query consumers |
| `multidimensional_measure` | `details_json` | row-specific diagnostic reconstruction | mixed diagnostic/derivable representation; field-level equality audit pending |
| `database_generation` | generation/registry/artifact/instrument/counts/evidence/timestamp | publication cohort completeness, registry hash verification, fingerprint | required generation provenance; completion time is operational metadata |
| `database_generation_case` | generation/campaign/result/case/family/member/source/protocol/acceptance/failed-gate | exact published cohort inventory and candidate digest | required generation provenance and query index |

Current removal verdicts:

- No artifact payload, raw-artifact row, acceptance evidence, identity hash, or
  generation row is removable on current evidence.
- Parsed protocol scalars, configuration rows, scalar reduced measures, and
  multidimensional rows are genuine normalized caches, but they provide the
  present query contract. Removing them would move parse/reduction cost into
  every query and independent comparison.
- `campaign_case.summary_case_json`, producer status JSON, and
  `multidimensional_measure.details_json` are the strongest redundancy-audit
  candidates. Their exact byte share, consumers, and reconstruction cost remain
  unmeasured, so no deletion or externalization is recommended.
- `observation_event` is empty for the published all-candidate generation. That
  is not proof the table is globally unused because the database contract also
  imports checked campaigns.

## Representation decision matrix

| Representation | Exact bytes and hashes | Schema/FK | Query behavior | Incremental load | Atomicity/corruption | Current verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Current SQLite BLOBs | strong | strong | indexed | transactional | single-file staged swap plus verification | retain as baseline |
| External immutable gzip + SQLite index/measures | strong if directory manifest and raw/compressed hashes are mandatory | strong for metadata | same metadata queries; one file open for payload | appendable by hash | requires staged directory publication and missing-file audit | promising, decision pending full workflow measurement |
| SQLite metadata and accepted summaries only + external raw store | raw exactness can remain | strong metadata | loses rejected diagnostic measures unless retained externally | appendable | more reconstruction joins | not yet justified |
| Gzip NDJSON | exact with explicit encodings and manifest | application-enforced | full scan without auxiliary index | concatenation/rewrite policy needed | staged multi-file manifest | export/interop format, not primary |
| Gzip CSV | exact binary64 possible only with specified decimal/hex encodings | application-enforced | full scan without auxiliary index | appendable but relationship checks external | staged multi-file manifest | export/staging format, not primary |
| Columnar | not tested; no justified local dependency selected | format-dependent | potentially good analytical scans | format-dependent | format-dependent | defer until measured query need justifies dependency |

### External-artifact failure and migration model

The exact consumer of each externalized payload would remain
`readStoredArtifact()`, raw verification, deterministic export, backup, and
independent reconstruction. Only the byte location changes.

Required design before production use:

1. Store each immutable gzip object at a hash-derived relative path inside a
   generation staging directory; keep raw hash, compressed hash, sizes, codec,
   and relative path in SQLite.
2. Add a store manifest that binds every expected object path/hash/size plus the
   SQLite file hash. Verify the entire manifest before declaring the generation
   complete.
3. Publish the database and object tree as one same-volume directory rename, or
   publish an immutable generation directory followed by one atomically replaced
   pointer. A separately swapped database and object directory is not
   fail-closed.
4. Make verification fail on a missing, extra, renamed, size-mismatched, or
   hash-mismatched object. Backup and recovery must copy and verify the whole
   generation directory, not SQLite alone.
5. Introduce an artifact-storage discriminator so readers support both existing
   inline BLOBs and external objects during migration. Copy objects out by hash,
   build and verify the new index/store manifest, reproduce deterministic export
   and independent acceptance, then retain the inline database as rollback
   until the new generation passes the full completion gate.

New failure modes are directory/SQLite skew, missing objects, partial backup,
orphaned objects, cross-volume non-atomic moves, and garbage collection of a
still-referenced hash. The measured medium result saves only 0.26% total bytes;
the design is justified only if full-scale publication, checkpoint, copy,
backup, or recovery time improves enough to pay for those new obligations.

The more aggressive “metadata plus accepted summaries only” design is not
equivalent to externalizing payloads. It would remove rejected-case normalized
diagnostics and most multidimensional query rows while retaining raw packets,
result packets, acceptance evidence, case-reduced summaries, identities, and
generation provenance. In principle, those raw/result packets can reconstruct
the removed rows; in the live contract, however, verification requires
multidimensional-row presence and query consumers read those rows directly.
Acceptance therefore requires a separately versioned schema, a deterministic
row-reconstruction tool, byte/row equality against the current database, and
measured reconstruction/query cost. No such removal is approved by the current
storage numbers alone.

## Ranked optimization plan

1. **Stop deterministic gzip recompression during import.**
   - Measured sampled benefit: 59.0% median total reduction on the medium
     ingestion fixture.
   - Preserve: hash the supplied gzip bytes, decompress once, verify raw size and
     raw SHA-256, insert the exact supplied bytes, and retain the final full
     verifier.
   - Reversible implementation: `experimentalRawArtifactImportMode:
     "verified-compressed"` is an opt-in path; the default remains
     `"recompress"`. Preflight verifies compressed and raw identities, ingestion
     re-reads and compressed-hashes the file to close the preflight-to-insert
     mutation window, and final verification still decompresses and verifies
     both identities.
   - Focused tests use a real gzip raw-artifact row: baseline and experimental
     imports match manifest, summary, acceptance-evidence, database fingerprint,
     stored gzip bytes, raw/compressed hashes, and `integrity: ok`. A deliberate
     post-preflight file mutation is rejected before any artifact row commits.
   - Risk: a producer could change gzip parameters while preserving raw JSON;
     compressed SHA-256 identity detects and records that change.
   - Rollback: restore the recompression/byte-compare path.
   - Production gate: exact full import and rebuild equivalence.
2. **Measure candidate-level worker parallelism with worker-local artifact
   directories and deterministic merge.**
   - Serial no-sensitivity smoke: 41.135 s wall, 41.110 CPU seconds,
     0.999 CPU-core equivalent; surface work was 39.715 s.
   - This verifies the earlier one-core observation for one candidate fixture.
   - The first full matrix was rejected for code drift and the frozen rerun was
     stopped when a competing full rebuild made wall time invalid. The
     uncontended 1/2/4 rerun remains pending.
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
