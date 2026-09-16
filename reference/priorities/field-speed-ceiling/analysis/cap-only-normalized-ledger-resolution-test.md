# Normalized partner-and-self ledger: resolution-dependence test

**Date:** 2026-09-15. **Status:** exploratory analytic auxiliary-model calculation; no smoothing or event law adopted. **Grade:** derived formulas for the stated finite-memory, dual-smoothed diagnostic on a prescribed mirror history. **Boundary:** regular-domain agreement does not certify either diagnostic as the correct sharp singular-event extension.

## Question and outcome

**Subsequent operator clarification (2026-09-15):** there is no self-action with a field-speed ceiling, including at equality. Accordingly the self-active Gaussian continuation below is not an admissible resolution of the intended FSC model. Preserve the diagnostic as an explanation of how an auxiliary regularization can introduce excluded self response, not as an open choice between self-active and self-silent physics. Continue the exploration with zero self acceleration and retained self-emission provenance. The remaining singular question is partner reception and capped event evolution; this clarification supplies no partner event coefficient or reversal rule.

The accumulated-acceleration method in the [coupled-evolution note](cap-only-coupled-near-incidence-evolution.md#exploratory-route-accumulated-acceleration-parameter-through-the-event) requires a limiting signed balance of every channel. In the exact straight mirror chart, the self contribution makes this balance sensitive to the profile used to approximate the causal delta. A Gaussian-centered profile gives normalized balance tending to $+1$ for receiver 1 at each fixed positive time, whereas an even nonnegative unit-mass profile vanishing at its center gives balance tending to $-1$. Both reproduce the ordinary simple-root reduction when the core parameter is subsequently removed on positive-range charts.

This is a counterexample to the claim that regular-root recovery alone determines the singular normalized ledger. It is not a proof of two different full cap-only solutions, a physical nonuniqueness theorem, or permission to select either profile. A physically justified admissibility condition could exclude one or both families.

## Diagnostic definition

Use $c_f=1$, equal polarity magnitudes, $K=\kappa|q_1q_2|$, and the prescribed straight mirror history

$$
X_1(t)=t,\qquad X_2(t)=-t.
$$

Retain source times $s\in[t-h,t)$ with fixed $h>0$, as in the canonical chapter's auxiliary finite-memory model. Supply the required initial straight history on $[-h,0]$. No statement is made about an arbitrary earlier all-past history; a finite-memory diagnostic is not a proof that those earlier records may be discarded in the physical problem.

Use the canonical chapter's smooth vector core in one dimension,

$$
F_c(u)=\frac{u}{(u^2+c^2)^{3/2}},\qquad c>0,
$$

where $c$ is an auxiliary core length, not a speed or a proposed physical size. Write

$$
\delta_\eta(z)=\frac1\eta\phi(z/\eta),
\qquad \eta>0.
$$

Both smoothing parameters are diagnostic. The [Master Equation auxiliary regulator](../../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) is the source of this kernel and memory convention, and explicitly does not adopt its finite-core coincidence value as an event law.

## Profile normalization and regular-domain check

Take two profiles:

$$
\phi_G(z)=\frac{e^{-z^2/2}}{\sqrt{2\pi}},
\qquad
\phi_H(z)=z^2\phi_G(z).
$$

Both are smooth, even, nonnegative, and have integral one: the second identity is the unit second moment of the standard Gaussian. Both scaled profiles converge to the Dirac delta on smooth test functions. Their difference at the center is

$$
\phi_G(0)>0,\qquad \phi_H(0)=0.
$$

For a regular simple root, the change of variable $z=g(s)/\eta$ gives the same limiting factor $1/|g'(s_*)|$ for either profile. In particular the known static-source case $g=R-(t-s)$ has derivative one and recovers the same core-smoothed inverse-square response; taking $c\downarrow0$ at fixed $R>0$ gives the canonical $1/R^2$ factor. This is an analytical normalization and regular-domain check, not an instrument run or singular-domain admissibility certificate.

## Exact self contribution

For the self channel, $u=t-s>0$, $g_{\mathrm s}=u-(t-s)=0$, and same polarity gives

$$
a_{\mathrm s}^{\eta,c}
=K\frac{\phi(0)}\eta\int_0^h F_c(u)\,du
=K\frac{\phi(0)}\eta
\left(\frac1c-\frac1{\sqrt{h^2+c^2}}\right).
$$

It is forward. The exact diagonal point is irrelevant to this integral: the continuum of strictly positive delays also has $g_{\mathrm s}=0$. Thus excluding the single diagonal point does not remove the effect.

For the Gaussian, this contribution diverges as $\eta\downarrow0$ at any fixed $c>0$. For the hollow-centered profile $\phi_H$, it is identically zero. The latter zero is a property of this approximation sampled on an identically-zero residual, not a derived sharp self-reception rule.

## Exact partner contribution and incidence

Set $u=t+s$. Then

$$
a_{\mathrm p}^{\eta,c}(t)
=-K\int_{2t-h}^{2t}
F_c(u)\,\delta_\eta(|u|-2t+u)\,du.
$$

At incidence $t=0$, $u<0$ on the retained interval, the residual vanishes, and the oddness of $F_c$ gives

$$
a_{\mathrm p}^{\eta,c}(0)=a_{\mathrm s}^{\eta,c}.
$$

Thus the older self and partner cap contributions reinforce in the forward direction for receiver 1; opposite source polarities do not cancel these vector accelerations. Reflection reverses both accelerations for receiver 2. For the Gaussian, the normalized balance is exactly $+1$ for receiver 1 at incidence. For $\phi_H$, both terms are zero at that one test event, so the normalization denominator is zero and the balance is undefined there.

The core assigns zero vector value at the single point $u=0$. This is explicitly an auxiliary value and is not interpreted as the physical response to the crossover emission.

## Fixed positive time after incidence

Fix $0<t<h/2$ and $c>0$, then send $\eta\downarrow0$. On $u<0$, the partner residual is $-2t$, and both Gaussian-based profiles vanish exponentially in the limit. On $u>0$, the simple root is $u=t$, with derivative two. Hence

$$
a_{\mathrm p}^{\eta,c}(t)\longrightarrow
-\frac K2 F_c(t)<0.
$$

Taking $c\downarrow0$ afterwards recovers $-K/(2t^2)$. This is a fixed-positive-time iterated limit, not a uniform event-layer limit in which $t$, $\eta$, and $c$ all vanish together.

Normalize the two complete channel totals on this diagnostic history by

$$
b_{\eta,c}(t)
=\frac{a_{\mathrm s}^{\eta,c}+a_{\mathrm p}^{\eta,c}(t)}
{|a_{\mathrm s}^{\eta,c}|+|a_{\mathrm p}^{\eta,c}(t)|}.
$$

Then

$$
\lim_{\eta\downarrow0} b_{\eta,c}^{G}(t)=+1,
\qquad
\lim_{\eta\downarrow0} b_{\eta,c}^{H}(t)=-1.
$$

These distinct limits persist under the subsequent $c\downarrow0$ limit. The discrepancy comes from the characteristic self family, not from a disagreement on the ordinary partner row.

## A bounded auxiliary continuation for the Gaussian

For the centered Gaussian, $0\le\delta_\eta(z)\le\delta_\eta(0)$. At $0\le t<h/2$, the negative-$u$ part of the partner integral is forward and nonnegative. The magnitude of its backward positive-$u$ part obeys

$$
K\int_0^{2t}F_c(u)\delta_\eta(2u-2t)\,du
\le K\delta_\eta(0)\int_0^{2t}F_c(u)\,du
\le a_{\mathrm s}^{\eta,c},
$$

since $2t<h$ and $F_c(u)>0$ for $u>0$. Therefore the net acceleration is nonnegative throughout that interval. Applying the stated cap response at $v=+1$ gives $v'=0$.

Consequently the straight right path is an exact local solution of this finite-memory, finite-core, Gaussian-smoothed capped auxiliary model with the supplied straight initial history. This is an analytic existence witness for that auxiliary problem only; no uniqueness, stability, all-past equivalence, or canonical sharp-law continuation is established. The hollow-centered profile does not support the same straight right path at sufficiently small $\eta$ and fixed positive $t$, because its net response there is backward. Its actual evolved solution and singular limit have not been computed.

## Interpretation and remaining question

The velocity cap can indeed suppress a very large forward net acceleration and leave a bounded straight continuation in a specified auxiliary model. But that model obtains its forward dominance from co-moving self reception. If the intended FSC premise explicitly excludes that self response, this auxiliary continuation is not an admissible realization of that premise. Its success cannot be cited while its self term is simultaneously discarded.

The original sharp ordinary law does not assign a finite row to the characteristic self family. Replacing the causal delta by two regular-domain-equivalent profiles produces different normalized balances there. Neither profile is automatically privileged at the singular family merely because it is smooth, positive as a measure, or correctly normalized. The Gaussian is the chapter's named auxiliary example; the hollow-centered profile is a counterexample diagnostic, not an alternative physical law proposed for adoption.

The accumulated-acceleration reparameterization remains exact on defined finite ledgers, but it does not remove this ambiguity in its input balance. A complete event theorem needs either a derived characteristic self-response criterion or a justified approximation family with proved event-layer and trajectory convergence. This calculation does not show that no such theorem exists.

## Verification and falsifiers

Verification is analytical: Gaussian mass and second-moment normalization, exact antiderivative of $F_c$, the two branches of the partner residual, the simple-root factor two, and the Gaussian maximum bound. No numerical code or simulation is used. Reproduction consists of substituting the stated paths and profiles into the canonical auxiliary integral and checking these identities.

The result is falsified by a sign or integration error in the self/partner formulas, failure of the regular-root limits under their fixed-positive-range hypotheses, or a negative Gaussian net ledger within the proved $0\le t<h/2$ interval. A singular admissibility principle excluding a profile narrows the comparison but is additional information to establish, not a refutation of its algebra. This note makes no claim about the full evolved hollow-profile trajectory or a regulator-independent outgoing velocity.
