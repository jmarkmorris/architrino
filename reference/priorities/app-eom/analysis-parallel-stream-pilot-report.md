# Parallel-Stream P5A Pilot Report

## Verdict

**PILOT ONLY — no scientific verdict.** The predeclared 13-case pilot matrix
failed closed before the EOM solver accepted its first step. All 13 first
chunks returned `engine_exception` with the same diagnostic:
`certified budget provenance is incomplete or malformed`. No run reached root
search, acceleration reconstruction, coupled correction, publication, or
$C_B$ extraction.

**Claim grade: measured.** The direct falsifier is any run record in
[`evidence/parallel-stream-pilot-2026-07/runs/`](evidence/parallel-stream-pilot-2026-07/runs/)
showing an accepted step or a different diagnostic; none does.

The PILOT coefficient interval is therefore

$$
\boxed{\mathcal I_{C_B}^{\mathrm{PILOT}}=\mathbb R.}
$$

This is an inconclusive interval, not evidence for or against P1's derived
$C_B=0$ result.

**Claim grade: derived from the frozen P5A interval rules.** P5A requires
accepted endpoint velocity hulls and every contamination row. Here the native,
lattice, evolution-geometry, and replay rows were unavailable. The falsifier
is a complete accepted P5A packet with every error row bounded.

**Feasibility verdict: NO on the current executable and instrument binding.**
The binding constraint is certified-budget admission: the frozen pilot bound a
P5A-specific schema, while the executable accepts only the literal
`borg_certified_budget/v1` schema. Changing the schema after these outputs were
visible would create a new instrument and was not attempted. Even after that
binding is redesigned under separate authority, the frozen absolute endpoint
bound creates a second current-architecture resource obstruction described
below.

**Claim grade: measured for the admission failure; inferred for the full-matrix
feasibility verdict.** The operator-checkable falsifier is a separately frozen
P5A binding that is accepted before evolution and then produces a complete
profile inside the declared resource envelope.

## Frozen scope and evidence role

The pilot consumed the equations, six half-width allocations, and pass logic
in [`analysis-parallel-stream-simulation-spec.md`](analysis-parallel-stream-simulation-spec.md)
without changing them after output. The allocations remained

| P5A error row | Maximum half-width |
| --- | ---: |
| Native numerical | $0.015$ |
| Finite length | $0.015$ |
| Lattice | $0.010$ |
| Evolution geometry | $0.005$ |
| Current and normalization | $0.003$ |
| Worker/restart replay | $0.002$ |
| **Total** | **$0.050$** |

The frozen manifest SHA-256 is
`a4e39bc69eadd6fa3dc3a2bbf0b46bd8c9b7655c67bb808709482371ddbb6bf9`.
It declares eight primary rows — two phase realizations times four current
parities — and five profiling-only replicas for worker count, spacing, collar,
speed, and separation. The primary geometry has 64 paths and 4,096 logical
ordered pairs per snapshot. The spacing and collar replicas have 128 paths / 
16,384 pairs and 96 paths / 9,216 pairs, respectively. Every input history is
one straight endpoint-matched segment, every request asks for the sharp chart,
and no restart is used.

**Claim grade: measured from the hash-locked manifest.** The falsifier is a
manifest hash mismatch or a run record whose request summary differs from its
declared case. The runtime checked the manifest and executable hashes before
the first request.

This report is priority-only evidence. It does not promote canon, change the
Master EOM, or alter P1's claim grade.

## Build provenance

The EOM solver rebuilt successfully before the pilot.

| Field | Recorded value |
| --- | --- |
| Latest EOM source change | `src/eom/src/ShadowAffineDiagnostic.cpp`, `2026-07-18T13:27:45-0400` |
| Configure start | `2026-07-18T16:52:24-0400` |
| Binary build time | `2026-07-18T16:52:39-0400` |
| Build lag after latest source change | 12,294 s = 3 h 24 m 54 s |
| Build | Release, all targets, 8 parallel jobs |
| Compile wall observed | 7.5 s |
| Executable | `/tmp/architrino-eom-p5a-pilot-build/eom_borg_shadow_cli` |
| Executable bytes | 1,301,520 |
| Executable SHA-256 | `c1d592a341771961fc0bf60cf3ed5406c4b4df3a8ebb21a5962bdd9ded854a9d` |
| Static library SHA-256 | `fe5069e825d035b118576e6f18c073c2cd224b2574f8be5b7f2154ab0833b010` |
| Source-tree aggregate SHA-256 | `0bb743775965dce4b8b776af5ada234acd3be2676636296b492388783197a3a3` |
| Protocol | `EOM_BORG_NATIVE_V8` |
| Host | MacBook Air `Mac15,13`, Apple M3, 8 cores, 24 GB |

The exact commands and hashes are in
[`build-provenance.json`](evidence/parallel-stream-pilot-2026-07/build-provenance.json)
and [`pilot-instrument-lock.json`](evidence/parallel-stream-pilot-2026-07/pilot-instrument-lock.json).
No git command was used.

**Claim grade: measured.** The falsifiers are the stored executable hash,
binary timestamp, or source timestamps disagreeing with this table.

