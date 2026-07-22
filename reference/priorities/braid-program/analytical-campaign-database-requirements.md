# Prescribed-Record Analytical Campaign Database Requirements

Status: priority-only architecture requirements, version `v0.1`, 2026-07-22. No production database is implemented by this packet.

## 1. Purpose and scope

This packet defines a free, durable storage path for prescribed-record analytical campaigns before packet counts outgrow one JSON file per case. It is grounded in the live B1 cap-angle smoke and Monte Carlo coverage campaigns, the current `prescribed-path-analysis/result-packet.v1` contract, and the repository's [software architecture and maintenance guidance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md).

The storage system must preserve the authority boundary already enforced by the [prescribed-path analytical evaluator](../../../src/prescribed-path-analysis/README.md): it evaluates exact prescribed paths, does not evolve those paths, and does not call the EOM solver. Database ingestion, indexing, aggregation, or export creates no stability, energy, retention, physical-realization, or completed braid-family grade. Acceleration-response rows remain prescribed-record analytical measurements.

The system must be free to use locally or self-host. "Free" means zero required license or service fee. Local disk, compute, backup media, operator time, maintenance, and recovery testing remain real costs under every option.

The architecture target is one canonical storage path per responsibility:

- exact hashes and versioned records define identity;
- transactional metadata and hot reduced measures serve ordinary queries;
- authoritative raw ledgers remain recoverable;
- deterministic JSON export preserves review, fixture, and publication workflows; and
- a later columnar tier may serve large analytical scans without redefining identity or acceptance.

This packet is `priority-only`. It does not promote a database choice into reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

## 2. Current measured evidence

### 2.1 Inspected live artifacts

The measurement and requirements below were checked against:

- [AnalyticalBraidEvaluator.mjs](../../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs), which constructs and hashes `result-packet.v1`;
- [the evaluator contract](../../../src/prescribed-path-analysis/README.md);
- [the B1 campaign runner](../../../scripts/eom/run-b1-prescribed-analysis-campaign.mjs);
- the [smoke manifest](../../../src/prescribed-path-analysis/campaigns/b1-cap-angle-smoke/b1-cap-angle-smoke-campaign.manifest.v1.json) and [coverage manifest](../../../src/prescribed-path-analysis/campaigns/b1-cap-angle-coverage/b1-cap-angle-coverage-campaign.manifest.v1.json);
- the [smoke summary](../../../src/prescribed-path-analysis/campaigns/b1-cap-angle-smoke/b1-cap-angle-smoke-campaign.summary.v1.json) and [coverage summary](../../../src/prescribed-path-analysis/campaigns/b1-cap-angle-coverage/b1-cap-angle-coverage-campaign.summary.v1.json);
- representative coverage packets [sample 000](../../../src/prescribed-path-analysis/campaigns/b1-cap-angle-coverage/packets/sample-000.result-packet.v1.json), [sample 130](../../../src/prescribed-path-analysis/campaigns/b1-cap-angle-coverage/packets/sample-130.result-packet.v1.json), and the four checked anchor packet classes;
- [campaign tests](../../../tests/b1-prescribed-analysis-campaign.test.js), [evaluator tests](../../../tests/prescribed-source-wake-evaluator.test.js), and [root tests](../../../tests/prescribed-orbit-causal-roots.test.js); and
- the Braid Program [method](method.md), [charter](README.md), and live priority-lane conventions.

The coverage summary records 260 accepted cases: 256 seeded samples and four anchors. Every current case has one probe event, six retained roots, zero no-root rows, two probe polarities, six prescribed-period closure rows, fifteen primary and fifteen refined minimum-separation pair rows, one numerical-convergence row, and one reduced event row. Current tests independently exercise a one-root/one-no-root case and fail-closed campaign acceptance.

### 2.2 Direct footprint measurement

All byte counts below were measured from the checked-in 2026-07-22 artifacts. `MB` is decimal; `MiB` uses powers of 1024.

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

Compression results are measured on JSON bytes, not promises for a database or Parquet implementation. They do show that repeated field names, identities, and protocol data are highly compressible. Cross-packet gzip is 23% of compact packet bytes, while the measured Brotli stream is 7.7%.

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

