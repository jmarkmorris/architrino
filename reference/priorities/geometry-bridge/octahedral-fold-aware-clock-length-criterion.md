# Octahedral Fold-Aware Clock/Length Criterion

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-speed-primitive-existence](octahedral-fold-aware-speed-primitive-existence.md). The predecessor proves that the fold-aware period mean gives a positive periodic center-time speed primitive after an initial-speed offset is chosen:

$$
\nu_i(u)=\nu_{i,0}+A_i(u),
\qquad
A_i(H)=A_i(0)=0.
$$

This packet closes the next scalar row at the exact algebraic level. The clock/length condition does not introduce a new branch gate by itself; it selects the unique offset and gives the precise admissibility inequalities that a live fold-aware branch chart must satisfy.

## Unique Clock Offset

Define

$$
A_{\min}=\min_{u\in[0,H]}A_i(u),
\qquad
A_{\max}=\max_{u\in[0,H]}A_i(u),
$$

and

$$
\overline A
=
\frac{1}{H}
\int_0^H A_i(u)\,du,
\qquad
\ell_i=\frac{L_i}{H}.
$$

The clock/length row is

$$
\boxed{
\int_0^H \nu_i(u)\,du=L_i.
}
$$

Substituting $\nu_i(u)=\nu_{i,0}+A_i(u)$ gives

$$
H\nu_{i,0}
+
\int_0^H A_i(u)\,du
=
L_i.
$$

Therefore the clock offset is unique:

$$
\boxed{
\nu_{i,0}^{\mathrm{clk}}
=
\ell_i-\overline A.
}
$$

The corresponding clock/length speed profile is

$$
\boxed{
\nu_i^{\mathrm{clk}}(u)
=
\ell_i+A_i(u)-\overline A.
}
$$

Its exact interval is

$$
\boxed{
\nu_{\min}^{\mathrm{clk}}
=
\ell_i+A_{\min}-\overline A,
\qquad
\nu_{\max}^{\mathrm{clk}}
=
\ell_i+A_{\max}-\overline A.
}
$$

## Positivity Criterion

A retained bounded-speed branch requires positive speed, not merely a periodic primitive. The strict positivity condition is exactly

$$
\boxed{
\ell_i>\overline A-A_{\min}.
}
$$

Equivalently,

$$
\boxed{
\frac{L_i}{H}>\overline A-A_{\min}.
}
$$

The non-strict inequality would allow stall points where $\nu_i=0$, so it is not the retained bounded-speed condition.

## Declared Speed-Window Criterion

No speed window is imposed here. If a future branch declares a finite speed window

$$
\nu_-\le\nu_i(u)\le\nu_+,
$$

then the clock/length profile satisfies that declared window if and only if

$$
\boxed{
\nu_-+\overline A-A_{\min}
\le
\frac{L_i}{H}
\le
\nu_++\overline A-A_{\max}.
}
$$

For an open declared window, replace the corresponding endpoint inequality by a strict one. Strict positivity is the special lower-window case $\nu_-=0$ with a strict lower inequality.

## Coupling-Scale Form

If the primitive is written as

$$
A_i(u)=\Gamma_B^\nu I_i(u),
$$

with $\Gamma_B^\nu\ge0$, then

$$
\overline A-A_{\min}
=
\Gamma_B^\nu(\overline I-I_{\min}).
$$

Thus positivity is equivalent to

$$
\boxed{
\frac{L_i}{H}
>
\Gamma_B^\nu(\overline I-I_{\min}).
}
$$

The action scale and primitive shape therefore jointly determine clock/length admissibility. The period mean alone does not.

If a speed window is declared, the corresponding closed-window criterion is

$$
\boxed{
\nu_-+\Gamma_B^\nu(\overline I-I_{\min})
\le
\frac{L_i}{H}
\le
\nu_++\Gamma_B^\nu(\overline I-I_{\max}).
}
$$

This row is useful because it converts the next live computation into a bounded-excursion problem: compute $I_{\min}$, $I_{\max}$, and $\overline I$ on the same fold-aware coarea or branch chart.

The direct successor [octahedral-fold-aware-clock-length-profile-scan](octahedral-fold-aware-clock-length-profile-scan.md) applies this criterion to a sampled fold-aware profile at the representative zero-ray point. It finds a positive sampled clock/length profile, but still stops short of an interval certificate or retained branch.

## Claim Boundary

This packet proves:

$$
\boxed{
\texttt{symbolic-clock-length-offset-criterion-certified}.
}
$$

It also records the convention bridge explicitly:

$$
\nu_i\nu_i'=\Gamma_B^\nu f_i(u),
\qquad
\nu_i'=\frac{d\nu_i}{d\lambda_i},
\qquad
\frac{d\nu_i}{du}=\Gamma_B^\nu f_i(u).
$$

It does not certify:

$$
\texttt{certifies\_clock\_length\_return=false},
\qquad
\texttt{certifies\_speed\_clock\_length=false},
\qquad
\texttt{certifies\_clock\_length\_return\_for\_live\_branch=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The status is

$$
\boxed{
\texttt{fold-aware-clock-length-criterion-derived-clock-return-open}.
}
$$

The remaining live rows are:

- fold-aware excursion bounds $A_{\min}$, $A_{\max}$, and $\overline A$ on a coarea or branch chart;
- positivity and any branch-declared speed-window margins on the same chart;
- normal reconstruction;
- action/Noether rows;
- event stability;
- observer export.

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-clock-length-criterion.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-clock-length-criterion.mjs) emits:

- the source speed-primitive validation status;
- the symbolic clock/length offset criterion;
- the coupling-scale form;
- optional evaluation for a supplied summary $(H,L,A_{\min},\overline A,A_{\max})$;
- optional declared-window evaluation when a branch supplies a window;
- the sampled profile-scan successor packet;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-fold-aware-clock-length-criterion.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-clock-length-criterion.test.js) verifies the symbolic criterion, supplied-profile evaluation, optional declared-window handling, CLI validation, and non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it converts the open clock/length row into an exact scalar solvability criterion. It should not be promoted into reader-facing AAA prose until a fold-aware branch chart supplies the excursion summary or until a separate bounded-speed theorem-target edit is scoped for the general speed-row theorem.