## Failure mechanism

The failure is an input-binding rejection, not a root, history, geometry, or
physics result. The frozen pilot budget has schema
`parallel_stream_pilot_certified_budget/v0`. The live validator in
[`CoupledEvolution.cpp`](../../../src/eom/src/CoupledEvolution.cpp) accepts a
nonempty certified budget only when its schema equals
`borg_certified_budget/v1`; otherwise it throws the diagnostic returned in all
13 records. That check occurs before the engine starts the timed scientific
phases.

There is a second contract mismatch in the same existing entry point: a
completed coupled evolution is labeled `executable_architecture_evidence`,
whereas P5A's canonical verification rule requires `evidence_status` equal to
`canonical`. No completed pilot row reached that mismatch, but direct code
inspection makes it a pre-execution obligation for any successor instrument.

**Claim grade: measured by 13 emitted diagnostics and direct code inspection.**
The falsifier is a content-bound executable that accepts a P5A budget without
borrowing Borg provenance and emits canonical evidence when all canonical
conditions pass.

The frozen pilot could have been altered to borrow the Borg schema token, but
that would change a provenance field after scientific output was visible.
P5A forbids that retry. The failure is recorded as-is.

## Contract compliance

“Not reached” means the engine rejected the request before it could emit the
named certificate. It is not a pass.

| Contract row | Pilot result | Grade | Falsifier |
| --- | --- | --- | --- |
| Frozen manifest and executable | **PASS**; both hashes matched before execution | measured | Runtime hash guard rejects the run |
| Budget provenance admission | **FAIL**; 13/13 `engine_exception` | measured | Any record is admitted under the frozen schema |
| Accepted atomic publication | **NOT REACHED**; 0 accepted steps | measured | An atomic accepted-step certificate exists |
| Complete ordered-pair domain | **NOT REACHED**; 0 traversal records | measured | Traversal reports the full logical domain with zero unresolved pairs |
| Root and branch completeness | **NOT REACHED**; 0 root rows | measured | Complete root rows cover every admitted ordered pair |
| Retained-history coverage | **NOT REACHED**; no root touched or cleared the memory boundary | measured | Root records certify boundary clearance |
| Sharp chart only | Request binding **PASS**; execution **NOT REACHED** | measured | Any finite-width row is emitted |
| Canonical evidence status | **FAIL as an available interface**; current completed path is hard-coded to architecture evidence | measured by code inspection | A completed canonical certificate is emitted |
| No fail-closed outcome | **FAIL**; 13/13 failed closed | measured | A case completes |

## PILOT $C_B$ error rows

The required plain-language finding is that there is no accepted transverse
velocity transfer to normalize. The native interval is missing, so no finite
$C_B$ interval can be assembled.

| Error row | PILOT result | Allocation decision |
| --- | --- | --- |
| Native numerical | Unbounded: no accepted endpoint velocity hulls | unavailable; no borrowing |
| Finite length | Absolute-tail half-width at pilot geometry: $304.6068166991394$ | exceeds $0.015$ by $20{,}307.1\times$ |
| Lattice | Unbounded: no accepted phase outputs and no spacing-ladder remainder certificate | unavailable; no borrowing |
| Evolution geometry | Unbounded: no accepted nested-window endpoints | unavailable; no borrowing |
| Current and normalization | Frozen decimal tokens have a nonzero denominator | cannot close the interval without numerator rows |
| Worker/restart replay | Unbounded: both worker requests failed before work; restart unused | unavailable; no borrowing |

The finite-length number is a derived bound, not a measured force transfer.
For represented half-extent $Y=\ell+g$, P5A's absolute polarity-density tail
row and normalization give

$$
\epsilon_{\mathrm{tail}}
=
\frac{4c_f^2}{u^2}
\frac{c_f+u/2}{c_f-u/2}
\left(1-\frac{Y}{\sqrt{Y^2+\rho^2}}\right).
$$

At the pilot values $c_f=1$, $u=0.02$, $\rho=1$, and $Y=4$, this is
$304.6068166991394$. The direct falsifier is an outward-rounded derivation from
the same P5A per-pair envelope and receiver normalization that yields a
different coefficient.

Because at least one required row is unbounded, their Minkowski sum is
$\mathbb R$. A midpoint of zero cannot rescue an unbounded interval.

## Measured cost attribution

No successful-run cost attribution exists. Every engine scientific timer and
counter is exactly zero because admission failed before the timer-bearing
phases. Only failure-path latency and stored failure records were measured.

