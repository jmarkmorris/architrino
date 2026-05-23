# Retained Medium Response Object Emission

Promotion status: `priority-only`.

This packet consumes [retained-medium-action-ledger-row](retained-medium-action-ledger-row.md). It turns the completed-square trace-free storage block into an explicit conditional response object. The result is not a fitted force law. It is the variational response implied if the branch retains both the exposure tensor $Z$ and the medium tensor $M$ on the same root-regular event chart.

## Retained Exposure Map

Let the branch-local exposure map be

$$
Z_B^{ab}(Y;\theta;\lambda)
=
\delta\mathcal Z_{\mathrm{tf}}^{ab}(\lambda),
\qquad
Z_B(\lambda)\in\mathrm{Sym}^{2}_{0}(h),
$$

where $Y$ denotes retained branch coordinates and $\theta$ denotes the local Noether-Sea or environment record. Let the retained medium tensor be

$$
M_B^{ab}(\lambda)
=
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}(\lambda).
$$

For fixed local projection ratio $r_{ZM}$ and $\alpha_M>0$, define

$$
U_B^{ab}(\lambda)
=
M_B^{ab}(\lambda)+r_{ZM}Z_B^{ab}(Y;\theta;\lambda).
$$

The candidate response action is

$$
\boxed{
\mathcal S_{\mathrm{sea,tf}}^{\square}(Y,M_B;\theta)
=
-
\int_0^{L_B}
\frac{\alpha_M}{2}
\langle U_B,U_B\rangle_h
d\lambda.
}
$$

The sign convention makes force equal to the action variation with respect to $Y$ in the same orientation as the branch virtual-work row. Reversing the action sign reverses the displayed force convention but not the stationarity or curl conclusions.

## Variation With Respect To The Medium Tensor

Holding $Y$ fixed,

$$
\delta_M\mathcal S_{\mathrm{sea,tf}}^{\square}
=
-
\int_0^{L_B}
\alpha_M
\langle U_B,\delta M_B\rangle_h
d\lambda.
$$

The retained medium Euler row is therefore

$$
\boxed{
U_B^{ab}=0
\quad\Longleftrightarrow\quad
M_B^{ab}=-r_{ZM}Z_B^{ab}.
}
$$

Thus the emitted trace-free tensor row is

$$
\boxed{
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
-r_{ZM}\delta\mathcal Z_{\mathrm{tf}}^{ab},
}
$$

which is exactly the susceptibility required by the axial ADM/Cartan cancellation row.

## Variation With Respect To Branch Coordinates

Let $\delta Y_i^\perp(\lambda)$ be an allowed transverse branch variation. The exposure map derivative is the linear map

$$
D_YZ_B^{ab}(\delta Y^\perp;\lambda).
$$

The $Y$-variation of the response action is

$$
\delta_Y\mathcal S_{\mathrm{sea,tf}}^{\square}
=
-
\int_0^{L_B}
\alpha_M r_{ZM}
\left\langle
U_B,\,
D_YZ_B(\delta Y^\perp)
\right\rangle_h
d\lambda.
$$

Define the adjoint exposure derivative by

$$
\int_0^{L_B}
\left\langle
U_B,\,
D_YZ_B(\delta Y^\perp)
\right\rangle_h
d\lambda
=
\int_0^{L_B}
\sum_i
\left(
D_YZ_B^{*}(U_B)
\right)_i
\cdot
\delta Y_i^\perp
d\lambda
+
\mathcal B_Z(U_B,\delta Y^\perp),
$$

where $\mathcal B_Z$ collects endpoint and active-root boundary terms. The corresponding response force row is

$$
\boxed{
\widetilde{\mathbf F}_{i,\mathrm{sea}}^{\square}
=
-
\alpha_M r_{ZM}
\left(
D_YZ_B^{*}(U_B)
\right)_i.
}
$$

The boundary row is

$$
\boxed{
\mathcal B_{\mathrm{sea}}^{\square}
=
-
\alpha_M r_{ZM}\mathcal B_Z(U_B,\delta Y^\perp).
}
$$

Thus the response object can be written conditionally as

$$
\boxed{
\mathcal M_{\mathrm{resp}}^{\square}
:
(Y,\mathcal A_B,\mathcal N_B,M_B)
\mapsto
\widetilde{\mathbf F}_{\mathrm{sea}}^{\square}
=
-
\alpha_M r_{ZM}D_YZ_B^{*}
\left(
M_B+r_{ZM}Z_B(Y;\theta)
\right).
}
$$

