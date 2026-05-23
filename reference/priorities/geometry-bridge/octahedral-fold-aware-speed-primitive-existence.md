# Octahedral Fold-Aware Speed-Primitive Existence

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-dynamics-handoff](octahedral-fold-aware-dynamics-handoff.md). The predecessor proves two facts about the fold-aware trace-period zero:

$$
\texttt{certifies\_fold\_aware\_period\_mean\_zero=true},
$$

and

$$
\texttt{rejects\_fixed\_speed\_pointwise\_tangent\_closure=true}.
$$

This packet closes the scalar bounded-speed implication that was still implicit. The fold-aware zero is not enough for fixed-speed retention, but on a regular fold-aware branch chart it is enough to build a periodic positive center-time speed primitive after choosing an initial-speed offset. This is a theorem about the scalar speed row only; it is not a retained branch.

## Center-Time Primitive

The canonical bounded-speed tangent equation is

$$
\boxed{
\nu_i\nu_i'
=
\Gamma_B^\nu f_i(u),
\qquad
f_i(u)=T_i(u)\cdot F_i^{\mathrm{fold}}(u).
}
$$

Here the prime is the arclength derivative $d/d\lambda_i$. In the center-time chart,

$$
\frac{d\lambda_i}{du}=\nu_i,
$$

so the same equation pulls back to

$$
\boxed{
\frac{d\nu_i}{du}
=
\Gamma_B^\nu f_i(u).
}
$$

Define the center-time speed excursion

$$
\boxed{
A_i(u)
=
\Gamma_B^\nu
\int_0^u f_i(q)\,dq.
}
$$

The fold-aware zero certificate supplies the closed-period compatibility condition

$$
\boxed{
\int_0^H f_i(u)\,du=0.
}
$$

Therefore

$$
\boxed{
A_i(H)=A_i(0)=0.
}
$$

If $f_i$ is integrable on the selected coarea or branch-chart convention and $A_i$ is bounded below, then every offset

$$
\boxed{
\nu_{i,0}>-\min_{u\in[0,H]}A_i(u)
}
$$

defines a positive periodic speed factor

$$
\boxed{
\nu_i(u)
=
\nu_{i,0}+A_i(u).
}
$$

This proves the conditional scalar lemma:

$$
\boxed{
\text{zero period mean}
\quad\Longrightarrow\quad
\text{periodic positive center-time speed primitive}
}
$$

on any fold-aware branch chart where the all-root forcing is integrable and the speed excursion is bounded. The earlier fixed-speed pointwise obstruction is preserved; the nonzero pointwise tangential force is exactly what the bounded-speed primitive absorbs.

## Clock/Length Offset Row

The initial-speed offset is not arbitrary once a clock/length row is declared. For a target arclength return $L_i$, the offset must solve

$$
\boxed{
\mathcal L_i(\nu_{i,0})
=
\int_0^H
\left(\nu_{i,0}+A_i(u)\right)\,du
=
L_i.
}
$$

Equivalently,

$$
\boxed{
\nu_{i,0}^{\mathrm{clk}}
=
\frac{L_i-\int_0^H A_i(u)\,du}{H}.
}
$$

Thus the clock/length offset is unique once the branch declares $L_i$ and $H$. It still must pass positivity and any branch-declared speed band. The direct successor [octahedral-fold-aware-clock-length-criterion](octahedral-fold-aware-clock-length-criterion.md) closes this algebraic row by deriving the exact positivity criterion

$$
\frac{L_i}{H}>\overline A-A_{\min}
$$

and the optional declared-window criterion. The fold-aware period-mean zero alone does not supply the required excursion bounds.

## Claim Boundary

This packet proves:

$$
\boxed{
\texttt{conditional-center-time-speed-primitive-existence-lemma}.
}
$$

It does not certify:

$$
\texttt{certifies\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The fold-aware pointwise witness from the predecessor remains active:

$$
T_{1+}\cdot F_{\mathrm{tot}}^{\mathrm{fold}}(\pi/4)
\approx
-0.168424847206.
$$

Therefore the status is

$$
\boxed{
\texttt{conditional-center-time-speed-primitive-existence-clock-length-open}.
}
$$

The remaining live-ledger rows are:

- coarea or branch-chart integrability and bounded-excursion certificate for $f_i$;
- clock/length return;
- normal reconstruction;
- action/Noether rows;
- event stability;
- observer export.

No fixed speed window is imposed. Any future finite speed window must be declared by a retained branch chart and checked there; it is not inherited from the earlier diagnostic row.

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-speed-primitive-existence.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-speed-primitive-existence.mjs) emits:

- the source dynamics-handoff validation status;
- the center-time speed primitive lemma;
- the clock/length offset row;
- the clock/length criterion successor packet;
- the preserved fixed-speed pointwise obstruction;
- the non-retention verdict.

The companion test [neutral-swarm-octahedral-fold-aware-speed-primitive-existence.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-speed-primitive-existence.test.js) verifies the source handoff, the canonical center-time speed equation, the absence of a fixed speed window, the open clock/length row, CLI validation, and non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it upgrades the fold-aware zero from a necessary period-mean condition to a conditional scalar speed-primitive existence theorem. It should not be promoted into reader-facing AAA prose until a coarea or branch-chart integrability certificate and clock/length return row are constructed, or until a separate theorem-target edit is scoped for the bounded-speed speed-row theorem.
