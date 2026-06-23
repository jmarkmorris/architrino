# Equation Score-5 Closure Ladder

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Common architecture: [Equation Common Architecture 2026-06-23 C](equation-common-architecture-2026-06-23-c.md)
- Claim level: score discipline, proof routes, residual targets, and solver-facing closure plan
- Promotion status: priority-only

## Purpose

This packet states what it would take to drive every equation-map row to score `5` without score inflation. A `5` means the row is native or essentially direct in current $\mathbb{A}\mathbb{A}\mathbb{A}$ equations. For most rows, that requires a retained branch calculation, a Noether sea constitutive derivation, an event-ledger replay, or a shared observation residual populated on one record.

The scoring posture is deliberately conservative. Treat the table as if it will be audited by many technically competent readers looking for hidden assumptions, duplicated fit handles, unreported residuals, level collapse, and branch splits. The score should not express confidence in the theory; it should express the present strength of the documented mathematical closure object.

The goal is not to make all rows look equally mature. The goal is to concentrate work on common mathematical objects that raise many rows together.

## Score-5 Rule

An equation row can be raised to `5` only if one of the following is true:

1. **Native root row:** the equation is already part of the substrate dynamics, with its carrier variables and failure modes explicit.
2. **Retained-branch derivation:** a retained Noether braid branch or branch family derives the row from causal roots, wake ledgers, event ledgers, and declared Noether sea state.
3. **Constitutive derivation:** a Noether sea constitutive record derives the observer-level row and reuses the same state across all linked observables.
4. **Executable residual closure:** a solver or proof packet populates the relevant shared residual and all split/retune witnesses pass within a declared tolerance.

Formula matching is not enough. A row that matches a standard equation by changing branch labels, speed conventions, Noether sea state, detector/readout kernels, exposed sector rows, or effective coefficients per observable remains below `5`.

## Shared Score-5 Carriers

The shortest path to many `5` scores is through shared carriers:

| Carrier | Score-5 function | Primary rows raised together |
| --- | --- | --- |
| $\mathcal L_{\mathrm{root}}$ plus causal-root Jacobians | Keeps all rows tied to active roots and finite causal wake propagation. | `EQ-01`, `EQ-02`, `EQ-03`, `EQ-05`, `EQ-12`, `EQ-28`. |
| $\mathcal L_{E\mathbf p\mathbf J}(\mathsf e)$ | Closes energy, momentum, angular momentum, polarity, path, medium, and remnant balance for finite events. | `EQ-05`, `EQ-12`, `EQ-16`, `EQ-22`, `EQ-23`, `EQ-26` through `EQ-31`. |
| $\mathcal R_{\mathrm{shared}}(\Theta;\{X_i\})$ | Blocks hidden retuning between observables that should share one branch or Noether sea record. | `EQ-02` through `EQ-04`, `EQ-07` through `EQ-11`, `EQ-17` through `EQ-23`, `EQ-32`. |
| $\mathcal C_{\mathrm{sea}}[\Theta_{\mathrm{sea}}]$ | Derives metric, mass response, pressure, growth, and low-acceleration response from one Noether sea constitutive state. | `EQ-04`, `EQ-06` through `EQ-11`, `EQ-18` through `EQ-21`, `EQ-24`, `EQ-32`. |
| $H_X=\omega_{\mathrm{clk}}C_X\mathbf 1+\delta H_X$ | Separates common hidden cadence from observable phase gaps or beat frequencies. | `EQ-08`, `EQ-12`, `EQ-16A`, `EQ-17`, `EQ-26`. |
| $\mathcal E_S(A)=Q_S[\Pi_S\mathcal L_A]$ | Forces mass, spin, weak, gauge, magnetic, form-factor, and detector rows to use one exposed-sector record. | `EQ-04`, `EQ-15`, `EQ-16`, `EQ-16A`, `EQ-27`, `EQ-30`. |
| $\mu_{t+\Delta t}^{\mathcal Q,W}=\Pi_{\mathcal Q,W\,*}\Phi_{\Delta t\,*}\mu_t+\mathcal R_{\mathrm{coarse}}$ | Derives probability, entropy, cross sections, and resonance statistics as finite-window pushforwards. | `EQ-14`, `EQ-25`, `EQ-30`, `EQ-31`. |
| $\mathcal R_{\mathrm{cfg}}(\mathfrak a)$ | Routes mature equation residuals into retained tri-binary candidate selection and blocks frequency-ratio-only acceptance. | `EQ-01` through `EQ-05`, `EQ-12`, `EQ-15`, `EQ-16A`, `EQ-27` through `EQ-31`. |

