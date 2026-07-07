# Wavefunction Ontology

This chapter states what the wavefunction is and is not within the framework. Its purpose is to relocate $\psi$ from fundamental ontic field status to an effective epistemic description while still explaining why standard quantum formalism remains operationally useful.

Its nearest companion notes are [Superposition Mechanism](../philosophy-history/theory-bridges/superposition-mechanism.md), [Measurement Ontology](measurement-ontology.md), [Measurement Problem and Collapse](../philosophy-history/theory-bridges/measurement-problem-and-collapse.md), [Entanglement and Nonlocality](../philosophy-history/theory-bridges/entanglement-nonlocality.md), and [Pilot-Wave Character](../philosophy-history/theory-bridges/pilot-wave-character.md).

## Purpose and Scope

This document establishes the ontological status of the quantum wavefunction ($\psi$) and the fundamental operators of quantum mechanics within $\mathbb{A}\mathbb{A}\mathbb{A}$. It maps the standard quantum formalism, traditionally treated as axiomatic, to deterministic, non-Markovian dynamics governed by the master equation.

The framework explicitly separates the **ontic reality** of architrino trajectories and causal wake surfaces from the **epistemic description** captured by the wavefunction. Reframing measurement as dynamical threshold resolution does not by itself complete the quantum closure program, but it relocates the measurement problem onto a mechanical basis involving uncertainty, superposition, and the standard particle-wave duality comparison.

## Ontological Status of the Wavefunction

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the standard comparison notation $\psi(\mathbf{x}, t)$ translates to an effective chart variable $\psi_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$. It is not a fundamental physical field propagating in a high-dimensional configuration space. Instead, it is an **effective, coarse-grained epistemic tool** utilized by Physical Observers.

The universe at the ontic level, as represented by the $\mathbb{U}_{\text{now}}$ universe-state perspective, consists of point-like architrinos executing definite trajectories $\mathbf X_i(T)$ in a 3D Euclidean void, interacting via a continuous superposition of causal wake surfaces. Because Physical Observers (assemblies) cannot access the exact microstate or the full path-history of the Noether sea, they must rely on statistical descriptions.

This requires a two-layer use of the word superposition. Substrate superposition means linear addition of causal-wake contributions and accelerations; it is part of the deterministic dynamics. Quantum superposition of mutually exclusive outcomes is different: it is an effective branch envelope used by a Physical Observer before a record has selected a basin. A deterministic substrate can therefore reject ontic superposition of mutually exclusive macroscopic states without rejecting the wake addition that produces the effective landscape.

The wavefunction encodes:
*   **The superposed potential landscape:** A coarse-grained representation of the ambient causal wake intersections.
*   **Informational ambiguity:** The integrated ignorance of exact source identities, distances, and path-history emission times.
*   **Assembly resonance modes:** The allowed stable configuration limits of Noether braid assemblies.

When standard non-relativistic, fixed-particle-number quantum mechanics uses a unitary evolution equation (the Schrödinger equation), it is tracking the linear, idealized propagation of these coarse-grained potential distributions across the Noether sea.

