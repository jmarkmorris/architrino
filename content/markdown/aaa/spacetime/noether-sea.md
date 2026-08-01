# Noether Sea

This chapter defines the **Noether sea** as the physical medium inside the fixed background in $\mathbb{A}\mathbb{A}\mathbb{A}$. It explains what the medium is, how it differs from the Euclidean void, which state variables describe it, and where detailed assembly, metric, clock, and cosmology work belongs.

The Noether sea is not the substrate. The substrate is [absolute timespace](../foundations/absolute-timespace.md): absolute time together with the [Euclidean void](../foundations/euclidean-void.md). The Noether sea is physical content inside that background: an emergent, coupled population of neutral Noether braid assemblies whose collective response appears to physical observers as spacetime behavior.

The easiest mistake is to treat the Noether sea as another name for space. It is not. Space is the fixed container. The Noether sea is the organized medium inside that container. Effective spacetime is the observer-level reconstruction built from how that medium changes clocks, rulers, signals, and matter response. The corresponding observer-side record and projection boundary is defined in [Observer Framework](./observer-framework.md).

This is why the reader path introduces Noether braid scaffold and geometry before observer-level spacetime. The intended picture is a fixed container populated by organized assemblies, not a flexible container that curves by itself. At the roadmap level, the physical Noether braid density can be read as a coarse-grained population field,
$$
\rho_{\text{NS}}(\mathbf X,T)
\sim
\sum_s W_\ell(\mathbf X-\mathbf X_s(T))
$$
where $W_\ell$ is a smoothing window over Noether braid center variables $\mathbf X_s(T)$. The Noether sea stress, delay factor, and orientation variables then depend on each braid's closure label, orientation, and envelope deformation. The Noether sea is therefore introduced before effective metric language because its state variables are coarse-grained functions of Noether braid geometry, not primitive geometric postulates.

The homogeneous Noether sea also supplies the first constructive convergence case for the infinite many-source wake sum. In a statistically homogeneous, isotropic, locally neutral population with neutrality correlation length $\ell$, receiver-centered shell contributions have square-summable fluctuations: a shell of radius $r_n\sim n\ell$ contains $O(n^2)$ neutral cells, signed fluctuations scale as $O(n)$, and inverse-square wake dilution contributes $O(n^{-2})$. The shell variance is therefore $O(n^{-2})$. The required mixing condition is summable cross-shell covariance,
$$
\sum_{n\ne m}
\left|
\operatorname{Cov}(\Delta\mathbf A_n,\Delta\mathbf A_m)
\right|
<\infty,
$$
where $\Delta\mathbf A_n$ is the signed fluctuation of shell $n$'s wake-acceleration contribution about its neutral ensemble mean. The condition prevents correlations from rebuilding a divergent coherent tail from individually decaying shells. Under that condition the neutral far-population contribution converges in the receiver-centered exhaustion sense. This exhaustion is fixed by the receiver event's causal-root ledger and expanding receiver-centered shells, not by an arbitrary rearrangement of a conditionally convergent spatial series. This is a weak homogeneous medium result, not a blanket convergence claim for coherent strong-field regions or unneutralized source populations.

It also controls only fluctuations about a zero shell mean. For a weak density gradient
$$
\rho_{\mathrm{NS}}(\mathbf X)
=
\rho_0+\mathbf g_\rho\cdot\mathbf X+O(\|\mathbf X\|^2),
$$
the additional gravity-side obligation is to compute the neutral-cell multipole and prove convergence of
$$
\sum_n\mathbb E[\Delta\mathbf A_n\mid\mathbf g_\rho].
$$
That mean row, rather than the homogeneous variance proof, must supply the leading constitutive response to $\mathbf g_\rho$. Until the neutral-cell multipole and its shell falloff are derived, the homogeneous result does not settle the weak-gradient or Seeliger problem.

The spacetime recovery stack depends on four load-bearing hypotheses that must remain visible:

| Hypothesis | Role | Current status |
| --- | --- | --- |
| Family-A Lorentz-link | Identifies moving-envelope flattening as the carrier of clock and ruler retuning. | Kinematic closure target in [Lorentz Kinematics](./lorentz-kinematics.md); no confirmation from evolved moving branches. |
| Shared clock/signal delay | Sets $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ so clocks and Shapiro delay consume one scalar delay response. | Conditional weak-field branch, not a derived identity. |
| Local clock/sea cadence tracking | Identifies a matter-clock cadence change with the local $C_N=\Gamma_N^{-1}$ readout in the same cell. | Same-record closure target, with mismatch retained explicitly. |
| Family-A ambient selection | Selects Family-A carriers as the physical Noether sea population. | Comparative selection hypothesis; not established by prescribed geometry alone. |

## Core Definition

The **Noether sea** is the ambient physical medium formed by dense, balanced populations of coupled neutral Noether braids in the Euclidean void.

It is:

- **Emergent:** it is built from architrino assemblies, not added as a second primitive substance.
- **Physical:** it carries energy, stress, density, orientation, and response properties.
- **Dynamic:** it can flow, strain, polarize, compress, relax, and support propagating disturbances.
- **Ambient:** it surrounds and couples to matter assemblies, clocks, rulers, photons, and strong-field regions.
- **Medium-level:** it is neither the empty void nor the observer-level effective metric.

The bridge term **spacetime medium** may be used when translating toward effective spacetime language. The canonical ontology name remains **Noether sea**.

In prose, use **Noether sea** both as the standalone proper noun and as the compound modifier before another noun, as in **Noether sea density** or **Noether sea delay factor**. Reserve **Noether Sea** for title contexts and never hyphenate the term.

## Boundary With the Euclidean Void

The Euclidean void and the Noether sea must remain distinct. The void is the fixed spatial container; the Noether sea is the active content whose state changes inside it.

| **Layer** | **Status** | **What It Owns** |
|:---|:---|:---|
| Euclidean void | Fundamental substrate | Fixed spatial container $\mathbb{R}^3$, metric $h_{ij}=\delta_{ij}$, coordinate identity |
| Noether sea | Emergent physical medium | Density, stress, flow, orientation, energy storage, delay-factor response |
| Effective spacetime | Observer-level reconstruction | Clock rates, ruler behavior, signal propagation, effective metric |

The void does not curve, expand, contract, or carry energy. The Noether sea, as physical content, can carry energy and stress, flow, strain, compress, relax, and change its response variables. Effective curvature and effective expansion are therefore derived descriptions of Noether sea response, not curvature or expansion of the void itself.

At a fixed coordinate point $\mathbf X$ and absolute time $T$, the Noether sea state may change:
$$
\rho_{\text{NS}}(\mathbf X,T),\quad
\Sigma_{\text{sea}}(\mathbf X,T),\quad
\mathbf{u}_{\text{sea}}(\mathbf X,T)
$$
without changing the identity of the underlying void point.

## Absolute Record and Observer Readout

The complete substrate description is the universe state

$$
\mathbb{U}_{\text{now}}\equiv S(T)
$$

This state is not an observer frame. It is the absolute-time record of positions, velocities, assemblies, causal wakes, Noether sea variables, and path-history ledgers inside the Euclidean void. Physical observers recover clock rates, photon frequencies, energies, distances, and effective geometry only after their local assemblies couple to part of that record.

