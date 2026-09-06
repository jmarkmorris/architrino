# Lorentz-Invariance Test Suite

## Standard-Theory Concept

The Michelson-Morley, Kennedy-Thorndike, and Ives-Stilwell experiments form a compact test suite for Lorentz behavior. Michelson-Morley tests two-way light-speed isotropy, Kennedy-Thorndike tests boost dependence across unequal arms and changing velocities, and Ives-Stilwell tests transverse Doppler/time-dilation behavior. Together they constrain preferred-frame leakage and enforce the Lorentz factor

$$
\gamma=(1-\beta^2)^{-1/2},
\qquad
\beta=v/c.
$$

In Robertson-Mansouri-Sexl language, use barred offsets from the special-relativistic values:
$$
a(\beta)=1+\left(-\frac12+\bar\alpha\right)\beta^2+O(\beta^4),
$$
$$
b(\beta)=1+\left(\frac12+\bar\beta\right)\beta^2+O(\beta^4),
\qquad
d(\beta)=1+\bar\delta\beta^2+O(\beta^4).
$$
The standard Lorentz result is
$$
(\bar\alpha,\bar\beta,\bar\delta)=(0,0,0).
$$
The three classic experiment families isolate the combinations
$$
R_{\mathrm{IS}}=\bar\alpha,
\qquad
R_{\mathrm{KT}}=\bar\beta-\bar\alpha,
\qquad
R_{\mathrm{MM}}=\bar\delta-\bar\beta.
$$
This is the useful lesson for $\mathbb{A}\mathbb{A}\mathbb{A}$: Michelson-Morley alone can be hidden by a ruler deformation, but Kennedy-Thorndike and Ives-Stilwell force the same closure record to retune clocks and rulers together.

The test suite also separates one-way and two-way isotropy. Michelson-Morley constrains round-trip light propagation; it does not directly measure a one-way photon-channel speed without an independent synchronization convention. A preferred-frame branch may therefore carry a substrate one-way anisotropy only if the assembly-clock synchronization map makes that anisotropy operationally inaccessible while the measurable two-way, boost-dependence, clock-comparison, and resonator/cavity rows remain bounded.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

Lorentz symmetry is already a theorem target, not substrate ontology. More precisely, the test-suite problem is exact substrate asymmetry to bounded emergent symmetry: absolute time, the Euclidean void, and finite $c_f$ may remain in the ontology only if moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, and photon-channel transport suppress every observer-accessible preferred-frame current below the declared leakage bound. The Noether sea response object and nested shell braid causal closure should make absolute-frame dynamics operationally hidden in the tested regime.

This packet owns the leakage-vector expansion behind the essay phrase "bounded preferred-frame leakage". A candidate branch must report separate residual rows for Michelson-Morley two-way anisotropy, Kennedy-Thorndike boost drift, Ives-Stilwell clock-dilation behavior, Hughes-Drever and clock-comparison matter-sector anisotropy, sidereal modulation, photon-sector dispersion/birefringence/time-of-flight leakage, weak-field preferred-frame terms, and gravitational-wave-versus-photon speed matching. Each row must declare expansion order, validity regime, and tolerance. Collapsing those rows into one $\epsilon_{\mathrm{LV}}$ label is allowed only as a summary after the individual residuals are declared.

In priority terms this is an invariant-provenance packet, not only a null-test checklist. The same branch must identify the substrate-exact rows, the observer-level Lorentz invariants they export, and the residual leakage coefficients that remain after physical clock, ruler, and photon-channel records are compressed into an operational frame.

The same single-response discipline makes a sharper coefficient prediction. RMS offsets and SME-style coefficients should not be tuned as independent rows if the branch is real; a toy Noether sea constitutive response should project them onto a constrained coefficient submanifold. The useful calculation is therefore not only whether each row is individually small, but whether any nonzero residuals carry the correlated pattern forced by one common-mode branch rather than the full free SME coefficient space.

This single-response claim is cross-sector. The $\chi_{\text{sea}}(\mathbf X,T)$ row used by the Lorentz clock map and preferred-frame leakage budget must be the same Noether sea response row consumed by cosmological transport, redshift, CMB transfer, lensing, and growth. A branch that hides the preferred frame only by choosing a Lorentz-specific $\chi_{\text{sea}}$, while the cosmology module uses a different transport row, has failed the implementation-economy claim even if each sector fits its own observables.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue authority; promote an accepted task into [work-queue.md](../work-queue.md) before execution.

