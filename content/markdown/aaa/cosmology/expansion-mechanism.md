# Expansion Mechanism

This chapter explains how cosmological expansion language is translated into a fixed-void ontology. Its purpose is to replace geometric container expansion with medium evolution, clock-rate comparison, and effective scale-factor bookkeeping while preserving contact with the standard observational vocabulary. It is the main cosmology bridge from [Cosmology Ontology](./cosmology-ontology.md) to [CMB](./CMB.md), [Structure Formation](./structure-formation.md), and [Dark Energy](./dark-energy.md).

The sections below move from the core idea to redshift, photon propagation, dark-energy language, tension interfaces, and the effective Friedmann comparison layer.

## Core Idea

The [Euclidean void](../foundations/euclidean-void.md) does not expand. What evolves is the Noether sea and the state of assemblies moving through it.

## Effective Scale Factor in a Fixed Void

Define an effective scale history from medium structure:

$$
a(t)\propto \frac{\langle L_{\text{core}}(t)\rangle}{\langle L_{\text{core}}(t_{\text{ref}})\rangle}
$$

where $L_{\text{core}}$ is a representative assembly-separation scale.

This $a(t)$ is a summary of medium evolution inside fixed $(x,y,z)$, not geometric stretching of the container.

Equivalent bookkeeping choices can be used in the same ontology:

$$
a(t)\ \leftrightarrow\ \langle R_{\text{core}}(t)\rangle
\quad\text{or}\quad
a(t)\propto u_{\text{sea}}(t)^{-1/3}
$$

These are effective parameterizations of Noether sea state, not independent geometric claims.

Quasi-steady and cyclical comparison families may use an oscillatory effective scale history such as
$$
a_{\mathrm{eff},X}(t)
=
e^{t/P}
\left[
1+\alpha\cos\left(\frac{2\pi t}{Q}+\varphi\right)
\right],
\qquad
P\gg Q
$$
In this framework that expression is only a projection of Noether sea state recurrence, source recycling, and clock or transport response. It does not describe expansion of the Euclidean void. Such a branch is admissible only if the same Noether sea state record supplies the source term, redshift-transfer map, CMB thermal record, and BBN yield record.

### Exponential Scale History as a Comparison Limit

The de Sitter and steady-state comparison family often uses a spatially flat exponential scale history,
$$
a_{\mathrm{eff}}(t)=a_0 e^{H_*t},
\qquad
H_{\mathrm{eff}}=H_*
$$
In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not evidence that the Euclidean void expands. It is a special homogeneous projection in which the corrected redshift-transfer slope is constant over the comparison interval. In the endpoint-subtracted propagation language below, the nearby homogeneous limit must satisfy
$$
\bar{\alpha}_X=\frac{H_*}{c_0}
$$
after endpoint cadence, source-branch change, and relative launch motion have been removed.

The steady-state lesson is a conservation check on this limit. Holding an effective matter density constant while $a_{\mathrm{eff}}$ grows requires a source term
$$
\mathcal{S}_{m,\mathrm{eff}}=3H_*\rho_{m,\mathrm{eff}}
$$
and that source must be routed through the same assembly and Noether sea provenance record that computes the redshift-transfer slope. A constant $H_*$ fit without this ledger is only a kinematic comparison curve.

## Clock-Rate Redshift Interpretation

Cosmological redshift is treated as cumulative propagation through a changing medium plus clock-rate mismatch between emitter and observer environments.

Use the proper-time map from [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md):

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{NS}}(\mathbf{x},t),n(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right)
$$

A photon that traverses regions with different $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\Phi_{\text{eff}}$ is read by clocks with different local rates. The observed $z$ is then an emergent comparison of those rates along the path-history record.

Operationally:

$$
1+z = \frac{\nu_e}{\nu_o}
= \frac{(d\tau/dt)_o}{(d\tau/dt)_e}
$$

so redshift is treated as path-integrated medium evolution plus endpoint clock-rate comparison.

The stronger reading is that redshift is one sign of a broader photon-frequency transfer record. A photon packet may arrive redward of the clean emitted line, blueward of it, or unchanged after endpoint, source-branch, launch, and path terms have been separated. Define the signed frequency-transfer budget

$$
Z_X^{E\to R}
\equiv
\ln\frac{\nu_{X,0}}{\nu_{\mathrm{obs},X}}
$$

so $Z_X>0$ is redward relative to the clean reference line and $Z_X<0$ is blueward. A path segment that transfers energy from an energetic intervening medium into the photon-channel packet contributes a negative increment to the path term, while a segment that transfers photon energy into a lower-energy medium contributes a positive increment. Sunyaev-Zeldovich-type comparisons are the observed calibration family for this point: CMB photon frequencies can be shifted by intervening electron populations, so photon frequency is a path-history observable rather than a primitive expansion clock.

For modeling and diagnostics, separate at least three effective channels:

- endpoint clock-rate comparison,
- source/observer relative-motion (Doppler-like) contribution,
- propagation contribution from traversed Noether sea state and gradients.

### Absolute Record Interpretation

The substrate record is not a collection of observer frames. It is the evolving universe state

$$
\mathbb{U}_{\text{now}}=S(t)
$$

where absolute time $t$ indexes definite architrino positions, velocities, assemblies, causal wakes, Noether sea state variables, and path-history ledgers in the fixed Euclidean void. Redshift must therefore be read as an observer-level extraction from that absolute record, not as a primitive change in space or time.

| Layer | Substrate role in redshift |
| --- | --- |
| Euclidean void | The container does not expand or curve; spatial points keep their identity. |
| Absolute time | $t$ does not dilate; it orders the emission, propagation, and reception events. |
| Noether sea | The Noether sea deforms, flows, polarizes, relaxes, and changes cadence. |
| Emitter | A local assembly changes branch and releases a photon-channel packet. |
| Photon packet | The packet carries a definite path-history record through the Noether sea. |
| Receiver | A local assembly samples or captures the packet using its own local cadence. |
| Measured energy | $E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}$ is the receiver-coupling result, not a standalone scalar detached from emission, path, and reception. |

The central distinction is that nothing happens to absolute time itself. What changes are local cycle rates, launch geometry, and path-history phase cadence inside the Noether sea. A strong-field redshift near a compact object is the high-gradient endpoint limit of this record. A deep-space redshift is the gentle-gradient, long-path limit, if the path-history propagation term survives the required image-sharpness, coherence, and time-dilation tests.

### Noether Sea Braid Factorization Target

A sharper closure target rewrites the endpoint clock-rate comparison in terms of the local Noether sea braid cadence itself. Let $\Omega_N(\mathbf{x},t)$ denote a representative local Noether sea braid cadence and $T_N(\mathbf{x},t)=2\pi/\Omega_N(\mathbf{x},t)$ its cycle period. Relative to a weak homogeneous reference core, define

$$
\Gamma_N(\mathbf{x},t)
\equiv
\frac{T_N(\mathbf{x},t)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf{x},t)}
$$

