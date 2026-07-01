# Braid Ideal Ideas

Status. Priority-only idea packet under [braid-ideal](braid-ideal.md). This is not a theorem row, not a retained branch certificate, and not reader-facing canon.

Claim level. Speculation and derivation-closure target. The central candidate is that a Noether braid may have a same-level branch in which all six architrinos operate at basically the same branch energy/action level, with comparable relative speed magnitude and comparable distance from the dynamic center. The branch would maintain that configuration unless destructively perturbed and would exchange action/energy through $h$-scale transactions.

Working label. `ideal_braid` is a working label only. It is deliberately speculative: the point is to test whether the six-body Noether braid has a simple common-level attractor that would look obvious in retrospect if it exists.

## Seed Scenario

The seed thought experiment uses an empty Euclidean void with six architrinos, three Positrinos and three Electrinos. Put the Positrinos at the positive coordinate sites

$$
P_x=(1,0,0),
\qquad
P_y=(0,1,0),
\qquad
P_z=(0,0,1),
$$

and the Electrinos at the negative coordinate sites

$$
E_x=(-1,0,0),
\qquad
E_y=(0,-1,0),
\qquad
E_z=(0,0,-1).
$$

The initial velocities are zero. The system has been held long enough that causal wakes are already past the opposite partners, so the start is not a no-history release. The active wake field already contains source history from all six architrinos.

## Initial Qualitative Response

The first reading of this setup is that it is not three independent axis binaries. It is two staggered same-polarity triangles: a positive triangle in the plane

$$
x+y+z=1,
$$

and a negative triangle in the plane

$$
x+y+z=-1.
$$

Because the wakes are already past the partners, there is immediate causal response. Opposite-polarity wakes attract; same-polarity wakes repel; the transverse components do not cancel pairwise. In a simple branch-sum intuition, the Positrino at $(1,0,0)$ is not only pulled toward $(-1,0,0)$; it also receives strong transverse pulls toward $(0,-1,0)$ and $(0,0,-1)$, plus same-polarity repulsion from $(0,1,0)$ and $(0,0,1)$. Its early acceleration therefore points roughly toward the negative diagonal direction rather than along the $x$-axis alone.

The early motion should therefore be read as:

1. the positive triangle centroid accelerates toward the negative triangle;
2. the negative triangle centroid accelerates toward the positive triangle;
3. each same-polarity triangle expands in its own plane;
4. the original coordinate-axis binary labels stop being dynamically privileged once the all-pairs wake field is active.

With perfect symmetry, the reduced state may stay in a symmetric channel: two expanding, mutually attracting triangles move toward a high-acceleration close pass. With small perturbations, the close pass may select a branch: temporary pair-lock, scattering, a three-binary cluster, or a breather-like attempt.

The important limitation is that this is not yet a stable Noether braid. It has the right primitive inventory, $3P+3E$, but not a certified nested hierarchy, same-level branch, shielding map, angular-momentum accommodation, returned-history closure, or stability basin.

## Held-Release Toy Run - 2026-07-01

Claim level. Priority-only exploratory run. The runner [held-release-causal-wake-toy.mjs](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) is not a production central-solver certificate. It is a JavaScript reference toy that integrates the six-point seed after a stationary held prehistory. It uses directed partner causal roots, the polarity sign convention from the master-equation kernel, branch weighting from the source-normal denominator, and a short-distance softening. It does not yet include same-source self-hits, Noether sea response, shielding, angular-momentum accommodation, or a conserved action ledger.

The default run used:

- seed: $P_x,P_y,P_z,E_x,E_y,E_z$ as above;
- initial velocity: zero;
- held prehistory: `holdTime=4`, long enough for every initial partner wake to cross the seed when $c_f=1$;
- release duration: `3`;
- step: `dt=0.002`;
- softening: `0.05`;
- causal branch weighting: enabled unless stated otherwise.

Summary:

| Run | Classification | Minimum common radius | Minimum same-polarity distance | Final trend |
| --- | --- | ---: | ---: | --- |
| $c_f=1$, causal weight | `same_polarity_close_pass_with_field_speed_crossing` | `0.821378` at `t=1.08` | `0.005671` at `t=1.80` | escape-like expansion, final radius `3.807538`, outward radial velocity `1.810707` |
| $c_f=1$, no causal weight | `same_polarity_close_pass_with_field_speed_crossing` | `0.945766` at `t=0.90` | `0.002688` at `t=2.82` | escape-like expansion, final radius `2.510119`, outward radial velocity `2.602884` |
| $c_f=6$, causal weight, duration `3` | `unclassified_transient` | `0.908728` at `t=1.10` | `1.310590` at `t=1.96` | still expanding, final radius `1.840237`, outward radial velocity `0.705047` |
| $c_f=6$, causal weight, duration `6`, `dt=0.004` | `expanding_escape_candidate` | `0.908903` at `t=1.08` | `1.310930` at `t=1.96` | escape-like expansion, final radius `4.192285`, outward radial velocity `0.824076` |

The useful positive result is that the symmetric channel is very clean. Across these runs the dynamic center remains numerically at zero, all six radii remain equal to numerical precision, and the opposite coordinate partners remain antipodal to numerical precision. The seed is therefore a strong reduced-symmetry probe.

The useful negative result is that the bare partner-wake release does not reveal the hoped-for stable ideal braid. At $c_f=1$, the run crosses field speed before the same-polarity near pass. At $c_f=6$, the run stays sub-field-speed over the tested window but still expands outward by `t=6`. In this toy, the seed behaves like a symmetric contraction-and-scatter channel rather than a self-maintaining same-level branch.

Next interpretation. This does not reject the ideal-braid hypothesis, because the known stabilizing candidates are missing from the toy: same-source self-hit, history-aware action accounting, angular-momentum-bearing initial conditions, shielding, and Noether sea response. It does narrow the next target: a serious run should promote the same seed into a retained-history solver row with self-hits enabled, then test whether any same-level invariant survives after the first near pass instead of only before it.

## Ideal Braid Hypothesis

The ideal-braid hypothesis generalizes the seed scenario from a coordinate release to a branch candidate:

$$
B_{\mathrm{ideal}}
=
\left(
\{x_i(t),q_i\}_{i=1}^{6},
C(t),
R_\ast,
v_\ast,
E_\ast,
\mathcal{L}_{\mathrm{root}},
\mathcal{L}_{\mathrm{wake}},
\mathcal{L}_{\mathrm{act}},
\mathcal{B}_{\mathrm{basin}}
\right),
$$

where $q_i\in\{+,-\}$, $C(t)$ is the dynamic center, $R_\ast$ is the common support scale, $v_\ast$ is the common relative speed magnitude, $E_\ast$ is the branch energy/action level, and the ledgers retain causal roots, wakes, action, and basin status.

The same-level constraints should begin as toleranced branch conditions:

$$
\left|\,|x_i(t)-C(t)|-R_\ast\,\right|\le\delta_R,
$$

$$
\left|\,|\dot{x}_i(t)-\dot{C}(t)|-v_\ast\,\right|\le\delta_v,
$$

$$
\left|E_i-E_\ast\right|\le\delta_E.
$$

These are not assumptions of circularity. They are same-level observables that can be tested for closed curves, quasi-periodic paths, rosette paths, finite-history loops, or chaotic-but-bounded attractor measures.

## Non-Circular Paths

Architrinos in the ideal braid need not follow circular orbits. A same-level branch can be a bounded path family whose radius and speed magnitudes remain level-like while direction, curvature, and causal-root incidence vary. Candidate path classes include:

- closed spherical or ellipsoidal choreographies;
- rosette or Lissajous-like six-body loops;
- quasi-periodic curves on a shell or ellipsoid;
- chaotic-but-bounded basin measures with stable support and stable action readouts;
- piecewise smooth causal-delay paths whose branch labels recur after a finite action transaction.

Circular orbits should remain only the first diagnostic projection, not the model.

## Translating Ellipsoid Generalization

The lane should be general enough to explore a translating ellipsoid. A moving ideal braid may not be a translated sphere. The branch support may deform into

$$
\frac{(x_\parallel-C_\parallel)^2}{R_\parallel^2}
+
\frac{\|x_\perp-C_\perp\|^2}{R_\perp^2}
=
1,
$$

