# Borg eight-path block-exclusion matched replay

Date: 2026-07-16

Authority: executable performance and equivalence diagnostic

Verdict: **no material acceleration on this saved continuation checkpoint**

## Question and fixed controls

The matched replay asks whether certified recursive block exclusion accelerates
the strict eight-path Borg EOM continuation at the saved checkpoint without changing
an accepted result. Both modes used the same freshly built EOM solver executable,
checkpoint, interval, tolerances, thread count, and MPFR ceiling. The control
disabled certified traversal; the candidate forced recursive traversal down to
one-pair leaves. This isolates the route choice from compiler and source drift.

- Checkpoint: `.tmp/eom-borg-8-post-32.48.checkpoint.json`
- Checkpoint time: $T=34.4940624999999$
- Checkpoint SHA-256:
  `0752571054dfece4976ae0ddfd909f0dc9c2f38e1a7b281725e764c1483a4bba`
- Replay interval: $[34.4940624999999,34.5040624999999]$
- Fixed step and minimum step: `0.01`
- Root, acceleration, position, velocity, and correction tolerances: `1e-8`
- Threads: `4`
- Maximum MPFR precision: `512` bits
- EOM solver SHA-256:
  `4c455622e182f78296c8b8f6965fd03492b1085fd0eb5445c6e8ef82b49c3be2`
- EOM solver source modification time: `2026-07-16 06:12:40 -0400`
- EOM solver build time: `2026-07-16 06:12:47 -0400`
- Repetitions: `5`, with alternating control/candidate order
- Declared material gate: both mean and median internal EOM solver speedup at
  least `1.10x`

The retired benchmark harness invocation is preserved in the raw replay record;
the migration-specific harness was removed when this continuation ceased to be
a Borg promotion gate.

The raw replay record has SHA-256
`3d8d639961fffdbf7d23ec782b13c70e9bad4930b24e52ca57cf12c51c9e9fce`.
It contains the complete 64-row reference root-accounting ledger as well as the
per-run hashes and counters.

## Accepted-result comparison

**Measured:** all ten runs completed the one fixed step, accepted one step,
rejected zero steps, and ended at the same absolute time. Every output history
was byte-identical across the matched modes, with SHA-256
`df479225a90f983f13fc77635c38b89477d60fe1b9f740ef32a98458881db05a`.
Each of paths `1001` through `1008` had `7017` segments.

**Measured:** complete root accounting was also byte-identical, not merely
enclosure-equivalent. All 64 ordered-pair rows had SHA-256
`74bb9d6cd187a2eacc0338dce7d391f429787c80cc36d977fe33305443d9dc4e`.
Every run reported 64 logical pairs, 64 exact pairs, 64 root certificates, zero
unresolved pairs, and complete disjoint accounting.

## Route and work accounting

**Measured:** the recursive traversal route did execute. Every candidate run
reported `certified_moving_history_traversal` and visited 127 traversal nodes,
whereas the control reported `exhaustive_exact_pair_batch` and visited none.
However, the traversal certified zero pair exclusions. All 64 ordered pairs
therefore fell through to the same exact route used by the control.

The downstream work was identical in every matched run:

| Counter | Exhaustive control | Block traversal |
|---|---:|---:|
| Logical ordered pairs | 64 | 64 |
| Certified exclusions | 0 | 0 |
| Exact-fallback pairs | 64 | 64 |
| Unresolved pairs | 0 | 0 |
| Root certificates across all corrector snapshots | 576 | 576 |
| Re-evaluated root cells | 941,161 | 941,161 |
| MPFR pair evaluations | 4 | 4 |
| Traversal nodes | 0 | 127 |

Thus the traversal algorithm ran, but effective block exclusion did not occur
on this checkpoint.

## Wall time

| Matched pair | Control solver s | Block solver s | Control outer s | Block outer s | Solver speedup |
|---:|---:|---:|---:|---:|---:|
| 1 | 3.40023 | 3.39670 | 6.62228 | 6.57489 | 1.0010x |
| 2 | 3.21589 | 3.37832 | 6.45892 | 6.53650 | 0.9519x |
| 3 | 3.26119 | 3.36387 | 6.46621 | 6.53271 | 0.9695x |
| 4 | 3.36147 | 3.52281 | 6.58658 | 6.68326 | 0.9542x |
| 5 | 3.35235 | 3.46852 | 6.54901 | 6.67518 | 0.9665x |

**Measured:** mean and median internal EOM solver speedups were `0.9686x` and
`0.9665x`. Mean and median outer-process speedups were `0.9904x` and `0.9881x`.
The candidate therefore missed the declared `1.10x` material gate and was
slower on both internal EOM solver aggregates.

## Decision and falsifier

**Inferred:** at this checkpoint the eight-path causal population is dense with
respect to the present block certificate: no ordered pair can be removed before
exact root certification. Because the candidate preserves all of the expensive
exact work and adds traversal work, this route is not a useful accelerator for
the strict eight-path continuation here.

The saved checkpoint is unchanged. This negative performance result changes no
master-equation rule, trajectory value, accepted history, or Borg promotion
decision; the current startup contract does not depend on this continuation.

The decision is falsified by a matched replay from the same checkpoint that
certifies at least one real exclusion, keeps complete disjoint root accounting,
preserves byte-identical histories or declared enclosure-equivalent output, and
reaches at least `1.10x` on both mean and median internal EOM solver wall time.

Focused validation:

- benchmark script syntax: pass
- EOM Borg process contract: 4/4 pass
- benchmark invariant query: pass
