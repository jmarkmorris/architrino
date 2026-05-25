# Bounded Speed Factor Action Stability Closure

Promotion status: `priority-only`. This packet gives the bounded speed factor successor for the action, Noether, second-variation, Floquet/monodromy, and observer mass/export rows. It refines [variable-speed-factor-extension.md](variable-speed-factor-extension.md), [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md), [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md), [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md), [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md), [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md), [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), and [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md).

It does not retain a branch. It states the row-level mathematics that must replace fixed-speed action and stability packets before any bounded speed factor continuation can support conservation, Hessian stability, monodromy stability, or observer export. Free-support branches must also attach the support multiplier and support-work rows of [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md).

---

## 1. Branch Variables And Causal Time

Let the geometric support curves remain arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1,
\qquad
\mathbf{T}_i=\mathbf{Y}_i',
\qquad
\mathbf{K}_i=\mathbf{Y}_i''.
$$

A bounded speed factor branch carries positive functions

$$
0<\nu_-\le\nu_i(\lambda_i)\le\nu_+<\infty.
$$

The causal-time map and inverse phase map are

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u).
$$

Thus

$$
\frac{d\Lambda_i}{du}
=
\nu_i(\Lambda_i(u)).
$$

All action, force, Noether, Hessian, and monodromy rows below use the same causal-time receiver coordinate $u$, active root ledger $\mathcal{A}_{\nu}$, endpoint convention, same-source policy, normalization scale $R_*$, support descriptor, and action scale or inertia row. The delayed source phase for a root $a=(i,j,u,\eta_a)$ is

$$
\lambda_i=\Lambda_i(u),
\qquad
\lambda_j^-=\Lambda_j(u-\eta_a).
$$

The bounded speed factor root equation is

$$
G_{ij}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta
=0,
$$

with Jacobian

$$
J_a^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_a.
$$

The packet state is

$$
B_{\nu}
=
\left(
\mathbf{Y},
\nu,
\mathcal{A}_{\nu},
\Gamma_B^{\nu},
\mathcal{L}_{\mathrm{exch}}^{\nu}
\right),
$$

where $\mathcal{L}_{\mathrm{exch}}^{\nu}$ is the speed-factor storage/exchange ledger defined below.

---

## 2. Bounded Speed Factor Action

The total action row is

$$
\mathcal{S}_{\mathrm{tot}}^{\nu}
=
\mathcal{S}_{\mathrm{car}}^{\nu}
+
\mathcal{S}_{\mathrm{hist}}^{\nu}
+
\mathcal{S}_{\mathrm{speed}}^{\nu}
+
\mathcal{S}_{\mathrm{constraints}}^{\nu}
+
\mathcal{S}_{\mathrm{sea/event}}^{\nu}.
$$

For free-support packets, $\mathcal{S}_{\mathrm{constraints}}^{\nu}$ includes the support barrier action $\mathcal{S}_{\mathrm{supp}}^{\nu}$ and complementarity multipliers from [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md).

The carrier kinetic term is evaluated in causal time:

$$
\mathcal{S}_{\mathrm{car}}^{\nu}
=
\frac{R_*}{c_f}
\sum_i
\int_0^{H_*}
\frac12m_{\mathrm{car}}c_f^2
\nu_i(\Lambda_i(u))^2
\,du.
$$

Equivalently, because $du=d\lambda_i/\nu_i(\lambda_i)$,

$$
\mathcal{S}_{\mathrm{car}}^{\nu}
=
\frac{m_{\mathrm{car}}c_fR_*}{2}
\sum_i
\int_0^{L_i}
\nu_i(\lambda_i)
\,d\lambda_i.
$$

If the branch uses a tensorial inertia row instead of a scalar $m_{\mathrm{car}}$, the scalar kinetic term is replaced by

$$
\frac12c_f^2
\left\langle
\nu\mathbf{T},
\mathsf{M}_{B}^{\nu}
\nu\mathbf{T}
\right\rangle,
$$

and the output must report the reduction from $\mathsf{M}_{B}^{\nu}$ to any scalar $\Gamma_B^{\nu}$. A fitted scale alone remains diagnostic.

For a chart direction $v=(\xi,\rho)$ with

