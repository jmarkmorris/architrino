# Expansion Mechanism

This chapter explains how cosmological expansion language is translated into a fixed-void ontology. Its purpose is to replace geometric container expansion with medium evolution, clock-rate comparison, and effective scale-factor bookkeeping while preserving contact with the standard observational vocabulary. It is the main cosmology bridge from [Cosmology Ontology](./cosmology-ontology.md) to [CMB](./CMB.md), [Structure Formation](./structure-formation.md), and [Dark Energy](./dark-energy.md).

The sections below move from the core idea to redshift, photon propagation, dark-energy language, tension interfaces, and the effective Friedmann comparison layer.

Here `expansion` is comparison language. The chapter keeps the standard cosmology word because readers, data products, and equations are organized around it, but the native claim is different: ledgers, photons, clocks, and structures move through a changing Noether sea inside a fixed Euclidean void.

## Core Idea

The [Euclidean void](../foundations/euclidean-void.md) does not expand. What evolves is the Noether sea and the state of assemblies moving through it.

## Effective Scale Factor in a Fixed Void

Define an effective scale history from medium structure:

$$
a_{\mathrm{eff}}(T)\propto
\frac{\langle L_{\text{core}}(T)\rangle}
{\langle L_{\text{core}}(T_{\mathrm{ref}})\rangle}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-676b4e0caa38e42a)

where $L_{\text{core}}$ is a representative assembly-separation scale in the declared averaging domain.

This $a_{\mathrm{eff}}(T)$ is a summary of medium evolution inside fixed $\mathbf X$, not geometric stretching of the container. When projected into a homogeneous observer comparison, the same row may be reported as $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ after the clock map has been declared.

Several candidate projections can be tested in the same ontology:

$$
a_{\mathrm{eff}}(T)\ \leftrightarrow\ \langle R_{\text{braid}}(T)\rangle
\quad\text{or}\quad
a_{\mathrm{eff}}(T)\propto u_{\text{sea}}(T)^{-1/3}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7e06fb377bcf7ea1)

These are effective parameterizations of Noether sea state, not interchangeable identities. Their equivalence has to be derived on the same retained record. In particular, a galaxy-local recycling branch cannot interpret a smaller local $L_{\text{core}}$ literally as a smaller global source separation without first deriving the observer-level distance and ruler map.

Quasi-steady and cyclical comparison families may use an oscillatory effective scale history such as
$$
a_{\mathrm{eff},X}(t_{\mathrm{eff}})
=
e^{t_{\mathrm{eff}}/P}
\left[
1+\alpha\cos\left(\frac{2\pi t_{\mathrm{eff}}}{Q}+\varphi\right)
\right],
\qquad
P\gg Q
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8aa5960f3b4c4fe3)
In this framework that expression is only a projection of Noether sea state recurrence, source recycling, and clock or transport response. It does not describe expansion of the Euclidean void. Such a branch is admissible only if the same Noether sea state record supplies the source term, redshift-transfer map, CMB thermal record, and BBN yield record.

### Exponential Scale History as a Comparison Limit

The de Sitter and steady-state comparison family often uses a spatially flat exponential scale history,
$$
a_{\mathrm{eff}}(t_{\mathrm{eff}})=a_0 e^{H_*t_{\mathrm{eff}}},
\qquad
H_{\mathrm{eff}}=H_*
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dd7b6d658a9d21b0)
In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not evidence that the Euclidean void expands. It is a special homogeneous projection in which the corrected redshift-transfer slope is constant over the comparison interval. In the endpoint-subtracted propagation language below, the nearby homogeneous limit must satisfy
$$
\bar{\alpha}_X=\frac{H_*}{c_0}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d09afaecdf3a8df3)
after endpoint cadence, source-branch change, and relative launch motion have been removed.

The steady-state lesson is a conservation check on this limit. Holding an effective matter density constant while $a_{\mathrm{eff}}$ grows requires a source term
$$
\mathcal{S}_{m,\mathrm{eff}}=3H_*\rho_{m,\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-783b6eebc7bac4e1)
and that source must be routed through the same assembly and Noether sea provenance record that computes the redshift-transfer slope. A constant $H_*$ fit without this ledger is only a kinematic comparison curve.

## Clock-Rate Redshift Interpretation

Cosmological redshift is treated as cumulative propagation through a changing medium plus clock-rate mismatch between emitter and observer environments.

Use the proper-time map from [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md):

$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
F\!\left(
\mathbf{w},
\rho_{\text{NS}}(\mathbf X,T),
n(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T),
\Phi_{\text{eff}},
\text{clock geometry}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-68a987c0ba1c9d31)

A photon that traverses regions with different $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, and $\Phi_{\text{eff}}$ is read by clocks with different local rates after projection into the observer chart. The observed $z$ is then an emergent comparison of those rates along the path-history record.

Operationally:

$$
1+z = \frac{\nu_e}{\nu_o}
= \frac{(d\tau/dt_{\mathrm{eff}})_o}{(d\tau/dt_{\mathrm{eff}})_e}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d61bae0ae4c93ee3)

so redshift is treated as path-integrated medium evolution plus endpoint clock-rate comparison.

The stronger reading is that redshift is one sign of a broader photon-frequency transfer record. A photon packet may arrive redward of the clean emitted line, blueward of it, or unchanged after endpoint, source-branch, launch, and path terms have been separated. Define the signed frequency-transfer budget

$$
Z_X^{E\to R}
\equiv
\ln\frac{\nu_{X,0}}{\nu_{\mathrm{obs},X}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ed0da5d6fb73446d)

so $Z_X>0$ is redward relative to the clean reference line and $Z_X<0$ is blueward. A path segment that transfers energy from an energetic intervening medium into the photon-channel packet contributes a negative increment to the path term, while a segment that transfers photon energy into a lower-energy medium contributes a positive increment. Sunyaev-Zeldovich-type comparisons are the observed calibration family for this point (the Planck/ACT/SPT cluster-SZ measurements): CMB photon frequencies can be shifted by intervening electron populations, so photon frequency is a path-history observable rather than a primitive expansion clock.

For modeling and diagnostics, separate at least three effective channels:

- endpoint clock-rate comparison,
- source/observer relative-motion (Doppler-like) contribution,
- propagation contribution from traversed Noether sea state and gradients.

The inferred distance is a fourth observer-level output, not an input identity. A redshift record can support an inferred distance only after the endpoint clock rows, launch geometry, path-history propagation term, and calibration model have been declared. The fixed-void source-receiver separation, the photon-channel path length through the Noether sea, and the distance returned by a supernova, BAO, or CMB inference pipeline may agree in a weak homogeneous limit, but outside that limit they are different projections of one retained record. This prevents cosmological redshift from being silently promoted into absolute distance.

### Absolute Record Interpretation

The substrate record is not a collection of observer frames. It is the evolving universe state

$$
\mathbb{U}_{\text{now}}=S(T)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3ff5659c9044632e)

where absolute time $T$ indexes definite architrino positions, velocities, assemblies, causal wakes, Noether sea state variables, and path-history ledgers in the fixed Euclidean void. Redshift must therefore be read as an observer-level extraction from that absolute record, not as a primitive change in space or time.

| Layer | Substrate role in redshift |
| --- | --- |
| Euclidean void | The container does not expand or curve; spatial points keep their identity. |
| Absolute time | $T$ does not dilate; it orders the emission, propagation, and reception events. |
| Noether sea | The Noether sea deforms, flows, polarizes, relaxes, and changes cadence. |
| Emitter | A local assembly changes branch and releases a photon-channel packet. |
| Photon packet | The packet carries a definite path-history record through the Noether sea. |
| Receiver | A local assembly samples or captures the packet using its own local cadence. |
| Measured energy | $E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}$ is the receiver-coupling result, not a standalone scalar detached from emission, path, and reception. |

The central distinction is that nothing happens to absolute time itself. What changes are local cycle rates, launch geometry, and path-history phase cadence inside the Noether sea. A strong-field redshift near a compact object is the high-gradient endpoint limit of this record. A deep-space redshift is the gentle-gradient, long-path limit, if the path-history propagation term survives the required image-sharpness, coherence, and time-dilation tests.

