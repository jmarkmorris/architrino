# Circular Tail Integration Notes

Status: integration contract executed. The separate proof packets supplied defensible closed large-$\beta$ tail constants, and [circular_interval_certificate.py](circular_interval_certificate.py) now imports them through the theorem-readiness matrix.

## Current Executable Control Points

- `tail_obstruction_summary(beta_tail)` in [circular_interval_certificate.py](circular_interval_certificate.py) is the only tail-state source. It emits the positive-sine and full-signed linear margins, budget rows, proof-packet constants, `claim_level: closed analytic large-beta tail remainder`, and `closed_remainder: True`.
- `theorem_readiness(...)` adds the `closed_large_beta_tail_remainder` obligation. Its status is `passed` only when `tail_obstruction["closed_remainder"]` is true. The aggregate `theorem_grade` is `all(item["status"] == "passed" for item in obligations)`.
- `build_certificate(...)` surfaces `theorem_grade`, `tail_obstruction`, `theorem_readiness`, and `promotion_blocker` in the returned certificate object. Its current `claim_level` is `theorem-grade circular interval and large-beta tail certificate`.
- `emit_markdown(certificate)` controls the report fields in [circular-interval-certificate-report.md](circular-interval-certificate-report.md): status summary, proof-obligation matrix, tail scaffold rows, tail constant packet table, and promotion blocker text.
- The CLI flag `--require-theorem-grade` is parsed in `main(...)`. The runner prints JSON or markdown first, then exits with code `2` only if `--require-theorem-grade` is set and `certificate["theorem_grade"]` is false.
- [master-equation-closure.md](master-equation-closure.md) states the theorem-grade status: finite-band checks pass, the high-speed tail constants close, and the circular obstruction can now feed the spiral branch-chart test.

## Derived Constant Fields To Add Later

Only add these fields after proof-lane packets provide constants with assumptions, inequalities, and branch-domain coverage.

Recommended `tail_obstruction_summary(...)` replacement fields:

| Field | Meaning | Required source |
| --- | --- | --- |
| `closed_remainder` | Boolean aggregate over both tail inequalities. | Computed from the verified positive-sine and full-signed tests below. |
| `positive_sine_tail_constant_packet` | Structured constants for $S_+(\beta)$. | Proof packet deriving $K_{\log}^{+}$ and $K_0^{+}$ on $\beta\ge\beta_{\mathrm{tail}}$ outside declared Jacobian-null windows. |
| `positive_sine_tail_constant_packet.K_log` | Certified coefficient of $\log\beta$ in the lower-bound remainder. | Branchwise endpoint-displacement and denominator-defect envelope. |
| `positive_sine_tail_constant_packet.K_0` | Certified constant remainder term. | Same packet as above. |
| `positive_sine_tail_constant_packet.margin_at_tail` | $8.591208140575-(K_{\log}^{+}\log\beta_{\mathrm{tail}}+K_0^{+})$. | Must be strictly positive. |
| `positive_sine_tail_constant_packet.status` | `passed` or `blocked`. | `passed` only if the margin is strictly positive and the packet proves domination for every larger $\beta$. |
| `full_signed_tail_constant_packet` | Structured constants for $S_{|\sin|}(\beta)$. | Proof packet deriving $K_0^{|\sin|}$ after signed-lobe cancellation. |
| `full_signed_tail_constant_packet.K_0` | Certified full-signed lower-bound remainder. | Signed-lobe cancellation proof with terminal orphan and denominator-defect coverage. |
| `full_signed_tail_constant_packet.margin_at_tail` | $10.814941315726-K_0^{|\sin|}$. | Must be strictly positive. |
| `full_signed_tail_constant_packet.status` | `passed` or `blocked`. | `passed` only if the bound holds for every $\beta\ge\beta_{\mathrm{tail}}$. |
| `tail_constant_sources` | Proof-packet references and checksum-like provenance strings. | Names or paths of the closed proof packets that supplied the constants. |
| `tail_domain` | Stated domain for the tail proof. | Must match the finite-band handoff: $\beta\ge\beta_{\mathrm{tail}}$ outside declared Jacobian-null windows. |