1. `two_way_signal` — Derive the two-way signal-time cancellation condition $\Delta_{\mathrm{tw}}(\beta)\to0$. Status: `draft`.
2. `moving_assembly_deformation` — Derive $\xi\to1/\gamma$ for the longitudinal envelope ratio in the homogeneous weak-response limit, then show the selected contracted branch is a stable attractor of the boosted delay dynamics. Status: `draft`.
3. `clock_ruler_retuning` — Show that clock frequency, ruler length, and signal synchronization use one closure record. Status: `draft`.
4. `leakage_bound` — Define $\epsilon_{\mathrm{LV}}$ against modern test-suite bounds without making the bound itself an input coefficient. Status: `draft`.
5. `gw_photon_common_speed` — Show that the effective gravitational channel and photon channel share a limiting speed to the GW170817-class tolerance in the tested weak-field transport regime. Status: `draft`.
6. `clock_map_velocity_potential` — Derive one clock map $d\tau/dt_{\mathrm{eff}}=f_{\tau}(\beta,n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{assembly state})$ whose velocity sector recovers special-relativistic time dilation and whose potential sector recovers weak-field gravitational redshift and PPN clock/curvature constraints. Status: `draft`.
7. `coefficient_submanifold` — Project one toy Noether sea constitutive response into RMS and low-order SME-style residual rows and test whether the induced coefficients occupy a correlated submanifold rather than independent fit dimensions. Status: `draft`.
8. `cross_sector_chi_sea` — Verify that the $\chi_{\text{sea}}$ row used for Lorentz hiding is the same response row used by cosmological redshift, CMB transfer, lensing, and growth, not a sector-specific tuning. Status: `draft`.

## Closure Objects

- Preferred-frame leakage: $\epsilon_{\mathrm{LV}}$.
- Two-way anisotropy diagnostic: $\Delta_{\mathrm{tw}}(\beta)$.
- Clock map: $d\tau/dt_{\mathrm{eff}}=f_{\tau}(\beta,n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{assembly state})$.
- Clock-map residuals: $R_{\tau v}$ and $R_{\tau\Phi}$.
- Shape ratio: $\xi=R_{\parallel}/R_{\perp}$.
- Clock observable: $\omega_{\text{clk}}/\omega_0$.
- Constitutive coefficients: $(k_2,\ell_2,k_4,\ell_4)$ for stiffness-channel closure.
- GW/photon speed residual: $R_{\mathrm{GW}\gamma}\equiv(c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma)/c_\gamma$.
- Coefficient-submanifold projection for $\mathbf{R}_{\mathrm{RMS}}$ and $\mathbf{R}_{\mathrm{SME}}^{\mathrm{eff}}$ from one common-mode response.
- Cross-sector $\chi_{\text{sea}}$ identity row connecting Lorentz recovery to cosmology transport.

## Source-Mined Residual Suite

Define the laboratory round-trip signal diagnostic in a homogeneous moving branch by
$$
\Delta_{\mathrm{tw}}(\beta,\hat{\mathbf n})
\equiv
\frac{
P_{\circlearrowleft}(\beta,\hat{\mathbf n})
-\langle P_{\circlearrowleft}(\beta,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}
}{
\langle P_{\circlearrowleft}(\beta,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}
},
$$
where $P_{\circlearrowleft}$ is the closed-path signal time measured by the same physical clock branch. A Michelson-Morley-style pass requires
$$
\sup_{\hat{\mathbf n}}|\Delta_{\mathrm{tw}}(\beta,\hat{\mathbf n})|
\le
\epsilon_{\mathrm{MM}},
$$
with the modern direct photon-sector target at the $10^{-18}$ fractional-frequency level when the projection is a two-cavity or two-oscillator comparison.

