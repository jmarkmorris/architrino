# Octahedral Fold-Aware Dynamics Handoff

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md). The predecessor proves that the reduced fold-aware period mean has a simple zero at

$$
v_0\approx3.021564740248
$$

and identifies the projective zero ray

$$
s=v_0h,
\qquad
h>0.
$$

This packet decides what that zero can certify dynamically. The answer is narrow but important: it closes a period-mean condition, but it does not close fixed-speed pointwise tangential dynamics. It is therefore a bounded-speed primitive handoff, not a retained fixed-speed branch.

## Fixed-Speed Tangential Test

For a retained fixed-speed trace branch, the arclength dynamics row requires pointwise tangential closure:

$$
\boxed{
T_i(\theta)\cdot F_i^{\mathrm{fold}}(\theta)=0
\qquad
\text{for every receiver }i\text{ and phase }\theta.
}
$$

The period-mean row is weaker:

$$
\boxed{
\int_0^H T_i(u)\cdot F_i^{\mathrm{fold}}(u)\,du=0.
}
$$

The sign-certified zero bracket proves the second equation on the symmetric reduced period row. It does not by itself prove the first equation.

## Pointwise Witness

Choose the representative point on the projective ray with

$$
h=1,
\qquad
s=v_0.
$$

At receiver $1+$ and phase

$$
\theta=\frac{\pi}{4},
$$

the fold-aware all-root row contains nine active roots:

$$
3\ \text{antipodal-partner roots},
\qquad
6\ \text{cross-binary roots}.
$$

The minimum sampled Jacobian magnitude at this witness is

$$
|J|_{\min}\approx0.504374623800,
$$

so the witness is root-regular. The tangential force split is

$$
T_{1+}\cdot F_{\mathrm{partner}}^{\mathrm{fold}}
\approx
6.84\times10^{-14},
$$

while

$$
T_{1+}\cdot F_{\mathrm{cross}}^{\mathrm{fold}}
\approx
-0.168424847206.
$$

Thus

$$
\boxed{
T_{1+}\cdot F_{\mathrm{tot}}^{\mathrm{fold}}(\pi/4)
\approx
-0.168424847206
\ne0.
}
$$

This single regular all-root witness rejects the fixed-speed pointwise tangential row for the trace-period zero:

$$
\boxed{
\texttt{fixed-speed-pointwise-tangent-closure-rejected}.
}
$$

The cross-binary contribution cancels in the full-period coarea integral, not pointwise in the ordinary phase coordinate.

## Bounded-Speed Handoff

The bounded-speed successor row replaces pointwise fixed-speed tangential closure with the speed ODE

$$
\boxed{
\nu_i\nu_i'
=
\Gamma_B^\nu\,
T_i\cdot F_i^{\mathrm{fold}}.
}
$$

A periodic primitive requires zero mean:

$$
\int_0^H T_i\cdot F_i^{\mathrm{fold}}\,du=0.
$$

The sign-certified zero provides exactly that necessary mean condition. The pointwise witness shows why it is not enough for fixed-speed retention: the speed factor must absorb the nonzero cross-binary tangential work. The correct successor status is therefore

$$
\boxed{
\texttt{fixed-speed-pointwise-tangent-obstructed-bounded-speed-primitive-handoff}.
}
$$

This is not a retained bounded-speed branch. Cross-binary folds are projection singularities in the ordinary $\theta$ chart, so a live speed primitive must be constructed on a coarea or branch-chart convention that includes all roots and keeps the same ledger for roots, Jacobians, force weights, normal reconstruction, action, Noether rows, and event rows.

The direct successor [octahedral-fold-aware-speed-primitive-existence](octahedral-fold-aware-speed-primitive-existence.md) closes the scalar implication at the correct claim level: on a fold-aware branch chart with integrable forcing and bounded center-time speed excursion, the zero period mean is sufficient for a positive periodic speed primitive after an initial-speed offset is chosen. That successor still leaves clock/length return and live-ledger retention open.

## Claim Boundary

This packet proves:

$$
\texttt{certifies\_fold\_aware\_period\_mean\_zero=true},
\qquad
\texttt{rejects\_fixed\_speed\_pointwise\_tangent\_closure=true}.
$$

It also identifies the bounded-speed successor route:

$$
\texttt{identifies\_bounded\_speed\_successor=true}.
$$

It does not certify:

$$
\texttt{certifies\_bounded\_speed\_primitive=false},
\qquad
\texttt{retained\_branch=false}.
$$

The remaining live-ledger rows are:

- coarea or branch-chart speed primitive;
- clock/length return;
- normal reconstruction;
- action/Noether rows;
- event stability;
- observer export.

No fixed speed window is imposed in this packet. The representative $h=1$ row is only one point on the projective zero ray $s=v_0h$.

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-dynamics-handoff.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-dynamics-handoff.mjs) emits:

- the source zero-bracket certificate validation status;
- the representative $h=1$, $s=v_0$ zero-ray point;
- the all-root pointwise tangential witness at receiver $1+$ and $\theta=\pi/4$;
- the fixed-speed pointwise tangential rejection;
- the bounded-speed primitive handoff status;
- the non-retention verdict.

The companion test [neutral-swarm-octahedral-fold-aware-dynamics-handoff.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-dynamics-handoff.test.js) verifies the source certificate, pointwise witness, fixed-speed rejection, bounded-speed handoff boundary, CLI validation, and non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it prevents the sign-certified period zero from being overclaimed as a retained fixed-speed branch and identifies the only viable next dynamics route. It should not be promoted into reader-facing AAA prose until the bounded-speed primitive and downstream live-ledger rows are constructed or a separate corpus theorem-target edit is explicitly scoped.
