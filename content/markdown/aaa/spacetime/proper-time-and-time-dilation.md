# Proper Time and Time Dilation

This chapter explains how clock time is recovered from assembly dynamics. Absolute time $T$ is the substrate evolution parameter used by the $\mathbb{U}_{\text{now}}$ universe-state perspective in the Euclidean void. Derived clock time $\tau$ is the readout of physical clocks built from Noether braid assemblies. The theorem target is to derive the map between them and show how GR-like time dilation and gravitational redshift arise as effective behavior when the clock map closes.

This chapter keeps `proper time` as the standard relativity bridge term for clock time along a timelike record. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the native claim is more specific: $\tau$ is a derived clock readout, not a second substrate time and not a more fundamental or exemplary time. The word `proper` should therefore be read only in the inherited physics sense of belonging to the physical clock record.

This chapter is the canonical home for derived clock time, observer clocks, clock slowing, and the clock map from absolute time $T$ to measured clock readout $\tau$. Foundation and ontology pages should point here once the discussion becomes a clock law, frequency extraction, observer-clock comparison, or Lorentz/GR time-dilation recovery.

For the detailed comparison between special-relativistic clock language and the deformable Noether braid implementation story, see [the special-relativity bridge](../philosophy-history/theory-bridges/special-relativity-noether-braid.md).

The practical rule is to never ask only how fast two clock centers move relative to each other. Ask which assembly cycle is being counted, what local Noether sea state it samples, the clock orientation and group velocity, and which effective observer chart receives the record. Relative velocity becomes the familiar time-dilation variable only after those native records collapse to the homogeneous weak-field limit.

The primary clock law is phase extraction from a declared assembly channel. A clock is usable only when some internal cycle remains stable enough to count:
$$
\frac{d\tau_{\mathcal A}}{dT}
=
\frac{
\Omega_{\mathcal A}
\left(
\mathbf{w},
\mathcal{N}_{\mathrm{sea}},
R_{\mathcal A},
H_{\mathcal A}
\right)
}{
\Omega_{\mathcal A}^{(0)}
},
\qquad
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3022ac1cbdf14fea)
Here $\varphi_{\mathcal A}$ is the counted clock phase, $\Omega_{\mathcal A}^{(0)}$ is its rest-branch reference rate, $\mathcal{N}_{\mathrm{sea}}$ is the retained Noether sea state, $R_{\mathcal A}$ is the clock geometry/orientation record, $H_{\mathcal A}$ is the relevant path-history ledger, and $\mathbf{w}$ is the clock group velocity relative to local Noether sea flow. A broad native expression such as $d\tau/dT=F(\mathbf{w},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{clock geometry})$ is only a shorthand after this phase channel has been declared; observer comparisons must project it to $d\tau/dt_{\mathrm{eff}}$.

For a two-clock comparison, the native input is not the relative velocity of the two clock centers by itself. It is the pair of local clock records
$$
\mathcal{D}_{\tau}^{AB}
=
\left(
\mathbf{w}_A,
\mathbf{w}_B,
\mathcal{N}_{\mathrm{sea},A},
\mathcal{N}_{\mathrm{sea},B},
R_A,
R_B,
H_A,
H_B
\right),
\qquad
\mathbf{w}_K
=
\mathbf{V}_{K,\mathrm{cm}}
-\mathbf{u}_{\mathrm{sea},K}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-2c37ae6a7fd9b1af)
Ordinary relative-velocity time dilation is the weak homogeneous limit of this record after the clock, ruler, and signal channels hide any observer-accessible preferred-frame leakage. If two clocks sample different Noether sea cells, a formula using only $\mathbf{V}_{A,\mathrm{cm}}-\mathbf{V}_{B,\mathrm{cm}}$ has already discarded part of the clock map.

A transported clock supplies a path-integrated test of the same record. For a clock carried around a spatial loop $C$ between shared departure and reunion events and compared on return with a reference clock that remained on worldline $C_0$, define

$$
\Delta\tau_{C:C_0}
=
\int_C
F_{\mathcal A}
\!\left(
\mathbf w_C,
\mathcal N_{\mathrm{sea},C},
R_C,
H_C
\right)dT
-
\int_{C_0}
F_{\mathcal A}
\!\left(
\mathbf w_0,
\mathcal N_{\mathrm{sea},0},
R_0,
H_0
\right)dT,
$$

[View →](../../../../equation-mapping.html#corpus-equation-112a7cb2d7209d27)

where $F_{\mathcal A}=d\tau_{\mathcal A}/dT$ is the same clock map used above. Oppositely directed circumnavigation paths provide the transported-clock benchmark exemplified by Hafele-Keating-type comparisons, while fiber-linked stationary clocks can supply the endpoint reference without turning photon transport into the carried matter clock. This is distinct from the photon-loop Sagnac row: both loops sample the same declared Noether sea flow, but one integrates a material clock cadence and the other integrates signal propagation. The terrestrial $\mathbf u_{\mathrm{sea}}$ working profile in [PPN Parameters](ppn-parameters.md#terrestrial-working-drift-profiles) must be used along both paths. CMB-comoving and locally entrained profiles are discriminated by the annual, sidereal, east-west, and altitude dependence of $\Delta\tau_{C:C_0}$.

The target is to reproduce, in the appropriate regime,
$$
\frac{d\tau}{dt_{\mathrm{eff}}} \approx \sqrt{1+\frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}\|^2}{c_0^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc8677a60808f0b3)
and to generalize this map to strong-field and high-velocity conditions.

Notation convention used in this chapter: $n(\mathbf X,T)\equiv \rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is the canonical medium-density variable. The Noether sea delay factor is $\chi_{\text{sea}}(\mathbf X,T)\equiv c_f/c_{\text{eff}}(\mathbf X,T)$; use it for refractive-delay language so $n$ remains reserved for density. The clock-law derivation imports the [transverse causal budget lemma](../noether-braid/braid-mathematics.md#transverse-causal-budget-lemma): primitive branch tests may use $c_f$, but observer-level clock comparison uses the declared dressed speed $c_\star$, usually $c_\star=c_{\text{eff}}(\mathbf X,T)$ in a local Noether sea cell.

---

## Conceptual Setup

### Absolute Time vs Derived Clock Time

- **Absolute time $T$**
  - Fundamental evolution parameter for the complete architrino dynamics.
  - Global, universal, non-dynamical; used by the $\mathbb{U}_{\text{now}}$ universe-state perspective (simulation clock).
  - All worldlines are parametrized directly by $T$.

- **Derived clock time $\tau$** (standard bridge term: proper time)
  - Time read by a **physical clock**: a bound Noether braid assembly, such as an atomic transition or binary oscillation, interacting with the Noether sea.
  - Encodes how many internal oscillation cycles occur per unit $dT$ before projection into an observer chart.
  - The word `proper` does not mean substrate-level, privileged, or exemplary; it names the inherited relativity comparison target for a clock-carried record.

The fundamental claim is:

> Time dilation is not a change in the rate of $T$; it is a change in how fast internal dynamics of assemblies proceed **relative to** $T$, and then how that clock readout projects into $t_{\mathrm{eff}}$, due to motion and medium coupling.

### Clocks as Dynamical Systems

A clock is any assembly with a **stable, countable internal cycle**. The native picture is not time itself slowing; the countable assembly cycle is what changes cadence:

- Minimal model: a Noether braid with one declared clock-channel index $a_{\mathrm{clk}}\in\{1,2,3\}$ whose cycle is counted. The clock-channel role is extracted from the record and is not assigned by radius order.
- Base frequency $\omega_0$ (or period $P_0 = 2\pi/\omega_0$) is defined for:
  - Clock **at rest** in the absolute frame.
  - In a region of homogeneous Noether sea density $n=1$ and negligible external gradients.

Derived clock time is then defined operationally as:
$$
d\tau = \frac{\omega(\text{state})}{\omega_0}\, dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-71107e7a9b84157d)
where $\omega(\text{state})$ is the instantaneous internal oscillation frequency in the actual kinematic and environmental state.

The central problem is to compute $\omega(\mathbf{w},n,\chi_{\text{sea}},\Phi_{\text{eff}})$ from the master dynamics rather than assigning the clock-rate factor by analogy with relativity.

### Moving-Branch Clock Retuning Target

The homogeneous moving-clock extraction is independent from weak-field PPN matching. Primitive branch calculations solve causal roots with $c_f$:
$$
\left\|\mathbf X_{o}(T)-\mathbf X_{j}(T_0)\right\|
=
c_f(T-T_0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-35f02051aff239c6)
The dressed observer-channel speed $c_\star$ is declared only after the clock/ruler channel is chosen: $c_\star=c_f$ for a primitive branch scan and usually $c_\star=c_{\text{eff}}(\mathbf X,T)$ for a Noether sea dressed clock comparison. Thus
$$
\mathbf{w}
=
\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}},
\qquad
\beta_\star=\frac{\|\mathbf{w}\|}{c_\star},
\qquad
\gamma_\star(\mathbf{w})=\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3eb1204b66abfc3a)
where $\mathbf{w}$ is the clock assembly group velocity through the local Noether sea.