## Score-5 Ladder By Row

| ID | Current `6/23 b` | Score-5 closure object | First reducer |
| --- | --- | --- | --- |
| `EQ-01` | `5` | Native per-hit causal wake law plus causal-root Jacobian. | Maintain dependency discipline; every downstream row must declare which reduced root, wake, event, or Noether sea record it consumes. |
| `EQ-02` | `4` | Retained translating-binary or nested shell braid branch derives $T_q/T_0=\gamma_{\star}$ from causal roots with bounded two-way leakage. | Populate $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$, then assemble $\Theta_{02\text{-}04}^{\mathrm{bin}}(u)$ and same-root conservation row in [EQ-02 Through EQ-04 Translating Binary Shared-Record Instantiation](eq-02-04-translating-binary-shared-record-instantiation.md). |
| `EQ-03` | `4` | Same retained branch derives $\xi=R_{\parallel}/R_{\perp}=1/\gamma_{\star}$ without assigning the envelope ratio. | Use the same $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$ projections; require zero root split between clock, envelope, and $\mathcal R_{01-05}^{\mathfrak B_u}(W_u)$ rows. |
| `EQ-04` | `4` | Same retained branch derives $E_{\mathrm{CM}}$, $p_{\mathrm{CM}}$, $M_0$, $R_{\mathrm{shell}}$, $\zeta(A)$, and $\mathcal M_{\mathrm{sea}}^{ab}$ without velocity-dependent rest mass. | Add energy, exposure, medium-response, and finite-window conservation projections to the translating-binary retained record; then repeat on the first accepted nested shell braid branch. |
| `EQ-05` | `4` | Finite-window conservation residual $\mathcal R_{01-05}^{\mathfrak B}(W)\to0$ for energy, momentum, angular momentum, wake, event, and boundary rows on one branch chart. | Instantiate [eq-01-05-root-conservation-packet.md](eq-01-05-root-conservation-packet.md) on the smallest branch with certified active roots and boundary flux. |
| `EQ-06` | `4` | Noether sea continuity and moment rows derived as low-moment projections from retained Noether braid population dynamics with refinement convergence. | Prove or simulate $\mathcal R_{\mathrm{proj}}^X(\Theta_W,\ell)$ decreasing under retained-inventory and memory refinement. |
| `EQ-07` | `4` | One Noether sea constitutive state derives lapse, drift, spatial compliance, signal delay, and observer metric coefficients. | Extract the first coefficient row in $\mathcal C_{\mathrm{sea}}$ and reuse it across clock, ruler, signal, and weak-field rows. |
| `EQ-08` | `4` | $\Gamma_N$ and weak-field clock rate derived from braid cadence, density, delay, and potential response in one Noether sea cell. | Tie the static weak-clock row to the same $\mathcal C_{\mathrm{sea}}$ coefficient extraction used by `EQ-07`. |
| `EQ-09` | `4` | Redshift, Shapiro delay, lensing, acceleration, PPN, and preferred-frame rows project from one effective metric record. | Populate a weak solar-system residual vector with one $\Theta_W$ and zero $\mathcal S_{\mathrm{retune}}$. |
| `EQ-10` | `3` | Proper-time action and geodesic behavior derived as observer-level variational projection of the same clock, ruler, matter, and signal record. | Define the action-to-acceleration residual on the `EQ-07` through `EQ-09` effective metric record. |
| `EQ-11` | `3` | Poisson and Einstein-limit readouts derived from the same Noether sea stress, density, pressure, and effective-coupling record used by metric and growth rows. | Populate $\mathcal R_{11\text{-}20}(\Theta;W_{\mathrm{weak}},W_{\Lambda})$ for one weak window and one homogeneous cosmology window. |
| `EQ-12` | `3` | Photon packet branch derives $E=h\nu$, null/eikonal propagation, helicity, source depletion, path transfer, and receiver coupling in one event ledger. | Use Compton/recoil as the first compact event-ledger replay, then reuse its photon Gate A/B rows for null transport. |
| `EQ-13` | `3` | Maxwell/wave equations recovered as continuum summaries of wake superposition and photon-channel packet transport with continuity, stress, gauge, and energy balance residuals. | Derive one effective charge/current continuity row from event ledgers before attempting a full field equation. |
| `EQ-14` | `3` | Born-current continuity and observer probability flow derived from deterministic finite-window basin pushforward. | Populate the statistical pushforward on a toy measurement or elastic scattering packet with density, current, detector, and event rows. |
| `EQ-15` | `2` | Spinor, Dirac/Klein-Gordon, spin-statistics, and exchange rows derived from ordered-frame, angular-momentum, and same-record sector exposure. | Close the ordered-frame spinor label pullback and exchange sign on one retained branch before importing relativistic wave equations. |
| `EQ-16` | `2` | Gauge and Standard Model-facing equations recovered as sector-visible projections with one weak/color/vector exposure domain and reaction provenance. | Build one weak/gauge exposure packet where `V-A`, CKM/PMNS overlap, reaction provenance, and covariance read from one $\mathcal E_S(A)$. |
| `EQ-16A` | `3` | Neutral-lepton retained branch derives common clock plus residual phase operator, two phase gaps, PMNS readout, and same-domain matter correction. | Populate $\Theta_{\nu,16A}$ from [eq-16a-neutrino-common-clock-phase-packet.md](eq-16a-neutrino-common-clock-phase-packet.md) or fail it closed. |
| `EQ-17` | `4` | Signed frequency-transfer ledger closes gravitational, Doppler, source, and path-history redshift as one source-path-receiver record. | Use one clean spectral family and the same endpoint cadence/path record as `EQ-07` through `EQ-09`. |
| `EQ-18` | `3` | Effective FRW metric and $a_{\mathrm{eff}}$ derived as observer-level projection of evolving Noether sea state, not void expansion. | Define the projection $\Pi_{\mathrm{FRW}}\Theta$ from the Noether sea history used by `EQ-17` and `EQ-19`. |
| `EQ-19` | `3` | Friedmann and cosmological continuity bookkeeping derived from fixed-void Noether sea evolution with provenance-bearing source rows. | Populate $R_H(\theta)$ and $R_{\rho}(\theta)$ using the same $\Pi_{\mathrm{FRW}}\Theta$ as `EQ-18`. |
| `EQ-20` | `3` | Negative effective pressure and $\Lambda_{\mathrm{eff}}$ derived from Noether sea tension, pressure, and relaxation without fitted $\Lambda$ or split records. | Pair the pressure residual with the `EQ-11` weak-gravity window in $\mathcal R_{11\text{-}20}$. |
| `EQ-21` | `3` | Structure growth, matter power, weak lensing/RSD, CMB lensing, and halo/cluster residuals computed from one Noether sea and assembly record. | Populate $\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$ from [eq-21-23-32-shared-observation-residual-packet.md](eq-21-23-32-shared-observation-residual-packet.md). |
| `EQ-22` | `3` | CMB transfer, blackbody, acoustic, lensing, and frame rows derived from shared thermal/provenance, source, path, and growth records. | Reuse the same $\Theta_{\mathrm{obs}}$ as `EQ-21` and add photon-loading and blackbody residual rows. |
| `EQ-23` | `3` | BBN freezeout, light-element yields, $\eta$, $N_{\text{eff}}$, photon loading, and neutrino rows derived from one source-window thermal record. | Reuse $\Theta_{\mathrm{src}}$ and $\Theta_{\mathrm{therm/prov}}$ inside $\Theta_{\mathrm{obs}}$; forbid independent source-zone parameters. |
| `EQ-24` | `3` | Acoustic, elastic, stress-strain, and medium equations derived as low-moment Noether sea response projections. | Extract one acoustic or stress-strain coefficient from $\mathcal C_{\mathrm{sea}}$ with delayed-support or response-kernel checks. |
| `EQ-25` | `3` | Boltzmann-like operator, entropy production, fluctuation, and thermalization rows derived from deterministic finite-window coarse-grained pushforward. | Populate one entropy or thermalization residual from the same event/boundary ledger used by `EQ-05` and `EQ-22`. |
| `EQ-26` | `3` | Rydberg scale, transition frequency, and local clock/photon channel rows derived from one atomic envelope Noether braid and Noether sea cell. | Derive one hydrogen spectral coefficient row from a declared atomic branch instead of line-inferred cadence fitting. |
| `EQ-27` | `2` | Magnetic moment, Larmor/cyclotron precession, and g-2 derived from exposed internal-current geometry, ordered-frame spin, and measurement-response rows. | Compute one magnetic moment row from the same exposure quotient and angular-momentum ledger used by `EQ-15`. |
| `EQ-28` | `3` | Compton, photoelectric, pair-threshold, and recoil equations recovered from one photon-channel event ledger with energy, momentum, angular momentum, recoil, remnant, and medium update. | Use this as the first finite-window event-ledger replay because it touches photon, mass, recoil, and conservation rows. |
| `EQ-29` | `3` | Larmor/Lienard, synchrotron, bremsstrahlung, and thermal radiation rows derived from source depletion, acceleration, photon packet selection, recoil, and spectrum rows. | After `EQ-28`, choose one radiation mechanism and close source depletion plus emitted power/spectrum on one ledger. |
| `EQ-30` | `2` | Cross sections and form factors derived from prepared branch ensembles, exposure distributions, detector kernels, and finite-window event statistics. | Run a finite-window pushforward for elastic scattering with detector kernel and event classes declared. |
| `EQ-31` | `2` | Resonance widths, lifetimes, and branching fractions derived from metastable branch stability and admissible escape corridors. | Use the same finite-window statistical pushforward to compute escape measures $\gamma_k$, $\Gamma$, $\tau$, and branching fractions. |
| `EQ-32` | `3` | RAR/BTFR and low-acceleration galaxy regularities derived from the same Noether sea constitutive response that preserves local gravity, CMB, BBN, growth, and cluster constraints. | Derive $a_\star^\theta(E)$ inside $\Theta_{\mathrm{obs}}$ and prove it does not spoil the large-scale and high-acceleration rows. |

