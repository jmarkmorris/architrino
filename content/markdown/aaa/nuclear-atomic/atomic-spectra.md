# Atomic Spectra

This chapter records the working $\mathbb{A}\mathbb{A}\mathbb{A}$ picture of atomic spectra as resonance structure in the Noether sea rather than as a purely abstract orbital postulate. A spectral line is treated as a record of an assembly transition, a photon-channel event, and a local clock/rate conversion. The immediate goal is to identify which spectral constants and redshift effects should be read as medium-sensitive resonance data.

It should be read alongside [Atomic Structure](atomic-structure.md), [Electron](../assemblies/fermions/electron.md), [Condensed Matter](condensed-matter.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md), since the spectral shifts proposed here depend on local assembly structure, the effective clock/rate layer, and the photon-channel event record.

The note is still exploratory, so the opening should be read as a compact program statement rather than as a closed derivation. The discipline is to keep the direction of explanation straight: recover the familiar orbital and spectral labels from the assembly and Noether sea record, rather than using those labels as if they were already the substrate mechanism.

Spin-sensitive spectral structure is downstream of the angular-momentum proof program. This chapter may use observer-level labels such as fine structure, spin-orbit structure, Zeeman splitting, and hyperfine splitting as recovery targets, but those labels must inherit the single-assembly angular-momentum ledger, ordered-frame spinor closure, and measurement-response model in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md). They are not independent derivations of spin.

## Atomic Orbitals as Noether Sea Resonances

Electron orbitals are treated here as stable resonance patterns of electron assemblies coupled to the local Noether sea. This is an effective atomic model, not yet a derivation from the constituent master equation.

The simple picture is that an electron assembly does not orbit an isolated point nucleus in empty space. It settles into stable envelope basins shaped by the proton source envelope, the surrounding Noether sea state, and the record-facing clock/rate conversion. The standard orbital labels are kept because they organize the observed spectra, but they are recovery labels for those basins.

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

The direct angular consumer is the effective angular-envelope recovery lemma from [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#effective-angular-envelope-recovery-lemma). Once the native extractor supplies a central record-facing envelope whose angular part is a regular single-valued function on $S^2$, the angular step is

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

Atomic spectra then consume $(n,\ell,m)$ as envelope labels for energy gaps and line strengths. The spectral burden remains the native extraction of the electron-envelope basin, its radial energy functional, and the local clock/rate conversion; the angular lemma does not by itself derive the Rydberg constant or spin-sensitive splittings.

The standard hydrogen derivation supplies the ordered comparison packet for the ideal central limit. After the electron-proton channel is reduced to a central effective envelope, the observer-level solution separates as

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

Here $\left\|\cdot\right\|_\theta$ is the $L^2$ norm over the angular sector $S^2$ at fixed $r$, with the bound required to hold at every admissible radius, so $\varepsilon_{\mathrm{sep}}$ controls the worst-case angular non-separability. The angular part is the $S^2$ eigenmode statement above. The radial part must be a normalizable envelope,

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

Notation guard: the standalone field $n(\mathbf X,T)$ is normalized Noether braid density throughout this chapter, while subscripted integers such as $n_a$ and $n_b$ are recovered principal envelope labels. The notation stays canonical; the argument list and subscripts carry the distinction.

That separation matters because spectra are one of the main ways observers infer the wider cosmos. A line frequency can change because the emitting assembly differs, because the local Noether sea and clock/rate conversion differ, because the photon path changes the received channel, or because the receiver's own clock comparison changes. A spectral model that merges those effects into one fitted number has lost the accounting.

Spectral lines should then be recovered as transitions between effective envelope basins:

$$
h\nu_{a\to b}
=
E_{\text{env}}(a;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})
-
E_{\text{env}}(b;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b79334aabcb6b6e)

with the local clock/rate conversion applied before comparing to observer frequencies. This keeps the atomic spectrum tied to geometry and causal-wake closure without claiming that the standard orbital postulate has already been derived.

