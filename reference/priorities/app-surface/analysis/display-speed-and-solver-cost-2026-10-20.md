# Visible motion, certification limits and EOM solver cost

October 20, 2026. Operator testing in the `surface` Claude session found that playback showed no visible motion, and that raising the initial speed made every run halt with `minimum_step_exhausted`. This note records what was measured, why the halts occur, what the app now does, and where EOM's surface route spends its time. All runs use canonical surface interaction, unrestricted speed, $c_f=1$, sphere radius 0.1, six members (three of each polarity), coupling $10^{-6}$ and maximum step 0.01, unless stated otherwise. None of these runs is an independent scientific comparison.

## Why the presets show no motion

**Measured** (shared cubic evaluator on the retained checked records, browser module import): over each run, every member moves about $2.5\times10^{-3}$ on the sphere preset (0→0.25) and $1.95\times10^{-3}$ on the outer torus preset (0→0.15). That is about 2.5% of the radius, or 1.4° of arc. Playback advanced correctly, but the presets' speeds of 0.006–0.013 are far too slow to watch.

## Why faster runs halt

The surface route proves error bounds for every step and refuses any step whose bound exceeds a fixed absolute tolerance. The Surface request sets those tolerances (acceleration, position, velocity, surface distance, surface tangent velocity, correction) mostly to $10^{-4}$, sized for speed 0.01. The curvature part of the acceleration scales as $v^2/R$, and the interval overestimates in the dense surface check scale with speed. The fixed limits are therefore met at slow speed and missed at higher speed.

**Measured** (direct `POST /api/eom/v2/evolve` with the probe scripts retained under `.local-data/eom/surface-speed-2026-10-20/`; full 0.25 runs unless noted):

| Initial speed | Outcome | First binding check |
| --- | --- | --- |
| 0.01 (preset) | completes 0→0.25 | — |
| 0.05 | completes 0→0.25 in 29 s; a browser resume halts at 0.334 | `minimum_step_exhausted` |
| 0.1 | halts at 0.175 | `surface_acceleration_budget_exceeded` |
| 0.2 | halts at 0.04 | `minimum_step_exhausted` |
| 0.3, 0.4, 0.5 | halt at time 0, no accepted step | `surface_acceleration_budget_exceeded` (`SurfaceEquationProvider.cpp:77-79`) |

At speed 0.5, smaller steps (down to $2\times10^{-4}$) still accept nothing. A finer prepared past (segment 0.001–0.002) lets the first steps through, but the run halts by 0.0105. Scaling every tolerance with speed (position-like × $v/0.01$, acceleration × $(v/0.01)^2$) lets speed 0.2 reach 0.0975. The successive binding checks are `surface_dense_tolerance_exceeded` (`SurfaceConstraint.cpp:110-136`), then `surface_solution_error_budget_exceeded`, then `root_completeness_not_certified`.

**Inferred** from the three halting speeds 0.05, 0.1 and 0.2: the certified error bounds accumulate with distance travelled, and halts occur after roughly 0.008–0.017 of path length. That limits a run to about 10° of arc on this sphere at any speed the current tolerances admit. *Falsifier:* a run at, say, speed 0.02 that certifies well beyond 1 time unit with unchanged tolerances.

Two run limits also apply, independent of certification:
- The EOM service allows one call at most 120 s plus a 5 s grace period (`scripts/eom/EomV2ProcessClient.mjs:9`). A 0→1 call at speed 0.05 was stopped after 125 s.
- Non-record evolve responses past about 0.35 exceed the response size budget.

## App changes made in response

All of these are in `src/apps/surface/` and `surface.html`; none touches the EOM solver.

- **Colors.** Standard polarity colors and labels: electrino blue `#0000ff`, (−); positrino red `#ff0000`, (+). These come from the shared Borg polarity owner. The earlier legend had the polarity names reversed relative to the request charges.
- **Arrows.** Normal-acceleration arrows are drawn on every member, not only the selected receiver.
- **Markers.** Markers are rescaled per frame by camera distance, so they appear the same size on screen.
- **Labels.** Display labels are p1–p3 and e1–e3, centered on each marker. EOM path identifiers are unchanged.
- **New preset.** *Sphere · watchable speed* (speed 0.05, 0→0.25). It is excluded from checked-preparation matching.
- **Resume.** The resume end now advances by 0.25 after each run.
- **Messages.** The cryptic `minimum_step_exhausted` text is replaced by a plain explanation. The 120 s deadline error is also explained.

