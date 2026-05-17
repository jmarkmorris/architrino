# Redshift-Budget Toy Model

This protocol documents the first redshift-budget simulation fixture for the cosmology branch. The fixture is a bookkeeping replay of the factorized redshift record in [Expansion Mechanism](../../cosmology/expansion-mechanism.md#minimal-redshift-budget-toy-model), not an empirical distance-ladder fit.

Its purpose is narrow: verify that endpoint cadence, source-branch state, launch geometry, and Noether-Sea path-history remain separable in a machine-readable packet before any survey-facing cosmology comparison is attempted.

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/cosmology/redshift-budget-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/cosmology/redshift-budget-mock.json
```

and emits one result row per scenario. The packet is deliberately dimensionless except for declared line frequencies, Euclidean path distance in megaparsecs, and the comparison constants $c_0$ and $h$.

## Replay Equation

For a line family $X$, the path record is divided into segments of length $\Delta s_j$. The propagation bookkeeping variable starts at

$$
Y_{X,0}=0,
$$

and advances by

$$
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X,j}\Delta s_j.
$$

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
-\ln D_v.
$$

The observed receiver-facing frequency and photon energy are

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}\exp(-Z_X),
\qquad
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs},X}.
$$

This is not an untracked photon-energy loss model. $Y_{X,N}$ is the path-history phase-cadence stretch left after endpoint cadence, source-branch shift, and launch geometry have been declared.

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `line_family` | spectral family whose reference frequency is replayed |
| `comparison_line_family` | optional clean comparison family used for chromaticity diagnostics |
| `distance_mpc` | corrected Euclidean path length used for the local transfer slope |
| `B_X_E` | source-branch factor $B_X(E)$ |
| `D_v` | launch or relative-motion factor $D_v$ |
| `Gamma_N_E` | emitter endpoint Noether-Sea cadence factor $\Gamma_{N,E}$ |
| `Gamma_N_R` | receiver endpoint Noether-Sea cadence factor $\Gamma_{N,R}$ |
| `segments` | path segments carrying $\Delta s_j$ and propagation coefficients |
| `transport_terms_by_line` | optional segment-level decomposition of $\alpha_{\mathrm{prop},X}$ into named source, relaxation, or perturbation terms |
| `transport_terms_cadence_by_line` | optional cadence-channel version of the same decomposition for time-dilation checks |
| `dark_energy_transport_by_line` | optional coefficient packet that computes $\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$ from a declared $\boldsymbol{\lambda}_X$ row and $\mathbf{q}_{\mathrm{DE}}$ record |

Segment records may provide separate coefficient arrays for frequency, packet cadence, line-family comparison, and image-bundle beams. This is intentional: the first validation target is to expose when those channels agree and when they split.

The equilibrium-transport extension uses named terms such as `equilibrium_relaxation`, `smbh_source`, and `gw_perturbation`. These terms are added to any explicit `alpha_prop` value for the segment. This keeps the fixture diagnostic: it can show whether a smooth coarse-grained Noether-core $h$-step relaxation current supplies the path coefficient, while still reporting whether SMBH loading or gravitational-wave perturbations dominate the result.

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
\right).
$$

In JSON, `lambda_row` supplies the four dimensionless coefficients and `q_DE_per_s` supplies the corresponding rate entries in inverse seconds. The script divides by the declared photon-channel speed, using `c_gamma_km_s` when present and otherwise `c0_km_s`, to convert the result into a path coefficient in $\mathrm{Mpc}^{-1}$. A packet may instead supply `q_DE_per_mpc` when the rate has already been converted into path units.

## Output Diagnostics

The fixture reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.Z_prop_X` | corrected propagation residual $Y_{X,N}$ |
| `diagnostics.Z_total_X` | total reconstructed logarithmic redshift $Z_X$ |
| `diagnostics.redshift_z` | observed redshift $z_X=\exp(Z_X)-1$ |
| `diagnostics.inferred_H_eff_km_s_Mpc` | short-path slope proxy $c_0Y_{X,N}/D$ |
| `diagnostics.chromaticity_residual` | $\left|Y_{X,N}-Y_{Y,N}\right|$ for two clean lines |
| `diagnostics.image_bundle_variance` | variance of beam-specific $Y$ values |
| `diagnostics.time_dilation_residual` | split between frequency and packet-cadence propagation |
| `observables.nu_obs_hz` | receiver-facing observed frequency |
| `observables.E_obs_j` | receiver-facing photon energy |
| `component_logs` | endpoint, propagation, source-branch, and launch contributions to $Z_X$ |
| `transport_term_logs` | integrated named contributions to $Y_{X,N}$ for frequency and cadence channels |

The diagnostics are not pass/fail cosmology claims. They are failure witnesses for the factorization itself.

## Expected Mock Behavior

The default mock packet has four hand-checkable rows.

| Scenario | Expected behavior |
| --- | --- |
| `clean_laboratory_line` | All factors are unity or zero, so $Z_{\mathrm{prop},X}=0$, $z=0$, and $H_{\mathrm{eff}}=0$. |
| `clean_galaxy_path` | Path history dominates the corrected residual: $Z_{\mathrm{prop},X}=0.02812$, giving a local slope near $70.25\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$ while chromaticity, beam variance, and time-dilation residuals remain small. |
| `equilibrium_transport_smooth_h_step` | Named equilibrium-transport terms supply $Z_{\mathrm{prop},X}=0.02800$, giving a local slope near $69.95\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$ with the gravitational-wave perturbation averaging small over the path. |
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
| large `dark_energy.*` dominance with failed chromaticity or cadence checks | the dark-energy handoff is acting like a fitted redshift source rather than a shared Noether-Sea transport coefficient |
| large total $Z_X$ with small $Z_{\mathrm{prop},X}$ | endpoint cadence, source branch, or launch geometry dominate, so distance cannot be inferred from propagation alone |
| nonzero laboratory residual after local corrections | the factorization leaks local calibration or source-branch effects into the propagation channel |

A promotable redshift-distance packet must keep these diagnostics attached to the same Noether-Sea state record that later feeds supernova, BAO, CMB, growth, and local-ladder comparisons.
