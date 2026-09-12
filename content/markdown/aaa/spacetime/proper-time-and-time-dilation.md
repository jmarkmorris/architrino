# Proper Time and Time Dilation

This chapter explains how clock time is recovered from assembly dynamics. Absolute time $T$ is the substrate evolution parameter used by the $\mathbb{U}_{\text{now}}$ universe-state perspective in the Euclidean void. Derived clock time $\tau$ is the readout of physical clocks built from Noether braid assemblies. The theorem target is to derive the map between them and show how GR-like time dilation and gravitational redshift arise as effective behavior when the clock map closes.

This chapter keeps `proper time` as the standard relativity bridge term for clock time along a timelike record. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the native claim is more specific: $\tau$ is a derived clock readout, not a second substrate time and not a more fundamental or exemplary time. The word `proper` should therefore be read only in the inherited physics sense of belonging to the physical clock record.

An [architrino](../foundations/architrino.md) is a point transceiver whose past motion supplies expanding causal wakes; their arrivals determine its acceleration. A [Noether braid](../noether-braid/noether-braid.md) is a neutral assembly candidate built from coupled architrinos, and the [Noether sea](noether-sea.md) is the ambient population of such assemblies. They occupy the fixed [Euclidean void](../foundations/euclidean-void.md) and evolve in [absolute time](../foundations/absolute-time.md). A retained, countable clock cycle and its identification with an atomic clock remain dynamical and observer-level recovery obligations.

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

Take $\varphi_{\mathcal A}$ to be a continuous phase with full turns retained, and $\Omega_{\mathcal A}=d\varphi_{\mathcal A}/dT$ and $\Omega_{\mathcal A}^{(0)}>0$ to be angular frequencies measured against $T$. Along a clock history, let $J_{\mathcal A}=dt_{\mathrm{eff}}/dT>0$ be the total derivative of its declared observer-chart time. The exact chain rule is $d\tau_{\mathcal A}/dt_{\mathrm{eff}}=(\Omega_{\mathcal A}/\Omega_{\mathcal A}^{(0)})/J_{\mathcal A}$. Effective relative velocity is $\mathbf w_{\mathrm{eff}}=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}-\mathbf u_{\mathrm{sea,eff}}$; it is not obtained by relabeling the native $\mathbf w$. Reference normalization sets $J_0=1$ at the reference record only. Equating native and observer rate ratios elsewhere requires the additional condition $J_{\mathcal A}=1$ along those records and a declared ruler/speed conversion.

The phase-count definition and chain rule are derived identities on an admitted clock record. The constitutive clock law and Lorentz/GR recovery are hypotheses until that record and its observer map are supplied. A phase that cannot be unwrapped, a zero reference frequency, or a nonmonotone observer time invalidates the stated clock construction; a well-defined clock can still fail the physical recovery tests below.

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

Here $F_{\mathcal A}=d\tau_{\mathcal A}/dT$ is the same clock map used above, applied to identically calibrated clock designs along both histories. Oppositely directed circumnavigation paths provide the benchmark exemplified by [Hafele and Keating’s observed time gains](https://doi.org/10.1126/science.177.4044.168), while fiber-linked stationary clocks can supply the endpoint reference without turning photon transport into the carried matter clock. This is distinct from the photon-loop Sagnac comparison: one integrates a material clock cadence and the other integrates signal propagation. Use the same terrestrial flow model from [PPN Parameters](ppn-parameters.md#terrestrial-working-drift-profiles) along both paths. CMB-comoving and locally entrained profiles are distinguishable only when their projected annual, sidereal, east-west, or altitude signatures differ beyond the common uncertainty budget.

The target is to reproduce, in the appropriate regime,
$$
\frac{d\tau}{dt_{\mathrm{eff}}} \approx \sqrt{1+\frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}_{\mathrm{eff}}\|^2}{c_0^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc8677a60808f0b3)

Here $\Phi_N<0$ is the Newtonian comparison potential in a deeper potential region, $c_0$ is the calibrated weak-field observer speed, and both $|\Phi_N|/c_0^2$ and $\|\mathbf w_{\mathrm{eff}}\|^2/c_0^2$ are small. This expression fixes the leading weak-field terms; its square root does not determine second-order coefficients. Strong-field and high-velocity recovery requires a separate derivation.

Notation convention used in this chapter: $n(\mathbf X,T)\equiv \rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is the canonical medium-density variable. The Noether sea delay factor is $\chi_{\text{sea}}(\mathbf X,T)\equiv c_f/c_{\text{eff}}(\mathbf X,T)$; use it for refractive-delay language so $n$ remains reserved for density. The clock-law derivation imports the [transverse causal budget lemma](../noether-braid/braid-mathematics.md#transverse-causal-budget-lemma): primitive branch tests may use $c_f$, but observer-level clock comparison uses the declared dressed speed $c_\star$, usually $c_\star=c_{\text{eff}}(\mathbf X,T)$ in a local Noether sea cell.

---

## Conceptual Setup

### Absolute Time vs Derived Clock Time

- **Absolute time $T$**
  - Fundamental evolution parameter for the complete architrino dynamics.
  - Global, universal, non-dynamical; used by the $\mathbb{U}_{\text{now}}$ universe-state perspective (simulation clock).
  - All worldlines are parametrized directly by $T$.

- **Derived clock time $\tau$** (standard bridge term: proper time)
  - Time read by a **physical clock**. A countable braid or binary cycle is a microscopic candidate; reproducing atomic transition clocks requires a separate assembly and spectral mapping.
  - Encodes how many internal oscillation cycles occur per unit $dT$ before projection into an observer chart.
  - The word `proper` does not mean substrate-level, privileged, or exemplary; it names the inherited relativity comparison target for a clock-carried record.

The fundamental claim is:

> Time dilation is not a change in the rate of $T$; it is a change in how fast internal dynamics of assemblies proceed **relative to** $T$, and then how that clock readout projects into $t_{\mathrm{eff}}$, due to motion and medium coupling.

### Clocks as Dynamical Systems

A clock is any assembly with a **stable, countable internal cycle**. The native picture is not time itself slowing; the countable assembly cycle is what changes cadence:

- Minimal model: a Noether braid with one declared clock-channel index $a_{\mathrm{clk}}\in\{1,2,3\}$ whose cycle is counted. The clock-channel role is extracted from the record and is not assigned by radius order.
- Base frequency $\omega_0$ (or period $P_0 = 2\pi/\omega_0$) is defined for:
  - Clock **at rest relative to the reference sea**, $\mathbf w=\mathbf0$, with its orientation, geometry, and history fixed; absolute rest agrees with this condition only when $\mathbf u_{\mathrm{sea}}=\mathbf0$.
  - In a region of homogeneous Noether sea density $n=1$ and negligible external gradients.

Derived clock time is then defined operationally as:
$$
d\tau = \frac{\omega(\text{state})}{\omega_0}\, dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-71107e7a9b84157d)

