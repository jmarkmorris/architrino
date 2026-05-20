# Spiral VP-1 Gamma Dimensional Closure

Status. Worker Gamma proof packet for the VP-1 radial-turn force-ratio blocker. This packet consumes [spiral-branch-chart-certificate](spiral-branch-chart-certificate.md), [spiral-vp1-radial-branch-interval-proof](spiral-vp1-radial-branch-interval-proof.md), and the Master EOM normalization. It does not edit the executable runner, sidecar, generated report, priority list, or authored AAA prose.

Claim level. Proof-style blocker. The VP-1 kinematic branch data determine the retained causal-root chart and the normalized branch sum $B_r(0)$, but they do not determine
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
$$
without an accepted charge, coupling, or inertial normalization.

## Inputs

The VP-1 kinematic data are
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{\Omega R_\ast}{c_f}=\frac{7}{2},
\qquad
\theta_\ast=0,
$$
with
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega}.
$$
Thus
$$
r_\ast\equiv r(0)=R_\ast
$$
in the radial-turn normalization.
At the turn center,
$$
b(0)=b_\ast,
\qquad
\rho(0,\Delta)=\exp(a(1-\cos\Delta)).
$$
The retained active ledger is
$$
P_1,\ P_2,\ P_3,\ S_1,
$$
and the reviewed outward radial branch interval is
$$
B_r(0)\in
[-0.27143260470972164,\ -0.27143255629407625].
$$

## Lemma 1: The Root Chart Cancels The Force Scale

Let
$$
R(\theta)=\exp(a(1-\cos\theta)),
\qquad
r(\theta)=r_\ast R(\theta),
\qquad
\Delta=\Omega(t-t_0).
$$
The causal constraint for either partner or self roots has the form
$$
r(\theta)\Lambda_\bullet(\theta,\Delta)
=c_f(t(\theta)-t(\theta-\Delta))
=\frac{c_f}{\Omega}\Delta.
$$
Dividing by $r(\theta)$ gives
$$
\Lambda_\bullet(\theta,\Delta)
=
\frac{\Delta}{b(\theta)},
\qquad
b(\theta)=\frac{\Omega r(\theta)}{c_f}=b_\ast R(\theta).
$$
Therefore
$$
F_p(\theta,\Delta)
=
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}
$$
and
$$
F_s(\theta,\Delta)
=
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}
$$
depend only on $a$, $b_\ast$, $\theta$, and $\Delta$.

The Jacobian rows also have no independent force-scale input. In the VP-1 formulas,
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
and
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right],
$$
with $p_0=p(\theta-\Delta)$. Hence $J_{12}$ and $J_{11}$ also depend only on $a$, $b_\ast$, $\theta$, and the retained root offset.

Thus the retained VP-1 root chart fixes the dimensionless branch rows but cancels the separate scale data
$$
\kappa,\quad q_1,\quad q_2,\quad r_\ast,\quad \Omega,\quad c_f
$$
except through the already declared velocity ratio $b_\ast=\Omega r_\ast/c_f$.

## Lemma 2: The Radial Row Leaves One Force Ratio

