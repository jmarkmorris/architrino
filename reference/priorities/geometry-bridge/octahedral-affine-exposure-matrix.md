# Octahedral Affine Exposure Matrix

Promotion status: `priority-only`.

This packet consumes [octahedral-exposure-derivative-adjoint](octahedral-exposure-derivative-adjoint.md), [specific-branch-response-insertion](specific-branch-response-insertion.md), and [specific-branch-response-closure](specific-branch-response-closure.md). It extends the closed isotropic exposure column to a finite affine exposure-probe matrix on the same rigid octahedral root ledger.

The packet does not claim the full retained branch derivative $D_YZ_B$. It works in the same fixed-ledger exposure-probe convention as [minimal-worked-branch-response](minimal-worked-branch-response.md): root delays respond through the simple-root scalar row, while branch labels, external exposure weights, cycle measure, tangent rows, and Jacobian rows are held fixed. The retained-branch derivative remains the stronger object because it must also differentiate delayed source endpoints, tangent rows, event rows, and $J_\rho$.

The accompanying executable diagnostic [octahedral-affine-exposure-probe.mjs](../../../scripts/neutral-swarm/octahedral-affine-exposure-probe.mjs) emits this matrix numerically from the existing certified root-ledger helpers and verifies that the trace column reproduces the known coefficient $\zeta_{\delta Z}$.

## Affine Exposure Probe

Let $H^a{}_b$ be a small affine exposure-probe matrix and write

$$
\mathsf D_H=I+H,
\qquad
\|H\|\ll1.
$$

For one active octahedral root row $\rho$, keep the notation

$$
\widehat R_\rho^a=\frac{R_\rho^a}{\eta_\rho},
\qquad
P_\rho^{ab}
=
\widehat R_\rho^a\widehat R_\rho^b-\frac13h^{ab},
\qquad
w_\rho=\frac{\mathsf W_{\mathrm{ext},\rho}}{\eta_\rho^2J_\rho}.
$$

The scalar stretch seen by this root is

$$
\boxed{
s_\rho(H)
=
\widehat R_{\rho,a}H^a{}_b\widehat R_\rho^b.
}
$$

The fixed-ledger simple-root response is therefore

$$
\boxed{
\delta_H\eta_\rho
=
\frac{\eta_\rho}{J_\rho}s_\rho(H).
}
$$

The direction readout changes by the transverse projection of $H\widehat R_\rho$:

$$
\boxed{
q_\rho^a(H)
=
\left(h^a{}_c-\widehat R_\rho^a\widehat R_{\rho,c}\right)
H^c{}_d\widehat R_\rho^d,
\qquad
\delta_H\widehat R_\rho^a=q_\rho^a(H).
}
$$

This convention deliberately omits the delayed-endpoint tangent term from $\delta\widehat R_\rho$. That term belongs to the full retained branch derivative in [octahedral-exposure-derivative-adjoint](octahedral-exposure-derivative-adjoint.md). Here the goal is narrower: differentiate the geometry-facing exposure readout over an already certified causal-root ledger.

The rank-two root projector varies as

$$
\boxed{
\delta_HP_\rho^{ab}
=
q_\rho^a(H)\widehat R_\rho^b
+
\widehat R_\rho^aq_\rho^b(H).
}
$$

Because the probe keeps $J_\rho$ fixed, the root weight obeys

$$
\delta_H\ln w_\rho
=
-2\frac{\delta_H\eta_\rho}{\eta_\rho}
=
-\frac{2}{J_\rho}s_\rho(H).
$$

Thus the affine exposure-probe matrix is the linear map

$$
\boxed{
D_HZ_{\mathrm{oct}}^{ab}
=
\left\langle
\sum_\rho
w_\rho
\left[
q_\rho^a(H)\widehat R_\rho^b
+
\widehat R_\rho^aq_\rho^b(H)
-
\frac{2}{J_\rho}s_\rho(H)P_\rho^{ab}
\right]
\right\rangle_{\mathrm{oct}} .
}
$$

This is a genuine finite operator:

$$
D_HZ_{\mathrm{oct}}
:
\operatorname{End}(\mathbb R^3)
\longrightarrow
\mathrm{Sym}_0^2(h).
$$

Choosing a matrix basis $E_A{}^a{}_b$ for $\operatorname{End}(\mathbb R^3)$ gives nine columns

$$
Z_A^{ab}
=
D_{E_A}Z_{\mathrm{oct}}^{ab}.
$$

If the response chart restricts to metric deformations, replace the nine columns by the six columns with $H=H^T$. If it restricts further to spatial-compliance shear, use only the five symmetric trace-free columns.

## Matrix Adjoint

For any trace-free symmetric tensor $U_{ab}$, define the affine adjoint $\mathsf G_{\mathrm{oct}}(U)$ by

