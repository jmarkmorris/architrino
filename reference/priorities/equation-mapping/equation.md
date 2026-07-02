# Equation Mapping Detail

## Purpose

This file lists established physics and cosmology formulae and equations that should map bidirectionally with $\mathbb{A}\mathbb{A}\mathbb{A}$. The forward direction asks how each established equation is recovered, reclassified, or compared through Noether sea, Noether braid, event-ledger, and retained-record variables. The reverse direction treats each established formula as an inverse clue about native $\mathbb{A}\mathbb{A}\mathbb{A}$ variables, proof obligations, simulation targets, and missing records. The file records dated maturity scores for each map in current $\mathbb{A}\mathbb{A}\mathbb{A}$ material and gives a closure packet for each equation group.

This is internal priority material. It is not a reader-facing claim that these equations have all been derived.

## Scoring Rubric

| Score | Meaning |
| --- | --- |
| `5` | Native or essentially direct in current AAA equations; closure object is already part of the canonical framework. |
| `4` | Strong equation-level mapping exists with canonical variables and explicit residuals, but proof or coefficient closure remains open. |
| `3` | Partial map exists and the right AAA variables are named; a real derivation, shared residual, or simulation packet is still needed. |
| `2` | Useful comparison equation with plausible AAA carriers, but current mapping is mostly scaffolding. |
| `1` | Important external benchmark with only a loose AAA relation so far. |
| `0` | Not currently mapped or out of scope. |

Use each dated score as a maturity indicator, not as a value judgment. A low-score equation can still be important if it protects contact with tested physics. Scores should be conservative audit-facing evidence labels, not motivational targets. Assume a hostile but technically competent review: a row should rise only when its retained branch, Noether sea record, event ledger, residual, or proof route can survive close inspection without hidden retuning. The `Promoted?` column tracks reader-facing promotion state: leave it blank when the packet is not promotion-ready, use `ready` when the priority packet is mature enough for promotion work, and use `complete` only after the material has been promoted into `content/markdown/aaa`.

## Scale-Resolution Guardrail

Observer-scale formula agreement is not substrate evidence by itself. A row can match a benchmark at the resolution where modern experiments reconstruct fields, particles, spectra, or cosmological parameters while still hiding substrate carriers many orders below that scale. Score review therefore requires either a native-to-effective lifting map or an explicit blocker saying that the lift is missing.

For equation row `EQ-k`, let $\ell_{\mathrm{sub}}$ be the declared native carrier resolution, $\ell_{\mathrm{obs}}$ the observer benchmark resolution, $\Gamma_{\mathrm{sub}}$ the retained native record, and $\mathcal L_{\ell_{\mathrm{sub}}\to\ell_{\mathrm{obs}}}$ the proposed coarse-graining or transport map. A compact lifting residual is

$$
\mathcal R_{\mathrm{lift},k}
=
\frac{
\left\|
\Pi_{\ell_{\mathrm{obs}}}
\!\left(
\mathcal L_{\ell_{\mathrm{sub}}\to\ell_{\mathrm{obs}}}
[\Gamma_{\mathrm{sub}}]
\right)
-
E_{k}^{\mathrm{obs}}
\right\|
}{\epsilon_k}.
$$

A precise observer fit with $\mathcal R_{\mathrm{lift},k}$ absent remains `2` or `3` material depending on the carrier specificity; it does not become branch evidence merely because the inherited equation is accurate. This guardrail is the scale-resolution form of `equation_map.imported_formula`.

## Summary Table

| ID | Equation or equation group | Representative equation | Primary AAA carrier | 6/23 a | 6/23 b | Closure driver | Promoted? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `EQ-01` | Causal wake master equation and per-hit law | $\mathbf{a}_{o'\leftarrow o}\propto r^{-2}J^{-1}\hat{\mathbf r}$ | Architrino causal wakes, causal-root ledger | `5` | `5` | Keep all later maps tied to active roots, Jacobians, line-of-action hits, and event ledgers. | ready |
| `EQ-02` | Lorentz factor, clock rate, and ruler contraction | $\gamma_{\star}=(1-\beta_{\star}^2)^{-1/2}$; $d\tau/dt=1/\gamma_{\star}$ | Moving Noether braid through local Noether sea | `4` | `4` | Derive moving-clock and moving-ruler factors from one branch ledger. |  |
| `EQ-03` | Oblate spheroidal envelope ratio | $\xi=R_{\parallel}/R_{\perp}\to1/\gamma_{\mathrm{eff}}$ | Noether braid envelope geometry | `4` | `4` | Prove return-cycle closure produces the axis ratio, not just a visual match. |  |
| `EQ-04` | Energy-momentum and rest energy | $E^2=p^2c_{\mathrm{eff}}^2+M_0^2c_{\mathrm{eff}}^4$ | Closed internal causal-history ledger, shielding, Noether sea response | `3` | `4` | Compose branch energy, exposure quotient, and medium-response tensor. |  |
| `EQ-04A` | Koide charged-lepton mass relation | $\frac{(\sqrt{m_e}+\sqrt{m_\mu}+\sqrt{m_\tau})^2}{m_e+m_\mu+m_\tau}=\frac{3}{2}$ | Charged-lepton generation-by-shielding ladder and exposed mass response | `1` | `1` | Test whether one charged-lepton mass map lands near the Koide surface without fitting to it. |  |
| `EQ-05` | Noether conservation laws | $dE_{\mathrm{tot}}/dt=0$; $\mathbf{P}_{\mathrm{tot}}=\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}$ | Delay action, wake channels, event ledgers | `3` | `4` | Construct finite-window conserved totals with boundary flux and residuals. |  |
| `EQ-06` | Noether sea continuity and moment closure | $\partial_t\rho_{\mathrm{NS}}+\nabla\cdot(\rho_{\mathrm{NS}}\mathbf u_{\mathrm{sea}})=S_{\rho}+r_{\rho}$ | Noether sea density, flow, energy, cadence, orientation | `4` | `4` | Derive continuum rows as low-moment projections of braid population dynamics. |  |
| `EQ-07` | Effective metric ADM/Cartan map | $ds_{\rm eff}^2=-N^2c_0^2dt^2+\gamma_{ij}(dx^i-u^i_{\mathrm{sea}}dt)(dx^j-u^j_{\mathrm{sea}}dt)$ | Noether sea lapse, drift, spatial compliance | `4` | `4` | Derive one constitutive map into clock, ruler, and signal channels. |  |
| `EQ-07A` | Compact-star support and collapse scale residual | $P_{e,\mathrm{nr}}\propto\rho^{5/3}$; $P_{e,\mathrm{rel}}\propto\rho^{4/3}$; $M_{\mathrm{Ch}}\propto Y_e^2M_\odot$ | Compact-region Noether braid packing, reaction ledger, Noether sea response, and metric compliance | `2` | `2` | Build one compact-region carrier that recovers support scaling, reaction inventory, material scale compression, and effective spatial compliance without hidden retuning. |  |
| `EQ-08` | Weak-field clock and gravitational redshift | $d\tau/dt\approx1+\Phi_N/c_0^2-\lVert\mathbf w\rVert^2/(2c_0^2)$ | Noether sea cadence $\Gamma_N$, moving clock channel | `4` | `4` | Extract $\Gamma_N$ from braid cadence, density, delay, and potential response. |  |
| `EQ-09` | Shapiro delay, lensing, and PPN rows | $\Delta\theta=2(1+\gamma_{\mathrm{PPN}})GM/(bc_0^2)$ | Shared effective metric projection | `3` | `4` | Force redshift, Shapiro, lensing, precession, acceleration, and preferred-frame rows through one record. |  |
| `EQ-10` | Geodesic and proper-time action | $S_{\mathrm{clk}}=-mc_0^2\int d\tau$ | Observer-level clock/ruler record from Noether sea | `3` | `3` | Recover geodesic motion as a projection, not as substrate geometry. |  |
| `EQ-11` | Einstein and Poisson weak-gravity limits | $\nabla^2\Phi_N=4\pi G\rho$; $G_{\mu\nu}=8\pi GT_{\mu\nu}/c^4$ | Noether sea stress, density, effective response | `2` | `3` | Derive $G_{\mathrm{eff}}$, stress-energy readout, and curvature response from the same constitutive law. |  |
| `EQ-11A` | Gravitational-wave source, chirp, orbital-decay, and ringdown recovery | $\dot f_{\mathrm{GW}}\propto\mathcal M_c^{5/3}f_{\mathrm{GW}}^{11/3}$; $P_{\mathrm{GW}}\propto\langle\dddot Q_{ij}\dddot Q^{ij}\rangle$ | Effective metric tensor channel, Noether sea constitutive record, and source event ledger | `2` | `2` | Recover source quadrupole, chirp mass, orbital decay, strain flux, radiated energy/angular momentum, and ringdown from one source carrier without hidden retuning. |  |
| `EQ-12` | Photon energy, null condition, and eikonal propagation | $E=h\nu$; $g^{\mathrm{eff}}_{\mu\nu}dx^\mu dx^\nu=0$ | Photon-channel packets through Noether sea | `3` | `3` | Connect packet energy, helicity, null transport, and medium frequency exchange. |  |
| `EQ-12A` | Planck action quantum, de Broglie relations, and braid action scale | $E=h\nu=\hbar\omega$; $\mathbf p=\hbar\mathbf k$; $\oint p\,dq=nh$ | Closed-cycle Noether braid action ledger and photon packet row | `2` | `2` | Derive $h$ and $\hbar$ as shared action-cycle readouts instead of primitive constants or per-row fit handles. |  |
| `EQ-13` | Maxwell and wave equations | $\Box A_{\mu}=J_{\mu}$ as comparison form | Effective field summary of causal wakes and photon channels | `2` | `3` | Recover field equations as continuum summaries of wake superposition and packet transport. |  |
| `EQ-14` | Schrodinger and Born-current continuity | $\partial_t\rho_{\mathrm{rec}}+\nabla\cdot\mathbf J_{\mathrm{rec}}=0$ | Basin measure, record flow, Noether sea background | `2` | `3` | Derive probability-current behavior from deterministic branch and record dynamics. |  |
| `EQ-15` | Klein-Gordon, Dirac, spinor, and spin-statistics equations | $(i\hbar\gamma^\mu\partial_\mu-mc)\psi=0$ as benchmark | Noether braid ordered-frame, spinor, exchange, and angular-momentum ledgers | `1` | `2` | Build the spinor and exchange record before importing relativistic wave equations. |  |
| `EQ-16` | Gauge and Standard Model field equations | Yang-Mills and QED/QCD equations as benchmarks | Effective interaction sectors, reaction provenance, branch labels | `1` | `2` | Convert gauge behavior into sector-visible ledger projections and reaction closure. |  |
| `EQ-16A` | Neutrino oscillation phase gaps and PMNS mixing | $\Delta\omega_{ij}\simeq\Delta m_{ij}^2c^4/(2E\hbar)$; $\lvert\nu_\alpha\rangle=\sum_iU_{\alpha i}\lvert\nu_i\rangle$ | Equal-frequency tri-binary Noether braid candidate, neutral-lepton phase operator, weak-coupling readout | `2` | `3` | Factor a common hidden clock while deriving two independent observed phase gaps from one retained neutral-lepton branch. |  |
| `EQ-17` | Redshift factorization | $1+z_X\approx \Gamma_{N,E}\mathcal P_{E\to R}/(\Gamma_{N,R}B_XD_v)$ | Endpoint cadence, launch geometry, source branch, path-history propagation | `4` | `4` | Close one signed frequency-transfer ledger across gravitational, Doppler, source, and cosmological cases. |  |
| `EQ-18` | Effective FRW metric and scale factor | $ds_{\mathrm{FRW,eff}}^2=-c_0^2d\tau_c^2+a_{\mathrm{eff}}^2d\Sigma_k^2$ | Observer-level projection of evolving Noether sea | `3` | `3` | Extract $a_{\mathrm{eff}}$ from medium evolution, clock comparison, and transport records. |  |
| `EQ-19` | Friedmann and cosmological continuity equations | $H_{\mathrm{eff}}^2=8\pi G_{\mathrm{eff}}\rho_{\mathrm{eff}}/(3c_0^2)-kc_0^2/a_{\mathrm{eff}}^2+\Lambda_{\mathrm{eff}}/3$ | Fixed-void Noether sea cosmology projection | `3` | `3` | Recover Friedmann-like bookkeeping without promoting void expansion. |  |
| `EQ-20` | Dark-energy equation of state and $\Lambda$ | $p=w\rho c_0^2$; $\Lambda_{\mathrm{eff}}=8\pi G_{\mathrm{eff}}\rho_{\mathrm{DE,eff}}/c_0^2$ | Noether sea tension, pressure, relaxation | `2` | `3` | Derive negative effective pressure from Noether sea state, not from fitted $\Lambda$ alone. |  |
| `EQ-21` | Structure growth and matter power | $\ddot\delta+2H\dot\delta-4\pi G_{\mathrm{eff}}\bar\rho_m\delta=0$; $P(k,z)=P_{\mathrm{seed}}T^2D^2$ | Medium-and-assembly growth history | `3` | `3` | One sea record must feed growth, CMB lensing, shear, BAO, and halo tests. |  |
| `EQ-22` | CMB transfer, blackbody, and acoustic equations | $C_\ell^{XY}=\frac{2}{\pi}\int k^2dk\,P(k)\Delta_{X\ell}\Delta_{Y\ell}$ | Noether sea thermalization and photon decoupling | `2` | `3` | Derive source, thermalization, acoustic, frame, and blackbody records together. |  |
| `EQ-22A` | Planck blackbody law, mode counting, and photon occupancy | $\bar n_\nu=(e^{h\nu/k_BT}-1)^{-1}$; $u_\nu=8\pi h\nu^3/[c_\gamma^3(e^{h\nu/k_BT}-1)]$ | Finite-window thermal record, photon Gate B modes, Noether sea thermalization | `2` | `2` | Recover the Planck spectrum from shared mode counting, zero photon chemical potential, and thermalization depth without per-bin temperature fitting. |  |
| `EQ-22B` | Recombination, visibility, sound horizon, and acoustic transfer | $\Gamma_T=n_e\sigma_Tc_\gamma$; $y_{\mathrm{vis}}=\Gamma_Te^{-\tau_T}$; $r_s=\int c_s\,dt/a_{\mathrm{eff}}$ | Shared thermal/provenance/readout record, photon and neutrino channels, Noether sea state, event ledger | `2` | `2` | Recover recombination kinetics, visibility, sound horizon, damping, and acoustic transfer from one shared observation carrier without importing an origin story or private readout clock. |  |
| `EQ-23` | BBN rate and freezeout equations | reaction-network yields $\mathbf Y[\{T,\rho,n_b,n_\gamma,n_n\}]$ | Source-window thermal record and Noether sea state | `2` | `3` | Preserve light-element yields, $\eta$, $N_{\text{eff}}$, photon loading, and neutrino rows in one record. |  |
| `EQ-24` | Fluid, elastic, and acoustic-medium equations | acoustic metric and stress-strain laws as comparison forms | Noether sea continuum response | `3` | `3` | Use only as low-moment projections of Noether braid population dynamics. |  |
| `EQ-25` | Thermodynamic, Boltzmann, entropy, and fluctuation equations | $df/dt=C[f]$; $dS/dt\ge0$ | Coarse-grained sea and record dynamics | `2` | `3` | Derive thermalization, irreversibility, and noise from deterministic unresolved degrees of freedom. |  |
| `EQ-26` | Atomic spectral constants, fine/hyperfine structure, and Lamb-shift class | $1/\lambda=R_\infty(1/n_b^2-1/n_a^2)$; $\Delta E=h\nu$ | Atomic envelope Noether braid, local clock row, angular-momentum ledger | `3` | `3` | Recover one shared Rydberg scale and then attach spin-sensitive and loop-sensitive residuals without per-line fitting. |  |
| `EQ-26A` | Fine-structure constant, electromagnetic coupling, and energy running | $\alpha=e^2/(4\pi\epsilon_0\hbar c_\gamma)$; $d\alpha^{-1}/d\ln\mu=-b(\mu)$ | Exposed charge row, `EQ-12A` action row, photon speed, gauge/coupling response | `2` | `2` | Derive $\alpha(\mu)$ as a scale-dependent coupling projection from one electromagnetic exposure domain rather than a fixed fitted constant. |  |
| `EQ-27` | Magnetic moment, Larmor/cyclotron precession, and g-2 | $\boldsymbol\mu=g(q/2m)\mathbf S$; $a_\ell=(g-2)/2$ | Internal current geometry, ordered-frame spinor ledger, measurement-response row | `2` | `2` | Derive magnetic moment and anomaly as exposed internal-current response, not as an assigned spin label. |  |
| `EQ-28` | Compton, photoelectric, pair-threshold, and recoil equations | $\Delta\lambda=h(1-\cos\theta)/(m_ec)$; $E_\gamma\ge2m_ec^2$ | Photon-channel event ledger, recoil branch, pair-production provenance | `3` | `3` | Close energy, momentum, angular momentum, photon packet, recoil, and material/Noether sea update in one event record. |  |
| `EQ-28A` | Inverse-Compton and SZ path-frequency exchange | $Y_{\gamma}^{\mathrm{ex}}=-\ln(\nu^+/\nu^-)$; $y=\int(k_BT_e/m_ec_\gamma^2)n_e\sigma_Td\ell$ | Photon path-history exchange carrier, electron-medium row, Noether sea path state, and finite-window thermal record | `2` | `2` | Keep frequency shifts tied to one photon packet, medium/recoil/remnant ledger, SZ electron column, and thermal record without hidden retuning. |  |
| `EQ-29` | Larmor/Lienard radiation, synchrotron, bremsstrahlung, and thermal channels | $P_L=q^2a^2/(6\pi\epsilon_0c^3)$; $\nu_c\propto\gamma^2B$ | Radiation residual, photon-channel packet selection, source-event ledger | `3` | `3` | Keep source mechanism separate from carrier/channel family while deriving emitted power and spectrum from one ledger. |  |
| `EQ-30` | Scattering cross sections and form factors | $d\sigma/d\Omega\propto\lvert\mathcal M\rvert^2$; $F(Q^2)$ | Detector record statistics, exposure distribution, branch-outcome measure | `2` | `2` | Recover event rates and finite-size/exposure form factors from branch statistics rather than postulated amplitudes. |  |
| `EQ-31` | Resonance widths, lifetimes, and branching fractions | $\sigma(E)\propto[(E-E_0)^2+\Gamma^2/4]^{-1}$; $\tau=\hbar/\Gamma$ | Metastable Noether braid branch, leakage corridor, decay provenance ledger | `2` | `2` | Derive width, lifetime, and branching fractions from branch stability and admissible decay corridors. |  |
| `EQ-32` | Baryonic Tully-Fisher and radial-acceleration relation | $g_{\mathrm{obs}}\approx\sqrt{g_{\mathrm{bar}}a_0}$; $v_f^4=GM_ba_0$ | Noether sea constitutive response around baryonic assemblies | `2` | `3` | Treat low-acceleration galaxy regularities as constitutive-response benchmarks without importing a new ontology. |  |

## Speed-Symbol Audit Target

Many imported equations use a generic $c$ while current $\mathbb{A}\mathbb{A}\mathbb{A}$ work separates primitive wake speed, photon-channel transport speed, observer-limit light speed, Noether sea-dressed effective speed, and internal constituent motion. A row should not count as score-review-ready if the same symbol silently changes roles between branch dynamics, photon propagation, clock export, and particle kinematics.

For an equation row `EQ-k`, define a speed-role assignment
$$
\mathcal C_{\mathrm{EQ}\text{-}k}
=
\left\{
c_f,\ c_\gamma,\ c_{\text{eff}},\ c_0,\ \|\mathbf v_a\|,\ \|\mathbf u_{a,\perp}\|
\right\}
$$
restricted to the roles actually used by that row. The audit residual is
$$
\mathcal R_{c,\mathrm{EQ}\text{-}k}
=
\sum_{\rho\in\mathcal C_{\mathrm{EQ}\text{-}k}}
\left\|
\Pi_{\rho}(\mathrm{formula})
-
\Pi_{\rho}(\mathrm{carrier})
\right\|_{\rho}
+
\mathcal S_{\mathrm{retune}},
$$
where $\Pi_{\rho}$ projects the standard formula and the proposed native carrier onto the selected speed role, and $\mathcal S_{\mathrm{retune}}$ penalizes using different speed assignments for the same event or branch record. The first audit targets are `EQ-04`, `EQ-12`, `EQ-17`, `EQ-22A`, `EQ-26A`, and `EQ-28`, because these rows frequently mix $E=mc^2$, null transport, redshift, blackbody mode density, $\alpha$, and pair-threshold formulas.

The success condition is not that all speeds are identical. In weak homogeneous observer comparisons the accepted limit may require $c_\gamma=c_{\text{eff}}=c_0+O(\epsilon_{\mathrm{LV}}c_0)$ while keeping $c_f$ as the primitive causal wake speed. Internal constituent speeds such as $\|\mathbf v_a\|$ and $\|\mathbf u_{a,\perp}\|$ remain separate unless a branch derivation proves the collapse.

## EQ-01: Causal Wake Master Equation And Per-Hit Law

### Standard or Native Form

The native substrate equation is the per-hit causal wake acceleration:

$$
\mathbf{a}_{o'\leftarrow o}(t;t_0)
=
\kappa\,\sigma_{q_o q_{o'}}
\frac{|q_o q_{o'}|}{r^2}
W_{o'\leftarrow o}^{\mathrm{rec}}(t;t_0)
\hat{\mathbf r},
$$

with source-normal denominator, receiver-normal numerator, and branch strength

$$
D_{s,o'\leftarrow o}=c_f-\mathbf v_o(t_0)\cdot\hat{\mathbf r},
\qquad
D_{t,o'\leftarrow o}=c_f-\mathbf v_{o'}(t)\cdot\hat{\mathbf r},
\qquad
W_{o'\leftarrow o}^{\mathrm{rec}}=\left|\frac{D_{t,o'\leftarrow o}}{D_{s,o'\leftarrow o}}\right|.
$$

### AAA Mapping

This is the root equation from which the rest of the mapping must not drift. It carries:

- finite causal delay;
- inverse-square causal wake dilution;
- receiver-normal branch strength;
- line-of-action direction;
- source polarity and receiver polarity;
- Jacobian bunching or dilution;
- active-root branch structure.

### Closure Status

Score: `5`.

The equation is native. The open work is not to map it into AAA, but to prevent higher-level equations from bypassing it. Every later formula should identify which reduced record of active roots, wake energy, event ledgers, or Noether sea moments it consumes.

Promotion disposition: `ready`. The row is native and the dependency note below is now explicit enough for reader-facing promotion work. Promotion should still preserve the internal/external distinction: `EQ-01` can be promoted as the root causal-wake equation, while downstream recovery claims remain at their current scores until their retained branch, event, or Noether sea records close.

### Dependency Note

Every downstream row must either consume the active-root law directly or consume a declared coarse-graining of it through a wake ledger, event ledger, retained branch chart, or Noether sea moment. A standard equation cannot count as mapped if it bypasses the causal-root source and only imports an observer-level formula.

| Downstream rows | Required `EQ-01` dependency |
| --- | --- |
| `EQ-02` through `EQ-04`, plus `EQ-04A` | Moving clocks, oblate spheroidal envelope rows, energy-momentum, exposed mass, and charged-lepton mass-root benchmarks must share one retained branch chart with active roots, causal-root Jacobians, wake tails, line-of-action geometry, and no hidden retune between clock, envelope, energy, and mass readouts. |
| `EQ-05` | Conservation rows must include wake energy, wake momentum, angular momentum, event work, and boundary flux on the same finite window; ordinary local mechanical totals alone are not enough in a delay system. |
| `EQ-06`, `EQ-24`, and `EQ-25` | Noether sea continuity, medium response, acoustic/elastic rows, and thermal/statistical rows must be low-moment or finite-window projections of retained Noether braid population dynamics, not independent continuum postulates. |
| `EQ-07` through `EQ-11`, `EQ-17` through `EQ-20`, and `EQ-32`, plus `EQ-07A`, `EQ-07C`, and `EQ-11A` | Effective metric, compact-star support, black-hole-proper horizon/interior rows, weak-gravity, gravitational-wave source, redshift, cosmology, dark-energy, and low-acceleration rows must project from Noether sea density, cadence, delay, stress, flow, and response variables whose source record is ultimately a coarse-grained causal-root and wake ledger. |
| `EQ-12`, `EQ-12A`, `EQ-22A`, `EQ-22B`, `EQ-26`, `EQ-26A`, `EQ-28`, `EQ-28A`, and `EQ-29` | Photon, action-quantum, blackbody, recombination/acoustic, atomic, coupling, recoil, path-frequency exchange, and radiation rows must preserve source-event provenance, photon-channel event balance, recoil/remnant rows, and wake/Noether sea exchange rather than assigning $h$, $\alpha$, $c_\gamma$, recombination clocks, frequency shifts, or emitted power independently. |
| `EQ-13`, `EQ-15`, `EQ-16`, `EQ-16A`, and `EQ-27` | Field, spinor, gauge, neutrino, and magnetic-moment rows must retain branch identity, ordered-frame or phase-history data, angular-momentum ledgers, and exposed-sector records back to a causal-root branch instead of importing field labels as substrate ontology. |
| `EQ-14`, `EQ-30`, and `EQ-31` | Probability-current, cross-section, form-factor, width, lifetime, and branching-fraction rows must arise from finite-window branch pushforwards, event outcome partitions, detector kernels, and admissible escape corridors seeded by retained causal-root histories. |

The common failure mode is `equation_map.imported_formula`: a later row matches a standard equation while its causal-root, wake, event, retained-branch, or Noether sea provenance is absent or split. The common success marker is a same-record residual whose root, wake, event, and Noether sea inputs are declared before coefficients are compared.

### Solved Wave Solutions As Inverse-Clue Benchmarks

Solved wave equations are useful to this workstream as inverse clues, not as substrate ontology. A closed-form plane wave, Green function, normal mode, eikonal solution, scattering phase shift, or bound-state spectrum may expose conserved currents, dispersion $\omega(k)$, causal support, mode counting, boundary quantization, phase/group velocity, and kernel structure that a retained Noether braid or Noether sea coarse-graining must reproduce.

The mapping direction is therefore bidirectional but level-disciplined:

1. Native-to-effective: start from active roots, wake ledgers, retained branch charts, event ledgers, Noether sea moments, and finite-window measures; derive the effective equation and then compare its solved families.
2. Effective-to-native: use known solved wave families to infer which native carrier, kernel, invariant, or no-retune witness must exist; do not import the solved field itself as the carrier.

For `EQ-13` through `EQ-15`, solved wave data are especially high value as acceptance tests: Green-function causal support for Maxwell-like rows, mode-counting and dispersion for photon and Planck rows, Schrödinger Gaussian packets and continuity currents for record-flow rows, and Klein-Gordon/Dirac dispersion or spinor phase structure for ordered-frame rows. A solved wave comparison should score only when the solution family is tied back to one source-backed coarse-graining map, retained event/window, or branch carrier. Otherwise it remains another form of `equation_map.imported_formula`.

### Agent Target

Keep this dependency note current as new suffix rows are added. `EQ-01` is already mapped; its continuing job is to police downstream dependency discipline and prevent imported-formula shortcuts.

## EQ-02 And EQ-03: Lorentz Factor, Clock/Ruler Laws, And Oblate Spheroidal Envelope

### Standard Form

The observer-level Lorentz factor is

$$
\gamma_{\star}(\mathbf w)
=
\frac{1}
{\sqrt{1-\lVert\mathbf w\rVert^2/c_{\star}^2}},
$$

with moving-clock and ruler targets

$$
\frac{d\tau}{dt}
=
\frac{1}{\gamma_{\star}},
\qquad
L_{\parallel}
=
\frac{L_0}{\gamma_{\star}},
\qquad
L_{\perp}=L_{\perp,0}.
$$

For the Noether braid envelope,

$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
\to
\frac{1}{\gamma_{\mathrm{eff}}(v)}.
$$

### AAA Mapping

The corpus already has the key map:

- $\mathbf w=\mathbf V_{\mathrm{cm}}-\mathbf u_{\mathrm{sea}}$ is drift through the local Noether sea;
- $c_{\star}$ is channel-declared, often $c_{\mathrm{eff}}$ for dressed clock/ruler comparisons;
- the moving Noether braid must preserve finite-speed causal wake closure;
- a closed return cycle gives the oblate spheroidal envelope target;
- $\gamma_{\mathrm{eff}}$ maps to the shape channel $\xi$, while $\lambda(v,E,n)$ remains the separate scale channel.

The return-cycle scaffold is:

$$
T_{\parallel}
=
\frac{R_{\parallel}}{c_{\mathrm{eff}}-v}
+
\frac{R_{\parallel}}{c_{\mathrm{eff}}+v}
=
\frac{2R_{\parallel}}{c_{\mathrm{eff}}}\gamma_{\mathrm{eff}}^2,
$$

$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\perp}}
=
\frac{2R_{\perp}}{c_{\mathrm{eff}}}\gamma_{\mathrm{eff}},
$$

so $T_{\parallel}=T_{\perp}$ implies

$$
\frac{R_{\parallel}}{R_{\perp}}
=
\frac{1}{\gamma_{\mathrm{eff}}}.
$$

### Closure Status

Score: `4`.

The equation-level map is strong. The missing derivation is branch-level: a retained Noether braid root ledger must generate the same $\gamma_{\star}$ in clock phase, ruler envelope, two-way signal synchronization, and energy-momentum response.

### Closure Burden

For a branch $q$, derive or bound:

$$
R_T^{(q)}(\mathbf w)
=
\frac{T_q(\mathbf w)}{T_0}
-
\gamma_{\star}(\mathbf w),
$$

$$
R_{\xi}^{(q)}(\mathbf w)
=
\frac{R_{\parallel,q}(\mathbf w)}{R_{\perp,q}(\mathbf w)}
-
\frac{1}{\gamma_{\star}(\mathbf w)}.
$$

The pass condition should require both residuals to use the same root ledger, speed convention, branch label, and Noether sea state. The stronger Cartan-style target is a gamma-free moving coframe $e^A_u$ built from causal-root and wake-return data over the drift base, with

$$
e^0_u(\partial_t)=\lambda(u),
\qquad
\frac{e^\parallel_u}{e^\perp_u}=\lambda(u)^{-1}.
$$

Under that target, `EQ-02` and `EQ-03` are not two fits to the Lorentz factor. They are reciprocal readings of one coframe. The comparison $\lambda(u)=\gamma_f(u)$ is allowed only after the coframe has been constructed without using $\gamma_f$ as an input.

### Agent Target

Define the minimum source-backed transport comparison behind $W_{\mathrm{hol}}$ after the scalar support-transport and holonomy-transport residuals have been split. Reciprocal coframe arithmetic, shared retained support, zero torsion, zero phase holonomy, and zero scalar transport residuals remain guardrails, not accepted no-retune evidence.

## EQ-04: Energy-Momentum And Rest Energy

### Standard Form

The observer-level closure is

$$
E_{\mathrm{CM}}^2
=
p_{\mathrm{CM}}^2c_{\mathrm{eff}}^2
+
M_0^2c_{\mathrm{eff}}^4,
\qquad
E_{\mathrm{CM}}
=
\gamma_{\mathrm{eff}}M_0c_{\mathrm{eff}}^2.
$$

The rest-energy branch is

$$
M_0(A)c_{\mathrm{eff}}^2
\approx
\alpha_{\mathrm m}\zeta(A)E_{\mathrm{internal}}(A).
$$

### AAA Mapping

The mass thesis already maps rest energy into:

- closed internal causal-history ledger $E_{\mathrm{internal}}(A)$;
- exposure or shielding coefficient $\zeta(A)$;
- symmetric Noether sea response tensor $\mathcal M_{\mathrm{sea}}^{ab}$;
- homogeneous limit $\mathcal M_{\mathrm{sea}}^{ab}\to h^{ab}/c_{\mathrm{eff}}^2$.

The stronger tensor response is

$$
p_{\mathrm{int}}^a
\approx
\alpha_{\mathrm m}\zeta(A)E_{\mathrm{internal}}(A)
\mathcal M_{\mathrm{sea}}^{ab}V_{\mathrm{cm},b}.
$$

The mass-shell row should be treated as the norm of the same moving coframe used by the clock and envelope rows. In the primitive homogeneous cell, $\mathcal M_{\mathrm{sea}}^{ab}$ is a constitutive response consumed by the coframe and mass-shell readout, not a source allowed to manufacture the Lorentz factor. A regulator-free shell diagnostic is therefore the coframe norm of a unit energy-momentum covector,

$$
\mathcal R_{\mathrm{shell}}^{\mathrm{cof}}
=
\left|
\eta^{AB}\pi_A\pi_B-1
\right|,
$$

with raw and normalized shell defects retained as diagnostics rather than acceptance handles.

### Closure Status

Current `6/23 b` score: `4`.

The conceptual and variable map is strong enough for the second-round score because it now sits inside the shared Lorentz-energy residual program. It remains below `5` because the first branch-derived $E_{\mathrm{internal}}$, $\zeta(A)$, and $\mathcal M_{\mathrm{sea}}^{ab}$ are still active mass-map work.

### Closure Burden

A closure packet must show that the same branch supplies:

- rest/internal invariant $M_0(A)$;
- moving response $\gamma_{\mathrm{eff}}M_0c_{\mathrm{eff}}^2$;
- momentum response $p_{\mathrm{CM}}$;
- clock/ruler $\gamma_{\mathrm{eff}}$;
- no velocity-dependent rest mass.

### Agent Target

Replace the retained-domain scaffold with one source-backed retained support that preserves raw labeled rows on the retained history, then bind the translating-binary and coframe lanes through the same `W_supp` / `W_hol` support and holonomy witnesses. Until `check-same-branch-chart-identity.mjs` and the coframe producer accept that durable support, the mass-shell and Lorentz envelope rows remain score-neutral at `missing_accepted_raw_labeled_rows_preserved_on_retained_history`.

### Shared Branch Identity Reducer Status

[check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs) now extracts the `same_branch_chart_identity` acceptance status for the equal-frequency $S_{\mathrm{eq}}$ row-set audit. The current run reports `blocked_current_proxy_only`: 7/7 current proxy evidence sources and 15/15 structural witnesses point at $S_{\mathrm{eq}}$, but 0/14 retained identity requirements are accepted. Its first reported blocker is `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`.

The same extractor also consumes [same-branch-retained-domain-attempt.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json), a direct retained event/domain packet shape for $S_{\mathrm{eq}}$. That attempt reports `blocked_missing_retained_event_or_domain`, `scoreDecision=no_score_increase`, and 0/14 accepted retained identity requirements because its support and row bindings are marked `attempt`.

The retained-domain summary now reports `retainedRequirementStatuses`, `retainedRequirementReasons`, `domainWitnessStatuses`, `domainWitnessReasons`, and `nextBlocker`; the current direct attempt reports all retained requirements and all split/retune/overlap witnesses as `attempt`, with row and witness reasons remaining `row_not_accepted`, `support_not_accepted`, or `witness_not_accepted`. Accepted-looking rows whose source reference does not resolve to an existing file are rejected with source-not-found reasons instead of being counted as retained evidence.

No score change follows from that result. `EQ-02`, `EQ-03`, and `EQ-04` still need a positive-width invariant cell in truncated delay-state space. The preferred evidence object is a transverse section $\Sigma_N$, first-return map $P_N$, box $B_N\subset\Sigma_N$ with $\mu_{\perp}(B_N)>0$, and Krawczyk or interval Newton inclusion $\mathcal K_{P_N}(B_N)\subset B_N$. Only on that certified support should the packet accept raw row labels, inventory, role map, path history, causal roots, wake tails, energy/action, momentum/angular momentum, phase, plane orientation, response center, group velocity, Noether sea record, and binary-to-binary phase identity on the same branch chart.

[eq02-04-translating-binary-retained-record.mjs](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs) now evaluates the direct retained-record shape for $\Theta_{02\text{-}04}^{\mathrm{bin}}(u)$. The attempt fixture [eq02-04-translating-binary-retained-record-attempt.v1.json](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record-attempt.v1.json) reports `blocked_same_branch_identity`, `scoreDecision=no_score_increase`, and `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`. Its numeric residual diagnostics, gamma-free coframe reciprocity diagnostic, support/holonomy witness diagnostics, and six negative-control diagnostics pass for the illustrative $\beta_f=0.6$ row. The coframe reciprocity diagnostic reports $e^0_u(\partial_t)=1.25$, $e^\parallel_u/e^\perp_u=0.8$, and product $1$, with $\gamma_f$ used only as a comparison output. The separate `coframeExtraction` diagnostic loads [eq02-04-coframe-extraction-attempt.v1.json](../../../scripts/equation-mapping/eq02-04-coframe-extraction-attempt.v1.json) and is `not_evaluated` with `reason=coframe_extraction_evidence_not_accepted`, because the certificate is still attempt-level. This is still not score evidence: every retained-record row and witness is `attempt`, and a single operating point is not invariant-branch evidence. `EQ-02`, `EQ-03`, and `EQ-04` remain at `4` until the support certificate persists under refinement, window-length, transverse-displacement, section-placement, and phase-permutation controls.

The coframe extraction producer now enforces that refinement burden directly. Accepted-looking source reports must show source-bound row bindings on the same `S_eq`, common carrier, domain, and support; a decreasing step/window sequence; increasing memory-depth sequence; bounded support-set stability; bounded scalar-residual convergence; and margin-bearing negative controls including `window_length`. A bare row-binding shell now blocks at `row_binding_raw_labeled_rows_preserved_on_retained_history`, and a populated return-map shell with no refinement path blocks at `refinement_persistence`, so the executable acceptance contract no longer treats one sampled crossing or fitted row bundle as retained-branch evidence.

The same producer also calibrates negative controls against declared evidence scale. Accepted source reports must declare `acceptBand`, `arithmeticNoiseFloor`, `truncationNoiseFloor`, and `negativeMarginFactor > 1`; the accept band must sit above the combined noise floor, and every required negative control must clear `negativeMarginFactor * acceptBand`. A source report with otherwise accepted-looking support, rows, refinement, connection, and residuals but under-margin violated controls now blocks at `negative_control_window_length_margin_calibrated`.

Refinement persistence is also step-backed now. The producer requires `support.refinementPersistence.steps[]` with at least three accepted steps, strictly decreasing `h`, strictly increasing `N`, durable per-step source references, a support id matching the source report support id, and bounded inclusion, support, and scalar residuals at every step. An otherwise accepted-looking source report whose refinement steps have no durable sources now blocks at `refinement_persistence_step_sources`; support-id drift is reported separately as `refinement_persistence_support_id_stability`.

The support-id drift branch now has its own isolated negative control. A source report with valid per-step sources, decreasing `h`, increasing `N`, bounded step residuals, and otherwise accepted-looking evidence blocks exactly at `refinement_persistence_support_id_stability` when its refinement steps bind to a different support id. This keeps refinement persistence attached to the same retained support instead of any accepted-looking neighboring support path.

The provisional connection side now also has one isolated negative control. A source report with source-backed support, row bindings, stable refinement steps, reciprocal coframe legs, zero phase holonomy, and zero transport residuals blocks exactly at `connection_torsion_bound` when `connection.torsionMaxAbs` exceeds tolerance. This is a guardrail for the current producer, not the final $W_{\mathrm{hol}}$ definition; connection transport fields and holonomy-step checks remain deferred until the Cartan transport packet is integrated.

The phase-holonomy side now has the matching isolated negative control. A source report with source-backed support, row bindings, stable refinement steps, reciprocal coframe legs, zero torsion, and zero transport residuals blocks exactly at `connection_phase_holonomy_bound` when `connection.phaseHolonomyT2` exceeds tolerance. This tests only the current producer's phase-holonomy bound; zero transport residuals in the fixture are isolation controls, not accepted Cartan transport evidence. The final role of $\Phi_{T^2}(u)$ and $W_{\mathrm{hol}}$ remains deferred until the Cartan transport packet is integrated.

The gamma-free input boundary now has a source-internal negative control as well. A source report with source-backed support, row bindings, stable refinement steps, reciprocal coframe legs, zero torsion, zero phase holonomy, and zero transport residuals blocks exactly at `extraction_basis_gamma_free` when `gamma_f` is inserted into `extractionBasis`. This separates forbidden Lorentz/mass-shell/fitted inputs from ordinary unknown-basis errors and protects the coframe construction before any $W_{\mathrm{hol}}$ transport semantics are added.

The scalar transport side is now split into support transport and holonomy transport. A source report with source-backed support, row bindings, stable refinement steps, reciprocal coframe legs, zero torsion, zero phase holonomy, and zero support-transport residual blocks exactly at `connection_holonomy_transport_residual_bound` when `connection.holonomyTransportResidual` exceeds tolerance. This prevents a passing support-transport residual from hiding a holonomy mismatch, but it is still only a guardrail for $W_{\mathrm{hol}}$, not a proof that the connection was constructed independently of the fitted target rows.

The retained-domain fiber product is necessary but not sufficient for no-retune. The strengthened reducer should split the witness into $W_{\mathrm{supp}}$, which proves shared support on the accepted invariant cell, and $W_{\mathrm{hol}}$, which proves that all row sections are parallel transports under one connection over the drift base. The first raw-label row should therefore become a flat reference section at $u=0$ plus a recorded transport rule to $u\neq0$, not just a list of preserved labels.

## EQ-04A: Koide Charged-Lepton Mass Relation

Detailed packet: [EQ-04A Koide Charged-Lepton Mass Relation](eq-04a-koide-charged-lepton-mass-relation.md).

### Standard Form

For the charged leptons, the empirical Koide benchmark is usually written as

$$
Q_{\ell}
=
\frac{
m_e+m_\mu+m_\tau
}{
\left(\sqrt{m_e}+\sqrt{m_\mu}+\sqrt{m_\tau}\right)^2
}
\approx
\frac{2}{3},
$$

equivalently

$$
\frac{
\left(\sqrt{m_e}+\sqrt{m_\mu}+\sqrt{m_\tau}\right)^2
}{
m_e+m_\mu+m_\tau
}
\approx
\frac{3}{2}.
$$

The benchmark is sensitive to the mass convention. The first comparison should use the charged-lepton rest/pole-mass triplet unless a future packet explicitly declares a running-mass scheme and scale.

The same relation also has a geometric form: the vector $(\sqrt{m_e},\sqrt{m_\mu},\sqrt{m_\tau})$ makes a $45^\circ$ angle with the democratic axis $(1,1,1)/\sqrt3$. That makes `EQ-04A` a natural mass-root projection benchmark for a generation-by-shielding map, not merely a scalar ratio to fit.

### Mapping

The only conservative carrier is the charged-lepton generation-by-shielding ladder. Let $A_{\ell,g}$, $g=0,1,2$, denote one retained charged-lepton branch family and let

$$
M_{\ell,g}(\theta)
=
\Pi_M
\left[
\mathcal E_{\ell}(A_{\ell,g};\theta),
\mathcal C_{\mathrm{sea}}(\theta)
\right]
$$

be the mass readout predicted by the same exposure, shielding, internal-energy, and Noether sea response rows used by `EQ-04`. Koide then becomes a post-prediction residual:

$$
\mathcal R_{04A}^{\mathrm{Koide}}(\theta)
=
\left|
\frac{
M_{\ell,0}+M_{\ell,1}+M_{\ell,2}
}{
\left(\sqrt{M_{\ell,0}}+\sqrt{M_{\ell,1}}+\sqrt{M_{\ell,2}}\right)^2
}
-
\frac{2}{3}
\right|.
$$

This row must not become a fit target. It is useful only if the same mass map that predicts the charged-lepton hierarchy also produces a small $\mathcal R_{04A}^{\mathrm{Koide}}$ after the masses are fixed by independent rows.

The sharper geometric reading treats $\mathbf R_{\ell}$ as a root/coframe section. Square-root masses are the linear root coordinates and masses are their quadratic norms. With

$$
\mathbf R_{\ell}
=
R_d\hat{\mathbf d}
+\mathbf R_{\mathrm{tr}},
$$

where $\mathbf R_{\mathrm{tr}}$ is the traceless generation-plane component, the Koide angle is the moment-map/equipartition condition

$$
\mathcal J_K
=
\lVert\mathbf R_{\mathrm{tr}}\rVert^2
-
\left|R_d\right|^2
=0.
$$

This is a useful theorem target only after the charged-lepton generation-by-shielding map fixes one transported root section. Until then it is a diagnostic, not a derived invariant.

The first comparison is a frozen-parameter residual, not an invariant claim. If $\hat\theta_M$ is the already-fixed mass-map parameter set and $\Sigma_M$ is the propagated mass-readout uncertainty, the packet should report the induced band for

$$
\cos^2\theta_{\ell}(\hat\theta_M)
=
\frac{
\left(\mathbf R_{\ell}(\hat\theta_M)\cdot\hat{\mathbf d}\right)^2
}{
\lVert\mathbf R_{\ell}(\hat\theta_M)\rVert^2
}.
$$

A hit requires the band to land near $1/2$ while remaining narrow enough that generic nearby mass maps would miss. A miss under the same frozen map is also a useful result. Only after multiple fixed branch-family predictions should this become a family statistic, and only after a generation-map derivation should it be called an invariant.

### Closure Status

Current `6/23 b` score: `1`.

The relation is already recorded in the particle-mass material as a speculative charged-lepton benchmark, but no branch-derived mass map currently predicts the electron, muon, and tau masses before checking the Koide residual. The score is therefore deliberately low.

Executable status: [eq04a-koide-residual.mjs](../../../scripts/equation-mapping/eq04a-koide-residual.mjs) evaluates the score-neutral Koide, angle, and moment-map diagnostics. The attempt fixture [eq04a-koide-residual-attempt.v1.json](../../../scripts/equation-mapping/eq04a-koide-residual-attempt.v1.json) reports `blocked_inherited_carrier`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_raw_labeled_rows_preserved_on_retained_history`; its numeric Koide, angle, uncertainty-band, and moment-map diagnostics are not score evidence because the inherited `EQ-04` mass-shell carrier, charged-lepton mass map, and generation rows remain unaccepted. The accepted-source guard rejects priority packets, authored AAA prose, generated paths, attempts, toys, probes, mocks, negative controls, and temporary paths as evidence for `EQ-04A`; [eq04a-koide-residual-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/eq04a-koide-residual-priority-source-negative-control.v1.json) keeps accepted-looking priority/source-map rows blocked with `carrierReason=accepted_without_evidence_source`. The direct-fit and split-generation controls continue to block at `koide.direct_fit` and `koide.split_generation_map`.

### Closure Burden

A score-review-eligible packet must show:

- one shared charged-lepton branch family $A_{\ell,0}$, $A_{\ell,1}$, $A_{\ell,2}$;
- one exposure, shielding, internal-energy, and Noether sea response map for all three charged leptons;
- declared mass convention and scale;
- propagated uncertainty or interval band for the mass-root angle;
- no direct tuning to $Q_{\ell}=2/3$ or its inverse $3/2$ form;
- compatibility with the `EQ-04` mass-shell response and the broader generation-mass hierarchy;
- quark non-agreement treated as expected strong-sector contamination, not as an automatic failure.

### Agent Target

Build the first `EQ-04A` residual packet by connecting the charged-lepton generation-by-shielding row to the `EQ-04` mass map. The first useful artifact is not a high-precision Koide fit; it is a fail-closed residual that reports whether the same predicted lepton masses land near the Koide surface without hidden retuning.

## EQ-05: Noether Conservation Laws

### Standard Form

Time-translation and spatial symmetries normally yield conserved energy and momentum. In the delay setting the finite-window object must include wake channels:

$$
\mathbf P_{\mathrm{tot}}
=
\sum_i m_i\dot{\mathbf x}_i
+
\mathbf P_{\mathrm{wake}},
$$

$$
E_{\mathrm{tot}}
=
\sum_i \frac{1}{2}m_i\lVert\dot{\mathbf x}_i\rVert^2
+
E_{\mathrm{wake}}.
$$

### AAA Mapping

The corpus already warns that ordinary local Noether energy does not automatically follow from state-dependent delay equations. Conservation claims must state:

- action or regularization convention;
- wake-history term;
- boundary flux;
- event ledger;
- omitted branch residual;
- Noether sea degrees of freedom, if retained.

### Closure Status

Current `6/23 b` score: `4`.

The bookkeeping standard and finite-window residual grammar are now explicit enough for the second-round score. Exact conserved functionals remain conditional on action-level derivation and finite-window residual evaluation.

Executable status: [finite-window-conservation-residual.mjs](../../../scripts/equation-mapping/finite-window-conservation-residual.mjs) now evaluates $\mathcal R_{01-05}^{\mathfrak B}(W)$ as a same-root finite-window conservation packet. The attempt fixture [finite-window-conservation-attempt.v1.json](../../../scripts/equation-mapping/finite-window-conservation-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_branch_chart`, and passing numeric checks for same-root signatures, energy, momentum, angular momentum, event ledger, boundary flux, wake crosswalk, and no-double-count residuals. Those numeric passes are not score evidence because the required branch-chart and conservation rows remain `attempt`.

### Closure Burden

A candidate finite-window residual should have the form

$$
\mathcal R_E
=
\frac{
\left|E(t_f)-E(t_i)-W_{\partial\Omega}-W_{\mathrm{event}}\right|
}{
|E(t_i)|+|E(t_f)|+\varepsilon_E
},
$$

with every term computed from the same branch chart.

### Agent Target

Replace the finite-window conservation attempt with a source-backed retained branch chart, then populate the same-root checksum, event-ledger, boundary-flux, wake-history, and residual rows under `finite-window-conservation-residual.mjs`. Until the checker advances past `missing_accepted_branch_chart` using durable accepted source evidence, the conservation arithmetic remains score-neutral.

## EQ-06: Noether Sea Continuity And Moment Closure

### Standard Form

The canonical Noether sea density row is

$$
\partial_t\rho_{\text{NS}}
+
\nabla\cdot(\rho_{\text{NS}}\mathbf u_{\mathrm{sea}})
=
S_{\rho}
+
r_{\rho}.
$$

For retained moments,

$$
\mathcal R_{\mathrm{mom}}
=
\max_a
\frac{
\left\|
\partial_t M_a[\mathcal N_{\mathrm{sea}}]
+
\nabla\cdot J_a[\mathcal N_{\mathrm{sea}}]
-
S_a[\mathcal N_{\mathrm{sea}}]
\right\|
}{
\left\|\partial_t M_a\right\|
+
\left\|\nabla\cdot J_a\right\|
+
\left\|S_a\right\|
+
\varepsilon
}.
$$

### AAA Mapping

This group is directly Noether sea native. The retained slow state is

$$
\mathcal N_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
\mathbf u_{\mathrm{sea}},
e_{\mathrm{sea}},
\boldsymbol\theta_{\mathrm{sea}},
f_N
\right),
$$

where $\boldsymbol\theta_{\mathrm{sea}}$ packages orientation, delay, cadence, and envelope variables.

### Closure Status

Score: `4`.

The form is canonical, but a derived closure from resolved Noether braid population dynamics is still open.

Executable status: [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs) gives `EQ-06` a checker-emitted first blocker through the density-compression retained-attempt route. The current fixture [noether-sea-density-compression-rho-ns-source-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-rho-ns-source-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_theta_sea_rho_NS`; its acoustic/elastic numeric agreement is attempt-level and does not replace the accepted density/cadence projection or refinement-family proof.

### Closure Burden

The moment residual must decrease under refinement of the retained braid population, causal-wake memory, and coarse-graining window. A fluid-like equation is not accepted merely because it resembles ordinary hydrodynamics.

### Agent Target

Pick one moment family, preferably density and cadence, and derive the minimal braid-population projection that would produce its continuity equation and residual.

## EQ-07 Through EQ-10: Effective Metric, Weak-Field Clocks, PPN Rows, And Geodesic Benchmarks

### Standard Form

The effective ADM/Cartan line element target is

$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$

The weak clock target is

$$
\frac{d\tau}{dt}
\approx
1+\frac{\Phi_N}{c_0^2}
-
\frac{\lVert\mathbf w\rVert^2}{2c_0^2}.
$$

The point-mass lensing target is

$$
\Delta\theta
=
2(1+\gamma_{\mathrm{PPN}})
\frac{GM}{bc_0^2}
+
O(c_0^{-4}).
$$

### AAA Mapping

The Noether sea must supply:

- lapse or clock-rate channel $N$;
- drift field $u^i_{\text{sea}}$;
- frame field $e^a{}_i$;
- spatial compliance $\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j$;
- signal delay $\chi_{\text{sea}}$;
- cadence stretch $\Gamma_N$;
- effective potential $\Phi_{\mathrm{eff}}$.

The weak-field coefficient scaffold already exists:

$$
N
=
1
+
A_N^n\delta n
+
A_N^\chi\delta\chi
+
A_N^\Phi\varphi
+
Q_N(\delta n,\delta\chi,\varphi,\sigma)
+
O(c_0^{-6},\epsilon_{\mathrm{LV}}).
$$

### Closure Status

Current `6/23 b` scores: `4` for effective metric, weak-clock, and PPN rows; `3` for the geodesic row.

The map is equation-level, but coefficient closure and shared-record enforcement remain open.

Executable status: [effective-metric-weak-field-residual.mjs](../../../scripts/equation-mapping/effective-metric-weak-field-residual.mjs) now evaluates the weak-field effective-metric residual for `EQ-07` through `EQ-10`. The attempt fixture [effective-metric-weak-field-attempt.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_theta_W`. Its static-response, shared-delay, weak-clock, Shapiro, lensing, acceleration, PPN, null/eikonal, geodesic-action, source-provenance, hidden-retune, and negative-control diagnostics pass, but those passes are not score evidence because every required weak-field row remains `attempt`. The coordination-source control [effective-metric-weak-field-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-coordination-source-negative-control.v1.json) keeps accepted-looking priority/authored/attempt sources blocked at the same first blocker with `accepted_without_evidence_source`. The [EQ-10 Theta-W Source-Field Map](eq-10-theta-w-source-field-map.md) now carries a Direct Geometry Layer binding the weak-field carrier, Noether sea response, metric projection, observables, PPN row, null/eikonal row, geodesic-action row, source provenance, and no-hidden-retune witness to one `theta_W` record.

### Closure Burden

The metric residual should require one record $\theta_W$:

$$
\theta_W
\longmapsto
\left(
N,u^i_{\mathrm{sea}},e^a{}_i,\gamma_{ij},
\Phi_{\mathrm{eff}},\chi_{\text{sea}}
\right),
$$

with redshift, Shapiro delay, lensing, acceleration, 1PN, and preferred-frame rows all reading from that same record.

### Agent Target

Replace the weak-field attempt with a durable source-backed `theta_W` record, then require `effective-metric-weak-field-residual.mjs` to evaluate Shapiro, lensing, acceleration, PPN, null/eikonal, geodesic-action, source-provenance, and no-hidden-retune rows on that same carrier. Until `theta_W` is accepted from durable source evidence, the effective-metric residual stays score-neutral at `missing_accepted_theta_W`.

## EQ-07A: Compact-Star Support And Collapse Scale Residual

Detailed packet: [EQ-07A Compact-Star Support And Collapse Scale Residual](eq-07a-compact-star-support-collapse-scale-residual.md).

### Standard Form

The compact-star support comparison starts with Fermi-state counting,

$$
p_F\sim\hbar n_e^{1/3},
\qquad
x_F\equiv\frac{p_F}{m_ec_0},
$$

and the pressure-regime split

$$
P_{e,\mathrm{nr}}\propto \rho^{5/3},
\qquad
P_{e,\mathrm{rel}}\propto \rho^{4/3}.
$$

The support boundary carries composition through

$$
M_{\mathrm{Ch}}\propto Y_e^2M_\odot,
$$

while the compact-star GR comparison uses the TOV pressure-gravity row.

### AAA Mapping

`EQ-07A` asks whether one compact-region retained record can join:

- the standard electron Fermi reservoir variables $(n_e,p_F,x_F,Y_e,\mu_e,M,R)$;
- native material scale compression $\lambda_A$ and $\mathcal{S}_{\mathrm{mat}}$;
- pressure/packing projection $P_{\mathrm{pack}}^\theta$;
- neutron-star radial support record $\Theta_{\mathrm{NS}}(r)$;
- reaction inventory rows for electron capture, photodisintegration, neutrino transport, heat, and remnants;
- compact-region ledger $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$;
- and effective metric compliance $\mathcal{S}_{\mathrm{metric}}$.

The row must keep atomic orbital scale, Fermi spacing, and material Noether braid scale separate. A successful map may connect them, but it cannot substitute one for another without a declared bridge calculation.

### Closure Status

Current `6/23 b` score: `2`.

The standard formula families and native carriers are now named in the focused packet, but no accepted compact-region retained carrier or dense-matter equation-of-state bridge exists. No score change for `EQ-07` through `EQ-10` follows from adding this suffix row.

Executable status: [eq07a-compact-region-carrier-residual.mjs](../../../scripts/equation-mapping/eq07a-compact-region-carrier-residual.mjs) evaluates the score-neutral compact-region carrier. The attempt fixture [eq07a-compact-region-carrier-attempt.v1.json](../../../scripts/equation-mapping/eq07a-compact-region-carrier-attempt.v1.json) reports `blocked_missing_accepted_compact_region_carrier`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_compact_region_carrier`; its variable dictionary, Fermi state-counting, pressure-regime, composition, support, reaction-ledger, compact-region ledger, scale-metric, neutron-star radial-support, source-provenance, hidden-retune, level-separation, and negative-control diagnostics pass, but those passes are not score evidence because the compact-region carrier and every row binding remain `attempt`. The checker rejects coordination packets, authored/generated/temp paths, attempts, toys, probes, source-evidence probes, mocks, and negative controls as accepted evidence sources; the coordination-source control and a transient probe-source mutation both remain fail-closed at `accepted_without_evidence_source`. The compact-region carrier now also requires row-specific source-support metadata naming `EQ-07A`, `compact_region_carrier`, and a same-root finite-window, compact-region conservation, or collapse-to-metric support route. The metadata-missing negative control remains blocked at `missing_accepted_compact_region_carrier` with `carrierReason=compact_region_carrier_source_contract_mismatch`. The source-evidence probe advances only the parent carrier and exposes `missing_accepted_standard_benchmark_row`, still with `scoreDecision=no_score_increase` and nonzero `--require-populated`.

Executable Chandrasekhar status: [eq07a-chandrasekhar-scaling-residual.mjs](../../../scripts/equation-mapping/eq07a-chandrasekhar-scaling-residual.mjs) evaluates a solver-style scaling residual for the same compact-region carrier. The attempt fixture [eq07a-chandrasekhar-scaling-attempt.v1.json](../../../scripts/equation-mapping/eq07a-chandrasekhar-scaling-attempt.v1.json) reports `blocked_missing_accepted_compact_region_carrier`, `scoreDecision=no_score_increase`, `nextBlocker=missing_accepted_compact_region_carrier`, `solverResidualPass=true`, `solverDiagnosticBlocker=null`, and `solverDiagnosticMaskedByRetainedEvidence=false`; its Fermi state-counting, fixed-coefficient nonrelativistic and relativistic pressure scaling, nonrelativistic mass-radius scaling, composition scaling, source-provenance, hidden-retune, level-separation, and four negative-control diagnostics pass. Those passes are solver diagnostics on an attempt fixture, not accepted retained evidence.

Executable TOV status: [eq07a-tov-compact-support-residual.mjs](../../../scripts/equation-mapping/eq07a-tov-compact-support-residual.mjs) evaluates a solver-style compact-support residual for the same compact-region carrier. The attempt fixture [eq07a-tov-compact-support-attempt.v1.json](../../../scripts/equation-mapping/eq07a-tov-compact-support-attempt.v1.json) reports `blocked_missing_accepted_compact_region_carrier`, `scoreDecision=no_score_increase`, `nextBlocker=missing_accepted_compact_region_carrier`, `solverResidualPass=true`, `solverDiagnosticBlocker=null`, and `solverDiagnosticMaskedByRetainedEvidence=false`; its TOV pressure-gradient, mass-continuity, EOS-projection, radial-support, metric-compactness, compact-ledger, source-provenance, hidden-retune, and four negative-control diagnostics pass. Those passes are solver diagnostics on an attempt fixture, not accepted retained evidence.

### Closure Burden

The first residual is

$$
\mathcal{R}_{07A}^{\mathrm{cs}}(\theta;\Omega,W)
=
\mathcal R_{\mathrm{Fermi}}
+\lambda_P\mathcal R_{\mathrm{support}}
+\lambda_Y\mathcal R_{\mathrm{rxn}}
+\lambda_E\mathcal R_{E\mathbf p\mathbf J}^{(\Omega)}
+\lambda_{\mathrm{scale}}\mathcal R_{\mathrm{collapse}\to\mathrm{metric}}
+\lambda_{\mathrm{NS}}\mathcal R_{\mathrm{NS}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

The first blocker is `missing_accepted_compact_region_carrier`: one source-backed $\Theta_{\mathrm{cs}}^{07A}(\Omega,W)$ must declare the standard variables, native scale/compliance rows, reaction inventory, and compact-region ledger before any stronger score or reader-facing promotion is justified.

### Agent Target

Populate the `EQ-07A` compact-region carrier behind the Chandrasekhar and TOV solver residuals. The next useful artifact is a source-backed carrier row that keeps dense-matter pressure, radial support, reaction inventory, and metric compliance on one retained record.

## EQ-07C: Black-Hole Horizon-Interface Noether Braid Map

Detailed packet: [EQ-07C Black-Hole Horizon-Interface Noether Braid Map](eq-07c-black-hole-horizon-interface-noether-braid-map.md).

### Standard Form

The black-hole-proper comparison starts with exterior mass, radius, surface-area, and spin benchmarks:

$$
r_s=\frac{2GM}{c_0^2},
\qquad
\chi_J=\frac{c_0|\mathbf J|}{GM^2},
\qquad
r_+=\frac{GM}{c_0^2}\left(1+\sqrt{1-\chi_J^2}\right),
$$

$$
A_H
=
\frac{8\pi G^2M^2}{c_0^4}
\left(1+\sqrt{1-\chi_J^2}\right),
\qquad
S_{\mathrm{BH}}^{\mathrm{std}}
=
\frac{k_B c_0^3 A_H}{4G\hbar}.
$$

These are observer-level recovery targets, not substrate ontology.

### AAA Mapping

`EQ-07C` asks whether one black-hole horizon-interface carrier can join:

- exterior compact-source labels $(M,\mathbf J,Q_{\mathrm{eff}})$;
- horizon radius $r_H$, area $A_H$, surface gravity $\kappa_H$, and entropy-area comparison rows;
- native horizon-interface condition $F_H=0$;
- terminal-alignment rows for the braid symmetry-breaking point at the horizon-interface candidate;
- light-ring / null-orbit rows, kept distinct from $r_H$ unless the same carrier derives a spin/branch coincidence condition;
- planar-photon recovery rows when photon-path or light-ring evidence is used;
- finite interior continuation $\mathcal{R}_H(\Omega,W)<\infty$;
- horizon-interface label ensemble $\mathcal{B}_H(M,\mathbf J,Q_{\mathrm{eff}})$;
- compact-region event ledger $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$;
- and no-hidden-retune witness across exterior, horizon, interior, entropy, and remnant/ringdown rows.

The packet explicitly separates black-hole-proper equations from accretion-disk, wind, jet, and feedback physics. Those release-channel rows may supply boundary data through `EQ-07B`, but they cannot replace the horizon/interior carrier.

### Closure Status

Current score: unscored; not integrated into the main score table.

The first blocker is `missing_accepted_black_hole_horizon_interface_carrier`: one source-backed carrier must bind mass, spin, radius, surface area, $F_H$, terminal alignment, light-ring/null-orbit separation or derived coincidence, planar-photon recovery when used, finite interior continuation, horizon labels, event ledger, and no-retune rows before any score review or reader-facing promotion.

No checker exists yet. The next useful artifact is a score-neutral identity shell only after the carrier contract in the detailed packet is stable.

## EQ-11: Einstein And Poisson Limits

### Standard Form

Weak gravity comparison:

$$
\nabla^2\Phi_N
=
4\pi G\rho.
$$

Einstein equation comparison:

$$
G_{\mu\nu}
+
\Lambda g_{\mu\nu}
=
\frac{8\pi G}{c_0^4}T_{\mu\nu}.
$$

### AAA Mapping

These are not substrate laws in AAA. They are observer-level recovery targets. The substrate remains absolute time plus Euclidean void; the Noether sea supplies the effective metric and stress response.

### Closure Status

Current `6/23 b` score: `3`.

The recovery burden is much larger than the weak-field clock and PPN rows. Current material has the shared constitutive interface, not a full Einstein-equation analogue.

Executable status: [eq11-weak-gravity-constitutive-residual.mjs](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs) now evaluates the `EQ-11` Poisson/curvature/effective-coupling route. The attempt fixture [eq11-weak-gravity-constitutive-attempt.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_theta_11_20`. Its Poisson, curvature, effective-coupling continuity, PPN-handoff, source-provenance, hidden-retune, and negative-control diagnostics pass, but those passes are not score evidence because every retained weak-gravity row remains `attempt`. The coordination-source control [eq11-weak-gravity-constitutive-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-coordination-source-negative-control.v1.json) and source-contract control [eq11-weak-gravity-constitutive-theta-11-20-source-contract-negative-control.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-source-contract-negative-control.v1.json) keep accepted-looking priority/authored/attempt or source-contract rows blocked at the same first blocker with `accepted_without_evidence_source`.

### Closure Burden

The minimum useful step is a constitutive identity:

$$
\left(
\rho_{\text{NS}},
e_{\mathrm{sea}},
\Sigma_{\mathrm{sea}},
\Gamma_N,
\chi_{\text{sea}},
\boldsymbol\theta_{\mathrm{sea}}
\right)
\longmapsto
\left(
\Phi_{\mathrm{eff}},
G_{\mathrm{eff}},
T_{\mu\nu}^{\mathrm{eff}},
g_{\mu\nu}^{\mathrm{eff}}
\right),
$$

with no separate tuning between Newtonian acceleration, lensing, clock, and cosmology rows.

### Agent Target

Do not attempt full GR closure first. Replace the weak-gravity attempt with a durable source-backed `theta_11_20` constitutive-response bundle, then require `eq11-weak-gravity-constitutive-residual.mjs` to keep Poisson, curvature, effective-coupling, PPN-handoff, source-provenance, and no-hidden-retune rows on one window. Until that bundle is accepted from durable source evidence, the Poisson-limit handoff remains score-neutral at `missing_accepted_theta_11_20`.

## EQ-11A: Gravitational-Wave Source Recovery

Detailed packet: [EQ-11A Gravitational-Wave Source Recovery](eq-11a-gravitational-wave-source-recovery.md).

### Standard Form

The gravitational-wave source benchmark begins with the chirp mass

$$
\mathcal M_c
=
\frac{(m_1m_2)^{3/5}}{(m_1+m_2)^{1/5}},
$$

the leading chirp-rate relation

$$
\dot f_{\mathrm{GW}}
=
\frac{96}{5}\pi^{8/3}
\left(\frac{G_{\mathrm{eff}}\mathcal M_c}{c_{\mathrm{GW}}^3}\right)^{5/3}
f_{\mathrm{GW}}^{11/3},
$$

and circular Peters-Mathews orbital decay

$$
\dot a
=
-\frac{64}{5}
\frac{G_{\mathrm{eff}}^3m_1m_2(m_1+m_2)}
{c_{\mathrm{GW}}^5a^3}.
$$

The source power and detector strain-flux comparisons are

$$
P_{\mathrm{GW}}
=
\frac{G_{\mathrm{eff}}}{5c_{\mathrm{GW}}^5}
\left\langle
\dddot Q_{ij}\dddot Q^{ij}
\right\rangle,
$$

and

$$
\mathcal F_{\mathrm{GW}}
=
\frac{c_{\mathrm{GW}}^3}{32\pi G_{\mathrm{eff}}}
\left\langle
\dot h_+^2+\dot h_\times^2
\right\rangle.
$$

Ringdown remains a final compact-object label comparison tied to the remnant mass, frequency, and damping-time rows.

### AAA Mapping

`EQ-11A` treats these equations as observer-level recovery targets for one source carrier:

$$
\Theta_{\mathrm{GWsrc}}
=
\left(
\theta_{\mathrm{sea}},
g_{\mu\nu}^{\mathrm{eff}},
Q_{ij}^{\mathrm{eff}},
h_+,
h_\times,
E_{\mathrm{rad}},
\mathbf J_{\mathrm{rad}},
\mathcal M_c,
\dot P_b,
\theta_{\mathrm{ring}},
\mathcal R_{\mathrm{GWsrc}}
\right).
$$

The source quadrupole, inspiral chirp, orbital decay, strain flux, radiated energy/angular momentum, and final ringdown label must share one effective metric tensor channel, Noether sea constitutive record, and source event ledger. A match fails if those rows are fit by separate records.

### Closure Status

Current `6/23 b` score: `2`.

The standard formula families and native carriers are now named in the focused packet, but no accepted gravitational-wave source carrier, source-backed effective metric tensor row, or final remnant/ringdown retained label exists. No score change for `EQ-11` or adjacent metric rows follows from adding this suffix row.

Executable status: [eq11a-gravitational-wave-source-residual.mjs](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs) evaluates the score-neutral gravitational-wave source residual. The attempt fixture [eq11a-gravitational-wave-source-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-attempt.v1.json) reports `blocked_missing_accepted_gw_source_carrier`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_gw_source_carrier`; its chirp-mass, chirp-rate, Peters-decay, quadrupole-flux, strain-flux, ringdown, energy/angular-momentum ledger, source-provenance, hidden-retune, and negative-control diagnostics pass, but those passes are not score evidence because the source carrier and every row binding remain `attempt`. The source-evidence probe [eq11a-gravitational-wave-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-evidence-probe.v1.json) marks only the top carrier and `gw_source_carrier` accepted-looking; it remains score-neutral; its diagnostic child blocker is `missing_accepted_theta_sea`. The `theta_sea` source-contract attempt [eq11a-gravitational-wave-source-theta-sea-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-source-contract-attempt.v1.json) marks only the top carrier, `gw_source_carrier`, and `theta_sea` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_effective_metric_tensor_channel`. The tensor-channel source-contract attempt [eq11a-gravitational-wave-source-effective-metric-tensor-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-source-contract-attempt.v1.json) marks only the top carrier, `gw_source_carrier`, `theta_sea`, and `effective_metric_tensor_channel` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_source_event_ledger`. The source-event-ledger source-contract attempt [eq11a-gravitational-wave-source-event-ledger-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-event-ledger-source-contract-attempt.v1.json) marks only the top carrier, `gw_source_carrier`, `theta_sea`, `effective_metric_tensor_channel`, and `source_event_ledger` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_quadrupole_source_row`. The quadrupole-source-row source-contract attempt [eq11a-gravitational-wave-source-quadrupole-source-row-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-quadrupole-source-row-source-contract-attempt.v1.json) marks only those rows plus `quadrupole_source_row` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_chirp_mass_row`. The chirp-mass-row source-contract attempt [eq11a-gravitational-wave-source-chirp-mass-row-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-chirp-mass-row-source-contract-attempt.v1.json) marks only those rows plus `chirp_mass_row` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_peters_decay_row`. The Peters-decay-row source-contract attempt [eq11a-gravitational-wave-source-peters-decay-row-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-peters-decay-row-source-contract-attempt.v1.json) marks only those rows plus `peters_decay_row` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_strain_flux_row`. The strain-flux-row source-contract attempt [eq11a-gravitational-wave-source-strain-flux-row-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-strain-flux-row-source-contract-attempt.v1.json) marks only those rows plus `strain_flux_row` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_ringdown_label_row`. The ringdown-label-row source-contract attempt [eq11a-gravitational-wave-source-ringdown-label-row-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-ringdown-label-row-source-contract-attempt.v1.json) marks only those rows plus `ringdown_label_row` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_detector_strain_record`. The detector-strain-record source-contract attempt [eq11a-gravitational-wave-source-detector-strain-record-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-detector-strain-record-source-contract-attempt.v1.json) marks only those rows plus `detector_strain_record` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_source_provenance`. The source-provenance source-contract attempt [eq11a-gravitational-wave-source-source-provenance-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-source-provenance-source-contract-attempt.v1.json) marks only those rows plus `source_provenance` accepted-looking with row-specific source metadata; it remains score-neutral; its diagnostic child blocker is `missing_accepted_no_hidden_retune_witness`. The no-hidden-retune-witness source-contract attempt [eq11a-gravitational-wave-source-no-hidden-retune-witness-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-no-hidden-retune-witness-source-contract-attempt.v1.json) marks every required row accepted-looking with row-specific source metadata; it remains score-neutral and fails closed at `status=blocked_source_contract_boundary`, `nextBlocker=source_contract_boundary_not_retained_evidence`. The retained-evidence-object contract control [eq11a-gravitational-wave-source-retained-evidence-object-contract-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-retained-evidence-object-contract-negative-control.v1.json) marks every required row accepted-looking against [eq11a-gravitational-wave-source-retained-evidence-object-contract.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-retained-evidence-object-contract.v1.json); it remains score-neutral and fails closed at `status=blocked_source_contract_boundary`, `nextBlocker=source_contract_boundary_not_retained_evidence`. The artifact-hash negative control [eq11a-gravitational-wave-source-artifact-hash-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-artifact-hash-missing-negative-control.v1.json) marks every required row accepted-looking against a durable GWOSC/LVK source-mining summary but supplies no retained artifact hashes; it remains score-neutral and fails closed at `status=blocked_source_artifact_hashes_missing`, `nextBlocker=source_artifact_hashes_missing`. The artifact-path negative control [eq11a-gravitational-wave-source-artifact-path-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-artifact-path-missing-negative-control.v1.json) supplies artifact-family hash labels without accepted local artifact paths and fails closed at the same blocker. The checker reports `sourceContractBoundaryRows` and `sourceArtifactHashMissingRows`, blocks all source-contract or retained-evidence-contract shells at `status=blocked_source_contract_boundary`, and blocks non-contract source summaries without retained local artifact paths and hashes at `status=blocked_source_artifact_hashes_missing`, so neither boundary contracts nor document-level summaries can by themselves produce `status=populated`. The source guard rejects priority packets, authored AAA prose, generated paths, attempts, toys, probes, source-evidence probes, mocks, negative controls, and temporary paths as accepted evidence for $\Theta_{\mathrm{GWsrc}}(W,P)$; [eq11a-gravitational-wave-source-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-probe-source-negative-control.v1.json) keeps an accepted-looking parent carrier blocked at `missing_accepted_gw_source_carrier` with `carrierReason=accepted_without_evidence_source`. The `theta_sea` content-source control [eq11a-gravitational-wave-source-theta-sea-content-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-content-source-negative-control.v1.json) keeps an accepted-looking `theta_sea` row sourced only to authored Noether sea prose blocked at `missing_accepted_theta_sea` with `rowStatuses.theta_sea.reason=accepted_without_evidence_source`; [eq11a-gravitational-wave-source-theta-sea-generic-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-generic-source-negative-control.v1.json) keeps a row-mismatched durable source contract blocked with `rowStatuses.theta_sea.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-effective-metric-tensor-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-row-mismatch-negative-control.v1.json) keeps a row-mismatched tensor source contract blocked with `rowStatuses.effective_metric_tensor_channel.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-event-ledger-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-event-ledger-row-mismatch-negative-control.v1.json) keeps a row-mismatched source-event ledger blocked with `rowStatuses.source_event_ledger.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-quadrupole-source-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-quadrupole-source-row-mismatch-negative-control.v1.json) keeps a row-mismatched quadrupole source row blocked with `rowStatuses.quadrupole_source_row.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-chirp-mass-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-chirp-mass-row-mismatch-negative-control.v1.json) keeps a row-mismatched chirp-mass row blocked with `rowStatuses.chirp_mass_row.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-peters-decay-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-peters-decay-row-mismatch-negative-control.v1.json) keeps a row-mismatched Peters-decay row blocked with `rowStatuses.peters_decay_row.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-strain-flux-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-strain-flux-row-mismatch-negative-control.v1.json) keeps a row-mismatched strain-flux row blocked with `rowStatuses.strain_flux_row.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-ringdown-label-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-ringdown-label-row-mismatch-negative-control.v1.json) keeps a row-mismatched ringdown-label row blocked with `rowStatuses.ringdown_label_row.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-detector-strain-record-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-detector-strain-record-mismatch-negative-control.v1.json) keeps a row-mismatched detector-strain row blocked with `rowStatuses.detector_strain_record.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-source-provenance-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-source-provenance-mismatch-negative-control.v1.json) keeps a row-mismatched source-provenance row blocked with `rowStatuses.source_provenance.reason=source_contract_row_mismatch`; [eq11a-gravitational-wave-source-no-hidden-retune-witness-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-no-hidden-retune-witness-mismatch-negative-control.v1.json) keeps a row-mismatched no-hidden-retune witness blocked with `rowStatuses.no_hidden_retune_witness.reason=source_contract_row_mismatch`.

The concrete source-window packet [EQ-11A GW150914 Source-Field Map](eq-11a-gw150914-source-field-map.md) now carries the Direct Geometry Layer for `GW150914-v3`, including required rows, same-record bindings, fail-closed controls, the artifact path/hash intake template, and the smallest accepted evidence object.

### Closure Burden

The first residual is

$$
\mathcal R_{11A}^{\mathrm{GWsrc}}
=
\mathcal R_{\mathcal M_c}
+\lambda_f\mathcal R_{\dot f}
+\lambda_P\mathcal R_{\mathrm{Peters}}
+\lambda_Q\mathcal R_Q
+\lambda_h\mathcal R_h
+\lambda_E\mathcal R_{E\mathbf J}
+\lambda_{\mathrm{ring}}\mathcal R_{\mathrm{ring}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

The first blocker is `missing_accepted_gw_source_carrier`: one source-backed $\Theta_{\mathrm{GWsrc}}(W,P)$ must declare source quadrupole, chirp, orbital decay, detector strain, radiated energy/angular momentum, final remnant labels, and the shared effective-metric/Noether-sea record before any stronger score or reader-facing promotion is justified.

### Agent Target

Populate the `EQ-11A` gravitational-wave source carrier behind the solver residual. The next useful precursor is the GW150914 retained-evidence intake template filled with local event, strain, parameter-estimation, waveform, calibration, extraction, path, and hash artifacts. The next accepted-retained-evidence artifact after that is a source-backed carrier row that keeps quadrupole power, inspiral chirp, orbital decay, detector strain, radiated energy/angular momentum, and ringdown labels on one retained record.

## EQ-12 And EQ-13: Photon Energy, Null Transport, Maxwell, And Wave Equations

### Standard Form

Photon energy:

$$
E=h\nu.
$$

Null transport:

$$
g^{\mathrm{eff}}_{\mu\nu}dx^\mu dx^\nu=0.
$$

Maxwell-style comparison:

$$
\Box A_{\mu}
=
J_{\mu}
$$

in a declared gauge and weak effective field limit.

### AAA Mapping

The photon-channel packet is not a primitive field quantum. It should be mapped as a retained assembly or packet branch whose frequency, helicity, energy, and path history are read by source, path, and receiver records.

The null condition belongs to the observer-level effective metric. The wave equation belongs to a continuum field summary of many causal wakes and photon-channel packets.

Solved wave-equation families are admissible here as inverse clues and acceptance tests. A Green function, plane-wave dispersion row, eikonal family, cavity or boundary mode, or scattering solution can constrain the required Noether sea response kernel, photon-channel packet ledger, source-event provenance, and gauge residual. It cannot replace those rows; the solved field is an effective comparison object unless the coarse-graining map from causal wakes and photon packets is declared.

Malus-law analyzer intensity $I(\theta)=I_0\cos^2\theta$ belongs here as a Gate B polarization/analyzer benchmark, not as a standalone score row. A future source-backed photon packet must bind analyzer basis, incoming polarization ledger, transmitted-intensity readout, and longitudinal-leakage residual to the same $\Theta_\gamma$ carrier; otherwise it remains an imported polarization formula.

### Closure Status

Current `6/23 b` scores: `3` for photon energy/null transport and `3` for Maxwell and wave equations.

Executable status: [photon-packet-transfer-residual.mjs](../../../scripts/equation-mapping/photon-packet-transfer-residual.mjs) now evaluates the direct `EQ-12` photon packet-transfer residual. Its attempt fixture [photon-packet-transfer-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-attempt.v1.json) reports `status: blocked_missing_rows`, `nextBlocker: missing_accepted_theta_gamma_packet`, `packetNumericPass: true`, and `negativeControlPassCount: 4`; no score change follows because the photon packet rows remain attempt-level. [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md) carries the Direct Geometry Layer and source-guard route for the photon packet; priority/source-map prose, attempts, probes, and other non-evidence sources remain rejected, and the first accepted evidence object is still a source-backed $\Theta_\gamma$ carrier. [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs) also reports an `EQ-13` effective EM gate projection on the same $\mathsf e_{\gamma e}^{0}$ carrier used by `EQ-12`, `EQ-26`, `EQ-28`, and `EQ-29`; that gate still blocks at `missing_accepted_photon_gate_A_input_output`. The [EQ-13 And EQ-28 e_gamma_e_0 Gate A Source-Field Map](eq-13-28-e-gamma-e0-gate-a-source-field-map.md) now carries a Direct Geometry Layer binding Gate A, native event rows, effective EM gate rows, recoil rows, shared constants, and source-channel boundaries to the same event carrier.

### Closure Burden

A photon packet closure should carry:

- emission ledger;
- packet branch;
- path-history propagation through $\chi_{\text{sea}}$;
- frequency transfer;
- recoil and remnant energy rows;
- receiver coupling;
- null/eikonal path comparison.

### Agent Target

Take one photon-channel formula, preferably $E=h\nu$ inside the redshift budget, and write the full event ledger that turns it from a local receiver readout into a path-history transfer equation.

## EQ-12A: Planck Action Quantum, de Broglie Relations, And Braid Action Scale

### Standard Form

The Planck-action benchmark is the shared action and phase unit behind photon, matter-wave, and angular-momentum readouts:

$$
E=h\nu=\hbar\omega,
\qquad
\mathbf p=\hbar\mathbf k,
\qquad
\lambda=\frac{h}{p},
$$

with closed-cycle action and angular-momentum quantization summarized by

$$
\oint p\,dq=nh,
\qquad
J=n\hbar.
$$

### AAA Mapping

This row owns the action quantum itself. `EQ-12` may use $h\nu$ as a photon packet readout, but `EQ-12A` asks whether $h$ and $\hbar$ can be recovered as projections of one geometry-derived retained action period. The target is no longer an abstract integrality claim on the raw delay-history space. The first executable target is now a constant-delay retained orbit with a Poincare-map and monodromy certificate, not a state-dependent delay Hessian problem. After the action-period review, that scalar target is explicitly a scaffold and falsifier: a Hopf-born scalar orbit can have a rigid frequency but a continuously rescalable action area, so it cannot by itself source a physical unit.

$$
\Theta_h
=
\left(
\mathcal H_\tau,
\Phi_T,
\Sigma,
\mathcal U,
\mathfrak B_{\mathrm{cyc}},
\gamma_0,
\vartheta_{\mathrm{PC}},
\mathcal L_{\mathrm{root}},
\mathcal L_{E\mathbf p\mathbf J},
P_\gamma,
\mathcal T_\gamma
\right).
$$

Here $\mathcal H_\tau=C^1([-\tau,0])$ is the constant-delay history space with compatibility conditions, $\Phi_T$ is the period-$T$ flow, $\Sigma$ is a Poincare section, $\mathcal U=D\Phi_T$ is the monodromy operator, $\gamma_0$ is the retained periodic orbit, and $\vartheta_{\mathrm{PC}}$ is the local Poincare-Cartan one-form pulled back to that orbit. $\mathcal T_\gamma$ is the photon-channel transversality data used by the blackbody and photon rows.

The first toy model should be constant-delay, nonlinear, and orbit-isolating:

$$
\ddot x(t)
=
-\omega^2x(t)
+
g\,x(t-\tau)
-
\gamma\dot x(t)
+
\mu x(t)\left(1-x(t)^2\right).
$$

The state-dependent delay $\tau(x)=\tau_0+\beta x$ is deferred until the constant-delay orbit is hyperbolic-modulo-time-shift; then $\beta$ can be introduced as a persistence/continuation parameter. The reason is structural: state-dependent delay is not $C^1$ on the standard continuous history space and threatens the differentiability needed by a Hessian-based first model.

The scalar continuation falsifier is now part of the claim discipline. Near Hopf birth,

$$
T
=
\frac{2\pi}{\Omega_c}
+O(|\eta-\eta_c|),
\qquad
A^2
\propto
\frac{\eta-\eta_c}{-\ell_1},
$$

so the phase-area proxy behaves as

$$
h_\Phi
=
\oint p\,dq
\sim
\pi \Omega_c A^2.
$$

If $h_\Phi$ varies smoothly under continuation while the frequency stays near $\Omega_c$, then the scalar retained orbit is disqualified as an action-unit source. That negative result would be useful: it would show why the physical $h_\vartheta$ target needs tri-binary locking, integer winding, or an exact Noether-charge row rather than a soft scalar amplitude.

For the causal-delay self-hit model, the primary finite-dimensional object is the Poincare return map and its monodromy spectrum. A variational advanced-plus-causal-delay replacement may later support a global Hessian or presymplectic row, but the first causal solver target should not require that structure. The action unit is the Poincare-Cartan orbit integral on the certified retained orbit:

$$
h_\vartheta
=
\oint_{\gamma_0}\vartheta_{\mathrm{PC}}
=
\int_0^T p(t)\dot q(t)\,dt,
\qquad
\hbar_\vartheta=\frac{h_\vartheta}{2\pi}.
$$

The theorem target should be stated as a Retained-Orbit Birth and Action-Readout Lemma. A weak first version says: if the constant-delay equation has a simple Hopf crossing for

$$
\Delta(\lambda)
=
\lambda^2+\gamma\lambda+\omega^2-g e^{-\lambda\tau}=0,
$$

all other roots are stable, the crossing is transverse, the first Lyapunov coefficient $\ell_1$ is nonzero, and the monodromy certificate has exactly one unit Floquet multiplier with the rest bounded inside the unit disk,

$$
\mathrm{spec}(\mathcal U)
=
\{1\}\cup\{\mu_k\},
\qquad
|\mu_k|\le\rho<1,
\qquad
1-\rho\ge\delta_{\mathrm{gap}},
$$

then $\gamma_0$ is isolated and hyperbolic modulo time shift, the local Poincare-Cartan integral $h_\vartheta=\oint_{\gamma_0}\vartheta_{\mathrm{PC}}$ is meaningful on the retained orbit, and readout independence can be tested by refinement. This is not yet a derivation of a physical unit; it is the obstruction test for whether a retained orbit area is merely scalable. Integrality remains a retained-orbit selection condition, not a theorem on raw history space.

The useful residual is therefore not a stack of independently inserted $h$ comparisons. It is a retained-orbit and readout residual:

$$
\mathcal R_h^\vartheta(\Theta_h)
=
\left(
\mathcal R_{\mathrm{red}},
\mathcal R_{\mathrm{Hopf}},
\mathcal R_{\ell_1},
\mathcal R_{\mathrm{Floquet}},
\frac{E_\gamma-h_\vartheta\nu}{E_\gamma+\varepsilon_E},
\frac{\|\mathbf p_\gamma-\hbar_\vartheta\mathbf k\|}{\|\mathbf p_\gamma\|+\varepsilon_p},
\frac{\left|\oint_\gamma\vartheta-nh_\vartheta\right|}{\left|\oint_\gamma\vartheta\right|+\varepsilon_I},
\frac{|J-n\hbar_\vartheta|}{|J|+\varepsilon_J},
\max_{a,b}
\frac{|h_a-h_b|}{|h_\vartheta|+\varepsilon_h},
\mathcal R_{\mathrm{ref}},
\left|\frac{\partial h_\vartheta}{\partial g}\right|_{\mathrm{fam}},
\mathcal H_{\mathrm{hist}},
\mathcal N_{\mathrm{res}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Here $\mathcal R_{\mathrm{red}}$ carries the finite-dimensional Poincare/monodromy reduction and fibration-constancy residuals; $\mathcal R_{\mathrm{Hopf}}$ carries the simple-crossing, transversality, and stable-root checks; $\mathcal R_{\ell_1}$ rejects the degenerate Bautin case $\ell_1=0$; $\mathcal R_{\mathrm{Floquet}}$ rejects extra near-unit multipliers; and $\mathcal R_{\mathrm{ref}}$ checks collocation refinement, Poincare-section relocation, and retained-mode stability. The $h_a$ are the action periods extracted from the energy-clock, phase-loop, momentum, and angular-momentum readouts. Readout independence is not automatic; it is accepted only when $h_E=E_\gamma/\nu$ and $h_\Phi=\oint_{\gamma_0}p\,dq$ converge to the same value under refinement and section relocation. The non-resonance certificate $\mathcal N_{\mathrm{res}}$ should bound the relevant small divisors:

$$
\mathcal N_{\mathrm{res}}
=
\frac{\max(0,\delta_{\min}-\min_k |\Delta_k|)}
{\delta_{\min}+\varepsilon_\delta}.
$$

The history-balance term is secondary to the monodromy certificate. For the constant-delay model it should measure return of the history-energy functional over one retained period; for the causal dissipative model it measures stable self-hit energy throughput rather than exact closure:

$$
\frac{d}{dt}
\left(
E_{\mathrm{inst}}
+
\int_{-\tau}^{0}\mathcal P(t,\sigma)\dot q(t+\sigma)\,d\sigma
\right)
+
\nabla\cdot\mathbf\Phi_{\mathrm{flux}}
=0.
$$

The corresponding residual over a retained period is:

$$
\mathcal H_{\mathrm{hist}}
=
\frac{
\left|
\Delta\int_{-\tau}^{0}\mathcal P(t,\sigma)\dot q(t+\sigma)\,d\sigma
+
\Delta\Phi_{\mathrm{flux}}
\right|
}
{|h_\vartheta|+\varepsilon_h}.
$$

This is also the natural home for the $h$ unit of angular momentum: equal action per retained cycle must be reconciled with the tri-binary phase and angular-momentum ledger before $h$ is treated as more than a measured conversion constant. The open burden is no longer "prove integrality in raw history space" or "force a Hessian onto a causal self-hit equation." It is now split in two: first, run the scalar constant-delay continuation to test whether the apparent action period is only a tunable orbit area; second, seek the positive action-unit source in a mode-locked equal-frequency tri-binary branch whose integer winding and middle-binary speed pinning protect the common action unit.

The positive theorem target is therefore a Mode-Locked Tri-Binary Action-Unit Lemma. A weak first version says: if the retained equal-frequency row set has

$$
(f_1,f_2,f_3)=(f,f,f),
\qquad
\omega_1=\omega_2=\omega_3=\omega_f,
$$

fixed retained phase offsets, a middle-binary speed-pinning row

$$
s_M=\rho_M\omega_f=c_f,
$$

an angular-momentum momentum-map row

$$
J=\sum_a m_a\rho_a^2\omega_f,
$$

and a stable mode-locking plateau with integer winding $n$, then the accepted-retained-evidence burden is not a single scalar orbit area. It is the same-branch coincidence

$$
h_E
=
h_\Phi
=
h_p
=
h_J
=
h_\vartheta
$$

inside the plateau, together with visible splitting of the readouts at the tongue or resonance boundary and a positive Floquet stability margin.

The shared Planck/blackbody/coupling structure should be a sea-state fibration rather than a fiber product over a carrier that includes all constitutive inputs. Let $\mathcal M_{\mathrm{PC}}$ denote the local finite-dimensional carrier supplied by the Poincare/monodromy reduction. Then

$$
\pi:\mathcal M_{\mathrm{PC}}\to B_{\mathrm{sea}},
\qquad
\vartheta_{\mathrm{PC}}\in\Omega^1(\mathcal M_{\mathrm{PC}}/B_{\mathrm{sea}}).
$$

The Noether sea state, $c_\gamma$, and response kernels are base or constitutive rows. The common action object is the fiberwise Poincare-Cartan period plus photon-channel transversality data. The scale-invariance target becomes local constancy of $h_\vartheta$ over the relevant base patch; running $\alpha(\mu)$ may change only the electromagnetic response kernel and threshold inventory.

### Closure Status

Current `6/23 b` score: `2`.

The row is high priority because many mature equations already consume $h$ or $\hbar$. It remains low-scored because the current material uses those constants as bridge readouts or residual inputs; it does not yet derive the action unit from retained braid geometry.

Executable status: [constant-delay-retained-orbit-certificate.mjs](../../../scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs) now isolates the `EQ-12A` retained-orbit scaffold and scalar falsifier. The attempt fixture [constant-delay-retained-orbit-certificate-attempt.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-certificate-attempt.v1.json) passes the constant-delay model, Hopf birth, first-Lyapunov, monodromy/Floquet, Poincare-section, Poincare-Cartan, four-readout action, refinement, sweep-invariance, history-throughput, non-resonance, and negative-control diagnostics while remaining score-neutral at `missing_accepted_retained_orbit_reduction_row`. The retained-reduction source guard now requires accepted-looking `retained_orbit_reduction_row` rows to declare explicit `EQ-12A`, retained action-period carrier, and `S_eq` equal-frequency support metadata. The metadata-missing control [constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json) blocks at `missing_accepted_retained_orbit_reduction_row` with `retained_orbit_reduction_source_contract_mismatch`; the one-row source-evidence probe [constant-delay-retained-orbit-retained-reduction-source-evidence-probe.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-source-evidence-probe.v1.json) remains score-neutral and advances only to `missing_accepted_constant_delay_self_hit_model_row`. The broader positive route now points to locked equal-frequency tri-binary evidence: winding plateau, four-readout coincidence, and Floquet margin on one retained branch. [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs) continues to evaluate the broader `EQ-12A`, `EQ-22A`, and `EQ-26A` Planck/alpha residual family.

### Closure Burden

The row must recover:

- one action unit from a retained closed cycle, not from assigning $h$ in each comparison equation;
- one $\hbar=h/(2\pi)$ relation shared by phase, spin/angular-momentum, and photon packet rows;
- a scalar constant-delay retained-orbit falsifier before state-dependent delay is reintroduced by persistence;
- a Hopf birth row with simple imaginary crossing, transversality, and all other roots stable;
- a first Lyapunov coefficient row with $\ell_1\ne0$, rejecting the Bautin/continuum case;
- a monodromy/Floquet row with exactly one unit multiplier and a positive gap to the remaining spectrum;
- a Poincare section and local Poincare-Cartan orbit integral row;
- an energy-clock versus phase-loop readout certificate showing $h_E$ and $h_\Phi$ converge under refinement and Poincare-section relocation;
- a scalar continuation result showing whether $h_\Phi$ is continuously rescalable under $g$ or $\mu$;
- a locked equal-frequency tri-binary branch with middle-binary speed pinning, integer winding plateau, four-readout coincidence, and positive Floquet margin;
- a history-energy throughput row whose numerical violation is $\mathcal H_{\mathrm{hist}}$;
- a non-resonance certificate for Floquet/slaved history modes and tri-binary frequency small divisors;
- a geometry-derived action period, not an action period inferred from $\alpha$ data;
- common $h$, $\hbar$, $c_\gamma$, event-ledger, and Noether sea rows across `EQ-12`, `EQ-22A`, `EQ-26`, `EQ-26A`, and `EQ-28`;
- a no-hidden-retune witness showing that action, frequency, momentum, and angular momentum are not fitted independently;
- a sea-state fibration row $\pi:\mathcal M_{\mathrm{PC}}\to B_{\mathrm{sea}}$ showing that $h_\vartheta$ is locally constant over the base patch used by the blackbody and coupling projections.

### Agent Target

Build the scalar falsifier first: solve the constant-delay Hopf equations, compute $\ell_1$, continue the bifurcated orbit to finite amplitude, compute the monodromy spectrum, and test whether $\oint p\,dq$ varies continuously while the frequency remains near the Hopf crossing. If that expected falsifier passes, move the positive action-unit search to the equal-frequency tri-binary branch: compute the winding plateau, four readouts $h_E,h_\Phi,h_p,h_J$, and Floquet margin on one retained branch with middle-binary speed pinning.

## EQ-14 Through EQ-16: Quantum Wave, Spinor, And Gauge Equations

### Standard Form

Schrodinger continuity benchmark:

$$
\partial_t\rho_{\mathrm{rec}}
+
\nabla\cdot\mathbf J_{\mathrm{rec}}
=
0.
$$

Dirac benchmark:

$$
(i\hbar\gamma^\mu\partial_\mu-mc)\psi=0.
$$

Gauge-field benchmarks include QED, Yang-Mills, and QCD comparison equations.

### AAA Mapping

These equations should be treated as observer-level or effective-state recovery targets. The candidate AAA carriers are:

- deterministic branch flow;
- finite-window basin measure $\mu_{*,T}$;
- record-facing density and flux;
- Noether braid spinor or ordered-frame ledger;
- angular-momentum and exchange ledger;
- sector exposure quotient;
- detector-response kernel.

Solved Schrödinger, Klein-Gordon, Dirac, and spinor wave families should be mined for inverse constraints: continuity currents, Gaussian packet spreading, bound-state spectra, relativistic dispersion, spinor phase transport, scattering phase shifts, and mode normalizations. Those constraints are useful only after they are expressed as retained branch, finite-window measure, ordered-frame, or detector-kernel residuals; they should not be treated as primitive wavefunction or field ontology.

### Closure Status

Current `6/23 b` scores: `3` for Schrodinger/Born-current continuity and `2` for Dirac/spinor and gauge equations.

Current material names useful closure routes, but the deeper spinor and gauge maps remain early.

### Closure Burden

For the Born-current row, the needed object is not a primitive probability fluid. It is a record projection:

$$
\rho_{\mathrm{rec}}(\mathbf x,t),
\qquad
\mathbf J_{\mathrm{rec}}(\mathbf x,t),
$$

obtained by pushing the same finite-window basin measure through deterministic assembly flow and the declared position projection.

The score-neutral executable route for the Born-current side is now [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs). The toy fixture [finite-window-statistical-carrier-eq14-born-current-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq14-born-current-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_W`. It passes the same-measure/same-flow, continuity, density-reference, and current-reference numeric diagnostics, but those passes are not score evidence because the carrier and record-current rows remain `toy`.

For spinor and gauge rows, the first closure object should be a shared ledger:

$$
\left(
\text{ordered frame},
\text{topological charge},
\text{angular momentum},
\text{exchange behavior},
\text{sector projection}
\right),
$$

not a field equation imported as ontology.

The score-neutral executable route for the spinor side is now [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs). Its attempt fixture reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_ordered_frame_loop`. The source-attempt fixture [eq15-27-ordered-frame-loop-source-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json) has the intended spin-lift and leading-$g$ numeric shape, but all rows remain `attempt`. The priority-source control [eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json) now fails closed at `accepted_without_evidence_source` with `sourceEvidenceFailureCount: 7`, so priority/source-map prose cannot satisfy accepted ordered-frame rows. `EQ-15` stays at `2`.

The score-neutral executable route for the weak/gauge side is now [weak-gauge-exposure-domain.mjs](../../../scripts/equation-mapping/weak-gauge-exposure-domain.mjs). Its baseline attempt fixture [weak-gauge-exposure-domain-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_weak_visible_branch_ledger`. The source-attempt fixture [weak-gauge-exposure-domain-source-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-source-attempt.v1.json) fails closed at `accepted_without_evidence_source` because its accepted-looking ledger row points to a priority map. The muon projection evidence lane [weak-gauge-exposure-domain-muon-projection-evidence.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-muon-projection-evidence.v1.json) now accepts the durable `weak_visible_branch_ledger` source [weak-visible-branch-ledger-muon-decay-retained-evidence.v1.json](../../../scripts/equation-mapping/weak-visible-branch-ledger-muon-decay-retained-evidence.v1.json), the same-domain `weak_projection` source [weak-projection-muon-decay-retained-evidence.v1.json](../../../scripts/equation-mapping/weak-projection-muon-decay-retained-evidence.v1.json), the same-domain `weak_quotient` source [weak-quotient-muon-decay-retained-evidence.v1.json](../../../scripts/equation-mapping/weak-quotient-muon-decay-retained-evidence.v1.json), and the same-domain `weak_exposure_record` source [weak-exposure-record-muon-decay-retained-evidence.v1.json](../../../scripts/equation-mapping/weak-exposure-record-muon-decay-retained-evidence.v1.json), and advances the first live blocker to `missing_accepted_va_chirality_gate`, still with `scoreDecision=no_score_increase`. The domain, gauge-branch, covariance, `V-A`, CKM, PMNS, provenance, and retune diagnostics are executable, but they remain shape checks until the same-domain chirality, overlap, provenance, covariance, reaction-event, and Noether sea rows are accepted. The [EQ-16 Weak-Visible Branch Ledger Source-Field Map](eq-16-weak-visible-branch-ledger-source-field-map.md) now carries a Direct Geometry Layer binding those rows to one weak-visible domain.

### Agent Target

Populate one accepted row for the finite-window Born-current carrier, the ordered-frame spinor carrier, or the weak-visible exposure-domain carrier. Do not add imported wave, spinor, or gauge equations until the corresponding retained row remains source-backed and same-record under the executable guardrail.

## EQ-16A: Neutrino Oscillation Phase Gaps And Equal-Frequency Tri-Binary Candidate

### Standard Form

Neutrino oscillation is the cleanest particle-physics benchmark for one prepared fermion state exposing multiple propagation phase rates. A flavor state is a coherent superposition of propagation eigenstates:

$$
|\nu_\alpha\rangle
=
\sum_i U_{\alpha i}|\nu_i\rangle.
$$

For an ultra-relativistic neutrino, the propagation phase rate can be written as a large common part plus a mass-squared correction:

$$
\omega_i
\simeq
\omega_0
+
\frac{m_i^2c^4}{2E\hbar}.
$$

The common phase is not observable in oscillation probabilities. The observed clocks are beat frequencies:

$$
\Delta\omega_{ij}
=
\omega_i-\omega_j
\simeq
\frac{\Delta m_{ij}^2c^4}{2E\hbar}.
$$

With three propagation eigenstates, the three pairwise beat frequencies obey

$$
\Delta\omega_{31}
=
\Delta\omega_{32}
+
\Delta\omega_{21},
$$

so only two gaps are independent. Current global-fit values should be treated as updateable benchmark inputs, not fixed theory constants. As of the NuFIT 6.0 global analysis ([arXiv:2410.05380](https://arxiv.org/abs/2410.05380)), the useful scale summary is

$$
\Delta m^2_{21}
\approx
7.5\times10^{-5}\,\mathrm{eV}^2,
\qquad
|\Delta m^2_{3\ell}|
\approx
2.5\times10^{-3}\,\mathrm{eV}^2.
$$

Thus the atmospheric-scale beat is about $33$ times the solar-scale beat. For normal ordering, the pairwise beat-frequency magnitudes may be read schematically as

$$
\Delta\omega_{21}:\Delta\omega_{32}:\Delta\omega_{31}
\approx
1:32.5:33.5,
$$

up to the common $1/E$ scaling and sign convention.

### AAA Mapping

The immediate lesson is not that the three tri-binary frequencies should literally be observed as three absolute neutrino clocks. The observed relation says something subtler: a common carrier phase can factor out, while a residual propagation operator supplies two independent observable phase gaps.

The near-photon interpretation adds a second inverse clue. A neutrino should sit close enough to the photon channel to explain high propagation speed and weak exterior exposure, but it must fail to complete the photon lock. If the pro/anti planar pair fully locked, the residual internal-binary rows would be hidden inside a photon-channel ledger and no neutrino oscillation operator would remain. The target is therefore an almost-locked neutral branch with a large common propagation phase and a nonzero internal-binary residual:

$$
\Omega^{(\nu)}
=
\omega_{\nu 0}\mathbf{1}
+
\delta\Omega_{\mathrm{bin}}
\qquad
\delta\Omega_{\mathrm{bin}}\neq0
$$

The constituent-binary intuition belongs in $\delta\Omega_{\mathrm{bin}}$: it is the retained behavior of internal binary phase, lever-arm, wake/coupling, and exposure rows after the common near-photon phase has been factored out.

The equal-frequency tri-binary candidate in [equal-frequency-energy-radius-candidate.md](../braid-angular-momentum-spin/equal-frequency-energy-radius-candidate.md) is therefore a good match only if it has the form

$$
H_{3B}^{(\nu)}
=
\omega_f C_0\mathbf 1
+
\delta H_{3B}
\left(
\rho_a,\phi_a,W_a,L_{\mathrm{wake}},L_{\mathrm{coupling}},\mathcal L_{\mathrm{root}}
\right).
$$

Under the explicit `(f,f,f)` reading, the internal binary-frequency row is

$$
(f_I,f_M,f_O)=(f,f,f),
\qquad
\omega_I=\omega_M=\omega_O=\omega_f,
$$

and that equality lives in the common operator term $\omega_f C_0\mathbf 1$. It does not say the observed neutrino has three freely measured absolute clocks. It says the base tri-binary clock can be common while the observable beat structure is carried by a residual phase-rate operator. The residual operator must carry the mass-squared-response gaps after diagonalization:

$$
H_{3B}^{(\nu)}
=
U_{\mathrm{PMNS}}\Lambda U_{\mathrm{PMNS}}^\dagger,
\qquad
\Delta\lambda_{ij}
=
\lambda_i-\lambda_j.
$$

The normal-ordering benchmark can be written as a residual-spectrum target. If $\delta_\nu$ denotes the solar-scale residual gap, then a simple schematic eigenvalue pattern is

$$
(\epsilon_1,\epsilon_2,\epsilon_3)
\sim
(0,1,33.5)\delta_\nu
$$

up to an arbitrary common offset. Centering the same spectrum gives

$$
(\epsilon_1,\epsilon_2,\epsilon_3)
\sim
(-11.5,-10.5,22)\delta_\nu,
$$

with pairwise gaps

$$
\epsilon_2-\epsilon_1=\delta_\nu,
\qquad
\epsilon_3-\epsilon_2\approx32.5\delta_\nu,
\qquad
\epsilon_3-\epsilon_1\approx33.5\delta_\nu.
$$

That is a doublet-plus-singlet residual structure: two propagation eigenphases are close, while the third is separated by the atmospheric scale. It is not an equal residual-spacing target.

This uses the same weak-basis / propagation-basis distinction already stated in [neutrinos.md](../../../content/markdown/aaa/assemblies/fermions/neutrinos.md): weak reactions create and detect flavor-basis states, while propagation follows the eigenbasis of the neutral-lepton phase operator. The tri-binary proposal is viable only if the common clock cancels from flavor probabilities without forcing $\delta H_{3B}=0$.

In propagation form, the phase carried by eigenmode $i$ can be represented as

$$
\Phi_i(T)
=
\omega_fT+\epsilon_iT+\phi_i^{(0)}.
$$

The common $\omega_fT$ term cancels from oscillation probabilities. Static initial offsets $\phi_i^{(0)}$ can shift the phase origin, alter interference phases, or contribute to mixing conventions, but they do not by themselves create the observed $L/E$ oscillation frequencies. The observed ratio requires phase-rate differences:

$$
\Delta\Phi_{ij}(T)
=
(\epsilon_i-\epsilon_j)T
+
\left(\phi_i^{(0)}-\phi_j^{(0)}\right).
$$

Thus an `(f,f,f)` neutrino fit needs one small residual phase-rate gap and one atmospheric-scale residual phase-rate gap riding on the shared clock. Candidate sources for the $\epsilon_i$ rows include unequal effective lever arms/radii at equal angular frequency, energy-radius stationarity, phase holonomy around the retained branch, wake/coupling angular-momentum transfer, weak-exposure weights, and Noether sea matter response. The closure burden is to derive those rows from one neutral-lepton branch rather than fitting three absolute frequencies.

The superposition/cancellation clue has two layers:

1. the ordinary quantum common phase cancels from oscillation probabilities;
2. the triadic $120^\circ$ phase profile can make the exterior exposure small through a cyclic phasor sum.

The second layer should be tracked as a candidate neutral-lepton cancellation residual:

$$
R_{\nu,\mathrm{cancel}}
=
\left|
\sum_{a\in\{1,2,3\}}
W_a^{(\nu)}e^{i\phi_a}
\right|.
$$

The raw labels $\{1,2,3\}$ should be mapped to `I:M:O` only after a retained branch supplies those roles.

Small $R_{\nu,\mathrm{cancel}}$ is not enough. A neutral-lepton branch must also leave a nonzero residual phase operator that recovers the observed two-gap hierarchy.

### Closure Status

Current `6/23 b` score: `3`.

The standard oscillation equations are precise, the local neutrino chapter already supplies a geometric phase-operator recovery target, and the equal-frequency packet now names the common-clock tri-binary interpretation. The missing object is a retained neutral-lepton tri-binary branch that derives $H_{3B}^{(\nu)}$, $U_{\mathrm{PMNS}}$, and the two independent phase gaps from the same row set.

Claim level: derivation-closure target. This is not a corpus claim that $(f,f,f)$ already explains PMNS data. It is a high-value equation-level benchmark because it tests exactly the structure the equal-frequency idea needs: one hidden shared clock plus residual splittings.

Executable status: [neutrino-common-clock-phase-operator.mjs](../../../scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs) now evaluates the common-clock/residual-phase packet for `EQ-16A`. The attempt fixture has the intended `(f,f,f)` common-clock and doublet-plus-singlet residual-gap shape, but it reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_neutral_lepton_retained_branch`; inherited `S_eq` support still blocks at `missing_accepted_raw_labeled_rows_preserved_on_retained_history`. The source-attempt fixture [neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json) replaces pending source placeholders with a concrete neutral-lepton retained-branch shape while keeping every row `attempt`, so it preserves the same blocker and score decision.

The detailed [EQ-16A Neutrino Common-Clock Phase Packet](eq-16a-neutrino-common-clock-phase-packet.md) now carries an Equation Attack Card and Direct Geometry Layer that bind the common clock, residual operator, phase gaps, PMNS readout, matter correction, cancellation row, weak-domain identity, and event ledger to one retained neutral-lepton branch.

### Closure Burden

The retained branch must show, on one event or positive-width domain:

- common-frequency factorization: $\omega_1=\omega_2=\omega_3=\omega_f$ enters only through a common phase or shared clock row;
- near-photon lock boundary: the branch remains close to the photon planar-pair channel, propagates at high speed, and remains weakly exposed, while an incomplete lock preserves nonzero internal-binary phase rows;
- nonzero residual gaps: $\delta H_{3B}$ has three eigenvalues with exactly two independent differences;
- hierarchy recovery: $|\Delta\lambda_{3\ell}|/\Delta\lambda_{21}$ lands near the observed atmospheric-to-solar ratio instead of a small integer triplet chosen by hand;
- residual-spectrum shape: after the common clock is removed, the neutral-lepton row produces a near doublet plus separated singlet rather than equal residual spacing;
- phase-rate origin: static phase offsets $\phi_i^{(0)}$ may affect interference phase, but the $1:32.5:33.5$ benchmark must come from residual phase-rate gaps $\epsilon_i-\epsilon_j$;
- PMNS readout: the weak-coupling readout defines $U_{\mathrm{PMNS}}$ rather than fitting separate flavor-specific terms;
- cancellation without erasure: $R_{\nu,\mathrm{cancel}}$ suppresses exterior exposure while leaving $\delta H_{3B}$ observable;
- ledger closure: weak reaction provenance, energy, momentum, angular momentum, wake/coupling transfer, and Noether sea state use the same branch record.

The first falsifier is sharp: if exact tri-binary cancellation also forces $\delta H_{3B}=0$, then equal-frequency tri-binary structure cannot explain neutrino oscillation. A second falsifier is loss of the additive beat relation $\Delta\omega_{31}=\Delta\omega_{32}+\Delta\omega_{21}$ after the $\mathbb{A}\mathbb{A}\mathbb{A}$ operator is diagonalized. A third falsifier is a residual operator that naturally produces all-zero or evenly spaced residual eigenvalues when the data require one small solar gap and one much larger atmospheric gap.

### Agent Target

Derive the smallest retained neutral-lepton phase-operator packet: start from the equal-frequency $S_{\mathrm{eq}}$ row set, define $\delta H_{3B}$ from phase offsets, effective lever arms, energy-radius rows, wake/coupling transfer, Noether sea matter response, and weak-coupling exposure, then check whether the resulting eigenvalue gaps can reproduce one small solar-scale gap and one much larger atmospheric-scale gap without fitted flavor terms.

## EQ-17: Redshift Factorization

### Standard Form

The ordinary observational definition is

$$
1+z
=
\frac{\nu_e}{\nu_o}.
$$

The AAA factorization target is

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}
\frac{\mathcal P_{E\to R}}
{B_X(E)D_v}.
$$

In logarithmic form:

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}
-
\ln\Gamma_{N,R}
+
\ln\mathcal P_{E\to R}
-
\ln B_X(E)
-
\ln D_v.
$$

### AAA Mapping

The redshift map is one of the strongest equation bridges because it forces all four channels to stay visible:

- endpoint clock or Noether sea cadence comparison;
- source-branch shift;
- launch or relative-motion geometry;
- path-history propagation through the Noether sea.

The Noether sea cadence term is

$$
\Gamma_N
=
\frac{\Omega_{N0}}{\Omega_N}.
$$

### Closure Status

Score: `4`.

The formula is explicit, but the path-history propagation term and energy-exchange residuals still need derivation and validation.

Executable status: [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs) now evaluates the `EQ-17` source-path-receiver transfer budget. The attempt fixture [signed-frequency-transfer-attempt.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_theta_transfer`, and passing numeric checks for the signed transfer budget, receiver frequency, segment energy exchange, path quality, and no-hidden-retune residual. The focused [EQ-17 Theta-Transfer Source-Field Map](eq-17-theta-transfer-source-field-map.md) records the packet-level Direct Geometry Layer and smallest accepted evidence object. The priority-source control [signed-frequency-transfer-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-priority-source-negative-control.v1.json) keeps accepted-looking transfer rows blocked with `coordination_source_path`. Those numeric and source-guard passes are not score evidence because the parent transfer record and shared-key rows remain unaccepted.

### Closure Burden

Each segment-level exchange should close an energy residual such as

$$
\mathcal R_{\nu\text{-}\mathrm{ex},j}
=
\frac{
\left|
h(\nu_{X,j}^{+}-\nu_{X,j}^{-})
+
\Delta E_{\mathrm{med},j}
+
\Delta E_{\mathrm{recoil},j}
+
\Delta E_{\mathrm{rem},j}
\right|
}{
\epsilon_E
}.
$$

### Agent Target

Create a durable source-backed `theta_transfer` source report for one clean spectral family, then populate child rows under the signed-frequency checker until it advances beyond `missing_accepted_theta_transfer`. A worked numeric record alone is not score evidence.

## EQ-18 And EQ-19: Effective FRW, Friedmann, And Cosmological Continuity

### Standard Form

Effective FRW line element:

$$
ds_{\mathrm{FRW,eff}}^2
=
-c_0^2d\tau_c^2
+
a_{\mathrm{eff}}^2(\tau_c)
\left[
\frac{d\chi^2}{1-k\chi^2}
+
\chi^2d\Omega^2
\right].
$$

Friedmann comparison:

$$
H_{\mathrm{eff}}^2
=
\frac{8\pi G_{\mathrm{eff}}}{3c_0^2}\rho_{\mathrm{eff}}
-
\frac{k c_0^2}{a_{\mathrm{eff}}^2}
+
\frac{\Lambda_{\mathrm{eff}}}{3}.
$$

Continuity comparison:

$$
\dot\rho_{\mathrm{eff}}
+
3H_{\mathrm{eff}}(\rho_{\mathrm{eff}}+P_{\mathrm{eff}})
=
0.
$$

### AAA Mapping

These are observer-level data-product equations. The Euclidean void does not expand. The effective variables $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $k$, $\Omega_i$, $w_i$, and horizon distances are extracted from:

- Noether sea evolution;
- clock comparison;
- transport records;
- source recycling or assembly provenance, when source terms are used.

### Closure Status

Score: `3`.

The ontology is clear and the recovery equations are present. The transfer pipeline is not yet predictive.

The score-neutral executable route is now [effective-frw-handoff-residual.mjs](../../../scripts/equation-mapping/effective-frw-handoff-residual.mjs). The attempt fixture [effective-frw-handoff-attempt.v1.json](../../../scripts/equation-mapping/effective-frw-handoff-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_theta_cos`. Its numeric handoff checks pass for $H_{\mathrm{eff}}$, $R_H$, $R_\rho$, source provenance, fixed-void discipline, shared keys, and hidden-retune residuals, but those passes are not score evidence because the retained cosmology rows remain `attempt`. The [EQ-18 And EQ-19 Theta-Cos Source-Field Map](eq-18-19-theta-cos-source-field-map.md) now carries a Direct Geometry Layer binding the homogeneous `theta_cos` carrier, FRW handoff rows, Friedmann rows, continuity/source term, fixed-void witness, shared keys, and no-hidden-retune witness to one source-backed cosmology record.

### Closure Burden

The strongest useful next equation is not another Friedmann rewrite. It is a provenance source row:

$$
\dot\rho_{m,\mathrm{eff}}
+
3H_{\mathrm{eff}}\rho_{m,\mathrm{eff}}
=
\mathcal S_{m,\mathrm{eff}},
$$

where $\mathcal S_{m,\mathrm{eff}}$ must come from assembly association, dissociation, transport, recycling, or Noether sea exchange in the same absolute record.

### Agent Target

Replace the fixed-void Friedmann attempt with a durable source-backed `theta_cos` homogeneous-window record whose $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, and $\mathcal S_{\mathrm{eff}}$ rows remain on one Noether sea and assembly record. Until the effective-FRW checker accepts that carrier from durable source evidence, the cosmology handoff remains score-neutral at `missing_accepted_theta_cos`.

## EQ-20: Dark Energy Equation Of State And $\Lambda$

### Standard Form

Dark-energy comparison:

$$
p=w\rho c_0^2,
\qquad
w<-1/3
$$

for acceleration, with

$$
\Lambda_{\mathrm{eff}}^{\mathrm{sea}}
=
\frac{8\pi G_{\mathrm{eff}}}{c_0^2}
\rho_{\mathrm{DE,eff}}[\theta_{\mathrm{sea}}].
$$

### AAA Mapping

The native hypothesis routes dark energy to Noether sea state:

- baseline energy density $u_{\mathrm{sea}}$;
- outer-binary tension and relaxation;
- pressure response;
- slow Hubble-time-scale relaxation;
- effective negative pressure.

### Closure Status

Current `6/23 b` score: `3`.

The mechanism is staged as a shared constitutive target, not merely a loose analogy. A fitted $\Lambda$ is still not a derivation.

The score-neutral executable route is now [eq20-pressure-effective-lambda-residual.mjs](../../../scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs). The attempt fixture [eq20-pressure-effective-lambda-attempt.v1.json](../../../scripts/equation-mapping/eq20-pressure-effective-lambda-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, first blocker `missing_accepted_theta_sea_rho_NS`, and inherited FRW blocker `missing_accepted_theta_cos`. The provider-backed slice [eq20-provider-backed-pressure-effective-lambda-slice.v1.json](../../../scripts/equation-mapping/eq20-provider-backed-pressure-effective-lambda-slice.v1.json) now consumes the accepted `theta_sea_rho_NS` density provider and the retained [eq20-delta-p-eff-pressure-projection-report.v1.json](../../../scripts/equation-mapping/eq20-delta-p-eff-pressure-projection-report.v1.json). It reports no missing pressure rows or shared keys, accepts the pressure-law, sea-pressure, sea-tension, relaxation, effective-density, effective-pressure, effective-coupling, effective-$\Lambda$, source-provenance, and no-hidden-retune rows from the same provider window, and then stops at `blocked_missing_frw_handoff` with `nextBlocker=missing_accepted_theta_cos`. The route remains score-neutral because the accepted pressure projection has not yet cleared the inherited `theta_cos` cosmology handoff or the shared weak-gravity/growth/CMB coupling tests.

### Closure Burden

Derive or simulate a pressure law:

$$
p_{\mathrm{sea}}
=
p_{\mathrm{sea}}
\left(
\rho_{\text{NS}},
\dot\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\langle R_{\mathrm{outer}}\rangle,
T_{\mathrm{eff}}
\right).
$$

Then show how it projects into $w_{\mathrm{eff}}$ and $\Lambda_{\mathrm{eff}}$ without changing the projection between supernova, BAO, CMB, and growth records.

### Agent Target

Build the accepted `theta_cos` cosmology handoff for the provider-backed `EQ-20` pressure route, then reuse the same pressure, coupling, and source-provenance rows in the shared `EQ-11`/`EQ-20` residual. Until the inherited FRW handoff clears and the same $G_{\mathrm{eff}}$, pressure, relaxation, growth, CMB, and low-acceleration consumers remain no-retune on the shared record, the dark-energy row remains score-neutral at `missing_accepted_theta_cos`.

## EQ-21: Structure Growth And Matter Power

### Standard Form

Linear density contrast:

$$
\ddot\delta
+
2H(t)\dot\delta
-
4\pi G_{\mathrm{eff}}(t,k)\bar\rho_m(t)\delta
=
0.
$$

Matter power:

$$
P(k,z)
=
P_{\mathrm{seed}}(k)T^2(k)D^2(z).
$$

### AAA Mapping

The Noether sea supplies:

- effective damping through bulk evolution;
- $G_{\mathrm{eff}}(t,k)$ through medium response;
- scale dependence through compliance, delay, and finite assembly scales;
- neutral-assembly loading for dark-sector comparisons;
- the same growth record consumed by lensing and CMB.

### Closure Status

Score: `3`.

The current map is explicit as a comparison interface. The missing object is a predictive transfer function.

### Closure Burden

The shared growth record should project into

$$
\left(
P(k,z),
D(z,k),
C_L^{\phi\phi},
f\sigma_8,
\text{halo and cluster residuals}
\right)
$$

without switching Noether sea state between linear and nonlinear packets.

The row should be evaluated as a projection of $\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$ from the shared-observation packet: growth uses the same readout and Noether sea response rows that later feed CMB lensing, BBN handoff, and low-acceleration galaxy comparisons.

Executable status: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) now evaluates the shared `EQ-21`/`EQ-22`/`EQ-23`/`EQ-32` residual family. The current attempt fixture is score-neutral and reports `blocked_missing_rows`, with first blocker `missing_accepted_theta_obs`; no `EQ-21` score change follows from the structural run. The full-input source-attempt fixture [shared-observation-theta-src-source-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json) gives `theta_src` a concrete source-window shape while keeping all rows `attempt`; `--focus-row theta_src` reports `missing_accepted_theta_src` as diagnostic detail only. The shared source-window packet [EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map](eq-21-22-23-theta-src-source-field-map.md) now carries a Direct Geometry Layer for `Theta_src`, including standard comparison terms, AAA geometric readouts, required rows, same-record bindings, fail-closed controls, and the smallest accepted evidence object.

### Agent Target

Pick one growth observable, preferably $P(k,z)$ or $f\sigma_8$, and define the exact Noether sea variables needed to compute it.

## EQ-22: CMB Transfer, Blackbody, And Acoustic Equations

### Standard Form

CMB transfer comparison:

$$
C_\ell^{XY,\theta}
=
\frac{2}{\pi}
\int k^2\,dk\,
P_\theta(k)
\Delta_{X\ell}^\theta(k)
\Delta_{Y\ell}^\theta(k).
$$

Blackbody spectrum and acoustic-peak equations are retained as observational data-product constraints.

### AAA Mapping

The CMB packet must join:

- source or last-thermalization temperature;
- thermalization depth;
- photon-to-baryon loading;
- neutrino-sector row;
- helium and BBN handoff;
- instrument and foreground provenance;
- frame and dipole residuals.

### Closure Status

Current `6/23 b` score: `3`.

The current material now has a shared observation-record scaffold, but the equation-level transfer pipeline remains a priority target.

Executable status: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) now evaluates the shared `EQ-21`/`EQ-22`/`EQ-23`/`EQ-32` residual family. The current attempt fixture is score-neutral and reports `blocked_missing_rows`, with first blocker `missing_accepted_theta_obs`; no `EQ-22` score change follows from the structural run. The full-input source-attempt fixture [shared-observation-theta-src-source-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json) gives `theta_src` a concrete source-window shape while keeping all rows `attempt`; `--focus-row theta_src` reports `missing_accepted_theta_src` as diagnostic detail only. The shared source-window packet [EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map](eq-21-22-23-theta-src-source-field-map.md) now carries a Direct Geometry Layer for `Theta_src`, including standard comparison terms, AAA geometric readouts, required rows, same-record bindings, fail-closed controls, and the smallest accepted evidence object.

### Closure Burden

The CMB projection is a local readout of the shared observation record,

$$
\Pi_{\mathrm{CMB}}\Theta_{\mathrm{obs}}
=
\left(
T_{\mathrm{src}},
\mathcal D_{\mathrm{th}}^{\mathrm{CMB}},
\eta_{\gamma b},
N_{\mathrm{eff}},
Y_p,
\mathcal P_{\mathrm{instr}},
\mathbf D_{\mathrm{frame}}
\right).
$$

A CMB branch fails if it fits microwave temperature while assigning helium abundance, neutrino history, foreground subtraction, or dipole correction to separate records. The local CMB readout must reuse the shared $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{therm/prov}}$, $\Theta_{\mathrm{read}}$, and effective-coupling rows rather than introducing an independent $\Theta_{\mathrm{CMB}}$.

### Agent Target

Convert one CMB subproblem, such as blackbody preservation or acoustic-peak seeding, into a concrete transfer equation with source, path, thermalization, and frame terms.

## EQ-22A: Planck Blackbody Law, Mode Counting, And Photon Occupancy

### Standard Form

The Planck spectrum can be written as a photon occupation law and mode-density law:

$$
\bar n_\nu
=
\frac{1}{\exp(h\nu/k_BT)-1},
\qquad
u_\nu(T)
=
\frac{8\pi h\nu^3}{c_\gamma^3}
\frac{1}{\exp(h\nu/k_BT)-1}.
$$

The more diagnostic form keeps photon chemical potential explicit:

$$
\bar n_i^\theta
=
\frac{1}
{\exp((h\nu_i-\mu_\gamma^\theta)/(k_BT_\theta))-1}.
$$

For an equilibrated photon gas, the target is $\mu_\gamma^\theta=0$ with sufficient thermalization depth.

Findability note: "Planck's equation" is ambiguous. `EQ-12` and `EQ-12A` own the photon/action readout $E=h\nu$, while `EQ-22A` owns Planck blackbody law and the blackbody ultraviolet-catastrophe benchmark. The ultraviolet catastrophe is the classical Rayleigh-Jeans high-frequency divergence when mode counting is paired with classical equipartition; it belongs here as a fail-closed mode-count/occupancy comparison, not as a general QFT ultraviolet divergence or renormalization row.

### AAA Mapping

`EQ-22` owns the full CMB transfer and acoustic observation record. `EQ-22A` owns the Planck-law core: mode counting, photon occupancy, zero photon chemical potential, and thermalization depth. The mapped object should be a finite-window thermal photon carrier

$$
\Theta_{\mathrm{bb}}
=
\left(
\Theta_{\mathrm{therm}},
P_\gamma,
g_\nu^\theta,
T_\theta,
\mu_\gamma^\theta,
\mathcal D_{\mathrm{th}},
\theta_{\mathrm{sea}}
\right),
$$

where $g_\nu^\theta$ is the recovered mode-density row, $P_\gamma$ carries the Gate B transverse-mode constraint, $T_\theta$ is the temperature/clock conversion row, and $\mathcal D_{\mathrm{th}}$ measures thermalization depth. The residual should separate the occupancy law from source/path/frame CMB residuals:

$$
\mathcal R_{\mathrm{bb}}
=
\max_i
\left|
\frac{N_i^\theta/g_i^\theta-\bar n_i^\theta}
{\bar n_i^\theta+\varepsilon_n}
\right|
+
\max_i
\left|
\frac{u_i^\theta-g_{\nu,i}^\theta h\nu_i\bar n_i^\theta}
{u_i^\theta+\varepsilon_u}
\right|
+
\frac{|\mu_\gamma^\theta|}{k_BT_\theta+\varepsilon_T}
+
\frac{\max(0,D_{\min}-\mathcal D_{\mathrm{th}})}{D_{\min}}.
$$

The first proof route should be maximum entropy on the photon mode measure with energy, mode-number bookkeeping, and exchange symmetry explicit:

$$
\bar n_i^\theta
=
\frac{1}
{\exp((h_\vartheta\nu_i-\mu_\gamma^\theta)/(k_BT_\theta))-1}.
$$

The transverse factor inside the standard $8\pi\nu^2/c_\gamma^3$ mode density is a Gate B gauge-transversality row: the longitudinal photon mode is absent only if the photon-channel redundancy removes it. The zero chemical potential row should likewise be an absence-of-symmetry result, not an assumption:

$$
\mu_\gamma^\theta=0
\quad\Longleftrightarrow\quad
\text{no conserved photon-number charge shifts }N_\gamma
\text{ while fixing }(E,\mathbf p,\mathbf J).
$$

A nonzero $\mu_\gamma^\theta$ over finite windows is therefore a physical leakage diagnostic. It may appear before refinement, but it must vanish as the thermal/provenance record closes or the no-photon-number theorem fails.

### Closure Status

Current `6/23 b` score: `2`.

The surrounding CMB and thermodynamic rows are already at `3`, but this row starts lower because the Planck spectrum itself has not yet been derived from retained mode counting and finite-window thermalization. A fitted blackbody temperature is not enough: the row must show why the photon occupation law, two transverse modes, zero chemical potential, and thermalization depth share one record.

Executable status: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs) evaluates the score-neutral Planck blackbody sub-residual together with `EQ-12A` and `EQ-26A`. The attempt fixture [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json) includes negative controls for wrong mode count, per-bin temperature fitting, missing thermalization, longitudinal-mode leakage, and hidden retune. The shared source guard rejects priority packets, authored AAA prose, generated paths, attempts, toys, probes, source-evidence probes, mocks, negative controls, and temporary paths as accepted evidence for the parent `theta_gamma_packet`; [planck-alpha-braid-theta-gamma-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-gamma-probe-source-negative-control.v1.json) keeps the row blocked at `missing_accepted_theta_gamma_packet` with `source_not_durable`.

### Closure Burden

The row must recover:

- $h$ from the same action row used by `EQ-12A`, not from an independent blackbody fit;
- exactly the photon-channel mode count allowed by Gate B transverse geometry;
- zero photon chemical potential as absence of a conserved photon-number symmetry, with finite-window leakage reported as $\mu_\gamma^\theta/(k_BT_\theta)$ rather than hidden as numerical noise;
- a maximum-entropy derivation of the occupancy law from energy, mode-number bookkeeping, and exchange symmetry;
- adequate thermalization depth from the finite-window thermodynamic record;
- shared $T_\theta$, $c_\gamma$, $\theta_{\mathrm{sea}}$, and photon packet rows with `EQ-22`, `EQ-25`, and `EQ-12A`.

### Agent Target

Populate one finite-window thermal photon packet whose mode density, occupancy, energy density, zero photon chemical potential, and thermalization depth all come from the same $\Theta_{\mathrm{bb}}$ record.

## EQ-22B: Recombination And Acoustic Transfer

Detailed packet: [EQ-22B Recombination And Acoustic Transfer](eq-22b-recombination-acoustic-transfer.md).

### Standard Form

The equilibrium recombination benchmark is

$$
\frac{x_e^2}{1-x_e}
=
\frac{1}{n_H}
\left(
\frac{m_ek_BT}{2\pi\hbar^2}
\right)^{3/2}
\exp\left(-\frac{\chi_H}{k_BT}\right).
$$

A Peebles-style rate row is represented as

$$
\dot x_e
=
-C_{\mathrm{rec}}\alpha_Bn_Hx_e^2
+C_{\mathrm{rec}}\beta_B(1-x_e).
$$

The Thomson rate, visibility, sound horizon, and compact acoustic transfer rows are

$$
\Gamma_T=n_e\sigma_Tc_\gamma,
\qquad
\tau_T=\int n_e\sigma_Tc_\gamma\,dt,
\qquad
g=\Gamma_Te^{-\tau_T},
$$

$$
c_s
=
\frac{c_\gamma}{\sqrt{3(1+R_b)}},
\qquad
r_s=\int\frac{c_s}{a_{\mathrm{eff}}}\,dt,
$$

and

$$
\ddot\Theta_{\gamma b}
+c_s^2k^2\Theta_{\gamma b}
=
S_{\gamma b}.
$$

### AAA Mapping

`EQ-22B` treats these equations as observer-level recovery targets for one shared recombination/acoustic carrier:

$$
\Theta_{\mathrm{rec/ac}}
=
\left(
x_e^\theta,
n_e^\theta,
\Gamma_T^\theta,
\tau_T^\theta,
g^\theta,
r_s^\theta,
k_D^\theta,
R_b^\theta,
\theta_{\gamma b}^\theta,
\Theta_{\mathrm{therm/prov}},
\Theta_{\mathrm{read}},
\mathcal L_{E\mathbf p\mathbf J}
\right).
$$

The recombination fraction, Thomson rate, visibility, sound horizon, Silk damping, acoustic transfer, BBN handoff, and readout clock must share one thermal/provenance/readout record. A match fails if it imports a recombination clock, origin story, private baryon loading row, or acoustic phase fit as a separate record.

### Closure Status

Current `6/23 b` score: `2`.

The standard formula families and native carriers are now named in the focused packet, but no accepted recombination/acoustic carrier, shared thermal/provenance record, photon channel, neutrino channel, Noether sea state, or event ledger exists. No score change for `EQ-21`, `EQ-22`, `EQ-22A`, `EQ-23`, `EQ-24`, or `EQ-25` follows from adding this suffix row.

Executable status: [eq22b-recombination-acoustic-residual.mjs](../../../scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs) evaluates the score-neutral recombination/acoustic residual. The attempt fixture [eq22b-recombination-acoustic-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-attempt.v1.json) reports `blocked_missing_accepted_recombination_acoustic_carrier`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_recombination_acoustic_carrier`; its Saha, Peebles, Thomson/visibility, sound-horizon, Silk-damping, acoustic-transfer, source-provenance, hidden-retune, and negative-control diagnostics pass, but those passes are not score evidence because the recombination/acoustic carrier and every row binding remain `attempt`. The carrier-shell source-evidence probe [eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json) marks only the top carrier and `recombination_acoustic_carrier` row accepted-looking; it remains score-neutral and advances only to `nextBlocker=missing_accepted_theta_src`, with `--require-populated` exiting nonzero. The detailed packet now records a score-neutral $\Theta_{\mathrm{src}}$ handoff contract: one finite BBN-to-CMB/recombination source window must carry Noether sea keys, baryon/architrino/photon loading, BBN/CMB thermal keys, photon and neutrino handoffs, readout keys, one event ledger, and one no-hidden-retune witness before any accepted-looking `theta_src` row is safe. The `theta_src` coordination-source control [eq22b-recombination-acoustic-theta-src-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-theta-src-coordination-source-negative-control.v1.json) marks `theta_src` accepted-looking but sources it only to the shared source-field map; it remains score-neutral with `nextBlocker=accepted_without_evidence_source` and `sourceEvidenceFailureCount: 1`. The generic/source negative control [eq22b-recombination-acoustic-generic-source-negative-control.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json) now fails closed at `accepted_without_evidence_source` with `sourceEvidenceFailureCount: 17`, so priority packets, authored AAA prose, generated files, attempts, probes, mocks, and negative controls cannot satisfy accepted recombination/acoustic evidence rows.

### Closure Burden

The first residual is

$$
\mathcal R_{\mathrm{rec/ac}}^\theta
=
\mathcal R_{x_e}^\theta
+\lambda_P\mathcal R_{\mathrm{Peebles}}^\theta
+\lambda_\tau\mathcal R_{\tau_T}^\theta
+\lambda_g\mathcal R_{\mathrm{vis}}^\theta
+\lambda_s\mathcal R_{r_s}^\theta
+\lambda_D\mathcal R_{\mathrm{Silk}}^\theta
+\lambda_{\mathrm{ac}}\mathcal R_{\mathrm{acoustic}}^\theta
+\lambda_{\mathrm{shared}}\mathcal S_{\mathrm{retune}}.
$$

The first blocker is `missing_accepted_recombination_acoustic_carrier`: one source-backed $\Theta_{\mathrm{rec/ac}}$ must declare recombination, visibility, sound horizon, damping, acoustic transfer, BBN handoff, thermal/provenance, and readout rows before any stronger score or reader-facing promotion is justified.

### Agent Target

Populate the `EQ-22B` recombination/acoustic carrier behind the solver residual. The next useful artifact is a source-backed carrier row that keeps recombination kinetics, visibility, sound horizon, damping, acoustic phase, BBN handoff, and observation readout on one retained record.

## EQ-23: BBN Rate And Freezeout Equations

### Standard Form

The retained benchmark is the yield vector:

$$
\mathbf Y_{\mathrm{BBN}}^\theta
=
\mathbf Y
\left[
\{T,\rho,n_b,n_\gamma,n_n,\mathcal E_{i,s}^{\theta}\}
\right].
$$

### AAA Mapping

BBN is an effective source-window and thermal-record constraint. The Noether sea does not merely supply background color; it supplies the evolving medium state, effective $H(t)$, photon loading, neutrino-sector handoff, and source-channel energy partition.

### Closure Status

Current `6/23 b` score: `3`.

The constraint rows and shared source-window dependencies are explicit, but the native source-window mechanism is not predictive enough yet.

Executable status: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) now evaluates the shared `EQ-21`/`EQ-22`/`EQ-23`/`EQ-32` residual family. The current attempt fixture is score-neutral and reports `blocked_missing_rows`, with first blocker `missing_accepted_theta_obs`; no `EQ-23` score change follows from the structural run. The full-input source-attempt fixture [shared-observation-theta-src-source-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json) gives `theta_src` a concrete source-window shape while keeping all rows `attempt`; `--focus-row theta_src` reports `missing_accepted_theta_src` as diagnostic detail only. The shared source-window packet [EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map](eq-21-22-23-theta-src-source-field-map.md) now carries a Direct Geometry Layer for `Theta_src`, including standard comparison terms, AAA geometric readouts, required rows, same-record bindings, fail-closed controls, and the smallest accepted evidence object.

### Closure Burden

One branch must recover:

- neutron/proton ratio;
- helium yield $Y_p$;
- deuterium and lithium rows;
- $\eta$;
- $N_{\mathrm{eff}}$;
- same thermal, photon-loading, neutrino, and Noether sea state used by CMB and structure.
- the same $\Theta_{\mathrm{src}}$ and $\Theta_{\mathrm{therm/prov}}$ consumed by $\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$, so yields, photon loading, neutrino rows, and CMB handoff cannot be fit as separate source records.

### Agent Target

Replace the `Theta_src` source-attempt scaffold with one durable non-priority `theta_src` source-window row, then populate the first BBN child row on the same thermal/provenance, photon-loading, neutrino, matter-asymmetry, Noether sea, event-ledger, and no-hidden-retune record. Until that accepted row exists, the shared-observation and BBN residuals remain score-neutral at `missing_accepted_theta_obs` / `missing_accepted_theta_src`.

Suffix note: `EQ-23A` remains unscored and priority-only. Its Direct Geometry Layer and identity checker block first at `missing_accepted_explosive_source_window_carrier`; after a real retained parent carrier lands, the first child route is `shock_jump_blast_row` on the same `carrierId`, `sourceWindowId`, `supportId`, and `eventLedgerId`.

## EQ-24: Fluid, Elastic, And Acoustic-Medium Equations

### Standard Form

Acoustic metric comparisons have the schematic form

$$
(g_{\mathrm{ac}})_{\mu\nu}
\propto
\frac{\rho_0}{c_s}
\begin{pmatrix}
-(c_s^2-\lVert\mathbf u\rVert^2) & -u_j \\
-u_i & h_{ij}
\end{pmatrix}.
$$

Elastic and stress-strain laws can also serve as comparison language.

### AAA Mapping

The analogy is useful only if the Noether sea variables are derived from Noether braid population dynamics. The metric seen by perturbations is a constitutive readout; the medium still has its own dynamics in the Euclidean void.

### Closure Status

Score: `3`.

The analogy and warning are both well formed. Coefficients and population closure remain open.

### Closure Burden

Build the Noether sea counterpart:

$$
g_{\mu\nu}^{\mathrm{eff}}
=
\mathcal G_{\mu\nu}[\mathcal N_{\mathrm{sea}}]
+
\mathcal R_{\mathrm{metric}}.
$$

Then show which perturbation, clock, or signal channels actually read this metric.

### Agent Target

Extract one acoustic density-compression channel where the same retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ supplies $c_{X,\mathrm{disp}}^2$, $C_{1111}^X$, $\rho_{\text{NS}}$, $\mathcal R_{\mathrm{proj}}^X$, and $\mathcal R_{\mathrm{KK}}^X$. Accept only if $c_{X,\mathrm{disp}}^2=C_{1111}^X/\rho_{\text{NS}}$ within refinement error and no hidden retune occurs.

### Executable Surface-Slice Status

[noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs) now evaluates the first density-compression surface-slice packet for one declared channel and one Noether sea window. The default mock run reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and a partial declared surface vector; the retained-attempt skeleton has the intended field shape but also blocks because its rows are not accepted retained rows.

The retained-attempt summary now reports `thetaSeaRowStatuses`, `requiredRowStatuses`, `stressOrMetricRowStatuses`, and `acousticElasticAgreement`. Current retained-attempt rows remain `attempt`, with `metric_embedding_row` explicitly reported as `declared_missing_output`. The same-window acoustic/elastic numbers pass arithmetically (`numericAgreementStatus: passed`), but the accepted agreement row reports `attempt_numeric_passed`, so it is not score evidence.

No score change follows from that result. `EQ-24` still needs one retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ whose same coefficient row supplies a perturbation speed plus stress/strain or metric-compliance output without hidden retune.

## EQ-25: Thermodynamic, Boltzmann, Entropy, And Fluctuation Equations

### Standard Form

Kinetic comparison:

$$
\frac{df}{dt}
=
C[f].
$$

Entropy comparison:

$$
\frac{dS}{dt}\ge0.
$$

Fluctuation and correlation comparisons enter through two-point functions and noise kernels.

### AAA Mapping

Thermodynamic behavior should be derived from deterministic unresolved degrees of freedom, coarse-graining, record formation, and Noether sea mixing. It should not be inserted as ontic randomness.

Key AAA carriers:

- coarse-grained Noether sea distribution;
- unresolved boundary data;
- apparatus and record channels;
- local mixing and Lyapunov behavior;
- thermalization depth;
- finite-window measure.

### Closure Status

Current `6/23 b` score: `3`.

This is necessary for CMB, measurement, irreversibility, and statistical mechanics. The mapping now has a finite-window pushforward target, but no populated closure calculation yet.

Executable status: [eq25-thermodynamic-record-residual.mjs](../../../scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs) now evaluates the `EQ-25` finite-window thermodynamic record. The attempt fixture [eq25-thermodynamic-record-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_theta_therm`. Its state-space, deterministic-pushforward, collision-operator, entropy-balance, thermalization-depth, fluctuation, source-provenance, hidden-retune, and negative-control diagnostics pass, but those passes are not score evidence because every thermodynamic row remains `attempt`. The CMB source-chain fixture [eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json) binds those rows to one source-to-decoupling identity while keeping every row `attempt`, so it preserves the same blocker and score decision. The [EQ-25 Theta-Therm CMB Source-Field Map](eq-25-theta-therm-cmb-source-field-map.md) now carries a Direct Geometry Layer binding the thermal carrier, state-space, coarse-graining, measure, pushforward, projection, collision, entropy, thermalization, fluctuation, source-provenance, shared Noether sea, and no-hidden-retune rows to one CMB source-to-decoupling record.

### Closure Burden

A useful first closure equation would state a deterministic pushforward:

$$
f_{t+\Delta t}
=
\Phi_{\Delta t\,*}f_t
+
\mathcal R_{\mathrm{coarse}},
$$

then show when this admits a Boltzmann-like collision operator or entropy-production law after coarse-graining.

### Agent Target

Build one finite-window thermodynamic record for either CMB thermalization or measurement irreversibility. State what is deterministic, what is unresolved, and what becomes an effective statistical law.

## EQ-26: Atomic Spectral Constants, Fine/Hyperfine Structure, And Lamb-Shift Class

### Standard Form

The gross hydrogenic spectral benchmark is the Rydberg relation

$$
\frac{1}{\lambda}
=
R_\infty
\left(
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
\right),
\qquad
\Delta E=h\nu.
$$

The observation family then adds a controlled residual decomposition:

$$
E_{n\ell jm_F}
=
E_{\mathrm{Ryd}}(n)
+
\Delta E_{\mathrm{fine}}
+
\Delta E_{\mathrm{hfs}}
+
\Delta E_{\mathrm{Lamb}}
+
\Delta E_{\mathrm{field}}
+\cdots.
$$

### AAA Mapping

The existing [Atomic Spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md) chapter already frames $R_\infty$ as a shared spectral coefficient-row target rather than a line-by-line fit. This row records that observation pressure in the equation map. The gross line scale should come from one atomic envelope Noether braid record, local photon-channel speed, local clock/rate conversion, and Noether sea cell. Fine structure, spin-orbit splitting, hyperfine splitting, Zeeman/Stark response, and Lamb-shift-class residuals are downstream consumers of the angular-momentum ledger, ordered-frame spinor closure, radiation ledger, and measurement-response model.

The useful mapping is therefore not one equation but a nested benchmark:

$$
\Theta_{\mathrm H,\mathrm{spec}}
\longrightarrow
\left(
\widehat R_{\mathrm H},
\Delta E_{\mathrm{fine}},
\Delta E_{\mathrm{hfs}},
\Delta E_{\mathrm{Lamb}},
\mathcal R_{\mathrm{spec}}
\right).
$$

### Closure Status

Score: `3`.

The Rydberg coefficient-row target and hydrogen spectral residuals already exist locally. The missing derivation is still the native atomic envelope calculation plus the spin-sensitive and loop-sensitive residuals from the same Noether braid and Noether sea record.

Executable status: [eq26-hydrogen-spectral-carrier-identity-check.mjs](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs) now evaluates the score-neutral `EQ-26` hydrogen spectral carrier identity. The default source attempt [eq26-hydrogen-spectral-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-source-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_theta_H_spec`. The carrier-shell boundary [eq26-hydrogen-spectral-carrier-carrier-shell-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-carrier-shell-source-contract-attempt.v1.json) marks only the parent carrier accepted-looking, but the hardened checker rejects the source-contract shell at `accepted_without_evidence_source`; the child `missing_accepted_recovered_label_rows` boundary remains masked until a real source-backed `theta_H_spec` carrier replaces the contract shell. The observer-Rydberg-import, priority-source, and support-carrier-substitution negative controls fail closed, so observed line factors, priority prose, source-contract shells, photon/action support, Gate A support, and `theta_alpha` support cannot substitute for accepted hydrogen spectral evidence.

### Closure Burden

The row must recover:

- one transition-independent Rydberg readout for a declared weak-homogeneous line set;
- recovered envelope labels $(n,\ell,m)$ rather than imported orbital inputs;
- reduced-mass, recoil, local clock, and Noether sea corrections without absorbing them into a fitted $R_\infty$;
- spin-orbit, Zeeman, hyperfine, and Lamb-shift-class residuals as downstream angular-momentum, radiation, and measurement-response rows;
- a shared event ledger for absorption, emission, recoil, and non-radiative alternatives.

### Agent Target

Build an atomic spectral closure packet that starts with the existing hydrogen line-set residual and adds a residual taxonomy: gross envelope gap, clock/rate conversion, recoil/reduced-mass row, spin-sensitive row, and Lamb-shift-class radiation/wake-dressing row.

## EQ-26A: Fine-Structure Constant, Electromagnetic Coupling, And Energy Running

### Standard Form

The low-energy fine-structure constant is the dimensionless electromagnetic coupling

$$
\alpha
=
\frac{e^2}{4\pi\epsilon_0\hbar c_\gamma}.
$$

In precision comparisons it is not a fixed number at all scales. A compact running form is

$$
\frac{d\alpha^{-1}}{d\ln\mu}
=
-b(\mu),
\qquad
b(\mu)
=
\frac{2}{3\pi}
\sum_{f\in I_\mu}N_cQ_f^2
$$

for a declared effective charged-threshold inventory $I_\mu$ in the regime where a QED-like one-loop comparison is valid.

### AAA Mapping

`EQ-26` owns the atomic envelope and line-set residual. `EQ-26A` owns the dimensionless coupling row that those spectra consume. The mapped carrier is

$$
\Theta_\alpha
=
\left(
q_{\mathrm{obs}},
\hbar_{\mathbb A},
c_\gamma,
\mathcal E_S,
\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}}),
I_\mu
\right),
$$

where $q_{\mathrm{obs}}$ is the observer charge/exposure row, $\hbar_{\mathbb A}$ must come from `EQ-12A`, $c_\gamma$ is the photon-channel speed row, $\mathcal E_S$ is the exposed-sector record, $\mathcal K_{\mathrm{EM}}$ is the effective electromagnetic response kernel, and $I_\mu$ is the charged-threshold inventory. The residual should test both the reference coupling and the running trajectory:

$$
\mathcal R_\alpha
=
\left(
\Delta_{\alpha(0)},
\Delta_{\mathrm{Ryd}},
\Delta_{\mathrm{fs}},
\Delta_{\mathrm{run}},
\mathcal S_{\mathrm{retune}}
\right).
$$

The running component is not permission to fit pointwise couplings. It must come from one scale-dependent response row:

$$
\Delta_{\mathrm{run}}
=
\max_j
\frac{
\left|
\frac{\alpha_\theta^{-1}(\mu_{j+1})-\alpha_\theta^{-1}(\mu_j)}
{\ln(\mu_{j+1}/\mu_j)}
+
b_\theta(\mu_j)
\right|
}
{|b_\theta(\mu_j)|+\varepsilon_b}.
$$

Findability note: QFT-style ultraviolet divergence and renormalization questions route to `EQ-26A` only when the issue is scale-dependent electromagnetic response, vacuum polarization/wake dressing, charged-threshold inventory, and running couplings. That is distinct from the blackbody ultraviolet catastrophe handled by `EQ-22A`, which is a thermal mode-count/occupancy failure control.

The scale split is part of the row. The action period $h_\vartheta$, charge quantum, $q_{\mathrm{obs}}$, $c_\gamma$ at fixed Noether sea state, and $\theta_{\mathrm{sea}}$ are fixed across anchors. The running is allowed only in the response kernel and threshold inventory:

$$
\frac{\partial h_\vartheta}{\partial\ln\mu}=0,
\qquad
\frac{\partial c_\gamma}{\partial\ln\mu}=0
\text{ at fixed }\theta_{\mathrm{sea}},
\qquad
\alpha(\mu)=
\alpha[
\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}}),
I_\mu
].
$$