The factor $\Gamma_N$ is not a new time variable. It records how strongly the local Noether sea braid cadence is stretched relative to the weak homogeneous reference. In a validated homogeneous Lorentz-closure branch, $\Gamma_N$ should reduce to the corresponding moving Noether braid deformation factor; outside that limit it remains a Noether sea state diagnostic to be derived from Noether braid geometry and clock extraction. The endpoint extraction target is stated in [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target), where the moving Noether braid limit fixes the coefficient of $-\ln\xi$ and the weak-field endpoint limit fixes one isotropic Noether sea response combination.

For a spectral transition family $X$, the working redshift factorization is

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}
{B_X(E)\,\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}
$$

Here $\Gamma_{N,E}/\Gamma_{N,R}$ is the emitter-to-receiver Noether sea braid cadence ratio, $\mathcal{P}_{E\to R}$ is the path-history propagation factor through the intervening Noether sea, $B_X(E)$ records any real source-branch shift in the emitting transition, and $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$ records directional launch geometry from relative motion. The clean reference case has $B_X(E)=1$ and negligible path accumulation. Strong local-gradient redshift is dominated by $\Gamma_{N,E}/\Gamma_{N,R}$; gentle deep-space redshift may instead accumulate mainly through $\mathcal{P}_{E\to R}$.

The logarithmic budget makes the scale hierarchy explicit:

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+\ln\mathcal{P}_{E\to R}
-\ln B_X(E)
-\ln\mathcal{L}_{E\to R}(\hat{\mathbf{k}})
$$

A factor may be set to $1$ only when its logarithmic contribution is small relative to the dominant contribution and to the observational tolerance. This prevents the same redshift record from silently switching between gravitational, relative-motion, source-branch, and propagation explanations.

In this convention the path-history term is explicitly signed:

$$
Y_{X,E\to R}
=
\sum_j \Delta Y_{X,j},
\qquad
\Delta Y_{X,j}
=
-\ln\frac{\nu_{X,j}^{+}}{\nu_{X,j}^{-}}
\quad
\text{after endpoint, source, and launch terms are held fixed}
$$

Here $\nu_{X,j}^{-}$ and $\nu_{X,j}^{+}$ are the photon-channel frequencies immediately before and after the segment-level exchange as read by the same comparison clock. A frequency boost has $\Delta Y_{X,j}<0$; a frequency depletion has $\Delta Y_{X,j}>0$. The local exchange must close an energy ledger such as

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex},j}
=
\frac{
\left|
h(\nu_{X,j}^{+}-\nu_{X,j}^{-})
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_E}
$$

where $\Delta E_{\mathrm{med}}$, $\Delta E_{\mathrm{recoil}}$, and $\Delta E_{\mathrm{rem}}$ are positive or negative according to the retained medium, target, and remnant energy changes. A cosmological path term is admissible only when the signed frequency transfer, image sharpness, packet cadence, spectral coherence, and energy ledger are supplied by one Noether sea record.

### Observable Frequency Form

The same factorization can be written in the more familiar language of an emitted line frequency and a received line frequency. If $\nu_{X,0}$ is the reference frequency for transition family $X$, then

$$
\nu_{\mathrm{obs}}
\approx
\nu_{X,0}\,
B_X(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}
$$

Equivalently,

$$
1+z_X
=
\frac{\nu_{X,0}}{\nu_{\mathrm{obs}}}
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_X(E)D_v}
$$

Here $D_v$ is the launch or relative-motion frequency factor. In the simple radial comparison limit, let

$$
v_r
\equiv
(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}},
\qquad
\beta_r=\frac{v_r}{c_0}
$$

where $\hat{\mathbf{k}}$ points from emitter to receiver and $v_r > 0$ means the endpoint separation is increasing. The familiar comparison form is

$$
D_v
\approx
\sqrt{\frac{1-\beta_r}{1+\beta_r}}
\approx
1-\frac{v_r}{c_0}
\quad
\text{for } \lvert v_r\rvert\ll c_0
$$

The receiver-facing photon energy is the local coupling result

$$
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs}}
\approx
h\nu_{X,0}\,
B_X(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}
$$

This is not an additional energy-loss term. The local emission ledger is carried by $\nu_{X,0}B_X(E)$, while the receiver reads that packet through endpoint cadence, launch geometry, and path-history propagation.

The hard closure question is therefore not which observer frame carries the true photon energy. It is whether one absolute Noether sea transport law can compute $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ from $S(t)$ without switching explanations between gravitational, relative-motion, and deep-space redshift cases.

The factor $D_v$ is not an independent ontology. It is the low-speed endpoint of the source/receiver launch-geometry term $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$.

### Absolute-Record Transport Map

The first proof scaffold is to define one extraction map from the absolute record. For a line family $X$, emission event $E=(\mathbf{x}_E,t_E)$, reception event $R=(\mathbf{x}_R,t_R)$, and declared photon-channel path $\gamma_{E\to R}$, let

$$
\mathcal{S}_{X,E\to R}
\equiv
S(t)\big|_{\{E,R,X,\gamma_{E\to R},\theta_{\mathrm{sea}},\mathcal{H}_{\mathrm{wake}}\}}
$$

denote the restricted record containing the source assembly branch, receiver assembly branch, path-history wake ledger, Noether sea state variables, and photon-channel path data needed for the comparison. This is not an observer frame; it is the part of $\mathbb{U}_{\text{now}}\equiv S(t)$ consumed by the redshift calculation.

The transport map target is

$$
\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]
=
\left(
\Gamma_{N,E},\,
\Gamma_{N,R},\,
B_X(E),\,
D_v,\,
Y_{X,E\to R}
\right)
$$

with

$$
Y_{X,E\to R}
\equiv
\ln\mathcal{P}_{E\to R,X}
$$

The recovered redshift is then

$$
Z_X[\mathcal{S}_{X,E\to R}]
\equiv
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+Y_{X,E\to R}
-\ln B_X(E)
-\ln D_v
$$

Each term has a separate extraction rule.

Endpoint cadence is read from the local Noether sea braid cadence:

$$
\Gamma_{N,A}
=
\frac{\Omega_{N0}}
{\Omega_N(\mathbf{x}_A,t_A;\Pi_N S(t_A))},
\qquad
A\in\{E,R\}
$$

where $\Pi_N S(t_A)$ is the local Noether sea braid record near endpoint $A$. Source-branch shift is read before propagation:

$$
B_X(E)
=
\frac{\nu_{X,\mathrm{emit}}(E;\Pi_E S(t_E))}
{\nu_{X,0}}
$$

where $\Pi_E S(t_E)$ is the local source-assembly and environment record that determines whether the transition remains on the clean reference branch.

Launch geometry is the homogeneous-reference replay of the same source and receiver worldlines:

$$
D_v
\equiv
\left.
\frac{dN_\phi/dt_R}{dN_\phi/dt_E}
\right|_{\theta_{\mathrm{sea}}=\theta_0,\;\Gamma_N=1,\;B_X=1}
$$

where $N_\phi$ counts adjacent emitted phase markers received in the reference Noether sea state $\theta_0$. This definition isolates source/receiver motion and emission direction from endpoint cadence and path-history propagation. In the simple radial, weak-speed limit it reduces to

