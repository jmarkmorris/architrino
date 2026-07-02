# Braid Ideal Brainstorming

Status. Priority-only brainstorming packet under [braid-ideal](braid-ideal.md). This is not a theorem row, not a retained branch certificate, and not reader-facing canon.

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

## Octahedral Decoration Classes

The six axial sites

$$
\{+x,-x,+y,-y,+z,-z\}
$$

are the six vertices of a regular octahedron. A balanced decoration with three Positrinos and three Electrinos has $20$ raw assignments, but only two classes under proper 3D rotations of the octahedron.

The distinguishing invariant is the number of same-polarity opposite axial pairs:

| Class | Representative | Opposite-pair pattern | Notes |
| --- | --- | --- | --- |
| `face-opposite` | $P:\{+x,+y,+z\}$, $E:\{-x,-y,-z\}$ | Every axis is split $P/E$ | Positrinos occupy one triangular face; Electrinos occupy the opposite face. This is the original held-release seed. |
| `axial-paired` | $P:\{+x,-x,+y\}$, $E:\{-y,+z,-z\}$ | One $P/P$ axis, one $E/E$ axis, one split $P/E$ axis | This is the only other balanced class up to rotation. |

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
P:\{+x,-x,+y\},
\qquad
E:\{-y,+z,-z\}.
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

### Matter/Antimatter Chirality Bridge - 2026-07-01