This distinction matters most in redshift language. The void does not stretch, and absolute time does not slow. A source assembly emits a photon-channel packet with a local emission ledger; the packet follows a definite path history through the Noether sea; and the receiver assembly samples the packet using its own local cadence. The measured energy is therefore a receiver-coupling result,

$$
E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}
$$

not a primitive frame-free photon scalar. The redshift task is to compute the endpoint cadence, launch geometry, and path-history propagation terms from the same $S(T)$ record rather than changing explanation between gravitational, relative-motion, and cosmological cases.

## Composition

The Noether sea is composed of neutral Noether braid assemblies. The best-developed prescribed case is Family A, made from three indexed electrino:positrino binaries. A Noether braid itself is not elementary; its stability is a downstream assembly result.

This composition statement is a theorem target, not a permission to ignore other possible architrino assemblies. The universe-state inventory may contain many finite assembly classes: bare binaries, transient multi-body reaction corridors, larger $N$-site branches, charged assemblies, photon-channel packets, neutrino-like near-photon assemblies, and strong-field branch variants. Most of those may be physically real without being the ambient Noether sea population. The medium claim is that one neutral assembly class supplies the weak homogeneous background whose coarse variables recover clocks, rulers, signal speeds, pressure, inertia, and effective metric behavior.

For a candidate ambient assembly class $\mathfrak C$, define the selection residual

$$
\mathcal R_{\mathrm{sea\text{-}class}}(\mathfrak C)
=
\max\!\left(
\mathcal R_{\mathrm{ret}},
\mathcal R_{\mathrm{neutral}},
\mathcal R_{\mathrm{conv}},
\mathcal R_{\mathrm{pack}},
\mathcal R_{\mathrm{trans}},
\mathcal R_{\mathrm{resp}},
\mathcal R_{\mathrm{build}},
\mathcal R_{\mathrm{abund}}
\right)
$$

The entries are, respectively: retained-branch closure; local polarity neutrality and pro/anti balance; convergence of the far-population wake sum; dense packing without uncontrolled branch disruption; weak homogeneous transparency to ordinary matter, photon-channel packets, and neutrino-like assemblies; a shared constitutive response for $n$, $\chi_{\text{sea}}$, $\Gamma_N$, stress, and effective metric channels; compatibility with the particle-building branch program; and a production, recycling, or relaxation route that gives the class sufficient abundance.

Transparency is therefore a bounded-response condition, not a claim of zero interaction. The Noether sea has to keep direct scattering and loss below tolerance while still supplying the response assigned to clocks, photons, matter, and neutrino-like channels. For a channel family $X\in\{\gamma,\mathrm{clk},\mathrm{mat},\nu\}$, where $\mathrm{clk}$ denotes the physical-clock channel whose observer readout is derived clock time $\tau$, the Noether sea must make direct loss, scattering, and preferred-frame visibility small while still supplying the constitutive response that the channel is supposed to recover. A compact two-row check is

$$
\mathcal R_{\mathrm{vis/resp},X}
=
\max\!\left(
\frac{\mathcal R_{\mathrm{loss/scat},X}+\mathcal R_{\mathrm{LV},X}}{\epsilon_{\mathrm{vis},X}},
\frac{\left\|O_X^{\mathrm{eff}}-\Pi_X[\Theta_{\mathrm{sea}},\mathcal L_X]\right\|}{\epsilon_{\mathrm{resp},X}}
\right).
$$

The first term enforces weak homogeneous transparency and hides ordinary medium-drift leakage; the second term enforces that clocks, photon transport, matter response, or neutrino-like propagation still consume the same retained Noether sea record. A candidate class that sets the coupling to zero passes the visibility row trivially while failing the response row: it becomes invisible, but it no longer reconstructs the effective observables assigned to the Noether sea.

The Family-A-centered Noether sea claim is therefore the statement that the corresponding class $\mathfrak C_A$—prescribed one-braid records whose three axes run from mutual orthogonality toward the group-translation direction along $\lambda_A$—can drive $\mathcal R_{\mathrm{sea\text{-}class}}(\mathfrak C_A)$ below the accepted tolerance while other candidate classes either fail one of the rows or are classified as localized matter, radiation, reaction, or strong-field branches. This is stronger than saying that Family-A exclusion envelopes are visually plausible. It is a comparative selection problem over assembly classes, not a consequence of the taxonomy definition.

The large-scale Noether sea is modeled as a balanced population of complementary Noether braid orientations.

This pro/anti distinction is the geometric and topological ordered-orientation label, not polarity conjugation, matter/antimatter, or a net electric-charge distinction. Global polarity conjugation leaves a braid's worldlines and therefore its pro/anti orientation unchanged. Both orientations are electrically and polarity neutral at the braid level. Their coupled orientation balance is part of the working explanation for how the Noether sea remains comparatively transparent and non-reactive at large scales while still carrying stress and response; it does not assert a matter/antimatter population balance.

Transparency has a candidate mechanism at the level of a single transiting assembly, offered here at effective grade. A propagating assembly is sub-field-speed, so its wake runs ahead of it and reaches the medium before the body does; the sea assemblies do not move aside like obstacles but re-phase — reorient in response to the forerunning wake, then relax. Transparency is then *elastic parting*: the medium opens ahead through wake-induced polarization and closes behind, leaving no net transit excitation, so no energy or momentum is deposited by the completed passage and the transit is lossless. The wake-level statement is that the transiting and ambient wakes superpose, while the assembly-level statement is that the perturbation produced by passage is reversible. Imperfect closure — a residual excitation left downstream — is the microscopic content of the loss, scattering, and preferred-frame-visibility terms the selection residual above bounds: a fully transparent class is one whose parting is elastic to the required tolerance.

This reversible transit row does not erase persistent gravitational loading. A source assembly that remains in a region supplies a quasi-stationary boundary condition and maintains a polarized Noether sea response; a transiting assembly supplies a time-dependent perturbation about that loaded state. Lossless closure requires the latter perturbation to relax after passage, not the former source-supported polarization to vanish. The constitutive map must derive both responses from the same wake record and distinguish them by source persistence and response timescale rather than by changing the coupling law.

The detailed pro/anti basis, density split, imbalance stability, local coupling law, and candidate cluster motifs belong in [Noether Sea Pro/Anti Coupling](noether-sea-pro-anti-coupling.md). This page only fixes the Noether sea ontology those assembly hypotheses serve.

## Local Branches in the Medium

The Noether sea changes how isolated assembly calculations should be read. A truly isolated Noether braid or matter assembly is a limiting seed chart, not the generic physical situation. The physical target is a local branch retained inside the surrounding Noether sea state and nearby-assembly record.

### Assembly-Medium Metabolism

At the ontology level, a matter braid embedded in the Noether sea is an open assembly, not an isolated clockwork object. It exchanges angular momentum and causal-wake structure with neighboring neutral braids while preserving its own closure ledger. The exact boundary between assembly-locked and ambient contributions is the channel-dependent [assembly-Noether sea interface diagnostic](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic), $D_{a,X}$; spatial proximity alone does not decide which record owns a contribution.

The current B1 evidence sharpens that picture without closing the full medium problem. B1 here means the prescribed chart with one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense; per-binary radii, axial half-separations, transverse orbit radii, and phases remain independent. At measurement level, the forward torque to the source-record circulation channel and the axial support supplied by a phase-matched responsive sea are readings of the prescribed response records, pending a linked instrument record; the tested axially organized responses do not supply the missing equatorial support. At mechanism-estimate level, this motivates an angular-momentum metabolism: the sea feeds an assembly channel, internal wake transport redistributes that input, and outgoing wake returns angular momentum to the sea's orientation order. A self-consistent closed loop has not yet been derived, so the metabolism is a constitutive closure target rather than a retained-branch theorem.

