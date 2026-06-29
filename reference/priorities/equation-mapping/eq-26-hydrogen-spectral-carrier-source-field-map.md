# EQ-26 Hydrogen Spectral Carrier Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [hydrogen-gamma-n-spectral-row-toy-scan.mjs](../../../scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs)
- Source fixture: [hydrogen-gamma-n-spectral-row-mock.json](../../../scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json)
- Related source protocol: [Hydrogen Gamma-N Spectral Row Toy Scan](../../../content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md)
- Row served: `EQ-26`
- Claim level: checker-backed source-field map and attack card
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
| Smallest accepted evidence object | A two-line, two-resolution $\mathcal C_{\mathrm H}^{\Gamma}$ certificate over `H_alpha_3_to_2` and `H_beta_4_to_2`, with source-backed carrier, recovered labels, computed $E_{\mathrm{env}}$ gaps, shared $\mathbf g_{N,\mathrm H}^{(\ell)}$, shared static response, observer frequency after $C_N=\Gamma_N^{-1}$, and separated residual budget. |
| Exact first blocker | `missing_accepted_theta_H_spec`, emitted by [eq26-hydrogen-spectral-carrier-identity-check.mjs](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs) on the default source attempt. |
| Existing scripts/fixtures/packets found | [eq26-hydrogen-spectral-carrier-identity-check.mjs](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs), [eq26-hydrogen-spectral-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-source-attempt.v1.json), [eq26-hydrogen-spectral-carrier-carrier-shell-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-carrier-shell-source-contract-attempt.v1.json), [eq26-hydrogen-spectral-carrier-observer-rydberg-import-negative-control.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-observer-rydberg-import-negative-control.v1.json), [eq26-hydrogen-spectral-carrier-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-priority-source-negative-control.v1.json), [eq26-hydrogen-spectral-carrier-support-substitution-negative-control.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-support-substitution-negative-control.v1.json), the hydrogen spectral toy runner and fixture listed above, [photon-packet-transfer-residual.mjs](../../../scripts/equation-mapping/photon-packet-transfer-residual.mjs), [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs), [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs), and [eq28a-path-frequency-exchange-residual.mjs](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs). |
| Candidate breakthrough angle | Promote the two-line object from checker-emitted carrier identity to source-backed parent carrier, then to recovered-label and envelope-gap rows. Observer Rydberg factors are acceptance tests after labels are recovered, not evidence by themselves. |
| Fail-closed negative control | `observer_rydberg_import_without_hydrogen_carrier`: two observed Rydberg lines match $\Lambda_{ab}$ but the packet lacks source-backed envelope gaps, $\mathbf g_{N,\mathrm H}^{(\ell)}$, static response, and provenance. |
| Smaller next action | Replace the carrier-shell source contract with a real source-backed `theta_H_spec` parent carrier, then populate `recovered_label_rows` and `envelope_gap_rows` on the same `carrierId`, `branchId`, `lineSetId`, `staticResponseId`, `gammaNRowId`, `eventLedgerId`, and `retuneWitnessId`. |

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

## Direct Geometry Layer