$$
\xi_i(\lambda)=D_v\mathbf{Y}_i(\lambda),
\qquad
\rho_i(\lambda)=D_v\nu_i(\lambda),
$$

the causal-time clock variation is

$$
\phi_{v,i}(\lambda)
=
D_v\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{\rho_i(s)}{\nu_i(s)^2}
\,ds.
$$

The clock-corrected curve variation is

$$
\Xi_{v,i}(u)
=
\xi_i(\lambda_i)
-
\nu_i(\lambda_i)\mathbf{T}_i(\lambda_i)
\phi_{v,i}(\lambda_i).
$$

The history work one-form in causal time is therefore

$$
\omega_{\mathrm{hist}}^{\nu}(v)
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_0^{H_*}
\widetilde{\mathbf{F}}_i^{\nu}(u)
\cdot
\Xi_{v,i}(u)
\,du
+
\omega_{\mathrm{root}}^{\nu}(v),
$$

where $\omega_{\mathrm{root}}^{\nu}$ denotes the explicit root-sheet contribution induced by $D_v\eta_a^{\nu}$ and $D_vJ_a^{\nu}$ on the fixed root-sign stratum. The exactness row is

$$
\frac{
\left\|
D_v\omega_{\mathrm{hist}}^{\nu}(w)
-
D_w\omega_{\mathrm{hist}}^{\nu}(v)
\right\|_{\mathrm{F}}
}{
1+\|\omega_{\mathrm{hist}}^{\nu}\|_{\mathrm{F}}
}
\le
\epsilon_{\mathrm{curl}}^{\nu}.
$$

If $\nu_i$ varies but the history work is integrated in fixed arclength without the $\Xi_{v,i}$ clock correction and bounded speed factor root derivatives, the status is

$$
\texttt{bounded-speed-factor-history-work-stale}.
$$

---

## 3. Speed-Factor Storage/Exchange Row

The bounded speed factor stores kinetic excess relative to the fixed-speed row:

$$
E_{\mathrm{spd},i}^{\nu}(u)
=
\frac12m_{\mathrm{car}}c_f^2
\left(
\nu_i(\Lambda_i(u))^2-1
\right).
$$

Along causal time,

$$
\frac{dE_{\mathrm{spd},i}^{\nu}}{du}
=
m_{\mathrm{car}}c_f^2
\nu_i
\frac{d\nu_i}{du}
=
m_{\mathrm{car}}c_f^2
\nu_i^2\nu_i'.
$$

When the scalar action scale satisfies

$$
\Gamma_B^{\nu}
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2},
$$

and the tangential bounded speed factor dynamics row holds,

$$
\nu_i\nu_i'
=
\Gamma_B^{\nu}
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu},
$$

the storage power becomes

$$
\frac{dE_{\mathrm{spd},i}^{\nu}}{du}
=
E_\epsilon(R_*)
\nu_i
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}.
$$

Thus the bounded speed factor continuation must emit a storage/exchange residual

$$
\mathcal{R}_{\mathrm{exch},i}^{\nu}
=
\frac{dE_{\mathrm{spd},i}^{\nu}}{du}
-
E_\epsilon(R_*)
\nu_i
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
-
\mathcal{P}_{\mathrm{constr},i}^{\nu}
-
\mathcal{P}_{\mathrm{sea/event},i}^{\nu}.
$$

Here $\mathcal{P}_{\mathrm{constr},i}^{\nu}$ records work done by speed-band, period, gauge, or same-source constraints, and $\mathcal{P}_{\mathrm{sea/event},i}^{\nu}$ records coherent Noether sea or event exchange. The integrated row on an event window $W=[u_-,u_+]$ is

In a free-support branch, the support multiplier power $\mathcal{P}_{\mathrm{supp},i}^{\nu}$ from [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md) is a named component of $\mathcal{P}_{\mathrm{constr},i}^{\nu}$ unless it is assigned explicitly to the sea/event exchange ledger. Omitting nonzero support work leaves the energy current open.