The static cage result gives the complementary effective picture. When a braid's support deficit selects a polar-covering neighbor cage, the acceleration-balanced candidate is a braid-plus-cage complex (stability ledger open), closer to a molecule in a solvent than to a point object fixed at a lattice site. That comparison is effective framing, not ontology: the underlying objects remain Noether braid assemblies and causal wakes, and the cage still requires its own reciprocal acceleration and stability ledger. Together, the metabolism and cage pictures explain why the Noether sea is part of the assembly's physical boundary conditions rather than decorative background.

For a candidate local branch $B$, the stronger closure form is not

$$
\mathcal{R}_{\mathrm{branch}}(B)=0
$$

in empty surroundings. It is

$$
\mathcal{R}_{\mathrm{branch}}
\left(
B;\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal{H}_{\partial\Omega}
\right)=0
$$

where $\Theta_{\mathrm{sea}}$ records the local Noether sea density, cadence, orientation, strain, and delay-response state; $\Theta_{\mathrm{asm}}$ records nearby resolved assemblies, including assemblies that later map to Standard Model particle language; and $\mathcal{H}_{\partial\Omega}$ records the causal-wake and event data entering the local region through its boundary. These are not extra fit parameters. They are the retained part of the same absolute record $S(T)$ needed to decide whether the local branch persists.

At the acceleration-ledger level this means that a local architrino row should be understood schematically as

$$
\mathbf A_i
=
\mathbf A_{i,\mathrm{internal}}
+
\mathbf A_{i,\mathrm{sea}}
+
\mathbf A_{i,\mathrm{asm}}
+
\mathbf A_{i,\partial\Omega}
$$

with every non-internal contribution either computed from the surrounding Noether sea state and assembly record or explicitly assigned a residual. The isolated equation is recovered only when $\mathbf A_{i,\mathrm{sea}}$, $\mathbf A_{i,\mathrm{asm}}$, and $\mathbf A_{i,\partial\Omega}$ vanish, are homogeneous enough to collapse into fixed boundary data, or are below the declared tolerance.

Reaction records use the same embedding discipline. The Noether sea is not a passive stage when a vertex recruits neutral Noether braid content, returns unbound or reclassified content to the ambient medium, changes local cadence or excitation, or absorbs recoil and remnant energy. For a finite reaction window $\Omega$, the Noether sea participation row can be written schematically as
$$
\Delta N_{\mathrm{sea}}^{\Omega}
=
N_{\mathrm{return}}
-N_{\mathrm{recruit}}
+N_{\mathrm{prod}}
-N_{\mathrm{dissoc}}
-N_{\mathrm{reclass}}
+N_{\mathrm{relax}}
+R_{N,\Omega}.
$$
Each term must be tied to the same identity, energy, momentum, angular-momentum, and causal-wake ledger used by the local reaction. If a reaction changes apparent particle inventory while leaving the Noether sea row undeclared, the source story is incomplete rather than closed.

This does not require solving the entire universe before studying one assembly. It does require a controlled embedding record. The useful analytic hierarchy is:

1. solve or approximate a homogeneous Noether sea record;
2. solve the candidate branch against that local medium and nearby-assembly record;
3. check the branch's back-reaction on $\rho_{\text{NS}}$, $f_N$, $\chi_{\text{sea}}$, cadence, orientation, and event ledgers.

Assembly emergence is therefore not emergence from empty isolation. It is local retention inside an already populated Noether sea, with isolated analytical branches serving as seed charts, symmetry limits, or comparison cases.

## State Variables

The spacetime branch uses the following canonical total-density symbols:

$$
\rho_{\text{NS}}(\mathbf X,T)
$$

with normalized density

$$
n(\mathbf X,T)
=\frac{\rho_{\text{NS}}(\mathbf X,T)}{\rho_{\text{NS},0}}
$$

The Noether sea delay factor is written

$$
\chi_{\text{sea}}(\mathbf X,T)
=
\frac{c_f}{c_{\text{eff}}(\mathbf X,T)}
$$

It plays the role that refractive index plays in ordinary optical analogies, but it is a native Noether sea response variable. Do not use $n$ for this delay factor; $n$ is reserved for normalized Noether braid density.

Clock and spectral comparisons may also extract the Noether sea cadence-stretch diagnostic

$$
\Gamma_N(\mathbf X,T)
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf X,T)},
\qquad
C_N(\mathbf X,T)=\Gamma_N^{-1}(\mathbf X,T)
$$

Here $\Omega_N$ is a representative local Noether sea braid cadence and $C_N$ is the corresponding clock-rate factor. This pair is not a new density or delay factor: $n$ tracks normalized Noether braid density, $\chi_{\text{sea}}$ tracks effective causal delay, and $\Gamma_N$ tracks cadence stretch. The clock extraction and hydrogen spectral use of this diagnostic belong in [Proper Time and Time Dilation](proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target).

When a calculation needs pro/anti subcomponents, orientation imbalance, or coupling-regime stability thresholds, use [Noether Sea Pro/Anti Coupling](noether-sea-pro-anti-coupling.md).

## Medium Properties

The Noether sea is characterized by collective variables, not by a new point-particle inventory.

Important medium properties include:

- **Noether braid density:** $\rho_{\text{NS}}(\mathbf X,T)$ and normalized density $n(\mathbf X,T)$.
- **Energy density:** approximately $\rho_{\text{NS}}E_{\text{braid}}$ at the coarse level, with corrections from stress, excitation, and coupling.
- **Orientation and strain:** local ordering of braid axes and deformation away from equilibrium.
- **Flow or drift:** collective motion of the Noether sea relative to the absolute frame.
- **Compliance:** how strongly the Noether sea responds to compression, shear, polarization, and alignment loading.
- **Delay-factor response:** how $\chi_{\text{sea}}$, signal propagation, clock behavior, and effective light speed depend on local Noether sea state.

These are medium variables. They are not properties of the Euclidean void.

## Continuum Balance and Constitutive Closure

The first continuum obligation for the Noether sea is local bookkeeping of conserved or slowly relaxing coarse variables. For a fixed control region $V\subset\Sigma_T$, a density variable is mature only when its integral changes by boundary flux, declared source, and residual:
$$
\frac{d}{dT}\int_V \rho_{\text{NS}}\,dV
+
\int_{\partial V}\rho_{\text{NS}}\mathbf{u}_{\mathrm{sea}}\cdot\hat{\mathbf n}\,dA
=
\int_V S_{\rho}\,dV
+
R_{\rho,V}
$$
Equivalently, on resolved windows,
$$
\partial_T\rho_{\text{NS}}
+\nabla\cdot(\rho_{\text{NS}}\mathbf{u}_{\mathrm{sea}})
=
S_{\rho}
+r_{\rho}
$$
The same standard applies to cadence, orientation, strain, and energy variables. A continuum equation is therefore not added because fluids are a good analogy; it is admitted only when it is the low-moment projection of the resolved Noether braid population and the residual decreases under refinement.