$$
D_v
\approx
\sqrt{\frac{1-\beta_r}{1+\beta_r}},
\qquad
\beta_r=\frac{(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}}}{c_0}
$$

Path-history propagation is then the remaining Noether sea transport integral:

$$
Y_{X,E\to R}
=
\int_{\gamma_{E\to R}}
\mathcal{C}_X
\!\left(
\Pi_\gamma S(t(\ell)),
\hat{\mathbf{k}}(\ell)
\right)d\ell
$$

with

$$
\Pi_\gamma S(t(\ell))
=
\left(
\boldsymbol{\theta}_\gamma,\,
\mathbf{u}_{\text{sea}},\,
S_{ij},\,
\mathcal{H}_{\mathrm{wake}}
\right)_{\gamma(\ell),t(\ell)}
$$

This makes the proof obligation explicit. A gravitational endpoint redshift is the special case $B_X=1$, $D_v=1$, and $Y_X\approx0$, with $\Gamma_N$ supplying the weak-field benchmark. A homogeneous relative-motion redshift is the special case $\Gamma_{N,E}=\Gamma_{N,R}=1$, $B_X=1$, and $Y_X=0$, with $D_v$ supplying the shift. A deep-space propagation redshift is the special case where endpoint and launch terms are controlled while $Y_X$ accumulates from the path-history Noether sea record.

The one-map closure condition is therefore

$$
\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]
\quad\text{uses one }S(t)\text{ restriction and one coefficient record.}
$$

If the endpoint, launch, and propagation terms can be made to fit only by changing $\Pi_N S$, $\Pi_E S$, $\Pi_\gamma S$, or the coefficient row independently for each observational family, then the factorization is a useful diagnostic but not yet an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

### Equilibrium-Transport Candidate for Path History

The current candidate for the gentle deep-space term is a Noether braid equilibrium transport law. In this reading, a weak-field path does not accumulate redshift because the photon loses energy as it scatters. It accumulates a phase-cadence path-history term because the photon packet traverses a Noether sea population whose braid-cadence distribution evolves in absolute time.

Let $f_N(\nu,\mathbf{x},t)$ be the local distribution of Noether braid cadence states, with representative braid energy $E_N=h\nu_N$. At the discrete level, each accepted $h$-scale transaction retunes a braid's cadence-scale closure rather than sliding a continuous single-braid frequency. The continuum current should therefore be read as the ensemble flux

$$
J_\nu
\sim
f_N
\left\langle
\dot{\nu}_N
\right\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}
$$

with the average taken over accepted branch changes inside the coarse-graining cell. A provisional transport packet is

$$
\partial_t f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

where $J_\nu$ is the frequency-space relaxation current, $S_{\mathrm{BH}}$ is medium loading from black-hole recycling regions, $S_{\mathrm{GW}}$ is a gravitational-wave perturbation term, and $R_{\mathrm{eq}}[f_N]$ is the local neighbor-equilibration operator. The projection into the redshift budget should have the form

$$
\alpha_{\mathrm{prop},X}
=
\mathcal{A}_X\!\left[
f_N,\,
J_\nu,\,
S_{\mathrm{BH}},\,
S_{\mathrm{GW}},\,
R_{\mathrm{eq}};
\mathbf{x},t,\hat{\mathbf{k}}
\right]
$$

This is a closure target. If $J_\nu$ vanishes after coarse-graining, or if the source and equilibration terms cancel without a signed large-scale drift, the equilibrium law supplies no expansion-like effect. If the projection is nonzero, it must still pass the same image-sharpness, chromaticity, and packet time-dilation checks as the rest of $\mathcal{P}_{E\to R}$. That condition keeps the hypothesis out of the excluded tired-light class.

In a weak field sourced by masses $M_a$, the Newtonian benchmark potential is

$$
\Phi_N(\mathbf{x})
\approx
-\sum_a \frac{G M_a}{\|\mathbf{x}-\mathbf{x}_a\|}
$$

and the endpoint cadence recovery target gives

$$
\Gamma_N(\mathbf{x})
\approx
1-\frac{\Phi_N(\mathbf{x})}{c_0^2}
$$

For one approximately isolated mass $M$, this becomes

$$
\Gamma_N(r)
\approx
1+\frac{G M}{r c_0^2}
$$

Thus the familiar weak-field received-frequency estimate is

$$
\nu_{\mathrm{obs}}
\approx
\nu_{X,0}\,
B_X(E)\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}\,
\frac{1-\Phi_N(R)/c_0^2}{1-\Phi_N(E)/c_0^2}
$$

This expression is useful because the factors show which effect is being neglected in a given environment. A laboratory line comparison may set $\mathcal{P}_{E\to R}\approx1$ and $B_X(E)\approx1$; a weak local-galaxy redshift may keep $D_v$ and suppress endpoint gravity; a black-hole-adjacent line must not suppress $\Gamma_{N,E}$ or the possibility that $B_X(E)$ has changed.

### 21 cm Hydrogen Line Example

The neutral-hydrogen 21 cm line is a useful bookkeeping test because the inherited observer description is simple: the ground-state hyperfine branch changes from the triplet state to the singlet state and emits a line photon,

$$
\mathrm{H}^{(F=1)}
\rightarrow
\mathrm{H}^{(F=0)}
+\gamma_{21}
$$

The reference observer frequency is

$$
\nu_{21,0}\approx1.420405751\;\mathrm{GHz}
$$

This subsection does not derive the hyperfine splitting from $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics. That derivation remains downstream of the atomic spin and angular-momentum closure program described in [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md) and [Atomic Spectra](../nuclear-atomic/atomic-spectra.md). The purpose here is to show how an accepted line record is routed through the redshift factorization.

For the 21 cm channel, define the source-branch factor by

$$
B_{21}(E)
\equiv
\frac{\nu_{21,E}^{\mathrm{branch}}}{\nu_{21,0}}
$$

where $\nu_{21,E}^{\mathrm{branch}}$ is the effective transition frequency of the emitting hydrogen branch after local material conditions are included but before endpoint clock-cadence comparison, launch geometry, or path propagation are applied. Then

$$
\nu_{\mathrm{obs},21}
\approx
\nu_{21,0}\,
B_{21}(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}
$$

and

$$
1+z_{21}
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_{21}(E)D_v}
$$

Clean 21 cm emission means $B_{21}(E)=1$. In that case the hydrogen transition remains on its reference branch, and the observed shift is assigned to endpoint Noether sea cadence, relative launch motion, and path-history propagation. Uniform source motion through a homogeneous Noether sea should therefore enter $D_v$ by default, not $B_{21}$.

A nontrivial source branch means $B_{21}(E)\neq1$. This is the correct place to record local changes in the transition gap from strong acceleration, high-velocity internal assembly deformation, strong gravity or tidal stress, plasma and pressure effects, Zeeman or Stark splitting, collisions, or other conditions that alter the emitting hydrogen branch itself. In such a case the frequency has changed before the photon packet begins its path-history through the Noether sea. The source-branch term is therefore not a propagation redshift and not a second copy of the endpoint cadence factor.