The strongest falsifier is the single-period test: fit $\alpha(0)$, an atomic fine-structure anchor, and one running point, then extract the implied $h_\vartheta$ from each through the `EQ-12A` action one-form row. If the extracted periods disagree under numerical refinement, or if matching $\alpha(\mu)$ requires $\partial h_\vartheta/\partial\ln\mu\ne0$, the Planck/action/coupling program is incoherent.

### Closure Status

Current `6/23 b` score: `2`.

The target is observationally sharp and structurally central, but current material has not derived charge normalization, electromagnetic response, $\hbar$, and photon-channel speed from one retained exposure/coupling domain. The running of $\alpha$ is therefore a high-priority closure target, not a solved result.

Executable status: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs) evaluates the score-neutral $\alpha(\mu)$ sub-residual together with `EQ-12A` and `EQ-22A`. The attempt fixture [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json) includes negative controls for scale-independent $\alpha$, hidden retune, and wrong mode/thermal Planck fits.

### Closure Burden

The row must recover:

- the reference coupling from observer charge exposure, `EQ-12A` action quantum, and photon-channel speed;
- the Rydberg and fine-structure scaling as consumers of the same $\alpha$ row rather than independent atomic fit knobs;
- a charged-threshold inventory and scale variable $\mu$ tied to detector or scattering resolution;
- a running residual that changes with energy scale through declared electromagnetic response, not through hidden changes in $h$, $c_\gamma$, charge exposure, or Noether sea state;
- a period-uniqueness falsifier showing that $\alpha(0)$, atomic fine structure, and a running point infer the same $h_\vartheta$ rather than a scale-dependent action unit;
- compatibility with `EQ-16` gauge/exposure rows, `EQ-27` magnetic moment rows, and `EQ-30` scattering/form-factor rows.

