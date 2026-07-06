# Angular-Momentum Held-Release Sweep Spec

Status: priority-only implementation and proofing spec, 2026-07-06.
Source: operator-supplied response, corrected by operator terminology review.
Claim level: diagnostic simulation target and derivation-closure target only. This packet does not claim a retained branch, accepted evidence, score movement, or corpus promotion.
Corpus disposition: defer with blocker. Promote only after an accepted retained-history row, receiver-normal branch-strength evidence, action/wake/event/support rows, and stability evidence exist.

## Core Principle

Do not add angular momentum as a new force-law term. For the held-release toy, angular momentum enters through the source path histories:

1. the release velocities at $t=0$;
2. the prehistory over the hold window that emitted the causal wakes now reaching the receivers.

Because force rows are evaluated at causal roots on delayed source histories, a velocity-only release kick is not equivalent to a rotating prehistory. Both modes are useful, but they answer different questions.

Terminology correction: this is not a light-delay construction. The primitive propagation speed in this layer is the field speed $c_f$. A receiver force row is assembled from causal roots on source path histories where wakes expanding at $c_f$ intersect the receiver at the current instant. Photon propagation and observer-level $c_0$ are downstream recovery targets, not primitive inputs here.

Proofing correction: [Six-Point Equivariant Reduction Proof Audit](six-point-equivariant-reduction-proof-audit-2026-07-06.md) makes this sweep the executable witness for `six_point_symmetry_invariant_lemma`, not a stand-alone proof-moving object. Keep the sweep capped at the declared run-matrix rows and report fixed-point-drift residuals so violations of the equivariant channel are visible.

## Axis-Neutral Rigid Rotation

Use the `SH-0` face-opposite six-point fixture:

$$
\epsilon_{+,x}=(R,0,0),
\qquad
\epsilon_{+,y}=(0,R,0),
\qquad
\epsilon_{+,z}=(0,0,R),
$$

with the opposite-polarity partners at $\epsilon_{-,x}=-\epsilon_{+,x}$, $\epsilon_{-,y}=-\epsilon_{+,y}$, and $\epsilon_{-,z}=-\epsilon_{+,z}$.

The axis-neutral spin axis is the body diagonal

$$
\hat{\mathbf n}=\frac{(1,1,1)}{\sqrt{3}}.
$$

The preferred first release velocity is rigid rotation about that axis:

$$
\mathbf v_i(0)=\omega\,\hat{\mathbf n}\times\mathbf x_i(0).
$$

Every site has the same perpendicular distance from the axis,

$$
\left|\hat{\mathbf n}\times\mathbf x_i(0)\right|=R\sqrt{\frac{2}{3}},
$$

so every site receives the same tangential speed. If the run-matrix surface-speed fraction is $f_v$, the actual tangential speed is

$$
v_t=f_v c_f,
$$

and the angular rate is

$$
\omega=\frac{f_v c_f}{R\sqrt{2/3}}.
$$

This construction preserves the fixture's useful symmetry. Antipodal partners get antipodal velocities, the dynamic center stays at zero, total linear momentum stays zero, and the common-sphere, common-speed, antipodal-pair invariant manifold remains available as a reduced diagnostic surface. The reduced state gains a common rotation phase $\theta(t)$ in addition to the radial or shape variables already used in the held-release analysis.

A coordinate-axis rotation, such as rotation about $\hat z$, breaks the axis-neutral symmetry and belongs to a later axis-comparison family rather than the first sweep.

## Prehistory Modes

### `kick-at-release`

The hold window stays static. At release, the runner applies

$$
\mathbf v_i(0)=\omega\,\hat{\mathbf n}\times\mathbf x_i(0).
$$

The incoming causal wakes at release were emitted by stationary source histories. This mode deliberately tests the mismatch between a stationary wake field and a suddenly rotating seed. It is a useful diagnostic for velocity-factor sensitivity, but it is not the history-consistent rotating branch candidate.

### `moving-prehistory`

The hold-window path history rotates with the same angular rate used at release:

$$
\mathbf x_i(t)=\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf x_i(0),
\qquad
t\in[-\text{holdTime},0].
$$

The release velocity at $t=0$ is the derivative of that rotating path,

