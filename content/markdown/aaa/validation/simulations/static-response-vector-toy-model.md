# Static Response Vector Toy Model

The Noether sea is the ambient population of Noether braid assemblies. Its local cadence-stretch factor $\Gamma_N$ is the reference cadence divided by the local cadence; its reciprocal is the corresponding normalized clock-rate factor on the declared shared clock branch. The parameterized post-Newtonian (PPN) framework supplies an observer-level weak-gravity comparison.

This protocol documents the first replay fixture for the weak static response vector used in the $\Gamma_N$ geometry extraction target. It is a small arithmetic gate for the endpoint row in [Proper Time and Time Dilation](../../spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target) and the Shapiro-delay coefficient in [PPN Parameters](../../spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

The fixture is not an empirical PPN fit. It keeps the clock cadence row, the clock-rate row, and the signal-delay coefficient separate while the $\mathbb{A}\mathbb{A}\mathbb{A}$ constitutive response is still being derived.

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/spacetime/static-response-vector-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/spacetime/static-response-vector-mock.json
```

and emits one result row per scenario.

## Replay Equations

Use the stationary, isotropic, nondispersive, zero-shift comparison branch and fixed standard PPN chart of the linked PPN owner, with common asymptotic clock and ruler calibration. Let $U=-\Phi_N>0$ have speed-squared units, $c_0=c_{\mathrm{eff}}(\infty)$, and $u=U/c_0^2\ll1$. Normalize the positive density ratio $n$ and envelope scale $\lambda$ to one in the reference cell; take $R_{\mathrm{braid},0}>0$ and $\chi_{\mathrm{sea},0}=c_f/c_0>0$, which need not equal one. Numerical instantiations use $c_f=1$ without identifying it with $c_0$. For a weak static endpoint cell, write

$$
\ln n=a_n\frac{U}{c_0^2},\qquad
\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}}=a_\chi\frac{U}{c_0^2},\qquad
\ln\lambda=a_\lambda\frac{U}{c_0^2},\qquad
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}=a_R\frac{U}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-de1046c46595692a)

These are first-order expansions with an omitted $O(u^2)$ remainder in each component. The four-component response is a vector of dimensionless scalar feature derivatives, not a spatial vector or acceleration. This four-feature specialization holds the shape contribution zero at the retained order; isotropy alone does not establish that restriction. The cadence-stretch row, as a weak-redshift recovery target rather than a derived constitutive law, must satisfy

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-953a48797990d736)

while the inverse clock-rate row must satisfy

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae41bab5f949f37c)

The row-inverse condition checks

$$
b_i+\omega_i=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1c43cb618b3469c0)

for $i\in\{n,\chi,\lambda,R\}$. Coefficient inversion enforces reciprocal clock and cadence response throughout the declared four-dimensional feature domain. The two endpoint dot products alone only imply $(\mathbf b+\boldsymbol\omega)\cdot\mathbf a=0$ along one response direction; they do not determine all four coefficients.

The Shapiro-delay neighbor supplies

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-755895c36f9de785)

so the shared clock/signal delay residual is

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
=
a_\chi-a_\chi^{\mathrm{sig}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aaed5ebd81e127ec)

The supplied coefficients satisfy the shared-delay arithmetic only when $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ within the declared tolerance.

In the same weak static metric comparison with a common independently calibrated source potential, the GR-matching signal-deflection target is

$$
\gamma_{\mathrm{PPN}}=1,
\qquad
a_\chi^{\mathrm{sig}}=2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-002feaffad73d597)

while the clock endpoint must separately satisfy the cadence and inverse-clock equations above. A value $a_\chi^{\mathrm{sig}}\neq2$ misses that GR-matching coefficient under these assumptions; it is not by itself a clock/signal split, which is diagnosed by $\Delta_\chi^{\mathrm{clk\text{-}sig}}$. The fixture contains no orbital, hydrostatic, ray-tracing, or mass-inference calculation and establishes no galaxy or cluster lensing/dynamics equality.

## Minimal Shared-Delay Packet

The first admissible static endpoint packet is the shared scalar delay response specialization of the equations above. Define

$$
A_\chi\equiv1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-15c18a8f6475836f)

Assume $A_\chi\neq0$; at $\gamma_{\mathrm{PPN}}=-1$ the proposed pure-delay vector vanishes and cannot satisfy the endpoint target. The minimal response vector is

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

[View →](../../../../../equation-mapping.html#corpus-equation-b4087c75dcc2e063)

with cadence row

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

[View →](../../../../../equation-mapping.html#corpus-equation-45336e0578f5886a)

and inverse clock-rate row

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

[View →](../../../../../equation-mapping.html#corpus-equation-7fa5ee9f40685ed2)

For the GR-matching branch, this gives $A_\chi=2$, $a_\chi=2$, $b_\chi=1/2$, and $\omega_\chi=-1/2$. The `shared_delay_clean_gr_branch` row in the mock packet is exactly this replay. The `density_scale_compensated_branch` row samples the remaining compensated family, where nonzero $a_n$, $a_\lambda$, or $a_R$ are allowed only if the same cadence row still satisfies $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ and the inverse row remains $\omega_i=-b_i$.

## Pressure Bridge

Pressure-response packets can feed the same fixture after their anisotropic terms are separated from the isotropic static projection. Here $\delta\ln q$ denotes the logarithm of a ratio of positive endpoint values, with $R=R_{\mathrm{braid}}$. A fixed local coefficient row predicts these increments to first order; for a nonlinear constitutive map the neglected remainder is $O(\|\delta\mathbf g^P\|^2)$ and requires a separate bound. The script evaluates the linear ansatz exactly and does not estimate that remainder. For a pressure row $r$, the bridge uses

$$
\delta\mathbf{g}_r^{P}
=
\left(
\delta\ln n,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln\lambda,\,
\delta\ln R
\right)_r
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f0eb6c3085236f38)

and checks the pressure version of the cadence row:

$$
\widehat{\delta\ln\Gamma}_{N,r}^{P}
=
b_n\delta\ln n_r
+b_\chi\delta\ln\chi_{\text{sea},r}
+b_\lambda\delta\ln\lambda_r
+b_R\delta\ln R_r
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b46f88398900ea10)

The pressure cadence residual is

$$
\mathcal{R}_{\Gamma,r}^{P}
=
\widehat{\delta\ln\Gamma}_{N,r}^{P}
-\delta\ln\Gamma_{N,r}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-57966ac8e89f2e87)

The inverse clock-rate row must also close:

$$
\mathcal{R}_{C,r}^{P}
=
\left(
\omega_n\delta\ln n_r
+\omega_\chi\delta\ln\chi_{\text{sea},r}
+\omega_\lambda\delta\ln\lambda_r
+\omega_R\delta\ln R_r
\right)
+\delta\ln\Gamma_{N,r}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-101e700c091ae24f)

When `derive_response` is `gamma_normalized`, the fixture also forms a normalized static-equivalent response vector

$$
a_i^{P\to\Gamma}
=
\frac{\delta g_i^P}{\delta\ln\Gamma_N}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8828178bd959776)

This normalization requires nonzero $\delta\ln\Gamma_N$ and becomes ill-conditioned near zero relative to measurement uncertainty. With the same row it makes the normalized endpoint condition an algebraic rescaling of the pressure cadence condition, not an independent test. This normalization makes pressure rows replayable by the same endpoint arithmetic, but it does not convert pressure loading into a gravitational PPN branch. The `gamma_eff_sweep` diagnostic is only an algebraic comparison against $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$; a pressure-normalized value that closes for some formal $\gamma_{\mathrm{PPN}}$ is not a solar-system Shapiro result.

Anisotropic pressure entries, such as $\Delta\Pi^{\parallel-\perp}$ or deviatoric strain, must be either projected out before the isotropic static row is evaluated or carried in `anisotropic_residuals`. The isotropic $\Gamma_N$ row must not absorb directional pressure response as a hidden scalar coefficient. The script carries `anisotropic_residuals` as metadata; it does not perform a tensor projection or check its correctness.

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `gamma_eff` | PPN Shapiro-delay coefficient through $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$ |
| `gamma_eff_sweep` | optional list of trial $\gamma_{\mathrm{PPN}}$ values for the shared-delay diagnostic |
| `response` | static weak-potential response vector $(a_n,a_\chi,a_\lambda,a_R)$ |
| `pressure_bridge` | optional pressure row used to derive a normalized static-equivalent response vector |
| `cadence_row` | cadence-stretch coefficients $(b_n,b_\chi,b_\lambda,b_R)$ for $\ln\Gamma_N$ |
| `clock_rate_row` | inverse clock-rate coefficients $(\omega_n,\omega_\chi,\omega_\lambda,\omega_R)$ |
| `expect_shared_delay` | defaults to requiring shared delay; `false` waives this requirement rather than asserting a nonzero residual |
| `tolerance` | optional scenario-level residual tolerance |

## Output Diagnostics

The fixture reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.a_chi_sig` | signal-delay coefficient fixed by the PPN Shapiro map |
| `diagnostics.delta_chi_clk_sig` | shared clock/signal delay residual |
| `diagnostics.gamma_eff_sweep` | optional sweep of shared-delay residuals over trial $\gamma_{\mathrm{PPN}}$ values |
| `diagnostics.endpoint_sum` | cadence-stretch row sum |
| `diagnostics.endpoint_residual` | endpoint residual relative to $1$ |
| `diagnostics.clock_rate_sum` | inverse clock-rate row sum |
| `diagnostics.clock_rate_residual` | clock-rate residual relative to $-1$ |
| `diagnostics.row_inverse_residuals` | coefficient-by-coefficient residuals $b_i+\omega_i$ |
| `diagnostics.pressure_bridge` | optional pressure-row replay of $\mathcal{R}_{\Gamma}^{P}$, $\mathcal{R}_{C}^{P}$, and effective-speed identity |

These diagnostics test supplied arithmetic. In the current script, omitted cadence or clock rows produce null residuals with passing flags; missing coefficients within a supplied row default to zero. An omitted speed-identity observation also passes without evaluation. An explicit `response` takes precedence over pressure-derived normalization without a consistency check between the two. `gamma_eff_sweep` and anisotropic metadata do not determine scenario status. The command exits successfully even when result rows fail, so consumers must inspect both record completeness and the JSON statuses.

The effective-speed check, when both observations exist, evaluates $\delta\ln\chi_{\mathrm{sea}}+\delta\ln(c_{\mathrm{eff}}/c_f)=0$, an identity for a consistently defined delay factor at fixed $c_f$. It does not derive a constitutive speed law. Use finite numerical inputs and a nonnegative dimensionless tolerance; the script does not enforce positivity of underlying physical records, schema identity, or nonnegativity of the tolerance. A later measured response requires independent instrument provenance, uncertainty and truncation bounds, common branch calibration, and complete required rows before these arithmetic diagnostics can support physical comparison.

## Expected Mock Behavior

The default mock packet has five rows.

| Scenario | Expected behavior |
| --- | --- |
| `shared_delay_clean_gr_branch` | Passes with $\gamma_{\mathrm{PPN}}=1$, $a_\chi=2$, and $b_\chi=0.5$. |
| `density_scale_compensated_branch` | Passes with nonzero density, scale, and core-radius responses while preserving the endpoint and row-inverse constraints. |
| `split_clock_signal_delay_branch` | Fails shared-delay closure even though its endpoint and clock-rate rows close arithmetically. |
| `underclosed_clock_row` | Fails the endpoint and clock-rate sums while satisfying the shared-delay residual. |
| `pressure_bridge_fe_cr_toy_isotropic_projection` | Passes the pressure-projected cadence and clock-rate rows using the Fe/Cr toy isotropic projection, while correctly reporting that its pressure-normalized $a_\chi^{P\to\Gamma}=0.6$ is not the GR-matching Shapiro branch. |

The two failing rows are intentional failure witnesses. They show that a model can fit the static clock row while violating shared delay, or satisfy shared delay while underclosing the endpoint row. The pressure bridge row is a third kind of witness: it demonstrates that a pressure packet can close the isotropic $\Gamma_N$ arithmetic while still remaining outside the gravitational PPN interpretation.

## Compensated-Family Validation Result

The executable separates three claims that should not be collapsed.

First, the minimal shared-delay row passes the weak GR endpoint:

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
2,\,
0,\,
0
\right),
\qquad
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
\frac{1}{2},\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-02bdd1e32326471a)

