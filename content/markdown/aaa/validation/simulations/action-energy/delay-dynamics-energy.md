# Delay Dynamics Energy

This chapter isolates the energy problem created by causal-delay dynamics. It is foundations-adjacent because it states what kind of energy object the substrate law is allowed to use before later chapters invoke conservation, no-runaway arguments, event ledgers, or Noether sea exchange.

The core warning is simple: time-translation invariance of a state-dependent delay equation does not by itself supply the familiar local Noether energy of finite-dimensional mechanics. In $\mathbb{A}\mathbb{A}\mathbb{A}$, any term written as $E_{\text{wake}}$ must be constructed from the same causal-history law, regularization, branch chart, and boundary convention that generate the force row. Otherwise it is a diagnostic label, not a conserved charge.

## Energy Construction Problem

Fix a finite retained system over a time window $W=[T_a,T_b]$, a spatial window $\Omega\subset\Sigma_T$ when boundary flux is relevant, memory depth $h < \infty$, causal-surface width $\eta > 0$, optional core cutoff $\epsilon_c > 0$, and branch chart
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
$$
for the same active causal-root rows used by the [Master Equation](../../../dynamics/master-equation.md). The retained history at time $T$ is the segment
$$
X_T
=
\left\{
\mathbf X_a(T+\theta),
\mathbf V_a(T+\theta),
q_a
:
a\in A_\Omega,\,
-h\le\theta\le0
\right\}
$$
with any excluded rows, endpoint conventions, and boundary crossings recorded explicitly.
Here $A_\Omega$ is the retained architrino index set for the window, not a new kind of assembly.

A promoted delay-energy functional has the form
$$
E_{\mathrm{delay}}^{(\eta)}[X_T;\mathfrak{B},\Omega]
=
K_{\mu}^{(\eta)}(T)
+
E_{\text{wake},\mathfrak{B}}^{(\eta)}(T)
+
E_{\mathrm{sea},\Omega}^{(\eta)}(T)
$$
where $K_{\mu}^{(\eta)}$ is the declared mechanical kinetic bookkeeping proxy, $E_{\text{wake},\mathfrak{B}}^{(\eta)}$ is the causal-history interaction contribution, and $E_{\mathrm{sea},\Omega}^{(\eta)}$ is included only when retained Noether sea degrees of freedom are part of the window. None of these terms is allowed to absorb an unreported boundary flux or unresolved reaction channel.

Observer-level gravitational potential energy is therefore a comparison construct, not a fourth primitive term. When a Newtonian or general-relativistic benchmark writes a gravitational-potential term, this chapter must not carry that term into an $\mathbb{A}\mathbb{A}\mathbb{A}$ action as a primitive. Over a declared window it has to be reconstructed on the same branch chart from the existing packet: $K_{\mu}^{(\eta)}$, $E_{\text{wake},\mathfrak{B}}^{(\eta)}$, any retained $E_{\mathrm{sea},\Omega}^{(\eta)}$, and the boundary-flux row required by finite-window balance. Until that reconstruction is supplied, the gravitational potential remains an effective comparison label rather than an action-level energy.

## Accepted Construction Routes

There are three admissible ways to define the wake-energy term. A calculation may use one route directly, but a theorem-level conservation claim must also state why the other routes are equivalent or irrelevant on the declared chart.

### Action-Boundary Route

