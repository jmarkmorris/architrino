# Antipodal Binary — Prehistory-Independence (Collapse) Test

**Date:** 2026-07-14
**Run by:** initial adjudication of the emitted trajectories, followed by a
same-instrument $s_0=0.25$ successor run through $t=65$
**Disposition:** `collapse_test_fails`; `no_attracting_spiral_measured`;
`circular_manifold_result_does_not_govern_dynamics`; `t3_tier_implication_flagged`;
`long_horizon_confirms_seed_indexed_family`; `rail_campaign_stopped`;
`priority-only`.

## Verdict

**The four prehistories do not collapse.** At $s_0=0.25$, four materially
different histories seeded to the *identical*
$(R_0,s_0)=(3.710182,\,0.25)$ at $t=0$ evolve onto distinct phase curves and
stay apart through $t=65=6.5h$. There is no measured attracting spiral for the
antipodal binary, and therefore **no unique spiral law to fit.**

## The measurement

Four seeds — exactly circular, log-spiral-in, log-spiral-out, perturbed — at
matched $(R_0,s_0)$, first evolved to $t=25$ against memory depth $h=10$
($2.5$ memory depths), then extended without changing the instrument or
numerical settings to $t=65$ ($6.5$ memory depths). The log-spiral seeds match
$R_0$ and total speed $s_0$ but intentionally have opposite endpoint radial
velocities. The circular and perturbed seeds also match the complete endpoint
position and velocity; they differ only in retained prehistory.

| $t$ | circular | log-spiral-in | log-spiral-out | perturbed |
|---:|---|---|---|---|
| 0 | $R{=}3.7102$ $s{=}0.2500$ | $3.7102$ / $0.2500$ | $3.7102$ / $0.2500$ | $3.7102$ / $0.2500$ |
| 8 | $3.7581$ / $0.2811$ | $3.1711$ / $0.3301$ | $4.2712$ / $0.2404$ | $3.7682$ / $0.2798$ |
| 16 | $4.0766$ / $0.2978$ | $3.3121$ / $0.3875$ | $4.8158$ / $0.2330$ | $4.0842$ / $0.2963$ |
| 25 | $4.9148$ / $0.2920$ | $4.8509$ / $0.3697$ | $5.4550$ / $0.2239$ | $4.9082$ / $0.2909$ |

Relative seed spread in $s$: $4.2\%$ at $t=1$, $27.2\%$ at $t=8$, $39.9\%$ at
$t=16$, $40.7\%$ at $t=20$, $39.4\%$ at $t=25$. **It grows, then plateaus. It
does not shrink.**

Here and below the absolute speed diameter and relative speed diameter are

$$
\Delta s(t)=\max_i s_i(t)-\min_i s_i(t),
\qquad
\Delta_s^{\rm rel}(t)=\frac{\Delta s(t)}{\max_i s_i(t)},
$$

where $i$ indexes the four seeds. The percentages above use
$\Delta_s^{\rm rel}$, not division by the mean speed.

## Long-horizon overturn test

The only remaining overturn route was a very slow attraction beyond the initial
plateau. The complete $s_0=0.25$ four-seed case was therefore extended from
$t=25$ to $t=65$. Every seed completed $6501/6501$ steps with zero rejections.
The largest speed anywhere in the extension was $0.3892364333$ on the inward
seed at $t=17.63$, so the campaign remained strongly sub-$c_f$ and never
approached the rail.

| $t$ | $t/h$ | $\Delta R$ | $\Delta s$ | $\Delta_s^{\rm rel}$ |
|---:|---:|---:|---:|---:|
| 16 | $1.6$ | $1.5036$ | $0.15458$ | $39.9\%$ |
| 20 | $2.0$ | $1.2474$ | $0.15724$ | $40.7\%$ |
| 25 | $2.5$ | $0.6041$ | $0.14579$ | $39.4\%$ |
| 30 | $3.0$ | $0.5134$ | $0.13290$ | $37.8\%$ |
| 40 | $4.0$ | $2.1126$ | $0.11699$ | $36.1\%$ |
| 50 | $5.0$ | $4.0498$ | $0.11121$ | $36.2\%$ |
| 60 | $6.0$ | $5.9771$ | $0.11058$ | $37.3\%$ |
| 65 | $6.5$ | $6.9339$ | $0.11129$ | $38.1\%$ |

