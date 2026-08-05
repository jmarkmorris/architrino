# TOPO-001 — Observable And Reference Geometry v1

## Contract Status

- Contract identity: `topo_observable_and_reference_geometry/v1`
- Claim grade: derived prescribed-path geometry plus defined diagnostic scalar product
- Numerical convention: $c_f=1$
- Supported source histories: one prescribed uniformly translating electrino or positrino
- Reception slice: $T=0$
- Output authority: display and analytical-reference use only
- Not supplied: a scalar potential, receiver acceleration, dynamics, continuation, energy, conservation, stability, or physical validation

This contract selects the **signed ordinary wake-intensity product** as Topo's first raw scalar. It does not call that scalar a potential. A true scalar-potential product remains owned by [Potential](../app-potential/priorities.md) and requires a separately versioned scientific kernel.

Plainly: v1 colors the signed inverse-square strength of the ordinary arriving wake geometry. It does not invent a potential formula to make the application name or display more convenient.

## Prescribed Geometry

Let the displayed source position be

$$
\mathbf x_0=(2/3,1/2),
$$

and let the source history at emission time $s\leq0$ be

$$
\mathbf X(s)=\mathbf x_0+\beta s\mathbf e_x,
\qquad
0\leq\beta\leq1.
$$

For a sample point $\mathbf x=(x,y)$, define source-relative coordinates

$$
u=x-2/3,
\qquad
w=y-1/2,
\qquad
\rho^2=u^2+w^2.
$$

An ordinary emission root has positive delay $\tau=-s>0$ and satisfies

$$
\left\|\mathbf x-\mathbf X(-\tau)\right\|
=
\sqrt{(u+\beta\tau)^2+w^2}
=\tau.
$$

Plainly: $\tau$ is how far the calculation looks back along the declared path. The arriving wake traveled the same numerical distance because $c_f=1$.

## Unique Regular Root For $0\leq\beta<1$

Squaring the positive-separation condition gives

$$
(1-\beta^2)\tau^2-2\beta u\tau-\rho^2=0.
$$

Define

$$
\lambda_\beta(u,w)
\equiv
\sqrt{u^2+(1-\beta^2)w^2}.
$$

For every $\mathbf x\ne\mathbf x_0$ and $0\leq\beta<1$, the unique positive root is

$$
\boxed{
\tau_\beta(u,w)
=
\frac{\beta u+\lambda_\beta}{1-\beta^2}
=
\frac{\rho^2}{\lambda_\beta-\beta u}
},
\qquad
s_\ast=-\tau_\beta<0.
$$

The second expression is algebraically identical and is useful as a cross-check. The other quadratic root is negative and is not an allowed emission delay.

Plainly: away from the source marker, every sub-field-speed pixel has exactly one past emission whose wake reaches it at $T=0$.

At that root, define

$$
\mathbf R_\beta=(u+\beta\tau_\beta,w),
\qquad
r_\beta=\|\mathbf R_\beta\|=\tau_\beta,
\qquad
\widehat{\mathbf R}_\beta=\frac{\mathbf R_\beta}{\tau_\beta}.
$$

The canonical transmitter-side factor and ordinary acceleration weight reduce to

$$
D_t
=
1-\beta\,\widehat{\mathbf R}_{\beta,x}
=
(1-\beta^2)-\frac{\beta u}{\tau_\beta}
=
\boxed{\frac{\lambda_\beta}{\tau_\beta}}>0,
$$

$$
W^{\mathrm{acc}}
=
\frac{1}{|D_t|}
=
\boxed{\frac{\tau_\beta}{\lambda_\beta}}.
$$

Thus the entire punctured display plane is a simple-root chart for $0\leq\beta<1$. A numerical implementation may additionally impose a declared positive floor on $D_t$, but it may not change the analytical domain by silently clipping $D_t$.

Plainly: $D_t$ never vanishes on a valid sub-field-speed pixel. Small values still warn that numerical resolution is demanding; clipping them would change the raw product.

## Selected V1 Scalar Product

Let the source-polarity sign be

$$
\varsigma_q=
\begin{cases}
-1,&\text{single electrino},\\
+1,&\text{single positrino}.
\end{cases}
$$

The v1 raw scalar is the following declared diagnostic composition of those canonical factors:

$$
\boxed{
\mathcal I_q^{\mathrm{ord}}(u,w;\beta)
\equiv
\varsigma_q
\frac{1}{r_\beta^2}
W^{\mathrm{acc}}
=
\frac{\varsigma_q}{\tau_\beta\lambda_\beta}
}
$$