$$
\mathcal{E}_{\mathrm{exch}}^{\nu}(W)
=
\sum_i
\left[
E_{\mathrm{spd},i}^{\nu}
\right]_{u_-}^{u_+}
-
\sum_i
\int_{u_-}^{u_+}
\left(
E_\epsilon(R_*)
\nu_i
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
+
\mathcal{P}_{\mathrm{constr},i}^{\nu}
+
\mathcal{P}_{\mathrm{sea/event},i}^{\nu}
\right)
du.
$$

A branch with nonconstant $\nu_i$ but no storage/exchange row cannot support conservation or observer mass export. Its status is

$$
\texttt{bounded-speed-factor-exchange-open}.
$$

---

## 4. Euler-Lagrange And Linearized Residuals

The bounded speed factor dynamics residuals are

$$
R_{N,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}
P_i^\perp\widetilde{\mathbf{F}}_i^{\nu},
$$

and

$$
R_{T,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}.
$$

The action row adds the speed-factor Euler-Lagrange residual

$$
R_{\nu,i}^{\mathrm{EL}}
=
\frac{\delta\mathcal{S}_{\mathrm{tot}}^{\nu}}
{\delta\nu_i},
$$

and the exchange residual $\mathcal{R}_{\mathrm{exch},i}^{\nu}$ above. A bounded speed factor candidate must satisfy the coupled residual vector

$$
\mathcal{R}_{\mathrm{act}}^{\nu}
=
\left(
R_N^{\nu},
R_T^{\nu},
R_{\nu}^{\mathrm{EL}},
\mathcal{R}_{\mathrm{exch}}^{\nu},
\mathcal{R}_{\mathrm{curl}}^{\nu},
\mathcal{R}_{\Gamma}^{\nu}
\right).
$$

For a perturbation $v=(\xi,\rho,\delta\Gamma)$, the first linearized normal residual is

$$
\delta R_{N,i}^{\nu}[v]
=
2\nu_i\rho_i\mathbf{K}_i
+
\nu_i^2\delta\mathbf{K}_i
-
\delta\Gamma\,
P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}
-
\Gamma_B^{\nu}
\delta\!\left(
P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}
\right)[v].
$$

The first linearized tangential residual is

$$
\delta R_{T,i}^{\nu}[v]
=
\rho_i\nu_i'
+
\nu_i\rho_i'
-
\delta\Gamma\,
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
-
\Gamma_B^{\nu}
\left(
\delta\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
+
\mathbf{T}_i\cdot
\delta\widetilde{\mathbf{F}}_i^{\nu}[v]
\right).
$$

The force variation $\delta\widetilde{\mathbf{F}}_i^{\nu}[v]$ must include the clock variation, root-delay variation, Jacobian variation, and delayed speed-factor variation from the bounded speed factor root-sheet certificate. The exchange variation is

$$
\delta\mathcal{R}_{\mathrm{exch},i}^{\nu}[v]
=
\frac{d}{du}
\delta E_{\mathrm{spd},i}^{\nu}[v]
-
E_\epsilon(R_*)
\left(
\rho_i\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
+
\nu_i\delta\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
+
\nu_i\mathbf{T}_i\cdot
\delta\widetilde{\mathbf{F}}_i^{\nu}[v]
\right)
-
\delta\mathcal{P}_{\mathrm{constr},i}^{\nu}[v]
-
\delta\mathcal{P}_{\mathrm{sea/event},i}^{\nu}[v].
$$

These three linearized rows are the minimum inputs for the bounded speed factor Hessian and monodromy calculations.

---

## 5. Noether Current Modifications

For a symmetry generator $\zeta$ acting on branch histories, speed factors, constraints, and event variables, the Noether identity becomes

$$
\delta_{\zeta}\mathcal{S}_{\mathrm{tot}}^{\nu}
=
\left[
\mathcal{J}_{\zeta}^{\nu}
\right]_{u_-}^{u_+}
+
\int_{u_-}^{u_+}
\sum_i
\left\langle
\mathrm{EL}_{Y,i}^{\nu},
\delta_{\zeta}\mathbf{Y}_i
\right\rangle
du
+
\int_{u_-}^{u_+}
\sum_i
\mathrm{EL}_{\nu,i}^{\nu}
\delta_{\zeta}\nu_i
\,du
+
\mathcal{R}_{\zeta,\mathrm{exch}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{sea}}^{\nu}
+
\mathcal{R}_{\zeta,\mathrm{boundary}}^{\nu}.
$$

