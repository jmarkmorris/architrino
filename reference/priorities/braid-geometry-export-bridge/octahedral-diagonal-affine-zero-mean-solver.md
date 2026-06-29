# Octahedral Diagonal Affine Zero-Mean Solver

Promotion status: `priority-only`.

This packet consumes [octahedral-affine-force-mean-derivative](octahedral-affine-force-mean-derivative.md) and corrects the trace-route interpretation in [octahedral-trace-affine-zero-mean-obstruction](octahedral-trace-affine-zero-mean-obstruction.md). It tests the finite positive diagonal affine family

$$
A=\operatorname{diag}(s_1,s_2,s_3),
\qquad
s_i>0,
$$

with the deformed rigid carrier

$$
Y_{a,\sigma}^{s}(\theta)
=
\sigma A p_a(\theta),
\qquad
T_{a,\sigma}^{s}(\theta)
=
\sigma A p_a'(\theta).
$$

The main result is a claim-level correction. At $37$ phase samples and $240$ root subdivisions, the solver finds a near-fold cancellation point in the uniform trace subfamily:

$$
\boxed{
s_1=s_2=s_3
\approx
1.694464950788.
}
$$

At that coarse diagnostic resolution, the six receiver period-integral force means are all zero to sampled tolerance:

$$
\boxed{
M_i(s)\approx-3.48\times10^{-10}
\qquad
(i=1,\ldots,6).
}
$$

That row is not resolution stable. Re-evaluating the same scale without re-solving gives

$$
\|M(s_*)\|_{\infty}
\approx
0.851344912333
\quad
(73\ \text{phase samples},\ 480\ \text{root subdivisions}),
$$

and

$$
\|M(s_*)\|_{\infty}
\approx
1.040328440834
\quad
(149\ \text{phase samples},\ 960\ \text{root subdivisions}).
$$

Thus the safe theorem-level reading is not "finite trace zero closed." It is:

$$
\boxed{
\texttt{sampled-diagonal-affine-zero-mean-candidate-resolution-unstable}.
}
$$

This remains a real correction to the previous trace interpretation. The antipodal partner subrow remains positive, and finite trace scaling can make the moving cross-binary root rows cancel it on a coarse sampled ledger. The cancellation sits near low-$|J|$ rows, so it cannot be promoted as a retained scalar speed-ODE branch without a resolution-stable or interval-certified zero.

## Diagonal Root-Ledger Row

For receiver $i=(a,\sigma)$ and source $j=(b,\tau)$, the active causal roots are solved from

$$
\boxed{
g_{ij}(\theta,y;s)
=
\left\|
A\left(
\sigma p_a(\theta)-\tau p_b(\theta-y)
\right)
\right\|
-y
=0.
}
$$

The root search interval is support-complete for the diagonal ellipsoid:

$$
0<y\le2\max(s_1,s_2,s_3)+\epsilon_{\mathrm{dom}}.
$$

For each accepted scale row, every ordered pair and phase node must have exactly one active root. With

$$
\widehat R_{ij}^{s}
=
\frac{
A\left(
\sigma p_a(\theta)-\tau p_b(\theta-y_{ij})
\right)
}
{y_{ij}},
$$

the sampled Jacobian row is

$$
J_{ij}^{s}
=
1-T_{j}^{s}(\theta-y_{ij})\cdot\widehat R_{ij}^{s}.
$$

The diagnostic force contribution is

$$
F_{ij}^{s}
=
\frac{q_iq_jW_{ij}^{\mathrm{rec},s}}{y_{ij}^2}
\widehat R_{ij}^{s},
$$

and the three independent paired rows are

$$
\boxed{
M_a(s)
=
\int_0^{2\pi}
T_{a,+}^{s}(\theta)\cdot
\sum_{j\ne(a,+)}F_{(a,+)j}^{s}(\theta)
\,d\theta,
\qquad
a=1,2,3.
}
$$

The global antipodal involution preserves each root equation, $J$, and tangential forcing. Therefore

$$
\boxed{
M_{a,+}(s_1,s_2,s_3)
=
M_{a,-}(s_1,s_2,s_3).
}
$$

The six-row zero-mean problem reduces to

$$
\boxed{
R_{\mathrm{diag}}(s)
=
\begin{pmatrix}
M_1(s)\\
M_2(s)\\
M_3(s)
\end{pmatrix}
=0.
}
$$

## Sampled Candidate

The executable solver uses log-scale variables

$$
u_a=\log s_a
$$

so positivity is automatic. It performs a deterministic diagonal-scale grid search and a damped Newton solve on the three paired rows. At $37$ phase samples and $240$ root subdivisions, the sampled candidate is