The locally measured speed of light is therefore a co-calibrated observer readout, not a primitive identity among all speed symbols. In a weak homogeneous calibration cell $W_0$, a Physical Observer obtains the empirical value by comparing photon-channel round-trip transport against its own ruler and derived clock phase:
$$
c_0
=
\frac{2L_{\mathrm{obs}}(W_0)}
{\Delta\tau_{\gamma,\mathrm{rt}}(W_0)}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-134ef13e4ca5ce7a)
The numerator is a ruler response, the denominator is a clock readout, and the photon path samples the photon-channel speed $c_\gamma$. The closure burden is to derive why $c_{\text{eff}}$, $c_\gamma$, and $c_0$ share one weak-homogeneous measured limit within the preferred-frame leakage budget, then separately determine that common value's relationship to primitive $c_f$; neither identification can be supplied by notation alone.

The [weak-homogeneous speed-factorization lemma](./lorentz-kinematics.md#weak-homogeneous-speed-factorization-lemma) separates that burden into two statements. Calibration closure and photon common-mode closure can establish $c_\gamma=c_{\text{eff}}=c_0$, while the additional constitutive condition $\chi_{\mathrm{sea},0}=1$ is required to identify their common value with primitive $c_f$. If instead $\chi_{\mathrm{sea},0}>1$, the observer channels may still close on one speed while $c_f>c_0$ remains a substrate-to-observer hierarchy.

The simple clock-budget target is that the declared channel speed splits into group velocity (center-of-mass convention) and transverse closure:
$$
c_\star^2
=
\|\mathbf{w}\|^2+c_{\perp}^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-5330edf862d8c173)
so
$$
c_{\perp}
=
c_\star\sqrt{1-\frac{\|\mathbf{w}\|^2}{c_\star^2}}
=
\frac{c_\star}{\gamma_\star(\mathbf{w})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a02d9cc11e62d3ed)
An accepted clock branch must then extract
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star(\mathbf{w})}
$$

[View →](../../../../equation-mapping.html#lorentz-clock-rate)

from its internal phase dynamics, rather than assign the factor independently.

For an admitted moving Noether braid branch $q$ on a group-speed band $0\le \|\mathbf{w}\|/c_f\le\beta_{\max}<1$, choose one clock phase $\theta_{\mathrm{clk},q}$ from the same causal-root ledger used for the branch's geometry. The extracted period is
$$
P_q(\mathbf{w})
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
P_0=P_q(\mathbf{0})
$$

[View →](../../../../equation-mapping.html#corpus-equation-7d21870566bab09b)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

and the clock residual is
$$
R_T^{(q)}(\mathbf{w})
\equiv
\frac{P_q(\mathbf{w})}{P_0}
-
\gamma_\star(\mathbf{w})
$$

[View →](../../../../equation-mapping.html#corpus-equation-4c530e05f6920294)
The moving-clock theorem target is
$$
\left|R_T^{(q)}(\mathbf{w})\right|
\le
C_T\epsilon_{\text{LV}}\beta_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-93af84c8ee8b5221)
uniformly on the group-speed band, with any surviving preferred-frame sideband reported as a branch-sourced leakage term. This packet fails if the clock phase and ruler geometry come from different branch ledgers, if the residual is suppressed only by fitting a PPN coefficient after the fact, or if $c_f$ is silently identified with $c_\star$ without a dressing map.

This moving-clock row is one leg of the structural-integrity common-limit closure in [Lorentz Kinematics](./lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). It is not enough for the clock branch to approximate $\gamma_\star^{-1}$ in isolation. The same causal-root ledger must also produce the moving ruler deformation, photon synchronization row, and weak-field gravity-channel speed row used by Lorentz closure; otherwise the clock result is a branch-split fit rather than clock-map closure.

### Noether Sea Braid Cadence

For redshift and cosmology work, the local Noether sea braid cadence can serve as the immediate clock reference before any separate detector clock is introduced. Let $\Omega_N(\mathbf X,T)$ be a representative cadence extracted from the local Noether sea braid population, with $P_N(\mathbf X,T)=2\pi/\Omega_N(\mathbf X,T)$. Relative to the weak homogeneous reference cadence, define

$$
\Gamma_N(\mathbf X,T)
\equiv
\frac{P_N(\mathbf X,T)}{P_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf X,T)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3a5e0a0a1a6f616)

Here $P_{N0}$ is the reference Noether sea braid cycle period.

The quantity $\Gamma_N$ records local cadence stretching of the Noether sea itself. It is therefore a substrate-facing clock diagnostic: $\Gamma_N=1$ marks the weak homogeneous reference, while $\Gamma_N>1$ marks a locally slowed or stretched Noether sea cadence. In the homogeneous moving Noether braid branch, the Lorentz-closure target is to derive the appropriate limit $\Gamma_N\to\gamma_\star$ or, equivalently, $\Omega_N/\Omega_{N0}\to1/\gamma_\star$ for the declared clock channel. In a gravitational or cosmological Noether sea state comparison, $\Gamma_N$ must instead be extracted from $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $\Phi_{\text{eff}}$, and clock geometry.

This diagnostic does not replace the clock readout. Native clock-map derivations use $d\tau/dT$, while observer-coordinate comparisons use $d\tau/dt_{\mathrm{eff}}$. $\Gamma_N$ supplies a more primitive Noether sea cadence factor from which clock-rate comparisons, gravitational redshift, and the redshift factorization in [Expansion Mechanism](../cosmology/expansion-mechanism.md#noether-sea-braid-factorization-target) can be built. The ordinary local clock-rate factor is the inverse:

$$
C_N(\mathbf X,T)
\equiv
\frac{\Omega_N(\mathbf X,T)}{\Omega_{N0}}
=
\Gamma_N^{-1}(\mathbf X,T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9cb615956f2447de)

Using $C_N$ as the emitting or receiving matter-clock factor requires a same-cell identification that must be tested rather than assumed. For a declared clock assembly $\mathcal A$, define
$$
\Delta_{\mathrm{clk\text{-}sea},\mathcal A}
\equiv
\ln\!\left[
\frac{\Omega_{\mathcal A}(\mathbf X,T)}
{\Omega_{\mathcal A}^{(0)}}
\right]
-
\ln C_N(\mathbf X,T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-26bc0e766ff038dd)
The endpoint redshift factorization may use $\Gamma_N$ directly as the source/detector clock conversion only on a branch where $\Delta_{\mathrm{clk\text{-}sea},\mathcal A}=0$ within tolerance for both endpoint clock records. Otherwise the two mismatch terms remain explicit; they cannot be absorbed into the launch factor or path-history propagation row.

In the homogeneous moving Noether braid branch, the geometry-to-clock closure target is $C_N\to\xi\to1/\gamma_\star$, so the corresponding cadence-stretch target is $\Gamma_N\to1/\xi\to\gamma_\star$.

In the weak-field endpoint limit, the required recovery condition is

$$
\frac{\Omega_N(\mathbf X,T)}{\Omega_{N0}}
\approx
1+\frac{\Phi_N(\mathbf X,T)}{c_0^2},
\qquad
\Gamma_N(\mathbf X,T)
\approx
1-\frac{\Phi_N(\mathbf X,T)}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-93ca3ce444633449)

to first order in $\Phi_N/c_0^2$. Since $\Phi_N < 0$ in a deeper potential, this gives $\Gamma_N > 1$ there: the local Noether sea braid cadence is stretched relative to the weak homogeneous reference. For two endpoint cells $E$ and $R$ with no source-branch, launch, or path-history correction, the redshift recovery condition is therefore

$$
\ln(1+z)
\approx
\ln\Gamma_{N,E}-\ln\Gamma_{N,R}
\approx
\frac{\Phi_N(R)-\Phi_N(E)}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b6420fa9dce2374b)

