# EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet

## Scope

- IDs owned: `EQ-06`, `EQ-24`, `EQ-25`.
- Status: priority-only closure packet.
- Source rows: [equation.md](equation.md) and [equation-mapping.md](equation-mapping.md).
- Do not promote this packet into reader-facing prose until the score recommendations are accepted and the missing coefficient/proof rows are supplied.

This packet treats continuum, acoustic/elastic, and thermodynamic equations as one ladder:

$$
\text{Noether braid population}
\rightarrow
\mathcal{N}_{\mathrm{sea}}
\rightarrow
\text{medium response}
\rightarrow
\text{finite-window statistical record}.
$$

The packet does not add a new ontology. The Euclidean void remains the fixed container; the Noether sea is the ambient physical medium; effective metric, fluid, acoustic, and statistical equations are comparison or observer-level readouts.

## Shared Retained Record

For a resolved region $W(t)\subset\Sigma_t$ and smoothing scale $\ell$, use the packet-local retained record

$$
\Theta_{\mathrm{sea}}^{(\ell,W)}
=
\left(
\{\Lambda_k,\mathbf X_k,\dot{\mathbf X}_k,E_k,\nu_{N,k},\mathcal H_k\}_{k\in\mathcal I_{\mathrm{sea}}},
W_\ell,
\mathcal H_{\partial W},
\mathcal L_{E\mathbf p\mathbf J}^{(W)}
\right).
$$

Here $\Lambda_k$ is the retained Noether braid closure label, $\mathbf X_k$ is the braid center, $\nu_{N,k}$ is the braid cadence state, $\mathcal H_k$ is the retained causal-wake and path-history record for that braid, $\mathcal H_{\partial W}$ records boundary wake/event input, and $\mathcal L_{E\mathbf p\mathbf J}^{(W)}$ is the energy, momentum, and angular-momentum event ledger over the window.

The coarse Noether sea variables are projections of this record:

$$
\rho_{\text{NS}}(\mathbf x,t)
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
m_{N,k}\,
W_\ell(\mathbf x-\mathbf X_k(t)),
$$

$$
\rho_{\text{NS}}\mathbf u_{\mathrm{sea}}
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
m_{N,k}\dot{\mathbf X}_k(t)\,
W_\ell(\mathbf x-\mathbf X_k(t)),
$$

$$
f_N(\nu,\mathbf x,t)
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
W_\ell(\mathbf x-\mathbf X_k(t))
\delta_{\eta_\nu}(\nu-\nu_{N,k}(t)).
$$

This makes the first mathematical object a low-moment projection from retained Noether braid population data. The central refinement test is that residuals decrease when $\ell$, the retained braid inventory, causal-wake memory, and boundary records are refined.

## EQ-06: Noether Sea Continuity And Moment Closure

### Standard Equation And Regime

The comparison/native continuum balance is the physical Noether braid density row:

$$
\partial_t\rho_{\text{NS}}
+
\nabla\cdot(\rho_{\text{NS}}\mathbf u_{\mathrm{sea}})
=
S_{\rho}
+
r_{\rho}.
$$

The regime is a resolved Noether sea window where individual Noether braid identities are not tracked by an observer-level continuum description, but their low moments are retained through $\Theta_{\mathrm{sea}}^{(\ell,W)}$.

### Current AAA Mapped Form

For any retained moment $a$ with branch-level weight $m_a(\Lambda_k,E_k,\nu_{N,k},\ldots)$, define

$$
M_a(\mathbf x,t)
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
m_a(k,t)W_\ell(\mathbf x-\mathbf X_k(t)),
$$

$$
J_a(\mathbf x,t)
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
m_a(k,t)\dot{\mathbf X}_k(t)W_\ell(\mathbf x-\mathbf X_k(t)).
$$

Then the moment balance is

$$
\partial_t M_a
+
\nabla\cdot J_a
=
S_a
+
r_a,
$$

with the accepted residual form

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

The density row is the special case $M_a=\rho_{\text{NS}}$ and $J_a=\rho_{\text{NS}}\mathbf u_{\mathrm{sea}}$.

### Noether Braid Variables

