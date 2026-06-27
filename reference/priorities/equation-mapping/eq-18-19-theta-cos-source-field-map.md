# EQ-18 And EQ-19 Theta-Cos Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Source runner: [effective-frw-handoff-residual.mjs](../../../scripts/equation-mapping/effective-frw-handoff-residual.mjs)
- Source fixture: [effective-frw-handoff-attempt.v1.json](../../../scripts/equation-mapping/effective-frw-handoff-attempt.v1.json)
- Rows served: `EQ-18` and `EQ-19`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the effective-FRW and Friedmann first blocker to one source-backed `theta_cos` homogeneous window. The current fixture is coherent as an attempt carrier, but every row is `status: "attempt"` with `sourcePath: "pending-retained-source"`, so the live checker correctly returns `missing_accepted_theta_cos`.

No score changes.

## Equation Attack Cards

| Coordinate | `EQ-18` |
| --- | --- |
| Current score and closure driver | Score `3`; effective FRW is scoped as observer-level projection of evolving Noether sea, clock comparison, and transport records, not expansion of the Euclidean void. |
| Primary AAA carrier | `theta_cos` / `Theta_cos_FRW_handoff`, one homogeneous observer-readout carrier. |
| Smallest score-moving evidence object | Accepted, durable, source-backed `theta_cos` homogeneous window with `pi_frw`, scale-factor row, Hubble row, `theta_read`, fixed-void witness, shared keys, provenance, and no-retune witness on the same carrier. |
| Exact first blocker | `missing_accepted_theta_cos`. |
| Existing scripts, fixtures, and packets found | The effective-FRW handoff runner and fixture listed above, plus the effective-metric/cosmology packet. |
| Candidate breakthrough angle | Use `EQ-17` redshift factorization inversely: $a_{\mathrm{eff}}$ should be the homogeneous readout of endpoint cadence and path-history transport, not an independently fitted FRW scale. |
| Fail-closed negative control | `void_expansion_level_collapse`: any route treating $a_{\mathrm{eff}}$ as Euclidean void expansion must fail before score movement. |
| Smaller-than-report next action | Source-map one homogeneous `theta_cos` window with $\tau_c$, `aBefore`, `aAfter`, $a_{\mathrm{eff}}$, and $H_{\mathrm{eff}}$ provenance. |

| Coordinate | `EQ-19` |
| --- | --- |
| Current score and closure driver | Score `3`; Friedmann-like bookkeeping must remain fixed-void accounting with provenance-bearing source and residual rows. |
| Primary AAA carrier | The same `theta_cos`, with row-specific pressure on $R_H$, $R_\rho$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $k$, and $S_{\mathrm{eff}}$. |
| Smallest score-moving evidence object | Accepted `theta_cos` with accepted Friedmann residual, continuity residual, effective density/pressure/coupling/lambda rows, curvature row, source-term row, provenance, fixed-void witness, and no-retune witness. |
| Exact first blocker | `missing_accepted_theta_cos`. |
| Existing scripts, fixtures, and packets found | The same effective-FRW handoff runner, fixture, and packet. |
| Candidate breakthrough angle | Treat the continuity equation's $\mathcal S_{\mathrm{eff}}$ as the inverse clue: the first score-moving object is source provenance from transport, recycling, assembly exchange, or Noether sea exchange, not a cleaner Friedmann formula. |
| Fail-closed negative control | `theta_cos.window_split`: shared numbers with split carrier ids or source-window ids must fail at shared-key, hidden-retune, or FRW-handoff split checks. |
| Smaller-than-report next action | Source-audit only `source_term_row` plus `source_provenance` for `theta_cos` before touching the rest of the FRW fixture. |

## Current Fixture Inventory

The current handoff fixture declares:

| Field | Attempt value | Current finding |
| --- | --- | --- |
| `handoff.id` | `Theta_cos_FRW_handoff_attempt_0001` | Coherent handoff shape only. |
| `commonCarrierId` | `theta_cos_attempt_0001` | Same-carrier attempt, not accepted evidence. |
| `theta_cos.id` | `theta_cos_attempt_0001` | First required row; status `attempt`. |
| `theta_cos.sourcePath` | `pending-retained-source` | Non-concrete; cannot count as accepted evidence. |
| `noether_sea_window` | `W_NS_cos_attempt_0001` | Needs explicit source-backed homogeneous/isotropic window. |
| `tauClockId` | `tau_c_attempt_0001` | Bookkeeping only. |
| `aBefore` | `1` | Numeric attempt. |
| `aAfter` | `1.1` | Numeric attempt. |
| `aEff` | `1` | Numeric attempt. |
| `H_eff` | `0.1` | Hubble residual passes numerically. |
| `S_eff` | `0` | Shape allowed, not source-backed. |
| source provenance rows | `transport`, `noether_sea_exchange`, both contribution `0` | Need retained source provenance before they count. |
| fixed-void witness | `euclideanVoidExpansion=false`, `voidScaleDrift=0` | Diagnostic pass only. |
| no-retune witness | `S_retune_FRW_attempt_0001`, residual `0` | Numeric pass only. |

The shared keys are present as attempt rows: `theta_cos_id`, `a_eff`, `H_eff`, `rho_eff`, `P_eff`, `G_eff`, `Lambda_eff`, `k`, and `S_eff`. They agree numerically across the attempt projections, but shared-key agreement is not score evidence while the rows are attempt-level.

