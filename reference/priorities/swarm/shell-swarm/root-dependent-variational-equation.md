# Root-Dependent Variational Equation

Promotion status: `priority-only`. This packet refines [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) by writing the actual variational equation for perturbations of a retained shell swarm branch candidate whose delayed roots move with the perturbation. A stability multiplier computed with frozen roots is not a retained-branch stability certificate.

The equation is local to one support-complete dynamics/action branch, one root ledger, one source-pair policy, one memory convention, one action-derived scale row, and one return section.

For a bounded speed factor branch, the perturbation must include both curve and speed components:

$$
(\xi_i,\rho_i)
=
(\delta\mathbf{Y}_i,\delta\nu_i).
$$

The fixed-speed root variation below is recovered only when $\nu_i\equiv1$ and $\rho_i=0$. Otherwise the variational equation must use the clock-corrected root, Jacobian, and force derivatives in [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md).

---

## 1. Branch And Perturbation

Let $B$ be a support-complete intrinsic branch with closed arclength curves

$$
\mathbf{Y}_{i,B}(\lambda),
\qquad
i=1,\ldots,6,
$$

period $L$, tangent $\mathbf{T}_{i,B}$, curvature $\mathbf{K}_{i,B}$, active root ledger $\mathcal{A}_B$, and action-derived scale $\Gamma_B$. The retained dynamics equation is

$$
\mathbf{K}_{i,B}
=
\Gamma_B P_{i,B}^{\perp}
\widetilde{\mathbf{F}}_{i,B},
\qquad
\mathbf{T}_{i,B}\cdot\widetilde{\mathbf{F}}_{i,B}=0.
$$

Let $\xi_i(\lambda)$ be a perturbation of the branch curve in the return-section history chart. Gauge directions are kept until the return-map split; if a normal-only chart is chosen, impose

$$
\mathbf{T}_{i,B}\cdot\xi_i=0.
$$

---

## 2. Linearized Root Delay

For a retained root label

$$
a=(i,j,\lambda,\mu),
$$

write

$$
\mathbf{R}_a
=
\mathbf{Y}_{i,B}(\lambda)
-
\mathbf{Y}_{j,B}(\lambda-\eta_a),
\qquad
\widehat{\mathbf{R}}_a
=
\frac{\mathbf{R}_a}{\eta_a},
$$

and

$$
J_a
=
1-
\mathbf{T}_{j,B}(\lambda-\eta_a)\cdot\widehat{\mathbf{R}}_a.
$$

The root-delay variation is

$$
\delta\eta_a[\xi]
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\xi_i(\lambda)
-
\xi_j(\lambda-\eta_a)
\right]
}{J_a}.
$$

The delayed perturbation of the source curve is the total delayed variation

$$
\xi_{j,a}^{-}
=
\xi_j(\lambda-\eta_a)
-
\mathbf{T}_{j,B}(\lambda-\eta_a)\delta\eta_a[\xi].
$$

Therefore

$$
\delta\mathbf{R}_a[\xi]
=
\xi_i(\lambda)-\xi_{j,a}^{-}
=
\xi_i(\lambda)
-
\xi_j(\lambda-\eta_a)
+
\mathbf{T}_{j,B}(\lambda-\eta_a)\delta\eta_a[\xi].
$$

The direction variation is

$$
\delta\widehat{\mathbf{R}}_a[\xi]
=
\frac{
\left(I-\widehat{\mathbf{R}}_a\widehat{\mathbf{R}}_a^T\right)
\delta\mathbf{R}_a[\xi]
}{\eta_a}.
$$

---

## 3. Linearized Jacobian And Force

The total delayed tangent perturbation is

$$
\delta\mathbf{T}_{j,a}^{-}[\xi]
=
\delta\mathbf{T}_{j}(\lambda-\eta_a)
-
\mathbf{K}_{j,B}(\lambda-\eta_a)\delta\eta_a[\xi].
$$