### Redshift-Budget Worked Examples

The unified equation should be used as a budget, not as a label. Each case begins with

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_X(E)D_v}
$$

The practical question is which logarithmic terms are small enough to set to $1$ after the environment and tolerance have been stated.

| Case | Controlled assumptions | Surviving estimate | Reading |
| --- | --- | --- | --- |
| Clean laboratory line comparison | $B_X(E)=1$, $D_v\approx1$, $\mathcal{P}_{E\to R}\approx1$, and $\Gamma_{N,E}/\Gamma_{N,R}\approx1$ when the clocks are colocated or corrected | $1+z_X\approx1$ | The line tests source stability and local clock calibration; no cosmological distance is inferred. |
| Ordinary galaxy redshift away from strong local potentials | $B_X(E)=1$ and $\Gamma_{N,E}/\Gamma_{N,R}\approx1$ after local gravitational corrections; keep $D_v$ for peculiar motion and $\mathcal{P}_{E\to R}$ for path accumulation | $1+z_X\approx\mathcal{P}_{E\to R}/D_v$ | Distance can be estimated only after separating peculiar motion from the Noether sea propagation residual. |
| Black-hole-adjacent line | No default suppression of $\Gamma_{N,E}/\Gamma_{N,R}$, $B_X(E)$, or $D_v$; $\mathcal{P}_{E\to R}$ may be near $1$ for a local comparison or nontrivial for a cosmological path | $1+z_X\approx(\Gamma_{N,E}/\Gamma_{N,R})\mathcal{P}_{E\to R}/(B_X(E)D_v)$ | Endpoint cadence and source-branch deformation must be separated before treating the remaining shift as propagation. |

This table also explains why factors disappear in ordinary use. They disappear because the chosen environment makes their logarithmic contribution negligible relative to the measurement target, not because the mechanism ceases to exist in the ontology.

### Limiting Recovery Cases

The factorization must recover familiar redshift regimes by controlled limits. The purpose is not to treat those inherited regimes as final ontology, but to show which Noether sea term carries each observational effect.

For weak-field gravitational redshift, take $B_X(E)=1$, $\mathcal{L}_{E\to R}=1$, and $\mathcal{P}_{E\to R}=1$. If the endpoint Noether sea braid cadence satisfies

$$
\frac{\Omega_N}{\Omega_{N0}}
\approx
1+\frac{\Phi_N}{c_0^2},
\qquad
\Gamma_N
\approx
1-\frac{\Phi_N}{c_0^2}
$$

then

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}-\ln\Gamma_{N,R}
\approx
\frac{\Phi_N(R)-\Phi_N(E)}{c_0^2}
$$

A source deeper in the potential has $\Phi_N(E) < \Phi_N(R)$, so the endpoint ratio produces redshift. This is the local strong-gradient limit of the same cadence map.

For relative-motion redshift in a nearly homogeneous medium, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{P}_{E\to R}=1$, and $B_X(E)=1$. Let $\hat{\mathbf{k}}$ point from emitter to receiver. In the low-speed line-of-sight limit, the launch factor should reduce to

$$
\mathcal{L}_{E\to R}(\hat{\mathbf{k}})
\approx
1+\frac{(\mathbf{v}_E-\mathbf{v}_R)\cdot\hat{\mathbf{k}}}{c_0}
$$

so

$$
1+z_X
\approx
\frac{1}{\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}
$$

Motion that compresses the emitted phase train toward the receiver gives $\mathcal{L}_{E\to R} > 1$ and a blueward shift; motion that stretches the phase train gives $\mathcal{L}_{E\to R} < 1$ and a redward shift.

For clean source spectroscopy, $B_X(E)=1$ means the source transition itself remains on its reference branch. If high acceleration, strong gravity, plasma, magnetic environment, tidal distortion, or other local conditions alter the transition gap, then $B_X(E)\neq1$. That contribution is not propagation redshift. It records a changed emission branch before the packet begins its path-history through the Noether sea.

For gentle deep-space accumulation, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{L}_{E\to R}\approx1$, and $B_X(E)=1$. Then

$$
1+z_X
\approx
\mathcal{P}_{E\to R}
$$

A useful continuous form is

$$
\ln\mathcal{P}_{E\to R}
=
\int_{\gamma_{E\to R}}
\alpha_{\mathrm{prop}}\!\left(
\rho_{\text{NS}},n,\chi_{\text{sea}},\Phi_{\text{eff}},
\hat{\mathbf{k}},X
\right)\,d\ell
$$

where $\alpha_{\mathrm{prop}}$ is a path-local propagation-rate functional along the Euclidean path element $d\ell$. Any nonzero $\alpha_{\mathrm{prop}}$ must preserve image sharpness, spectral coherence, and $(1+z)$ time-dilation consistency; otherwise it degenerates into an excluded tired-light mechanism.

### Candidate Propagation Functional

The first closure target is an endpoint-subtracted propagation functional. Static endpoint cadence belongs in $\Gamma_{N,E}/\Gamma_{N,R}$, so the path functional must vanish in a static homogeneous Noether sea with no flow:

$$
\alpha_{\mathrm{prop},X}=0
\quad
\text{for static homogeneous no-flow reference conditions}
$$

A minimal candidate form is

$$
\alpha_{\mathrm{prop},X}
=
a_\chi^X\,\frac{1}{c_\gamma}\,\partial_t\ln\chi_\gamma
+a_n^X\,\frac{1}{c_\gamma}\,\partial_t\ln n
+a_R^X\,\frac{1}{c_\gamma}\,\partial_t\ln R_{\text{core}}
+a_u^X\,\frac{\nabla\cdot\mathbf{u}_{\text{sea}}}{c_0}
+a_S^X\,\frac{\hat{\mathbf{k}}^i\hat{\mathbf{k}}^j S_{ij}}{c_0}
+\mathcal{R}_{\mathrm{prop},X}
$$

Here all quantities are evaluated at the path point crossed by the photon packet. The photon-channel speed is $c_\gamma$, and $\chi_\gamma(\mathbf{x},t)\equiv c_0/c_\gamma(\mathbf{x},t)$ is used only when the photon channel is the explicit transport subject. The symbols $n(\mathbf{x},t)$ and $R_{\text{core}}(\mathbf{x},t)$ denote normalized Noether braid density and a representative local Noether braid scale. The vector $\mathbf{u}_{\text{sea}}$ is an effective Noether sea flow velocity, and

$$
S_{ij}
=
\frac{1}{2}
\left(
\partial_i u_{\text{sea},j}
+\partial_j u_{\text{sea},i}
\right)
-\frac{1}{3}
\left(\nabla\cdot\mathbf{u}_{\text{sea}}\right)h_{ij}
$$

is the trace-free strain-rate part, with contractions taken using the Euclidean spatial metric $h_{ij}$. The coefficients $a_\chi^X$, $a_n^X$, $a_R^X$, $a_u^X$, and $a_S^X$ are dimensionless closure coefficients for the line family $X$, not independent fitting parameters for each object. The residual $\mathcal{R}_{\mathrm{prop},X}$ contains unresolved higher-order and anisotropic terms and must be bounded by the same image-sharpness, coherence, and time-dilation constraints that exclude ordinary tired-light loss.

