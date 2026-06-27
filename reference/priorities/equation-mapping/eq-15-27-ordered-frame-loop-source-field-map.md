# EQ-15 And EQ-27 Ordered-Frame Loop Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent packets:
  - [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
  - [EQ-26 And EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs)
- Source fixtures:
  - [spin-magnetic-moment-certificate-attempt.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json)
  - [eq15-27-ordered-frame-loop-source-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json)
  - [eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json)
  - [spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json)
- Rows served: `EQ-15` and `EQ-27`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the shared `EQ-15` / `EQ-27` first blocker to one source-backed non-gauge `ordered_frame_loop` on a retained branch record. Magnetic moment numerics, `weak_visible_branch_ledger`, and `theta_gamma_packet` are not substitutes for this spin-lift carrier.

No score changes.

## Priority-Only Magnetism Bridge To EQ-13

This bridge records the magnetism discussion as priority-only routing. It does not create a new equation row, populate accepted evidence, change scores, or promote a substrate magnetic field. `EQ-13` owns the effective EM recovery side: event-bound charge/current continuity, stress/Poynting balance, gauge witness, photon Gate A/B/C rows, and Noether sea response on a retained event carrier. `EQ-27` owns the magnetic-moment response side: an ordered-frame/internal-current moment map, angular-momentum ledger, exposure fiber, leading-$g$ row, apparatus/readout row, and no-hidden-retune witness on one retained branch.

The shared observer-level object is an effective magnetic readout, not a native substrate object:

$$
\mathbf B_{\mathrm{eff}}^\theta
=
\operatorname{curl}_{\mathrm{eff}}\mathbf A_{\mathrm{eff}}^\theta
$$

as shorthand for the connection/curvature/curl-like component extracted from retained wake, current, event, and Noether sea response rows. The bridge may compare magnet/iron-filing behavior through

$$
\mathbf F_{\mathrm{mag}}^{\mathrm{eff}}
\sim
\nabla\left(\boldsymbol\mu_{\mathrm{eff}}\cdot\mathbf B_{\mathrm{eff}}^\theta\right),
$$

but only with $\boldsymbol\mu_{\mathrm{eff}}$ supplied by the `EQ-27` ordered-frame/internal-current ledger and $\mathbf B_{\mathrm{eff}}^\theta$ supplied by `EQ-13` effective EM rows. The comparison reads: an iron branch or domain aligns its exposed ordered-frame/internal-current response with the magnet's effective EM and Noether sea response gradient. It is not evidence for a first-class magnetic substance.

First blockers remain unchanged: `EQ-27` still blocks at `missing_accepted_ordered_frame_loop`, and the `EQ-13` event-bound EM gate still blocks at `missing_accepted_photon_gate_A_input_output`. A magnetic analogy, Maxwell prose row, or naked $B$ field label is a fail-closed imported-formula/substrate-field bypass unless the row binds to those retained carriers.

## Equation Attack Cards

| Row | Current score | Primary carrier | Exact first blocker | Smallest blocker-moving object |
| --- | ---: | --- | --- | --- |
| `EQ-15` | `2` | Retained ordered-frame spinor-label pullback on one branch record. | `missing_accepted_ordered_frame_loop` | One accepted, durable, non-gauge `ordered_frame_loop` proving nontrivial $\mathbb Z/2$ holonomy, $4\pi$ restoration, gauge-control, and same-record angular-momentum residuals. |
| `EQ-27` | `2` | Same ordered-frame/exposure quotient plus moment-map magnetic row. | `missing_accepted_ordered_frame_loop` | Same accepted `ordered_frame_loop`, then same-record `moment_map_magnetic` from $\boldsymbol\mu=\int_{\mathfrak D_R}(\mathbf r\times\mathbf j_{\mathrm{exp}})\,d\mathcal E_S$, not assigned spin notation. |

## Accepted-Object Contract

The smallest useful object is:

$$
\Theta_{\mathrm{spin}\to\mu}^{(\ell,W)}
=
\left(
\mathfrak D_R,
r_\star,
\Phi_\star,
\widetilde\Phi_\star,
\eta_{\mathrm{spin}},
\mathcal E_S,
\mathcal C_{\mathbf J},
\mathbf j_{\mathrm{exp}},
\boldsymbol\mu_{\mathcal E},
g_{\mathrm{lead}},
\mathcal R_{\mathrm{fib}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Required rows on one `sameRecordId`:

| Checker row | Minimum source-field content |
| --- | --- |
| `ordered_frame_loop` | Retained branch/domain id, $\Phi_\star:S^1\to SO(3)$, nontrivial $\mathbb Z/2$ holonomy class, non-coplanar retained branch evidence, durable `sourcePath`, accepted status. |
| `spin_lift` | Same record, $\eta_{\mathrm{spin}}=1$, doubled-path restoration, lift witness into $\mathrm{Spin}(3)=SU(2)$. |
| `gauge_control` | Gauge probe table and physical-vs-gauge witness; quotient moves must preserve the holonomy class. |
| `angular_momentum_ledger` | Same-record $\Delta_{\mathbf J}\le10^{-9}$ with path/return angular-momentum accounting. |
| `moment_map_magnetic` | Nonzero $\boldsymbol\mu_{\mathcal E}$ from the same $\mathcal E_S$ and exposed current geometry. |
| `covering_degree_g2` | $g_{\mathrm{lead}}=2$ within tolerance as a covering-degree theorem result. |
| `exposure_fiber_residual` | Nonnegative $\mathcal R_{\mathrm{fib}}$ carrying exposure nonuniformity and dressing, not a fitted spin-label correction. |

## Fail-Closed Control

Use `visible_so3_closure_import_without_non_gauge_lift`: a fixture supplies a closed visible $SO(3)$ loop and maybe $g_{\mathrm{lead}}=2$, but lacks accepted nontrivial $\mathbb Z/2$ holonomy, same-record gauge-control probes, or computes `moment_map_magnetic` from $g(q/2m)\mathbf S$ instead of the exposure-current moment map.

The expected result is no score movement: first `missing_accepted_ordered_frame_loop`; after an accepted-looking but empty loop, `spin_lift_not_odd`, `gauge_residual`, `missing_moment_map`, or `eq27.assigned_spin_label`.

The fixture `eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json` isolates the source-evidence branch: all rows are accepted-looking and numerically pass same-record, gauge, angular-momentum, nonzero moment-map, and $g_{\mathrm{lead}}=2$ checks, but every row points back to this priority map. The checker must return `blocked_source_evidence`, `nextBlocker: accepted_without_evidence_source`, and `sourceEvidenceFailureCount: 7`.

The fixture `spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json` isolates the assigned-spin branch once source evidence is real: its rows are accepted-looking and numerically pass same-record, gauge, angular-momentum, nonzero moment-map, and $g_{\mathrm{lead}}=2$ checks, but its moment-map and covering-degree fields import assigned spin notation. With the current priority-map source paths, the strengthened checker correctly stops earlier at `accepted_without_evidence_source`; a durable-source version of this control is required before the assigned-spin blocker should become the first failure again.

## Source-Attempt Fixture

The score-neutral ordered-frame-loop source-attempt fixture is [eq15-27-ordered-frame-loop-source-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json):

```sh
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json --summary --pretty --require-populated
```

The fixture names one retained branch id, domain id, `Phi_star:S^1->SO(3)` loop, nontrivial $\mathbb Z/2$ holonomy class, spin-lift witness, exposure-current moment-map route, covering-degree witness, and exposure-fiber row on one `sameRecordId`. Every row remains `attempt`, so the expected result is `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_ordered_frame_loop`; the `--require-populated` form must exit nonzero.

The priority-source control is:

```sh
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json --summary --pretty --require-populated
```

The expected result is `status: blocked_source_evidence`, `scoreDecision: no_score_increase`, `nextBlocker: accepted_without_evidence_source`, and nonzero exit under `--require-populated`.

## Next Action

Create one durable source-backed `ordered_frame_loop` row on a retained non-coplanar branch record, then run:

```sh
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json --summary --pretty
```

Until that row exists, the correct result remains `missing_accepted_ordered_frame_loop`.