Claim level. Priority-only lemma target. This is not a matter/antimatter discovery claim, not a particle-sector promotion, and not a retained branch certificate. It records a possible bridge between the `face-opposite` invariant channel and the existing matter/antimatter braid-chirality rule in [Color Charge SU(3)](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md#braid-orientation-matter-vs-antimatter), [Quantum Number Mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md#the-assembly-architecture), and the anti-braid mirror bookkeeping in [Quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md#anti-braid-mirror-bookkeeping-conjectural-reverse-engineered-candidate).

Candidate support statement. The group-zero diagnostics suggest that the `face-opposite` six-site support is the only balanced octahedral decoration class currently seen to preserve the center-zero, common-sphere, common-speed, antipodal-pair channel:

$$
\mathcal S_{\mathrm{fo}}
=
\left\{
P:\{+x,+y,+z\},
\quad
E:\{-x,-y,-z\}
\right\}.
$$

The charge-conjugate mirror of this support swaps all polarities while preserving the same opposite-face geometry:

$$
\overline{\mathcal S}_{\mathrm{fo}}
=
\left\{
E:\{+x,+y,+z\},
\quad
P:\{-x,-y,-z\}
\right\}.
$$

Because both rows retain one Positrino and one Electrino on every axis, the mirror keeps the same opposite-pair pattern and should inherit the same common-sphere residual tests under any force law that is equivariant under coordinate permutations and complete charge conjugation. This is the local support-level reason that a matter branch and its antimatter branch should be mirror candidates, not different octahedral decoration classes.

Candidate chirality statement. The existing fermion mapping does not identify matter/antimatter with the raw choice of which face carries Positrinos. It identifies matter/antimatter with pro/anti braid orientation, recorded as ordered braid chirality. Therefore the disciplined target is a chiral lift of the same support class:

$$
\mathcal B_{\mathrm{matter}}
\sim
\left(\mathcal S_{\mathrm{fo}},\chi_c=+1\right),
\qquad
\mathcal B_{\mathrm{antimatter}}
\sim
\left(\overline{\mathcal S}_{\mathrm{fo}},\chi_c=-1\right),
$$

where $\chi_c$ abbreviates the pro/anti ordered-braid chirality record only after a retained branch supplies the required phase, winding, causal-root, wake, action, and stability rows. The sign convention is schematic; the proof burden is to recover the HML/HLM orientation distinction from the same retained branch record that carries the six-site support.

Explicit exclusion. The `axial-paired` control is not the antimatter identification for the `face-opposite` seed:

$$
\mathcal S_{\mathrm{ap}}
=
\left\{
P:\{+x,-x,+y\},
\quad
E:\{-y,+z,-z\}
\right\}.
$$

It changes the opposite-pair pattern by introducing one $P/P$ axis and one $E/E$ axis. That is a partial redistribution of the balanced inventory, not complete charge conjugation of the `face-opposite` branch. The current toy evidence also shows `same_level_support_lost_in_toy_control` for this class. Until a central-solver retained-history row proves otherwise, `axial-paired` should remain a negative control for support loss, not an antimatter branch.

First proof route. Prove the `face-opposite` invariant-manifold lemma first. Then add the ordered chirality variable $\chi_c$ only after the retained branch supplies phase order, winding counts, causal-root ledgers, wake rows, action rows, and stability rows. The proof must show that complete charge conjugation plus pro/anti orientation reversal preserves the mass-facing and support-facing ledgers while reversing the exposed charge-like projection, consistent with the charge-conjugate mass-equality constraint in [Particle Masses](../../../content/markdown/aaa/assemblies/particle-masses.md#charge-conjugate-mass-equality).

Failure modes. This bridge fails if the retained solver shows that the `face-opposite` support does not survive with the required root and action ledgers, if the chirality record cannot be tied to the same branch identity as the support geometry, or if an accepted `axial-paired` retained branch later appears with a complete pro/anti mirror ledger and equal support quality. Until then, the safe claim is only that `face-opposite` is the first admissible support candidate for the matter/antimatter chirality rule, while `axial-paired` is an excluded antimatter interpretation in the present evidence record.

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
\mathbf x_{P,k}(t)=C(t)+Q(t)\mathbf s_k(t),
\qquad
\mathbf x_{E,k}(t)=C(t)-Q(t)\mathbf s_k(t).
$$

This automatically preserves a center-zero internal configuration and antipodal pairs in the center frame. It also places all six architrinos on the same instantaneous oblate spheroid. The original face-opposite spherical seed is the special case $R_\perp=R_\parallel$, $\zeta=1/\sqrt3$, and a body-frame rotation that maps the three phase offsets to the coordinate-axis face.

This ansatz is deliberately not restricted to circular orbits. Non-circular motion enters through $\zeta(t)$, $R_\perp(t)$, $R_\parallel(t)$, and $Q(t)$. A more general closed curve on the spheroid can replace the latitude-ring ansatz by allowing $\zeta=\zeta(\psi)$ and a nonuniform phase speed $\dot\psi(t)$.

### Velocity And Frequency Rows

The receiver velocity is

$$
\dot{\mathbf x}_{P,k}
=
\mathbf V_g
+
\Omega\times Q\mathbf s_k
+
Q\dot{\mathbf s}_k,
$$

and

$$
\dot{\mathbf x}_{E,k}
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

For any receiver $a\in\{P,k\}$ or $\{E,k\}$ and source $b\in\{P,\ell\}$ or $\{E,\ell\}$, the causal emission times $t_0=t-\tau$ are selected by

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

where $\mathbf y_{P,k}=\mathbf s_k$ and $\mathbf y_{E,k}=-\mathbf s_k$. For constant group velocity this becomes

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
\mathbf E_{P,k}\cdot Q\partial_\psi\mathbf s_k
=0,
$$

$$
\mathcal R_{\zeta,k}
=
\mathbf E_{P,k}\cdot Q\partial_\zeta\mathbf s_k
=0,
$$

$$
\mathcal R_{\perp,k}
=
\mathbf E_{P,k}\cdot Q\partial_{R_\perp}\mathbf s_k
=0,
\qquad
\mathcal R_{\parallel,k}
=
\mathbf E_{P,k}\cdot Q\partial_{R_\parallel}\mathbf s_k
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
(u,R_\perp,\chi,\zeta_0,\omega,\Omega,K_{\mathrm{sea}})
$$

and a period $T$ satisfying the declared closure convention. Then evaluate:

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
5. the return status: whether the spheroid state closes, precesses by an allowed integer, or escapes.

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