The source term should be decomposed before it is used in cosmology or reaction provenance:
$$
S_{\rho}
=
S_{\mathrm{prod}}
+S_{\mathrm{return}}
-S_{\mathrm{recruit}}
-S_{\mathrm{dissoc}}
-S_{\mathrm{reclass}}
+S_{\mathrm{relax}}.
$$
Production, return, recruitment, dissociation, reclassification, and relaxation are not separate ontologies. They are bookkeeping channels for how neutral Noether braid content enters, leaves, breaks apart, or changes class inside the local Noether sea population. A long-time Noether sea model is credible only when these rows share one continuity ledger with the energy and reaction records.

Strong-field recycling and pair-channel activity sharpen the production row in the same requirement. A compact source may be a net source, sink, or reclassifier of Noether sea content only after the local balance separates diffuse medium loading from collimated release and from visible pair-channel products. One useful refinement is
$$
S_{\mathrm{prod}}
=
S_{\mathrm{BH,diff}}
+S_{\mathrm{BH,col}}
+S_{\mathrm{pair}},
$$
which gives the full source balance
$$
S_{\rho}
=
S_{\mathrm{BH,diff}}
+S_{\mathrm{BH,col}}
+S_{\mathrm{pair}}
+S_{\mathrm{return}}
-S_{\mathrm{recruit}}
-S_{\mathrm{dissoc}}
-S_{\mathrm{reclass}}
+S_{\mathrm{relax}}.
$$
Here $S_{\mathrm{BH,diff}}$ denotes broad medium loading, $S_{\mathrm{BH,col}}$ denotes collimated or jet-like release that later couples back to the medium, and $S_{\mathrm{pair}}$ denotes pair-channel participation controlled by local density, cadence, excitation, and threshold state. None of these terms creates substrate from nothing. Each is a projection of architrino and Noether braid inventory through a declared reaction, release, or relaxation record.

The hydrodynamic comparison also has a domain warning: quantizing the coarse variable does not by itself reveal the microscopic contents. In a medium analogy, phonon quantization recovers collective excitations of the continuum; it does not recover the atoms. For the Noether sea, this means that a quantized effective metric, scalar, or vector channel is a recovery benchmark for long-wavelength behavior, while the microscopic derivation still has to come from Noether braid population dynamics, causal wakes, and branch ledgers.

The same guardrail applies to superfluid analogies. A Noether sea passage should use literal superfluid language only if it supplies a technical analogue such as an order parameter, transport equation, critical criterion, quantized-circulation analogue, or two-state response split. Otherwise the safe translation is medium response: density, flow, cadence, orientation, strain, delay factor, and excitation variables carried by a resolved Noether sea record.

The kinetic-theory lesson is that hydrodynamic variables are the slow variables associated with conserved quantities. For the Noether sea, the candidate slow state is
$$
\mathcal{N}_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
\mathbf{u}_{\mathrm{sea}},
e_{\mathrm{sea}},
\boldsymbol\theta_{\mathrm{sea}},
f_N
\right)
$$
where $e_{\mathrm{sea}}$ is the retained medium energy density and $\boldsymbol\theta_{\mathrm{sea}}$ packages the declared orientation, delay, and envelope variables as a reduced projection of the full state. The moment-closure residual is
$$
\mathcal R_{\mathrm{mom}}
=
\max_a
\frac{
\left\|
\partial_T M_a[\mathcal{N}_{\mathrm{sea}}]
+\nabla\cdot J_a[\mathcal{N}_{\mathrm{sea}}]
-S_a[\mathcal{N}_{\mathrm{sea}}]
\right\|
}{
\left\|\partial_T M_a\right\|
+\left\|\nabla\cdot J_a\right\|
+\left\|S_a\right\|
+\varepsilon
}
$$
with $a$ ranging over the retained density, momentum, energy, cadence, and orientation moments. This residual is the guardrail against closing the Noether sea by naming a fluid-like equation while hiding unresolved causal-wake memory in fitted coefficients.

Analogue-gravity comparisons sharpen this point. In an ordinary acoustic medium, the effective metric seen by small sound perturbations is fixed by medium density, flow, and sound speed, for example schematically
$$
(g_{\mathrm{ac}})_{\mu\nu}
\propto
\frac{\rho_0}{c_s}
\begin{pmatrix}
-(c_s^2-\|\mathbf{u}_{\mathrm{fluid}}\|^2) & -u_{\mathrm{fluid},j} \\
-u_{\mathrm{fluid},i} & h_{ij}
\end{pmatrix}
$$
The comparison is useful because it keeps the levels separated: the perturbation metric is a constitutive readout, while the underlying medium still obeys its own dynamics. The Noether sea target has the same form of obligation,
$$
g_{\mu\nu}^{\mathrm{eff}}
=
\mathcal{G}_{\mu\nu}\!\left[\mathcal{N}_{\mathrm{sea}}\right]
+\mathcal{R}_{\mathrm{metric}}
$$
where $\mathcal{G}_{\mu\nu}$ must be derived from the retained density, flow, cadence, orientation, strain, and causal-wake records. A metric row that fits clock, signal, pressure, or lensing behavior with separate coefficients for each observable is not yet a Noether sea constitutive law.

Hu's stochastic-gravity comparison sharpens the next rung above moment closure. Mean-field variables are not enough; fluctuations and correlations carry information about the mesoscopic state. Let $\delta T_A^{\mathrm{eff}}$ denote observer-level stress, cadence, or response-channel fluctuations induced by a branch record $\theta$, and let $C_{AB}^{\theta}(x,y)$ be the corresponding two-point correlation:
$$
C_{AB}^{\theta}(x,y)
=
\left\langle
\delta T_A^{\mathrm{eff}}(x)\,
\delta T_B^{\mathrm{eff}}(y)
\right\rangle_{\theta}
$$
The Noether sea side must supply this from unresolved deterministic histories, not from an independent stochastic metric postulate. A compact correlation-hierarchy residual is
$$
\mathcal{R}_{\mathrm{corr},n}(\theta)
=
\frac{
\left\|
C_{\mathrm{obs}}^{(n)}-
\Pi_{\mathrm{corr}}^{(n)}[\mu_{\Omega,\theta},\mathcal{N}_{\mathrm{sea}},\mathcal{H}_{\Omega}^{W}]
\right\|
}{\epsilon_n},
\qquad
n=2,3,\ldots
$$
Here $\Pi_{\mathrm{corr}}^{(n)}$ is the declared projection from retained Noether sea histories to the $n$-point observer-level correlation. Passing the $n=2$ test is the analogue of the noise-kernel step in stochastic gravity; higher $n$ tests are the kinetic-theory route toward mesoscopic closure.

Constitutive response must be stated as a map from the same state variables. Here $\chi_{AB}$ is a response susceptibility indexed by observable channels; it is not the scalar delay factor $\chi_{\mathrm{sea}}$. A weak linear row has the schematic form
$$
\delta Y_A(\omega,\mathbf{k})
=
\sum_B
\chi_{AB}(\omega,\mathbf{k})\,
\delta X_B(\omega,\mathbf{k})
+R_A^{\chi}
$$
where $X_B$ are declared perturbations of $\mathcal{N}_{\mathrm{sea}}$ and $Y_A$ are observer-channel readouts such as delay factor, stress, cadence, or clock response. Causality requires the time-domain kernel to have delayed support only, which becomes an analyticity and dispersion check in frequency space. The practical residual is
$$
\mathcal R_{\mathrm{KK}}(\chi_{AB})
=
\frac{
\left\|
\operatorname{Re}\chi_{AB}(\omega)
-
\mathcal H\!\left(\operatorname{Im}\chi_{AB}\right)(\omega)
\right\|_{\omega}
}{
\left\|\operatorname{Re}\chi_{AB}\right\|_{\omega}
+
\left\|\mathcal H\!\left(\operatorname{Im}\chi_{AB}\right)\right\|_{\omega}
+\varepsilon
}
$$
where $\mathcal H$ is the principal-value Hilbert transform used by the packet. A nonzero residual means the proposed response row is not yet a causal Noether sea constitutive law.

