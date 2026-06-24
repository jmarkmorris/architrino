# Equation Closure Pass 2026-06-23 W

## Scope

- `EQ-15` ordered-frame spinor lift route.
- `EQ-27` magnetic moment and leading $g=2$ route.
- Shared score-neutral certificate $\mathfrak C_{\mathrm{spin}\to\mu}$.

## Result

This pass makes the `EQ-15`/`EQ-27` combined theorem route executable without changing scores. The new checker is [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs), with an attempt fixture in [spin-magnetic-moment-certificate-attempt.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json).

The checker consumes the certificate

$$
\mathfrak C_{\mathrm{spin}\to\mu}
=
\left(
\Phi_\star,\widetilde\Phi_\star,\eta_{\mathrm{spin}},
\Delta_{\mathrm{gauge}},
\Delta_{\mathbf J},
\boldsymbol\mu_{\mathcal E},
g_{\mathrm{lead}},
\mathcal R_{\mathrm{fib}}
\right),
$$

and separates structural or numeric shape from accepted retained evidence.

## Executable Coordinates

| Coordinate | Checker row | Score-moving condition |
| --- | --- | --- |
| Ordered-frame loop | `ordered_frame_loop` | Accepted source-backed retained ordered-frame loop on one same-record support. |
| Spin lift | `spin_lift` | $\eta_{\mathrm{spin}}=1$ and doubled path restores. |
| Gauge control | `gauge_control` | $\Delta_{\mathrm{gauge}}$ is below tolerance on the same record. |
| Angular-momentum ledger | `angular_momentum_ledger` | $\Delta_{\mathbf J}$ is below tolerance on the same record. |
| Moment-map magnetic row | `moment_map_magnetic` | Nonzero $\boldsymbol\mu_{\mathcal E}$ from the same ordered-frame/exposure quotient. |
| Leading $g=2$ row | `covering_degree_g2` | $g_{\mathrm{lead}}=2$ within tolerance as a covering-degree result. |
| Exposure-fiber residual | `exposure_fiber_residual` | $\mathcal R_{\mathrm{fib}}$ is reported as a residual row, not a fitted spin-label correction. |

All rows must be accepted, source-backed, and matched to the same `sameRecordId` before the checker can return `populated`.

## Current Run

The attempt fixture is deliberately shaped but not accepted. It reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_ordered_frame_loop
etaSpinPass: true
doubledPathPass: true
gaugePass: true
angularMomentumPass: true
momentMapPass: true
gLeadPass: true
exposureFiberPass: true
```

This is the desired distinction. A visible $SO(3)$ loop, assigned spin label, observer-level magnetic formula, or numeric $g_{\mathrm{lead}}=2$ shape cannot raise `EQ-15` or `EQ-27` while the ordered-frame loop and moment-map rows remain attempt-level.

## Score Disposition

No score changes.

- `EQ-15` remains `2`.
- `EQ-27` remains `2`.

The checker creates a future score-review path only if a retained branch populates the ordered-frame loop, spin lift, gauge-control, angular-momentum, moment-map, covering-degree, and exposure-fiber rows on the same source-backed record.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote after a source-backed retained branch supplies $\mathfrak C_{\mathrm{spin}\to\mu}$ and the score review confirms that the leading $g=2$ row is a covering-degree result rather than an assigned spin label.