The measured repetition pattern supports normalization and dictionary or columnar compression:

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
| $b_{\mathrm{eval}}$ | 6,927 | Case envelope, source/configuration provenance, protocol allocation, fixed reduced-measure and container overhead, calibrated so the current campaign reproduces its compact total. |
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
| Current B1 | $F=M=K=S=P=L=Q=T=1$; $C=260$; $X=R=6$; $A=2$; $G=2$; $J=1$ because the V1 packet stores a comparison without a second full root ledger | 260 | 260 | 1,560 | 3,120 | 6.20 MiB, matching the measured 6.50 MB compact packets |
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

Schema id: `prescribed_record_analytics_db/v1-draft`. Names below are logical and engine-neutral; physical SQL or non-SQL encodings may vary while preserving keys and constraints.

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

## 7. Indexing and partitioning

### 7.1 Query-to-index map

| Query | Required index or clustering |
| --- | --- |
| Q1 exact result | Unique composite B-tree on `(source_hash, protocol_hash, evaluator_id, evaluator_version, refinement_id)` plus unique `result_hash`. Hash columns use fixed 32-byte binary storage internally when the engine supports it, with lowercase hexadecimal at interfaces. |
| Q2 campaign enumeration | Unique `(manifest_hash, case_ordinal)` and `(manifest_hash, case_id)`; cluster or physically order campaign-case exports by ordinal. |
| Q3 family/member ranges | `(family_id, member_id, promoted_parameter_1, promoted_parameter_2, ...)` for stable high-use coordinates. Less common coordinates use `configuration_parameter(parameter_id, numeric_value, configuration_hash)`. |
| Q4 failed or marginal gates | `(gate_id, independent_pass, margin, result_hash)` where `margin` is a versioned projection from measured value and threshold. |
| Q5 distributions/correlations | `(manifest_hash, measure_id, scalar_value)` or campaign-local columnar ordering. Keep vector components in explicit columns for common response measures. |
| Q6 roots for one event | `(event_id, transmitter_id, root_ordinal)` and matching response key. No-root rows use `(event_id, transmitter_id)`. |
| Q7 refinements | `(source_hash, protocol_hash, refinement_id)` and convergence `(base_evaluation_id, compared_evaluation_id, event_id)`. |
| Q8 drift | `(source_record_id, source_hash)`, `(protocol_id, protocol_hash)`, and campaign reference indexes. |
| Q9 resumable ingest | Unique content hashes and natural keys plus `(ingest_batch_id, source_ordinal)`. |
| Q10 export | Covering references from campaign case to result, source, protocol, acceptance, and artifact hashes. |

Portable B-trees are sufficient for V1 hash equality. A PostgreSQL hash index is optional only if a later benchmark beats B-tree equality without weakening portability.

### 7.2 Partitioning rules

V1 SQLite uses no physical table partitioning. At current and near-current size, partitions add migration and query complexity without evidence of benefit.

When cold columnar storage opens:

- partition by entity type first (`root`, `response`, `closure`, `separation`, `convergence`);
- then by family/member and campaign or by a stable campaign hash bucket when one campaign is too large;
- target approximately 128-512 MiB compressed Parquet shards and row groups sized by benchmark;
- never create one Parquet file per configuration, event, or packet;
- keep `source_hash`, `protocol_hash`, `manifest_hash`, `result_hash`, `event_id`, and refinement identity in every shard row needed for independent reconstruction; and
- record each shard and its row-range manifest as a content-addressed artifact before making it visible.

Partition pruning must match Q2-Q7. Family-only partitioning is insufficient for campaign enumeration; configuration-level partitioning recreates the small-file problem.

### 7.3 Parameter and vector representation

The exact canonical parameter vector is stored once as authoritative bytes under `configuration_hash`. Frequently queried coordinates receive typed columns with explicit units and coordinate-definition versions. The typed columns are verified projections, not replacements for the exact vector.

PostgreSQL's `NUMERIC` is an exact arbitrary-precision decimal type, which is a material advantage if later evaluators emit decimal tokens beyond binary64 precision or if exact decimal arithmetic becomes a query requirement. The current JavaScript evaluator emits JSON numbers from binary64 values, so converting those current numbers to `NUMERIC` does not add information. Even in PostgreSQL, retain the original canonical token because equivalent numeric values can have different textual forms and packet hashes bind the canonical serialized record. [PostgreSQL numeric types](https://www.postgresql.org/docs/current/datatype-numeric.html).

