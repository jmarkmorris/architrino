# Specific Branch Medium-Response Row

Promotion status: `priority-only`.

This packet consumes [axial-tensor-coefficient-extraction](axial-tensor-coefficient-extraction.md) and classifies the current rigid octahedral source row. The branch-exported medium coefficient is

$$
\mu_K
=
\frac{3}{2\varepsilon}
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab},
\qquad
A^{ab}=n^an^b-\frac13h^{ab}.
$$

The axial closure target is

$$
\mu_K
=
0.000680152657812\,r_{ZM},
\qquad
r_{ZM}=\frac{\lambda_Z}{\lambda_M}.
$$

The rigid octahedral root-ledger packet supplies the source-side exposure response

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\varepsilon A^{ab},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812,
$$

but it does not supply a retained Noether sea medium-response row.

## Source-Only Export Convention

The current fixed-speed rigid octahedral row is a source-side root-ledger geometry calculation. It includes the causal-root exposure tensor $\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}$ and the scalar rows $\delta\ln T_{\mathrm{oct,root}}$ and $\langle1/J\rangle_{\mathrm{oct}}$. It does not emit a declared response object for $\mathcal M_{\mathrm{sea}}^{ab}$.

The medium-response admissibility rule is stricter than a fit convention: a Noether sea response term may enter only through a declared response object, memory row, energy and momentum exchange ledger, isotropy or preferred-orientation residual, and combined action/Noether accounting. The current $M=3$ exact-antipodal rows are explicitly medium-response-open and do not include such a row.

Therefore there are two honest interpretations:

1. **Source-only diagnostic export.** Declare the missing medium tensor row to be zero for the diagnostic:

   $$
   \Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}=0,
   \qquad
   \mu_K=0.
   $$

2. **No metric-closure export.** If the row is not declared zero, then $\mu_K$ is not emitted and the branch cannot claim axial metric closure.

The raw current row is therefore `medium-row-not-emitted`. The source-only zero row below is an explicit diagnostic restriction:

$$
\text{source-only diagnostic}
\quad\Longleftrightarrow\quad
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}:=0.
$$

It is not a derived homogeneous-medium theorem and it is not a hidden cancellation. Its purpose is to decide what the already computed root-ledger exposure does by itself.

## Axial Residual With $\mu_K=0$

The axial ADM/Cartan residual is

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

Substituting the source-only row gives

$$
\boxed{
\mathcal R_{\mathrm{ax,source}}^{ij}
=
\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}.
}
$$

Since $\zeta_{\delta Z}\ne0$ and $A^{ij}\ne0$, the source-only row is isotropic in the observer spatial metric if and only if

$$
\boxed{
\lambda_Z=0.
}
$$

The branch-axis scalar residual is

$$
\frac{1}{\varepsilon}
A_{ij}\mathcal R_{\mathrm{ax,source}}^{ij}
=
\frac23\lambda_Z\zeta_{\delta Z}
\approx
-0.000453435105208\,\lambda_Z.
$$

In Frobenius norm,

$$
\frac{\|\mathcal R_{\mathrm{ax,source}}\|_F}{|\varepsilon|}
=
|\lambda_Z\zeta_{\delta Z}|
\sqrt{\frac23}.
$$

This is the precise residual left by the source-only octahedral geometry export.

## Same-Units Reference Failure

Under the same spatial-compliance source-unit specialization $r_{ZM}=1$, the medium-response target would be

$$
\mu_K^{\mathrm{req}}
=
0.000680152657812,
\qquad
\frac{1}{\varepsilon}\delta\mathcal M_2^{\mathrm{req}}(n)
=
0.000453435105208.
$$

The source-only row gives

$$
\mu_K^{\mathrm{source}}=0,
\qquad
\delta\mathcal M_2^{\mathrm{source}}(n)=0.
$$

Therefore the same-units source-only octahedral row misses the axial cancellation target by the full amount:

$$
\Delta\mu_K
=
-0.000680152657812,
\qquad
\frac{1}{\varepsilon}\Delta\mathcal M_2(n)
=
-0.000453435105208.
$$

This is not a numerical tolerance issue. It is a missing tensor channel.

## Classification Theorem

**Theorem target: source-only octahedral axial decision.** For the rigid octahedral all-pairs root-ledger geometry export with

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\varepsilon A^{ab},
\qquad
\zeta_{\delta Z}\ne0,
$$

and with source-only medium row

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}=0,
$$

the first-order axial observer-geometry outcomes are:

| Projection case | Decision |
| --- | --- |
| $\lambda_Z\ne0$ | `source-only-axial-rejected`: the row exports observer anisotropy $\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}$ |
| $\lambda_Z=0$ | `source-only-nonmetric-closed`: the axial exposure remains nonmetric branch data and does not enter $\gamma_{ij}$ |
| $\lambda_M=0,\lambda_Z\ne0$ | `medium-cancellation-impossible`: no medium projection can cancel the exposure response |
| $\lambda_M\ne0$ with no declared $\mu_K$ row | `metric-closure-not-emitted`: cancellation cannot be inferred |
| $\lambda_M\ne0$ with $\mu_K=0$ | same as the source-only row; rejected unless $\lambda_Z=0$ |

**Proof.** With $\mu_K=0$, the axial residual reduces to

$$
\mathcal R_{\mathrm{ax,source}}^{ij}
=
\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}.
$$

The tensor $A^{ij}$ is nonzero and $\zeta_{\delta Z}$ is nonzero. Therefore the residual vanishes if and only if $\lambda_Z=0$ or the probe amplitude is zero. A nonzero $\lambda_M$ is irrelevant unless a nonzero $\mu_K$ row is emitted. If $\lambda_Z=0$, the observer projection discards the exposure tensor from the spatial-compliance metric; the tensor is still branch-local geometry data, not an isotropic metric source.

## What This Closes

The current rigid octahedral geometry response is now classified in two layers:

$$
\boxed{
\text{raw current row}
\quad=\quad
\texttt{medium-row-not-emitted}.
}
$$

It is a source-side geometry response, not an isotropic metric closure. Under the explicit source-only diagnostic restriction, it further classifies as

$$
\boxed{
\text{source-only diagnostic row}
\quad\Longrightarrow\quad
\begin{cases}
\text{observer anisotropy}, & \lambda_Z\ne0,\\
\text{nonmetric branch data}, & \lambda_Z=0.
\end{cases}
}
$$

It is not an isotropic metric branch by itself. It becomes compatible with isotropic observer geometry only by one of two explicit routes:

1. a retained Noether sea tensor response emits

   $$
   \mu_K=0.000680152657812\,r_{ZM};
   $$

2. the ADM/Cartan projection declares $\lambda_Z=0$, so this exposure tensor does not enter $\gamma_{ij}$.

Those are different claims. The first is a metric-cancellation route. The second is a nonmetric-branch-data route.

## Promotion Decision

This packet remains `priority-only`. It is not corpus-ready because the rigid octahedral row is not a retained dynamics branch and because $\lambda_Z$ is an undeclared ADM/Cartan projection decision.

The durable theory advance is the branch decision: the specific source-only octahedral response is not merely open. It is axially rejected as an isotropic observer metric source for $\lambda_Z\ne0$, and it is closed only as nonmetric branch data for $\lambda_Z=0$.