- Retained closure label $\Lambda_k$ for each Noether braid branch in the window.
- Braid center $\mathbf X_k(t)$ and drift $\dot{\mathbf X}_k(t)$.
- Branch energy $E_k$, cadence $\nu_{N,k}$, orientation, strain, envelope ratio $\xi_k$, and scale variables such as $\lambda_k$ when retained.
- Causal-wake and path-history record $\mathcal H_k$.
- Boundary wake/event input $\mathcal H_{\partial W}$.

### Noether Sea Variables

- Physical Noether braid density $\rho_{\text{NS}}(\mathbf x,t)$.
- Normalized Noether braid density $n(\mathbf x,t)=\rho_{\text{NS}}(\mathbf x,t)/\rho_{\text{NS},0}$.
- Noether sea drift $\mathbf u_{\mathrm{sea}}(\mathbf x,t)$.
- Medium energy density $e_{\mathrm{sea}}$.
- Orientation, delay, envelope, and strain package $\boldsymbol\theta_{\mathrm{sea}}$.
- Cadence distribution $f_N(\nu,\mathbf x,t)$.
- Noether sea delay factor $\chi_{\text{sea}}(\mathbf x,t)$ and cadence stretch $\Gamma_N(\mathbf x,t)$ when the moment projects into clock, signal, or redshift rows.

### Rows Needed

- `density_row`: $\rho_{\text{NS}}$, $\rho_{\text{NS}}\mathbf u_{\mathrm{sea}}$, $S_{\rho}$, $r_{\rho}$.
- `cadence_row`: $f_N$, $J_\nu$, $S_{\mathrm{BH}}$, $S_{\mathrm{GW}}$, $R_{\mathrm{eq}}[f_N]$, cadence residual.
- `orientation_strain_row`: retained orientation/strain tensor and residual.
- `energy_event_row`: $\mathcal L_{E\mathbf p\mathbf J}^{(W)}$ with boundary flux and medium excitation terms.
- `wake_boundary_row`: causal-wake admissibility and $\mathcal H_{\partial W}$.
- `moment_refinement_row`: declared refinement sequence and observed behavior of $\mathcal R_{\mathrm{mom}}$.

### `6/23 b` Score Recommendation

Recommend `4` unchanged.

Justification: EQ-06 already has a native equation-level form, canonical variables, and an explicit residual. This packet supplies the concrete low-moment projection object, but it does not yet prove that the projection converges from resolved Noether braid population dynamics or that the residual decreases in an executed refinement family. A `5` would require that proof or an executable convergence packet.

### First Mathematical Object

Add a density-and-cadence projection lemma:

> For a neutral Noether braid population with retained record $\Theta_{\mathrm{sea}}^{(\ell,W)}$, the projected density $\rho_{\text{NS}}$ and cadence distribution $f_N$ obey the stated continuity equations up to residuals $r_{\rho}$ and $r_N$ consisting only of boundary flux, source/loading terms, unresolved causal-wake memory, and smoothing error.

The first proof step is differentiating the smoothed sums above and classifying every leftover term as boundary crossing, source/loading, branch retuning, or smoothing residual.

### Failure Mode

EQ-06 fails if $\mathcal R_{\mathrm{mom}}$ does not decrease under refinement, if $S_{\rho}$ hides unbalanced substrate creation, if the cadence row used for $\Gamma_N$ is not the same row used for $f_N$, or if separate observables require incompatible $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, or $\Gamma_N$ records.

### Promotion Targets

- `content/markdown/aaa/spacetime/noether-sea.md`
- `content/markdown/aaa/spacetime/emergent-metric.md`
- `content/markdown/aaa/spacetime/gravitational-waves.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`

Promote only after the density/cadence projection lemma has a derivation or executable residual test.

## EQ-24: Fluid, Elastic, And Acoustic-Medium Equations

### Standard Equation And Regime

The useful comparison is the acoustic metric form

$$
(g_{\mathrm{ac}})_{\mu\nu}
\propto
\frac{\rho_0}{c_s}
\begin{pmatrix}
-(c_s^2-\lVert\mathbf u\rVert^2) & -u_j \\
-u_i & h_{ij}
\end{pmatrix}.
$$

Elastic comparison equations enter through stress-strain response, schematically

$$
\delta\sigma_{ij}
=
C_{ij}{}^{kl}\delta\epsilon_{kl}
+
r_{\sigma,ij}.
$$

The regime is long-wavelength perturbation, clock, signal, or material-response behavior of a Noether sea window where a continuum readout is justified as a low-moment projection, not as substrate ontology.

