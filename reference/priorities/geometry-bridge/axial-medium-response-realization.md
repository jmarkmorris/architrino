# Axial Medium-Response Realization

Promotion status: `priority-only`.

This packet consumes [axial-projection-coefficient-ratio](axial-projection-coefficient-ratio.md), the pressure-side Noether sea tensor scaffold in [Pressure-Dependent Noether sea Constitutive Response Near Atoms](../mass-map/pressure-dependent-noether-sea-constitutive-response.md), and the projected tensor split in [Pressure Response Coefficient Closure](../mass-map/pressure-response-coefficient-closure.md). It derives the first direct realization equation for the axial Noether sea response needed by the geometry bridge.

The normalized branch-axis target from the projection-ratio packet is

$$
\mu_{\mathrm{sea}}^{\mathrm{req}}
=
0.000680152657812\,r_{ZM},
\qquad
r_{ZM}=\frac{\lambda_Z}{\lambda_M}.
$$

Equivalently,

$$
\delta\mathcal M_2^{\mathrm{req}}(n)
=
0.000453435105208\,r_{ZM}\varepsilon.
$$

The question here is what an existing Noether sea constitutive row would have to emit to meet that target.

## Input Constitutive Row

The pressure-response packet proposes the tensor handoff

$$
\mathcal{M}_{\text{sea}}^{ab}(\mathbf{x},t)
=
\frac{\chi_{\text{sea}}^2}{c_f^2}
\left(
h^{ab}
+m_S S_{\mathrm{dev}}^{ab}
\right)
+\mathcal{R}_{\mathcal{M}}^{ab}.
$$

The pressure coefficient closure expands the corresponding dimensionless tensor residual as

$$
\Delta_{\mathcal M}^{ab}
=
2\,\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}\,h^{ab}
+2\,\delta\ln\chi_{\text{sea}}^{\mathrm{aniso}}\,Q_{\chi}^{ab}
+m_SS_{\mathrm{dev}}^{ab}
+\mathcal{R}_{\mathcal M,\Delta}^{ab}
$$

to first order, where $Q_{\chi}^{ab}$ is the declared trace-free delay-anisotropy projection. The mass-map tensor probe measures this same dimensionless perturbation

$$
\Delta_{\mathcal M}^{ab}
\equiv
c_{\text{eff},0}^2
\left(
\mathcal{M}_{\text{sea}}^{ab}
-
\frac{h^{ab}}{c_{\text{eff},0}^2}
\right),
$$

with trace-free part

$$
\delta\mathcal M_{\mathrm{tf}}^{ab}
=
\left(
\delta^a{}_c\delta^b{}_d
-
\frac13h^{ab}h_{cd}
\right)
\Delta_{\mathcal M}^{cd}.
$$

Near the homogeneous reference cell, $c_{\text{eff},0}=c_f$ and $\chi_{\text{sea}}=1+O(\varepsilon)$. The isotropic part of the scalar factor $\chi_{\text{sea}}^2$ multiplies $h^{ab}$ at first order and therefore contributes only to the trace. The anisotropic delay projection remains trace-free. The trace-free first-order response is

$$
\boxed{
\delta\mathcal M_{\mathrm{tf}}^{ab}
=
2\,\delta\ln\chi_{\text{sea}}^{\mathrm{aniso}}\,Q_{\chi}^{ab}
+
m_S S_{\mathrm{dev}}^{ab}
+
\mathcal{R}_{\mathcal M,\mathrm{tf}}^{ab}
+O(\varepsilon^2).
}
$$

Thus the existing constitutive scaffold can cancel the octahedral axial exposure only through a trace-free anisotropic delay channel, its deviatoric strain channel, or an explicitly retained trace-free residual. Isotropic density and isotropic delay changes alone cannot do it.

## Branch-Axis Tensor Scalars

Use the same axial tensor as the root-ledger response,

$$
A^{ab}=n^an^b-\frac13h^{ab},
\qquad
A_{ab}A^{ab}=\frac23.
$$

Decompose the trace-free delay projection, trace-free strain, and trace-free residual into the branch-axis component plus orthogonal trace-free components:

$$
\delta\ln\chi_{\text{sea}}^{\mathrm{aniso}}Q_{\chi}^{ab}
=
q_{\chi A}\varepsilon A^{ab}
+
Q_{\chi,\perp}^{ab},
\qquad
A_{ab}Q_{\chi,\perp}^{ab}=0,
$$

$$
S_{\mathrm{dev}}^{ab}
=
s_A\varepsilon A^{ab}
+
S_{\perp}^{ab},
\qquad
A_{ab}S_{\perp}^{ab}=0,
$$

and

$$
\mathcal{R}_{\mathcal M,\mathrm{tf}}^{ab}
=
\rho_A\varepsilon A^{ab}
+
\mathcal{R}_{\perp}^{ab},
\qquad
A_{ab}\mathcal{R}_{\perp}^{ab}=0.
$$

The medium-response amplitude along the geometry-bridge axis is therefore

$$
\boxed{
\mu_{\mathrm{sea}}
=
2q_{\chi A}
+
m_Ss_A+\rho_A.
}
$$

The directional mass-map probe reads

