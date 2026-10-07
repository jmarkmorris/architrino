# Positive-account continuation under an angular-motion floor

**Grade: derived candidate, awaiting independent assessment.** A nonnegative scalar account permits an inward entry. If the magnitude of angular motion retains an explicit floor, the actual canonical pair turns outward at most once, stays strictly subfield, and disperses. Combined with the planar negative-account region, this removes account crossing as a separate unresolved exit and leaves loss of the angular floor. The floor itself is not proved for the nominal source or a full nonmirror neighborhood.

Use the unchanged law, source-fixed $K=4\epsilon^2R_0$, $0<\epsilon\le1/2900$, and $c_f=1$. Retain the notation and exact affine/actual identities of the [scalar account](authorized-cases-ten-hour-d-primary-anisotropic-account.md). In particular $Z=dN$, $U=Z'$, $W=(V_++V_-)/2$, $u=N\cdot U$, $g=\sqrt{1-|W-(W\cdot N)N|^2}$, $\chi=K/d$, and

$$
\mathcal J=\frac{|U|^2}{2}-2g\chi-u\chi.
\tag{1}
$$

This scalar is auxiliary algebraic bookkeeping, not physical energy. The present result is dimension-independent; let $H=|Z\times U|$.

## Entry and controlled region

At time $T$, suppose

$$
\mathcal J(T)\ge0,\qquad \max_i|V_i(T)|<0.0095,
\qquad T>3d(T),\qquad H(T)>H_*:=2\epsilon R_0.
\tag{2}
$$

The accessible past through $T$ has member speed below $1/20$, and the complete source histories have a strict subfield bound. Every source root remains in that accessible prefix or generated future; this is automatic if the whole complete history has the $1/20$ bound, and also follows from the exact-prefix causal-equivalence lemma in the nominal case. Every ordinary partner and self channel is retained. Complete strict speed gives one partner root per receiver and no positive-delay self root.

Bootstrap future member speed $\beta=1/20$ while $H>H_*$. The angular floor gives an immediate distance floor:

$$
H=d|U_\perp|\le2\beta d,
\qquad d\ge d_*:=\frac{H_*}{2\beta},
\qquad \chi\le\frac K{d_*}=4\beta\epsilon<10^{-4}.
\tag{3}
$$

Also $t>3d(t)$ persists because $(t-3d)'\ge1-6\beta=0.7$. Thus the source windows needed below remain generated. The root count is justified by the complete past; the generated-window restriction is used only for the acceleration estimate.

## Actual error constants and the account boundary

For $\beta=1/20$, put $m=19/20$. The same exact source-window argument as in the account note gives

$$
A_0=\frac{(1+\beta)^2m}{(1-3\beta)^2}<1.45,
\quad |R-\bar R|,|S-\bar S|<0.85K,
\quad |V_s-V(t)|<1.53\chi.
\tag{4}
$$

Here bars denote the current-affine row comparison, not a substituted source. The comparison range exceeds $0.95d$, and its row derivatives satisfy $\|D_SF\|<2.53K/d^3$, $\|D_VF\|<1.23K/d^2$. Hence each actual row differs from its affine comparison by less than $5K^2/d^3$, yielding

$$
|e_{\rm rel}|\le10K^2/d^3,\qquad
|e_{\rm ctr}|\le5K^2/d^3.
\tag{5}
$$

At a boundary state $\mathcal J=0$, its definition implies $\Lambda=d|U_\perp|^2/K\le4+4\beta=4.2$. The exact derivative identity in the account note, now with (5), gives the lower coefficient

$$
\begin{aligned}
\mathcal J'\frac{d^3}{K^2}\ge{}&2(1-2\beta^2)-2\beta
-\frac{3\beta\Lambda}{2g_0^5}-\frac{\beta^2}{g_0^3}
-2\beta^3(g_0^{-4}+g_0^{-2})\\
&-20\beta-10\chi-\frac{10\beta\chi}{g_0}
>\frac12,
\end{aligned}
\tag{6}
$$

where $g_0=\sqrt{1-\beta^2}>0.99$, $\Lambda\le4.2$ and $\chi\le10^{-4}$. All bounds can be checked by rational substitution of $0.99$ in the denominators. Therefore $\mathcal J\ge0$ is forward invariant while the stated speed and angular conditions hold. No monotonicity of $\mathcal J$ away from its zero boundary is required.

