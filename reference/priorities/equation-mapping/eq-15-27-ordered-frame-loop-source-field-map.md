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
  - [eq15-27-ordered-frame-loop-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-contract-attempt.v1.json)
  - [eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json)
  - [eq15-27-ordered-frame-loop-record-split-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-record-split-durable-source-negative-control.v1.json)
  - [spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json)
  - [spin-magnetic-moment-assigned-spin-g2-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-assigned-spin-g2-durable-source-negative-control.v1.json)
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

| Row | Current score | Primary carrier | Exact first blocker | Smallest accepted evidence route |
| --- | ---: | --- | --- | --- |
| `EQ-15` | `2` | Retained ordered-frame spinor-label pullback on one branch record. | `missing_accepted_ordered_frame_loop` | One accepted, durable, non-gauge `ordered_frame_loop` proving nontrivial $\mathbb Z/2$ holonomy, $4\pi$ restoration, gauge-control, and same-record angular-momentum residuals. |
| `EQ-27` | `2` | Same ordered-frame/exposure quotient plus moment-map magnetic row. | `missing_accepted_ordered_frame_loop` | Same accepted `ordered_frame_loop`, then same-record `moment_map_magnetic` from $\boldsymbol\mu=\int_{\mathfrak D_R}(\mathbf r\times\mathbf j_{\mathrm{exp}})\,d\mathcal E_S$, not assigned spin notation. |

| Shared coordinate | Current answer |
| --- | --- |
| Existing scripts/fixtures/packets | [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs), [spin-magnetic-moment-certificate-attempt.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json), [eq15-27-ordered-frame-loop-source-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json), [eq15-27-ordered-frame-loop-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-contract-attempt.v1.json), and the priority-source, record-split, assigned-spin, and assigned-spin durable-source controls listed in metadata. |
| Fail-closed negative control | Priority/source-map rows fail at `accepted_without_evidence_source`; valid durable source metadata with a split `sameRecordId` fails at `record_split`; assigned-spin or imported $g(q/2m)\mathbf S$ support fails at `eq27.assigned_spin_label` once durable source evidence exists. |
| Smaller next action | Replace the carrier-shell source-contract boundary with a durable non-priority `ordered_frame_loop` evidence object on one `sameRecordId`, then populate `spin_lift` on that same record before any moment-map or leading-$g$ comparison is reviewed. |

Current safe implementation target: replace the carrier-shell source-contract boundary with a durable non-priority `ordered_frame_loop` evidence object on one `sameRecordId`, then populate `spin_lift` on that same record. The existing source-attempt, source-contract boundary, priority-source, record-split, and assigned-spin controls remain score-neutral guardrails; they do not change scores or count as retained evidence.

## EQ-15 Direct Geometry Layer

