# VP-1 Root-Transport Interval Proof Packet

Status. Topology diagnostic for the VP-1 root-transport residual lane. This
packet consumes [spiral-vp1-root-jacobian-proof](spiral-vp1-root-jacobian-proof.md)
and [spiral-vp1-inactive-memory-proof](spiral-vp1-inactive-memory-proof.md).
It stays inside the VP-1 candidate history and supplies no canonical force/action
evidence.

Claim level. Dependent analytic certificate contract. The root-transport residual is not an independent VP-1 interval obstruction once the active root tubes, the nonzero $\partial_\Delta F$ row, and the velocity-projection convention used in $J$ are certified. It is the differentiated causal-delay identity for the same root equation.

## Fixed VP-1 Inputs

The lane uses the VP-1 root equations
$$
F_p(\theta,\Delta)
=
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0,
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and
$$
F_s(\theta,\Delta)
=
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0,
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta},
$$
with
$$
\rho(\theta,\Delta)
=
\exp(a(\cos\theta-\cos(\theta-\Delta))),
\qquad
b(\theta)=b_\ast\exp(a(1-\cos\theta)).
$$
The active-root/Jacobian packet supplies the exact derivative identity
$$
\frac{\partial F_p}{\partial\Delta}=-\frac{J_{12}}{b(\theta)},
\qquad
\frac{\partial F_s}{\partial\Delta}=-\frac{J_{11}}{b(\theta)}.
$$
Since $b(\theta)>0$, a positive lower bound for $|\partial_\Delta F|$ is equivalent to a positive active $|J|$ floor for the retained root tubes.

Let $\alpha$ denote one retained active branch, with source label $j_\alpha$ and kind $p$ or $s$. Put
$$
\mathbf{R}_\alpha(\theta,\Delta)
=
\mathbf{x}_i(\theta)-\mathbf{x}_{j_\alpha}(\theta-\Delta),
\qquad
L_\alpha(\theta,\Delta)=|\mathbf{R}_\alpha(\theta,\Delta)|,
$$
and
$$
\hat{\mathbf r}_\alpha
=
\frac{\mathbf{R}_\alpha}{L_\alpha}.
$$
On the active VP-1 tubes, $L_\alpha=r(\theta)\Lambda_\alpha>0$. The root equation $F_\alpha=0$ is equivalent to the physical causal-delay equation
$$
G_\alpha(\theta,\Delta)
\equiv
L_\alpha(\theta,\Delta)-\frac{c_f}{\Omega}\Delta
=0,
$$
because $F_\alpha=G_\alpha/r(\theta)$ and $r(\theta)>0$.

## Exact Root-Transport Identity

Let $\Delta_\alpha(\theta)$ be the active root-offset map certified by the implicit function theorem:
$$
F_\alpha(\theta,\Delta_\alpha(\theta))=0,
\qquad
\partial_\Delta F_\alpha(\theta,\Delta_\alpha(\theta))\ne0.
$$
Then
$$
\Delta_\alpha'(\theta)
=
-\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}
$$
on the active tube.

Differentiating the equivalent equation
$$
L_\alpha(\theta,\Delta_\alpha(\theta))
=
\frac{c_f}{\Omega}\Delta_\alpha(\theta)
$$
gives
$$
\hat{\mathbf r}_\alpha\cdot
\left(
\frac{d\mathbf{x}_i}{d\theta}(\theta)
-
\frac{d\mathbf{x}_{j_\alpha}}{d\theta}(\theta-\Delta_\alpha(\theta))
(1-\Delta_\alpha'(\theta))
\right)
=
\frac{c_f}{\Omega}\Delta_\alpha'(\theta).
$$
Since
$$
\frac{d\mathbf{x}}{d\theta}=\frac{\mathbf v}{\Omega},
$$
this becomes
$$
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_i}{c_f}
-
\left(1-\Delta_\alpha'(\theta)\right)
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_{j_\alpha}}{c_f}
=
\Delta_\alpha'(\theta).
$$
Define
$$
\beta_{i,\alpha}
=
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_i}{c_f},
\qquad
\beta_{j,\alpha}
=
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_{j_\alpha}}{c_f},
\qquad
J_\alpha=1-\beta_{j,\alpha}.
$$
Then the differentiated causal-delay equation is exactly
$$
\Delta_\alpha'(\theta)
=
\frac{\beta_{i,\alpha}-\beta_{j,\alpha}}{1-\beta_{j,\alpha}},
$$
and therefore
$$
1-\Delta_\alpha'(\theta)
=
\frac{1-\beta_{i,\alpha}}{J_\alpha}.
$$
Equivalently,
$$
J_\alpha(1-\Delta_\alpha'(\theta))-(1-\beta_{i,\alpha})=0.
$$
Using $\Delta_\alpha'=-\partial_\theta F_\alpha/\partial_\Delta F_\alpha$, the runner-facing residual identity is
$$
1+\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}
-
\frac{1-\beta_{i,\alpha}}{J_\alpha}
=0.
$$
A division-free equivalent is
$$
J_\alpha
\left(
\partial_\Delta F_\alpha+\partial_\theta F_\alpha
\right)
-
(1-\beta_{i,\alpha})\partial_\Delta F_\alpha
=0.
$$