### Noether Sea Braid Factorization Target

A sharper closure target rewrites the endpoint clock-rate comparison in terms of the local Noether sea braid cadence itself. Let $\Omega_N(\mathbf X,T)$ denote a representative local Noether sea braid cadence and $T_N(\mathbf X,T)=2\pi/\Omega_N(\mathbf X,T)$ its cycle period. Relative to a weak homogeneous reference core, define

$$
\Gamma_N(\mathbf X,T)
\equiv
\frac{T_N(\mathbf X,T)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf X,T)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0566b52c894e5738)

The factor $\Gamma_N$ is not a new time variable. The convention is $\Gamma_N>1$ for a local cadence that is slower than the weak homogeneous reference. In a validated homogeneous Lorentz-closure branch, $\Gamma_N$ should reduce to the corresponding moving Noether braid deformation factor; outside that limit it remains a Noether sea state diagnostic to be derived from Noether braid geometry and clock extraction. The endpoint extraction target is stated in [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target), where the moving Noether braid limit fixes the coefficient of $-\ln\xi$ and the weak-field endpoint limit fixes one isotropic Noether sea response combination.

For a spectral transition family $X$, the working redshift factorization is

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}
{B_X(E)\,\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b18001d9f09b6898)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6941d4eed521f704)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3c3a153b755ae514)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-89e9386fffe0f461)

where $\Delta E_{\mathrm{med}}$, $\Delta E_{\mathrm{recoil}}$, and $\Delta E_{\mathrm{rem}}$ are positive or negative according to the retained medium, target, and remnant energy changes. A cosmological path term is admissible only when the signed frequency transfer, image sharpness, packet cadence, spectral coherence, and energy ledger are supplied by one Noether sea record.

Because this fixed-void account keeps absolute time, a long path also needs a finite-window energy residual rather than an expansion sink:

$$
\mathcal{R}_{E,\mathrm{path}}^\Omega
=
\frac{
\left|
\Delta E_{\gamma,\Omega}
+\Delta E_{\mathrm{sea},\Omega}
+\Delta E_{\mathrm{src/rem},\Omega}
+\Delta E_{\mathrm{recoil},\Omega}
+\int_{\partial\Omega}\mathcal{F}_E\,dA\,dT
\right|
}{\epsilon_E}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7a896caaab2478d9)

The signs follow the same retained path-history record: $\Delta E_{\gamma,\Omega}$ is the photon-channel change across the comparison window, $\Delta E_{\mathrm{sea},\Omega}$ is the Noether sea update, $\Delta E_{\mathrm{src/rem},\Omega}$ covers declared source or remnant rows, $\Delta E_{\mathrm{recoil},\Omega}$ covers material recoil or target exchange, and the boundary flux term records energy entering or leaving the finite window. A deep-space redshift branch earns standing only when the same Noether sea transport that preserves image sharpness and occupation shape also makes this residual small under the declared tolerance.

### Redshift Energy Ledger

The finite-window residual above is the operational form of a stronger absolute-time target. Because the Euclidean void does not expand, the architecture cannot let cosmological redshift energy disappear into expansion bookkeeping. The substrate time-translation symmetry nominates a scalar universe-state ledger

$$
E_{\mathrm{tot}}(T)
=
E_{\mathrm{arch}}(T)
+E_{\mathrm{wake}}(T)
+E_{\mathrm{sea}}(T),
\qquad
\frac{dE_{\mathrm{tot}}}{dT}=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3deccbdc94c3d7e8)

where $E_{\mathrm{arch}}$ collects architrino kinetic and configuration energy, $E_{\mathrm{wake}}$ collects causal-wake energy in flight, and $E_{\mathrm{sea}}$ collects Noether sea constitutive energy. This is a conservation target rather than a proved theorem until the delayed action or a quasi-Noether replacement supplies the required invariant.

The speed rows must stay separated inside this ledger. The transparent record-bearing bundle propagates as the dressed photon channel at $c_\gamma(\mathbf X,T)$, as used in the path-time integral below. Primitive causal wakes and Noether sea exchange remain constrained by $c_f$ and enter the sink bookkeeping through $E_{\mathrm{wake}}$ and $E_{\mathrm{sea}}$. Observer clock and ruler reconstruction belongs to $c_{\text{eff}}$, while $c_0$ is only the weak homogeneous calibration value. A redshift branch therefore cannot use $c_f$ as the observed photon-channel speed, nor can it let the energy sink induce an unbounded or frequency-dependent $c_\gamma(\omega)$ residual without failing image sharpness and time-of-flight constraints.

The multi-messenger recovery target is especially narrow. The [GW170817/GRB 170817A timing analysis](https://arxiv.org/abs/1710.05834) constrains the observer-level propagation-speed difference to
$$
-3\times10^{-15}
\le
\frac{c_{\mathrm{GW}}-c_\gamma}{c_\gamma}
\le
7\times10^{-16}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c52689ebe78f0047)
This bound constrains the integrated gravitational-wave and photon-channel propagation records for that event; it does not identify either substrate speed with the primitive wake speed $c_f$. Any Noether sea dispersion or clock reconstruction used for cosmological redshift must preserve this near-coincidence on the same path.

The global form also assumes that the total energy on the constant-$T$ leaf is finite or convergently summable. If an unbounded populated Noether sea does not admit that sum, the operational conservation statement is local continuity on bounded regions:

$$
\partial_T\rho_E+\nabla\cdot\mathbf{S}_E=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f3727b0119e27745)

and, for a finite comparison window $\Omega$,

$$
\frac{dE_{\Omega}}{dT}
+\int_{\partial\Omega}\mathbf{S}_E\cdot\hat{\mathbf n}\,dA
=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-962377ac119458c3)

This is the same content as the finite-window residual above. The global ledger is the stronger theorem target; the bounded-region flux balance is the safe falsification form for cosmological transport.

For a transparent photon-channel bundle with $E_{\mathrm{obs}}=E_{\mathrm{emit}}/(1+z)$, the missing photon energy is

$$
\Delta E_{\gamma}
=
E_{\mathrm{emit}}-E_{\mathrm{obs}}
=
E_{\mathrm{emit}}\frac{z}{1+z}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8f58f2bdd2526ce6)

This per-packet identity does not yet license a fixed fraction of present critical density for the integrated deposit. An estimate such as $\rho_{\gamma,0}(a_{\mathrm{dec}}^{-1}-1)$ imports the standard comoving-volume and scale-history map that the fixed-void branch is required to derive. The native calculation must instead integrate retained photon bundles and Noether sea exchange over a bounded constant-$T$ region, with source, remnant, recoil, and boundary terms included. Until that mapping exists, a nominal percent-level deposit is a heuristic comparison, not a measured Noether sea loading.

One conditional negative nevertheless survives. Any branch that recovers the standard CMB temperature, distance, and volume data products must also recover the observer-level comparison

$$
\left(
\frac{\Delta\rho_{\mathrm{sea,path}}}{\rho_{\mathrm{crit}}}
\right)_{\mathrm{cmp}}
\sim
\Omega_{\gamma,0}
\left(
a_{\mathrm{dec}}^{-1}-1
\right)
\sim
\mathcal O(10^{-2}),
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b25476482b165d65)

which is far below the effective dark-energy comparison row $\Omega_{\mathrm{DE}}\approx0.7$. Transparent-path redshift deposition therefore cannot by itself supply the required dark-energy loading on such a recovered branch. The exact native deposit and its destination remain outputs of the bounded constant-$T$ ledger, not imported inputs.

After source-branch, recoil, remnant, and boundary rows have been separated, a pure transparent-path redshift must close

$$
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7fdafb628116feda)

The same term $\Delta E_{\mathrm{sea,path}}$ is then not adjustable per observable. It must be the energy face of the transport operator that preserves occupation shape and image sharpness; its path integral must recover redshift-distance and observed $(1+z)$ time dilation; and its spatial gradient must remain compatible with the lensing and growth budgets. If those rows require separate Noether sea responses, the branch has reproduced the standard tension split rather than closing it.