The relative speed spread dips only to about $36\%$ and then rises to $38.1\%$.
It remains $7.4\times10^6$ times the $1.5\times10^{-8}$ half-step control at
$t=65$. The same-radius phase diameter over the enlarged common outward interval
$R\in[4.4067,8.6568]$ is $0.13881$ at the start, reaches a shallow minimum
$0.13604$, and grows to $0.14399$ at the end. A slow phase-plane attractor is
therefore not present on this measured horizon.

### Requested circular versus log-spiral-out projection

The requested two-seed synchronized-time comparison does shrink after $t=25$:

| $t$ | $t/h$ | $s_{\rm circ}$ | $s_{\rm out}$ | $\lvert s_{\rm circ}-s_{\rm out}\rvert$ | relative gap |
|---:|---:|---:|---:|---:|---:|
| 8 | $0.8$ | $0.28105$ | $0.24040$ | $0.04066$ | $14.5\%$ |
| 16 | $1.6$ | $0.29779$ | $0.23296$ | $0.06483$ | $21.8\%$ |
| 20 | $2.0$ | $0.29795$ | $0.22908$ | $0.06888$ | $23.1\%$ |
| 25 | $2.5$ | $0.29201$ | $0.22395$ | $0.06807$ | $23.3\%$ |
| 30 | $3.0$ | $0.28222$ | $0.21856$ | $0.06366$ | $22.6\%$ |
| 40 | $4.0$ | $0.26026$ | $0.20737$ | $0.05288$ | $20.3\%$ |
| 50 | $5.0$ | $0.24110$ | $0.19628$ | $0.04482$ | $18.6\%$ |
| 60 | $6.0$ | $0.22584$ | $0.18579$ | $0.04004$ | $17.7\%$ |
| 65 | $6.5$ | $0.21944$ | $0.18085$ | $0.03859$ | $17.6\%$ |

That shrinkage is **not** phase-plane attraction. At fixed radius, the same
pair's speed gap grows from $0.05930$ at $R=4.4067$ to $0.06132$ at
$R=8.6568$. The pair becomes almost exactly co-radial at $t=33.83$:
$R_{\rm circ}=6.1208022$ and $R_{\rm out}=6.1207581$, a gap of only
$4.41\times10^{-5}$. Their speeds at that same time are nevertheless
$0.27376$ and $0.21431$, a gap of $0.05945$, with velocity components
$(u,v_\theta)=(0.15073,0.22852)$ and $(0.07744,0.19983)$. By $t=65$ their
radius gap has reopened to $2.6840$.

The synchronized $s(t)$ gap shrinks because both escaping trajectories move to
lower speed scales at different rates; it does not measure distance between
their phase curves. Using synchronized shrinkage alone as the attractor gate
would therefore return a false positive. The collapse criterion remains
$\Delta s(R)\to0$ on a common phase branch, together with contraction of the
other state observables needed for the object.

The four endpoints are:

| seed $i$ | $R_i(65)$ | $s_i(65)$ | $\dot R_i(65)$ | $v_{\theta,i}(65)$ |
|---|---:|---:|---:|---:|
| circular | $11.3408$ | $0.21944$ | $0.17218$ | $0.13604$ |
| log-spiral-in | $15.5908$ | $0.29214$ | $0.27378$ | $0.10194$ |
| log-spiral-out | $8.6568$ | $0.18085$ | $0.08282$ | $0.16077$ |
| perturbed | $11.2583$ | $0.21866$ | $0.17051$ | $0.13688$ |

The [phase-curve table](antipodal-binary-s025-phase-curves-2026-07-14.csv) and
[temporal-spread table](antipodal-binary-s025-temporal-spread-2026-07-14.csv)
carry the complete plotted values.

## Why $R$ converged temporarily while $s$ did not

Define $R$ as the radius of either antipodal worldline from the binary center,
so the worldline separation is $2R$. Define $u=\dot R$ as radial velocity and
$v_\theta=R\dot\theta$ as tangential velocity. With $c_f=1$, the dimensionless
total speed is

