# Octahedral Exposure Derivative Adjoint

Promotion status: `priority-only`.

This packet consumes [retained-medium-response-object-emission](retained-medium-response-object-emission.md), [specific-branch-response-insertion](specific-branch-response-insertion.md), and [specific-branch-response-closure](specific-branch-response-closure.md). It computes the exposure derivative needed by the retained medium-response object as far as the current octahedral row allows.

The result is deliberately split:

1. the general branch derivative $D_YZ_B$ is stated as an exact root-sensitive formula but is not fully emitted for arbitrary branch coordinates;
2. the one-dimensional isotropic affine probe column is closed, including its adjoint.

That distinction matters. The current rigid octahedral row can close the derivative obstruction for the axial metric-cancellation calculation, but it still cannot claim full retained dynamics.

## General Simple-Root Derivative

For an active fixed-speed root row $\rho=(i,j)$, write

$$
R_\rho
=
Y_i(\lambda)-Y_j(\lambda-\eta_\rho),
\qquad
\widehat R_\rho=\frac{R_\rho}{\eta_\rho},
\qquad
\|R_\rho\|=\eta_\rho.
$$

The root equation is

$$
G_\rho(Y,\eta_\rho)
=
\|R_\rho\|-\eta_\rho
=0.
$$

Let $T_{j,\rho}^{-}$ and $K_{j,\rho}^{-}$ denote the source tangent and source curvature evaluated at $\lambda-\eta_\rho$. The fixed-speed Jacobian is

$$
J_\rho
=
1-T_{j,\rho}^{-}\cdot\widehat R_\rho.
$$

Define

$$
\Delta_\rho(\delta Y)
=
\delta Y_i(\lambda)-\delta Y_j(\lambda-\eta_\rho),
\qquad
\alpha_\rho
=
\widehat R_\rho\cdot\Delta_\rho(\delta Y).
$$

For a retained branch variation $\delta Y$, the root derivative on the same active root sheet is

$$
\boxed{
\delta\eta_\rho
=
\frac{\alpha_\rho}{J_\rho}.
}
$$

The displacement and unit-direction derivatives are

$$
\delta R_\rho
=
\Delta_\rho(\delta Y)
+
\frac{T_{j,\rho}^{-}\alpha_\rho}{J_\rho},
$$

and

$$
\boxed{
\delta\widehat R_\rho
=
\frac{1}{\eta_\rho}
\left(
h-\widehat R_\rho\widehat R_\rho
\right)
\delta R_\rho.
}
$$

If the tangent row is retained, the Jacobian derivative is

$$
\boxed{
\delta J_\rho
=
-
\widehat R_\rho\cdot
\delta Y_j'(\lambda-\eta_\rho)
+
\left(
K_{j,\rho}^{-}\cdot\widehat R_\rho
\right)
\frac{\alpha_\rho}{J_\rho}
-
T_{j,\rho}^{-}\cdot\delta\widehat R_\rho.
}
$$

If the retained chart does not emit the tangent derivative $\delta Y_j'$ and curvature row $K_{j,\rho}^{-}$, the full $D_YZ_B$ row is not emitted.

## Exposure Derivative Formula

For the geometry-facing exposure row, use

$$
w_\rho
=
\frac{\mathsf W_{\mathrm{ext},\rho}}{\eta_\rho^2J_\rho}
$$

on the certified octahedral ledger, where $J_\rho>0$. Let

$$
P_\rho^{ab}
=
\widehat R_\rho^a\widehat R_\rho^b
-
\frac13h^{ab}.
$$

The trace-free exposure tensor is

$$
Z_B^{ab}
=
\left\langle
\sum_{\rho\in\mathcal A_B^{\mathrm{ext}}}
w_\rho P_\rho^{ab}
\right\rangle_B.
$$

For fixed external weights $\mathsf W_{\mathrm{ext},\rho}$, fixed cycle measure, and fixed Euclidean metric $h$, the derivative is

$$
\boxed{
D_YZ_B^{ab}(\delta Y)
=
\left\langle
\sum_{\rho}
w_\rho
\left[
\delta P_\rho^{ab}
-
\left(
2\frac{\delta\eta_\rho}{\eta_\rho}
+
\frac{\delta J_\rho}{J_\rho}
\right)
P_\rho^{ab}
\right]
\right\rangle_B,
}
$$

with

$$
\delta P_\rho^{ab}
=
\delta\widehat R_\rho^a\widehat R_\rho^b
+
\widehat R_\rho^a\delta\widehat R_\rho^b.
$$

This is the exact same-ledger derivative formula for a simple-root fixed-speed chart. It has two immediate consequences:

1. full retained-branch emission requires root, direction, tangent, and Jacobian derivative columns on one chart;
2. any finite coordinate chart $a^p$ gets a derivative matrix by substituting $\delta Y=\partial_pY$.

If exposure weights or cycle measure are retained variables, their variations add the corresponding $\delta\ln\mathsf W_{\mathrm{ext},\rho}$ and measure-variation rows to the displayed derivative. The octahedral single-mode row below holds them fixed, matching the source insertion packet.

Thus

$$
Z_p^{ab}
\equiv
\partial_pZ_B^{ab}
=
D_YZ_B^{ab}(\partial_pY).
$$

## Coordinate Adjoint

On a finite retained coordinate chart with coordinates $a^p$, the adjoint needed by the response object is simply the transpose of this derivative matrix under the trace-free tensor inner product:

$$
\boxed{
\left(D_aZ_B^{*}(U)\right)_p
=
U_{ab}Z_p^{ab}.
}
$$

Equivalently,

$$
\left\langle
U,D_aZ_B(\delta a)
\right\rangle_h
=
\sum_p
\left(D_aZ_B^{*}(U)\right)_p
\delta a^p.
$$

This is enough to write the finite-mode response force row from [retained-medium-response-object-emission](retained-medium-response-object-emission.md):

$$
\boxed{
F_p^{\square}
=
-
\alpha_Mr_{ZM}
U_{ab}Z_p^{ab},
\qquad
U^{ab}=M_B^{ab}+r_{ZM}Z_B^{ab}.
}
$$

The continuous branch-force adjoint requires the explicit distributional or finite-element adjoint of the maps $\delta Y\mapsto\delta\eta_\rho$, $\delta\widehat R_\rho$, and $\delta J_\rho$. That continuous adjoint is not currently emitted by the rigid octahedral packet.

## Closed Isotropic-Probe Column

The isotropic support probe from [minimal-worked-branch-response](minimal-worked-branch-response.md) is the one-dimensional coordinate $\varepsilon$ with

$$
\delta Y_i=\varepsilon Y_i.
$$

For this column,

$$
\delta\eta_\rho
=
\frac{\eta_\rho}{J_\rho}\varepsilon,
\qquad
\delta\widehat R_\rho=0,
\qquad
\delta J_\rho=0
$$

in the fixed-speed rigid octahedral chart. Therefore

$$
D_\varepsilon Z_B^{ab}
=
-2
\left\langle
\sum_{\rho}
\frac{\mathsf W_{\mathrm{ext},\rho}}{\eta_\rho^2J_\rho^2}
P_\rho^{ab}
\right\rangle_B.
$$

The certified octahedral all-pairs reduction gives

