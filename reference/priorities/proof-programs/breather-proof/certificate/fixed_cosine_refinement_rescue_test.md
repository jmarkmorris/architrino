# Fixed-Cosine Refinement Rescue Test

## Scope

This packet tests whether `seed-doubled-four-arc-cosine-template-v0` can plausibly be rescued by a different simple-root window or mesh refinement alone, while keeping the same cosine candidate history and without adding an enlarged regular-boundary theorem.

Sources read:

- `cosine_packet_parent_gate_rejection.md`
- `next_candidate_refinement_handoff.md`
- `fold_parent_regular_boundary_coverage_attempt.md`
- `fold_parent_w_positive_overlap_subdivision_attempt.md`
- `fold_parent_u_positive_overlap_subdivision_attempt.md`
- `mesh_refined_preledger_v1.json`
- `pass_fail_ledger.md`

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, or any solver-target file.

## Verdict

Rejected as a fixed-cosine rescue route.

A different simple-root window or finer mesh on the same cosine candidate is not a plausible way to close the parent-complement obstruction under the current certificate contract. The obstruction is structural for the recorded monotone null-coordinate geometry: inverse-threshold subdivision can expose more interior simple-root-like rectangles, but it cannot consume the residual equality cores or endpoint-scale uncertified strips without either changing the candidate history or adding an accepted regular-boundary coverage theorem.

The exact verdict is:

```text
fixed_cosine_refinement_rescue_test = rejected_no_plausible_mesh_only_rescue
```

## Monotone Null-Coordinate Argument

On the regular intervals used by the packet, the null coordinates
$$
w(\theta)=2\pi\theta+1.25\cos(2\pi\theta),
\qquad
u(\theta)=2\pi\theta-1.25\cos(2\pi\theta)
$$
are monotone on each listed regular branch after the fold layers are removed. Therefore, for any fixed parent strip $R\times S$, the equality-bearing set is determined by the intrinsic null-coordinate overlap
$$
O_{R,S}^{y}=Y_R^{y}\cap Y_S^{y},
\qquad
y\in\{u,w\}.
$$
A mesh refinement can subdivide the preimage of $O_{R,S}^{y}$ by inverse thresholds, but it cannot change $O_{R,S}^{y}$ while the candidate history and interval endpoints remain fixed.

The accepted simple-root subrows require strict source coverage, recorded in the current packet as
$$
\gamma_{\mathrm{cov}}=0.005.
$$
Equivalently, the receiver null-coordinate range used by a simple-root row must sit a positive distance inside the source coverage range. If a proposed simple-root window is shrunk inward, it may become an accepted interior diagnostic row, but the discarded threshold collars remain part of the parent complement. If the window is expanded to include the whole equality core, it reaches a null-coordinate boundary where the source-coverage distance drops to zero, so it fails the strict simple-root acceptance condition.

Thus the current failure is not lack of a finer threshold calculation. The threshold calculation has already performed the relevant monotone decomposition:

- the `w` lane leaves five residual equality cores and one endpoint-scale gap that is not accepted after outward rounding;
- the `u` lane leaves six residual equality cores and one endpoint-scale gap that is not accepted after outward rounding;
- the residual equality cores are regular-side `A* / A*`, `A* / A0`, or `A* / A2` rectangles, not exact accepted fold-layer rectangles;
- several cores share boundaries with accepted simple-root rows, so accepting them requires explicit ownership and no-double-counting fields.

Any finite mesh-only refinement repeats the same pattern. Interior subrectangles can be made cleaner, but each accepted strict simple-root rectangle must leave boundary collars at the equality thresholds unless another accepted alternative consumes those collars.

## Failure Modes For A Mesh-Only Rescue

| Proposed rescue | Why it fails under the current contract |
| --- | --- |
| Shrink the simple-root windows and add more interior windows. | This can create diagnostic interior rows, but the parent complement still contains positive-width threshold collars or endpoint-scale leftovers. |
| Expand a simple-root window to cover a whole equality core. | The source-coverage gap becomes zero at the null-coordinate boundary, violating the strict simple-root condition. |
| Split one equality core into several adjacent simple-root windows. | A finite split only moves the strict-margin boundary problem to the outermost windows, and shared boundaries still require ownership rules. |
| Treat positive-depth threshold contacts as endpoint-excluded. | The endpoint-exclusion alternative accepts only finite endpoint-contact sets with no off-endpoint crossing; the residual cores have positive-width null-coordinate overlap. |
| Route the residual cores to the existing fold-layer families. | Exact fold-family membership has already failed because the cores are regular-side rectangles, not accepted `F*` row rectangles. |
| Reuse the accepted fixed-parameter fold constants for the residual cores. | The constants apply to the accepted fold-layer row rectangles only; no same-packet domination proof covers the added regular-boundary material. |
| Rely on higher mesh resolution for the endpoint-scale separated strips. | The exact candidate geometry does not change. A sharper outward-rounded strict-gap certificate might close those strips, but the positive-width residual equality cores would still block the parent rows. |

## Parent-Complement Consequence

The six fold-adjacent parent rows remain unconsumed:

| Parent row | Mesh-only rescue verdict |
| --- | --- |
| `R_w_A1_A0` | Rejected: residual `receiver_left` and `source_left` equality cores remain. |
| `R_w_A2_A0` | Rejected: residual `receiver_right` equality core remains, and `source_left` lacks an accepted outward-rounded strict gap. |
| `R_w_A2_A1` | Rejected: residual `receiver_left` and `receiver_right` equality cores remain. |
| `R_u_A3_A2` | Rejected: residual `receiver_left` equality core and endpoint-scale `source_left` positive overlap remain. |
| `R_u_A4_A2` | Rejected: residual `receiver_right` and `source_right` equality cores remain, and `source_left` lacks an accepted outward-rounded strict gap. |
| `R_u_A4_A3` | Rejected: residual `receiver_left` and `receiver_right` equality cores remain. |

No live pre-ledger update is authorized by this packet.

## What Would Have To Change

One of the following would be required before this obstruction could close:

1. A new candidate history or collocation solve whose monotone null-coordinate overlaps do not leave regular-side residual equality cores after simple-root extraction.
2. A changed separator or mesh strategy that proves strict outward-rounded parent-complement gaps for every non-simple-root leftover, not merely diagnostic empty wings adjacent to equality thresholds.
3. An accepted finite regular-boundary theorem with same-packet residual-core inclusion, domination by an accepted bound or a separately accepted enlarged bound, topology ownership, no-double-counting fields, and strict-gap closure for non-core endpoint-scale strips.
4. A separately accepted strict-gap certificate for the endpoint-scale separated strips, plus another accepted alternative for every positive-width residual equality core.

Without one of these changes, the same cosine candidate remains rejected before branch-chart certification.

## Capture Decision

Priority-only. This packet is a proof-program rescue test and should not be promoted into `content/markdown/aaa` unless a later reader-facing proof-program discussion needs a worked example showing why simple-root refinement alone cannot consume fold-adjacent parent complements with residual equality cores.
