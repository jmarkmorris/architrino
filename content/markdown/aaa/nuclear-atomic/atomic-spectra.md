# Atomic Spectra

This chapter records the working $\mathbb{A}\mathbb{A}\mathbb{A}$ picture of atomic spectra as resonance structure in the Noether sea rather than as a purely abstract orbital postulate. The immediate goal is to identify which spectral constants and redshift effects should be read as medium-sensitive resonance data.

It should be read alongside [Atomic Structure](atomic-structure.md), [Electron](../assemblies/fermions/electron.md), [Condensed Matter](condensed-matter.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md), since the spectral shifts proposed here depend on local assembly structure, the effective clock/rate layer, and the photon-channel event record.

The note is still exploratory, so the opening should be read as a compact program statement rather than as a closed derivation.

Spin-sensitive spectral structure is downstream of the angular-momentum proof program. This chapter may use observer-level labels such as fine structure, spin-orbit structure, Zeeman splitting, and hyperfine splitting as recovery targets, but those labels must inherit the single-assembly angular-momentum ledger, ordered-frame spinor closure, and measurement-response model in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md). They are not independent derivations of spin.

## Atomic Orbitals as Lattice Resonances

Electron orbitals are treated here as stable resonance patterns of electron assemblies coupled to the local Noether sea. This is an effective atomic model, not yet a derivation from the constituent master equation.

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

The labels $(n,\ell,m)$ are therefore spectral and orbital recovery labels for the effective envelope. They should not be used backward as evidence that the internal nuclear or electron Noether braid ledgers have already been derived.

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

The angular part is the $S^2$ eigenmode statement above. The radial part must be a normalizable envelope,

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

In the standard Schrödinger calculation, the second condition is enforced by terminating the radial power series into the associated Laguerre family; that is the mathematical source of discrete principal labels in the ideal Coulomb problem. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a recovery target, not an input postulate: the same hydrogen spectral channel must first supply the effective central envelope, its non-separable residual, and the radial energy functional from the electron branch, proton source envelope, and local Noether sea record.

The first closure target is the Rydberg constant. In the present notation, a completed model should express $R_\infty$ as a function of the effective nuclear causal-wake envelope $\mathcal W_{\text{nuc}}$, the physical Noether braid density $\rho_{\text{NS}}(\mathbf{x},t)$, the normalized density $n(\mathbf{x},t)$, the Noether sea delay factor $\chi_{\text{sea}}(\mathbf{x},t)$, and the local clock/rate response encoded by $\Gamma_N(\mathbf{x},t)$. The important discipline is to keep $n$ as normalized density, $\chi_{\text{sea}}$ as the delay factor, and $\Gamma_N$ as the cadence-stretch diagnostic.

Spectral lines should then be recovered as transitions between effective envelope basins:

$$
h\nu_{a\to b}
=
E_{\text{env}}(a;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})
-
E_{\text{env}}(b;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})
$$

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

where $\Gamma_N^{(\ell)}$ stands for the local cadence-stretch readout and $\left(\Gamma_N^{(\ell)}\right)^{-1}$ is the corresponding clock-rate conversion from [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target). The spectral scan passes only if the same hydrogen ledger and Noether sea complement produce a stable line readout under admissible refinement:

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

This makes the spectral channel a composite readout, not a separate fitted surface. The clock norm supplies the phase/cadence/delay part, while the envelope-gap term tests whether the same electron branch and proton source envelope recover the line spacing. If the line can be matched only by changing $\Gamma_N^{(\ell)}$, $\chi_{\text{sea}}^{(\ell)}$, or the electron-envelope branch after the transition pair is chosen, the spectral channel has split from the hydrogen boundary scan.

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

The failure modes are direct: the spectral target fails if $(n,\chi_{\text{sea}})$ collapse into one parameter, if $(n,\ell,m)$ are used as inputs rather than recovered labels, if the proton source envelope is replaced by three free quark sources, or if $R_\infty$ must be fitted independently of the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ record that supplies the line gaps.

## Hydrogen Rydberg Benchmark Target

The first calibration-free hydrogen benchmark should use ordinary isolated hydrogen lines only after the envelope labels have been recovered. Let $\mathcal L_{\mathrm H}^{0}$ be a chosen weak-homogeneous line set with transitions $a\to b$, where $a$ and $b$ carry recovered principal labels $n_a>n_b$ and no external field or material branch is active. Define the observer-level line factor

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

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

where $c_{\gamma,0}^{(\ell)}$ is the local photon-channel speed in the same weak homogeneous reference used for the line comparison. The benchmark is not that the symbol $R_\infty$ is inserted by hand. The target is that the hydrogen line set has one transition-independent readout,

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

after using the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$, $\Gamma_N^{(\ell)}$, and $\chi_{\text{sea}}^{(\ell)}$ for every line in the set. The infinite-nuclear-mass limit is then a recovery target,

$$
\lim_{M_p/m_e\to\infty}
\widehat R_{\mathrm H}^{(\ell)}
=
R_\infty
$$