The current splits as

$$
\mathcal{J}_{\zeta}^{\nu}
=
\mathcal{J}_{\zeta,Y}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{hist}}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{spd}}^{\nu}
+
\mathcal{J}_{\zeta,\mathrm{sea/event}}^{\nu}.
$$

The speed-factor contribution contains both stored energy and any explicit momentum conjugate to speed-factor gradients:

$$
\mathcal{J}_{\zeta,\mathrm{spd}}^{\nu}
=
\sum_i
\pi_{\nu,i}^{\nu}
\delta_{\zeta}\nu_i
-
\zeta^u
\sum_i
E_{\mathrm{spd},i}^{\nu},
\qquad
\pi_{\nu,i}^{\nu}
=
\frac{\partial\mathcal{L}_{\mathrm{speed}}^{\nu}}
{\partial(\partial_u\nu_i)}.
$$

If $\mathcal{S}_{\mathrm{speed}}^{\nu}$ has no $\partial_u\nu_i$ dependence, then $\pi_{\nu,i}^{\nu}=0$, but the energy current still carries $E_{\mathrm{spd},i}^{\nu}$ and the exchange residual. The quantitative conservation envelope is

$$
|\mathcal{R}_{\zeta}^{\nu}|
\le
C_{\zeta,Y}
\|\mathrm{EL}_{Y}^{\nu}\|
+
C_{\zeta,\nu}
\|\mathrm{EL}_{\nu}^{\nu}\|
+
C_{\zeta,\mathrm{exch}}
\|\mathcal{R}_{\mathrm{exch}}^{\nu}\|
+
\epsilon_{\mathrm{curl}}^{\nu}
+
\epsilon_{\mathrm{root}}^{\nu}
+
\epsilon_{\mathrm{tail}}^{\nu}
+
\epsilon_{\mathrm{disc}}^{\nu}
+
\epsilon_{\mathrm{endpoint}}^{\nu}.
$$

The energy, momentum, angular momentum, charge, source-provenance, and Noether sea update rows are admissible only if this current and residual envelope use the same bounded speed factor root/action/event ledger.

---

## 6. Second Variation And Hessian Row

The bounded speed factor second variation uses the tangent vector

$$
v=(\xi,\rho,\delta\Gamma),
$$

not only $\xi=\delta\mathbf{Y}$. The fixed root stratum is replaced by

$$
\mathscr{M}_{B}^{\nu}
=
\left\{
(\mathbf{Y},\nu):
\mathcal{A}_{\nu}\text{ fixed},\
|J_a^{\nu}|\ge J_0,\
0<\nu_-\le\nu_i\le\nu_+
\right\}.
$$

The constrained second variation is the bilinear form

$$
Q_B^{\nu}[v,w]
=
D^2\mathcal{S}_{\mathrm{tot}}^{\nu}[v,w]
\bigg|_{\mathscr{M}_{B}^{\nu}}
+Q_{\mathrm{constraint}}^{\nu}[v,w]
+Q_{\mathrm{sea/event}}^{\nu}[v,w].
$$

Equivalently, after neutral gauges and constraints are imposed, its operator block has the form

$$
\mathscr{H}_B^{\nu}
=
\begin{bmatrix}
\mathscr{H}_{YY}^{\nu} & \mathscr{H}_{Y\nu}^{\nu} & \mathscr{H}_{Y\Gamma}^{\nu}\\
\mathscr{H}_{\nu Y}^{\nu} & \mathscr{H}_{\nu\nu}^{\nu} & \mathscr{H}_{\nu\Gamma}^{\nu}\\
\mathscr{H}_{\Gamma Y}^{\nu} & \mathscr{H}_{\Gamma\nu}^{\nu} & \mathscr{H}_{\Gamma\Gamma}^{\nu}
\end{bmatrix}.
$$

The Hessian is a symmetric action Hessian only when the bounded speed factor work-form curl row passes:

$$
\left|
Q_B^{\nu}[v,w]
-
Q_B^{\nu}[w,v]
\right|
\le
\Gamma_B^{\nu}
\epsilon_{\mathrm{curl}}^{\nu}
\|v\|\|w\|.
$$