For equal-magnitude opposite charges, the radial-turn expression at $\theta_\ast=0$ is
$$
\mathcal{T}_r(0)
=
r_\ast\Omega^2
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{\kappa q_1^2(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{\kappa q_1^2(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3 |J_{11,s}|}.
$$
Multiplying by $r_\ast^2/(\kappa q_1^2)$ gives
$$
\frac{r_\ast^2}{\kappa q_1^2}\mathcal{T}_r(0)
=
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{1+\rho_p\cos\Delta_p}
{\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{1-\rho_s\cos\Delta_s}
{\Lambda_{s}^3 |J_{11,s}|}.
$$
With
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
$$
and
$$
B_r(0)
=
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{1+\rho_p\cos\Delta_p}
{\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{1-\rho_s\cos\Delta_s}
{\Lambda_{s}^3 |J_{11,s}|},
$$
the normalized row is exactly
$$
\frac{r_\ast^2}{\kappa q_1^2}\mathcal{T}_r(0)
=
\Gamma+B_r(0).
$$

What cancels:

| Quantity | Cancellation |
| --- | --- |
| $\Omega$, $r_\ast$, $c_f$ inside causal roots | They enter the root equations only through $b(\theta)=\Omega r(\theta)/c_f$. |
| $\kappa q_1^2/r_\ast^2$ in branch forces | It is removed by multiplying $\mathcal{T}_r(0)$ by $r_\ast^2/(\kappa q_1^2)$. |
| Equal charge magnitudes | $|q_1q_2|/q_1^2=1$ for the equal-magnitude opposite-charge VP-1 kernel. |

What remains:
$$
\Gamma
=
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
=
b_\ast^2\,\frac{c_f^2 r_\ast}{\kappa q_1^2}.
$$
Since $b_\ast$ fixes only $\Omega r_\ast/c_f$, it does not fix the remaining scale ratio $c_f^2 r_\ast/(\kappa q_1^2)$.

## Proposition: VP-1 Kinematic Data Do Not Determine Gamma

Let $K$ denote the VP-1 kinematic branch data
$$
K=\left(a,b_\ast,\theta_\ast,\{P_1,P_2,P_3,S_1\}\right)
$$
with the retained root intervals and Jacobian floors certified by the branch-chart packets. For any prescribed positive number $\gamma$, choose for example
$$
c_f=1,\qquad r_\ast=1,\qquad \Omega=b_\ast,\qquad q_1=1,\qquad q_2=-1,
$$
and set
$$
\kappa=\frac{b_\ast^2}{\gamma}.
$$
Then
$$
\frac{\Omega r_\ast}{c_f}=b_\ast,
$$
so the VP-1 root equations, active branch labels, Jacobian rows, finite-memory row, and branch sum $B_r(0)$ are unchanged. But
$$
\Gamma
=
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
=
\gamma.
$$
Because $\gamma>0$ was arbitrary, the same VP-1 kinematic branch chart is compatible with a continuum of $\Gamma$ values.

Therefore there is no function
$$
\Gamma=\Gamma(K)
$$
determined by $a=1/10$, $b_\ast=7/2$, $\theta_\ast=0$, and the retained branch roots alone. A $\Gamma$ value or interval can enter only as an additional accepted force-ratio normalization, charge/coupling derivation, inertial-response convention, or full dynamical closure condition. It cannot be inferred from $b_\ast$, from the root offsets, or from the sampled threshold.

## Sidecar Implication

The reviewed branch interval supplies only
$$
B_r^-
=
-0.27143260470972164,
\qquad
B_r^+
=
-0.27143255629407625.
$$
For a declared outward force-ratio interval
$$
\Gamma\in[\Gamma^-,\Gamma^+],
$$
the interval row is
$$
\Gamma+B_r(0)
\in
[\Gamma^-+B_r^-,\ \Gamma^+ + B_r^+].
$$
Thus:
$$
\text{passed}\quad\Longleftrightarrow\quad
\Gamma^- > 0.27143260470972164,
$$
and
$$
\text{certified\_fail}\quad\Longleftrightarrow\quad
\Gamma^+\le0.27143255629407625.
$$
If no accepted strict $\Gamma$ interval is supplied, or if the interval straddles the decision gap, the theorem-grade status of `radial_turn` remains `blocked`.

Consequently the current sidecar must remain blocked on the radial row. The accepted sidecar input is a strict interval in the normalization
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
$$
not a value inferred from $b_\ast=7/2$ or from the retained branch roots.

## Claim Map And Promotion Decision

- Ontology: none added.
- Derivation/closure target: dimensional non-identifiability of $\Gamma$ from the VP-1 root chart, with exact radial-row endpoint consequences.
- Effective summary: VP-1 has a certified retained-chart branch interval, but the radial-turn row is blocked because the independent force-ratio interval is absent.
- Speculation: none promoted.

Promotion decision. Priority-only. This packet is a mathematical blocker for `spiral_branch_chart_test`; it should not be promoted into authored AAA prose until a later accepted normalization or derivation supplies a strict $\Gamma$ interval and resolves the radial-turn row.