where $\omega(\text{state})$ is the instantaneous internal oscillation frequency in the actual kinematic and environmental state.

The central problem is to compute $\omega(\mathbf{w},n,\chi_{\text{sea}},\Phi_{\text{eff}})$ from the master dynamics rather than assigning the clock-rate factor by analogy with relativity.

### Moving-Branch Clock Retuning Target

The homogeneous moving-clock extraction is a separate obligation from weak-field parameterized post-Newtonian (PPN) matching, which compares coefficients of the effective weak-gravity metric. Primitive branch calculations solve causal roots with $c_f$; $T_r$ is reception time at receiver $o$, and $T_t<T_r$ is emission time at transmitter $j$:
$$
\left\|\mathbf X_{o}(T_r)-\mathbf X_{j}(T_t)\right\|
=
c_f(T_r-T_t)
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

Here $\mathbf{w}$ is the native clock assembly group velocity through the local Noether sea and $0\le\beta_\star<1$. The channel speed in this native ratio must be expressed in the same length and absolute-time units. At observer export, use the effective velocity and channel speed in that chart; equality with the native ratio is an additional recovery condition.

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

After export, the same budget must be expressed in the effective chart. An admitted clock branch must extract
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star(\mathbf{w}_{\mathrm{eff}})}
$$

[View →](../../../../equation-mapping.html#lorentz-clock-rate)

from its internal phase dynamics and observer projection. Finite wake speed alone does not pin any constituent’s speed or establish that its internal motion is transverse. The [speed-budget premise and consequence](../noether-braid/braid-mathematics.md#transverse-internal-motion-speed-budget-premise-and-consequence) state those additional hypotheses.

For an admitted moving Noether braid branch $q$ on a group-speed band $0\le \|\mathbf{w}\|/c_f\le\beta_{\max}<1$ that also satisfies $\|\mathbf w\|<c_\star$, choose one clock phase $\theta_{\mathrm{clk},q}$ from the same causal-root ledger used for the branch's geometry. The extracted period is
$$
P_q(\mathbf{w})
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
P_0=P_q(\mathbf{0})
$$

[View →](../../../../equation-mapping.html#corpus-equation-7d21870566bab09b)

Here the dot means $d/dT$, the cycle average retains full phase turns, and both periods are measured in absolute time. The observer period is instead $P_{q,\mathrm{eff}}=\int_{\text{one cycle}}J_q\,dT$. Comparing the native period ratio directly to the observer Lorentz factor requires $J_q=J_0=1$ and the same speed conversion; otherwise use the exported periods. With this restriction, define the native period residual
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

uniformly on the declared band, where $C_T$ is a fixed branch-uniform bound and $\epsilon_{\mathrm{LV}}$ is the declared dimensionless leakage budget. A surviving preferred-frame sideband is an observer-channel deviation only after the same export and calibration. This comparison fails if the clock phase and ruler geometry come from different branch ledgers, if the residual is suppressed only by fitting a PPN coefficient after the fact, or if $c_f$ is silently identified with $c_\star$ without a dressing map.

This moving-clock row is one leg of the structural-integrity common-limit closure in [Lorentz Kinematics](./lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). It is not enough for the clock branch to approximate $\gamma_\star^{-1}$ in isolation. The same causal-root ledger must also produce the moving ruler deformation, photon synchronization row, and weak-field gravity-channel speed row used by Lorentz closure; otherwise the clock result is a branch-split fit rather than clock-map closure.

### Noether Sea Braid Cadence

For redshift and cosmology work, the local Noether sea braid cadence is a candidate reference before a separate detector clock is introduced. Cadences in this section are native $T$-rates. Their direct Lorentz and static-redshift targets below refer to the comparison subclass with $J=1$ on the compared histories; for a general observer chart the rate to compare is $C_N/J$. Let $\Omega_N(\mathbf X,T)>0$ be a representative angular cadence extracted by a declared population average from the local Noether sea braid population, with $P_N(\mathbf X,T)=2\pi/\Omega_N(\mathbf X,T)$. Relative to the positive weak homogeneous reference cadence, define

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
\sqrt{-g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu}
$$

[View →](../../../../equation-mapping.html#corpus-equation-88c5350d2fa2aad3)

Here $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the other $x_{\mathrm{eff}}^i$ are effective ruler coordinates, and the metric has signature $(-,+,+,+)$. The curve must be future-directed and timelike. Squaring this definition and dividing by $d\tau^2$ gives the normalization identity
$$
g^{\text{eff}}_{\mu\nu}
\frac{dx_{\mathrm{eff}}^\mu}{d\tau}
\frac{dx_{\mathrm{eff}}^\nu}{d\tau}
=
-c_0^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d7d800b6f44e95b)

This equation is not a claim that the Euclidean void is a four-dimensional curved substrate. It is an observer-level clock-functional benchmark: an ideal clock accumulates the interval along its actual path, including an accelerated path. Stationarity of that interval under fixed-endpoint path variations is the separate freely falling geodesic benchmark; it is not a condition on an arbitrarily transported clock. If a branch recovers endpoint redshift but fails the integrated clock functional along accelerated or orbital records, the clock map has not closed.

### Gamma-N Geometry Extraction Target

The equations above define the endpoint benchmark, but they do not yet derive the Noether sea cadence factor from Noether braid geometry. A first-order extraction scaffold starts from normalized Noether braid density $n$, Noether sea delay factor $\chi_{\text{sea}}$, envelope scale $\lambda$, envelope shape ratio $\xi$, and a representative Noether braid scale $R_{\text{braid}}$. Normalize $n$, $\lambda$, and $\xi$ to one in the reference cell and $R_{\mathrm{braid}}$ to $R_{\mathrm{braid},0}>0$. The reference delay $\chi_{\mathrm{sea},0}=c_f/c_{\mathrm{eff}}(W_0)>0$ need not equal one. All logarithm arguments must be positive. Around that reference, collect the logarithmic deformation record

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}},\,
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

at linear order only if the other moving deformations and $\mathcal R_\Gamma$ have no contribution proportional to $-\ln\xi$. A finite unspecified leakage term does not identify $b_\xi$; the leakage and remainder must be controlled relative to that deformation as it tends to zero. Under those hypotheses the first-order row is

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

where $\Omega_{\mathrm{clk}}>0$ is a dimensionless rate factor normalized to one in the reference cell, distinct from an angular frequency. The cadence-stretch factor is

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
+\omega_\chi\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}}
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