If a symmetry-preserving nonlocal action supplies the force row, then the energy term is the time-boundary charge induced by absolute-time translation. With causal-delay interaction kernel $\mathcal{K}_{ij}^{E}(T_1,T_{\mathrm{em}})$ chosen by the same action as the force residual,
$$
E_{\text{wake},\mathfrak{B}}^{(\eta)}(T)
=
\frac{1}{2}
\sum_{i,j}
\int_{-\infty}^{T}dT_{\mathrm{em}}
\int_T^\infty dT_1\,
\partial_{T_1}
\mathcal{K}_{ij,\mathfrak{B}}^{E,\eta}(T_1,T_{\mathrm{em}})
$$
is the candidate in-flight causal-history charge. This is the route developed in [Master Equation](../../../dynamics/master-equation.md#action-level-wake-energy-functional-at-time-boundary-t) and [Effective Lagrangian](../../../dynamics/effective-lagrangian.md#symmetries-and-history-aware-conservation-laws). It becomes theorem-level only when the same action also gives the accepted acceleration law and the endpoint leakage residual vanishes.

### Work-Integral Route

For a realized trajectory, one may reconstruct a compatible interaction contribution by integrating the delivered power:
$$
U_{\mathfrak{B}}(T)
=
U_\ast
-
\int_{T_\ast}^{T}
\sum_i
\mu_{\text{arch}}\,
\mathbf A_{i,\mathfrak{B}}^{(\eta)}(T')
\cdot
\mathbf V_i(T')\,dT'
$$
This route is trajectory-local. It is useful for simulations and branch replay, but it is not an off-shell conserved charge unless the same action and boundary convention have already been declared.

#### Binary Branch Work Ledger

For a solved two-body branch chart $b$, the work-integral route has a concrete first test. Let $\mathbf A_{i,b}^{(\eta)}(T)$ be the acceleration row obtained from exactly the active causal roots retained by the binary branch chart. With the quadratic kinetic proxy, define the delivered branch power by
$$
P_{b,\mathrm{work}}^{(\eta)}(T)
=
\sum_{i=1}^{2}
\mu_{\text{arch}}\,
\mathbf A_{i,b}^{(\eta)}(T)
\cdot
\mathbf V_i(T)
$$
The same row must also be available before superposition. For each retained source/root hit $(i,j,T_{\mathrm{em}})$ on the branch chart, define the root-resolved delivered power
$$
P_{i\leftarrow j,T_{\mathrm{em}}}^{(\eta)}(T)
=
\mu_{\text{arch}}\,
\mathbf A_{i\leftarrow j}^{(\eta)}(T;T_{\mathrm{em}})
\cdot
\mathbf V_i(T)
$$
so that
$$
P_{b,\mathrm{work}}^{(\eta)}(T)
=
\sum_i
\sum_j
\sum_{T_{\mathrm{em}}\in\mathcal C_{ij,b}^{(\eta)}(T)}
P_{i\leftarrow j,T_{\mathrm{em}}}^{(\eta)}(T)
$$
on the same active causal-root ledger. This root-resolved form is the accounting guardrail: source identity, polarity, emission time, Jacobian, and receiver radial power are retained before the net branch work is collapsed to one scalar.
and reconstruct the compatible causal-history interaction contribution by
$$
U_{b,\mathrm{work}}^{(\eta)}(T)
=
U_b(T_\ast)
-
\int_{T_\ast}^{T}
P_{b,\mathrm{work}}^{(\eta)}(T')\,dT'
$$
For a primitive kinetic scalar, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_i\|)$ inside the sum. This is the operational binary definition: the wake-history row is whatever balances the delivered branch work along the realized trajectory, after the window, regulator, and branch ledger have been declared.

On a circular benchmark with speed $s_b$, the radial component is orthogonal to the receiver velocity, so the branch power is the tangential row:
$$
\left\langle
P_{b,\mathrm{work}}^{(\eta)}
\right\rangle_{P_b}
=
\mu_{\text{arch}}\,s_b\,
\left\langle
A_{\eta,b}^{\mathrm{tan}}
\right\rangle_{P_b}
$$
for the quadratic proxy. A nonzero value is not by itself an energy-conservation failure; it is the quantity that the boundary flux, recoil row, or constructed wake-history term must balance. A stable binary claim must therefore compute this row on the same branch chart as the motion residuals before invoking a Noether-style conserved energy.

### Boundary-Flux Route

For finite retained windows, missing energy must be routed to boundary exchange rather than hidden in $E_{\text{wake}}$. The finite-window balance target is
$$
\frac{dE_{\Omega}^{(\eta)}}{dT}
+
\int_{\partial\Omega}
\mathbf{J}_E^{(\eta)}
\cdot
\hat{\mathbf{n}}\,dA
=
P_{\mathrm{ext},\Omega}^{(\eta)}
+
\mathcal{R}_{E,\Omega}^{(\eta)}
$$
where $\mathbf{J}_E^{(\eta)}$ records causal-wake escapement, assembly crossings, and declared medium exchange through the retained boundary. The flux term is not a new substrate field; it is the boundary part of the retained causal-history ledger.

## Crosswalk Residual

The three routes must not define three different energies for the same branch. On any chart where more than one construction is available, use the crosswalk residual
$$
\Delta_{\mathrm{E,cross}}^{(\eta)}(W;\mathfrak{B})
=
\frac{
\left|
\Delta_W E_{\text{wake,act}}^{(\eta)}
-
\Delta_W U_{\mathfrak{B}}
-
\Phi_{\partial\Omega,E}^{(\eta)}(W)
\right|
}{
\left|
\Delta_W E_{\text{wake,act}}^{(\eta)}
\right|
+
\left|
\Delta_W U_{\mathfrak{B}}
\right|
+
\left|
\Phi_{\partial\Omega,E}^{(\eta)}(W)
\right|
+
\varepsilon
}
$$
where $\Phi_{\partial\Omega,E}^{(\eta)}(W)=\int_W\int_{\partial\Omega}\mathbf{J}_E^{(\eta)}\cdot\hat{\mathbf{n}}\,dA\,dT$ is the declared boundary energy flux. The chart promotes only if $\Delta_{\mathrm{E,cross}}^{(\eta)}\to0$ under the same refinement limit used for the force residual.

## Conservation Residual

Let $\mathbf{R}_i^{(\eta)}$ be the Euler or force residual of the declared action-derived model, and let $\mathcal{B}_E^{(\eta)}$ collect endpoint leakage, period cuts, excluded self-coincidence boundaries, and omitted branch rows. The finite-window conservation residual is
$$
\mathcal{R}_{E}^{(\eta)}(W;\mathfrak{B})
=
\Delta_W
\left(
K_{\mu}^{(\eta)}
+
E_{\text{wake},\mathfrak{B}}^{(\eta)}
+
E_{\mathrm{sea},\Omega}^{(\eta)}
\right)
-
\int_W
\sum_i
\mathbf V_i\cdot\mathbf{R}_i^{(\eta)}\,dT
-
\int_W
\mathcal{B}_E^{(\eta)}\,dT
-
W_{\partial\Omega}^{(\eta)}
$$
The normalized diagnostic is
$$
\epsilon_E^{(\eta)}(W;\mathfrak{B})
=
\frac{
\left|
\mathcal{R}_{E}^{(\eta)}(W;\mathfrak{B})
\right|
}{
\left|
\Delta_W K_{\mu}^{(\eta)}
\right|
+
\left|
\Delta_W E_{\text{wake},\mathfrak{B}}^{(\eta)}
\right|
+
\left|
\Delta_W E_{\mathrm{sea},\Omega}^{(\eta)}
\right|
+
\left|
W_{\partial\Omega}^{(\eta)}
\right|
+
\varepsilon
}
$$
An exact isolated conservation claim requires $\epsilon_E^{(\eta)}\to0$, $\Delta_{\mathrm{E,cross}}^{(\eta)}\to0$ when applicable, and stable branch floors as $\eta$ and the numerical/history-window resolution are refined.

## No-Double-Counting Rule

The interaction contribution may be carried by $E_{\text{wake}}$, by an equivalent work-integral reconstruction, or by an explicitly retained near-field decomposition, but not by all of them at once. If a pairwise $U_{\mathrm{int}}$ term is used inside an assembly, the wake-energy term must omit the same near-field content. If a Noether sea update is retained inside $E_{\mathrm{sea},\Omega}$, it must not also appear as an outgoing event-ledger channel. The same rule is used by [Emergence](../../../foundations/emergence-of-structure.md#transition-thresholds-and-event-ledgers) and [Energy](../../../dynamics/energy.md#energy-conservation-and-exchange).

## Promotion and Failure Conditions

A delay-energy construction is promotable only when the branch chart names:

1. the retained history window $h$ and memory truncation residual;
2. the causal-surface regularization $\eta$ and any core cutoff $\epsilon_c$;
3. active causal roots, inactive-root gaps, the active source-normal Jacobian floor, and the retained receiver-normal branch-strength floor or certified interval $\nu_{\mathrm{rec}}$ for $W^{\mathrm{rec}}$;
4. the exact route used for $E_{\text{wake}}$;
5. boundary flux, endpoint leakage, period-cut terms, and excluded self-coincidence rows;
6. the crosswalk residual whenever more than one energy construction is invoked;
7. the lower-bound condition needed for no-runaway arguments.

The construction fails if conservation is recovered only by changing the energy definition per observable, if $E_{\text{wake}}^{(\eta)}$ has no lower bound on the admitted chart, if endpoint leakage is silently discarded, if the regulator is not the same regulator used by the force law, or if the branch chart loses its causal-root floors. In those cases $E_{\text{wake}}$ remains a diagnostic placeholder and cannot be used to close energy bookkeeping, stability, or no-runaway claims.

## Downstream Use

This chapter is the shared energy standard for [Master Equation](../../../dynamics/master-equation.md), [Effective Lagrangian](../../../dynamics/effective-lagrangian.md), [Energy](../../../dynamics/energy.md), [Binary Dynamics](../../../dynamics/binary-dynamics.md), and event-ledger uses in [Emergence](../../../foundations/emergence-of-structure.md). The [two-body binary closure packet](../../../dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target) must report $\epsilon_E^{(\eta)}(W;\mathfrak{B})$, $\Delta_{\mathrm{E,cross}}^{(\eta)}(W;\mathfrak{B})$, and the lower-bound entry on the same branch chart as its motion, branch-floor, stability, and frequency residuals. Existence and stability are not enough unless the accepted branch also carries a constructive energy ledger.