on the ordinary domain. For this one-source, one-root product, aggregation is the identity operation: there is exactly one contribution. A later multi-source contract must declare its own source ledger and summation rule.

Plainly: the raw magnitude is the canonical inverse-square distance factor times the transmitter-side ordinary-root weight. The species supplies only the sign. There is no receiver in this display product.

This scalar is not the canonical per-hit acceleration. A receiver acceleration would additionally require receiver identity and polarity, the coupling and polarity magnitudes, and the line-of-action vector. This scalar is also not a true scalar potential. The canon supplies a causal-wake potential as a history-dependent measure or mollified product and retains a $1/r$ scalar action scaffold as an incomplete variational route; neither supplies a completed pointwise scalar-potential formula that Topo may adopt locally.

Plainly: Topo may display $\mathcal I_q^{\mathrm{ord}}$ honestly as wake intensity. It may not relabel the same numbers as potential or acceleration.

## Independent Controls

### Static Control

At $\beta=0$,

$$
\tau_0=\lambda_0=\rho,
\qquad
D_t=1,
\qquad
W^{\mathrm{acc}}=1,
$$

so

$$
\boxed{
\mathcal I_q^{\mathrm{ord}}(u,w;0)
=
\frac{\varsigma_q}{u^2+w^2}
}.
$$

This control is radial, has exact inverse-square dependence, and changes sign without changing magnitude when the species changes.

Plainly: at zero prescribed speed, equal-radius samples must agree exactly before coloring.

### Equal-Distance Axis Control

For a displayed distance $a>0$, the leading sample is $(u,w)=(+a,0)$ and the trailing sample is $(-a,0)$. For $0\leq\beta<1$,

$$
\begin{array}{c|c|c|c|c}
\text{sample}&\tau&D_t&W^{\mathrm{acc}}&\mathcal I_q^{\mathrm{ord}}\\
\hline
\text{leading }(+a,0)&a/(1-\beta)&1-\beta&1/(1-\beta)&\varsigma_q(1-\beta)/a^2\\
\text{trailing }(-a,0)&a/(1+\beta)&1+\beta&1/(1+\beta)&\varsigma_q(1+\beta)/a^2
\end{array}
$$

The raw equal-distance ratio is therefore

$$
\frac{|\mathcal I_{q,\mathrm{trail}}^{\mathrm{ord}}|}
{|\mathcal I_{q,\mathrm{lead}}^{\mathrm{ord}}|}
=
\frac{1+\beta}{1-\beta}.
$$

Plainly: for this particular product at equal distance from the source's present marker, the trailing value is larger. The shorter trailing causal distance outweighs the smaller transmitter-side weight. Topo must show this result rather than manufacture a leading buildup.

Using the on-canvas reference distance $a=1/6$ gives these exact raw samples:

| $\beta$ | Leading electrino | Trailing electrino | Leading positrino | Trailing positrino |
| ---: | ---: | ---: | ---: | ---: |
| $0$ | $-36$ | $-36$ | $+36$ | $+36$ |
| $1/2$ | $-18$ | $-54$ | $+18$ | $+54$ |
| $3/4$ | $-9$ | $-63$ | $+9$ | $+63$ |

These values are raw analytical references. No display transform, contour count, color limit, clipping rule, or sampling density enters them.

### Polarity Reversal

For every ordinary sample,

$$
\boxed{
\mathcal I_{+}^{\mathrm{ord}}
=
-\mathcal I_{-}^{\mathrm{ord}}
}
$$

while $\tau$, $s_\ast$, $\mathbf R$, $r$, $\widehat{\mathbf R}$, $D_t$, and $W^{\mathrm{acc}}$ remain unchanged.

Plainly: changing electrino to positrino reverses every raw color value and nothing about the geometry.

## Exact $\beta=1$ Boundary

At $\beta=1$, the squared causal condition becomes

$$
2u\tau+\rho^2=0.
$$

The boundary divides into three exact cases.

1. **Strict trailing half-plane, $u<0$.** There is one positive ordinary root:

   $$
   \tau_1=-\frac{\rho^2}{2u},
   \qquad
   D_t=-\frac{u}{\tau_1}=\frac{2u^2}{\rho^2}>0,
   $$

   and

   $$
   \boxed{
   \mathcal I_q^{\mathrm{ord}}(u,w;1)
   =
   \frac{2\varsigma_q}{\rho^2}
   }.
   $$

2. **Leading half-plane or off-source transverse line, $u>0$ or $u=0,w\ne0$.** No positive causal root exists. The output state is `unavailable:no_positive_causal_root`, not zero.

3. **Source point, $u=w=0$.** Every $\tau>0$ satisfies the causal equality, with $D_t=0$. This is a non-isolated degenerate root family. The output state is `nonordinary:degenerate_root_family`, not a finite raw value.