Vectors use explicit `x`, `y`, and `z` columns in hot tables. Cold Parquet may use a fixed-size struct if every supported reader preserves field names and numeric types. Opaque vector BLOBs are barred from query tables.

## 8. Compression and deduplication

1. **Content-addressed deduplication:** source records, protocols, manifests, result packets, and cold shards are keyed by cryptographic hash. Campaigns reference them; they do not copy them.
2. **Repeated identity normalization:** evaluator ids, schemas, protocol fields, probes, transmitter ids, pair ids, units, root status, and gate ids live in parent or dictionary-friendly columns rather than repeated JSON text.
3. **Hot/cold split:** hot tables hold campaign membership, gates, and reduced scalar/vector measures. Raw roots and responses remain in an authoritative compressed packet artifact in V1 and may additionally enter columnar cold tables after the scale trigger.
4. **V1 packet compression:** store the exact checked packet bytes or a lossless canonical export payload as a compressed BLOB with codec, compressed hash, uncompressed hash, and lengths. Gzip is available in the current Node runtime; zstd or another codec requires a separately approved dependency and must win the benchmark before adoption.
5. **Columnar compression:** Parquet with zstd is the first scale-up candidate for large root, response, closure, separation, and convergence tables. Dictionary encoding should target repeated ids and enums; floating values remain lossless binary doubles matching the evaluator's JSON-number domain.
6. **No lossy numeric compaction:** decimal rounding, float-width reduction, vector quantization, or tolerance-based row merging is forbidden for authoritative data.
7. **No destructive summary retention policy:** summaries may be rebuilt or compacted because they are derived; authoritative source/protocol/manifest/result bytes and required raw ledgers remain reachable.
8. **Safe physical compaction:** a new compressed artifact is written, hashed, row-count checked, export-tested, backed up, and atomically referenced before an older physical replica may be retired. Logical identity and at least one verified recoverable copy never disappear.

The current measured cross-packet compression ratios justify compression work, but they do not select a codec. Codec selection is an empirical benchmark result.

## 9. Ingestion, concurrency, and recovery

### 9.1 Ingestion transaction

One case ingestion follows this fail-closed order:

1. Read bytes and validate JSON/schema without trusting producer status.
2. Recompute canonical source, protocol, result, and artifact hashes using the recorded canonicalization version.
3. Reject any claimed hash mismatch before opening accepted-state writes.
4. Begin one database transaction and register or resume the `ingest_batch` row.
5. Insert-or-verify content-addressed source, protocol, configuration, and artifact rows. `ON CONFLICT` means compare canonical bytes and metadata, never silently ignore a difference.
6. Insert the evaluation, event, root-or-no-root, acceleration-response, closure, separation, convergence, and reduced rows in staging state.
7. Run the separately versioned acceptance instrument against retained authoritative data and store gate evidence.
8. Mark the case complete only if all required rows and independent gates exist.
9. Commit once. On failure, roll back the case and record the ingest error outside the accepted view.

Campaign acceptance runs only after the exact manifest inventory is present. The acceptance transaction verifies ordinals, hashes, counts, case completeness, and every required independent gate, then publishes the campaign acceptance row atomically.

### 9.2 Concurrency posture

V1 uses one ingestion writer and concurrent readers on one local workstation. SQLite WAL mode is a benchmark candidate, but backups must treat the database, WAL, and shared-memory state correctly and use the backup API or `VACUUM INTO` rather than copying an active main file casually.

Parallel evaluators may write packet bytes to a bounded ingestion queue, but only the database writer publishes accepted rows. Backpressure stops producers before memory or temporary storage becomes unbounded.

Move metadata to PostgreSQL when measurements show a sustained need for multiple independent writer processes, remote writers, role-based access, or high-availability operation. DuckDB native-file writes remain a single-process analytical path; RocksDB concurrency would require application-owned schema and secondary-index logic.

### 9.3 Crash and corruption recovery

- Restart scans `ingest_batch` rows not marked complete and resumes at the first absent natural key.
- Replaying a committed case is a no-op after byte verification.
- A staged or rolled-back case is never visible as accepted.
- Every backup is restored into a fresh location, checked for database integrity, row counts, artifact hashes, and deterministic exports.
- Cold shard publication uses write-to-new, flush, hash, verify, then atomic manifest commit. Orphaned unreferenced shards are quarantined, not assumed valid.
- Quarterly recovery drills are required once the database is the canonical campaign store; frequency may increase with campaign activity.

