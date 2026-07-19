# EOM Evolution Contract v1 Amendment 1: Million-Path Scale

## Status

- Amendment id: `eom_evolution_contract/v1/amendment-1`
- Applies to: `eom_evolution_contract/v1`
- Stage: `requirements-frozen`
- Scheduling: `long-term-scale-goal`
- Effective date: 2026-07-13
- Claim level: `priority-design`
- Implementation status: `not-started`
- Production authority: none

This amendment is normative whenever a request declares the million-path scale
profile. It changes the required population and execution envelope without
changing the Master Equation, retained-history initial-data type, ordered-pair
domain, precision contract, or evidence rules of the base contract.

This is an optional long-term conformance profile. It gates only a request,
result, release, or public capability claim that declares million-path support.
It does not gate canonical base-contract evolution for bounded populations,
the first binary outcome, Borg migration, or another consumer whose declared
envelope is smaller.

## Scale Requirement

EOM must be architected to ingest, evolve, and return at least $N=10^6$ active
path identities, each supplied as a continuous retained history. A million
stored samples or history segments distributed among fewer paths does not
satisfy this population requirement.

For $N_R$ receiver events and $N_T$ transmitter paths in one execution window, the
logical ordered-relationship count is

$$
P_{\mathrm{logical}}=N_R N_T.
$$

At a synchronized million-path event this becomes $10^{12}$ ordered
relationships before root multiplicity and history search are counted. This
amendment does not claim that an arbitrary dense, irregular $10^{12}$-record event
is inexpensive. It requires a certified architecture that avoids materializing
or evaluating all records when block proofs or controlled aggregation can resolve
them, and that fails before evolution when the declared hardware envelope
cannot resolve a noncompressible workload.

## Complete Logical Accounting

At every accepted execution window, the disjoint accounting classes must obey

$$
P_{\mathrm{logical}}
=
P_{\mathrm{excluded}}
+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}
+P_{\mathrm{unresolved}}.
$$

- $P_{\mathrm{excluded}}$ is covered by certified root-free block records.
- $P_{\mathrm{exact}}$ is evaluated through the canonical per-pair root and
  acceleration machinery.
- $P_{\mathrm{enclosed}}$ is covered by an admitted active-contribution
  enclosure with traceable membership, certified root topology, and a remainder
  inside the allocated error budget.
- $P_{\mathrm{unresolved}}$ has neither an accepted proof nor an accepted exact
  or enclosed evaluation.

The sets must be disjoint and their membership union must reproduce the full
ordered receiver-transmitter domain, including self-pairs. An accepted step requires
$P_{\mathrm{unresolved}}=0$. A compact block record may cover many relationships;
it must identify that membership by deterministic ranges, index nodes, or a
content-addressed membership object that resolves back to every pair.

Block traversal may produce several receiver-transmitter-time-cell records for one
ordered relationship. Before the counts above are finalized, those cell records
must collapse to exactly one relationship outcome over the complete searched
retained interval. In the first implementation, if any cell for a pair survives
exclusion, that pair's complete retained interval enters exact root
certification; it is counted in $P_{\mathrm{exact}}$, not partly in
$P_{\mathrm{excluded}}$. A later active-enclosure policy must likewise cover the
complete pair contribution or fall back to exact evaluation.

## Certified Block Exclusion

For a receiver block $R$, transmitter-history block $B$, and retained emission cell
$I$, let

$$
\mathcal D_{RB}(I)=[d^-_{RB},d^+_{RB}]
$$

enclose every separation
$\|\mathbf X_i(T_i)-\mathbf X_j(S)\|$ for $i\in R$, $j\in B$, and $S\in I$.
Let

$$
\Delta_{RB}(I)=[\Delta^-_{RB},\Delta^+_{RB}]
$$

enclose every causal delay $T_i-S$ in the same block. For positive field speed,
the block causal-residual enclosure is

$$
\mathcal G_{RB}(I)
=
\left[
d^-_{RB}-c_f\Delta^+_{RB},
d^+_{RB}-c_f\Delta^-_{RB}
\right].
$$

The cell must also certify its causal ordering. If its delay enclosure reaches
zero or negative values, it is split at the relevant receiver times and the
coincident endpoint is handled only through the canonical $H(0)$ convention.

If $0\notin\mathcal G_{RB}(I)$, the complete block is certified root free on
$I$. If zero remains inside, the block must be subdivided in receiver,
transmitter-history, or emission-time coordinates, or its members must proceed to
exact pair evaluation. A point estimate, spatial-distance cutoff, sampled
residual, or average density cannot exclude the block.

The authoritative exclusion record contains the receiver membership, transmitter
membership, history-segment identities, emission interval, position and delay
enclosures, residual enclosure, precision and rounding method, proof version,
and input hashes. Accelerator-generated exclusions are authoritative only when
their outward enclosure is validated under the common numeric contract;
otherwise they are candidates requiring stricter replay.

## Active Contribution Rule

The first production implementation may aggregate root-free exclusions but must
evaluate every surviving active candidate relationship exactly. A later
hierarchical, multipole-style, or low-rank active contribution is admissible
only when it supplies, for every covered receiver $i$,

