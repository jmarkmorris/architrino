# $A_0$ Root-Transport Phase-Origin Variant Certificate

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: executable source-record covariance certificate, not accepted history
- Date: May 22, 2026

## Variant Emission Rule

The sidecar emitter [a0-root-transport-phase-origin-variant.mjs](../../../scripts/mass-map/a0-root-transport-phase-origin-variant.mjs) consumes an existing `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact and ignores any already-emitted `branch_chart_source_records.root_transport_source_record`. It recomputes a new `root_transport_source_record` from `active_causal_root_ledger`.

For a row with period $T$, uniform active-root observation bucket count $B$, and declared integer shift $s$, the emitted variant uses the shifted observation coordinate
$$
\tilde t_r=(t_r+sT/B)\bmod T.
$$
It groups roots by
$$
\mu_r=\texttt{receiver|source|relation|status},
$$
sorts each group by $\tilde t_r$, and recomputes $D_\tau$, $D_J$, and $G_r$ from the raw active-root ledger. The record preserves `source_phase_t` so that the intrinsic emission phase used by the current root-transport feature definition is recomputed from the raw source phase rather than copied from the previous source record. The emitted `transport_id` values have sidecar-local names and are not refinement identities.

This is independent of the prior source record in the limited source-record sense: it is a fresh emission from the raw active-root ledger under a declared phase-origin bucket shift. It is not an independent one-period integration, root-finder refinement, accepted branch history, or $\eta$-ladder result.

## May 22, 2026 Execution

The first production-shaped sidecar variant used the corrected fold-layer-locked diagnostic artifact already present in `/tmp`:

```text
node scripts/mass-map/a0-root-transport-phase-origin-variant.mjs --source /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --phase-shift-buckets 1 --pretty --out /tmp/a0-root-transport-phase-origin-variant-shift1.json
```

The sidecar emitted `512` root-transport rows from `16` uniform observation buckets with:

```text
variant_kind = declared_phase_origin_bucket_shift
declared_phase_shift_buckets = 1
source_bucket_count = 16
source_record_recomputed_from = active_causal_root_ledger
existing_root_transport_source_record_used = false
accepted_history_boundary = false
rerun_authority = phase_origin_variant_certificate_input_only_not_corrected_rerun_authority
```

The declared-shift certificate passed:

```text
node scripts/mass-map/a0-root-transport-refinement-certificate.mjs --baseline /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --variant /tmp/a0-root-transport-phase-origin-variant-shift1.json --phase-shift-buckets 1 --pretty --out /tmp/a0-root-transport-certificate-sidecar-shift1-declared.json
```

The certificate output reported:

```text
status = root_transport_refinement_certificate_passed
failure_code = null
matched_root_count = 512
feature_bucket_count = 16
feature_sample_count = 16
max_feature_relative_delta = 6.516707155123344e-15
transport_id_used_for_matching = false
accepted_history_boundary = false
rerun_authority = certificate_only_not_corrected_rerun_authority
```

The auto-shift run over the same pair found shift `1` but stayed diagnostic-only as intended:

```text
status = root_transport_phase_shift_diagnostic_only
failure_code = root-transport-phase-shift-not-declared
```

## Boundary

This closes only the source-record phase-origin covariance blocker for the compared records. It does not make the current root-transport coordinate rerun-admissible by itself because the pre-rerun branch-chart checker still also requires root-ledger stability, held-out residual success, and the one-period residual / accepted-history gates.

After checker wiring, the certificate is consumed explicitly by:

```text
node scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --coordinate-source root_transport_source_record --root-transport-quotient source_layer_shear --root-transport-certificate /tmp/a0-root-transport-certificate-sidecar-shift1-declared.json --pretty --out /tmp/a0-branch-chart-checker-root-transport-with-certificate.json
```

The checker reports `external_certificate.status = passed`, `root_transport_certified_by_certificate = true`, `identity_refinement_stable_effective = true`, and `phase_origin_covariance_certified_effective = true`, but $R_{\mathrm{transport}}$ remains `pending` as `branch_transport_not_yet_certified` because `root_ledger_stable_under_refinement = false`. The row also remains `overfit_holdout_fail` with $R_{\mathrm{xval}}\approx1.712369148202459$ for the source-declared quotient. No corrected one-period rerun is authorized from this certificate alone.

The checker binds the external certificate to the current source row with the canonical fingerprint algorithm `sha256-canonical-root-transport-source-record-v1`, excluding `transport_id` from the fingerprint. The first baseline fingerprint is:

```text
e425e02dc35150b687abbae18b468f2acc9efa0a7a5e700eb2cae841bcfed3f9
```

The follow-on [root-ledger refinement stability certificate packet](a0-root-ledger-refinement-stability-certificate.md) tested whether this same phase-origin sidecar could count as active-root ledger refinement evidence. It cannot: `a0-root-ledger-refinement-stability-certificate/v1` rejects the sidecar as `phase-origin-variant-not-root-ledger-refinement`, and the checker keeps $R_{\mathrm{transport}}$ pending. This separates source-record phase-origin covariance from true `active_causal_root_ledger` refinement stability.

## Validation

- `node --check scripts/mass-map/a0-root-transport-phase-origin-variant.mjs`
- `node --check scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs`
- `node --check scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs`
- `node --test tests/a0-root-transport-phase-origin-variant.test.js tests/a0-root-transport-refinement-certificate.test.js`
- `node --test tests/a0-root-ledger-refinement-stability-certificate.test.js tests/a0-branch-chart-revision-checker.test.js`

Promotion decision: priority-only. This packet should not be promoted into `content/markdown/aaa` until a branch-chart row both passes held-out residual and carries the source-record certificate through the checker without weakening the accepted-history boundary.