$$
\boxed{
D_\varepsilon Z_{\mathrm{oct}}^{ab}
=
\zeta_{\delta Z}A^{ab},
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
n=\frac{1}{\sqrt3}(1,1,1),
\qquad
A_{ab}A^{ab}=\frac23.
$$

Thus the one-dimensional adjoint is closed:

$$
\boxed{
D_\varepsilon Z_{\mathrm{oct}}^{*}(U)
=
\zeta_{\delta Z}A_{ab}U^{ab}.
}
$$

If the mismatch tensor lies on the same axial line,

$$
U^{ab}=uA^{ab},
$$

then

$$
\boxed{
D_\varepsilon Z_{\mathrm{oct}}^{*}(uA)
=
\frac23\zeta_{\delta Z}u
\approx
-0.000453435105208\,u.
}
$$

The corresponding one-coordinate response force is

$$
\boxed{
F_\varepsilon^{\square}
=
-
\alpha_Mr_{ZM}\zeta_{\delta Z}A_{ab}U^{ab}.
}
$$

For $U=uA$,

$$
\boxed{
F_\varepsilon^{\square}
=
0.000453435105208\,\alpha_Mr_{ZM}u.
}
$$

This is not a new fitted coefficient. It is the adjoint of the already computed octahedral exposure derivative column.

## Operator Norm And Memory Bound

As a map from the scalar coordinate $\varepsilon$ to $\mathrm{Sym}^{2}_{0}(h)$,

$$
\|D_\varepsilon Z_{\mathrm{oct}}\|
=
|\zeta_{\delta Z}|\|A\|_F
=
|\zeta_{\delta Z}|\sqrt{\frac23}
\approx
0.000555311902.
$$

The adjoint has the same norm:

$$
\|D_\varepsilon Z_{\mathrm{oct}}^{*}\|
=
|\zeta_{\delta Z}|\sqrt{\frac23}.
$$

The active fixed-speed octahedral root ledger has delay ceiling

$$
\eta_{\max}^{\mathrm{oct}}
=
1.979320146556212
<
2.
$$

Therefore the isotropic-probe exposure derivative is support-complete for any retained branch memory convention with

$$
\eta_{\mathrm{mem}}\ge2.
$$

Under a shorter memory convention, this same derivative cannot be consumed as a retained response row; the status is `medium-response-memory-mismatch`.

## Medium-Response Consequence

The retained trace-free block from [retained-medium-action-ledger-row](retained-medium-action-ledger-row.md) has mismatch

$$
U=M_B+r_{ZM}Z_B.
$$

Along the isotropic octahedral column, the response object emits the generalized force

$$
\boxed{
F_\varepsilon^{\square}
=
-
\alpha_Mr_{ZM}D_\varepsilon Z_{\mathrm{oct}}^{*}(U).
}
$$

At the relaxed medium row

$$
M_B=-r_{ZM}Z_B,
\qquad
U=0,
$$

so

$$
F_\varepsilon^{\square}=0.
$$

The geometry export is not zero. It is

$$
M_B^{ab}
=
-r_{ZM}Z_B^{ab},
$$

and for the octahedral axial response,

$$
\mu_K
=
-r_{ZM}\zeta_{\delta Z}
=
0.000680152657812\,r_{ZM}.
$$

Thus the derivative-adjoint obstruction is closed for the one-dimensional axial geometry-bridge calculation:

$$
\boxed{
\texttt{isotropic-probe-derivative-adjoint-closed}.
}
$$

## Classification

| Row | Status | Meaning |
| --- | --- | --- |
| general $D_YZ_B$ formula | `root-sensitive-formula-stated` | exact formula is available for any simple fixed-speed root chart |
| continuous $D_YZ_B^*$ force adjoint | `not-emitted` | requires tangent and Jacobian derivative columns for arbitrary $\delta Y$ |
| coordinate adjoint $D_aZ_B^*$ | `matrix-adjoint-stated` | once columns $Z_p^{ab}$ are emitted, the adjoint is $U_{ab}Z_p^{ab}$ |
| isotropic affine column $D_\varepsilon Z_{\mathrm{oct}}$ | `closed` | equals $\zeta_{\delta Z}A^{ab}$ |
| isotropic affine adjoint $D_\varepsilon Z_{\mathrm{oct}}^*$ | `closed` | equals $\zeta_{\delta Z}A_{ab}U^{ab}$ |
| memory support for isotropic column | `closed-if-eta-mem-ge-2` | all active octahedral roots have delay below $2$ |
| retained medium block on this column | `single-mode-medium-response-admissible` | the response object, action block, curl row, derivative, and adjoint are all explicit for this coordinate |
| full retained branch | `response-open` | full dynamics/action/event/stability and arbitrary-coordinate exposure derivatives remain unretained |

## What This Closes

The metric-cancellation route is now closed at the level of the single octahedral axial perturbation:

$$
D_\varepsilon Z_{\mathrm{oct}}^{ab}
=
\zeta_{\delta Z}A^{ab},
\qquad
D_\varepsilon Z_{\mathrm{oct}}^{*}(U)
=
\zeta_{\delta Z}A_{ab}U^{ab},
$$

and the retained medium tensor

$$
M_B^{ab}=-r_{ZM}Z_B^{ab}
$$

emits exactly

$$
\mu_K=0.000680152657812\,r_{ZM}.
$$

Combined with the previous packets, the first-order axial observer residual vanishes:

$$
\mathcal R_{\mathrm{ax},B}^{ij}=0
$$

for $\lambda_M\ne0$ and $r_{ZM}=\lambda_Z/\lambda_M$.

This is a true theory advancement: the rigid octahedral root-ledger geometry no longer merely names a missing medium response. For the axial isotropic probe, the needed response tensor, conservative storage block, response object, derivative, adjoint, support bound, and ADM/Cartan cancellation coefficient are all explicit.

## What Remains Open

This packet does not prove the rigid octahedral carrier is a retained dynamics branch. It also does not emit the full exposure derivative for arbitrary support, tangent, bounded-speed, event, or Noether-Sea variations. The next hard mathematical target is no longer the axial cancellation coefficient; it is the full finite-coordinate derivative matrix

$$
Z_p^{ab}
=
\partial_pZ_B^{ab}
$$

for a retained branch chart whose dynamics/action/event rows are on the same root ledger.

## Promotion Decision

This packet remains `priority-only`. Its single-mode result may later be promoted as a theorem target once the surrounding retained-branch status is settled, but the current diagnostic octahedral carrier is not reader-facing proof of emergent observer geometry.
