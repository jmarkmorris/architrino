# Braid Ideal Brainstorming

Status. Priority-only brainstorming packet under [braid-ideal](priorities.md). This is not a theorem row, not a retained branch certificate, and not reader-facing canon.

Claim level. Speculation and derivation-closure target. The central candidate is that a Noether braid may have a same-level branch in which all six architrinos operate at basically the same branch energy/action level, with comparable relative speed magnitude and comparable distance from the dynamic center. The branch would maintain that configuration unless destructively perturbed and would exchange action/energy through $h$-scale transactions.

Working label. `ideal_braid` is a working label only. It is deliberately speculative: the point is to test whether the six-body Noether braid has a simple common-level attractor that would look obvious in retrospect if it exists.

## Contents (as of 2026-07-08)

Top-level sections of this unified braid brainstorming file. Other braid lanes' `brainstorming.md` files were merged in here during the braid priority sort (Phase 3, OP-3); each source lane now carries a stub pointing to this file.

- Strategy Memo Hypothesis Capture - 2026-07-06
- Seed Scenario
- Octahedral Decoration Classes
- Initial Qualitative Response
- Held-Release Toy Run - 2026-07-01
- Oblate Spheroid Reduced Equations
- Ideal Braid Hypothesis
- Non-Circular Paths
- Translating Ellipsoid Generalization
- $h$-Scale Basin Pattern
- What Would Count As Progress
- Prior Discussion Status
- Immediate Drill-Down Questions
- Dynamo Team Insights Cross-Feed
- Axis-Neutral Transport Channel Discussion Log
- Merged Lane Brainstorms (2026-07-08)

## Strategy Memo Hypothesis Capture - 2026-07-06

Claim level. Priority-only hypothesis capture from the attached read-only strategy memo. No retained branch, accepted evidence, score movement, or corpus promotion is claimed here. The durable packet is [Noether Braid Retained-Branch Strategy Memo Capture](noether-braid-retained-branch-strategy-memo-2026-07-06.md).

Live-tree correction. The run matrix and metadata emitters already carry transverse surface-speed and prehistory handles, but the held-release toy runner does not yet integrate the corresponding physics. [held-release-causal-wake-toy.mjs](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) still needs actual angular-momentum-bearing release and history-consistent moving-prehistory options before the `sh0-g0-vt025...vt099` rows become dynamical tests rather than metadata rows.

Implementation capture. [Angular-Momentum Held-Release Sweep Spec](angular-momentum-held-release-sweep-spec.md) records the axis-neutral rigid-rotation construction, the corrected causal-wake terminology at field speed $c_f$, the distinction between `kick-at-release` and history-consistent `moving-prehistory`, and the kinematic angular-momentum bookkeeping boundary.

Proofing capture. [Six-Point Equivariant Reduction Proof Audit](six-point-equivariant-reduction-proof-audit-2026-07-06.md) refines the route: the equivariant reduction lemma is the first proof-moving object, while the angular-momentum sweep is the capped executable witness. The frozen-octahedral mean-power value remains cross-chart motivation only and must not be imported as a held-release no-return hypothesis.

Priority consequence. The next proof-moving braid-ideal object is `six_point_symmetry_invariant_lemma`; the next diagnostic witness is `angular_momentum_held_release_sweep`. The sweep tests whether a six-point seed with transverse surface motion produces post-first-turn inward reduced-radius acceleration, a second turning point, or a bounded window. If no row returns, the failure strengthens the isolated Euclidean-void no-return theorem target and raises the computed `SH-0-sea` wake-sum route.

Hypothesis cards:

1. Retention may be an environment theorem: isolated `SH-0` in the Euclidean void may be non-retainable, while `SH-0-sea` supplies the missing local Noether sea response row.
2. Angular momentum may be a retained-branch coordinate rather than a decorative initial condition; a surface-speed threshold would connect this lane to angular-momentum/spin work.
3. The symmetric escape channel may be a reaction or dissociation corridor, not merely failed retention.
4. Retention may live in the self-hit fold layer, so controlled same-source delayed roots could be the missing return response.
5. The Noether sea return term may be a delayed wake echo rather than a static pressure constant, predicting a density- and phase-dependent retention window.
6. The six-point symmetry invariant lemma may reduce the isolated `SH-0` problem to a low-dimensional delay system suitable for a scoped no-return theorem.

## Seed Scenario

The seed thought experiment uses an empty Euclidean void with six architrinos, three Positrinos and three Electrinos. Put the Positrinos at the positive coordinate sites

$$
\epsilon_{+,x}=(1,0,0),
\qquad
\epsilon_{+,y}=(0,1,0),
\qquad
\epsilon_{+,z}=(0,0,1),
$$

and the Electrinos at the negative coordinate sites

$$
\epsilon_{-,x}=(-1,0,0),
\qquad
\epsilon_{-,y}=(0,-1,0),
\qquad
\epsilon_{-,z}=(0,0,-1).
$$

The initial velocities are zero. The system has been held long enough that causal wakes are already past the opposite partners, so the start is not a no-history release. The active wake field already contains source history from all six architrinos.

## Octahedral Decoration Classes

The six axial sites

$$
\{+x,-x,+y,-y,+z,-z\}
$$

are the six vertices of a regular octahedron. A balanced decoration with three Positrinos and three Electrinos has $20$ raw assignments, but only two classes under proper 3D rotations of the octahedron.

The distinguishing invariant is the number of same-polarity opposite axial pairs:

| Class | Representative | Opposite-pair pattern | Notes |
| --- | --- | --- | --- |
| `face-opposite` | $\epsilon_+:\{+x,+y,+z\}$, $\epsilon_-:\{-x,-y,-z\}$ | Every opposite axial pair contains one Positrino and one Electrino. | Positrinos occupy one triangular face; Electrinos occupy the opposite face. This is the original held-release seed. |
| `axial-paired` | $\epsilon_+:\{+x,-x,+y\}$, $\epsilon_-:\{-y,+z,-z\}$ | One opposite pair has two Positrinos, one has two Electrinos, and one has one of each. | This is the only other balanced class up to rotation. |

This is a finite-geometry fact, not a deep topology claim: it is the classification of balanced two-colorings of octahedron vertices under the octahedral rotation group. The `face-opposite` class is the one that carries the strongest tetrahedral face/opposite-face symmetry. The `axial-paired` class is a necessary control because it has the same inventory and sites but not the same symmetry group.

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

The important limitation is that this is not yet a stable Noether braid. It has the right primitive inventory, $3\epsilon_+ + 3\epsilon_-$, but not a certified nested hierarchy, same-level branch, shielding map, angular-momentum accommodation, returned-history closure, or stability basin.

## Held-Release Toy Run - 2026-07-01

Claim level. Priority-only exploratory run. The runner [held-release-causal-wake-toy.mjs](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) is not a production central-solver certificate. It is a JavaScript reference toy that integrates the six-point seed after a stationary held prehistory. It uses directed partner causal roots, the polarity sign convention from the master-equation kernel, branch weighting from the source-normal denominator, and a short-distance softening. It does not yet include same-source self-hits, Noether sea response, shielding, angular-momentum accommodation, or a conserved action ledger.

The default run used:

- seed: $\epsilon_{+,x},\epsilon_{+,y},\epsilon_{+,z},\epsilon_{-,x},\epsilon_{-,y},\epsilon_{-,z}$ as above;
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

### Symmetry Audit

A dense rerun with `sampleEvery=1` over all `1501` released frames verified that the common-sphere observation is not a sparse-sampling artifact. The maximum residuals in the saved trajectory were:

| Invariant residual | Maximum value |
| --- | ---: |
| Center norm | `5.612455273900489e-16` |
| Radius standard deviation | `9.06493303673679e-16` |
| Speed standard deviation | `6.2803698347351e-16` |
| Opposite-pair antipodal position error | `1.4130832128153976e-14` |
| Opposite-pair antipodal velocity error | `1.0311336425595837e-14` |
| Positive-triangle permutation position error | `1.021405182655144e-14` |
| Positive-triangle permutation velocity error | `1.0262809400873093e-14` |

This supports a precise analytic target. For a symmetric held history, the trajectory should remain on the invariant manifold

$$
P_x(t)=(a(t),b(t),b(t)),
\qquad
P_y(t)=(b(t),a(t),b(t)),
\qquad
P_z(t)=(b(t),b(t),a(t)),
$$

with

$$
E_x(t)=-P_x(t),
\qquad
E_y(t)=-P_y(t),
\qquad
E_z(t)=-P_z(t).
$$

On this manifold the dynamic center is zero, opposite coordinate partners are antipodal, and all six architrinos lie on the same instantaneous sphere:

$$
|P_x(t)|^2=|P_y(t)|^2=|P_z(t)|^2=|E_x(t)|^2=|E_y(t)|^2=|E_z(t)|^2=a(t)^2+2b(t)^2.
$$

This is not yet a fixed-radius or stable-braid claim. The radius changes in the toy run. The point is stronger and narrower: the all-pairs causal wake law appears equivariant under coordinate permutations and global charge-conjugate inversion, so the held seed should remain in this two-coordinate symmetry manifold as long as the solver sums the symmetric retained-root set.

Analytic proof target. Prove that any retained-history force law of the master-equation form, with all causal roots included and no asymmetric root pruning, maps the above manifold into accelerations of the same form:

$$
\ddot P_x(t)=(A(t),B(t),B(t)),
\qquad
\ddot P_y(t)=(B(t),A(t),B(t)),
\qquad
\ddot P_z(t)=(B(t),B(t),A(t)),
$$

with $\ddot E_i(t)=-\ddot P_i(t)$. Standard uniqueness for the declared delay equation would then make the common-sphere, center-zero, antipodal-pair invariant exact for the perfect seed.

### Euclidean Void Versus Noether Sea

Promoted to corpus 2026-07-06: the symmetry-versus-stability separation, the void escape result, and the return-response reframing now live in [Shell Braid](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md) under `Isolated Release and the Return-Response Question`, with the invariance half carried by the `Axis-Neutral Invariant Channel` section and proved in [Six-Point Symmetry Invariant Lemma Proof Packet](six-point-symmetry-invariant-lemma-proof-packet.md). The superseded discussion text is preserved in git history.

### Alternate Decoration Toy Run - 2026-07-01

The runner also tested the other balanced octahedral decoration class with the `axial-paired` preset:

$$
\epsilon_+:\{+x,-x,+y\},
\qquad
\epsilon_-:\{-y,+z,-z\}.
$$

This uses the same held prehistory, zero initial velocity, softening, and partner-wake force law as the original run. The only intended change is the rotation-class representative.

| Run | Classification | Minimum mean radius | Maximum radius spread | Closest same-polarity distance | Closest opposite-polarity distance | Final trend |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| $c_f=1$, causal weight | `same_polarity_close_pass_with_field_speed_crossing` | `0.765662` at `t=1.14` | `2.574311` at `t=3.00` | `0.121101` at `t=1.26` | `0.111360` at `t=1.26` | escape-like expansion, final radius mean `5.015410`, radius spread `2.574311`, outward radial velocity `2.421385` |
| $c_f=1$, no causal weight | `same_polarity_close_pass_with_field_speed_crossing` | `0.205063` at `t=1.76` | `0.346214` at `t=2.54` | `0.010404` at `t=1.76` | `0.030192` at `t=1.76` | post-close-pass outward drift, final radius mean `1.214720`, radius spread `0.285973`, outward radial velocity `0.245470` |
| $c_f=6$, causal weight, duration `3` | `same_polarity_close_pass_without_field_speed_crossing` | `0.694501` at `t=1.50` | `2.213518` at `t=3.00` | `0.066287` at `t=1.50` | `0.112384` at `t=1.54` | escape-like expansion, final radius mean `5.363081`, radius spread `2.213518`, outward radial velocity `3.705148` |
| $c_f=6$, causal weight, duration `6`, `dt=0.004` | `same_polarity_close_pass_without_field_speed_crossing` | `0.695118` at `t=1.48` | `5.372217` at `t=6.00` | `0.080992` at `t=1.48` | `0.139548` at `t=1.52` | escape-like expansion, final radius mean `15.967753`, radius spread `5.372217`, outward radial velocity `3.582438` |

The alternate class does not preserve the common-sphere invariant. The center remains numerically near zero, but the radius spread becomes large. In the default causal-weight run the radius standard deviation is already `2.574311` by `t=3`, compared with roundoff-scale radius spread for the `face-opposite` class. The closest same-polarity and opposite-polarity distances also occur in the same near-pass window rather than in the cleaner face/opposite-face contraction.

Interpretation. The common-sphere invariant is not a generic consequence of placing three Positrinos and three Electrinos on the six axial sites. It appears tied to the `face-opposite` decoration class and its coordinate-permutation plus charge-conjugate inversion symmetry. The `axial-paired` control is therefore useful negative evidence: the same inventory in the same Euclidean void can lose same-level support immediately when the octahedral coloring class changes.

### Executable Closure Diagnostic - 2026-07-01

The runner now emits `closureDiagnostics` with schema `braid-ideal-held-release-toy-closure-diagnostic.v1`. This is a priority-only same-record diagnostic, not an accepted retained branch certificate. It records the preset, symmetry residual thresholds, residual values, root-coverage status, field-speed status, bounded-return status, first closure blocker, and missing accepted fields before any score movement is allowed.

For the default `face-opposite` preset, the diagnostic status is `symmetry_channel_preserved_but_retained_branch_unauthorized`: center, common-radius, common-speed, and opposite-site residuals pass the toy thresholds, but the run still crosses field speed and expands rather than producing a bounded return. The first closure blocker is `field_speed_crossing_before_retained_solver_promotion`.

For the `axial-paired` preset, the diagnostic status is `same_level_support_lost_in_toy_control`: the radius, speed, and opposite-site residuals exceed the toy thresholds by ordinary scale rather than roundoff scale. The first closure blocker is `common_sphere_antipodal_symmetry_not_preserved`.

Both statuses keep `retainedBranchClaim=false`, `acceptedSameLevelBranchClaim=false`, and `scoreMovement=no_score_increase`. The next producer object remains `self_hit_held_release_solver_row`, with missing accepted fields for the central-solver retained-history row, same-source self-hit rows, same-record causal-root replay, retained wake-history rows, same-record action ledger, stability or return-margin row, and retained branch certificate.

### Wiggle Window Diagnostic - 2026-07-01

The runner also emits `trajectoryDiagnostics` with schema `braid-ideal-held-release-wiggle-window-diagnostic.v1`. This is a priority-only same-record diagnostic for the observed radial wiggle, not an accepted retained branch certificate. It records full-window extrema, full-window symmetry residual maxima, radial turn rows, the first compression-to-expansion turn, whether a later expansion-to-compression return turn appears, and the first fail-closed wiggle blocker.

Validation-speed reruns with `dt=0.004`, `duration=3`, and `sampleEvery=25` produced:

| Run | Wiggle-window status | Symmetry window | Radial turn rows | First wiggle blocker |
| --- | --- | --- | --- | --- |
| $c_f=1$, `face-opposite`, causal weight | `single_compression_escape_with_field_speed_crossing` | pass; max radius std `9.93013661298909e-16` | one compression-to-expansion turn at `t=1.08`, radius `0.821722`; no return turn | `field_speed_crossing_before_retained_solver_promotion` |
| $c_f=6$, `face-opposite`, causal weight | `single_compression_then_escape` | pass; max radius std `3.14018491736755e-16` | one compression-to-expansion turn at `t=1.096`, radius `0.908822`; no return turn | `post_first_pass_return_turn_absent` |
| $c_f=1$, `axial-paired`, causal weight | `same_level_window_lost` | fail; max radius std `1.58481637102546`, max opposite-site residual `5.30455114148257` | one compression-to-expansion turn at `t=1.136`, but without same-level support | `same_level_window_symmetry_lost` |

Interpretation. The `face-opposite` seed has a real, extremely clean same-level symmetry window in the toy, but the wiggle currently looks like a single compression and release rather than a bounded breather. Raising the field speed removes the immediate field-speed crossing blocker over the tested window, but it does not produce the missing return turn. The `axial-paired` control can show ordinary radial turning, but it is not the same object because the common-sphere and antipodal-pair window fails first.

Fail-closed consequence. The diagnostic keeps `retainedBranchClaim=false`, `acceptedSameLevelBranchClaim=false`, and `scoreMovement=no_score_increase`. The next producer object remains `self_hit_held_release_solver_row`, because only a retained-history solver row with same-source self-hit rows, same-record causal-root replay, retained wake-history rows, action ledger rows, and a stability or return-margin row can distinguish a real Noether braid basin from a symmetric Euclidean-void scatter.

### Same-Source Self-Hit Probe - 2026-07-01

The runner now accepts `--include-self-hits`, which includes delayed same-source causal roots as a priority-only toy probe. The probe filters self-hit roots to strictly delayed rows using `selfHitMinDelay`, defaulting to the integration step `dt`. This is still not a central-solver retained-history row and does not authorize retained branch evidence.

Validation-speed reruns with `dt=0.004`, `duration=3`, and `sampleEvery=25` produced:

| Run | Self-hit rows | Wiggle status | First blocker | Interpretation |
| --- | ---: | --- | --- | --- |
| $c_f=6$, `face-opposite`, causal weight, self-hit probe | `0` delayed roots; `4500` missing directed self-hit rows | `same_source_self_hit_rows_absent_in_toy_probe` | `same_source_self_hit_rows_absent_in_toy_probe` | The sub-field-speed symmetric release preserves the clean same-level window, but the strict delayed self-hit root condition never populates. |
| $c_f=1$, `face-opposite`, causal weight, self-hit probe | `714` delayed roots; `3786` missing directed self-hit rows | `causal_root_coverage_lost` | `causal_root_coverage_lost_in_toy_window` | Delayed self roots appear only in the super-field-speed blow-up regime: first field-speed crossing at `t=0.732`, first missing partner roots at `t=1.188`, final radius `23.104551`, final speed `10.307475`. |

Interpretation. The same-source probe makes the next blocker sharper. In the safe high-field window, the toy has no delayed self-hit rows to test. In the low-field window, same-source roots appear, but only after the run has already crossed field speed and then loses causal-root coverage. That means the JavaScript toy is not enough to decide whether same-source self-hits can stabilize the ideal braid; the next evidence-moving object remains a central-solver retained-history row with solver-owned same-source self-hit rows, causal-root replay, retained wake-history rows, action ledger rows, and a stability or return-margin row.

Fail-closed consequence. The self-hit probe keeps `retainedBranchClaim=false`, `acceptedSameLevelBranchClaim=false`, and `scoreMovement=no_score_increase`. The useful result is not a score increase; it is a narrower producer boundary for `self_hit_held_release_solver_row`.

### Reduced Radius Equation Diagnostic - 2026-07-01

The runner now emits `reducedRadiusDiagnostics` with schema `braid-ideal-reduced-radius-equation-diagnostic.v1`. This diagnostic projects the same-level window to the reduced variables

$$
R(t)=\operatorname{mean}_i |x_i(t)-C(t)|,
\qquad
\dot R(t)=\operatorname{mean}_i
\frac{\langle x_i(t)-C(t),\dot x_i(t)-\dot C(t)\rangle}{|x_i(t)-C(t)|},
$$

and the finite-difference toy row

$$
\ddot R(t)\approx \frac{\Delta \dot R}{\Delta t}.
$$

It is priority-only. It does not supply a retained branch certificate, conserved action ledger, or accepted Noether sea response row. Its purpose is to ask a narrower question after the first compression-to-expansion turn: does the toy ever produce an inward radial acceleration row that could be the first sign of a return force?

Validation-speed reruns with `dt=0.004`, `duration=3`, and `sampleEvery=25` produced:

| Run | Reduced-radius status | First reduced-radius blocker | Post-turn acceleration rows | First-turn acceleration |
| --- | --- | --- | --- | ---: |
| $c_f=1$, `face-opposite`, causal weight | `field_speed_crossing_before_reduced_radius_equation` | `field_speed_crossing_before_reduced_radius_equation` | inward rows exist later, but only after field-speed crossing | `2.54130997918223` |
| $c_f=6$, `face-opposite`, causal weight | `post_turn_inward_radial_acceleration_absent` | `post_turn_inward_radial_acceleration_absent` | `476` outward rows, `0` inward rows, `0` deadband rows | `0.700009024758892` |
| $c_f=6$, `face-opposite`, causal weight, self-hit probe | `same_source_self_hit_rows_absent_in_toy_probe` | `same_source_self_hit_rows_absent_in_toy_probe` | `476` outward rows, `0` inward rows, `0` deadband rows; self-hit rows absent first | `0.700009024758892` |

For the clean high-field face/opposite-face run, the reduced-radius row at the first turn is still outward accelerating:

$$
t=1.096,\qquad
R=0.908821918990776,\qquad
\dot R=0.00218799946306812,\qquad
\ddot R\approx0.700009024758892.
$$

After that turn, every one of the `476` post-turn finite-difference rows has positive $\ddot R$ above the diagnostic epsilon. The weakest outward acceleration row is still positive:

$$
t=3,\qquad
R=1.84069025636478,\qquad
\dot R=0.704865214649074,\qquad
\ddot R\approx0.0934863484737535.
$$

Interpretation. The clean high-field wiggle is not merely missing a visible return turn; within this toy window it has no inward reduced-radius acceleration after the first expansion begins. That makes the next stabilizing requirement sharper. A serious same-level basin needs a solver-owned term that changes the reduced-radius equation after the first near pass: same-source self-hit rows, retained wake-energy response, shielding, angular-momentum accommodation, or a Noether sea response row must provide an inward acceleration row, a second turn, a stable fixed radius, or a bounded limit cycle on the same retained record.

Fail-closed consequence. The reduced-radius diagnostic keeps `retainedBranchClaim=false`, `acceptedSameLevelBranchClaim=false`, and `scoreMovement=no_score_increase`. It narrows the next producer boundary for `self_hit_held_release_solver_row`; it does not authorize branch evidence.

### Wiggle Return-Response Target - 2026-07-02

The producer [wiggle-return-response-target.mjs](../../../scripts/braid-ideal/wiggle-return-response-target.mjs) now turns the reduced-radius wiggle diagnostic into a reusable return-response target. It consumes the priority-only toy result, extracts the post-first-pass radial acceleration rows, and emits schema `braid_ideal_wiggle_return_response_target.v0`.

For the clean high-field face/opposite-face run, the target records that the first compression-to-expansion turn exists, the same-level symmetry window remains intact, field-speed and causal-root checks pass, and every post-turn row still accelerates outward. The target therefore computes the minimum inward response needed to make at least one post-first-pass row satisfy

$$
\ddot R_{\mathrm{toy}}(t)+a_R^{\mathrm{response}}(t)<0.
$$

With the current validation-speed diagnostic, the weakest outward post-turn row has

$$
\ddot R_{\mathrm{toy}}\approx0.0934863484737535,
$$

so the return-response target requires an inward radial response at least slightly larger than that diagnostic floor before a return-turn or bounded basin can be tested.

The target ranks five non-authorizing response routes:

1. `central_solver_retained_history_return_response`;
2. `same_record_wake_ledger_return_response`;
3. `same_ledger_action_measure_return_response`;
4. `noether_sea_pressure_tension_return_response`;
5. `angular_momentum_shielding_return_response`.

The Noether sea route is now explicit rather than implicit. It first blocks at `theta_sea_rho_NS` and requires a retained pressure-row, pressure/tension/relaxation rows, and same-record provider provenance before it can count as evidence. The central retained-history route remains top ranked because it is the common source object needed to bind path history, same-source self-hit rows, causal-root replay, retained wake rows, action rows, and provider provenance on one retained record.

Fail-closed consequence. The target keeps `retainedBranchClaim=false`, `acceptedSameLevelBranchClaim=false`, `accepted_wiggle_return_response=false`, `noether_sea_response=false`, and `scoreMovement=no_score_increase`. Its first retained-evidence blocker is `central_solver_retained_history_provider_object`, with first missing field `central_solver_retained_history_row.provider_provenance.provider_object_ref`; the parent two-speed retained-root blocker remains `oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref`.

### Group-Zero Sphere Baseline - 2026-07-01

Claim level. Priority-only solver-toy baseline. This run uses the current causal-wake held-release runner, not a production central-solver retained-history certificate. It models both balanced octahedral decoration classes on the unit sphere with static dynamic center

$$
C(t)=0,
\qquad
\mathbf V_g=\dot C=0,
$$

zero initial internal velocity, held prehistory `holdTime=4`, causal weighting enabled, no same-source self-hit probe, and softening `0.05`.

The first pass used normalized field speed $c_f=1$:

| Preset | Closure status | Symmetry / sphere residual | Field-speed status | First radial turn | Final trend |
| --- | --- | --- | --- | --- | --- |
| `face-opposite` | `symmetry_channel_preserved_but_retained_branch_unauthorized` | max radius std `9.06493303673679e-16`; max center norm `5.61245527390049e-16` | crosses at `t=0.73`; max speed ratio `2.26995489863071` | radius minimum `0.821378076947656` at `t=1.08` | final radius `3.80753752640038`, outward radial velocity `1.8107072906048` |
| `axial-paired` | `same_level_support_lost_in_toy_control` | max radius std `2.57431123617553`; max center norm `3.01980662879304e-14` | crosses at `t=0.828`; max speed ratio `11.1258083700618`; `212` missing roots | radius minimum `0.765579073605879` at `t=1.134` | final radius `5.01540957833199`, radius std `2.57431123617553`, outward radial velocity `2.42138525542922` |

Normalization correction. A previous sub-field control was reported by changing $c_f$ to `6`. That should be treated as a legacy diagnostic only. The canonical convention is to keep

$$
c_f=1
$$

and change the dimensionless coupling, time step, and run window instead. Under the rescaling $s=c_f t$, the old diagnostic with $c_f=6$, $\kappa=1$, `duration=3`, and `dt=0.002` is equivalent to $c_f=1$, $\kappa=1/36$, `duration=18`, and `dt=0.012`, with the same initial sphere and group velocity zero.

The canonical sub-field control is therefore:

| Preset | Closure status | Symmetry / sphere residual | Field-speed status | First radial turn | Final trend |
| --- | --- | --- | --- | --- | --- |
| `face-opposite` | `symmetry_channel_preserved_but_retained_branch_unauthorized` | max radius std `7.58426711504582e-16`; max center norm `2.3453792142255e-16` | no crossing; max speed ratio `0.198457115556254` | radius minimum `0.908722875419364` at `t=6.576` | final radius `1.8402369807427`, outward radial velocity `0.117507767570422`; blocker `post_turn_inward_radial_acceleration_absent` |
| `axial-paired` | `same_level_support_lost_in_toy_control` | max radius std `2.21351825574007`; max center norm `2.368475785867e-15` | no crossing; max speed ratio `0.977185900324049` | radius minimum `0.694301806449306` at `t=9.06` | final radius `5.36308131368005`, radius std `2.21351825574007`, outward radial velocity `0.617524661732088` |

Interpretation. At group velocity zero, the distinction between the two sphere colorings is not a field-speed artifact. The `face-opposite` configuration preserves center-zero, common-sphere, common-speed, and antipodal-pair support to roundoff at both the strong-coupling and weak-coupling $c_f=1$ runs. It still does not close as a retained branch because the reduced radius expands after the first compression. The `axial-paired` configuration loses common-sphere support in both cases. That makes `face-opposite` the correct first target for the analytic invariant-manifold proof and for any later Noether sea pressure or self-hit stabilization test.

Legacy high-field note. A longer `face-opposite` group-zero diagnostic was previously run with $c_f=6$. Do not cite it as a changed-universal-constant result. If this long-window case matters, rerun it in canonical units as $c_f=1$ with the coupling, time step, and duration rescaled. The only retained lesson from the legacy run is qualitative: extending the Euclidean-void toy did not reveal a return turn, so the next useful object remains a retained-history/self-hit or Noether sea support row rather than more time in the same partner-wake toy.

The corresponding legacy self-hit probe still had no delayed self-hit roots. This makes the group-zero blocker sharper: repeatedly extending the Euclidean-void toy is less useful than adding a solver-owned retained-history row, a same-source self-hit row source, or a separately labeled Noether sea support-term diagnostic.

### Collapse-Stop-Reversion Mechanism Map - 2026-07-01

Claim level. Priority-only mechanism map and reduced-equation target. This section answers the three live questions: what starts the collapse, what stops the collapse, and what would make the collapse/release cycle reverse into a retained Noether braid basin. It does not certify a stable branch.

On the common-sphere invariant manifold, write the center-frame vectors as

$$
\mathbf y_i(t)=\mathbf x_i(t)-C(t),
\qquad
R_i(t)=|\mathbf y_i(t)|,
\qquad
\hat{\mathbf e}_i(t)=\frac{\mathbf y_i(t)}{R_i(t)}.
$$

For any one architrino the exact radial kinematic identity is

$$
\dot R_i=\hat{\mathbf e}_i\cdot \dot{\mathbf y}_i,
$$

and

$$
\ddot R_i
=
\hat{\mathbf e}_i\cdot \ddot{\mathbf y}_i
+
\frac{|\dot{\mathbf y}_i|^2-\dot R_i^2}{R_i}.
$$

The second term is the curvature or transverse-speed contribution. It is always outward in the reduced radius equation. On the exact `face-opposite` channel all six $R_i$ are equal, so the branch can be projected to a common radius $R(t)$ and an averaged equation

$$
\ddot R
=
F_{\mathrm{rad}}^{\mathrm{wake}}
+
\frac{\langle v_\perp^2\rangle}{R}
+
F_{\mathrm{rad}}^{\mathrm{self}}
+
F_{\mathrm{rad}}^{\mathrm{wake\,ledger}}
+
F_{\mathrm{rad}}^{\mathrm{shield}}
+
F_{\mathrm{rad}}^{\mathrm{sea}}.
$$

The current JavaScript toy includes only the bare partner-wake part and the kinematic curvature term. The other terms are placeholders for solver-owned retained-history rows, not accepted mechanisms.

Collapse begins because the held wake field supplies a nonzero inward radial acceleration at release even though the initial velocity is zero. In the stripped instantaneous inverse-square picture at the unit-sphere seed, the Positrino at $P_x=(1,0,0)$ receives the radial components

$$
E_x:\ -\frac14,
\qquad
E_y,E_z:\ -\frac{1}{2\sqrt2}\ \text{each},
\qquad
P_y,P_z:\ +\frac{1}{2\sqrt2}\ \text{each}.
$$

The transverse radial pieces cancel, leaving the direct opposite-axis partner with a net inward radial component

$$
F_{\mathrm{rad}}(0)\sim -\frac14
$$

before causal weighting, softening, and source-normal factors are applied. The full held-release toy changes the magnitude but keeps the same qualitative start: in the canonical weak-coupling $c_f=1$ row, $R$ has already decreased by `t=0.12` and $\dot R<0$.

Collapse stops when the radial velocity reaches zero while the radial acceleration has become outward:

$$
\dot R(t_\min)=0,
\qquad
\ddot R(t_\min)>0.
$$

In the canonical weak-coupling $c_f=1$ `face-opposite` row, the first compression-to-expansion turn is

$$
t_\min=6.576,
\qquad
R(t_\min)=0.908722875419364,
\qquad
\dot R(t_\min)=0.0000988254525907554,
$$

with reduced radial acceleration

$$
\ddot R(t_\min)\approx0.0194858855242135.
$$

The candidate causes of that stop are not a fixed sphere and not a proved pressure term. In the toy they are: accumulated transverse speed through $\langle v_\perp^2\rangle/R$, the changed radial projection of the delayed wake roots, source-normal weighting, and softening near the close-pass regime. Same-polarity repulsion becomes important in the later scatter, but the first turn appears before a certified same-polarity retained branch event.

Collapse reversion has two meanings that must be kept separate.

First, the toy shows a one-way reversion from inward collapse to outward expansion. After the first turn in the canonical weak-coupling row, the reduced-radius diagnostic reports `952` outward acceleration rows, `0` inward acceleration rows, and no later return turn. That is not a bounded Noether braid. It is a symmetric contraction-and-scatter channel.

Second, a stable Noether braid would require the outward expansion itself to revert. That means a later interval must satisfy

$$
\dot R>0,
\qquad
\ddot R<0,
$$

long enough to produce an expansion-to-compression turn, or else a stable fixed support radius

$$
\ddot R(R_\ast,\dot R=0)=0,
\qquad
\partial_R\ddot R\big|_{R_\ast}<0
$$