## Equilibrium Transport Hypothesis

A provisional cosmology-facing hypothesis treats the Noether sea as a dense neighbor-coupled population of Noether braids whose individual action transactions are discrete while the ensemble response can be smooth. Most braids in a weak deep-space region have other Noether braids as their nearest dynamical neighbors. Photons and neutrinos can traverse the population, and gravitational waves can perturb it, but the baseline relaxation law is a braid-to-braid medium law.

Let $\nu_N$ denote an ordinary frequency extracted from a representative Noether braid cadence state. The local braid energy scale is then

$$
E_N=h\nu_N
$$

The point of this expression is not to add a new quantum postulate at the Noether sea level. It records the same closed-cycle action accounting used in the [Cadence-Scale Retuning Hypothesis](../noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis): a cadence state carries energy as action per cycle times cycles per unit absolute time. A single Noether braid may cross a neighboring branch through an $h$-scale ledger step, while a large asynchronous ensemble can produce an apparently smooth drift in the coarse variables.

At the single Noether braid level, each accepted $h$-scale transfer requires the braid to retune its cadence-scale closure. The retuning may appear as a cadence shift, indexed-binary radius shift, envelope-scale change, envelope-ratio change, orientation or strain update, or modified coupling to neighboring braids. In the simplest fixed-speed indexed-binary approximation,

$$
v_N\sim 2\pi R_N\nu_N,
\qquad
R_N\nu_N\approx\text{constant}
$$

so a higher accepted cadence corresponds to a smaller representative scale, while a lower accepted cadence corresponds to a larger representative scale. A full Family-A record can partition the same transaction across its three indexed binaries, so this relation is a first estimate rather than a complete closure law.

At the ensemble level, let $f_N(\nu,\mathbf X,T)$ be the local distribution of Noether braid cadence states. The cadence-space current is the coarse-grained flux of many branchwise retunings:

$$
J_\nu
\sim
f_N
\left\langle
\dot{\nu}_N
\right\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}
$$

where the average is taken over accepted $h$-scale transactions inside the coarse-graining cell. Once the single-braid [retuning map](../noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis) $\mathcal{R}_{\mathrm{cyc}}^{(q,\varsigma)}$ is specified, the first current estimate is

$$
J_\nu(\nu,\mathbf X,T)
=
\sum_{\varsigma=\pm1}
f_N(\nu,\mathbf X,T)\,
r_\varsigma(\nu,\mathbf X,T)\,
\Delta\nu_N^{(q,\varsigma)}
+
O\!\left((\Delta\nu_N)^2\partial_\nu f_N\right)
$$

where $r_\varsigma$ is the local rate density of accepted $\varsigma$ transactions per braid and $\Delta\nu_N^{(q,\varsigma)}$ is the cadence component extracted from $\mathcal{R}_{\mathrm{cyc}}^{(q,\varsigma)}$. Deep space can therefore look smooth without making the underlying transactions continuous. Moving from deep space toward a solar-system environment should not be modeled as a scalar temperature increase alone; it is a bias in the local population toward higher cadence, stronger strain, stronger alignment, and larger gradients. Near a proton or other matter assembly, the neighboring Noether braids see a sharper boundary condition and retune more discretely around the assembly.

### Temperature-Conditioned Branch Transition Target

A temperature channel can enter this transport law only through the same retained ensemble record used to define [temperature](../dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable). It is not a property of one Noether braid, and it does not change $h$. The braid-level event remains an accepted branch-ledger transition with $\Delta A_{\mathrm{cyc}}=\pm h$; temperature can only bias the rates at which those admissible transitions are accepted inside a declared coarse-graining cell.

When the retained record licenses a temperature variable $T_{\mathcal Q,W}$, the temperature-conditioned part of the cadence current has the candidate form

$$
J_\nu^{(T)}(\nu,\mathbf X,T)
=
\sum_{\varsigma=\pm1}
f_N(\nu,\mathbf X,T)\,
r_\varsigma(\nu,\mathbf X,T;T_{\mathcal Q,W})\,
\Delta\nu_N^{(q,\varsigma)}
+
O\!\left((\Delta\nu_N)^2\partial_\nu f_N\right)
$$

where $r_\varsigma(\nu,\mathbf X,T;T_{\mathcal Q,W})$ is the accepted rate for the $\varsigma$ branch transition under the same temperature-availability record. The detailed-balance residual for a neighboring $+h/-h$ pair is

$$
\mathcal R_{\mathrm{db}}^{(T)}(\nu,\mathbf X,T)
=
f_N(\nu,\mathbf X,T)\,
r_+(\nu,\mathbf X,T;T_{\mathcal Q,W})
-
f_N(\nu+\Delta\nu_N^{(q,+)},\mathbf X,T)\,
r_-(\nu+\Delta\nu_N^{(q,+)},\mathbf X,T;T_{\mathcal Q,W})
$$

This pair test assumes the reverse increment returns to the starting cadence, $\Delta\nu_N^{(q,-)}(\nu+\Delta\nu_N^{(q,+)})=-\Delta\nu_N^{(q,+)}(\nu)$, so the second rate is evaluated on the paired reverse branch rather than an unrelated local decrement.

If $\mathcal R_{\mathrm{db}}^{(T)}=0$ after coarse-graining, individual $+h$ and $-h$ ledger transitions may still occur, but the temperature channel produces no net cadence-space drift. If the residual is nonzero, the signed imbalance contributes to $J_\nu^{(T)}$ and therefore biases cadence-scale retuning. In the fixed-speed indexed-binary approximation above, positive cadence drift trends toward smaller representative scale, while negative cadence drift trends toward larger representative scale. The full theorem target is to derive the rates $r_\varsigma$, the retuning increments $\Delta\nu_N^{(q,\varsigma)}$, and the indexed-binary partition of the same action transaction from a closed Family-A branch record rather than treating temperature as an external driver.

### Ambient-Branch Acceptance

The same smoothing record supplies the ambient-branch acceptance used at assembly boundaries. For a neutral-braid quantity $f_k(T)$ in a coarse window $\Omega_\ell$, define

$$
\left\langle f\right\rangle_{\mathrm{sea},\ell}(\mathbf X,T)
=
\frac{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
W_\ell(\mathbf X-\mathbf X_k(T))f_k(T)
}{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,T)}
W_\ell(\mathbf X-\mathbf X_k(T))
}
$$

The branch-level equilibrium test is not that every Noether braid has the same cadence. It is that, after all resolved assembly ledgers have been removed, an ambient branch belongs to the local neutral-braid population when its cadence lies within the smoothed distribution and the remaining pro/anti orientation balance is small. In symbolic form,

