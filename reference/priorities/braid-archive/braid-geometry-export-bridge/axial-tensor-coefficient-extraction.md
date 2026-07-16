# Axial Tensor Coefficient Extraction

Promotion status: `priority-only`.

This packet consumes [axial-medium-response-realization](axial-medium-response-realization.md) and closes the algebraic extraction step. The pressure split

$$
2q_{\chi A}+m_Ss_A+\rho_A
$$

explains possible mechanisms inside the Noether sea tensor response, but the geometry bridge does not need those mechanism coefficients separately to test observer-geometry closure. It needs the branch-exported axial coefficient of $\delta\mathcal M_{\mathrm{sea,tf}}^{ab}$.

## Direct Extraction From The Geometry Export

Let the geometry-export packet emit the trace-free medium-response row

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}.
$$

For the octahedral axial tensor

$$
A^{ab}=n^an^b-\frac13h^{ab},
\qquad
A_{ab}A^{ab}=\frac23,
$$

define the exported axial medium coefficient

$$
\boxed{
\mu_K
\equiv
\frac{3}{2\varepsilon}
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}.
}
$$

Equivalently, the mass-map directional channel is

$$
\delta\mathcal M_2(n)
=
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
\frac23\mu_K\varepsilon.
$$

Thus $\mu_K$ is the only medium-response scalar the axial ADM/Cartan closure row needs from the branch-local export.

## Mechanism Decomposition

If the Noether sea tensor response is supplied through the pressure/strain scaffold, then [axial-medium-response-realization](axial-medium-response-realization.md) gives

$$
\mu_K
=
2q_{\chi A}+m_Ss_A+\rho_A.
$$

This is a mechanism decomposition of the same exported coefficient. It should not be treated as three new observer-level fit knobs. The closure consumer sees $\mu_K$.

## Extraction Theorem

**Theorem target.** On a branch chart whose geometry export emits $\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}$ in the same branch-axis convention as $\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}$, the first-order axial observer-geometry closure condition is

$$
\boxed{
\mu_K
=
-r_{ZM}\zeta_{\delta Z}
=
0.000680152657812\,r_{ZM}.
}
$$

Equivalently,

$$
\boxed{
\frac{1}{\varepsilon}
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
0.000453435105208\,r_{ZM}.
}
$$

**Proof.** The axial projection residual is

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_K
\right)
\varepsilon A^{ij}.
$$

For $\lambda_M\ne0$, $\mathcal R_{\mathrm{ax},B}^{ij}=0$ is equivalent to

$$
\mu_K
=
-\frac{\lambda_Z}{\lambda_M}\zeta_{\delta Z}
=
-r_{ZM}\zeta_{\delta Z}.
$$

Substituting $\zeta_{\delta Z}\approx-0.000680152657812$ gives the displayed coefficient. Contracting with $A_{ij}$ gives the directional form because $A_{ij}A^{ij}=2/3$.

## What The Current Octahedral Packet Supplies

The certified octahedral root-ledger response currently supplies

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\varepsilon A^{ab},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812.
$$

It does not yet supply a retained value of

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}.
$$

Therefore the current octahedral response is not an isotropic observer-geometry closure. It is a source-side axial exposure coefficient plus a precise medium-response target.

If the export declares

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}=0
$$

for this branch and probe, then

$$
\mu_K=0
$$

and the axial residual becomes

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}.
$$

For $\lambda_Z\ne0$, this is a nonzero trace-free observer anisotropy. For $\lambda_Z=0$, the exposure tensor is not consumed by the observer spatial-compliance metric and remains nonmetric branch data.

## Same-Units Reference

Under the same spatial-compliance source-unit specialization $r_{ZM}=1$, the extraction target is

$$
\boxed{
\mu_K
=
0.000680152657812,
\qquad
\frac{1}{\varepsilon}
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
0.000453435105208.
}
$$

The corresponding pressure/strain mechanism condition is

$$
\boxed{
2q_{\chi A}+m_Ss_A+\rho_A
=
0.000680152657812.
}
$$

## Closure Classification

| Export state | Axial result |
| --- | --- |
| $\mu_K=0,\lambda_Z\ne0$ | observer anisotropy remains |
| $\mu_K=0,\lambda_Z=0$ | exposure response is nonmetric branch data |
| $\mu_K=0.000680152657812\,r_{ZM}$ | axial trace-free observer metric closes at first order |
| $\mu_K$ has the opposite sign for $r_{ZM}>0$ | isotropic observer geometry fails |
| $\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}$ not emitted | current packet is a source-side geometry response, not a metric closure |

## Promotion Decision

This packet remains `priority-only`. It is a theorem target because the octahedral root-ledger packet is not a retained dynamics branch and the projection ratio is not independently calibrated.

The durable theory advance is the extraction formula

$$
\mu_K
=
\frac{3}{2\varepsilon}
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}.
$$

It turns the remaining geometry-bridge question into one branch-local tensor coefficient. Future work should populate that coefficient from a retained Noether sea response row or explicitly classify the octahedral axial exposure as nonmetric branch data.