This is the clock-channel version of the weak gravitational-redshift benchmark. The derivation burden is to obtain the first equation from Noether sea constitutive response rather than impose it as an imported metric fact.

### GR Proper-Time Functional Benchmark

The same clock map must also reproduce the observer-level proper-time functional that GR uses for timelike records. This is a bridge benchmark, not a substrate definition of time. For a candidate effective metric recovered from the Noether sea record,
$$
d\tau
=
\frac{1}{c_0}
\sqrt{-g^{\text{eff}}_{\mu\nu}dx^\mu dx^\nu}
$$

[View →](../../../../equation-mapping.html#corpus-equation-88c5350d2fa2aad3)
with the weak-field static endpoint limit above and the moving-clock limit
$$
g^{\text{eff}}_{\mu\nu}
\frac{dx^\mu}{d\tau}
\frac{dx^\nu}{d\tau}
=
-c_0^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d7d800b6f44e95b)
This equation is not a claim that the Euclidean void is a four-dimensional curved substrate. It is the observer-level action benchmark: physical clocks should extremize the same effective interval that the signal, ruler, and orbital modules use when they project the Noether sea state into GR comparison language. If a branch recovers endpoint redshift but fails the integrated clock functional along accelerated or orbital records, the clock map has not closed.

### Gamma-N Geometry Extraction Target

The equations above define the endpoint benchmark, but they do not yet derive the Noether sea cadence factor from Noether braid geometry. A first-order extraction scaffold should start from the local variables that already appear in the clock and transport programs: normalized Noether braid density $n$, Noether sea delay factor $\chi_{\text{sea}}$, envelope scale $\lambda$, envelope shape ratio $\xi$, and a representative Noether braid scale $R_{\text{braid}}$. Around the weak homogeneous reference, collect the logarithmic deformation record

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\chi_{\text{sea}},\,
\ln\lambda,\,
-\ln\xi,\,
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}
\right)^T
$$

[View →](../../../../equation-mapping.html#corpus-equation-a46d789ceb9106cc)

The candidate extraction law is

$$
\ln\Gamma_N
=
\mathbf{b}_N\cdot\mathbf{g}_N
+\mathcal{R}_{\Gamma}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f089d5e0e2dc557f)

where $\mathbf{b}_N$ is a constitutive coefficient row and $\mathcal{R}_{\Gamma}$ contains higher-order and branch-specific corrections. Write the row as

$$
\mathbf{b}_N
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_\xi,\,
b_R
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-833e66c77e8d2694)

The sign convention places $-\ln\xi$ in the deformation record because the homogeneous Lorentz-closure branch requires $\Gamma_N\to1/\xi$ when the clock readout is controlled only by oblate moving Noether braid geometry. In that branch

$$
\mathbf{g}_N^{\mathrm{mov}}
=
\left(
0,\,
0,\,
0,\,
\ln\gamma_\star,\,
0
\right)^T
+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-fa006be2e344f197)

so the moving Noether braid constraint fixes

$$
b_\xi=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-ddb1a2e9ae23ad5a)

up to preferred-frame leakage. The first-order admissible row is therefore

$$
\mathbf{b}_N
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
1,\,
b_R
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8edf14499a6bf479)

with the remaining coefficients belonging to the isotropic Noether sea constitutive response rather than to Lorentz geometry.

This is also the convention bridge to the effective metric subclass. If the local metric clock-rate factor is written as an isotropic factor times the envelope shape ratio,

$$
C_N^{\mathrm{met}}
=
\Omega_{\mathrm{clk}}(n,\chi_{\text{sea}},\lambda,R_{\text{braid}})\,\xi
$$

[View →](../../../../equation-mapping.html#corpus-equation-a95758caeb211954)

then the cadence-stretch factor is

$$
\Gamma_N^{\mathrm{met}}
=
\left(
\Omega_{\mathrm{clk}}\xi
\right)^{-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0a836b066abcb1bc)

Writing

$$
\ln\Omega_{\mathrm{clk}}
=
\omega_n\ln n
+\omega_\chi\ln\chi_{\text{sea}}
+\omega_\lambda\ln\lambda
+\omega_R\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}
+\mathcal{R}_{\Omega}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d99f796bbd25d77b)

therefore gives the coefficient identification

$$
b_n=-\omega_n,\qquad
b_\chi=-\omega_\chi,\qquad
b_\lambda=-\omega_\lambda,\qquad
b_R=-\omega_R,\qquad
b_\xi=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-de32bdacec9cfeb8)

The weak-field recovery condition then becomes a constraint on the same coefficient row:

$$
\ln\Gamma_N(\mathbf X,T)
=
-\frac{\Phi_N(\mathbf X,T)}{c_0^2}
+O\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8b98e8e2198fada3)

or, locally,

$$
\mathbf{b}_N\cdot\nabla\mathbf{g}_N
=
-\frac{\nabla\Phi_N}{c_0^2}
+O\!\left(\frac{\Phi_N\nabla\Phi_N}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f292798e3fefef47)

Equivalently, let $U\equiv-\Phi_N>0$ and define the static weak-potential response coefficients by

$$
\ln n=a_n\frac{U}{c_0^2},\qquad
\ln\chi_{\text{sea}}=a_\chi\frac{U}{c_0^2},\qquad
\ln\lambda=a_\lambda\frac{U}{c_0^2},\qquad
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}=a_R\frac{U}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-05e9a66a740ae67c)

to first order, with $-\ln\xi=0+O(U^2/c_0^4)$ in an isotropic static endpoint cell. Then weak gravitational redshift fixes only the scalar combination

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfeb9203c8a8c97b)

In clock-rate language this is the equivalent condition

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-1a28ac3218d03be4)

This is the first useful reduction of the proof burden. The Lorentz branch fixes the shape coefficient $b_\xi$, while static weak-field redshift fixes one isotropic coefficient combination. Individual values of $b_n$, $b_\chi$, $b_\lambda$, and $b_R$, or equivalently of the $\omega$ row, require a constitutive calculation or simulation that extracts how a mass source changes $n$, $\chi_{\text{sea}}$, $\lambda$, and $R_{\text{braid}}$ in the same Noether sea cell.

Existing weak-field signal tests constrain one neighboring component of this vector. The PPN Shapiro-delay map uses the observer-normalized delay factor

$$
\bar{\chi}_{\text{sea}}
=
\frac{c_0}{c_{\text{eff}}}
=
1+(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-19fec1babf2d6717)

so its logarithmic response is

$$
\delta\ln\bar{\chi}_{\text{sea}}
=
(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8d2e34beb30622ad)

This fixes a signal-delay response coefficient $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$, giving $a_\chi^{\mathrm{sig}}\approx2$ in the GR-matching solar-system branch. It becomes the clock-row coefficient $a_\chi$ only if the clock cadence and signal-propagation channel share the same scalar delay response in the tested branch. If they do not, the difference is not fit freedom; it is a channel-splitting residual that must be carried into PPN, redshift, and pressure-response comparisons.