or, locally on a differentiable constitutive branch with spatially constant coefficient row and a controlled derivative of the remainder,

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
\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}}=a_\chi\frac{U}{c_0^2},\qquad
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

This reduces the proof burden. The restricted Lorentz matching fixes $b_\xi$ under the remainder assumptions above, while static weak-field redshift fixes one isotropic coefficient combination. Individual values of $b_n$, $b_\chi$, $b_\lambda$, and $b_R$, or equivalently of the $\omega$ row, require a constitutive calculation or simulation that extracts how a mass source changes $n$, $\chi_{\text{sea}}$, $\lambda$, and $R_{\text{braid}}$ in the same Noether sea cell.

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

and, choosing a minimal representative with vanishing unused coefficients and $A_\chi\ne0$, the cadence-stretch row is

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

Writing the four-component isotropic coefficient and response vectors as $\mathbf b=(b_n,b_\chi,b_\lambda,b_R)^T$, $\boldsymbol\omega=(\omega_n,\omega_\chi,\omega_\lambda,\omega_R)^T$, and $\mathbf a=(a_n,a_\chi,a_\lambda,a_R)^T$ gives

$$
\mathbf b\cdot\mathbf a=1,\qquad
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
\approx
-\Delta\ln\Gamma_N
=
S_G\frac{gL}{c_0^2}
+O(L^2)
+O\!\left(\frac{U^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-aa0b5a06479ac2d6)

Thus finite-height redshift fixes $S_G=1$ to the experimental tolerance. It does not distinguish the minimal row $\mathbf{c}=\mathbf{0}$ from a compensated row with $\mathbf{c}\cdot\mathbf{u}^{G}\ne0$ and adjusted $b_\chi$, provided the same coefficients are used across the sample.

Hydrogen spectral conversion adds a record-difference test rather than another endpoint normalization. For two admissible hydrogen records $\ell$ and $\ell'$ whose line-inferred cadence stretch agrees after the envelope-gap residual is removed, and whose remaining $\mathcal R_\Gamma$ corrections agree within the stated error budget, the same spectral row must satisfy

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

The minimal shared-delay row passes only if the record difference has no uncompensated $\chi_{\text{sea}}$ component after the fixed $-\ln\xi$ term is included. The [Hydrogen spectral coefficient toy scan](../validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md) describes this discriminant within a constructed scaffold: its clean shared-delay case and density/scale-compensated case test their respective assumed inputs. Their agreement is evidence about those algebraic inputs, not an independent hydrogen or gravitational constitutive result. A universal shared row remains a conjectured consistency requirement.

Pressure-response data supply an additional shared-coefficient consistency condition at retained linear order, with higher-order remainders controlled. Independence requires a pressure record derived or measured separately from the fitted clock row; replaying a constructed scaffold does not supply it. For a nonzero pressure-induced cadence change, let

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

As an illustrative assumed pressure vector, take $\mathbf{a}^{P\to\Gamma}=(0,0.6,0,0)^T$ while the GR-matching shared-delay endpoint has $A_\chi=2$. The minimal endpoint row fixes $b_\chi=1/2$, so the pressure equation gives $0.6b_\chi=0.3$, not one. This is an algebraic incompatibility of the specified toy inputs, not a measured Fe/Cr response or a physical falsification. A broader compensated row remains conditional: it requires branch-derived non-$\chi_{\text{sea}}$ pressure response in $n$, $\lambda$, or $R_{\text{braid}}$, and it must still preserve $S_G=1$ for finite-height and endpoint redshift.

The conditional coefficient disposition is therefore:

| Coefficient | Status |
| --- | --- |
| $a_n$ | Optional in the weak static endpoint; conditionally required only if a branch-derived density response is needed to keep hydrogen or pressure records on one shared row. |
| $a_\lambda$ | Optional in the weak static endpoint; conditionally required only if the envelope-scale branch supplies the compensating record. |
| $a_R$ | Optional in the weak static endpoint; conditionally required only after a declared $R_{\text{braid}}$ readout ties the pressure or spectral record to the same row. |

These constraints alone do not favor zero or nonzero values of $a_n$, $a_\lambda$, or $a_R$. A physical assignment requires branch-derived compensated response rather than adjustable redshift coefficients.

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
\ln\frac{\chi_{\text{sea},\mathrm H}^{(\ell)}}{\chi_{\mathrm{sea},0}},\,
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

The row $\mathbf{b}_{N}^{\mathrm{spec}}$ is not a per-line fit. It is the spectral-channel instance of the same clock-row program above, with $b_\xi=1$ inherited only under the homogeneous Lorentz branch's remainder assumptions and the weak-field scalar combination constrained by gravitational redshift. The residual $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ carries higher-order branch effects such as recoil, hyperfine structure, medium anisotropy, or unresolved source-branch corrections; it must not absorb the basic distinction between $n$, $\chi_{\text{sea}}$, and clock cadence.

For a downward hydrogen transition $a\to b$ with positive envelope gap, the candidate effective spectral conversion is

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

Here $E_{\mathrm{env}}(a)-E_{\mathrm{env}}(b)$ is a candidate assembly-level envelope-energy gap and $h$ is Planck’s constant in observer energy-frequency bookkeeping; neither is an architrino-level premise. The frequency is referred to the declared clock calibration, with propagation and detector conversion separately controlled. A line with an independently bounded event residual gives a line-inferred cadence stretch,

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\left(\nu_{a\to b}^{\mathrm{obs},(\ell)}-\nu_{a\to b}^{\mathrm{res},(\ell)}\right)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-76adf5d3fbc29f32)