This ansatz gives the distance ladder a concrete target: recover the observed low-redshift slope from the leading homogeneous part of $\alpha_{\mathrm{prop},X}$, while requiring local gravitational redshift, motion, and source-branch changes to be removed before fitting path accumulation.

### First-Order Coefficient Constraints

At first order the propagation ansatz constrains combinations of coefficients, not each coefficient separately. Let barred quantities denote the homogeneous isotropic component at observation time $t_{\mathrm{obs}}$, with $\bar S_{ij}=0$. Then the path rate entering the corrected low-redshift slope is

$$
\bar\alpha_X(t_{\mathrm{obs}})
=
a_\chi^X\,\frac{\dot{\bar\chi}_\gamma}{c_\gamma\bar\chi_\gamma}
+a_n^X\,\frac{\dot{\bar n}}{c_\gamma\bar n}
+a_R^X\,\frac{\dot{\bar R}_{\text{core}}}{c_\gamma\bar R_{\text{core}}}
+a_u^X\,\frac{\nabla\cdot\bar{\mathbf{u}}_{\text{sea}}}{c_0}
+\bar{\mathcal R}_{\mathrm{prop},X}
$$

After endpoint cadence, source branch, and relative motion are removed, the nearby homogeneous limit requires

$$
\left.
\bar\alpha_X
\right|_{t_{\mathrm{obs}}}
=
\frac{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(X)}{c_0}
$$

If the corrected low-redshift relation is line-family independent, then two clean line families $X$ and $Y$ must also satisfy the chromaticity bound

$$
\left|
\bar\alpha_X-\bar\alpha_Y
\right|
\le
\epsilon_{\mathrm{chrom}}
$$

where $\epsilon_{\mathrm{chrom}}$ is set by corrected multi-line spectroscopy. This prevents the line-family coefficients from being used as arbitrary object-by-object fitting parameters.

For a finite path, write

$$
\alpha_{\mathrm{prop},X}
=
\bar\alpha_X
+\delta\alpha_{\mathrm{prop},X}
$$

Then

$$
Z_{\mathrm{prop},X}
=
\bar\alpha_X D
+\int_0^D
\delta\alpha_{\mathrm{prop},X}(\ell,\hat{\mathbf{k}})\,d\ell
+O(D^2\partial_\ell\bar\alpha_X)
$$

The simple distance estimate $D\approx Z_{\mathrm{prop},X}/\bar\alpha_X$ is therefore valid only when the path residual is small compared with the homogeneous term:

$$
\left|
\int_0^D
\delta\alpha_{\mathrm{prop},X}(\ell,\hat{\mathbf{k}})\,d\ell
\right|
\ll
\bar\alpha_X D
$$

Image sharpness and spectral coherence constrain the same residual. Across neighboring rays in the image bundle,

$$
\mathrm{Var}_{\mathrm{beam}}\!\left[
\int_\gamma
\delta\alpha_{\mathrm{prop},X}\,d\ell
\right]
\le
\epsilon_{\mathrm{img}}^2
$$

and across a narrow corrected line profile,

$$
\mathrm{Var}_{\mathrm{line}}\!\left[
\int_\gamma
\delta\alpha_{\mathrm{prop},X}\,d\ell
\right]
\le
\sigma_{\ln\nu,X}^2
$$

These bounds mainly discipline the anisotropic strain term, environmental gradients, and $\mathcal{R}_{\mathrm{prop},X}$. A propagation explanation that accumulates redshift by large stochastic phase loss would violate these inequalities and would fall back into the excluded tired-light class.

Finally, the observed $(1+z)$ time-dilation consistency requires the phase-frequency propagation rate and packet-cadence propagation rate to agree after the same corrections are applied:

$$
\left|
\int_\gamma
\left(
\alpha_{\mathrm{prop},X}^{(\nu)}
-\alpha_{\mathrm{prop},X}^{(\Delta t)}
\right)d\ell
\right|
\le
\epsilon_{\mathrm{TD}}
$$

The strongest closure is to derive one $\alpha_{\mathrm{prop},X}$ from the Noether sea transport dynamics so that frequency shift and arrival-cadence stretching are the same path-history effect rather than two separately fitted rules.

### Transport Derivation Target

The coefficient ansatz can be recast as a transport equation for an effective packet-stretch variable rather than introduced only as a fit function. Let

$$
Y_X(\ell)
\equiv
\ln\mathcal{P}_{E\to \ell,X}
$$

denote the accumulated logarithmic propagation stretch from the emitter to path location $\ell$. Along a photon-channel ray, define the path derivative

$$
\frac{d}{d\ell}
\equiv
\hat{\mathbf{k}}^i\partial_i
+\frac{1}{c_\gamma}\partial_t
$$

The minimal transport closure target is

$$
\frac{dY_X}{d\ell}
=
\mathcal{C}_X\!\left(
\partial_t\boldsymbol{\theta}_\gamma,
\nabla\mathbf{u}_{\text{sea}},
\hat{\mathbf{k}}
\right)
$$

with

$$
\boldsymbol{\theta}_\gamma
\equiv
\left(
\ln\chi_\gamma,\,
\ln n,\,
\ln R_{\text{core}}
\right)
$$

Here $Y_X$ is an effective packet bookkeeping variable, not a new substrate object. The substrate content is the Noether sea state and its path-history response; $Y_X$ records how that state changes the packet spacing seen by the receiver after endpoint and source corrections are removed.

Euclidean rotational symmetry allows the first-order scalar expansion

$$
\mathcal{C}_X
=
a_\chi^X\,\frac{1}{c_\gamma}\,\partial_t\ln\chi_\gamma
+a_n^X\,\frac{1}{c_\gamma}\,\partial_t\ln n
+a_R^X\,\frac{1}{c_\gamma}\,\partial_t\ln R_{\text{core}}
+a_u^X\,\frac{\nabla\cdot\mathbf{u}_{\text{sea}}}{c_0}
+a_S^X\,\frac{\hat{\mathbf{k}}^i\hat{\mathbf{k}}^j S_{ij}}{c_0}
+\mathcal{R}_{\mathrm{prop},X}
$$

which reproduces the candidate $\alpha_{\mathrm{prop},X}$ when $dY_X/d\ell=\alpha_{\mathrm{prop},X}$. The coefficients are the linear-response derivatives of the transport map at the static homogeneous no-flow reference state. For example, for $q\in\{\ln\chi_\gamma,\ln n,\ln R_{\text{core}}\}$,

$$
a_q^X
=
\left.
\frac{\partial \mathcal{C}_X}
{\partial\left[(1/c_\gamma)\partial_t q\right]}
\right|_0
$$

The same closure must show that the phase-frequency rate and the arrival-cadence rate share this $Y_X$ variable. If the Noether sea transport dynamics instead require separate variables for frequency shift and packet cadence, then the unified propagation explanation fails the time-dilation recovery and the residual must be moved out of $\mathcal{P}_{E\to R}$.

