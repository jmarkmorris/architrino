# Spiral VP-1 Interval Integration Plan

Status. Team-agent worker integration design packet for the VP-1 interval rows. This packet is not an implementation, does not edit `spiral_branch_chart_certificate.py`, and does not regenerate [spiral-branch-chart-interval-report](spiral-branch-chart-interval-report.md).

Claim level. Minimal executable integration plan. The goal is to let the runner consume theorem-grade interval rows when they exist while preserving the sampled VP-1 runner as the unchanged default path.

## Source Signals

The current runner already emits a replayable sampled branch ledger with interval-proof blockers:

- [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py) builds sampled active roots, finite memory, radial threshold, tangential quadrature, inactive-gap diagnostics, proof obligations, markdown output, and `--require-theorem-grade`.
- [spiral-branch-chart-interval-report](spiral-branch-chart-interval-report.md) records the current sampled statuses: `sampled_pass` for active-root/Jacobian rows, `blocked` for inactive gaps and root transport, `threshold_reported` for radial turn, `sampled_fail` for tangential drive, and `not_evaluated` for dependency status.
- [spiral-vp1-root-jacobian-proof](spiral-vp1-root-jacobian-proof.md) supplies fixed active tubes $P_1,P_2,P_3,S_1$, inactive complement seed gaps, and the interval target $\nu_{\mathrm{cert}}=1.50$.
- [spiral-vp1-inactive-memory-proof](spiral-vp1-inactive-memory-proof.md) supplies the certified finite-memory bound $B_{\mathrm{mem}}^{\mathrm{VP1}}$, the self-coincidence clearance for $0<\Delta<1/2$, the inactive-complement box-cover contract, and the root-transport residual contract.
- [spiral-vp1-drive-verdict-proof](spiral-vp1-drive-verdict-proof.md) supplies the radial-turn interval rule and the weighted tangential-drive rule: $\mathcal{D}_T(I_\ast)$ passes only if its outward upper endpoint is at most $-\varepsilon_T$, and VP-1 is certified as a failed candidate if its outward lower endpoint is nonnegative on the certified chart.

## Minimal Code-Change Boundary

The smallest safe extension is an optional typed sidecar path:

```text
python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py \
  --format json \
  --interval-proof-rows path/to/vp1-interval-rows.json
```

If `--interval-proof-rows` is absent, the sampled runner should keep the current behavior and exit codes. The sampled functions should not be replaced, and the runner should not parse worker markdown. Markdown proof packets remain human-facing provenance; the executable should consume only a small JSON row packet produced by the coordinator or by later interval code.

The optional interval path should be append-only:

1. Build the existing sampled certificate exactly as today.
2. Load and validate the interval row packet only if the new CLI flag is present.
3. Promote only the proof-obligation rows whose interval evidence is present, typed, and candidate-compatible.
4. Compute theorem-grade readiness from the promoted obligation matrix and a separate candidate verdict.
5. Render an additional interval-row provenance section only when a packet is loaded.

## Data Structures To Add

Add a compact row representation rather than a broad proof engine:

```python
@dataclass(frozen=True)
class IntervalProofRow:
    row: str
    status: str
    source: str
    claim_level: str
    data: dict
```

Recommended packet shape:

```json
{
  "schema": "spiral_vp1_interval_rows.v1",
  "candidate": {
    "a": 0.1,
    "b_star": 3.5,
    "theta_interval": [-0.5235987755982988, 0.5235987755982988],
    "delta_co": 0.5,
    "delta_cert": [0.5, 12.566370614359172],
    "active_labels": ["P_1", "P_2", "P_3", "S_1"]
  },
  "rows": {
    "partner_active_roots": {"status": "passed", "source": "...", "data": {}},
    "self_active_roots": {"status": "passed", "source": "...", "data": {}},
    "jacobian_floor": {"status": "passed", "source": "...", "data": {}},
    "inactive_gaps": {"status": "passed", "source": "...", "data": {}},
    "root_transport": {"status": "passed", "source": "...", "data": {}},
    "radial_turn": {"status": "passed", "source": "...", "data": {}},
    "tangential_drive": {"status": "certified_fail", "source": "...", "data": {}},
    "dependency_status": {"status": "passed", "source": "...", "data": {}}
  }
}
```

Use only three interval-sidecar statuses in the first pass:

| Status | Meaning |
| --- | --- |
| `passed` | The row condition is certified by outward interval evidence. |
| `certified_fail` | A drive verdict row is certified in the strict failing direction for VP-1. In the first extension this status should be accepted only for `radial_turn` and `tangential_drive`. |
| `blocked` | The row is absent, sampled-only, schema-invalid, provenance-incomplete, or its interval touches the decision boundary. |

Keep the sampled statuses `sampled_pass`, `sampled_fail`, `threshold_reported`, `not_evaluated`, and `failed` for the default runner path.

## Functions To Add

Add narrowly scoped helpers around the existing certificate:

| Function | Responsibility |
| --- | --- |
| `load_interval_proof_packet(path: str | None) -> dict | None` | Return `None` when no path is supplied; otherwise load JSON and fail fast on unreadable or malformed input. |
| `parse_interval_rows(packet: dict) -> dict[str, IntervalProofRow]` | Validate row keys and normalize row objects without interpreting proof mathematics. |
| `validate_interval_candidate(packet: dict, certificate: dict) -> list[str]` | Require the sidecar to match $a=1/10$, $b_\ast=7/2$, $I_\ast=[-\pi/6,\pi/6]$, $\Delta_{\mathrm{co}}=1/2$, $D_{\mathrm{cert}}=[1/2,4\pi]$, and labels $P_1,P_2,P_3,S_1$. |
| `evaluate_interval_row(row: IntervalProofRow, certificate: dict) -> dict` | Convert a typed row into a proof-obligation row with a status, technical value, source, and bound summary. |
| `merge_interval_obligations(sampled: list[dict], interval_rows: dict[str, IntervalProofRow], certificate: dict) -> list[dict]` | Promote only rows with accepted interval evidence; leave missing rows at the sampled/blocker status. |
| `resolve_vp1_verdict(obligations: list[dict]) -> dict` | Compute `candidate_verdict`, `theorem_grade`, `first_nonpassing_obligation`, and `priority_item_complete`. |
| `interval_support_summary(packet: dict | None, validation_errors: list[str]) -> dict` | Surface sidecar provenance and validation state in JSON and markdown. |

Minimal call-site changes:

- Add `--interval-proof-rows` to `main(...)`.
- Let `build_certificate(args)` load the optional packet after the sampled summaries are built.
- Let `proof_obligation_matrix(...)` accept optional interval rows or add a post-processing merge step immediately after the sampled matrix is built.
- Keep `--require-theorem-grade` tied only to `certificate["theorem_readiness"]["theorem_grade"]`.

## Proof Rows To Emit

The runner should keep the existing proof-obligation row names. The interval sidecar only upgrades their status and technical value.

| Row | Expected interval status | Acceptance rule |
| --- | --- | --- |
| `candidate_history` | `passed` | Sidecar candidate constants exactly match the VP-1 packet. If the sidecar candidate differs, reject the sidecar and keep theorem grade false. |
| `partner_active_roots` | `passed` | The packet certifies exactly $P_1,P_2,P_3$ in $D_{\mathrm{cert}}$ with sign-changing tube boundaries, monotone derivative rows using $F_\Delta=-J/b(\theta)$, and no unlisted partner root. |
| `self_active_roots` | `passed` | The packet certifies exactly $S_1$ in $D_{\mathrm{cert}}$ and keeps $0<\Delta<1/2$ in the separate self-coincidence row. |
| `jacobian_floor` | `passed` | The packet gives an outward active-tube bound $\nu_J\ge1.50$ and every active Jacobian interval avoids zero. |
| `inactive_gaps` | `passed` | The packet subtracts the active tubes from $I_\ast\times D_{\mathrm{cert}}$ and reports $g_{\mathrm{inactive}}^{\mathrm{VP1}}>0$ on every inactive complement box. |
| `self_coincidence_clearance` | `passed` | The existing analytic bound remains accepted: $\inf |F_s|/\Delta\ge0.6794678492\ldots>0$ on $0<\Delta<1/2$. A sidecar may repeat it but should not be required. |
| `finite_memory` | `passed` | The runner computes $B_{\mathrm{mem}}^{\mathrm{VP1}}<4\pi$ and the interval packet reports retained active enclosures below $B_{\mathrm{mem}}^{\mathrm{VP1}}$. |
| `root_transport` | `passed` | The packet reports $\max_\alpha\sup_{\theta\in I_\ast}\mathcal{R}_{\mathrm{tr},\alpha}\le\varepsilon_{\mathrm{tr}}$ on the same active labels. |
| `radial_turn` | `passed`, `certified_fail`, or `blocked` | With branch interval $B_r(0)\in[B_r^-,B_r^+]$ and declared $\Gamma$, pass if $\Gamma+B_r^->0$ strictly; certify fail if $\Gamma+B_r^+\le0$; block if $\Gamma$ is absent or the interval touches zero. |
| `tangential_drive` | `passed`, `certified_fail`, or `blocked` | With outward interval $\mathcal{D}_T(I_\ast)\in[D_T^-,D_T^+]$, pass if $D_T^+\le-\varepsilon_T$; certify fail if $D_T^-\ge0$; block if the interval straddles the decision boundary or is sampled-only. |
| `dependency_status` | `passed` | The sidecar names the theorem-grade circular interval and large-$\beta$ tail certificate as the dependency source. Until this is supplied, keep `not_evaluated`. |

Rows that are merely sampled should never become theorem-grade by status renaming. In particular, the current positive sampled diagnostic for $\mathcal{D}_T(I_\ast)$ should remain `sampled_fail` until an outward interval row proves $D_T^-\ge0$.

## Theorem-Grade And CLI Conditions

Define theorem-grade as a resolved interval verdict, not as sampled support. The first extension should compute three booleans:

```text
structural_rows_passed =
  candidate_history
  partner_active_roots
  self_active_roots
  jacobian_floor
  inactive_gaps
  self_coincidence_clearance
  finite_memory
  root_transport
  dependency_status
are all passed

candidate_passed =
  structural_rows_passed
  and radial_turn == passed
  and tangential_drive == passed

candidate_rejected =
  structural_rows_passed
  and (
    radial_turn == certified_fail
    or (radial_turn == passed and tangential_drive == certified_fail)
  )
```

Then set:

```text
theorem_grade = candidate_passed or candidate_rejected
```

Recommended verdict strings:

| Condition | `candidate_verdict` | `priority_item_complete` |
| --- | --- | --- |
| `candidate_passed` | `theorem_grade_passed_bare_spiral` | `true` |
| `radial_turn == certified_fail` with structural rows passed | `theorem_grade_rejected_radial_turn` | `false` |
| `radial_turn == passed` and `tangential_drive == certified_fail` with structural rows passed | `theorem_grade_rejected_tangential_drive` | `false` |
| Anything else | `vp1_interval_blocked` or current sampled blocker status | `false` |

`--require-theorem-grade` should still fail when:

- no interval sidecar is supplied;
- the sidecar is unreadable, malformed, schema-invalid, or candidate-incompatible;
- any structural row is absent, sampled-only, blocked, or not `passed`;
- `dependency_status` remains `not_evaluated`;
- `radial_turn` remains `threshold_reported` or `blocked` when tangential drive is the proposed decisive row;
- $\mathcal{D}_T(I_\ast)$ is only sampled-positive, or its interval row straddles zero;
- a negative tangential interval is reported from a different active ledger, a Jacobian-null window, or a changed VP-1 candidate history.

`--require-theorem-grade` should pass only when `theorem_grade` is true under the formulas above. For the expected VP-1 path, this means the structural interval rows and dependency row pass, the radial-turn row is strictly positive for a declared $\Gamma$, and the tangential row proves $D_T^-\ge0$. That gives a theorem-grade VP-1 rejection by tangential drive, not a passing spiral certificate.

Keep `--require-tangential-pass` separate. It should continue to fail for a theorem-grade tangential rejection and pass only when the interval tangential row has `passed`.

## Validation Strategy

After a later coordinator implements the extension, validate these cases:

1. Baseline sampled path:
   ```bash
   python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py --format json
   python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py --format markdown
   python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py --format json --require-theorem-grade
   ```
   Expected: the first two commands emit the current sampled statuses, and `--require-theorem-grade` exits nonzero.

2. Partial interval packet:
   ```bash
   python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py --format json --interval-proof-rows /tmp/vp1-partial-interval-rows.json --require-theorem-grade
   ```
   Expected: supplied rows may upgrade to `passed`, missing interval rows remain sampled/blocker rows, and `--require-theorem-grade` exits nonzero.

3. Expected theorem-grade VP-1 rejection fixture:
   ```bash
   python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py --format json --interval-proof-rows /tmp/vp1-theorem-rejection-rows.json --require-theorem-grade
   ```
   Expected: structural rows and dependency status are `passed`, `radial_turn` is `passed`, `tangential_drive` is `certified_fail`, `candidate_verdict` is `theorem_grade_rejected_tangential_drive`, `priority_item_complete` is `false`, and the command exits `0`.

4. Synthetic passing fixture:
   ```bash
   python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py --format json --interval-proof-rows /tmp/vp1-synthetic-pass-rows.json --require-theorem-grade
   ```
   Expected: all structural rows pass, radial turn passes, tangential drive passes with $D_T^+\le-\varepsilon_T$, `candidate_verdict` is `theorem_grade_passed_bare_spiral`, and the command exits `0`.

5. Boundary fixtures:
   - $D_T^-<0<D_T^+$ keeps `tangential_drive: blocked` and exits nonzero.
   - $\Gamma+B_r^-\le0<\Gamma+B_r^+$ keeps `radial_turn: blocked` and exits nonzero.
   - Candidate mismatch rejects the sidecar and exits nonzero.
   - `dependency_status` absent keeps theorem grade false even if every local row passes.

6. Repository checks after code implementation:
   ```bash
   git diff --check
   node scripts/validate-content.mjs --check --strict
   node scripts/build-scene-graph.mjs --check --strict
   ```

## Anti-Overclaim Safeguards

- Do not parse proof-packet prose as executable evidence.
- Do not let sampled rows satisfy theorem grade.
- Do not let `sampled_fail_positive_D_T` become `certified_fail` without an outward interval lower bound $D_T^-\ge0$.
- Do not let the tangential verdict bypass active-root, inactive-gap, Jacobian-floor, finite-memory, root-transport, radial-turn, or dependency gates.
- Do not mark `spiral_branch_chart_test` complete for a VP-1 rejection; it falsifies this candidate only.
- Do not introduce a compatibility shim for older sidecar schemas. This workspace is in development mode, so reject stale schemas explicitly.

## Claim Map

- Ontology: none added.
- Derivation/closure target: executable theorem-grade ingestion contract for VP-1 interval rows.
- Effective summary: the runner should remain sampled by default and become theorem-grade only when a candidate-compatible interval sidecar upgrades the proof-obligation matrix.
- Speculation: none promoted.