## A radial virial and the total acceleration budget

Set $I=d d'=du$. Direct differentiation using the actual relative row gives

$$
I'=2\mathcal J+\chi(2g+u)+dQ_r+d(e_{\rm rel})_r.
\tag{7}
$$

The exact affine central difference has $Q_r\ge0$. Hence (3), (5), $|u|\le2\beta$, and $g\ge g_0$ give

$$
I'\ge2\mathcal J+\chi(2g_0-2\beta-10\chi)
>1.8K/d.
\tag{8}
$$

Thus $I$ increases strictly. There is at most one radial turn, from inward to outward. If it starts inward and no earlier region boundary intervenes, then $d\le d(T)$ until the turn, so $I'\ge1.8K/d(T)>0$ forces that turn in finite time.

The integral estimate below also holds on a partial inward interval before any turn; it does not assume that a future turn has already been reached. On any monotone-distance segment with $u\ne0$,

$$
\frac{d(I^2)}{dd}=2dI'\ge3.6K.
\tag{9}
$$

On an outward segment, integrate (9) from its starting radius $d_b$, discarding the nonnegative initial value of $I^2$. On an inward segment stopped at any current endpoint, integrate from that endpoint radius $d_b$ toward earlier larger radii, again discarding the nonnegative endpoint value of $I^2$. In either case $d_b\ge d_*$ and

$$
|I(d)|\ge\sqrt{3.6K(d-d_b)}.
\tag{10}
$$

Since $dt=d\,|dd|/|I|$, each such segment satisfies

$$
\int\frac K{d^2}\,dt
\le\int_{d_b}^\infty\frac{K\,dr}{r\sqrt{3.6K(r-d_b)}}
=\pi\sqrt{\frac K{3.6d_b}}.
\tag{11}
$$

There are at most two segments. Therefore every partial continuation before an angular or speed boundary obeys

$$
\int_T^t\frac K{d^2}\,ds
\le2\pi\sqrt{\frac K{3.6d_*}}
\le2\pi\sqrt{\frac\epsilon{18}}.
\tag{12}
$$

The exact acceleration magnitude obeys $|A_i|\le[(1+\beta)^2/(1-\beta)]K/d^2<1.161K/d^2$. Consequently

$$
|V_i(t)-V_i(T)|
<1.161\,2\pi\sqrt{\frac\epsilon{18}}<0.033.
\tag{13}
$$

The last inequality follows from $\epsilon\le1/2900$ and $\pi<22/7$ by squaring positive rational quantities. Thus member speed remains below $0.0095+0.033=0.0425<0.05$. The provisional speed boundary cannot occur first. Distance and ordinary-root margins remain positive on every finite interval while $H>H_*$.

## Consequence and connection to negative-account motion

If $H(t)>H_*$ for the entire continuation after (2), ordinary continuation is global and (12) gives $\int_T^\infty d^{-2}<\infty$. Since distance is uniformly Lipschitz, repeated bounded-distance returns contradict this integral. Hence $d(t)\to\infty$. This includes an inward initial radial velocity and does not require a positive terminal relative speed.

For the planar near-circular entry theorem, impose the stronger temporary angular floor $H>H_*$ instead of merely $H>2K$. It is stronger because $H_*/(2K)=1/(4\epsilon)>1$. While $\mathcal J<0$, that theorem keeps member speed below $0.0095$ and separation positive. If $\mathcal J$ never reaches zero and the angular floor persists, its scalar-account argument already gives dispersal. If $\mathcal J$ reaches zero first, the present theorem applies at that time and gives dispersal provided the angular floor continues to hold.

Thus for the admitted planar entry, the bounded proof route now has one remaining geometric exit: $H$ reaching $2\epsilon R_0$. This event is not a collision, root fold, nondispersal result, or known fate of the nominal trajectory. The proof does not exclude it or control what follows it. Arbitrary three-dimensional negative-account perturbations still require control of the additional frame term in the corrected midpoint account. Those remaining obligations prevent a full-neighborhood robustness claim.

Falsifiers are an incorrect actual row constant in (4)–(6), a missing virial term in (7), failure of the partial-inward version of (10), or a first speed boundary despite (2)–(13) and the maintained angular floor. No trajectory computation, physical conservation law, changed source or modified canonical equation was used.
