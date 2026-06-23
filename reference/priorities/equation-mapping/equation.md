# Equation Mapping Detail

## Purpose

This file lists the standard physics and cosmology equations that should tie directly to the Noether sea, the Noether braid, or both. It records dated maturity scores for each map in current $\mathbb{A}\mathbb{A}\mathbb{A}$ material and gives a closure packet for each equation group.

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

## Summary Table

| ID | Equation or equation group | Representative equation | Primary AAA carrier | 6/23 a | 6/23 b | Closure driver | Promoted? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `EQ-01` | Causal wake master equation and per-hit law | $\mathbf{a}_{o'\leftarrow o}\propto r^{-2}J^{-1}\hat{\mathbf r}$ | Architrino causal wakes, causal-root ledger | `5` | `5` | Keep all later maps tied to active roots, Jacobians, line-of-action hits, and event ledgers. |  |
| `EQ-02` | Lorentz factor, clock rate, and ruler contraction | $\gamma_{\star}=(1-\beta_{\star}^2)^{-1/2}$; $d\tau/dt=1/\gamma_{\star}$ | Moving Noether braid through local Noether sea | `4` | `4` | Derive moving-clock and moving-ruler factors from one branch ledger. |  |
| `EQ-03` | Oblate spheroidal envelope ratio | $\xi=R_{\parallel}/R_{\perp}\to1/\gamma_{\mathrm{eff}}$ | Noether braid envelope geometry | `4` | `4` | Prove return-cycle closure produces the axis ratio, not just a visual match. |  |
| `EQ-04` | Energy-momentum and rest energy | $E^2=p^2c_{\mathrm{eff}}^2+M_0^2c_{\mathrm{eff}}^4$ | Closed internal causal-history ledger, shielding, Noether sea response | `3` | `4` | Compose branch energy, exposure quotient, and medium-response tensor. |  |
| `EQ-05` | Noether conservation laws | $dE_{\mathrm{tot}}/dt=0$; $\mathbf{P}_{\mathrm{tot}}=\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}$ | Delay action, wake channels, event ledgers | `3` | `4` | Construct finite-window conserved totals with boundary flux and residuals. |  |
| `EQ-06` | Noether sea continuity and moment closure | $\partial_t\rho_{\mathrm{NS}}+\nabla\cdot(\rho_{\mathrm{NS}}\mathbf u_{\mathrm{sea}})=S_{\rho}+r_{\rho}$ | Noether sea density, flow, energy, cadence, orientation | `4` | `4` | Derive continuum rows as low-moment projections of braid population dynamics. |  |
| `EQ-07` | Effective metric ADM/Cartan map | $ds_{\rm eff}^2=-N^2c_0^2dt^2+\gamma_{ij}(dx^i-u^i_{\mathrm{sea}}dt)(dx^j-u^j_{\mathrm{sea}}dt)$ | Noether sea lapse, drift, spatial compliance | `4` | `4` | Derive one constitutive map into clock, ruler, and signal channels. |  |
| `EQ-08` | Weak-field clock and gravitational redshift | $d\tau/dt\approx1+\Phi_N/c_0^2-\lVert\mathbf w\rVert^2/(2c_0^2)$ | Noether sea cadence $\Gamma_N$, moving clock channel | `4` | `4` | Extract $\Gamma_N$ from braid cadence, density, delay, and potential response. |  |
| `EQ-09` | Shapiro delay, lensing, and PPN rows | $\Delta\theta=2(1+\gamma_{\mathrm{PPN}})GM/(bc_0^2)$ | Shared effective metric projection | `3` | `4` | Force redshift, Shapiro, lensing, precession, acceleration, and preferred-frame rows through one record. |  |
| `EQ-10` | Geodesic and proper-time action | $S_{\mathrm{clk}}=-mc_0^2\int d\tau$ | Observer-level clock/ruler record from Noether sea | `3` | `3` | Recover geodesic motion as a projection, not as substrate geometry. |  |
| `EQ-11` | Einstein and Poisson weak-gravity limits | $\nabla^2\Phi_N=4\pi G\rho$; $G_{\mu\nu}=8\pi GT_{\mu\nu}/c^4$ | Noether sea stress, density, effective response | `2` | `3` | Derive $G_{\mathrm{eff}}$, stress-energy readout, and curvature response from the same constitutive law. |  |
| `EQ-12` | Photon energy, null condition, and eikonal propagation | $E=h\nu$; $g^{\mathrm{eff}}_{\mu\nu}dx^\mu dx^\nu=0$ | Photon-channel packets through Noether sea | `3` | `3` | Connect packet energy, helicity, null transport, and medium frequency exchange. |  |
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
| `EQ-23` | BBN rate and freezeout equations | reaction-network yields $\mathbf Y[\{T,\rho,n_b,n_\gamma,n_n\}]$ | Source-window thermal record and Noether sea state | `2` | `3` | Preserve light-element yields, $\eta$, $N_{\text{eff}}$, photon loading, and neutrino rows in one record. |  |
| `EQ-24` | Fluid, elastic, and acoustic-medium equations | acoustic metric and stress-strain laws as comparison forms | Noether sea continuum response | `3` | `3` | Use only as low-moment projections of Noether braid population dynamics. |  |
| `EQ-25` | Thermodynamic, Boltzmann, entropy, and fluctuation equations | $df/dt=C[f]$; $dS/dt\ge0$ | Coarse-grained sea and record dynamics | `2` | `3` | Derive thermalization, irreversibility, and noise from deterministic unresolved degrees of freedom. |  |
| `EQ-26` | Atomic spectral constants, fine/hyperfine structure, and Lamb-shift class | $1/\lambda=R_\infty(1/n_b^2-1/n_a^2)$; $\Delta E=h\nu$ | Atomic envelope Noether braid, local clock row, angular-momentum ledger | `3` | `3` | Recover one shared Rydberg scale and then attach spin-sensitive and loop-sensitive residuals without per-line fitting. |  |
| `EQ-27` | Magnetic moment, Larmor/cyclotron precession, and g-2 | $\boldsymbol\mu=g(q/2m)\mathbf S$; $a_\ell=(g-2)/2$ | Internal current geometry, ordered-frame spinor ledger, measurement-response row | `2` | `2` | Derive magnetic moment and anomaly as exposed internal-current response, not as an assigned spin label. |  |
| `EQ-28` | Compton, photoelectric, pair-threshold, and recoil equations | $\Delta\lambda=h(1-\cos\theta)/(m_ec)$; $E_\gamma\ge2m_ec^2$ | Photon-channel event ledger, recoil branch, pair-production provenance | `3` | `3` | Close energy, momentum, angular momentum, photon packet, recoil, and material/Noether sea update in one event record. |  |
| `EQ-29` | Larmor/Lienard radiation, synchrotron, bremsstrahlung, and thermal channels | $P_L=q^2a^2/(6\pi\epsilon_0c^3)$; $\nu_c\propto\gamma^2B$ | Radiation residual, photon-channel packet selection, source-event ledger | `3` | `3` | Keep source mechanism separate from carrier/channel family while deriving emitted power and spectrum from one ledger. |  |
| `EQ-30` | Scattering cross sections and form factors | $d\sigma/d\Omega\propto\lvert\mathcal M\rvert^2$; $F(Q^2)$ | Detector record statistics, exposure distribution, branch-outcome measure | `2` | `2` | Recover event rates and finite-size/exposure form factors from branch statistics rather than postulated amplitudes. |  |
| `EQ-31` | Resonance widths, lifetimes, and branching fractions | $\sigma(E)\propto[(E-E_0)^2+\Gamma^2/4]^{-1}$; $\tau=\hbar/\Gamma$ | Metastable Noether braid branch, leakage corridor, decay provenance ledger | `2` | `2` | Derive width, lifetime, and branching fractions from branch stability and admissible decay corridors. |  |
| `EQ-32` | Baryonic Tully-Fisher and radial-acceleration relation | $g_{\mathrm{obs}}\approx\sqrt{g_{\mathrm{bar}}a_0}$; $v_f^4=GM_ba_0$ | Noether sea constitutive response around baryonic assemblies | `2` | `3` | Treat low-acceleration galaxy regularities as constitutive-response benchmarks without importing a new ontology. |  |

