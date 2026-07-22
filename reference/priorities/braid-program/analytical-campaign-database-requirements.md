# Prescribed-Record Analytical Campaign Database Requirements

Status: priority-only architecture requirements, version `v0.7`, 2026-07-22. SQLite is selected. The versioned schema, all-candidate registry, acceptance instrument, importer, fresh-database rebuild-and-swap command, exporter, and backup verifier are implemented. Retired analytical campaign outputs are not repository fixtures; benchmark acceptance must be refreshed against the next complete database generation.

## 1. Purpose and scope

This packet defines a free, durable storage path for prescribed-record analytical campaigns before packet counts outgrow one JSON file per case. It is grounded in the current `prescribed-path-analysis/result-packet.v1` contract, temporary current-catalog campaign generation, and the repository's [software architecture and maintenance guidance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md).

The storage system must preserve the authority boundary already enforced by the [prescribed-path analytical evaluator](../../../src/prescribed-path-analysis/README.md): it evaluates exact prescribed paths, does not evolve those paths, and does not call the EOM solver. Database ingestion, indexing, aggregation, or export creates no stability, energy, retention, physical-realization, or completed braid-family grade. Acceleration-response rows remain prescribed-record analytical measurements.

The system must be free to use locally or self-host. "Free" means zero required license or service fee. Local disk, compute, backup media, operator time, maintenance, and recovery testing remain real costs under every option.

The architecture target is one canonical storage path per responsibility:

- exact hashes and versioned records define identity;
- transactional metadata and hot reduced measures serve ordinary queries;
- authoritative raw ledgers remain recoverable;
- deterministic JSON and Markdown exports preserve review, fixture, publication, and candidate-summary workflows; and
- PostgreSQL remains a migration contingency only if measured SQLite limits are reached.

The live SQLite files are runtime data, not repository source. V1 keeps them at the predictable checkout-local path `.local-data/braid-analysis/`, which is Git-ignored. The repository owns schemas, migrations, importer/exporter code, benchmark specifications, small deterministic fixtures, and user-visible Markdown summaries; Git does not own the database, its journal files, or its backups.

This packet is `priority-only`. It does not promote a database choice into reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

## 2. Retired sizing evidence and current verification boundary

### 2.1 Evidence boundary

The packet-size measurements below remain architecture-sizing evidence only. Their analytical campaign outputs have been removed because the candidate geometries and measure set are being regenerated. They must not be cited as current candidate results, acceptance evidence, or corpus measurements. Current implementation checks use temporary campaigns generated from the live all-candidate registry and delete them after each test.

The active contracts are:

- [AnalyticalBraidEvaluator.mjs](../../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs), which constructs and hashes `result-packet.v1`;
- [the evaluator contract](../../../src/prescribed-path-analysis/README.md);
- [the all-candidate campaign generator](../../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs);
- [database tests](../../../tests/analytical-campaign-database.test.js), [rebuild tests](../../../tests/all-candidate-analytical-rebuild.test.js), [evaluator tests](../../../tests/prescribed-source-wake-evaluator.test.js), and [root tests](../../../tests/prescribed-orbit-causal-roots.test.js); and
- the Braid Program [method](method.md), [charter](README.md), and live priority-lane conventions.

The retired sizing set contained 260 cases: 256 seeded samples and four anchors. Its row shapes remain useful for capacity formulas, while current tests independently exercise accepted and rejected current-catalog cases, a one-root/one-no-root case, exact-source retention, and fail-closed campaign acceptance.

### 2.2 Direct footprint measurement

All byte counts below were measured from the retired 2026-07-22 sizing set. `MB` is decimal; `MiB` uses powers of 1024. The next complete generation must replace these calibration values before they govern a scale decision.

| Item | Measured value |
| --- | ---: |
| Result packets | 260 files |
| Packet bytes, total | 10,285,858 B = 10.29 MB = 9.81 MiB |
| Packet bytes, minimum / mean / maximum | 37,453 / 39,560.99 / 41,335 B |
| Compact JSON-equivalent packet bytes, total | 6,497,658 B = 6.50 MB |
| Compact JSON-equivalent packet bytes, minimum / mean / maximum | 22,883 / 24,990.99 / 26,765 B |
| Coverage manifest | 6,495 B |
| Coverage summary | 884,439 B |
| Full campaign file content | 11,176,792 B = 11.18 MB = 10.66 MiB |
| Filesystem allocation reported by `du -sk` | 11,276 KiB = 11.01 MiB |
| Individually gzip-compressed packets, total | 1,681,598 B |
| One cross-packet gzip stream | 1,491,425 B |
| One cross-packet Brotli stream | 499,273 B |
| Gzip-compressed coverage summary | 116,387 B |

Compression results are measured on JSON bytes, not promises for a database implementation. They do show that repeated field names, identities, and protocol data are highly compressible. Cross-packet gzip is 23% of compact packet bytes, while the measured Brotli stream is 7.7%.

### 2.3 Packet decomposition

The following decomposition serializes non-overlapping packet components as compact JSON. Reduced measures are counted separately because the current packet deliberately repeats selected raw-ledger values in query-ready form.

| Component | Current rows | Mean compact bytes per packet | Mean bytes per row or object | Repetition finding |
| --- | ---: | ---: | ---: | --- |
| Envelope, evaluator, claim boundary, status, falsifier, result hash | 260 objects | 856 | 856/object | Case-unique because the result hash is unique; most text is repeated. |
| Source and source provenance excluding the parameter vector | 260 objects | 900 | 900/object | 260 exact serialized identities because record ids and hashes differ. |
| Exact configuration parameter vector | 260 objects | 2,362 | 2,362/object | 260 unique vectors. |
| Protocol hash, protocol, tolerances, and probe definitions | 260 copies | 1,298 | 1,298/object | Exactly one unique object repeated 260 times: 337,480 B can reduce to one 1,298 B logical record before index overhead. |
| Event shell rows | 260 | 539 | 539/row | Exactly one serialized shell repeated 260 times under the common protocol. |
| Retained-root rows excluding acceleration contributions | 1,560 | 6,969 | 1,161/row | Measurement values are case-unique; transmitter and field identities repeat. |
| Explicit no-root rows | 0 in B1 coverage | 2 for the empty array | 214/row in an in-memory independent static sizing case | The schema must reserve explicit rows even though B1 coverage has none. |
| Per-root acceleration-response rows | 3,120 | 1,314 | 110/row while nested | Twelve rows per packet; polarity and field names repeat. A normalized row will also carry foreign-key identity. |
| Event aggregate measurement rows | 260 | 442 | 442/row | Case-unique values, repeated again in reduced form by design. |
| Prescribed-period closure rows | 1,560 | 1,885 | 314/row | Six rows per packet. |
| Primary plus refined minimum-separation rows | 7,800 | 5,334 | 178/row | Thirty rows per packet; pair identities repeat heavily. |
| Numerical-convergence rows | 260 | 490 | 490/row | One comparison row per event. |
| Reduced measures | 260 objects | 2,196 | 2,196/object | Query-ready case-unique summaries; the event and convergence subsections intentionally repeat raw values. |
| Campaign summary case metadata | 260 rows | 2,209 | 2,209/row | Holds case ordinal, sampling coordinates, hashes, gates, and reductions that are not fully present as campaign metadata inside each packet. |

