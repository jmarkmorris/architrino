# Equation Closure Pass 2026-06-23 AG

## Scope

- `EQ-20` dark-energy pressure and effective $\Lambda$ as outputs of a Noether sea constitutive-response record.
- The pressure/$\Lambda_{\mathrm{eff}}$ distinction from `EQ-18`/`EQ-19` Friedmann bookkeeping.
- Conservative score disposition after making the pressure residual executable.

## Result

This pass adds [eq20-pressure-effective-lambda-residual.mjs](../../../scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs) and [eq20-pressure-effective-lambda-attempt.v1.json](../../../scripts/equation-mapping/eq20-pressure-effective-lambda-attempt.v1.json). The checker is deliberately score-neutral. It tests whether $p_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, and $\Lambda_{\mathrm{eff}}$ are tied to a Noether sea pressure/tension/relaxation row rather than merely appearing as fitted Friedmann variables.

| Row | Executable check | Attempt result | Score effect |
| --- | --- | --- | --- |
| `EQ-20` | Common $\Theta_{11\text{-}20}$ carrier, retained $\rho_{\text{NS}}$ row, pressure-law residual $R_p^{20}$, equation-of-state residual, $\Lambda_{\mathrm{eff}}$ projection residual, FRW-handoff link, source-provenance residual, shared-key compatibility, and no-hidden-retune witness. | `blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_theta_sea_rho_NS`, `inheritedFrwBlocker: missing_accepted_theta_cos`. | No score change; `EQ-20` remains `3`. |

## Residual Object

The score-moving object is not a fitted $\Lambda_{\mathrm{eff}}$ row. It is a retained Noether sea pressure record:

$$
\Theta_{11\text{-}20}^{(\ell,W)}
\longmapsto
\left(
\rho_{\text{NS}},
p_{\mathrm{sea}},
\mathcal T_{\mathrm{sea}}^{ab},
\tau_{\mathrm{rel}},
p_{\mathrm{DE,eff}},
\rho_{\mathrm{DE,eff}},
w_{\mathrm{eff}},
\Lambda_{\mathrm{eff}},
G_{\mathrm{eff}}
\right),
$$

with all rows sharing one carrier and durable source evidence. The executable residual is

$$
\mathcal R_{20}
=
\left(
R_p^{20},
R_w^{20},
R_{\Lambda}^{20},
R_{\mathrm{FRW}\leftarrow20},
R_{\mathrm{src}},
\mathcal S_{\mathrm{retune}}^{20}
\right).
$$

The current attempt computes:

```text
pressureResidual: 0
equationOfStateResidual: 0
lambdaProjectionResidual: 0
frwHandoffPass: true
sourceProvenancePass: true
hiddenRetunePass: true
```

Those numeric passes are not score evidence. Every source-bearing row is still `attempt`, and the first accepted retained row remains the Noether sea density row `theta_sea_rho_NS`.

## Relationship To AF

[Equation Closure Pass 2026-06-23 AF](equation-closure-pass-2026-06-23-af.md) makes $P_{\mathrm{eff}}$ and $\Lambda_{\mathrm{eff}}$ available as part of the effective-FRW/Friedmann handoff shape. This pass tests a different claim: whether those variables are produced by Noether sea pressure, tension, and relaxation rows. The fixture therefore carries an inherited FRW blocker, `missing_accepted_theta_cos`, while the native `EQ-20` blocker is `missing_accepted_theta_sea_rho_NS`.

## Score Disposition

No score changes.

- `EQ-20` remains `3`: the pressure/$\Lambda_{\mathrm{eff}}$ residual is executable, but no accepted retained Noether sea density, pressure, tension, relaxation, or source-provenance rows are populated.
- `EQ-11` remains `3`: this pass does not populate the weak-gravity Poisson or curvature readout rows.
- `EQ-18` and `EQ-19` remain `3`: this pass consumes the AF handoff shape but does not accept the upstream $\theta_{\mathrm{cos}}$ row.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote only after one retained Noether sea constitutive window supplies accepted, source-backed $\rho_{\text{NS}}$, pressure, tension, relaxation, effective-coupling, pressure-projection, $\Lambda_{\mathrm{eff}}$, FRW-handoff, source-provenance, and no-hidden-retune rows.
