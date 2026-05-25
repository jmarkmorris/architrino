# Axial Noether Sea Cancellation

Promotion status: `priority-only`.

This packet consumes [axial-response-adm-projection](axial-response-adm-projection.md) and states the Noether sea response needed to cancel the axial trace-free root-ledger geometry. It uses the existing medium-response rule that a Noether sea term must be a declared constitutive response with symmetry and preferred-orientation residuals, not an empirical correction.

## Input Residual

The octahedral root-ledger response supplies the axial tensor

$$
A^{ij}
=
n^in^j-\frac13h^{ij},
\qquad
n=\frac1{\sqrt3}(1,1,1),
$$

and

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ij}
=
\zeta_{\delta Z}\varepsilon A^{ij},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812.
$$

The observer projection has the trace-free residual

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_{\mathrm{sea}}
\right)
\varepsilon A^{ij}.
$$

Here $\lambda_Z$ is the projection coefficient that maps exposure anisotropy into the observer spatial metric, $\lambda_M$ is the projection coefficient for the Noether sea medium-response tensor, and $\mu_{\mathrm{sea}}$ is the branch-axis trace-free medium-response amplitude.

## Scalar-Only Noether Sea Response Is Insufficient

If the Noether sea response near the branch is scalar-only, then

$$
\delta\mathcal M_{\mathrm{sea}}^{ij}
=
\delta\mathcal M_0 h^{ij},
\qquad
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ij}=0.
$$

Therefore

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}.
$$

Since $\zeta_{\delta Z}\ne0$, isotropic observer geometry is rejected unless

$$
\lambda_Z=0.
$$

This is the first concrete no-go branch of the geometry bridge:

$$
\boxed{
\text{scalar-only medium response}
\quad\Longrightarrow\quad
\text{axial leakage if }\lambda_Z\ne0.
}
$$

The scalar period response and the scalar Weyl-versus-dynamical residual cannot see this failure because $h_{ij}A^{ij}=0$.

## Tensorial Cancellation Law

If the Noether sea response retains a trace-free tensor channel along the branch axis, write

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ij}
=
\mu_{\mathrm{sea}}\varepsilon A^{ij}.
$$

Then axial observer isotropy requires

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

Equivalently, if the medium response is written as a linear susceptibility to the root-ledger exposure anisotropy,

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ij}
=
\kappa_{\mathrm{sea},Z}
\delta\mathcal Z_{\mathrm{oct,tf}}^{ij},
$$

then

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z+\lambda_M\kappa_{\mathrm{sea},Z}
\right)
\zeta_{\delta Z}\varepsilon A^{ij},
$$

so cancellation requires

$$
\boxed{
\kappa_{\mathrm{sea},Z}
=
-
\frac{\lambda_Z}{\lambda_M}.
}
$$

The branch supplies the orientation $n$; the medium response does not get to introduce a free preferred direction. Its admissible tensor channel is the same trace-free direction already emitted by the branch response.

## Directional Probe Form

The medium-response tensor probe uses directional trace-free channels

$$
E_{\hat e}^{ij}
=
\hat e^i\hat e^j-\frac13h^{ij}.
$$

For the branch axis $\hat e=n$,

$$
E_n^{ij}=A^{ij},
\qquad
A_{ij}A^{ij}=\frac23.
$$

Thus a directional Noether sea probe along the branch axis records

$$
\delta\mathcal M_2(n)
=
A_{ij}\delta\mathcal M_{\mathrm{sea,tf}}^{ij}
=
\frac23\mu_{\mathrm{sea}}\varepsilon.
$$

The cancellation target in directional-probe variables is therefore

$$
\boxed{
\delta\mathcal M_2(n)
=
-
\frac23
\frac{\lambda_Z}{\lambda_M}
\zeta_{\delta Z}
\varepsilon.
}
$$

This gives the exact branch-local tensor probe target. A medium-response run does not need to recover all five trace-free tensor directions to test this axial cancellation row. It needs the branch-axis directional channel and the projection ratio $\lambda_Z/\lambda_M$.

## Closure Classification

| Medium-response model | Axial result |
| --- | --- |
| scalar-only response, $\lambda_Z\ne0$ | `rejected: axial leakage` |
| scalar-only response, $\lambda_Z=0$ | `nonmetric exposure channel`; $\mathcal Z_{\mathrm{tf}}$ is projected out and must remain branch data |
| tensorial response with $\lambda_M\ne0$ | `closed iff` $\mu_{\mathrm{sea}}=-(\lambda_Z/\lambda_M)\zeta_{\delta Z}$ |
| tensorial susceptibility response | `closed iff` $\kappa_{\mathrm{sea},Z}=-\lambda_Z/\lambda_M$ |

## Theory Consequence

The geometry bridge now has a falsifiable branch-local split:

$$
\text{root-ledger anisotropy}
\longrightarrow
\begin{cases}
\text{observer anisotropy}, & \text{if medium cancellation fails},\\
\text{isotropic observer geometry}, & \text{if medium cancellation hits the scalar coefficient},\\
\text{nonmetric branch data}, & \text{if }\lambda_Z=0.
\end{cases}
$$

This is stronger than a future requirement. It is the explicit algebraic closure condition that the Noether sea constitutive response must satisfy for the first root-ledger geometry response to be compatible with isotropic weak-field observer geometry.
