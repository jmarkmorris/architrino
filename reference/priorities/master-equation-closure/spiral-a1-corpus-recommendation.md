# Spiral A1 Corpus Recommendation

Status. Superseded promotion packet for `spiral_branch_chart_test`. This file records the earlier promotion of the generic $\Gamma$ normalization and the fixed A1 tangential-pass/radial-blocked benchmark into `content/markdown/aaa`. It is superseded as the current A1 corpus state by [spiral-a1-kinematic-balance-corpus-recommendation](spiral-a1-kinematic-balance-corpus-recommendation.md), [spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md), and [spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md).

Current status. The Master EOM corpus now treats A1 as a theorem-grade constant-$\Omega$ kinematic-balance no-go for the prescribed isolated two-body history: the prescribed radial kinematics fix $\Gamma$ and pass the radial turn, while the exact turn-center tangential residual excludes zero.

Claim level. Corpus promotion record, not a theorem-grade branch certificate. The current certificate picture is clear enough to promote A1 only as a bounded retained-chart benchmark: tangential drive passes, radial turn remains blocked by the missing independent $\Gamma$ interval.

## Source Picture

The current reader-facing source is [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), especially the variable-pitch spiral section. It already states the partner and self branch formulas, the weighted tangential obstruction test, and the radial-turn inequality. It also states that the variable-pitch result is a theorem target, not a closure proof.

The VP-1 certificate packets add a sharper local status:

- VP-1 uses $a=1/10$, $b_\ast=7/2$, $I_\ast=[-\pi/6,\pi/6]$, and the retained labels $P_1,P_2,P_3,S_1$.
- The structural interval rows pass: active roots, active Jacobian floor, inactive gaps, self-coincidence clearance, finite memory, root transport, and circular dependency.
- The outward tangential interval row is a VP-1 failure:
  $$
  \mathcal{D}_T(I_\ast)\ge0.036446308644655666>0.
  $$
- The radial branch interval is
  $$
  B_r(0)\in[-0.27143260470972164,\ -0.27143255629407625].
  $$
- The radial row remains blocked because no accepted strict interval is declared for
  $$
  \Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
  $$

The $\Gamma$ source audit and dimensional-closure packets prove that $\Gamma$ is not determined by the VP-1 kinematic branch chart. The branch equations use $b_\ast=\Omega r_\ast/c_f$, but the radial force ratio leaves the independent scale $b_\ast^2c_f^2r_\ast/(\kappa q_1^2)$. Therefore $b_\ast$, branch offsets, and the sampled threshold cannot be promoted as a VP-1 force-ratio value.

The A1 continuation adds a useful partial certificate, not a corpus result. It varies only the pitch amplitude in
$$
p(\theta)=-a\sin\theta
$$
at fixed $b_\ast=7/2$ and fixed corridor. The sampled weighted tangential diagnostic crosses sign between $a=0.2025$ and $a=0.203$ while the sampled active ledger remains partner $3$, self $1$. The fixed candidate
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$
now has priority-packet active-root, inactive-complement, Jacobian-floor, self-coincidence, and finite-memory rows in [spiral-a1-root-window-certificate](spiral-a1-root-window-certificate.md). It also has a companion drive interval packet reporting
$$
B_r(C_{\mathrm{A1}};0)\in[-0.005994791326773983,-0.005994715991872956]
$$
and the strict weighted tangential interval
$$
D_T(C_{\mathrm{A1}};I_\ast)
\in[-0.0015572472070875527,-0.00023480430280344085].
$$
Those rows are now consumed by [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json) and [spiral-a1-interval-report](spiral-a1-interval-report.md), including the same-chart root-transport row. They still do not make A1 a closed isolated spiral because no accepted $\Gamma$ interval resolves the radial turn.

## Candidate Corpus Destinations

| Destination | Recommendation | Reason |
| --- | --- | --- |
| [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), variable-pitch spiral section | Promoted the generic normalization clarification after the radial-turn inequality, without naming VP-1 or A1. | The prior section gave the radial equation but not the normalized force-ratio warning exposed by the VP-1 blocker. This clarification is generally useful and does not overpromote a candidate. |
| [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), variable-pitch spiral section | Promoted a short A1 worked benchmark, explicitly labeled tangential-pass/radial-blocked. | Sidecar integration and root transport close the non-radial blocker. The remaining blocker is exactly the independent $\Gamma$ interval already explained by the promoted normalization paragraph. |
| [dyadic-lock](../braid-dyadic-lock/braid-dyadic-lock.md) | Defer. | The promotion map already names dyadic lock as a possible destination after an admissible variable-pitch candidate reports all interval rows. A1 has not reached that level because radial turn remains blocked. |
| Validation-gate or closure-ledger files | Do not add a new gate. | The existing `spiral_branch_chart_test` already owns the tested observable: negative weighted tangential drive with positive Jacobian floors, finite memory, and radial-turn status. A new gate would duplicate existing obligations. |