#### Shared Clock/Signal Delay Closure

The equality between the clock coefficient and the Shapiro-delay coefficient is therefore a closure condition:

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-a_\chi^{\mathrm{sig}}
=
a_\chi-(1+\gamma_{\mathrm{PPN}}),
\qquad
\Delta_\chi^{\mathrm{clk\text{-}sig}}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-6fe57db62ae807f7)

A branch may impose this condition only when the same first-order Noether sea delay factor retimes assembly clocks and signal propagation, the photon or signal channel has no separate $\chi_\gamma$ response at $O(U/c_0^2)$, the asymptotic normalization $c_0/c_f$ is spatially constant in the comparison, and the weak cell is isotropic enough that first-order birefringent or stress-anisotropic delay terms are absent.

Under this shared-delay closure, the static endpoint constraint becomes

$$
b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-79bb19359c345ec5)

or, equivalently in clock-rate-row language,

$$
\omega_n a_n+\omega_\chi(1+\gamma_{\mathrm{PPN}})+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-5bd8f9f31c9d87dc)

In the GR-matching weak solar-system branch, $\gamma_{\mathrm{PPN}}=1$ makes the delay contribution $2b_\chi$ in the cadence-stretch row and $2\omega_\chi$ in the clock-rate row. If $\Delta_\chi^{\mathrm{clk\text{-}sig}}\neq0$, the branch has not failed by definition, but it must carry $\Delta_\chi^{\mathrm{clk\text{-}sig}}$ as a measured residual across clock redshift, Shapiro delay, pressure-response, and cosmological redshift comparisons rather than absorbing it into a fitted coefficient.

The first admissible static packet is the minimal shared-delay specialization of this row. Let

$$
A_\chi\equiv1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d5298d474772e1a4)

If the weak static endpoint cadence is assigned entirely to the shared scalar delay response at first order, then

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0,\,
A_\chi,\,
0,\,
0
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f6c3e0cfe0ef5b1f)

and the cadence-stretch row is

$$
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
A_\chi^{-1},\,
0,\,
0
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-34055c6ee6794a7d)

The inverse clock-rate row is therefore

$$
\left(
\omega_n,\,
\omega_\chi,\,
\omega_\lambda,\,
\omega_R
\right)
=
\left(
0,\,
-A_\chi^{-1},\,
0,\,
0
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a2fde75dcac68696)

so

$$
\mathbf b_N\cdot\mathbf a=1,\qquad
\boldsymbol\omega\cdot\mathbf a=-1,\qquad
b_i+\omega_i=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-452db7ebcd0c234e)

For the GR-matching weak branch, $A_\chi=2$, giving $a_\chi=2$, $b_\chi=1/2$, and $\omega_\chi=-1/2$. This is a minimal endpoint packet, not a proof that density, envelope scale, or core-radius responses are physically absent. A compensated static family remains admissible:

$$
a_\chi=A_\chi,\qquad
b_\chi
=
\frac{
1-b_n a_n-b_\lambda a_\lambda-b_R a_R
}{
A_\chi
},
\qquad
\omega_i=-b_i
$$

[View →](../../../../equation-mapping.html#corpus-equation-84328dadbe0b963f)

#### Compensated Static-Family Validation Packet

The compensated family is a constrained endpoint row, not an additional redshift fit. Under shared clock/signal delay, define the non-$\chi_{\text{sea}}$ static response vector and coefficient row by

$$
\mathbf{u}^{G}
=
\left(
a_n,\,
a_\lambda,\,
a_R
\right)^T,
\qquad
\mathbf{c}
=
\left(
b_n,\,
b_\lambda,\,
b_R
\right)^T
$$

[View →](../../../../equation-mapping.html#corpus-equation-c20a455a876ba400)

The weak static endpoint condition is then

$$
S_G
\equiv
\mathbf{c}\cdot\mathbf{u}^{G}
+b_\chi A_\chi
=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-258a5d975a739e88)

A finite-height clock comparison samples the spatial derivative of the same scalar. For a small upward separation $L$ near Earth, with $U(z+L)-U(z)\approx-gL$, the clock-rate ratio obeys

$$
\frac{\Delta\nu}{\nu}
=
-\Delta\ln\Gamma_N
=
S_G\frac{gL}{c_0^2}
+O(L^2)
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-aa0b5a06479ac2d6)

Thus finite-height redshift fixes $S_G=1$ to the experimental tolerance. It does not distinguish the minimal row $\mathbf{c}=\mathbf{0}$ from a compensated row with $\mathbf{c}\cdot\mathbf{u}^{G}\ne0$ and adjusted $b_\chi$, provided the same coefficients are used across the sample.