For hydrogen, the spectral channel should be the first channel-scan case inherited from [Atomic Structure](atomic-structure.md#hydrogen-channel-scan-proof-target). In this channel the scan fixes $X=\mathrm{spec}$, chooses $\ell\in I_{\mathrm{spec}}^{\mathrm{atom}}$, and extracts the electron-envelope branch and local Noether sea response through

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

with $E_{\text{env}}^{(\ell)}$ still depending on $\mathcal W_{\text{nuc}}$, $\rho_{\text{NS}}$, $n$, and $\chi_{\text{sea}}$ in the same declared window. A schematic observer-frequency comparison can then be written as

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

where $\Gamma_N^{(\ell)}$ stands for the local cadence-stretch readout and $\left(\Gamma_N^{(\ell)}\right)^{-1}$ is the corresponding clock-rate conversion from [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target). The spectral scan first declares the composite residual that couples the clock norm to the envelope-gap readout:

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

This makes the spectral channel a composite readout, not a separate fitted surface. The clock norm supplies the phase/cadence/delay part, while the envelope-gap term tests whether the same electron branch and proton source envelope recover the line spacing. If the line can be matched only by changing $\Gamma_N^{(\ell)}$, $\chi_{\text{sea}}^{(\ell)}$, or the electron-envelope branch after the transition pair is chosen, the spectral channel has split from the hydrogen boundary scan.

After this composite readout is declared, the spectral scan passes only if the same hydrogen ledger and Noether sea complement produce a stable line readout under the refinement condition inherited from the hydrogen channel scan:

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

The failure modes are direct: the spectral target fails if $(n,\chi_{\text{sea}})$ collapse into one parameter, if $(n,\ell,m)$ are used as inputs rather than recovered labels, if the proton source envelope is replaced by three free quark sources, or if $R_\infty$ must be fitted independently of the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ record that supplies the line gaps.

## Hydrogen Rydberg Benchmark Target

The first calibration-free hydrogen benchmark should use ordinary isolated hydrogen lines only after the envelope labels have been recovered. Let $\mathcal L_{\mathrm H}^{0}$ be a chosen weak-homogeneous line set with transitions $a\to b$, where $a$ and $b$ carry recovered principal labels $n_a > n_b$ and no external field or material branch is active. Define the observer-level line factor

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c0a401297a2bc754)

Standard hydrogen spectroscopy names familiar subfamilies inside this same line set. Lyman, Balmer, Paschen, Brackett, and Pfund are fixed-lower-label slices with $n_b=1,2,3,4,5$ respectively and $n_a > n_b$. In this benchmark those names remain observer-level groupings, not independent fitted surfaces. A successful scan must recover the same $\widehat R_{\mathrm H}^{(\ell)}$, the same $c_{\gamma,0}^{(\ell)}$, and the same local Noether sea and clock/rate record across whichever named series are included in $\mathcal L_{\mathrm H}^{0}$.

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

where $c_{\gamma,0}^{(\ell)}$ is the local photon-channel speed in the same weak homogeneous reference used for the line comparison; in the weak homogeneous limit $c_{\gamma,0}^{(\ell)}\to c_0$, which ties this composite symbol to the canonical speed ladder. The benchmark is not that the symbol $R_\infty$ is inserted by hand. The target is that the hydrogen line set has one transition-independent readout,

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

after using the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$, $\Gamma_N^{(\ell)}$, and $\chi_{\text{sea}}^{(\ell)}$ for every line in the set. The infinite-nuclear-mass limit is then a recovery target,

$$
\lim_{M_p/m_e\to\infty}
\widehat R_{\mathrm H}^{(\ell)}
=
R_\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-7727ac59256f6eec)

with $m_e$ and $M_p$ read as externally exposed mass responses rather than primitive point-particle masses. The finite-hydrogen benchmark may retain the usual reduced-mass correction as an observer-level comparison, but it must not become an independent fitted constant.

Deuterium supplies the immediate isotope falsifier. With the electron branch and $Z=1$ source class held fixed, the hydrogen/deuterium line ratio must follow from the independently exposed nuclear mass responses and the same envelope functional, with no isotope-specific Rydberg fit. Hydrogen-like ions such as $\mathrm{He}^{+}$ and $\mathrm{Li}^{2+}$ then test the recovered $Z^2$ scaling and its declared finite-size and recoil corrections using the same $\mathcal W_{\text{nuc}}$ machinery.

The line-gap residual is the companion check:

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