### Current AAA Mapped Form

For a declared perturbation or observer channel $X$, the Noether sea comparison target is

$$
g_{\mu\nu}^{\mathrm{eff},X}
=
\mathcal G_{\mu\nu}^{X}[\mathcal N_{\mathrm{sea}}]
+
\mathcal R_{\mathrm{metric}}^{X},
$$

with

$$
\mathcal N_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
\mathbf u_{\mathrm{sea}},
e_{\mathrm{sea}},
\boldsymbol\theta_{\mathrm{sea}},
f_N
\right).
$$

Coefficient translation:

| Acoustic or elastic coefficient | Noether sea mapping |
| --- | --- |
| $\rho_0$ | $\rho_{\text{NS}}$ or $n\rho_{\text{NS},0}$ for the declared window. |
| $\mathbf u$ | $\mathbf u_{\mathrm{sea}}$ in the retained medium-flow row. |
| $c_s$ | Declared perturbation-channel speed from the constitutive response; for signal rows this must be compatible with $c_{\text{eff}}=c_f/\chi_{\text{sea}}$. |
| $h_{ij}$ | Euclidean metric for substrate spatial calculations; observer-level compliance uses $e^a{}_i$ and $\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j$. |
| $\rho_0/c_s$ conformal prefactor | Missing normalization row fixed by energy density, response amplitude, and channel calibration; must not be refit per observable. |
| $C_{ij}{}^{kl}$ | Branch-derived response kernel from density, orientation, strain, pressure, and $\mathcal M_{\mathrm{sea}}^{ab}$ rows. |
| stress or noise fluctuations | $\Sigma_{\mathrm{sea},X}^{ab}$ and correlation projections from unresolved deterministic histories. |

The constitutive response row has the packet target

$$
\delta Y_A(\omega,\mathbf k)
=
\sum_B
\chi_{AB}(\omega,\mathbf k)\delta X_B(\omega,\mathbf k)
+
R_A^\chi,
$$

with delayed support in time and the frequency-space causality residual

$$
\mathcal R_{\mathrm{KK}}(\chi_{AB})
=
\frac{
\left\|
\operatorname{Re}\chi_{AB}(\omega)
-
\mathcal H(\operatorname{Im}\chi_{AB})(\omega)
\right\|_{\omega}
}{
\left\|\operatorname{Re}\chi_{AB}\right\|_{\omega}
+
\left\|\mathcal H(\operatorname{Im}\chi_{AB})\right\|_{\omega}
+
\varepsilon
}.
$$

### Noether Braid Variables

- Branch label $\Lambda_k$ and branch stability data for the local Noether braid population.
- Orientation, envelope deformation, $\xi_k$, $\lambda_k$, strain, and packing/exclusion state.
- Branchwise response to compression, shear, alignment, and cadence retuning.
- Causal-wake path history and boundary event rows for perturbations entering or leaving the window.

### Noether Sea Variables

- $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$.
- $\chi_{\text{sea}}$, $c_{\text{eff}}$, $\Gamma_N$, $f_N$, and $J_\nu$.
- Stress/compliance tensor rows, including $\Sigma_{\mathrm{sea},X}^{ab}$ and $\mathcal M_{\mathrm{sea}}^{ab}$ where the channel uses metric or pressure response.
- ADM/Cartan readout fields $N$, $u^i_{\mathrm{sea}}$, $e^a{}_i$, and $\gamma_{ij}$ for observer-level metric comparisons.

### Rows Needed

- `channel_declaration_row`: identifies whether $X$ is a perturbation, clock, signal, pressure, material, or acoustic comparison channel.
- `speed_row`: derives $c_X$ or states the missing coefficient; signal rows must respect $c_{\text{eff}}=c_f/\chi_{\text{sea}}$.
- `stress_strain_row`: maps $\delta X_B$ to $\delta Y_A$ through one response kernel $\chi_{AB}$.
- `causality_row`: delayed support or $\mathcal R_{\mathrm{KK}}$ for the response kernel.
- `metric_embedding_row`: embeds scalar delay or perturbation speed into $N$, $u^i_{\mathrm{sea}}$, $e^a{}_i$, and $\gamma_{ij}$ when a metric claim is made.
- `correlation_row`: supplies $C_{AB}^{\theta}(x,y)$ from retained deterministic histories instead of an independent stochastic field.

