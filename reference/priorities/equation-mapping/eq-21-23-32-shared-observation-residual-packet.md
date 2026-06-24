# EQ-21 Through EQ-23 And EQ-32 Shared-Observation Residual Packet

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior packet: [EQ-21 Through EQ-23 And EQ-32 Structure/CMB/BBN/RAR Packet](eq-21-23-32-structure-cmb-bbn-rar-packet.md)
- Upstream interface: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Assigned IDs: `EQ-21`, `EQ-22`, `EQ-22A`, `EQ-23`, `EQ-32`
- Status: `second-round residual packet`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits in this packet
- Claim bucket: derivation/closure target with observer-level effective summaries

## Closure Thesis

`EQ-21`, `EQ-22`, `EQ-22A`, `EQ-23`, and `EQ-32` should be evaluated as one shared-observation family. The useful object is not independent fits to growth, CMB, BBN, Planck blackbody occupancy, and galaxy acceleration. The useful object is a retained record whose projections recover:

- structure growth and matter power;
- CMB transfer, blackbody preservation, acoustic phase, and CMB lensing;
- Planck blackbody occupancy, mode counting, zero photon chemical potential, and thermalization depth;
- BBN freezeout, light-element yields, photon loading, and neutrino rows;
- baryonic Tully-Fisher and radial-acceleration behavior in the low-acceleration galaxy regime.

The second-round residual should make hidden retuning visible. A branch may project differently into a BBN source window, a CMB last-scattering/transport record, a linear-growth record, and a galaxy low-acceleration record, but overlapping rows must share provenance and declared transformation rules. If one row changes $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, baryon loading, neutral-assembly loading, or effective readout variables independently, the packet fails even if each observable fits in isolation.

## Retained Shared Record

Use the prior packet's $\Theta_{21\text{-}23\text{-}32}$ as the parent record and refine it into four reusable subrecords:

$$
\Theta_{\mathrm{obs}}
=
\left(
\Theta_{\mathrm{src}},
\Theta_{\mathrm{read}},
\Theta_{\mathrm{therm/prov}},
\Theta_{\mathrm{gal}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
\right).
$$

The subrecords are:

$$
\Theta_{\mathrm{src}}
=
\left(
\mathcal{N}_{\mathrm{sea}}(W_{\mathrm{src}}),
\rho_{\mathrm{bar}}(W_{\mathrm{src}}),
\rho_A(W_{\mathrm{src}}),
T^\theta(t),
\rho^\theta(t),
\eta^\theta,
N_{\text{eff}}^\theta,
\mathbf{Y}_{\mathrm{BBN}}^\theta,
\mathcal{E}_{i,s}^{\theta}
\right),
$$

$$
\Theta_{\mathrm{read}}
=
\left(
a_{\mathrm{eff}}^\theta,
H_{\mathrm{eff}}^\theta,
D_A^\theta,
D_L^\theta,
z^\theta,
T_0^\theta,
z_{\mathrm{eq}}^\theta,
k_{\mathrm{eq}}^\theta,
r_s^\theta
\right),
$$

$$
\Theta_{\mathrm{therm/prov}}
=
\left(
\mathcal{D}_{\mathrm{th}}^{\mathrm{BBN}},
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}},
\chi_{\mathrm{op}}^\theta,
B_{\mathrm{therm}}^\theta,
B_{\mathrm{loss}}^\theta,
\mathcal{F}_{\gamma}^\theta,
\eta_B^{\mathrm{ledger}},
\Delta f_\gamma^\theta,
\Delta f_\nu^\theta
\right),
$$

$$
\Theta_{\mathrm{gal}}
=
\left(
\Pi_{\mathrm{gal}}\theta_{\mathrm{sea}},
\rho_{\mathrm{bar}},
\rho_A,
\mathcal{M}_{\mathrm{sea}}^{ab},
G_{\mathrm{eff}}^\theta,
a_\star^\theta(E),
f^\theta(E),
\mathcal{I}_{\mathrm{loc}}^\theta
\right).
$$