The coverage packet itself does not carry a complete campaign-case row. The summary binds each packet to `caseId`, `caseType`, sample index, strata, unit coordinates, and the campaign inventory. A database must therefore model campaign membership separately rather than trying to infer it only from `source.generatingSpec` text.

Current refinement storage has a further boundary: the packet retains primary root rows, primary and refined separation ledgers, and comparison rows for the tighter root evaluation. It does not retain a second complete refined-root ledger. Import must preserve that V1 fact exactly; it must not invent unrecorded refined roots. A future schema may retain every declared refinement level as its own analysis evaluation.

### 2.4 Repeated versus case-unique data

The measured repetition pattern supports normalization and ordinary lossless compression:

- One protocol and event schedule are repeated across all 260 packets.
- Family/member identities, evaluator identity, schema ids, units, root policy, transmitter ids, pair ids, probe polarity, and field names recur in nearly every row.
- Exact parameter vectors, source hashes, result hashes, root values, acceleration-response components, closure residuals, separation values, convergence changes, and reduced measures are case-unique.
- The 884,439 B coverage summary repeats 574,259 compact bytes of per-case reductions already present in packets. That repetition is useful for hot queries but should be represented as rebuildable projections, not a second authority.
- The one-file-per-packet layout pays filesystem, directory, backup, and migration costs per case even when the payload compresses well across cases.

## 3. Workload and growth model

### 3.1 Cardinality model

Define:

- $F$: braid families;
- $M$: members per family;
- $C$: base sampled configurations per member;
- $D$: directed-refinement configurations per member;
- $B$: robustness-neighborhood configurations per member;
- $K$: campaign versions;
- $S$: seeds per campaign;
- $P$: protocols per source configuration;
- $L$: retained numerical refinement levels;
- $Q$: probe positions;
- $T$: observation times per probe;
- $X$: transmitters per configuration;
- $R$: mean retained roots per event, with $0\leq R\leq X$ under the current simple-root policy;
- $A$: probe polarities or other declared acceleration-response channels per retained root;
- $G$: stored separation grids per retained evaluation; and
- $J$: refinement comparisons per base case, normally $L-1$.

Then:

$$
N_{\mathrm{cfg}}=FM(C+D+B),
$$

$$
N_{\mathrm{base}}=N_{\mathrm{cfg}}KSP,
\qquad
N_{\mathrm{eval}}=N_{\mathrm{base}}L,
$$

$$
N_{\mathrm{event}}=N_{\mathrm{eval}}QT,
\qquad
N_{\mathrm{root}}=N_{\mathrm{event}}R,
$$

$$
N_{\mathrm{no\ root}}=N_{\mathrm{event}}(X-R),
\qquad
N_{\mathrm{response}}=N_{\mathrm{root}}A,
$$

$$
N_{\mathrm{closure}}=N_{\mathrm{eval}}X,
$$

$$
N_{\mathrm{separation}}
=N_{\mathrm{eval}}G\frac{X(X-1)}{2},
$$

$$
N_{\mathrm{convergence}}=N_{\mathrm{base}}JQT.
$$

Directed and robustness work enters as additional declared configurations, not as an evidence upgrade. Campaign, seed, protocol, and refinement dimensions multiply those coordinates only when distinct results are actually retained.

### 3.2 Calibrated byte model

For a transparent JSON-equivalent payload estimate, use the measured B1 compact sizes:

| Symbol | Calibrated bytes | Contents |
| --- | ---: | --- |
| $b_{\mathrm{eval}}$ | 6,927 | Case envelope, source/configuration provenance, protocol allocation, fixed reduced-measure and container overhead, calibrated so the retired sizing set reproduces its compact total. |
| $b_{\mathrm{event}}$ | 1,577 | Event shell, raw aggregate measures, and reduced event projection. |
| $b_{\mathrm{root}}$ | 1,161 | Retained-root row excluding acceleration responses. |
| $b_{\mathrm{no\ root}}$ | 214 | Measured explicit no-root row from the independent static sizing case. |
| $b_{\mathrm{response}}$ | 110 | Nested per-root acceleration-response row. |
| $b_{\mathrm{closure}}$ | 314 | Per-transmitter prescribed-period closure row. |
| $b_{\mathrm{separation}}$ | 178 | One pair row on one stored grid. |
| $b_{\mathrm{convergence}}$ | 980 | Raw plus reduced copy of one event comparison, reflecting the V1 packet. |

The calibrated estimate is

$$
\begin{aligned}
B_{\mathrm{JSON\ equiv}}\approx{}&
b_{\mathrm{eval}}N_{\mathrm{eval}}
+b_{\mathrm{event}}N_{\mathrm{event}}
+b_{\mathrm{root}}N_{\mathrm{root}}\\
&+b_{\mathrm{no\ root}}N_{\mathrm{no\ root}}
+b_{\mathrm{response}}N_{\mathrm{response}}
+b_{\mathrm{closure}}N_{\mathrm{closure}}\\
&+b_{\mathrm{separation}}N_{\mathrm{separation}}
+b_{\mathrm{convergence}}N_{\mathrm{convergence}}.
\end{aligned}
$$

This is a measured record-shape model, not a database-size prediction. A database adds pages, row headers, indexes, journals, and free space, while normalization and compression remove repeated content. Those effects must be measured by the benchmark rather than hidden inside a speculative multiplier.

### 3.3 Scale scenarios

The scenarios below are workload envelopes, not forecasts or physical claims. Their assumptions are explicit so any row can be recomputed.

