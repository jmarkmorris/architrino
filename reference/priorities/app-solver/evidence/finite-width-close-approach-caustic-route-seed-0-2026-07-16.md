# Finite-Width Close-Approach And Caustic Route — Seed 0

## Verdict

- Date: 2026-07-16
- Claim level: `measured-current-binary`
- Route packet: [../finite-width-close-approach-caustic-route.md](../contracts/finite-width-close-approach-caustic-route.md)
- Outcome: `adjudicated-halt`
- Transit claim: none
- Core-refinement claim: `certified` at $\epsilon_c=0.05$ on the fixed `h=0.005` retained-history track
- Research-grade discriminator: the `h_max=0.0025` track certifies $\epsilon_c=0.05$ in 5,440 cells, then rejects its routed event attempt on `FWC-STATE-01`; no accepted finite-width passage is recorded
- Default controller: `initial_step=0.05`, `minimum_step=0.0001`, `maximum_step=0.05`, adaptive growth enabled
- Publication: atomic through `1.3606468750000003`; the rejected candidate was not published
- Evolution halt: `caustic_transit_uncertified`
- Entry row: `FWC-ENTRY-02` certified for ordered pair `1006 <- 1003`
- First failed contract row: `FWC-REG-02`
- Regulator level: `core_scale_refinement`, level 1, $\epsilon_c=0.1$
- Nested failure: `event_impulse_cell_limit_exhausted` after 200,001 visited cells
- Operator disposition: retain this demo-track `FWC-REG-02` halt as the accepted adjudicated state

The route eliminates the generic `minimum_step_exhausted` terminal label for the default run. It does not certify passage through the encounter. The coarse default trajectory now certifies the complete root scan and enters the finite-width route, whose core-scale level 1 then exhausts the declared cell budget. The engine therefore records the regulator row rather than publishing the rejected candidate.

The prior closure choice “certify the default track's $\epsilon_c=0.1$ level or retain its adjudicated regulator halt” is closed on the retain branch. The unchanged-history resource sweep below obtained only a `6.73%` impulse-width reduction from a fourfold cell-ceiling increase, so more subdivision is not an accepted substitute for a track that supports the declared budget. The research-tolerance discriminator and all further finite-width obligations are assigned to a follow-up FWC thread.

Claim grade: `measured` for the sweep and `operator-decision` for the disposition. Falsifier: the same default retained histories certify $\epsilon_c=0.1$ within both the unchanged `1e-7` impulse budget and the 200,000-cell ceiling at bounded cost.

The original fixed `h=0.01` reproduction reached `1.3959374999999998` and halted on `FWC-REG-02`. Tighter mean-value enclosures expose a retained-history noise floor on that track. Recomputing seed 0 at fixed `h=0.005` reduces the history radii enough to certify the complete core ladder, but the first routed candidate then fails `FWC-STATE-01`; it is not published.

Falsifier: rerun the default-controller command below on the recorded source and obtain `FWC-ENTRY-02`, any root failure for `1006 <- 1003`, publication past the rejected candidate, or a first failed row other than `FWC-REG-02`.

## Reproduction

Build:

```bash
cmake -S src/eom -B /tmp/architrino-eom-build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/architrino-eom-build --parallel 8
```

Default-controller adjudication:

```bash
node scripts/eom/profile-borg-incremental-chunks.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli \
  --chunks=28 --seed=0 --summary-only=true
```

Core-resource closure and transit seek:

```bash
node scripts/eom/profile-borg-incremental-chunks.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli \
  --chunks=40 --seed=0 --initial-step=0.005 \
  --minimum-step=0.0001 --maximum-step=0.005 \
  --adaptive-growth=false --event-max-cells=200000 --summary-only=true
```

Build freshness:

| Object | Timestamp |
| --- | --- |
| `src/eom/src/ExactPairBatch.cpp` | `2026-07-16 19:27:27 -0400` |
| `src/eom/src/CoupledEvolution.cpp` | `2026-07-16 19:06:32 -0400` |
| `src/eom/native/eom_borg_shadow_cli.cpp` | `2026-07-16 19:16:20 -0400` |
| `/tmp/architrino-eom-build/eom_borg_shadow_cli` | `2026-07-16 19:27:59 -0400` |

The binary is newer than the last route-source change.

## Coherent Default Outcome

| Field | Measured value |
| --- | ---: |
| Status | `halted` |
| Accepted end time | `1.3606468750000003` |
| Accepted atomic steps in the terminal chunk | 5 |
| Rejected atomic steps in the terminal chunk | 10 |
| Final attempted window | `[1.3606468750000003, 1.3607468750000002]` |
| Final attempted step | `0.0001` |
| Root failures | none |
| Accepted event status | `certified_complete` |
| First failed row | `FWC-REG-02` |
| Failed regulator level | core scale 1, $\epsilon_c=0.1$ |
| Regulator failure | `event_impulse_cell_limit_exhausted` |
| Final impulse width | `1.46846e-7` against `1e-7` |
| Native terminal-chunk wall time | `63.4486 s` |
| Ordinary steady early median | `0.00730254 s/chunk` |
| Ordinary steady late median | `0.00729242 s/chunk` |
| Warm chunk-start snapshot reuse | all warm chunks |

Cost claim grade: `measured`. These are wall times from the current default controller on one machine. They do not license an equal-trajectory speedup claim against the fine-start run because the accepted trajectories and halt times differ.

Cost falsifier: repeat the same current-binary command under comparable machine load and obtain materially different terminal or steady-window times.

## Default FWC-ENTRY-02 Certificate

The former difficult cell for ordered pair `1006 <- 1003` was source segment 52 over $S\in[1.275,1.3]$, with the unresolved endpoint at the retained segment join $S=1.3$. At 512 bits its point residual enclosed `[-7.57282e-7, 3.15639e-4]`, while the full-cell source normal was strictly positive in `[0.764852, 0.821228]`. This is a simple-root enclosure problem, not a zero-source-normal fold.

The failure came from spending a nominal half-tolerance radius around an outward interval representation of decimal join time `1.3`. The represented bracket could therefore exceed the declared root tolerance by a few units in the last place and was skipped. The corrected probe first subtracts the represented join width from the tolerance, splits the remainder between both sides, and rounds the endpoints inward. It still requires strict opposite causal-residual signs and one common strict source-normal sign across both segments.

The independent reference is the unchanged 90-digit Decimal root certifier in `scripts/eom/oracle/certified_history.py`. On the analytic join case $g(S)=S-1.3$ with source-position radius `1.5e-10` and root tolerance `4e-10`, the Decimal oracle certified one root and the complete root-free complement. The pre-fix native route returned `uncertified`; the corrected MPFR route now overlaps the Decimal bracket, covers `1.3`, has width at most `4e-10`, and reports positive source-normal sign.

The unchanged default Borg rerun reports no root failures, passes entry, and dispatches the finite-width regulator. Its causal-width ladder converges, but core-scale level 1 reaches 200,001 cells with impulse width `1.46846e-7`; the candidate remains unpublished. The coupled correction residual is `3.29893e-6`, inside the unchanged `0.1` budget.

Claim grade: `derived` for the inward-bracket construction and `measured` for the synthetic and live certificates. Falsifier: either directed endpoint sign is non-strict or equal, the join source normal contains zero, the bracket exceeds its tolerance, the Decimal/native brackets do not overlap, or the live default again reports a root failure.

## Adaptive Controller Certificate

The `EOM_BORG_NATIVE_V2` protocol requires exactly 18 fields in its Borg `RUN` record, including `maximum_step`, `use_adaptive_step_growth`, and the explicit far-field enclosure fraction. A static retained-history protocol case evolves a `0.4` interval with `initial_step=0.1`, `maximum_step=0.4`, and adaptive growth enabled. It accepts three steps rather than four: two `0.1` steps establish the existing one-eighth budget headroom and the final step grows to `0.2`.