The long-time balance is an additional stability condition on the same ledger. A redshift branch may not let $\Delta E_{\mathrm{sea,path}}$ accumulate as unbounded secular heating of the Noether sea. Over cosmic history, the deposited path energy must be routed through the declared source/release, black-hole recycling, Noether sea equilibration, or boundary-flux rows already used by the cosmology module. If the transparent-path sink closes locally but drives $E_{\mathrm{sea}}$ without a compensating recycling or relaxation balance, the branch has conserved energy only by moving the divergence into the medium sector.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-18c3a3e2c90538de)

Equivalently,

$$
1+z_X
=
\frac{\nu_{X,0}}{\nu_{\mathrm{obs}}}
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_X(E)D_v}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#redshift-factorization)

Here $D_v$ is the launch or relative-motion frequency factor. In the homogeneous absolute-record replay, let

$$
v_{E,k}\equiv\mathbf v_E\cdot\hat{\mathbf k},
\qquad
v_{R,k}\equiv\mathbf v_R\cdot\hat{\mathbf k}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5c7bfbbd4d006645)

where $\hat{\mathbf{k}}$ points from emitter to receiver. Adjacent phase markers emitted with absolute-time separation $\Delta T_E$ arrive with

$$
D_v
=
\frac{c_0-v_{R,k}}{c_0-v_{E,k}}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cd75327381f544c7)

For a fixed emitter and a receiver receding along $\hat{\mathbf k}$, this gives $D_v=1-v_{R,k}/c_0$. For a fixed receiver and an emitter receding opposite $\hat{\mathbf k}$ with speed $v_r>0$, it gives $D_v=1/(1+v_r/c_0)$. The special-relativistic square-root comparison factor is not inserted here: any moving-clock correction belongs in the independently derived endpoint cadence factor $\Gamma_N$. Multiplying both would count that correction twice.

#### Homogeneous Lorentz-Recovery Product Target

Neither $D_v$ nor the endpoint cadence ratio is separately the special-relativistic frequency factor. In the homogeneous collinear limit, their frequency-side product must satisfy

$$
\mathcal D_{\mathrm{SR}}^{(\nu)}
\equiv
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}D_v
\longrightarrow
\sqrt{
\frac{1-\beta_{\mathrm{rel}}}
{1+\beta_{\mathrm{rel}}}
},
\qquad
\beta_{\mathrm{rel}}
=
\frac{\beta_R-\beta_E}
{1-\beta_R\beta_E},
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-72ad9e71984ddfdb)

where $\beta_A=v_{A,k}/c_0$. If the endpoint extraction gives $\Gamma_{N,A}\to(1-\beta_A^2)^{-1/2}$, then

$$
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}
\frac{1-\beta_R}{1-\beta_E}
=
\sqrt{
\frac{(1-\beta_R)(1+\beta_E)}
{(1+\beta_R)(1-\beta_E)}
}
=
\sqrt{
\frac{1-\beta_{\mathrm{rel}}}
{1+\beta_{\mathrm{rel}}}
}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-35a997a26b60e260)

The reciprocal $(\Gamma_{N,E}/\Gamma_{N,R})/D_v$ is the corresponding redshift factor. This cancellation is the recovery target: the separate preferred-frame endpoint velocities may occur in the absolute record, but the homogeneous observer comparison must depend only on relative velocity. Any residual dependence is bounded preferred-frame leakage, not Lorentz closure.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-68b646023bd40fa8)

This is not an additional energy-loss term. The local emission ledger is carried by $\nu_{X,0}B_X(E)$, while the receiver reads that packet through endpoint cadence, launch geometry, and path-history propagation.

The hard closure question is therefore not which observer frame carries the true photon energy. It is whether one absolute Noether sea transport law can compute $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ from $S(T)$ without switching explanations between gravitational, relative-motion, and deep-space redshift cases.

The factor $D_v$ is not an independent ontology. It is the low-speed endpoint of the source/receiver launch-geometry term $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$.

### Absolute-Record Transport Map

The first proof scaffold is to define one extraction map from the absolute record. For a line family $X$, emission event $E=(\mathbf X_E,T_E)$, reception event $R=(\mathbf X_R,T_R)$, and declared photon-channel path $\gamma_{E\to R}$, let

$$
\mathcal{S}_{X,E\to R}
\equiv
S(T)\big|_{\{E,R,X,\gamma_{E\to R},\theta_{\mathrm{sea}},\mathcal{H}_{\mathrm{wake}}\}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-02a58b814d7e69f5)

denote the restricted record containing the source assembly branch, receiver assembly branch, path-history wake ledger, Noether sea state variables, and photon-channel path data needed for the comparison. This is not an observer frame; it is the part of $\mathbb{U}_{\text{now}}\equiv S(T)$ consumed by the redshift calculation.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-06df774951fcffc9)

with

$$
Y_{X,E\to R}
\equiv
\ln\mathcal{P}_{E\to R,X}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-db1cc56dea450750)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2aad24cdc9d5fb16)

Each term has a separate extraction rule.

Endpoint cadence is read from the local Noether sea braid cadence:

$$
\Gamma_{N,A}
=
\frac{\Omega_{N0}}
{\Omega_N(\mathbf X_A,T_A;\Pi_N S(T_A))},
\qquad
A\in\{E,R\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a6ffde7e733faa95)

where $\Pi_N S(T_A)$ is the local Noether sea braid record near endpoint $A$. Source-branch shift is read before propagation:

$$
B_X(E)
=
\frac{\nu_{X,\mathrm{emit}}(E;\Pi_E S(T_E))}
{\nu_{X,0}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-54cc0a4c27b624ee)

where $\Pi_E S(T_E)$ is the local source-assembly and environment record that determines whether the transition remains on the clean reference branch.

The same separation applies when the source observable is a luminosity standard rather than a single spectral line. For Type Ia supernovae, light-curve shape, color, dust, metallicity, host mass, and progenitor-age effects belong in the source and calibration analogue of $B_X(E)$ before any remaining redshift-distance curvature is assigned to path-history propagation. A correction that moves an effective fit from acceleration toward deceleration changes the calibrated source row first; it is not, by itself, evidence that the Euclidean void expands, stops expanding, or contracts. The propagation coefficient must be recomputed only after the source row, endpoint cadence, launch geometry, and catalogue selection terms have been declared.

Launch geometry is the homogeneous-reference replay of the same transmitter and receiver worldlines:

$$
D_v
\equiv
\left.
\frac{dN_\phi/dT_R}{dN_\phi/dT_E}
\right|_{\theta_{\mathrm{sea}}=\theta_0,\;\Gamma_N=1,\;B_X=1}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1a7b60c66570a746)

where $N_\phi$ counts adjacent emitted phase markers received in the reference Noether sea state $\theta_0$. This definition isolates source/receiver motion and emission direction from endpoint cadence and path-history propagation. In the homogeneous radial replay it reduces exactly to

$$
D_v
=
\frac{c_0-\mathbf v_R\cdot\hat{\mathbf k}}
{c_0-\mathbf v_E\cdot\hat{\mathbf k}}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-279edf3a03d3510a)

Path-history propagation is then the remaining Noether sea transport integral:

$$
Y_{X,E\to R}
=
\int_{\gamma_{E\to R}}
\mathcal{C}_X
\!\left(
\Pi_\gamma S(T(\ell)),
\hat{\mathbf{k}}(\ell)
\right)d\ell
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2529621bef351e2b)

with

$$
\Pi_\gamma S(T(\ell))
=
\left(
\boldsymbol{\theta}_\gamma,\,
\mathbf{u}_{\text{sea}},\,
S_{ij},\,
\mathcal{H}_{\mathrm{wake}}
\right)_{\gamma(\ell),T(\ell)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7d6298f0f137d36e)