$$
\zeta_{\mathrm{sea}}^{(\ell)}
=
\chi_{\mathrm{comp}}^{(\ell)}
\exp
\!\left[
-
\frac{1}{2}
\left(
\Delta_{\mathrm{cad}}^2
+
\Delta_{\mathrm{bal}}^2
\right)
\right]
$$

where $\chi_{\mathrm{comp}}^{(\ell)}$ is the established ledger-complement indicator that removes branches phase-locked to resolved assemblies; it is neither $\chi_{\mathrm{sea}}$ nor the response susceptibility $\chi_{AB}$. The term $\Delta_{\mathrm{cad}}$ compares the branch cadence with $\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and $\Delta_{\mathrm{bal}}$ measures the residual neutral-pairing and orientation imbalance of the same window. The assembly-facing definition is given in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). The conceptual point is that a matter Noether braid can sit inside the same coordinate window as ambient Noether sea braids without becoming part of the ambient Noether sea record; ledger complement, not mere spatial proximity, makes the separation.

A candidate equilibrium-transport equation is

$$
\partial_T f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

Here $J_\nu$ is the current through frequency or cadence state space, $S_{\mathrm{BH}}$ is loading from black-hole recycling regions, $S_{\mathrm{GW}}$ is the perturbative contribution from gravitational-wave disturbances, and $R_{\mathrm{eq}}[f_N]$ is the local neighbor-equilibration operator. This equation is a derivation target, not a completed constitutive law. It becomes relevant to redshift only if the same $f_N$ record also determines $\Gamma_N$, $\chi_{\text{sea}}$, and the path-history propagation term $\mathcal{P}_{E\to R}$ used in the cosmology chapters.

### Absolute-Record Transport Target

The first absolute-record transport target packages those requirements into one map. For a photon-channel or spectral family $X$ emitted at $E$ and received at $R$, let $\mathcal S_{X,E\to R}$ be the restriction of $S(T)$ to the source branch, receiver branch, endpoint Noether sea cadence records, medium flow, causal wakes, and the path-history ledger relevant to that packet. The candidate transport map is

$$
\mathfrak T_X
\!\left[
\mathcal S_{X,E\to R}
\right]
=
\left(
\Gamma_{N,E},\,
\Gamma_{N,R},\,
B_X(E),\,
D_v,\,
Y_{X,E\to R}^{\mathrm{freq}},\,
Y_{X,E\to R}^{\mathrm{dur}}
\right),
\qquad
\mathcal P_{E\to R,X}
=
\exp(Y_{X,E\to R}^{\mathrm{freq}})
$$

The factor $B_X(E)$ is the source-branch emission factor for family $X$: it relates the actual emitted line frequency in the source branch at $E$ to the reference frequency $\nu_{X,0}$, with $B_X(E)=1$ on the reference branch. It is fixed by the source emission or calibration record, not by endpoint cadence, launch geometry, or path propagation.

The minimal state needed for the first executable closure is a projection of the absolute record, not a new ontology. For a segmented path $\gamma_{E\to R}=\{\Delta s_j\}_{j=1}^N$, use

$$
\mathcal S_{X,E\to R}^{\min}
=
\left(
\mathcal G_E,\,
\mathcal G_R,\,
\mathcal V_{E,R},\,
B_X(E),\,
\left\{
\mathcal K_{X,j},\Delta s_j
\right\}_{j=1}^{N}
\right)
$$

with endpoint records

$$
\mathcal G_Q
=
\left(
\mathbf g_N(Q),
\mathcal R_{\Gamma,Q}
\right),
\qquad
Q\in\{E,R\}
$$

launch record

$$
\mathcal V_{E,R}
=
\left(
\mathbf v_E,\mathbf v_R,\hat{\mathbf k},\mathcal R_v
\right)
$$

and segment record

$$
\mathcal K_{X,j}
=
\left(
\mathbf d_{\theta,j},\,
f_{N,j},\,
S_{\mathrm{BH},j},\,
S_{\mathrm{GW},j},\,
R_{\mathrm{eq},j},\,
\partial_\nu J_{\nu,j},\,
\delta_{u,j},\,
\sigma_{X,j},\,
\mathcal R_{\mathrm{coh},X,j}
\right)
$$

Here $\mathbf d_{\theta,j}=D_{\gamma}\boldsymbol\theta_{\mathrm{sea}}|_j$, $\delta_{u,j}=(\nabla\cdot\mathbf u_{\mathrm{sea}})_j$, and $\sigma_{X,j}=\hat k_a\hat k_b\Sigma_{\mathrm{sea},X,j}^{ab}$. The transport coefficients are one fixed row for the line family,

$$
\Theta_X
=
\left(
\mathbf b_N,\,
\mathbf p_X,\,
p_{\nu,X},\,
p_{u,X},\,
p_{\sigma,X}
\right)
$$

so the no-case-switch requirement is simply

$$
\Theta_X^{\mathrm{grav}}
=
\Theta_X^{\mathrm{motion}}
=
\Theta_X^{\mathrm{deep}}
\equiv
\Theta_X
$$

The three cases may supply different restrictions of $S(T)$: a strong endpoint deformation record, a launch-velocity record, or a long weak path-history record. They fail the absolute-record transport target if the coefficient row or explanatory class changes between those restrictions.

The endpoint cadence factors are extracted from the same local deformation record used by the clock program:

$$
\Gamma_{N,Q}
=
\exp
\!\left[
\mathbf b_N\cdot\mathbf g_N(Q)
+
\mathcal R_{\Gamma,Q}
\right],
\qquad
Q\in\{E,R\}
$$

where $\mathbf g_N=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\text{braid}}/R_{\text{braid},0}))^T$ in the local endpoint cell. Here $\lambda$ is the coarse transverse envelope scale ratio, $\xi=R_\parallel/R_\perp$ is its shape ratio, and $R_{\text{braid}}$ is a separately extracted local carrier-size observable. A compensated fit may treat the $\lambda$ and $R_{\text{braid}}$ rows as independent only when the extraction protocol varies them independently; their geometric definitions and covariance obligation are owned by [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md). The launch term is the causal-root compression of the emitted phase train. In the first weak-velocity form,

$$
D_v
=
\frac{
1-\boldsymbol\beta_R\cdot\hat{\mathbf k}
}{
1-\boldsymbol\beta_E\cdot\hat{\mathbf k}
}
\exp(\mathcal R_v),
\qquad
\boldsymbol\beta_Q
=
\frac{\mathbf v_Q}{c_{\gamma,Q}}
$$

where $\hat{\mathbf k}$ points from transmitter to receiver, $c_{\gamma,Q}$ is the local photon-channel speed used for the endpoint comparison, and $\mathcal R_v$ carries higher-order and multi-root Jacobian corrections from the exact causal ledger.

The path-history term is a line integral over the packet path through the Noether sea:

$$
Y_{X,E\to R}
=
\int_{\gamma_{E\to R}}
\alpha_{\mathrm{prop},X}
\!\left[
S(t_s)
\right]
\,ds
$$

A first local path-rate ansatz is

$$
\alpha_{\mathrm{prop},X}
=
\mathbf p_X\cdot
\frac{d\boldsymbol\theta_{\mathrm{sea}}}{ds}
-
p_{\nu,X}
\frac{\partial_\nu J_\nu}{f_N+\epsilon_f}
+
p_{u,X}\nabla\cdot\mathbf u_{\mathrm{sea}}
+
\mathcal R_{\mathrm{coh},X}
$$

