# Cosine Packet Parent-Complement Gate Rejection

## Scope

This packet records the current terminal status of `seed-doubled-four-arc-cosine-template-v0` at the null-coordinate pre-ledger parent-complement gate.

It does not edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, does not create `branch_chart.json`, and does not reject the broader breather proof program. It rejects only this cosine candidate packet before branch-chart certification.

## Verdict

Rejected before branch-chart certification.

The packet has useful accepted and reusable diagnostics:

- finite candidate data in `phi_cyc.json`, `mesh.json`, and `candidate_cycle_packet_report.md`;
- accepted coarse itinerary parity in `itinerary.json` and `itinerary_parity_report.md`;
- 140 accepted empty rows and 6 accepted strict simple-root subrows in the rejected pre-ledger;
- accepted fixed-parameter fold constants in `fold_full_interval_constants_certificate.json` for the 16 fold-layer rows.

However, the six fold-adjacent parent rows cannot be consumed under the available closure chain. The decisive blocker is the parent-complement gate, not the branch chart.

## Exhausted Parent-Complement Routes

| Route | Artifact | Result |
| --- | --- | --- |
| Strict range-empty complement gaps | `fold_parent_complement_partition_attempt.md` | Rejected: natural boundary strips have zero/touching ranges or endpoint-scale uncertified gaps. |
| Exact fold-family membership | `fold_parent_fold_family_membership_attempt.md` | Rejected: every strip is a regular-parent subrectangle, not an exact accepted `F*` row rectangle. |
| Endpoint-excluded complements | `fold_parent_endpoint_w_closure_attempt.md`, `fold_parent_endpoint_u_closure_attempt.md` | Rejected as complete closure: seven singleton contacts are locally accepted, but positive-width overlaps remain. |
| Finer threshold subdivision | `fold_parent_w_positive_overlap_subdivision_attempt.md`, `fold_parent_u_positive_overlap_subdivision_attempt.md` | Rejected: diagnostic empty wings can be named, but residual equality cores or uncertified endpoint-scale gaps remain. |
| Regular-boundary fold coverage | `fold_parent_regular_boundary_coverage_attempt.md` | Rejected: exact inclusion, same-packet domination, topology ownership, and non-core strict-gap fields are absent. |

## Current Packet Status

| Row class | Status |
| --- | --- |
| Candidate-cycle data | Accepted as finite data only. |
| Coarse itinerary parity | Accepted as a necessary gate only. |
| Empty rows | 140 accepted rows preserved. |
| Strict simple-root subrows | 6 accepted subrows preserved. |
| Fold-layer constants | Accepted externally as fixed-parameter fallback constants; live fold-layer rows are not rewritten. |
| Fold-adjacent parent rows | Rejected / not consumed. |
| `causal_ledger.json` | Remains rejected. |
| `branch_chart.json` | Unauthorized and absent. |

## Next Candidate Or Refinement Target

The next proof-program packet should not build `branch_chart.json` from this rejected packet. It should instead start a new finite candidate or refinement target that avoids the parent-complement obstruction.

A useful next packet should state one of the following before running the pre-ledger again:

1. a new candidate history or collocation solve whose regular parent complements are expected to have strict gaps after simple-root extraction;
2. a new mesh/refinement strategy whose parent complements can be certified by existing alternatives without residual equality cores;
3. a fully specified enlarged regular-boundary theorem with finite same-packet inclusion and domination fields before any live ledger rewrite is attempted.

The accepted fixed-parameter fold constants from this packet may be reused only as diagnostics or as a model for a later same-packet constants artifact. They do not authorize the rejected cosine packet's branch chart.

## Capture Decision

Priority-only. This is a certificate-status packet for the priority bucket. It is not reader-facing corpus prose and should not be promoted into `content/markdown/aaa` unless the breather proof program later includes a worked failure example.
