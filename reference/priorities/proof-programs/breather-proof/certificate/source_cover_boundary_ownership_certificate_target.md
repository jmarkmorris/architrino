# Higher-Fold Source-Cover Boundary Ownership Certificate Target

## Scope

This packet is the next proof-route target after
`source_cover_defect_atlas_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`.
It applies only to the 42 regular parent-complement rows in
`fresh-v10-higher-fold-12-root-rebuild-v0` whose proof-interval v6 receiver
cover remains incomplete.

It is priority-only. It consumes no rows, does not edit a live ledger, and does
not authorize `branch_chart.json`.

## Source State

Proof-interval v6 proves that receiver-grid refinement is not the missing step:
the 773 failed v5 receiver cells refine to terminal grid 128, but 0 coarse cells
are resolved by refinement. The source-cover defect atlas then records:

- 42 regular parent-complement rows;
- 622 certified simple-root receiver leaves;
- 3,024 structural terminal source-cover misses;
- 1,207 low-side and 1,817 high-side source-cover defects;
- 10 low-only rows, 10 high-only rows, and 22 two-sided rows;
- 978 receiver-left boundary missing leaves, 2,046 receiver-right boundary
  missing leaves, and 0 receiver-interior missing leaves.

Thus the residual regular-row problem is not an interior receiver-cover hole.
It is a receiver-boundary ownership, source-boundary movement, or receiver-range
contraction problem.

The follow-up boundary ownership audit,
`source_cover_boundary_ownership_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
now proves the terminal receiver partition field for all 42 rows: 42 / 42 rows
have complete terminal-grid receiver partitions, 64 boundary components carry
the 3,024 missing terminal leaves, and 0 receiver-interior missing leaves
remain. It also records that 0 rows satisfy the full finite pass rule because
the ownership, source-boundary movement or receiver-contraction,
no-double-counting, branch-reuse, and non-owned-complement fields are absent.

## Certificate Target

For each regular parent row
$$
R^\ell_{A_i,A_j},
\qquad
\ell\in\{u,w\},
$$
the certificate must produce an exact rational receiver partition
$$
A_i
=
C_{\mathrm{left}}
\cup
C_{\mathrm{cert}}
\cup
C_{\mathrm{right}},
$$
where:

1. every component of $C_{\mathrm{cert}}$ is already covered by proof-interval v6
   simple-root receiver leaves;
2. every component of $C_{\mathrm{left}}$ and $C_{\mathrm{right}}$ is one of the
   boundary-attached terminal spans recorded by the source-cover defect atlas;
3. the components are disjoint under an explicit half-open or endpoint ownership
   convention;
4. the union covers the whole receiver interval $A_i$ with no unowned terminal
   span.

Each boundary component must then satisfy at least one accepted alternative:

1. **Source-boundary movement.** A same-packet proof shows that the oriented
   source-inner range expands beyond the recorded atlas defect, with strict
   source-cover margin, strict monotonicity, and strict memory-depth margins.
2. **Receiver-range contraction.** A same-packet proof refines the receiver
   outer range so that the recorded source-cover defect becomes nonpositive,
   again preserving strict monotonicity and memory-depth margins.
3. **Boundary ownership/no-double-counting.** A same-packet topology or endpoint
   ownership proof assigns the boundary component to an adjacent row or endpoint
   class, proves no simple-root branch reuse, proves endpoint disjointness where
   applicable, and proves the non-owned complement has no remaining
   null-coordinate overlap.

Positive-width boundary spans are not endpoint singleton contacts. They cannot
be consumed by the old endpoint-exclusion rule unless the certificate supplies a
new exact ownership statement for the whole boundary component.

## Finite Pass Rule

A row may become `simple_root` only if all of the following fields are certified:

- `complete_receiver_partition=true`;
- `all_terminal_spans_owned=true`;
- `strict_source_coverage_or_contraction=true`;
- `memory_margins_all_owned_components=true`;
- `endpoint_ownership_no_double_counting=true`;
- `simple_root_branch_reuse_exclusion=true`;
- `non_owned_complement_closed=true`.

If any field is absent, the row remains `split_required`.

## Theorem Target

**Boundary ownership closure lemma.** For a fixed higher-fold packet identity,
suppose each of the 42 regular parent-complement rows has an exact rational
receiver partition satisfying the finite pass rule above. Then the proof-grade
simple-root leaves and the certified boundary components form a disjoint
receiver cover for every regular parent row. Under the same half-open ownership
convention, those rows may be consumed as `simple_root` without branch reuse or
double-counting. No branch chart is authorized until the remaining 8
endpoint/complement rows and 112 fold-layer rows also close.

## First Probe Rows

The smallest boundary burdens are the natural first probes:

| Row | Missing leaves | Boundary side | Atlas defect |
| --- | ---: | --- | ---: |
| `R_w_A04_A03` | 1 | low | 0.000026691996524 |
| `R_u_A10_A09` | 1 | low | 0.000026691996524 |
| `R_u_A07_A06` | 1 | high | 0.00024618430271 |

These rows are not accepted. They are the smallest finite tests for the
boundary ownership closure lemma.

The one-leaf boundary movement probe,
`one_leaf_boundary_movement_probe_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
now audits these rows. It records exact strict improvement thresholds for the
two low-side failures and the one high-side failure, but certifies 0
source-boundary movement rows, 0 receiver-range contraction rows, 0
all-owned-component memory-margin rows, and 0 endpoint ownership/no-double
counting rows. The probe consumes 0 rows.

## Capture Decision

Priority-only theorem target. The partition-audit implementation is now
complete and consumes 0 rows. The next implementation should attempt one of the
missing pass-rule fields for the boundary components. For the three one-leaf
probe rows, this means a proof-grade same-packet source-boundary movement or
receiver-range contraction certificate at the recorded strict thresholds, plus
all-owned-component memory margins, endpoint/topology ownership with
no-double-counting, simple-root branch-reuse exclusion, and non-owned complement
closure. No regular parent row may be accepted until all fields in the finite
pass rule are present.