The Borg runner also carries the returned controller height into the next atomic chunk. A two-chunk test returns `0.025` from the first request and certifies that the next request starts at `0.025` while retaining its larger `maximum_step`. Step-controller changes are excluded from the acceleration snapshot cache key, and the native reuse test changes the second request's step while retaining the certified chunk-boundary snapshot.

Claim grade: `measured-test`. Falsifier: the static case needs four accepted steps, a second Borg chunk restarts at the nominal `0.1`, or changing only the controller step prevents certified start-snapshot reuse.

The fixed-height form sets `maximum_step=initial_step` and disables growth. A before/after binary comparison found its deterministic response fields and published 454-byte segment payload bit-identical; wall-time counters were excluded because they are nondeterministic measurements.

Claim grade: `measured`. Falsifier: the same fixed-height request changes any deterministic response token or published segment coefficient.

The seed-0 default run does not show post-shrink recovery: its terminal accepted steps do not establish two consecutive one-eighth-headroom rows before root certification fails. Thus the supplied hypothesis that recovery alone removes the coarse-step survival trade is not established by this seed.

Claim grade: `measured`. Falsifier: a rerun publishes a post-shrink step-height increase before the terminal decision or completes the requested interval.

## Fine-Start Causal-Width Ladder

The base core scale is held fixed at $\epsilon_c=0.2$.

| Level | $\eta$ | Impulse delta from prior | Position-moment delta from prior | Impulse enclosure width | Position-moment enclosure width | Cells | Status |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | `0.2` | — | — | `4.09879e-8` | `2.20301e-10` | 286 | certified |
| 1 | `0.1` | `1.99117e-7` | `2.20319e-10` | `5.90091e-8` | `2.06308e-10` | 286 | certified |
| 2 | `0.05` | `1.32550e-7` | `2.06605e-10` | `9.55967e-8` | `2.06637e-10` | 286 | certified |

- Maximum ladder impulse delta: `2.32739e-7`
- Maximum ladder position-moment delta: `2.20352e-10`
- Declared convergence tolerance: `1e-3`
- Causal-width series verdict: `certified_convergent`

Claim grade: `measured`. Falsifier: any rerun level is uncertified or either maximum ladder delta exceeds `1e-3`.

## Original Fine-Start Core-Scale Ladder And First Failure

The base causal width is held fixed at $\eta=0.2$.

| Level | $\epsilon_c$ | Impulse delta from prior | Position-moment delta from prior | Impulse enclosure width | Position-moment enclosure width | Cells | Status |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | `0.2` | — | — | `4.09879e-8` | `2.20301e-10` | 286 | certified |
| 1 | `0.1` | `9.49168e-6` | `1.16532e-9` | `9.96278e-8` | `1.16531e-9` | 5,581 | certified |
| 2 | `0.05` | — | — | `2.42035e-7` | `8.73494e-10` | 200,001 | `event_impulse_cell_limit_exhausted` |

The first failed row is regulator certification, not coupled correction: the final correction residual is inside the declared `0.1` correction tolerance, while the level-2 core quadrature does not fit the `1e-7` impulse enclosure budget before the 200,000-cell ceiling. The candidate therefore remains unpublished.

Claim grade: `measured`. Falsifier: the same level-2 request certifies within 200,000 cells and all core-ladder deltas fit the declared convergence budget.

## Core-Scale Resource Closure

The production binary64 route now intersects the natural interval extension with mean-value enclosures for the softened kernel, line-of-action direction, and their shared receiver-normal prefactor. Its monotone Gaussian CDF difference shares the receiver state and reuses same-segment source-error correlation. The best-first queue refines reception time at a `16:1` aspect target because emission time is already integrated analytically.

The fixed `h=0.01` resource sweep shows that raising the ceiling alone is not a closure route:

| Track and enclosure | Cell ceiling | Final $\epsilon_c=0.05$ impulse width | Terminal chunk wall | Verdict |
| --- | ---: | ---: | ---: | --- |
| `h=0.01`, prior natural enclosure | 50,000 | `2.77553e-7` | `9.27012 s` | exhausted |
| `h=0.01`, mean-value, `16:1` | 50,000 | `1.95713e-7` | `27.5954 s` | exhausted |
| `h=0.01`, mean-value, `16:1` | 200,000 | `1.82541e-7` | `95.2619 s` | exhausted |

Claim grade: `measured`. Four times as many cells reduced the last width by only `6.73%`; the largest remaining cell was `2.8752e-12`. A further ceiling raise is therefore rejected as a resource policy because this track is approaching its retained-history uncertainty floor rather than the declared `1e-7` budget.

Falsifier: a repeated ceiling sweep on the same retained histories shows ordinary convergence to `<=1e-7` at a bounded cell and wall cost.

The fixed `h=0.005` track reduces the event receiver/source position-error radii to `1.85028e-6`/`1.90101e-6` and certifies the core ladder:

| Level | $\epsilon_c$ | Impulse delta | Position-moment delta | Impulse width | Position-moment width | Cells | Status |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | `0.2` | — | — | `1.84246e-8` | `2.16086e-10` | 568 | certified |
| 1 | `0.1` | `9.60773e-6` | `1.17502e-9` | `9.71195e-8` | `1.17512e-9` | 568 | certified |
| 2 | `0.05` | `2.91488e-5` | `2.19949e-9` | `9.98768e-8` | `3.23609e-10` | 101,377 | certified |

- Maximum core-ladder impulse delta: `3.86594e-5`
- Maximum core-ladder position-moment delta: `2.19949e-9`
- Declared convergence tolerance: `1e-3`
- Declared impulse and position-moment enclosure budgets: `1e-7` each
- Core series verdict: `certified_convergent`
- Terminal chunk containing the accepted level and later state-row retries: `95.4591 s`

Claim grade: `measured`. The $\epsilon_c=0.05$ level and both one-control ladders are certified without changing any declared tolerance or the 200,000 cell ceiling. The recorded wall time is the containing terminal chunk, not an isolated per-level timer, so it is a conservative run-cost report.

Falsifier: rerun the fixed `h=0.005` command and obtain an uncertified level, more than 200,000 cells, either width above `1e-7`, or a ladder delta above `1e-3`.

## Seed-0 Atomic Transit Seek

The refined run completes `[1.35,1.40]` in `0.655211 s`, then accepts two substeps through `1.400725`. The next routed candidate has complete causal- and core-width ladders but halts as `caustic_transit_uncertified` on `FWC-STATE-01` with `caustic_state_reconstruction_failed`. Its coupled correction residual is `5.35877e-5`, inside the unchanged `0.1` correction budget. The candidate is not published.

The remaining obligation is overlap between the finite-width impulse and position moment and the sharp endpoint trapezoid reconstruction on their declared common domain. No second encounter is observable because the run halts at this first routed state-reconstruction row.

Claim grade: `measured`. This is a certified regulator evaluation and an adjudicated atomic halt, not a certified caustic transit.

Falsifier: the same run publishes the rejected candidate, reports a failed regulator row, or obtains sharp/event state overlap and continues beyond the event.

## Research-Grade Refinement-Height Discriminating Control

The seed-0 control held position, velocity, and causal-root tolerances at `1e-8`, the event impulse and position-moment budgets at `1e-7`, the event ceiling at 200,000 cells, and the MPFR ceiling at 2,048 bits. Adaptive growth was disabled, the far-field enclosure was disabled to isolate this route, and the maximum step followed the declared refinement heights.