Hydrogen spectral conversion adds a record-difference test rather than another endpoint normalization. For two admissible hydrogen records $\ell$ and $\ell'$ whose line-inferred cadence stretch agrees after the envelope-gap residual is removed, the same spectral row must satisfy

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot
\left(
\mathbf{g}_{N,\mathrm H}^{(\ell)}
-
\mathbf{g}_{N,\mathrm H}^{(\ell')}
\right)
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-1948a88723c6fa33)

The minimal shared-delay row passes only if the record difference has no uncompensated $\chi_{\text{sea}}$ component after the fixed $-\ln\xi$ term is included. The hydrogen toy scan now demonstrates the discriminant: the clean shared-delay row passes a clean $\chi_{\text{sea}}$-only packet, while the density/scale-compensated row passes the split-record scaffold. This does not yet prove that the gravitational static endpoint has nonzero $a_n$, $a_\lambda$, or $a_R$; it demonstrates within the scaffold that any atom-local record with persistent density, scale, or core-radius splits must use one shared compensated row instead of per-line clock factors; the universal statement remains a conjectured consistency requirement.

Pressure-response replay supplies the independent shared-row test. Let

$$
\mathbf{a}^{G}
=
\left(
a_n,\,
A_\chi,\,
a_\lambda,\,
a_R
\right)^T,
\qquad
\mathbf{a}^{P\to\Gamma}
=
\frac{\delta\mathbf{g}^{P,\mathrm{iso}}}
{\delta\ln\Gamma_N^{P,\mathrm{iso}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8add6d6b9525999b)

A single isotropic cadence row can serve both the gravitational endpoint and the pressure-normalized replay only if

$$
\begin{pmatrix}
\left(\mathbf{a}^{G}\right)^T\\
\left(\mathbf{a}^{P\to\Gamma}\right)^T
\end{pmatrix}
\mathbf{b}
=
\begin{pmatrix}
1\\
1
\end{pmatrix},
\qquad
\omega_i=-b_i
$$

[View →](../../../../equation-mapping.html#corpus-equation-a63bfc2ad5245009)

The current Fe/Cr toy pressure projection has $\mathbf{a}^{P\to\Gamma}=(0,0.6,0,0)^T$ (toy-replay value; no linked packet), while the GR-matching shared-delay endpoint has $A_\chi=2$. Therefore the $\chi_{\text{sea}}$-only shared row is falsified for that toy pressure replay. A broader compensated row remains conditional: it requires branch-derived non-$\chi_{\text{sea}}$ pressure response in $n$, $\lambda$, or $R_{\text{braid}}$, and it must still preserve $S_G=1$ for finite-height and endpoint redshift.

The current validation result is therefore:

| Coefficient | Status |
| --- | --- |
| $a_n$ | Optional in the weak static endpoint; conditionally required only if a branch-derived density response is needed to keep hydrogen or pressure records on one shared row. |
| $a_\lambda$ | Optional in the weak static endpoint; conditionally required only if the envelope-scale branch supplies the compensating record. |
| $a_R$ | Optional in the weak static endpoint; conditionally required only after a declared $R_{\text{braid}}$ readout ties the pressure or spectral record to the same row. |

Unconstrained nonzero values of $a_n$, $a_\lambda$, or $a_R$ are disfavored (toy-scoped). They may be promoted only as branch-derived compensated response, not as adjustable redshift coefficients.

This gives the derivation a concrete target. The same $\Gamma_N$ extraction map must recover $\Gamma_N=1$ in the weak homogeneous reference, $\Gamma_N\to1/\xi$ in the homogeneous moving Noether braid Lorentz branch, and $\Gamma_N\approx1-\Phi_N/c_0^2$ in the weak gravitational endpoint branch. It must also remain separate from the launch factor $D_v$ and the path-history propagation factor $Y_X$, so the endpoint contribution to redshift is only

$$
\ln(1+z)_{\mathrm{endpoint}}
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f9d5c2ac776788d3)

The full candidate redshift comparison keeps that endpoint clock term separate from source, launch, and path-history terms:

$$
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
-\ln D_v
+Y_{X,E\to R}
-\ln B_X(E)
$$

[View →](../../../../equation-mapping.html#corpus-equation-cda63ef12a45ddae)

Here $B_X(E)$ is the source-branch factor, $D_v$ is the launch or relative-motion phase-compression factor, and $Y_{X,E\to R}=\ln\mathcal P_{E\to R,X}$ is the path-history propagation integral through the Noether sea. This chapter owns the coefficient-row extraction of $\Gamma_N$ and $C_N=\Gamma_N^{-1}$; [Noether sea](noether-sea.md#equilibrium-transport-hypothesis) owns the absolute-record transport map and its path-history factors. Those transport factors must not be folded into $\Gamma_N$ unless a derivation proves the reduction in a declared limit.

### Hydrogen Spectral Clock-Rate Conversion Target

Hydrogen spectra give the first atom-local use of the $\Gamma_N$ extraction map. The cadence-stretch factor is not the frequency multiplier itself. In the sign convention above, $\Gamma_N>1$ means the local Noether sea cadence is stretched, so the corresponding local clock-rate factor is

$$
C_N(\mathbf X,T)
=
\Gamma_N^{-1}(\mathbf X,T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-04c3beb942a0921c)

For the hydrogen spectral channel at resolution $\ell$, extract the clock-facing deformation record from the same response map used by the spectral scan:

$$
\mathbf{g}_{N,\mathrm H}^{(\ell)}
=
\left(
\ln n_{\mathrm H}^{(\ell)},\,
\ln\chi_{\text{sea},\mathrm H}^{(\ell)},\,
\ln\lambda_{\mathrm H}^{(\ell)},\,
-\ln\xi_{\mathrm H}^{(\ell)},\,
\ln\frac{R_{\text{braid},\mathrm H}^{(\ell)}}{R_{\text{braid},0}}
\right)^T
$$

[View →](../../../../equation-mapping.html#corpus-equation-4c082d3ed5d46bbc)

The hydrogen clock/rate conversion target is then

$$
\ln\Gamma_{N,\mathrm H}^{(\ell)}
=
\mathbf{b}_{N}^{\mathrm{spec}}\cdot
\mathbf{g}_{N,\mathrm H}^{(\ell)}
+
\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)},
\qquad
C_{N,\mathrm H}^{(\ell)}
=
\left(\Gamma_{N,\mathrm H}^{(\ell)}\right)^{-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d39f2b933cf2f91b)

The row $\mathbf{b}_{N}^{\mathrm{spec}}$ is not a per-line fit. It is the spectral-channel instance of the same clock-row program above, with $b_\xi=1$ inherited from the homogeneous Lorentz branch and the weak-field scalar combination constrained by gravitational redshift. The residual $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ carries higher-order branch effects such as recoil, hyperfine structure, medium anisotropy, or unresolved source-branch corrections; it must not absorb the basic distinction between $n$, $\chi_{\text{sea}}$, and clock cadence.

For a hydrogen transition $a\to b$, the clock-converted spectral readout is therefore

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
C_{N,\mathrm H}^{(\ell)}
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{h}
+
\nu_{a\to b}^{\mathrm{res},(\ell)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-953b0edf29be2d6f)

Equivalently, an isolated line with bounded event residual gives a line-inferred cadence stretch,

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-76adf5d3fbc29f32)

The first pass condition is that one $\Gamma_{N,\mathrm H}^{(\ell)}$ from the local Noether sea response controls the chosen line set:

$$
\max_{(a,b)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
-
\ln\Gamma_{N,\mathrm H}^{(\ell)}
\right|
}{
\left|
\ln\Gamma_{N,\mathrm H}^{(\ell)}
\right|
+
\varepsilon_{\Gamma}
}
\le
\Delta_{\Gamma}^{\mathrm{tol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c0f1fa19f3dc2a0d)

This target fails if $\Gamma_N$ is multiplied directly into the line frequency after being defined as cadence stretch, if each transition requires its own clock coefficient row, if $n$ or $\chi_{\text{sea}}$ is used as a substitute for $\Gamma_N$, if recoil or photon-channel propagation is hidden inside $\Gamma_N$, or if the hydrogen spectral map uses a different Noether sea response record than the clock, Shapiro-delay, or endpoint-redshift comparisons.

The first proof/simulation packet for this row is the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md). It treats $\mathbf{b}_{N}^{\mathrm{spec}}$ as a constrained clock-row instance: $b_\xi=1$ is fixed by the homogeneous Lorentz branch, the weak static endpoint row must satisfy $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$, and the observer frequency uses $C_N=\Gamma_N^{-1}$. The packet passes only if a shared row controls the chosen hydrogen line set across admissible refinement; it fails when the scan needs a transition-specific row, a direct $\Gamma_N$ frequency multiplier, a collapsed density/delay variable, or a residual budget that hides recoil, hyperfine structure, photon-channel propagation, or unresolved source-branch effects.

The first executable scaffold keeps the clock proof burden visible. Its accepted spectral row is inherited from the density/scale-compensated static-response packet, not fitted from hydrogen lines alone. Its hydrogen records also keep $n$, $\chi_{\text{sea}}$, $\lambda$, $\xi$, and $R_{\text{braid}}$ as separate entries in $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, so a row that matches one line or one record can still fail when the component split changes under admissible refinement. The executable derives the scaffold line factors, observer frequencies, and replay envelope gaps from recovered principal labels plus one shared line-inferred $\ln\Gamma_N$. A completed theory-bearing record must therefore supply the same four inputs together from one declared hydrogen spectral channel ledger and the same Noether sea cell: the hydrogen $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record, envelope gaps, observer frequencies, and static response vector.

---

## Mechanisms for Time Dilation

Two coupled mechanisms change the internal frequency of a Noether braid clock. The prescribed [B1](../noether-braid/braid-family-b.md#b1) candidate — one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense, with independent per-binary radii, axial half-separations, transverse orbit radii, and phases — supplies mechanism intuition for a highly coordinated clock. The executable clock record below instead uses a prescribed A1 chart so orientation and per-binary frequency dependence remain independently falsifiable. The two charts are alternative clock candidates, not one clock ontology silently changing family.

### Kinematic Effect (Velocity Dependence)

When the clock has group velocity (center-of-mass convention) $\mathbf{V}_{\text{cm}}$ relative to a local Noether sea drift $\mathbf{u}_{\text{sea}}$, its material group velocity is $\mathbf{w}=\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}}$:

1. **Path-length elongation:** Internal architrinos must traverse longer spatial paths per cycle because the clock’s center of mass is in motion. Even in the clock’s own rest frame, the underlying wake interactions are evaluated in the absolute frame where the worldline is slanted through absolute timespace.

2. **Finite causal speed:** Primitive self-hit and partner-hit roots are mediated by delayed, radial path-history interactions at speed $c_f$. When those roots are dressed into an observer-level clock law, the transverse budget must be formed with the declared channel speed $c_\star$: $c_\star=c_f$ for a primitive branch test and $c_\star=c_{\text{eff}}(\mathbf X,T)$ for a Noether sea dressed clock comparison.

3. **Shape deformation (Lorentz-link hypothesis):** Under the Family-A Lorentz-link hypothesis, increased $\|\mathbf{w}\|$ makes the complete braid's **oblate spheroidal exclusion envelope** flatten along the direction of motion:
 - At low $\|\mathbf{w}\|$, the oblate spheroidal exclusion envelope is nearly spherical.
 - As $\|\mathbf{w}\|\to c_\star$, that envelope contracts along $\hat{\mathbf{w}}$ while maintaining transverse dimensions, yielding semiaxes $(R_{\perp}, R_{\perp}, R_{\parallel})$ and $R_{\parallel} < R_{\perp}$.
 - This geometric dilation changes internal path lengths and curvature, lowering $\omega$.

Geometry terminology follows [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#canonical-geometry-variables): the envelope shape ratio is $\xi=R_{\parallel}/R_{\perp}$. The derived clock-time factor is not defined to be $\xi$; it is the extracted clock observable $\omega_{\text{clk}}/\omega_0=d\tau/dt_{\mathrm{eff}}$ after an effective observer chart is declared. In the homogeneous Lorentz-closure target, the theory must derive $\omega_{\text{clk}}/\omega_0\to\xi\to1/\gamma_\star$.

**Kinematic hypothesis:**
$$
c_{\perp}
=
c_\star
\sqrt{1 - \frac{\|\mathbf{w}\|^2}{c_\star^2}},
\qquad
\omega(\mathbf{w}, n=1) \approx \omega_0 \frac{c_{\perp}}{c_\star}
\quad \Rightarrow\quad
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{\text{kin}} \approx \sqrt{1 - \frac{\|\mathbf{w}\|^2}{c_\star^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fd732363b668a113)
in the regime where the clock's motion does not significantly disturb the local Noether sea. For SI comparison in the weak homogeneous comparison, the observer branch sets $c_\star$ to the measured low-gradient clock/signal speed $c_0=c_{\text{eff}}(\infty)$; this is a declared branch status, not an independent replacement for the primitive wake speed $c_f$.

### Muon Lifetime Benchmark

Cosmic-ray muons supply a compact observer-level benchmark for the moving-clock row. In the standard account, muons formed high in the atmosphere have a rest-frame mean lifetime near $2.2\,\mu\mathrm{s}$ and travel at a large fraction of $c_0$. Without time dilation, a particle moving near $c_0$ for only a few microseconds would cross less than a kilometer before the exponential survival law suppresses the population. Yet high-altitude and sea-level counts, such as the Frisch-Smith Mount Washington comparison, retain far more muons than the undilated lifetime permits.

The benchmark is a clock-law test, not a new substrate-time claim. In the weak homogeneous observer branch, let $N_{\mathrm{high}}$ be the counted muon rate at the high detector, $N_{\mathrm{low}}$ the counted rate at the lower detector, $\Delta h$ the height separation, $\tau_{\mu,0}$ the rest-lifetime comparison value, and $\|\mathbf{w}_\mu\|$ the muon group speed through the local Noether sea. The observer-level survival target is
$$
N_{\mathrm{low}}
\approx
N_{\mathrm{high}}
\exp\!\left[
-
\frac{\Delta h/\|\mathbf{w}_\mu\|}
{\gamma_\mu \tau_{\mu,0}}
\right],
\qquad
\gamma_\mu
=
\frac{1}{\sqrt{1-\|\mathbf{w}_\mu\|^2/c_0^2}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c56da42f9f4c60a1)

The same event can be described in the muon's effective rest chart as length contraction of the atmospheric path. In $\mathbb{A}\mathbb{A}\mathbb{A}$ both descriptions are downstream exports of one moving-assembly response: the external observer sees a slowed internal reaction clock, while the muon-channel description compresses the traversed distance. The native burden is to derive the same $\gamma_\mu$ from the assembly and Noether sea record that also supports clocks, rulers, photon synchronization, and bounded preferred-frame leakage.

### Gravitational Effect (Medium Dependence)

Massive assemblies polarize and densify the surrounding Noether sea. A clock deeper in this polarized region experiences:

1. **Higher local Noether density $n(\mathbf X,T)$ (equivalently higher $\rho_{\text{NS}}$):** Interaction delays with the Noether sea (and between internal architrinos through the Noether sea) increase. This raises the **Noether sea delay factor** $\chi_{\text{sea}}$ for internal processes.

2. **Effective field speed reduction $c_{\text{eff}}(\mathbf X,T) < c_f$:**
 - The propagation of wake influences is slowed in dense regions (more frequent encounters with Noether braids).
 - From the clock's perspective, each internal wake contribution is delayed in the declared clock map.

3. **Tidal distortion of Noether braid geometry:** Gradients in $n$ and the effective potential $\Phi_{\text{eff}}$ compress the braid differently along radial vs tangential directions. This modifies binary radii and thus frequencies.

**Gravitational hypothesis:** To first order in the Newtonian potential $\Phi_N(\mathbf X,T)$,
$$
\omega(\Phi_N) \approx \omega_0\left(1 + \frac{\Phi_N}{c_0^2}\right)
\quad \Rightarrow \quad
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{\text{grav}} \approx 1 + \frac{\Phi_N}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-24b2b751b10b3a1a)
with the sign convention chosen so that $\Phi_N < 0$ (deeper potential) yields **slower** clocks ($d\tau/dt_{\mathrm{eff}} < 1$), consistent with GR.

### Finite-Height Clock Benchmark

Modern optical-clock comparisons turn gravitational time dilation into a finite-sample constraint, not only a satellite-scale or tower-scale effect. Near Earth's surface, two static clock elements separated by height $L$ should show
$$
\frac{\Delta\nu}{\nu}
\approx
\frac{\Delta\Phi_N}{c_0^2}
\approx
\frac{gL}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4301ecefeb0aadf9)
Thus $L=1\,\mathrm{mm}$ corresponds to $\Delta\nu/\nu\approx1.1\times10^{-19}$, while $L=33\,\mathrm{cm}$ corresponds to $\Delta\nu/\nu\approx3.6\times10^{-17}$. These numbers are direct weak-field acceptance tests for the extracted clock map: the same Noether sea constitutive response that slows separated clocks must also describe an extended clock sample whose lower and upper portions accumulate different derived clock phases.

For independent atoms this can be corrected pointwise, as in ordinary redshift compensation. For entangled or collective clock states, however, assigning the entire apparatus the derived clock time at the trap center is only an approximation. The $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target is to derive the measured clock time from collective phase evolution across the sample, with the center-time prescription emerging only when the gradient-induced phase spread is below the experiment's uncertainty.

Guided/free-fall atom interferometers sharpen this target because one branch is held in the laboratory frame while the other follows a free-fall trajectory. After subtracting controlled laser, magnetic, and preparation phases, the branch comparison should expose a cubic-time phase coefficient:
$$
\Delta\phi_{\mathrm{gf}}(T)
=
\widehat{\beta}_{T^3}T^3
+\Delta\phi_{\mathrm{ctrl}}(T)
+O(T^4)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0077a0ddcb45b39a)
This coefficient must be derived from the same weak-field clock and phase map that produces the finite-height redshift benchmark. A fit to $\widehat{\beta}_{T^3}$ cannot be allowed to use one effective potential record while the redshift, Shapiro-delay, lensing, PPN, or gravitational-wave-speed channels use another.