Here $W_{\mathrm{src}}$ is the declared source window for the BBN-like thermal and provenance record. It may be a local-reactor, recycling, or compact-object comparison window, but it must be the same source-window record carried forward into the CMB photon-loading and structure-transfer handoff. $\Theta_{\mathrm{read}}$ is observer-level bookkeeping supplied by the effective-FRW and Friedmann rows; it does not assert expansion of the Euclidean void, and it is not a separately fit readout state.

The retained Noether sea slow state remains:

$$
\mathcal{N}_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\Gamma_N,
\mathbf{u}_{\mathrm{sea}},
e_{\mathrm{sea}},
\boldsymbol{\theta}_{\mathrm{sea}},
\mathcal{M}_{\mathrm{sea}}^{ab}
\right).
$$

## Upstream FRW / Readout Handoff

The downstream observation record must consume the effective-FRW and Friedmann readout from the upstream metric/cosmology packet rather than fitting a separate readout state. Let $\theta_{\mathrm{cos}}$ denote the retained record used by the `EQ-07` through `EQ-10` and `EQ-17` through `EQ-19` packet. Then the observation-family readout must satisfy

$$
\Theta_{\mathrm{read}}
\stackrel{!}{=}
\Pi_{\mathrm{read}}\Pi_{\mathrm{FRW}}\theta_{\mathrm{cos}},
\qquad
z_X^\theta
=
\exp(Z_X[\theta_{\mathrm{cos}}])-1.
$$

The corresponding interface residual is

$$
\begin{aligned}
\mathcal R_{\mathrm{FRW}\to\mathrm{obs}}
=&
d_{\mathrm{read}}
\left(
\Theta_{\mathrm{read}},
\Pi_{\mathrm{read}}\Pi_{\mathrm{FRW}}\theta_{\mathrm{cos}}
\right)
+
\lambda_Z
d_z
\left(
z_X^\theta,
\exp(Z_X[\theta_{\mathrm{cos}}])-1
\right)
\\
&+\lambda_H R_H(\theta_{\mathrm{cos}})^2
+\lambda_\rho R_\rho(\theta_{\mathrm{cos}})^2
+\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}^{\mathrm{cos}\to\mathrm{obs}}.
\end{aligned}
$$

