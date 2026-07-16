# Octahedral Affine Force-Mean Derivative

Promotion status: `priority-only`.

This packet consumes [octahedral-full-coordinate-exposure-matrix](octahedral-full-coordinate-exposure-matrix.md) and the rigid octahedral speed-ODE diagnostic. It asks a narrower question than branch retention:

$$
\text{can an affine branch-coordinate direction cancel the frozen six-row speed-ODE mean at first order?}
$$

The answer for the rigid octahedral chart is yes at the candidate affine force-mean level. The trace affine column alone puts the negative frozen mean vector in range. This removes a concrete first-order range obstruction, but it does not certify a live derivative matrix, a live correction direction, a bounded-speed live ledger, or a retained branch.

## Force-Mean Row

Let the affine coordinate deformation be

$$
Y_i^\epsilon(\theta)
=
(I+\epsilon H)Y_i(\theta),
\qquad
T_i^\epsilon(\theta)
=
(I+\epsilon H)T_i(\theta).
$$

For each active causal-root row $\rho=(i,j,\theta)$, write

$$
R_{\rho,\epsilon}
=
Y_i^\epsilon(\theta)-Y_j^\epsilon(\theta-\eta_{\rho,\epsilon}),
\qquad
\widehat R_{\rho,\epsilon}
=
\frac{R_{\rho,\epsilon}}{\eta_{\rho,\epsilon}},
$$

and

$$
J_{\rho,\epsilon}
=
1-T_j^\epsilon(\theta-\eta_{\rho,\epsilon})\cdot\widehat R_{\rho,\epsilon}.
$$

The diagnostic force contribution is

$$
F_{\rho,\epsilon}
=
\frac{\sigma_i\sigma_j}{\eta_{\rho,\epsilon}^2|J_{\rho,\epsilon}|}
\widehat R_{\rho,\epsilon},
$$

and the six-row period-integral force mean is

$$
\boxed{
M_i(\epsilon;H)
=
\int_0^{2\pi}
T_i^\epsilon(\theta)\cdot
\sum_{j\ne i}F_{\rho,\epsilon}
\,d\theta .
}
$$

The affine derivative matrix is the six-by-nine map

$$
\boxed{
B_{iA}
=
\frac{d}{d\epsilon}
M_i(\epsilon;E_A)
\bigg|_{\epsilon=0},
}
$$

where $E_A$ ranges over the same affine basis used by the coordinate exposure matrix:

$$
I,\quad
x-y,\quad
x+y-2z,\quad
xy,\quad
xz,\quad
yz,\quad
\Omega_{xy},\quad
\Omega_{xz},\quad
\Omega_{yz}.
$$

## Analytic Derivative Row

For a simple root, define

$$
s_\rho(H)
=
\widehat R_{\rho,a}H^a{}_b\widehat R_\rho^b,
\qquad
\Pi_\rho
=
h-\widehat R_\rho\widehat R_\rho.
$$

The same branch-coordinate rows used by the coordinate exposure packet give

$$
\boxed{
\delta_H\eta_\rho
=
\frac{\eta_\rho}{J_\rho}s_\rho(H),
}
$$

$$
\boxed{
\delta_H\widehat R_\rho
=
\Pi_\rho
\left(
H\widehat R_\rho
+
\frac{s_\rho(H)}{J_\rho}T_{j,\rho}^-
\right),
}
$$

and, for the circular carrier row $K_j^-=-Y_j^-$,

$$
\boxed{
\delta_HJ_\rho
=
-\widehat R_\rho\cdot HT_{j,\rho}^-
+
\left(K_{j,\rho}^-\cdot\widehat R_\rho\right)
\frac{\eta_\rho s_\rho(H)}{J_\rho}
-
T_{j,\rho}^-\cdot\delta_H\widehat R_\rho .
}
$$

On the certified rigid-root rows used by the diagnostic, $J_\rho>0$ at the sampled roots, so differentiating $|J_\rho|$ agrees with differentiating $J_\rho$. Thus

$$
\delta_HF_\rho
=
\frac{\sigma_i\sigma_j}{\eta_\rho^2J_\rho}
\left[
\delta_H\widehat R_\rho
-
\left(
2\frac{\delta_H\eta_\rho}{\eta_\rho}
+
\frac{\delta_HJ_\rho}{J_\rho}
\right)
\widehat R_\rho
\right].
$$

