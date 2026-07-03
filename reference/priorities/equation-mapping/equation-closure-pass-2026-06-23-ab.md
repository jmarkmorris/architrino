# Equation Closure Pass 2026-06-23 AB

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 AA](equation-closure-pass-2026-06-23-aa.md)
- Assigned ID: `EQ-17`
- Status: `score-neutral executable signed-transfer residual pass`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits
- Claim bucket: derivation/closure target with observer-level transfer summaries

## Closure Result

This pass adds a score-neutral source-path-receiver frequency-transfer checker:

- [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs)
- [signed-frequency-transfer-attempt.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json)

The checker evaluates the `EQ-17` signed redshift/frequency-transfer budget as one retained transfer record $\Theta$. It consumes:

- the parent transfer record;
- emitter and receiver endpoint cadence rows;
- source-branch factor;
- launch or relative-motion geometry factor;
- path-history propagation row;
- photon-channel record;
- event ledger;
- segment energy-exchange rows;
- path-quality constraints;
- no-hidden-retune witness.

It then computes the signed transfer budget $Z_X[\Theta]$, receiver-frequency residual, segment energy-exchange residuals, path-quality residuals, shared-key retune checks, and no-hidden-retune residual.

The current attempt fixture deliberately has the desired numeric shape:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_transfer
transferFactorsComputed: true
frequencyPass: true
segmentEnergyPass: true
pathQualityPass: true
hiddenRetunePass: true
```

Those numeric passes are not score evidence because all required rows remain `attempt`, and the shared-key rows are not accepted or source-backed.

## Mathematical Object

The executable object is the signed source-path-receiver budget

$$
Z_X[\Theta]
=
\ln\Gamma_{N,E}
-
\ln\Gamma_{N,R}
+
Y_{X,E\to R}
-
\ln B_X(E)
-
\ln D_v,
$$

with receiver readout

$$
\nu_R
=
\nu_E\exp(-Z_X[\Theta])
+
r_{\nu,X}.
$$

For each path segment, the checker also evaluates the energy-exchange row

$$
\mathcal R_{\nu\text{-}\mathrm{ex},j}
=
h(\nu_{X,j}^{+}-\nu_{X,j}^{-})
+
\Delta E_{\mathrm{med},j}
+
\Delta E_{\mathrm{recoil},j}
+
\Delta E_{\mathrm{rem},j}.
$$

Path-history propagation is allowed only if the packet also supplies path-quality rows for image sharpness, chromaticity, spectral coherence, and $(1+z)$ time-dilation consistency. This keeps a nonzero $Y_{X,E\to R}$ from collapsing into an unconstrained tired-light term.

## Required Rows

The checker requires accepted, source-backed rows for:

- `theta_transfer`
- `endpoint_cadence_emitter`
- `endpoint_cadence_receiver`
- `source_branch_factor`
- `launch_geometry_factor`
- `path_history_propagation`
- `photon_channel_record`
- `event_ledger`
- `energy_exchange_segments`
- `path_quality_constraints`
- `no_hidden_retune_witness`

It also requires accepted shared-key rows for $\Gamma_{N,E}$, $\Gamma_{N,R}$, $B_X(E)$, $D_v$, $Y_{X,E\to R}$, $\chi_\gamma$, $\chi_{\text{sea}}$, event identity, source branch identity, and receiver branch identity.

The first blocker is deliberately `missing_accepted_theta_transfer`. A clean redshift arithmetic budget does not substitute for one accepted transfer record binding endpoint cadence, source branch, launch geometry, path-history propagation, event ledger, photon-channel record, and path-quality rows.

## Score Disposition

| Row | Prior score | Pass AB score | Reason |
| --- | --- | --- | --- |
| `EQ-17` | `4` | `4` | The signed frequency-transfer residual is executable and the attempt diagnostics pass, but the run remains attempt-level and blocks first at `missing_accepted_theta_transfer`. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for one accepted source-path-receiver transfer record whose endpoint cadence, source branch, launch geometry, path-history propagation, photon-channel, event-ledger, path-quality, and no-hidden-retune rows are source-backed and mutually consistent.

## Next Closure Step

Populate the first accepted `theta_transfer` row for one clean case: endpoint gravitational redshift, Doppler launch redshift, or deep-space path accumulation. The next executable sibling after this pass is the `EQ-13` effective EM gate residual on the existing Compton event carrier, because it can reuse the event-ledger blockers while preventing Maxwell-level summaries from bypassing the native photon/recoil record.
