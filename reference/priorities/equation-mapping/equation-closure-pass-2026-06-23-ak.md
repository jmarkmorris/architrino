# Equation Closure Pass 2026-06-23 AK

## Scope

- Target: score-neutral weak-gravity constitutive residual for `EQ-11`.
- Primary runner: [eq11-weak-gravity-constitutive-residual.mjs](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs).
- Primary attempt input: [eq11-weak-gravity-constitutive-attempt.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-attempt.v1.json).
- Related packet: [EQ-11 And EQ-20 Gravity / Dark-Energy Packet](eq-11-20-gravity-dark-energy-packet.md).
- Claim level: score-neutral executable weak-gravity constitutive residual shape.
- Score disposition: no score changes.

## Closure Question

`EQ-11` was still under-instrumented after the effective-metric, pressure/$\Lambda_{\mathrm{eff}}$, density-compression, and shared-observation runners were added. The missing executable question was:

$$
\Theta_{11\text{-}20}^{(\ell,W)}
\longmapsto
\left(
R_\Phi^{11},
R_{\mu\nu}^{11},
R_G^{\mathrm{shared}},
\mathbf q_{\mathrm{PPN}},
\mathcal P_{\mathrm{prov}},
\mathcal S_{\mathrm{retune}}^{11\text{-}20}
\right).
$$

The new runner asks whether one retained weak-gravity constitutive record can support the Poisson handoff, curvature readout, effective-coupling continuity, PPN handoff, source provenance, and no-hidden-retune witness without using a scalar-only gravity map or split $G_{\mathrm{eff}}$.

## Executable Shape

Run:

```sh
node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs --summary --pretty
```

Current summary:

| Field | Value |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_theta_11_20` |
| Common carrier pass | `true` |
| Shared keys accepted | `true` |
| Weak-gravity numeric pass | `true` |
| Poisson pass | `true` |
| Curvature pass | `true` |
| Coupling-continuity pass | `true` |
| PPN handoff pass | `true` |
| Source provenance pass | `true` |
| Hidden retune pass | `true` |
| Negative controls | `4/4` pass |

The populated mode fails as intended:

```sh
node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs --require-populated --summary --pretty
```

It exits nonzero until the retained weak-gravity rows are accepted and source-backed.

## Required Rows

The runner requires these rows on one carrier:

| Row | Role |
| --- | --- |
| `theta_11_20` | Common retained weak-gravity / pressure carrier. |
| `theta_sea` | Noether sea state carrying density, stress, pressure, delay, cadence, and response variables. |
| `theta_src` | Source loading record for $\rho_{\mathrm{src}}^{\mathrm{eff}}$ and $T_{\mu\nu}^{\mathrm{eff}}$. |
| `constitutive_response` | The $\mathcal C_{\mathrm{NS}}$ response row. |
| `source_branch_ledger` | Active root and source-assembly provenance. |
| `wake_ledger` | Wake, depletion, boundary, and memory provenance. |
| `mass_loading_row` | Mass-map / exposure loading handoff. |
| `metric_projection` | Effective-metric handoff from the weak-field packet. |
| `effective_coupling_row` | $G_{\mathrm{eff}}$ projection from the constitutive record. |
| `poisson_handoff_row` | $R_\Phi^{11}$ row. |
| `sea_stress_pressure_source_row` | Declared $\mathcal S_{\mathrm{sea}}^\Phi$ source. |
| `curvature_readout_row` | $R_{\mu\nu}^{11}$ row. |
| `stress_energy_readout_row` | Effective $T_{\mu\nu}$ row. |
| `effective_coupling_continuity_row` | Shared local/cosmology/growth/lensing/low-acceleration $G_{\mathrm{eff}}$ row. |
| `ppn_metric_handoff` | Guard that scalar-only gravity cannot pass as metric closure. |
| `source_provenance` | Source-loading provenance residual. |
| `no_hidden_retune_witness` | Split-record witness. |

Every row in the attempt fixture is marked `attempt`, so the arithmetic passes are not score evidence.

## Residuals And Negative Controls

The attempt fixture evaluates:

- Poisson handoff $R_\Phi^{11}=\nabla^2\Phi_{\mathrm{eff}}-4\pi G_{\mathrm{eff}}\rho_{\mathrm{src}}^{\mathrm{eff}}-\mathcal S_{\mathrm{sea}}^\Phi$;
- curvature readout $R_{\mu\nu}^{11}=G_{\mu\nu}+\Lambda_{\mathrm{eff}}g_{\mu\nu}^{\mathrm{eff}}-8\pi G_{\mathrm{eff}}T_{\mu\nu}^{\mathrm{eff}}/c_0^4$ on a declared component vector;
- normalized effective-coupling continuity across local, cosmology, growth, CMB-lensing, and low-acceleration consumers;
- PPN handoff through the same bound-vector structure used by the weak-field metric checker;
- source-provenance and hidden-retune residuals.

The negative controls are:

| Control | Intended caught failure |
| --- | --- |
| `poisson_only_scalar_half_test` | A scalar-only map that keeps Poisson arithmetic but fails the PPN / spatial-compliance handoff. |
| `split_effective_coupling` | A local/cosmology split in $G_{\mathrm{eff}}$. |
| `unledgered_source_loading` | A source term without event, wake, or assembly provenance. |
| `hidden_gravity_retune` | A weak-gravity record that changes per observable. |

All four controls fail where expected.

## Score Disposition

No `6/23 b` score changes follow from this pass.

| Row | Current `6/23 b` score | AK disposition |
| --- | --- | --- |
| `EQ-11` | `3` | Still below `4` because $G_{\mathrm{eff}}$, $R_\Phi^{11}$, $R_{\mu\nu}^{11}$, source loading, and coupling-continuity rows are attempt-level. |
| `EQ-20` | `3` | No change; the pressure/$\Lambda_{\mathrm{eff}}$ checker remains the direct executable route for pressure and dark-energy rows. |
| `EQ-07` through `EQ-10` | `4`, `4`, `4`, `3` | No change; the weak-field metric checker owns the $\theta_W$ route, while this runner only consumes its metric/PPN handoff. |

This runner is a useful success marker under the existing score-5 route because it prevents a Poisson-only recovery from being mistaken for Einstein-limit closure.

## Promotion Disposition

Priority-only. The new runner does not supply a reader-facing weak-gravity derivation. Promotion remains blocked until a populated $\Theta_{11\text{-}20}^{(\ell,W)}$ record evaluates the Poisson handoff, curvature readout, effective-coupling continuity, source provenance, and hidden-retune witness on accepted source-backed rows.

## Next Closure Target

Populate one accepted $\Theta_{11\text{-}20}^{(\ell,W)}$ weak-gravity record with source-backed Noether sea state, source loading, constitutive response, $G_{\mathrm{eff}}$, Poisson, curvature, stress-energy, PPN-handoff, coupling-continuity, provenance, and no-hidden-retune rows.