with $\boldsymbol\theta_{\mathrm{sea}}=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi)^T$. The endpoint-only entry $\ln(R_{\text{braid}}/R_{\text{braid},0})$ is deliberately absent: it is a local assembly-clock readout, not a continuum medium field transported along the photon path. If a future constitutive derivation promotes a path-resolved braid-radius field, it must extend both $\boldsymbol\theta_{\mathrm{sea}}$ and $\mathbf p_X$ explicitly rather than allowing that channel to leak into $p_{\nu,X}$ or $p_{u,X}$. The sharper continuity form replaces the isolated current-divergence term with the source-balanced cadence residual. Along a photon path, let

$$
D_{\gamma}
=
c_{\gamma}^{-1}\partial_T
+
\hat{\mathbf k}\cdot\nabla
$$

where $\hat{\mathbf k}$ is the path tangent and $s$ is path length. The transport equation defines

$$
\mathcal C_N[f_N]
=
\frac{
S_{\mathrm{BH}}
+
S_{\mathrm{GW}}
-
R_{\mathrm{eq}}[f_N]
-
\partial_\nu J_\nu
}{
f_N+\epsilon_f
}
$$

Away from the regularization floor,

$$
\left(
\partial_T
+
\mathbf u_{\mathrm{sea}}\cdot\nabla
\right)
\ln f_N
\approx
\mathcal C_N[f_N]
-
\nabla\cdot\mathbf u_{\mathrm{sea}}
$$

Here $\mathcal C_N[f_N]$ is a cadence-space continuity residual for the distribution $f_N$; it is not the endpoint clock-rate factor $C_N=\Gamma_N^{-1}$.

The continuity-disciplined path rate is therefore

$$
\alpha_{\mathrm{prop},X}
=
\mathbf p_X\cdot
D_{\gamma}\boldsymbol\theta_{\mathrm{sea}}
+
p_{\nu,X}
\mathcal C_N[f_N]
+
p_{u,X}
\nabla\cdot\mathbf u_{\mathrm{sea}}
+
p_{\sigma,X}
\hat k_a\hat k_b
\Sigma_{\mathrm{sea},X}^{ab}
+
\mathcal R_{\mathrm{coh},X}
$$

Here $\Sigma_{\mathrm{sea},X}^{ab}$ is the channel-$X$, trace-free projection of the Noether sea stress $\Sigma_{\text{sea}}$ and vanishes in the isotropic weak limit. It is not a separate stress ontology. In a segmented calculation this is the computable update

$$
\alpha_{\mathrm{prop},X,j}
=
\mathbf p_X\cdot\mathbf d_{\theta,j}
+
p_{\nu,X}
\frac{
S_{\mathrm{BH},j}
+
S_{\mathrm{GW},j}
-
R_{\mathrm{eq},j}
-
\partial_\nu J_{\nu,j}
}{
f_{N,j}+\epsilon_f
}
+
p_{u,X}\delta_{u,j}
+
p_{\sigma,X}\sigma_{X,j}
+
\mathcal R_{\mathrm{coh},X,j}
$$

The coefficient rows $\mathbf b_N$ and $(\mathbf p_X,p_{\nu,X},p_{u,X},p_{\sigma,X})$ must be fixed from the declared Noether sea constitutive response and then reused across gravitational, relative-motion, and deep-space cases. A deep-space contribution may come from a persistent $\mathcal C_N[f_N]$, flow-divergence, or anisotropic-response record, but not from switching to a generic photon-energy-loss explanation.

The endpoint coefficient-row constraints are recovery constraints, not a fit to one redshift case. This transport chapter consumes the clock-row extraction owned by [Proper Time and Time Dilation](proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target): the homogeneous moving Noether braid branch fixes the coefficient of $-\ln\xi$ by requiring $\Gamma_N\to1/\xi\to\gamma_\star$, while the weak static endpoint branch fixes the scalar normalization

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

Under shared clock/signal delay closure, [Proper Time and Time Dilation](proper-time-and-time-dilation.md#shared-clocksignal-delay-closure) supplies $a_\chi=1+\gamma_{\mathrm{PPN}}$, so the endpoint condition consumed here is

$$
b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1
$$

In the GR-matching weak branch this is $b_n a_n+2b_\chi+b_\lambda a_\lambda+b_R a_R=1$. If the shared-delay residual is nonzero, the unconstrained equation with $a_\chi$ must be used and the residual must remain visible in the clock, Shapiro-delay, pressure-response, and redshift packets.

The minimal shared-delay packet is likewise imported from the clock-row owner. For $\gamma_{\mathrm{PPN}}=1$, it gives $a_\chi=2$ and $b_\chi=1/2$. Nonzero $n$, $\lambda$, or $R_{\text{braid}}$ contributions remain admissible only as a compensated static family that preserves the endpoint sum and the inverse clock-rate row; they are not free redshift-fit parameters.

The relative-motion recovery fixes the separation between launch geometry and transport coefficients. In a homogeneous weak record with $\mathbf g_N(E)=\mathbf g_N(R)=0$, $B_X(E)=1$, and $\mathcal K_{X,j}=0$ for every segment,

$$
Z_X
=
\ln(1+z_X)
=
-\ln D_v,
\qquad
Y_{X,E\to R}=0
$$

Thus the launch factor carries the ordinary first-order Doppler or phase-compression term; no component of $(\mathbf p_X,p_{\nu,X},p_{u,X},p_{\sigma,X})$ may be adjusted to recover a pure relative-motion redshift.

Endpoint-subtracted redshift gives the corresponding isolation test for the path row. From

$$
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
-\ln D_v
+Y_{X,E\to R}
-\ln B_X(E)
$$

the replayed propagation term is

$$
Y_{X,E\to R}^{\mathrm{sub}}
=
\ln(1+z_X)
-\left(
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
\right)
+\ln D_v
+\ln B_X(E)
$$

In a weak static endpoint comparison,

$$
\ln\Gamma_{N,Q}
=
\left(
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R
\right)
\frac{U_Q}{c_0^2}
+O\!\left(\frac{U_Q^2}{c_0^4}\right),
\qquad
Q\in\{E,R\}
$$

Endpoint-subtracted replay therefore constrains the propagation row only after the endpoint scalar is fixed. A compensated static family is invisible to this first-order subtraction when it preserves $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$; it becomes disfavored only if it leaves an endpoint residual that the path-history row must repair.

The deep-space continuity packet constrains the remaining path row by endpoint-subtracted replay:

$$
Z_{\mathrm{prop},X}
=
\sum_{j=1}^{N}
\left[
\mathbf p_X\cdot\mathbf d_{\theta,j}
+p_{\nu,X}\mathcal C_{N,j}
+p_{u,X}\delta_{u,j}
+p_{\sigma,X}\sigma_{X,j}
+\mathcal R_{\mathrm{coh},X,j}
\right]
\Delta s_j
$$

with

$$
\mathcal C_{N,j}
=
\frac{
S_{\mathrm{BH},j}
+S_{\mathrm{GW},j}
-R_{\mathrm{eq},j}
-\partial_\nu J_{\nu,j}
}{
f_{N,j}+\epsilon_f
}
$$

This equation fixes the sign convention and the shared-row obligation for deep-space transport, but it does not yet determine $\mathbf p_X$, $p_{\nu,X}$, $p_{u,X}$, or $p_{\sigma,X}$ individually. They remain constitutive freedoms until independent segment records vary the corresponding Noether sea gradients, cadence residual, flow divergence, and anisotropic response. The first observable falsifiers are the existing transport diagnostics: chromaticity residuals for line-family dependence, time-dilation residuals for frequency/cadence splitting, image-bundle variance for anisotropic or flow-induced beam spread, and directional residuals for unmodeled large-scale Noether sea structure.

The coherence residue is admissible only if the same $Y_X$ passes the observational transport tests,

$$
\operatorname{Var}_{\perp}(Y_X)
\le
\epsilon_{\mathrm{img},X}^2,
\qquad
\left|
\partial_{\ln\nu_X}Y_X
\right|
\le
\epsilon_{\mathrm{chrom},X},
\qquad
\left|
Y_X^{\mathrm{freq}}
-
Y_X^{\mathrm{dur}}
\right|
\le
\epsilon_{\mathrm{td},X}
$$

The two transport outputs are operationally defined by the measured phase frequency and packet-envelope duration:
$$
Y_{X,E\to R}^{\mathrm{freq}}
=
-\ln\!\left[
\frac{\nu_{\mathrm{obs},X}}
{\nu_{X,0}B_X(E)(\Gamma_{N,R}/\Gamma_{N,E})D_v}
\right],
$$
$$
Y_{X,E\to R}^{\mathrm{dur}}
=
\ln\!\left[
\frac{\Delta t_{\mathrm{obs},X}}
{\Delta t_{X,0}B_X(E)^{-1}(\Gamma_{N,E}/\Gamma_{N,R})D_v^{-1}}
\right].
$$
The same segmented path record must predict both. Their mismatch is the duration-side falsifier that rules out a frequency-only loss law even when that law reproduces a redshift curve.

The path term is thus phase-cadence retiming read from $S(T)$: it may change the energy a receiver assigns through $E=h\nu_{\mathrm{obs}}$, but it is not an untracked energy sink along the path.

With this map, the received frequency is

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}B_X(E)
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}
D_v
\exp(-Y_{X,E\to R}^{\mathrm{freq}})
$$