The packet must emit or enclose:

1. first root shifts $D_v\eta_a^{\nu}$ and $D_vJ_a^{\nu}$;
2. second root shifts $D^2_{v,w}\eta_a^{\nu}$ and $D^2_{v,w}J_a^{\nu}$, or certified interval automatic-differentiation enclosures, from [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md);
3. the cross blocks $\mathscr{H}_{Y\nu}^{\nu}$ and $\mathscr{H}_{\nu Y}^{\nu}$ induced by causal-time clock correction;
4. the storage/exchange second variation $D^2\mathcal{E}_{\mathrm{exch}}^{\nu}[v,w]$;
5. the neutral quotient separating gauge directions, branch-family tangents, constrained speed exchange, and physical speed-factor instability.

If the Hessian freezes $\nu_i$, omits $D^2\eta_a^{\nu}$, or reuses fixed-speed root derivatives, its status is

$$
\texttt{bounded-speed-factor-hessian-stale}.
$$

---

## 7. Floquet And Monodromy State

The bounded speed factor monodromy state is

$$
X^{\nu}(u)
=
\left(
\mathbf{Y}(u),
\nu(u),
\eta(u),
\Gamma_B^{\nu}(u)
\right),
$$

where $\eta(u)$ denotes the ordered vector of active causal delays on the fixed root ledger. The linearized state is

$$
\delta X^{\nu}(u)
=
\left(
\xi(u),
\rho(u),
\delta\eta(u),
\delta\Gamma(u)
\right).
$$

On the fixed root-sign stratum, the variational equation has the form

$$
\frac{d}{du}
\delta X^{\nu}
=
\mathcal{A}_{\mathrm{mon}}^{\nu}(u)
\delta X^{\nu}
+
\mathcal{B}_{\mathrm{exch}}^{\nu}(u)
\delta\mathcal{E}^{\nu},
$$

where $\mathcal{A}_{\mathrm{mon}}^{\nu}$ is assembled from $\delta R_N^{\nu}$, $\delta R_T^{\nu}$, $D_v\eta_a^{\nu}$, $D_vJ_a^{\nu}$, and the $\Gamma_B^{\nu}$ row. The exchange term is absent only when the storage/exchange ledger is identically closed and has no independent state variables.

The one-period propagator is

$$
\Phi_B^{\nu}(H_*)
=
\mathcal{T}
\exp
\left(
\int_0^{H_*}
\mathcal{A}_{\mathrm{mon}}^{\nu}(u)
\,du
\right),
$$

and the reduced monodromy is

$$
M_B^{\nu}
=
\Pi_{\mathrm{ng}}^{\nu}
\Phi_B^{\nu}(H_*)
\Pi_{\Sigma}^{\nu}.
$$

Here $\Pi_{\Sigma}^{\nu}$ imposes the return section and $\Pi_{\mathrm{ng}}^{\nu}$ removes declared gauge-neutral directions. The spectrum must be split into

$$
\operatorname{spec}(M_B^{\nu})
=
\operatorname{spec}_{\mathrm{gauge}}^{\nu}
\cup
\operatorname{spec}_{\mathrm{branch}}^{\nu}
\cup
\operatorname{spec}_{\mathrm{speed}}^{\nu}
\cup
\operatorname{spec}_{\perp}^{\nu}.
$$

The speed sector is not automatically gauge. It may be a physical neutral family, constrained exchange mode, stable transverse mode, or instability. A monodromy packet that reports only the fixed-speed $\mathbf{Y}$ operator while using bounded speed factor roots has status

$$
\texttt{bounded-speed-factor-monodromy-state-incomplete}.
$$

---

## 8. Observer Mass And Export Rows

Observer export is downstream of the same bounded speed factor action and stability ledger. A moving branch row must replace strict fixed speed by

$$
\left\|
\mathbf{v}+\mathbf{u}_i^{(\mathbf{v})}
\right\|
=
c_f\nu_i^{(\mathbf{v})}.
$$

The bounded speed factor mass-energy input is