## Where the surface route spends time

**Measured** (a separate read-only analysis agent took macOS `sample` profiles of the EOM worker; raw profiles are `sample1.txt`–`sample3.txt` in the same `.local-data` folder):

- **Speed 0.01:**
  - One thread does all the work.
  - About 92% of busy time is per-step publication certification (`SurfacePublication.cpp:150-231`), and about 55% of that is the emission-time bisection calling `position_hull`.
  - Outward rounding through libm `nextafter` accounts for about 47% of samples, and `require_finite` for about 14%.
  - The linear history scan in `segment_hull` plus `pin` takes about 17%.
  - JSON, MPFR and allocation costs are negligible.
- **Speed 0.5:** 100% of the sampled window is the dense recertification of the unchanged prepared past, which is repeated on every step attempt (`CoupledEvolution.cpp:7223` → `4096-4101`). That is why each rejected attempt costs about 10 s whatever the step size.
- **Build:** release `-O3`, no LTO, no CPU tuning, no `threadCount` sent.

Candidate speed-ups, largest first. Each is graded and marked bit-identical or not:

1. **Inline the interval operators and replace `nextafter` with inline bit stepping** (`Interval.cpp:13-52`). About 2–3×, inferred from the measured share and a microbenchmark (2.88 ns versus 0.49 ns per call, 0 mismatches). Bit-identical.
2. **Certify the six paths' publication in parallel** (`SurfacePublication.cpp:283-314`). About 3–4× wall time, inferred. Needs a thread-safety review of `HistorySegmentSequence::pin` and deterministic failure order.
3. **Warm-start the emission-time brackets instead of bisecting from the start of history each time** (`SurfacePublication.cpp:106-117`). About 1.5–2×, inferred. Certified numbers shift by a few rounding steps, so the operator must decide.
4. **Look up history segments by binary search** (`History.cpp:291-330`; `segment_index_at` exists). About 1.2× now and removes growth with run length. Bit-identical.
5. **Validate the immutable request once per run instead of once per attempt.** About 10× or more on rejected-attempt cost at high speed, about 3–4% at speed 0.01. Bit-identical.
6. **Use a centered (mean-value) form for the dense surface check** (`SurfaceConstraint.cpp:109-137`). Guessed 10–100× fewer cells at high speed. Rigor is kept, but which steps certify changes, so the operator must decide.
7. **Smaller items, each at most about 1.1×:**
   - Pre-parse geometry and cache the constant sphere curvature term.
   - Binary-search source accelerations.
   - Skip formatting diagnostics for discarded iterations.
   - Use LTO and CPU-specific flags.

Items 1, 4 and 5 together are bit-identical and small. The guessed combined effect of items 1–5 is roughly 0.8 s → 0.05–0.1 s per step at speed 0.01. None of these speed-ups changes which speeds certify. Visible fast motion still needs either speed-relative tolerances or a tighter surface enclosure, which is an EOM-owned numerical and scientific decision.

## Results: bit-identical items 1, 4 and 5

Items 1, 4 and 5 are now implemented in the EOM solver's working tree; nothing is committed. The full account, with derivations, commands and digests, is in the [EOM record of the bit-identical Surface speed-ups](../../app-solver/analysis/surface-route-bit-identical-speedups-2026-10-20.md).

- **Same numbers, measured.** Instruments: SHA-256 of each command's stdout, and a leaf-by-leaf response comparison. With the build's source-digest receipt held equal, the changed solver reproduces the unmodified solver's output byte for byte on all 35 EOM CTest and manual fixture commands and on both Surface requests: the default preset, 53,416,798 bytes, and a speed-0.5 run, 80,209 bytes. Every build accepts and rejects the same steps.
- **Faster, measured.** Instrument: `/usr/bin/time` CPU user time of the EOM worker, on a heavily loaded machine. The default preset falls from about 36.5 s to about 19.4 s, or from 1.46 s to 0.77 s per accepted step. One rejected attempt at speed 0.5 falls from about 18 s to about 1.5 s.
- **Not changed.** Which speeds certify is unchanged, as predicted above. The repeated provider admission and the first-step publication check are small, so they were left as they are.