| Scenario | Explicit dimensions | Retained evaluations | Events | Roots | Acceleration responses | JSON-equivalent payload |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Retired B1 sizing case | $F=M=K=S=P=L=Q=T=1$; $C=260$; $X=R=6$; $A=2$; $G=2$; $J=1$ because the V1 packet stores a comparison without a second full root ledger | 260 | 260 | 1,560 | 3,120 | 6.20 MiB, matching the retired 6.50 MB compact-packet calibration |
| Near-term envelope | $F=3$, $M=4$, $C=256$, $D=96$, $B=64$; $K=S=P=1$; $L=2$; $Q=4$, $T=8$; $X=R=6$; $A=2$; $G=1$, $J=1$ | 9,984 | 319,488 | 1,916,928 | 3,833,856 | 3.19 GiB |
| Large envelope | $F=6$, $M=8$, $C=1,024$, $D=B=512$; $K=1$, $S=P=L=2$; $Q=16$, $T=32$; $X=R=8$; $A=2$; $G=1$, $J=1$ | 786,432 | 402,653,184 | 3,221,225,472 | 6,442,450,944 | 4.81 TiB |
| Stress envelope | $F=8$, $M=12$, $C=4,096$, $D=B=2,048$; $K=S=P=L=2$; $Q=32$, $T=64$; $X=12$, $R=10$; $A=2$; $G=1$, $J=1$ | 12,582,912 | 25,769,803,776 | 257,698,037,760 | 515,396,075,520 | 382 TiB |

The near-term payload is dominated by retained roots at 2.07 GiB, event rows at 480 MiB, and acceleration responses at 400 MiB. In the large envelope, roots contribute about 3.40 TiB, acceleration responses 657 GiB, and event rows 591 GiB. Family/member and configuration metadata is not the dominant term once $QT$, $R$, and $A$ grow. Transmitter count also produces a quadratic separation term through $X(X-1)/2$, but root/event rows dominate the shown scenarios.

The sensitivity order is therefore:

1. probe positions times observation times, because $QT$ multiplies events, roots, responses, and convergence;
2. retained roots and acceleration-response channels per event;
3. protocols, seeds, and retained refinement levels, because they replicate the event workload;
4. configuration counts, including directed and robustness additions;
5. transmitter count, linear in closure/root opportunities and quadratic in separation pairs; and
6. family/member identity metadata, which is small and highly repeated.

## 4. Required queries

Technology selection must serve these workloads before it serves a preferred database style.

| Query id | Required query | Required access path and result |
| --- | --- | --- |
| Q1 | Retrieve an exact result by source hash and protocol hash. | Unique lookup on `(source_hash, protocol_hash, evaluator_version, refinement_id)` returning result hash, acceptance state, and artifact identity. |
| Q2 | Enumerate a campaign deterministically. | Range scan on `(campaign_id, case_ordinal)` returning every anchor/sample in manifest order with no filesystem glob semantics. |
| Q3 | Filter configurations by family/member and parameter ranges. | Composite family/member index plus typed materialized parameter columns; the exact canonical parameter vector remains authoritative. |
| Q4 | Find failed or marginal validity gates. | Gate-state and margin indexes returning failure code, measured value, threshold, independent gate instrument, and case identity. |
| Q5 | Obtain distributions and correlations without loading raw ledgers. | Scan only reduced scalar/vector tables or a campaign-summary projection. Raw root rows must not be required. |
| Q6 | Inspect every retained-root or explicit no-root row for one event. | Event-key range scan ordered by transmitter id and root ordinal, joined to per-root acceleration contributions. |
| Q7 | Compare numerical refinements. | Lookup by configuration, protocol, event identity, and ordered refinement level, including root-identity and component-change rows. |
| Q8 | Locate source or protocol drift. | Group exact hashes by stable source/protocol id and evaluator/schema version; report multiple hashes and the campaigns that consumed each. |
| Q9 | Resume interrupted ingestion without duplication. | Unique natural keys, content hashes, and an ingestion journal permit retry after any committed boundary. |
| Q10 | Export a self-contained reproducibility packet. | Resolve manifest, source, protocol, case results, raw ledgers or authoritative packet artifact, acceptance evidence, and schema versions into deterministic ordered JSON. |
| Q11 | Maintain a readable candidate digest. | Export a small Markdown table of named metric leaders, anchors, and operator-selected cases with selection reason, measured summaries, claim boundary, and exact result identity. A global `top` label requires a declared ranking policy; otherwise leadership is per named measure. |

Secondary expected workloads are campaign-to-campaign comparison, family/member inventory, missing-artifact detection, backup verification, and rebuild of every summary projection from authoritative retained data.

## 5. Integrity and reproducibility requirements

The following are non-negotiable.

1. **Hashes are identities.** Exact source, protocol, manifest, result, and artifact hashes are first-class keys or unique candidate keys. Human ids are labels, not substitutes.
2. **Canonical hash rules are versioned.** Each hash records its algorithm, canonicalization rule, schema version, and whether the result hash excludes its own field as `result-packet.v1` does.
3. **Ingestion is idempotent.** Re-ingesting identical bytes changes no logical row count. A hash collision with different canonical bytes is a fatal integrity error.
4. **Acceptance is fail-closed.** Partial, failed, quarantined, or hash-invalid cases cannot appear in accepted views or accepted campaign counts.
5. **Evaluator and schema versions are explicit.** Store evaluator id/version, packet schema, source schema, protocol schema, database schema migration, and exporter version.
6. **Measurement definitions remain explicit.** Units, coordinate definitions, reference frame, probe kind and position, probe polarity, observation time, coupling, field speed, tolerances, retained-history bounds, root policy, sampling rule, and convergence policy are never implicit defaults.
7. **Raw ledgers remain recoverable.** The authoritative packet bytes or a lossless canonical reconstruction plus every required ledger row must survive compaction and migration.
8. **Summaries are rebuildable.** Reduced measures, distributions, correlations, and acceptance counts are projections whose definitions and versions are recorded. They can be deleted and rebuilt without losing authority.
9. **Exports are deterministic.** Stable field mapping, canonical key order, array order, numeric representation, and case order must reproduce canonical packet, manifest, and summary hashes where the source schema defines them.
10. **Producer assertions are not acceptance evidence.** Producer-carried `status`, `claimGrade`, `evidenceStatus`, or gate booleans are retained as source fields but never consumed as sufficient acceptance. An independently versioned acceptance instrument recomputes or verifies every required gate and stores its own evidence hash.
11. **No authority laundering.** Database presence, query success, compression, correlation, or an accepted analytical gate does not imply stability, energy, retention, physical realization, or completed braid-family grading.
12. **Foreign keys and completeness checks are enforced.** An accepted case must have its source, protocol, manifest membership, result artifact, required event/root-or-no-root coverage, required reductions, and independent acceptance rows in the same committed state.

## 6. Logical schema

Implemented SQLite schema id: `prescribed-record-analytics/sqlite.v1`, migration ordinal `2`. Names below state the engine-neutral logical contract; V1 materializes hot query tables and retains cold raw ledgers in exact compressed packet artifacts.