$$
s=\sqrt{u^2+v_\theta^2}.
$$

The temporary shrinkage in $R$ is a catch-up event. At $t=25$, the outermost
log-spiral-out seed has $R=5.4550$ but only $u=0.07323$, while the innermost
log-spiral-in seed has $R=4.8509$ and $u=0.22615$. As long as those seeds remain
the radius extrema,

$$
\frac{d}{dt}\Delta R=u_{R_{\max}}-u_{R_{\min}}
\approx0.07323-0.22615=-0.15292.
$$

The trailing inward seed is therefore closing the radius gap quickly. This does
not require its velocity to approach the leader's velocity; it requires the
opposite ordering of position and radial velocity.

The radius diameter reaches its post-memory minimum $\Delta R=0.35984$ at
$t=28.68$. At that time the inward and outward seeds have almost the same
radius, $R=5.72839$ and $5.72790$, but their total speeds are $0.35604$ and
$0.22000$. Their velocity components are also different:
$(u,v_\theta)=(0.24866,0.25482)$ against $(0.07507,0.20679)$. The trajectories
cross in the one-dimensional $R$ projection without meeting in phase space or
in retained-history state. After the crossing, the faster inward seed moves to
the outside and $\Delta R$ reopens to $6.9339$ by $t=65$.

This resolves the asymmetry. Radius is an integrated coordinate, so its spread
can narrow when a trailing seed catches a leading seed. Speed is an
instantaneous velocity magnitude, and the delay force still depends on each
seed's recent path. Equality of $R$ neither equalizes $(u,v_\theta)$ nor erases
the retained histories. The partial radial convergence was a projection
crossing, not attraction.

## How to read each graph

### Graph 1 — radius against memory depth

The horizontal axis is $t/h$, elapsed time $t$ divided by the memory depth
$h=10$. The vertical axis is $R(t)$. The inward seed first contracts, turns at
$t\approx11.24$, catches the outward seed near $t=28.68$, and then pulls ahead.
The circular and perturbed lines remain close because they share the complete
endpoint state, but their small separation is resolved well above numerical
noise. The graph shows that the $R$ cluster near $4.9$ at $t=25$ is temporary.

### Graph 2 — speed against memory depth

The horizontal axis is again $t/h$; the vertical axis is
$s(t)=v(t)/c_f=\sqrt{u^2+v_\theta^2}$ because $c_f=1$. The inward seed peaks at
$s=0.38924$ near $t=17.63$ and then declines, while the outward seed declines
more slowly from below. The four lines remain separated through $6.5h$. Their
common downward drift after the early interaction is not collapse: collapse
would require the vertical gaps between the lines to tend toward zero.

### Graph 3 — phase curves $s$ versus $R$

Time is removed. The horizontal axis is common radius $R$ and the vertical axis
is speed $s$. Each line is evaluated on its monotone outward post-memory branch;
the inward seed begins only after its turning point. A unique spiral law would
appear as all four lines lying on one curve. Instead the inward and outward
lines remain separated by about $0.14$ in $s$ across the whole common interval.
The phase diameter
$\Delta s(R)=\max_i s_i(R)-\min_i s_i(R)$ falls only from $0.13881$ to
$0.13604$ before rising to $0.14399$. This is the decisive graph: it directly
rejects a prehistory-independent function $s(R)$.

### Graph 4 — seed spreads against memory depth

The radius panel plots
$\Delta R(t)=\max_iR_i(t)-\min_iR_i(t)$. The speed panel plots
$\Delta_s^{\rm rel}(t)=\Delta s(t)/\max_i s_i(t)$. The first panel narrows to a
minimum and then opens rapidly; the second rises to about $40\%$ and stays in a
$36$–$40\%$ band. Reading the aligned panels together prevents the temporary
$R$ crossing from being mistaken for full-state convergence.

## The control — the divergence is not numerical

Same seed, refined numerics, endpoint at $t=8$:

| refinement | $\Delta s$ (relative) |
|---|---:|
| half step | $1.52\times10^{-8}$ |
| half prehistory segment | $5.81\times10^{-10}$ |
| history depth $4\to5$ | $1.13\times10^{-15}$ |

