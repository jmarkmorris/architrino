# Braid Ideal Brainstorming

Status. Priority-only brainstorming packet under [braid-ideal](braid-ideal.md). This is not a theorem row, not a retained branch certificate, and not reader-facing canon.

Claim level. Speculation and derivation-closure target. The central candidate is that a Noether braid may have a same-level branch in which all six architrinos operate at basically the same branch energy/action level, with comparable relative speed magnitude and comparable distance from the dynamic center. The branch would maintain that configuration unless destructively perturbed and would exchange action/energy through $h$-scale transactions.

Working label. `ideal_braid` is a working label only. It is deliberately speculative: the point is to test whether the six-body Noether braid has a simple common-level attractor that would look obvious in retrospect if it exists.

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

The held-release result separates two claims that should not be conflated.

First, there is a Euclidean-void symmetry claim. The perfect six-point seed appears to remain on the center-zero, common-sphere, antipodal-pair invariant manifold under the bare partner-wake toy. This may be analytically provable from coordinate-permutation symmetry plus charge-conjugate inversion. If proved, it would be a structural fact about the symmetric six-body configuration, not yet a stable braid.

Second, there is a stability claim. The same run does not settle to a stable radius and does not complete a bounded breather cycle. It contracts once and then expands outward. That suggests the Euclidean-void version may be mathematically elegant but dynamically unstable.

This is favorable for the larger Noether braid architecture rather than damaging to it. A Noether braid is not expected to be only a Euclidean-void all-pairs partner-wake problem. The missing stabilizing ingredients are precisely the ones the architecture already treats as central: same-source self-hit, retained wake energy, history-aware action accounting, shielding, angular-momentum accommodation, and Noether sea response. The Noether sea may be the medium-response layer that turns an exact symmetric scatter channel into a bounded basin, breather, or stable-radius branch.

ELI5 summary. In empty space, the six architrinos can keep a beautifully fair dance on one changing sphere, but the sphere keeps growing after the first squeeze. The Noether sea may be the springy surrounding medium that supplies the return response needed for the dance to repeat or settle.

Proof route. Prove the Euclidean-void invariant first, then test which additional retained-history or Noether sea response term changes the reduced radius equation from escape to bounded return. The next useful diagnostic is not just whether the common sphere survives; it is whether the reduced radial motion has a turning point after the first expansion, a stable fixed radius, or a bounded limit cycle.

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
D_{t,ab},
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
\min(D_s,D_t,1-\beta_{\max}).
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
D_{t,ab}=c_f-\dot{\mathbf x}_a(t)\cdot\hat{\mathbf r}_{ab},
$$

with

$$
W_{ab}^{\mathrm{rec}}
=
\left|\frac{D_{t,ab}}{D_{s,ab}}\right|.
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
- [Equal-Frequency Energy-Radius Candidate](../braid-angular-momentum-spin/equal-frequency-energy-radius-candidate.md) preserves a related but distinct candidate: common binary frequency with distinct effective lever arms and speed rows. It explicitly avoids flattening equal frequency into equal radius, equal speed, or equal energy.
- [Noether Braid Scaling and Packing Scaffold](../braid-dyadic-lock/noether-braid-scaling-and-packing.md) contains ideal rest-level pool scaling and packing material. That is useful downstream once the internal ideal-braid branch is better defined.

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