## Promoted Addition

Promoted destination: [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), immediately after the paragraph ending:

> If all admissible roots keep the weighted tangential sum nonnegative on every candidate turn corridor, the bare isolated spiral does not beat the circular obstruction.

Promoted addition:

```markdown
For a retained chart at a turn center, the radial row can be normalized by the common force factor, but that normalization separates the branch sum from the independent force ratio. In the equal-magnitude opposite-polarity case, one may write
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
so the normalized turn row is
$$
\Gamma+B_r(\theta_\ast)>0.
$$
The retained branch chart fixes $B_r$ only. It does not determine $\Gamma$ from $b_\ast=\Omega r_\ast/c_f$, from the delayed-root offsets, or from a branch-sum threshold. A branch certificate must therefore either supply an independently derived force-ratio interval or report the radial row as blocked.
```

This was the first content addition promoted from the current material. It is a derivation/closure-target clarification, not a VP-1 or A1 result announcement. It preserves the current theorem-target status of the variable-pitch spiral section and avoids importing priority-only candidate bookkeeping into reader-facing prose.

## Promoted A1 Benchmark Addition

Promoted destination: [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), immediately after the normalized radial-row clarification.

Promoted addition:

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

This is a derivation/closure-target benchmark, not an ontology edit and not a closure result. It records a replayable partial certificate under the existing `spiral_branch_chart_test` rather than creating a new gate.

## Blockers To Immediate Promotion

VP-1 blockers:

- No accepted strict $\Gamma$ interval exists in the normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$.
- VP-1 kinematics do not determine $\Gamma$; using $b_\ast=7/2$ or the threshold $0.27143258\ldots$ as a force-ratio value would be circular.
- The tangential row is certified as a VP-1 failure, but the current sidecar still marks the first nonpassing obligation as `radial_turn` and theorem grade remains false.
- A reader-facing VP-1 worked-result paragraph would overstate the certificate unless it carefully distinguishes local tangential failure from full branch-certificate closure.

A1 blockers:

- The A1 active-root, inactive-gap, Jacobian-floor, self-coincidence, finite-memory, root-transport, radial-threshold, and tangential-drive rows are now sidecar-consumed rows, but only the tangential row is a passing drive row.
- The radial branch interval is only a threshold report; no accepted $\Gamma$ interval exists in the normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$.
- The strict negative tangential interval proves only the weighted tangential row for this retained chart. It does not by itself prove a passing bare isolated spiral certificate.
- The $a\approx0.235$ branch-transition warning shows that negative sampled drive farther along the continuation can belong to a different chart, so sampled sign alone must not be generalized.

## Claim Bucket Classification

| Signal | Bucket | Classification |
| --- | --- | --- |
| $\Gamma$ non-identifiability from VP-1 kinematics | Derivation/closure target | Promoted as a generic Master EOM clarification. It states a necessary certificate condition without choosing a force-ratio convention. |
| VP-1 structural interval rows plus certified positive tangential interval | Effective summary and derivation/closure target | Keep priority-only until the radial row is resolved or the corpus needs a carefully bounded worked example of a failed local tangential row. |
| A1 retained-root packet plus strict negative tangential interval | Derivation/closure target | Sidecar-consumed partial certificate. It has been promoted as a scoped corpus benchmark stating tangential pass and radial block, but not as a closure claim. |
| Any claim that A1 is a passing spiral candidate | Speculation if stated now | Block until active-root, inactive-gap, Jacobian-floor, memory, radial, tangential, and $\Gamma$ interval rows are certified. |
| Any new ontology from VP-1 or A1 | Ontology | None. These packets test the delayed Master EOM branch chart; they do not add substrate entities or new project terminology. |

## Promotion Decision

Promoted now: the generic normalized radial-row clarification, the scoped A1 tangential-pass/radial-blocked benchmark, and the corresponding analytic-footholds roadmap alignment in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).

Deferred from authored corpus prose: VP-1 numeric status, VP-1 sidecar details, the $\Gamma$ source-audit trail, A1 sampled sign-reversal numbers, and any statement that A1 is a passing bare isolated spiral.

Reason: the generic clarification protects the theorem target from circular force-ratio inference, and the A1 benchmark is replayable as a partial certificate. The independent $\Gamma$ force-ratio row still blocks any closure claim.

Next certificate target: decide the A1 radial row by supplying an accepted $\Gamma$ interval or by proving that no accepted force-ratio interval can satisfy the threshold. Keep $\Gamma$ as an independent radial-turn row, not as a continuation knob.
