# EQ-21 Through EQ-23 And EQ-32 Structure/CMB/BBN/RAR Packet

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Assigned IDs: `EQ-21`, `EQ-22`, `EQ-23`, `EQ-32`
- Status: `worker-packet`
- Packet status note: prior detailed worker packet; refined by [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md).
- Scope: priority-only; do not promote to reader-facing corpus until the shared residual below is computed by one branch record.

## Local Source Basis

- [Cosmology Transfer-Function Closure](../cosmology-closure/priorities.md) supplies the shared comparison record
  $\theta_{\mathrm{sea}}=(\theta_{\mathrm{clock}},\theta_{\mathrm{prop}},\theta_{\mathrm{therm}},\theta_{\mathrm{ac}},\theta_{\mathrm{growth}},\theta_{\mathrm{frame}})$ and the residual rows for CMB, BAO, supernova/$H_0$, weak lensing/RSD, and kSZ force-law profiles.
- [Closure Intersection Ledger](../dormant-deferred/validation-gates/closure-intersection-ledger.md) supplies the cross-sector guardrail: BBN photon loading, CMB thermalization, redshift handoff, frame correction, and structure growth must use compatible $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and reaction provenance rows.
- [Structure Formation](../../../content/markdown/aaa/cosmology/structure-formation.md), [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), and [Dark Matter](../../../content/markdown/aaa/cosmology/dark-matter.md) already contain the needed observer-level residual shapes. This packet keeps them internal to the equation-mapping priority and does not edit reader-facing files.

## Shared Closure Object

The assigned rows should be treated as one coupled benchmark family rather than four independent fits. A candidate branch record is

