# Spiral A1 Corpus Recommendation

Status. Recommendation-only packet for `spiral_branch_chart_test`. This file decides what, if anything, from the VP-1 $\Gamma$ blocker and the A1 partial interval certificate should be recommended for later `content/markdown/aaa` edits. It does not edit authored corpus prose.

Claim level. Corpus recommendation, not a theorem-grade branch certificate. The current certificate picture is clear enough to keep the VP-1 and A1 numeric candidate material priority-only while recommending one generic normalization clarification for the Master EOM spiral section.

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
Those rows are still priority-only because the repository runner and sidecar have not consumed the A1 constants, root transport is not emitted on the same A1 chart, and no accepted $\Gamma$ interval resolves the radial turn.

## Candidate Corpus Destinations

| Destination | Recommendation | Reason |
| --- | --- | --- |
| [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), variable-pitch spiral section | Recommend one generic normalization clarification after the radial-turn inequality, but do not name VP-1 or A1 yet. | The current section gives the radial equation but not the normalized force-ratio warning exposed by the VP-1 blocker. This clarification is generally useful and does not overpromote a candidate. |
| [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), analytic footholds list | Defer. | A1 has a partial priority-packet interval certificate, but it is not yet a repository theorem-grade branch chart because sidecar integration, root transport, and $\Gamma$ remain unresolved. |
| [dyadic-lock](../dyadic-lock/dyadic-lock.md) | Defer. | The promotion map already names dyadic lock as a possible destination after an admissible variable-pitch candidate reports all interval rows. A1 has not reached that level because radial turn remains blocked. |
| Validation-gate or closure-ledger files | Do not add a new gate. | The existing `spiral_branch_chart_test` already owns the tested observable: negative weighted tangential drive with positive Jacobian floors, finite memory, and radial-turn status. A new gate would duplicate existing obligations. |

## Exact Recommended Addition

Recommended destination: [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), immediately after the current paragraph ending:

> If all admissible roots keep the weighted tangential sum nonnegative on every candidate turn corridor, the bare isolated spiral does not beat the circular obstruction.

Recommended addition:

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

This is the only content addition I recommend from the current material. It is a derivation/closure-target clarification, not a VP-1 result announcement. It preserves the current theorem-target status of the variable-pitch spiral section and avoids importing priority-only candidate bookkeeping into reader-facing prose.

## Blockers To Immediate Promotion

VP-1 blockers:

- No accepted strict $\Gamma$ interval exists in the normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$.
- VP-1 kinematics do not determine $\Gamma$; using $b_\ast=7/2$ or the threshold $0.27143258\ldots$ as a force-ratio value would be circular.
- The tangential row is certified as a VP-1 failure, but the current sidecar still marks the first nonpassing obligation as `radial_turn` and theorem grade remains false.
- A reader-facing VP-1 worked-result paragraph would overstate the certificate unless it carefully distinguishes local tangential failure from full branch-certificate closure.

A1 blockers:

- The A1 active-root, inactive-gap, Jacobian-floor, self-coincidence, finite-memory, radial-threshold, and tangential-drive rows are priority-packet rows, not yet runner-emitted theorem-grade sidecar rows.
- The A1 root-transport row has not been emitted on the same retained chart.
- The radial branch interval is only a threshold report; no accepted $\Gamma$ interval exists in the normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$.
- The strict negative tangential interval proves only the weighted tangential row for this retained chart. It does not by itself prove a passing bare isolated spiral certificate.
- The $a\approx0.235$ branch-transition warning shows that negative sampled drive farther along the continuation can belong to a different chart, so sampled sign alone must not be generalized.

## Claim Bucket Classification

| Signal | Bucket | Classification |
| --- | --- | --- |
| $\Gamma$ non-identifiability from VP-1 kinematics | Derivation/closure target | Ready to recommend as a generic Master EOM clarification. It states a necessary certificate condition without choosing a force-ratio convention. |
| VP-1 structural interval rows plus certified positive tangential interval | Effective summary and derivation/closure target | Keep priority-only until the radial row is resolved or the corpus needs a carefully bounded worked example of a failed local tangential row. |
| A1 retained-root packet plus strict negative tangential interval | Derivation/closure target | Priority-only partial certificate. It should drive runner or sidecar integration on the fixed $a_{\mathrm{A1}}=0.204$ chart, not corpus prose yet. |
| Any claim that A1 is a passing spiral candidate | Speculation if stated now | Block until active-root, inactive-gap, Jacobian-floor, memory, radial, tangential, and $\Gamma$ interval rows are certified. |
| Any new ontology from VP-1 or A1 | Ontology | None. These packets test the delayed Master EOM branch chart; they do not add substrate entities or new project terminology. |

## Promotion Decision

Promote now: none in this packet, because the current stopping point is a corpus-change recommendation rather than an authored `content/markdown/aaa` edit.

Recommend for parent edit review: the generic normalized radial-row clarification above in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).

Keep priority-only: VP-1 numeric status, VP-1 sidecar details, the $\Gamma$ source-audit trail, the A1 retained-chart interval rows, and all A1 sampled sign-reversal numbers.

Next certificate target: port the fixed $a_{\mathrm{A1}}=0.204$ root-window, radial-threshold, and tangential interval rows into a typed runner sidecar; emit root transport on the same chart; and keep $\Gamma$ as an independent radial-turn row, not as a continuation knob.