### Quantum Clock-Interference Benchmark

Matter-wave interferometers separate two evidential levels. A branch phase shift induced by a gravitational potential can be retained as an effective-potential or gravitational Aharonov-Bohm comparison; by itself it is a phase recovery target, not proof that a portable clock record accumulated different derived times along the branches. Neutron COW-style phase experiments therefore belong on the phase-only side unless the internal degree of freedom itself functions as a clock.

The stronger benchmark appears when an internal degree of freedom is prepared as a clock and remains correlated with the path history. Let the two branch histories $\gamma_1$ and $\gamma_2$ export internal clock states $|\tau_1\rangle$ and $|\tau_2\rangle$ at recombination. The clock part of the visibility target is
$$
\mathcal{V}_{\mathrm{clk}}
=
|\langle \tau_1|\tau_2\rangle|,
\qquad
\mathcal{D}_{\mathrm{clk}}
=
\sqrt{1-\mathcal{V}_{\mathrm{clk}}^2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-e7ab7276510aa91d)
The interference loss is then a record-formation question: visibility falls only to the extent that the internal clock states become distinguishable enough to supply which-path information. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this does not promote branch-dependent time to substrate ontology. It says that a Noether braid clock can export branch-dependent clock records, and that the same clock map that recovers $d\tau/dt_{\mathrm{eff}}$ in homogeneous moving-clock and weak-field limits must also predict the internal-state overlap for neutron, atom, or optical-ion clock interferometers.