### Agent Target

Define the first $\Theta_\alpha$ attempt with a declared charged-threshold inventory, then compute $(\Delta_{\alpha(0)},\Delta_{\mathrm{run}},\mathcal S_{\mathrm{retune}})$ while keeping $q_{\mathrm{obs}}$, $\hbar_{\mathbb A}$, $c_\gamma$, and $\theta_{\mathrm{sea}}$ fixed across all scales.

## EQ-27: Magnetic Moment, Larmor/Cyclotron Precession, And G-2

### Standard Form

Magnetic moment and spin precession benchmarks are commonly summarized by

$$
\boldsymbol\mu_\ell
=
g_\ell
\frac{q_\ell}{2m_\ell}
\mathbf S,
\qquad
a_\ell
=
\frac{g_\ell-2}{2},
$$

with cyclotron and Larmor frequencies

$$
\omega_c=\frac{\lvert q_\ell\rvert B}{m_\ell},
\qquad
\omega_L=
g_\ell
\frac{\lvert q_\ell\rvert B}{2m_\ell}.
$$

### AAA Mapping

This observation family is a direct pressure test for internal Noether braid current geometry. The external magnetic moment is not allowed to be an assigned spin tag. It must be the exposed response of the retained assembly's ordered-frame spinor ledger, charge/polarity ledger, exposed mass response, and measurement apparatus row.

