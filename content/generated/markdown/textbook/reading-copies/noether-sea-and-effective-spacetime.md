# Noether Sea and Effective Spacetime

## Noether Sea

This chapter defines the **Noether sea** as the physical medium inside the fixed background in $\mathbb{A}\mathbb{A}\mathbb{A}$. It explains what the medium is, how it differs from the Euclidean void, which state variables describe it, and where detailed assembly, metric, clock, and cosmology work belongs.

The Noether sea is not the substrate. The substrate is [absolute timespace](../../../../markdown/aaa/foundations/absolute-timespace.md): absolute time together with the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md). The Noether sea is physical content inside that background: an emergent, coupled population of neutral Noether braid assemblies whose collective response appears to physical observers as spacetime behavior.

The easiest mistake is to treat the Noether sea as another name for space. It is not. Space is the fixed container. The Noether sea is the organized medium inside that container. Effective spacetime is the observer-level reconstruction built from how that medium changes clocks, rulers, signals, and matter response. The corresponding observer-side record and projection boundary is defined in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md).

This is why the reader path introduces Noether braid scaffold and geometry before observer-level spacetime. The intended picture is a fixed container populated by organized assemblies, not a flexible container that curves by itself. At the roadmap level, the physical Noether braid density can be read as a coarse-grained population field,
$$
\rho_{\text{NS}}(\mathbf X,T)
\sim
\sum_s W_\ell(\mathbf X-\mathbf X_s(T))
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e6849e85f4f768ac)
where $W_\ell$ is a smoothing window over Noether braid center variables $\mathbf X_s(T)$. The Noether sea stress, delay factor, and orientation variables then depend on each braid's closure label, orientation, and envelope deformation. The Noether sea is therefore introduced before effective metric language because its state variables are coarse-grained functions of Noether braid geometry, not primitive geometric postulates.

The homogeneous Noether sea also supplies the first constructive convergence case for the infinite many-source wake sum. In a statistically homogeneous, isotropic, locally neutral population with neutrality correlation length $\ell$, receiver-centered shell contributions have square-summable fluctuations: a shell of radius $r_n\sim n\ell$ contains $O(n^2)$ neutral cells, signed fluctuations scale as $O(n)$, and inverse-square wake dilution contributes $O(n^{-2})$. The shell variance is therefore $O(n^{-2})$. The required mixing condition is summable cross-shell covariance,
$$
\sum_{n\ne m}
\left|
\operatorname{Cov}(\Delta\mathbf A_n,\Delta\mathbf A_m)
\right|
<\infty,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c848c934bb2c4609)
where $\Delta\mathbf A_n$ is the signed fluctuation of shell $n$'s wake-acceleration contribution about its neutral ensemble mean. The condition prevents correlations from rebuilding a divergent coherent tail from individually decaying shells. Under that condition the neutral far-population contribution converges in the receiver-centered exhaustion sense. This exhaustion is fixed by the receiver event's causal-root ledger and expanding receiver-centered shells, not by an arbitrary rearrangement of a conditionally convergent spatial series. This is a weak homogeneous medium result, not a blanket convergence claim for coherent strong-field regions or unneutralized source populations.

It also controls only fluctuations about a zero shell mean. For a weak density gradient
$$
\rho_{\mathrm{NS}}(\mathbf X)
=
\rho_0+\mathbf g_\rho\cdot\mathbf X+O(\|\mathbf X\|^2),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9659291f3d9667a1)
the additional gravity-side obligation is to compute the neutral-cell multipole and prove convergence of
$$
\sum_n\mathbb E[\Delta\mathbf A_n\mid\mathbf g_\rho].
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bee72957ddd0c7a0)
That mean row, rather than the homogeneous variance proof, must supply the leading constitutive response to $\mathbf g_\rho$. Until the neutral-cell multipole and its shell falloff are derived, the homogeneous result does not settle the weak-gradient or Seeliger problem.

The spacetime recovery stack depends on four load-bearing hypotheses that must remain visible:

| Hypothesis | Role | Current status |
| --- | --- | --- |
| orthogonal-axis three-binary Lorentz-link | Identifies moving-envelope flattening as the carrier of clock and ruler retuning. | Kinematic closure target in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md); no confirmation from evolved moving branches. |
| Shared clock/signal delay | Sets $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ so clocks and Shapiro delay consume one scalar delay response. | Conditional weak-field branch, not a derived identity. |
| Local clock/sea cadence tracking | Identifies a matter-clock cadence change with the local $C_N=\Gamma_N^{-1}$ readout in the same cell. | Same-record closure target, with mismatch retained explicitly. |
| orthogonal-axis three-binary ambient selection | Selects orthogonal-axis three-binary carriers as the physical Noether sea population. | Comparative selection hypothesis; not established by prescribed geometry alone. |

### Core Definition

The **Noether sea** is the ambient physical medium formed by dense, balanced populations of coupled neutral Noether braids in the Euclidean void.

It is:

- **Emergent:** it is built from architrino assemblies, not added as a second primitive substance.
- **Physical:** it carries energy, stress, density, orientation, and response properties.
- **Dynamic:** it can flow, strain, polarize, compress, relax, and support propagating disturbances.
- **Ambient:** it surrounds and couples to matter assemblies, clocks, rulers, photons, and strong-field regions.
- **Medium-level:** it is neither the empty void nor the observer-level effective metric.

The bridge term **spacetime medium** may be used when translating toward effective spacetime language. The canonical ontology name remains **Noether sea**.

In prose, use **Noether sea** both as the standalone proper noun and as the compound modifier before another noun, as in **Noether sea density** or **Noether sea delay factor**. Reserve **Noether Sea** for title contexts and never hyphenate the term.

### Boundary With the Euclidean Void

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

[View →](../../../../../equation-mapping.html#corpus-equation-d76a9ae891b38256)
without changing the identity of the underlying void point.

### Absolute Record and Observer Readout

The complete substrate description is the universe state

$$
\mathbb{U}_{\text{now}}\equiv S(T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dcd2228db1e86962)

This state is not an observer frame. It is the absolute-time record of positions, velocities, assemblies, causal wakes, Noether sea variables, and path-history ledgers inside the Euclidean void. Physical observers recover clock rates, photon frequencies, energies, distances, and effective geometry only after their local assemblies couple to part of that record.

This distinction matters most in redshift language. The void does not stretch, and absolute time does not slow. A source assembly emits a photon-channel packet with a local emission ledger; the packet follows a definite path history through the Noether sea; and the receiver assembly samples the packet using its own local cadence. The measured energy is therefore a receiver-coupling result,

$$
E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9c433cc4c53a999c)

not a primitive frame-free photon scalar. The redshift task is to compute the endpoint cadence, launch geometry, and path-history propagation terms from the same $S(T)$ record rather than changing explanation between gravitational, relative-motion, and cosmological cases.

### Composition

The Noether sea is composed of neutral Noether braid assemblies. The best-developed prescribed case is orthogonal-axis three-binary configurations, made from three indexed electrino:positrino binaries. A Noether braid itself is not elementary; its stability is a downstream assembly result.

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

[View →](../../../../../equation-mapping.html#corpus-equation-8e2b2de02618c521)

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

[View →](../../../../../equation-mapping.html#corpus-equation-d59b015b955e5774)

The first term enforces weak homogeneous transparency and hides ordinary medium-drift leakage; the second term enforces that clocks, photon transport, matter response, or neutrino-like propagation still consume the same retained Noether sea record. A candidate class that sets the coupling to zero passes the visibility row trivially while failing the response row: it becomes invisible, but it no longer reconstructs the effective observables assigned to the Noether sea.

The orthogonal-axis three-binary-centered Noether sea claim is therefore the statement that the corresponding class $\mathfrak C_A$—prescribed one-braid records whose three axes run from mutual orthogonality toward the group-translation direction along $\lambda_A$—can drive $\mathcal R_{\mathrm{sea\text{-}class}}(\mathfrak C_A)$ below the accepted tolerance while other candidate classes either fail one of the rows or are classified as localized matter, radiation, reaction, or strong-field branches. This is stronger than saying that orthogonal-axis three-binary exclusion envelopes are visually plausible. It is a comparative selection problem over assembly classes, not a consequence of the taxonomy definition.

The large-scale Noether sea is modeled as a balanced population of complementary Noether braid orientations.

This pro/anti distinction is the geometric and topological ordered-orientation label, not polarity conjugation, matter/antimatter, or a net electric-charge distinction. Global polarity conjugation leaves a braid's worldlines and therefore its pro/anti orientation unchanged. Both orientations are electrically and polarity neutral at the braid level. Their coupled orientation balance is part of the working explanation for how the Noether sea remains comparatively transparent and non-reactive at large scales while still carrying stress and response; it does not assert a matter/antimatter population balance.

Transparency has a candidate mechanism at the level of a single transiting assembly, offered here at effective grade. A propagating assembly is sub-field-speed, so its wake runs ahead of it and reaches the medium before the body does; the sea assemblies do not move aside like obstacles but re-phase — reorient in response to the forerunning wake, then relax. Transparency is then *elastic parting*: the medium opens ahead through wake-induced polarization and closes behind, leaving no net transit excitation, so no energy or momentum is deposited by the completed passage and the transit is lossless. The wake-level statement is that the transiting and ambient wakes superpose, while the assembly-level statement is that the perturbation produced by passage is reversible. Imperfect closure — a residual excitation left downstream — is the microscopic content of the loss, scattering, and preferred-frame-visibility terms the selection residual above bounds: a fully transparent class is one whose parting is elastic to the required tolerance.

This reversible transit row does not erase persistent gravitational loading. A source assembly that remains in a region supplies a quasi-stationary boundary condition and maintains a polarized Noether sea response; a transiting assembly supplies a time-dependent perturbation about that loaded state. Lossless closure requires the latter perturbation to relax after passage, not the former source-supported polarization to vanish. The constitutive map must derive both responses from the same wake record and distinguish them by source persistence and response timescale rather than by changing the coupling law.

The detailed pro/anti basis, density split, imbalance stability, local coupling law, and candidate cluster motifs belong in [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md). This page only fixes the Noether sea ontology those assembly hypotheses serve.

### Local Branches in the Medium

The Noether sea changes how isolated assembly calculations should be read. A truly isolated Noether braid or matter assembly is a limiting seed chart, not the generic physical situation. The physical target is a local branch retained inside the surrounding Noether sea state and nearby-assembly record.

#### Assembly-Medium Metabolism

At the ontology level, a matter braid embedded in the Noether sea is an open assembly, not an isolated clockwork object. It exchanges angular momentum and causal-wake structure with neighboring neutral braids while preserving its own closure ledger. The exact boundary between assembly-locked and ambient contributions is the channel-dependent [assembly-Noether sea interface diagnostic](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic), $D_{a,X}$; spatial proximity alone does not decide which record owns a contribution.

The current coincident-axis three-binary braid evidence sharpens that picture without closing the full medium problem. coincident-axis three-binary braid here means the prescribed chart with one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense; per-binary radii, axial half-separations, transverse orbit radii, and phases remain independent. At measurement level, the forward torque to the source-record circulation channel and the axial support supplied by a phase-matched responsive sea are readings of the prescribed response records, pending a linked instrument record; the tested axially organized responses do not supply the missing equatorial support. At mechanism-estimate level, this motivates an angular-momentum metabolism: the sea feeds an assembly channel, internal wake transport redistributes that input, and outgoing wake returns angular momentum to the sea's orientation order. A self-consistent closed loop has not yet been derived, so the metabolism is a constitutive closure target rather than a retained-branch theorem.

The static cage result gives the complementary effective picture. When a braid's support deficit selects a polar-covering neighbor cage, the acceleration-balanced candidate is a braid-plus-cage complex (stability ledger open), closer to a molecule in a solvent than to a point object fixed at a lattice site. That comparison is effective framing, not ontology: the underlying objects remain Noether braid assemblies and causal wakes, and the cage still requires its own reciprocal acceleration and stability ledger. Together, the metabolism and cage pictures explain why the Noether sea is part of the assembly's physical boundary conditions rather than decorative background.

For a candidate local branch $B$, the stronger closure form is not

$$
\mathcal{R}_{\mathrm{branch}}(B)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-be9a58d0191c2d62)

in empty surroundings. It is

$$
\mathcal{R}_{\mathrm{branch}}
\left(
B;\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal{H}_{\partial\Omega}
\right)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9399de80a8539e21)

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

[View →](../../../../../equation-mapping.html#corpus-equation-50a61c9d8ec352e5)

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

[View →](../../../../../equation-mapping.html#corpus-equation-fb5f0b1586fb1ce1)
Each term must be tied to the same identity, energy, momentum, angular-momentum, and causal-wake ledger used by the local reaction. If a reaction changes apparent particle inventory while leaving the Noether sea row undeclared, the source story is incomplete rather than closed.

This does not require solving the entire universe before studying one assembly. It does require a controlled embedding record. The useful analytic hierarchy is:

1. solve or approximate a homogeneous Noether sea record;
2. solve the candidate branch against that local medium and nearby-assembly record;
3. check the branch's back-reaction on $\rho_{\text{NS}}$, $f_N$, $\chi_{\text{sea}}$, cadence, orientation, and event ledgers.

Assembly emergence is therefore not emergence from empty isolation. It is local retention inside an already populated Noether sea, with isolated analytical branches serving as seed charts, symmetry limits, or comparison cases.

### State Variables

The spacetime branch uses the following canonical total-density symbols:

$$
\rho_{\text{NS}}(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88340ddc56264363)

with normalized density

$$
n(\mathbf X,T)
=\frac{\rho_{\text{NS}}(\mathbf X,T)}{\rho_{\text{NS},0}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c0addf6194b0f75f)

The Noether sea delay factor is written

$$
\chi_{\text{sea}}(\mathbf X,T)
=
\frac{c_f}{c_{\text{eff}}(\mathbf X,T)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f99e314017d53928)

It plays the role that refractive index plays in ordinary optical analogies, but it is a native Noether sea response variable. Do not use $n$ for this delay factor; $n$ is reserved for normalized Noether braid density.

Clock and spectral comparisons may also extract the Noether sea cadence-stretch diagnostic

$$
\Gamma_N(\mathbf X,T)
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf X,T)},
\qquad
C_N(\mathbf X,T)=\Gamma_N^{-1}(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a0af3ca5c6ae82bd)

Here $\Omega_N$ is a representative local Noether sea braid cadence and $C_N$ is the corresponding clock-rate factor. This pair is not a new density or delay factor: $n$ tracks normalized Noether braid density, $\chi_{\text{sea}}$ tracks effective causal delay, and $\Gamma_N$ tracks cadence stretch. The clock extraction and hydrogen spectral use of this diagnostic belong in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target).

When a calculation needs pro/anti subcomponents, orientation imbalance, or coupling-regime stability thresholds, use [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md).

### Medium Properties

The Noether sea is characterized by collective variables, not by a new point-particle inventory.

Important medium properties include:

- **Noether braid density:** $\rho_{\text{NS}}(\mathbf X,T)$ and normalized density $n(\mathbf X,T)$.
- **Energy density:** approximately $\rho_{\text{NS}}E_{\text{braid}}$ at the coarse level, with corrections from stress, excitation, and coupling.
- **Orientation and strain:** local ordering of braid axes and deformation away from equilibrium.
- **Flow or drift:** collective motion of the Noether sea relative to the absolute frame.
- **Compliance:** how strongly the Noether sea responds to compression, shear, polarization, and alignment loading.
- **Delay-factor response:** how $\chi_{\text{sea}}$, signal propagation, clock behavior, and effective light speed depend on local Noether sea state.

These are medium variables. They are not properties of the Euclidean void.

### Continuum Balance and Constitutive Closure

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

[View →](../../../../../equation-mapping.html#corpus-equation-2cdb14f548990969)
Equivalently, on resolved windows,
$$
\partial_T\rho_{\text{NS}}
+\nabla\cdot(\rho_{\text{NS}}\mathbf{u}_{\mathrm{sea}})
=
S_{\rho}
+r_{\rho}
$$

[View →](../../../../../equation-mapping.html#noether-sea-continuity)

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

[View →](../../../../../equation-mapping.html#corpus-equation-56308d668fdad17a)
Production, return, recruitment, dissociation, reclassification, and relaxation are not separate ontologies. They are bookkeeping channels for how neutral Noether braid content enters, leaves, breaks apart, or changes class inside the local Noether sea population. A long-time Noether sea model is credible only when these rows share one continuity ledger with the energy and reaction records.

Strong-field recycling and pair-channel activity sharpen the production row in the same requirement. A compact source may be a net source, sink, or reclassifier of Noether sea content only after the local balance separates diffuse medium loading from collimated release and from visible pair-channel products. One useful refinement is
$$
S_{\mathrm{prod}}
=
S_{\mathrm{BH,diff}}
+S_{\mathrm{BH,col}}
+S_{\mathrm{pair}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-867c6a730ed0b892)
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

[View →](../../../../../equation-mapping.html#corpus-equation-d91bf9fe72198358)
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

[View →](../../../../../equation-mapping.html#corpus-equation-f97f10f76fd2e40f)
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

[View →](../../../../../equation-mapping.html#corpus-equation-9a83480fab7acf04)
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

[View →](../../../../../equation-mapping.html#corpus-equation-c2bb582175c96dd9)
The comparison is useful because it keeps the levels separated: the perturbation metric is a constitutive readout, while the underlying medium still obeys its own dynamics. The Noether sea target has the same form of obligation,
$$
g_{\mu\nu}^{\mathrm{eff}}
=
\mathcal{G}_{\mu\nu}\!\left[\mathcal{N}_{\mathrm{sea}}\right]
+\mathcal{R}_{\mathrm{metric}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf4fb3734d788a00)
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

[View →](../../../../../equation-mapping.html#corpus-equation-f60c4068da720fa2)
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

[View →](../../../../../equation-mapping.html#corpus-equation-3b70202295912d83)
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

[View →](../../../../../equation-mapping.html#corpus-equation-0a7d7ba6210bcb46)
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

[View →](../../../../../equation-mapping.html#corpus-equation-7946aae635691658)
where $\mathcal H$ is the principal-value Hilbert transform used by the packet. A nonzero residual means the proposed response row is not yet a causal Noether sea constitutive law.

### Equilibrium Transport Hypothesis

A provisional cosmology-facing hypothesis treats the Noether sea as a dense neighbor-coupled population of Noether braids whose individual action transactions are discrete while the ensemble response can be smooth. Most braids in a weak deep-space region have other Noether braids as their nearest dynamical neighbors. Photons and neutrinos can traverse the population, and gravitational waves can perturb it, but the baseline relaxation law is a braid-to-braid medium law.

Let $\nu_N$ denote an ordinary frequency extracted from a representative Noether braid cadence state. The local braid energy scale is then

$$
E_N=h\nu_N
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6424de3e0b5f7c9f)

The point of this expression is not to add a new quantum postulate at the Noether sea level. It records the same closed-cycle action accounting used in the [Cadence-Scale Retuning Hypothesis](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis): a cadence state carries energy as action per cycle times cycles per unit absolute time. A single Noether braid may cross a neighboring branch through an $h$-scale ledger step, while a large asynchronous ensemble can produce an apparently smooth drift in the coarse variables.

At the single Noether braid level, each accepted $h$-scale transfer requires the braid to retune its cadence-scale closure. The retuning may appear as a cadence shift, indexed-binary radius shift, envelope-scale change, envelope-ratio change, orientation or strain update, or modified coupling to neighboring braids. In the simplest fixed-speed indexed-binary approximation,

$$
v_N\sim 2\pi R_N\nu_N,
\qquad
R_N\nu_N\approx\text{constant}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36c06dcb0c573495)

so a higher accepted cadence corresponds to a smaller representative scale, while a lower accepted cadence corresponds to a larger representative scale. A full orthogonal-axis three-binary record can partition the same transaction across its three indexed binaries, so this relation is a first estimate rather than a complete closure law.

At the ensemble level, let $f_N(\nu,\mathbf X,T)$ be the local distribution of Noether braid cadence states. The cadence-space current is the coarse-grained flux of many branchwise retunings:

$$
J_\nu
\sim
f_N
\left\langle
\dot{\nu}_N
\right\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9caecd309e84febf)

where the average is taken over accepted $h$-scale transactions inside the coarse-graining cell. Once the single-braid [retuning map](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis) $\mathcal{R}_{\mathrm{cyc}}^{(q,\varsigma)}$ is specified, the first current estimate is

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

[View →](../../../../../equation-mapping.html#corpus-equation-f63acc081bd16c20)

where $r_\varsigma$ is the local rate density of accepted $\varsigma$ transactions per braid and $\Delta\nu_N^{(q,\varsigma)}$ is the cadence component extracted from $\mathcal{R}_{\mathrm{cyc}}^{(q,\varsigma)}$. Deep space can therefore look smooth without making the underlying transactions continuous. Moving from deep space toward a solar-system environment should not be modeled as a scalar temperature increase alone; it is a bias in the local population toward higher cadence, stronger strain, stronger alignment, and larger gradients. Near a proton or other matter assembly, the neighboring Noether braids see a sharper boundary condition and retune more discretely around the assembly.

#### Temperature-Conditioned Branch Transition Target

A temperature channel can enter this transport law only through the same retained ensemble record used to define [temperature](../../../../markdown/aaa/dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable). It is not a property of one Noether braid, and it does not change $h$. The braid-level event remains an accepted branch-ledger transition with $\Delta A_{\mathrm{cyc}}=\pm h$; temperature can only bias the rates at which those admissible transitions are accepted inside a declared coarse-graining cell.

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

[View →](../../../../../equation-mapping.html#corpus-equation-90bc7ba66eacbd11)

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

[View →](../../../../../equation-mapping.html#corpus-equation-124f0e76a45fe263)

This pair test assumes the reverse increment returns to the starting cadence, $\Delta\nu_N^{(q,-)}(\nu+\Delta\nu_N^{(q,+)})=-\Delta\nu_N^{(q,+)}(\nu)$, so the second rate is evaluated on the paired reverse branch rather than an unrelated local decrement.

If $\mathcal R_{\mathrm{db}}^{(T)}=0$ after coarse-graining, individual $+h$ and $-h$ ledger transitions may still occur, but the temperature channel produces no net cadence-space drift. If the residual is nonzero, the signed imbalance contributes to $J_\nu^{(T)}$ and therefore biases cadence-scale retuning. In the fixed-speed indexed-binary approximation above, positive cadence drift trends toward smaller representative scale, while negative cadence drift trends toward larger representative scale. The full theorem target is to derive the rates $r_\varsigma$, the retuning increments $\Delta\nu_N^{(q,\varsigma)}$, and the indexed-binary partition of the same action transaction from a closed orthogonal-axis three-binary branch record rather than treating temperature as an external driver.

#### Ambient-Branch Acceptance

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

[View →](../../../../../equation-mapping.html#corpus-equation-2461e009287ae7e3)

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

[View →](../../../../../equation-mapping.html#corpus-equation-20dc713649ab7325)

where $\chi_{\mathrm{comp}}^{(\ell)}$ is the established ledger-complement indicator that removes branches phase-locked to resolved assemblies; it is neither $\chi_{\mathrm{sea}}$ nor the response susceptibility $\chi_{AB}$. The term $\Delta_{\mathrm{cad}}$ compares the branch cadence with $\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and $\Delta_{\mathrm{bal}}$ measures the residual neutral-pairing and orientation imbalance of the same window. The assembly-facing definition is given in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). The conceptual point is that a matter Noether braid can sit inside the same coordinate window as ambient Noether sea braids without becoming part of the ambient Noether sea record; ledger complement, not mere spatial proximity, makes the separation.

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

[View →](../../../../../equation-mapping.html#corpus-equation-c0665f146523b9cf)

Here $J_\nu$ is the current through frequency or cadence state space, $S_{\mathrm{BH}}$ is loading from black-hole recycling regions, $S_{\mathrm{GW}}$ is the perturbative contribution from gravitational-wave disturbances, and $R_{\mathrm{eq}}[f_N]$ is the local neighbor-equilibration operator. This equation is a derivation target, not a completed constitutive law. It becomes relevant to redshift only if the same $f_N$ record also determines $\Gamma_N$, $\chi_{\text{sea}}$, and the path-history propagation term $\mathcal{P}_{E\to R}$ used in the cosmology chapters.

#### Absolute-Record Transport Target

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

[View →](../../../../../equation-mapping.html#corpus-equation-9d32e87a0c250386)

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

[View →](../../../../../equation-mapping.html#corpus-equation-82811b28a5b405e1)

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

[View →](../../../../../equation-mapping.html#corpus-equation-ff622756b445d28d)

launch record

$$
\mathcal V_{E,R}
=
\left(
\mathbf v_E,\mathbf v_R,\hat{\mathbf k},\mathcal R_v
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-194a545445562577)

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

[View →](../../../../../equation-mapping.html#corpus-equation-f47829488b33a6d0)

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

[View →](../../../../../equation-mapping.html#corpus-equation-582e3f267b066703)

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

[View →](../../../../../equation-mapping.html#corpus-equation-21454eeadf7d5915)

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

[View →](../../../../../equation-mapping.html#corpus-equation-87ed8fcc92f3b807)

where $\mathbf g_N=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\text{braid}}/R_{\text{braid},0}))^T$ in the local endpoint cell. Here $\lambda$ is the coarse transverse envelope scale ratio, $\xi=R_\parallel/R_\perp$ is its shape ratio, and $R_{\text{braid}}$ is a separately extracted local carrier-size observable. A compensated fit may treat the $\lambda$ and $R_{\text{braid}}$ rows as independent only when the extraction protocol varies them independently; their geometric definitions and covariance obligation are owned by [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). The launch term is the causal-root compression of the emitted phase train. In the first weak-velocity form,

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

[View →](../../../../../equation-mapping.html#corpus-equation-16ce3b9db4303c65)

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

[View →](../../../../../equation-mapping.html#corpus-equation-6f3b85ad3e8bb5ea)

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

[View →](../../../../../equation-mapping.html#corpus-equation-2f9c6b2de76027f7)

with $\boldsymbol\theta_{\mathrm{sea}}=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi)^T$. The endpoint-only entry $\ln(R_{\text{braid}}/R_{\text{braid},0})$ is deliberately absent: it is a local assembly-clock readout, not a continuum medium field transported along the photon path. If a future constitutive derivation promotes a path-resolved braid-radius field, it must extend both $\boldsymbol\theta_{\mathrm{sea}}$ and $\mathbf p_X$ explicitly rather than allowing that channel to leak into $p_{\nu,X}$ or $p_{u,X}$. The sharper continuity form replaces the isolated current-divergence term with the source-balanced cadence residual. Along a photon path, let

$$
D_{\gamma}
=
c_{\gamma}^{-1}\partial_T
+
\hat{\mathbf k}\cdot\nabla
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c1a7b5ae8118e453)

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

[View →](../../../../../equation-mapping.html#corpus-equation-ffe8b3a6a5e608ba)

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

[View →](../../../../../equation-mapping.html#corpus-equation-11b355a5f73b506a)

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

[View →](../../../../../equation-mapping.html#corpus-equation-1af1a68a23919c6e)

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

[View →](../../../../../equation-mapping.html#corpus-equation-75350bdb543c5ac1)

The coefficient rows $\mathbf b_N$ and $(\mathbf p_X,p_{\nu,X},p_{u,X},p_{\sigma,X})$ must be fixed from the declared Noether sea constitutive response and then reused across gravitational, relative-motion, and deep-space cases. A deep-space contribution may come from a persistent $\mathcal C_N[f_N]$, flow-divergence, or anisotropic-response record, but not from switching to a generic photon-energy-loss explanation.

The endpoint coefficient-row constraints are recovery constraints, not a fit to one redshift case. This transport chapter consumes the clock-row extraction owned by [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target): the homogeneous moving Noether braid branch fixes the coefficient of $-\ln\xi$ by requiring $\Gamma_N\to1/\xi\to\gamma_\star$, while the weak static endpoint branch fixes the scalar normalization

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5fd06f262e43aee2)

Under shared clock/signal delay closure, [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#shared-clocksignal-delay-closure) supplies $a_\chi=1+\gamma_{\mathrm{PPN}}$, so the endpoint condition consumed here is

$$
b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ccb8b4c0181e3be0)

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

[View →](../../../../../equation-mapping.html#corpus-equation-fbbe8a04fa993d93)

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

[View →](../../../../../equation-mapping.html#corpus-equation-a4c779d565f56ac3)

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

[View →](../../../../../equation-mapping.html#corpus-equation-834bec0b8a811e5f)

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

[View →](../../../../../equation-mapping.html#corpus-equation-0311b4c441ffe079)

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

[View →](../../../../../equation-mapping.html#corpus-equation-f761477990b0a1c3)

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

[View →](../../../../../equation-mapping.html#corpus-equation-f15c770a02b94107)

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

[View →](../../../../../equation-mapping.html#corpus-equation-4e8ea7364d16e40c)

The two transport outputs are operationally defined by the measured phase frequency and packet-envelope duration:
$$
Y_{X,E\to R}^{\mathrm{freq}}
=
-\ln\!\left[
\frac{\nu_{\mathrm{obs},X}}
{\nu_{X,0}B_X(E)(\Gamma_{N,R}/\Gamma_{N,E})D_v}
\right],
$$

[View →](../../../../../equation-mapping.html#corpus-equation-93c03e23f010138f)
$$
Y_{X,E\to R}^{\mathrm{dur}}
=
\ln\!\left[
\frac{\Delta t_{\mathrm{obs},X}}
{\Delta t_{X,0}B_X(E)^{-1}(\Gamma_{N,E}/\Gamma_{N,R})D_v^{-1}}
\right].
$$

[View →](../../../../../equation-mapping.html#corpus-equation-795bec180afc5ceb)
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

[View →](../../../../../equation-mapping.html#corpus-equation-0228398f241eef72)

so no factor is interpreted as untracked photon energy loss. The packet energy read by the receiver is $E_{\mathrm{obs},X}=h\nu_{\mathrm{obs},X}$ after source branch, endpoint cadence, launch compression, and path-history propagation have all been extracted from the same absolute record.

The expansionary reading is therefore conditional. Local equilibrium by itself does not imply an effective expansion history. A Hubble-like redshift slope appears only if the coarse-grained transport has a signed, persistent cadence-space current or source-relaxation imbalance that projects into the photon path-rate functional while preserving image sharpness, line coherence, and packet time-dilation consistency.

### Refractive Gravity and Effective Metric

Massive assemblies polarize and load the surrounding Noether sea. In weak-field language, this changes the normalized density, stress, and effective signal speed:

$$
c_{\text{eff}}(\mathbf X,T) < c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6731fcb843619846)

in denser or more strongly loaded regions — a constitutive hypothesis of the weak-field map, not a derived result, whose falsifier is wrong-sign Shapiro-delay or redshift recovery.

Physical observers reconstruct this behavior as gravitational redshift, lensing, Shapiro delay, and curved effective geodesics. In the substrate description, the void remains flat; the observed curvature is a constitutive summary of how clocks, rulers, and signals behave in the Noether sea.

The canonical metric bridge is [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md). Clock extraction belongs in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md). PPN-facing tests belong in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md).

### Matter Coupling and Inertia

Matter assemblies are not isolated objects moving through nothing. They are architrino assemblies embedded in the Noether sea. Their stability is a local retained-branch property, conditional on the surrounding medium record and boundary residuals.

Their observed inertia and mass are expected to depend on:

- internal energy storage,
- shielding depth,
- exposure of declared indexed-binary structure,
- medium-dressed compliance and inertial response,
- and how the assembly closes its causal ledger relative to the surrounding Noether sea.

The canonical mass-side treatment is [Particle Masses: Emergent Inertia in the Noether sea](../../../../markdown/aaa/assemblies/particle-masses.md). This page only states that the Noether sea is the ambient medium against which those assembly responses are defined.

### Cosmological Role

The Noether sea also carries cosmological state. In this framework, cosmological expansion language is not substrate expansion. The void remains fixed; cosmological observables are interpreted through medium evolution, clock-rate comparison, signal propagation, and the large-scale state of the Noether sea.

For cosmology, the relevant medium-level variables include:

- baseline density,
- energy density,
- pressure or compliance,
- relaxation history,
- large-scale anisotropy,
- and coupling to black-hole recycling and strong-field regions.

The cosmology-level translation belongs in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md).

### Terminology Discipline

Use these terms consistently:

| **Term** | **Use** |
|:---|:---|
| **Euclidean void** | Fixed spatial container and substrate geometry |
| **Absolute timespace** | Product background of absolute time and Euclidean void |
| **Noether sea** | Canonical physical-medium name |
| **Spacetime medium** | Bridge term for the Noether sea when translating toward effective spacetime language |
| **Effective spacetime** | Observer-level metric reconstruction from clocks, rulers, and signals |

Avoid using **vacuum** alone. It is ambiguous between empty substrate, QFT vacuum language, and the actual Noether sea. If the intended meaning is the physical substrate contents, use **Noether sea**.

### Ownership Boundary

This page owns:

- the Noether sea as canonical medium ontology,
- the distinction between void, medium, and effective spacetime,
- the main Noether sea state variables,
- and the routing map for downstream spacetime work.

This page does not own:

- Noether braid internal architecture; see [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md).
- Noether braid exclusion-envelope geometry; see [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md).
- Pro/anti coupling hypotheses and cluster motifs; see [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md).
- Effective metric derivation; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).
- Clock and ruler behavior; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).
- Cosmological scale-factor translation; see [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).
- Strong-field recycling regimes; see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md).

### Summary Commitment

> **Medium Commitment (Noether sea):** The Noether sea is the emergent physical medium formed by coupled neutral Noether braid assemblies occupying the Euclidean void. It carries density, stress, energy, orientation, flow, and response properties. Effective gravity, clock dilation, signal delay/refraction, inertia, and cosmological behavior are reconstructed from Noether sea dynamics and assembly coupling, not from curvature or expansion of the void itself. Matter assemblies and Noether braid branches are physically meaningful as local retained branches embedded in this medium record; isolated branch calculations are seed charts or limiting cases unless their Noether sea state and nearby-assembly boundary residuals are statused. The claim that orthogonal-axis three-binary neutral assemblies dominate the weak homogeneous medium remains a comparative selection target: other architrino assembly classes must be rejected, subordinated, or classified by the same ambient selection residual before Noether sea composition is closed.

## Noether Sea Pro/Anti Coupling

This note states a bounded working hypothesis for the Noether sea: the sea is not a passive geometric background. It is an active medium built from persistent Noether braid assemblies with internal structure and coupling rules. The fixed background remains absolute time and the Euclidean void; this chapter is about the contents that occupy that background and supply medium response. It is the assembly-hypothesis continuation of [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), [Euclidean Void](../../../../markdown/aaa/foundations/euclidean-void.md), and [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md).

For the canonical medium ontology, total-density boundary, and terminology discipline, see [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md). This chapter is the canonical home for the more specific pro/anti Noether braid coupling details: orientation basis, density decomposition, imbalance stability, local coupling hypotheses, and cluster-organization motifs. The distinction between this orientation label and polarity conjugation is fixed in [Terminology Usage](../../../../markdown/aaa/archie/terminology-usage.md#proanti-orientation-and-polarity-conjugation).

The claim level is intentionally narrower than the Noether sea ontology page. The ontology page says what the medium is. This page asks whether complementary pro/anti orientation populations are part of how that medium stays transparent, balanced, and responsive.

### Pro/Anti Noether Braid Basis

The starting picture is deliberately simple. A Noether sea carrier is a Noether braid whose state can appear in two complementary orientations:

- pro-Noether braid orientation
- anti-Noether braid orientation

For Noether braid consumers, the working orientation convention is:

- pro-Noether braid orientation: $o_{\mathrm{PA}}=+1$, represented by indexed-frame mnemonic `123`;
- anti-Noether braid orientation: $o_{\mathrm{PA}}=-1$, represented by indexed-frame mnemonic `132`.

The indices are persistent record identities, not a sorting by radius, frequency, energy, speed, temporal event order, or dynamical role. Their coordinate values may cross without relabeling the frame. The `123/132` convention is a reader-facing mnemonic after the indexed frame has been declared; it is not itself the carrier for the two-valued sign, because parity does not reverse a bare temporal ordering of labelled events. A completed pro/anti assignment must be a deformation-stable orientation row $o_{\mathrm{PA}}\in\{+1,-1\}$ in the retained indexed path or angular-momentum-frame record, such as the indexed Noether braid chirality and causal-writhe or framed-topology candidates discussed in [Constructing the Absolute Frame](../../../../markdown/aaa/foundations/constructing-the-absolute-frame.md#parity-convention-and-dynamical-chirality) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md#proanti-before-planar-lock).

The orientation label does not assign matter versus antimatter. Global polarity conjugation $C$ leaves the indexed worldlines and $o_{\mathrm{PA}}$ unchanged. The proposed parity action is $P:o_{\mathrm{PA}}\mapsto-o_{\mathrm{PA}}$; establishing it requires the retained orientation carrier, not the mnemonic alone. A matter branch and its polarity-conjugate antimatter branch may therefore each occur on either pro/anti orientation once the full retained branch and charged-sector ledgers are supplied. This sea-level orientation balance is distinct from the visible-sector [matter-antimatter asymmetry](../../../../markdown/aaa/philosophy-history/solving-the-crisis.md#matter-antimatter-asymmetry) question, which belongs to polarity-conjugate branch populations, weak-sector asymmetry, early-state boundary conditions, and reaction-ledger bias. The key claim is that stable large-scale Noether sea behavior may require both orientations to coexist and couple, so the Noether sea does not drift into one indexed-frame handedness.

At the assembly level, a useful physical picture is antiparallel pairing. Complementary orientations can suppress exposed axial circulation when their open circulation channels face each other in the right way. That gives the Noether sea a second kind of neutrality beyond each braid's own internal polarity neutrality: local polar-site leakage is mutually suppressed, so the composite remains comparatively transparent and non-reactive.

At the continuum-medium level, represent local Noether braid density with canonical symbols $(\rho_{\text{NS}}, n)$ as two coupled components:

$$
\rho_{\text{NS}}(\mathbf X,T) = \rho_{+}(\mathbf X,T) + \rho_{-}(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b71698c0f19606e)
$$
n(\mathbf X,T)\equiv \frac{\rho_{\text{NS}}(\mathbf X,T)}{\rho_{\text{NS},0}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-97ffe36cc3e2158c)

The total density can stay smooth while the two orientation populations differ locally. Here the subscripts $+$ and $-$ label pro/anti orientation populations, not architrino polarity and not matter/antimatter. Their difference is represented by a bounded imbalance

$$
\Delta\rho_{\text{NS}}(\mathbf X,T) = \rho_{+}(\mathbf X,T) - \rho_{-}(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-065ce48e2e3776f9)

where long-lived Noether sea regions require $|\Delta\rho_{\text{NS}}|$ to remain below a stability threshold set by the local coupling regime. In plain terms, the sea may tolerate local orientation bias, but not unlimited domination by one ordered orientation. At the diagnostic level, the $\Delta_{\mathrm{bal}}$ term in the ambient-branch acceptance diagnostic of [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md#ambient-branch-acceptance) is the coarse-grained, normalized window readout of $\Delta\rho_{\text{NS}}$ over $\Omega_\ell$ after resolved assembly ledgers have been excluded; the open coupling-law work is to derive that normalization and its stability threshold from pro/anti orientation dynamics.

The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) page names the Noether sea and its total state variables; this chapter owns the pro/anti split and the hypotheses about how those subcomponents couple.

### 2 Pro + 2 Anti Coupling Hypothesis

A recurring speculative motif is a minimal neutral cluster built from two pro-Noether braid constituents and two anti-Noether braid constituents. The intuition is a compact four-member arrangement: enough pieces to balance orientation, suppress exposed circulation, and resist a one-constituent perturbation. Geometrically, this is often pictured as a compact four-body bound state analogous in shape intuition, but not in nuclear force mechanism, to a helium-like $2\mathrm{p}+2\mathrm{n}$ nucleus: two of one type plus two of the complementary type in a tightly coupled arrangement.

The analogy is structural:

- helium-like count balance ($2+2$),
- compact low-moment configuration,
- enhanced robustness against single-constituent perturbation.

The analogy is not identity:

- no claim that baryonic protons/neutrons are being reused,
- no claim that QCD binding equations directly apply.

Instead, the model uses the helium-like picture as a design intuition for why a four-member pro/anti cluster may minimize net torque, suppress long-term precession drift, and provide a resilient seed unit for medium-level tiling. The count balance is the useful part; the nuclear analogy is not a claim about the acceleration law.

### Why This Matters for Effective Spacetime Phenomenology

If the local Noether sea is assembled from balanced pro/anti Noether braid populations, then curvature-like behavior is read as collective reconfiguration of assembly states rather than purely geometric deformation of an otherwise structureless manifold. In that interpretation:

- weak-field behavior tracks smooth perturbations in normalized density $n$ as used in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md),
- strong-field behavior tracks approach to alignment and saturation limits,
- wave channels track propagating phase disturbances through the coupled Noether braid assembly network.

This is consistent with the framework's broader assemblies-first stance. Equations are read as effective descriptors of deeper assembly dynamics, and the medium response is carried by organized Noether braid populations rather than by the Euclidean void itself.

### Ownership Boundary

This chapter owns:

- pro-Noether braid and anti-Noether braid orientation basis,
- local density decomposition into $\rho_+$ and $\rho_-$,
- orientation imbalance $\Delta\rho_{\text{NS}}$,
- coupling-regime stability thresholds,
- the $2+2$ pro/anti cluster hypothesis,
- and medium-level Noether braid assembly motifs that could support effective spacetime behavior.

This chapter does not own:

- the Noether sea as medium ontology; see [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md),
- the internal Noether braid architecture; see [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md),
- the effective metric map; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md),
- clock and ruler extraction; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- or cosmological scale-factor translation; see [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).

### Claim Scope

This is a hypothesis note, not a closed derivation. The chapter's claim is limited to the organizing possibility that local pro/anti Noether braid motifs may support effective spacetime behavior through Noether sea response. A completed version must derive the orientation-classification invariant, derive the local coupling law, test whether the $2+2$ pro/anti cluster is an energy minimum or only a design intuition, and extract weak-field, strong-field, or cosmological signatures from the same Noether sea variables used by the effective-metric program.

## Molecular Exclusion and Noether Sea Response

This chapter analyzes volume exclusion across ordinary matter and medium-level propagation. It complements [Condensed Matter](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md), [Molecular Geometry](../../../../markdown/aaa/nuclear-atomic/molecular-geometry.md), [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md) by asking how ordinary exclusion boundaries coexist with deeper Noether sea response.

The guiding distinction is ordinary occupancy versus medium availability. Molecules exclude one another through electron-envelope and bonding structure, but that does not decide how photon, neutrino-like, gravitational-wave, clock, or Noether sea response channels propagate through the same Euclidean volume. A tiny molecular hard-core packing fraction is therefore useful background, not a proof that every channel sees empty space. The native content of that distinction is the two-row visibility/response residual in [Noether Sea](../../../../markdown/aaa/spacetime/noether-sea.md#composition); this chapter supplies its ordinary-chemistry comparison, not a second medium-coupling law.

When chemists use the **van der Waals (VdW) volume** of a molecule, they mean the space excluded by its electron distribution: the effective hard-core volume a molecule presents to its neighbors. Atomic van der Waals radii, such as the Bondi radii, set a common hard-sphere convention; a molecular van der Waals volume then depends on the molecular geometry and the rule used to subtract bonded overlaps. The estimate below therefore declares the one molecule it uses rather than treating a multi-molecule lookup table as source authority. The unit conversion is $1\,\mathring{\mathrm A}^3 = 10^{-24}\,\mathrm{cm}^3$.

### Molecular Occupancy Baseline

#### How Much Volume Do Gas Molecules Actually Occupy in Air?

At everyday conditions, about $1\,\mathrm{atm}$ and room temperature, air is extremely sparse. A quick estimate using van der Waals volumes shows why:

Take nitrogen ($\mathrm{N}_2$) as representative. Using two equal Bondi spheres with radius $r_N=1.55\,\mathring{\mathrm A}$ and center separation $d=1.10\,\mathring{\mathrm A}$, the bonded overlap is

$$
V_{\cap}
=
\frac{\pi(4r_N+d)(2r_N-d)^2}{12}
\approx
7.64\,\mathring{\mathrm A}^3.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-11f426099ccaacbf)

The declared union rule therefore gives

$$
V_{\mathrm{VdW}}
=
2\frac{4\pi r_N^3}{3}-V_{\cap}
\approx
23.6\,\mathring{\mathrm A}^3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9de63dab092fad54)

per molecule. One mole then presents a hard-core volume of about $23.6 \times 10^{-24}\,\mathrm{cm}^3 \times N_A \approx 14.2\,\mathrm{cm}^3$. One mole of an ideal gas occupies about $24{,}000\,\mathrm{cm}^3$ at $298\,\mathrm{K}$ and $1\,\mathrm{atm}$. The packing fraction is therefore about $14.2\,\mathrm{cm}^3 / 24{,}000\,\mathrm{cm}^3 \approx 0.06\%$.

Intuition scales:
- Average intermolecular spacing is about $3$ to $4\,\mathrm{nm}$ (from the number density above).
- Mean free path in air is about $60$ to $70\,\mathrm{nm}$ (standard kinetic estimate).

Conclusion: gas molecules occupy well under one-tenth of a percent of the available Euclidean volume as molecular hard cores; most gas volume is not molecularly occupied compared with liquids and solids.

#### Representative Number Densities in Air

Using the ideal gas law, dry air at $1\,\mathrm{atm}$ and $298\,\mathrm{K}$ contains about $2.46 \times 10^{19}$ molecules per $\mathrm{cm}^3$. A few representative components are enough to set the scale:
- Nitrogen ($\mathrm{N}_2$, $78.084\%$): about $1.92 \times 10^{19}$ per $\mathrm{cm}^3$
- Oxygen ($\mathrm{O}_2$, $20.946\%$): about $5.16 \times 10^{18}$ per $\mathrm{cm}^3$
- Carbon dioxide ($\mathrm{CO}_2$, about $420\,\mathrm{ppm}$): about $1.03 \times 10^{16}$ per $\mathrm{cm}^3$

Notes:
- Dry air omits water vapor. At $25^\circ\mathrm{C}$ and $50\%$ relative humidity, $\mathrm{H}_2\mathrm{O}$ is about $1.6\%$ by volume, or about $3.9 \times 10^{17}$ per $\mathrm{cm}^3$. At saturation near $25^\circ\mathrm{C}$, it is about $3.1\%$ by volume.
- Trace constituents scale by their volume fraction and do not change the packing conclusion.
- Despite high number densities, the hard-core geometric occupancy is only about $0.06\%$ of the volume under the declared $\mathrm N_2$ union-of-spheres rule. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, ordinary molecular exclusion occupies only a small fraction of the available Euclidean volume, while deeper Noether sea implementation layers remain available for medium-level propagation.

This gives a **geometric baseline** for how much space a molecule excludes. In real matter, the effective boundary is also affected by bonding, compression, temperature, pressure, and the channel being probed.

The kinetic baseline is not just occupied volume; it is also the collision length compared with the scale being probed. For a dilute molecular species with number density $n_m$ and effective hard-core diameter $d_m$, the order-of-magnitude mean free path is
$$
\lambda_m
\sim
\frac{1}{\pi d_m^2 n_m}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cecd952f67a47199)
up to the usual order-one correction for relative molecular motion. A probe of size $L$ is in a continuum regime only when
$$
\mathrm{Kn}_m
\equiv
\frac{\lambda_m}{L}
\ll 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-726caa113120b005)
When $\mathrm{Kn}_m$ is not small, a molecular continuum pressure or viscosity description is a poor model even if the geometric occupancy is tiny.

This distinction is useful for $\mathbb{A}\mathbb{A}\mathbb{A}$ because molecular exclusion and Noether sea response answer different questions. Molecular packing fraction estimates what ordinary matter blocks geometrically. Mean-free-path and Knudsen estimates say whether a gas can be treated as a continuum at the scale of the probe. Neither estimate determines whether a photon, neutrino, gravitational-wave channel, or clock-rate comparison couples strongly to the Noether sea. Those channels require their own coupling and propagation records.

For any simulation or synthetic-observable packet that compares ordinary matter with medium-level propagation, the minimal separation is
$$
\phi_{\mathrm{VdW}}
=
n_m V_{\mathrm{VdW}},
\qquad
\mathrm{Kn}_m
=
\frac{\lambda_m}{L},
\qquad
\mathcal C_X
=
\text{declared coupling record for channel }X
$$

[View →](../../../../../equation-mapping.html#corpus-equation-42ef6a486d95fda5)
A low $\phi_{\mathrm{VdW}}$ or high $\mathrm{Kn}_m$ may explain molecular sparsity or gas-kinetic behavior; it is not evidence by itself for transparency of channel $X$.

---

### Levels of Excluded Volume

Geometric VdW volume is the radius-and-overlap estimate: it is tied to tabulated radii and molecular geometry, not to the gas pressure or temperature in the worked example. Effective excluded volume is more flexible. Neighboring molecules can compress, stretch, or reorganize electron density, and hydrogen bonding, solvation shells, or $\pi$-$\pi$ stacking can alter the apparent space occupied. Raising $T$ usually increases vibration and loosens structures; raising $P$ can compress electron distributions slightly and reduce the effective excluded volume.

Macroscopic boundaries are large-scale manifestations of those exclusions, but they remain channel-specific. At an air-water boundary, visible photons mostly pass while molecules from one side cannot enter the other without surface disruption. At an air-skin boundary, oxygen molecules are excluded by cellular membranes unless aided by proteins. At a metal-skin boundary, copper atoms in a wire do not freely diffuse into biological tissue, while infrared and visible photons can still cross or reflect at the boundary.

---

### Propagation Across Excluded Regions

Maximally packed van der Waals volumes define exclusion domains for ordinary atoms and molecules. They do not automatically block every observer-level channel or every deeper medium-level propagation mode. Ordinary matter is blocked by electron-envelope and bonding structure; that is the channel that forms the material boundary. Photons may pass, reflect, or be absorbed depending on frequency and material: visible light moves through water and glass but not metal, X-rays probe deep into flesh but are stopped more strongly by bone, and gamma rays can penetrate meters of concrete.

Neutrinos pass almost completely unhindered through ordinary matter; compare [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) for the assembly-level channel picture. Hypothetical WIMPs, axions, or gravitons belong only to standard-comparison language here: if such channels exist, their ordinary-matter coupling is weak enough that molecular hard-core exclusion is not the blocking rule. Compare [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md) for the cosmological inference side and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md) for the effective propagation layer.

The effective spacetime comparison has the same lesson. In standard GR language, matter changes the metric rather than blocking spacetime as a substance. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the Euclidean void remains fixed; the relevant implementation layer is Noether sea response and effective metric reconstruction.

---

### Absolute Timespace vs. Implemented Medium

- Absolute-timespace background: the mathematical arena in this project is absolute timespace, the product of one global time and Euclidean 3-space. It is fixed, non-dynamical, and does not curve.
- Noether sea implementation layer: effective spacetime behavior is realized by coherent assembly architecture at scales far smaller than molecules. In bridge prose this can be called a spacetime medium layer, but it is not a separate substrate inventory. Its microstructure can modulate effective propagation, boundaries, and coherence without altering the background kinematics.

This is the same implementation layer developed in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md) and [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md).

The van der Waals volume is an exclusion region mainly for **ordinary fermionic matter**. At the molecular level it defines exclusion for atoms and molecules; at the material level, boundaries such as air-water, skin-air, and metal-skin are large-scale manifestations of those exclusions. At the cosmic scale and observer level, photons, neutrinos, dark matter candidates, gravitational waves, clock comparisons, and effective metric descriptions interact through different coupling mechanisms. Molecular hard-core exclusion is therefore a matter-channel fact, not a universal medium-availability rule.

The worked air estimate makes the chapter's conclusion concrete. A molecular occupancy of only about $6\times10^{-4}$ does not predict a photon, neutrino-like, clock, or gravitational-wave response. Each channel still requires its own $\mathcal C_X$ record and must pass the shared $\mathcal R_{\mathrm{vis/resp},X}$ test; geometric sparsity alone establishes neither transparency nor opacity.

## Observer Framework

This chapter explains what an observer can access in $\mathbb{A}\mathbb{A}\mathbb{A}$. It separates the complete ontic universe-state perspective from Physical Observers, then shows how absolute simultaneity, operational simultaneity, derived clock time, and effective metric descriptions fit together.

The key split is simple:

- The **$\mathbb{U}_{\text{now}}$ universe-state perspective** is the theory-side complete-state perspective on an absolute-time slice.
- A **Physical Observer** is an embedded assembly inside the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), using physical clocks, rulers, detectors, records, and finite-speed signals.

This page owns the level distinction. The clock law itself belongs in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md), and the effective metric bridge belongs in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

This is not an idealist or measurement-created ontology. The complete state exists whether or not any Physical Observer reads it. The point is that any actual observer is made of assemblies and can only infer the world through finite records, local clocks, signals, calibrations, and access boundaries.

### The $\mathbb{U}_{\text{now}}$ Universe-State Perspective

The **$\mathbb{U}_{\text{now}}$ universe-state perspective** is the theory's complete ledger for one slice of [absolute timespace](../../../../markdown/aaa/foundations/absolute-timespace.md). It represents complete knowledge of the architrino microstate on that slice, including the history data needed for the next step of deterministic evolution.

In principle, it includes:

- the position and velocity of every architrino,
- each architrino identity and polarity,
- the complete path-history ledger needed for deterministic evolution,
- source provenance for causal wakes,
- emission times for active wake intersections,
- and the branch-history information needed by the dynamics.

It is not a physical device or observer. It does not measure, signal, compute with finite resources, or occupy a local assembly state. It is the bookkeeping perspective used to state the ontology and deterministic laws while keeping those laws separate from what an embedded observer can recover.

### Physical Observers

A **Physical Observer** is any observer, detector, clock, ruler, or measuring apparatus composed of architrino assemblies. The term is physical before it is psychological: a lab apparatus, atom, detector medium, or human observer all count only through the records their assemblies can produce and preserve.

Examples include:

- laboratory clocks and interferometers,
- atoms and detector media,
- humans and biological sensors,
- planets, stars, and other large assemblies when treated as measurement systems.

Physical Observers are embedded in the Noether sea. Their clocks, rulers, detector thresholds, records, and synchronization conventions are therefore outputs of assembly dynamics, not external primitives placed outside the system.

A Physical Observer has access only through:

- local interactions,
- finite-speed signals,
- derived clock time measured by physical clocks,
- coarse-grained effective fields,
- finite records,
- and statistical summaries of unresolved microstate structure.

No Physical Observer can be promoted into a global, outside-the-universe vantage point. The $\mathbb{U}_{\text{now}}$ universe-state perspective can define the complete state for theory construction, but a Physical Observer can only assemble finite records across a declared access region and communication history.

This limitation becomes especially important in strong-gravity and cosmology comparisons. Standard quantum-gravity discussions also run into the fact that an observer cannot be placed outside the entire universe as a massless, energy-free measuring device. A real observer supplies a clock, a location, finite records, and an access region. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this does not make reality observer-created. It means that black-hole entropy, de Sitter thermodynamics, horizon access, and quantum state descriptions must be stated relative to what an embedded Physical Observer can actually clock, probe, and record.

For the same reason, an expectation value, covariance, or correlation function is not automatically an ontic claim about an effective metric, the Noether sea, or the complete microstate. It is an observer-level summary for a declared observation region, readout channel, and boundary-data model. A comparison packet may use such summaries, but it must say which Physical Observer records and boundary wake data make the summary meaningful.

Strong-gravity information claims require the same declared-access discipline. A local field-theory expression such as a horizon-crossing correlation, a reduced density matrix, or a fine-grained radiation entropy is not yet a substrate statement. It becomes a legitimate comparison object only after the Physical Observer, reference resources, access region, finite boundary wake data, and record channel have been specified. This keeps black-hole information accounting from smuggling in an external observer at infinity, a literal boundary CFT, or an unrecorded many-copy measurement idealization.

The same discipline applies when one Physical Observer uses another Physical Observer's report. The report is not a disembodied update rule. It is a physical record carried by signals, memory states, documents, detector logs, or other assemblies, and it can be imported only through a declared communication channel with finite latency, calibration, and persistence. If two observers appear to certify incompatible conclusions, the first diagnostic question is whether both conclusions belong to the same declared record channel and access model. A mismatch in readout channel, missing reference resources, or failed record autonomy is an observer-layer failure, not evidence that the complete ontic state has become contradictory.

Purpose-built precision experiments add a practical record rule. A Physical Observer does not record only a number. The observer records an apparatus protocol, a modulation or timing method, calibration references, and a nuisance model. For a precision-gravity channel $A$, write the retained record as
$$
\Theta_A^{(O,W)}
=
\left(
Y_A(t_{\mathrm{eff}}),
\mathcal{K}_A,
\mathcal{M}_A,
C_A,
\mathcal{N}_A,
\mathcal{B}_{\partial\Omega}^{(O)}(W)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bd2f2b1bf274c58b)
where $Y_A(t_{\mathrm{eff}})$ is the measured readout, $\mathcal{K}_A$ is the apparatus response kernel, $\mathcal{M}_A$ is the modulation or timing protocol, $C_A$ is calibration covariance, $\mathcal{N}_A$ is the declared nuisance family, and $\mathcal{B}_{\partial\Omega}^{(O)}(W)$ is the retained boundary-wake family defined below. Redshift measurements, torsion balances, preferred-frame clock tests, CMB radiometers, and interferometric gravitational-wave detectors differ mainly in these record fields. A comparison that keeps $Y_A(t_{\mathrm{eff}})$ while replacing $\mathcal{K}_A$, $\mathcal{M}_A$, $C_A$, or $\mathcal{N}_A$ after seeing the result is not the same Physical Observer record.

Photon-distance records need the same separation. For an emission event $E$, reception event $R$, and transported photon-channel packet $\gamma$, a Physical Observer should not collapse three different quantities into one distance:
$$
d_{\mathrm{void}}(E,R)
=
\left\|\mathbf X_R(T_R)-\mathbf X_E(T_E)\right\|,
\qquad
L_{\gamma}(E\to R)
=
\int_{T_E}^{T_R}\left\|\frac{d\mathbf X_{\gamma}}{dT}\right\|\,dT,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-770497f4ad02ba87)
and
$$
D_O(E,R)
=
\mathcal{I}_O\!\left(
z_\gamma,
\Theta_{\gamma}^{(O,W)},
\mathcal{K}_O,
\mathcal{N}_O
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-538f878e44e4d7d8)
Here $d_{\mathrm{void}}$ is the Euclidean coordinate separation of the two recorded events in the fixed void, $L_\gamma$ is the photon-channel path-history length through the Noether sea, and $D_O$ is the Physical Observer's inferred distance under a declared inference map. In this expression $\mathcal{K}_O$ and $\mathcal{N}_O$ are inference-stage kernel and nuisance choices, distinct from the apparatus-stage response and nuisance fields already retained inside $\Theta_{\gamma}^{(O,W)}$. Redshift may constrain $D_O$, but it is not by itself a measurement of either absolute separation or photon path length unless the endpoint clock, launch, path-history, and calibration rows are held fixed in the same record.

This is the central observational warning for cosmology: photons are the dominant observation channel, but a photon record is a transport record through the Noether sea before it is a direct distance label.

### Ontic and Epistemic Levels

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses a two-level distinction:

| **Level** | **What It Means** | **Typical Description** |
|:---|:---|:---|
| Ontic | What exists and evolves in the complete microstate | Architrinos in absolute timespace with path-history dynamics |
| Epistemic | What embedded assemblies can access and summarize | Derived clock time, measured distance, effective fields, wavefunctions, thermodynamic quantities |

The ontic level is not observer-dependent. It is the complete state of the modeled world at absolute time $T$, together with the path-history information needed for deterministic continuation.

The epistemic level is observer-dependent because Physical Observers are built from assemblies and must infer the world through finite signals, local records, and internal clocks. This is a limit on access, not a claim that observers create the substrate.

This distinction protects several recurring claims:

- Wavefunction updates are not fundamental discontinuities in the substrate; they are observer-level state-description updates.
- Effective spacetime curvature is not curvature of the Euclidean void; it is a reconstruction from clocks, rulers, and signal paths.
- Relativity of simultaneity is not a failure of absolute simultaneity; it is an operational constraint on Physical Observers.

For the quantum side of this distinction, see [Wavefunction Ontology](../../../../markdown/aaa/quantum/wavefunction-ontology.md) and [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md).

Formal note: a local subsystem is not generally closed under the primitive dynamics. A Physical Observer may model a region as though it were isolated, but finite-speed wake history still crosses the boundary. Let $\Omega\subset\Sigma_T$ be the spatial region resolved by a Physical Observer, let $X_\Omega(T)$ be the internal assembly state represented inside that region, and let $\mathcal{H}_{\Omega}^{<T}$ be the retained path-history data for internal trajectories and locally resolved causal wakes before $T$. The missing exterior influence is represented by the accumulated incoming boundary-wake ledger
$$
\mathcal{B}_{\partial\Omega}(T)
=
\mathcal{B}_{\partial\Omega}^{\mathrm{in}}(\le T)
=
\left\{
(j,T_t,T_{\mathrm{cross}},\mathbf X_{\mathrm{cross}},
\mathbf X_j(T_t),\mathbf V_j(T_t),q_j,\mathcal C_j^{\mathrm{root}})
\;:\;
\mathbf X_j(T_t)\notin\Omega,\quad
T_t<T_{\mathrm{cross}}\le T,\quad
\mathbf X_{\mathrm{cross}}\in\partial\Omega,\quad
\|\mathbf X_{\mathrm{cross}}-\mathbf X_j(T_t)\|
=c_f(T_{\mathrm{cross}}-T_t)
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4bd95728a21d1b6c)

The root-chart entry $\mathcal C_j^{\mathrm{root}}$ retains the causal branch identifier and the transmitter-side root derivatives. On a simple-root chart it includes
$$
D_{t,j}
=
c_f-\widehat{\mathbf r}_{j,\mathrm{cross}}\cdot\mathbf V_j(T_t),
\qquad
W_j^{\mathrm{acc}}
=
\frac{c_f}{|D_{t,j}|},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d58208739536d488)
where $\widehat{\mathbf r}_{j,\mathrm{cross}}$ points from the transmitter event to the boundary crossing. At a transmitter-side fold, $D_{t,j}=0$ and the simple-root weight diverges. Such an entry is fail-closed unless the chart also retains the root multiplicity and the next nonzero derivative needed for a fold or multi-root evaluation; substituting a finite simple-root weight is not an admissible boundary approximation.

The crossing time $T_{\mathrm{cross}}$ separates instantaneous influx from already admitted exterior history. An interior receiver at $T$ may depend on a boundary entry with $T_{\mathrm{cross}}<T$, so the boundary ledger is accumulated rather than only evaluated at the present boundary. For non-convex $\Omega$, the ledger retains each boundary-crossing event rather than assuming that the active exterior isochron still intersects $\partial\Omega$ at the evaluation time.

The subsystem evolution therefore has the schematic form
$$
\frac{dX_\Omega}{dT}
=
F_\Omega\!\left(
X_\Omega(T),
\mathcal{H}_{\Omega}^{<T},
\mathcal{B}_{\partial\Omega}(T),
\mathcal N_{\text{sea}}|_{\Omega}(T)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-419240b4b05ccc7d)
where $\mathcal N_{\text{sea}}|_{\Omega}(T)$ denotes the locally resolved Noether sea state. A Physical Observer who models only $X_\Omega(T)$ has omitted finite-speed signals, incoming causal wakes, and path-history branches crossing the boundary. That omission can make local prediction fail without implying indeterminism in the $\mathbb{U}_{\text{now}}$ universe-state perspective, because the complete state includes the boundary wake data and the path-history ledger needed for deterministic continuation.

The same finite-boundary form is the local substitute for placing a hypothetical observer at infinity in compact strong-field comparisons. For black-hole and cosmology problems, $\mathcal{B}_{\partial\Omega}$ is the controlled interface between what a Physical Observer can access and what the complete state must carry for deterministic continuation.

The following diagnostics have different status. The ambiguity indicator $\Delta_P^{(O,W)}$ and the boundary-wake family $\mathcal{B}_{\partial\Omega}^{(O)}$ are consumed by validation, effective-metric, and local-horizon comparison arguments as observer-record discipline. The covariance split, causal-order residual, reconstruction-uniqueness residual, and process-table mismatch are comparison scaffolds unless an apparatus-specific benchmark or closure proof consumes them. None of these objects adds substrate ontology; each tests whether one declared Physical Observer record is being reused rather than refit.

#### Global-Reconstruction Ambiguity

Finite observer records can underdetermine global reconstruction even when the local data are extremely rich. A record can be precise and still fail to select a unique global reconstruction. For a declared Physical Observer $O$, observation window $W$, data-product family $\mathcal{D}$, and tolerance $\epsilon$, let $\Pi_{\mathcal{D}}^{(O,W)}(\theta)$ be the data-product projection of a candidate closure record $\theta$. Relative to the promoted closure set $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ from [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md), define
$$
[\theta]_{\mathcal{D},\epsilon}^{(O,W)}
=
\left\{
\theta'\in\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
:
d_{\mathcal{D}}\!\left(
\Pi_{\mathcal{D}}^{(O,W)}(\theta'),
\Pi_{\mathcal{D}}^{(O,W)}(\theta)
\right)
\le \epsilon
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5b70b378a955856f)
For a proposed global claim $P$, the observer-side ambiguity indicator is
$$
\Delta_P^{(O,W)}(\theta)
=
\mathbf{1}\!\left[
\exists\theta_1,\theta_2\in[\theta]_{\mathcal{D},\epsilon}^{(O,W)}
\text{ with }
P(\theta_1)\ne P(\theta_2)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e0cc3f1961814ee4)
If $\Delta_P^{(O,W)}(\theta)=1$, the Physical Observer has not measured $P$ as a global fact. The data product may still be valid, but $P$ remains an effective reconstruction or comparison interpretation unless an independent $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation selects it from the same complete-state and boundary-wake record.

For local-horizon thermodynamic comparisons, the countable object is not the raw boundary history by itself. It is the retained boundary-wake label family after the Physical Observer's record channel has identified histories that cannot be distinguished on the declared window:
$$
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
=
\left.
\widehat{\mathcal{B}}_{\partial\Omega}(T;\theta)
\right|_{W}
/
\sim_{O,\theta,W}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-85633fd824cef966)
Here $\widehat{\mathcal{B}}_{\partial\Omega}(T;\theta)$ denotes the boundary wake history retained by the observer model record, and $\mathcal{B}_1\sim_{O,\theta,W}\mathcal{B}_2$ means that the two retained boundary histories give the same Physical Observer clock, ruler, detector, and readout records on $W$ within the declared tolerance. This quotient is an observer-accessible coarse-graining of deterministic boundary data, not a new substrate boundary. It is the object later counted in local-horizon entropy targets.

### Boundary-Wake Covariance Scaffold

The boundary term above also supplies the native home for covariance matrices used by observer-level measurement diagnostics. A covariance is not fundamental randomness. It is a finite-access summary of boundary wake histories, detector states, and Noether sea variables not resolved by a Physical Observer.

With this notation, the unresolved boundary residual is
$$
\delta\mathcal{B}_{\partial\Omega}(T;\theta)
=
\mathcal{B}_{\partial\Omega}(T)
-
\widehat{\mathcal{B}}_{\partial\Omega}(T;\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-db369d1f5d950f7c)
For a readout channel $Y_A(t_{\mathrm{eff}})$, define the residual induced by unresolved boundary histories as
$$
\delta Y_A(t_{\mathrm{eff}};\mathcal{B},\theta)
=
Y_A(t_{\mathrm{eff}};\mathcal{B},\theta)
-
\left\langle
Y_A(t_{\mathrm{eff}};\mathcal{B},\theta)
\right\rangle_{\mu_{\Omega,\theta}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-941f56b80cd7ab45)
Here $\mu_{\Omega,\theta}$ is a coarse-grained conditional measure over complete states whose resolved projection agrees with the Physical Observer's record $\theta$. It is an epistemic measure over unresolved deterministic histories, not a new substrate law.

The boundary-wake covariance is then
$$
\mathsf N^{\mathrm{bw}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
=
\int
\delta Y_A(t_{\mathrm{eff}};\mathcal{B},\theta)\,
\delta Y_B(t_{\mathrm{eff}}';\mathcal{B},\theta)\,
d\mu_{\Omega,\theta}(\mathcal{B})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c59d39d1d41c800f)
It is positive semidefinite by construction as a channel covariance:
$$
\int\!\!\int
f_A(t_{\mathrm{eff}})\,
\mathsf N^{\mathrm{bw}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)\,
f_B(t_{\mathrm{eff}}')\,dt_{\mathrm{eff}}\,dt_{\mathrm{eff}}'
\ge 0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9d05965974a2b42a)
for every resolved test channel $f_A(t_{\mathrm{eff}})$ on the observation window. A model that violates this condition has broken the covariance decomposition rather than discovered a new observer-layer effect.

A detector model may add separately calibrated residuals,
$$
\mathsf N_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
=
\mathsf N^{\mathrm{bw}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
+
\mathsf N^{\mathrm{det}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')
+
\mathsf N^{\mathrm{env}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')
$$

[View →](../../../../../equation-mapping.html#corpus-equation-388721577cb3d390)
The same decomposition should be reused across weak-probe, interferometric, and precision-gravity comparisons. If a proposed measurement model must retune the unresolved boundary covariance separately for each branch or observable, the observer-level closure has failed rather than discovered a new ontology.

For weak-field GR comparisons, this page treats the ADM/Cartan projection defined by [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md) as an input consumed by the observer record. The observer layer should carry the whole channel bundle at once:
$$
\Theta_{\mathrm{weak}}^{(O,W)}
=
\left(
\mathcal N_{\text{sea}}|_{\Omega,W},
O_W,
\mathcal{B}_{\partial\Omega}^{(O)}(W),
\widehat{\mathcal{B}}_{\partial\Omega}(W),
\mu_{\Omega,\theta},
\mathsf N^{\mathrm{bw}}_{AB},
\mathsf N^{\mathrm{det}}_{AB},
\mathsf N^{\mathrm{env}}_{AB},
\Pi_{\mathrm{ADM}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7935beeee6d483c3)
where $\Pi_{\mathrm{ADM}}$ is the observer-level projection, owned by the effective-metric map, to $(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}},\Phi_{\text{eff}},\chi_{\text{sea}})$. The lapse $N$ inside $\Pi_{\mathrm{ADM}}$, the medium-state notation $\mathcal N_{\text{sea}}$, and the covariance kernels $\mathsf N_{AB}$ are distinct objects. Redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals must be read from $\Theta_{\mathrm{weak}}^{(O,W)}$ with the same covariance and boundary-data model. A channel-specific replacement of $\mu_{\Omega,\theta}$, $\mathsf N^{\mathrm{bw}}_{AB}$, or the imported $\Pi_{\mathrm{ADM}}$ is therefore a retuning residual, not an improved observer model.

The same declared-measure discipline applies to observer-level probability tables and ensemble summaries. For a Physical Observer record $\theta$, observation window $W$, readout channel $Y_A$, and event set $B$, the probability assigned to that readout should be a pushforward of the conditional measure already tied to retained boundary data:
$$
P_{\Omega,\theta,W}(Y_A\in B)
=
\mu_{\Omega,\theta}\!\left(
\{\mathcal{B}:Y_A(t_{\mathrm{eff}};\mathcal{B},\theta)\in B\ \text{on}\ W\}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-24df9d631c9600b9)
If a comparison requires different measures for branch weights, thermodynamic noise, observer selection, or readout covariance while holding the same observer record $\theta$, it is a set of separately fitted summaries rather than one observer-model closure.

### Absolute and Operational Simultaneity

At the ontic level, simultaneity is absolute. Two events
$$
(T_1,\mathbf X_1)
\qquad\text{and}\qquad
(T_2,\mathbf X_2)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-583c1a08ed514685)
are simultaneous exactly when
$$
T_1=T_2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba421917b1afa127)

The simultaneity slice is
$$
\Sigma_T=\{T\}\times\mathbb{R}^3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07d3ca3f11d055d3)

This is a statement about the substrate foliation of absolute timespace. It is not a statement that any Physical Observer can operationally reconstruct the whole slice.

Physical Observers define simultaneity through clocks, rulers, and signal exchanges. Because those clocks and rulers are assemblies and because signals propagate at finite speed, different moving observers may assign different operational simultaneity surfaces.

The disagreement is epistemic rather than ontological:

- The $\mathbb{U}_{\text{now}}$ universe-state perspective has one absolute slice $\Sigma_T$.
- Physical Observers recover only operational synchronization conventions.
- In validated regimes, those operational conventions must reproduce Lorentz-consistent clock, ruler, and two-way signal phenomenology while bounding preferred-frame leakage below observational limits.

### Effective Causal-Order Recovery

External causal-order reconstruction theorems provide a useful comparison discipline: effective causal relations can determine much of an observer-level geometry, but not the local scale by themselves. In this framework, that scale is supplied by Physical Observer clocks, rulers, and signal channels. All three are assembly and Noether sea outputs rather than substrate intervals.

For a declared GR comparison metric supplied by the effective-metric map and a candidate Noether sea state and observer-state parameter record $\theta$, let $\prec_{\mathrm{eff}}(\theta)$ be the causal order inferred by Physical Observers from photon-channel records and clock synchronization, and let $\prec_{\mathrm{GR}}$ be the causal order of the target effective metric. A compact observer-layer recovery diagnostic is
$$
\mathcal{R}_{\mathrm{causal}}(\theta)
=
d_{\mathrm{ord}}\!\left(\prec_{\mathrm{eff}}(\theta),\prec_{\mathrm{GR}}\right)
+
\lambda_{\tau}
\left\|
\frac{d\tau_{\mathrm{eff}}}{dt_{\mathrm{eff}}}(\theta)
-
\frac{d\tau_{\mathrm{GR}}}{dt_{\mathrm{eff}}}
\right\|_{W}
+
\lambda_{\mathrm{PF}}
\sum_{i=1}^{3}\alpha_i(\theta)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae6894a4e5c2651c)
Here $d_{\mathrm{ord}}$ measures mismatch of inferred causal order on the comparison domain, the clock term supplies the missing local scale, and the preferred-frame term penalizes residual PPN group velocity coefficients. The labels $\tau_{\mathrm{eff}}$ and $\tau_{\mathrm{GR}}$ mark the candidate observer-record clock readout and the GR comparison clock readout; they are not additional substrate time variables. This is a closure target for the observer layer, not a claim that substrate spacetime is Lorentzian.

A causal-set comparison adds a useful uniqueness discipline after the effective-metric map has supplied the candidate metric family. It is not enough for Physical Observer records to fit one effective metric; the same causal-order, clock, ruler, and preferred-frame data should not also fit macroscopically distinct effective metrics at the same declared coarse-graining scale. For a scale $\ell$ and tolerance $\varepsilon$, let $\mathcal{G}_{\ell,\varepsilon}(\theta)$ be the family of GR comparison metrics on the domain whose coarse-grained causal-order and clock/ruler diagnostics satisfy $\mathcal{R}_{\mathrm{causal}}(\theta;g)\le\varepsilon$, using the same residual above with $g$ supplying the target causal order and GR proper-time terms. Define the observer-side reconstruction-uniqueness residual
$$
\mathcal{H}_{\mathrm{eff}}(\theta;\ell,\varepsilon)
=
\sup_{g_1,g_2\in\mathcal{G}_{\ell,\varepsilon}(\theta)}
d_{\mathrm{geom},\ell}(g_1,g_2)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b957339721c910a6)
Small $\mathcal{H}_{\mathrm{eff}}$ says that the observer record determines a unique effective geometry up to the declared coarse-graining scale. Large $\mathcal{H}_{\mathrm{eff}}$ means the observer layer has not supplied enough scale, transport, or preferred-frame information to identify a stable GR comparison geometry. This residual is unrelated to the path-history ledger $\mathcal{H}_{\Omega}^{<T}$ above. It is an effective-reconstruction test only; it does not promote a Lorentzian metric to substrate ontology.

Process-matrix and indefinite-causal-order formalisms are useful here only as comparison frameworks. They test whether operational records can be represented without assuming a prior observer-level causal order, but their generalized process object is not a substrate replacement for absolute timespace. For settings or interventions $\mathbf{s}$ and records $\mathbf{r}$, let $P_{\mathrm{proc}}(\mathbf{r}|\mathbf{s})$ be the external process-table benchmark and let $P_{\mathrm{rec}}^\theta(\mathbf{r}|\mathbf{s})$ be the record distribution derived from Physical Observer laboratories, boundary wake data, apparatus kernels, and the candidate observer-state record $\theta$. A compact diagnostic is
$$
\Delta_{\mathrm{proc}}(\theta)
=
D_{\mathrm{TV}}\!\left(
P_{\mathrm{proc}}(\mathbf{r}|\mathbf{s}),
P_{\mathrm{rec}}^\theta(\mathbf{r}|\mathbf{s})
\right)
+
\lambda_{\mathrm{causal}}\mathcal{R}_{\mathrm{causal}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36fafdb993a33177)
Small process-table mismatch with large $\mathcal{R}_{\mathrm{causal}}$ is a warning that the observer layer has not recovered an effective causal order. It is not evidence that the ontic substrate lacks absolute time. The admissible lesson is diagnostic: preserve the operational record constraint while forcing the Physical Observer account to say how causal order, clocks, and records are recovered together.

### Physical Observer Clocks and Rulers

A Physical Observer clock measures **derived clock time** $\tau$ (standard bridge term: proper time), not the substrate parameter $T$ directly. A ruler is likewise an assembly whose measured length depends on its internal dynamics and medium coupling. In this observer-layer use, `proper` means clock-carried in the relativity comparison sense; it does not mean substrate-level or exemplary time.

The same rule applies to every observer tool. A clock, ruler, detector, telescope, or notebook is an assembly record. It is not a transparent window onto the substrate unless the clock, ruler, signal, and calibration channels have been declared.

This page does not own the clock law. Once a discussion asks how an internal clock frequency changes with velocity, Noether sea density, effective potential, or clock geometry, use [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).

Likewise, this page does not own the full Lorentz comparison. Once a discussion asks whether moving clocks and rulers reproduce Lorentz transformations, use [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md).

### Preferred-Frame Hiding

The ontology contains absolute time, a Euclidean void, and a real medium. Therefore the framework must still explain why Physical Observers do not see unacceptable preferred-frame effects.

The requirement is:

> Physical Observer clocks, rulers, and signal transport must keep preferred-frame signatures below current experimental bounds in validated low-energy and weak-field regimes.

This is not an optional rhetorical claim. It is a closure burden distributed across:

- [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) for clock behavior,
- [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) for moving-observer comparison,
- [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) for preferred-frame leakage coefficients,
- [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) for empirical thresholds,
- and [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) for the current unresolved burden.

### Ownership Boundary

This chapter owns:

- the $\mathbb{U}_{\text{now}}$ universe-state perspective as complete-state bookkeeping,
- the Physical Observer definition,
- the ontic/epistemic distinction,
- the absolute-versus-operational simultaneity split,
- and the routing map for observer-level closure.

This chapter does not own:

- primitive substrate definitions; see [Absolute Time](../../../../markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../../markdown/aaa/foundations/euclidean-void.md), and [Absolute Timespace](../../../../markdown/aaa/foundations/absolute-timespace.md),
- clock laws; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- effective metric construction; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md),
- PPN bounds; see [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md),
- or quantum measurement ontology; see [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md).

### Summary Commitment

> **Observer Commitment:** $\mathbb{A}\mathbb{A}\mathbb{A}$ distinguishes the complete ontic state on an absolute-time slice from the measurements available to embedded Physical Observers. Physical Observers are assemblies inside the Noether sea, so their clocks, rulers, synchronization procedures, and records are dynamical outputs. Effective relativity and quantum state descriptions belong to this observer-accessible layer, not to the primitive substrate itself.

## Proper Time and Time Dilation

This chapter explains how clock time is recovered from assembly dynamics. Absolute time $T$ is the substrate evolution parameter used by the $\mathbb{U}_{\text{now}}$ universe-state perspective in the Euclidean void. Derived clock time $\tau$ is the readout of physical clocks built from Noether braid assemblies. The theorem target is to derive the map between them and show how GR-like time dilation and gravitational redshift arise as effective behavior when the clock map closes.

This chapter keeps `proper time` as the standard relativity bridge term for clock time along a timelike record. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the native claim is more specific: $\tau$ is a derived clock readout, not a second substrate time and not a more fundamental or exemplary time. The word `proper` should therefore be read only in the inherited physics sense of belonging to the physical clock record.

This chapter is the canonical home for derived clock time, observer clocks, clock slowing, and the clock map from absolute time $T$ to measured clock readout $\tau$. Foundation and ontology pages should point here once the discussion becomes a clock law, frequency extraction, observer-clock comparison, or Lorentz/GR time-dilation recovery.

For the detailed comparison between special-relativistic clock language and the deformable Noether braid implementation story, see [the special-relativity bridge](../../../../markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md).

The practical rule is to never ask only how fast two clock centers move relative to each other. Ask which assembly cycle is being counted, what local Noether sea state it samples, the clock orientation and group velocity, and which effective observer chart receives the record. Relative velocity becomes the familiar time-dilation variable only after those native records collapse to the homogeneous weak-field limit.

The primary clock law is phase extraction from a declared assembly channel. A clock is usable only when some internal cycle remains stable enough to count:
$$
\frac{d\tau_{\mathcal A}}{dT}
=
\frac{
\Omega_{\mathcal A}
\left(
\mathbf{w},
\mathcal{N}_{\mathrm{sea}},
R_{\mathcal A},
H_{\mathcal A}
\right)
}{
\Omega_{\mathcal A}^{(0)}
},
\qquad
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3022ac1cbdf14fea)
Here $\varphi_{\mathcal A}$ is the counted clock phase, $\Omega_{\mathcal A}^{(0)}$ is its rest-branch reference rate, $\mathcal{N}_{\mathrm{sea}}$ is the retained Noether sea state, $R_{\mathcal A}$ is the clock geometry/orientation record, $H_{\mathcal A}$ is the relevant path-history ledger, and $\mathbf{w}$ is the clock group velocity relative to local Noether sea flow. A broad native expression such as $d\tau/dT=F(\mathbf{w},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{clock geometry})$ is only a shorthand after this phase channel has been declared; observer comparisons must project it to $d\tau/dt_{\mathrm{eff}}$.

For a two-clock comparison, the native input is not the relative velocity of the two clock centers by itself. It is the pair of local clock records
$$
\mathcal{D}_{\tau}^{AB}
=
\left(
\mathbf{w}_A,
\mathbf{w}_B,
\mathcal{N}_{\mathrm{sea},A},
\mathcal{N}_{\mathrm{sea},B},
R_A,
R_B,
H_A,
H_B
\right),
\qquad
\mathbf{w}_K
=
\mathbf{V}_{K,\mathrm{cm}}
-\mathbf{u}_{\mathrm{sea},K}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2c37ae6a7fd9b1af)
Ordinary relative-velocity time dilation is the weak homogeneous limit of this record after the clock, ruler, and signal channels hide any observer-accessible preferred-frame leakage. If two clocks sample different Noether sea cells, a formula using only $\mathbf{V}_{A,\mathrm{cm}}-\mathbf{V}_{B,\mathrm{cm}}$ has already discarded part of the clock map.

A transported clock supplies a path-integrated test of the same record. For a clock carried around a spatial loop $C$ between shared departure and reunion events and compared on return with a reference clock that remained on worldline $C_0$, define

$$
\Delta\tau_{C:C_0}
=
\int_C
F_{\mathcal A}
\!\left(
\mathbf w_C,
\mathcal N_{\mathrm{sea},C},
R_C,
H_C
\right)dT
-
\int_{C_0}
F_{\mathcal A}
\!\left(
\mathbf w_0,
\mathcal N_{\mathrm{sea},0},
R_0,
H_0
\right)dT,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-112a7cb2d7209d27)

where $F_{\mathcal A}=d\tau_{\mathcal A}/dT$ is the same clock map used above. Oppositely directed circumnavigation paths provide the transported-clock benchmark exemplified by Hafele-Keating-type comparisons, while fiber-linked stationary clocks can supply the endpoint reference without turning photon transport into the carried matter clock. This is distinct from the photon-loop Sagnac row: both loops sample the same declared Noether sea flow, but one integrates a material clock cadence and the other integrates signal propagation. The terrestrial $\mathbf u_{\mathrm{sea}}$ working profile in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#terrestrial-working-drift-profiles) must be used along both paths. CMB-comoving and locally entrained profiles are discriminated by the annual, sidereal, east-west, and altitude dependence of $\Delta\tau_{C:C_0}$.

The target is to reproduce, in the appropriate regime,
$$
\frac{d\tau}{dt_{\mathrm{eff}}} \approx \sqrt{1+\frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}\|^2}{c_0^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc8677a60808f0b3)
and to generalize this map to strong-field and high-velocity conditions.

Notation convention used in this chapter: $n(\mathbf X,T)\equiv \rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is the canonical medium-density variable. The Noether sea delay factor is $\chi_{\text{sea}}(\mathbf X,T)\equiv c_f/c_{\text{eff}}(\mathbf X,T)$; use it for refractive-delay language so $n$ remains reserved for density. The clock-law derivation imports the [transverse causal budget lemma](../../../../markdown/aaa/noether-braid/braid-mathematics.md#transverse-causal-budget-lemma): primitive branch tests may use $c_f$, but observer-level clock comparison uses the declared dressed speed $c_\star$, usually $c_\star=c_{\text{eff}}(\mathbf X,T)$ in a local Noether sea cell.

---

### Conceptual Setup

#### Absolute Time vs Derived Clock Time

- **Absolute time $T$**
  - Fundamental evolution parameter for the complete architrino dynamics.
  - Global, universal, non-dynamical; used by the $\mathbb{U}_{\text{now}}$ universe-state perspective (simulation clock).
  - All worldlines are parametrized directly by $T$.

- **Derived clock time $\tau$** (standard bridge term: proper time)
  - Time read by a **physical clock**: a bound Noether braid assembly, such as an atomic transition or binary oscillation, interacting with the Noether sea.
  - Encodes how many internal oscillation cycles occur per unit $dT$ before projection into an observer chart.
  - The word `proper` does not mean substrate-level, privileged, or exemplary; it names the inherited relativity comparison target for a clock-carried record.

The fundamental claim is:

> Time dilation is not a change in the rate of $T$; it is a change in how fast internal dynamics of assemblies proceed **relative to** $T$, and then how that clock readout projects into $t_{\mathrm{eff}}$, due to motion and medium coupling.

#### Clocks as Dynamical Systems

A clock is any assembly with a **stable, countable internal cycle**. The native picture is not time itself slowing; the countable assembly cycle is what changes cadence:

- Minimal model: a Noether braid with one declared clock-channel index $a_{\mathrm{clk}}\in\{1,2,3\}$ whose cycle is counted. The clock-channel role is extracted from the record and is not assigned by radius order.
- Base frequency $\omega_0$ (or period $P_0 = 2\pi/\omega_0$) is defined for:
  - Clock **at rest** in the absolute frame.
  - In a region of homogeneous Noether sea density $n=1$ and negligible external gradients.

Derived clock time is then defined operationally as:
$$
d\tau = \frac{\omega(\text{state})}{\omega_0}\, dT
$$

[View →](../../../../../equation-mapping.html#corpus-equation-71107e7a9b84157d)
where $\omega(\text{state})$ is the instantaneous internal oscillation frequency in the actual kinematic and environmental state.

The central problem is to compute $\omega(\mathbf{w},n,\chi_{\text{sea}},\Phi_{\text{eff}})$ from the master dynamics rather than assigning the clock-rate factor by analogy with relativity.

#### Moving-Branch Clock Retuning Target

The homogeneous moving-clock extraction is independent from weak-field PPN matching. Primitive branch calculations solve causal roots with $c_f$:
$$
\left\|\mathbf X_{o}(T)-\mathbf X_{j}(T_0)\right\|
=
c_f(T-T_0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-35f02051aff239c6)
The dressed observer-channel speed $c_\star$ is declared only after the clock/ruler channel is chosen: $c_\star=c_f$ for a primitive branch scan and usually $c_\star=c_{\text{eff}}(\mathbf X,T)$ for a Noether sea dressed clock comparison. Thus
$$
\mathbf{w}
=
\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}},
\qquad
\beta_\star=\frac{\|\mathbf{w}\|}{c_\star},
\qquad
\gamma_\star(\mathbf{w})=\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3eb1204b66abfc3a)
where $\mathbf{w}$ is the clock assembly group velocity through the local Noether sea.

The locally measured speed of light is therefore a co-calibrated observer readout, not a primitive identity among all speed symbols. In a weak homogeneous calibration cell $W_0$, a Physical Observer obtains the empirical value by comparing photon-channel round-trip transport against its own ruler and derived clock phase:
$$
c_0
=
\frac{2L_{\mathrm{obs}}(W_0)}
{\Delta\tau_{\gamma,\mathrm{rt}}(W_0)}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-134ef13e4ca5ce7a)
The numerator is a ruler response, the denominator is a clock readout, and the photon path samples the photon-channel speed $c_\gamma$. The closure burden is to derive why $c_{\text{eff}}$, $c_\gamma$, and $c_0$ share one weak-homogeneous measured limit within the preferred-frame leakage budget, then separately determine that common value's relationship to primitive $c_f$; neither identification can be supplied by notation alone.

The [weak-homogeneous speed-factorization lemma](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#weak-homogeneous-speed-factorization-lemma) separates that burden into two statements. Calibration closure and photon common-mode closure can establish $c_\gamma=c_{\text{eff}}=c_0$, while the additional constitutive condition $\chi_{\mathrm{sea},0}=1$ is required to identify their common value with primitive $c_f$. If instead $\chi_{\mathrm{sea},0}>1$, the observer channels may still close on one speed while $c_f>c_0$ remains a substrate-to-observer hierarchy.

The simple clock-budget target is that the declared channel speed splits into group velocity (center-of-mass convention) and transverse closure:
$$
c_\star^2
=
\|\mathbf{w}\|^2+c_{\perp}^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5330edf862d8c173)
so
$$
c_{\perp}
=
c_\star\sqrt{1-\frac{\|\mathbf{w}\|^2}{c_\star^2}}
=
\frac{c_\star}{\gamma_\star(\mathbf{w})}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a02d9cc11e62d3ed)
An accepted clock branch must then extract
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star(\mathbf{w})}
$$

[View →](../../../../../equation-mapping.html#lorentz-clock-rate)

from its internal phase dynamics, rather than assign the factor independently.

For an admitted moving Noether braid branch $q$ on a group-speed band $0\le \|\mathbf{w}\|/c_f\le\beta_{\max}<1$, choose one clock phase $\theta_{\mathrm{clk},q}$ from the same causal-root ledger used for the branch's geometry. The extracted period is
$$
P_q(\mathbf{w})
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
P_0=P_q(\mathbf{0})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7d21870566bab09b)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

and the clock residual is
$$
R_T^{(q)}(\mathbf{w})
\equiv
\frac{P_q(\mathbf{w})}{P_0}
-
\gamma_\star(\mathbf{w})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4c530e05f6920294)
The moving-clock theorem target is
$$
\left|R_T^{(q)}(\mathbf{w})\right|
\le
C_T\epsilon_{\text{LV}}\beta_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-93af84c8ee8b5221)
uniformly on the group-speed band, with any surviving preferred-frame sideband reported as a branch-sourced leakage term. This packet fails if the clock phase and ruler geometry come from different branch ledgers, if the residual is suppressed only by fitting a PPN coefficient after the fact, or if $c_f$ is silently identified with $c_\star$ without a dressing map.

This moving-clock row is one leg of the structural-integrity common-limit closure in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). It is not enough for the clock branch to approximate $\gamma_\star^{-1}$ in isolation. The same causal-root ledger must also produce the moving ruler deformation, photon synchronization row, and weak-field gravity-channel speed row used by Lorentz closure; otherwise the clock result is a branch-split fit rather than clock-map closure.

#### Noether Sea Braid Cadence

For redshift and cosmology work, the local Noether sea braid cadence can serve as the immediate clock reference before any separate detector clock is introduced. Let $\Omega_N(\mathbf X,T)$ be a representative cadence extracted from the local Noether sea braid population, with $P_N(\mathbf X,T)=2\pi/\Omega_N(\mathbf X,T)$. Relative to the weak homogeneous reference cadence, define

$$
\Gamma_N(\mathbf X,T)
\equiv
\frac{P_N(\mathbf X,T)}{P_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf X,T)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d3a5e0a0a1a6f616)

Here $P_{N0}$ is the reference Noether sea braid cycle period.

The quantity $\Gamma_N$ records local cadence stretching of the Noether sea itself. It is therefore a substrate-facing clock diagnostic: $\Gamma_N=1$ marks the weak homogeneous reference, while $\Gamma_N>1$ marks a locally slowed or stretched Noether sea cadence. In the homogeneous moving Noether braid branch, the Lorentz-closure target is to derive the appropriate limit $\Gamma_N\to\gamma_\star$ or, equivalently, $\Omega_N/\Omega_{N0}\to1/\gamma_\star$ for the declared clock channel. In a gravitational or cosmological Noether sea state comparison, $\Gamma_N$ must instead be extracted from $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $\Phi_{\text{eff}}$, and clock geometry.

This diagnostic does not replace the clock readout. Native clock-map derivations use $d\tau/dT$, while observer-coordinate comparisons use $d\tau/dt_{\mathrm{eff}}$. $\Gamma_N$ supplies a more primitive Noether sea cadence factor from which clock-rate comparisons, gravitational redshift, and the redshift factorization in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md#noether-sea-braid-factorization-target) can be built. The ordinary local clock-rate factor is the inverse:

$$
C_N(\mathbf X,T)
\equiv
\frac{\Omega_N(\mathbf X,T)}{\Omega_{N0}}
=
\Gamma_N^{-1}(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9cb615956f2447de)

Using $C_N$ as the emitting or receiving matter-clock factor requires a same-cell identification that must be tested rather than assumed. For a declared clock assembly $\mathcal A$, define
$$
\Delta_{\mathrm{clk\text{-}sea},\mathcal A}
\equiv
\ln\!\left[
\frac{\Omega_{\mathcal A}(\mathbf X,T)}
{\Omega_{\mathcal A}^{(0)}}
\right]
-
\ln C_N(\mathbf X,T).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-26bc0e766ff038dd)
The endpoint redshift factorization may use $\Gamma_N$ directly as the source/detector clock conversion only on a branch where $\Delta_{\mathrm{clk\text{-}sea},\mathcal A}=0$ within tolerance for both endpoint clock records. Otherwise the two mismatch terms remain explicit; they cannot be absorbed into the launch factor or path-history propagation row.

In the homogeneous moving Noether braid branch, the geometry-to-clock closure target is $C_N\to\xi\to1/\gamma_\star$, so the corresponding cadence-stretch target is $\Gamma_N\to1/\xi\to\gamma_\star$.

In the weak-field endpoint limit, the required recovery condition is

$$
\frac{\Omega_N(\mathbf X,T)}{\Omega_{N0}}
\approx
1+\frac{\Phi_N(\mathbf X,T)}{c_0^2},
\qquad
\Gamma_N(\mathbf X,T)
\approx
1-\frac{\Phi_N(\mathbf X,T)}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-93ca3ce444633449)

to first order in $\Phi_N/c_0^2$. Since $\Phi_N < 0$ in a deeper potential, this gives $\Gamma_N > 1$ there: the local Noether sea braid cadence is stretched relative to the weak homogeneous reference. For two endpoint cells $E$ and $R$ with no source-branch, launch, or path-history correction, the redshift recovery condition is therefore

$$
\ln(1+z)
\approx
\ln\Gamma_{N,E}-\ln\Gamma_{N,R}
\approx
\frac{\Phi_N(R)-\Phi_N(E)}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b6420fa9dce2374b)

This is the clock-channel version of the weak gravitational-redshift benchmark. The derivation burden is to obtain the first equation from Noether sea constitutive response rather than impose it as an imported metric fact.

#### GR Proper-Time Functional Benchmark

The same clock map must also reproduce the observer-level proper-time functional that GR uses for timelike records. This is a bridge benchmark, not a substrate definition of time. For a candidate effective metric recovered from the Noether sea record,
$$
d\tau
=
\frac{1}{c_0}
\sqrt{-g^{\text{eff}}_{\mu\nu}dx^\mu dx^\nu}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88c5350d2fa2aad3)
with the weak-field static endpoint limit above and the moving-clock limit
$$
g^{\text{eff}}_{\mu\nu}
\frac{dx^\mu}{d\tau}
\frac{dx^\nu}{d\tau}
=
-c_0^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1d7d800b6f44e95b)
This equation is not a claim that the Euclidean void is a four-dimensional curved substrate. It is the observer-level action benchmark: physical clocks should extremize the same effective interval that the signal, ruler, and orbital modules use when they project the Noether sea state into GR comparison language. If a branch recovers endpoint redshift but fails the integrated clock functional along accelerated or orbital records, the clock map has not closed.

#### Gamma-N Geometry Extraction Target

The equations above define the endpoint benchmark, but they do not yet derive the Noether sea cadence factor from Noether braid geometry. A first-order extraction scaffold should start from the local variables that already appear in the clock and transport programs: normalized Noether braid density $n$, Noether sea delay factor $\chi_{\text{sea}}$, envelope scale $\lambda$, envelope shape ratio $\xi$, and a representative Noether braid scale $R_{\text{braid}}$. Around the weak homogeneous reference, collect the logarithmic deformation record

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\chi_{\text{sea}},\,
\ln\lambda,\,
-\ln\xi,\,
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a46d789ceb9106cc)

The candidate extraction law is

$$
\ln\Gamma_N
=
\mathbf{b}_N\cdot\mathbf{g}_N
+\mathcal{R}_{\Gamma}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f089d5e0e2dc557f)

where $\mathbf{b}_N$ is a constitutive coefficient row and $\mathcal{R}_{\Gamma}$ contains higher-order and branch-specific corrections. Write the row as

$$
\mathbf{b}_N
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_\xi,\,
b_R
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-833e66c77e8d2694)

The sign convention places $-\ln\xi$ in the deformation record because the homogeneous Lorentz-closure branch requires $\Gamma_N\to1/\xi$ when the clock readout is controlled only by oblate moving Noether braid geometry. In that branch

$$
\mathbf{g}_N^{\mathrm{mov}}
=
\left(
0,\,
0,\,
0,\,
\ln\gamma_\star,\,
0
\right)^T
+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fa006be2e344f197)

so the moving Noether braid constraint fixes

$$
b_\xi=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ddb1a2e9ae23ad5a)

up to preferred-frame leakage. The first-order admissible row is therefore

$$
\mathbf{b}_N
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
1,\,
b_R
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8edf14499a6bf479)

with the remaining coefficients belonging to the isotropic Noether sea constitutive response rather than to Lorentz geometry.

This is also the convention bridge to the effective metric subclass. If the local metric clock-rate factor is written as an isotropic factor times the envelope shape ratio,

$$
C_N^{\mathrm{met}}
=
\Omega_{\mathrm{clk}}(n,\chi_{\text{sea}},\lambda,R_{\text{braid}})\,\xi
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a95758caeb211954)

then the cadence-stretch factor is

$$
\Gamma_N^{\mathrm{met}}
=
\left(
\Omega_{\mathrm{clk}}\xi
\right)^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0a836b066abcb1bc)

Writing

$$
\ln\Omega_{\mathrm{clk}}
=
\omega_n\ln n
+\omega_\chi\ln\chi_{\text{sea}}
+\omega_\lambda\ln\lambda
+\omega_R\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}
+\mathcal{R}_{\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d99f796bbd25d77b)

therefore gives the coefficient identification

$$
b_n=-\omega_n,\qquad
b_\chi=-\omega_\chi,\qquad
b_\lambda=-\omega_\lambda,\qquad
b_R=-\omega_R,\qquad
b_\xi=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-de32bdacec9cfeb8)

The weak-field recovery condition then becomes a constraint on the same coefficient row:

$$
\ln\Gamma_N(\mathbf X,T)
=
-\frac{\Phi_N(\mathbf X,T)}{c_0^2}
+O\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b98e8e2198fada3)

or, locally,

$$
\mathbf{b}_N\cdot\nabla\mathbf{g}_N
=
-\frac{\nabla\Phi_N}{c_0^2}
+O\!\left(\frac{\Phi_N\nabla\Phi_N}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f292798e3fefef47)

Equivalently, let $U\equiv-\Phi_N>0$ and define the static weak-potential response coefficients by

$$
\ln n=a_n\frac{U}{c_0^2},\qquad
\ln\chi_{\text{sea}}=a_\chi\frac{U}{c_0^2},\qquad
\ln\lambda=a_\lambda\frac{U}{c_0^2},\qquad
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}=a_R\frac{U}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-05e9a66a740ae67c)

to first order, with $-\ln\xi=0+O(U^2/c_0^4)$ in an isotropic static endpoint cell. Then weak gravitational redshift fixes only the scalar combination

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bfeb9203c8a8c97b)

In clock-rate language this is the equivalent condition

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1a28ac3218d03be4)

This is the first useful reduction of the proof burden. The Lorentz branch fixes the shape coefficient $b_\xi$, while static weak-field redshift fixes one isotropic coefficient combination. Individual values of $b_n$, $b_\chi$, $b_\lambda$, and $b_R$, or equivalently of the $\omega$ row, require a constitutive calculation or simulation that extracts how a mass source changes $n$, $\chi_{\text{sea}}$, $\lambda$, and $R_{\text{braid}}$ in the same Noether sea cell.

Existing weak-field signal tests constrain one neighboring component of this vector. The PPN Shapiro-delay map uses the observer-normalized delay factor

$$
\bar{\chi}_{\text{sea}}
=
\frac{c_0}{c_{\text{eff}}}
=
1+(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-19fec1babf2d6717)

so its logarithmic response is

$$
\delta\ln\bar{\chi}_{\text{sea}}
=
(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8d2e34beb30622ad)

This fixes a signal-delay response coefficient $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$, giving $a_\chi^{\mathrm{sig}}\approx2$ in the GR-matching solar-system branch. It becomes the clock-row coefficient $a_\chi$ only if the clock cadence and signal-propagation channel share the same scalar delay response in the tested branch. If they do not, the difference is not fit freedom; it is a channel-splitting residual that must be carried into PPN, redshift, and pressure-response comparisons.

##### Shared Clock/Signal Delay Closure

The equality between the clock coefficient and the Shapiro-delay coefficient is therefore a closure condition:

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-a_\chi^{\mathrm{sig}}
=
a_\chi-(1+\gamma_{\mathrm{PPN}}),
\qquad
\Delta_\chi^{\mathrm{clk\text{-}sig}}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6fe57db62ae807f7)

A branch may impose this condition only when the same first-order Noether sea delay factor retimes assembly clocks and signal propagation, the photon or signal channel has no separate $\chi_\gamma$ response at $O(U/c_0^2)$, the asymptotic normalization $c_0/c_f$ is spatially constant in the comparison, and the weak cell is isotropic enough that first-order birefringent or stress-anisotropic delay terms are absent.

Under this shared-delay closure, the static endpoint constraint becomes

$$
b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-79bb19359c345ec5)

or, equivalently in clock-rate-row language,

$$
\omega_n a_n+\omega_\chi(1+\gamma_{\mathrm{PPN}})+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5bd8f9f31c9d87dc)

In the GR-matching weak solar-system branch, $\gamma_{\mathrm{PPN}}=1$ makes the delay contribution $2b_\chi$ in the cadence-stretch row and $2\omega_\chi$ in the clock-rate row. If $\Delta_\chi^{\mathrm{clk\text{-}sig}}\neq0$, the branch has not failed by definition, but it must carry $\Delta_\chi^{\mathrm{clk\text{-}sig}}$ as a measured residual across clock redshift, Shapiro delay, pressure-response, and cosmological redshift comparisons rather than absorbing it into a fitted coefficient.

The first admissible static packet is the minimal shared-delay specialization of this row. Let

$$
A_\chi\equiv1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d5298d474772e1a4)

If the weak static endpoint cadence is assigned entirely to the shared scalar delay response at first order, then

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0,\,
A_\chi,\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f6c3e0cfe0ef5b1f)

and the cadence-stretch row is

$$
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
A_\chi^{-1},\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-34055c6ee6794a7d)

The inverse clock-rate row is therefore

$$
\left(
\omega_n,\,
\omega_\chi,\,
\omega_\lambda,\,
\omega_R
\right)
=
\left(
0,\,
-A_\chi^{-1},\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a2fde75dcac68696)

so

$$
\mathbf b_N\cdot\mathbf a=1,\qquad
\boldsymbol\omega\cdot\mathbf a=-1,\qquad
b_i+\omega_i=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-452db7ebcd0c234e)

For the GR-matching weak branch, $A_\chi=2$, giving $a_\chi=2$, $b_\chi=1/2$, and $\omega_\chi=-1/2$. This is a minimal endpoint packet, not a proof that density, envelope scale, or core-radius responses are physically absent. A compensated static family remains admissible:

$$
a_\chi=A_\chi,\qquad
b_\chi
=
\frac{
1-b_n a_n-b_\lambda a_\lambda-b_R a_R
}{
A_\chi
},
\qquad
\omega_i=-b_i
$$

[View →](../../../../../equation-mapping.html#corpus-equation-84328dadbe0b963f)

##### Compensated Static-Family Validation Packet

The compensated family is a constrained endpoint row, not an additional redshift fit. Under shared clock/signal delay, define the non-$\chi_{\text{sea}}$ static response vector and coefficient row by

$$
\mathbf{u}^{G}
=
\left(
a_n,\,
a_\lambda,\,
a_R
\right)^T,
\qquad
\mathbf{c}
=
\left(
b_n,\,
b_\lambda,\,
b_R
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c20a455a876ba400)

The weak static endpoint condition is then

$$
S_G
\equiv
\mathbf{c}\cdot\mathbf{u}^{G}
+b_\chi A_\chi
=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-258a5d975a739e88)

A finite-height clock comparison samples the spatial derivative of the same scalar. For a small upward separation $L$ near Earth, with $U(z+L)-U(z)\approx-gL$, the clock-rate ratio obeys

$$
\frac{\Delta\nu}{\nu}
=
-\Delta\ln\Gamma_N
=
S_G\frac{gL}{c_0^2}
+O(L^2)
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aa0b5a06479ac2d6)

Thus finite-height redshift fixes $S_G=1$ to the experimental tolerance. It does not distinguish the minimal row $\mathbf{c}=\mathbf{0}$ from a compensated row with $\mathbf{c}\cdot\mathbf{u}^{G}\ne0$ and adjusted $b_\chi$, provided the same coefficients are used across the sample.

Hydrogen spectral conversion adds a record-difference test rather than another endpoint normalization. For two admissible hydrogen records $\ell$ and $\ell'$ whose line-inferred cadence stretch agrees after the envelope-gap residual is removed, the same spectral row must satisfy

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot
\left(
\mathbf{g}_{N,\mathrm H}^{(\ell)}
-
\mathbf{g}_{N,\mathrm H}^{(\ell')}
\right)
=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1948a88723c6fa33)

The minimal shared-delay row passes only if the record difference has no uncompensated $\chi_{\text{sea}}$ component after the fixed $-\ln\xi$ term is included. The hydrogen toy scan now demonstrates the discriminant: the clean shared-delay row passes a clean $\chi_{\text{sea}}$-only packet, while the density/scale-compensated row passes the split-record scaffold. This does not yet prove that the gravitational static endpoint has nonzero $a_n$, $a_\lambda$, or $a_R$; it demonstrates within the scaffold that any atom-local record with persistent density, scale, or core-radius splits must use one shared compensated row instead of per-line clock factors; the universal statement remains a conjectured consistency requirement.

Pressure-response replay supplies the independent shared-row test. Let

$$
\mathbf{a}^{G}
=
\left(
a_n,\,
A_\chi,\,
a_\lambda,\,
a_R
\right)^T,
\qquad
\mathbf{a}^{P\to\Gamma}
=
\frac{\delta\mathbf{g}^{P,\mathrm{iso}}}
{\delta\ln\Gamma_N^{P,\mathrm{iso}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8add6d6b9525999b)

A single isotropic cadence row can serve both the gravitational endpoint and the pressure-normalized replay only if

$$
\begin{pmatrix}
\left(\mathbf{a}^{G}\right)^T\\
\left(\mathbf{a}^{P\to\Gamma}\right)^T
\end{pmatrix}
\mathbf{b}
=
\begin{pmatrix}
1\\
1
\end{pmatrix},
\qquad
\omega_i=-b_i
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a63bfc2ad5245009)

The current Fe/Cr toy pressure projection has $\mathbf{a}^{P\to\Gamma}=(0,0.6,0,0)^T$ (toy-replay value; no linked packet), while the GR-matching shared-delay endpoint has $A_\chi=2$. Therefore the $\chi_{\text{sea}}$-only shared row is falsified for that toy pressure replay. A broader compensated row remains conditional: it requires branch-derived non-$\chi_{\text{sea}}$ pressure response in $n$, $\lambda$, or $R_{\text{braid}}$, and it must still preserve $S_G=1$ for finite-height and endpoint redshift.

The current validation result is therefore:

| Coefficient | Status |
| --- | --- |
| $a_n$ | Optional in the weak static endpoint; conditionally required only if a branch-derived density response is needed to keep hydrogen or pressure records on one shared row. |
| $a_\lambda$ | Optional in the weak static endpoint; conditionally required only if the envelope-scale branch supplies the compensating record. |
| $a_R$ | Optional in the weak static endpoint; conditionally required only after a declared $R_{\text{braid}}$ readout ties the pressure or spectral record to the same row. |

Unconstrained nonzero values of $a_n$, $a_\lambda$, or $a_R$ are disfavored (toy-scoped). They may be promoted only as branch-derived compensated response, not as adjustable redshift coefficients.

This gives the derivation a concrete target. The same $\Gamma_N$ extraction map must recover $\Gamma_N=1$ in the weak homogeneous reference, $\Gamma_N\to1/\xi$ in the homogeneous moving Noether braid Lorentz branch, and $\Gamma_N\approx1-\Phi_N/c_0^2$ in the weak gravitational endpoint branch. It must also remain separate from the launch factor $D_v$ and the path-history propagation factor $Y_X$, so the endpoint contribution to redshift is only

$$
\ln(1+z)_{\mathrm{endpoint}}
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f9d5c2ac776788d3)

The full candidate redshift comparison keeps that endpoint clock term separate from source, launch, and path-history terms:

$$
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
-\ln D_v
+Y_{X,E\to R}
-\ln B_X(E)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cda63ef12a45ddae)

Here $B_X(E)$ is the source-branch factor, $D_v$ is the launch or relative-motion phase-compression factor, and $Y_{X,E\to R}=\ln\mathcal P_{E\to R,X}$ is the path-history propagation integral through the Noether sea. This chapter owns the coefficient-row extraction of $\Gamma_N$ and $C_N=\Gamma_N^{-1}$; [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md#equilibrium-transport-hypothesis) owns the absolute-record transport map and its path-history factors. Those transport factors must not be folded into $\Gamma_N$ unless a derivation proves the reduction in a declared limit.

#### Hydrogen Spectral Clock-Rate Conversion Target

Hydrogen spectra give the first atom-local use of the $\Gamma_N$ extraction map. The cadence-stretch factor is not the frequency multiplier itself. In the sign convention above, $\Gamma_N>1$ means the local Noether sea cadence is stretched, so the corresponding local clock-rate factor is

$$
C_N(\mathbf X,T)
=
\Gamma_N^{-1}(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-04c3beb942a0921c)

For the hydrogen spectral channel at resolution $\ell$, extract the clock-facing deformation record from the same response map used by the spectral scan:

$$
\mathbf{g}_{N,\mathrm H}^{(\ell)}
=
\left(
\ln n_{\mathrm H}^{(\ell)},\,
\ln\chi_{\text{sea},\mathrm H}^{(\ell)},\,
\ln\lambda_{\mathrm H}^{(\ell)},\,
-\ln\xi_{\mathrm H}^{(\ell)},\,
\ln\frac{R_{\text{braid},\mathrm H}^{(\ell)}}{R_{\text{braid},0}}
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4c082d3ed5d46bbc)

The hydrogen clock/rate conversion target is then

$$
\ln\Gamma_{N,\mathrm H}^{(\ell)}
=
\mathbf{b}_{N}^{\mathrm{spec}}\cdot
\mathbf{g}_{N,\mathrm H}^{(\ell)}
+
\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)},
\qquad
C_{N,\mathrm H}^{(\ell)}
=
\left(\Gamma_{N,\mathrm H}^{(\ell)}\right)^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d39f2b933cf2f91b)

The row $\mathbf{b}_{N}^{\mathrm{spec}}$ is not a per-line fit. It is the spectral-channel instance of the same clock-row program above, with $b_\xi=1$ inherited from the homogeneous Lorentz branch and the weak-field scalar combination constrained by gravitational redshift. The residual $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ carries higher-order branch effects such as recoil, hyperfine structure, medium anisotropy, or unresolved source-branch corrections; it must not absorb the basic distinction between $n$, $\chi_{\text{sea}}$, and clock cadence.

For a hydrogen transition $a\to b$, the clock-converted spectral readout is therefore

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
C_{N,\mathrm H}^{(\ell)}
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{h}
+
\nu_{a\to b}^{\mathrm{res},(\ell)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-953b0edf29be2d6f)

Equivalently, an isolated line with bounded event residual gives a line-inferred cadence stretch,

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76adf5d3fbc29f32)

The first pass condition is that one $\Gamma_{N,\mathrm H}^{(\ell)}$ from the local Noether sea response controls the chosen line set:

$$
\max_{(a,b)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
-
\ln\Gamma_{N,\mathrm H}^{(\ell)}
\right|
}{
\left|
\ln\Gamma_{N,\mathrm H}^{(\ell)}
\right|
+
\varepsilon_{\Gamma}
}
\le
\Delta_{\Gamma}^{\mathrm{tol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c0f1fa19f3dc2a0d)

This target fails if $\Gamma_N$ is multiplied directly into the line frequency after being defined as cadence stretch, if each transition requires its own clock coefficient row, if $n$ or $\chi_{\text{sea}}$ is used as a substitute for $\Gamma_N$, if recoil or photon-channel propagation is hidden inside $\Gamma_N$, or if the hydrogen spectral map uses a different Noether sea response record than the clock, Shapiro-delay, or endpoint-redshift comparisons.

The first proof/simulation packet for this row is the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../../../../markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md). It treats $\mathbf{b}_{N}^{\mathrm{spec}}$ as a constrained clock-row instance: $b_\xi=1$ is fixed by the homogeneous Lorentz branch, the weak static endpoint row must satisfy $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$, and the observer frequency uses $C_N=\Gamma_N^{-1}$. The packet passes only if a shared row controls the chosen hydrogen line set across admissible refinement; it fails when the scan needs a transition-specific row, a direct $\Gamma_N$ frequency multiplier, a collapsed density/delay variable, or a residual budget that hides recoil, hyperfine structure, photon-channel propagation, or unresolved source-branch effects.

The first executable scaffold keeps the clock proof burden visible. Its accepted spectral row is inherited from the density/scale-compensated static-response packet, not fitted from hydrogen lines alone. Its hydrogen records also keep $n$, $\chi_{\text{sea}}$, $\lambda$, $\xi$, and $R_{\text{braid}}$ as separate entries in $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, so a row that matches one line or one record can still fail when the component split changes under admissible refinement. The executable derives the scaffold line factors, observer frequencies, and replay envelope gaps from recovered principal labels plus one shared line-inferred $\ln\Gamma_N$. A completed theory-bearing record must therefore supply the same four inputs together from one declared hydrogen spectral channel ledger and the same Noether sea cell: the hydrogen $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record, envelope gaps, observer frequencies, and static response vector.

---

### Mechanisms for Time Dilation

Two coupled mechanisms change the internal frequency of a Noether braid clock. The prescribed [coincident-axis three-binary braid](../../../../markdown/aaa/noether-braid/3d-braid-assemblies.md#coincident-axis-three-binary-coordinate-chart) candidate — one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense, with independent per-binary radii, axial half-separations, transverse orbit radii, and phases — supplies mechanism intuition for a highly coordinated clock. The executable clock record below instead uses a prescribed coincident-midpoint orthogonal-axis braid chart so orientation and per-binary frequency dependence remain independently falsifiable. The two charts are alternative clock candidates, not one clock ontology silently changing family.

#### Kinematic Effect (Velocity Dependence)

When the clock has group velocity (center-of-mass convention) $\mathbf{V}_{\text{cm}}$ relative to a local Noether sea drift $\mathbf{u}_{\text{sea}}$, its material group velocity is $\mathbf{w}=\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}}$:

1. **Path-length elongation:** Internal architrinos must traverse longer spatial paths per cycle because the clock’s center of mass is in motion. Even in the clock’s own rest frame, the underlying wake interactions are evaluated in the absolute frame where the worldline is slanted through absolute timespace.

2. **Finite causal speed:** Primitive self-hit and partner-hit roots are mediated by delayed, radial path-history interactions at speed $c_f$. When those roots are dressed into an observer-level clock law, the transverse budget must be formed with the declared channel speed $c_\star$: $c_\star=c_f$ for a primitive branch test and $c_\star=c_{\text{eff}}(\mathbf X,T)$ for a Noether sea dressed clock comparison.

3. **Shape deformation (Lorentz-link hypothesis):** Under the orthogonal-axis three-binary Lorentz-link hypothesis, increased $\|\mathbf{w}\|$ makes the complete braid's **oblate spheroidal exclusion envelope** flatten along the direction of motion:
 - At low $\|\mathbf{w}\|$, the oblate spheroidal exclusion envelope is nearly spherical.
 - As $\|\mathbf{w}\|\to c_\star$, that envelope contracts along $\hat{\mathbf{w}}$ while maintaining transverse dimensions, yielding semiaxes $(R_{\perp}, R_{\perp}, R_{\parallel})$ and $R_{\parallel} < R_{\perp}$.
 - This geometric dilation changes internal path lengths and curvature, lowering $\omega$.

Geometry terminology follows [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#canonical-geometry-variables): the envelope shape ratio is $\xi=R_{\parallel}/R_{\perp}$. The derived clock-time factor is not defined to be $\xi$; it is the extracted clock observable $\omega_{\text{clk}}/\omega_0=d\tau/dt_{\mathrm{eff}}$ after an effective observer chart is declared. In the homogeneous Lorentz-closure target, the theory must derive $\omega_{\text{clk}}/\omega_0\to\xi\to1/\gamma_\star$.

**Kinematic hypothesis:**
$$
c_{\perp}
=
c_\star
\sqrt{1 - \frac{\|\mathbf{w}\|^2}{c_\star^2}},
\qquad
\omega(\mathbf{w}, n=1) \approx \omega_0 \frac{c_{\perp}}{c_\star}
\quad \Rightarrow\quad
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{\text{kin}} \approx \sqrt{1 - \frac{\|\mathbf{w}\|^2}{c_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd732363b668a113)
in the regime where the clock's motion does not significantly disturb the local Noether sea. For SI comparison in the weak homogeneous comparison, the observer branch sets $c_\star$ to the measured low-gradient clock/signal speed $c_0=c_{\text{eff}}(\infty)$; this is a declared branch status, not an independent replacement for the primitive wake speed $c_f$.

#### Muon Lifetime Benchmark

Cosmic-ray muons supply a compact observer-level benchmark for the moving-clock row. In the standard account, muons formed high in the atmosphere have a rest-frame mean lifetime near $2.2\,\mu\mathrm{s}$ and travel at a large fraction of $c_0$. Without time dilation, a particle moving near $c_0$ for only a few microseconds would cross less than a kilometer before the exponential survival law suppresses the population. Yet high-altitude and sea-level counts, such as the Frisch-Smith Mount Washington comparison, retain far more muons than the undilated lifetime permits.

The benchmark is a clock-law test, not a new substrate-time claim. In the weak homogeneous observer branch, let $N_{\mathrm{high}}$ be the counted muon rate at the high detector, $N_{\mathrm{low}}$ the counted rate at the lower detector, $\Delta h$ the height separation, $\tau_{\mu,0}$ the rest-lifetime comparison value, and $\|\mathbf{w}_\mu\|$ the muon group speed through the local Noether sea. The observer-level survival target is
$$
N_{\mathrm{low}}
\approx
N_{\mathrm{high}}
\exp\!\left[
-
\frac{\Delta h/\|\mathbf{w}_\mu\|}
{\gamma_\mu \tau_{\mu,0}}
\right],
\qquad
\gamma_\mu
=
\frac{1}{\sqrt{1-\|\mathbf{w}_\mu\|^2/c_0^2}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c56da42f9f4c60a1)

The same event can be described in the muon's effective rest chart as length contraction of the atmospheric path. In $\mathbb{A}\mathbb{A}\mathbb{A}$ both descriptions are downstream exports of one moving-assembly response: the external observer sees a slowed internal reaction clock, while the muon-channel description compresses the traversed distance. The native burden is to derive the same $\gamma_\mu$ from the assembly and Noether sea record that also supports clocks, rulers, photon synchronization, and bounded preferred-frame leakage.

#### Gravitational Effect (Medium Dependence)

Massive assemblies polarize and densify the surrounding Noether sea. A clock deeper in this polarized region experiences:

1. **Higher local Noether density $n(\mathbf X,T)$ (equivalently higher $\rho_{\text{NS}}$):** Interaction delays with the Noether sea (and between internal architrinos through the Noether sea) increase. This raises the **Noether sea delay factor** $\chi_{\text{sea}}$ for internal processes.

2. **Effective field speed reduction $c_{\text{eff}}(\mathbf X,T) < c_f$:**
 - The propagation of wake influences is slowed in dense regions (more frequent encounters with Noether braids).
 - From the clock's perspective, each internal wake contribution is delayed in the declared clock map.

3. **Tidal distortion of Noether braid geometry:** Gradients in $n$ and the effective potential $\Phi_{\text{eff}}$ compress the braid differently along radial vs tangential directions. This modifies binary radii and thus frequencies.

**Gravitational hypothesis:** To first order in the Newtonian potential $\Phi_N(\mathbf X,T)$,
$$
\omega(\Phi_N) \approx \omega_0\left(1 + \frac{\Phi_N}{c_0^2}\right)
\quad \Rightarrow \quad
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{\text{grav}} \approx 1 + \frac{\Phi_N}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-24b2b751b10b3a1a)
with the sign convention chosen so that $\Phi_N < 0$ (deeper potential) yields **slower** clocks ($d\tau/dt_{\mathrm{eff}} < 1$), consistent with GR.

#### Finite-Height Clock Benchmark

Modern optical-clock comparisons turn gravitational time dilation into a finite-sample constraint, not only a satellite-scale or tower-scale effect. Near Earth's surface, two static clock elements separated by height $L$ should show
$$
\frac{\Delta\nu}{\nu}
\approx
\frac{\Delta\Phi_N}{c_0^2}
\approx
\frac{gL}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4301ecefeb0aadf9)
Thus $L=1\,\mathrm{mm}$ corresponds to $\Delta\nu/\nu\approx1.1\times10^{-19}$, while $L=33\,\mathrm{cm}$ corresponds to $\Delta\nu/\nu\approx3.6\times10^{-17}$. These numbers are direct weak-field acceptance tests for the extracted clock map: the same Noether sea constitutive response that slows separated clocks must also describe an extended clock sample whose lower and upper portions accumulate different derived clock phases.

For independent atoms this can be corrected pointwise, as in ordinary redshift compensation. For entangled or collective clock states, however, assigning the entire apparatus the derived clock time at the trap center is only an approximation. The $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target is to derive the measured clock time from collective phase evolution across the sample, with the center-time prescription emerging only when the gradient-induced phase spread is below the experiment's uncertainty.

Guided/free-fall atom interferometers sharpen this target because one branch is held in the laboratory frame while the other follows a free-fall trajectory. After subtracting controlled laser, magnetic, and preparation phases, the branch comparison should expose a cubic-time phase coefficient:
$$
\Delta\phi_{\mathrm{gf}}(T)
=
\widehat{\beta}_{T^3}T^3
+\Delta\phi_{\mathrm{ctrl}}(T)
+O(T^4)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0077a0ddcb45b39a)
This coefficient must be derived from the same weak-field clock and phase map that produces the finite-height redshift benchmark. A fit to $\widehat{\beta}_{T^3}$ cannot be allowed to use one effective potential record while the redshift, Shapiro-delay, lensing, PPN, or gravitational-wave-speed channels use another.

#### Quantum Clock-Interference Benchmark

Matter-wave interferometers separate two evidential levels. A branch phase shift induced by a gravitational potential can be retained as an effective-potential or gravitational Aharonov-Bohm comparison; by itself it is a phase recovery target, not proof that a portable clock record accumulated different derived times along the branches. Neutron COW-style phase experiments therefore belong on the phase-only side unless the internal degree of freedom itself functions as a clock.

The stronger benchmark appears when an internal degree of freedom is prepared as a clock and remains correlated with the path history. Let the two branch histories $\gamma_1$ and $\gamma_2$ export internal clock states $|\tau_1\rangle$ and $|\tau_2\rangle$ at recombination. The clock part of the visibility target is
$$
\mathcal{V}_{\mathrm{clk}}
=
|\langle \tau_1|\tau_2\rangle|,
\qquad
\mathcal{D}_{\mathrm{clk}}
=
\sqrt{1-\mathcal{V}_{\mathrm{clk}}^2}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e7ab7276510aa91d)
The interference loss is then a record-formation question: visibility falls only to the extent that the internal clock states become distinguishable enough to supply which-path information. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this does not promote branch-dependent time to substrate ontology. It says that a Noether braid clock can export branch-dependent clock records, and that the same clock map that recovers $d\tau/dt_{\mathrm{eff}}$ in homogeneous moving-clock and weak-field limits must also predict the internal-state overlap for neutron, atom, or optical-ion clock interferometers.

#### Combined Dilation

In a region with potential $\Phi_N(\mathbf X,T)$ and clock group velocity $\mathbf{w}$ relative to the Noether sea, we conjecture the observer-chart comparison
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
= \frac{\omega(\mathbf{w},\Phi_N,n)}{\omega_0}
\approx \sqrt{1 + \frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}\|^2}{c_0^2}}
$$

[View →](../../../../../equation-mapping.html#weak-field-clock-redshift)

in the weak-field, low-velocity observer limit, with higher-order corrections ($\|\mathbf{w}\|^4/c_0^4$, $\Phi_N^2/c_0^4$, cross-terms) determined by the detailed Noether braid response. Primitive simulations may still use $c_f$ inside the root equation; the PPN comparison uses the dressed asymptotic speed $c_0$.

Outside that limit, the native clock map $F$ will in general deviate from the GR expression and define the theory's distinctive strong-field / high-velocity predictions.

#### Effective Energy-Momentum Closure Test

In the same weak-field regime where the clock law is expected to be Lorentz-like, the center-of-mass kinematics should satisfy the effective mass-shell closure
$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3dd81c9a2a2616ed)
with $d\tau/dt_{\mathrm{eff}}=\gamma_\star^{-1}$ and
$$
E_{\text{CM}}=\gamma_\star M_0c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_\star M_0v.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-59b67c6eb65aa89c)
Here $\gamma_\star$ is the kinematic Lorentz-response factor for the declared speed channel. It is distinct from the scalar PPN spatial-compliance parameter $\gamma_{\mathrm{PPN}}$ and from the index-bearing spatial metric family $\gamma_{ij}^{\mathrm{eff}}$ and $(\gamma_{\mathrm{eff}}^{-1})^{ij}$. This is a cross-check on the emergent clock model, not an independent axiom at the architrino substrate level. For definitions and interpretation, see [Effective Energy-Momentum Closure](../../../../markdown/aaa/dynamics/energy.md#effective-energy-momentum-closure).

#### Strong-Field / Horizon Alignment Note

For strong-field interpretation, use the canonical event-horizon alignment condition from [singularity-resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition). In this chapter, Planck-scale references inherit that same alignment definition.

---

### Clock Model and Equations of Motion

To close the derivation gap, fix an explicit clock model and an explicit observable-extraction map.

#### Concrete coincident-midpoint orthogonal-axis braid Clock State

Use one coincident-midpoint orthogonal-axis braid record with six constituent architrinos grouped into three persistently indexed neutral binaries:
$$
\mathcal{A}=\{1_+,1_-,2_+,2_-,3_+,3_-\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-66f56bea6f5bfbce)
with intrinsic polarities $q_a=\pm\epsilon$, $\epsilon=|e|/6$, and trajectories $\mathbf X_a(T)$. No per-constituent inertial mass is assigned at the substrate level.

Define pair-separation vectors
$$
\mathbf r_a=\mathbf X_{a+}-\mathbf X_{a-},
\qquad
a\in\{1,2,3\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3c71c57e2ff4abc4)
with radii $R_a=\|\mathbf r_a\|$. The three radii are independently assignable and do not order or relabel the binaries.

For this state to carry the coincident-midpoint orthogonal-axis braid label, its three binary axes must also be mutually orthogonal at the orthogonal-axis three-binary near-rest endpoint and converge toward the group-translation direction along the prescribed flattening coordinate $\lambda_A$. The frequencies $f_a$ remain independently assignable, and the axial half-separations $h_a$, transverse orbit radii $\rho_a$, phases $\phi_a$, and circulation rows remain explicit binary coordinates. This prescribed chart does not establish that the clock is retained or stable under EOM-solver evolution; failure to preserve the declared coordinate relations on the same evolved record would falsify the coincident-midpoint orthogonal-axis braid clock assignment.

#### Microscopic Evolution Equation (Regularized)

For each $a\in\mathcal{A}$ evolve by the acceleration-first substrate law
$$
\frac{d^2\mathbf X_a}{dT^2}(T)=
\sum_{b\in\mathcal{A}}
\kappa\,\sigma_{ab}\lvert q_aq_b\rvert
\int_{T-h}^{T}\!dT_0\;
\frac{\hat{\mathbf{r}}_{ab}(T;T_0)}
{r_{ab}^2(T;T_0)+\epsilon_c^2}\,
\delta_\eta\!\big(r_{ab}(T;T_0)-c_f(T-T_0)\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bb684255f9d3e34a)
$$
r_{ab}(T;T_0)=\|\mathbf X_a(T)-\mathbf X_b(T_0)\|,
\qquad
\hat{\mathbf{r}}_{ab}=\frac{\mathbf X_a(T)-\mathbf X_b(T_0)}{r_{ab}(T;T_0)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-285ff9ef24594b59)
This is the dual-mollified finite-memory certification form used in the dynamical chapters. The memory depth $h<\infty$ bounds the retained causal history, $\eta>0$ thickens the causal wake surface, and $\epsilon_c>0$ caps the near-collision inverse-square amplitude. Exploratory scans may use a simpler $\delta_\eta$ causal-surface mollifier only when they label the run as a non-certification approximation.

#### Clock Observable and Clock Map

Declare $a_{\mathrm{clk}}\in\{1,2,3\}$ as the clock channel on the source record. Let $\mathbf{e}_1,\mathbf{e}_2$ be an orthonormal basis of the mean orbital plane of $\mathbf r_{a_{\mathrm{clk}}}$, and define phase
$$
\theta_{\mathrm{clk}}(T)=\operatorname{atan2}\!\big(\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_2,\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_1\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-092eb918e6e21bff)
On a window $[T_1,T_2]$, define measured frequency
$$
\omega_{\text{clk}}
=
\frac{\theta_{\mathrm{clk}}(T_2)-\theta_{\mathrm{clk}}(T_1)}{T_2-T_1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-250cfa9dfddf7b0e)
For the reference run $(v=0,\Phi_N=0)$, set $\omega_0=\omega_{\text{clk}}^{\text{ref}}$ and define
$$
\frac{d\tau}{dT}\equiv\frac{\omega_{\text{clk}}}{\omega_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7500f56ae93f3cd2)

This native observable is the benchmark preserved by the clock projector in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). For a branch record $\mathcal{B}_{\mathbf X j}^{(T_0)}$, the clock-facing projection keeps only the entries that can change the extracted phase or cadence:

$$
\Pi_{\mathrm{clock}}
\mathcal{B}_{\mathbf X j}^{(T_0)}
=
\left(
\delta\theta_{\mathrm{clk}}^{(j)},\,
\delta\omega_{\mathrm{clk}}^{(j)},\,
\delta\chi_{\mathrm{sea}}^{(\ell,j)},\,
J_{\mathbf X j},\,
\Lambda_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5d78f2fb3808563e)

Thus a boundary contribution may affect clock coupling only by changing the same phase increment, measured frequency, Noether sea delay factor, or phase-retained wake ledger used to compute $\omega_{\text{clk}}/\omega_0$. A separate clock fit that bypasses this projection would split the clock benchmark from the assembly/Noether sea interface diagnostic.

#### Controlled Perturbation Family

Run the same coincident-midpoint orthogonal-axis braid clock record under controlled backgrounds:

1. Uniform group speed (center-of-mass convention) $v=\|\mathbf{V}_{\text{CM}}\|$ through homogeneous medium.
2. Weak static potential background $\Phi_N(\mathbf X,T)$ (or $U\equiv-\Phi_N>0$).
3. Weak-field regime constraints: $v^2/c_\star^2\ll1$ and $\lvert U\rvert/c_0^2\ll1$.

Use $c_\star=c_f$ for primitive kernel-only scans and $c_\star=c_0$ for observer-level PPN coefficient fits. This keeps the root-solver speed and the clock-comparison speed explicit instead of silently identifying them.

For each run $j$, record
$$
\left(U_j,\;v_j,\;\omega_j\right),
\qquad
y_j\equiv\frac{\omega_j}{\omega_0}-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2aed201a42c69ba7)

---

### Derivation Interface and Coefficient Map

This chapter keeps only the symbolic/numeric coefficient interface needed to bridge clock microdynamics to PPN observables.

#### Perturbative Expansion (Weak-field, Low-velocity)

For the coefficient map in this section, observer-level PPN fits use the low-gradient comparison speed $c_\star=c_0$; primitive kernel-only scans must state separately when they keep $c_\star=c_f$.

Linearize each trajectory as $\mathbf X_a(T)=\mathbf X_a^{(0)}(T)+\delta\mathbf X_a(T)$ around the periodic rest solution — conditional on a certified rest attractor supplying $\mathbf X_a^{(0)}$, which the retention disclaimer above records as not yet established — and expand the extracted clock ratio in
$$
\epsilon_U\equiv U/c_0^2,\qquad \epsilon_v\equiv v^2/c_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-64e8f8cdf1803ebd)

Use the regression model
$$
\frac{\omega}{\omega_0}
=
1-A_U\,\epsilon_U-A_v\,\epsilon_v
+C_2\,\epsilon_U^2
+C_{Uv}\,\epsilon_U\epsilon_v
+C_{v4}\,\epsilon_v^2
+\mathcal{O}(\epsilon^3)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9e575c0858eaedcc)

Coefficient extraction from simulation ensemble $\{(U_j,v_j,\omega_j)\}_{j=1}^N$:
$$
\mathbf{y}=X\mathbf{c}+\boldsymbol{\varepsilon},
\qquad
\hat{\mathbf{c}}=(X^\top W X)^{-1}X^\top W\mathbf{y}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-df4fc40d2b5e56da)
with
$$
\mathbf{c}=(A_U,A_v,C_2,C_{Uv},C_{v4})^\top,\quad
y_j=\frac{\omega_j}{\omega_0}-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-842b7dee0db9824d)
and design row
$$
X_j=\left(-\epsilon_{U,j},\,-\epsilon_{v,j},\,\epsilon_{U,j}^2,\,
\epsilon_{U,j}\epsilon_{v,j},\,\epsilon_{v,j}^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5ac985c25be680fa)

Estimated covariance:
$$
\mathrm{Cov}(\hat{\mathbf{c}})
=
\hat{s}^2(X^\top W X)^{-1},
\qquad
\hat{s}^2=\frac{\sum_j w_j(y_j-(X\hat{\mathbf{c}})_j)^2}{N-5}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7660f1b886d88052)

#### Coefficient Targets and PPN Map

In the GR-matching weak-field observer limit, first-order targets are
$$
A_U^\star=1,\qquad A_v^\star=\frac{1}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-786fdada6864394d)

For the static branch ($v=0$),
$$
\frac{\omega}{\omega_0}=1-\frac{U}{c_0^2}+C_2\frac{U^2}{c_0^4}+\cdots
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c4d40d220acd8735)
and the PPN map used in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) is
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e5bfad1ca3c32ec2)
So the GR target $\beta_{\mathrm{PPN}}=1$ implies
$$
C_2^\star=\frac{1}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3b615016e360844f)

The mixed coefficient $C_{Uv}$ is treated as a leakage diagnostic at this order.

Execution protocols, benchmark catalogs, and numeric pass/fail thresholds are routed through:

1. [Validation Protocols](../../../../markdown/aaa/validation/validation-protocols.md)
2. [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md)
3. [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md)
4. [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md)

---

### Failure Conditions and Red Flags

This program fails, and the emergent-metric project is likely untenable, if any of the following hold:

1. **Incorrect velocity dependence:**
 - If $P_q(\mathbf w)$ cannot be made to fit $\propto \gamma_\star(\mathbf w)$ without fine-tuning internal clock geometry or Noether sea parameters.

2. **Wrong sign or magnitude of gravitational dilation:**
 - Clocks deeper in a potential must tick slower. Any prediction of faster ticks, or gross magnitude mismatch, is fatal.

3. **Directional anisotropy:**
 - If $P_q(\mathbf w)$ depends measurably on direction in the absolute frame, violating isotropy bounds ($<10^{-16}$ sidereal modulation), the theory contradicts precision Lorentz tests.

4. **Clock-dependence:**
 - If different reasonable clock designs (different internal assemblies) yield different $d\tau/dt_{\mathrm{eff}}$ at the same $(v,\Phi_N)$ beyond experimental bounds, the emergent Equivalence Principle fails.

5. **Parameter bloat:**
 - If matching these effects requires introducing many independent medium parameters ($n$ profiles, ad hoc transport coefficients), the theory's naturalness score collapses; see [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

---

**Chapter target:** A concrete definition of **how** to compute $\omega(\mathbf{w},\Phi_{\text{eff}},n)$ for a Noether braid clock, and a clear native expression for $d\tau/dT$ plus its observer-chart projection $d\tau/dt_{\mathrm{eff}}$ in terms of those quantities.

#### Closure Program Interface (clock-to-PPN bridge)

This chapter supplies the fitted coefficient bridge between microscopic clock dynamics and PPN observables.

The clock-to-PPN closure checklist is:

1. Define a reference clock assembly and extraction window for $\omega_0$.
2. Run controlled perturbations over $(U_j,v_j)$ in the weak-field, low-velocity regime.
3. Fit $(A_U,A_v,C_2,C_{Uv},C_{v4})$ from the extracted clock ratios.
4. Forward $\hat\beta_{\mathrm{PPN}}$ and the leakage coefficient $\hat C_{Uv}$ to [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md).
5. Record pass/fail status in [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md) against [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) bounds.

Given extracted coefficients
$$
\hat{\mathbf{c}}=(\hat A_U,\hat A_v,\hat C_2,\hat C_{Uv},\hat C_{v4})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2d2a4c32308a1285)
map to
$$
\hat\beta_{\mathrm{PPN}}=\frac{1+2\hat C_2}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5bed2daa770c2ee9)
and forward to the PPN decision vector in [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md).

A compact closure statistic is:
$$
\chi^2_{\mathrm{closure}}=
(\hat{\mathbf{q}}-\mathbf{q}_\star)^\top
\Sigma_q^{-1}
(\hat{\mathbf{q}}-\mathbf{q}_\star)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-991c2897e6ee8ef6)
with
$$
\hat{\mathbf{q}}=(\hat A_U,\hat A_v,\hat\beta_{\mathrm{PPN}},\hat C_{Uv}),\qquad
\mathbf{q}_\star=(1,\tfrac12,1,0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea9b593a97e8f0b1)
Low $\chi^2_{\mathrm{closure}}$ with no preferred-direction leakage is the acceptance condition for the clock-law sector.

## Lorentz Kinematics

This chapter is the focused program statement for deriving operational Lorentz behavior from delayed substrate dynamics. The substrate has absolute time, a Euclidean void, and finite wake speed. Physical Observers nevertheless recover Lorentz-like clocks, rulers, and signal timing in tested regimes. The purpose of this chapter is to make that required compensation law explicit, distinguish the closure target from any already-proved result, and organize the derivation path from microdynamics to measurable clock-and-ruler behavior.

The opening abstract states the target; the later sections move through the governing delayed dynamics, the anisotropy mechanism, and the conditions under which assembly-built observers could recover standard Lorentz kinematics.

The reader should keep four moving pieces distinct. The substrate has a preferred rest frame. A moving assembly can deform and retune. Physical Observers synchronize clocks and rulers using assemblies and signals. Precision experiments see only the exported observer record. Lorentz recovery succeeds only if the same retained branch hides the first piece from the fourth by controlling the middle two.

For the theory-bridge version that maps special-relativistic terms directly to the deformable Noether braid story, see [the special-relativity bridge](../../../../markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md). For the reader-facing synthesis of the branch-quantized Lorentz milestone, see [Return-Cycle Lorentz Quantization](../../../../markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). For the interactive geometry surface, open [Coincident-Midpoint Three-Axis Circular Lorentz Geometry App](../../../../../ideal-braid.html).

### Coordinate Layers

This chapter uses two coordinate layers, and they must not be collapsed. Native substrate equations use the absolute frame: $T$ is absolute time, $\mathbf X=(X^1,X^2,X^3)$ is position in the Euclidean void, and worldlines are written as $\mathbf X_i(T)$ with native velocity $\mathbf V_i=d\mathbf X_i/dT$. Causal roots, wake intersections, branch histories, and assembly trajectories are first stated in this layer.

The Lorentz or GR-comparison layer uses the effective observer chart. Its coordinates are $t_{\mathrm{eff}}$ and $x_{\mathrm{eff}}^i$, with metric rows such as $g_{\mu\nu}^{\mathrm{eff}}$. These coordinates are not a second substrate and not hidden names for $T$ and $\mathbf X$. They are the chart reconstructed by Physical Observers from physical clocks, rulers, signal timing, Noether sea state, and retained records. Proper time $\tau$ is a derived clock readout in this observer layer, so $d\tau/dt_{\mathrm{eff}}$ is an observer-coordinate clock-rate comparison, not a derivative with respect to absolute time.

The bridge between layers is therefore a constitutive closure map:
$$
(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record}).
$$

[View →](../../../../../equation-mapping.html#coordinate-layer-key)

Unless a local derivation supplies the needed row, $\chi_{\mathrm{eff}}$ remains an obligation. A Lorentz formula counts in this chapter only when the same retained branch record supplies the map from absolute substrate quantities to effective observer records and keeps preferred-frame leakage inside the declared bounds. Bare symbols such as $t$, $\mathbf x$, $dt$, and $dx^i$ are therefore avoided as working notation because they hide which side of the map is being used.

### Abstract

This document develops a first-principles program for deriving effective Lorentz kinematics inside $\mathbb{A}\mathbb{A}\mathbb{A}$ from delayed architrino dynamics in a Euclidean void with absolute time. The central claim is not postulated covariance, but dynamical compensation: moving assemblies deform and retune their internal frequencies so that assembly-built observers recover Lorentz-consistent clock and ruler behavior. The objective is an exact or asymptotically controlled derivation of
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\star(v)}\qquad
P(v)=\gamma_\star(v)\,P_0\qquad
\gamma_\star(v)=\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aac1c17361b6212c)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

with bounded preferred-frame leakage in measurable observables.

This is an exact-substrate-asymmetry to bounded-emergent-symmetry theorem target. Absolute time, the Euclidean void, and finite $c_f$ are not observer-level Lorentz symmetry. The substrate symmetry group is $E(3)\times\mathbb{R}_T$, not a boost-invariant Lorentz or Poincare group, so Lorentz invariance cannot be counted as a substrate-exact invariant. It is admissible only if the source-to-effective map suppresses every observer-accessible preferred-frame current below the declared $\epsilon_{\mathrm{LV}}$ bounds while preserving the clock, ruler, and photon-channel successes of special relativity.

Stated plainly, the chapter asks how an asymmetric substrate can export a symmetric measurement world. The answer cannot be "because coordinates say so"; it has to come from assembly deformation, clock retuning, synchronization, and a shared Noether sea dressing map.

Here $\epsilon_{\mathrm{LV}}$ is a residual budget, not one binary tolerance. It contains distinct rows for Michelson-Morley two-way optical isotropy, Kennedy-Thorndike boost dependence, Ives-Stilwell clock-dilation behavior, slow-clock-transport synchronization and closed transported-clock loops, Hughes-Drever and clock-comparison matter-sector isotropy, sidereal modulation, closed-loop Sagnac response, photon-sector dispersion/birefringence/time-of-flight leakage, weak-field preferred-frame terms, and gravitational-wave-versus-photon speed matching. Each row must declare its expansion order in the appropriate group-speed parameter, such as $\beta_\oplus\equiv v_\oplus/c_{\text{eff}}$ for terrestrial null tests, its validity regime, and its experimental tolerance before Lorentz recovery can be counted as bounded.

The common-mode requirement is therefore multi-sector. Matter-sector clocks, photon-channel propagation, and the effective gravitational channel cannot be tuned independently. A branch that nulls Michelson-Morley-type two-way optical anisotropy but leaves orientation-dependent clock energy levels, sidereal leakage, photon birefringence, or a separated effective gravitational-wave speed is not a Lorentz recovery branch.

This makes Lorentz recovery the prototype invariant-provenance problem. The invariant interval is not accepted as primitive substrate geometry; it is the observer-level invariant to be exported by one retained branch record. The derivation must say which substrate quantities are exact, which observer quantities are emergent, and which residual currents remain as preferred-frame leakage diagnostics.

Speed convention: primitive delayed-root equations are solved with $c_f$. The declared speed $c_\star$ enters only after the channel has been named: set $c_\star=c_f$ for a primitive wake branch chart, $c_\star=c_{\text{eff}}(\mathbf X,T)$ for Noether sea dressed clocks and rulers, and $c_\star=c_\gamma(\mathbf X,T)$ for photon synchronization. The low-gradient Lorentz limit may identify the measured channel speed with $c_0=c_{\text{eff}}(\infty)$ only after the dressing map is declared.

Notation guardrail: $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ is the Noether sea delay factor, not the Lorentz clock-rate factor. The velocity-sector target is $d\tau/dt_{\mathrm{eff}}\to\sqrt{1-\beta_{\text{eff}}^2}$ only after the clock projection $f_{\tau}$ is extracted from the same Noether sea and assembly record and projected into an effective observer chart. A derivation that writes $\chi_{\text{sea}}\to\sqrt{1-\beta_{\text{eff}}^2}$ has changed notation; the corpus-level target is the map from $(n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{assembly state})$ into $f_{\tau}$ with $R_{\tau v}\to0$.

A stronger prediction is also available. The Lorentz formulas should not be imported as an independent observer-level rule and then copied onto assemblies. They should be recovered from the same causal-root progression that gives stable assemblies their discrete branch ledgers. In that sense the Lorentz factor is a closure target for the quantum-facing branch structure of the dynamics: the root ledger must generate the contraction, clock-retuning, and residual-leakage coefficients rather than merely coexist with them.

### Problem Statement

#### Kinematic closure target

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the substrate ontology is:

1. Euclidean 3-space represented by a chosen absolute-frame coordinate scaffold.
2. Global absolute time $T$.
3. Finite propagation speed $c_f$ for potential transfer through the Noether sea.

To match modern precision constraints, operational observers made from bound assemblies must infer effective Lorentz kinematics even though the substrate itself is not Minkowskian at the fundamental level. We call this required dynamical compensation the Lorentzian conspiracy.

Michelson-Morley-type null experiments make this a quantitative acceptance condition, not a philosophical preference. The framework may keep a Euclidean-void rest frame only if the two-way signal residual later written as $\Delta_{\text{tw}}(\beta_\star,\theta)$ is generated by the same branch record that retunes material arms and clocks, and remains $O(\epsilon_{\text{LV}})$ across the tested orientations. A cancellation achieved by separately fitting photon speed, clock rate, and ruler length would be a fit, not Lorentz closure.

The closure target is two-way operational isotropy, not one-way substrate isotropy. A primitive photon-channel speed may remain anisotropic relative to the absolute frame, because one-way speed is inseparable from clock synchronization for embedded observers. The required theorem is that the assembly-clock synchronization map absorbs the residual one-way anisotropy while the measurable round-trip diagnostic $\Delta_{\text{tw}}$ and the boost-dependent and clock-isotropy rows remain below their declared leakage bounds.

This makes synchronization reabsorption a dynamical export, not a convention chosen after the fact. Let $\mathcal{S}_{\mathrm{asm}}$ denote the synchronization convention physically realized by assembly clocks, rulers, and signal channels. A successful Lorentz export must drive $\mathcal{S}_{\mathrm{asm}}$ to operational Einstein synchrony inside the tested regime while any Reichenbach-style one-way freedom remains inaccessible to embedded observers. If an apparatus can extract the absolute-frame anisotropy by comparing assembly clocks, signal timing, or calibration loops, the preferred-frame leakage wall has failed even if a two-way Michelson-Morley row is small.

The clock channel has to be written as its own substrate-to-observer map:
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
f_{\tau}\!\left(
\beta_{\text{eff}},\,
n(\mathbf X,T),\,
\chi_{\text{sea}}(\mathbf X,T),\,
\Phi_{\text{eff}}(\mathbf X,T),\,
\text{assembly state}
\right),
\qquad
\beta_{\text{eff}}\equiv\frac{v}{c_{\text{eff}}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f2a675356f930be7)
The velocity-sector residual is
$$
R_{\tau v}(\beta_{\text{eff}})
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\nabla n=0,\ \nabla\Phi_{\text{eff}}=0}
-\sqrt{1-\beta_{\text{eff}}^2},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-84b3b29607ef3fa9)
and must be bounded by time-dilation tests such as Ives-Stilwell and storage-ring clock comparisons. The weak-field potential-sector residual is
$$
R_{\tau\Phi}
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\beta_{\text{eff}}=0}
-\left(1+\frac{\Phi_{\text{eff}}}{c_{\text{eff}}^2}+O\!\left(\frac{\Phi_{\text{eff}}^2}{c_{\text{eff}}^4}\right)\right),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd577de44234840b)
with the $\Phi_{\text{eff}}$ sign convention declared, and must recover gravitational-redshift and PPN clock/curvature constraints. Equivalence-principle recovery requires $R_{\tau v}$ and $R_{\tau\Phi}$ to come from the same Noether sea response and assembly-clock map.

The absolute velocity used by the substrate solver cannot remain an observer-accessible quantity. In the accepted export, any dependence on absolute $v$ must be absorbed into nonseparable combinations of assembly-clock synchronization, ruler response, and signal-channel calibration, so Physical Observers recover Lorentz-invariant records rather than a direct preferred-frame speed meter.

#### Mathematical objective

Given a translating bound assembly, first for one binary and then for the prescribed coincident-midpoint orthogonal-axis braid chart, derive:

Here `coincident-midpoint orthogonal-axis braid` means one complete orthogonal-axis three-binary braid with persistent binary indices $a\in\{1,2,3\}$, independently assignable positive radii $R_a$ and frequencies $f_a$, mutually orthogonal binary axes at $\lambda_A=0$, and axes converging toward the group-translation direction as $\lambda_A\to1$. Axial half-separations, transverse orbit radii, phases, and circulation remain explicit binary coordinates. The label supplies no Lorentz law, retained branch, hierarchy, particle assignment, or stability result; those are the theorem targets below, falsified if same-record evolution fails the coordinate or observer-residual gates.

1. The velocity-dependent equilibrium shape tensor $Q(v)$ and its anisotropy.
2. The velocity-dependent internal period $P(v)$.
3. Conditions under which $(Q(v),P(v))$ produce effective Lorentz ruler and clock laws.
4. Residual non-Lorentz terms and their scaling.

### Governing Microdynamics

#### Causal path-history interaction form

For architrino labels $i,j\in\{1,\dots,N\}$ with positions $\mathbf X_i(T)$, write the reduced branch equation in acceleration-first form:
$$
\frac{d^2\mathbf X_i}{dT^2}
=
\sum_{j\neq i}
\mathbf A_{i\leftarrow j}\!\left(
\mathbf X_i(T),
\mathbf X_j(T-\Delta_{ij}(T)),
\mathbf V_j(T-\Delta_{ij}(T))
\right)
+
\mathbf A^{\mathrm{self}}_i(T).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8267bcb50764beae)
with causal delay
$$
\Delta_{ij}(T)=\frac{\|\mathbf X_i(T)-\mathbf X_j(T-\Delta_{ij}(T))\|}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6f92c08eca343433)
The self-hit acceleration contribution $\mathbf A^{\mathrm{self}}_i$ captures history-dependent wake re-intersections and is the non-Markovian origin of branch-sensitive corrections.

No architrino-specific inertial weights enter this substrate equation. When quadratic energy or momentum bookkeeping is needed below, the single universal conversion constant $\mu_{\mathrm{arch}}$ may be used; it does not alter the acceleration law or assign primitive mass to an architrino.

#### Co-moving decomposition

For an assembly center trajectory $\mathbf X_c(T)$ with mean group velocity $\mathbf V$, write
$$
\mathbf X_i(T)=\mathbf X_c(T)+\mathbf r_i(T),
\qquad
\mathbf X_c(T)=\frac{1}{N}\sum_i\mathbf X_i(T),
\qquad
\sum_i\mathbf r_i(T)=\mathbf 0.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-70eef402c06f6f38)
The closure task is to solve for bounded relative motion $\mathbf r_i(T)$ under translation $\|\mathbf V\|<c_f$ and extract period and geometry renormalization.

#### Dimensionless group-motion delay form and variational closure

Fix a rest-attractor length scale $a_0$ and period $P_0$, and define
$$
\beta_f\equiv \frac{v}{c_f}\qquad s\equiv \frac{T}{P_0}\qquad
\boldsymbol{\rho}_i(s)\equiv \frac{\mathbf r_i(T)}{a_0}\qquad
\chi_{\mathrm{dd}}\equiv \frac{c_f P_0}{a_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2579b067475dc087)
Then delay closure in co-moving coordinates is
$$
\hat{\tau}_{ij}(s)=\frac{1}{\chi_{\mathrm{dd}}}\left\|
\boldsymbol{\rho}_i(s)-\boldsymbol{\rho}_j\!\left(s-\hat{\tau}_{ij}(s)\right)
+\chi_{\mathrm{dd}}\beta_f\,\hat{\mathbf{e}}_{\parallel}\hat{\tau}_{ij}(s)
\right\|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0806349b1035aea0)
with $\hat{\tau}_{ij}\equiv \tau_{ij}/P_0$. The $\mathrm{dd}$ subscript marks this as a local delay scale for group motion (the existing subscript retains its spelling), not the Noether sea delay factor $\chi_{\text{sea}}$ or the effective coordinate map $\chi_{\mathrm{eff}}$.

Let $\boldsymbol{\rho}^\star(s;\beta_f)$ be a $P_s(\beta_f)$-periodic translating attractor, where $P_s(\beta_f)=P(c_f\beta_f)/P_0$ is the period in the rescaled time $s$. Linearization gives a delay-Floquet system
$$
\delta\dot{\mathbf{y}}(s)=A_0(s;\beta_f)\,\delta\mathbf{y}(s)+\sum_{n=1}^{N_d}A_n(s;\beta_f)\,\delta\mathbf{y}\!\left(s-\hat{\tau}_n^\star\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec19d9e83c85f1da)
where $\mathbf{y}$ stacks positions and velocities in relative coordinates. Kinematic closure requires:

1. Existence of $\boldsymbol{\rho}^\star(s;\beta_f)$ for $\beta_f\in[0,\beta_{\max})$.
2. Spectral stability of the monodromy operator (all nontrivial Floquet multipliers inside the unit disk).
3. Smooth coefficient maps for axis and period renormalization extracted from $\boldsymbol{\rho}^\star$.

#### Translating binary benchmark

The first hard Lorentz-closure calculation is the moving version of the declared reference rest two-body branch (certificate packet pending; see the closure-packet contract in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md)). Let $\sigma\in\{+1,-1\}$ label the two opposite-polarity architrinos and choose a constant group-velocity direction $\hat{\mathbf e}$. A translating binary branch has the substrate ansatz
$$
\mathbf X_{\sigma}(T)
=
u T\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(T)),
\qquad
\theta(T+P_u)=\theta(T)+2\pi
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88b8e30dbaeadcfd)

Here $P_u$ is the cycle period of the translating binary at group speed $u$.

with $\boldsymbol{\rho}_u$ periodic on the retained branch chart. This is not a Lorentz boost of coordinates. It is a direct absolute-time branch ansatz inserted into the delayed root equation.

For a root emitted by constituent $\sigma'$ and received by constituent $\sigma$, the delay $\tau>0$ must solve
$$
G_{\sigma\sigma'}(\tau;\theta,u)
\equiv
\left\|
u\tau\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta)
-
\sigma'\,\boldsymbol{\rho}_u(\theta-\Omega_u\tau)
\right\|
-c_f\tau
=0,
\qquad
\Omega_u\equiv\frac{2\pi}{P_u}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba53d034fed07019)
The branch Jacobian is
$$
J_{\sigma\sigma'}(\tau;\theta,u)
=
1-
\frac{
\left(
u\hat{\mathbf e}
+
\sigma'\Omega_u\boldsymbol{\rho}'_u(\theta-\Omega_u\tau)
\right)
\cdot\hat{\mathbf r}_{\sigma\sigma'}
}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-be45a344e6a3ff0c)
where $\hat{\mathbf r}_{\sigma\sigma'}$ is the unit vector from the transmitter emission point to the receiver-now point. This is structurally the same transmitter-side factor that appears in Lienard-Wiechert delay geometry. The analogy is useful only at the level of causal-root flux: the canonical Master EOM has the radial inverse-square line of action and transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, but not the full electrodynamic velocity-field and acceleration-field terms. The Lorentz answer therefore cannot be imported from classical electrodynamics; it must be computed on this branch.

The leading/trailing asymmetry in this translating ledger is already visible in the uniform-translation part of the same Jacobian. For a uniformly moving transmitter with speed ratio $\beta_f=u/c_f$ and $\theta$ the angle between the motion direction and the transmitter-to-receiver line of action, the simple-root wake-density factor is
$$
\mathcal{D}_{\mathrm{wake}}(\theta;\beta_f)
=
\frac{1}{1-\beta_f\cos\theta}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-44dd1bd2712aa4e7)
before the internal orbital velocity, branch multiplicity, and finite-window energy rows are added. Thus the translating binary calculation is not asking whether anisotropy exists; it is asking whether the full deformed branch ledger converts this microscopic wake-density anisotropy into Lorentzian contraction, clock dilation, and bounded residual leakage.

The primitive Lorentz test for this binary is the residual triple
$$
\mathcal{R}_{\mathrm{bin}}(u)
=
\left(
R_T^{\mathrm{bin}}(u),
R_{\xi}^{\mathrm{bin}}(u),
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\right),
\qquad
\gamma_f(u)\equiv
\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3c3f10587d514abd)
with
$$
R_T^{\mathrm{bin}}(u)
\equiv
\frac{P_u}{P_0}
-
\gamma_f(u),
\qquad
R_{\xi}^{\mathrm{bin}}(u)
\equiv
\frac{L_{\parallel}(u)}{L_{\perp}(u)}
-
\frac{1}{\gamma_f(u)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b676f2f4292ae541)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_u$ is the cycle period of the translating binary at group speed $u$.

Here $L_{\parallel}$ and $L_{\perp}$ are extracted from the same periodic solution by projecting the relative orbit along and transverse to $\hat{\mathbf e}$. The shape residual measures the remaining branch-chart difference from the Lorentz-deformed rest solution,
$$
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\equiv
\inf_{\varphi}
\frac{
\left\|
\boldsymbol{\rho}_u(\theta)
-
\boldsymbol{\rho}_{L}(\theta+\varphi;u)
\right\|_{\mathrm{cyc}}
}{R_0},
\qquad
\boldsymbol{\rho}_{L}(\theta;u)
=
R_0\left(
\gamma_f^{-1}\cos\theta\,\hat{\mathbf e}
+
\sin\theta\,\hat{\mathbf e}_{\perp}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bdecd0dfbe03be40)
in the planar orientation where the group-velocity direction lies in the binary plane. A clean primitive result has $\mathcal{R}_{\mathrm{bin}}=0$ or a controlled residual traceable to named branch-ledger features. A nonzero residual is not a rhetorical failure; it is the first foundation-level pressure on the Lorentz-closure program, because the binary is the first available internal clock and ruler.

> Claim grade: **test definition**. No value of this residual triple has been produced by evolving the delayed law at any group speed. A prescribed or algebraically deformed history does not supply that missing branch evidence.

#### Exact substrate symmetries and delay currents

At action level, use a causal path-history functional
$$
S=\int dT\left[
\sum_i \frac{1}{2}\mu_{\mathrm{arch}}\left\|\frac{d\mathbf X_i}{dT}\right\|^2
-\frac{1}{2}\sum_{i\ne j}\int_{\Sigma_{ij}} d^2\sigma\,
\mathcal{L}_{\text{int}}\!\left(\mathbf X_i(T),\mathbf X_j(T-\Delta)\right)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-514b69d292c2821c)
The exact substrate symmetry group is
$$
G_{\text{fund}}=E(3)\times \mathbb{R}_T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ca196158ccbbbc87)
and the associated delayed-Noether proof target is that conserved totals close only after wake and medium channels are included:
$$
\mathbf{P}_{\text{tot}}
=
\sum_i \mu_{\mathrm{arch}}\frac{d\mathbf X_i}{dT}+\mathbf{P}_{\text{wake}}
\qquad
E_{\text{tot}}
=
\sum_i \frac{1}{2}\mu_{\mathrm{arch}}\left\|\frac{d\mathbf X_i}{dT}\right\|^2+E_{\text{wake}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b99ad388dda786b3)
These are universal-weight bookkeeping proxies for the delayed-Noether closure target, not primitive momentum or mass assignments. Only after the architrino-plus-wake-plus-medium ledger closes does an isolated translating assembly admit a co-moving reduction to a bounded periodic or quasi-periodic branch $\boldsymbol{\rho}^\star(s;\beta_f)$ with fixed mean group velocity extracted from the same record.

### Emergent Kinematics from Delay Anisotropy

#### Directional delay asymmetry

For a primitive benchmark binary moving at constant group velocity with instantaneous separation vector $\mathbf r=r\,\hat{\mathbf n}$ and constant group velocity $\mathbf V=v\,\hat{\mathbf e}_{\parallel}$, causal-delay closure satisfies
$$
\Delta=\frac{\|\mathbf r+\mathbf V\Delta\|}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4dcb61d581ce4ea)
This subsection is deliberately a $c_f$ branch-chart calculation. For operational clock, ruler, or photon tests, repeat the same budget with the declared $c_\star$ after Noether sea dressing. With $\mu\equiv \hat{\mathbf{n}}\cdot\hat{\mathbf{e}}_{\parallel}$ and $\beta_f=v/c_f$, the two directional roots are
$$
\tau_{\pm}(r,\mu;\beta_f)
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta_f^2(1-\mu^2)}\pm \beta_f\mu}{1-\beta_f^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4df24a5f5ea6755c)
Special orientations recover standard forms:
$$
\mu=1:\quad
\tau_{+}=\frac{r}{c_f-v}\qquad
\tau_{-}=\frac{r}{c_f+v}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eaad26459c830d80)
$$
\mu=0:\quad
\tau_{+}=\tau_{-}=\frac{r}{\sqrt{c_f^2-v^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b83b297c43f997e7)
The symmetric delay channel and associated causal-rate proxy are
$$
\bar{\tau}(\mu;\beta_f)\equiv \frac{\tau_{+}+\tau_{-}}{2}
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta_f^2(1-\mu^2)}}{1-\beta_f^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7495836f8d467977)
$$
\nu(\mu;\beta_f)\equiv \frac{1}{\bar{\tau}(\mu;\beta_f)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3704ed64dd4e3553)
Since $\bar{\tau}$ depends on $\mu$, interaction response is anisotropic and induces
$$
K_{\parallel}(v)\neq K_{\perp}(v)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9cec1d608758a704)

#### Weak-velocity expansion to $O(\beta_f^4)$

Direct expansion of the symmetric lag gives
$$
\bar{\tau}(\mu;\beta_f)=\frac{r}{c_f}\left[
1+\frac{1+\mu^2}{2}\beta_f^2
+\frac{3+6\mu^2-\mu^4}{8}\beta_f^4
+O(\beta_f^6)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dda82af5f9568f4e)
and thus
$$
\nu(\mu;\beta_f)=\frac{c_f}{r}\left[
1-\frac{1+\mu^2}{2}\beta_f^2
+\frac{-1-2\mu^2+3\mu^4}{8}\beta_f^4
+O(\beta_f^6)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b35af7974f981f07)
Two anchor limits are:
$$
\mu=1:\ \bar{\tau}=\frac{r}{c_f}\gamma_f^2,\ \nu=\frac{c_f}{r}(1-\beta_f^2)
\qquad
\mu=0:\ \bar{\tau}=\frac{r}{c_f}\gamma_f,\ \nu=\frac{c_f}{r}\frac{1}{\gamma_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff4f1250f1d24fc6)

#### Closed-return derivation of the Lorentz axis ratio

The one-way roots above expose the preferred branch chart. They are not yet an observer-facing Lorentz law, because a physical clock or ruler is not made from a single one-way leg. A stable material branch is admitted only when the relevant causal wake returns to a compatible phase. The primitive Lorentz-geometry object is therefore a closed return cycle.

Use the declared channel speed $c_\star$ for the closure problem under consideration, with
$$
\beta_\star\equiv\frac{v}{c_\star}
\qquad
\gamma_\star\equiv\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0c4f8895089b14c8)
In a homogeneous Noether sea cell, take $R_{\parallel}$ to be the semiaxis along group velocity and $R_{\perp}$ to be a transverse semiaxis. A longitudinal return cycle has unequal forward and rear legs,
$$
t_{+}=\frac{R_{\parallel}}{c_\star-v}
\qquad
t_{-}=\frac{R_{\parallel}}{c_\star+v}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88b04f5b4821857b)
so its closed return time is
$$
P_{\parallel}
=t_{+}+t_{-}
=
\frac{R_{\parallel}}{c_\star-v}
+
\frac{R_{\parallel}}{c_\star+v}
=
\frac{2R_{\parallel}c_\star}{c_\star^2-v^2}
=
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-87ecd8149507bb23)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_{\parallel}$ is the closed signal-cycle period parallel to the assembly group velocity. $P_{\perp}$ is the closed signal-cycle period perpendicular to the assembly group velocity.

A transverse return cycle uses part of the causal budget to keep pace with the translated receiver. The remaining transverse closure speed is
$$
c_{\perp}=c_\star\sqrt{1-\frac{v^2}{c_\star^2}}
=\frac{c_\star}{\gamma_\star}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ffdd557fa94bc35c)
and therefore
$$
P_{\perp}
=
\frac{2R_{\perp}}{c_{\perp}}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c1c97cc4e5aba585)

The closure condition for a Lorentz-admissible branch is that the same material return cycle closes with one period in the longitudinal and transverse channels:
$$
P_{\parallel}=P_{\perp}+O(\epsilon_{\mathrm{LV}}P_0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-748354681b616814)
In the zero-leakage homogeneous limit this gives
$$
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ab2434374dbcdb34)
hence
$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
=
\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../../equation-mapping.html#oblate-spheroidal-envelope)

This is the direct map from Lorentz kinematics to Noether braid geometry. The oblate spheroidal envelope for an admitted branch $q$ can be written
$$
\frac{x_{\perp,1}^2+x_{\perp,2}^2}{R_{\perp,q}^2}
+
\frac{x_{\parallel}^2}{R_{\parallel,q}^2}
=1
\qquad
R_{\parallel,q}
=
\frac{R_{\perp,q}}{\gamma_\star}
+O(\epsilon_{\mathrm{LV}}R_{\perp,q})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-816659ca98874dc8)
Equivalently, the realized ruler factor is the inverse shape ratio:
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)}
=
\gamma_\star(v)+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-35a64cf47656eb9e)

The same closure has a useful selection form. Let a rest-frame separation at angle $\theta_0$ to the group-velocity direction deform by an unknown axial factor $g(\beta_\star)$:
$$
R_{\parallel}=R_0\cos\theta_0\,g(\beta_\star),
\qquad
R_{\perp}=R_0\sin\theta_0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-889dff0b299cfed7)
For a closed return through a channel with speed $c_\star$, the orientation-sensitive bracket in the round-trip delay is proportional to
$$
B(\theta_0)
=
c_\star^2R_0^2\left[g^2\cos^2\theta_0+(1-\beta_\star^2)\sin^2\theta_0\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e76f78aa5560ad6f)
An orientation-independent material clock requires this equality for every $\theta_0$ simultaneously, so the coefficients of $\cos^2\theta_0$ and $\sin^2\theta_0$ must agree, hence
$$
g(\beta_\star)=\sqrt{1-\beta_\star^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b21eaad6b65d02b3)
in the zero-leakage homogeneous limit. This selects the Lorentz contraction law as the unique axial deformation that removes matter-sector orientation leakage for this closed-return benchmark. It is still not a stability theorem: the delayed acceleration law must also show that the contracted branch is an attracting solution of the boosted delay dynamics.

An actual two-hit return must additionally name its root itinerary:

$$
G_{-+}(\tau_{+-};\theta_1,u)=0,
\qquad
G_{+-}(\tau_{-+};\theta_1+\Omega_u\tau_{+-},u)=0,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3516bf94e69f37bf)

with a declared integer phase return, both transmitter-side weights, and the same evolved branch shape in both equations. The scalar reduction above is exact only for fixed, non-orbiting, co-moving endpoints. On an orbiting binary, residual phase dependence after optimizing the period falsifies it as an exact reduction of that itinerary.

Plainly: the simple round trip works exactly only when its endpoints do not orbit. A binary must close two actual delayed hits on the same evolved orbit.

> Claim grade: **derived conditional** on a single-speed closed return, orientation independence, and the named two-root itinerary. This is a kinematic selection rule, not evidence that a translating branch exists or is stable.

The same equations give a direct geometry dictionary for the oblate spheroidal envelope. In the no-extra-scale channel, take $R_{\perp}=R_0$ and $R_{\parallel}=R_0/\gamma_\star$. Then
$$
\xi
\equiv
\frac{R_{\parallel}}{R_{\perp}}
=
\frac{1}{\gamma_\star}
=
\sqrt{1-\beta_\star^2}
\qquad
\gamma_\star
=
\frac{R_{\perp}}{R_{\parallel}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5bf60c8c1e2f0785)
and therefore
$$
\beta_\star
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7e45feef2e19a6b8)
Thus the velocity fraction is encoded as the eccentricity of the oblate spheroidal envelope, while $\gamma_\star$ is encoded as its transverse-to-longitudinal aspect ratio. This is only a statement about the shape channel: a separate scale channel $\lambda$ may change the absolute size without changing the dimensionless ratios $\xi$, $\gamma_\star$, and $\beta_\star$.

The clock law belongs to the return-cycle period, not to the absolute size of the oblate spheroidal envelope. If a rest branch has period $P_0$, the observer-sector target is
$$
P_q(v)=\gamma_\star(v)P_0+O(\epsilon_{\mathrm{LV}}P_0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3682ea362f0b4313)
For the simple return-cycle benchmark above, substituting $R_{\parallel}=R_{\perp}/\gamma_\star$ gives
$$
P_{\parallel}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../../equation-mapping.html#corpus-equation-19b4f35a8d794477)

Here $P_{\parallel}$ is the closed signal-cycle period parallel to the assembly group velocity.

so the period dilation is the same $\gamma_\star$ that appears as the inverse axis ratio. This remains true even when the oblate spheroidal envelope becomes very thin. As $\beta_\star\to1$, the forward leg is
$$
t_+
=
\frac{R_{\parallel}}{c_\star-v}
=
\frac{R_{\perp}}{c_\star}
\sqrt{\frac{1+\beta_\star}{1-\beta_\star}}
\longrightarrow
\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf0ccdd529897257)
while the rear leg satisfies
$$
t_-
=
\frac{R_{\parallel}}{c_\star+v}
=
\frac{R_{\perp}}{c_\star}
\sqrt{\frac{1-\beta_\star}{1+\beta_\star}}
\longrightarrow
0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ad28f8b5045b9ee3)
The divergent clock factor is therefore not caused by a large object. It is caused by the vanishing forward catch-up margin $c_\star-v$ in the closed return cycle. The contraction of $R_{\parallel}$ and the divergence of $P_q(v)$ are two coupled readouts of the same closure condition.

In this precise theorem-target sense, Lorentz response is branch-indexed in the framework. The smooth function $\gamma_\star(v)$ remains the observer-level envelope, but a physical material branch can realize that envelope only through a discrete admissible closure class $q$. The quantized object is not the algebraic curve by itself; it is the branch-indexed realization
$$
q
\longmapsto
\left(
\xi_q(v),
\gamma_{\mathrm{rul}}^{(q)}(v),
\gamma_{\mathrm{clk}}^{(q)}(v),
\mathcal{L}_{\mathrm{root}}^{(q)}(v)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-831c329f2525d41b)
with admissibility requiring the same causal-root ledger to close the oblate spheroidal envelope geometry, clock period, and preferred-frame leakage bounds. Thus a continuous Lorentz formula would be recovered as the common envelope of discrete Noether braid return-cycle classes only after those branch-admissibility conditions close.

Confirmation status: the ruler law has no confirmation from evolved dynamics at any group speed. The prescribed translating-family prediction — that the moving branch's shape ratio $\xi(u)/\xi(0)$ should approach $1/\gamma_f(u)$ — remains a closure target of the delayed acceleration law, not a measured result. The actual branch may deform internally, and confirmation requires evolving it directly under the master equation and measuring the relative-periodic envelope it settles to. Whether the contracted branch is an attracting solution of the moving delay dynamics is the same open question stated above; it is not answered here.

To keep this closure target testable, the branch should report a single Lorentz residual record rather than separate narrative successes. For a declared channel speed $c_\star$ and branch $q$, write
$$
\mathcal{R}_{\mathrm{Lor},q}(\beta_\star)
=
\left(
R_T^{(q)},
R_\xi^{(q)},
R_u^{(q)},
R_{E\mathbf{p}}^{(q)},
R_\gamma^{(q)},
\epsilon_{\mathrm{LV}}^{(q)}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-419ff163f9a3ae07)
where
$$
R_T^{(q)}(v)
\equiv
\frac{P_q(v)}{P_0}-\gamma_\star(v)
\qquad
R_\xi^{(q)}(v)
\equiv
\xi_q(v)-\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-516c2a69c0112ad1)
For a one-dimensional velocity-composition test in the same declared channel,
$$
R_u^{(q)}
\equiv
u_{\mathrm{eff}}
-
\frac{u'+v}{1+u'v/c_\star^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b55295dcded466a8)
For the effective mass-shell and photon-channel tests, use
$$
R_{E\mathbf{p}}^{(q)}
\equiv
E_q^2-\left(\|\mathbf{p}_q\|^2c_\star^2+m_q^2c_\star^4\right)
\qquad
R_\gamma^{(q)}
\equiv
E_\gamma-c_\gamma\|\mathbf{p}_\gamma\|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-78dd89148e47fc91)
Here $m_q$ is the observer-sector inertial response assigned to the admitted branch, and $R_\gamma^{(q)}$ is evaluated only after the photon channel has been declared. The same causal-root ledger, medium dressing map, and branch state must feed all components. A branch that fits clock slowing with one ledger, ruler contraction with another, and photon propagation with an independent channel has not closed Lorentz behavior; it has only matched isolated formulas.

This derivation is stronger than assigning an oblate spheroidal envelope after the fact. The one-way longitudinal legs remain asymmetric; the Lorentz geometry appears only when the closed return cycle is allowed to choose the semiaxes that make longitudinal and transverse closure periods agree. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the envelope is the visible projection of a branch that has solved its return-cycle ledger.

#### Effective shape law

Fix a group-speed band $0\le\beta_f\le\beta_{\max}<1$, with $\beta_f=v/c_f$, and choose one admitted translating branch $q$. The primitive root ledger on that band is still solved at $c_f$; $\beta_\star=v/c_\star$ is introduced only for the declared primitive or dressed observer channel being tested.

Define the cycle-averaged shape tensor on the translating attractor:
$$
Q_{ab}^{(q)}(v)\equiv
\frac{1}{N_q}
\left\langle
\sum_{i=1}^{N_q}r_{i,a}r_{i,b}
\right\rangle_{\text{cyc},q}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-466785028c222e42)
This equal-weight geometric convention is fixed before closure. It prevents the extracted shape residual from changing when an observer-level inertial-response convention is later assigned to the admitted assembly branch. Let $q_{\parallel}(v),q_{\perp,1}(v),q_{\perp,2}(v)$ be principal-frame eigenvalues of $Q^{(q)}(v)$, with principal axis chosen along group velocity for $q_{\parallel}$. Define extracted semiaxes
$$
a_{\parallel,q}(v)\equiv \sqrt{q_{\parallel}(v)}\qquad
a_{\perp,q}(v)\equiv \sqrt{\frac{q_{\perp,1}(v)+q_{\perp,2}(v)}{2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a21567ec8416b496)
The moving-assembly contraction residual is
$$
R_\xi^{(q)}(v)
\equiv
\frac{a_{\parallel,q}(v)}{a_{\perp,q}(v)}
-
\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60c23b42eb86f007)
and the theorem target is the leakage bound
$$
\left|R_\xi^{(q)}(v)\right|
\le
C_{\parallel}\epsilon_{\text{LV}}\beta_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-af81afe763de35bc)
uniformly on the declared group-speed band. This is a moving-assembly extraction condition. Weak-field PPN tests can later falsify the dressed medium response, but they are not inputs to this semiaxis extraction.

#### Quadratic closure and coefficient constraints

On the attracting manifold, use principal-frame quadratic closure
$$
U_{\text{eff}}=\frac{1}{2}K_{\parallel}(v)\,r_{\parallel}^2+\frac{1}{2}K_{\perp}(v)\left(r_{\perp,1}^2+r_{\perp,2}^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-673701ca98f1da53)
Notation guardrail: in this chapter, $U_{\text{eff}}$ denotes the cycle-averaged mechanical potential on the translating attractor; it is distinct from the positive weak-field PPN variables $U$ and $U_{\Phi}$ used in [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md). Do not identify a fixed-energy shell with a fixed-action shell. Parameterize the amplitude response by
$$
a_i\propto K_i^{-p},
\qquad
\frac{a_{\parallel}}{a_{\perp}}
=
\left(\frac{K_{\perp}}{K_{\parallel}}\right)^p.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c6c17bc8d4b11404)
The fixed-energy harmonic scaling is $p=1/2$, while conservative adiabatic-action scaling is $p=1/4$. A strictly attracting delayed branch need not preserve either shell: its effective exponent must be extracted from the settled branch $\boldsymbol\rho^\star(s;\beta_f)$, and the constant-$p$ form below is only a local response ansatz. Write
$$
\frac{K_{\parallel}}{K_0}=1+k_2\beta_f^2+k_4\beta_f^4+O(\beta_f^6)+\Delta_{\parallel}^{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f17ac6b0fe20758f)
$$
\frac{K_{\perp}}{K_0}=1+\ell_2\beta_f^2+\ell_4\beta_f^4+O(\beta_f^6)+\Delta_{\perp}^{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dfd2ede4448b98db)
with $|\Delta_i^{\text{LV}}|\le C_i\epsilon_{\text{LV}}$. Then
$$
\frac{a_{\parallel}}{a_{\perp}}
=1+p(\ell_2-k_2)\beta_f^2
+\left[
p(\ell_4-k_4)
+\frac{p(p+1)}{2}k_2^2
-p^2k_2\ell_2
+\frac{p(p-1)}{2}\ell_2^2
\right]\beta_f^4
+O(\beta_f^6)+O(\epsilon_{\text{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1a20ffa02db0a73a)
Matching to
$$
\frac{1}{\gamma_f}=1-\frac{1}{2}\beta_f^2-\frac{1}{8}\beta_f^4+O(\beta_f^6)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f6f05a05e6a2f1aa)
imposes
$$
p(\ell_2-k_2)=-\frac12
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5e38657e0afc4f6a)
$$
p(\ell_4-k_4)
+\frac{p(p+1)}{2}k_2^2
-p^2k_2\ell_2
+\frac{p(p-1)}{2}\ell_2^2
=-\frac18.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-55a0846f085aa562)

#### Stiffness tensor from causal-wake surface integrals

To anchor coefficient matching in the microdynamics, define the pairwise causal-wake potential on a translating attractor $\boldsymbol{\rho}^\star(s;\beta_f)$:
$$
\mathcal{U}_{ij}(T;\beta_f)\equiv
\int_{\Sigma_{ij}^{\text{wake}}(T)}
\frac{\kappa\,\epsilon^2}{\|\mathbf X_i(T)-\mathbf X_j(T-\Delta)\|^2}\,
W_{ij}(T,\sigma;\eta)\,d^2\sigma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dee13ca97e3ce65d)
where $W_{ij}$ is the regularized causal kernel weight and $\eta>0$ is the regularization scale. Set
$$
U_{\text{eff}}(T;\beta_f)\equiv \sum_{i<j}\mathcal{U}_{ij}(T;\beta_f)
\qquad
K_{ab}(\beta_f)\equiv
\left\langle
\frac{\partial^2 U_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3bd12cd176fea27a)
with cycle average $\langle\cdot\rangle_{\text{cyc}}$ taken on $\boldsymbol{\rho}^\star$. Project to principal channels:
$$
K_{\parallel}=\hat{e}_{\parallel}^a K_{ab}\hat{e}_{\parallel}^b\qquad
K_{\perp}=\frac{1}{2}(\delta^{ab}-\hat{e}_{\parallel}^a\hat{e}_{\parallel}^b)K_{ab}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0770d5d24a6e825f)

Dimensionless factorization exposes Category A coupling:
$$
K_i(\beta_f)=\frac{\kappa\,\epsilon^2}{a_0^3}\,\mathcal{I}_i(\beta_f,\chi_{\mathrm{dd}},\eta,\dots)
\qquad i\in\{\parallel,\perp\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cef4651d08f51d83)
Hence
$$
k_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\parallel}(0)}
\qquad
\ell_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1e6a089e61e1915e)
$$
k_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\parallel}(0)}
\qquad
\ell_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7991607ed4caa38d)
Therefore the Lorentz-matching constraints in [Quadratic Closure and Coefficient Constraints](#quadratic-closure-and-coefficient-constraints) and [Clock-Channel Expansion and Minimal Closure Solution](#clock-channel-expansion-and-minimal-closure-solution) become explicit derivative identities on $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ evaluated on the delay-Floquet attractor.

#### Period renormalization

Let $P_q(v)$ be the fundamental oscillation period of the assembly attractor in absolute time, extracted from the declared clock phase on the same branch ledger as the semiaxes. The clock retuning residual is
$$
R_T^{(q)}(v)
\equiv
\frac{P_q(v)}{P_0}
-
\gamma_\star(v)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c110ae1590a35ef0)

Here $P_0$ is the reference cycle period of the same declared clock branch.

Operational proper-time behavior requires the theorem-target bound
$$
\left|R_T^{(q)}(v)\right|
\le
C_T\epsilon_{\text{LV}}\beta_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e5e72191c0bcda8a)
Exact closure is the limit $\epsilon_{\text{LV}}\to 0$.

#### Clock-channel expansion and minimal closure solution

Use a symmetric clock-frequency aggregator
$$
\omega_{\text{clk}}(v)\equiv \omega_0\left(\frac{K_{\parallel}K_{\perp}^2}{K_0^3}\right)^{1/6}
\qquad
\frac{P(v)}{P_0}=\frac{\omega_0}{\omega_{\text{clk}}(v)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea524532bba3b857)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

Then
$$
\frac{P(v)}{P_0}
=1-\frac{k_2+2\ell_2}{6}\beta_f^2
+\left[
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
\right]\beta_f^4
+O(\beta_f^6)+O(\epsilon_{\text{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fb64bb9ddebdb70b)
Matching to
$$
\gamma_f=1+\frac{1}{2}\beta_f^2+\frac{3}{8}\beta_f^4+O(\beta_f^6)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b743c1b1e2001415)
gives the clock constraints
$$
k_2+2\ell_2=-3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8061010725b1ca6f)
$$
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
=\frac{3}{8}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d67a5c727abb787b)
Combining with shape closure yields the exponent-conditional matched coefficient set
$$
k_2=\frac{1/3-p}{p},
\qquad
\ell_2=-\frac{p+1/6}{p},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3bb9ab5617a87217)
and, at $O(\beta_f^4)$,
$$
k_4=\frac{1-3p}{18p^2},
\qquad
\ell_4=\frac{6p+1}{72p^2}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9db7a8fd077708a7)
For fixed energy ($p=1/2$) this reduces to
$$
\left(-\frac13,-\frac43,-\frac19,\frac29\right),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4b4173e6e0095291)
while conservative fixed action ($p=1/4$) gives
$$
\left(\frac13,-\frac53,\frac29,\frac59\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-efeb83dc4dfaab9a)
Neither vector is a primitive prediction until the moving delayed branch supplies its amplitude law. The $1/6$-power geometric-mean clock aggregator is a second independent ansatz and remains to be derived.

#### binary-3 transduction hypothesis (working)

Assume binary 3 is the dominant transducer for energy exchange with passerby assemblies (non-locally coupled encounters). Under this source-record hypothesis, the leading kinematic response is boundary-driven at binary 3, then propagated through binaries 2 and 1. The indices are persistent identities, not a radius or energy ordering.

For locally coupled assemblies (strong axial coupling), interaction pathways are distinct and should be modeled as a separate regime, not merged with passerby-transfer fits.

#### State update map for single-quantum uptake

For an assembly state
$$
\mathcal{S}=\{v_{\text{tr}}, f_1,f_2,f_3,\mathbf{A},\mathcal{E}_{\text{excl}},\tau_{\text{op}}\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bfe7775800004cdd)
let one absorbed quantum $\Delta E_q$ induce
$$
\mathcal{S}\mapsto \mathcal{S}'=\mathcal{S}+\Delta\mathcal{S}(\Delta E_q)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a4f667ac5b4dd84a)
with the following structured components:

1. Translational architrino speed increase: $\Delta v_{\text{tr}}>0$.
2. Discrete frequency retuning of binaries $1,2,3$: $\Delta f_k=n_k\,\delta f_k$, with $n_k\in\mathbb{Z}$ and $k\in\{1,2,3\}$.
3. Coincident-midpoint orthogonal-axis braid axis realignment: $\Delta\mathbf{A}\neq 0$ (precession/tilt of principal axes).
4. Exclusion-zone geometry shift: $\Delta\mathcal{E}_{\text{excl}}\neq 0$ (shape and orientation update).
5. Operational time response shift: $\Delta\tau_{\text{op}}\neq 0$.

#### Open mapping: observer-level time dilation in $\mathbb{A}\mathbb{A}\mathbb{A}$

The observer-level clock-dilation channel is not yet fully mapped in substrate variables. The working interpretation in this document is:
$$
\tau_{\text{op}}=\tau_{\text{op}}(f_1,f_2,f_3,\mathbf{A},\mathcal{E}_{\text{excl}},v_{\text{tr}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8c1c0e485237d9a)
where $\tau_{\text{op}}$ is an emergent clock functional of assembly internal frequencies, axis geometry, exclusion-zone shape, and translation state.

The immediate task is to identify which subset dominates $\partial \tau_{\text{op}}/\partial E$ in the passerby-transfer regime, with the default prior that binary-3-mediated updates are first-order.

#### Evolving scenario: exclusion-volume driven effective spacetime

Working assumption:

1. In the working source record, binary 3 defines the effective exclusion-volume boundary; see [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). This is a provisional branch role, not a taxonomy identity.
2. Each coincident-midpoint orthogonal-axis braid binary ($1,2,3$) has its own circulation axis.
3. Total angular and translational momentum are conserved at assembly level (up to modeled exchange channels with environment).

Proposed mechanism chain under applied force (acceleration of a Noether braid-based assembly):

1. External forcing increases translational state.
2. Axis coupling drives partial alignment of the three persistently indexed circulation axes.
3. Alignment is accompanied by binary radius contraction across layers (with layer-dependent sensitivity).
4. The exclusion volume changes shape and orientation because the working source record assigns its boundary to precessing binary 3.
5. Neighboring assemblies then see changed path-history geometry and interaction timing.
6. At coarse scale, this appears as a modified effective kinematic/geometric background, i.e. an emergent spacetime response.

This can be treated as a coupled state map:
$$
(\mathbf V,\mathbf{A}_1,\mathbf{A}_2,\mathbf{A}_3,R_1,R_2,R_3,\mathcal{E}_{\text{excl}})
\xrightarrow{\;\Delta \mathbf{p}\;}
(\mathbf V',\mathbf{A}_1',\mathbf{A}_2',\mathbf{A}_3',R_1',R_2',R_3',\mathcal{E}_{\text{excl}}')
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0992fbc5230dc210)

Initial directional hypothesis for acceleration response:
$$
\|\mathbf{A}_1-\mathbf{A}_3\|,\ \|\mathbf{A}_2-\mathbf{A}_3\| \downarrow\qquad
R_1,R_2,R_3 \downarrow
$$

[View →](../../../../../equation-mapping.html#corpus-equation-92514183ac10c982)
with the strongest transduction provisionally assigned to binary 3.

Interpretive thesis:

Einstein-like spacetime behavior may be recovered as the continuum limit of moving, deforming exclusion volumes of Noether braids under translation and local volume variation, rather than from fundamental geometric curvature at substrate level.

Consistency checks required for this scenario:

1. Contraction and alignment must satisfy conservation laws and admissible torque channels.
2. The induced clock/ruler renormalization must reproduce Lorentz-like scaling to required accuracy.
3. Residual anisotropy harmonics must remain below empirical bounds after observer construction.
4. Local axial-coupling encounters must be modeled separately from passerby-transfer events.

Status: scenario is a structured hypothesis, not yet a proved derivation. Its proof burden is to recover the theorem targets and simulation residuals below from the same branch ledger.

#### Two-channel deformation: shape plus scale

Relevant to Lorentzian closure, the Noether braid deformation is not only axis-ratio change. A working two-channel model is:

1. Shape channel (oblateness): longitudinal compression relative to transverse radius.
2. Scale channel (radius rescaling): transverse radius changes with energy state.

Use the declared observer-channel speed for this closure step:
$$
R_\parallel=\frac{R_\perp}{\gamma_\star}\qquad \gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}\qquad \beta_\star=\frac{v_{\text{tr}}}{c_\star}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d33863a3a3a1d9ff)
with $c_\star=c_{\text{eff}}$ for Noether sea dressed clock/ruler closure and $c_\star=c_f$ only for a primitive branch-chart calculation. For the scale channel, use
$$
R_\perp=R_\perp(E_{\mathrm{int}})\qquad \frac{dR_\perp}{dE_{\mathrm{int}}}<0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b8b1a55f4b9edf9)
as a working prior in internally excited regimes, with group velocity held fixed. Pure translation must separately satisfy
$$
\left.\frac{\partial R_\perp}{\partial\beta_\star}\right|_{E_{\mathrm{int}}}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-568391e2d485dfed)
in the no-extra-scale return-cycle benchmark; otherwise $P_q(v)=\gamma_\star P_0$ does not follow from the displayed geometry. A certified energized-branch record exhibiting $dR_\perp/dE_{\mathrm{int}}\ge 0$ is the observable that would flip the internal-excitation sign choice.

The corresponding exclusion volume model is
$$
V(\beta_\star,E_{\mathrm{int}})=\frac{4\pi}{3}R_\perp(E_{\mathrm{int}})^2R_\parallel(E_{\mathrm{int}},\beta_\star)
=\frac{4\pi}{3}R_\perp(E_{\mathrm{int}})^3\sqrt{1-\beta_\star^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-55adb308e870e260)

This gives a direct state-space channel from energy and translation into local Noether sea geometry:
$$
(\beta_\star,E_{\mathrm{int}})\longmapsto (R_\parallel,R_\perp,V)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2ba4e7da2e5eeea7)

#### Local deformation fields and effective geometry handoff

For coarse-grained modeling, define local fields
$$
\xi(x)=\frac{R_\parallel}{R_\perp}\qquad
\lambda(x)=\frac{R_\perp(x)}{R_{\perp,0}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-51297c29c7211c1f)
with $\xi\in(0,1]$ as shape and $\lambda$ as scale. The Lorentz-closure target is $\xi(x)\to1/\gamma_\star(x)$ in the homogeneous group velocity regime.

Terminology guardrail: $\xi$ is the Noether braid envelope shape ratio, inherited from [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#canonical-geometry-variables). It is not defined as the clock-rate factor. In the homogeneous Lorentz-closure regime the proof target is
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt_{\mathrm{eff}}}\to\xi\to\frac{1}{\gamma_\star}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76b2b483ba0db01b)
so clock slowing is a derived readout of the geometry-to-clock map.

Together with local assembly density $n(x)$ (with $\rho_{\text{NS}}(x)=\rho_{\text{NS},0}n(x)$) and preferred-frame flow/orientation $\hat{u}(x)$, these define a minimal handoff tuple
$$
(\xi,\lambda,n,\hat{u})_x
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f7c400e9e3e03c88)
for constructing effective kinematic and metric responses. The kinematic closure requirement is that observer-built rods/clocks from this Noether sea recover Lorentz-consistent operational laws to bounded leakage.

#### Algebraic effective metric map from the handoff tuple

To make Stage D constructive, introduce an observer-sector pseudo-Riemannian template
$$
\eta^{\mu\nu}=\mathrm{diag}(-1,1,1,1)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8d8da2f8667de32)
used only as an operational constitutive object (not as substrate ontology). Let $\hat{u}^\mu$ be the unit medium-flow 4-field with
$$
\eta_{\mu\nu}\hat{u}^\mu\hat{u}^\nu=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b1ed06c8ec8686e4)
Define the disformal covariant metric
$$
g_{\mu\nu}^{\text{eff}}(x)=
\Omega^2(n,\lambda)\left[
\eta_{\mu\nu}
+\left(1-\xi^2(x)\right)\hat{u}_{\mu}\hat{u}_{\nu}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba3a80076a0c6ab5)
Its inverse form is
$$
g_{\text{eff}}^{\mu\nu}(x)=
\Omega^{-2}(n,\lambda)\left[
\eta^{\mu\nu}
+\left(1-\xi^{-2}(x)\right)\hat{u}^{\mu}\hat{u}^{\nu}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-00db40c650d5210f)
Hence microscopic shape closure, when it yields $\xi\to1/\gamma_\star$, is injected directly into $g_{\mu\nu}^{\text{eff}}$.

In the local Noether sea rest frame ($\hat{u}^\mu=(1,0,0,0)$), with observer-sector coordinate $x_{\mathrm{eff}}^0=c_0 t_{\mathrm{eff}}$:
$$
ds_{\text{eff}}^2=g_{\mu\nu}^{\text{eff}}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu
=-\Omega^{2}\xi^{2}(dx_{\mathrm{eff}}^0)^2+\gamma_{ij}^{\mathrm{eff}}dx_{\mathrm{eff}}^i dx_{\mathrm{eff}}^j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff226f3054cc996d)
Therefore the stationary ideal clock-rate factor extracted from the metric subclass is $\Omega\xi$, while the spatial ruler scale is governed by $\Omega$. This preserves the geometry-first interpretation: $\xi$ remains the oblate-envelope shape ratio, and the clock rate agrees with $\xi$ only after the geometry-to-clock closure is proved.

### Observer Construction and Operational Invariance

#### Assembly clocks and rods

Physical observers are built from the same bound-state class that obeys the above deformation and period laws. Therefore, measurement devices inherit velocity-dependent retuning.

#### Two-way signal speed criterion

For ruler and clock systems made of translated assemblies, two-way signal experiments must satisfy
$$
c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e4dbe9cd86f63436)
uniformly in orientation $\theta$. This is the operational statement that maps substrate anisotropy into effective Lorentz symmetry at observer scale.

For clock-and-ruler synchronization, $c_{\text{iso}}$ is the dressed local assembly signal speed. For photon synchronization, it is the local photon-channel speed $c_\gamma$; photon Gate A must show when the photon branch shares the same homogeneous-cell limit as $c_{\text{eff}}$.

#### Conditional synchronization-reabsorption lemma

The synchronization claim has a compact conditional form. In a weak homogeneous cell, suppose the same moving-assembly response supplies the photon-channel clock and ruler laws
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\gamma},
\qquad
\frac{d\tau}{dt_{\mathrm{eff}}}=\frac{1}{\gamma_\gamma},
\qquad
\gamma_\gamma=\frac{1}{\sqrt{1-v^2/c_\gamma^2}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6382765b4ee26876)
with $v$ measured relative to the Euclidean-void rest frame. These equations are not assumed as completed dynamics; they are the response form the branch must derive from one Noether sea and assembly record.

In the absolute frame, the one-way photon legs along a longitudinal arm are unequal:
$$
t_{\to}=\frac{L_{\parallel}}{c_\gamma-v},
\qquad
t_{\leftarrow}=\frac{L_{\parallel}}{c_\gamma+v}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea8b6c9e55476905)
The one-way anisotropy is therefore real at the substrate level. The round-trip absolute time is
$$
t_{\mathrm{rt}}
=
t_{\to}+t_{\leftarrow}
=
\frac{2L_{\parallel}c_\gamma}{c_\gamma^2-v^2}
=
\frac{2L_0\gamma_\gamma}{c_\gamma}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-186350704ca944d0)
The moving assembly clock records
$$
\tau_{\mathrm{rt}}
=
\frac{t_{\mathrm{rt}}}{\gamma_\gamma}
=
\frac{2L_0}{c_\gamma}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-03da0b43cc65cbb9)
Thus the measurable two-way photon-channel speed is $c_\gamma$ even though the two one-way legs were asymmetric in absolute time. Einstein synchronization assigns the remote-clock reading by splitting this round trip; a Reichenbach-style one-way freedom remains, but embedded observers cannot extract the absolute anisotropy unless the clock, ruler, or signal-channel response leaves a residual in the preferred-frame leakage budget.

Slow clock transport supplies an independent synchronization route. A clock carried adiabatically between two endpoints must agree with the Einstein-synchronized endpoint clock in the zero-transport-speed limit, with any surviving $O(\beta_\star)$ discrepancy retained as a clock-law leakage row. Agreement is not guaranteed by two-way optical isotropy alone because the transported clock samples the moving-assembly cadence throughout its path.

The conditional lemma applies to a contractible out-and-back path in one synchronization patch. It does not set a rotating closed loop to zero. For a loop with area vector $\mathbf A_{\mathrm{loop}}$ and angular velocity $\boldsymbol\Omega_{\mathrm{rot}}$, the observer-level Sagnac comparison has the nonzero leading target
$$
\Delta t_{\mathrm{Sag}}
=
\frac{4\boldsymbol\Omega_{\mathrm{rot}}\cdot\mathbf A_{\mathrm{loop}}}{c_\gamma^2}
+
\mathcal R_{\mathrm{Sag}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1135d58bf9c5038b)
The same clock, ruler, and photon record must recover this loop residual while keeping the contractible two-way anisotropy row small. Treating synchronization reabsorption as a global cancellation around rotating loops would therefore fail the observer map.

This lemma proves only a conditional reabsorption statement: if one branch supplies the square-root ruler law and the square-root clock law, then the two-way optical row self-nulls. It does not prove that the Noether sea response yields those laws. Any deviation in $L_{\parallel}$, $d\tau/dt_{\mathrm{eff}}$, or $c_\gamma$ becomes one of the leakage residuals below.

The same caution applies to speed identification. Let $c_{\mathrm{clk}}$ denote the limiting speed that appears in the moving-assembly clock law and let $c_\gamma$ denote the photon-channel speed used for synchronization. The conditional reabsorption above requires $\gamma_{\mathrm{clk}}=\gamma_\gamma$ in the tested homogeneous branch. If a primitive calculation supplies $\gamma_f(v)$ using $c_f$ while the photon row uses $\gamma_\gamma(v)$ with a different speed, the mismatch appears as an $O(\beta_\star^2)$ two-way residual rather than as Lorentz closure. The accepted target is therefore common-mode dressing: the observer-facing clock, ruler, photon, and effective gravitational channels must share the same homogeneous limiting speed after the Noether sea response is declared. It is not legitimate to collapse $c_f$, $c_\gamma$, $c_{\text{eff}}$, and $c_{\mathrm{GW}}^{\mathrm{eff}}$ by notation before that derivation is supplied.

#### Weak-homogeneous speed-factorization lemma

The observer-channel coincidence and the relation to primitive wake speed are two distinct closure statements. Let $W_0$ be a weak homogeneous calibration cell and define
$$
\chi_{\mathrm{sea},0}
\equiv
\chi_{\mathrm{sea}}(W_0)
=
\frac{c_f}{c_{\mathrm{eff}}(W_0)},
\qquad
\chi_{\gamma,0}
\equiv
\chi_\gamma(W_0)
=
\frac{c_0}{c_\gamma(W_0)}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4a72dce3ed82f7a)
When $W_0$ realizes the asymptotic observer calibration, $c_{\mathrm{eff}}(W_0)=c_0$ by the definition $c_0\equiv c_{\mathrm{eff}}(\infty)$. The speed factorization is then
$$
c_{\mathrm{eff}}(W_0)
=
c_0
=
\frac{c_f}{\chi_{\mathrm{sea},0}},
\qquad
c_\gamma(W_0)
=
\frac{c_0}{\chi_{\gamma,0}}
=
\frac{c_f}{\chi_{\mathrm{sea},0}\chi_{\gamma,0}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-70436f175ac6ea79)

Plainly: calibrating clocks and rulers fixes how the dressed observer speed compares with $c_f$; photon Gate A separately decides whether the photon channel shares that calibrated speed. Equality of the observer channels does not by itself remove the Noether sea dressing between their common value and the primitive wake speed.

It follows immediately that
$$
c_\gamma(W_0)
=
c_{\mathrm{eff}}(W_0)
=
c_0
\quad\Longleftrightarrow\quad
c_{\mathrm{eff}}(W_0)=c_0
\ \text{and}\
\chi_{\gamma,0}=1.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fe8a1658646aa56e)
Plainly: the selected cell must actually realize the asymptotic clock-and-ruler calibration, and the photon channel must have no residual offset from that calibration.

The first condition says that the selected cell is the asymptotic weak homogeneous calibration state. The second is the photon common-mode condition. For a finite leakage budget, define
$$
r_0
\equiv
\frac{c_{\mathrm{eff}}(W_0)}{c_0}-1,
\qquad
r_{\gamma\mathrm{e}}
\equiv
\frac{c_\gamma(W_0)}{c_{\mathrm{eff}}(W_0)}-1.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-62c33f24bdbf0876)
Then the exact composition identity is
$$
\frac{c_\gamma(W_0)}{c_0}-1
=
r_0+r_{\gamma\mathrm{e}}+r_0r_{\gamma\mathrm{e}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0f2dd36984b0bc7b)
Theorem G requires both residuals to come from the same retained Noether sea and branch record and to remain inside the declared channel bounds. A numerical cancellation in their sum does not establish structural closure if the two residuals were fitted independently.

Plainly: exact three-speed coincidence requires both calibration closure and photon-to-clock/ruler closure. Approximate coincidence is controlled by two named residuals whose product is retained rather than hidden inside one fitted error bar.

The remaining relation to primitive wake speed is
$$
\frac{c_0}{c_f}
=
\frac{1}{\chi_{\mathrm{sea},0}},
\qquad
\delta_0
\equiv
1-\frac{c_0}{c_f}
=
1-\frac{1}{\chi_{\mathrm{sea},0}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-79ac9cbee34e4549)
In normalized wake-speed units with $c_f=1$, the same row is
$$
c_0
=
\chi_{\mathrm{sea},0}^{-1},
\qquad
c_\gamma(W_0)
=
\left(\chi_{\mathrm{sea},0}\chi_{\gamma,0}\right)^{-1}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-383befaabdb6aa2e)
Plainly: once $c_f$ is set to one, the two delay factors themselves determine the dressed clock/ruler calibration and the photon-channel speed.

Therefore all four speeds coincide only under the additional undressed fixed-point condition $\chi_{\mathrm{sea},0}=1$. A persistent weak-homogeneous dressing with $\chi_{\mathrm{sea},0}>1$ instead gives $c_f>c_0$ while preserving $c_\gamma=c_{\mathrm{eff}}=c_0$ at the observer level. The case $\chi_{\mathrm{sea},0}<1$ would make the record-bearing observer channel outrun the primitive causal-wake support and is inadmissible under the present causal-front definition unless a separate support theorem shows that no record is available before the $c_f$ front.

On the proportional-collapse candidate in photon Gate A, common-mode closure gives
$$
d(\omega,\delta_0)
\sim
\Lambda_\gamma\frac{c_f-c_0}{\omega}
=
\Lambda_\gamma\frac{c_f\delta_0}{\omega}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c9417a9bbabf8935)
Plainly: on this candidate, the planar-pair separation is proportional to the gap between primitive wake speed and the common observer speed.

Thus the exact undressed limit $\chi_{\mathrm{sea},0}\to1$ forces $d\to0$ on that candidate at fixed finite $\omega$, whereas a finite-separation branch requires either $\chi_{\mathrm{sea},0}>1$ or a separately derived phase-locking cancellation. This is a conditional consequence of the current Gate A scaffold, not evidence that the photon branch exists or that $c_f>c_0$ has been measured.

> Claim grade: derived. The factorization, coincidence criterion, and residual-composition identity follow algebraically from the declared speed definitions. Falsifier: a same-record retained branch that satisfies the declared definitions while violating any of those identities.
>
> Claim grade: inferred. The present record-bearing causal-front definition requires $\chi_{\mathrm{sea},0}\ge1$. Falsifier: an accepted channel with $c_0>c_f$ that still produces no record before the primitive $c_f$ support.
>
> Claim grade: guessed. The proportional-collapse Gate A branch is a candidate physical realization. Falsifier: failure to retain that photon branch, or a finite-separation Gate A branch at $c_\gamma=c_f$ produced by a different phase-locking cancellation.

The same criterion has a long-baseline photon consequence. If the photon branch uses a frequency-dependent delay factor, then a distant transient comparison accumulates
$$
\Delta t_{\gamma}^{\mathrm{model}}(\omega_a,\omega_b;z)
=
\int_{\Gamma_z}
\frac{
\chi_\gamma(\omega_a,\mathbf X,T)
-
\chi_\gamma(\omega_b,\mathbf X,T)
}{c_0}\,d\ell
$$

[View →](../../../../../equation-mapping.html#corpus-equation-19da2840491b6500)
Operational Lorentz closure therefore requires this residual to vanish, or remain below the declared timing bound, in the same weak homogeneous branch that supplies $c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}})$. It is not enough to recover local two-way isotropy while leaving cosmological photon timing to a separately tuned channel record.

#### Round-trip anisotropy cancellation through $O(\beta_\star^4)$

Let arm lengths in the preferred frame be written using the declared two-way signal channel speed, with $\beta_\star=v/c_\star$:
$$
\frac{L_{\parallel}}{L_0}=1+\alpha_2\beta_\star^2+\alpha_4\beta_\star^4+O(\beta_\star^6)\qquad
\frac{L_{\perp}}{L_0}=1+b_2\beta_\star^2+b_4\beta_\star^4+O(\beta_\star^6)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-107c747c6c80bf56)
Round-trip absolute times are
$$
t_{\parallel}
=\frac{2L_{\parallel}c_\star}{c_\star^2-v^2}
=\frac{2L_0}{c_\star}\left[
1+(1+\alpha_2)\beta_\star^2+(1+\alpha_2+\alpha_4)\beta_\star^4+O(\beta_\star^6)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-50ceade98262129e)
$$
t_{\perp}
=\frac{2L_{\perp}}{\sqrt{c_\star^2-v^2}}
=\frac{2L_0}{c_\star}\left[
1+\left(b_2+\frac{1}{2}\right)\beta_\star^2
+\left(b_4+\frac{b_2}{2}+\frac{3}{8}\right)\beta_\star^4
+O(\beta_\star^6)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2098478090567c03)
Define the normalized anisotropy mismatch
$$
\Delta_{\text{tw}}(\beta_\star)\equiv \frac{t_{\parallel}-t_{\perp}}{2L_0/c_\star}
=A_2\beta_\star^2+A_4\beta_\star^4+O(\beta_\star^6)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-58004c37fa4cb837)
with
$$
A_2=\alpha_2-b_2+\frac{1}{2}
\qquad
A_4=\alpha_4-b_4+\alpha_2-\frac{b_2}{2}+\frac{5}{8}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-321429e9811b665c)
Operational isotropy through $O(\beta_\star^4)$ requires
$$
A_2=0\qquad A_4=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d2e63b3d906b942d)
In the transverse-gauge choice $b_2=b_4=0$, this yields
$$
\alpha_2=-\frac{1}{2}\qquad \alpha_4=-\frac{1}{8}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-90b83b9ff89b0f16)
which is precisely $L_{\parallel}=L_0/\gamma_\star+O(\beta_\star^6)$.

### Derivation Program

#### Stage A: binary analytic benchmark

Start with a single causal path-history binary under constant group velocity $\mathbf V$. Derive:

1. Existence and stability of periodic or quasi-periodic attractors.
2. Closed-form or asymptotic estimates for $(a_{\parallel}/a_{\perp})(\beta_f)$.
3. First nonzero leakage coefficients in the $\beta_f$ expansion.

#### Stage B: Coincident-Midpoint Orthogonal-Axis Braid Full Closure

Promote to a coincident-midpoint orthogonal-axis braid with coupled circulation scales. Establish:

1. Persistence of aligned attractor family under group velocity.
2. Factorization or controlled coupling of 1/2/3 period shifts.
3. Emergent universal $\gamma_f$-law independent of axial-structure details, within a defined class.

#### Stage C: continuum handoff

Derive coarse-grained kinematic constitutive relations used by effective metric models:
$$
\mathcal{K}_{\text{micro}} \Longrightarrow \mathcal{K}_{\text{eff}}(v,n,\nabla n,\dots)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d602ac96c7d6c786)
so local assembly kinematics and macroscopic refractive geometry are mathematically linked.

#### Stage D: effective-medium and weak-field closure sequence

To connect the two-channel deformation model to observables, use the following sequence:

1. Single-braid constitutive closure: derive or fit-test $R_\perp(E)$ and induced $\xi(E,\beta_\star)$ from causal path-history coincident-midpoint orthogonal-axis braid dynamics.
2. Effective-medium propagation law: construct $n_{\text{eff}}(\xi,\lambda,n)$ for signal transport through deformed Noether braid populations.
3. Effective metric extraction: build $g_{\mu\nu}^{\text{eff}}$ from medium variables and preferred-frame structure.
4. Weak-field consistency checks: verify Newtonian limit and required post-Newtonian behavior in the operational observer sector.
5. Strong-field/cosmology consistency checks: test horizon-adjacent and expansion-regime implications of the same constitutive channels.

#### Effective connection and geodesic emergence

Given $g_{\mu\nu}^{\text{eff}}$ from [Algebraic Effective Metric Map from the Handoff Tuple](#algebraic-effective-metric-map-from-the-handoff-tuple), define
$$
\Gamma^\lambda_{\mu\nu}
=\frac{1}{2}g^{\lambda\rho}_{\text{eff}}
\left(
\partial_\mu g_{\rho\nu}^{\text{eff}}
+\partial_\nu g_{\rho\mu}^{\text{eff}}
-\partial_\rho g_{\mu\nu}^{\text{eff}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-176f8477239e1960)
Geodesic flow in the observer sector is
$$
\frac{d^2x_{\mathrm{eff}}^\lambda}{d\tau^2}
+\Gamma^\lambda_{\mu\nu}
\frac{dx_{\mathrm{eff}}^\mu}{d\tau}\frac{dx_{\mathrm{eff}}^\nu}{d\tau}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2a5eb27c1cda7d69)

For small group speed, slowly varying Noether sea flow, and quasi-static fields in a local Noether sea rest frame, define
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)\equiv c_0^2\ln\!\big(\Omega(n,\lambda)\,\xi\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8f685ec931d91e8f)
The $c_0^2$ prefactor marks this as an observer-sector potential calibration: $c_0$ is the declared observer-sector speed, and the $c_f\to c_0$ normalization is an obligation of the dressing map, not an input identity. Any residual $c_f$-vs-$c_0$ mismatch in this branch is bounded by the same $\epsilon_{\mathrm{LV}}$ budget that the structural-integrity closure target must drive below the experimental rows above; it is not assumed small here. Then the nonrelativistic geodesic limit becomes
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-\xi^{2}(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(\frac{\|\mathbf V\|^2}{c_0^2},\epsilon_{\text{LV}}\right)
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
\left|1-\xi^{2}\right|\,\left|\nabla\Phi_{\text{eff}}\right|,
\frac{\|\mathbf V\|^2}{c_0^2},
\epsilon_{\text{LV}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1fce4564cb78218b)
with explicit source channels
$$
\nabla \Phi_{\text{eff}}
=c_0^2\left[
\partial_{\ln n}\ln\Omega\ \nabla\ln n
+\partial_{\ln \lambda}\ln\Omega\ \nabla\ln \lambda
+\nabla\ln\xi
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-19d6ac4b6158ef3d)
Thus gradients of $n$ and $\lambda$ (and kinematic $\xi$ gradients) enter the affine structure as the apparent-gravity source terms.

The eikonal/least-time handoff is then:
$$
\delta\!\int_{\Gamma} n_{\text{eff}}(x)\,ds=0
\quad\Longleftrightarrow\quad
\nabla_{\dot{x}}\dot{x}=0\ \text{under}\ g_{\mu\nu}^{\text{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ab3e1db82de78f3d)
in the weak-field refractive regime.

#### Coefficient-extraction and closure estimators

For each simulated group speed, keep the channel label explicit. Primitive branch calculations use $\beta_f=v/c_f$; dressed observer-channel fits use $\beta_\star=v/c_\star$ after the dressing map is declared. Extract from long-window attractor statistics:
$$
\hat{\alpha}_j\equiv \frac{a_{\parallel,q}(\beta_j)}{a_{\perp,q}(\beta_j)}\qquad
\hat{\tau}_j\equiv \frac{P_q(\beta_j)}{P_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d4bd80ddc6657454)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

Fit even-power truncations
$$
\hat{\alpha}(\beta_f)=1+\hat{\alpha}_2\beta_f^2+\hat{\alpha}_4\beta_f^4\qquad
\hat{\tau}(\beta_f)=1+\hat{\tau}_2\beta_f^2+\hat{\tau}_4\beta_f^4
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0ba893bbd9a95890)
Lorentz closure at this order requires
$$
\hat{\alpha}_2=-\frac{1}{2}\quad \hat{\alpha}_4=-\frac{1}{8}\qquad
\hat{\tau}_2=\frac{1}{2}\quad \hat{\tau}_4=\frac{3}{8}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cfb953664cd2a982)
Define closure residuals on a primitive calibration band $0\le\beta_f\le\beta_{\max}$, or on the dressed band after replacing $\beta_f$ by $\beta_\star$ and $\gamma_f$ by $\gamma_\star$:
$$
R_\xi^{(q)}(\beta_f)
\equiv
\hat{\alpha}(\beta_f)-\frac{1}{\gamma_f(\beta_f)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dca39a147c86d181)
$$
R_T^{(q)}(\beta_f)
\equiv
\hat{\tau}(\beta_f)-\gamma_f(\beta_f)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b18bbe6a441f08f5)
The reported leakage scores are
$$
\mathcal{E}_{\text{shape}}
\equiv
\sup_{0\le \beta_f\le \beta_{\max}}
\left|R_\xi^{(q)}(\beta_f)\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c3d7a23411bc3cfa)
$$
\mathcal{E}_{\text{clock}}
\equiv
\sup_{0\le \beta_f\le \beta_{\max}}
\left|R_T^{(q)}(\beta_f)\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8437d4d4eb32cbd1)
For two-way anisotropy, fit
$$
\Delta_{\text{tw}}(\beta_f,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_f)\cos(2m\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-419b78e91547d646)
and enforce
$$
\sup_{0\le \beta_f\le \beta_{\max}}|\mathcal{A}_{2m}(\beta_f)|\le C_m\epsilon_{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-32aa03e3cd8055b7)

#### Analytic derivation of kinematic closure coefficients

On the circular benchmark branch, take the rest-frame attractor $\boldsymbol{\rho}^\star(s;0)$ as a stable planar orbit of radius $r_0$ and frequency $\omega_0$. Phase symmetry $\phi\mapsto\phi+\text{const}$ supplies a neutral phase direction, but it does not by itself supply a conserved transverse action on a strictly attracting delayed orbit. For a near-integrable conservative oscillator one may define
$$
J=\oint \mathbf{p}_{\text{eff}}\cdot d\mathbf{r}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b8a4f8d548123c6)
and obtain $J_i\propto \sqrt{K_i}\,A_i^2$, so fixed action would imply
$$
A_i(\beta_f)=A_i(0)\left(\frac{K_i(0)}{K_i(\beta_f)}\right)^{1/4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d33414b67bf38206)
This is the $p=1/4$ comparison route, not an attractor theorem. Fixed energy instead gives $p=1/2$. For the admitted delay-Floquet branch, the valid route is to measure the settled amplitudes directly from $\boldsymbol\rho^\star(s;\beta_f)$ and extract
$$
p_i^{\mathrm{att}}(\beta_f)
\equiv
-\frac{d\ln A_i}{d\ln K_i}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d42ae667eeb261a6)
The constant-$p$ coefficient family in [Quadratic Closure and Coefficient Constraints](#quadratic-closure-and-coefficient-constraints) is usable only on a band where $p_\parallel^{\mathrm{att}}$ and $p_\perp^{\mathrm{att}}$ agree within the declared leakage tolerance.

The simplest scalar kernel is useful mainly because it fails in a controlled way. For translation $\mathbf V=v\hat{\mathbf e}_{\parallel}$ with primitive $\beta_f=v/c_f$, suppose one tries the causal-delay potential form
$$
\mathcal{U}_{\text{eff}}(\mathbf{r};\beta_f)
=
\frac{\kappa\,\epsilon^2}{r_{\text{cd}}\!\left(1-\boldsymbol{\beta}_f\cdot \hat{\mathbf{n}}_{\text{cd}}\right)}
\qquad
\boldsymbol{\beta}_f\equiv \frac{\mathbf V}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-efdb8c02fcae0f28)
Define stiffness by cycle-averaged Hessian evaluation on $\boldsymbol{\rho}^\star(s;\beta_f)$:
$$
K_{ab}(\beta_f)
=
\left\langle
\frac{\partial^2 \mathcal{U}_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fde0c6663ec33d84)
Naively expanding the causal-delay closure
$$
\Delta=\frac{\|\mathbf r+\mathbf V\Delta\|}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4dcb61d581ce4ea-2)
and projecting longitudinal/transverse channels would suggest integrals of the form
$$
\mathcal{I}_{\parallel}(\beta_f)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\cos^2\theta}{(1-\beta_f\cos\theta)^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-75b39e00fab954aa)
$$
\mathcal{I}_{\perp}(\beta_f)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\sin^2\theta}{(1-\beta_f\cos\theta)^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f5bacf33b9a0f428)
This naive block is not a derivation of a Lorentz-matching vector. With the displayed normalization it gives positive normalized stiffness growth in both channels, whereas every positive-$p$ member of the matched family requires $\ell_2<0$. Any sign reversal would require an additional channel normalization that is not present in the scalar kernel. The block is therefore a failure diagnostic: the target vector must come from the completed action kernel on the same causal-root ledger, with branch phase closure and the measured attractor-amplitude response included before the stiffness derivatives are taken.

The valid theorem target keeps the [Stiffness Tensor from Causal-Wake Surface Integrals](#stiffness-tensor-from-causal-wake-surface-integrals) extraction rules,
$$
k_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\parallel}(0)}
\quad
\ell_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1628aeba6a8bb5ef)
$$
k_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\parallel}(0)}
\quad
\ell_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2152503adc67f7d7)
but now requires the branch-action integrals $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ to be computed from the completed delayed action and the admitted moving branch chart. Conditional on a common constant amplitude exponent $p>0$, the Lorentz-matching closure condition is
$$
(k_2,\ell_2,k_4,\ell_4)
=
\left(
\frac{1/3-p}{p},
-\frac{p+1/6}{p},
\frac{1-3p}{18p^2},
\frac{6p+1}{72p^2}
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-74c7784c2fea13a5)
The target vector is not a fit parameter, but neither may $p$ be selected to rescue a failed kernel. A valid derivation must show that the completed action kernel, the causal-root ledger, branch phase closure, and evolved attractor response together yield both $p$ and the derivative identities above on the same branch.

#### Causal-root ledger progression as a Lorentz prediction

The coefficient calculation above suggests a sharper interpretation of the Lorentz closure problem. In standard observer physics, the Lorentz formulas are usually treated as kinematic consequences of invariant signal speed and the relativity principle. In this chapter they are instead treated as emergent observer-level consequences of a delayed assembly dynamics. The additional $\mathbb{A}\mathbb{A}\mathbb{A}$ prediction is that the Lorentz coefficients are not merely smooth deformation coefficients. They should be generated by the same branch-chart structure that later appears, after coarse-graining, as discrete quantum behavior.

The ordinary version is this: a clock or ruler does not obey Lorentz behavior because a formula has been assigned to it. It is a physical assembly with delayed causal roots, stable branch records, and Noether sea coupling. If Lorentz behavior is real in this architecture, the measured smooth law must be the exported average of those retained branch records, not a coordinate rule pasted onto the substrate afterward.

Stated more strongly, the novel claim is a branch-quantized Lorentz response. This does not mean that the algebraic function
$$
\gamma_\star(v)=\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9c3d3e888adb198e)
is replaced everywhere by a step function. It means that a physical clock or ruler can realize Lorentz behavior only through stable branch charts whose causal-root ledgers are integer objects. For a stable branch class $q$, define the realized clock and ruler Lorentz factors by
$$
\gamma_{\mathrm{clk}}^{(q)}(\beta_\star)\equiv \frac{P_q(\beta_\star)}{P_0}
\qquad
\gamma_{\mathrm{rul}}^{(q)}(\beta_\star)\equiv \frac{R_{\perp,q}(\beta_\star)}{R_{\parallel,q}(\beta_\star)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4d9b4fc71f0a7889)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

The branch-quantization claim is that the admissible material responses at fixed background conditions form the ledger-indexed set
$$
\Gamma_{\mathrm{adm}}(\beta_\star)
=
\left\{
\big(\gamma_{\mathrm{clk}}^{(q)}(\beta_\star),\gamma_{\mathrm{rul}}^{(q)}(\beta_\star)\big)
:
q\in\mathcal{Q}_{\mathrm{stable}}(\beta_\star)
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b153c702537b9b60)
where $\mathcal{Q}_{\mathrm{stable}}(\beta_\star)$ is the set of stable causal-root ledger classes. The observer-level Lorentz factor is recovered only when the active branch family, hierarchy averaging, and Noether sea dressing collapse this set to a universal effective value:
$$
\gamma_{\mathrm{clk}}^{(q)}(\beta_\star)
=
\gamma_{\mathrm{rul}}^{(q)}(\beta_\star)
=
\gamma_\star(\beta_\star)+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5f4164f133883d97)
for all admitted clock/ruler assemblies in the tested homogeneous regime. Thus $\gamma_\star$ remains the continuous effective envelope measured by Physical Observers, while the substrate implementation is quantized by admissible causal-root ledgers. If this is correct, residual deviations from exact Lorentz closure should carry branch-spectrum signatures rather than arbitrary smooth phenomenological drift.

In this chapter, the native formulation of this idea is the progression of the causal-root ledger. This progression is the ordered change, under a control parameter such as the group-speed ratio $\beta_f$, of the active causal-root ledger
$$
\mathcal{L}_{\mathrm{root}}(\beta_f)
=
\left\{
(a,b,m,T,T_{t,m},J_{ab}^{(m)},\sigma_{ab}^{(m)})
:
m\in\mathcal{R}^{\mathrm{act}}_{ab}(\beta_f)
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-589241dc03358be4)
Here $a$ is the receiver, $b$ is the source, $m$ labels an active delayed branch, $T_{t,m}$ is the emission time, $J_{ab}^{(m)}$ is the causal Jacobian, and $\sigma_{ab}^{(m)}$ records the interaction sign or channel orientation used by the local branch chart. The ledger is quantum-facing because stable assembly states depend on integer branch counts, separator events, and admissible self-hit / partner-hit histories. It is Lorentz-facing because the same roots determine the cycle-averaged stiffness tensor and clock period.

At a generic transverse transmitter-side fold, the two newborn roots have acceleration magnitude proportional to $|T-T_\ast|^{-1/2}$. This divergence is locally integrable: the impulse across a shrinking window tends to zero, velocity remains continuous, and position remains $C^1$. Any finite observable change comes from the newborn branch persisting after the fold, not from the singular instant. This statement does not cover tangential crossings, repeated fold accumulation, simultaneous collision singularities, nonunique ledger continuation, or a numerical method that samples the singular point directly.

> Claim grade: **derived local integrability** for a generic transverse positive-separation fold; no global continuation or branch claim follows.

The local prediction can be stated as a closure condition. There must exist one admissible branch-chart class $\mathfrak{B}_{\mathrm{mov}}(\beta_f)$ on a group-speed band $0\le\beta_f\le\beta_{\max}$ such that
$$
K_{ab}(\beta_f)
=
\left\langle
\sum_{(a,b,m)\in\mathcal{L}_{\mathrm{root}}(\beta_f)}
\partial_a\partial_b
\mathcal{U}_{ab}^{(m)}(T;\beta_f,\eta)
\right\rangle_{\mathrm{cyc}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d30eb932c239d1af)
and the extracted coefficient vector
$$
\mathbf{c}_{\mathrm{L}}(\mathfrak{B}_{\mathrm{mov}})
\equiv
(k_2,\ell_2,k_4,\ell_4)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b15aa622468d48d6)
satisfies the ansatz-conditional target
$$
\mathbf{c}_{\mathrm{L}}(\mathfrak{B}_{\mathrm{mov}})
=
\mathbf c_{\mathrm L}^{(p)}
+O(\epsilon_{\mathrm{br}}+\epsilon_{\mathrm{hier}}+\epsilon_{\mathrm{reg}}+\epsilon_p)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7cfe430a7722a05d)
where
$$
\mathbf c_{\mathrm L}^{(p)}
\equiv
\left(
\frac{1/3-p}{p},
-\frac{p+1/6}{p},
\frac{1-3p}{18p^2},
\frac{6p+1}{72p^2}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-66683edaf2a83368)
and the same evolved branch must supply the common exponent $p$. The error terms have distinct jobs. $\epsilon_{\mathrm{br}}$ measures branch-chart incompleteness or missed active roots, $\epsilon_{\mathrm{hier}}$ measures coincident-midpoint orthogonal-axis braid hierarchy leakage away from the binary benchmark, $\epsilon_{\mathrm{reg}}$ measures finite-$\eta$ regularization error, and $\epsilon_p$ measures uncertainty or longitudinal/transverse mismatch in the extracted attractor-amplitude exponent. This condition is stronger than fitting $L_{\parallel}=L_0/\gamma_f$ and $P(v)=\gamma_f P_0$. It says the fitted coefficients must be traceable to active causal roots with no independent Lorentz postulate and no per-observable retuning.

This gives a possible prediction of the framework. If Lorentz behavior is rooted in causal-root progression, then the first nonzero deviations from exact Lorentz closure should not be arbitrary smooth functions of speed. They should inherit the structure of branch charts: smooth even-power group velocity terms inside a fixed chart, plus localized or resonant leakage near separator events, small-divisor interlayer resonances, or changes in admissible root multiplicity. In a nonresonant chart the leakage should obey
$$
\left\|
\mathbf{c}_{\mathrm{L}}(\beta_f)
-
\mathbf c_{\mathrm L}^{(p)}
\right\|_W
\le
C_{\mathrm{br}}\epsilon_{\mathrm{br}}
+C_{\mathrm{hier}}\epsilon_{\mathrm{hier}}
+C_{\mathrm{reg}}\epsilon_{\mathrm{reg}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea04e9763216d8d6)
while near a chart-changing event the two-way anisotropy diagnostic should decompose into the ordinary Lorentz-canceling part plus a branch-sourced residual:
$$
\Delta_{\mathrm{tw}}(\beta_f,\theta)
=
\Delta_{\mathrm{tw}}^{\mathrm{smooth}}(\beta_f,\theta)
+
\sum_{r\in\mathcal{R}_{\mathrm{res}}}
B_r\,\mathcal{W}_r(\beta_f)\cos(2m_r\theta+\varphi_r)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e7a568db46bd2fd)
Here each residual label $r$ must correspond to a named branch-chart feature: a separator approach, a small-divisor relation between layer frequencies, a finite-memory cutoff, a Jacobian-floor loss, or a root-ledger transition. A residual with no branch-chart source is not a successful prediction; it is either ordinary fitting error or an incomplete closure model.

The technology-facing status is therefore conditional. The immediate test is not necessarily a laboratory Lorentz-violation search. The first test is mathematical and computational: solve a controlled translating branch chart, extract $\mathcal{L}_{\mathrm{root}}(\beta_f)$, compute $K_{\parallel}$, $K_{\perp}$, $P(v)$, and $\Delta_{\mathrm{tw}}$, and verify that the same ledger produces the Lorentz coefficients and any residual sidebands. Only after a nonzero residual survives branch completion, hierarchy averaging, and $\eta\to0$ control does the question become an experimental one. If the predicted residual amplitude lies below existing clock, resonator, matter-interferometer, or photon-channel sensitivity, the theory remains constrained but not yet technology-testable. If a branch-sourced residual survives at an accessible scale, its signature should be more specific than a generic Lorentz-violation coefficient: it should carry the speed, orientation, material-channel, or medium-density dependence of the responsible branch-chart feature.

This also prevents overclaiming. This chapter does not prove that quantum mechanics causes special relativity. It states a narrower closure target: in $\mathbb{A}\mathbb{A}\mathbb{A}$, the discrete causal-root progression that supports quantum-facing assembly behavior must also generate the Lorentz formulas in the homogeneous weak-field observer limit. If the branch ledger produces quantum-like discreteness but fails to produce the Lorentz coefficient vector, then the proposed common mechanism fails. If it produces the Lorentz vector only by tuning a separate clock law, ruler law, or photon speed for each observable, the Lorentz bridge also fails.

#### Coincident-Midpoint Orthogonal-Axis Braid Adiabatic Decoupling Bound

Conditional lemma target: this bound assumes the Theorem A translating attractor exists and the nonresonance condition holds; the averaging computation below is an open obligation, not a completed proof.

Let
$$
\mathbf{c}^{(2)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\text{binary}}
\qquad
\mathbf{c}^{(3)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\mathrm{cm}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9259e10c5c1f9b38)
and define
$$
\mathcal{D}_{23}\equiv
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_W
\qquad
\|x\|_W^2\equiv x^\top W x,\ W\succ 0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3d4a190126c83c89)
For the source record's indexed rows $(1,2,3)$, decompose the binary-3 channel stiffness in the coupled coincident-midpoint orthogonal-axis braid system into its isolated binary contribution plus cross-binary corrections:
$$
K_{ab}^{(3),\mathrm{cm}}
=
K_{ab}^{(3),\mathrm{bin}}
+
\left\langle \frac{\partial^2\mathcal{U}_{3\leftrightarrow 2}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
+
\left\langle \frac{\partial^2\mathcal{U}_{3\leftrightarrow 1}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9bed17aa1348f5e3)
Under hierarchical separation
$$
\omega_1\gg \omega_2\gg \omega_3\qquad
r_1\ll r_2\ll r_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-17e4d6cb2a6bd9dd)
apply Hamiltonian averaging (Lie-Deprit transform) to eliminate fast phases. The monopole part renormalizes $\mathcal{I}_0$ only; the dipole contribution vanishes in the binary-1 center-of-mass frame; the leading anisotropic correction is quadrupolar and scales as $(r_2/r_3)^2$. This hierarchy is a declared source-record ordering, not a meaning of the persistent indices. Therefore
$$
\mathcal{D}_{23}
\le
C_Q\left(\frac{r_2}{r_3}\right)^2
+O\!\left(\left(\frac{r_1}{r_3}\right)^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-30aeca24081a0d32)
A sufficient closure condition is
$$
\left(\frac{r_2}{r_3}\right)^2\le C_{23}\epsilon_{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3c75e045779d86b3)
which yields
$$
\mathcal{D}_{23}\le C_{23}\epsilon_{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6e401508c72734b3)

#### Spectral-decoupling vulnerability criterion

The [coincident-midpoint orthogonal-axis braid adiabatic decoupling bound](#coincident-midpoint-orthogonal-axis-braid-adiabatic-decoupling-bound) assumes Diophantine nonresonance:
$$
|m\omega_3-n\omega_2|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\quad
\forall\,m,n\in\mathbb{Z}\setminus\{0\}
\qquad
\gamma_D>0,\ \tau_D>1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2ba2631d1d764d51)
If this condition is violated so that
$$
|m\omega_3-n\omega_2|\lesssim \delta\omega_{\text{nl}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-da4cd1c48113cab9)
for small integers $(m,n)$ and nonlinear coupling width $\delta\omega_{\text{nl}}$, then small divisors invalidate the homological equations of the Lie transform. The resulting secular resonance destroys adiabatic decoupling, can break KAM tori, and drives $O(1)$ interlayer energy exchange. In that regime, coefficient drift can exceed the quadrupole estimate and local preferred-frame leakage can rise above $O(\epsilon_{\text{LV}})$ even when geometric hierarchy is large.

### Theorem Targets

#### Theorem A0 (forward partner-root speed-limit lemma)

The primitive material speed-limit row has a kinematic upper-bound lemma before any detailed Noether braid deformation is solved. In a translating branch with constant group velocity $u\hat{\mathbf e}$, a retained partner row whose receiver lies ahead of its source by positive co-moving separation $d_{\parallel}\ge d_{\min}>0$ must satisfy
$$
c_f\Delta
=
\left\|
u\Delta\,\hat{\mathbf e}
+
\boldsymbol{\rho}_i(T)-\boldsymbol{\rho}_j(T-\Delta)
\right\|
\ge
u\Delta+d_{\min}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-33cbe02891c943aa)
and therefore
$$
\left(c_f-u\right)\Delta\ge d_{\min}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-48014b079bd07587)
No such forward partner root exists for $u\ge c_f$; for $u<c_f$ its required delay is at least $d_{\min}/(c_f-u)$. Thus a bound translating assembly whose structural closure requires leading-side partner rows cannot preserve its causal-root ledger at or above primitive field speed. This proves the upper-bound side
$$
c_{\mathrm{mat}}^{\mathrm{lim}}\le c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76656ebe144c1e28)
for that class of material branches. The remaining Lorentz program is the constructive side: proving that stable branch families exist for $u<c_f$, that their deformation and periods approach the common envelope, and that Noether sea dressing maps the primitive bound to the observer-channel speeds without an independent fit.

#### Theorem LK1 (translating binary Lorentz residual)

The first constructive test of Theorem G is the translating maximum-curvature binary benchmark defined in [Translating Binary Benchmark](#translating-binary-benchmark). Start from the declared reference rest binary (certificate packet pending; see the closure-packet contract in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md)) with radius $R_0$, period $P_0$, active root ledger $b_0$, positive Jacobian floors, and bounded transmitter-side acceleration weights. For each $0<u<c_f$, solve the absolute-time delayed root equations for
$$
\mathbf X_{\sigma}(T)
=
u T\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(T))
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3aedcf8c510a9ac9)
on a retained deformed ledger $b_u$. The target is not merely existence. The branch must return the residual triple
$$
\mathcal{R}_{\mathrm{bin}}(u)
=
\left(
R_T^{\mathrm{bin}}(u),
R_{\xi}^{\mathrm{bin}}(u),
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8d48e7a7fa338629)
with either
$$
\mathcal{R}_{\mathrm{bin}}(u)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e1a119b666989832)
on the primitive branch, or a controlled residual whose source is a named causal-root feature: a branch transition, small Jacobian floor, finite-memory cutoff, shape-mode excitation, or Noether sea dressing row.

This calculation decides whether the first available internal clock and ruler obey primitive FitzGerald contraction and clock dilation:
$$
\frac{L_{\parallel}(u)}{L_{\perp}(u)}
=
\frac{1}{\gamma_f(u)},
\qquad
\frac{P_u}{P_0}
=
\gamma_f(u),
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dbf617e413a705ad)

Here $P_u$ is the cycle period of the translating binary at group speed $u$.

If these equalities hold on the same branch ledger, the Lorentzian compensation has been derived for the two-body clock rather than asserted. If they fail, the residual is the earliest foundation-level falsification pressure: it marks exactly where the primitive kernel departs from Lorentzian matter behavior before Noether braid averaging or Noether sea dressing is allowed to repair anything.

#### Theorem A (attractor existence at constant group velocity)

Target (unproved). For admissible coupling and regularization parameters, there exists a bounded translating attractor family for binary and coincident-midpoint orthogonal-axis braid systems for $\|\mathbf V\|<c_f$.

#### Theorem B (anisotropic deformation law)

Target (unproved). Let $\beta_\star=v/c_\star$ and $\gamma_\star=(1-\beta_\star^2)^{-1/2}$ for the declared observer channel.

On the attracting manifold, principal-axis deformation obeys
$$
\frac{a_{\parallel}}{a_{\perp}}
=1-\frac{1}{2}\beta_\star^2-\frac{1}{8}\beta_\star^4+R_1(\beta_\star)
\qquad
|R_1(\beta_\star)|\le C_1\epsilon_{\text{LV}}\,\beta_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3ae71bba080763f6)
equivalently
$$
\frac{a_{\parallel}}{a_{\perp}}=\frac{1}{\gamma_\star}+R_1(\beta_\star)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-433717c211e9e89a)

#### Theorem C (clock renormalization law)

Target (unproved). Fundamental period satisfies
$$
\frac{P(v)}{P_0}
=1+\frac{1}{2}\beta_\star^2+\frac{3}{8}\beta_\star^4+R_2(\beta_\star)
\qquad
|R_2(\beta_\star)|\le C_2\epsilon_{\text{LV}}\,\beta_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b9c0d5d143d9027)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

equivalently
$$
\frac{P(v)}{P_0}=\gamma_\star+R_2(\beta_\star)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d3450fe89526f848)

#### Theorem D (operational Lorentz closure)

Target (unproved). For composite observers formed from this assembly class, two-way kinematic observables satisfy
$$
\Delta_{\text{tw}}(\beta_\star,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_\star)\cos(2m\theta)
\qquad
|\mathcal{A}_{2m}(\beta_\star)|\le C_m\epsilon_{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2b8f974b3a0eaaf6)
uniformly on $0\le\beta_\star\le\beta_{\max}$.

#### Theorem E (coefficient identifiability from attractor statistics)

For the constant-$p$ response family with $p\ne0$, write the measured expansions as
$$
\frac{a_\parallel}{a_\perp}
=1+\alpha_2\beta_f^2+\alpha_4\beta_f^4+O(\beta_f^6),
\qquad
\frac{P}{P_0}
=1+\tau_2\beta_f^2+\tau_4\beta_f^4+O(\beta_f^6).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-367847d668776ced)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

The coefficient map
$$
(k_2,\ell_2,k_4,\ell_4)\mapsto (\alpha_2,\alpha_4,\tau_2,\tau_4)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88db047b3f8ad4bd)
has block-triangular Jacobian with
$$
\det
\frac{\partial(\alpha_2,\alpha_4,\tau_2,\tau_4)}
{\partial(k_2,\ell_2,k_4,\ell_4)}
=-\frac{p^2}{4}\ne0.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99407662aca6606e)
The inverse-function theorem therefore gives local identifiability of the four stiffness coefficients from shape and period data, up to the leakage scale $O(\epsilon_{\text{LV}})$, once $p$ has been independently extracted from the same attractor family. This is a proved algebraic property of the ansatz, not proof that a physical moving branch exists or that its amplitude response has constant $p$.

#### Theorem F (cross-regime universality of closure coefficients)

If binary and coincident-midpoint orthogonal-axis braid attracting branches exist, are smooth in $\beta_f$, share the same coarse-grained causal kernel class, and satisfy nonresonant hierarchy
$$
\omega_1\gg \omega_2\gg \omega_3\qquad
|m\omega_3-n\omega_2|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\ \ \forall\ m,n\in\mathbb{Z}\setminus\{0\}
\qquad
\gamma_D>0,\ \tau_D>1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e7ac812a1ca531cb)
then their extracted closure vectors satisfy
$$
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_{W}
\le
C_Q\left(\frac{r_2}{r_3}\right)^2
+O\!\left(\left(\frac{r_1}{r_3}\right)^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2b1d71a4806dde72)
In particular, if $(r_2/r_3)^2\le C_{23}\epsilon_{\text{LV}}$, operational Lorentz closure is universal across these two micro-regimes up to preferred-frame leakage.

#### Theorem G (structural-integrity common-limit closure)

This theorem is the parent Lorentz-closure target for Theorems B-D, the photon synchronization row, and the weak-field gravitational-wave speed row. Theorem A0 supplies the primitive kinematic obstruction: a material branch that needs forward partner-hit closure cannot have a sustained translating ledger with $c_{\mathrm{mat}}^{\mathrm{lim}}>c_f$. Theorem LK1 supplies the first constructive clock/ruler decision surface by asking whether the translating two-body branch returns $R_T^{\mathrm{bin}}=0$ and $R_{\xi}^{\mathrm{bin}}=0$ before Noether braid averaging or Noether sea dressing is invoked. In the weak homogeneous observer branch, a retained material assembly branch closes only if the matter-assembly limiting speed, the Noether sea dressed clock/ruler speed, the photon-channel speed, and the empirical calibration speed obey
$$
c_{\mathrm{mat}}^{\mathrm{lim}}
=
c_{\text{eff}}
=
c_\gamma
=
c_0
+O(\epsilon_{\text{LV}}c_0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3e0abb9122cce02b)
on the same causal-root ledger. The same branch record must then supply the longitudinal deformation $a_\parallel/a_\perp=\gamma_0^{-1}+O(\epsilon_{\text{LV}})$, clock cadence $d\tau/dt_{\mathrm{eff}}=\gamma_0^{-1}+O(\epsilon_{\text{LV}})$, two-way signal residual $\Delta_{\text{tw}}=O(\epsilon_{\text{LV}})$, and the gravitational-wave speed residual $|c_{\mathrm{GW}}/c_\gamma-1|\le\epsilon_{\mathrm{GW}}$ in the weak-field TT channel. Closure fails if the photon speed, gravitational-wave speed, material limiting speed, or deformation coefficients require independently fitted dressing records.

### Observable Interface

Key outputs to pass into validation and simulation layers:

1. Predicted anisotropy harmonics for resonator-style tests.
2. Velocity-dependent clock shift coefficients beyond leading $\gamma_\star$ term.
3. Orientation-dependent residuals in two-way propagation observables.
4. Parameter surfaces where leakage remains below target bounds.
5. Branch-sourced residual labels linking any nonzero $\Delta_{\text{tw}}$ sideband, clock residual, or shape residual to a specific causal-root ledger feature rather than to a free phenomenological coefficient.

### Failure Conditions

The Lorentzian conspiracy program fails if any of the following occur:

1. No stable translating attractor exists over physically relevant group-speed range.
2. Required contraction or period scaling appears only by fine tuning.
3. Residual anisotropy terms exceed accepted bounds after full observer construction.
4. Different assembly decorations produce incompatible kinematic laws that prevent universal operational closure.
5. The weak-field connection built from $g_{\mu\nu}^{\text{eff}}$ fails to reproduce a Newtonian Poisson limit for $\Phi_{\text{eff}}$ in the operational observer sector.
6. Diophantine nonresonance fails (small-divisor regime), causing secular interbinary resonance and invalidating the adiabatic mismatch bound used in [coincident-midpoint orthogonal-axis braid adiabatic decoupling bound](#coincident-midpoint-orthogonal-axis-braid-adiabatic-decoupling-bound).
7. The extracted Lorentz coefficients cannot be traced to the causal-root ledger on a completed branch chart, or the same ledger cannot generate clock, ruler, and two-way signal closure without separate per-observable tuning.

### Position in the $\mathbb{A}\mathbb{A}\mathbb{A}$ Program

This priority is the first gate because it constrains all downstream bridges:

1. Without kinematic closure, emergent metric claims are underdetermined.
2. Without universal assembly clock behavior, phenomenological mapping to GR tests is unstable.
3. With kinematic closure established, metric constitutive derivations and PPN matching become sharply posed problems.

### Canonical Dependencies

Primary theory anchors:

1. [dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md)
2. [dynamics/causal-action-functional.md](../../../../markdown/aaa/dynamics/causal-action-functional.md)
3. [dynamics/binary-dynamics.md](../../../../markdown/aaa/dynamics/binary-dynamics.md)
4. [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation)
5. `spacetime/*`
6. [validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)
7. [validation/no-go-theorems.md](../../../../markdown/aaa/validation/no-go-theorems.md)

## Emergent Metric

This chapter explains how metric language enters a theory whose substrate is not metric spacetime. The Euclidean void remains fixed. The Noether sea changes state inside it. The effective metric is the observer-level description extracted from clock, ruler, signal, and medium-response channels. This chapter says what that metric means, which medium variables are supposed to carry it, and what weak-field map has to be recovered before the spacetime branch can claim GR-level closure.

The opening fixes the ontological picture and the canonical symbols first. The later sections then move through equation-of-state support, refraction-versus-curvature language, weak-field constitutive maps, and closure interfaces.

The one-line map is: Noether sea record to clock, ruler, signal, and drift response; those responses to an effective metric; that effective metric to GR benchmark observables. Each arrow has to be earned. A metric that fits only one channel is not yet a spacetime recovery, because Physical Observers need one coherent effective geometry across clocks, photons, matter motion, and gravitational-wave channels.

### Absolute Frame vs. Effective Geometry

The spacetime branch keeps two descriptions separate. The absolute frame is the fixed bookkeeping structure of absolute time and Euclidean position; it supplies the substrate coordinates in which architrino path histories and Noether sea state are recorded. Effective geometry is the observer-level metric reconstructed from clocks, rulers, signal propagation, and medium response.

The bridge is therefore constitutive rather than ontological. A successful metric map must explain how the same Noether sea record produces lapse, spatial-compliance, drift, and signal-delay channels without treating the Euclidean void itself as curved.

### Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $T$. A chosen chart $(X,Y,Z)$ represents fixed void locations; the labels never move or curve.
- **Noether sea**: The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), a pervasive population of coupled pro/anti Noether braids. The bridge term *spacetime medium* is used when translating toward effective spacetime language.
- **$\mathbb{U}_{\text{now}}$ universe-state perspective**: Complete-state bookkeeping on the absolute-time slice, carrying:
  - The full architrino microstate $S(T)$,
  - The instantaneous state of the Noether sea (density $\rho_{\text{NS}}(\mathbf X,T)$, alignment, stress),
  - The derivable effective potential field $\Phi_{\text{eff}}(\mathbf X,T)$ and its gradients.

From this bookkeeping perspective, there is only:
- Flat Euclidean geometry $h_{ij}=\delta_{ij}$,
- A dynamic medium (Noether braids) moving and rearranging in that geometry.

The metric appears only after a Physical Observer record is assembled from those ingredients.

### Canonical Symbols (Spacetime)

Use the following symbols consistently across spacetime chapters:

- $n(\mathbf X,T)$: normalized Noether braid density.
- $\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)$: physical Noether braid density.
- $\chi_{\text{sea}}(\mathbf X,T)=c_f/c_{\text{eff}}(\mathbf X,T)$: Noether sea delay factor.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field metric comparisons.
- $\Phi_{\text{eff}}(\mathbf X,T)$: constitutive potential inferred from the clock channel.
- $\Phi_N(\mathbf X,T)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.
- $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: observer-level lapse or clock-rate field reconstructed from Noether sea state.
- $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: Noether sea drift field in the observer-level bookkeeping map.
- $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: spatial frame field carrying Noether sea compliance and orientation response.
- $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\delta_{ab}e^a{}_i e^b{}_j$: observer-level spatial compliance metric.
- $(\gamma_{\mathrm{eff}}^{-1})^{ij}$: inverse of the spatial compliance metric, defined by $(\gamma_{\mathrm{eff}}^{-1})^{ik}\gamma_{kj}^{\mathrm{eff}}=\delta^i{}_j$.

### What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How photon-channel packets and gravitational-wave channels propagate through the Noether sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each effective-chart point $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, choose an idealized Physical Observer (Noether braid clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

The $\mathbb{U}_{\text{now}}$ universe-state perspective then maps substrate and medium data into observer-level ADM/Cartan fields:

$$
\big(h_{ij}, n, \chi_{\text{sea}}, \Phi_{\text{eff}}, \nabla\Phi_{\text{eff}}, \text{stress}, \text{alignment}\big)
\;\Rightarrow\;
\big(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}}\big)
\;\Rightarrow\;
g^{\text{eff}}_{\mu\nu}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-076993b73a4321c2)

The first arrow is the open constitutive problem. It carries the main closure burden: the Noether sea state must produce the clock, ruler, drift, and signal channels together. In observer-record language, this map is the $\Pi_{\mathrm{ADM}}$ projection consumed after it has been built from the shared record; listing $\Phi_{\text{eff}}$ and $\chi_{\text{sea}}$ on the first arrow marks intermediate constitutive fields, not independently fitted inputs. The second arrow is the observer-level metric assembly; it does not curve the Euclidean void.

#### Weak-Gravity Visibility Scale

For weak effective-metric recovery, the useful small parameter is not the material temperature measured against the Planck temperature. It is the dimensionless effective potential, together with the density-length scale that sources that potential. For a roughly uniform ordinary-matter body of characteristic size $L$ and standard-matter density $\rho_{\mathrm{mat}}$, the Newtonian comparison estimate is

$$
\epsilon_{\Phi}
\equiv
\frac{|\Phi_{\text{eff}}|}{c_0^2}
\sim
\frac{4\pi G_{\mathrm{eff}}\rho_{\mathrm{mat}}L^2}{3c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5396b604ccb5c746)

Thus ordinary density can be weakly visible to clocks and signal paths when it is integrated over planetary or stellar length scales, while meter-scale laboratory samples require much higher density or precision. The Earth core is thermally cold on a Planck-temperature comparison, but that fact is not the limiting variable for weak gravity. Its contribution to observer-level metric response comes from the rest-energy, pressure, stress, and exposed assembly ledger distributed over a large body, projected through the same Noether sea response map that supplies $\Phi_{\text{eff}}$, $\Gamma_N$, and $\chi_{\text{sea}}$.

A spherical-source sanity check keeps this point from collapsing into a temperature-gradient story. A hot or strongly excited medium region can have maximum scalar excitation near its center while the effective gravitational acceleration vanishes there by symmetry:
$$
\mathbf{a}_{\mathrm{eff}}(\mathbf{0})
=-\nabla\Phi_{\text{eff}}(\mathbf{0})
=\mathbf{0}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-61834399155d385e)
The constitutive variable that sources $\Phi_{\text{eff}}$ may therefore be an energy, stress, or RMS excitation record, but the force-like observer readout still comes from the spatial gradient of the shared effective potential. A model that equates gravity directly with "more temperature" fails this center-gradient check even before PPN coefficients are tested.

#### Alternating-Flux Constitutive Candidate

One candidate route from assembly wakes to weak gravity is an RMS excitation law. If local causal-wake hits alternate in sign, direction, or branch provenance, the mean signed acceleration can cancel while the quadratic excitation of the Noether sea remains:
$$
\Phi_{\mathrm{eff}}^\theta(\mathbf X,T)
\propto
\mathcal{K}_{\mathrm{sea}}
\left\langle
\left(\sum_s q_s A_s(\mathbf X,T)\right)^2
\right\rangle_{\Delta T}^{1/2}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-28ee266019bf0cc0)
Here $\theta$ labels the shared candidate record being tested, $A_s$ denotes the branch-resolved wake amplitude from source segment $s$ — defined on the same retained causal root as the branch law and carrying the same-record transmitter-side acceleration weight and inverse-square factor $W^{\mathrm{acc}}_s/r_s^2$, not a bare $1/r$ or root-independent amplitude — and $\mathcal{K}_{\mathrm{sea}}$ is a constitutive response coefficient to be derived, not fitted independently. The route is useful only if the same averaged excitation also supplies the lapse, spatial-compliance, lensing, Shapiro, and PPN rows.

Because the RMS factor is non-negative, the attractive weak-field branch requires a declared negative sign: $\mathcal K_{\mathrm{sea}}<0$ in the convention $\Phi_{\mathrm{eff}}=c_0^2\ln N<0$ near an ordinary mass source. Increasing the shared RMS excitation must then make $\Phi_{\mathrm{eff}}$ more negative monotonically on that branch. Without this sign and monotonicity condition, the candidate does not determine even the direction of the recovered weak-field acceleration.

### ADM/Cartan Reconstruction Surface

This chapter owns the ADM/Cartan reconstruction surface consumed by the observer-record map in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold) and by neighboring dynamics chapters. The observer-level line element target is

$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../../equation-mapping.html#effective-metric-adm-cartan)

Here $N$ is the clock-rate or lapse channel, $u^i_{\mathrm{sea,eff}}$ is medium drift, and $\gamma_{ij}^{\mathrm{eff}}$ is the spatial compliance channel built from the frame field $e^a{}_i$. In the GR-matching regime the effective connection is the Levi-Civita connection of $g^{\text{eff}}_{\mu\nu}$; torsion, nonmetricity, birefringence, dispersion, and preferred-frame leakage are deviation observables rather than substrate ontology.

This form is the common handoff surface for clock redshift, Shapiro delay, lensing, geodesic motion, photon synchronization, and preferred-frame tests. A scalar speed map alone is therefore not enough for closure: it can support a first Shapiro-delay intuition, but the full PPN burden requires the lapse, drift, and spatial-compliance channels together.

The same handoff can be written as a local clock-and-signal quadratic form,
$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt_{\mathrm{eff}}^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4fc11cc78bbfa139)
with $A$, $B_{ij}$, and $u^i_{\mathrm{sea,eff}}$ read from the same retained Noether sea state and Physical Observer record. In the local Noether sea rest frame, the photon-channel null condition $d\tau^2=0$ gives
$$
c_\gamma(\hat{\mathbf{k}},\mathcal{N}_{\mathrm{sea}})
=
\frac{
c_0A(\mathcal{N}_{\mathrm{sea}})
}{
\sqrt{
B_{ij}(\mathcal{N}_{\mathrm{sea}})\hat k^i\hat k^j
}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6e00dbc328030441)
The weak homogeneous observer branch requires
$$
A\to1,
\qquad
B_{ij}\to\delta_{ij},
\qquad
u^i_{\mathrm{sea,eff}}\to0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a560a0adc81e6f64)
This is a constitutive equation, not a new fundamental four-dimensional metric on absolute timespace. Every weak-field expansion about this branch is additionally conditional on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics; that equilibrium predicate is an open closure item of the [Noether sea program](../../../../markdown/aaa/spacetime/noether-sea.md), and the expansions below inherit it rather than establish it.

As a form-level recovery, the same handoff already has the correct weak-field clock shape once the clock-channel potential has been matched to the Newtonian benchmark. In a weak, slow comparison window,
$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
\approx
1-\frac{U}{c_0^2}
-\frac{\|\mathbf w\|^2}{2c_0^2},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-686bee199bdbc652)
where $U\ge0$ is the positive Newtonian potential declared above and $\mathbf w$ is the clock group velocity through the local Noether sea. This reproduces the Newtonian-limit clock relation and the standard $g_{00}$ first-order structure as a comparison form. It is not yet coefficient-level GR closure: $\Phi_{\mathrm{eff}}=\Phi_N$, $G_{\mathrm{eff}}$, and any Einstein-equation analogue must still be derived from the same Noether sea response record that supplies $A$, $B_{ij}$, $c_{\text{eff}}$, and the photon channel.

The retained weak-field coefficient map should therefore be expressed at the ADM/Cartan level before observable projections are evaluated. With
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3998b52bba7dc3d0)
and with $\Sigma^{\mathrm{tf}}_{\text{sea},ij}$ the retained trace-free Noether sea stress projection, the minimal coefficient scaffold is
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\Sigma_{\text{sea}}^{\mathrm{tf}})
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2167007e26378c1d)
$$
\gamma_{ij}^{\mathrm{eff}}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\Sigma^{\mathrm{tf}}_{\text{sea},ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36fc405532a4696e)
$$
u^i_{\mathrm{sea,eff}}
=
D_U w^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w^j\frac{U^i{}_j}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}),
\qquad
\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_i e^b{}_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b8321393ecb536b5)
Here $w^i$ is the Noether sea drift relative to the comparison frame, $D_U$ and $D_{\mathrm{aniso}}$ are the isotropic and anisotropic drift-response coefficients, $U$ is the positive PPN potential, and $U^i{}_j$ is its standard anisotropic potential tensor. These are not new substrate fields. They are coefficient rows for the observer-level reconstruction. Redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals must read from these rows as one shared constitutive record. The coefficient dictionary to $(\gamma_{\mathrm{PPN}},C_2^{(U)},\Xi_1,\ldots,\Xi_4)$ is given in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#admcartan-extraction-equations).

A practical consistency check is that those channels must be projections of one shared record of the Noether sea and the Physical Observer, not independently tuned descriptions. For an observation window $W$, let $\theta$ collect the retained Noether sea state, source assemblies, observer clock/ruler state, signal-channel record, apparatus calibration, and boundary wake data. Let
$$
\Pi_{\mathrm{clk}}\theta,\qquad
\Pi_{\mathrm{rul}}\theta,\qquad
\Pi_{\mathrm{sig}}\theta
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aae5b2ebd004d717)
denote the clock, ruler, and signal projections of that same record. Let $\mathcal{B}_{\mathrm{eff}}$ be the benchmark bundle returned by the candidate effective-metric map from those projections, and let $\mathcal{B}_{\mathrm{GR}}^{W}$ denote the GR/PPN benchmark bundle on $W$ for redshift, Shapiro delay, lensing, precession, two-way signal speed, and preferred-frame bounds. A compact metric-recovery residual is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)
=
\left\|
\mathcal{B}_{\mathrm{eff}}
\big(
\Pi_{\mathrm{clk}}\theta,
\Pi_{\mathrm{rul}}\theta,
\Pi_{\mathrm{sig}}\theta
\big)
-
\mathcal{B}_{\mathrm{GR}}^{W}
\right\|_{\Sigma_W^{-1}}
+
\lambda_{\mathrm{PF}}\sum_{i=1}^{3}\alpha_i(\theta)^2
+
\lambda_{\mathrm{retune}}\mathcal{S}_{\mathrm{retune}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e4e8cdc584bd10dc)
Here $\Sigma_W$ is the declared benchmark covariance, $\alpha_i$ are the preferred-frame parameters, and $\mathcal{S}_{\mathrm{retune}}(\theta)$ records whether separate parameter choices were used to pass different channels. The closure condition is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)\le\epsilon_{\mathrm{metric}},
\qquad
\mathcal{S}_{\mathrm{retune}}(\theta)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dc56bc079251de78)
The point is not to add a new spacetime ontology. It is to require the effective metric to behave as one constitutive summary of the same Noether sea state and observer record across clocks, rulers, signal propagation, and weak-field gravitational tests.

#### Geodesic and Lensing Recovery Benchmarks

The effective metric map must also recover the two standard variational benchmarks consumed by orbital, clock, and light-propagation tests. For timelike records,
$$
S_{\mathrm{clk}}
=
-m c_0^2
\int d\tau,
\qquad
d\tau
=
\frac{1}{c_0}
\sqrt{-g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu}
$$

[View →](../../../../../equation-mapping.html#geodesic-proper-time-action)

and extremizing this observer-level action must give the same weak-field acceleration contribution used in the PPN bundle,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=
-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O(c_0^{-2})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a35d6c93159ee4b3)
For null signal records,
$$
g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu=0
$$

[View →](../../../../../equation-mapping.html#photon-null-eikonal)

must match the eikonal path-time extremal of the Noether sea signal channel. In the point-mass weak-field limit, the recovered deflection target is
$$
\Delta\theta
=
2(1+\gamma_{\mathrm{PPN}})
\frac{GM}{b\,c_0^2}
+O(c_0^{-4})
$$

[View →](../../../../../equation-mapping.html#shapiro-lensing-ppn)

so the GR limit $\gamma_{\mathrm{PPN}}=1$ gives $\Delta\theta=4GM/(b\,c_0^2)$. A lapse-only or scalar-delay-only map that supplies only $2GM/(b\,c_0^2)$ has recovered the Newtonian half-test, not the full effective metric. This is why the ADM/Cartan map must carry both the clock/lapse channel and the spatial-compliance channel.

#### Lensing-Dynamics Equality Constraint

Hybrid dark-sector comparisons sharpen the metric burden: a modified force law that changes baryonic dynamics must also give the correct lensing potential, or the inferred dynamical mass and lensing mass will disagree. In weak-field comparison language, write the effective metric potentials as

$$
ds_{\mathrm{eff}}^2
=
-\left(1+\frac{2\Phi_{\mathrm{dyn}}}{c_0^2}\right)c_0^2dt_{\mathrm{eff}}^2
+
\left(1-\frac{2\Psi_{\mathrm{sp}}}{c_0^2}\right)h_{ij}dx_{\mathrm{eff}}^i dx_{\mathrm{eff}}^j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-93c0079533adc34e)

Massive slow probes read the dynamical potential $\Phi_{\mathrm{dyn}}$, while weak lensing reads the Weyl combination

$$
\Phi_{\mathrm{lens}}
=
\frac{\Phi_{\mathrm{dyn}}+\Psi_{\mathrm{sp}}}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1065484b1bf719c3)

The equality target is therefore

$$
\Phi_{\mathrm{lens}}
=
\Phi_{\mathrm{dyn}}
+O(\epsilon_{\mathrm{lens}}),
\qquad
\Psi_{\mathrm{sp}}-\Phi_{\mathrm{dyn}}
=
O(\epsilon_{\mathrm{lens}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-26f4bcea5c297eff)

equivalently $\gamma_{\mathrm{PPN}}\equiv\Psi_{\mathrm{sp}}/\Phi_{\mathrm{dyn}}\to1$ in the weak-field lensing regime. A scalar force or medium-response correction that appears only in the clock/lapse channel accelerates matter but under-deflects light. A valid $\mathbb{A}\mathbb{A}\mathbb{A}$ response must project the same Noether sea state into the lapse and spatial-compliance channels so that rotation curves, hydrostatic mass, time delay, and lensing consume one effective metric.

For a window $W$, add the lensing-dynamics residual

$$
\mathcal{R}_{\mathrm{lens=dyn}}(\theta;W)
=
\left\|
\nabla\Phi_{\mathrm{dyn}}^\theta
-
\nabla\Phi_{\mathrm{dyn}}^{\mathrm{obs}}
\right\|_{C_{\mathrm{dyn}}^{-1}}^2
+
\left\|
\nabla\Phi_{\mathrm{lens}}^\theta
-
\nabla\Phi_{\mathrm{lens}}^{\mathrm{obs}}
\right\|_{C_{\mathrm{lens}}^{-1}}^2
+
\lambda_\gamma
\left\|
\gamma_{\mathrm{PPN}}^\theta-1
\right\|_W^2
+
\lambda_{\mathrm{shared}}\mathcal{S}_{\mathrm{retune}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ab2a6181d314c2da)

This residual belongs to the effective-metric closure program, not to dark-sector ontology by itself. It is the condition that lets a medium-response explanation of galaxy or cluster dynamics remain compatible with the same lensing map.

#### Matter-Channel Compatibility Target

The same shared-record rule applies to the effective matter channels whose observations test the metric. The retained comparison lesson from matter-first gravity programs is not that their ontology should be imported, but that predictive matter dynamics and observer-level geometry cannot be chosen independently. In this framework, the matter channel, clock channel, ruler channel, and signal channel must remain projections of the same Noether sea record $\theta$.

For the signal-carrying channels used in metric reconstruction, let $\operatorname{Char}_r(\theta)$ denote the observer-level characteristic surface family extracted from channel $r$, and let $\operatorname{Null}(g^{\text{eff}}_{\mu\nu}(\theta))$ denote the null surface family of the reconstructed effective metric. A compact compatibility residual is
$$
\mathcal{R}_{\mathrm{char}}(\theta)
=
\sup_{r\in\mathfrak{R}_{\mathrm{sig}}}
\left[
d_{\mathrm{cone}}
\left(
\operatorname{Char}_r(\theta),
\operatorname{Null}(g^{\text{eff}}_{\mu\nu}(\theta))
\right)
+
\lambda_{\mathrm{C}}
\mathcal{R}_{\mathrm{Cauchy}}^{(r)}(\theta)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-34c260c43d4c592a)
where $\mathcal{R}_{\mathrm{Cauchy}}^{(r)}$ records failure of the declared channel to share the predictive Cauchy evolution used by the same observer-level metric record. In the validated weak homogeneous photon regime, this residual includes the requirement that the two physical polarization branches share the same free-space characteristic cone up to the birefringence tolerance routed through [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md#operational-null-result-ledger).

This remains a closure target rather than substrate ontology. If $\mathcal{R}_{\mathrm{char}}$ is small only because the photon, clock, ruler, or stress channels use different fitted records, the metric has not been recovered as a constitutive output of the Noether sea.

For fermion matter channels, the compatibility burden inherits the spinor ledger. The effective metric may summarize the matter channel only after the ordered-frame spinor target, the effective spin-operator record, and weak-coupling-triad exposure are supplied by the same branch record. In compact form,
$$
\mathcal{R}_{\mathrm{metric}}^{\mathrm{fermion}}(\theta;W)
=
\mathcal{R}_{\mathrm{metric}}(\theta;W)
+\lambda_{\mathrm{s2m}}
\mathcal{R}_{\mathrm{spin\to metric}}(\theta;W)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aaab9d9dfdbdc067)
with $\mathcal{R}_{\mathrm{spin\to metric}}$ defined in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#spinor-to-metric-compatibility-residual). This does not add spinor ontology to the metric. It states when fermion matter records are mature enough to be consumed by the metric constitutive map without importing weak handedness or spin as unexplained effective labels.

The same-record condition is part of the metric claim. A fermion stress channel cannot pass metric compatibility by combining one branch for inertial response, another branch for spinor closure, and a third branch for weak exposure; the retained row that supplies the ordered-frame spinor label must also satisfy the row-local gauge-control and angular-momentum residuals consumed by $\mathcal{R}_{\mathrm{spin\to metric}}$.

In the shared pullback notation, the stress-side consumer is $\Pi_{\mathrm{matter}}\mathcal L_\star(\theta;W,r_\star)$. The fermion metric row therefore fails if spinor closure, weak exposure, and matter response are sourced from different retained rows, even when each reduced row is individually well fitted.

### Noether Braid Deformation and Metric Language

At the assembly level, an individual Noether braid has an oblate, deformable exclusion envelope; see [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). This chapter does not identify that individual Noether braid envelope with the metric. The metric bridge uses many deforming Noether braids in the Noether sea, whose coarse variables determine clock, ruler, and signal behavior.

When translating toward General Relativity, Einstein's field equations first appear as the standard comparison form
$$
G_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}
$$

[View →](../../../../../equation-mapping.html#poisson-einstein-weak-gravity)

not as substrate curvature of the Euclidean void. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ weak-field translation, the speed slot is supplied by the recovered homogeneous observer-channel speed $c_0$, the right-hand side is interpreted through matter assemblies and Noether sea stress, and the left-hand side is the observer-level metric summary reconstructed from clock, ruler, and signal channels.

For axially symmetric or rotating sources, oblate spheroidal coordinates can be a useful effective chart. A representative line element has the form
$$
ds^2
=
-f(\zeta,\vartheta)c_0^2dt_{\mathrm{eff}}^2
+g_1(\zeta,\vartheta)d\zeta^2
+g_2(\zeta,\vartheta)d\vartheta^2
+g_3(\zeta,\vartheta)d\phi^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-789ca5523b0e74cb)
where $(\zeta,\vartheta,\phi)$ are local effective-chart coordinates, and $f,g_1,g_2,g_3$ encode the observer-level response of clocks, rulers, and signal paths. The symbols $\zeta$ and $\vartheta$ do not rename the Noether braid envelope ratio $\xi$ or the mollifier width $\eta$. These coefficients are not primitive geometry. They are closure targets to be derived from Noether sea density, strain, alignment, and deformation.

The useful GR analogy is therefore limited but important:

- oblate coordinates help describe rotating or deformed effective sources,
- interior and exterior effective solutions around oblate bodies remain useful comparison targets,
- perturbative methods can capture small departures from spherical symmetry,
- and standard predictions such as redshift, Shapiro delay, lensing, orbital precession, frame-dragging, and gravitational-wave emission from deformed sources must be recovered from one reusable constitutive map.

The assembly fact that a Noether braid is oblate belongs in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). The spacetime claim that a population of deformed Noether braids yields an effective metric belongs here and in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md).

### Jacobson-Type Support: Metric as Equation of State

This Noether sea-first picture is paralleled by the general Jacobson-style lesson: Einstein equations are plausibly an **equation of state** for an underlying microscopic system rather than substrate-level laws of the void itself.

That comparative point fits $\mathbb{A}\mathbb{A}\mathbb{A}$ cleanly:

- the Euclidean void and absolute time are fundamental background structure,
- the Noether sea is the relevant microstructure,
- and relativistic metric behavior is the long-wavelength thermodynamic closure of that microstructure.

On this reading, quantizing the effective metric directly is not the primary move. The primary move is to understand and simulate the microphysical medium well enough that GR-like geometry emerges as its coarse constitutive summary.

The spacetime-condensate comparison makes the same point in hydrodynamic language. If $g_{\mu\nu}^{\mathrm{eff}}$ is a collective variable, then a long-wavelength quantized-metric calculation is analogous to quantizing a collective mode. The missing microscopic question is the coarse-graining map
$$
\Pi_{\mathrm{hydro}}:
\left(
S(T),\mathcal{H}_{\Omega}^{W},\mathcal{N}_{\mathrm{sea}}
\right)
\longrightarrow
g_{\mu\nu}^{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8e194ba5b53c70fa)
and the residual
$$
\mathcal{R}_{\mathrm{hydro}\to g}(\theta)
=
\frac{
\left\|
g_{\mu\nu}^{\mathrm{eff}}(\theta)
-
\Pi_{\mathrm{hydro}}[S(T),\mathcal{H}_{\Omega}^{W},\mathcal{N}_{\mathrm{sea}}]
\right\|
}{\epsilon_g}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9f059dcb6bf2a033)
This residual is not a new gate; it states the existing constitutive burden in a form that separates collective-mode recovery from microscopic derivation.

This does not license dismissing low-energy quantized-metric calculations. In the long-distance regime, the effective-field-theory treatment of GR separates unknown high-energy local terms from calculable infrared corrections. $\mathbb{A}\mathbb{A}\mathbb{A}$ should preserve that result as an observer-level recovery benchmark: the microscopic account may differ, but the weak-field constitutive record must reproduce the same long-distance quantum correction when its variables are coarse-grained into the effective metric description.

Relative-entropy gravity proposals add a useful comparison pressure here. They place a matter/geometry mismatch functional at the action level and then ask for Einstein behavior, dark-energy-like terms, and horizon-area behavior as consequences of one variational record. In this chapter that is a benchmark discipline, not a mechanism to import. Any entropy-based comparison must still project through the same Noether sea record that supplies $T_{\mu\nu}^{\mathrm{eff}}$, $g_{\mu\nu}^{\mathrm{eff}}$, horizon labels, and the effective dark-energy row; otherwise the entropy functional is only another fitted description.

This support is useful but limited. A Jacobson-style argument would explain why GR-like behavior is a natural equilibrium limit of many possible media, not why $\mathbb{A}\mathbb{A}\mathbb{A}$ is uniquely correct. The distinguishing burden therefore shifts to the departures from equilibrium, where the detailed Noether braid architecture should matter.

It also does not derive inertia by itself. A successful equation-of-state route can recover an effective Einstein equation while leaving open how a particular assembly acquires its inertial response, why accelerated and gradient-driven local records agree to equivalence-principle accuracy, and how the same Noether sea record fixes the mass-side response tensor. Those burdens remain with the mass, energy, Lorentz-closure, and Noether braid dynamics programs.

#### Local-Horizon Recovery Target

The Jacobson comparison gives this chapter a sharper recovery target than the general phrase "metric as equation of state." In the standard argument, a local horizon patch is assigned a boost-energy flux $dQ$, an Unruh temperature $T_U$, and an entropy change $dS$ proportional to horizon area. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation cannot assume those quantities as substrate facts. It must derive their observer-level analogues from one Noether sea record, using the same clock, signal, stress, and finite-boundary data that later recover weak-field GR.

For a Physical Observer $O$ and a small effective-horizon patch $\partial\Omega$, let $\theta$ denote the shared Noether sea state and observer-channel record. Let $\mathcal{B}_{\partial\Omega}^{(O)}(\theta)$ be the observer-accessible boundary-wake label set induced by the finite-boundary data in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#ontic-and-epistemic-levels). A compact thermodynamic comparison residual is
$$
dS_{\partial\Omega}^{(O)}(\theta)
=
d\left(
k_B\log\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta)\right|
\right),
\qquad
dQ_{\partial\Omega}^{(O)}(\theta)
=
\int_{\partial\Omega}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-64e42d358483a2dd)
and
$$
\mathcal{R}_{\mathrm{thermo}}(\theta)
=
\sup_{O,\partial\Omega}
\frac{
\left|
dQ_{\partial\Omega}^{(O)}(\theta)
-
T_U^{(O)}dS_{\partial\Omega}^{(O)}(\theta)
\right|
}{
\left|dQ_{\partial\Omega}^{(O)}(\theta)\right|
+
T_U^{(O)}
\left|dS_{\partial\Omega}^{(O)}(\theta)\right|
+
\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d67a57d835cabef0)

The local-horizon gate is $\mathcal{R}_{\mathrm{thermo}}(\theta)\le\epsilon_{\mathrm{thermo}}$ in the equilibrium weak-field comparison regime, with the same $\theta$ also passing the ADM/Cartan and PPN gates below. If the residual can be made small only by assigning independent entropy, temperature, and stress records to each patch, then the equation-of-state analogy has not become a native closure. If it can be made small for all local horizon patches while local observer-level conservation holds, the Jacobson route supplies a proof scaffold for recovering an effective Einstein equation without treating the Euclidean void as curved.

The first proof scaffold is to make the boundary count, temperature, and flux three projections of the same record rather than three fitted fields. For a finite analysis window $W$, the boundary label count should satisfy
$$
\mathcal{N}_{\partial\Omega}^{(O)}(\theta;W)
=
\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)\right|,
\qquad
S_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log\mathcal{N}_{\partial\Omega}^{(O)}(\theta;W)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a239ed0104ddcef4)
The area-scaling target is not imposed as ontology. It is the recoverable limit
$$
\frac{\partial S_{\partial\Omega}^{(O)}}{\partial A_{\partial\Omega}^{\mathrm{eff}}}
\longrightarrow
\frac{k_B}{4A_{\text{align}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2e393a3764cb2c2b)
where $A_{\partial\Omega}^{\mathrm{eff}}$ is the observer-level patch area and $A_{\text{align}}$ is the alignment-area scale used in the black-hole entropy target. The local temperature comparison is
$$
T_U^{(O)}
=
\frac{\hbar a_O}{2\pi k_B c_0},
\qquad
a_O^2
=
\gamma_{ij}^{\mathrm{eff}}a_O^i a_O^j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbe51d89696051e8)
with $a_O^i$ extracted from the same observer-channel metric record. The flux projection must then agree with the effective stress-energy flux computed from that record, and the local conservation residual
$$
\mathcal{R}_{E,\partial\Omega}^{(O)}(\theta;W)
=
\frac{
\left|\Delta E_{\Omega}^{(O)}(\theta;W)
+dQ_{\partial\Omega}^{(O)}(\theta;W)\right|
}{
\left|\Delta E_{\Omega}^{(O)}(\theta;W)\right|
+\left|dQ_{\partial\Omega}^{(O)}(\theta;W)\right|
+\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6c3ae013b787a139)
must be small on the same windows. Thus the local-horizon pass condition is not only $\mathcal{R}_{\mathrm{thermo}}\le\epsilon_{\mathrm{thermo}}$, but also $\mathcal{R}_{E,\partial\Omega}^{(O)}\le\epsilon_E$ and the weak-field ADM/Cartan gates for the same $\theta$. A concrete simulation protocol for this target is [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md).

##### Native Shared-Record Variation Target

The residual above becomes a derivation only after the comparison record is made explicit. For a region $\Omega$, Physical Observer $O$, and finite analysis window $W$, use
$$
\theta_{\Omega,O,W}
=
\left(
\mathcal{H}_{\Omega}^{W},
\mathcal{B}_{\partial\Omega}^{(O)}(W),
\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W},
O_W,
\Pi_{\mathrm{eff}},
\mu_{\Omega,\theta}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-06dc68db9ed9ded8)
Here $\mathcal{H}_{\Omega}^{W}$ is the retained path-history data on the window, $\mathcal{B}_{\partial\Omega}^{(O)}(W)$ is the observer-accessible boundary-wake record, $\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W}$ is the locally resolved Noether sea state, $O_W$ is the observer's clock, ruler, and readout state on the window, $\Pi_{\mathrm{eff}}$ is the projection to the observer-level fields $(N,u^i_{\mathrm{sea,eff}},\gamma_{ij}^{\mathrm{eff}},T_{\mu\nu}^{\mathrm{eff}})$, and $\mu_{\Omega,\theta}$ is the conditional measure over unresolved deterministic histories. This tuple is not a new substrate object. It only names the record that must supply entropy, temperature, flux, and effective metric data together.

Let $\delta_\ell$ denote an admissible local-horizon perturbation that keeps the observer, window, projection map, and comparison regime fixed while varying the resolved Noether sea state and boundary flux through the patch. The native closure target is
$$
\delta_\ell
\log\left|
\mathcal{B}_{\partial\Omega}^{(O)}
\left(\theta_{\Omega,O,W}\right)
\right|
=
\frac{\delta_\ell A_{\partial\Omega}^{\mathrm{eff}}}{4A_{\text{align}}}
=
\frac{\delta_\ell Q_{\partial\Omega}^{(O)}}{k_B T_U^{(O)}}
+
\mathcal{O}(\epsilon_{\mathrm{local}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bf180429d2f97e17)
Equivalently, $\delta_\ell Q_{\partial\Omega}^{(O)}=T_U^{(O)}\delta_\ell S_{\partial\Omega}^{(O)}+\mathcal{O}(k_B T_U^{(O)}\epsilon_{\mathrm{local}})$, with $S_{\partial\Omega}^{(O)}=k_B\log|\mathcal{B}_{\partial\Omega}^{(O)}|$. The error term collects declared local-gradient, finite-window, and record-coarse-graining residuals; it may not hide a second entropy record, a second stress record, or a separately tuned temperature.

The first proof step is to show that the logarithmic boundary-label count admits an area density on the observer-level horizon patch:
$$
\log\left|
\mathcal{B}_{\partial\Omega}^{(O)}
\left(\theta_{\Omega,O,W}\right)
\right|
=
\int_{\partial\Omega}
\sigma_{\mathrm{bw}}
\left(\theta_{\Omega,O,W};x_{\mathrm{eff}}\right)
dA_{\mathrm{eff}}(x_{\mathrm{eff}})
+
\mathcal{O}(\epsilon_{\mathrm{edge}}),
\qquad
\sigma_{\mathrm{bw}}
\longrightarrow
\frac{1}{4A_{\text{align}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-12663a44df473f84)
in the equilibrium weak-field limit. The proof fails if the distinguishable boundary-wake count scales with unresolved interior volume or arbitrary history length after the effective area is fixed, if $T_U^{(O)}$ is not extracted from the same observer-channel acceleration that defines $A_{\partial\Omega}^{\mathrm{eff}}$, if $dQ_{\partial\Omega}^{(O)}$ uses a stress tensor not projected from $\theta_{\Omega,O,W}$, or if the same record cannot also satisfy weak-field ADM/Cartan recovery.

A more explicit reduction is the boundary-factorization theorem target. Let $\mathcal{P}_{\partial\Omega}$ be a patch decomposition of the observer-level horizon surface with
$$
A_{\mathrm{eff}}(P_a)
=
a_{\theta}A_{\text{align}}
+
\mathcal{O}(\epsilon_A A_{\text{align}}),
\qquad
P_a\in\mathcal{P}_{\partial\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d256e08e80a780a7)
where $a_{\theta}$ is the derived dimensionless patch-area normalization for the retained record. The coefficient cannot be interpreted as a literal independent one-patch count: $\log|\mathcal{L}_a|=1/4$ would require $|\mathcal{L}_a|=e^{1/4}$, not the cardinality of a finite set. The coherent target is an area-normalized block entropy density. For a connected patch block $U\subseteq\mathcal{P}_{\partial\Omega}$, let $\mathcal{L}_U(\theta_{\Omega,O,W})$ be the joint retained boundary-wake label set on $U$ after fixing the observer record and the edge data to the accuracy declared by $\epsilon_{\mathrm{local}}$. The local aligned-label density is
$$
s_{\mathrm{align}}(\theta_{\Omega,O,W})
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|
\mathcal{L}_U(\theta_{\Omega,O,W})
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc5176b20f81a9de)
when the limit exists after boundary corrections. The locality part of the theorem target is
$$
\log\left|
\mathcal{L}_U(\theta_{\Omega,O,W})
\right|
=
|U|\,s_{\mathrm{align}}(\theta_{\Omega,O,W})
+
\mathcal{O}\!\left(
|\partial U|\epsilon_{\mathrm{corr}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eda386d9c5d781c2)
where the correction records edge and finite-correlation effects between adjacent patches. The normalization part is then the aligned-label statement
$$
\frac{s_{\mathrm{align}}(\theta_{\Omega,O,W})}
{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4026a3bc1a04553)
Together with $\sum_{P_a\in\mathcal{P}_{\partial\Omega}}A_{\mathrm{eff}}(P_a)\to A_{\partial\Omega}^{\mathrm{eff}}$, these claims imply the area density above. This does not prove the coefficient by definition. It reduces the problem to a local aligned-interface calculation: terminal orthogonal-axis three-binary alignment must supply a universal block entropy density, its patch-area normalization, and surrounding Noether sea correlations short-range enough that the boundary count is additive up to edge residuals.

### Refraction vs. Curvature

- From the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:
  - Primitive causal-wake support is measured by Euclidean distances in $(X,Y,Z)$ on the absolute slice,
  - While effective ray paths and clock comparisons depend on an *effective speed* $c_{\text{eff}}(\mathbf X,T)$ set by the local Noether braid configuration: $c_{\text{eff}}(\mathbf X,T) < c_f \quad \text{in dense regions (near mass)}$ — the declared response-sign assumption of the weak-field branch, required for recovery rather than derived.
- From the **Physical Observer** (built from assemblies):
  - Light and free-falling matter appear to move along curved paths (geodesics) of an effective metric $g^{\text{eff}}_{\mu\nu}$.
  - Shapiro delay, light bending, and perihelion precession become **refractive-medium effects** rather than curvature of the void itself.

A flat-space refraction analogy is therefore useful only when it is kept at the correct level. A scalar $c_{\text{eff}}(\mathbf X,T)$ or scalar delay map can encode a first signal-path delay, but it is not by itself an effective metric. GR/PPN recovery requires the same Noether sea record to determine the observer-level lapse $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, drift $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, frame field $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, and spatial compliance $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, so clock, ruler, and signal projections cannot be tuned as separate channels.

The constitutive task is to:

1. Specify the projection from native Noether sea fields into $g^{\text{eff}}_{\mu\nu}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$:
   - $n(\mathbf X,T)$ (equivalently $\rho_{\text{NS}}(\mathbf X,T)$),
   - Stress/strain of the Noether sea,
   - Potential $\Phi_{\text{eff}}(\mathbf X,T)$ from matter assemblies.
2. Show that in the weak-field regime this reproduces the standard GR metric (e.g. Schwarzschild) to PPN accuracy: $g^{\text{eff}}_{00} \approx -\left(1 + \frac{2\Phi_N}{c_0^2}\right), \quad g^{\text{eff}}_{ij} \approx h_{ij}\left(1 - \frac{2\Phi_N}{c_0^2}\right).$

### Minimal Weak-Field Constitutive Map (for PPN Matching)

To make the mapping functional explicit at first post-Newtonian order, start in the local Noether sea rest gauge
$$
u^i_{\mathrm{sea,eff}}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec70e479f1d935bd)
with observer-channel speed $c_0=c_{\text{eff}}(\infty)$. The weak-field target is
$$
N(x_{\mathrm{eff}}^k)
=
1+\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99240e6ba24f92ab)
$$
\gamma_{ij}^{\mathrm{eff}}(x_{\mathrm{eff}}^k)
=
\left(
1-2\gamma_{\mathrm{PPN}}\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c03f96afd2912f55)

Equivalently, using $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ in the observer-sector metric,
$$
g^{\text{eff}}_{00}(x_{\mathrm{eff}}^k)
=
-\left(1+\frac{2\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}\right)
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b4f19dea6bc22a16)
$$
g^{\text{eff}}_{ij}(x_{\mathrm{eff}}^k)
=
\left(
1-2\gamma_{\mathrm{PPN}}\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-423827ef9e7e6d38)

The native Noether sea delay factor remains
$$
\chi_{\text{sea}}(\mathbf X,T)\equiv \frac{c_f}{c_{\text{eff}}(\mathbf X,T)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-24f2d1e988b9a328)
After projection into the effective chart, PPN time-of-flight comparisons normalize by the homogeneous observer speed:
$$
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^k)}
=
\frac{\chi_{\text{sea}}(x_{\mathrm{eff}}^k)}{\chi_{\text{sea}}(\infty)}
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-27e8cb6647a21929)
so travel time on a Euclidean anchor path $\Gamma$ is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}\,ds_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-365cb6acc6ef920c)

This is the concrete first-order realization of
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}})
\mapsto
g^{\text{eff}}_{\mu\nu}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bddb3dd9e98a72b3)
with $\gamma_{\mathrm{PPN}}$ the observer-level refraction/spatial-compliance coefficient extracted from the same constitutive record whose Shapiro-delay and lensing projections are tested in [ppn-parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

### Closure Program Interface (metric constitutive map)

This chapter is the constitutive anchor for the gravity-side closure:
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}})
\mapsto
g^{\text{eff}}_{\mu\nu}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bddb3dd9e98a72b3-2)

Distribute proof obligations as:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md),
- clock-law extraction and coefficient fitting: [spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- final acceptance thresholds: [validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md).

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ coefficients predict Shapiro delay, lensing, redshift, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.
3. The long-distance GR-EFT correction to weak gravity is recovered from the same constitutive record, without treating the effective metric as microscopic ontology.

A proposed recovery that supplies only $c_{\text{eff}}(x_{\mathrm{eff}}^i)$ or $\chi_{\text{sea}}(x_{\mathrm{eff}}^i)$ therefore closes only a refractive signal model. It becomes a metric recovery candidate only after that scalar row is embedded in one shared clock/ruler/signal map for $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$.

### Weak-Field Geodesic Handoff (ADM Constitutive Subclass)

The scalar/disformal bridge is the ADM/Cartan subclass obtained by choosing the local Noether sea rest gauge:
$$
u^i_{\mathrm{sea,eff}}=0,
\qquad
\gamma_{ij}^{\mathrm{eff}}=\Omega^2(n,\lambda)h_{ij},
\qquad
N=\Omega(n,\lambda)\xi
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a513771b431dbf92)

Here $\xi$ is the Noether braid envelope shape ratio $\xi=R_{\parallel}/R_{\perp}$, not a synonym for the clock-rate factor. The stationary ideal clock-rate factor in this metric subclass is $N=\Omega\xi$ only after the geometry-to-clock map is fixed.

Define the clock-channel potential by the observer-side lapse:
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)\equiv c_0^2\ln N(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big),
\qquad
N(x_{\mathrm{eff}}^i)=e^{\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)/c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-773a465df978f1bd)

The $c_0^2$ prefactor calibrates the observer-sector potential; in the weak homogeneous branch, the residual between the primitive wake speed $c_f$ and the measured limiting speed $c_0$ is what operationally defines $\epsilon_{\mathrm{LV}}$ — the two agree up to $O(\epsilon_{\mathrm{LV}}c_0)$ by that definition, as a residual bounded by the Lorentz-violation budget rather than an asserted derivation.

With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the Noether sea rest-frame metric components are
$$
g^{\text{eff}}_{00}=-N^2,
\qquad
g^{\text{eff}}_{ij}=\Omega^2h_{ij}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e49b881fd1df75f9)

This subclass turns the first-order shape response into a sharp geometry-side closure target. Matching the standard positive-potential PPN rows gives
$$
N
=
1-\frac{U}{c_0^2}
+O(c_0^{-4}),
\qquad
\Omega
=
1+\gamma_{\mathrm{PPN}}\frac{U}{c_0^2}
+O(c_0^{-4}).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ac5b81fe5cacbd0e)
Because $N=\Omega\xi$, the same record must therefore satisfy
$$
\xi
=
1-(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O(c_0^{-4}).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c44d1eb4221c566e)
Thus $\gamma_{\mathrm{PPN}}=1$ is equivalent at first order to $\xi=1-2U/c_0^2+O(c_0^{-4})$ in this ADM subclass. The asymptotic condition is $\xi\to1$ as $U\to0$; it does not erase the first-order response that carries $\gamma_{\mathrm{PPN}}$. A native braid-envelope derivation of this response would determine $\gamma_{\mathrm{PPN}}$ rather than fit it.

For a slowly moving test assembly in a stationary medium, the dominant connection piece is
$$
\Gamma^i_{00}
=
-\frac{1}{2}g_{\text{eff}}^{ij}\partial_j g_{00}^{\text{eff}}
=
\xi^{2}\,\partial^i\ln(\Omega\xi)
=
\xi^{2}\frac{\partial^i\Phi_{\text{eff}}}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ac6e5b928f6972f)
Using $dx_{\mathrm{eff}}^0/dt_{\mathrm{eff}}\approx c_0$, the spatial geodesic equation gives
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
\approx
-\Gamma^i_{00}\left(\frac{dx_{\mathrm{eff}}^0}{dt_{\mathrm{eff}}}\right)^2
=
-\xi^{2}\nabla^i\Phi_{\text{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60769808bf61c478)
Hence, retaining $\xi=1+O(U/c_0^2)$ on the declared weak-field branch,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
\left|1-\xi^{2}\right|\,\left|\nabla\Phi_{\text{eff}}\right|
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f80bc28ba0203090)
which is the Newtonian limit.

PPN extraction for this constitutive subclass is defined canonically in [ppn-parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#ppn-parameters-and-the-euclidean-anchor), including the full $g_{00}$/$g_{ij}$ expansions, preferred-frame leakage map, and weak-field closure vector.

In that canonical map the exponential identity $N=e^{\Phi_{\mathrm{eff}}/c_0^2}$ fixes the quadratic coefficient only when the series is expressed in the constitutive potential $U_\Phi=-\Phi_{\mathrm{eff}}$. It gives $\beta_{\mathrm{PPN}}=1$ only if $U_\Phi=U+O(U^3/c_0^6)$, so the second-order potential-conversion coefficient vanishes. That conversion is a constitutive obligation, not a consequence of the definition $\Phi_{\mathrm{eff}}=c_0^2\ln N$.

## General Relativity

This chapter is the observer-facing checklist for the spacetime branch. It says, in one place, which general-relativistic observables must be matched by the constitutive medium picture and where the framework is allowed to differ only after that closure is secured.

Read it as a phenomenology gate rather than as a derivation chapter. The metric and PPN notes carry the constitutive work; this page states the observable obligations and their regime boundaries.

The central question is not whether $\mathbb{A}\mathbb{A}\mathbb{A}$ can describe gravity in different words. The question is whether one Noether sea response record can reproduce the network of tested GR observables without switching hidden assumptions between rows. Redshift, Shapiro delay, bending, orbital precession, equivalence-principle behavior, and gravitational waves must come from the same effective-geometry map in the regime where GR already works.

### Purpose

This chapter is the observer-level checklist for where the spacetime branch of $\mathbb{A}\mathbb{A}\mathbb{A}$ must reproduce general relativity and where it is allowed to differ. It is not the constitutive derivation itself. That work lives in the metric and PPN chapters. The role of this page is to collect the observable-facing map in one place.

### Core Interpretation

At the substrate level:

- space remains Euclidean,
- time remains absolute,
- and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the dynamical medium.

At the observer level, the same Noether sea must generate the effective metric behavior usually attributed to curved spacetime. Therefore the phenomenology requirement is:

$$
\text{medium response}
\;\Longrightarrow\;
\text{effective metric observables}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f070483765b65d62)

The closure demand is not merely qualitative resemblance. The same constitutive map must jointly recover redshift, Shapiro delay, light bending, perihelion precession, and gravitational-wave propagation in the regimes where GR is already tested.

Every row below should be treated as a test of the same medium record. If a clock result, a lensing result, and a gravitational-wave result require different hidden records, the branch has produced separate fits rather than a GR recovery.

Notation convention: $G_N$ denotes the standard Newtonian and low-energy GR comparison constant in the observable benchmark formulas below. $G_{\mathrm{eff}}(\theta)$ denotes the recovered constitutive coefficient of a candidate Noether sea record, and a validated weak-field branch must make $G_{\mathrm{eff}}(\theta)\to G_N$ in the same record that recovers the clock, lensing, PPN, and gravitational-wave rows. Nearby standard-comparison formulas may retain $G$ as ordinary GR shorthand; this chapter writes $G_N$ when the constant belongs to the benchmark rather than to the constitutive map.

#### Network evidence and nuisance separation

The empirical gravity lesson is that one precise test is not enough to establish an effective metric branch. A measurement can accidentally agree with the right number while sharing an unmodeled nuisance with the theory input, as in historical redshift and solar-system cases (Pound–Rebka thermal-gradient control; Eddington-1919 eclipse-systematics). The phenomenology gate therefore treats GR recovery as a network constraint:
$$
\mathcal{E}_{\mathrm{GR}}(\theta)
=
\mathbf{r}_{\mathrm{net}}(\theta)^{\mathsf T}
C_{\mathrm{net}}^{-1}
\mathbf{r}_{\mathrm{net}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9aea7b28c80cb8ea)
where $\mathbf{r}_{\mathrm{net}}$ contains the redshift, Shapiro, lensing, 1PN, preferred-frame, equivalence-principle, gravitational-wave, and CMB-derived gravity rows that are claimed by the same record $\theta$. The covariance $C_{\mathrm{net}}$ must include detector calibration, astrophysical nuisance parameters, foregrounds, and external-source uncertainty. A channel passes only when the same $\theta$ survives this joint network; agreement in a single row is a prompt for cross-checks, not closure.

#### Causal-order and scale recovery

Before the individual observables are checked, the effective metric map has to pass a structural check: Physical Observers must infer the same causal ordering, local clock scale, and negligible preferred-frame leakage that the GR comparison metric would provide in the validated regime. The following diagnostic is imported unchanged from [observer-framework.md](../../../../markdown/aaa/spacetime/observer-framework.md#effective-causal-order-recovery):
$$
\mathcal{R}_{\mathrm{causal}}(\theta)
=
d_{\mathrm{ord}}\!\left(\prec_{\mathrm{eff}}(\theta),\prec_{\mathrm{GR}}\right)
+
\lambda_{\tau}
\left\|
\frac{d\tau_{\mathrm{eff}}}{dt_{\mathrm{eff}}}(\theta)
-
\frac{d\tau_{\mathrm{GR}}}{dt_{\mathrm{eff}}}
\right\|_{W}
+
\lambda_{\mathrm{PF}}
\sum_{i=1}^{3}\alpha_i(\theta)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-af59c20f2dc02694)
The causal-order term tests the effective light-cone structure, the clock term supplies local scale, and the preferred-frame term keeps preferred-frame signatures below observational bounds. Passing this check does not replace the redshift, Shapiro, lensing, 1PN, quantum-gravity EFT, or gravitational-wave tests below; it prevents them from being fit by mutually incompatible causal and clock conventions.

The labels $\tau_{\mathrm{eff}}$ and $\tau_{\mathrm{GR}}$ mark the candidate observer-record clock readout and the GR comparison clock readout. They are scale readouts in the effective observer layer, not additional substrate time variables.

In plain terms, the observer cannot be allowed to recover one causal story from photons, a different clock story from matter, and a third timing story from gravitational waves. The tested regime must look like one effective spacetime to the Physical Observer.

#### Global continuation and cosmic-censorship comparison

Global hyperbolicity, Cauchy surfaces, Cauchy horizons, and cosmic censorship are standard GR comparison tools for asking when initial data determine a maximal observer-level spacetime. They are not substrate assumptions in $\mathbb{A}\mathbb{A}\mathbb{A}$, because the native dynamics live in absolute timespace with path-history records. Their retained value is as an extension discipline: when the effective metric comparison would treat a region as losing unique continuation, the native account must identify which finite boundary wake data, Noether sea state, and closure-label ensemble determine the continuation.

The comparison burden can be stated as a finite-access residual rather than as an imported global axiom. For a compact comparison region $\Omega$ and window $W=[T_i,T_f]$, the strong-field or cosmology packet must specify a continuation map from the same record class used by the weak-field observables,
$$
\mathcal{T}_{\Omega,W}^{\theta}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{W},
N_{\text{sea}}|_{\Omega\times W}
\right)
\longrightarrow
\mathcal{S}_{\Omega}(T_f)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf60cb273ecd8b69)
where $\mathcal{S}_{\Omega}(T_f)$ is the finite accepted endpoint or branch-label set. A GR comparison that assumes global hyperbolicity can be used only after the same $\theta$ also recovers the local causal-order, clock, PPN, and gravitational-wave observables above. If $\mathcal{S}_{\Omega}(T_f)$ is empty, infinite without a finite ledger, or selected by an external global assumption rather than by the recorded boundary data, the effective-metric continuation has not closed.

### Weak-Field Observables That Must Match GR

#### Gravitational redshift and clock rates

The clock channel must reproduce
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
\approx
\sqrt{1+\frac{2\Phi_N}{c_0^2}-\frac{\|\mathbf w\|^2}{c_0^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a10eac89a256ff66)
in the weak-field, low-velocity observer regime, where $\mathbf w$ is the sea-relative group velocity of the clock in the weak homogeneous limit and $c_0\equiv c_{\text{eff}}(\infty)$ is the dressed asymptotic clock/signal speed. The primitive wake speed $c_f$ still belongs inside delayed-root and self-hit equations; it is not the default denominator for observer clock dilation unless a closure result identifies the relevant dressed branch with $c_f$. For static clocks this reduces to
$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec3c33cf92fa48dd)

Operationally, GPS offsets, Pound-Rebka, and related clock-comparison tests are the direct acceptance layer. Height-resolved optical-clock comparisons (mm-baseline Sr optical-lattice clock comparison, Bothwell-class) sharpen this layer: near Earth's surface, $\Delta\nu/\nu\approx gL/c_0^2$, so a $1\,\mathrm{mm}$ clock-sample separation corresponds to about $1.1\times10^{-19}$ and a $33\,\mathrm{cm}$ separation to about $3.6\times10^{-17}$. The same clock law must handle both separated clocks and extended collective clock samples without replacing the constitutive coefficients used for Shapiro delay and lensing.

#### Shapiro delay

In the refractive-medium picture, one-way path time is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)\,ds_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a8e4c7a114562af9)
with
$$
\bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)
\equiv
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(x_{\mathrm{eff}}^i)
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^i)}{c_0^2}
+O(c_0^{-4})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3d4b17ebd2600bbe)

For a point mass, the resulting delay is
$$
\Delta t_{\mathrm{eff}}
=
\frac{(1+\gamma_{\mathrm{PPN}})G_N M}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+O(c_0^{-5})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-427734dc658fe45c)
which must match the GR coefficient at current solar-system precision.

#### Light bending

The same refractive map must recover the 1PN deflection law
$$
\Delta\theta
\approx
2(1+\gamma_{\mathrm{PPN}})
\frac{G_N M}{b\,c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9ce389605d4f4747)
with impact parameter $b$. In the GR-matching limit $\gamma_{\mathrm{PPN}}=1$, this reduces to the standard
$$
\Delta\theta \approx \frac{4G_N M}{b\,c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-987d3bf3dcb7335a)

So Shapiro delay and lensing are not separate fit channels. They are two readouts of the same constitutive coefficient.

#### Perihelion and 1PN orbital structure

The effective metric subclass must also reproduce the standard 1PN orbital correction structure, summarized through the PPN parameters $\gamma_{\mathrm{PPN}}$ and $\beta_{\mathrm{PPN}}$. At the phenomenology level the requirement is simple:

- Mercury-type precession,
- geodetic precession,
- and other weak-field orbital tests

must all be reproduced by the same $(\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_i)$ package already used for light and clock observables.

For the classical weak-field suite, the comparison record can be made explicit. On an observation window $W$, let $\theta_W$ denote the retained Noether sea state, source assembly record, observer clock/ruler state, signal-channel data, boundary wake data, and the ADM/Cartan projection
$$
\theta_W
\longmapsto
\left(
N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}},
\Phi_{\text{eff}},
\chi_{\text{sea}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b0e43cf5e15c9c7c)
The observable residual bundle is then
$$
\mathbf{r}_{\mathrm{GR}}(\theta_W)
=
\begin{pmatrix}
R_{\mathrm{red}}\\
R_{\mathrm{Shap}}\\
R_{\mathrm{lens}}\\
R_{\mathrm{acc}}\\
R_{\mathrm{1PN}}\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix},
\qquad
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W}
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99b0736a014e40c6)
The redshift, Shapiro, lensing, acceleration, 1PN, and preferred-frame rows are acceptable only when they are projections of this same $\theta_W$. If any row requires replacing $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, $\gamma_{ij}^{\mathrm{eff}}$, $\Phi_{\text{eff}}$, $\chi_{\text{sea}}$, or the boundary/noise record, the phenomenology pass has become a set of separate fits rather than a GR recovery.

Solar oblateness supplies the nuisance-control version of the same rule. Mercury-type precession may be written as
$$
\Delta\varpi_{\mathrm{obs}}
=
\Delta\varpi_{\mathrm{PPN}}(\theta_W)
+\Delta\varpi_{J_{2,\odot}}
+\Delta\varpi_{\mathrm{asteroid}}
+\Delta\varpi_{\mathrm{noise}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5faf9cf10e07397c)
where $\Delta\varpi_{J_{2,\odot}}$ is the contribution from the Sun's quadrupole moment and the remaining terms collect other modeled ephemeris corrections. A constitutive map cannot improve its PPN fit by silently moving a mismatch into $\Delta\varpi_{J_{2,\odot}}$ or by using a solar-interior assumption inconsistent with helioseismology and light-deflection records. The precession row closes only after the nuisance record is fixed independently enough that $\Delta\varpi_{\mathrm{PPN}}$ is the recovered effect rather than a residual after subtraction.

The perihelion row should carry the explicit GR target rather than only the name of the test. For a weak-field bound orbit with semi-major axis $a$ and eccentricity $e$,
$$
\Delta\varpi_{\mathrm{GR}}
=
\frac{6\pi G_N M}{a(1-e^2)c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96ce30e1a9d51242)
per orbit. In the PPN projection this is the special case of
$$
\Delta\varpi_{\mathrm{PPN}}
=
\frac{2\pi G_N M}{a(1-e^2)c_0^2}
\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46317199ba600344)
so Mercury-type precession is a joint test of the same spatial-compliance coefficient that controls lensing and the same nonlinear clock coefficient that controls $\beta_{\text{PPN}}$.

#### Low-Energy Quantum-Gravity EFT Benchmark

The classical weak-field observables above do not exhaust the recovery gate. Standard low-energy effective-field-theory calculations treat GR as a valid long-distance theory and separate unknown high-energy local terms from calculable infrared behavior. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not take the quantized metric as microscopic ontology, but it must recover the same long-distance observer-level data product where the expansion is controlled.

For two slowly moving masses, use the schematic benchmark

$$
V_{\mathrm{GR\text{-}EFT}}(r)
=
-\frac{G_N m_1 m_2}{r}
\left[
1
+\alpha_{\mathrm{1PN}}\frac{G_N(m_1+m_2)}{c_0^2 r}
+\alpha_{\hbar}\frac{G_N\hbar}{c_0^3 r^2}
+\cdots
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7ff05941ab8aef49)

where $\alpha_{\mathrm{1PN}}$ and $\alpha_{\hbar}$ are fixed by the standard low-energy calculation rather than fitted as new $\mathbb{A}\mathbb{A}\mathbb{A}$ parameters. A useful closure residual is

$$
\mathcal{R}_{\mathrm{qG}}(r;\theta)
=
\left|
\frac{
V_{\mathbb{A}\mathbb{A}\mathbb{A}}(r;\theta)
-V_{\mathrm{GR\text{-}EFT}}(r)
}{
G_N m_1 m_2/r
}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-221850cce9a25c2d)

This residual is not a demand that the Noether sea be rewritten as a graviton field. It is a demand that the same weak-field constitutive record that yields redshift, lensing, and wave propagation also recover the long-distance quantum correction in the regime where the effective theory is predictive.

Massive-superposition entanglement experiments add a second low-energy quantum-gravity benchmark. If two isolated massive probes acquire an entanglement witness through gravity alone, the retained data product is the branch-dependent interaction phase, not a decision between graviton-field ontology and quantized-geometry ontology. The corresponding validation packet in [Massive-Superposition Gravity Validation Packet](../../../../markdown/aaa/validation/massive-superposition-gravity.md) requires the same effective-metric record $\theta$ to generate the mediated-entanglement phase while keeping non-gravitational coupling residuals bounded and preventing the gravity-side response from becoming an unmodeled which-path record.

### Equivalence-Principle Channels

The weak equivalence principle and the strong equivalence principle are distinct benchmark rows. For two compact test assemblies $A$ and $B$ falling toward an external source $S$, define the composition residual
$$
\eta_{AB}^{S}
=
\frac{2(a_A^S-a_B^S)}{a_A^S+a_B^S}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-de660d9fa2c2b12b)
The weak equivalence row requires $\eta_{AB}^{S}$ to vanish within the material-composition bounds while the same clock, signal, and PPN record is held fixed. The point is not to assume equivalence as a substrate axiom, but to recover it as an observer-level constraint on the same record $\theta_W$. If local clock/ruler states for different apparatuses are allowed to absorb the gravitational response through material-dependent scale factors $\lambda_A(x_{\mathrm{eff}}^i;\theta_W)$, the residual must also satisfy
$$
\mathcal{R}_{\mathrm{scale\text{-}EP}}^{S}(\theta_W)
=
\max_{A,B}
\frac{
\left\|
\nabla\ln\!\left(\lambda_A/\lambda_B\right)
\right\|_W
}{
\left\|\nabla\Phi_{\text{eff}}\right\|_W/c_0^2+\varepsilon
}
\ll 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-54307dedc8cf70bd)
with the source assembly, boundary wake data, cosmological record, and PPN coefficients held fixed. This forbids a flat-description or local-unit rewriting from replacing universal gravitational acceleration by apparatus-specific material response.

The same statement can be read in mechanism language. Inertial response and gravitational response need not have identical substrate triggers: one can come from imposed acceleration of the assembly ledger, while the other can come from a Noether sea gradient. They recover the equivalence principle only if both triggers perturb the same shielded internal ledger through the same weak homogeneous response map. Any Mach-like dependence on the surrounding matter distribution must therefore appear as a common-mode feature of $\theta_W$, not as a body-specific adjustment of inertia.

Equivalence recovery therefore couples the torsion-balance row, clock-comparison row, and cosmological/boundary record: a Mach-like dependence of inertial standards on the surrounding matter distribution is admissible only if it is common to the accepted observer record and leaves no composition-dependent acceleration residue.

A separate strong-equivalence row tests whether gravitational self-energy or medium binding changes the acceleration of extended bodies:

$$
\eta_{\mathrm{SEP}}
=
\frac{\Delta a_{\mathrm{self}}}{a}
\bigg/
\left(
\frac{E_{\mathrm{grav},1}}{m_1c_0^2}
-
\frac{E_{\mathrm{grav},2}}{m_2c_0^2}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f24cc6685527a81)
where the denominator compares gravitational binding-energy fractions for two bodies in the same external field. This row is a recovery target for lunar-ranging, binary-pulsar, and compact-body tests; it is not interchangeable with the material-composition torsion-balance row. The same residual bundle must also keep active, passive, inertial, and energy-defined mass equal in the nonrelativistic limit, or else the Newtonian and PPN rows are being fit with inconsistent mass concepts.

### Preferred-Frame Leakage

Because the ontology contains an absolute frame, the observer-level phenomenology must still suppress preferred-frame signatures.

That means the effective PPN group-speed parameters
$$
\alpha_1,\alpha_2,\alpha_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46405bc13afbbc08)
must be observationally negligible in validated regimes. This is not optional. If the Noether sea leaves a measurable preferred-frame residue in the solar-system and pulsar regimes, the spacetime branch fails regardless of its conceptual elegance.

### Gravitational-Wave Channel

The Noether sea picture must recover the observed near-luminal propagation of gravitational disturbances:
$$
\left|\frac{v_{\mathrm{GW}}-c_0}{c_0}\right|
\le
\varepsilon_{\mathrm{GW}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-be17db24e72ca918)

Here $\varepsilon_{\mathrm{GW}}$ is the multi-messenger speed tolerance owned by the [GW Speed](../../../../markdown/aaa/validation/constraint-ledger.md#gw-speed) ledger row. In this framework, gravitational waves are propagating collective disturbances of the Noether sea. Their speed, dispersion, and polarization content must remain consistent with current timing bounds and detector-mode constraints. Any large medium-dispersion signature or unsuppressed scalar/vector/longitudinal response in already-tested bands is excluded. A cosmological-scale finite-range response must therefore decouple from the weak-field gravitational-wave channel through the same constitutive coefficient record, not through an observational-channel-specific patch.

### Strong-Field Regime

Weak-field GR matching is the conservative requirement. Strong-field behavior is where the theory may differ.

Use the canonical event-horizon alignment condition defined in [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition).

The strong-field interpretation is therefore:

- outside the alignment regime, GR-like effective geometry should emerge to the accuracy already tested,
- near the alignment regime, departures may appear through medium saturation, coplanarity, altered signal propagation, and assembly reconfiguration,
- but those departures must be stated as predictions, not used as excuses to miss weak-field closure.

The exterior benchmark still includes the standard compact-object scales before any native horizon-interface departure is promoted:
$$
r_s=\frac{2G_N M}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3G_N M}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6G_N M}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d7ef96253ade83c7)
for the Schwarzschild comparison branch. The first is the effective horizon radius, the second the null photon-orbit radius, and the third the innermost stable circular orbit for massive test bodies in the nonrotating exterior comparison. A native black-hole record may reinterpret what the horizon is made of, but it must still recover these exterior scales, or provide a declared residual template, before using strong-field ontology to explain compact-object observations.

### Closure Targets

This chapter is closed only if the spacetime branch can demonstrate all of the following from one constitutive map:

1. clock slowing / redshift,
2. Shapiro delay,
3. light bending,
4. 1PN orbital corrections,
5. the standard long-distance quantum-gravity EFT correction as an observer-level weak-field benchmark,
6. negligible preferred-frame leakage in tested regimes,
7. gravitational-wave speed, dispersion, and two-mode polarization compatibility,
8. non-arbitrary finite-boundary continuation wherever a strong-field or cosmological comparison invokes global extension assumptions.

The same coefficient set must survive all eight.

### Falsification Gate

The GR-observables interface fails if any of the following occur:

- redshift, lensing, and Shapiro delay require different constitutive parameter choices,
- the long-distance quantum correction to the Newtonian potential requires an independent weak-field coefficient set,
- preferred-frame leakage exceeds the bounds recorded in [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md),
- gravitational-wave propagation departs from observational timing, dispersion, or polarization bounds in validated regimes,
- a strong-field or cosmology packet needs an unrecorded global assumption to select its continuation,
- or the weak-field map cannot recover the GR coefficients to the required precision while remaining consistent with the rest of the substrate story.

In compact form, the required acceptance set is
$$
\mathcal{C}_{\text{redshift}}
\cap
\mathcal{C}_{\text{Shapiro}}
\cap
\mathcal{C}_{\text{lensing}}
\cap
\mathcal{C}_{\text{1PN}}
\cap
\mathcal{C}_{\text{qG-EFT}}
\cap
\mathcal{C}_{\text{PF}}
\cap
\mathcal{C}_{\text{GW}}
\cap
\mathcal{C}_{\text{cont}}
\neq \varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-05d464d7eef89585)

If that intersection is empty, the effective-metric program is not yet viable.

### Related Chapters

- [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- [ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- [proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- [gravitational-waves.md](../../../../markdown/aaa/spacetime/gravitational-waves.md)
- [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md)
- [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md)
- [../validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)

## PPN Parameters

This chapter is the canonical home for weak-field/PPN expansion details used by the spacetime constitutive map.

### Canonical Symbols

- $n$: normalized Noether braid density, with $\rho_{\text{NS}}=\rho_{\text{NS},0}n$.
- $\chi_{\text{sea}}$: Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field PPN comparisons.
- $\Phi_N$: Newtonian benchmark potential.
- $\Phi_{\text{eff}}$: constitutive effective potential from the clock channel.
- $U\equiv -\Phi_N>0$: positive PPN expansion variable (default).
- $U_{\Phi}\equiv -\Phi_{\text{eff}}>0$: constitutive-channel variant used when expanding directly in $\Phi_{\text{eff}}$.
- $C_2^{(U)}$ and $C_2^{(\Phi)}$: second-order clock coefficients in expansions using $U$ and $U_{\Phi}$, respectively. The undecorated $C_2$ in the numerical reduced-fit sections means $C_2^{(U)}$.
- $a_\chi$: first-order clock-channel response defined by $\ln\chi_{\text{sea}}=a_\chi U/c_0^2+O(U^2/c_0^4)$; the signal-channel value is $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$.
- $U_{ij}$: standard PPN anisotropic potential, with $U_{ij}=G\int \rho' (x-x')_i(x-x')_j/|\mathbf x-\mathbf x'|^3\,d^3x'$ in the comparison chart.
- $V_i$: standard PPN matter-current potential, with $V_i=G\int \rho'v_i'/|\mathbf x-\mathbf x'|\,d^3x'$; it has units of potential times velocity.

### Mapping to PPN Constraints

1. **Shapiro Delay**: Map the GR time-delay (longer path in curved space) to the $\mathbb{A}\mathbb{A}\mathbb{A}$ time-delay (slower $c_{\text{eff}}$ in the Noether sea).
2. **Light Bending**: Calculate Noether sea signal propagation through the density gradient around the Sun.
3. **Geodetic Precession**: Match the transport of an assembly's spin-orientation frame through the same weak-field effective metric used for clock, signal, and orbital tests.

Here, geodetic precession means the de Sitter precession of a carried gyroscope: after the gyroscope moves through a weak gravitational field, its spin axis is rotated relative to a distant reference frame. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this should not be introduced as a separate torque law between angular momentum and a potential gradient. It is a closure target for the effective metric: the Noether sea-induced clock, ruler, and signal-response map must make transported assembly orientations precess by the same amount that GR predicts in the validated weak-field regime. Frame dragging from a rotating source is a separate test channel.

For a slowly moving gyroscope in the stationary weak-field comparison chart, the PPN estimator is
$$
\boldsymbol\Omega_{\mathrm{dS}}
=
\frac{1+2\gamma_{\mathrm{PPN}}}{2c_0^2}
\mathbf v\times\nabla U.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b3e6e1ba275c9b6e)
For a central source this becomes
$$
\boldsymbol\Omega_{\mathrm{dS}}
=
\frac{1+2\gamma_{\mathrm{PPN}}}{2}
\frac{GM}{c_0^2r^3}
\mathbf r\times\mathbf v,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-68826ec78add1bfe)
giving the GR coefficient $3/2$ when $\gamma_{\mathrm{PPN}}=1$. The closure residual must compare the transported assembly-orientation frame with this estimator using the same effective metric record as Shapiro delay and lensing.

### Testing the Euclidean Anchor (Shapiro Delay)

1. **The Test**: Calculate travel time of a signal from Earth to a probe behind the Sun using the Euclidean straight-line anchor supplied by the $\mathbb{U}_{\text{now}}$ state record.
2. **$\mathbb{A}\mathbb{A}\mathbb{A}$ Model**: Signal follows a straight Euclidean line. Delay is caused by increased Noether sea response near the Sun, expressed by the Noether sea delay factor $\chi_{\text{sea}}$.
3. **Comparison**: Contrast $\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}$ with the GR weak-field form.
4. **$\mathbb{U}_{\text{now}}$ Role**: $\mathbb{U}_{\text{now}}$ provides the "straight line" benchmark against which the "curved path" of GR is compared.

### Explicit Weak-Field Noether Sea Delay Map (PPN $\gamma$)

Adopt a weak-field PPN-normalized Noether sea delay-factor ansatz for signal propagation in the Noether braid medium:
$$
\bar{\chi}_{\text{sea}}(\mathbf X,T)
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf X,T)}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf X,T)
= 1 - (1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(\mathbf X,T)}{c_0^2}
+ \mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3cc63b1fc4ebd63d)
with $\Phi_N<0$ near a mass source. For a point mass $M$,
$$
\Phi_N(r)=-\frac{GM}{r}
\quad\Rightarrow\quad
\bar{\chi}_{\text{sea}}(r)=1+(1+\gamma_{\mathrm{PPN}})\frac{GM}{c_0^2 r}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^4 r^2}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-01a35d5ca30f9f21)

For a one-way signal along a Euclidean straight path $\Gamma$ (the $\mathbb{U}_{\text{now}}$ anchor),
$$
t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(\mathbf X,T)\,ds
=\frac{R}{c_0}+\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e40463434fdc8ebb)
where $R=\int_\Gamma ds$ is Euclidean path length and
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma (\bar{\chi}_{\text{sea}}-1)\,ds
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^5}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c4d819a3eb58620c)

Evaluating the line integral for endpoint radii $r_1,r_2$ and Euclidean endpoint separation $R$ gives
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^5}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dbfc1c9db0dff320)
which is the standard 1PN Shapiro form with $\gamma\to\gamma_{\mathrm{PPN}}$ and $c\to c_0$. The primitive wake speed $c_f$ remains in the unnormalized delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; observer-facing PPN timing uses the asymptotic dressed speed $c_0$.

So the operational estimator is
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^3\,\Delta t_{\text{obs}}}
{GM\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)}
-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-394ab260d9cf36f8)
with $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_0$.

In the weak-field solar-system regime, $\gamma_{\mathrm{PPN}}$ is the direct refractive-space-curvature map parameter.

The same Shapiro map also fixes the first-order signal-delay response coefficient

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c407f0f6053a262a)

This is not automatically the clock coefficient $a_\chi$ used in the static $\Gamma_N$ endpoint row. The shared clock/signal delay branch is the additional condition

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-a_\chi^{\mathrm{sig}}
=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-32a5bcc20a9cc9cc)

When this residual vanishes, Shapiro delay and gravitational clock redshift are using the same first-order Noether sea delay response. When it does not vanish, PPN delay, redshift, lensing, pressure-response, and cosmological redshift comparisons must carry the residual explicitly rather than refitting $\chi_{\text{sea}}$ per observable.

### PPN Parameters and the Euclidean Anchor

#### Parameter $\gamma$ (Space Curvature / Refraction)
* **GR Context:** Measures the amount of space curvature produced by unit rest mass.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Measures the refractive response of the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md). A massive body increases local assembly density, slowing the effective signal speed $c_{\text{eff}}(\mathbf X,T)$ relative to the asymptotic observer speed $c_0$ — the declared response-sign assumption of the weak-field branch, required for recovery rather than derived — while $c_f$ remains the primitive wake speed.
* **Observable:** Shapiro-delay coefficient in the explicit refractive integral above.

The light-bending half-test makes the same point numerically. A lapse-only weak-field map gives the Newtonian-scale deflection
$$
\Delta\theta_{\mathrm{half}}
=
\frac{2GM}{b\,c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4f4bf9018b059731)
while the full GR-matching target is
$$
\Delta\theta_{\mathrm{GR}}
=
\frac{4GM}{b\,c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbafbd2358fc044f)
In the forward projection below, the missing half is precisely the $\gamma_{\mathrm{PPN}}$ spatial-compliance contribution. Therefore a constitutive map cannot claim PPN closure by matching Shapiro delay with a scalar delay factor while leaving the ruler/spatial-compliance row undefined.

#### Parameter $\beta$ (Non-linearity of Gravity)
* **GR Context:** Measures the non-linearity in the superposition of gravitational fields.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Captures second-order (in potential) clock/medium response from self-hit and Noether sea constitutive nonlinearity.
* **Explicit map from constitutive expansion:** Let $U\equiv-\Phi_N>0$. For a declared weak-field branch — conditional, like every weak-field expansion in this chapter, on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics, an open closure item of the [Noether sea program](../../../../markdown/aaa/spacetime/noether-sea.md) — expand the static clock law with branch-local constitutive coefficient $C_2^{(U)}$:
$$
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{v=0}
=
1-\frac{U}{c_0^2}
+C_2^{(U)}\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1f1003778f3355c4)
Since $-g_{00}=(d\tau/dt_{\mathrm{eff}})^2$ for a static observer,
$$
g_{00}
=
-1
+2\frac{U}{c_0^2}
-\bigl[1+2C_2^{(U)}\bigr]\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8adef2f758c430a0)
In the static isolated-source subclass where the remaining standard PPN potentials already take their GR values or vanish, match to the PPN form
$$
g_{00}^{\mathrm{PPN}}
=
-1+2\frac{U}{c_0^2}-2\beta_{\mathrm{PPN}}\frac{U^2}{c_0^4}+\cdots
$$

[View →](../../../../../equation-mapping.html#corpus-equation-85274609a807572d)
to obtain
$$
\boxed{\beta_{\mathrm{PPN}}=\frac{1+2C_2^{(U)}}{2}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b8a077bae49e26bd)
The superscript is essential: $C_2^{(U)}$ is the coefficient after the clock law has been expanded in the Newtonian comparison potential $U$. Reading $\beta_{\mathrm{PPN}}$ from this coefficient alone is not valid in a general source where $\Phi_{\mathrm W}$, $\Phi_1,\ldots,\Phi_4$, $\mathcal A$, or preferred-frame potentials carry independent non-GR coefficients. No cosmological $(a,k)$ dependence is implied here; those arguments are reserved for effective cosmology transfer variables such as $\mu(a,k)$ and $G_{\mathrm{eff}}(a,k)$.
* **Observable:** Perihelion precession and other 1PN nonlinear-potential tests.

#### Exponential clock-law subclass (direct map)

The identity
$$
\Omega\xi=e^{\Phi_{\text{eff}}/c_0^2},
\qquad
g_{00}=-(\Omega\xi)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0ab0711bd8da118c)
follows from the observer-side definition $\Phi_{\text{eff}}\equiv c_0^2\ln(\Omega\xi)$; it does not by itself determine a PPN parameter. With $U_{\Phi}\equiv -\Phi_{\text{eff}}$, it gives
$$
g_{00}
=
-e^{2\Phi_{\text{eff}}/c_0^2}
=
-1+2\frac{U_{\Phi}}{c_0^2}-2\frac{U_{\Phi}^2}{c_0^4}+O(c_0^{-6})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a88d33a14eb1bf3d)
and therefore fixes only the coefficient in the constitutive-potential expansion:
$$
\boxed{C_2^{(\Phi)}=\frac12}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-57ad27cf2d94d353)

Write the second-order potential conversion as
$$
\frac{U_{\Phi}}{c_0^2}
=
\frac{U}{c_0^2}
+D_2\frac{U^2}{c_0^4}
+O\!\left(\frac{U^3}{c_0^6}\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e9bfca514dd9b1b4)
Then
$$
C_2^{(U)}=C_2^{(\Phi)}-D_2,
\qquad
\beta_{\mathrm{PPN}}=1-D_2.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e39c6c4aa467af09)
Thus the exponential clock-coordinate identity yields $\beta_{\mathrm{PPN}}=1$ if and only if $D_2=0$, equivalently $U_{\Phi}/c_0^2=U/c_0^2+O(U^3/c_0^6)$. Deriving or bounding $D_2$ from the shared Noether sea response is the actual nonlinear-potential obligation.

Here $\Omega\xi$ is the local clock-rate factor $d\tau/dt_{\mathrm{eff}}$. The Noether sea cadence-stretch factor used in redshift bookkeeping is its inverse, $\Gamma_N=(\Omega\xi)^{-1}$, when the same local clock channel is being compared.

#### Preferred Frame Parameters ($\alpha_1, \alpha_2, \alpha_3$)
* **Crucial test:** In the effective relativistic limit these must vanish (no measurable preferred-frame leakage).
* **Constitutive leakage ansatz:** Let $\mathbf{w}=\mathbf V_{\mathrm{cm}}-\mathbf u_{\mathrm{sea}}$ be the barycentric laboratory or source-frame group velocity through the local Noether sea, matching the clock convention in which the material assembly moves relative to the sea. Write the lowest-order group velocity terms as
$$
g_{0i}^{\text{leak}}
=
-\frac{1}{2}\Xi_1\frac{w_i U}{c_0^3}
-\Xi_2\frac{w^j U_{ij}}{c_0^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8cb86fceb5fd8b4b)
$$
g_{00}^{\text{leak}}
=
-\Xi_3\frac{w^2 U}{c_0^4}
-\Xi_2\frac{w^i w^j U_{ij}}{c_0^4}
+\Xi_4\frac{w^i V_i}{c_0^4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-24e18fe96029530c)
Matching to standard PPN preferred-frame structure gives
$$
\boxed{\alpha_1=\Xi_1},\qquad
\boxed{\alpha_2=\Xi_2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9340d57c293b7e8a)
$$
\boxed{\alpha_3=\Xi_1-\Xi_2-\Xi_3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-629e98e67354d9ae)
with consistency relation
$$
\Xi_4=2\alpha_3-\alpha_1=\Xi_1-2\Xi_2-2\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-705843eb80c0c2ab)
If a comparison source instead defines $\mathbf w_{\mathrm{sea}}=-\mathbf w$, all odd-in-$\mathbf w$ preferred-frame terms must be sign-translated before reading off the $\Xi_i\to\alpha_i$ map.

#### Terrestrial Working Drift Profiles

Terrestrial preferred-frame rows need a declared $\mathbf u_{\mathrm{sea}}$ profile before their $\beta_{0,\oplus}\equiv|\mathbf w_\oplus|/c_0$ dependence can be evaluated numerically. Use the CMB dipole only as an observer-level comparison direction, not as proof that the CMB frame is the substrate's absolute rest frame. In that comparison chart, decompose a laboratory velocity as

$$
\mathbf V_{\mathrm{lab}}(t_{\mathrm{eff}})
=
\mathbf V_{\mathrm{CMB}}
+
\mathbf V_{\mathrm{orb}}(t_{\mathrm{eff}})
+
\mathbf V_{\mathrm{rot}}(t_{\mathrm{eff}})
+
\mathbf v_A(t_{\mathrm{eff}}),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5b907b2895d6fc0)

where $\mathbf V_{\mathrm{CMB}}$ is the Solar-system motion inferred from the CMB dipole, $\mathbf V_{\mathrm{orb}}$ and $\mathbf V_{\mathrm{rot}}$ are the terrestrial orbital and rotational contributions, and $\mathbf v_A$ is the apparatus motion relative to the laboratory. A two-coefficient working family brackets the unresolved Noether sea response:

$$
\mathbf u_{\mathrm{sea}}^{(f)}(t_{\mathrm{eff}})
=
f_{\mathrm{tr}}
\left[
\mathbf V_{\mathrm{CMB}}
+
\mathbf V_{\mathrm{orb}}(t_{\mathrm{eff}})
\right]
+
f_{\mathrm{rot}}\mathbf V_{\mathrm{rot}}(t_{\mathrm{eff}}),
\qquad
0\le f_{\mathrm{tr}},f_{\mathrm{rot}}\le1,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-15aef2459df8cfa8)

so that

$$
\mathbf w_A^{(f)}
=
(1-f_{\mathrm{tr}})
\left(
\mathbf V_{\mathrm{CMB}}
+
\mathbf V_{\mathrm{orb}}
\right)
+
(1-f_{\mathrm{rot}})\mathbf V_{\mathrm{rot}}
+
\mathbf v_A.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a0bbe59396df590f)

The non-entrained comparison is $(f_{\mathrm{tr}},f_{\mathrm{rot}})=(0,0)$. Ignoring the smaller annual, daily, and apparatus contributions, the [measured CMB dipole](https://lambda.gsfc.nasa.gov/education/lambda_graphics/cmb_dipole.html) gives $|\mathbf w_\oplus|\approx369\,\mathrm{km\,s^{-1}}$ and therefore $\beta_{0,\oplus}\approx1.23\times10^{-3}$. Translational entrainment uses $f_{\mathrm{tr}}\to1$ while leaving the rotational row independently testable; local co-rotation also takes $f_{\mathrm{rot}}\to1$. These are evaluation profiles, not derived constitutive solutions.

The existing preferred-motion bundle separates the profiles through their predicted annual and sidereal phase and amplitude. Ground-to-orbit clock and resonator comparisons add the radial discriminator: a profile that becomes less entrained with altitude changes $\mathbf w_A^{(f)}$ across the trajectory, whereas a CMB-comoving profile preserves the leading dipole-scale drift. The same $(f_{\mathrm{tr}},f_{\mathrm{rot}})$ values must be used in clock, interferometer, matter-sector, and PPN rows; fitting a different terrestrial drift profile to each channel would not close the preferred-frame map.

#### Rotating-Source Frame Dragging

Preferred-frame leakage and physical source-current response are different $g_{0i}$ channels. Setting $\alpha_1=\alpha_2=\alpha_3=0$ must remove dependence on a laboratory's group velocity through the Noether sea without removing the positive weak-field response to a rotating source. For source angular momentum $\mathbf J$ and $\mathbf r=r\hat{\mathbf r}$, the standard comparison row in the declared $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ convention is
$$
g_{0i}^{\mathrm{drag}}
=
-\frac{2G_N}{c_0^3}
\frac{(\mathbf J\times\mathbf r)_i}{r^3}
+
O(c_0^{-5}).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ad32f1cf32b319b0)
The corresponding carried-gyroscope target is the Lense-Thirring precession
$$
\boldsymbol\Omega_{\mathrm{LT}}
=
\frac{G_N}{c_0^2r^3}
\left[
3\hat{\mathbf r}(\mathbf J\cdot\hat{\mathbf r})
-\mathbf J
\right].
$$

[View →](../../../../../equation-mapping.html#corpus-equation-08f89be880e48c87)
In the constitutive map, this row must be projected from the same rotating-source angular-momentum ledger and Noether sea vorticity response that supply $u^i_{\mathrm{sea,eff}}$. The separation requirement is
$$
g_{0i}^{\mathrm{eff}}
=
g_{0i}^{\mathrm{drag}}(\mathbf J)
+
g_{0i}^{\mathrm{leak}}(\mathbf w)
+
O(c_0^{-5}),
\qquad
g_{0i}^{\mathrm{leak}}\to0
\ \text{while}\
g_{0i}^{\mathrm{drag}}\not\to0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-37d90cf341114be3)
for a rotating source. Lense-Thirring and geodetic precession must therefore be recovered from one effective metric but remain distinct observable projections.

#### Remaining PPN Parameters

The five-parameter rows used in the numerical examples below are a reduced subset, not the full PPN space. The full observer-level decision layer also contains the preferred-location parameter $\xi_{\mathrm W}$ and the conservation-law parameters $\zeta_1,\zeta_2,\zeta_3,\zeta_4$. The subscript on $\xi_{\mathrm W}$ is mandatory because the undecorated $\xi=R_\parallel/R_\perp$ is the Noether braid envelope shape ratio. Likewise, the PPN $\zeta_i$ must not be confused with the apparatus-calibration nuisance $\zeta_A$ used in the preferred-motion bundle.

For a GR-matching branch, the additional targets are
$$
\xi_{\mathrm W}
=
\zeta_1
=
\zeta_2
=
\zeta_3
=
\zeta_4
=0.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-314de0287c83f753)
Here $\xi_{\mathrm W}$ tests preferred-location leakage, while nonzero $\zeta_i$ would signal failure of the effective momentum/conservation bookkeeping. A wake-ledger theory cannot infer these zeros from notation: the same architrino-plus-wake-plus-medium record that closes total energy and momentum must project them below their observer-level bounds.

The missing decision rows are not equally well measured. Representative Will-style comparison pressures are

| Parameter | Representative bound or relation | Required estimator |
| --- | --- | --- |
| $\xi_{\mathrm W}$ | $|\xi_{\mathrm W}|\lesssim4\times10^{-9}$ from strong-field preferred-location torque tests | orientation precession relative to the external-potential direction |
| $\zeta_1$ | $|\zeta_1|\lesssim2\times10^{-2}$, mainly indirect | Nordtvedt/self-acceleration combination after the other PPN rows are fixed |
| $\zeta_2$ | $|\zeta_2|\lesssim4\times10^{-5}$ | binary-center-of-mass acceleration and pulsar timing |
| $\zeta_3$ | $|\zeta_3|\lesssim10^{-8}$ | active/passive mass and momentum-balance residual |
| $\zeta_4$ | no comparably direct standalone bound; $6\zeta_4=3\alpha_3+2\zeta_1-3\zeta_3$ under the standard pressure-gravity consistency assumption | pressure contribution to the same full PPN metric |

The pulsar-derived rows are strong-field analogues, not solar-system measurements. They remain legitimate closure pressure only if the model declares how its weak-field PPN parameters export into self-gravitating bodies. In particular, $\zeta_3$ is not automatically zero in a delayed pairwise interaction: the native estimator must cycle-average the complete matter-plus-wake-plus-Noether-sea momentum ledger before projecting the observer-level active/passive-mass residual.

### Zero-Leakage Conditions (Preferred-Frame Closure)

The effective theory is preferred-frame safe at the retained order if and only if all laboratory group-velocity couplings vanish:
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-51a274a461d28d14)

Equivalent constitutive conditions:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
\propto \delta_{ij}
\ \text{with zero traceless part}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3040cd0f79d7e23c)
and no momentum-density coupling term $w^iV_i$ at the retained PN order.

The coefficients $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ parameterize preferred-frame leakage terms in the weak-field constitutive expansion. This condition does not set the rotating-source row $g_{0i}^{\mathrm{drag}}(\mathbf J)$ to zero.

### Preferred-Motion Null-Test Bundle

Historical clock, interferometer, Zeeman-splitting, and gravimeter tests show how many different apparatus types can search for the same preferred-frame leakage without sharing the same dominant nuisance. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this becomes a bundle test on the same group velocity coefficients, not a set of independent fit parameters. For an apparatus channel $A$ with orientation $\hat{\mathbf{n}}_A(t_{\mathrm{eff}})$ and laboratory group velocity $\mathbf{w}(t_{\mathrm{eff}})$ through the local Noether sea, write the leading fractional readout as
$$
y_A(t_{\mathrm{eff}})
=
y_{A,0}
+\mathbf{s}_A^{\mathsf T}
\begin{pmatrix}
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
\frac{w^2(t_{\mathrm{eff}})}{c_0^2}
+\zeta_A
\frac{
\left(\mathbf{w}(t_{\mathrm{eff}})\cdot\hat{\mathbf{n}}_A(t_{\mathrm{eff}})\right)^2
-w^2(t_{\mathrm{eff}})/3
}{c_0^2}
+n_A(t_{\mathrm{eff}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2fdc9cbf8c9cf7d6)
Here $\mathbf{s}_A$ is the PPN sensitivity row for the channel, $\zeta_A$ is an allowed apparatus-calibration nuisance fixed by the instrument model, $n_A$ is detector/environment noise, and $y_A^\theta$ is the model readout projected from the retained record tuple $\theta$. The shared preferred-frame residual is
$$
\mathcal{R}_{\mathrm{PF\text{-}bundle}}
=
\sum_A
\left\|
y_A^{\mathrm{obs}}-y_A^{\theta}
\right\|_{C_A^{-1}}^2
+
\lambda_{\mathrm{PF}}
\left(\alpha_1^2+\alpha_2^2+\alpha_3^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-69f82830af0f2f6b)
The bundle fails if one clock or material channel requires a nonzero $\alpha_i$ that another channel excludes, or if the orientation/annual term is hidden in $\zeta_A$ rather than projected through $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$.

### Weak-Field Constraint Table (Decision Layer)

Use this table to close the constitutive loop against modern benchmarks.

| Channel | Model estimator | GR/PPN target | Closure requirement |
| --- | --- | --- | --- |
| Time nonlinearity | $\beta_{\text{PPN}}$ from $g_{00}$ expansion | $\beta_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Space curvature/refraction | $\gamma_{\mathrm{PPN}}$ from the shared spatial-compliance row, with Shapiro and lensing as projections | $\gamma_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Preferred-frame leakage | $(\alpha_1,\alpha_2,\alpha_3)$ from $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ | all $\approx 0$ | No significant nonzero leakage |
| Geodetic precession | $\boldsymbol\Omega_{\mathrm{dS}}$ from transported assembly orientation in the shared metric | $(1+2\gamma_{\mathrm{PPN}})\mathbf v\times\nabla U/(2c_0^2)$ | GP-B/LLR residual inside the declared covariance |
| Rotating-source frame dragging | $g_{0i}^{\mathrm{drag}}(\mathbf J)$ and $\boldsymbol\Omega_{\mathrm{LT}}$ from the source-current row | Lense-Thirring comparison | Recover the nonzero source response without preferred-frame leakage |
| Preferred-location leakage | $\xi_{\mathrm W}$ from the same effective metric record | $\xi_{\mathrm W}=0$ | No significant nonzero leakage |
| Conservation-law leakage | $(\zeta_1,\zeta_2,\zeta_3,\zeta_4)$ from the full architrino-plus-wake-plus-medium ledger | all $=0$ | No observer-level nonconservation residual |
| Newtonian limit | $\mathbf{a}=-\nabla\Phi_{\text{eff}}$ (weak field) | exact leading-order recovery | No constitutive contradiction |
| Cross-observable consistency | same constitutive coefficients across delay, redshift, precession, lensing, acceleration, and preferred-frame tests | single-parameter-set closure | No per-observable re-fit |

Numeric pass/fail thresholds are taken from [validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md).

### Source-Mined Benchmark Bound Vector

The current Will-style numerical comparison is not a single "GR matches" flag. It is a reduced five-row bound vector on the channels already carried by the numerical fit:
$$
\mathbf{b}_{\mathrm{Will}}
=
\begin{pmatrix}
2.3\times 10^{-5}\\
8\times 10^{-5}\\
4\times 10^{-5}\\
2\times 10^{-9}\\
4\times 10^{-20}
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a2bf8068e72d1145)
ordered as
$$
\left(
|\gamma_{\mathrm{PPN}}-1|,
|\beta_{\mathrm{PPN}}-1|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-44f6f782ffd68e68)
The first row is the Cassini time-delay bound on $\gamma_{\mathrm{PPN}}-1$; the second uses the perihelion-shift row for $\beta_{\mathrm{PPN}}-1$; the preferred-frame rows use the best listed weak-field/strong-field analogue bounds, namely the $\alpha_1$ row from lunar-laser-ranging plus binary-pulsar bounds, the $\alpha_2$ row from the solar-spin-axis alignment bound, and the $\alpha_3$ row from pulsar-population $\dot p$ statistics, per the Will PPN living-review compilation. Strong-field pulsar bounds should not be silently reclassified as solar-system PPN measurements, but they are valid closure pressure: any $\mathbb{A}\mathbb{A}\mathbb{A}$ group-velocity-leakage that survives in ordinary clocks, orbits, or pulsar timing must project below the corresponding row unless a separate strong-field screening mechanism is derived.

The decision residual is therefore the componentwise normalized vector
$$
\mathbf{q}_{\mathrm{PPN}}
=
\operatorname{diag}(\mathbf{b}_{\mathrm{Will}})^{-1}
\begin{pmatrix}
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6eada48e5e333e47)
Weak-field closure requires
$$
\|\mathbf{q}_{\mathrm{PPN}}\|_\infty \le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a95190bb18540d83)
before any strong-field deviation is advertised as a prediction. This is stricter than matching Shapiro delay alone because it forces the same constitutive metric row to suppress preferred-frame terms in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$.

The SME-style Lorentz-test family supplies a second, non-PPN layer. Photon-sector cavity tests constrain two-way orientation-dependent frequency shifts at the $\Delta\nu/\nu\sim10^{-18}$ level, while the SME data tables organize photon, matter, neutrino, and gravity coefficients in the standard Sun-centered frame. For this chapter the safe import is not a new ontology. It is the validation rule that any effective metric or clock/ruler channel must report which SME-like residual it would excite:
$$
\epsilon_{\mathrm{SME}}^{\mathrm{eff}}
=
\max\left(
\|\tilde\kappa_{e-}^{\mathrm{eff}}\|,
\|\tilde\kappa_{o+}^{\mathrm{eff}}\|,
|\tilde\kappa_{\mathrm{tr}}^{\mathrm{eff}}|,
\|\bar{s}^{\mu\nu}_{\mathrm{eff}}\|
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7d3f70259b490fe2)
with $\tilde\kappa_{\bullet}^{\mathrm{eff}}$ used as photon-sector comparison coefficients and $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ used as a gravity-sector comparison coefficient. These are observer-level projection diagnostics; they are not substrate coefficients added to the Euclidean void.

### Closure Program Interface (Observable Decision Layer)

This chapter is the observable-side gate for the emergent-metric closure.

Define the PPN decision vector:
$$
\mathbf{p}_{\mathrm{PPN}}=
\bigl(
\gamma_{\mathrm{PPN}}-1,\,
\beta_{\mathrm{PPN}}-1,\,
\xi_{\mathrm W},\,
\alpha_1,\,
\alpha_2,\,
\alpha_3,\,
\zeta_1,\,
\zeta_2,\,
\zeta_3,\,
\zeta_4
\bigr)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1b977b605cbf14fe)
The weak-field closure target is
$$
\mathbf{p}_{\mathrm{PPN}}\approx \mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c2a65ff49642965e)
within the benchmark tolerances listed in the validation ledger.

The synthetic calibration and likelihood sections below remain explicitly reduced fits over $(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3)$. They do not numerically evaluate $\xi_{\mathrm W}$, $\zeta_i$, or the Lense-Thirring source-current row, so passing those reduced examples is not full PPN closure.

Cross-chapter integration:
- constitutive map source: [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- clock-law coefficient extraction: [spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- threshold enforcement: [validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)

### ADM/Cartan Extraction Equations

The PPN vector must be extracted from the same ADM/Cartan fields used by the effective metric map, not from observable-specific fits. With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the line element
$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7c1521e0a983e8d8)
gives the observer-sector metric components
$$
g_{00}^{\mathrm{eff}}
=
-N^2+\frac{\gamma_{ij}^{\mathrm{eff}}u^i_{\mathrm{sea,eff}}u^j_{\mathrm{sea,eff}}}{c_0^2},
\qquad
g_{0i}^{\mathrm{eff}}
=
-\frac{\gamma_{ij}^{\mathrm{eff}}u^j_{\mathrm{sea,eff}}}{c_0},
\qquad
g_{ij}^{\mathrm{eff}}=\gamma_{ij}^{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-19c2cccc2a2a1bbf)

In the local Noether sea rest weak-field row, write
$$
N
=
1-\frac{U_{\Phi}}{c_0^2}
+C_2^{(\Phi)}\frac{U_{\Phi}^2}{c_0^4}
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2bc4bb418f65a5c3)
and extract
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^2}{2U_{\Phi}}
\left(
\frac{h^{ij}\gamma_{ij}^{\mathrm{eff}}}{3}-1
\right)
+O(U_{\Phi}/c_0^2,\epsilon_{\mathrm{LV}}),
\qquad
\beta_{\mathrm{PPN}}-1=C_2^{(U)}-\frac12
$$

[View →](../../../../../equation-mapping.html#corpus-equation-126fe46ea130e20a)
The preferred-frame coefficients are the retained group velocity coefficients in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$ under the $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ expansion above, with
$$
\alpha_1=\Xi_1,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5b0443421239c8c3)

This extraction is the dictionary for the coefficient scaffold in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md#admcartan-reconstruction-surface). If
$$
\delta n=a_n\frac{U}{c_0^2},\qquad
\delta\chi=a_\chi\frac{U}{c_0^2},\qquad
\varphi=-\frac{U}{c_0^2}+O(U^2/c_0^4),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4b16a5feda96d58a)
then its scalar and spatial first-order rows must satisfy
$$
A_N^n a_n+A_N^\chi a_\chi-A_N^\Phi=-1,
\qquad
2\gamma_{\mathrm{PPN}}
=
A_\gamma^n a_n+A_\gamma^\chi a_\chi-A_\gamma^\Phi.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3d031d3d6a5836bf)
The coefficient $C_2^{(U)}$ is the complete coefficient of $(U/c_0^2)^2$ after $Q_N$ and the second-order pieces of $\delta n$, $\delta\chi$, and $\varphi$ are combined. It cannot be read from $Q_N$ alone.

The group velocity row must contain both scalar and anisotropic PPN potentials:
$$
u^i_{\mathrm{sea,eff}}
=
D_U w^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w^j\frac{U^i{}_j}{c_0^2}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1b11df1a936ad0d1)
At leading order in $g_{0i}^{\mathrm{eff}}=-\gamma_{ij}^{\mathrm{eff}}u^j_{\mathrm{sea,eff}}/c_0$, this gives
$$
D_U=\frac{\Xi_1}{2},
\qquad
D_{\mathrm{aniso}}=\Xi_2.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-285e45aa68e32bb5)
The remaining $\Xi_3$ and $\Xi_4$ require the quadratic group velocity terms in the lapse scaffold together with the shift-squared contribution to $g_{00}^{\mathrm{eff}}$. A scalar-only group velocity row has no $\Xi_2$ slot and therefore cannot be tested against the tight $\alpha_2$ channel.

For a declared observation window $W$ and retained record tuple $\theta$, the shared weak-field residual can be recorded as
$$
\mathbf{r}_{\mathrm{weak}}(\theta;W)
=
\begin{pmatrix}
R_{\mathrm{red}}\\
R_{\mathrm{Shap}}\\
R_{\mathrm{lens}}\\
R_{\mathrm{acc}}\\
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c648ba8893f9e4d2)
with
$$
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W}
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e1f1412704f76337)
The other residuals are the redshift, Shapiro, and lensing differences computed from the same retained record tuple $\theta$ and the forward projection below. This strengthens the existing decision layer; it is not a separate gate.

### Numeric Closure Pipeline and Global Objective

To enforce cross-observable closure without parameter bloat, use a single constitutive vector and a fixed projection to the PPN decision manifold.

Define the PPN constitutive vector
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}
\equiv
\begin{pmatrix}
\gamma_{\mathrm{PPN}}\\
C_2\\
\Xi_1\\
\Xi_2\\
\Xi_3
\end{pmatrix},
\qquad
\mathbf{p}_{\mathrm{PPN}}
\equiv
\begin{pmatrix}
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4975357010f06213)
Using
$$
\beta_{\mathrm{PPN}}-1=\left(\frac{1+2C_2}{2}\right)-1=C_2-\frac12,
\qquad
\alpha_1=\Xi_1,\ \alpha_2=\Xi_2,\ \alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbe38ebcbeea53fb)
the map is the exact linear projection
$$
\mathbf{p}_{\mathrm{PPN}}=\mathbf{J}\boldsymbol{\vartheta}_{\mathrm{PPN}}-\mathbf{p}_0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-30fd903420954368)
with
$$
\mathbf{p}_0=
\begin{pmatrix}
1\\[2pt]
\frac12\\[2pt]
0\\
0\\
0
\end{pmatrix},
\qquad
\mathbf{J}
=
\begin{pmatrix}
1 & 0 & 0 & 0 & 0\\
0 & 1 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 0\\
0 & 0 & 0 & 1 & 0\\
0 & 0 & 1 & -1 & -1
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-74a697c00643ff13)

If $\Sigma_{\vartheta}$ is the covariance of the constitutive fit from micro-simulations, propagate uncertainty by
$$
\Sigma_{\mathrm{PPN}}=\mathbf{J}\Sigma_{\vartheta}\mathbf{J}^{\mathsf T}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-27282666c071ea37)

Define the single Tier-1 weighted closure objective
$$
\mathcal{L}(\boldsymbol{\vartheta}_{\mathrm{PPN}})=\mathbf{p}_{\mathrm{PPN}}^{\mathsf T}\mathbf{W}\,\mathbf{p}_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-94599078355f0e1e)
where $\mathbf{W}$ is the precision matrix from ledger tolerances. With the source-mined benchmark vector above,
$$
\mathbf{W}
=
\operatorname{diag}\!\left(
(2.3\times10^{-5})^{-2},
(8\times10^{-5})^{-2},
(4\times10^{-5})^{-2},
(2\times10^{-9})^{-2},
(4\times10^{-20})^{-2}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-543cc1b21431fe17)

Forward-only evaluation rule:
1. Calibrate $\boldsymbol{\vartheta}_{\mathrm{PPN}}$ and $\Sigma_{\vartheta}$ from micro-scale clock/refraction simulations.
2. Project once to $(\mathbf{p}_{\mathrm{PPN}},\Sigma_{\mathrm{PPN}})$ and evaluate $\mathcal{L}(\boldsymbol{\vartheta}_{\mathrm{PPN}})$.
3. Predict macroscopic observables (Shapiro, precession, redshift, lensing) with this fixed parameter set.
4. If any observable fails its ledger gate, reject the constitutive map; do not refit per observable.

### Forward Observable Projection (Weak-Field Classical Set)

To force cross-observable closure in a single forward pass, define
$$
\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})
\equiv
\begin{pmatrix}
\Delta t_{\text{Shap}}\\
\Delta\phi_{\text{Def}}\\
\Delta\omega_{\text{Prec}}\\
z_{\text{Red}}
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9765a56f27b2fa0d)
Using the weak-field constitutive map of $\mathbb{A}\mathbb{A}\mathbb{A}$:

1. Shapiro delay:
$$
O_1(\boldsymbol{\vartheta}_{\mathrm{PPN}})=K_{\text{Shap}}(1+\gamma_{\mathrm{PPN}}),
\qquad
K_{\text{Shap}}=
\frac{GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-123a47b0bb2b95c1)
For two-way radar-style Shapiro measurements, apply the same kernel on each leg and sum the two one-way contributions.
2. Light deflection:
$$
O_2(\boldsymbol{\vartheta}_{\mathrm{PPN}})=K_{\text{Def}}(1+\gamma_{\mathrm{PPN}}),
\qquad
K_{\text{Def}}=\frac{2GM}{b\,c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d19742985691a82c)
3. Perihelion precession per orbit:
$$
O_3(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Prec}}\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
=
K_{\text{Prec}}\left(1.5+2\gamma_{\mathrm{PPN}}-C_2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c5973d4fbefb8e3f)
$$
K_{\text{Prec}}=\frac{2\pi GM}{a(1-e^2)c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-44732eb0483d4e3f)
4. Gravitational redshift (to retained order):
$$
O_4(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Red1}}-K_{\text{Red2}}C_2,
\qquad
K_{\text{Red1}}=\frac{\Delta U}{c_0^2},
\quad
K_{\text{Red2}}=\frac{\Delta(U^2)}{c_0^4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60b5a1b9dbf68ce8)

First-order observable sensitivities are
$$
\mathbf{J}_O
\equiv
\frac{\partial\mathbf{O}}{\partial\boldsymbol{\vartheta}_{\mathrm{PPN}}}
=
\begin{pmatrix}
K_{\text{Shap}} & 0 & 0 & 0 & 0\\
K_{\text{Def}} & 0 & 0 & 0 & 0\\
2K_{\text{Prec}} & -K_{\text{Prec}} & 0 & 0 & 0\\
0 & -K_{\text{Red2}} & 0 & 0 & 0
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fdc30f37212861d7)
and the propagated covariance is
$$
\Sigma_O=\mathbf{J}_O\Sigma_{\vartheta}\mathbf{J}_O^{\mathsf T}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3b36a186884b546a)
For this spherically symmetric classical set, preferred-frame channels $(\Xi_1,\Xi_2,\Xi_3)$ decouple at leading order; they are constrained by dedicated group velocity/leakage observables.

### Worked Solar-System Reference Projection (Synthetic Calibration Example)

Use
$$
\frac{GM_\odot}{c_0^2}=1.4766\times 10^3\ \mathrm{m},
\qquad
\frac{GM_\odot}{c_0^3}=4.925\times 10^{-6}\ \mathrm{s}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-976c7205bbf9ab2f)
with reference kernels
$$
K_{\text{Shap}}=70.4\ \mu\mathrm{s},
\quad
K_{\text{Def}}=0.875'' ,
\quad
K_{\text{Prec}}=14.3''/\mathrm{cy},
\quad
K_{\text{Red1}}=2.12\times 10^{-6},
\quad
K_{\text{Red2}}=4.50\times 10^{-12}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-52252920a430478d)
Take a synthetic constitutive fit
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}
=
\begin{pmatrix}
1+1.2\times 10^{-5}\\
0.5+0.8\times 10^{-5}\\
10^{-18}\\
-0.5\times 10^{-18}\\
0.2\times 10^{-18}
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e85ed6c8925ba8ef)
$$
\Sigma_{\vartheta}=
\operatorname{diag}\!\left(
0.25\times 10^{-10},
0.16\times 10^{-10},
10^{-36},
10^{-36},
10^{-36}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8396d65f7345b2e)
This block is an internal consistency projection example, not a claim of experimental pass/fail by itself.

Projection to decision space gives
$$
\gamma_{\mathrm{PPN}}-1=1.2\times 10^{-5},
\quad
\beta_{\mathrm{PPN}}-1=0.8\times 10^{-5},
\quad
(\alpha_1,\alpha_2,\alpha_3)=\left(10^{-18},-0.5\times 10^{-18},1.3\times 10^{-18}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-104d8de3bee654e7)
Forward observables are
$$
\Delta t_{\text{Shap}}=140.80084\ \mu\mathrm{s},
\quad
\Delta\phi_{\text{Def}}=1.75001\,\mathrm{arcsec},
\quad
\Delta\omega_{\text{Prec}}=42.9002\,\mathrm{arcsec}/\mathrm{cy}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-93df7884565949aa)
$$
z_{\text{Red}}\approx 2.119997\times 10^{-6}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2c7788c527cfeea2)
Propagated $1\sigma$ scales (diagonal approximation) are
$$
\sigma_{\text{Shap}}\approx 3.5\times 10^{-4}\ \mu\mathrm{s},
\quad
\sigma_{\text{Def}}\approx 4.3\times 10^{-6}\,\mathrm{arcsec},
\quad
\sigma_{\text{Prec}}\approx 1.5\times 10^{-4}\,\mathrm{arcsec}/\mathrm{cy},
\quad
\sigma_{\text{Red}}\approx 1.8\times 10^{-17}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9c4d39dd2a0e51a4)

Failure rule for this closure layer: if any observed value lies outside
$$
\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})\pm 3\sqrt{\operatorname{diag}(\Sigma_O)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-14517e5f6c9a6b35)
the constitutive map fails this gate and must be replaced rather than re-fit per observable.

### Benchmark-Input Joint Likelihood (Reduced Fit)

This reduced likelihood uses benchmark rows as inputs to test internal projection consistency; it is not an archived end-to-end reprocessing of the raw experiments. Using the forward map above, define the joint likelihood
$$
\ln \mathcal{L}(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
-\frac{1}{2}
\bigl(\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})-\mathbf{O}_{\text{obs}}\bigr)^{\mathsf T}
\Sigma_{\text{obs}}^{-1}
\bigl(\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})-\mathbf{O}_{\text{obs}}\bigr)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b7c02cfd6b2ac26c)
with
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}=
\left(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3\right)^{\mathsf T}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bcadb607c738319d)

Benchmark observable inputs for the classical weak-field suite are:
1. Cassini Shapiro: $\gamma_{\text{obs}}-1=(2.1\pm2.3)\times 10^{-5}$.
2. VLBI solar deflection: $\gamma_{\text{obs}}-1=(-0.8\pm1.2)\times 10^{-4}$.
3. Mercury precession combination: $(2\gamma_{\text{obs}}-\beta_{\text{obs}})=1\pm 3.0\times 10^{-5}$.
4. Galileo/GPA redshift channel: first-order limit $\sim 2.5\times 10^{-5}$ with weak second-order sensitivity to $C_2$.

For this spherical classical set, the Jacobian structure satisfies
$$
\frac{\partial \mathbf{O}}{\partial \Xi_1}
=
\frac{\partial \mathbf{O}}{\partial \Xi_2}
=
\frac{\partial \mathbf{O}}{\partial \Xi_3}
=
\mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8c34c634287effe)
so the Fisher matrix is rank-2 in this fit and $(\Xi_1,\Xi_2,\Xi_3)$ remain unconstrained by this subset alone.

The following is an inline reduced-fit example using the first three declared rows above. The Galileo/GPA row is not included because no second-order central value and covariance are specified here.

Reducing to $\boldsymbol{\vartheta}_{\mathrm{red}}=(\gamma_{\mathrm{PPN}},C_2)^{\mathsf T}$, the inferred covariance is
$$
\Sigma_{\mathrm{red}}
=
\begin{pmatrix}
5.1\times 10^{-10} & 1.02\times 10^{-9}\\
1.02\times 10^{-9} & 2.94\times 10^{-9}
\end{pmatrix}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dea4d6aef888f9c5)
with maximum-likelihood point
$$
\gamma_{\mathrm{PPN}}=1+(1.74\pm2.26)\times 10^{-5},
\qquad
C_2=0.5+(3.48\pm5.42)\times 10^{-5}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b87c0650e73c26bb)
and correlation
$$
\rho(\gamma_{\mathrm{PPN}},C_2)=+0.83
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7499eca0d2948665)

Interpretation for closure:
1. A single constitutive vector can fit the selected classical observables without per-observable retuning; read this as consistency of the projection algebra, not independent evidence for the constitutive map.
2. Preferred-frame channels require additional group-velocity-sensitive observables (LLR, pulsar timing, dedicated anisotropy tests) to close $(\Xi_1,\Xi_2,\Xi_3)$.
3. The positive $\gamma_{\mathrm{PPN}}$-$C_2$ covariance defines the accepted trade-off direction when matching precession jointly with refractive observables.

### Preferred-Frame Parameter Degeneracy Resolution (Augmented Likelihood)

Define the preferred-frame constitutive vector
$$
\boldsymbol{\Xi}\equiv(\Xi_1,\Xi_2,\Xi_3)^{\mathsf T}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4bbcf405465c674e)
For the spherical classical set above, $\boldsymbol{\Xi}$ is unconstrained. For an expanded group-velocity-sensitive baseline (ephemerides + LLR + anisotropy channels), treat the preferred-frame Fisher block as
$$
\mathcal{I}_{\Xi,\text{base}}
=
-\mathbb{E}\!\left[
\nabla_{\boldsymbol{\Xi}}
\nabla_{\boldsymbol{\Xi}}^{\mathsf T}
\ln \mathcal{L}_{\text{base}}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f5254ca7845d50ce)
with rank-2 degeneracy and null direction $\hat n$:
$$
\mathcal{I}_{\Xi,\text{base}}\hat n=\mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5ffaf1982db92845)

Minimal augmentation:
1. Binary-pulsar eccentricity drift channel $\dot e$ (orbital polarization sensitivity).
2. Solitary millisecond-pulsar spin channel $\dot P$ (self-acceleration sensitivity).

Use joint likelihood
$$
\ln \mathcal{L}_{\text{joint}}(\boldsymbol{\Xi}\mid\mathcal{D})
=
\ln \mathcal{L}_{\text{base}}
+\ln \mathcal{L}_{\dot e}
+\ln \mathcal{L}_{\dot P}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76efce7a837881a6)
The augmented Fisher matrix is
$$
\mathcal{I}_{\Xi,\text{total}}
=
\mathcal{I}_{\Xi,\text{base}}
+\frac{1}{\sigma_{\dot e}^2}
\left(\nabla_{\boldsymbol{\Xi}}\dot e\right)\!
\left(\nabla_{\boldsymbol{\Xi}}\dot e\right)^{\mathsf T}
+\frac{1}{\sigma_{\dot P}^2}
\left(\nabla_{\boldsymbol{\Xi}}\dot P\right)\!
\left(\nabla_{\boldsymbol{\Xi}}\dot P\right)^{\mathsf T}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2e1587a5a29865a8)

Degeneracy-lift criterion:
$$
\det\!\left(\mathcal{I}_{\Xi,\text{total}}\right)>0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3707e632855e6e07)
which is equivalent to nonzero projection of the added gradient span onto the null direction $\hat n$.

Operational closure consequence: if this criterion is met with real timing data, the posterior over $(\Xi_1,\Xi_2,\Xi_3)$ closes to a bounded ellipsoid instead of a flat valley.

Failure mode for the constitutive cosmology map: if the inferred $\boldsymbol{\Xi}$ is significantly nonzero and incompatible with the independently inferred medium-drift direction from the CMB dipole, the single preferred-frame mapping in $\mathbb{A}\mathbb{A}\mathbb{A}$ is broken.

The acceptance record for this layer requires Noether sea continuum simulations to supply
$$
\nabla_{\boldsymbol{\Xi}}\dot e,\qquad
\nabla_{\boldsymbol{\Xi}}\dot P
$$

[View →](../../../../../equation-mapping.html#corpus-equation-94047a5df9087f85)
for the group-velocity-sensitive channels that lift the preferred-frame degeneracy.

## Gravitational Waves

This chapter provides a conditional closure chain from the emergent-metric weak-field map to testable gravitational-wave observables. It is one branch of the observational closure stack summarized in [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md) and constrained by [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md).

Interface chapters:
- Effective metric map: [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md)
- PPN closure and refractive weak field: [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- Phenomenology summary: [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md)

### Weak-Field Setup

Assume an effective metric
$$
g_{\mu\nu}^{\text{eff}}=\eta_{\mu\nu}+h_{\mu\nu},
\qquad
|h_{\mu\nu}|\ll1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b9ed8fe3f6ed8143)
with background Noether sea state homogeneous and isotropic at leading order.

Define trace-reversed perturbation
$$
\bar h_{\mu\nu}=h_{\mu\nu}-\frac12\eta_{\mu\nu}h,\qquad
h=\eta^{\alpha\beta}h_{\alpha\beta}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60e4e1d7e2fb4dd3)
Here $h_{\mu\nu}$, $\bar h_{\mu\nu}$, and the trace $h$ are observer-sector perturbation variables of $g_{\mu\nu}^{\text{eff}}$. They are distinct from the native Euclidean spatial metric $h_{ij}=\delta_{ij}$ on $\Sigma_T$, which does not appear below.

Impose Lorenz gauge
$$
\partial^\mu \bar h_{\mu\nu}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ff85e1e1470a4a3)

Assume constitutive closure supplies effective $(G_{\text{eff}},c_{\text{GW}}^{\mathrm{eff}})$ in this regime. The speed row is the gravitational-wave component of the structural-integrity common-limit closure in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure): the weak-field tensor channel must share the same Noether sea state record that supports photon timing, PPN, redshift, Shapiro delay, and lensing. In the multi-messenger branch, the explicit common-mode residual is
$$
R_{\mathrm{GW}\gamma}
\equiv
\frac{c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma}{c_\gamma},
\qquad
|R_{\mathrm{GW}\gamma}|\lesssim10^{-15}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a47965dc1f32587c)
at the GW170817/GRB 170817A scale, after source-emission lag and propagation-path conventions are declared. A model that gives the effective gravitational channel and the photon channel independently tunable limiting speeds has failed this row before any black-hole or cosmological interpretation can use the gravitational-wave record.

The same row is also a $\chi_{\text{sea}}$ identity condition. The Noether sea delay factor that dresses photon-channel timing to $c_\gamma$ cannot split into a photon-only value and a tensor-only value; it must dress the effective gravitational channel to $c_{\mathrm{GW}}^{\mathrm{eff}}$ within the declared multimessenger tolerance. Otherwise the branch has preserved the language of one medium while using two transport laws.

Coherent photon/gravity conversion comparisons belong at this same shared-record level. They are useful only if the photon channel and the effective gravitational channel read from one Noether sea state, one speed/delay convention, and one event ledger. A proposed conversion amplitude, phase lock, or common propagation speed cannot be used as evidence for a new carrier unless it also preserves the GW170817-style timing row, photon nondispersion, image coherence, and the tensor-mode detector record.

### Linear Wave Equation

**Closure Target 1 (linearized propagation equation).** Under weak-field, slow-background variation, linear constitutive response, and the predicate that the homogeneous isotropic background Noether sea is an equilibrium of the constitutive dynamics — an open dependency carried by the provisional sea-equilibrium packet below — the transverse-traceless sector must recover
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}
=
\frac{16\pi G_{\text{eff}}}{(c_{\text{GW}}^{\mathrm{eff}})^4}\,T_{\mu\nu}^{\text{TT}},
\qquad
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\equiv
-\frac{1}{(c_{\text{GW}}^{\mathrm{eff}})^2}\partial_{t_{\mathrm{eff}}}^2
+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^i}\partial_{x_{\mathrm{eff}}^j}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f095d65d0b76523e)

This display is the GR-normalized observer-level target, not a derived lemma. A native derivation must obtain three ingredients from one constitutive record: the tensor kinetic normalization, the source coupling $16\pi G_{\text{eff}}/(c_{\text{GW}}^{\text{eff}})^4$, and the constraints that remove non-TT components. Linearizing an assumed effective field equation would check its consequences but would not derive any of those ingredients from Noether sea dynamics.

**Corollary 1 (source-free effective waves).** For $T_{\mu\nu}^{\text{TT}}=0$:
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a11345c5d2a49b99)
so plane waves satisfy
$$
\omega^2=(c_{\text{GW}}^{\mathrm{eff}})^2k^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1cec7192fcc802c0)
to leading order (higher-order dispersive corrections are constitutive and model-dependent).

Finite-range comparison models may introduce gravitational-wave dispersion, but here that is only a deviation diagnostic. Define the group speed
$$
v_{\mathrm{g,GW}}\equiv\frac{\partial\omega}{\partial k}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-97498bc03ef91bbc)
In validated frequency bands the constitutive map must satisfy
$$
\left|\frac{v_{\mathrm{g,GW}}-c_0}{c_0}\right|<\epsilon_{\mathrm{GW}},
\qquad
\left|\frac{\omega}{c_0^2}\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}}\leq\epsilon_{\mathrm{disp}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5ceef2cd831fb52)
so $\epsilon_{\mathrm{disp}}$ is a dimensionless band tolerance. The integrated phase drift across the source distance must remain below the detector residual bound. A finite-range cosmological response is not acceptable if it leaks into already-tested gravitational-wave timing as measurable dispersion.

The same finite-range comparison must also supply a low-frequency forecast rather than leaving drift unconstrained below current ground-based event bands. For a declared pulsar-timing or space-interferometer band $\mathcal{B}_{\mathrm{low}}$, define the accumulated phase drift
$$
\Delta\phi_{\mathrm{GW,low}}^{\theta}(f)
=
\int_{\Gamma}
\left[
k_{\theta}(f,x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
-
k_{\mathrm{GR}}(f,x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
\right]\,d\ell
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b8be6f7e350de9ec)
where $\Gamma$ is the observer-level propagation path used by the comparison. A useful low-frequency residual is
$$
\mathcal{R}_{\mathrm{GW,low}}(\theta)
=
\sup_{f\in\mathcal{B}_{\mathrm{low}}}
\frac{
\left|\Delta\phi_{\mathrm{GW,low}}^{\theta}(f)\right|
}{\epsilon_{\phi}(f)}
+
\sup_{f\in\mathcal{B}_{\mathrm{low}}}
\frac{
\left|v_{\mathrm{g,GW}}^{\theta}(f)-c_0\right|
}{c_0\,\epsilon_{v}(f)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-552eef65801a0562)
This is a forecast and comparison gate. It does not license a massive-graviton ontology; it only says that any cosmological-scale weakening channel must remain compatible with the low-frequency strain and timing residuals that would test long-wavelength dispersion.

### Medium-Transport Perturbation

For cosmology-facing transport work, gravitational waves should also be treated as bounded perturbations of the same Noether sea state used by redshift and dark-energy modules. In the provisional Noether braid equilibrium packet,

$$
\partial_T f_N
+\nabla_{\mathbf X}\cdot(\mathbf u_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1441995045972f54)

the term $S_{\mathrm{GW}}$ records the disturbance of the local Noether braid cadence distribution by the gravitational-wave channel. It is not an additional default polarization mode and not a license for frequency-dependent gravitational-wave propagation in validated bands. It is a possible low-amplitude contribution to the Noether sea state later sampled by photons, clocks, and growth observables.

The redshift-facing projection should therefore be bounded as a perturbation of the path-rate functional:

$$
\delta\alpha_{\mathrm{prop},X}^{\mathrm{GW}}
=
\mathcal{A}_{X,\mathrm{GW}}\!\left[
S_{\mathrm{GW}},f_N,J_\nu;x_{\mathrm{eff}}^i,t_{\mathrm{eff}},\hat{\mathbf{k}}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9742273c07570907)

with the associated beam variance, chromaticity residual, and packet time-dilation residual below the same tolerances used for the redshift budget. If $S_{\mathrm{GW}}$ produces measurable photon dispersion, image blur, or gravitational-wave timing drift beyond the detector gates above, the perturbative transport branch fails.

### Polarization Content

In the project spin taxonomy, this is the effective **spin-2 / tensor** channel: the wave is not a scalar breathing mode or a single-axis vector mode, but a transverse-traceless deformation carrying quadrupolar shape data.

**Conditional Lemma 2 (two-mode TT closure in isotropic limit).** If the low-energy constitutive response is parity-even and isotropic, residual gauge constraints leave exactly two propagating tensor modes:
$$
h_+(t_{\mathrm{eff}},x_{\mathrm{eff}}^i),\qquad h_\times(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-48b9c603afb9b52a)

*Derivation sketch:* Standard counting in Lorenz gauge plus TT projection gives 10 components $\to$ gauge/constraint reduction $\to$ two physical helicity-2 modes, provided the effective-metric gauge structure is recovered by the constitutive map.

Any scalar, vector, or longitudinal gravitational-wave response is therefore an effective deviation to be bounded, not a new default channel:
$$
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}<\epsilon_{\mathrm{pol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-db5522b8794b4a6c)
The numerator collects non-TT detector power after known instrumental and astrophysical residuals are removed.

The tolerance $\epsilon_{\mathrm{pol}}$ must be attached to a declared detector analysis rather than inferred from the two-mode count. For example, the three-detector GW170814 pure-polarization comparison favored the pure-tensor hypothesis over pure-vector and pure-scalar alternatives by Bayes factors of order $2\times10^2$ and $10^3$, respectively. Those model-selection factors constrain the pure alternatives; they are not by themselves a bound on a small non-TT admixture. A mixed-mode power limit requires the corresponding tensor-plus-extra-mode likelihood and detector network response.

### Detector-Side Inference Gate

The detector does not observe the effective tensor mode as a bare ontological object. It records a processed strain channel whose interpretation depends on calibration, background rejection, waveform matching, and coincidence checks across instruments. For a candidate gravitational-wave record $\theta_{\mathrm{GW}}$, keep the residual vector explicit:

$$
\mathbf{R}_{\mathrm{GW}}(\theta_{\mathrm{GW}})
=
\left(
\frac{v_{\mathrm{g,GW}}-c_0}{c_0},\;
\left.\frac{\omega}{c_0^2}\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}},\;
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}},\;
\mathrm{FAR},\;
R_{\mathrm{cal}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07a2aa1645b2e4cb)

where $\mathrm{FAR}$ is the false-alarm-rate estimate and $R_{\mathrm{cal}}$ is the retained calibration residual for the strain channel and timing model. Promotion from a candidate disturbance to an accepted gravitational-wave data product requires

$$
\max_i \frac{|R_{\mathrm{GW},i}|}{\epsilon_{\mathrm{GW},i}}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c2bf29599c3b8790)

with the tolerances fixed by the validation band. This gate protects the separation between the observable data product and the ontology: the data product is a calibrated, coincident, low-residual strain record, while the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must still earn the claim that the record is the tensor-sector response of the effective metric induced by Noether sea constitutive dynamics.

Coincidence is part of the data product, not an afterthought. For a detector network with instruments $D_a$, calibrated strain streams $s_a(t_{\mathrm{eff}})$, response templates $h_a^\theta(t_{\mathrm{eff}})$, and allowed light-speed timing windows $\Delta t_{ab}^{\mathrm{geom}}$, define
$$
\mathcal{R}_{\mathrm{coin}}(\theta)
=
\sum_a
\left\|
s_a-\mathcal{P}_{D_a}h^\theta
\right\|_{C_a^{-1}}^2
+
\sum_{a<b}
\frac{
\left(
\Delta t_{ab}^{\mathrm{fit}}-\Delta t_{ab}^{\mathrm{geom}}
\right)^2
}{
\sigma_{ab}^2
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8111838f90ffa02e)
This residual is the modern version of the separated-detector check: a signal must be coherent across instruments after antenna response, timing, calibration, and background rejection are fixed. An isolated excess in one detector, or a coincidence that requires an implausible source energy after the same response projection, remains a candidate disturbance rather than an accepted gravitational-wave record.

Public GWOSC/LVK claims must also pass the packet protocol in [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md#public-gravitational-wave-benchmark-protocol) before they support strong-field or effective-metric claims. The public packet fixes event version, strain files, detector masks, parameter-estimation release, waveform family, calibration notes, analysis window, nuisance record, and artifact hashes before residual evaluation. This makes the detector-side gate replayable rather than a general statement that gravitational-wave observations are available.

**Closure Target 2A (graviton-comparison detectability residual).** When a detector record is compared with a quantum-gravity language, keep the comparison at observer level. A calibrated classical strain event does not become a single-quantum detection merely because a graviton basis can be used for bookkeeping. For a narrowband comparison with angular frequency $\omega$ and strain amplitude $A_{\mathrm{GW}}$, retain the occupation lower bound
$$
N_{\mathrm{occ}}
\ge
\frac{
\rho_{\mathrm{GW}}
}{
\rho_1
},
\qquad
\rho_{\mathrm{GW}}
\sim
\frac{c_0^2}{32\pi G_{\mathrm{eff}}}\omega^2 A_{\mathrm{GW}}^2,
\qquad
\rho_1
\lesssim
\frac{\hbar\omega^4}{c_0^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6450dc70a1b9634e)
The accepted gravitational-wave record is therefore classical whenever $N_{\mathrm{occ}}\gg1$. A separate single-quantum claim would need a detector-side packet $\theta_{\mathrm{1g}}$ satisfying
$$
\mathcal{R}_{\mathrm{1g}}(\theta_{\mathrm{1g}})
=
\max\left(
\frac{|N_{\mathrm{occ}}-1|}{\epsilon_N},
\frac{\delta_{\mathrm{det}}}{\delta_{\mathrm{req}}},
\frac{2G_{\mathrm{eff}}M_{\mathrm{det}}}{c_0^2D_{\mathrm{det}}},
\frac{B_{\mathrm{th}}}{S_{\mathrm{1g}}^2}
\right)
\le
1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8333391f05bfbc94)
with $\delta_{\mathrm{req}}\sim L_{\mathrm{P}}$ for a single-graviton interferometric distance readout, $\delta_{\mathrm{det}}$ the achieved distance uncertainty, $M_{\mathrm{det}}$ and $D_{\mathrm{det}}$ the detector mass and size, $S_{\mathrm{1g}}$ the predicted single-graviton count, $B_{\mathrm{th}}$ the relevant thermal or particle-background count, and $\epsilon_N$ the allowed occupation-window tolerance. The compactness term prevents a sensitivity claim from hiding a black-hole detector; the background term prevents a thermal-graviton claim from being promoted when statistical scatter in known backgrounds dominates the putative count. Failure of this residual does not refute gravitons as a comparison basis and does not add graviton ontology to $\mathbb{A}\mathbb{A}\mathbb{A}$; it only blocks the stronger detector claim that an observed strain or thermal count has directly resolved individual quanta.

The detector-side packet should also declare which single-quantum route is being claimed. A direct interferometric route must satisfy the Planck-scale distance row without violating the compactness bound. An absorption or scattering route must show that the interaction cross-section and exposure yield a count above neutrino, thermal, and apparatus-background channels. A photon/gravity conversion route must show that the magnetic-field and coherence conditions needed for conversion do not themselves destroy the shared photon-channel and tensor-channel record through pair production, vacuum polarization, or phase decoherence. These are not separate ontologies; they are route-specific projections of the same single-quantum residual.

A resonant-mass or phonon-style coincidence therefore needs one more separation before it becomes evidence for quantized gravity itself. A cooled bar may register a single vibrational excitation coincident with a calibrated gravitational-wave event, and an optical Weber-bar comparison may convert time-dependent gravitational-wave modulation into a photon phase or energy shift. Those are detector-side quantum transitions unless the packet also reports whether the incoming gravitational state is classical, coherent with huge occupation number, or deliberately prepared in a nonclassical state. A classical gravitational wave can still raise the transition probability of a quantized detector, just as a classical electromagnetic field can drive transitions in quantized matter. The stronger claim is not a detector click, but a detector click plus source-state evidence that rules out the corresponding classical driving account.

This is the Dyson lesson in current terminology. The durable comparison is not that individual gravitons are impossible by definition, but that any single-quantum claim must close the detector sensitivity, compactness, background, and occupation rows at the same time. A classical strain packet with huge occupation number remains a gravitational-wave recovery success without becoming a single-graviton observation.

When $\theta_{\mathrm{GW}}$ is also used to support a finite-range or dark-energy comparison, $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ must be carried beside this detector residual. Passing a high-frequency event-timing gate alone is not enough to promote a long-wavelength dispersion claim.

### Merger and Ringdown Horizon-Interface Gate

Stationary no-hair agreement is not enough to close the dynamical strong-field problem. If a black-hole model changes the horizon-interface boundary condition during formation, merger, or evaporation, the change must be tested against the detector-facing waveform packet and the same final compact-object labels used by exterior GR.

For a candidate horizon-interface record $\theta_H$, let $h_{\ell m}^{\theta_H}(t_{\mathrm{eff}})$ be the effective strain modes predicted after projection through the detector response, and let $D_{\mathrm{merge}}^{\mathrm{obs}}$ collect the observed inspiral, merger, ringdown, calibration, and covariance packet. This observed packet must be sourced from the same versioned GWOSC/LVK event row and artifact hashes used by $\mathcal{C}_{\mathrm{GW}}$ when ringdown is used as strong-field evidence. A compact residual is
$$
\mathcal{R}_{\mathrm{merge}}(\theta_H)
=
\left\|
D_{\mathrm{merge}}^{\mathrm{obs}}
-
\mathcal{P}_{\mathrm{det}}\{h_{\ell m}^{\theta_H}\}
\right\|_{C_{\mathrm{merge}}^{-1}}^2
+
d_{\mathrm{nohair}}\!\left(
(M_f,\mathbf{J}_f,Q_f)^{\theta_H},
(M_f,\mathbf{J}_f,Q_f)^{\mathrm{obs}}
\right)
+
d_{\mathrm{shared}}(\theta_H,\theta_{\mathrm{GW}},\theta_{\mathrm{BH}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd58b35783fa5107)
Here $Q_f$ is the final exterior charge/no-hair label in the Kerr-Newman comparison, not a quadrupole-deviation tensor. The projection $\mathcal{P}_{\mathrm{det}}$ is the detector projection, and $d_{\mathrm{shared}}$ penalizes any fit that uses one state record for the strain channel, another for the horizon-interface label, and another for the black-hole entropy or release ledger. The gate is satisfied only if $\mathcal{R}_{\mathrm{merge}}(\theta_H)$ is below the declared tolerance while preserving the validated inspiral limit, the two tensor polarizations, and the final exterior no-hair coarse-graining. A predicted deviation is admissible only as a bounded residual or a falsifiable template, not as permission to loosen already-tested gravitational-wave recovery.

The GWTC-5.0 release and GW250114 sharpen the event-packet version of this gate. The catalog count, population reconstruction, standard-siren distance inference, high signal-to-noise ringdown, Kerr-mode and overtone tests, Hawking-area comparison, recoil extraction from higher modes, and any proposed near-horizon "direct wave" signature are not independent facts that can be fit from separate records. In $\mathbb{A}\mathbb{A}\mathbb{A}$ they define one strong-field recovery target: source quadrupole, calibrated detector strain, remnant mass and spin, ringdown labels, horizon-interface entropy bookkeeping, recoil or higher-mode rows, and any distance-redshift row must remain bound to one source-event ledger and one Noether sea/effective-metric record.

### Early-Universe Stochastic Background Gate

A stochastic gravitational-wave background is a data product before it is an ontology claim. If an early-universe or pre-BBN comparison branch predicts a background, retain the detector-facing spectrum and its cosmology linkage, not the branch interpretation that generated it. For a candidate branch $X$, define
$$
\mathcal{R}_{\mathrm{GW,early}}(\theta_X)
=
\sup_{f\in\mathcal{B}_{\mathrm{det}}}
\frac{\Omega_{\mathrm{GW}}^X(f)}
{\Omega_{\mathrm{GW}}^{\max}(f)}
+
d_{\mathrm{shared}}\!\left(\theta_{\mathrm{GW}},\theta_{\mathrm{BBN}},\theta_{\mathrm{CMB}},\theta_{\mathrm{growth}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2795400919ed5893)
where $\mathcal{B}_{\mathrm{det}}$ is the validated detector band and $d_{\mathrm{shared}}$ penalizes any branch that requires a gravitational-wave source record inconsistent with the BBN, CMB, or structure-formation records. A positive stochastic signal would become observational pressure on the early medium history; a null result closes only the corresponding branch amplitude, not the whole cosmology program.

### Energy Flux

The source-side benchmark is also part of closure. In the GR weak-field comparison, isolated systems do not radiate monopole or dipole gravitational waves at leading order because total energy, momentum, and angular momentum conservation remove those channels. The first radiative source is quadrupolar. A compact observer-level target is
$$
P_{\mathrm{GW}}
=
\frac{G_{\text{eff}}}{5c_{\text{GW}}^5}
\left\langle
\dddot Q_{ij}\dddot Q^{ij}
\right\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7152e6632c7b77e4)
with $Q_{ij}$ the trace-free mass quadrupole of the effective source record in the validated weak-field limit. A native Noether sea wave model must therefore explain why scalar monopole leakage, vector dipole leakage, and non-TT power remain below detector bounds rather than adding them as free source channels.

Binary-pulsar orbital decay is the generation-side benchmark for this row. The same source ledger must use the recovered $G_{\mathrm{eff}}$, $c_{\mathrm{GW}}$, and quadrupole moment to predict the observed secular period change after independently modeled kinematic and environmental corrections. Define
$$
\mathcal R_{\dot P_b}
\equiv
\frac{
\dot P_b^{\mathrm{obs}}
-\dot P_b^{\mathrm{quad}}(\theta_{\mathrm{src}})
}{
\sigma_{\dot P_b}
},
\qquad
\mathcal R_{\mathrm{dip}}
\equiv
\frac{P_{\mathrm{dip}}(\theta_{\mathrm{src}})}
{P_{\mathrm{quad}}(\theta_{\mathrm{src}})+\varepsilon}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b6f57e2ac8c61513)
The weak-field source branch must fit the orbital-decay row while keeping $\mathcal R_{\mathrm{dip}}$ below the binary-system bound. Composition-dependent Noether sea coupling that produces a leading dipole channel is therefore linked directly to the strong-equivalence-principle burden; it cannot be hidden in the detector-side tensor projection.

**Closure Target 3 (leading-order GW flux).** In the same regime, the cycle-averaged flux is
$$
\mathcal{F}_{\text{GW}}
=
\frac{c_{\text{GW}}^3}{16\pi G_{\text{eff}}}
\left\langle \dot h_+^2+\dot h_\times^2\right\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60add69d28a26c9a)
This polarization-summed normalization follows from $\dot h_{ij}^{\mathrm{TT}}\dot h_{\mathrm{TT}}^{ij} =2(\dot h_+^2+\dot h_\times^2)$ in the Isaacson comparison flux. It is the quantity used for binary-orbit energy-loss consistency checks. Energy localization for gravitational waves is an observer-level effective description: the packet may use cycle-averaged fluxes and asymptotic energy loss, but it should not promote a gauge-dependent local gravitational energy density into substrate ontology.

## Black Holes

This chapter is the main black-hole orientation document for the spacetime branch. Its purpose is to tell the reader what survives from standard compact-object phenomenology, what is being reinterpreted at the constitutive level, and how a candidate strong-field Noether-braid regime is supposed to replace singularity language without losing observational discipline. No black-hole constituent is assigned a braid-taxonomy member here.

The opening establishes the three-layer distinction between observables, constitutive strong-field structure, and substrate ontology. The later sections then work through horizon conditions, interior regime structure, release channels, and cosmological embedding.

### Scope and Purpose

This chapter centralizes the black-hole story within $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to distinguish three levels that are often conflated in black-hole discussion:

- the **effective observational layer**, where black holes are compact objects constrained by lensing, dynamics, accretion phenomenology, horizon-scale imaging, and gravitational-wave data;
- the **strong-field constitutive layer**, where Noether braid assemblies enter alignment, compression, and recycling regimes not encountered in ordinary weak-field gravity;
- the **substrate ontology**, where the Euclidean void remains fixed and the Noether sea carries all dynamical structure.

The chapter does not replace weak-field or observer-level black-hole phenomenology. What survives from standard practice remains indispensable: compact-object mass inference, horizon-scale imaging, ringdown analysis, accretion and jet modeling, and the requirement that exterior predictions recover the tested general-relativistic limit to observational accuracy. The reinterpretation begins only when one asks what a black hole is made of, what replaces singularity language, and how strong-field interiors connect to cosmology.

Notation guardrail: bare $\theta$ denotes a declared constitutive record. The null expansions are always $\theta_\pm^{\mathrm{eff}}$, the jet opening angle is $\theta_j$, and the Noether sea parameter tuple is $\theta_{\mathrm{sea}}$; none of those subscripted objects may be substituted for another.

### What the Framework Treats as a Black Hole

In $\mathbb{A}\mathbb{A}\mathbb{A}$, a black hole is not a hole in the Euclidean void. It is a region of the Noether sea hypothesized to enter an extreme alignment and compression regime through sustained inward transport of matter, radiation, and medium deformation. The effective exterior still behaves like a compact gravitating source, but the candidate interior ontology is not a geometric singularity. It is a proposed Noether-braid regime with three coupled zones:

| Zone | Candidate braid role | Constituent branch-speed regime | Effective black-hole language |
| :--- | :--- | :--- | :--- |
| Exterior bulk | outer-dominant volumetric assemblies | outer branch $v_3 < c_f$ in ordinary exterior coupling | outside observer region |
| Horizon interface | source-record binary-2 locking with binary-3 terminal alignment | $v_2=c_f$ with $v_3\to c_f$ for the locked interface components | event/apparent horizon comparison; roles are provisional, not taxonomy identities |
| Interior core | self-hit-dominant maximal-curvature assemblies | branch-derived self-hit carrier speed exceeds $c_f$ | black-hole interior |

This should be read as one constitutive continuum rather than three disconnected objects. The black-hole vocabulary remains useful at the effective level, but the ontic content is a regime map of the Noether sea.

The working source record assigns binary 2 the symmetry-breaking threshold, binary 1 the beyond-threshold self-hit continuation, and binary 3 the exterior-coupling channel that strong-field collapse would drive toward terminal orthogonal-axis three-binary alignment. These are provisional source-record assignments, not meanings of the persistent indices and not a retained-branch result. In this conjecture a candidate Noether braid contains the primitive black-hole analogue: a local horizon/interior pattern that could later be population-amplified into an observer-level compact object. This is not an imported primordial-black-hole model; it is a falsifiable proposed continuation from assembly-scale branch behavior.

When the local branch is described from the assembly side, this transition is the braid symmetry-breaking point: the source record's binary-2 threshold row remains at $c_f$, binary 3 is driven to the same terminal threshold, and binary 1 supplies the self-hit interior continuation.

Critical-collapse work in GR supplies a useful threshold comparison for this language. In Choptuik-style scalar collapse, finely tuned effective initial data approach a discretely self-similar solution at the border between dispersal and black-hole formation, and the large-$D$ black-hole program (Emparan-class) gives analytic expressions for a related family. The useful point for this chapter is not that substrate spacetime literally crystallizes. It is that black-hole formation should have a threshold record: exterior dispersal, horizon-interface capture, and interior continuation must be separated by the same branch data rather than by an ad hoc singular endpoint.

### Collapse-Response Ladder

The route from ordinary matter to a black-hole interior is not a single increase in temperature or a simple rise in material density. It is a sequence of assembly-regime changes in which more of the matter ledger becomes exposed to the surrounding Noether sea. In stable low-energy matter, the Noether sea normally receives only the externally exposed residual of shielded assemblies, not the full internal causal-history energy stored inside those assemblies. In compact collapse, that weak-response approximation progressively fails.

The useful ladder is:

| Regime | Matter state | Noether sea response |
| :--- | :--- | :--- |
| Ordinary atom | Electron resonance envelopes and nuclei remain distinct. | Tiny, phase-coherent, near-lossless response; ordinary atomic stability requires no drag-like loss. |
| Earth or metallic matter | Atomic and metallic bonding are compressed but remain ordinary condensed-matter states. | Weak constitutive response controlled by the exposed matter ledger and density-length scale, not by Planck-temperature proximity. |
| White-dwarf-like matter | Electrons become a degenerate pressure reservoir while nuclei remain identifiable over much of the star. | Stronger but still non-horizon response; electron shielding and pressure support dominate the compact-object balance. |
| Collapsing iron core | Electron support fails, electron capture and nuclear breakup change the active assembly inventory. | Nonlinear response: exposed fermion channels, neutrino transport, stress, cadence, and delay-factor gradients can no longer be treated as small perturbations. |
| Neutron-star branch | Neutron-rich nuclear matter or denser phases carry the pressure budget. | Extreme non-horizon response with packed fermion assemblies and strong gradients in $n$, $\chi_{\text{sea}}$, $\Gamma_N$, and stress. |
| Horizon-interface branch | Stable volumetric matter support fails. | Terminal alignment and maximum-curvature bookkeeping replace ordinary matter-language continuation. |

This ladder does not add a new validation gate. It identifies which existing variables must stop being interpreted in their weak-response limit as collapse progresses.

#### Chandrasekhar Scaling and Assembly Compression

The first mathematical warning that ordinary compact matter could lose its support branch is the Chandrasekhar scaling argument. In a white-dwarf-like object, electrons form a degenerate Fermi reservoir. If the electron number density is $n_e$, the Fermi momentum scales as
$$
p_F\sim \hbar n_e^{1/3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2acede6571965af4)
and the pressure law depends on whether those electrons are nonrelativistic or relativistic. In the nonrelativistic regime,
$$
P_e\propto n_e^{5/3}\propto \rho^{5/3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-54ae1732b25d188b)
while in the relativistic regime,
$$
P_e\propto n_e^{4/3}\propto \rho^{4/3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e92f7b7ec506d4b)

The electrons in this standard calculation are not ordinary atomic-orbital electrons. The white-dwarf branch begins after ordinary atoms have lost their everyday chemical identity: nuclei remain as identifiable ionic matter over much of the star, while the electrons form a delocalized pressure reservoir through the whole compact region. The relevant length scale is therefore not the Bohr radius of an atom but the inter-electron spacing,
$$
\ell_e\sim n_e^{-1/3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2432811fe4970e37)
Compression lowers $\ell_e$, and Fermi-state counting forces the highest occupied electron momentum upward. The nonrelativistic-to-relativistic border is controlled by
$$
x_F\equiv\frac{p_F}{m_ec}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a54823296b97e107)
with $x_F\ll1$ giving the $5/3$ pressure law and $x_F\gtrsim1$ moving the reservoir into the relativistic $4/3$ law. Equivalently,
$$
n_{e,\mathrm{rel}}
\sim
\frac{1}{3\pi^2}
\left(\frac{m_ec}{\hbar}\right)^3,
\qquad
\rho_{\mathrm{rel}}
\sim
\mu_e m_u n_{e,\mathrm{rel}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-007f8f237e7aa63b)
which is approximately $10^6\mu_e\,\mathrm{g}/\mathrm{cm}^3$, or about $2\times10^6\,\mathrm{g}/\mathrm{cm}^3$ for carbon/oxygen material with $\mu_e\approx2$.

This is not a curve fit over diverse stellar observations. The exponents come from quantum state counting plus the energy-momentum relation: the number of filled momentum states gives $p_F\propto n_e^{1/3}$; nonrelativistic energy $E\sim p^2/(2m_e)$ gives $P\propto n_e^{5/3}$; relativistic energy $E\sim pc$ gives $P\propto n_e^{4/3}$. Observations test the resulting mass-radius and stability picture, but the scaling itself is a mathematical consequence of the Fermi reservoir model.

The historical calculation also has a specific level placement. Chandrasekhar's limiting argument used special relativity for the electron momentum-energy relation and ordinary Newtonian hydrostatic balance for the star, with a radial coordinate and gravitational pressure estimate. It was not originally a full curved-spacetime derivation. The later Tolman-Oppenheimer-Volkoff comparison is the general-relativistic compact-star benchmark. From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, this makes the Chandrasekhar law a particularly valuable bidirectional clue: a support calculation using an ordinary Euclidean radial coordinate already shows a matter scale channel crossing into a relativistic cadence and momentum regime before full horizon-interface language is required.

For a star of mass $M$ and radius $R$, the rough hydrostatic comparison is
$$
\rho\sim\frac{M}{R^3},
\qquad
P_{\mathrm{grav}}\sim\frac{GM^2}{R^4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-06bf39f8c51cdb2c)
Nonrelativistic electron pressure scales like $M^{5/3}/R^5$, so it rises faster than the gravitational pressure estimate as $R$ decreases. A smaller equilibrium radius can still be found. Relativistic electron pressure scales like $M^{4/3}/R^4$, the same radius dependence as the gravity estimate. Once the coefficient balance is lost, no smaller white-dwarf radius restores support. That is the standard origin of the Chandrasekhar mass scale,
$$
M_{\mathrm{Ch}}\approx \frac{5.83}{\mu_e^2}M_\odot
$$

[View →](../../../../../equation-mapping.html#corpus-equation-048d262cc174f759)
with $\mu_e$ the nucleons-per-electron composition factor. In a collapsing iron core, electron capture lowers the electron fraction $Y_e=1/\mu_e$, so the effective support limit falls as the active core is already compressed.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ reading is that the Chandrasekhar calculation is not merely a historical astrophysics result. It is an observer-level signature of an assembly support channel losing authority. In the white-dwarf candidate mapping, volumetric electron-braid envelopes would supply effective exclusion and packing response while nuclei remain identifiable. As compression drives the electron population into the relativistic regime, additional inward work no longer returns as a proportionally stronger outward support law. The same work is increasingly routed into cadence, exposed response, heat, neutrino channels, nuclear breakup, Noether sea stress, and remnant bookkeeping.

The branch distinction should not be collapsed into a single "shrinking electron" picture. Ordinary orbital compression belongs to the atomic and condensed-matter precursors. Degenerate electron pressure belongs to a delocalized fermion reservoir after ordinary orbitals have ceased to be the right description. Material Noether braid scale compression is a deeper assembly-level ledger that must be derived separately from the same retained compact-region record. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ collapse map has to connect these stages without pretending that an atomic orbital radius, a Fermi spacing, and a Noether braid scale ratio are the same variable.

The local scale-compression variable for an assembly $A$ is
$$
\lambda_A(t)=\frac{R_{\perp,A}(t)}{R_{\perp,A,0}},
\qquad
\mathcal{S}_{\mathrm{mat}}(\Omega,t)
=
\left\langle
\ln\lambda_A(t)
\right\rangle_{\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0c2c048da19789a2)
The energy is not created by the shrinkage. It is binding work and reaction work entering the local ledger:
$$
\Delta E_{\mathrm{bind}}
+
\Delta E_{\mathrm{rxn}}
\rightarrow
\Delta E_{\mathrm{cad}}
+
\Delta E_{\mathrm{heat}}
+
\Delta E_{\nu}
+
\Delta E_{\mathrm{break}}
+
\Delta E_{\mathrm{sea}}
+
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-57dd0d1d6af8d73b)
This is a ledger identity target, not yet a derived equation of state. It says which channels must be accounted for before one may claim that material Noether braids have scaled down rather than merely that a standard pressure formula was imported.

The strong claim is that this material scale ledger should also project into the effective spatial-compliance ledger used by the metric description. If $\gamma_{ij}^{\mathrm{eff}}$ is the observer-level spatial compliance metric and $h_{ij}$ is the fixed Euclidean spatial metric, the corresponding isotropic scale readout is
$$
\mathcal{S}_{\mathrm{metric}}(\Omega,t_{\mathrm{eff}})
=
\left\langle
\frac{1}{6}
\ln
\frac{\det\gamma_{ij}^{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})}
{\det h_{ij}}
\right\rangle_{\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d7be45d3e9739137)
The factor $1/6$ appears because an isotropic spatial metric factor $\gamma_{ij}^{\mathrm{eff}}=a^2h_{ij}$ gives a determinant ratio $a^6$. The closure target is not that $\mathcal{S}_{\mathrm{mat}}$ and $\mathcal{S}_{\mathrm{metric}}$ merely correlate after fitting. The same retained compact-region record must generate the electron-support failure, the assembly scale compression, the Noether sea response, and the effective metric readout without hidden retuning.

#### Iron-Core Collapse Handoff

For an iron-group stellar core, the central Standard Model transition is electron capture,

$$
p+e^-\rightarrow n+\nu_e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5429a198451682c1)

The outgoing neutrino is not just an abstract missing-energy label in this bookkeeping. In the lepton-sector canon, a [neutrino](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) is a near-photon neutral assembly: a near-planar polarity-conjugate Noether braid pairing close to the photon channel but not fully locked into the photon mode. That explains why the neutrino channel is high-speed and weakly exposed while still carrying an internal-binary phase ledger capable of oscillation. In a collapse ledger, the neutrino row must therefore carry energy, momentum, angular momentum, weak provenance, and near-photon phase information, not merely remove scalar energy from the core.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ reading keeps this reaction as a required observer-level channel while reclassifying the surrounding story as a change in exposed assembly response.

| Collapse stage | Electrons | Nucleons and nuclei | Noether sea |
| :--- | :--- | :--- | :--- |
| Iron core near instability | Electrons form a dense pressure reservoir rather than atomic orbital distributions. | Iron-group nuclei remain identifiable but no longer release useful fusion support. | The Noether sea sees a compact but still non-horizon matter source through exposed shielded response. |
| Electron-capture onset | Electron number falls as electrons are consumed by proton channels. | Protons convert toward neutrons, and the composition becomes more neutron-rich. | Atomic-scale electron resonance is no longer the right response picture; the active ledger shifts toward nuclear reaction provenance. |
| Photodisintegration and breakup | Electron pressure keeps weakening as collapse accelerates. | Heavy nuclei break into smaller nuclei, alpha-like fragments, and free nucleons, consuming energy. | Iron-nucleus closure loses authority; source terms into the Noether sea become fragmented, anisotropic, and rapidly changing. |
| Neutrino-trapping regime | Lepton accounting must include trapped and escaping neutrino channels. | Matter approaches nuclear density, and free nucleons dominate the local inventory. | Transport is no longer globally transparent: neutrino, stress, heat, and medium-update ledgers must be tracked together. |
| Bounce or continued collapse | Electrons become secondary to nuclear and neutrino pressure channels. | Nuclear-density stiffening can halt the inner core, or support can fail. | A neutron-star branch remains an extreme non-horizon Noether sea response; continued collapse routes the same record toward the horizon-interface condition. |

The compact summary is therefore:

$$
\text{atomic electron resonance}
\rightarrow
\text{electron-capture ledger}
\rightarrow
\text{neutron-rich packed fermion response}
\rightarrow
\text{strong Noether sea constitutive regime}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-15cc7662c65d031b)

#### Neutron-Star Branch as a Radial Test

The neutron-star branch is the sharpest compact-object test before horizon-interface language becomes active. It is already far outside weak-field matter, but it remains a non-horizon branch in the candidate mapping as long as volumetric neutron-rich matter support has not been forced into terminal orthogonal-axis three-binary alignment. For a spherical bookkeeping radius $r$ inside a star of surface radius $R_*$, the useful local record is not a scalar density alone but a Noether sea state and matter-response bundle,

$$
\Theta_{\mathrm{NS}}(r)
=
\left(
\rho_{\text{NS}}(r),
n(r),
\chi_{\text{sea}}(r),
\Gamma_N(r),
S_{ij}(r),
\mathcal{M}_{\text{sea}}^{ab}(r),
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(\Omega_r)}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2690b70a39bcba0a)

where $\Omega_r$ is the compact interior region retained by the comparison and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(\Omega_r)}$ records the local energy, momentum, angular-momentum, reaction, neutrino, stress, heat, medium-update, and remnant rows needed for that region. The exterior region samples the same record through redshift, orbital motion, lensing, and signal-delay channels. The surface is not a hard boundary of the Euclidean void; it is the branch boundary where exterior Noether sea response starts coupling to neutron-rich packed matter, charged layers, radiation channels, magnetic stresses when present, and surface transport.

The pulsar version of this branch makes the bookkeeping sharper. A Crab-like neutron star is not only a dense sphere; it is a retained compact-source record whose exterior exports include surface spectral redshift, X-ray/optical/radio channel selection, rotational period, spin-down power, magnetic-axis beaming, and the supernova/nebular remnant ledger. Standard angular-momentum, magnetic-flux, and rotational-energy-loss calculations are therefore useful recovery targets. They preserve what the conventional model gets right: collapse amplifies rotation and magnetic field, and the observed pulse train is a line-of-sight sample of a rotating magnetized source. The $\mathbb{A}\mathbb{A}\mathbb{A}$ claim is narrower: the same $\Theta_{\mathrm{NS}}(r)$ and boundary/source ledger should project to those timing, spectrum, and energy-loss observables without separately fitting a clock, a beam, a redshift, and a remnant energy budget.

Inside the star, electron-envelope language has mostly lost authority. The active ledger is neutron-rich nuclear matter or denser phases together with residual charged components, neutrino transport, pressure support, heat flow, stress, and local Noether sea updates. A compact branch-survival condition can therefore be stated as

$$
0<
1-\frac{v_3(r)}{c_f},
\qquad
0\le s_n(r)\le1,
\qquad
\mathcal{R}_H(\Omega_r)<\infty,
\qquad
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(\Omega_r)}\ \text{closes}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4a48bcd54b8e14ca)

for all retained radii $0\le r\le R_*$. Here $v_3$ is the binary-3 speed in the relevant branch record, $s_n$ is the packing-headroom diagnostic when a pressure-packing model is being used, and $\mathcal{R}_H$ is the strong-field regularity residual. The $s_n$ condition should be read as a candidate pressure-response target until a neutron-star dense-matter branch supplies the corresponding $K_{\mathrm{pack}}$, packing ceiling, and branch residuals.

The center of an ideal nonrotating neutron star is therefore not automatically horizon-like. The first radial gradients vanish there by symmetry, while pressure, stress, cadence stretch, and packing pressure can be maximal. If scalar density response is exhausted while $v_3<c_f$, the response must route into shape, strain, contact, transport, or dense-matter branch change. If the same record forces $v_3\to c_f$ and activates the horizon-interface condition, the neutron-star branch has ended and the continuation belongs to the horizon-interface branch below.

### Canonical Horizon Condition

The canonical strong-field alignment condition is inherited from [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md). Near the horizon interface, the working regime definition is

$$
v_2 = c_f,
\qquad
v_3 \to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec122bbcc77f4753)

with binaries 2 and 3 becoming coplanar and collinear with binary 1 at alignment and precession ceasing in that limit.

This condition fixes the local meaning of the horizon in the framework. The horizon is not merely a geometric surface drawn inside an effective metric. It is the constitutive interface where terminal alignment is reached and where ordinary volumetric assemblies are compressed into a boundary-like state. Planck-scale language maps to this alignment condition only after an explicit derivation supplies the scale relation; without that derivation, the observer-level Planck scale and the native alignment row remain separate closure objects.

#### Event and Apparent Horizon Comparison

Standard horizon language separates two comparison objects that should not be collapsed into one. The event horizon is a global causal boundary: at the effective GR level it is the boundary of the causal past of future null infinity,
$$
\mathcal{H}_{\mathrm{event}}^{\mathrm{eff}}
=
\partial J^{-}\!\left(\mathscr{I}^{+}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60d48323cabd63f6)

This definition depends on the full future development of the effective spacetime. It is therefore not a local surface that a finite-time observer or one simulation slice can identify by inspection. In dynamical collapse, accretion, or merger cases, the event horizon can be located only by the global escape structure of null trajectories.

The apparent horizon is the more local comparison surface. In layer-explicit comparison notation, the chosen GR slice is $\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}$, not an absolute slice $\Sigma_T$. On that effective spatial slice it is the outer boundary of the trapped region, with outgoing null expansion at the boundary and ingoing null expansion still inward,
$$
\theta_+^{\mathrm{eff}}=0,
\qquad
\theta_-^{\mathrm{eff}}<0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f71f571b5477c5ec)

This makes apparent horizons useful for simulations and local compact-object diagnostics, but it also makes them slice-dependent. The $\mathbb{A}\mathbb{A}\mathbb{A}$ horizon interface is neither of these GR objects by definition. It is the local constitutive condition $F_H=0$ on a strong-field record. The closure burden is that the same record should export both a local trapped-surface/apparent-horizon comparison and the global finite-access event-horizon comparison when the observer-level regime calls for them:
$$
F_H(\theta_{\Omega,W})=0
\quad\Longrightarrow\quad
\left(
\mathcal{H}_{\mathrm{app}}^{\mathrm{eff}}(\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}};\theta_{\Omega,W}),
\mathcal{H}_{\mathrm{event}}^{\mathrm{eff}}(\theta_{\Omega,W})
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0bcc5d9ac959d830)

This is a projection target, not a new ontology. If the local interface can match an apparent horizon only by changing the record used for exterior escape, or if the global event-horizon comparison requires a different strong-field record from the local trapped-surface comparison, the black-hole model has split into two fitted stories.

#### Exterior GR Benchmark Packet

Before any horizon-interface reinterpretation is promoted, the observer-level exterior must recover the standard nonrotating compact-object scales
$$
r_s=\frac{2GM}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3GM}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6GM}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1982ac22d600e47d)
Here $r_s$ is the Schwarzschild comparison radius, $r_{\mathrm{ph}}$ is the null photon-orbit radius, and $r_{\mathrm{ISCO}}$ is the innermost stable circular orbit for massive test bodies. These are effective-metric recovery targets, not claims that the Euclidean void contains a geometric hole.

The same packet should retain the curvature-singularity diagnostic only as a comparison warning:
$$
K_{\mathrm{Schw}}
=
R_{\alpha\beta\gamma\delta}R^{\alpha\beta\gamma\delta}
=
\frac{48G^2M^2}{c_0^4 r^6}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1510cf23d6cbc374)
The native model is expected to replace the $r\to0$ divergence with finite maximum-curvature bookkeeping, while leaving the exterior weak-field and ringdown observables intact.

Horizon language also has rotating and charged comparison meanings. For rotating or charged comparison branches, Cauchy-horizon instability, exterior no-hair coarse-graining by $(M,\mathbf{J},Q)$, and ergoregion/frame-dragging records remain comparison constraints on the same strong-field state, not independent ontologies.

Alternative horizon-free gravity proposals are useful here only as stress tests. Their durable challenge is not that their field variables should be imported, but that compact-object energetics, merger dynamics, and accretion feedback are genuinely many-body records. A native black-hole branch must therefore avoid treating a one-body exterior scale as a complete source model. For a retained compact-object window $W$, the same strong-field record $\theta_W$ should supply both the exterior compact labels and the interactive energy ledger,
$$
\mathcal{R}_{N\text{-}\mathrm{body}}(\theta_W)
=
\left\|
\Delta E_{\mathrm{rad}}
+\Delta E_{\mathrm{jet}}
+\Delta E_{\nu}
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{rem}}
+\Delta E_{\mathrm{bind}}^{\mathrm{eff}}
-\Delta E_{\mathrm{in}}
\right\|_W
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0426ec2f3ec00c2e)
The pass condition is not horizon absence. It is that $\mathcal{R}_{N\text{-}\mathrm{body}}$ stays within the declared tolerance while the same $\theta_W$ also recovers lensing, timing, ringdown, and horizon-scale imaging. If a burst, merger, or accretion model needs one record for exterior no-hair behavior and a separate record for the many-body energy release, then the compact-object closure has split into fitted stories.

#### Horizon-Scale Imaging Benchmark

Event Horizon Telescope observations give the chapter a direct observer-level benchmark for the compact lensing scale. The retained result is not a literal image of the substrate ontology. It is a VLBI reconstruction problem in which calibrated visibilities, closure phases, closure amplitudes, sparse coverage, interstellar scattering, plasma emissivity, and polarization transport are converted into a ring-like compact-source inference.

The useful strong-field record is therefore a transfer map
$$
\mathcal{T}_{\mathrm{img}}[\theta]
\mapsto
\left(
D_{\mathrm{ring}},
f_w,
C_{\mathrm{dep}},
\mathcal{V}_{ij}(u,v,t),
\Phi^{\mathrm{cl}}_{ijk}(t),
A^{\mathrm{cl}}_{ijkl}(t),
\Pi_{\mathrm{lin}}(\varphi,t),
\Pi_{\mathrm{circ}}(\varphi,t)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a25c19a951a9a265)
Here $D_{\mathrm{ring}}$ is the bright-ring diameter, $f_w$ is the fractional ring width, $C_{\mathrm{dep}}$ is the interior brightness-depression contrast, $\mathcal{V}_{ij}$ are baseline visibilities, $\Phi^{\mathrm{cl}}$ and $A^{\mathrm{cl}}$ are closure quantities, and $\Pi_{\mathrm{lin}}$ and $\Pi_{\mathrm{circ}}$ record resolved polarization. These quantities belong to the effective observational layer. They constrain the same strong-field branch record that defines the horizon interface, but they do not replace that constitutive condition.

The current benchmark values are sharp enough to state the separation. For M87$^*$, the 2017 EHT analysis found a stable asymmetric ring with diameter about $42\pm3\,\mu\mathrm{as}$, a central brightness depression, and visibility-domain crescent fits with fractional width below $0.5$. Later multiepoch analyses keep the diameter stable while brightness and polarization vary. For Sgr A$^*$, the data are harder because the source varies on intrahour timescales and the Galactic-center line of sight scatters the image, but independent imaging and modeling analyses still recover a thick ring with $D_{\mathrm{ring}}\approx51.8\pm2.3\,\mu\mathrm{as}$.

The geometry-side observable is the dimensionless same-source residual
$$
\delta_{\mathrm{ring}}^\theta
=
\frac{D_{\mathrm{ring}}^\theta-D_{\mathrm{ring}}^{\mathrm{Kerr}}}
{D_{\mathrm{ring}}^{\mathrm{Kerr}}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd3af5fc9fa9d5b6)
evaluated at the same exterior mass-to-distance ratio and with the same plasma-transfer nuisance model. The corresponding Schwarzschild comparison diameters are approximately $39.7\,\mu\mathrm{as}$ for M87$^*$ and $53.3\,\mu\mathrm{as}$ for Sgr A$^*$, so the present diameter rows already impose a few-percent, roughly four-percent-at-$1\sigma$ scale test. A native near-horizon $c_{\mathrm{eff}}$ profile must therefore predict $\delta_{\mathrm{ring}}^\theta$; quoting the observed diameter without this forward value does not test the branch.

The closure lesson is that geometry-facing and environment-facing terms must not be conflated. The compact ring scale and brightness depression test the effective photon-path and capture map. The azimuthal brightness, fractional width, resolved polarization, Faraday rotation, and jet-base emission test the surrounding plasma, magnetic-like stress, scattering, and release-channel environment. A native black-hole branch fails the benchmark if it can fit the visual image only by changing the mass-to-distance map, if it matches the image while failing the visibility-domain data, or if it treats variable plasma structure as evidence that the horizon-interface condition itself has changed.

### Singularity Replacement and the Maximum-Curvature Core

The standard singularity story captures a real pressure: ordinary weak-field extrapolation cannot be trusted indefinitely toward arbitrarily high compression. What $\mathbb{A}\mathbb{A}\mathbb{A}$ changes is the replacement mechanism. The theory does not leave the divergence untreated, nor does it accept an ontic point singularity. Its proposed replacement is a maximum-curvature regime in which delayed self-hit supplies an outward barrier while the complete signed branch ledger must supply centripetal, tangential, wake-boundary, and stability closure. Its retained-branch status matches the grade carried in [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md): a proposed outcome, not an established retained mechanism.

At the assembly level, the candidate mechanism is that opposite-charge binaries driven past the hinge near $c_f$ enter a self-hit regime in which inward attraction is opposed by delayed repulsive feedback from their own path-history wakes. The proposed outcome is a maximum-curvature orbit in place of an unrestricted $r \to 0$ collapse; its stability predicate — acceleration balance and closure on a retained branch — remains open. Black-hole cores are therefore modeled provisionally as dense populations of such maximal-curvature candidate states under extreme collective compression.

The constitutive claim is modest but important: singularity language remains a warning that weak-field effective variables have exceeded their domain, while the ontic replacement is a structured maximum-curvature core with finite internal bookkeeping.

One preserved strong-field intuition is that sufficiently old or sufficiently compressed interiors may approach an ordered collapse limit rather than a thermalized point. In that heuristic picture, maximal-curvature candidate braids pack into a near-crystalline interior, while most entropy remains associated with the active shear and shredding layers nearer the horizon interface. This is not yet a constitutive derivation or a taxonomy assignment, but it is a useful candidate for how collapse can saturate without an ontic singularity.

#### High-Energy Probe Closure Target

Standard quantum-gravity comparisons preserve a useful benchmark: increasing the energy of a scattering experiment does not grant unlimited access to shorter distances once the compact-object threshold is crossed. At that point the observer-level description must route the record through black-hole formation, horizon behavior, and release-channel accounting. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation is that high-energy compression must enter the horizon-interface and maximum-curvature regimes rather than an arbitrary ultraviolet point description.

Let $\ell_{\mathrm{probe}}(E)$ denote the observer-level resolution scale associated with a probe energy $E$, and let $R_H(E;\theta)$ denote the horizon-interface scale predicted by the same constitutive record $\theta$. The local closure target is the implication

$$
\ell_{\mathrm{probe}}(E)
\lesssim
R_H(E;\theta)
\quad\Longrightarrow\quad
v_2=c_f,\quad
v_3\to c_f,\quad
S_H\sim k_B\log\left|\mathcal{B}_{H}\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e5bcf18d4ef2e35a)

This is not a claim that the Euclidean void becomes quantized geometry. It is a benchmark on the native strong-field branch: when the effective comparison says that a probe has become a black hole, the same Noether sea state must activate the alignment condition, finite maximum-curvature bookkeeping, and entropy/release-channel ledger used below. If short-distance recovery requires an independent ultraviolet story that bypasses those variables, the black-hole closure has split from the rest of the spacetime program.

##### Probe-to-Horizon Residual

For a high-energy scattering comparison, take the observer-level probe scale to be $\ell_{\mathrm{probe}}(E)\sim\hbar c_0/E$ unless the apparatus defines a sharper channel-specific scale. The compact-object gate is active when $\ell_{\mathrm{probe}}(E)\le R_H(E;\theta)$. A concrete residual for that regime is
$$
\mathcal{R}_{E\to H}(\theta)
=
\int dE\,w(E)\,
\mathbf{1}_{\ell_{\mathrm{probe}}(E)\le R_H(E;\theta)}
\left[
\left(1-\frac{v_2}{c_f}\right)^2
+
\left(1-\frac{v_3}{c_f}\right)^2
+
d_{\mathrm{curv}}\!\left(\mathcal{B}_H\right)
+
d_{\mathrm{ent}}\!\left(
S_H,
k_B\log|\mathcal{B}_H|
\right)
+
\mathcal{R}_{\mathrm{release}}(E;\theta)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-df0bcc96fc1c39a7)
Here $w(E)$ is the comparison weighting for the probe family, $d_{\mathrm{curv}}$ checks that the admitted horizon-interface labels carry finite maximum-curvature rows, $d_{\mathrm{ent}}$ checks horizon-interface entropy bookkeeping, and $\mathcal{R}_{\mathrm{release}}$ checks the outgoing $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, provenance, medium-update, and remnant rows through the event ledger.

The closure condition is $\mathcal{R}_{E\to H}(\theta)\le\epsilon_{E\to H}$ using the same strong-field branch record that recovers exterior compact-object observables. A model fails this gate if it claims arbitrarily short-distance resolution in the active compact-object regime, or if it activates the horizon scale while leaving maximum-curvature labels, entropy capacity, or release-channel accounting undefined.

##### First Worked Probe Gate

In the weak exterior comparison limit, a single-energy scattering estimate can use
$$
\ell_{\mathrm{probe}}(E)
\simeq
\frac{\hbar c_0}{E},
\qquad
R_H(E;\theta)
\simeq
\frac{2G_{\mathrm{eff}}(\theta)E}{c_0^4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e31985dc46b988d)
The horizon-interface handoff begins when
$$
\frac{\hbar c_0}{E}
\le
\frac{2G_{\mathrm{eff}}(\theta)E}{c_0^4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8f7d2964609139f3)
or equivalently
$$
E
\ge
E_H(\theta)
\equiv
\left(
\frac{\hbar c_0^5}{2G_{\mathrm{eff}}(\theta)}
\right)^{1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-61567ff3b806695e)
This is an observer-level comparison estimate, not a proof that the Euclidean void has Planck-scale cells. Its purpose is to decide when the record should stop being interpreted as a shorter-distance particle probe and start being routed through horizon-interface bookkeeping.

The worked classification is:

| Probe regime | Condition | Required native record |
| --- | --- | --- |
| particle-probe | $E < E_H(\theta)$ | ordinary scattering or effective-field comparison may remain valid if sector gates pass |
| handoff | $E\approx E_H(\theta)$ | the same $\theta$ must activate $v_2=c_f$, $v_3\to c_f$, and finite maximum-curvature labels |
| horizon-interface | $E > E_H(\theta)$ | the record must report $\mathcal{B}_H$, $S_H$, release-channel rows, and exterior compact-object observables |

The falsifier is not merely failure to choose a numerical Planck scale. The falsifier is a split record: if the short-distance probe uses one $\theta$ while the induced horizon-interface, entropy, and release-channel ledgers require another, then the high-energy closure has not survived promotion.

### Horizon Interface

The candidate horizon interface is the most important black-hole concept in the local dialect. It names the proposed layer in which Noether braid assemblies would be flattened into an alignment-locked sheet. Its existence and identification with an observer-level horizon remain closure targets.

At this interface:

- the binary 2 remains locked at $v = c_f$;
- the binary 3 is driven to its terminal alignment limit $v_3 \to c_f$;
- precession collapses toward zero;
- information flow is compressed into an interface-like channel rather than ordinary volumetric propagation.

This is why the project treats holographic language as suggestive but not primitive. The horizon behaves like an information-compression interface because the constitutive degrees of freedom have been forced into a constrained alignment state. That motivates the analogy to holography and AdS/CFT without requiring a literal boundary-field ontology.

The alignment state may also silence assemblies geometrically, but the available identity is narrower than that claim. The [axial polarity dipole identity](../../../../markdown/aaa/noether-braid/coordinate-axis-six-point-symmetry-and-return-response.md#moments-and-the-axial-polarity-dipole) is proved only for the symmetric phase-compensated equal-geometry orthogonal-axis braid two-ring geometry; an orthogonal-axis three-binary horizon braid does not inherit it. For a retained orthogonal-axis three-binary record define its polarity-signed axial moment directly and require that moment to vanish in the alignment limit before identifying horizon locking with dipole quietness. Until that coincident-midpoint orthogonal-axis braid calculation exists, darkness remains a causal-escape and transport statement, while higher-moment, phase, and precession labels remain admissible inputs to the entropy count rather than consequences of phase-compensated equal-geometry orthogonal-axis braid symmetry.

#### Horizon-Adjacent Photon Channel

In the candidate mechanism, the horizon interface is not modeled as a smooth geometric shell surrounding an otherwise empty interior. It would be an active Noether sea regime in which ordinary volumetric assemblies, photon-channel packets, speculative dark-sector photon-channel-adjacent modes, and terminally aligned Noether braid states can all approach the same symmetry-breaking threshold. The proposed interface is therefore a high-energy transport and selection target rather than an established passive or constitutive surface.

The photon connection is especially sharp because the photon carrier is a coaxial contra-rotating polarity-conjugate planar pair. A photon is not a horizon, but it is a moving planar-pair record built from the same pro/anti flattening logic that the horizon exposes under strong-field alignment. Near a black-hole interface the question is therefore not only whether light is redshifted on escape. The stronger native question is which photon-channel or photon-channel-adjacent records enter, are blueshifted, are trapped, are converted, or are released by the same horizon-interface ledger.

For a horizon-adjacent photon path $\Gamma_H$, retain the signed strong-field frequency row
$$
Y_{\gamma,H}
=
\sum_{j\in\Gamma_H}\Delta Y_{\gamma,H,j},
\qquad
\Delta Y_{\gamma,H,j}
=
-\ln
\frac{\nu_{\gamma,j}^{+}}{\nu_{\gamma,j}^{-}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2275067c4f631322)

so $\Delta Y_{\gamma,H,j}<0$ records a blueshift segment and $\Delta Y_{\gamma,H,j}>0$ records a redshift segment relative to the local comparison clock. Interior-facing segments can therefore drive photon-channel packets to energies not directly sampled by exterior observers, while exterior-facing segments may redshift those packets before they become visible or before they are thermalized into a background. The corresponding energy ledger is
$$
\mathcal{R}_{H\gamma\text{-}\mathrm{ex}}
=
\sum_{j\in\Gamma_H}
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{H,j}
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bea79aae833e0aba)
where $\Delta E_{H,j}$ is the horizon-interface or interior strong-field row and the other terms record medium, recoil, and remnant exchange. A high-energy photon output claim is admissible only when this residual closes and the outgoing packet still carries the required photon Gate A and Gate B handoffs. If those handoffs fail, the channel has become absorption, re-emission, pair production, or another release reaction.

This is the disciplined version of the "roiling horizon" intuition. The horizon interface may contain intense photon-channel and photon-adjacent activity, and some of it may be routed into jets, diffuse radiative outflow, dark-sector escape, or later visible conversion. But each proposed route must state the release selector, the energy-frequency ledger, the polarization and angular-momentum handoff, and the coupling to the surrounding Noether sea. Otherwise the claim has only renamed black-hole radiation rather than deriving a strong-field transport channel.

Modern holographic entropy work, including Ryu-Takayanagi, island, and replica-wormhole calculations, should be treated in this chapter as a comparison framework rather than as imported ontology. Its value is that it sharpens a high-value consistency target: a mature horizon-interface model should explain how compressed interface bookkeeping can remain compatible with Page-curve recovery and smooth effective horizons. It does not, by itself, supply the $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism. The local task is still to derive entropy and information accounting from the hypothesized terminal orthogonal-axis three-binary alignment, path-history bookkeeping, Noether sea storage, and release-channel selection.

The Ryu-Takayanagi comparison makes this distinction sharper. A region-anchored entropy surface is not automatically the event horizon; in vacuum or nonthermal comparisons it can have no horizon component at all, while in thermal black-hole limits a large-region surface can wrap the horizon. For a candidate strong-field record $\theta$, let $\gamma_A^{\mathrm{eff}}(\theta)$ be the effective entropy surface associated with access region $A$, and let $H_{\mathrm{eff}}(\theta)=\{F_H=0\}$ denote the observer-level horizon surface selected by the same record. The useful diagnostic is the horizon-wrapping fraction
$$
\eta_H(A;\theta)
=
\frac{
A_{\mathrm{eff}}\!\left(\gamma_A^{\mathrm{eff}}(\theta)\cap H_{\mathrm{eff}}(\theta)\right)
}{
A_{\mathrm{eff}}\!\left(\gamma_A^{\mathrm{eff}}(\theta)\right)
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-367da2519bbdddca)
The event-horizon reading is justified only in the $\eta_H\to1$ regime. When $\eta_H=0$ or remains bounded away from one, the holographic comparison is still useful as an access-region entropy test, but it is not evidence that the boundary surface is the horizon-interface ontology.

A useful way to state the native task is through a horizon-interface label ensemble. Let $\lambda_i^H$ denote a retained horizon-interface ledger label selected by the strong-field record. Such a label may include neutral Noether braid closure rows, charged assembly rows, and allowed interface-channel rows; its charge and polarity ledger has exterior scalar readout $q_i$. For an effective exterior black-hole label $(M,\mathbf{J},Q)$, define the schematic ensemble
$$
\mathcal{B}_{H}(M,\mathbf{J},Q)
=
\left\{
\{\lambda_i^H\}_{i=1}^{N}
:
\sum_i E_i = M c_0^2,\quad
\sum_i \mathbf{J}_i = \mathbf{J},\quad
\sum_i q_i = Q,\quad
v_2=c_f,\quad
v_3\to c_f,\quad
\text{horizon-interface compatibility}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7c826b4d89e6c657)

The use of $c_0$ in the energy row marks the observer-level exterior calibration of the no-hair label; a local $c_{\text{eff}}$ row belongs to the constitutive map that produces the exterior record. In plain language, $\mathcal{B}_{H}$ is the set of strong-field horizon-interface ledger arrangements that look identical to exterior probes once the probe can resolve only effective mass, angular momentum, charge, and allowed interface channels. This gives a precise no-hair reading: exterior no-hair is a coarse-graining over many compatible closure labels, not evidence that the interior has no microstate.

The corresponding thermodynamic closure target is
$$
S_H
=
k_B\log\left|\mathcal{B}_{H}(M,\mathbf{J},Q)\right|,
\qquad
S_H
\stackrel{\text{target}}{\sim}
\frac{k_B A_H}{4A_{\text{align}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a0474422355f3878)
where $A_H$ is the observer-level horizon area and $A_{\text{align}}$ is the alignment-area scale from the Planck-alignment program, with the numerical and $2\pi$ conventions fixed by that derivation rather than by definition here. Page-curve recovery then becomes a release-channel theorem: outward channels must preserve enough phase, axial-pattern, and path-history information from $\mathcal{B}_{H}$ to make evaporation or recycling unitary at the effective quantum level, while still appearing thermal to coarse exterior measurements.

The coefficient in this target is not a literal claim that one alignment patch carries $e^{1/4}$ independent states. The local target is an area-normalized block entropy density. For a connected block $U$ of horizon-adjacent alignment patches, let $\mathcal{L}_U^H(\theta)$ be the retained alignment-compatible label set induced by the same strong-field record and let $A_H(U)$ be the observer-level area represented by that block. The local density target is
$$
s_{\mathrm{align}}^H(\theta)
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|\mathcal{L}_U^H(\theta)\right|,
\qquad
a_H(\theta)
=
\lim_{|U|\to\infty}
\frac{A_H(U)}
{|U|A_{\text{align}}},
\qquad
\frac{s_{\mathrm{align}}^H(\theta)}{a_H(\theta)}
\longrightarrow
\frac{1}{4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-19a8f15c78b69c28)
with boundary corrections vanishing in the large-block limit. This is the local calculation that must make the global area law credible; the raw statement $s_{\mathrm{align}}^H\to1/4$ is only the special case $a_H\to1$.

#### Temperature, First Law, and Release Timescale

An entropy target without a temperature and timescale does not close the thermodynamic comparison. For a nonrotating exterior record, the Hawking benchmark is
$$
T_H^{\mathrm{Schw}}
=
\frac{\hbar c_0^3}
{8\pi k_B G_{\mathrm{eff}}(\theta)M}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-595180c0fee2caf6)
For a stationary rotating or charged comparison, the same record must recover the first-law row
$$
d(Mc_0^2)
=
T_H\,dS_H+\Omega_H\,dJ+\Phi_H\,dQ.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f19a23ada400f439)
These are observer-level recovery targets, not architrino-level premises. The native horizon-interface calculation must obtain $T_H$ from the release-channel spectrum and show that its derivative of the counted $S_H$ satisfies the same row.

The nonrotating, massless-species comparison timescale is
$$
t_{\mathrm{evap}}^{\mathrm{Schw}}
=
\frac{5120\pi G_{\mathrm{eff}}(\theta)^2M^3}
{\hbar c_0^4},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fc366fc0d5b369c3)
with greybody factors and the available species ledger modifying the coefficient. Define the Page-time comparison by the first crossing at which the observer-accessible radiation entropy equals the remaining horizon entropy. The finite-boundary endpoint must supply both that crossing and a release or recycling completion time from the same $\mathcal B_H$ and outgoing-channel ledger. Without those times, “Page-curve recovery” and a finite endpoint are qualitative labels rather than predictions.

This global horizon ensemble must be compatible with the local boundary-wake entropy density used in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md#local-horizon-recovery-target). For a compact region $\Omega$ whose boundary intersects the horizon interface, let $\pi_{\partial\Omega}^{(O)}$ be the Physical Observer projection from strong-field horizon-interface labels to retained boundary-wake labels, and write $\mathcal{B}_{H}(\theta)$ for the horizon-interface ensemble selected by the same strong-field record. The proof route requires
$$
\left|
\log\left|
\pi_{\partial\Omega}^{(O)}
\mathcal{B}_{H}(\theta)
\right|
-
\log\left|
\mathcal{B}_{\partial\Omega}^{(O)}
\left(\theta_{\Omega,O,W}\right)
\right|
\right|
\le
\epsilon_{\mathrm{proj}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96df6da257e74e42)
for the same strong-field record $\theta$ restricted to the observer window and the same block or patch family. If the local boundary density and the global horizon-interface count require different records, the entropy target has split into two fitted stories. If they agree, the black-hole area law is no longer an isolated assumption; it becomes the compact strong-field version of the local boundary-factorization theorem target.

The words "thermal," "scrambled," and "recoverable" are therefore readout-channel claims, not direct ontology labels. For a Physical Observer $O$, let $\mathcal{K}_{O}^{\mathrm{rad}}$ denote the declared radiation readout kernel and let $\mathcal{R}_{O}$ denote the physical reference resources used to compare outgoing quanta. A horizon-interface ledger state $\lambda\in\mathcal{B}_{H}(M,\mathbf{J},Q)$ reaches the observer through a channel of the schematic form
$$
Y_O
=
\pi_O^{\mathrm{rad}}\!\left(
\lambda;\mathcal{K}_{O}^{\mathrm{rad}},
\mathcal{R}_{O},
\mathcal{B}_{\partial\Omega}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a3ca900a44782acf)
Before a black-hole information claim is promoted, the comparison packet must say which $\mathcal{K}_{O}^{\mathrm{rad}}$, reference resources, access region, and finite boundary data make the outgoing channel meaningful. A coarse exterior channel may legitimately see an approximately thermal distribution while a richer correlated reference channel retains structure, but that difference is a statement about observer-accessible records. It does not import a boundary CFT, many-copy tomography story, or external reference frame as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The same packet should also carry a detailed-balance comparison rather than treating CPT language as an ontological shortcut. Let $\mathcal{L}_{H}$ be the declared set of horizon-interface formation and release ledger channels for a compact region $\Omega$. For a candidate strong-field record $\theta$, require
$$
\mathcal{R}_{H,\mathrm{bal}}(\theta)
=
\sum_{\ell\in\mathcal{L}_{H}}
w_\ell
\left[
P_\theta(\ell_{\mathrm{in}}\to\mathcal{B}_H)
-
P_\theta(\mathcal{B}_H\to(CPT)_{\mathrm{eff}}\ell_{\mathrm{out}})
\right]^2
+
d_{\mathrm{ent}}\!\left(
S_H^{(O)},
k_B\log|\mathcal{B}_{H}^{(O)}|+S_{\mathrm{out}}^{(O)}
\right)
+
d_{\mathrm{CPT}}\!\left(\mathcal{R}_{\mathrm{CPT}}(\theta),0\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e8a4f2ac7071d66d)
The pass condition is $\mathcal{R}_{H,\mathrm{bal}}(\theta)\le\epsilon_H$ using the same branch record that recovers exterior compact-object observables. This does not assert a literal mirror universe, a white-hole ontology, or a final-state boundary postulate. It says that if the effective comparison invokes CPT or thermal equilibrium, the native horizon-interface release ledger must exhibit the corresponding formation/release balance within the declared observer access channel.

The species puzzle supplies a separate entropy guardrail. If $N_{\mathrm{spect}}$ counts effective spectator species that do not enter the native closure labels, release channels, or null-result ledger, then horizon entropy should be insensitive to those labels:
$$
\left|
\frac{\partial S_H^\theta}{\partial N_{\mathrm{spect}}}
\right|_{\mathcal{B}_H,\partial\Omega}
\le
\epsilon_{\mathrm{spect}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-31df12d1a524d733)
If an added species is physically real, it must change $\mathcal{B}_{H}$, $S_{\mathrm{out}}^{(O)}$, a release-channel row, or $\mathcal{R}_{\mathrm{null}}$. If it changes none of those records, it is an effective-description label and may not be used to tune black-hole entropy.

The classical area-increase result supplies a direct benchmark for this target. In the standard exterior description, a clean merger comparison has
$$
A_{H,\mathrm{final}}
\ge
A_{H,1}+A_{H,2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46d672c308e2a126)
under the usual classical assumptions. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation is not that area is a primitive substance. It is that the horizon-interface label capacity and outgoing-channel entropy must reproduce the same nondecreasing observer-level bookkeeping in the regime where GR is already validated. A schematic closure check is
$$
S_{H,\mathrm{final}}^{(O)}
\ge
S_{H,1}^{(O)}+S_{H,2}^{(O)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d798e93fbafaf192)
for the classical area-theorem benchmark. The separate generalized-entropy row is
$$
S_{H,\mathrm{final}}^{(O)}
+S_{\mathrm{out,final}}^{(O)}
\ge
S_{H,1}^{(O)}+S_{H,2}^{(O)}
+S_{\mathrm{out,initial}}^{(O)}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a3340b512985091a)
Accessible radiation, waves, and release channels belong in the second row; subtracting them from the first would make the classical check weaker than the theorem it is meant to recover.

GW250114 is the clean modern example of this comparison. The useful input is the event packet: near-equal $\sim33M_\odot$ progenitors, low spins, a high signal-to-noise post-merger record with the dominant quadrupolar ringdown mode and first overtone, and an inferred final area larger than the sum of the initial areas. That packet strengthens the area-law and Kerr-ringdown benchmarks, but it does not change the claim level. The native burden is still to recover nondecreasing horizon-interface label capacity and damped ringdown labels from the same source-event record, not to import the event horizon as primitive ontology.

A sharper comparison target comes from generalized-entropy work in semiclassical gravity. In that setting, the entropy relevant to an exterior access region is not only the horizon-area term; it also includes the quantum entropy of radiation and matter outside the inaccessible region. The local translation is an observer-accessible horizon ledger:
$$
\mathcal{B}_{H}^{(O)}(t)
\subseteq
\mathcal{B}_{H}(M,\mathbf{J},Q)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-024f038488722d93)
where $O$ denotes a Physical Observer and $\mathcal{B}_{H}^{(O)}(t)$ is the subset of horizon-interface ledger states indistinguishable to that observer's finite records, clocks, and exterior channels at time $t$. The corresponding comparison target is
$$
S_{H}^{(O)}(t)
=
k_B\log\left|\mathcal{B}_{H}^{(O)}(t)\right|
+
S_{\mathrm{out}}^{(O)}(t)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9b11b8b1039d4149)
where $S_{\mathrm{out}}^{(O)}(t)$ summarizes the entropy of accessible outgoing channels. This equation is not a new ontology. It is a bookkeeping target: the native horizon-interface model should explain how the area-like ledger term and the outgoing-channel entropy combine into a finite observer-level entropy, and how that combined quantity can reproduce Page-curve behavior without importing islands, replica wormholes, or a boundary CFT as primitive structure.

In the same notation, the region-anchored entropy target is
$$
S_{\mathcal{Q},A}^{(O)}(t)
\stackrel{\mathrm{target}}{=}
k_B\log\left|\mathcal{L}_{\gamma_A}^{(O)}(t)\right|
+
S_{\mathrm{out},A}^{(O)}(t)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d39dc579866753c)
The proof burden is to define the observer-relative label ensemble $\mathcal{L}_{\gamma_A}^{(O)}(t)$ from native horizon-interface, boundary-wake, and release-channel records. When $\eta_H(A;\theta)\to1$, this target must reduce to the horizon-interface ledger target above; when $\eta_H(A;\theta)=0$, it remains an access-region entropy comparison and should not be promoted as black-hole horizon entropy.

This also disciplines the local semiclassical version of the information paradox. A statement that a horizon-straddling correlation has been lost is only a promoted comparison claim after the access region, reference resources, boundary wake data, and readout channel have been declared. Local QFT pair language remains useful near a smooth effective horizon, but it is an approximation to an observer-level calculation. The native black-hole closure must say which Physical Observer could recover which part of the release record, and which finite boundary data make that recovery meaningful.

##### Complexity-Growth Comparison Target

Black-hole complexity proposals add a narrower comparison target. Their useful content is not the claim that interior volume is primitive ontology. It is the observation that some black-hole interior comparisons continue to change long after ordinary thermal entropy has effectively saturated. The native translation is a horizon-interface ledger complexity, not a new spacetime substance.

For two compatible horizon-interface label states $\Lambda_a,\Lambda_b\in\mathcal{B}_{H}(M,\mathbf{J},Q)$, define
$$
\mathcal{C}_{H}(\Lambda_a,\Lambda_b)
=
\min\left\{
N:
U_N\circ\cdots\circ U_1(\Lambda_a)=\Lambda_b,\
U_i\in\mathcal{U}_{\mathrm{loc}}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9b294a6c4b9707c1)
where $\mathcal{U}_{\mathrm{loc}}$ is the permitted set of local horizon-interface, assembly, path-history, and release-ledger updates inside the horizon-interface model. For a horizon history, write $\mathcal{C}_{H}^{(O)}(t)$ for the minimum such update count between the observer-accessible initial ledger and the compatible ledger class at time $t$.

The comparison burden is then:
$$
S_H^{(O)}(t)\ \text{approximately saturates while}\
\mathcal{C}_{H}^{(O)}(t)\ \text{can continue to grow}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-27fa1274700d8bd2)
without breaking exterior no-hair behavior, Page-compatible release accounting, or finite-boundary-data regularity. If this growth can be matched only by importing a literal boundary CFT, an AdS interior ontology, or an independent hidden state not present in $\mathcal{B}_{H}^{(O)}(t)$, then the complexity comparison has not been translated into the native black-hole closure.

#### Finite-Boundary Endpoint Closure

The endpoint and information questions should be posed on a compact strong-field region rather than by assuming an observer at asymptotic infinity. For a region $\Omega$ bounded by finite observer-accessible data between absolute times $T_i$ and $T_f$, the native closure target is a single continuation map
$$
\mathcal{T}_{\Omega}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{[T_i,T_f]},
N_{\text{sea}}|_{\Omega\times[T_i,T_f]}
\right)
\longrightarrow
\left(
X_\Omega(T_f),
\mathcal{B}_{H}^{(O)}(T_f),
S_{\mathrm{out}}^{(O)}(T_f)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-145a368c973339ce)
Here $X_\Omega$, $\mathcal{H}_{\Omega}^{<T}$, and $\mathcal{B}_{\partial\Omega}$ are the finite-region variables from [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#ontic-and-epistemic-levels). The closure requirement is not that a particular remnant, bounce, or asymptotic boundary story be adopted. It is that the same finite boundary data determine a finite strong-field continuation:
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}^{(O)}(T_f)\right|<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8ad9379519181dba)
with outgoing energy, momentum, angular momentum, charge, polarity, provenance, and medium-update rows accounted for through the release-channel ledger.

This gives a compact comparison rule for evaporation and endpoint proposals. A proposal can be used as a comparison framework if it sharpens one of those finite-ledger checks. It should not be promoted into the ontology unless the same native horizon-interface variables produce the continuation without an arbitrary endpoint branch or a separate asymptotic bookkeeping rule.

No-hair, cosmic-censorship, Cauchy-horizon, and endpoint theorems enter this chapter with the same assumption discipline. Their strongest use is to preserve exterior compact-object behavior, horizon regularity, non-arbitrary continuation, and finite-release accounting where their hypotheses match the comparison regime. When a theorem assumes an isolated vacuum black hole, asymptotically flat exterior, or global hyperbolicity condition, it cannot by itself settle a black hole embedded in an evolving Noether sea. The retained burden is sharper: the native horizon-interface record must reproduce the exterior $(M,\mathbf{J},Q)$ coarse-graining, avoid observer-level naked-singularity pathology, and select a finite continuation family using finite active-medium boundary data.

As a heuristic geometric picture, the horizon can also be described as a **dimensional pinch** along the candidate orthogonal-axis three-binary response path. On this reading, ordinary 3D assemblies are flattened toward a near-planar disk at the alignment interface, while the interior self-hit regime permits re-opening of the suppressed axial degree of freedom. In shorthand, the proposed response path is
$$
\text{3D sphere} \to \text{2D horizon disk} \to \text{3D interior reopening}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-28e787792b6dc456)
This is not yet a derived strong-field theorem. It is a compact way of expressing why the horizon is treated as an information-compression layer rather than as a literal ontic edge of space. The horizon pinch, the light-speed limit of the Lorentz axis ratio in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md), and the planar coherent-channel limit in [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) all carry a charted ratio $\xi\to0$, but that numerical coincidence does not identify them. They become one geometric endpoint only if a single retained family record derives the same supported geometry and compatible exchange holonomy across the three charts. Until then, the common endpoint is a conditional closure hypothesis.

### Cosmological Embedding and Horizon Regularity

A viable black-hole account in $\mathbb{A}\mathbb{A}\mathbb{A}$ must work at two scales simultaneously. It must reproduce the compact-object phenomenology of the local exterior, and it must remain coherent when the object is embedded in the evolving large-scale medium. This requirement matters because many intuitive pictures of black holes tacitly treat them as if they lived in asymptotically isolated settings, whereas the cosmological sector requires a compact object to sit inside a time-dependent background.

For that reason, the framework treats horizon regularity under cosmological embedding as a non-negotiable structural requirement. If a proposed strong-field description becomes pathological precisely when one asks how the local object couples to the surrounding Noether sea, then it is not yet a closed black-hole model. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the regularity requirement is met not by postulating a passive background but by letting the local strong-field geometry and the ambient Noether sea state backreact on one another through the same constitutive variables.

This point sharpens the proposed role of the horizon interface. In the candidate mechanism, the interface would be both the place where local assembly geometry reaches terminal alignment and the layer through which the compact object remains connected to the surrounding Noether sea without forcing a curvature blowup at the constitutive transition. Horizon regularity is therefore a closure test for whether this black-hole regime can communicate with cosmology, not evidence that the regime already exists.

The strong-field closure should therefore be posed as a Noether sea boundary-condition problem, not as the direct importation of an isolated Schwarzschild or Kerr metric. The horizon-interface condition is the canonical closure problem stated in [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition), written here in shorthand as
$$
F_H=0,
\qquad
v_2=c_f,\quad v_3\to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d5ffe5db48ca3e7)

This chapter supplies the horizon-interface label ensemble $\{\lambda_i^H\}$ defined above as the finite continuation-label family required by the canonical condition, and $\partial\Omega$ denotes the boundary data supplied by the surrounding Noether sea and the effective exterior comparison region. The equation is a closure target, not a completed model: the task is to show that the same Noether sea variables that recover weak-field gravity can also admit a regular terminal-alignment interface under non-isolated embedding conditions. Compact, topologically identified, or otherwise non-asymptotically-flat comparison settings are useful stress tests for this requirement, but they do not add extra dimensions to the substrate ontology.

The finite-boundary-data version of this requirement is inherited from [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md#finite-boundary-data-regularity). For every compact strong-field comparison region $\Omega$, the native variables $\rho_{\text{NS}}(\mathbf X,T)$, $\Sigma_{\text{sea}}(\mathbf X,T)$, and $\mathbf u_{\text{sea}}(\mathbf X,T)$ must remain finite while the horizon-interface condition is imposed. This is the local substitute for treating a classical metric singularity as an endpoint: the weak-field variables may fail, but the Noether sea ledger and maximum-curvature closure must not become arbitrary.

Recent regular-horizon cosmological-embedding work is useful at this comparison level. Its value is not that an FLRW-embedded Schwarzschild variant or anisotropic-fluid source becomes the native model. The useful pressure is structural: a compact object must be describable inside an evolving large-scale background without producing a new curvature pathology at the horizon interface. In the external comparison, that requires apparent-horizon rather than static-horizon discipline, local/cosmological backreaction, and a mass split such as Misner-Sharp accounting so the compact-object contribution is not silently confused with the cosmological density term. In the local ontology, the same lesson translates into finite Noether sea boundary data, finite native variables, and a non-arbitrary maximum-curvature continuation through the interface record used for exterior mass, redshift, and release-channel comparisons.

### Interior Dynamics and Recycling

Inside the black-hole regime, the dominant language is recycling rather than annihilation. Matter and radiation driven inward do not disappear from ontology. They are processed through branch-derived self-hit layers, interface locking, and exposed-channel reconfiguration. The resulting interior is best treated as a statistical medium of maximal-curvature assemblies rather than as a smooth classical fluid or a single deterministic orbit family.

The working picture has four parts:

- infalling assemblies are compressed toward maximal-curvature states;
- energy is redistributed across inner, middle, and outer layers rather than lost from the ontology;
- the horizon interface mediates which excitations remain trapped, which are delayed, and which can be re-expressed as outbound channels;
- re-emergence may occur through jets, radiative outflows, dark-sector photon-channel-adjacent modes, or other medium excitations, depending on the local state of the core and interface.

The corresponding interior-state ladder is a claim-level map, not a proof that every compact object realizes every rung:

| Layer | Native record | Observer-facing pressure |
| --- | --- | --- |
| Ordinary infall | matter, radiation, and Noether sea assemblies entering the compact region | accretion luminosity, disk state, and inflow angular momentum |
| Compact-matter predecessor | dense nuclear, quark, or mixed assembly support before horizon-interface exit | mass-radius, equation-of-state, and tidal-deformability constraints |
| Maximum-curvature packing | finite packed assembly and Noether braid records with self-hit-dominant closure | singularity replacement and finite-boundary-data regularity |
| Horizon-interface selection | alignment-compatible labels, trapped and outbound channel decisions | entropy capacity, release-channel selection, and exterior ring/jet observables |
| Outbound reconstitution | released assembly, photon-channel, dark-sector, or medium-excitation routes | jets, winds, diffuse release, dark-sector signatures, or reabsorption |

The ladder keeps interior discussion from jumping directly from generic infall to visible jets or cosmological source terms. Each occupied rung must carry energy, momentum, angular momentum, polarity, provenance, shielding/exposure, and Noether sea update rows.

This is the sense in which black holes are treated as recycling furnaces in the cosmology chapters. The claim is not that every specific ejecta channel has already been derived. The claim is that the interior is an energy-partition and reprocessing regime, not a terminal ontic sink.

The same picture implies that the effective mass of a black hole need not be interpreted as a purely isolated bookkeeping variable. If the horizon interface and interior remain constitutively coupled to the ambient Noether sea, then part of what observers infer as compact-object mass can depend on how the surrounding Noether sea loads, unloads, or stores energy around the recycling site. This does not license arbitrary mass drift. It means that the distinction between "local compact-object state" and "embedding Noether sea state" is dynamical rather than absolute.

The corresponding mass statement is an exposure ledger, not a claim that mass can disappear. In a resolved strong-field window the exterior reconstruction must separate incoming energy, compact stored energy, shielding and exposure change, escaped outflow, reabsorbed content, and embedding Noether sea loading. A useful schematic form is

$$
\Delta\!\left(M_{\mathrm{app}}c_0^2\right)
=
\Delta E_{\mathrm{comp,exp}}
+\Delta E_{\mathrm{sea,emb}}
-\Delta E_{\mathrm{out,esc}}
+R_{M,\mathrm{app}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-47d26a0d30a824e4)

with the hidden rows expanded when a release channel is being tested. The point is not that the compact object violates conservation. The point is that the observer-facing mass label is a projection of a larger strong-field, shielding, release, and medium-coupling record.

### Mass-Scale Traversal

The exterior-to-core sequence is the same for black holes at every mass scale, but the relative weight of the local gradients, horizon-interface capacity, release channels, and cosmological embedding changes with mass. The useful comparison is therefore not a separate ontology for small, stellar, and supermassive black holes. It is one traversal map evaluated with different effective horizon scales.

In a weak exterior comparison, write the observer-level horizon scale as

$$
R_H(M;\theta)
\simeq
\frac{2G_{\mathrm{eff}}(\theta)M}{c_0^2},
\qquad
A_H(M;\theta)
=
4\pi R_H^2(M;\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-62064b3ef3ff0630)

The native strong-field interpretation does not treat $R_H$ or $A_H$ as primitive geometry of the Euclidean void. They are observer-level readouts of the same horizon-interface condition $v_2=c_f,\ v_3\to c_f$. Still, their scaling organizes which closure burden dominates. The interface label capacity scales schematically like

$$
N_{\mathrm{align}}(M;\theta)
\sim
\frac{A_H(M;\theta)}{A_{\mathrm{align}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dd008719f47864f6)

while the exterior tidal or curvature pressure at the horizon scales, in the same comparison limit, like

$$
\mathcal{K}_H(M;\theta)
\sim
\frac{G_{\mathrm{eff}}(\theta)M}{R_H^3(M;\theta)}
\propto
M^{-2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a7c3ebaa44b1c5d2)

This gives a compact mass-scale rule. Small black holes concentrate the traversal into a tiny region with steep local gradients, high comparison temperature, and release-channel pressure. Stellar-mass or intermediate black holes are the clean collapse-ladder case: the record must pass from compact matter through the neutron-star branch or its failure into the horizon-interface branch. Supermassive black holes have comparatively gentle local horizon gradients but enormous interface capacity, long-lived recycling, and the strongest coupling to the ambient Noether sea embedding.

| Scale | Dominant pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading |
| :--- | :--- | :--- |
| Small or near-evaporating black hole | Steep local gradients, high release-channel pressure, small $N_{\mathrm{align}}$ | Best stress test for finite maximum-curvature replacement, Hawking-like release normalization, and endpoint ledger closure. |
| Stellar-mass or intermediate black hole | Collapse-ladder continuity and merger/ringdown consistency | Best stress test for the handoff from dense matter support to terminal alignment and for exterior strong-field recovery. |
| Supermassive black hole | Large $N_{\mathrm{align}}$, long recycling time, strong environmental embedding | Best stress test for Noether sea loading, release-channel selection, dark-sector hypotheses, and possible cosmological coupling. |

A small compact object passing through material is therefore a response problem, not merely a mass label. For a candidate with effective radius $R_X$, mass $M_X$, speed $v_X$, and material density $\rho_{\mathrm{mat}}$, the transit ledger should estimate the deposited energy and damage radius from the material response function:
$$
\frac{dE_{\mathrm{dep}}}{d\ell}
=
\mathcal{S}_{\mathrm{stop}}(M_X,R_X,v_X;\theta_{\mathrm{mat}}),
\qquad
r_{\mathrm{dam}}
=
\mathcal{D}_{\mathrm{mat}}
\left(
\frac{dE_{\mathrm{dep}}}{d\ell},
\theta_{\mathrm{mat}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e3ced3a967c4feac)
If the object is horizon-like in the observer comparison, $R_X$ is bounded by the effective horizon scale $R_H(M_X;\theta)$; if it is a native maximum-curvature defect, $R_X$ is instead supplied by the core-interface branch. Either way, the material claim must pass through the same energy-deposition, acoustic, thermal, and defect-survival record before it is used as evidence for a compact dark-sector branch.

The scale map is a classification aid, not a new gate. It says which existing black-hole burdens become sharp as $M$ changes: small black holes emphasize endpoint and release accounting, intermediate-mass black holes emphasize collapse continuity, and supermassive black holes emphasize embedded recycling and Noether sea state source terms.

### Jets and Other Release Channels

Jets should remain in the black-hole story, but they should be placed at the correct level. In $\mathbb{A}\mathbb{A}\mathbb{A}$, jets are not the definition of recycling. They are one candidate macroscopic manifestation of release from a recycling site. The deeper claim is that strong-field interiors can return some portion of their processed content to the surrounding Noether sea; the jet question is how much of that return becomes collimated, how much remains diffuse, and how much leaves in channels that are initially dark to ordinary electromagnetic observation.

For that reason, the framework uses a release-channel hierarchy:

- **Required constitutive result:** a retained event must show whether and how infalling matter and radiation are reprocessed into outward channels.
- **Astrophysical channel possibility:** some derived outward channels may become observable jets or winds.
- **Speculative dark-sector possibility:** a derived channel may cross outward through the horizon interface as a recycled dark-matter-like or dark-energy-like assembly, or as a dark-sector photon-channel-adjacent mode, before later converting into visible excitations.

This hierarchy keeps the theory from overcommitting to a single morphology. A jet is evidence for organized outflow, not by itself proof that all recycling must emerge in collimated form.

The same hierarchy also separates two recycling modes. A strong-field site may load the surrounding Noether sea diffusely without producing a narrow visible jet, or it may route part of the same processed content into a collimated assembly, photon-channel, or mixed-sector outflow. These are different channel records. The diffuse mode asks how the ambient Noether sea density, cadence, orientation, and delay-factor state are updated. The collimated mode asks how the horizon interface, disk or boundary layer, and environment select a directed outflow with definite energy, momentum, angular momentum, composition, and lifetime.

The candidate ordering can be phrased as a sequence.

1. A retained core-processing record would compress infalling content into maximum-curvature and alignment regimes.
2. A derived horizon-interface selector would determine which modes remain trapped and which can move outward.
3. The released content would then appear as one or more observer-level channels: jets, broader winds, radiative outflow, or initially dark-sector escape.

This ordering preserves your original intuition that jets may inject recycled matter or energy into the surrounding Noether sea while keeping the framework open to the possibility that some released content leaves the horizon interface in forms that are not immediately visible.

#### Dark-Sector Escape and Re-Entry

The local framework therefore keeps open the possibility that some processed content crosses outward through the horizon interface in a form that is initially dark to ordinary electromagnetic observation. In that case, "escape the event horizon" should be read in the constitutive sense: a mode successfully traverses outward through the alignment-locked interface after a state transition.

Three working possibilities remain live:

- **Dark-sector escape:** a released mode stays weakly coupled to visible matter after outward crossing and contributes mainly through gravitational or dark-sector signatures.
- **Recycled dark assemblies:** the released content emerges as assembly populations that behave effectively like dark matter or dark energy after outward crossing, remaining weakly coupled to visible channels.
- **Dark-sector photon-channel-adjacent escape with later conversion:** a released mode exits in an initially dark photon-channel-adjacent form and only farther from the horizon re-enters visible channels through dissipation, coupling, or geometric relaxation.

#### Jet Production as a Selection Problem

The open physical question is not merely whether release occurs, but why some environments produce narrow, persistent jets while others favor broader or darker outflows. In this framework, that is a channel-selection problem governed by at least four ingredients:

- the degree of horizon-interface alignment;
- the state of the surrounding Noether sea, including anisotropy and loading;
- the composition of the released mode mix;
- the ambient matter and effective magnetic-like environment through which the outflow propagates.

This is the disciplined way to keep jets in the chapter: as one important release channel among several, rather than as the whole definition of recycling.

Rotating compact sources add one more bridge variable. In standard comparison language, frame dragging is a metric effect around a rotating mass. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it should be recovered as an effective readout of the same angular-momentum ledger, surrounding Noether sea vorticity, and horizon-interface state that also enter release selection:

$$
\boldsymbol{\omega}_{\mathrm{eff}}
=
\mathcal{W}_{\mathrm{drag}}
\left(
\mathbf{J}_{\Omega},
\nabla\times\mathbf{u}_{\mathrm{sea}},
\mathcal{A}_{\mathrm{NS}},
\mathcal{B}_{H}
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0dcde99b02fc2c01)

This does not make the Euclidean void rotate. It states the recovery target: the observer-level dragging of local inertial frames must be reconstructed from compact-source angular momentum, Noether sea flow and anisotropy, and the same interface record used by jets or diffuse release.

Observer-level jet phenomenology supplies three compact constraints on this selection problem. First, powerful collimated outflows are strongly associated with compact accretors and disks, so the native record must include an inflow, disk, or boundary-layer source of energy and angular momentum. Second, across young stellar objects, microquasars, and active galactic nuclei, the characteristic jet speed is usually of order the escape or Keplerian speed at the launch region:

$$
\mathcal{R}_{v,\mathrm{jet}}
\equiv
\frac{v_j}{v_{\mathrm{esc}}(R_{\mathrm{launch}})}
\sim
1,
\qquad
v_{\mathrm{esc}}(R_{\mathrm{launch}})
=
\left(\frac{2G_{\mathrm{eff}}M}{R_{\mathrm{launch}}}\right)^{1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3dd87967d27be21f)

This is an effective launch benchmark, not a claim that Newtonian escape speed is substrate ontology. It says that the same strong-field or disk-interface record that powers release must also set the observed launch speed scale. Third, collimation must survive propagation through the ambient Noether sea. A minimal release-channel packet should therefore record

$$
\mathcal{Q}_{\mathrm{jet}}
=
\left(
\frac{dM_{\mathrm{out}}}{dt_{\mathrm{eff}}},
\frac{d\mathbf P_{\mathrm{out}}}{dt_{\mathrm{eff}}},
\frac{dE_{\mathrm{out}}}{dt_{\mathrm{eff}}},
\frac{d\mathbf J_{\mathrm{out}}}{dt_{\mathrm{eff}}},
\theta_j,
\eta_j,
\mathcal{A}_{\mathrm{NS}},
\mathcal{R}_{v,\mathrm{jet}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-859f25945f10c7a8)

where $\theta_j$ is the opening angle, $\eta_j$ is the observer-level jet-to-ambient density ratio, and $\mathcal{A}_{\mathrm{NS}}$ is the local Noether sea anisotropy and loading state mapped to effective magnetic-like collimation. In a black-hole branch, spin-powered extraction, disk-powered extraction, hot-corona loading, and supercritical accretion are comparison mechanisms until the native horizon-interface ledger shows which terms actually supply $dE_{\mathrm{out}}/dt_{\mathrm{eff}}$ and $d\mathbf J_{\mathrm{out}}/dt_{\mathrm{eff}}$. A model fails this selection packet if it produces a horizon recycling source but leaves the launch-speed scale, angular-momentum drain, or collimation angle unrelated to the same boundary data.

AGN jets sharpen this packet because the same source class ties near-hole launching to large-scale environmental work. The observer-level review signal is not "spin alone makes a jet." Powerful radio jets appear to require a rotating compact object plus a strongly loaded disk or inflow state that can sustain large-scale ordered stress; lower-power or differently loaded systems may stay radio quiet, form weak steady jets, or degrade into plumes. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this becomes a release-channel selector rather than a new ontology. Let

$$
\Theta_{\mathrm{AGN}}(t)
=
\left(
M,\mathbf{J},
\dot M_{\mathrm{in}}(R_{\inf},t),
\dot M_{\mathrm{acc}}(R_{\mathrm{launch}},t),
\Phi_{\mathrm{BH}}^{\mathrm{obs}}(t),
\mathcal{A}_{\mathrm{NS}}(R,t),
\Sigma_{\mathrm{wind}}(R,t),
\mathcal{B}_{H}(t)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c1ed7053c4c26c75)

where $R_{\inf}$ is the observer-level black-hole influence scale, $\Phi_{\mathrm{BH}}^{\mathrm{obs}}$ is the standard black-hole magnetic-flux comparison diagnostic rather than substrate field ontology, $\mathcal{A}_{\mathrm{NS}}$ is the mapped Noether sea anisotropy and loading state, and $\Sigma_{\mathrm{wind}}$ records disk-wind or sheath confinement. The local selector must then produce one channel record

$$
\Pi_{\mathrm{AGN}}[\Theta_{\mathrm{AGN}}]
\mapsto
\left(
\frac{dE_j}{dt_{\mathrm{eff}}},\frac{d\mathbf P_j}{dt_{\mathrm{eff}}},\frac{d\mathbf J_j}{dt_{\mathrm{eff}}},
\Gamma_j,\theta_j,
\sigma_j(R),
f_p(R),
R_{\mathrm{ACZ}},
R_{\mathrm{diss}},
\mathcal{H}_{\mathrm{shock}},
\mathcal{S}_{\mathrm{rad}},
\mathcal{F}_{\mathrm{fb}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f0181e05879e30d)

Here $\Gamma_j$ is the observer-level bulk Lorentz factor, $\sigma_j$ is the observer-level magnetization comparison ratio, $f_p$ is the proton or baryon loading fraction, $R_{\mathrm{ACZ}}$ is the acceleration-and-collimation-zone scale, $R_{\mathrm{diss}}$ is the main dissipation radius or family of radii, $\mathcal{H}_{\mathrm{shock}}$ records recollimation shocks, hot spots, bow shocks, and Mach-disk-like structures, $\mathcal{S}_{\mathrm{rad}}$ records the synchrotron, Compton, hadronic, pair-cascade, cosmic-ray, and neutrino channels retained by the comparison, and $\mathcal{F}_{\mathrm{fb}}$ records environmental heating, cavity, cocoon, bubble, and duty-cycle effects. The native burden is that these outputs come from one horizon-interface, disk-interface, wind, and Noether sea loading record, not from separate fitted stories for launch, radio emission, gamma emission, and galaxy feedback.

A compact AGN-jet residual can therefore be written as

$$
\begin{aligned}
\mathcal{R}_{\mathrm{AGN\,jet}}(\theta)
=&
w_{\mathrm{launch}}\,
d_{\mathrm{launch}}\!\left[
\Pi_{\mathrm{AGN}}(\Theta_{\mathrm{AGN}}),
\left(M,\mathbf{J},\dot M_{\mathrm{in}},\Phi_{\mathrm{BH}}^{\mathrm{obs}},\mathcal{A}_{\mathrm{NS}}\right)
\right]
\\
&+
w_{\mathrm{coll}}\,
d_{\mathrm{coll}}\!\left(
\theta_j,\frac{R_{\mathrm{ACZ}}}{R_{\inf}},\Sigma_{\mathrm{wind}},\mathcal{A}_{\mathrm{NS}}
\right)
\\
&+
w_{\mathrm{load}}\,
d_{\mathrm{load}}\!\left(
\sigma_j(R),f_p(R),\Gamma_j,\eta_j
\right)
\\
&+
w_{\mathrm{shock}}\,
d_{\mathrm{shock}}\!\left(
\mathcal{H}_{\mathrm{shock}},
\{\text{recollimation},\text{hot spot},\text{bow/Mach structure}\}
\right)
\\
&+
w_{\mathrm{rad}}\,
d_{\mathrm{rad}}\!\left(
\mathcal{S}_{\mathrm{rad}},
\{\text{radio},\text{X-ray},\gamma,\nu,E_{p,\max}\}
\right)
\\
&+
w_{\mathrm{fb}}\,
d_{\mathrm{fb}}\!\left(
\mathcal{F}_{\mathrm{fb}},
\{T_{\mathrm{engine}},T_{\mathrm{rad}},D_{\mathrm{duty}},E_{\mathrm{cocoon}},E_{\mathrm{bubble}}\}
\right).
\end{aligned}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ca7eb4b60f6070a1)

The pass condition $\mathcal{R}_{\mathrm{AGN\,jet}}(\theta)\le\epsilon_{\mathrm{AGN\,jet}}$ is a benchmark on release-channel closure. It captures six source signals at once. First, black-hole spin is necessary-looking but insufficient unless the disk, inflow, and surrounding Noether sea loading sustain the ordered stress needed for launch. Second, collimation over radii from near $R_{\mathrm{launch}}$ toward $R_{\inf}$ must be attributed either to disk wind, sheath, gas pressure, or the mapped anisotropy state $\mathcal{A}_{\mathrm{NS}}$, not to an unspecified funnel. Third, high-power jets may become proton-dominated or baryon-loaded enough that $f_p$ controls cosmic-ray, neutrino, and hadronic cascade channels. Fourth, FR-I and FR-II behavior must be separated by the same propagation record: weak or disrupted jets dissipate near the black-hole/galaxy transition and become plumes or bubbles, while powerful jets keep relativistic kinetic power to terminal hot spots. Fifth, shocks, reconnection-like comparison regions, pair production, and pair cascades are radiation-channel benchmarks, not independent sources of free energy. Sixth, source age and environment matter: a jet engine, lobe, cocoon, and duty cycle must all close the same energy, momentum, angular-momentum, provenance, and medium-update ledger.

This residual also states a useful failure mode. A model that matches a near-hole jet image but cannot account for hot spots, lobes, cosmic-ray or neutrino limits, and environmental heating has not closed the AGN release channel. Conversely, a model that fits large radio lobes while leaving launch selection unrelated to spin, accretion, wind/sheath confinement, and $\mathcal{A}_{\mathrm{NS}}$ has only fit the downstream plume. The whole point of the AGN packet is to force the release selector to connect the black-hole branch, disk-interface branch, propagation branch, radiation branch, and feedback branch with one declared state record.

### Relation to Dark Energy and Expansion History

The black-hole chapter does not identify dark energy with black holes by definition. The baseline dark-energy mechanism in $\mathbb{A}\mathbb{A}\mathbb{A}$ remains Noether sea relaxation, as developed in [../cosmology/dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md). Black holes enter that story only if strong-field recycling makes a measurable contribution to the slowly varying binary-3 tension sector.

The clean constitutive chain is:

1. strong-field compression drives assemblies into horizon and interior recycling regimes;
2. recycling redistributes energy between locked internal modes and outward-propagating medium excitations;
3. those excitations can, in principle, alter the large-scale Noether sea state;
4. the cosmology module then reads that altered Noether sea state as part of $\rho_{\mathrm{DE,eff}}(z)$ or its source term.

This means black holes are candidate contributors to dark-energy phenomenology, not substitutes for the Noether sea ontology.

The equilibrium-transport version of this claim is more specific. Strong-field recycling may act as a source term for the Noether braid cadence distribution of the surrounding Noether sea. If $f_N(\nu,\mathbf X,T)$ records the local distribution of Noether braid cadence states with $E_N=h\nu_N$, then a black-hole contribution appears as $S_{\mathrm{BH}}$ in a medium equation of the form

$$
\partial_T f_N
+\nabla_{\mathbf X}\cdot(\mathbf u_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7b2c74a42bd36f70)

This is the controlled sense of a bulk recycling movement: processed content from high-gradient recycling regions can load the Noether sea and then relax toward lower-energy Noether sea cadence states. The statement remains conditional because $S_{\mathrm{BH}}$ must be energy-accounted, population-history dependent, and small enough not to spoil weak-field gravity, photon coherence, CMB blackbody quality, or gravitational-wave propagation. If the resulting current $J_\nu$ has no signed large-scale component, the recycling channel may still heat or perturb local environments without becoming an effective expansion-history source.

### Cosmological Coupling Hypothesis

One modern comparison target is the claim that some dormant supermassive black holes appear to gain mass in step with the late-time cosmological background more strongly than standard accretion and merger channels predict. The common phenomenological summary is

$$
M_{\mathrm{BH}}(a) \propto a^{K}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6cbc9d3673eb8afa)

with $K$ measuring the effective coupling strength.

Within $\mathbb{A}\mathbb{A}\mathbb{A}$, such a signal would be interpreted constitutively rather than mystically. A nonzero $K$ would suggest that black holes are not isolated bookkeeping devices embedded in a passive background. It would suggest that strong-field recycling zones remain coupled to the evolving Noether sea strongly enough for the population to retain memory of the large-scale Noether sea state.

That interpretation remains conditional. The observational correlation must first survive ordinary astrophysical alternatives such as hidden accretion, merger incompleteness, host selection, and mass-calibration drift. Even if the correlation survives, the theory still must show how interior recycling feeds a cosmological source term without spoiling other closure targets.

In local usage, $K$ should therefore be treated as a phenomenological diagnostic rather than as a primitive constant of nature. Its value summarizes how strongly the population of recycling sites appears to track the expansion history in a given observational reconstruction. The underlying $\mathbb{A}\mathbb{A}\mathbb{A}$ hypothesis remains deeper: any apparent coupling must emerge from a derived braid-alignment response, maximum-curvature storage, interface transport, and outward medium loading.

### Population History and Source Accounting

If black holes contribute to late-time cosmology, the contribution cannot depend only on the state of one idealized object. It must also depend on the history by which the relevant population of recycling sites was produced and fed. In observational language this often appears as a dependence on star-formation history, compact-object formation history, merger history, or host-galaxy environment. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the deeper statement is that the source term inherits a memory of how matter was routed into strong-field processing zones over cosmic time.

This matters because a population-level dark-energy contribution cannot be inferred from compact-object coupling alone. One also needs the production history of the sites doing the recycling and the transport history of the energy they release into the Noether sea. For the local framework, that means the cosmological source term associated with black holes should be modeled as a functional of at least three histories:

- the formation history of compact strong-field sites;
- the inflow history of matter and radiation into those sites;
- the release history of outward channels that load the surrounding Noether sea.

The DESI-era cosmological-coupling packet sharpens the first row by tying the effective source history to the cosmic star-formation rate density rather than to an arbitrary homogeneous term. In the external cosmologically coupled black-hole comparison, stellar collapse mediates matter conversion into an effective dark-energy contribution, and the same fit is tested against expansion history, BBN baryon abundance, local-distance-ladder tension, and summed-neutrino-mass constraints. The local use of that packet is a recovery target: if strong-field recycling contributes to $\rho_{\mathrm{DE,eff}}(z)$, then one retained formation, inflow, release, and Noether sea transport record must explain the timing of the source term and its compatibility with those independent rows. It is not imported as vacuum-energy ontology or as proof that black holes are the whole dark-energy mechanism.

High-redshift quasars add a compact source-accounting stress test. The observational product is not a black-hole mass in isolation: it joins a redshifted spectrum, absorption by the reionization-era intergalactic medium, broad emission-line velocities near the central engine, luminosity modeling, and survey selection into one inferred early supermassive black hole record. A quasar seen when the universe is only a few percent of its current age but whose spectrum implies a compact object near $10^9M_\odot$ is therefore not merely a large-mass anecdote. It asks whether the same redshift, clock-rate comparison, formation, inflow, and release histories can produce the observed source without switching comparison records.

Little-red-dot spectroscopy supplies the obscured-accretion version of the same test. In GLIMPSE-17775 at $z=3.501$, foreground lensing by Abell S1063, JWST/NIRCam photometry, and a deep JWST/NIRSpec/G395M spectrum expose more than forty emission and absorption features. The important data product is not just a broad-line black-hole mass. Exponential permitted-line wings, Balmer and helium absorption, Ly$\beta$-pumped Bowen-fluorescent oxygen lines, and a Ly$\alpha$-pumped Fe II forest indicate that line formation is dominated by a dense, partially ionized cocoon around a rapidly accreting compact source. The external "black hole star" phrase is therefore retained only as comparison language: for $\mathbb{A}\mathbb{A}\mathbb{A}$ the recovery target is one early strong-field growth record that keeps the central engine, gas reprocessing, host component, lensing map, X-ray/radio suppression, and inferred Eddington ratio in the same source-history account.

QSO1 in Abell 2744 adds the direct-dynamical version of the little-red-dot test. At $z=7.04$, foreground lensing and multiple imaging let JWST spectral astrometry resolve a rotating gas field around the compact source. The important result is that the velocity field behaves like a point-mass-dominated Keplerian record rather than an extended stellar cluster, diffuse host component, or dark-matter halo alone. The inferred central mass is tens of millions of solar masses, while the host is chemically primitive and comparatively light. For $\mathbb{A}\mathbb{A}\mathbb{A}$ the safe recovery target is therefore not the claim that primordial black holes are confirmed. It is a same-source early-growth packet binding lensing reconstruction, gas kinematics, compact mass inference, host mass, metallicity, X-ray faintness, and seed-history interpretation before direct-collapse or primordial-black-hole language is allowed to act as a comparison branch.

Inactive high-redshift black holes add the complementary stress test because their masses are not inferred from current quasar luminosity. In MRG-M0138 at $z\simeq1.95$, JWST integral-field spectroscopy, a foreground lens model, and stellar-dynamical fitting resolve the host's central stellar kinematics well enough to infer an inactive black hole near $6.0^{+2.1}_{-1.7}\times10^9M_\odot$. The observational packet is therefore different from the quasar packet: foreground lens reconstruction, source-plane mapping, stellar velocity dispersion, dynamical-model family, host quiescence, and survey selection all enter the mass record. For $\mathbb{A}\mathbb{A}\mathbb{A}$, the useful lesson is not that a dormant object supplies a new ontology. It is that early strong-field site formation, host-galaxy quenching, and later invisibility must be handled by one formation, inflow, release, and Noether sea history rather than by fitting a compact-object mass separately from the galaxy-history record.

In compact form, the comparison target is
$$
\mathcal{R}_{\mathrm{QSO}}(\theta)
=
d_{\mathrm{QSO}}\!\left(
D_{\mathrm{QSO}}^{\mathrm{obs}},
\Pi_{\mathrm{QSO}}\!\left[
\theta;
\mathcal{H}_{\mathrm{form}},
\mathcal{H}_{\mathrm{in}},
\mathcal{H}_{\mathrm{rel}},
\chi_{\text{sea}}
\right]
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-899780ec86ee1574)
where $D_{\mathrm{QSO}}^{\mathrm{obs}}$ is the observer-level quasar spectrum and mass-inference packet, while the projection $\Pi_{\mathrm{QSO}}$ must use the same formation, inflow, release, and Noether sea delay histories that the cosmology module uses for redshift and source-age comparison. If a model infers the quasar age with one clock and redshift map, grows the black hole with another history, and assigns the released medium loading with a third, the high-redshift quasar has exposed a split record rather than a closed black-hole source account.

This is one reason the black-hole contribution in $\mathbb{A}\mathbb{A}\mathbb{A}$ should remain subordinate to the Noether sea ontology. The Noether sea is still the quantity that carries the cosmological state. Black holes matter because they may be concentrated engines for changing that state, not because they replace the state itself.

### Observable Targets and Falsifiers

The black-hole program in $\mathbb{A}\mathbb{A}\mathbb{A}$ earns credibility only if it constrains observation rather than merely renaming paradoxes. The main tests are the following.

- **Exterior recovery:** outside the alignment regime, the effective geometry must remain consistent with already-tested GR phenomenology, including lensing, timing, orbital dynamics, and gravitational-wave propagation.
- **Horizon-scale consistency:** horizon imaging and near-horizon emission structure must be reproducible without introducing conflicts with the canonical alignment condition.
- **Maximum-power recovery:** strong-field release channels must remain compatible with the standard Planck-luminosity scale $L_P\sim c^5/G$ and its maximum-force companion $F_P\sim c^4/G$ at the effective level; the native explanation should derive the corresponding scale from the same horizon-interface, Noether sea response, and exterior-export record rather than by imposing a separate source cutoff.
- **Embedding regularity:** the same strong-field description must remain regular when the compact object is treated as embedded in an evolving large-scale medium rather than an artificially isolated background.
- **Finite-boundary-data regularity:** finite surrounding Noether sea data must determine finite native variables and a non-arbitrary maximum-curvature continuation through the alignment regime.
- **Continuation discipline:** Cauchy-horizon or endpoint comparisons may sharpen the finite-boundary-data test, but they do not select a global branch unless the native horizon-interface ledger supplies the finite continuation family.
- **Information-theoretic recovery:** after the native horizon-interface dynamics are derived, the entropy accounting must remain compatible with unitarity and Page-curve behavior without treating islands, replica wormholes, or a boundary CFT as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.
- **Population coupling test:** any claimed cosmological black-hole coupling must survive hidden-accretion and merger-systematics analysis and fit consistently with the late-time expansion history.
- **History accounting:** any black-hole source term must be compatible with plausible compact-object formation and feeding histories; one cannot simply posit a present-day population effect while ignoring the route by which the population was produced.
- **High-redshift quasar growth:** early massive quasars must be explained using one redshift, clock-rate comparison, formation, inflow, and release record; the inferred black-hole mass may not be separated from the spectrum, reionization absorption, broad-line velocity, luminosity model, and survey-selection packet that produced it.
- **Obscured early-growth spectroscopy:** little-red-dot and dense-cocoon spectra must separate virial motion from electron-scattering line broadening, fluorescence, absorption, lensing, and host-light decomposition before their masses or accretion rates are used as early-growth constraints.
- **Release-channel discrimination:** if jets, diffuse outflows, and dark-sector release are all allowed in principle, the framework must eventually state which environments prefer which channels and what observer-level signatures distinguish them.
- **AGN jet closure:** for supermassive systems, the same release selector must connect spin, disk/inflow loading, observer-level magnetic-flux diagnostics, disk-wind or sheath confinement, jet composition, collimation scale, shocks or hot spots, radiation channels, cosmic-ray/neutrino bounds, and environmental work.
- **Source-age dependence:** engine lifetime, lobe radiative lifetime, duty cycle, FR-I/FR-II morphology, and high-redshift source abundance must enter the source accounting as history variables rather than as static labels.
- **No free energy:** recycling cannot function as perpetual creation. Any outward channel must be accounted for as redistribution from infalling matter, radiation, or pre-existing medium energy.
- **Cross-module closure:** the same strong-field constitutive map must remain compatible with [../cosmology/dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), [../cosmology/CMB.md](../../../../markdown/aaa/cosmology/CMB.md), and [../cosmology/dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md).

The clearest falsifier would be a precise, multi-probe data set showing that black-hole population evolution is fully explained by conventional accretion and merger history while late-time acceleration remains incompatible with any medium-relaxation channel sourced by the same constitutive variables. In that case, black holes would remain important compact objects, but not privileged drivers of the cosmological sector.

### Interfaces to Other Chapters

This chapter centralizes the black-hole ontology and hands specific tasks to adjacent chapters.

- [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md): canonical horizon alignment condition and singularity replacement language.
- [Horizon Chirality and Planar Spin](../../../../markdown/aaa/spacetime/horizon-chirality.md): conditional 3D-to-2D chirality reduction and the independent axialization burden.
- [general-relativity.md](../../../../markdown/aaa/spacetime/general-relativity.md): weak-field and strong-field observational closure targets.
- [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation): prescribed coincident-midpoint orthogonal-axis braid regime map, recycling sketches, and kinematic hypotheses; it does not establish the black-hole assignment.
- [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md): exploratory Planck-alignment interpretation of terminal horizon locking.
- [../cosmology/dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md): effective dark-energy source terms and late-time expansion history.
- [../cosmology/CMB.md](../../../../markdown/aaa/cosmology/CMB.md): recycling cosmology and SMBH-sourced chronology mapping.
- [../cosmology/dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md): dark-sector processing and SMBH recycling constraints.

### Summary

The candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ strong-field picture treats black holes as Noether sea regimes rather than ontic singularities or void defects. It proposes a terminal-alignment horizon interface and a maximum-curvature recycling interior; both remain closure targets, as does any measurable contribution of recycling to the late-time Noether sea state. What remains strongest from standard black-hole theory is the observer-level phenomenology. The proposed ontological reclassification treats geometry as an effective summary of constitutive Noether sea behavior and singularity language as a marker of failed extrapolation, but acceptance requires the retained histories, boundary conditions, ledgers, and observer recovery defined in this chapter.

## Singularity Resolution

This chapter explains what replaces a singularity in the strong-field part of the model. The guiding idea is not that an infinite-density point is hidden behind better coordinates. It is that compact Noether braid assemblies enter a finite maximum-curvature or horizon-interface regime whose boundary data must close. This is the canonical strong-field bridge for [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md).

The important conversion is from an infinite-endpoint question to a finite-boundary-data question. The strong-field model must say what assembly state is packed, what exterior records remain readable, what boundary data determine continuation, and why no zero-volume or arbitrary branch endpoint is required.

### Canonical Strong-Field Alignment Condition

This chapter is the canonical source for the strong-field event-horizon alignment condition used across spacetime documents. The condition marks the assembly-level state that the effective horizon description is trying to summarize.

Use the following regime definition near the horizon:
$$
v_2=c_f,\qquad v_3\to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c6fce30f92818c9a)
The arrow records approach from ordinary exterior coupling in this declared source record. At terminal alignment, binary 3 reaches the same field-speed threshold as binary 2, all three indexed binary axes become coplanar and co-linear, and precession ceases in that limit. These speed assignments are source-record constraints, not taxonomy-assigned roles.

This condition is a constitutive boundary condition on Noether sea state, not an isolated metric ansatz imported from an asymptotically flat solution. The horizon is therefore treated as an interface problem: what packed assembly state is allowed, what boundary data reach the exterior, and which continuation labels remain finite? In schematic form, the horizon-interface closure problem is
$$
F_H\!\left[
\rho_{\text{NS}}(\mathbf X,T),
\Sigma_{\text{sea}}(\mathbf X,T),
\mathbf u_{\text{sea}}(\mathbf X,T),
\{\lambda_\alpha^{\mathrm{cont}}\}_{\alpha\in I_H};
\partial\Omega
\right]
=0,
\qquad
v_2=c_f,\quad v_3\to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4f383f79d8aeec74)
The boundary data $\partial\Omega$ record the surrounding Noether sea state and effective exterior state, while the finite index set $I_H$ labels the retained strong-field continuations $\{\lambda_\alpha^{\mathrm{cont}}\}_{\alpha\in I_H}$ selected by that record. This is a local generic label slot, not a new Noether braid taxonomy. Specific chapters instantiate it with their own ensembles; for example, [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) uses its horizon-interface label ensemble $\{\lambda_i^H\}$. This display is the canonical statement of the horizon-interface closure problem: other chapters should cite this section and write the shorthand $F_H=0$ rather than restating the argument list. A viable singularity replacement must solve the alignment condition with finite boundary data in embedded, non-isolated settings, rather than relying on asymptotic flatness as an implicit support.

#### Observer-Time Boundary

A maximum-curvature interior is not assigned an ordinary physical-observer clock unless a recoverable clock channel survives. At the horizon-interface boundary, exterior records remain ordered by absolute time and by the observer-level clocks recovered outside the compact region. Inside a hard packed regime, the local Noether braid cadence, signal access, and material ruler channels may no longer supply a Physical Observer state. The safe statement is therefore:
$$
\mathrm{Clock}_{\mathrm{PO}}(\Omega_{\mathrm{int}})=\varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-359a0483fe300833)
This boundary statement holds while $T$ still orders exterior and boundary records. It prevents a singularity replacement from smuggling in an interior observer time where the required clock-and-ruler carrier has already failed. Absolute time still orders the ontology; a readable interior clock is a separate recovered channel.

#### Trapped-Surface Comparison Pressure

Penrose-style singularity theorems are useful here because they remove a misleading loophole: collapse failure cannot be dismissed merely by abandoning exact spherical symmetry. At the effective GR comparison layer, a trapped surface is detected by both future-directed null expansions becoming negative,
$$
\theta_+^{\mathrm{eff}}<0,\qquad \theta_-^{\mathrm{eff}}<0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aaaa15c9e3871b88)
That is a standard-theory warning that weak-field continuation has entered a generic strong-collapse regime. The warning is useful even though the native ontology is not a curved spacetime manifold.

The useful Penrose comparison assumption vector is
$$
\mathcal{A}_{\mathrm{P}}^{\mathrm{eff}}
=
\left(
\theta_+^{\mathrm{eff}}<0,\,
\theta_-^{\mathrm{eff}}<0,\,
\mathrm{NullComplete}^{\mathrm{eff}}_+,\,
T_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge 0,\,
\mathcal{C}^{\mathrm{eff}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e11aea80498af2c5)
where $\mathrm{NullComplete}^{\mathrm{eff}}_+$ records future null completeness, $T_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge 0$ records the non-negative local energy condition along null directions, and $\mathcal{C}^{\mathrm{eff}}$ records the comparison assumption that the effective spacetime is the future development of an initial Cauchy surface with the required global orientation. Penrose's disjunction is then the pressure point: once a trapped surface forms under the local energy and global continuation assumptions, at least one assumption in $\mathcal{A}_{\mathrm{P}}^{\mathrm{eff}}$ must fail if a physical endpoint is to remain nonsingular.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ response is not to import the singularity as ontology. The comparison target is instead
$$
\theta_+^{\mathrm{eff}}<0,\quad \theta_-^{\mathrm{eff}}<0
\quad\Longrightarrow\quad
F_H=0,\qquad \mathcal{R}_H(\Omega)<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f9e38d953cf846d8)
for the corresponding compact strong-field region $\Omega$, after the effective variables are translated into native Noether sea boundary data. In plain terms, whenever the observer-level GR description says collapse has passed the generic trapped-surface threshold, the native model must enter a finite maximum-curvature or horizon-interface regime rather than requiring symmetry, a zero-volume endpoint, or an arbitrary branch choice.

Let $\mathcal B_H$ denote the finite set of horizon-interface closure labels selected by that compact region's retained boundary-wake, path-history, and Noether sea record. It is an output of the strong-field continuation, not an independently chosen microstate inventory.

Equivalently, let the trapped-region premise be
$$
\mathcal{P}_{H}^{\mathrm{trap}}(\Omega)
=
\left(
\theta_+^{\mathrm{eff}}<0,\,
\theta_-^{\mathrm{eff}}<0,\,
T_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge 0,\,
\mathcal{C}^{\mathrm{eff}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4c76456466669c24)
When this premise holds, the finite-boundary-data replacement target is not to preserve future null completeness as a substrate axiom. It is to supersede that effective global-completeness failure with
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}\right|<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-45bcbe749873a7df)
The theorem burden is not to deny the trapped-surface comparison result. It is to show exactly which effective global-completeness assumption is superseded by compact Noether sea boundary data, while preserving the non-negative local energy comparison and producing a finite, labeled strong-field continuation.

Critical collapse adds a sharper threshold benchmark. In the Choptuik scalar-collapse comparison, a one-parameter family of effective initial data has a critical value $p_*$ separating dispersal from black-hole formation. Near that threshold the standard comparison exhibits mass scaling
$$
M_{\mathrm{BH}}\propto(p-p_*)^\gamma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba3c43afd2c58cf9)
and discrete self-similarity,
$$
Z(\tau+\Delta,x)=Z(\tau,x),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc3067a4576727a3)
for the effective fields $Z$ in logarithmic collapse coordinates. Recent large-$D$ analytic work (Emparan-class) is useful because it turns part of that threshold structure from a purely numerical GR pattern into a formula-controlled comparison family. The $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery target is not a literal crystallization of substrate spacetime. It is to show that the finite-boundary-data transition has a controlled threshold, a repeatable echoing or cadence row when the effective comparison requires one, and a finite continuation family on the compact-region side of the threshold.

#### Finite-Boundary-Data Regularity

The useful comparison lesson from analytic singularity-removal programs is not an imported mirror boundary or complex-time ontology. It is the regularity criterion. A candidate strong-field replacement must keep the native variables finite and the continuation rule unambiguous in the regime where the effective metric description would otherwise diverge.

For a compact strong-field region $\Omega$, declared positive reference scales $\rho_{\text{NS},0}$ and $\Sigma_0$, and field speed $c_f$, a minimal dimensionless diagnostic at absolute time $T$ is
$$
\mathcal{R}_H(\Omega,T)
=
\max\left\{
\sup_{\mathbf X\in\Omega}
\frac{\left|\rho_{\text{NS}}(\mathbf X,T)\right|}{\rho_{\text{NS},0}},
\sup_{\mathbf X\in\Omega}
\frac{\left\|\Sigma_{\text{sea}}(\mathbf X,T)\right\|}{\Sigma_0},
\sup_{\mathbf X\in\Omega}
\frac{\left\|\mathbf u_{\text{sea}}(\mathbf X,T)\right\|}{c_f}
\right\}
<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-030889988c444778)
A windowed statement writes $\sup_{T\in W}\mathcal{R}_H(\Omega,T)<\infty$; the shorthand $\mathcal{R}_H(\Omega)<\infty$ means this rowwise normalized diagnostic is finite on the declared single-time or windowed comparison. It is used together with the horizon-interface condition $F_H=0$ and a finite Noether braid closure-label ensemble. This is a theorem target, not a definition of success. The strong-field model must show that finite boundary data determine a finite maximum-curvature replacement rather than a zero-volume endpoint or an arbitrary branch choice.

The packed-state replacement must also keep interior storage distinct from interface exposure. A dense interior may carry a large finite energy inventory while only the surface, defect, or horizon-interface rows couple efficiently to exterior clock, ruler, lensing, release, or dark-sector readouts. In ordinary terms, not everything stored inside is automatically visible outside. For a compact region $\Omega$, write the exposed response schematically as
$$
E_{\mathrm{ext}}(\Omega)
=
\Pi_{\mathrm{surf}}
\!\left[
E_{\mathrm{pack}}(\Omega),
\partial\Omega,
\mathcal{D}_{\mathrm{defect}},
\theta_{\mathrm{sea}}
\right],
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cd057f234b5e164c)
where $\Pi_{\mathrm{surf}}$ is an exposure projection rather than an energy source. The closure burden is to derive this projection from packing, interface, and Noether sea boundary data. Without that split, a model risks counting hidden packed energy as ordinary exterior mass in one paragraph and shielding it in the next.

A sharper endpoint criterion is that those same finite data admit a continuation map
$$
\mathcal{T}_{\Omega}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{[T_i,T_f]},
\mathcal N_{\text{sea}}|_{\Omega\times[T_i,T_f]}
\right)
\longmapsto
X_\Omega(T_f)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-52a62bd8b42d6296)
with
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}\right|<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-45bcbe749873a7df-2)
This is the singularity-resolution form of the black-hole endpoint gate. The replacement must be finite, ledger-preserving, and non-arbitrary using compact boundary data, without importing a remnant, bounce, or asymptotic boundary condition as doctrine.

#### Cauchy-Horizon Comparison Pressure

GR Cauchy-horizon and cosmic-censorship language is useful here only as comparison pressure. It asks whether an effective initial-data surface has a unique global continuation or whether the observer-level spacetime description admits extensions not determined by that surface. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the substrate answer is not to import global hyperbolicity as an axiom. The native answer must show that the finite region record selects a finite admissible continuation family.

Write $\mathcal L_{E\mathbf p\mathbf J}$ for the same-record ledger of observer-calibrated energy, linear momentum, and angular momentum transfers across the compact-region boundary. Saying that it closes means that every retained interior, interface, and exported channel is accounted for within the declared tolerance.

For the same compact region $\Omega$ and interval $W=[T_i,T_f]$, define the accepted strong-field continuation family
$$
\mathfrak{S}_H(\theta_{\partial\Omega,W})
=
\left\{
\left(X_\Omega(T_f),\mathcal{B}_H(T_f)\right)
:
F_H=0,\quad
\sup_{T\in W}\mathcal{R}_H(\Omega,T)<\infty,
\quad
\mathcal{L}_{E\mathbf{p}\mathbf{J}}\ \text{closes}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-370a86843d895ea2)
The Cauchy-horizon comparison burden is
$$
0<\left|\mathfrak{S}_H(\theta_{\partial\Omega,W})\right|<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-907efe847cf3ef62)
with every element carrying a closure label, finite horizon-interface ledger, and event-ledger accounting. The count matters. An empty family means no native continuation has been supplied. An infinite or unlabeled family means the endpoint remains arbitrary. A finite labeled family is admissible only if later observer-level release, entropy, and exterior $(M,\mathbf{J},Q)$ records are computed from those same finite boundary data.

Stationary regularity is only the first test. A horizon construction may keep curvature invariants finite in an eternal or stationary comparison metric while still failing during collapse, merger, evaporation, or embedding in a time-dependent Noether sea. The dynamical gate is therefore stronger:
$$
\theta_+^{\mathrm{eff}}<0,\quad \theta_-^{\mathrm{eff}}<0
\quad\Longrightarrow\quad
F_H(T)=0,\qquad
\sup_{T\in[T_i,T_f]}\mathcal{R}_H(\Omega,T)<\infty,
\qquad
0<\left|\mathcal{B}_{H}(T_f)\right|<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a685629d5b5b6a62)
with the same finite boundary data driving the transition across the whole interval. A result that proves regularity only for an isolated stationary exterior remains a comparison result until it supplies this dynamical continuation.

Recent regular-horizon cosmological-coupling constructions (Croker–Farrah-class) sharpen this warning. They show that horizon regularity in an embedded compact-object model depends on handling the cosmological background, apparent-horizon condition, and local/cosmological mass split together; a nonsingular core or stationary exterior is not enough by itself. The native lesson is not to import an anisotropic-fluid metric as ontology. The lesson is that the continuation map above must carry embedding-state backreaction inside $\theta_{\partial\Omega,W}$ and must not evaluate $\mathcal{R}_H(\Omega,T)$ only in an isolated stationary chart.

### Maximal Curvature vs Planck Scale

In the working indexed chart, **binary 1** is assigned the maximal-curvature self-hit regime as a proposed outward barrier against continued collapse. Circular self-hit does not supply centripetal support; any stabilized outcome requires the complete partner, self, wake-boundary, and return-map ledger. **Binary 2** is constrained to the field-speed row ($v_2=c_f$), with **scale and cadence retuning**, as a candidate energy-storage channel for transfers across the candidate braid record. Neither role selects a taxonomy member or is established as a retained mechanism.

In the same working source record, strong-field conditions increase **binary 3's frequency** and drive $v_3$ toward field speed, while **binary 2** remains at $v_2=c_f$ as its radius and frequency shift. The full indexed row is
$$
v_1=v_1^{\mathrm{br}}(T),\qquad
v_2=c_f,\qquad
v_3\to c_f,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b4b86991e381dff4)
where the branch-measured $v_1^{\mathrm{br}}$ carries no universal field-speed assignment and the proposed binary-1 interior mechanism separately requires an admissible same-transmitter self-hit root. At the horizon-interface limit, binaries 2 and 3 reach $c_f$, all three indexed axes align, and precession ceases. This is a prescribed closure target, not a retained-branch result.

One preserved intuition, to be read only as a heuristic, is that this alignment limit may correspond to a temporary **planar horizon state** rather than to the final interior shape. In that picture, the horizon is the point of strongest flattening, while deeper interior self-hit response can reopen the suppressed polar degree of freedom so the orthogonal-axis three-binary braid returns to a finite 3D configuration instead of terminating in a zero-volume endpoint. This is compatible with the maximum-curvature replacement logic, but it is not yet a derived mechanism; compare [Horizon Chirality and Planar Spin](../../../../markdown/aaa/spacetime/horizon-chirality.md).

**Mapping rule:** "Planck-scale" references and the **event-horizon alignment condition** are separate comparison objects unless an explicit derivation supplies their scale map. The field-speed rows are necessary alignment indicators, not a Planck-scale identification or a self-hit proof by themselves; the admitted branch still needs same-transmitter root existence, transversality/Jacobian control, transmitter-side acceleration weight, and retained ledger closure.

## Horizon Chirality

This chapter studies one narrow theory question: how the Noether braid `pro/anti` distinction should be understood as an orthogonal-axis three-binary braid approaches the planar horizon state. For this note we set aside bookkeeping questions and focus on geometry, orbit direction, and the reduction from a 3D precessing scaffold to a planar exterior view.

The guiding problem is simple. In ordinary low-stress conditions, the orthogonal-axis three-binary braid is a fully 3D object with persistent binary indices, an ordered set of normals, and precession structure. At the event horizon, the same assembly is hypothesized to approach coplanarity and alignment. The question is whether `pro/anti` remains directly visible in that planar state or whether only a reduced exterior spin pattern survives.

The chapter is therefore a reduction map, not a new chirality doctrine. It keeps four labels from collapsing into one another: the deeper 3D pro/anti branch orientation, polarity conjugation at fixed worldlines, the planar clockwise/counterclockwise sign seen from an exterior normal, and any later helicity-like sign tied to a propagation or translation axis.

### Source-Record Horizon Condition

The orthogonal-axis three-binary terminal-alignment target is inherited from [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md) and [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md). In the illustrative source record used here, the near-horizon speed rows are

$$
v_2 = c_f,
\qquad
v_3 \to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d9fca1808c6ae6b)

with binaries 2 and 3 becoming coplanar and collinear with binary 1 at alignment and precession ceasing in that limit.

The speed assignments to binaries 2 and 3 belong to this source record; the taxonomy does not assign field-speed roles to fixed indices. This chapter asks what chirality information can still be distinguished once the orthogonal-axis three-binary braid has been compressed into that planar boundary-like state.

### Pro/Anti Before Planar Lock

Away from the horizon, the project treats `pro/anti` as an orientation property of the 3D orthogonal-axis three-binary braid scaffold rather than as polarity conjugation, matter/antimatter, or a net-charge distinction. The orientation basis is owned by [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md#proanti-noether-braid-basis):

- `pro`: deformation-stable indexed-frame orientation $o_{\mathrm{PA}}=+1$, conventionally represented by `123`;
- `anti`: deformation-stable indexed-frame orientation $o_{\mathrm{PA}}=-1$, conventionally represented by `132`.

The `123/132` strings are orientation mnemonics in a declared indexed frame, not temporal orderings of labelled events. Parity cannot reverse a bare temporal ordering. The $P$-odd claim belongs to the retained path or angular-momentum-frame row $o_{\mathrm{PA}}$, whose deformation stability and parity action must be demonstrated. In the ordinary orthogonal-axis three-binary braid, the three binaries occupy non-coplanar planes with an ordered set of normals and a genuine precession structure, so that row is a candidate 3D chirality datum.

The strongest mathematical candidate beneath that datum comes from [causal-action-functional.md](../../../../markdown/aaa/dynamics/causal-action-functional.md): the causal writhe

$$
Wr_c(\mathfrak B)
=
\sum_{a,b}
\operatorname{sgn}(a,b)\,
\chi_{\mathrm{causal}}(a,b)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5c6a23a0d22053f)

records signed causal-locus crossings or linkages in the retained branch record $\mathfrak B$. The indices $a$ and $b$ label oriented retained causal-locus strands or strand segments in the declared projection; $\chi_{\mathrm{causal}}(a,b)$ is $1$ only for an admissible same-record crossing or linkage event, and $0$ otherwise. The sign $\operatorname{sgn}(a,b)$ is defined only relative to the declared branch framing and is not defined at a fold, framing slip, or unresolved collision row.

So the cleanest reading is:

- the surface convention for `pro/anti` remains the ordered `123/132` orthogonal-axis three-binary braid distinction;
- the best formalization candidate is a topological branch label carried by the retained causal-locus and framed-topology record, with $Wr_c$ as a leading crossing statistic only when the same retained branch record also supplies $D_t$, $D_r$, and $W^{\mathrm{acc}}$.
- polarity conjugation $C$ leaves $o_{\mathrm{PA}}$ unchanged because it relabels polarities at fixed worldlines; the proposed parity row is $P:o_{\mathrm{PA}}\mapsto-o_{\mathrm{PA}}$.

The horizon state is different. Once the planes collapse into one planar lock and precession ceases, some of the ordinary 3D chirality data are suppressed. That makes it plausible that the horizon exposes only a reduced exterior signature of the deeper `pro/anti` distinction.

### Broader Pro/Anti Balance in $\mathbb{A}\mathbb{A}\mathbb{A}$

This chapter should also be read against a broader guardrail from the project framing: $\mathbb{A}\mathbb{A}\mathbb{A}$ does **not** naturally suggest a large universal pro/anti imbalance in the substrate as a whole. The Noether sea picture is instead built around persistent local or mesoscopic balance between complementary Noether braid orientations.

Several standing examples point in that direction.

- **Noether sea / spacetime medium:** the ambient Noether sea is already framed as a coupled pro/anti population rather than a single-sign sea.
- **Photon channel:** the proposed photon assembly is a coaxial contra-rotating polarity-conjugate planar pair, or one record $\mathfrak B$ and its $C$-image $C(\mathfrak B)$. It is not an example of pro/anti orientation balance, because the three-dimensional indexed-frame orientation carrier is no longer assigned in the planar limit.
- **$2+2$ pro/anti cluster hypothesis:** the standing cluster intuition remains a $2+2$ object, with two pro and two anti Noether braids in a three-dimensional coupled state rather than a single-sign configuration.

So when this note isolates `pro/anti`, it is **not** doing so because the larger ontology is expected to drift into a globally pro-dominant or anti-dominant universe. It is doing so because the horizon problem tests whether the ordered three-dimensional orientation has any surviving planar readout. The polarity-conjugate relation is a separate row.

Orientation-selective reaction channels then become the special case. Pro-Noether braid and anti-Noether braid orientations may meet as geometric complements and open fast reconfiguration channels, but that pairing is not automatically a particle-antiparticle reaction. A matter-antimatter event additionally requires polarity-conjugate retained branch records and conjugate charged-sector ledgers. In either case, the standard word "annihilation" is too blunt: the deeper process is a **reaction** or **reconfiguration event** in which coupled structures open, exchange, and re-express their content through new channels rather than vanishing into nothing.

That broader matter/reaction thesis belongs with reaction-channel provenance and fermion assembly structure. Inside this chapter, its role is narrower: it reminds us that horizon chirality should be developed inside a theory that is broadly pro/anti balanced, with the dramatic visible asymmetries appearing only in certain reaction channels or assembly sectors.

### Working Dictionary

To keep terms from sliding into one another, use the following provisional dictionary throughout this chapter:

| Label | Meaning in this note | Typical regime |
| --- | --- | --- |
| `pro/anti` | the deeper 3D Noether braid orientation $o_{\mathrm{PA}}$, represented by `123` versus `132` only after an indexed frame is declared; $C$-even, with $P$-oddness a retained-row obligation | pre-planar 3D braid |
| polarity-conjugate pair | one retained record $\mathfrak B$ and its fixed-worldline polarity-reversed image $C(\mathfrak B)$ | any regime, including the planar limit |
| `CW/CCW` | the exterior planar angular-momentum sign seen from one chosen viewing side of a planarized Noether braid | horizon / planar lock |
| `left/right` | a possible axial sign relative to translation, for example $\hat J_{\text{net}} \parallel \pm \hat{\mathbf V}$, if that later proves to control forward exposure of the weak-active structure | high-velocity aligned regime |

This chapter treats these as related but not yet identical labels. One of its main goals is to understand how they may collapse onto one another in the terminal high-velocity regime.

### Comparison Across Sectors

The horizon question becomes clearer when compared against the main assembly sectors already present in the theory.

| Sector | Pro/anti organization | Dimensional character | Why it matters here |
| --- | --- | --- | --- |
| Noether sea | broadly balanced pro/anti medium | mainly 3D distributed medium | background reminder that $\mathbb{A}\mathbb{A}\mathbb{A}$ does not predict a large universal imbalance |
| Candidate photon channel (referent-pending) | coaxial contra-rotating polarity-conjugate planar pair; pro/anti orientation unassigned | planar / propagating pair target | shows that polarity-conjugate pairing remains meaningful after the 3D order has collapsed |
| $2+2$ pro/anti cluster hypothesis | `2+2` pro/anti cluster | 3D coupled cluster | shows balanced multi-braid organization without collapsing to one sign |
| Orientation-selective reaction channels | pro/anti encounters can open rapid reconfiguration channels without thereby being matter/antimatter events | mixed 3D and reaction geometry | tests whether ordered orientation changes reaction accessibility |

This comparison helps keep the horizon problem honest. The goal is not to prove that the universe is mostly pro or mostly anti. The goal is to understand how one compressed orthogonal-axis three-binary braid advertises its branch structure when driven into the strongest alignment regime.

The photon row is also an interface to the radiation and cosmology stack. Because the candidate photon-channel construction is modeled as a moving planar polarity-conjugate pair, it is the transport target most naturally comparable to the flat symmetry-breaking state. That does not make every photon a horizon fragment, but it does make horizon-adjacent photon processing a serious candidate mechanism: the same planar branch logic is proposed for free photon propagation, horizon-interface compression, strong-field blueshift, outward redshift, or release-channel conversion depending on the surrounding Noether sea record.

### Exterior Planar Angular-Momentum Basis

Fix one exterior viewing direction normal to the horizon disk. From that viewpoint, each planar binary appears to rotate either clockwise (`CW`) or counterclockwise (`CCW`). If the three binaries remain distinguishable by persistent indices `1`, `2`, and `3`, then the full planar angular-momentum sign space contains exactly $2^3 = 8$ possibilities.

| Row | 1 | 2 | 3 | Class | Comment |
| --- | --- | --- | --- | --- | --- |
| 1 | `CW` | `CW` | `CW` | uniform | clean common-sign lock |
| 2 | `CW` | `CW` | `CCW` | mixed |  |
| 3 | `CW` | `CCW` | `CW` | mixed |  |
| 4 | `CW` | `CCW` | `CCW` | mixed |  |
| 5 | `CCW` | `CW` | `CW` | mixed |  |
| 6 | `CCW` | `CW` | `CCW` | mixed |  |
| 7 | `CCW` | `CCW` | `CW` | mixed |  |
| 8 | `CCW` | `CCW` | `CCW` | uniform | clean common-sign lock |

This is the complete planar-sign table as viewed from one fixed exterior side of the black-hole horizon. Reversing the viewing side flips `CW` and `CCW`, so the table should always be read relative to a chosen exterior normal.

### Observer Views

The planar angular-momentum table is viewpoint dependent in a controlled way.

- **Absolute-frame exterior observer:** fixes one normal to the planar disk and reads the visible planar circulation as `CW` or `CCW`.
- **Observer on the opposite side of the same disk:** reverses the normal and therefore swaps `CW` with `CCW`.
- **Co-moving or assembly-built observer:** may not have direct access to the absolute normal choice and instead infer only relative handedness, exposure, or wake asymmetry.

So the physically stronger datum is not the literal word `CW` or `CCW` by itself. It is the sign of the planar angular momentum relative to a chosen normal. In standard quantum language, helicity is an angular-momentum projection onto the momentum or propagation axis, usually the projection of spin for an elementary particle. The horizon quantity here is therefore a **boundary helicity proxy**: it becomes helicity-like only when the chosen exterior normal is dynamically tied to a propagation or translation axis.

This is also the right place to keep the substrate/effective split explicit: the substrate dynamics know about absolute path histories, delayed branch intersections, and topological branch labels. Observer-level helicity is a **dimensional reduction** of that deeper structure, not a primitive substrate variable, and boundary helicity should not be silently identified with weak-interaction chirality.

### Boundary Helicity Versus Deeper Chirality

The table above does not by itself prove that all eight rows are equally meaningful as horizon identities.

The simplest exterior quantity is the sign of the common planar angular momentum when all three binaries share one rotation sense. That sign is a boundary-visible two-way distinction:

- all-`CW`;
- all-`CCW`.

This chapter will call that reduced exterior quantity **boundary helicity**: the horizon-local sign of common planar angular momentum relative to a chosen normal. The term is deliberately narrower than standard helicity until the normal is identified with the relevant propagation or translation direction.

The deeper `pro/anti` distinction is plausibly stronger than boundary helicity alone. In the 3D scaffold, `pro/anti` tracks ordered orthogonal-axis three-binary braid chirality, not merely the sign of one visible planar swirl. Once the horizon suppresses precession and forces coplanarity, two different 3D histories may collapse to the same exterior planar sign.

That motivates the following working distinction:

- **Boundary helicity:** the visible sign of the common planar angular momentum at the horizon, measured relative to a chosen normal.
- **Core chirality:** the deeper `pro/anti` distinction inherited from the ordered 3D orthogonal-axis three-binary braid before flattening.

If this distinction is correct, then the horizon does not necessarily erase `pro/anti`, but it may compress it so strongly that the exterior observer sees only a reduced proxy.

### Translation-Axis Alignment at High Velocity

The next question is whether a rapidly translating orthogonal-axis three-binary braid should drive the three orbital angular-momentum vectors toward the translation axis itself.

The answer is dynamical rather than purely kinematic. Straight-line translation does **not** require that result merely from conservation laws. In the path-history dynamics, total linear momentum and total angular momentum are distinct conserved quantities, so an isolated translating assembly may in principle carry internal angular momentum whose axis is not parallel to the group velocity (center-of-mass convention).

The stronger argument is a conditional cross-section test within the proposed high-velocity delay geometry. Use the primitive branch-chart channel here: $v_{\text{trans}}=\|\mathbf V_{\text{trans}}\|$ is the native group speed, $\beta_f=v_{\text{trans}}/c_f$, and $\gamma_f=(1-\beta_f^2)^{-1/2}$. Let $(x_{\perp,1},x_{\perp,2},x_\parallel)$ be principal-frame coordinates for the oblate spheroidal envelope, with $x_\parallel$ along the translation direction. Assume, rather than derive here, the ruler-law target from [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md) and its dynamics treatment in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation):

$$
\frac{x_{\perp,1}^2+x_{\perp,2}^2}{R_\perp^2}
+
\frac{x_\parallel^2}{R_\parallel^2}
= 1,
\qquad
R_\parallel = \frac{R_\perp}{\gamma_f},
\qquad
\gamma_f = \frac{1}{\sqrt{1-\beta_f^2}},
\qquad
\beta_f = \frac{v_{\text{trans}}}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-668398d306edf792)

Now let one binary orbit in a plane whose unit normal $\hat n$ makes angle $\vartheta$ with the translation axis $\hat z$. The central cross-section of the assumed oblate spheroidal envelope cut by that orbital plane has area

$$
A(\vartheta)
=
\frac{\pi R_\perp^2 R_\parallel}
{\sqrt{R_\perp^2\sin^2\vartheta + R_\parallel^2\cos^2\vartheta}}
=
\frac{\pi R_\perp^2}
{\sqrt{\gamma_f^2\sin^2\vartheta + \cos^2\vartheta}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2e147f38e41c1867)

This area is maximal at $\vartheta = 0$ or $\vartheta = \pi$, meaning the orbital normal is parallel or antiparallel to the line of translation. It is minimal at $\vartheta = \pi/2$, when the orbital normal is transverse to the motion.

Thus the assumed oblate geometry supplies a cross-section bias:

- planes with normals parallel or antiparallel to the line of translation inherit the largest available cross-section;
- tilted planes suffer stronger anisotropic squeezing;
- the penalty for tilt grows with $\gamma_f$.

For small tilt,

$$
A(\vartheta)
\approx
\pi R_\perp^2
\left[
1-\frac{\gamma_f^2-1}{2}\vartheta^2
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5de5c927503ea9c3)

This expression does not by itself supply a restoring acceleration. Axialization follows only if the native constitutive dynamics independently show that increasing available cross-section lowers the same-record closure residual.

The resulting closure target is precise: derive the ruler law without assuming axialization, then show from the evolved retained branch that the three orbital angular-momentum vectors are driven **coaxial with the line of translation** and that the closure residual decreases along that motion. The cross-section calculation alone proves neither step.

### Exact Conservation Versus Dynamical Selection

This distinction is important enough to state plainly.

- **Exact conserved quantities:** the dynamics preserve total momentum and total angular momentum through substrate translation and rotation symmetry.
- **Topological branch data:** writhe and winding-class labels of the causal locus are not ordinary Noether charges, but they are robust branch labels that change only through reconnection or tearing events.
- **Dynamical selection:** alignment of the net orbital axis with the translation direction is neither a new conserved quantity nor a kinematic identity. It is a high-velocity attractor selected by the anisotropic delayed geometry.

In symmetry language, the ambient substrate begins with the full spatial isotropy of $SO(3)$. A fast translating assembly supplies a distinguished direction $\hat{\mathbf V}$ and therefore selects a reduced effective symmetry around that axis, schematically $SO(3)\to SO(2)$, with the remaining planar phase behaving in the aligned limit like a $U(1)$-type degree of freedom. The near-horizon planar lock should therefore be read as a **symmetry-broken dynamical branch** of the underlying theory, not as a new exact conservation law.

### State-Transition Ladder

The emerging picture is easier to reason about if written as a shape-and-label ladder:

$$
\text{3D precessing braid}
\;\to\;
\text{oblate translating braid}
\;\to\;
\text{axialized high-}v\text{ braid}
\;\to\;
\text{planar horizon lock}
\;\to\;
\text{post-lock reconfiguration or reopening}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6a4f429386339b1b)

The intended label flow along that ladder is:

1. In the ordinary 3D regime, `pro/anti` is carried by ordered orthogonal-axis three-binary braid chirality.
2. Under high group speed, the orbital normals are biased toward the translation axis.
3. Near the terminal aligned state, the surviving branch data may reduce to the sign of the common axial orientation and then to the sign of the visible planar helicity.
4. After passage through the lock, the Noether braid may either preserve that branch, re-expand with the same handed history, or undergo a deeper reconfiguration if the planar degeneracy is strong enough.

This ladder is still a working map, not a completed derivation. Its value is organizational: it shows where the theory expects information to be compressed, preserved, or potentially switched.

### Canonical Horizon Branch Hypothesis

The most conservative horizon hypothesis is that the stable terminal branches are the two uniform planar rows:

- Row 1: `1 = 2 = 3 = CW`;
- Row 8: `1 = 2 = 3 = CCW`.

These are the cleanest candidates for the two horizon-level branches that an exterior observer could identify. In that reading, the horizon presents a binary choice of common-sign planar lock.

The six mixed rows should be treated more cautiously. They are best read as candidate:

- transitional states during flattening;
- frustrated planar states that still carry unresolved internal shear;
- or short-lived reconfiguration states rather than canonical terminal locks.

This is only a working hypothesis. The theory does not yet derive that mixed-sign planar states are forbidden. It says only that the two uniform rows are the strongest candidates for stable horizon identities, while the mixed rows appear less natural as endpoint states.

Under the translation-axis argument above, those two rows can be restated more sharply: in the terminal branch the three orbital normals are expected to become coaxial with $\pm \hat{\mathbf V}$, where $\hat{\mathbf V}$ is the unit translation direction. The remaining binary choice is then the sign of the common axial spin.

### Candidate Theories for Pro and Anti at the Horizon

Two main theories are available.

#### Theory A: direct planar identification

In the strongest reduction, `pro/anti` at the horizon is simply identified with the two uniform planar states:

- `pro` = all-`CW`,
- `anti` = all-`CCW`,

or the reverse, depending on the chosen sign convention.

This theory is attractive because it makes the horizon classification maximally simple and directly observable from outside.

#### Theory B: history-lifted horizon identification

In the more cautious reduction, the two uniform planar states are still the visible horizon branches, but `pro/anti` is not exhausted by the observed `CW/CCW` sign. Instead:

- the uniform planar sign is the **visible boundary marker**;
- the deeper `pro/anti` label still refers to the ordered 3D chirality from which the planar state was reached.

On this reading, the horizon preserves only a compressed image of the deeper orthogonal-axis three-binary braid chirality. The exterior observer sees the branch, but not necessarily the full internal ordering history.

Theory B is the stronger conceptual fit with the existing 3D `123/132` framing, because that framing is richer than a single planar spin sign.

The history-lifted reading also sets a guardrail for nearby labels. Horizon `pro/anti`, boundary helicity, `CW/CCW`, `123/132`, and weak left/right language should not be identified with one another by a visible planar sign alone. A stronger identification requires the [same-record spinor-label pullback](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#same-record-spinor-label-pullback): a component row carrying the lifted history $\widetilde r(s)$, the row-local parity checks $\Pi_{W,r}^{2\pi}$ and $\Pi_{W,r}^{4\pi}$, a quotient witness, doubled-path restoration, and gauge invariance. Without those rows, the horizon sign is a boundary-visible marker for a deeper branch history, not the whole chirality proof.

### Possible Left/Right Spin Mapping

The translation-axis picture opens one further possibility. If the terminal high-velocity attractor really forces the common orbital axis onto the line of translation, then the two axial branches

$$
\hat J_{\text{net}} \parallel +\hat{\mathbf V},
\qquad
\hat J_{\text{net}} \parallel -\hat{\mathbf V}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1ff3d0ff7ea22355)

are natural candidates for a left/right or helicity-like pair.

That does **not** automatically make them identical to weak-interaction chirality. The canon uses left/right language operationally in terms of whether the weak-coupling triad is exposed or hidden relative to motion and wake geometry. Still, the axial-lock picture suggests a possible underlying bridge:

- the high-velocity Noether braid first selects one of the two axial branches $\pm \hat{\mathbf V}$;
- that branch then influences which side of the axial structure is forward-exposed versus wake-hidden;
- the observer-level left/right distinction may therefore descend from the sign choice of the common axial angular momentum in the translating aligned state.

In that reading, the horizon or near-horizon limit does not merely present two boundary-helicity states. It may also reveal a candidate upstream axial-lock variable for later left/right spin mapping:

- `right-like`: net braid axis aligned with translation;
- `left-like`: net braid axis anti-aligned with translation;

or the reverse, depending on the eventual sign convention.

This should remain a live hypothesis rather than a settled identification. The safe claim is only that the high-velocity math strongly favors **axialization** of the orthogonal-axis three-binary braid angular-momentum vectors along the line of translation, and that the surviving sign choice is exactly the kind of binary datum that could later map onto a left/right spin label.

The explicit defer condition is that terminal axial sign,

$$
\hat J_{\text{net}}\parallel\pm\hat{\mathbf V}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-689b6fb39a59aff1)

is not enough to identify weak left/right exposure. The same record must also pass the row-local parity and gauge-control checks used in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) and the $\Delta_{\mathrm{WCT}}$ exposure record used in [Weak Mixing and CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md). Until then, axial sign remains a candidate bridge variable rather than a weak-chirality derivation.

### Status Table

This chapter mixes canonical inputs with stronger and weaker hypotheses. The distinction should stay explicit.

| Claim | Status |
| --- | --- |
| orthogonal-axis three-binary terminal alignment drives the braid toward coplanarity and suppresses precession | canonical target in project framing; retained-branch derivation remains open |
| `pro/anti` is a deeper 3D Noether braid chirality label rather than a net-charge label | canonical working convention |
| `Wr_c` and causal-locus topology supply the best formalization candidate for that chirality | strong structural candidate only on the same retained branch record that supplies $D_t$, $D_r$, and $W^{\mathrm{acc}}$; not yet sole canonical definition |
| the planar exterior sign space has 8 rows for labeled `1/2/3` binaries | exact combinatorial statement |
| high group speed biases orbital normals toward the translation axis | strong geometric argument in this chapter |
| the two uniform planar rows are the most likely stable terminal horizon branches | strong working hypothesis |
| the six mixed rows are transitional or frustrated rather than stable endpoint states | plausible but still open |
| the axial sign $\hat J_{\text{net}} \parallel \pm \hat{\mathbf V}$ supplies a candidate upstream variable for a later left/right spin distinction | live speculative hypothesis requiring the same retained spinor/gauge-control and weak-exposure record |
| `pro/anti`, `CW/CCW`, and `left/right` all become the same label in the terminal regime | not yet established |

### Mixed-Sign Planar States

If mixed-sign rows are admitted at all, then the horizon theory becomes more complicated than a simple two-branch picture. Rows 2 through 7 would imply that the three binaries can remain role-distinct in the planar lock while not sharing a common in-plane circulation.

That possibility raises three immediate questions:

1. Are mixed-sign rows dynamically stable, or do they relax toward a common-sign lock?
2. If they are stable, do they define additional horizon classes beyond `pro/anti`?
3. If they are unstable, are they the natural transition states through which a Noether braid passes while entering or leaving the horizon interface?

This note favors the third reading: mixed-sign planar states are more naturally interpreted as transition or frustration states than as clean final branches. But this remains an open dynamics question rather than a closed derivation.

One reason for that preference is action-geometric rather than merely visual. In a strictly flattened disk, mixed-sign configurations plausibly generate stronger phase-slip and more severe branch competition, because not all tangential drives can cooperate in closing the delayed loop on one clean planar branch family. That does not yet amount to a theorem, but it points to the right criterion: mixed rows should be judged by whether they force larger Jacobian stress, larger cycle-to-cycle action variance, or repeated failure of singularity-free phase closure.

### Transition Rules for Pro/Anti Conversion

One of the biggest unresolved questions is whether a Noether braid can flip from `pro` to `anti` smoothly, or only through a more singular reconfiguration.

This chapter points toward the second option. The likely possibilities are:

1. **No flip in ordinary smooth evolution:** away from the planar degeneracy, the ordered 3D Noether braid chirality appears robust and should survive adiabatic deformations.
2. **Near-degenerate branch switch at planar lock:** when the three planes collapse into one planar state, some 3D chirality data are compressed strongly enough that a branch change may become dynamically accessible.
3. **Full reconfiguration / reaction channel:** a deeper split, exchange, or reconstruction of the constituent binaries could permit a true $pro \leftrightarrow anti$ conversion.

This is exactly where the language of "annihilation" starts to look too weak. If a pro/anti encounter opens the Noether braid and allows branch-changing reconfiguration, the physical process is better described as a structured reaction than as disappearance.

The strongest language from the dynamics stack is that true branch conversion should be associated with a **mode-lock event** or related non-perturbative reconfiguration, not with an adiabatic drift. If the branch label is indeed carried by the topology of the causal locus, then a smooth $pro \leftrightarrow anti$ conversion would require passage through a singular or near-singular reconnection stage rather than ordinary continuous motion.

Put differently: if branch-changing evolution forces an active delayed branch toward a Jacobian-null boundary, then the exact dynamics encounter the same kind of amplitude wall already familiar from the self-hit geometry. That is why smooth branch inversion should be treated as forbidden or at least highly non-generic in the exact theory. The expected route is instead a discrete mode-lock / reconnection event in which the old branch graph fails and a new one nucleates.

The safest working rule is:

- smooth motion should preserve the deeper branch label;
- planar degeneracy may permit branch ambiguity;
- true branch conversion likely requires a reconfiguration event rather than a mild perturbation.

### Simulation Diagnostics

If this note is to become more than a conceptual sketch, the following diagnostics should be added to simulations of fast translating or horizon-adjacent orthogonal-axis three-binary braids:

- **Axis-alignment diagnostic:** track $\hat J_{\text{net}} \cdot \hat{\mathbf V}$ and test whether it tends toward $\pm 1$ as $v_{\text{trans}} \to c_f$.
- **Tilt decay diagnostic:** track each orbital-normal angle $\alpha_i$ to test whether non-axial states relax toward the translation axis with a rate that grows with $\gamma_f$.
- **Planar branch diagnostic:** once the planarity threshold is met, record which of the 8 planar sign rows the assembly occupies.
- **Mixed-row lifetime diagnostic:** test whether rows 2 through 7 are long-lived or short-lived compared with the two uniform rows.
- **Exposure diagnostic:** compare the sign of $\hat J_{\text{net}} \cdot \hat{\mathbf V}$ against forward exposure of the weak-active structure to test the left/right bridge hypothesis.
- **Branch persistence diagnostic:** drive a Noether braid into and back out of the planar regime and test whether the same deeper branch label is recovered after re-expansion.

### Provisional Conclusion

The full planar spin-sign space at the horizon has eight rows because each of the three labeled binaries can appear as either `CW` or `CCW` from a fixed exterior viewpoint. But the strongest theory is that only two of those rows are good candidates for canonical horizon identities: the two uniform common-sign locks.

That yields a disciplined provisional picture:

- `pro/anti` in the ordinary orthogonal-axis three-binary braid is a 3D chirality or ordering property;
- the horizon compresses the orthogonal-axis three-binary braid into a planar state with a reduced exterior signature;
- the exterior planar state has eight logical spin permutations;
- the two uniform rows are the best candidates for stable horizon branches;
- the other six rows are most naturally read as transitional, frustrated, or unstable states unless future dynamics show otherwise.

### Interfaces to Other Chapters

- [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md): canonical horizon alignment condition.
- [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md): horizon interface and strong-field ontology.
- [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation): regime map, planarity diagnostics, and alignment observables.
- [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md): terminal planar lock and alignment-horizon interpretation.
- [angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md): shared proof ledger for promoting boundary-helicity proxy language into observer-level spin or helicity claims.
- [../assemblies/fermions/color-charge-su3.md](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md): separation of pro/anti ordered orientation from matter/antimatter polarity conjugation.
- [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md): ordered-triad, polarity-conjugation, and chirality language.
