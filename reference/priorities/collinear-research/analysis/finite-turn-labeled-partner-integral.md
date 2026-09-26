# Exact labeled partner integral on the finite-turn example

**Date:** 2026-09-15. **Status:** completed analytic diagnostic of a prescribed path; the path fails the unchanged partner equation. **Premises:** $c_f=1$, opposite-polarity mirror pair, zero self-action, complete retained incoming cap, and no frozen-partner suppression. **Grade:** derived within the specified geometry; no physical turn or event update selected.

## Purpose and scope

The operator asks to calculate the integrated partner response through a defined encounter interval while tracking each emission label. The [finite-turn illustration](cap-only-rapid-reversal-geometry.md#labeled-front-tracking-and-the-meaning-of-a-finite-turn) gave a positive gap behind the older partner fronts. This note tests that illustration against the actual ordinary reception law rather than assuming its acceleration. The interval ends at the first zero-velocity point, before the second coincidence in the full illustrated turn. The old incidence family at the single initial event remains separately unresolved and is not assigned an impulse.

## 1. Prescribed path and required acceleration

Let the total reversal duration in the illustration be $\Delta>0$. On $0\le t\le\Delta$, prescribe

$$
X_A(t)=x(t)=t-\frac{t^2}{\Delta},
\qquad X_B(t)=-x(t),
\qquad v(t)=1-\frac{2t}{\Delta}.
$$

The first braking half is $0<t\le\Delta/2$. It would require

$$
a_{\mathrm{required}}=-\frac2\Delta,
\qquad
\int_0^{\Delta/2}a_{\mathrm{required}}\,dt=-1.
$$

The candidate has $0\le v<1$ on that open interval, so the speed cap leaves its negative acceleration unchanged. Specifying this curve is not a new law, but neither is it a solution until its required acceleration agrees with the causal-root ledger.

Older capped partner fronts have already passed for every $t>0$ on this path, by the positive interior-gap argument. Earlier pre-cap emissions are excluded under the explicit incoming-history condition $|x(s)|<-s$ before the cap, as in the [partner-only balance](self-silent-partner-near-event-balance.md). There are no external sources and self acceleration is identically zero.

## 2. Track the actual new source label

Both $x(t)$ and $x(s)$ are positive for the relevant post-event times. Partner reception is therefore

$$
x(t)+x(s)=t-s.
$$

Substitution gives

$$
t^2+s^2=2\Delta s.
$$

The unique admissible root is

$$
\boxed{s(t)=\Delta-\sqrt{\Delta^2-t^2}.}
$$

The other quadratic solution exceeds the reception time. For $0<t\le\Delta/2$, the admitted root obeys $0<s(t)<t$, and

$$
\frac{ds}{dt}=\frac{t}{\sqrt{\Delta^2-t^2}}>0.
$$

Every positive-time reception therefore selects a different, strictly later partner emission. None of the original $s<0$ family is counted again. By the end of this first braking half, the received source labels cover

$$
0<s\le\Delta\left(1-\frac{\sqrt3}{2}\right).
$$

This is continuous source history, not a finite sequence of pulses. Strict monotonicity proves that this branch does not replay an emission label.

## 3. Canonical acceleration on the path

The positive range is $r=t-s(t)$ and the transmitter factor is

$$
D_t=1+v(s)=2\left(1-\frac s\Delta\right)
=2\sqrt{1-(t/\Delta)^2}.
$$

The received contribution is attractive and backward:

$$
a_{\mathrm p}(t)
=-\frac{K}{2\sqrt{1-(t/\Delta)^2}\,[t-\Delta+\sqrt{\Delta^2-t^2}]^2}.
$$

The denominator is finite and positive at each $0<t\le\Delta/2$. Expanding the root near zero,

$$
s(t)=\frac{t^2}{2\Delta}+O(t^4/\Delta^3),
\qquad
r(t)\sim t,
\qquad
a_{\mathrm p}(t)\sim-\frac{K}{2t^2}.
$$

Thus these new emissions alone already have a nonintegrable contribution as the reception time approaches incidence. There is no root-Jacobian degeneracy on this half interval: $D_t\ge\sqrt3$. The divergence is due to vanishing range, not double reception or a small transmitter Jacobian here.

## 4. Exact integrated response on a positive-time truncation

Choose $0<\delta<\Delta/2$ only as an integration boundary. It is not an adopted physical cutoff. Use

$$
t=\Delta\sin\theta,
\qquad
s=\Delta(1-\cos\theta),
\qquad
r=\Delta(\sin\theta+\cos\theta-1).
$$

Since $dt=\Delta\cos\theta\,d\theta$ and $D_t=2\cos\theta$, the exact ordinary integrated contribution is

$$
\boxed{
J(\delta,\Delta/2)
=-\frac{K}{2\Delta}
\int_{\arcsin(\delta/\Delta)}^{\pi/6}
\frac{d\theta}{(\sin\theta+\cos\theta-1)^2}.
}
$$

For an explicit primitive put $u=\tan(\theta/2)$ and define

$$
F(u)=-\frac1{2u}+\frac1{1-u}+\log\frac{u}{1-u}.
$$

Direct differentiation gives

$$
F'(u)=\frac{1+u^2}{2u^2(1-u)^2},
$$

which is exactly the transformed integrand. Hence

$$
J(\delta,\Delta/2)
=-\frac{K}{2\Delta}
\left[
F(2-\sqrt3)
-F\!\left(\tan\left(\tfrac12\arcsin(\delta/\Delta)\right)\right)
\right].
$$

For every positive $\delta$ the value is finite. As $\delta\downarrow0$ at fixed $\Delta$,

$$
J(\delta,\Delta/2)\sim-\frac{K}{2\delta}\longrightarrow-\infty.
$$

The same result follows directly from the inverse-square asymptotic. It is not equal to the required velocity change $-1$, nor does its integrand equal $-2/\Delta$. The prescribed turn therefore fails the ordinary equation even on its first braking half. The cap does not alter this conclusion because the prescribed velocities there lie inside the cap and the acceleration is backward.

## 5. Interpretation

The no-repeated-crossing argument is correct: the original partner family is gone from the positive-time reception set, and the new branch's source labels strictly increase. Yet counting each label only once does not bound the integrated inverse-square response from emissions arbitrarily close to crossover. The singularity persists without reusing any old front.

This is a contradiction for a proposed trajectory, not a prediction that a real architrino acquires infinite speed. A physical solution would have to depart from that trajectory or require a justified singular-event interpretation. The result is consistent with the more general continuous-launch obstruction in the [coupled near-incidence note](cap-only-coupled-near-incidence-evolution.md).

An initial event kick cannot make this same continuous candidate solve its open-interval equation; assigning a different outgoing velocity would require constructing and checking a different right path. The finite-turn illustration is useful for geometry, but it must not be presented as a family of physical solutions whose limit proves rebound.

## Verification and falsifiers

Verification is analytic: substitute the candidate into the causal equation, select the unique root in $(0,t)$, differentiate the source clock, compute the canonical transmitter denominator, perform the trigonometric substitution, and differentiate the displayed primitive. No new numerical instrument or simulation was used.

The result is falsified by an admitted additional root under the stated history assumptions, a failure of the displayed causal identity or Jacobian, or a finite limit of the exact integral as $\delta\downarrow0$. It proves neither that every singular event law fails nor that one auxiliary resolution is physically correct. No kernel change, event impulse, or rebound rule is adopted.