Here $\mathcal S_{\mathrm{retune}}^{\mathrm{cos}\to\mathrm{obs}}$ reports any split between the upstream redshift/FRW/Friedmann record and the downstream growth, CMB, BBN, and RAR/BTFR projections. It checks shared rows such as $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathbf u_{\mathrm{sea}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, $G_{\mathrm{eff}}^\theta$, $a_{\mathrm{eff}}^\theta$, $H_{\mathrm{eff}}^\theta$, $\rho_{\mathrm{bar}}$, $\rho_A$, $\eta^\theta$, $N_{\text{eff}}^\theta$, and $\mathbf Y_{\mathrm{BBN}}^\theta$ wherever those rows overlap.

This is an equation-mapping interface residual, not a new score gate. A nonzero value may be acceptable only when the branch declares a physical transformation row between source, path, and readout windows; otherwise it is hidden retuning.

The upstream handoff shape is now executable in [effective-frw-handoff-residual.mjs](../../../scripts/equation-mapping/effective-frw-handoff-residual.mjs). Its attempt fixture [effective-frw-handoff-attempt.v1.json](../../../scripts/equation-mapping/effective-frw-handoff-attempt.v1.json) produces the score-neutral `frw_handoff` precursor and blocks first at `missing_accepted_theta_cos`. The downstream observation residual should consume that accepted handoff once it exists; it should not invent a separate $\Theta_{\mathrm{read}}$ or re-fit $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, or $\mathcal S_{\mathrm{eff}}$.

## Shared-Observation Residual

Define the second-round residual as:

$$
\begin{aligned}
\mathcal{R}_{\mathrm{obs}}(\Theta_{\mathrm{obs}})
=&
\lambda_{\mathrm{growth}}\mathcal{R}_{\mathrm{growth}}
+\lambda_{\mathrm{CMB}}\mathcal{R}_{\mathrm{CMB}}
+\lambda_{\mathrm{BBN}}\mathcal{R}_{\mathrm{BBN}}
+\lambda_{\mathrm{RAR}}\mathcal{R}_{\mathrm{RAR/BTFR}}
\\
&+\lambda_{\mathrm{FRW}}\mathcal R_{\mathrm{FRW}\to\mathrm{obs}}
+\lambda_{\mathrm{handoff}}\mathcal{R}_{\mathrm{handoff}}
+\lambda_{\mathrm{prov}}\mathcal{R}_{\mathrm{therm/prov}}
+\lambda_{\mathrm{retune}}\mathcal{S}_{\mathrm{retune}}.
\end{aligned}
$$

The first four terms are the familiar observation residuals. The remaining terms are the second-round discipline:

- $\mathcal R_{\mathrm{FRW}\to\mathrm{obs}}$ checks that the downstream readout is the upstream effective-FRW, redshift, and Friedmann projection, not a separate observer state.
- $\mathcal{R}_{\mathrm{handoff}}$ checks that BBN, CMB, growth, and galaxy projections exchange the same shared rows.
- $\mathcal{R}_{\mathrm{therm/prov}}$ checks that energy, photon, baryon, neutrino, and Noether sea work terms close through one provenance ledger.
- $\mathcal{S}_{\mathrm{retune}}$ checks that a fit is not achieved by changing the shared Noether sea or assembly state between observables.

This residual is a reusable equation-mapping object, not a new validation gate. It should be populated only after a branch declares $\Theta_{\mathrm{obs}}$ and the data windows used by each projection.

The effective-coupling row $G_{\mathrm{eff}}^\theta$ is part of the shared handoff. Growth, CMB lensing, RAR/BTFR, local-gravity, and Friedmann-style comparisons must consume one compatible effective-coupling record or report a split through $\mathcal S_{\mathrm{retune}}$.

### Planck Blackbody Core

`EQ-22A` isolates the Planck-law core from the broader `EQ-22` CMB transfer row. Its carrier is

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
\right).
$$

The benchmark residual is the mode-occupancy and energy-density check

$$
\bar n_i^\theta
=
\frac{1}{\exp((h\nu_i-\mu_\gamma^\theta)/(k_BT_\theta))-1},
\qquad
u_i^\theta
\stackrel{!}{=}
g_{\nu,i}^\theta h\nu_i\bar n_i^\theta.
$$

The row remains `2` until the same finite-window thermal record derives mode density, zero photon chemical potential, sufficient thermalization depth, and shared $h$, $T_\theta$, and $c_\gamma$ rows. [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs) currently evaluates this as an attempt-level sub-residual and blocks first at `missing_accepted_theta_gamma_packet`.

## Projection Terms

### Growth Projection

The growth side should retain the existing structure residual:

$$
\mathcal{R}_{\mathrm{growth}}
=
\left\|
\frac{P^\theta(k,z)-P^{\mathrm{obs}}(k,z)}
{\sigma_P(k,z)}
\right\|^2
+
\left\|
\frac{f\sigma_8^\theta(z,k)-f\sigma_8^{\mathrm{obs}}(z,k)}
{\sigma_{f\sigma_8}(z,k)}
\right\|^2
+
\left\|
\frac{C_L^{\phi\phi,\theta}-C_L^{\phi\phi,\mathrm{obs}}}
{\sigma_{L,\phi\phi}}
\right\|^2.
$$

The growth projection consumes $\Theta_{\mathrm{read}}$, $\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}}$, $\rho_A$, $\rho_{\mathrm{bar}}$, and $\mathcal{M}_{\mathrm{sea}}^{ab}$. It must also expose whether $G_{\mathrm{eff}}(a,k)$ and $\mu_{\text{sea}}(a,k)$ are the same response rows later used by lensing, kSZ, cluster, and galaxy comparisons.

### CMB Projection

The CMB projection should join transfer, blackbody, acoustic, lensing, and frame rows:

$$
\mathcal{R}_{\mathrm{CMB}}
=
\mathcal{R}_{\mathrm{TTTEEE}}
+\lambda_{\mathrm{bb}}\mathcal{R}_{\mathrm{spec}}
+\lambda_{\mathrm{phase}}\mathcal{R}_{\mathrm{phase}}
+\lambda_{\mathrm{lens}}\mathcal{R}_{\mathrm{lens}}
+\lambda_{\mathrm{op}}\mathcal{R}_{\mathrm{op}}
+\lambda_{\mathrm{frame}}\mathcal{R}_{\mathrm{frame}}.
$$

The transfer operator remains an observer-level comparison:

$$
C_\ell^{XY,\theta}
=
\mathcal{T}_{\mathrm{CMB}}^{XY}
\left[
P_{\mathrm{seed}}^\theta,
\theta_{\mathrm{therm}},
\theta_{\mathrm{ac}},
\theta_{\mathrm{path}},
\theta_{\mathrm{growth}},
\theta_{\mathrm{frame}}
\right]_\ell
+R_{\ell,XY}^{\theta}.
$$

This row fails if blackbody preservation, acoustic phase, CMB lensing, BBN helium handoff, or frame correction require separate source, thermalization, or Noether sea histories.

### BBN Projection

The BBN side should keep the source-window yield and freezeout comparison:

$$
\mathcal{R}_{\mathrm{BBN}}
=
\left\|
\frac{\mathbf{Y}_{\mathrm{BBN}}^\theta-\mathbf{Y}_{\mathrm{BBN}}^{\mathrm{obs}}}
{\boldsymbol{\sigma}_Y}
\right\|^2
+
\frac{(N_{\text{eff}}^\theta-N_{\text{eff}}^{\mathrm{obs}})^2}
{\sigma_{N_{\text{eff}}}^2}
+
\frac{(\eta^\theta-\eta^{\mathrm{obs}})^2}
{\sigma_\eta^2}
+
\mathcal{R}_{n/p}^\theta.
$$

The freezeout clock remains:

$$
\lambda_{n\to p}^{\theta}(T)
\sim
\lambda_{p\to n}^{\theta}(T)
\sim
H_{\mathrm{eff,BBN}}^\theta(T).
$$

The BBN projection consumes $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{therm/prov}}$, and the same $\Theta_{\mathrm{read}}$ family later used by CMB equality, acoustic, and growth rows. It fails if $\eta$, $N_{\text{eff}}$, $\mathbf{Y}_{\mathrm{BBN}}$, photon loading, or neutrino-sector energy are fit as independent source-zone parameters.

### RAR/BTFR Projection

The galaxy-acceleration side should remain a constitutive-response benchmark:

$$
\mathcal{R}_{\mathrm{RAR/BTFR}}
=
d_{\mathrm{gal}}
\left(
D_{\mathrm{RAR/BTFR}}^{\mathrm{obs}},
\mathcal{P}_{\mathrm{gal}}
\left[
\Theta_{\mathrm{gal}},
\rho_{\mathrm{bar}},
\rho_A,
\mathcal{M}_{\mathrm{sea}}^{ab}
\right]
\right)
+\lambda_{\mathrm{local}}\mathcal{R}_{\mathrm{local}}
+\lambda_{\mathrm{kSZ}}\mathcal{R}_{\mathrm{kSZ}}.
$$

The low-acceleration comparison law may be used only as an observer-level data-product summary:

$$
a_{\mathrm{cmp}}^\theta(a_N;E)
=
\begin{cases}
a_N, & a_N\gg a_\star^\theta(E),\\
\sqrt{a_Na_\star^\theta(E)}, & a_\star^\theta(E)/f^2(E)\ll a_N\ll a_\star^\theta(E),\\
f(E)a_N, & a_N\ll a_\star^\theta(E)/f^2(E).
\end{cases}
$$

The constitutive target is:

$$
a_\star^\theta(E)
=
A_\star
\left(
\Pi_E\theta_{\mathrm{sea}},
\rho_{\mathrm{bar}},
\rho_A,
\mathcal{M}_{\mathrm{sea}}^{ab}
\right),
\qquad
f^\theta(E)
=
F_\star
\left(
\Pi_E\theta_{\mathrm{sea}},
\mathcal{I}_{\mathrm{loc}}^\theta
\right).
$$

