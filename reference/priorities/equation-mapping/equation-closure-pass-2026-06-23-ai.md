# Equation Closure Pass 2026-06-23 AI

## Scope

- Target: direct retained-record evaluator for `EQ-02` through `EQ-04`.
- Primary runner: [eq02-04-translating-binary-retained-record.mjs](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs).
- Attempt input: [eq02-04-translating-binary-retained-record-attempt.v1.json](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record-attempt.v1.json).
- Inherited identity input: [same-branch-retained-domain-attempt.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json).
- Claim level: score-neutral executable retained-record shape.
- Score disposition: no score changes.

This pass adds the missing direct evaluator for

$$
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
\mapsto
\left(
R_T,\,
R_{\xi},\,
R_{\mathrm{tw}},\,
R_E,\,
R_p,\,
R_{\mathrm{shell}},\,
R_{M_0},\,
R_{\mathcal M},\,
\mathcal R_{01-05}^{\mathfrak B_u},\,
\mathcal S_{\mathrm{root}},\,
\mathcal S_{\mathrm{retune}}
\right).
$$

It does not replace [check-emit-02-04-contract.mjs](../../../scripts/equation-mapping/check-emit-02-04-contract.mjs), which remains the solver-proxy contract mapper. It also does not replace [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs), which remains the `S_eq` same-branch identity acceptance extractor. The new evaluator inherits that same-branch result first, then evaluates the local `EQ-02` through `EQ-04` row and residual shape.

## Executable Command

Default summary command:

```sh
node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs --summary --pretty
```

Fail-closed command:

```sh
node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs --require-populated --out /tmp/eq02-04-retained-record-required-ai.json
```

The fail-closed command exits nonzero for the attempt fixture.

## Current Result

| Field | Result |
| --- | --- |
| Status | `blocked_same_branch_identity` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` |
| Inherited same-branch status | `blocked_missing_retained_event_or_domain` |
| Common carrier id | `C_02-04_bin_u_attempt_0001` |
| Domain id | `D_02-04_bin_u_attempt_0001` |
| Drift diagnostic | `passed`, with `beta_f=0.6` and `gamma_f=1.25` |
| Accepted row count | `0/14` |
| Accepted witness count | `0/2` |
| Numeric diagnostic count | `13/13` pass |
| Negative controls | `4/4` pass |

The attempt fixture deliberately uses numerically consistent row values:

- $T_u/T_0=1.25=\gamma_f$;
- $R_{\parallel}/R_{\perp}=0.8=1/\gamma_f$;
- $E_{\mathrm{CM},u}/(M_0c_f^2)=1.25=\gamma_f$;
- $p_{\mathrm{CM}}/(M_0c_f)=0.75=\gamma_f u/c_f$;
- the mass-shell, rest-mass, same-root conservation, medium-response, split, and retune residual diagnostics are numerically zero.

Those arithmetic passes are not score evidence. Every row is marked `attempt`, every witness is marked `attempt`, and the inherited `S_eq` same-branch identity checker still reports `0/14` accepted retained identity requirements.

The runner also includes the four required negative controls from the translating-binary packet. The attempt fixture passes all four as diagnostics:

| Negative control | Intended caught failure |
| --- | --- |
| `clock_only_retune` | A clock-only fit still fails envelope, root split, or retune consistency. |
| `envelope_only_retune` | An imposed envelope ratio still fails root split or retune consistency. |
| `velocity_dependent_rest_mass` | A mass-shell shrink by changing $M_0(u)$ still fails rest-mass invariance. |
| `medium_response_compensator` | A momentum repair by changing $\mathcal M_{\mathrm{sea}}^{ab}$ still fails primitive homogeneous-cell response. |

## First-Blocker Order

The evaluator uses the following fail-closed order:

1. invalid retained-record schema;
2. inherited `same_branch_chart_identity` blocker from [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs);
3. invalid drift sample;
4. missing accepted retained-record rows, starting with `common_carrier`;
5. missing accepted split or retune witnesses;
6. residual diagnostics outside tolerance;
7. missing residual diagnostics;
8. failed negative controls;
9. missing negative controls.

The current first blocker is therefore inherited from the same-branch identity lane, not invented locally:

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

## Rows Evaluated

The direct retained-record evaluator requires these accepted rows on one `commonCarrierId` and one retained support:

| Row key | Consumed by |
| --- | --- |
| `common_carrier` | `EQ-02`, `EQ-03`, `EQ-04` |
| `retained_branch_chart` | `EQ-02`, `EQ-03`, `EQ-04` |
| `root_starvation_row` | `EQ-02`, `EQ-03` |
| `same_root_conservation_row` | `EQ-02`, `EQ-03`, `EQ-04`, `EQ-05` |
| `same_branch_chart_identity` | `EQ-02`, `EQ-03`, `EQ-04` |
| `clock_row` | `EQ-02` |
| `envelope_row` | `EQ-03` |
| `two_way_signal_row` | `EQ-02`, `EQ-07`, `EQ-09` |
| `energy_row` | `EQ-04`, `EQ-05` |
| `exposure_row` | `EQ-04`, mass-map handoff |
| `momentum_row` | `EQ-04`, `EQ-05` |
| `rest_mass_row` | `EQ-04` |
| `mass_shell_row` | `EQ-04` |
| `medium_response_row` | `EQ-04`, Noether sea handoff |

The required witnesses are `split_witness_zero` and `retune_witness_zero`. The inherited `S_eq` checker separately requires the overlap-preimage identity witness for same-branch acceptance.

## Score Disposition

No `6/23 b` score changes follow from this pass.

| Row | Current `6/23 b` score | AI disposition |
| --- | --- | --- |
| `EQ-02` | `4` | Still below `5` because the clock, two-way signal, root-starvation, same-root, and same-branch rows are not accepted retained rows. |
| `EQ-03` | `4` | Still below `5` because the envelope and shape rows are numerically illustrated but not accepted retained branch evidence. |
| `EQ-04` | `4` | Still below `5` because energy, exposure, momentum, rest-mass, mass-shell, medium-response, conservation, and same-record witnesses remain attempt rows. |

The new evaluator is a useful success marker under the existing score-5 route. It makes the next accepted evidence object sharper: first pass [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs) with a source-backed `S_eq` retained-domain fixture, then pass the direct retained-record evaluator with accepted row projections and zero split/retune witnesses.

## Promotion Disposition

Priority-only. This pass creates an executable retained-record shape, but it does not supply durable source-backed retained evidence. Reader-facing promotion remains blocked until a populated run evaluates $\mathcal R_{\mathrm{shared}}^{02\text{-}04}$ on one accepted retained event or positive-width domain.
