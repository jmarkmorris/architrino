# Noether Sea and Effective Spacetime

## Noether Sea

This chapter defines the **Noether sea** as the physical medium inside the fixed background in $\mathbb{A}\mathbb{A}\mathbb{A}$. It explains what the medium is, how it differs from the Euclidean void, which state variables describe it, and where detailed assembly, metric, clock, and cosmology work belongs.

The Noether sea is not the substrate. The substrate is [absolute timespace](../../../../markdown/aaa/foundations/absolute-timespace.md): absolute time together with the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md). The Noether sea is physical content inside that background: an emergent, coupled population of neutral Noether braid assemblies whose collective response appears to physical observers as spacetime behavior.

The easiest mistake is to treat the Noether sea as another name for space. It is not. Space is the fixed container. The Noether sea is the organized medium inside that container. Effective spacetime is the observer-level reconstruction built from how that medium changes clocks, rulers, signals, and matter response. The corresponding observer-side record and projection boundary is defined in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md).

This is why the reader path introduces Noether braid scaffold and geometry before observer-level spacetime. The intended picture is a fixed container populated by organized assemblies, not a flexible container that curves by itself. At the roadmap level, the physical Noether braid density can be read as a coarse-grained population field,
$$
\rho_{\text{NS}}(\mathbf X,T)
=
\sum_{s\in\mathcal I_{\mathrm{sea}}(T)} W_\ell(\mathbf X-\mathbf X_s(T))
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e6849e85f4f768ac)

Here $\rho_{\mathrm{NS}}$ is number density, not mass density. The set $\mathcal I_{\mathrm{sea}}(T)$ contains the identities classified as ambient braids, and $W_\ell\ge0$ is a spatial smoothing window with $\int W_\ell\,dV=1$, centered on the declared braid centers $\mathbf X_s(T)$. The associated cadence density is $f_N(\nu,\mathbf X,T)=\sum_{s\in\mathcal I_{\mathrm{sea}}(T)}W_\ell(\mathbf X-\mathbf X_s(T))\delta(\nu-\nu_s(T))$: it counts braids per spatial volume per unit ordinary cadence, so $\int_0^\infty f_N\,d\nu=\rho_{\mathrm{NS}}$. A normalized cadence smoothing kernel may replace the delta for continuum calculations, provided its integral on the positive-cadence domain is one. Stress, delay, and orientation variables also depend on the same population's closure labels and envelope deformation. These are coarse projections of assembly geometry, not primitive geometric postulates.

The homogeneous population motivates a conditional mean-square convergence estimate for the infinite many-source wake sum. A causal root is a past emission event whose expanding wake reaches the specified receiver event. Fix one receiver event, a probability measure on complete source histories, and receiver-centered shells of thickness $\ell$. Each cell contribution must include every admitted causal root and its transmitter weight $c_f/|D_t|$, where $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}_t$ in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md); $\mathbf V_t$ is the emission velocity and $\hat{\mathbf r}_t$ points from that emission site to the receiver. Spatial neutrality alone bounds neither the number of roots nor the weight near a tangent root.

Write $\mathbf A_n$ for the full shell contribution and $\Delta\mathbf A_n=\mathbf A_n-\mathbb E\mathbf A_n$ for its centered fluctuation. Assume each distant shell contains at most $K n^2$ cells, each centered weighted cell contribution has second moment at most $C n^{-4}$, and each cell's sum of absolute dot-product covariances with cells in that shell is at most $C' n^{-4}$. The constants are uniform in the shell index. Summing those cell bounds gives $\mathbb E\|\Delta\mathbf A_n\|^2\le C_A n^{-2}$. This is a weighted-history moment hypothesis; finite spatial correlation length does not establish it. Also require absolutely summable cross-shell dot-product covariance,
$$
\begin{aligned}
&\sum_{n<m}\left|\mathbb E(\Delta\mathbf A_n\cdot\Delta\mathbf A_m)\right|<\infty,\\
&\mathbb E\left\|\sum_{n=N}^{M}\Delta\mathbf A_n\right\|^2
=\sum_{n=N}^{M}\mathbb E\|\Delta\mathbf A_n\|^2
+2\sum_{N\le n<m\le M}\mathbb E(\Delta\mathbf A_n\cdot\Delta\mathbf A_m)\\
&\hspace{1em}\le C_A\sum_{n=N}^{\infty}n^{-2}
+2\sum_{N\le n<m}\left|\mathbb E(\Delta\mathbf A_n\cdot\Delta\mathbf A_m)\right|
\longrightarrow0\quad(N\to\infty)
\end{aligned}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c848c934bb2c4609)

The bound makes the partial sums Cauchy in $L^2$, the space of finite mean-square random vectors, and hence gives convergence in mean square and in probability along the declared shell order. It does not establish almost-sure convergence for the actual universe history, uniformity over receiver events, differentiated-tail convergence, or invariance under arbitrary source rearrangement. Those stronger conclusions and realization of the weighted-history assumptions remain separate obligations. For a homogeneous isotropic ensemble with zero shell means, the centered sum is the full mean-zero far-population contribution.

For a weak density gradient, a local expansion about the receiver origin is
$$
\rho_{\mathrm{NS}}(\mathbf X)
=
\rho_0+\mathbf g_\rho\cdot\mathbf X+O(\|\mathbf X\|^2),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9659291f3d9667a1)

The additional gravity-side obligation is to compute the weighted neutral-cell multipole and prove convergence of the full shell means,
$$
\sum_n\mathbb E[\mathbf A_n\mid\mathbf g_\rho]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bee72957ddd0c7a0)

The centered fluctuation has zero mean under its defining ensemble; it cannot supply this mean response. Extending the local density expansion to arbitrarily distant shells requires a global profile and a controlled remainder. Until that profile and the weighted multipole falloff are derived, the conditional homogeneous estimate does not settle weak-gradient gravity or the Seeliger problem of defining the influence of an infinite population.

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

Here $h$ is observer Planck calibration and this equation is an effective photon recovery relation, not a primitive frame-free photon scalar or an identification of a braid action unit. The redshift task is to compute the endpoint clock rates, including their mismatch from sea cadence, launch geometry, and path-history propagation terms from the same $S(T)$ record.

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

The entries are, respectively: retained-branch closure; local polarity neutrality and pro/anti balance; convergence of the far-population wake sum; dense packing without uncontrolled branch disruption; weak homogeneous transparency to ordinary matter, photon-channel packets, and neutrino-like assemblies; a shared constitutive response for $n$, $\chi_{\text{sea}}$, $\Gamma_N$, stress, and effective metric channels; compatibility with the particle-building branch program; and a production, recycling, or relaxation route that gives the class sufficient abundance. Each entry denotes a dimensionless defect divided by a declared positive acceptance scale, with the same observable, norm, domain, and scale used across classes. A missing entry leaves selection unresolved; it is not assigned zero. A maximum at most one means every declared test meets its own tolerance, not that the class is selected without a comparative population argument.

Transparency is a bounded-response condition. For a channel family $X\in\{\gamma,\mathrm{clk},\mathrm{mat},\nu\}$, denoting photon, physical-clock, matter, and neutrino-like channels, respectively, direct loss, scattering, and preferred-frame visibility must remain below tolerance while the medium supplies the required constitutive response. The physical-clock readout is derived clock time $\tau$. A normalized joint test is

$$
\mathcal R_{\mathrm{vis/resp},X}
=
\max\!\left(
\frac{\mathcal R_{\mathrm{loss/scat},X}}{\epsilon_{\mathrm{loss/scat},X}},
\frac{\mathcal R_{\mathrm{LV},X}}{\epsilon_{\mathrm{LV},X}},
\frac{\left\|O_X^{\mathrm{eff}}-\Pi_X[\Theta_{\mathrm{sea}},\mathcal L_X]\right\|}{\epsilon_{\mathrm{resp},X}}
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d59b015b955e5774)

The first two ratios separately normalize loss/scattering and preferred-frame visibility by their own tolerances; the third normalizes the observable response error in the units of $O_X^{\mathrm{eff}}$. Here $\Pi_X$ is the candidate projection from medium state $\Theta_{\mathrm{sea}}$ and channel ledger $\mathcal L_X$. Fix these scales before comparing candidates. Setting the coupling to zero can pass visibility while failing a nonzero independently specified response target; invisibility alone does not reconstruct the observables assigned to the Noether sea.

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

The coincident-axis three-binary chart supplies a candidate setting for this mechanism: one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense, while per-binary radii, axial half-separations, transverse orbit radii, and phases remain independent. The mechanism hypothesis is that phase-matched neighbors supply angular-momentum transfer and axial acceleration support, internal wake transport redistributes the input, and outgoing wake returns angular momentum to the sea's orientation order. No inspectable instrument record is supplied here for the asserted transfer or support, so this passage makes no measured claim about their sign, magnitude, or equatorial adequacy. A self-consistent closed loop remains a constitutive closure target.

A polar-covering neighbor cage is a complementary support hypothesis, comparable at the effective level to a molecule in a solvent. Even a verified central-braid acceleration balance against prescribed neighbors would establish only that central response. Balance of the whole braid-plus-cage complex requires evaluating every cage constituent reciprocally on the same histories, and stability requires a separate perturbation analysis about a retained solution. Neither whole-complex balance nor stability is established here. The underlying objects remain Noether braid assemblies and causal wakes; the comparison explains how surrounding assemblies enter local boundary conditions.

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
-N_{\mathrm{out}}^{\Omega}
+R_{N,\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fb5f0b1586fb1ce1)

Here $\Omega$ is a fixed spatial window observed over a declared absolute-time interval and $N_{\mathrm{out}}^{\Omega}$ is net outward transit, the time-integrated number flux through its boundary. It vanishes for a material identity cohort only when the cohort definition excludes transit. Classification changes are counted once at their actual event. Each term must be tied to the same identity, energy, momentum, angular-momentum, and causal-wake ledger used by the local reaction. A particle inventory change without this population account leaves the source story incomplete.

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

Here $\Omega_N$ is a representative local angular cadence and $C_N$ is the sea cadence-rate factor. For the population projection in this chapter, choose $\Omega_N=2\pi\int_0^\infty\nu f_N\,d\nu/\rho_{\mathrm{NS}}$ where the density is positive and the first moment is finite; use the same extraction for $\Omega_{N0}$. This definition does not identify a matter clock with the population mean. Its separately extracted clock-rate factor is $C_{\mathcal A}=C_N\exp(\Delta_{\mathrm{clk\text{-}sea},\mathcal A})$, with the logarithmic mismatch retained unless bounded below tolerance. Density $n$, delay $\chi_{\text{sea}}$, and cadence stretch $\Gamma_N$ remain distinct. Clock extraction belongs in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target).

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

The first continuum obligation for the Noether sea is local bookkeeping of conserved or slowly relaxing coarse variables. For a fixed control region $V\subset\Sigma_T$, where $\Sigma_T$ is the Euclidean spatial slice at absolute time $T$, the population balance is
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

Here $\hat{\mathbf n}$ is the outward boundary normal, $S_\rho$ is the signed number-source density, $r_\rho$ is the local unresolved rate density, and $R_{\rho,V}=\int_Vr_\rho\,dV$. The same standard applies to cadence, orientation, strain, and energy variables. A continuum equation is admitted as a low-moment projection of the resolved population when its residual decreases under refinement; a fluid analogy alone does not establish it.

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

Here $S_{\mathrm{BH,diff}}$ denotes broad medium loading, $S_{\mathrm{BH,col}}$ counts collimated-release content when it actually enters the ambient classification, and $S_{\mathrm{pair}}$ counts newly admitted ambient braids from pair-channel activity. Launch alone does not enter the ambient count; pair channels that recruit or return existing braids use the recruitment or return entry, without counting the same event again as production. None of these terms creates substrate from nothing. Each is a projection of architrino and Noether braid inventory through a declared reaction, release, or relaxation record.

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
+\varepsilon_a
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9a83480fab7acf04)

Here $a$ ranges over density, assembly-level momentum, energy, cadence, and orientation moments. Each norm uses a declared space-time window and component scaling; $\varepsilon_a>0$ has the units of that moment's rate density, so different physical dimensions are never added across moments. This is an equation-defect diagnostic, not by itself evidence of closure. Extract $M_a$ and the reference fluxes and sources independently from resolved histories; compare proposed constitutive fluxes and sources against those references on histories not used to set coefficients. Solving an equation with its own fitted definitions can make the defect vanish while leaving omitted memory entirely uncontrolled. A closure claim also needs a bound on that omitted-history contribution.

Analogue-gravity comparisons sharpen this point. In Visser's acoustic construction, the fluid is barotropic (pressure depends only on density), inviscid (without viscosity), and locally irrotational (flow has a velocity potential). Small perturbations of that potential obey a scalar wave equation with an effective acoustic metric. In effective coordinates $(t_{\mathrm{eff}},\mathbf x_{\mathrm{eff}})$, the comparison has the form
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

Here $\rho_0$, $\mathbf u_{\mathrm{fluid}}$, and $c_s$ are the background fluid's mass density, flow, and sound speed; $h_{ij}=\delta_{ij}$ is the spatial matrix in Cartesian comparison coordinates. This fluid mass density is not the braid number density $\rho_{\mathrm{NS}}$. The metric describes the potential perturbation, not arbitrary viscous or vortical motion. See Visser's theorem and equation (4) in [Acoustic black holes: horizons, ergospheres, and Hawking radiation](https://arxiv.org/html/gr-qc/9712010). The Noether sea target has the same form of constitutive obligation,
$$
g_{\mu\nu}^{\mathrm{eff}}
=
\mathcal{G}_{\mu\nu}\!\left[\mathcal{N}_{\mathrm{sea}}\right]
+\mathcal{R}_{\mathrm{metric}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf4fb3734d788a00)

where $\mathcal{G}_{\mu\nu}$ must be derived from the retained density, flow, cadence, orientation, strain, and causal-wake records. A metric row that fits clock, signal, pressure, or lensing behavior with separate coefficients for each observable is not yet a Noether sea constitutive law.

The stochastic-gravity comparison concerns fluctuations beyond a mean response. Hu and Verdaguer's [Stochastic Gravity: Theory and Applications](https://arxiv.org/html/0802.0658), section 3.2, equation (3.11), defines a noise kernel from the symmetrized two-point product of mean-subtracted quantum stress tensors. A classical cadence covariance is not that quantum observable. For a bounded analogy, let $\delta T_A^{\mathrm{eff}}$ denote a mean-subtracted stress, cadence, or response-channel readout from a branch ensemble $\theta$, and let $x,y$ denote two events in a declared effective observer chart. Its covariance is
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

Here $\Pi_{\mathrm{corr}}^{(n)}$ projects the history measure $\mu_{\Omega,\theta}$, retained medium state, and windowed wake histories $\mathcal H_\Omega^W$ into a specified $n$-point observer correlation; $\epsilon_n$ normalizes its chosen norm. A two-point comparison neither identifies this classical covariance with the quantum noise kernel nor determines higher correlations. Each higher-order observable needs its own projection and evidence. No independent stochastic metric noise is added to the substrate.

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

Here $X_B$ are declared medium perturbations and $Y_A$ are channel readouts. A diagonal frequency/wavevector response requires a stationary homogeneous reference, or a local approximation with bounded evolution and gradient errors; otherwise response uses two times and two positions. At fixed $\mathbf k$, use the temporal transform $\widetilde g(\omega)=\int_{\mathbb R}e^{i\omega T}g(T)\,dT$ and a causal response with a possible instantaneous contact term $\chi_{AB}^{\infty}\delta(T)$. Define the subtracted susceptibility $\widehat\chi_{AB}=\chi_{AB}-\chi_{AB}^{\infty}$. The following test applies when its delayed kernel is integrable, its transform is analytic for $\operatorname{Im}\omega>0$ and decays sufficiently on the closing semicircle, and the full real-axis principal value exists:
$$
\mathcal R_{\mathrm{KK}}(\chi_{AB})
=
\frac{
\left\|
\operatorname{Re}\widehat\chi_{AB}(\omega)
-
\mathcal H\!\left(\operatorname{Im}\widehat\chi_{AB}\right)(\omega)
\right\|_{\omega}
}{
\left\|\operatorname{Re}\widehat\chi_{AB}\right\|_{\omega}
+
\left\|\mathcal H\!\left(\operatorname{Im}\widehat\chi_{AB}\right)\right\|_{\omega}
+\varepsilon_{AB}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7946aae635691658)

The convention is $\mathcal H g(\omega)=\pi^{-1}\operatorname{PV}\int_{\mathbb R}g(\omega')/(\omega'-\omega)\,d\omega'$, where principal value removes a symmetric interval around the pole before taking its width to zero. Cauchy's integral formula in the upper half-plane then gives $\operatorname{Re}\widehat\chi=\mathcal H(\operatorname{Im}\widehat\chi)$. The norm and positive floor $\varepsilon_{AB}$ have susceptibility units. A pure contact response $\chi=1$ has $\widehat\chi=0$ and passes this subtracted test. Responses with greater high-frequency growth require additional declared subtractions. A finite-band estimate also needs a bound on the unmeasured frequency tails; a residual exceeding numerical, tail, and local-model errors can reject the stated response class, whereas a nonzero finite-band residual alone cannot establish acausality. Passing this necessary dispersion test does not derive the constitutive map.

### Equilibrium Transport Hypothesis

A provisional cosmology-facing hypothesis treats the Noether sea as a dense neighbor-coupled population of Noether braids whose individual action transactions are discrete while the ensemble response can be smooth. Most braids in a weak deep-space region have other Noether braids as their nearest dynamical neighbors. Photons and neutrinos can traverse the population, and gravitational waves can perturb it, but the baseline relaxation law is a braid-to-braid medium law.

Let $\nu_N$ denote an ordinary frequency extracted from a representative Noether braid cadence state. In the candidate action bookkeeping of the retuning hypothesis,

$$
A_N=N h_{\mathrm{act}},\qquad E_N=A_N\nu_N
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6424de3e0b5f7c9f)

Here $h_{\mathrm{act}}$ is the candidate closed-cycle action unit, $N$ is the branch's integer action level, and $A_N$ is its total action. This inherits the [Cadence-Scale Retuning Hypothesis](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis), translating that owner's frequency symbol $f_N$ to $\nu_N$ to keep it distinct from this chapter's population density. Neither $N=1$ nor $h_{\mathrm{act}}=h$ is assumed. Action times cadence has energy dimensions, but equality with the full branch energy remains a hypothesis. For example, the mathematical action-angle comparison $dE/dI=\omega(I)$ gives $E(I)=\int\omega(I)\,dI+\mathrm{constant}$, generally not $I\omega(I)$. Observer photon calibration by $h$ is a separate recovery relation. Many asynchronous candidate action transactions can nevertheless motivate a smooth ensemble description.

At the single Noether braid level, each accepted $h_{\mathrm{act}}$-scale transfer requires the braid to retune its cadence-scale closure. The retuning may appear as a cadence shift, indexed-binary radius shift, envelope-scale change, envelope-ratio change, orientation or strain update, or modified coupling to neighboring braids. In the simplest fixed-speed indexed-binary approximation,

$$
v_N\sim 2\pi R_N\nu_N,
\qquad
R_N\nu_N\approx\text{constant}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36c06dcb0c573495)

so a higher accepted cadence corresponds to a smaller representative scale, while a lower accepted cadence corresponds to a larger representative scale. A full orthogonal-axis three-binary record can partition the same transaction across its three indexed binaries, so this relation is a first estimate rather than a complete closure law.

At the ensemble level, use the number density per cadence $f_N$ defined above. To project branchwise retunings onto cadence alone, assume the retained branch labels, orientation, and memory either determine conditional rates at the stated cadence or have a controlled averaging error. Otherwise enlarge the retained state; cadence alone need not support a process whose future rates depend only on the present projected state. For smooth test functions $\phi$, a candidate number-preserving gain/loss operator $\mathcal Q$ is defined by

$$
\int_0^\infty\phi(\nu)\mathcal Q[f_N]\!(\nu)\,d\nu
=\int_0^\infty f_N(\nu)\sum_{\varsigma=\pm1}r_\varsigma(\nu)
\left[\phi(\nu+d_\varsigma(\nu))-\phi(\nu)\right]d\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9caecd309e84febf)

Here $r_\varsigma\ge0$ is the rate per braid per unit absolute time of an admitted $\Delta A_{\mathrm{cyc}}=\varsigma h_{\mathrm{act}}$ transition and $d_\varsigma=\Delta\nu_N^{(q,\varsigma)}$ is its signed cadence increment from the branch retuning map. Allowed jumps stay in $\nu>0$; exits are separately counted population events. Spatial and absolute-time arguments are suppressed in this equation. Setting $\phi=1$ proves that internal jumps preserve number. Taylor expanding $\phi(\nu+d_\varsigma)$ and integrating by parts gives $\mathcal Q=-\partial_\nu J_\nu$, with

$$
J_\nu=a f_N-\frac12\partial_\nu(b f_N)+J_{\ge3},
\qquad
a=\sum_{\varsigma=\pm1}r_\varsigma d_\varsigma,
\qquad
b=\sum_{\varsigma=\pm1}r_\varsigma d_\varsigma^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f63acc081bd16c20)

The first moment $a$ is local drift and the nonnegative second moment $b$ produces diffusion. Derivatives act on rates and increments as well as on density. The exact weak remainder after the quadratic expansion obeys $|\int\phi(-\partial_\nu J_{\ge3})\,d\nu|\le\|\phi'''\|_\infty\int f_N\sum_\varsigma r_\varsigma|d_\varsigma|^3\,d\nu/6$, when the integral is finite and $\phi'''$ is bounded over the jump intervals. This rate-bearing bound does not assert a pointwise current expansion without additional smoothness. A drift-only approximation needs a separate bound on both diffusion and higher moments. Equal rates $r_+=r_-=\nu^2$ and fixed increments $\pm d$ give $a=0$, yet for constant density the diffusion current is $-2d^2\nu f_N$. This mathematical comparison demonstrates why zero drift does not eliminate redistribution; it is not a primitive stochastic law for architrinos.

Deep space can therefore look smooth without making the underlying candidate transactions continuous. In a solar-system environment, the proposed response can include changed cadence, strain, alignment, and gradients; a scalar temperature change alone does not specify those variables. Near a matter assembly, the neighboring braids sample sharper boundary conditions whose effect on the retuning rates remains to be derived.

#### Temperature-Conditioned Branch Transition Target

A temperature channel can enter this transport law only through the same retained ensemble record used to define [temperature](../../../../markdown/aaa/dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable). It is not a property of one Noether braid and does not change $h_{\mathrm{act}}$. The candidate event remains a branch-ledger transition with $\Delta A_{\mathrm{cyc}}=\pm h_{\mathrm{act}}$; temperature conditions admissible rates in a declared coarse-graining cell, without calibrating the action unit to observer Planck $h$.

When the retained record licenses a temperature variable $T_{\mathcal Q,W}$, the temperature-conditioned part of the cadence current has the candidate form

$$
J_\nu^{(T)}=a^{(T)}f_N-\frac12\partial_\nu(b^{(T)}f_N)+J_{\ge3}^{(T)},
\qquad
(a^{(T)},b^{(T)})
=\sum_{\varsigma=\pm1}r_\varsigma(\nu,\mathbf X,T;T_{\mathcal Q,W})
(d_\varsigma,d_\varsigma^2)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-90bc7ba66eacbd11)

These are the same jump moments and remainder with temperature-conditioned rates, not an additional current to add again to $J_\nu$. For a differentiable invertible retuning map $F(\nu)=\nu+d_+(\nu)$, detailed balance compares fluxes through corresponding cadence intervals. Because $f_N$ is a density with respect to $d\nu$, its residual is

$$
\mathcal R_{\mathrm{db}}^{(T)}(\nu,\mathbf X,T)
=
f_N(\nu,\mathbf X,T)\,
r_+(\nu,\mathbf X,T;T_{\mathcal Q,W})
-
f_N(\nu+\Delta\nu_N^{(q,+)},\mathbf X,T)\,
r_-(\nu+\Delta\nu_N^{(q,+)},\mathbf X,T;T_{\mathcal Q,W})\,|F'(\nu)|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-124f0e76a45fe263)

This pair test assumes the reverse increment returns to the starting cadence, $\Delta\nu_N^{(q,-)}(\nu+\Delta\nu_N^{(q,+)})=-\Delta\nu_N^{(q,+)}(\nu)$. The Jacobian $|F'|$ converts the reverse interval back to the starting interval. For $F(\nu)=2\nu$, forward density-rate product one balances reverse product one-half. Discrete branch probabilities with counting measure instead use no Jacobian; noninvertible maps require summing over inverse branches.

Detailed balance cancels each pair's equilibrium probability flux while individual transitions continue. It does not require the conditional drift $a^{(T)}(\nu)$ to vanish. For a comparison chain at cadences $(1,2,3)$ with probabilities $(1/4,1/2,1/4)$ and adjacent forward/reverse rates $(2,1)$ and $(1,2)$, every pair balances but local drifts are $(2,0,-2)$; their population mean is zero. In a valid diffusion limit, drift and diffusion balance in the equilibrium current. Nonzero pair residuals indicate redistribution, not necessarily a nonzero total mean drift. The fixed-speed scale trend applies to individual cadence changes; the rates, increments, and internal partition still require derivation from retained branch histories.

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

The population membership diagnostic does not require every braid to have the same cadence. After removing resolved assembly ledgers, it compares a branch's cadence with the smoothed population and checks local pro/anti balance. It is not a dynamical equilibrium or stability test. In symbolic form,

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

Here $\chi_{\mathrm{comp}}^{(\ell)}$ removes branches phase-locked to resolved assemblies; it is neither the delay factor nor susceptibility. The cadence difference $\Delta_{\mathrm{cad}}$ and neutral-pairing/orientation imbalance $\Delta_{\mathrm{bal}}$ are divided by declared positive scales before entering the exponential. The assembly-facing definition is in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). The average is defined only for positive denominator, using an independently classified reference population to avoid circular membership tests. Spatial proximity alone does not make an assembly-locked braid ambient, and acceptance by this diagnostic proves neither balance nor persistence.

A candidate equilibrium-transport equation is

$$
\partial_T f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{pop}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
+r_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c0665f146523b9cf)

Here $S_{\mathrm{pop}}$ is the signed cadence-resolved source for all ambient membership events, $S_{\mathrm{GW}}$ redistributes existing braids under gravitational-wave disturbances, and $r_f$ records unresolved kinetic error. Write $S_{\mathrm{pop}}=s_{\mathrm{BH,diff}}+s_{\mathrm{BH,col}}+s_{\mathrm{pair}}+s_{\mathrm{return}}-s_{\mathrm{recruit}}-s_{\mathrm{dissoc}}-s_{\mathrm{reclass}}+s_{\mathrm{relax}}$, with $\int s_c\,d\nu=S_c$ for each previously declared number-source channel. Number-preserving retuning has $\int S_{\mathrm{GW}}\,d\nu=0$; the residual neighbor operator also has $\int R_{\mathrm{eq}}\,d\nu=0$. It excludes transitions already assigned to $J_\nu$, so no equilibration event is counted twice. Relaxation enters $s_{\mathrm{relax}}$ only when it changes ambient membership. A disturbance that changes membership must instead use its corresponding population event.

Integrating over cadence derives the exact compatibility condition $S_\rho+r_\rho=\int_0^\infty(S_{\mathrm{pop}}+S_{\mathrm{GW}}-R_{\mathrm{eq}}+r_f)\,d\nu-[J_\nu]_0^\infty$, where $[J_\nu]_0^\infty=J_\nu(\infty)-J_\nu(0)$. For zero cadence-boundary flux this reduces to $r_\rho=\int r_f\,d\nu$. Any nonzero boundary exchange needs an identified event or unresolved residual; it must not be added a second time to $S_{\mathrm{pop}}$. The spatial factorization assumes cadence-independent mean velocity in the cell. Otherwise replace $\mathbf u_{\mathrm{sea}}f_N$ by the cadence-resolved flux $\mathbf j_{\mathbf X}(\nu)$ and define $\rho_{\mathrm{NS}}\mathbf u_{\mathrm{sea}}=\int\mathbf j_{\mathbf X}\,d\nu$. These conditions join the candidate kinetic equation to the declared population balance; they do not derive its constitutive coefficients. Redshift additionally requires this same record to determine sea cadence, delay, and packet response.

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
\Delta_E,\,\Delta_R,\,
B_X(E),\,
B_X^{\mathrm{dur}}(E),\,
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

The endpoint clock mismatch is $\Delta_Q=\Delta_{\mathrm{clk\text{-}sea},\mathcal A_Q}$ for the specified source or receiver clock assembly, $Q\in\{E,R\}$. With a calibrated clock map $d\tau_Q/dT=C_{\mathcal A_Q}=\Gamma_{N,Q}^{-1}e^{\Delta_Q}$, the factor $B_X(E)=\nu_{\mathrm{em},X}^{(\tau_E)}/\nu_{X,0}$ compares emitted cycles per source-clock unit with the reference line frequency in the same clock units. Thus the emitted absolute frequency is $\nu_{X,0}B_X(E)C_{\mathcal A_E}$; $B_X$ does not already contain that clock conversion. The independent source-envelope factor is $B_X^{\mathrm{dur}}(E)=\Delta\tau_{\mathrm{em},X}/\Delta\tau_{X,0}$, measured by one declared envelope-width procedure in source-clock units. Both factors equal one on the reference source. Only a demonstrated fixed-cycle-count waveform family permits $B_X^{\mathrm{dur}}=B_X^{-1}$.

Received frequency and duration below are measured per receiver-clock unit and in receiver-clock units, respectively. The endpoint rates are taken constant over each packet to within a declared error. The launch comparison is restricted to a locally affine emission-to-arrival map shared by phase and envelope, so its duration factor is $D_v^{-1}$. Non-affine launch or differing phase/envelope launch maps require separately extracted timing corrections before this factorization is used. These restrictions do not impose equality of the subsequent frequency and duration path responses.

The minimal state needed for the first executable closure is a projection of the absolute record, not a new ontology. For a segmented path $\gamma_{E\to R}=\{\Delta s_j\}_{j=1}^N$, use

$$
\mathcal S_{X,E\to R}^{\min}
=
\left(
\mathcal G_E,\,
\mathcal G_R,\,
\mathcal V_{E,R},\,
B_X(E),\,
B_X^{\mathrm{dur}}(E),\,
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
\mathcal R_{\Gamma,Q},\,
\Delta_Q
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
T_j,\,c_{\gamma,j},\,\mathbf d_{\vartheta,j},\,
f_{N,j},\,
w_{X,j},\,I_{X,j},\,\mathcal O_j,\,
S_{\mathrm{pop},j},\,
S_{\mathrm{GW},j},\,
R_{\mathrm{eq},j},\,
r_{f,j},\,
\partial_\nu J_{\nu,j},\,
\delta_{u,j},\,
\sigma_{X,j},\,
\mathcal R_{\mathrm{coh},X,j}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f47829488b33a6d0)

Here $T_j=T(s_j)$ is absolute time, $c_{\gamma,j}>0$ is the photon-channel path speed, $\mathbf d_{\vartheta,j}=D_\gamma\boldsymbol\vartheta_{\mathrm{sea}}|_j$ is the scalar-state gradient defined below, $w_{X,j}$ is a normalized cadence-response weight, and $\mathcal O_j$ is the retained orientation record. Cadence-dependent entries remain functions of $\nu$ until the stated weighted integral is taken. Also $\delta_{u,j}=(\nabla\cdot\mathbf u_{\mathrm{sea}})_j$ and $\sigma_{X,j}=\hat k_a\hat k_b\Sigma_{\mathrm{sea},X,j}^{ab}$. Each input has an independently extracted uncertainty, including the kinetic and omitted-orientation errors. The transport coefficients are one fixed row for the line family,

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

Here $\mathbf v_Q$ is endpoint assembly velocity in absolute coordinates, $\hat{\mathbf k}$ points from transmitter to receiver, $c_{\gamma,Q}$ is the local photon-channel speed used for the endpoint comparison, and $\mathcal R_v$ carries bounded higher-order and multi-root Jacobian corrections from the exact causal ledger. This weak comparison requires positive numerator and denominator and one specified endpoint direction; a bent path requires its separate endpoint tangents.

Write $Y_{X,E\to R}=Y_{X,E\to R}^{\mathrm{freq}}$ when the frequency label is suppressed. Its candidate prediction is a line integral over the packet path through the Noether sea:

$$
Y_{X,E\to R}
=
\int_{\gamma_{E\to R}}
\alpha_{\mathrm{prop},X}
\!\left[
S(T(s))
\right]
\,ds
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6f3b85ad3e8bb5ea)

A reduced scalar projection of the medium state and the corresponding path derivative are

$$
\boldsymbol\vartheta_{\mathrm{sea}}
=\Pi_{\mathrm{scal}}\boldsymbol\theta_{\mathrm{sea}}
=(\ln n,\ln\chi_{\mathrm{sea}},\ln\lambda,-\ln\xi)^T,
\qquad
\frac{d\boldsymbol\vartheta_{\mathrm{sea}}}{ds}
=D_\gamma\boldsymbol\vartheta_{\mathrm{sea}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f9c6b2de76027f7)

The projection $\Pi_{\mathrm{scal}}$ selects four dimensionless scalars from the full reduced medium state $\boldsymbol\theta_{\mathrm{sea}}$; it does not redefine that state or erase its orientation variables. Retained orientation $\mathcal O$ enters the cadence-response weight and the channel stress projection below. Any orientation or memory effect not represented there needs a separately bounded error. The endpoint-only entry $\ln(R_{\text{braid}}/R_{\text{braid},0})$ is a local carrier-size readout; no path-resolved size channel is included in this ansatz. Along the absolutely timed path $\mathbf X(s)$, take $d\mathbf X/ds=\hat{\mathbf k}$ and $dT/ds=c_\gamma^{-1}$, giving

$$
D_{\gamma}
=
c_{\gamma}^{-1}\partial_T
+
\hat{\mathbf k}\cdot\nabla
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c1a7b5ae8118e453)

Here $s$ is Euclidean path length and $c_\gamma=ds/dT$, which is not set equal to the primitive wake speed by choosing units. The kinetic equation defines the source-balanced rate

$$
\mathcal C_N[f_N]
=
\frac{
S_{\mathrm{pop}}
+
S_{\mathrm{GW}}
-
R_{\mathrm{eq}}[f_N]
+r_f
-
\partial_\nu J_\nu
}{
f_N+\epsilon_f
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ffe8b3a6a5e608ba)

On the smooth positive-density domain, the cadence-independent spatial-velocity convention gives the exact identity

$$
\left(
\partial_T
+
\mathbf u_{\mathrm{sea}}\cdot\nabla
\right)
\ln(f_N/f_{\mathrm{ref}})
=
\left(1+\frac{\epsilon_f}{f_N}\right)\mathcal C_N[f_N]
-
\nabla\cdot\mathbf u_{\mathrm{sea}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-11b355a5f73b506a)

Here $f_{\mathrm{ref}}>0$ is a constant reference density per cadence, making the logarithm dimensionless, and $\epsilon_f\ge0$ is a declared numerical floor in the same units. The quantity $\mathcal C_N$ is a source-balanced material-rate quantity, not an equation defect or the endpoint clock-rate factor $C_N=\Gamma_N^{-1}$. It can be nonzero when the kinetic equation is satisfied exactly. If the spatial flux is cadence-dependent, define $\mathbf v_\nu=\mathbf j_{\mathbf X}/f_N$ and replace $\mathbf u_{\mathrm{sea}}$ by $\mathbf v_\nu$ in this identity; the population-mean flow in the separate response channel remains independently defined.

To obtain a scalar response for family $X$, specify a nonnegative cadence sensitivity $W_X(\nu;\mathcal O,\mathcal N_{\mathrm{sea}},\mathcal L_X)$ and a cadence interval $I_X\subset(0,\infty)$ before evaluating transport. Its normalization is $w_X=W_Xf_N/\int_{I_X}W_Xf_N\,d\nu$, with positive finite denominator, and its scalar projection is $\mathcal C_{N,X}=\int_{I_X}w_X\mathcal C_N\,d\nu$. Thus $w_X$ has inverse-cadence units and $\int_{I_X}w_X\,d\nu=1$. The sensitivity and interval must come from independent channel-response extraction and use the same rule in every case; they cannot be selected to reproduce the observed redshift. This specifies a family of mathematical projections, not a derived physical sensitivity.

Require $f_N\ge f_{\min}>0$ on the weighted support, a smooth cadence density, and finite weighted rate integrals. If $\mathcal C_{N,X}^{(0)}$ denotes the same projection with zero floor and the same weight, then $|\mathcal C_{N,X}-\mathcal C_{N,X}^{(0)}|\le[\epsilon_f/(f_{\min}+\epsilon_f)]\int_{I_X}w_X|\mathcal C_N^{(0)}|\,d\nu$. Unresolved support or cadence tails require their own response bound; a floor cannot certify empty or poorly sampled cells. For a dimensionless comparison $f_N=e^{-\nu T}$, $T>0$, zero flow, and source $-\nu f_N$, the unfloored rate is $-\nu$. Choosing $W_X=1$ on $I_X=[1,2]$ gives the unique scalar $-1-1/T+1/(e^T-1)$, rather than an unselected value at cadence one or two. This example checks the projection and does not determine the physical $W_X$.

With that scalar projection, the candidate path rate is

$$
\alpha_{\mathrm{prop},X}
=
\mathbf p_X\cdot
D_{\gamma}\boldsymbol\vartheta_{\mathrm{sea}}
+
p_{\nu,X}
\mathcal C_{N,X}
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

Here $\Sigma_{\mathrm{sea},X}^{ab}$ is the channel-$X$, trace-free projection of the Noether sea stress, extracted with its orientation record, and vanishes in the isotropic weak limit. Its units are stress. With length and absolute-time units denoted by $L$ and $\mathsf T$, $\mathbf b_N$ and $\mathbf p_X$ are dimensionless, $p_{\nu,X}$ and $p_{u,X}$ have units $\mathsf T/L$, and $p_{\sigma,X}$ has units $(\mathrm{stress}\,L)^{-1}$. The bounded remainder $\mathcal R_{\mathrm{coh},X}$ has units $L^{-1}$. Every term in $\alpha_{\mathrm{prop},X}$ therefore has inverse-length units and $Y_X$ is dimensionless. Numerical examples use $c_f=1$; this normalization does not remove the channel-speed or coefficient units.

In a segmented calculation the scalar update is

$$
\alpha_{\mathrm{prop},X,j}
=
\mathbf p_X\cdot\mathbf d_{\vartheta,j}
+
p_{\nu,X}
\int_{I_{X,j}}w_{X,j}(\nu)
\frac{
S_{\mathrm{pop},j}
+
S_{\mathrm{GW},j}
-
R_{\mathrm{eq},j}
+r_{f,j}
-
\partial_\nu J_{\nu,j}
}{
f_{N,j}+\epsilon_f
}
\,d\nu
+
p_{u,X}\delta_{u,j}
+
p_{\sigma,X}\sigma_{X,j}
+
\mathcal R_{\mathrm{coh},X,j}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-75350bdb543c5ac1)

The coefficient rows $\mathbf b_N$ and $(\mathbf p_X,p_{\nu,X},p_{u,X},p_{\sigma,X})$ must be fixed from independent clock and medium-response extraction and then reused across gravitational, relative-motion, and deep-space cases. A deep-space contribution may come from a persistent projected cadence rate, flow divergence, or anisotropic response. This identifies candidate response channels without deriving their coefficients.

For the constant row $\mathbf p_X$, the fundamental theorem of calculus gives $\int_E^R\mathbf p_X\cdot D_\gamma\boldsymbol\vartheta_{\mathrm{sea}}\,ds=\mathbf p_X\cdot(\boldsymbol\vartheta_R-\boldsymbol\vartheta_E)$. Evaluate this contribution at the endpoints, including their absolute times. Intermediate excursions with equal endpoint states give the same value. On components shared with $\mathbf g_N$, the log-redshift sum is $\mathbf b_N\cdot(\mathbf g_N(E)-\mathbf g_N(R))+\mathbf p_X\cdot(\boldsymbol\vartheta_R-\boldsymbol\vartheta_E)$; shifting both shared coefficient rows by the same vector leaves it unchanged. Independent clock calibration is needed to separate those rows. Extra path samples do not remove this exact degeneracy. Interior-history sensitivity belongs to the other integrands, unless a state-dependent coefficient or non-exact response is separately derived.

The endpoint coefficient-row constraints are conditional recovery targets. On the clock-tracking branch, where the independently extracted clock/sea mismatch is below tolerance, this chapter consumes the clock-row extraction owned by [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target): the homogeneous moving Noether braid branch requires $\Gamma_N\to1/\xi\to\gamma_\star$, while the weak static endpoint branch requires the scalar normalization

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

The relative-motion recovery fixes the separation between launch geometry and transport coefficients. In a homogeneous weak comparison with $\mathbf g_N(E)=\mathbf g_N(R)=0$, $\Delta_E=\Delta_R=0$, $B_X(E)=1$, and all response terms in each $\alpha_{\mathrm{prop},X,j}$ zero,

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

Thus the launch factor carries the first-order Doppler or phase-compression term in this restricted comparison. The segment's positive density, normalized weight, and absolute-time record do not vanish; only its response terms do. Moving clocks with nonzero cadence or mismatch corrections retain those endpoint factors. No path coefficient is adjusted to replace them.

Define $1+z_X=\nu_{X,0}/\nu_{\mathrm{obs},X}$ using the receiver's calibrated clock units. The frequency factorization then gives

$$
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
-\Delta_E+\Delta_R
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
-\Delta_E+\Delta_R
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

Here $U_Q=-\Phi_N(Q)$ is the positive weak gravitational-potential depth used as an observer-level recovery variable, and $c_0$ is the reference photon-channel speed. This comparison is not a primitive potential law. Endpoint-subtracted replay isolates the inferred propagation contribution only after the endpoint scalar and both clock mismatches are independently fixed. A compensated static family with the same scalar sum cannot be distinguished by this comparison alone. Without independent clock calibration, the shared endpoint/gradient coefficient degeneracy remains. In particular, identical sea cadence and receiver mismatch $\Delta_R=0.1$ with $\Delta_E=0$ give log-redshift $0.1$ even when the path contribution is zero.

Evaluate the exact gradient contribution at the endpoints and approximate the remaining integral by segments:

$$
Z_{\mathrm{prop},X}
=
\mathbf p_X\cdot(\boldsymbol\vartheta_R-\boldsymbol\vartheta_E)
+
\sum_{j=1}^{N}
\left[
p_{\nu,X}\mathcal C_{N,X,j}
+p_{u,X}\delta_{u,j}
+p_{\sigma,X}\sigma_{X,j}
+\mathcal R_{\mathrm{coh},X,j}
\right]
\Delta s_j
+R_{\mathrm{quad},X}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f761477990b0a1c3)

with

$$
\mathcal C_{N,X,j}
=
\int_{I_{X,j}}w_{X,j}(\nu)
\frac{
S_{\mathrm{pop},j}
+S_{\mathrm{GW},j}
-R_{\mathrm{eq},j}
+r_{f,j}
-\partial_\nu J_{\nu,j}
}{
f_{N,j}+\epsilon_f
}
\,d\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f15c770a02b94107)

Here $R_{\mathrm{quad},X}$ is the dimensionless quadrature error with an independently established bound. If the non-gradient integrand has path derivative bounded by $M_j$ on segment $j$, midpoint quadrature gives $|R_{\mathrm{quad},X}|\le\sum_j M_j(\Delta s_j)^2/4$. The source, redistribution, kinetic-error, and cadence-boundary conventions are those of the same population equation. In particular, omitted source channels cannot be reconstructed by adjusting $p_{\nu,X}$.

This formula fixes the sign and scalar projection without determining the physical sensitivity or coefficients. Once those are independently fixed, $Z_{\mathrm{prop},X}$ is a prediction to compare with $Y_{X,E\to R}^{\mathrm{sub}}$ on histories not used for calibration. Defining the path output by that subtraction and reinserting it into the frequency formula is algebraic replay, not a predictive check. Independent response records must distinguish the cadence, flow, and anisotropic terms; the gradient term remains an endpoint contribution. Chromaticity, duration, image-bundle spread, and directional errors can then falsify the proposed map.

The remainder $\mathcal R_{\mathrm{coh},X}$ cannot be fitted freely to the observed redshift. Require a bound $|\mathcal R_{\mathrm{coh},X}(s)|\le b_{\mathrm{coh},X}(s)$ extracted from omitted-history and channel-response evidence, giving $|\int\mathcal R_{\mathrm{coh},X}\,ds|\le\int b_{\mathrm{coh},X}\,ds$. Kinetic uncertainty likewise contributes at most $|p_{\nu,X}|\int ds\int_{I_X}w_X|r_f|/(f_N+\epsilon_f)\,d\nu$ when only its bound is known; floor, weighting, endpoint, and quadrature errors must also be propagated. These bounds must be fixed independently of the outcome being tested. In addition, the same transport prediction must meet the observational constraints

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

Here $\operatorname{Var}_\perp$ uses a declared bundle of neighboring rays, the logarithmic frequency derivative holds the specified source family and geometry fixed, and the positive tolerances normalize the respective dimensionless observables. These checks are necessary transport tests; none supplies the omitted-history bound. The two measured diagnostics are operationally defined by phase frequency per receiver-clock unit and envelope duration $\Delta\tau_{\mathrm{obs},X}$ in receiver-clock units:
$$
Y_{X,E\to R}^{\mathrm{freq}}
=
-\ln\!\left[
\frac{\nu_{\mathrm{obs},X}}
{\nu_{X,0}B_X(E)(\Gamma_{N,R}/\Gamma_{N,E})e^{\Delta_E-\Delta_R}D_v}
\right],
$$

[View →](../../../../../equation-mapping.html#corpus-equation-93c03e23f010138f)

$$
Y_{X,E\to R}^{\mathrm{dur}}
=
\ln\!\left[
\frac{\Delta\tau_{\mathrm{obs},X}}
{\Delta\tau_{X,0}B_X^{\mathrm{dur}}(E)(\Gamma_{N,E}/\Gamma_{N,R})e^{\Delta_R-\Delta_E}D_v^{-1}}
\right].
$$

[View →](../../../../../equation-mapping.html#corpus-equation-795bec180afc5ceb)

These are extraction definitions. A prediction requires an independently evaluated phase-transport response and an envelope-transport response from the same path record. The latter follows the separation of neighboring launch and arrival events, not the carrier-frequency calibration alone. Equality of the two extracted $Y$ values is a further observational recovery condition, not an algebraic identity. For $B_X=2$, $B_X^{\mathrm{dur}}=1$, unit reference envelope width, and unchanged endpoint and propagation factors, the emitted carrier frequency doubles while $Y_X^{\mathrm{dur}}=0$; imposing reciprocal source duration would create a false $\ln2$ path signal.

The proposed path term describes phase-cadence retiming read from $S(T)$. Its interpretation also requires a separate energy account for the packet, medium, source, receiver, and boundary exchanges. Image, chromaticity, and duration agreement does not close that energy account. Neither a fitted redshift nor observer calibration $E=h\nu_{\mathrm{obs}}$ proves absence of physical energy transfer along the path.

With this map, the received frequency is

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}B_X(E)
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}
e^{\Delta_E-\Delta_R}
D_v
\exp(-Y_{X,E\to R}^{\mathrm{freq}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0228398f241eef72)

This follows by source-clock to absolute-time conversion, phase transport, and absolute-time to receiver-clock conversion. The effective packet-energy readout is $E_{\mathrm{obs},X}=h\nu_{\mathrm{obs},X}$ after source calibration, endpoint cadence and mismatch, launch compression, and path response have been specified. It remains a conditional transport map until the response coefficients, frequency and envelope evolution, and energy exchanges are derived from the retained histories.

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

### Source Notes

Matt Visser, *Acoustic black holes: horizons, ergospheres, and Hawking radiation*, 1997 preprint, [arXiv:gr-qc/9712010](https://arxiv.org/abs/gr-qc/9712010), theorem and equation (4), supplies the acoustic comparison in “Continuum Balance and Constitutive Closure.” Its scalar metric describes small velocity-potential disturbances under the stated fluid assumptions; it supplies no Noether sea constitutive law.

B. L. Hu and E. Verdaguer, *Stochastic Gravity: Theory and Applications*, 2008, [arXiv:0802.0658](https://arxiv.org/abs/0802.0658), section 3.2, equations (3.11)–(3.12), identifies the centered, symmetrized quantum stress covariance used for comparison. The classical history covariance here is a distinct observable whose observer-level mapping remains to be derived.

### Summary Commitment

> **Medium Commitment (Noether sea):** The Noether sea is the emergent physical medium formed by coupled neutral Noether braid assemblies occupying the Euclidean void. It carries density, stress, energy, orientation, flow, and response properties. Effective gravity, clock dilation, signal delay/refraction, inertia, and cosmological behavior are reconstructed from Noether sea dynamics and assembly coupling, not from curvature or expansion of the void itself. Matter assemblies and Noether braid branches are physically meaningful as local retained branches embedded in this medium record; isolated branch calculations are seed charts or limiting cases unless their Noether sea state and nearby-assembly boundary residuals are statused. The claim that orthogonal-axis three-binary neutral assemblies dominate the weak homogeneous medium remains a comparative selection target: other architrino assembly classes must be rejected, subordinated, or classified by the same ambient selection residual before Noether sea composition is closed.

## Noether Sea Pro/Anti Coupling

This note states a bounded working hypothesis for the Noether sea: the sea is not a passive geometric background. It is an active medium built from persistent Noether braid assemblies with internal structure and coupling rules. The fixed background remains absolute time and the Euclidean void; this chapter is about the contents that occupy that background and supply medium response. It is the assembly-hypothesis continuation of [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), [Euclidean Void](../../../../markdown/aaa/foundations/euclidean-void.md), and [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md).

For the canonical medium ontology, total-density boundary, and terminology discipline, see [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md). This chapter develops a narrower hypothesis: how a classified pair of complementary orientation populations might contribute to the medium response. The distinction between this orientation label and polarity conjugation is fixed in [Terminology Usage](../../../../markdown/aaa/archie/terminology-usage.md#proanti-orientation-and-polarity-conjugation).

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

At the assembly level, a useful physical picture is antiparallel pairing. Complementary orientation labels do not by themselves establish antiparallel circulation: relative axis, phase, and retained path history must also be specified. The proposed outcome is that an appropriate coupling law could suppress exposed axial circulation and polar-site leakage, while preserving the response assigned to the medium. Comparative transparency is therefore a testable hypothesis, not a consequence of equal labels or equal counts.

For the population projection below, restrict the ambient identity set to carriers whose pro/anti orientation has been classified on a nondegenerate retained branch. Use the same normalized spatial window $W_\ell$ and the same exclusion of resolved assembly contributions for both components, and take a constant reference number density $\rho_{\mathrm{NS},0}>0$. If an admitted carrier has no defined orientation sign, it must be excluded by a declared classification rule or retained as an unresolved contribution; assigning it a sign by convention would hide the missing classification.

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

where the signed density difference is a population-imbalance field, not itself a stability theorem. Positivity gives $|\Delta\rho_{\text{NS}}|\le\rho_{\text{NS}}$ pointwise, and where $\rho_{\text{NS}}>0$ the fractional imbalance $b\equiv\Delta\rho_{\text{NS}}/\rho_{\text{NS}}$ lies in $[-1,1]$. A stricter persistence threshold requires a specified retained branch, environment, evolution law, and perturbation class; it remains a coupling-law target. At the diagnostic level, the $\Delta_{\mathrm{bal}}$ term in the ambient-branch acceptance diagnostic of [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md#ambient-branch-acceptance) is not generally identical to this signed density difference: the full diagnostic also contains neutral-pairing and orientation/polarization residuals with their own norms and scales. The normalized density difference may contribute to its orientation part only after that map is derived.

The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) page names the Noether sea and its total state variables; this chapter owns the pro/anti split and the hypotheses about how those subcomponents couple.

### 2 Pro + 2 Anti Coupling Hypothesis

A recurring speculative motif is a candidate four-member cluster built from two pro-Noether braid constituents and two anti-Noether braid constituents. Four is not minimal for count balance: one pro and one anti already give zero count difference. The four-member arrangement may instead be useful for a stronger, still-to-be-defined property such as packing, reciprocal support, or tolerance to a specified perturbation. Geometrically, it is often pictured as a compact four-body bound state analogous in shape intuition, but not in nuclear force mechanism, to a helium-like $2\mathrm{p}+2\mathrm{n}$ nucleus: two of one type plus two of the complementary type in a tightly coupled arrangement.

The analogy is structural:

- helium-like count balance ($2+2$),
- compact low-moment configuration,
- enhanced robustness against single-constituent perturbation.

The analogy is not identity:

- no claim that baryonic protons/neutrons are being reused,
- no claim that QCD binding equations directly apply.

Instead, the model uses the helium-like picture as a design intuition for why a four-member pro/anti cluster might, after an actual same-history calculation, minimize net torque, suppress long-term precession drift, or provide a resilient seed unit for medium-level tiling. These are properties to test, not consequences of the count. The count balance is the useful part; the nuclear analogy is not a claim about the acceleration law. Any claim of minimality also requires a declared property and a comparison with smaller candidate clusters.

### Why This Matters for Effective Spacetime Phenomenology

If the local Noether sea is assembled from balanced pro/anti Noether braid populations, then curvature-like behavior is read as collective reconfiguration of assembly states rather than purely geometric deformation of an otherwise structureless manifold. In that interpretation:

- weak-field behavior tracks smooth perturbations in normalized density $n$ as used in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md),
- strong-field behavior tracks approach to alignment and saturation limits,
- wave channels track propagating phase disturbances through the coupled Noether braid assembly network.

This is consistent with the framework's broader assemblies-first stance. Equations are read as effective descriptors of deeper assembly dynamics, and the medium response is carried by organized Noether braid populations rather than by the Euclidean void itself.

### Related descriptions

The following pages provide the surrounding descriptions:

- pro-Noether braid and anti-Noether braid orientation basis,
- local density decomposition into $\rho_+$ and $\rho_-$,
- orientation imbalance $\Delta\rho_{\text{NS}}$,
- coupling-regime stability thresholds,
- the $2+2$ pro/anti cluster hypothesis,
- medium-level Noether braid assembly motifs that could support effective spacetime behavior.

For the broader medium ontology, internal braid architecture, effective metric, clock and ruler extraction, and cosmological translation, see:

- the Noether sea as medium ontology; see [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md),
- the internal Noether braid architecture; see [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md),
- the effective metric map; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md),
- clock and ruler extraction; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- or cosmological scale-factor translation; see [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).

### Claim Scope

This is a hypothesis note, not a closed derivation. The chapter's claim is limited to the organizing possibility that local pro/anti Noether braid motifs may support effective spacetime behavior through Noether sea response. A completed version must derive the orientation-classification invariant, derive the local coupling law, test whether the $2+2$ pro/anti cluster is an energy minimum or only a design intuition, and extract weak-field, strong-field, or cosmological signatures from the same Noether sea variables used by the effective-metric program.

## Molecular Exclusion and Noether Sea Response

This chapter is an exploratory mapping note, not an AAA derivation of chemistry. It compares effective molecular exclusion with the separate question of medium-level propagation, asking whether a future map from AAA assembly and medium primitives could recover both behaviors. It complements [Condensed Matter](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md), [Molecular Geometry](../../../../markdown/aaa/nuclear-atomic/molecular-geometry.md), [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md). The molecular data below are observer-level or Standard Model comparison inputs; they are not substrate premises.

The guiding distinction is ordinary occupancy versus medium availability. At effective grade, molecules exclude one another through the atomic and chemical structure recovered by the Standard Model. The exploratory AAA question is whether a future assembly-level map can reproduce that exclusion while keeping photon, neutrino-like, gravitational-wave, clock, and Noether-sea response channels distinct. A tiny molecular hard-core packing fraction is therefore comparison background, not evidence that every channel sees empty space. The native content of the medium question is the channel-specific visibility/response test in [Noether Sea](../../../../markdown/aaa/spacetime/noether-sea.md#composition); this chapter supplies no molecular-level coupling law.

> **Assembly-emergence hypothesis.** It is a visionary, unverified hypothesis that molecular shape, bonding, exclusion, and channel-specific boundary behavior may emerge from stable Architrino assembly geometry and retained causal-wake history. This chapter does not derive that emergence or map it uniquely to protons, neutrons, molecules, or any effective interaction. The molecular and chemistry descriptions below are effective comparison inputs until an Architrino-level derivation connects them to the Master Equation and the relevant assembly response.

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
- Despite high number densities, the hard-core geometric occupancy is only about $0.06\%$ of the volume under the declared $\mathrm N_2$ union-of-spheres rule. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, ordinary molecular exclusion occupies only a small fraction of the available Euclidean volume. That result leaves any deeper Noether sea response undetermined.

This gives an observer-level geometric baseline for how much space a molecule excludes under the declared convention. A possible AAA mapping would have to recover the effective boundary from lower-level assembly records; bonding, compression, temperature, pressure, and channel dependence remain inputs or recovery targets here, not established substrate causes.

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

This distinction is useful for $\mathbb{A}\mathbb{A}\mathbb{A}$ because molecular exclusion and Noether sea response answer different questions. Molecular packing fraction estimates what ordinary matter blocks geometrically. Mean-free-path and Knudsen estimates say whether a gas can be treated as a continuum at the scale of the probe. Neither estimate determines whether a photon, neutrino, gravitational-wave channel, or clock-rate comparison couples strongly to the Noether sea. Those channels require their own coupling and propagation records; the present chapter does not supply those records.

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

Macroscopic boundaries are effective, channel-specific comparisons, not AAA-level mechanisms. At an air-water boundary, visible photons mostly pass while molecular transport is governed by the effective interface and species-dependent solubility. A lipid membrane can transmit oxygen by passive diffusion while restricting other solutes; permeability depends on molecular properties and membrane composition. At a metal-skin boundary, copper atoms in a wire do not freely diffuse into biological tissue, while infrared and visible photons can still cross or reflect at the boundary.

---

### Propagation Across Excluded Regions

Maximally packed van der Waals volumes define exclusion domains for ordinary atoms and molecules. They do not automatically block every observer-level channel or every deeper medium-level propagation mode. Ordinary matter is blocked by electron-envelope and bonding structure; that is the channel that forms the material boundary. Photons may pass, reflect, or be absorbed depending on frequency, material, thickness, and the observable counted.

In many ordinary laboratory columns, neutrino transmission is a useful effective comparison, but transmission depends on channel, energy, material column, and the observable counted; compare [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) for the assembly-level channel picture. Hypothetical WIMPs, axions, or gravitons belong only to standard-comparison language here and do not supply an Architrino-level mapping. Compare [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md) for the cosmological inference side and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md) for the effective propagation layer.

The effective spacetime comparison has the same lesson. In standard GR language, matter changes the metric rather than blocking spacetime as a substance; this is a recovery comparison, not an AAA premise. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the Euclidean void remains fixed, while a future effective-metric map may use Noether sea response. That mapping remains exploratory and must be tested independently of the molecular occupancy estimate.

---

### Absolute Timespace vs. Implemented Medium

- Absolute-timespace background: the mathematical arena in this project is absolute timespace, the product of one global time and Euclidean 3-space. It is fixed, non-dynamical, and does not curve.
- Noether sea implementation hypothesis: effective spacetime behavior may be realized by coherent assembly architecture at scales far smaller than molecules. In bridge prose this can be called a spacetime medium layer, but it is not a separate substrate inventory. Its proposed microstructure may modulate effective propagation, boundaries, and coherence without altering the background kinematics; this chapter does not derive that response.

This is the same implementation layer developed in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md) and [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md).

The van der Waals volume is an exclusion region for ordinary molecular matter. At the molecular level it defines a declared geometric envelope for atoms and molecules; at the material level, boundaries such as air-water, skin-air, and metal-skin are effective manifestations of molecular interactions. The possibility that these structures ultimately map to Architrino assemblies, effective particles, or other observer-level channels is a visionary hypothesis, not a derivation in this chapter. Molecular hard-core exclusion is therefore a matter-channel comparison, not a universal medium-availability rule.

The worked air estimate makes the chapter's limited conclusion concrete. A molecular occupancy of only about $6\times10^{-4}$ does not predict a photon, neutrino-like, clock, or gravitational-wave response, and it does not establish a mapping from molecular geometry to effective particle or force language. Each channel still requires its own $\mathcal C_X$ record and a separately specified visibility/response test; geometric sparsity alone establishes neither transparency nor opacity.

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
\widehat{\mathbf r}_{j,\mathrm{cross}}\cdot\mathbf n_{\mathrm{out}}(\mathbf X_{\mathrm{cross}})<0,\quad
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

The crossing time $T_{\mathrm{cross}}$ separates instantaneous influx from already admitted exterior history. The displayed set assumes a fixed spatial region $\Omega$ and retains incoming crossings only; tangencies require a separate convention, and a moving boundary requires a relative normal-velocity condition. An interior receiver at $T$ may depend on a boundary entry with $T_{\mathrm{cross}}<T$, so the boundary ledger is accumulated rather than only evaluated at the present boundary. For non-convex $\Omega$, the ledger retains each boundary-crossing event rather than assuming that the active exterior causal wake surface still intersects $\partial\Omega$ at the evaluation time.

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

Here $\widehat{\mathcal{B}}_{\partial\Omega}(T;\theta)$ denotes the boundary wake history retained by the observer model record. Let $R_{O,W}$ map each retained boundary history to its complete clock, ruler, detector, and readout record on $W$, and let $q_{O,W}$ apply the declared finite precision to that record. Define $\mathcal{B}_1\sim_{O,\theta,W}\mathcal{B}_2$ exactly when $q_{O,W}(R_{O,W}(\mathcal{B}_1))=q_{O,W}(R_{O,W}(\mathcal{B}_2))$. This is an equivalence relation on the explicitly declared space of alternative retained boundary histories, whereas a raw tolerance neighborhood is only a closeness relation. The quotient is an observer-accessible coarse-graining of deterministic boundary data, not a new substrate boundary. It is the object later counted in local-horizon entropy targets.

### Boundary-Wake Covariance Scaffold

The boundary term above also supplies the native home for covariance matrices used by observer-level measurement diagnostics. A covariance is not fundamental randomness. It is a finite-access summary of boundary wake histories, detector states, and Noether sea variables not resolved by a Physical Observer.

Let $b$ map each retained boundary history into a declared linear feature space that contains the features used by the readout model. With this notation, the unresolved boundary residual is
$$
\delta b_{\partial\Omega}(T;\theta)
=
 b(\mathcal{B}_{\partial\Omega}(T))
-
 b(\widehat{\mathcal{B}}_{\partial\Omega}(T;\theta))
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
 +\mathsf C^{\mathrm{bw,det}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
 +\mathsf C^{\mathrm{det,bw}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
 +\mathsf C^{\mathrm{bw,env}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
 +\mathsf C^{\mathrm{env,bw}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}';\theta)
 +\mathsf C^{\mathrm{det,env}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')
 +\mathsf C^{\mathrm{env,det}}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')
$$

[View →](../../../../../equation-mapping.html#corpus-equation-388721577cb3d390)

The displayed sum is valid when the cross-kernels vanish under the same joint conditional law; otherwise those kernels must be retained. The same joint decomposition should be reused across weak-probe, interferometric, and precision-gravity comparisons. If a proposed measurement model must retune the unresolved boundary covariance separately for each branch or observable, the observer-level closure has failed rather than discovered a new ontology.

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

Here $d_{\mathrm{ord}}$ measures mismatch of inferred causal order on the comparison domain, the clock term supplies local scale only on the declared sampled and controlled domain, and the preferred-frame term penalizes residual PPN preferred-frame parameters. The labels $\tau_{\mathrm{eff}}$ and $\tau_{\mathrm{GR}}$ mark the candidate observer-record clock readout and the GR comparison clock readout; they are not additional substrate time variables. This is a closure target for the observer layer, not a claim that substrate spacetime is Lorentzian.

A causal-set comparison adds a useful uniqueness discipline after the effective-metric map has supplied the candidate metric family. It is not enough for Physical Observer records to fit one effective metric; the same causal-order, clock, ruler, and preferred-frame data should not also fit macroscopically distinct effective metrics at the same declared coarse-graining scale. For a scale $\ell$ and tolerance $\varepsilon$, let $\mathcal{G}_{\ell,\varepsilon}(\theta)$ be the family of GR comparison metrics on the domain whose coarse-grained causal-order and clock/ruler diagnostics satisfy $\mathcal{R}_{\mathrm{causal}}(\theta;g)\le\varepsilon$, using the same residual above with $g$ supplying the target causal order and GR proper-time terms. Define the observer-side reconstruction-uniqueness residual
$$
\mathcal{H}_{\mathrm{eff}}(\theta;\ell,\varepsilon)
=
\sup_{g_1,g_2\in\mathcal{G}_{\ell,\varepsilon}(\theta)}
d_{\mathrm{geom},\ell}(g_1,g_2)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b957339721c910a6)

Small $\mathcal{H}_{\mathrm{eff}}$ says that the observer record determines a unique effective geometry up to the declared coarse-graining scale. Large $\mathcal{H}_{\mathrm{eff}}$ means the observer layer has not supplied enough scale, transport, or preferred-frame information to identify a stable GR comparison geometry. This residual is unrelated to the path-history ledger $\mathcal{H}_{\Omega}^{<T}$ above. It is an effective-reconstruction test only; it does not promote a Lorentzian metric to substrate ontology.

Process-matrix and indefinite-causal-order formalisms are useful here only as comparison frameworks. The Oreshkov–Costa–Brukner causal-inequality benchmark is one possible external comparison; if selected, its laboratory-closure and independent-setting assumptions must be retained. These formalisms test whether operational records can be represented without assuming a prior observer-level causal order, but their generalized process object is not a substrate replacement for absolute timespace. For settings or interventions $\mathbf{s}$ and records $\mathbf{r}$, let $P_{\mathrm{proc}}(\mathbf{r}|\mathbf{s})$ be the external process-table benchmark and let $P_{\mathrm{rec}}^\theta(\mathbf{r}|\mathbf{s})$ be the record distribution derived from Physical Observer laboratories, boundary wake data, apparatus kernels, and the candidate observer-state record $\theta$. A compact diagnostic is
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

An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a point transceiver whose past motion supplies expanding causal wakes; their arrivals determine its acceleration. A [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md) is a neutral assembly candidate built from coupled architrinos, and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the ambient population of such assemblies. They occupy the fixed [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) and evolve in [absolute time](../../../../markdown/aaa/foundations/absolute-time.md). A retained, countable clock cycle and its identification with an atomic clock remain dynamical and observer-level recovery obligations.

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

Take $\varphi_{\mathcal A}$ to be a continuous phase with full turns retained, and $\Omega_{\mathcal A}=d\varphi_{\mathcal A}/dT$ and $\Omega_{\mathcal A}^{(0)}>0$ to be angular frequencies measured against $T$. Along a clock history, let $J_{\mathcal A}=dt_{\mathrm{eff}}/dT>0$ be the total derivative of its declared observer-chart time. The exact chain rule is $d\tau_{\mathcal A}/dt_{\mathrm{eff}}=(\Omega_{\mathcal A}/\Omega_{\mathcal A}^{(0)})/J_{\mathcal A}$. Effective relative velocity is $\mathbf w_{\mathrm{eff}}=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}-\mathbf u_{\mathrm{sea,eff}}$; it is not obtained by relabeling the native $\mathbf w$. Reference normalization sets $J_0=1$ at the reference record only. Equating native and observer rate ratios elsewhere requires the additional condition $J_{\mathcal A}=1$ along those records and a declared ruler/speed conversion.

The phase-count definition and chain rule are derived identities on an admitted clock record. The constitutive clock law and Lorentz/GR recovery are hypotheses until that record and its observer map are supplied. A phase that cannot be unwrapped, a zero reference frequency, or a nonmonotone observer time invalidates the stated clock construction; a well-defined clock can still fail the physical recovery tests below.

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

Here $F_{\mathcal A}=d\tau_{\mathcal A}/dT$ is the same clock map used above, applied to identically calibrated clock designs along both histories. Oppositely directed circumnavigation paths provide the benchmark exemplified by [Hafele and Keating’s observed time gains](https://doi.org/10.1126/science.177.4044.168), while fiber-linked stationary clocks can supply the endpoint reference without turning photon transport into the carried matter clock. This is distinct from the photon-loop Sagnac comparison: one integrates a material clock cadence and the other integrates signal propagation. Use the same terrestrial flow model from [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#terrestrial-working-drift-profiles) along both paths. CMB-comoving and locally entrained profiles are distinguishable only when their projected annual, sidereal, east-west, or altitude signatures differ beyond the common uncertainty budget.

The target is to reproduce, in the appropriate regime,
$$
\frac{d\tau}{dt_{\mathrm{eff}}} \approx \sqrt{1+\frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}_{\mathrm{eff}}\|^2}{c_0^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc8677a60808f0b3)

Here $\Phi_N<0$ is the Newtonian comparison potential in a deeper potential region, $c_0$ is the calibrated weak-field observer speed, and both $|\Phi_N|/c_0^2$ and $\|\mathbf w_{\mathrm{eff}}\|^2/c_0^2$ are small. This expression fixes the leading weak-field terms; its square root does not determine second-order coefficients. Strong-field and high-velocity recovery requires a separate derivation.

Notation convention used in this chapter: $n(\mathbf X,T)\equiv \rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is the canonical medium-density variable. The Noether sea delay factor is $\chi_{\text{sea}}(\mathbf X,T)\equiv c_f/c_{\text{eff}}(\mathbf X,T)$; use it for refractive-delay language so $n$ remains reserved for density. The clock-law derivation imports the [transverse causal budget lemma](../../../../markdown/aaa/noether-braid/braid-mathematics.md#transverse-causal-budget-lemma): primitive branch tests may use $c_f$, but observer-level clock comparison uses the declared dressed speed $c_\star$, usually $c_\star=c_{\text{eff}}(\mathbf X,T)$ in a local Noether sea cell.

---

### Conceptual Setup

#### Absolute Time vs Derived Clock Time

- **Absolute time $T$**
  - Fundamental evolution parameter for the complete architrino dynamics.
  - Global, universal, non-dynamical; used by the $\mathbb{U}_{\text{now}}$ universe-state perspective (simulation clock).
  - All worldlines are parametrized directly by $T$.

- **Derived clock time $\tau$** (standard bridge term: proper time)
  - Time read by a **physical clock**. A countable braid or binary cycle is a microscopic candidate; reproducing atomic transition clocks requires a separate assembly and spectral mapping.
  - Encodes how many internal oscillation cycles occur per unit $dT$ before projection into an observer chart.
  - The word `proper` does not mean substrate-level, privileged, or exemplary; it names the inherited relativity comparison target for a clock-carried record.

The fundamental claim is:

> Time dilation is not a change in the rate of $T$; it is a change in how fast internal dynamics of assemblies proceed **relative to** $T$, and then how that clock readout projects into $t_{\mathrm{eff}}$, due to motion and medium coupling.

#### Clocks as Dynamical Systems

A clock is any assembly with a **stable, countable internal cycle**. The native picture is not time itself slowing; the countable assembly cycle is what changes cadence:

- Minimal model: a Noether braid with one declared clock-channel index $a_{\mathrm{clk}}\in\{1,2,3\}$ whose cycle is counted. The clock-channel role is extracted from the record and is not assigned by radius order.
- Base frequency $\omega_0$ (or period $P_0 = 2\pi/\omega_0$) is defined for:
  - Clock **at rest relative to the reference sea**, $\mathbf w=\mathbf0$, with its orientation, geometry, and history fixed; absolute rest agrees with this condition only when $\mathbf u_{\mathrm{sea}}=\mathbf0$.
  - In a region of homogeneous Noether sea density $n=1$ and negligible external gradients.

Derived clock time is then defined operationally as:
$$
d\tau = \frac{\omega(\text{state})}{\omega_0}\, dT
$$

[View →](../../../../../equation-mapping.html#corpus-equation-71107e7a9b84157d)

where $\omega(\text{state})$ is the instantaneous internal oscillation frequency in the actual kinematic and environmental state.

The central problem is to compute $\omega(\mathbf{w},n,\chi_{\text{sea}},\Phi_{\text{eff}})$ from the master dynamics rather than assigning the clock-rate factor by analogy with relativity.

#### Moving-Branch Clock Retuning Target

The homogeneous moving-clock extraction is a separate obligation from weak-field parameterized post-Newtonian (PPN) matching, which compares coefficients of the effective weak-gravity metric. Primitive branch calculations solve causal roots with $c_f$; $T_r$ is reception time at receiver $o$, and $T_t<T_r$ is emission time at transmitter $j$:
$$
\left\|\mathbf X_{o}(T_r)-\mathbf X_{j}(T_t)\right\|
=
c_f(T_r-T_t)
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

Here $\mathbf{w}$ is the native clock assembly group velocity through the local Noether sea and $0\le\beta_\star<1$. The channel speed in this native ratio must be expressed in the same length and absolute-time units. At observer export, use the effective velocity and channel speed in that chart; equality with the native ratio is an additional recovery condition.

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

After export, the same budget must be expressed in the effective chart. An admitted clock branch must extract
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star(\mathbf{w}_{\mathrm{eff}})}
$$

[View →](../../../../../equation-mapping.html#lorentz-clock-rate)

from its internal phase dynamics and observer projection. Finite wake speed alone does not pin any constituent’s speed or establish that its internal motion is transverse. The [speed-budget premise and consequence](../../../../markdown/aaa/noether-braid/braid-mathematics.md#transverse-internal-motion-speed-budget-premise-and-consequence) state those additional hypotheses.

For an admitted moving Noether braid branch $q$ on a group-speed band $0\le \|\mathbf{w}\|/c_f\le\beta_{\max}<1$ that also satisfies $\|\mathbf w\|<c_\star$, choose one clock phase $\theta_{\mathrm{clk},q}$ from the same causal-root ledger used for the branch's geometry. The extracted period is
$$
P_q(\mathbf{w})
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
P_0=P_q(\mathbf{0})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7d21870566bab09b)

Here the dot means $d/dT$, the cycle average retains full phase turns, and both periods are measured in absolute time. The observer period is instead $P_{q,\mathrm{eff}}=\int_{\text{one cycle}}J_q\,dT$. Comparing the native period ratio directly to the observer Lorentz factor requires $J_q=J_0=1$ and the same speed conversion; otherwise use the exported periods. With this restriction, define the native period residual
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

uniformly on the declared band, where $C_T$ is a fixed branch-uniform bound and $\epsilon_{\mathrm{LV}}$ is the declared dimensionless leakage budget. A surviving preferred-frame sideband is an observer-channel deviation only after the same export and calibration. This comparison fails if the clock phase and ruler geometry come from different branch ledgers, if the residual is suppressed only by fitting a PPN coefficient after the fact, or if $c_f$ is silently identified with $c_\star$ without a dressing map.

This moving-clock row is one leg of the structural-integrity common-limit closure in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). It is not enough for the clock branch to approximate $\gamma_\star^{-1}$ in isolation. The same causal-root ledger must also produce the moving ruler deformation, photon synchronization row, and weak-field gravity-channel speed row used by Lorentz closure; otherwise the clock result is a branch-split fit rather than clock-map closure.

#### Noether Sea Braid Cadence

For redshift and cosmology work, the local Noether sea braid cadence is a candidate reference before a separate detector clock is introduced. Cadences in this section are native $T$-rates. Their direct Lorentz and static-redshift targets below refer to the comparison subclass with $J=1$ on the compared histories; for a general observer chart the rate to compare is $C_N/J$. Let $\Omega_N(\mathbf X,T)>0$ be a representative angular cadence extracted by a declared population average from the local Noether sea braid population, with $P_N(\mathbf X,T)=2\pi/\Omega_N(\mathbf X,T)$. Relative to the positive weak homogeneous reference cadence, define

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
\sqrt{-g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88c5350d2fa2aad3)

Here $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the other $x_{\mathrm{eff}}^i$ are effective ruler coordinates, and the metric has signature $(-,+,+,+)$. The curve must be future-directed and timelike. Squaring this definition and dividing by $d\tau^2$ gives the normalization identity
$$
g^{\text{eff}}_{\mu\nu}
\frac{dx_{\mathrm{eff}}^\mu}{d\tau}
\frac{dx_{\mathrm{eff}}^\nu}{d\tau}
=
-c_0^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1d7d800b6f44e95b)

This equation is not a claim that the Euclidean void is a four-dimensional curved substrate. It is an observer-level clock-functional benchmark: an ideal clock accumulates the interval along its actual path, including an accelerated path. Stationarity of that interval under fixed-endpoint path variations is the separate freely falling geodesic benchmark; it is not a condition on an arbitrarily transported clock. If a branch recovers endpoint redshift but fails the integrated clock functional along accelerated or orbital records, the clock map has not closed.

#### Gamma-N Geometry Extraction Target

The equations above define the endpoint benchmark, but they do not yet derive the Noether sea cadence factor from Noether braid geometry. A first-order extraction scaffold starts from normalized Noether braid density $n$, Noether sea delay factor $\chi_{\text{sea}}$, envelope scale $\lambda$, envelope shape ratio $\xi$, and a representative Noether braid scale $R_{\text{braid}}$. Normalize $n$, $\lambda$, and $\xi$ to one in the reference cell and $R_{\mathrm{braid}}$ to $R_{\mathrm{braid},0}>0$. The reference delay $\chi_{\mathrm{sea},0}=c_f/c_{\mathrm{eff}}(W_0)>0$ need not equal one. All logarithm arguments must be positive. Around that reference, collect the logarithmic deformation record

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}},\,
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

at linear order only if the other moving deformations and $\mathcal R_\Gamma$ have no contribution proportional to $-\ln\xi$. A finite unspecified leakage term does not identify $b_\xi$; the leakage and remainder must be controlled relative to that deformation as it tends to zero. Under those hypotheses the first-order row is

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

where $\Omega_{\mathrm{clk}}>0$ is a dimensionless rate factor normalized to one in the reference cell, distinct from an angular frequency. The cadence-stretch factor is

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
+\omega_\chi\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}}
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

or, locally on a differentiable constitutive branch with spatially constant coefficient row and a controlled derivative of the remainder,

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
\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}}=a_\chi\frac{U}{c_0^2},\qquad
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

This reduces the proof burden. The restricted Lorentz matching fixes $b_\xi$ under the remainder assumptions above, while static weak-field redshift fixes one isotropic coefficient combination. Individual values of $b_n$, $b_\chi$, $b_\lambda$, and $b_R$, or equivalently of the $\omega$ row, require a constitutive calculation or simulation that extracts how a mass source changes $n$, $\chi_{\text{sea}}$, $\lambda$, and $R_{\text{braid}}$ in the same Noether sea cell.

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

and, choosing a minimal representative with vanishing unused coefficients and $A_\chi\ne0$, the cadence-stretch row is

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

Writing the four-component isotropic coefficient and response vectors as $\mathbf b=(b_n,b_\chi,b_\lambda,b_R)^T$, $\boldsymbol\omega=(\omega_n,\omega_\chi,\omega_\lambda,\omega_R)^T$, and $\mathbf a=(a_n,a_\chi,a_\lambda,a_R)^T$ gives

$$
\mathbf b\cdot\mathbf a=1,\qquad
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
\approx
-\Delta\ln\Gamma_N
=
S_G\frac{gL}{c_0^2}
+O(L^2)
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aa0b5a06479ac2d6)

Thus finite-height redshift fixes $S_G=1$ to the experimental tolerance. It does not distinguish the minimal row $\mathbf{c}=\mathbf{0}$ from a compensated row with $\mathbf{c}\cdot\mathbf{u}^{G}\ne0$ and adjusted $b_\chi$, provided the same coefficients are used across the sample.

Hydrogen spectral conversion adds a record-difference test rather than another endpoint normalization. For two admissible hydrogen records $\ell$ and $\ell'$ whose line-inferred cadence stretch agrees after the envelope-gap residual is removed, and whose remaining $\mathcal R_\Gamma$ corrections agree within the stated error budget, the same spectral row must satisfy

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

The minimal shared-delay row passes only if the record difference has no uncompensated $\chi_{\text{sea}}$ component after the fixed $-\ln\xi$ term is included. The [Hydrogen spectral coefficient toy scan](../../../../markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md) describes this discriminant within a constructed scaffold: its clean shared-delay case and density/scale-compensated case test their respective assumed inputs. Their agreement is evidence about those algebraic inputs, not an independent hydrogen or gravitational constitutive result. A universal shared row remains a conjectured consistency requirement.

Pressure-response data supply an additional shared-coefficient consistency condition at retained linear order, with higher-order remainders controlled. Independence requires a pressure record derived or measured separately from the fitted clock row; replaying a constructed scaffold does not supply it. For a nonzero pressure-induced cadence change, let

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

As an illustrative assumed pressure vector, take $\mathbf{a}^{P\to\Gamma}=(0,0.6,0,0)^T$ while the GR-matching shared-delay endpoint has $A_\chi=2$. The minimal endpoint row fixes $b_\chi=1/2$, so the pressure equation gives $0.6b_\chi=0.3$, not one. This is an algebraic incompatibility of the specified toy inputs, not a measured Fe/Cr response or a physical falsification. A broader compensated row remains conditional: it requires branch-derived non-$\chi_{\text{sea}}$ pressure response in $n$, $\lambda$, or $R_{\text{braid}}$, and it must still preserve $S_G=1$ for finite-height and endpoint redshift.

The conditional coefficient disposition is therefore:

| Coefficient | Status |
| --- | --- |
| $a_n$ | Optional in the weak static endpoint; conditionally required only if a branch-derived density response is needed to keep hydrogen or pressure records on one shared row. |
| $a_\lambda$ | Optional in the weak static endpoint; conditionally required only if the envelope-scale branch supplies the compensating record. |
| $a_R$ | Optional in the weak static endpoint; conditionally required only after a declared $R_{\text{braid}}$ readout ties the pressure or spectral record to the same row. |

These constraints alone do not favor zero or nonzero values of $a_n$, $a_\lambda$, or $a_R$. A physical assignment requires branch-derived compensated response rather than adjustable redshift coefficients.

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
\ln\frac{\chi_{\text{sea},\mathrm H}^{(\ell)}}{\chi_{\mathrm{sea},0}},\,
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

The row $\mathbf{b}_{N}^{\mathrm{spec}}$ is not a per-line fit. It is the spectral-channel instance of the same clock-row program above, with $b_\xi=1$ inherited only under the homogeneous Lorentz branch's remainder assumptions and the weak-field scalar combination constrained by gravitational redshift. The residual $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ carries higher-order branch effects such as recoil, hyperfine structure, medium anisotropy, or unresolved source-branch corrections; it must not absorb the basic distinction between $n$, $\chi_{\text{sea}}$, and clock cadence.

For a downward hydrogen transition $a\to b$ with positive envelope gap, the candidate effective spectral conversion is

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

Here $E_{\mathrm{env}}(a)-E_{\mathrm{env}}(b)$ is a candidate assembly-level envelope-energy gap and $h$ is Planck’s constant in observer energy-frequency bookkeeping; neither is an architrino-level premise. The frequency is referred to the declared clock calibration, with propagation and detector conversion separately controlled. A line with an independently bounded event residual gives a line-inferred cadence stretch,

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\left(\nu_{a\to b}^{\mathrm{obs},(\ell)}-\nu_{a\to b}^{\mathrm{res},(\ell)}\right)
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76adf5d3fbc29f32)

The corrected frequency in this denominator must be positive. Its residual uncertainty propagates into $\widehat\Gamma$; setting the residual to zero is a separate toy assumption. Let $\mathcal L_{\mathrm H}^{0}$ be the declared line set, $\varepsilon_\Gamma>0$ a fixed normalization floor, and $\Delta_\Gamma^{\mathrm{tol}}>0$ the chosen tolerance. The first consistency condition is that one $\Gamma_{N,\mathrm H}^{(\ell)}$ from the local Noether sea response controls that set:

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

The first executable scaffold keeps the clock proof burden visible. Its selected toy spectral row is inherited from the density/scale-compensated static-response packet, not fitted from hydrogen lines alone. Its hydrogen records also keep $n$, $\chi_{\text{sea}}$, $\lambda$, $\xi$, and $R_{\text{braid}}$ as separate entries in $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, so a row that matches one line or one record can still fail when the component split changes under admissible refinement. The executable derives the scaffold line factors, observer frequencies, and replay envelope gaps from recovered principal labels plus one shared line-inferred $\ln\Gamma_N$. A completed theory-bearing record must therefore supply the same four inputs together from one declared hydrogen spectral channel ledger and the same Noether sea cell: the hydrogen $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record, envelope gaps, observer frequencies, and static response vector.

---

### Mechanisms for Time Dilation

Two candidate mechanisms describe how motion and medium response can change a clock cadence; neither supplies an evolved clock solution by itself. The prescribed [coincident-axis three-binary braid](../../../../markdown/aaa/noether-braid/3d-braid-assemblies.md#coincident-axis-three-binary-coordinate-chart) candidate — one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense, with independent per-binary radii, axial half-separations, transverse orbit radii, and phases — supplies mechanism intuition for a highly coordinated clock. The proposed clock record below uses a prescribed coincident-midpoint orthogonal-axis braid chart so orientation and per-binary frequency dependence remain separately testable. The two charts are alternative clock candidates.

#### Kinematic Effect (Velocity Dependence)

When the clock has group velocity (center-of-mass convention) $\mathbf{V}_{\text{cm}}$ relative to a local Noether sea drift $\mathbf{u}_{\text{sea}}$, its material group velocity is $\mathbf{w}=\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}}$:

1. **Changed path geometry:** Translation changes the internal paths in absolute timespace and the delayed emission-to-reception geometry. Longer paths imply a longer period only under additional control of site speed and internal geometry; the Master Equation supplies no fixed constituent-speed postulate.

2. **Finite causal speed:** Primitive self-hit and partner-hit roots are mediated by delayed, radial path-history interactions at speed $c_f$. When those roots are dressed into an observer-level clock law, the transverse budget must be formed with the declared channel speed $c_\star$: $c_\star=c_f$ for a primitive branch test and $c_\star=c_{\text{eff}}(\mathbf X,T)$ for a Noether sea dressed clock comparison.

3. **Shape deformation (Lorentz-link hypothesis):** Under the orthogonal-axis three-binary Lorentz-link hypothesis, increased $\|\mathbf{w}\|$ makes the complete braid's **oblate spheroidal exclusion envelope** flatten along the direction of motion:
 - At low $\|\mathbf{w}\|$, the oblate spheroidal exclusion envelope is nearly spherical.
 - As $\|\mathbf{w}\|\to c_\star$, that envelope contracts along $\hat{\mathbf{w}}$ while maintaining transverse dimensions, yielding semiaxes $(R_{\perp}, R_{\perp}, R_{\parallel})$ and $R_{\parallel} < R_{\perp}$.
 - The resulting frequency change must be extracted from the same delayed dynamics; envelope flattening alone does not prove a lower $\omega$.

Geometry terminology follows [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#canonical-geometry-variables): the envelope shape ratio is $\xi=R_{\parallel}/R_{\perp}$. The derived clock-time factor is not defined to be $\xi$; it is the extracted native clock ratio $\omega_{\text{clk}}/\omega_0=d\tau/dT$, followed by division by $J$ for observer export. The homogeneous target $\omega_{\text{clk}}/\omega_0\to\xi\to1/\gamma_\star$ applies directly to the observer rate only in the $J=1$ comparison subclass.

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

This implication is restricted to a clock that does not significantly disturb the local Noether sea and a chart conversion with $J=1$ that preserves the indicated speed ratio. Otherwise it requires the explicit observer conversion. For SI comparison in the weak homogeneous limit, the observer branch uses the measured low-gradient clock/signal speed $c_0=c_{\text{eff}}(\infty)$; converting the native budget to that speed remains part of the recovery obligation.

#### Muon Lifetime Benchmark

Cosmic-ray muons supply an observer-level benchmark for the moving-clock comparison. In the standard account, muons formed high in the atmosphere have a rest-frame mean lifetime near $2.2\,\mu\mathrm{s}$ and travel at a large fraction of $c_0$. Without time dilation, their mean travel distance at nearly $c_0$ would be less than a kilometer. High-altitude and sea-level counts in [Frisch and Smith’s Mount Washington comparison](https://doi.org/10.1119/1.1969508) tested the resulting survival difference. These are external measurement benchmarks, not a derived muon assembly or lifetime in this theory.

In the weak homogeneous observer branch, let $N_{\mathrm{high}}$ and $N_{\mathrm{low}}$ be the counted rates at the high and low detectors, $\Delta h$ their height separation, $\tau_{\mu,0}$ the rest-lifetime comparison value, and $v_{\mu,\mathrm{eff}}>0$ the downward muon speed relative to the detectors in their effective chart. For an ideal vertical monoenergetic beam at constant speed, with matched detector acceptance and negligible energy loss or scattering, the observer-level survival target is
$$
N_{\mathrm{low}}
\approx
N_{\mathrm{high}}
\exp\!\left[
-
\frac{\Delta h/v_{\mu,\mathrm{eff}}}
{\gamma_\mu \tau_{\mu,0}}
\right],
\qquad
\gamma_\mu
=
\frac{1}{\sqrt{1-v_{\mu,\mathrm{eff}}^2/c_0^2}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c56da42f9f4c60a1)

For a real flux comparison, integrate survival over the measured energy and angular distributions and account for detector efficiency and energy loss. The ideal constant-speed event also has an effective rest-chart description using the contracted atmospheric path. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the target is to recover both descriptions from one moving-assembly response. The native burden is to derive the same $\gamma_\mu$ from the assembly and Noether sea record that also supports clocks, rulers, photon synchronization, and bounded preferred-frame leakage.

#### Gravitational Effect (Medium Dependence)

A proposed constitutive response to massive assemblies changes the surrounding Noether sea and clock cadence. The signs and sizes of density, delay, and geometric responses must be extracted; the endpoint coefficient constraint alone does not determine them:

1. **Local Noether density $n(\mathbf X,T)$ (equivalently $\rho_{\text{NS}}$):** A higher density can alter the coupled assembly response, but it does not by definition increase the **Noether sea delay factor** $\chi_{\text{sea}}$. Their relation is constitutive.

2. **Effective field speed reduction $c_{\text{eff}}(\mathbf X,T) < c_f$:**
 - The effective signal or phase response can be slower in this candidate medium branch. Primitive wakes still propagate at $c_f$ in the void and do not scatter as independent substances.
 - The clock response changes through the histories of interacting architrinos, rather than by replacing $c_f$ in the primitive causal-root condition.

3. **Tidal distortion of Noether braid geometry:** An anisotropic medium response can change radial and tangential braid geometry differently. Whether the retained branch compresses, expands, or changes frequency must follow from its delayed dynamics; it is not fixed by the potential gradient alone.

**Gravitational hypothesis:** To first order in the Newtonian potential $\Phi_N(\mathbf X,T)$,
$$
\omega(\Phi_N) \approx \omega_0\left(1 + \frac{\Phi_N}{c_0^2}\right)
\quad \Rightarrow \quad
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{\text{grav}} \approx 1 + \frac{\Phi_N}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-24b2b751b10b3a1a)

This implication uses the $J=1$ static comparison subclass. The sign convention makes $\Phi_N < 0$ (deeper potential) yield **slower** clocks ($d\tau/dt_{\mathrm{eff}} < 1$), consistent with the GR benchmark.

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

Thus $L=1\,\mathrm{mm}$ corresponds to $\Delta\nu/\nu\approx1.1\times10^{-19}$, while $L=33\,\mathrm{cm}$ corresponds to $\Delta\nu/\nu\approx3.6\times10^{-17}$. These are rounded weak-field benchmark estimates at the scales probed by [Bothwell et al.’s millimetre-scale sample](https://arxiv.org/abs/2109.12238) and [Chou et al.’s optical-clock comparison](https://doi.org/10.1126/science.1192720), rather than outputs of an extracted Noether sea clock map. The same constitutive response must describe separated clocks and an extended sample whose lower and upper portions accumulate different derived clock phases.

For independent atoms this can be corrected pointwise, as in ordinary redshift compensation. For entangled or collective clock states, however, assigning the entire apparatus the derived clock time at the trap center is only an approximation. The $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target is to derive the measured clock time from collective phase evolution across the sample, with the center-time prescription emerging only when the gradient-induced phase spread is below the experiment's uncertainty.

A specific guided/free-fall comparison holds one branch in the laboratory while the other falls, as in [Dobkowski et al.’s quantum free-fall interferometer](https://arxiv.org/abs/2502.14535v4). Its cubic phase is a protocol-specific benchmark, not a universal property of atom interferometers. Let $t_{\mathrm{eff}}$ here denote elapsed laboratory-chart time from the declared launch event. The following fit separates a cubic coefficient from the retained control-phase model:
$$
\Delta\phi_{\mathrm{gf}}(t_{\mathrm{eff}})
=
\widehat{\beta}_{T^3}t_{\mathrm{eff}}^3
+\Delta\phi_{\mathrm{ctrl}}(t_{\mathrm{eff}})
+O(t_{\mathrm{eff}}^4)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0077a0ddcb45b39a)

The label $\widehat\beta_{T^3}$ identifies the fitted cubic coefficient, with units of inverse time cubed; it does not denote absolute time in this observer fit. A cubic phase alone does not establish a portable internal-clock readout. This coefficient must be derived from the same weak-field clock and phase map that produces the finite-height redshift benchmark, using the same effective potential record as the other comparison channels.

#### Quantum Clock-Interference Benchmark

Matter-wave interferometers separate two evidential levels. A branch phase shift induced by a gravitational potential can be retained as an effective-potential or gravitational Aharonov-Bohm comparison; by itself it is a phase recovery target, not proof that a portable clock record accumulated different derived times along the branches. Neutron COW-style phase experiments therefore belong on the phase-only side unless the internal degree of freedom itself functions as a clock.

The stronger benchmark appears when an internal degree of freedom is prepared as a clock and remains correlated with the path history. Let the two branch histories $\gamma_1$ and $\gamma_2$ export internal clock states $|\tau_1\rangle$ and $|\tau_2\rangle$ at recombination. For normalized pure internal states, balanced path amplitudes, and ideal recombination with no other loss of coherence, the clock part of the visibility target is
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

Here $\mathcal D_{\mathrm{clk}}$ is the optimal distinguishability of those two pure states with equal prior weights. Unequal path weights, mixed internal states, or other losses require the corresponding density-matrix and apparatus model; the displayed equality is not a general formula for total visibility. Within the stated ideal comparison, distinguishable internal states reduce the clock contribution to visibility. This remains an observer-level recovery target for the same clock map, without promoting branch-dependent time or quantum states to substrate ontology.

#### Combined Dilation

In a region with potential $\Phi_N(\mathbf X,T)$ and clock group velocity $\mathbf{w}$ relative to the Noether sea, we conjecture the observer-chart comparison
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
= \frac{\omega(\mathbf{w},\Phi_N,n)}{\omega_0 J}
\approx \sqrt{1 + \frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}_{\mathrm{eff}}\|^2}{c_0^2}}
$$

[View →](../../../../../equation-mapping.html#weak-field-clock-redshift)

in the weak-field, low-velocity observer limit, with higher-order corrections ($\|\mathbf{w}_{\mathrm{eff}}\|^4/c_0^4$, $\Phi_N^2/c_0^4$, cross-terms) determined by the detailed Noether braid response. Primitive simulations use $c_f=1$ inside the root equation; the PPN comparison uses the dressed asymptotic speed $c_0$.

Outside that limit, neither agreement nor deviation is established here. Strong-field or high-velocity predictions require a derived clock map, its observer export, and comparison with the full GR benchmark in that regime.

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

Here $E_{\mathrm{CM}}$, $p_{\mathrm{CM}}$, and $M_0$ are effective assembly energy, momentum magnitude, and rest mass; $v$ is effective group speed in this locally homogeneous rest chart, and $\gamma_\star=(1-v^2/c_{\mathrm{eff}}^2)^{-1/2}$ uses $c_\star=c_{\mathrm{eff}}$. It is distinct from the scalar PPN spatial-compliance parameter $\gamma_{\mathrm{PPN}}$ and the index-bearing spatial metric family $\gamma_{ij}^{\mathrm{eff}}$. This is a cross-check on the emergent clock model, not an independent axiom at the architrino substrate level. For definitions and interpretation, see [Effective Energy-Momentum Closure](../../../../markdown/aaa/dynamics/energy.md#effective-energy-momentum-closure).

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

The intrinsic polarities are $q_a=\pm\epsilon$, where $\epsilon=|e|/6$ is the declared observer electric-bookkeeping convention rather than a derived charge calibration. The trajectories are $\mathbf X_a(T)$. No per-constituent inertial mass is assigned at the substrate level.

Define pair-separation vectors
$$
\mathbf r_a=\mathbf X_{a+}-\mathbf X_{a-},
\qquad
a\in\{1,2,3\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3c71c57e2ff4abc4)

The binary half-separation radii are $R_a=\|\mathbf r_a\|/2$. The three radii are independently assignable and do not order or relabel the binaries.

For this state to carry the coincident-midpoint orthogonal-axis braid label, its three binary axes must be mutually orthogonal at the near-rest endpoint and converge toward the group-translation direction along the prescribed flattening coordinate $\lambda_A$. For the coincident-midpoint member used here, $h_a=0$ and $\rho_a=R_a$; nonzero axial half-separations belong to the distinct axially separated member. The frequencies $f_a$, phases $\phi_a$, and circulation senses remain explicit prescribed coordinates. This chart does not establish that the clock is retained or stable under EOM solver evolution; failure to preserve the declared coordinate relations on the same evolved record would falsify this clock assignment.

#### Microscopic Evolution Equation (Regularized)

The sharp acceleration law is the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form). For each $a\in\mathcal A$, its [auxiliary dual-mollified regulator](../../../../markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) has the form
$$
\frac{d^2\mathbf X_a}{dT_r^2}(T_r)=
\sum_{b\in\mathcal{A}\cup\mathcal E}
\kappa\,\sigma_{ab}\lvert q_aq_b\rvert
\int_{T_r-h}^{T_r}\!dT_t\;
\frac{\mathbf{r}_{ab}(T_r;T_t)}
{\left(r_{ab}^2(T_r;T_t)+\epsilon_c^2\right)^{3/2}}\,
c_f\delta_\eta\!\big(r_{ab}(T_r;T_t)-c_f(T_r-T_t)\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bb684255f9d3e34a)

$$
\mathbf r_{ab}(T_r;T_t)=\mathbf X_a(T_r)-\mathbf X_b(T_t),
\qquad
r_{ab}=\|\mathbf r_{ab}\|,
\qquad
\hat{\mathbf r}_{ab}=\frac{\mathbf r_{ab}}{r_{ab}}\quad(r_{ab}>0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-285ff9ef24594b59)

Here $\sigma_{ab}=\operatorname{sign}(q_aq_b)$, $\kappa>0$ is the canonical coupling, and $\mathcal E$ is the declared external transmitter inventory supplying the Noether sea and any apparatus background. Taking $\mathcal E=\varnothing$ defines an isolated six-site calculation and cannot test medium-dependent clock response. External histories may be prescribed for a conditional comparison, but then the combined system has not been evolved self-consistently.

The memory duration $0<h<\infty$ truncates the retained history; it is unrelated to Planck’s constant in the spectral section. The mollifier $\delta_\eta$ has unit integral in its length-valued argument, and $\eta>0$ and $\epsilon_c>0$ have units of length. The factor $c_f$ makes the emission-time integral dimensionless apart from the spatial kernel: $[\kappa|q_aq_b|]=\mathrm L^3/\mathrm T^2$ then gives acceleration units. All numerical evaluations use $c_f=1$.

At positive separation and isolated simple roots, the limit $\eta\to0$ gives the transmitter-side weight $c_f/|D_{t,ab}|$, where $D_{t,ab}=c_f-\hat{\mathbf r}_{ab}\cdot\mathbf V_b(T_t)$. Receiver motion enters root playback through $D_{r,ab}/D_{t,ab}$, with $D_{r,ab}=c_f-\hat{\mathbf r}_{ab}\cdot\mathbf V_a(T_r)$; it does not multiply the arriving acceleration. Include all partner, external, and nonzero-delay self roots on the admitted history domain. The zero-delay endpoint is excluded from the sharp law. The softened vector has value zero at coincidence only as an auxiliary kernel, which supplies no physical coincidence continuation.

Finite regulators and finite memory confer no certification. Recovering the sharp law requires complete simple-root coverage, positive separation and transversality margins, boundary clearance, and controlled $\eta\to0$ and $\epsilon_c\to0$ limits; a finite $h$ additionally needs an older-history remainder bound or proof that no omitted contribution exists. Folds, caustics, and coincident root births require their own admissible event treatment. Missing history or an unresolved singular event leaves verification incomplete.

#### Clock Observable and Clock Map

Declare $a_{\mathrm{clk}}\in\{1,2,3\}$ as the clock channel on the source record. Fix an oriented orthonormal basis $\mathbf e_1,\mathbf e_2$ for the declared projection plane. The projected separation must remain nonzero. Define a continuous lifted phase whose value modulo one turn is
$$
\theta_{\mathrm{clk}}(T)\equiv\operatorname{atan2}\!\big(\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_2,\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_1\big)\pmod{2\pi}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-092eb918e6e21bff)

Retain every full turn when constructing this lift. Endpoint principal angles alone lose entire cycles. Sampling must resolve crossings without aliasing; a moving projection basis requires its rotation to be accounted for separately. Choose the phase orientation so the reference cadence is positive. On a window $[T_1,T_2]$ with $T_2>T_1$, define the window-averaged angular frequency
$$
\omega_{\text{clk}}
=
\frac{\theta_{\mathrm{clk}}(T_2)-\theta_{\mathrm{clk}}(T_1)}{T_2-T_1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-250cfa9dfddf7b0e)

For the reference run $(v=0,\Phi_N=0)$, set $\omega_0=\omega_{\text{clk}}^{\text{ref}}$ and define
$$
\frac{\tau(T_2)-\tau(T_1)}{T_2-T_1}\equiv\frac{\omega_{\text{clk}}}{\omega_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7500f56ae93f3cd2)

This is an elapsed-time ratio on the window. The instantaneous law instead uses $d\theta_{\mathrm{clk}}/dT$; the two coincide only for constant cadence or a controlled local-window limit. This native observable is the benchmark preserved by the clock projector in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). For a branch record $\mathcal{B}_{\mathbf X j}^{(T_0)}$, the clock-facing projection keeps only the entries that can change the extracted phase or cadence:

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

1. Uniform native group speed $\|\mathbf w\|$ relative to homogeneous Noether sea, with the declared assembly-center convention. Export to $v=\|d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}\|$ in a stationary comparison chart before a PPN fit.
2. Weak static potential background $\Phi_N(\mathbf X,T)$ (or $U\equiv-\Phi_N>0$).
3. Weak-field regime constraints: $v^2/c_\star^2\ll1$ and $\lvert U\rvert/c_0^2\ll1$.

Use $c_f=1$ in every numerical root calculation. PPN fits use the exported speed $v$, the Newtonian comparison potential $U$, and $c_\star=c_0$ in one static isotropic observer chart with vanishing shift. Hold other independent PPN potentials fixed or subtract their declared contributions. In this fit only, $\omega_j$ denotes the exported phase rate $\Delta\theta/\Delta t_{\mathrm{eff}}$, obtained from the native rate and the chart conversion; it is not the raw $T$-frequency. Reference normalization keeps $J_0=1$.

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

For this coefficient map, use only the exported PPN comparison variables declared above. Fits to raw native rates remain native diagnostics and do not determine PPN coefficients.

Linearize each trajectory as $\mathbf X_a(T)=\mathbf X_a^{(0)}(T)+\delta\mathbf X_a(T)$ around the periodic rest solution — conditional on a certified rest attractor supplying $\mathbf X_a^{(0)}$, which the retention disclaimer above records as not yet established — and expand the extracted clock ratio in
$$
\epsilon_U\equiv U/c_0^2,\qquad \epsilon_v\equiv v^2/c_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-64e8f8cdf1803ebd)

Conditional on smooth response about the stated admitted background, use the regression model
$$
\frac{\omega}{\omega_0}
=
1-A_U\,\epsilon_U-A_v\,\epsilon_v
+C_2\,\epsilon_U^2
+C_{Uv}\,\epsilon_U\epsilon_v
+C_{v4}\,\epsilon_v^2
+\mathcal{O}\!\left((|\epsilon_U|+|\epsilon_v|)^3\right)
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

Take $W=\operatorname{diag}(w_j)$ with positive weights, require $N>5$ and full column rank of $X$, and check conditioning over independently varied potential and speed. The following estimated covariance applies only under zero-mean residuals with $\operatorname{Cov}(\boldsymbol\varepsilon)=s^2W^{-1}$ and a valid quadratic response model; correlated errors, uncertain reference rates, and truncation bias require their own covariance or bias treatment:
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

and, in the isolated static subclass of [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), with $U=-\Phi_N$ and other independent potentials controlled, the PPN map is
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e5bfad1ca3c32ec2)

So the GR target $\beta_{\mathrm{PPN}}=1$ implies
$$
C_2^\star=\frac{1}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3b615016e360844f)

The raw mixed coefficient is not a zero-target leakage diagnostic. In the static isotropic comparison metric, $g_{00}^{\mathrm{eff}}=-1+2\epsilon_U-2\beta_{\mathrm{PPN}}\epsilon_U^2$ and $g_{ij}^{\mathrm{eff}}=(1+2\gamma_{\mathrm{PPN}}\epsilon_U)\delta_{ij}$ to the retained orders, with $g_{0i}^{\mathrm{eff}}=0$. These are observer-level [PPN benchmark coefficients](https://doi.org/10.12942/lrr-2014-4), not substrate premises. Substitution in the clock interval gives the radicand $1-2\epsilon_U-\epsilon_v+2\beta_{\mathrm{PPN}}\epsilon_U^2-2\gamma_{\mathrm{PPN}}\epsilon_U\epsilon_v$. Using $\sqrt{1+s}=1+s/2-s^2/8+O(s^3)$ therefore yields $C_2=\beta_{\mathrm{PPN}}-1/2$, $C_{Uv}=-(\gamma_{\mathrm{PPN}}+1/2)$, and $C_{v4}=-1/8$. For the GR comparison, $C_{Uv}^{\star}=-3/2$. Deviations must be measured relative to this chart-specific target; a nonzero mixed coefficient is not by itself preferred-frame leakage.

Execution protocols, benchmark catalogs, and numeric pass/fail thresholds are routed through:

1. [Validation Protocols](../../../../markdown/aaa/validation/validation-protocols.md)
2. [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md)
3. [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md)
4. [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md)

---

### Failure Conditions and Red Flags

The following observations would reject the tested clock-recovery claim when the same admitted branch, observer map, apparatus conditions, and uncertainty budget are held fixed. Failure of a prescribed or uncertified clock candidate alone does not reject all clock realizations:

1. **Incorrect velocity dependence:**
 - If $P_q(\mathbf w)$ cannot be made to fit $\propto \gamma_\star(\mathbf w)$ without fine-tuning internal clock geometry or Noether sea parameters.

2. **Wrong sign or magnitude of gravitational dilation:**
 - In the matched weak static comparison, clocks at more negative $\Phi_N$ must tick slower after transport and environmental shifts are controlled. A resolved opposite sign or magnitude mismatch rejects that recovery claim.

3. **Directional anisotropy:**
 - If the exported clock or resonator observable has an orientation-dependent residual exceeding its experiment-specific bound, the proposed Lorentz recovery fails in that channel. Native directional dependence alone is insufficient; compare the calibrated modulation and nuisance model in the [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md), rather than apply one universal sidereal threshold.

4. **Clock-dependence:**
 - If different reasonable clock designs (different internal assemblies) yield different $d\tau/dt_{\mathrm{eff}}$ at the same $(v,\Phi_N)$ beyond experimental bounds, the emergent Equivalence Principle fails.

5. **Parameter bloat:**
 - If matching these effects requires separately adjustable medium profiles or transport coefficients, the proposed shared constitutive explanation remains unestablished. Record which quantities are derived and which are fitted in the [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md); parameter count alone supplies no numerical naturalness verdict.

---

**Chapter target:** A concrete definition of **how** to compute $\omega(\mathbf{w},\Phi_{\text{eff}},n)$ for a Noether braid clock, and a clear native expression for $d\tau/dT$ plus its observer-chart projection $d\tau/dt_{\mathrm{eff}}$ in terms of those quantities.

#### Closure Program Interface (clock-to-PPN bridge)

This chapter defines a candidate coefficient bridge between microscopic clock dynamics and PPN observables. It reports no fitted coefficients from an accepted evolved clock.

The clock-to-PPN closure checklist is:

1. Define a reference clock assembly and extraction window for $\omega_0$.
2. Run controlled perturbations over $(U_j,v_j)$ in the weak-field, low-velocity regime.
3. Fit $(A_U,A_v,C_2,C_{Uv},C_{v4})$ from the extracted clock ratios.
4. Compare $\hat\beta_{\mathrm{PPN}}$ and $\hat C_{Uv}$ with their declared PPN targets and retain the chart, potential, and covariance assumptions.
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
\mathbf{q}_\star=(1,\tfrac12,1,-\tfrac32)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea9b593a97e8f0b1)

Here $\Sigma_q$ is the propagated covariance of the four fitted comparison quantities; it must be positive definite, or the statistic must be restricted to its independently supported subspace. A low quadratic discrepancy is a goodness-of-fit diagnostic only under its declared error model and threshold. It does not establish a retained clock, constitutive response, independence of the evidence, complete Lorentz or metric recovery, solver certification, or empirical acceptance. The remaining physical obligation is one admitted history that produces the clock, ruler, and signal records together and survives the stated falsifiers.

## Lorentz Kinematics

This chapter is the focused program statement for deriving operational Lorentz behavior from delayed substrate dynamics. The substrate has [absolute time](../../../../markdown/aaa/foundations/absolute-time.md), a universal ordering parameter, and a [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md), the fixed flat spatial container. An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a polarity-bearing point transceiver whose continuously emitted causal wake expands from each emission site at finite speed. A causal root identifies a past emission whose wake reaches a receiver now; the retained path history supplies all such contributions. Lorentz behavior is the observer-level requirement that moving clocks, rulers, and signals reproduce special-relativistic timing and length comparisons. Recovering it from these primitives remains open. The purpose of this chapter is to make that required compensation law explicit, distinguish the closure target from any already-proved result, and organize the derivation path from microdynamics to measurable clock-and-ruler behavior.

The opening abstract states the target; the later sections move through the governing delayed dynamics, the anisotropy mechanism, and the conditions under which assembly-built observers could recover standard Lorentz kinematics.

The reader should keep four moving pieces distinct. The substrate has a preferred rest frame. A moving assembly can deform and retune. Physical Observers synchronize clocks and rulers using assemblies and signals. A [Physical Observer](../../../../markdown/aaa/spacetime/observer-framework.md) is an assembly-based apparatus with finite accessible records; precision experiments constrain those records after clock, ruler, and signal calibration. Lorentz recovery succeeds only if the same retained branch hides the first piece from the fourth by controlling the middle two.

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

The target includes bounded preferred-frame leakage, meaning observable dependence on motion relative to the substrate rest frame.

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
3. Finite primitive wake propagation speed $c_f$ in the Euclidean void. The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), a population of neutral assemblies, supplies a separate effective response; it is not the carrier required for the primitive wake law.

To match modern precision constraints, operational observers made from bound assemblies must infer effective Lorentz kinematics even though the substrate itself is not Minkowskian at the fundamental level. We call this required dynamical compensation the Lorentzian conspiracy.

Michelson-Morley-type null experiments make this a quantitative acceptance condition, not a philosophical preference. The framework may keep a Euclidean-void rest frame only if the two-way signal residual later written as $\Delta_{\text{tw}}(\beta_\star,\theta)$ is generated by the same branch record that retunes material arms and clocks, and remains $O(\epsilon_{\text{LV}})$ across the tested orientations. A cancellation achieved by separately fitting photon speed, clock rate, and ruler length would be a fit, not Lorentz closure.

The closure target is two-way operational isotropy, not one-way substrate isotropy. The primitive wake speed is isotropic in the absolute frame. A dressed photon channel can have directional response, while unequal travel times to moving endpoints occur even for isotropic propagation. An embedded observer's assigned one-way speed also depends on distant-clock synchronization; these are distinct effects. The required theorem is that the assembly-clock synchronization map absorbs the residual one-way anisotropy while the measurable round-trip diagnostic $\Delta_{\text{tw}}$ and the boost-dependent and clock-isotropy rows remain below their declared leakage bounds.

This makes synchronization reabsorption a dynamical export, not a convention chosen after the fact. Let $\mathcal{S}_{\mathrm{asm}}$ denote the synchronization convention physically realized by assembly clocks, rulers, and signal channels. Einstein synchrony assigns a remote clock the midpoint of an out-and-back signal time. A successful export must reproduce the tested records in that convention and their convention-independent comparisons. Reichenbach-style freedom means an alternative assignment of the two one-way durations with the same round trip; it does not itself establish or violate a physical leakage bound. If an apparatus can extract the absolute-frame anisotropy by comparing assembly clocks, signal timing, or calibration loops, the preferred-frame leakage wall has failed even if a two-way Michelson-Morley row is small.

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

This residual is evaluated in a calibrated homogeneous reference cell with the rest clock rate set to one. Zero gradients alone do not fix a constant clock offset. Time-dilation comparisons constrain it only after the apparatus response and calibration have been supplied. The weak-field potential-sector residual is
$$
R_{\tau\Phi}
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\beta_{\text{eff}}=0}
-\left(1+\frac{\Phi_{\text{eff}}}{c_{\text{eff}}^2}+O\!\left(\frac{\Phi_{\text{eff}}^2}{c_{\text{eff}}^4}\right)\right),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd577de44234840b)

Here $\Phi_{\mathrm{eff}}$ has units of speed squared, vanishes at the selected reference, and is negative in the attractive-potential comparison. The first-order term is a gravitational-redshift recovery target; the omitted second-order term requires its own bound before a quantitative residual is reported. Parameterized post-Newtonian (PPN) comparisons organize small corrections to clock rates, curvature, and trajectories in weak gravity. Equivalence-principle recovery requires $R_{\tau v}$ and $R_{\tau\Phi}$ to come from the same Noether sea response and assembly-clock map.

Dependence on absolute velocity in a declared observer experiment must remain within that experiment's calibrated leakage bound; the target is not an exact theorem forbidding every possible inference of the preferred frame. In the accepted export, any dependence on absolute $v$ must be absorbed into nonseparable combinations of assembly-clock synchronization, ruler response, and signal-channel calibration, so Physical Observers recover Lorentz-invariant records rather than a direct preferred-frame speed meter.

#### Mathematical objective

Given a translating bound assembly, first for one binary and then for the prescribed coincident-midpoint orthogonal-axis braid chart, derive:

Here `coincident-midpoint orthogonal-axis braid` means one complete orthogonal-axis three-binary braid with persistent binary indices $a\in\{1,2,3\}$, independently assignable positive radii $R_a$ and frequencies $f_a$, mutually orthogonal binary axes at $\lambda_A=0$, and axes converging toward the group-translation direction as $\lambda_A\to1$. Axial half-separations, transverse orbit radii, phases, and circulation remain explicit binary coordinates. The label supplies no Lorentz law, retained branch, hierarchy, particle assignment, or stability result; those are the theorem targets below, falsified if same-record evolution fails the coordinate or observer-residual gates.

1. The velocity-dependent equilibrium shape tensor $Q(v)$ and its anisotropy.
2. The velocity-dependent internal period $P(v)$.
3. Conditions under which $(Q(v),P(v))$ produce effective Lorentz ruler and clock laws.
4. Residual non-Lorentz terms and their scaling.

### Governing Microdynamics

#### Causal path-history interaction form

For architrino labels $i,j\in\{1,\dots,N\}$ with positions $\mathbf X_i(T)$, let $\mathcal R_{ij}(T)$ contain every admitted positive-delay root in the declared history domain. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) gives the acceleration-first branch sum:
$$
\frac{d^2\mathbf X_i}{dT^2}
=
\sum_{j\neq i}\sum_{m\in\mathcal R_{ij}(T)}
\mathbf A_{i\leftarrow j}\!\left(
\mathbf X_i(T),
\mathbf X_j(T-\Delta_{ij,m}(T)),
\mathbf V_j(T-\Delta_{ij,m}(T))
\right)
+
\mathbf A^{\mathrm{self}}_i(T).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8267bcb50764beae)

with causal delay
$$
\Delta_{ij,m}(T)=\frac{\|\mathbf X_i(T)-\mathbf X_j(T-\Delta_{ij,m}(T))\|}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6f92c08eca343433)

Here $m$ labels one causal root, and each per-hit acceleration uses $W^{\mathrm{acc}}=c_f/|D_t|$ with $D_t=c_f-\mathbf V_j(T-\Delta_{ij,m})\cdot\hat{\mathbf r}$; the unit vector $\hat{\mathbf r}$ points from the emission site to the receiver. The self term sums all admitted positive-delay roots with $j=i$. Both partner and self contributions depend on history. Simple-root evaluation requires positive separation and a nonzero transmitter-side derivative; folds and coincidence require their separately controlled continuation. Missing roots or unbounded omitted history leave the sum unresolved.

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
\hat{d}_{ij}(s)=\frac{1}{\chi_{\mathrm{dd}}}\left\|
\boldsymbol{\rho}_i(s)-\boldsymbol{\rho}_j\!\left(s-\hat{d}_{ij}(s)\right)
+\chi_{\mathrm{dd}}\beta_f\,\hat{\mathbf{e}}_{\parallel}\hat{d}_{ij}(s)
\right\|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0806349b1035aea0)

with $\hat{d}_{ij}\equiv \Delta_{ij,m}/P_0$. Here the local $\hat d$ symbol denotes a dimensionless delay, with root index $m$ suppressed; it is not proper time. The $\mathrm{dd}$ subscript marks a delay scale for group motion, not the Noether sea delay factor $\chi_{\text{sea}}$ or the effective coordinate map $\chi_{\mathrm{eff}}$.

Let $\boldsymbol{\rho}^\star(s;\beta_f)$ be a $P_s(\beta_f)$-periodic translating attractor, where $P_s(\beta_f)=P(c_f\beta_f)/P_0$ is the period in the rescaled time $s$. Conditional on a dynamically realized periodic solution with a complete finite simple-root inventory and differentiable history dependence, linearization has the schematic delay-Floquet form
$$
\delta\dot{\mathbf{y}}(s)=A_0(s;\beta_f)\,\delta\mathbf{y}(s)+\sum_{n=1}^{N_d}A_n(s;\beta_f)\,\delta\mathbf{y}\!\left(s-\hat{d}_n^\star(s)\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec19d9e83c85f1da)

where $\mathbf{y}$ stacks relative positions and velocities, the dot differentiates in $s$, and the matrices include derivatives of the state-dependent root delays. Differentiating a delayed state supplies both its history variation and the change induced by its moving emission time. A finite sum does not cover an unresolved infinite root inventory or a distributed-memory regulator without additional analysis. Floquet multipliers measure perturbation growth over one period; this construction must follow verification of the actual periodic acceleration balance. Kinematic closure requires:

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

Here $P_u$ is the cycle period of the translating binary at group speed $u$, and $\boldsymbol{\rho}_u$ is periodic on the retained branch chart. This is not a Lorentz boost of coordinates. It is a direct absolute-time branch ansatz inserted into the delayed root equation.

Choose the uniform time phase $\theta(T)=\Omega_uT+\theta_0$, with all nonuniform motion carried by the periodic shape $\boldsymbol\rho_u$. For a root emitted by constituent $\sigma'$ and received by constituent $\sigma$, the delay $\Delta>0$ must solve
$$
G_{\sigma\sigma'}(\Delta;\theta,u)
\equiv
\left\|
u\Delta\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta)
-
\sigma'\,\boldsymbol{\rho}_u(\theta-\Omega_u\Delta)
\right\|
-c_f\Delta
=0,
\qquad
\Omega_u\equiv\frac{2\pi}{P_u}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba53d034fed07019)

The branch Jacobian is
$$
J_{\sigma\sigma'}(\Delta;\theta,u)
=
1-
\frac{
\left(
u\hat{\mathbf e}
+
\sigma'\Omega_u\boldsymbol{\rho}'_u(\theta-\Omega_u\Delta)
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

in the planar orientation where the group-velocity direction lies in the binary plane. The cycle norm is the root-mean-square norm over the uniform time phase. This shape residual tests the particular phase-parameterized ellipse shown, a stronger condition than the axis-ratio and period tests alone. A nonzero value may indicate phase nonuniformity rather than failure of Lorentz clock/ruler recovery. A clean result for this prescribed comparison has $\mathcal{R}_{\mathrm{bin}}=0$ or a controlled residual traceable to named branch-ledger features. A nonzero residual is not a rhetorical failure; it is the first foundation-level pressure on the Lorentz-closure program, because the binary is the first available internal clock and ruler.

> Claim grade: guessed for physical realization; the residual triple is a definition. This chapter supplies no evolved value. A prescribed or algebraically deformed history supplies no missing branch evidence. Falsifier for the proposed binary recovery: a complete evolved branch whose controlled residual exceeds the declared bound.

#### Exact substrate symmetries and delay currents

An action-based route is an additional, unproved construction. The following schematic functional leaves the surface measure $d^2\sigma$, the integration support $\Sigma_{ij}$, and the history kernel $\mathcal L_{\mathrm{int}}$ to be specified; it is not a generating action for the Master Equation:
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

These are universal-weight bookkeeping proxies for a delayed-Noether closure target. Noether's method derives conserved history charges from a symmetry-preserving action only when that action generates the motion and its boundary flux is controlled. The [Master Equation's action-variation obstruction](../../../../markdown/aaa/dynamics/master-equation.md#candidate-nonlocal-lagrangian-and-its-variation-obstruction) leaves that premise open, including ordered transmitter/receiver variations and self-history. Constant group velocity and a bounded periodic or quasi-periodic relative solution are separate dynamical obligations; neither follows from a closed conservation account alone.

### Emergent Kinematics from Delay Anisotropy

#### Directional delay asymmetry

For prescribed non-orbiting endpoints with fixed co-moving separation $\mathbf r=r\,\hat{\mathbf n}$ and common constant group velocity $\mathbf V=v\,\hat{\mathbf e}_{\parallel}$, causal-delay closure satisfies
$$
\Delta=\frac{\|\mathbf r+\mathbf V\Delta\|}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4dcb61d581ce4ea)

This subsection is deliberately a $c_f$ branch-chart calculation. For operational clock, ruler, or photon tests, repeat the same budget with the declared $c_\star$ after Noether sea dressing. With $\mu\equiv \hat{\mathbf{n}}\cdot\hat{\mathbf{e}}_{\parallel}$ and $\beta_f=v/c_f$, the positive delays for the two opposite ordered directions, $+\mathbf r$ and $-\mathbf r$, are
$$
\Delta_{\pm}(r,\mu;\beta_f)
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta_f^2(1-\mu^2)}\pm \beta_f\mu}{1-\beta_f^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4df24a5f5ea6755c)

Special orientations recover standard forms:
$$
\mu=1:\quad
\Delta_{+}=\frac{r}{c_f-v}\qquad
\Delta_{-}=\frac{r}{c_f+v}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eaad26459c830d80)

$$
\mu=0:\quad
\Delta_{+}=\Delta_{-}=\frac{r}{\sqrt{c_f^2-v^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b83b297c43f997e7)

The symmetric delay channel and associated causal-rate proxy are
$$
\bar{\Delta}(\mu;\beta_f)\equiv \frac{\Delta_{+}+\Delta_{-}}{2}
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta_f^2(1-\mu^2)}}{1-\beta_f^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7495836f8d467977)

$$
\nu(\mu;\beta_f)\equiv \frac{1}{\bar{\Delta}(\mu;\beta_f)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3704ed64dd4e3553)

For nonzero $\beta_f$, the directional dependence of $\bar{\Delta}$ establishes anisotropic delay geometry. It does not by itself derive an effective stiffness. A proposed response can have
$$
K_{\parallel}(v)\neq K_{\perp}(v)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9cec1d608758a704)

#### Weak-velocity expansion to $O(\beta_f^4)$

Direct expansion of the symmetric lag gives
$$
\bar{\Delta}(\mu;\beta_f)=\frac{r}{c_f}\left[
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
\mu=1:\ \bar{\Delta}=\frac{r}{c_f}\gamma_f^2,\ \nu=\frac{c_f}{r}(1-\beta_f^2)
\qquad
\mu=0:\ \bar{\Delta}=\frac{r}{c_f}\gamma_f,\ \nu=\frac{c_f}{r}\frac{1}{\gamma_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff4f1250f1d24fc6)

#### Closed-return derivation of the Lorentz axis ratio

The one-way roots above expose the preferred branch chart. They are not yet an observer-facing Lorentz law, because a physical clock or ruler is not made from a single one-way leg. The periodic material benchmark asks whether the relevant causal wakes return to compatible phases; more general persistent motion need not be a single closed cycle. The primitive Lorentz-geometry object is therefore a closed return cycle.

Use the declared channel speed $c_\star$ for the closure problem under consideration, with
$$
\beta_\star\equiv\frac{v}{c_\star}
\qquad
\gamma_\star\equiv\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0c4f8895089b14c8)

The following fixed-endpoint calculation assumes an isotropic homogeneous propagation chart in which $v$, $c_\star$, and the lengths are expressed consistently. It is a primitive calculation only when that chart is $(T,\mathbf X)$ and $c_\star=c_f$; a dressed channel requires its own transport and coordinate map. The symbols $t_+,t_-$ below denote coordinate flight durations in the declared chart. Take $R_{\parallel}$ to be the semiaxis along group velocity and $R_{\perp}$ to be a transverse semiaxis. A longitudinal return cycle has unequal forward and rear legs,
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

This is the direct map from Lorentz kinematics to Noether braid geometry. In local co-moving spatial displacement coordinates $x_{\perp,1},x_{\perp,2},x_\parallel$ of that same chart, the proposed oblate spheroidal envelope for an admitted branch $q$ can be written
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
G_{-+}(\Delta_1;\theta_1+\Omega_u\Delta_1,u)=0,
\qquad
G_{+-}(\Delta_2;\theta_1+\Omega_u(\Delta_1+\Delta_2),u)=0,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3516bf94e69f37bf)

Here $\theta_1$ is the first emission phase, $\Delta_1,\Delta_2>0$ are successive flight durations, and $G$ is evaluated at each reception phase. The itinerary additionally requires a declared integer phase return, both transmitter-side weights, and the same evolved branch shape in both equations. The scalar reduction above is exact only for fixed, non-orbiting, co-moving endpoints. On an orbiting binary, residual phase dependence after optimizing the period falsifies it as an exact reduction of that itinerary. The simple round trip works exactly only when its endpoints do not orbit. A binary must close two actual delayed hits on the same evolved orbit.

> Claim grade: derived for the fixed-endpoint, single-speed selection rule, conditional on orientation independence and positive axial scale. Falsifier: unequal orientation coefficients after substituting the selected scale into the displayed return time. Applying it to an orbiting binary remains open until its two-root itinerary reduces to the same expression; this is not existence or stability evidence.

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

Here $P_{\parallel}$ is the closed signal-cycle period parallel to the assembly group velocity. For fixed $R_\perp=R_0$ and the same constant channel speed, the reference period is $P_0=2R_0/c_\star$, so $P_\parallel/P_0=\gamma_\star$. If the transverse scale changes, the ratio instead includes $R_\perp(v)/R_0$. The following endpoint limits assume a fixed positive $R_\perp$ as $\beta_\star\to1$; they are not uniform bounds for a changing scale. The forward leg is
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

This chapter supplies no evolved confirmation of the ruler law. The prescribed translating-family prediction — that the moving branch's shape ratio $\xi(u)/\xi(0)$ should approach $1/\gamma_f(u)$ — remains a closure target of the delayed acceleration law, not a measured result. The actual branch may deform internally, and confirmation requires evolving it directly under the master equation and measuring the relative-periodic envelope it settles to. Whether the contracted branch is an attracting solution of the moving delay dynamics is the same open question stated above; it is not answered here.

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

Here $u_{\mathrm{eff}}$ and $u'$ are collinear velocities measured in two effective observer charts, and $v$ is their relative effective velocity; it is not an unconverted substrate speed. For the effective mass-shell and photon-channel tests, use
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

Here $m_q$ is the observer-sector inertial response assigned to the admitted branch, and $R_\gamma^{(q)}$ is evaluated only after the photon channel has been declared. Here $E_q,\mathbf p_q$ and $E_\gamma,\mathbf p_\gamma$ are separately derived observer energy and momentum entries. The residuals have different units: speed for $R_u$, energy squared for $R_{E\mathbf p}$, and energy for $R_\gamma$. Each needs a declared scale and tolerance; the tuple has no unweighted scalar error norm. The same causal-root ledger, medium dressing map, and branch state must feed all components. A branch that fits clock slowing with one ledger, ruler contraction with another, and photon propagation with an independent channel has not closed Lorentz behavior; it has only matched isolated formulas.

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

This equal-weight geometric convention is fixed before closure. It prevents the extracted shape residual from changing when an observer-level inertial-response convention is later assigned to the admitted assembly branch. Define $q_\parallel=\hat{\mathbf e}_\parallel^\top Q\hat{\mathbf e}_\parallel$ and $q_\perp=[\operatorname{tr}Q-q_\parallel]/2$ by projection along the declared group-velocity direction and its transverse plane. These are directional second moments, not automatically eigenvalues. The cycle average is the uniform absolute-time integral over one complete period divided by that period; a phase average requires its time weight. With positive reference moments at the same excitation, medium state, and orientation, define rest-normalized effective extents using one reference length $a_0>0$:
$$
a_{\parallel,q}(v)\equiv a_0\sqrt{\frac{q_{\parallel}(v)}{q_{\parallel}(0)}}\qquad
a_{\perp,q}(v)\equiv a_0\sqrt{\frac{q_{\perp}(v)}{q_{\perp}(0)}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a21567ec8416b496)

These extents measure deformation from the rest shape; they are not literal envelope semiaxes without a shape-to-envelope map. A planar circle has unequal longitudinal and transverse-plane mean moments even at rest, which is why the normalization is necessary. If either reference moment vanishes, use a separately declared nondegenerate ruler observable. The moving-assembly contraction residual is
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

As an unproved reduced response ansatz on an admitted attracting manifold, use principal-frame quadratic closure
$$
U_{\text{eff}}=\frac{1}{2}K_{\parallel}(v)\,r_{\parallel}^2+\frac{1}{2}K_{\perp}(v)\left(r_{\perp,1}^2+r_{\perp,2}^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-673701ca98f1da53)

Notation guardrail: in this chapter, $U_{\text{eff}}$ denotes a candidate specific potential, with units of length squared per time squared, on the translating attractor; multiplication by the optional common conversion $\mu_{\mathrm{arch}}$ gives energy bookkeeping. Its generation of the reduced motion remains unproved. It is distinct from the positive weak-field PPN variables $U$ and $U_{\Phi}$ used in [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md). Do not identify a fixed-energy shell with a fixed-action shell. For positive stiffnesses, a shared reference normalization, and the same transverse degeneracy assumed by this quadratic ansatz, parameterize the rest-normalized amplitude response by
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

A proposed surface-integral representation for coefficient matching is the following trial specific potential on a translating attractor $\boldsymbol{\rho}^\star(s;\beta_f)$:
$$
\mathcal{U}_{ij}(T;\beta_f)\equiv
\int_{\Sigma_{ij}^{\text{wake}}(T)}
\frac{\kappa\,\epsilon^2}{\|\mathbf X_i(T)-\mathbf X_j(T-\Delta)\|^2}\,
W_{ij}(T,\sigma;\eta)\,d^2\sigma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dee13ca97e3ce65d)

Here $\Sigma_{ij}^{\text{wake}}$ is a proposed two-dimensional integration support, $d^2\sigma$ its area measure, and $W_{ij}$ an unestablished signed surface-density weight with units of inverse length; $\eta>0$ is a width. This weight is not the dimensionless transmitter acceleration factor $W^{\mathrm{acc}}$. Neither the measure nor its relation to the Master Equation is supplied by this ansatz. A complete pair term must incorporate both ordered histories with their polarity and normalization, and a full potential must also retain admitted self-history and boundary/medium terms. Conditional on such a construction, set
$$
U_{\text{eff}}(T;\beta_f)\equiv \sum_{i<j}\mathcal{U}_{ij}(T;\beta_f)+U_{\mathrm{self}}+U_{\mathrm{boundary/medium}}
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

For a model with no additional dimensional scale, a dimensionally consistent stiffness factorization is
$$
K_i(\beta_f)=\frac{\kappa\,\epsilon^2}{a_0^3}\,\mathcal{I}_i(\beta_f,\chi_{\mathrm{dd}},\eta/a_0,\dots)
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

The derivatives require a smooth, velocity-reversal-symmetric response on a fixed chart, nonzero reference stiffness, and controlled differentiation through the history and averaging operations. Subject to these unproved response assumptions, the Lorentz-matching constraints in [Quadratic Closure and Coefficient Constraints](#quadratic-closure-and-coefficient-constraints) and [Clock-Channel Expansion and Minimal Closure Solution](#clock-channel-expansion-and-minimal-closure-solution) become explicit derivative identities on $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ evaluated on the delay-Floquet attractor.

#### Period renormalization

For a primitive branch comparison, let $P_q(v)$ be the absolute-time period and use $c_\star=c_f$. For a dressed observer comparison, use the period measured in $t_{\mathrm{eff}}$ and its reference period, with the map from $T$ declared. If the counted phase defines $d\tau/dT=\omega_T/\omega_{T,0}$, then $d\tau/dt_{\mathrm{eff}}=(\omega_T/\omega_{T,0})/(dt_{\mathrm{eff}}/dT)$ along the clock path. An absolute-time period ratio alone does not fix this observer rate. With the time coordinate and reference held consistent, the clock retuning residual is
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

The following is a guessed selected-channel update, not a general consequence of positive energy uptake. The absorbed energy, its direction, internal excitation, and any exchange account must be derived together. A symmetric incoming preparation can change internal energy with no group-speed increase; discrete frequency steps require a retained transition mechanism. For a candidate reduced assembly state
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

1. Assembly group-speed increase $\Delta v_{\text{tr}}>0$ in the hypothesized selected channel; its sign is not fixed by $\Delta E_q>0$ alone.
2. Discrete frequency retuning of binaries $1,2,3$: $\Delta f_k=n_k\,\delta f_k$, with $n_k\in\mathbb{Z}$ and $k\in\{1,2,3\}$.
3. Coincident-midpoint orthogonal-axis braid axis realignment: $\Delta\mathbf{A}\neq 0$ (precession/tilt of principal axes).
4. Exclusion-zone geometry shift: $\Delta\mathcal{E}_{\text{excl}}\neq 0$ (shape and orientation update).
5. Operational time response shift: $\Delta\tau_{\text{op}}\neq 0$.

#### Open mapping: observer-level time dilation in $\mathbb{A}\mathbb{A}\mathbb{A}$

The observer-level clock-dilation channel is not yet fully mapped in substrate variables. The working interpretation in this document is:
$$
\tau_{\text{op}}=\tau_{\text{op}}[f_1,f_2,f_3,\mathbf{A},\mathcal{E}_{\text{excl}},v_{\text{tr}};\mathcal H_{[T_0,T]},\tau_0]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8c1c0e485237d9a)

Here $v_{\mathrm{tr}}$ is assembly group speed, $f_a$ are internal frequencies, $\mathbf A$ denotes the tuple of circulation-axis directions in this scenario, and $\mathcal E_{\mathrm{excl}}$ denotes the proposed exclusion geometry. The $\tau_{\mathrm{op}}$ expression is a candidate functional of the retained history $\mathcal H_{[T_0,T]}$ from initial epoch $T_0$ to $T$, initial clock reading $\tau_0$, and these state variables; an instantaneous tuple cannot determine accumulated time. The map is provisional and is falsified by same-input histories with distinct clock responses unless the missing history is retained.

The immediate task is to identify which subset dominates $\partial \tau_{\text{op}}/\partial E$ in the passerby-transfer regime, with the default prior that binary-3-mediated updates are first-order.

#### Evolving scenario: exclusion-volume driven effective spacetime

Working assumption:

1. In the working source record, binary 3 defines the effective exclusion-volume boundary; see [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). This is a provisional branch role, not a taxonomy identity.
2. Each coincident-midpoint orthogonal-axis braid binary ($1,2,3$) has its own circulation axis.
3. Momentum and angular-momentum balance are effective recovery obligations, including the wake, medium, and boundary exchange terms. They are not established conservation laws for this proposed update.

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

with the lengths and group speed first mapped into the same chart, and $c_\star=c_{\text{eff}}$ for Noether sea dressed clock/ruler closure and $c_\star=c_f$ only for a primitive branch-chart calculation. For the scale channel, use
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

Here $x$ abbreviates an explicitly declared effective event $x_{\mathrm{eff}}^\mu$; native records must first be projected through $\chi_{\mathrm{eff}}$. Together with normalized local assembly density $n(x)$ (with $\rho_{\text{NS}}(x)=\rho_{\text{NS},0}n(x)$) and preferred-frame flow/orientation $\hat{u}(x)$, these define a candidate reduced handoff tuple
$$
(\xi,\lambda,n,\hat{u})_x
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f7c400e9e3e03c88)

for constructing effective kinematic and metric responses. This tuple is not proved sufficient: the population measure, orientation distribution, excitation and history statistics, and response maps must be supplied from the retained medium record. Two populations with this same tuple but distinct clock or signal responses would falsify its sufficiency. The kinematic closure requirement is that observer-built rods/clocks from this Noether sea recover Lorentz-consistent operational laws to bounded leakage.

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

The inverse follows algebraically for $\Omega>0$ and $\xi>0$. Identifying the metric's medium-state scalar with a braid shape ratio remains a guessed constitutive ansatz, not a consequence of microscopic shape closure. A single metric at a fixed event cannot change merely because a test clock has a different group velocity; population response and the geometry-to-clock map must establish any such identification. The $\xi\to0$ boundary is degenerate and is excluded from the inverse formula.

In the local Noether sea rest frame ($\hat{u}^\mu=(1,0,0,0)$), with observer-sector coordinate $x_{\mathrm{eff}}^0=c_0 t_{\mathrm{eff}}$:
$$
ds_{\text{eff}}^2=g_{\mu\nu}^{\text{eff}}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu
=-\Omega^{2}\xi^{2}(dx_{\mathrm{eff}}^0)^2+\gamma_{ij}^{\mathrm{eff}}dx_{\mathrm{eff}}^i dx_{\mathrm{eff}}^j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff226f3054cc996d)

Here $\gamma_{ij}^{\mathrm{eff}}=\Omega^2\delta_{ij}$ in this local subclass. Therefore the stationary ideal clock-rate factor extracted from the metric subclass is $\Omega\xi$, while the spatial ruler scale is governed by $\Omega$. This preserves the geometry-first interpretation: $\xi$ remains the oblate-envelope shape ratio, and the clock rate agrees with $\xi$ only after the geometry-to-clock closure is proved.

### Observer Construction and Operational Invariance

#### Assembly clocks and rods

The recovery target is that physical observers are built from bound assemblies whose derived clock, ruler, and signal responses jointly satisfy the above laws. Shared constituents alone do not prove those laws or their universality across apparatus families.

#### Two-way signal speed criterion

For ruler and clock systems made of translated assemblies, two-way signal experiments must satisfy
$$
c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}}c_{\text{iso}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e4dbe9cd86f63436)

uniformly in orientation $\theta$. This is the operational statement that maps substrate anisotropy into effective Lorentz symmetry at observer scale.

For clock-and-ruler synchronization, $c_{\text{iso}}$ is the dressed local assembly signal speed. For photon synchronization, it is the local photon-channel speed $c_\gamma$; photon Gate A must show when the photon branch shares the same homogeneous-cell limit as $c_{\text{eff}}$.

#### Conditional synchronization-reabsorption lemma

The synchronization claim has a compact conditional form. In a weak homogeneous cell, suppose the same moving-assembly response supplies the photon-channel clock and ruler laws
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\gamma},
\qquad
\frac{d\tau}{dT}=\frac{1}{\gamma_\gamma},
\qquad
\gamma_\gamma=\frac{1}{\sqrt{1-v^2/c_\gamma^2}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6382765b4ee26876)

with $v$, $c_\gamma$, and the arm length expressed in one absolute-frame chart and $d\tau/dT$ declared for that comparison. Substituting a dressed speed into the primitive wake equation is not licensed; this benchmark assumes a separately derived homogeneous isotropic photon transport law at $c_\gamma$. These equations are not assumed as completed dynamics; they are the response form the branch must derive from one Noether sea and assembly record.

In the absolute frame, the one-way photon legs along a longitudinal arm are unequal:
$$
t_{\to}=\frac{L_{\parallel}}{c_\gamma-v},
\qquad
t_{\leftarrow}=\frac{L_{\parallel}}{c_\gamma+v}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea8b6c9e55476905)

The two flight durations differ because their endpoints move; this does not make the assumed absolute-frame propagation speed anisotropic. The round-trip absolute time is
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

Here $\Delta t_{\mathrm{Sag}}$ is a difference of effective observer-coordinate arrival times. The same clock, ruler, and photon record must recover this loop comparison while keeping the contractible two-way anisotropy row small. Treating synchronization reabsorption as a global cancellation around rotating loops would therefore fail the observer map.

This lemma proves only a conditional reabsorption statement: if one branch supplies the square-root ruler law and the square-root clock law, then the two-way optical row self-nulls. It does not prove that the Noether sea response yields those laws. Any deviation in $L_{\parallel}$, $d\tau/dT$, or $c_\gamma$ becomes one of the leakage residuals below, with the same clock response subsequently mapped into $t_{\mathrm{eff}}$.

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

Calibrating clocks and rulers fixes how the dressed observer speed compares with $c_f$; photon Gate A separately decides whether the photon channel shares that calibrated speed. Equality of the observer channels does not by itself remove the Noether sea dressing between their common value and the primitive wake speed.

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

The selected cell must actually realize the asymptotic clock-and-ruler calibration, and the photon channel must have no residual offset from that calibration.

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

Exact three-speed coincidence requires both calibration closure and photon-to-clock/ruler closure. Approximate coincidence is controlled by two named residuals whose product is retained rather than hidden inside one fitted error bar.

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

Once $c_f$ is set to one, the two delay factors themselves determine the dressed clock/ruler calibration and the photon-channel speed.

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

On this candidate, the planar-pair separation is proportional to the gap between primitive wake speed and the common observer speed.

Thus the exact undressed limit $\chi_{\mathrm{sea},0}\to1$ forces $d\to0$ on that candidate at fixed finite $\omega$, whereas a finite-separation branch requires either $\chi_{\mathrm{sea},0}>1$ or a separately derived phase-locking cancellation. This is a conditional consequence of the current Gate A scaffold, not evidence that the photon branch exists or that $c_f>c_0$ has been measured.

> Claim grade: derived. The factorization, coincidence criterion, and residual-composition identity follow algebraically from the declared speed definitions. Falsifier: a same-record retained branch that satisfies the declared definitions while violating any of those identities.
>
> Claim grade: inferred. The present record-bearing causal-front definition requires $\chi_{\mathrm{sea},0}\ge1$. Falsifier: an accepted channel with $c_0>c_f$ that still produces no record before the primitive $c_f$ support.
>
> Claim grade: guessed. The proportional-collapse Gate A branch is a candidate physical realization. Falsifier: failure to retain that photon branch, or a finite-separation Gate A branch at $c_\gamma=c_f$ produced by a different phase-locking cancellation.

The same criterion has a long-baseline photon consequence. For a nondispersive-path approximation, suppose both frequency channels follow the same declared ray $\Gamma_z$, the delay factors are evaluated at their local frequencies and local epochs, and $d\ell$ is distance in the declared propagation chart. The following integral then defines a candidate propagation delay, before emission-time offsets, path differences, redshift/clock conversion, and detector response are included:
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

A comparison with an observed transient requires those additional source and transport terms. The isolated propagation contribution must vanish, or remain below its allocated timing bound, in the same weak homogeneous branch that supplies $c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}}c_{\text{iso}})$. It is not enough to recover local two-way isotropy while leaving cosmological photon timing to a separately tuned channel record.

#### Round-trip anisotropy cancellation through $O(\beta_\star^4)$

Let arm lengths in the preferred frame be written using the declared two-way signal channel speed, with $\beta_\star=v/c_\star$:
$$
\frac{L_{\parallel}}{L_0}=1+\alpha_2\beta_\star^2+\alpha_4\beta_\star^4+O(\beta_\star^6)\qquad
\frac{L_{\perp}}{L_0}=1+b_2\beta_\star^2+b_4\beta_\star^4+O(\beta_\star^6)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-107c747c6c80bf56)

In the fixed-endpoint absolute-frame version of this homogeneous transport benchmark, $t_\parallel$ and $t_\perp$ denote round-trip absolute durations. They are
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

Under the additional no-transverse-scale response assumption $b_2=b_4=0$, this yields
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

For freely falling massive probes, geodesic motion is a recovery target, not a consequence of writing a metric. In an affine proper-time parameter its comparison equation is
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

The $c_0^2$ prefactor marks this as an observer-sector potential calibration: $c_0$ is the declared observer-sector speed, and the $c_f\to c_0$ normalization is an obligation of the dressing map, not an input identity. Observer-channel coincidence does not bound $c_f-c_0$ without a derived dressing map; the weak-homogeneous speed-factorization lemma permits a common dressed speed below $c_f$. Then the nonrelativistic geodesic limit becomes
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-\Omega^{2}\xi^{2}(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}+\mathcal R_{\mathrm{geo}}^i
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
\left|1-\Omega^2\xi^{2}\right|\,\left|\nabla_{\mathrm{eff}}\Phi_{\text{eff}}\right|
\right)+\mathcal R_{\mathrm{geo}}^i
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1fce4564cb78218b)

For the static zero-shift metric, $\Gamma^i_{00}=(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j(\Omega^2\xi^2)/2$, so the leading coordinate acceleration is $-c_0^2\Gamma^i_{00}$. The residual $\mathcal R_{\mathrm{geo}}^i$ has acceleration units and contains velocity, time-dependence, and non-geodesic terms; bounding it requires specified derivative scales. In the isotropic subclass the leading term reduces to $-\xi^2\partial_i\Phi_{\mathrm{eff}}$. Weak lapse normalization additionally requires $\Omega\xi\approx1$. All gradients in this paragraph are in the effective chart. The potential has explicit source channels
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

In the static isotropic subclass, let $d\ell_{\mathrm{eff}}=(\delta_{ij}dx_{\mathrm{eff}}^i dx_{\mathrm{eff}}^j)^{1/2}$ denote coordinate spatial length; the metric spatial length is $\Omega\,d\ell_{\mathrm{eff}}$. A null path satisfies $c_0dt_{\mathrm{eff}}=\xi^{-1}d\ell_{\mathrm{eff}}$, so the scalar optical index relative to coordinate length is $n_{\mathrm{eff}}=1/\xi$. Conditional on that signal-metric identification, stationary arrival time selects the spatial projections of null geodesics:
$$
\delta\!\int_{\Gamma} n_{\text{eff}}(x_{\mathrm{eff}})\,d\ell_{\mathrm{eff}}=0
\quad\Longleftrightarrow\quad
\Gamma\ \text{is the spatial projection of a null geodesic of}\ g^{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ab3e1db82de78f3d)

The equivalence concerns unparameterized null paths, which can be lifted and affinely parametrized; proper time is constant on a null path. It does not identify a scalar refractive functional with massive geodesic motion, nor cover general moving, anisotropic, dispersive, or time-dependent media. Those cases need their own optical response. This is an effective comparison, not a primitive least-action law.

#### Coefficient-extraction and closure estimators

For each simulated group speed, keep the channel label explicit. Primitive branch calculations use $\beta_f=v/c_f$; dressed observer-channel fits use $\beta_\star=v/c_\star$ after the dressing map is declared. Extract from long-window attractor statistics:
$$
\hat{\alpha}_j\equiv \frac{a_{\parallel,q}(\beta_j)}{a_{\perp,q}(\beta_j)}\qquad
\hat{\tau}_j\equiv \frac{P_q(\beta_j)}{P_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d4bd80ddc6657454)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

Fit even-power truncations only after rest normalization and a velocity-reversal symmetry test on the same preparation family. Odd terms, if present, are retained rather than discarded. The displayed quartic fits are
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

The following suprema score the fitted functions, not the unsampled physical response. Physical leakage bounds also need sampling coverage, fit and measurement uncertainty, interpolation control, and the omitted $O(\beta_f^6)$ remainder; a quartic fit to an exact Lorentz curve has a nonzero truncation residual. The fitted leakage scores are
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

For a mean-subtracted, $\pi$-periodic orientation residual that is also even under reflection about the declared axis, fit
$$
\Delta_{\text{tw}}(\beta_f,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_f)\cos(2m\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-419b78e91547d646)

A general orientation residual also needs sine harmonics and, before mean subtraction, a constant term. These missing components must be checked separately. In the displayed reflection-symmetric case, enforce
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

is replaced everywhere by a step function. It means that a physical clock or ruler can realize Lorentz behavior only through stable branch charts whose causal-root counts and itinerary labels are integer data. The same ledgers also contain continuous emission times, positions, weights, and phases; integer labels alone do not quantize physical response values. For a stable branch class $q$, define the realized clock and ruler Lorentz factors by
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

where $\mathcal{Q}_{\mathrm{stable}}(\beta_\star)$ is the proposed set of stable causal-root ledger classes. Claim grade: guessed for a discrete physical response spectrum. Continuous families within one class are not excluded by root counting. Its falsifier is a retained family with continuously varying responses at fixed conditions inside one proposed discrete class; proving discreteness needs an additional dynamical selection theorem. The observer-level Lorentz factor is recovered only when the active branch family, hierarchy averaging, and Noether sea dressing collapse this set to a universal effective value:
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

> Claim grade: derived for local integrability at a generic transverse positive-separation fold, by the [Master Equation fold estimate](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse). Falsifier: a nonintegrable contribution under those exact hypotheses. Continuous extension of the integrated local contribution is not an existence or uniqueness theorem for the full evolution.

The local prediction can be stated as a closure condition. There must exist one admissible branch-chart class $\mathfrak{B}_{\mathrm{mov}}(\beta_f)$ on a group-speed band $0\le\beta_f\le\beta_{\max}$ such that
$$
K_{AB}(\beta_f)
=
\left\langle
\sum_{(i,j,m)\in\mathcal{L}_{\mathrm{root}}(\beta_f)}
\partial_{r_A}\partial_{r_B}
\mathcal{U}_{ij}^{(m)}(T;\beta_f,\eta)
\right\rangle_{\mathrm{cyc}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d30eb932c239d1af)

Here $A,B$ are spatial component indices, distinct from receiver/transmitter labels $i,j$; the per-root potentials are conditional on the action construction above. The extracted coefficient vector
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

and the same evolved branch must supply the common exponent $p$. The error terms have distinct jobs. $\epsilon_{\mathrm{br}}$ may bound a proved omitted contribution, but missing roots with no independent bound make the calculation incomplete rather than small-error evidence; $\epsilon_{\mathrm{hier}}$ measures coincident-midpoint orthogonal-axis braid hierarchy leakage away from the binary benchmark, $\epsilon_{\mathrm{reg}}$ measures finite-$\eta$ regularization error, and $\epsilon_p$ measures uncertainty or longitudinal/transverse mismatch in the extracted attractor-amplitude exponent. This condition is stronger than fitting $L_{\parallel}=L_0/\gamma_f$ and $P(v)=\gamma_f P_0$. It says the fitted coefficients must be traceable to active causal roots with no independent Lorentz postulate and no per-observable retuning.

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
+C_{\mathrm{reg}}\epsilon_{\mathrm{reg}}+C_p\epsilon_p
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

a proposed Hamiltonian averaging route would eliminate fast phases by a near-identity change of variables (the Lie-Deprit transform). It requires a separately justified Hamiltonian reduction, complete nonresonance bounds for the coupled frequency vector, coupling-size and regularity estimates, and an averaging measure. The assumptions that the monopole changes only normalization, that the interaction-weighted dipole vanishes, and that the leading response is quadrupolar must each be established. A geometric midpoint alone does not cancel a polarity- and history-weighted dipole. This hierarchy is a declared source-record ordering, not a meaning of the persistent indices. The unproved estimate is
$$
\mathcal{D}_{23}
\le
C_Q\left(\frac{r_2}{r_3}\right)^2
+O\!\left(\left(\frac{r_1}{r_3}\right)^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-30aeca24081a0d32)

If the remainder has the uniform bound $C_R(r_1/r_3)^2$ with $C_R\ge0$ and $r_1\le r_2$, a sufficient condition for this coefficient mismatch bound is
$$
(C_Q+C_R)\left(\frac{r_2}{r_3}\right)^2\le C_{23}\epsilon_{\text{LV}}
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

for small integers $(m,n)$ and nonlinear coupling width $\delta\omega_{\text{nl}}$, the displayed nonresonant estimate is unavailable without a resonance analysis. A small divisor is a small frequency-combination denominator in the averaging equation. It does not alone prove large exchange, loss of invariant quasiperiodic tori, or observable leakage: the corresponding coupling may vanish, and resonant motion may remain bounded. Those outcomes require their own dynamics and observation maps. The two-frequency condition shown here is only one necessary subproblem of a full three-frequency averaging argument.

### Theorem Targets

#### Theorem A0 (forward partner-root speed-limit lemma)

The primitive material speed-limit row has a kinematic upper-bound lemma before any detailed Noether braid deformation is solved. In a translating branch with constant group velocity $u\hat{\mathbf e}$, a retained partner row whose receiver lies ahead of its source by mixed-time longitudinal separation $d_{\parallel}=\hat{\mathbf e}\cdot[\boldsymbol\rho_i(T)-\boldsymbol\rho_j(T-\Delta)]\ge d_{\min}>0$ must satisfy
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

for that class of material branches, with $c_{\mathrm{mat}}^{\mathrm{lim}}$ expressed in substrate units here. An equal-time leading position does not establish this mixed-time condition for an orbiting pair. This is not a universal speed ceiling for individual architrinos or all possible assemblies. The remaining Lorentz program is the constructive side: proving that stable branch families exist for $u<c_f$, that their deformation and periods approach the common envelope, and that Noether sea dressing maps the primitive bound to the observer-channel speeds without an independent fit.

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
=1-\frac{1}{2}\beta_\star^2-\frac{1}{8}\beta_\star^4+O(\beta_\star^6)+R_1(\beta_\star)
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
=1+\frac{1}{2}\beta_\star^2+\frac{3}{8}\beta_\star^4+O(\beta_\star^6)+R_2(\beta_\star)
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

Target (unproved). For a declared mean-subtracted, reflection-even, $\pi$-periodic two-way observable from this assembly class, require
$$
\Delta_{\text{tw}}(\beta_\star,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_\star)\cos(2m\theta)
\qquad
|\mathcal{A}_{2m}(\beta_\star)|\le C_m\epsilon_{\text{LV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2b8f974b3a0eaaf6)

uniformly on $0\le\beta_\star\le\beta_{\max}<1$. A bound on the full angular signal additionally requires a convergent majorant, for example $\sum_{m\ge1}C_m<\infty$; individual harmonic bounds do not alone bound an infinite sum.

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

has a block-triangular Jacobian after grouping the second- and fourth-order output coefficients. In the displayed output order its determinant is
$$
\det
\frac{\partial(\alpha_2,\alpha_4,\tau_2,\tau_4)}
{\partial(k_2,\ell_2,k_4,\ell_4)}
=-\frac{p^2}{4}\ne0.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99407662aca6606e)

The inverse-function theorem therefore gives local identifiability of the four stiffness coefficients within this ansatz once $p$ has been independently extracted. Quantitative error propagation also needs an inverse-Jacobian conditioning bound, a lower bound away from $p=0$, and controlled data and truncation errors; invertibility alone does not certify leakage-scale precision. This is a proved algebraic property of the ansatz, not proof that a physical moving branch exists or that its amplitude response has constant $p$.

#### Theorem F (cross-regime universality of closure coefficients)

Target (unproved). The following estimate is the averaging obligation above, not a theorem supplied by hierarchy alone. If binary and coincident-midpoint orthogonal-axis braid attracting branches exist, are smooth in $\beta_f$, share the same coarse-grained causal kernel class, and satisfy nonresonant hierarchy
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

If the uniform remainder and constant-weighted hierarchy condition above hold, they control this coefficient mismatch only. Operational universality additionally needs the binary reference to satisfy Lorentz closure, compatible amplitude and clock maps, and the same observer-channel and population-response bounds in both regimes.

#### Theorem G (structural-integrity common-limit closure)

Target (unproved). This is the parent Lorentz-closure target for Theorems B-D, the photon synchronization row, and the weak-field gravitational-wave speed row. Theorem A0 supplies the primitive kinematic obstruction: a material branch that needs forward partner-hit closure cannot have a sustained translating ledger with $c_{\mathrm{mat}}^{\mathrm{lim}}>c_f$. Theorem LK1 supplies the first constructive clock/ruler decision surface by asking whether the translating two-body branch returns $R_T^{\mathrm{bin}}=0$ and $R_{\xi}^{\mathrm{bin}}=0$ before Noether braid averaging or Noether sea dressing is invoked. In the weak homogeneous observer branch, first map the material limiting speed of Theorem A0 into the same effective chart as the other channels. The symbol $c_{\mathrm{mat}}^{\mathrm{lim}}$ below denotes that mapped value, not the unmapped substrate speed. A retained material assembly branch closes only if the matter-assembly limiting speed, the Noether sea dressed clock/ruler speed, the photon-channel speed, and the empirical calibration speed obey
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

A demonstrated, controlled failure in the specified physical domain can refute the corresponding recovery target. Lack of a proof or failure of one ansatz leaves an obligation open. The following distinguish physical failures from failure of a particular derivation route:

1. No stable translating attractor exists over physically relevant group-speed range.
2. Required contraction or period scaling appears only by fine tuning.
3. Residual anisotropy terms exceed accepted bounds after full observer construction.
4. Different assembly decorations produce incompatible kinematic laws that prevent universal operational closure.
5. The weak-field connection built from $g_{\mu\nu}^{\text{eff}}$ fails to reproduce a Newtonian Poisson limit for $\Phi_{\text{eff}}$ in the operational observer sector.
6. The nonresonance or Hamiltonian hypotheses fail, making the [adiabatic mismatch estimate](#coincident-midpoint-orthogonal-axis-braid-adiabatic-decoupling-bound) unavailable. This invalidates that proof route; a separately established observable failure is required to refute Lorentz recovery.
7. The extracted Lorentz coefficients cannot be traced to the causal-root ledger on a completed branch chart, or the same ledger cannot generate clock, ruler, and two-way signal closure without separate per-observable tuning.

### Position in the $\mathbb{A}\mathbb{A}\mathbb{A}$ Program

These kinematic recovery obligations constrain the downstream geometry comparisons:

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

### Source notes

The experimental comparisons above are observer-level constraints, not premises for the primitive acceleration law. M. Nagel and collaborators, *Direct Terrestrial Test of Lorentz Symmetry in Electrodynamics to $10^{-18}$* (2015), [arXiv:1412.6954](https://arxiv.org/abs/1412.6954), reports an orientation-dependent resonator-frequency null comparison. That experiment constrains its apparatus channel, not every component of this chapter's residual budget. Clifford M. Will, *The Confrontation between General Relativity and Experiment* (2014), [arXiv:1403.7377](https://arxiv.org/abs/1403.7377), supplies the comparison context for distinct clock, local-Lorentz, and weak-gravity tests; it does not supply a current universal numerical tolerance.

Volker Perlick, *Fermat Principle in Finsler Spacetimes* (2006), [arXiv:gr-qc/0508029](https://arxiv.org/abs/gr-qc/0508029), states the stationary-arrival-time principle for lightlike curves. It supports the null-ray scope of the optical comparison. The static isotropic specialization above follows directly from the displayed metric; neither this comparison nor its source derives the metric from architrino dynamics.

## Emergent Metric

This chapter explains how metric language enters a theory whose substrate is not metric spacetime. The [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md), the fixed three-dimensional spatial container, remains flat; [absolute time](../../../../markdown/aaa/foundations/absolute-time.md) supplies the universal ordering parameter. The Noether sea changes state inside it. The effective metric is the observer-level description extracted from clock, ruler, signal, and medium-response channels. This chapter says what that metric means, which medium variables are supposed to carry it, and what weak-field map has to be recovered before the spacetime branch can claim recovery of general relativity (GR), the observer-level theory relating clock intervals, trajectories, and signal paths to spacetime geometry.

The parameterized post-Newtonian (PPN) framework compares weak-gravity predictions through coefficients for clock rates, spatial distances, and motion relative to a preferred frame. Its role here is to test a proposed metric reconstruction; those coefficients are not premises of the architrino acceleration law.

The one-line map is: Noether sea record to clock, ruler, signal, and drift response; those responses to an effective metric; that effective metric to GR benchmark observables. Each arrow has to be earned. A metric that fits only one channel is not yet a spacetime recovery, because Physical Observers need one coherent effective geometry across clocks, photons, matter motion, and gravitational-wave channels.

### Absolute Frame vs. Effective Geometry

The spacetime branch keeps two descriptions separate. The absolute frame is the fixed bookkeeping structure of absolute time and Euclidean position; it supplies the substrate coordinates in which architrino path histories and Noether sea state are recorded. Effective geometry is the observer-level metric reconstructed from clocks, rulers, signal propagation, and medium response.

The bridge is therefore constitutive rather than ontological. A successful metric map must explain how the same Noether sea record produces lapse, spatial-compliance, drift, and signal-delay channels without treating the Euclidean void itself as curved.

### Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $T$. A chosen chart $(X,Y,Z)$ represents fixed void locations; the labels never move or curve.
- **Noether sea**: The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), an ambient population of neutral assemblies called Noether braids. Their constituents are [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers with polarity and path history; pro/anti labels describe braid-frame orientation. The bridge term *spacetime medium* is used when translating toward effective spacetime language.
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

- $n(\mathbf X,T)$: dimensionless Noether braid number density normalized to a declared positive reference density $\rho_{\text{NS},0}$.
- $\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)$: Noether braid number density, with units of inverse volume.
- $\chi_{\text{sea}}(\mathbf X,T)=c_f/c_{\text{eff}}(\mathbf X,T)$: Noether sea delay factor.
- $c_0>0$: the asymptotic homogeneous observer-channel speed, written $c_0\equiv c_{\text{eff}}(\infty)$ after the common spatial and temporal calibration has been declared. Here $\infty$ denotes the homogeneous reference region of an isolated-source comparison.
- $\Phi_{\text{eff}}(\mathbf X,T)$: constitutive potential inferred from the clock channel.
- $\Phi_N(\mathbf X,T)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.
- $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: observer-level lapse or clock-rate field reconstructed from Noether sea state.
- $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: Noether sea drift field in the observer-level bookkeeping map.
- $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: spatial coframe coefficients, mapping coordinate displacements to locally calibrated ruler components; $a,i\in\{1,2,3\}$. The coframe carries the proposed Noether sea compliance response.
- $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\delta_{ab}e^a{}_i e^b{}_j$: observer-level spatial compliance metric.
- $(\gamma_{\mathrm{eff}}^{-1})^{ij}$: inverse of the spatial compliance metric, defined by $(\gamma_{\mathrm{eff}}^{-1})^{ik}\gamma_{kj}^{\mathrm{eff}}=\delta^i{}_j$.

### What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How photon-channel packets and gravitational-wave channels propagate through the Noether sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each effective-chart point $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, choose an idealized Physical Observer (Noether braid clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

An observer chart must first be specified by a candidate map $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record})$, where $\mathcal N_{\mathrm{sea}}$ retains the medium state and relevant history. This map is open. Equal units do not identify $T$ with $t_{\mathrm{eff}}$ or $X^i$ with $x_{\mathrm{eff}}^i$. In an effective spatial chart, $h_{ij}$ denotes the Euclidean reference metric carried into that chart; it equals $\delta_{ij}$ only for Cartesian reference coordinates.

The Arnowitt–Deser–Misner (ADM) form separates the effective metric into clock rate, relative spatial motion, and ruler distance. Cartan's coframe description expresses those ruler distances through local one-forms. These are mathematical descriptions at the observer level. The complete-state perspective maps substrate and medium data into their coefficients:

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

Thus ordinary density can be weakly visible to clocks and signal paths when it is integrated over planetary or stellar length scales, while meter-scale laboratory samples require much higher density or precision. The Earth core is thermally cold on a Planck-temperature comparison, but that fact is not the limiting variable for weak gravity. Recovering that contribution requires an assembly and medium response to the distributed rest-energy, pressure, stress, and exposure record; the density-length estimate does not derive that response.

A spherical-source sanity check keeps this point from collapsing into a temperature-gradient story. A hot or strongly excited medium region can have maximum scalar excitation near its center while the effective gravitational acceleration vanishes there by symmetry:
$$
\mathbf{a}_{\mathrm{eff}}(\mathbf{0})
=-\nabla\Phi_{\text{eff}}(\mathbf{0})
=\mathbf{0}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-61834399155d385e)

The constitutive variable that sources $\Phi_{\text{eff}}$ may therefore be an energy, stress, or RMS excitation record, but the force-like observer readout still comes from the spatial gradient of the shared effective potential. A model that equates gravity directly with "more temperature" fails this center-gradient check even before PPN coefficients are tested.

#### Alternating-Flux Constitutive Candidate

One candidate route from assembly wakes to weak gravity is a root-mean-square (RMS) excitation law, which measures the size of a fluctuating acceleration even when its time average vanishes. If local causal-wake hits alternate in sign, direction, or branch provenance, the mean signed acceleration can cancel while the quadratic excitation of the Noether sea remains:
$$
\Phi_{\mathrm{eff}}^\theta(\mathbf X,T)
\propto
\mathcal{K}_{\mathrm{sea}}
\left\langle
\left\|\sum_s q_s\mathbf A_s(\mathbf X,T)\right\|_h^2
\right\rangle_{\Delta T}^{1/2}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-28ee266019bf0cc0)

Here $s$ labels each admitted transmitter-root pair for a declared receiver channel, $q_s$ is its transmitter polarity, and $q_s\mathbf A_s$ is its full signed acceleration contribution from the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#per-hit-acceleration). Thus $\mathbf A_s=\kappa q_r W_s^{\mathrm{acc}}\hat{\mathbf r}_s/r_s^2$ for receiver polarity $q_r$, with $W_s^{\mathrm{acc}}=c_f/|D_{t,s}|$; the direction $\hat{\mathbf r}_s$ runs from emission to reception. The norm uses $h_{ij}$, and $\langle F\rangle_{\Delta T}=\Delta T^{-1}\int_{T-\Delta T}^{T}F(T')\,dT'$ uses a declared positive absolute-time window. Root completeness, finite squared amplitude on that window, and a common receiver/population averaging prescription are required. The candidate record $\theta$ must specify them. Since the RMS has acceleration units, the net coefficient represented by $\mathcal K_{\mathrm{sea}}$ must have length units to produce a potential with units of speed squared. This coefficient and the constitutive law remain hypotheses, not consequences of taking an RMS. The homogeneous reference must also satisfy $\Phi_{\mathrm{eff}}^\theta(\infty)=0$. If its RMS is nonzero, the candidate needs a derived reference subtraction or normalization shared by all channels; the raw RMS formula alone does not meet this condition. The same excitation must supply the clock, ruler, and signal responses without separate fitting.

Because the RMS factor is non-negative, the attractive weak-field branch requires a declared negative sign: $\mathcal K_{\mathrm{sea}}<0$ in the convention $\Phi_{\mathrm{eff}}=c_0^2\ln N<0$ near an ordinary mass source. Increasing the shared RMS excitation must then make $\Phi_{\mathrm{eff}}$ more negative monotonically on that branch. Without this sign and monotonicity condition, the candidate does not determine even the direction of the recovered weak-field acceleration.

### ADM/Cartan Reconstruction Surface

The ADM/Cartan reconstruction connects the observer-record map in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold) to the metric used in neighboring dynamics chapters. With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the observer-level line element target is

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

Work on a patch with $N>0$ and an invertible real coframe $e^a{}_i$. In Cartesian length coordinates, $N$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ are dimensionless, while $u^i_{\mathrm{sea,eff}}$ has speed units. The spatial metric is positive definite because $v^i\gamma_{ij}^{\mathrm{eff}}v^j=\sum_a(e^a{}_iv^i)^2>0$ for $v\ne0$. The invertible coframe $(Nc_0dt_{\mathrm{eff}},e^a{}_i(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}))$ puts the line element in signature $(-,+,+,+)$; its determinant in $x_{\mathrm{eff}}^\mu$ coordinates is $-N^2\det\gamma^{\mathrm{eff}}<0$. A rank loss or $N=0$ ends this chart's domain. Smooth connection and curvature calculations require respectively $C^1$ and $C^2$ metric data. Local rotations of the ruler coframe leave $\gamma_{ij}^{\mathrm{eff}}$ unchanged, so a metric alone does not recover physical braid orientation.

Here $N$ gives $d\tau/dt_{\mathrm{eff}}$ only for a clock following $dx_{\mathrm{eff}}^i=u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}$; other clock trajectories also sample the spatial term. In the GR-matching regime the effective connection is the Levi-Civita connection of $g^{\text{eff}}_{\mu\nu}$; torsion, nonmetricity, birefringence, dispersion, and preferred-frame leakage are deviation observables rather than substrate ontology.

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

with $A=N$, $B_{ij}=\gamma_{ij}^{\mathrm{eff}}$, and $d\tau^2=-ds_{\mathrm{eff}}^2/c_0^2$ on timelike clock records. A positive clock rate requires $\gamma_{ij}^{\mathrm{eff}}(v^i-u^i_{\mathrm{sea,eff}})(v^j-u^j_{\mathrm{sea,eff}})<N^2c_0^2$, where $v^i=dx_{\mathrm{eff}}^i/dt_{\mathrm{eff}}$. In the local Noether sea rest chart, choose a ray direction with $h_{ij}\hat k^i\hat k^j=1$. Conditional on the photon channel sharing this metric's null cone, its coordinate speed measured per Euclidean reference length is
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

This is a metric-null speed prediction. Agreement with an independently extracted photon speed remains a recovery target. In the same rest chart, the ruler increment satisfies $d\ell^2=\gamma_{ij}^{\mathrm{eff}}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$ and the stationary reference-clock interval is $d\tau_{\mathrm{ref}}=Ndt_{\mathrm{eff}}$; null propagation gives the locally measured ratio $d\ell/d\tau_{\mathrm{ref}}=c_0$. The weak homogeneous observer branch requires
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
-\frac{\|\mathbf v_{\mathrm{clk}}\|_h^2}{2c_0^2},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-686bee199bdbc652)

where $U\ge0$ is the positive Newtonian potential declared above and $\mathbf v_{\mathrm{clk}}$ is the clock group velocity relative to the local Noether sea, expressed in the same effective chart. This clock velocity is distinct from the medium's motion relative to a comparison frame, denoted $w^i$ below. This reproduces the Newtonian-limit clock relation and the standard $g_{00}$ first-order structure as a comparison form. It is not yet coefficient-level GR closure: $\Phi_{\mathrm{eff}}=\Phi_N$, $G_{\mathrm{eff}}$, and any Einstein-equation analogue must still be derived from the same Noether sea response record that supplies $A$, $B_{ij}$, $c_{\text{eff}}$, and the photon channel.

The retained weak-field coefficient map should therefore be expressed at the ADM/Cartan level before observable projections are evaluated. With
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3998b52bba7dc3d0)

and with $\Sigma^{\mathrm{tf}}_{\text{sea},ij}$ the retained stress projection with its $h$-trace removed, the minimal coefficient scaffold is
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\Sigma_{\text{sea}}^{\mathrm{tf}})
+O(\epsilon_{\mathrm{PN}}^3,\epsilon_{\mathrm{LV}})
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
+O(\epsilon_{\mathrm{PN}}^2,\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36fc405532a4696e)

$$
u^i_{\mathrm{sea,eff}}
=
D_U w^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w^j\frac{U^i{}_j}{c_0^2}
+O(c_0\epsilon_{\mathrm{PN}}^{5/2},c_0\epsilon_{\mathrm{LV}}),
\qquad
\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_i e^b{}_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b8321393ecb536b5)

Here $\epsilon_{\mathrm{PN}}$ is a dimensionless weak-field ordering parameter: $U/c_0^2$, $\delta n$, $\delta\chi$, $\varphi$, and $A_{\gamma,\mathrm{tf}}\Sigma^{\mathrm{tf}}_{\mathrm{sea},ij}$ are $O(\epsilon_{\mathrm{PN}})$, while $\|\mathbf w\|_h/c_0=O(\epsilon_{\mathrm{PN}}^{1/2})$ on the declared window. The scalar response coefficients are dimensionless; $A_{\gamma,\mathrm{tf}}$ carries inverse-stress units if the stress is dimensional. $Q_N$ collects second-order dimensionless contributions. The fields are constrained projections of one record, so $\varphi=\ln N$ where the clock-potential definition is used; it is not an independently adjustable input. Here $w^i$ is the Noether sea drift relative to the comparison frame, $D_U$ and $D_{\mathrm{aniso}}$ are the isotropic and anisotropic drift-response coefficients, $U$ is the positive PPN potential, and $U^i{}_j$ is its standard anisotropic potential tensor. These are coefficient rows for the observer-level reconstruction. This minimal preferred-motion scaffold omits independent source-current terms needed for rotating sources; those belong to the full PPN comparison. Redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals must read from these rows as one shared constitutive record. The coefficient dictionary to $(\gamma_{\mathrm{PPN}},C_2^{(U)},\Xi_1,\ldots,\Xi_4)$ is given in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#admcartan-extraction-equations).

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

Here $\Sigma_W$ is a positive-definite benchmark covariance on the retained independent observable components, with $\|r\|_{\Sigma_W^{-1}}^2=r^{\mathsf T}\Sigma_W^{-1}r$. This weighting makes the residual dimensionless even when observables have different units. The dimensionless $\alpha_i$ measure preferred-frame departures. All penalty weights are declared nonnegative dimensionless numbers, and $\mathcal S_{\mathrm{retune}}\ge0$ is zero only when the same parameter and calibration choices serve all channels. The displayed test is a diagnostic on the declared window, not a proof of metric recovery. Its proposed acceptance condition is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)\le\epsilon_{\mathrm{metric}},
\qquad
\mathcal{S}_{\mathrm{retune}}(\theta)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dc56bc079251de78)

The point is not to add a new spacetime ontology. It is to require the effective metric to behave as one constitutive summary of the same Noether sea state and observer record across clocks, rulers, signal propagation, and weak-field gravitational tests.

#### Geodesic and Lensing Recovery Benchmarks

The effective metric map must also recover the two standard variational benchmarks consumed by orbital, clock, and light-propagation tests. For timelike free-test-assembly records in the effective description, $m$ is a constant assembly mass parameter, not architrino mass. The comparison action is
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

Its geodesics are paths stationary under fixed-endpoint variations of the effective proper-time integral. In a stationary zero-shift weak field, their slow-motion limit must give the acceleration comparison used in the PPN bundle,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=
-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(\epsilon_{\mathrm{PN}}\|\nabla\Phi_{\mathrm{eff}}\|_h
+\frac{\|\mathbf v\|_h^2}{L_{\mathrm{met}}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a35d6c93159ee4b3)

Here $L_{\mathrm{met}}>0$ bounds spatial variation of the metric and lapse through their logarithmic derivatives, and $\mathbf v= d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}$. The exact lapse factor and velocity terms are explained in the final section. This observer-level variational target does not derive a variational principle for delayed architrino paths.

For null signal records,
$$
g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu=0
$$

[View →](../../../../../equation-mapping.html#photon-null-eikonal)

must match the eikonal path-time extremal of the Noether sea signal channel. For a stationary isolated point-mass comparison, with effective Newton coupling $G$, source mass $M$, and impact parameter $b$, the weak-field deflection target is
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

For an isolated weak-field comparison with negligible anisotropic stress and matched potential zero points, the GR equality target is

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

Here $\epsilon_{\mathrm{lens}}$ has potential units. Where $\Phi_{\mathrm{dyn}}\ne0$, a source family with constant leading ratio $\Psi_{\mathrm{sp}}/\Phi_{\mathrm{dyn}}$ identifies that ratio with $\gamma_{\mathrm{PPN}}$. A general scale-dependent gravitational slip or a source with significant anisotropic stress cannot be assigned this single PPN coefficient without a further reduction. A scalar force or medium-response correction that appears only in the clock/lapse channel accelerates matter but under-deflects light. A valid $\mathbb{A}\mathbb{A}\mathbb{A}$ response must project the same Noether sea state into the lapse and spatial-compliance channels so that rotation curves, hydrostatic mass, time delay, and lensing consume one effective metric.

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

The superscript $\mathrm{obs}$ denotes a declared observational reconstruction with its source-model uncertainty. The covariances $C_{\mathrm{dyn}}$ and $C_{\mathrm{lens}}$ weight the sampled gradient data, and $\|\cdot\|_W$ is a declared normalized sampling norm. Their separate quadratic terms assume negligible cross-covariance; otherwise the joint covariance is required. The equality penalty applies only in the stated negligible-slip comparison regime. This residual tests an effective-metric candidate and supplies no dark-sector ontology. It is the condition that lets a medium-response explanation of galaxy or cluster dynamics remain compatible with the same lensing map.

#### Matter-Channel Compatibility Target

The same shared-record rule applies to the effective matter channels whose observations test the metric. Predictive matter dynamics and observer-level geometry must describe the same clock, ruler, and signal observations. In this framework, the matter channel, clock channel, ruler channel, and signal channel must remain projections of the same Noether sea record $\theta$.

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

Here $\mathfrak R_{\mathrm{sig}}$ contains the admitted nondispersive signal channels, and $d_{\mathrm{cone}}$ is a declared dimensionless directional mismatch between characteristic and metric-null covectors in the same chart. A Cauchy problem predicts later channel data from data on an admitted initial surface; $\mathcal{R}_{\mathrm{Cauchy}}^{(r)}$ records failure of the declared channel to share the predictive Cauchy evolution used by the same observer-level metric record. In the weak homogeneous photon recovery regime, this residual includes the requirement that the two physical polarization branches share the same free-space characteristic cone up to the birefringence tolerance routed through [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md#operational-null-result-ledger).

The channel equations, cone-distance normalization, and Cauchy diagnostic still have to be specified before this expression can be evaluated. It remains a recovery target rather than substrate ontology. If $\mathcal{R}_{\mathrm{char}}$ is small only because the photon, clock, ruler, or stress channels use different fitted records, the metric has not been recovered as a constitutive output of the Noether sea.

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

For an admitted axisymmetric oblate branch, a Noether braid has a deformable exclusion envelope, the spatial region defined by its retained paths and wake response; see [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). This chapter does not identify that individual Noether braid envelope with the metric. The metric bridge uses many deforming Noether braids in the Noether sea, whose coarse variables determine clock, ruler, and signal behavior.

For a local comparison in which the cosmological-constant contribution is negligible, the translated Einstein-equation target is
$$
G_{\mu\nu}^{\mathrm{eff}}
=
\frac{8\pi G_{\mathrm{eff}}}{c_0^4}T_{\mu\nu}^{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#poisson-einstein-weak-gravity)

Here $G_{\mu\nu}^{\mathrm{eff}}$ is the Einstein tensor constructed from $g_{\mu\nu}^{\mathrm{eff}}$, $G_{\mathrm{eff}}$ is the recovered Newton coupling, and $T_{\mu\nu}^{\mathrm{eff}}$ is the assembly and medium stress-energy tensor. The equation relates observer-level curvature to effective energy and stress. It supplies no curvature or stress variable for the Euclidean void, and its constitutive derivation remains open.

For a static axisymmetric comparison, oblate spheroidal coordinates can be a useful effective chart. A diagonal illustrative line element has the form
$$
ds^2
=
-f(\zeta,\vartheta)c_0^2dt_{\mathrm{eff}}^2
+g_1(\zeta,\vartheta)d\zeta^2
+g_2(\zeta,\vartheta)d\vartheta^2
+g_3(\zeta,\vartheta)d\phi^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-789ca5523b0e74cb)

Here $\zeta$ is a length coordinate and $\vartheta,\phi$ are dimensionless angles; $f,g_1$ are dimensionless and $g_2,g_3$ have length-squared units. Positive coefficients give the Lorentzian signature on a regular chart patch. These functions encode clock and ruler response. Rotating sources generally require a time-azimuth cross term, equivalently a nonzero ADM shift; this diagonal example does not describe frame dragging. The symbols $\zeta$ and $\vartheta$ do not rename the Noether braid envelope ratio $\xi$ or the mollifier width $\eta$. These coefficients are not primitive geometry. They are closure targets to be derived from Noether sea density, strain, alignment, and deformation.

The useful GR analogy is therefore limited but important:

- oblate coordinates help describe rotating or deformed effective sources,
- interior and exterior effective solutions around oblate bodies remain useful comparison targets,
- perturbative methods can capture small departures from spherical symmetry,
- and standard predictions such as redshift, Shapiro delay, lensing, orbital precession, frame-dragging, and gravitational-wave emission from deformed sources must be recovered from one reusable constitutive map.

The family-dependent envelope geometry and the conditions for an oblate reduction belong in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md). The spacetime claim that a population of deformed Noether braids yields an effective metric belongs here and in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md).

### Jacobson-Type Support: Metric as Equation of State

Jacobson's [*Thermodynamics of Spacetime: The Einstein Equation of State* (1995, arXiv:gr-qc/9504004)](https://arxiv.org/abs/gr-qc/9504004) derives an effective Einstein equation from local horizon equilibrium, entropy proportional to area, and a heat/temperature relation imposed in every null direction. An equation of state relates collective thermodynamic variables. This supplies a conditional comparison route; its assumptions still require derivation from the Noether sea.

That comparative point fits $\mathbb{A}\mathbb{A}\mathbb{A}$ cleanly:

- the Euclidean void and absolute time are fundamental background structure,
- the Noether sea is the relevant microstructure,
- and relativistic metric behavior is a long-wavelength thermodynamic recovery target for that microstructure.

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

Here the first metric must be reconstructed from independent observer-channel data, while $\Pi_{\mathrm{hydro}}$ predicts a metric from retained microscopic data. Their norm requires the same fixed chart and a declared positive dimensionless component tolerance $\epsilon_g$. Using the same computed metric on both sides makes the residual identically zero and supplies no evidence for the constitutive map.

This does not license dismissing low-energy quantized-metric calculations. Donoghue's [*General Relativity as an Effective Field Theory: The Leading Quantum Corrections* (1994, arXiv:gr-qc/9405057)](https://arxiv.org/abs/gr-qc/9405057) separates unknown high-energy local terms from long-distance corrections determined by massless fields and their low-energy couplings. $\mathbb{A}\mathbb{A}\mathbb{A}$ should preserve that result as an observer-level recovery benchmark: the microscopic account may differ, but the weak-field constitutive record must reproduce the long-distance correction for the same recovered massless field content and low-energy couplings when its variables are coarse-grained into the effective metric description.

An entropy-based candidate may compare matter and geometry through a common functional. That is a possible comparison tool, not an additional mechanism or required external theory. Any entropy-based comparison must still project through the same Noether sea record that supplies $T_{\mu\nu}^{\mathrm{eff}}$, $g_{\mu\nu}^{\mathrm{eff}}$, horizon labels, and the effective dark-energy row; otherwise the entropy functional is only another fitted description.

This support is useful but limited. A Jacobson-style argument would explain why GR-like behavior is a natural equilibrium limit of many possible media, not why $\mathbb{A}\mathbb{A}\mathbb{A}$ is uniquely correct. The distinguishing burden therefore shifts to the departures from equilibrium, where the detailed Noether braid architecture should matter.

It also does not derive inertia by itself. A successful equation-of-state route can recover an effective Einstein equation while leaving open how a particular assembly acquires its inertial response, why accelerated and gradient-driven local records agree to equivalence-principle accuracy, and how the same Noether sea record fixes the mass-side response tensor. Those burdens remain with the mass, energy, Lorentz-closure, and Noether braid dynamics programs.

#### Local-Horizon Recovery Target

The Jacobson comparison gives this chapter a sharper recovery target than the general phrase "metric as equation of state." In the standard argument, a local horizon patch is assigned a boost-energy flux $dQ$, an Unruh temperature $T_U$, and an entropy change $dS$ proportional to horizon area. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation cannot assume those quantities as substrate facts. It must derive their observer-level analogues from one Noether sea record, using the same clock, signal, stress, and finite-boundary data that later recover weak-field GR.

For a Physical Observer $O$, let $\partial\Omega$ denote a two-dimensional effective-horizon cut and $\mathscr H_{\partial\Omega}(W)$ its null history over a finite comparison window $W$. The record $\theta$ contains the Noether sea state and observer channels. The set $\mathcal B_{\partial\Omega}^{(O)}(\theta;W)$ consists of distinguishable classes of alternative retained boundary histories under the fixed finite-precision readout map in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#ontic-and-epistemic-levels); it is not the number of wake hits in one history. Restrict the counting candidate to a nonempty finite label set. The formula $S=k_B\log|\mathcal B|$ is a counting entropy; identifying it with the conditional statistical entropy requires a uniform label distribution. For nonuniform probabilities induced by the retained measure, that entropy is $-k_B\sum_b p_b\log p_b$ and equals the counting value only at uniform weights. Finiteness, weights, and their relation to horizon thermodynamics remain obligations.

The entropy and flux targets are
$$
dS_{\partial\Omega}^{(O)}(\theta)
=
d\left(
k_B\log\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta)\right|
\right),
\qquad
dQ_{\partial\Omega}^{(O)}(\theta)
=
\int_{\mathscr H_{\partial\Omega}(W)}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-64e42d358483a2dd)

Here $\xi^\mu$ is the locally normalized approximate boost generator and $d\Sigma^\nu$ is the directed three-surface element on the null history. Choose its sign so $dQ$ is outward boost-energy flow from the observed side; use the same orientation and generator normalization for the entropy variation and temperature. Factors of $c_0$ in the flux convention are included so $dQ$ has energy units. The quantity $k_B$ is Boltzmann's entropy-to-energy-per-temperature conversion constant, used only at the observer level. A compact comparison residual is
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

The positive denominator floor $\varepsilon$ has energy units; $T_U^{(O)}>0$ is required, and the supremum is over the declared family of local equilibrium patches, not arbitrary observers or singular horizons. The local-horizon target is $\mathcal{R}_{\mathrm{thermo}}(\theta)\le\epsilon_{\mathrm{thermo}}$ in the equilibrium weak-field comparison regime, with the same $\theta$ also passing the ADM/Cartan and PPN gates below. If the residual can be made small only by assigning independent entropy, temperature, and stress records to each patch, then the equation-of-state analogy has not become a native closure. A Jacobson-type derivation additionally needs a universal area-entropy coefficient, local horizon equilibrium with vanishing expansion and shear at the reference event, the effective null-focusing identity, and the observer-level conservation relation in every admitted null direction. A small finite-window residual alone proves none of these conditions.

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
g_{\mu\nu}^{\mathrm{eff}}a_O^\mu a_O^\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbe51d89696051e8)

Here $a_O^\mu=D^2x_O^\mu/d\tau_O^2$ is the observer's covariant four-acceleration, with $\tau_O$ its derived proper time, and $\hbar$ is the reduced Planck constant in this comparison. The magnitude is proper acceleration, not coordinate acceleration. Its time component vanishes in the observer's instantaneous orthonormal rest frame, where the norm reduces to a spatial sum of squares; using $\gamma_{ij}^{\mathrm{eff}}a_O^ia_O^j$ in an arbitrary chart omits the time component. The flux projection must then agree with the effective stress-energy flux computed from that record, and the local conservation residual
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

must be small on the same windows. Here $\Delta E_\Omega^{(O)}$ is the change of the energy associated with the same boost current, and $dQ$ is its outward boundary flux; it is not an arbitrary laboratory-energy change. This two-term balance applies only when other boundary transfers, work, and the approximate generator's non-Killing contribution are negligible within the declared energy tolerance. For a symmetric conserved stress tensor, the remaining source term is $\nabla_\nu(T^{\mu\nu}\xi_\mu)=T^{\mu\nu}\nabla_{(\nu}\xi_{\mu)}$; outside the stated regime that term and every other boundary flux must enter the balance. Thus the local-horizon pass condition is not only $\mathcal{R}_{\mathrm{thermo}}\le\epsilon_{\mathrm{thermo}}$, but also $\mathcal{R}_{E,\partial\Omega}^{(O)}\le\epsilon_E$ and the weak-field ADM/Cartan gates for the same $\theta$. A concrete simulation protocol for this target is [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md).

##### Native Shared-Record Variation Target

Making the comparison record explicit is necessary for a derivation; it does not establish one. For a region $\Omega$, Physical Observer $O$, and finite analysis window $W$, use
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

Here $\mathcal{H}_{\Omega}^{W}$ is the retained path-history data on the window, $\mathcal{B}_{\partial\Omega}^{(O)}(W)$ is the set of distinguishable alternative boundary-history labels, $\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W}$ is the locally resolved Noether sea state, $O_W$ is the observer's clock, ruler, and readout state on the window, $\Pi_{\mathrm{eff}}$ is the projection to the observer-level fields $(N,u^i_{\mathrm{sea,eff}},\gamma_{ij}^{\mathrm{eff}},T_{\mu\nu}^{\mathrm{eff}})$, and $\mu_{\Omega,\theta}$ is the conditional measure over unresolved deterministic histories. This tuple is not a new substrate object. It only names the record that must supply entropy, temperature, flux, and effective metric data together.

Let $\delta_\ell$ denote an admissible local-horizon perturbation that keeps the observer, window, projection map, and comparison regime fixed while varying the resolved Noether sea state and boundary flux through the patch. At finite precision the label count is discrete, so the differentials below require a controlled continuum or thermodynamic limit, with the same binning convention and averaging prescription across variations. They are not derivatives of an arbitrary finite cardinality. The recovery target is
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

where $a_{\theta}$ is the derived dimensionless patch-area normalization for the retained record. The coefficient cannot be interpreted as a literal independent one-patch count: $\log|\mathcal{L}_a|=1/4$ would require $|\mathcal{L}_a|=e^{1/4}$, not the cardinality of a finite set. The coherent target is an area-normalized block entropy density. For a connected patch block $\mathcal U\subseteq\mathcal{P}_{\partial\Omega}$, let $\mathcal{L}_{\mathcal U}(\theta_{\Omega,O,W})$ be the joint retained boundary-wake label set on $\mathcal U$ after fixing the observer record and the edge data to the accuracy declared by $\epsilon_{\mathrm{local}}$. The local aligned-label density is
$$
s_{\mathrm{align}}(\theta_{\Omega,O,W})
=
\lim_{|\mathcal U|\to\infty}
\frac{1}{|\mathcal U|}
\log\left|
\mathcal{L}_{\mathcal U}(\theta_{\Omega,O,W})
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc5176b20f81a9de)

The displayed limit is shorthand for a compatible family of enlarged retained records and patch decompositions at fixed local intensive state; it cannot be taken inside one fixed finite $\theta_{\Omega,O,W}$. A local horizon application also needs scale separation: correlation length much smaller than the block size, and block size much smaller than the curvature and medium-variation scales. At fixed finite window it is a finite-block estimate with an explicit boundary error. The locality part of the theorem target is
$$
\log\left|
\mathcal{L}_{\mathcal U}(\theta_{\Omega,O,W})
\right|
=
|\mathcal U|\,s_{\mathrm{align}}(\theta_{\Omega,O,W})
+
\mathcal{O}\!\left(
|\partial\mathcal U|\epsilon_{\mathrm{corr}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eda386d9c5d781c2)

Here $|\partial\mathcal U|$ counts edge patches, $\epsilon_{\mathrm{corr}}$ bounds their dimensionless entropy correction, and $|\partial\mathcal U|/|\mathcal U|\to0$ is required along the limit family. Uniform correlation control and a vanishing relative patch-area error are required to infer an area density; finite correlation language alone is not a factorization proof. The normalization part is then the aligned-label statement
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

A flat-space refraction analogy is therefore useful only when it is kept at the correct level. A scalar $c_{\text{eff}}(\mathbf X,T)$ or scalar delay map can encode a first signal-path delay, but it is not by itself an effective metric. GR/PPN recovery requires the same Noether sea record to determine the observer-level lapse $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, drift $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, coframe coefficients $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, and spatial compliance $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, so clock, ruler, and signal projections cannot be tuned as separate channels.

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

with observer-channel speed $c_0=c_{\text{eff}}(\infty)$ in the common calibration. The displayed stationary, spatially isotropic terms determine the leading weak-field clock and lensing coefficients; they do not include all 1PN source-current or nonlinear-potential terms. The weak-field target is
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

In the stationary isotropic zero-shift chart, define $d\ell_h^2=h_{ij}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$. The null line element gives $dt_{\mathrm{eff}}=\sqrt{1-2\gamma_{\mathrm{PPN}}\Phi_N/c_0^2}\,d\ell_h/(Nc_0)$ to the stated order. Identifying this coordinate signal speed with the projected dressed channel is a shared-channel recovery condition. With that condition and a common reference calibration, PPN time-of-flight comparisons require
$$
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^k)}
=
\frac{\chi_{\text{sea}}(x_{\mathrm{eff}}^k)}{\chi_{\text{sea}}(\infty)}
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-27e8cb6647a21929)

so the coordinate travel time on a path $\Gamma$ expressed in the Euclidean reference chart is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}\,d\ell_h
$$

[View →](../../../../../equation-mapping.html#corpus-equation-365cb6acc6ef920c)

The integration measure is Euclidean reference length, not the null spacetime interval $ds_{\mathrm{eff}}$ or the compliance-weighted ruler length. For a first-order fixed-endpoint delay one may evaluate the perturbation along the unperturbed Euclidean path; recovering the bent ray requires extremizing the full path-time functional. These relations specify the first-order matching target
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

The complementary descriptions are:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md),
- clock-law extraction and coefficient comparison: [spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- final acceptance thresholds: [validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md).

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ coefficients predict Shapiro delay, lensing, redshift, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.
3. The long-distance GR-EFT correction to weak gravity is recovered from the same constitutive record, without treating the effective metric as microscopic ontology.

A proposed recovery that supplies only $c_{\text{eff}}(x_{\mathrm{eff}}^i)$ or $\chi_{\text{sea}}(x_{\mathrm{eff}}^i)$ therefore closes only a refractive signal model. It becomes a metric recovery candidate only after that scalar row is embedded in one shared clock/ruler/signal map for $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$.

### Weak-Field Geodesic Handoff (ADM Constitutive Subclass)

A spatially conformal subclass, in which all ruler lengths receive the same local scale factor, additionally restricts the zero-shift metric to
$$
u^i_{\mathrm{sea,eff}}=0,
\qquad
\gamma_{ij}^{\mathrm{eff}}=\Omega^2(n,\lambda)h_{ij},
\qquad
N=\Omega(n,\lambda)\xi
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a513771b431dbf92)

Here $\Omega(n,\lambda)>0$ is the dimensionless spatial-compliance scale, and $\lambda=R_{\perp}/R_{\perp,0}>0$ is the transverse envelope scale relative to a declared reference. The shape ratio $\xi=R_{\parallel}/R_{\perp}>0$ belongs to the same admitted axisymmetric envelope reduction. Neither $\Omega=\lambda$ nor $N=\Omega\xi$ follows from choosing zero shift: the latter is an additional constitutive ansatz linking envelope geometry to the stationary clock rate. In the asymptotically calibrated subclass $N\to1$ and $\Omega\to1$, it requires $\xi\to1$, so it selects a spherical reference envelope; a general oblate rest branch requires its own reference-normalized map.

Define the clock-channel potential by the observer-side lapse:
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)\equiv c_0^2\ln N(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big),
\qquad
N(x_{\mathrm{eff}}^i)=e^{\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)/c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-773a465df978f1bd)

The $c_0^2$ prefactor calibrates the observer-sector potential. The weak homogeneous branch also requires agreement between $c_f$ and $c_0$ within its declared $O(\epsilon_{\mathrm{LV}}c_0)$ budget after both speeds are expressed in common units. Naming that residual does not show that it satisfies an observational bound; the clock/ruler calibration and preferred-frame tests remain part of the recovery.

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

For a stationary zero-shift metric, write $\partial^i=h^{ij}\partial_{x_{\mathrm{eff}}^j}$ for the Euclidean-reference gradient. The time-time connection component is
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

Since $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, its coordinate-time derivative is exactly $c_0$. At an instant with $\mathbf v=0$, the coordinate-time geodesic acceleration is exactly $-c_0^2\Gamma^i_{00}$. Retaining only this term for a slowly moving test assembly gives
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
\approx
-\Gamma^i_{00}\left(\frac{dx_{\mathrm{eff}}^0}{dt_{\mathrm{eff}}}\right)^2
=
-\xi^{2}\partial^i\Phi_{\text{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60769808bf61c478)

The exact zero-velocity term equals $-N^2(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j\Phi_{\mathrm{eff}}$, since $N^2/\Omega^2=\xi^2$. At nonzero velocity the stationary zero-shift coordinate-time equation also contains $-\Gamma^i_{jk}v^jv^k+2v^iv^j\partial_j\ln N$. Consequently, on a smooth weak-field patch,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
|N^2-1|\,\left\|(\gamma_{\mathrm{eff}}^{-1})\nabla\Phi_{\text{eff}}\right\|_h
+\frac{\|\mathbf v\|_h^2}{L_{\mathrm{met}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f80bc28ba0203090)

where the metric-variation bound $L_{\mathrm{met}}$ controls the displayed connection and lapse-gradient terms. In the additional weak, slow limit $N,\Omega\to1$ and $\|\mathbf v\|_h^2/L_{\mathrm{met}}$ is negligible, giving the Newtonian acceleration $-h^{ij}\partial_j\Phi_N$ after potential matching.

PPN extraction for this constitutive subclass is defined canonically in [ppn-parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#ppn-parameters-and-the-euclidean-anchor), including the full $g_{00}$/$g_{ij}$ expansions, preferred-frame leakage map, and weak-field closure vector.

In that canonical map the exponential identity $N=e^{\Phi_{\mathrm{eff}}/c_0^2}$ fixes the quadratic coefficient only when the series is expressed in the constitutive potential $U_\Phi=-\Phi_{\mathrm{eff}}$. In the static isolated-source comparison where the remaining PPN potentials have their GR values or vanish, write $U_\Phi=U+D_2U^2/c_0^2+O(U^3/c_0^4)$. Then $\beta_{\mathrm{PPN}}=1-D_2$, so $\beta_{\mathrm{PPN}}=1$ requires $D_2=0$, equivalently $U_\Phi/c_0^2=U/c_0^2+O(U^3/c_0^6)$. That conversion is a constitutive obligation, not a consequence of the definition $\Phi_{\mathrm{eff}}=c_0^2\ln N$.

## General Relativity

General relativity (GR) describes gravity through a spacetime metric: a rule relating clock intervals, ruler distances, signal paths, and freely falling motion. This chapter collects the observer-level measurements that the Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, must recover from its assembly and medium dynamics. A constitutive map is the response law connecting those dynamics to the measured quantities.

The [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md) and [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) chapters develop that map. The parameterized post-Newtonian (PPN) framework compares weak-gravity corrections to Newtonian motion through dimensionless coefficients. The formulas below are effective comparison targets; none is an added premise of the architrino acceleration law.

The open recovery question is whether one constitutive law can reproduce the network of tested GR observables. Redshift compares clock or received signal frequencies; Shapiro delay measures excess signal travel time; lensing measures path deflection; orbital precession measures the turning of an orbit; equivalence-principle tests compare gravitational responses; and gravitational-wave tests measure propagating gravitational disturbances. These observations must be consistent with the same law and its declared domain.

### Purpose

This chapter specifies recovery conditions, not a completed recovery. A standard comparison identity can be derived within GR while its realization by architrino dynamics remains open. The quantum-gravity effective-field-theory comparison and strong-field alignment hypothesis below have separate conditional scopes; they are not established observations merely because they appear beside tested classical effects.

### Core Interpretation

The underlying route begins with [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers carrying polarity and persistent path history. Their emitted causal wakes are expanding records of earlier positions. A receiver is accelerated when a wake reaches its current event: the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) sums the admitted delayed contributions, including positive-delay self-hits when present. On a simple-root chart its acceleration weight is $W^{\mathrm{acc}}=c_f/|D_t|$, where $D_t$ is the transmitter-side derivative of the causal-root condition. Root completeness, nonzero separation, transversality, and a declared continuation at singular events are prerequisites for using that route.

The layer assignments are:

- the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) is the fixed spatial container with metric $h_{ij}$,
- [absolute time](../../../../markdown/aaa/foundations/absolute-time.md) $T$ orders the constituent histories,
- and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the assembly-level medium of coupled neutral braids occupying that container.

At the observer level, the same Noether sea must generate the effective metric behavior usually attributed to curved spacetime. Therefore the phenomenology requirement is:

$$
\text{medium response}
\;\Longrightarrow\;
\text{effective metric observables}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f070483765b65d62)

The closure demand is not merely qualitative resemblance. The same constitutive map must jointly recover redshift, Shapiro delay, light bending, perihelion precession, and gravitational-wave propagation in the regimes where GR is already tested.

For one experiment, its clock, ruler, signal, source, and boundary channels must be projections of one compatible record. Different experiments can have different source and medium states, all evolved under the same constitutive law; the common-law requirement does not make their histories identical. Write $\theta$ for that law's coefficients together with the declared records and calibrations for the comparison family.

The observer chart $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$ is reconstructed from those records; it is not a relabeling of $(T,\mathbf X)$. A physical observer is an assembly whose clocks and rulers supply that reconstruction, and $\tau$ denotes its derived clock readout. An effective metric encodes those responses. Its connection compares directions at neighboring events and its curvature describes their variation; neither is curvature of the void. Recovering selected observables does not derive Einstein's field equations, which relate effective curvature to effective stress and energy. That stronger recovery still requires the common constitutive dynamics and their conservation and domain assumptions.

> Claim grade: guessed for the proposed Noether-sea realization of GR; the formulas below specify its recovery targets. Falsifier: independently evolved admissible histories whose observer records miss an applicable measured bound, or require incompatible constitutive laws for the same calibrated channels, reject the candidate in that domain. An absent derivation leaves recovery unresolved rather than demonstrating a failed prediction.

Notation convention: $G_N$ denotes the standard Newtonian and low-energy GR comparison constant in the observable benchmark formulas below. $G_{\mathrm{eff}}(\theta)$ denotes the recovered constitutive coefficient of a candidate Noether sea record, and a validated weak-field branch must make $G_{\mathrm{eff}}(\theta)\to G_N$ in the same record that recovers the clock, lensing, PPN, and gravitational-wave channels. Nearby standard-comparison formulas may retain $G$ as ordinary GR shorthand; this chapter writes $G_N$ when the constant belongs to the benchmark rather than to the constitutive map.

#### Network evidence and nuisance separation

One precise test is insufficient to establish an effective metric branch: agreement can share calibration or source-model errors with the prediction. A joint comparison therefore retains nuisance parameters, quantities such as calibration offsets that affect the measurement without being the gravitational effect under test. One possible network statistic is
$$
\mathcal{E}_{\mathrm{GR}}(\theta)
=
\mathbf{r}_{\mathrm{net}}(\theta)^{\mathsf T}
C_{\mathrm{net}}^{-1}
\mathbf{r}_{\mathrm{net}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9aea7b28c80cb8ea)

where $\mathbf{r}_{\mathrm{net}}$ contains prediction-minus-observation residuals for the claimed channels, including cosmic microwave background (CMB) inferences only when their cosmological and foreground assumptions are declared. The covariance $C_{\mathrm{net}}$ records their uncertainties and correlations, including calibration and source-model uncertainty. It must be invertible on the retained residual space; redundant components require restriction to an independent subspace. This quadratic statistic is dimensionless when residuals and covariance use consistent units. An acceptance claim additionally needs a specified likelihood or sampling distribution, uncertainty treatment, and threshold. Naming the statistic supplies none of them.

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

Here $\prec_{\mathrm{eff}}$ and $\prec_{\mathrm{GR}}$ are the inferred and comparison causal orders on the same sampled events; $d_{\mathrm{ord}}$ is a declared dimensionless mismatch of those orders. The norm $\|\cdot\|_W$ measures clock-rate mismatch over the declared observation window, and $\lambda_\tau,\lambda_{\mathrm{PF}}>0$ are fixed dimensionless diagnostic weights. These choices and the event sample must be specified before evaluation. The clock term tests local scale only on that sample. A small weighted sum does not replace individual preferred-frame bounds, since a small weight can conceal an excessive coefficient. This structural diagnostic supplements the separate observable tests below.

The labels $\tau_{\mathrm{eff}}$ and $\tau_{\mathrm{GR}}$ mark the candidate observer-record clock readout and the GR comparison clock readout. They are scale readouts in the effective observer layer, not additional substrate time variables. The observer cannot be allowed to recover one causal story from photons, a different clock story from matter, and a third timing story from gravitational waves. The tested regime must look like one effective spacetime to the Physical Observer.

#### Global continuation and cosmic-censorship comparison

Global hyperbolicity supplies a GR setting with Cauchy surfaces, each intersecting every inextendible causal curve once, on which initial data can determine a development under the field equations. A Cauchy horizon bounds the region determined by such data. Cosmic censorship comprises conjectures about the visibility or extendibility of singular behavior, not a general proved continuation rule. These are observer-level comparison tools, not substrate assumptions in $\mathbb{A}\mathbb{A}\mathbb{A}$, whose dynamics use absolute timespace and path history. Where a metric comparison loses unique continuation, the native account must identify the histories and boundary data on which its continuation claim depends.

The [Master Equation's finite-continuation criterion](../../../../markdown/aaa/dynamics/master-equation.md#finite-continuation-criterion-for-global-comparisons) supplies a conditional comparison target. For a compact region $\Omega$ and absolute-time window $W=[T_i,T_f]$, specify a continuation map from compatible initial history and boundary data,
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

where $X_\Omega(T_i)$ denotes the subsystem's instantaneous state, $\mathcal H_\Omega^{<T_i}$ its required retained history, $\mathcal B_{\partial\Omega}|_W$ the incoming boundary wake record, and $N_{\text{sea}}|_{\Omega\times W}$ the compatible medium history. This last symbol is a sea-state record, not the metric lapse $N$. It must be evolved consistently or declared as prescribed environmental data; supplying the desired future sea history is not a prediction of it. The set $\mathcal S_\Omega(T_f)$ contains endpoint states or explicitly resolved branch labels.

The finite-family criterion inherits the dynamics owner's regularization, compatible-history, distance, transversality, and bounded-branch assumptions. It is a conditional target, not a theorem that finite observer data determine a unique future or that every sharp-root singularity has a continuation. An empty, nonfinite, or unaccountably selected family fails that specified criterion. GR global-extension tools remain available for comparison before recovery; claiming that their conclusions describe the same physical records additionally requires the clock, causal-order, motion, and signal comparisons to pass. Finite continuation alone proves neither global hyperbolicity nor cosmic censorship.

### Weak-Field Observables That Must Match GR

#### Gravitational redshift and clock rates

The clock channel must reproduce
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
\approx
\sqrt{1+\frac{2\Phi_N}{c_0^2}-\frac{\|\mathbf w_{\mathrm{eff}}\|_h^2}{c_0^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a10eac89a256ff66)

in a stationary weak-field zero-shift comparison chart, where $\mathbf w_{\mathrm{eff}}=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}-\mathbf u_{\mathrm{sea,eff}}$ is the clock velocity relative to projected sea flow and the norm uses the Euclidean reference metric $h$. The Newtonian comparison potential is $\Phi_N=-G_NM/r$ for an isolated spherical source, with zero at infinity; $M$ and $r$ are observer-level source mass and radial coordinate. Both $|\Phi_N|/c_0^2$ and $\|\mathbf w_{\mathrm{eff}}\|_h^2/c_0^2$ are small. The square root fixes leading terms only, not second-order PPN coefficients. The speed $c_0\equiv c_{\text{eff}}(\infty)>0$ is calibrated in the homogeneous reference region. Primitive wake speed $c_f$ remains distinct until a clock, ruler, and signal derivation relates them. For two identically calibrated static clocks this gives the rate comparison
$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec3c33cf92fa48dd)

Here $\Delta\Phi_N=\Phi_N(B)-\Phi_N(A)$ and $\Delta\nu/\nu=[\nu_B-\nu_A]/\nu_A$, with both clock rates referred to the same coordinate time. A higher clock has a positive rate shift. For a photon sent from $A$ to $B$, the received-to-emitted local frequency ratio instead obeys $\nu_{B\leftarrow A}/\nu_A^{\mathrm{emit}}\approx1-[\Phi_N(B)-\Phi_N(A)]/c_0^2$ in this stationary comparison: upward propagation is redshifted. The endpoint clock factors explain the opposite signs; the photon and clock-rate comparisons must not be interchanged.

Clock-comparison experiments provide observer-level constraints. Near Earth's surface the leading rate shift is $gL/c_0^2$, with local gravitational acceleration $g$ and upward height difference $L$. Bothwell and collaborators measured a frequency gradient consistent with this relation across a millimetre-scale strontium sample, using spatially resolved optical-clock spectroscopy; see the source note below. This measurement tests the clock comparison, not the proposed Noether-sea mechanism. The same constitutive law must describe separated clocks and extended samples while retaining the signal and ruler calibration used for delay and lensing.

#### Shapiro delay

For a stationary, isotropic, zero-shift comparison chart, define Euclidean reference path length by $d\ell_h^2=h_{ij}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$. Conditional on the dressed signal sharing the effective metric's null paths, its coordinate speed is $c_{\text{eff}}=d\ell_h/dt_{\mathrm{eff}}$, and one-way path time is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)\,d\ell_h
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

Here $\bar\chi_{\text{sea}}$ is the reference-normalized delay factor and $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ uses common speed units. The integration measure is not the null spacetime interval, which vanishes on a light ray, or the local ruler length, which would count spatial compliance twice. The [metric derivation](../../../../markdown/aaa/spacetime/emergent-metric.md#minimal-weak-field-constitutive-map-for-ppn-matching) supplies this distinction. The displayed expansion is a PPN matching condition, not a derived sea response.

For a spherical static source, let $r_1,r_2$ be the endpoint distances from its center and $R$ their separation in the same reference chart. Integrating the first-order perturbation along the unperturbed path gives the excess over $R/c_0$,
$$
\Delta t_{\mathrm{eff}}
=
\frac{(1+\gamma_{\mathrm{PPN}})G_N M}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+O(c_0^{-5})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-427734dc658fe45c)

where the ray stays outside the source and $G_NM/(b c_0^2)\ll1$ at closest approach $b>0$. The logarithm requires $r_1+r_2>R$. The GR coefficient is the target at the precision and nuisance assumptions of the selected solar-system dataset; a ray through the point-source singularity is outside this approximation.

#### Light bending

The same refractive map must recover the 1PN deflection law
$$
\Delta\theta
\approx
2(1+\gamma_{\mathrm{PPN}})
\frac{G_N M}{b\,c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9ce389605d4f4747)

for the asymptotic deflection of a ray with impact parameter $b$ around the same isolated source. Finite-distance endpoints, source multipoles, motion, and higher-order corrections require their corresponding terms. In the GR-matching limit $\gamma_{\mathrm{PPN}}=1$, this reduces to the standard
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

must all be reproduced by the same constitutive law already used for light and clock observables. Here $\gamma_{\mathrm{PPN}}$ measures the spatial-distance response per unit potential and $\beta_{\mathrm{PPN}}$ the nonlinear clock-metric response. This reduced set does not exhaust PPN: preferred-location and momentum-conservation coefficients also require the tests described in [Remaining PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#remaining-ppn-parameters).

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

In this projection, $N$ is the clock-rate lapse, $u^i_{\mathrm{sea,eff}}$ is the projected drift, $e^a{}_i$ maps coordinate increments to local ruler components, and $\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_ie^b{}_j$ is the spatial compliance metric. The potential $\Phi_{\text{eff}}$ is extracted from the clock response; $\chi_{\text{sea}}$ comes from the same calibrated signal channel. These are outputs to derive, not independent fit inputs.

A reduced observable residual bundle is
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
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon_{\mathrm{acc}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99b0736a014e40c6)

The symbols $R_{\mathrm{red}},R_{\mathrm{Shap}},R_{\mathrm{lens}},R_{\mathrm{1PN}}$ denote dimensionless prediction-minus-comparison residuals, each divided by a declared positive uncertainty scale. For the displayed acceleration diagnostic, $\|\cdot\|_W$ is the supremum of the Euclidean-reference vector norm along the selected observer trajectory over its mapped window, and $\varepsilon_{\mathrm{acc}}>0$ is an acceleration-valued floor fixed before comparison. Near zero comparison acceleration an absolute error bound must accompany this ratio; increasing the floor cannot count as improved agreement.

The acceleration formula tests only the leading Newtonian limit in a stationary zero-shift Cartesian reference chart, with slow test motion and $\Phi_{\mathrm{eff}}\to\Phi_N$. For $\Phi_{\mathrm{eff}}=c_0^2\ln N$, the exact zero-velocity metric term is $-N^2(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j\Phi_{\mathrm{eff}}$; finite velocity also introduces connection terms. The omitted terms must lie below the comparison tolerance, as detailed in the [weak-field geodesic handoff](../../../../markdown/aaa/spacetime/emergent-metric.md#weak-field-geodesic-handoff-adm-constitutive-subclass). A passing $R_{\mathrm{acc}}$ therefore does not establish 1PN motion. The trajectory must be independently projected from constituent dynamics; generating it with the comparison acceleration would test only that imposed model.

All channels must use the compatible outputs of the same $\theta_W$. Replacing a clock, drift, ruler, potential, delay, or boundary record independently to improve one channel produces separate fits. This reduced vector supplements, and does not replace, equivalence-principle and remaining PPN constraints.

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

where $\Delta\varpi_{J_{2,\odot}}$ is the contribution from the Sun's quadrupole moment and the remaining terms collect other modeled ephemeris corrections. A constitutive map cannot improve its PPN fit by silently moving a mismatch into $\Delta\varpi_{J_{2,\odot}}$ or by using a solar-interior assumption inconsistent with helioseismology and light-deflection records. The precession test closes only after the nuisance record is fixed independently enough that $\Delta\varpi_{\mathrm{PPN}}$ is the recovered effect rather than a residual after subtraction.

For a weak-field test-body orbit about a spherical nonrotating source, with semi-major axis $a>0$ and eccentricity $0<e<1$, the GR perihelion advance is
$$
\Delta\varpi_{\mathrm{GR}}
=
\frac{6\pi G_N M}{a(1-e^2)c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96ce30e1a9d51242)

per orbit, with $G_NM/[a(1-e^2)c_0^2]\ll1$. In the conservative PPN comparison with other parameters at their GR values and source multipoles treated separately, this is the special case of
$$
\Delta\varpi_{\mathrm{PPN}}
=
\frac{2\pi G_N M}{a(1-e^2)c_0^2}
\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46317199ba600344)

so Mercury-type precession is a joint test of the same spatial-compliance coefficient that controls lensing and the same nonlinear clock coefficient that controls $\beta_{\text{PPN}}$.

#### Low-Energy Quantum-Gravity EFT Benchmark

A low-energy effective field theory (EFT) separates long-distance predictions from unresolved short-distance physics. Quantum GR supplies a useful conditional comparison of this kind. Its quantum correction below is a theoretical prediction, not an established measurement or an additional substrate premise. Agreement is required when claiming recovery of that specified EFT limit; it is not an unconditional acceptance condition for the tested classical GR effects.

For two slowly moving effective masses $m_1,m_2>0$ at observer-coordinate separation $r>0$, retain the schematic potential comparison

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

where $\hbar$ is the observer-level reduced Planck constant. The coefficients $\alpha_{\mathrm{1PN}}$ and $\alpha_\hbar$ are fixed only after specifying the effective particle content, coordinate and momentum conventions, and potential prescription, including whether lower-order iterations have been subtracted. Both $G_N(m_1+m_2)/(c_0^2r)$ and $G_N\hbar/(c_0^3r^2)$ must be small. The potential is not itself an invariant observable. Bjerrum-Bohr, Donoghue, and Holstein derive the correction and discuss these prescriptions in the source below. With identical prescriptions on both sides, a dimensionless diagnostic is

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

This is a conditional matched-convention diagnostic. A physical recovery test compares the resulting scattering or interference observable, including the kinetic and iteration terms needed in that convention. A coordinate change can alter a displayed potential coefficient without changing that observable. The candidate $V_{\mathbb{A}\mathbb{A}\mathbb{A}}$ must be derived from the same admitted assembly and medium law as the classical tests; it cannot be filled in by copying the benchmark. No such quantum derivation is supplied here. Its falsifier would be a nonzero observable mismatch beyond controlled truncation and extraction errors in the specified EFT domain, not a raw potential mismatch between different conventions.

Massive-superposition entanglement experiments add a second low-energy quantum-gravity benchmark. If two isolated massive probes acquire an entanglement witness through gravity alone, the retained data product is the branch-dependent interaction phase, not a decision between graviton-field ontology and quantized-geometry ontology. The corresponding validation packet in [Massive-Superposition Gravity Validation Packet](../../../../markdown/aaa/validation/massive-superposition-gravity.md) requires the same effective-metric record $\theta$ to generate the mediated-entanglement phase while keeping non-gravitational coupling residuals bounded and preventing the gravity-side response from becoming an unmodeled which-path record.

### Equivalence-Principle Channels

The weak equivalence principle requires test bodies of different composition to share the same gravitational acceleration under matched conditions. The strong principle additionally tests the influence of gravitational binding energy and other self-gravity effects. For compact test assemblies $A$ and $B$ falling toward an external source $S$, let $a_A^S,a_B^S$ be positive accelerations projected along the same source-directed measurement axis, with nonzero sum. Define the composition residual
$$
\eta_{AB}^{S}
=
\frac{2(a_A^S-a_B^S)}{a_A^S+a_B^S}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-de660d9fa2c2b12b)

The weak equivalence test requires $\eta_{AB}^{S}$ to vanish within the material-composition bounds while the same clock, signal, and PPN record is held fixed. The point is not to assume equivalence as a substrate axiom, but to recover it as an observer-level constraint on the same record $\theta_W$. If local clock/ruler states for different apparatuses are allowed to absorb the gravitational response through material-dependent scale factors $\lambda_A(x_{\mathrm{eff}}^i;\theta_W)$, the residual must also satisfy
$$
\mathcal{R}_{\mathrm{scale\text{-}EP}}^{S}(\theta_W)
=
\max_{A,B}
\frac{
\left\|
\nabla\ln\!\left(\lambda_A/\lambda_B\right)
\right\|_W
}{
\left\|\nabla\Phi_{\text{eff}}\right\|_W/c_0^2+\varepsilon_{\mathrm{scale}}
}
\ll 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-54307dedc8cf70bd)

with the source assembly, boundary wake data, cosmological record, and PPN coefficients held fixed. Here $\lambda_A,\lambda_B>0$ are dimensionless material calibration factors, the gradient has components $(\nabla f)^i=h^{ij}\partial_{x_{\mathrm{eff}}^j}f$ in the declared effective reference chart, and $\varepsilon_{\mathrm{scale}}>0$ has inverse-length units, unlike $\varepsilon_{\mathrm{acc}}$. The norm is taken over the same sampled domain. The symbol $\ll1$ states a diagnostic target; an experiment needs an explicit tolerance and an apparatus-response derivation relating scale gradients to measured differential acceleration. A constant calibration ratio is invisible to this gradient diagnostic, so it does not replace $\eta_{AB}^S$ or clock-universality tests.

One candidate mechanism assigns imposed assembly acceleration and a Noether sea gradient a common internal response. This is a hypothesis to derive, not a necessary microscopic mechanism established by the equivalence principle. The tested requirement is universal observer-level response within measured bounds. Any proposed dependence of inertia on the surrounding matter distribution must use the same environmental record and predict its composition residual rather than remove that residual by an apparatus-specific adjustment.

Equivalence recovery therefore couples the torsion-balance test, clock-comparison test, and cosmological/boundary record: a Mach-like dependence of inertial standards on the surrounding matter distribution is admissible only if it is common to the accepted observer record and leaves no composition-dependent acceleration residue.

A separate strong-equivalence diagnostic tests whether gravitational self-energy or medium binding changes the acceleration of extended bodies:

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

where $\Delta a_{\mathrm{self}}$ is the differential acceleration attributed to self-gravity after other effects are controlled, $a>0$ is the common external acceleration scale, and $E_{\mathrm{grav},K}<0$ is the signed gravitational binding energy of body $K$. The denominator must be nonzero and uses effective inertial masses $m_K$. This weak-self-gravity sensitivity is a lunar-ranging comparison target; exporting it to compact bodies requires a body-dependent strong-field response calculation. It does not exhaust the strong equivalence principle. Active source mass, passive gravitational response, inertial response, and energy-defined mass must share a consistent calibration in the nonrelativistic limit. A material-composition or self-gravity residual above its applicable bound falsifies that recovery claim even if the light and clock tests pass.

### Preferred-Frame Leakage

Because the ontology contains an absolute frame, the observer-level phenomenology must still suppress preferred-frame signatures.

That means the preferred-frame PPN coefficients
$$
\alpha_1,\alpha_2,\alpha_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46405bc13afbbc08)

must satisfy their applicable observational bounds; $\alpha_3$ also tests effective momentum nonconservation. They are dimensionless response coefficients, not group speeds. A predicted residue exceeding a bound rejects the candidate in the tested regime. Pulsar constraints require the declared extension from weak-field PPN coefficients to self-gravitating bodies; an arbitrary strong-field coefficient cannot be substituted for its weak-field counterpart.

### Gravitational-Wave Channel

The Noether sea picture must recover the observed near-luminal propagation of gravitational disturbances:
$$
\left|\frac{v_{\mathrm{GW}}-c_0}{c_0}\right|
\le
\varepsilon_{\mathrm{GW}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-be17db24e72ca918)

Here $v_{\mathrm{GW}}$ is the gravitational signal's group speed in the same calibration as $c_0$, and $\varepsilon_{\mathrm{GW}}$ represents the declared tolerance of the [GW Speed](../../../../markdown/aaa/validation/constraint-ledger.md#gw-speed) comparison. Actual timing bounds can be asymmetric and depend on source emission delays and propagation history; this symmetric summary does not replace them. The Noether-sea interpretation assigns gravitational waves to collective disturbances of the medium, a constitutive hypothesis whose propagation and detector response remain to be derived.

The falsifier is a predicted timing, dispersion, or polarization residual outside the applicable measurement's uncertainty model and frequency range. Polarizations describe independent patterns of detector deformation. GR predicts two tensor patterns; a test favoring pure tensor signals over pure scalar or vector alternatives does not by itself exclude every mixed signal. The source note identifies this limitation in the GW170817 analysis. A proposed large-distance modification must retain compatibility with these tests under the same law and declared environmental states.

### Strong-Field Regime

Strong-field departures must also respect tested compact-object observations. Passing weak-field tests does not by itself constrain every strong-field continuation or authorize disagreement with measured strong-field behavior.

The [canonical strong-field alignment condition](../../../../markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition) specifies a candidate assembly boundary. Its relation to an effective horizon is a constitutive hypothesis. Local speed or alignment conditions alone do not establish an event horizon, which in the GR comparison is the boundary of events able to send outgoing signals to the asymptotic exterior. That claim needs the global signal continuation; finite substrate time or flat void geometry does not supply it or prove singularity resolution.

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

for the Schwarzschild comparison branch, a spherical, nonrotating, uncharged, asymptotically flat exterior. These are areal radii, defined by sphere area $4\pi r^2$, not the isotropic radial coordinates used in a weak-field optical chart. The first is the comparison horizon radius, the second the unstable circular null-orbit radius, and the third the innermost stable circular orbit for massive test bodies. Their realization in the substrate is open. A proposed alternative must derive its exterior signal and orbit predictions and compare them with measured quantities; simply listing these scales or naming an alignment state does not pass that comparison.

### Closure Targets

Classical recovery on a declared domain requires all of the following from one constitutive law with compatible records:

1. clock slowing / redshift,
2. Shapiro delay,
3. light bending,
4. 1PN orbital corrections,
5. composition and self-gravity equivalence tests, with consistent mass calibration,
6. negligible preferred-frame leakage in tested regimes,
7. gravitational-wave speed, dispersion, and two-mode polarization compatibility,
8. non-arbitrary finite-boundary continuation wherever a strong-field or cosmological comparison invokes global extension assumptions.

The same law must survive every applicable test. Finite-boundary continuation remains conditional on the stated dynamics domain. Recovering the quantum-gravity EFT limit adds the matched-observable comparison described above when that stronger claim is made; it is separate from this classical acceptance set.

### Falsification Gate

The GR-observables interface fails if any of the following occur:

- redshift, lensing, and Shapiro delay require different constitutive parameter choices,
- Newtonian acceleration, orbital motion, or composition and self-gravity responses exceed their applicable bounds,
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
\mathcal{C}_{\text{EP}}
\cap
\mathcal{C}_{\text{PF}}
\cap
\mathcal{C}_{\text{GW}}
\cap
\mathcal{C}_{\text{cont}}
\neq \varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-05d464d7eef89585)

Each $\mathcal C$ is the subset of the declared candidate-law and record space satisfying the named test at fixed tolerances; $\mathcal C_{\text{1PN}}$ includes the Newtonian limit and applicable remaining PPN constraints, and $\mathcal C_{\text{EP}}$ includes composition, self-gravity, and mass-calibration tests. The intersection is a necessary compatibility condition, not a proof that a candidate exists. An empty intersection rejects that candidate family and domain. Failure to construct or search the family leaves existence unresolved and does not establish emptiness or exclude every possible constitutive law.

### Source Notes

- Clifford M. Will, [*The Confrontation between General Relativity and Experiment*](https://arxiv.org/abs/1403.7377) (2014), sections 3.2 and 4.1–4.2, defines the PPN coefficients and the domains of the light-propagation and perihelion comparisons. These are effective-theory benchmarks.

- Tobias Bothwell and collaborators, [*Resolving the gravitational redshift within a millimeter atomic sample*](https://arxiv.org/abs/2109.12238), arXiv:2109.12238, published in *Nature* 602, 420–424 (2022), report spatially resolved strontium-clock spectroscopy consistent with the gravitational frequency gradient. This supports the clock measurement, not an Architrino constitutive derivation.
- N. E. J. Bjerrum-Bohr, J. F. Donoghue, and B. R. Holstein, [*Quantum Gravitational Corrections to the Nonrelativistic Scattering Potential of Two Masses*](https://arxiv.org/abs/hep-th/0211072) (2003), especially sections 2.1 and 4.1, derive a long-distance quantum comparison and specify potential and coordinate conventions. This is theoretical EFT support, not an observation of the correction.
- B. P. Abbott and collaborators, [*Tests of General Relativity with GW170817*](https://dcc-lho.ligo.org/LIGO-P1800059-v9/public) (2019), constrain selected propagation and polarization alternatives. The polarization analysis compares pure tensor, vector, and scalar hypotheses; it explicitly leaves mixed-mode content outside that test.

### Related Chapters

- [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- [ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- [proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- [gravitational-waves.md](../../../../markdown/aaa/spacetime/gravitational-waves.md)
- [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md)
- [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md)
- [../validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)

## PPN Parameters

The **parameterized post-Newtonian (PPN) framework** is an observer-level weak-field expansion that assigns dimensionless coefficients to the ways a gravity model may differ from general relativity. This chapter is the canonical home for the PPN comparison used by the spacetime constitutive map. It treats the standard PPN formulas and measured bounds as recovery targets: the Noether sea clock, ruler, signal, orbital, and orientation channels must reproduce them from one constitutive record rather than importing metric spacetime as substrate ontology.

The native starting point is the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md): each architrino, a polarity-bearing point transceiver, receives acceleration contributions from all admitted past emissions whose causal wakes reach it. Those emissions propagate through the fixed [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) in [absolute time](../../../../markdown/aaa/foundations/absolute-time.md). The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the ambient assembly population. Its response and physical clock and ruler records must determine the observer chart through the open map $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record})$ described in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md). Fitting PPN coefficients does not derive this map.

The comparisons assume a stationary, weak, slowly moving source system in the near zone, a standard PPN gauge, and common asymptotic clock and length calibration. Let $\epsilon_{\mathrm{PN}}\ll1$ be the dimensionless ordering scale, with $U/c_0^2=O(\epsilon_{\mathrm{PN}})$ and source or frame speeds divided by $c_0$ of order $\epsilon_{\mathrm{PN}}^{1/2}$. Scalar optical formulas also assume isotropic, nondispersive propagation and the stated zero-shift branch. Homogeneous Noether sea equilibrium and a shared clock/ruler/signal response remain recovery hypotheses. New numerical work uses $c_f=1$; dimensional observer benchmarks are reporting-unit conversions and do not set $c_f=c_0$.

### Canonical Symbols

- $n$: normalized Noether braid density, with $\rho_{\text{NS}}=\rho_{\text{NS},0}n$.
- $\chi_{\text{sea}}$: Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field PPN comparisons.
- $\Phi_N$: Newtonian benchmark potential.
- $\Phi_{\text{eff}}$: constitutive effective potential from the clock channel.
- $U\equiv -\Phi_N>0$: positive PPN expansion variable (default).
- $U_{\Phi}\equiv -\Phi_{\text{eff}}>0$: constitutive-channel variant used when expanding directly in $\Phi_{\text{eff}}$.
- $C_2^{(U)}$ and $C_2^{(\Phi)}$: second-order clock coefficients in expansions using $U$ and $U_{\Phi}$, respectively. The undecorated $C_2$ in the numerical reduced-fit sections means $C_2^{(U)}$.
- $a_\chi$: first-order clock-channel response defined by $\ln[\chi_{\text{sea}}/\chi_{\text{sea}}(\infty)]=a_\chi U/c_0^2+O(U^2/c_0^4)$; the signal-channel value is $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$.
- $U_{ij}$: standard PPN anisotropic potential, $U_{ij}=G\int\rho' s_i s_j/\|\mathbf s\|^3\,d^3x'_{\mathrm{eff}}$, with $\mathbf s=\mathbf x_{\mathrm{eff}}-\mathbf x'_{\mathrm{eff}}$.
- $V_i$: standard PPN matter-current potential, $V_i=G\int\rho'v_i'/\|\mathbf s\|\,d^3x'_{\mathrm{eff}}$; it has units of potential times velocity.

Here $G=G_N$ is the observer-calibrated Newtonian coupling, $M$ is effective source mass, and $\rho'$ is comparison matter mass density, distinct from Noether braid number density $\rho_{\mathrm{NS}}$. Primed matter positions and velocities belong to the same effective chart and comparison epoch. These instantaneous PPN potentials summarize an effective expansion, not primitive instantaneous interactions. Spatial indices run from 1 to 3. The reference metric $h_{ij}$ and its inverse $h^{ij}$ are the Euclidean reference metric carried into that chart; $U$, $U_\Phi$, and $U_{ij}$ have speed-squared units. Identifying native fields with their observer projections requires the declared map even when their symbols are shared.

### Mapping to PPN Constraints

1. **Shapiro Delay**: Compare the GR coordinate travel-time excess, which depends on temporal and spatial metric coefficients, with the projected Noether sea signal delay.
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

Here $\mathbf r$ points from the central source to the gyroscope, $\mathbf v=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}$ is its comparison-chart velocity, and $\nabla$ differentiates that chart's Euclidean reference coordinates. The cross product describes observer-level orientation transport, not an architrino acceleration term. Substituting $\nabla U=-GM\mathbf r/r^3$ gives the second expression and the GR comparison coefficient $3/2$ when $\gamma_{\mathrm{PPN}}=1$. The closure residual must compare the transported assembly-orientation frame with this estimator using the same effective metric record as Shapiro delay and lensing.

### Testing the Euclidean Anchor (Shapiro Delay)

1. **The Test**: Calculate travel time of a signal from Earth to a probe behind the Sun using the Euclidean straight-line anchor supplied by the $\mathbb{U}_{\text{now}}$ state record.
2. **Signal-path approximation**: Evaluate the first-order fixed-endpoint delay on the unperturbed straight path in the Euclidean reference chart. A spatially varying signal response generally bends the ray; its trajectory must be recovered from the same medium response. Straightness of the reference path does not establish straightness of the physical signal.
3. **Comparison**: Contrast $\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}$ with the GR weak-field form.
4. **$\mathbb{U}_{\text{now}}$ Role**: This complete state includes positions and retained histories needed by delayed dynamics. It supplies substrate geometry; observer endpoints and timing require its clock, ruler, and signal projection.

### Explicit Weak-Field Noether Sea Delay Map (PPN $\gamma$)

On the stationary isotropic branch, adopt the following observer-level recovery ansatz. The effective coordinate speed is measured per Euclidean reference length and effective coordinate time. Identifying it with the projected dressed signal channel requires a common calibration and the lapse and ruler response from the same record:
$$
\bar{\chi}_{\text{sea}}(\mathbf x_{\mathrm{eff}})
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf x_{\mathrm{eff}})}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf x_{\mathrm{eff}})
= 1 - (1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(\mathbf x_{\mathrm{eff}})}{c_0^2}
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

For fixed emitter and receiver endpoints, let $\Gamma$ be the unperturbed straight path in the effective chart's Euclidean reference metric. To first order,
$$
t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(\mathbf x_{\mathrm{eff}})\,ds
=\frac{R}{c_0}+\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e40463434fdc8ebb)

where $ds^2=h_{ij}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$ and $R=\int_\Gamma ds$ is the reference endpoint separation. These equalities retain only first-order delay. For fixed geometry away from a caustic or occultation, the omitted path and index corrections are $O((R/c_0)\epsilon_{\mathrm{PN}}^2)$. The leading delay is
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma (\bar{\chi}_{\text{sea}}-1)\,ds
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{R}{c_0}\epsilon_{\mathrm{PN}}^2\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c4d819a3eb58620c)

For emitter and receiver radii $r_1,r_2$, respectively, and $0<R<r_1+r_2$, with the ray outside the source and weak field everywhere, evaluating the line integral gives
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{R}{c_0}\epsilon_{\mathrm{PN}}^2\right)
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

Here $t_{\text{obs}}$ is the one-way observation converted to the declared coordinate-time calibration, with motion, plasma, and instrument corrections accounted for; $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_0$. This is a leading-order estimator, not a raw stopwatch reading.

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
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Parameterizes second-order clock/medium response. Attribution to self-hit or a particular Noether sea mechanism remains an unproved constitutive interpretation.
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
* **Constitutive leakage ansatz:** Let $\mathbf w$ be the velocity of the barycentric comparison chart relative to the selected preferred frame. Identifying that frame with a locally uniform Noether sea frame is a hypothesis; it requires projecting the native difference $\mathbf V_{\mathrm{cm}}-\mathbf u_{\mathrm{sea}}$ into the observer chart. Individual matter velocities in that chart remain separate. Standard PPN coefficient extraction treats $\mathbf w$ as constant on the comparison window; spatially varying entrainment requires a separate extension. Write the retained preferred-frame terms as
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

In the standard PPN gauge, the coefficient of $-w_iU/(2c_0^3)$ is $\alpha_1-2\alpha_2$. Matching this and the independent anisotropic and $g_{00}$ terms gives
$$
\boxed{\alpha_1=\Xi_1+2\Xi_2},\qquad
\boxed{\alpha_2=\Xi_2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9340d57c293b7e8a)

$$
\boxed{\alpha_3=\Xi_1+\Xi_2-\Xi_3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-629e98e67354d9ae)

with consistency relation
$$
\Xi_4=2\alpha_3-\alpha_1=\Xi_1-2\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-705843eb80c0c2ab)

These are coefficient comparisons with Will's [standard PPN metric](https://arxiv.org/pdf/1403.7377v1), Box 2; the other potential coefficients must also match before this reduced dictionary establishes a full metric export. An independently extracted $\Xi_4$ violating the displayed relation rejects this preferred-frame reduction.

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

The preferred-motion bundle separates the profiles through their predicted annual and sidereal phase and amplitude. Ground-to-orbit clock and resonator comparisons add the radial discriminator: a profile that becomes less entrained with altitude changes $\mathbf w_A^{(f)}$ across the trajectory, whereas a CMB-comoving profile preserves the leading dipole-scale drift. The same $(f_{\mathrm{tr}},f_{\mathrm{rot}})$ values must be used in clock, interferometer, matter-sector, and PPN rows; fitting a different terrestrial drift profile to each channel would not close the preferred-frame map.

#### Rotating-Source Frame Dragging

Preferred-frame leakage and physical source-current response are different $g_{0i}$ channels. Setting $\alpha_1=\alpha_2=\alpha_3=0$ must remove dependence on a laboratory's group velocity through the Noether sea without removing the positive weak-field response to a rotating source. For source angular momentum $\mathbf J$ and $\mathbf r=r\hat{\mathbf r}$, the GR-matching stationary far-field comparison row in the declared $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ convention is
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

for a rotating source with the source-current coefficients fixed to their GR comparison values. A general PPN current sector has additional parameter dependence. Lense-Thirring and geodetic precession must therefore be recovered from one effective metric but remain distinct observable projections.

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

The additional parameters have different observational coverage. Historical comparison scales from [Will (2014), Table 4 and equation (71)](https://arxiv.org/pdf/1403.7377v1) are

| Parameter | Representative bound or relation | Required estimator |
| --- | --- | --- |
| $\xi_{\mathrm W}$ | $|\xi_{\mathrm W}|\lesssim4\times10^{-9}$ from strong-field preferred-location torque tests | orientation precession relative to the external-potential direction |
| $\zeta_1$ | $|\zeta_1|\lesssim2\times10^{-2}$, mainly indirect | Nordtvedt/self-acceleration combination after the other PPN rows are fixed |
| $\zeta_2$ | $|\zeta_2|\lesssim4\times10^{-5}$ | binary-center-of-mass acceleration and pulsar timing |
| $\zeta_3$ | $|\zeta_3|\lesssim10^{-8}$ | active/passive mass and momentum-balance residual |
| $\zeta_4$ | no comparably direct standalone bound; $6\zeta_4=3\alpha_3+2\zeta_1-3\zeta_3$ under the standard pressure-gravity consistency assumption | pressure contribution to the same full PPN metric |

The pulsar-derived rows are strong-field analogues, not solar-system measurements. They remain legitimate closure pressure only if the model declares how its weak-field PPN parameters export into self-gravitating bodies. In particular, $\zeta_3$ is not automatically zero in a delayed pairwise interaction: the native estimator must cycle-average the complete matter-plus-wake-plus-Noether-sea momentum ledger before projecting the observer-level active/passive-mass residual.

### Zero-Leakage Conditions (Preferred-Frame Closure)

Within the displayed polynomial ansatz, with its PPN consistency relation enforced and source potentials independently resolved, preferred-frame leakage vanishes at the retained order precisely when
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-51a274a461d28d14)

The corresponding derivative conditions remove both linear velocity terms and all quadratic speed dependence:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3040cd0f79d7e23c)

with no momentum-density coupling term $w^iV_i$ at the retained PN order. A merely isotropic Hessian is insufficient: a nonzero $w^2U$ term changes clocks with speed even if its traceless part vanishes. The conditions must hold across the source-potential family, not just where a potential happens to vanish.

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

This readout is a phenomenological apparatus ansatz, not a derived universal response of clocks, resonators, and matter. Here $\mathbf{s}_A$ is a channel sensitivity row that must be supplied by an independent apparatus projection and may depend on orientation and time, $\zeta_A$ is an allowed apparatus-calibration nuisance fixed by the instrument model, $n_A$ is detector/environment noise, and $y_A^\theta$ is the model readout projected from the retained record tuple $\theta$. The shared preferred-frame residual is
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

Here $\|r\|_{C_A^{-1}}^2=r^{\mathsf T}C_A^{-1}r$, with $C_A$ the positive-definite covariance of the channel's sampled residuals, and $\lambda_{\mathrm{PF}}\ge0$ is a declared regularization weight. The sum assumes independent channel errors; shared noise requires a joint covariance. Incompatibility is assessed with the full uncertainty and nuisance model. An orientation or annual response absorbed by a freely fitted $\zeta_A$ cannot establish absence of physical leakage.

### Weak-Field Constraint Table (Decision Layer)

Use this table to compare the constitutive map with declared observational benchmarks; an actual test also needs source data, covariance, nuisance models, and a domain.

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

The following historical comparison scales form a reduced five-row vector for the numerical illustration. They mix uncertainty scales and confidence bounds and are not a joint confidence region or an inventory of the latest measurements:
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

The first scale is Cassini's reported $1\sigma$ uncertainty; its central estimate is not zero. The second and last two scales follow the perihelion, millisecond-pulsar spin-precession, and pulsar-period-statistics rows of [Will (2014), Table 4](https://arxiv.org/pdf/1403.7377v1). The $\alpha_1$ scale is a rounded envelope of the strong-field result $\hat\alpha_1=(-0.4^{+3.7}_{-3.1})\times10^{-5}$ at 95% confidence from [Shao and Wex (2012)](https://arxiv.org/abs/1209.4503). The $2\times10^{-9}$ scale is a pulsar result, not solar-spin-axis alignment. Pulsar rows constrain strong-field analogues under the source analysis's frame and body assumptions; their application to weak-field parameters requires a derived compact-body export.

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

The illustrative componentwise screening rule is
$$
\|\mathbf{q}_{\mathrm{PPN}}\|_\infty \le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a95190bb18540d83)

only after declaring the relevant weak-to-strong-field export. This screen is not statistical acceptance: it neglects central offsets, confidence-level differences, and correlations. Physical comparison uses each experiment's likelihood and tests the same constitutive metric across all channels.

The SME-style Lorentz-test family supplies a second, non-PPN layer. The cavity experiment of [Nagel and collaborators (2015)](https://arxiv.org/abs/1412.6954) reported orientation-dependent fractional frequency sensitivity of order $10^{-18}$; [Kostelecký and Russell's data tables](https://arxiv.org/abs/0801.0287) organize photon, matter, neutrino, and gravity coefficients in specified comparison frames, conventionally the Sun-centered frame for terrestrial results. For this chapter the safe import is not a new ontology. It is the validation rule that any effective metric or clock/ruler channel must report which SME-like residual it would excite:
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
\mathbf{p}_{\mathrm{PPN}}^{\mathrm{full}}=
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
\mathbf{p}_{\mathrm{PPN}}^{\mathrm{full}}\approx \mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c2a65ff49642965e)

within the benchmark tolerances listed in the validation ledger.

The synthetic calibration and likelihood sections below remain explicitly reduced fits over $(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3)$. They do not numerically evaluate $\xi_{\mathrm W}$, $\zeta_i$, or the Lense-Thirring source-current row, so passing those reduced examples is not full PPN closure.

Cross-chapter integration:
- constitutive map source: [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- clock-law coefficient extraction: [spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- threshold enforcement: [validation/constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)

### ADM/Cartan Extraction Equations

The PPN vector must be extracted from the same Arnowitt–Deser–Misner (ADM) clock/shift/spatial decomposition and Cartan ruler coframe used by the effective metric map. Here $N>0$ is the lapse, $u^i_{\mathrm{sea,eff}}$ is the effective shift with speed units, and $\gamma_{ij}^{\mathrm{eff}}$ is the positive-definite spatial metric. Metric components are dimensionless in length coordinates with signature $(-,+,+,+)$. With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the line element
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

In the stationary zero-shift weak-field row, where $N=d\tau/dt_{\mathrm{eff}}$ for a coordinate-static clock, write
$$
N
=
1-\frac{U_{\Phi}}{c_0^2}
+C_2^{(\Phi)}\frac{U_{\Phi}^2}{c_0^4}
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2bc4bb418f65a5c3)

and extract the isotropic first-order spatial coefficient, after verifying that independent anisotropic contributions are absent or separately retained,
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^2}{2U_{\Phi}}
\left(
\frac{h^{ij}\gamma_{ij}^{\mathrm{eff}}}{3}-1
\right)
+O(U_{\Phi}/c_0^2,\epsilon_{\mathrm{LV}}c_0^2/U_{\Phi}),
\qquad
\beta_{\mathrm{PPN}}-1=C_2^{(U)}-\frac12
$$

[View →](../../../../../equation-mapping.html#corpus-equation-126fe46ea130e20a)

The preferred-frame coefficients are the retained group velocity coefficients in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$ under the $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ expansion above, with
$$
\alpha_1=\Xi_1+2\Xi_2,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1+\Xi_2-\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5b0443421239c8c3)

Here $\epsilon_{\mathrm{LV}}$ bounds an additive dimensionless metric departure; division by $U_\Phi$ amplifies it, so extraction requires a resolved nonzero potential and $\epsilon_{\mathrm{LV}}\ll U_\Phi/c_0^2$. A trace cannot establish absence of anisotropic spatial response. The conversion $U_\Phi=U+O(U^2/c_0^2)$ is declared above.

This extraction is the dictionary for the coefficient scaffold in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md#admcartan-reconstruction-surface). Adopt the first-order expansions
$$
\delta n=a_n\frac{U}{c_0^2},\qquad
\delta\chi=a_\chi\frac{U}{c_0^2},\qquad
\varphi=-\frac{U}{c_0^2}+O(U^2/c_0^4),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4b16a5feda96d58a)

Here $\delta n=n-1$, $\delta\chi=\chi_{\mathrm{sea}}/\chi_{\mathrm{sea}}(\infty)-1$, and $\varphi=\Phi_{\mathrm{eff}}/c_0^2$. The common $a_\chi$ requires the shared clock/signal branch $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$; otherwise separate responses must be retained. The dimensionless $A$ coefficients weight these density, delay, and potential changes. The scalar and spatial first-order rows must satisfy
$$
A_N^n a_n+A_N^\chi a_\chi-A_N^\Phi=-1,
\qquad
2\gamma_{\mathrm{PPN}}
=
A_\gamma^n a_n+A_\gamma^\chi a_\chi-A_\gamma^\Phi.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3d031d3d6a5836bf)

The coefficient $C_2^{(U)}$ is the complete coefficient of $(U/c_0^2)^2$ after the quadratic lapse-response term $Q_N$ and the second-order pieces of $\delta n$, $\delta\chi$, and $\varphi$ are combined. It cannot be read from $Q_N$ alone.

The preferred-motion part of the shift must contain scalar and anisotropic PPN potentials. To compare directly with Emergent Metric's scaffold, use $w_{\mathrm{sea}}^i=-w^i$, the sea velocity relative to the comparison frame:
$$
u^i_{\mathrm{sea,eff}}
=
D_U w_{\mathrm{sea}}^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w_{\mathrm{sea}}^j\frac{U^i{}_j}{c_0^2}
+O(c_0\epsilon_{\mathrm{PN}}^{5/2},c_0\epsilon_{\mathrm{LV}}).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1b11df1a936ad0d1)

At leading order in $g_{0i}^{\mathrm{eff}}=-\gamma_{ij}^{\mathrm{eff}}u^j_{\mathrm{sea,eff}}/c_0$, this gives
$$
D_U=-\frac{\Xi_1}{2},
\qquad
D_{\mathrm{aniso}}=-\Xi_2.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-285e45aa68e32bb5)

With $U/c_0^2=O(\epsilon_{\mathrm{PN}})$ and $w/c_0=O(\epsilon_{\mathrm{PN}}^{1/2})$, this shift is $O(c_0\epsilon_{\mathrm{PN}}^{3/2})$ and its square in $g_{00}^{\mathrm{eff}}$ is $O(\epsilon_{\mathrm{PN}}^3)$. It cannot supply the retained $O(\epsilon_{\mathrm{PN}}^2)$ coefficients $\Xi_3$ and $\Xi_4$; these require the lapse response at that order. The rotating-source shift is a separate contribution. A scalar-only group velocity row has no $\Xi_2$ slot and therefore cannot be tested against the tight $\alpha_2$ channel.

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

The norm $\|\cdot\|_W$ is a declared norm over the observation window; $\varepsilon>0$ has the same units as the acceleration norm in its denominator. This is a leading stationary slow-motion comparison, not the full geodesic equation with shift and velocity terms. The other residuals are redshift, Shapiro, and lensing differences from the same record $\theta$, retaining source histories, medium state, observer response, calibration, and boundary data. Each residual needs declared units and covariance before combination into a scalar test.

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
\alpha_1=\Xi_1+2\Xi_2,\ \alpha_2=\Xi_2,\ \alpha_3=\Xi_1+\Xi_2-\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbe38ebcbeea53fb)

the map is the exact affine projection within this reduced coefficient ansatz
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
0 & 0 & 1 & 2 & 0\\
0 & 0 & 0 & 1 & 0\\
0 & 0 & 1 & 1 & -1
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
\mathcal E_{\mathrm{PPN}}(\boldsymbol{\vartheta}_{\mathrm{PPN}})=\mathbf{p}_{\mathrm{PPN}}^{\mathsf T}\mathbf{W}\,\mathbf{p}_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-94599078355f0e1e)

where $\mathbf W$ contains reciprocal squared screening scales. These tolerance weights are not an inverse covariance or a chi-squared statistic. With the historical benchmark vector above,
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
2. Project once to $(\mathbf{p}_{\mathrm{PPN}},\Sigma_{\mathrm{PPN}})$ and evaluate $\mathcal E_{\mathrm{PPN}}(\boldsymbol{\vartheta}_{\mathrm{PPN}})$.
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

These are observer-level PPN comparison projections, conditional on the constitutive map recovering a common metric and matter/signal propagation. Use a stationary, nonrotating isolated source, a test body, and a preferred-frame-free comparison ($\mathbf w=0$); account separately for quadrupole, many-body, and instrument effects. Spherical source geometry alone does not remove preferred-frame dependence. Here $b$ is the ray impact parameter for endpoints effectively at infinity, $a$ and $e$ are the orbit's semimajor axis and eccentricity with $0\le e<1$, and $r_1,r_2,R$ retain the endpoint convention above.

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

4. Gravitational redshift for stationary transmitter and receiver clocks. Define $z_{\mathrm{Red}}=\nu_t/\nu_r-1=N_r/N_t-1$, where $\nu_t$ is the emitted proper frequency and $\nu_r$ the received proper frequency, with identical clock calibration and stationary metric transport. Set $\Delta U=U_t-U_r$ and $\Delta(U^2)=U_t^2-U_r^2$. Expanding the ratio of the two clock rates gives
$$
O_4(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Red1}}-K_{\text{Red2}}C_2,
\qquad
K_{\text{Red1}}=\frac{\Delta U}{c_0^2}+\frac{U_t\Delta U}{c_0^4},
\quad
K_{\text{Red2}}=\frac{\Delta(U^2)}{c_0^4}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60b5a1b9dbf68ce8)

The $U_t\Delta U/c_0^4$ term comes from expanding the denominator $N_t$; subtracting clock rates alone misses it. Omitted redshift terms are $O(\epsilon_{\mathrm{PN}}^3)$. At fixed geometry and endpoint potentials, observable sensitivities to the retained parameters are
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

For this restricted zero-preferred-frame projection, the three $\Xi_i$ columns vanish by construction. Measurements sensitive to nonzero $\mathbf w$ and their compact-body or apparatus maps are needed to constrain them.

### Worked Solar-System Reference Projection (Synthetic Calibration Example)

This synthetic observer-level calculation uses normalized wake-speed units, $c_f=1$, with results displayed using reference metre, second, and angular conversions. It does not calibrate the native coupling or determine $c_0/c_f$. The rounded solar comparison scales are
$$
\frac{GM_\odot}{c_0^2}=1.4766\times 10^3\ \mathrm{m},
\qquad
\frac{GM_\odot}{c_0^3}=4.925\times 10^{-6}\ \mathrm{s}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-976c7205bbf9ab2f)

Use these prescribed, rounded reference kernels. The precession kernel includes the number of orbits per century (cy), so it reports a century rate rather than the per-orbit angle above. For redshift take $U_t/c_0^2=2.12\times10^{-6}$ and $U_r=0$, giving $\Delta(U^2)/c_0^4=(2.12\times10^{-6})^2$:
$$
K_{\text{Shap}}=70.4\ \mu\mathrm{s},
\quad
K_{\text{Def}}=0.875'' ,
\quad
K_{\text{Prec}}=14.3''/\mathrm{cy},
\quad
K_{\text{Red1}}=2.12\times 10^{-6}+4.4944\times10^{-12},
\quad
K_{\text{Red2}}=4.4944\times 10^{-12}
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
(\alpha_1,\alpha_2,\alpha_3)=\left(0,-0.5\times 10^{-18},0.3\times 10^{-18}\right)
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
z_{\text{Red}}\approx 2.120002247\times 10^{-6}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2c7788c527cfeea2)

Propagated marginal $1\sigma$ scales for the stipulated diagonal parameter covariance are
$$
\sigma_{\text{Shap}}\approx 3.5\times 10^{-4}\ \mu\mathrm{s},
\quad
\sigma_{\text{Def}}\approx 4.4\times 10^{-6}\,\mathrm{arcsec},
\quad
\sigma_{\text{Prec}}\approx 1.5\times 10^{-4}\,\mathrm{arcsec}/\mathrm{cy},
\quad
\sigma_{\text{Red}}\approx 1.8\times 10^{-17}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9c4d39dd2a0e51a4)

This synthetic vector has $|\alpha_3|/(4\times10^{-20})=7.5$ and fails the illustrative componentwise screen; the example demonstrates projection arithmetic, not a passing calibration. These uncertainty scales propagate only the stipulated parameter covariance, holding the rounded kernels fixed. Observable covariance is not diagonal: Shapiro delay and deflection depend on the same parameter and their predicted errors are fully correlated here.

For a real comparison, form the residual covariance $\Sigma_{\mathrm{res}}=\operatorname{Cov}(\mathbf O-\mathbf O_{\mathrm{obs}})$ including measurement, parameter, geometry, calibration, and model-discrepancy uncertainty with their correlations. For independent prediction and observation errors it reduces to their covariance sum. A marginal three-standard-deviation diagnostic uses
$$
\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})\pm 3\sqrt{\operatorname{diag}(\Sigma_{\mathrm{res}})}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-14517e5f6c9a6b35)

as a discrepancy flag. Joint rejection requires a declared likelihood, systematic-error model, and multiple-comparison rule. An uncertain observation outside a parameter-only interval does not by itself falsify the constitutive map. Retuning separately for each observable still does not constitute cross-observable recovery.

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

For the illustrative reduced fit, take these compressed inputs. The first two reproduce historical reported estimates; the third is a stipulated synthetic precession-combination uncertainty, not an independently verified Mercury measurement:
1. Cassini Shapiro: $\gamma_{\text{obs}}-1=(2.1\pm2.3)\times 10^{-5}$, as summarized by [Will (2014), section 4.1.2](https://arxiv.org/pdf/1403.7377v1).
2. VLBI solar deflection: $\gamma_{\text{obs}}-1=(-0.8\pm1.2)\times 10^{-4}$, from [Lambert and Le Poncin-Lafitte's 2011 analysis](https://syrte.obspm.fr/jsr/journees2011/pdf/lambert1.pdf).
3. Synthetic Mercury-like precession combination: $(2\gamma_{\text{obs}}-\beta_{\text{obs}})=1\pm 3.0\times 10^{-5}$.
4. Galileo redshift comparison: [Delva and collaborators (2018)](https://arxiv.org/abs/1812.03711) report a fractional deviation from the first-order GR redshift of $(0.19\pm2.48)\times10^{-5}$ at $1\sigma$. This concerns a fractional violation parameter, not the redshift itself or directly $C_2$; Gravity Probe A is a separate earlier experiment.

For this restricted zero-preferred-frame classical set, the Jacobian structure satisfies
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

This algebraic fit uses only the first three rows, treated as independent Gaussian $1\sigma$ inputs, with source and apparatus nuisance parameters held fixed. It fits $(\gamma_{\mathrm{PPN}}-1,\gamma_{\mathrm{PPN}}-1,2\gamma_{\mathrm{PPN}}-\beta_{\mathrm{PPN}})$ to those compressed measurements, rather than inserting dimensionless coefficients into the mixed-unit observable tuple unchanged. The Galileo row is excluded because a second-order clock-channel likelihood is not supplied.

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
3. The positive $\gamma_{\mathrm{PPN}}$-$C_2$ covariance defines the conditional trade-off direction when matching precession jointly with refractive observables.

### Preferred-Frame Parameter Degeneracy Resolution (Augmented Likelihood)

Define the preferred-frame constitutive vector
$$
\boldsymbol{\Xi}\equiv(\Xi_1,\Xi_2,\Xi_3)^{\mathsf T}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4bbcf405465c674e)

For the zero-preferred-frame classical set above, $\boldsymbol{\Xi}$ is unconstrained. For a proposed expanded group-velocity-sensitive baseline (ephemerides, lunar laser ranging, and anisotropy channels), define the preferred-frame Fisher block, the expected local curvature of its log likelihood, by
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

For this conditional illustration, assume this positive-semidefinite block has rank two and unit null direction $\hat n$. No data-derived rank or null direction is supplied here:
$$
\mathcal{I}_{\Xi,\text{base}}\hat n=\mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5ffaf1982db92845)

Candidate additional observables:
1. Binary-pulsar eccentricity drift channel $\dot e$ (orbital polarization sensitivity).
2. Solitary millisecond-pulsar spin channel $\dot P$ (self-acceleration sensitivity).

For statistically independent channel data conditional on the same parameters and nuisance model, use the joint likelihood
$$
\ln \mathcal{L}_{\text{joint}}(\boldsymbol{\Xi}\mid\mathcal{D})
=
\ln \mathcal{L}_{\text{base}}
+\ln \mathcal{L}_{\dot e}
+\ln \mathcal{L}_{\dot P}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76efce7a837881a6)

For independent Gaussian scalar readouts with parameter-independent positive variances, the augmented Fisher matrix is
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

Under the rank-two and positive-variance assumptions, this is equivalent to at least one added gradient having nonzero projection onto $\hat n$: its outer product supplies positive information in the sole previously null direction. Correlated data require the full joint covariance; shared nuisance parameters must be retained or profiled before assessing rank.

Positive-definite Fisher information establishes local identifiability and, under a valid local Gaussian approximation, a finite covariance ellipsoid near that fit. It does not establish global posterior boundedness, uniqueness, or proper normalization; nonlinear degeneracies and prior or nuisance tails remain separate questions.

A joint preferred-frame map fails when the same declared sea-velocity profile and coefficients cannot reproduce independent clock, orbital, and timing records within their complete uncertainty model. The CMB dipole supplies an observer-level comparison direction; it does not independently measure Noether sea motion. Incompatibility with it rejects only an explicitly adopted CMB-linked profile, not every possible medium-frame mapping.

The acceptance record for this layer requires Noether sea continuum simulations to supply
$$
\nabla_{\boldsymbol{\Xi}}\dot e,\qquad
\nabla_{\boldsymbol{\Xi}}\dot P
$$

[View →](../../../../../equation-mapping.html#corpus-equation-94047a5df9087f85)

for the group-velocity-sensitive channels that lift the preferred-frame degeneracy.

## Gravitational Waves

Gravitational-wave observations measure time-dependent strain: changes in the relative distances or signal travel times inferred by calibrated detectors. In $\mathbb{A}\mathbb{A}\mathbb{A}$ their proposed physical carrier is a collective disturbance of the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), the population of coupled neutral assemblies inside the fixed Euclidean void. This chapter states the conditional recovery targets connecting that disturbance to an effective metric and detector records. It derives no Noether sea tensor-wave dynamics or detection from the substrate law. The wider observational targets are summarized in [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md) and [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md).

The substrate starting point is delayed interaction among [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers whose polarity and path histories determine their emitted wakes. A wake is an expanding causal record centered on a transmitter's past emission site. At reception time $T_r$, its emission time $T_t<T_r$ obeys $\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) sums every admitted root to determine receiver acceleration. On simple roots its transmitter-side weight is $c_f/|D_t|$, with $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t$; $\hat{\mathbf r}_t$ points from emission to reception. Receiver motion changes root playback and later history, not this arriving multiplier. Singular roots require the Master Equation's separate continuation treatment.

An arriving wake changes a receiver's subsequent path and therefore its later emissions; it does not redirect an already emitted wake or turn the void into a medium. Collective source, sea, and detector response must be obtained from those constituent histories. The observer chart $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record})$ is the conditional map defined in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), with $\mathcal N_{\mathrm{sea}}$ retaining the relevant medium state and history. It cannot be replaced by identifying effective coordinates with absolute time and Euclidean position. In particular, neither an effective propagation speed nor the measured light speed $c_0$ is automatically the primitive wake speed $c_f$.

Three interface chapters supply the metric map, weak-field parameter bounds, and broader phenomenology used here:

- Effective metric map: [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md)
- PPN closure and refractive weak field: [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- Phenomenology summary: [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md)

### Weak-Field Setup

At the observer level, write the effective metric as a flat comparison metric plus a small perturbation:
$$
g_{\mu\nu}^{\text{eff}}=\eta_{\mu\nu}+h_{\mu\nu},
\qquad
|h_{\mu\nu}|\ll1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b9ed8fe3f6ed8143)

Here $\eta_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ is the flat Minkowski comparison metric in coordinates $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ and Cartesian $x_{\mathrm{eff}}^i$; $\mu,\nu\in\{0,1,2,3\}$ and $i,j\in\{1,2,3\}$. The dimensionless $h_{\mu\nu}$ is the small observer-level departure reconstructed from the Noether sea. Neither is a metric of the Euclidean substrate. The comparison assumes a homogeneous, isotropic background sea with no effective drift in this local chart. Raising indices and $\partial^\mu=\eta^{\mu\nu}\partial/\partial x_{\mathrm{eff}}^\nu$ use this comparison metric.

Define trace-reversed perturbation
$$
\bar h_{\mu\nu}=h_{\mu\nu}-\frac12\eta_{\mu\nu}h,\qquad
h=\eta^{\alpha\beta}h_{\alpha\beta}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60e4e1d7e2fb4dd3)

Here $h_{\mu\nu}$, $\bar h_{\mu\nu}$, and the trace $h$ are observer-sector perturbation variables of $g_{\mu\nu}^{\text{eff}}$. They are distinct from the native Euclidean spatial metric $h_{ij}=\delta_{ij}$ on $\Sigma_T$, which does not appear below.

Conditional on recovery of the linearized metric gauge symmetry, choose the Lorenz gauge, the coordinate condition that removes redundant descriptions of the same observer geometry,
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

at the GW170817/GRB 170817A order-of-magnitude scale, after source-emission lag and propagation-path conventions are declared. The published comparison gives $-3\times10^{-15}\le R_{\mathrm{GW}\gamma}\le7\times10^{-16}$ under its distance and emission-lag assumptions; the symmetric scale above is not that interval. Here $c_\gamma$ is the photon-channel speed in the same calibrated propagation convention. A prediction outside the applicable interval fails this timing test. Independently fitting the two speeds can satisfy the interval but does not derive their common response.

The common-delay branch additionally seeks one Noether sea delay factor $\chi_{\text{sea}}=c_f/c_{\mathrm{eff}}$ for these channels after a shared spatial and temporal calibration. This is a constitutive recovery target, not a consequence of occupying one medium: one medium can support different response modes. A successful branch derives both channel responses from the same $\mathcal N_{\mathrm{sea}}$ and bounds their difference in the tested regime; the timing observation alone proves neither an exact delay-factor identity nor equality to $c_f$.

Coherent photon/gravity conversion comparisons belong at this same shared-record level. They are useful only if the photon channel and the effective gravitational channel read from one Noether sea state, one speed/delay convention, and one event ledger. A proposed conversion amplitude, phase lock, or common propagation speed cannot be used as evidence for a new carrier unless it also preserves the GW170817-style timing row, photon nondispersion, image coherence, and the tensor-mode detector record.

### Linear Wave Equation

**Closure Target 1 (linearized propagation equation).** Assume the homogeneous isotropic background is an equilibrium of the same constitutive dynamics, an open prerequisite. In a weak-field region with coefficients constant to leading order over the wavelength and period, the transverse-traceless (TT) sector must recover the following GR comparison equation. Transverse means that the spatial perturbation has no component along the propagation direction; traceless means that its spatial diagonal sum vanishes.
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}
=
-\frac{16\pi G_{\text{eff}}}{(c_{\text{GW}}^{\mathrm{eff}})^4}\,T_{\mu\nu}^{\text{TT}},
\qquad
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\equiv
-\frac{1}{(c_{\text{GW}}^{\mathrm{eff}})^2}\partial_{t_{\mathrm{eff}}}^2
+\delta^{ij}\partial_{x_{\mathrm{eff}}^i}\partial_{x_{\mathrm{eff}}^j}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f095d65d0b76523e)

Here $T_{\mu\nu}$ is the effective source stress-energy tensor, and TT denotes its spatial radiative projection, with time components set to zero in this representation. The minus sign follows from the stated signature and $\Box=-c_0^{-2}\partial_{t_{\mathrm{eff}}}^2+\nabla^2$: the linearized Einstein tensor is $-\Box\bar h_{\mu\nu}/2$. Exact GR normalization requires $c_{\mathrm{GW}}^{\mathrm{eff}}=c_0$ at this order; a residual speed difference is a constitutive deviation model. The spatial coefficient is the frozen background value $\delta^{ij}$, not a variable metric inserted into a flat partial-derivative operator. Background gradients, lapse, and drift require a consistent variable-coefficient expansion.

This is an observer-level recovery target. A native derivation must obtain the tensor kinetic normalization, signed source coupling, and constraints from one constitutive record. It must also select the causal solution from earlier source and boundary history; the wave equation alone permits both incoming and outgoing solutions. Linearizing an assumed effective field equation checks its consequences but derives none of these ingredients from Noether sea dynamics.

**Conditional Corollary 1 (source-free effective waves).** If Closure Target 1 holds on the constant-coefficient patch and $T_{\mu\nu}^{\text{TT}}=0$:
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a11345c5d2a49b99)

so plane waves satisfy
$$
\omega^2=(c_{\text{GW}}^{\mathrm{eff}})^2k^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1cec7192fcc802c0)

Here $\omega>0$ is angular frequency per unit $t_{\mathrm{eff}}$ and $k>0$ is the spatial wave-number magnitude in this local Cartesian chart. Substitution of a phase $kx_{\mathrm{eff}}^3-\omega t_{\mathrm{eff}}$ gives the displayed dispersion relation. Higher-order dispersive corrections are constitutive and model-dependent.

Finite-range comparison models may introduce gravitational-wave dispersion, but here that is only a deviation diagnostic. On a differentiable, weakly attenuated branch define the wave-packet group speed
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

Here $\theta$ labels the candidate constitutive model, $f$ labels the received ordinary frequency, $\Gamma$ is the common observer-level ray, and $d\ell$ is its calibrated spatial length element. The wave numbers include the local frequency evolution along that ray, including redshift; they are not evaluated at a constant local frequency on an evolving background. The integral is a geometric-optics phase comparison on a shared path. If ray geometry or arrival-time evolution differs at the retained order, compare the full propagated phases instead. A useful low-frequency residual is
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

The positive functions $\epsilon_\phi(f)$ and $\epsilon_v(f)$ are declared phase and fractional-speed tolerances on $\mathcal B_{\mathrm{low}}$. Requiring this sum to be at most one is a conservative joint budget, stricter than requiring each term separately to be at most one. In a forecast those tolerances describe projected sensitivity, not measured exclusion. This comparison does not license a massive-graviton ontology; any cosmological-scale weakening channel must remain compatible with the strain and timing observations in its tested domain.

### Medium-Transport Perturbation

For cosmological transport, a candidate gravitational disturbance perturbs the same Noether sea state sampled by photons and clocks. A provisional scalar population balance, expressed in absolute time $T$ and Euclidean position $\mathbf X$, is

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

Here $f_N(\nu,\mathbf X,T)\ge0$ counts ambient braids per spatial volume per unit ordinary cadence $\nu>0$, so $\int_0^\infty f_N\,d\nu=\rho_{\mathrm{NS}}$. The velocity $\mathbf u_{\mathrm{sea}}$ transports that population spatially, $J_\nu$ is its current through cadence space, $S_{\mathrm{BH}}$ is a compact-object population contribution, $S_{\mathrm{GW}}$ is the signed disturbance contribution, and $R_{\mathrm{eq}}$ is a proposed relaxation term. All terms have units of $f_N$ per absolute time. Cadence redistribution alone preserves the integrated braid count: for zero endpoint current, its net source integral must vanish; any nonzero integral requires a declared population transfer. The same redistribution must not be counted in both $J_\nu$ and a source term.

This balance is a hypothesis, not an equilibrium proof or a tensor-wave equation. Scalar cadence density alone does not retain shear orientation or the two tensor amplitudes. The full $\mathcal N_{\mathrm{sea}}$ must retain those variables and their histories; deriving their coupled response remains open. No extra gravitational polarization follows from adding $S_{\mathrm{GW}}$ to this scalar projection.

For a declared photon or spectral channel $X$, let $\delta\alpha_{\mathrm{prop},X}^{\mathrm{GW}}$ be the disturbance-induced change in its logarithmic frequency-shift rate per calibrated path length. Its proposed response functional is

$$
\delta\alpha_{\mathrm{prop},X}^{\mathrm{GW}}
=
\mathcal{A}_{X,\mathrm{GW}}\!\left[
S_{\mathrm{GW}},f_N,J_\nu;x_{\mathrm{eff}}^i,t_{\mathrm{eff}},\hat{\mathbf{k}}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9742273c07570907)

The functional $\mathcal A_{X,\mathrm{GW}}$ is conditional on the retained tensor, orientation, and boundary histories and the chart map $\chi_{\mathrm{eff}}$; the displayed scalar inputs do not establish that they determine the response alone. The unit direction $\hat{\mathbf k}$ specifies the photon ray. Beam variance, chromaticity, and packet-duration residuals must meet the same declared redshift tolerances. Excess photon dispersion, image blur, or gravitational-wave timing drift rejects this particular perturbative transport branch.

### Polarization Content

The GR recovery target is the effective **spin-2 / tensor** channel: a transverse-traceless distortion whose two amplitudes mix through twice the angle when the transverse coordinate axes are rotated about the propagation axis. A scalar breathing response expands and contracts both transverse directions together; it is a distinct possible deviation, not part of the TT definition.

**Closure Target 2 (two-mode radiative response).** Recover the massless metric gauge symmetry, its dynamical constraints, and a nondegenerate propagating tensor sector on the equilibrium background, while excluding or bounding additional radiative degrees of freedom. Under these stronger premises, the source-free TT sector has two amplitudes:
$$
h_+(t_{\mathrm{eff}},x_{\mathrm{eff}}^i),\qquad h_\times(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-48b9c603afb9b52a)

The geometric count is explicit for propagation along $x_{\mathrm{eff}}^3$: transversality leaves a symmetric $2\times2$ block, and zero trace gives $h_{11}^{\mathrm{TT}}=-h_{22}^{\mathrm{TT}}=h_+$ and $h_{12}^{\mathrm{TT}}=h_{21}^{\mathrm{TT}}=h_\times$. Those are two independent entries. This count does not prove that a Noether sea perturbation obeys those constraints or that other propagating sectors are absent. Parity-even isotropy alone permits an additional scalar wave; projecting it out of a displayed tensor does not remove its physical detector response.

Any scalar, vector, or longitudinal gravitational-wave response is therefore an effective deviation to be bounded, not a new default channel:
$$
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}<\epsilon_{\mathrm{pol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-db5522b8794b4a6c)

The numerator collects inferred non-TT detector power under a declared noise and astrophysical model. Both powers use the same band, response, and normalization, and this ratio requires $\mathcal P_{\mathrm{TT}}>0$. A tensor-null channel needs an absolute extra-mode limit. Any inferred extra response above the applicable bound falsifies two-mode recovery in that band.

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

Here $\mathrm{FAR}$ is the search's false-alarm-rate estimate and $R_{\mathrm{cal}}$ is its retained calibration residual. The vector combines detection-quality quantities with theory-comparison quantities; it is not a universal event-detection rule. For a specified recovery claim, declare the required indices $i$ and their positive tolerances $\epsilon_{\mathrm{GW},i}$ in matching units, then require

$$
\max_i \frac{|R_{\mathrm{GW},i}|}{\epsilon_{\mathrm{GW},i}}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c2bf29599c3b8790)

with the statistical coverage and validation band fixed before evaluation. An unmeasured speed or polarization component is unavailable evidence, not a zero residual; it leaves any claim requiring that component open. Event acceptance follows the declared detector search, calibration, and background analysis. Identifying that accepted event with a derived Noether sea response is a separate theoretical claim.

For a multi-detector event, let $D_a$ label each instrument and $s_a(t_{\mathrm{eff}})$ its calibrated strain. Let $h^\theta$ contain the predicted incoming polarizations before detector response, so $h_a^\theta=\mathcal P_{D_a}h^\theta$ is the response template. For a declared source direction, $\Delta t_{ab}^{\mathrm{geom}}$ is the predicted signed arrival-time difference, not a timing-window width; $\Delta t_{ab}^{\mathrm{fit}}$ is its fitted value and $\sigma_{ab}>0$ its uncertainty. Define the diagnostic
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

Here $\|r\|_{C_a^{-1}}^2=r^\mathsf{T}C_a^{-1}r$ weights sampled strain residuals by a positive-definite noise covariance on the retained data space. The timing term is generally correlated with the strain fit, so this sum is not automatically a chi-squared statistic or a likelihood. Its threshold needs calibration with the joint noise model, or a conditional construction that avoids counting timing information twice. A multi-detector claim requires coherent responses and allowed arrival delays. Single-observatory detections require their own search evidence; GW190425 is a published example, so missing coincidence alone cannot invalidate every accepted event.

Public GWOSC/LVK claims must also pass the packet protocol in [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md#public-gravitational-wave-benchmark-protocol) before they support strong-field or effective-metric claims. The public packet fixes event version, strain files, detector masks, parameter-estimation release, waveform family, calibration notes, analysis window, nuisance record, and artifact hashes before residual evaluation. This makes the detector-side gate replayable rather than a general statement that gravitational-wave observations are available.

**Closure Target 2A (graviton-comparison detectability residual).** A graviton is the energy quantum assigned to a gravitational mode in the standard quantum comparison. That description is not substrate ontology. For a narrowband strain with angular frequency $\omega$ and amplitude $A_{\mathrm{GW}}$, define a packet volume $V_{\mathrm{mode}}>0$ and compare its effective energy with one quantum $\hbar\omega$, where $\hbar$ is the reduced Planck constant:
$$
N_{\mathrm{occ}}
\simeq
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
=
\frac{\hbar\omega}{V_{\mathrm{mode}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6450dc70a1b9634e)

Here $\rho_{\mathrm{GW}}$ is cycle-averaged effective energy density, $\rho_1$ is one quantum's energy per declared volume, and $N_{\mathrm{occ}}$ is the corresponding occupation estimate. The density estimate assumes a specified polarization and amplitude convention; it does not measure the incoming quantum state. The often-used scaling $\rho_1\sim\hbar\omega^4/c_0^3$ requires $V_{\mathrm{mode}}\sim(c_0/\omega)^3$. A large occupation is consistent with a classical strain approximation but does not prove classicality: highly occupied number or squeezed states need not be classical.

For the restricted design that claims a prepared, approximately one-quantum packet and an interferometric distance readout, the following is a provisional sensitivity screen on a declared detector record $\theta_{\mathrm{1g}}$:
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

Here $\epsilon_N>0$ is the preparation's occupation tolerance, $\delta_{\mathrm{det}}$ is achieved distance uncertainty, and $\delta_{\mathrm{req}}>0$ is the displacement predicted by the specified mode and detector transfer function. The estimate $\delta_{\mathrm{req}}\sim L_{\mathrm P}$, with $L_{\mathrm P}=\sqrt{\hbar G_{\mathrm{eff}}/c_0^3}$, belongs to the wavelength-scale volume and comparable readout-length estimate; it is not a universal requirement for every detection route. The mass $M_{\mathrm{det}}$ and enclosing radius $D_{\mathrm{det}}$ are effective detector properties. A non-black-hole detector in the spherical compactness comparison additionally requires the compactness ratio to be strictly less than one.

The expected signal count $S_{\mathrm{1g}}>0$ and background count $B_{\mathrm{th}}\ge0$ refer to one declared exposure. The ratio $B_{\mathrm{th}}/S_{\mathrm{1g}}^2$ only compares signal size with Poisson background variance. Passing this order-of-magnitude screen is not detection confidence: $B_{\mathrm{th}}=S_{\mathrm{1g}}=1$ passes, yet for a Poisson background of mean one, the probability of at least two counts is $1-2/e$. A detection claim still needs a calibrated likelihood, false-positive threshold, efficiencies, and competing explanations. This count example uses normalized wake-speed units $c_f=1$; its probability calculation does not depend on a propagation speed.

Other detection routes require their own response calculation. An absorption or scattering experiment can resolve individual detector transitions even in a highly occupied incident mode; it does not inherit $|N_{\mathrm{occ}}-1|/\epsilon_N$ or the interferometric distance row. Its cross-section, exposure, efficiency, and backgrounds control its count likelihood. A photon/gravity conversion comparison must also bound pair production, vacuum polarization, and phase decoherence in its stated magnetic-field and coherence regime. These standard effective mechanisms are comparison assumptions, not premises of the architrino acceleration law.

A resonant-mass or phonon-style coincidence therefore needs one more separation before it becomes evidence for quantized gravity itself. A cooled bar may register a single vibrational excitation coincident with a calibrated gravitational-wave event, and an optical Weber-bar comparison may convert time-dependent gravitational-wave modulation into a photon phase or energy shift. Those are detector-side quantum transitions unless the packet also reports whether the incoming gravitational state is classical, coherent with huge occupation number, or deliberately prepared in a nonclassical state. A classical gravitational wave can still raise the transition probability of a quantized detector, just as a classical electromagnetic field can drive transitions in quantized matter. The stronger claim is not a detector click, but a detector click plus source-state evidence that rules out the corresponding classical driving account.

Dyson's interferometric sensitivity argument therefore supplies a restricted comparison, not a universal impossibility theorem. Evidence for field quantization requires statistics or another observable that rules out classical driving after the detector's quantum response is modeled. Agreement with a classical strain event remains an effective recovery target; a detector transition alone establishes neither incoming field quantization nor a Noether sea derivation.

When $\theta_{\mathrm{GW}}$ is also used to support a finite-range or dark-energy comparison, $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ must be carried beside this detector residual. Passing a high-frequency event-timing gate alone is not enough to promote a long-wavelength dispersion claim.

### Merger and Ringdown Horizon-Interface Gate

Stationary no-hair agreement is not enough to close the dynamical strong-field problem. If a black-hole model changes the horizon-interface boundary condition during formation, merger, or evaporation, the change must be tested against the detector-facing waveform packet and the same final compact-object labels used by exterior GR.

For a candidate horizon-interface record $\theta_H$, let $h_{\ell m}^{\theta_H}(t_{\mathrm{eff}})$ be predicted incoming strain modes before detector projection; $\ell,m$ label their angular harmonic components. Let $D_{\mathrm{merge}}^{\mathrm{obs}}$ contain the retained strain samples through inspiral, merger, and ringdown, with calibration and covariance supplied separately as conditions of the comparison. Use the same versioned public event record throughout. A compact diagnostic is
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

Here $M_f$, $\mathbf J_f$, and $Q_f$ are the final exterior mass, angular momentum, and charge labels of the Kerr-Newman comparison; $Q_f$ is not a quadrupole-deviation tensor. The projection $\mathcal P_{\mathrm{det}}$ applies detector response once, and $C_{\mathrm{merge}}$ weights strain residuals on the retained data space. The nonnegative dimensionless distances $d_{\mathrm{nohair}}$ and $d_{\mathrm{shared}}$ respectively compare supported final-object labels and consistency among the horizon, gravitational-wave, and black-hole records. Their scales and correlations must be declared; an unconstrained charge label cannot be treated as measured. Because remnant labels can be inferred from the same strain samples, the sum is a diagnostic budget, not automatically a likelihood. A calibrated excess rejects the specified model and comparison, not all possible horizon-interface dynamics.

The GWTC-5.0 release supplies event, population, and cosmological comparison products; GW250114 supplies a particularly precise ringdown comparison with Kerr-mode and horizon-area predictions. Within each event, waveform, remnant, recoil, and any distance inference must remain consistent with the same source and detector record. Population and cosmological results additionally combine many event records and require sample selection, redshift information, and shared population parameters; they cannot all be assigned to one source event. A proposed near-horizon "direct wave" interpretation remains a model-dependent hypothesis requiring separate discrimination from ordinary merger and ringdown structure.

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

Here $\Omega_{\mathrm{GW}}(f)$ is effective gravitational-wave energy density per logarithmic frequency divided by the declared cosmological reference energy density. The positive $\Omega_{\mathrm{GW}}^{\max}(f)$ is a bound with a specified spectral model and confidence level in the detector band $\mathcal B_{\mathrm{det}}$; it is not a universal pointwise limit on arbitrary spectra. The nonnegative dimensionless $d_{\mathrm{shared}}$ measures incompatibility with records for primordial light-element formation (BBN), the cosmic microwave background (CMB), and structure growth. A threshold of one is a conservative joint budget only after all its normalizations are declared. A significant stochastic signal constrains early history only after foreground separation. A null result excludes amplitudes above the applicable bound; it does not close the branch or determine its amplitude exactly.

### Energy Flux

The source-side benchmark is also part of recovery. In the isolated, slowly moving GR source comparison, conserved total mass-energy gives no time-varying leading mass monopole, the mass dipole's first derivative is conserved momentum, and the leading current dipole is conserved angular momentum. The first radiative source is therefore quadrupolar. For this leading-order benchmark, write $c_{\mathrm{GW}}\equiv c_{\mathrm{GW}}^{\mathrm{eff}}=c_0$ and let overdots denote derivatives with respect to the local source-frame $t_{\mathrm{eff}}$. The radiated power target is
$$
P_{\mathrm{GW}}
=
\frac{G_{\text{eff}}}{5c_{\text{GW}}^5}
\left\langle
\frac{d^3Q_{ij}}{dt_{\mathrm{eff}}^3}\frac{d^3Q^{ij}}{dt_{\mathrm{eff}}^3}
\right\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7152e6632c7b77e4)

Here $Q_{ij}=\int\rho_{\mathrm{src}}(x_{\mathrm{eff}}^ix_{\mathrm{eff}}^j-\delta_{ij}|\mathbf x_{\mathrm{eff}}|^2/3)\,d^3x_{\mathrm{eff}}$ is the trace-free mass quadrupole in source-centered Cartesian coordinates, $\rho_{\mathrm{src}}$ is effective source mass density, and angle brackets denote a cycle average. This formula assumes source size small compared with the radiation wavelength; cosmological redshift and detector projection are subsequent operations. A Noether sea derivation must supply the source mass map and radiation-energy current rather than assign mass to architrinos. The inverse-square per-hit acceleration law alone establishes neither a far-zone energy flux nor the absence of extra radiative channels.

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
{P_{\mathrm{quad}}(\theta_{\mathrm{src}})}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b6f57e2ac8c61513)

Here $P_b$ is the measured binary orbital period, $\dot P_b^{\mathrm{obs}}$ is its derivative after the stated kinematic and environmental corrections, $\theta_{\mathrm{src}}$ is the source model, and $\sigma_{\dot P_b}>0$ includes measurement and correction uncertainty. The predicted dipole and quadrupole powers use one normalization, and their ratio is defined only for $P_{\mathrm{quad}}>0$; a zero-quadrupole case needs an absolute dipole-power bound. No adjustable denominator floor may hide dipole emission. The source model must derive the relation between emitted power and orbital-period change using its energy balance. Composition-dependent coupling that exceeds the binary-system bound fails that source model's strong-equivalence-principle recovery, even if a detector tensor projection suppresses its display.

**Closure Target 3 (leading-order GW flux).** In the same regime, the cycle-averaged flux is
$$
\mathcal{F}_{\text{GW}}
=
\frac{c_{\text{GW}}^3}{16\pi G_{\text{eff}}}
\left\langle \dot h_+^2+\dot h_\times^2\right\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60add69d28a26c9a)

This polarization-summed normalization follows from $\dot h_{ij}^{\mathrm{TT}}\dot h_{\mathrm{TT}}^{ij} =2(\dot h_+^2+\dot h_\times^2)$ in the Isaacson comparison flux. It is the quantity used for binary-orbit energy-loss consistency checks. Energy localization for gravitational waves is an observer-level effective description: the packet may use cycle-averaged fluxes and asymptotic energy loss, but it should not promote a gauge-dependent local gravitational energy density into substrate ontology.

The averaging region must span many wave periods while remaining small compared with background-variation scales. The source loss, propagated wave energy, and receiver response must be related by one derived balance, including boundary exchange and medium absorption where present. Agreement with this flux formula by assumption would test an effective model; it would not establish energy conservation or tensor propagation for the underlying delayed histories.

### Claim Boundary and Sources

The TT component count and plane-wave dispersion follow conditionally from the stated mathematical assumptions. The Noether sea tensor response, source coupling, energy balance, and observer-map sufficiency remain open recovery targets. An independently computed violation of the assumed equilibrium, an extra radiative response above its applicable limit, or inconsistent source and receiver predictions on the same calibrated record reopens the corresponding claim. The chapter supplies no evaluated residual for an Architrino-generated event.

The external sources below support effective comparisons and observations; none supplies an architrino-level premise.

- Sean M. Carroll, *Lecture Notes on General Relativity* (1997), [arXiv:gr-qc/9712019, section 6](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll6.html), supplies the linearized sign convention, gauge reduction, and gravitational-radiation comparison.
- B. P. Abbott et al., *Gravitational Waves and Gamma-rays from a Binary Neutron Star Merger: GW170817 and GRB 170817A* (2017), [arXiv:1710.05834, section 4.1](https://arxiv.org/abs/1710.05834), supplies the timing interval and its emission-lag assumptions.
- B. P. Abbott et al., *GW170814: A Three-Detector Observation of Gravitational Waves from a Binary Black Hole Coalescence* (2017), [Physical Review Letters 119, 141101](https://doi.org/10.1103/PhysRevLett.119.141101), supplies the pure-polarization model comparison.
- B. P. Abbott et al., *GW190425: Observation of a Compact Binary Coalescence with Total Mass approximately 3.4 Solar Masses* (2020), [arXiv:2001.01761](https://arxiv.org/abs/2001.01761), supplies the single-observatory detection example.
- Freeman Dyson, *Is a Graviton Detectable?* (2012), [Poincaré Prize lecture manuscript, section 3](https://albert.ias.edu/bitstreams/dd422d6a-70ed-4de1-97da-a9a995a0a1e6/download), supplies the restricted wavelength-scale sensitivity comparison. Daniel Carney, Valerie Domcke, and Nicholas L. Rodd, *Graviton detection and the quantization of gravity* (2024), [Physical Review D 109, 044009; arXiv:2308.12988](https://arxiv.org/html/2308.12988v1), distinguishes detector clicks from evidence of field quantization.
- The LIGO–Virgo–KAGRA [GWTC-5.0 data-release documentation](https://gwosc.org/GWTC-5.0/) (2026) identifies the event and ensemble products. The collaboration's *GW250114: testing Hawking's area law and the Kerr nature of black holes* (2025), [arXiv:2509.08054](https://arxiv.org/abs/2509.08054), supplies the stated ringdown comparison.

## Black Holes

This chapter is the main black-hole orientation document for the spacetime branch. Its purpose is to tell the reader what survives from standard compact-object phenomenology, what is being reinterpreted at the constitutive level, and how a candidate strong-field Noether-braid regime is supposed to replace singularity language without losing observational discipline. No black-hole constituent is assigned a braid-taxonomy member here.

The substrate ingredients are [architrinos](../../../../markdown/aaa/foundations/architrino.md), point entities with fixed polarity whose expanding causal wakes carry the influence of their past motion; [absolute time](../../../../markdown/aaa/foundations/absolute-time.md), the universal ordering parameter $T$; and the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md), the fixed spatial container. A Noether braid is a candidate neutral assembly of coupled architrinos, and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is their proposed ambient population. Its constitutive description specifies how that population responds through density, stress, motion, and internal geometry. The strong-field alignment, binding, transport, and recycling mechanisms developed here have claim grade guessed until derived from retained histories; standard compact-object results enter as observer-level comparisons or recovery targets. A retained history is the past trajectory record needed to evaluate delayed interactions, not proof that the proposed assembly persists.

### Scope and Purpose

This chapter centralizes the black-hole story within $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to distinguish three levels that are often conflated in black-hole discussion:

- the **effective observational layer**, where black holes are compact objects constrained by lensing, dynamics, accretion phenomenology, horizon-scale imaging, and gravitational-wave data;
- the **strong-field constitutive layer**, where candidate Noether braid assemblies are proposed to enter alignment, compression, and recycling regimes beyond the weak-field response model;
- the **substrate ontology**, where the Euclidean void remains fixed and the Noether sea carries all dynamical structure.

The chapter does not replace weak-field or observer-level black-hole phenomenology. What survives from standard practice remains indispensable: compact-object mass inference, horizon-scale imaging, ringdown analysis, accretion and jet modeling, and the requirement that exterior predictions recover the tested general-relativistic limit to observational accuracy. The reinterpretation begins only when one asks what a black hole is made of, what replaces singularity language, and how strong-field interiors connect to cosmology.

Notation: bare $\theta$ denotes a declared constitutive record. The null expansions are always $\theta_\pm^{\mathrm{eff}}$, the jet opening angle is $\theta_j$, and the Noether sea parameter tuple is $\theta_{\mathrm{sea}}$; none of those subscripted objects may be substituted for another. Absolute evolution uses $T$; observable histories use effective coordinate time $t_{\mathrm{eff}}$ after a clock and coordinate map is declared. Bare $t$ in effective imaging, entropy, and AGN records abbreviates that declared effective time, never the native evolution parameter. The primitive wake speed $c_f$, dressed assembly-channel speed $c_{\mathrm{eff}}$, photon speed $c_\gamma$, and asymptotic observer calibration $c_0$ remain distinct. Throughout the schematic comparison residuals, each distance $d$ and norm needs a declared domain and normalization, weights must be nonnegative and fixed before comparison, and tolerances must be specified independently of the candidate result. An undefined term makes a residual unevaluable rather than zero.

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

Critical-collapse work in GR supplies a conditional threshold comparison. [Choptuik's numerical study](https://doi.org/10.1103/PhysRevLett.70.9) finds a threshold between dispersal and black-hole formation in specified spherically symmetric massless-scalar families. Its model-specific scaling does not establish a native alignment threshold. The native candidate must distinguish dispersal, capture, and interior continuation using its own complete branch histories.

### Collapse-Response Ladder

The proposed route from ordinary matter to a black-hole interior is a sequence of assembly-regime changes. The table separates standard matter comparisons from the hypothesized Noether sea response. In that response model, shielding reduces how strongly internal assembly motion contributes to an exterior readout; it does not remove primitive causal wakes. The amount of exposed response and its change under compression must be derived from the same delayed history.

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

The Chandrasekhar scaling argument is a standard comparison for loss of electron-pressure support. Here $n_e$ is electron number density, $P_e$ is electron pressure, $\rho$ is material mass density at fixed composition, $m_e$ and $m_u$ are the observer-level electron mass and atomic mass unit, $\hbar$ is the reduced Planck constant, and $G$ is the Newtonian comparison coupling. The speed $c_0$ is the observer calibration, and $\mu_e$ is the nucleons-per-electron composition factor. Quantum state counting and the relativistic energy relation are comparison premises to be recovered, not architrino-level laws. In a white-dwarf-like object, electrons fill the available quantum momentum states up to the Fermi momentum, which scales as
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
x_F\equiv\frac{p_F}{m_ec_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a54823296b97e107)

with $x_F\ll1$ giving the nonrelativistic $5/3$ law, $x_F\sim1$ marking a crossover, and $x_F\gg1$ giving the ultrarelativistic $4/3$ limit. Equivalently,
$$
n_{e,\mathrm{rel}}
\sim
\frac{1}{3\pi^2}
\left(\frac{m_ec_0}{\hbar}\right)^3,
\qquad
\rho_{\mathrm{rel}}
\sim
\mu_e m_u n_{e,\mathrm{rel}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-007f8f237e7aa63b)

which is approximately $10^6\mu_e\,\mathrm{g}/\mathrm{cm}^3$, or about $2\times10^6\,\mathrm{g}/\mathrm{cm}^3$ for carbon/oxygen material with $\mu_e\approx2$.

This is not a curve fit over diverse stellar observations. The exponents come from quantum state counting plus the energy-momentum relation: the number of filled momentum states gives $p_F\propto n_e^{1/3}$; nonrelativistic energy $E\sim p^2/(2m_e)$ gives $P\propto n_e^{5/3}$; relativistic energy $E\sim pc_0$ gives $P\propto n_e^{4/3}$. Observations test the resulting mass-radius and stability picture, but the scaling itself is a mathematical consequence of the Fermi reservoir model.

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
\lambda_A(T)=\frac{R_{\perp,A}(T)}{R_{\perp,A,0}},
\qquad
\mathcal{S}_{\mathrm{mat}}(\Omega,T)
=
\left\langle
\ln\lambda_A(T)
\right\rangle_{\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0c2c048da19789a2)

Here $R_{\perp,A}(T)$ is the transverse envelope radius of candidate assembly $A$, $R_{\perp,A,0}>0$ is its reference radius, and the brackets denote a declared population average over the native region $\Omega$. The logarithm requires positive radii; a vanishing envelope is outside this diagnostic's domain. Shrinkage is not an energy source. The proposed binding and reaction accounting is
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

The strong claim is that this material scale ledger should also project into the effective spatial-compliance ledger used by the metric description. Fix a smooth invertible comparison map $\psi_{t_{\mathrm{eff}}}:\Omega_{\mathrm{eff}}\to\Omega$ with nonsingular Jacobian from an effective spatial slice to a native region, and write $h^{\mathrm{ref}}=\psi_{t_{\mathrm{eff}}}^{*}h$ for the Euclidean metric represented on that same effective slice. If $\gamma_{ij}^{\mathrm{eff}}$ is the positive-definite observer-level spatial compliance metric, the corresponding isotropic scale readout is
$$
\mathcal{S}_{\mathrm{metric}}(\Omega_{\mathrm{eff}},t_{\mathrm{eff}})
=
\left\langle
\frac{1}{6}
\ln
\frac{\det\gamma_{ij}^{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})}
{\det h_{ij}^{\mathrm{ref}}}
\right\rangle_{\Omega_{\mathrm{eff}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d7be45d3e9739137)

The factor $1/6$ appears because $\gamma_{ij}^{\mathrm{eff}}=a^2h_{ij}^{\mathrm{ref}}$ gives a determinant ratio $a^6$. Both determinants must use the same coordinates; otherwise their ratio contains an arbitrary coordinate Jacobian. The averaging measure and the identification of the two regions must also be declared before comparing material and metric scale readouts. The closure target is not that $\mathcal{S}_{\mathrm{mat}}$ and $\mathcal{S}_{\mathrm{metric}}$ merely correlate after fitting. The same retained compact-region record must generate the electron-support failure, the assembly scale compression, the Noether sea response, and the effective metric readout without hidden retuning.

#### Iron-Core Collapse Handoff

For an iron-group stellar core, the central Standard Model transition is electron capture,

$$
p+e^-\rightarrow n+\nu_e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5429a198451682c1)

The outgoing neutrino is not just an abstract missing-energy label in this bookkeeping. The lepton-sector [neutrino construction](../../../../markdown/aaa/assemblies/fermions/neutrinos.md#referent-status) proposes a near-planar polarity-conjugate Noether braid pairing close to the photon channel. Its reference photon lock has not been exhibited as a retained equilibrium branch. Neutrality, weak coupling, high transport speed, and oscillation are therefore recovery targets for this construction, not consequences established by the proposed geometry. A collapse ledger must carry the neutrino's observer-level energy, momentum, angular momentum, and reaction provenance; any near-photon phase interpretation remains conditional on that construction.

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

Inside the star, electron-envelope language has mostly lost authority. The active ledger is neutron-rich nuclear matter or denser phases together with residual charged components, neutrino transport, pressure support, heat flow, stress, and local Noether sea updates. Necessary candidate diagnostics for that proposed branch can be stated as

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

for all retained radii $0\le r\le R_*$. Here $v_3$ is the binary-3 speed in the relevant branch record, $s_n$ is the packing-headroom diagnostic when a pressure-packing model is being used, and $\mathcal{R}_H$ is the strong-field regularity residual. The $s_n$ condition remains a candidate pressure-response target until a dense-matter branch supplies its packing-response coefficient $K_{\mathrm{pack}}$ and packing ceiling. These diagnostics are not sufficient for survival: $\mathcal R_H$ bounds selected coarse medium fields, while existence, full acceleration balance, causal-root completeness, and stability require separate control of the retained history.

The center of an ideal nonrotating neutron star is therefore not automatically horizon-like. For smooth spherically symmetric scalar profiles, the first radial derivatives vanish at the center; this statement does not apply to every tensor component or permit a central cusp. Pressure, cadence stretch, and packing pressure can be maximal there. If scalar density response is exhausted while $v_3<c_f$, the response must route into shape, strain, contact, transport, or dense-matter branch change. If the same record forces $v_3\to c_f$ and activates the horizon-interface condition, the neutron-star branch has ended and the continuation belongs to the horizon-interface branch below.

### Canonical Horizon Condition

The canonical strong-field alignment condition is inherited from [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md). Near the horizon interface, the working regime definition is

$$
v_2 = c_f,
\qquad
v_3 \to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec122bbcc77f4753)

with binaries 2 and 3 becoming coplanar and collinear with binary 1 at alignment and precession ceasing in that limit.

This condition defines the proposed terminal-alignment interface in the declared source record. It does not establish an event horizon, an apparent horizon, or capture of every transport channel. The indexed speeds describe constituent motion; a self-hit exists only when the retained path supplies a positive-delay causal root. A speed equal to $c_f$ at one instant is neither a self-hit certificate nor a no-escape theorem. Planck-scale language maps to this alignment condition only after an explicit derivation supplies the scale relation; without that derivation, the observer-level Planck scale and the native alignment condition remain separate closure objects.

The native causal test remains $\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$ with $T_t<T_r$, as in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form). For one emission and a prescribed fixed receiver site $\mathbf Y\ne\mathbf X_t(T_t)$, the wake support reaches that site at $T_r=T_t+\|\mathbf Y-\mathbf X_t(T_t)\|/c_f$, independently of the transmitter's later alignment. This geometric statement does not prove that an actual exterior receiver remains fixed or can decode a signal. It does rule out deleting arriving roots merely because their emission sites are labeled interior. Darkness, trapping, and release must be derived from complete constituent histories, assembly response, and observer access. Ordinary hits require positive separation and $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t\ne0$, where $\hat{\mathbf r}_t$ is the unit direction from emission to reception; folds, higher degeneracies, and coincidence need their own continuation analysis.

#### Event and Apparent Horizon Comparison

Standard horizon language separates two comparison objects that should not be collapsed into one. The event horizon is a global causal boundary: in an asymptotically flat effective spacetime it is the boundary, within that spacetime, of the causal past of future null infinity,
$$
\mathcal{H}_{\mathrm{event}}^{\mathrm{eff}}
=
\partial J^{-}\!\left(\mathscr{I}^{+}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60d48323cabd63f6)

This definition depends on the full future development of the effective spacetime. It is therefore not a local surface that a finite-time observer or one simulation slice can identify by inspection. In dynamical collapse, accretion, or merger cases, the event horizon can be located only by the global escape structure of null trajectories.

The apparent horizon is the more local comparison surface. In layer-explicit comparison notation, the chosen GR slice is $\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}$, not an absolute slice $\Sigma_T$. For a smooth outer boundary of the future-trapped region, the usual black-hole comparison is an outermost closed marginally outer trapped surface, with outgoing null expansion zero and ingoing null expansion negative,
$$
\theta_+^{\mathrm{eff}}=0,
\qquad
\theta_-^{\mathrm{eff}}<0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f71f571b5477c5ec)

This makes apparent horizons useful for simulations and local compact-object diagnostics, but it also makes them slice-dependent. The $\mathbb{A}\mathbb{A}\mathbb{A}$ horizon interface is neither of these GR objects by definition. It is the local constitutive condition $F_H=0$ on a strong-field record. The closure burden is that a single admissible complete development $\mathcal D$, whose restriction to the retained region and window is $\theta_{\Omega,W}$, should supply both comparisons. A finite local record need not select that development or its asymptotic boundary. For each such development with a defined future null infinity, the target is
$$
F_H(\theta_{\Omega,W})=0
\quad\Longrightarrow\quad
\left(
\mathcal{H}_{\mathrm{app}}^{\mathrm{eff}}(\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}};\theta_{\Omega,W}),
\mathcal{H}_{\mathrm{event}}^{\mathrm{eff}}(\mathcal D)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0bcc5d9ac959d830)

This is a conditional projection target. The local interface does not determine the global escape boundary unless admissible developments agreeing on the retained data also agree on that boundary. Without that sufficiency result, future development remains an additional input. Cosmological comparisons lacking this null infinity require their own declared access boundary. A local apparent-horizon match and a global event-horizon comparison must use compatible restrictions of the same development.

#### Exterior GR Benchmark Packet

For the stationary, nonrotating, uncharged vacuum comparison, the observer-level exterior must recover the Schwarzschild scales
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

The reported EHT imaging and modeling measurements are $42\pm3\,\mu\mathrm{as}$ for the M87$^*$ bright ring, with a central brightness depression and fractional width below $0.5$, and $51.8\pm2.3\,\mu\mathrm{as}$ for Sgr A$^*$, whose reconstruction must account for rapid variability and interstellar scattering. These are inferred source observables from interferometric data, not direct measurements of a horizon or of native alignment ([M87$^*$ results](https://arxiv.org/abs/1906.11243); [Sgr A$^*$ results](https://arxiv.org/abs/2311.08680)).

The geometry-side observable is the dimensionless same-source residual
$$
\delta_{\mathrm{ring}}^\theta
=
\frac{D_{\mathrm{ring}}^\theta-D_{\mathrm{ring}}^{\mathrm{Kerr}}}
{D_{\mathrm{ring}}^{\mathrm{Kerr}}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd3af5fc9fa9d5b6)

evaluated at the same exterior mass-to-distance ratio and with the same plasma-transfer nuisance model. The quoted fractional diameter uncertainties are approximately $3/42=7.1\%$ and $2.3/51.8=4.4\%$, respectively; they do not establish one universal four-percent metric constraint. The bright ring must be calibrated against the geometrical shadow, with mass-to-distance uncertainty, emissivity, variability, scattering, and model covariance included in the comparison ([EHT metric test](https://arxiv.org/abs/2311.09484)). A candidate near-horizon $c_{\mathrm{eff}}$ profile must predict the observable transfer map and $\delta_{\mathrm{ring}}^\theta$ under that calibration; quoting the observed diameter alone does not test the branch.

The closure lesson is that geometry-facing and environment-facing terms must not be conflated. The compact ring scale and brightness depression test the effective photon-path and capture map. The azimuthal brightness, fractional width, resolved polarization, Faraday rotation, and jet-base emission test the surrounding plasma, magnetic-like stress, scattering, and release-channel environment. A native black-hole branch fails the benchmark if it can fit the visual image only by changing the mass-to-distance map, if it matches the image while failing the visibility-domain data, or if it treats variable plasma structure as evidence that the horizon-interface condition itself has changed.

### Singularity Replacement and the Maximum-Curvature Core

GR singularity theorems concern geodesic incompleteness under their stated causal and focusing hypotheses ([Penrose](https://doi.org/10.1103/PhysRevLett.14.57)); they are not merely failures of a weak-field approximation, and incompleteness alone does not identify a point of infinite curvature. The $\mathbb{A}\mathbb{A}\mathbb{A}$ response is a proposed maximum-curvature regime. A delayed self-hit can supply an outward acceleration contribution on a specified path, but this does not prove a finite barrier or a bound assembly. The complete signed history must supply centripetal and tangential acceleration balance, boundary consistency, and stability. As in [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md), the retained mechanism remains open.

At the assembly level, the guessed mechanism involves opposite-polarity binaries whose complete histories admit delayed self-hits as compression drives constituent speeds through the $c_f$ regime. Instantaneous speed alone does not certify those roots or their signed net acceleration. A maximum-curvature orbit is a candidate outcome; existence, acceleration balance, and stability on a retained branch remain open. A dense population of such states is a further collective hypothesis.

The proposed structured core therefore remains a replacement hypothesis. Finite selected medium fields or a finite coarse record do not bound the master-equation acceleration, resolve coincidence, or prove existence and uniqueness of continuation through a singular causal-root configuration.

One preserved strong-field intuition is that sufficiently old or sufficiently compressed interiors may approach an ordered collapse limit rather than a thermalized point. In that heuristic picture, maximal-curvature candidate braids pack into a near-crystalline interior, while most entropy remains associated with the active shear and shredding layers nearer the horizon interface. This is not yet a constitutive derivation or a taxonomy assignment, but it is a useful candidate for how collapse can saturate without an ontic singularity.

#### High-Energy Probe Closure Target

A heuristic quantum-gravity comparison places a probe localization scale beside an effective compact-object radius. This motivates a possible limit on short-distance access, but probe energy alone does not prove black-hole formation. The comparison depends on localization, impact parameter, angular momentum, charge, wave-packet geometry, and the validity of the effective gravitational description. If a declared scattering benchmark independently establishes compact-object formation, the $\mathbb{A}\mathbb{A}\mathbb{A}$ candidate must recover its exterior behavior and supply the proposed alignment, entropy, and release records.

Let $\ell_{\mathrm{probe}}(E)$ denote the observer-level resolution scale associated with positive center-of-mass probe energy $E$, and let $R_H(E;\theta)$ denote a candidate horizon-interface scale. Within an independently justified compact-object formation regime, the proposed correspondence is

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

For a high-energy scattering comparison, $\ell_{\mathrm{probe}}(E)\sim\hbar c_0/E$ is a heuristic localization scale, subject to the apparatus and state preparation. Declare a nonempty active energy domain $\mathcal E_{\mathrm{BH}}$ from the comparison's formation criterion before evaluating a candidate. Its membership must not depend on that candidate shrinking or deleting $R_H$. A schematic residual for that fixed domain is
$$
\mathcal{R}_{E\to H}(\theta)
=
\int dE\,w(E)\,
\mathbf{1}_{E\in\mathcal E_{\mathrm{BH}}}
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

Here $w(E)\ge0$ is fixed independently of the candidate, has reciprocal-energy units, and integrates to one on $\mathcal E_{\mathrm{BH}}$. The nonnegative, dimensionless distances use declared comparison scales: $d_{\mathrm{curv}}$ tests proposed curvature control, $d_{\mathrm{ent}}$ tests the horizon entropy relation, and $\mathcal R_{\mathrm{release}}$ tests outgoing energy, momentum, angular momentum, polarity, provenance, medium, and remnant accounting. Missing labels, an undefined entropy count, or an absent horizon map make the comparison undefined, never a zero residual. A small residual certifies only its stated comparisons, not native existence or stability.

The closure condition is $\mathcal{R}_{E\to H}(\theta)\le\epsilon_{E\to H}$ using the same strong-field branch record that recovers exterior compact-object observables. A model fails this gate if it claims arbitrarily short-distance resolution in the active compact-object regime, or if it activates the horizon scale while leaving maximum-curvature labels, entropy capacity, or release-channel accounting undefined.

##### First Worked Probe Gate

As a heuristic extrapolation, combine a quantum localization scale with the Schwarzschild radius associated with a compact, approximately spherical energy distribution. Hold $G_{\mathrm{eff}}(\theta)>0$ and $c_0>0$ fixed during this algebra:
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

The two scales cross when
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

The inequality follows algebraically from the two assumed scales. It establishes neither a general scattering collapse threshold nor a native alignment or binding result. In particular, it cannot define the active domain of its own validation residual. It marks a regime requiring a formation calculation before a compact-object interpretation is justified.

The worked classification is:

| Heuristic regime | Scale relation | Interpretation burden |
| --- | --- | --- |
| particle-probe | $E < E_H(\theta)$ | ordinary scattering may remain valid within its independent domain |
| scale crossing | $E\approx E_H(\theta)$ | determine whether the prepared state actually forms a compact object |
| localization below comparison radius | $E > E_H(\theta)$ | if formation is established, compare the same candidate's alignment, entropy, release, and exterior predictions |

The falsifier is not merely failure to choose a numerical Planck scale. The falsifier is a split record: if the short-distance probe uses one $\theta$ while the induced horizon-interface, entropy, and release-channel ledgers require another, then the high-energy closure has not survived promotion.

### Horizon Interface

The candidate horizon interface is the most important black-hole concept in the local dialect. It names the proposed layer in which Noether braid assemblies would be flattened into an alignment-locked sheet. Its existence and identification with an observer-level horizon remain closure targets.

In the hypothesized interface state:

- the binary 2 remains locked at $v = c_f$;
- the binary 3 is driven to its terminal alignment limit $v_3 \to c_f$;
- precession collapses toward zero;
- information flow is compressed into an interface-like channel rather than ordinary volumetric propagation.

Constrained alignment motivates a guessed information-compression interface and a comparison with holography and AdS/CFT. Neither reduced alignment freedom nor suppressed precession proves an information-capacity law or a causal horizon.

The alignment state may also silence assemblies geometrically, but the available identity is narrower than that claim. The [axial polarity dipole identity](../../../../markdown/aaa/noether-braid/coordinate-axis-six-point-symmetry-and-return-response.md#moments-and-the-axial-polarity-dipole) is proved only for the symmetric phase-compensated equal-geometry orthogonal-axis braid two-ring geometry; an orthogonal-axis three-binary horizon braid does not inherit it. For a retained orthogonal-axis three-binary record define its polarity-signed axial moment directly and require that moment to vanish in the alignment limit before identifying horizon locking with dipole quietness. Until that coincident-midpoint orthogonal-axis braid calculation exists, darkness remains a causal-escape and transport statement, while higher-moment, phase, and precession labels remain admissible inputs to the entropy count rather than consequences of phase-compensated equal-geometry orthogonal-axis braid symmetry.

#### Horizon-Adjacent Photon Channel

In the candidate mechanism, the horizon interface is not modeled as a smooth geometric shell surrounding an otherwise empty interior. It would be an active Noether sea regime in which ordinary volumetric assemblies, photon-channel packets, speculative dark-sector photon-channel-adjacent modes, and terminally aligned Noether braid states can all approach the same symmetry-breaking threshold. The proposed interface is therefore a high-energy transport and selection target rather than an established passive or constitutive surface.

The candidate photon geometry is a coaxial contra-rotating polarity-conjugate planar pair; its physical referent remains unestablished, as distinguished from the prescribed app geometry in the [Photon Guide](../../../../markdown/aaa/archie/photon-guide.md#claim-grade-and-referent). The proposed connection to terminal alignment is therefore a hypothesis about candidate assemblies. A native strong-field calculation must determine which admitted channels enter, change cadence, become trapped, convert, or leave, and then establish their observer-level photon readout.

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

so $\Delta Y_{\gamma,H,j}<0$ records a blueshift segment and $\Delta Y_{\gamma,H,j}>0$ records a redshift segment relative to its declared comparison clock. To interpret the sum as an endpoint frequency ratio, adjacent segment endpoints must use a common calibration or include the clock-transfer factors between them. The sign convention alone predicts no net strong-field shift. In a validated effective photon regime, where the calibration $E=h\nu$ applies, the corresponding energy ledger is
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

The Ryu-Takayanagi comparison distinguishes an entropy surface from an event horizon. An entropy surface can contain a horizon component in suitable thermal and homology regimes, or merely approach a horizon without intersecting it ([Ryu and Takayanagi](https://arxiv.org/html/hep-th/0605073v3)). Let $\gamma_A^{\mathrm{eff}}(\theta)$ be a region-anchored entropy surface, and let $H_{\mathrm{eff}}(\theta)$ be an independently defined effective causal-horizon cut on the same comparison slice. Identifying that cut with $\{F_H=0\}$ remains a separate obligation. With one regulator and a finite positive denominator, define the exact-overlap fraction
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

This ratio measures only area shared exactly by the two surfaces. Disjoint surfaces can approach arbitrarily closely while $\eta_H=0$ throughout; a near-horizon limit requires a separate convergence statement. Even $\eta_H=1$ establishes coincidence only up to area-null sets under the declared regulator. It does not prove a global event-horizon property or identify the native alignment interface with that horizon.

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

The use of $c_0$ in the energy row marks the observer-level exterior calibration. The $E_i$ must include a declared allocation of binding, interaction, and boundary contributions exactly once; independent additive constituent energies cannot be assumed. The ensemble is schematic until compatibility, retained histories, and observer resolution are specified. Exterior labels $(M,\mathbf J,Q)$ alone do not specify a native history or prove a no-hair theorem.

For the count below, $\mathcal B_H$ must mean a finite, nonempty set of coarse equivalence classes at fixed resolution and fixed tolerances on the exterior labels, not the continuum of exact paths. Finitely many named label types do not imply finitely many admissible states. The formula $k_B\log|\mathcal B_H|$ applies to an equiprobable ensemble; a declared nonuniform distribution instead requires $-k_B\sum_\lambda p_\lambda\log p_\lambda$. Neither the discretization nor equiprobability follows from terminal alignment.

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

provided a sequence of increasingly large interfaces and blocks exists with boundary-to-area ratio tending to zero, fixed label resolution, and fixed area calibration. A single finite black hole does not admit arbitrarily large blocks. Existence and boundary independence of both limits must be proved; the raw statement $s_{\mathrm{align}}^H\to1/4$ is only the special case $a_H\to1$.

#### Temperature, First Law, and Release Timescale

An entropy target without a temperature and timescale does not close the thermodynamic comparison. For a stationary, nonrotating, uncharged exterior with positive mass and fixed calibration, the Hawking benchmark is
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

These are observer-level recovery targets for the declared stationary comparison, with fixed couplings and exterior boundary conditions. Varying the embedding or external work can require additional terms. A finite integer state count has no ordinary thermodynamic derivative without a controlled coarse or large-system limit. The native candidate must supply that limit and a release spectrum before its entropy derivative can be compared with $T_H$.

The idealized Schwarzschild blackbody evaporation estimate is
$$
t_{\mathrm{evap}}^{\mathrm{Schw}}
=
\frac{5120\pi G_{\mathrm{eff}}(\theta)^2M^3}
{\hbar c_0^4},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fc366fc0d5b369c3)

with greybody factors and the available species ledger modifying the coefficient. This is a conventional idealized estimate, not a species-independent lifetime. The Page-time comparison concerns the turnover of the fine-grained radiation entropy $S_{\mathrm{rad,fine}}^{(O)}$ for a specified evaporating state and radiation subsystem. A crossing of competing semiclassical entropy estimates can approximate that time under additional assumptions; it is not a universal equality between measured radiation entropy and remaining horizon entropy. A release model must separately predict the radiation entropy history and its completion time ([Almheiri et al., entropy of Hawking radiation](https://arxiv.org/html/2006.06872v1)).

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

for the same record, observer window, coarse resolution, and block family. This compares cardinalities only. Equal counts can describe different state sets and distributions, so they do not establish compatibility, measure preservation, boundary factorization, or an area law. Those require an explicit correspondence between admissible states and their probabilities, followed by the independent area-density calculation.

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

An equilibrium benchmark can also compare detailed balance. Let $\mathcal L_H$ pair declared forward and reverse formation/release channels with the same time convention and channel measure. Define equilibrium fluxes $j_\ell^+=\pi_{a,\mathrm{eq}}\Gamma_{a\to b}$ and $j_\ell^-=\pi_{b,\mathrm{eq}}\Gamma_{b\to a}$, where $\pi$ is the equilibrium state population and $\Gamma$ the conditional transition rate. With fixed positive flux scales $j_{0,\ell}$, a schematic comparison is
$$
\mathcal{R}_{H,\mathrm{bal}}(\theta)
=
\sum_{\ell\in\mathcal{L}_{H}}
w_\ell
\left[
\frac{j_\ell^+(\theta)-j_\ell^-(\theta)}{j_{0,\ell}}
\right]^2
+
d_{\mathrm{ent}}\!\left(
S_{\mathrm{gen}}^{(O)},
k_B\log|\mathcal{B}_{H}^{(O)}|+S_{\mathrm{out}}^{(O)}
\right)
+
d_{\mathrm{CPT}}\!\left(\mathcal{R}_{\mathrm{CPT}}(\theta),0\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e8a4f2ac7071d66d)

The entropy term uses generalized entropy, defined below. Weights are fixed nonnegative normalized channel weights, and each distance uses a declared dimensionless scale. Detailed balance compares population-weighted fluxes, not equal unweighted conditional probabilities; the absorption/emission ratio carries a thermal factor in the effective comparison ([Ryskin](https://arxiv.org/pdf/1810.07520)). CPT recovery, when invoked, requires its own defined reversal map and residual. CPT alone does not place an evaporating object in equilibrium. Apply the flux-balance term only to the declared equilibrium benchmark; a nonequilibrium release history needs its time-dependent population and entropy accounting instead.

The species puzzle supplies a separate entropy guardrail. If $N_{\mathrm{spect}}$ counts effective spectator species that do not enter the native closure labels, release channels, or null-result ledger, then horizon entropy should be insensitive to relabeling. Since species number is discrete, the relevant test is a finite difference at fixed physical content:
$$
\left|
\Delta_{N_{\mathrm{spect}}}S_H^\theta
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

The LVK analysis of GW250114 reports near-equal $\sim33M_\odot$ progenitors, low spins, a strong post-merger record, and an inferred final area larger than the summed initial areas. These are model-based inferences from gravitational-wave data that strengthen the area-law and Kerr-ringdown comparisons; they do not establish native horizon-interface states ([LVK analysis](https://arxiv.org/abs/2509.08054)). The native burden remains recovery of the exterior and release observables from one admissible source history.

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
k_B\log\left|\mathcal{B}_{H}^{(O)}(t)\right|,
\qquad
S_{\mathrm{gen}}^{(O)}(t)
=
S_H^{(O)}(t)+S_{\mathrm{out}}^{(O)}(t)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9b11b8b1039d4149)

where $S_H^{(O)}$ is horizon-only entropy and $S_{\mathrm{out}}^{(O)}$ is exterior matter/radiation entropy for a declared cut, subsystem, state, and regulator. The finite equiprobable-count qualification above applies to $\mathcal B_H^{(O)}$. These terms must be calibrated to the same effective comparison before addition; an observer's uncertainty count alone is not a derivation of semiclassical entropy. The generalized-entropy inequality above adds the exterior term exactly once. The Page curve instead concerns $S_{\mathrm{rad,fine}}^{(O)}$ for the chosen radiation subsystem; a nondecreasing event-horizon generalized entropy need not have a Page turnover ([Almheiri et al.](https://arxiv.org/html/2006.06872v1)).

In the same notation, the region-anchored entropy target is
$$
S_{\mathcal{Q},A}^{(O)}(t)
\stackrel{\mathrm{target}}{=}
k_B\log\left|\mathcal{L}_{\gamma_A}^{(O)}(t)\right|
+
S_{\mathrm{out},A}^{(O)}(t)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d39dc579866753c)

The proof burden is to define the finite observer-relative label ensemble and its probability measure from native histories, boundary wakes, and release records, then justify the relevant entropy-surface prescription. Exact overlap measured by $\eta_H$ alone cannot establish that entropy reduction. Identifying this expression with fine-grained radiation entropy additionally requires the appropriate extremization and surface selection of the effective comparison; a generic area-plus-exterior sum does not supply the Page curve.

This also disciplines the local semiclassical version of the information paradox. A statement that a horizon-straddling correlation has been lost is only a promoted comparison claim after the access region, reference resources, boundary wake data, and readout channel have been declared. Local QFT pair language remains useful near a smooth effective horizon, but it is an approximation to an observer-level calculation. The native black-hole closure must say which Physical Observer could recover which part of the release record, and which finite boundary data make that recovery meaningful.

##### Complexity-Growth Comparison Target

Black-hole complexity proposals add a narrower comparison target. Their useful content is not the claim that interior volume is primitive ontology. It is the observation that some black-hole interior comparisons continue to change long after ordinary thermal entropy has effectively saturated. The native translation is a horizon-interface ledger complexity, not a new spacetime substance.

For two compatible horizon-interface label states $\Lambda_a,\Lambda_b\in\mathcal{B}_{H}(M,\mathbf{J},Q)$, define
$$
\mathcal{C}_{H}(\Lambda_a,\Lambda_b)
=
\inf\left\{
N\in\mathbb N_0:
U_N\circ\cdots\circ U_1(\Lambda_a)=\Lambda_b,\
U_i\in\mathcal{U}_{\mathrm{loc}}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9b294a6c4b9707c1)

where $\mathcal U_{\mathrm{loc}}$ is a fixed permitted update set with declared locality, resolution, and resource cost. The empty composition at $N=0$ is the identity; an unreachable target has complexity $+\infty$. Allowing arbitrary rescaled or compound updates would make the count convention-dependent or trivial. For an observer class, minimize over its admissible representatives under the same update set. This formal count is not physical duration or a computation-cost measurement without an independently established dynamical and resource calibration.

The comparison burden is then:
$$
S_H^{(O)}(t)\ \text{approximately saturates while}\
\mathcal{C}_{H}^{(O)}(t)\ \text{can continue to grow}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-27fa1274700d8bd2)

without breaking exterior no-hair behavior, Page-compatible release accounting, or finite-boundary-data regularity. If this growth can be matched only by importing a literal boundary CFT, an AdS interior ontology, or an independent hidden state not present in $\mathcal{B}_{H}^{(O)}(t)$, then the complexity comparison has not been translated into the native black-hole closure.

#### Finite-Boundary Endpoint Closure

The endpoint and information questions can be posed on a compact strong-field region. Finite extent and duration do not imply that finitely many observer measurements specify the native state. For a region $\Omega$ between absolute times $T_i$ and $T_f$, a single continuation map is a target only after its inputs contain sufficient dynamical history:
$$
\mathcal{T}_{\Omega}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{[T_i,T_f]},
\mathcal N_{\mathrm{sea}}|_{\Omega\times[T_i,T_f]}
\right)
\longrightarrow
\left(
X_\Omega(T_f),
\mathcal{B}_{H}^{(O)}(T_f),
S_{\mathrm{out}}^{(O)}(T_f)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-145a368c973339ce)

Here $X_\Omega$, $\mathcal H_\Omega^{<T}$, $\mathcal B_{\partial\Omega}$, and the Noether sea state $\mathcal N_{\mathrm{sea}}$ use the [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#ontic-and-epistemic-levels) conventions. The inputs must include every relevant retained causal contribution, including external wakes that crossed the boundary before $T_i$ and remain active inside. The listed medium history is an input or a jointly solved consistency condition, not a prediction obtainable from its own assumed values. Complete history data may support a deterministic map if existence and uniqueness are proved; finite coarse measurements generally select a family of compatible histories. A unique observer output requires constancy across that family or a declared statistical projection. Candidate endpoint diagnostics are
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}^{(O)}(T_f)\right|<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8ad9379519181dba)

with outgoing energy, momentum, angular momentum, charge, polarity, provenance, and medium updates accounted for. These finite coarse diagnostics do not prove continuation of the master equation at zero separation or a degenerate root, nor do they make an inaccessible interior clock observable. The existence, uniqueness, regularity, and observer-projection obligations remain separate.

This gives a compact comparison rule for evaporation and endpoint proposals. A proposal can be used as a comparison framework if it sharpens one of those finite-ledger checks. It should not be promoted into the ontology unless the same native horizon-interface variables produce the continuation without an arbitrary endpoint branch or a separate asymptotic bookkeeping rule.

No-hair, cosmic-censorship, Cauchy-horizon, and endpoint theorems enter this chapter with the same assumption discipline. Their strongest use is to preserve exterior compact-object behavior, horizon regularity, non-arbitrary continuation, and finite-release accounting where their hypotheses match the comparison regime. When a theorem assumes an isolated vacuum black hole, asymptotically flat exterior, or global hyperbolicity condition, it cannot by itself settle a black hole embedded in an evolving Noether sea. The retained burden is sharper: the native horizon-interface record must reproduce the exterior $(M,\mathbf{J},Q)$ coarse-graining, avoid observer-level naked-singularity pathology, and construct admissible continuations from sufficient retained history and boundary data, with a separate account of what finite observer records determine.

As a heuristic geometric picture, the horizon can also be described as a **dimensional pinch** along the candidate orthogonal-axis three-binary response path. On this reading, ordinary 3D assemblies are flattened toward a near-planar disk at the alignment interface, while the interior self-hit regime permits re-opening of the suppressed axial degree of freedom. In shorthand, the proposed response path is
$$
\text{3D sphere} \to \text{2D horizon disk} \to \text{3D interior reopening}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-28e787792b6dc456)

This is not yet a derived strong-field theorem. It is a compact way of expressing why the horizon is treated as an information-compression layer rather than as a literal ontic edge of space. The horizon pinch, the light-speed limit of the Lorentz axis ratio in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md), and the planar coherent-channel limit in [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) all carry a charted ratio $\xi\to0$, but that numerical coincidence does not identify them. They become one geometric endpoint only if a single retained family record derives the same supported geometry and compatible exchange holonomy across the three charts. Until then, the common endpoint is a conditional closure hypothesis.

### Cosmological Embedding and Horizon Regularity

A viable black-hole account in $\mathbb{A}\mathbb{A}\mathbb{A}$ must work at two scales simultaneously. It must reproduce the compact-object phenomenology of the local exterior, and it must remain coherent when the object is embedded in the evolving large-scale medium. This requirement matters because many intuitive pictures of black holes tacitly treat them as if they lived in asymptotically isolated settings, whereas the cosmological sector requires a compact object to sit inside a time-dependent background.

Horizon regularity under cosmological embedding is therefore a structural requirement. Coupled evolution of a local strong-field candidate and the surrounding Noether sea is a proposed route to satisfying it; writing shared constitutive variables does not establish regularity. The same histories must yield controlled acceleration and a compatible exterior under the declared boundary conditions.

This point sharpens the proposed role of the horizon interface. In the candidate mechanism, the interface would be both the place where local assembly geometry reaches terminal alignment and the layer through which the compact object remains connected to the surrounding Noether sea without forcing a curvature blowup at the constitutive transition. Horizon regularity is therefore a closure test for whether this black-hole regime can communicate with cosmology, not evidence that the regime already exists.

The strong-field closure should therefore be posed as a Noether sea boundary-condition problem, not as the direct importation of an isolated Schwarzschild or Kerr metric. The horizon-interface condition is the canonical closure problem stated in [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition), written here in shorthand as
$$
F_H=0,
\qquad
v_2=c_f,\quad v_3\to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d5ffe5db48ca3e7)

The ensemble $\{\lambda_i^H\}$ above names a proposed continuation-label family; its admissible histories, finite coarse count, and continuation are not constructed here. The boundary $\partial\Omega$ carries surrounding Noether sea data and the exterior comparison conditions. The task is to show that the same admissible medium histories can recover weak-field observations and a regular terminal-alignment interface under non-isolated embedding. Compact, topologically identified, or other non-asymptotically-flat effective settings are conditional stress tests, not extra dimensions of the substrate.

The finite-boundary-data version of this requirement is inherited from [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md#finite-boundary-data-regularity). For every compact strong-field comparison region $\Omega$, the native variables $\rho_{\text{NS}}(\mathbf X,T)$, $\Sigma_{\text{sea}}(\mathbf X,T)$, and $\mathbf u_{\text{sea}}(\mathbf X,T)$ must remain finite while the horizon-interface condition is imposed. This is the local substitute for treating a classical metric singularity as an endpoint: the weak-field variables may fail, but the Noether sea ledger and maximum-curvature closure must not become arbitrary.

[Cadoni et al.](https://arxiv.org/html/2601.03296v2) construct an effective cosmological-embedding comparison with apparent-horizon analysis, backreaction, and a Misner-Sharp mass split separating local and cosmological contributions. These model-specific results motivate a test of regular embedding; their metric and anisotropic-fluid assumptions do not establish a native medium law. The corresponding native obligation is to construct an admissible history with controlled acceleration and compatible mass, redshift, and release observables.

### Interior Dynamics and Recycling

The guessed interior picture is recycling: primitive architrinos persist while assembly organization and observer readouts may change. Processing through self-hit layers, interface locking, and reconfiguration remains to be derived. A statistical medium of maximum-curvature candidates is one proposed description, contingent on first establishing admissible assemblies and their collective dynamics.

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

The recycling-furnace analogy names that proposed redistribution and reprocessing. Persistence of primitive entities alone does not prove an outward energy channel, a conserved effective energy, or a finite endpoint.

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

with fixed exterior calibration $c_0$ and a declared energy partition. Here $\Delta E_{\mathrm{comp,exp}}$ denotes the compact contribution before the separately subtracted escaping flux; if it already denotes net stored-energy change, that flux must not be subtracted again. Boundary work and reabsorption must be assigned exactly once. $R_{M,\mathrm{app}}$ is a measured mismatch with a fixed tolerance, not an adjustable source of missing energy. Conservation and the mass projection require an independently derived branch energy map.

### Mass-Scale Traversal

One proposed exterior-to-core description can be tested at different mass scales, but its validity and formation route are not implied by mass alone. A restricted Schwarzschild comparison organizes horizon area, tidal gradients, and thermal scales before environment and formation history are supplied.

For a stationary, nonrotating, uncharged Schwarzschild comparison, write

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

These are effective geometric scales whose identification with the proposed alignment interface remains unproved. At fixed $G_{\mathrm{eff}}$, $c_0$, and $A_{\mathrm{align}}$, the guessed patch-capacity estimate is

$$
N_{\mathrm{align}}(M;\theta)
\sim
\frac{A_H(M;\theta)}{A_{\mathrm{align}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dd008719f47864f6)

while a tidal acceleration gradient at the horizon scales as

$$
\mathcal{K}_H(M;\theta)
\sim
\frac{G_{\mathrm{eff}}(\theta)M}{R_H^3(M;\theta)}
\propto
M^{-2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a7c3ebaa44b1c5d2)

Here $\mathcal K_H$ has units of inverse time squared; it is not the Kretschmann scalar $K_{\mathrm{Schw}}$, which scales as $M^{-4}$ at the Schwarzschild horizon under these fixed calibrations. Thus this comparison gives smaller objects steeper horizon tidal gradients and higher Hawking temperatures, and larger objects larger areas. It does not require every stellar or intermediate-mass object to pass through a neutron star: direct collapse and mergers need their own source histories. Neither a long recycling lifetime nor the strongest environmental coupling follows from large mass alone.

| Scale | Dominant pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading |
| :--- | :--- | :--- |
| Small or near-evaporating black hole | Steep local gradients, high release-channel pressure, small $N_{\mathrm{align}}$ | Best stress test for finite maximum-curvature replacement, Hawking-like release normalization, and endpoint ledger closure. |
| Stellar-mass or intermediate black hole | Collapse-ladder continuity and merger/ringdown consistency | Best stress test for the handoff from dense matter support to terminal alignment and for exterior strong-field recovery. |
| Supermassive black hole | Large candidate $N_{\mathrm{align}}$; lifetime and environmental coupling require separate histories | Tests Noether sea loading, release-channel selection, dark-sector hypotheses, and possible cosmological coupling. |

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

The meaning of $R_X$ must be fixed by the material model. If it denotes a geometric Schwarzschild horizon radius, set it equal to that comparison radius. If it denotes an interaction or capture radius, gravitational focusing and channel-dependent trajectories can make it larger; the horizon supplies no general upper bound. A native core radius requires its own retained branch. Energy deposition, acoustic and thermal response, and survival must then be predicted before transit effects can support a compact dark-sector interpretation.

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

This ordering states the hypothesis that jets or less visible channels may load the surrounding Noether sea with processed content. The source history and outward causal path must be demonstrated for each proposed channel.

#### Dark-Sector Escape and Re-Entry

The local framework therefore keeps open the possibility that some processed content crosses outward through the horizon interface in a form that is initially dark to ordinary electromagnetic observation. This is escape through the proposed constitutive interface. A future-directed causal trajectory inside an effective event horizon cannot reach the future null infinity used to define that horizon. A mode that crosses the candidate interface outward must therefore be checked against the independently reconstructed causal boundary and its admitted propagation channel. Weak electromagnetic coupling alone supplies no escape mechanism, and visible jets do not demonstrate escape from a global event horizon.

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

Observer-level jet comparisons constrain source energy, launch speed, and collimation. The model must identify its inflow, disk, spin, or boundary-layer source of energy and angular momentum. For a weak-field, nonrelativistic launch model, a possible speed-scale benchmark is

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

This Newtonian expression applies only where $2G_{\mathrm{eff}}M/(R_{\mathrm{launch}}c_0^2)\ll1$ and the compared flow is nonrelativistic. It is not a general AGN launch law and cannot replace a relativistic energy and Lorentz-factor prediction near a black hole. The same source history must also predict collimation and propagation. A minimal release-channel record is

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

AGN jets connect near-hole launching to large-scale environmental work. Relativistic magnetohydrodynamic simulations support spin extraction through ordered magnetic flux as an effective jet mechanism ([Krolik and Hawley](https://arxiv.org/abs/0909.2580)); they do not prove a universal spin requirement or a native acceleration mechanism. The chapter's source selector must identify which effective mechanism and observational regime it aims to recover. Let

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

where $R_{\inf}$ is the observer-level black-hole influence scale (the subscript denotes influence, not infinity), $\Phi_{\mathrm{BH}}^{\mathrm{obs}}$ is the standard black-hole magnetic-flux comparison diagnostic rather than substrate field ontology, $\mathcal{A}_{\mathrm{NS}}$ is the mapped Noether sea anisotropy and loading state, and $\Sigma_{\mathrm{wind}}$ records disk-wind or sheath confinement. The local selector must then produce one channel record

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

The pass condition $\mathcal{R}_{\mathrm{AGN\,jet}}(\theta)\le\epsilon_{\mathrm{AGN\,jet}}$ is a benchmark on release-channel closure. It captures six source signals at once. First, a spin-powered comparison must also specify the disk, inflow, and stress that enable energy extraction; the residual does not establish a universal spin requirement. Second, collimation over radii from near $R_{\mathrm{launch}}$ toward $R_{\inf}$ must be attributed either to disk wind, sheath, gas pressure, or the mapped anisotropy state $\mathcal{A}_{\mathrm{NS}}$, not to an unspecified funnel. Third, high-power jets may become proton-dominated or baryon-loaded enough that $f_p$ controls cosmic-ray, neutrino, and hadronic cascade channels. Fourth, FR-I and FR-II behavior must be separated by the same propagation record: weak or disrupted jets dissipate near the black-hole/galaxy transition and become plumes or bubbles, while powerful jets keep relativistic kinetic power to terminal hot spots. Fifth, shocks, reconnection-like comparison regions, pair production, and pair cascades are radiation-channel benchmarks, not independent sources of free energy. Sixth, source age and environment matter: a jet engine, lobe, cocoon, and duty cycle must all close the same energy, momentum, angular-momentum, provenance, and medium-update ledger.

This residual also states a useful failure mode. A model that matches a near-hole jet image but cannot account for hot spots, lobes, cosmic-ray or neutrino limits, and environmental heating has not closed the AGN release channel. Conversely, a model that fits large radio lobes while leaving launch selection unrelated to spin, accretion, wind/sheath confinement, and $\mathcal{A}_{\mathrm{NS}}$ has only fit the downstream plume. The whole point of the AGN packet is to force the release selector to connect the black-hole branch, disk-interface branch, propagation branch, radiation branch, and feedback branch with one declared state record.

### Relation to Dark Energy and Expansion History

The black-hole chapter does not identify dark energy with black holes by definition. The proposed dark-energy mechanism in $\mathbb{A}\mathbb{A}\mathbb{A}$ is Noether sea relaxation, as developed in [../cosmology/dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md). Black holes enter that story only if strong-field recycling makes a measurable contribution to the slowly varying binary-3 tension sector.

The proposed constitutive chain, at guessed grade, is:

1. strong-field compression drives assemblies into horizon and interior recycling regimes;
2. recycling redistributes energy between locked internal modes and outward-propagating medium excitations;
3. those excitations can, in principle, alter the large-scale Noether sea state;
4. the cosmology module then reads that altered Noether sea state as part of $\rho_{\mathrm{DE,eff}}(z)$ or its source term.

This means black holes are candidate contributors to dark-energy phenomenology, not substitutes for the Noether sea ontology.

A candidate transport model makes this claim more specific. Let $f_N(\nu,\mathbf X,T)$ describe a coarse distribution of Noether braid cadences, $J_\nu$ its cadence-space current, $S_{\mathrm{BH}}$ and $S_{\mathrm{GW}}$ proposed source terms, and $R_{\mathrm{eq}}$ a proposed relaxation operator. Their definitions and the native energy–cadence map must be derived from retained histories; the observer photon relation $E=h\nu$ is not that derivation. A schematic balance is

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

[Ahlen et al.](https://arxiv.org/html/2504.20338v2) study an effective cosmologically coupled black-hole model whose source history depends on cosmic star formation. Their fits compare expansion data and additional cosmological constraints under that model and its assumed formation history. This is a conditional external comparison, not an established observational requirement that black holes generate dark energy. A native contribution to $\rho_{\mathrm{DE,eff}}(z)$ would still require one derived formation, inflow, release, and transport history with consistent independent observables.

High-redshift quasars add a compact source-accounting stress test. The observational product is not a black-hole mass in isolation: it joins a redshifted spectrum, absorption by the reionization-era intergalactic medium, broad emission-line velocities near the central engine, luminosity modeling, and survey selection into one inferred early supermassive black hole record. A quasar seen when the universe is only a few percent of its current age but whose spectrum implies a compact object near $10^9M_\odot$ is therefore not merely a large-mass anecdote. It asks whether the same redshift, clock-rate comparison, formation, inflow, and release histories can produce the observed source without switching comparison records.

Little-red-dot spectroscopy supplies the obscured-accretion version of the same test. In GLIMPSE-17775 at $z=3.501$, foreground lensing by Abell S1063, JWST/NIRCam photometry, and a deep JWST/NIRSpec/G395M spectrum expose more than forty emission and absorption features. These spectral measurements and the dense-cocoon interpretation are reported by [Kokorev et al.](https://arxiv.org/html/2511.07515v2); the cocoon is a model inference, not a resolved image of the native interior. The important data product is not just a broad-line black-hole mass. Exponential permitted-line wings, Balmer and helium absorption, Ly$\beta$-pumped Bowen-fluorescent oxygen lines, and a Ly$\alpha$-pumped Fe II forest indicate that line formation is dominated by a dense, partially ionized cocoon around a rapidly accreting compact source. The external "black hole star" phrase is therefore retained only as comparison language: for $\mathbb{A}\mathbb{A}\mathbb{A}$ the recovery target is one early strong-field growth record that keeps the central engine, gas reprocessing, host component, lensing map, X-ray/radio suppression, and inferred Eddington ratio in the same source-history account.

QSO1 in Abell 2744 adds the direct-dynamical version of the little-red-dot test. At $z=7.04$, foreground lensing and multiple imaging let JWST spectral astrometry resolve a rotating gas field around the compact source. The important result is that the velocity field behaves like a point-mass-dominated Keplerian record rather than an extended stellar cluster, diffuse host component, or dark-matter halo alone. [Maiolino et al.](https://www.nature.com/articles/s41586-026-10579-4) infer a central mass of tens of millions of solar masses using an inclination-aware kinematic model; the simpler spectroastrometric estimate supplies a lower bound. The host is inferred to be chemically primitive and comparatively light. These conclusions depend on lens reconstruction, source geometry, and dynamical modeling. For $\mathbb{A}\mathbb{A}\mathbb{A}$ the safe recovery target is therefore not the claim that primordial black holes are confirmed. It is a same-source early-growth packet binding lensing reconstruction, gas kinematics, compact mass inference, host mass, metallicity, X-ray faintness, and seed-history interpretation before direct-collapse or primordial-black-hole language is allowed to act as a comparison branch.

Inactive high-redshift black holes add the complementary stress test because their masses are not inferred from current quasar luminosity. In MRG-M0138 at $z\simeq1.95$, JWST integral-field spectroscopy, a foreground lens model, and stellar-dynamical fitting resolve the host's central stellar kinematics well enough to infer an inactive black hole near $6.0^{+2.1}_{-1.7}\times10^9M_\odot$. This is the stellar-dynamical inference reported by [Newman et al.](https://arxiv.org/abs/2503.17478), not a direct weighing of the horizon. The observational packet is therefore different from the quasar packet: foreground lens reconstruction, source-plane mapping, stellar velocity dispersion, dynamical-model family, host quiescence, and survey selection all enter the mass record. For $\mathbb{A}\mathbb{A}\mathbb{A}$, the useful lesson is not that a dormant object supplies a new ontology. It is that early strong-field site formation, host-galaxy quenching, and later invisibility must be handled by one formation, inflow, release, and Noether sea history rather than by fitting a compact-object mass separately from the galaxy-history record.

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
- **Power-scale comparison:** $L_P\sim c_0^5/G$ and $F_P\sim c_0^4/G$ are effective dimensional scales. A universal maximum does not follow from dimensional analysis; maximum-luminosity and maximum-tension proposals require additional hypotheses and admit counterexamples to broad formulations ([Jowsey and Visser on luminosity](https://arxiv.org/abs/2105.06650), [on maximum force](https://www.mdpi.com/2218-1997/7/11/403)). A native release model must state the precise comparison regime and derive its energy flux; it must not install an unproved universal cutoff.
- **Embedding regularity:** the same strong-field description must remain regular when the compact object is treated as embedded in an evolving large-scale medium rather than an artificially isolated background.
- **Finite-boundary-data regularity:** sufficient retained history and boundary data must support controlled native evolution through the proposed alignment regime; finite coarse observer records require a separate sufficiency or statistical-projection result.
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

The candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ strong-field picture treats black holes as Noether sea regimes rather than ontic singularities or void defects. It proposes a terminal-alignment horizon interface and a maximum-curvature recycling interior; both remain closure targets, as does any measurable contribution of recycling to the late-time Noether sea state. What remains strongest from standard black-hole theory is the observer-level phenomenology. The proposed ontological reclassification treats geometry as an effective summary of constitutive Noether sea behavior and GR incompleteness as a comparison challenge requiring an independently controlled native continuation, but acceptance requires the retained histories, boundary conditions, ledgers, and observer recovery defined in this chapter.

## Singularity Resolution

This chapter states the proposed strong-field replacement for a singular endpoint and the conditions needed to establish it. A Noether braid is a neutral assembly of architrinos, the point transceivers whose delayed wakes determine acceleration; the Noether sea is the ambient population of such assemblies inside the fixed Euclidean void. The candidate mechanism is a finite maximum-curvature or horizon-interface regime. Its existence, dynamical selection, and continuation remain open. This is the canonical strong-field bridge for [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md).

Three meanings of singularity must be kept separate: failure of an effective coordinate chart, incompleteness or divergent curvature of an effective spacetime, and loss of an admissible solution of the delayed [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md). Removing a coordinate divergence settles only the first. Here maximum curvature refers to the proposed bending limit of constituent paths or assembly geometry, not curvature of the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md). The strong-field model must derive a nonzero size or bounded path curvature from dynamics; the point-architrino ontology supplies no hard core. The replacement must specify the packed assembly state, readable exterior records, and history and boundary data sufficient to determine continuation.

### Canonical Strong-Field Alignment Condition

This chapter is the canonical source for the strong-field event-horizon alignment condition used across spacetime documents. The condition is a prescribed assembly-level target for an effective horizon description. Its identification with an event horizon requires a separate global signal-escape map; local alignment alone does not establish that identification.

For the candidate three-binary record, let $v_a$ denote the internal constituent circulation speed of binary $a\in\{1,2,3\}$ in its declared assembly chart. The primitive wake speed is $c_f$, measured relative to the void. The comparison of these speeds belongs to this prescribed record; admissible hits still use the full constituent histories in the absolute frame. The proposed near-interface regime is
$$
v_2=c_f,\qquad v_3\to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c6fce30f92818c9a)

The arrow records approach from ordinary exterior coupling in this declared source record. In the prescribed terminal limit, binary 3 reaches the same field-speed threshold as binary 2, all three indexed binary axes align, their circulation planes become coplanar, and precession ceases. These speed assignments are source-record constraints, not taxonomy-assigned roles.

This condition is a proposed constitutive boundary condition on Noether sea state: it describes the medium response that must be derived from assembly dynamics. The horizon is therefore treated as an interface problem: what packed assembly state is allowed, what boundary data reach the exterior, and which continuation labels remain finite? In schematic form, the horizon-interface closure problem is
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

Here $\rho_{\text{NS}}$ is braid number density, $\Sigma_{\text{sea}}$ is sea stress, and $\mathbf u_{\text{sea}}$ is sea flow, all extracted from one declared population record. The symbol $\partial\Omega$ denotes the boundary of the compact region $\Omega$ and, as shorthand in $F_H$, the prescribed data on that boundary. The proposed finite index set $I_H$ labels candidate strong-field continuations $\{\lambda_\alpha^{\mathrm{cont}}\}_{\alpha\in I_H}$; their existence and selection must be proved. Neither $F_H$ nor the label set is a supplied constitutive solution. This is a local generic label slot, not a new Noether braid taxonomy. Specific chapters instantiate it with their own ensembles; for example, [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) uses its horizon-interface label ensemble $\{\lambda_i^H\}$. This display is the canonical statement of the horizon-interface closure problem: other chapters should cite this section and write the shorthand $F_H=0$ rather than restating the argument list. A viable singularity replacement must solve the alignment condition with finite boundary data in embedded, non-isolated settings, rather than relying on asymptotic flatness as an implicit support.

#### Observer-Time Boundary

A maximum-curvature interior is not assigned an ordinary physical-observer clock unless a recoverable clock channel survives. At the horizon-interface boundary, exterior records remain ordered by absolute time and by the observer-level clocks recovered outside the compact region. Inside a hard packed regime, the local Noether braid cadence, signal access, and material ruler channels may no longer supply a Physical Observer state. Let $\mathrm{Clock}_{\mathrm{PO}}(\Omega_{\mathrm{int}})$ denote the set of recoverable physical-clock channels in the declared interior region and time window. Only for a regime in which every such channel has been shown to fail is the following boundary statement valid:
$$
\mathrm{Clock}_{\mathrm{PO}}(\Omega_{\mathrm{int}})=\varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-359a0483fe300833)

This conditional statement does not follow from loss of exterior signal access: an inaccessible interior clock and an absent local clock are different claims. [Absolute time](../../../../markdown/aaa/foundations/absolute-time.md), the universal parameter $T$, still orders interior, exterior, and boundary histories. A recovered interior clock would falsify the empty-channel assignment on that same regime and window.

#### Trapped-Surface Comparison Pressure

At the general-relativistic (GR) comparison layer, a closed future-trapped surface is a compact spacelike two-surface without boundary on which both future-directed null expansions are negative everywhere. These expansions measure the fractional area change of the two orthogonal light-ray families:
$$
\theta_+^{\mathrm{eff}}<0,\qquad \theta_-^{\mathrm{eff}}<0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aaaa15c9e3871b88)

Penrose's theorem applies beyond exact spherical symmetry, but the trapped-surface condition alone is insufficient. The remaining hypotheses are part of the comparison.

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

Here $\mathrm{NullComplete}^{\mathrm{eff}}_+$ means future null-geodesic completeness. The effective stress-energy inequality holds for every null vector $k^\mu$; with the effective Einstein equations it implies null convergence, $R_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge0$, where $R_{\mu\nu}^{\mathrm{eff}}$ is the effective Ricci tensor. The condition $\mathcal C^{\mathrm{eff}}$ specifies a sufficiently regular, time-oriented Lorentzian spacetime with a noncompact Cauchy surface, a surface met once by every inextendible causal curve. Under these hypotheses and the closed trapped-surface premise, future null completeness fails: some inextendible future null geodesic has finite affine length. This conclusion does not by itself prove divergent curvature, infinite density, or a zero-volume endpoint. See [Penrose's theorem](https://doi.org/10.1103/PhysRevLett.14.57).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ response is not to import the singularity as ontology. The comparison target is instead
$$
\theta_+^{\mathrm{eff}}<0,\quad \theta_-^{\mathrm{eff}}<0
\quad\Longrightarrow\quad
F_H=0,\qquad \mathcal{R}_H(\Omega)<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f9e38d953cf846d8)

for the corresponding compact strong-field region $\Omega$, after the effective variables are translated into native Noether sea boundary data. The implication is a recovery target, not a consequence of the trapped-surface inequalities. The model must supply the constitutive translation and an admissible evolution into the proposed regime.

Let $\mathcal B_H$ denote the proposed set of horizon-interface continuation labels for that compact region's retained boundary-wake, path-history, and Noether sea record. Its nonemptiness and finiteness are targets. A finite set of labels does not imply a finite set of microscopic states: continuously varying histories may share a label.

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

A substrate continuation can coexist with incomplete effective null geodesics if the effective description ends at its stated domain boundary. If the recovered effective spacetime is instead claimed to remain future null complete, at least one of the other stated Penrose hypotheses must fail. The replacement must identify that boundary or failed hypothesis explicitly; finite boundary data do not evade the theorem.

Critical collapse adds a threshold benchmark. In Choptuik's spherically symmetric, minimally coupled massless-scalar comparison, an effective initial-data parameter $p$ crosses a critical value $p_*$ from dispersal to black-hole formation. On the supercritical side $p>p_*$, the leading mass-scaling trend is
$$
M_{\mathrm{BH}}\propto(p-p_*)^\gamma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba3c43afd2c58cf9)

where $M_{\mathrm{BH}}$ is the formed black-hole mass and $\gamma$ the critical exponent; the leading power law has logarithmically periodic fine structure. The limiting critical solution has discrete self-similarity,
$$
Z(s_{\mathrm{coll}}+\Delta,x_{\mathrm{coll}})=Z(s_{\mathrm{coll}},x_{\mathrm{coll}}),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc3067a4576727a3)

for dimensionless or rescaled effective fields $Z$, with echoing period $\Delta$. The logarithmic coordinate is $s_{\mathrm{coll}}=-\ln[(t_*-t_{\mathrm{eff}})/t_0]$, where $t_*$ is the accumulation time and $t_0>0$ a reference duration; $x_{\mathrm{coll}}=r_{\mathrm{eff}}/[c_{\mathrm{cmp}}(t_*-t_{\mathrm{eff}})]$ is the dimensionless comparison radius, with $c_{\mathrm{cmp}}$ the GR comparison light speed. These are effective coordinates for $t_{\mathrm{eff}}<t_*$, not substrate time or physical-clock readout $\tau$. Near-critical solutions exhibit only a finite approximate echoing interval. Ecker, Ecker, and Grumiller construct analytic self-similar comparison families in a large-$D$ expansion, where $D$ is the comparison spacetime dimension; this does not supply the four-dimensional critical solution or remove its singular endpoint. The $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery target is not a literal crystallization of substrate spacetime. It is to show that the finite-boundary-data transition has a controlled threshold, a repeatable echoing or cadence row when the effective comparison requires one, and a finite continuation family on the compact-region side of the threshold.

#### Finite-Boundary-Data Regularity

The useful comparison lesson from analytic singularity-removal programs is not an imported mirror boundary or complex-time ontology. It is the regularity criterion. A candidate strong-field replacement must keep its selected state variables finite in the declared solution class and make continuation unambiguous where the effective metric description fails.

For a compact strong-field region $\Omega$, fix the population coarse-graining and the stress norm, positive reference scales $\rho_{\text{NS},0}$ and $\Sigma_0$, and field speed $c_f$. A minimal dimensionless amplitude diagnostic at absolute time $T$ is
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

A windowed statement writes $\sup_{T\in W}\mathcal{R}_H(\Omega,T)<\infty$; the shorthand $\mathcal{R}_H(\Omega)<\infty$ means this rowwise normalized diagnostic is finite on the declared single-time or windowed comparison. It is used together with the horizon-interface condition $F_H=0$ and a finite Noether braid closure-label ensemble. This is a necessary amplitude target, not a regularity or continuation theorem. These three coarse variables do not bound constituent separations, path curvature, accelerations, derivatives of an exported metric, or causal-root weights. The strong-field model must establish those controls in the solution class it claims.

A regulator replaces a singular expression by a smooth family for analysis or computation. In the [Master Equation's auxiliary regulator](../../../../markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation), $\eta>0$ smooths causal-wake thickness and $\epsilon_c>0$ softens the zero-separation kernel; neither is a derived physical core radius. Finiteness at fixed regulators does not establish a finite or regulator-independent limit. A continuation claim must specify the retained history domain, all admitted roots, the zero-delay endpoint exclusion, convergence as the regulators are removed, and control of any omitted wake tail.

On a simple causal-root chart, $r>0$ is the emission-to-reception distance and $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_t(T_t)$ is the emission-time derivative of the causal constraint. Here $\hat{\mathbf r}$ points from emission to reception and $\mathbf V_t(T_t)$ is the past transmitter velocity. The acceleration weight is $c_f/|D_t|$. Uniform separation and transversality floors, complete root counts, and bounded root sums must be established on the declared window. At $D_t=0$, the ordinary root formula fails; a separately justified singular-event rule is required. The [finite-impulse fold analysis](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse) permits integrable acceleration divergence at positive separation, but does not supply coincidence continuation or a general uniqueness theorem. Existence of a solution, its differentiability, continuous dependence on data, and extension past the endpoint are distinct obligations.

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

Here $E_{\mathrm{pack}}$ denotes an independently defined packed energy account, $E_{\mathrm{ext}}$ its channel-specific exterior response, $\mathcal D_{\mathrm{defect}}$ the retained defect configuration, and $\theta_{\mathrm{sea}}$ the constitutive sea record. The schematic $\Pi_{\mathrm{surf}}$ is a proposed exposure map, not an assumed linear or idempotent projection and not an energy source. The closure burden is to derive this map from packing, interface, and Noether sea boundary data. Without that split, a model risks counting hidden packed energy as ordinary exterior mass in one paragraph and shielding it in the next.

A sharper endpoint criterion is that compatible initial histories and boundary records admit a continuation map on a declared solution domain. Here $X_\Omega(T_i)$ denotes the interior state, including positions, velocities, and identities, $\mathcal H_\Omega^{<T_i}$ the relevant past histories, $\mathcal B_{\partial\Omega}$ the incoming boundary-wake data, and $\mathcal N_{\mathrm{sea}}$ the surrounding medium record. With $T_i<T_f$, the candidate endpoint map is
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

Writing the arrow does not prove that a solution exists throughout $W=[T_i,T_f]$ or that its endpoint is unique. The history and boundary inputs must meet the compatibility, root-domain, and continuation hypotheses of the same delayed law. Prescribed inflow over $W$ is used only as it arrives; a responding sea must be solved jointly with the interior, not specified afterward to select a desired past trajectory. Spatial compactness and finite field amplitudes do not compress continuous histories into finitely many numbers. A finite-memory or finite-dimensional reduction needs its own sufficiency or tail-error argument. The replacement must preserve the declared energy, momentum, angular momentum, polarity, and provenance accounts.

#### Cauchy-Horizon Comparison Pressure

GR Cauchy-horizon and cosmic-censorship language is useful here only as comparison pressure. It asks whether an effective initial-data surface has a unique global continuation or whether the observer-level spacetime description admits extensions not determined by that surface. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the substrate answer is not to import global hyperbolicity as an axiom. The native answer must show that the finite region record selects a finite admissible continuation family.

Write $\mathcal L_{E\mathbf p\mathbf J}$ for the same-record ledger of observer-calibrated energy, linear momentum, and angular momentum transfers across the compact-region boundary. Saying that it closes means that every retained interior, interface, and exported channel is accounted for within the declared tolerance, using the same calibration and independently justified balance law. Defining an unobserved channel as the negative residual of the others supplies an identity, not independent conservation evidence.

For the same compact region $\Omega$ and interval $W=[T_i,T_f]$, let $\theta_{\partial\Omega,W}$ denote the complete declared input package of $\mathcal T_\Omega$, including its initial-history data and model conventions. Define a candidate family by ranging only over solutions of that same delayed law on all of $W$, with those inputs and the root, regulator, and boundary controls above:
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

with every element carrying a closure label, finite horizon-interface ledger, and event-ledger accounting. An empty family supplies no continuation. Finiteness is an additional target for this record, not a proof of uniqueness: two labeled endpoints still require a selection rule. For complete admissible initial-history data, deterministic well-posedness requires one physical evolution, up to declared representation equivalences, throughout $W$. A finite family may describe unresolved alternatives of a coarser observer record, but that record and its relation to the complete inputs must be stated. An infinite family falls outside the displayed finite-family target; cardinality alone does not establish physical indeterminism. Later release, entropy, and exterior mass $M$, angular momentum $\mathbf J$, and charge $Q$ must be computed from the same retained record.

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

with the same compatible data driving the transition throughout the interval and $F_H(T)=0$ imposed on its declared interface. Finite-window existence does not imply global existence for arbitrary $T_f$. A result for an isolated stationary exterior remains a comparison result until it supplies the required dynamical continuation.

Cadoni and colleagues' cosmological embeddings sharpen this comparison under spherical symmetry, anisotropic-fluid sourcing, no radial energy influx, and specified cosmological boundary data. Their horizon-regularity construction distinguishes the apparent horizon and local/cosmological mass contributions; the Schwarzschild embedding still has a central singularity. It therefore does not establish complete singularity removal. The corresponding native obligation is to carry the medium's response to the compact object inside $\theta_{\partial\Omega,W}$ and evaluate the continuation in that evolving environment.

### Maximal Curvature vs Planck Scale

In the working indexed chart, **binary 1** is assigned the maximal-curvature self-hit regime as a proposed outward barrier against continued collapse. Circular self-hit does not supply centripetal support; any stabilized outcome requires the complete partner, self, wake-boundary, and return-map ledger. **Binary 2** is constrained to the field-speed row ($v_2=c_f$), with **scale and cadence retuning**, as a candidate energy-storage channel for transfers across the candidate braid record. Neither role selects a taxonomy member or is established as a retained mechanism.

In the same proposed source record, strong-field conditions are assigned an increase in **binary 3's frequency** and an approach of $v_3$ to field speed, while **binary 2** remains at $v_2=c_f$ as its radius and frequency shift. These assignments still require a dynamical derivation. The full indexed row is
$$
v_1=v_1^{\mathrm{br}}(T),\qquad
v_2=c_f,\qquad
v_3\to c_f,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b4b86991e381dff4)

where the branch-measured $v_1^{\mathrm{br}}$ carries no universal field-speed assignment and the proposed binary-1 interior mechanism separately requires an admissible same-transmitter self-hit root. At the horizon-interface limit, binaries 2 and 3 reach $c_f$, all three indexed axes align, and precession ceases. This is a prescribed closure target, not a retained-branch result.

One preserved intuition, to be read only as a heuristic, is that this alignment limit may correspond to a temporary **planar horizon state** rather than to the final interior shape. In that picture, the horizon is the point of strongest flattening, while deeper interior self-hit response can reopen the suppressed polar degree of freedom so the orthogonal-axis three-binary braid returns to a finite 3D configuration instead of terminating in a zero-volume endpoint. This is compatible with the maximum-curvature replacement logic, but it is not yet a derived mechanism; compare [Horizon Chirality and Planar Spin](../../../../markdown/aaa/spacetime/horizon-chirality.md).

**Mapping rule:** "Planck-scale" references and the **event-horizon alignment condition** are separate comparison objects unless an explicit derivation supplies their scale map. The field-speed rows are necessary alignment indicators, not a Planck-scale identification or a self-hit proof by themselves; the admitted branch still needs same-transmitter root existence, transversality/Jacobian control, transmitter-side acceleration weight, and retained ledger closure.

> Claim grade: guessed. The alignment-to-finite-interior mechanism is a physical hypothesis. It is rejected for a declared history class if the complete delayed dynamics cannot reach and continue through the proposed interface, if the limiting state or exported observables depend on the auxiliary regulator, or if identical complete admissible inputs admit inequivalent physical continuations. A failure of one candidate history does not reject every possible strong-field replacement.

### Source Notes

- Roger Penrose, “Gravitational Collapse and Space-Time Singularities” (1965), [doi:10.1103/PhysRevLett.14.57](https://doi.org/10.1103/PhysRevLett.14.57), pp. 58–59: the trapped-surface comparison, global hypotheses, and null-incompleteness conclusion.
- Matthew W. Choptuik, “Universality and Scaling in Gravitational Collapse of a Massless Scalar Field” (1993), [doi:10.1103/PhysRevLett.70.9](https://doi.org/10.1103/PhysRevLett.70.9): the critical-collapse benchmark; Shahar Hod and Tsvi Piran, “Fine Structure of Choptuik's Mass-Scaling Relation” (1997), [arXiv:gr-qc/9606087](https://arxiv.org/abs/gr-qc/9606087): the correction to a pure power law.
- Christian Ecker, Florian Ecker, and Daniel Grumiller, “Analytic Discrete Self-Similar Solutions of Einstein–Klein–Gordon at Large D” (2026), [arXiv:2601.14358](https://arxiv.org/html/2601.14358v1), §§ I, IV–V: an analytic comparison family with a singular endpoint.
- Mariano Cadoni, Leonardo de Lima, Mirko Pitzalis, Davi C. Rodrigues, and Andrea P. Sanna, “Cosmologically Coupled Black Holes with Regular Horizons” (2026), [arXiv:2601.03296](https://arxiv.org/html/2601.03296v2), § II: model-specific horizon regularity and cosmological embedding.

## Horizon Chirality

This chapter studies how the Noether braid `pro/anti` orientation label relates to planar circulation in a proposed horizon-interface limit. An orthogonal-axis three-binary Noether braid is a candidate neutral assembly of six [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers of fixed polarity, organized into three indexed opposite-polarity pairs. Their histories evolve in the fixed [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) with universal [absolute time](../../../../markdown/aaa/foundations/absolute-time.md) $T$. The planar construction below classifies prescribed geometry; the existence, approach, and stability of such a dynamical branch remain open.

The three-dimensional candidate has persistent binary indices, an ordered set of orbital normals, and precession, meaning that those normals change direction. The proposed horizon-interface limit assumes that the same assembly approaches coplanarity and alignment. The question is whether an exterior record can distinguish its preceding pro/anti orientation or only a reduced planar circulation pattern.

The chapter is therefore a reduction map, not a new chirality doctrine. It keeps four labels from collapsing into one another: the deeper 3D pro/anti branch orientation, polarity conjugation at fixed worldlines, the planar clockwise/counterclockwise sign seen from an exterior normal, and any later helicity-like sign tied to a propagation or translation axis.

### Source-Record Horizon Condition

The orthogonal-axis three-binary terminal-alignment target is inherited from [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition) and [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md#canonical-horizon-condition). Here $v_a$ is the internal constituent circulation speed of binary $a$ in its declared assembly chart, and $c_f$ is the primitive wake propagation speed relative to the void. These internal speeds are distinct from the assembly group speed. In the illustrative source record used here, the proposed near-interface speed rows are

$$
v_2 = c_f,
\qquad
v_3 \to c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d9fca1808c6ae6b)

with the three binary axes becoming collinear, their circulation planes becoming coplanar, and precession ceasing in the prescribed limit. The speed rows alone imply none of these geometric conditions.

The speed assignments to binaries 2 and 3 belong to this source record; the taxonomy does not assign field-speed roles to fixed indices. Local alignment is distinct from an effective event horizon, a global boundary defined by which signals can escape. Their identification requires the same-history transport and observer-access map described in Black Holes. The planar disk here is the local assembly plane, not a claim that a whole black-hole horizon is a disk.

A retained history records past constituent trajectories and their causal roots; it is not a certificate of persistence. Every admitted hit obeys $\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$ with $T_t<T_r$, where $r$ labels the receiver and $t$ the transmitter. On a regular simple-root chart the separation is positive, $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}\ne0$, and $D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}$, with $\hat{\mathbf r}$ directed from emission to reception. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) uses the acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ and the separate root-playback derivative $dT_t/dT_r=D_r/D_t$. A calculation must retain every admitted root, justify its history window and any omitted tail, and supply a continuation rule where these regular-domain conditions fail. An instantaneous speed equal to $c_f$ supplies neither a self-hit nor a horizon certificate.

### Pro/Anti Before Planar Lock

Away from the horizon, the project treats `pro/anti` as an orientation property of the 3D orthogonal-axis three-binary braid scaffold rather than as polarity conjugation, matter/antimatter, or a net-charge distinction. The orientation basis is owned by [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md#proanti-noether-braid-basis):

- `pro`: deformation-stable indexed-frame orientation $o_{\mathrm{PA}}=+1$, conventionally represented by `123`;
- `anti`: deformation-stable indexed-frame orientation $o_{\mathrm{PA}}=-1$, conventionally represented by `132`.

The `123/132` strings are orientation mnemonics in a declared indexed frame, not temporal orderings of labelled events. Parity cannot reverse a bare temporal ordering. Here $P$ denotes spatial inversion of the full history; $C$ denotes reversal of all polarities at fixed worldlines. The $P$-odd claim belongs to the retained path or angular-momentum-frame row $o_{\mathrm{PA}}$, whose deformation stability and parity action must be demonstrated. In the ordinary orthogonal-axis three-binary braid, the three binaries occupy non-coplanar planes with an ordered set of normals and a genuine precession structure, so that row is a candidate 3D chirality datum.

One candidate diagnostic is the projected causal writhe defined in [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#causal-writhe-and-topological-use):

$$
Wr_c(\mathfrak B)
=
\sum_{e\in\mathcal E(\mathfrak B)}
\operatorname{sgn}(e)\,
\chi_{\mathrm{causal}}(e)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5c6a23a0d22053f)

Here $\mathcal E(\mathfrak B)$ is the finite set of individual transverse double-crossing events in a declared oriented three-dimensional realization and regular planar projection of the causal-root locus. Each event is counted once, including repeated crossings of the same strands. Its sign is the determinant sign of the projected oriented over-strand and under-strand tangents; $\chi_{\mathrm{causal}}(e)$ is one for an event admitted by a fixed causal-selection rule and zero otherwise. Projected tangencies, triple crossings, missing over/under data, or unspecified selection leave this formula undefined until resolved.

This is a projection-dependent crossing statistic. Recording $D_t$, $D_r$, and $W^{\mathrm{acc}}$ does not make it a topological invariant. A protected linking or framing class additionally requires defined curves, closures, framing, and admissible deformations. Geometric writhe can vary while framed linking remains fixed, as explained in [Constructing the Absolute Frame](../../../../markdown/aaa/foundations/constructing-the-absolute-frame.md#parity-convention-and-dynamical-chirality).

So the cleanest reading is:

- the surface convention for `pro/anti` remains the ordered `123/132` orthogonal-axis three-binary braid distinction;
- a protected topological branch label remains a candidate requiring its own invariance proof; $Wr_c$ is one diagnostic on the same declared history and projection;
- polarity conjugation $C$ leaves $o_{\mathrm{PA}}$ unchanged because it relabels polarities at fixed worldlines; the proposed parity row is $P:o_{\mathrm{PA}}\mapsto-o_{\mathrm{PA}}$.

A triple of orbital normals alone does not establish the proposed parity-odd sign. Circulation normals are axial vectors: under spatial inversion both a relative position and its velocity reverse, so their cross product does not. Their scalar triple product is therefore parity even. A parity-odd pro/anti carrier requires additional indexed path or framing data and a demonstrated transformation rule.

At exact planar degeneracy, $o_{\mathrm{PA}}$ is unassigned under the [canonical convention](../../../../markdown/aaa/archie/terminology-usage.md#proanti-orientation-and-polarity-conjugation). A preceding nondegenerate history can retain its assigned label as provenance. Whether any exterior record distinguishes that provenance is a separate mapping question.

### Broader Pro/Anti Balance in $\mathbb{A}\mathbb{A}\mathbb{A}$

The [pro/anti coupling model](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md) proposes locally or mesoscopically balanced orientation populations. That is a population hypothesis, not a consequence of neutral constituent polarity or a derived prediction of universal orientation balance.

Several standing examples point in that direction.

- **Noether sea / spacetime medium:** coupling complementary orientation populations is a proposed mechanism for medium response; its population law and stability remain to be derived.
- **Photon channel:** the named photon target is a coaxial contra-rotating polarity-conjugate planar pair. The relation between a record $\mathfrak B$ and its fixed-worldline $C$-image reverses polarities but preserves circulation. Consequently contra-rotation requires separately specified member histories and a relative-motion rule; it does not follow from $C$. Pro/anti orientation is unassigned at exact planarity.
- **$2+2$ pro/anti cluster hypothesis:** the standing cluster intuition remains a $2+2$ object, with two pro and two anti Noether braids in a three-dimensional coupled state rather than a single-sign configuration.

The horizon problem tests whether a classified three-dimensional orientation has a planar readout. It does not determine the population balance of the universe.

Orientation-selective reaction channels then become the special case. Pro-Noether braid and anti-Noether braid orientations may meet as geometric complements and open fast reconfiguration channels, but that pairing is not automatically a particle-antiparticle reaction. A matter-antimatter event additionally requires polarity-conjugate retained branch records and conjugate charged-sector ledgers. In either case, the standard word "annihilation" is too blunt: the deeper process is a **reaction** or **reconfiguration event** in which coupled structures open, exchange, and re-express their content through new channels rather than vanishing into nothing.

Reaction selectivity and any population asymmetry require their own retained-history evidence. This chapter uses the balanced-population model as context without treating it as a demonstrated property of the sea.

### Working Dictionary

To keep terms from sliding into one another, use the following provisional dictionary throughout this chapter:

| Label | Meaning in this note | Typical regime |
| --- | --- | --- |
| `pro/anti` | the deeper 3D Noether braid orientation $o_{\mathrm{PA}}$, represented by `123` versus `132` only after an indexed frame is declared; $C$-even, with $P$-oddness a retained-row obligation | pre-planar 3D braid |
| polarity-conjugate pair | one retained record $\mathfrak B$ and its fixed-worldline polarity-reversed image $C(\mathfrak B)$ | any regime, including the planar limit |
| `CW/CCW` | the nonzero planar circulation sign relative to a chosen viewing normal | prescribed planar state |
| `left/right` | a proposed relation between a common circulation axis and group velocity, requiring a separate spin and weak-exposure map | high-velocity aligned regime |

This chapter treats these as related but not yet identical labels. One of its main goals is to understand how they may collapse onto one another in the terminal high-velocity regime.

### Comparison Across Sectors

The horizon question becomes clearer when compared against the main assembly sectors already present in the theory.

| Sector | Pro/anti organization | Dimensional character | Why it matters here |
| --- | --- | --- | --- |
| Noether sea | proposed balanced pro/anti population | mainly 3D distributed medium | population balance remains a coupling-law hypothesis |
| Candidate photon channel (referent-pending) | coaxial contra-rotating polarity-conjugate planar pair; pro/anti orientation unassigned | planar / propagating pair target | shows that polarity-conjugate pairing remains meaningful after the 3D order has collapsed |
| $2+2$ pro/anti cluster hypothesis | `2+2` pro/anti cluster | 3D coupled cluster | shows balanced multi-braid organization without collapsing to one sign |
| Orientation-selective reaction channels | pro/anti encounters can open rapid reconfiguration channels without thereby being matter/antimatter events | mixed 3D and reaction geometry | tests whether ordered orientation changes reaction accessibility |

This comparison helps keep the horizon problem honest. The goal is not to prove that the universe is mostly pro or mostly anti. The goal is to understand how one compressed orthogonal-axis three-binary braid advertises its branch structure when driven into the strongest alignment regime.

The photon row is also an interface to the radiation and cosmology stack. Because the candidate photon-channel construction is modeled as a moving planar polarity-conjugate pair, it is the transport target most naturally comparable to the flat symmetry-breaking state. That does not make every photon a horizon fragment, but it does make horizon-adjacent photon processing a serious candidate mechanism: the same planar branch logic is proposed for free photon propagation, horizon-interface compression, strong-field blueshift, outward redshift, or release-channel conversion depending on the surrounding Noether sea record.

<a id="exterior-planar-angular-momentum-basis"></a>

### Exterior Planar Circulation Basis

Fix a unit viewing normal $\hat{\mathbf N}$ to the local assembly plane, pointing toward the chosen viewing side. For binary $a$, let $\mathbf r_a=\mathbf X_{a,+}-\mathbf X_{a,-}$ be its relative position at the same absolute time $T$, and define the kinematic circulation vector $\mathbf j_a=\mathbf r_a\times d\mathbf r_a/dT$. The cross product describes twice the oriented area swept per unit time; it is not an additional acceleration term or an assignment of primitive mass. The sign $s_a=\operatorname{sgn}(\mathbf j_a\cdot\hat{\mathbf N})$ is positive for `CCW` and negative for `CW`, viewed from the normal's tip. If an interval average is used, its window and treatment of sign reversals must be declared.

For three distinguishable binaries with nonzero circulation signs, the Cartesian product $\{-1,+1\}^3$ contains exactly $2^3=8$ sign assignments. These are kinematic possibilities, not eight demonstrated solution branches. A stalled orbit, a zero projected circulation, an undefined plane, or an unresolved sign lies outside this two-sign table. Angular momentum requires a separately declared assembly or history functional and cannot be inferred merely by calling circulation spin.

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

This table is complete on the declared nonzero-sign domain. Reversing only the viewing normal flips every sign. If that viewing choice is quotiented out, the eight assignments form four opposite-sign pairs; the table keeps the normal fixed. Coaxiality permits both signs independently and therefore does not select the two uniform rows.

### Observer Views

The planar circulation table is viewpoint dependent in a controlled way. For later axial diagnostics, define the unweighted kinematic sum $\mathbf J_{\text{net}}=\sum_a\mathbf j_a$ and its direction $\hat J_{\text{net}}=\mathbf J_{\text{net}}/\|\mathbf J_{\text{net}}\|$ only when the sum is nonzero. This notation denotes a circulation proxy with area-per-time units, not a conserved angular-momentum charge. In mixed-sign states the sum can vanish, or its sign can depend on unequal circulation magnitudes.

- **Complete-state description:** fixes one normal in the absolute frame and computes circulation from constituent histories. This is a theory-side calculation, not a Physical Observer.
- **Observer on the opposite side of the same disk:** reverses the normal and therefore swaps `CW` with `CCW`.
- **Co-moving or assembly-built observer:** may not have direct access to the absolute normal choice and instead infer only relative handedness, exposure, or wake asymmetry.

A Physical Observer can infer these signs only through an explicit signal, detector, calibration, and access map, as required by [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md). A chosen exterior normal does not supply that map. As a standard comparison, helicity is the projection of spin angular momentum along momentum. The **boundary helicity proxy** here becomes a candidate helicity sign only after an effective spin map, a nonzero momentum direction, and its relation to the viewing normal are supplied.

The substrate dynamics use absolute path histories and delayed branch intersections. An observer-level helicity map is a recovery target from that structure. It is not a primitive substrate variable, and the boundary proxy does not identify weak-interaction chirality.

### Boundary Helicity Versus Deeper Chirality

The table above does not by itself prove that all eight rows are equally meaningful as horizon identities.

The simplest planar quantity is the common nonzero circulation sign when all three binaries share one rotation sense. That sign is a two-way distinction:

- all-`CW`;
- all-`CCW`.

This chapter calls that reduced quantity **boundary helicity**, retaining the proxy meaning above: the local common circulation sign relative to a chosen normal. Standard helicity additionally requires a spin and momentum map.

The deeper `pro/anti` distinction is plausibly stronger than boundary helicity alone. In the 3D scaffold, `pro/anti` tracks the proposed indexed-frame chirality, not merely one planar swirl. In the proposed planar limit, distinct three-dimensional histories may share a circulation sign; neither injectivity nor observational recovery of the history label is proved.

That motivates the following working distinction:

- **Boundary helicity:** the common circulation sign in a prescribed planar state, defined relative to a chosen normal.
- **Core chirality:** the deeper `pro/anti` distinction inherited from the ordered 3D orthogonal-axis three-binary braid before flattening.

If this distinction is correct, then the horizon does not necessarily erase `pro/anti`, but it may compress it so strongly that the exterior observer sees only a reduced proxy.

### Translation-Axis Alignment at High Velocity

The next question is whether a rapidly translating orthogonal-axis three-binary braid should drive the three orbital normals toward the translation axis itself.

Straight-line motion of a declared assembly center imposes no alignment condition on the relative orbital planes. Let the center be the arithmetic mean of the six constituent positions in the absolute frame, with group velocity $\mathbf V_{\text{trans}}$ its derivative. This is a geometric center convention, not a mass assignment. A physical alignment mechanism must follow from the delayed acceleration law; no conservation premise is needed for this kinematic distinction.

The geometric comparison assumes $R_\perp>0$ and $0\le\beta_f<1$. Here $v_{\text{trans}}=\|\mathbf V_{\text{trans}}\|$ is the group speed relative to the void, $\beta_f=v_{\text{trans}}/c_f$, and $\gamma_f=(1-\beta_f^2)^{-1/2}$. Let $(X_{\perp,1},X_{\perp,2},X_\parallel)$ denote local components of $\mathbf X-\mathbf X_{\mathrm{center}}(T)$ in an absolute-frame principal basis, with $X_\parallel$ along the nonzero group velocity. Assume the displayed $c_f$-based axis-ratio ansatz. It is not supplied by the dressed $c_{\mathrm{eff}}$ return construction in [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md#lorentz-projection-role), where $c_{\mathrm{eff}}$ is the effective medium-channel speed. The required constitutive and channel identification remains separate from this prescribed geometry:

$$
\frac{X_{\perp,1}^2+X_{\perp,2}^2}{R_\perp^2}
+
\frac{X_\parallel^2}{R_\parallel^2}
= 1,
\qquad
R_\parallel = \frac{R_\perp}{\gamma_f},
\qquad
\gamma_f = \frac{1}{\sqrt{1-\beta_f^2}},
\qquad
\beta_f = \frac{v_{\text{trans}}}{c_f}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-668398d306edf792)

Now let one binary orbit in a plane whose unit normal $\hat{\mathbf n}$ makes angle $\vartheta$ with the translation axis $\hat{\mathbf z}$. The central cross-section of the assumed oblate spheroidal envelope cut by that orbital plane has area

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

For $0<\beta_f<1$, the denominator is $\sqrt{1+(\gamma_f^2-1)\sin^2\vartheta}$, so area is maximal at $\vartheta=0,\pi$ and minimal at $\vartheta=\pi/2$. At $\beta_f=0$ the envelope is a sphere and every central section has the same area; the translation direction is then undefined and any reference axis may be used for the geometric comparison. The formula concerns finite positive semiaxes. The limit $\beta_f\to1^-$ is singular and is not itself an admitted planar solution.

Thus the assumed oblate geometry supplies an orientation-dependent area comparison:

- planes with normals parallel or antiparallel to the line of translation inherit the largest available cross-section;
- tilted planes suffer stronger anisotropic squeezing;
- at fixed tilt the fractional area loss grows with $\gamma_f$; no dynamical penalty is defined by that fact.

For small tilt at fixed finite $\gamma_f$,

$$
A(\vartheta)
\approx
\pi R_\perp^2
\left[
1-\frac{\gamma_f^2-1}{2}\vartheta^2
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5de5c927503ea9c3)

The expansion requires both $|\vartheta|\ll1$ and $(\gamma_f^2-1)\vartheta^2\ll1$; it is not uniform as $\beta_f\to1^-$. The area formula follows by restricting the spheroid quadratic form to the orbital plane: its ellipse has one semiaxis $R_\perp$ and the other $R_\perp/\sqrt{\cos^2\vartheta+\gamma_f^2\sin^2\vartheta}$. This derivation supplies no restoring acceleration. Decreasing a chosen closure residual, the mismatch between a candidate history and its required delayed dynamics, is not itself a dynamical evolution law.

The resulting target is to derive the axis-ratio response without assuming axialization, then show from an admissible evolved history that the three orbital normals approach the group-velocity axis. Persistence and stability require separate perturbation tests on that same solution. The cross-section calculation alone proves none of these steps.

### Exact Conservation Versus Dynamical Selection

Three different claims are involved.

- **Conservation target:** translation and rotation are symmetries of the full transformed delayed law. Independently derived momentum and angular-momentum accounts must also include wake-history and boundary exchange. As [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#generalized-momentum-and-angular-momentum) explains, defining an unobserved channel as the negative accumulated residual makes a total constant by construction; that is not an independent conservation proof.
- **Conditional topological invariance:** a defined protected linking or framing class can be constant on its declared deformation domain. The projected $Wr_c$ statistic is not automatically such a class.
- **Dynamical selection:** alignment, attraction toward a branch, and stability require an admissible solution and its perturbation response. A larger cross-sectional area supplies none of these by itself.

The rotation group $SO(3)$ describes all proper spatial rotations. Fixing a nonzero group-velocity direction $\hat{\mathbf V}=\mathbf V_{\text{trans}}/v_{\text{trans}}$ leaves a stabilizer $SO(2)$ consisting of rotations about that axis. This is a derived symmetry statement about a distinguished direction, not a proof of spontaneous symmetry breaking or of a stable planar lock. The actual indexed configuration can have a smaller stabilizer. A common periodic orbital phase, if separately established, can be represented by the circle group $U(1)$; three circulation signs alone do not reduce all relative phases to one.

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
2. Under the assumed oblate axis ratio, planes normal to the group-velocity direction have the largest central area; dynamical alignment remains to be shown.
3. Near the terminal aligned state, the surviving branch data may reduce to the sign of the common axial orientation and then to the sign of the visible planar helicity.
4. After passage through the lock, the Noether braid may either preserve that branch, re-expand with the same handed history, or undergo a deeper reconfiguration if the planar degeneracy is strong enough.

This ladder is still a working map, not a completed derivation. Its value is organizational: it shows where the theory expects information to be compressed, preserved, or potentially switched.

### Canonical Horizon Branch Hypothesis

One conjecture selects the two uniform planar rows as terminal states:

- Row 1: `1 = 2 = 3 = CW`;
- Row 8: `1 = 2 = 3 = CCW`.

Their common circulation makes them simple candidates. The six mixed rows are equally admissible in the kinematic sign table. Coplanarity and coaxiality do not require co-rotation, and the area comparison is unchanged when any orbital normal is reversed. The conjecture therefore needs a same-history dynamical comparison before either set can be ranked by persistence or stability.

> Claim grade: guessed. Preference for uniform terminal rows, with mixed rows serving as transition or frustration states, is a hypothesis. A stable mixed-sign solution on the same admitted domain falsifies the proposed exclusivity. Failure of the uniform rows under their complete delayed acceleration and perturbation tests rejects those particular candidates.

Conditional on both axialization and uniform circulation, the common normal is parallel or antiparallel to the nonzero group velocity. Without the uniform-sign assumption, each of the three coaxial normals independently admits either direction.

### Candidate Theories for Pro and Anti at the Horizon

Two interpretations of a proposed planar readout must be distinguished from the definition of pro/anti on a nondegenerate three-dimensional record.

#### Theory A: direct planar identification

A direct identification would attach pro/anti names to the uniform planar signs:

- `pro` = all-`CW`,
- `anti` = all-`CCW`,

or the reverse, depending on the chosen sign convention.

As a definition of planar pro/anti, this conflicts with the canonical rule that $o_{\mathrm{PA}}$ is unassigned at exact planarity. It can only be posed as a conjectured correlation between pre-planar labels and a later circulation readout, tested with a fixed normal and a specified observer map.

#### Theory B: history-lifted horizon identification

In a history-lifted interpretation, a planar state is accompanied by its preceding nondegenerate history. For a uniform-sign candidate:

- the uniform planar sign is the proposed **boundary marker**;
- the deeper `pro/anti` label still refers to the ordered 3D chirality from which the planar state was reached.

On this reading, the planar sign is a local circulation diagnostic. Its exterior visibility and correlation with the incoming classified history require a specified observer map.

This reading preserves the canonical domain: the label belongs to the earlier classified history, while the present planar sign is a different datum. It does not establish that the history is recoverable from exterior signals, or that the two uniform candidates are the only branches.

The history-lifted reading also sets a guardrail for nearby labels. Horizon `pro/anti`, boundary helicity, `CW/CCW`, `123/132`, and weak left/right language should not be identified with one another by a visible planar sign alone. A stronger identification requires the [same-record spinor-label pullback](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#same-record-spinor-label-pullback): a component row carrying the lifted history $\widetilde r(s)$, the row-local parity checks $\Pi_{W,r}^{2\pi}$ and $\Pi_{W,r}^{4\pi}$, a quotient witness, doubled-path restoration, and gauge invariance. Without those rows and an observer-access map, the planar sign is only a local circulation diagnostic; neither exterior visibility nor its relation to a deeper branch history is established.

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
- the observer-level left/right distinction may therefore descend from the sign choice of the common axial circulation in the translating aligned state.

In that reading, the horizon or near-horizon limit does not merely present two boundary-helicity states. It may also reveal a candidate upstream axial-lock variable for later left/right spin mapping:

- `right-like`: net braid axis aligned with translation;
- `left-like`: net braid axis anti-aligned with translation;

or the reverse, depending on the eventual sign convention.

This remains a guessed mapping. The area calculation favors no circulation sign and supplies no axializing dynamics. A neutral six-architrino scaffold also does not by itself supply the fermion weak-coupling triad, the three-site geometry whose exposure controls the proposed weak response. That additional assembly structure and its coupling must be declared before the left/right comparison is defined.

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
| `Wr_c` diagnoses selected projected crossings | derived diagram statistic under its declared event and projection conventions; protected chirality remains a separate guessed identification |
| the planar sign space has 8 rows for labeled `1/2/3` binaries with nonzero signs | derived Cartesian-product count; no existence or stability claim |
| axial-normal planes maximize central area of the assumed oblate spheroid for $0<\beta_f<1$ | derived conditional geometry; no restoring acceleration or attractor follows |
| the two uniform planar rows are stable terminal horizon branches | guessed; neither existence nor preference over mixed rows is derived |
| the six mixed rows are transitional or frustrated rather than stable endpoint states | guessed; needs the same-domain dynamical comparison |
| the axial sign $\hat J_{\text{net}} \parallel \pm \hat{\mathbf V}$ supplies a candidate upstream variable for a later left/right spin distinction | live speculative hypothesis requiring the same retained spinor/gauge-control and weak-exposure record |
| `pro/anti`, `CW/CCW`, and `left/right` all become the same label in the terminal regime | not yet established |

### Mixed-Sign Planar States

If mixed-sign rows are admitted at all, then the horizon theory becomes more complicated than a simple two-branch picture. Rows 2 through 7 would imply that the three binaries can remain role-distinct in the planar lock while not sharing a common in-plane circulation.

That possibility raises three immediate questions:

1. Are mixed-sign rows dynamically stable, or do they relax toward a common-sign lock?
2. If they are stable, do they define additional horizon classes beyond `pro/anti`?
3. If they are unstable, are they the natural transition states through which a Noether braid passes while entering or leaving the horizon interface?

The transition-state reading is the conjecture under examination. The table and area calculation do not favor it over a stable mixed-sign branch.

A proposed mechanism is that mixed circulation increases phase slip or competing delayed-root contributions. This is a guess about complete histories, not a consequence of the signs. Compare actual acceleration residuals, root-domain margins, recurrence, and perturbation response; a larger scalar action statistic or smaller Jacobian margin alone does not prove instability.

### Transition Rules for Pro/Anti Conversion

One of the biggest unresolved questions is whether a Noether braid can flip from `pro` to `anti` smoothly, or only through a more singular reconfiguration.

The distinction is between loss of a label's definition and a physical branch transition. If a discrete sign is a continuous function of histories throughout a connected, nondegenerate admissible domain, it is constant there: a continuous map into $\{-1,+1\}$ cannot change value on a connected path. This is a derived conditional fact. A pro/anti application must first supply that sign and prove continuity on the stated domain.

A planar degeneracy can leave the sign undefined without proving a singular acceleration or a reconnection. Likewise, changing a projected crossing count or losing a root through a finite-memory boundary need not change a physical topological class. A genuine protected linking class requires its own closed-curve, disjointness, and framing assumptions.

At a transmitter fold $D_t=0$, the ordinary acceleration weight diverges. That does not establish an impassable wall: an ordinary transverse fold at positive separation can have locally integrable inverse-square-root acceleration, as in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse). Other degeneracies can fail to admit finite continuation. Neither possibility proves that a pro/anti change must encounter such a fold.

> Claim grade: guessed. Pro/anti conversion through planar degeneracy, reconnection, or mode locking remains a proposed mechanism. Here mode locking means establishment of a persistent relation among the phases of coupled motions; it is not by definition a topology change. A same-history conversion that preserves all assumptions of a claimed sign-invariance theorem would falsify that theorem or its application. Until a carrier and continuation are supplied, smooth conversion is unresolved, rather than forbidden or known to be non-generic.

### Simulation Diagnostics

For a declared candidate family, these are diagnostic questions, not acceptance results. Numerical instantiations use $c_f=1$ and the complete root/history domain above. Fix the comparison window, normal, center, sign thresholds, perturbation class, and refinement controls in advance. Test acceleration balance or a complete reference solution before assigning a stability spectrum. Zero circulation, zero net proxy, and zero group speed remain unassigned for the corresponding normalized quantities.

- **Axis-alignment diagnostic:** track $\hat J_{\text{net}} \cdot \hat{\mathbf V}$ and test whether it tends toward $\pm 1$ as $v_{\text{trans}} \to c_f$.
- **Tilt decay diagnostic:** for each binary $a$, track its angle to the group-velocity axis and test whether any decay occurs before testing a dependence on $\gamma_f$.
- **Planar branch diagnostic:** once the planarity threshold is met, record which of the 8 planar sign rows the assembly occupies.
- **Mixed-row lifetime diagnostic:** test whether rows 2 through 7 are long-lived or short-lived compared with the two uniform rows.
- **Exposure diagnostic:** compare the sign of $\hat J_{\text{net}} \cdot \hat{\mathbf V}$ against forward exposure of the weak-active structure to test the left/right bridge hypothesis.
- **Branch persistence diagnostic:** drive a Noether braid into and back out of the planar regime and test whether the same deeper branch label is recovered after re-expansion.

### Provisional Conclusion

Three nonzero indexed planar circulation signs give eight logical assignments for a fixed viewing normal. The assumed oblate spheroid has its largest central sections perpendicular to the group velocity, but that area result neither selects a circulation sign nor proves an alignment mechanism. The two uniform rows and six mixed rows remain dynamical candidates.

The three-dimensional pro/anti carrier, its deformation stability, and its parity action must be supplied independently. At exact planarity the present pro/anti label is unassigned; a preceding history can retain its label as provenance. Turning that history or the planar circulation sign into a measured horizon, spin, helicity, or weak-exposure observable requires the corresponding same-history dynamics and observer map.

> Claim grade: derived for the nonzero-sign count and the central-section geometry under the stated assumptions; guessed for terminal-branch selection, horizon identification, and the proposed chirality readout. A missed nonzero sign tuple or a different exact section area falsifies the mathematical claims. A stable mixed row, failure of alignment, or indistinguishable observer records with different proposed labels overturns the corresponding stronger conjecture.

### Interfaces to Other Chapters

- [singularity-resolution.md](../../../../markdown/aaa/spacetime/singularity-resolution.md): canonical horizon alignment condition.
- [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md): horizon interface and strong-field ontology.
- [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation): regime map, planarity diagnostics, and alignment observables.
- [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md): terminal planar lock and alignment-horizon interpretation.
- [angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md): shared proof ledger for promoting boundary-helicity proxy language into observer-level spin or helicity claims.
- [../assemblies/fermions/color-charge-su3.md](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md): separation of pro/anti ordered orientation from matter/antimatter polarity conjugation.
- [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md): ordered-triad, polarity-conjugation, and chirality language.