| Maximum step | Accepted through | First discriminating result | Terminal/encounter chunk | Native wall through result |
| ---: | ---: | --- | ---: | ---: |
| `0.01` | `1.24965625` | halt `FWC-ENTRY-02`, pair `1003<-1006`, residual width `4.32101e-9` | `16.4963 s` | `74.588726 s` |
| `0.005` | `1.2846875` | halt `FWC-ENTRY-02`, pair `1003<-1006`, residual width `4.36731e-9` | `14.0907 s` | `43.316878 s` |
| `0.0025` | `1.4` | routed attempt `[0.3425,0.345]`: `FWC-REG-02` passes and `FWC-STATE-01` fails for pair `1004<-1006`; later close-approach chunk completes | `2.35004 s` first routed chunk; `107.652 s` `[1.35,1.4]` | `210.146311 s` through `1.4` |

The two coarser tracks fail before any regulator evaluation. The `0.0025` track crosses both boundaries and emits a complete causal-width and core-scale ladder for the routed attempt. Its core ladder is:

| $\epsilon_c$ | Impulse width | Position-moment width | Cells | Status |
| ---: | ---: | ---: | ---: | --- |
| `0.2` | `9.70321e-8` | `1.59529e-8` | 3,712 | certified |
| `0.1` | `9.57729e-8` | `1.70107e-8` | 5,106 | certified |
| `0.05` | `9.69534e-8` | `1.74814e-8` | 5,440 | certified |

The core series is `certified_convergent`; its final impulse delta is `3.07925e-6`, its maximum ladder impulse delta is `1.24917e-5`, and both are inside the unchanged `1e-3` convergence tolerance. Thus $\epsilon_c=0.05$ fits both unchanged `1e-7` enclosure budgets and the 200,000-cell ceiling on this research track.

Claim grade: `measured`. Falsifier: the recorded `0.0025` command yields an uncertified core level, more than 200,000 cells, either width above `1e-7`, or a ladder delta above `1e-3`.

The same attempted event step is rejected as `caustic_state_reconstruction_failed`; the emitted contract row is `FWC-STATE-01`. Its retained-history error radii are approximately `1.18e-11` receiver position, `9.51e-9` receiver velocity, `1.22e-11` source position, and `9.53e-9` source velocity. The failure therefore persists on a track that supports the regulator, although it is a different pair and event window from the later fixed-`0.005` state-row failure. This rules out the branch in which both regulator and state rows close; it does not establish pair-identical failure geometry.

Claim grade: `measured` for the row, pair, window, and radii; `derived` that the “both close” branch is false for this control. Falsifier: the same command emits an accepted `FWC-STATE-01` row for that routed attempt or no routed attempt at all.

The controller rejects the routed step, halves the height, and completes the chunk. The retry does not retain an accepted regulator certificate for the pair, and the later `[1.35,1.4]` close-approach chunk emits no regulator row. Completion through `1.4` is therefore not a certified finite-width passage. A separate continuation reached `1.4004` and then halted `minimum_step_exhausted` on `numeric_step_budget_exceeded`, with no FWC row.

Claim grade: `measured` for the retry records and later halt; `derived` from the route contract that a sharp retry cannot discharge a rejected event row. Falsifier: an accepted child step contains a passing regulator, state, and exit certificate for the pinned pair, or the later chunk contains an accepted finite-width certificate omitted by the profiler.

The derived `FWC-STATE-01` obligation is now explicit in the route packet. It requires event-aware endpoint reconstruction from disjoint background plus event rows, chart comparison only on a certified sharp/finite-width common domain, certified $h_C^3L_2/12$ and $h_C^4L_2/24$ remainder rows for any endpoint-linear shortcut, and persistence of the routed pair across every subdivision until state and exit pass or the event floor halts. A raw full-window sharp trapezoid has no derived remainder across the fold and cannot by itself discharge the row.

Claim grade: `derived`. Falsifier: a proof supplies a finite full-window sharp remainder across the fold, or independent reconstruction shows that the declared background/event rows fail to enclose an otherwise accepted endpoint.