Second, the density/scale-compensated row also passes the endpoint and inverse-row checks:

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0.25,\,
2,\,
-0.1,\,
0.05
\right),
\qquad
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eff82b8a77ad6499)

because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a2e5034aebc68bd6)

This is an admissibility witness for the compensated static family, not a derivation of those numbers.

Third, the Fe/Cr pressure bridge falsifies the $\chi_{\text{sea}}$-only shared row for the toy isotropic pressure projection. The pressure-normalized response is

$$
\mathbf{a}^{P\to\Gamma}
=
\left(
0,\,
0.6,\,
0,\,
0
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c0ee41fb50bd9e25)

so no single $\chi_{\text{sea}}$ coefficient can satisfy both

$$
b_\chi(2)=1,
\qquad
b_\chi(0.6)=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-794a88ddcbadfd48)

The incompatibility is conditional on these two pure-delay response vectors and one common coefficient row. The pure-delay pressure vector fixes $b_\chi=5/3$; retaining the static value $a_\chi=2$ would then require the sum of non-delay static contributions to equal $1-10/3=-7/3$. It does not require each such component to be nonzero. More generally, a pressure response with non-delay components does not require non-delay static responses: $\mathbf a^G=(0,2,0,0)$, $\mathbf a^P=(0,0.6,0.7,0)$ and $\mathbf b=(0,0.5,1,0)$ satisfy both dot products with target one.

For several normalized response records, a shared row exists exactly when the linear system whose rows are the response vectors and whose target entries are one is consistent; the row is unique only when those records span the four-dimensional feature space. The mock scenarios choose their rows separately and do not establish one universal coefficient row. Branch-derived responses and a justified common constitutive domain are needed to promote any component split beyond these algebraic witnesses.

The hydrogen spectral toy scan may replay this compensated row as a scaffold, but that replay is not evidence that the gravitational endpoint has acquired nonzero $a_n$, $a_\lambda$, or $a_R$. Those entries become promotable only when the hydrogen branch or another declared branch derives the same component split for the same Noether sea cell.