with the retained history and action ledger returning to the same branch identity. The current toy has no such row.

The Noether braid mapping is therefore:

| Behavior | Euclidean-void toy explanation | Noether braid closure target |
| --- | --- | --- |
| Collapse begins | Held partner wakes give a net inward radial projection at zero initial velocity. | Retained-root attraction that starts a same-level compression without moving the dynamic center. |
| Collapse stops | Curvature, delayed-root geometry, weighting, and short-range regularization overcome the inward radial projection at the first minimum. | A short-range, angular-momentum, shielding, self-hit, or Noether sea response term prevents destructive collapse while preserving root-ledger identity. |
| Collapse reverts outward | The first radial turn converts inward motion into outward scatter. | The first half-cycle of a possible breather or action transaction. |
| Expansion reverts inward | Not present in the current toy. | Required evidence for a bounded basin, stable support radius, or retained-history limit cycle. |

This may be the exact behavioral template for the Noether braid only if the missing retained-history terms supply the second reversion without breaking the `face-opposite` invariant support. The next analytic object is therefore the sign sequence of the reduced-radius equation:

$$
\ddot R<0
\quad\rightarrow\quad
\dot R=0,\ \ddot R>0
\quad\rightarrow\quad
\ddot R<0
\quad\rightarrow\quad
\text{bounded return or stable }R_\ast.
$$

The next solver object should report that sign sequence on one retained record, with causal roots, same-source self-hit rows, wake-history rows, action rows, angular-momentum rows, and Noether sea response rows all attached to the same branch identity.

### Matter/Antimatter Chirality Bridge - 2026-07-01

