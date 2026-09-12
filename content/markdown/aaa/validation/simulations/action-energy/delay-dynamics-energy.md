# Delay Dynamics Energy

This chapter isolates the energy problem created by [causal-delay dynamics](../../../foundations/architrino.md), in which an architrino is accelerated by earlier emissions whose expanding wakes reach it at the current time. It states what kind of energy object the substrate law is allowed to use before later chapters invoke conservation, no-runaway arguments, event ledgers, or Noether sea exchange.

The core warning is simple: time-translation invariance of a state-dependent delay equation does not by itself supply the familiar local Noether energy of finite-dimensional mechanics. In $\mathbb{A}\mathbb{A}\mathbb{A}$, any term written as $E_{\text{wake}}$ must be constructed from the same causal-history law, regularization, branch chart, and boundary convention that generate the acceleration contribution. Otherwise it is a diagnostic label, not a conserved charge.

## Energy Construction Problem

Fix a finite retained system over an absolute-time window $W=[T_a,T_b]$, a fixed spatial window $\Omega\subset\Sigma_T$ when boundary flux is relevant, memory depth $0 < H_{\mathrm{hist}} < \infty$, causal-wake-surface width $\eta > 0$, optional core cutoff $\epsilon_c > 0$, and branch chart
$$
\mathfrak{B}(\Gamma,\mathcal{S};H_{\mathrm{hist}},\eta,\epsilon_c)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-4bb181a0010ce0c0)

for the same active causal roots used by the [Master Equation](../../../dynamics/master-equation.md). Here $\Sigma_T$ is the Euclidean spatial slice at absolute time $T$, $\Gamma$ is the admitted history domain, and $\mathcal S$ labels the retained branch family. A causal root is an emission time whose expanding wake reaches a specified receiver; the branch chart records those roots, their identities, and the conditions under which they remain admissible. The retained history at time $T$ is the segment
$$
X_T
=
\left\{
\mathbf X_a(T+\theta),
\mathbf V_a(T+\theta),
q_a
:
a\in A_\Omega,\,
-H_{\mathrm{hist}}\le\theta\le0
\right\}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-3a71609f8761a10f)

with any excluded contributions, endpoint conventions, and boundary crossings recorded explicitly. Here $\mathbf X_a$, $\mathbf V_a=d\mathbf X_a/dT$, and $q_a$ are position, velocity, and polarity; $A_\Omega$ is the finite index inventory needed by the window. The kinetic sum includes the members inside $\Omega$ at the evaluation time, and crossings change that sum through mechanical transport. The retained depth is $H_{\mathrm{hist}}$ throughout this chapter; it corresponds to $h$ in the Master Equation. A strict replay margin, when needed, is separate data rather than a second name for that depth.

A history-only delay energy is a construction target of the form
$$
E_{\mathrm{delay}}^{(\eta)}[X_T;\mathfrak{B},\Omega]
=
K_{\mu}^{(\eta)}(T)
+
E_{\text{wake},\mathfrak{B}}^{(\eta)}(T)
+
E_{\mathrm{sea},\Omega}^{(\eta)}(T)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-0b89f3a69cbb51f2)

where $K_{\mu}^{(\eta)}(T)=\sum_{a:\mathbf X_a(T)\in\Omega}\tfrac12\mu_{\text{arch}}\|\mathbf V_a(T)\|^2$ is the chosen quadratic kinetic bookkeeping proxy, $E_{\text{wake},\mathfrak{B}}^{(\eta)}$ is the causal-history interaction contribution, and $E_{\mathrm{sea},\Omega}^{(\eta)}$ is included only when retained Noether sea degrees of freedom are part of the window. The universal coefficient $\mu_{\text{arch}} > 0$ sets bookkeeping units and is not physical architrino mass. The Noether sea is the ambient assembly population; any reduced sea state not determined by $X_T$ is additional input to this functional. Its degrees of freedom must not also be counted in the explicit kinetic and wake sums. None of these terms is allowed to absorb an unreported boundary flux or unresolved reaction channel. This decomposition defines the desired input and accounting structure, not an established energy functional of the Master Equation.