so no factor is interpreted as untracked photon energy loss. The packet energy read by the receiver is $E_{\mathrm{obs},X}=h\nu_{\mathrm{obs},X}$ after source branch, endpoint cadence, launch compression, and path-history propagation have all been extracted from the same absolute record.

The expansionary reading is therefore conditional. Local equilibrium by itself does not imply an effective expansion history. A Hubble-like redshift slope appears only if the coarse-grained transport has a signed, persistent cadence-space current or source-relaxation imbalance that projects into the photon path-rate functional while preserving image sharpness, line coherence, and packet time-dilation consistency.

## Refractive Gravity and Effective Metric

Massive assemblies polarize and load the surrounding Noether sea. In weak-field language, this changes the normalized density, stress, and effective signal speed:

$$
c_{\text{eff}}(\mathbf X,T) < c_f
$$

in denser or more strongly loaded regions — a constitutive hypothesis of the weak-field map, not a derived result, whose falsifier is wrong-sign Shapiro-delay or redshift recovery.

Physical observers reconstruct this behavior as gravitational redshift, lensing, Shapiro delay, and curved effective geodesics. In the substrate description, the void remains flat; the observed curvature is a constitutive summary of how clocks, rulers, and signals behave in the Noether sea.

The canonical metric bridge is [Emergent Metric](emergent-metric.md). Clock extraction belongs in [Proper Time and Time Dilation](proper-time-and-time-dilation.md). PPN-facing tests belong in [PPN Parameters](ppn-parameters.md).

## Matter Coupling and Inertia

Matter assemblies are not isolated objects moving through nothing. They are architrino assemblies embedded in the Noether sea. Their stability is a local retained-branch property, conditional on the surrounding medium record and boundary residuals.

Their observed inertia and mass are expected to depend on:

- internal energy storage,
- shielding depth,
- exposure of declared indexed-binary structure,
- medium-dressed compliance and inertial response,
- and how the assembly closes its causal ledger relative to the surrounding Noether sea.

The canonical mass-side treatment is [Particle Masses: Emergent Inertia in the Noether sea](../assemblies/particle-masses.md). This page only states that the Noether sea is the ambient medium against which those assembly responses are defined.

## Cosmological Role

The Noether sea also carries cosmological state. In this framework, cosmological expansion language is not substrate expansion. The void remains fixed; cosmological observables are interpreted through medium evolution, clock-rate comparison, signal propagation, and the large-scale state of the Noether sea.

For cosmology, the relevant medium-level variables include:

- baseline density,
- energy density,
- pressure or compliance,
- relaxation history,
- large-scale anisotropy,
- and coupling to black-hole recycling and strong-field regions.

The cosmology-level translation belongs in [Cosmology Ontology](../cosmology/cosmology-ontology.md), [Expansion Mechanism](../cosmology/expansion-mechanism.md), and [Dark Energy](../cosmology/dark-energy.md).

## Terminology Discipline

Use these terms consistently:

| **Term** | **Use** |
|:---|:---|
| **Euclidean void** | Fixed spatial container and substrate geometry |
| **Absolute timespace** | Product background of absolute time and Euclidean void |
| **Noether sea** | Canonical physical-medium name |
| **Spacetime medium** | Bridge term for the Noether sea when translating toward effective spacetime language |
| **Effective spacetime** | Observer-level metric reconstruction from clocks, rulers, and signals |

Avoid using **vacuum** alone. It is ambiguous between empty substrate, QFT vacuum language, and the actual Noether sea. If the intended meaning is the physical substrate contents, use **Noether sea**.

## Ownership Boundary

This page owns:

- the Noether sea as canonical medium ontology,
- the distinction between void, medium, and effective spacetime,
- the main Noether sea state variables,
- and the routing map for downstream spacetime work.

This page does not own:

- Noether braid internal architecture; see [Noether Braid](../noether-braid/noether-braid.md).
- Noether braid exclusion-envelope geometry; see [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md).
- Pro/anti coupling hypotheses and cluster motifs; see [Noether Sea Pro/Anti Coupling](noether-sea-pro-anti-coupling.md).
- Effective metric derivation; see [Emergent Metric](emergent-metric.md).
- Clock and ruler behavior; see [Proper Time and Time Dilation](proper-time-and-time-dilation.md).
- Cosmological scale-factor translation; see [Expansion Mechanism](../cosmology/expansion-mechanism.md).
- Strong-field recycling regimes; see [Black Holes](black-holes.md).

## Summary Commitment

> **Medium Commitment (Noether sea):** The Noether sea is the emergent physical medium formed by coupled neutral Noether braid assemblies occupying the Euclidean void. It carries density, stress, energy, orientation, flow, and response properties. Effective gravity, clock dilation, signal delay/refraction, inertia, and cosmological behavior are reconstructed from Noether sea dynamics and assembly coupling, not from curvature or expansion of the void itself. Matter assemblies and Noether braid branches are physically meaningful as local retained branches embedded in this medium record; isolated branch calculations are seed charts or limiting cases unless their Noether sea state and nearby-assembly boundary residuals are statused. The claim that Family-A neutral assemblies dominate the weak homogeneous medium remains a comparative selection target: other architrino assembly classes must be rejected, subordinated, or classified by the same ambient selection residual before Noether sea composition is closed.