The root Jacobian variation is

$$
\delta J_a[\xi]
=
-
\delta\mathbf{T}_{j,a}^{-}[\xi]\cdot\widehat{\mathbf{R}}_a
-
\mathbf{T}_{j,B}(\lambda-\eta_a)\cdot
\delta\widehat{\mathbf{R}}_a[\xi].
$$

For

$$
\mathbf{f}_a
=
\frac{\sigma_i\sigma_j}{\eta_a^2|J_a|}
\widehat{\mathbf{R}}_a,
$$

the force-term variation on a fixed sign stratum for $J_a$ is

$$
\delta\mathbf{f}_a[\xi]
=
\frac{\sigma_i\sigma_j}{\eta_a^2|J_a|}
\left[
\delta\widehat{\mathbf{R}}_a[\xi]
-
\left(
2\frac{\delta\eta_a[\xi]}{\eta_a}
+
\frac{\delta J_a[\xi]}{J_a}
\right)
\widehat{\mathbf{R}}_a
\right].
$$

The full force variation is

$$
\delta\widetilde{\mathbf{F}}_{i,B}[\xi]
=
\sum_{a\in\mathcal{A}_{B,i}}
\delta\mathbf{f}_a[\xi].
$$

---

## 4. Linearized Projected Dynamics

The projector variation is

$$
\delta P_i^\perp[\xi]
=
-
\delta\mathbf{T}_i[\xi]\mathbf{T}_{i,B}^T
-
\mathbf{T}_{i,B}\delta\mathbf{T}_i[\xi]^T.
$$

Define

$$
\delta A_i[\xi]
=
\delta
\left(
P_i^\perp\widetilde{\mathbf{F}}_i
\right)
=
\delta P_i^\perp[\xi]\widetilde{\mathbf{F}}_{i,B}
+
P_{i,B}^{\perp}\delta\widetilde{\mathbf{F}}_{i,B}[\xi].
$$

If $\Gamma_B$ is action-derived and branch-global, its perturbation is

$$
\delta\Gamma_B[\xi]
=
D\Gamma_B[\xi],
$$

from the same action/inertia ledger. In the scale row

$$
\Gamma_B=\frac{\kappa\epsilon^2}{R_*m_{\mathrm{car}}c_f^2},
$$

with $c_f,\epsilon,\kappa$ fixed,

$$
\delta\Gamma_B[\xi]
=
-
\Gamma_B
\left(
\frac{\delta R_*[\xi]}{R_*}
+
\frac{\delta m_{\mathrm{car}}[\xi]}{m_{\mathrm{car}}}
\right).
$$

The projected intrinsic variational equation is

$$
P_{i,B}^\perp
\left[
\xi_i''
-
\Gamma_B\delta A_i[\xi]
-
\delta\Gamma_B[\xi]A_{i,B}
\right]
=
0.
$$

The unit-speed tangent constraints supply the complementary tangent component:

$$
\mathbf{T}_{i,B}\cdot\xi_i'=0,
\qquad
\mathbf{T}_{i,B}\cdot\xi_i''
=
-
\mathbf{K}_{i,B}\cdot\xi_i'.
$$

Equivalently, the full linearized intrinsic dynamics operator is

$$
\mathcal{L}_{B,i}\xi
=
\delta\mathbf{K}[\xi]
-
\Gamma_B\delta A_i[\xi]
-
\delta\Gamma_B[\xi]A_{i,B},
$$

The linearized tangential row is

$$
\mathcal{T}_B\xi
=
\delta\mathbf{T}[\xi]\cdot\widetilde{\mathbf{F}}_B
+
\mathbf{T}_B\cdot\delta\widetilde{\mathbf{F}}_B[\xi].
$$

A linearized retained perturbation must satisfy

$$
\mathcal{L}_B\xi=0,
\qquad
\mathcal{T}_B\xi=0,
$$

modulo declared gauge and branch-tangent directions.

