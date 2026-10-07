# Angular spacing of axial zeros in regular slow limiting orbits

## Result and scope

Claim grade: derived, initially self-reviewed. Let a regular nonplanar radial/axial periodic orbit solve the normalized limiting equation with positive angular constant $\ell$. Between any two consecutive zeros of its height, the azimuth advances by less than
$$
\pi\sqrt{\frac23}.
$$
If a radial/axial period contains $N$ complete axial oscillations, counted as half the number of simple height zeros, its total azimuthal advance satisfies
$$
\Delta\theta<2\pi N\sqrt{\frac23}.
$$
For profiles written in the existing phase convention, $\Delta\theta=2\pi b/k$, so
$$
\frac bk<N\sqrt{\frac23}.
$$
This is a geometric restriction on regular periodic limiting orbits. Through the [accepted compact-family reduction](overnight2-b-independent-compact-slow-scale.md), it constrains the limit of any hypothetical exact compact slow family. It is not an arbitrary finite-speed frequency law. Counting oscillations in an approximating sequence requires preserving the simple zeros; the limiting count itself is unambiguous.

## Angular form of the derived equations

Use the simultaneous canonical coefficients
$$
A_r^{(0)}=\frac{a_r(h)}{r^2},\qquad
A_z^{(0)}=\frac{a_z(h)}{r^2},\qquad h=z/r,
$$
where
$$
a_r(h)=\frac1{\sqrt3}-\frac1{(1+4h^2)^{3/2}}-\frac1{4(1+h^2)^{3/2}},
$$
$$
a_z(h)=-\frac{4h}{(1+4h^2)^{3/2}}-\frac{h}{4(1+h^2)^{3/2}}.
$$
The normalized equations are $\ddot r=\ell^2/r^3+A_r^{(0)}$, $\ddot z=A_z^{(0)}$ and $\dot\theta=\ell/r^2>0$. Dots denote normalized time. Put $s=1/r$ and use a subscript $\theta$ for differentiation with respect to the increasing azimuth. Direct differentiation gives
$$
\dot r=-\ell s_\theta,\qquad
\ddot r=-\ell^2s^2s_{\theta\theta},
$$
$$
\dot z=\ell(sh_\theta-hs_\theta),\qquad
\ddot z=\ell^2s^2(sh_{\theta\theta}-hs_{\theta\theta}).
$$
Substitution therefore yields
$$
s_{\theta\theta}+s=-\frac{a_r(h)}{\ell^2},
\qquad
\ell^2s(h_{\theta\theta}+h)=a_z(h)-h a_r(h).
$$
The diametric terms cancel in the second combination:
$$
a_z(h)-h a_r(h)
=-h\left[\frac1{\sqrt3}+\frac3{(1+4h^2)^{3/2}}\right].
$$
Consequently the height ratio obeys the scalar equation
$$
h_{\theta\theta}+q(\theta)h=0,\qquad
q(\theta)=1+\frac{r}{\ell^2}
\left[\frac1{\sqrt3}+\frac3{(1+4h^2)^{3/2}}\right].
$$
This equation is an algebraic rewriting of the canonical simultaneous limit, with no external dynamical premise.

## A uniform comparison coefficient

The [independently accepted first-integral theorem](overnight2-b-independent-height-confinement.md) gives
$$
|h|<\frac98,\qquad
r>\frac{\ell^2}{2c_0},\qquad c_0=\frac54-\frac1{\sqrt3}.
$$
These imply $q>3/2$ throughout the orbit. Here is a deliberately coarse rational verification. Since $\sqrt3<7/4$, one has $1/\sqrt3>4/7$ and
$$
2c_0=\frac52-\frac2{\sqrt3}<\frac{19}{14}.
$$
Also $1+4h^2<97/16$ and $\sqrt{97}<10$, so
$$
\frac1{\sqrt3}+\frac3{(1+4h^2)^{3/2}}
>\frac47+\frac{96}{485}>\frac34.
$$
The last difference is $263/13580>0$. Thus
$$
q>1+\frac{14}{19}\frac34=\frac{59}{38}>\frac32.
$$
No approximate scalar root or numerically sampled radius bound enters this estimate.

## Direct zero-spacing proof

A nontrivial periodic axial solution takes both signs by the restoring-sign argument. Its zeros are simple: if $z=\dot z=0$ at one point, uniqueness of the smooth limiting equation forces the planar solution thereafter and beforehand. Since $r>0$ and $\dot\theta>0$, zeros of $h$ are the same simple zeros in angular coordinates.

Let $\theta_a<\theta_b$ be consecutive zeros, and change the sign of $h$ if needed so that $h>0$ between them. Set $\alpha=\sqrt{3/2}$ and
$$
v(\theta)=\sin[\alpha(\theta-\theta_a)].
$$
Suppose for contradiction that $\theta_b-\theta_a\ge\pi/\alpha$. On the open interval of length $\pi/\alpha$, both $h$ and $v$ are positive. The Wronskian combination
$$
\mathcal W=h_\theta v-hv_\theta
$$
satisfies
$$
\mathcal W_\theta=(\alpha^2-q)hv<0,\qquad \mathcal W(\theta_a)=0.
$$
At the far endpoint $L=\theta_a+\pi/\alpha$, however, $v(L)=0$ and $v_\theta(L)=-\alpha$, so
$$
\mathcal W(L)=\alpha h(L)\ge0,
$$
contradicting the integrated strict negativity. Hence $\theta_b-\theta_a<\pi\sqrt{2/3}$.

In a complete radial/axial period the continuous periodic function $h$ has finitely many simple zeros. Infinitely many would accumulate on the compact period and force both value and derivative to vanish at an accumulation point. Their number is even, say $2N$. Applying the strict spacing bound to every consecutive pair, including the cyclic final pair, and summing gives the displayed total-angle bound.

## Closed spatial traces and the verification boundary

If the full spatial path closes after that same period with positive integer azimuthal winding $m$, then $\Delta\theta=2\pi m$ and
$$
N>m\sqrt{\frac32}.
$$
In particular, one azimuthal turn cannot coexist with only one axial oscillation. Relative periodic paths need not have integer winding; the real-valued bound on $\Delta\theta$ remains applicable. This distinguishes radial/axial repetition from actual positional closure.

The theorem is initially awaiting independent review. Incorrect angular differentiation, a wrong sign in $a_z-ha_r$, misuse of the negative-first-integral bounds, an erroneous rational comparison or a missing zero-count boundary term would defeat the corresponding claim. A regular periodic limiting orbit with positive $\ell$ violating the zero-spacing bound would falsify it. The planar solution, vanishing angular constant, singular radii, nonperiodic limiting motion and arbitrary finite-speed delayed paths are outside the assertion. No numerical shooting output is used to certify an orbit or its zero count.