## Residual Verdict

Verdict: analytic pass after dependencies. The residual can be marked analytically passed once the interval certificate proves, for every retained active tube:

- $F_\alpha$ is $C^1$ on the tube and contains exactly one active root map $\Delta_\alpha(\theta)$;
- $\partial_\Delta F_\alpha$ is bounded away from zero on the tube;
- the same geometry is used for $F_\alpha$, $J_\alpha$, $\hat{\mathbf r}_\alpha$, $\mathbf v_i$, and $\mathbf v_{j_\alpha}$;
- $\partial_\Delta F_\alpha=-J_\alpha/b(\theta)$ is certified, with $b(\theta)>0$;
- $L_\alpha=r(\theta)\Lambda_\alpha>0$ on the active tube.

Under those dependencies, the root-transport row has no independent mathematical content beyond the active-root and Jacobian rows. A separate interval residual row is still useful as a numerical audit if the runner transports sampled or interpolated root maps, or if it estimates $\Delta_\alpha'$ by finite differences. That audit must not be the theorem-grade blocker when the analytic dependencies above have already passed.

## Runner Integration Contract

Required runner inputs for each active branch $\alpha\in\{P_1,P_2,P_3,S_1\}$:

| Input | Required meaning |
| --- | --- |
| Active tube | Outward interval enclosure for the branch over a slab $I_m\subset I_\ast$ and $\Delta$ tube $K_{\alpha,m}\subset D_{\mathrm{cert}}$. |
| Root equation | The corresponding $F_p$ or $F_s$ used to certify the active root. |
| Partial derivatives | Outward interval forms for $\partial_\theta F_\alpha$ and $\partial_\Delta F_\alpha$. |
| Jacobian identity | Certified row $\partial_\Delta F_\alpha=-J_\alpha/b(\theta)$ using the same $J_{12}$ or $J_{11}$ as the force row. |
| Velocity projections | $\beta_{i,\alpha}=\hat{\mathbf r}_\alpha\cdot\mathbf v_i/c_f$ and $\beta_{j,\alpha}=\hat{\mathbf r}_\alpha\cdot\mathbf v_{j_\alpha}/c_f$, with $J_\alpha=1-\beta_{j,\alpha}$. |
| Separation | Positive lower bound for $L_\alpha=r(\theta)\Lambda_\alpha$ on the active tube. |

The canonical analytic formula is
$$
\Delta_\alpha'=-\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha},
\qquad
1-\Delta_\alpha'
=
\frac{1-\beta_{i,\alpha}}{J_\alpha}.
$$
The runner should report the row as
$$
\mathrm{root\_transport}_\alpha=\mathrm{analytic\_pass}
$$
when the dependency rows above pass. If a numerical audit is desired, evaluate either
$$
\mathcal{R}_{\mathrm{tr},\alpha}
=
\left|
1+\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}
-
\frac{1-\beta_{i,\alpha}}{J_\alpha}
\right|
$$
or the division-free expression
$$
\mathcal{Z}_{\mathrm{tr},\alpha}
=
\left|
J_\alpha
\left(
\partial_\Delta F_\alpha+\partial_\theta F_\alpha
\right)
-
(1-\beta_{i,\alpha})\partial_\Delta F_\alpha
\right|.
$$
For theorem-grade status, $\mathcal{R}_{\mathrm{tr},\alpha}$ or $\mathcal{Z}_{\mathrm{tr},\alpha}$ should be classified as an audit row unless the runner lacks the analytic dependency proof and is instead certifying a transported numerical representation of $\Delta_\alpha$.

Pass condition:

- analytic pass if all dependency rows pass for every active slab and branch;
- optional audit pass if the emitted outward residual interval is bounded by a declared audit tolerance and contains zero;
- no root-transport theorem blocker remains after analytic pass, even if the optional audit row is omitted.

Failure modes:

- the active tube does not certify exactly one simple root;
- $\partial_\Delta F_\alpha$ contains zero, equivalently the active $J_\alpha$ floor closes;
- the runner mixes a root equation, Jacobian row, or velocity projection from a different branch convention;
- the self active tube touches a spatial coincidence with $L_\alpha=0$;
- the runner uses finite-difference or interpolated $\Delta_\alpha'$ values as theorem-grade data without an interval error bound;
- a branch exchange or unlisted active root invalidates the root-offset map on the slab;
- $b(\theta)$, $J_\alpha$, or $L_\alpha$ is evaluated outside the certified VP-1 history or active tube.

## Certificate Status

The exact residual identity closes the VP-1 root-transport algebra. The remaining theorem-grade VP-1 blockers are therefore the active tube interval enclosures, inactive complement gaps, and the outward integral or verdict rows already named by the neighboring packets. The root-transport row should be carried as a dependent analytic row tied to the active-root/Jacobian certificate, not as a new independent interval obligation.