$$
s_*
=
(1.694464950788,\,
1.694464950788,\,
1.694464950788).
$$

The six receiver rows are

$$
M(s_*)
\approx
(-3.48,-3.48,-3.48,-3.48,-3.48,-3.48)\times10^{-10},
$$

with

$$
\|M(s_*)\|_{\infty}
\approx
3.48\times10^{-10},
\qquad
\|M(s_*)\|_2
\approx
8.53\times10^{-10}.
$$

The sampled root ledger at the candidate has no root failures and the bounds

$$
y_{\min}\approx0.848366519008,
\qquad
y_{\max}\approx3.002103862167,
$$

$$
|J|_{\min}\approx0.028443650837,
\qquad
|J|_{\max}\approx2.621689995510.
$$

Thus the coarse sampled row is

$$
\boxed{
\texttt{sampled-diagonal-affine-zero-mean-candidate-found}.
}
$$

The candidate kind is

$$
\boxed{
\texttt{uniform-trace-subfamily}.
}
$$

## Resolution-Stability Row

The same $s_*$ row fails a fixed-candidate resolution check. The reruns keep the same scale and only refine phase and root sampling:

| Phase samples | Root subdivisions | $\|M(s_*)\|_\infty$ | Primitive return max | Root failures | Status |
| --- | ---: | ---: | ---: | ---: | --- |
| $73$ | $480$ | $0.851344912333$ | $0.502426982593$ | $0$ | `resolution-zero-mean-or-primitive-return-failed` |
| $149$ | $960$ | $1.040328440834$ | $0.613956895568$ | $0$ | `resolution-zero-mean-or-primitive-return-failed` |

The corrected emitted status is therefore

$$
\boxed{
\texttt{sampled-candidate-resolution-stability-failed}.
}
$$

The useful mathematical information is that the cross-binary trace cancellation is narrow and low-margin. At the coarse candidate,

$$
|J|_{\min}\approx0.028443650837,
\qquad
y_{\max}\approx3.002103862167,
$$

while the trace root domain has upper endpoint

$$
2s_*+\epsilon_{\mathrm{dom}}
\approx
3.388929901576+\epsilon_{\mathrm{dom}}.
$$

The row is still inside the sampled root domain, but it is close enough to low-$|J|$ amplification that ordinary point sampling cannot certify the mean.

## Physical Speed Primitive Row

The speed primitive must use physical unit-tangent forcing, not the unnormalized period-row tangent. For a uniform trace row,

$$
V_i^s(\theta)
=
\partial_\theta Y_i^s(\theta)
=
sT_i(\theta),
\qquad
\widehat T_i^s(\theta)
=
\frac{V_i^s(\theta)}{\|V_i^s(\theta)\|}.
$$

The force-mean row above uses

$$
M_i(s)
=
\int_0^{2\pi}
V_i^s(\theta)\cdot F_i^s(\theta)
\,d\theta,
$$

but the physical speed primitive is

$$
A_i^s(u)
=
\Gamma
\int_0^u
\widehat T_i^s(\phi)\cdot F_i^s(\phi)
\,d\phi.
$$

For uniform trace scaling this gives

$$
A_i^s(2\pi)
=
\frac{\Gamma}{s}M_i(s).
$$

At the coarse $37/240$ candidate with $\Gamma=1$, the physical primitive has

$$
A_{\min}
\approx
-0.933522195356,
\qquad
A_{\max}
\approx
0.108141863302,
$$

so

$$
A_{\max}-A_{\min}
\approx
1.041664058515.
$$

Against the diagnostic speed window $[0.5,1.5]$, the admissible initial-speed interval would be

$$
[
0.5-A_{\min},
1.5-A_{\max}
]
\approx
[
1.433522195356,
1.391858136698
],
$$

whose width is negative:

$$
\boxed{
\Delta\nu_0\approx-0.041664058515.
}
$$

The clock/length row fails more strongly under the direct deformed path length

$$
L_i(s_*)=\int_0^{2\pi}\|V_i^s(\theta)\|\,d\theta=2\pi s_*,
$$

because the implied clock-length initial speed is

$$
\nu_{0,\mathrm{clock}}
\approx
2.175577762206,
$$

which is outside that diagnostic window and outside the empty admissible interval. This is a conditional window diagnostic, not a theory-level speed constraint.

## Corrected Trace Interpretation

[octahedral-trace-affine-zero-mean-obstruction](octahedral-trace-affine-zero-mean-obstruction.md) proves only