Observer-level gravitational potential energy is therefore a comparison construct, not a fourth primitive term. When a Newtonian or general-relativistic benchmark writes a gravitational-potential term, this chapter must not carry that term into an $\mathbb{A}\mathbb{A}\mathbb{A}$ action as a primitive. Over a declared window it has to be reconstructed on the same branch chart from the existing packet: $K_{\mu}^{(\eta)}$, $E_{\text{wake},\mathfrak{B}}^{(\eta)}$, any retained $E_{\mathrm{sea},\Omega}^{(\eta)}$, and the boundary-flux row required by finite-window balance. Until that reconstruction is supplied, the gravitational potential remains an effective comparison label rather than an action-level energy.

## Accepted Construction Routes

The action-boundary route proposes an interaction charge, the work-integral route reconstructs an interaction entry along a supplied trajectory, and the boundary-flux route balances or reconstructs the total retained energy over a finite window. These are distinct constructions. Agreement requires a derivation on the same history, branch, regulator, and boundary convention; naming the routes does not establish a common conserved energy.

### Action-Boundary Route

An action is a scalar functional of paths; a time-translation boundary charge must follow from its complete variation, including the endpoints. The candidate in [Master Equation](../../../dynamics/master-equation.md#action-level-wake-energy-functional-at-a-time-boundary) uses the convention that the interaction enters the action with an outer factor $-1/2$. In the sharp, positive-separation form its kernel is
$$
\mathcal K_{ij}^{E}(T_1,T_t)
=\mu_{\text{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\Theta(T_1-T_t)\frac{\delta(\widetilde g_{ij})}{r_{ij}},
\qquad
\widetilde g_{ij}=T_1-T_t-\frac{r_{ij}}{c_f}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-d2cf70d4831f7c61)

Here $T_t$ is emission time, $T_1$ is reception time, $r_{ij}=\|\mathbf X_i(T_1)-\mathbf X_j(T_t)\|$, $\kappa > 0$ is the coupling, and $\sigma_{ij}=\operatorname{sgn}(q_iq_j)$ supplies the polarity sign. The causal step $\Theta$ excludes nonpositive delay, including the coincident self endpoint, and $\delta$ is the time-normalized delta distribution. The kernel has bookkeeping energy per time units. A regularized kernel $\mathcal K_{ij,\mathfrak B}^{E,\eta}$ must retain this normalization, the same branch selection, and any declared core convention. Since $\eta$ measures a distance gap, its corresponding width in $\widetilde g_{ij}$ is $\eta/c_f$; the two widths cannot be substituted without their change-of-variable normalization.

For a fully specified continued path record $\mathcal X$, the untruncated candidate is
$$
E_{\text{wake,act},\infty}^{(\eta)}[\mathcal X;T]
=
-\frac{1}{2}
\sum_{i,j}
\int_{-\infty}^{T}dT_t
\int_T^\infty dT_1\,
\partial_{T_1}
\mathcal{K}_{ij,\mathfrak{B}}^{E,\eta}(T_1,T_t)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-b18404360b9e9267)

when the integral exists. The branch convention here must be extended over the entire integration domain. The minus sign matches the owner kernel: when its future endpoint contribution vanishes, integrating $\partial_{T_1}\mathcal K^E$ gives $-\mathcal K^E(T,T_t)$, so the outer minus sign gives a positive static like-polarity pair contribution. This checks the candidate's convention; it does not prove that the action generates the Master Equation.

The expression requires past emissions and future receptions outside $X_T$. A finite-depth approximation makes that additional data explicit:
$$
E_{\text{wake,act},H_{\mathrm{hist}}}^{(\eta)}[\mathcal X;T]
=-\frac12\sum_{i,j}\int_{T-H_{\mathrm{hist}}}^{T}dT_t
\int_T^{T_t+H_{\mathrm{hist}}}dT_1\,
\partial_{T_1}\mathcal K_{ij,\mathfrak B}^{E,\eta}(T_1,T_t)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-3e12b755b7ba158c)