The report should print these packets in `## Tail Scaffold` only after they exist. Until both packets pass, the tail blocker table should remain visible and `closed_large_beta_tail_remainder` should remain `blocked`.

## Validation Commands

Run these after any later executable edit that imports closed constants:

```bash
python3 reference/priorities/master-equation-closure/circular_interval_certificate.py --format json
python3 reference/priorities/master-equation-closure/circular_interval_certificate.py --format markdown
python3 reference/priorities/master-equation-closure/circular_interval_certificate.py --format json --require-theorem-grade
python3 reference/priorities/master-equation-closure/circular_interval_certificate.py --format markdown > reference/priorities/master-equation-closure/circular-interval-certificate-report.md
git diff --check
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
```

Expected behavior before closed constants: the first two commands should emit the support certificate, `--require-theorem-grade` should exit `2`, and the report should keep `Theorem grade: false`.

Expected behavior after both inequalities close: `--require-theorem-grade` should exit `0`, the proof-obligation matrix should show `closed_large_beta_tail_remainder` as `passed`, `First nonpassing obligation` should be `None` or `null` in the JSON-derived text, and the status text should identify the theorem-grade tail attachment without hiding the finite-band Jacobian-window exclusions.

## One-Inequality Failure Mode

If only the positive-sine inequality closes:

- Set `positive_sine_tail_constant_packet.status: passed`.
- Keep `full_signed_tail_constant_packet.status: blocked`.
- Keep `closed_remainder: False`.
- Keep `closed_large_beta_tail_remainder` blocked.
- Keep `theorem_grade: false`.
- Do not promote the bare-kernel circular no-go theorem, because the full signed chart still lacks the stated cancellation remainder.

If only the full-signed inequality closes:

- Set `full_signed_tail_constant_packet.status: passed`.
- Keep `positive_sine_tail_constant_packet.status: blocked`.
- Keep `closed_remainder: False`.
- Keep `closed_large_beta_tail_remainder` blocked.
- Keep `theorem_grade: false`.
- Do not promote the positive-sine obstruction, because the endpoint-displacement and denominator-defect envelope for $S_+(\beta)$ still lacks closed constants.

If either packet supplies constants but the margin is nonpositive at $\beta_{\mathrm{tail}}$, record the constants as derived-but-failing evidence and keep `status: blocked`. The next action is a later tail handoff or sharper constants, not theorem promotion.

## Anti-Overclaim Safeguards

- Do not change `claim_level` from support certificate to theorem-grade unless both tail packets pass and the finite-band obligations still pass.
- Do not make `closed_remainder` true from budget admissibility alone. The existing budget rows only state room for constants; they do not derive constants.
- Do not suppress the two tail blocker rows until both blocker inequalities have proof-packet provenance.
- Do not let `--require-theorem-grade` return `0` unless `theorem_grade` is true through the obligation matrix, not through a separate CLI override.
- Preserve the domain qualifier outside declared Jacobian-null windows. A closed tail remainder does not certify exact constant-speed closure at $J=0$.
- Preserve the distinction between a finite-band interval support pass, a high-speed analytic tail proof, and reader-facing theorem promotion in `content/markdown/aaa`.
- If later constants come from numerical fitting, heuristic asymptotics, or unpublished algebra without branchwise envelope proof, record them as candidate constants only and leave `closed_remainder: False`.

## Integration Completion

The executable and report regeneration are complete. The constants integrated are:

- positive-sine: $K_{\log}=0$, $K_0=1.24$ from [circular-tail-positive-sine-proof](circular-tail-positive-sine-proof.md);
- full signed: $K_0=3$ from [circular-tail-full-signed-proof](circular-tail-full-signed-proof.md).

The guard `python3 reference/priorities/master-equation-closure/circular_interval_certificate.py --format json --require-theorem-grade` now exits `0`.