### Combined Dilation

In a region with potential $\Phi_N(\mathbf X,T)$ and clock group velocity $\mathbf{w}$ relative to the Noether sea, we conjecture the observer-chart comparison
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
= \frac{\omega(\mathbf{w},\Phi_N,n)}{\omega_0}
\approx \sqrt{1 + \frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}\|^2}{c_0^2}}
$$

[View →](../../../../equation-mapping.html#weak-field-clock-redshift)

in the weak-field, low-velocity observer limit, with higher-order corrections ($\|\mathbf{w}\|^4/c_0^4$, $\Phi_N^2/c_0^4$, cross-terms) determined by the detailed Noether braid response. Primitive simulations may still use $c_f$ inside the root equation; the PPN comparison uses the dressed asymptotic speed $c_0$.

Outside that limit, the native clock map $F$ will in general deviate from the GR expression and define the theory's distinctive strong-field / high-velocity predictions.

### Effective Energy-Momentum Closure Test

In the same weak-field regime where the clock law is expected to be Lorentz-like, the center-of-mass kinematics should satisfy the effective mass-shell closure
$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4
$$

[View →](../../../../equation-mapping.html#corpus-equation-3dd81c9a2a2616ed)
with $d\tau/dt_{\mathrm{eff}}=\gamma_\star^{-1}$ and
$$
E_{\text{CM}}=\gamma_\star M_0c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_\star M_0v.
$$

[View →](../../../../equation-mapping.html#corpus-equation-59b67c6eb65aa89c)
Here $\gamma_\star$ is the kinematic Lorentz-response factor for the declared speed channel. It is distinct from the scalar PPN spatial-compliance parameter $\gamma_{\mathrm{PPN}}$ and from the index-bearing spatial metric family $\gamma_{ij}^{\mathrm{eff}}$ and $(\gamma_{\mathrm{eff}}^{-1})^{ij}$. This is a cross-check on the emergent clock model, not an independent axiom at the architrino substrate level. For definitions and interpretation, see [Effective Energy-Momentum Closure](../dynamics/energy.md#effective-energy-momentum-closure).

### Strong-Field / Horizon Alignment Note

For strong-field interpretation, use the canonical event-horizon alignment condition from [singularity-resolution](./singularity-resolution.md#canonical-strong-field-alignment-condition). In this chapter, Planck-scale references inherit that same alignment definition.

---

## Clock Model and Equations of Motion

To close the derivation gap, fix an explicit clock model and an explicit observable-extraction map.

### Concrete A1 Clock State

Use one A1 record with six constituent architrinos grouped into three persistently indexed neutral binaries:
$$
\mathcal{A}=\{1_+,1_-,2_+,2_-,3_+,3_-\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-66f56bea6f5bfbce)
with intrinsic polarities $q_a=\pm\epsilon$, $\epsilon=|e|/6$, and trajectories $\mathbf X_a(T)$. No per-constituent inertial mass is assigned at the substrate level.

Define pair-separation vectors
$$
\mathbf r_a=\mathbf X_{a+}-\mathbf X_{a-},
\qquad
a\in\{1,2,3\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3c71c57e2ff4abc4)
with radii $R_a=\|\mathbf r_a\|$. The three radii are independently assignable and do not order or relabel the binaries.

For this state to carry the A1 label, its three binary axes must also be mutually orthogonal at the Family-A near-rest endpoint and converge toward the group-translation direction along the prescribed flattening coordinate $\lambda_A$. The frequencies $f_a$ remain independently assignable, and the axial half-separations $h_a$, transverse orbit radii $\rho_a$, phases $\phi_a$, and circulation rows remain explicit binary coordinates. This prescribed chart does not establish that the clock is retained or stable under EOM-solver evolution; failure to preserve the declared coordinate relations on the same evolved record would falsify the A1 clock assignment.

### Microscopic Evolution Equation (Regularized)

For each $a\in\mathcal{A}$ evolve by the acceleration-first substrate law
$$
\frac{d^2\mathbf X_a}{dT^2}(T)=
\sum_{b\in\mathcal{A}}
\kappa\,\sigma_{ab}\lvert q_aq_b\rvert
\int_{T-h}^{T}\!dT_0\;
\frac{\hat{\mathbf{r}}_{ab}(T;T_0)}
{r_{ab}^2(T;T_0)+\epsilon_c^2}\,
\delta_\eta\!\big(r_{ab}(T;T_0)-c_f(T-T_0)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bb684255f9d3e34a)
$$
r_{ab}(T;T_0)=\|\mathbf X_a(T)-\mathbf X_b(T_0)\|,
\qquad
\hat{\mathbf{r}}_{ab}=\frac{\mathbf X_a(T)-\mathbf X_b(T_0)}{r_{ab}(T;T_0)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-285ff9ef24594b59)
This is the dual-mollified finite-memory certification form used in the dynamical chapters. The memory depth $h<\infty$ bounds the retained causal history, $\eta>0$ thickens the causal wake surface, and $\epsilon_c>0$ caps the near-collision inverse-square amplitude. Exploratory scans may use a simpler $\delta_\eta$ causal-surface mollifier only when they label the run as a non-certification approximation.

### Clock Observable and Clock Map

Declare $a_{\mathrm{clk}}\in\{1,2,3\}$ as the clock channel on the source record. Let $\mathbf{e}_1,\mathbf{e}_2$ be an orthonormal basis of the mean orbital plane of $\mathbf r_{a_{\mathrm{clk}}}$, and define phase
$$
\theta_{\mathrm{clk}}(T)=\operatorname{atan2}\!\big(\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_2,\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_1\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-092eb918e6e21bff)
On a window $[T_1,T_2]$, define measured frequency
$$
\omega_{\text{clk}}
=
\frac{\theta_{\mathrm{clk}}(T_2)-\theta_{\mathrm{clk}}(T_1)}{T_2-T_1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-250cfa9dfddf7b0e)
For the reference run $(v=0,\Phi_N=0)$, set $\omega_0=\omega_{\text{clk}}^{\text{ref}}$ and define
$$
\frac{d\tau}{dT}\equiv\frac{\omega_{\text{clk}}}{\omega_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7500f56ae93f3cd2)

This native observable is the benchmark preserved by the clock projector in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). For a branch record $\mathcal{B}_{\mathbf X j}^{(T_0)}$, the clock-facing projection keeps only the entries that can change the extracted phase or cadence:

$$
\Pi_{\mathrm{clock}}
\mathcal{B}_{\mathbf X j}^{(T_0)}
=
\left(
\delta\theta_{\mathrm{clk}}^{(j)},\,
\delta\omega_{\mathrm{clk}}^{(j)},\,
\delta\chi_{\mathrm{sea}}^{(\ell,j)},\,
J_{\mathbf X j},\,
\Lambda_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5d78f2fb3808563e)

Thus a boundary contribution may affect clock coupling only by changing the same phase increment, measured frequency, Noether sea delay factor, or phase-retained wake ledger used to compute $\omega_{\text{clk}}/\omega_0$. A separate clock fit that bypasses this projection would split the clock benchmark from the assembly/Noether sea interface diagnostic.

### Controlled Perturbation Family

Run the same A1 clock record under controlled backgrounds:

1. Uniform group speed (center-of-mass convention) $v=\|\mathbf{V}_{\text{CM}}\|$ through homogeneous medium.
2. Weak static potential background $\Phi_N(\mathbf X,T)$ (or $U\equiv-\Phi_N>0$).
3. Weak-field regime constraints: $v^2/c_\star^2\ll1$ and $\lvert U\rvert/c_0^2\ll1$.

Use $c_\star=c_f$ for primitive kernel-only scans and $c_\star=c_0$ for observer-level PPN coefficient fits. This keeps the root-solver speed and the clock-comparison speed explicit instead of silently identifying them.

For each run $j$, record
$$
\left(U_j,\;v_j,\;\omega_j\right),
\qquad
y_j\equiv\frac{\omega_j}{\omega_0}-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-2aed201a42c69ba7)

---

## Derivation Interface and Coefficient Map

This chapter keeps only the symbolic/numeric coefficient interface needed to bridge clock microdynamics to PPN observables.

### Perturbative Expansion (Weak-field, Low-velocity)

For the coefficient map in this section, observer-level PPN fits use the low-gradient comparison speed $c_\star=c_0$; primitive kernel-only scans must state separately when they keep $c_\star=c_f$.

Linearize each trajectory as $\mathbf X_a(T)=\mathbf X_a^{(0)}(T)+\delta\mathbf X_a(T)$ around the periodic rest solution — conditional on a certified rest attractor supplying $\mathbf X_a^{(0)}$, which the retention disclaimer above records as not yet established — and expand the extracted clock ratio in
$$
\epsilon_U\equiv U/c_0^2,\qquad \epsilon_v\equiv v^2/c_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-64e8f8cdf1803ebd)

Use the regression model
$$
\frac{\omega}{\omega_0}
=
1-A_U\,\epsilon_U-A_v\,\epsilon_v
+C_2\,\epsilon_U^2
+C_{Uv}\,\epsilon_U\epsilon_v
+C_{v4}\,\epsilon_v^2
+\mathcal{O}(\epsilon^3)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9e575c0858eaedcc)

Coefficient extraction from simulation ensemble $\{(U_j,v_j,\omega_j)\}_{j=1}^N$:
$$
\mathbf{y}=X\mathbf{c}+\boldsymbol{\varepsilon},
\qquad
\hat{\mathbf{c}}=(X^\top W X)^{-1}X^\top W\mathbf{y}
$$

[View →](../../../../equation-mapping.html#corpus-equation-df4fc40d2b5e56da)
with
$$
\mathbf{c}=(A_U,A_v,C_2,C_{Uv},C_{v4})^\top,\quad
y_j=\frac{\omega_j}{\omega_0}-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-842b7dee0db9824d)
and design row
$$
X_j=\left(-\epsilon_{U,j},\,-\epsilon_{v,j},\,\epsilon_{U,j}^2,\,
\epsilon_{U,j}\epsilon_{v,j},\,\epsilon_{v,j}^2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ac985c25be680fa)

Estimated covariance:
$$
\mathrm{Cov}(\hat{\mathbf{c}})
=
\hat{s}^2(X^\top W X)^{-1},
\qquad
\hat{s}^2=\frac{\sum_j w_j(y_j-(X\hat{\mathbf{c}})_j)^2}{N-5}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7660f1b886d88052)

