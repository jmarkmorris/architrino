# A quadratic phase-separation condition on the inner-equal boundary

## Proposed necessary condition

**Derived claim pending independent reconstruction:** consider an exact distinct-member configuration with $r_1=r_2=1$, $r_3=b>1$, angular rate $\omega\ge0$ and all member speeds at most one in the selected coefficient-one logarithmic circular class. Let $\beta\in(0,\pi)$ be the clockwise separation of the two positive inner endpoints after ordering their labels, and put $\rho=\min\{\beta,\pi-\beta\}$. Then

$$
\rho\ge\min\left\{\frac1{16},\frac{(b-1)^2(b+1)}{24b^2}\right\}.
$$

The closest endpoint separation between the two inner pairs is $d=2\sin(\rho/2)$, so a corresponding spatial bound is

$$
d\ge\min\left\{\frac1{32},\frac{(b-1)^2(b+1)}{48b^2}\right\}.
$$

Near $b=1$, this necessary separation scales quadratically in $b-1$, sharpening the previously checked cubic inner/middle endpoint bound on this partial-equality boundary. It is not a radial-gap bound for general unequal radii. The equation, persistent polarities and complete histories are unchanged, with $K_{\log}=c_f=1$, thirty positive partner roots and zero positive self roots. No exact reference is asserted.

## A global inequality for the complete inner chart

Write $v=\omega\le1/b<1$, but prove the following auxiliary inequality on the larger interval $0\le v\le1$. The complete inner-circle root obeys

$$
H_v(\alpha)=\alpha-2v\sin(\alpha/2)=\gamma,\qquad
D=1-v\cos(\alpha/2),\qquad 0<\alpha<2\pi.
$$

It satisfies

$$
3H_v(\alpha)\ge\alpha D.
$$

Indeed, the difference is affine in $v$. At $v=0$ it equals $2\alpha>0$. At $v=1$, set $t=\alpha/2\in(0,\pi)$; the difference is $2g(t)$, where

$$
g(t)=2t+t\cos t-3\sin t,
\quad g'(t)=2-2\cos t-t\sin t,
\quad g''(t)=\sin t-t\cos t,
\quad g'''(t)=t\sin t\ge0.
$$

Since $g(0)=g'(0)=g''(0)=0$, three integrations show $g(t)\ge0$ throughout the interval. The two endpoint inequalities imply the claim for every $v\in[0,1]$.

If $0<\gamma\le1/16$, then $\alpha<\pi/2$. To check the domain, monotonicity of $H_v$ gives

$$
H_v(\pi/2)=\pi/2-\sqrt2\,v\ge\pi/2-\sqrt2>1/16,
$$

using the strict elementary bounds $\pi>3$ and $\sqrt2<23/16$. Thus $\cos(\alpha/2)>1/2$, $\sin(\alpha/2)\le\alpha/2$, and

$$
B_v(\gamma)=\frac{\cos(\alpha/2)}{\sin(\alpha/2)D}
\ge\frac1{\alpha D}\ge\frac1{3\gamma}.
$$

At present angle $\gamma+\pi>\pi$, the emission angle is also greater than $\pi$, so $B_v(\gamma+\pi)<0$. Therefore the complete neutral-pair response satisfies

$$
Q_v(\gamma)=B_v(\gamma)-B_v(\gamma+\pi)\ge\frac1{3\gamma},
\qquad 0<\gamma\le1/16.
$$

For every $0<x<\pi$, one also has $Q_v(x)>0$, because the checked derivative formula

$$
B_v'(\gamma)=-\frac{1-v\cos^3(\alpha/2)}{2\sin^2(\alpha/2)D^3}<0
$$

makes $B_v$ strictly decreasing. No exactness assumption enters either response inequality.

## A necessary cancellation at two receivers

The complete three-inner-source tangential difference is

$$
L:=A^{\mathrm{inner}}_{1,t}-A^{\mathrm{inner}}_{2,t}
=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2>0.
$$

This is the exact source inventory in the [correlated tangential restriction](overnight2-c-inner-equal-tangential-bound.md). If $\rho\le1/16$, one term is at least $1/(3\rho)$ and the other is positive, so $L\ge1/(6\rho)$.

The same complete outer-row geometry gives, at either unit-radius receiver,

$$
|A_t|\le\frac{b}{(b^2-1)(1-v)}
\le\frac{b^2}{(b-1)^2(b+1)}.
$$

There are two outer sources at each receiver, so their total ability to cancel the inner difference is at most

$$
C(b)=\frac{4b^2}{(b-1)^2(b+1)}.
$$

For both full tangential residuals to vanish, $L$ must be no greater than $C(b)$. Consequently, if $\rho\le1/16$,

$$
\frac1{6\rho}\le C(b)
\quad\Longrightarrow\quad
\rho\ge\frac{(b-1)^2(b+1)}{24b^2}.
$$

If $\rho>1/16$ instead, the other part of the minimum already holds. This proves the proposed phase bound without replacing the two outer rows by a tunable response or dropping any causal root.

Finally $0<\rho\le\pi/2$. On $0\le z\le\pi/4$, concavity of sine gives $\sin z\ge z/2$ (for example, compare its chord between zero and $\pi/2$, whose slope is $2/\pi>1/2$). Hence $d=2\sin(\rho/2)\ge\rho/2$, proving the displayed spatial bound. The factor one half is deliberately conservative.

## Scope and falsifiers

The new inequality $3H_v\ge\alpha D$ is derived independently of the interval speed certificate; it remains valid even at $v=1$ for interior roots. At $v=0$, $H_0=\alpha$, $D=1$ and $Q_0(x)=2/\sin x$, providing hand controls for its sign and the small-angle lower bound. The full cancellation argument uses the checked circular chart and complete outer-row geometry; it is not a trajectory calculation or a new numerical target.

A sign error in the third derivative of $g$, an invalid small-angle domain, a reversed inequality between $\alpha D$ and $\gamma$, a wrong two-receiver inventory, or an exact configuration violating the bound would falsify the corresponding step. The generic unequal-radius separation theorem and the present partial-equality statement have different domains and must not be silently interchanged. Independent reconstruction is required before this new quantitative condition is integrated as a completed result.
