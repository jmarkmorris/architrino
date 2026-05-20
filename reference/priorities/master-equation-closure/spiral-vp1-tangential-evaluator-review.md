# VP-1 Tangential Evaluator Review

Status. Worker A proof/code-review packet for the VP-1 weighted tangential-drive interval-evaluator route. This review is priority-only material: it does not promote VP-1 into authored AAA prose, and it does not edit the runner, sidecar, generated report, or priority list.

Coordinator follow-up. The main lane subsequently implemented a 256-slab outward pointwise-sum evaluator in [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py). The accepted tangential sidecar row now uses the outward-evidence boundary specified in this review, not the sampled Simpson/trapezoid diagnostic.

Reviewed artifacts:

- [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py)
- [spiral-vp1-tangential-interval-proof.md](spiral-vp1-tangential-interval-proof.md)
- [spiral-vp1-current-interval-rows.json](spiral-vp1-current-interval-rows.json)
- [spiral-branch-chart-interval-report.md](spiral-branch-chart-interval-report.md)

## Verdict

The current evaluator outputs are not theorem-grade tangential-drive evidence. The runner's `tangential_drive_summary` is a sampled quadrature diagnostic with `theorem_grade_interval_bound: false`; its Simpson, trapezoid, half-resolution trapezoid, convergence gap, and diagnostic estimate interval can support intuition and regression checks, but they cannot change `tangential_drive` from `blocked` to `certified_fail`.

The sidecar row is also correctly blocked:

```text
tangential_drive.status = blocked
claim_level = pointwise reduction target, interval evaluator pending
```

The proof packet gives a valid reduction target, not a completed interval certificate. A future evaluator may be accepted only if it emits outward interval bounds tied to the fixed VP-1 candidate and retained $P_1,P_2,P_3,S_1$ active chart.

## Acceptable Outward Evidence

The following outputs can be accepted as theorem-grade tangential evidence if the sidecar candidate still matches $a=1/10$, $b_\ast=7/2$, $I_\ast=[-\pi/6,\pi/6]$, $\Delta_{\mathrm{co}}=1/2$, $D_{\mathrm{cert}}=[1/2,4\pi]$, and active labels $P_1,P_2,P_3,S_1$.

| Evaluator output | Accept as | Required content |
| --- | --- | --- |
| Pointwise branch lower certificate | `tangential_drive: certified_fail` | Outward lower rows on the active root curves satisfying $C_{P_1}\ge0.44117$, $C_{P_2}\ge-0.31063$, $C_{P_3}\ge0.02965$, and $C_{S_1}\ge-0.11011$, plus the arithmetic implication $T(\theta)\ge0.05008$ and $\mathcal{D}_T(I_\ast)^-\ge0.026221826681962806>0$. |
| Direct weighted integral certificate | `tangential_drive: certified_fail` | An outward interval for the retained-chart integral with lower endpoint $\mathcal{D}_T(I_\ast)^-\ge0$. The report may give the sharper practical target $\mathcal{D}_T(I_\ast)^-\ge0.04012$, but nonnegative lower endpoint is the rejection condition. |
| Strict negative tangential-drive interval | `tangential_drive: passed` | An outward interval with upper endpoint $\mathcal{D}_T(I_\ast)^+\le-\varepsilon_T$ for a declared strict $\varepsilon_T>0$. No current artifact supplies such an interval. |

Each accepted output must state that the elementary-function bounds are outward rounded or otherwise rigorously enclosing; that the active root curves are enclosed inside the retained tubes on every slab; that the root-boundary sign rows and active $|J|$ floors apply on the same slabs/tubes; and that the contribution formula uses the same $S_T$, $\Lambda$, and $J$ definitions as the runner.

## Outputs That Must Remain Blocked

The following outputs must not be accepted as theorem-grade tangential evidence:

- The current `diagnostic_estimate_interval`, because it is built from sampled Simpson/trapezoid convergence and a heuristic diagnostic pad, not outward integration.
- The branch `tangential_min` and `tangential_max` rows in the generated report, because they are sampled branch statistics from `scan_active_chart`.
- The sampled root ranges in the tangential packet, because the packet explicitly says they are not theorem-grade enclosures.
- A sidecar row that says `certified_fail` but lacks an outward lower endpoint or branch lower certificate in `data`.
- Any interval computed on changed candidate constants, changed $D_{\mathrm{cert}}$, changed weight $w(\theta)=\cos^2(3\theta)$, relabeled active roots, or roots outside the retained $P_1,P_2,P_3,S_1$ chart.
- Any interval whose decision endpoint touches or crosses the boundary: $\mathcal{D}_T(I_\ast)^-<0$ for a rejection row, or $\mathcal{D}_T(I_\ast)^+>-\varepsilon_T$ for a passing row.

## Runner Safety Notes

The sidecar parser validates schema, row names, statuses, candidate constants, and active labels. It does not currently prove or re-check that a `tangential_drive: certified_fail` row contains a valid outward lower bound. Therefore the theorem-grade safety boundary is the reviewed proof packet or a future semantic validator, not the parser alone.

The current readiness logic also requires the radial row to be resolved before a tangential-drive rejection becomes theorem grade:

```text
candidate_rejected =
  structural_rows_passed
  and (
    radial_turn == certified_fail
    or (radial_turn == passed and tangential_drive == certified_fail)
  )
```

So even a valid future `tangential_drive: certified_fail` row will leave VP-1 theorem-grade status blocked until `radial_turn` is either `passed` or independently `certified_fail`.

## Claim Map

- Ontology: none added.
- Derivation/closure target: theorem-grade tangential rejection is reduced to either four outward branch contribution lower rows or a direct outward weighted-integral lower row on the retained active chart.
- Effective summary: the current sampled diagnostic remains a positive-drive VP-1 failure signal, but not a proof row.
- Speculation: none promoted.