Commands used the common suffix:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=40 --seed=0 --initial-step=H --minimum-step=0.0001 \
  --maximum-step=H --adaptive-growth=false --root-tolerance=1e-8 \
  --position-tolerance=1e-8 --velocity-tolerance=1e-8 \
  --maximum-mpfr-bits=2048 --event-max-cells=200000 \
  --far-field-enclosure-fraction=0 --summary-only=true
```

The certificate-capture rerun used `H=0.0025` and `--chunks=28`. The binary timestamp was `2026-07-16 20:30:27 -0400`, later than the final route-source timestamp `2026-07-16 20:30:18 -0400`. The Decimal oracle was not modified.

## Pinned Common-Domain Reconstruction Adjudication

The implementation replaces the full-window sharp trapezoid with disjoint background and event endpoint rows. For every routed receiver, the sharp ordered-pair endpoint rows are subtracted exactly once from the background; the certified event impulse and position moment are then added exactly once. The emitted state row records both reconstructed endpoint enclosures and the candidate endpoint component. A first half-step may carry `certified_state_exit_pending` only inside its enclosing atomic full/two-half comparison; the ordered pair is inserted into the second-half request and no history is published unless that final child passes exit.

Claim grade: `derived-implementation`. Falsifier: pair accounting finds an event row in both the background and event sums, an event row in neither sum, or an atomic publication contains an exit-pending routed pair.

On each declared common-domain side interval, the implementation certifies a complete root tube and root-free complement, a positive separation outside the core, and a nonzero source-normal lower bound. It evaluates the nominal sharp branch as a second-order interval jet, emits the componentwise $L_{2,k}$ bound, and adds the outward shortcut rows $h_C^3L_{2,k}/12$ and $h_C^4L_{2,k}/24$. Stored track enclosure is a separate uniform integral remainder; it is not hidden inside $L_2$. The finite-width integral is evaluated only over the same common interval, with its position moment shifted to the parent event endpoint before comparison.

Claim grade: `derived-implementation`. Falsifier: a declared common interval contains an unisolated root, $D_s=0$, or core-active separation; recomputation of either shortcut coefficient exceeds its emitted remainder; or the emitted finite-width row integrates a reception interval outside the declared common domain.

The rebuilt certified-grade control used the recorded research settings: `h_max=0.0025`, root/position/velocity tolerances `1e-8`, MPFR through 2,048 bits, unchanged `1e-7` event budgets, 200,000 event cells, and no far-field enclosure. Source `CoupledEvolution.cpp` was timestamped `2026-07-16 22:29:15 -0400`; the executed Borg binary was rebuilt afterward. The independent Decimal oracle was unchanged.

| Row | Measured result |
| --- | --- |
| `FWC-ENTRY-02` | pass for the routed parent beginning at `0.3425` |
| `FWC-REG-01` | pass; the terminal child had maximum ladder impulse delta `2.83216e-8` and position-moment delta `1.52559e-10` for `1004 <- 1006` |
| `FWC-REG-02` | pass; the parent retained the recorded $\epsilon_c=0.05$ level: 5,440 cells, impulse width `9.69534e-8`, position-moment width `1.74814e-8` |
| `FWC-STATE-01` endpoint assembly | pass, component by component |
| `FWC-STATE-01` common-domain chart overlap | fail on component 0 |
| `FWC-EXIT-01` | pass on the terminal child |
| Atomic result | halt `caustic_transit_uncertified`; accepted end `0.3425` |

At the minimum-height child `[0.3425,0.3426]`, the first certified common side cell was `[0.3425,0.34250000610351566]`. For ordered pair `1004 <- 1006`, the sharp and finite-width impulse intervals were disjoint in component 0 by `3.51437e-11`; the applicable shortcut-plus-track remainder was `6.29988e-16`. The gap was about 55,800 times the complete emitted remainder. The same pinned child also exposed `1004 <- 1002`; its component-0 gap was `1.7013e-10` against `1.54408e-15`. Six rejected heights reached the declared `0.0001` floor. The terminal `[0.3,0.35]` chunk cost `6.39989 s`; ordinary preceding chunks rose from `0.171295 s` through `0.734047 s`.

Claim grade: `measured`. Falsifier: the same rebuilt binary and command emits a different terminal row, either common-domain interval overlaps component by component, the endpoint/exit row fails instead, or the wall-time instrument does not reproduce within ordinary machine-load variation.

On this fixed track, spending more cells or tightening the stored track envelope cannot cover the measured common-domain gap: the complete remainder is already more than four orders of magnitude smaller. The next mathematical rung is to reconcile which regulator-level finite-width law has common-domain matching authority; a smaller step alone scales both the gap and the integral remainder without changing their observed center ratio.

Claim grade: `inferred`. Falsifier: a tighter independently recomputed track moves the sharp and finite-width centers into overlap under the same regulator law, or a step-height ladder shows the gap-to-remainder ratio tending to one rather than remaining large.

### Ratified matching disposition

On 2026-07-17 the operator adopted the ratified regulator-limit common-domain matching decision: common-domain authority is regulator-limit matching with a certified $R^{\mathrm{reg}}$, not exact sharp/finite-width identity at fixed positive $\eta$ and $\epsilon_c$. The measured raw gaps above remain valid instrument outputs, but raw disjointness is no longer the complete `FWC-STATE-01` obligation. The complete test must add the certified regulator-matching row to the existing numerical remainder and keep their sum inside the unchanged event budget.

No transit is promoted by this decision. The current EOM solver does not emit the new row, so its halt remains not advanced and adjudicated until a separate implementation with independent evidence contains the measured gaps. For the recorded side cells, that implementation must certify at least $R^{\mathrm{reg}}_{I,0}\ge3.51437\times10^{-11}$ for `1004 <- 1006` and $R^{\mathrm{reg}}_{I,0}\ge1.7013\times10^{-10}$ for `1004 <- 1002`, while the complete rows remain below the unchanged $10^{-7}$ impulse budget.

Claim grade: `operator-decision` for the matching contract, `measured` for the raw gaps, and `inferred quantitative prediction` for the required minimum radii. Falsifier: an independently implemented certified remainder excludes either raw gap, the matched intervals remain disjoint, or the complete row exceeds the unchanged event budget.

## Step-Height Configuration Decision

Option (b) is selected: Borg keeps `chunkDuration=0.05` and declares the true reachable ceiling `initial_step=maximum_step=0.05`. Adaptive regrowth remains enabled under the unchanged one-eighth-budget gate. The unreachable nominal `0.1` setting is removed.

| Seed | Coherent adaptive `h_max=0.05` | Terminal/encounter chunk wall | Fixed `h_max=0.025` control | Terminal/encounter chunk wall |
| ---: | --- | ---: | --- | ---: |
| 0 | halt `FWC-REG-02` at `1.360646875` | `63.4486 s` | halt `FWC-REG-02` at `1.3759765625` | `109.95 s` |
| 1 | halt `FWC-ENTRY-02` at `1.110171875` | `0.696714 s` | completed `2.0` | `[1.95,2.0]`: `10.7518 s` |
| 2 | halt `FWC-REG-02` at `1.14306875` | `97.0299 s` | halt `FWC-REG-02` at `1.1548828125` | `86.1819 s` |

Ordinary steady chunks were about `0.007 s` at `0.05`; representative fixed `0.025` steady chunks were about `0.020-0.028 s`. The coarser controller is therefore faster in smooth phases but does not preserve the finer trajectory's run length. Selecting `0.05` rather than raising the chunk to `0.1` is the conservative coherent choice within the two allowed configurations; it does not claim track equivalence to `0.025`.

Claim grade: `measured` for the table and costs; `inferred` for selecting the smaller allowed ceiling after combining this table with the supplied measured `h=0.1` seed-2 earlier-halt result.

The seed-0 adaptive row is the current post-entry-certificate measurement. Seed 1 and seed 2 retain the earlier controller-selection measurements and were not rerun for this root-row closure.

Falsifier: a same-binary three-seed `chunkDuration=0.1`, `h_max=0.1` comparison matches or exceeds both the `0.05` run lengths and acceptable browser latency, or the implemented default emits an attempted step above `0.05`.

The 0.05 simulated-time chunk preserves the prior UI update and halt granularity. Ordinary wall latency is measured above. Terminal certification still emits no browser-visible in-request heartbeat; the 86-110 second cases remain a known presentation gap. The finite 200,000-cell ceiling bounds work but does not provide an elapsed-time deadline.

Claim grade: `derived` for the 0.05 simulated-time granularity and `measured` for observed wall latency. Falsifier: browser transport emits intermediate certification progress, or a request exceeds neither the cell ceiling nor a new declared elapsed-time budget while remaining silent.

## Independent Reference

The independent reference is the Decimal interval joint causal-triangle integrator in `scripts/eom/oracle/phase4_acceptance.py`. It now returns both

$$
\mathbf I_{ij}=\int_{T_0}^{T_1}\mathbf A_{ij}(T)\,dT
$$

and

$$
\mathbf M_{ij}=\int_{T_0}^{T_1}(T_1-T)\mathbf A_{ij}(T)\,dT.
$$

The reference extension was committed before the C++ engine change. The native binary64 and MPFR synthetic-fold enclosures overlap the independently authored Decimal oracle for every component of both vectors.

Claim grade: `measured-test`. Falsifier: either native vector has a component whose interval does not overlap the corresponding Decimal oracle interval.

## Validation

| Validation | Result |
| --- | --- |
| `python -m unittest discover -s tests -p 'test_eom_*.py'` | 139 passed in `144.290 s` |
| `node --test tests/borg-*.test.js` | 63 passed |
| `.githooks/pre-commit` | passed |
| research profiler syntax and diff check | passed |
| Borg protocol growth case | passed; `0.1, 0.1, 0.2` |
| Fixed-height deterministic response parity | bit-identical |
| Cross-chunk controller retention | passed |
| Snapshot reuse across controller-step change | passed |
| Native/Decimal event impulse and position-moment overlap | passed in binary64 and MPFR controls |
| Native/Decimal non-binary segment-join root overlap | passed in MPFR control |
| Event resource exhaustion | was not advanced |
| Atomic publication on route failure | passed; input histories retained |

## Disposition

This evidence is `priority-only`. It authorizes the named adjudication path, for which verification is required for advancement, not a production transit claim. `FWC-ENTRY-02` is closed for the default seed-0 trajectory. Its `FWC-REG-02` halt is the accepted adjudicated state of that demo-tolerance track. No atomic transit or production passage claim is authorized. Any research-tolerance discriminator, `FWC-STATE-01` reconstruction/common-domain work, or pinned pair coverage across subdivision belongs to the follow-up FWC thread and does not reopen the accepted demo-track halt without new evidence satisfying its falsifier.

## Amendment 1 Follow-Up — 2026-07-17

The research-tolerance `h_max=0.0025` continuation is superseded by [the independently checked Amendment 1 implementation evidence](eom-fwc-regulator-matching-remainder-seed-0-2026-07-17.md). That run reproduces the recorded raw component-0 gap exactly, contains it with the new regulator-matching row, and atomically publishes the first certified finite-width child through `T=0.3428125`. The default demo-tolerance `FWC-REG-02` disposition above is unchanged; it is a different track and still fails before this matching row has publication authority.

Claim grade: `measured follow-up`. Falsifier: the linked evidence does not reproduce the raw gap, exceeds the unchanged budget, or lacks a complete accepted entry/regulator/state/exit certificate.
