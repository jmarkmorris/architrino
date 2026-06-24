# Equation Closure Pass 2026-06-23 AA

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 Z](equation-closure-pass-2026-06-23-z.md)
- Assigned ID: `EQ-05`
- Status: `score-neutral executable conservation residual pass`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits
- Claim bucket: derivation/closure target

## Closure Result

This pass adds a score-neutral finite-window conservation residual checker:

- [finite-window-conservation-residual.mjs](../../../scripts/equation-mapping/finite-window-conservation-residual.mjs)
- [finite-window-conservation-attempt.v1.json](../../../scripts/equation-mapping/finite-window-conservation-attempt.v1.json)

The checker evaluates the `EQ-05` residual packet $\mathcal R_{01-05}^{\mathfrak B}(W)$ as a same-root, finite-window event-ledger object. It consumes:

- the retained branch chart and active-root ledger;
- the native force row;
- the action or work-integral route;
- the wake-charge route;
- the event ledger;
- the boundary-flux row;
- the same-root checksum;
- the no-double-count witness.

It then computes the shared-root signature check, normalized energy residual, normalized momentum residual, normalized angular-momentum residual, event-ledger residual, boundary-flux residual, wake-crosswalk residual, and no-double-count residual.

The current attempt fixture deliberately has the desired numeric shape:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_branch_chart
sameRootPass: true
energyPass: true
momentumPass: true
angularMomentumPass: true
eventLedgerPass: true
boundaryFluxPass: true
wakeCrosswalkPass: true
noDoubleCountPass: true
```

Those numeric passes are not score evidence because all required rows remain `attempt`.

## Mathematical Object

The executable object is

$$
\mathcal R_{01-05}^{\mathfrak B}(W)
=
\left(
\mathcal R_{\mathrm{same}},
\epsilon_E^{\mathfrak B},
\epsilon_P^{\mathfrak B},
\epsilon_J^{\mathfrak B},
\epsilon_{\mathrm{event}}^{\mathfrak B},
\epsilon_{\partial\Omega}^{\mathfrak B},
\epsilon_{\mathrm{cross}}^{\mathfrak B},
\epsilon_{\mathrm{double}}^{\mathfrak B}
\right).
$$

For a charge row $Q\in\{E,\mathbf P,\mathbf J\}$, the checker uses the finite-window balance

$$
\Delta_W Q_{\mathrm{ret}}^{\mathfrak B}
+
\Phi_{Q,\partial\Omega}^{\mathfrak B}(W)
-
Q_{\mathrm{ext}}^{\mathfrak B}(W)
-
Q_{\mathrm{event}}^{\mathfrak B}(W)
=
R_{Q,W}^{\mathfrak B}.
$$

The same-root signature is not inferred from matching numbers. The input must declare the force, action/work, wake-charge, event-ledger, and boundary-flux root signatures, and the checker compares ordered-pair policy, active-root labels, inactive-gap cover, memory depth, regularization, Jacobian floor, endpoint convention, tail convention, branch label, and Noether sea state.

## Required Rows

The checker requires accepted, source-backed rows for:

- `branch_chart`
- `active_root_ledger`
- `force_row`
- `action_or_work_route`
- `wake_charge_route`
- `event_ledger`
- `boundary_flux`
- `same_root_checksum`
- `no_double_count_witness`

The first blocker is deliberately `missing_accepted_branch_chart`. A conservation residual can be numerically zero in an attempt packet while still failing if the branch chart and row provenance are not accepted.

## Score Disposition

| Row | Prior score | Pass AA score | Reason |
| --- | --- | --- | --- |
| `EQ-05` | `4` | `4` | The conservation residual is executable and the attempt diagnostics pass, but the run remains attempt-level and blocks first at `missing_accepted_branch_chart`. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for one retained branch chart whose active-root ledger, force row, wake/action route, event ledger, boundary flux, same-root checksum, and no-double-count witness are accepted, source-backed, and closed under the finite-window residual.

## Next Closure Step

Populate the first accepted `branch_chart` row for a minimal branch window, then bind the active-root, wake-charge, event-ledger, boundary-flux, same-root, and no-double-count rows to it. `EQ-05` should not move from `4` to `5` until the checker reports `populated` on an accepted retained branch and the resulting $\mathcal R_{01-05}^{\mathfrak B}(W)$ residuals remain below tolerance.