The anomaly $a_\ell$ is especially useful because it is small, precise, and sensitive to dressing. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, it should be treated as a residual between the leading internal current geometry and the full radiation/weak/hadronic/wake-dressed response:

$$
a_\ell^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
a_{\ell,\mathrm{int}}
+
a_{\ell,\mathrm{dress}}
+
\mathcal R_{g-2}.
$$

The minimal internal-current candidate should decompose the moment before any anomaly is assigned. For a retained lepton assembly $A$, write a first moment map as
$$
\boldsymbol\mu_A^{\mathrm{int}}
=
\sum_{\ell\in\{H,M,L\}}
\mu_\ell\,\hat{\mathbf n}_\ell
+
\sum_{a\in\mathcal S_{\mathrm{ax}}(A)}
\mu_a^{\mathrm{ax}}\,\hat{\mathbf n}_a
+
\Delta\boldsymbol\mu_{\mathrm{sea}}.
$$
The first sum is the three Noether braid core-binary contribution, the second is the axial-layer or polar-site current contribution, and $\Delta\boldsymbol\mu_{\mathrm{sea}}$ is the Noether sea and radiation-dressing response. This map is only useful if the same ordered-frame branch supplies $\hat{\mathbf n}_\ell$, $\hat{\mathbf n}_a$, exposed mass response, charge/polarity bookkeeping, and measurement coupling. The anomaly $a_\ell$ should then be the residual dressing and response after the leading internal moment map is fixed, not a replacement for the spin ledger.