---

## 5. History Evolution And Monodromy

Let $\mathscr{H}_B$ be the root-regular history chart over the certified memory interval. The variational evolution is the linear delayed-history system generated by the operator above:

$$
\dot\xi_\lambda
=
\mathfrak{A}_B(\lambda)\xi_\lambda,
$$

where $\xi_\lambda$ denotes the history segment and $\mathfrak{A}_B$ includes the root-dependent delay variations from Sections 2 and 3. This notation is an operator shorthand: its finite-mode matrix entries are exactly the derivatives of the root, force, projector, curvature, and action rows above.

Let

$$
\Phi_B(L):\mathscr{H}_B\to\mathscr{H}_B
$$

be the period-$L$ solution operator of this variational history system, computed without changing root labels, memory convention, source-pair policy, or action ledger. Choose a return section $\Sigma_B$ and define

$$
h_\Sigma(Z)=0
$$

as its phase condition. The derivative of the return map is

$$
DP_B(Z_B)
=
\Pi_\Sigma\Phi_B(L)
-
\dot Z_B\,
\frac{
D h_\Sigma[\Phi_B(L)(\cdot)]
}{
D h_\Sigma[\dot Z_B]
}.
$$

The reduced monodromy is

$$
M_B
=
\Pi_{\mathrm{ng}}DP_B(Z_B)\Pi_\Sigma.
$$

Here $\Pi_\Sigma$ inserts a section perturbation into the history chart and $\Pi_{\mathrm{ng}}$ removes declared gauge-neutral directions at return. The tangent space split is

$$
T_{Z_B}\mathscr{H}_B
=
\mathcal{G}_B
\oplus
\mathcal{T}_B
\oplus
\mathcal{N}_B,
$$

where $\mathcal{G}_B$ is the declared gauge subspace, $\mathcal{T}_B$ is the phase, torus, or branch-neutral subspace, and $\mathcal{N}_B$ is the transverse subspace used for the stability decision.

---

## 6. Stability Theorem Target

**Theorem target.** Suppose a support-complete branch $B$ passes the dynamics/action certificate and the root, noncollision, support, memory, tail, and chart margins remain positive on a history neighborhood. Suppose the root-dependent variational equation above generates a bounded monodromy operator $\Phi_B(L)$ on the return-section chart, and the gauge split is declared.

If the reduced monodromy satisfies

$$
\max_{\mu\in\operatorname{spec}_{\perp}(M_B)}
|\mu|
\le
1-\epsilon_{\mathrm{stab}},
$$

then $B$ is a locally stable retained limit-cycle branch on the declared root ledger. For a quasiperiodic or NHIM target, replace this inequality by the declared neutral-tangent multipliers and NHIM domination row.

The proof route is:

1. positive root/Jacobian and support margins give a smooth root-dependent history chart;
2. the formulas above define the Fréchet derivative of the force/action dynamics on that chart;
3. the return section quotients gauge-neutral directions;
4. the reduced monodromy spectrum controls first-order perturbation return;
5. the nonlinear perturbation-recovery row from [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) upgrades the linear spectrum to a certified local stability class.

---

## 7. Failure Conditions

The variational equation is invalid and must be rebuilt if any of the following occurs:

$$
\texttt{memory-window-reset},
\quad
\texttt{tail-roots-assimilated},
\quad
\texttt{support-band-escape},
\quad
\texttt{chart-speed-failure},
\quad
\texttt{action-gamma-rerun-required}.
$$

It stops as an ordinary root-ledger variational equation at

$$
\texttt{jacobian-root-fold},
\qquad
\texttt{projection-collision}.
$$

If $\Gamma_B$ is not action-derived on the same ledger, the linearization may be reported only as

$$
\texttt{floquet-gamma-fit-only}.
$$

If $D\Gamma_B$ is not emitted by the action/inertia row, the status is

$$
\texttt{gamma-derivative-missing}.
$$
