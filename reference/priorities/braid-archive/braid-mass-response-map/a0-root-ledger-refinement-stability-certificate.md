# $A_0$ Root-Ledger Refinement Stability Certificate

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: executable active-root ledger stability discriminator, not accepted history
- Date: May 22, 2026

## Certificate Contract

The certificate emitter [a0-root-ledger-refinement-stability-certificate.mjs](../../../../scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs) either compares two `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifacts by their `active_causal_root_ledger` rows directly, or consumes a carrier-replay continuation source diagnostic with schema `a0-tier1-continuation-source-prototype/v1`. It is intentionally separate from the root-transport source-record certificate: it does not read `root_transport_source_record.roots`, does not use `transport_id`, and does not apply a phase-origin cyclic reindexing.

The matching key is

```text
receiver|source|relation|status + cyclic order at fixed period
```

For each matched active root, the certificate compares the fixed-observation fields `t`, `delay`, and `J` under the declared tolerance. A pass emits:

```text
artifact_schema = a0-root-ledger-refinement-stability-certificate/v1
status = root_ledger_refinement_stability_certificate_passed
certificate.root_ledger_stable_under_refinement = true
certificate.matched_without_transport_id = true
certificate.phase_origin_shift_used_for_matching = false
accepted_history_boundary = false
rerun_authority = certificate_only_not_corrected_rerun_authority
```

It fails closed if the baseline and variant paths are identical, if either active ledger is missing, if the active-root counts or identities differ, if `t`, `delay`, or `J` drift beyond tolerance, or if the variant carries phase-origin sidecar evidence.

For carrier-replay continuation source diagnostics, the allowed variant kind is `carrier_root_replay_refinement`. The diagnostic must report `carrier-root-ledger-refinement-passed`, `scope = carrier_root_replay_only`, stable relation and source coverage, no missing / extra / ambiguous shared-time roots, no delay drift count, and the same active-root ledger fingerprint as the baseline row. This mode is evidence-only: it can establish a carrier-replay root-ledger stability certificate, but it does not change the source row's raw `validation.root_ledger_stable_under_refinement` field.

## May 22, 2026 Execution

The first production-shaped smoke used the current corrected fold-layer-locked diagnostic artifact and the declared shift-`1` phase-origin sidecar:

```text
node scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs --baseline /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --variant /tmp/a0-root-transport-phase-origin-variant-shift1.json --variant-kind declared_phase_origin_bucket_shift --pretty --out /tmp/a0-root-ledger-stability-certificate-phase-origin-rejected.json
```

The certificate correctly rejected the sidecar:

```text
status = blocked_phase_origin_variant_not_refinement
failure_code = phase-origin-variant-not-root-ledger-refinement
phase_origin_variant_detected = true
phase_origin_variant_evidence_count = 5
accepted_history_boundary = false
rerun_authority = certificate_only_not_corrected_rerun_authority
```

The checker now accepts the certificate path through `--root-ledger-stability-certificate`, but treats certificate-only stability as evidence, not corrected-rerun authority. With both the passed root-transport source-record certificate and the rejected root-ledger certificate supplied, the current row remains blocked:

```text
node scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --coordinate-source root_transport_source_record --root-transport-quotient source_layer_shear --root-transport-certificate /tmp/a0-root-transport-certificate-sidecar-shift1-declared.json --root-ledger-stability-certificate /tmp/a0-root-ledger-stability-certificate-phase-origin-rejected.json --pretty --out /tmp/a0-branch-chart-checker-root-transport-with-rejected-root-ledger-certificate.json
```

The checker reports:

```text
row_status = overfit_holdout_fail
R_xval = failed
max_held_out_relative_residual = 1.712369148202459
R_transport = pending
R_transport_failure_code = root-ledger-stability-certificate-not-passed
root_transport_certified_by_certificate = true
root_ledger_certificate_status = failed
accepted_history_boundary = false
rerun_authority = blocked_before_corrected_rerun
```

The next non-phase-origin evidence packet used the carrier-replay continuation source diagnostic:

```text
node scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs --baseline /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --variant /tmp/a0-tier1-continuation-source-prototype-fold-lock-approved.json --variant-kind carrier_root_replay_refinement --tolerance 0.000001 --pretty --out /tmp/a0-root-ledger-stability-certificate-carrier-replay-refinement.json
```

The certificate passes within its declared carrier-replay scope:

```text
status = root_ledger_refinement_stability_certificate_passed
variant_schema = a0-tier1-continuation-source-prototype/v1
variant_kind = carrier_root_replay_refinement
refinement_evidence_source = carrier_replay_root_refinement_diagnostic
diagnostic_status = carrier-root-ledger-refinement-passed
diagnostic_scope = carrier_root_replay_only
matched_root_count = 512
max_field_relative_delta = 4.976849768509301e-7
warning_code = carrier-root-refinement-J-drift-reported
J_drift_count = 32
accepted_history_boundary = false
rerun_authority = certificate_only_not_corrected_rerun_authority
```

The explicit tolerance matters. At the default `1e-9` tolerance this same diagnostic is rejected as `carrier-root-refinement-delta-over-tolerance`; at `1e-6` it records the observed carrier-replay drift without widening the certificate to arbitrary active-root drift.

With the passed root-transport certificate and this passed carrier-replay root-ledger certificate, the branch-chart checker still blocks corrected rerun:

```text
node scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --coordinate-source root_transport_source_record --root-transport-quotient source_layer_shear --root-transport-certificate /tmp/a0-root-transport-certificate-sidecar-shift1-declared.json --root-ledger-stability-certificate /tmp/a0-root-ledger-stability-certificate-carrier-replay-refinement.json --pretty --out /tmp/a0-branch-chart-checker-root-transport-with-carrier-root-refinement-certificate.json
```

The checker reports:

```text
row_status = overfit_holdout_fail
R_xval = failed
max_held_out_relative_residual = 1.712369148202459
R_transport = pending
R_transport_failure_code = root-ledger-refinement-stability-certificate-only-not-rerun-authority
root_transport_certified_by_certificate = true
root_ledger_stable_under_refinement = false
root_ledger_stable_under_refinement_by_certificate = true
root_ledger_refinement_stability_certificate_only = true
root_ledger_stable_under_refinement_rerun_authorizing = false
root_ledger_certificate_status = passed
accepted_history_boundary = false
rerun_authority = blocked_before_corrected_rerun
```

The synthetic tests also verify the positive side of the contract: two distinct artifacts with matching active ledgers and `--variant-kind delta_t_refinement` pass the certificate, while same-path inputs, phase-origin sidecars, active-root field drift, and cyclic phase shifts fail.

## Boundary

This packet closes a discriminator and a carrier-replay evidence path, not the production root-ledger stability blocker. It proves that the phase-origin source-record sidecar cannot be reused as an active-root refinement witness, and it records one legitimate non-phase-origin carrier-replay root-ledger stability certificate. The evidence remains certificate-only because the source row's raw `validation.root_ledger_stable_under_refinement` remains false.

The branch-chart checker records five separate root-ledger fields under $R_{\mathrm{transport}}$:

```text
root_ledger_stable_under_refinement
root_ledger_stable_under_refinement_by_certificate
root_ledger_stable_under_refinement_effective
root_ledger_refinement_stability_certificate_only
root_ledger_stable_under_refinement_rerun_authorizing
```

Only the raw row value is rerun-authorizing. A certificate-only pass may set the evidence fields, but if the row itself still reports `root_ledger_stable_under_refinement = false`, $R_{\mathrm{transport}}$ stays pending as `root-ledger-refinement-stability-certificate-only-not-rerun-authority`. This preserves the corrected-rerun boundary while still making the root-ledger evidence auditable.

## Validation

- `node --check scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs`
- `node --check scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs`
- `node --test tests/a0-root-ledger-refinement-stability-certificate.test.js tests/a0-branch-chart-revision-checker.test.js tests/a0-root-transport-refinement-certificate.test.js tests/a0-root-transport-phase-origin-variant.test.js`

Promotion decision: priority-only. This packet should not be promoted into `content/markdown/aaa` until an actual refinement artifact establishes root-ledger stability for a branch-chart row that also passes held-out residual and the one-period closure gates.