This row fails if a MOND-like comparison law is promoted into substrate ontology, or if $a_\star^\theta$, $f^\theta$, lensing, local-gravity recovery, cluster offsets, kSZ, and linear growth are tuned through different Noether sea response records.

## Handoff Residual

The handoff term relates the four observation families:

$$
\begin{aligned}
\mathcal{R}_{\mathrm{handoff}}
=&
\lambda_{\mathrm{B\to C}}
\mathcal{R}_{\mathrm{BBN}\to\mathrm{CMB}}
+\lambda_{\mathrm{C\to G}}
\mathcal{R}_{\mathrm{CMB}\to\mathrm{growth}}
\\
&+\lambda_{\mathrm{G\to R}}
\mathcal{R}_{\mathrm{growth}\to\mathrm{RAR}}
+\lambda_{\mathrm{BCR}}
\mathcal{R}_{\mathrm{baryon/matter}}.
\end{aligned}
$$

The rows are:

| Handoff | Shared rows | Failure if |
| --- | --- | --- |
| BBN to CMB | $\eta^\theta$, $N_{\text{eff}}^\theta$, $Y_p^\theta$, photon loading, neutrino-sector energy, thermal depth | CMB acoustic damping or helium handoff changes the BBN source-window record. |
| CMB to growth | $P_{\mathrm{seed}}^\theta$, $z_{\mathrm{eq}}^\theta$, $k_{\mathrm{eq}}^\theta$, $C_L^{\phi\phi}$, $\rho_A$, $\rho_{\mathrm{bar}}$, $\Theta_{\mathrm{read}}$ | CMB transfer and late growth require different matter loading or effective readout variables. |
| Growth to RAR/BTFR | $\mathcal{M}_{\mathrm{sea}}^{ab}$, $G_{\mathrm{eff}}(a,k)$, $\rho_A$, $\rho_{\mathrm{bar}}$, $\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}}$, $\Pi_{\mathrm{gal}}\theta_{\mathrm{sea}}$ | Galaxy acceleration fits only after changing the response row that linear growth, kSZ, or CMB lensing uses. |
| BBN/CMB to RAR/BTFR | baryon fraction, neutral-assembly loading, source provenance, $\Theta_{\mathrm{read}}$ | Low-acceleration success requires baryon or dark loading incompatible with BBN and CMB. |

## No-Hidden-Retune Residual

The no-hidden-retune residual should be explicit enough to compute once a branch declares its projection maps. Let $\mathcal{K}$ be the set of shared keys:

$$
\mathcal{K}
=
\left\{
\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\Gamma_N,
\mathbf{u}_{\mathrm{sea}},
\mathcal{M}_{\mathrm{sea}}^{ab},
\rho_{\mathrm{bar}},
\rho_A,
\eta,
N_{\text{eff}},
Y_p,
H_{\mathrm{eff}},
a_{\mathrm{eff}}
\right\}.
$$

For projection family $X\in\{\mathrm{BBN},\mathrm{CMB},\mathrm{growth},\mathrm{RAR}\}$, write $\Pi_X\Theta_{\mathrm{obs}}$ for the row it consumes. Then:

$$
\mathcal{S}_{\mathrm{retune}}
=
\sum_{\kappa\in\mathcal{K}}
\sum_{X<Y}
w_{\kappa,XY}
d_\kappa
\left(
\Pi_X\Theta_{\mathrm{obs}},
\Pi_Y\Theta_{\mathrm{obs}}
\right)
+
\sum_{\kappa\in\mathcal{K}}
\lambda_\kappa
\mathcal{P}_{\mathrm{prov}}(\kappa).
$$

Here $d_\kappa$ measures value or transformation mismatch for the shared key, while $\mathcal{P}_{\mathrm{prov}}(\kappa)$ penalizes a row whose provenance is missing from $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$. The residual may be nonzero when a branch declares a physical transformation between windows, but that transformation must be carried as a named row rather than a hidden fit knob.

## Thermal And Provenance Ledger