### Dark-Energy Handoff to Transport

The [Dark Energy](./dark-energy.md) module can feed the transport map only by supplying a Noether sea state history. In the redshift budget, its native entry point is the time derivative of $\boldsymbol{\theta}_\gamma$, plus any associated flow and strain terms. With the dark-energy handoff written as

$$
\partial_t\boldsymbol{\theta}_\gamma
=
\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}
+
\partial_t\boldsymbol{\theta}_{\gamma,\mathrm{local}}
$$

where

$$
\mathbf{q}_{\mathrm{DE}}
\equiv
\begin{pmatrix}
\partial_t\ln\rho_{\mathrm{DE,eff}}\\
\partial_t w_{\mathrm{eff}}\\
\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}\\
\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}
\end{pmatrix}
$$

the induced propagation contribution is

$$
\alpha_{\mathrm{prop},X}^{\mathrm{DE}}
=
\frac{1}{c_\gamma}
\begin{pmatrix}
a_\chi^X & a_n^X & a_R^X
\end{pmatrix}
\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}
$$

This bridge keeps the level distinction explicit. The effective quantities $\rho_{\mathrm{DE,eff}}$ and $w_{\mathrm{eff}}$ remain observer-side summaries of medium relaxation. They affect redshift only insofar as the underlying Noether sea response changes $\chi_\gamma$, $n$, $R_{\text{core}}$, flow, or strain along the path. A fit that assigns $H(z)$ directly while bypassing this handoff is a comparison model, not a completed $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

For the homogeneous first-order branch, define the transport-facing row

$$
\boldsymbol{\lambda}_X^T
\equiv
\begin{pmatrix}
a_\chi^X & a_n^X & a_R^X
\end{pmatrix}
\mathbf{J}_{\mathrm{DE}}
=
\begin{pmatrix}
\lambda_\rho^X & \lambda_w^X & \lambda_{\mathrm{sea}}^X & \lambda_{\mathrm{BH}}^X
\end{pmatrix}
$$

Then

$$
\alpha_{\mathrm{prop},X}^{\mathrm{DE}}
=
\frac{1}{c_\gamma}
\left(
\lambda_\rho^X q_\rho
+\lambda_w^X q_w
+\lambda_{\mathrm{sea}}^X q_{\mathrm{sea}}
+\lambda_{\mathrm{BH}}^X q_{\mathrm{BH}}
\right)
$$

with $q_\rho=\partial_t\ln\rho_{\mathrm{DE,eff}}$, $q_w=\partial_t w_{\mathrm{eff}}$, $q_{\mathrm{sea}}=\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$, and $q_{\mathrm{BH}}=\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}$. If the same homogeneous branch also obeys the effective continuity identity

$$
q_\rho
=
-3H_{\mathrm{eff}}(1+w_{\mathrm{eff}})
+q_{\mathrm{sea}}
+q_{\mathrm{BH}}
$$

and if $H_{\mathrm{eff},X}^{\mathrm{DE}}=c_0\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$, then the redshift-transfer slope implied by this coefficient packet is

$$
H_{\mathrm{eff},X}^{\mathrm{DE}}
=
\frac{
\frac{c_0}{c_\gamma}
\left[
\lambda_w^X\,\partial_t w_{\mathrm{eff}}
+(\lambda_\rho^X+\lambda_{\mathrm{sea}}^X)\frac{\mathcal{S}_{\mathrm{sea}}}{\rho_{\mathrm{DE,eff}}}
+(\lambda_\rho^X+\lambda_{\mathrm{BH}}^X)\frac{\mathcal{S}_{\mathrm{BH}}}{\rho_{\mathrm{DE,eff}}}
\right]
}{
1+3\frac{c_0}{c_\gamma}\lambda_\rho^X(1+w_{\mathrm{eff}})
}
$$

This is the first coefficient-level meaning of an $\mathbb{A}\mathbb{A}\mathbb{A}$ Hubble-like number. It is a solved transfer coefficient for a declared clean branch, not a primitive expansion rate. The denominator must stay finite, and the numerator must be compatible across line families and cadence diagnostics before the result can be promoted from coefficient packet to cosmological closure.

### Distance and Effective Hubble Coefficient

Redshift alone is not distance in this framework. A redshift becomes a distance estimate only after endpoint cadence, source-branch shift, relative motion, and path-history propagation have been separated. Define the propagation residual

$$
Z_{\mathrm{prop},X}
\equiv
\ln(1+z_X)
-\ln\Gamma_{N,E}
+\ln\Gamma_{N,R}
+\ln B_X(E)
+\ln D_v
$$

When the factorization is valid,

$$
Z_{\mathrm{prop},X}
=
\ln\mathcal{P}_{E\to R}
=
\int_0^D
\alpha_{\mathrm{prop}}\!\left(\ell,\hat{\mathbf{k}},X,\theta_{\mathrm{sea}}\right)\,d\ell
$$

where $D$ is Euclidean path length through the Euclidean void and $\theta_{\mathrm{sea}}$ denotes the shared Noether sea state record used by the cosmology modules. If the path-local propagation rate is approximately constant over the relevant nearby region, $\alpha_{\mathrm{prop}}\approx\alpha_0$, then

$$
D
\approx
\frac{Z_{\mathrm{prop},X}}{\alpha_0}
$$

The effective present-epoch Hubble coefficient is therefore a transfer-map slope, not an expansion rate of the Euclidean void:

$$
H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(\hat{\mathbf{k}},X)
\equiv
c_0
\left.
\frac{\partial Z_{\mathrm{prop},X}}{\partial D}
\right|_{D\to0,\hat{\mathbf{k}}}
\approx
c_0\alpha_0
$$

In the homogeneous, isotropic, clean-source, low-redshift limit this reproduces the familiar observer formula

$$
D
\approx
\frac{c_0}{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}}
\ln(1+z)
\approx
\frac{c_0 z}{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}}
$$

The symbol $H_0$ can therefore remain in the comparison language, but its physical meaning changes. It summarizes the present local redshift-per-distance coefficient of Noether sea transport and clock-rate comparison after source and motion corrections. It is not a direct measurement of space stretching. Directional or environmental variation in the inferred $H_0$ is not automatically a calibration failure; it is a diagnostic of whether the local Noether sea state is close enough to the homogeneous limit used by the distance ladder.

Distance observables must also keep the flux factors separate. In the homogeneous comparison limit, luminosity distance is not only a geometric area proxy; it packages photon energy redshift and arrival-rate dilation:
$$
F
=
\frac{L}{4\pi D_A^2(1+z)^2},
\qquad
d_L=(1+z)^2D_A
$$
For a low-redshift effective FRW projection this becomes
$$
d_L(z)
=
\frac{c_0}{H_{0,\mathrm{eff}}}
\left[
z+\frac12(1-q_{0,\mathrm{eff}})z^2+O(z^3)
\right]
$$
In the fixed-void reading, $H_{0,\mathrm{eff}}$ and $q_{0,\mathrm{eff}}$ are coefficients of the corrected transport and clock-comparison map. A branch that fits redshift but fails the two flux factors, time-dilation factor, or angular-distance reciprocity has not recovered the cosmological distance ladder.