$$
\left\langle
U,D_HZ_{\mathrm{oct}}
\right\rangle_h
=
\mathsf G_{\mathrm{oct}}(U)_a{}^bH^a{}_b.
$$

Let

$$
v_{\rho,a}(U)
=
\left(h_{ac}-\widehat R_{\rho,a}\widehat R_{\rho,c}\right)
U^c{}_d\widehat R_\rho^d.
$$

Then direct transposition of the displayed matrix gives

$$
\boxed{
\mathsf G_{\mathrm{oct}}(U)_a{}^b
=
\left\langle
\sum_\rho
w_\rho
\left[
2v_{\rho,a}(U)\widehat R_\rho^b
-
\frac{2}{J_\rho}
\left(U_{cd}P_\rho^{cd}\right)
\widehat R_{\rho,a}\widehat R_\rho^b
\right]
\right\rangle_{\mathrm{oct}} .
}
$$

This is the finite affine-coordinate version of the response-object adjoint. The completed-square medium block therefore emits the affine-coordinate force

$$
\boxed{
\mathsf F_H^\square(U)
=
-\alpha_Mr_{ZM}\mathsf G_{\mathrm{oct}}(U),
\qquad
U^{ab}=M_B^{ab}+r_{ZM}Z_B^{ab}.
}
$$

At the relaxed medium row $U=0$, this force vanishes while the geometry export remains

$$
M_B^{ab}=-r_{ZM}Z_B^{ab}.
$$

## Trace, Shear, And Rotation Columns

Every affine probe splits uniquely as

$$
H=\tau I+S+\Omega,
\qquad
\tau=\frac13H^a{}_a,
\qquad
S^{ab}=S^{ba},
\qquad
S^a{}_a=0,
\qquad
\Omega^{ab}=-\Omega^{ba}.
$$

Here $\tau$ is the mean affine trace. If one instead uses the full trace $\theta=H^a{}_a$, replace $\tau$ by $\theta/3$ in the trace-column formulas below.

### Trace Column

For $H=\tau I$,

$$
s_\rho(H)=\tau,
\qquad
q_\rho(H)=0.
$$

Therefore

$$
D_{\tau I}Z_{\mathrm{oct}}^{ab}
=
-2\tau
\left\langle
\sum_\rho
\frac{w_\rho}{J_\rho}P_\rho^{ab}
\right\rangle_{\mathrm{oct}}.
$$

The previous octahedral reduction gives

$$
\boxed{
D_{\tau I}Z_{\mathrm{oct}}^{ab}
=
\tau\zeta_{\delta Z}A^{ab},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812,
}
$$

where

$$
A^{ab}
=
n^an^b-\frac13h^{ab},
\qquad
n=\frac{1}{\sqrt3}(1,1,1).
$$

Thus the closed isotropic column is exactly the trace column of the affine exposure-probe matrix.

### Symmetric Trace-Free Columns

For $H=S$ with $S=S^T$ and $S^a{}_a=0$,

$$
s_\rho(S)=\widehat R_{\rho,a}S^a{}_b\widehat R_\rho^b,
\qquad
q_\rho^a(S)
=
\left(h^a{}_c-\widehat R_\rho^a\widehat R_{\rho,c}\right)
S^c{}_d\widehat R_\rho^d.
$$

The shear response is

$$
\boxed{
D_SZ_{\mathrm{oct}}^{ab}
=
\left\langle
\sum_\rho
w_\rho
\left[
q_\rho^a(S)\widehat R_\rho^b
+
\widehat R_\rho^aq_\rho^b(S)
-
\frac{2}{J_\rho}
\left(\widehat R_{\rho,c}S^c{}_d\widehat R_\rho^d\right)
P_\rho^{ab}
\right]
\right\rangle_{\mathrm{oct}}.
}
$$

This emits the missing five-column affine shear operator. It is not a new empirical fit; every entry is a root-ledger average over the already certified octahedral rows.

### Rotation Columns

For $H=\Omega$ with $\Omega^T=-\Omega$,

$$
s_\rho(\Omega)=0,
\qquad
q_\rho(\Omega)=\Omega\widehat R_\rho.
$$

Therefore

$$
D_\Omega Z_{\mathrm{oct}}
=
\Omega Z_{\mathrm{oct}}-Z_{\mathrm{oct}}\Omega.
$$

This is the active-rotation convention. A passive readout-axis rotation reverses the sign. In either convention, the row is a component rotation of the exposure tensor, not a new scalar medium source. In a fixed coordinate frame it is generally nonzero when $Z_{\mathrm{oct,tf}}\ne0$. In a gauge-quotiented branch chart where spatial frame rotations are removed, these three columns are gauge-covariant frame directions and should not be counted as independent physical medium-response columns.

## Executable Diagnostic