This layer is score-neutral. It maps the spinor and exchange comparison terms to the retained ordered-frame geometry that must exist before Dirac, Klein-Gordon, or spin-statistics benchmarks can count.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Spinor state $\psi$ or spinor-label components | Retained ordered-frame spinor-label pullback from one non-coplanar branch record, not a primitive field ontology. | `ordered_frame_loop` plus `spin_lift`. | Same `sameRecordId`, retained branch/domain id, loop id, and spin-lift witness later used by angular-momentum, exchange, and moment-map rows. | `visible_so3_closure_import_without_non_gauge_lift` blocks a visible spinor label or closed $SO(3)$ loop without retained non-gauge lift evidence. | A durable accepted `ordered_frame_loop` row on one non-coplanar retained branch record, with source-backed $\mathbb Z/2$ holonomy and spin-lift witness. |
| $2\pi$ sign change and $4\pi$ restoration | Odd $\mathbb Z/2$ holonomy with doubled-path restoration in $\mathrm{Spin}(3)=SU(2)$. | `spin_lift` with $\eta_{\mathrm{spin}}=1$ and `doubledPathRestores=true`. | Same loop map $\Phi_\star$, same retained branch/domain, and same gauge-control row as the ordered-frame loop. | A closed visible $SO(3)$ loop with no odd lift or failed doubled-path restoration remains `spin_lift_not_odd` or `doubled_path_not_restored`. | Accepted spin-lift row sourced to the same retained ordered-frame loop. |
| Dirac/Klein-Gordon dispersion benchmark | Observer-level dispersion residual after ordered-frame, angular-momentum, mass/exposure, and action-unit rows are fixed; the wave equation is a comparison readout, not the carrier. | `ordered_frame_loop`, `angular_momentum_ledger`, downstream mass/exposure rows, and the relevant action-period row before any dispersion residual is evaluated. | The dispersion comparison must consume the same retained branch/domain, angular-momentum ledger, exposure sector, and mass/action convention; no separate wave-equation fit handle is allowed. | `equation_map.imported_formula` blocks importing $(i\hbar\gamma^\mu\partial_\mu-mc)\psi=0$ or the Klein-Gordon operator as substrate ontology before the retained rows exist. | Accepted ordered-frame loop plus same-record angular-momentum and mass/exposure rows; dispersion comparison remains downstream until those rows are source-backed. |
| Spin-statistics or exchange behavior | Exchange-path class and lift obstruction read from the same retained ordered-frame family. | `ordered_frame_loop`, `spin_lift`, `gauge_control`, and an exchange/sector projection row when available. | Same branch/domain id, same spin-lift witness, same exposure quotient, and same no-hidden-retune witness as the spinor-label row. | A separate exchange label or detector-sector row detached from the ordered-frame loop is a record split and must fail before statistics are interpreted. | Accepted exchange/sector row bound to the same source-backed ordered-frame loop. |
| Gauge choice versus physical frame loop | Gauge-control residual showing quotient moves do not erase or create the retained holonomy class. | `gauge_control`. | Same loop id, same retained branch/domain, same spin lift, and same angular-momentum ledger. | Nonzero gauge residual or a gauge-only loop masquerading as physical spin structure remains blocked at `gauge_residual`. | Accepted gauge-control row with residual inside tolerance on the same ordered-frame loop. |
| Angular-momentum ledger for spinor readouts | Same-record angular-momentum accounting for path/return behavior before spinor labels or wave-equation comparisons are read. | `angular_momentum_ledger`. | Same retained branch/domain and same ordered-frame loop as the spin-lift row; no assigned spin label can replace the ledger. | `eq15_27.record_split_durable_source` blocks durable-source rows whose angular-momentum or later moment-map rows point to another `sameRecordId`. | Accepted angular-momentum ledger with $\Delta_{\mathbf J}$ inside tolerance on the same retained record. |

## EQ-27 Direct Geometry Layer

This layer is score-neutral. It maps the magnetic-moment comparison terms to the ordered-frame and exposed-sector geometry that must exist before a leading-$g$ or anomaly comparison can count.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Spin vector $\mathbf S$ | Non-gauge retained ordered-frame loop whose visible $SO(3)$ closure lifts to odd $\mathbb Z/2$ holonomy and $4\pi$ restoration. | `ordered_frame_loop` plus `spin_lift`. | Same `sameRecordId`, retained branch/domain id, loop id, and spin-lift witness used by the angular-momentum and moment-map rows. | `visible_so3_closure_import_without_non_gauge_lift` blocks a visible spin label or closed $SO(3)$ loop that lacks the retained non-gauge lift. | A durable accepted `ordered_frame_loop` row on one non-coplanar retained branch record, with source-backed spin-lift witness. |
| Charge/exposure factor $q_\ell/m_\ell$ | Exposed-sector response read through the same branch's charge/polarity ledger, exposed mass response, and exposure fiber. | `moment_map_magnetic` and `exposure_fiber_residual`, with downstream compatibility to exposed-sector and mass-response carriers. | Same retained branch/domain and same exposure fiber as the ordered-frame loop; no separate lepton-by-lepton retune of charge, mass, or exposure. | `eq15_27.record_split_durable_source` blocks accepted-looking rows that use durable source paths but split one row onto a different `sameRecordId`. | A source-backed exposed-sector record whose moment map and exposure fiber are row-bound to the same ordered-frame branch. |
| Magnetic moment $\boldsymbol\mu_\ell$ | Exposure-current moment map $\boldsymbol\mu_{\mathcal E}$, not the assigned formula $g(q/2m)\mathbf S$. | `moment_map_magnetic`. | Same exposed current geometry, same angular-momentum ledger, same exposure fiber, and same ordered-frame loop. | `eq27.assigned_spin_g2_durable_source` blocks a durable-source row that imports assigned-spin formula text or omits the exposure-current integral. | A nonzero source-backed $\boldsymbol\mu_{\mathcal E}$ computed as an exposure-current integral on the same retained branch. |
| Leading $g=2$ | Covering-degree theorem target from the ordered-frame/spin-lift geometry. | `covering_degree_g2`. | Same loop, same spin lift, same gauge-control witness, and same angular-momentum ledger as the moment-map row. | `spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json` blocks priority-source assigned-spin imports before source evidence; the durable-source control blocks them after source evidence. | A source-backed covering-degree witness with `gLead=2` that does not cite assigned spin notation or observer formula import. |
| Larmor/cyclotron readout $\omega_L,\omega_c$ | Measurement-response comparison between $\boldsymbol\mu_{\mathcal E}$ and the effective EM connection/curl readout from `EQ-13`. | `moment_map_magnetic`, `exposure_fiber_residual`, and later `EQ-13` effective EM rows. | Same moment-map record and same event-bound effective EM readout; apparatus/readout rows cannot tune the moment separately from the ordered-frame ledger. | Priority-only magnetism bridge forbids naked substrate-$B$ labels or iron-filing analogies without both retained carriers. | A same-record moment-map row plus an `EQ-13` effective EM readout on a retained event carrier. |
| Anomaly $a_\ell$ | Residual dressing in the exposure fiber and response rows after leading internal-current geometry is fixed. | `exposure_fiber_residual` after `covering_degree_g2`. | Same exposure fiber, same branch/domain, same ordered-frame ledger, and fixed leading-$g$ row across electron, muon, and tau comparisons. | A zero-fiber or fitted anomaly row without retained exposure nonuniformity remains a hidden-retune bypass. | A source-backed anomaly/residual row that records exposure nonuniformity and dressing without changing the leading spin ledger. |

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