The thermal/provenance row should close energy, photon, baryon, neutrino, and Noether sea exchange over the declared source and transport windows:

$$
\begin{aligned}
\mathcal{R}_{\mathrm{therm/prov}}
=&
\frac{
\left(
\Delta U_{\mathrm{src}}^\theta
-B_{\mathrm{therm}}^\theta
-B_{\mathrm{loss}}^\theta
-\Delta u_\gamma^\theta
-\Delta u_\nu^\theta
-\Delta u_{\mathrm{bar}}^\theta
-\Delta e_{\mathrm{sea}}^\theta
-\int_{\partial W}\mathcal{F}^\theta\,dA\,dt
\right)^2
}{\epsilon_E^2}
\\
&+
\lambda_\eta
\frac{
\left(
\eta^\theta-\eta_B^{\mathrm{ledger}}
\right)^2
}{\epsilon_\eta^2}
+
\lambda_{\mathrm{th}}
\mathcal{R}_{\mathcal{D}_{\mathrm{th}}}
+
\lambda_{\nu}
\mathcal{R}_{\nu\text{-}\mathrm{handoff}}.
\end{aligned}
$$

This row is useful as an equation in its own right because it prevents a source story from moving energy into an undeclared reservoir, fitting BBN yields with one photon bath, and fitting the CMB blackbody with another.

## Common-Equation Candidates

The following objects are candidates for later equation-map line items or subequations once one branch populates them.

| Candidate | Equation object | Why it is reusable |
| --- | --- | --- |
| Shared source-window record | $\Theta_{\mathrm{src}}$ | BBN freezeout, CMB photon loading, seed/transfer inheritance, and matter loading all depend on the same thermal/source history. |
| Common effective expansion/readout | $\Theta_{\mathrm{read}}$ and $H_{\mathrm{eff}}^\theta$ | BBN cooling, recombination/decoupling, equality, distance, and growth damping should not use separate observer-level clocks. |
| No-hidden-retune residual | $\mathcal{S}_{\mathrm{retune}}$ | Makes split-state fitting measurable across BBN, CMB, growth, and RAR/BTFR rows. |
| Thermal/provenance ledger | $\mathcal{R}_{\mathrm{therm/prov}}$ | Connects photon energy, baryon loading, neutrino rows, thermalization depth, and Noether sea work terms. |
| Low-acceleration constitutive response | $a_\star^\theta(E)=A_\star(\Pi_E\theta_{\mathrm{sea}},\rho_{\mathrm{bar}},\rho_A,\mathcal{M}_{\mathrm{sea}}^{ab})$ | Lets RAR/BTFR be tested as a Noether sea response while preserving CMB, BBN, growth, kSZ, and local-gravity constraints. |
| Shared-observation residual | $\mathcal{R}_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$ | Provides one comparison target for the coupled cosmology and galaxy-acceleration benchmark family. |

## First Computation Target

The first useful benchmark replay should use one declared $\Theta_{\mathrm{obs}}$ and compute a minimal vector:

$$
\mathbf{O}_{21\text{-}23\text{-}32}^\theta
=
\left(
Y_p^\theta,
\mathrm{D/H}^\theta,
N_{\text{eff}}^\theta,
\eta^\theta,
T_0^\theta,
z_{\mathrm{eq}}^\theta,
k_{\mathrm{eq}}^\theta,
C_L^{\phi\phi,\theta},
P^\theta(k,z),
f\sigma_8^\theta,
D_{\mathrm{RAR/BTFR}}^\theta,
n_{\mathrm{kSZ}}^\theta
\right).
$$

The pass condition is not that every row is perfect. The pass condition is that the residual decomposition reports exactly which shared row is responsible for each mismatch and whether the same row is reused by the other observables.

## Executable Residual Checker Status

[shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) now implements the score-neutral checker for this packet. It consumes $\Theta_{\mathrm{obs}}$, the four subrecords $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{read}}$, $\Theta_{\mathrm{therm/prov}}$, and $\Theta_{\mathrm{gal}}$, the provenance ledger $\mathcal L_{E\mathbf p\mathbf J}$, `BBN`, `CMB`, `growth`, and `RAR` projection rows, and the shared-key set $\mathcal K$.