### `6/23 b` Score Recommendation

Accepted table score: `3`.

Justification: EQ-24 now has a direct coefficient translation table, declared missing rows, and explicit residuals for metric, constitutive, causality, and correlation closure. The row remains at `3` because no acoustic, elastic, stress-strain, delayed-support, or $\mathcal R_{\mathrm{KK}}$ coefficient has been executed from a retained Noether sea population. The next score-4 route is one shared coefficient extraction that predicts a perturbation speed and stress/strain or metric response without changing $\Theta_{\mathrm{sea}}^{(\ell,W)}$.

### First Mathematical Object

Add a single-channel acoustic/elastic coefficient table as an executable target:

$$
\mathcal C_X:
(\rho_{\text{NS}},n,\mathbf u_{\mathrm{sea}},f_N,\chi_{\text{sea}},\Gamma_N,\Sigma_{\mathrm{sea},X}^{ab})
\mapsto
(A_X,c_X,\gamma_{ij}^{X},C_{ij}{}^{kl},\mathcal R_{\mathrm{metric}}^{X},\mathcal R_{\mathrm{KK}}^{X}).
$$

The first proof or simulation step is to choose one channel $X$ and verify that the same coefficient row predicts both a perturbation speed and a stress/strain response without changing $\Theta_{\mathrm{sea}}^{(\ell,W)}$. The conservative first route is the stress/strain path, not the metric path: speed plus one bulk stress/strain coefficient is enough for the first retained coefficient packet, while lapse, spatial metric, effective coupling, pressure, and low-acceleration outputs should remain explicitly missing until derived from the same retained window.

The smallest shared extraction is the density-compression column of the constitutive row. For one declared channel $X$ and one retained window $\Theta_{\mathrm{sea}}^{(\ell,W)}$, define

$$
\delta\mathbf y_X
=
\left(
\delta c_X^2,
\delta C_{ij}{}^{kl},
\delta N,
\delta\gamma_{ij},
\delta G_{\mathrm{eff}},
\delta P_{\mathrm{eff}},
\delta a_\star
\right)^T
=
\mathsf J_{\mathrm{sea}}^X
\left[
\Theta_{\mathrm{sea}}^{(\ell,W)}
\right]
\delta\ln n
+
\mathbf r_X.
$$

Accept the coefficient extraction only if the same $\mathsf J_{\mathrm{sea}}^X$ supplies the perturbation speed and at least one stress/strain or metric-compliance coefficient, while $G_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, and $a_\star$ are either projected from that same row or explicitly reported as missing outputs.

For the first accepted stress/strain packet, the minimal target is

$$
\delta\mathbf y_{\rho}^{X,\min}
=
\left(
\delta c_X^2,\,
\delta C_{\mathrm{bulk}}^X,\,
\varnothing,\,
\varnothing,\,
\varnothing,\,
\varnothing,\,
\varnothing
\right)^T
=
\mathsf J_{\rho}^{X}
\left[
\Theta_{\mathrm{sea}}^{(\ell,W)}
\right]\delta\ln n
+
\mathbf r_{\rho}^{X}.
$$

This target does not claim metric, weak-gravity, pressure, or low-acceleration recovery. It only tests whether one retained Noether sea window supplies speed plus bulk stress/strain without hidden retune.

$$
\mathcal R_{\mathrm{CJ}}^X
=
\frac{
\left\|\mathbf r_X\right\|
}{
\left\|\delta\mathbf y_X\right\|
+
\left\|\mathsf J_{\mathrm{sea}}^X\delta\ln n\right\|
+
\varepsilon
}
+
\lambda_{\mathrm{proj}}
\mathcal R_{\mathrm{proj}}^X(\Theta_{\mathrm{sea}}^{(\ell,W)},\ell)
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}^X.
$$

This row is a shared coefficient-extraction target, not a new score gate. It can support later `EQ-06`, `EQ-07` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32` movement only after it is populated on a retained window, reports refinement behavior, and does not split $\Theta_{\mathrm{sea}}^{(\ell,W)}$ between perturbation speed, stress/metric response, effective coupling, pressure, and low-acceleration response.

### Executable Density-Compression Surface Slice

The score-neutral runner is [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs), with a deliberately incomplete mock input in [noether-sea-density-compression-surface-slice-mock.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-mock.json) and a retained-attempt skeleton in [noether-sea-density-compression-surface-slice-retained-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json).

Command:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --summary --pretty
```