**Seed effect $0.394$ against numerical noise $1.5\times10^{-8}$: a
signal-to-noise ratio of $2.6\times10^{7}$.** The trajectories differ because
the seeds differ, not because the arithmetic is loose. The circular-versus-
perturbed comparison further isolates retained prehistory while holding the
complete endpoint position and velocity fixed.

## Two consequences that were not anticipated

**1. The radius can turn.** The log-spiral-in seed contracts to $R=3.0919$ at
$t=11.2$ and then expands — a genuine turning point. The circular seed's $R$ is
monotone from $t=0$ and never turns. "The isolated binary expands" is a statement
about the *circular seed*, not about the object.

**2. The speed is not monotone.** The log-spiral-in seed's $s$ peaks at $0.3892$
at $t=17.6$ and then **declines** to $0.3697$. The derived $F_\theta(s)>0$ — the
positive-tangential-work result, verified against the native engine to its own
numerical error — is a fact about the **circular manifold only**. It does not
govern the dynamics, and it cannot be read as "the binary always speeds up."

## Claim grading

- **Measured:** the $s_0=0.25$ four-seed relative spread is $39.4\%$ at
  $t=25=2.5h$ and $38.1\%$ at $t=65=6.5h$, against
  $1.5\times10^{-8}$ numerical noise. The same-radius phase spread grows to
  $0.14399$ at the enlarged common-radius endpoint. The turning point, speed
  maximum, radius crossing, and later radial reopening are also measured.
- **Explained kinematically:** the radial spread shrinkage is a catch-up and
  crossing in the one-dimensional $R$ projection. It reverses after the inward
  seed overtakes the outward seed and is not phase-space convergence.
- **Inferred from the measured horizon:** the declared four-seed family is
  persistent rather than a slow attraction. A mathematical proof over infinite
  time or every admissible prehistory is not claimed.
- **Not established:** that the same holds for the V5 or any larger object. More
  degrees of freedom and stronger internal coupling could supply an attractor the
  bare binary lacks. This is the obvious next question and it is open.

## Consequence for the T3 tier

The claims-triage ledger quarantined every temporal claim pending re-derivation
on the validated engine. This result says the quarantine's *remedy* is
insufficient: re-running §83 release, §60 expansion, or the collinear breather on
`src/eom` with a circular prehistory reproduces the same error at higher
precision. **Each would deliver the circular-seed answer, which this measurement
shows is one of a family, not the answer.**

Every T3 claim in the ledger is **seed-indexed**, and the seed has never been
justified in any of them. The re-run protocol for the entire tier must include a
collapse test, or its results are not about the object.

**The §86 run in flight has this problem.** It seeds a circular prehistory and
will report a growth rate for that seed. On the binary the seed dependence was
$39\%$. Whether the V5 behaves the same way is unknown — but the run cannot
answer it, because it has one seed.

## Provenance

The original $t=25$ trajectories were produced by the spiral instrument and
independently read during adjudication. The $t=65$ successor used the same
committed-EOM executable and unchanged settings: $h=10$, prehistory segment
$0.01$, evolution step $0.01$, minimum step $0.0025$, root tolerance $10^{-6}$,
and $K=0.90036722258974722$. The analyzer is
[the phase-collapse analyzer](../../../../../scripts/eom/analyze-antipodal-binary-phase-collapse.mjs).
All four long runs completed with zero rejected steps.

A current-tree rebuild made after the latest `CoupledEvolution.cpp` source
change independently reran the endpoint-matched circular and perturbed pair
through $t=60=6h$. Both rows completed $6001/6001$ accepted steps with zero
rejections and reproduced the $t=60$ endpoints above to printed precision.
The [current-tree reproduction adjudication](antipodal-binary-prehistory-extension-adjudication-2026-07-14.md)
records the build ordering, raw hashes, controlled-pair phase metric, and the
formal T3 prehistory-independence protocol. This is a same-method live-tree
reproduction, not an independent physics oracle.

The rail campaign is stopped. No row in this packet approaches $s=1$, and no
exponent or single-seed spiral formula is fitted or reported.