$$
\Theta_{21\text{-}23\text{-}32}
=
\left(
\mathcal{N}_{\mathrm{sea}},
\rho_A,
\rho_{\mathrm{bar}},
\theta_{\mathrm{init}},
\theta_{\mathrm{source}},
\theta_{\mathrm{therm}},
\theta_{\mathrm{path}},
\theta_{\mathrm{growth}},
\theta_{\mathrm{frame}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
\right),
$$

where

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

is the retained Noether sea slow state, $\rho_A$ is the neutral-assembly density used for dark-sector loading, $\rho_{\mathrm{bar}}$ is the baryonic source density, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger for source, photon, weak, baryon, neutrino, and medium exchange rows. The useful closure object is a shared residual

$$
\begin{aligned}
\mathcal{R}_{21\text{-}23\text{-}32}
=&
\mathcal{R}_{\mathrm{growth}}
+\mathcal{R}_{\mathrm{CMB}}
+\mathcal{R}_{\mathrm{BBN}}
+\mathcal{R}_{\mathrm{RAR/BTFR}}
\\
&+
\lambda_{\mathrm{proj}}
\sum_{X<Y}
d_{\mathrm{shared}}\!\left(
\Pi_X\Theta_{21\text{-}23\text{-}32},
\Pi_Y\Theta_{21\text{-}23\text{-}32}
\right).
\end{aligned}
$$

The last term is the split-state witness. It is zero only when growth, CMB, BBN, and low-acceleration galaxy projections reuse the same Noether sea and assembly record wherever their variables overlap.

## Packet Attack Card

- Dated score snapshot: the `6/23` ledger records `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32` at score `3`. This packet preserves the assessment rationale but does not update [equation.md](equation.md), the sole current score authority.
- Closure driver: one retained observation-family record must bind growth, CMB, BBN, and low-acceleration galaxy projections through shared Noether sea, assembly, source, photon, baryon, neutrino, medium, and event-ledger rows.
- Accepted route status: the refined [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md) now consumes accepted shared-observation evidence, the accepted `theta_cos` handoff, and accepted `delta_a_star` output projection. It reports `status=populated`, `nextBlocker=null`, and no hidden shared-key retune across BBN, CMB, growth, and RAR rows.
- Remaining blocker boundary: no score change follows from the shared-observation carrier or its score-neutral growth, matter-power, lensing, shear/RSD, halo/cluster, nonlinear, and galaxy-response children. CMB transfer, blackbody/acoustic rows, BBN source-window physics, and score-review observational transfer remain open.
- Smallest accepted evidence object: [shared-observation-provider-backed-consumer-evidence.v1.json](../../../scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json), consumed by [shared-observation-provider-backed-consumer-accepted.v1.json](../../../scripts/equation-mapping/shared-observation-provider-backed-consumer-accepted.v1.json), plus [eq32-galaxy-response-child-evidence.v1.json](../../../scripts/equation-mapping/eq32-galaxy-response-child-evidence.v1.json) for the accepted score-neutral galaxy-response child.
- Smallest next artifact: one score-review observational transfer, CMB transfer/blackbody/acoustic, or BBN source-window child that consumes the accepted shared-observation evidence without replacing it.
- Runnable handoff: use the accepted input plus the attempt and priority-source guards with [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs); the accepted route populates, while the attempt and priority-source negative control still block at `missing_accepted_theta_obs`.

```sh
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-provider-backed-consumer-accepted.v1.json --summary --pretty --require-populated
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-residual-attempt.v1.json --summary --pretty
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-priority-source-negative-control.v1.json --summary --pretty
```

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Structure growth, matter power, weak lensing, RSD, BAO, and kSZ profiles (`EQ-21`) | Growth projection from Noether sea density, neutral-assembly loading, baryonic source density, effective coupling, expansion/readout, and transfer rows. | Accepted $\Theta_{\mathrm{obs}}$ parent with accepted growth projection and readout rows. | $P(k,z)$, $D(z,k)$, $f\sigma_8$, $S_8$, lensing, RSD, BAO, and kSZ rows must share $\rho_{\text{NS}}$, $\rho_A$, $\rho_{\mathrm{bar}}$, $G_{\mathrm{eff}}$, $a_{\mathrm{eff}}$, and $H_{\mathrm{eff}}$. | Growth-only transfer fit, split $G_{\mathrm{eff}}$, hidden readout retune, and failure to consume the accepted upstream `theta_cos` handoff. | Retained observation bundle accepted by `shared-observation-residual.mjs` with source-backed growth and readout rows. |
| CMB transfer, blackbody, acoustic, damping, lensing, and frame rows (`EQ-22`) | Photon loading, thermalization, acoustic phase, transfer-function, lensing, and frame/dipole readouts from the shared source/readout/thermal record. | Accepted CMB projection rows under $\Theta_{\mathrm{obs}}$ and accepted $\Theta_{\mathrm{therm/prov}}$ subrecord. | TT/TE/EE, damping, blackbody, acoustic, lensing, $N_{\mathrm{eff}}$, $Y_p$, and $\eta_{\gamma b}$ rows must share the same source and readout identities. | CMB-only parameter import, photon-loading split from BBN, thermalization source without provenance, and blackbody inherited `missing_accepted_theta_gamma_packet`. | Source-backed CMB subrecord with accepted transfer, thermal/provenance, lensing, BBN handoff, and no-retune rows under $\Theta_{\mathrm{obs}}$. |
| BBN rate, freezeout, yield, photon-loading, and neutrino rows (`EQ-23`) | Source-window reaction inventory, freezeout clock, weak-rate rows, yield vector, photon/neutrino loading, and energy ledger readouts. | Accepted $\Theta_{\mathrm{src}}$ with BBN projection and event-ledger rows. | $n_n/n_p$, $Y_p$, D/H, helium-3, lithium, $\eta^\theta$, $N_{\mathrm{eff}}^\theta$, photon loading, neutrino rows, and CMB handoff variables must use one source-window record. | BBN benchmark-parameter import, CMB/BBN handoff split, and source-window energy partition without provenance. | Source-backed BBN source-window object accepted as part of $\Theta_{\mathrm{obs}}$, with reaction, freezeout, yield, photon/neutrino, and CMB handoff rows. |
| RAR/BTFR, lensing, clusters, local recovery, and low-acceleration response (`EQ-32`) | Galaxy response projection from local Noether sea coefficient rows, baryonic density, neutral-assembly density, response tensor, effective coupling, and $a_\star^\theta(E)$. | Accepted $\Theta_{\mathrm{gal}}$ plus accepted `theta_sea_rho_NS` and `delta_a_star` projection. | Galaxy dynamics, lensing, high-acceleration recovery, cluster, CMB matter loading, and low-acceleration rows must cite the same retained Noether sea coefficient and baryon/assembly record. | Private galaxy ledger, missing `theta_sea_rho_NS`, missing `delta_a_star`, and split local/cosmology coupling. | Durable-source Noether sea density-compression bundle plus accepted galaxy projection rows under the parent $\Theta_{\mathrm{obs}}$. |
| Cross-family split-state witness | $d_{\mathrm{shared}}(\Pi_X\Theta,\Pi_Y\Theta)$ over overlapping Noether sea, assembly, readout, source, thermal, and ledger rows. | Accepted no-hidden-retune witness under $\Theta_{\mathrm{obs}}$. | Growth, CMB, BBN, and RAR/BTFR projections may differ only through declared projection or transformation rows, not private parameter records. | Hidden retune across $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, $\rho_A$, $\rho_{\mathrm{bar}}$, $G_{\mathrm{eff}}$, $a_{\mathrm{eff}}$, or $H_{\mathrm{eff}}$. | One retained $\Theta_{\mathrm{obs}}$ record whose shared keys are accepted and whose split-state witness is zero or explicitly reported for the declared benchmark window. |

## EQ-21: Structure Growth And Matter Power

### Standard Equation And Regime

The linear growth comparison is

$$
\ddot\delta
+
2H(t)\dot\delta
-
4\pi G_{\mathrm{eff}}(t,k)\bar\rho_m(t)\delta
=
0,
$$

with matter power

$$
P(k,z)
=
P_{\mathrm{seed}}(k)T^2(k)D^2(z).
$$

Regime: linear and mildly nonlinear structure growth, CMB lensing, weak lensing, RSD, BAO-compatible transfer shape, and halo/cluster comparisons.

### Mapped Form

Use the Noether sea constitutive response as the growth-side source of $G_{\mathrm{eff}}$. The structure-formation packet already gives the linearized response

$$
G_{\text{eff}}(a,k,\omega)
=
G_N\left[1+\mu_{\text{sea}}(a,k,\omega)\right],
$$

with quasi-static branch

$$
\mu(a,k)
\approx
-\frac{\bar{\rho}_{\text{sea}}(a)g_m(a)}
{m_L^2(a)+M_L(a)k^2}.
$$

The mapped growth equation should therefore be carried as

$$
\ddot\delta_m^\theta
+
2H_{\mathrm{eff}}^\theta\dot\delta_m^\theta
-
4\pi G_N
\left[1+\mu_{\text{sea}}^\theta(a,k)\right]
\bar\rho_m^\theta
\delta_m^\theta
=
R_{\delta}^{\theta}(a,k),
$$

and

$$
P^\theta(k,z)
=
P_{\mathrm{seed}}^\theta(k)
T_\theta^2(k)
D_\theta^2(z)
+R_P^\theta(k,z).
$$

### Noether Braid Variables

- Initial perturbation branch record $\theta_{\mathrm{init}}$ and seed spectrum $P_{\mathrm{seed}}^\theta(k)$.
- Baryonic and neutral-assembly branch densities $\rho_{\mathrm{bar}}$ and $\rho_A$.
- Assembly mass/loading rows from internal energy, shielding, and medium-dressed response, so growth does not import a free dark component.
- Causal-root, wake, and event-ledger provenance for the matter source perturbation $\delta\rho_m^\theta$.

### Noether Sea Variables

- $\rho_{\text{NS}}(\mathbf{x},t)$ and $n(\mathbf{x},t)$ for physical and normalized Noether braid density.
- $\chi_{\text{sea}}(\mathbf{x},t)$, $\Gamma_N$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, and orientation/strain moments.
- Constitutive coefficients $K(a)$, $S(a)$, $\zeta_{\text{bulk}}(a)$, $\eta(a)$, $m_L(a)$, $g_m(a)$, and $M_L(a)=K(a)+4S(a)/3$ when the linear medium-response approximation is used.

### Rows Needed

- $P(k,z)$, $D(z,k)$, $f\sigma_8(z,k)$, $\sigma_8$, and $S_8$ residuals.
- CMB-lensing $C_L^{\phi\phi}$ row tied to the same $P(k,z)$.
- Weak-lensing/shear and RSD rows.
- kSZ force-law profile row on the $30$--$230\,\mathrm{Mpc}$ window, with large-scale $g(r)\propto r^{-n}$ recovery.
- BAO/equality-scale/free-streaming rows so the transfer shape does not split away from CMB and BBN loading.

### EQ-21 2026-06-23 Maturity Assessment

The dated `6/23` assessment records `3`. The current map has the right variables and a concrete $G_{\mathrm{eff}}$ constitutive scaffold, but the predictive transfer pipeline and shared residual evaluation are still missing. This assessment is not retained evidence and does not change the current score in [equation.md](equation.md).

### First Mathematical Object

Add the growth projection of $\mathcal{R}_{21\text{-}23\text{-}32}$:

$$
\mathcal{R}_{\mathrm{growth}}^\theta
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

The first proof route is to show that the same $\mu_{\text{sea}}^\theta(a,k)$ that enters $P(k,z)$ also enters CMB lensing and late weak-lensing/RSD rows.

### Failure Mode

The row fails by `equation_map.hidden_retune` or `cosmology.frame_split` if CMB lensing, $S_8$, RSD, cluster offsets, or halo force-law rows require different $\theta_{\mathrm{growth}}$ projections. It also fails if a galaxy-scale low-acceleration response leaks into the ACT/SDSS halo-pair window as an unscreened large-scale $n\simeq1$ force law.

### Promotion Targets

- `content/markdown/aaa/cosmology/structure-formation.md`
- `content/markdown/aaa/cosmology/hubble-s8-tensions.md`
- `content/markdown/aaa/cosmology/dark-matter.md`
- `content/markdown/aaa/spacetime/emergent-metric.md`

## EQ-22: CMB Transfer, Blackbody, And Acoustic Equations

### Standard Equation And Regime

The CMB transfer comparison is

$$
C_\ell^{XY,\theta}
=
\frac{2}{\pi}
\int k^2\,dk\,
P_\theta(k)
\Delta_{X\ell}^\theta(k)
\Delta_{Y\ell}^\theta(k).
$$

Regime: TT/TE/EE transfer, acoustic phase, blackbody preservation, damping, CMB lensing, frame/dipole consistency, foreground/calibration provenance, and BBN handoff.

### Mapped Form

The existing CMB packet already names the shared record

$$
\Theta_{\mathrm{CMB}}
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

The mapped transfer row should be

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
+
R_{\ell,XY}^{\theta},
$$

where $\mathcal{T}_{\mathrm{CMB}}^{XY}$ is an observer-level transfer operator. It is not an imported origin story; it must be derived from Noether sea thermalization, photon-channel decoupling, acoustic calibration, and path-history propagation.

### Noether Braid Variables

- Photon-channel packet record for the coaxial contra-rotating polarity-conjugate planar pair.
- Source or last-thermalization branch record $\theta_{\mathrm{source}}$.
- Baryon-loading and helium handoff rows from nucleon/light-element assembly ledgers.
- Neutrino-sector row from neutral-lepton branch records.
- Event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ for source energy, photon energy, recoil, medium update, and non-photon reservoirs.

### Noether Sea Variables

- $\chi_{\text{sea}}$, $\Gamma_N$, $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, and orientation/strain fields along the source-to-observer path.
- Thermalization depth $\mathcal D_{\mathrm{th}}^{\mathrm{CMB}}(\nu)$ and microwave opacity comparison $\chi_{\mathrm{op}}^\theta$, kept distinct from the Noether sea delay factor $\chi_{\text{sea}}$.
- Growth/lensing projection $\theta_{\mathrm{growth}}$ reused from `EQ-21`.

### Rows Needed

- TT/TE/EE spectra and damping residuals.
- Blackbody spectrum residual $\mathcal{R}_{\mathrm{spec}}$.
- Photon energy-budget residual $\mathcal{R}_{\gamma,\mathrm{CMB}}$.
- Thermalization depth and post-decoupling side-effect residual $\mathcal{R}_{\mathrm{op}}$.
- Acoustic phase residual, CMB lensing $C_L^{\phi\phi}$, scalar/tensor bound rows, and frame/dipole residuals.
- $N_{\mathrm{eff}}$, $Y_p$, and $\eta_{\gamma b}$ handoff rows shared with `EQ-23`.

### EQ-22 2026-06-23 Maturity Assessment

The dated `6/23` assessment records `3`. The equation-level transfer target, blackbody residuals, thermalization-depth target, frame row, and BBN handoff variables are already named locally. It should not rise above `3` until a branch computes $\Delta_{X\ell}^\theta$ and the blackbody/acoustic/lensing residuals from one source and Noether sea record. This assessment is not retained evidence and does not change the current score in [equation.md](equation.md).

### First Mathematical Object

Use the CMB projection of the shared residual:

$$
\mathcal{R}_{\mathrm{CMB}}^\theta
=
\left\|
\frac{\mathbf{C}_{\ell,\mathrm{TTTEEE}}^\theta-\mathbf{C}_{\ell,\mathrm{TTTEEE}}^{\mathrm{obs}}}
{\boldsymbol\sigma_{\ell,\mathrm{TTTEEE}}}
\right\|^2
+
\left\|
\frac{\mathbf{C}_{L}^{\phi\phi,\theta}-\mathbf{C}_{L}^{\phi\phi,\mathrm{obs}}}
{\boldsymbol\sigma_{L,\phi\phi}}
\right\|^2
+
\frac{(\Delta T_{\mathrm{bb}}^\theta)^2}{\epsilon_{\mathrm{bb}}^2}
+
\mathcal{R}_{\mathrm{spec}}^\theta
+
\mathcal{R}_{\mathrm{op}}^\theta.
$$

The first proof route is to derive $\mathcal D_{\mathrm{th}}^{\mathrm{CMB}}(\nu)\gg1$ before decoupling and $\mathcal{R}_{\mathrm{op}}^\theta\le1$ after decoupling from the same source, path, and Noether sea variables.

### Failure Mode

The row fails by `cosmology.incompatible_transport_limit` if blackbody preservation uses a $\chi_{\text{sea}}$ or thermalization record incompatible with BBN photon loading or local radiation ledgers. It fails by `cosmology.frame_split` if the CMB frame correction cannot be projected from the same Noether sea state used by matter dipoles, BAO directionality, supernova residuals, and local $H$ scatter.

### Promotion Targets

- `content/markdown/aaa/cosmology/CMB.md`
- `content/markdown/aaa/cosmology/structure-formation.md`
- `content/markdown/aaa/cosmology/BBN-constraints.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`

## EQ-23: BBN Rate And Freezeout Equations

### Standard Equation And Regime

The retained yield-vector benchmark is

$$
\mathbf Y_{\mathrm{BBN}}^\theta
=
\mathbf Y
\left[
\{T,\rho,n_b,n_\gamma,n_n,\mathcal E_{i,s}^{\theta}\}
\right].
$$

The weak freezeout comparison is

$$
\lambda_{n\to p}^{\theta}(T)
\sim
\lambda_{p\to n}^{\theta}(T)
\sim
H_{\mathrm{eff,BBN}}^\theta(T),
$$

with

$$
H_{\mathrm{eff,BBN}}^\theta
\propto
\left(
\rho_\gamma^\theta
+
\rho_{e^\pm}^\theta
+
\rho_{\nu_\alpha}^\theta
+
\rho_{\nu_s}^\theta
+
\cdots
\right)^{1/2},
\qquad
N_{\text{eff}}^\theta
=
\frac{\rho_{\mathrm{rel}}^\theta-\rho_\gamma^\theta}
{\rho_{\nu,1}^\theta}.
$$

Regime: weak freezeout, light-element yield recovery, photon loading, neutrino-sector counting, and CMB/structure handoff.

### Mapped Form

BBN should be mapped as a source-window thermal record, not as a background-color constraint:

$$
\Theta_{\mathrm{BBN}}
=
\left(
T^\theta(t),
\rho^\theta(t),
\eta^\theta,
N_{\text{eff}}^\theta,
\lambda_{n\to p}^\theta,
\lambda_{p\to n}^\theta,
\mathcal E_{i,s}^{\theta},
\theta_{\mathrm{therm}},
\theta_{\mathrm{source}}
\right),
$$

with all entries projected from $\Theta_{21\text{-}23\text{-}32}$. The neutron/proton comparison remains

$$
\frac{n_n^\theta}{n_p^\theta}
\approx
\exp\!\left(
-\frac{\Delta m_{np}c_0^2}{k_BT}
-\xi_{\nu_e}^\theta
\right),
$$

where $\xi_{\nu_e}^\theta$ is retained only when the branch declares a neutrino-sector asymmetry.

### Noether Braid Variables

- Proton, neutron, electron, positron, and neutrino branch records for the weak conversion channels.
- Light-nucleus assembly ledgers for $Y_p$, D/H, helium-3, and lithium rows.
- Source-channel exposure $\mathcal E_{i,s}^{\theta}$ and event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ for baryon, photon, neutrino, and Noether sea work terms.
- Baryon-to-photon provenance ledger for $\eta^\theta$, not an independently inserted initial condition.

### Noether Sea Variables

- Effective BBN cooling/dilution clock $H_{\mathrm{eff,BBN}}^\theta(T)$ projected from the Noether sea source-window transport record.
- $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $e_{\mathrm{sea}}$, and $\mathbf u_{\mathrm{sea}}$ in the BBN source window.
- Thermalization-depth variable $\mathcal D_{\mathrm{th}}^{\mathrm{BBN}}(\nu)$ for photon loading.
- Neutrino-sector coupling/free-streaming row shared with CMB and structure transfer.

### Rows Needed

- Weak conversion rates $\lambda_{n\to p}^\theta$ and $\lambda_{p\to n}^\theta$.
- $n_n/n_p$, $Y_p$, D/H, helium-3, and lithium residuals.
- $\eta^\theta$, $N_{\text{eff}}^\theta$, photon loading, and neutrino asymmetry rows.
- Source-window energy partition rows for baryons, photons, neutrino-sector excitations, compact-object release if used, and Noether sea work terms.
- CMB handoff row using the same $Y_p$, $N_{\text{eff}}$, and photon-loading record.
- Structure handoff row for free-streaming or warm-component suppression.

### EQ-23 2026-06-23 Maturity Assessment

The dated `6/23` assessment records `3`. The weak-rate interface, freezeout clock, yield-vector target, $\eta$, $N_{\text{eff}}$, and source-window rows are now equation-level scaffolding with the right shared variables. It remains below `4` because no native source-window mechanism computes the yields without importing benchmark parameters. This assessment is not retained evidence and does not change the current score in [equation.md](equation.md).

### First Mathematical Object

Define the BBN projection of the shared residual:

$$
\mathcal{R}_{\mathrm{BBN}}^\theta
=
\left\|
\frac{\mathbf Y_{\mathrm{BBN}}^\theta-\mathbf Y_{\mathrm{BBN}}^{\mathrm{obs}}}
{\boldsymbol\sigma_Y}
\right\|^2
+
\frac{(N_{\text{eff}}^\theta-N_{\text{eff}}^{\mathrm{obs}})^2}
{\sigma_{N_{\text{eff}}}^2}
+
\frac{(\eta^\theta-\eta^{\mathrm{obs}})^2}
{\sigma_\eta^2}
+
\mathcal{R}_{\mathrm{handoff}}^\theta(\mathrm{BBN}\to\mathrm{CMB},\mathrm{growth}).
$$

The first proof route is to compute $H_{\mathrm{eff,BBN}}^\theta(T)$, $\eta^\theta$, and $N_{\text{eff}}^\theta$ from the same thermal/source-window record that later supplies $\Theta_{\mathrm{CMB}}$.

### Failure Mode

The row fails by `event.missing_ledger_row` if a weak, photon, baryon, neutrino, or medium exchange channel lacks provenance. It fails by `cosmology.incompatible_transport_limit` if an extra relativistic or compact-source component repairs one isotope while shifting $N_{\text{eff}}$, photon loading, or the CMB handoff independently.

### Promotion Targets

- `content/markdown/aaa/cosmology/BBN-constraints.md`
- `content/markdown/aaa/cosmology/CMB.md`
- `content/markdown/aaa/cosmology/structure-formation.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`

## EQ-32: Baryonic Tully-Fisher And Radial-Acceleration Relation

### Standard Equation And Regime

The radial-acceleration relation is

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
\sqrt{g_{\mathrm{bar}}a_0}
$$

and baryonic Tully-Fisher form

$$
v_f^4
=
GM_ba_0.
$$

Regime: galaxy-scale low acceleration, rotation curves, RAR/BTFR, lensing consistency, cluster offsets, and compatibility with large-scale growth/CMB/BBN.

### Mapped Form

The equation-map comparison form is

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

The dark-matter chapter sharpens the environment-dependent transition as

$$
a_\star(E)
=
A_\star(\Pi_E\theta_{\mathrm{sea}}),
\qquad
f(E)
=
F_\star(\Pi_E\theta_{\mathrm{sea}}),
$$

with comparison law

$$
a_{\mathrm{cmp}}(a_N; a_\star,f)
=
\begin{cases}
a_N, & a_N\gg a_\star,\\
\sqrt{a_Na_\star}, & a_\star/f^2\ll a_N\ll a_\star,\\
f\,a_N, & a_N\ll a_\star/f^2.
\end{cases}
$$

The $a_0$ row should therefore be treated as an output candidate

$$
a_0^{\mathrm{RAR}}
\leftarrow
A_\star(\Pi_{\mathrm{gal}}\Theta_{21\text{-}23\text{-}32}),
$$

not as a new fundamental constant or imported gravity ontology.

### Noether Braid Variables

- Baryonic assembly distribution $\rho_{\mathrm{bar}}$ and baryonic mass $M_b$.
- Neutral-assembly density $\rho_A$ and collisionless/hybrid transport rows.
- Assembly mass response and shielding rows that determine gravitational loading.
- Galaxy environment branch labels $E$ for spiral galaxies, dwarfs, clusters, and diffuse absorbers.
- Causal-root and wake provenance for $\mathbf g_{\mathrm{bar}}$ and the received effective pull.

### Noether Sea Variables

- $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathbf u_{\mathrm{sea}}$, local strain/orientation, and $\mathcal{M}_{\mathrm{sea}}^{ab}$.
- Environment projections $\Pi_E\theta_{\mathrm{sea}}$ and cosmology projection $\Pi_{\mathrm{cos}}\theta_{\mathrm{sea}}$.
- Screening/local-recovery invariant $\mathcal I_{\mathrm{loc}}$ if the same branch uses galaxy-scale response while preserving solar-system, binary-pulsar, gravitational-wave, and large-scale kSZ constraints.

### Rows Needed

- Galaxy RAR and BTFR residuals.
- Galaxy rotation-curve morphology and baryonic feedback/source records.
- Lensing potential row from the same effective metric response as dynamics.
- Cluster temperature/lensing and offset-system rows.
- CMB matter loading, CMB lensing, BBN baryon fraction, $P(k,z)$, $S_8$, RSD, and kSZ force-law rows.
- High-acceleration Newtonian/local-gravity recovery rows.

### EQ-32 2026-06-23 Maturity Assessment

The dated `6/23` assessment records `3`. The row has a concrete constitutive-response comparison, local dark-matter/RAR residuals, and an explicit shared-state requirement. It remains below `4` because $A_\star$, $F_\star$, $a_0^{\mathrm{RAR}}$, and the screening/local-recovery map are not derived from Noether sea coefficients. This assessment is not retained evidence and does not change the current score in [equation.md](equation.md).

### First Mathematical Object

Use the low-acceleration projection

$$
\mathcal{R}_{\mathrm{RAR/BTFR}}^\theta
=
d_{\mathrm{gal}}\!\left(
D_{\mathrm{RAR/BTFR}}^{\mathrm{obs}},
\mathcal{P}_{\mathrm{gal}}\!\left(
\theta_{\mathrm{sea}},
\rho_A,
\rho_{\mathrm{bar}},
\mathcal{M}_{\mathrm{sea}}^{ab}
\right)
\right)
+
\lambda_{\mathrm{cos}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{gal}}\Theta_{21\text{-}23\text{-}32},
\Pi_{\mathrm{cos}}\Theta_{21\text{-}23\text{-}32}
\right)
+
\mathcal{R}_{\mathrm{local}}^\theta.
$$

