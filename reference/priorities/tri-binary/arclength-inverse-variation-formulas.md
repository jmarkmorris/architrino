# Arclength-Inverse Variation Formulas

Promotion status: `priority-only`. This packet supplies the coefficient-variation formulas for the arclength-inverse shape chart introduced in [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md). It feeds [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md), [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md), and the Newton/Krawczyk rows in [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md).

The point is that variations must be taken at fixed arclength $\lambda$, not fixed construction phase $\theta$.

---

## 1. Inverse Phase Variation

Let

$$
\mathbf{Y}(\lambda;\alpha)
=
\mathbf{Z}(\theta(\lambda;\alpha);\alpha),
$$

where

$$
\lambda
=
\int_0^{\theta(\lambda;\alpha)}
S(\zeta;\alpha)d\zeta,
\qquad
S(\theta;\alpha)=\|\partial_\theta\mathbf{Z}(\theta;\alpha)\|.
$$

Work on an equal-period tangent chart, so the endpoint length is fixed to first order. For a coefficient variation $v$, define

$$
D_vS(\theta)
=
\frac{
\partial_\theta\mathbf{Z}(\theta)
\cdot
\partial_\theta D_v\mathbf{Z}(\theta)
}{S(\theta)}.
$$

Differentiating the inverse relation at fixed $\lambda$ gives

$$
D_v\theta(\lambda)
=
-
\frac{
\int_0^{\theta(\lambda)}
D_vS(\zeta)d\zeta
}{
S(\theta(\lambda))
}.
$$

Therefore, if

$$
S(\theta)\ge s_0>0,
\qquad
\|D_vS\|_{L^1}\le C_S,
$$

then

$$
|D_v\theta(\lambda)|
\le
\frac{C_S}{s_0}.
$$

If the length row is not restricted, the same formula gains an endpoint normalization term. The solver should either project to $\ker D\mathbf{L}$ first or emit the normalized-coordinate version explicitly.

---

## 2. Curve, Tangent, And Projector Variation

At fixed arclength,

$$
D_v\mathbf{Y}(\lambda)
=
D_v\mathbf{Z}(\theta)
+
\partial_\theta\mathbf{Z}(\theta)D_v\theta.
$$

The unit tangent is

$$
\mathbf{T}
=
\frac{\partial_\theta\mathbf{Z}}{S}.
$$

Let

$$
\mathcal{D}_v\partial_\theta\mathbf{Z}
=
\partial_\theta D_v\mathbf{Z}
+
\partial_{\theta\theta}\mathbf{Z}\,D_v\theta.
$$

Then

$$
D_v\mathbf{T}
=
\frac{
\left(I-\mathbf{T}\mathbf{T}^T\right)
\mathcal{D}_v\partial_\theta\mathbf{Z}
}{S}.
$$

The normal projector variation is

$$
D_vP^\perp
=
-
D_v\mathbf{T}\,\mathbf{T}^T
-
\mathbf{T}(D_v\mathbf{T})^T.
$$

These are the projector derivatives needed by force, $\Gamma$, and variationality rows.

---

## 3. Curvature Variation

The arclength curvature is

$$
\mathbf{K}
=
\frac{1}{S}
\partial_\theta
\left(
\frac{\partial_\theta\mathbf{Z}}{S}
\right).
$$

Equivalently,

$$
\mathbf{K}
=
\frac{
\left(I-\mathbf{T}\mathbf{T}^T\right)
\partial_{\theta\theta}\mathbf{Z}
}{S^2}.
$$

Let

$$
\mathcal{D}_v\partial_{\theta\theta}\mathbf{Z}
=
\partial_{\theta\theta}D_v\mathbf{Z}
+
\partial_{\theta\theta\theta}\mathbf{Z}\,D_v\theta.
$$

Then

$$
D_v\mathbf{K}
=
\frac{
(D_vP^\perp)\partial_{\theta\theta}\mathbf{Z}
+
P^\perp
\mathcal{D}_v\partial_{\theta\theta}\mathbf{Z}
}{S^2}
-
2\mathbf{K}
\frac{D_vS_{\mathrm{tot}}}{S},
$$

where

$$
D_vS_{\mathrm{tot}}
=
D_vS(\theta)
+
\partial_\theta S(\theta)D_v\theta.
$$

This formula is the curvature derivative used in the arclength-inverse residual. It is valid while $S\ge s_0>0$ and the Fourier curve has the required $C^3$ control.

---

## 4. Delayed Source Phase Variation

For a delayed source evaluation,

$$
\mathbf{Y}_j(\lambda-\eta;\alpha)
=
\mathbf{Z}_j(\theta_j(\lambda-\eta;\alpha);\alpha).
$$

A coefficient variation also moves the root delay:

$$
D_v(\lambda-\eta)
=
-D_v\eta.
$$

Therefore the total phase variation is

$$
D_v\theta_j(\lambda-\eta)
=
(D_v\theta_j)(\lambda-\eta)
-
\frac{D_v\eta}{S_j(\theta_j(\lambda-\eta))}.
$$

This term must be included in root sensitivities, force derivatives, curl entries, and Krawczyk derivative bounds. A derivative computed at fixed construction phase is not the arclength-inverse derivative.

---

## 5. Lemma Target

**Lemma target: arclength-inverse differentiability formulas.** On an equal-period finite Fourier chart with $S_i\ge s_0>0$ and $C^3$ coefficient control, the inverse arclength maps, tangents, normal projectors, curvature vectors, delayed source evaluations, and root residual maps are differentiable with respect to coefficient variations. Their derivatives are given by the formulas above together with the root sensitivity formula.

Proof route:

1. differentiate the inverse arclength relation at fixed $\lambda$;
2. apply the chain rule to $\mathbf{Z}(\theta(\lambda;\alpha);\alpha)$;
3. project tangent variation through $I-\mathbf{T}\mathbf{T}^T$;
4. differentiate the arclength curvature formula;
5. include $-D_v\eta/S$ for delayed source phases.

---

## 6. Current Dynamics Reading

The current $M=3$ packets report residual descent but not full derivative envelopes in the arclength-inverse chart. A successor packet should not only emit finite-difference matrices; it should also say whether those matrices include the inverse-phase terms above.

Current status:

$$
\texttt{arclength-inverse-variation-open},
\qquad
\texttt{root-sensitive-derivative-required},
\qquad
\texttt{not-retained}.
$$

---

## 7. Required Output Fields

Future arclength-inverse solver packets should emit:

| Field | Required payload |
| --- | --- |
| `speed_floor` | $s_0=\min S_i$ and chart radius |
| `inverse_phase_variation` | $D_v\theta_i(\lambda)$ formula or verified automatic-differentiation equivalent |
| `tangent_variation` | $D_v\mathbf{T}_i$ and projector derivative convention |
| `curvature_variation` | $D_v\mathbf{K}_i$ and $C^3$ bounds |
| `delayed_phase_variation` | source phase derivative including $-D_v\eta/S$ |
| `root_sensitive_derivative_status` | whether root and inverse-phase variations are both included |

Failure/status codes:

$$
\texttt{arclength-inverse-variation-open},
\qquad
\texttt{fixed-phase-derivative-invalid},
\qquad
\texttt{speed-floor-variation-fail},
$$

$$
\texttt{root-sensitive-derivative-required},
\qquad
\texttt{not-retained}.
$$