$$
\delta\mathcal M_2(n)
=
A_{ab}\delta\mathcal M_{\mathrm{tf}}^{ab}
=
\frac23
\left(
2q_{\chi A}
+
m_Ss_A+\rho_A
\right)
\varepsilon.
$$

## Realization Equation

Combining the constitutive row with the projection-ratio target gives the direct branch-axis realization condition

$$
\boxed{
2q_{\chi A}
+
m_Ss_A+\rho_A
=
0.000680152657812\,r_{ZM}.
}
$$

Equivalently,

$$
\boxed{
\frac{\delta\mathcal M_2(n)}{\varepsilon}
=
\frac23
\left(
2q_{\chi A}
+
m_Ss_A+\rho_A
\right)
=
0.000453435105208\,r_{ZM}.
}
$$

This is a real closure reduction. The axial cancellation no longer floats as an abstract medium-response coefficient. In the existing pressure tensor scaffold it is the sum of the branch-axis anisotropic delay scalar $2q_{\chi A}$, the deviatoric strain product $m_Ss_A$, and any explicitly retained trace-free tensor residual $\rho_A$.

## Minimal No-Go Corollaries

If the branch-preserving Noether sea response is scalar-only in this scaffold, then

$$
q_{\chi A}=0,
\qquad
s_A=0,
\qquad
\rho_A=0,
$$

and therefore

$$
\mu_{\mathrm{sea}}=0.
$$

For $\lambda_Z\ne0$ this cannot cancel the nonzero octahedral axial response, because $\zeta_{\delta Z}\ne0$.

If the scaffold admits trace-free tensor channels but their branch-axis components vanish,

$$
q_{\chi A}=0,
\qquad
s_A=0,
$$

then cancellation requires the residual itself to carry the full axial response,

$$
\rho_A
=
0.000680152657812\,r_{ZM}.
$$

That is not a closure unless $\mathcal{R}_{\mathcal M,\mathrm{tf}}^{ab}$ is upgraded from an unexplained remainder into a declared Noether sea response row with the same ledger discipline as the rest of the medium-response packet.

If the residual is controlled below the axial target,

$$
|\rho_A|
\ll
0.000680152657812\,|r_{ZM}|,
$$

then the retained trace-free tensor channels must satisfy

$$
\boxed{
2q_{\chi A}
+
m_Ss_A
\approx
0.000680152657812\,r_{ZM}
}
$$

or, when the anisotropic delay component is also controlled below target,

$$
\boxed{
s_A
\approx
\frac{0.000680152657812\,r_{ZM}}{m_S}
}
\qquad
(m_S\ne0).
$$

Thus a future branch calculation can close or reject the axial bridge by extracting the branch-axis tensor coefficients on the same record: $q_{\chi A}$, $m_S$, and $s_A$, with $\rho_A$ controlled as a declared residual.

## Sign Consequence

For $r_{ZM}>0$ and small $\rho_A$, the trace-free tensor sum must be positive:

$$
2q_{\chi A}+m_Ss_A>0.
$$

If the anisotropic delay component is negligible and the constitutive response derives $m_S>0$, then the branch must produce a positive branch-axis deviatoric strain scalar. If it derives $m_S<0$, the branch must produce a negative one. If a retained Noether sea row fixes the opposite sign of the full sum, the axial root-ledger geometry cannot become isotropic observer geometry through this tensor scaffold.

## Same-Units Reference Value

Under the same spatial-compliance source-unit specialization $r_{ZM}=1$ and with controlled residual $\rho_A\approx0$, the required trace-free tensor sum is

$$
\boxed{
2q_{\chi A}
+
m_Ss_A
\approx
0.000680152657812.
}
$$

The corresponding directional probe target is

$$
\boxed{
\frac{\delta\mathcal M_2(n)}{\varepsilon}
\approx
0.000453435105208.
}
$$

These are not fitted observer numbers. They are the first branch-axis tensor-response values implied by the certified octahedral causal-root geometry export if that export is consumed by the observer spatial-compliance map.

## Closure Classification

| Constitutive case | Geometry-bridge result |
| --- | --- |
| isotropic density/delay response only | cannot cancel axial exposure for $\lambda_Z\ne0$ |
| anisotropic delay or deviatoric strain channel present | closes iff $2q_{\chi A}+m_Ss_A+\rho_A=0.000680152657812\,r_{ZM}$ |
| controlled trace-free residual $\rho_A\approx0$ | direct tensor target $2q_{\chi A}+m_Ss_A\approx0.000680152657812\,r_{ZM}$ |
| branch-axis anisotropic-delay and strain components absent but residual retained | residual must become a declared tensor response row, not an unexplained remainder |
| opposite sign of $2q_{\chi A}+m_Ss_A+\rho_A$ | isotropic observer-geometry closure fails for $r_{ZM}>0$ |

## Promotion Decision

This packet remains `priority-only`. It depends on priority-side pressure/strain constitutive material and on a root-ledger response that is not yet a retained dynamics branch.

The theory advance is nevertheless concrete: the Noether sea cancellation is now expressible as a branch-axis tensor-response equation. The next calculation should extract or bound $q_{\chi A}$ and $s_A$ from the geometry-export/interface variation and $m_S$ from a branch-derived Noether sea tensor response, rather than adding another validation gate.