Plainly: at exactly field speed, only points strictly behind the source retain ordinary isolated roots. The leading side is rootless, and the source lies on a degenerate family that the ordinary formula cannot evaluate.

On the horizontal axis, the exact endpoint control is

$$
\mathcal I_{q,\mathrm{trail}}^{\mathrm{ord}}(-a,0;1)
=
\frac{2\varsigma_q}{a^2},
$$

while the leading sample $(+a,0)$ is unavailable. The sub-field-speed leading limit tends to zero, but that limiting number must not be substituted for the unavailable $\beta=1$ sample.

## Result-State Contract

Every requested point returns geometry metadata plus exactly one state:

| State | Meaning | Raw scalar allowed? |
| --- | --- | --- |
| `ordinary` | One positive isolated root with finite $r>0$ and $D_t>0$ | Yes |
| `singular:endpoint_source` | $0\leq\beta<1$ at $u=w=0$; only the excluded $\tau=0$ endpoint exists and the neighboring product diverges | No |
| `unavailable:no_positive_causal_root` | No positive root, including the $\beta=1$ leading and off-source transverse cases | No |
| `nonordinary:degenerate_root_family` | Non-isolated $\beta=1$ source-point family with $D_t=0$ | No |
| `unresolved:numeric_failure` | The declared analytical case should be ordinary, but the implementation failed its residual or finite-value checks | No |
| `ordinary:display_clipped` | The raw ordinary value is finite and preserved, but its displayed color is clipped | Yes, preserved separately |

A raw zero is a valid number only if a future declared aggregate cancels to zero. This single-source product is nonzero everywhere on its ordinary domain. No singular, unavailable, nonordinary, unresolved, or clipped state may be encoded as raw zero.

Plainly: purple zero, a missing root, a singular marker, a failed calculation, and a clipped high value are five different things.

## Provider Checks

An `ordinary` result must carry at least

$$
(\beta,\varsigma_q,u,w,s_\ast,\tau,\mathbf R,r,\widehat{\mathbf R},D_t,W^{\mathrm{acc}},\mathcal I_q^{\mathrm{ord}})
$$

and pass all of the following before display:

$$
s_\ast<0,
\qquad
r=\tau>0,
\qquad
\left|\sqrt{(u+\beta\tau)^2+w^2}-\tau\right|\leq\varepsilon_g,
$$

$$
D_t=1-\beta\widehat{\mathbf R}_x>0,
\qquad
W^{\mathrm{acc}}=1/D_t,
\qquad
\mathcal I_q^{\mathrm{ord}}=\varsigma_qW^{\mathrm{acc}}/r^2.
$$

The tolerance $\varepsilon_g$ is a numerical policy recorded with the product. It does not widen the scientific causal condition or turn a failed residual into an ordinary root.

Plainly: the provider records enough intermediate values for a raw pixel to be checked without consulting its color.

## Falsifiers

This contract fails if any of these operator-checkable observations occurs:

1. Substitution of the reported $\tau$ fails the positive-delay causal equation beyond the declared numerical tolerance.
2. A regular $0\leq\beta<1$ sample away from the marker has other than one positive root, or its reported $D_t$ differs from $\lambda_\beta/\tau_\beta$.
3. The $\beta=0$ raw map is not radial with value $\varsigma_q/\rho^2$.
4. Equal-distance axis samples differ from $\varsigma_q(1-\beta)/a^2$ ahead and $\varsigma_q(1+\beta)/a^2$ behind.
5. Species reversal changes a magnitude, root, distance, or availability state instead of sign alone.
6. A $\beta=1$ leading or off-source transverse point is returned as ordinary, or a strict trailing point is returned without its unique ordinary root.
7. A source, unavailable, nonordinary, unresolved, or clipped state is serialized as raw zero.
8. A display transform or contour setting changes $\tau$, $D_t$, $W^{\mathrm{acc}}$, or the raw scalar.
9. The product is labeled `potential`, `field`, or `acceleration` without a separately accepted scientific contract establishing that identity.

## Remaining Scientific Decision

Topo v1 can proceed with `Signed ordinary wake intensity` as its exact observable label. A true scalar-potential mode remains open and must arrive from Potential with its own kernel identity, history measure or mollification, radial dependence, normalization, singular and nonordinary behavior, and independent analytical reference. It must be a separate menu product rather than a relabeling or display transform of $\mathcal I_q^{\mathrm{ord}}$.

Plainly: the geometry is closed for the first map. The open issue is whether a later, genuinely defined potential should be added as a second map mode.