## Score-5 Batch Order

The practical order is not row order. It is shared-carrier order:

1. **Root and conservation floor:** `EQ-01` and `EQ-05`. Without finite-window conservation, energy-momentum, photon, reaction, thermal, and precision rows cannot honestly reach `5`.
2. **Tri-binary equation-bearing search:** attach $\mathcal R_{\mathrm{cfg}}(\mathfrak a)$ to retained candidate records so $(f+2,f,f-1)$, $(f+1,f,f-1)$, $(f,f,f)$, $(4f,2f,f)$, and $(nf,mf,f)$ are compared by same-record residuals, not frequency labels alone.
3. **Lorentz and mass-shell retained branch:** `EQ-02` through `EQ-04`. This is the compact branch calculation that tests whether clock, ruler, energy, momentum, and rest mass can share one retained branch.
4. **Noether sea constitutive response:** `EQ-06` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32`. One coefficient extraction can unlock many rows, but hidden retune must be reported.
5. **Photon and finite event ledger:** `EQ-12`, `EQ-13`, `EQ-17`, `EQ-26`, `EQ-28`, and `EQ-29`. Compton/recoil is the smallest event replay with many consumers.
6. **Sector and quantum records:** `EQ-14` through `EQ-16A`, `EQ-27`, `EQ-30`, and `EQ-31`. These need deterministic pushforward and exposed-sector quotient rows before external wave or gauge equations are scored high.
7. **Cosmology shared-observation residual:** `EQ-18`, `EQ-19`, `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32`. These should advance after the same Noether sea constitutive record has at least one local coefficient extraction.

## Next Score-5 Work Item

The highest-value next concrete item remains the translating-binary retained-record run for `EQ-02` through `EQ-04`, because it is the smallest place where the common score-5 discipline can be tested end to end:

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)
\longrightarrow
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
\longrightarrow
\left(
R_T,
R_{\xi},
R_{\mathrm{tw}},
R_E,
R_p,
R_{\mathrm{shell}},
R_{M_0},
R_{\mathcal M},
\mathcal R_{01-05}^{\mathfrak B_u},
\mathcal S_{\mathrm{root}},
\mathcal S_{\mathrm{retune}}
\right).
$$

If that run passes, it creates a real path for `EQ-02`, `EQ-03`, and `EQ-04` to reach `5`. If it fails cleanly, it still advances the program by identifying which common carrier breaks first.

Parallel solver hook: the stable tri-binary configuration search now emits an `equationBearing` payload with $\mathcal R_{\mathrm{cfg}}(\mathfrak a)$ structure for each candidate branch-chart projection. That hook does not raise any row score by itself; it makes the score-5 ladder consumable by the branch-selection solver and keeps the $(f,f,f)$ candidate on equal footing with the offset and hierarchy families until retained residuals decide.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: this ladder names score-5 acceptance objects, but does not itself derive them. It should guide solver and proof work; it should not mark additional rows as `5`.