A separate one-way residual may be tracked only relative to a declared synchronization map:
$$
\Delta_{\rightarrow}(\beta,\hat{\mathbf n};\mathcal{S})
\equiv
\frac{
c_{\gamma,\rightarrow}(\beta,\hat{\mathbf n};\mathcal{S})-c_0
}{c_0},
$$
where $\mathcal{S}$ is the clock-synchronization convention physically realized by the same assembly branch. This residual is not a Michelson-Morley observable by itself. The operational requirement is that $\mathcal{S}$ pushes any substrate one-way anisotropy into unobservable convention dependence while the measurable residual vector remains bounded.

The conditional reabsorption calculation in [Lorentz Kinematics](../../../../content/markdown/aaa/spacetime/lorentz-kinematics.md#conditional-synchronization-reabsorption-lemma) is the local closure template for this row. If one branch supplies $L_{\parallel}=L_0/\gamma_\gamma$ and $d\tau/dt_{\mathrm{eff}}=\gamma_\gamma^{-1}$ for the photon-channel comparison, the forward and return one-way legs remain asymmetric in absolute time while the moving clock records $\tau_{\mathrm{rt}}=2L_0/c_\gamma$. The calculation does not derive the square-root response; it converts the remaining obligation into the measurable residuals $R_{\tau v}$, $\Delta_{\mathrm{tw}}$, and the matter/photon/GW common-speed rows.

A later wake-bound binary derivation attempt strengthens the deformation row but does not close it. In the closed-return benchmark, requiring a material clock to have no orientation-dependent period selects the axial law $g(\beta)=\sqrt{1-\beta^2}$ as the unique zero-leakage deformation among simple axial contraction laws. This is a contraction-selection lemma, not a completed dynamics theorem. The unresolved step is to prove that the boosted delay force law relaxes to that contracted branch as a stable attractor, and that the same branch supplies the clock, ruler, and signal-channel rows rather than only a kinematic compatibility condition.

The same source also sharpens the speed-identification burden. A square-root clock law computed with one limiting speed and a photon synchronization row computed with another generically leaves an $O(\beta^2)$ two-way residual. The priority target is therefore common-mode speed identification after Noether sea dressing: the observer-facing clock, ruler, photon, and effective gravitational channels must share one homogeneous limiting speed. Do not record this as a proved primitive equality $c_f=c_\gamma=c_{\text{eff}}=c_{\mathrm{GW}}^{\mathrm{eff}}$ until the photon dispersion and gravitational-channel transport derivations are supplied.

For Earth-laboratory preferred-frame rows, use the explicit group-speed parameter
$$
\beta_\oplus\equiv\frac{v_\oplus}{c_{\text{eff}}},
$$
and report the leading order at which each residual first appears. A budget that says only "$O(\epsilon_{\mathrm{LV}})$" without the channel and leading power of $\beta_\oplus$ is not yet a budget.

The clock branch must be represented by a substrate-to-observer map,
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
f_{\tau}\!\left(
\beta,\,
n(\mathbf X,T),\,
\chi_{\text{sea}}(\mathbf X,T),\,
\Phi_{\text{eff}}(\mathbf X,T),\,
\text{assembly state}
\right),
\qquad
\beta\equiv\frac{v}{c_{\text{eff}}}.
$$
The velocity sector is constrained by
$$
R_{\tau v}(\beta)
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\nabla n=0,\ \nabla\Phi_{\text{eff}}=0}
-\sqrt{1-\beta^2},
$$
and must match time-dilation tests, including Ives-Stilwell and storage-ring comparisons, at the experiment-specific precision. The potential sector is constrained by
$$
R_{\tau\Phi}
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\beta=0}
-\left(1+\frac{\Phi_{\text{eff}}}{c_{\text{eff}}^2}+O\!\left(\frac{\Phi_{\text{eff}}^2}{c_{\text{eff}}^4}\right)\right),
$$
with the $\Phi_{\text{eff}}$ sign convention declared. This row consumes gravitational-redshift tests and the weak-field PPN target $\gamma_{\mathrm{PPN}}\to1$ at the Cassini-class scale. Passing one sector by fitting a separate clock law does not count; both sectors must be restrictions of the same $f_{\tau}$.

