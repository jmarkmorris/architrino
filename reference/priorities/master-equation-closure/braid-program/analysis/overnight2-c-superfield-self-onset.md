# A superfield self-root requires a compensating partner singularity near onset

## Claim and domain

Claim grade: derived, pending independent reconstruction. This is a parameter-boundary statement about prescribed exact circular references, not continuation of an actual trajectory through wake speed. Retain the logarithmic inverse-distance law, $K_{\log}=c_f=1$, fixed unit polarities, unchanged transmitter factor and all ordinary positive-delay roots. There are three persistent neutral antipodal pairs with common center and angular rate, smallest radius one and all radii at most a fixed finite $R\ge1$.

Choose a receiver of radius $a\in[1,R]$ whose speed $v=\omega a$ lies in $(1,\pi/2)$ and tends to one from above. Its self channel has exactly one positive-delay root. The tangential contribution of that root diverges positively as

$$
A_{t,\mathrm{self}}\sim\frac{1}{4\sqrt6\,a(v-1)^{3/2}}.
$$

Therefore an exact circular reference cannot approach this boundary while all its partner delays and absolute transmitter factors retain uniform positive lower bounds. More precisely, with $N_R=\lceil R\rceil+4$, at least one partner root at this receiver must satisfy

$$
\tau|D|\le\frac{5N_R}{A_{t,\mathrm{self}}}
\sim20\sqrt6\,N_R a(v-1)^{3/2}.
$$

The finite bound $R$ is an explicit assumption for this superfield statement. The earlier subfield bound $r_3<35$ does not establish $R=35$ for arbitrary superfield configurations. One may choose $R=35$ as a declared bounded superfield class, but it is not a proved global superfield restriction.

This identifies a necessary compensation mechanism: a partner causal range or factor must become small enough to cancel the new self contribution. It does not prove that cancellation occurs, supply an exact reference, or extend the equation at a singular root.

## Exact positive self root

Let $x=\omega\tau/2$. The circular self chord has length $2a|\sin x|$, so every positive self root satisfies

$$
x=v|\sin x|,\qquad0<x\le v<\pi/2.
$$

The interval bound includes the whole past because $\tau\le2a$. On this interval the sine is positive. The function $\sin x/x$ decreases strictly from one: its derivative has numerator $x\cos x-\sin x<0$, since $\sin x-x\cos x=\int_0^x t\sin t\,dt>0$. The equation $\sin x/x=1/v$ has exactly one solution in $(0,v)$ because it starts above $1/v$ and $\sin v<1$. No other lobe is available below $x\le v<\pi/2$. The same-time endpoint $x=0$ remains excluded.

At that root,

$$
D_{\mathrm{self}}=1-v\cos x=1-x\cot x>0.
$$

Thus the root is ordinary throughout the open superfield interval. The receiver-frame radial and tangential rows are exactly

$$
A_{r,\mathrm{self}}=\frac1{2aD_{\mathrm{self}}},\qquad
A_{t,\mathrm{self}}=\frac{\cot x}{2aD_{\mathrm{self}}}>0.
$$

These expressions follow directly by substituting the self chord $\tau=2a\sin x$ and delayed angle $-2x$ into the selected equation. The same polarity product is positive; no self row is suppressed.

Write $\varepsilon=v-1$. The Taylor expansions at zero give

$$
v=\frac{x}{\sin x}=1+\frac{x^2}{6}+O(x^4),\qquad
D_{\mathrm{self}}=1-x\cot x=\frac{x^2}{3}+O(x^4).
$$

Hence $x\sim\sqrt{6\varepsilon}$, $D_{\mathrm{self}}\sim2\varepsilon$, and

$$
A_{r,\mathrm{self}}\sim\frac1{4a\varepsilon},\qquad
A_{t,\mathrm{self}}\sim\frac1{4\sqrt6\,a\varepsilon^{3/2}}.
$$