This makes the proof obligation explicit. A gravitational endpoint redshift is the special case $B_X=1$, $D_v=1$, and $Y_X\approx0$, with $\Gamma_N$ supplying the weak-field benchmark. A homogeneous relative-motion redshift is the special case $\Gamma_{N,E}=\Gamma_{N,R}=1$, $B_X=1$, and $Y_X=0$, with $D_v$ supplying the shift. A deep-space propagation redshift is the special case where endpoint and launch terms are controlled while $Y_X$ accumulates from the path-history Noether sea record.

The one-map closure condition is therefore

$$
\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]
\quad\text{uses one }S(T)\text{ restriction and one coefficient record.}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fe3ba4527c00d558)

If the endpoint, launch, and propagation terms can be made to fit only by changing $\Pi_N S$, $\Pi_E S$, $\Pi_\gamma S$, or the coefficient row independently for each observational family, then the factorization is a useful diagnostic but not yet an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

The same response record also touches the Lorentz sector. The $\chi_{\text{sea}}(\mathbf X,T)$ row that appears in cosmological clock and transport comparisons is not allowed to take sector-specific values when the theory turns to clock/ruler retuning, photon-channel timing, or preferred-frame leakage. A candidate cosmology closure must therefore remain compatible with the Lorentz common-mode response: one Noether sea record should support redshift, CMB transfer, lensing, growth, clock export, and preferred-frame hiding rather than fitting each sector with a private medium law.

### Coherent Photon-Channel Bundle Transport

The transparent-path part of the redshift map cannot be an ordinary thermalizing loss process. Thermalization can prepare a radiation bath before the free-streaming record is fixed, and source/release regions can exchange energy with photon-channel packets. But once a photon bundle is being used as a transparent cosmological record, the admissible transport is a coherent rescaling map.

Let $\lambda_{E\to R,X}\equiv \mathcal{P}_{E\to R,X}=e^{Y_{X,E\to R}}$ be the path-history scaling factor after endpoint cadence, source-branch shift, and launch geometry have been separated. For a transported photon-channel bundle $\mathcal{B}$, write $\mathfrak{n}_\gamma(\nu,\hat{\mathbf{k}};\mathcal{B})$ for its dimensionless occupation-shape function; this is not the normalized Noether braid density $n(\mathbf X,T)$. The transparent transport target is

$$
\nu_R=\frac{\nu_E}{\lambda_{E\to R,X}},
\qquad
T_R=\frac{T_E}{\lambda_{E\to R,X}},
\qquad
\mathfrak{n}_{\gamma,R}(\nu_R,\hat{\mathbf{k}}_R;\mathcal{B}_R)
=
\mathfrak{n}_{\gamma,E}(\lambda_{E\to R,X}\nu_R,\hat{\mathbf{k}}_E;\mathcal{B}_E)
+O(\epsilon_{\mathrm{spec}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f2d718dc5b2e9855)

with the bundle map also satisfying

$$
\|\Delta\mathbf{k}_{\perp}\|\le \epsilon_{\mathrm{img}},
\qquad
|\Delta\phi_{\perp}|\le \epsilon_{\mathrm{coh}},
\qquad
\sup_{\omega_a,\omega_b}
\left|
\frac{v_{g,\gamma}(\omega_a)-v_{g,\gamma}(\omega_b)}{c_0}
\right|
\le\epsilon_{\mathrm{tof}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d498da3cb1b20d0e)

after declared lensing, aperture, and detector terms have been removed. Equivalently, let $\mathcal{D}_{\lambda}$ denote global frequency dilation on the admitted photon-channel band and let $\mathcal{G}_{\mathrm{tr}}$ denote the transparent-transport generator. The coherent branch must satisfy

$$
[\mathcal{G}_{\mathrm{tr}},\mathcal{D}_{\lambda}]_{\mathrm{band}}
=O(\epsilon_{\mathrm{spec}}),
\qquad
\Delta\mathbf{k}_{\perp}=O(\epsilon_{\mathrm{img}}),
\qquad
\partial_\omega v_{g,\gamma}=O(\epsilon_{\mathrm{tof}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9f87186e4396bc92)

for the declared path-depth and Noether sea state. In words: the path term may shift every mode by the same fractional factor, but it may not hide stochastic photon creation, absorption/re-emission, chromatic diffusion, frequency-dependent group velocity, or undeclared transverse momentum transfer inside the redshift coefficient. If it does, it has reproduced the tired-light failure mode under a more sophisticated name or failed the long-baseline photon time-of-flight row.

### Equilibrium-Transport Candidate for Path History

The current candidate for the gentle deep-space term is a Noether braid equilibrium transport law. In this reading, a weak-field path does not accumulate redshift because the photon loses energy as it scatters. It accumulates a phase-cadence path-history term because the photon packet traverses a Noether sea population whose braid-cadence distribution evolves in absolute time.

Let $f_N(\nu,\mathbf X,T)$ be the local distribution of Noether braid cadence states, with representative braid energy $E_N=h\nu_N$. At the discrete level, each accepted $h$-scale transaction retunes a braid's cadence-scale closure rather than sliding a continuous single-braid frequency. The continuum current should therefore be read as the ensemble flux

$$
J_\nu
\sim
f_N
\left\langle
\dot{\nu}_N
\right\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-84c5f04140bad2d2)

with the average taken over accepted branch changes inside the coarse-graining cell. A provisional transport packet is

$$
\partial_T f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aa6a11ab7a328480)

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
\mathbf X,T,\hat{\mathbf{k}}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-47a0255ea8683f65)

This is a closure target. If $J_\nu$ vanishes after coarse-graining, or if the source and equilibration terms cancel without a signed large-scale drift, the equilibrium law supplies no expansion-like effect. If the projection is nonzero, it must still pass the same image-sharpness, chromaticity, and packet time-dilation checks as the rest of $\mathcal{P}_{E\to R}$. That condition keeps the hypothesis out of the excluded tired-light class.

In a weak field sourced by masses $M_a$, the Newtonian benchmark potential is

$$
\Phi_N(\mathbf X)
\approx
-\sum_a \frac{G M_a}{\|\mathbf X-\mathbf X_a\|}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7860972b6a49af38)

and the endpoint cadence recovery target gives

$$
\Gamma_N(\mathbf X)
\approx
1-\frac{\Phi_N(\mathbf X)}{c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-701ab4d8e0427e42)

For one approximately isolated mass $M$, this becomes

$$
\Gamma_N(r)
\approx
1+\frac{G M}{r c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-db4a666729883f2c)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fc52093f433d6b3d)

This expression is useful because the factors show which effect is being neglected in a given environment. A laboratory line comparison may set $\mathcal{P}_{E\to R}\approx1$ and $B_X(E)\approx1$; a weak local-galaxy redshift may keep $D_v$ and suppress endpoint gravity; a black-hole-adjacent line must not suppress $\Gamma_{N,E}$ or the possibility that $B_X(E)$ has changed.

### 21 cm Hydrogen Line Example

The neutral-hydrogen 21 cm line is a useful bookkeeping test because the inherited observer description is simple: the ground-state hyperfine branch changes from the triplet state to the singlet state and emits a line photon,

$$
\mathrm{H}^{(F=1)}
\rightarrow
\mathrm{H}^{(F=0)}
+\gamma_{21}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c00e7ca5268b3fc5)

The reference observer frequency is

$$
\nu_{21,0}\approx1.420405751\;\mathrm{GHz}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0d3dfd7e1cf25d88)

This subsection does not derive the hyperfine splitting from $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics. That derivation remains downstream of the atomic spin and angular-momentum closure program described in [Atomic Transition Radiation](../reactions/atomic-transition-radiation.md) and [Atomic Spectra](../nuclear-atomic/atomic-spectra.md). The purpose here is to show how an accepted line record is routed through the redshift factorization.

For the 21 cm channel, define the source-branch factor by

$$
B_{21}(E)
\equiv
\frac{\nu_{21,E}^{\mathrm{branch}}}{\nu_{21,0}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8195b25f51760a83)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aec35a83f5653b2a)