Default summary:

| Field | Result |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Supported rows | `EQ-06`, `EQ-07`, `EQ-08`, `EQ-09`, `EQ-10`, `EQ-11`, `EQ-20`, `EQ-24`, `EQ-32` |
| Missing $\Theta_{\mathrm{sea}}$ rows | `rho_NS`, `n`, `u_sea`, `e_sea`, `theta_sea`, `f_N`, `event_ledger_ref` |
| Missing response rows | `channel_declaration_row`, `speed_row`, `causality_row`, `correlation_row`, `stress_strain_row_or_metric_embedding_row` |
| Missing outputs | `delta_C_ij_kl`, `delta_gamma_ij`, `delta_G_eff`, `delta_a_star` |
| First blocker | `missing_accepted_theta_sea_rho_NS` |
| Same-record gate | `fail` |
| Speed plus stress/metric gate | `fail` |
| Numeric acoustic/elastic agreement | `passed` in the retained attempt |
| Accepted acoustic/elastic agreement | `attempt_numeric_passed` in the retained attempt |

The mock surface vector computes only the declared entries: `delta_c_X_squared=0.0025`, `delta_N=-0.0005`, and `delta_P_eff=0.0012` for `delta_ln_n=0.001`. The retained-attempt skeleton also declares a stress/strain coefficient and an acoustic/elastic agreement row, but it still blocks because `attempt` rows are not accepted retained rows. The retained-attempt run reports `nextBlocker=missing_accepted_theta_sea_rho_NS`. The runner now reports row-level status maps for retained $\Theta_{\mathrm{sea}}$ rows, required response rows, stress/metric rows, and the `acousticElasticAgreement` diagnostic. It also reports `consumerReadiness` for downstream rows: `EQ-24` requires `delta_c_X_squared` and `delta_C_ij_kl`; `EQ-11` requires `delta_N`, `delta_gamma_ij`, and `delta_G_eff`; `EQ-20` requires `delta_P_eff`; and `EQ-32` requires `delta_a_star`. In the retained attempt, `EQ-24` has `projectionStatus=projected` but remains `readiness=blocked` because `sliceBlocker=missing_accepted_theta_sea_rho_NS`; `EQ-11`, `EQ-20`, and `EQ-32` report `blocked_declared_missing_output` for their first missing projections. In the retained attempt, all retained $\Theta_{\mathrm{sea}}$ rows and required response rows report `attempt`, `stress_strain_row` reports `attempt`, `metric_embedding_row` reports `declared_missing_output`, `numericAgreementStatus` reports `passed`, and `acousticElasticAgreementStatus` reports `attempt_numeric_passed`. The runner requires retained row references, a speed coefficient plus stress/strain or metric-compliance coefficient content, delayed-support and correlation evidence, explicit missing outputs, a source-backed zero-retune witness, and an accepted same-window acoustic/elastic agreement row before returning `populated`. Accepted-looking rows with placeholder source strings such as pending or placeholder sources are reported as non-concrete rather than accepted; accepted-looking rows with nonresolving source references report `accepted_without_existing_source`; accepted-looking retune witnesses without source-backed witness references report `accepted_without_concrete_retune_source`, `accepted_without_existing_retune_source`, or `accepted_without_retune_witness_reference`. Source references must resolve to durable source/evidence files, not temp files or generated reading copies. Running with `--require-populated` exits nonzero until those rows are supplied.

#### Minimum Accepted Density-Compression Bundle

The nearest single-row score movement is `EQ-24` from `3` to `4`, but only if one retained window populates a source-backed density-compression coefficient bundle. The minimum accepted bundle is:

