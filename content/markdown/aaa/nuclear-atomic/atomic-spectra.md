# Atomic Spectra

This chapter is an exploratory mapping study from Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, to effective atomic spectra: the frequencies emitted or absorbed when an atom changes state. An assembly is a candidate bound collection of [architrinos](../foundations/architrino.md), point transceivers whose past emissions supply delayed acceleration contributions. The [Noether sea](../spacetime/noether-sea.md) is the proposed ambient population of neutral assemblies. A spectral line is treated as a candidate record of an assembly transition, a photon-channel event, and a local clock/rate conversion; this is a proposed recovery route, not an established substrate mechanism. The central question is which spectral constants and redshift effects can be recovered as medium-sensitive resonance data.

The required components are developed in [Atomic Structure](atomic-structure.md), [Electron](../assemblies/fermions/electron.md), [Condensed Matter](condensed-matter.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md), because the proposed spectral shifts depend on local assembly structure, the effective clock/rate layer, and the photon-channel event record.

This account remains exploratory rather than a closed derivation. Familiar orbital and spectral labels must be recovered from the assembly and Noether sea record; they cannot be used as though they already supplied the substrate mechanism.

Spin-sensitive spectral structure is downstream of the angular-momentum proof program. This chapter may use observer-level labels such as fine structure, spin-orbit structure, Zeeman splitting, and hyperfine splitting as recovery targets, but those labels must inherit the single-assembly angular-momentum ledger, ordered-frame spinor closure, and measurement-response model in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md). They are not independent derivations of spin.

## Atomic Orbitals as Noether Sea Resonances

Electron orbitals are treated here as stable resonance patterns of electron assemblies coupled to the local Noether sea. This is an effective atomic model, not yet a derivation from the constituent master equation.

The proposed picture places the electron assembly in an envelope basin, a persistent response pattern shaped by the nuclear source envelope and surrounding Noether sea state. The clock/rate map then converts that response into a declared frequency readout; a readout conversion does not itself establish or stabilize a basin. The standard orbital labels organize observed spectra and remain recovery labels for candidate basins. Existence and stability require compatible histories satisfying the constituent master equation and a separate perturbation analysis.

The foundation-up route treats those resonance patterns as responses to structured causal-wake boundary data. In a completed derivation, the integer-closed Noether braid ledgers of the nuclear constituents should determine an effective causal-wake envelope $\mathcal W_{\text{nuc}}$, and the electron assembly should occupy stable envelope basins labeled by the recovered quantum numbers $(n,\ell,m)$. The route is one-way:

$$
\text{integer-closed Noether braid ledgers}
\longrightarrow
\text{effective causal-wake envelope}
\longrightarrow
\text{electron-assembly envelope basin}
\longrightarrow
\text{observer-level labels }(n,\ell,m)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8c9ac066e047baa8)

The labels $(n,\ell,m)$ are therefore spectral and orbital recovery labels for the effective envelope. They should not be used backward as evidence that the internal nuclear or electron Noether braid ledgers have already been derived. The label is the observer-level tag on a recovered basin; it is not the cause of the basin.