and

$$
1+z_{21}
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_{21}(E)D_v}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2876ca9d0248a80e)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-283e71b7cc80b83a)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-35559cac19a5eefc)

then

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}-\ln\Gamma_{N,R}
\approx
\frac{\Phi_N(R)-\Phi_N(E)}{c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e61d28994bb2adae)

A source deeper in the potential has $\Phi_N(E) < \Phi_N(R)$, so the endpoint ratio produces redshift. This is the local strong-gradient limit of the same cadence map.

For relative-motion redshift in a nearly homogeneous medium, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{P}_{E\to R}=1$, and $B_X(E)=1$. Let $\hat{\mathbf{k}}$ point from emitter to receiver. In the low-speed line-of-sight limit, the launch factor should reduce to

$$
\mathcal{L}_{E\to R}(\hat{\mathbf{k}})
\approx
1+\frac{(\mathbf{v}_E-\mathbf{v}_R)\cdot\hat{\mathbf{k}}}{c_0}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-01ffafba20882119)

so

$$
1+z_X
\approx
\frac{1}{\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-724ebf40c6335ef8)

Motion that compresses the emitted phase train toward the receiver gives $\mathcal{L}_{E\to R} > 1$ and a blueward shift; motion that stretches the phase train gives $\mathcal{L}_{E\to R} < 1$ and a redward shift.

For clean source spectroscopy, $B_X(E)=1$ means the source transition itself remains on its reference branch. If high acceleration, strong gravity, plasma, magnetic environment, tidal distortion, or other local conditions alter the transition gap, then $B_X(E)\neq1$. That contribution is not propagation redshift. It records a changed emission branch before the packet begins its path-history through the Noether sea.

For gentle deep-space accumulation, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{L}_{E\to R}\approx1$, and $B_X(E)=1$. Then

$$
1+z_X
\approx
\mathcal{P}_{E\to R}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aad616683cedd2f1)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f519bd18f3b0060e)

where $\alpha_{\mathrm{prop}}$ is a path-local propagation-rate functional along the Euclidean path element $d\ell$. Any nonzero $\alpha_{\mathrm{prop}}$ must preserve image sharpness, spectral coherence, and $(1+z)$ time-dilation consistency; otherwise it degenerates into an excluded tired-light mechanism.

### Candidate Propagation Functional

The first closure target is an endpoint-subtracted propagation functional. Static endpoint cadence belongs in $\Gamma_{N,E}/\Gamma_{N,R}$, so the path functional must vanish in a static homogeneous Noether sea with no flow:

$$
\alpha_{\mathrm{prop},X}=0
\quad
\text{for static homogeneous no-flow reference conditions}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-eef536463ae112f9)

A minimal candidate form is

$$
\alpha_{\mathrm{prop},X}
=
a_\chi^X\,\frac{1}{c_\gamma}\,\partial_T\ln\chi_\gamma
+a_n^X\,\frac{1}{c_\gamma}\,\partial_T\ln n
+a_R^X\,\frac{1}{c_\gamma}\,\partial_T\ln R_{\text{braid}}
+a_u^X\,\frac{\nabla\cdot\mathbf{u}_{\text{sea}}}{c_0}
+a_S^X\,\frac{\hat{\mathbf{k}}^i\hat{\mathbf{k}}^j S_{ij}}{c_0}
+\mathcal{R}_{\mathrm{prop},X}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ae82849cec398a51)

Here all quantities are evaluated at the path point crossed by the photon packet. The photon-channel speed is $c_\gamma$, and $\chi_\gamma(\mathbf X,T)\equiv c_0/c_\gamma(\mathbf X,T)$ is used only when the photon channel is the explicit transport subject. The symbols $n(\mathbf X,T)$ and $R_{\text{braid}}(\mathbf X,T)$ denote normalized Noether braid density and a representative local Noether braid scale. The vector $\mathbf{u}_{\text{sea}}$ is an effective Noether sea flow velocity, and

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d3cdf99f5014e951)

is the trace-free strain-rate part, with contractions taken using the Euclidean spatial metric $h_{ij}$. The coefficients $a_\chi^X$, $a_n^X$, $a_R^X$, $a_u^X$, and $a_S^X$ are dimensionless closure coefficients for the line family $X$, not independent fitting parameters for each object. The residual $\mathcal{R}_{\mathrm{prop},X}$ contains unresolved higher-order and anisotropic terms and must be bounded by the same image-sharpness, coherence, and time-dilation constraints that exclude ordinary tired-light loss.

This ansatz gives the distance ladder a concrete target: recover the observed low-redshift slope from the leading homogeneous part of $\alpha_{\mathrm{prop},X}$, while requiring local gravitational redshift, motion, and source-branch changes to be removed before fitting path accumulation.

The same path coefficient must also close an energy-transfer ledger. If the source and receiver use the same photon packet after endpoint and source-branch factors have been separated, the path contribution gives
$$
\frac{d\ln\nu_\gamma}{d\ell}
=
-\alpha_{\mathrm{prop},X},
\qquad
\frac{dE_\gamma}{d\ell}
=
-E_\gamma\alpha_{\mathrm{prop},X},
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-da56b058855e655b)
with $E_\gamma=h\nu_\gamma$ on the retained photon-channel ledger. Conservation then requires a compensating path row
$$
\mathcal R_{E,\mathrm{prop}}
=
\frac{
\left|
\frac{dE_\gamma}{d\ell}
+
\frac{dE_{\mathrm{sea,path}}}{d\ell}
+
\frac{dE_{\mathrm{recoil/path}}}{d\ell}
+
\frac{dE_{\mathrm{rem/path}}}{d\ell}
\right|
}{
|dE_\gamma/d\ell|+\varepsilon_E
}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-70e189905e6faf6c)
that vanishes in a valid propagation-redshift segment. The term $E_{\mathrm{sea,path}}$ is the Noether sea uptake or release associated with the same local transport record; $E_{\mathrm{recoil/path}}$ and $E_{\mathrm{rem/path}}$ are retained only when the path segment crosses material, strong-gradient, or nontransparent regions. In transparent cosmological use those latter rows should be negligible, and the surviving energy transfer must still preserve image sharpness and $(1+z)$ time dilation. This keeps propagation redshift from becoming untracked photon energy loss under another name.

### First-Order Coefficient Constraints

At first order the propagation ansatz constrains combinations of coefficients, not each coefficient separately; these constraints are conditional on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics — an open closure item of the [Noether sea program](../spacetime/noether-sea.md). Let barred quantities denote the homogeneous isotropic component at observation time $t_{\mathrm{obs}}$, with $\bar S_{ij}=0$. Then the path rate entering the corrected low-redshift slope is

$$
\bar\alpha_X(t_{\mathrm{obs}})
=
a_\chi^X\,\frac{\dot{\bar\chi}_\gamma}{c_\gamma\bar\chi_\gamma}
+a_n^X\,\frac{\dot{\bar n}}{c_\gamma\bar n}
+a_R^X\,\frac{\dot{\bar R}_{\text{braid}}}{c_\gamma\bar R_{\text{braid}}}
+a_u^X\,\frac{\nabla\cdot\bar{\mathbf{u}}_{\text{sea}}}{c_0}
+\bar{\mathcal R}_{\mathrm{prop},X}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-76f810ec0832bd2b)

After endpoint cadence, source branch, and relative motion are removed, the nearby homogeneous limit requires

$$
\left.
\bar\alpha_X
\right|_{t_{\mathrm{obs}}}
=
\frac{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(X)}{c_0}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f0003741b7e5c646)

If the corrected low-redshift relation is line-family independent, then two clean line families $X$ and $Y$ must also satisfy the chromaticity bound

$$
\left|
\bar\alpha_X-\bar\alpha_Y
\right|
\le
\epsilon_{\mathrm{chrom}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-026f65d5131dd87e)

where $\epsilon_{\mathrm{chrom}}$ is set by corrected multi-line spectroscopy. This prevents the line-family coefficients from being used as arbitrary object-by-object fitting parameters.