### Local Redshift-Transfer Curve

The corrected propagation residual should be modeled as a local transfer curve before it is averaged into any Hubble-like number. Let the receiver event be $R=(\mathbf{x}_R,t_R)$, and let $\hat{\mathbf{k}}$ point from emitter to receiver. Measure Euclidean path distance $s$ backward from the receiver toward the emitter:

$$
\mathbf{x}(s)=\mathbf{x}_R-s\hat{\mathbf{k}},
\qquad
t(s)
=
t_R-\int_0^s\frac{d\ell}{c_\gamma(\mathbf{x}(\ell),t(\ell))}
$$

For a source at corrected Euclidean path length $D$, the propagation residual is

$$
Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
=
\int_0^D
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf{x}(s),
t(s),
\hat{\mathbf{k}},
\theta_{\mathrm{sea}}(s)
\right)\,ds
$$

The local effective Hubble coefficient is only the first derivative of this curve at the receiver:

$$
H_{\mathrm{eff},X}(R,\hat{\mathbf{k}})
\equiv
c_0
\left.
\frac{\partial Z_{\mathrm{prop},X}}{\partial D}
\right|_{D=0}
=
c_0\,\alpha_{R,X}(\hat{\mathbf{k}})
$$

where

$$
\alpha_{R,X}(\hat{\mathbf{k}})
\equiv
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf{x}_R,
t_R,
\hat{\mathbf{k}},
\theta_{\mathrm{sea},R}
\right)
$$

The second derivative records the first local departure from a constant-slope Hubble law:

$$
\mathcal{K}_{X}(R,\hat{\mathbf{k}})
\equiv
\left.
\frac{\partial^2 Z_{\mathrm{prop},X}}{\partial D^2}
\right|_{D=0}
=
-\hat{\mathbf{k}}^i\partial_i\alpha_{\mathrm{prop},X}\big|_R
-\frac{1}{c_{\gamma,R}}\partial_t\alpha_{\mathrm{prop},X}\big|_R
$$

Thus the local curve has the expansion

$$
Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
=
\alpha_{R,X}(\hat{\mathbf{k}})D
+
\frac{1}{2}\mathcal{K}_{X}(R,\hat{\mathbf{k}})D^2
+
O(D^3\nabla^2\theta_{\mathrm{sea}},D^3\partial_t^2\theta_{\mathrm{sea}})
$$

The ordinary constant-$H_0$ approximation is the special case in which $\alpha_{R,X}$ is independent of direction, line family, environment, and observation time, while $\mathcal{K}_{X}$ and higher derivatives remain negligible over the fitted distance range. In the general $\mathbb{A}\mathbb{A}\mathbb{A}$ case, $\alpha_{R,X}$ and $\mathcal{K}_{X}$ are observables of the local Noether sea state, not universal constants.

For environment-resolved modeling, a catalogue should first separate sources by the Noether sea path they sample. For an environment family $\mathcal{E}$, define

$$
\alpha_{\mathcal{E},X}(t,\hat{\mathbf{k}})
\equiv
\left\langle
\alpha_{\mathrm{prop},X}
\right\rangle_{\mathcal{E},t,\hat{\mathbf{k}}},
\qquad
\sigma_{\mathcal{E},X}^2
\equiv
\left\langle
\left(
\alpha_{\mathrm{prop},X}
-
\alpha_{\mathcal{E},X}
\right)^2
\right\rangle_{\mathcal{E},t,\hat{\mathbf{k}}}
$$

The useful first question is whether local voids, filaments, clusters, galaxy halos, and strong-source recycling environments share one $\alpha_{\mathcal{E},X}$ within tolerance after endpoint cadence, launch geometry, and source-branch factors have been removed. If they do not, a single all-sky $H_0$ is a lossy summary of distinct redshift-transfer environments.

### $\Lambda\mathrm{CDM}$ Reference Curve

The standard curved-spacetime model remains useful as a reference curve. For a chosen comparison parameter record $\Theta_{\Lambda\mathrm{CDM}}$, define

$$
Z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
\equiv
\ln\!\left(
1+z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
\right)
$$

The $\mathbb{A}\mathbb{A}\mathbb{A}$ residual against that reference is

$$
\Delta Z_X(D,\hat{\mathbf{k}},\mathcal{E})
=
Z_{\mathrm{prop},X}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\!\left(D,\hat{\mathbf{k}},\theta_{\mathrm{sea}}\right)
-
Z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
$$

This residual should be read as a comparison diagnostic, not as evidence that the Euclidean void literally follows the reference model. A successful reduction would show that $\Delta Z_X$ is produced by one shared Noether sea state record across supernovae, BAO, CMB transfer, and local calibration data. A failed reduction would require replacing $\theta_{\mathrm{sea}}$ or the transfer coefficients separately for each observable family.

### Minimal Redshift-Budget Toy Model

The first numerical model should be a bookkeeping simulator for the factorized redshift record, not a claim of empirical recovery. Divide a Euclidean path of length $D$ into $N$ segments with points $(\mathbf{x}_j,t_j)$, direction $\hat{\mathbf{k}}$, and segment lengths $\Delta s_j$. The input record is

$$
\mathcal{I}_X
=
\left\{
\nu_{X,0},\,
B_X(E),\,
D_v,\,
\Gamma_{N,E},\,
\Gamma_{N,R},\,
\theta_{\mathrm{sea},j},\,
\hat{\mathbf{k}},\,
\Delta s_j
\right\}_{j=0}^{N-1}
$$

where

$$
\theta_{\mathrm{sea},j}
=
\left(
\chi_{\gamma,j},\,
n_j,\,
R_{\text{core},j},\,
\mathbf{u}_{\text{sea},j},\,
f_{N,j},\,
J_{\nu,j},\,
S_{ij}^{(j)},\,
\mathcal{R}_{\mathrm{prop},X}^{(j)}
\right)
$$

The propagation update is

$$
Y_{X,0}=0,
\qquad
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf{x}_j,t_j,\hat{\mathbf{k}},\theta_{\mathrm{sea},j}
\right)\Delta s_j
$$

At the end of the path,

$$
\mathcal{P}_{E\to R,X}
=
\exp(Y_{X,N})
$$

and the reconstructed redshift budget is

$$
Z_X
\equiv
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+Y_{X,N}
-\ln B_X(E)
-\ln D_v
$$

The corresponding observed frequency and receiver-facing photon energy are

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}\,\exp(-Z_X),
\qquad
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs},X}
$$

The toy model should report at least five diagnostics:

- the corrected propagation residual $Y_{X,N}=Z_{\mathrm{prop},X}$;
- the effective nearby slope $H_{\mathrm{eff},X}\approx c_0Y_{X,N}/D$ for short paths;
- the integrated named transport contributions, such as equilibrium relaxation, SMBH loading, and gravitational-wave perturbation terms;
- the line-family chromaticity residual $\left|Y_{X,N}-Y_{Y,N}\right|$ for two clean lines $X$ and $Y$ over the same path;
- the time-dilation residual $\left|Y_{X,N}^{(\nu)}-Y_{X,N}^{(\Delta t)}\right|$ when frequency and packet-cadence updates are computed separately as a failure test.