The row derivative is therefore

$$
\boxed{
B_{iH}
=
\left\langle
\sum_{j\ne i}
\left[
HT_i\cdot F_\rho
+
T_i\cdot\delta_HF_\rho
\right]
\right\rangle_\theta .
}
$$

The executable artifact computes this row by central finite differences after re-solving the causal root for each deformed coordinate chart. The analytic row above is the closed-form target for a future symbolic verifier.

## Range Result

At $37$ phase samples, $240$ root-search subdivisions, and central finite-difference step $10^{-5}$, the frozen period-integral mean is

$$
M(0)
\approx
1.157406692931\,\mathbf 1_6.
$$

The trace column is already a constant six-vector to the diagnostic tolerance:

$$
B_{\mathrm{trace}}
\approx
-0.356476675534\,\mathbf 1_6.
$$

The emitted derivative matrix has rank

$$
\operatorname{rank}B=3,
$$

and the negative frozen mean lies in its range:

$$
\boxed{
-M(0)\in\operatorname{Range}(B).
}
$$

The trace column alone supplies the candidate affine correction direction

$$
\boxed{
\alpha_{\mathrm{trace}}
\approx
3.24679501458,
\qquad
\left\|B_{\mathrm{trace}}\alpha_{\mathrm{trace}}+M(0)\right\|_2
\approx
9.4\times10^{-11}.
}
$$

The full independent-column range solve gives

$$
\alpha_B
\approx
(3.24679501458,\,0,\,0,\,0,\,0,\,0,\,0,\,0,\,0),
$$

up to roundoff in the second and third independent columns, with residual norm

$$
\left\|B\alpha_B+M(0)\right\|_2
\approx
7.6\times10^{-11}.
$$

## Theory Consequence

This is a true geometry-bridge advance because the fixed-speed rejection no longer says that the constant six-row mean is unreachable by affine branch-coordinate motion. The first-order obstruction

$$
B\alpha=-M(0)
$$

has an explicit candidate solution, and the solution is not a complicated shear: it is the mean trace direction $H=\alpha_{\mathrm{trace}}I$.

The result should be read at exactly this claim level:

$$
\boxed{
\texttt{candidate-affine-zero-mean-range-obstruction-removed}.
}
$$

It does not prove that the rigid carrier becomes retained. Instead it identifies the next retained-branch equation: a live ledger must realize the trace affine direction as an admissible correction while preserving root regularity, any declared speed-variable row, clock/length return, normal reconstruction, action rows, event rows, stability, Noether rows, and observer export on the same ledger.

## Executable Diagnostic

The executable diagnostic [octahedral-affine-force-mean-derivative.mjs](../../../../scripts/neutral-braid/octahedral-affine-force-mean-derivative.mjs) emits:

- the frozen six-row period-integral force mean;
- the nine affine derivative columns;
- the rank and range certificate for $-M(0)$;
- the trace-only correction certificate;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-affine-force-mean-derivative.test.js](../../../../tests/neutral-braid-octahedral-affine-force-mean-derivative.test.js) verifies the schema, the six-by-nine matrix, the trace-only correction direction, the rank/range certificate, CLI validation, and the claim-level guard:

$$
\texttt{certifies\_live\_derivative\_matrix=false},
$$

$$
\texttt{certifies\_live\_correction\_direction=false},
$$

$$
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
$$

$$
\texttt{retention=not\_retained}.
$$

## Retention Verdict

This packet upgrades the zero-mean correction route from

$$
\texttt{affine-force-mean-derivative-open}
$$

to

$$
\boxed{
\texttt{candidate-affine-zero-mean-range-obstruction-removed}.
}
$$

The first remaining failure status is

$$
\boxed{
\texttt{live-ledger-derivative-open}.
}
$$

The trace affine direction is now the preferred Newton seed for the bounded-speed or deformed-support successor. A retained successor must supply the same-ledger live derivative matrix and first-order margin guards before this candidate can be converted into a certified live correction direction.

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive, but it is still a diagnostic result for the fixed-speed rejected rigid octahedral chart. Reader-facing promotion should wait until the bounded-speed or deformed-support successor either converts the trace affine direction into a certified live correction direction or proves that the direction fails one of the same-ledger retention rows.
