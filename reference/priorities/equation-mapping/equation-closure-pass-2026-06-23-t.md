# Equation Closure Pass 2026-06-23 T

## Scope

- `EQ-24` acoustic, elastic, stress-strain, and medium-response equations.
- Retained Noether sea density-compression coefficient extraction.
- Score-neutral evaluator for the retained density-compression surface slice.

## Result

This pass sharpens the nearest single-row score-movement lane without changing any score. `EQ-24` can move only after one retained Noether sea window supplies a density-compression coefficient bundle:

$$
\Theta_{\mathrm{sea}}^{(\ell,W)}
\longrightarrow
\mathsf J_{\rho}^{X}
\longrightarrow
\left(
\delta c_X^2,
\delta C_{\mathrm{bulk}}^X,
\varnothing,
\varnothing,
\varnothing,
\varnothing,
\varnothing
\right),
$$

where the speed and bulk stress/strain coefficient come from the same retained window, the same response channel, the same source-backed row set, and a zero hidden-retune witness.

The current retained-attempt packet already has the right shape but uses `attempt` rows and placeholder source references. Its first blocker remains:

```text
missing_accepted_theta_sea_rho_NS
```

## Minimum Accepted Bundle

The minimum accepted density-compression bundle must replace the placeholder retained-attempt rows with source-backed evidence:

| Coordinate | Minimum accepted content | Why it matters |
| --- | --- | --- |
| $\rho_{\text{NS}}$ | Accepted source-backed physical Noether braid density row for the retained window. | First blocker and density-compression input. |
| $n$ | Accepted normalized density row on the same window. | Supplies $\delta\ln n$ meaning and normalization. |
| $\mathbf u_{\mathrm{sea}}$ | Accepted Noether sea flow row on the same window. | Prevents speed and stress rows from using a different background state. |
| $e_{\mathrm{sea}}$ | Accepted Noether sea energy row on the same window. | Binds coefficient extraction to energy bookkeeping. |
| $\boldsymbol\theta_{\mathrm{sea}}$ | Accepted orientation/strain state row on the same window. | Carries anisotropy or strain information for stress response. |
| $f_N$ | Accepted Noether sea cadence row on the same window. | Connects coefficient response to the same cadence record used by metric and clock rows. |
| Event ledger reference | Accepted source-backed event/window ledger reference. | Binds the retained window and all rows to one support. |
| Channel declaration | Accepted row declaring the density-compression acoustic or elastic channel $X$. | Prevents channel-specific retuning. |
| Speed row | Accepted low-$k$ dispersion-slope row producing $c_{X,\mathrm{disp}}^2$ from the same $\mathsf J_{\rho}^{X}$. | Supplies the perturbation-speed half of the score-moving pair. |
| Stress/strain row | Accepted longitudinal elastic row producing $C_{1111}^X$, or a declared isotropic/bulk reduction to $C_{1111}^X$, from the same $\mathsf J_{\rho}^{X}$. | Supplies the elastic half of the first conservative route. |
| Acoustic/elastic agreement | $c_{X,\mathrm{disp}}^2$ and $C_{1111}^X/\rho_{\text{NS}}$ agree within the refinement-error budget, and the agreement row is accepted, source-backed, and bound to the same window, channel, response kernel, speed row, stress/strain row, $\rho_{\text{NS}}$ row, refinement family, and retune witness. | Separates a same-window response coefficient from a discretization artifact or numeric-only attempt row. |
| Refinement family | Adjacent $\ell$ levels show decreasing $\mathcal R_{\mathrm{proj}}^X$ and convergence of both speed estimates toward the same limit. | Makes the coefficient a refinement-stable object rather than a one-grid fit. |
| Causality row | Accepted delayed-support or $\mathcal R_{\mathrm{KK}}(\chi_{AB}^X)$ row for the same response kernel. | Blocks instantaneous or acausal imported response. |
| Correlation row | Accepted same-window deterministic-history correlation row. | Prevents an independent stochastic field from replacing retained dynamics. |
| Missing-output declarations | Explicit declarations for $\delta N$, $\delta\gamma_{ij}$, $\delta G_{\mathrm{eff}}$, $\delta P_{\mathrm{eff}}$, and $\delta a_\star$ until derived. | Keeps the first packet stress/strain-only rather than overclaiming metric, gravity, pressure, or low-acceleration recovery. |
| Retune witness | Accepted source-backed witness with residual zero and no changed rows. | Blocks hidden retuning between density, speed, stress, causality, and correlation rows. |

Every accepted row must use status `accepted`, `passed`, or `populated`, include a concrete row/event reference, and resolve to a durable source/evidence file. A placeholder source, generated reading copy, temp artifact, directory path, or bare retained label does not count.

## Score Disposition

No score changes. `EQ-24` remains `3` because no accepted retained density-compression bundle exists yet. The pass only makes the score-4 evidence object explicit.

## Next Closure Step

The next score-moving action is to produce the first accepted $\rho_{\text{NS}}$ row on one $\Theta_{\mathrm{sea}}^{(\ell,W)}$ window. Only after that row is source-backed should the packet proceed to $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, $f_N$, event ledger, speed, stress/strain, causality, correlation, and retune rows.