| Bundle coordinate | Minimum accepted content | Current blocker state |
| --- | --- | --- |
| $\rho_{\text{NS}}$ | Accepted physical Noether braid density row on $\Theta_{\mathrm{sea}}^{(\ell,W)}$. | First blocker: `missing_accepted_theta_sea_rho_NS`. |
| $n$ | Accepted normalized density row on the same retained window. | `attempt`. |
| $\mathbf u_{\mathrm{sea}}$ | Accepted Noether sea flow row on the same retained window. | `attempt`. |
| $e_{\mathrm{sea}}$ | Accepted energy row on the same retained window. | `attempt`. |
| $\boldsymbol\theta_{\mathrm{sea}}$ | Accepted orientation/strain row on the same retained window. | `attempt`. |
| $f_N$ | Accepted cadence row on the same retained window. | `attempt`. |
| `event_ledger_ref` | Accepted event/window ledger reference binding the retained support. | `attempt`. |
| `channel_declaration_row` | Accepted declaration of the density-compression acoustic or elastic channel $X$. | `attempt`. |
| `speed_row` | Accepted row producing $\delta c_X^2$ from $\mathsf J_{\rho}^{X}\delta\ln n$. | `attempt`. |
| `stress_strain_row` | Accepted row producing at least $\delta C_{\mathrm{bulk}}^X$ from the same $\mathsf J_{\rho}^{X}\delta\ln n$. | `attempt`. |
| `acoustic_elastic_agreement_row` | Accepted, source-backed row binding the same window, $\ell$, channel, response kernel, `speed_row`, `stress_strain_row`, $\rho_{\text{NS}}$ row, zero-retune witness, and refinement family while reporting $c_{X,\mathrm{disp}}^2$, $C_{1111}^X$, $\rho_{\text{NS}}$, and $\varepsilon_{\mathrm{ref}}$. | Numeric pass only; agreement row is still `attempt`. |
| `causality_row` | Accepted delayed-support or $\mathcal R_{\mathrm{KK}}$ row for the same response kernel. | `attempt`. |
| `correlation_row` | Accepted same-window deterministic-history correlation row. | `attempt`. |
| Missing-output declarations | Explicit declarations for $\delta N$, $\delta\gamma_{ij}$, $\delta G_{\mathrm{eff}}$, $\delta P_{\mathrm{eff}}$, and $\delta a_\star$ until derived. | Declared missing in the retained attempt. |
| Retune witness | Accepted source-backed witness with residual zero and no changed rows. | `attempt`. |

Every accepted row must use status `accepted`, `passed`, or `populated`, include a concrete row or event reference, and resolve to a durable source/evidence file. A placeholder source, generated reading copy, temp artifact, directory path, or bare retained label does not count.

This bundle is the score-4 evidence object. It does not claim metric, weak-gravity, pressure, or low-acceleration recovery; those remain explicit missing outputs until projected from the same retained coefficient row.

The artifact-vs-physics discriminator is same-window agreement between acoustic speed and elastic response. For one channel $X$, compute

$$
c_{X,\mathrm{disp}}^2
\quad\text{from the dispersion slope,}
\qquad
c_{X,\mathrm{el}}^2
=
\frac{C_{1111}^{X}}{\rho_{\text{NS}}}
\quad\text{from the elastic coefficient.}
$$

An accepted density-compression packet must satisfy

$$
\left|
c_{X,\mathrm{disp}}^2-c_{X,\mathrm{el}}^2
\right|
\le
\varepsilon_{\mathrm{ref}}(\ell),
\qquad
\varepsilon_{\mathrm{ref}}(\ell)\to0
\quad\text{as}\quad
\ell\to0,
$$

with both values read from the same $\Theta_{\mathrm{sea}}^{(\ell,W)}$, the same $\mathsf J_{\rho}^{X}$, and the same delayed-support or $\mathcal R_{\mathrm{KK}}$ response row. The executable row deliberately separates `numericAgreementStatus` from `acousticElasticAgreementStatus`: arithmetic agreement can be `passed` while the same-window agreement remains `attempt_numeric_passed` because the agreement row is not accepted and source-backed. A coefficient that agrees only at one discretization scale, or agrees numerically without accepted same-window provenance, is an artifact signal, not `EQ-24` score evidence.

### Failure Mode

EQ-24 fails if the acoustic metric is imported as a visual analogy, if $c_s$ is replaced by an unconstrained fitted speed, if scalar $\chi_{\text{sea}}$ is treated as a full metric without $N$, $u^i_{\mathrm{sea}}$, $e^a{}_i$, and $\gamma_{ij}$, if stress-strain coefficients are tuned per material/observable, or if the response kernel violates delayed support.

### Promotion Targets