## EQ-01: Causal Wake Master Equation And Per-Hit Law

### Standard or Native Form

The native substrate equation is the per-hit causal wake acceleration:

$$
\mathbf{a}_{o'\leftarrow o}(t;t_0)
=
\kappa\,\sigma_{q_o q_{o'}}
\frac{|q_o q_{o'}|}
{r^2|J_{o'\leftarrow o}(t;t_0)|}
\hat{\mathbf r},
$$

with causal-root Jacobian

$$
J_{o'\leftarrow o}(t;t_0)
=
1-\frac{\mathbf v_o(t_0)\cdot\hat{\mathbf r}}{c_f}.
$$

### AAA Mapping

This is the root equation from which the rest of the mapping must not drift. It carries:

- finite causal delay;
- inverse-square causal wake dilution;
- line-of-action direction;
- source polarity and receiver polarity;
- Jacobian bunching or dilution;
- active-root branch structure.

### Closure Status

Score: `5`.

The equation is native. The open work is not to map it into AAA, but to prevent higher-level equations from bypassing it. Every later formula should identify which reduced record of active roots, wake energy, event ledgers, or Noether sea moments it consumes.

### Agent Target

Write a dependency note showing, for each equation group below, which variables must ultimately descend from causal roots, Jacobians, wake ledgers, or coarse-grained Noether sea moments.

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

The pass condition should require both residuals to use the same root ledger, speed convention, branch label, and Noether sea state.

### Agent Target

Start from the special-relativity bridge and Lorentz kinematics chapter. Build one closure packet that states the common-limit theorem target joining $\xi$, $T_q/T_0$, two-way signal speed, preferred-frame leakage, and energy-momentum closure.

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

Compose the mass-map priority packets with the Lorentz envelope packet. The immediate result should be a mass-shell closure theorem target with explicit dependency on $\xi$, $\Gamma_N$, $\zeta(A)$, $E_{\mathrm{internal}}$, and $\mathcal M_{\mathrm{sea}}^{ab}$.

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

Build the conservation-law mapping table: energy, momentum, angular momentum, action, wake flux, Noether sea exchange, recoil, and event residuals.

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

Build a single effective-metric closure table that lists each observable, the needed projection from $\theta_W$, the current corpus location, and the coefficient or residual still missing.

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

Do not attempt full GR closure first. Derive the Poisson-limit handoff from Noether sea density/stress to $\Phi_{\mathrm{eff}}$ and identify which existing PPN rows would falsify a scalar-only map.

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

### Closure Status

Current `6/23 b` scores: `3` for photon energy/null transport and `3` for Maxwell and wave equations.

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

### Agent Target

Pick either the Born-current row or the spinor row. Build the smallest equation-level packet that states the AAA variables, current evidence, missing derivation, and first falsifier.

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

### Closure Burden

The retained branch must show, on one event or positive-width domain:

- common-frequency factorization: $\omega_1=\omega_2=\omega_3=\omega_f$ enters only through a common phase or shared clock row;
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

Use redshift as the first cosmology closure packet. Build a worked record for one clean case: gravitational endpoint redshift, Doppler launch redshift, or deep-space path accumulation.

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

Build the smallest fixed-void Friedmann packet: define $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, and $\mathcal S_{\mathrm{eff}}$ as projections of one Noether sea and assembly record.

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

Build a dark-energy pressure closure packet that distinguishes fitted $\Lambda$, integration constant, vacuum comparison, and native Noether sea output.

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

Write a BBN source-window packet that states which Noether sea variables must enter $T$, $\rho$, $\eta$, $N_{\mathrm{eff}}$, and expansion/cooling chronology.

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

Pick one ordinary medium equation, preferably acoustic metric or stress-strain response, and translate every coefficient into a Noether sea variable or an explicit missing coefficient.

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

### Closure Burden

The row must recover:

- one transition-independent Rydberg readout for a declared weak-homogeneous line set;
- recovered envelope labels $(n,\ell,m)$ rather than imported orbital inputs;
- reduced-mass, recoil, local clock, and Noether sea corrections without absorbing them into a fitted $R_\infty$;
- spin-orbit, Zeeman, hyperfine, and Lamb-shift-class residuals as downstream angular-momentum, radiation, and measurement-response rows;
- a shared event ledger for absorption, emission, recoil, and non-radiative alternatives.

### Agent Target

Build an atomic spectral closure packet that starts with the existing hydrogen line-set residual and adds a residual taxonomy: gross envelope gap, clock/rate conversion, recoil/reduced-mass row, spin-sensitive row, and Lamb-shift-class radiation/wake-dressing row.

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

### Closure Status

Score: `2`.

The angular-momentum proof program names the right consumers, but the current map does not yet derive $g_\ell$, $a_\ell$, or the magnetic precession frequencies from one retained Noether braid branch.

### Closure Burden

The same branch must supply:

- charge polarity and exposed mass response;
- internal angular-momentum ledger and ordered-frame spinor support;
- magnetic moment projection into an external field branch;
- precession and measurement-response records;
- anomaly rows that do not retune the leading spin ledger separately for electron, muon, and tau comparisons.

### Agent Target

Write a g-2 closure packet that identifies the minimal Noether braid variables needed for $\boldsymbol\mu_\ell$, the leading $g=2$ comparison, the residual anomaly, and the first falsifier against magnetic-precession data.

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

### Closure Burden

The row must recover:

- total emitted power and spectral distribution;
- source energy loss and recoil;
- polarization and angular-momentum balance;
- medium and Noether sea updates;
- thermal and blackbody limits without replacing the event ledger by an independent statistical fit.

### Agent Target

Write a radiation-source packet that chooses one mechanism, preferably synchrotron or bremsstrahlung, and states the exact source ledger, photon-channel output, recoil row, polarization row, energy-loss row, and benchmark residual.

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

### Closure Status

Score: `2`.

The quantum/Born-current rows provide the broad statistical target, but the equation map does not yet connect specific scattering amplitudes, detector kernels, exposure distributions, and form factors to Noether braid branch statistics.

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

### Closure Status

Current `6/23 b` score: `3`.

The equation is a strong observational benchmark, and the current $\mathbb{A}\mathbb{A}\mathbb{A}$ map is now a shared constitutive-response target. It should not be imported as a new gravity ontology or as permission to bypass the effective-metric and cosmology rows.

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
2. `EQ-04`: energy-momentum and rest energy. This should attach the Lorentz envelope to mass-map work.
3. `EQ-07` through `EQ-10`: effective metric and weak-field observables. This turns local braid/sea response into GR-facing tests.
4. `EQ-17` through `EQ-19`: redshift, effective FRW, and Friedmann transfer. This is the main cosmology bridge.
5. `EQ-21` through `EQ-23`: structure, CMB, and BBN transfer. These are large but necessary for cosmology closure.
6. `EQ-12` through `EQ-16A`: photon, Maxwell, quantum, spinor, gauge, and neutrino phase-gap equations. These are central but require more branch and record machinery; `EQ-16A` is the smallest precise weak-sector packet because neutrino oscillation supplies a two-gap benchmark.
7. `EQ-26` through `EQ-31`: atomic spectra, magnetic moments, recoil/radiation, scattering, and resonance widths. These are observation-first precision surfaces that should discipline the Noether braid event, spin, radiation, and branch-stability ledgers.
8. `EQ-32`: baryonic Tully-Fisher and radial-acceleration relation. This is a high-value low-acceleration constitutive-response benchmark, but it should stay downstream of the effective-metric and cosmology rows.
9. `EQ-24` and `EQ-25`: medium and thermodynamic equations. These are broad support equations that should be driven by concrete consumers.

## New-Thread Prompt

```text
Closure goal:
Run a multi-agent equation-mapping closure pass that assigns one standard physics or cosmology equation group to each worker and advances each assigned map toward a concrete AAA closure packet.

Use the AAA corpus advancement skill in team-agent mode.

Context:
- Priority folder: `reference/priorities/equation-mapping/`.
- Start with `reference/priorities/equation-mapping/equation-mapping.md` and `reference/priorities/equation-mapping/equation.md`.
- The line items in `equation.md` use dated score columns from `0` to `5`; `6/23 a` is the first-round score, and `6/23 b` records accepted worker-backed scores where populated.
- The current high-value bridge is:
  `Noether braid closure -> (xi, Gamma_N, chi_sea, rho_NS) -> g_eff -> (H_eff, z, D(z), P(k,z))`.
- Stable tri-binary branch search uses role-assigned $I:M:O$ triples after generic binary labels are mapped. Active families include $(f+2,f,f-1)$, $(f+1,f,f-1)$, $(f,f,f)$, $(4f,2f,f)$, and $(nf,mf,f)$. Treat these as search coordinates and consume the fail-closed solver-facing `equationBearing` residual payload before ranking them.
- The immediate objective is not broad prose. It is one closure packet per equation group: variables, assumptions, mapped equation, missing derivation, first proof/simulation step, failure mode, and promotion targets.
- Multiple agents may be running at the same time. Treat the assignment list as a concurrency boundary: each worker owns only its assigned equation IDs unless the coordinator explicitly reassigns scope.

Task:
1. Run `git status --short` first. Do not revert existing changes.
2. Read the two equation-mapping files.
3. Start parallel workers if the environment supports it. Assign one line item or tightly related group per worker, and tell each worker which equation IDs it owns. Prefer these first if worker count is limited:
   - `EQ-02` and `EQ-03`: Lorentz factor, clock/ruler retuning, and oblate spheroidal envelope.
   - `EQ-04`: energy-momentum and rest energy.
   - `EQ-07` through `EQ-10`: effective metric, weak-field clocks, PPN, and geodesic benchmarks.
   - `EQ-17` through `EQ-19`: redshift, effective FRW, Friedmann, and cosmological continuity.
   - `EQ-21` through `EQ-23`: structure growth, CMB transfer, and BBN yields.
   - `EQ-12` through `EQ-16A`: photon, Maxwell, quantum-wave, spinor, gauge, and neutrino phase-gap equations.
   - `EQ-26` through `EQ-31`: atomic spectra, magnetic moment and g-2, Compton/recoil, radiation power, cross sections/form factors, and resonance widths.
   - `EQ-32`: baryonic Tully-Fisher and radial-acceleration relation as Noether sea constitutive-response benchmarks.
   - `EQ-06`, `EQ-24`, and `EQ-25`: Noether sea continuum, medium equations, and thermodynamic/statistical equations.
4. Each worker must inspect the relevant canonical and priority files before writing. Use targeted `rg` searches for the equation family, the AAA variables, and the target documents listed in the promotion map.
5. Each worker should produce a closure packet with:
   - standard equation and regime;
   - current AAA mapped form;
   - required Noether braid variables;
   - required Noether sea variables;
   - event, wake, branch, record, or residual rows needed;
   - score review with justification;
   - first mathematical object to add next: definition, lemma, residual, simulation target, or proof route;
   - failure mode or falsifier;
   - candidate promotion targets under `content/markdown/aaa`, if the packet matures.
6. To avoid concurrent write collisions, prefer one sibling detail file per assigned equation group when multiple agents are active. Use `equation.md` for summary-table updates only after the coordinator has collected worker outputs.
7. If a worker completes a line item strongly enough to change a score, update the next active dated score column in the summary table and explain the score change in the relevant section.

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
- After edits, run `git diff --check`.
- If reader-facing corpus files were edited, also run:
  `node scripts/validate-content.mjs --check --strict`
  and
  `node scripts/build-scene-graph.mjs --check --strict`.

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