$$
m_{\mathrm{partner}}(s)>0
\qquad
(s>0)
$$

for the antipodal partner subrow. It does not prove that the total trace-scaled row is positive. The coarse sampled candidate above shows why: finite trace scaling changes the cross-binary causal-root rows, and those rows can cancel the positive partner row on a sampled ledger before any sampled one-root failure appears.

The earlier first-order trace solve predicted

$$
s_{\mathrm{lin}}\approx4.24679501458,
$$

but the finite near-cancellation appears much earlier:

$$
s_*\approx1.694464950788.
$$

The first-order trace direction was therefore qualitatively useful, but the finite row is controlled by low-margin cross-binary root weights and is not certified by the coarse point sample.

## Executable Diagnostic

The executable diagnostic [octahedral-diagonal-affine-zero-mean-solver.mjs](../../../scripts/neutral-braid/octahedral-diagonal-affine-zero-mean-solver.mjs) emits:

- the unit-scale six-row check;
- the deterministic diagonal-scale grid summary;
- the damped Newton iteration history in log-scale variables;
- the sampled zero-mean candidate;
- fixed-candidate resolution reruns at $73/480$ and $149/960$;
- the physical unit-tangent speed primitive and declared-window clock-length diagnostic row;
- delay and sampled Jacobian bounds;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-diagonal-affine-zero-mean-solver.test.js](../../../tests/neutral-braid-octahedral-diagonal-affine-zero-mean-solver.test.js) verifies unit-scale reproduction, the finite sampled zero-mean candidate, paired receiver equality, the resolution-instability verdict, physical primitive fields, CLI validation, and the claim-level guards.

## Retention Verdict

This is a diagnostic scalar speed-ODE advance, not retained branch status. It upgrades the route from

$$
\texttt{non-trace-live-variable-or-speed-support-correction-required}
$$

to the sharper, negative classification

$$
\boxed{
\texttt{sampled-finite-trace-affine-zero-mean-candidate-resolution-unstable}.
}
$$

The first failure status is

$$
\boxed{
\texttt{sampled-candidate-resolution-stability-failed}.
}
$$

The same coarse candidate also fails the diagnostic $[0.5,1.5]$ speed-window and clock-length row:

$$
\boxed{
\texttt{declared-speed-window-clock-diagnostic-failed}.
}
$$

[octahedral-bounded-speed-successor-closure-row](octahedral-bounded-speed-successor-closure-row.md) now keeps that row conditional. For any declared speed window,

$$
\nu_-
\le
\frac{L_i}{H}
\le
\nu_+
$$

is necessary for a clock/length row, and the coarse trace carrier has $L_i/H=s_*\approx1.694464950788$. That statement does not impose the $[0.5,1.5]$ window as theory.

[octahedral-period-rescaled-trace-scan](octahedral-period-rescaled-trace-scan.md) then removes the fixed speed-window assumption and tests $Y_i(u)=s\,p_i(u/h)$ over positive speed ratios $v=s/h$. Its sampled simple-root rows stay positive through $v=1.7$:

$$
\min_i\mathcal M_i^\nu
\approx
0.789308084676,
$$

and the first sampled one-root ledger failure appears at $v=1.75$. [octahedral-period-rescaled-fold-chart](octahedral-period-rescaled-fold-chart.md) sharpens that boundary into a $\kappa=+1$ cross-binary saddle-node onset at $v_c\approx1.704939069887$. [octahedral-fold-aware-multiroot-period-integral](octahedral-fold-aware-multiroot-period-integral.md) then finds a sampled fold-aware all-root zero bracket at $v_0\approx3.021564740248$, and [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md) certifies a sign-changing bracket $3.02156\le v\le3.02157$. The downstream live branch rows therefore remain open for that fold-aware candidate, not for this coarse finite-trace point:

$$
\texttt{clock-length-return-open},
\quad
\texttt{normal-reconstruction-open},
$$

$$
\texttt{bounded-speed-live-ledger-open},
\quad
\texttt{action-noether-event-stability-observer-export-open}.
$$

The packet must keep

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false}.
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it removes a false positive from the geometry bridge: the $37/240$ trace zero is a resolution-unstable near-fold cancellation. Any speed-window row is only a declared diagnostic unless a retained branch supplies that window as part of its live variables. The fold-chart successor explains the nearby root-ledger instability as a saddle-node boundary, and the fold-aware successor chain now finds a sign-certified zero bracket, but promotion should still wait for a successor branch that is fold-aware, resolution-stable, interval-certified where needed, and speed-row compatible, so the corpus does not mistake a scalar speed-ODE cancellation for a retained geometry branch.