### Closure Status

Score: `2`.

The angular-momentum proof program names the right consumers, but the current map does not yet derive $g_\ell$, $a_\ell$, or the magnetic precession frequencies from one retained Noether braid branch.

Current executable guardrail: [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs) consumes the shared `EQ-15`/`EQ-27` certificate $\mathfrak C_{\mathrm{spin}\to\mu}$. The retained-attempt fixture reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_ordered_frame_loop`; numeric $\eta_{\mathrm{spin}}=1$ and $g_{\mathrm{lead}}=2$ are not score evidence without accepted ordered-frame, moment-map, and exposure-fiber rows. The priority-source control [eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json) fails closed at `accepted_without_evidence_source`, preventing the magnetic-moment projection from treating priority/source-map prose as retained evidence. The [EQ-15 Direct Geometry Layer](eq-15-27-ordered-frame-loop-source-field-map.md#eq-15-direct-geometry-layer) and [EQ-27 Direct Geometry Layer](eq-15-27-ordered-frame-loop-source-field-map.md#eq-27-direct-geometry-layer) now bind spinor labels, $2\pi/4\pi$ restoration, Dirac/Klein-Gordon dispersion benchmarks, exchange behavior, gauge-control rows, angular-momentum ledgers, $\mathbf S$, $q_\ell/m_\ell$, $\boldsymbol\mu_\ell$, leading $g=2$, Larmor/cyclotron readouts, and $a_\ell$ to ordered-frame, exposure-current, covering-degree, effective EM, and exposure-fiber rows. The durable-source controls [eq15-27-ordered-frame-loop-record-split-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-record-split-durable-source-negative-control.v1.json) and [spin-magnetic-moment-assigned-spin-g2-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-assigned-spin-g2-durable-source-negative-control.v1.json) exercise the downstream blockers `record_split` and `eq27.assigned_spin_label`; both keep `scoreDecision: no_score_increase`.

Priority-only magnetism bridge: [EQ-15 And EQ-27 Ordered-Frame Loop Source-Field Map](eq-15-27-ordered-frame-loop-source-field-map.md#priority-only-magnetism-bridge-to-eq-13) records how `EQ-27` may consume `EQ-13` effective EM outputs. The bridge treats $\mathbf B_{\mathrm{eff}}^\theta$ as an observer-level connection/curl readout from event-bound effective EM rows, not as a substrate magnetic field. Magnet/iron-filing comparisons are allowed only as $\nabla(\boldsymbol\mu_{\mathrm{eff}}\cdot\mathbf B_{\mathrm{eff}}^\theta)$ benchmarks where $\boldsymbol\mu_{\mathrm{eff}}$ comes from the ordered-frame/internal-current ledger and $\mathbf B_{\mathrm{eff}}^\theta$ comes from `EQ-13` retained event rows.

### Closure Burden

The same branch must supply:

- charge polarity and exposed mass response;
- internal angular-momentum ledger and ordered-frame spinor support;
- magnetic moment projection into an external field branch;
- precession and measurement-response records;
- anomaly rows that do not retune the leading spin ledger separately for electron, muon, and tau comparisons.

### Agent Target

Replace the carrier-shell source-contract boundary with one durable non-priority `ordered_frame_loop` evidence object on a single `sameRecordId`, then populate `spin_lift` on that same record before any $\boldsymbol\mu_\ell$, leading-$g$, anomaly, or magnetic-precession comparison is reviewed. Until the ordered-frame and spin-lift rows are accepted, moment-map numerics and assigned-spin formulas remain score-neutral guardrails, not retained evidence.

## EQ-28: Compton, Photoelectric, Pair-Threshold, And Recoil Equations

### Standard Form

Compton scattering supplies an event-level wavelength-shift benchmark:

$$
\Delta\lambda
=
\lambda'-\lambda
=
\frac{h}{m_ec}
\left(
1-\cos\theta
\right).
$$

Photoelectric and pair-threshold comparisons supply threshold equations:

$$
K_{\max}=h\nu-\Phi,
\qquad
E_\gamma\ge2m_ec^2
$$

with the pair threshold requiring a momentum-balancing environment such as a nearby nucleus or material branch.

### AAA Mapping

These are high-value observation equations because they are event ledgers, not only field equations. A photon-channel packet arrives, a charged assembly or material branch receives recoil, and the final record must balance energy, momentum, angular momentum, polarity, photon channel, and Noether sea update.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ event packet can be stated schematically as

$$
\mathcal L_{\gamma e}^{\mathrm{in}}
\longrightarrow
\mathcal L_{\gamma'e'}^{\mathrm{out}}
+
\mathcal L_{\mathrm{recoil}}
+
\mathcal R_{\mathrm{event}}.
$$

### Closure Status

Score: `3`.

The corpus has radiation and reaction-provenance machinery, and Compton-like exchange already appears as a radiation-sector benchmark. The missing object is a compact event-level derivation that connects the photon channel packet, electron assembly response, recoil, and material/Noether sea row in one calculation.

### Closure Burden

The row must show:

- photon energy and momentum are packet-channel outputs, not free labels;
- recoil is recorded in the charged assembly or material branch;
- the same $h$ and exposed mass response used in atomic spectra also control the shift;
- pair-threshold and photoelectric cases differ by event topology, not by changing the underlying ledger rules;
- all non-radiative remnants and medium updates are explicit.

### Agent Target

Build a Compton/recoil event packet: declare the incoming photon-channel record, target assembly record, outgoing photon record, recoil row, and residual. Then show which assumptions are needed to recover the standard $\Delta\lambda$ form.

### Executable Reducer Status

[compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs) now replays the weak homogeneous comparison event for this row. The default run closes the algebraic comparison surface with status `comparison_replay_closed_native_rows_missing`: energy, momentum, inverse-energy Compton, and wavelength residuals are below `1e-10`, and the shared `EQ-26` variables match.

The direct native-event attempt [compton-recoil-native-event-attempt.v1.json](../../../scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json) fixes the row-reference shape for $\mathsf e_{\gamma e}^{0}$ and reports every required native row as `attempt`, so it also returns `comparison_replay_closed_native_rows_missing` and `scoreDecision=no_score_increase`. Native rows and the `medium`/`remnant` support rows must carry concrete retained references and the same `eventId`; accepted support rows must also carry explicit `delta_E` and `delta_p` fields. Bare `accepted` strings, event-id mismatches, omitted support deltas, and nonzero weak-homogeneous support deltas do not close the ledger.

No score change follows from that result. The run is still missing native photon Gate A/B rows, target and recoil retained branches, angular-momentum ledger update, Noether sea state row, the energy-momentum event ledger, and accepted medium/remnant support rows on the same $\mathsf e_{\gamma e}^{0}$ record. The checker's `--require-native-closed` mode exits nonzero until those rows are accepted.

The [EQ-13 And EQ-28 e_gamma_e_0 Gate A Source-Field Map](eq-13-28-e-gamma-e0-gate-a-source-field-map.md) now carries a Direct Geometry Layer for this event object, including the Gate A first row, native event ledger rows, recoil/remnant support rows, effective EM consumer rows, same-event bindings, fail-closed controls, and the smallest accepted evidence object.

## EQ-28A: Path-Frequency Exchange

Detailed packet: [EQ-28A Path-Frequency Exchange](eq-28a-path-frequency-exchange.md).

### Standard Form

For a photon packet crossing an exchange segment, the signed path-frequency increment is

$$
Y_{\gamma,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{\gamma,j}^{+}}{\nu_{\gamma,j}^{-}}.
$$

The exchange ledger must close

$$
\mathcal R_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{\mathrm{target},j}
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}.
$$

The inverse-Compton Thomson-limit benchmark is

$$
\frac{\nu^+}{\nu^-}
\simeq
\frac{4}{3}\gamma_e^2,
$$

with the regime condition $4\gamma_e h\nu^-\ll m_ec_\gamma^2$. The thermal and kinematic Sunyaev-Zeldovich comparison rows are

$$
y
=
\int
\frac{k_BT_e}{m_ec_\gamma^2}
n_e\sigma_T\,d\ell,
\qquad
\frac{\Delta T}{T}\simeq-2y,
$$

and

$$
\frac{\Delta T}{T}
\simeq
-\tau_e\frac{v_{\parallel}}{c_\gamma}.
$$

### AAA Mapping

`EQ-28A` treats these equations as observer-level recovery targets for one path-frequency exchange carrier:

$$
\Theta_{\nu\text{-}\mathrm{ex}}(W)
=
\left(
\gamma_{\mathrm{in}},
\theta_{\mathrm{sea}},
e^-/\mathrm{medium},
\gamma_{\mathrm{out}},
\Delta E,
\Delta\mathbf p,
\Delta\mathbf J,
\mathcal T_W,
\mathcal R_{\mathrm{ex}}
\right).
$$

The local inverse-Compton row, signed path-frequency increment, thermal SZ row, kinematic SZ row, photon Gate A/B handoff, and finite-window thermal record must share one photon path-history carrier. A match fails if frequency exchange is treated as phenomenological photon energy loss, pure expansion bookkeeping, source emission, or separately tuned SZ calibration.

### Closure Status

Current `6/23 b` score: `2`.

The standard formula families and native carriers are now named in the focused packet, but no accepted path-frequency exchange carrier, photon Gate A/B handoff, electron-medium population row, Noether sea path-history row, or finite-window thermal record exists. No score change for `EQ-12`, `EQ-17`, `EQ-22`, `EQ-22A`, `EQ-28`, or `EQ-29` follows from adding this suffix row.

Executable status: [eq28a-path-frequency-exchange-residual.mjs](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs) evaluates the score-neutral path-frequency exchange residual. The attempt fixture [eq28a-path-frequency-exchange-attempt.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-attempt.v1.json) reports `blocked_missing_accepted_path_frequency_exchange_carrier`, `scoreDecision=no_score_increase`, and first blocker `missing_accepted_path_frequency_exchange_carrier`; its inverse-Compton, path-frequency, thermal SZ, kinematic SZ, photon Gate A/B, source-provenance, hidden-retune, and negative-control diagnostics pass, but those passes are not score evidence because the exchange carrier and every row binding remain `attempt`. The accepted-source guard rejects priority packets, authored AAA prose, generated paths, attempts, toys, probes, source-evidence probes, mocks, source-contract shells, negative controls, and temporary paths as evidence for `Theta_nu-ex`; [eq28a-path-frequency-exchange-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-probe-source-negative-control.v1.json) keeps an accepted-looking parent carrier blocked with `carrierReason=accepted_without_evidence_source`. The carrier-shell source-contract boundary [eq28a-path-frequency-exchange-carrier-shell-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-carrier-shell-source-contract-attempt.v1.json) marks only the top `carrier` and `path_frequency_exchange_carrier` accepted-looking against [eq28a-path-frequency-exchange-carrier-shell-source-contract.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-carrier-shell-source-contract.v1.json); the hardened checker rejects the contract shell itself, remains at `blocked_missing_accepted_path_frequency_exchange_carrier` with `carrierReason=accepted_without_evidence_source`, keeps `scoreDecision=no_score_increase`, and stays non-populated under `--require-populated`.

### Closure Burden

The first residual is

$$
\mathcal R_{28A}^{\nu\text{-}\mathrm{ex}}
=
\mathcal R_{\mathrm{IC}}
+\lambda_Y\mathcal R_Y
+\lambda_{\mathrm{tSZ}}\mathcal R_{\mathrm{tSZ}}
+\lambda_{\mathrm{kSZ}}\mathcal R_{\mathrm{kSZ}}
+\lambda_G\mathcal R_{\mathrm{GateAB}}
+\lambda_{\mathrm{prov}}\mathcal R_{\mathrm{prov}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

The first blocker is `missing_accepted_path_frequency_exchange_carrier`: one source-backed $\Theta_{\nu\text{-}\mathrm{ex}}(W)$ must declare photon packet identity, frequency exchange, electron-medium state, recoil/remnant rows, finite-window thermal state, and the shared path-history Noether sea record before any stronger score or reader-facing promotion is justified.

### Agent Target

Populate the `EQ-28A` path-frequency exchange carrier behind the solver residual with an actual source-backed row, then populate the first child `theta_gamma_packet` row on the same carrier. The next useful artifact is a retained source row that keeps local Compton exchange, SZ calibration, photon Gate A/B handoff, recoil/remnant updates, and finite-window thermal state on one path record rather than a contract-shell source.

## EQ-29: Larmor/Lienard Radiation, Synchrotron, Bremsstrahlung, And Thermal Channels

### Standard Form

Classical radiation power benchmarks include the nonrelativistic Larmor form

$$
P_L
=
\frac{q^2a^2}{6\pi\epsilon_0c^3},
$$

and the relativistic Lienard comparison

$$
P
=
\frac{q^2\gamma^6}{6\pi\epsilon_0c^3}
\left(
a^2
-
\frac{\lVert\mathbf v\times\mathbf a\rVert^2}{c^2}
\right).
$$

Synchrotron observations add characteristic spectral and polarization benchmarks, with schematic scale

$$
\nu_c\propto\gamma^2B.
$$

### AAA Mapping

The key discipline is to keep carrier/channel family separate from source mechanism. Atomic transition radiation, bremsstrahlung, synchrotron radiation, thermal/blackbody radiation, Compton-like exchange, reaction-product radiation, and gravitational-wave tensor disturbances should not be collapsed into one mechanism just because they are all observed as radiative outputs. Each source class must declare which assembly, wake, recoil, material, photon-channel, or tensor-disturbance ledger produced the outgoing record.

For photon-channel radiation, the event map is

$$
\mathcal B_{\mathrm{source}}
\longrightarrow
\left(
\mathcal L_{\gamma},
\mathcal L_{\mathrm{recoil}},
\mathcal L_{\mathrm{medium}},
\mathcal R_{\mathrm{rad}}
\right),
$$

where $\mathcal R_{\mathrm{rad}}$ selects admissible output channels and carries the residual against the benchmark power or spectrum.

### Closure Status

Score: `3`.

The radiation sector already names Larmor/Lienard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, and blackbody benchmark regions. The open work is to derive emitted power, direction, polarization, spectrum, recoil, and source cooling from the same ledger for each source mechanism.

Executable status: [eq29-radiation-source-ledger-residual.mjs](../../../scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs) now evaluates the direct `EQ-29` radiation source-ledger residual for a synchrotron source packet. Its source-attempt fixture [eq29-radiation-source-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-source-attempt.v1.json) reports `status: blocked_missing_rows`, `nextBlocker: missing_accepted_radiation_source_carrier`, `sourceLedgerNumericPass: true`, and `negativeControlPassCount: 6`; no score change follows because the radiation source rows remain attempt-level. The one-row carrier source-evidence probe [eq29-radiation-source-carrier-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-source-evidence-probe.v1.json) marks only `radiation_source_carrier` accepted-looking with explicit EQ-29/radiation-source support metadata; it remains score-neutral and advances only to `nextBlocker=missing_accepted_carrier_channel_family_row`. The channel-family source-evidence probe [eq29-radiation-source-carrier-channel-family-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-evidence-probe.v1.json) marks `carrier_channel_family_row` accepted-looking with explicit photon-channel output family support metadata; it remains score-neutral and advances only to `nextBlocker=missing_accepted_source_mechanism_row`. The source-mechanism source-evidence probe [eq29-radiation-source-carrier-channel-family-source-mechanism-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-source-evidence-probe.v1.json) marks `source_mechanism_row` accepted-looking with explicit synchrotron source-mechanism support metadata; it remains score-neutral and advances only to `nextBlocker=missing_accepted_source_branch_row`. The metadata-missing carrier control [eq29-radiation-source-carrier-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-metadata-missing-negative-control.v1.json) blocks the same durable source path at `missing_accepted_radiation_source_carrier` with `accepted_without_evidence_source`. The channel-family metadata-missing and family-collapse controls [eq29-radiation-source-carrier-channel-family-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-metadata-missing-negative-control.v1.json) and [eq29-radiation-source-carrier-channel-family-collapse-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-collapse-negative-control.v1.json) block at `missing_accepted_carrier_channel_family_row`, respectively with `accepted_without_evidence_source` and `carrier_channel_family_source_contract_mismatch`. The source-mechanism metadata-missing, generic-collapse, and non-synchrotron controls [eq29-radiation-source-carrier-channel-family-source-mechanism-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-metadata-missing-negative-control.v1.json), [eq29-radiation-source-carrier-channel-family-source-mechanism-collapse-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-collapse-negative-control.v1.json), and [eq29-radiation-source-carrier-channel-family-source-mechanism-nonsynchrotron-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-nonsynchrotron-negative-control.v1.json) block at `missing_accepted_source_mechanism_row`, respectively with `accepted_without_evidence_source` and `source_mechanism_source_contract_mismatch`. The broader coordination-source, probe-source, and unrelated durable-source controls also fail closed, so priority/source-map files, probe fixtures, generic radiation-source metadata, non-synchrotron mechanism metadata, and durable files without row-specific support metadata cannot satisfy accepted retained evidence rows.

The [EQ-29 Radiation Source Carrier Source-Field Map](eq-29-radiation-source-carrier-source-field-map.md) now carries the Direct Geometry Layer for the synchrotron source object, including carrier/channel/mechanism separation, same-record source-ledger bindings, row-specific source-support metadata, and the smallest accepted evidence object.

### Closure Burden

The row must recover:

- total emitted power and spectral distribution;
- source energy loss and recoil;
- polarization and angular-momentum balance;
- medium and Noether sea updates;
- thermal and blackbody limits without replacing the event ledger by an independent statistical fit.

### Agent Target

Populate the radiation-source ledger with accepted retained evidence. The current checker starts with synchrotron and names the first accepted-evidence target as `radiation_source_carrier`; after that, add the source mechanism, source branch, Noether sea magnetic state, photon Gate A/B output, source depletion, recoil/medium/wake/remnant rows, power/spectrum, cooling, polarization, event ledger, source provenance, and no-hidden-retune rows on the same carrier.

## EQ-30: Scattering Cross Sections And Form Factors

### Standard Form

Scattering experiments reduce many event histories into cross sections:

$$
d\sigma_{a\to b}
=
\frac{1}{\mathcal F}
\lvert\mathcal M_{a\to b}\rvert^2
d\Pi_b,
$$

where $\mathcal F$ is a flux factor and $d\Pi_b$ is final-state phase space. Form factors encode finite-size or exposure distributions:

$$
F(\mathbf q)
=
\int d^3x\,
\rho_{\mathrm{exp}}(\mathbf x)
e^{i\mathbf q\cdot\mathbf x}.
$$

### AAA Mapping

Cross sections are record statistics over many prepared events. They should be recovered from the deterministic branch ensemble, detector kernel, flux/readout calibration, and admissible final-state ledgers. Form factors are especially useful because they pressure the theory to expose real spatial, phase, or wake-distribution structure instead of treating a particle as a featureless point by default.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison object is

$$
\sigma_{a\to b}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\int_{\Gamma_a}
\mathbf 1_{b}
\left(
\Phi_{\Delta t}(x)
\right)
K_{\mathrm{det}}(x)\,d\mu_a(x)
+
\mathcal R_{\sigma}.
$$

The `6/23 b` common-architecture refinement factors this as a projection of the finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$. That carrier holds the retained window, transition map, branch measure, coarse-graining, detector kernel, outcome partition, optional corridor family, and no-hidden-retune witness once, so rate and form-factor rows cannot be normalized independently.

### Closure Status

Score: `2`.

The quantum/Born-current rows provide the broad statistical target, but the equation map does not yet connect specific scattering amplitudes, detector kernels, exposure distributions, and form factors to Noether braid branch statistics.

Executable status: [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs) now evaluates the `EQ-30` elastic scattering/form-factor projection from the shared finite-window statistical carrier. The toy fixture [finite-window-statistical-carrier-eq30-elastic-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_W`, and passing numeric checks for prepared flux, detector refinement, cross-section normalization, form-factor covariance, and elastic-regime purity. The source-evidence ladder now advances through `elastic_regime`: [finite-window-statistical-carrier-eq30-elastic-regime-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-regime-source-evidence-probe.v1.json) reports `status: blocked_carrier_not_retained`, `scoreDecision: no_score_increase`, `eq30RowsAccepted: true`, and `nextBlocker: same_record_binding_missing`; the top carrier remains `attempt` and the row ladder still needs explicit one-record carrier bindings. The top-carrier source-contract attempt [finite-window-statistical-carrier-eq30-elastic-regime-top-carrier-source-contract-attempt.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-regime-top-carrier-source-contract-attempt.v1.json) names the durable path, carrier-level `EQ-30` retained/top finite-window support metadata, explicit `carrierId` bindings across the parent and projection rows, and `exposureDistributionId` bindings for the form-factor samples; it reports `carrierSourceContractReady: true`, `carrierSameRecordBindingReady: true`, and `nextBlocker: top_carrier_not_retained` while still returning `blocked_carrier_not_retained`. The coordination-source, generic durable-source, row-name-only durable-source, and same-record split controls fail at `accepted_without_evidence_source`, `carrier_source_contract_mismatch`, or `blocked_eq30_same_record_binding`, so accepted parent and projection rows cannot retain the carrier unless the carrier itself is accepted, its source contract names both `EQ-30` and retained/top finite-window carrier support, every parent/projection row shares one `carrierId`, and form-factor samples bind to the same exposure-distribution row. These numeric, source-contract, and same-record passes are not score evidence because no retained top finite-window carrier exists.

