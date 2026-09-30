# SQLite Analytical Campaign Database Benchmark

Status: archived priority-only storage-mechanics evidence, version `v1`, 2026-07-22. Its analytical input artifacts have been retired and its candidate results have no current authority. The next complete database generation must rerun the benchmark plan in [the database requirements](../contracts/analytical-campaign-database-requirements.md#14-benchmark-plan).

## Verdict

**Measured, archived:** SQLite remains the selected V1 engine. The smallest passing physical shape was a gzip-compressed authoritative packet BLOB plus indexed hot case, gate, event, and reduced-measure tables, written by one process in bounded transactions of at most 32 cases. It passed the retired sizing run's storage, ingestion, query, crash, corruption, backup, restore, and deterministic-export gates on the operator's workstation. It is not current analytical acceptance evidence.

**Measured:** one transaction per gzip packet is not the selected ingestion setting. It produced a 54.01 MB write-ahead log (WAL) for a 5.54 MB checkpointed database, a ratio of `9.75`. Batching at most 32 cases reduced the WAL to 10.72 MB, a ratio of `1.93`, while preserving idempotency and atomic visibility. A bounded batch may be replayed after a crash; no case inside an uncommitted batch is accepted.

**Measured, archived:** normalizing the retired B1 retained-root and acceleration-response rows was unnecessary for V1. It increased the checkpointed database from 5.54 MB to 6.59 MB. It reduced one-event root inspection from 0.115 ms to 0.029 ms p95, but both paths were far below the 100 ms gate. The compressed authoritative packet therefore remains the V1 raw-ledger access path until a fresh benchmark falsifies that choice.

These are database-mechanics measurements. Synthetic scale rows are not analytical results, do not use the EOM solver, and do not grade a braid family or establish stability, energy, retention, or physical realization.

## Archived instrument boundary

The one-use B1 benchmark instrument and its analytical input packets have been retired. This report preserves only the storage-engine decision rationale. It is not reproducible current acceptance evidence; the replacement benchmark must use temporary artifacts generated from the live all-candidate registry and the plan in the database requirements.

| Identity | Value |
| --- | --- |
| Harness SHA-256 | `1fd5f853de3546e822afb28bea648607b4a997a9a432e6fca12ee70385fc57bc` |
| Temporary machine-readable result SHA-256 | `784df554ec34865180889688050fbee3c1fb72b441833345f27fba540fde6853` |
| B1 manifest hash | `6c8e668460d33ce582ba33438764a24628cf9de05d7fc54ca2c9e26845d61f08` |
| B1 summary hash | `77be2076b5b22108b1d0a6bf5937efde20c6b3b8470a725160d0246a77a504a0` |
| Runtime | Node `v26.3.0`; embedded SQLite `3.53.2` |
| Host | Apple M3, arm64, Darwin `25.5.0` |
| Evidence-run wall time | 93.14 s |

The machine-readable result is temporary operational output, not a repository artifact. This checked report retains the measurements needed for the decision. A future reproduction must generate a new result in a safe temporary directory and compare campaign identities, harness identity, runtime, and measurements rather than depending on the old temporary path.

## Retired B1 storage measurements

The retired benchmark read 260 B1 coverage packets: 10,285,858 raw bytes and 6,497,658 compact JSON-equivalent bytes. Every variant stored 260 result artifacts, 260 cases, 2,080 reduced measures, 1,040 gate rows, 260 observation events, and 260 numerical-convergence rows. The normalized variant additionally stored 1,560 retained-root rows and 3,120 acceleration-response rows; that retired campaign contained zero no-root rows.

| Physical shape | Transaction batch | Schema | First import | Reverse re-import | Checkpointed DB | WAL before checkpoint | DB / compact JSON |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Exact packet plus hot tables | 1 | 6.03 ms | 195.64 ms | 45.04 ms | 14.06 MB | 62.58 MB | `2.164` |
| Gzip packet plus hot tables | 1 | 11.59 ms | 581.14 ms | 406.72 ms | 5.54 MB | 54.01 MB | `0.853` |
| **Gzip packet plus hot tables — selected** | **32** | **6.70 ms** | **438.87 ms** | **362.09 ms** | **5.54 MB** | **10.72 MB** | **`0.853`** |
| Gzip packet plus normalized roots/responses | 32 | 45.49 ms | 508.64 ms | 341.58 ms | 6.59 MB | 14.58 MB | `1.014` |

Re-import ran in reverse case order. All four shapes retained identical logical counts and rejected a deliberately altered payload under an existing content hash.

### Selected-shape query latency

Times are p95 over the instrument's repeated runs unless stated otherwise.

| Workload | Selected-shape measurement | Gate |
| --- | ---: | ---: |
| Q1 exact source/protocol lookup, warm | 0.0034 ms | 50 ms |
| Q1 exact source/protocol lookup, reopened connection | 0.447 ms | 50 ms |
| Q2 enumerate 260 cases | 0.090 ms | 100 ms |
| Q4 failed or marginal gates | 0.181 ms | 2,000 ms at scale |
| Q5 grouped reduced measures | 0.243 ms | 10,000 ms at scale |
| Q6 decompress and inspect every root for one event | 0.115 ms | 100 ms |
| Q6 normalized-root comparison | 0.029 ms | 100 ms |
| Deterministic export and re-read of 260 packets, manifest, and summary | 78.64 ms total | Exact equality required |
| Online backup creation | 15.33 ms | Integrity required |
| Restored-database integrity, row, artifact, and byte verification | 259.59 ms | Exact equality required |

The exact lookup and campaign enumeration used their declared indexes. Reduced distributions scanned the covering reduced-measure index. The marginal-gate query scanned its covering gate index and used a temporary B-tree for part of the requested ordering; its scale result remained well inside the gate, so no additional index is justified for V1.

## Scale measurements

The scale database contained 1,000,000 synthetic case-summary rows and 10,000,000 synthetic reduced-measure rows. Values were deterministic binary64 test values selected to exercise range, gate, grouping, and correlation access paths; they are not copied or inferred campaign measurements.

| Measurement | Result |
| --- | ---: |
| Insert time, 10,000-case transactions | 11.16 s |
| Index construction time | 9.63 s |
| Checkpointed database | 538,402,816 B = 513.46 MiB |
| Integrity check | `ok` |
| Q2 enumerate 10,000 cases, p95 | 6.86 ms |
| Q2 enumerate 10,000 cases, reopened p95 | 9.67 ms |
| Q3 family/member plus parameter ranges over 1,000,000 cases, p95 | 1.74 ms |
| Q3 reopened p95 | 1.85 ms |
| Q4 failed or marginal gate filter over 1,000,000 cases, p95 | 47.20 ms |
| Q4 reopened p95 | 57.36 ms |
| Q5 distribution over 10,000,000 measures, maximum of five timed runs | 1.119 s |
| Q5 reopened maximum of three timed runs | 1.409 s |
| Q5 correlation over 1,000,000 joined rows, maximum of five timed runs | 2.774 s |

Query plans confirmed covering-index access for campaign enumeration, family/member/range filtering, gate filtering, and grouped distributions. The correlation scan selected one measure through the covering measure index and joined cases by integer primary key.

One writer completed 200 short transactions while a concurrent reader issued three full one-million-row aggregate queries. There were zero reader errors; read latency was 56.06–58.85 ms. Three samples are enough to establish absence of a lock error in this test, but not enough to estimate a reliable concurrency p95. Production preflight must run a longer mixed read/write test if interactive readers become an operational requirement.

## Integrity, crash, and recovery results

- **Measured:** all 260 stored and restored packet artifacts matched their original bytes, artifact hashes, and canonical result hashes.
- **Measured:** stored and restored manifest and summary bytes matched their checked inputs.
- **Measured:** every deterministic export file was written and re-read byte for byte.
- **Measured:** `PRAGMA integrity_check` returned `ok` for every primary and restored database.
- **Measured:** forced `SIGKILL` after artifact, case, and measure writes left zero artifact and accepted rows; forced kill after commit left exactly one artifact and one accepted row.
- **Measured:** a deliberately modified compressed payload was detected by decompression or uncompressed-hash verification.
- **Measured:** re-import added no logical rows and a same-hash/different-byte attempt was rejected.

The crash fixture tests SQLite atomicity and accepted-view isolation. It does not prove that the production acceptance instrument is mathematically independent of the producer. The production path must implement that independent instrument separately and must never translate producer `status` directly into independent acceptance.

## Gate adjudication

| Requirement | Passing observation |
| --- | --- |
| B1 first import at most 10 s | 0.439 s selected shape |
| B1 idempotent re-import at most 5 s | 0.362 s; zero added rows |
| Q1 p95 at most 50 ms | 0.447 ms including connection reopen |
| Q2 260 at most 100 ms; 10,000 at most 500 ms | 0.090 ms; 9.67 ms reopened |
| Q3/Q4 over 1,000,000 cases at most 2 s | 1.85 ms; 57.36 ms reopened |
| Q5 over 10,000,000 reduced rows at most 10 s | 1.409 s distribution; 2.774 s correlation |
| Q6 one event at most 100 ms | 0.115 ms from compressed packet |
| No accepted partial state after crash | Passed all four kill points |
| Restored integrity and exact bytes | Passed all 260 packets plus manifest and summary |
| Primary storage at most `2.5` times compact retained bytes | `0.853` |
| WAL at most `5` times checkpointed primary database growth | `1.934` with batch 32; single-case gzip failed at `9.746` |

## V1 settings fixed by this benchmark

1. Store one gzip-compressed exact packet artifact per unique content hash, with raw and stored byte lengths and the uncompressed SHA-256.
2. Store case membership, promoted configuration coordinates, independent gates, numerical convergence, and reduced scalar/vector measures in indexed hot tables.
3. Keep raw root, no-root, acceleration-response, closure, and separation ledgers authoritative inside the packet artifact for V1.
4. Use one SQLite writer, WAL journal mode, `synchronous=FULL`, prepared statements, foreign keys, and a busy timeout.
5. Commit at most 32 fully validated cases per transaction. A batch failure rolls back the whole batch and idempotent retry starts from the last committed ordinal.
6. Checkpoint WAL at controlled campaign boundaries and before verified backup creation; do not copy an active main database file as a backup.
7. Use the Node `node:sqlite` binding already present in the workspace runtime. Record and test the Node and embedded SQLite versions in every release; changing either requires the conformance benchmark.
8. Do not normalize raw ledgers until a required cross-case raw-ledger query fails its latency gate.

## Limitations and falsifiers

- Reopened-connection timings are not physical cold-cache timings; the benchmark did not flush the operating system page cache. A storage-device change or much larger working set can falsify the observed latency headroom.
- The scale rows reproduce cardinality and query shape, not the full byte distribution of future analytical measurements. A representative production-like fixture that grows beyond the storage or latency gates falsifies the size extrapolation.
- The selected batch size is bounded by measurement, not sacred. Any loss of acceptable interactive latency, WAL ratio above `5`, or replay window that violates the operator's recovery objective requires a smaller or adaptive batch benchmark.
- Full ten-million-root and twenty-million-acceleration-response scans were not run because V1 does not physically normalize those tables and has no required cross-case raw-ledger query. Opening that workload triggers a separate backfill benchmark before schema expansion.
- The concurrency probe observed zero errors but only three reader samples. More than one writer, remote writers, or sustained reader stalls triggers the PostgreSQL contingency benchmark.
- The benchmark does not independently recompute analytical gates. Any production path that consumes producer-asserted acceptance, loses a canonical hash, changes exported bytes, or permits a partial case into an accepted view falsifies the design regardless of speed.
- Temporary evidence databases are disposable and are not backups. Production acceptance still requires an off-checkout backup location and a scheduled restore drill.

## Decision remaining

No storage-engine decision remains. The next operator decision occurs only if production scope requires a different maximum uncommitted replay batch than 32 cases. Until then, 32 is the measured upper bound and the importer may choose a smaller batch without changing the logical schema.
