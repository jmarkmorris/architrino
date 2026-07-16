# Section 86 V5 Collapse-Campaign Preflight — 2026-07-14

## Disposition

The corrected multi-seed instrument is ready, but the V5 collapse campaign did
not reach seed clearance in this packet. The legacy object-level
$\operatorname{Re}\lambda=0.199$ claim remains retired as not well-posed, and
the replacement V5 collapse row remains open. No flutter, return, saturation,
collapse, or non-collapse verdict is claimed.

Disposition: `priority-only`; `endpoint_matched_seed_family_admitted`;
`native_start_and_first_step_certified`; `collapse_horizon_not_executed`;
`section_86_replacement_campaign_open`; `section_90_quarantined`;
`no_score_increase`.

## Corrected seed object

The prior Section 86 runner's `imx`, `mox`, and mode seeds tilted the complete
circular history, including the position and velocity at $t=0$. They are
endpoint-perturbation controls, not a prehistory-independence family.

The runner now separates endpoint perturbations from retained-prehistory
perturbations. For history depth $h$, define

$$
E(t)=\sin^2\!\left(\frac{\pi t}{h}\right)
+0.35\sin^2\!\left(\frac{2\pi t}{h}\right).
$$

Because $E(0)=E'(0)=0$, both the radial-breath history
$\rho_a(t)=\rho_a[1+\varepsilon E(t)]$ and the layer-tilt history
$\beta_a(t)=\varepsilon p_aE(t)$ meet the exact circular V5 endpoint state.
The admitted history is the resulting piecewise cubic Hermite chain; it is not
treated as an analytic circular path by the engine.

The executable seed basin is:

- exact circular history on all six worldlines;
- radial breath on the inner and outer antipodal layers, with the pinned middle
  layer retaining its factory-certified circular history;
- tilt modulation on the inner and outer layers, again retaining the pinned
  middle circular history;
- the radial history at an opposite, smaller amplitude for direction and
  magnitude coverage.

The inner/outer restriction is a declared basin, not a universality claim. It
keeps the $v=c_f$ middle self-pairs on the exact circular certificate while
still supplying materially different admissible histories for the coupled
six-worldline object.

## Endpoint-match and start certificates

**Derived:** the envelope and its first derivative vanish at $t=0$, so the
analytic construction has the same endpoint position and velocity as the
circular history.

**Measured:** the native runner compares all six endpoint states against its
factory-circular control. With $h=8$ and prehistory segment width $0.02$:

| Seed | Amplitude | Maximum position mismatch | Maximum velocity mismatch | Snapshot |
| --- | ---: | ---: | ---: | --- |
| radial inner/outer | $+0.03$ | $1.39\times10^{-17}$ | $4.00\times10^{-16}$ | certified complete; zero unresolved roots |
| tilt inner/outer | $+0.02$ | $1.39\times10^{-17}$ | $5.00\times10^{-16}$ | certified complete; zero unresolved roots |
| radial all layers, diagnostic | $+0.03$ | $5.55\times10^{-17}$ | $2.35\times10^{-15}$ | certified complete through two finite-width middle self-pairs |

The mismatch values are binary64 midpoint comparisons; the admitted cubic
segments also carry constructor-checked decimal join enclosures.

## First-step measurements

All runs used the unchanged master equation and declared tolerances, the
`sharp_with_finite_width_fallback` chart, eight requested workers, initial step
$5\times10^{-4}$, and atomic publication.

| Seed | Accepted time | Step wall time | Unresolved roots | Production MPFR pairs |
| --- | ---: | ---: | ---: | ---: |
| radial inner/outer $+0.03$ | $5\times10^{-4}$ | $2.15234$ s | $0$ | $0$ |
| tilt inner/outer $+0.02$ | $5\times10^{-4}$ | $2.12675$ s | $0$ | $0$ |
| radial all layers $+0.03$, step 1 | $5\times10^{-4}$ | $475.791$ s | $0$ | included below |
| radial all layers $+0.03$, step 2 | $1.48874905\times10^{-3}$ | $468.618$ s | $0$ | included below |

The two-step all-layer diagnostic used $944.409$ wall seconds, 42 MPFR pair
certifications, and 84 MPFR escalation attempts. Its second step did not become
cheap after warm-complement transport. **Measured:** varying the pinned middle
prehistory removes the circular provenance needed by the fast root path and is
about $220\times$ more expensive per measured step than the admitted
inner/outer seed starts. This is a cost result about the declared instrument,
not a physical V5 result.

The inner/outer starts retain zero production MPFR pairs and therefore provide
the executable first basin for the collapse campaign. Their accepted root
ledger still reaches the seeded interval: after the first step the active
search lower bound is approximately $-2.00919$. No phase-collapse comparison
is admissible until that bound becomes nonnegative and the trajectories then
continue through the declared post-clearance horizon.

## Build and independent anchor

The native library was rebuilt at `2026-07-14 23:07:22`, after the participating
`CoupledEvolution.cpp` source at `2026-07-14 23:07:14`. The campaign runner was
built at `2026-07-14 23:20:11`, after its source at
`2026-07-14 23:20:05`. All three CMake native fixtures passed after the rebuild.

The load-bearing root and force corners retain the previously accepted
independent anchors: the 90-digit evolved-history root oracle parity and the
closed-form curved/straight self-hit plus sub-$c_f$ anti-damping theorem gates.
This packet does not claim a new independent time-domain verdict. It establishes
only that the corrected histories are admitted and that their first native
steps publish atomically.

## Campaign status

A serialized one-cycle campaign was prepared with four baseline histories and
one refinement control using half step, half prehistory segment width, and
$h:8\to10$. The persistent supervisor launch was not authorized, so no
campaign process remains active. No result from this packet is promoted into
reader-facing AAA prose.

Closure goal: run the prepared endpoint-matched seed family through certified
seed clearance and the post-clearance phase-curve horizon, then adjudicate the
replacement Section 86 row from the common-branch distances and numerical
envelope.