Kennedy-Thorndike closure requires no boost-dependent drift in the same branch:
$$
\Delta_{\mathrm{KT}}(\beta_1,\beta_2)
\equiv
\frac{P_{\circlearrowleft}(\beta_1)}{P_{\circlearrowleft}(\beta_2)}-1
-\left[\frac{P_{\circlearrowleft}^{\mathrm{SR}}(\beta_1)}{P_{\circlearrowleft}^{\mathrm{SR}}(\beta_2)}-1\right],
$$
with
$$
\Delta_{\mathrm{KT}}=R_{\mathrm{KT}}\,(\beta_1^2-\beta_2^2)+O(\beta^4).
$$
Ives-Stilwell closure requires the clock branch to supply
$$
\frac{\omega_{\text{clk}}(\beta)}{\omega_0}
=
1-\frac12\beta^2-\frac18\beta^4
+\Delta_{\mathrm{IS}}(\beta),
\qquad
\Delta_{\mathrm{IS}}(\beta)=\bar\alpha\,\beta^2+O(\beta^4).
$$
Thus the Lorentz theorem target is not merely $\xi\to1/\gamma$. It is the vector cancellation
$$
\mathbf{R}_{\mathrm{RMS}}
=
\begin{pmatrix}
R_{\mathrm{MM}}\\
R_{\mathrm{KT}}\\
R_{\mathrm{IS}}
\end{pmatrix}
\to\mathbf{0}
$$
using one moving-assembly deformation, clock-retuning, and signal-synchronization record.

SME-style tables add a broader coefficient-space discipline. The effective residual exported by an $\mathbb{A}\mathbb{A}\mathbb{A}$ branch should be recorded as
$$
\mathbf{R}_{\mathrm{SME}}^{\mathrm{eff}}
=
\left(
\tilde\kappa_{e-}^{\mathrm{eff}},
\tilde\kappa_{o+}^{\mathrm{eff}},
\tilde\kappa_{\mathrm{tr}}^{\mathrm{eff}},
\bar{s}^{\mu\nu}_{\mathrm{eff}},
\mathbf{c}_{\mathrm{matter}}^{\mathrm{eff}}
\right),
$$
where the photon-sector rows compare against two-way cavity, clock-comparison, and birefringence tests; $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ compares against gravitational Lorentz tests; and $\mathbf{c}_{\mathrm{matter}}^{\mathrm{eff}}$ compares against matter-clock and spin-precession tests. These are not new fit knobs. They are a named projection of one candidate branch into the same Sun-centered comparison frame used by the SME data tables.

The gravitational-wave and photon channels add a direct speed-matching residual:
$$
R_{\mathrm{GW}\gamma}
\equiv
\frac{c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma}{c_\gamma}.
$$
In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a common-mode Noether sea response condition, not a statement that primitive $c_f$, photon-channel $c_\gamma$, and observer-level $c_{\text{eff}}$ were the same quantity all along. The effective gravitational channel and photon channel may be distinct dressings only if their weak-field limiting speeds match to the declared GW170817-class tolerance.

## Preferred-Frame Leakage Budget

| Leakage channel | Residual row | Physical observable | Order target |
| --- | --- | --- | --- |
| Two-way speed anisotropy | $\Delta_{\mathrm{tw}}(\beta,\hat{\mathbf n})$ | Round-trip signal speed versus orientation | $\lesssim10^{-18}$ fractional-frequency class in modern cavity tests |
| Boost-dependence of two-way speed | $\Delta_{\mathrm{KT}}(\beta_1,\beta_2)$ | Round-trip speed versus lab velocity | source-specific, roughly $10^{-8}$ to $10^{-12}$ class |
| Clock and energy-level anisotropy | $\mathbf{c}_{\mathrm{matter}}^{\mathrm{eff}}$ rows | Energy-level splitting versus orientation | order-$10^{-29}$ class in tight SME matter-sector rows, with units and coefficient basis declared |
| Clock-map velocity sector | $R_{\tau v}$ | Time dilation of moving assembly clocks | experiment-specific; storage-ring/Ives-Stilwell class tests reach ppb scale and better |
| Clock-map potential sector | $R_{\tau\Phi}$ | Gravitational redshift and weak-field clock/curvature response | clock-redshift bounds plus Cassini-class $\gamma_{\mathrm{PPN}}-1$ at order $10^{-5}$ |
| Sidereal modulation | sidereal and annual Fourier rows of the same residuals | Daily or annual modulation of clock, cavity, or signal records | band-specific; report frequency, phase convention, and coefficient row |
| Bell record-order leakage | $\Delta_{\mathrm{ord}}$ and wake-reach margins | Timing or correlation dependence on which wing is first in absolute time | photon-spacelike but wake-timelike Bell windows must remain ordering-invariant or suppressed below coincidence and correlation residual tolerances |
| Photon dispersion/birefringence/time-of-flight | $\tilde\kappa^{\mathrm{eff}}$ rows and time-of-flight residuals | Energy-dependent $c_\gamma$, polarization rotation, arrival-time leakage | source-specific; can reach $10^{-20}$-class and tighter in astrophysical photon comparisons |
| Weak-field preferred-frame terms | $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ and PPN preferred-frame rows | Effective gravity and clock/ruler response in weak fields | compare coefficient by coefficient against PPN/SME bounds |
| GW/photon speed split | $R_{\mathrm{GW}\gamma}$ | $c_{\mathrm{GW}}^{\mathrm{eff}}$ versus $c_\gamma$ | $\sim10^{-15}$ class from GW170817/GRB 170817A |

