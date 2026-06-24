# Equation Closure Pass 2026-06-23 X

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 W](equation-closure-pass-2026-06-23-w.md)
- Assigned IDs: `EQ-21`, `EQ-22`, `EQ-23`, `EQ-32`
- Status: `score-neutral executable residual pass`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits
- Claim bucket: derivation/closure target with observer-level effective summaries

## Closure Result

This pass adds a score-neutral shared-observation residual checker:

- [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs)
- [shared-observation-residual-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-residual-attempt.v1.json)

The checker evaluates the shared observation family for `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32`. It consumes one declared $\Theta_{\mathrm{obs}}$ record, its subrecords $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{read}}$, $\Theta_{\mathrm{therm/prov}}$, $\Theta_{\mathrm{gal}}$, a provenance ledger $\mathcal L_{E\mathbf p\mathbf J}$, the `BBN`, `CMB`, `growth`, and `RAR` projections, the shared-key set $\mathcal K$, and the residual components of $\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$.

The current attempt fixture is intentionally structural. It declares all expected shared keys and computes a residual vector, but all source-bearing rows remain `attempt`, so the result is:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_obs
```

The pass therefore changes no `6/23 b` scores.

## Mathematical Object

The executable object is the fail-closed residual:

$$
\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})
=
\lambda_{\mathrm{growth}}\mathcal R_{\mathrm{growth}}
+\lambda_{\mathrm{CMB}}\mathcal R_{\mathrm{CMB}}
+\lambda_{\mathrm{BBN}}\mathcal R_{\mathrm{BBN}}
+\lambda_{\mathrm{RAR}}\mathcal R_{\mathrm{RAR/BTFR}}
+\lambda_{\mathrm{FRW}}\mathcal R_{\mathrm{FRW}\to\mathrm{obs}}
+\lambda_{\mathrm{handoff}}\mathcal R_{\mathrm{handoff}}
+\lambda_{\mathrm{prov}}\mathcal R_{\mathrm{therm/prov}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

The checker treats this as a shared-record discipline, not as a new cosmology fit. Numeric residuals are useful only after the retained row identities and durable source references are accepted.

## Required Rows

The checker requires accepted, source-backed rows for:

- `theta_obs`
- `theta_src`
- `theta_read`
- `theta_therm_prov`
- `theta_gal`
- `event_ledger`
- `frw_handoff`
- `thermal_provenance_ledger`
- `no_hidden_retune_witness`

It also requires accepted projection rows for `BBN`, `CMB`, `growth`, and `RAR`, and accepted shared keys:

$$
\mathcal K=
\{
\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\Gamma_N,
\mathbf u_{\mathrm{sea}},
\mathcal M_{\mathrm{sea}}^{ab},
\rho_{\mathrm{bar}},
\rho_A,
\eta,
N_{\text{eff}},
Y_p,
H_{\mathrm{eff}},
a_{\mathrm{eff}}
\}.
$$

The first blocker is deliberately the parent row `theta_obs`; without one accepted retained observation record, projection residuals can only be toy or attempt evidence.

## Score Disposition

| Row | Prior score | Pass X score | Reason |
| --- | --- | --- | --- |
| `EQ-21` | `3` | `3` | Growth residual rows remain attempt-level until accepted $\Theta_{\mathrm{obs}}$ and projection rows exist. |
| `EQ-22` | `3` | `3` | CMB transfer, blackbody, acoustic, and frame rows remain shared-record targets, not accepted closure. |
| `EQ-23` | `3` | `3` | BBN yield, $\eta$, $N_{\text{eff}}$, photon-loading, and source-window rows are not accepted retained evidence. |
| `EQ-32` | `3` | `3` | RAR/BTFR remains a constitutive-response benchmark downstream of the shared observation record. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for one accepted branch to populate $\Theta_{\mathrm{obs}}$, the four projection rows, $\mathcal K$, and $\mathcal S_{\mathrm{retune}}$ with durable source-backed evidence.

## Next Closure Step

Populate the first accepted $\Theta_{\mathrm{obs}}$ row. The minimum accepted bundle is one source-backed retained record with $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{read}}$, $\Theta_{\mathrm{therm/prov}}$, $\Theta_{\mathrm{gal}}$, $\mathcal L_{E\mathbf p\mathbf J}$, four projection rows, and shared-key provenance. Only then should the residual numbers be considered for score movement.