with $m_e$ and $M_p$ read as externally exposed mass responses rather than primitive point-particle masses. The finite-hydrogen benchmark may retain the usual reduced-mass correction as an observer-level comparison, but it must not become an independent fitted constant.

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

This residual keeps the spectral benchmark tied to the envelope calculation. It fails if each line requires a separate $R_\infty$ adjustment, if reduced mass, recoil, or clock/rate effects are absorbed into the envelope energy without being named, if $c_{\gamma,0}^{(\ell)}$ is changed between lines, or if the local Noether sea variables are retuned after the line set is chosen. The event-level emission and absorption ledger that tests the same gaps belongs to [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md#hydrogen-line-benchmark-record).

The coefficient row version of the same benchmark is the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md). Its input variables are the shared hydrogen channel ledger, the line set $\mathcal L_{\mathrm H}^{0}$, the envelope gaps, the observer frequencies, the clock-facing deformation record $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, and the declared residual budgets. The scan accepts only rows that preserve $b_\xi=1$, satisfy the weak static endpoint constraint, and use the same $C_N=\Gamma_N^{-1}$ clock-rate conversion for every selected transition. It therefore turns the Rydberg benchmark into a coefficient row constraint rather than a per-line fitting surface.

The first executable scaffold for that scan keeps the hydrogen labels theory-facing while the envelope solver remains open. It derives $\Lambda_{ab}$ from recovered principal labels, sets the normalized observer-frequency entries to that line factor, derives the replay envelope gaps from one shared line-inferred cadence stretch, and carries two $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ records with different density/delay/scale/core splits. Those entries are placeholders only where the corpus has not yet supplied the native calculation: the envelope calculation must later replace the scaffolded cadence stretch with computed gap entries, the hydrogen response map must replace the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries, and the static response calculation must replace the declared $(a_n,a_\chi,a_\lambda,a_R)$ row without changing the line-by-line clock factor.

The scaffold is therefore a coefficient-row constraint, not a completed hydrogen spectral derivation. The derivation closes only when the hydrogen branch supplies the envelope gaps, $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, observer frequencies, and static response row from the same spectral channel ledger and Noether sea cell.

For element comparisons, shell closure should enter through the realized envelope and its stability gap, not through the periodic-table family name. A local shell-closure diagnostic can be written as

$$
C_{\mathrm{shell}}(\mathcal B_e)
=
\min_{\delta\mathcal B_e\ne0}
\left[
E_{\mathrm{env}}
\!\left(
\mathcal B_e+\delta\mathcal B_e;
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

where $m_*$ is the material or envelope effective mass when the electron assembly is in a branch environment. This is not a primitive Lorentz-force postulate. It is a test that the envelope branch, effective magnetic-state map, and exposed mass response combine to reproduce the standard spacing in the validated limit.

Zeeman splitting should remain downstream of the spin ledger, but it gives a useful coefficient target:

$$
\Delta E_Z
=
g_{\mathrm{eff}}\mu_B B
$$

The closure burden is to derive $g_{\mathrm{eff}}$ from the completed internal spinor ledger, material branch, and measurement-response model rather than assigning a free spin label. In isolated-atom comparisons this protects fine, hyperfine, and Zeeman recovery from being fitted independently of the base spectral envelope.

Nuclear recoil-free resonant absorption supplies a separate material-coupled benchmark. For a photon of energy $E_\gamma$ absorbed by a free atom of mass $M$, the observer-level recoil scale is

$$
E_{\mathrm{recoil}}
=
\frac{E_\gamma^2}{2Mc_0^2}
$$

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
\sum_s\int_{\mathrm{BZ}}
\frac{d^3k}{(2\pi)^3}
\hbar\omega_s(\mathbf k)\Delta N_s(\mathbf k)
$$

The recoil-free spectral line is the branch with $\Delta N_s(\mathbf k)=0$ for the emitted or absorbed channel and with recoil assigned to the coherent material response rather than to a single free nucleus. This benchmark connects atomic spectra to [Condensed Matter](condensed-matter.md#lattice-scattering-and-phonon-response) without turning the lattice into a new nuclear source.

## Spin-Sensitive Spectral Targets

After the base resonance and clock/rate program is stable, the spin-sensitive spectrum should be revisited as a validation surface for the completed angular-momentum ledger. Fine-structure and spin-orbit terms must distinguish observer-level orbital angular momentum from internal Noether braid spinor behavior. Hyperfine terms must add the nuclear spin ledger without treating proton or neutron spin decomposition as already closed. Zeeman and related analyzer-response cases must use the finite-time measurement-response model rather than inserting preassigned spin labels.

The orbital part of this recovery should match the standard effective labels $\ell$ and $m$, including $L^2\to\ell(\ell+1)\hbar^2$ and chosen-axis projection $L_z\to m\hbar$. The spin-sensitive part is a separate validation target: it must couple that orbital envelope to the completed internal spinor ledger rather than treating atomic orbital quantization as a proof of fermion spin.