The direct angular consumer is the effective angular-envelope recovery lemma from [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#effective-angular-envelope-recovery-lemma). Once the native extractor supplies a central record-facing envelope, take a nonzero angular eigenfunction $Y$ in the self-adjoint domain of the scalar Laplacian on the unit sphere $S^2$. Regularity and single-valuedness at all angles give the conditional mathematical spectrum

$$
-\Delta_{S^2}Y=\lambda Y
\quad\Longrightarrow\quad
\lambda=\ell(\ell+1),
\qquad
\ell\in\mathbb N_0,
\qquad
m\in\{-\ell,\ldots,\ell\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-418e63ca889da8b9)

Here $\lambda$ is the angular eigenvalue, $\ell$ the nonnegative orbital angular label, and $m$ the chosen-axis projection label in a simultaneous angular eigenbasis; a general superposition in the same $\ell$ eigenspace need not have one definite $m$. Atomic spectra consume $(n,\ell,m)$ as envelope labels, with $n$ the principal label in this tuple. The spectral burden remains the native extraction of the electron-envelope basin, its radial energy functional, transition amplitudes, and local clock/rate conversion; the angular lemma alone supplies neither principal labels, line strengths, the Rydberg constant, nor spin-sensitive splittings.

The standard hydrogen derivation supplies an observer-level comparison for the ideal central limit. In the following comparison, $(r,\theta,\phi)$ are spherical coordinates in a declared effective relative-position chart, not unqualified substrate coordinates. A separated mode plus its non-separable remainder is written as

$$
\Psi_{\mathrm{env}}(r,\theta,\phi)
=
R_{n\ell}(r)Y_\ell^m(\theta,\phi)
+
\delta\Psi_{\mathrm{nonsep}},
\qquad
\left\|\delta\Psi_{\mathrm{nonsep}}\right\|_\theta
\le
\varepsilon_{\mathrm{sep}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-eed101a9dbd8972b)

Here $\left\|\cdot\right\|_\theta$ is the $L^2(S^2,d\Omega)$ norm at fixed $r$, where $d\Omega$ is solid-angle measure, and $\varepsilon_{\mathrm{sep}}>0$ has the same units as the envelope amplitude. The bound holds at every declared admissible radius. It controls angular non-separability there; by itself it does not bound the full radial norm or the energy error. The angular part is the $S^2$ eigenmode statement above. For the regular bound states of the ideal Schrödinger Coulomb comparison, the nonzero radial mode is square-integrable and its radial node count $N_{\mathrm{rad}}$ obeys

$$
\int_0^\infty
\left|R_{n\ell}(r)\right|^2
r^2\,dr
<
\infty,
\qquad
N_{\mathrm{rad}}
=
n-\ell-1
\in
\mathbb N_0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-be1588f1a80ae57a)

In the standard Schrödinger calculation, the second condition is enforced by terminating the radial power series into the associated Laguerre family; that is the mathematical source of discrete principal labels in the ideal Coulomb problem. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a recovery target, not an input postulate: the same hydrogen spectral channel must first supply the effective central envelope, its non-separable residual, and the radial energy functional from the electron branch, proton source envelope, and local Noether sea record.

The first closure target is the Rydberg constant. In the present notation, a completed model should express $R_\infty$ as a function of the effective nuclear causal-wake envelope $\mathcal W_{\text{nuc}}$, the physical Noether braid density $\rho_{\text{NS}}(\mathbf X,T)$, the normalized density $n(\mathbf X,T)$, the Noether sea delay factor $\chi_{\text{sea}}(\mathbf X,T)$, and the local clock/rate response encoded by the native cadence-stretch diagnostic $\Gamma_N(\mathbf X,T)$. The spectral readout below uses the projected channel value $\Gamma_N^{(\ell)}$ after the hydrogen response map has selected an admissible resolution; it is not a separate observer-chart definition of $\Gamma_N$. The important discipline is to keep $n$ as normalized density, $\chi_{\text{sea}}$ as the delay factor, and $\Gamma_N$ as the cadence-stretch diagnostic.

The field $n(\mathbf X,T)=\rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is normalized Noether braid density, with fixed positive reference density $\rho_{\text{NS},0}$; it is not an independent density input in addition to $\rho_{\text{NS}}$. In $(n,\ell,m)$, $R_{n\ell}$, and $N_{\mathrm{rad}}=n-\ell-1$, $n$ is the standard principal label, as are the state-specific integers $n_a$ and $n_b$. Resolution arguments and superscripts $(\ell)$ below refer to the coarse-graining length selected by the channel scan, not to orbital angular momentum. The density fields use absolute time $T$ and position $\mathbf X$ in the Euclidean void; their effective projections require the declared channel map.

That separation matters because spectra are one of the main ways observers infer the wider cosmos. A line frequency can change because the emitting assembly differs, because the local Noether sea and clock/rate conversion differ, because the photon path changes the received channel, or because the receiver's own clock comparison changes. A spectral model that merges those effects into one fitted number has lost the accounting.

For a downward transition from a higher-energy basin $a$ to a lower-energy basin $b$, the ideal local gap comparison is

$$
h\nu_{a\to b}
=
E_{\text{env}}(a;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})
-
E_{\text{env}}(b;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b79334aabcb6b6e)

Here $h$ is Planck's constant as the observer energy-frequency benchmark, $E_{\text{env}}$ is the proposed envelope-energy functional in one common calibration, and the unqualified $\nu_{a\to b}$ is the local frequency before the stated clock/rate conversion. This equality defines the ideal isolated one-photon comparison, with recoil, medium excitation, and other event-energy terms set to zero. A finite event requires their separate accounting in [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md#basin-transition). Neither $h$ nor an envelope energy is a primitive input to the architrino acceleration law.