This restriction keeps crossing links with $0 < T_1-T_t\le H_{\mathrm{hist}}$. It requires a declared continuation on $[T,T+H_{\mathrm{hist}}]$ as well as the retained past. It is a truncated candidate boundary integral, not a derivation of the boundary charge of a truncated action. Define the omitted-tail entry, when the global candidate exists, by $\mathcal T_{E,H_{\mathrm{hist}}}^{(\eta)}(T)=E_{\text{wake,act},\infty}^{(\eta)}(T)-E_{\text{wake,act},H_{\mathrm{hist}}}^{(\eta)}(T)$. Its change over $W$ is the truncation residual. A balance using the truncated candidate must retain $-d\mathcal T_{E,H_{\mathrm{hist}}}^{(\eta)}/dT$ as a signed history-edge contribution, or retain the tail in the energy, exactly once. Differentiation or variation must also keep the moving cuts $T_t=T-H_{\mathrm{hist}}$, $T_1=T_t+H_{\mathrm{hist}}$, and the emission/reception boundary at $T$.

Neither the continuation nor a bound on the omitted tail is supplied by the segment $X_T$ alone. Reduction to the history-only target requires a unique admitted continuation or a proved cancellation of continuation dependence, together with a controlled tail estimate. If the global candidate does not exist, the finite expression remains a standalone diagnostic whose memory refinement needs its own proof. As [Effective Lagrangian](../../../dynamics/effective-lagrangian.md#symmetries-and-history-aware-conservation-laws) explains, complete action variation, including transmitter variation, admitted self-history, pair normalization, and endpoint terms, is still required before identifying any such candidate with an energy of the canonical acceleration law.

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

[View →](../../../../../../equation-mapping.html#corpus-equation-9fec1cfc2a8e2139)

Here $T_\ast$ is a reference time and $U_\ast$ a declared reference value. This route is trajectory-local. For a fixed member set satisfying $d\mathbf V_i/dT=\mathbf A_{i,\mathfrak B}^{(\eta)}$, the chain rule gives $dK_\mu/dT=\sum_i\mu_{\text{arch}}\mathbf A_{i,\mathfrak B}^{(\eta)}\cdot\mathbf V_i$, so $K_\mu+U_{\mathfrak B}$ is constant by construction. That identity is useful for replay, but supplies no independent conservation test, no path-independent interaction energy, and no action boundary charge. Declaring an action is insufficient; equivalence must be derived from that action or from an independent wake-balance construction.

#### Binary Branch Work Ledger

For a supplied two-body branch chart $b$, the work-integral route has a concrete first test. Let $\mathbf A_{i,b}^{(\eta)}(T)$ be the modeled acceleration contribution for member $i$, with the same retained history and regulator as the branch chart. At finite $\eta$, the acceleration is generally an integral over emission bands, not automatically a discrete root sum. The root-resolved formulas below apply only after a nonoverlapping partition of that integral has been supplied, including any complement outside the root bands. With the quadratic kinetic proxy, define the delivered branch power by
$$
P_{b,\mathrm{work}}^{(\eta)}(T)
=
\sum_{i=1}^{2}
\mu_{\text{arch}}\,
\mathbf A_{i,b}^{(\eta)}(T)
\cdot
\mathbf V_i(T)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-1d2aea80ef648845)

The same power must also be available before superposition. For each retained transmitter/root label $(i,j,T_t)$ on the branch chart, define the root-resolved delivered power
$$
P_{i\leftarrow j,T_t}^{(\eta)}(T)
=
\mu_{\text{arch}}\,
\mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)
\cdot
\mathbf V_i(T)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-87675bd20c2fe1a8)

so that
$$
P_{b,\mathrm{work}}^{(\eta)}(T)
=
\sum_i
\sum_j
\sum_{T_t\in\mathcal C_{ij,b}^{(\eta)}(T)}
P_{i\leftarrow j,T_t}^{(\eta)}(T)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-7d54e85f39a0ca25)

only if the root-labeled bands $\mathcal C_{ij,b}^{(\eta)}(T)$ exhaust the modeled integral; otherwise the complement power must be added explicitly. At finite width, $T_t$ labels a band around a reference root rather than an instantaneous sharp hit. A fold or overlapping support requires its own partition and event treatment. Each entry retains transmitter identity, polarity, emission time or band, the transmitter-side factor $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_j(T_t)$, the acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ in the sharp simple-root limit, inactive-domain coverage, and memory-edge contributions. Here $\hat{\mathbf r}_t$ points from emission to reception. Complete coverage and refinement require an independent root check; scalar summation alone establishes neither. The work-integral route then reconstructs the compatible causal-history interaction entry by
$$
U_{b,\mathrm{work}}^{(\eta)}(T)
=
U_b(T_\ast)
-
\int_{T_\ast}^{T}
P_{b,\mathrm{work}}^{(\eta)}(T')\,dT'
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-9e8999683a519427)