| Entity | Primary identity and essential fields | Authority role |
| --- | --- | --- |
| `schema_migration` | `(schema_id, migration_ordinal)`, checksum, applied time, tool version | Reproducible database evolution. |
| `evaluator_version` | `(evaluator_id, evaluator_version)`, code/source hash when available, path-evolution and EOM-solver invocation declarations | Binds computation identity without strengthening its claim. |
| `source_record` | `source_hash`; record id, exact/source schemas, upstream source hash, engine id/version, taxonomy, claim/evidence source fields, canonical source bytes or artifact hash | Exact prescribed source identity. |
| `source_file` | `source_file_hash`; path-at-ingest, media type, byte length, artifact hash | Optional provenance for the file that supplied a source record. |
| `analysis_protocol` | `protocol_hash`; protocol id/schema, canonical protocol bytes, field speed, coupling, histories, return window, root policy, tolerances, geometry and convergence policy | Complete analysis contract. |
| `protocol_probe` | `(protocol_hash, probe_ordinal)`; stable probe id, kind, position, coordinate definition, units | Normalized probe declaration. |
| `protocol_observation` | `(protocol_hash, probe_ordinal, time_ordinal)`; observation time and unit | Deterministic event schedule. |
| `protocol_probe_polarity` | `(protocol_hash, probe_ordinal, polarity_ordinal)`; exact polarity value | Declared acceleration-response channels. |
| `campaign_manifest` | `manifest_hash`; campaign id/version/stage, manifest schema, canonical bytes, date, claim boundary, acceptance/report policies | Immutable campaign declaration. |
| `campaign_seed` | `(manifest_hash, seed_ordinal)`; algorithm, exact seed token | Makes seeded sampling explicit and extensible. |
| `configuration` | `configuration_hash`; family id, member id, exact canonical parameter-vector bytes, parameter-vector schema, coordinate-definition version | Stable exact configuration independent of one campaign. |
| `configuration_parameter` | `(configuration_hash, parameter_id, parameter_ordinal)`; exact decimal token, query projection as integer/real/numeric/text, unit, coordinate definition | Range-query projection; canonical vector remains hash authority. PostgreSQL may project arbitrary-precision values into `NUMERIC`, while V1 SQLite retains the exact token as text plus only verified binary64 projections. |
| `campaign_case` | `(manifest_hash, case_ordinal)`; case id/type, configuration hash, sample index, strata, unit coordinates, source hash | Deterministic manifest membership and sample metadata. Unique `(manifest_hash, case_id)`. |
| `analysis_evaluation` | `evaluation_id`; source hash, protocol hash, evaluator id/version, refinement level/id, schema version, started/completed state | One retained evaluator execution. Unique natural key across exact inputs and refinement. |
| `case_result` | `result_hash`; evaluation id, packet schema, status source fields, result canonicalization version, authoritative artifact hash, completeness state | Exact result identity. Unique accepted result per evaluation. |
| `campaign_case_result` | `(manifest_hash, case_ordinal, evaluation_role)`; result hash | Allows one exact result to be referenced by campaigns without copying it. |
| `observation_event` | `event_id`; result hash, probe ordinal, time ordinal, position, retained-history bounds, completeness policy/source assertion | Event identity and schedule. Unique `(result_hash, probe_ordinal, time_ordinal)`. |
| `retained_root` | `(event_id, transmitter_id, root_ordinal)`; root id/status, emission/reception time, bracket, residuals, positions, velocities, displacement, direction, distance, $D_t$, margins, weights, wake contributions, iteration and certificate fields | Authoritative retained-root ledger. |
| `no_root` | `(event_id, transmitter_id)`; reason, retained interval, endpoint residuals, certified speed bound and monotonicity margin | Explicit zero-root ledger. Mutually exclusive with a retained root for the same transmitter under the V1 simple-root policy. |
| `root_acceleration_response` | `(event_id, transmitter_id, root_ordinal, polarity_ordinal)`; acceleration-response vector and units | Per-root acceleration contribution. |
| `event_reduced_measure` | `(event_id, measure_id, reduction_version)`; scalar or vector value, unit, rebuild provenance | Hot event projection. |
| `prescribed_period_closure` | `(result_hash, transmitter_id)`; start/end/period, position and velocity residual vectors/norms, phase residual, units | Raw closure ledger. |
| `minimum_separation` | `(result_hash, refinement_id, pair_ordinal)`; pair ids, sample rule/count, minimum value and first sample time, units | Primary or refined separation ledger. |
| `numerical_convergence` | `(base_evaluation_id, compared_evaluation_id, event_id, comparison_version)`; identity match, per-measure changes, maximum change, threshold, pass source field | Explicit refinement comparison. Current V1 imports may reference a comparison without a retained second root ledger and must say so. |
| `case_reduced_measure` | `(result_hash, measure_id, reduction_version)`; scalar/vector value, unit, source row count | Hot case projection for filters, distributions, and correlations. |
| `validity_gate_result` | `(result_hash, gate_id, gate_instrument_version)`; measured value, comparator, threshold, independent pass/fail, evidence hash, failure code | Only independent rows feed accepted views. |
| `campaign_acceptance` | `(manifest_hash, acceptance_instrument_version)`; accepted/rejected state, required/observed counts, evidence hash | Independent campaign gate; producer summary is retained separately. |
| `artifact` | `artifact_hash`; media type, codec, byte length, uncompressed hash/length, storage class, locator or inline BLOB, creation/export version | Content-addressed canonical packet, manifest, summary, or cold ledger object. |
| `ingest_batch` | `ingest_batch_id`; source locator, started/completed state, last committed ordinal, counts, error code | Resumable ingestion journal. |

Database-generated integers may accelerate joins but are never exported as scientific identity. Exact hashes, stable ordinals, and schema-defined ids remain portable keys.

## 7. Indexing

### 7.1 Query-to-index map

| Query | Required index or clustering |
| --- | --- |
| Q1 exact result | Unique composite B-tree on `(source_hash, protocol_hash, evaluator_id, evaluator_version, refinement_id)` plus unique `result_hash`. Hash columns use fixed 32-byte binary storage internally when the engine supports it, with lowercase hexadecimal at interfaces. |
| Q2 campaign enumeration | Unique `(manifest_hash, case_ordinal)` and `(manifest_hash, case_id)`; cluster or physically order campaign-case exports by ordinal. |
| Q3 family/member ranges | `(family_id, member_id, promoted_parameter_1, promoted_parameter_2, ...)` for stable high-use coordinates. Less common coordinates use `configuration_parameter(parameter_id, numeric_value, configuration_hash)`. |
| Q4 failed or marginal gates | `(gate_id, independent_pass, margin, result_hash)` where `margin` is a versioned projection from measured value and threshold. |
| Q5 distributions/correlations | `(manifest_hash, measure_id, scalar_value)` with campaign-local B-tree ordering. Keep vector components in explicit columns for common response measures. |
| Q6 roots for one event | `(event_id, transmitter_id, root_ordinal)` and matching response key. No-root rows use `(event_id, transmitter_id)`. |
| Q7 refinements | `(source_hash, protocol_hash, refinement_id)` and convergence `(base_evaluation_id, compared_evaluation_id, event_id)`. |
| Q8 drift | `(source_record_id, source_hash)`, `(protocol_id, protocol_hash)`, and campaign reference indexes. |
| Q9 resumable ingest | Unique content hashes and natural keys plus `(ingest_batch_id, source_ordinal)`. |
| Q10 export | Covering references from campaign case to result, source, protocol, acceptance, and artifact hashes. |