The first proof route is to derive $A_\star(\Pi_E\theta_{\mathrm{sea}})$ from a declared Noether sea constitutive row and then prove that the same row recovers the Newtonian/high-acceleration limit and the large-scale inverse-square kSZ force-law window.

### Failure Mode

The row fails by `equation_map.level_collapse` if a MOND-like comparison law is promoted into substrate ontology. It fails by `equation_map.hidden_retune` if each galaxy, cluster, or cosmology row receives its own $a_\star$, $f$, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ record. It fails observationally if the low-acceleration correction preserves RAR/BTFR but spoils CMB matter loading, cluster offsets, BBN baryon fraction, CMB lensing, $P(k,z)$, local gravity, or the kSZ inverse-square profile.

### Promotion Targets

- `content/markdown/aaa/cosmology/dark-matter.md`
- `content/markdown/aaa/cosmology/structure-formation.md`
- `content/markdown/aaa/cosmology/hubble-s8-tensions.md`
- `content/markdown/aaa/spacetime/emergent-metric.md`
- `content/markdown/aaa/spacetime/noether-sea.md`

## Cross-ID Claim Map

| ID | Claim bucket | Current status |
| --- | --- | --- |
| `EQ-21` | Derivation/closure target | The map has the right transfer variables and constitutive growth scaffold; predictive computation remains open. |
| `EQ-22` | Derivation/closure target | CMB residual rows are explicit enough for a transfer packet; source/thermalization derivation remains open. |
| `EQ-23` | Derivation/closure target | Weak-rate and yield rows are explicit; native source-window mechanism remains open. |
| `EQ-32` | Effective summary plus derivation/closure target | RAR/BTFR is an observer-level benchmark; a Noether sea constitutive derivation of $a_0^{\mathrm{RAR}}$ remains open. |

## Priority-Only Promotion Decision

Classification: `priority-only`.

Reason: this packet defines a shared residual and branch-record dependency map, but it does not compute a branch through the residual. Promotion should wait until a follow-on pass either derives one of the projection functions or runs a concrete benchmark replay using the same $\Theta_{21\text{-}23\text{-}32}$ record.
