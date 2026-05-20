# Spiral A1 Post-Benchmark User-Facing Documentation Recommendations

Status. Superseded promoted recommendation packet after the A1 retained-chart benchmark paragraph was promoted into [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). The recommended roadmap/status alignment was promoted into authored corpus prose, but it has since been replaced by the A1 constant-$\Omega$ kinematic-balance no-go after [spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md) and [spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md).

Claim level. Documentation promotion record, not a branch certificate, not a $\Gamma$ proof route, and not a promotion of A1 as a closed isolated spiral.

## Reviewed State

The current variable-pitch spiral section in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) now contains the generic radial normalization
$$
\Gamma\equiv\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
\qquad
B_r(\theta_\ast)
=
-\sum_{\mathrm{part}}
\frac{1+\rho_p\cos\Delta_p}{\Lambda_p^3|J_{12,p}|}
+
\sum_{\mathrm{self}}
\frac{1-\rho_s\cos\Delta_s}{\Lambda_s^3|J_{11,s}|},
$$
with normalized turn row
$$
\Gamma+B_r(\theta_\ast)>0.
$$
It also contains the A1 retained-chart benchmark:
$$
a_{\mathrm{A1}}=0.204,\qquad b_\ast=\frac{7}{2},\qquad I_\ast=[-\pi/6,\pi/6],
$$
whose retained $3+1$ chart has certified active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows, plus a strict negative weighted tangential row
$$
D_T(I_\ast)\in[-0.0015572472070875527,-0.00023480430280344085].
$$
The same paragraph correctly states that radial turn remains blocked because the branch row only supplies
$$
B_r(0)\in[-0.005994791326773983,-0.005994715991872956],
$$
and an independently derived interval for $\Gamma$ is still missing.

The sidecar row source [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json) matches this status: structural rows, dependency status, root transport, and tangential drive are `passed`; radial turn is `blocked`. Therefore the next documentation change should not add more A1 numerical detail. It should align the nearby roadmap language with the promoted benchmark.

## Recommendation Classification

| Recommendation | Classification | Likely destination file(s) | Rationale |
| --- | --- | --- | --- |
| Update the "Analytic footholds and remaining targets" list so the roadmap reflects that A1 is now a replayable partial certificate: structural and root-transport rows pass, tangential drive passes, radial turn is blocked. | promote-now, completed | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) | This is user-facing, scoped, canon-conforming, and does not require the Gamma proof route to close. It prevents the roadmap from lagging behind the newly promoted benchmark. |
| Add another A1 numeric paragraph or sampled continuation discussion. | priority-only | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) only if later needed | The exact benchmark numbers are already present. More sampled continuation values would add diagnostic detail without changing the reader-facing claim. |
| Promote A1 into dyadic-lock, tri-binary stability, particle-mass, black-hole, or cosmology-facing maximum-curvature prose as evidence for a stable maximum-curvature binary. | defer-with-blocker | Likely future consumer surfaces include [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md), [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md), [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), and [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), but only after closure. | A1 is not a closed isolated spiral certificate. The blocker is radial turn plus returned-section and stability closure, not prose wording. |
| Draft or decide the missing $\Gamma$ force-ratio proof route. | defer-with-blocker | Separate $\Gamma$ proof-route packet | A separate worker owns that lane. This packet should only name the missing independent force-ratio row as the blocker. |
| Add a new validation gate or ledger for this post-benchmark status. | priority-only / do not recommend | none | `spiral_branch_chart_test` already owns active roots, inactive gaps, Jacobian floors, finite memory, root transport, radial-turn status, and weighted tangential drive. A new gate would duplicate the current closure route. |

## Recommended User-Facing Change

Recommendation: promote now, completed.

Destination: [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), under `### Analytic footholds and remaining targets`.

Edit type: roadmap/status alignment, not a new theorem and not a new A1 result paragraph.

Suggested replacement for foothold item 3:

```markdown
3. **Variable-pitch spiral retained-chart benchmarks** now expose the branch-chart and Jacobian data that a maximum-curvature binary certificate must report. The fixed A1 chart is a partial certificate rather than a closure result: active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows are certified, and the weighted tangential row is negative, while radial turn remains blocked until an independent $\Gamma$ interval is supplied.
```

Suggested replacement for remaining-target item 1:

```markdown
1. build the maximum-curvature branch certificate from active roots, inactive gaps, Jacobian floors, finite memory, root transport, returned-section residuals, radial/tangential balance, and the independent force-ratio row;
```

This is a theory-elevation edit in the derivation/closure-target bucket. It makes the roadmap consume the A1 benchmark without asserting a stable isolated binary, a mass claim, or a Gamma derivation.

## Defer From Authored Corpus Prose

Do not add prose that says A1 is a passing bare isolated spiral, a stable maximum-curvature binary, or a tri-binary closure mechanism. Those claims need a closed radial row, returned-section residual control, and section-stability or trapping evidence.

Do not add a $\Gamma$ proof sketch in this documentation edit. The only safe reader-facing $\Gamma$ statement is already local: $\Gamma$ is an independent force-ratio row that the retained branch chart does not determine.

Do not update broader consumer files yet, including assembly, mass-map, black-hole, or cosmology documents. A1 currently disciplines the Master EOM branch-chart method; it does not yet supply a downstream physical mechanism for those pages.

## Promotion Decision

Promoted now: a small status update to [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) in the analytic footholds/remaining targets section, using the suggested prose above.

Defer with blocker: any consumer-facing stability or maximum-curvature interpretation. Blocker: radial turn remains unresolved without an independent $\Gamma$ interval, and closure still needs returned-section and stability control.

Priority-only: further A1 sampled continuation notes, new validation gates, and $\Gamma$ proof-route work inside this lane.