The common-mode criterion applies across the full table. A branch that passes the two-way optical row by retuning the photon channel but leaves an uncancelled matter-sector clock anisotropy, sidereal line, birefringence row, weak-field preferred-frame row, or GW/photon speed split has not recovered Lorentz behavior.

## Bound Rows To Consume

| Source family | Residual row | AAA closure use |
| --- | --- | --- |
| Will PPN table | $|\gamma_{\mathrm{PPN}}-1|\le2.3\times10^{-5}$, $|\beta_{\mathrm{PPN}}-1|\le8\times10^{-5}$, $|\alpha_1|\le4\times10^{-5}$, $|\alpha_2|\le2\times10^{-9}$, $|\alpha_3|\le4\times10^{-20}$ | Weak-field effective metric cannot match Shapiro delay while leaving preferred-frame rows free. |
| Direct terrestrial photon tests | $\Delta\nu/\nu$ and two-way orientation residuals at $\sim10^{-18}$ | $\Delta_{\mathrm{tw}}$ is a real null-test residual, not a narrative claim that observers cannot see the Euclidean-void rest frame. |
| Hughes-Drever-type and modern clock-comparison tests | Orientation dependence of internal energy levels and clock transitions | The same moving-assembly record that hides two-way signal anisotropy must also suppress matter-sector orientation leakage. |
| GW170817/GRB 170817A | $R_{\mathrm{GW}\gamma}$ at $\sim10^{-15}$ | The effective gravitational channel and photon channel must share a common weak-field limiting speed. |
| SME data tables | photon, matter, neutrino, and gravity coefficients in the standard Sun-centered frame, with no confirmed violation | Export $\mathbf{R}_{\mathrm{SME}}^{\mathrm{eff}}$ from the candidate branch and compare coefficient by coefficient rather than collapsing all bounds into one scalar. |
| RMS test theory | $(R_{\mathrm{MM}},R_{\mathrm{KT}},R_{\mathrm{IS}})$ | Separates ruler anisotropy, boost dependence, and clock retuning so coefficient splits are visible. |

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | braid | Make Lorentz behavior consume moving-assembly deformation and clock/ruler retuning. |
| This file | [master-equation-closure](../../master-equation-closure/priorities.md) | Tie the cancellation to causal-root and Jacobian structure rather than postulated Minkowski geometry. |
| This file | [validation-gates](../../dormant-deferred/validation-gates/priorities.md) | Add preferred-frame leakage as a direct gravity/relativity acceptance predicate. |

## Failure Modes

- `lorentz.one_way_leakage`: a measurable one-way preferred-frame signal appears above permitted bounds.
- `lorentz.two_way_residual`: two-way round-trip timing retains orientation dependence in the weak homogeneous limit.
- `lorentz.coefficient_split`: clock, ruler, and signal tests require independently tuned coefficients.
- `lorentz.bridge_overclaim`: Lorentz symmetry is stated as fundamental ontology rather than recovered observer-level behavior.