### Closure Burden

The row must show:

- how prepared flux maps into a branch ensemble;
- how final-state classes are selected by detector kernels;
- why the observed rate scales like the standard cross section in the validated limit;
- how $F(Q^2)$ reads finite Noether braid, wake, or exposure structure;
- how deep-inelastic and elastic limits arise without changing the ontology.

### Agent Target

Build one scattering packet, such as elastic electron-proton scattering or neutrino charged-current scattering, that declares the prepared ensemble, detector kernel, exposure distribution, event classes, and standard cross-section residual.

## EQ-31: Resonance Widths, Lifetimes, And Branching Fractions

### Standard Form

Metastable states commonly appear through Breit-Wigner-like resonance profiles:

$$
A(E)
\propto
\frac{1}{E-E_0+i\Gamma/2},
\qquad
\sigma(E)\propto
\frac{\Gamma^2/4}
{(E-E_0)^2+\Gamma^2/4}.
$$

The lifetime-width relation is

$$
\tau
=
\frac{\hbar}{\Gamma},
$$

and branching fractions summarize admissible decay-channel weights:

$$
\sum_k B_k=1.
$$

### AAA Mapping

This row asks whether a metastable Noether braid branch has a native leakage corridor. The central energy $E_0$ should be a branch energy or externally exposed mass response. The width $\Gamma$ should be a finite-window escape, dephasing, or decay-corridor rate, not an unexplained parameter. Branching fractions should come from the relative measure of admissible exit ledgers after conservation, weak/strong/electromagnetic exposure, and detector response are held fixed.

