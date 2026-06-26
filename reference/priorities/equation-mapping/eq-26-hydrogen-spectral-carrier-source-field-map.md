# EQ-26 Hydrogen Spectral Carrier Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [hydrogen-gamma-n-spectral-row-toy-scan.mjs](../../../scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs)
- Source fixture: [hydrogen-gamma-n-spectral-row-mock.json](../../../scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json)
- Related source protocol: [Hydrogen Gamma-N Spectral Row Toy Scan](../../../content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md)
- Row served: `EQ-26`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows `EQ-26` to one hydrogen spectral carrier, $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$, over the weak homogeneous hydrogen line set. The carrier may consume support rows from `theta_gamma_packet`, the Compton/recoil Gate A event, and `theta_alpha`, but it cannot be replaced by any of those carriers.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-26` |
| Current score and closure driver | Score `3`; recover one transition-independent hydrogen/Rydberg readout with recovered envelope labels, explicit reduced-mass/recoil/spin/Lamb residuals, and one emission/absorption event ledger. |
| Primary AAA carrier | $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$: the hydrogen spectral channel ledger that supplies electron-envelope gaps, local Noether sea response, and clock/rate conversion from one hydrogen branch. |
| Smallest score-moving evidence object | A two-line, two-resolution $\mathcal C_{\mathrm H}^{\Gamma}$ certificate over `H_alpha_3_to_2` and `H_beta_4_to_2`, with source-backed carrier, recovered labels, computed $E_{\mathrm{env}}$ gaps, shared $\mathbf g_{N,\mathrm H}^{(\ell)}$, shared static response, observer frequency after $C_N=\Gamma_N^{-1}$, and separated residual budget. |
| Exact first blocker | Candidate label `missing_accepted_theta_H_spec`; no direct `EQ-26` checker currently emits this string. |
| Existing scripts/fixtures/packets found | The hydrogen spectral toy runner and fixture listed above; [photon-packet-transfer-residual.mjs](../../../scripts/equation-mapping/photon-packet-transfer-residual.mjs); [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs); [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs); [eq28a-path-frequency-exchange-residual.mjs](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs). |
| Candidate breakthrough angle | Promote the two-line object to a source-field map first, then to a checker contract. Observer Rydberg factors are acceptance tests after labels are recovered, not evidence by themselves. |
| Fail-closed negative control | `observer_rydberg_import_without_hydrogen_carrier`: two observed Rydberg lines match $\Lambda_{ab}$ but the packet lacks source-backed envelope gaps, $\mathbf g_{N,\mathrm H}^{(\ell)}$, static response, and provenance. |
| Smaller next action | Add a checker contract or fixture layer that names `theta_H_spec`, then require the hydrogen runner to fail imported-Rydberg shells before any line-set residual is interpreted. |

## Accepted-Object Contract

The smallest useful object is:

$$
\mathcal C_{\mathrm H}^{\Gamma}
=
\left(
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)},
\mathcal L_{\mathrm H}^{0},
\mathbf g_{N,\mathrm H}^{(\ell)},
\mathbf a^G,
E_{\mathrm{env}}^{(\ell)}(a)-E_{\mathrm{env}}^{(\ell)}(b),
\nu_{a\to b}^{\mathrm{obs},(\ell)},
\mathcal R_{\mathrm{sep}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Minimum source fields:

| Field group | Required content |
| --- | --- |
| Carrier | `theta_H_spec` id, $\ell$, durable source path, hydrogen branch id, and one weak homogeneous line-set id. |
| Lines | At least `H_alpha_3_to_2` and `H_beta_4_to_2`, with recovered principal labels and no per-line carrier split. |
| Envelope gaps | Computed $E_{\mathrm{env}}^{(\ell)}(a)-E_{\mathrm{env}}^{(\ell)}(b)$ from the hydrogen envelope branch, not imported only from Rydberg factors. |
| Noether sea response | Shared $\mathbf g_{N,\mathrm H}^{(\ell)}=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\mathrm{core}}/R_{\mathrm{core},0}))$ with density/delay/scale/core split retained. |
| Static response | Shared $\mathbf a^G$ from the same Noether sea cell; no per-line response record. |
| Photon/action support | Shared $h_\vartheta$, $c_{\gamma,0}^{(\ell)}$, photon output/capture, and recoil convention as support rows, not carrier substitutes. |
| Residual separation | Reduced-mass/recoil, fine/hyperfine, Lamb/wake-dressing, and propagation residuals outside $\Gamma_N$ unless explicitly declared in the residual budget. |
| Provenance | Durable source references, event ledger, and no-hidden-retune witness across both lines and both admissible resolutions. |

## Fail-Closed Controls

- `observer_rydberg_import_without_hydrogen_carrier`: matching $\Lambda_{ab}$ without source-backed envelope gaps or spectral response rows must fail.
- `response_record_mismatch_failure`: one line or resolution changes $\ln\chi_{\text{sea}}$ or another $\mathbf g_{N,\mathrm H}$ component while retaining local line fits.
- `per_line_row_fitting`: each transition receives a private coefficient row.

## 2026-06-26 Two-Line Source Report Contract

The next checker-consumable object is a score-neutral source report, not an accepted row. It should name one carrier id, one weak homogeneous line-set id, and exactly the two initial lines `H_alpha_3_to_2` and `H_beta_4_to_2`.

Minimum fields:

| Field | Required value or role |
| --- | --- |
| `carrierId` | `theta_H_spec` or a concrete descendant id for $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$. |
| `status` | `attempt` until the envelope gaps, response rows, event ledger, and retune witness have durable evidence sources. |
| `sourcePath` | A durable evidence source for the hydrogen spectral carrier, not this coordination packet and not the toy fixture. |
| `lineSetId` | One weak homogeneous hydrogen line-set id shared by both lines. |
| `lines` | `H_alpha_3_to_2` and `H_beta_4_to_2`, each with recovered principal labels and a declared envelope-gap source. |
| `g_N_H` | One shared $\mathbf g_{N,\mathrm H}^{(\ell)}$ record for both lines, preserving density, delay, scale, shape-ratio, and core-scale components. |
| `staticResponseId` | One shared static response row for the same Noether sea cell. |
| `photonSupport` | References to photon/action support rows only; these cannot replace `theta_H_spec`. |
| `residualBudget` | Reduced mass, recoil, fine/hyperfine, Lamb/wake-dressing, and propagation residual slots kept outside $\Gamma_N$ unless explicitly populated. |
| `retuneWitnessId` | One no-hidden-retune witness for both lines and both admissible resolutions. |

The `observer_rydberg_import_without_hydrogen_carrier` negative control should use the same line labels and line-factor arithmetic while omitting source-backed envelope gaps, the shared $\mathbf g_{N,\mathrm H}^{(\ell)}$ record, the static response row, and the retune witness. The expected result is a line-factor match with no score movement and no accepted `theta_H_spec` row.

Current targeted run:

```sh
node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs --pretty
```

reports `packet_expectations_pass=true`, `scenario_count=6`, `scenario_pass_count=2`, `scenario_fail_count=4`, and `expectation_fail_count=0`. This confirms the toy scaffold and failure witnesses are internally consistent; it does not supply retained evidence.

## Next Action

Create a checker-consumable `theta_H_spec` source report for `H_alpha_3_to_2` and `H_beta_4_to_2`, then run:

```sh
node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs --pretty
```

Until source-backed envelope and response rows exist, the correct disposition is no score movement.