with

$$
R_\parallel=R_\parallel(E_\ast,n,v_d),
\qquad
R_\perp=R_\perp(E_\ast,n,v_d),
\qquad
\xi=\frac{R_\parallel}{R_\perp}.
$$

Here $v_d=|\dot C|$ is drift speed and $n$ is the candidate action-level index. The ellipsoid is acceptable only if it is emitted by the retained branch state: causal roots, wake rows, action rows, momentum/angular-momentum rows, and stability rows must all use the same branch identity. A display ellipsoid without retained branch evidence is only a visualization.

## $h$-Scale Basin Pattern

The motivating possibility is that stable basin patterns exist at every $h$-scale action level. A disciplined version of that claim should use action first:

$$
\mathcal{A}_n
=
\oint_{\gamma_n}
\sum_i p_i\,dq_i
=
n h,
\qquad
n\in\mathbb{Z}_{>0}.
$$

The energy readout then depends on the retained branch frequency or transaction cadence:

$$
\Delta E_n
\approx
h\nu_n
$$

only after the branch supplies $\nu_n$. The raw claim "energy in units of $h$" should therefore be translated into an $h$-scale action transaction plus a declared energy-frequency readout. The useful search target is an atlas

$$
\mathcal{B}_{\mathrm{ideal}}
=
\{\mathcal{B}_n\}_{n\ge1},
$$

where each basin $\mathcal{B}_n$ has:

- one same-level branch or basin-support record;
- one action readout near $n h$;
- one branch frequency or transaction-cadence readout;
- one stability or return-margin row;
- one failure mode that separates basin loss from mere phase drift.

## What Would Count As Progress

Near-term progress does not require proving the ideal braid. It requires one concrete object that can be tested:

1. A six-body same-level branch definition with declared tolerances $\delta_R$, $\delta_v$, and $\delta_E$.
2. A retained-row target for the seed release: path history, causal roots, wake rows, and acceleration decomposition for the first close pass.
3. A basin-classification target: symmetric close-pass, pair-lock, three-binary cluster, breather-like bounded return, or escape.
4. A translating ellipsoid state variable set: $C(t)$, $R_\parallel$, $R_\perp$, $\xi$, $v_d$, $E_\ast$, $n$, and branch ledgers.
5. An $h$-basin scan target: for each $n$, identify whether a same-level basin persists, bifurcates, or destructively loses branch identity.

## Prior Discussion Status

Yes, this family has been discussed before, but not in this focused form.

- [Braid Rearchitecture Source](../braid-retained-branch-closure/braid-rearchitecture-source.md) starts from the direct question of whether all three binaries could share the same radius and $v=c_f$ with interleaved orbits. It also contains later speculative material about symmetric scrambles, ergodic basins, translating ellipsoids, and basin transitions. Treat that file as source material, not accepted doctrine.
- [Equal-Frequency Energy-Radius Candidate](../braid-angular-momentum-spin/equal-frequency-energy-radius-candidate.md) preserves a related but distinct candidate: common binary frequency with distinct effective lever arms and speed rows. It explicitly avoids flattening equal frequency into equal radius, equal speed, or equal energy.
- [Noether Braid Scaling and Packing Scaffold](../braid-dyadic-lock/noether-braid-scaling-and-packing.md) contains ideal rest-level pool scaling and packing material. That is useful downstream once the internal ideal-braid branch is better defined.

The new contribution here is to make `braid-ideal` a dedicated lane for the common-level six-body branch itself, including non-circular paths, translating ellipsoid support, and $h$-indexed basin patterns.

## Immediate Drill-Down Questions

1. Promote the six-point held-release into a central-solver seed with retained source histories already populated before release and same-source self-hits enabled.
2. Test whether the first same-polarity near pass preserves any symmetry-reduced same-level observable after self-hit/history stabilization is included, or whether it still splits into escape branches.
3. If a same-level observable persists, classify it as circular, non-circular but closed, quasi-periodic, or chaotic-but-bounded.
4. Test whether translation deforms the support as an ellipsoid while preserving same-level action readouts.
5. Search whether distinct basin families are indexed by $n h$, or whether same-level support exists only in isolated bands.
