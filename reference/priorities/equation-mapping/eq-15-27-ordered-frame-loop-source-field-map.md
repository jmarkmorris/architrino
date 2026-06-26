# EQ-15 And EQ-27 Ordered-Frame Loop Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent packets:
  - [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
  - [EQ-26 And EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs)
- Source fixtures:
  - [spin-magnetic-moment-certificate-attempt.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json)
  - [spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json)
- Rows served: `EQ-15` and `EQ-27`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the shared `EQ-15` / `EQ-27` first blocker to one source-backed non-gauge `ordered_frame_loop` on a retained branch record. Magnetic moment numerics, `weak_visible_branch_ledger`, and `theta_gamma_packet` are not substitutes for this spin-lift carrier.

No score changes.

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

The fixture `spin-magnetic-moment-assigned-spin-g2-negative-control.v1.json` isolates the assigned-spin branch: all rows are accepted-looking and numerically pass same-record, gauge, angular-momentum, nonzero moment-map, and $g_{\mathrm{lead}}=2$ checks, but the checker must return `blocked_assigned_spin_label` with `nextBlocker: eq27.assigned_spin_label`.

## Next Action

Create one durable source-backed `ordered_frame_loop` row on a retained non-coplanar branch record, then run:

```sh
node scripts/equation-mapping/spin-magnetic-moment-certificate.mjs --input scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json --summary --pretty
```

Until that row exists, the correct result remains `missing_accepted_ordered_frame_loop`.