- `content/markdown/aaa/spacetime/noether-sea.md`
- `content/markdown/aaa/spacetime/emergent-metric.md`
- `content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md`
- `content/markdown/aaa/nuclear-atomic/condensed-matter.md`
- `content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md`

Promote only after one channel supplies a shared coefficient row and residual behavior rather than a prose analogy.

## EQ-25: Thermodynamic, Boltzmann, Entropy, And Fluctuation Equations

### Standard Equation And Regime

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

The regime is a finite Noether sea, apparatus, radiation, CMB, or material window where deterministic unresolved degrees of freedom are projected into an effective statistical law. The statistical law is not ontic randomness.

### Current AAA Mapped Form

For a declared coarse-graining $\mathcal Q$, retained region $W(t)$, and measure $\mu$ on compatible reduced states,

$$
S_{\mathcal Q,W}(t)
=
k_B\log\mu(\Gamma_{\mathcal Q,W(t)}).
$$

The entropy balance target is

$$
\frac{dS_{\mathcal Q,W}}{dt}
=
\sigma_W(t)
-
\int_{\partial W(t)}
\mathbf J_S\cdot\hat{\mathbf n}\,dA
+
\mathcal R_{\mathcal Q}(t).
$$

The deterministic pushforward target is

$$
\mu_{t+\Delta t}^{\mathcal Q,W}
=
\Pi_{\mathcal Q,W\,*}\Phi_{\Delta t\,*}\mu_t
+
\mathcal R_{\mathrm{coarse}},
$$

where $\Phi_{\Delta t}$ is the deterministic substrate flow over the window and $\Pi_{\mathcal Q,W}$ is the declared projection. A Boltzmann-like equation is admissible only when the projected update can be written as

$$
\frac{d f_{\mathcal Q,W}}{dt}
=
C_{\mathrm{eff}}[f_{\mathcal Q,W};\Theta_{\mathrm{sea}}^{(\ell,W)}]
+
\mathcal R_{\mathrm{Boltz}},
$$

with $C_{\mathrm{eff}}$ derived from unresolved branch mixing, boundary exchange, event-ledger routing, thermalization channels, and Noether sea mixing.

For CMB or radiation thermalization, reuse the existing diagnostic:

$$
\mathcal D_{\mathrm{th}}(\nu;t_a,t_b)
=
\int_{t_a}^{t_b}\tau_{\mathrm{th}}^{-1}(\nu,t)\,dt,
$$

with $\tau_{\mathrm{th}}^{-1}$ decomposed into event-recorded channels such as planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange.

### Noether Braid Variables

- Compatible reduced state space $\Gamma_{\mathcal Q,W(t)}$ built from retained Noether braid branch labels, causal-root admissibility, path-history compatibility, and boundary data.
- Branch cadence and energy labels $(\nu_{N,k},E_k)$.
- Event participation, source depletion, recoil, medium excitation, and identity routing for thermal/radiation windows.
- Basin or metastable measure when the statistical law is a measurement or record law.

### Noether Sea Variables

- $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$.
- $f_N$, $J_\nu$, $R_{\mathrm{eq}}[f_N]$, $S_{\mathrm{BH}}$, $S_{\mathrm{GW}}$ when the statistical law uses cadence transport.
- $\chi_{\text{sea}}$, $\Gamma_N$, $\mathcal M_{\mathrm{sea}}^{ab}$, and thermalization-depth rows for CMB/cosmology.
- Apparatus/environment state rows for measurement entropy and record locking.

### Rows Needed

- `state_space_row`: defines $\Gamma_{\mathcal Q,W(t)}$, $\mathcal Q$, $W(t)$, and $\mu$.
- `deterministic_pushforward_row`: defines $\Phi_{\Delta t}$ and $\Pi_{\mathcal Q,W}$.
- `collision_operator_row`: derives or rejects $C_{\mathrm{eff}}$ from deterministic unresolved variables.
- `entropy_balance_row`: supplies $\sigma_W$, $\mathbf J_S$, and $\mathcal R_{\mathcal Q}$.
- `thermalization_depth_row`: decomposes $\tau_{\mathrm{th}}^{-1}$ into event-recorded channels.
- `record_locking_row`: for measurement, checks $\Delta S_{\mathcal Q,W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}>0$ and restartability residuals.
- `fluctuation_row`: supplies two-point or higher correlation projections from retained deterministic histories.
- `event_ledger_row`: closes energy, momentum, angular momentum, recoil, medium, remnant, identity, and boundary rows before a thermal law is accepted.

