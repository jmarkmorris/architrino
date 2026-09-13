# Redshift-Budget Toy Model

This protocol documents the first redshift-budget simulation fixture for the cosmology branch. The fixture is a bookkeeping replay of the factorized redshift record in [Expansion Mechanism](../../cosmology/expansion-mechanism.md#minimal-redshift-budget-toy-model), not an empirical distance-ladder fit.

The Noether sea is the ambient population of Noether braid assemblies. Its cadence-stretch factor $\Gamma_N$ is reference cadence divided by local cadence, with reciprocal clock rate on the declared shared-clock branch. A redshift budget accounts for a photon record. It separates endpoint cadence, source-branch state, launch geometry, path-history transport, and signed frequency exchange so that a line shift is not silently converted into one undifferentiated expansion variable.

Its purpose is narrow: check the arithmetic of a declared separation of endpoint cadence, source-branch state, launch geometry, and Noether sea path-history in a machine-readable packet before any survey-facing cosmology comparison is attempted. The current packet also exposes the continuity-disciplined path-rate law, so source loading, equilibration, frequency-space current, flow divergence, and anisotropic response are not hidden as unrelated fitted terms.

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/cosmology/redshift-budget-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/cosmology/redshift-budget-mock.json
```

and emits one result row per scenario. Frequencies are in hertz, path distances in megaparsecs, observer velocities in kilometres per second, and $h$ in joule-seconds; propagation coefficients have inverse-megaparsec units. New numerical instantiations use $c_f=1$ with a separately declared observer-unit conversion. The recorded legacy mock constants are preserved as observer reporting values, not a numerical choice of primitive wake speed. Here $h$ is the observer-level action benchmark used by the recovered photon energy-frequency map; it is not a substrate input.

## Replay Equation

For a line family $X$, divide the absolutely timed Euclidean path into positive segment lengths $\Delta s_j$ summing to the declared path distance. Each $\alpha_{\mathrm{prop},X,j}$ is a segment average or quadrature approximation with inverse-length units; the update is exact for piecewise constant coefficients and otherwise requires a refinement error bound. The propagation bookkeeping variable starts at

$$
Y_{X,0}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-262fcd74d54db9f3)

and advances by

$$
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X,j}\Delta s_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36fa591663237b70)

The fixture then reconstructs the logarithmic redshift budget

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

[View →](../../../../../equation-mapping.html#corpus-equation-8cdca5def216b3bc)

The observed receiver-facing frequency and photon energy are

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}\exp(-Z_X),
\qquad
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs},X}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5160b7940772df7)

The positive factors and fixed frequency/clock calibration make these algebraic reconstructions well defined, but do not derive the physical factorization or energy map. Endpoint and path contributions can trade off without independent calibration. $Y_{X,N}$ is the path-history phase-cadence stretch left after endpoint cadence, source-branch shift, and launch geometry have been declared.

The path-history term is signed. A positive increment in $Y_X$ is a redward frequency depletion relative to the clean emitted line, while a negative increment is a blueward frequency boost. For a segment-level exchange row,

$$
\Delta Y_{X,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{X,j}^{+}}{\nu_{X,j}^{-}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d90174afa41f1ed8)

with $\nu_{X,j}^{-}$ and $\nu_{X,j}^{+}$ measured in the same local comparison convention before and after the exchange. For an identified coherent line, signed exchange events can represent a frequency ratio rather than a new expansion variable: a hot or coherently moving intervening medium may produce $\Delta Y_{X,j}^{\mathrm{ex}}<0$, while a lower-energy absorbing or relaxing segment may produce $\Delta Y_{X,j}^{\mathrm{ex}}>0$.

A thermal Sunyaev-Zeldovich spectrum is generally redistributed across frequencies and cannot be represented by one line ratio; such comparisons need a spectral transfer operator. Each exchange row should also carry the local energy residual

$$
R_{\nu\text{-}\mathrm{ex},j}
=
\frac{
\left|
E_\gamma(\nu_{X,j}^{+})-E_\gamma(\nu_{X,j}^{-})
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{E_{\mathrm{tol}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9cfc061db347e0cb)

Here $E_\gamma(\nu)$ is the declared photon-channel energy map and $E_{\mathrm{tol}}>0$ is a predeclared tolerance with units of energy. The observer-level relation $E_\gamma=h\nu$ is a recovery benchmark, not a substrate input. The signs of the $\Delta E$ terms are ledger signs, not assumptions about the outcome. A photon boost is allowed only when the intervening medium or target record supplies the energy; a photon depletion is allowed only when the lost photon energy is routed into a named medium, recoil, remnant, or thermalization entry.

For cosmology-facing packets, the same replay should expose whether the redshift channel also supplies the standard time-dilation and flux factors. The comparison target is
$$
\frac{\Delta t_{\mathrm{obs}}}{\Delta t_{\mathrm{emit}}}
=
1+z_X,
\qquad
F
=
\frac{L}{4\pi D_A^2(1+z_X)^4}
=
\frac{L}{4\pi d_L^2},
\qquad
d_L=(1+z_X)^2D_A
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ed2d332ff83e42bf)

Here $L$ is bolometric luminosity and $F$ bolometric received flux. These targets require a transparent metric propagation limit, photon-number conservation and consistent source/receiver clock, angular-distance and luminosity calibration. Packet arrival-time dilation is an additional recovery requirement, not a consequence of shifting one carrier frequency. Angular-distance reciprocity supplies two of the four redshift factors in the displayed $D_A$ denominator; energy and arrival-rate changes supply the other two. These are observer-level distance-ladder diagnostics. A path law that shifts line frequencies but does not dilate packet cadence, or that loses flux without the two redshift factors and angular-distance reciprocity, is not an acceptable cosmological redshift replacement.

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `line_family` | spectral family whose reference frequency is replayed |
| `comparison_line_family` | optional clean comparison family used for chromaticity diagnostics |
| `distance_mpc` | corrected Euclidean path length used for the local transfer slope |
| `B_X_E` | source-branch factor $B_X(E)$ |
| `D_v` | launch or relative-motion factor $D_v$ |
| `Gamma_N_E` | emitter endpoint Noether sea cadence factor $\Gamma_{N,E}$ |
| `Gamma_N_R` | receiver endpoint Noether sea cadence factor $\Gamma_{N,R}$ |
| `endpoint_records` | optional endpoint records from which $\Gamma_{N,E}$ and $\Gamma_{N,R}$ are extracted |
| `launch_record` | optional source/receiver velocity record from which $D_v$ is extracted |
| `segments` | path segments carrying $\Delta s_j$ and propagation coefficients |
| `continuity_transport_by_line` | optional segment-level continuity packet for $\mathbf p_X\cdot D_\gamma\boldsymbol\theta_{\mathrm{sea}}$, $\mathcal C_N[f_N]$, flow divergence, and anisotropic response |
| `transport_terms_by_line` | optional segment-level decomposition of $\alpha_{\mathrm{prop},X}$ into named source, relaxation, or perturbation terms |
| `transport_terms_cadence_by_line` | optional cadence-channel version of the same decomposition for time-dilation checks |
| `dark_energy_transport_by_line` | optional coefficient packet that computes $\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$ from a declared $\boldsymbol{\lambda}_X$ row and $\mathbf{q}_{\mathrm{DE}}$ record |
| `frequency_exchange_events_by_line` | proposed signed exchange records; the current executable does not read this field, integrate its shifts, or evaluate its energy residual |

Segment records may provide separate coefficient arrays for frequency, packet cadence, line-family comparison, and image-bundle beams. This is intentional: the first validation target is to expose when those channels agree and when they split.

Endpoint records may declare $\Gamma_N$ directly or provide a cadence measurement from which the same factor is computed:

$$
\Gamma_N
=
\frac{P_N}{P_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-13a3a8f06b1c1980)

In JSON, this is supplied as `Gamma_N`, `T_N_over_T_N0`, `Omega_N_over_Omega_N0`, or the weak-field proxy `Phi_N_over_c0_squared`, for which the fixture uses $\Gamma_N\approx1-\Phi_N/c_0^2$. The literal input key `T_N_over_T_N0` represents the period ratio $P_N/P_{N0}$; its spelling is preserved as a serialization contract. The weak-field proxy requires $|\Phi_N/c_0^2|\ll1$ and an omitted second-order error bound; the code checks positivity only. Conflicting endpoint representations are not cross-validated: their precedence is direct factor, period ratio, inverse cadence ratio, then weak-field proxy. Scalar `Gamma_N_E` and `Gamma_N_R` values remain valid fallbacks for older or hand-written scenarios.

The executable retains the following legacy comparison formula, which is not the current absolute-record launch target:

$$
\beta_r
=
\frac{(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}}}{c_0},
\qquad
D_v
=
\sqrt{\frac{1-\beta_r}{1+\beta_r}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0f2c441127207ad6)

The current Expansion Mechanism owner instead defines the absolute-record factor $D_v=(c_0-v_{R,k})/(c_0-v_{E,k})$, with projected endpoint velocities and a common homogeneous propagation calibration. Moving-clock effects belong in the endpoint ratio: only $(\Gamma_{N,R}/\Gamma_{N,E})D_v$ is required to recover the collinear relativistic frequency factor. Inserting the legacy square root as $D_v$ while also applying moving endpoint cadence can double-count that correction. The runtime and recorded mock values retain the legacy formula pending a separate implementation repair.

Here $\hat{\mathbf{k}}$ points from emitter to receiver and $v_r>0$ means increasing separation. The legacy and canonical launch factors agree only to first order in small endpoint speeds divided by $c_0$. The square root is exact in the collinear special-relativistic comparison only when $\beta_r$ is the correctly composed relative velocity, with $|\beta_r|<1$; for collinear velocities in one inertial frame this is $(\beta_R-\beta_E)/(1-\beta_R\beta_E)$. General noncollinear motion requires the full photon/observer contraction, including transverse effects. These are effective recovery comparisons, not primitive kinematics. A packet may provide `beta_r`, `radial_velocity_km_s`, or the triple `emitter_velocity_km_s`, `receiver_velocity_km_s`, and `line_of_sight`. Scalar `D_v` remains the fallback. This observer-level launch factor is not either causal-root factor from the Master Equation: it must not be serialized as the transmitter-side $D_t$, the receiver-side $D_r$, or the signed root-playback ratio $D_r/D_t$.

The continuity-transport extension is a reduced scalar ansatz evaluated on declared segment records:

$$
\alpha_{\mathrm{prop},X,j}
=
\mathbf p_X\cdot\mathbf d_{\theta,j}
+
p_{\nu,X}
\frac{
S_{\mathrm{BH},j}
+
S_{\mathrm{GW},j}
-
R_{\mathrm{eq},j}
-
\partial_\nu J_{\nu,j}
}{
f_{N,j}+\epsilon_f
}
+
p_{u,X}\delta_{u,j}
+
p_{\sigma,X}\sigma_{X,j}
+
\mathcal R_{\mathrm{coh},X,j}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-807179b1743cc166)

Here $\mathbf d_{\theta,j}$ is the path derivative of a declared dimensionless scalar-state projection, with units inverse length. The source-balanced ratio has inverse-absolute-time units when source terms are cadence-density rates. Thus $p_{\nu,X}$ and $p_{u,X}$ have time/length units, while $p_{\sigma,X}$ has inverse-stress/length units if $\sigma_X$ is stress; $\mathbf p_X$ is dimensionless and $\mathcal R_{\mathrm{coh}}$ has inverse-length units. Require positive $f_N$ on the sampled support and nonnegative $\epsilon_f$ in the same units. The ratio is not the clock-rate factor $C_N=\Gamma_N^{-1}$ and need not vanish for an exactly satisfied kinetic equation.

The full Noether Sea owner includes general population sources, a bounded kinetic remainder and a declared cadence-weighted scalar response. This toy reduces those to its named source fields and one supplied scalar; `S_BH` is a retained input key, not an assertion that black holes exhaust the population source. Its physical use needs an independent cadence projection and omitted-source/error bounds. The runtime does not perform that projection or convert continuity time rates to path units. Its legacy numbers must be read as already combined path-unit terms or supplied with appropriately dimensioned coefficients. In JSON, `continuity_transport_by_line` supplies `p_theta_row`, `D_gamma_theta`, `p_nu`, `f_N`, `S_BH`, `S_GW`, `R_eq`, `partial_nu_J_nu`, `p_u`, `div_u_sea`, `p_sigma`, `sigma_projection`, and `R_coh` as needed. The fixture logs the resulting pieces as `continuity.theta_gradient`, `continuity.cadence_residual`, `continuity.flow_divergence`, `continuity.anisotropic_response`, and `continuity.coherence_residue`. Scalar alpha, named terms, continuity terms and dark-energy terms are added, so they must represent nonoverlapping contributions; a previously total alpha must not be supplied alongside its decomposition. Colliding named keys are overwritten by computed continuity/dark-energy keys. Legacy named `transport_terms_by_line` values are still accepted as explicit additions, but a promotable transport scenario should prefer the continuity packet whenever it is claiming to test Noether sea equilibrium transport.

## Coefficient-Row Validation Notes

The physical interpretation requires each scenario to restrict one independently derived coefficient map. The executable only extracts supplied endpoint factors or ratios; it does not read, estimate or enforce the cadence coefficient row

$$
\mathbf b_N
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
1,\,
b_R
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbaa709a5d87fc7e)

The fixed shape coefficient one is inherited only under the homogeneous Lorentz branch’s remainder assumptions, not established by this runtime. The row is subject to the weak static condition $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$, or $b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1$ when the shared clock/signal delay closure is imposed. This fixture does not determine the individual endpoint coefficients; it checks whether endpoint records are replayed as endpoint cadence rather than hidden inside propagation or source factors.

The launch extraction replays its supplied factor without verifying the canonical endpoint/launch separation. With equal endpoint cadence factors and no source-branch or path-history contribution, the algebra reduces to

$$
Z_X=-\ln D_v,
\qquad
Y_{X,N}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff72ac7abe8a8156)

This tests arithmetic sign only; the legacy `launch_record` formula does not validate the current canonical ownership of moving-clock and launch terms. A scenario fails the coefficient-row reading if it needs a nonzero propagation packet to recover a clean relative-motion redshift.

The continuity packet tests only the path row

$$
\left(
\mathbf p_X,\,
p_{\nu,X},\,
p_{u,X},\,
p_{\sigma,X}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-014a4ac66ecbb7a1)

After endpoint, source-branch, and launch corrections have been subtracted, the residual must be

$$
Z_{\mathrm{prop},X}
=
\sum_j
\left[
\mathbf p_X\cdot\mathbf d_{\theta,j}
+p_{\nu,X}\mathcal C_{N,j}
+p_{u,X}\delta_{u,j}
+p_{\sigma,X}\sigma_{X,j}
+\mathcal R_{\mathrm{coh},X,j}
\right]
\Delta s_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a65bb5e5a0781b4)

The mock rows constrain products of coefficients with declared segment records; they do not by themselves fix $\mathbf p_X$, $p_{\nu,X}$, $p_{u,X}$, or $p_{\sigma,X}$ individually. For a constant $\mathbf p_X$ multiplying a true path derivative, the gradient integral is exactly $\mathbf p_X\cdot(\boldsymbol\theta_R-\boldsymbol\theta_E)$ on the selected scalar coordinates. It depends only on endpoint states, and common shifts of shared endpoint/path coefficient rows can leave total redshift unchanged. Independent clock calibration is required to separate them; more path samples do not remove that degeneracy. Independently measured diagnostics can constrain those freedoms: chromaticity residuals, image-bundle variance, time-dilation residuals, nonzero laboratory residuals, or a need to replace the continuity packet with unrelated named terms.

The dark-energy coefficient extension uses

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

[View →](../../../../../equation-mapping.html#corpus-equation-7a2ad8800789faee)

In JSON, `lambda_row` supplies the four dimensionless coefficients and `q_DE_per_s` supplies the corresponding rate entries in inverse seconds. The script divides by the declared photon-channel speed, using the per-record `c_gamma_km_s`, then the packet-level value, then `c0_km_s`, to convert the result into a path coefficient in $\mathrm{Mpc}^{-1}$. A packet may instead supply `q_DE_per_mpc` when the rate has already been converted into path units.

## Output Diagnostics

The v1 fixture reports the fields already emitted by `scripts/cosmology/redshift-budget-toy-model.mjs`. Four additional diagnostics remain schema targets and are labeled explicitly below rather than being attributed to the current runtime.

| Output field | Meaning |
| --- | --- |
| `diagnostics.Z_prop_X` | corrected propagation residual $Y_{X,N}$ |
| `diagnostics.Z_total_X` | total reconstructed logarithmic redshift $Z_X$ |
| `diagnostics.redshift_z` | observed redshift $z_X=\exp(Z_X)-1$ |
| `diagnostics.inferred_H_eff_km_s_Mpc` | short-path slope proxy $c_0Y_{X,N}/D$ |
| `diagnostics.chromaticity_residual` | $\left|Y_{X,N}-Y_{Y,N}\right|$ for two clean lines |
| `diagnostics.image_bundle_variance` | variance of beam-specific $Y$ values |
| `diagnostics.time_dilation_residual` | split between frequency and packet-cadence propagation |
| `diagnostics.luminosity_factor_residual` | **Not yet emitted by v1.** Planned mismatch between the replayed flux factor and $F=L/(4\pi D_A^2(1+z_X)^4)=L/(4\pi d_L^2)$ |
| `diagnostics.distance_reciprocity_residual` | **Not yet emitted by v1.** Planned mismatch in the observer-level $d_L=(1+z_X)^2D_A$ relation |
| `diagnostics.frequency_exchange_residual` | **Not yet emitted by v1.** Planned maximum or norm of the signed exchange energy-ledger residuals $R_{\nu\text{-}\mathrm{ex},j}$ |
| `diagnostics.path_transfer_sign` | **Not yet emitted by v1.** Planned classification of whether the corrected path term is net redward, net blueward, or balanced after endpoint, source, and launch terms are removed |
| `observables.nu_obs_hz` | receiver-facing observed frequency |
| `observables.E_obs_j` | receiver-facing photon energy |
| `component_logs` | endpoint, propagation, source-branch, and launch contributions to $Z_X$ |
| `transport_term_logs` | integrated named contributions to $Y_{X,N}$ for frequency and cadence channels |
| `extraction_logs` | endpoint and launch extraction methods, including scalar fallback versus record-derived values |

The diagnostics report arithmetic differences, with no scenario acceptance thresholds. Frequency and cadence can agree because the cadence channel falls back to frequency. More specifically, absence of cadence named transport terms causes an early fallback before separate cadence continuity or dark-energy packets are read; supplying those packets alone does not exercise their intended difference. When computed cadence transport exists, a frequency scalar alpha may also be omitted from the cadence path unless explicitly supplied there.

Missing comparison lines produce null chromaticity, and identical supplied coefficients give zero without independent spectral evidence. Missing beams produce an empty beam array but variance zero; shorter beam arrays repeat their last entry to match the longest array, and absent segment beam values use the main frequency coefficient. Explicit beam alphas are used as full coefficients without adding continuity or dark-energy terms. This variance is a population variance of supplied $Y$ values, not an angular ray-tracing or image-sharpness measurement. An explicit `distance_mpc` overrides the segment sum without an equality check, changing the slope proxy.

The reported $c_0Y/D$ is a finite-path average slope. It approximates a local derivative only with controlled short-path behavior and does not establish an expansion rate by itself. Default factors of one, ignored exchange fields and shared fallback channels are missing-evidence limitations, not successful physical tests.

## Expected Mock Behavior

The default mock packet has six hand-checkable rows.

| Scenario | Expected behavior |
| --- | --- |
| `clean_laboratory_line` | All factors are unity or zero, so $Z_{\mathrm{prop},X}=0$, $z=0$, and $H_{\mathrm{eff}}=0$. |
| `endpoint_launch_record_extraction` | Endpoint and launch factors are extracted from records: $\Gamma_{N,E}=1/0.995$, $\Gamma_{N,R}=1$, and $D_v\approx0.998501$. The path residual remains $Z_{\mathrm{prop},X}=0$, so the total redshift comes only from endpoint cadence plus launch geometry. |
| `clean_galaxy_path` | Path history dominates the corrected residual: $Z_{\mathrm{prop},X}=0.02812$, giving a local slope near $70.25\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$ while chromaticity, beam variance, and time-dilation residuals remain small. |
| `equilibrium_transport_smooth_h_step` | The continuity packet supplies $Z_{\mathrm{prop},X}=0.02800$, giving a local slope near $69.95\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$ with source and gravitational-wave contributions logged inside the source-balanced cadence residual. |
| `dark_energy_coefficient_packet` | The propagation coefficient is computed from `lambda_row` and `q_DE_per_s`, giving $Z_{\mathrm{prop},X}\approx0.02788$ and a local slope near $69.66\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$. |
| `strong_source_near_black_hole` | Endpoint cadence and source-branch terms dominate the total redshift. The path residual is only $Z_{\mathrm{prop},X}=0.00201$, so a propagation-only distance estimate would be invalid without the endpoint and source corrections. |

These numbers are fixture expectations only. They validate arithmetic, packet shape, and diagnostic separation, not an observed cosmological model.

## Failure Reading

The first failure modes are concrete:

| Diagnostic pattern | Meaning |
| --- | --- |
| large `chromaticity_residual` on clean lines | the supplied line-dependent path shifts violate the declared achromaticity tolerance; this alone does not identify an energy-loss mechanism |
| large `image_bundle_variance` | supplied beams accumulate different logarithmic shifts; image consequences require separate geometric-optics and angular records |
| large `time_dilation_residual` | frequency shift and packet-cadence stretch no longer share one propagation record |
| large `dark_energy.*` dominance with failed chromaticity or cadence checks | the declared handoff fails the cross-channel tolerance; its cause and whether coefficients were fitted require independent provenance review |
| continuity packet replaced by unrelated named source terms | the run is not testing the no-case-switch transport law because $\partial_\nu J_\nu$, source loading, equilibration, and flow response have been separated into free fit parameters |
| large total $Z_X$ with small $Z_{\mathrm{prop},X}$ | endpoint cadence, source branch, or launch geometry dominate, so distance cannot be inferred from propagation alone |
| nonzero laboratory residual after local corrections | the declared zero-propagation laboratory comparison fails; source, calibration, transport and numerical causes require separate diagnosis |

A promotable redshift-distance packet must keep these diagnostics attached to the same Noether sea state record that later feeds supernova, BAO, CMB, growth, and local-ladder comparisons.