For a declared kinetic scalar $K(s)$ with speed $s=\|\mathbf V_i\|$, replace $\mu_{\text{arch}}$ by $\mu_K(s)=K'(s)/s$ inside every power sum, with a declared continuous extension at rest if the trajectory reaches $s=0$. This is the trajectory work reconstruction, not an independently constructed wake-energy entry. The existence and physical interpretation of a universal kinetic scalar remain the separate question stated in [Energy](../../../dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino).

On a circular benchmark where both members have constant speed $s_b$, the component toward the circle's center is orthogonal to the receiver velocity. Define $A_{i,b}^{\mathrm{tan}}=\mathbf A_{i,b}^{(\eta)}\cdot\hat{\mathbf V}_i$ as the tangential component for member $i$. The pair power is therefore
$$
\left\langle
P_{b,\mathrm{work}}^{(\eta)}
\right\rangle_{P_b}
=
\mu_{\text{arch}}\,s_b\,\sum_{i=1}^{2}
\left\langle
A_{i,b}^{\mathrm{tan}}
\right\rangle_{P_b}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-df0c816928641a89)

for the quadratic proxy, where $\langle f\rangle_{P_b}=P_b^{-1}\int_{T_0}^{T_0+P_b}f(T)\,dT$ averages over a declared orbital period $P_b$ starting at $T_0$. Equal per-member contributions give twice the single-member power. A nonzero work value on a prescribed circular history is a diagnostic, not by itself a conservation failure. A physical constant-speed circle additionally requires the complete tangential acceleration of each member to vanish pointwise. Boundary flux, recoil bookkeeping, or a constructed wake energy cannot supply a missing acceleration; any compensating interaction must enter the same motion law. Zero average power alone establishes neither existence nor stability.

### Boundary-Flux Route

This is a finite-window balance or reconstruction route. Let $E_\Omega^{(\eta)}=K_\mu^{(\eta)}+E_{\text{wake},\mathfrak B}^{(\eta)}+E_{\mathrm{sea},\Omega}^{(\eta)}$ be the total retained energy candidate in the declared decomposition. Independently identified transport belongs to boundary exchange; an unexplained remainder remains a residual. The balance target is
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

[View →](../../../../../../equation-mapping.html#corpus-equation-7b791109cb7df0be)

where $\hat{\mathbf n}$ is the outward unit normal and $\mathbf J_E^{(\eta)}$ is total energy flux per area per time. It includes mechanical transport by crossing architrinos or assemblies, interaction/wake transport, and declared medium exchange, without overlap. The external-control power $P_{\mathrm{ext},\Omega}^{(\eta)}$ is positive when added to the retained system and excludes transfers already counted in the flux. The rate residual $\mathcal R_{E,\Omega}^{(\eta)}$ has energy per time units and records what remains after those independently defined terms. The flux is bookkeeping for the retained causal-history record, not a new substrate field.

Use one outward-positive integrated flux and its inward-positive boundary-work equivalent:
$$
\Phi_{\partial\Omega,E}^{(\eta)}(W)
=\int_W\int_{\partial\Omega}\mathbf J_E^{(\eta)}\cdot\hat{\mathbf n}\,dA\,dT,
\qquad
W_{\partial\Omega}^{(\eta)}(W)=-\Phi_{\partial\Omega,E}^{(\eta)}(W),
\qquad
W_{\mathrm{ext},\Omega}^{(\eta)}(W)=\int_W P_{\mathrm{ext},\Omega}^{(\eta)}\,dT
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-2368c567c43735b7)

Here $W_{\partial\Omega}^{(\eta)}$ includes all boundary transport in $\mathbf J_E^{(\eta)}$ and excludes external-control work. An event ledger that lists exported channels separately must remove those channels from the aggregate outward flux before converting the remaining flux to boundary work. With $\Delta_W F=F(T_b)-F(T_a)$, integrating the balance gives $\Delta_W E_\Omega^{(\eta)}=W_{\mathrm{ext},\Omega}^{(\eta)}-\Phi_{\partial\Omega,E}^{(\eta)}+\int_W\mathcal R_{E,\Omega}^{(\eta)}\,dT$. A reconstructed total therefore needs an initial value, independently specified flux and external power, and an explicit residual. A wake component is determined only after kinetic and sea entries have also been specified; defining flux to cancel the energy change supplies no independent check.