The upstream effective-FRW producer is [effective-frw-handoff-residual.mjs](../../../scripts/equation-mapping/effective-frw-handoff-residual.mjs). It currently reports `blocked_missing_rows` with first blocker `missing_accepted_theta_cos`; therefore this shared-observation checker remains downstream of a missing accepted cosmology carrier.

The current attempt fixture [shared-observation-residual-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-residual-attempt.v1.json) declares all expected shared keys and computes a residual vector, but every source-bearing row is still `attempt`. The run is therefore:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_obs
```

This is the intended disposition. The checker is a residual-ledger guardrail, not a cosmology fit and not score evidence until one retained branch populates an accepted, durable-source $\Theta_{\mathrm{obs}}$ row.

## Failure Modes And Falsifiers

| Failure mode | Falsifier |
| --- | --- |
| `equation_map.hidden_retune` | A fit requires changing $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\rho_A$, $\rho_{\mathrm{bar}}$, $\eta$, $N_{\text{eff}}$, or $H_{\mathrm{eff}}$ between observation families without a declared transformation row. |
| `cosmology.source_window_split` | BBN yields use one source-window thermal record while CMB photon loading or growth seed inheritance uses another. |
| `cosmology.blackbody_yield_split` | The CMB blackbody or acoustic fit succeeds only by changing $\eta$, $Y_p$, $N_{\text{eff}}$, thermalization depth, or photon provenance away from the BBN record. |
| `cosmology.growth_transfer_split` | $P(k,z)$, $f\sigma_8$, $C_L^{\phi\phi}$, BAO/equality scale, or CMB lensing require different matter loading or growth response rows. |
| `cosmology.galaxy_response_leakage` | The low-acceleration response recovers RAR/BTFR but spoils kSZ inverse-square behavior, CMB matter loading, CMB lensing, BBN baryon fraction, clusters, or local gravity. |
| `equation_map.level_collapse` | Effective metric, scale-factor, MOND-like, or fluid language is promoted into substrate ontology rather than held as an observer-level projection or comparison law. |
| `event.missing_ledger_row` | Photon, baryon, neutrino, recoil, thermalization, boundary-flux, or Noether sea work terms enter the residual without a provenance row in $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion should wait until at least one branch populates $\Theta_{\mathrm{obs}}$, computes $\mathcal{R}_{\mathrm{obs}}$, and reports $\mathcal{S}_{\mathrm{retune}}$ for a declared benchmark window.

Candidate reader-facing destinations after the blocker clears:

| Packet part | Candidate promotion target | Promotion condition |
| --- | --- | --- |
| Growth/CMB/BBN shared observation residual | `content/markdown/aaa/cosmology/structure-formation.md`, `content/markdown/aaa/cosmology/CMB.md`, `content/markdown/aaa/cosmology/BBN-constraints.md` | One branch computes the shared handoff rows for BBN, CMB, and growth without hidden retuning. |
| Source-window and thermal/provenance ledger | `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`, `content/markdown/aaa/cosmology/BBN-constraints.md`, `content/markdown/aaa/cosmology/CMB.md` | Energy, photon, baryon, neutrino, and Noether sea work terms close over a declared source and transport window. |
| Low-acceleration constitutive response | `content/markdown/aaa/cosmology/dark-matter.md`, `content/markdown/aaa/cosmology/structure-formation.md`, `content/markdown/aaa/spacetime/emergent-metric.md` | $a_\star^\theta(E)$ and $f^\theta(E)$ are derived from Noether sea response rows and pass local, kSZ, CMB, BBN, and growth constraints. |

## Next Safe Action

Build a small benchmark schema for $\mathbf{O}_{21\text{-}23\text{-}32}^\theta$ and $\mathcal{K}$, then populate it manually from one existing candidate branch. The first output should be a row-by-row residual ledger, not a score change: observed value, branch value, consumed shared rows, provenance rows, and whether $\mathcal{S}_{\mathrm{retune}}$ is zero, declared, or failing.