This residual keeps the spectral benchmark tied to the envelope calculation. It fails if each line requires a separate $R_\infty$ adjustment, if reduced mass, recoil, or clock/rate effects are absorbed into the envelope energy without being named, if $c_{\gamma,0}^{(\ell)}$ is changed between lines, or if the local Noether sea variables are retuned after the line set is chosen. The event-level emission and absorption ledger that tests the same gaps belongs to [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md#hydrogen-line-benchmark-record).

The coefficient row version of the same benchmark is the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md). Its input variables are the shared hydrogen channel ledger, the line set $\mathcal L_{\mathrm H}^{0}$, the envelope gaps, the observer frequencies, the clock-facing deformation record $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, and the declared residual budgets. The scan accepts only rows that preserve $b_\xi=1$ (the inherited Lorentz-branch constraint entry), satisfy the weak static endpoint constraint, and use the same $C_N=\Gamma_N^{-1}$ clock-rate conversion for every selected transition. It therefore turns the Rydberg benchmark into a coefficient row constraint rather than a per-line fitting surface.

The first executable scaffold for that scan keeps the hydrogen labels theory-facing while the envelope solver remains open. It derives $\Lambda_{ab}$ from recovered principal labels, sets the normalized observer-frequency entries to that line factor, derives the replay envelope gaps from one shared line-inferred cadence stretch, and carries two $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ records with different density/delay/scale/core splits. Those entries are placeholders only where the corpus has not yet supplied the native calculation: the envelope calculation must later replace the scaffolded cadence stretch with computed gap entries, the hydrogen response map must replace the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries, and the static response calculation must replace the declared $(a_n,a_\chi,a_\lambda,a_R)$ row (the static Noether sea response row) without changing the line-by-line clock factor.

The scaffold is therefore a coefficient-row constraint, not a completed hydrogen spectral derivation. The derivation closes only when the hydrogen branch supplies the envelope gaps, $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, observer frequencies, and static response row from the same spectral channel ledger and Noether sea cell.

Two nuclear-corridor-free comparison branches help order that derivation. Positronium tests two polarity-conjugate lepton envelopes with equal exposed mass responses, while muonium tests unequal lepton mass responses without a baryonic color corridor. These systems do not replace hydrogen, because their assembly records differ, but they can falsify an electron-envelope or clock/rate map before the unresolved proton source envelope is introduced.

### Lamb-Shift Recovery Target

The hydrogen Lamb shift is specifically the $2s_{1/2}$-$2p_{1/2}$ splitting. Once the spinor ledger supplies the downstream $j$ labels, the final precision target is

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

which measures deviation from ideal central Coulomb $\ell$-degeneracy and is not yet the complete Lamb-shift observable. The $2p_{3/2}$ branch belongs to the separate fine-structure recovery and must not be folded into $\Delta E_{\mathrm{Lamb}}^{(\ell)}$.

The native calculation must derive the final nonzero $2s_{1/2}$-$2p_{1/2}$ difference from the declared electron envelope, proton-adjacent response, causal-wake dressing, local Noether sea record, photon-channel event ledger, and the same spinor-label pullback that distinguishes the two $2p_j$ branches. Standard radiative and vacuum-response language may supply the observer-level benchmark, but it is not a substrate mechanism. A fit that inserts an independent $2s$ offset, or retunes $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ only for this pair, fails the same-record requirement.

For element comparisons, shell closure should enter through the realized envelope and its stability gap, not through the periodic-table family name. A local shell-closure diagnostic can be written as

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

where $\mathfrak B_{\mathrm{adm}}$ is the discrete set of realized admissible electron-envelope branches for the same nuclear source and Noether sea record. The minimum runs over distinct stable branches, not over continuous deformations of $\mathcal B_e$, so a closed shell reads as a large energy gap to the nearest competing branch.

Closed-shell atoms should correspond to large $C_{\mathrm{shell}}$ and weak low-order external envelope multipoles. Transition metals should correspond to several nearby anisotropic electron-envelope branches, especially in $d$-envelope recovery. Iron-group elements add isotope-specific nuclear binding and, in material states, magnetic or lattice branches. The words `closed shell`, `transition metal`, and `iron group` are therefore observer-level summaries until translated into $\mathcal B_e$, $\mathcal W_{\text{nuc}}$, $C_{\mathrm{shell}}$, and any realized bonding or lattice branch.

This chapter owns the envelope gap and observer-level spectral comparison. The emission, absorption, recoil, non-radiative alternatives, and Gate C transition-rate record belong to [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md).

