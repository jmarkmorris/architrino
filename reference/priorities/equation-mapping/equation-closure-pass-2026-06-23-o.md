# Equation Closure Pass 2026-06-23 O

## Scope

- `EQ-02` through `EQ-04`: translating-binary retained carrier and same-branch identity.
- `EQ-06` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32`: Noether sea density-compression coefficient row.
- `EQ-28` and `EQ-29`: native Compton event rows and radiation carrier/source separation.

## Result

This pass audits the three nearest score-moving lanes after the score-neutral `EQ-31` carrier work.

### `EQ-02` Through `EQ-04`

Direct retained-domain replay:

```text
node scripts/equation-mapping/check-same-branch-chart-identity.mjs \
  --input scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json \
  --summary --pretty
```

Current result:

```text
status: blocked_missing_retained_event_or_domain
scoreDecision: no_score_increase
acceptedRetainedIdentityRequirementCount: 0
retainedIdentityRequirementCount: 14
missingDomainWitnesses: split_witness_zero, retune_witness_zero, overlap_preimage_identity
```

Next retained evidence object: one accepted `S_eq` retained-domain fixture that binds all 14 retained identity requirements and supplies zero split/retune witnesses plus a consistent overlap-preimage witness on one finite event or positive-width domain.

### Noether Sea Coefficient Rows

Retained-attempt replay:

```text
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs \
  --input scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json \
  --summary --pretty
```

Current result:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
same_theta_sea_record: fail
speed_plus_stress_or_metric: fail
missingThetaRows: rho_NS, n, u_sea, e_sea, theta_sea, f_N, event_ledger_ref
missingRequiredRows: channel_declaration_row, speed_row, causality_row, correlation_row, stress_strain_row_or_metric_embedding_row
```

This pass also hardens the runner so accepted-looking rows with pending or placeholder source strings do not normalize as accepted retained rows.

Next retained evidence object: one acoustic density-compression fixture with accepted retained references for the $\Theta_{\mathrm{sea}}$ rows, accepted speed row, delayed-support/causality row, correlation row, accepted bulk stress/strain row or metric-compliance row, and zero-retune witness. Metric, gravity, pressure, and low-acceleration outputs may stay declared missing.

### `EQ-28` And `EQ-29`

Native Compton attempt replay:

```text
node scripts/equation-mapping/compton-recoil-event-replay.mjs \
  --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json \
  --summary --pretty
```

Current result:

```text
status: comparison_replay_closed_native_rows_missing
scoreDecision: no_score_increase
comparisonReplayClosed: true
nativeLedgerStatus: native_rows_missing
nextBlocker: missing_accepted_photon_gate_A_input_output
```

The comparison rows close, but every native row remains `attempt`. The needed accepted rows are photon Gate A input/output, photon Gate B transverse handoff, target retained branch, recoil branch, angular-momentum ledger delta, Noether sea state row, energy-momentum event ledger, and accepted medium/remnant support rows with explicit deltas.

This pass also separates the `EQ-29` carrier/channel-family declaration row from the source-mechanism declaration row. Compton-like frequency exchange, photon output, reaction-product carriers, and gravitational-wave/effective-metric tensor disturbances are carrier/channel-family rows; atomic transition, bremsstrahlung, synchrotron, thermal/free-free, and reaction-product source terms are source-mechanism rows. This protects the carrier/source distinction without changing the score.

## Score Disposition

No score changes.

- `EQ-02`, `EQ-03`, and `EQ-04` remain `4`.
- Noether sea rows keep their existing `6/23 b` scores.
- `EQ-28` and `EQ-29` remain `3`.
- No `Promoted?` cell changes.

## Next Closure Step

The highest-value retained evidence object is still the accepted `S_eq` retained-domain fixture for `EQ-02` through `EQ-04`, because it would test same-branch identity across clock, envelope, mass-shell, conservation, phase, Noether sea, and binary-to-binary identity rows in one compact support. The next two practical siblings are the accepted acoustic density-compression coefficient fixture and the native Compton event acceptance witness for $\mathsf e_{\gamma e}^{0}$.
