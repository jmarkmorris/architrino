# Equation Closure Pass 2026-06-23 Q

## Scope

- `EQ-02` through `EQ-04`: source-reference hardening for $S_{\mathrm{eq}}$ same-branch retained-domain acceptance.
- `EQ-06` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32`: source-reference and retune-witness hardening for the Noether sea density-compression coefficient reducer.
- `EQ-28` and `EQ-29`: source-reference hardening for native Compton event rows and medium/remnant support rows.

## Result

This pass hardens existing reducers. It does not add a new gate and does not change any score. The purpose is narrower: an accepted-looking row cannot count as retained evidence merely because it contains a concrete-looking string.

Accepted, populated, or passed rows must now point to source references that resolve to durable source/evidence files. Placeholder strings, missing files, temp files, generated reading copies, and directory paths do not count as retained source evidence.

### $S_{\mathrm{eq}}$ Same-Branch Identity

The same-branch reducer now requires accepted supports, row bindings, zero witnesses, and overlap-preimage witnesses to have concrete source references that resolve to existing durable files. Missing source files report source-not-found reasons such as:

```text
row_source_not_found
support_source_not_found
witness_source_not_found
```

The live retained-domain attempt is unchanged:

```text
status: blocked_missing_retained_event_or_domain
scoreDecision: no_score_increase
acceptedRetainedIdentityRequirementCount: 0
retainedIdentityRequirementCount: 14
nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

A temporary negative check with an accepted raw-labeled-row binding and nonexistent source returned:

```text
raw_labeled_rows_preserved_on_retained_history: accepted
raw_labeled_rows_preserved_on_retained_history reason: row_source_not_found
nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

### Noether Sea Density-Compression Coefficient

The Noether sea reducer now requires accepted $\Theta_{\mathrm{sea}}$ rows and response rows to resolve to durable source/evidence files. It also hardens the zero-retune witness: `passed` or `accepted` retune status is not enough unless the witness has a concrete witness identity, durable source reference, zero residual, and no changed rows.

The retained-attempt output is unchanged:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_sea_rho_NS
retuneStatus: attempt
```

Temporary negative checks returned:

```text
rho_NS: accepted_without_existing_source
retuneStatus: accepted_without_concrete_retune_source
```

### Native Compton Event Witness

The Compton reducer now requires accepted native rows and accepted medium/remnant support rows to resolve to durable source/evidence files before they can close the native event ledger.

The native attempt output is unchanged:

```text
status: comparison_replay_closed_native_rows_missing
scoreDecision: no_score_increase
nextBlocker: missing_accepted_photon_gate_A_input_output
```

A temporary negative check with an accepted photon Gate A row and nonexistent source returned:

```text
photon_gate_A_input_output: accepted_without_existing_source
nextBlocker: missing_accepted_photon_gate_A_input_output
```

## Score Disposition

No score changes.

- `EQ-02`, `EQ-03`, and `EQ-04` remain `4`.
- Noether sea rows keep their existing `6/23 b` scores.
- `EQ-28` and `EQ-29` remain `3`.
- No `Promoted?` cell changes.

## Next Closure Step

The next score-moving work remains unchanged: populate real retained source bundles. For the nearest lanes, that means an accepted $S_{\mathrm{eq}}$ raw-labeled-row preservation source, an accepted Noether sea $\rho_{\text{NS}}$ source row, or an accepted photon Gate A input/output source row on $\mathsf e_{\gamma e}^{0}$. The new hardening only ensures those future rows must point at durable source/evidence files before the reducers can count them.