$$
\mathbf A_{iB}\in\widetilde{\mathbf A}_{iB}+\mathcal E_{iB},
$$

where the enclosure includes root-count and branch-topology uncertainty,
history approximation, kernel approximation, and summation error. Its
membership must be reconstructible, and $\mathcal E_{iB}$ must fit inside the
allocated acceleration and accepted-state budgets. Otherwise the block is
subdivided. An approximation that cannot supply this certificate is a declared
reduced model and cannot report canonical EOM evidence.

## Distributed Retained Histories

Million-path input and output use content-addressed manifests over immutable
history chunks. Each chunk records:

- path-identity range or membership object;
- accepted absolute-time slab and local time origin;
- position and velocity representation, coefficients, and error enclosure;
- spatial and temporal bounds used by the causal index;
- numeric representation and precision;
- predecessor identity, provenance, and content hash.

The engine may tier chunks across accelerator memory, host memory, local
non-volatile storage, and distributed storage. Causal reach determines which
transmitter chunks must be resident, replicated, or fetched for a receiver-owner
shard. A missing required chunk rejects the candidate step; it never becomes an
inactive relationship.

Accepted output is a new manifest referencing the immutable input chunks and
the appended accepted chunks. The response may return a manifest and streamed
dataset locations rather than embedding every evolved record inline. Display
decimation is a separate derivative and cannot replace the full continuation
history.

## Heterogeneous Execution Requirement

The authoritative architecture must support:

1. deterministic receiver ownership across CPU processes, accelerator devices,
   or distributed nodes;
2. batched block-bound and residual work on promoted SIMD or accelerator paths;
3. compaction of nonexcluded tiles into complete-pair root batches whose exact
   searches cover each promoted pair's full retained interval;
4. return of ill-conditioned records to stricter device, CPU extended-precision,
   arbitrary-precision, interval, or exact-predicate services;
5. a deterministic receiver-local reduction, or a fixed distributed merge tree
   with a certified enclosure;
6. candidate-history preparation without publication, followed by an atomic
   accepted-window commit across all receiver owners;
7. checkpoint/restart with identical chunk, root-continuation, precision,
   scheduler, and reduction identities.

The independently authored oracle remains a correctness reference for analytic,
adversarial, sampled production records, and exhaustive smaller controls. It is not
the million-path executor.

## Request And Response Additions

A million-path request adds:

- `contract_amendment_ids`, including this amendment id;
- a content-addressed input history manifest;
- declared path and history-segment counts;
- receiver-owner, history-shard, accelerator, and distributed-resource policy;
- block-exclusion and optional active-enclosure policy versions;
- preflight limits for projected work, memory, transfer, storage, and output;
- output manifest, streaming, and checkpoint policy.

The response adds:

- the input and output manifest identities;
- exact logical, excluded, exact, enclosed, and unresolved relationship counts;
- block-tree, subdivision, exact-fallback, difficult-record, and precision metrics;
- history residency, transfer, storage, checkpoint, and output metrics;
- the resource projection and any difference between projected and observed
  work;
- the exact first failure when the declared envelope cannot complete the run.

## Million-Path Acceptance Profile

The scale amendment is implemented only when one versioned benchmark packet
passes all of the following:

1. **Manifest intake:** validate and index at least $10^6$ continuous retained
   histories without materializing the complete dataset in the application
   shell.
2. **Certified sparse evolution:** evolve at least $10^6$ paths on a workload
   whose inactive relationships are removed only through certified block
   exclusions, with complete pair-coverage equality and no unresolved record.
3. **Exact-control parity:** match exhaustive exact pair evaluation on smaller
   nested controls under the same histories, model, precision, and timestep.
4. **Adversarial refinement:** force selected blocks to survive coarse bounds,
   subdivide, escalate precision, and reach exact pair evaluation without
   changing root count or branch identity.
5. **Heterogeneous parity:** preserve every discrete decision and accepted-state
   enclosure across allowed CPU, GPU, multi-GPU, and distributed schedules.
6. **Restart and output:** restart from a distributed checkpoint and reproduce
   the uninterrupted output manifest and continuation state under the declared
   reproducibility policy.
7. **Dense failure control:** detect a projected noncompressible workload beyond
   the resource envelope before publishing candidate evolution, returning
   `resource_envelope_exceeded` with the projection and no fabricated result.
8. **End-to-end evidence:** report accepted simulated time per wall time,
   exclusion ratio, exact-pair fraction, hierarchy depth, root density,
   precision escalation, transfer, memory, storage, and output throughput.

Passing only ingestion, rendering, a prescribed-path replay, a point-sampled
cutoff, or a GPU throughput kernel does not satisfy this profile.

## Compatibility Boundary

This amendment introduces no engine other than EOM. It
does not grant authority to a prototype, prescribed-path app, approximate
N-body method, or display surface. It raises the scale requirement that the new
EOM architecture must satisfy before million-path capability may be claimed.
Failure to satisfy this amendment prohibits only the million-path capability
claim; it does not invalidate a base-contract run that passes every validation
applicable to its smaller declared envelope.
