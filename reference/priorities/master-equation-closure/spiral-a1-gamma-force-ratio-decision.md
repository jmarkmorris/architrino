# Spiral A1 Gamma Force-Ratio Decision

Status. Priority-only chart-only proof-route packet for the A1 `radial_turn` force-ratio row. This packet consumes [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json), [spiral-a1-interval-report](spiral-a1-interval-report.md), [spiral-a1-drive-interval-target](spiral-a1-drive-interval-target.md), [spiral-a1-root-window-certificate](spiral-a1-root-window-certificate.md), and the variable-pitch spiral normalization in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). It does not edit the executable runner, sidecar, generated reports, priority queue, or authored AAA prose.

Supersession note. The chart-only non-identifiability result below remains true: retained roots and $b_\ast$ alone do not determine $\Gamma$. It has been superseded as the A1 prescribed-history verdict by [spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md), which uses the additional constant-$\Omega$ radial kinematics to fix $\Gamma$, and by [spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md), which rejects exact tangential compatibility at $\theta_\ast=0$.

Claim level. Proof-route and no-go result for the currently accepted A1 data. No strict $\Gamma$ interval can be derived from the retained A1 branch chart, from $b_\ast=7/2$, from the branch offsets, or from the reported branch-sum threshold. The A1 radial row remains `blocked` until an independent dimensional or constitutive force-ratio input is supplied.

## Accepted A1 Inputs

The retained A1 chart uses
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
\theta_\ast=0,
$$
with active labels
$$
P_1,\ P_2,\ P_3,\ S_1.
$$
The sidecar-consumed radial branch interval is
$$
B_r(C_{\mathrm{A1}};0)
\in[-0.005994791326773983,\ -0.005994715991872956].
$$
Thus the A1 threshold endpoints are
$$
G_{\mathrm{pass}}=0.005994791326773983,
\qquad
G_{\mathrm{fail}}=0.005994715991872956.
$$
The accepted normalization for any force-ratio row is
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$

## Obstruction

Write
$$
R(\theta)=\exp(a(1-\cos\theta)),
\qquad
r(\theta)=r_\ast R(\theta),
\qquad
\Delta=\Omega(t-t_0).
$$
For either partner or self roots, the causal-delay constraint has the form
$$
r(\theta)\Lambda_\bullet(\theta,\Delta)
=
\frac{c_f}{\Omega}\Delta.
$$
Dividing by $r(\theta)$ gives
$$
\Lambda_\bullet(\theta,\Delta)=\frac{\Delta}{b(\theta)},
\qquad
b(\theta)=\frac{\Omega r(\theta)}{c_f}=b_\ast R(\theta).
$$
Therefore the retained A1 root equations and active root offsets depend only on
$$
a,\quad b_\ast,\quad \theta,\quad \Delta,
$$
not on the separate dimensional data $\Omega$, $r_\ast$, $c_f$, $\kappa$, or $q_1$.

The same cancellation holds for the active Jacobian rows:
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
Hence the branch sum
$$
B_r(0)
=
-\sum_{\mathrm{part}}
\frac{1+\rho_p\cos\Delta_p}{\Lambda_p^3|J_{12,p}|}
+
\sum_{\mathrm{self}}
\frac{1-\rho_s\cos\Delta_s}{\Lambda_s^3|J_{11,s}|}
$$
is fixed by the retained branch chart, but it carries no independent force scale.

The physical radial-turn expression has the scale-separated form
$$
\mathcal{T}_r(0)
=
r_\ast\Omega^2
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{\kappa q_1^2(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_p^3|J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{\kappa q_1^2(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_s^3|J_{11,s}|}.
$$
Multiplying by $r_\ast^2/(\kappa q_1^2)$ gives
$$
\frac{r_\ast^2}{\kappa q_1^2}\mathcal{T}_r(0)
=
\Gamma+B_r(0).
$$
The retained branch chart therefore fixes $B_r(0)$ only. The remaining force ratio is
$$
\Gamma
=
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
=
b_\ast^2\,\frac{c_f^2 r_\ast}{\kappa q_1^2}.
$$
Since $b_\ast$ fixes only $\Omega r_\ast/c_f$, it does not fix the remaining scale ratio $c_f^2 r_\ast/(\kappa q_1^2)$.

Equivalently, for any prescribed $\gamma>0$, choose
$$
c_f=1,
\qquad
r_\ast=1,
\qquad
\Omega=b_\ast,
\qquad
q_1=1,
\qquad
q_2=-1,
\qquad
\kappa=\frac{b_\ast^2}{\gamma}.
$$
Then $\Omega r_\ast/c_f=b_\ast$, so the A1 root equations, active labels, Jacobian rows, finite-memory row, root-transport row, and branch sum $B_r(0)$ are unchanged, while
$$
\Gamma
=
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
=
\gamma.
$$
Because $\gamma$ is arbitrary, no function of the retained A1 branch data determines $\Gamma$. A strict $\Gamma$ interval can enter only through an additional accepted dimensional or constitutive closure, such as a charge/coupling normalization, inertial-response convention, or full dynamical scale closure.

## A1 Decision Row

For any future accepted outward force-ratio interval
$$
\Gamma\in[\Gamma^-,\Gamma^+],
$$
the A1 radial-turn row has exactly these outcomes:

| Outcome | Required independent input | Endpoint test |
| --- | --- | --- |
| `passed` | A declared $\Gamma$ interval in the normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$, with nonempty accepted source independent of the branch-sum threshold. | $\Gamma^-+B_r^->0$, equivalently $\Gamma^->0.005994791326773983$. |
| `certified_fail` | A declared $\Gamma$ interval in the same normalization, with nonempty accepted source independent of the branch-sum threshold. | $\Gamma^++B_r^+\le0$, equivalently $\Gamma^+\le0.005994715991872956$. |
| `blocked` | No accepted $\Gamma$ interval, wrong normalization, a value inferred only from $b_\ast$, roots, sampled thresholds, or an interval that straddles the decision gap. | Neither strict endpoint test is proved. |

Thus the concrete next proof target is not another branch-sum computation. It is an independent force-ratio closure for
$$
\frac{c_f^2 r_\ast}{\kappa q_1^2}
$$
in the A1 equal-magnitude opposite-polarity normalization. Without that input, the chart-only classification is tangential-pass/radial-blocked benchmark, not a passing bare isolated spiral certificate. With the additional constant-$\Omega$ prescribed-history input, the later kinematic packet supplies the radial interval and the tangential compatibility packet rejects the prescribed history.

## Claim Map And Promotion Decision

- Ontology: none added.
- Derivation/closure target: A1 inherits the same dimensional non-identifiability of $\Gamma$ from the retained branch chart, with A1-specific endpoint thresholds.
- Effective summary: chart-only A1 has sidecar-consumed structural rows, root transport, and strict negative weighted tangential drive, but no chart-only $\Gamma$ row. The prescribed constant-$\Omega$ A1 history is later rejected by exact tangential compatibility.
- Speculation: none promoted.

Promotion decision. Priority-only. This packet is a force-ratio decision artifact for `spiral_branch_chart_test`; it is not reader-facing AAA prose and should not be promoted as a closure result unless a later accepted $\Gamma$ interval resolves the radial row.