For a finite path, write

$$
\alpha_{\mathrm{prop},X}
=
\bar\alpha_X
+\delta\alpha_{\mathrm{prop},X}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-eb98f621d4a520b4)

Then

$$
Z_{\mathrm{prop},X}
=
\bar\alpha_X D
+\int_0^D
\delta\alpha_{\mathrm{prop},X}(\ell,\hat{\mathbf{k}})\,d\ell
+O(D^2\partial_\ell\bar\alpha_X)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-27453c0d75a53ddd)

The simple distance estimate $D\approx Z_{\mathrm{prop},X}/\bar\alpha_X$ is therefore valid only when the path residual is small compared with the homogeneous term:

$$
\left|
\int_0^D
\delta\alpha_{\mathrm{prop},X}(\ell,\hat{\mathbf{k}})\,d\ell
\right|
\ll
\bar\alpha_X D
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e01a73013eb82c67)

Image sharpness and spectral coherence constrain the same residual. Across neighboring rays in the image bundle,

$$
\mathrm{Var}_{\mathrm{beam}}\!\left[
\int_\gamma
\delta\alpha_{\mathrm{prop},X}\,d\ell
\right]
\le
\epsilon_{\mathrm{img}}^2
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fb7d9567c9fdabe9)

and across a narrow corrected line profile,

$$
\mathrm{Var}_{\mathrm{line}}\!\left[
\int_\gamma
\delta\alpha_{\mathrm{prop},X}\,d\ell
\right]
\le
\sigma_{\ln\nu,X}^2
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f4cd2e4125067755)

These bounds mainly discipline the anisotropic strain term, environmental gradients, and $\mathcal{R}_{\mathrm{prop},X}$. A propagation explanation that accumulates redshift by large stochastic phase loss would violate these inequalities and would fall back into the excluded tired-light class.

### Cadence-Frequency Unification Target

The observed $(1+z)$ time-dilation consistency requires the phase-frequency propagation rate and packet-cadence propagation rate to agree after the same corrections are applied:

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c1d7accaf49fa78c)

The strongest closure is to derive one $\alpha_{\mathrm{prop},X}$ from the Noether sea transport dynamics so that frequency shift and arrival-cadence stretching are the same path-history effect rather than two separately fitted rules.

### Transport Derivation Target

The coefficient ansatz can be recast as a transport equation for an effective packet-stretch variable rather than introduced only as a fit function. Let

$$
Y_X(\ell)
\equiv
\ln\mathcal{P}_{E\to \ell,X}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c9eeb76baa6e9010)

denote the accumulated logarithmic propagation stretch from the emitter to path location $\ell$. Along a photon-channel ray, define the path derivative

$$
\frac{d}{d\ell}
\equiv
\hat{\mathbf{k}}^i\partial_i
+\frac{1}{c_\gamma}\partial_T
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e405889ed2dba972)

The minimal transport closure target is

$$
\frac{dY_X}{d\ell}
=
\mathcal{C}_X\!\left(
\partial_T\boldsymbol{\theta}_\gamma,
\nabla\mathbf{u}_{\text{sea}},
\hat{\mathbf{k}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e6411d0de1dfa8a6)

with

$$
\boldsymbol{\theta}_\gamma
\equiv
\left(
\ln\chi_\gamma,\,
\ln n,\,
\ln R_{\text{braid}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-be353df14be4dfa3)

Here $Y_X$ is an effective packet bookkeeping variable, not a new substrate object. The substrate content is the Noether sea state and its path-history response; $Y_X$ records how that state changes the packet spacing seen by the receiver after endpoint and source corrections are removed.

Euclidean rotational symmetry allows the first-order scalar expansion

$$
\mathcal{C}_X
=
a_\chi^X\,\frac{1}{c_\gamma}\,\partial_T\ln\chi_\gamma
+a_n^X\,\frac{1}{c_\gamma}\,\partial_T\ln n
+a_R^X\,\frac{1}{c_\gamma}\,\partial_T\ln R_{\text{braid}}
+a_u^X\,\frac{\nabla\cdot\mathbf{u}_{\text{sea}}}{c_0}
+a_S^X\,\frac{\hat{\mathbf{k}}^i\hat{\mathbf{k}}^j S_{ij}}{c_0}
+\mathcal{R}_{\mathrm{prop},X}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f65abb67a9fee510)

which reproduces the candidate $\alpha_{\mathrm{prop},X}$ when $dY_X/d\ell=\alpha_{\mathrm{prop},X}$. The coefficients are the linear-response derivatives of the transport map at the static homogeneous no-flow reference state, conditional on that reference state — the homogeneous quiescent Noether sea — being an equilibrium of the constitutive dynamics, an open closure item of the [Noether sea program](../spacetime/noether-sea.md). For example, for $q\in\{\ln\chi_\gamma,\ln n,\ln R_{\text{braid}}\}$,

$$
a_q^X
=
\left.
\frac{\partial \mathcal{C}_X}
{\partial\left[(1/c_\gamma)\partial_T q\right]}
\right|_0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-095e62aac740d0eb)

The same closure must show that the phase-frequency rate and the arrival-cadence rate share this $Y_X$ variable. If the Noether sea transport dynamics instead require separate variables for frequency shift and packet cadence, then the unified propagation explanation fails the time-dilation recovery and the residual must be moved out of $\mathcal{P}_{E\to R}$.

### Dark-Energy Handoff to Transport

The [Dark Energy](./dark-energy.md) module can feed the transport map only by supplying a Noether sea state history. In the redshift budget, its native entry point is the absolute-time derivative of $\boldsymbol{\theta}_\gamma$, plus any associated flow and strain terms. With the dark-energy handoff written as

$$
\partial_T\boldsymbol{\theta}_\gamma
=
\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}
+
\partial_T\boldsymbol{\theta}_{\gamma,\mathrm{local}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dda21007aa998646)

where

$$
\mathbf{q}_{\mathrm{DE}}
\equiv
\begin{pmatrix}
\partial_{t_{\mathrm{eff}}}\ln\rho_{\mathrm{DE,eff}}\\
\partial_{t_{\mathrm{eff}}} w_{\mathrm{eff}}\\
\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}\\
\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}
\end{pmatrix}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b67b2c0567d02706)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3314634d41b01b91)

This bridge keeps the level distinction explicit. The effective quantities $\rho_{\mathrm{DE,eff}}$ and $w_{\mathrm{eff}}$ remain observer-side summaries of medium relaxation. They affect redshift only insofar as the underlying Noether sea response changes $\chi_\gamma$, $n$, $R_{\text{braid}}$, flow, or strain along the path. A fit that assigns $H(z)$ directly while bypassing this handoff is a comparison model, not a completed $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ee173397d2bd60a2)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0e30df7d0a9fb581)

with $q_\rho=\partial_{t_{\mathrm{eff}}}\ln\rho_{\mathrm{DE,eff}}$, $q_w=\partial_{t_{\mathrm{eff}}} w_{\mathrm{eff}}$, $q_{\mathrm{sea}}=\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$, and $q_{\mathrm{BH}}=\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}$. If the same homogeneous branch also obeys the effective continuity identity

$$
q_\rho
=
-3H_{\mathrm{eff}}(1+w_{\mathrm{eff}})
+q_{\mathrm{sea}}
+q_{\mathrm{BH}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e633f89a403e392f)

and if $H_{\mathrm{eff},X}^{\mathrm{DE}}=c_0\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$, then the redshift-transfer slope implied by this coefficient packet is

$$
H_{\mathrm{eff},X}^{\mathrm{DE}}
=
\frac{
\frac{c_0}{c_\gamma}
\left[
\lambda_w^X\,\partial_{t_{\mathrm{eff}}} w_{\mathrm{eff}}
+(\lambda_\rho^X+\lambda_{\mathrm{sea}}^X)\frac{\mathcal{S}_{\mathrm{sea}}}{\rho_{\mathrm{DE,eff}}}
+(\lambda_\rho^X+\lambda_{\mathrm{BH}}^X)\frac{\mathcal{S}_{\mathrm{BH}}}{\rho_{\mathrm{DE,eff}}}
\right]
}{
1+3\frac{c_0}{c_\gamma}\lambda_\rho^X(1+w_{\mathrm{eff}})
}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5ba50d392f76ce8c)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-37e1b6290fbb914d)

