# Octahedral Full Coordinate Exposure Matrix

Promotion status: `priority-only`.

This packet consumes [octahedral-exposure-derivative-adjoint](octahedral-exposure-derivative-adjoint.md) and [octahedral-affine-exposure-matrix](octahedral-affine-exposure-matrix.md). It emits the full same-ledger affine branch-coordinate derivative for the rigid octahedral root ledger.

The distinction from the fixed-ledger affine exposure probe is essential. The fixed-ledger probe differentiates the exposure readout while holding tangent and Jacobian rows fixed. The branch-coordinate derivative varies the carrier itself:

$$
\delta_HY_i=HY_i.
$$

Therefore the delayed source endpoint, tangent row, curvature row, and $J_\rho$ row all vary. This packet closes that derivative component for the rigid affine chart, but it does not retain the rigid carrier as a dynamics branch.

## Same-Ledger Coordinate Row

For an active root $\rho=(i,j)$, write

$$
\lambda^-=\lambda-\eta_\rho,
\qquad
R_\rho=Y_i(\lambda)-Y_j(\lambda^-),
\qquad
\widehat R_\rho=\frac{R_\rho}{\eta_\rho},
$$

and

$$
J_\rho=1-T_{j,\rho}^-\cdot\widehat R_\rho.
$$

For an affine branch coordinate $H^a{}_b$,

$$
\Delta_\rho(H)
=
HY_i(\lambda)-HY_j(\lambda^-)
=
HR_\rho
=
\eta_\rho H\widehat R_\rho.
$$

Define

$$
s_\rho(H)
=
\widehat R_{\rho,a}H^a{}_b\widehat R_\rho^b,
\qquad
\alpha_\rho
=
\widehat R_\rho\cdot\Delta_\rho(H)
=
\eta_\rho s_\rho(H).
$$

The simple-root delay row is

$$
\boxed{
\delta_H\eta_\rho
=
\frac{\eta_\rho}{J_\rho}s_\rho(H).
}
$$

The displacement derivative includes the delayed endpoint term:

$$
\boxed{
\delta_HR_\rho
=
\eta_\rho H\widehat R_\rho
+
\frac{\eta_\rho s_\rho(H)}{J_\rho}T_{j,\rho}^- .
}
$$

Thus

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
\qquad
\Pi_\rho=h-\widehat R_\rho\widehat R_\rho .
}
$$

For the rigid circular octahedral carriers,

$$
p_1=(\cos\theta,\sin\theta,0),
\qquad
p_2=(0,\cos\theta,\sin\theta),
\qquad
p_3=(\sin\theta,0,\cos\theta),
$$

with signed carrier rows

$$
Y_{a,\sigma}=\sigma p_a,
\qquad
T_{a,\sigma}=\sigma p_a',
\qquad
K_{a,\sigma}=\sigma p_a''=-Y_{a,\sigma}.
$$

The delayed tangent variation is

$$
\delta_HT_{j,\rho}^-
=
HT_{j,\rho}^-
-
K_{j,\rho}^-\delta_H\eta_\rho .
$$

Therefore

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

The projector row is

$$
\boxed{
\delta_HP_\rho^{ab}
=
\delta_H\widehat R_\rho^a\widehat R_\rho^b
+
\widehat R_\rho^a\delta_H\widehat R_\rho^b,
\qquad
P_\rho^{ab}
=
\widehat R_\rho^a\widehat R_\rho^b-\frac13h^{ab}.
}
$$

With

$$
w_\rho
=
\frac{\mathsf W_{\mathrm{ext},\rho}}{\eta_\rho^2J_\rho},
$$

the full same-ledger affine branch-coordinate exposure derivative is

$$
\boxed{
D_H^{\mathrm{coord}}Z_{\mathrm{oct}}^{ab}
=
\left\langle
\sum_\rho
w_\rho
\left[
\delta_HP_\rho^{ab}
-
\left(
\frac{2s_\rho(H)}{J_\rho}
+
\frac{\delta_HJ_\rho}{J_\rho}
\right)
P_\rho^{ab}
\right]
\right\rangle_{\mathrm{oct}} .
}
$$

Choosing the same nine-column affine basis as [octahedral-affine-exposure-matrix](octahedral-affine-exposure-matrix.md) gives

$$
Z_A^{ab}
=
D_{E_A}^{\mathrm{coord}}Z_{\mathrm{oct}}^{ab}.
$$

The finite-coordinate adjoint is again the matrix transpose under the trace-free tensor inner product:

$$
\boxed{
\left(D_a^{\mathrm{coord}}Z_{\mathrm{oct}}^*(U)\right)_A
=
U_{ab}Z_A^{ab}.
}
$$

## Difference From The Fixed-Ledger Probe

The fixed-ledger affine exposure probe and the branch-coordinate matrix share only the scalar delay row

$$
\delta_H\eta_\rho
=
\frac{\eta_\rho}{J_\rho}s_\rho(H).
$$