This is the missing object form. The only branch-specific quantity still needed is the derivative and adjoint of the already computed exposure map $Z_B$.

## Stationary Force Consequence

At the relaxed medium row,

$$
U_B=0,
$$

so

$$
\boxed{
\widetilde{\mathbf F}_{i,\mathrm{sea}}^{\square}=0,
\qquad
\mathcal B_{\mathrm{sea}}^{\square}=0.
}
$$

This does not remove the medium response from the geometry export. It says that the completed-square block is a conservative mismatch penalty: once the retained medium tensor has relaxed to $M_B=-r_{ZM}Z_B$, the block emits the needed geometry tensor without exerting an additional off-shell branch force. Away from stationarity, the force is exactly the exposure-adjoint restoring row above.

## Memory And Lipschitz Descent

If the exposure map satisfies the causal support bound

$$
\operatorname{supp}
D_YZ_B(\lambda)
\subseteq
\{\xi:\lambda-\eta_Z\le\xi\le\lambda\},
$$

then the response force inherits the same support:

$$
\operatorname{supp}
\mathcal M_{\mathrm{resp}}^{\square}(\lambda)
\subseteq
\{\xi:\lambda-\eta_Z\le\xi\le\lambda\}.
$$

Thus the medium response memory condition reduces to

$$
\eta_Z\le\eta_{\mathrm{mem}}.
$$

If the exposure derivative has a retained-chart bound

$$
\|D_YZ_B\|\le L_Z,
$$

and the medium tensor row has

$$
\|D_YM_B\|\le L_M,
$$

then the response force has the local estimate

$$
\boxed{
\|D\widetilde{\mathbf F}_{\mathrm{sea}}^{\square}\|
\le
\alpha_M|r_{ZM}|
\|D_YZ_B^{*}\|
\left(
L_M+|r_{ZM}|L_Z
\right)
+
\alpha_M|r_{ZM}|
\|D(D_YZ_B^{*})\|\,\|U_B\|.
}
$$

On the relaxed row $U_B=0$, the second term vanishes. Therefore the Lipschitz burden is not open-ended; it descends to differentiability and boundedness of the exposure map and the retained medium tensor row.

## Axial Octahedral Specialization

For the rigid octahedral axial source row,

$$
Z_B^{ab}
=
\zeta_{\delta Z}\varepsilon A^{ab},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812.
$$

The relaxed response object emits

$$
M_B^{ab}
=
-r_{ZM}\zeta_{\delta Z}\varepsilon A^{ab}.
$$

The extracted medium coefficient is

$$
\mu_K
=
\frac{3}{2\varepsilon}A_{ab}M_B^{ab}
=
-r_{ZM}\zeta_{\delta Z}
=
0.000680152657812\,r_{ZM}.
$$

The axial residual becomes

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_K
\right)
\varepsilon A^{ij}
=0
$$

for $\lambda_M\ne0$ and $r_{ZM}=\lambda_Z/\lambda_M$.

## Decision

This packet upgrades the retained candidate from a coefficient target to a conditional response object:

$$
\boxed{
\mathcal M_{\mathrm{resp}}^{\square}
=
-
\alpha_M r_{ZM}D_YZ_B^{*}
\left(
M_B+r_{ZM}Z_B
\right).
}
$$

The metric-cancellation route now has three mathematical closures:

1. the isotropic tensor direction is unique up to $\kappa_Z$;
2. the axial residual closes iff $\kappa_Z=-r_{ZM}$;
3. the completed-square block emits an exact variational response object, with force row given by the adjoint derivative of the branch exposure map.

The remaining blocker is concrete rather than conceptual: compute or bound $D_YZ_B$ and its adjoint on the same root-regular octahedral branch ledger. If that derivative is support-complete and bounded, this candidate reaches `medium-response-admissible` for the trace-free block. If the derivative is singular, support-incomplete, or not retained, the candidate fails as `medium-response-object-not-retained`.

## Promotion Decision

This packet remains `priority-only`. It is not promoted into the corpus because it depends on diagnostic octahedral priority rows and an unproved retained exposure derivative. Its durable theory advance is the explicit response-object formula above.