The corrected frequency in this denominator must be positive. Its residual uncertainty propagates into $\widehat\Gamma$; setting the residual to zero is a separate toy assumption. Let $\mathcal L_{\mathrm H}^{0}$ be the declared line set, $\varepsilon_\Gamma>0$ a fixed normalization floor, and $\Delta_\Gamma^{\mathrm{tol}}>0$ the chosen tolerance. The first consistency condition is that one $\Gamma_{N,\mathrm H}^{(\ell)}$ from the local Noether sea response controls that set:

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

The first executable scaffold keeps the clock proof burden visible. Its selected toy spectral row is inherited from the density/scale-compensated static-response packet, not fitted from hydrogen lines alone. Its hydrogen records also keep $n$, $\chi_{\text{sea}}$, $\lambda$, $\xi$, and $R_{\text{braid}}$ as separate entries in $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, so a row that matches one line or one record can still fail when the component split changes under admissible refinement. The executable derives the scaffold line factors, observer frequencies, and replay envelope gaps from recovered principal labels plus one shared line-inferred $\ln\Gamma_N$. A completed theory-bearing record must therefore supply the same four inputs together from one declared hydrogen spectral channel ledger and the same Noether sea cell: the hydrogen $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record, envelope gaps, observer frequencies, and static response vector.

---

## Mechanisms for Time Dilation

Two candidate mechanisms describe how motion and medium response can change a clock cadence; neither supplies an evolved clock solution by itself. The prescribed [coincident-axis three-binary braid](../noether-braid/3d-braid-assemblies.md#coincident-axis-three-binary-coordinate-chart) candidate — one common midpoint, one coincident binary axis, one common frequency, and one common circulation sense, with independent per-binary radii, axial half-separations, transverse orbit radii, and phases — supplies mechanism intuition for a highly coordinated clock. The proposed clock record below uses a prescribed coincident-midpoint orthogonal-axis braid chart so orientation and per-binary frequency dependence remain separately testable. The two charts are alternative clock candidates.

### Kinematic Effect (Velocity Dependence)

When the clock has group velocity (center-of-mass convention) $\mathbf{V}_{\text{cm}}$ relative to a local Noether sea drift $\mathbf{u}_{\text{sea}}$, its material group velocity is $\mathbf{w}=\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}}$:

1. **Changed path geometry:** Translation changes the internal paths in absolute timespace and the delayed emission-to-reception geometry. Longer paths imply a longer period only under additional control of site speed and internal geometry; the Master Equation supplies no fixed constituent-speed postulate.

2. **Finite causal speed:** Primitive self-hit and partner-hit roots are mediated by delayed, radial path-history interactions at speed $c_f$. When those roots are dressed into an observer-level clock law, the transverse budget must be formed with the declared channel speed $c_\star$: $c_\star=c_f$ for a primitive branch test and $c_\star=c_{\text{eff}}(\mathbf X,T)$ for a Noether sea dressed clock comparison.

3. **Shape deformation (Lorentz-link hypothesis):** Under the orthogonal-axis three-binary Lorentz-link hypothesis, increased $\|\mathbf{w}\|$ makes the complete braid's **oblate spheroidal exclusion envelope** flatten along the direction of motion:
 - At low $\|\mathbf{w}\|$, the oblate spheroidal exclusion envelope is nearly spherical.
 - As $\|\mathbf{w}\|\to c_\star$, that envelope contracts along $\hat{\mathbf{w}}$ while maintaining transverse dimensions, yielding semiaxes $(R_{\perp}, R_{\perp}, R_{\parallel})$ and $R_{\parallel} < R_{\perp}$.
 - The resulting frequency change must be extracted from the same delayed dynamics; envelope flattening alone does not prove a lower $\omega$.