When the factorization is valid,

$$
Z_{\mathrm{prop},X}
=
\ln\mathcal{P}_{E\to R}
=
\int_0^D
\alpha_{\mathrm{prop}}\!\left(\ell,\hat{\mathbf{k}},X,\theta_{\mathrm{sea}}\right)\,d\ell
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-612fa5be83f3a744)

where $D$ is Euclidean path length through the Euclidean void and $\theta_{\mathrm{sea}}$ denotes the shared Noether sea state record used by the cosmology modules. If the path-local propagation rate is approximately constant over the relevant nearby region, $\alpha_{\mathrm{prop}}\approx\alpha_0$, then

$$
D
\approx
\frac{Z_{\mathrm{prop},X}}{\alpha_0}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1d53125b89918924)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-92d9c13153559967)

In the homogeneous, isotropic, clean-source, low-redshift limit this reproduces the familiar observer formula

$$
D
\approx
\frac{c_0}{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}}
\ln(1+z)
\approx
\frac{c_0 z}{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2849fc77ac5edfb8)

The symbol $H_0$ can therefore remain in the comparison language, but its physical meaning changes. It summarizes the present local redshift-per-distance coefficient of Noether sea transport and clock-rate comparison after source and motion corrections. It is not a direct measurement of space stretching. Directional or environmental variation in the inferred $H_0$ is not automatically a calibration failure; it is a diagnostic of whether the local Noether sea state is close enough to the homogeneous limit used by the distance ladder.

Distance observables must also keep the flux factors separate. In the homogeneous comparison limit, luminosity distance is not only a geometric area proxy; it packages photon energy redshift and arrival-rate dilation:
$$
F
=
\frac{L}{4\pi D_A^2(1+z)^2},
\qquad
d_L=(1+z)^2D_A
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-05ee791efa619244)
For a low-redshift effective FRW projection this becomes
$$
d_L(z)
=
\frac{c_0}{H_{0,\mathrm{eff}}}
\left[
z+\frac12(1-q_{0,\mathrm{eff}})z^2+O(z^3)
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ec98bfcd4c8c4d62)
In the fixed-void reading, $H_{0,\mathrm{eff}}$ and $q_{0,\mathrm{eff}}$ are coefficients of the corrected transport and clock-comparison map. A branch that fits redshift but fails the two flux factors, time-dilation factor, or angular-distance reciprocity has not recovered the cosmological distance ladder.

### Local Redshift-Transfer Curve

The corrected propagation residual should be modeled as a local transfer curve before it is averaged into any Hubble-like number. Let the receiver event be $R=(\mathbf X_R,T_R)$, and let $\hat{\mathbf{k}}$ point from emitter to receiver. Measure Euclidean path distance $s$ backward from the receiver toward the emitter:

$$
\mathbf X(s)=\mathbf X_R-s\hat{\mathbf{k}},
\qquad
T(s)
=
T_R-\int_0^s\frac{d\ell}{c_\gamma(\mathbf X(\ell),T(\ell))}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8e503f8d49ac0b60)

For a source at corrected Euclidean path length $D$, the propagation residual is

$$
Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
=
\int_0^D
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf X(s),
T(s),
\hat{\mathbf{k}},
\theta_{\mathrm{sea}}(s)
\right)\,ds
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b85ca7c5b0220bcb)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b1cf486221fc0dea)

where

$$
\alpha_{R,X}(\hat{\mathbf{k}})
\equiv
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf X_R,
T_R,
\hat{\mathbf{k}},
\theta_{\mathrm{sea},R}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-33cf12163370c1ae)

The second derivative records the first local departure from a constant-slope Hubble law:

$$
\mathcal{K}_{X}(R,\hat{\mathbf{k}})
\equiv
\left.
\frac{\partial^2 Z_{\mathrm{prop},X}}{\partial D^2}
\right|_{D=0}
=
-\hat{\mathbf{k}}^i\partial_i\alpha_{\mathrm{prop},X}\big|_R
-\frac{1}{c_{\gamma,R}}\partial_T\alpha_{\mathrm{prop},X}\big|_R
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e8d937021680bfb9)

Thus the local curve has the expansion

$$
Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
=
\alpha_{R,X}(\hat{\mathbf{k}})D
+
\frac{1}{2}\mathcal{K}_{X}(R,\hat{\mathbf{k}})D^2
+
O(D^3\nabla^2\theta_{\mathrm{sea}},D^3\partial_T^2\theta_{\mathrm{sea}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-14ed45a9b73b826f)

The ordinary constant-$H_0$ approximation is the special case in which $\alpha_{R,X}$ is independent of direction, line family, environment, and observation time, while $\mathcal{K}_{X}$ and higher derivatives remain negligible over the fitted distance range. In the general $\mathbb{A}\mathbb{A}\mathbb{A}$ case, $\alpha_{R,X}$ and $\mathcal{K}_{X}$ are observables of the local Noether sea state, not universal constants.

For environment-resolved modeling, a catalogue should first separate sources by the Noether sea path they sample. For an environment family $\mathcal{E}$, define

$$
\alpha_{\mathcal{E},X}(T,\hat{\mathbf{k}})
\equiv
\left\langle
\alpha_{\mathrm{prop},X}
\right\rangle_{\mathcal{E},T,\hat{\mathbf{k}}},
\qquad
\sigma_{\mathcal{E},X}^2
\equiv
\left\langle
\left(
\alpha_{\mathrm{prop},X}
-
\alpha_{\mathcal{E},X}
\right)^2
\right\rangle_{\mathcal{E},T,\hat{\mathbf{k}}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3dd91da676dc4e41)

The useful first question is whether local voids, filaments, clusters, galaxy halos, and strong-source recycling environments share one $\alpha_{\mathcal{E},X}$ within tolerance after endpoint cadence, launch geometry, and source-branch factors have been removed. If they do not, a single all-sky $H_0$ is a lossy summary of distinct redshift-transfer environments.

For a resolved line of sight, the environment version should be additive in the logarithmic transfer variable rather than averaged only at the end. If the path is divided into segments $j$ with environment labels $\mathcal{E}_j$, write
$$
Y_{X,E\to R}
=
Y_{\mathrm{endpoint},X}
+Y_{\mathrm{source},X}
+Y_{\mathrm{launch},X}
+\sum_{j=1}^{N}
\Delta Y_{X,j}(\mathcal{E}_j,\theta_{\mathrm{sea},j}),
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2d63baa0d5860730)
with each $\Delta Y_{X,j}$ allowed to be positive, negative, or negligible only when its energy, medium-update, and coherence rows close in the same transport record. This segment form is the mathematical place for galaxy-local expansion-like regions, contraction-like regions, cluster crossings, void paths, and strong-source recycling environments. A fitted Hubble-like slope is then a coarse derivative of this path sum, not a primitive universal constant.

### $\Lambda\mathrm{CDM}$ Reference Curve

The standard curved-spacetime model remains useful as a reference curve. For a chosen comparison parameter record $\Theta_{\Lambda\mathrm{CDM}}$, define

$$
Z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
\equiv
\ln\!\left(
1+z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e2d56d56a93df21d)

The $\mathbb{A}\mathbb{A}\mathbb{A}$ residual against that reference is

$$
\Delta Z_X(D,\hat{\mathbf{k}},\mathcal{E})
=
Z_{\mathrm{prop},X}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\!\left(D,\hat{\mathbf{k}},\theta_{\mathrm{sea}}\right)
-
Z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cf9cafcb024ca427)

This residual should be read as a comparison diagnostic, not as evidence that the Euclidean void literally follows the reference model. A successful reduction would show that $\Delta Z_X$ is produced by one shared Noether sea state record across supernovae, BAO, CMB transfer, and local calibration data. A failed reduction would require replacing $\theta_{\mathrm{sea}}$ or the transfer coefficients separately for each observable family.

