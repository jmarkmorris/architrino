# Spiral A1 User-Facing $\mathbb{A}\mathbb{A}\mathbb{A}$ Documentation Recommendations

Status. Superseded promoted recommendation packet after review of the approved radial-normalization clarification in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). The recommended A1 benchmark paragraph was promoted into authored corpus prose, but that paragraph has since been replaced by the A1 constant-$\Omega$ kinematic-balance no-go after [spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md) and [spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md).

Claim level. Documentation promotion record, not a branch certificate and not a promotion of A1 as a closed isolated spiral.

## Reviewed Inputs

The current variable-pitch spiral section in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) now includes the generic radial normalization:
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
The section also states the key certificate warning: the retained branch chart fixes $B_r$ only, and does not determine $\Gamma$ from $b_\ast=\Omega r_\ast/c_f$, delayed-root offsets, or a branch-sum threshold.

The priority packets reviewed for follow-on documentation are:

- [spiral-a1-corpus-recommendation](spiral-a1-corpus-recommendation.md)
- [spiral-a1-drive-interval-target](spiral-a1-drive-interval-target.md)
- [spiral-a1-root-window-certificate](spiral-a1-root-window-certificate.md)
- [spiral-a1-root-transport-interval-proof](spiral-a1-root-transport-interval-proof.md)
- [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json)
- [spiral-a1-interval-report](spiral-a1-interval-report.md)

## Recommendation Classification

| Recommendation | Classification | Rationale |
| --- | --- | --- |
| Keep the approved generic radial-normalization clarification in the Master EOM spiral section. | Promote now, already done by parent edit. | It is reader-facing and theorem-safe because it states a general normalization and a missing independent force-ratio obligation, not a candidate result. |
| Add A1 as a closed isolated spiral result. | Defer with blocker. | The A1 sidecar now consumes the structural rows, same-chart root transport, and the strict negative tangential-drive interval, but the radial row remains blocked because no accepted $\Gamma$ interval resolves $\Gamma+B_r(0)>0$. |
| Add a short A1 worked benchmark that explicitly says tangential row passed and radial turn is blocked. | Promote now, completed. | The sidecar makes this replayable enough for a bounded reader-facing benchmark, and the promoted prose states that A1 is not a closure result and that $\Gamma$ remains independent evidence. |
| Add VP-1 or A1 sampled continuation numbers as explanatory prose. | Priority-only. | Sampled sign changes and candidate thresholds are useful search diagnostics, but they are not theorem-safe documentation until replaced by emitted interval rows with fixed candidate metadata. |
| Add a new validation gate, ledger, or checker for this documentation issue. | Priority-only / do not recommend. | `spiral_branch_chart_test` already owns the relevant observable: active delayed roots, positive Jacobian floors, finite memory, weighted tangential drive, root transport, and radial-turn status. A new gate would duplicate the existing closure route. |

## User-Facing Documentation Decision

Promoted now: the generic radial-normalization clarification and the short A1 tangential-pass/radial-blocked benchmark in the Master EOM chapter.

Completed recommendation: a short, explicitly scoped A1 benchmark paragraph in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), immediately after the radial-normalization clarification. This is safe as a partial-certificate example because [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json) and [spiral-a1-interval-report](spiral-a1-interval-report.md) report the same retained chart with structural rows, root transport, dependency status, and tangential drive passed. The benchmark states that radial turn remains blocked in the normalization
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$

Defer with blocker: any prose that calls A1 a passing bare isolated spiral. The blocker is not literary polish; it is the missing independent $\Gamma$ interval.

Priority-only: sampled continuation sign-change values and any broader A1 continuation claims. The sidecar-supported fixed-chart rows may be used only for the scoped benchmark, not for a general parameter-family claim. The fixed rows are:
$$
a_{\mathrm{A1}}=0.204,\qquad b_\ast=\frac{7}{2},
$$
the retained $P_1,P_2,P_3,S_1$ chart, the strict negative weighted tangential interval, and the radial branch-sum threshold interval.

## Recommended Addition

Recommended destination: [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), immediately after the promoted radial-normalization paragraph.

Recommended text:

```markdown
A fixed retained-chart benchmark illustrates the split. For the $a=0.204$, $b_\ast=7/2$ variable-pitch spiral on $I_\ast=[-\pi/6,\pi/6]$, the retained $3+1$ chart has certified active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows. Its weighted tangential row is strictly negative:
$$
D_T(I_\ast)\in[-0.0015572472070875527,-0.00023480430280344085].
$$
The same chart is still not a closed isolated spiral certificate, because the radial branch row only supplies
$$
B_r(0)\in[-0.005994791326773983,-0.005994715991872956],
$$
and the normalized radial condition still requires an independently derived interval for $\Gamma$. Thus this benchmark passes the tangential-drive test while leaving radial turn blocked.
```

This is a theory-elevation edit, not an ontology edit. It gives readers one replayable partial certificate while preserving the central warning that $B_r$ and $\Gamma$ are separate data.