Portable B-trees are sufficient for V1 hash equality. A PostgreSQL hash index is optional only if a later benchmark beats B-tree equality without weakening portability.

### 7.2 Non-requirement

Partitioning is not required or designed for this SQLite system.

### 7.3 Parameter and vector representation

The exact canonical parameter vector is stored once as authoritative bytes under `configuration_hash`. Frequently queried coordinates receive typed columns with explicit units and coordinate-definition versions. The typed columns are verified projections, not replacements for the exact vector.

PostgreSQL's `NUMERIC` is an exact arbitrary-precision decimal type, which is a material advantage if later evaluators emit decimal tokens beyond binary64 precision or if exact decimal arithmetic becomes a query requirement. The current JavaScript evaluator emits JSON numbers from binary64 values, so converting those current numbers to `NUMERIC` does not add information. Even in PostgreSQL, retain the original canonical token because equivalent numeric values can have different textual forms and packet hashes bind the canonical serialized record. [PostgreSQL numeric types](https://www.postgresql.org/docs/current/datatype-numeric.html).

SQLite has no native arbitrary-precision numeric storage class: `REAL` is binary64 and `NUMERIC` is a type affinity, not an unlimited-precision type. This is not a V1 blocker because the database does not need to reproduce the evaluator's high-precision arithmetic. When a future producer emits a value or certificate beyond binary64 precision, retain its exact canonical decimal token or canonical binary artifact as TEXT/BLOB together with precision bits, rounding policy, and certified bounds; add a nullable verified binary64 projection only for ordinary filtering and plotting. Do not store every transient high-precision intermediate. Store the exact inputs, outputs, bounds, and certificate fields required for replay, independent checking, and deterministic export. [SQLite storage classes and type affinity](https://www.sqlite.org/datatype3.html).

An independent acceptance gate may use a binary64 projection only when the authoritative value is already binary64 or when a verified enclosure proves that projection cannot change the decision. If a value exceeds binary64 range or its projection could cross a threshold, the projection is null or advisory and the authoritative token or enclosure controls acceptance.

Vectors use explicit `x`, `y`, and `z` columns in hot tables. Canonical packet artifacts preserve the schema-defined vector representation and array order. Opaque vector BLOBs are barred from query tables.

## 8. Compression and deduplication

1. **Content-addressed deduplication:** source records, protocols, manifests, and result packet BLOBs are keyed by cryptographic hash. Campaigns reference them; they do not copy them.
2. **Repeated identity normalization:** evaluator ids, schemas, protocol fields, probes, transmitter ids, pair ids, units, root status, and gate ids live in parent or dictionary-friendly columns rather than repeated JSON text.
3. **Hot/cold split:** hot tables hold campaign membership, gates, and reduced scalar/vector measures. Raw roots and responses remain in an authoritative compressed packet artifact in V1 and enter normalized ledger tables only when a measured query requires them.
4. **V1 packet compression:** store the exact checked packet bytes as a gzip-compressed BLOB with codec, compressed length, uncompressed SHA-256, and uncompressed length. The measured B1 SQLite database was `0.853` times compact packet JSON while reproducing every packet byte. A different codec requires a separately approved dependency and must beat this conformance benchmark before adoption.
5. **One authoritative store:** keep compressed packets and query tables in SQLite. Add normalized raw tables only for an observed query; migrate the whole logical schema to PostgreSQL only if a declared SQLite gate fails.
6. **No lossy numeric compaction:** decimal rounding, float-width reduction, vector quantization, or tolerance-based row merging is forbidden for authoritative data.
7. **No destructive summary retention policy:** summaries may be rebuilt or compacted because they are derived; authoritative source/protocol/manifest/result bytes and required raw ledgers remain reachable.
8. **Safe physical compaction:** a new compressed artifact is written, hashed, row-count checked, export-tested, backed up, and atomically referenced before an older physical replica may be retired. Logical identity and at least one verified recoverable copy never disappear.

The archived [SQLite benchmark](analytical-campaign-database-benchmark.md) supports application-side gzip for V1 as a storage-mechanics result; the next complete generation must revalidate it. Cross-packet compression remains a sizing observation only; V1 preserves one independently addressable packet artifact per distinct content hash.

## 9. Ingestion, concurrency, and recovery

### 9.1 Ingestion transaction

One bounded ingestion transaction contains at most 32 cases and follows this fail-closed order. The bound is measured: one transaction per gzip packet produced `9.75` times as much WAL as checkpointed database growth, while batches of 32 reduced that ratio to `1.93`.

1. Read bytes and validate JSON/schema without trusting producer status.
2. Recompute canonical source, protocol, result, and artifact hashes using the recorded canonicalization version.
3. Reject any claimed hash mismatch before opening accepted-state writes.
4. Begin one database transaction and register or resume the `ingest_batch` row.
5. For each case in ordinal order, insert-or-verify content-addressed source, protocol, configuration, and artifact rows. `ON CONFLICT` means compare canonical bytes and metadata, never silently ignore a difference.
6. Insert the case's evaluation, event shell, numerical convergence, reduced rows, and compressed authoritative packet in staging state. V1 does not normalize every raw ledger.
7. Run the separately versioned acceptance instrument against retained authoritative data and store gate evidence.
8. Mark each case complete only if all required rows and independent gates exist.
9. Commit the bounded batch once. On any failure, roll back the whole uncommitted batch, record the ingest error outside the accepted view, and resume idempotently from the last committed ordinal.

Campaign acceptance runs only after the exact manifest inventory is present. The acceptance transaction verifies ordinals, hashes, counts, case completeness, and every required independent gate, then publishes the campaign acceptance row atomically.

### 9.2 Fresh-database rebuild and publication

Development regeneration uses a versioned all-candidate registry, not an in-place purge. The registry must match every live Borg catalog entry and prescribed-record generator target exactly, and it must classify every checked-in analytical campaign manifest as imported or explicitly excluded with a reason. Catalog, target, or campaign discovery drift is a hard preflight failure.

One `rebuild-all` operation must:

1. acquire one exclusive rebuild lock;
2. create a fresh SQLite database in a staging directory on the target database's filesystem;
3. generate one prescribed-path baseline case and exact source-record preimage for every registered catalog candidate under the registry's versioned protocol;
4. import the generated campaign and every registered checked campaign idempotently;
5. verify catalog count, candidate ordinals, complete accepted-plus-rejected inventory, exact source coverage for the generated campaign, campaign hashes, artifacts, database integrity, and deterministic exports;
6. record a content-bound database generation containing the registry, catalog, campaign, candidate, acceptance, rejection, and export inventories; and
7. in publish mode only, checkpoint and atomically rename the verified staged database over the live path, then verify the published file and restore the prior file if post-swap verification fails.

Check mode performs the complete build and verification but never publishes. A complete candidate that fails an independent analytical validity gate remains queryable as rejected and must not appear in `accepted_case`; rejection is not an excuse to omit the candidate from the catalog inventory. A structurally incomplete or internally inconsistent case blocks the whole generation. The live database must not be deleted, emptied, or partially rewritten before the fresh generation passes.

### 9.3 Concurrency posture

V1 uses one ingestion writer and concurrent readers on one local workstation. Use SQLite WAL mode with `synchronous=FULL`, a busy timeout, bounded transactions of at most 32 cases, and controlled checkpoints at campaign and backup boundaries. Backups must treat the database, WAL, and shared-memory state correctly and use the backup API or `VACUUM INTO` rather than copying an active main file casually.

Parallel evaluators may write packet bytes to a bounded ingestion queue, but only the database writer publishes accepted rows. Backpressure stops producers before memory or temporary storage becomes unbounded.

Move the complete logical schema to PostgreSQL when measurements show a sustained need for multiple independent writer processes, remote writers, role-based access, high-availability operation, or database-side exact decimal arithmetic. Do not split metadata and authoritative ledgers across engines unless a separate benchmark proves that the added recovery surface is necessary.

### 9.4 Crash and corruption recovery

- Restart scans `ingest_batch` rows not marked complete and resumes at the first absent natural key.
- Replaying a committed case is a no-op after byte verification.
- A staged or rolled-back case is never visible as accepted.
- A failed all-candidate rebuild removes its staging directory and leaves the prior database live; a failure detected after the rename restores the prior file before returning an error.
- Every backup is restored into a fresh location, checked for database integrity, row counts, artifact hashes, and deterministic exports.
- Quarterly recovery drills are required once the database is the canonical campaign store; frequency may increase with campaign activity.

## 10. Export, backup, and migration

### 10.1 Deterministic export

The exporter must produce:

- one exact `result-packet.v1` JSON file for a selected result;
- a manifest-ordered campaign directory with packets and summary;
- a self-contained reproducibility bundle containing manifest, exact sources, protocols, packets or ledger exports, independent acceptance evidence, schema migrations, and an inventory of hashes; and
- a compact Markdown candidate table for the braid analysis methodology, using an explicit per-measure or operator-selection reason and never inventing an undeclared combined score.

Exports use schema-defined array order, recursive key ordering where the existing hash contract requires it, and the original numeric domain. Acceptance testing uses a temporary campaign generated from the live all-candidate registry: every exported packet and exact-source preimage must reproduce the generated staging bytes, and every manifest, summary, and canonical hash must verify. No retired result packet is an export fixture.

### 10.2 Backup policy

Minimum V1 backup set:

1. an application-consistent SQLite snapshot;
2. the schema migration bundle and exporter version;
3. a plaintext hash inventory; and
4. at least one offline or separately administered copy outside the checkout.

A backup is not accepted until a restore drill reproduces selected packet hashes and campaign counts. RAID, sync, or a cloud folder is not by itself a backup. License-free software does not make media, administration, or off-site copies free.

### 10.3 Existing JSON migration

Migration is additive and reversible:

1. Freeze no JSON contract. Existing packets remain valid import sources.
2. Import manifests first, then summaries as producer projections, then packets as authority.
3. Recompute and verify every hash; preserve original relative path only as provenance.
4. Populate normalized hot tables and store the exact packet bytes as the first authoritative artifact.
5. Run the independent acceptance instrument; do not copy summary `accepted` or packet `status` into independent acceptance rows.
6. Export the imported campaign to a temporary directory and compare every packet and summary byte/hash with the checked source.
7. Keep deterministic JSON export available after the database becomes canonical, so fixtures, reviews, and publications do not require database access.

Schema migrations are forward-only, checksummed, and tested on a restored copy. SQLite and PostgreSQL must both support the same deterministic logical export before either can hold canonical data.

### 10.4 Repository and runtime-storage boundary

The live database is stored inside the checkout for predictable local operation but must never be committed. Its growth, journal churn, and binary diffs are operational data; Git is not a database backup.

The repository contains only:

- versioned logical schema and migrations;
- importer, exporter, integrity-check, and backup/restore tooling;
- small deterministic test fixtures and expected hashes;
- benchmark definitions and checked benchmark reports; and
- the user-visible candidate summary table in [method.md](method.md).

The default runtime directory is `.local-data/braid-analysis/` at the repository root. It contains the SQLite database, WAL and shared-memory files when enabled, temporary ingest files, and local recovery logs. The entire directory is Git-ignored. Backups and restore drills use a separately administered location outside the checkout; another file inside `.local-data/` is not an independent backup.

Local paths are operational metadata. They are excluded from source, protocol, manifest, result, and deterministic-export hashes. Content hashes remain stable when a database is moved, restored, or migrated. Startup must fail if the runtime directory is not ignored by Git. Tests and benchmarks use disposable databases under a safe temporary directory and never commit them.

## 11. Technology comparison matrix

All selected engines must permit genuine zero-software-license-cost local or self-hosted operation. The differences are operational and architectural; disk, compute, administration, and backup remain real costs.