The expected result is no score review: first `missing_accepted_ordered_frame_loop`; after an accepted-looking but empty loop, `spin_lift_not_odd`, `gauge_residual`, `missing_moment_map`, or `eq27.assigned_spin_label`.

The fixture `eq15-27-ordered-frame-loop-priority-source-negative-control.v1.json` isolates the source-evidence branch: all rows are accepted-looking and numerically pass same-record, gauge, angular-momentum, nonzero moment-map, and $g_{\mathrm{lead}}=2$ checks, but every row points back to this priority map. The checker must return `blocked_source_evidence`, `nextBlocker: accepted_without_evidence_source`, and `sourceEvidenceFailureCount: 7`.

The fixture `eq15-27-ordered-frame-loop-record-split-durable-source-negative-control.v1.json` isolates the same-record branch once source evidence is real: its rows are accepted-looking and source-backed by the durable control shell, but `moment_map_magnetic` uses a different `sameRecordId`. The checker must return `blocked_record_split`, `nextBlocker: record_split`, and `scoreDecision: no_score_increase`.

The fixture `spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json` isolates the assigned-spin branch before durable source evidence: its rows are accepted-looking and numerically pass same-record, gauge, angular-momentum, nonzero moment-map, and $g_{\mathrm{lead}}=2$ checks, but its moment-map and covering-degree fields import assigned spin notation while pointing back to this priority map. The strengthened checker correctly stops earlier at `accepted_without_evidence_source`. The durable-source companion `spin-magnetic-moment-assigned-spin-g2-durable-source-negative-control.v1.json` points the same assigned-spin import to the durable control source shell, so the checker must return `blocked_assigned_spin_label`, `nextBlocker: eq27.assigned_spin_label`, and `scoreDecision: no_score_increase`.

## Source-Attempt Fixture

The score-neutral ordered-frame-loop source-attempt fixture is [eq15-27-ordered-frame-loop-source-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json):

```sh
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-source-attempt.v1.json --summary --pretty --require-populated
```

The fixture names one retained branch id, domain id, `Phi_star:S^1->SO(3)` loop, nontrivial $\mathbb Z/2$ holonomy class, spin-lift witness, exposure-current moment-map route, covering-degree witness, and exposure-fiber row on one `sameRecordId`. Every row remains `attempt`, so the expected result is `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_ordered_frame_loop`; the `--require-populated` form must exit nonzero.

The carrier-shell source-contract boundary is staged at [eq15-27-ordered-frame-loop-source-contract.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-contract.v1.json) and exercised by [eq15-27-ordered-frame-loop-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq15-27-ordered-frame-loop-source-contract-attempt.v1.json):

```sh
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/eq15-27-ordered-frame-loop-source-contract-attempt.v1.json --summary --pretty
```

The expected boundary run reports `status: blocked_missing_rows`, `nextBlocker: missing_accepted_spin_lift`, `sourceEvidenceFailureCount: 0`, and `scoreDecision: no_score_increase`. This does not land retained evidence. It only proves that once the parent ordered-frame loop is source-backed, the checker advances to the spin-lift row instead of letting visible $SO(3)$ closure, magnetic moment numerics, or assigned spin notation count as score evidence.

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
