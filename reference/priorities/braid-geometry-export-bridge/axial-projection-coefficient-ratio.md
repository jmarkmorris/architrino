# Axial Projection Coefficient Ratio

Promotion status: `priority-only`.

This packet consumes [axial-noether-sea-cancellation](axial-noether-sea-cancellation.md) and sharpens the remaining coefficient question. The previous packet derived the axial residual

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_{\mathrm{sea}}
\right)
\varepsilon A^{ij},
$$

where

$$
A^{ij}=n^in^j-\frac13h^{ij},
\qquad
n=\frac1{\sqrt3}(1,1,1),
\qquad
\zeta_{\delta Z}\approx-0.000680152657812.
$$

The question is whether existing ADM/Cartan, mass-map, or Noether sea constitutive material fixes the ratio $\lambda_Z/\lambda_M$. The answer is narrower and more useful: the existing corpus fixes the tensor basis and the directional medium readout, but it does not fix a numerical ratio. Axial cancellation identifies only one scalar combination unless the projection map supplies an independent calibration for the exposure and medium-response channels.

## Source Status

The ADM/Cartan reconstruction surface in [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) already states that the observer spatial-compliance metric is a constitutive channel,

$$
\gamma_{ij}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\sigma^{\mathrm{tf}}_{ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}).
$$

This fixes the role of a trace-free spatial-compliance source $\sigma^{\mathrm{tf}}_{ij}$, but it does not identify $\sigma^{\mathrm{tf}}_{ij}$ uniquely with $\delta\mathcal Z_{\mathrm{tf}}$, $\delta\mathcal M_{\mathrm{sea,tf}}$, or a particular linear combination of them.

The mass-map tensor probe in [$A_0$ Medium-Response Tensor Probe](../braid-mass-response-map/a0-medium-response-tensor-probe.md) fixes the directional readout

$$
\delta\mathcal{M}_{2}(\hat e)
=
E_{\hat e,ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab},
\qquad
E_{\hat e}^{ab}
=
\hat e^a\hat e^b-\frac13h^{ab}.
$$

For the geometry-bridge axis $\hat e=n$, this becomes a definite scalar probe of the same tensor direction $A^{ij}$. It still does not set $\lambda_M$ relative to $\lambda_Z$.

The pressure and medium-response priority packets provide candidate constitutive rows for $\mathcal{M}_{\text{sea}}^{ab}$ and require shared-record, symmetry, and passivity accounting. They do not supply a branch-derived value or sign for the axial coefficient needed here.

## Identifiability Lemma

**Lemma.** Assume the trace-free observer projection on the octahedral axial subspace has the form

$$
\Pi_{\mathrm{tf}}\delta\gamma^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_{\mathrm{sea}}
\right)
\varepsilon A^{ij},
\qquad
\lambda_M\ne0.
$$

Then isotropic observer geometry fixes only the ratio

$$
r_{ZM}\equiv\frac{\lambda_Z}{\lambda_M}
$$

and the projected medium amplitude

$$
m_{\mathrm{ax}}\equiv\lambda_M\mu_{\mathrm{sea}}.
$$

It does not separately identify $\lambda_Z$, $\lambda_M$, and $\mu_{\mathrm{sea}}$ from the axial cancellation row alone.

**Proof.** The condition $\Pi_{\mathrm{tf}}\delta\gamma^{ij}=0$ is equivalent, because $A^{ij}\ne0$ and $\varepsilon$ is the probe amplitude, to the single scalar equation

$$
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_{\mathrm{sea}}
=0.
$$

For $\lambda_M\ne0$, this is

$$
\mu_{\mathrm{sea}}
=
-r_{ZM}\zeta_{\delta Z}.
$$

Equivalently, in projected metric units,

$$
\boxed{
m_{\mathrm{ax}}
=
-\lambda_Z\zeta_{\delta Z}.
}
$$

No second independent equation appears in the axial residual. Therefore the cancellation row determines the product or ratio, not the three factors separately.

## Normalized Cancellation Target

The practical geometry-bridge target should be stated in projection units. Define the projected trace-free source amplitudes

$$
z_{\mathrm{ax}}\equiv\lambda_Z\zeta_{\delta Z},
\qquad
m_{\mathrm{ax}}\equiv\lambda_M\mu_{\mathrm{sea}}.
$$

Then the exact closure condition is the anti-alignment row

$$
\boxed{
m_{\mathrm{ax}}=-z_{\mathrm{ax}}.
}
$$

If the medium-response amplitude is kept in the mass-map normalization, retain the one scalar ratio

$$
\boxed{
\mu_{\mathrm{sea}}^{\mathrm{req}}
=
-r_{ZM}\zeta_{\delta Z}
=
0.000680152657812\,r_{ZM}.
}
$$