The diagnostic script [octahedral-affine-exposure-probe.mjs](../../../scripts/neutral-swarm/octahedral-affine-exposure-probe.mjs) evaluates the displayed fixed-ledger operator using the exported rigid-octahedral root helpers. It declares the decomposition

$$
\operatorname{End}(\mathbb R^3)
=
\mathbb R I
\oplus
\mathrm{Sym}_0^2(h)
\oplus
\mathfrak{so}(3),
$$

emits one trace column, five symmetric trace-free columns, and three rotation gauge-covariant columns, and records the result as a `priority-only` numerical probe matrix rather than a retained branch certificate.

With $37$ midpoint phase samples and $240$ root-search subdivisions, the script emits

$$
\widehat\zeta_{\delta Z}
=
-0.000680152661466,
$$

against the target

$$
\zeta_{\delta Z}
\approx
-0.000680152657812.
$$

The emitted trace column is

$$
D_IZ_{\mathrm{oct}}^{ab}
\approx
\begin{pmatrix}
0 & -0.000226717553822 & -0.000226717553822\\
-0.000226717553822 & 0 & -0.000226717553822\\
-0.000226717553822 & -0.000226717553822 & 0
\end{pmatrix},
$$

matching $D_IZ_{\mathrm{oct}}^{ab}=\zeta_{\delta Z}A^{ab}$ to the displayed numerical precision. The companion test [neutral-swarm-octahedral-affine-exposure-probe.test.js](../../../tests/neutral-swarm-octahedral-affine-exposure-probe.test.js) checks the schema, row count, nine-column decomposition, non-retention status, and trace-column coefficient.

## Bound And Support

The certified octahedral root ledger has

$$
\eta_{\min}^{\mathrm{oct}}>0,
\qquad
J_{\min}^{\mathrm{oct}}\ge J_0\approx0.3798562906,
\qquad
\eta_{\max}^{\mathrm{oct}}=1.979320146556212<2.
$$

For the Frobenius norm,

$$
\|q_\rho(H)\|\le\|H\|,
\qquad
|s_\rho(H)|\le\|H\|,
\qquad
\|P_\rho\|_F=\sqrt{\frac23}.
$$

Hence

$$
\boxed{
\|D_HZ_{\mathrm{oct}}\|_F
\le
\|H\|
\left\langle
\sum_\rho
w_\rho
\left(
\sqrt2+
\frac{2}{J_\rho}\sqrt{\frac23}
\right)
\right\rangle_{\mathrm{oct}}.
}
$$

The affine exposure-probe matrix is therefore bounded on the certified octahedral ledger. It is support-complete under any retained memory convention with $\eta_{\mathrm{mem}}\ge2$, exactly as in the isotropic derivative-adjoint packet.

## What This Closes

This packet closes the finite affine exposure-probe operator:

$$
\boxed{
\texttt{octahedral-affine-exposure-probe-matrix-closed}.
}
$$

The earlier single-mode result is no longer an isolated column. It is the trace part of a full affine decomposition:

$$
\operatorname{End}(\mathbb R^3)
=
\mathbb R I
\oplus
\mathrm{Sym}_0^2(h)
\oplus
\mathfrak{so}(3).
$$

The trace column closes the axial ADM/Cartan cancellation already recorded in [octahedral-exposure-derivative-adjoint](octahedral-exposure-derivative-adjoint.md). The symmetric trace-free block supplies the exact shear-response operator for the same root ledger. The antisymmetric block is a frame-rotation row to be removed by the branch gauge quotient unless the calculation intentionally keeps a fixed external coordinate frame.

The executable diagnostic turns that statement into a reproducible numerical artifact. The root-ledger data were already sufficient; the missing step was declaring the affine probe basis, output tensor convention, and fixed-ledger averaging rule.

## What Remains Open

This packet still does not prove the rigid octahedral carrier is a retained dynamics branch. It also does not emit the full branch-coordinate derivative matrix

$$
Z_p^{ab}=\partial_pZ_B^{ab}=D_YZ_B^{ab}(\partial_pY)
$$

because that stronger object must include delayed source endpoint variation, tangent variation, $J_\rho$ variation, event rows, and action compatibility on one retained chart. The present packet is therefore a real closure of the affine exposure-probe operator, not a promotion of the full geometry bridge to corpus-level observer geometry.

## Promotion Decision

This packet remains `priority-only`. It is safe to use as a theorem target for the priority workstream because it gives explicit equations, an adjoint, a decomposition, a boundedness row, and a passing numerical diagnostic. Promotion into reader-facing AAA prose should wait until either:

1. the rigid octahedral row is explicitly framed as a diagnostic root-ledger example rather than a retained dynamics branch; or
2. a retained branch chart emits the same matrix as part of its dynamics/action/event response package.