Geometry terminology follows [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#canonical-geometry-variables): the envelope shape ratio is $\xi=R_{\parallel}/R_{\perp}$. The derived clock-time factor is not defined to be $\xi$; it is the extracted native clock ratio $\omega_{\text{clk}}/\omega_0=d\tau/dT$, followed by division by $J$ for observer export. The homogeneous target $\omega_{\text{clk}}/\omega_0\to\xi\to1/\gamma_\star$ applies directly to the observer rate only in the $J=1$ comparison subclass.

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

This implication is restricted to a clock that does not significantly disturb the local Noether sea and a chart conversion with $J=1$ that preserves the indicated speed ratio. Otherwise it requires the explicit observer conversion. For SI comparison in the weak homogeneous limit, the observer branch uses the measured low-gradient clock/signal speed $c_0=c_{\text{eff}}(\infty)$; converting the native budget to that speed remains part of the recovery obligation.

### Muon Lifetime Benchmark

Cosmic-ray muons supply an observer-level benchmark for the moving-clock comparison. In the standard account, muons formed high in the atmosphere have a rest-frame mean lifetime near $2.2\,\mu\mathrm{s}$ and travel at a large fraction of $c_0$. Without time dilation, their mean travel distance at nearly $c_0$ would be less than a kilometer. High-altitude and sea-level counts in [Frisch and Smith’s Mount Washington comparison](https://doi.org/10.1119/1.1969508) tested the resulting survival difference. These are external measurement benchmarks, not a derived muon assembly or lifetime in this theory.

In the weak homogeneous observer branch, let $N_{\mathrm{high}}$ and $N_{\mathrm{low}}$ be the counted rates at the high and low detectors, $\Delta h$ their height separation, $\tau_{\mu,0}$ the rest-lifetime comparison value, and $v_{\mu,\mathrm{eff}}>0$ the downward muon speed relative to the detectors in their effective chart. For an ideal vertical monoenergetic beam at constant speed, with matched detector acceptance and negligible energy loss or scattering, the observer-level survival target is
$$
N_{\mathrm{low}}
\approx
N_{\mathrm{high}}
\exp\!\left[
-
\frac{\Delta h/v_{\mu,\mathrm{eff}}}
{\gamma_\mu \tau_{\mu,0}}
\right],
\qquad
\gamma_\mu
=
\frac{1}{\sqrt{1-v_{\mu,\mathrm{eff}}^2/c_0^2}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c56da42f9f4c60a1)

For a real flux comparison, integrate survival over the measured energy and angular distributions and account for detector efficiency and energy loss. The ideal constant-speed event also has an effective rest-chart description using the contracted atmospheric path. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the target is to recover both descriptions from one moving-assembly response. The native burden is to derive the same $\gamma_\mu$ from the assembly and Noether sea record that also supports clocks, rulers, photon synchronization, and bounded preferred-frame leakage.

### Gravitational Effect (Medium Dependence)

A proposed constitutive response to massive assemblies changes the surrounding Noether sea and clock cadence. The signs and sizes of density, delay, and geometric responses must be extracted; the endpoint coefficient constraint alone does not determine them:

1. **Local Noether density $n(\mathbf X,T)$ (equivalently $\rho_{\text{NS}}$):** A higher density can alter the coupled assembly response, but it does not by definition increase the **Noether sea delay factor** $\chi_{\text{sea}}$. Their relation is constitutive.

2. **Effective field speed reduction $c_{\text{eff}}(\mathbf X,T) < c_f$:**
 - The effective signal or phase response can be slower in this candidate medium branch. Primitive wakes still propagate at $c_f$ in the void and do not scatter as independent substances.
 - The clock response changes through the histories of interacting architrinos, rather than by replacing $c_f$ in the primitive causal-root condition.

3. **Tidal distortion of Noether braid geometry:** An anisotropic medium response can change radial and tangential braid geometry differently. Whether the retained branch compresses, expands, or changes frequency must follow from its delayed dynamics; it is not fixed by the potential gradient alone.

**Gravitational hypothesis:** To first order in the Newtonian potential $\Phi_N(\mathbf X,T)$,
$$
\omega(\Phi_N) \approx \omega_0\left(1 + \frac{\Phi_N}{c_0^2}\right)
\quad \Rightarrow \quad
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{\text{grav}} \approx 1 + \frac{\Phi_N}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-24b2b751b10b3a1a)

This implication uses the $J=1$ static comparison subclass. The sign convention makes $\Phi_N < 0$ (deeper potential) yield **slower** clocks ($d\tau/dt_{\mathrm{eff}} < 1$), consistent with the GR benchmark.

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

Thus $L=1\,\mathrm{mm}$ corresponds to $\Delta\nu/\nu\approx1.1\times10^{-19}$, while $L=33\,\mathrm{cm}$ corresponds to $\Delta\nu/\nu\approx3.6\times10^{-17}$. These are rounded weak-field benchmark estimates at the scales probed by [Bothwell et al.’s millimetre-scale sample](https://arxiv.org/abs/2109.12238) and [Chou et al.’s optical-clock comparison](https://doi.org/10.1126/science.1192720), rather than outputs of an extracted Noether sea clock map. The same constitutive response must describe separated clocks and an extended sample whose lower and upper portions accumulate different derived clock phases.

For independent atoms this can be corrected pointwise, as in ordinary redshift compensation. For entangled or collective clock states, however, assigning the entire apparatus the derived clock time at the trap center is only an approximation. The $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target is to derive the measured clock time from collective phase evolution across the sample, with the center-time prescription emerging only when the gradient-induced phase spread is below the experiment's uncertainty.

A specific guided/free-fall comparison holds one branch in the laboratory while the other falls, as in [Dobkowski et al.’s quantum free-fall interferometer](https://arxiv.org/abs/2502.14535v4). Its cubic phase is a protocol-specific benchmark, not a universal property of atom interferometers. Let $t_{\mathrm{eff}}$ here denote elapsed laboratory-chart time from the declared launch event. The following fit separates a cubic coefficient from the retained control-phase model:
$$
\Delta\phi_{\mathrm{gf}}(t_{\mathrm{eff}})
=
\widehat{\beta}_{T^3}t_{\mathrm{eff}}^3
+\Delta\phi_{\mathrm{ctrl}}(t_{\mathrm{eff}})
+O(t_{\mathrm{eff}}^4)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0077a0ddcb45b39a)

The label $\widehat\beta_{T^3}$ identifies the fitted cubic coefficient, with units of inverse time cubed; it does not denote absolute time in this observer fit. A cubic phase alone does not establish a portable internal-clock readout. This coefficient must be derived from the same weak-field clock and phase map that produces the finite-height redshift benchmark, using the same effective potential record as the other comparison channels.

### Quantum Clock-Interference Benchmark

Matter-wave interferometers separate two evidential levels. A branch phase shift induced by a gravitational potential can be retained as an effective-potential or gravitational Aharonov-Bohm comparison; by itself it is a phase recovery target, not proof that a portable clock record accumulated different derived times along the branches. Neutron COW-style phase experiments therefore belong on the phase-only side unless the internal degree of freedom itself functions as a clock.

The stronger benchmark appears when an internal degree of freedom is prepared as a clock and remains correlated with the path history. Let the two branch histories $\gamma_1$ and $\gamma_2$ export internal clock states $|\tau_1\rangle$ and $|\tau_2\rangle$ at recombination. For normalized pure internal states, balanced path amplitudes, and ideal recombination with no other loss of coherence, the clock part of the visibility target is
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

Here $\mathcal D_{\mathrm{clk}}$ is the optimal distinguishability of those two pure states with equal prior weights. Unequal path weights, mixed internal states, or other losses require the corresponding density-matrix and apparatus model; the displayed equality is not a general formula for total visibility. Within the stated ideal comparison, distinguishable internal states reduce the clock contribution to visibility. This remains an observer-level recovery target for the same clock map, without promoting branch-dependent time or quantum states to substrate ontology.

### Combined Dilation

In a region with potential $\Phi_N(\mathbf X,T)$ and clock group velocity $\mathbf{w}$ relative to the Noether sea, we conjecture the observer-chart comparison
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
= \frac{\omega(\mathbf{w},\Phi_N,n)}{\omega_0 J}
\approx \sqrt{1 + \frac{2\Phi_N}{c_0^2} - \frac{\|\mathbf{w}_{\mathrm{eff}}\|^2}{c_0^2}}
$$

[View →](../../../../equation-mapping.html#weak-field-clock-redshift)

in the weak-field, low-velocity observer limit, with higher-order corrections ($\|\mathbf{w}_{\mathrm{eff}}\|^4/c_0^4$, $\Phi_N^2/c_0^4$, cross-terms) determined by the detailed Noether braid response. Primitive simulations use $c_f=1$ inside the root equation; the PPN comparison uses the dressed asymptotic speed $c_0$.

Outside that limit, neither agreement nor deviation is established here. Strong-field or high-velocity predictions require a derived clock map, its observer export, and comparison with the full GR benchmark in that regime.

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

Here $E_{\mathrm{CM}}$, $p_{\mathrm{CM}}$, and $M_0$ are effective assembly energy, momentum magnitude, and rest mass; $v$ is effective group speed in this locally homogeneous rest chart, and $\gamma_\star=(1-v^2/c_{\mathrm{eff}}^2)^{-1/2}$ uses $c_\star=c_{\mathrm{eff}}$. It is distinct from the scalar PPN spatial-compliance parameter $\gamma_{\mathrm{PPN}}$ and the index-bearing spatial metric family $\gamma_{ij}^{\mathrm{eff}}$. This is a cross-check on the emergent clock model, not an independent axiom at the architrino substrate level. For definitions and interpretation, see [Effective Energy-Momentum Closure](../dynamics/energy.md#effective-energy-momentum-closure).

### Strong-Field / Horizon Alignment Note

For strong-field interpretation, use the canonical event-horizon alignment condition from [singularity-resolution](./singularity-resolution.md#canonical-strong-field-alignment-condition). In this chapter, Planck-scale references inherit that same alignment definition.

---

## Clock Model and Equations of Motion

To close the derivation gap, fix an explicit clock model and an explicit observable-extraction map.

### Concrete coincident-midpoint orthogonal-axis braid Clock State

Use one coincident-midpoint orthogonal-axis braid record with six constituent architrinos grouped into three persistently indexed neutral binaries:
$$
\mathcal{A}=\{1_+,1_-,2_+,2_-,3_+,3_-\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-66f56bea6f5bfbce)

The intrinsic polarities are $q_a=\pm\epsilon$, where $\epsilon=|e|/6$ is the declared observer electric-bookkeeping convention rather than a derived charge calibration. The trajectories are $\mathbf X_a(T)$. No per-constituent inertial mass is assigned at the substrate level.

Define pair-separation vectors
$$
\mathbf r_a=\mathbf X_{a+}-\mathbf X_{a-},
\qquad
a\in\{1,2,3\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3c71c57e2ff4abc4)

The binary half-separation radii are $R_a=\|\mathbf r_a\|/2$. The three radii are independently assignable and do not order or relabel the binaries.

For this state to carry the coincident-midpoint orthogonal-axis braid label, its three binary axes must be mutually orthogonal at the near-rest endpoint and converge toward the group-translation direction along the prescribed flattening coordinate $\lambda_A$. For the coincident-midpoint member used here, $h_a=0$ and $\rho_a=R_a$; nonzero axial half-separations belong to the distinct axially separated member. The frequencies $f_a$, phases $\phi_a$, and circulation senses remain explicit prescribed coordinates. This chart does not establish that the clock is retained or stable under EOM solver evolution; failure to preserve the declared coordinate relations on the same evolved record would falsify this clock assignment.

### Microscopic Evolution Equation (Regularized)

The sharp acceleration law is the [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form). For each $a\in\mathcal A$, its [auxiliary dual-mollified regulator](../dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) has the form
$$
\frac{d^2\mathbf X_a}{dT_r^2}(T_r)=
\sum_{b\in\mathcal{A}\cup\mathcal E}
\kappa\,\sigma_{ab}\lvert q_aq_b\rvert
\int_{T_r-h}^{T_r}\!dT_t\;
\frac{\mathbf{r}_{ab}(T_r;T_t)}
{\left(r_{ab}^2(T_r;T_t)+\epsilon_c^2\right)^{3/2}}\,
c_f\delta_\eta\!\big(r_{ab}(T_r;T_t)-c_f(T_r-T_t)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bb684255f9d3e34a)

$$
\mathbf r_{ab}(T_r;T_t)=\mathbf X_a(T_r)-\mathbf X_b(T_t),
\qquad
r_{ab}=\|\mathbf r_{ab}\|,
\qquad
\hat{\mathbf r}_{ab}=\frac{\mathbf r_{ab}}{r_{ab}}\quad(r_{ab}>0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-285ff9ef24594b59)

Here $\sigma_{ab}=\operatorname{sign}(q_aq_b)$, $\kappa>0$ is the canonical coupling, and $\mathcal E$ is the declared external transmitter inventory supplying the Noether sea and any apparatus background. Taking $\mathcal E=\varnothing$ defines an isolated six-site calculation and cannot test medium-dependent clock response. External histories may be prescribed for a conditional comparison, but then the combined system has not been evolved self-consistently.

The memory duration $0<h<\infty$ truncates the retained history; it is unrelated to Planck’s constant in the spectral section. The mollifier $\delta_\eta$ has unit integral in its length-valued argument, and $\eta>0$ and $\epsilon_c>0$ have units of length. The factor $c_f$ makes the emission-time integral dimensionless apart from the spatial kernel: $[\kappa|q_aq_b|]=\mathrm L^3/\mathrm T^2$ then gives acceleration units. All numerical evaluations use $c_f=1$.

At positive separation and isolated simple roots, the limit $\eta\to0$ gives the transmitter-side weight $c_f/|D_{t,ab}|$, where $D_{t,ab}=c_f-\hat{\mathbf r}_{ab}\cdot\mathbf V_b(T_t)$. Receiver motion enters root playback through $D_{r,ab}/D_{t,ab}$, with $D_{r,ab}=c_f-\hat{\mathbf r}_{ab}\cdot\mathbf V_a(T_r)$; it does not multiply the arriving acceleration. Include all partner, external, and nonzero-delay self roots on the admitted history domain. The zero-delay endpoint is excluded from the sharp law. The softened vector has value zero at coincidence only as an auxiliary kernel, which supplies no physical coincidence continuation.

Finite regulators and finite memory confer no certification. Recovering the sharp law requires complete simple-root coverage, positive separation and transversality margins, boundary clearance, and controlled $\eta\to0$ and $\epsilon_c\to0$ limits; a finite $h$ additionally needs an older-history remainder bound or proof that no omitted contribution exists. Folds, caustics, and coincident root births require their own admissible event treatment. Missing history or an unresolved singular event leaves verification incomplete.

### Clock Observable and Clock Map

Declare $a_{\mathrm{clk}}\in\{1,2,3\}$ as the clock channel on the source record. Fix an oriented orthonormal basis $\mathbf e_1,\mathbf e_2$ for the declared projection plane. The projected separation must remain nonzero. Define a continuous lifted phase whose value modulo one turn is
$$
\theta_{\mathrm{clk}}(T)\equiv\operatorname{atan2}\!\big(\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_2,\mathbf r_{a_{\mathrm{clk}}}\!\cdot\!\mathbf e_1\big)\pmod{2\pi}
$$

[View →](../../../../equation-mapping.html#corpus-equation-092eb918e6e21bff)

Retain every full turn when constructing this lift. Endpoint principal angles alone lose entire cycles. Sampling must resolve crossings without aliasing; a moving projection basis requires its rotation to be accounted for separately. Choose the phase orientation so the reference cadence is positive. On a window $[T_1,T_2]$ with $T_2>T_1$, define the window-averaged angular frequency
$$
\omega_{\text{clk}}
=
\frac{\theta_{\mathrm{clk}}(T_2)-\theta_{\mathrm{clk}}(T_1)}{T_2-T_1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-250cfa9dfddf7b0e)

For the reference run $(v=0,\Phi_N=0)$, set $\omega_0=\omega_{\text{clk}}^{\text{ref}}$ and define
$$
\frac{\tau(T_2)-\tau(T_1)}{T_2-T_1}\equiv\frac{\omega_{\text{clk}}}{\omega_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7500f56ae93f3cd2)

This is an elapsed-time ratio on the window. The instantaneous law instead uses $d\theta_{\mathrm{clk}}/dT$; the two coincide only for constant cadence or a controlled local-window limit. This native observable is the benchmark preserved by the clock projector in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). For a branch record $\mathcal{B}_{\mathbf X j}^{(T_0)}$, the clock-facing projection keeps only the entries that can change the extracted phase or cadence:

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

Run the same coincident-midpoint orthogonal-axis braid clock record under controlled backgrounds:

1. Uniform native group speed $\|\mathbf w\|$ relative to homogeneous Noether sea, with the declared assembly-center convention. Export to $v=\|d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}\|$ in a stationary comparison chart before a PPN fit.
2. Weak static potential background $\Phi_N(\mathbf X,T)$ (or $U\equiv-\Phi_N>0$).
3. Weak-field regime constraints: $v^2/c_\star^2\ll1$ and $\lvert U\rvert/c_0^2\ll1$.

Use $c_f=1$ in every numerical root calculation. PPN fits use the exported speed $v$, the Newtonian comparison potential $U$, and $c_\star=c_0$ in one static isotropic observer chart with vanishing shift. Hold other independent PPN potentials fixed or subtract their declared contributions. In this fit only, $\omega_j$ denotes the exported phase rate $\Delta\theta/\Delta t_{\mathrm{eff}}$, obtained from the native rate and the chart conversion; it is not the raw $T$-frequency. Reference normalization keeps $J_0=1$.

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

For this coefficient map, use only the exported PPN comparison variables declared above. Fits to raw native rates remain native diagnostics and do not determine PPN coefficients.

Linearize each trajectory as $\mathbf X_a(T)=\mathbf X_a^{(0)}(T)+\delta\mathbf X_a(T)$ around the periodic rest solution — conditional on a certified rest attractor supplying $\mathbf X_a^{(0)}$, which the retention disclaimer above records as not yet established — and expand the extracted clock ratio in
$$
\epsilon_U\equiv U/c_0^2,\qquad \epsilon_v\equiv v^2/c_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-64e8f8cdf1803ebd)

Conditional on smooth response about the stated admitted background, use the regression model
$$
\frac{\omega}{\omega_0}
=
1-A_U\,\epsilon_U-A_v\,\epsilon_v
+C_2\,\epsilon_U^2
+C_{Uv}\,\epsilon_U\epsilon_v
+C_{v4}\,\epsilon_v^2
+\mathcal{O}\!\left((|\epsilon_U|+|\epsilon_v|)^3\right)
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

Take $W=\operatorname{diag}(w_j)$ with positive weights, require $N>5$ and full column rank of $X$, and check conditioning over independently varied potential and speed. The following estimated covariance applies only under zero-mean residuals with $\operatorname{Cov}(\boldsymbol\varepsilon)=s^2W^{-1}$ and a valid quadratic response model; correlated errors, uncertain reference rates, and truncation bias require their own covariance or bias treatment:
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

and, in the isolated static subclass of [PPN Parameters](./ppn-parameters.md), with $U=-\Phi_N$ and other independent potentials controlled, the PPN map is
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e5bfad1ca3c32ec2)

So the GR target $\beta_{\mathrm{PPN}}=1$ implies
$$
C_2^\star=\frac{1}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3b615016e360844f)

The raw mixed coefficient is not a zero-target leakage diagnostic. In the static isotropic comparison metric, $g_{00}^{\mathrm{eff}}=-1+2\epsilon_U-2\beta_{\mathrm{PPN}}\epsilon_U^2$ and $g_{ij}^{\mathrm{eff}}=(1+2\gamma_{\mathrm{PPN}}\epsilon_U)\delta_{ij}$ to the retained orders, with $g_{0i}^{\mathrm{eff}}=0$. These are observer-level [PPN benchmark coefficients](https://doi.org/10.12942/lrr-2014-4), not substrate premises. Substitution in the clock interval gives the radicand $1-2\epsilon_U-\epsilon_v+2\beta_{\mathrm{PPN}}\epsilon_U^2-2\gamma_{\mathrm{PPN}}\epsilon_U\epsilon_v$. Using $\sqrt{1+s}=1+s/2-s^2/8+O(s^3)$ therefore yields $C_2=\beta_{\mathrm{PPN}}-1/2$, $C_{Uv}=-(\gamma_{\mathrm{PPN}}+1/2)$, and $C_{v4}=-1/8$. For the GR comparison, $C_{Uv}^{\star}=-3/2$. Deviations must be measured relative to this chart-specific target; a nonzero mixed coefficient is not by itself preferred-frame leakage.

Execution protocols, benchmark catalogs, and numeric pass/fail thresholds are routed through:

1. [Validation Protocols](../validation/validation-protocols.md)
2. [Simulation Run Protocols](../validation/simulations/run-protocols.md)
3. [Constraint Ledger](../validation/constraint-ledger.md)
4. [Closure Scorecard](../validation/closure-scorecard.md)

---

## Failure Conditions and Red Flags

The following observations would reject the tested clock-recovery claim when the same admitted branch, observer map, apparatus conditions, and uncertainty budget are held fixed. Failure of a prescribed or uncertified clock candidate alone does not reject all clock realizations:

1. **Incorrect velocity dependence:**
 - If $P_q(\mathbf w)$ cannot be made to fit $\propto \gamma_\star(\mathbf w)$ without fine-tuning internal clock geometry or Noether sea parameters.

2. **Wrong sign or magnitude of gravitational dilation:**
 - In the matched weak static comparison, clocks at more negative $\Phi_N$ must tick slower after transport and environmental shifts are controlled. A resolved opposite sign or magnitude mismatch rejects that recovery claim.

3. **Directional anisotropy:**
 - If the exported clock or resonator observable has an orientation-dependent residual exceeding its experiment-specific bound, the proposed Lorentz recovery fails in that channel. Native directional dependence alone is insufficient; compare the calibrated modulation and nuisance model in the [Constraint Ledger](../validation/constraint-ledger.md), rather than apply one universal sidereal threshold.

4. **Clock-dependence:**
 - If different reasonable clock designs (different internal assemblies) yield different $d\tau/dt_{\mathrm{eff}}$ at the same $(v,\Phi_N)$ beyond experimental bounds, the emergent Equivalence Principle fails.

5. **Parameter bloat:**
 - If matching these effects requires separately adjustable medium profiles or transport coefficients, the proposed shared constitutive explanation remains unestablished. Record which quantities are derived and which are fitted in the [Parameter Ledger](../validation/parameter-ledger.md); parameter count alone supplies no numerical naturalness verdict.

---

**Chapter target:** A concrete definition of **how** to compute $\omega(\mathbf{w},\Phi_{\text{eff}},n)$ for a Noether braid clock, and a clear native expression for $d\tau/dT$ plus its observer-chart projection $d\tau/dt_{\mathrm{eff}}$ in terms of those quantities.

### Closure Program Interface (clock-to-PPN bridge)

This chapter defines a candidate coefficient bridge between microscopic clock dynamics and PPN observables. It reports no fitted coefficients from an accepted evolved clock.

The clock-to-PPN closure checklist is:

1. Define a reference clock assembly and extraction window for $\omega_0$.
2. Run controlled perturbations over $(U_j,v_j)$ in the weak-field, low-velocity regime.
3. Fit $(A_U,A_v,C_2,C_{Uv},C_{v4})$ from the extracted clock ratios.
4. Compare $\hat\beta_{\mathrm{PPN}}$ and $\hat C_{Uv}$ with their declared PPN targets and retain the chart, potential, and covariance assumptions.
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
\mathbf{q}_\star=(1,\tfrac12,1,-\tfrac32)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea9b593a97e8f0b1)

Here $\Sigma_q$ is the propagated covariance of the four fitted comparison quantities; it must be positive definite, or the statistic must be restricted to its independently supported subspace. A low quadratic discrepancy is a goodness-of-fit diagnostic only under its declared error model and threshold. It does not establish a retained clock, constitutive response, independence of the evidence, complete Lorentz or metric recovery, solver certification, or empirical acceptance. The remaining physical obligation is one admitted history that produces the clock, ruler, and signal records together and survives the stated falsifiers.