| Strategy | License and genuine local zero-cost operation | Complexity, ingestion, query, and compression | Transactions, recovery, and concurrency | Migration, portability, backup | Node.js, tools, and scale-up | Lock-in risk and verdict |
| --- | --- | --- | --- | --- | --- | --- |
| **SQLite — selected** | Public domain; no server or service fee. [SQLite's authors dedicate the deliverable to the public domain](https://www.sqlite.org/copyright.html). Hardware, backup, and maintenance still cost resources. | Lowest operational complexity. Strong indexed lookups and adequate grouped analysis over hot reductions. Packet BLOB compression is application-owned; bulk prepared inserts are required. | Serializable ACID transactions and crash recovery are core guarantees; WAL permits concurrent readers with one writer. [SQLite transactional guarantees](https://www.sqlite.org/transactional.html) and [online backup API](https://www.sqlite.org/backup.html). | One portable database plus controlled WAL state, checksummed migrations, snapshots, and deterministic exports. | The installed Node runtime provides `node:sqlite`; the binding and settings still require a benchmark and version pin. [Node SQLite API](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html). | Low lock-in when hashes, schemas, and exports remain engine-neutral. **Decision: use SQLite.** |
| **Self-hosted PostgreSQL — contingency** | PostgreSQL License; free and open source without a service fee. [PostgreSQL license](https://www.postgresql.org/about/licence/). Server operation, upgrades, monitoring, and backup require more work. | Strong indexes, joins, bulk loading, JSON support, migrations, and exact arbitrary-precision `NUMERIC`. `NUMERIC` cannot recover precision absent from current binary64 evaluator output. [PostgreSQL numeric types](https://www.postgresql.org/docs/current/datatype-numeric.html). | Mature multiple-writer concurrency, WAL, roles, replication, and point-in-time recovery. | Mature logical and physical backup tools, with server administration and version upgrades. | Mature Node clients and inspection tools. | Medium lock-in if PostgreSQL-specific features become authoritative. **Use only if SQLite fails a declared concurrency, size, recovery, or exact-decimal query gate.** |

SQLite and PostgreSQL receive explicit credit for mature indexing, transactions, tooling, portability, and recovery. The project-specific layer defines analytical identity, acceptance, and export rules; it does not reimplement database machinery.

## 12. Recommended V1

### 12.1 Decision

Use **SQLite**, with:

- normalized source, protocol, campaign, configuration, case, evaluation, gate, and reduced-measure tables;
- one database writer and concurrent read-only query connections;
- fixed 32-byte internal hash columns plus canonical lowercase hexadecimal exports;
- exact parameter-vector bytes plus a small declared set of typed query columns;
- one content-addressed compressed authoritative packet BLOB per distinct result;
- gzip as the V1 packet codec;
- WAL mode with `synchronous=FULL`, one writer, and transactions of at most 32 cases;
- independent acceptance tables and accepted-only views;
- checksummed forward migrations;
- deterministic JSON import/export; and
- application-consistent snapshot backups with restore-and-export tests; and
- a Git-ignored runtime directory at `.local-data/braid-analysis/`.

Do **not** physically normalize every root and acceleration-response row in the first production milestone. The authoritative compressed packet BLOB already supports Q6 by decompressing one exact result, while hot reduced tables support Q1-Q5 and Q7-Q9. The logical root/response schema is fixed now so a later importer can populate it without changing identity.

SQLite replaces filesystem-per-packet storage with deterministic campaign enumeration, indexed hashes and ranges, idempotent transactional ingestion, independent accepted-only views, one backup surface, versioned migrations, tested crash recovery, and standard inspection tools.

### 12.2 V1 physical minimum

The implementation contains:

1. schema migration and ingest journal;
2. source/protocol/manifest/configuration/campaign-case identities;
3. result and compressed artifact identities;
4. reduced event/case measures and independent gates;
5. accepted-only views;
6. deterministic importer/exporter;
7. backup/restore verification commands;
8. a runtime guard that verifies `.local-data/braid-analysis/` is ignored by Git; and
9. repository-owned schema, migrations, tools, fixtures, benchmark definitions, and candidate Markdown without Git-owned database files.

No production database is built in this requirements thread. The benchmark fixes gzip, the existing Node `node:sqlite` binding, WAL mode, `synchronous=FULL`, one writer, a 32-case maximum transaction, and controlled checkpoints. Page size and any additional promoted parameter columns remain implementation measurements.

### 12.3 Implemented components and verification boundary

- [migration `001-initial.sql`](../../../src/prescribed-path-analysis/database/migrations/001-initial.sql) defines strict tables, first-class 32-byte hashes, foreign keys, query indexes, acceptance tables, ingest journal, and the accepted-only view;
- [migration `002-database-generation.sql`](../../../src/prescribed-path-analysis/database/migrations/002-database-generation.sql) records the registry-bound identity and completeness evidence for a fully rebuilt database generation;
- [IndependentAnalyticalAcceptance.mjs](../../../src/prescribed-path-analysis/database/IndependentAnalyticalAcceptance.mjs) derives the required gates and rebuilds reduced projections from retained packet ledgers without treating producer booleans as sufficient evidence;
- [AnalyticalCampaignDatabase.mjs](../../../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs) implements complete preflight, bounded idempotent ingestion, interruption resume, deterministic export, integrity verification, and verified online backup;
- [the all-candidate registry](../../../src/prescribed-path-analysis/campaigns/all-candidate-analytical-campaign.registry.v1.json) owns the exact catalog, generated baseline, imported campaign, and intentional-exclusion inventory;
- [AllCandidateAnalyticalCampaign.mjs](../../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs) validates that registry against the live catalog and generator target map and constructs exact prescribed-path campaign artifacts;
- [AnalyticalCampaignRebuild.mjs](../../../src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs) builds, verifies, records, and atomically publishes a fresh database generation with rollback;
- [the database command](../../../scripts/eom/analytical-campaign-database.mjs) exposes migrate, import, rebuild-all check/publish, inspect, verify, export, and backup operations; and
- [the database tests](../../../tests/analytical-campaign-database.test.js) and [rebuild tests](../../../tests/all-candidate-analytical-rebuild.test.js) cover no-root rows, producer-asserted status rejection, checksummed idempotent migration, zero-write failed preflight, interrupted-batch resume, complete re-import, exact-byte export, restored-backup verification, exact catalog coverage, omission rejection, nonpublishing checks, post-swap rollback, and deterministic fresh publication.

This acceptance instrument is independent of producer-carried acceptance status and reduced projections. Current generated campaigns retain and verify each exact source-record preimage. The instrument verifies retained ledger evidence rather than establishing evaluator mathematics from an independent numerical implementation.

## 13. Scale-up triggers and migration path

### 13.1 Trigger ladder

| Trigger | Response |
| --- | --- |
| A required cross-case raw-ledger query cannot meet the latency gate from packet artifacts | Backfill only the required normalized ledger tables into the same SQLite database, preserving packet artifacts as authority, and rerun the benchmark. |
| Raw root plus acceleration-response rows exceed 50 million, normalized SQLite scans fail the latency gates, or the SQLite database exceeds 20 GiB and backup/restore exceeds the recovery window | Benchmark one complete logical migration to PostgreSQL. |
| More than one independent writer is required, writer lock waits exceed the falsifier threshold, or remote authenticated writes become necessary | Migrate the complete logical schema to self-hosted PostgreSQL using the same hashes and export contracts. |
| A future evaluator emits authoritative decimal values beyond binary64 precision, or exact decimal arithmetic becomes a required indexed query | Use PostgreSQL `NUMERIC` projections while retaining the original canonical decimal tokens and hashes; benchmark their storage and arithmetic cost. |

The numerical values are predeclared benchmark gates, not claims that SQLite fails at those sizes.

### 13.2 Migration sequence

1. V1 SQLite stores identities, hot reductions, gates, and compressed packets under the Git-ignored `.local-data/braid-analysis/` directory.
2. If a required raw-ledger query opens, a versioned backfill reads packet BLOBs and writes only the needed normalized ledger tables into a restored SQLite benchmark copy. It verifies row counts, hashes, and deterministic sample exports before publication.
3. If SQLite remains within the latency, size, and recovery gates, publish the migration and continue with one database.
4. If SQLite fails those gates, copy the engine-neutral logical tables and hashes into PostgreSQL, dual-read in verification mode, compare every conformance query and export, then switch in one declared migration. Do not dual-write indefinitely.

No scale-up step changes packet, source, protocol, manifest, result, or acceptance identity.

## 14. Benchmark plan

The next benchmark uses a disposable database and campaign artifacts generated from the exact live all-candidate registry. No analytical result JSON is checked into the repository. The benchmark report is accepted only when it records the registry hash, database-generation hash, candidate count, accepted and rejected counts, packet and row cardinalities, database size, query timings, integrity result, crash injections, verified backup restoration, and deterministic export inventories.

The benchmark must cover:

1. one complete current-catalog generation for correctness and deterministic export;
2. an idempotent repeat import with unchanged logical counts;
3. same-hash/different-byte rejection, compressed-artifact corruption, and forced interruption before and after commit;
4. deterministic synthetic scale rows that exercise database mechanics without carrying an analytical claim; and
5. exact packet BLOBs versus gzip packet BLOBs and the declared bounded transaction size.

Required gates remain: first import at most 10 seconds for the representative generation, idempotent retry at most 5 seconds, Q1 exact lookup p95 at most 50 milliseconds, Q2 10,000-case enumeration at most 500 milliseconds, Q3/Q4 million-row filters at most 2 seconds, Q5 distribution/correlation at most 10 seconds, Q6 one-event packet-root inspection p95 at most 100 milliseconds, primary storage at most `2.5` times compact retained bytes, WAL at most five times checkpointed primary growth, zero accepted partial rows after crash injection, and exact restored exports.

Run this benchmark before production publication and after any change to:

- the Node or embedded SQLite version;
- canonicalization or hash code;
- schema, migrations, indexes, page size, journal, synchronization, checkpoint, or transaction-batch settings;
- compression codec or level;
- authoritative packet, manifest, summary, or acceptance schema; or
- the runtime storage device or backup method when recovery time matters.

PostgreSQL is benchmarked only after a declared SQLite concurrency, exact-decimal, raw-ledger scan, size, or recovery gate fails. The retired benchmark report is not current acceptance evidence.

## 15. Risks, falsifiers, and open decisions

### 15.1 Design risks

- Duplicating authoritative packet BLOBs and hot reductions trades some V1 space for simple recovery; the benchmark must show that the cost stays below the storage gate.
- SQLite's single-writer design may become a bottleneck earlier than byte volume does.
- One-case gzip transactions caused excessive measured WAL churn; production must enforce the measured batch bound and checkpoint policy rather than relying on SQLite defaults.
- Application-side compression can hide corruption unless both compressed and uncompressed hashes are checked.
- Typed parameter projections can drift from canonical vectors unless ingestion verifies every projection.
- A missing or ineffective ignore rule could expose database and WAL files to Git or repository-wide tooling.
- Keeping the live database inside the checkout makes an independent off-checkout backup mandatory; Git does not protect ignored runtime data.
- A database-native summary can accidentally become authority unless rebuild provenance and independent acceptance remain explicit.
- Node binding or runtime changes can become an undeclared storage dependency unless versions are pinned and exports remain engine-neutral.

### 15.2 Falsifiers

Reject or revise the SQLite V1 recommendation if a representative benchmark observes any of the following:

1. any canonical source, protocol, manifest, result, or summary hash cannot be reproduced;
2. any checked packet cannot be exported byte for byte where the current generator defines byte equality;
3. idempotent retry creates a duplicate, changes an accepted row, or accepts different bytes under one hash;
4. a partial or producer-asserted failed case appears in an accepted view;
5. the Section 14 latency or ingest gates fail after reasonable indexes and prepared bulk transactions are applied;
6. steady-state primary storage exceeds 2.5 times the compact JSON-equivalent retained payload;
7. WAL bytes exceed five times checkpointed primary database growth over a representative campaign, or controlled checkpointing cannot bound temporary disk use;
8. writer lock or busy failures affect more than 1% of case transactions under the intended one-writer/readers workload;
9. crash injection produces corruption, an accepted partial campaign, or manual repair beyond replaying an idempotent batch;
10. backup restore cannot meet a declared 24-hour recovery objective or fails any integrity/hash/export check;
11. a one-event root inspection requires scanning unrelated raw ledgers;
12. reduced distributions or correlations require loading packet BLOBs; or
13. migration to engine-neutral JSON or tabular exports loses units, coordinate definitions, probe polarity, tolerances, root policy, exact hashes, or array order;
14. moving or restoring the database changes any canonical identity because a machine-local path leaked into a hash; or
15. the database, WAL, or temporary files are not ignored by Git, or a valid backup exists only inside the checkout.
16. a registry can omit, duplicate, reorder, or drift from a live catalog candidate or checked campaign without blocking publication;
17. a complete independently rejected candidate disappears from the database inventory or appears in `accepted_case`;
18. check mode or a failed pre-swap rebuild changes the live database, or post-swap failure cannot restore its prior verified bytes; or
19. a published database contains mixed campaign generations, lacks exactly one generation record, or cannot reproduce its recorded deterministic export inventories.

If only raw-ledger scans fail while transactional ingestion and exact export pass, first normalize the required ledger tables inside SQLite. If those scans, writer concurrency, exact-decimal queries, database size, or remote operation still fail, migrate the complete logical schema to PostgreSQL. If corruption or deterministic export fails, stop ingestion; performance does not compensate for loss of reproducibility.

### 15.3 Decision status

The storage-engine decision is **SQLite**. The V1 physical settings are gzip packet BLOBs, indexed hot tables, the existing Node `node:sqlite` binding, WAL mode, `synchronous=FULL`, one writer, transactions of at most 32 cases, controlled checkpoints, and a fresh verified atomic rebuild-and-swap rather than purge-in-place. PostgreSQL is only the falsification-driven migration target stated in Section 13. The implementation is tested against temporary current-catalog campaigns; no retained analytical campaign JSON is repository source, and the database path changes no evaluator mathematics, source schema, root policy, or producer acceptance semantic.