| P5A qualitative driver | Measured pilot number | Interpretation |
| --- | ---: | --- |
| Paths | 64 primary; 96 collar replica; 128 spacing replica | bound inputs; no path evolved |
| Logical ordered pairs | 4,096; 9,216; 16,384 per planned snapshot | planned domains; no traversal row emitted |
| Retained history | depths 12, 16, 24; one input segment per path | parsed input; history-window timer `0` |
| Root binary64 work | `0` pairs, `0` s | not reached |
| Root MPFR work | `0` pairs, `0` attempts, `0` s | not reached |
| Sharp acceleration | `0` s | not reached |
| Finite-width / quadrature / regulator | `0` s | prohibited by request and not reached |
| Coupled correction / recertification / rejection | `0` s; 0 accepted and 0 rejected steps | not reached |
| Fixed reduction / cancellation width | no value | not reached |
| Worker replay | 4-worker and 1-worker requests both rejected | no reproducibility comparison |
| Restart | unused | no incremental cost |
| Failure-path wall time | 13 records; sum `0.053193128` s; mean `0.004091779` s; range `0.002667625`–`0.007991917` s | admission only |
| Harness wall including process lifecycle | `0.065741040` s | admission only |
| Run-record storage | 24,863 bytes | 13 compact failure records |

**Dominant measured driver:** certified-budget provenance admission accounts
for every termination. No solver cost driver can honestly be called dominant,
because none executed. Geometry, path count, or pair count is not substituted
for a profile.

**Claim grade: measured.** The falsifier is any nonzero engine phase counter or
an accepted run in [`pilot-profile.json`](evidence/parallel-stream-pilot-2026-07/pilot-profile.json).

## Full-matrix feasibility

The current execution path cannot plausibly reach width $\le 0.10$ inside any
finite resource envelope because it cannot admit the instrument. That is the
binding constraint for this pilot.

There is also an independent finite-length pressure. Solving the frozen tail
row for its $0.015$ allocation gives these minimum represented sizes before
any lattice, history, integration, or certificate cost:

| Required P5A level | Required $Y/\rho$ | Minimum paths | Logical pairs per snapshot |
| --- | ---: | ---: | ---: |
| Pilot speed $u=0.02$, spacing $a=0.5$ | 583.1523 | 9,332 | 87,086,224 |
| Required half-speed $u=0.01$, spacing $a=0.5$ | 1160.4882 | 18,568 | 344,770,624 |
| Required half-speed $u=0.01$, first finer spacing $a=0.25$ | 1160.4882 | 37,136 | 1,379,082,496 |

**Claim grade: derived size lower bound.** The receiver count and absolute
tail row fix these numbers; using neutrality to shrink them is forbidden by
P5A. The falsifier is a corrected application of the frozen tail equation that
meets $0.015$ with fewer represented cells.

For resource context, the existing EOM architecture survey uses a 64-byte
materialized-pair planning row, a 19.33 GB memory envelope, and a one-hour wall
envelope. Applying that planning row to the low-speed finer-spacing minimum
gives 88.26 GB, or $4.25\times$ the memory envelope, before histories, root
certificates, integration buffers, and output.

**Claim grade: inferred current-architecture projection, not a measured P5A
cost.** Its falsifier is a measured P5A execution path that avoids materialized
pair storage or demonstrates a lower memory footprint while retaining complete
ordered-pair evidence. The supporting calculation is in
[`feasibility-bound.json`](evidence/parallel-stream-pilot-2026-07/feasibility-bound.json).

The feasibility answer remains **NO**. The declared $0.10$ width is unchanged.
Scale selection remains an operator decision and was not made here.

## Evidence inventory

- [`pilot-instrument-manifest.json`](evidence/parallel-stream-pilot-2026-07/pilot-instrument-manifest.json): frozen cases, parameters, budgets, equations, and allocations.
- [`pilot-instrument-lock.json`](evidence/parallel-stream-pilot-2026-07/pilot-instrument-lock.json): executable and input hashes fixed before output.
- [`build-provenance.json`](evidence/parallel-stream-pilot-2026-07/build-provenance.json): build times, commands, host, and artifact hashes.
- [`runs/`](evidence/parallel-stream-pilot-2026-07/runs/): all 13 fail-closed run records.
- [`pilot-contract-compliance.json`](evidence/parallel-stream-pilot-2026-07/pilot-contract-compliance.json): machine-readable contract summary.
- [`pilot-interval-record.json`](evidence/parallel-stream-pilot-2026-07/pilot-interval-record.json): interval rows and feasibility calculation.
- [`pilot-profile.json`](evidence/parallel-stream-pilot-2026-07/pilot-profile.json): timer, counter, path, pair, and storage attribution.
- [`feasibility-bound.json`](evidence/parallel-stream-pilot-2026-07/feasibility-bound.json): required tail extent and current-architecture memory projection.

## Disposition

Disposition: **priority-only failed pilot; no promotion**. The
`aaa-corpus-advancement` routing therefore classifies this packet as
`priority-only`: it records an executable binding defect and a derived
finite-length size floor, but supplies no accepted numerical evidence for the
canonical null.

Thread state: DONE
Mode: edit-batch
Authority used: edited only the authorized pilot report and evidence directory
Files changed: `reference/priorities/app-eom/analysis-parallel-stream-pilot-report.md`; `reference/priorities/app-eom/evidence/parallel-stream-pilot-2026-07/`
Validation: passed JSON parsing, SHA-256 inventory, frozen-manifest lock, file-scope audit, and runner exit with no live exec session
Closure goal: choose whether to authorize a new predeclared P5A budget/evidence binding; do not rerun this frozen pilot
Op next action: separate operator decision required before any new instrument or scale selection
New-thread prompt: none
