# Phase 0 — Headless Release Workload Profile (2026-07-15)

**Disposition:** Phase 0 complete. Every cost number below is **measured**
(engine-internal timing ledger plus process-level peak memory), none is
projected. The campaign-sizing recommendation at the end is graded where it
leans on inference.

## Plain-language summary

A neutral population of $N$ architrinos was released headless into the
coupled delayed-history engine at $N \in \{6, 12, 24, 48\}$ and the engine's
own per-phase stopwatch was read out. Three facts size the campaign:

1. **Cost per accepted step grows as $N^2$** — proportional to the number of
   ordered pairs — and just over half of every step is spent certifying
   causal roots for exact pairs. Nothing else exceeds a tenth of the step.
2. **Dispersal does not shed pair cost.** At every snapshot of every run,
   zero ordered pairs were excluded by the traversal: every pair keeps a
   live causal root inside the retained history window, so escapers keep
   costing full price. The $O(N^2)$ tail is paid at every step.
3. **Memory, not wall time, is the first hard wall.** Peak memory also grows
   as $N^2$ per step, and the run certificate additionally retains every
   step's certificates, growing without bound over the horizon. Long
   releases must be chunked through checkpoints with streamed observables.

## Instrument

- Driver: [attractor-phase0-release-profile.cpp](../../../../scripts/eom/attractor-phase0-release-profile.cpp)
  (new; section-97-98-direct-evolution.cpp pattern). It is a **cost
  instrument only**: it seeds a declared family, calls
  `evolve_native_coupled_histories` once, and serializes the engine's own
  `NativeEvolutionTiming` ledger, per-step snapshot timings, traversal
  pair-route counts, and endpoint kinematics to JSON. It never modifies
  engine behavior, and it makes no physics claim. Timing authority is the
  engine's internal steady clock; memory authority is `/usr/bin/time -v`
  peak resident set size. Raw artifacts:
  [phase0-workload-profile-2026-07-15/](phase0-workload-profile-2026-07-15/README.md).
- Heartbeats: one stderr line per accepted step (population, step index,
  accepted simulation time, wall seconds). No run was left unwatched.
- **Seed family `phase0-shell-v1` (declared, deterministic, off the pin):**
  alternating $\pm|e|/6$ polarity (net charge zero); each architrino on its
  own factory-certified uniform-circular prehistory about the $z$ axis over
  $[-8, 0]$ (segment step $0.02$); radii $1.5$–$3.5$, heights $\pm 1.2$,
  phases and senses spread by fixed low-discrepancy sequences (golden-ratio
  family, exactly reproducible, no random generator); tangential speeds
  $0.35$–$0.65\,c_f$ — **strictly off the $v = c_f$ pin**, so no pinned-fold
  cost enters this profile.
- Engine policy: the §86/§97 normal request (sharp chart, root tolerance
  $10^{-5}$, acceleration/quadrature $5\times10^{-3}$, position/velocity
  $2\times10^{-6}$, correction $2\times10^{-7}$), fixed step $0.01$,
  coupling $36\,\kappa_{\rm eq}$ (a declared profiling workload choice, not
  a bind fit), 4 threads.

## Build and acceptance state (rebuilt before running)

- Rebuilt the native engine from current source in the profiling
  environment. Last change to any `src/eom` source: **2026-07-15 20:43:48
  UTC**. Build completed green: **2026-07-15 22:06:30 UTC** — the binary is
  1 h 23 m newer than the last source change; nothing stale ran.
- One build correction was required and is scoped to a CLI, not the engine:
  `src/eom/native/eom_native_evolution_fixture_cli.cpp` was missing
  `#include <cmath>` (compiles under the operator's clang via transitive
  includes, fails under gcc 11). Engine sources untouched.