They differ in the direction and Jacobian rows. The fixed-ledger probe uses

$$
\delta_H\widehat R_\rho
=
\Pi_\rho H\widehat R_\rho,
\qquad
\delta_HJ_\rho=0.
$$

The branch-coordinate derivative instead uses

$$
\delta_H\widehat R_\rho
=
\Pi_\rho
\left(
H\widehat R_\rho
+
\frac{s_\rho(H)}{J_\rho}T_{j,\rho}^-
\right),
$$

and the nonzero $\delta_HJ_\rho$ row displayed above.

This changes the trace column sharply. In the fixed-ledger probe, $H=I$ gives the small axial coefficient

$$
D_IZ_{\mathrm{oct}}^{ab}
=
\zeta_{\delta Z}A^{ab},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812.
$$

In the branch-coordinate derivative, the same coordinate $H=I$ gives at the diagnostic quadrature resolution

$$
D_I^{\mathrm{coord}}Z_{\mathrm{oct}}^{ab}
\approx
\begin{pmatrix}
0 & 0.0433750704918 & 0.0433750704918\\
0.0433750704918 & 0 & 0.0433750704918\\
0.0433750704918 & 0.0433750704918 & 0
\end{pmatrix}.
$$

Thus the geometry bridge has split a former ambiguity into two different mathematical objects:

1. fixed-ledger exposure probes, which model environment/readout deformation;
2. branch-coordinate derivatives, which move the delayed causal-root carrier itself.

## Executable Diagnostic

The executable diagnostic [octahedral-coordinate-exposure-matrix.mjs](../../../scripts/neutral-braid/octahedral-coordinate-exposure-matrix.mjs) emits the nine-column matrix from the certified root-ledger helpers. It includes:

- delayed endpoint transport;
- source tangent transport;
- circular-carrier curvature $K=-Y$;
- $J_\rho$ variation;
- central finite-difference validation after re-solving the deformed causal roots.

For a central finite-difference step $10^{-5}$, $37$ midpoint phase samples, and $240$ root-search subdivisions, every column passes the finite-difference comparison. The worst observed per-entry error is

$$
1.63\times10^{-9},
$$

and the worst Frobenius error is

$$
2.34\times10^{-9}.
$$

The representative shear column $H^{xy}=H^{yx}=1$ is

$$
D_{xy}^{\mathrm{coord}}Z_{\mathrm{oct}}^{ab}
\approx
\begin{pmatrix}
0.00841207759292 & 0.0662287182236 & 0.00898989216471\\
0.0662287182236 & 0.00841207760083 & 0.00898989216471\\
0.00898989216471 & 0.00898989216471 & -0.0168241551938
\end{pmatrix}.
$$

The companion test [neutral-braid-octahedral-coordinate-exposure-matrix.test.js](../../../tests/neutral-braid-octahedral-coordinate-exposure-matrix.test.js) checks the schema, all nine columns, all finite-difference comparisons, the distinction from the fixed-ledger trace probe, and the non-retention verdict.

## Retention Verdict

This packet upgrades the geometry-bridge status from

$$
\texttt{affine-exposure-probe-closed}
$$

to

$$
\boxed{
\texttt{full-coordinate-exposure-derivative-closed-for-rigid-affine-chart}.
}
$$

It does not retain the rigid carrier. The rigid zero-offset fixed-speed neutral row remains

$$
\texttt{closed-rejected:rigid-octahedral-fixed-speed-neutral-row}
$$

and

$$
\texttt{not\_retained},
$$

because the same ledger still fails the fixed-speed tangential dynamics row. The emitted matrix may be consumed as derivative data for a later response, Newton, or Krawczyk calculation, but branch retention requires a live dynamics/action/event ledger, most likely through a bounded-speed or deformed-support normal-reconstruction route.

The current compact status is

$$
\boxed{
\texttt{full-coordinate-exposure-derivative-closed;}
}
$$

$$
\boxed{
\texttt{rigid-fixed-speed-row-not-retained;}
}
$$

$$
\boxed{
\texttt{bounded-speed-or-deformed-support-live-ledger-required-for-retention}.
}
$$

## What Remains Open

The derivative blocker is now closed for the rigid affine coordinate chart. The remaining blocker is not another exposure derivative. It is the absence of a retained live branch whose force, action, event, stability, and Noether rows pass on the same ledger.

Thus the next geometry-bridge target should consume this matrix as derivative data for a bounded-speed or deformed-support retention calculation. A new retained candidate must emit its own same-ledger dynamics/action row; otherwise this matrix remains a diagnostic derivative artifact rather than a proof of emergent observer geometry.

## Promotion Decision

This packet remains `priority-only`. It is too diagnostic for direct AAA corpus promotion because it belongs to a rigid carrier that is already fixed-speed rejected. Its theorem-target content should be promoted only after a reader-facing document can state the full distinction between exposure probes and branch-coordinate derivatives without implying that the rigid carrier is retained.