## Crosswalk Residual

Two constructions can be compared only after their components and boundary conventions have been matched. First consider a fixed member set with no mechanical crossings, no external work, no retained sea-energy change, vanishing motion and history-edge defects, and the same quadratic kinetic proxy in both accounts. The work definition then gives $\Delta_W U_{\mathfrak B}=-\Delta_W K_\mu$, while the finite-window balance target gives $\Delta_W K_\mu+\Delta_W E_{\text{wake,act}}^{(\eta)}=-\Phi_{\partial\Omega,E}^{(\eta)}$. Subtraction yields the conditional comparison residual
$$
\Delta_{\mathrm{E,cross}}^{(\eta)}(W;\mathfrak{B})
=
\frac{
\left|
\Delta_W E_{\text{wake,act}}^{(\eta)}
-
\Delta_W U_{\mathfrak{B}}
+
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
E_{\mathrm{floor}}
}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-d5decd3fbd04c168)

Here $E_{\text{wake,act}}^{(\eta)}$ denotes the explicitly selected action candidate, with its continuation and tail convention when applicable; $E_{\mathrm{floor}} > 0$ is a fixed bookkeeping-energy scale preventing division by zero. For example, constant $K_\mu$ and outward flux $Q > 0$ require $\Delta_W E_{\text{wake,act}}=-Q$ and $\Delta_W U=0$, so the numerator vanishes only with the displayed plus sign. This is a derived sign check on the balance target, not evidence that the candidate obeys it.

When sea energy, controls, member crossings, or history-edge contributions are present, use the full balance below for each construction and compare the same independently defined entries. The simplified crosswalk does not apply unchanged: in particular, trajectory work excludes mechanical transport across $\partial\Omega$. Vanishing of the applicable crosswalk under the declared refinement is necessary for equivalence, but does not by itself construct a conserved charge.

## Conservation Residual

Choose a typed acceleration residual
$$
\mathbf R_i^{A,(\eta)}(T)
=\frac{d\mathbf V_i}{dT}-\mathbf A_{i,\mathrm{model}}^{(\eta)}(T),
\qquad
P_R^{(\eta)}(T)=\sum_{i:\mathbf X_i(T)\in\Omega}\mu_{\text{arch}}\mathbf V_i\cdot\mathbf R_i^{A,(\eta)}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-d74d654addbba1e3)

The modeled acceleration includes the declared delayed interactions and any explicit controls; their external work is recorded separately in $P_{\mathrm{ext},\Omega}^{(\eta)}$. The residual has acceleration units, and $P_R^{(\eta)}$ has bookkeeping energy per time units. Its sign follows from actual acceleration minus modeled acceleration: the chain rule gives the actual kinetic power as modeled kinetic power plus $P_R^{(\eta)}$. For a general kinetic scalar use $\mu_K(\|\mathbf V_i\|)$ in place of $\mu_{\text{arch}}$. An Euler residual, the interior coefficient in an action variation, is a different object; it cannot be substituted without a derived conversion to this power.

Let $\mathcal B_E^{(\eta)}$ be the signed power contributed by declared history endpoints, omitted history tails, period cuts, and excluded self-coincidence boundaries. Its sign is positive when it adds to the retained-energy rate. Spatial transport and external-control work are excluded because they already have separate entries. Missing root coverage must be bounded explicitly and cannot be fitted as an endpoint correction. For a construction with an independently established residual identity, the target rate decomposition is $\mathcal R_{E,\Omega}^{(\eta)}=P_R^{(\eta)}+\mathcal B_E^{(\eta)}$; any remaining discrepancy is measured by the integrated conservation residual
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
P_R^{(\eta)}\,dT
-
\int_W
\mathcal{B}_E^{(\eta)}\,dT
-
W_{\partial\Omega}^{(\eta)}
-
W_{\mathrm{ext},\Omega}^{(\eta)}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-8a842cfc126e9669)

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
\left|W_{\mathrm{ext},\Omega}^{(\eta)}\right|
+\int_W\left|P_R^{(\eta)}\right|\,dT
+\int_W\left|\mathcal B_E^{(\eta)}\right|\,dT
+E_{\mathrm{floor}}
}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-9940d732ab394ab3)

