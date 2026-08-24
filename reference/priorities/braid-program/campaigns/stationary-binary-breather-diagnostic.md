# Stationary Opposite-Polarity Binary Release — Breather Diagnostic

Status: PREDECLARED DIAGNOSTIC; NON-BOOKING (2026-07-24).

## Question and claim ceiling

Release two opposite-polarity architrinos from rest after a declared stationary retained prehistory. Determine, over the finite computed interval, whether they approach, cross or reach a positive-separation closest approach, move apart, turn back toward one another, and complete a minimum-maximum-minimum separation sequence.

This is a bounded return-map diagnostic. It cannot establish eternal breathing, retention, a physical object, or canonical dynamics. The checkpoint harness is not currently accepted under G3 of [instrument-gate.md](instrument-gate.md), and a new diagnostic host cannot accept itself in the same change that first exercises it.

## Initial condition

Use normalized wake-speed units with $c_f=1$, charges $q_+=+1/6$ and $q_-=-1/6$, and the declared EOM coupling $36\kappa_{\mathrm{eq}}$.

At release time $T=0$,

$$
\mathbf X_+(0)=(+0.5,0,0),\qquad
\mathbf X_-(0)=(-0.5,0,0),
$$

and

$$
\mathbf U_+(0)=\mathbf U_-(0)=(0,0,0).
$$

For the baseline, both paths are held exactly at their release positions on $-20\le T\le0$. Thus the retained histories are constant piecewise cubics, and the unit-distance cross-wake emitted at $T=-1$ is already present at release. The horizon is twenty times the one-unit wake travel time.

Plainly: neither architrino receives a launch kick. Each has been sitting still and transmitting for long enough that the other already receives its delayed wake when both are released.

## Numerical ladder

The baseline uses history depth $H=20$. Refinements are fixed before execution:

| Level | maximum step | maximum retained-history segment | root depth | steps per chunk |
|---|---:|---:|---:|---:|
| R0 | $0.02$ | $0.10$ | 192 | 5 |
| R1 | $0.01$ | $0.05$ | 224 | 10 |
| R2 | $0.005$ | $0.025$ | 256 | 20 |

Stationary-history horizon sensitivities use $H=10$ and $H=40$ at R1. Both still exceed the release cross-wake travel time by a factor of at least ten. Because all three histories are the same constant functions on their common domain, this tests dependence on the retained lower boundary; it is not a materially different-prehistory collapse test.

## Predeclared measurements

1. Certified release root status for every ordered cross pair.
2. Each path's EOM acceleration interval at $T=0$ and the relative radial acceleration interval $A_{r,\mathrm{rel}}(0)=A_{+,x}(0)-A_{-,x}(0)$.
3. Separation $r(T)$, radial separation rate $\dot r(T)$, closest sampled approach, and midpoint drift.
4. Labeled-path crossing, detected when $(\mathbf X_+-\mathbf X_-)\cdot\mathbf e_x$ changes sign.
5. At a crossing, its sampled bracket and linearly interpolated location relative to the origin, the midpoint symmetry error, and each path's speed as a fraction of the $c_f=1$ ceiling.
6. Ordered events: approach, minimum or crossing, outward motion, later maximum, renewed approach, and a later minimum.
7. For every complete minimum-maximum-minimum excursion, the inner and outer event times and separations; for successive excursions, the extrema changes and ratios. A finite sampled trend may be called shrinking, growing, approximately neutral within the declared uncertainty, or unresolved.
8. Maximum individual speed and reported state-error bounds. No energy account is reported because no accepted architrino-level energy account is defined for this diagnostic.

Plainly: a zero-distance pass-through is called a crossing, not a rebound. “Breathing” requires the separation to come back down after a later maximum; one inward-and-outward pass is insufficient.

No finite trace is described as damped, anti-damped, or a stable limit cycle. Those labels require an accepted account and return-map evidence that this diagnostic does not provide.

## Gates and stopping rules

- Stop and report if release roots are not `certified_complete`.
- Stop a trajectory at the first EOM solver halt and retain only atomically published history.
- Any path whose certified speed enclosure touches field speed is outside this diagnostic's declared sub-field scope.
- R1 and R2 must agree on event order and event values within $0.02$ before a refinement-stable finite-window statement is made.
- An accepted independent-oracle window is required before any result can be booked beyond diagnostic grade.
- G3/G4 reacceptance must occur in a separate change before the checkpoint harness can carry campaign evidence.

The diagnostic is falsified as a repeated breather if no minimum-maximum-minimum sequence occurs before the first valid stopping rule. Where to look: `release-acceleration.json`, `run-manifest.json`, `frames.jsonl`, `census.jsonl`, and the sampled reduction beside each local run.