## 10. Export, backup, and migration

### 10.1 Deterministic export

The exporter must produce:

- one exact `result-packet.v1` JSON file for a selected result;
- a manifest-ordered campaign directory with packets and summary;
- a self-contained reproducibility bundle containing manifest, exact sources, protocols, packets or ledger shards, independent acceptance evidence, schema migrations, and an inventory of hashes; and
- optional Parquet tables for analytical publication, always accompanied by the JSON/hash inventory that defines identity.

Exports use schema-defined array order, recursive key ordering where the existing hash contract requires it, and the original numeric domain. For the current B1 fixture and coverage campaign, the acceptance test is byte-for-byte regeneration of checked packet and summary files plus exact canonical hashes.

### 10.2 Backup policy

Minimum V1 backup set:

1. an application-consistent SQLite snapshot;
2. any external cold artifacts referenced by hash;
3. the schema migration bundle and exporter version;
4. a plaintext hash inventory; and
5. at least one offline or separately administered copy.

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

Schema migrations are forward-only, checksummed, and tested on a restored copy. Every storage engine must support export to the engine-neutral logical schema before it can become canonical.

## 11. Technology comparison matrix

All listed engines can operate with zero software-license fee. The differences are operational and architectural.

| Strategy | License and genuine local zero-cost operation | Complexity, ingestion, query, and compression | Transactions, recovery, and concurrency | Migration, portability, backup | Node.js, tools, and scale-up | Lock-in risk and verdict |
| --- | --- | --- | --- | --- | --- | --- |
| **SQLite** | Public domain; no server or service fee. [SQLite's authors dedicate the deliverable to the public domain](https://www.sqlite.org/copyright.html). Hardware, backup, and maintenance still cost resources. | Lowest operational complexity. Strong point/range queries and adequate grouped analysis over hot reductions. Row-store compression is limited, so packet BLOB compression is application-owned. Bulk prepared inserts are required. | Serializable ACID transactions and crash recovery are core guarantees; WAL permits concurrent readers with one writer but is not a multi-host design. [SQLite documents transactional durability](https://www.sqlite.org/transactional.html) and an [online backup API](https://www.sqlite.org/backup.html). | Single portable file plus controlled WAL state; simple schema migrations and snapshots. Engine-neutral exports remain required. | Excellent CLI/GUI ecosystem. Current Node includes `node:sqlite`, but the current LTS documentation still labels it release-candidate, so production binding/runtime choice must be benchmarked and pinned. [Node SQLite API](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html). Scale-up is export or replication into Parquet/PostgreSQL. | Low-to-medium lock-in with ordinary tables, explicit DDL migrations, and JSON/Parquet export. **Best V1.** |
| **DuckDB with Parquet** | DuckDB is MIT; Apache Parquet is Apache-2.0. No server fee. [DuckDB license and design](https://duckdb.org/why_duckdb); [Parquet format license](https://github.com/apache/parquet-format/). | Excellent scans, distributions, correlations, compression, filter pushdown, and projection pushdown. Bulk ingestion is strong; point-update workload and tiny transactional case publication are less central to its design. [Parquet support](https://duckdb.org/docs/current/data/parquet/overview). | ACID within the embedded engine. One read-write process owns the native database; multiple processes may read only. Current multi-process write paths add services or newer catalog layers. [DuckDB concurrency](https://duckdb.org/docs/current/connect/concurrency). | Parquet is highly portable, but dataset manifests, atomic publication, small-file control, and backup consistency become application duties. DuckDB native-file version compatibility must be managed. | Primary Node Neo client exists and supports streaming/appending, with some API features still incomplete. [Node client](https://duckdb.org/docs/current/clients/node_neo/overview). Natural laptop-to-large analytical path. | Low format lock-in for Parquet; medium catalog/manifest complexity. **Best analytical and cold-ledger tier, not smallest transactional V1.** |
| **Self-hosted PostgreSQL** | PostgreSQL License, free and open source with use/modification/distribution permitted without fee. [PostgreSQL license](https://www.postgresql.org/about/licence/). A running server, upgrades, monitoring, backup, and administration are unavoidable costs. | Highest baseline operational complexity here, but excellent indexes, joins, query planner, bulk load, JSON support, mature migrations, and exact arbitrary-precision `NUMERIC` columns. `NUMERIC` is valuable for future exact decimal records, though slower and larger than binary floating-point; it cannot recover precision absent from current binary64 evaluator output. Compression is row/page oriented unless paired with external columnar storage. [PostgreSQL numeric types](https://www.postgresql.org/docs/current/datatype-numeric.html). | Mature MVCC, multiple concurrent writers/readers, WAL, replication, point-in-time recovery, roles, and remote access. | `pg_dump`, physical backups, and logical migration are mature. Server version upgrades and restore procedures require administration. Declarative range/list/hash partitioning is available and should be used only after tables are large enough to benefit. [Partitioning guidance](https://www.postgresql.org/docs/current/ddl-partitioning.html). | Mature Node clients and inspection tools; clean path from one server to larger self-hosted operation. | Medium lock-in if PostgreSQL-specific types, extensions, or partition logic become authority. **Scale-up metadata choice when measured multi-writer, arbitrary-precision query, or remote-operation needs appear.** |
| **Embedded ordered-key store, represented by RocksDB** | Dual GPLv2/Apache-2.0; Apache-2.0 can be selected. No service fee. [RocksDB repository and license](https://github.com/facebook/rocksdb). | Fast keyed ingestion, ordered prefix scans, Bloom filters, and configurable compression. Every logical relation, secondary index, range-query projection, migration, and export join becomes application code. LSM compaction adds write/space amplification. | WAL, checksums, batches, and optimistic/pessimistic transactions are available. Concurrency is embedded and process-local; recovery tuning is application-owned. [RocksDB overview](https://github.com/facebook/rocksdb/wiki/RocksDB-Overview). | Backup/checkpoint features exist, but a database is a directory of engine files, not one transparent artifact. Major-version and binding compatibility need care. | Node generally depends on third-party native bindings; debugging is less transparent than SQL shells. Scales keyed access well, not ad hoc correlations without a separate analytical layer. | High logical lock-in because keys and indexes encode the schema in custom code. **Reject for V1 unless benchmarks reveal a keyed-ingest requirement that SQL engines cannot meet.** |
| **Custom append-only/content-addressed format** | No third-party database license. Development, verification, repair tooling, migrations, indexing, compaction, and recovery are entirely in-house costs. | Sequential writes and exact content identity can be excellent. Ad hoc filtering, range indexes, transactions, correlations, schema evolution, and compression dictionaries must be designed and maintained from scratch. | Atomic append and manifests can be built, but crash consistency, partial writes, concurrency, checksums, compaction, and recovery become new proof obligations. | Potentially portable only if the format is completely specified and multiple readers exist. Backup is easy to copy but hard to validate without mature tooling. | Node implementation is direct. Scaling requires building the database features this packet is trying not to reinvent. | Highest lock-in to project code and highest silent-corruption/migration risk. **Reject as the primary database. Retain content-addressed artifacts only as a narrow component.** |
| **Hybrid: SQLite metadata/hot reductions plus compressed Parquet raw ledgers** | SQLite public domain, DuckDB MIT, Parquet Apache-2.0. Zero license fee locally; two storage forms increase operational and backup work. | Strong point/range/transactional metadata plus columnar root/response scans and compression. Complexity lies in atomic cross-store publication, shard sizing, manifests, and recovery. | SQLite remains the single metadata writer; immutable Parquet shards avoid in-place raw-ledger writes. Crash recovery requires orphan-shard detection and publish-after-hash ordering. | Engine-neutral Parquet plus deterministic JSON exports are portable. Backup must capture one consistent SQLite snapshot and every referenced shard. | Node can own SQLite ingestion and invoke a pinned DuckDB client for shard creation/query. Clean path to PostgreSQL metadata later without rewriting Parquet. | Low data-format lock-in, medium orchestration complexity. **Recommended scale-up after measured triggers, not day-one V1.** |

SQLite, DuckDB, PostgreSQL, RocksDB, and Parquet deserve explicit credit for mature indexing, compression, transactions, tooling, portability, and recovery features. A project-specific layer should define only scientific identity, acceptance, and export rules, not reimplement their storage engines.

## 12. Recommended V1

### 12.1 Decision

Use **SQLite as the only V1 database**, with:

- normalized source, protocol, campaign, configuration, case, evaluation, gate, and reduced-measure tables;
- one database writer and concurrent read-only query connections;
- fixed 32-byte internal hash columns plus canonical lowercase hexadecimal exports;
- exact parameter-vector bytes plus a small declared set of typed query columns;
- one content-addressed compressed authoritative packet BLOB per distinct result;
- independent acceptance tables and accepted-only views;
- checksummed forward migrations;
- deterministic JSON import/export; and
- application-consistent snapshot backups with restore-and-export tests.

Do **not** physically normalize every root and acceleration-response row in the first production milestone. The authoritative compressed packet BLOB already supports Q6 by decompressing one exact result, while hot reduced tables support Q1-Q5 and Q7-Q9. The logical root/response schema is fixed now so a later importer can populate it without changing identity.

This is preferable to filesystem-per-packet storage because it provides deterministic campaign enumeration, indexed hashes and ranges, idempotent transactional ingestion, independent accepted-only views, one backup surface, and versioned migrations. It is preferable to a completely custom database because SQLite supplies tested transactions, crash recovery, indexes, query planning, backup APIs, inspection tools, and a stable file format.

### 12.2 V1 physical minimum

The first implementation should contain only:

1. schema migration and ingest journal;
2. source/protocol/manifest/configuration/campaign-case identities;
3. result and compressed artifact identities;
4. reduced event/case measures and independent gates;
5. accepted-only views;
6. deterministic importer/exporter; and
7. backup/restore verification commands.

No production database is built in this requirements thread. Compression codec, SQLite binding, page size, WAL/checkpoint settings, and promoted parameter columns are benchmark outcomes, not architectural guesses.

## 13. Scale-up triggers and migration path

### 13.1 Trigger ladder

| Trigger | Response |
| --- | --- |
| Raw root plus acceleration-response rows exceed 50 million, or full-ledger analytical scans exceed the latency gates in Section 15 | Add immutable Parquet root/response shards and DuckDB query views while SQLite remains the transactional catalog. |
| SQLite database exceeds 20 GiB or backup/restore time exceeds the recovery window | Move cold packet/ledger artifacts out of the main database into hashed shard objects; retain hashes, sizes, and locations in SQLite. |
| More than one independent writer is required, writer lock waits exceed the falsifier threshold, or remote authenticated writes become necessary | Migrate metadata/hot tables to self-hosted PostgreSQL using the same hashes and logical schema. |
| A future evaluator emits authoritative decimal values beyond binary64 precision, or exact decimal arithmetic becomes a required indexed query | Use PostgreSQL `NUMERIC` projections while retaining the original canonical decimal tokens and hashes; benchmark their storage and arithmetic cost. |
| One campaign produces more than one target shard or hot table exceeds memory by a wide margin | Partition cold data by entity and campaign/family hash bucket; benchmark 128-512 MiB compressed shard targets. |
| DuckDB/Parquet cannot meet exact-root inspection or scan thresholds | Evaluate a PostgreSQL-plus-Parquet or PostgreSQL-plus-DuckDB analytical path before any custom store. |

The numerical values are predeclared benchmark gates, not claims that SQLite fails at those sizes.

### 13.2 Migration sequence

1. V1 SQLite stores identities, hot reductions, gates, and compressed packets.
2. A versioned backfill reads packet BLOBs, writes normalized ledger rows to temporary Parquet shards, verifies row counts and hashes, and publishes an immutable shard manifest.
3. SQLite records each shard only after content hash, schema, row count, min/max keys, and deterministic sample exports pass.
4. Queries read hot data from SQLite and large distributions/correlations from DuckDB over Parquet.
5. If PostgreSQL opens, copy engine-neutral tables and hashes, dual-read in verification mode, compare every conformance query and export, then switch the catalog in one declared migration. Do not dual-write indefinitely.

No scale-up step changes packet, source, protocol, manifest, result, or acceptance identity.

## 14. Benchmark plan

This thread installs no dependency and creates no production database. A separate benchmark may write only to a safe temporary directory and must report exact commands, runtime versions, and storage media.

### 14.1 Datasets

1. **Canonical B1 set:** all 260 coverage packets, manifest, and summary. This is the correctness and exact-export set.
2. **Idempotency set:** the canonical set imported twice and in shuffled order. Logical counts must remain unchanged.
3. **Failure set:** hash mismatch, truncated JSON, missing root/no-root coverage, failed gate, incomplete campaign, and producer-asserted accepted status without independent gate evidence.
4. **Representative scale sets:** benchmark-only copies of the measured row shapes at 10,000 cases, one million reduced-measure rows, ten million root rows, and twenty million acceleration-response rows. Synthetic copy ids live only in a benchmark namespace and can never enter accepted views or claim scientific identity.
5. **Compression set:** packet bytes concatenated by campaign and ledger columns projected by entity, using only lossless codecs.

### 14.2 Operations and measurements

Measure cold and warm runs separately:

- schema creation and migration time;
- first import and idempotent re-import time;
- database, journal, index, temporary, backup, and compressed-artifact bytes;
- Q1-Q10 latency with p50/p95 and query plans;
- WAL/checkpoint or equivalent write amplification;
- one-event root inspection without loading unrelated packets;
- distributions and correlations from reduced rows only;
- concurrent read latency during one writer ingestion;
- kill/restart at each ingestion phase;
- corrupted artifact detection;
- backup creation, restore time, and restored query latency; and
- deterministic export byte/hash equality for all 260 packets and the coverage summary.

Compare at minimum:

1. SQLite with exact packet BLOBs and hot reductions;
2. SQLite with gzip packet BLOBs;
3. DuckDB native tables;
4. DuckDB over zstd Parquet ledger tables; and
5. the recommended SQLite-plus-Parquet scale-up shape.

RocksDB or a custom append-only prototype should be benchmarked only if an earlier result identifies a specific unmet keyed-ingest or append requirement. Benchmarking every conceivable engine without a falsifying workload would add infrastructure rather than reduce uncertainty.

### 14.3 Benchmark pass gates

On the operator's current workstation, V1 should meet:

- canonical 260-packet first import in at most 10 s;
- idempotent re-import in at most 5 s with zero added logical rows;
- Q1 exact lookup p95 at most 50 ms;
- Q2 current campaign enumeration at most 100 ms and 10,000-case enumeration at most 500 ms;
- Q3/Q4 filters over one million hot case rows at most 2 s;
- Q5 distributions/correlations over ten million reduced rows at most 10 s;
- Q6 one-event root inspection p95 at most 100 ms;
- no accepted partial rows after any injected crash;
- successful integrity check and complete restart after every crash point;
- restored backup reproducing 100% of selected hashes and all 260 canonical packet bytes; and
- steady-state total storage, including indexes and authoritative compressed packets but excluding independent backup copies, no more than 2.5 times compact JSON-equivalent payload for the same retained information.

These thresholds are requirements to test. They are not measured performance claims in this packet.

## 15. Risks, falsifiers, and open decisions

### 15.1 Design risks

- Duplicating authoritative packet BLOBs and hot reductions trades some V1 space for simple recovery; the benchmark must show that the cost stays below the storage gate.
- SQLite's single-writer design may become a bottleneck earlier than byte volume does.
- Application-side compression can hide corruption unless both compressed and uncompressed hashes are checked.
- Typed parameter projections can drift from canonical vectors unless ingestion verifies every projection.
- Parquet scale-up can recreate filesystem sprawl if shard sizing or partition cardinality is uncontrolled.
- Cross-store publication can expose catalog rows before shard durability unless ordering is atomic at the catalog boundary.
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
7. WAL/checkpoint traffic exceeds five times committed logical bytes over a representative campaign without a documented recovery benefit;
8. writer lock or busy failures affect more than 1% of case transactions under the intended one-writer/readers workload;
9. crash injection produces corruption, an accepted partial campaign, or manual repair beyond replaying an idempotent batch;
10. backup restore cannot meet a declared 24-hour recovery objective or fails any integrity/hash/export check;
11. a one-event root inspection requires scanning unrelated raw ledgers;
12. reduced distributions or correlations require loading packet BLOBs; or
13. migration to engine-neutral JSON/Parquet loses units, coordinate definitions, probe polarity, tolerances, root policy, exact hashes, or array order.

If only analytical scans fail while transactional ingestion and exact export pass, keep SQLite for metadata and open the Parquet tier. If writer concurrency or remote operation fails, move metadata to PostgreSQL. If corruption or deterministic export fails, stop ingestion; performance does not compensate for loss of reproducibility.

### 15.3 Open decision

The remaining operator decision is whether to ratify **SQLite-only V1 with the Section 14 benchmark gates**, authorizing a separate benchmark/implementation packet. The compression codec and exact SQLite binding should be selected by that benchmark. No database dependency, production database, generated campaign artifact, evaluator mathematics, root policy, or acceptance semantic is changed here.