The same finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$ should specialize to the metastable case by taking the retained branch window as $W$, the exit corridors as first-exit components $\mathcal C=\{C_k\}$, and the observed final-state classes as the outcome partition. Then $\Gamma$, $\tau$, $B_k$, and detector line-shape residuals are projections from one escape/dephasing measure. The first-exit map should be intrinsic to the basin boundary; detector kernels enter afterward as readout pushforwards.

The current executable carrier evaluator computes those projection rows for a two-corridor toy packet and correctly returns `toy_structure_only` with `scoreDecision: no_score_increase`. It now also reports first-exit corridor semantics, null-separatrix mass, and refinement-cocycle diagnostics. The original toy declares first-exit corridors but keeps null-separatrix and refinement compatibility failing, while [finite-window-statistical-carrier-eq31-null-separatrix-refinement-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-null-separatrix-refinement-toy.v1.json) supplies pre-detector first-exit preimage rows, a decreasing epsilon sequence, and restriction-row refinement data that pass numerically. Both remain toy evidence. The charged-pion source-evidence ladder now advances through `C`: [finite-window-statistical-carrier-eq31-pion-c-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-source-evidence-probe.v1.json) reports `scoreDecision: no_score_increase`, `status: blocked_carrier_not_retained`, `acceptedCarrierRows: true`, and `nextBlocker: top_carrier_not_retained`; the top carrier remains `attempt`, so no retained finite-window carrier or score change follows. The Direct Geometry Layer in [EQ-14/EQ-30/EQ-31 Finite-Window W Source-Field Map](eq-14-30-31-finite-window-w-source-field-map.md#eq-31-direct-geometry-layer) now binds $E_0$, $\Gamma$, $\tau$, branching fractions, line-shape readouts, null-separatrix estimates, refinement compatibility, and the top carrier to the same metastable branch/corridor record. The top-carrier coordination-source control [finite-window-statistical-carrier-eq31-pion-c-top-carrier-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-coordination-source-negative-control.v1.json) marks the carrier accepted-looking but sources it only to the priority map; it fails at `accepted_without_evidence_source`, proving parent rows alone cannot retain the carrier. The generic durable-source control [finite-window-statistical-carrier-eq31-pion-c-top-carrier-generic-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-generic-durable-source-negative-control.v1.json) and row-name-only durable-source control [finite-window-statistical-carrier-eq31-pion-c-top-carrier-row-name-only-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-row-name-only-durable-source-negative-control.v1.json) both fail at `carrier_source_contract_mismatch`, while [finite-window-statistical-carrier-eq31-pion-c-top-carrier-same-record-split-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-same-record-split-negative-control.v1.json) fails at `blocked_eq31_same_record_binding`; so a real retained top-carrier source must declare both `EQ-31` and retained top finite-window carrier support and bind every parent/corridor row to the same `carrierId`.

### Closure Status

Score: `2`.

The corpus has decay and reaction provenance language, but the resonance-width equation has not yet been turned into a Noether braid stability calculation.

### Closure Burden

The row must recover:

- central resonance energy from a retained branch;
- width from branch stability, leakage, or corridor coupling;
- lifetime from the same width without independent fitting;
- branching fractions from admissible exit-ledger weights;
- threshold, interference, and detector effects as explicit residuals.

### Agent Target

Choose one resonance or unstable particle and write the branch-stability packet: retained state, perturbation/exit corridors, conservation rows, candidate $\Gamma$, branching fractions, and falsifier.

## EQ-32: Baryonic Tully-Fisher And Radial-Acceleration Relation

### Standard Form

Galaxy rotation data show a tight low-acceleration regularity often summarized by the radial-acceleration relation

$$
g_{\mathrm{obs}}
=
\nu
\left(
\frac{g_{\mathrm{bar}}}{a_0}
\right)
g_{\mathrm{bar}},
$$

with deep low-acceleration limit

$$
g_{\mathrm{obs}}
\approx
\sqrt{g_{\mathrm{bar}}a_0}.
$$

The flat-velocity form is the baryonic Tully-Fisher relation:

$$
v_f^4
=
GM_ba_0.
$$

### AAA Mapping

This is not a direct tri-binary particle row. It is an observation-first constitutive-response benchmark for the Noether sea around baryonic assemblies. The useful question is whether a shared Noether sea response law can make the apparent acceleration depart from the baryonic Newtonian estimate in the low-acceleration regime while preserving lensing, structure growth, CMB, BBN, and local gravity constraints.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison form is

$$
\mathbf g_{\mathrm{obs}}
=
\mathcal M_{\mathrm{sea}}
\left[
\rho_{\mathrm{bar}},
\rho_{\mathrm{NS}},
n,
\chi_{\text{sea}},
\mathbf u_{\mathrm{sea}}
\right]
\mathbf g_{\mathrm{bar}}
+
\mathcal R_{\mathrm{RAR}}.
$$

This comparison belongs inside the same shared observation record as growth, CMB, and BBN. The low-acceleration scale $a_\star^\theta(E)$ and any apparent $a_0$ row should be outputs of the shared Noether sea response, not a separate galaxy-only constant.

Findability note: MOND and MOND-like interpolation laws belong here only as observer-level RAR/BTFR comparison forms. The row must not promote a MOND law into substrate ontology; the accepted object remains a shared Noether sea constitutive response compatible with lensing, CMB, BBN, growth, and local gravity.

### Closure Status

Current `6/23 b` score: `3`.

The equation is a strong observational benchmark, and the current $\mathbb{A}\mathbb{A}\mathbb{A}$ map is now a shared constitutive-response target. It should not be imported as a new gravity ontology or as permission to bypass the effective-metric and cosmology rows.

Executable status: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) now evaluates the shared `EQ-21`/`EQ-22`/`EQ-23`/`EQ-32` residual family. The current attempt fixture is score-neutral and reports `blocked_missing_rows`, with first blocker `missing_accepted_theta_obs`; no `EQ-32` score change follows from the structural run. The full-input source-attempt fixture [shared-observation-theta-src-source-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json) gives `theta_src` a concrete source-window shape while keeping all rows `attempt`; `--focus-row theta_src` reports `missing_accepted_theta_src` as diagnostic detail only. The sharper physical `EQ-32` route now has a score-neutral `delta_a_star` projection probe in [noether-sea-density-compression-eq32-delta-a-star-source-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-eq32-delta-a-star-source-attempt.v1.json): the density-compression runner projects `delta_a_star` for `EQ32_low_acceleration` but still blocks readiness at `missing_accepted_theta_sea_rho_NS`. The shared source-window packet [EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map](eq-21-22-23-theta-src-source-field-map.md) now carries a Direct Geometry Layer for `Theta_src`; for `EQ-32`, that layer is boundary-only and keeps galaxy response blocked behind `theta_sea_rho_NS` and `delta_a_star`.

### Closure Burden

The row must show:

- the scale $a_0$ arises from Noether sea state or galaxy-environment response rather than a fitted universal constant alone;
- lensing reads the same effective metric response as dynamics;
- the relation is compatible with structure growth, CMB, BBN, and local tests;
- baryonic morphology and feedback enter as declared source records, not hidden fit knobs;
- the Newtonian/high-acceleration limit is recovered.

### Agent Target

Write a radial-acceleration closure packet that treats $a_0$ as an output candidate of the Noether sea constitutive law, identifies the shared gravity/cosmology constraints, and states the first failure mode.

## Ranked Closure Priorities

Cross-cutting solver priority: the stable tri-binary configuration search should consume the equation map through [Equation-Map Bearing On Braid Configuration Search](../braid-retained-branch-closure/equation-map-bearing-on-braid-configuration-search.md). The active role-assigned frequency families are $(I,M,O)=(f+2,f,f-1)$, $(I,M,O)=(f+1,f,f-1)$, $(I,M,O)=(f,f,f)$, $(I,M,O)=(4f,2f,f)$, and $(I,M,O)=(nf,mf,f)$. These are search candidates, not conclusions; acceptance should depend on the retained root, geometry/energy, phase-operator, event-ledger, wake/recoil, stability, and observation residuals emitted from the same branch record.

Current executable reducer guardrail: `scripts/equation-mapping/check-emit-02-04-contract.mjs` consumes the solver report's `cases[].branchChartProjection.equationBearing` payload and maps it onto $\operatorname{Emit}_{02\text{-}04}^{\mathrm{bin}}(u_k)$. The 2026-06-23 equal-frequency smoke result is `blocked_not_evaluable` with 0 evaluable cases, 7 blocked cases, `retainedBranchClaim=false`, and `scoreDecision=no_score_increase`. This checker sharpens the `EQ-02` through `EQ-04` reducer burden but does not justify any `6/23 b` score change.

1. `EQ-02` and `EQ-03`: Lorentz factor, clock/ruler retuning, and oblate spheroidal envelope. These already have the strongest visual and algebraic bridge.
2. `EQ-04` and `EQ-04A`: energy-momentum, rest energy, and the Koide charged-lepton benchmark. This should attach the Lorentz envelope to mass-map work, then check whether one charged-lepton mass map lands near the Koide surface without direct fitting.
3. `EQ-07` through `EQ-10`: effective metric and weak-field observables. This turns local braid/sea response into GR-facing tests.
4. `EQ-07` through `EQ-10` plus compact-object support benchmarks: collapse-scale compression. Recover Chandrasekhar support scaling, TOV pressure-gravity comparison, material Noether braid scale compression, and effective spatial-compliance response from one retained compact-region record.
5. `EQ-17` through `EQ-19`: redshift, effective FRW, and Friedmann transfer. This is the main cosmology bridge.
6. `EQ-21` through `EQ-23` plus `EQ-22A`: structure, CMB, Planck blackbody mode occupancy, and BBN transfer. These are large but necessary for cosmology closure.
7. `EQ-12` through `EQ-16A` plus `EQ-12A`: photon, Planck action quantum, Maxwell, quantum, spinor, gauge, and neutrino phase-gap equations. These are central but require more branch and record machinery; `EQ-12A` is the shared action-unit row and `EQ-16A` is the smallest precise weak-sector packet because neutrino oscillation supplies a two-gap benchmark.
8. `EQ-26` through `EQ-31` plus `EQ-26A`: atomic spectra, fine-structure coupling/running, magnetic moments, recoil/radiation, scattering, and resonance widths. These are observation-first precision surfaces that should discipline the Noether braid event, spin, radiation, coupling, and branch-stability ledgers.
9. `EQ-32`: baryonic Tully-Fisher and radial-acceleration relation. This is a high-value low-acceleration constitutive-response benchmark, but it should stay downstream of the effective-metric and cosmology rows.
10. `EQ-24` and `EQ-25`: medium and thermodynamic equations. These are broad support equations that should be driven by concrete consumers.

## New-Thread Prompt

```text
Closure goal:
Run a multi-agent equation-mapping closure pass that assigns one standard physics or cosmology equation group to each worker and advances each assigned map toward a concrete AAA closure packet.

Use the AAA corpus advancement skill in team-agent mode.

Context:
- Priority folder: `reference/priorities/equation-mapping/`.
- Start with `reference/priorities/equation-mapping/equation-mapping.md` and `reference/priorities/equation-mapping/equation.md`.
- The line items in `equation.md` use dated score columns from `0` to `5`; `6/23 a` is the first-round score, and `6/23 b` records prior worker-backed score decisions where populated, not accepted-evidence authority for future score-change review. Suffix rows such as `EQ-04A`, `EQ-12A`, `EQ-22A`, and `EQ-26A` are first-class rows for tightly coupled constants or sub-equation closures that should not renumber the existing inventory.
- The current high-value bridge is:
  `Noether braid closure -> (xi, Gamma_N, chi_sea, rho_NS) -> g_eff -> (H_eff, z, D(z), P(k,z))`.
- The collapse-scale compression bridge is now first-class. Use `reference/priorities/equation-mapping/eq-07-10-17-19-effective-metric-cosmology-packet.md#collapse-scale-derivation-expansion-target` to flesh out Chandrasekhar support scaling, TOV pressure-gravity comparison, material Noether braid scale compression, compact-region energy/reaction ledgers, and the shared $\mathcal{S}_{\mathrm{mat}}\to\mathcal{S}_{\mathrm{metric}}$ projection from one retained carrier.
- Stable tri-binary branch search uses role-assigned $I:M:O$ triples after generic binary labels are mapped. Active families include $(f+2,f,f-1)$, $(f+1,f,f-1)$, $(f,f,f)$, $(4f,2f,f)$, and $(nf,mf,f)$. Treat these as search coordinates and consume the fail-closed solver-facing `equationBearing` residual payload before ranking them.
- The immediate objective is not broad prose. It is one bidirectional closure packet per equation group: established equation, $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery map, inverse clues from the established formula back into native variables, assumptions, missing derivation, first proof/simulation step, failure mode, and promotion targets.
- Multiple agents may be running at the same time. Treat the assignment list as a concurrency boundary: each worker owns only its assigned equation IDs unless the coordinator explicitly reassigns scope.

Task:
1. Run `git status --short --untracked-files=all` first. Do not revert existing changes.
2. Read the two equation-mapping files.
3. Start parallel workers if the environment supports it. Assign one line item or tightly related group per worker, and tell each worker which equation IDs it owns. Prefer these first if worker count is limited:
   - `EQ-02` and `EQ-03`: Lorentz factor, clock/ruler retuning, and oblate spheroidal envelope.
   - `EQ-04` and `EQ-04A`: energy-momentum, rest energy, charged-lepton generation-by-shielding, and Koide as a no-retune mass-map residual.
   - `EQ-07` through `EQ-10`: effective metric, weak-field clocks, PPN, and geodesic benchmarks.
   - `EQ-07` through `EQ-10` collapse-scale branch: Chandrasekhar support scaling, TOV comparison pressure, material scale compression, compact-region energy/reaction ledgers, and the shared $\mathcal{S}_{\mathrm{mat}}\to\mathcal{S}_{\mathrm{metric}}$ projection.
   - `EQ-17` through `EQ-19`: redshift, effective FRW, Friedmann, and cosmological continuity.
   - `EQ-21` through `EQ-23` plus `EQ-22A`: structure growth, CMB transfer, Planck blackbody mode occupancy, and BBN yields.
   - `EQ-12` through `EQ-16A` plus `EQ-12A`: photon, Planck action quantum, Maxwell, quantum-wave, spinor, gauge, and neutrino phase-gap equations.
   - `EQ-26` through `EQ-31` plus `EQ-26A`: atomic spectra, fine-structure coupling/running, magnetic moment and g-2, Compton/recoil, radiation power, cross sections/form factors, and resonance widths.
   - `EQ-32`: baryonic Tully-Fisher and radial-acceleration relation as Noether sea constitutive-response benchmarks.
   - `EQ-06`, `EQ-24`, and `EQ-25`: Noether sea continuum, medium equations, and thermodynamic/statistical equations.
4. Each worker must inspect the relevant canonical and priority files before writing. Use targeted `rg` searches for the equation family, the AAA variables, and the target documents listed in the promotion map.
5. Each worker should produce a bidirectional closure packet with:
   - standard equation and regime;
   - current $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery or comparison form;
   - inverse clues from the established formula back into native variables, records, or missing derivations;
   - required Noether braid variables;
   - required Noether sea variables;
   - event, wake, branch, record, or residual rows needed;
   - an Equation Attack Card with current score, closure driver, primary carrier, smallest accepted evidence object, exact first blocker, existing scripts/fixtures/packets, fail-closed negative control, and smaller next action;
   - a Direct Geometry Layer table mapping each comparison term to its $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout, required carrier or row, same-record binding, fail-closed negative control, and smallest accepted evidence object;
   - score-change review only if accepted retained evidence actually lands; otherwise write no score changes and name the exact first blocker plus smallest accepted evidence object;
   - first mathematical object to add next: definition, lemma, residual, simulation target, or proof route;
   - failure mode or falsifier;
   - candidate promotion targets under `content/markdown/aaa`, if the packet matures.
6. To avoid concurrent write collisions, prefer one sibling detail file per assigned equation group when multiple agents are active. Use `equation.md` for summary-table updates only after the coordinator has collected worker outputs.
7. If a worker claims score change, require accepted retained evidence plus checker or validation support before updating the next active dated score column. Contracts, attempt fixtures, source maps, toy fixtures, negative controls, Direct Geometry Layer tables, priority prose, authored AAA prose, generated files/copies, mocks, probes, source-evidence probes, temporary paths, directory paths, self-source shells, and source-contract shells stay no-score-change.

Scope:
- Edit authority: direct edits allowed under `reference/priorities/equation-mapping/`.
- Do not edit reader-facing `content/markdown/aaa` pages in this pass unless the result is small, safe, and clearly promoted by an already-closed packet.
- Do not introduce new project terminology. Use canonical terms: Noether sea, Noether braid, oblate spheroidal envelope, Noether sea delay factor, physical Noether braid density, normalized Noether braid density, cadence stretch.
- Do not link from authored AAA pages to priority files.

Constraints:
- Preserve TeX delimiters and TeX content carefully.
- Use relative links in markdown.
- Keep standard equations as recovery targets or comparison equations unless the local derivation actually closes.
- Distinguish ontology, derivation/closure target, effective summary, and speculation.
- Do not create new gates or ledgers unless they protect a tested observable, mathematical consistency condition, or active proof route not already protected by existing material.

Validation:
- After equation-mapping priority or checker edits, run:
  `git diff --check`
  `node scripts/validate-content.mjs --check --strict`
  `node scripts/build-scene-graph.mjs --check --strict`
- If a checker, fixture, or executable-status claim was edited, also rerun the relevant equation-specific checker named in the edited line.

Expected output:
- Files changed.
- Worker assignment summary.
- Closure packets completed.
- Score changes, if any.
- Open blockers by equation ID.
- Recommended next multi-agent batch.
- Validation status.
- End with a concise `Closure goal:` line.
```