Claim level. Priority-only lemma target. This is not a matter/antimatter discovery claim, not a particle-sector promotion, and not a retained branch certificate. It records a possible bridge between the `face-opposite` invariant channel and the existing matter/antimatter braid-chirality rule in [Color Charge SU(3)](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md#braid-orientation-matter-vs-antimatter), [Quantum Number Mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md#the-assembly-architecture), and the anti-braid mirror bookkeeping in [Quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md#anti-braid-mirror-bookkeeping-conjectural-reverse-engineered-candidate).

Candidate support statement. The group-zero diagnostics suggest that the `face-opposite` six-site support is the only balanced octahedral decoration class currently seen to preserve the center-zero, common-sphere, common-speed, antipodal-pair channel:

$$
\mathcal S_{\mathrm{fo}}
=
\left\{
\epsilon_+:\{+x,+y,+z\},
\quad
\epsilon_-:\{-x,-y,-z\}
\right\}.
$$

At the support-display level, one useful finite-geometry control reverses the displayed polarity signs while preserving the same opposite-face geometry:

$$
\mathcal S_{\mathrm{fo}}^{\mathrm{pol}}
=
\left\{
\epsilon_-:\{+x,+y,+z\},
\quad
\epsilon_+:\{-x,-y,-z\}
\right\}.
$$

Primitive-polarity convention. Positrino/Electrino polarity is charge and interaction bookkeeping; it is not the matter/antimatter distinction. A polarity-inverted support display in this packet means only that the visible Positrino/Electrino labels have been inverted for a support-control or charged-sector ledger operation. It must not be read as the matter/antimatter operation by itself, and it must not be read as erasing an Electrino identity and installing a Positrino identity, or the reverse, at the same site. Architrino identity is provenance-bearing: it includes the retained path history, causal-root rows, wake-history rows, action rows, momentum/angular-momentum rows, and stability rows that still belong to that branch.

$$
q_i\mapsto -q_i
\quad\text{only as the polarity-ledger part of a declared charged-sector conjugation.}
$$

The local notation can therefore display a support-level polarity mirror, but a physical matter/antimatter mirror requires a retained solver row that carries the pro/anti braid orientation and identity-bearing history through the conjugation. Charged branches may also require the sector-visible polarity ledger to map to the opposite charge row, but the displayed Positrino/Electrino inventory is not the matter/antimatter axis. A partial rearrangement may be a different balanced inventory, but it is not the anti-branch of the starting branch by itself. Likewise, a label-only replacement without the wake-history provenance is not a branch identity statement.

Because both displayed support rows retain one Positrino and one Electrino on every axis, the polarity-inverted support keeps the same opposite-pair pattern and should inherit the same common-sphere residual tests under any force law that is equivariant under coordinate permutations and polarity-ledger inversion. This is only a local support-control fact. The matter/antimatter identity claim belongs to ordered braid chirality plus retained path-history and wake-history record, not to a site-label table by itself.

Candidate chirality statement. The existing fermion mapping does not identify matter/antimatter with the raw choice of which face carries Positrinos. It identifies matter/antimatter with pro/anti braid orientation, recorded as ordered braid chirality. Therefore the disciplined target is a chiral lift of the same support class:

$$
\mathcal B_{\mathrm{matter}}
\sim
\left(\mathcal S,\chi_c=+1,\mathcal H\right),
\qquad
\mathcal B_{\mathrm{antimatter}}
\sim
\left(\mathcal S',\chi_c=-1,\overline{\mathcal H}\right),
$$

where $\chi_c$ abbreviates the pro/anti ordered-braid chirality record and $\mathcal H$ abbreviates the retained history record only after a retained branch supplies the required phase, winding, causal-root, wake, action, and stability rows. The support section $\mathcal S'$ is not fixed by Positrino/Electrino naming. It may be the same support, a polarity-inverted charged-sector ledger, an `axial-paired` section, or another projection only if the retained solver supplies the same-record history. The sign convention is schematic; the proof burden is to recover the HML/HLM orientation distinction from the same retained branch record that carries the six-site support.

Support-level exclusion. The `axial-paired` control is not the simple support-level polarity mirror of the static `face-opposite` seed:

$$
\mathcal S_{\mathrm{ap}}
=
\left\{
\epsilon_+:\{+x,-x,+y\},
\quad
\epsilon_-:\{-y,+z,-z\}
\right\}.
$$

It changes the opposite-pair pattern by introducing one opposite pair with two Positrinos and one opposite pair with two Electrinos. That is a partial redistribution of the balanced inventory, not polarity inversion of the static `face-opposite` support table. The current toy evidence also shows `same_level_support_lost_in_toy_control` for this class. Therefore `axial-paired` is excluded only as a label-table or support-table polarity mirror of the `face-opposite` seed.

Braid-level open question. This does not exclude `axial-paired` as an antimatter-related retained braid candidate. The untested question is whether the matter/antimatter operation reverses the ordered orbit of the planar binary and then lifts through oblate and spherical support sections in a way that can display the `axial-paired` class without losing the identity-bearing history. In a planar binary projection, the candidate orientation reversal is schematically

$$
\theta(t)\mapsto -\theta(t),
\qquad
\omega=\dot\theta\mapsto -\omega,
\qquad
\mathbf L_{\mathrm{int}}\mapsto -\mathbf L_{\mathrm{int}},
$$

together with conjugate retained path-history, causal-root, wake-history, action, and stability rows. That is an orbit-order and angular-momentum reversal, not a site relabel. In the oblate-spheroid ansatz, the corresponding test should act on the branch phase and body rotation variables, for example by tracking the sign reversal of $\dot\psi$ and the relevant component of $\Omega$ while preserving same-record causal-root and wake-history provenance. In the spherical limit, a frozen six-site support table can test common-sphere symmetry, but it cannot by itself decide the braid chirality because the phase-order history has been suppressed.

First proof route. Prove the `face-opposite` invariant-manifold lemma first. Then add the ordered chirality variable $\chi_c$ only after the retained branch supplies phase order, winding counts, causal-root ledgers, wake rows, action rows, angular-momentum rows, and stability rows. The proof must show that pro/anti orientation reversal preserves the identity-bearing retained history, mass-facing ledger, and support-facing ledger while mapping any charged-sector exposed polarity projection to its conjugate row, consistent with the charge-conjugate mass-equality constraint in [Particle Masses](../../../content/markdown/aaa/assemblies/particle-masses.md#charge-conjugate-mass-equality). A separate retained-history test must then decide whether `axial-paired` is rejected completely, appears only as a transient section, or becomes the support signature of the anti-branch under orbit reversal.

Failure modes. This bridge fails if the retained solver shows that the `face-opposite` support does not survive with the required root and action ledgers, if the attempted charged-sector polarity conjugation cannot preserve the identity-bearing wake-history record, if the chirality record cannot be tied to the same branch identity as the support geometry, or if no orbit-reversal lift can map the planar, oblate, and spherical diagnostics into one retained anti-branch record. Until then, the safe claim is only that `face-opposite` is the first admissible static support candidate for the matter/antimatter chirality rule, while `axial-paired` is excluded only as a simple support-table polarity mirror and remains open as a braid-level orbit-reversal candidate.

Target extraction. The executable version of this bridge is now isolated in [Matter/Antimatter Chirality Retained-History Target](matter-antimatter-chirality-retained-history-target.md). That target keeps the bridge priority-only, but makes the paired retained-history rows, residual vector, support-projection rules, and fail-closed conditions explicit so the next solver work tests branch chirality instead of static support decoration.

### Diagonal Group-Velocity Baseline - 2026-07-01

Claim level. Priority-only translating toy baseline. This run is not a retained branch certificate and does not authorize a moving retained branch certificate.

The runner now accepts `--group-velocity <x,y,z>`. The held prehistory is stationary in the moving center frame, field-speed and source-normal checks remain in the Noether sea frame, and same-level radial velocity is measured relative to the dynamic center.

A first small diagonal drift used

$$
\mathbf V_g=(1/60,1/60,1/60),
\qquad
|\mathbf V_g|=0.0288675134594813,
$$

with $c_f=1$, coupling `1/36`, `duration=18`, `dt=0.024`, and the `face-opposite` preset. Root coverage and field-speed checks pass, and the translating-center residual is reported separately rather than used as an origin-zero failure. The run still loses the same-level sphere support:

| Status | Center check | Max radius std | Max center-frame speed std | Max antipodal-pair residual | Final radius | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `same_level_support_lost_in_translating_toy_window` | pass; center drift residual `0.189794630312626` | `0.0252007463148382` | `0.00415887827340788` | `0.0817314527765413` | `1.83979867545719` | `common_sphere_antipodal_symmetry_not_preserved` |

Interpretation. The group-zero spherical invariant does not automatically survive even a small diagonal drift in this toy. That makes the translating branch question an oblate-spheroid or retained-history residual problem, not a spherical face/opposite-face promotion. The next mathematical object should be either a translating oblate-spheroid residual row or the central-solver retained-history seed with same-record causal-root replay and same-source self-hit rows.

## Oblate Spheroid Reduced Equations

Claim level. Analytical candidate packet. This section does not claim a stable branch. It defines a reduced equation family for three antipodal pairs on a translating oblate spheroid and identifies the residuals a solver or proof must close.

### Variables

Let $C(t)$ be the dynamic center and

$$
\mathbf V_g(t)=\dot C(t),
\qquad
u(t)=|\mathbf V_g(t)|
$$

be the group velocity through the Noether sea frame. The equations should allow

$$
0\le u < \infty,
$$

including $u<c_f$, $u\approx c_f$, and $u>c_f$. For canonical reporting set $c_f=1$ and vary dimensionless group velocity $u/c_f$, coupling, radius scale, and time window rather than changing the universal constant. No Lorentz-like deformation law is assumed at this stage.

Let $Q(t)\in SO(3)$ be a body-frame orientation. Its pole is

$$
\mathbf n(t)=Q(t)\mathbf e_3,
$$

with body angular velocity $\Omega(t)$ defined by

$$
\dot Q(t)\mathbf y = \Omega(t)\times Q(t)\mathbf y
$$

for any body-frame vector $\mathbf y$. Let the oblate support have equatorial radius $R_\perp(t)$, polar radius $R_\parallel(t)$, and flattening ratio

$$
\chi(t)=\frac{R_\parallel(t)}{R_\perp(t)},
\qquad
0<\chi(t)\le 1.
$$

The spheroid surface in body coordinates is

$$
\Phi(\mathbf y;R_\perp,R_\parallel)
=
\frac{y_1^2+y_2^2}{R_\perp^2}
+
\frac{y_3^2}{R_\parallel^2}
-1=0.
$$

### Three-Pair Spheroid Ansatz

Use one shared phase $\psi(t)$ and three offsets

$$
\alpha_k=\frac{2\pi k}{3},
\qquad
k=0,1,2.
$$

For the simplest latitude-ring ansatz, choose a shared spheroid height coordinate $\zeta(t)\in[-1,1]$ and define

$$
\mathbf s_k(t)
=
R_\perp(t)\sqrt{1-\zeta(t)^2}
\begin{pmatrix}
\cos(\psi(t)+\alpha_k)\\
\sin(\psi(t)+\alpha_k)\\
0
\end{pmatrix}
+
R_\parallel(t)\zeta(t)
\begin{pmatrix}
0\\
0\\
1
\end{pmatrix}.
$$

Then the three Positrinos and three Electrinos are

$$
\mathbf x_{+,k}(t)=C(t)+Q(t)\mathbf s_k(t),
\qquad
\mathbf x_{-,k}(t)=C(t)-Q(t)\mathbf s_k(t).
$$

This automatically preserves a center-zero internal configuration and antipodal pairs in the center frame. It also places all six architrinos on the same instantaneous oblate spheroid. The original face-opposite spherical seed is the special case $R_\perp=R_\parallel$, $\zeta=1/\sqrt3$, and a body-frame rotation that maps the three phase offsets to the coordinate-axis face.

This ansatz is deliberately not restricted to circular orbits. Non-circular motion enters through $\zeta(t)$, $R_\perp(t)$, $R_\parallel(t)$, and $Q(t)$. A more general closed curve on the spheroid can replace the latitude-ring ansatz by allowing $\zeta=\zeta(\psi)$ and a nonuniform phase speed $\dot\psi(t)$.

### Velocity And Frequency Rows

The receiver velocity is

$$
\dot{\mathbf x}_{+,k}
=
\mathbf V_g
+
\Omega\times Q\mathbf s_k
+
Q\dot{\mathbf s}_k,
$$

and

$$
\dot{\mathbf x}_{-,k}
=
\mathbf V_g
-
\Omega\times Q\mathbf s_k
-
Q\dot{\mathbf s}_k.
$$

When $R_\perp$, $R_\parallel$, $\zeta$, and $Q$ are instantaneously fixed, the orbital speed in the center frame is

$$
v_{\mathrm{orb}}
=
R_\perp\sqrt{1-\zeta^2}\,|\omega|,
\qquad
\omega=\dot\psi.
$$

When $\zeta$ varies, the body-frame internal speed contains the meridional term

$$
|\dot{\mathbf s}_k|^2
=
R_\perp^2(1-\zeta^2)\omega^2
+
\left(
R_\parallel^2
+
\frac{R_\perp^2\zeta^2}{1-\zeta^2}
\right)\dot\zeta^2
$$

for fixed $R_\perp$ and $R_\parallel$. Radius changes add the obvious $\dot R_\perp$ and $\dot R_\parallel$ terms and should be retained in a solver packet.

### Two-Speed Deformation Sweep Target

Claim level. Priority-only validation target. The translating-oblate hypothesis should be tested in two independent velocity directions, not only by increasing group velocity through the Noether sea:

$$
u=|\mathbf V_g|,
\qquad
v_{\mathrm{orb}}
=
R_\perp\sqrt{1-\zeta^2}\,|\omega|
$$

for the simple latitude-ring ansatz, with $c_f=1$ throughout. The group velocity $u$ tests how the whole branch moves through the Noether sea. The orbital velocity $v_{\mathrm{orb}}$ tests how tightly the internal same-level braid is wound at a fixed dynamic center, or at a fixed translating center.

The first sweep should therefore be a two-dimensional map

$$
\mathcal M_{\mathrm{2v}}
:
(u,v_{\mathrm{orb}})
\longmapsto
\left(
\chi,
\frac{\mathcal V}{\mathcal V_0},
T_{\mathrm{branch}},
\frac{\nu_{\mathrm{branch}}}{\nu_0},
\Delta\mathcal A,
\mathcal S_{\mathrm{root}},
\mathcal S_{\mathrm{return}}
\right),
$$

where

$$
\chi=\frac{R_\parallel}{R_\perp},
\qquad
\mathcal V=\frac{4\pi}{3}R_\perp^2R_\parallel.
$$

Here $T_{\mathrm{branch}}$ is a retained branch-clock period, not merely a displayed orbit period. It must be defined by recurrence of the same retained path-history, causal-root, wake-history, and action rows. The root status $\mathcal S_{\mathrm{root}}$ records root counts, root loss, source-normal denominator floors, and same-source self-hit rows. The return status $\mathcal S_{\mathrm{return}}$ records escape, one-turn scatter, bounded return, stable support radius, or same-level loss.

The natural diagnostic slices are:

| Slice | Held fixed | Varied | Primary question |
| --- | --- | --- | --- |
| group sweep | internal action level or $v_{\mathrm{orb}}$ | $u$ | Does the branch deform into an oblate support with Lorentz-like branch-clock scaling? |
| orbital sweep | $u=0$ or fixed $u$ | $v_{\mathrm{orb}}$ | Does increasing internal braid speed scale the support, volume, branch frequency, return margin, or failure mode? |
| joint sweep | declared action row and retained branch identity | both $u$ and $v_{\mathrm{orb}}$ | Is there a combined field-speed budget, denominator-floor boundary, or stable-basin surface? |

The candidate Lorentz-style recovery test belongs first on the group sweep at fixed internal action level:

$$
\frac{\nu_{\mathrm{branch}}(u,v_{\mathrm{orb}})}{\nu_{\mathrm{branch}}(0,v_{\mathrm{orb}})}
\stackrel{?}{\approx}
\sqrt{1-u^2},
$$

and

$$
\chi(u,v_{\mathrm{orb}})
\stackrel{?}{\approx}
\sqrt{1-u^2}
$$

for a branch whose deformation is mostly longitudinal. If $R_\perp$ remains approximately fixed, this also predicts

$$
\frac{\mathcal V(u,v_{\mathrm{orb}})}{\mathcal V(0,v_{\mathrm{orb}})}
\stackrel{?}{\approx}
\sqrt{1-u^2}.
$$

The orbital-speed sweep is different. At $u=0$, increasing $v_{\mathrm{orb}}$ changes the internal action, root incidence, angular-momentum accommodation, and short-range return margin. It may create its own scale ladder or volume compression, but that would be an internal branch-energy effect, not automatically the same as translational Lorentz contraction. The diagnostic should therefore report an orbital-speed scaling law only after the retained row shows whether

$$
\mathcal A(v_{\mathrm{orb}})\approx n h,
\qquad
\nu_{\mathrm{branch}}(0,v_{\mathrm{orb}})
\quad\text{and}\quad
\mathcal V(0,v_{\mathrm{orb}})
$$

organize into stable basin families.

The shared failure surface is the absolute field-frame speed and causal-root denominator budget:

$$
\dot{\mathbf x}_{a}
=
\mathbf V_g+\mathbf v_{a,\mathrm{int}},
\qquad
\beta_{\max}
=
\max_a |\dot{\mathbf x}_a|
$$

with $c_f=1$. As either $u$ or $v_{\mathrm{orb}}$ increases, the sweep must record field-speed crossings, small source-normal denominators, multiple roots, same-source self-hit rows, and root-loss windows before interpreting any oblate fit or clock ratio.

### Candidate Preferred Two-Speed Configuration

Claim level. Priority-only hypothesis and validation criterion. The two-speed sweep should test whether the branch selects a preferred relation between group velocity and orbital velocity rather than allowing arbitrary pairs. The disciplined version of the intuition is not a single guessed speed. It is a constrained extremum or stable branch curve in the map

$$
(u,v_{\mathrm{orb}})
\longmapsto
\mathcal M_{\mathrm{2v}}.
$$

A candidate preferred configuration should satisfy at least three same-record conditions:

$$
\mathcal E(u,v_{\mathrm{orb}})\approx0,
\qquad
\Delta\mathcal A(u,v_{\mathrm{orb}})\approx0,
\qquad
\mathcal S_{\mathrm{return}}=\text{bounded return or stable support radius},
$$

where $\mathcal E$ is the reduced residual norm over the retained-root equation, $\Delta\mathcal A$ is action drift over one branch-clock period, and $\mathcal S_{\mathrm{return}}$ is measured on the same retained path-history, wake-history, and root ledger. Among rows satisfying those constraints, the preferred row or curve should also maximize a root-budget margin such as

$$
\mathcal M_{\mathrm{root}}
=
\min_{a,b,\tau}
\left(
D_{s,ab},
D_{T,ab},
1-\beta_{\max}
\right),
$$

or at least keep that margin safely positive. A numerical search can express the same idea through an objective

$$
\mathcal J(u,v_{\mathrm{orb}})
=
w_E\|\mathcal E\|^2
+
w_A\left(\frac{\Delta\mathcal A}{h}\right)^2
+
w_R\,\mathcal R_{\mathrm{return}}^2
-
w_M\,\mathcal M_{\mathrm{root}},
$$

with a preferred row satisfying

$$
\partial_u\mathcal J=0,
\qquad
\partial_{v_{\mathrm{orb}}}\mathcal J=0,
\qquad
\operatorname{Hess}\mathcal J>0
$$

inside a root-complete, sub-field-speed window. This is only a diagnostic objective; the weights cannot define the physics. The physics would be the retained branch whose residual, action, root, and return rows make the extremum robust without tuning.

The most interesting possible outcome is a speed-budget relation. If a stable branch keeps its fastest field-frame architrino speed near a preferred value $\beta_\ast<1$, then the accessible rows may cluster near

$$
u^2+v_{\mathrm{orb}}^2\approx \beta_\ast^2
$$

when cross terms average away by symmetry, or near the more exact field-frame condition

$$
\beta_{\max}(u,v_{\mathrm{orb}},Q,\zeta,\psi)
\approx
\beta_\ast.
$$

In the special case $\beta_\ast\approx1$, this would give the light-clock-like relation

$$
v_{\mathrm{orb}}(u)
\approx
v_{\mathrm{orb}}(0)\sqrt{1-u^2}
$$

for a branch whose internal clock is set by orbital cadence. That would make the branch-clock ratio

$$
\frac{\nu_{\mathrm{branch}}(u)}{\nu_{\mathrm{branch}}(0)}
\approx
\sqrt{1-u^2}
$$

feel less like an imposed Lorentz rule and more like the selected kinematic closure of a finite-speed retained-history braid.

This is exactly where the intuition becomes testable. The solver should not assume the square-root law. It should sweep $(u,v_{\mathrm{orb}})$, fit any low-residual basin curve, and then compare the fitted curve against:

1. constant $\beta_{\max}$ surfaces;
2. constant or quantized action rows $\mathcal A\approx n h$;
3. maximum root-budget margin rows;
4. maximum return-margin rows;
5. Lorentz-style clock rows $\nu_{\mathrm{branch}}(u)/\nu_{\mathrm{branch}}(0)\approx\sqrt{1-u^2}$;
6. volume rows $\mathcal V(u)/\mathcal V(0)$ and oblateness rows $\chi(u)$.

Failure modes are clean. The intuition fails if the low-residual rows spread broadly across $(u,v_{\mathrm{orb}})$ with no basin, if the preferred rows depend mainly on artificial Noether sea pressure weights, if action drift remains large, if root margins collapse before the branch clock can be measured, or if the selected curve does not survive central-solver retained-history promotion.

### Executable Two-Speed Prefilter Run - 2026-07-02

Claim level. Priority-only executable prefilter. The runner [oblate-spheroid-two-speed-sweep.mjs](../../../scripts/braid-ideal/oblate-spheroid-two-speed-sweep.mjs) implements the first $c_f=1$ two-speed sweep on top of the reduced oblate-spheroid and fixed-frequency row producers. It is not a central-solver retained-history row, does not compute accepted wake residuals, and does not authorize a preferred branch claim.

The first run used:

- field speed: $c_f=1$;
- group direction: $(1,1,1)/\sqrt3$;
- $u\in\{0,0.1,0.2,0.3,0.4,0.5,0.6\}$;
- $v_{\mathrm{orb}}\in\{0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8\}$;
- speed-budget target: $\beta_\ast=0.8$;
- $\chi(u)=\sqrt{1-u^2}$ as a Lorentz-style candidate deformation target, not as a solved deformation law.

The sweep generated `56` rows. Of those, `46` kept positive field-frame speed margin in the kinematic prefilter, but `0` had bounded return. The artifact status remains

$$
\texttt{fail\_closed\_missing\_retained\_root\_ledger}.
$$

The candidate prefilter rows, one per group speed, were:

| $u$ | $v_{\mathrm{orb}}$ | $\chi$ | $\mathcal V/\mathcal V_0$ | $\beta_{\max}$ | root margin | action-drift proxy | Return status |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `0` | `0.8` | `1` | `1` | `0.8000000000000003` | `0.19999999999999973` | `0.3750432608922054` | missing retained-root return row |
| `0.1` | `0.8` | `0.99498743710662` | `0.99498743710662` | `0.8810153355845574` | `0.11898466441544264` | `0.3750432608922054` | missing retained-root return row |
| `0.2` | `0.7` | `0.9797958971132712` | `0.9797958971132712` | `0.8665039167173727` | `0.1334960832826273` | `0.4531628532806842` | missing retained-root return row |
| `0.3` | `0.7` | `0.9539392014169457` | `0.9539392014169457` | `0.9545907796170156` | `0.04540922038298445` | `0.4531628532806842` | missing retained-root return row |
| `0.4` | `0.6` | `0.916515138991168` | `0.916515138991168` | `0.9479261915389352` | `0.0520738084610648` | `0.4687175543308406` | missing retained-root return row |
| `0.5` | `0.5` | `0.8660254037844386` | `0.8660254037844386` | `0.9456942250523721` | `0.054305774947627894` | `0.3905979619423636` | missing retained-root return row |
| `0.6` | `0.4` | `0.8` | `0.8` | `0.9479261915389353` | `0.052073808461064686` | `0.3124783695538973` | missing retained-root return row |

Interpretation. The prefilter does show the expected qualitative pattern: as $u$ rises, the preferred kinematic row shifts toward smaller $v_{\mathrm{orb}}$, while $\chi$ and the candidate volume ratio decrease. This is the first executable sign of the translation/orbital-speed selection intuition. However, the exact field-frame maximum speed $\beta_{\max}$ is not the same as the simple quadrature estimate $\sqrt{u^2+v_{\mathrm{orb}}^2}$, because some internal velocities align with the group velocity during the cycle. That makes the more exact condition

$$
\beta_{\max}(u,v_{\mathrm{orb}},Q,\zeta,\psi)\approx\beta_\ast
$$

more important than the simplified relation $u^2+v_{\mathrm{orb}}^2\approx\beta_\ast^2$.

The negative result is equally important. This initial kinematic-only run has no accepted reduced residual norm, no accepted action closure, no retained root ledger, and no bounded return. Its status is therefore `kinematic_prefilter_only_no_bounded_return`, not `preferred_configuration_found`.

Next solver target. Promote this prefilter into a retained-history residual sweep in which $\chi$ is fitted rather than assigned, causal roots and source-normal denominator floors are computed on the same record, action drift is measured from the retained action ledger, and return status is measured by the stability or return-margin row rather than by phase closure alone.

### Sampled Two-Speed Residual Runs - 2026-07-02

Claim level. Priority-only sampled wake-residual diagnostic. The runner [oblate-spheroid-two-speed-sweep.mjs](../../../scripts/braid-ideal/oblate-spheroid-two-speed-sweep.mjs) now evaluates a sampled causal-root residual for the assigned oblate ansatz while keeping the artifact fail-closed. This is still not the native central solver, not an accepted retained-history row, and not a preferred-configuration certificate.

For each sampled receiver/source pair the diagnostic solves

$$
\|\mathbf x_a(t)-\mathbf x_b(t-\tau)\|=\tau
$$

with $c_f=1$, forms a softened wake acceleration using the sampled source-normal and receiver-normal branch factor, and reports

$$
\mathcal E_{\mathrm{norm}}
=
\frac{\operatorname{rms}(\mathbf a_{\mathrm{wake}}-\mathbf a_{\mathrm{ansatz}})}
{\operatorname{rms}(\mathbf a_{\mathrm{ansatz}})+\operatorname{rms}(\mathbf a_{\mathrm{wake}})}.
$$

The diagnostic uses default coupling `1/36`, softening `0.05`, and reports the root-budget margin

$$
\mathcal M_{\mathrm{root}}
=
\min(D_s,D_T,1-\beta_{\max}).
$$

The first sampled dense run used $u\in\{0,0.1,\ldots,0.6\}$, $v_{\mathrm{orb}}\in\{0.1,0.2,\ldots,0.8\}$, `sample-count=4`, `root-samples=160`, and `root-periods=2`. It produced `56` rows, `46` positive root-budget rows, `0` bounded-return rows, and minimum sampled normalized residual `0.667005989038545`. The absolute residual minimum in that run was outside the positive root-budget window: $(u,v_{\mathrm{orb}})=(0.6,0.7)$ had $\mathcal E_{\mathrm{norm}}\approx0.667006$, but $\beta_{\max}\approx1.229832$ and root margin $\approx-0.229832$.

The objective-ranked candidate rows from that dense run were:

| $u$ | $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | $\beta_{\max}$ | root margin | action-drift proxy |
| ---: | ---: | ---: | ---: | ---: | ---: |
| `0` | `0.8` | `0.968653` | `0.8` | `0.2` | `0.375043` |
| `0.1` | `0.8` | `0.968121` | `0.881015` | `0.118985` | `0.375043` |
| `0.2` | `0.7` | `0.960573` | `0.866504` | `0.133496` | `0.453163` |
| `0.3` | `0.6` | `0.947164` | `0.856693` | `0.143307` | `0.468718` |
| `0.4` | `0.3` | `0.851035` | `0.662784` | `0.337216` | `0.234359` |
| `0.5` | `0.2` | `0.773688` | `0.66913` | `0.33087` | `0.156239` |
| `0.6` | `0.2` | `0.749907` | `0.767647` | `0.232353` | `0.156239` |

An extended run past $c_f=1$ used $u\in\{0,0.2,\ldots,1.2\}$ and $v_{\mathrm{orb}}\in\{0.1,0.3,\ldots,1.1\}$. It produced `42` rows, `15` positive root-budget rows, `0` bounded-return rows, and minimum sampled normalized residual `0.6555073906881866`. Again, the absolute residual minimum was outside the positive root-budget window: $(u,v_{\mathrm{orb}})=(0.6,0.7)$ had $\mathcal E_{\mathrm{norm}}\approx0.655507$, $\beta_{\max}\approx1.229832$, and root margin $\approx-0.229832$. The best positive-margin row in that coarse extended scan was near the causal edge at $(u,v_{\mathrm{orb}})=(0.8,0.1)$ with $\mathcal E_{\mathrm{norm}}\approx0.807713$, $\beta_{\max}\approx0.881015$, and root margin $\approx0.118985$.

A boundary refinement used $u\in\{0.6,0.7,0.8,0.85,0.9,0.95\}$ and $v_{\mathrm{orb}}\in\{0.05,0.1,\ldots,0.35\}$. It produced `42` rows, `23` positive root-budget rows, `0` bounded-return rows, and a visible near-edge basin. The best positive-margin residual row was $(u,v_{\mathrm{orb}})=(0.8,0.2)$ with $\mathcal E_{\mathrm{norm}}\approx0.692043$, $\beta_{\max}\approx0.965596$, and root margin $\approx0.034404$.

The tighter fine-grid run around that basin used $u\in\{0.76,0.78,0.8,0.82,0.84,0.86\}$, $v_{\mathrm{orb}}\in\{0.14,0.16,0.18,0.2,0.22,0.24\}$, `sample-count=6`, `root-samples=240`, and `root-periods=2`. It produced `36` rows, `26` positive root-budget rows, `0` bounded-return rows, and minimum sampled normalized residual `0.6737485966833493`. That absolute minimum still crossed the causal speed budget: $(u,v_{\mathrm{orb}})=(0.86,0.22)$ had $\beta_{\max}\approx1.042322$ and root margin $\approx-0.042322$.

Within the positive root-budget rows of the fine run, two rows are worth preserving:

| Role | $u$ | $v_{\mathrm{orb}}$ | $\chi$ | $\mathcal E_{\mathrm{norm}}$ | $\beta_{\max}$ | root margin | action-drift proxy |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| objective-best | `0.78` | `0.2` | `0.62578` | `0.698929` | `0.945762` | `0.054238` | `0.156239` |
| residual-best positive-margin | `0.84` | `0.18` | `0.542586` | `0.680081` | `0.988178` | `0.011822` | `0.459385` |

Both rows had full directed partner-root coverage in the sampled diagnostic, but zero same-source root coverage. That is a major blocker. The sampled result is a partner-wake consistency probe, not a same-source retained-root ledger. The objective-best row had rms residual `0.06554737816808505`, rms ansatz acceleration `0.04898979485566356`, rms wake acceleration `0.04479285878433328`, total sampled roots `180`, minimum source normal `0.15847503638284421`, minimum receiver normal `0.10807972658405784`, and maximum branch weight `2.1614807215740615`. The residual-best positive-margin row had rms residual `0.05910507816580145`, rms ansatz acceleration `0.0396817338330875`, rms wake acceleration `0.047227166412131844`, total sampled roots `180`, minimum source normal `0.064443270765144`, minimum receiver normal `0.05151281788994355`, and maximum branch weight `3.4114055912009227`.

The executable sweep now records this same-source status as a non-authorizing `same_source_causal_root_exclusion_lemma.v0` row. For a strict sub-field-speed sampled interval, the causal-root function

$$
C_{aa}(t,\tau)=\|\mathbf x_a(t)-\mathbf x_a(t-\tau)\|-c_f\tau
$$

stays negative for every positive delay when the sampled speed bound obeys $\beta_{\max}<1$, so the absence of same-source roots is a proof-side obstruction rather than accepted retained-root evidence. The lemma keeps `accepted_same_record_evidence=false`, `retained_root_ledger_ref=null`, and the first missing field `oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref`.

Interpretation. The preferred-configuration intuition does play out as an interesting idea, but not yet as a breakthrough stable braid. The sampled residual is not flat across $(u,v_{\mathrm{orb}})$; it creates a basin that moves toward high translation, lower orbital speed, and small positive root margin. The best raw residuals want to cross or approach $\beta_{\max}=1$, while the best admissible positive-margin rows sit just inside the causal edge. That suggests a concrete analytic target:

$$
\partial_u\mathcal E_{\mathrm{norm}}\approx0,
\qquad
\partial_{v_{\mathrm{orb}}}\mathcal E_{\mathrm{norm}}\approx0,
\qquad
\mathcal M_{\mathrm{root}}>0,
\qquad
\beta_{\max}\lesssim1.
$$

The current runs do not reproduce GR time, do not prove Lorentz contraction, and do not find a bounded-return branch. They do sharpen the next question: is the near-edge basin an artifact of the assigned $\chi(u)=\sqrt{1-u^2}$ ansatz and toy wake normalization, or does a native retained-history solve with fitted $\chi$, same-source roots, action rows, and stability rows select a real interior branch?

### Dynamic Two-Speed Return-Probe Runs - 2026-07-02

Claim level. Priority-only dynamic probe, not central-solver retained-history evidence. The two-speed sweep now has an explicit `--return-probe` mode. It takes the objective-ranked candidate rows, initializes the six architrinos on the assigned oblate ansatz, supplies periodic ansatz prehistory, advances the particles with the sampled wake law for a declared number of branch periods, and records whether the row returns to the same center-frame support. The probe is useful because it tests the missing condition

$$
\mathcal S_{\mathrm{return}}
=
\text{bounded return or stable support radius}
$$

directly enough to reject weak candidates, while still keeping `retainedBranchClaim=false`, `preferred_configuration_claim=false`, and `scoreMovement=no_score_increase`.

The return-probe row reports:

$$
\Delta x_{\mathrm{return}}
=
\operatorname{rms}_a\|\mathbf y_a(T)-\mathbf y_a(0)\|,
\qquad
\Delta v_{\mathrm{return}}
=
\operatorname{rms}_a\|\dot{\mathbf y}_a(T)-\dot{\mathbf y}_a(0)\|,
$$

maximum support-radius drift, maximum field-frame speed, root-budget margin, partner-root coverage, same-source root coverage, and the first failed return condition. A bounded-return candidate must remain sub-$c_f$, keep positive root margin, keep partner-root coverage, preserve support radius, and return in position and velocity within the declared tolerances.

The near-edge residual basin was rerun with one dynamic return-probe period:

- $u\in\{0.76,0.78,0.8,0.82,0.84,0.86\}$;
- $v_{\mathrm{orb}}\in\{0.14,0.16,0.18,0.2,0.22,0.24\}$;
- `sample-count=6`, `root-samples=240`, `root-periods=2`;
- `return-probe-periods=1`, `return-probe-steps-per-period=120`, `return-probe-root-samples=80`, `return-probe-history-periods=2`.

The result was a clear rejection of bounded return in the near-edge basin: `36` rows, `26` positive sampled root-budget rows, `6` dynamic return-probe rows, and `0` bounded-return rows. The return-probed candidate rows were:

| $u$ | $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | sampled $\beta_{\max}$ | sampled root margin | action drift | dynamic $\beta_{\max}$ | dynamic root margin | first return blocker |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `0.76` | `0.2` | `0.705436` | `0.925936` | `0.074064` | `0.156239` | `1.171238` | `-0.171238` | `field_speed_sub_cf` |
| `0.78` | `0.2` | `0.698929` | `0.945762` | `0.054238` | `0.156239` | `1.256463` | `-0.256463` | `field_speed_sub_cf` |
| `0.8` | `0.16` | `0.7025` | `0.931397` | `0.068603` | `0.075009` | `1.230147` | `-0.230147` | `field_speed_sub_cf` |
| `0.82` | `0.16` | `0.697417` | `0.951288` | `0.048712` | `0.075009` | `1.492334` | `-0.492334` | `field_speed_sub_cf` |
| `0.84` | `0.16` | `0.69226` | `0.971183` | `0.028817` | `0.075009` | `1.993763` | `-0.993763` | `field_speed_sub_cf` |
| `0.86` | `0.16` | `0.687132` | `0.991082` | `0.008918` | `0.075009` | `2.173695` | `-1.173695` | `field_speed_sub_cf` |

The low-action-drift rows are therefore not bounded-return rows in this priority probe. They sit so close to the causal edge that dynamic evolution crosses $c_f=1$ before a one-period return can be claimed.

A lower-speed family was then checked to see whether stronger root margin trades away too much residual quality:

- $u\in\{0,0.1,\ldots,0.6\}$;
- $v_{\mathrm{orb}}\in\{0.05,0.1,\ldots,0.4\}$;
- $\beta_\ast=0.5$;
- same one-period return-probe settings as above.

That run produced `56` rows, all `56` with positive sampled root-budget margin, `7` dynamic return-probe rows, and `0` bounded-return rows. Unlike the near-edge basin, the lower-speed rows generally stayed sub-$c_f$ dynamically and kept partner-root coverage; their first blocker was instead support-radius preservation. The best-position-return row still had $\Delta x_{\mathrm{return}}\approx5.217465$ and maximum radius-mean drift $\approx3.903187$, so it is an expanding or scattering toy path, not a stable support.

The lower-speed probed candidates were:

| $u$ | $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | dynamic $\beta_{\max}$ | dynamic root margin | $\Delta x_{\mathrm{return}}$ | radius drift | first return blocker |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `0` | `0.2` | `0.83965` | `0.229971` | `0.770029` | `5.217465` | `3.903187` | `radius_support_within_tolerance` |
| `0.1` | `0.2` | `0.836524` | `0.332985` | `0.667015` | `5.226737` | `3.91045` | `radius_support_within_tolerance` |
| `0.2` | `0.2` | `0.827452` | `0.438568` | `0.561432` | `5.250694` | `3.929357` | `radius_support_within_tolerance` |
| `0.3` | `0.2` | `0.813251` | `0.545773` | `0.454227` | `5.280219` | `3.95305` | `radius_support_within_tolerance` |
| `0.4` | `0.2` | `0.794994` | `0.654616` | `0.345384` | `5.303467` | `3.972645` | `radius_support_within_tolerance` |
| `0.5` | `0.15` | `0.770758` | `0.784484` | `0.215516` | `6.57536` | `5.083182` | `radius_support_within_tolerance` |
| `0.6` | `0.15` | `0.752385` | `0.916034` | `0.083966` | `7.48383` | `5.580542` | `radius_support_within_tolerance` |

A quick coupling sweep over `1/72`, `1/36`, `1/24`, `1/18`, `1/12`, `1/9`, `1/6`, and `1/4` on representative rows $(u,v_{\mathrm{orb}})\in\{(0,0.2),(0.4,0.2),(0.78,0.2)\}$ did not rescue bounded return. No tested coupling produced a bounded or stable-support row. The best one-period position-return error stayed large, and increasing coupling generally increased the support-radius drift and eventually forced field-speed crossings.

Interpretation. The two-speed sweep now has a sharper negative result. The preferred-configuration intuition still appears as a residual basin, but the bare sampled wake law does not turn that basin into a bounded return:

1. Near the residual/action edge, the first dynamic blocker is field-speed crossing.
2. Away from the edge, the first dynamic blocker is support-radius expansion.
3. Coupling retuning alone does not remove either blocker in the tested rows.

The next mathematical target is therefore not another coarse two-speed scan. It is the missing stabilizing term in the reduced return equation:

$$
F_{\mathrm{return}}
=
F_{\mathrm{sampled\,wake}}
+F_{\mathrm{self\,hit}}
+F_{\mathrm{wake\,ledger}}
+F_{\mathrm{shielding}}
+F_{\mathrm{angular\,momentum}}
+F_{\mathrm{Noether\,sea}},
$$

with a proof or retained-history row showing which term supplies the inward second turn, stable support radius, or bounded limit cycle without violating $c_f=1$.

### Support-Term Two-Speed Return-Probe Runs - 2026-07-02

Claim level. Priority-only support-term diagnostic. The return probe now has an optional oblate-surface support term, disabled by default. When enabled, it adds only a normal response to the assigned spheroid:

$$
\Phi(\mathbf y)
=
\frac{x^2+y^2}{R_\perp^2}
+
\frac{z^2}{R_\parallel^2}
-1,
\qquad
\mathbf a_{\mathrm{support}}
=
-k\,\Phi\,\hat{\mathbf n}
-\gamma\,(\dot{\mathbf y}\cdot\hat{\mathbf n})\hat{\mathbf n}.
$$

This is the simplest way to test the operator intuition that nearby Noether sea pressure might constrain the support scale. It is not a proof of Noether sea dynamics, not a retained solver row, and not an accepted stabilizing mechanism. The output records support stiffness, damping, rms support acceleration, maximum support acceleration, and maximum $|\Phi|$ so the added term remains visible.

A coarse support sweep tested two families:

1. lower-speed rows with $u\in\{0,0.2,0.4,0.6\}$, $v_{\mathrm{orb}}\in\{0.15,0.2,0.25\}$, and $\beta_\ast=0.5$;
2. near-edge rows with $u\in\{0.76,0.8,0.84\}$, $v_{\mathrm{orb}}\in\{0.16,0.18,0.2,0.22\}$, and $\beta_\ast=0.8$.

The support grid used

$$
k\in\{0,0.1,0.3,1,3,10\},
\qquad
\gamma\in\{0,0.2,0.6,1.5,4\}.
$$

Result. The lower-speed family gained stable-support-radius rows but still no bounded-return rows. The near-edge residual basin still failed by field-speed crossing even when support reduced the radial drift. In the coarse run, the lower-speed family first produced stable-support rows near $k=0.1,\gamma=4$ and more robustly near $k\in\{1,3\}$ with moderate damping. The near-edge family produced `0` stable-support rows and `0` bounded-return rows across the tested support grid.

A finer lower-speed support grid tested

$$
u\in\{0,0.1,0.2,0.3,0.4\},
\qquad
v_{\mathrm{orb}}\in\{0.1,0.15,0.2,0.25,0.3\},
$$

with

$$
k\in\{0.15,0.25,0.35,0.5,0.75,1.0\},
\qquad
\gamma\in\{0,0.2,0.5,0.8,1.2,1.8\}.
$$

That produced `900` single-row return probes, `201` stable-support rows, and `0` bounded-return rows. The best one-period position-return row was:

| $u$ | $v_{\mathrm{orb}}$ | $k$ | $\gamma$ | $\mathcal E_{\mathrm{norm}}$ | action drift | $\Delta x_{\mathrm{return}}$ | $\Delta v_{\mathrm{return}}$ | radius drift | dynamic $\beta_{\max}$ | dynamic root margin |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `0` | `0.25` | `1` | `1.8` | `0.8643` | `0.3047` | `0.3132` | `0.2952` | `0.0474` | `0.3693` | `0.6307` |

A higher-resolution rerun of that row with `sample-count=6`, `root-samples=240`, `return-probe-steps-per-period=240`, and `return-probe-root-samples=96` remained a one-period stable-support candidate:

| $u$ | $v_{\mathrm{orb}}$ | $k$ | $\gamma$ | $\mathcal E_{\mathrm{norm}}$ | action drift | $\Delta x_{\mathrm{return}}$ | $\Delta v_{\mathrm{return}}$ | radius drift | dynamic $\beta_{\max}$ | dynamic root margin | support rms acceleration |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `0` | `0.25` | `1` | `1.8` | `0.8642771196090612` | `0.3047010190288182` | `0.3201914058198091` | `0.2947674157868315` | `0.05339957385603156` | `0.3679369345390572` | `0.6320630654609428` | `0.08757523466063143` |

However, the same row over four return-probe periods lost the stable-support classification: radius drift rose to `0.1529027925130737`, position-return error rose to `1.41952115725692`, velocity-return error rose to `0.7020918412457122`, and the first blocker became `radius_support_within_tolerance`. It remained sub-$c_f$ with dynamic $\beta_{\max}\approx0.6761684466891403$ and positive dynamic root margin $\approx0.32383155331085967$, but it did not become a bounded or recurrent branch.

Interpretation. The support term confirms part of the intuition and rejects another part. A normal pressure-like response can hold the support scale for low-speed rows over one period while preserving $c_f=1$ and positive root margin. It does not by itself produce a preferred bounded branch with low residual, low action drift, phase return, and long-window stability. The missing ingredient is now sharper: the stabilizer must couple support preservation to tangential phase return or branch-clock locking, not merely press particles back onto the oblate surface.

### Branch-Clock-Lock Two-Speed Return-Probe Runs - 2026-07-02

Claim level. Priority-only branch-clock-lock diagnostic. The return probe now also has an optional tangent-plane branch-clock locking term, disabled by default. It compares each dynamic particle with the assigned oblate ansatz at the current branch clock and applies only the tangent component of a proportional-derivative correction:

$$
\mathbf P_T(\mathbf w)
=
\mathbf w-(\mathbf w\cdot\hat{\mathbf n})\hat{\mathbf n},
\qquad
\mathbf a_{\mathrm{clock}}
=
-k_\parallel\,\mathbf P_T(\mathbf y-\mathbf y_{\mathrm{ansatz}})
-\gamma_\parallel\,\mathbf P_T(\dot{\mathbf y}-\dot{\mathbf y}_{\mathrm{ansatz}}).
$$

The normal support term controls distance from the assigned oblate surface; the branch-clock term controls phase and center-frame velocity along that surface. This is not a natural retained-history force law and not accepted evidence. It is a diagnostic for how much tangential stabilizing authority would be needed if the missing Noether sea, wake-ledger, shielding, angular-momentum, or self-hit term acts like a branch-clock lock.

With the prior best normal support setting $k=1,\gamma=1.8$, the row-local grid at $(u,v_{\mathrm{orb}})=(0,0.25)$ swept

$$
k_\parallel,\gamma_\parallel\in\{0,0.025,0.05,0.1,0.2,0.4,0.8,1.6,3.2\}.
$$

That produced `81` one-period probes, `81` stable-support rows, and `23` bounded-return rows. The lowest branch-clock-lock rms acceleration among bounded rows was:

| $u$ | $v_{\mathrm{orb}}$ | $k_\parallel$ | $\gamma_\parallel$ | $\Delta x_{\mathrm{return}}$ | $\Delta v_{\mathrm{return}}$ | radius drift | dynamic $\beta_{\max}$ | dynamic root margin | support rms acceleration | clock-lock rms acceleration |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `0` | `0.25` | `0.8` | `1.6` | `0.08307653021283552` | `0.02641583242874801` | `0.02527193623759083` | `0.2677445081743365` | `0.7322554918256635` | `0.0606282113978359` | `0.07000750121683043` |

The strongest return in that row-local grid used $k_\parallel=3.2,\gamma_\parallel=3.2$ and reduced position-return error to `0.031359567450939374`, velocity-return error to `0.013397914773851131`, and radius drift to `0.024348002849919004`, with clock-lock rms acceleration `0.07240352094346496`. The key point is that large stiffness was not needed to make the one-period branch return once normal support was present; a visible but modest tangent correction was enough.

The fixed-lock map then tested two branch-clock-lock settings across $u\in\{0,0.1,\ldots,0.6\}$ and $v_{\mathrm{orb}}\in\{0.1,0.15,0.2,0.25,0.3\}$:

1. low-authority lock $k_\parallel=0.8,\gamma_\parallel=1.6$;
2. sharper-return lock $k_\parallel=3.2,\gamma_\parallel=0.2$.

That produced `70` probes, `70` stable-support rows, and `63` bounded-return rows. Under the simple ranking used for this diagnostic, the best bounded rows moved toward higher group translation rather than staying at rest. The best low-authority row in that map was:

| $u$ | $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | action drift | dynamic $\beta_{\max}$ | dynamic root margin | $\Delta x_{\mathrm{return}}$ | $\Delta v_{\mathrm{return}}$ | support rms acceleration | clock-lock rms acceleration |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `0.6` | `0.2` | `0.7499073602252181` | `0.15623918477694865` | `0.7854359186086829` | `0.2145640813913171` | `0.06260790860112865` | `0.01560910017867012` | `0.03240019516747013` | `0.05642684863196318` |

A near-edge fixed-lock map over $u\in\{0.6,0.65,0.7,0.75,0.8\}$ and $v_{\mathrm{orb}}\in\{0.1,0.125,0.15,0.175,0.2,0.225\}$ produced `60` probes, `57` bounded-return rows, and `3` field-speed failures. The best low-authority row by the same diagnostic objective was:

| $u$ | $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | action drift | sampled $\beta_{\max}$ | sampled root margin | dynamic $\beta_{\max}$ | dynamic root margin | $\Delta x_{\mathrm{return}}$ | $\Delta v_{\mathrm{return}}$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `0.8` | `0.2` | `0.6920425007335225` | `0.15623918477694865` | `0.9655962111930331` | `0.03440378880696693` | `0.9969101632777856` | `0.003089836722214412` | `0.06362027464528434` | `0.017637012951293322` |

A higher-resolution rerun of the edge and safer-edge candidates used `sample-count=6`, `root-samples=240`, `return-probe-steps-per-period=240`, `return-probe-root-samples=96`, and one- and four-period probes. All tested rows remained bounded under the driven diagnostic, including the near-edge row:

| case | periods | $u$ | $v_{\mathrm{orb}}$ | dynamic $\beta_{\max}$ | dynamic root margin | $\Delta x_{\mathrm{return}}$ | $\Delta v_{\mathrm{return}}$ | radius drift | support rms acceleration | clock-lock rms acceleration |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| edge low-authority | `1` | `0.8` | `0.2` | `0.9961122218285763` | `0.003887778171423717` | `0.06673769274774673` | `0.017290166008756526` | `0.028143939511905414` | `0.030895195109855386` | `0.058552382545334986` |
| edge low-authority | `4` | `0.8` | `0.2` | `0.9961122218285763` | `0.003887778171423717` | `0.06673769000562832` | `0.0172901665279674` | `0.028143939511905414` | `0.03093626846786921` | `0.05876007355454672` |
| safer edge low-authority | `4` | `0.8` | `0.175` | `0.9741018551039909` | `0.025898144896009057` | `0.060012454678713203` | `0.01396815236909616` | `0.02153266070169102` | `0.02740948462657377` | `0.051470841257771356` |
| safer edge sharper-return | `4` | `0.8` | `0.175` | `0.977664512837598` | `0.022335487162401968` | `0.02014103193229263` | `0.005044857248558181` | `0.01125399960527873` | `0.028581123242075276` | `0.05124309842346271` |

The cutoff check above the edge used the low-authority lock. It found bounded rows at $(0.82,0.15)$, $(0.82,0.175)$, and $(0.84,0.15)$, but the last two had dynamic root margins only `0.0028539730209474756` and `0.0015486648358725708`. Rows $(0.82,0.2)$, $(0.84,0.175)$, and $(0.86,0.15)$ failed by field-speed crossing; rows $(0.84,0.2)$, $(0.86,0.175)$, and $(0.86,0.2)$ already lacked positive sampled root-budget margin.

The executable sweep now has an artifact-level positive-root probe mode and emits `preferred_branch_curve_rows`. In this mode, every row with positive sampled root-budget margin receives the dynamic return probe; then each $u$ selects the bounded row with the lowest priority branch-curve objective. The objective remains diagnostic, not physical: it combines normalized residual, action drift, return errors, support/clock-lock authority, and dynamic root margin so the selected row is visible and reproducible.

The artifact-level low-authority branch-clock-lock map used

$$
u\in\{0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.75,0.8,0.82,0.84\},
$$

$$
v_{\mathrm{orb}}\in\{0.1,0.125,0.15,0.175,0.2,0.225\},
\qquad
k=1,\quad
\gamma=1.8,\quad
k_\parallel=0.8,\quad
\gamma_\parallel=1.6.
$$

It produced `72` rows, `69` positive-root dynamically probed rows, `66` bounded-return rows, and `12` preferred branch-curve rows, one for every tested $u$. The emitted preferred curve was:

| $u$ | selected $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | action drift | dynamic $\beta_{\max}$ | dynamic root margin | branch-curve objective |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `0` | `0.125` | `0.8344968589499601` | `0.1523505095144091` | `0.12880995660294206` | `0.871190043397058` | `0.6311390561328596` |
| `0.1` | `0.125` | `0.8320824070375306` | `0.1523505095144091` | `0.21871590220076512` | `0.7812840977992349` | `0.6361759065547234` |
| `0.2` | `0.125` | `0.8252492554232285` | `0.1523505095144091` | `0.31507382396236133` | `0.6849261760376386` | `0.634689194894389` |
| `0.3` | `0.125` | `0.8150559528034337` | `0.1523505095144091` | `0.4136488944034203` | `0.5863511055965798` | `0.6281410581491012` |
| `0.4` | `0.15` | `0.7880373794858184` | `0.38282061141728985` | `0.5367821283314941` | `0.4632178716685059` | `0.6152086912545838` |
| `0.5` | `0.15` | `0.7707581904625366` | `0.38282061141728985` | `0.6372839906584417` | `0.36271600934155834` | `0.5987251852498099` |
| `0.6` | `0.175` | `0.7452501004411348` | `0.38670928667982896` | `0.7618933955457424` | `0.23810660445425758` | `0.5812932294429756` |
| `0.7` | `0.175` | `0.7213562136835595` | `0.38670928667982896` | `0.8666240675156577` | `0.13337593248434232` | `0.5577490847442128` |
| `0.75` | `0.175` | `0.7082598503851606` | `0.38670928667982896` | `0.920255799451208` | `0.07974420054879205` | `0.5456325157671135` |
| `0.8` | `0.2` | `0.6920425007335225` | `0.15623918477694865` | `0.9969101632777856` | `0.003089836722214412` | `0.5321670950472137` |
| `0.82` | `0.175` | `0.688149794180312` | `0.38670928667982896` | `0.9971460269790525` | `0.0028539730209474756` | `0.5294044161305449` |
| `0.84` | `0.15` | `0.7025225416825435` | `0.38282061141728985` | `0.9984513351641274` | `0.0015486648358725708` | `0.544100727967449` |

The support-only comparison used the same $u$ and $v_{\mathrm{orb}}$ grid, same positive-root probe selection, same normal support $k=1,\gamma=1.8$, and no branch-clock lock. It produced `69` dynamic probes and `0` preferred branch-curve rows. The best support-only position return was still `0.532245558696609`, and the blocker split was `12` position-return failures, `57` field-speed failures, and `3` non-probed negative sampled-root rows. This confirms that the emitted preferred curve is a branch-clock-lock diagnostic, not a support-only stable braid.

### Near-Edge Basin Certificate - 2026-07-02

Claim level. Priority-only hard-math certificate, not retained evidence. The runner [oblate-spheroid-near-edge-basin-certificate.mjs](../../../scripts/braid-ideal/oblate-spheroid-near-edge-basin-certificate.mjs) takes a two-speed sweep artifact and emits finite-difference rows around positive-margin near-edge candidates. It now requires bounded dynamic return before a near-edge row can become a `hard_math_candidate`; support-only near-edge rows therefore fail closed before they can masquerade as preferred-branch evidence.

The certificate records, for each candidate row:

$$
\partial_u\mathcal E,
\qquad
\partial_{v_{\mathrm{orb}}}\mathcal E,
\qquad
\partial_u\mathcal O,
\qquad
\partial_{v_{\mathrm{orb}}}\mathcal O,
$$

where $\mathcal E$ is the sampled normalized residual and $\mathcal O$ is the sweep objective. It also records sampled $\beta_{\max}$, sampled root margin, dynamic $\beta_{\max}$, dynamic root margin, bounded-return status, preferred-curve selection status, and the retained evidence blocker.

On the low-authority branch-clock-lock artifact with $u$ extended through `0.86`, the source sweep produced `78` rows, `72` positive-root dynamically probed rows, `67` bounded-return rows, and `13` preferred branch-curve rows. The emitted preferred curve still selected the near-edge sequence through `u=0.84`, then selected a safer but worse-objective row at `u=0.86`:

| $u$ | selected $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | dynamic $\beta_{\max}$ | dynamic root margin | branch-curve objective |
| ---: | ---: | ---: | ---: | ---: | ---: |
| `0.8` | `0.2` | `0.6920425007335225` | `0.9969101632777856` | `0.003089836722214412` | `0.5321670950472137` |
| `0.82` | `0.175` | `0.688149794180312` | `0.9971460269790525` | `0.0028539730209474756` | `0.5294044161305449` |
| `0.84` | `0.15` | `0.7025225416825435` | `0.9984513351641274` | `0.0015486648358725708` | `0.544100727967449` |
| `0.86` | `0.1` | `0.7985096902994574` | `0.979443893644864` | `0.02055610635513605` | `0.6687531537863698` |

The certificate over that widened artifact produced `16` positive-margin near-edge rows, `11` near-edge bounded-return rows, `44` complete finite-difference rows, and `8` hard-math candidates. Three of the hard-math candidates are selected preferred-curve rows:

| selected row | $\mathcal E_{\mathrm{norm}}$ | sampled root margin | dynamic root margin | $\partial_u\mathcal E$ | $\partial_{v_{\mathrm{orb}}}\mathcal E$ | edge status |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| $(0.8,0.2)$ | `0.6920425007335225` | `0.03440378880696693` | `0.003089836722214412` | `-0.33250763690455726` | `0.13040210324868567` | `interior_improvement_available` |
| $(0.82,0.175)$ | `0.688149794180312` | `0.03595914836107106` | `0.0028539730209474756` | `-0.30031520751466534` | `-0.4356951922969408` | `interior_improvement_available` |
| $(0.84,0.15)$ | `0.7025225416825435` | `0.03727151599327183` | `0.0015486648358725708` | `-0.21915650977247494` | `-1.1975005306881228` | `interior_improvement_available` |

The support-only control over the same original branch-curve grid produced `13` sampled positive-margin near-edge rows, but `0` near-edge bounded-return rows and `0` hard-math candidates. Its status is `fail_closed_missing_bounded_dynamic_return`, with first missing field `oblate_spheroid_near_edge_basin_certificate.rows[*].dynamic_return_status`.

Interpretation. The certificate says the driven preferred curve is not an accidental single row; it is a finite-difference near-edge basin under the branch-clock-lock diagnostic. The residual keeps improving as $u$ increases and the selected rows press against the $c_f=1$ boundary, while dynamic root margin collapses to a few thousandths. That is mathematically interesting but physically dangerous: the next proof target is not to celebrate the edge row, but to derive an internal term that supplies the same tangent correction with a positive root-margin reserve large enough to survive refinement.

### Branch-Clock-Lock Target Extraction - 2026-07-02

Claim level. Priority-only missing-mechanism target. The runner [oblate-spheroid-branch-clock-lock-target.mjs](../../../scripts/braid-ideal/oblate-spheroid-branch-clock-lock-target.mjs) consumes a two-speed sweep artifact and extracts the acceleration scale that the assigned branch-clock-lock term supplied along each preferred branch-curve row. It does not authorize a stable braid, a preferred-configuration claim, or score movement. It records the missing internal mechanism explicitly as `internal_retained_history_tangent_authority_for_preferred_branch_curve`.

The widened low-authority branch-clock-lock artifact used $c_f=1$, $k=1$, $\gamma=1.8$, $k_\parallel=0.8$, $\gamma_\parallel=1.6$,

$$
u\in\{0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.75,0.8,0.82,0.84,0.86\},
$$

and

$$
v_{\mathrm{orb}}\in\{0.1,0.125,0.15,0.175,0.2,0.225\}.
$$

It produced `78` rows, `72` positive-root dynamic probes, `67` bounded-return rows, and `13` preferred branch-curve rows. The support-only control on the same grid produced `78` rows, `72` dynamic probes, `0` bounded-return rows, and `0` preferred branch-curve rows. The preferred curve is therefore a tangent-lock diagnostic, not a support-only natural branch.

The extracted preferred curve is:

| $u$ | selected $v_{\mathrm{orb}}$ | $\mathcal E_{\mathrm{norm}}$ | dynamic root margin | clock-lock rms acceleration | target status |
| ---: | ---: | ---: | ---: | ---: | --- |
| `0` | `0.125` | `0.8344968589499883` | `0.8711900433971433` | `0.038167415146537466` | `positive_margin_tangent_authority_measured` |
| `0.1` | `0.125` | `0.832082406980077` | `0.7812840978005431` | `0.03820733043569829` | `positive_margin_tangent_authority_measured` |
| `0.2` | `0.125` | `0.8252492527571377` | `0.6849261760373526` | `0.038323467819798694` | `positive_margin_tangent_authority_measured` |
| `0.3` | `0.125` | `0.815055937106585` | `0.5863512410328116` | `0.03850463136184044` | `positive_margin_tangent_authority_measured` |
| `0.4` | `0.15` | `0.7880372800387961` | `0.46321787166724127` | `0.04340351979320102` | `positive_margin_tangent_authority_measured` |
| `0.5` | `0.15` | `0.7707583108706657` | `0.3627150965288316` | `0.043622769740622534` | `positive_margin_tangent_authority_measured` |
| `0.6` | `0.175` | `0.7452553492250933` | `0.238104282397274` | `0.04958506677479213` | `positive_margin_tangent_authority_measured` |
| `0.7` | `0.175` | `0.7213946977542944` | `0.13337235877536857` | `0.049951518106057156` | `positive_margin_tangent_authority_measured` |
| `0.75` | `0.175` | `0.7083519077315049` | `0.07974048180577409` | `0.05038111161951546` | `positive_margin_tangent_authority_measured` |
| `0.8` | `0.2` | `0.6920962069948111` | `0.0030874623389054445` | `0.058648613347239885` | `missing_tangent_authority_exceeds_dynamic_root_margin` |
| `0.82` | `0.175` | `0.6882728954707807` | `0.0028479982962151817` | `0.05211813485791998` | `missing_tangent_authority_exceeds_dynamic_root_margin` |
| `0.84` | `0.15` | `0.7026262759501669` | `0.001542454157570483` | `0.04737213177153553` | `missing_tangent_authority_exceeds_dynamic_root_margin` |
| `0.86` | `0.1` | `0.7984693440533435` | `0.02054868343441618` | `0.041713777503450046` | `missing_tangent_authority_exceeds_dynamic_root_margin` |

The branch target summary is sharp:

| Quantity | Value |
| --- | ---: |
| target rows | `13` |
| rows with assigned branch-clock lock | `13` |
| rows with dynamic root margin $\le 0.01$ | `3` |
| rows where clock-lock rms acceleration exceeds dynamic root margin | `4` |
| minimum branch-curve objective row | $(u,v_{\mathrm{orb}})=(0.82,0.175)$ |
| minimum normalized residual row | $(u,v_{\mathrm{orb}})=(0.82,0.175)$ |
| minimum dynamic root-margin row | $(u,v_{\mathrm{orb}})=(0.84,0.15)$ |
| maximum clock-to-dynamic-margin diagnostic row | $(u,v_{\mathrm{orb}})=(0.84,0.15)$ |

The near-edge finite-difference certificate over the same artifact still reports `16` positive-margin near-edge rows, `11` near-edge bounded-return rows, `44` complete finite-difference rows, and `8` hard-math candidates. Three selected preferred-curve rows remain hard-math candidates:

| selected row | $\mathcal E_{\mathrm{norm}}$ | sampled root margin | dynamic root margin | $\partial_u\mathcal E$ | $\partial_{v_{\mathrm{orb}}}\mathcal E$ | edge status |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| $(0.8,0.2)$ | `0.6920962069948111` | `0.03440378880696693` | `0.0030874623389054445` | `-0.33698496450074034` | `0.12219472255867721` | `interior_improvement_available` |
| $(0.82,0.175)$ | `0.6882728954707807` | `0.03595914836107095` | `0.0028479982962151817` | `-0.303755803070469` | `-0.44124901120520904` | `interior_improvement_available` |
| $(0.84,0.15)$ | `0.7026262759501669` | `0.03727151599327183` | `0.001542454157570483` | `-0.2192445665640306` | `-1.1979506827515454` | `interior_improvement_available` |

Interpretation. The preferred-configuration intuition now looks mathematically interesting, but the branch is not yet natural. The preferred path is not a single $(u,v_{\mathrm{orb}})$ point; it is a sampled curve that steps from low orbital speed at low translation, through $v_{\mathrm{orb}}\approx0.175$ to `0.2` near $u\approx0.8$, and then retreats to lower $v_{\mathrm{orb}}$ as the field-speed edge becomes too tight. The apparent best diagnostic point is near $(u,v_{\mathrm{orb}})=(0.82,0.175)$, where both residual and branch objective are lowest. That point is also dangerous: the assigned tangent correction is about `18.3` times the dynamic root margin by the diagnostic ratio. At $(0.84,0.15)$ the ratio is about `30.7`.

This suggests a concrete analytical target. A real Noether braid mechanism would need to replace the assigned tangent branch-clock lock with an internal retained-history, wake-ledger, angular-momentum, shielding, or Noether sea response term whose tangent projection has roughly the measured scale while preserving a positive root-margin reserve. The next derivation should therefore solve for

$$
\mathbf P_T\mathbf a_{\mathrm{internal}}
{}+\mathbf P_T\mathbf a_{\mathrm{wake}}
{}+\mathbf P_T\mathbf a_{\mathrm{support}}
-\mathbf P_T\mathbf a_{\mathrm{ansatz}}
=0,
$$

or equivalently isolate the missing target

$$
\mathbf a_{\mathrm{target},T}
=-
\mathbf P_T\left(
\mathbf a_{\mathrm{wake}}
{}+\mathbf a_{\mathrm{support}}
-\mathbf a_{\mathrm{ansatz}}
\right),
$$

then ask whether retained roots can generate $\mathbf a_{\mathrm{target},T}$ without consuming the entire causal margin.

### Internal Tangent-Authority Reserve Equation - 2026-07-02

Claim level. Priority-only analytical target plus fail-closed reserve certificate. The runner [oblate-spheroid-branch-clock-lock-reserve-certificate.mjs](../../../scripts/braid-ideal/oblate-spheroid-branch-clock-lock-reserve-certificate.mjs) now converts the assigned branch-clock-lock acceleration into the equation a natural internal term would have to satisfy. It still does not authorize retained evidence; it records an explicit missing internal reference at `oblate_spheroid_branch_clock_lock_reserve_certificate.rows[*].internal_tangent_authority_ref`.

For each architrino $a$, let $\mathbf y_a$ be the center-frame oblate coordinate, let $\hat{\mathbf n}_a$ be the local support normal, and define the tangent projector

$$
\mathbf P_{T,a}\mathbf w
=
\mathbf w-(\mathbf w\cdot\hat{\mathbf n}_a)\hat{\mathbf n}_a.
$$

The retained branch equation has the form

$$
\mathbf a_a^{\mathrm{ans}}
=
\mathbf a_a^{\mathrm{wake}}
{}+\mathbf a_a^{\mathrm{support}}
{}+\mathbf a_a^{\mathrm{internal}}.
$$

Projecting tangent to the support gives the internal tangent-authority equation:

$$
\boxed{
\mathbf P_{T,a}\mathbf a_a^{\mathrm{internal}}
=
\mathbf P_{T,a}
\left(
\mathbf a_a^{\mathrm{ans}}
-\mathbf a_a^{\mathrm{wake}}
-\mathbf a_a^{\mathrm{support}}
\right)
}
$$

The assigned branch-clock-lock diagnostic is therefore only a measured proxy for this missing internal tangent projection:

$$
\mathbf a_{a,T}^{\mathrm{clock}}
\approx
\mathbf P_{T,a}\mathbf a_a^{\mathrm{internal}}.
$$

To preserve causal-root margin, define the retained margin

$$
\mu(t)
=
\min\left[
\min_a\{c_f-\|\dot{\mathbf x}_a(t)\|\},
\min_{a,b,\tau\in\mathcal C_{ab}(t)}
\{D_{s,ab}(t,\tau),D_{T,ab}(t,\tau)\}
\right],
$$

where $D_s$ and $D_T$ are the source-normal and receiver-normal factors. An internal replacement must satisfy a post-tangent-authority reserve inequality over a declared tangent-response horizon $\Delta_T$:

$$
\rho_T
=
\inf_t
\left[
\mu(t)
-\Delta_T\max_a
\|\mathbf P_{T,a}\mathbf a_a^{\mathrm{internal}}(t)\|
\right]
\ge \epsilon_\mu>0.
$$

The current certificate uses the row-level diagnostic proxy

$$
\rho_{T,\mathrm{rms}}^{\mathrm{row}}
=
m_{\mathrm{dyn}}
-\Delta_T A_{T,\mathrm{rms}}^{\mathrm{clock}},
\qquad
\rho_{T,\mathrm{rms}}^{\mathrm{row}}
\ge
0.01,
$$

with $\Delta_T=1$ for the first check. This is not dimensionally closed physics unless $\Delta_T$ is derived from the retained branch clock; it is a fail-closed screening inequality for whether the assigned tangent correction can plausibly be replaced without spending the causal margin.

Applied to the low-authority preferred-curve artifact, the reserve certificate reports:

| Quantity | Value |
| --- | ---: |
| rows | `78` |
| bounded dynamic-return rows | `67` |
| active branch-clock-lock rows | `72` |
| rows with raw dynamic margin $\ge0.01$ | `64` |
| rows with post-tangent reserve $\ge0.01$ | `55` |
| selected preferred-curve rows | `13` |
| selected preferred rows with post-tangent reserve $\ge0.01$ | `9` |
| full preferred-curve tangent reserve pass | `false` |

The selected preferred curve fails exactly where the branch becomes most interesting:

| selected row | dynamic root margin | clock-lock rms acceleration | $\rho_{T,\mathrm{rms}}^{\mathrm{row}}$ | raw margin allows `0.01` reserve | max $\Delta_T$ for `0.01` reserve |
| --- | ---: | ---: | ---: | --- | ---: |
| $(0.8,0.2)$ | `0.0030874623389054445` | `0.058648613347239885` | `-0.05556115100833444` | no | null |
| $(0.82,0.175)$ | `0.0028479982962151817` | `0.05211813485791998` | `-0.0492701365617048` | no | null |
| $(0.84,0.15)$ | `0.001542454157570483` | `0.04737213177153553` | `-0.045829677613965045` | no | null |
| $(0.86,0.1)$ | `0.02054868343441618` | `0.041713777503450046` | `-0.021165094069033864` | yes | `0.25288247830213234` |

The prior rows through $(0.75,0.175)$ pass this diagnostic reserve. For example, $(0.75,0.175)$ has dynamic root margin `0.07974048180577409`, clock-lock rms acceleration `0.05038111161951546`, and post-tangent reserve `0.02935937018625863`. That makes the current picture sharper: the preferred curve is not globally impossible under this proxy, but the near-edge low-residual segment cannot be claimed as an internally replaceable branch. Rows $(0.8,0.2)$ through $(0.84,0.15)$ have too little raw dynamic margin even before tangent authority is charged against the budget. Row $(0.86,0.1)$ has enough raw margin, but only if the effective tangent-response horizon is no larger than `0.25288247830213234` in the current normalized branch-clock units. The retained mechanism must therefore lower the tangent authority demand, raise the causal margin, or derive a shorter effective $\Delta_T$ from the branch clock.

Equivalently, each row must satisfy

$$
m_{\mathrm{dyn}}
{}+\delta\mu
-\Delta_T\lambda A_{T,\mathrm{rms}}^{\mathrm{clock}}
\ge
0.01,
$$

where $\delta\mu$ is the margin lift supplied by the internal mechanism and $\lambda$ is the fraction of the assigned tangent authority still needed after the internal mechanism is derived.

The first-order margin-lift direction depends on which factor realizes $\mu(t)$. If the active margin is the field-speed margin

$$
\mu_v=c_f-\|\dot{\mathbf x}_a\|,
$$

then

$$
\delta\mu_v
\approx
\Delta_M\,
\mathbf a_{a}^{\mathrm{margin}}
\cdot
\left(-\frac{\dot{\mathbf x}_a}{\|\dot{\mathbf x}_a\|}\right).
$$

If the active margin is the receiver-normal factor

$$
D_{T,ab}=c_f-\dot{\mathbf x}_a\cdot\hat{\mathbf r}_{ab},
$$

then the first-order velocity contribution is

$$
\delta D_{T,ab}
\approx
\Delta_M\,
\mathbf a_a^{\mathrm{margin}}
\cdot(-\hat{\mathbf r}_{ab}).
$$

If the active margin is the source-normal factor

$$
D_{s,ab}=c_f-\dot{\mathbf x}_b\cdot\hat{\mathbf r}_{ab},
$$

then

$$
\delta D_{s,ab}
\approx
\Delta_M\,
\mathbf a_b^{\mathrm{margin}}
\cdot(-\hat{\mathbf r}_{ab}).
$$

The required margin component is therefore

$$
\mathbf a^{\mathrm{internal}}
=
\mathbf P_T(\mathbf a^{\mathrm{ans}}-\mathbf a^{\mathrm{wake}}-\mathbf a^{\mathrm{support}})
{}+\mathbf a^{\mathrm{margin}}
{}+\mathbf a^{\mathrm{null}},
$$

where $\mathbf a^{\mathrm{null}}$ lies in any same-record null direction that preserves tangent closure and the active margin to first order. With $\Delta_T=1$ and $\lambda=1$, the failed selected rows require:

| selected row | required margin for full tangent authority | minimum margin lift at $\lambda=1$ | maximum $\lambda$ without margin lift | minimum compression without margin lift |
| --- | ---: | ---: | ---: | ---: |
| $(0.8,0.2)$ | `0.06864861334723989` | `0.06556115100833444` | `-0.11786361631719419` | `1` |
| $(0.82,0.175)$ | `0.062118134857919984` | `0.0592701365617048` | `-0.13722673927764292` | `1` |
| $(0.84,0.15)$ | `0.05737213177153553` | `0.05582967761396505` | `-0.1785342041016486` | `1` |
| $(0.86,0.1)$ | `0.05171377750345005` | `0.031165094069033866` | `0.25288247830213234` | `0.7471175216978676` |

Negative maximum $\lambda$ means the row does not have enough raw causal margin to keep a `0.01` reserve even if tangent authority were compressed away entirely. Those rows require a real margin-lift mechanism, not merely a faster tangent response. The $(0.86,0.1)$ row is different: it can pass without margin lift only if the retained mechanism reduces the needed tangent authority by about `74.7%` or proves an effective response horizon no larger than about `25.3%` of the current normalized period.

Across the full low-authority artifact, `17` rows require nonzero margin lift under this proxy, and the maximum required lift is `0.14560190911283044`. On the selected preferred curve, the required margin-lift values are exactly the four rows listed above.

Interpretation. The internal tangent-authority equation is now explicit. The next hard proof step is to derive $\mathbf P_T\mathbf a^{\mathrm{internal}}$ from retained roots, wake-ledger memory, shielding, angular momentum, or Noether sea response, and then prove the reserve inequality $\rho_T>0$ on the same row set. Without that proof, the branch-clock-lock curve remains a useful target and not a natural braid.

### Preferred Two-Speed Route Matrix - 2026-07-02

Claim level. Priority-only analytical target plus fail-closed route matrix. The preferred-configuration intuition should now be stated as a curve-selection problem, not as a single guessed speed pair. For a declared group speed $u$, the diagnostic curve is

$$
\Gamma_{\mathrm{diag}}
=
\left\{
(u,v_{\mathrm{orb}})
:
v_{\mathrm{orb}}
\in
\operatorname*{arg\,min}_{v}
\mathcal J(u,v),
\quad
\mathcal S_{\mathrm{return}}=\text{bounded diagnostic return}
\right\},
$$

where $\mathcal J$ is the current branch-curve objective. A natural preferred branch would have to pass the stronger retained condition

$$
(u,v_{\mathrm{orb}})\in\Gamma_\ast
\quad\Longrightarrow\quad
\mathbf P_T\mathbf a_{\mathrm{internal}}
=
\mathbf P_T(\mathbf a_{\mathrm{ansatz}}-\mathbf a_{\mathrm{wake}}-\mathbf a_{\mathrm{support}}),
\qquad
\rho_T\ge\epsilon_\mu.
$$

Near the causal edge this is not enough by itself, because the same internal mechanism must also lift the active causal margin:

$$
\Delta_M
\langle
\mathbf a_{\mathrm{internal,margin}},
\mathbf g_\mu
\rangle
\ge
\delta\mu_{\mathrm{req}},
$$

with $\mathbf g_\mu$ chosen from the active field-speed, receiver-normal, or source-normal margin gradient. This gives the disciplined form of the intuition: a real preferred configuration is a same-record solution of the tangent equation, the margin-lift inequality, action closure, and return closure.

The route-matrix certificate [oblate-spheroid-internal-tangent-authority-certificate.mjs](../../../scripts/braid-ideal/oblate-spheroid-internal-tangent-authority-certificate.mjs) consumes the branch-clock-lock target and reserve certificate. On the low-authority preferred-curve artifacts it reports:

| Quantity | Value |
| --- | ---: |
| measured preferred-curve tangent-need rows | `13` |
| positive raw root-margin reserve rows | `10` |
| positive post-tangent-authority reserve rows | `9` |
| rows requiring margin lift | `4` |
| maximum required margin lift on the selected curve | `0.06556115100833444` |
| top-ranked route | `retained_history_tangent_projection` |
| first retained-history blocker | `held_release_seed_path_rows[*].retained_record_id` |

The same certificate now emits the scalar feasibility equation

$$
\delta\mu(\lambda_T)
=
\max\left(
0,
\epsilon_\mu+\Delta_T\lambda_T A_T-m_{\mathrm{dyn}}
\right),
$$

where $A_T$ is the measured branch-clock-lock rms tangent authority, $\lambda_T$ is the fraction of that tangent burden the internal mechanism must carry, and $m_{\mathrm{dyn}}$ is the dynamic causal-root margin. Full replacement of the assigned branch-clock lock means $\lambda_T=1$ plus an accepted same-record vector provider. Without margin lift, the allowed tangent fraction is

$$
0
\le
\lambda_T
\le
\frac{m_{\mathrm{dyn}}-\epsilon_\mu}{\Delta_T A_T}.
$$

On the selected preferred curve, this scalar test gives `9` rows where full measured tangent replacement passes without margin lift, `4` rows where full replacement requires margin lift, and `3` rows where the raw margin is already below $\epsilon_\mu$ before tangent authority is charged. The near-edge rows are therefore separated into two classes:

| selected row | required $\delta\mu(1)$ | max $\lambda_T$ without margin lift | raw margin passes at $\lambda_T=0$ |
| --- | ---: | ---: | --- |
| $(0.8,0.2)$ | `0.06556115100833444` | `-0.11786361631719419` | no |
| $(0.82,0.175)$ | `0.0592701365617048` | `-0.13722673927764292` | no |
| $(0.84,0.15)$ | `0.05582967761396505` | `-0.1785342041016486` | no |
| $(0.86,0.1)$ | `0.031165094069033866` | `0.25288247830213234` | yes |

This is a scalar rms proxy, not a vector provider proof. It is useful because it states the exact replacement burden: the first three near-edge rows need a margin provider even if the tangent burden were compressed away; the $(0.86,0.1)$ row has enough raw margin, but only about one quarter of the measured tangent authority can be applied without margin lift. A retained provider must still supply the vector equation, not just the scalar inequality.

The vector compatibility condition is sharper. Let

$$
\mathbf T
=
\mathbf P_T
\left(
\mathbf a_{\mathrm{ansatz}}
-\mathbf a_{\mathrm{wake}}
-\mathbf a_{\mathrm{support}}
\right)
$$

be the required tangent target on the retained row, and let $\mathbf G_\mu$ be the velocity-gradient vector of the active causal-margin factor across the receiver/source slots. Any internal replacement has the form

$$
\mathbf a_{\mathrm{internal}}
=
\mathbf T+\mathbf n,
\qquad
\mathbf P_T\mathbf n=0,
$$

where $\mathbf n$ lies in the tangent-null space. If $\mathbf P_N=I-\mathbf P_T$ is the tangent-null projector, the margin-lift requirement is

$$
\langle\mathbf T,\mathbf G_\mu\rangle
+
\langle\mathbf n,\mathbf P_N\mathbf G_\mu\rangle
\ge
\frac{\delta\mu_{\mathrm{req}}}{\Delta_M}.
$$

Thus the minimum tangent-null correction, when $\|\mathbf P_N\mathbf G_\mu\|>0$, is

$$
\mathbf n_\ast
=
\max\left(
0,
\frac{\delta\mu_{\mathrm{req}}}{\Delta_M}
-\langle\mathbf T,\mathbf G_\mu\rangle
\right)
\frac{\mathbf P_N\mathbf G_\mu}
{\|\mathbf P_N\mathbf G_\mu\|^2}.
$$

If $\|\mathbf P_N\mathbf G_\mu\|=0$, the tangent solution itself must already satisfy

$$
\langle\mathbf T,\mathbf G_\mu\rangle
\ge
\frac{\delta\mu_{\mathrm{req}}}{\Delta_M};
$$

otherwise that row is vector-incompatible for the declared active margin channel without changing the tangent target, changing the active margin channel, or adding a different same-record provider. This is the first actual vector solvability condition for replacing the assigned branch-clock lock. The current artifact records `0` accepted vector providers and `13` vector-provider-missing rows, so the theorem target is now precise but still unsatisfied.

The vector condition also gives the least-norm provider equation. When the tangent target $\mathbf T$, active margin gradient $\mathbf G_\mu$, tangent-null projector $\mathbf P_N$, and margin requirement are known on the same retained record, the minimum tangent-null replacement is

$$
\boxed{
\mathbf a_{\mathrm{provider}}^\ast
=
\mathbf T+\mathbf n_\ast
}
$$

with $\mathbf n_\ast$ as above. It satisfies the tangent replacement condition

$$
\mathbf P_T\mathbf a_{\mathrm{provider}}^\ast=\mathbf T,
$$

and must satisfy the post-provider root-margin condition

$$
m_{\mathrm{dyn}}
-\Delta_T\|\mathbf P_T\mathbf a_{\mathrm{provider}}^\ast\|
+\Delta_M\langle\mathbf a_{\mathrm{provider}}^\ast,\mathbf G_\mu\rangle
\ge
\epsilon_\mu.
$$

Equivalently, the provider solves a constrained minimum-norm problem:

$$
\operatorname*{minimize}_{\mathbf n}\|\mathbf n\|,
\qquad
\mathbf P_T\mathbf n=0,
\qquad
m_{\mathrm{dyn}}
-\Delta_T\|\mathbf T\|
+\Delta_M\langle\mathbf T+\mathbf n,\mathbf G_\mu\rangle
\ge
\epsilon_\mu.
$$

This is the cleanest current form of the preferred-configuration intuition. The solver has found a diagnostic translation/orbital-velocity curve; the analysis now says exactly what internal vector provider would have to exist along that curve. The current certificate emits the equation but keeps it non-authorizing: there are still `0` accepted least-norm vector providers and `13` provider-equation rows missing same-record vectors. The required rows are the retained tangent-target vector row, active causal-margin gradient vector row, tangent-null projection row, least-norm provider acceleration vector row, post-provider root-margin row, same-record retained root ledger, and same-record action-closure row.

The certificate now also has a diagnostic witness evaluator for a future retained vector row. Given same-record vectors

$$
\mathbf T,\quad
\mathbf G_\mu,\quad
\mathbf P_T,\quad
\mathbf P_N,\quad
\mathbf a_{\mathrm{provider}},
$$

and row scalars $m_{\mathrm{dyn}}$, $\Delta_T$, $\Delta_M$, and $\epsilon_\mu$, the evaluator checks

$$
\|\mathbf P_T\mathbf a_{\mathrm{provider}}-\mathbf T\|
\le
\epsilon_{\mathrm{vec}},
$$

$$
\|\mathbf a_{\mathrm{provider}}-(\mathbf T+\mathbf n_\ast)\|
\le
\epsilon_{\mathrm{vec}},
$$

and

$$
m_{\mathrm{dyn}}
-\Delta_T\|\mathbf P_T\mathbf a_{\mathrm{provider}}\|
+\Delta_M\langle\mathbf a_{\mathrm{provider}},\mathbf G_\mu\rangle
\ge
\epsilon_\mu.
$$

This is not yet accepted evidence. It is the precise pass/fail surface for the next retained solver output: a mathematical witness can pass these equations and still remain non-authorizing unless the same record also carries an accepted retained-root ledger, action-closure row, provider acceleration vector row, and post-provider root-margin row.

The current artifact also constructs a normalized diagnostic witness from the scalar row burden:

$$
\mathbf T=[A_T,0],
\qquad
\mathbf G_\mu=[0,1],
\qquad
\mathbf P_T=
\begin{bmatrix}
1&0\\
0&0
\end{bmatrix},
\qquad
\mathbf P_N=
\begin{bmatrix}
0&0\\
0&1
\end{bmatrix},
$$

and

$$
\mathbf a_{\mathrm{provider}}
=
\left[
A_T,\,
\frac{\delta\mu_{\mathrm{req}}}{\Delta_M}
\right],
\qquad
\delta\mu_{\mathrm{req}}
=
\max(0,\epsilon_\mu+\Delta_TA_T-m_{\mathrm{dyn}}).
$$

This is a local two-axis algebraic model: the first axis is the measured tangent-authority direction, and the second axis is a unit tangent-null direction that lifts the active margin. It answers a narrower question than the retained solver must answer. It shows that the least-norm equation is internally consistent whenever the row has scalar inputs and a nonzero margin-lift response horizon; it does not show that the Noether braid actually supplies that tangent-null direction. In the focused test row, $A_T=0.1$, $m_{\mathrm{dyn}}=0.025$, $\Delta_T=1$, $\Delta_M=1$, and $\epsilon_\mu=0.01$, so the normalized witness uses $\delta\mu_{\mathrm{req}}=0.085$ and $\mathbf a_{\mathrm{provider}}=[0.1,0.085]$. The evaluator passes the tangent and margin equations while keeping `accepted=false`.

The next retained-solver source target is now explicit. A same-record provider row must replace the normalized two-axis basis with actual global retained acceleration vectors over the declared architrino slot order. The required vector rows are:

| Required row | Required equation or data |
| --- | --- |
| `retained_solver_tangent_target_vector_row` | $\mathbf T=\mathbf P_T(\mathbf a_{\mathrm{ansatz}}-\mathbf a_{\mathrm{wake}}-\mathbf a_{\mathrm{support}})$ with `a_ansatz_vector`, `a_wake_vector`, `a_support_vector`, `surface_normal_vectors`, `tangent_projector_matrix`, and `tangent_target_vector` |
| `active_causal_margin_gradient_vector_row` | $\mathbf G_\mu$ as the gradient of the active $\min(c_f-\|\mathbf v\|,D_s,D_T)$ factor in the same global acceleration vector space, with an active margin channel and event reference |
| `same_record_provider_acceleration_vector_row` | $\mathbf a_{\mathrm{provider}}^\ast=\mathbf T+\mathbf n_\ast$ with provider provenance and accepted provider reference |
| `post_provider_root_margin_row` | $m_{\mathrm{dyn}}-\Delta_T\|\mathbf P_T\mathbf a_{\mathrm{provider}}^\ast\|+\Delta_M\langle\mathbf a_{\mathrm{provider}}^\ast,\mathbf G_\mu\rangle\ge\epsilon_\mu$ |
| `same_record_closure_rows` | Same retained-root ledger, action-closure row, wake-history reference, and path-history reference for all vector rows |

The first missing object is now `same_record_retained_solver_vector_rows_for_internal_tangent_authority`, specifically `retained_solver_vector_witness_rows[*].same_record_provider_acceleration_vector_row`. This sharpens the proof burden: an algebraic witness can pass in the normalized basis, but the assigned branch-clock lock is not replaceable until the central retained solver emits these same-record vectors and the evaluator passes on those vectors.

The certificate can now evaluate that next level when a candidate same-record vector row exists. The row-level evaluator consumes a global acceleration vector over the declared architrino slot order and checks the same least-norm equation on actual vectors rather than on the normalized two-axis diagnostic basis:

$$
\mathbf T=\mathbf P_T(\mathbf a_{\mathrm{ansatz}}-\mathbf a_{\mathrm{wake}}-\mathbf a_{\mathrm{support}}),
\qquad
\mathbf a_{\mathrm{provider}}^\ast=\mathbf T+\mathbf n_\ast,
$$

with $\mathbf G_\mu$ and $\mathbf P_N$ supplied by the active causal-margin row on the same retained record. A six-slot fixture can pass this vector equation with $\mathbf T=[0.1,0,0,0,0,0]$, $\mathbf G_\mu=[0,1,0,0,0,0]$, and $\mathbf a_{\mathrm{provider}}^\ast=[0.1,0.085,0,0,0,0]$, but it remains non-authorizing. This separates the proof ladder into three clean levels: normalized scalar-derived algebra, same-record global-vector mathematical pass, and accepted central retained-solver evidence. Only the third level can replace the assigned branch-clock lock.

The candidate retained-history response equation is now executable as its own mathematical witness:

$$
\mathbf a_{\mathrm{RH}}
=-\mathbf P_T(\mathbf K_x\mathbf e_x+\mathbf K_v\mathbf e_v),
\qquad
\mathbf a_{\mathrm{provider}}^{\mathrm{RH}}
=\mathbf a_{\mathrm{RH}}+\mathbf n_\ast.
$$

Here $\mathbf e_x$ and $\mathbf e_v$ are the same-record retained path-position and velocity errors, while $\mathbf K_x$ and $\mathbf K_v$ are retained-history response matrices. This is the internal-response form of the branch-clock-lock intuition: the tangent authority is not assigned as an external clock lock, but derived from a retained path-history displacement and velocity response. The witness passes only if

$$
\|\mathbf a_{\mathrm{RH}}-\mathbf T\|\le\epsilon_{\mathrm{vec}}
$$

and the same post-provider root-margin inequality passes. In the executable six-slot test, $\mathbf e_x=[-0.02,0,0,0,0,0]$ and $\mathbf K_x$ maps that error to $\mathbf a_{\mathrm{RH}}=[0.1,0,0,0,0,0]$; the same margin-lift component $0.085$ then restores the reserve. This is still non-authorizing because the response matrices, retained path-error row, retained-root ledger, action-closure row, and provider provenance are not accepted central retained-solver rows. It does, however, make the replacement equation concrete: an accepted internal tangent authority must be a retained-history response whose tangent projection equals $\mathbf P_T(\mathbf a_{\mathrm{ansatz}}-\mathbf a_{\mathrm{wake}}-\mathbf a_{\mathrm{support}})$ and whose tangent-null component preserves the causal-root margin.

The retained-history response now has a root-ledger differential carrier, not only a fitted gain matrix. For each retained source/receiver pair, the central row must expose the causal-root residual

$$
\Phi_{ab}(t,\tau;q)
=\|\mathbf x_a(t;q)-\mathbf x_b(t-\tau;q)\|^2-c_f^2\tau^2
=0,
$$

and, when the root Jacobian is away from zero, the sensitivity equation

$$
\partial_i\tau_{ab}
=-\frac{\partial_i\Phi_{ab}}{\partial_\tau\Phi_{ab}}.
$$

This makes $\mathbf e_x$, $\mathbf e_v$, and $\mathbf G_\mu$ downstream of the same retained path-history rows and retained-root detail rows, not free diagnostic fits. The retained-root detail carrier must supply the root-detail identity, residual, `jacobian`, source-normal denominator, receiver-normal factor, branch weight, root kind, entry kind, status code, and state flags on the same retained record. Claim level: priority-only. The executable carrier sharpens the proof route, but it still requires accepted central root-detail, path-history, action, wake, provider-provenance, and acceptance-certificate refs before it can replace the assigned branch-clock lock.

The response matrices need not be freely assigned. If the same-record retained path-error vector

$$
\mathbf z=
\begin{bmatrix}
\mathbf e_x\\
\mathbf e_v
\end{bmatrix}
$$

is nonzero, the minimum-Frobenius-norm gain that satisfies $-\mathbf P_T\mathbf K\mathbf z=\mathbf T$ is

$$
\mathbf K_x^\ast
=
-\frac{\mathbf T\mathbf e_x^\top}{\|\mathbf e_x\|^2+\|\mathbf e_v\|^2},
\qquad
\mathbf K_v^\ast
=
-\frac{\mathbf T\mathbf e_v^\top}{\|\mathbf e_x\|^2+\|\mathbf e_v\|^2},
$$

with

$$
\mathbf a_{\mathrm{RH}}^\ast
=-\mathbf P_T(\mathbf K_x^\ast\mathbf e_x+\mathbf K_v^\ast\mathbf e_v).
$$

This removes one layer of arbitrariness from the internal tangent-authority target. The retained-history response can now be tested as a same-record minimum-gain law, not merely as a hand-selected pair of matrices. In the six-slot fixture, the formula recovers $\mathbf K_x^\ast[0,0]=5$ from $\mathbf T=[0.1,0,0,0,0,0]$ and $\mathbf e_x=[-0.02,0,0,0,0,0]$, while $\mathbf K_v^\ast=0$. If $\|\mathbf e_x\|^2+\|\mathbf e_v\|^2=0$, the gain evaluator fails closed because no retained-history displacement or velocity signal exists from which an internal tangent response can be inferred.

The certificate can now consume a same-record minimum-gain witness row rather than only an isolated mathematical candidate. The row binds these inputs to one retained record:

| Required row | Required equation or data |
| --- | --- |
| `same_record_retained_path_error_row` | $\mathbf e_x$ and $\mathbf e_v$ from the same retained path-history record and declared architrino slot order |
| `retained_solver_tangent_target_vector_row` | $\mathbf T=\mathbf P_T(\mathbf a_{\mathrm{ansatz}}-\mathbf a_{\mathrm{wake}}-\mathbf a_{\mathrm{support}})$ |
| `active_causal_margin_gradient_vector_row` | $\mathbf G_\mu$ and $\mathbf P_N$ for the active causal-margin channel on the same retained record |
| `post_provider_root_margin_row` | $m_{\mathrm{dyn}}$, $\Delta_T$, $\Delta_M$, $\epsilon_\mu$, and the post-provider margin condition |
| `same_record_closure_rows` | retained-root ledger, action closure, wake-history reference, and path-history reference |

A six-slot same-record fixture can pass the minimum-gain equation, recover $\mathbf K_x^\ast[0,0]=5$, reconstruct $\mathbf a_{\mathrm{RH}}^\ast=\mathbf T$, and pass the post-provider margin check. It still remains non-authorizing. This adds a fourth rung to the proof ladder: normalized scalar-derived algebra, same-record global-vector provider pass, same-record retained-history minimum-gain pass, and accepted central retained-solver evidence. Only the accepted central retained-solver row can replace the assigned branch-clock lock or move the preferred configuration from diagnostic to retained branch claim.

The central retained-history request now exposes that fourth rung as an explicit solver contract. The row [central-solver-retained-history-row.mjs](../../../scripts/braid-ideal/central-solver-retained-history-row.mjs) emits `central_solver_internal_tangent_authority_vector_request.v0`, and the provider object passes it through unchanged. The request names the exact same-record row families consumed by the internal tangent-authority evaluator:

1. `same_record_retained_path_error_row`;
2. `same_record_retained_root_ledger_detail_rows`;
3. `retained_solver_tangent_target_vector_row`;
4. `active_causal_margin_gradient_vector_row`;
5. `post_provider_root_margin_row`;
6. `same_record_action_closure_row`;
7. `same_record_closure_rows`.

This is the current bridge between the preferred $(u,v_{\mathrm{orb}})$ curve and the retained solver. It asks the central solver to emit $\mathbf e_x$, $\mathbf e_v$, retained-root detail rows, $\mathbf T$, $\mathbf G_\mu$, $\mathbf P_T$, $\mathbf P_N$, $m_{\mathrm{dyn}}$, $\Delta_T$, $\Delta_M$, $\epsilon_\mu$, and a same-record action closure row on one retained record so the minimum-gain evaluator can run against actual retained path history instead of fixtures. The request remains non-authorizing: `minimum_norm_retained_history_gain_witness_row_ref`, `retained_solver_vector_witness_row_ref`, and `accepted_internal_tangent_authority_ref` are all null. The first source target is still `same_record_retained_solver_vector_rows_for_internal_tangent_authority`; the specific missing field is `central_solver_retained_history_row.internal_tangent_authority_vector_request.minimum_norm_retained_history_gain_witness_row_ref`.

The action closure precondition is deliberately narrow:

$$
\left|
\Delta A_{\mathrm{internal}}(q)
-\Delta A_{\mathrm{clock}}(q)
\right|
\le
\epsilon_A.
$$

It does not prove the retained solver has accepted action accounting. It prevents a false branch-clock replacement theorem in which $\mathbf a_{\mathrm{internal}}^\ast$ matches the tangent acceleration and preserves the positive root margin but changes the same-record action increment. The row is therefore another mathematical pass condition, not accepted evidence: it must share the retained record and `source_row_id` with the minimum-gain, retained-vector, preferred-curve, and retained-root detail rows.

The bridge is now executable as a separate fail-closed artifact. The script [central-solver-internal-tangent-authority-vector-rows.mjs](../../../scripts/braid-ideal/central-solver-internal-tangent-authority-vector-rows.mjs) consumes a central retained-history row plus candidate minimum-gain, retained-vector witness, retained-root detail, same-record action closure, and preferred-curve rows, binds them back to the request retained record, and runs the existing evaluators. This creates a concrete five-step source ladder:

1. a retained-history row emits `central_solver_internal_tangent_authority_vector_request.v0`;
2. candidate same-record rows are evaluated by `central_solver_internal_tangent_authority_vector_rows.v0`;
3. retained-root detail rows are checked for the causal-root residual/sensitivity carrier, nonzero `jacobian`, nonzero source-normal denominator, and same-record binding;
4. same-record action closure rows are checked for $\left|\Delta A_{\mathrm{internal}}-\Delta A_{\mathrm{clock}}\right|\le\epsilon_A$;
5. the internal tangent-authority certificate can consume the same rows and report whether the preferred-curve equation passes mathematically.

In the executable bridge fixture, the same retained record carries $\mathbf e_x=[-0.02,0,0,0,0,0]$, $\mathbf T=[0.1,0,0,0,0,0]$, $\mathbf G_\mu=[0,1,0,0,0,0]$, $\mathbf P_T$, $\mathbf P_N$, $m_{\mathrm{dyn}}=0.025$, $\Delta_T=1$, $\Delta_M=1$, and $\epsilon_\mu=0.01$, plus retained-root detail rows with zero causal-root residual, nonzero `jacobian`, nonzero source-normal denominator, branch weight, receiver-normal factor, and the same `source_row_id` as the minimum-gain, retained-vector, preferred-curve, and action-closure rows. The bridge recovers the minimum-gain response, checks the retained-vector provider, checks the retained-root differential carrier, checks the action increment residual, and reports `same_record_preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked`. If the preferred-curve math passes but root-detail rows are absent, it reports `preferred_curve_passed_retained_root_ledger_detail_rows_missing`; if action closure rows are absent, it reports `preferred_curve_passed_same_record_action_closure_rows_missing`; if retained-root detail rows or action closure rows use a different `source_row_id`, it reports `fail_closed_same_record_source_row_binding_missing`. That is a useful success marker under the existing proof route: the algebraic replacement can now be evaluated at the central-row boundary only when the root differential carrier and the action increment check are present on the same branch row. It is not accepted internal tangent authority, because the bridge still lacks the central retained-history acceptance certificate, retained-root ledger, accepted action closure, wake history, path history, and provider provenance required to replace the assigned branch-clock lock.

The preferred-curve equation is now explicit and executable. The script [preferred-curve-internal-tangent-authority-equation.mjs](../../../scripts/braid-ideal/preferred-curve-internal-tangent-authority-equation.mjs) consumes a preferred near-edge finite-difference row plus a same-source minimum-gain retained-history witness row. It first derives the local preferred-curve tangent from the branch-objective stationarity condition. If $q=(u,v_{\mathrm{orb}})$ and $J(q)$ is the diagnostic branch objective, then the sampled preferred curve $v_\ast(u)$ obeys

$$
J_u+J_v v_\ast'(u)=0,
\qquad
v_\ast'(u)=-\frac{J_u}{J_v},
$$

when $J_v\ne0$. This is not a physical law; it is the local differential form of the diagnostic preferred-curve selection. It lets the tangent-authority equation be written as a function of the sampled translation/orbital-velocity row rather than as a free row-level assertion.

At each such row the candidate internal authority equation is:

$$
\mathbf T(q)
=
\mathbf P_T\bigl(
\mathbf a_{\mathrm{ansatz}}(q)
-\mathbf a_{\mathrm{wake}}(q)
-\mathbf a_{\mathrm{support}}(q)
\bigr),
$$

$$
\mathbf K_x^\ast(q)
=
-\frac{\mathbf T(q)\mathbf e_x^\top}
{\|\mathbf e_x\|^2+\|\mathbf e_v\|^2},
\qquad
\mathbf K_v^\ast(q)
=
-\frac{\mathbf T(q)\mathbf e_v^\top}
{\|\mathbf e_x\|^2+\|\mathbf e_v\|^2},
$$

$$
\mathbf a_{\mathrm{RH}}^\ast(q)
=
-\mathbf P_T\bigl(
\mathbf K_x^\ast(q)\mathbf e_x
+\mathbf K_v^\ast(q)\mathbf e_v
\bigr).
$$

The margin-preserving component is the least tangent-null lift

$$
\mathbf n_\ast(q)=\lambda_+(q)\mathbf P_N\mathbf G_\mu(q),
$$

with

$$
\lambda_+(q)
=
\max\left(
0,\,
\frac{
\epsilon_\mu
+\Delta_T\|\mathbf T(q)\|
-m_{\mathrm{dyn}}
-\Delta_M\langle\mathbf T(q),\mathbf G_\mu(q)\rangle}
{\Delta_M\|\mathbf P_N\mathbf G_\mu(q)\|^2}
\right),
$$

so the candidate replacement is

$$
\mathbf a_{\mathrm{internal}}^\ast(q)
=
\mathbf a_{\mathrm{RH}}^\ast(q)+\mathbf n_\ast(q),
$$

and the required positive causal-root margin is

$$
m_{\mathrm{dyn}}
-\Delta_T\|\mathbf P_T\mathbf a_{\mathrm{internal}}^\ast(q)\|
+\Delta_M\langle\mathbf a_{\mathrm{internal}}^\ast(q),\mathbf G_\mu(q)\rangle
\ge
\epsilon_\mu.
$$

The executable artifact binds the near-edge curve row and the minimum-gain row by the same `source_row_id`, and it requires the positive dynamic root margin used by the curve row to match the dynamic root margin used by the minimum-gain row. In the focused fixture, the local branch objective has $J_u=-0.25$ and $J_v=0.5$, so $v_\ast'(u)=0.5$ and the directional objective derivative along $(1,0.5)$ is zero to numerical precision. The same source row carries $\mathbf e_x=[-0.02,0,0,0,0,0]$, $\mathbf e_v=0$, $\mathbf T=[0.1,0,0,0,0,0]$, $\mathbf G_\mu=[0,1,0,0,0,0]$, $m_{\mathrm{dyn}}=0.025$, $\Delta_T=1$, $\Delta_M=1$, and $\epsilon_\mu=0.01$. The artifact reports `preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked`.

This is the strongest current analytical form of the active target. It does not prove that the Noether braid supplies the response. It proves the candidate equation is now stated at the preferred-curve level: a row on the sampled $(u,v_{\mathrm{orb}})$ curve can ask for a same-source retained-history minimum-gain response, the response can replace the assigned tangent branch-clock lock algebraically, and the tangent-null component can preserve the positive causal-root margin. The remaining proof burden is still accepted central retained-solver evidence: retained path-history errors, retained-root ledger, wake history, action closure, provider provenance, and an acceptance certificate on the same retained record.

The central retained-history request and vector-row bridge now require this preferred-curve equation rung. The request's equation map includes the stationarity equation $J_u+J_vv_\ast'(u)=0$, the slope $v_\ast'(u)=-J_u/J_v$, and the curve-parameterized internal provider $\mathbf a_{\mathrm{internal}}^\ast(q)=\mathbf a_{\mathrm{RH}}^\ast(q)+\mathbf n_\ast(q)$. The bridge [central-solver-internal-tangent-authority-vector-rows.mjs](../../../scripts/braid-ideal/central-solver-internal-tangent-authority-vector-rows.mjs) no longer treats a same-record minimum-gain row plus retained-vector row as enough to pass the full target. If those vector rows pass but no preferred-curve equation artifact is supplied, it reports `minimum_gain_and_vector_pass_preferred_curve_equation_missing`.

With a preferred-curve equation artifact, retained-root detail rows, and action closure rows on the same retained record, the central bridge now reports `same_record_preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked`. This is a sharper success marker than the previous vector-only pass. It says the candidate replacement has satisfied all currently executable mathematical checks: preferred-curve differential, same-source row binding across minimum-gain, vector, preferred-curve, root-detail, and action rows, dynamic root-margin binding, retained-root differential conditioning, same-record action-increment closure, retained-history minimum-gain response, retained-vector provider check, and positive-margin equation. It still remains non-authorizing because the central retained-history acceptance certificate and accepted same-record retained-root/action/wake/path/provider provenance are missing.

The preferred-curve equation artifact now also emits `preferred_curve_branch_clock_lock_replacement_criterion.v0`. This is the conditional removal theorem for the assigned branch-clock lock: if the preferred-curve equation passes on one source row and the same retained record carries accepted refs for the central retained-history certificate, preferred-curve internal tangent-authority certificate, retained path-error row, tangent-target row, active causal-margin gradient row, post-provider root-margin row, retained-root ledger, action-closure row, wake-history row, path-history row, and provider provenance, then the assigned branch-clock lock is algebraically replaceable by $\mathbf a_{\mathrm{RH}}^\ast(q)+\mathbf n_\ast(q)$ while preserving the positive causal-root margin. The criterion deliberately keeps `candidate_artifact_authorizes_removal=false`; it can say the mathematical and evidence preconditions are present, but it cannot promote itself to accepted internal tangent authority.

The criterion now has one more executable precondition: a branch-clock-lock replacement residual. The same-source tangent target must match the measured assigned clock-lock acceleration scale,

$$
\left|
\|\mathbf T(q)\|
-A_{\mathrm{clock,rms}}(q)
\right|
\le
\epsilon_{\mathrm{lock}}.
$$

This residual is deliberately narrow. It does not prove the Noether braid produces $\mathbf T(q)$; it only prevents a false replacement theorem where the retained-history target solves the tangent equation at one scale while the diagnostic branch-clock lock supplied a different acceleration scale. The executable row `preferred_curve_branch_clock_lock_replacement_residual.v0` reports the tangent-target norm, the assigned branch-clock-lock rms acceleration, the absolute residual, the relative residual, and `replacement_residual_passed`. Even if all accepted same-record evidence refs are supplied, the conditional removal theorem fails unless this residual passes. In the focused fixture, $\|\mathbf T\|=0.1$ and $A_{\mathrm{clock,rms}}=0.1$, so the residual passes. A negative-control row with $A_{\mathrm{clock,rms}}=0.12$ keeps the preferred-curve equation mathematically passed but blocks `branch_clock_lock_replacement_criterion_passed`. This keeps the preferred translation/orbital-velocity curve honest: the curve is interesting only if the internal response can replace the same tangent burden the assigned branch clock actually carried.

The central retained-history bridge now carries the same precondition. The request `central_solver_internal_tangent_authority_vector_request.v0` includes

$$
\left|
\|\mathbf T(q)\|
-A_{\mathrm{clock,rms}}(q)
\right|
\le
\epsilon_{\mathrm{lock}},
$$

and [central-solver-internal-tangent-authority-vector-rows.mjs](../../../scripts/braid-ideal/central-solver-internal-tangent-authority-vector-rows.mjs) refuses to report a full bridge pass unless the preferred-curve artifact also has `branch_clock_lock_replacement_residual_passed=true`. The bridge summary now separates `preferred_curve_equation_core_mathematical_pass_count` from `preferred_curve_equation_mathematical_pass_count`, where the latter means replacement-ready math rather than stationarity alone. This separates three cases that were previously too close: vector rows can pass the retained-history minimum-gain equation, preferred-curve stationarity can pass, and the branch-clock replacement residual can still fail. The negative-control bridge row uses the same retained record and the same vector provider but changes $A_{\mathrm{clock,rms}}$ from `0.1` to `0.12`; it reports `fail_closed_preferred_curve_branch_clock_lock_replacement_residual_failed`. The remaining accepted-evidence blocker is therefore sharper: the central retained solver must emit same-record vector rows whose tangent target matches the actual assigned clock-lock burden and whose provider preserves the causal-root margin.

The central bridge also now emits `central_solver_internal_tangent_authority_accepted_bridge_criterion.v0`. This criterion does not authorize the bridge; it lists the exact accepted same-record refs required before the assigned branch-clock lock can be replaced at the central retained-solver boundary:

- `central_retained_history_acceptance_certificate_ref`;
- `central_internal_tangent_authority_vector_rows_acceptance_certificate_ref`;
- `preferred_curve_internal_tangent_authority_acceptance_certificate_ref`;
- `same_record_retained_path_error_row_ref`;
- `minimum_norm_retained_history_gain_witness_row_ref`;
- `retained_solver_vector_witness_row_ref`;
- `retained_solver_tangent_target_vector_row_ref`;
- `active_causal_margin_gradient_vector_row_ref`;
- `same_record_provider_acceleration_vector_row_ref`;
- `post_provider_root_margin_row_ref`;
- `branch_clock_lock_replacement_residual_row_ref`;
- `same_record_retained_root_ledger_ref`;
- `same_record_retained_root_ledger_detail_rows_ref`;
- `same_record_action_closure_row_ref`;
- `same_record_wake_history_ref`;
- `same_record_path_history_ref`;
- `same_record_provider_provenance_ref`.

A bridge row can now satisfy the mathematical route and still fail the accepted-evidence criterion. A fixture with all accepted refs supplied reports `accepted_bridge_criterion_conditionally_satisfied_by_declared_same_record_evidence`, while still keeping `accepted=false` and `candidate_artifact_authorizes_removal=false`. This makes the current blocker exact rather than narrative: the next central solver advance must provide those same-record accepted refs, not merely another diagnostic vector row.

The accepted bridge criterion now also requires explicit same-record/source-row binding. The accepted-evidence bundle must carry `retained_record_id` equal to the retained request row, and `source_row_id` must be one of the source rows shared by a passing minimum-gain row, passing retained-vector row, passing preferred-curve equation artifact, passing retained-root detail row set, and passing action-closure row. This prevents an accepted-looking ref bundle from satisfying the criterion unless the refs are attached to the same retained record and the same two-speed branch row that actually passed the tangent-authority math. In proof terms, the accepted authority cannot be a cross-row collage: the row that supplies the retained path error, tangent target, margin gradient, provider vector, retained-root detail rows, action closure row, root/wake/path ledgers, provider provenance, and branch-clock replacement residual must be the row whose tangent equation and positive causal-margin equation passed.

The producer boundary is now executable as `central_solver_retained_source_adapter.v0`. This adapter is not another tangent equation; it is the narrow source object that tries to turn the central solver's native path-history and root-ledger surfaces into one retained-record carrier for the bridge. Its required same-record bundle is:

1. six held-release seed path rows with one retained record id;
2. six durable path-history stream manifest refs using `path_segment.v1`;
3. one central retained-history provider object ref;
4. one preferred-curve `source_row_id`;
5. thirty-six native root-ledger detail refs using `root_ledger_detail.v1`, covering six same-source self-hit requirements and thirty directed partner causal-root replay requirements;
6. thirty-six causal-root replay refs for the same root requirements;
7. one same-record action-closure ref;
8. one retained wake-history ref;
9. one adapter acceptance certificate.

The adapter has three useful fail-closed states. With no retained record id it stops at `held_release_seed_path_rows[*].retained_record_id`. With a provider-backed retained record and six durable streams but no preferred-curve row, it stops at `central_solver_retained_source_adapter.same_record_binding.source_row_id`. With retained record, source row, durable streams, root detail refs, causal replay refs, action closure, and wake history present, it stops at `central_solver_retained_source_adapter.acceptance_certificate_ref`. This is the first source-side object in this lane that binds native path-history streams, native root-ledger detail, causal replay, action closure, wake history, provider provenance, retained record id, and the preferred-curve row identity before the central bridge consumes the rows. It still remains non-authorizing: `accepted_retained_source_adapter_ref=null`, every retained-branch authorization flag is false, and the schema cannot itself declare accepted internal tangent authority.

The route rows are deliberately non-authorizing. They say that the preferred translation/orbital-velocity idea does play out as an interesting diagnostic curve, but the curve cannot become a stable Noether braid claim until one route supplies both the tangent authority and the causal-margin lift on a retained record. The ranked candidate routes are retained-history tangent projection, same-ledger action-measure tangent response, wake-ledger tangent response, angular-momentum plus shielding response, and Noether sea response.

Overall interpretation. The preferred-configuration intuition now has a sharper conditional form. With no tangential branch-clock term, the probe fails by support expansion or field-speed crossing. With normal support plus a tangent branch-clock lock, a bounded diagnostic branch appears and tends to move toward the causal edge: higher $u$, $v_{\mathrm{orb}}\approx0.175$ to `0.2`, lower residual, small action drift near the `0.2` orbital-speed rows, and rapidly shrinking root margin. The branch is not a breakthrough stable braid because the lock is externally assigned from the ansatz. The mathematical target is now precise: derive an internal retained-history term whose tangent projection approximates $\mathbf a_{\mathrm{clock}}$ while preserving $c_f=1$, positive causal-root margin, and same-record action closure.

Frequency has at least three meanings:

| Symbol | Meaning | Closure use |
| --- | --- | --- |
| $\nu_\psi=\langle\dot\psi\rangle/(2\pi)$ | azimuthal phase frequency around the spheroid pole | labeled closure requires $\Delta\psi=2\pi m$; unlabeled threefold closure may allow $\Delta\psi=2\pi m/3$ |
| $\nu_z$ | meridional or pole-return frequency of $\zeta(t)$ or $\zeta(\psi)$ | one pole-return cycle means the reduced path returns to the same $\zeta$, $\dot\zeta$, and branch-root pattern |
| $\nu_p=|\Omega|/(2\pi)$ | body-frame precession frequency | closure requires the body frame to return, or to return up to an allowed threefold permutation |

An integer-frequency branch target should therefore be stated as a resonance vector, not a single frequency:

$$
\Delta\psi=2\pi m_\psi,
\qquad
\Delta\theta_p=2\pi m_p,
\qquad
\zeta(T)=\zeta(0),
\qquad
\dot\zeta(T)=\dot\zeta(0),
$$

over a period $T$, with $m_\psi,m_p\in\mathbb Z$. If architrino labels are quotiented by the threefold permutation symmetry, the weaker closure condition $\Delta\psi=2\pi m_\psi/3$ may be acceptable for an assembly-state row, but a retained path-history row must declare whether it is labeled or quotient-level closure.

### Causal-Root Equations With Group Velocity

For any receiver $a\in\{+,k\}$ or $\{-,k\}$ and source $b\in\{+,\ell\}$ or $\{-,\ell\}$, the causal emission times $t_0=t-\tau$ are selected by

$$
\left\|
C(t)-C(t-\tau)
+
Q(t)\mathbf y_a(t)
-
Q(t-\tau)\mathbf y_b(t-\tau)
\right\|
=
c_f\tau,
\qquad
\tau>0,
$$

where $\mathbf y_{+,k}=\mathbf s_k$ and $\mathbf y_{-,k}=-\mathbf s_k$. For constant group velocity this becomes

$$
\left\|
\mathbf V_g\tau
+
Q(t)\mathbf y_a(t)
-
Q(t-\tau)\mathbf y_b(t-\tau)
\right\|
=
c_f\tau.
$$

This equation is the first place where $u/c_f$ matters. When $u<c_f$, many branches behave like ordinary delayed roots. Near $u=c_f$, source-normal denominators can become fragile. When $u>c_f$, same-source roots, multiple roots, and root-loss windows become live branch events rather than optional corrections. The reduced equations must therefore keep the full root set

$$
\mathcal C_{ab}(t)
=
\{\tau>0:\mathcal R_{ab}(t,\tau)=0\}
$$

and must not silently prune roots by assuming a sub-field-speed regime.

For each active root, define

$$
\mathbf r_{ab}(t,\tau)
=
\mathbf x_a(t)-\mathbf x_b(t-\tau),
\qquad
\hat{\mathbf r}_{ab}
=
\frac{\mathbf r_{ab}}{|\mathbf r_{ab}|}.
$$

The source-normal and receiver-normal factors are

$$
D_{s,ab}=c_f-\dot{\mathbf x}_b(t-\tau)\cdot\hat{\mathbf r}_{ab},
\qquad
D_{T,ab}=c_f-\dot{\mathbf x}_a(t)\cdot\hat{\mathbf r}_{ab},
$$

with

$$
W_{ab}^{\mathrm{rec}}
=
\left|\frac{D_{T,ab}}{D_{s,ab}}\right|.
$$

The acceleration row for receiver $a$ is then the master-equation branch sum

$$
\mathbf a_a^{\mathrm{wake}}(t)
=
\sum_b
\sum_{\tau\in\mathcal C_{ab}(t)}
\kappa\,\sigma_{ab}
\frac{|q_aq_b|}{|\mathbf r_{ab}(t,\tau)|^2}
W_{ab}^{\mathrm{rec}}(t,\tau)
\hat{\mathbf r}_{ab}(t,\tau),
$$

including $b=a$ for same-source self-hits when those roots exist.

### Reduced Residual Equations

The spheroid ansatz supplies a kinematic acceleration

$$
\mathbf a_a^{\mathrm{ans}}(t)=\ddot{\mathbf x}_a(t),
$$

computed from $C,Q,R_\perp,R_\parallel,\zeta,\psi$ and their derivatives. A branch is not certified by drawing the spheroid. It must satisfy

$$
\mathbf a_a^{\mathrm{ans}}(t)
=
\mathbf a_a^{\mathrm{wake}}(t)
+
\mathbf a_a^{\mathrm{sea}}(t)
$$

for all six architrinos on the same retained root set. Equivalently, define

$$
\mathbf E_a(t)
=
\mathbf a_a^{\mathrm{wake}}(t)
+
\mathbf a_a^{\mathrm{sea}}(t)
-
\mathbf a_a^{\mathrm{ans}}(t),
$$

and require the reduced projections to vanish:

$$
\mathcal R_{\psi,k}
=
\mathbf E_{+,k}\cdot Q\partial_\psi\mathbf s_k
=0,
$$

$$
\mathcal R_{\zeta,k}
=
\mathbf E_{+,k}\cdot Q\partial_\zeta\mathbf s_k
=0,
$$

$$
\mathcal R_{\perp,k}
=
\mathbf E_{+,k}\cdot Q\partial_{R_\perp}\mathbf s_k
=0,
\qquad
\mathcal R_{\parallel,k}
=
\mathbf E_{+,k}\cdot Q\partial_{R_\parallel}\mathbf s_k
=0.
$$

The corresponding Electrino residuals should be redundant under exact antipodal symmetry, but they must still be checked numerically in a retained solver row. The center residual is

$$
\mathcal R_C
=
\sum_a \mathbf E_a
=0.
$$

The angular residual can be written as

$$
\mathcal R_J
=
\sum_a
(\mathbf x_a-C)\times \mathbf E_a
=0,
$$

which is the reduced angular-momentum accommodation condition for the ansatz. A stable same-level row needs all of these residuals on the same root ledger.

### Optional Noether Sea Pressure Term

If nearby Noether sea response constrains the radius, the cleanest provisional form is a constraint or soft-wall term tied to the spheroid surface function $\Phi$. A hard constraint uses a Lagrange multiplier:

$$
\mathbf a_a^{\mathrm{sea}}
=
-\lambda_a(t)\,
Q\nabla_{\mathbf y}\Phi(\mathbf y_a;R_\perp,R_\parallel),
$$

with $\lambda_a$ chosen so that $\Phi(\mathbf y_a)=0$ remains true through time. A soft pressure version is

$$
\mathbf a_a^{\mathrm{sea}}
=
-K_{\mathrm{sea}}\Phi(\mathbf y_a)
Q\nabla_{\mathbf y}\Phi(\mathbf y_a)
-\Gamma_{\mathrm{sea}}\dot\Phi(\mathbf y_a)
Q\nabla_{\mathbf y}\Phi(\mathbf y_a).
$$

This is an artificial confinement model until $K_{\mathrm{sea}}$, $\Gamma_{\mathrm{sea}}$, or $\lambda_a$ are derived from a retained Noether sea response row. Its value is diagnostic: it can test whether a bounded oblate branch exists once support pressure is allowed, but it cannot by itself prove that the Noether sea supplies that pressure.

### Local Noether Sea Braid Stabilization Target

Claim level. Priority-only closure target. The optional pressure term above should not be read as a generic external wall around the ideal braid. If the Euclidean-void ideal braid keeps inflating after the first compression, the missing stabilizer may be the retained local Noether braid population in the surrounding Noether sea. In that case the relevant reduced equation is not

$$
\mathcal R_{\mathrm{ideal}}(B)=0
$$

in empty surroundings, but

$$
\mathcal R_{\mathrm{ideal}}
\left(
B;\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal H_{\partial\Omega}
\right)=0,
$$

where $\Theta_{\mathrm{sea}}$ records the local Noether sea density, cadence, orientation, strain, and delay-response state; $\Theta_{\mathrm{asm}}$ records nearby resolved assemblies and local Noether braid population data; and $\mathcal H_{\partial\Omega}$ records causal-wake and event data entering the local region through the boundary. The stabilizing acceleration should therefore have the form

$$
\mathbf a_a^{\mathrm{sea}}
=
\mathcal A_a^{\mathrm{sea}}
\left(
B,\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal H_{\partial\Omega}
\right),
$$

not a freely fitted $K_{\mathrm{sea}}$, $\Gamma_{\mathrm{sea}}$, or $\lambda_a$.

The first radial test is the post-turn return condition. If $t_\ast$ is the first compression-to-expansion turn and $R(t)$ is the common-sphere or spheroid support radius, the local Noether sea braid response must supply at least one same-record row after $t_\ast$ with

$$
\ddot R_{\mathrm{toy}}(t)
+
\Pi_R\mathcal A^{\mathrm{sea}}(t)
<0,
\qquad t>t_\ast,
$$

or else a stable-radius row

$$
\dot R(t)=0,
\qquad
\ddot R_{\mathrm{toy}}(t)+\Pi_R\mathcal A^{\mathrm{sea}}(t)=0,
\qquad
\partial_R
\left(
\ddot R_{\mathrm{toy}}+\Pi_R\mathcal A^{\mathrm{sea}}
\right)<0.
$$

The proof burden is same-record provenance. A passing row must bind the ideal braid record, the local Noether sea state, the nearby Noether braid population rows, the boundary wake record, and the action/exchange ledger. Without that binding, a pressure-looking term remains only a diagnostic support model. With that binding, the local Noether sea braid environment becomes a candidate closure mechanism for preventing ideal-braid expansion and turning the clean symmetry channel into a retained branch.

### Fixed-Frequency Solver Validation Target

A solver validation row can hold an integer resonance candidate fixed and measure residuals rather than searching blindly. Choose

$$
\Theta
=
(u,v_{\mathrm{orb}},R_\perp,\chi,\zeta_0,\omega,\Omega,K_{\mathrm{sea}})
$$

with either $v_{\mathrm{orb}}$ derived from $(R_\perp,\zeta_0,\omega)$ or $\omega$ solved from a declared $v_{\mathrm{orb}}$. Choose a period $T$ satisfying the declared closure convention. Then evaluate:

1. all causal roots $\mathcal C_{ab}(t)$, including same-source roots when they exist;
2. the residual projections $\mathcal R_\psi,\mathcal R_\zeta,\mathcal R_\perp,\mathcal R_\parallel,\mathcal R_C,\mathcal R_J$;
3. the action proxy
   $$
   \mathcal A(T)
   =
   \oint_0^T
   \sum_a
   \mu_{\mathrm{arch}}
   \dot{\mathbf x}_a\cdot d\mathbf x_a;
   $$
4. the root-ledger status: root counts, source-normal denominator floors, self-hit rows, and root-loss windows;
5. the oblate deformation and volume rows $\chi$ and $\mathcal V/\mathcal V_0$;
6. the retained branch-clock ratio $\nu_{\mathrm{branch}}/\nu_0$ or $T_{\mathrm{branch}}/T_0$;
7. the return status: whether the spheroid state closes, precesses by an allowed integer, or escapes.

Integer frequencies become interesting only after this residual test is same-record:

$$
\nu_\psi:\nu_z:\nu_p
=
m_\psi:m_z:m_p,
\qquad
m_\psi,m_z,m_p\in\mathbb Z.
$$

The first useful result would be a table of fixed-frequency rows labeled `pass`, `near_miss`, or `fail`, with failure codes separated into `root_loss`, `small_denominator`, `pressure_artifact`, `action_drift`, `same_level_loss`, and `escape`.

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
- [Equal-Frequency Energy-Radius Candidate](../braid-angular-momentum-spin/iso-frequency-energy-radius-candidate.md) preserves a related but distinct candidate: common binary frequency with distinct effective lever arms and speed rows. It explicitly avoids flattening equal frequency into equal radius, equal speed, or equal energy.
- [Noether Braid Scaling and Packing Scaffold](../braid-doubling-frequency-lock/noether-braid-scaling-and-packing.md) contains ideal rest-level pool scaling and packing material. That is useful downstream once the internal ideal-braid branch is better defined.

The new contribution here is to make `braid-ideal` a dedicated lane for the common-level six-body branch itself, including non-circular paths, translating ellipsoid support, and $h$-indexed basin patterns.

## Immediate Drill-Down Questions

1. Promote the six-point held-release into a central-solver seed with retained source histories already populated before release and same-source self-hits enabled.
2. Test whether the first same-polarity near pass preserves any symmetry-reduced same-level observable after self-hit/history stabilization is included, or whether it still splits into escape branches.
3. If a same-level observable persists, classify it as circular, non-circular but closed, quasi-periodic, or chaotic-but-bounded.
4. Test whether translation deforms the support as an ellipsoid while preserving same-level action readouts.
5. Search whether distinct basin families are indexed by $n h$, or whether same-level support exists only in isolated bands.

## Dynamo Team Insights Cross-Feed

- The ideal-braid lane is a natural local testbed for the finite-dimensional stable-manifold question: can a bounded six-body retained-history system collapse to a few same-level observables without losing root-ledger identity or action closure?
- The attractor vocabulary should stay broad enough for closed curves, quasi-periodic tori, chaotic-but-bounded basin measures, and maximum-curvature organizing centers. Do not reduce the search to circular orbits unless a specific diagnostic projection requires it.
- If a candidate same-level basin survives, the next mathematical object is a return or transfer map on retained histories with a declared basin partition, not a direct particle-identity claim.

## Axis-Neutral Transport Channel Discussion Log

This section captures the ongoing operator/agent discussion that followed the [Six-Point Symmetry Invariant Lemma Proof Packet](six-point-symmetry-invariant-lemma-proof-packet.md). Each dated entry labels every item as a lemma corollary (derived), a hypothesis, or speculation. Nothing in this log claims a retained branch, accepted evidence, or score movement.

### 2026-07-06 - Axial Dipole Identity, 120-Degree Phasing, and Transport Decomposition

Derived (lemma corollaries on the invariant channels; same claim level as the proof packet):

1. **Polarity-conjugation degeneracy.** The partner-wake master-equation kernel depends on polarity only through products $\sigma_i\sigma_j$ (same-source rows give $\sigma_i\sigma_i=+1$), so global polarity conjugation $C:\sigma_i\mapsto-\sigma_i$ leaves every trajectory identical. A positrino-face-leading braid and an electrino-face-leading braid are exactly degenerate in isolation. The leading-octant sign ($(1,1,1)$ vs $(-1,-1,-1)$) is not a physical distinction for the isolated kernel; it can become physical only through environment coupling that is not $C$-balanced. This is where the ordered-braid chirality entry $\chi_c$ and matter/antimatter selection must get their content.
2. **Drift breaks $\iota$.** Nonzero group velocity $u\hat{\mathbf n}$ is incompatible with inversion-plus-polarity-exchange invariance, so the translating braid's exact symmetry group is $C_3$ alone. Fore-aft (leading-face vs trailing-face) wake asymmetry is therefore real at $u>0$ and is the native mechanism for the mechanical-oblation channel already named in the dynamics chapter.
3. **Two-worldline reduction at drift.** $\operatorname{Fix}(C_3)$ without $\iota$ leaves exactly two free worldlines, $\epsilon_{+,x}$ and $\epsilon_{-,x}$; the other four are symmetry copies. The translating, rotating braid on the axis-neutral channel is a closed two-worldline state-dependent delay system.
4. **Exact 120-degree phasing.** On the $C_3$ channel, $\epsilon_{+,y}=\operatorname{Rot}(\hat{\mathbf n},2\pi/3)\,\epsilon_{+,x}$ identically: the three binaries are 120 degrees apart in rotational phase at every instant. Contraction along $\hat{\mathbf n}$ commutes with rotations about $\hat{\mathbf n}$, so the phasing survives Lorentz-style flattening toward the transverse plane.
5. **Axial dipole identity.** Since $\mathbb I+\varrho+\varrho^2=3\hat{\mathbf n}\hat{\mathbf n}^{\!\top}$, the polarity dipole on the $C_3$ channel is
   $$
   \sum_\ell \sigma_\ell\,\mathbf X_\ell
   =
   3\left(\hat{\mathbf n}\cdot(\epsilon_{+,x}-\epsilon_{-,x})\right)\hat{\mathbf n}
   $$
   exactly axial at all times, even with drift. Transverse dipole components cancel in balanced three-phase fashion. As the braid flattens toward the transverse plane, the axial extent shrinks and the leading polarity-signed moment vanishes: the flattened fast braid is dipole-quiet.
6. **Equal three-axis participation under contraction.** Every site has axial component $R/\sqrt3$ and transverse component $R\sqrt{2/3}$; contraction along $\hat{\mathbf n}$ deforms the three binaries identically and preserves the $C_3$ channel.

Hypotheses (testable, not yet evidence):

7. **Clock-equivalent transport direction.** The axis-neutral direction is the unique transport direction that keeps the three binaries congruent under Lorentz-style retuning; any coordinate-axis drift splits the pair clocks. Prediction for the sweep and an `NSH-AX`-style comparison: drift along $\hat{\mathbf n}$ preserves symmetric residuals; drift along $\hat x$ splits them.
8. **Transport decomposition.** On the axis-neutral channel, braid translation decomposes as group velocity along $\hat{\mathbf n}$ plus transverse orbital motion about $\hat{\mathbf n}$ — the existing two-speed $(u,v_{\mathrm{orb}})$ coordinates, now grounded by the lemma. The channel closure is a theorem; the further claim that the reduced worldlines are circular (helical paths in the absolute frame) is the rotating-wave ansatz below, not a proven consequence. Transport in a generic direction preserves no symmetry and is not covered.
9. **Shell/nested dichotomy.** The $C_3$ pair-permutation symmetry requires the three binaries to be congruent (same radius, speed, and cadence), which is exactly the shell braid / ideal same-level case. A nested shell braid with three energy-separated radii cannot carry this permutation symmetry; its symmetry content is at most per-binary plus $\iota$. The 120-degree-phased channel is therefore native to `SH-0`-class braids, and the nested shell braid is a symmetry-broken relative of it. On the `SH-0` channel the 120-degree phasing is enforced by symmetry; whether it stabilizes the branch is the open transverse-stability question, which the lemma does not decide.
10. **Eigen-braid formalization (operator term for unperturbed allowed paths).** The natural mathematical object is the rotating-wave / relative-equilibrium family: solutions of the reduced delay system of the form $\mathbf X(t)=\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X(0)+u\hat{\mathbf n}t$. On this ansatz the state-dependent delays become constant phase lags, and the delay system collapses to transcendental algebraic equations in $(R,\omega,u,\text{phases})$ whose solution set is generically discrete — a spectrum of admissible braids indexed by winding and root data. This is the exact-channel version of what `oblate_spheroid_reduced_equations` and the fixed-frequency validation rows already approximate, and it connects directly to the integer phase-closure states $k_a$ and the reduced closure label $\Lambda_{\text{NS}}$. Candidate proof-target name: `axis_neutral_rotating_wave_spectrum`.
11. **Lissajous connection.** A single-frequency rotating-wave row traces a helix, not a Lissajous figure. Lissajous-class figures appear as soon as a second frequency exists (radial breathing against rotation, or nested-layer cadences): closed Lissajous figures correspond to rational frequency locks, which are exactly the integer phase-closure labels; irrational ratios give quasi-periodic torus-filling paths. In this reading, the winding integers in $\Lambda_{\text{NS}}$ select which Lissajous-type figure closes.

Speculation (mapping intuitions; no repo evidence consumed):

12. **Koide angle.** The Koide relation $Q=(m_e+m_\mu+m_\tau)/(\sqrt{m_e}+\sqrt{m_\mu}+\sqrt{m_\tau})^2=2/3$ is equivalent to the statement that the vector $(\sqrt{m_e},\sqrt{m_\mu},\sqrt{m_\tau})$ makes angle exactly $\pi/4$ with the democratic axis $(1,1,1)$, since $\cos^2\theta=1/(3Q)$. In the present picture the democratic axis is the axis-neutral direction and the fully $C_3$-symmetric channel is $\theta=0$; the speculation is that charged-lepton generations are $C_3$-broken eigen-braids and Koide records a fixed symmetry-breaking angle of $\pi/4$ off the axis-neutral direction. Routing: this belongs with [charged-lepton-koide-residual](../braid-mass-response-map/charged-lepton-koide-residual.md) if it matures.
13. **Electron personality placement.** Where the six personality electrinos of the electron sit relative to the braid is unconstrained by this lane's evidence. Symmetry admits two natural $C_3$-compatible loci: on-axis positions (the poles of $\hat{\mathbf n}$) and 120-degree rings about $\hat{\mathbf n}$. A single origin cluster of six same-polarity architrinos is disfavored by mutual repulsion. Two counter-phased 120-degree rings straddling the braid would preserve $C_3$ and inherit the same three-phase transverse wake cancellation. This must be checked against the fermion corpus chapters before being repeated.
14. **Planar limit connections.** The dipole-quiet, planar, 120-degree-phased limit of the fast braid resembles both the terminal-alignment picture (braid symmetry-breaking point, coplanarity at $v\to c_f$) and the neutral planar assembly sought by the photon-channel bridge. Connection-level speculation only.

Terminology note: this log uses the signed polarity-unit labels $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$ per the mathematics-terminology canon; owner-script identifiers such as `P_x`/`E_x` remain stable runtime implementation identifiers.

### 2026-07-06 - Momentum Screw, Helicity, and the Axis-Neutral Channel

Derived (lemma corollaries; same claim level as the proof packet):

1. **Axial momentum identities.** By the same all-ones-projector identity used for the axial dipole, both kinematic momenta are exactly axial on the $C_3$ channel at all times, even with drift:
   $$
   \mathbf P_{\mathrm{kin}}
   =
   3\,\hat{\mathbf n}\cdot\!\left(\mathbf v_{+,x}+\mathbf v_{-,x}\right)\hat{\mathbf n},
   \qquad
   \mathbf J_{\mathrm{kin}}\parallel\hat{\mathbf n}.
   $$
   The axis-neutral direction is therefore the central axis of the braid's momentum screw: the unique direction that carries both linear and angular kinematic momentum, pinned by symmetry for as long as the channel holds. The transport state reduces to two scalars $P_\parallel$, $J_\parallel$ plus their combination.
2. **Combined invariant.** The distinguished combined scalar is $\mathbf J\cdot\mathbf P$ (normalized: helicity $\mathbf J\cdot\hat{\mathbf P}$; geometric: screw pitch $\mathbf J\cdot\mathbf P/\|\mathbf P\|^2$). It is origin-independent because an origin shift adds $\mathbf a\times\mathbf P$ to $\mathbf J$, which is orthogonal to $\mathbf P$. Group-theoretically $\|\mathbf P\|^2$ and $\mathbf J\cdot\mathbf P$ are the Casimir invariants of the Euclidean group; the relativistic analogue is the Pauli-Lubanski vector and its spin Casimir, with helicity as the sole internal label in the massless case.
3. **Helicity as the chirality datum.** The sign of $\mathbf J\cdot\mathbf P$ is the screw handedness of the translating rotating braid: $\iota$ flips it, global polarity conjugation preserves it, reproducing the four isolated-degenerate classes from entry 1 of the previous log item. Candidate reading: on this channel the ordered-braid chirality entry $\chi_c$ is the helicity sign.

Conservation caveat (claim discipline): in delayed dynamics the particle-only $\mathbf P_{\mathrm{kin}}$ and $\mathbf J_{\mathrm{kin}}$ are not conserved; the causal wakes carry momentum and angular momentum, and conservation is a total-ledger statement — exactly the $\mathsf{Noether}^{\nu}$ and wake-ledger rows of the retention certificate. On the channel, symmetry pins the momentum directions exactly while the magnitudes exchange with the wake ledger; nothing here closes a Noether row.

Hypothesis: each rotating-wave eigen-braid solution is labeled by $(u,\omega,R)$, equivalently by its screw pitch, so the `axis_neutral_rotating_wave_spectrum` would be a discrete set of admissible pitches — helicity quantization emerging from phase closure rather than being imposed. Connects to the massless-representation reading of the photon-channel planar bridge at connection level only.

### 2026-07-06 - Central Accessory Inventory, Interior Axial Field, and Weak-Channel Masking

Owning structural slot: `central_inventory_inside_hollow_support` in [braid-retained-branch-closure](../braid-retained-branch-closure/priorities.md); any promotion routes through that packet's shared root-ledger and untracked-energy-channel requirements.

Derived at leading order (instantaneous-kernel, test-charge estimates on the invariant channel; delay and branch-weight corrections pending):

1. **Nonzero interior axial field.** At the braid center, each antipodal $\epsilon_+/\epsilon_-$ pair contributes a field along its axis from the positrino toward the electrino side; the three pairs sum to a field $\propto-\hat{\mathbf n}$. On the rotating channel this center value is phase-independent because $\operatorname{Rot}(\hat{\mathbf n},\theta)(\hat x+\hat y+\hat z)=\sqrt3\,\hat{\mathbf n}$ for all $\theta$. The braid interior is therefore polarity-sorting: $\epsilon_-$ accessory charges are pushed toward the positrino face, $\epsilon_+$ toward the electrino face, refining "central placement" to "axial interior placement" and matching the canon's axial-inventory and weak-coupling-triad notation.
2. **$C_3$ compatibility.** On-axis points and 120-degree rings about $\hat{\mathbf n}$ are the $C_3$-compatible accessory loci, so axial accessory dressing preserves the lemma channel.

Hypotheses (testable, not evidence):

3. **Ponderomotive confinement.** The rotating 120-degree-phased braid is structurally a rotating multipole trap: off-center accessory charges see high-cadence field components whose time-averaged ponderomotive potential ($\sim\nabla|E|^2/\omega^2$, sign-independent) may confine central inventory regardless of polarity. Whether trap depth beats accessory mutual repulsion at candidate spacings is a direct computation. This weakens the earlier origin-cluster repulsion objection.
4. **Monopole/multipole split of the masking claim.** The accessory monopole cannot be drowned by superposition — net charge survives, which is why the dressed fermion remains electromagnetically visible. What the braid carrier can mask is accessory structure above monopole order, through amplitude dominance plus cadence separation. Accessory-mediated interactions then become resolvable only within roughly the braid scale, where the near field exposes accessory roots: an emergent short range for weak-channel interactions without a primitive massive mediator. Needs a two-assembly near-field calculation before any stronger claim.
5. **Electron dressing geometry.** Six same-polarity $\epsilon_-$ accessory charges are all pushed toward the positrino-face side, where mutual repulsion fans them into a 120-degree ring or axial stack near that pole. This predicts a permanent fore-aft asymmetric axial structure for the dressed electron — an intrinsic orientation along the neutral axis. Spin-phenomenology connection is speculation for the angular-momentum lane.

Smallest next artifact: an interior-field diagnostic row on the rotating channel — delayed axial field profile $E_\parallel(z)$, off-axis oscillatory amplitude, ponderomotive potential extraction, trap-minimum existence, and trap depth vs. accessory mutual repulsion. Test-charge level, diagnostic-only, no retained-branch or weak-channel claim.

### 2026-07-06 - Thomson Dressing Ladder, Multipole Quietness, and the Circulant Neutrino Reading

Speculation with computable structure (no repo evidence consumed; routing noted per item):

1. **Thomson octahedral dressing.** Six same-polarity accessory architrinos under mutual repulsion plus approximately isotropic braid containment solve the Thomson problem, whose $N=6$ global minimum is the regular octahedron on the $\pm$ coordinate axes — the accessory layer spontaneously reproduces the core's own geometry. An octahedral arrangement of equal charges has vanishing dipole, quadrupole, and octupole; its first structure-revealing moment is $\ell=4$. The electron's dressing is therefore the quietest possible six-charge arrangement beyond the unshieldable monopole: candidate explanation for low apparent mass despite large shielded interior energy, and for electron resilience (deep symmetric Thomson minimum). Six is simultaneously the full charge unit ($6\times e/6$), the Thomson-octahedral magic number, and the core-matching count. Refinement from the interior-field entry: the static axial interior field biases or distorts the accessory octahedron toward the positrino face; the actual arrangement is a computable compromise between Thomson repulsion, ponderomotive containment, and axial sorting.
2. **Quark dressing leakage and confinement as multipole completion.** Accessory counts $N=4$ (up, tetrahedral, leaks at octupole) and $N=2$ (down, leaks at quadrupole) are noisier dressings than the electron's: more exposed structure, more environmental coupling, candidate reading of isolated-quark instability. Confinement speculation: pairs or triples of quarks combine accessory inventories toward quieter composites, so isolation is forbidden by unquenched dressing multipoles rather than by fiat. Proton $uud$ carries $4+4+2=10$ accessory sites at net $+e$; whether 10 sites admit an $\ell\ge4$-quiet composite arrangement across three cores is a computable question.
3. **Apparent-mass tradeoff.** Candidate compact statement of the shielding ladder: apparent mass is the unshielded residual, dominated by dressing multipole leakage plus dressing-induced core strain. Electron: minimal leakage, minimal mass. Quarks: leaky dressings, unstable in isolation. Neutrino: no dressing, near-lock, nearly massless. Routing: mass-map exposure language in [braid-mass-response-map](../braid-mass-response-map/priorities.md).
4. **Circulant neutrino reading.** The equation-map neutrino/common-clock item already carries the iso-frequency $(f,f,f)$ family with oscillation from residual phase gaps. Operator kinematic half: the neutrino is the undressed iso-frequency braid just short of the planar $c_f$ lock (the photon being the locked, dipole-quiet planar limit), retaining a small exposed energy. New structural piece: a $C_3$-symmetric coupling among the three 120-degree-locked binaries makes the residual phase operator a circulant matrix, whose universal eigenvectors are the discrete Fourier modes — first column the democratic vector $(1,1,1)/\sqrt3$, the others carrying 120-degree phases. The tribimaximal $\nu_2$ column of observed neutrino mixing is exactly $(1,1,1)/\sqrt3$, so the democratic axis appears independently in Koide ($\pi/4$) and in trimaximal mixing — both are the signals a $C_3$-circulant structure would print. Flavor states as Fourier modes of the three-binary phase residual; oscillation as beats; mass splittings as residual gap scales. Comparison-level speculation; routing: the equation-mapping neutrino/common-clock packet and [braid-angular-momentum-spin](../braid-angular-momentum-spin/priorities.md) consumers after any retained-branch evidence exists.

### 2026-07-06 - Drum Picture Of The Face-Opposite Braid

Visualization note (exact geometry, reader-facing candidate). Every site of the face-opposite seed has axial height $\pm R/\sqrt3$ along $\hat{\mathbf n}$ and lever arm $R\sqrt{2/3}$ from the axis, because the democratic diagonal makes the same angle $\arccos(1/\sqrt3)\approx54.7^\circ$ with each coordinate axis. Viewed along the neutral axis, the braid is a short drum: three positrinos on a triangular ring at height $+R/\sqrt3$, three electrinos on a matching ring at $-R/\sqrt3$, both rings of radius $R\sqrt{2/3}$, staggered by $60^\circ$ so the projections interleave into a hexagon. Immediate rereads: equal lever arms explain the equal tangential speed under rigid rotation; the axial dipole is the positive ring above the negative ring; Lorentz-style flattening squeezes drum height while preserving the rings, which is why the dipole vanishes as the planar hexagonal limit is approached. The $54.7^\circ$ tilt is the magic angle familiar from magic-angle spinning in NMR; comparison-level observation only.

### 2026-07-06 - Operator Batch: Speed Budget, Field-Speed Hinge, Action Clicks, Formation, and Corrections

Derived on the invariant channel (promoted or promotable):

1. **Exact quadrature speed budget.** On the axis-neutral translating rotating channel, tangential velocity is exactly perpendicular to drift at every instant, so $\beta^2c_f^2=u^2+v_t^2$ with no phase-dependent cross terms — unlike generic drift directions. With a pinned site-speed fraction $\beta_\ast$, the internal tangential budget is $v_t(u)=\sqrt{\beta_\ast^2c_f^2-u^2}$: the light-clock square root as exact channel kinematics, with the pinning itself the branch hypothesis. Promoted to [shell-braid.md](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md) as `Exact Speed Budget on the Channel`. Direct answer to the group-velocity/transverse-velocity question: on this channel they trade against each other inside one budget; both approaching $c_f$ simultaneously means $\beta=\sqrt2$, i.e. the super-field-speed self-hit regime, which is exactly the regime expected near event-horizon stress.
2. **Nested-symmetry check under integer frequency ratios.** The pair-permutation claim survives: integer locks restore exact global periodicity (closed figures, integer winding counts), not permutation symmetry, since no isometry maps orbits of different radii onto each other, with or without a time shift. Not a falsification of nested retention; promoted as `Relation to the Symmetric Shell Channel` in [explored-braid-geometries.md](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md), including the weaker surviving structure (orthogonal binary planes are permuted by the $120^\circ$ rotation, so the body diagonal remains the natural precession axis) and the open formation question (symmetric persistence through the recycling cycle versus binary capture ringing down to the symmetric configuration; symmetric persistence is the Occam candidate).
3. **Per-receiver correction.** The three-phase cancellation is about summed collective moments in the superposed wake signature, not per-receiver forces: every architrino feels all five partners through its own causal roots. The binaries are not independent; only the reduced bookkeeping decouples. Clarification promoted into the axial-dipole subsection of shell-braid.md.
4. **Comparison-map correction.** Polarity exchange is a comparison map between possible configurations, not a physical relabeling — every architrino is unique with provenance and history. Clarification promoted into the invariant-channel introduction.

Hypotheses (testable, capture-level):

5. **Field-speed specialness at `SH-0`.** $v_t=c_f$ is where a strand rides its own emission boundary: delayed same-source roots first become accessible, and source-normal branch weights approach their caustic. For a fixed radius and unit weights, stored kinematic angular momentum grows with $v_t$ and saturates at the sub-field edge, so the $c_f$ edge is the maximal-angular-momentum configuration per radius — a candidate reading of why the hinge sits there: it is the marginal self-interaction balance point where the most action can be stored without opening the self-hit ledger.
6. **Action quantization as root-topology clicks.** Candidate implementation of $h_{\mathrm{act}}$: an accepted transaction momentarily carries the hinge row across $c_f$, opening (or closing) a same-source causal root — one discrete click — and the branch re-locks below the edge. Quantization would then be inherited from the integer nature of root counts: $h_{\mathrm{act}}$ as the action transacted in one root-topology transition. This extends the existing canon statement that closure-label changes tie to causal-root bifurcation and separator crossings, and it makes the hinge binary the double-entry accountant between the internal action ledger and the wake ledger. The cogwheel-click image is apt; see item 10.
7. **Transverse acceleration and destabilization thresholds.** The kinematic angular momentum is pinned to $\hat{\mathbf n}$ by the internal dynamics, so transverse acceleration demands re-pointing the momentum-screw axis, and the re-pointing torque propagates only through delayed wakes. Below an adiabatic threshold the braid re-points coherently; above it the phase lock breaks — candidate substrate reading of radiative loss under transverse acceleration and of decay-product release, with axial deceleration (photon meeting an absorber) as the same diabatic failure in the longitudinal channel. The threshold candidate is re-pointing rate versus internal cadence.
8. **Unrequited wake momentum.** In delayed dynamics the emitted wake carries ledger momentum whether or not it ever meets a receiver; a wake expanding into unpopulated void holds its entries indefinitely. Conservation is intact — the total ledger includes in-flight entries — and in a populated Noether sea essentially every wake eventually finds receivers, which is part of what the convergence row of the sea selection residual regulates.
9. **Two-braid fore-aft coupling at the photon level.** Operator hypothesis: the leading-face/trailing-face asymmetry of a translating braid recurs one level up when two braids couple at high speed, the trailing partner riding the leader's wake — a candidate ingredient for the photon-channel architecture. Routed to the photon program.

Comparison frameworks and terminology:

10. **'t Hooft cogwheel models.** The cellular-automaton cogwheel construction uses three-state cyclic evolution whose energy eigenstates are the discrete Fourier modes of $\mathbb Z_3$ — mathematically the same circulant/Fourier structure as the three-binary residual phase operator, with the same $120^\circ$ phases. Treat as a comparison framework (route: theory-bridges), potentially valuable for the quantum-recovery mapping and for the click picture in item 6.
11. **Potential-superposition terminology.** The interior "field" phrasing in the accessory-trap discussion should be recast in native terms: what is computable is the superposed delayed potential and its gradient as it would act on a hypothetical receiver at that location; the polarity-sorting conclusion for a central test architrino survives the restatement, but the corpus should not lean on field ontology. Also adopted: prefer "net charge" / "net polarity inventory" over "monopole" in reader-facing braid prose (applied to explored-braid-geometries.md).

### 2026-07-06 - Synthesis Pass: Cross-Corpus Clicks

Promoted this pass (see promotion ledger below):

1. **Dipole-quiet horizon.** Terminal alignment (coplanarity at $c_f$) is also the vanishing point of the axial polarity dipole, so an assembly reaching the horizon condition goes silent in its loudest wake channel by geometry; the surviving higher-moment and phase data are exactly what $\Lambda_{\text{NS}}^{\mathrm{align}}$ counts. Promoted to the alignment section of explored-braid-geometries.md at hypothesis level.
2. **Precession as symmetry-distance meter.** The symmetric channel pins the angular-momentum axis, so precession is forbidden on it; precession amplitude measures distance from the symmetric channel, ring-down appears as precession decay, and terminal "precession ceases" is the strong-field endpoint of the same diagnostic. Promoted to the symmetric-channel relation section of explored-braid-geometries.md.
3. **Thomson organization at both levels.** The neutral braid's per-site $3+2$ channel count maps onto the drum: two repulsive channels are intra-ring (spacing each ring at $120^\circ$), three attractive channels are inter-ring (setting drum height). The core is two mutually repelling rings bound face-to-face — the same minimum-energy-under-containment principle as accessory dressing. Promoted to the drum section of shell-braid.md.
4. **One pinned speed, two exports.** The $\beta_\ast$ pinning behind the exact transport quadrature is the same branch-pinned-speed hypothesis behind the rest-level $R_\ell f_\ell$ product law, so rest-level scaling and moving clock export are two projections of one branch commitment. Promoted to the speed-budget section of shell-braid.md.

Held at capture level:

5. **Neutrino mass as residual budget.** For a field-speed-pinned family ($\beta_\ast=1$), a row at $u$ just below $c_f$ retains only the sliver $v_t=\sqrt{c_f^2-u^2}$ of internal cadence; the neutrino's small exposed energy reads as this residual tangential budget, and the exact lock ($u=c_f$, $v_t=0$, frozen internal clock) is the photon-channel boundary. Speculation pending the iso-frequency family work.

6. **Composite photon from the speed budget (operator question: contra-rotating braid pair).** Two arguments make the pair architecture attractive. Constraint: the exact quadrature budget forbids transverse internal cadence at $u=c_f$, so photon internal structure must live in longitudinal and relative degrees of freedom — which a two-braid pair supplies as relative phase and separation, plausibly locked by fore-aft wake-riding. Algebra: rotation senses map onto polarization — co-rotating pair gives net axial angular momentum (the two circular polarization states), contra-rotating pair gives net $J\approx0$ with relative phase selecting the transverse plane (linear polarization as the balanced superposition). Both members dipole-quiet in the planar limit keeps the composite transparent. Hypothesis; must be reconciled with the existing photon chapter before promotion. Routed to the photon program.

7. **Analytic-then-perturb pipeline (operator question).** The constant-lag reduction makes rotating-wave rows finite transcendental algebra, so the ideal-environment geometries are solvable semi-analytically; survival-to-perturbation is then the transverse Floquet analysis around each solved row, tractable precisely because the unperturbed row is analytic. The eigen-braid spectrum packet plus a Floquet layer is the pipeline.

### 2026-07-06 - Drum Lacing Extension (Operator)

The operator's rope-tensioned-drum reading of the two-ring geometry is exact in three ways and one clause was promoted to the shell-braid drum section: the cord lacing between the two hides is the cross-ring attraction topology (each ring member tied to all three members of the other, fanned in the staggered zigzag); a twisted lacing is what the attraction channels become under rotation (helices about the axis — the drum picture and the word braid are the same object in space versus spacetime, with winding handedness as the chirality datum); and a drum's quantized Bessel ringing modes are the right mental model for the two-frequency breathing generalizations whose closed figures are the integer phase-closure states. The third point stays capture-level pending the rotating-wave spectrum work.

### 2026-07-06 - Foundations Survey Pass 1 (architrino.md, ontology.md)

Operator-directed corpus grind, foundations first. Three clicks found and two promoted:

1. **Charge quantum as a symmetry orbit (promoted, hypothesis).** [architrino.md](../../../content/markdown/aaa/foundations/architrino.md) names $|e|=6\epsilon$ an input parameter with the protected-site target $|G_{\mathrm{ax}}\text{-orbit}|=6$. The Thomson-octahedral accessory dressing supplies a candidate: pure inversion is a symmetry of a same-polarity dressing (unlike the core's $\iota$), and $\langle\varrho,-\mathbb I\rangle$ has order six, acting on the six octahedral accessory sites as a single free orbit. Charge arrives in $6\epsilon$ units because dressing comes in whole orbits of the braid's rotoinversion symmetry. Promoted into the accessory-dressing subsection of explored-braid-geometries.md; owning program remains quantum-number mapping.
2. **Clicks live on the canonical fold set (promoted).** The click mechanism's root-topology transition is exactly a controlled crossing of the Whitney-fold set $\Sigma_{ij}=\{F_{ij}=0,\ \partial_{T_{\mathrm{em}}}F_{ij}=0\}$ already formalized in architrino.md — the click hypothesis inherits canonical vocabulary and the caustic/fold-resolution chart obligations. Cross-reference added to the click section.
3. **Exclusion barrier as click cost (capture only).** [ontology.md](../../../content/markdown/aaa/foundations/ontology.md) requires emergent matter to carry protected topology plus a branch-preserving barrier $\Delta E_{\mathrm{excl}}>0$ against deformation through the forbidden branch. Candidate identification: the barrier is the action cost of the forbidden root-topology transition — one or more clicks — so $\Delta E_{\mathrm{excl}}$ is quantized in the same $h_{\mathrm{act}}$ units as level transitions, and the helicity/screw-pitch datum of the rotating channel is a candidate carrier for the ordered-frame/causal-writhe entry in the matter criterion. Hypothesis; needs the exclusion program's review before promotion.

Survey queue state: foundations 2 of 9 files read this pass (architrino, ontology first 80 lines); remaining foundations files, then dynamics, spacetime, assemblies, quantum, reactions, nuclear-atomic, cosmology, validation, philosophy-history in scene order.

### 2026-07-06 - Foundations Survey Pass 2 (emergence-of-structure.md)

Five clicks; three promoted, two captured:

1. **Click pattern is canon (promoted).** Emergence-of-structure already states the codimension-one transition pattern — integer branch labels change only at singular-stratum crossings, with self-hit onset named as a fold. The hinge click is that fold crossed deliberately as the transaction mechanism; cross-reference added to the click section of explored-braid-geometries.md.
2. **Click statistics inherit the basin-measure discipline (promoted).** The declared-measure basin formalism $P_c(k)=\mu_c(B_k^W(c))$ is the canonical home for click-outcome weights; the click section now routes its Born-rule contact through that discipline instead of a probability postulate.
3. **Rung-5 burden sharpened (promoted).** The bottom-up ladder's Noether braid stabilization rung now cites the three-chart anti-damping evidence: persistence requires an exchange or export channel for pumped action, not merely static force balance, with the return-response question as the concrete statement.
4. **Shielding monotone estimator (promoted).** The quietness ladder supplies a candidate geometric estimator for the external root-flux ordering in $\Sigma_{\mathrm{shield}}$: the lowest unquenched polarity-signed moment; pointer added at hypothesis level.
5. **Eigen-braids are the atlas's drift bundles (capture only).** The chapter's return-map taxonomy — fixed point, periodic orbit, and glider as a periodic branch in the co-moving quotient whose lift carries displacement per return — is exactly the relative-equilibrium/relative-periodic-orbit language of the rotating-wave spectrum packet: eigen-braids instantiate the assembly atlas's drift-bundle category, and the anti-damping result says the pure fixed-point and rigid-drift categories are empty for the isolated braid, pushing the population toward the periodic-orbit (breathing) category. Route to the spectrum packet on its next edit.

### 2026-07-07 - Interior Ponderomotive Diagnostic: Trap Exists, Six-Accessory Confinement Disfavored

Executable closure of the `interior_field_ponderomotive_diagnostic` queue item, test-charge level, diagnostic-only. Owner script [interior-axial-potential-gradient-diagnostic.mjs](../../../scripts/braid-ideal/interior-axial-potential-gradient-diagnostic.mjs) with tests in [braid-ideal-interior-axial-potential-gradient-diagnostic.test.js](../../../tests/braid-ideal-interior-axial-potential-gradient-diagnostic.test.js); owning structural slot `central_inventory_inside_hollow_support` in [braid-retained-branch-closure](../braid-retained-branch-closure/priorities.md). All quantities are superposed delayed potentials and gradients at a hypothetical static receiver, with delays at field speed $c_f$ on the exact rotating worldlines; no retained-branch, accepted-evidence, or weak-channel claim. Canonical parameters $c_f=1$, $R=1$, $\kappa=1$, softening $\varepsilon=0.05$, site-speed fractions $\beta\in\{0.3,0.6,0.9\}$.

Derived on the invariant channel (delayed computation, same claim level as the interior-field entry it refines):

1. **On-axis staticity is exact.** Rigid rotation about $\hat{\mathbf n}$ preserves axis-point separations and gives zero source-normal speed along every axis line of sight, so the on-axis superposed delayed potential is exactly static; the sampled oscillatory residual is finite-difference noise only ($\le 7\times10^{-10}$ across all three $\beta$ rows). The delayed center gradient equals the softened instantaneous value $6\kappa h/(R^2+\varepsilon^2)^{3/2}$ with $h=R/\sqrt3$ to eight digits.
2. **Polarity sorting survives delays.** The mean axial gradient $\partial_\parallel\Phi$ stays above $1.40\,\kappa/R^2$ on the whole interior axis $|z|<h$ at every sampled $\beta$, so the interior pushes $\epsilon_{-,\bullet}$ accessories toward the positrino face and $\epsilon_{+,\bullet}$ toward the electrino face exactly as at leading order.
3. **A single-test-charge trap minimum exists.** The time-averaged effective landscape (signed mean potential plus ponderomotive term at unit numerical integration weight) has an interior minimum for $\epsilon_-$ at $\rho\approx0.13R$, $z\approx+0.80R$ near the positrino face, $\iota$-mirrored for $\epsilon_+$, with sampled watershed depth $\approx0.68\,\kappa/R$ (escape over the polar route). The depth is static-well dominated (ponderomotive contribution at the minimum $\approx0.007\,\kappa/R$); the ponderomotive component instead supplies the transverse containment barrier, rising to $\sim1.6\times10^2\,\kappa/R$ near the rotating ring, which is what prevents infall onto the positrino sites. The quiver-validity check passes at $\beta\in\{0.6,0.9\}$ and fails at $\beta=0.3$.

Decision (moves the mechanism question, not proof state upward):

4. **Six-accessory ponderomotive confinement is disfavored.** Per-accessory mutual repulsion dominates the trap depth at every $C_3$-compatible candidate spacing whose six sites fit inside the sampled basin: on-axis stacks $30.9$ down to $21.4\,\kappa/R$ at $s\in[0.1,0.15]R$, staggered 120-degree rings $40.0$ down to $7.3\,\kappa/R$ at $s\in[0.1,0.6]R$, against depth $0.68\,\kappa/R$ — a shortfall factor $\ge10$. Since depth and repulsion both scale as $\kappa$, the ratio is coupling-independent and set by channel geometry alone; repulsion parity would need spacing $\approx4.9R$, far outside any basin. The origin-cluster repulsion objection is reinstated at six-accessory count. What survives: single-accessory (and low-count) axial-interior trapping, the axial sorting, and the transverse ponderomotive barrier. The Thomson-dressing geometry program therefore cannot lean on ponderomotive depth alone at $N=6$; candidate rescues to examine are accessory-count reduction per trap lobe, deeper traps from breathing or nested structure, sea response, and dynamic (non-static) accessory placement.

### 2026-07-07 - Fold-Crossing Click Sign Is Absorptive Because the Pump Accelerates the Receiver Across the Hinge Ahead of Its Own Past

Decision (moves the mechanism question; diagnostic level, not proof state upward):

Hypothesis sharpened to a signed result. The field-speed hinge click, read on the same-source causal-root fold set, transacts in the **absorptive** direction on the symmetric self-hit channel — it drains the pumped tangential action rather than ejecting it. The naive toy kernel ejects only because it carries the absolute branch weight $\lvert D_T/D_s\rvert$ and discards the sign. The canonical master equation carries the signed branch orientation $m=D_T/D_s$, and the sign of the tangential click impulse reduces to $\operatorname{sign}(m)$ because the same-source polarity product is $+1$ and the fold ray is forward.

The sign is fixed by an asymmetry the rigid-rotation reading misses. A fixed-radius, fixed-speed circle has $D_T=D_s$ (receiver and emitting past are reflected points at equal speed), giving $m=1$ and a sign-indeterminate cusp at the coincidence stratum — the [Fold-Crossing Chart Spec](fold-crossing-chart-spec.md) reading. But the certified tangential pump $\Phi_{\mathrm{tan}}\approx2.9\beta$ is accelerating the site through the hinge, so at a same-source root the receiver (later) is faster than its own emitting past (earlier). The receiver crosses field speed first: $D_T<0<D_s$, $m<0$, absorptive. Measured directly on the recorded `vt080`/`vt095`/`vt099` worldlines ([fold-crossing-click-impulse-diagnostic.mjs](../../../scripts/braid-ideal/fold-crossing-click-impulse-diagnostic.mjs)); the sign holds arbitrarily close to birth and is independent of softening, the Jacobian floor, the self-hit minimum delay, and the coincidence cut.

What is not resolved: the impulse magnitude. The self-hit fold on the symmetric channel is born at the coincidence stratum $r\to0$, so the magnitude grows as the spatial regulator shrinks (confirmed: $-9\to-588$ over the cut sweep). The transacted amount is therefore set by the point-transceiver spatial self-regularization the ontology already carries, not by a chart-clean fold measure. So the click is a **direction-definite, amount-regularized** absorber on the symmetric channel: its escapement pushes the pumped tangential action back into the internal ledger, and the open question is the quantum of that push, which the coincidence-stratum regulator fixes. This keeps the hinge-click absorber alive against the chart-spec closure and is the mechanism reading the [action clicks at the fold set](../../../content/markdown/aaa/noether-braid/braid-mathematics.md#action-clicks-at-the-fold-set) should inherit if the operator admits the signed symmetric-channel transfer.

### 2026-07-07 - The Coincidence-Stratum Regulator Is the $d_0$ Scale, Too Large For the Self-Hit To Beat the Pump Clock

_Promotion (2026-07-08): the fold-geometry disposition here — symmetric single-site self-hit coincidence-bound at $d_0$ and not the load-bearing absorber; non-coincident cross-hit at finite chord the surviving chart-clean route contingent on sustained alignment — is promoted to [braid-mathematics.md](../../../content/markdown/aaa/noether-braid/braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord) at scoped-negative / theorem-target level. Kept here as the fuller exploration; the retention proof remains priority-only._

The open question left by the signed-absorber reading above is the quantum of the symmetric-channel self-hit push — the coincidence-stratum regulator $\rho_c$. Reading the substrate for a length that fixes $\rho_c$ by derivation rather than by tuning: the only substrate length is the two-body unit $R_*=\kappa\epsilon^2/c_f^2$, and the parameter ledger states $\kappa,c_f,\epsilon$ "set length and time units rather than an independent tuning knob," so $R_*$ is the unit, not a knob. The candidate fundamental short-distance length is $d_0=R_{\mathrm{MCB}}$, the minimum circular-binary radius — and the corpus already defines it as an emergent scale "set by balance of delayed attraction and self-repulsion," i.e. set by the self-hit itself. So the physically correct regulator of the self-hit coincidence is $d_0$: the radius where self-hit repulsion halts collapse, expressed as the dimensionless ratio $R_{\mathrm{MCB}}/R_*$. The corpus flags $d_0$'s derivation as open ([particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md): "What sets $d_0$? Can it be derived from $\epsilon,c_f,\kappa$, or is it an independent postulate?"). There is no independent smaller substrate length: $\ell_P,\hbar$ are conjectural emergent outputs of the Planck-alignment program, and the mass-map scales descend from $d_0$.

The scaling verdict: $\rho_c\sim d_0\sim R_*$ is $O(1)$ in the units where the studied braid radius is $\rho=\sqrt{2/3}\approx0.82\,R_*$, but the self-hit-brake central measurement only beats the certified pump clock for $\rho_c\lesssim0.02\,\rho\approx0.016\,R_*$. A clock-beating self-hit would need $d_0$ roughly $50\times$ below the natural substrate length — a hierarchy the theory does not supply. At the natural scale the coincidence-born self-hit absorbs only a sub-few-percent fraction of the pump (consistent with the $\rho_c=0.2$ row's $0.031$ and the $\approx0.19$ regulator-inflated estimate). This is robust to the exact $R_{\mathrm{MCB}}/R_*$ ratio: any $O(1)$ value keeps the self-hit sub-unity, so it does not depend on tuning.

Reading (idea-level, not promoted): keep self-hits fully in the ontology and keep their absorptive contribution — they earn an essential role, since they set the fundamental rod $d_0$ by halting binary collapse — but do not make the coincidence-born self-hit the load-bearing tangential-pump absorber. The surviving load-bearing absorber is the non-coincident cross-hit hinge, whose magnitude is chart-clean at finite separation, and whose requirement (sustain $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ at finite separation) is the same dynamic-alignment / formation-history burden that gates induced sea orientational polarization. Candidate corpus promotion: connect $d_0$'s self-repulsion origin to the self-hit absorber ceiling where the open "what sets $d_0$" question already lives ([particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md), [binary-dynamics.md](../../../content/markdown/aaa/dynamics/binary-dynamics.md#emergent-properties-and-measurement-standards)) — pending operator review or a supporting derivation of $R_{\mathrm{MCB}}/R_*$.

### 2026-07-07 - Differential Cross-Hit Is the Strongest Clean Absorber Yet: 0.74 of the Pump From One Source, Set by Radial Band Proximity

_Promotion (2026-07-08): the fold-geometry disposition here — symmetric single-site self-hit coincidence-bound at $d_0$ and not the load-bearing absorber; non-coincident cross-hit at finite chord the surviving chart-clean route contingent on sustained alignment — is promoted to [braid-mathematics.md](../../../content/markdown/aaa/noether-braid/braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord) at scoped-negative / theorem-target level. Kept here as the fuller exploration; the retention proof remains priority-only._

First probe of the cross-hit load-bearing route in a differential configuration ([differential-cross-hit-alignment-diagnostic.mjs](../../../scripts/braid-ideal/differential-cross-hit-alignment-diagnostic.mjs), tests 5 passing). Two coplanar circular bands — a fast inner source $j$, a slower receiver $i$ on the pumped band ($\rho=\sqrt{2/3}$, $\beta_i=0.95$) — with the cross-hit alignment condition $D_{s,ij}=c_f-\mathbf v_j\cdot\hat{\mathbf r}_{ij}=0$. The integrated signed tangential drain on the receiver band per rotation is measured against the certified pump ($22.17$), with a softening-independence guard separating chart-clean finite-chord contributions from near-coincidence contamination.

Findings (idea-level, not promoted):

- The differential cross-hit is genuinely absorptive for like polarity ($\sigma_{ij}=+1$; the sign flips exactly with $\sigma$) and is the strongest clean channel found so far — a single source reaches a clean, finite-chord, softening-independent $0.742$ of the pump, versus $\approx0.10$ for the aligned FCC sea (Corollary S) and $\approx0.19$ for the coincidence-bound self-hit.
- The strong lever is radial band proximity, not frequency ratio. Sweeping the source radius toward the receiver ($0.4\to0.7$) grows the clean absorbed fraction $0.145\to0.742$; the inner/outer frequency ratio saturates the effect near $0.15$ by itself (clicks multiply but each is faster/weaker). The absorption is realized as many narrow clicks, not a held window: the sustained-alignment fraction is $\approx0$, so free circular orbits cross the alignment condition rather than locking it.
- Crossing the pump in a single source ($\rho_{\mathrm{src}}\gtrsim0.75$) only happens as the aligned fold approaches coincidence (min chord $\to0$, softening-dependent) — the same coincidence-singularity contamination as the self-hit, flagged not-clean. So a single source does not cleanly beat the clock.

Disposition `differential_cross_hit_beats_pump_only_by_approaching_coincidence_clean_ceiling_below_pump`. Reading: the cross-hit is the first absorber to reach $O(1)$ fraction of the pump cleanly, and the concrete route to a clean clock-beat is multiplicity — a full nested shell braid carries several inter-band cross-hit source charges (six architrinos, three bands), whose clean finite-chord contributions sum; three well-separated clean sources at $\sim0.5$–$0.7$ each plausibly clear the pump without any coincidence approach. The other open lever is genuine sustained alignment (a locked resonance holding $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ over a window), which free orbits do not supply and which is the shared dynamic-alignment / formation-history burden. Next probe: sum the clean finite-chord cross-hit drain over the actual multi-charge inter-band source set of a nested shell braid (or an inner/middle binary pair), and test whether the clean total clears the pump with all chords finite. All outputs fail-closed; names no retained branch; authorizes no acceptance.

### Promotion Ledger For This Log

Promoted so far: axis-neutral invariant channel, drum geometry with Thomson-ring reading, axial dipole identity with moment definition, momentum screw and helicity, polarity-conjugation degeneracy, fore-aft asymmetry, isolated-release/return-response reframing, exact speed budget with pinned-speed unification (all shell-braid.md); accessory dressing quietness ladder, circulant neutrino reading, symmetric-channel relation with formation question and precession meter, dipole-quiet horizon, action clicks at the field-speed hinge with the statistical layer and adiabatic/diabatic boundary (explored-braid-geometries.md); crux framing and role-grouped chapter table (noether-braid.md). Remaining capture-level items above are queued for promotion after operator review or supporting derivation.

## Merged Lane Brainstorms (2026-07-08)

Merged here from the other braid lanes' `brainstorming.md` files during the braid priority sort (Phase 3, OP-3). Each source file is now a stub pointing to this file. Claim levels and routing notes are preserved from the source; nothing is promoted or strengthened by the move. Where a source bullet linked its own lane `priorities.md`, the link is reworded to name the lane so it still resolves from here.

### From braid-angular-momentum-spin — Dynamo Team Insights Mining

- (from: braid-angular-momentum-spin) Spin / chirality side target: orbit chirality, pro/anti handedness, and six-site axial-charge assignments may become classification labels for retained assemblies. Promote into the `braid-angular-momentum-spin` priorities queue only when the labels are tied to ordered-frame transport, angular-momentum ledger closure, or a spinor / Stern-Gerlach record target.
- (from: braid-angular-momentum-spin) Photon and Bell caution: do not let the causal-linking or handedness language bypass photon Gate B, detector response, or no-signaling constraints. Any angular-momentum consequence must bind to the same retained event and record channel used by the measurement packet.

### From braid-geometry-export-bridge — Dynamo Team Insights Mining

- (from: braid-geometry-export-bridge) Geometry-export target: organize assembly phase space as a dynamical atlas with local charts by density, self-hit strength, speed regime, and retained-root class, plus gluing maps between branch domains. Promote only after one chart transition is expressed as a concrete retained-row handoff.
- (from: braid-geometry-export-bridge) Effective-frame target: the frame field should be a function of declared assembly and Noether sea variables, including $\rho_{\text{NS}}(\mathbf{x},t)$, local flow, orientation fields, and internal three-binary state. Promote into the bridge packet only when the variable list becomes a shared source record for clock, ruler, signal, and weak-field projections.
- (from: braid-geometry-export-bridge) Ontology guardrail: curvature is an observer-level frame-bundle or effective-metric readout, not curvature of the Euclidean void. Any refractive or Fermat-path language should remain bridge language until the ADM / Cartan rows and PPN rows consume the same constitutive record.

### From braid-mass-response-map — Dynamo Team Insights Mining

- (from: braid-mass-response-map) Mass-map mechanism target: mass should be treated as externally exposed response from trapped internal causal history, shielding, and Noether sea coupling. Do not recast the idea as ordinary dissipative drag or as an independent wake-field substance.
- (from: braid-mass-response-map) Reactive-wake target: a phase-locked maximal-curvature binary may carry a predominantly reactive near-field wake with zero net energy flux over a cycle, while perturbations open radiative or branch-transition channels. Promotion requires the same retained branch to close kinetic, wake-history, action, and boundary-flux rows.
- (from: braid-mass-response-map) Trapped-history conjecture: stable assembly mass may correspond to energy trapped in self-intersecting history loops. Keep as a derivation target until $E_{\text{internal}}$, exposure, shielding, and Noether sea response are extracted from retained branch evidence.

### From braid-nested-shell-causal-closure — Dynamo Team Insights Mining

- (from: braid-nested-shell-causal-closure) Candidate assembly-classification program: preserve the periodic-table idea as a derivation target built from knot or link type of representative orbits, winding numbers around self-hit regions, pro/anti handedness, orbit chirality, and axial-charge site assignments. Promote only after each label is computable from a retained nested-shell braid branch.
- (from: braid-nested-shell-causal-closure) Tri-binary rigidity hypothesis: the three nested counter-rotating binaries may yield a finite classification space through energy-separated radii, frequency ordering, near-orthogonal planes, and causal self-linking barriers. Keep this as a classification target, not an accepted finite table.
- (from: braid-nested-shell-causal-closure) Promotion target: if the classification becomes concrete, route the reader-facing definition through `content/markdown/aaa/noether-braid/noether-braid-topological-charge.md` and the nested-shell closure packet, with Standard Model charge consequences routed separately.

### From braid-retained-branch-closure — Dynamo Team Insights Mining

- (from: braid-retained-branch-closure) Speculative structure: assemblies can be organized as objects with internal dynamics and invariants, with morphisms for transformation, association, dissociation, coarse-graining, and adiabatic deformation. Promote only if this becomes a computable branch-category grammar with retained invariants and allowed morphism rows.
- (from: braid-retained-branch-closure) Derivation-closure target: causal self-linking may protect stable assemblies because a worldline cannot be continuously deformed across its self-hit barrier or regularized high-potential shell. First mathematical object: a retained curve $\gamma(t)$, a causal offset curve $\gamma_\epsilon(t)=\gamma(t)+\epsilon\hat{\mathbf r}(t)$, and a domain where $Lk_{\text{causal}}=\text{Link}(\gamma,\gamma_\epsilon)$ is invariant.
- (from: braid-retained-branch-closure) Branch-certificate implication: any causal-linking label must be subordinate to retained branch evidence. It should not count as topology unless root identity, regulator margin, disjointness of $\gamma$ and $\gamma_\epsilon$, and branch-continuation limits are explicit.

Empty at merge time (no loose ideas): braid-doubling-frequency-lock, braid-taxonomy, and the neutral-braid / shell-braid / nested-shell-braid subdirs of braid-retained-branch-closure. Their brainstorms are stubbed as a formality.

## Mass Translation Doctrine (from: braid-mass-response-map)

Moved here from `braid-mass-response-map/priorities.md` during the braid priority sort (Phase 3, OP-3, route-by-content-type, 2026-07-08). Doctrine / mechanism-level content; claim levels unchanged.

Preserve `mass` as the standard observer-facing scalar. The $\mathbb{A}\mathbb{A}\mathbb{A}$ task is not to replace the word with a new term, but to derive the mechanism behind it from Noether braid geometry, shielding, and Noether sea response.

- Individual architrinos do not carry primitive particle-specific mass.
- Stable assemblies may carry effective mass because their trapped Noether braid energy ledger has an externally exposed response.
- The internal ledger itself should be called $E_{\text{internal}}(A)$, not mass. Mass is the observer-level scalar extracted from how the shielded ledger responds to acceleration, momentum transfer, and Noether sea gradients.
- The rest-energy and energy-momentum relations are retained as effective closure laws to be recovered:

$$
E_{\text{rest}}(A)=m(A)c_{\text{eff}}^2,
$$

$$
E^2=p^2c_{\text{eff}}^2+m(A)^2c_{\text{eff}}^4.
$$

- The working derivation target is therefore

$$
m(A)c_{\text{eff}}^2\sim E_{\text{probe}}(A)
=\zeta_{\text{probe}}(A)E_{\text{internal}}(A),
$$

Here raw $\zeta(A)E_{\text{internal}}(A)$ is the total exposed ledger before the probe, sea-coupled, and unresolved split; $E_{\text{probe}}(A)$ is the distant-probe channel used by the mass map, and $c_{\text{eff}}$ is the local observer-facing light-speed scale set by the Noether sea state.

- Stronger mass claims must declare which role is meant: rest mass, inertial response, gravitational response, external mass footprint, effective boson mass scale, neutral-assembly mass, or internal energy ledger.
- Effective boson mass scale must split photon-like and weak-corridor cases. Photon-like planar channels lose stable volumetric rest-clock closure and therefore occupy the massless null branch; $W/Z$ corridors retain a localized recoupling burden whose longitudinal or mixed-axis structure appears as a short-lived massive vector channel.
- Higgs-sector mass language is downstream of the mass map. The ATLAS scalar benchmark may be used only after the branch, shielding, and medium-response records are fixed without particle-mass input. The closure target is not merely $M_H^{\mathrm{breath}}\approx126.0\,\mathrm{GeV}$; the same scalar response must also recover $\hat{\mu}=1.4\pm0.3$, the channel-rate ledger for $ZZ^{(*)}4\ell$, $\gamma\gamma$, and $WW^{(*)}\ell\nu\ell\nu$, and the absence of additional accepted scalar windows. If those terms require separate tuning, the mass map has not recovered the Higgs sector.
- Avoid treating Noether sea response as ordinary dissipative drag unless dissipation is actually being modeled. The preferred derivation language is medium-dressed inertial response.

## Brainstorm Capture 2026-07-08: Champion-Geometry Springboards (Operator Session)

Claim level: speculation-comparison / brainstorm capture. Context: the rest-state closure champion of [spec Section 22](fold-crossing-chart-spec.md#22-outer-layer-tuning-the-caps-join-the-braid-2026-07-08) ($0.4721$; equatorial rail pair, inner dish $\alpha_I\approx-12°$, polar caps $\alpha_O=84°$ lagging $\theta_O\approx30°$ behind the inner axis). Four operator springboards with assessments:

1. **Misalignment angles vs weak mixing.** The optimum carries two small angles: azimuthal cap lag $\approx15$–$30°$ (vs $\theta_W\approx28.7°$) and inner dish $\approx12°$ (vs Cabibbo $\approx13.0°$). The axial-frame doctrine (comparative glossary) already reserves relative axial/braid-frame orientation as the weak-mixing language, so the mapping direction is corpus-consistent. Caution: both optima sit in flat basins $\pm10°$ from partner-channel-only prescribed-circle physics — coincidence-class today. Promotion route: (i) sharpen optima under fuller physics; (ii) derive the angle in closed form from closure conditions; (iii) test whether the closure-optimal misalignment RUNS with group velocity (item 19) — a closure angle that runs like the weak mixing angle runs would be a signature beyond numerology.

2. **Who leads = the front cap under travel; chirality = the spin/dipole/lag pairing.** (Operator clarification 2026-07-08: "who leads" means the front cap along the direction of travel, especially visible at high speed.) Corrected symmetry ledger: the pairwise law is C-even AND P-even; a true mirror image (geometry and rotation sense both flipped) is an exactly degenerate enantiomer. Earlier "mirror scores differently" measurements were PARTIAL flips (phases without rotation sense; cap without dish) — different internal arrangements, not enantiomers. The braid is a chiral OBJECT (two degenerate gloves) whose handedness is the pseudoscalar pairing $h=\hat{\mathbf d}\cdot\hat{\boldsymbol\omega}$ of its polarity dipole (− cap to + cap) with its spin, plus the sense of the caps' azimuthal lag. Measured internal locking: the champion anti-aligns the cap dipole with the inner-dish dipole — opposite polarities vertically adjacent, each cap ATTRACTED into the core (north cap Fz $=-0.094$, binding); the cap-polarity swap flips nearest vertical neighbors to repulsive (measured anti-binding, Fz pushes the cap away) and degrades every layer (I $0.60\to0.70$, M $0.44\to0.53$, O $0.50\to0.57$). Under drift $u$ along the axis the front cap is $\mathrm{sign}(\hat{\mathbf d}\cdot\hat{\mathbf u})$, and $u$ parallel vs anti-parallel to $\hat{\boldsymbol\omega}$ are NOT symmetry-related once fore-aft wake asymmetry turns on — so the item 19 drift closure will select a preferred leader: a real prediction (which polarity cap leads for a given spin sense), with the anti-braid leading oppositely by exact C-degeneracy. This is neutrino-style helicity-polarity locking — the operator intuition panels drew exactly this (high-velocity core with pro/anti angular-momentum orientations) — and it feeds queue item 12 (`chirality_retained_history_simulation_target`).

3. **Accelerative strain on angles/radii.** External acceleration strains exactly the geometry knobs; the closure landscape's Hessian gives the stiffness spectrum (soft modes = first strain sinks, candidate h-click storage; stiff modes resist). Queued as item 20.

4. **Preferred inventory per group velocity, $L^*(u)$.** At each $u$ the closure optimum selects a geometry, hence definite $L^*(u)$ and internal action $S^*(u)$; with the escapement, $L$ is h-click quantized — a discrete state ladder per speed. Mismatch (braid carrying $L\neq L^*(u)$) has three relief channels: re-geometrize into soft modes, transact/radiate the excess (clicks, emission), or SELF-ACCELERATE toward the $u$ whose preferred inventory matches — the braid "wants" a speed set by its cargo. Consequences worth stating: closure-cost curvature along $u$ is an inertia-flavored quantity (apparent mass as re-optimization stiffness); state-preferred kinematics is de Broglie-flavored. Testable inside item 19's evaluator: compute $L^*(u)$, off-ladder cost, and the gradient sign (direction the braid wants to change speed). Folded into item 19's notes.

5. **Decay rates vs speed and acceleration (operator: centrifuge idea).** "Less radiation with speed" is established physics (muon storage-ring lifetime dilation at $\gamma\approx29$; Kündig's 1963 Mössbauer-rotor time-dilation measurements are the centrifuge version) — a RECOVERY obligation, and item 19 carries the candidate mechanism: if the rail forces internal cadence $\omega\to\omega/\gamma$ under drift and decay is a click-transaction process paced by that cadence, decay-rate dilation follows from closure. The genuinely new testable content is ACCELERATION dependence: the relativistic clock hypothesis (decay follows pure $1/\gamma$ regardless of acceleration) is verified to $\sim10^{18}\,g$ in the muon rings, while in $\mathbb{A}\mathbb{A}\mathbb{A}$ acceleration strains the braid geometry (item 20's stiffness spectrum), which should shift transaction rates. Therefore the clock-hypothesis experiments are a quantitative BOUND on the champion's closure-stiffness Hessian: the braid must be stiff enough that $10^{18}\,g$ produces no decay anomaly at measured precision. This converts item 20 into a contact-with-tested-physics constraint (falsification-budget style) rather than an internal diagnostic. A mechanical centrifuge ($\beta\sim10^{-6}$, huge $a$) probes the acceleration axis, not the speed axis. **Promoted 2026-07-08 (operator-directed):** the recovery obligation is now a corpus row — [Braid Recovery Requirements](../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md), "Decay-rate dilation and the clock hypothesis."

## 2026-07-08 Session Insight Index (In-Play Threads)

One-line index of this session's live insights with their capture homes, so nothing rides only in chat:

- **Field-speed pin**: partner pump persists super-field; self-hit brake onsets at $\beta=1$; the edge is a two-sided attractor (the clicker's self-enforcing rail) — [spec Sections 11–12](fold-crossing-chart-spec.md).
- **$d_0$ bound**: retention balance bounds the coincidence stratum ($d_0\le\rho_c^*\approx0.022$, declared $R_{\mathrm{MCB}}$ well inside); $\varrho(\beta)$ measurement and $R_{\mathrm{MCB}}$ reconciliation open — Section 12.
- **Cross-hit closed for the neutral braid** on the causal root-sum (~1% of pump, ejective; polarity sets sign) — Section 14.
- **Harmonic-matching principle**: only the co-rotating-frame DC wake drives circular kinematics; rigidity is why closure is possible; beats/counter-rotation/speed-modulation shed power into unmatchable harmonics — Section 18.
- **League table + unified closure metric** (one $\kappa^*$, all layers/components/cycle): the general search instrument — Sections 17–19.
- **Kepler-third-law radii tested and rejected for locks** (retardation kills static-binding intuition at $\beta\sim1$) — Section 18.
- **Layer tilt tolerance $\propto1/\beta$** = the operator's Lorentzian flattening recovered layer-by-layer — Section 21.
- **Rest-state champion = the SPINDLE BRAID** (operator-ratified name 2026-07-08; corpus glossary + configuration-space entries) ($0.4721$, refined $0.4531$): rail pair + counter-dished inner + slow polar caps $30°$ behind, rigid, one frequency, sub-field except the hinge; hierarchy REVERSED (the braid wants its caps) — Sections 20–23.
- **Axial-dipole emergence** (metric walked to an existing corpus structure) and its no-levitation caveat — Sections 20–21.
- **Misalignment angles vs weak mixing** (cap lag ~30° / Weinberg 28.7°; inner dish ~12° / Cabibbo 13.0°): coincidence-class; promotion route = sharpen + closed form + RUNNING with $u$ — entry 1 above; item 19.
- **Chirality**: law C-even/P-even; braid is a chiral object ($h=\hat{\mathbf d}\cdot\hat{\boldsymbol\omega}$); cap-dish anti-alignment selected (measured binding flip); front cap under drift = helicity-polarity lock, item 19 will select the leader — entry 2 above; item 12.
- **Stiffness spectrum under acceleration** (soft modes = strain sinks / h-click storage; clock-hypothesis bounds constrain it) — entry 3+5 above; item 20.
- **$L^*(u)$ preferred-inventory ladder**: off-ladder relief = re-geometrize / transact / self-accelerate; inertia as closure-cost curvature along $u$; de Broglie-flavored — entry 4 above; item 19.
- **Forward lock dynamics**: perturbation basin (quantized recovery in clicks?) and formation auto-tune (middle locks to rail first = master clock?) — queue items 17–18.
- **Screw-motion rigidity**: rotation + axial drift stays rigid, so the drift study is cheap — queue item 19.

6. **Pro/anti, helicity, and circulation (operator Q&A 2026-07-08, post-Section-24).** Model answers, prescribed-worldline claim level: (i) the anti-braid is the exact C-conjugate (polarity swap on the same geometry) and is degenerate in isolation — matter/antimatter preference CANNOT come from the pairwise law; the asymmetry burden lands on formation kinetics (item 18) and sea polarity/chirality texture, with the measured helicity-polarity lock as the C-odd handle an environment can grip (absolute time supplies the arrow — Sakharov-style ingredients live in the formation era). (ii) The measured lock IS a helicity lock: the champion travels spin-anti-parallel to motion (left-handed) leading electrino-first; the P-enantiomer is the right-handed glove (law P-even, both degenerate); which glove nature populated = the same open environmental selection. (iii) All six sites circulate the travel line in ONE common sense — not assumed but selected (harmonic matching; counter-rotation rejected at 0.85–0.99). (iv) cw/ccw is the handedness label, pro/anti the polarity label — independent, but closure rigidly correlates (sense, leading polarity, species) three ways: the approaching champion shows an electrino cap rotating cw from the observer's viewpoint; its anti-braid a positrino cap, same sense; mirrors show ccw.

7. **Why P and CP look the way they do (operator question 2026-07-08).** Structural answer at speculation/derivation-sketch level, from the measured spindle results: the pairwise law is P-even and C-even, so channels that do not read the braid's internal glove (bulk wake exchange; EM/strong-flavored) conserve parity. The braid ground state is chiral (spontaneously — two degenerate enantiomers), and the measured helicity-polarity lock is MAXIMAL, so channels that reorganize internal structure (weak-flavored transactions) read the glove directly: maximal P violation exactly there, none elsewhere. CP: the lock correlates handedness WITH polarity, so the left-pro ↔ right-anti swap restores degeneracy — CP exact at leading order. The model therefore reproduces the observed hierarchy (P maximally broken sector-selectively; CP nearly exact) with small CP violation genuinely next-order: candidate sources are sea texture (absolute-time arrow) and interference between transaction paths at different running internal angles (pass-2 angles run with $u$ — a CKM-phase-flavored mechanism). Also clarified: "total site speed" = Euclidean vector sum of transverse rotational and axial drift components in the void frame; the self-hit onset reads its magnitude, making $c_\perp=\sqrt{c_f^2-u^2}$ a Pythagorean budget — the geometric origin of $\gamma$. And the near-free slow travel (fixed geometry, four digits at $u=0.2$) is the flat bottom of the Lorentz curve, while the pass-2 preferred-motion tilt (re-optimized geometry) is toll-gated by the $L^*(u)$ ladder: the braid wants to move but must transact clicks to re-gear — inertia as quantized toll.


8. **Total site speed recap; the budget square and the ultimate-energy stop (operator Q&A 2026-07-08).** Total site speed = Euclidean vector sum $|\mathbf v|=\sqrt{u^2+(\omega\rho)^2}$ (drift $\perp$ transverse rotation) in the void frame; the sub-field budget is the quarter-circle $u^2+(\omega\rho)^2\le c_f^2$. Its two edges are two famous limits: the INTERNAL edge (rotation at $c_f$, $u=0$) is the corpus horizon-alignment condition (braid symmetry-breaking point); the DRIFT edge ($u\to c_f$, rotation $\to0$) is the photon limit (2D, no internal clock — matching photon Gate A's no-rest-clock row). The corner (both at $c_f$, total $\sqrt2\,c_f$) is past both edges — doubly super-field, all self-hit ledgers open: interior/collapse regime, not the horizon. Ultimate-energy stopping point: OPEN; the in-model candidate is maximum-curvature saturation at the collapse-arresting scale $d_0=R_{\mathrm{MCB}}$ ($r_{\text{max-curv}}$ in the SI-units ledger) — the same $d_0$ from the 2026-07-08 self-hit disposition. Flagged for derivation.

9. **Proper time = the braid's click/phase count (operator question 2026-07-08).** The braid's own time is its accumulated internal rotation phase — the escapement's ticks. Absolute time flows in the void; at the pinned cadence $\omega_0/\gamma$ the phase accumulates as $\tau=t/\gamma$. "Time in the relativistic frame" is bookkeeping of the braid's own hinge ticks; observer-level simultaneity (the full frame construction) is Einstein synchronization with dressed light layered on top. Dilation = the Pythagorean speed budget, nothing more.

10. **Michelson-Morley analog flag (operator 2026-07-08).** The measured flat Lorentz bottom (fixed-geometry slow drift free to four digits) is the ISOTROPIC part of preferred-frame suppression. MM specifically tests ORIENTATION dependence — and the drift sweep so far is axis-parallel only. Named future computation: perpendicular-drift closure (breaks screw rigidity — cycloidal sites, cycle-sampled evaluator) vs parallel; the corpus preferred-frame leakage budget requires the anisotropy below cavity precision. First installment already in hand: quadratic suppression of the isotropic part.

11. **Super-field drift flag (operator 2026-07-08).** At $u>c_f$ every site is super-field regardless of rotation; the pinned-cadence formula $\sqrt{c_f^2-u^2}$ has no real solution — the sub-field spindle family ENDS at the photon edge. The "minus sign under the root" that puzzles physicists maps to the speed budget failing, not to literal imaginary time. What record (if any) a super-field-drift family carries — does the geometry "open back up" — is the flagged question; the self-hit ledger would dominate such a family.

12. **h-transaction mechanics flag (operator 2026-07-08).** The champion already realizes the "$h/2$ borderline": the middle binary sits EXACTLY at self-hit root birth — poised on the fold, the edge of tipping. A transaction = one controlled fold crossing ($\pm1$ root, one $h_{\mathrm{act}}$); the donor-receiver "could go either way" moment is a separatrix crossing (deterministic multistability; basin-boundary language already canonical); "wave-function collapse" reads as increment/transaction, not drama — a change of integer state. Operator's edge-of-gravitational-capture duality noted as a candidate reading of the separatrix. Needed: the two-party transaction study (donor braid + receiver braid sharing one wake record, resolving who books the click) — connects items 12, 17, and the escapement section of braid-mathematics.

## Brainstorm Capture 2026-07-09: The Exuberance Batch (Operator Session, Late Night)

Captured with intent-notes so future readers know WHY each was worth writing down and what it connects to.

13. **MCB via the ultimate spindle.** MCB/$R_{\mathrm{MCB}}$ is declared-and-bounded, not derived. New attack: prove collapse arrest for the SPINDLE FAMILY — does the family have a minimum-radius member where self-hit spatial self-regularization arrests compression? Power: unifies the ultimate-energy stopping point, $d_0$, and $r_{\text{max-curv}}$ into one theorem on a family we have machinery for. Relationships: Section 26 budget square; the interior/collapse regime; particle-masses.md's open derivation. Also filed: spindle DECAY en route to the recycling core (arriving as an architrino melee) reopens the 2018 FCC-vs-HCP sea-packing fork — SH-0-sea fixed FCC as working lattice; HCP is the unexamined alternative.

14. **The score, calibrated (anti-exuberance anchor).** Unified residual 0.4721 rest / ~0.404 moving basin. We are NOT aiming for zero in the rigid family — zero would mean rigid circles exactly solve the master equation (almost certainly false). The family's job: find the basin (done — it found the spindle). The native run's job: the true limit cycle in the basin. The certificate machinery's job: PROVE residual bounds. Ladder: chart → native orbit → interval certificate. Textbook value: this three-rung ladder is the general epistemology of the whole program.

15. **Time pedagogy: the absolute observer's integer ledger.** A braid's proper time = its hinge click count — an integer ledger in absolute time that ALL observers agree on. "Slower" = fewer clicks per absolute time (Pythagorean budget). All frame transformations are observer-level shadows of one absolute table (speed budget → click rate → ledger); twin-style comparisons are integer comparisons — paradox-proof by construction. Operator dual, verbatim intent: an analog EE explaining semiconductor gate on/off ticks — the transistor is analog physics dressed as a bit, and so is the hinge; "nature has always been analog; the quantum idea got overblown." Textbook power: replaces simultaneity mystique with bookkeeping. → Queue item 21 (dedicated corpus/mapping document).

16. **Is $h$ constant in the absolute frame? (the deep one).** Split: TOPOLOGICAL half — the click count is integer and absolute; if action-per-click is click-invariant, $h$ is absolute-frame constant by topology and relative-frame constancy is free (moving labs count the same clicks). DYNAMICAL half (OPEN, computable): does $h_{\mathrm{act}}(u)$ run with drift? Measure the click action on the drifting spindle at pinned cadence. If invariant: Planck's constant is topological bookkeeping — quantum universality as integer arithmetic (discovery-grade: why $h$ is the one constant that never runs). If it runs: observed constancy becomes a selection constraint. Either answer leads somewhere. Relationships: escapement (braid-mathematics), $L^*(u)$ ladder, item 17's click-quantized recovery.

17. **Beyond the horizon: the sign flip is a family change, not time reversal.** $u^2>c_f^2$ makes the budget $(c_f^2-u^2)$ negative — the same algebra as GR's interior $r$/$t$ role swap. The "negative time / white hole / negative energy" echoes physicists hear are a true signal with wrong ontology: in $\mathbb{A}\mathbb{A}\mathbb{A}$ the flip means the rotation budget is gone and the self-hit ledger owns the dynamics (super-field interior family, $d_0$-regulated). White-hole echo = SMBH-core recycling (already corpus). The photon does not "splat" at $u=c_f$: the massive spindle family ends there, and the photon is a DIFFERENT assembly (planar pair) native to that edge. Future study: the interior family, joined to entry 13.

18. **Analog tipping at $h/2$ (operator clarification).** Beneath the integer is a genuinely analog separatrix: at half-quantum poise, an arbitrarily small external wake decides the transaction — for donor AND receiver. Slogan for the textbook: ANALOG SUBSTRATE, INTEGER BOOKKEEPING. "Collapse" is an increment; apparent randomness is unresolved micro-history; free-will debates stare at the ledger and miss the machine. Candidate duality noted: the poise as the edge of gravitational capture. Relationships: fold-set escapement, deterministic multistability, the champion's measured rail-poised middle, Bell/record-measure machinery (quantum-closure lane).

19. **Project meta (for the history file and the comic).** The work's own progress feels Lorentzian — long flat effort, then the steep ascent as closure approaches. File under history-of-AAA material with the 2018 FCC/HCP origin note; revisit for the history/philosophy volume (entry 20's textbook plan).

20. **The zero-entropy crystalline core (recycling endpoint, operator 2026-07-09).** The ultimate endpoint of recycling is NOT a singularity but a maximally packed core — sphere-packing-optimal (FCC/HCP) of maximally compacted braids — which when pure has ONE microstate and ZERO entropy. Realistically imperfect: crystalline domains of FCC and HCP with twists between them, defects (a spare architrino wedged in, a packing gap). Why braid packing: optimal for spheres AND the natural launch state for recycling (maximally compacted braids as the release inventory). Power: replaces the singularity with a statistical-mechanics object (entropy counting over packing microstates — connects to the corpus horizon-entropy target); defects become the seed inventory for what emerges on release. Relationships: entry 13 (ultimate spindle / MCB), entry 17 (interior family), SMBH-core recycling, the 2018 FCC-vs-HCP fork.

21. **Mass is a defect (operator, humorous-serious).** Braids must be breakable (else no other particles); the bloated fermions are ANOMALIES — very large bubble-assemblies compared to the sea's Noether braids. So mass = a defect in the sea's order, in the same register as crystallographic defects in entry 20's core. Power: inverts the intuition (the vacuum is the pristine structure; particles are its flaws) and gives the mass map a defect-theoretic language. Relationship: shielding-tier generation ladder; "small observed mass from large shielded interior energy."

22. **Emergence universality hypothesis (operator).** Architrinos, roughly 50/50 by polarity, with only emission/reception potential physics, generate all observed complexity — AND would generate it the SAME WAY every time given roughly similar large-scale absolute volume density. Universality claim: the emergent hierarchy (braids → sea → assemblies → chemistry) is an attractor of the dynamics + density, not an accident of initial detail. Testable shadow: formation studies (item 18) should show insensitivity to initial-condition detail within a density band. Assessment: consonant with everything measured this session (closure landscapes have broad basins — attractor-flavored), unproven, and the right kind of falsifiable.

23. **The frame irony (operator, for item 21's document).** Labs sit within $\beta\sim10^{-3}$ of the sea/CMB frame ($\gamma-1\approx7\times10^{-7}$): every classic relativity experiment was performed numerically FROM the absolute frame while confirming a formalism that denies that frame. "The muon's clock runs slow" is a true absolute-frame ledger statement (asymmetric fact); SR reciprocity is dressed-light synchronization bookkeeping taught as ontology — the manufactured symmetric mystery behind twin-paradox confusion. Pedagogical unlock for the relativistic-time document.

24. **Horizon-state coalescence derived (answer to the operator's interior question, 2026-07-09).** The all-rail condition ($\omega\rho_a=c_f$ for every layer) forces ALL CYLINDRICAL RADII EQUAL: the three layers coalesce onto one cylinder — with tilts, distinct spherical radii and heights survive ($R_a\cos\alpha_a=$ const), so the horizon-state spindle is a BARREL: six sites, one cylinder radius, stacked heights, phase offsets. This is the spindle-family derivation of the corpus coplanar/co-linear horizon-alignment condition. Provenance: each architrino keeps polarity + full path history (the ledger IS the provenance). Interior: budget flip, self-hit ledger dominant; whether the polar degree of freedom re-opens (singularity-resolution heuristic) en route to entry 20's crystalline core is the named interior-family study, now with a concrete starting state.

25. **The u^1.5 dissolved + the MM verdict sharpened (2026-07-09, spec Section 29).** The Section 28 anisotropy exponent was a linear-quadratic CROSSOVER ($u_\times\approx0.063$, dead center of the coarse grid): gap $= 0.102|u| + 1.61u^2$. Clean split: perpendicular loss $2.01u^2$ and helicity-AVERAGED parallel cost $0.422u^2$ (coefficient constant to 0.4% across the whole grid — suspiciously beautiful; worth understanding why) are both pure quadratics; the ONLY first-order term is the leader-selected helicity-polarity lock. Verdict: orientation anisotropy is second-order — the MM-analog null structure holds with no first-order leakage. The residual exposure is Hughes-Drever-CLASS (spin-coupled, $0.102|u|$ in closure units), gated on the open closure-to-energy map. Note the physics: an unpolarized ensemble sees $u^2$; only a chirality-locked (spin-polarized) system sees $|u|$ — the preferred frame hides from interferometers but could whisper to spin-anisotropy experiments. That is a POINTABLE experimental signature class once the energy map exists.

26. **h_act(u) first pass: two ledgers, and h-constancy as a possible THEOREM (2026-07-09, spec Section 31; answers entry 16's dynamical half at first-pass grade).** Frozen geometry, pinned cadence: the STORED action per click dilates exactly as $1/\gamma$ (invariance would require $\gamma$-growing inertia — relativistic mass appears as a CONDITION, not an assumption: the braid's inertia must dress as $\gamma m_0$ for its stored ledger to be click-flat). The TRANSACTED ledger (wake angular impulse per click) runs: $1\pm0.236|u|-1.28u^2$ — same helicity/orientation split as entry 25, and the preferred leader transacts MORE per click (the lock is a transaction-hungry orientation, consonant with the alignment torque). Frozen-geometry pump-work reverses sign by $u\approx0.5$: rest geometry is off-family at mid-drift, small-$u$ claims only. THE REFRAME: geometries with $J_z$ above and below rest value bracket a $J_z$-CONSERVING trajectory geo($u$); if it coincides with the closure-optimal trajectory, $h$-constancy is DERIVED from the closure principle (why $h$ never runs = the braid re-shapes to hold its per-click transaction fixed, and that re-shaping IS the preferred geometry). If they diverge: $h$-constancy selects which family members dress into matter. Either way the angles-run results (Section 25) get a second, independent meaning: the running angles may BE the $J_z$-conservation mechanism. Queued as priorities item 23 (needs the item-20 systematic minimizer; coordinate-descent saddle wander is the instrument limit). Relationships: entry 16 (parent), entry 25 (same decomposition), item 21's open-question section (this is its named test, now with numbers).

27. **The valve, the clicker vindicated, and the epicyclic middle (2026-07-09, spec Section 32).** The same-source channel on a rail-riding site is a PHASE-SENSITIVE VALVE: exactly +1 (outward pump) at steady ride, boosted outward when decaying, brake-and-inward only when actively driven — derivative feedback with a destabilizing static bias. Consequences worth holding onto: (i) the native dispersal was not a mystery failure but the valve's steady-state doing exactly what it does — no steady supra-rail circle can ever be radially confined by its own wake; (ii) the operator's ancient "middle rides the rail and is the clicker" intuition comes back SHARPENED: riding disperses, CLICKING confines — the physical middle is a rail-straddling limit cycle booking absorptive+inward impulses every crossing; (iii) the budgets put a number on the next candidate: circular click geometry wastes its impulse tangentially (70:1), and only a radially-breathing (epicyclic) middle re-angles the self-hit ray to feed the radial ledger (target ≲12:1) — the first time a candidate-row GEOMETRY change is being driven by a measured ledger-consistency requirement rather than by closure-metric search; (iv) speculative but delicious: a breathing middle is an INTERNAL OSCILLATOR with its own frequency — a de Broglie-flavored internal clock riding inside the braid, born from confinement bookkeeping rather than postulated. Relationships: Section 30 named route (non-circular same-level), entry 24 barrel interior (breathing survives coalescence?), item 18 formation (does the chatter self-start?).

28. **Discreteness may be the confinement enabler (2026-07-09, spec Section 34; the session's sharpest).** Chain: the click event is self-limiting (perfect ceiling in the continuum limit) → the pin is a SLIDING MODE on the rail (ride BY clicking) → but continuous sliding cannot rectify the radial cycle (damper slows the under-support escape to a steady outward drift, never stops it) → net confinement requires clicking only on the outward phase and coasting on the return — which only DISCRETE, finite-amplitude clicks can do. The discreteness scales on offer are exactly the theory's own: the emission stratum d0 (chatter quantum) and the integer h_act ledger. If 2b confirms rectification, the arrow reverses on a century of intuition: quantization is not a mystery layered on top of stable matter — stable matter exists BECAUSE action is quantized; a continuum braid leaks radially and dies. Corollaries to chase: (i) the rectified cycle's breathing frequency is an internal clock (de Broglie flavor, entry 27) whose amplitude is set by h — particle "size" and "frequency" from one ledger; (ii) the operator's h/2 analog tipping (any wake nudges click phase) becomes a decoherence-flavored channel: phase-nudged clicks slightly mistime the rectification, a candidate for measurement-adjacent physics; (iii) the sliding-mode picture gives the absolute observer a crisp statement: the middle binary's proper time IS its click sequence, now with a mechanism for why the sequence is discrete. Relationships: entries 16/26 (h_act), 27 (valve/clicker), item 24 step 2b (the test).

29. **The support sum rule and the sea's number (2026-07-09, spec Section 37).** At unified kappa*, the rigid spindle family can ALLOCATE radial support freely across layers (the lambda-probe trades middle against caps almost linearly) but cannot raise the TOTAL: mean support tops out at ~0.94. Three reframes follow. (i) The old champion's 0.76/0.53 rows were an allocation artifact; the family's real deficit is ~6% global — matter in a void is 94% self-supporting, and the last 6% is environmental. (ii) The corpus "Noether sea stability" obligation graduates from principle to NUMBER: the responsive sea must supply ~6% of the centripetal budget, isotropically, at the working radius — a computable target for the polarization channel (and a falsifiable one: if the dressed estimate comes in at 0.5% or 60%, the family is wrong). (iii) Speculative: a braid's binding to the sea (~6% of its internal budget) is the right order for a gravitational-coupling flavored ratio — worth a dimensional pass once the sea estimate exists; capture, don't claim. Relationships: Section 27 (static sea negligible — consistent, the static channel isn't the 6%), sh-0-sea polarization diagnostics (the live channel), entry 22 (emergence universality: sea and braid co-stabilize).

30. **Spacing-selective sea confinement: the retardation resonance (2026-07-09, spec Section 38).** The responsive sea confines the braid ONLY at commensurate spacings (the causal double-delay phase ~2*omega*R sets whether the reaction field arrives confining or loosening; instantaneous response would be strictly destabilizing). Consequences to chase: (i) the Noether sea should SELF-ORGANIZE toward mutually-confining spacings — a density-wave/lattice-selection principle; FCC selection might be phase-driven, not just packing-driven; (ii) braid cadence, braid scale, and sea spacing are coupled by the resonance condition — a co-tuning triangle that could FIX the absolute scale (the thing the scale-invariant evaluators can never do): the sea picks the braid size; (iii) matter in a mistuned region (wrong local spacing/density) loses its 6% margin — dispersal in underdense regions, a cosmological-flavored hook (voids hostile to matter?); (iv) the harmonic-matching principle now appears at three scales: within the braid (co-rotating DC wake), at the click (single-harmonic transaction), and braid-to-sea (commensurate spacing) — one principle, three floors. Relationships: entry 29 (the 6% number), entry 22 (emergence universality), SH-0-sea program (owns the polarizability and spacing selection).

31. **The 4.25 fixed point and the resonant sea (2026-07-09, spec Section 40).** Orientation saturation at the braid's own dipole delivers 4-6% at the named spacing — supply ≈ deficit. Speculations worth their own instruments: (i) the FCC spacing is not an input but the FIXED POINT of supply-equals-deficit (over-confined seas compress, under-confined disperse) — if the self-consistency solve lands at ~4.25 with no tuning, the named spacing graduates from measured constant to derived quantity; (ii) the fast-alignment requirement puts sea reorientation AT the braid cadence — a resonant orientational medium: strongly dispersive, frequency-selective, with natural hooks for photon propagation (dressed light IS the sea's orientation wave?), refractive behavior, and the h-transaction handshake (entry 12); (iii) the trio {94% self-support, 6% sea dressing, spacing fixed point} is a candidate origin story for WHY matter has a universal size scale — the sea picks it (entry 30's co-tuning triangle now has all three sides sketched); (iv) thermal/disordered seas deliver less margin → hot regions under-confine braids: a temperature-dependent binding with cosmological and reactor-adjacent phenomenology. Relationships: entries 29, 30; SH-0-sea orientation-order diagnostics (own the saturation question natively); item 21's document (the sea as the absolute frame's material carrier).

32. **The angular-momentum metabolism (2026-07-09, spec Section 42).** The assembled loop: sea torque feeds the braid (+0.11 net at the named spacing, forward on the bleeding inner, zero on the rail layer — the right sign structure with NO tuning); the internal wake channel moves it inner→middle (the knob-rigid −0.22 transfer); the middle's escapement clicks the surplus into outgoing wake; the wake drives the sea's orientation order, closing the cycle. Matter as an OPEN SYSTEM in steady state with its medium — respiration at the substrate level. Chases: (i) the dispersal clock of ISOLATED matter (t~0.8) becomes a prediction knob: decay rates should depend on sea decoupling (deep voids, screened environments — testable flavor); (ii) the four resonance conditions of this arc (harmonic matching in-braid, click commensurability, sea spacing band, alignment-speed resonance) look like ONE commensurability principle wearing four hats — candidate unification target; (iii) if the braid's sustained state requires continuous sea exchange, inertia and gravitation both live in the exchange terms (Mach-flavored, but with a mechanism and numbers to chase); (iv) the h-ledger: every link in the loop is click/wake bookkeeping — the metabolism is denominated in h_act. Relationships: entries 29-31 (the 6%, fixed point, resonant sea), Section 41 (the transfer), item 21's document (absolute-frame narrative gets its material engine).

33. **Entry 31 corrected, and the better question it leaves behind (2026-07-09, spec Section 45).** The "4.25 fixed point" speculation is refuted at exact-delay grade — the uniform loop-delay idealization flipped signs, and the honest fixed point for a homogeneous v1 sea is R* ≈ 3.4. What survives is BETTER: (i) the fixed point EXISTS (supply=deficit has a solution, the self-consistency loop is real); (ii) the band tracks the SEA ASSEMBLIES' phases, not the dressed braid's — so the commensurability inversion becomes a measurement: given the observed/named spacing, infer the sea's cadence (0.8ω if 4.25 is right) — the sea's internal clock read off a lattice constant; (iii) the mistake itself is a lesson the theory keeps teaching: NOTHING here survives idealization of the delays — every wrong answer this arc (pointwise clicks, uniform loop delays, static sea) came from flattening causal structure, every correction came from honoring it. Retardation is not a correction term in this theory; it IS the theory. Relationships: entries 30-32 (survive with relocated numbers), Row 3 record (Section 44 by title), SH-0-sea provenance audit (named next).

### 2026-07-09 — Stability must be mechanism, not fine-tuning (operator discussion while Row 5 runs)

Operator observation: a braid that underwrites the universe across scales must be extraordinarily stable, so once the geometry is found there should be strong structural reasons for that stability. Agreed framing captured: V3-class cells are verified FORCE BALANCE at the seed, not stability — stability = restoring response, measured only by the native gate (twin rows). Universe-grade persistence implies a WIDE attractor basin plus active self-restoring mechanisms, not a knife edge; if V3 survives only for delicate digits it is not nature's braid, and the funneling of nearby states into it would be the real discovery. Mechanism inventory already in hand: (i) field-speed pin (natively confirmed two-sided speed attractor — cadence selected, not tuned); (ii) escapement h_act clicks (discrete metering at the hinge, a regulator); (iii) support sum rule (allocation freedom absorbs perturbations by re-allocation); (iv) the repeated co-improvement of closure under ledger-first objectives (0.324 -> 0.286 -> 0.206) hints at a common variational extremum where support corridors, tangential closure, and closure residual coincide — if real, THAT is the deep stability reason, and scale-covariance of the rigid dynamics would replicate the dimensionless geometry across scales with d0/h discreteness setting the absolute floor. Scope note: "sea not required" means no DYNAMIC sea requirement for I/M scaffolding; the caps still take ~1/3 of their need from the static sea, and the bath role remains in any interaction story. Named test if Row 5 survives: map the basin width and identify which of (i)-(iv) does the funneling.

Addendum (same discussion): the operator notes the M binary itself sits on a knife edge (beta = 1 exactly). Sharpening captured: distinguish TUNED edges (unstable equilibria needing set digits) from PINNED edges (setpoints of two-sided switching feedbacks — pump below the rail, self-hit brake above, natively confirmed attractor). The rail is a pinned edge: the discontinuity IS the mechanism, and its precision is paid for by the h_act click flux (regulation events), with the setpoint fixed by medium constants (c_f, kappa, d0), not by history. Universality of particle properties (every electron identical) then DEMANDS pins over tuning for every load-bearing quantity — so the basin map's real question is which geometry knobs (tilts, radii, allocation) have their own pins versus mere passive curvature. Also captured: sea orientation is a LOCAL field (slaved to the strongest local DC residue: neighbor dipole lines near assemblies; gravitational-gradient combing at scale; frustrated disorder in the bulk), with ambient drift visible only in the lagged dynamic response — named cheap test: slow-limit orientation under (i) graded ambient residue, (ii) uniform drift, on the existing instrument. Local-c reading: oriented patches = direction-dependent dressed propagation (effective-metric anisotropy near masses); disordered bulk = isotropic mean c with drift in one-way channels.

Addendum 2 (same discussion) — does FCC-12 still make sense? Captured verdict: NOT as an assumed bulk lattice. Four record facts against it: (i) provenance — never derived, packing convenience + window-midpoint spacing convention (Section 46); (ii) the orientational ground state on that neighbor geometry is FRUSTRATED (2026-07-07 order diagnostics) — frustrated lattices restructure; (iii) commensurability — preferred spacing tracks each assembly family's own cadence, so a polydisperse sea has no single lattice constant; (iv) angular placement moves margins at order one (Section 44) — coordination geometry is load-bearing, too load-bearing to assume. Surviving weaker reading: the V3 environment is a SOLVATION SHELL claim, not a lattice claim — first coordination shell organized by the braid itself, radius from the braid<->sea fixed point (the 2.453 solve), occupancy from packing at that radius; braid<->sea and sea<->sea spacings need not agree (local strain, substitutional-impurity analogy); bulk beyond is claim-negligible for the near-field cap credit. Named derivation replacing the assumption (cheap at credit-proxy grade): sea-braid dimer equilibrium spacing -> small clusters -> preferred coordination number and angular placement at the shell radius, with the steric consistency check (12 neighbors of ~2-unit extent at mutual spacing 2.453). Row 5's in-build true-placement credit re-derivation is the first step already bound.

## 2026-07-09 — Post-Row-5 operator questions: sea orientation texture vs "local c", and the pinned-rail vs knife-edge distinction (discussion capture)
- Operator Q1 (open): if the sea's hold is axially organized, what does the LOCAL effective field speed look like? Are sea braids locally co-oriented, and along what — the central braid's field texture, ambient c drift, or the gravitational gradient? Current instrument answer (measured, Row 5 build): near-shell slow-limit orientations follow the central braid's cycle-averaged causally delayed field = its axial polarity dipole TEXTURE (field lines), not a uniform direction — equatorial sites anti-parallel to the axis, polar sites parallel (measured pHat=(0,0,-1) at equatorial FCC sites). Implication to probe: an orientationally ordered sea is a locally UNIAXIAL medium (anisotropic effective propagation — birefringence-class signature tied to the order parameter); isotropic-c recovery should be the disordered far-field limit. Drift and gravity-gradient organizers are unprobed instrument questions (slow-limit orientation of a sea site in a uniformly drifting sea; in a density-gradient sea).
- Operator Q2 (position): the M binary genuinely sits on a knife edge (the c_f rail). Reconciliation with the no-fine-tuning principle: distinguish a fine-tuned PARAMETER (measure-zero knob, no restoring force) from a dynamically PINNED critical surface (attractor). The rail is the latter — natively confirmed speed attractor (pump from below, self-hit click brake from above; the escapement). The pin converts a measure-zero condition (beta=c_f) into a generic outcome: criticality-as-attractor. The still-open knife-edge worry is PARAMETER basin width of V3-class geometry (descent-grade point cell, basin unmapped — booked caveat), which the Row 5 seed-gate rejection did not touch.

Addendum 3 (same discussion) — magnetism mapping and the chaining question. (i) The gravitational-gradient combing is mathematically a PARAMAGNET: frustrated local moments + weak DC bias -> Langevin/Curie partial alignment (grain-alignment analogy exact). Mapping candidate (comparison grade): bulk magnetization = orientational order of assembly dipoles — combing and magnetization as one phenomenon; the orientation-order diagnostics are secretly magnetism instruments. (ii) Why no end-to-end dipole chains (positrino-to-electrino)? Three record-grounded reasons: measured neighbor preference is dipole-REVERSED (anti-aligned side-by-side -> quiet quadrupolar doublets, not chains); dipole length ~ assembly size, so end-to-end contact = merging = a REACTION channel, not linking; causally delayed cycle-averaged coupling suppresses the static head-to-tail term and substitutes commensurability bands whose anti-confining troughs hold assemblies off chaining distances. True ground state (paired-quadrupolar vs chained vs glassy) = the sea-braid dimer/small-cluster derivation, now forced by the Row 5 polar-credit rejection.

Addendum 4 (same discussion) — pair production from quiet doublets (operator speculation, captured at brainstorm grade). Inventory arithmetic: quiet doublet = 2 anti-parallel braids (12 architrinos); two doublets anti-paired = 4 braids = 24 architrinos = exactly (6 core + 6 accessory) x 2 — the constituent budget of an electron-positron pair in the accessory-dressing reading, IF two of the four braids DISSOCIATE and their members are captured as accessory/personality charges on the surviving cores. Mechanism candidate for the dissociation: the anti-damping dispersal we have catalogued all arc — the rejection catalog doubles as a catalog of donor channels (a braid destabilized by the reaction wake disperses into capturable free architrinos). Observational reverse-engineering clues: (i) threshold 1.022 MeV = the reorganization ledger of one quartet (quiet doublet-pair -> two dressed free braids); (ii) the nucleus requirement (rate ~ Z^2) = the heavy assembly's near-field gradient as the reaction scaffold/momentum wall; (iii) annihilation as the reverse reaction, with positronium as the closest observable to the sea's own ground state — para/ortho lifetimes and the 2-gamma/3-gamma split benchmark the dressed two-braid bound state one step above the quiet doublet; (iv) the spin ledger (photon spin-1 in, two spin-1/2 out) constrains the unbinding topology of the quartet. Consilience note (comparison grade): a sea whose ground state is anti-parallel quiet pairs sitting 1.022 MeV below free-pair promotion is the Dirac sea reborn with internal structure.

34. **Tangential-Sea No-Go and the braid+sea complex reframe (2026-07-11, spec Section 70; operator-accepted).** The route-enumeration cornered S1/S2 and the fork resolved three ways. (1) The §50 "axial environment cannot push the equatorial ring" law extends to the TANGENTIAL rail-pump channel as a named no-go: axisymmetric ($m=0$) sea = exact bar (zero azimuthal force on a co-axial site, instantaneous); any static sea = certified non-absorber (Corollary S: geometric torque $c_0$ does exactly zero cyclic work, velocity-linear $Q<10\%$, order-robust); the one dissipative channel ($\chi''(3\omega)$ at $m=3$) is already closed (induced polarization $5$–$15\times$ too stiff; §67 circulatory/destabilizing; cage-scan: grip and shear are one multipole). The sea is barred IN PRINCIPLE from the equatorial rail — no new sweep. (2) Dropping iso-frequency does NOT self-absorb: the binding barriers are neutrality (97% cancel → +0.035 ejective, §14) and the super-field straddle (sub-field gives zero clicks, super-field injects a new pump), not iso-frequency. (3) THE REFRAME (selected): the "+0.076 deficit" is a LOCAL equatorial quantity with $\beta_M$, the deformation coordinate, and the sea all frozen — the bare-release artifact. The no-go forbids a local equatorial brake but NOT a GLOBAL angular-momentum drain through the off-equatorial/axis channels the sea owns (Row-4 +0.117; §68 orientation torque), coupled via the un-frozen §69 deformation coordinate. Right object = the self-consistent braid+sea complex fixed point (§54's molecule-in-solvent), the SAME object $A_0$ + the axis anchor need. Load-bearing new distinction: local equatorial brake (barred) vs global angular-momentum drain (open). Chases: (i) does the middle's rail-pump angular momentum transport off-equator and drain into the sea where it has authority — the global-budget test the bare instruments cannot pose; (ii) if yes, matter-in-its-sea is the irreducible object and "bare particle" is a fiction the whole arc has been fighting; (iii) the metabolism loop (entry 32) is the same drain seen from the sea side — now with a no-go telling us WHICH channel (off-equatorial, not equatorial) carries it. Build spec named: coupled-braid-sea-complex-fixed-point-instrument-spec.md. Relationships: entries 29–33 (the 6%/fixed-point/resonant-sea/metabolism arc), §69 shared-channel synthesis, boosted-delay grand convergence ($A_0$ shares the object), supersedes the tangential half of structured-sea-shared-absorber-instrument-spec.md.