This is the strongest current form. It replaces the unclear request for two projection coefficients with one observable projection ratio and one required branch-axis medium response.

## Directional-Probe Form

The mass-map tensor probe already supplies the branch-axis directional channel. Since

$$
A_{ij}A^{ij}=\frac23,
$$

and

$$
\delta\mathcal M_{\mathrm{sea,tf}}^{ij}
=
\mu_{\mathrm{sea}}\varepsilon A^{ij},
$$

the directional response along $n$ is

$$
\delta\mathcal M_2(n)
=
A_{ij}\delta\mathcal M_{\mathrm{sea,tf}}^{ij}
=
\frac23\mu_{\mathrm{sea}}\varepsilon.
$$

Therefore the branch-axis cancellation target in mass-map probe variables is

$$
\boxed{
\delta\mathcal M_2^{\mathrm{req}}(n)
=
-\frac23 r_{ZM}\zeta_{\delta Z}\varepsilon
=
0.000453435105208\,r_{ZM}\varepsilon.
}
$$

A medium-response simulation does not need to reconstruct all five trace-free tensor directions before testing this row. It must at least report the directional channel $\delta\mathcal M_2(n)$ for the same branch-axis record.

## Same-Units Specialization

There is one clean specialization, but it is a normalization choice until a retained branch derives it. If the ADM/Cartan projection treats $\delta\mathcal Z_{\mathrm{tf}}$ and $\delta\mathcal M_{\mathrm{sea,tf}}$ as already expressed in the same spatial-compliance source units, then

$$
r_{ZM}=1.
$$

The cancellation target becomes

$$
\boxed{
\mu_{\mathrm{sea}}^{\mathrm{req}}
=
0.000680152657812,
\qquad
\delta\mathcal M_2^{\mathrm{req}}(n)
=
0.000453435105208\,\varepsilon.
}
$$

Equivalently, in susceptibility form

$$
\delta\mathcal M_{\mathrm{sea,tf}}^{ij}
=
\kappa_{\mathrm{sea},Z}\delta\mathcal Z_{\mathrm{oct,tf}}^{ij},
$$

the same-units cancellation target is

$$
\boxed{
\kappa_{\mathrm{sea},Z}=-1.
}
$$

This should not be read as a derived medium law. It is the normalized closure value that a same-units projection must hit.

## Sign Consequence

Because $\zeta_{\delta Z}<0$, a positive projection ratio requires a positive branch-axis medium response under the positive isotropic support probe:

$$
r_{ZM}>0
\quad\Longrightarrow\quad
\mu_{\mathrm{sea}}^{\mathrm{req}}>0,
\qquad
\delta\mathcal M_2^{\mathrm{req}}(n)>0.
$$

If a future Noether sea constitutive row forces $\mu_{\mathrm{sea}}\le0$ for this branch and probe sign while $r_{ZM}>0$, then the axial trace-free response cannot be canceled. The branch must then be classified as observer-anisotropic or as nonmetric exposure data with $\lambda_Z=0$. The current source material does not derive such a sign law.

## Closure Classification

| Projection case | Result |
| --- | --- |
| $\lambda_M\ne0$ | axial closure depends only on $r_{ZM}$ and requires $\mu_{\mathrm{sea}}=-r_{ZM}\zeta_{\delta Z}$ |
| same spatial-compliance source units | normalized target $\mu_{\mathrm{sea}}=0.000680152657812$ and $\kappa_{\mathrm{sea},Z}=-1$ |
| $\lambda_Z=0$ | root-ledger exposure anisotropy is projected out of $\gamma_{ij}$ and must remain nonmetric branch data |
| $\lambda_M=0,\lambda_Z\ne0$ | scalar or absent medium response cannot cancel the axial residual |
| $r_{ZM}>0$ with $\mu_{\mathrm{sea}}\le0$ forced by a future constitutive law | isotropic observer geometry fails for this branch-axis channel |

## Promotion Decision

This packet remains `priority-only`. It is solid enough to guide the geometry bridge but not yet reader-facing corpus material because it depends on a priority-side root-ledger response and on an undeclared ADM/Cartan calibration for $\delta\mathcal Z_{\mathrm{tf}}$ versus $\delta\mathcal M_{\mathrm{sea,tf}}$.

The theory advance is complete at priority level: the open coefficient problem has been reduced to one scalar ratio and one directional medium-response target. The next mathematical packet should not add a new gate. It should attempt the direct branch-axis realization:

$$
\delta\mathcal M_2(n)
\stackrel{?}{=}
0.000453435105208\,r_{ZM}\varepsilon
$$

from an existing or newly derived Noether sea constitutive row on the same branch-axis record.