That statement is licensed only after the action-to-envelope handoff supplies a controlled residual. The effective wavefunction chart must name the coarse fields, the phase-amplitude map, and the retained record window; it must pass the action-to-envelope residual $\mathcal{R}_{\mathrm{env}}\le\epsilon_{\mathrm{env}}$ in [Effective Lagrangian](../dynamics/effective-lagrangian.md#closure-interface-action-to-envelope-reduction), and any later update must pass the record-autonomy tests in [Measurement Ontology](measurement-ontology.md#what-makes-an-interaction-a-record). Otherwise $\psi$ remains a useful fitting envelope, not a promoted quantum closure.

### Particle-Wave Duality As Assembly And Wake

The standard phrase particle-wave duality is a comparison label, not native ontology. It records two true experimental facts: detections are localized and countable, while propagation histories show interference, diffraction, and phase sensitivity. In $\mathbb{A}\mathbb{A}\mathbb{A}$ those facts are not assigned to one object switching identity. They are assigned to two coupled pieces of one causal process: the assembly and its causal wake.

For a declared preparation and apparatus channel, the retained effective state should be read as a lossy projection of a substrate packet
$$
\Gamma_\theta(T)=\left(\mathbf X_{\mathrm{asm}}(T),\mathcal{W}_\theta(T),\Xi_\theta(T)\right)
$$
where $\mathbf X_{\mathrm{asm}}$ denotes the localized assembly coordinates retained by the chart, $\mathcal{W}_\theta$ denotes the causal-wake/path-history data still relevant to the record channel, and $\Xi_\theta$ denotes retained Noether sea and apparatus-environment context (written $\Xi$ to keep $Z$ reserved for proton number). Localization and countable detector records belong primarily to the assembly and apparatus basin. Interference and phase transport belong primarily to unresolved wake history in $\mathcal{W}_\theta$.

The double-slit lesson is therefore not that an ontic particle becomes a wave before becoming a particle again. The lesson is that a localized assembly can leave and receive distributed wake structure whose path history remains live until an apparatus creates a restartable record. If no which-path record has formed at the slit plane, the effective wavefunction must continue to carry the unresolved branch envelope. If a which-path apparatus forms a durable record, the record channel changes and interference is removed by apparatus coupling, not by an observer's act of looking.

This is the conceptual bridge to the restartability test below. Particle-like detection is the record-facing side of the assembly. Wave-like behavior is the unresolved wake-history side of the same preparation. The wavefunction is the effective chart that carries both until the declared apparatus channel has either preserved interference or produced a completed record.

### Effective State-Vector Contract

The standard state-vector formalism supplies a precise observer-level contract that the $\mathbb{A}\mathbb{A}\mathbb{A}$ reduction must recover, not an ontological replacement for architrino trajectories. For a declared effective chart $\theta=(M_\theta,\mathcal{Q},W,T_W)$, the comparison Hilbert space is
$$
\mathcal{H}_\theta=L^2(M_\theta,d\nu_\theta),
\qquad
\langle\psi|\phi\rangle_\theta
=
\int_{M_\theta}\psi^*(q)\phi(q)\,d\nu_\theta(q)
$$
The effective state is a normalized ray,
$$
\|\psi\|_\theta^2=1,
\qquad
\psi\sim\lambda\psi,\quad \lambda\in\mathbb{C}\setminus\{0\}
$$
because a constant nonzero complex rescaling does not change the record statistics after normalization. A spatially varying phase is different: it changes momentum, current, and interference data, so it cannot be quotiented away by the same rule.

If a declared apparatus channel is represented by a self-adjoint effective operator $\hat O_\theta$ with orthonormal eigenstates $\{\phi_n\}$, then the standard comparison expansion is
$$
\psi=\sum_n a_n\phi_n,
\qquad
a_n=\langle\phi_n|\psi\rangle_\theta,
\qquad
\sum_n |a_n|^2=1
$$
The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is to derive the chart, the inner product, the admissible operator, and the coefficients from the retained deterministic flow and apparatus kernel. If those objects are inserted independently of the record-forming dynamics, the formal Hilbert-space description has been assumed rather than recovered.

### Representation and Decomposition Discipline

The state-vector contract also fixes what may not be imported from the notation. A standard comparison representation such as $\psi(\mathbf{x},t)$, $\psi(\mathbf{p},t)$, or $\psi(q_1,\ldots,q_N)$ is a coordinate choice on the effective state, not a direct inventory of substrate contents. The layer-explicit position-space version is $\psi_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$, with $x_{\mathrm{eff}}^i$ supplied by the declared observer chart. A position-space chart is physically licensed only when $\theta$ includes a projection from deterministic assembly, causal-wake, and apparatus data to the corresponding position records. A configuration-space wavefunction for many coordinates is therefore not a new physical arena layered over the Euclidean void; it is an observer-level bookkeeping chart over possible record tuples.

The same rule applies to subsystem decomposition. Standard quantum mechanics often writes a composite channel as
$$
\mathcal{H}_{\theta}
\simeq
\mathcal{H}_S\otimes\mathcal{H}_A\otimes\mathcal{H}_E
$$
for system, apparatus, and environment. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this factorization is accepted only where the same retained flow supplies stable subsystem boundaries, local transport or bounded causal coupling, and record persistence for the apparatus channel. It is not enough to choose factors that look like objects or spatial cells after the fact. The chosen decomposition must be compatible with $\mathcal{K}_A$, $\mu_{*,T_W}$, the action-to-envelope residual, and the record-autonomy tests in [Measurement Ontology](measurement-ontology.md).

This keeps the useful part of Hilbert-space formalism while reversing its ontological priority. Bases, observables, and tensor-product factors are recovery products. If they are assumed before the branch record is derived, the calculation may still be a useful comparison, but it has not shown that the wavefunction is fundamental or that space, particles, systems, and environments have been recovered from substrate dynamics.

### Virtual-Channel Comparison Contract

Perturbative quantum field theory often describes loop corrections by saying that virtual particles appear as intermediate components of an interaction. In this chapter that language is admitted only as comparison-layer bookkeeping. Lamb-shift splittings, Casimir-force corrections, electroweak mass shifts, and similar loop-sensitive observables are real record statistics to recover, but the phrase "particles constantly popping in and out" is not substrate ontology in $\mathbb{A}\mathbb{A}\mathbb{A}$.

For a declared effective chart $\theta=(M_\theta,\mathcal{Q},W,T_W)$ and apparatus channel $C$, let $\mathcal{O}_{\mathrm{loop}}^{\mathrm{QFT}}(C)$ denote the standard loop-corrected prediction for the recorded observable, including whatever virtual-channel terms the comparison calculation uses. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement must instead derive an effective channel operator $\hat O_{\mathrm{eff}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(C;\theta)$ and record distribution $P_{\mathrm{rec}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\cdot\mid C,\theta)$ from the same deterministic assembly flow, causal-wake path history, and finite-window basin measure used elsewhere in this chapter. The comparison is accepted only when a virtual-channel residual is controlled:
$$
\mathcal{R}_{\mathrm{virt}}(C;\theta)
=
\max\left(
\frac{
\left|
\langle \hat O_{\mathrm{eff}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(C;\theta)\rangle_{\mathrm{rec}}
-
\mathcal{O}_{\mathrm{loop}}^{\mathrm{QFT}}(C)
\right|
}{\varepsilon_{\mathrm{loop}}},
\frac{
d_{\mathrm{TV}}\!\left(
P_{\mathrm{rec}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\cdot\mid C,\theta),
P_{\mathrm{obs}}(\cdot\mid C)
\right)
}{\varepsilon_{\mathrm{rec}}}
\right)
\le 1
$$
The first term tests the effective operator or channel residual against the loop benchmark; the second tests the actual recorded statistics. Passing this residual licenses the perturbative virtual-particle description as an economical calculation layer. It does not license a substrate claim that additional short-lived particles are being created and erased between records.

### Density-Current Closure Target

Born probability is only half of the effective wavefunction contract. Standard Schrödinger evolution also carries a local conservation law. In standard comparison form, one writes
$$
\rho_{\psi,\mathrm{std}}(x_{\mathrm{std}}^i,t_{\mathrm{std}})=|\psi_{\mathrm{std}}(x_{\mathrm{std}}^i,t_{\mathrm{std}})|^2,
\qquad
\mathbf{J}_{\psi,\mathrm{std}}(x_{\mathrm{std}}^i,t_{\mathrm{std}})
=
\frac{\hbar_{\mathrm{eff}}}{2m_{\mathrm{eff}}i}
\left(\psi_{\mathrm{std}}^*\nabla_{\mathrm{std}}\psi_{\mathrm{std}}-\psi_{\mathrm{std}}\nabla_{\mathrm{std}}\psi_{\mathrm{std}}^*\right)
$$
and
$$
\partial_{t_{\mathrm{std}}}\rho_{\psi,\mathrm{std}}+\nabla_{\mathrm{std}}\cdot\mathbf{J}_{\psi,\mathrm{std}}=0
$$
For an effective single-assembly chart with mass parameter $m_{\mathrm{eff}}$ and action constant $\hbar_{\mathrm{eff}}$, the layer-explicit target is
$$
\rho_{\psi,\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=|\psi_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})|^2,
\qquad
J_{\psi,\mathrm{eff}}^i(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
\frac{\hbar_{\mathrm{eff}}}{2m_{\mathrm{eff}}i}
\gamma_{\mathrm{eff}}^{ij}\left(\psi_{\mathrm{eff}}^*\partial_{x_{\mathrm{eff}}^j}\psi_{\mathrm{eff}}-\psi_{\mathrm{eff}}\partial_{x_{\mathrm{eff}}^j}\psi_{\mathrm{eff}}^*\right),
$$
$$
\partial_{t_{\mathrm{eff}}}\rho_{\psi,\mathrm{eff}}
+\partial_{x_{\mathrm{eff}}^i}J_{\psi,\mathrm{eff}}^i=0.
$$
This equation should be read as an effective continuity target, not as a claim that probability is a physical fluid. Let $\rho_{\mathrm{rec}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $J_{\mathrm{rec}}^i(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ be the position density and record-facing flux obtained by pushing the same finite-window basin measure $\mu_{*,T_W}$ through the deterministic assembly flow and the declared position projection. A Born-current recovery should report
$$
\mathcal{R}_{\rho J}(W,\mathcal T_{\mathrm{eff}};\theta)
=
\max\left(
\frac{\sup_{t_{\mathrm{eff}}\in\mathcal T_{\mathrm{eff}}}\|\rho_{\mathrm{rec}}(\cdot,t_{\mathrm{eff}})-\rho_{\psi,\mathrm{eff}}(\cdot,t_{\mathrm{eff}})\|_{L^1(W)}}{\varepsilon_\rho},
\frac{\sup_{t_{\mathrm{eff}}\in\mathcal T_{\mathrm{eff}}}\|\partial_{t_{\mathrm{eff}}}\rho_{\mathrm{rec}}+\nabla_{\mathrm{eff}}\cdot\mathbf{J}_{\mathrm{rec}}\|_{W^{-1,1}(W)}}{\varepsilon_{\mathrm{cont}}},
\frac{\sup_{t_{\mathrm{eff}}\in\mathcal T_{\mathrm{eff}}}\|\mathbf{J}_{\mathrm{rec}}(\cdot,t_{\mathrm{eff}})-\mathbf{J}_{\psi,\mathrm{eff}}(\cdot,t_{\mathrm{eff}})\|_{W^{-1,1}(W)}}{\varepsilon_J}
\right)
\le 1
$$
The first term checks Born density, the second checks local conservation for the derived record flow in the same negative-order Sobolev norm used by the current benchmark (distributions carry no norm, so the seminorm family of $\mathcal D'$ cannot anchor a tolerance), and the third checks the standard probability-current benchmark. A model that matches $|\psi|^2$ only after allowing probability to disappear from one region and reappear elsewhere before a record has formed has not recovered Schrödinger continuity.

The same target can be sharpened into a guidance-ratio test. Wherever $\rho_{\psi,\mathrm{eff}}>0$, the effective quantum velocity field is
$$
\mathbf{v}_{\psi,\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
\frac{\mathbf{J}_{\psi,\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})}
{\rho_{\psi,\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})}
$$
Let $\mathbf{v}_{\mathrm{rec}}$ be the velocity field obtained by projecting the deterministic assembly-flow current through the same record chart. The local guidance residual is
$$
\mathcal{R}_{\mathrm{guid}}(W,\mathcal T_{\mathrm{eff}};\theta)
=
\frac{
\sup_{t_{\mathrm{eff}}\in\mathcal T_{\mathrm{eff}}}
\left\|
\mathbf{v}_{\mathrm{rec}}(\cdot,t_{\mathrm{eff}})
-
\mathbf{v}_{\psi,\mathrm{eff}}(\cdot,t_{\mathrm{eff}})
\right\|_{L^1(W,\rho_{\psi,\mathrm{eff}})}
}{\epsilon_v}
\le 1
$$
This is a stricter recovery target than Born density alone. It asks whether the extracted wavefunction gives the same local transport law as the underlying causal-wake basin flow, not merely the same final histogram.

The phrase "the system is in a superposition" is therefore not a standalone ontological claim in this chapter. It is an effective statement relative to a declared representation and record channel. If the preparation, apparatus kernel, retained coarse-graining, or access region changes, the apparent basis in which a branch expansion is written may change while the underlying assembly and causal-wake history do not. The substrate claim remains the same: one deterministic history is unfolding, while the effective wavefunction carries alternatives that have not yet become autonomous records.

A path-integral description is useful as a comparison because it treats possible histories rather than only final pointer states. In this chapter that comparison stays epistemic: a history weight or event measure is an observer-level bookkeeping device unless it is tied to the same deterministic assembly flow, causal-wake path history, and record criterion used in [Measurement Ontology](measurement-ontology.md). This distinction matters most in black-hole and early-cosmology regimes, where no external measuring apparatus can be placed outside the whole system.

The effective status of the wavefunction does not make every overlap between state descriptions harmless. For independently prepared systems, the Pusey-Barrett-Rudolph comparison is a preparation-record audit: the account must state whether the substrate preparation measure factorizes, what provenance data are retained, and how the standard state-discrimination statistics are recovered. If those assumptions are accepted in a tested regime, overlap of effective wavefunction descriptions becomes a closure burden rather than an automatic escape from the theorem's burden; the detailed replacement constraint is recorded in [No-Go Theorems](../validation/no-go-theorems.md).

## The Origin of Uncertainty

Standard quantum uncertainty ($\Delta x \Delta p \ge \hbar/2$) does not stem from fundamental indeterminism. It arises as a strict informational limit imposed by the delay-dynamics of the interaction kernel.

### Informational Ambiguity at the Receiver
When an architrino intersects a causal wake surface, it receives a branch-local radial acceleration rather than a filled-sphere impulse. The receiver extracts only two pieces of information from this hit:
1.  The unoriented line of action.
2.  The net force magnitude.

The receiver cannot intrinsically distinguish an attractive pull toward an opposite-polarity source on one ray from a repulsive push by a same-polarity source on the opposite ray of the same line of action. If the receiver polarity flips, the source-polarity labels flip too; the invariant ambiguity is the exchange of side with attraction/repulsion. Furthermore, because the local potential is a dense superposition of hits from countless Noether sea braids, the exact origin and path-history of any single perturbation is irretrievable. When the same hit is used in an accumulated action or wake-history ledger, the retained path must also record how the receiver worldline crosses the causal wake sequence; that receiver-normal factor is a branch-chart datum, not a fact available from one local hit alone.

### Measurement Back-Action and the $h$-Bracket
Any attempt by a Physical Observer to resolve the microstate of an assembly requires an interaction (e.g., scattering a photon assembly modeled as a coaxial contra-rotating pro/anti planar pair). This interaction injects a discrete, minimum action increment (scaling with $h$) into the target assembly's causal history. This back-action continuously alters the boundary conditions of the state, placing a hard limit on simultaneously resolvable conjugate variables. The uncertainty principle brackets the physical action step associated with assembly transitions.

The free Gaussian wavepacket is the simplest observer-level benchmark for this claim. In standard quantum mechanics, a Gaussian packet minimizes the position-momentum uncertainty product and then disperses under free Schrödinger evolution. The $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target is therefore not merely to state $\Delta x\,\Delta p\ge\hbar/2$, but to recover the minimal packet as an effective envelope of deterministic path-history data.

The standard wavepacket construction makes that benchmark more specific. A single plane wave is useful as an ideal momentum eigenstate, but it is not a localized, normalizable packet. The observer-level packet must be built by superposing a spread of wave numbers. Narrowing the spatial envelope broadens the retained $k$-support, and the standard relation $p=\hbar k$ converts that Fourier constraint into the position-momentum uncertainty relation. A Gaussian amplitude distribution is the minimum case; other amplitude distributions increase the product, and free evolution spreads the packet. The recovery target is therefore a four-part benchmark: normalization, packet-center transport at the effective group velocity, the covariance tradeoff between position and momentum, and the standard free-packet spreading law. None of these steps imports a matter wave as substrate ontology; each is a required observer-level consequence of the extracted path-history envelope. In layer-explicit effective notation, the first residual form of that benchmark is:
$$
\Delta_{x,\mathrm{eff}}(t_{\mathrm{eff}})
\Delta_{p,\mathrm{eff}}(t_{\mathrm{eff}})
\ge\frac{\hbar_{\mathrm{eff}}}{2},
\qquad
\left|\Delta_{x,\mathrm{eff}}(t_{\mathrm{eff},0})
\Delta_{p,\mathrm{eff}}(t_{\mathrm{eff},0})
-\frac{\hbar_{\mathrm{eff}}}{2}\right|
\le
\varepsilon_{\mathrm{G}}
$$
For a free retained chart, the same packet must move and spread with the standard effective kinematics,
$$
\left\|
\frac{d}{dt_{\mathrm{eff}}}
\langle x_{\mathrm{eff}}^i\rangle_\theta(t_{\mathrm{eff}})
-
\frac{\langle p_{\mathrm{eff}}^i\rangle_\theta(t_{\mathrm{eff}})}{m_{\mathrm{eff}}}
\right\|
\le
\varepsilon_v,
\qquad
\sup_{t_{\mathrm{eff}}\in\mathcal T_{\mathrm{eff}}}
\frac{
\left|
\Delta_{x,\mathrm{eff}}^{2,\mathbb{A}\mathbb{A}\mathbb{A}}(t_{\mathrm{eff}})
-
\Delta_{x,\mathrm{eff}}^{2,\mathrm{QM}}(t_{\mathrm{eff}})
\right|
}{\varepsilon_{\mathrm{spread}}}
\le 1
$$
Here $\Delta_{x,\mathrm{eff}}^{2,\mathrm{QM}}(t_{\mathrm{eff}})$ is the standard Gaussian spreading benchmark for the same initial covariance. If the derived envelope violates this bound in ordinary free-packet regimes, then the uncertainty explanation has remained qualitative rather than becoming a quantum closure.

The WKB comparison supplies the corresponding semi-classical envelope test. For a one-dimensional retained effective chart with effective momentum
$$
p_\theta(x_{\mathrm{eff}};E)=\sqrt{2m_{\mathrm{eff}}\left(E-V_{\mathrm{eff}}(x_{\mathrm{eff}})\right)}
$$
the standard oscillatory benchmark away from turning points is
$$
\psi_{\mathrm{WKB}}(x_{\mathrm{eff}})
\sim
\frac{1}{\sqrt{p_\theta(x_{\mathrm{eff}};E)}}
\exp\!\left(\pm\frac{i}{\hbar_{\mathrm{eff}}}\int^{x_{\mathrm{eff}}} p_\theta(x'_{\mathrm{eff}};E)\,dx'_{\mathrm{eff}}\right)
$$
with validity only when the effective wavelength varies slowly across one wavelength. A closure packet should therefore report a WKB-envelope residual on the declared access interval $W$:
$$
\mathcal{R}_{\mathrm{WKB}}(W,E;\theta)
=
\max\left(
\frac{\sup_{x_{\mathrm{eff}}\in W_{\mathrm{osc}}}\left|\rho_{\mathrm{rec}}(x_{\mathrm{eff}})-C_E/p_\theta(x_{\mathrm{eff}};E)\right|}{\varepsilon_{\mathrm{amp}}},
\frac{\sup_{x_{\mathrm{eff}}\in W_{\mathrm{osc}}}\left|\partial_{x_{\mathrm{eff}}}\varphi_{\mathrm{rec}}(x_{\mathrm{eff}})-p_\theta(x_{\mathrm{eff}};E)/\hbar_{\mathrm{eff}}\right|}{\varepsilon_{\varphi}},
\frac{\sup_{x_{\mathrm{eff}}\in W_{\mathrm{turn}}}\left|\mathcal{A}_{\mathrm{turn}}^{\mathbb{A}\mathbb{A}\mathbb{A}}-\mathcal{A}_{\mathrm{Airy}}\right|}{\varepsilon_{\mathrm{turn}}}
\right)
\le 1
$$
The final term is the turning-point matching check: near $E=V_{\mathrm{eff}}(x_{\mathrm{eff}})$ the effective chart must pass through the Airy-function benchmark rather than pretending the WKB expression remains valid at $p_\theta=0$. This makes the semi-classical wavefunction comparison a falsifiable envelope recovery, not a visual analogy.

For a metastable barrier, the same comparison gives a tunneling-action benchmark. If $x_0$ and $x_1$ are the effective turning points bounding the forbidden region, the standard exponent is
$$
S_{\mathrm{tun}}(E)
=
\int_{x_0}^{x_1}
\sqrt{2m_{\mathrm{eff}}\left(V_{\mathrm{eff}}(x)-E\right)}\,dx,
\qquad
T_{\mathrm{WKB}}\sim e^{-2S_{\mathrm{tun}}/\hbar_{\mathrm{eff}}}
$$
The $\mathbb{A}\mathbb{A}\mathbb{A}$ target is to derive $S_{\mathrm{tun}}$ from the action accumulated by deterministic assembly histories that cross the retained separatrix tube. A fitted barrier exponent that is not tied to the same $\mu_{*,T_W}$, apparatus kernel, and path-history flow used for record probabilities is only a comparison curve.

Weak probes sit below the record-forming part of this back-action. They may perturb the target and apparatus by a small amount, but they do not by themselves force the target across a separatrix or create a durable apparatus/environment asymmetry. In the notation of [Measurement Ontology](measurement-ontology.md#weak-probe-limit), the retained weak-probe window satisfies
$$
\tau_{\text{meas}}^{(\epsilon)}>t_1-t_0
$$
while an ensemble pointer displacement remains $O(\epsilon)$. The wavefunction remains useful in that regime because it tracks the still-accessible coarse-grained branch envelope rather than a completed record.

Post-selection should be read as conditioning on a later ordinary record, not as a backward-in-time substrate influence. The conditional ensemble
$$
\mu_{\mathrm{post}}(B)
=
\mu\!\left(B\mid R_{\mathrm{post}}\in\mathcal{R}_f\right)
$$
may reveal weak-probe structure that is invisible in single trials, but it does not change the underlying rule that architrino and assembly histories evolve forward in absolute time.

This is also the correct home for anomalous signed weak-probe averages. A weak-value calculation may assign a negative or otherwise counterintuitive sign to the conditional pointer shift, but the wavefunction-side interpretation remains effective: the signed response is a property of the post-selected ensemble and the still-live branch envelope. The validation target belongs to [Measurement Ontology](measurement-ontology.md#weak-probe-limit): reproduce the normalized conditional response $\bar{Y}_{\epsilon\mid\mathcal{R}_f}$ from the deterministic weak-probe flow while keeping each retained trial below the record-forming threshold. The sign should not be promoted into a negative-mass entity, a retrocausal substrate process, or a completed intermediate record.

## Wavefunction Collapse as Threshold Resolution

The "collapse" of the wavefunction is not a spontaneous, non-physical violation of unitary evolution. It is the **deterministic crossing of a metastable phase-space boundary** (a separatrix) during an interaction.

Assemblies such as Noether braids possess internal slow variables that dictate their resonant states. When an assembly interacts with a measurement apparatus (a macroscopic complex of assemblies), the combined system enters a metastable configuration. The incoming potential sum drives the system toward a bifurcation threshold.

Once the accumulated path-history forces push the assembly's action across the $h$-scale separatrix, the system falls into a new, distinct basin of attraction (e.g., transitioning from an excited orbital resonance to a ground state, or locking into a specific spatial trajectory). 

For spin measurements, the corresponding basin program is the Stern-Gerlach-like response model in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response), where the apparatus couples to the full nested shell braid spin ledger rather than to a preassigned spin label.

The stronger deterministic statement is not that the formal wavefunction disappears from calculation. It is that a complete substrate state would already contain the realized path-history branch. The effective state must carry multiple amplitudes only because the retained observer chart has lost enough source identity, emission-time, and apparatus-kernel detail that several basin outcomes remain unresolved.

*   **Before the transition:** For the declared apparatus kernel and coarse-graining, the wavefunction models the probability amplitudes of the system navigating the metastable region.
*   **During the transition:** The discrete state changes sharply, breaking the linear approximation of the Schrödinger equation.
*   **After the transition:** The observer must update their epistemic catalog (the wavefunction) to reflect the newly realized basin of attraction. "Collapse" is simply this forced mathematical update after a dynamical threshold has been irreversibly crossed.

## Born Rule and Chaotic Attractors

The probability of finding a system in a particular state, given by the Born rule $P \propto |\psi|^2$, should map to the statistical measure of phase-space basins under the master equation.

Because the local Noether sea supplies high-dimensional, coarse-grained irregular driving through continuous causal-wake intersections, the exact trajectory of an assembly approaching a threshold is highly sensitive to initial conditions. The closure target is to show that the phase-space basin volume leading to a specific transition scales with the coherent potential gradients that drive that transition, and that the Born rule emerges as the statistical equilibrium limit of those deterministic threshold dynamics.

External relational or configuration-space probability measures are useful only as comparison mathematics. A geometry may carry a natural area, volume, or contour measure and may even produce a Born-like distribution over recorded shapes, but that does not by itself close this chapter. The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is stricter: the measure must be a pushforward of deterministic assembly dynamics and apparatus coupling. In schematic form, if
$$
\pi_{T_W}:\Gamma_{\text{eff}}^{(T_W)}\to\mathcal{R}
$$
maps the retained record-window section to observer records, then the record probability must be
$$
P_n(T_W)=\mu_{*,T_W}\!\left(\pi_{T_W}^{-1}(R_n)\right)
$$
with $\mu_{*,T_W}$ derived from the finite-window coarse-grained measure of the same dynamics that supplies the effective wave equation. A free-standing external geometric measure, by contrast, is only a scaffold until it is tied to the Master Equation, record formation, and the retained measurement channel.

Subsystem decomposition carries the same burden. A useful comparison may speak about probability moving between subsystems, but the native statement is not a free tensor-factor flow. The preparation, apparatus kernel, coarse-graining, access region, and record window must first determine which reduced metastable coordinates and boundary data are retained. Only then can $\mu_{*,T_W}$ assign weights to the record basins $\pi_{T_W}^{-1}(R_n)$, and only the same retained transfer law may decide whether those weights are restartable after a record or still carry unresolved path-history influence before a record.

Repeated-record confirmation is part of the same burden. For counts $N_n$ gathered through the declared record channel, the observed frequencies $\widehat f_n=N_n/N$ must converge to the same $P_n(T_W)$ within the calibrated apparatus tolerance. The detailed frequency residual is owned by [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence), while [Measurement Ontology](measurement-ontology.md#repeated-record-confirmation) owns the record-channel version. This chapter's point is narrower: basin weights cannot remain formal branch labels if they are supposed to replace the Born rule. They must also be usable for ordinary confirmation and falsification.

## Epistemic Branching (Reinterpreting Many-Worlds)

The Everettian Many-Worlds interpretation visualizes a branching tree of parallel realities corresponding to superposed wavefunction components. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this branching is entirely **epistemic**.

There is only one realized, strictly continuous trajectory in absolute time. The "branches" merely map the divergent possibilities of coarse-grained histories near a bifurcation point. Because the Physical Observer lacks the full path-history data required to calculate the exact threshold resolution, the mathematics must carry all stable attractors forward as superpositions until a macroscopic record (decoherence) isolates the realized path. No ontic universes are spawned; the system simply settles into one uniquely determined groove in the potential landscape.

Branch language is also representation-sensitive. A branch family $\{B_i\}$ is meaningful only after the retained record coordinates and apparatus channel have been fixed. A basis rotation in Hilbert space may give a different-looking superposition, but it does not by itself create a new substrate event. The accepted test is whether the candidate basin family satisfies the recordability and restartability conditions in [Measurement Ontology](measurement-ontology.md#what-makes-an-interaction-a-record).

A zero coefficient in one effective Hilbert expansion is therefore not a substrate-existence test. It can justify discarding a component from the observer-level envelope only when the corresponding record-basin measure is below the declared tolerance for the same apparatus channel. In symbols, an effective coefficient $c_i=0$ licenses only the record-facing claim
$$
\mu_{*,T_W}(B_i)\mathbf{1}_{\mathrm{rec}}(i;\theta)
\le
\varepsilon_{\mathrm{Born}}
$$
not the stronger claim that no substrate history exists. The substrate-side question remains whether $B_i$ is a completed, recordable basin for the declared setup $\theta$, not whether one coordinate chart happens to give a vanishing expansion coefficient.

The boundary between an unresolved branch envelope and a completed record should therefore be tested by the record-autonomy residual in [Measurement Ontology](measurement-ontology.md#what-makes-an-interaction-a-record), not by a metaphysical decision about how many worlds exist. Record-channel times $t$ inherited from that chapter are effective-chart times throughout. In the wavefunction description, interference remains live while
$$
\Delta_{\mathrm{rec}}(t;k)=O(1)
$$
because the candidate alternatives still affect the record channel at observable scale. A record-facing wavefunction update is justified only after the relevant apparatus basin satisfies $\Delta_{\mathrm{rec}}(t;k)\le\varepsilon_{\mathrm{rec}}$ across the persistence window. This keeps the useful lesson from decoherence language while rejecting branching as substrate ontology.

This also prevents the branch picture from becoming a literal one-way tree. Before record autonomy, two coarse branch tubes can separate and later overlap again in the retained readout channel. For candidate branch basins $B_i$ and $B_j$, define a recoherence residual
$$
\Delta_{\mathrm{recoh}}(t;i,j)
=
\frac{
\mu_{*,T_W}\!\left(
N_\varepsilon(\Phi_t(B_i))\cap N_\varepsilon(\Phi_t(B_j))
\right)
}{
\min\{\mu_{*,T_W}(B_i),\mu_{*,T_W}(B_j)\}
}
$$
where $N_\varepsilon$ denotes an $\varepsilon$-thickened tube in the retained coarse-grained record coordinates. If $\Delta_{\mathrm{recoh}}=O(1)$ before the persistence window closes, the alternatives have not become independent records; the effective wavefunction must continue to carry their mutual influence. A completed record requires both $\Delta_{\mathrm{rec}}\le\varepsilon_{\mathrm{rec}}$ and recoherence residuals below the apparatus-class tolerance for competing basin pairs.

For a declared apparatus kernel, coarse-graining, access region, and record window $(\mathcal{K}_A,\mathcal{Q},W,T_W)$, a candidate branch $B_i$ may be counted as an independent observer-level alternative only when the same retained window clears the basin, recoherence, Born-weight, and thermodynamic projection tests:
$$
N_{\mathcal{Q},W}(B_i)\ge 1,
\qquad
\sup_{j\ne i}\sup_{t\in T_W}\Delta_{\mathrm{recoh}}(t;i,j)\le\varepsilon_{\mathrm{recoh}}
$$
$$
\Delta_{\mathrm{Born}}(T_W)\le\varepsilon_{\mathrm{Born}},
\qquad
\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)\le\varepsilon_{\mathrm{ens}}
$$
This condition keeps the useful Everettian lesson that branch descriptions become robust through dynamics, while refusing to count a formal Hilbert-space expansion as a substrate event. If any line fails, the effective wavefunction still carries an unresolved branch envelope; it has not earned a completed record or an independent outcome count in $\mathbb{A}\mathbb{A}\mathbb{A}$.

Equivalently, for a declared setup $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$, the effective branch family available for record counting is
$$
\mathcal{B}_{\mathrm{rec}}(\theta)
=
\left\{
B_i:
\mathbf{1}_{\mathrm{rec}}(i;\theta)=1,\quad
\sup_{j\ne i}\sup_{t\in T_W}\Delta_{\mathrm{recoh}}(t;i,j)\le\varepsilon_{\mathrm{recoh}},\quad
\mu_{*,T_W}(B_i)\ge\mu_0(\mathcal{Q},W)
\right\}
$$
Only basins in $\mathcal{B}_{\mathrm{rec}}(\theta)$ may be counted as completed observer-level alternatives. Formal components outside this family may remain useful for calculation, but they are unresolved envelope structure rather than independent outcomes.

The same boundary can be checked from the effective transition law. Let $\mathcal{T}^{\mathcal{Q}}_{a\to b}$ denote the observer-level transition operator induced by the same deterministic substrate flow after coarse-graining by $\mathcal{Q}$. For $t_0<t_1<t_2$, define the coarse-grained divisibility residual
$$
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q})
=
\left\|
\mathcal{T}^{\mathcal{Q}}_{t_0\to t_2}
-
\mathcal{T}^{\mathcal{Q}}_{t_1\to t_2}
\mathcal{T}^{\mathcal{Q}}_{t_0\to t_1}
\right\|_{\mathrm{TV}\to\mathrm{TV}}
$$
When $\Delta_{\mathrm{div}}=O(1)$, the coarse-grained state has not retained enough path-history information to be restarted at $t_1$ without loss; in the wavefunction representation, that missing history appears as live phase, coherence, or interference structure. After a valid record, the retained record channel should satisfy $\Delta_{\mathrm{div}}\le\varepsilon_{\mathrm{div}}$ on the same persistence window used for $\Delta_{\mathrm{rec}}$. This is a closure diagnostic for the effective description, not a new substrate law.

This restartability test is the $\mathbb{A}\mathbb{A}\mathbb{A}$-native way to use comparisons with stochastic or transition-law reformulations. If an external framework says that interference appears when a process cannot be split into independent intermediate-time transitions, the retained content is not the external ontology. The retained content is the diagnostic: the effective wavefunction must carry whatever path-history the reduced transition operator loses. A proposed coarse-graining therefore earns its quantum interpretation only by showing where $\Delta_{\mathrm{div}}$ is order one before a record and why it falls below tolerance after record autonomy.

This gives a compact way to state the double-slit comparison without treating the wavefunction as ontology. Let $t_h$ be the time at the slit or hole plane and let $t_s$ be the later screen-record time. If the retained coarse-graining $\mathcal{Q}_{\mathrm{path}}$ contains only a path label at $t_h$ and no durable apparatus record, the unresolved path-history influence should remain visible as
$$
\Delta_{\mathrm{div}}(t_0,t_h,t_s;\mathcal{Q}_{\mathrm{path}})=O(1)
$$
In that regime the effective wavefunction must continue to carry the branch envelope, and interference remains an observer-level consequence of incomplete restartability. If a which-path apparatus creates a record channel $R_h$ satisfying the record-autonomy test, the retained coarse-graining changes. The accepted closure condition becomes
$$
\Delta_{\mathrm{rec}}(t_h;k)\le\varepsilon_{\mathrm{rec}},
\qquad
\Delta_{\mathrm{div}}(t_0,t_h,t_s;\mathcal{Q}_{\mathrm{path}}\cup R_h)\le\varepsilon_{\mathrm{div}}
$$
The disappearance of interference is then attributed to a completed record and a restartable reduced description, not to an ontological wave splitting and then collapsing.

## Falsifiability and Predictions

If the wavefunction is an effective description of threshold dynamics rather than a fundamental field, then the theory must identify regimes where finite-time branch selection or non-Markovian history effects can in principle depart from ideal instantaneous projection.

**Failure Modes and Experimental Signatures:**
*   **Ultrafast Decoherence Deviations:** At timescales shorter than the local Lyapunov time of the Noether sea interactions, the statistical assumptions yielding the Born rule should weaken. Very high-frequency, weak-measurement probes may reveal non-Markovian hysteresis in the state transition process, violating strictly predicted QM transition rates.
*   **Strict instantaneous projection:** If experiments force strictly zero-duration physical branch selection, rather than an effective instantaneous update at the observer level, this ontology is falsified.

## Closure Interface: Basin-Measure Formalization

For integration with the quantum closure program, formalize Born emergence through a finite-window transfer-operator framework rather than a global ergodicity assumption.

For a declared setup $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$, let $\Gamma_{\text{eff}}^{(T_W)}$ be the retained record-window section of the reduced metastable coordinates, with the target, apparatus, local Noether sea state, and causal-wake history included to the resolution kept by $\mathcal{Q}$. Let $\Phi_{T_W}$ be the deterministic coarse-grained flow across that same window. The required measure is a local finite-window measure $\mu_{*,T_W}$ satisfying approximate invariance on the retained section:
$$
d_{\mathrm{TV}}\!\left((\Phi_{T_W})_*\mu_{*,T_W},\,\mu_{*,T_W}\right)\le\varepsilon_\mu,
\qquad
\varepsilon_\mu\ll 1
$$
For record-forming attractor basins $\{B_n^{(T_W)}\}$,
$$
P_n(T_W)=\int_{B_n^{(T_W)}} d\mu_{*,T_W}(\Gamma)
$$
Here $B_n^{(T_W)}$ means a record-forming basin for the declared apparatus channel, not every formal component of a Hilbert-space expansion. If the channel carries candidate branches that have not yet satisfied the record-autonomy, persistence, event-ledger, and energy-residual tests in [Measurement Ontology](measurement-ontology.md#what-makes-an-interaction-a-record), the Born-side weight is computed only after applying that record filter:
$$
P_n(T_W)
=
\frac{
\mu_{*,T_W}(B_n^{(T_W)})\mathbf{1}_{\mathrm{rec}}(n;\theta)
}{
\sum_m\mu_{*,T_W}(B_m^{(T_W)})\mathbf{1}_{\mathrm{rec}}(m;\theta)
}
$$

This filtered weight is defined conditional on at least one completed record in the window; runs in which no candidate basin passes the record filter are routed to the weak-probe regime rather than assigned weights by a vanishing denominator.

Let $\mathcal{P}_\theta:\Gamma_{\text{eff}}^{(T_W)}\to\Omega_\theta$ be the effective record projection for apparatus context $\theta$, and let $\Omega_n^\theta=\mathcal{P}_\theta(B_n^{(T_W)})$ be the projected record region. The closure target for this chapter is:
$$
\Delta_{\mathrm{Born}}(T_W)
=
\sup_n
\left|
P_n(T_W)-\int_{\Omega_n^\theta}|\psi_\theta(q)|^2\,d\nu_\theta(q)
\right|
\le
\varepsilon_{\mathrm{Born}}
$$
in the same regime where the envelope dynamics reduce to effective Schrödinger evolution.

Equivalently, the native basin measure must push forward to the effective Hilbert-envelope density,

$$
(\mathcal{P}_\theta)_*\mu_{*,T_W}
\approx
|\psi_\theta(q)|^2d\nu_\theta(q)
$$

on the declared record regions. This keeps basin-space measures and effective wavefunction measures in their proper domains.

This is the Born-rule basin-measure ledger. It should stay distinct from the spin-statistics / exchange ledger in [Fermi-Dirac and Bose-Einstein Statistics](./fermi-dirac-and-bose-einstein-statistics.md), which asks why effective states are antisymmetric or symmetric in the first place. Photon-channel squared-amplitude capture is a special measurement-channel bridge in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), not a replacement for the basin-measure derivation.

Spin and Bell records add stricter handoffs. Spin-$\tfrac{1}{2}$ probabilities consume the lifted Stern-Gerlach apparatus basins in [Measurement Ontology](measurement-ontology.md#spin--discrete-outcome-measurements), not an abstract eigenlabel by itself. Bell-pair probabilities consume the full joint response law from pair provenance, with measurement-independence, no-signaling, and product-screening audits before the correlation curve may be treated as recovered.

### Basin-Measure Necessity

The basin measure is not just a convenient way to write probabilities. Let $\mathcal{T}_{\Delta t}$ be the deterministic pushforward or return map on the retained finite-window section, let $\mu_*$ be invariant or metastable for that map, and let $\mathcal{P}=\{B_i\}$ be a measurable partition whose separatrix boundaries have $\mu_*$-measure zero. Then the record weights are forced to be
$$
p_i
=
\int_{\Gamma_{\mathrm{eff}}^{(T_W)}}\mathbf{1}_{B_i}\,d\mu_*
=
\mu_*(B_i)
$$
within the finite-window error budget. A representative acceptance bound is
$$
\left|
\mathcal{T}_{\tau_{\mathrm{rec}}}^*\mu_*(B_i)
-
\mu_*(B_i)
\right|
\le
\varepsilon_{\mathrm{meta}}
+\varepsilon_{\mathrm{leak},i}
+\varepsilon_{\mathrm{esc}}
+\varepsilon_C
$$

where $\varepsilon_{\mathrm{meta}}$ budgets the metastability drift of $\mu_*$ over the record time, $\varepsilon_{\mathrm{leak},i}$ the separatrix leakage into or out of $B_i$, $\varepsilon_{\mathrm{esc}}$ the escape of retained states from the finite-window section, and $\varepsilon_C$ the resolution tolerance of the declared apparatus channel $C$.

If a model assigns branch weights that are not the basin measures of the same record-forming flow, it has added an untracked transition kernel, an external interpretive rule, or a hidden ensemble change. Such a model may still be a comparison formalism, but it has not derived Born weights from $\mathbb{A}\mathbb{A}\mathbb{A}$ threshold dynamics.

The same measure must also survive thermodynamic projection checks. When the measurement story uses apparatus entropy, decoherence rates, or environment summaries, those quantities may not be fitted by a second ensemble unrelated to the Born-rule basin measure. The finite-window version $\mu_{*,T_W}$ in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence) must project to the thermodynamic summary used by the same record channel, within an explicitly declared tolerance.

The finite-window measure also has to survive the energy bookkeeping of the record event. If the apparatus explanation invokes thermalization, decoherence, or collapse-model comparison noise, the same run record must keep the unrecorded energy residual $\Delta E_{\mathrm{unrec}}(T_W;\theta)$ below tolerance in [Measurement Ontology](measurement-ontology.md#measurement-and-heating-residual). The wavefunction-side update is therefore licensed only when the Born weights, thermodynamic projection, and energy ledger are compatible on one window:
$$
\mathcal{R}_{\mathrm{wf-rec}}(T_W;\theta)
=
\max\left(
\frac{\Delta_{\mathrm{Born}}(T_W)}{\varepsilon_{\mathrm{Born}}},
\frac{\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)}{\varepsilon_{\mathrm{ens}}},
\frac{|\Delta E_{\mathrm{unrec}}(T_W;\theta)|}{\varepsilon_E},
\sup_{t\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\frac{\Delta_{\mathrm{rec}}(t;k)}{\varepsilon_{\mathrm{rec}}}
\right)
\le 1
$$
This residual is not an additional probability postulate. It is the finite-window acceptance test for treating the effective wavefunction as having updated to a completed record rather than to an unresolved branch envelope.

### Lower Bound on Recordable Basin Measure

The finite-window probability measure $\mu_{*,T_W}$ is enough to state outcome weights, but it does not by itself say when a subset of the retained metastable section is an independently recordable alternative. The closure program also needs the finite, pre-normalized basin measure associated with the same coarse-graining, access region, record window, and apparatus channel. Let $\mu_{\mathcal{Q}}$ denote that finite basin measure after $\mathcal{Q}$, $W$, and $T$ have been declared.

For that declared setup, define the candidate recordable basin family by importing only the measurement criteria already fixed in [Measurement Ontology](measurement-ontology.md). A basin is eligible only when its apparatus-target trajectories have finite measurement crossing, satisfy entropy locking, and satisfy record autonomy on the persistence window:
$$
\mathcal{B}_{\mathcal{Q},W}^{\mathrm{rec}}
=
\left\{
B\subset\mathcal{M}:
\tau_{\text{meas}}(B)<\infty,\quad
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}>0,\quad
\sup_{t\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)
\le
\varepsilon_{\mathrm{rec}}
\right\}
$$
The candidate lower measure unit is then
$$
\mu_0(\mathcal{Q},W)
=
\inf_{B\in\mathcal{B}_{\mathcal{Q},W}^{\mathrm{rec}}}
\mu_{\mathcal{Q}}(B)
$$
with the required closure condition
$$
0<\mu_0(\mathcal{Q},W)<\infty
$$
When this condition holds, the resolved-state count of a basin is
$$
N_{\mathcal{Q},W}(B)
=
\frac{\mu_{\mathcal{Q}}(B)}{\mu_0(\mathcal{Q},W)}
$$
Basins with $N_{\mathcal{Q},W}(B)<1$ are not independent record states in the declared window; they remain unresolved substructure of a larger recordable alternative. Plain language: the state count is not an information-theory primitive; it is a derived claim about which basins the actual apparatus dynamics can separate, lock, and preserve as records.

This is a closure target, not a completed derivation of the action quantum. In an effective canonical chart with $n$ conjugate pairs, the stronger result would be a derivation that relates the lower basin measure to the standard action cell,
$$
\mu_0(\mathcal{Q},W)\longrightarrow C_{\mathcal{Q},W}h^n
$$
with the normalization factor $C_{\mathcal{Q},W}$ fixed by the same assembly and apparatus reduction rather than chosen after the fact. If the infimum is zero, if $\mu_0$ changes arbitrarily with readout convention, or if the resulting cell fails to match the observer-level $h,\hbar$ benchmarks in the parameter ledger, this route does not close the quantum state-counting problem.

Bohr-Sommerfeld or geometric-quantization comparisons are useful only at this effective chart level. Counting integer action-angle leaves can serve as a benchmark for the recordable state count, but it is not the native ontology and not a replacement for the basin-record construction above. The native requirement is that the Master-Equation reduction, root-ledger admissibility, apparatus coupling, and record-autonomy tests derive the finite basin family first; only then may an action-angle chart summarize that family by an $h^n$ cell. If a singular chart or a changed polarization produces an infinite or apparatus-dependent count while $\mathcal{B}_{\mathcal{Q},W}^{\mathrm{rec}}$ remains finite, the comparison chart has overcounted unresolved substructure rather than discovered new record states.

Primary synthesis location: [Pilot-Wave Character](../philosophy-history/theory-bridges/pilot-wave-character.md).

For the broader methodology of not mistaking successful formal control for settled ontology, compare [Crisis in Physics](../philosophy-history/crisis-in-physics.md).