This simulation is useful precisely because each factor can be turned on or off in a controlled way. A laboratory line should return $Y_{X,N}\approx0$ after local corrections. A clean galaxy path should isolate $Y_{X,N}$ from $D_v$. An equilibrium-transport path should show whether smooth coarse-grained $h$-step relaxation can supply $Y_{X,N}$ while gravitational-wave perturbations average below residual tolerance. A strong-source path should show when $\Gamma_{N,E}$ or $B_X(E)$ dominates enough that a propagation-only distance estimate is invalid.

## Directional Residuals in the Redshift Map

An effective redshift-distance relation cannot be accepted only as an all-sky average. The same data must also be decomposed by direction and environment:

$$
\Delta O_X(z,\hat{\mathbf{n}})
=
O_X^{\mathrm{obs}}(z,\hat{\mathbf{n}})
-
O_X^{\mathrm{iso}}(z)
=
O_{X,0}(z)
+
\mathbf{O}_{X,1}(z)\cdot\hat{\mathbf{n}}
+
O_{X,2}(z,\hat{\mathbf{n}})
+\cdots
$$

where $X$ may denote supernova distance modulus, BAO scale, CMB-frame correction, or another expansion observable. The monopole $O_{X,0}$ records the isotropic fit offset, $\mathbf{O}_{X,1}$ records the dipole, and higher terms record quadrupole and mask-dependent structure.

The Friedmann-like bridge below is usable only after these directional residuals are either within survey tolerance or derived from the same Noether sea variables that determine the clock-rate and transport maps. A residual dipole should not be absorbed silently into $H(z)$, $w(z)$, or calibration constants.

## Photon-Propagation Contribution

Beyond endpoint clock comparison, the same transport picture can include path-dependent phase-cadence evolution during medium transit. This is not untracked photon energy loss; it is the path-history part of how an emitted packet's cadence is later sampled by a receiver.

In this reading, effective redshift accumulation may depend on photon energy, traversed Noether sea state, and path environment, so redshift is modeled as a transport kernel rather than a single universal linear rule.

Line-of-sight medium flow and local contraction/expansion regions can, in principle, contribute signed shifts, so local blueward and redward biases should be treated within one transport kernel rather than as disconnected exceptions.

Propagation channels must preserve image sharpness and $(1+z)$ time-dilation consistency; models requiring generic scattering-loss redshift are excluded.

## Dissipation and Rescaling Picture

Apparent expansion is interpreted as relaxation of Noether sea state:

- high-curvature source regions inject energy into outbound assembly flows,
- lower-density regions evolve toward larger characteristic assembly scales and lower effective temperatures,
- observer-level expansion summaries track this rescaling history.

## Dark-Energy Language in This Frame

The parameter

$$
w=\frac{p}{\rho}
$$

remains useful as an effective descriptor, but its physical content is medium stress and relaxation state, not an independent vacuum-fluid ontology.

## Hubble-Tension Link

Early-inferred and local-inferred expansion rates probe different Noether sea states:

- Early probes sample a more uniform, less-relaxed sea history.
- Local probes sample pockets that are further along relaxation and dissipation trajectories.

So the $H_0$ split is interpreted as state-dependent inference from one ontology, not two incompatible universes.

In this framing, $H_0$ is not expected to be strictly universal at all environments; local scatter is read as part of Noether sea state dependence.

Quasar redshift distributions are interpreted in the same transport-and-source framework, separating source-population evolution from path-history accumulation within one model.

## Timescape-Style Bridge, $\mathbb{A}\mathbb{A}\mathbb{A}$ Mechanism

Conceptually, this layer is adjacent to inhomogeneous/clock-calibration cosmologies, but the implementation here remains one explicit Noether sea state model:

- clock-rate mapping is computed from shared Noether sea state variables,
- expansion-like inference shifts are environment-conditioned readouts, not ontology splits,
- local-ladder versus early-time differences are modeled as distinct sampling of one evolving Noether sea.

## Reproducible Transport Constraints

The fixed-void cosmology branch can currently claim the transport constraints that any successful redshift mechanism must satisfy. Because the Euclidean void does not expand, the redshift explanation must act through endpoint clock cadence, source-branch state, launch geometry, and path-history transport through the Noether sea. A viable transport redshift must therefore preserve the standard observational rows normally packaged by an FRW scale factor: Tolman surface-brightness scaling $B_{\mathrm{obs}}\propto(1+z)^{-4}$ after the declared distance map, supernova light-curve time dilation $\Delta t_{\mathrm{obs}}\approx(1+z)\Delta t_{\mathrm{emit}}$, and CMB temperature scaling $T_{\mathrm{CMB}}(z)\approx T_0(1+z)$ in the appropriate thermal record.

These rows are form-level constraints, not a derived $\Lambda\mathrm{CDM}$ mechanism. A scalar $a_{\mathrm{eff}}(t)$ is admissible only after statistical homogeneity and isotropy of the retained Noether sea record have been established; otherwise the honest output is a local tensorial $g^{\mathrm{eff}}_{\mu\nu}(\mathbf{x},t)$ or anisotropic scale response. The Friedmann-like equations below remain comparison-layer summaries until the same Noether sea response law derives $a_{\mathrm{eff}}(t)$, $G_{\mathrm{eff}}$, the effective equation of state, and the transport coefficients from one retained record.

## Effective Friedmann Bridge (Comparison Layer)

For data-comparison work, one may retain a Friedmann-like summary:

$$
H_{\mathrm{eff}}^2
=
\frac{8\pi G_{\text{eff}}}{3c_0^2}
\left(\rho_m+\rho_r+u_{\text{sea}}\right)
-\frac{k_{\text{eff}}c_0^2}{a_{\mathrm{eff}}^2}
$$

with $a_{\mathrm{eff}}(t)$ interpreted as a Noether sea state parameter and $G_{\text{eff}},k_{\text{eff}}$ as effective summaries of assembly-Noether sea response. If a pressure variable is used in the same projection, it must satisfy the comparison continuity row
$$
\dot\rho_{\mathrm{eff}}
+3H_{\mathrm{eff}}(\rho_{\mathrm{eff}}+P_{\mathrm{eff}})
=0
$$
or declare the residual source term supplied by Noether sea transport.

This equation is a comparison layer for the homogeneous and isotropic limit. It does not by itself justify the assumption that supernovae, BAO, CMB distances, and local-ladder calibrations all share one isotropic background. That shared background must be recovered as a limit of the Noether sea state model or replaced by an explicitly directional effective map.

## Expansion-Module Interface

In the modular cosmology map, this page provides:

- ontic inputs: medium density/stress state, clock-rate map, and transport environment,
- effective outputs: inferred $a(t)$, $H(z)$, and redshift-distance behavior,
- shared bridge variables used by [dark-energy.md](./dark-energy.md), [hubble-s8-tensions.md](./hubble-s8-tensions.md), and [CMB.md](./CMB.md).