- **Three-suite acceptance gate, run against the rebuilt binaries with the
  just-landed performance change: GREEN.**
  `test_eom_native_history_layer.py` 15/15 OK,
  `test_eom_native_acceleration.py` 12/12 OK,
  `test_eom_native_coupled_evolution.py` 17/17 OK; additionally
  `test_eom_borg_native_process.py` 4/4 OK. Disclosure: suites 2 and 4
  were pointed at the already-rebuilt binaries through a build-redirect
  shim (the suites otherwise re-run a full compile inside a temp dir that
  exceeds this environment's per-command wall). Every parity assertion ran
  unmodified against binaries built from current source; suites 1 and 3
  performed their own full in-suite builds.
- Environment: Linux arm64 sandbox, 4 cores, 3.9 GB RAM, gcc 11.4, MPFR
  4.2.2 / GMP 6.3-line (gmpy2-bundled), Boost 1.85 headers. **Absolute
  seconds are specific to this box.** The portable claims are the ratios,
  percentages, and exponents; transfer of those to the operator's native
  host is *inferred* (plausible, unverified) until one control run is
  repeated there.

## Measured wall-time attribution

Per-step wall is stationary from the first step (no warm-up transient:
first step within $8\%$ of the later-step mean at every $N$ where multiple
steps ran), so shorter horizons at larger $N$ are comparable. Horizons:
$N=6,12$: 20 steps; $N=24$: 6 steps; $N=48$: 1 step plus one repeat
($10.45$ and $10.00$ s — $4\%$ spread).

| $N$ | steps | s/step | snapshots/step | exact-root % | recert % | history-window % | traversal % | accel % | copy/hash % | µs per pair-snapshot |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 6  | 20 | 0.171 | 10.1 | 50.6 | 7.8 | 6.5 | 5.1 | 1.6 | 2.3 | 239 |
| 12 | 20 | 0.591 | 10.1 | 49.6 | 7.9 | 3.5 | 2.8 | 1.1 | 1.3 | 202 |
| 24 | 6  | 2.234 | 10.2 | 55.6 | 8.4 | 1.9 | 1.5 | 1.0 | 1.0 | 212 |
| 48 | 1  | 10.454 | 12.0 | 56.5 | 6.8 | 0.9 | 0.7 | 0.9 | 0.7 | 214 |

Phase definitions in one clause each: **exact-root** = certifying the
delayed-interaction root brackets for every ordered pair (the batch the
reducer consumes); **recert** = re-checking the corrected fine histories
before atomic publication; **history-window** = assembling the retained
history views; **traversal** = the hierarchical pair walk that decides
excluded-versus-exact routing; **accel** = reconstructing certified
accelerations from the root certificates, including the fixed pairwise
interval reduction tree (the reducer — not separately clocked by the
engine ledger; it is bounded above by the accel column, under $2\%$
everywhere); **copy/hash** = history copy and fingerprint work. The
corrector (the settling feedback loop that iterates each step to
tolerance) is the outer loop that *calls* the snapshots: its inclusive
share is $92$–$93\%$ of the step, but its own overhead beyond the nested
snapshots is only $\sim 10\%$. It drives cost through the snapshot count:
$\approx 10$ acceleration snapshots per accepted step, flat across $N$.

- **Per-pair cost is flat:** $200$–$240$ µs of exact-root wall per ordered
  pair per snapshot at every $N$ — total cost is (pairs) × (snapshots), no
  economy and no penalty of scale in the kernel itself.
- **$N$-scaling exponent (measured):** per-step wall fits
  $t \propto N^{1.97}$ globally; local doublings give $1.79$ ($6{\to}12$),
  $1.92$ ($12{\to}24$), $2.23$ ($24{\to}48$). Read: $N^2$, i.e. ordered
  pairs. The mild super-quadratic top step coincides with the memory
  pressure described below.
- **Threads:** A-B at $N=24$, 3 steps: $16.24$ s (1 thread) vs $6.33$ s
  (4 threads) — $2.56\times$, $64\%$ parallel efficiency.
- **The just-landed performance change is engaged in this workload:**
  warm-root exclusion skipped $89\%$ of root cells at $N=48$
  ($8.76\times10^6$ warm-excluded vs $1.07\times10^6$ re-evaluated).
- Zero rejected steps, zero MPFR pairs, zero MPFR escalations at every $N$.

Falsifier for the attribution: any `evolution_timing` field in the stored
JSONs contradicting a row above (the table is arithmetic on those files);
for the exponent, a fifth population repeating this driver and landing off
$t \approx (3.9\text{–}4.8\,\mathrm{ms}) \times N^2$ by more than the
$\sim 15\%$ local scatter.

## Escaped-pair vs close-pair split

- **Excluded pairs: zero.** At every accepted-step snapshot of every run,
  the traversal certificates report `traversal_excluded_pairs = 0` and all
  $N^2$ ordered pairs routed exact. On this seed family every pair keeps a
  live causal root inside the retained window — sub-$c_f$ sources remain
  causally connected to every receiver, so **escape does not convert a pair
  to the cheap route**. Measured on the $0.2$ horizon; the persistence of
  full connectivity at longer horizons is *inferred* from the kinematics
  (nothing outruns its own wake below $c_f$), not yet measured.
- **Close-pair premium: not exercised.** No pair got close enough to
  trigger MPFR difficult-row replay or event machinery (all zeros). A
  campaign that produces the transient couplings we are hunting will pay a
  close-encounter cost **absent from this profile** — flagged as the one
  unmeasured cost direction (grade: known unknown, not a number).
- Endpoint census at $t=0.2$ ($N=6,12$): speeds $0.39$–$0.64\,c_f$ (no pin
  approach), pair separations $1.4$–$6.4$. The horizon is far too short for
  an escape/coupling census — that is Phase 2/3 work, not a Phase 0 defect.

Consequence: **escaper-culling (Phase 3's gated option) is the only lever
on the $N^2$ tail**, exactly as the brainstorming's open question feared.
The traversal will not shed cost for us at any horizon.

## Memory (the binding constraint)

Single-step peak resident set: $51$, $197$, $790$, $3179$ MB at
$N = 6, 12, 24, 48$ — exponent $1.99$, again $N^2$. On top of that,
retaining the full run certificate grows memory by $\sim 0.5$ GB per
additional step at $N=24$ ($3.47$ GB by step 6), because every step's
snapshots and certificates are held until the run returns. In the 3.9 GB
profiling box this OOM-killed $N=24$ at 10 steps and $N=48$ at 2 steps.

Hard requirement for the Phase 2 harness, measured not stylistic: **run in
checkpointed chunks and stream observables; never hold a long release's
full evolution certificate in memory.** The engine's atomic checkpoint
layer already exists for exactly this.

## Campaign sizing (the recommendation)

Portable form (this box, 4 threads): per-step wall
$\approx 3.9$–$4.8\,\mathrm{ms} \times N^2$ at step $0.01$, so per unit
simulation time $\approx 0.39$–$0.48\,\mathrm{s} \times N^2$. A slow
period for this seed family is $\sim 15$–$60$ time units ($2\pi r/u$);
using $30$ as the planning unit:

| $N$ | wall per period (measured rate, this box) |
|---:|---:|
| 4 (2:2 neighborhood) | $\approx 3.5$ min (rate extrapolated below $N=6$: inferred) |
| 6  | $\approx 8.6$ min |
| 12 | $\approx 30$ min |
| 24 | $\approx 1.9$ h |
| 48 | $\approx 8.5$ h |

- **Run the 2:2-neighborhood sub-campaign first and densely.** At
  $N \in \{4, 6, 8\}$, hundreds of seeds times a $k$-period persistence
  horizon are hours of compute, and Phase 3's first target is exactly
  there. This is where the campaign's statistical power is cheap.
- **Size $N=24$–$48$ ensembles in the tens of seeds, not hundreds**, unless
  one of three things changes: escaper-culling passes its certified
  back-reaction gate, the run moves to a materially faster native host, or
  a compressed reduction lands (the README's open item — Phase 0 confirms
  its value class: it targets the $57\%$ exact-root + reducer path that
  owns the exponent).
- **Budget for close encounters.** The profile's zero-MPFR baseline is a
  floor, not an estimate, for seeds that do what we want them to do
  (couple). Treat any MPFR-heavy step budget as a measured quantity to be
  captured by the Phase 2 harness's root-certification-health observable.
- Step-size and tolerance ladders were not swept here (single declared
  policy); a Phase 2 pre-flight A-B on step $0.01$ vs $0.005$ at one $N$
  is cheap insurance before fixing the campaign step.

## Renumbered queue effect

Phase 0 (previously priority item 1) is complete and removed from
[priorities.md](../priorities.md); the harness, campaign, and adjudication
phases renumber to 1–3.
