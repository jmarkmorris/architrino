# Redshift-Budget Toy Model

This protocol documents the first redshift-budget simulation fixture for the cosmology branch. The fixture is a bookkeeping replay of the factorized redshift record in [Expansion Mechanism](../../cosmology/expansion-mechanism.md#minimal-redshift-budget-toy-model), not an empirical distance-ladder fit.

A redshift budget is a receipt for a photon record. It separates endpoint cadence, source-branch state, launch geometry, path-history transport, and signed frequency exchange so that a line shift is not silently converted into one undifferentiated expansion variable.

Its purpose is narrow: verify that endpoint cadence, source-branch state, launch geometry, and Noether sea path-history remain separable in a machine-readable packet before any survey-facing cosmology comparison is attempted. The current packet also exposes the continuity-disciplined path-rate law, so source loading, equilibration, frequency-space current, flow divergence, and anisotropic response are not hidden as unrelated fitted terms.

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/cosmology/redshift-budget-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/cosmology/redshift-budget-mock.json
```

and emits one result row per scenario. The packet is deliberately dimensionless except for declared line frequencies, Euclidean path distance in megaparsecs, and the comparison constants $c_0$ and $h$. Here $h$ is the observer-level action benchmark used by the recovered photon energy-frequency map; it is not a substrate input.

## Replay Equation

For a line family $X$, the path record is divided into segments of length $\Delta s_j$. The propagation bookkeeping variable starts at

$$
Y_{X,0}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-262fcd74d54db9f3)

and advances by

$$
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X,j}\Delta s_j
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-36fa591663237b70)

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8cdca5def216b3bc)

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a5160b7940772df7)

This is not an untracked photon-energy loss model. $Y_{X,N}$ is the path-history phase-cadence stretch left after endpoint cadence, source-branch shift, and launch geometry have been declared.

The path-history term is signed. A positive increment in $Y_X$ is a redward frequency depletion relative to the clean emitted line, while a negative increment is a blueward frequency boost. For a segment-level exchange row,

$$
\Delta Y_{X,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{X,j}^{+}}{\nu_{X,j}^{-}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d90174afa41f1ed8)

with $\nu_{X,j}^{-}$ and $\nu_{X,j}^{+}$ measured in the same local comparison convention before and after the exchange. Sunyaev-Zeldovich-like mock rows should therefore be represented as signed exchange events rather than as a new expansion variable: a hot or coherently moving intervening medium may produce $\Delta Y_{X,j}^{\mathrm{ex}}<0$, while a lower-energy absorbing or relaxing segment may produce $\Delta Y_{X,j}^{\mathrm{ex}}>0$.

Each exchange row should also carry the local energy residual

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9cfc061db347e0cb)

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ed2d332ff83e42bf)
These are observer-level distance-ladder diagnostics. A path law that shifts line frequencies but does not dilate packet cadence, or that loses flux without the two redshift factors and angular-distance reciprocity, is not an acceptable cosmological redshift replacement.

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
| `frequency_exchange_events_by_line` | optional signed exchange rows with before/after photon frequency, medium energy change, recoil/remnant terms, and $R_{\nu\text{-}\mathrm{ex}}$ |

Segment records may provide separate coefficient arrays for frequency, packet cadence, line-family comparison, and image-bundle beams. This is intentional: the first validation target is to expose when those channels agree and when they split.

Endpoint records may declare $\Gamma_N$ directly or provide a cadence measurement from which the same factor is computed:

$$
\Gamma_N
=
\frac{T_N}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-13a3a8f06b1c1980)

In JSON, this is supplied as `Gamma_N`, `T_N_over_T_N0`, `Omega_N_over_Omega_N0`, or the weak-field proxy `Phi_N_over_c0_squared`, for which the fixture uses $\Gamma_N\approx1-\Phi_N/c_0^2$. Scalar `Gamma_N_E` and `Gamma_N_R` values remain valid fallbacks for older or hand-written scenarios.

Launch records compute the low-speed source/receiver geometry factor from the radial endpoint velocity,

$$
\beta_r
=
\frac{(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}}}{c_0},
\qquad
D_v
=
\sqrt{\frac{1-\beta_r}{1+\beta_r}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0f2c441127207ad6)

where $\hat{\mathbf{k}}$ points from emitter to receiver and $v_r>0$ means the endpoint separation is increasing. A packet may provide `beta_r`, `radial_velocity_km_s`, or the triple `emitter_velocity_km_s`, `receiver_velocity_km_s`, and `line_of_sight`. Scalar `D_v` remains the fallback. This observer-level launch factor is not either causal-root factor from the Master Equation: it must not be serialized as the transmitter-side $D_t$, the receiver-side $D_r$, or the signed root-playback ratio $D_r/D_t$.

The continuity-transport extension uses the segment packet

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-807179b1743cc166)

In JSON, `continuity_transport_by_line` supplies `p_theta_row`, `D_gamma_theta`, `p_nu`, `f_N`, `S_BH`, `S_GW`, `R_eq`, `partial_nu_J_nu`, `p_u`, `div_u_sea`, `p_sigma`, `sigma_projection`, and `R_coh` as needed. The fixture logs the resulting pieces as `continuity.theta_gradient`, `continuity.cadence_residual`, `continuity.flow_divergence`, `continuity.anisotropic_response`, and `continuity.coherence_residue`. Legacy named `transport_terms_by_line` values are still accepted as explicit additions, but a promotable transport scenario should prefer the continuity packet whenever it is claiming to test Noether sea equilibrium transport.

## Coefficient-Row Validation Notes

The fixture now reads each scenario as a restriction of the same coefficient-row map, not as a separate explanation for each redshift class. The endpoint extraction tests the cadence row

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cbaa709a5d87fc7e)

with the weak static condition $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$, or $b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1$ when the shared clock/signal delay closure is imposed. This fixture does not determine the individual endpoint coefficients; it checks whether endpoint records are replayed as endpoint cadence rather than hidden inside propagation or source factors.

The launch extraction tests the separate relative-motion term. In a homogeneous record with no source-branch or path-history contribution, the replay must reduce to

$$
Z_X=-\ln D_v,
\qquad
Y_{X,N}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ff72ac7abe8a8156)

The scalar launch fallback and `launch_record` extractor therefore validate the sign and ownership of the motion term. A scenario fails the coefficient-row reading if it needs a nonzero propagation packet to recover a clean relative-motion redshift.

The continuity packet tests only the path row

$$
\left(
\mathbf p_X,\,
p_{\nu,X},\,
p_{u,X},\,
p_{\sigma,X}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-014a4ac66ecbb7a1)

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3a65bb5e5a0781b4)

The mock rows constrain products of coefficients with declared segment records; they do not by themselves fix $\mathbf p_X$, $p_{\nu,X}$, $p_{u,X}$, or $p_{\sigma,X}$ individually. Those freedoms are falsified by the diagnostics already exposed here: chromaticity residuals, image-bundle variance, time-dilation residuals, nonzero laboratory residuals, or a need to replace the continuity packet with unrelated named terms.

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

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7a2ad8800789faee)

In JSON, `lambda_row` supplies the four dimensionless coefficients and `q_DE_per_s` supplies the corresponding rate entries in inverse seconds. The script divides by the declared photon-channel speed, using `c_gamma_km_s` when present and otherwise `c0_km_s`, to convert the result into a path coefficient in $\mathrm{Mpc}^{-1}$. A packet may instead supply `q_DE_per_mpc` when the rate has already been converted into path units.

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

The diagnostics are not pass/fail cosmology claims. They are failure witnesses for the factorization itself.

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
| large `chromaticity_residual` on clean lines | the path law is behaving like a line-dependent loss process rather than a shared transport law |
| large `image_bundle_variance` | neighboring beams accumulate incompatible $Y$ values, which threatens image sharpness |
| large `time_dilation_residual` | frequency shift and packet-cadence stretch no longer share one propagation record |
| large `dark_energy.*` dominance with failed chromaticity or cadence checks | the dark-energy handoff is acting like a fitted redshift source rather than a shared Noether sea transport coefficient |
| continuity packet replaced by unrelated named source terms | the run is not testing the no-case-switch transport law because $\partial_\nu J_\nu$, source loading, equilibration, and flow response have been separated into free fit parameters |
| large total $Z_X$ with small $Z_{\mathrm{prop},X}$ | endpoint cadence, source branch, or launch geometry dominate, so distance cannot be inferred from propagation alone |
| nonzero laboratory residual after local corrections | the factorization leaks local calibration or source-branch effects into the propagation channel |

A promotable redshift-distance packet must keep these diagnostics attached to the same Noether sea state record that later feeds supernova, BAO, CMB, growth, and local-ladder comparisons.