### Minimal Redshift-Budget Toy Model

The first numerical model should be a bookkeeping simulator for the factorized redshift record, not a claim of empirical recovery. Divide a Euclidean path of length $D$ into $N$ segments with points $(\mathbf X_j,T_j)$, direction $\hat{\mathbf{k}}$, and segment lengths $\Delta s_j$. The input record is

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d391129040fe62e4)

where

$$
\theta_{\mathrm{sea},j}
=
\left(
\chi_{\gamma,j},\,
n_j,\,
R_{\text{braid},j},\,
\mathbf{u}_{\text{sea},j},\,
f_{N,j},\,
J_{\nu,j},\,
S_{ij}^{(j)},\,
\mathcal{R}_{\mathrm{prop},X}^{(j)}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a686c5d4174c6421)

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
\mathbf X_j,T_j,\hat{\mathbf{k}},\theta_{\mathrm{sea},j}
\right)\Delta s_j
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9eac83ddfc962447)

At the end of the path,

$$
\mathcal{P}_{E\to R,X}
=
\exp(Y_{X,N})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aa0268a03b9901da)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1491d61b5c82e9b7)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-93ac6a5a0e642b9a)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ddc52f0fc9af9e12)

where $X$ may denote supernova distance modulus, BAO scale, CMB-frame correction, or another expansion observable. The monopole $O_{X,0}$ records the isotropic fit offset, $\mathbf{O}_{X,1}$ records the dipole, and higher terms record quadrupole and mask-dependent structure.

The Friedmann-like bridge below is usable only after these directional residuals are either within survey tolerance or derived from the same Noether sea variables that determine the clock-rate and transport maps. A residual dipole should not be absorbed silently into $H(z)$, $w(z)$, or calibration constants.

## Photon-Propagation Contribution

Beyond endpoint clock comparison, the same transport picture can include path-dependent phase-cadence evolution during medium transit. This is not untracked photon energy loss; it is the path-history part of how an emitted packet's cadence is later sampled by a receiver.

In this reading, effective redshift accumulation may depend on photon energy, traversed Noether sea state, and path environment, so redshift is modeled as a transport kernel rather than a single universal linear rule.

Line-of-sight medium flow and local contraction/expansion regions can, in principle, contribute signed shifts, so local blueward and redward biases should be treated within one transport kernel rather than as disconnected exceptions.

Propagation channels must preserve image sharpness and $(1+z)$ time-dilation consistency; models requiring generic scattering-loss redshift are excluded.

## Dissipation and Rescaling Picture

Apparent expansion is interpreted, as a candidate reading, as relaxation of Noether sea state:

- high-curvature source regions inject energy into outbound assembly flows (candidate reading),
- lower-density regions evolve toward larger characteristic assembly scales and lower effective temperatures (candidate reading),
- observer-level expansion summaries track this rescaling history (candidate reading).

This picture earns claim status only through the transport-kernel gates of this chapter: the [Transport Derivation Target](#transport-derivation-target) and the [Reproducible Transport Constraints](#reproducible-transport-constraints).

## Dark-Energy Language in This Frame

The parameter

$$
w=\frac{p}{\rho}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6c379607b1e04570)

remains useful as an effective descriptor, but its physical content is medium stress and relaxation state, not an independent vacuum-fluid ontology.

## Hubble-Tension Link

Early-inferred and local-inferred expansion rates probe different Noether sea states:

- Early probes sample a more uniform, less-relaxed sea history.
- Local probes sample pockets that are further along relaxation and dissipation trajectories.

So the $H_0$ split is interpreted as state-dependent inference from one ontology, not two incompatible universes. This reading is a candidate interpretation, and on its own it is compatible with any $H_0$ outcome; it earns claim status only through the environment-resolved test above: the state-dependence coefficients $\alpha_{E,X}$ must produce a nonzero, sign-definite environmental $H_0$ correlation at the declared tolerance of that gate, and a null environment-resolved residual at that tolerance falsifies this reading of the tension.

In this framing, $H_0$ is not expected to be strictly universal at all environments; local scatter is read — subject to the same gate — as part of Noether sea state dependence.

Quasar redshift distributions are interpreted — again as a candidate reading — in the same transport-and-source framework, separating source-population evolution from path-history accumulation within one model.

## Timescape-Style Bridge, $\mathbb{A}\mathbb{A}\mathbb{A}$ Mechanism

Conceptually, this layer is adjacent to inhomogeneous/clock-calibration cosmologies; the bridge is a candidate reading, and the implementation here remains one explicit Noether sea state model:

- clock-rate mapping is computed from shared Noether sea state variables,
- expansion-like inference shifts are environment-conditioned readouts, not ontology splits,
- local-ladder versus early-time differences are modeled as distinct sampling of one evolving Noether sea.

## Reproducible Transport Constraints

The fixed-void cosmology branch can currently claim the transport constraints that any successful redshift mechanism must satisfy. Because the Euclidean void does not expand, the redshift explanation must act through endpoint clock cadence, source-branch state, launch geometry, and path-history transport through the Noether sea. A viable transport redshift must therefore preserve the standard observational rows normally packaged by an FRW scale factor: Tolman surface-brightness scaling $B_{\mathrm{obs}}\propto(1+z)^{-4}$ (the Lubin–Sandage-class surface-brightness test) after the declared distance map, supernova light-curve time dilation $\Delta t_{\mathrm{obs}}\approx(1+z)\Delta t_{\mathrm{emit}}$ (SN survey light-curve-stretch analyses, Goldhaber/Blondin-class), and CMB temperature scaling $T_{\mathrm{CMB}}(z)\approx T_0(1+z)$ (SZ-cluster and molecular-absorption T(z) measurements) in the appropriate thermal record.

These rows are form-level constraints, not a derived $\Lambda\mathrm{CDM}$ mechanism. A scalar $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ is admissible only after statistical homogeneity and isotropy of the retained Noether sea record have been established; otherwise the honest output is a local tensorial $g^{\mathrm{eff}}_{\mu\nu}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ or anisotropic scale response. The Friedmann-like equations below remain comparison-layer summaries until the same Noether sea response law derives $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, $G_{\mathrm{eff}}$, the effective equation of state, and the transport coefficients from one retained record.

## Effective Friedmann Bridge (Comparison Layer)

For data-comparison work, one may retain a Friedmann-like summary:

$$
H_{\mathrm{eff}}^2
=
\frac{8\pi G_{\text{eff}}}{3c_0^2}
\left(\rho_m+\rho_r+u_{\text{sea}}\right)
-\frac{k_{\text{eff}}c_0^2}{a_{\mathrm{eff}}^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a605dcdf9fc89946)

with $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ interpreted as a Noether sea state parameter and $G_{\text{eff}},k_{\text{eff}}$ as effective summaries of assembly-Noether sea response. If a pressure variable is used in the same projection, it must satisfy the comparison continuity row
$$
\frac{d\rho_{\mathrm{eff}}}{dt_{\mathrm{eff}}}
+3H_{\mathrm{eff}}(\rho_{\mathrm{eff}}+P_{\mathrm{eff}})
=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9bd4b54d525ce466)
or declare the residual source term supplied by Noether sea transport.

This equation is a comparison layer for the homogeneous and isotropic limit. It does not by itself justify the assumption that supernovae, BAO, CMB distances, and local-ladder calibrations all share one isotropic background. That shared background must be recovered as a limit of the Noether sea state model or replaced by an explicitly directional effective map.

## Expansion-Module Interface

In the modular cosmology map, this page provides:

- ontic inputs: medium density/stress state, clock-rate map, and transport environment,
- effective outputs: inferred $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, $H_{\mathrm{eff}}(z)$, and redshift-distance behavior,
- shared bridge variables used by [dark-energy.md](./dark-energy.md), [hubble-s8-tensions.md](./hubble-s8-tensions.md), and [CMB.md](./CMB.md).