$$
\overline{E}_{\mathrm{hist}}^{(A,\nu)}
=
\frac{1}{H_*}
\int_0^{H_*}
\left(
E_{\mathrm{root}}^{(A,\nu)}(u)
+
\sum_i
\frac12m_{\mathrm{car}}c_f^2\nu_i(u)^2
+
E_{\mathrm{sea/event}}^{(A,\nu)}(u)
\right)
du,
$$

with the speed-factor exchange residual required as a separate closure row:

$$
\mathcal{R}_{E,\mathrm{exch}}^{(A,\nu)}
=
\sup_{W}
\frac{
\left|
\mathcal{E}_{\mathrm{exch}}^{\nu}(W)
\right|
}{
\epsilon_{E,\mathrm{exch}}
}
\le1.
$$

The exposure tensor and coherent Noether sea response must be recomputed on the same bounded speed factor branch:

$$
\mathcal{Z}_{A,\nu}^{ab}
=
\mathfrak{E}^{ab}
\left[
X_A^{\nu},
\mathcal{A}_{A,\nu},
\overline{E}_{\mathrm{hist}}^{(A,\nu)},
\mathcal{L}_{\mathrm{exch}}^{\nu}
\right],
$$

and

$$
\mathsf{I}_{A,\nu}^{ab}
=
\frac{1}{c_f^2}
\left(
\mathcal{Z}_{A,\nu}^{ab}
+
\mathcal{M}_{\mathrm{sea},A,\nu}^{ab}
+
\mathcal{M}_{\mathrm{spd/exch},A,\nu}^{ab}
\right).
$$

The translational mass target is

$$
m_{\mathrm{tr}}^{\nu}(A)
=
\frac13h_{ab}\mathsf{I}_{A,\nu}^{ab}.
$$

The observer export residual must therefore include

$$
\mathcal{R}_{\mathrm{obs}}^{(A,\nu)}
=
\left(
\mathcal{R}_{\mathrm{ret}}^{\nu},
\mathcal{R}_{\mathrm{carrier}}^{\nu},
\mathcal{R}_{\mathrm{clk}}^{\nu},
\mathcal{R}_{\mathrm{shape}}^{\nu},
\mathcal{R}_{\mathrm{ruler}}^{\nu},
\mathcal{R}_{\mathrm{tw}}^{\nu},
\mathcal{R}_{\mathrm{pf}}^{\nu},
\mathcal{R}_{m}^{\nu},
\mathcal{R}_{E,\mathrm{exch}}^{\nu}
\right).
$$

The export row fails closed if the branch reports a clock, ruler, Lorentz, photon, generation, or mass result from a fixed-speed ledger while the candidate dynamics use $\nu_i\not\equiv1$.

---

## 9. Fixed-Speed Special Case

The fixed-speed packets are recovered by setting

$$
\nu_i\equiv1,
\qquad
\rho_i\equiv0,
\qquad
\chi_i(\lambda_i)=\lambda_i,
\qquad
\Lambda_i(u)=u.
$$

Then

$$
E_{\mathrm{spd},i}^{\nu}=0,
\qquad
\mathcal{R}_{\mathrm{exch},i}^{\nu}=0,
$$

and the bounded speed factor residuals reduce to

$$
R_{N,i}^{\nu}
=
\mathbf{K}_i
-
\Gamma_B
P_i^\perp\widetilde{\mathbf{F}}_i,
$$

and

$$
R_{T,i}^{\nu}
=
-
\Gamma_B
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i.
$$

Thus $R_{T,i}^{\nu}=0$ recovers the fixed-speed tangential closure

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0.
$$

The Hessian loses its speed-factor blocks, and the monodromy state reduces from

$$
(\mathbf{Y},\nu,\eta,\Gamma)
$$

to

$$
(\mathbf{Y},\eta,\Gamma).
$$

The status is

$$
\texttt{fixed-speed-special-case}
\Longleftrightarrow
\nu_i\equiv1
\text{ for every site }i.
$$

Any packet with nonconstant $\nu_i$ that imports this fixed-speed reduction without recomputing the action, Noether, Hessian, monodromy, and observer rows exits with

$$
\texttt{bounded-speed-factor-ledger-mismatch}.
$$

---