### Coefficient Targets and PPN Map

In the GR-matching weak-field observer limit, first-order targets are
$$
A_U^\star=1,\qquad A_v^\star=\frac{1}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-786fdada6864394d)

For the static branch ($v=0$),
$$
\frac{\omega}{\omega_0}=1-\frac{U}{c_0^2}+C_2\frac{U^2}{c_0^4}+\cdots
$$

[View →](../../../../equation-mapping.html#corpus-equation-c4d40d220acd8735)
and the PPN map used in [PPN Parameters](./ppn-parameters.md) is
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e5bfad1ca3c32ec2)
So the GR target $\beta_{\mathrm{PPN}}=1$ implies
$$
C_2^\star=\frac{1}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3b615016e360844f)

The mixed coefficient $C_{Uv}$ is treated as a leakage diagnostic at this order.

Execution protocols, benchmark catalogs, and numeric pass/fail thresholds are routed through:

1. [Validation Protocols](../validation/validation-protocols.md)
2. [Simulation Run Protocols](../validation/simulations/run-protocols.md)
3. [Constraint Ledger](../validation/constraint-ledger.md)
4. [Closure Scorecard](../validation/closure-scorecard.md)

---

## Failure Conditions and Red Flags

This program fails, and the emergent-metric project is likely untenable, if any of the following hold:

1. **Incorrect velocity dependence:**
 - If $P_q(\mathbf w)$ cannot be made to fit $\propto \gamma_\star(\mathbf w)$ without fine-tuning internal clock geometry or Noether sea parameters.

2. **Wrong sign or magnitude of gravitational dilation:**
 - Clocks deeper in a potential must tick slower. Any prediction of faster ticks, or gross magnitude mismatch, is fatal.

3. **Directional anisotropy:**
 - If $P_q(\mathbf w)$ depends measurably on direction in the absolute frame, violating isotropy bounds ($<10^{-16}$ sidereal modulation), the theory contradicts precision Lorentz tests.

4. **Clock-dependence:**
 - If different reasonable clock designs (different internal assemblies) yield different $d\tau/dt_{\mathrm{eff}}$ at the same $(v,\Phi_N)$ beyond experimental bounds, the emergent Equivalence Principle fails.

5. **Parameter bloat:**
 - If matching these effects requires introducing many independent medium parameters ($n$ profiles, ad hoc transport coefficients), the theory's naturalness score collapses; see [Parameter Ledger](../validation/parameter-ledger.md).

---

**Chapter target:** A concrete definition of **how** to compute $\omega(\mathbf{w},\Phi_{\text{eff}},n)$ for a Noether braid clock, and a clear native expression for $d\tau/dT$ plus its observer-chart projection $d\tau/dt_{\mathrm{eff}}$ in terms of those quantities.

### Closure Program Interface (clock-to-PPN bridge)

This chapter supplies the fitted coefficient bridge between microscopic clock dynamics and PPN observables.

The clock-to-PPN closure checklist is:

1. Define a reference clock assembly and extraction window for $\omega_0$.
2. Run controlled perturbations over $(U_j,v_j)$ in the weak-field, low-velocity regime.
3. Fit $(A_U,A_v,C_2,C_{Uv},C_{v4})$ from the extracted clock ratios.
4. Forward $\hat\beta_{\mathrm{PPN}}$ and the leakage coefficient $\hat C_{Uv}$ to [PPN Parameters](./ppn-parameters.md).
5. Record pass/fail status in [Closure Scorecard](../validation/closure-scorecard.md) against [Constraint Ledger](../validation/constraint-ledger.md) bounds.

Given extracted coefficients
$$
\hat{\mathbf{c}}=(\hat A_U,\hat A_v,\hat C_2,\hat C_{Uv},\hat C_{v4})
$$

[View →](../../../../equation-mapping.html#corpus-equation-2d2a4c32308a1285)
map to
$$
\hat\beta_{\mathrm{PPN}}=\frac{1+2\hat C_2}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5bed2daa770c2ee9)
and forward to the PPN decision vector in [spacetime/ppn-parameters.md](./ppn-parameters.md).

A compact closure statistic is:
$$
\chi^2_{\mathrm{closure}}=
(\hat{\mathbf{q}}-\mathbf{q}_\star)^\top
\Sigma_q^{-1}
(\hat{\mathbf{q}}-\mathbf{q}_\star)
$$

[View →](../../../../equation-mapping.html#corpus-equation-991c2897e6ee8ef6)
with
$$
\hat{\mathbf{q}}=(\hat A_U,\hat A_v,\hat\beta_{\mathrm{PPN}},\hat C_{Uv}),\qquad
\mathbf{q}_\star=(1,\tfrac12,1,0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea9b593a97e8f0b1)
Low $\chi^2_{\mathrm{closure}}$ with no preferred-direction leakage is the acceptance condition for the clock-law sector.