## Smallest Accepted Object

The first accepted object is a source-backed `theta_cos` row:

```json
{
  "status": "accepted",
  "id": "theta_cos_<source-id>",
  "carrierId": "theta_cos_<source-id>",
  "sourcePath": "<durable-source-file>",
  "windowId": "<homogeneous-noether-sea-window>",
  "tauClockId": "<source-backed tau_c row>",
  "fixedVoidMetricId": "<source-backed fixed-void witness>",
  "sharedKeys": ["theta_cos_id", "a_eff", "H_eff", "rho_eff", "P_eff", "G_eff", "Lambda_eff", "k", "S_eff"]
}
```

That row alone should only advance the first blocker inside the checker. `EQ-18` and `EQ-19` still need the rest of the same-carrier rows before any score movement: `cosmology_carrier`, `noether_sea_window`, `assembly_provenance_record`, `metric_projection`, `redshift_transfer_handoff`, `pi_frw`, `theta_read`, `scale_factor_row`, `hubble_row`, effective density/pressure/coupling/lambda rows, curvature row, source-term row, Friedmann residual, continuity residual, source provenance, and no-hidden-retune witness.

## Direct Geometry Layer

| Standard comparison term | AAA geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Homogeneous cosmology carrier identity | `theta_cos` homogeneous observer-readout carrier, not Euclidean void expansion | `theta_cos`, `cosmology_carrier`, `noether_sea_window` | Same carrier id, homogeneous Noether sea window, source path, `tauClockId`, fixed-void witness, and shared keys across `EQ-18` and `EQ-19` | `status_flip`; `self_reference`; `theta_cos.window_split` | Durable source-backed `theta_cos` retained-window row with accepted carrier/window identity and fixed-void witness. |
| Effective FRW scale factor and Hubble readouts | $a_{\mathrm{eff}}$ and $H_{\mathrm{eff}}$ as readouts of clock comparison, path-history transport, and medium evolution | `pi_frw`, `theta_read`, `scale_factor_row`, `hubble_row`, `redshift_transfer_handoff` | Same carrier, $\tau_c$, `aBefore`, `aAfter`, $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, transport provenance, and readout handoff | `void_expansion_level_collapse`; `theta_cos.window_split` | Accepted FRW handoff rows whose scale and Hubble residuals consume one `theta_cos` record rather than a fitted expansion level. |
| Friedmann density/pressure/coupling/lambda terms | Effective density, pressure, coupling, curvature, and lambda bookkeeping from fixed-void source accounting | `effective_density_row`, `effective_pressure_row`, `effective_coupling_row`, `effective_lambda_row`, `curvature_row`, `friedmann_residual` | Same $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $k$, carrier id, and source provenance | `theta_cos.window_split`; `hidden_source_term` | Accepted Friedmann residual row bound to the same effective-source rows and carrier as the FRW projection. |
| Continuity/source term | $\mathcal S_{\mathrm{eff}}$ as retained source provenance from transport, recycling, assembly exchange, or Noether sea exchange | `source_term_row`, `continuity_residual`, `source_provenance`, `assembly_provenance_record` | Same carrier, source-term row, provenance ledger, density/pressure rows, and continuity residual as the Friedmann row | `hidden_source_term`; `theta_cos.window_split` | Accepted source-provenance row plus continuity residual proving the source term is not fitted after the fact. |
| Fixed-void discipline | Witness that $a_{\mathrm{eff}}$ is an observer-level readout, not physical expansion of the Euclidean void | fixed-void witness carried by `theta_cos` / handoff fields | Same fixed-void metric id, carrier, scale-factor row, Hubble row, and no-retune witness | `void_expansion_level_collapse` | Accepted fixed-void witness with zero or bounded void-scale drift on the same `theta_cos` source report. |
| Shared keys and no-hidden-retune witness | Same-key ledger for `theta_cos_id`, $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $k$, and $S_{\mathrm{eff}}$ | shared-key rows and `no_hidden_retune_witness` | Same carrier id, shared-key values, provenance row, source path, and no-hidden-retune residual across FRW and Friedmann consumers | `theta_cos.window_split`; hidden-retune shared-key mismatch | Populated same-carrier `theta_cos` packet with all FRW, Friedmann, continuity, source-provenance, fixed-void, and retune rows accepted from durable evidence. |

## Fail-Closed Controls

- `status_flip`: a row promoted from `attempt` to `accepted` while retaining `pending-retained-source` must fail source concreteness.
- `self_reference`: this map, the attempt fixture, or the parent packet is not retained cosmology evidence.
- `void_expansion_level_collapse`: treating $a_{\mathrm{eff}}$ as Euclidean void expansion fails the fixed-void witness.
- `theta_cos.window_split`: putting `pi_frw`, `source_term_row`, `friedmann_residual`, or `continuity_residual` on a different carrier id must fail before score movement.
- `hidden_source_term`: nonzero or fitted $\mathcal S_{\mathrm{eff}}$ without transport, recycling, assembly-exchange, or Noether sea provenance is not accepted evidence.

## Next Action

Create one durable source-backed `theta_cos` retained-window row, then run:

```sh
node scripts/equation-mapping/effective-frw-handoff-residual.mjs --input scripts/equation-mapping/effective-frw-handoff-attempt.v1.json --summary --pretty
```

Until that row exists, the correct outcome remains `missing_accepted_theta_cos`.