### `6/23 b` Score Recommendation

Recommend `3`.

Justification: EQ-25 moves beyond a loose comparison because the packet identifies a finite-window state count, deterministic pushforward, entropy balance, thermalization-depth diagnostic, and required event rows. It should not be scored `4` until a concrete $C_{\mathrm{eff}}$, entropy-production term, or thermalization record is derived for one selected window and shown to share variables with radiation, measurement, CMB, or Noether sea transport.

### First Mathematical Object

Build one finite-window entropy and pushforward packet for CMB thermalization:

$$
\left(
\Gamma_{\mathcal Q,W},
\mu,
\Phi_{\Delta t},
\mathcal D_{\mathrm{th}},
\mathcal L_{E\mathbf p\mathbf J}^{(W)},
\mathcal R_{\mathrm{Boltz}},
\mathcal R_{\mathcal Q}
\right).
$$

The first calculation is to pick a source-to-decoupling path, decompose $\tau_{\mathrm{th}}^{-1}$ into recorded event channels, and test whether $\mathcal D_{\mathrm{th}}\gg1$ and zero effective photon chemical potential can be stated without changing $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, or radiation event rows between local radiation and CMB use.

The finite-window thermodynamic route is now executable in [eq25-thermodynamic-record-residual.mjs](../../../scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs). Its attempt fixture [eq25-thermodynamic-record-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-attempt.v1.json) blocks first at `missing_accepted_theta_therm` while the state-space, deterministic-pushforward, collision-operator, entropy-balance, thermalization-depth, fluctuation, source-provenance, no-hidden-retune, and negative-control diagnostics pass. This makes the `EQ-25` route fail closed without raising scores: accepted source-backed state-space, coarse-graining, measure, pushforward, collision/projection, entropy-balance, thermalization-depth, fluctuation, event-ledger, shared Noether sea, source-provenance, and no-hidden-retune rows are still missing.

### Failure Mode

EQ-25 fails if entropy is used without a region, coarse-graining, measure, and boundary flux; if Boltzmann or Planck laws are imported as postulates; if unresolved variables are treated as ontic randomness; if measurement entropy is treated as collapse; if thermalization depth is not decomposed into event-recorded channels; or if CMB blackbody recovery uses different Noether sea variables from local radiation and BBN ledgers.

### Promotion Targets

- `content/markdown/aaa/dynamics/entropy.md`
- `content/markdown/aaa/quantum/measurement-ontology.md`
- `content/markdown/aaa/quantum/wavefunction-ontology.md`
- `content/markdown/aaa/reactions/radiation.md`
- `content/markdown/aaa/cosmology/CMB.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`

Promote only after a chosen finite window supplies a real measure, event ledger, thermalization or record-locking calculation, and residual.

## Integrated Score Recommendation

| ID | `6/23 a` | Recommended `6/23 b` | Reason |
| --- | --- | --- | --- |
| `EQ-06` | `4` | `4` | Native continuity and moment residual are strong, but convergence from resolved Noether braid population dynamics is still open. |
| `EQ-24` | `3` | `3` | The accepted `6/23 b` table holds this row at `3` because no acoustic, elastic, stress-strain, delayed-support, or $\mathcal R_{\mathrm{KK}}$ coefficient has been executed. The packet contains a plausible score-4 route once one shared coefficient row is extracted. |
| `EQ-25` | `2` | `3` | Finite-window entropy, deterministic pushforward, and thermalization rows are now named, but no concrete collision operator or entropy-production proof exists yet. |

## Promotion Classification

Classification: `priority-only`.

No reader-facing corpus edit should be made from this packet until at least one of the following is completed:

- EQ-06 density/cadence projection lemma with a residual refinement path.
- EQ-24 single-channel coefficient extraction with delayed-support or $\mathcal R_{\mathrm{KK}}$ check.
- EQ-25 finite-window CMB thermalization or measurement-record entropy calculation with event-ledger closure.

## Worker Handoff

- Completed now: one priority-only closure packet for `EQ-06`, `EQ-24`, and `EQ-25`.
- Open blocker: no executed residual or coefficient test yet.
- Next mathematical object: derive the density/cadence projection lemma, because it feeds both medium equations and thermodynamic transport.