## 10. Output Schema

A bounded speed factor action/stability successor packet must emit:

| Field | Required payload |
| --- | --- |
| `branch_scope` | branch class, source-pair policy, same-source policy, endpoint convention, normalization scale $R_*$, support descriptor, event window, and finite-mode chart |
| `bounded_speed_factor` | $\nu_i$, $\nu_-$, $\nu_+$, $\nu_i'$, causal-time maps $\chi_i$, inverse maps $\Lambda_i$, speed-factor status, and band margins |
| `root_ledger` | active roots $G_{ij}^{\nu}=0$, delays $\eta_a$, signs, $J_a^{\nu}$ floors, root brackets, tail treatment, and root-sheet derivatives |
| `action_total` | $\mathcal{S}_{\mathrm{tot}}^{\nu}$, carrier kinetic term, inertia row or $m_{\mathrm{car}}$, $\Gamma_B^{\nu}$, constraints, and Noether sea/event terms |
| `history_work_causal_time` | $\omega_{\mathrm{hist}}^{\nu}$ in causal time, clock-corrected variations $\Xi_{v,i}$, root-work terms, and curl residual $\mathcal{R}_{\mathrm{curl}}^{\nu}$ |
| `speed_factor_storage_exchange` | $E_{\mathrm{spd}}^{\nu}$, $\mathcal{R}_{\mathrm{exch}}^{\nu}$, constraint exchange, Noether sea/event exchange, and integrated window residuals |
| `noether_currents` | $\mathcal{J}_{\zeta}^{\nu}$ split into shape, history, speed-factor, and Noether sea/event parts; conservation envelopes for energy, momentum, angular momentum, charge, and source provenance |
| `linearized_residuals` | $\delta R_N^{\nu}$, $\delta R_T^{\nu}$, $\delta R_{\nu}^{\mathrm{EL}}$, $\delta\mathcal{R}_{\mathrm{exch}}^{\nu}$, $\delta\widetilde{\mathbf{F}}^{\nu}$, $D_v\eta_a^{\nu}$, and $D_vJ_a^{\nu}$ |
| `second_variation` | $Q_B^{\nu}$, Hessian block matrix, second root sensitivities, speed-factor cross blocks, neutral quotient, coercivity or Morse index row, and curl-symmetry error |
| `monodromy_state` | state $(\mathbf{Y},\nu,\eta,\Gamma)$, variational state $(\xi,\rho,\delta\eta,\delta\Gamma)$, return section, reduced monodromy $M_B^{\nu}$, speed-sector classification, and spectrum |
| `observer_mass_export` | moving carrier row $\|\mathbf{v}+\mathbf{u}_i^{(\mathbf{v})}\|=c_f\nu_i^{(\mathbf{v})}$, bounded speed factor energy, exposure tensor, coherent Noether sea response, speed-factor exchange tensor, $m_{\mathrm{tr}}^{\nu}$, and export residuals |
| `fixed_speed_special_case` | explicit $\nu_i\equiv1$ declaration, vanished exchange row, reduced Hessian and monodromy states, and list of fixed-speed packets reused only as special cases |
| `status` | first failed row or one of `fixed-speed-special-case`, `bounded-speed-factor-action-open`, `bounded-speed-factor-hessian-stale`, `bounded-speed-factor-monodromy-state-incomplete`, `bounded-speed-factor-exchange-open`, `bounded-speed-factor-export-open`, `bounded-speed-factor-action-stability-candidate`, `not-retained` |

Minimum status implication:

$$
\texttt{bounded-speed-factor-action-stability-candidate}
\Longrightarrow
\texttt{bounded-speed-factor-action-rerun-complete}
\wedge
\texttt{bounded-speed-factor-noether-rerun-complete}
\wedge
\texttt{bounded-speed-factor-hessian-rerun-complete}
\wedge
\texttt{bounded-speed-factor-monodromy-rerun-complete}
\wedge
\texttt{bounded-speed-factor-export-rerun-complete}.
$$

Current priority status:

$$
\texttt{bounded-speed-factor-action-stability-open},
\qquad
\texttt{fixed-speed-packets-classified-as-special-cases},
\qquad
\texttt{not-retained}.
$$