$$
\mathbf v_i(0)=\omega\,\hat{\mathbf n}\times\mathbf x_i(0).
$$

This is the history-consistent construction. It tests whether a rotating shell-braid seed, rather than a stationary seed with a release kick, changes the post-first-turn return response.

Implementation target: the toy's hold-path history writer should emit rotating source history for this mode; the causal-root search, branch weighting, wiggle-window diagnostic, and reduced-radius diagnostic should consume the history through the existing downstream paths.

## Comparison Rows

These rows are useful after the axis-neutral sweep exists:

| Row family | Purpose | Status |
| --- | --- | --- |
| Axis-neutral rigid rotation | First preferred construction; preserves the fixture symmetry and supplies the cleanest return-response diagnostic. | Required first. |
| Per-pair orbital planes | Gives each antipodal pair its own local circular-orbit velocity while testing whether a different microstate with the same broad net-spin direction changes the response. | One-row comparison after required first sweep. |
| Zero-net-spin control | Flips pair senses so the kinematic total can cancel, separating global branch angular momentum from local per-strand circulation. | One-row control after required first sweep. |
| Coordinate-axis rotation | Breaks the axis-neutral symmetry and tests axis-comparison sensitivity. | Later comparison family, not first sweep. |

## Bookkeeping Boundary

Architrinos do not have physical mass. Any angular-momentum value in this toy is a kinematic diagnostic row with unit integration weights:

$$
\mathbf J_{\mathrm{kin}}=\sum_i\mathbf x_i\times\mathbf v_i.
$$

This is branch-ledger bookkeeping, not an ontology claim and not evidence for particle mass. The runner should name it as a diagnostic quantity and keep mass-like language out of the proof status.

Keep $f_v<1$ for the main sweep so the tangential surface speed remains below $c_f$ and causal-root coverage can be interpreted cleanly. The `vt100` row remains an edge diagnostic, not the first retained-branch candidate.

Every output remains fail-closed:

- `retainedBranchClaim=false`;
- `scoreMovement=no_score_increase`;
- no accepted seed-path certificate;
- no central-solver retained-history acceptance;
- no corpus promotion.

## Implementation Checklist

1. Add `--surface-speed-fraction <number>` to [held-release-causal-wake-toy.mjs](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs), using $f_v$ with actual speed $v_t=f_v c_f$.
2. Add `--spin-axis <x,y,z>` with default `1,1,1`; normalize internally to $\hat{\mathbf n}$.
3. Add `--prehistory-mode=stationary-held-release|kick-at-release|moving-prehistory`.
4. Preserve the current default run exactly as `stationary-held-release` with $f_v=0$.
5. For `kick-at-release`, keep the existing static hold path and add the rigid-rotation velocity at release.
6. For `moving-prehistory`, write the hold-window source path as $\operatorname{Rot}(\hat{\mathbf n},\omega t)\mathbf x_i(0)$ and release with the matching derivative.
7. Emit metadata for surface-speed fraction, actual tangential speed, angular rate, normalized spin axis, prehistory mode, and kinematic $\mathbf J_{\mathrm{kin}}$.
8. Run `sh0-g0-vt025`, `sh0-g0-vt050`, `sh0-g0-vt080`, `sh0-g0-vt095`, and `sh0-g0-vt099` in both `kick-at-release` and `moving-prehistory`.
9. Report fixed-point-drift residuals, post-first-turn reduced-radius acceleration sign, second-turn detection, bounded-window status, root coverage, field-speed status, and fail-closed proof status.
10. Add tests that the option metadata round-trips, the default output remains unchanged, and all new rows remain diagnostic/candidate only.

## Proofing Questions

1. Does axis-neutral rigid rotation preserve the exact finite symmetry needed by `six_point_symmetry_invariant_lemma`, or does the rotation phase require a separate rotating-frame lemma?
2. Does `moving-prehistory` introduce any discontinuity at release, or is the history and release derivative exactly matched?
3. Does any nonzero $f_v$ row produce post-first-turn inward reduced-radius acceleration, a second turn, or a bounded window?
4. If all rows remain outward after the first turn, can the no-return theorem be strengthened from zero-angular-momentum release to axis-neutral rotating release under partner-wake-only assumptions?
5. If a row returns, which same-record native central-solver retained-history row should consume it first?