The second closure target is gravitational spectral shift. A viable account should derive redshift-sensitive atomic spectra from both local assembly resonance and the effective clock/rate layer, rather than treating the shift as a density-only lattice effect.

For the medium-level gravitational side of that program, see [Emergent Metric](../spacetime/emergent-metric.md) and [Black Holes](../spacetime/black-holes.md).

## Magnetic and Recoil Spectral Benchmarks

External magnetic spectra should be treated as recovery benchmarks for the same effective U(1) connection used by radiation and material-response closure. In a weak homogeneous magnetic branch, the observer-level Landau comparison asks for an effective cyclotron spacing

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

where $m_*$ is the material or envelope effective mass when the electron assembly is in a branch environment. This is not a primitive Lorentz-force postulate. It is a test that the envelope branch, effective magnetic-state map, and exposed mass response combine to reproduce the standard spacing in the validated limit.

Zeeman splitting should remain downstream of the spin ledger, but it gives a useful coefficient target:

$$
\Delta E_Z
=
g_{\mathrm{eff}}\mu_B B
$$

[View →](../../../../equation-mapping.html#corpus-equation-9f4a61d2a0d70648)

The normal Zeeman limit gives a sharper staged benchmark. In that limit the external magnetic branch should split one observer-level line into the standard polarization-resolved pattern:

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

Solar and stellar Zeeman observations sharpen this as a source-reconstruction benchmark, not merely a laboratory line-splitting example. Hale's 1908 sunspot measurements used viewing geometry and analyzer response to distinguish the longitudinal circularly polarized doublet from the transverse linearly polarized components. For this chapter, the recovery target is therefore a same-record map from source magnetic state, viewing direction, line family, analyzer response, and photon-channel polarization ledger to split line positions and intensities. The lab calibration and the solar or stellar inference must consume the same effective magnetic-state map; otherwise the inferred field strength is only a spectroscopic fit.

Nuclear recoil-free resonant absorption supplies a separate material-coupled benchmark. For a photon of energy $E_\gamma$ absorbed by a free atom of mass $M$, the observer-level recoil scale is

$$
E_{\mathrm{recoil}}
=
\frac{E_\gamma^2}{2Mc_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-da024186a0209e47)

In a solid branch, a recoil-free event is allowed only when the momentum is routed coherently through the material branch with no phonon occupation change in the relevant channel. In ledger form,

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

with $V$ the crystal volume and $\Delta N_s(\mathbf k)$ the dimensionless per-mode occupation change. The recoil-free spectral line is the branch with $\Delta N_s(\mathbf k)=0$ for the emitted or absorbed channel and with recoil assigned to the coherent material response rather than to a single free nucleus. This benchmark connects atomic spectra to [Condensed Matter](condensed-matter.md#lattice-scattering-and-phonon-response) without turning the lattice into a new nuclear source.

## Spin-Sensitive Spectral Targets

After the base resonance and clock/rate program is stable, the spin-sensitive spectrum should be revisited as a validation surface for the completed angular-momentum ledger. Fine-structure and spin-orbit terms must distinguish observer-level orbital angular momentum from internal Noether braid spinor behavior. Hyperfine terms must add the nuclear spin ledger without treating proton or neutron spin decomposition as already closed. The [21 cm hydrogen-line example](../cosmology/expansion-mechanism.md#21-cm-hydrogen-line-example) is the cosmology-facing same-record test of that handoff. Zeeman and related analyzer-response cases must use the finite-time measurement-response model rather than inserting preassigned spin labels.

The anomalous Zeeman cases make this target concrete. A normal triplet can count as a successful classical-limit recovery of magnetic splitting, but quartets, sextets, and higher multiplets cannot be handled by one universal oscillator response plus per-line labels. The same spectral channel must recover the line-specific splitting pattern, polarization selection, and magnetic-field scaling from one atomic envelope, finite-time analyzer-response model, photon-channel event record, and angular-momentum/spinor ledger. A fit that handles the normal Zeeman effect while assigning anomalous multiplets to separate labels or per-line parameters has not recovered the spin-sensitive spectrum.

The orbital part of this recovery should match the standard effective labels $\ell$ and $m$, including $L^2\to\ell(\ell+1)\hbar^2$ and chosen-axis projection $L_z\to m\hbar$. The spin-sensitive part is a separate validation target: it must couple that orbital envelope to the completed internal spinor ledger rather than treating atomic orbital quantization as a proof of fermion spin.
