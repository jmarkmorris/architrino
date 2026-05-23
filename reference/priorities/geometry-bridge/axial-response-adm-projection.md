# Axial Response ADM Projection

Promotion status: `priority-only`.

This packet consumes the root-ledger response from [specific-branch-response-closure](specific-branch-response-closure.md) and states the first observer-projection consequence. The key point is that the octahedral response is trace-free:

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\varepsilon
\left(
n^an^b-\frac13h^{ab}
\right),
\qquad
\zeta_{\delta Z}\approx-0.0006801526578,
\qquad
n=\frac1{\sqrt3}(1,1,1).
$$

It therefore does not enter the scalar weak-field equality

$$
\mathcal{R}_{\mathrm{Weyl=dyn},B}
=
\delta N+\frac16h^{ij}\delta\gamma_{ij}.
$$

That residual sees only the lapse perturbation and the trace of the spatial metric perturbation. The axial response instead enters the trace-free spatial projection.

## Projection Split

Let the geometry-export packet feed an observer spatial metric perturbation through a local constitutive projection

$$
\delta\gamma_{ij}
=
\mathcal P_Q[\delta Q]_{ij}
+
\mathcal P_Z[\delta\mathcal Z]_{ij}
+
\mathcal P_M[\delta\mathcal M_{\mathrm{sea}}]_{ij}
+
\mathcal P_{\mathrm{iso}}[\delta\ln T,\delta N]_{ij}.
$$

Split this into trace and trace-free parts:

$$
\delta\gamma_{ij}
=
\frac13h_{ij}h^{kl}\delta\gamma_{kl}
+
\Pi_{\mathrm{tf}}\delta\gamma_{ij}.
$$

The scalar weak-field residual is

$$
\boxed{
\mathcal{R}_{\mathrm{Weyl=dyn},B}
=
\delta N+\frac16h^{ij}\delta\gamma_{ij}.
}
$$

The axial root-ledger response requires an additional trace-free leakage residual:

$$
\boxed{
\mathcal R_{\mathrm{ax},B}^{ij}
=
\Pi_{\mathrm{tf}}\delta\gamma^{ij}.
}
$$

An isotropic weak-field observer geometry requires

$$
\mathcal R_{\mathrm{ax},B}^{ij}=0
$$

in addition to the scalar Weyl-versus-dynamical-potential row.

## Single-Axis Closure Equation

For the certified octahedral root-ledger response, cyclic symmetry reduces the trace-free projection to one scalar along

$$
A^{ij}=n^in^j-\frac13h^{ij}.
$$

Write the trace-free projection constants on this axis as

$$
\Pi_{\mathrm{tf}}\mathcal P_Z[\delta\mathcal Z]^{ij}
=
\lambda_Z\,\zeta_{\delta Z}\varepsilon A^{ij},
$$

and

$$
\Pi_{\mathrm{tf}}\mathcal P_M[\delta\mathcal M_{\mathrm{sea}}]^{ij}
=
\lambda_M\,\mu_{\mathrm{sea}}\varepsilon A^{ij}.
$$

Here $\lambda_Z$ and $\lambda_M$ are observer-projection coefficients, while $\mu_{\mathrm{sea}}$ is the axial Noether-Sea medium-response amplitude along the same branch axis. Then the axial residual is the scalar equation

$$
\boxed{
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_{\mathrm{sea}}
\right)
\varepsilon A^{ij}.
}
$$

Thus the cancellation condition is

$$
\boxed{
\mu_{\mathrm{sea}}
=
-
\frac{\lambda_Z}{\lambda_M}
\zeta_{\delta Z}
}
\qquad
(\lambda_M\ne0).
$$

If $\lambda_M=0$ and $\lambda_Z\ne0$, the rigid octahedral root-ledger response is incompatible with an isotropic weak-field spatial metric under this projection:

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}
\ne0.
$$

If $\lambda_Z=0$, the observer projection discards this exposure tensor from $\gamma_{ij}$; then the root-ledger axial response must still be tracked as hidden or nonmetric branch data rather than silently treated as metric geometry.

## Consequence For The Geometry Bridge

The scalar period response and interface displacement can look isotropic while the spatial-compliance export is not:

$$
\delta\ln T_{\mathrm{oct,root}}
=
0.8460213966\,\varepsilon,
\qquad
\delta s_X
\propto
\langle1/J\rangle_{\mathrm{oct}},
$$

but

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
\ne0.
$$

Therefore the geometry bridge cannot use only a scalar lapse or period row. It must carry both residuals:

$$
\boxed{
\mathcal{R}_{\mathrm{scalar},B}
=
\delta N+\frac16h^{ij}\delta\gamma_{ij},
\qquad
\mathcal R_{\mathrm{ax},B}^{ij}
=
\Pi_{\mathrm{tf}}\delta\gamma^{ij}.
}
$$

This is the main closure advance of the packet. It separates two questions that were previously mixed:

1. scalar weak-field potential matching, controlled by trace/lapse response;
2. axial preferred-frame or shear leakage, controlled by trace-free exposure and Noether-Sea medium response.

## Status

| Row | Status | Meaning |
| --- | --- | --- |
| scalar Weyl-versus-dynamical residual | `projection-split` | trace/lapse matching is separate from axial shear leakage |
| axial leakage residual | `equation-closed` | $\mathcal R_{\mathrm{ax},B}^{ij}=(\lambda_Z\zeta_{\delta Z}+\lambda_M\mu_{\mathrm{sea}})\varepsilon A^{ij}$ |
| Noether-Sea cancellation amplitude | `solved-symbolically` | $\mu_{\mathrm{sea}}=-(\lambda_Z/\lambda_M)\zeta_{\delta Z}$ when $\lambda_M\ne0$ |
| isotropic observer-geometry claim from root ledger alone | `rejected-unless-cancelled` | nonzero $\zeta_{\delta Z}$ creates trace-free leakage if the projection consumes $\mathcal Z_{\mathrm{tf}}$ without cancellation |

This packet remains `priority-only` because $\lambda_Z$, $\lambda_M$, and the Noether-Sea constitutive response are not yet derived from a retained dynamics/action branch. The branch-local mathematical consequence is closed: a nonzero trace-free root response must either be canceled by medium response, projected out with justification, or carried as an observer-facing anisotropy residual.
