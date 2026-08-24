# Borg Display-Grade Operating Batch — 2026-07-17

## Instrument and build

The measured controls used `scripts/eom/profile-borg-incremental-chunks.mjs` with the Release `eom_borg_shadow_cli` built from the same source batch. The interactive input was seed 0, 32 electrinos + 32 positrinos, $K=0.0005$, maximum initial speed component $0.001$, core scale $0.2$, sphere radius $0.5$, chunk duration $0.3$, and display grade.

Claim grade: `measured`. Falsifier: the commands below do not reproduce the reported status, endpoint, or timing on the named build.

## Closed implementation rows

| Row | Implemented state | Direct control |
|---|---|---|
| warning-ledger scale | deterministic indexed maps/sets replace per-pair full-ledger scans | 64/128/256/512 timing ladder |
| chunk/retry reuse | display and certified boundary snapshots are fingerprint-gated and reused | persistent-worker delta test; all nine warm 64-path chunk starts reused |
| retained-history conversion | cubic decimal coefficients are parsed once and reused by display evaluation | native process and history suites |
| memory envelope | V5 request carries a budget; estimate above budget halts `memory_budget_exhausted` before publication | one-byte budget regression |
| display accuracy label | executable $h$ versus $h/2$ endpoint comparison, normalized by sphere radius | seed-0 64-path table below |
| grade/input separation | grade toggle changes authority only; one interactive physical preset feeds both grades | Borg initial-condition and runtime tests |
| display roots | adaptive residual enclosure plus sign-changing and stationary-contact isolation replaces four samples | analytic residual $(t-0.37)^2$ control |
| core scale | explicit V5 field reaches the evaluator and changes the computed acceleration | $0.2$ versus $0.125$ protocol regression |
| display replacement rewind | replacement transform is inactive before its recorded start time | Borg replacement regression |
| certified pair cascade | traversal exclusion, then far-field enclosure, then exact roots; warm rows use indexed lookup | independent static-pair enclosure and cascade ledger tests |

Claim grade: `derived-design` for the implementation mapping. Falsifier: the named test passes without exercising its row, or a source sweep finds the old linear ledger, fixed four-sample authority, implicit core scale, or dual protocol path.

## Display track calibration

| Horizon | $h$ | solver wall s | $h/2$ wall s | maximum position delta | delta / sphere radius | target |
|---:|---:|---:|---:|---:|---:|---|
| 0.3 | 0.05 | 0.0456765 | 0.107773 | 0.0000201771 | 0.0000403541 | pass |
| 3.0 | 0.05 | 0.501773 | 1.0728069 | 0.000652758 | 0.00130552 | pass |

The declared limit is $0.05$. Both controls pass, but this is same-model step-height agreement, not independent evidence and not a global bound on the unknown exact path.

Claim grade: `measured`. Falsifier: rerunning either paired control produces normalized endpoint disagreement above $0.05$.

## Population and run-length measurements

One $0.3$-time chunk at $h=0.05$:

| paths | solver wall s | simulated s / solver wall s | maximum declared memory bytes | status |
|---:|---:|---:|---:|---|
| 64 | 0.0456765 | 6.56793 | 1,064,149 on the matched ten-chunk run's first chunk | completed |
| 128 | 0.141375 | 2.12202 | 3,635,629 | completed |
| 256 | 0.294462 | 1.01881 | 13,497,137 | completed |
| 512 | 0.893295 | 0.335835 | 52,094,638 | completed |

The 64-path ten-chunk run completed through $T=3$ in 0.501773 solver seconds and 0.570512 outer wall seconds. All nine warm starts reused the preceding snapshot. Per-chunk solver cost was 0.0409–0.0672 s and the profiler's steady window passed its flat-cost criterion. The declared memory estimate grew from 1,064,149 to 5,638,542 bytes because display grade retains the full delayed history; the 64 MiB request ceiling is therefore a real eventual run-length limit, now adjudicated rather than an uncontrolled process failure.

Claim grade: `measured` for the table and seed-0 run. Falsifier: the saved profile commands do not complete at the reported endpoint or their JSON timings/memory rows differ. Claim grade: `inferred` that other seeds retain similar throughput. Falsifier: a seed sweep shows materially different per-chunk cost or retry behavior.

## Certified parity and validation

The clean-base `HEAD` fixture and this batch's fixture were built separately. Ten unaffected certified evolution records, the single-thread binary record, checkpoint direct histories, and the certified event-acceptance record were token-identical. The new traversal/far-field cascade is intentionally a new optional route and is covered by its complete ledger test.

Claim grade: `measured`. Falsifier: any listed clean-base/current JSON object compares unequal.

- EOM Python discovery: 153 tests, green in 160.189 s.
- Borg JavaScript: 84 tests, green.
- `.githooks/pre-commit`: green.
- `git diff --check`: green.
- Decimal oracle files were not modified.

Claim grade: `measured`. Falsifier: rerunning a named command returns nonzero or the test count changes without an explained suite change.

## Live playback pacing control

The local development server at `127.0.0.1:5173` was loaded with the randomized 64-path defaults. While paused, startup computed one `0.3` chunk and then held at 30 buffered keyframes for the 1.8-second observation. After playback began, the active rate remained `0.60× realtime`; observed lead examples were 120 keyframes at active keyframe 210 and buffered-through keyframe 330. The producer therefore stopped at the declared two-wall-second high watermark instead of running hundreds of keyframes ahead while paused.

A 512-path display control selected 256 electrinos and 256 positrinos. Playback automatically reported `0.20× realtime` and advanced continuously through the available 120 keyframes. The fifth request was not advanced before publication as `memory_budget_exhausted`; four chunks through solver time `1.2` remained the last accepted output. This validates slow-motion pacing but also confirms that the separate 64 MiB retained-history budget, rather than playback throughput, is the immediate long-run ceiling at 512 paths.

Claim grade: `measured`. Falsifier: a fresh browser run computes additional chunks while paused, exceeds the high-water lead by more than one in-flight chunk, displays a rate above `1.0×`, fails to reduce the 512-path rate, or publishes the memory-rejected fifth chunk.

## Reproduction commands

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=10 --seed=0 --chunk-duration=0.3 \
  --initial-step=0.05 --minimum-step=0.0001 --maximum-step=0.05 \
  --adaptive-growth=true --run-grade=display \
  --electrinos=32 --positrinos=32 --coupling=0.0005 \
  --max-per-axis-speed=0.001 --core-scale=0.2 --summary-only=true

node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=10 --seed=0 --chunk-duration=0.3 \
  --initial-step=0.025 --minimum-step=0.0001 --maximum-step=0.025 \
  --adaptive-growth=false --run-grade=display \
  --electrinos=32 --positrinos=32 --coupling=0.0005 \
  --max-per-axis-speed=0.001 --core-scale=0.2 --summary-only=true
```
