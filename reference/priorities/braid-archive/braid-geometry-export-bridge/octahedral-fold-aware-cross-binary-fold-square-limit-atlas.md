# Octahedral Fold-Aware Cross-Binary Fold-Square Limit Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-critical-value-atlas](octahedral-fold-aware-cross-binary-critical-value-atlas.md). The predecessor evaluates the primitive $A(u)=\int_0^u f_\times(q)dq$ at the six sampled candidate locations using transformed midpoint quadrature. This packet supplies the local fold endpoint model that explains why those square transforms regularize the projected fold singularities.

It is a sampled source-atlas-aware fold-square limit atlas. It is not an interval fold-limit enclosure, not an interval quadrature certificate, not an interval critical-exhaustion theorem, and not a retained branch.

## Fold Normal Form

For the canonical cross-binary source equation

$$
F_{\kappa,v}(\tilde\theta,\delta)=0,
$$

a projected fold endpoint satisfies

$$
F_{\kappa,v}(\tilde\theta_f,\delta_f)=0,
\qquad
F_\delta(\tilde\theta_f,\delta_f)=0.
$$

Let

$$
\eta=\tilde\theta-\tilde\theta_f,
\qquad
\xi=\delta-\delta_f.
$$

The local fold normal form is

$$
\boxed{
0
=
F_\theta\,\eta
+
\frac12F_{\delta\delta}\xi^2
+
\cdots
}
$$

so the root sheet opens on the side where

$$
\boxed{
\alpha_f\eta\ge0,
\qquad
\alpha_f=-\frac{2F_\theta}{F_{\delta\delta}}.
}
$$

The source-row kernel is

$$
B_f
=
-\frac12\left(\cos\phi_f+\kappa\cos\delta_f\right),
\qquad
\phi_f=2\tilde\theta_f-\delta_f.
$$

On the folded side, the projected forcing has the usual square-root singularity, but the square coordinate removes it:

$$
\theta=\theta_f\pm y^2,
\qquad
g_\pm(y)=2y\,f_\times(\theta_f\pm y^2).
$$

The finite folded-side limit used by this packet is

$$
\boxed{
L_f
=
\frac{
8\sigma B_f
}{
v\delta_f^2
|F_{\delta\delta}|
\sqrt{|\alpha_f|}
}.
}
$$

On the opposite regular one-root side, $f_\times$ stays finite, so

$$
\boxed{
2y\,f_\times(\theta_f\mp y^2)\to0.
}
$$

## One-Sided Fold Limits

For the representative quarter profile, the source-atlas fold sides are:

| Fold | Folded side | Analytic square limit | Sampled $2y f_\times$ at $y=0.001$ |
| --- | --- | ---: | ---: |
| $\theta_{3-}\approx0.997370655243$ | left, $\theta=\theta_{3-}-y^2$ | $-0.192715477558$ | $-0.192627413708$ |
| $\theta_{3-}$ | right, $\theta=\theta_{3-}+y^2$ | $0$ | $0.000088017581$ |
| $\theta_{2+}\approx1.159039827771$ | left, $\theta=\theta_{2+}-y^2$ | $0$ | $-0.000117380193$ |
| $\theta_{2+}$ | right, $\theta=\theta_{2+}+y^2$ | $-0.325542989718$ | $-0.325659851585$ |

Thus the two projected singular sides are

$$
\boxed{
\theta_{3-}^{-}
\quad\text{and}\quad
\theta_{2+}^{+}.
}
$$

The two opposite sides have zero square limit because the ordinary projected forcing is finite there.

## Why This Advances The Interval Route

The previous critical-value packet used transformed midpoint quadrature. This packet supplies the local endpoint formula behind that transform:

$$
\int_{\theta_f-\varepsilon}^{\theta_f}
f_\times(\theta)\,d\theta
=
\int_0^{\sqrt{\varepsilon}}
2y\,f_\times(\theta_f-y^2)\,dy,
$$

and similarly on the right side. The future interval quadrature proof no longer has to treat fold endpoint behavior as an unknown singularity. It must enclose a bounded transformed integrand with explicit endpoint limits.

The direct successor [octahedral-fold-aware-cross-binary-forcing-derivative-atlas](octahedral-fold-aware-cross-binary-forcing-derivative-atlas.md) handles the complementary regular-cell problem. It differentiates the source-atlas-aware formula for $f_\times$, samples the two interior primitive-critical rows as nondegenerate negative-slope crossings, and leaves interval derivative enclosure and interval critical exhaustion open.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs) emits:

- source atlas validation for the $\kappa=+1$ fold endpoints;
- critical-value atlas predecessor validation;
- no-fixed-speed-window square-limit parameters;
- the fold normal form and folded-side limit formula;
- four one-sided fold rows;
- sampled convergence probes for $g_\pm(y)=2y f_\times(\theta_f\pm y^2)$;
- analytic square-limit rows for the folded sides and zero-limit rows for the regular sides;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-fold-square-limit-atlas.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-fold-square-limit-atlas.test.js) verifies predecessor validation, speed-window removal, square normal form, fold-side classification, analytic limits, sampled convergence, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet certifies only source-atlas-aware sampled fold regularization rows:

$$
\texttt{certifies\_source\_atlas\_aware\_fold\_side\_assignment=true},
$$

$$
\texttt{certifies\_square\_coordinate\_endpoint\_model=true},
$$

$$
\texttt{certifies\_sampled\_one\_sided\_fold\_square\_limits=true},
$$

and

$$
\texttt{certifies\_sampled\_finite\_transformed\_integrand\_limits=true}.
$$

It does not certify:

$$
\texttt{certifies\_interval\_fold\_limit\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_quadrature\_enclosure=false},
$$

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-source-atlas-aware-fold-square-limit-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it turns the fold endpoint singularity into an explicit square-coordinate endpoint model with analytic one-sided limits. Its direct successor supplies the regular-cell derivative row needed by future critical-exhaustion work. It should not be promoted into reader-facing AAA prose until those endpoint rows are upgraded to outward-rounded interval enclosures and used in an interval quadrature proof for $C_\times$, $m_Q$, and $M_Q$.