All integrated entries above refer to $W$. Thus $\mathcal R_E^{(\eta)}$ has energy units, whereas the earlier $\mathcal R_{E,\Omega}^{(\eta)}$ has power units; the former equals $\int_W(\mathcal R_{E,\Omega}^{(\eta)}-P_R^{(\eta)}-\mathcal B_E^{(\eta)})\,dT$. The normalization uses the same fixed $E_{\mathrm{floor}}$ across refinements and is dimensionless.

An isolated conservation claim requires vanishing external work and net boundary exchange, a solved motion law, vanishing history-edge power or compensating tail/endpoint energy included in the conserved total, and $\epsilon_E^{(\eta)}\to0$ with the applicable crosswalk. Merely recording a nonzero history-edge power on the right-hand side does not make the retained total constant. Even these numerical conditions do not replace an independent energy construction and its limiting argument. Increasing memory depth, resolving the retained history more finely, shrinking $\eta$, and removing $\epsilon_c$ are distinct limits; the last two require separate control of causal folds and coincidence, respectively.

## No-Double-Counting Rule

The interaction contribution may be carried by $E_{\mathrm{wake}}$, by an equivalent work-integral reconstruction, or by an explicitly retained near-field decomposition, but not by all of them at once. If a pairwise $U_{\mathrm{int}}$ term is used inside an assembly, the wake-energy term must omit the same near-field content. If a Noether sea update is retained inside $E_{\mathrm{sea},\Omega}$, it must not also appear as an outgoing event-ledger channel. The same rule is used by [Emergence](../../../foundations/emergence-of-structure.md#context-changes-and-energy-ledger) and [Energy](../../../dynamics/energy.md#energy-conservation-and-exchange).

## Promotion and Failure Conditions

A delay-energy construction is promotable only when the branch chart names:

1. the retained history depth $H_{\mathrm{hist}}$, any continuation required by the selected route, and an explicit memory-tail residual;
2. the causal-wake-surface regularization $\eta$ and any core cutoff $\epsilon_c$, with separate convergence statements;
3. active causal roots, inactive-root gaps, the active transmitter-side Jacobian floor, and the retained transmitter-side acceleration-weight floor or certified interval $\nu_{\mathrm{rec}}$ for $W^{\mathrm{acc}}$;
4. the exact route used for $E_{\text{wake}}$;
5. boundary flux, endpoint leakage, period-cut terms, and excluded self-coincidence rows;
6. the crosswalk residual whenever more than one energy construction is invoked;
7. for a no-runaway claim, a lower bound on the combined nonkinetic contribution and a kinetic scalar that grows without bound with speed, together with the continuation and boundary controls needed to apply that bound.

Conservation is not established if it is recovered only by changing the energy definition per observable, silently discarding endpoint leakage, using a different regulator from the acceleration law, or losing the required causal-root floors. A lower-bound argument against runaway speed additionally fails if the combined nonkinetic contribution is unbounded below or the kinetic scalar does not control speed. A conserved quantity without those bounds would not by itself prove stability or exclude runaway motion. No common energy construction, complete root certificate, branch selection, lower bound, regulator limit, or physical energy recovery is established by the definitions in this chapter.

## Downstream Use

This chapter is the shared energy standard for [Master Equation](../../../dynamics/master-equation.md), [Effective Lagrangian](../../../dynamics/effective-lagrangian.md), [Energy](../../../dynamics/energy.md), [Binary Dynamics](../../../dynamics/binary-dynamics.md), and event-ledger uses in [Emergence](../../../foundations/emergence-of-structure.md). The [two-body binary closure packet](../../../dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target) must report $\epsilon_E^{(\eta)}(W;\mathfrak{B})$, $\Delta_{\mathrm{E,cross}}^{(\eta)}(W;\mathfrak{B})$, and the lower-bound entry on the same branch chart as its motion, branch-floor, stability, and frequency residuals. Existence and stability are not enough unless the accepted branch also carries a constructive energy ledger.