These are asymptotic equivalences with ratio tending to one. They are not finite-parameter error estimates. The exact expressions above remain available for a finite necessary inequality. Since $1\le a\le R$, the positive tangential term diverges uniformly along any such bounded-radius sequence.

## A finite all-root partner count

For a partner source of radius $b\in[1,R]$ and present relative angle $\delta$, every causal root has $0<\tau\le L=a+b\le2R$. Its squared gap is

$$
G(\tau)=\tau^2-a^2-b^2+2ab\cos(\delta-\omega\tau).
$$

Its third derivative is $G'''(\tau)=-2ab\omega^3\sin(\delta-\omega\tau)$. Since $v=\omega a<\pi/2$ and $a\ge1$, one has $\omega<\pi/2$ and $\omega L/\pi<R$. The zeros of $G'''$ are spaced by $\pi/\omega$. Their number on the finite delay interval is therefore bounded by $\lceil R\rceil+1$, a deliberately loose bound including possible endpoints. Repeated Rolle's theorem bounds the number of distinct roots of $G$ by three more. Thus each partner channel has at most

$$
N_R=\lceil R\rceil+4
$$

positive roots. This bound covers every lobe and does not assume a single partner branch. For an ordinary chart all those roots are simple; a parameter point with a singular root remains outside the selected ordinary expression. Five partner labels therefore contribute at most $5N_R$ rows at the receiver. The bound is conservative, not a measured root count or a claim that the maximum is attained.

## Necessary compensation in an exact reference

The complete tangential equation at the selected receiver is

$$
0=A_{t,\mathrm{self}}+\sum_{\mathrm{partner\ roots}}A_t.
$$

Let $m$ be the actual positive partner-root count, so $m\le5N_R$, and set $s=\min_{\mathrm{partner\ roots}}\tau|D|$. The finite set is nonempty because the receiver's own antipodal partner has positive present separation $2a$, and its bounded source path supplies a positive causal hit. Each logarithmic row has norm $1/(\tau|D|)$ and tangential magnitude no larger than that norm. Consequently exactness requires

$$
A_{t,\mathrm{self}}\le\sum_{\mathrm{partner\ roots}}|A_t|
\le\frac{m}{s}\le\frac{5N_R}{s},
$$

which gives the stated finite inequality $s\le5N_R/A_{t,\mathrm{self}}=10N_R aD_{\mathrm{self}}\tan x$. The asymptotic constant follows from the already derived self row. It is a necessary condition only: a small denominator can have the wrong tangential sign and need not cancel anything.

If simultaneous partner separations at this receiver stay at least $d_0>0$, every source speed is at most $\omega R<\pi R/2$. The causal triangle inequality gives

$$
\tau\ge\frac{d_0}{1+\pi R/2}.
$$

Thus some partner's factor must obey

$$
|D|\le\frac{5N_R(1+\pi R/2)}{d_0 A_{t,\mathrm{self}}}
=O((v-1)^{3/2}).
$$

A uniform factor floor then forbids exact balance sufficiently near onset. If no simultaneous separation floor is imposed, the conclusion remains the small-product condition; it must not be reported as a factor-only result. A zero factor at a limiting positive-delay root indicates a multiple root but does not by itself establish a generic fold. No continuation rule is inferred in either case.

## Evidence boundary and falsifiers

The derivation uses complete circular histories and all-root delay/count bounds. No numerical target, fitted coefficient, finite sampled census or trajectory integration is a premise. The exact self chord and Taylor coefficients require independent reconstruction before this result is relied on. Falsifiers are an additional self root with $0<v<\pi/2$ in the stated superfield range, a wrong source-factor sign, an incorrect asymptotic coefficient, a partner-root count exceeding the Rolle bound, a failed norm-to-tangential estimate, or an exact sequence retaining both positive partner delay and factor margins as $v\downarrow1$. The superfield radius bound is an assumption and must remain visible when applying the result.