For hydrogen, the spectral channel is the channel-scan target inherited from [Atomic Structure](atomic-structure.md#hydrogen-channel-scan-proof-target). The scan fixes $X=\mathrm{spec}$ and chooses a coarse-graining length $\ell\in I_{\mathrm{spec}}^{\mathrm{atom}}$, the admissible atomic window that averages many sea assemblies while retaining the electron envelope. The proposed readout functional $F_{\mathrm{spec}}$ acts on the shared hydrogen channel ledger $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ and the proton and electron channel-boundary diagnostics $D_{p,\mathrm{spec}}^{(\ell)}$ and $D_{e,\mathrm{spec}}^{(\ell)}$:

$$
\mathcal O_{\mathrm H,\mathrm{spec}}^{(\ell)}
=
F_{\mathrm{spec}}
\!\left[
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)},
D_{p,\mathrm{spec}}^{(\ell)},
D_{e,\mathrm{spec}}^{(\ell)}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-bdb3886badee428f)

The first spectral readout target is the pair of local envelope gaps and clock/rate entries

$$
\mathcal O_{\mathrm H,\mathrm{spec}}^{(\ell)}
\longmapsto
\left(
E_{\text{env}}^{(\ell)}(a),
E_{\text{env}}^{(\ell)}(b),
\Gamma_N^{(\ell)},
\chi_{\text{sea}}^{(\ell)}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9a990d63e52de7a1)

with $E_{\text{env}}^{(\ell)}$ still depending on $\mathcal W_{\text{nuc}}$, $\rho_{\text{NS}}$, $n$, and $\chi_{\text{sea}}$ in the same declared window. In the same ideal zero-event-residual limit, the candidate observer-frequency comparison is

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
\left(\Gamma_N^{(\ell)}\right)^{-1}
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{h}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ae84456fc8f8541)

Here $\Gamma_N^{(\ell)}>0$ is the local cadence-stretch readout and $\left(\Gamma_N^{(\ell)}\right)^{-1}$ is the candidate clock-rate conversion from [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target). Both the energy calibration and the reference clock are fixed before testing a line. The displayed conversion applies the cadence factor once: an energy already expressed as $h\nu^{\mathrm{obs}}$ cannot be multiplied by it again. A nonideal comparison adds the independently bounded frequency residual defined by the clock owner and separately controls propagation and detector conversion. The spectral scan first declares the composite residual that couples the clock norm to the envelope-gap readout:

$$
\left\|
\mathcal E_{\mathrm{spec}}
\right\|_{\mathrm{spec}}^2
=
\left\|
\mathcal E_{\mathrm{clock}}
\right\|_{\mathrm{clock}}^2
+
\frac{
\left[
\delta E_{\mathrm{env}}^{(\ell)}(a)
-
\delta E_{\mathrm{env}}^{(\ell)}(b)
\right]^2
}{
\epsilon_{\mathrm{gap}}^2
}
+
\frac{
\left(\delta\Gamma_N^{(\ell)}/\Gamma_N^{(\ell)}\right)^2
}{
\epsilon_{\Gamma}^2
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7ff1abc0c53a7bc8)

This is a proposed dimensionless comparison norm. The deviations $\delta E_{\mathrm{env}}^{(\ell)}$ and $\delta\Gamma_N^{(\ell)}$ are differences from a declared reference evaluation in the same calibration, not adjustable line offsets. The positive scale $\epsilon_{\mathrm{gap}}$ has energy units, $\epsilon_\Gamma$ is a positive dimensionless relative-cadence scale, and $\|\mathcal E_{\mathrm{clock}}\|_{\mathrm{clock}}$ is the dimensionless phase/cadence/delay residual inherited from the clock channel. The reference, scales, correlations, and acceptance threshold must be fixed before testing. This sum is bookkeeping rather than a statistical independence assertion: shared clock and cadence inputs cannot be counted as independent evidence. If the line can be matched only by changing $\Gamma_N^{(\ell)}$, $\chi_{\text{sea}}^{(\ell)}$, or the electron-envelope branch after the transition pair is chosen, the spectral channel has split from the hydrogen boundary scan.

After this composite readout is declared, the refinement comparison requires the following bound for every declared pair $\ell,\ell'\in I_{\mathrm{spec}}^{\mathrm{atom}}$, with the same transition, preparation, reference clock, and projection to common frequency units:

$$
\Delta_{\mathrm{spec}}(\ell,\ell')
=
\frac{
\left|
\nu_{a\to b}^{\mathrm{obs},(\ell)}
-
\nu_{a\to b}^{\mathrm{obs},(\ell')}
\right|
}{
\left|
\nu_{a\to b}^{\mathrm{obs},(\ell)}
\right|
+
\varepsilon_{\mathrm{spec}}
}
\le
\Delta_{\mathrm{spec}}^{\mathrm{tol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6c868b1ea6aae2d0)

The normalization floor $\varepsilon_{\mathrm{spec}}>0$ has frequency units and $\Delta_{\mathrm{spec}}^{\mathrm{tol}}>0$ is dimensionless; both are fixed before comparison. A finite scan establishes only the tested pairs unless an interpolation or uniform bound covers the full admissible window. Refinement agreement establishes insensitivity of this readout to resolution, not existence or dynamical stability of an atomic branch. The spectral target fails if $(n,\chi_{\text{sea}})$ collapse into one parameter, if $(n,\ell,m)$ are used as substrate inputs rather than recovered labels, if the proton source envelope is replaced by three free quark sources, or if $R_\infty$ must be fitted independently of the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ record that supplies the line gaps.

## Hydrogen Rydberg Benchmark Target

The first hydrogen benchmark tests a common leading Rydberg scale without a per-line fit, after the envelope labels have been recovered. Let $\mathcal L_{\mathrm H}^{0}$ be a finite set containing at least two distinct downward transitions $a\to b$, with positive principal integers $n_a > n_b$ and no external field or material branch active. Define the dimensionless observer-level line factor

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c0a401297a2bc754)

Standard hydrogen spectroscopy names familiar subfamilies inside this same line set. Lyman, Balmer, Paschen, Brackett, and Pfund are fixed-lower-label slices with $n_b=1,2,3,4,5$ respectively and $n_a > n_b$. These are observer-level groupings of the leading Coulomb comparison. An isolated atom still has fine structure, hyperfine structure, Lamb shifts, finite nuclear structure, and recoil. A use of the uncorrected readout below must bound those contributions within a declared line-dependent uncertainty budget; a more precise comparison must remove independently specified corrections and propagate their uncertainties, following the [hydrogen spectral residual separation](../validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md#hydrogen-spectral-residual-separation). The corrections cannot be retuned to enforce a common Rydberg value.

For each line in this set, the spectral scan extracts a Rydberg readout from the same channel record:

$$
\widehat R_{\mathrm H}^{(\ell)}(a,b)
=
\frac{
\nu_{a\to b}^{\mathrm{obs},(\ell)}
}{
c_{\gamma,0}^{(\ell)}\,\Lambda_{ab}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-597a5d89d5f5d344)

Here $\widehat R_{\mathrm H}^{(\ell)}$ has inverse-length units and $c_{\gamma,0}^{(\ell)}>0$ is the independently calibrated photon-channel speed in the same weak homogeneous reference. The limit $c_{\gamma,0}^{(\ell)}\to c_0$ is the weak homogeneous photon-calibration target; it does not identify the observer calibration $c_0$ with the primitive wake speed $c_f$. The same photon speed and clock/rate map must apply across the selected lines. A common fitted Rydberg scale tests line ratios; predicting its absolute value additionally requires an independently fixed energy, clock, and length calibration. Within the declared leading-spectrum uncertainty, the transition-independence target is

$$
\max_{(a,b),(c,d)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\widehat R_{\mathrm H}^{(\ell)}(a,b)
-
\widehat R_{\mathrm H}^{(\ell)}(c,d)
\right|
}{
\left|
\widehat R_{\mathrm H}^{(\ell)}(a,b)
\right|
+
\varepsilon_R
}
\le
\Delta_R^{\mathrm{tol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5cdf3517c5daf5ce)

after using the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$, $\Gamma_N^{(\ell)}$, and $\chi_{\text{sea}}^{(\ell)}$ for every line in the set. Here $\varepsilon_R>0$ is a fixed inverse-length normalization floor and $\Delta_R^{\mathrm{tol}}>0$ is a dimensionless tolerance that includes the declared correction budget. The infinite-nuclear-mass limit, with the electron response, medium, and calibration held fixed, is then a leading-spectrum recovery target,

$$
\lim_{M_p/m_e\to\infty}
\widehat R_{\mathrm H}^{(\ell)}
=
R_\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-7727ac59256f6eec)

with $m_e$ and $M_p$ read as externally exposed mass responses rather than primitive point-particle masses. The finite-hydrogen benchmark may retain the usual reduced-mass correction as an observer-level comparison, but it must not become an independent fitted constant.

Deuterium supplies the immediate isotope falsifier. With the electron branch and $Z=1$ source class held fixed, the hydrogen/deuterium line ratio must follow from the independently exposed nuclear mass responses and the same envelope functional, with no isotope-specific Rydberg fit. Hydrogen-like ions such as $\mathrm{He}^{+}$ and $\mathrm{Li}^{2+}$ then test the recovered $Z^2$ scaling and its declared finite-size and recoil corrections using the same $\mathcal W_{\text{nuc}}$ machinery.

The line-gap residual is the companion ideal-event check, applicable when the separately bounded event and spectroscopic corrections lie within its stated budget:

$$
\mathcal E_{ab}^{\mathrm{gap},(\ell)}
=
\frac{
\left|
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
-
\left(\Gamma_N^{(\ell)}\right)^{-1}
\left(
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
\right)
\right|
}{
\left|
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
\right|
+
\varepsilon_E
}
\le
\Delta_E^{\mathrm{tol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9048fdaff041ed7e)

Here $\varepsilon_E>0$ is a fixed energy normalization floor and $\Delta_E^{\mathrm{tol}}>0$ is dimensionless. Larger non-photon event terms require the full residual-bearing comparison from the clock and radiation owners, not relaxation of this tolerance. The envelope gaps and cadence stretch must be predicted independently of the line frequencies used to test them; otherwise a small residual can be an algebraic consequence of fitted inputs. The test fails if each line requires a separate $R_\infty$ adjustment, if reduced mass, recoil, or clock/rate effects are hidden in the envelope energy, if $c_{\gamma,0}^{(\ell)}$ is changed between lines, or if local Noether sea variables are retuned after the line set is chosen. The event-level emission and absorption ledger belongs to [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md#hydrogen-line-benchmark-record).

The coefficient row version of the same benchmark is the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md). Its inputs include the shared hydrogen channel ledger, selected lines, envelope gaps, observer frequencies, and declared residual budgets. The vector $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ contains the logarithmic density, delay, scale, shape, and braid-core response entries used by the clock map. The condition $b_\xi=1$ fixes the coefficient of its negative logarithmic shape entry only under the homogeneous Lorentz branch's remainder assumptions. The scan also imposes the weak static endpoint constraint and the common $C_N=\Gamma_N^{-1}$ conversion. These are conditional coefficient constraints, not independently established properties of a hydrogen branch.

The first executable scaffold for that scan keeps the hydrogen labels theory-facing while the envelope solver remains open. It derives $\Lambda_{ab}$ from recovered principal labels, sets the normalized observer-frequency entries to that line factor, derives the replay envelope gaps from one shared line-inferred cadence stretch, and carries two $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ records with different density/delay/scale/core splits. Those entries are placeholders only where the corpus has not yet supplied the native calculation: the envelope calculation must later replace the scaffolded cadence stretch with computed gap entries, the hydrogen response map must replace the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries, and the static response calculation must replace the declared $(a_n,a_\chi,a_\lambda,a_R)$ row (the static Noether sea response row) without changing the line-by-line clock factor.

The scaffold tests coefficient handling and arithmetic consistency. Because its frequencies and replay gaps are constructed from the same line factors and chosen cadence stretch, their agreement is not independent evidence for hydrogen spectroscopy or the clock law. Physical recovery additionally requires retained hydrogen dynamics, an independently derived envelope-energy and response map, and comparison with independent measured line frequencies under a declared calibration and correction budget. Sharing a spectral channel ledger and Noether sea cell is necessary bookkeeping, but does not by itself close those obligations.

Two nuclear-corridor-free comparison branches help order that derivation. Positronium tests two polarity-conjugate lepton envelopes with equal exposed mass responses, while muonium tests unequal lepton mass responses without a baryonic color corridor. These systems do not replace hydrogen, because their assembly records differ, but they can falsify an electron-envelope or clock/rate map before the unresolved proton source envelope is introduced.

### Lamb-Shift Recovery Target

The hydrogen Lamb-shift benchmark here is the $2s_{1/2}$-$2p_{1/2}$ interval, with hyperfine components reduced to a consistently defined hyperfine-free comparison. The letter $s$ denotes orbital $\ell=0$, $p$ denotes orbital $\ell=1$, and $j$ labels total electronic angular momentum at the effective level. Once the spinor ledger supplies those labels, the envelope-energy target is

$$
\Delta E_{\mathrm{Lamb}}^{(\ell)}
=
E_{\mathrm{env}}^{(\ell)}(2s_{1/2})
-
E_{\mathrm{env}}^{(\ell)}(2p_{1/2}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-927e2f176d92ae48)

Before those $j$ labels are available, the envelope calculation has only the narrower pre-spin target

$$
\Delta E_{\ell\text{-}\mathrm{deg}}^{(\ell)}
=
\left.
\left[
E_{\mathrm{env}}^{(\ell)}(2s)
-
E_{\mathrm{env}}^{(\ell)}(2p)
\right]
\right|_{\mathrm{spin\text{-}degenerate}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-694ad0e1021a0f7c)

The pre-spin difference measures deviation from equality of ideal central Coulomb energies at different orbital $\ell$; it is not yet the complete Lamb-shift observable. The $2p_{3/2}$ branch belongs to the separate fine-structure recovery. Both displayed differences are envelope energies at resolution $(\ell)$, before the declared clock/rate conversion. Comparing either with a measured frequency interval requires that conversion, the same energy calibration, and the appropriate bounded event, hyperfine, and nuclear corrections.

The native calculation must derive the final nonzero $2s_{1/2}$-$2p_{1/2}$ difference from the declared electron envelope, proton-adjacent response, causal-wake dressing, local Noether sea record, photon-channel event ledger, and the same spinor-label pullback that distinguishes the two $2p_j$ branches. Standard radiative and vacuum-response language may supply the observer-level benchmark, but it is not a substrate mechanism. A fit that inserts an independent $2s$ offset, or retunes $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ only for this pair, fails the same-record requirement.

For element comparisons, shell closure is a proposed relation between an electron-envelope branch and its competing states. An energy separation alone is not a perturbative stability margin. For an admitted branch $\mathcal B_e$, a conditional energy-gap diagnostic can be written as

$$
C_{\mathrm{shell}}(\mathcal B_e)
=
\min_{\mathcal B_e'\in\mathfrak B_{\mathrm{adm}}\setminus\{\mathcal B_e\}}
\left[
E_{\mathrm{env}}
\!\left(
\mathcal B_e';
\mathcal W_{\text{nuc}},
\rho_{\text{NS}},
n,
\chi_{\text{sea}}
\right)
-
E_{\mathrm{env}}
\!\left(
\mathcal B_e;
\mathcal W_{\text{nuc}},
\rho_{\text{NS}},
n,
\chi_{\text{sea}}
\right)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-8529c8bcc823bd53)

Here $\mathfrak B_{\mathrm{adm}}$ is a declared set of admitted electron-envelope branches with the same electron inventory, nuclear source, medium record, energy reference, and boundary conditions. The displayed minimum is defined only when the competitor set is nonempty and its lowest energy difference is attained, for example in a finite enumerated set. Discreteness alone does not ensure attainment. A positive value requires the reference branch to lie below every competitor by a positive gap; a degenerate competitor gives zero and a lower competitor gives a negative value. An empty or incomplete inventory supplies no closed-shell verdict. Continuous perturbations, ionization channels, and dynamical stability require separate analysis.

The shell-closure proposal associates closed shells with a positive $C_{\mathrm{shell}}$ large relative to a declared excitation scale and with weak low-order external envelope multipoles, the angular moments of the exposed response. It associates transition metals with several nearby anisotropic branches, especially in $d$-envelope recovery. These identifications remain hypotheses until the branches, comparison scale, and response are derived. Iron-group elements also require isotope-specific nuclear binding and, in material states, magnetic or lattice branches. The words `closed shell`, `transition metal`, and `iron group` remain observer-level summaries.

This chapter owns the envelope gap and observer-level spectral comparison. The emission, absorption, recoil, non-radiative alternatives, and Gate C transition-rate record belong to [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md).

The second closure target is gravitational spectral shift. A viable account should derive redshift-sensitive atomic spectra from both local assembly resonance and the effective clock/rate layer, rather than treating the shift as a density-only lattice effect.

For the medium-level gravitational side of that program, see [Emergent Metric](../spacetime/emergent-metric.md) and [Black Holes](../spacetime/black-holes.md).

## Magnetic and Recoil Spectral Benchmarks

External magnetic spectra are recovery benchmarks for the effective U(1) connection, the phase-transport description used in electromagnetic comparisons. The Landau comparison concerns quantized transverse motion of a free effective carrier, or a carrier in an isotropic parabolic material band, in a uniform magnetic field. It is not the general bound-atom level spacing. In this nonrelativistic comparison, with spin splitting treated separately, the target is

$$
\Delta E_{\mathrm{LL}}
=
\hbar\omega_c,
\qquad
\omega_c
=
\frac{eB}{m_*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2a51a19c0389f010)

Here $\hbar=h/(2\pi)$ is the reduced observer action scale, $e>0$ the elementary charge magnitude, $B\ge0$ the effective magnetic flux-density magnitude, $\omega_c$ the cyclotron angular frequency, and $m_*>0$ the scalar effective mass for the stated free-carrier or parabolic-band comparison. An anisotropic or nonparabolic band needs its corresponding cyclotron response, rather than an arbitrary scalar mass substitution. Recovery from the same envelope, magnetic-state map, and exposed mass response remains open.

For atomic Zeeman splitting, take a weak field that preserves the chosen total-angular-momentum labels and neglect or separately resolve hyperfine mixing and higher-order shifts. A line component's signed energy shift has the compact target

$$
\Delta E_Z
=
g_{\mathrm{eff}}\mu_B B
$$

[View →](../../../../equation-mapping.html#corpus-equation-9f4a61d2a0d70648)

Here $\mu_B=e\hbar/(2m_e)$ is the observer Bohr magneton. For a component joining magnetic sublevels of levels $a$ and $b$, define $g_{\mathrm{eff}}=g_a m_{j,a}-g_b m_{j,b}$, where $g_a,g_b$ are their level magnetic-response factors and $m_{j,a},m_{j,b}$ their chosen-axis projection labels. Thus $g_{\mathrm{eff}}$ includes the sublevel projections; it is not one universal level factor. The [NIST Zeeman comparison](https://www.nist.gov/pml/atomic-spectroscopy-compendium-basic-ideas-notation-data-and-formulas/atomic-spectroscopy-zeeman), equation (6), gives a level shift proportional to its own projection. The component frequency shift is $\Delta E_Z/h$, and a difference of two component shifts gives their separation.

The normal Zeeman limit gives a sharper staged benchmark for electric-dipole lines with the normal orbital response. Its polarization-resolved pattern depends on viewing direction and on which components the preparation and analyzer admit:

| Viewing direction | Observer-level components | Recovery burden |
| --- | --- | --- |
| Transverse to the magnetic branch | One central component plus symmetric side components | Recover the side spacing and linear polarization basis from the same magnetic-state map and photon-channel event record. |
| Longitudinal along the magnetic branch | Circularly polarized doublet | Recover the handed polarization pair and equal spacing from the same record. |

A compact comparison can treat the side-component spacing as

$$
\omega_{\pm}^{\mathrm{obs}}
=
\omega_0
\pm
\Omega_B^{\mathrm{orb}},
\qquad
\Omega_B^{\mathrm{orb}}\propto B\,\frac{q}{m_{\mathrm{resp}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-db03d02daeb32d58)

In the normal orbital limit the required coefficient is the Larmor value,

$$
\Omega_B^{\mathrm{orb}}
\longrightarrow
\frac{|q|B}{2m_{\mathrm{resp}}},
\qquad
\omega_c
\longrightarrow
\frac{|q|B}{m_*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ac908c198043ce31)

so the normal-Zeeman side spacing is one half of the corresponding cyclotron coefficient when the same exposed mass response applies. Here $m_{\mathrm{resp}}$ is the exposed mass-response readout for the same branch environment; the nearby $m_*$ notation is reserved for the standard material or envelope effective-mass comparison, as in the Landau spacing. Recovering the factor of two, polarization basis, and charge-to-mass readout from one magnetic-state map and photon-channel event record is part of the benchmark. The anomalous Zeeman cases then become the next benchmark: extra components and non-normal spacings must be routed through the completed internal spinor ledger and measurement-response model, not patched by assigning a free line-by-line $g_{\mathrm{eff}}$. In isolated-atom comparisons this protects fine, hyperfine, and Zeeman recovery from being fitted independently of the base spectral envelope.

Solar and stellar Zeeman observations sharpen this as a source-reconstruction benchmark. [George E. Hale, “On the Probable Existence of a Magnetic Field in Sun-Spots” (1908)](https://articles.adsabs.harvard.edu/pdf/1908ApJ....28..315H), *Astrophysical Journal* 28, 315–343, used analyzer-dependent polarization and laboratory comparisons to support a sunspot magnetic-field inference. The paper's limb tests and addendum distinguish line-dependent patterns; its observations should not be reduced to a universal normal triplet. The recovery target here is a map from source magnetic state, viewing direction, line family, analyzer response, and photon-channel polarization ledger to split line positions and intensities. Laboratory calibration and stellar inference must use the same effective magnetic-state map.

Nuclear recoil-free resonant absorption supplies a separate material-coupled benchmark. For an initially stationary free atom with positive exposed mass response $M$, the leading nonrelativistic recoil scale follows from the observer comparisons $p_\gamma=E_\gamma/c_0$ and $E_{\mathrm{kin}}=p_\gamma^2/(2M)$:

$$
E_{\mathrm{recoil}}
=
\frac{E_\gamma^2}{2Mc_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-da024186a0209e47)

This scale assumes $E_\gamma/(Mc_0^2)\ll1$ and a weak homogeneous photon calibration; it is not exact recoil kinematics or a primitive architrino mass law. A recoil-free event in a solid requires momentum transfer through the coherent material response with no phonon occupation change in the relevant channel. A phonon is an effective quantized lattice vibration. In a closed absorption event, define $\Delta E_\gamma>0$ as energy delivered by the incoming photon and the right-hand terms as signed changes of nuclear internal energy, center-of-mass recoil energy, and lattice vibrational energy, all in the same observer calibration:

$$
\Delta E_{\gamma}
=
\Delta E_{\mathrm{nuc}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{lat}},
\qquad
\Delta E_{\mathrm{lat}}
=
V\sum_s\int_{\mathrm{BZ}}
\frac{d^3k}{(2\pi)^3}
\hbar\omega_s(\mathbf k)\Delta N_s(\mathbf k)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b0a89145ad5ba47a)

Here $V$ is crystal volume, $s$ a phonon branch, $\mathbf k$ an effective crystal wavevector in the Brillouin zone $\mathrm{BZ}$, $\omega_s(\mathbf k)$ its angular frequency, and $\Delta N_s(\mathbf k)$ the dimensionless per-mode occupation change at fixed harmonic frequencies. Changes of those frequencies or of the material background energy require additional terms. The measure $V\,d^3k/(2\pi)^3$ counts modes in the continuum approximation. For emission, the same signed ledger uses negative delivered photon energy; the positive outgoing energy is its negative. Unresolved boundary or other excitation exchanges must be included before using this closed-event equality.

The zero-phonon candidate has $\Delta N_s(\mathbf k)=0$ mode by mode, with recoil assigned to the coherent material response. A vanishing sum of vibrational energy changes alone is weaker, since changes in different modes can cancel. Neither zero phonon change nor coherent momentum accounting proves a nonzero transition amplitude or a recoil-free fraction; those are material and event-response recovery targets. This benchmark connects atomic spectra to [Condensed Matter](condensed-matter.md#lattice-scattering-and-phonon-response) without turning the lattice into a new nuclear source.

## Spin-Sensitive Spectral Targets

After the base resonance and clock/rate program is stable, the spin-sensitive spectrum should be revisited as a validation surface for the completed angular-momentum ledger. Fine-structure and spin-orbit terms must distinguish observer-level orbital angular momentum from internal Noether braid spinor behavior. Hyperfine terms must add the nuclear spin ledger without treating proton or neutron spin decomposition as already closed. The [21 cm hydrogen-line example](../cosmology/expansion-mechanism.md#21-cm-hydrogen-line-example) is the cosmology-facing same-record test of that handoff. Zeeman and related analyzer-response cases must use the finite-time measurement-response model rather than inserting preassigned spin labels.

The anomalous Zeeman cases make this target concrete. A normal triplet can count as a successful classical-limit recovery of magnetic splitting, but quartets, sextets, and higher multiplets cannot be handled by one universal oscillator response plus per-line labels. The same spectral channel must recover the line-specific splitting pattern, polarization selection, and magnetic-field scaling from one atomic envelope, finite-time analyzer-response model, photon-channel event record, and angular-momentum/spinor ledger. A fit that handles the normal Zeeman effect while assigning anomalous multiplets to separate labels or per-line parameters has not recovered the spin-sensitive spectrum.

The orbital part of this recovery should match the standard effective labels $\ell$ and $m$, including $L^2\to\ell(\ell+1)\hbar^2$ and chosen-axis projection $L_z\to m\hbar$. The spin-sensitive part is a separate validation target: it must couple that orbital envelope to the completed internal spinor ledger rather than treating atomic orbital quantization as a proof of fermion spin.
