# Transfer-Operator and Basin-Measure Theorem Packet

This packet defines the shared measure-theoretic grammar consumed by [Quantum Closure](../priorities.md), [Agency, Decision, and Decider Closure](agency-decision-and-decider.md), [Algorithmic Resonance and Pilot-Wave Closure](../brainstorming.md), doubling-frequency-lock, and Photon, Measurement, and Bell Gates.

## State Space And Coarse-Graining

Fix a finite causal-wake regularization width $\eta > 0$, a history horizon $h>0$, and a record or return time window $0<\tau_{\text{rec}}\le T_{\text{meta}}$. The history object retained before coarse-graining is
$$
\mathcal{H}_{\eta,h}(t)
=
\left\{
S_\eta(t+\theta),
\mathcal{L}_{\mathrm{root}}(t+\theta),
\Pi_{\mathbb{U}_{\text{now}}}(t+\theta)
:
-h\le \theta\le0
\right\},
$$
where $S_\eta$ is the regularized assembly state history, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, and $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log.

The coarse state space is the measurable product
$$
\Gamma
=
\Gamma_{\mathrm{asm}}
\times
\Gamma_{\mathrm{wake}}
\times
\Gamma_{\mathrm{sea}}
\times
\Gamma_{\mathrm{reg}}
\times
U,
\qquad
\gamma=(x,\ell,w,z,u)\in\Gamma.
$$

The factor $\Gamma_{\mathrm{asm}}$ retains assembly variables such as reduced positions, velocities, phase coordinates, resonance-band labels, and action or angular-momentum ledger coordinates. The factor $\Gamma_{\mathrm{wake}}$ retains causal-wake history through active root branches, self-hit status, transmitter-side Jacobian floors, $W_{\mathrm{acc}}=c_f/|D_t|$ contribution bounds, separate signed playback $D_r/D_t$, and path-history summaries. The factor $\Gamma_{\mathrm{sea}}$ retains Noether sea context, including $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, local stress or compliance summaries, and unresolved causal-wake background variables. The factor $\Gamma_{\mathrm{reg}}$ retains apparatus, detector, register, pointer, record-window, and readout variables. The factor $U$ retains controlled bias variables such as Decider settings, analyzer settings, gate-control settings, or doubling-frequency tuning parameters.

The coarse-graining map is
$$
C_{\eta,h}
:
\left(\mathbb{U}_{\text{now}}(t),\mathcal{H}_{\eta,h}(t)\right)
\longrightarrow
\Gamma,
\qquad
\gamma(t)=C_{\eta,h}\!\left(\mathbb{U}_{\text{now}}(t),\mathcal{H}_{\eta,h}(t)\right).
$$

The admissibility condition for a consumer statistic $O$ is that two full histories with the same coarse state remain indistinguishable at the requested tolerance until the record or return window closes:
$$
C_{\eta,h}(\omega_1)=C_{\eta,h}(\omega_2)
\Longrightarrow
\sup_{0\le s\le\tau_{\text{rec}}}
d_O\!\left(
O(\Phi_s\omega_1),
O(\Phi_s\omega_2)
\right)
\le
\varepsilon_C.
$$
If this condition fails, the consumer must refine $\Gamma$ before computing outcome weights.

### Master-Equation Handoff Boundary

When a quantum consumer imports a certified master-equation branch chart, the allowed input is the retained branch data needed to define $\Gamma_{\mathrm{wake}}$, $C_{\eta,h}$, and the finite-$\eta$ evolution map. In particular, $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ may supply active root branches, inactive-root gaps, the Jacobian floor, the certified memory depth, returned-section residuals, and the section-stability margin.

This handoff does not supply the measure-theoretic objects of the quantum packet. The invariant or metastable measure $\mu_*$, the basin partition $\mathcal{P}=\{B_i\}$, the record windows $W_i$, detector kernels, and Born-rule recovery target remain downstream quantum objects. If a claimed weight changes when the upstream branch chart is refined at fixed recorded setup, the defect is a transfer-operator handoff failure rather than a new probability rule.

## Transfer Operator Interpretation

The common transfer-operator form is:

$$
\mathcal{T}_{\Delta t}\rho(\Gamma)
=
\int
K_{\Delta t}(\Gamma\mid \Gamma',\mathcal{H},\mathcal{W}_{\text{sea}})
\rho(\Gamma')\,d\Gamma'.
$$

This packet uses deterministic pushforward as the base interpretation. For fixed $\eta>0$, fixed external protocol $u(t)$, and fixed retained context $(\mathcal{H},\mathcal{W}_{\text{sea}})$, let
$$
\Phi_{\Delta t}^{u,\mathcal{H},\mathcal{W}_{\text{sea}}}:\Gamma\to\Gamma
$$
be the finite-time coarse evolution induced by the regularized delayed dynamics and the coarse-graining map. Then
$$
K_{\Delta t}(\gamma\mid\gamma',\mathcal{H},\mathcal{W}_{\text{sea}})
=
\delta_{\Phi_{\Delta t}^{u,\mathcal{H},\mathcal{W}_{\text{sea}}}(\gamma')}(\gamma),
\qquad
\mathcal{T}_{\Delta t}\rho
=
\Phi_{\Delta t*}^{u,\mathcal{H},\mathcal{W}_{\text{sea}}}\rho.
$$

A finite-time Markov kernel is allowed only as a reduced representation after unresolved apparatus or Noether sea variables $\zeta$ have been assigned an explicit occupation measure $d\nu(\zeta)$. For every measurable set $A\subseteq\bar\Gamma$, the reduced kernel is
$$
K_{\Delta t}^{\mathrm{red}}(A\mid\bar\gamma')
=
\int
\mathbf{1}_{A}\!\left(\bar C(\Phi_{\Delta t}(\gamma',\zeta))\right)
\,d\nu(\zeta).
$$
The kernel is invalid if $d\nu$ is chosen to reproduce the target observer-level law rather than derived from the material return map, record cycle, or Noether sea context.

A reduced return-map operator is the section version of the same deterministic pushforward. If $\Sigma_{\mathrm{return}}\subset\Gamma$ is a measurable return section and $\tau_\Sigma(\gamma)$ is the first return time, then
$$
R(\gamma)=\Phi_{\tau_\Sigma(\gamma)}(\gamma),
\qquad
\mathcal{R}\rho=R_*\rho.
$$
Doubling-frequency locks, analyzer material cycles, Stern-Gerlach-like record cycles, and register gate cycles may use $\mathcal{R}$ only after the section, return time, and excluded failure boundary are explicit.

## Measures And Basin Partitions

The measure space is $(\Gamma,\mathcal{B}_\Gamma,\mu_*)$, where $\mathcal{B}_\Gamma$ is the sigma algebra generated by the retained coarse variables and $\mu_*$ is the relevant preparation, return-section, or unresolved-material occupation measure.

Entropy-source alignment 2026-06-22. The current entropy chapter fixes the source reading of any finite-window measure used here: before invariant or metastable reduction, the measure is the pushforward of preparation-limited unresolved history through the deterministic delayed flow and then through the retained coarse-graining,
$$
\nu_{\mathcal Q,W,t}
=
(\Pi_{\mathcal Q,W})_*
(\mathcal F_{t_0\to t})_*
\nu_{\mathrm{prep}}.
$$
For this packet, $\mu_*$ may be an invariant, metastable, return-section, or finite-window reduction of that pushed-forward measure, but it must not be a separate ensemble chosen to reproduce the Born weights. This is a strengthening of the existing measure-source discipline, not a status change for `transfer_operator` or `invariant_measure`.

An invariant measure satisfies
$$
\mathcal{T}_{\Delta t}^*\mu_*=\mu_*
$$
for the time step or return map used by the consumer. A metastable measure on $[0,T_{\text{meta}}]$ satisfies
$$
\left\|\mathcal{T}_t^*\mu_*-\mu_*\right\|_{\mathcal{A}}
\le
\varepsilon_{\text{meta}},
\qquad
0\le t\le T_{\text{meta}},
$$
for a declared test algebra $\mathcal{A}\subset\mathcal{B}_\Gamma$ that contains the outcome basins.

Outcome windows are measurable register sets $W_i\subset\Gamma_{\mathrm{reg}}$. The basin associated with outcome $i$ is the pullback
$$
B_i
=
\left\{
\gamma\in\Gamma:
\pi_{\mathrm{reg}}\!\left(\Phi_{\tau_{\text{rec}}}(\gamma)\right)\in W_i
\ \text{and}\
\Phi_s(\gamma)\in\Gamma_{\mathrm{adm}}\ \text{for}\ 0\le s\le\tau_{\text{rec}}
\right\}.
$$

The basin partition is
$$
\mathcal{P}=\{B_i\}_{i\in I},
\qquad
p_i=\mu_*(B_i).
$$

The separatrix between two outcomes is
$$
\Sigma_{ij}
=
\partial B_i\cap\partial B_j,
\qquad
\Sigma_{\mathcal{P}}
=
\bigcup_{i\ne j}\Sigma_{ij}.
$$
The measurable-partition condition is
$$
B_i\in\mathcal{B}_\Gamma,
\qquad
\mu_*(\Sigma_{\mathcal{P}})=0,
\qquad
\mu_*\!\left(\Gamma\setminus\bigcup_i B_i\right)\le\varepsilon_{\text{esc}}.
$$

The basin-stability condition for a return map is
$$
\mu_*\!\left(R^{-1}B_i\triangle B_i\right)
\le
\varepsilon_{\text{leak},i},
$$
where $\triangle$ denotes symmetric difference. A true invariant basin has $\varepsilon_{\text{leak},i}=0$; a metastable basin must declare the finite window and leakage tolerance.

### Finite-Window Reachability

The basin packet deliberately proves finite-window record claims, not a global promise that every future reachability question is decidable. A stronger unbounded question would fix a computable encoding $\gamma_{M,w}\in\Gamma$ of a formal machine/input pair and an open target set $O\subset\Gamma$, then ask whether
$$
\exists t\ge 0:\Phi_t(\gamma_{M,w})\in O
\quad\Longleftrightarrow\quad
M(w)\ \text{halts}.
$$
If such an embedding exists for a retained dynamical chart, the resulting reachability problem inherits the halting obstruction. That comparison is useful as a limit on prediction, but it is not an extra ontology and not a requirement for ordinary measurement closure.

The validation-side object remains the bounded basin over a declared record window:
$$
B_O^T
=
\left\{
\gamma\in\Gamma_{\mathrm{adm}}:
\exists t\in[0,T]\ \text{with}\ \Phi_t(\gamma)\in O,
\quad
\Phi_s(\gamma)\in\Gamma_{\mathrm{adm}}\ \text{for}\ 0\le s\le T
\right\}.
$$
A promoted quantum or detector claim must state which object it has controlled: finite-window basin membership, a metastable basin measure, a return-map invariant, or an explicitly separate unbounded reachability theorem. Born-rule, detector-response, and record-autonomy claims use the first three objects unless a later proof supplies the fourth.

### Eligible Record Basins

The Born-rule packet should normalize only over basins that become completed records in the declared channel. For a setup $\theta=(\mathcal{K}_A,\mathcal{Q},W,T)$ and candidate outcome event $\mathsf e_i$, use the record indicator
$$
\mathbf{1}_{\mathrm{rec}}(i;\theta)
=
\mathbf{1}\!\left[
B_i\in\mathcal{B}_\Gamma,\quad
\mu_*(\Sigma_{\mathcal{P}})=0,\quad
\tau_{\text{meas}}(B_i)<\infty,\quad
\Delta_{\mathrm{rec}}(i;\theta)\le\varepsilon_{\mathrm{rec}},\quad
\Delta_{\mathrm{div}}(i;\theta)\le\varepsilon_{\mathrm{div}},
\right.
$$
$$
\left.
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}(i)\ge S_{\mathrm{lock}},\quad
\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e_i)\|\le\varepsilon_{\mathrm{evt}},\quad
|\Delta E_{\mathrm{unrec}}(T;\theta,i)|\le\varepsilon_E
\right].
$$
The compressed probability used by a detector or measurement consumer is then
$$
p_i^\theta
=
\frac{\mu_*(B_i)\mathbf{1}_{\mathrm{rec}}(i;\theta)}
{\sum_j\mu_*(B_j)\mathbf{1}_{\mathrm{rec}}(j;\theta)}.
$$
Here $\Delta_{\mathrm{rec}}(i;\theta)$ and $\Delta_{\mathrm{div}}(i;\theta)$ denote the corresponding windowed suprema from the declared measurement channel. This is the theorem-packet version of the measurement rule: a branch weight becomes an outcome probability only after the same finite-time flow has produced a record, passed the restartability and entropy-locking checks, and closed the conservation and energy ledgers. If the denominator vanishes, the proposed setup has no completed measurement channel on that window.

The Born-rule recovery target is the special case in which the effective observer envelope $\psi_{\mathrm{eff}}$ exists and the basin measure agrees with the squared effective amplitude:
$$
\mu_*(B_i)
=
\int_{O_i}
|\psi_{\mathrm{eff}}|^2\,d\Gamma_{\mathrm{eff}}.
$$
This equation is a closure condition on $\mu_*$ and $C_{\eta,h}$, not an axiom used to define either object.

### Credence-Only Failure Mode

Self-location, betting, or decision-theory arguments may be useful as observer-level inference stories, but they do not close the Born-rule theorem packet by themselves. Let $q_i(\mathcal{I})$ be the weight assigned by an inference rule $\mathcal{I}$ after seeing the same preparation class, apparatus channel, and record family. The rule is physically admissible for this packet only if it tracks the record-basin probability already derived from the transfer operator:
$$
\Delta_{\mathrm{cred}}(\mathcal{I};\theta)
=
\sum_i
\left|
q_i(\mathcal{I})
-
\frac{\mu_*(B_i)\mathbf{1}_{\mathrm{rec}}(i;\theta)}
{\sum_j\mu_*(B_j)\mathbf{1}_{\mathrm{rec}}(j;\theta)}
\right|
\le
\varepsilon_{\mathrm{cred}}.
$$
If $\Delta_{\mathrm{cred}}=O(1)$, the rule has supplied a rationality or labeling convention rather than an outcome measure. The falsifier is simple: two rules can recommend different credences for the same self-location narrative while the apparatus frequencies remain fixed. Only the transfer-operator basin measure can own the physical probability target; inference rules are consumers of that measure, not substitutes for it.

## Sector Adapters

A detector-response kernel for setting $d$ is the basin indicator averaged over unresolved detector variables:
$$
K_i^{(d)}(\gamma_{\mathrm{prep}})
=
\int_{\Theta_d}
\mathbf{1}_{B_i^{(d)}}\!\left(
C_d(\gamma_{\mathrm{prep}},\zeta)
\right)
\,d\nu_d(\zeta).
$$
The detector packet owns $\Theta_d$, $d\nu_d$, and $B_i^{(d)}$; this packet requires that $K_i^{(d)}$ be a derived basin pullback rather than an assumed $\cos^2(\alpha/2)$, $\cos^2\theta$, or target Born-law kernel.

A Decider bias state $u$ is a controlled parameter in the operator, partition, or both:
$$
\mathcal{T}_{\Delta t}^u,\qquad
\mathcal{P}_u=\{B_i(u)\},
\qquad
\mu_*^u.
$$
The measurable Decider effect is
$$
\Delta p_i(u_0\to u_1)
=
\mu_*^{u_1}\!\left(B_i(u_1)\right)
-
\mu_*^{u_0}\!\left(B_i(u_0)\right).
$$
If $\Delta p_i=0$ for every $i$, the update $u_0\to u_1$ has shifted labels, coordinates, or narratives but has not changed outcome weights.

For agency and Switch consumers, the comparison must also declare the fixed boundary context $c_\Omega$ held across the bias update. A change in incoming causal-wake class, Noether sea context, or unresolved boundary history is an external protocol change, not an internal decision effect. The cost and hold-time ledgers remain consumer-side obligations: $\Delta p_i$ is not a valid Decider claim unless the update $u_0\to u_1$ has a recorded work or dissipation transaction and the prepared state survives through the perturbation and record window.

A pilot-wave-like guidance reduction is a conditional mean of the same coarse dynamics:
$$
a^2(\bar x)
=
\frac{d(\pi_{\bar X*}\mu_*)}{d\bar x},
\qquad
\mathbf{V}_{\mathrm{eff}}(\bar x)
=
\int
\dot{\bar X}(\gamma)
\,d\mu_*(\gamma\mid \bar X=\bar x).
$$
The density $a^2$ is the projected basin or occupation density, and $\mathbf{V}_{\mathrm{eff}}$ is the effective guidance field induced by assembly and causal-wake dynamics. The reduction fails if it requires an independent configuration-space pilot field not obtained from $C_{\eta,h}$ and $\mu_*$.

An algorithmic-resonance coherence-depth bound is a survival measure on a register-coherent set $B_{\mathrm{coh}}\subset\Gamma$ under a sequence of controlled return maps $R_{g_1},\dots,R_{g_D}$:
$$
C_D
=
\mu_*\!\left(
\bigcap_{n=0}^{D}
(R_{g_n}\circ\cdots\circ R_{g_1})^{-1}
B_{\mathrm{coh}}
\right),
$$
with $R_{g_0}$ the identity. The maximum controlled depth at tolerance $\varepsilon$ is
$$
D_{\max}(\varepsilon)
=
\sup
\left\{
D:
C_D\ge1-\varepsilon
\ \text{and}\
\sum_{n=1}^{D}\varepsilon_{\text{leak},n}
+\varepsilon_{\text{meta}}(D)
\le\varepsilon
\right\}.
$$
Period-extraction claims must report $D_{\max}$ or an equivalent coherence-depth bound before they are treated as quantitative.

## Basin-Measure Necessity Lemma

**Lemma (basin-measure necessity).** Let $\mathcal{T}_{\Delta t}$ be the deterministic pushforward or its declared return-map reduction on $(\Gamma,\mathcal{B}_\Gamma)$. Let $\mu_*$ be invariant or metastable on the record window, and let $\mathcal{P}=\{B_i\}$ be a measurable basin partition with $\mu_*(\Sigma_{\mathcal{P}})=0$ and declared leakage bounds. Then every observer-level outcome weight induced by the coarse dynamics is
$$
p_i=\int_\Gamma \mathbf{1}_{B_i}(\gamma)\,d\mu_*(\gamma)=\mu_*(B_i),
$$
up to the declared metastability, leakage, escape, and coarse-graining errors.

The metastable error bound is
$$
\left|
\mathcal{T}_{\tau_{\text{rec}}}^*\mu_*(B_i)-\mu_*(B_i)
\right|
\le
\varepsilon_{\text{meta}}
+\varepsilon_{\text{leak},i}
+\varepsilon_{\text{esc}}
+\varepsilon_C.
$$

Proof route: the record map sends each initial coarse state outside the separatrix-null set into exactly one basin; therefore the outcome indicator is $\mathbf{1}_{B_i}$. Invariance makes the integral of this indicator independent of the chosen return slice, and metastability bounds the finite-window drift. Any assigned weight $w_i\ne\mu_*(B_i)$ introduces a different measure, an untracked kernel, a nonmeasurable partition, or an external interpretive rule.

## Worked Abstract Case: Doubling-frequency Reduced-Map Normal Form

Let $s=\sigma(\gamma)\in[0,1]$ be a scalar coordinate on a doubling-frequency phase-amplitude return section, with $s=0$ denoting the candidate doubling-frequency-lock attractor and $s=1$ denoting an alternate returned branch. Let $u\in U$ be a controlled bias or tuning parameter that moves the separatrix through a smooth function $b(u)\in(0,1)$.

The abstract reduced return map is
$$
s_{n+1}
=
f_u(s_n)
=
s_n+\lambda s_n(1-s_n)(s_n-b(u)),
\qquad
0<\lambda\le1.
$$

The fixed points are
$$
s_0=0,
\qquad
s_\Sigma=b(u),
\qquad
s_1=1,
$$
with derivatives
$$
f_u'(0)=1-\lambda b(u),
\qquad
f_u'(1)=1-\lambda(1-b(u)),
\qquad
f_u'(b(u))=1+\lambda b(u)(1-b(u)).
$$
Thus $s_0$ and $s_1$ are attracting when $0<\lambda b(u)<2$ and $0<\lambda(1-b(u))<2$, while $s_\Sigma$ is an unstable basin boundary.

The basin partition is
$$
B_{\mathrm{lock}}(u)=[0,b(u)),
\qquad
B_{\mathrm{alt}}(u)=(b(u),1],
\qquad
\Sigma_u=\{b(u)\}.
$$

Let $q_u(s)\,ds$ be the metastable record-input measure on the return section before final basin resolution. The post-resolution invariant measure is the basin pushforward
$$
\lim_{n\to\infty} f_{u*}^{\,n}\!\left(q_u(s)\,ds\right)
=
p_{\mathrm{lock}}(u)\,\delta_0
+p_{\mathrm{alt}}(u)\,\delta_1,
$$
where
$$
p_{\mathrm{lock}}(u)
=
\int_0^{b(u)}q_u(s)\,ds,
\qquad
p_{\mathrm{alt}}(u)
=
\int_{b(u)}^1q_u(s)\,ds.
$$

The weight shift under a controlled bias update is
$$
\Delta p_{\mathrm{lock}}(u_0\to u_1)
=
\int_0^{b(u_1)}q_{u_1}(s)\,ds
-
\int_0^{b(u_0)}q_{u_0}(s)\,ds.
$$
If $q_u=q$ is unchanged and only the basin boundary moves, then
$$
\frac{d p_{\mathrm{lock}}}{du}
=
q(b(u))\,b'(u).
$$
If $b'(u)=0$ and $q_u=q$ for the tested update, the bias has no basin-measure effect.

This normal form does not prove the doubling-frequency lock; it states the minimum basin-measure structure that the doubling-frequency reduced phase-amplitude packet must instantiate with its actual finite-$\eta$ return map, Jacobian eigenvalues, branch ledger, and stability gap.

## Required Contract

| Field | Required content |
| --- | --- |
| State space | Declare $\Gamma=\Gamma_{\mathrm{asm}}\times\Gamma_{\mathrm{wake}}\times\Gamma_{\mathrm{sea}}\times\Gamma_{\mathrm{reg}}\times U$ or a justified refinement. |
| Coarse-graining | Declare $C_{\eta,h}$, the retained history variables, and the consumer statistic $O$ whose error is bounded by $\varepsilon_C$. |
| Master-equation input | If used, consume $\mathfrak{B}$ only as certified causal-wake branch data for $\Gamma_{\mathrm{wake}}$ and the finite-$\eta$ flow or return map. |
| Transfer operator | Declare deterministic pushforward, reduced Markov kernel, or return-map operator; this packet uses deterministic pushforward as the base interpretation. |
| Kernel | If a kernel is reduced, derive the unresolved-variable measure $d\nu$ from material, apparatus, or Noether sea dynamics. |
| Basin partition | Define $\mathcal{P}=\{B_i\}$ as pullbacks of outcome windows, and define separatrices $\Sigma_{ij}$. |
| Measure | Identify $\mu_*$ as invariant, metastable, or finite-window controlled, with its domain and tolerance. |
| Observable weights | Compute $p_i=\mu_*(B_i)$ or the derived detector, register, decision, or coherence-depth statistic. |
| Failure condition | State which hypothesis fails when weights are assigned interpretively, when the measure drifts, or when the operator hides an external ontology. |

## Consumer Map

| Consumer packet | Local responsibility | Shared theorem burden consumed here |
| --- | --- | --- |
| [priorities.md](../priorities.md) | Born-rule closure, detector kernels, pair provenance, Bell gate, and quantum rewrite handoff. | Owns the parent queue; consumes this packet for `transfer_operator` and `invariant_measure`. |
| [agency-decision-and-decider.md](agency-decision-and-decider.md) | Minimal bias-setting complex, work ledger, hold time, and measurable basin-weight shifts. | Uses this packet to treat agency as controlled movement of basin boundaries or measures under a shared $\mu_*$. |
| [algorithmic-resonance-and-pilot-wave.md](../brainstorming.md) | Pilot-wave-like guidance, basin amplitude, feedback terms, and register coherence-depth bounds. | Uses this packet to avoid a second pilot-wave ontology and to make algorithmic resonance a quantitative stress test. |
| doubling-frequency-lock | Finite-$\eta$ reduced phase-amplitude map and stable `1:2` / `1:2:4` fixed-point diagnostics. | Provides a concrete reduced-map laboratory for transfer-operator stability, invariant or metastable measures, and basin gaps. |
| photon-measurement-bell-gates.md | Stern-Gerlach-like response, photon analyzer kernels, record-window quotients, and Bell placement. | Uses this packet for invariant analyzer measures, detector kernels, and basin-weight calculations after angular-momentum prerequisites exist. |

## Promotion Gate

The theorem can promote into [quantum-summary](../../../../content/markdown/aaa/quantum/quantum-summary.md), [measurement-ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md), [superposition-mechanism](../../../../content/markdown/aaa/philosophy-history/theory-bridges/superposition-mechanism.md), [pilot-wave-character](../../../../content/markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md), or [algorithmic-resonance](../../../../content/markdown/aaa/quantum/algorithmic-resonance.md) only after at least one worked case reports:

1. a state space and coarse-graining;
2. a transfer operator or return map;
3. a basin partition;
4. an invariant, metastable, or finite-time measure;
5. computed outcome weights or a computable bound;
6. a failure diagnostic.

## Concrete Falsifiers

- No invariant or metastable measure: no $\mu_*$ satisfies $\mathcal{T}_{\Delta t}^*\mu_*=\mu_*$ or the declared metastability bound on the record window.
- Nonmeasurable basin partition: some $B_i\notin\mathcal{B}_\Gamma$, or $\mu_*(\Sigma_{\mathcal{P}})>0$ without a separate boundary-resolution rule.
- Assumed detector law: a detector kernel contains $\cos^2(\alpha/2)$, $\cos^2\theta$, or $|\psi|^2$ as an input law rather than as the value of a basin integral.
- Interpretive Born weights: $p_i$ is assigned without computing $\mu_*(B_i)$ or an explicitly equivalent pushforward integral.
- Decider label shift without weight shift: $u_0\to u_1$ changes names, registers, or thresholds while $\Delta p_i=0$ for every outcome.
- Doubling-frequency instability: the candidate doubling-frequency return map has $\mu_*(R^{-1}B_{\mathrm{lock}}\triangle B_{\mathrm{lock}})$ above tolerance, lacks a non-symmetry stability gap, or has an attracting claim with spectral radius $\ge1$ after quotienting neutral symmetries.
- Second pilot ontology: the guidance law requires an independent $\Psi_{\mathrm{pilot}}$ not constructed from assembly variables, causal-wake history, Noether sea context, and $\mu_*$.
- Algorithmic-resonance overclaim: period extraction is asserted while $D_{\max}(\varepsilon)$ or an equivalent coherence-depth bound is absent or below the claimed operation depth.
- No-signaling failure: for spacelike-separated detector settings $\alpha,\beta$ before causal-wake contact,
  $$
  \sum_b P(a,b\mid\alpha,\beta)
  \ne
  P(a\mid\alpha)
  $$
  or the analogous marginal depends on the distant setting.
- Hidden causal transfer: the operator depends on a distant setting, energy transfer, or causal-wake update not present in $\mathcal{H}$ or $\mathcal{W}_{\text{sea}}$ inside the allowed causal window.

## Related Priorities

- [mapping-quantum](../priorities.md)
- [agency-decision-and-decider](agency-decision-and-decider.md)
- [algorithmic-resonance-and-pilot-wave](../brainstorming.md)
- doubling-frequency-lock
- angular-momentum-spin
- [simulation protocol routing index](../../../op/simulation-protocol-routing-index.md)
- [validation-gates](../../dormant-deferred/validation-gates/priorities.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [quantum-summary](../../../../content/markdown/aaa/quantum/quantum-summary.md)
- [measurement-ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md)
- [superposition-mechanism](../../../../content/markdown/aaa/philosophy-history/theory-bridges/superposition-mechanism.md)
- [reality-quantum-causality](../../../../content/markdown/aaa/quantum/reality-quantum-causality.md)
- [wavefunction-ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md)
- [algorithmic-resonance](../../../../content/markdown/aaa/quantum/algorithmic-resonance.md)
- [pilot-wave-character](../../../../content/markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md)
- [Noether Braid Doubling-Frequency Resonance Lock](../../../../content/markdown/aaa/noether-braid/three-binary-4-2-1-frequency-lock.md)
- [bell-theorem](../../../../content/markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md)