This layer keeps the hydrogen/Rydberg comparison as a same-record spectral-carrier problem. It does not let observed line factors, a photon packet, a Compton/recoil event, or `theta_alpha` substitute for the hydrogen envelope and Noether sea response rows.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Rydberg line factor $\Lambda_{ab}=1/b^2-1/a^2$ | Principal-label recovery and envelope-gap readout from one hydrogen branch. | `theta_H_spec`, `lineSetId`, recovered label rows, `envelope_gap_source` | `H_alpha_3_to_2` and `H_beta_4_to_2` share one carrier id, branch id, line-set id, and envelope-gap source. | `observer_rydberg_import_without_hydrogen_carrier` rejects matching $\Lambda_{ab}$ without source-backed envelope gaps. | Accepted `theta_H_spec` carrier plus two recovered-label and envelope-gap rows. |
| Observed line frequencies $\nu_{a\to b}^{\mathrm{obs}}$ | Clock/rate conversion after the local $\Gamma_N^{(\ell)}$ readout, not direct cadence fitting. | `gamma_N_row`, `staticResponseId`, observer frequency rows | The same $\Gamma_N^{(\ell)}$, static response, and line-set carrier feed both observed frequencies. | `direct_cadence_multiplication_failure` rejects applying $\Gamma_N$ with the wrong sign or as an imported multiplier. | Accepted clock/rate conversion row bound to the hydrogen spectral carrier. |
| $\mathbf g_{N,\mathrm H}^{(\ell)}=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\mathrm{core}}/R_{\mathrm{core},0}))$ | Noether sea response vector for the active hydrogen spectral channel. | `g_N_H`, `staticResponseId`, response-row support | Density, delay, scale, shape-ratio, and core-scale components stay in one response record across both lines and both admissible resolutions. | `response_record_mismatch_failure` rejects per-line or per-resolution response changes. | Accepted shared Noether sea response vector and static-response row for one hydrogen branch. |
| $E_{\mathrm{env}}^{(\ell)}(a)-E_{\mathrm{env}}^{(\ell)}(b)$ | Electron-envelope energy-gap readout before observer conversion. | envelope branch rows, `lineSetId`, photon/action support rows | Envelope gaps, $h_\vartheta$, and $c_{\gamma,0}^{(\ell)}$ are consumed as support rows with one line-set id, not refit per transition. | `per_line_row_fitting` rejects private coefficient rows for individual transitions. | Accepted envelope-gap rows plus shared action/photon support references. |
| Reduced mass, recoil, fine/hyperfine, Lamb/wake, and propagation residuals | Residual budget around the carrier readout, not the carrier definition itself. | `residualBudget`, recoil convention, Lamb/wake row, propagation row | Every residual slot cites the same hydrogen carrier, photon support, recoil convention, and event ledger. | Residual-budget controls reject hiding corrections inside $\Gamma_N$ or changing support rows after fitting line factors. | Accepted residual-budget object with named correction rows and one no-hidden-retune witness. |
| Two-line, two-resolution consistency | Cross-resolution invariance of the spectral response and line-set readout. | `H_alpha_3_to_2`, `H_beta_4_to_2`, resolution rows, `retuneWitnessId` | Both lines and both admissible resolutions share the same carrier, response record, static response, and retune witness. | `endpoint_row_violation_failure` and response-mismatch controls reject endpoint imbalance or resolution-local response swaps. | Accepted two-line, two-resolution $\mathcal C_{\mathrm H}^{\Gamma}$ certificate. |
| Source provenance and support-carrier separation | Durable evidence identity for the hydrogen spectral carrier. | `sourcePath`, event ledger, `theta_gamma_packet` support, Gate A support, `theta_alpha` support | Photon/action, Compton/recoil, and alpha rows are support references only; none replaces `theta_H_spec`. | Coordination/probe-source controls reject priority packets, toy fixtures, and support carriers as hydrogen spectral evidence. | Source-backed `theta_H_spec` object with durable non-priority evidence, support-row references, and no-hidden-retune witness. |

## Fail-Closed Controls

- `observer_rydberg_import_without_hydrogen_carrier`: matching $\Lambda_{ab}$ without source-backed envelope gaps or spectral response rows must fail.
- `eq26.priority_source_accepted_carrier`: accepted-looking carrier and rows sourced only to this priority packet must fail at `accepted_without_evidence_source`.
- `eq26.support_carrier_substitution`: accepted-looking photon/action, Gate A, or `theta_alpha` support rows must fail if they are promoted into the `theta_H_spec` carrier.
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

The direct identity checker is:

```sh
node scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs --summary --pretty
```

The default source attempt returns `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_theta_H_spec`. Its three embedded negative controls pass: the observer-Rydberg-import control stays blocked at `missing_accepted_theta_H_spec`, the priority-source control fails at `accepted_without_evidence_source`, and the support-carrier substitution control fails at `theta_H_spec_support_substitution`.

The carrier-shell source-contract boundary is:

```sh
node scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs \
  --input scripts/equation-mapping/eq26-hydrogen-spectral-carrier-carrier-shell-source-contract-attempt.v1.json \
  --summary --pretty
```

This boundary marks only the parent `theta_H_spec` carrier accepted-looking against [eq26-hydrogen-spectral-carrier-source-contract.v1.json](../../../scripts/equation-mapping/eq26-hydrogen-spectral-carrier-source-contract.v1.json) while every child row remains `attempt`. It advances only to `nextBlocker: missing_accepted_recovered_label_rows`; the same command with `--require-populated` exits nonzero. This is a boundary test, not accepted retained evidence.

The `observer_rydberg_import_without_hydrogen_carrier` negative control uses the same line labels and line-factor arithmetic while omitting source-backed envelope gaps, the shared $\mathbf g_{N,\mathrm H}^{(\ell)}$ record, the static response row, and the retune witness. The expected result is a line-factor match with no score change and no accepted `theta_H_spec` row.

Current targeted run:

```sh
node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs --pretty
```

reports `packet_expectations_pass=true`, `scenario_count=6`, `scenario_pass_count=2`, `scenario_fail_count=4`, and `expectation_fail_count=0`. This confirms the toy scaffold and failure witnesses are internally consistent; it does not supply retained evidence.

## Next Action

Create a durable source-backed `theta_H_spec` source report for `H_alpha_3_to_2` and `H_beta_4_to_2`, then run:

```sh
node scripts/equation-mapping/eq26-hydrogen-spectral-carrier-identity-check.mjs --input <source-backed-theta-H-spec>.json --summary --pretty --require-populated
```

Until source-backed envelope, response, event-ledger, residual-budget, provenance, and no-hidden-retune rows exist, the correct disposition is no score change.
